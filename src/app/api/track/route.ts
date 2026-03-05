import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { PageViewEvent } from '@/lib/advertorial-types';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'pg';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { contentId, path } = await req.json();

    if (!contentId || !path) {
      return NextResponse.json({ message: 'contentId e path são obrigatórios' }, { status: 400 });
    }

    const client: Client = await getDb();
    
    const newPageView: PageViewEvent = {
      id: uuidv4(),
      contentId,
      path,
      timestamp: new Date().toISOString(),
      // Adicionando dados de localização simulados para teste
      country: 'Brasil',
      regionName: 'GO',
    };

    // Inserir na tabela page_views
    await client.query(
      `INSERT INTO page_views (id, content_id, path, timestamp, country, region_name)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newPageView.id, newPageView.contentId, newPageView.path, newPageView.timestamp, newPageView.country, newPageView.regionName]
    );
    
    return NextResponse.json({ success: true, message: 'Page view registrada' }, { status: 201 });
  } catch (error) {
    console.error('Failed to track page view:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}