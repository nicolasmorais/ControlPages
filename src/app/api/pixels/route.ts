import { NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export async function GET(): Promise<NextResponse> {
    try {
        const client: Client = await getDb().catch(() => null as any);
        if (!client) return NextResponse.json([]);

        const result = await client.query('SELECT * FROM pixels ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Failed to get pixels:', error);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { id, name, provider, code, content_id, active } = await req.json();
        if (!name || !provider || !code) {
            return NextResponse.json({ message: 'Campos obrigatórios: name, provider, code' }, { status: 400 });
        }

        const client: Client = await getDb();

        if (id) {
            // Update existing pixel
            await client.query(
                'UPDATE pixels SET name = $1, provider = $2, code = $3, content_id = $4, active = $5 WHERE id = $6',
                [name, provider, code, content_id || null, active !== false, id]
            );
            return NextResponse.json({ message: 'Pixel atualizado com sucesso' });
        } else {
            // Create new pixel
            const newId = uuidv4();
            await client.query(
                'INSERT INTO pixels (id, name, provider, code, content_id, active) VALUES ($1, $2, $3, $4, $5, $6)',
                [newId, name, provider, code, content_id || null, active !== false]
            );
            return NextResponse.json({ message: 'Pixel criado com sucesso', id: newId }, { status: 201 });
        }
    } catch (error) {
        console.error('Failed to save pixel:', error);
        return NextResponse.json({ message: 'Erro ao salvar pixel' }, { status: 500 });
    }
}

export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ message: 'ID é obrigatório' }, { status: 400 });

        const client: Client = await getDb();
        await client.query('DELETE FROM pixels WHERE id = $1', [id]);

        return NextResponse.json({ message: 'Pixel excluído com sucesso' });
    } catch (error) {
        console.error('Failed to delete pixel:', error);
        return NextResponse.json({ message: 'Erro ao excluir pixel' }, { status: 500 });
    }
}
