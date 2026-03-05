import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { ApprovalPageContent } from '@/lib/advertorial-types';
import { Client } from 'pg';

export async function GET(): Promise<NextResponse> {
  try {
    const client: Client = await getDb();
    
    // Buscar da tabela settings
    const result = await client.query('SELECT value FROM settings WHERE key = $1', ['approvalPageContent']);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'Conteúdo não encontrado' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0].value);
  } catch (error) {
    console.error('Failed to get approval page content:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const newContent: ApprovalPageContent = await req.json();
    if (!newContent) {
      return NextResponse.json({ message: 'O conteúdo é obrigatório' }, { status: 400 });
    }

    const client: Client = await getDb();
    
    // Atualizar na tabela settings
    await client.query(
      'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
      ['approvalPageContent', JSON.stringify(newContent)]
    );
    
    return NextResponse.json({ message: 'Conteúdo atualizado com sucesso', content: newContent });
  } catch (error) {
    console.error('Failed to update approval page content:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor' }, { status: 500 });
  }
}