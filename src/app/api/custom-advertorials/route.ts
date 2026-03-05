import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/database';
import { CustomAdvertorial } from '@/lib/advertorial-types';
import { v4 as uuidv4 } from 'uuid';
import { Client } from 'pg';

// GET: Fetch all custom advertorials
export async function GET(): Promise<NextResponse> {
  console.log("API: GET /api/custom-advertorials - Iniciando busca...");

  try {
    const client: Client = await getDb().catch(err => {
      console.warn('Database offline (custom-advertorials)');
      return null as any;
    });

    if (!client) return NextResponse.json([]);
    console.log("API: Conexão com o banco estabelecida.");

    // Buscar da tabela custom_advertorials
    const result = await client.query('SELECT id, name, data FROM custom_advertorials ORDER BY name');
    console.log(`API: Busca executada. Encontrados ${result.rows.length} advertoriais.`);

    // Transformar os dados para o formato esperado
    const advertorials: CustomAdvertorial[] = result.rows.map((row: any) => {
      console.log(`API: Processando advertorial - ID: ${row.id}, Nome: ${row.name}`);
      return {
        id: row.id,
        name: row.name,
        ...row.data
      };
    });

    console.log(`API: Retornando ${advertorials.length} advertoriais transformados.`);
    return NextResponse.json(advertorials);
  } catch (error) {
    console.error('API: Falha ao buscar custom advertorials:', error);
    return NextResponse.json([]);
  }
}

// POST: Create or Update a custom advertorial
export async function POST(req: Request): Promise<NextResponse> {
  console.log("API: POST /api/custom-advertorials - Iniciando criação/atualização...");

  try {
    const payload: CustomAdvertorial = await req.json();
    console.log(`API: Payload recebido. ID: ${payload.id}, Nome: ${payload.name}`);

    const client: Client = await getDb();

    if (!payload.name || !payload.header || !payload.blocks) {
      console.error("API: Dados incompletos recebidos:", payload);
      return NextResponse.json({ message: 'Dados incompletos' }, { status: 400 });
    }

    if (payload.id) {
      // Update existing advertorial
      console.log(`API: Atualizando advertorial existente: ${payload.id}`);
      const { id, ...data } = payload;
      await client.query(
        'UPDATE custom_advertorials SET name = $1, data = $2 WHERE id = $3',
        [payload.name, JSON.stringify(data), payload.id]
      );

      return NextResponse.json({ message: 'Advertorial atualizado com sucesso', advertorial: payload });
    } else {
      // Create new advertorial
      console.log("API: Criando novo advertorial...");
      const newId = uuidv4();
      const { id, ...data } = payload;

      await client.query(
        'INSERT INTO custom_advertorials (id, name, data) VALUES ($1, $2, $3)',
        [newId, payload.name, JSON.stringify(data)]
      );

      const newAdvertorial = { ...payload, id: newId };
      console.log(`API: Novo advertorial criado com ID: ${newId}`);
      return NextResponse.json({ message: 'Advertorial criado com sucesso', advertorial: newAdvertorial });
    }
  } catch (error) {
    console.error('API: Falha ao salvar custom advertorial:', error);
    return NextResponse.json({ message: 'Erro Interno do Servidor', error: String(error) }, { status: 500 });
  }
}