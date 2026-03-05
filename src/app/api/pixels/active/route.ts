import { NextResponse, NextRequest } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const contentId = searchParams.get('contentId');

        const client: Client = await getDb().catch(() => null as any);
        if (!client) return NextResponse.json([]);

        // Fetch pixels that are active AND (content_id matches OR content_id is null/global)
        const result = await client.query(
            'SELECT provider, code FROM pixels WHERE active = TRUE AND (content_id = $1 OR content_id IS NULL)',
            [contentId]
        );

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Failed to get active pixels:', error);
        return NextResponse.json([], { status: 500 });
    }
}
