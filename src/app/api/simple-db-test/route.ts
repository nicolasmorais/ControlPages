import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return NextResponse.json({
      success: false,
      error: 'DATABASE_URL não está definida nas variáveis de ambiente.'
    }, { status: 500 });
  }

  console.log('Tentando conectar com:', connectionString.replace(/\/\/.*@/, '//***:***@'));

  const pool = new Pool({
    connectionString: connectionString,
    ssl: false, // Desabilita SSL temporariamente para teste
    connectionTimeoutMillis: 10000, // Timeout de 10 segundos
  });

  try {
    console.log('Iniciando consulta...');
    const res = await pool.query('SELECT version(), NOW() as timestamp');
    await pool.end(); // Garante que a conexão seja fechada

    console.log('Consulta bem-sucedida!');
    return NextResponse.json({
      success: true,
      message: 'Conexão bem-sucedida!',
      data: {
        version: res.rows[0].version,
        timestamp: res.rows[0].timestamp,
        connectionStringDefined: true
      },
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('ERRO DETALHADO:', error);
    
    // Garante que a pool seja fechada mesmo em caso de erro
    try {
      await pool.end();
    } catch (endError) {
      console.error('Erro ao fechar a pool:', endError);
    }

    return NextResponse.json({
      success: false,
      error: error.message || 'Erro desconhecido',
      details: {
        code: error.code,
        severity: error.severity,
        detail: error.detail,
        hint: error.hint,
        connectionStringDefined: true
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}