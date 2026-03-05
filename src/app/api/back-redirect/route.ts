import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

type RedirectMapping = {
    [contentId: string]: { url: string; active: boolean };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const contentId = searchParams.get('contentId');

        const client: Client = await getDb().catch(() => null as any);
        if (!client) return NextResponse.json({ active: false });

        const result = await client.query('SELECT value FROM settings WHERE key = $1', ['backRedirects']);
        const allRedirects: RedirectMapping = result.rows[0]?.value || {};

        // Prioridade 1: Redirecionamento específico para o conteúdo
        if (contentId && allRedirects[contentId]) {
            return NextResponse.json(allRedirects[contentId]);
        }

        // Prioridade 2: Redirecionamento Global (se houver um fallback)
        if (allRedirects['global']) {
            return NextResponse.json(allRedirects['global']);
        }

        return NextResponse.json({ active: false });
    } catch (error) {
        console.error('Failed to get back redirect:', error);
        return NextResponse.json({ active: false });
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { contentId, url, active } = await req.json();
        if (!contentId || !url) {
            return NextResponse.json({ message: 'contentId e url são obrigatórios' }, { status: 400 });
        }

        const client: Client = await getDb();

        const currentResult = await client.query('SELECT value FROM settings WHERE key = $1', ['backRedirects']);
        let allRedirects: RedirectMapping = currentResult.rows[0]?.value || {};

        allRedirects[contentId] = { url, active: active !== false };

        await client.query(
            'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
            ['backRedirects', JSON.stringify(allRedirects)]
        );

        return NextResponse.json({ message: 'Back Redirect atualizado com sucesso' });
    } catch (error) {
        console.error('Failed to save back redirect:', error);
        return NextResponse.json({ message: 'Erro ao salvar back redirect' }, { status: 500 });
    }
}

export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const { contentId } = await req.json();
        if (!contentId) return NextResponse.json({ message: 'contentId é obrigatório' }, { status: 400 });

        const client: Client = await getDb();
        const currentResult = await client.query('SELECT value FROM settings WHERE key = $1', ['backRedirects']);
        let allRedirects: RedirectMapping = currentResult.rows[0]?.value || {};

        delete allRedirects[contentId];

        await client.query(
            'UPDATE settings SET value = $1 WHERE key = $2',
            [JSON.stringify(allRedirects), 'backRedirects']
        );

        return NextResponse.json({ message: 'Back Redirect removido' });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao remover' }, { status: 500 });
    }
}
