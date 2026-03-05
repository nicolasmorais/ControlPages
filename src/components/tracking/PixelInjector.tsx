import { getDb } from '@/lib/database';
import { GlobalPixelConfig, PagePixelConfig } from '@/lib/advertorial-types';
import { Client } from 'pg';
import Head from 'next/head'; // Importando o Head do Next.js

interface PixelInjectorProps {
    pagePixels: PagePixelConfig;
}

// Função auxiliar para buscar a configuração global de pixels
async function fetchGlobalPixelConfig(db: Client): Promise<GlobalPixelConfig> {
    const result = await db.query('SELECT value FROM settings WHERE key = $1', ['pixelConfig']);
    if (result.rows.length === 0) {
        // Retorna um objeto vazio se não for encontrado
        return { metaPixelId: '', taboolaPixelId: '', globalScripts: '' };
    }
    return result.rows[0].value as GlobalPixelConfig;
}

// Componente para injetar scripts de rastreamento no head
export async function PixelInjector({ pagePixels }: PixelInjectorProps): Promise<React.ReactNode> {
  
  let metaPixelId: string = pagePixels.metaPixelId;
  let taboolaPixelId: string = pagePixels.taboolaPixelId;
  let customScripts: string = pagePixels.customScripts;

  if (pagePixels.useGlobalPixels) {
    const db = await getDb();
    const globalConfig: GlobalPixelConfig = await fetchGlobalPixelConfig(db);
    
    // Se usar global, os IDs globais substituem os locais se estes estiverem vazios
    metaPixelId = metaPixelId || globalConfig.metaPixelId;
    taboolaPixelId = taboolaPixelId || globalConfig.taboolaPixelId;
    customScripts = customScripts || globalConfig.globalScripts;
  }

  // 1. Meta Pixel Script (PageView padrão)
  const metaScript: string = metaPixelId ? `
    <!-- Meta Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${metaPixelId}');
      fbq('track', 'PageView');
    </script>
    <noscript>
      <img height="1" width="1" style="display:none"
           src="https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Meta Pixel Code -->
  ` : '';

  // 2. Taboola Pixel Script (PageView padrão) - CORRIGIDO
  const taboolaScript: string = taboolaPixelId ? `
    <!-- Taboola Pixel Code -->
    <script type="text/javascript">
      window._tfa = window._tfa || [];
      window._tfa.push({notify: 'event', name: 'page_view', id: '${taboolaPixelId}'});
      !function (t, f, a, x) {
        if (!document.getElementById(x)) {
          t.async = 1;t.src = a;t.id = x;f.parentNode.insertBefore(t, f);
        }
      }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/unip/${taboolaPixelId}/tfa.js',
      'tb_tfa_script');
    </script>
    <!-- End Taboola Pixel Code -->
  ` : '';

  // 3. Global Scripts (Injetado como HTML puro)
  const combinedScripts: string = metaScript + taboolaScript + customScripts;

  if (!combinedScripts) {
    return null;
  }

  // Retorna o HTML para ser injetado
  return combinedScripts;
}