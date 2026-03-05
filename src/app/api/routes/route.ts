import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { RouteMapping } from '@/lib/advertorial-types';
import { Client } from 'pg';

export async function GET(): Promise<NextResponse> {
  try {
    const client: Client = await getDb().catch(err => {
      console.warn('Database offline, returning empty routes');
      return null as any;
    });

    if (!client) return NextResponse.json([]);

    // Buscar da tabela routes
    const result = await client.query('SELECT path, name, content_id as "contentId" FROM routes ORDER BY path');

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Failed to get routes:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { path, contentId, name } = await req.json() as { path: string, contentId: string, name?: string };
    if (!path || !contentId) {
      return NextResponse.json({ message: 'Os campos path e contentId são obrigatórios' }, { status: 400 });
    }

    const client: Client = await getDb();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Verificar se a rota já existe
    const existingRoute = await client.query('SELECT * FROM routes WHERE path = $1', [normalizedPath]);

    if (existingRoute.rows.length > 0) {
      // Atualizar rota existente
      await client.query(
        'UPDATE routes SET name = $1, content_id = $2 WHERE path = $3',
        [name || `Rota Personalizada: ${normalizedPath}`, contentId, normalizedPath]
      );

      const updatedRoute = await client.query('SELECT path, name, content_id as "contentId" FROM routes WHERE path = $1', [normalizedPath]);
      return NextResponse.json({ message: 'Rota atualizada com sucesso', route: updatedRoute.rows[0] });
    } else {
      // Criar nova rota
      await client.query(
        'INSERT INTO routes (path, name, content_id) VALUES ($1, $2, $3)',
        [normalizedPath, name || `Rota Personalizada: ${normalizedPath}`, contentId]
      );

      const newRoute = await client.query('SELECT path, name, content_id as "contentId" FROM routes WHERE path = $1', [normalizedPath]);
      return NextResponse.json({ message: 'Rota criada com sucesso', route: newRoute.rows[0] }, { status: 201 });
    }
  } catch (error) {
    console.error('Failed to save route:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

export async function DELETE(req: Request): Promise<NextResponse> {
  try {
    const { path } = await req.json() as { path: string };
    if (!path) {
      return NextResponse.json({ message: 'O campo path é obrigatório' }, { status: 400 });
    }

    const client: Client = await getDb();
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Verificar se a rota existe antes de deletar
    const existingRoute = await client.query('SELECT * FROM routes WHERE path = $1', [normalizedPath]);

    if (existingRoute.rows.length === 0) {
      return NextResponse.json({ message: 'Rota não encontrada' }, { status: 404 });
    }

    // Deletar a rota
    await client.query('DELETE FROM routes WHERE path = $1', [normalizedPath]);

    return NextResponse.json({ message: 'Rota excluída com sucesso' });
  } catch (error) {
    console.error('Failed to delete route:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}