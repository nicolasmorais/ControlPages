import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

export async function GET() {
  try {
    const client: Client = await getDb();
    
    // Verificar se a tabela custom_advertorials existe
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'custom_advertorials'
      );
    `);
    
    const tableExists = tableCheck.rows[0].exists;
    
    let advertorialCount = 0;
    let advertorialSample: any[] = [];
    
    if (tableExists) {
      // Contar advertoriais
      const countResult = await client.query('SELECT COUNT(*) FROM custom_advertorials');
      advertorialCount = parseInt(countResult.rows[0].count);
      
      // Buscar amostra de advertoriais
      if (advertorialCount > 0) {
        const sampleResult = await client.query('SELECT id, name FROM custom_advertorials LIMIT 5');
        advertorialSample = sampleResult.rows;
      }
    }
    
    // Verificar todas as tabelas
    const allTablesResult = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    const allTables = allTablesResult.rows.map(row => row.table_name);
    
    return NextResponse.json({
      success: true,
      tableExists,
      advertorialCount,
      advertorialSample,
      allTables,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Debug DB Error:', error);
    return NextResponse.json({
      success: false,
      error: String(error),
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}