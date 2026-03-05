"use client";

import React from 'react';
import Link from 'next/link';
import {
    FileText,
    ExternalLink,
    Search,
    Layout,
    Clock,
    ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATIC_PAGES = [
    {
        id: 'advinsu',
        name: 'Segredo da Insulina (Blog Feminino)',
        description: 'Página de advertorial estilo blog focada em diabetes e saúde feminina.',
        path: '/advinsu',
        category: 'Blog Feminino'
    },
    {
        id: 'haircare',
        name: 'Hair Care Review',
        description: 'Página de análise de produtos capilares com estética premium.',
        path: '/haircare',
        category: 'Beleza'
    },
    {
        id: 'cavalo-de-raca',
        name: 'Kit Cavalo de Raça',
        description: 'Landing page para cosméticos capilares masculinos/unissex.',
        path: '/cavalo-de-raca',
        category: 'Cosméticos'
    },
    {
        id: 'v1',
        name: 'Advertorial V1 (Original)',
        description: 'Modelo clássico de advertorial de alta conversão.',
        path: '/',
        category: 'Clássico'
    }
];

export default function StaticPages() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredPages = STATIC_PAGES.filter(page =>
        page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Minhas Páginas</h1>
                    <p className="text-slate-500 font-medium">Todas as páginas estáticas integradas ao sistema</p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Buscar páginas..."
                        className="pl-10 bg-white border-slate-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page) => (
                    <Card key={page.id} className="group border-slate-200 hover:border-[#0061FE]/30 transition-all hover:shadow-xl hover:shadow-[#0061FE]/5 overflow-hidden flex flex-col">
                        <CardHeader className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#0061FE]/10 transition-colors">
                                    <FileText className="h-6 w-6 text-[#0061FE]" />
                                </div>
                                <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                    {page.category}
                                </Badge>
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-[#0061FE] transition-colors">{page.name}</CardTitle>
                                <CardDescription className="mt-2 text-slate-500 leading-relaxed font-medium">
                                    {page.description}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-auto pt-4 flex gap-3">
                            <Link href={page.path} target="_blank" className="flex-1">
                                <Button variant="default" className="w-full bg-[#0061FE] hover:bg-[#0054DA] rounded-xl font-bold gap-2 text-white">
                                    <ExternalLink size={16} />
                                    Visualizar
                                </Button>
                            </Link>
                            <Link href={`/dashboard?path=${page.path}&contentId=${page.id}`}>
                                <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-bold">
                                    Usar Rota
                                    <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredPages.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm mb-4">
                        <Search className="h-8 w-8 text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium">Nenhuma página encontrada para "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
}
