import { getDb } from '@/lib/database';
import { notFound, redirect } from 'next/navigation';
import { Client } from 'pg';
import { validate as isUUID } from 'uuid';
import { Metadata } from 'next';

import { V1Page } from '@/components/page-versions/V1Page';
import { V2Page } from '@/components/page-versions/V2Page';
import { V3Page } from '@/components/page-versions/V3Page';
import { HairCarePage } from '@/components/page-versions/HairCarePage'; // NEW
import APPage from '@/components/page-versions/APPage';
import { AdvinsuPage } from '@/components/page-versions/AdvinsuPage';
import { SalesPageV1 } from '@/components/page-versions/SalesPageV1';
import CustomAdvertorialPage from '@/components/page-versions/CustomAdvertorialPage';
import { BackRedirect } from '@/components/page-versions/BackRedirect';

const STATIC_PAGE_IDS = ['v1', 'v2', 'v3', 'ap', 'cavalo-de-raca', 'advinsu', 'sales'];

function ContentSwitcher({ contentId }: { contentId: string }) {
  try {
    const renderPage = () => {
      switch (contentId) {
        case 'v1': return <V1Page />;
        case 'v2': return <V2Page />;
        case 'v3': return <V3Page />;
        case 'ap': return <APPage />;
        case 'cavalo-de-raca': return <HairCarePage />; // NEW
        case 'advinsu': return <AdvinsuPage />;
        case 'sales': return <SalesPageV1 />;
        default: return <CustomAdvertorialPage advertorialId={contentId} />;
      }
    };

    return (
      <>
        <BackRedirect contentId={contentId} />
        {renderPage()}
      </>
    );
  } catch (error) {
    console.error("Error in ContentSwitcher:", error);
    return notFound();
  }
}

interface DynamicPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const slugKey = slug?.join('/') || 'v1';

  // Títulos para as páginas estáticas
  const staticTitles: Record<string, string> = {
    'v1': 'Página Inicial - Control Pages',
    'v2': 'Página V2 - Control Pages',
    'v3': 'Página V3 - Control Pages',
    'ap': 'Página de Aprovação - Control Pages',
    'cavalo-de-raca': 'Cuidado Capilar Avançado - Control Pages',
    'advinsu': 'Bella Diaries - Desinflamando o Pâncreas',
    'sales': 'InsuBeta - Tratamento Raiz para Glicose',
  };

  if (staticTitles[slugKey]) {
    return { title: staticTitles[slugKey] };
  }

  // Títulos dinâmicos do banco de dados
  try {
    const client = await getDb().catch(() => null);
    if (!client) return { title: 'Control Pages' };

    const path = `/${slugKey}`;

    // 1. Verificar em rotas (Routes)
    const routeResult = await client.query('SELECT name FROM routes WHERE path = $1', [path]);
    if (routeResult.rows[0]?.name) {
      return { title: `${routeResult.rows[0].name} - Control Pages` };
    }

    // 2. Verificar em advertoriais customizados (UUID)
    if (isUUID(slugKey)) {
      const advResult = await client.query('SELECT name, data FROM custom_advertorials WHERE id = $1', [slugKey]);
      if (advResult.rows[0]) {
        const { name, data } = advResult.rows[0];
        // Usa o título do cabeçalho se existir, senão o nome interno
        const displayTitle = data?.header?.title || name;
        return { title: `${displayTitle} - Control Pages` };
      }
    }
  } catch (e) {
    console.error("Erro ao gerar metadados:", e);
  }

  return { title: 'Control Pages' };
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Página inicial padrão (V1)
    if (!slug || slug.length === 0) {
      return <V1Page />;
    }

    const slugKey = slug.join('/');
    const path = `/${slugKey}`;

    // Tenta conectar ao banco
    let client: Client | null = null;
    try {
      client = await getDb();
    } catch (dbError) {
      console.error("Erro de conexão com o banco (usando fallback estático):", dbError);
      // Fallback imediato para páginas estáticas se o banco estiver offline
      if (STATIC_PAGE_IDS.includes(slugKey)) {
        return <ContentSwitcher contentId={slugKey} />;
      }
      throw new Error("Banco de dados inacessível.");
    }

    let contentId: string | null = null;

    // 1. Tabela de Rotas (Maior Prioridade - permite trocar o conteúdo de uma rota existente)
    const routeResult = await client.query('SELECT content_id as "contentId" FROM routes WHERE path = $1', [path]);
    if (routeResult.rows[0]) {
      contentId = routeResult.rows[0].contentId;
    }

    // 2. Auto Routes
    if (!contentId) {
      const autoRoutesResult = await client.query('SELECT value FROM settings WHERE key = $1', ['autoRoutes']);
      if (autoRoutesResult.rows.length > 0) {
        const autoRoutes = autoRoutesResult.rows[0].value;
        if (autoRoutes[slugKey]) contentId = autoRoutes[slugKey];
      }
    }

    // 3. Estáticas (Se não houver mapeamento manual no banco)
    if (!contentId && STATIC_PAGE_IDS.includes(slugKey)) {
      contentId = slugKey;
    }

    // 4. UUID
    if (!contentId && isUUID(slugKey)) contentId = slugKey;

    if (!contentId) return notFound();

    return <ContentSwitcher contentId={contentId} />;
  } catch (error) {
    console.error("Página Dinâmica: Erro fatal:", error);
    return <V1Page />;
  }
}