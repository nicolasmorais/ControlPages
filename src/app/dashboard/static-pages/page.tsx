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
import { Label } from "@/components/ui/label";

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
        <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">

            {/* Minimal Tech Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
                        Minhas Páginas
                    </h1>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Repositório de Assets</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <Input
                            placeholder="Localizar página..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-64 bg-slate-100/50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 rounded-xl pl-10 h-10 text-xs font-mono focus-visible:ring-slate-400/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Main Grid Interface */}
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-slate-200/40 dark:bg-white/5">
                    {filteredPages.map((page) => (
                        <div key={page.id} className="bg-white dark:bg-black/20 p-6 flex flex-col space-y-6 transition-all hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b md:border-b-0 border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0 shadow-sm">
                                        <FileText className="h-4 w-4 text-white dark:text-black" />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white truncate tracking-tight">{page.name}</span>
                                        <span className="block text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase">{page.category}</span>
                                    </div>
                                </div>

                                <Link href={page.path} target="_blank">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="space-y-1.5">
                                    <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        Descrição Técnica
                                    </Label>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2 min-h-[32px]">
                                        {page.description}
                                    </p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        Caminho Base
                                    </Label>
                                    <code className="block text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200/50 dark:border-white/5 truncate">
                                        {page.path}
                                    </code>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                                <Link href={page.path} target="_blank" className="flex-1">
                                    <Button variant="outline" className="w-full h-9 rounded-lg font-mono text-[10px] uppercase tracking-wider border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                        Visualizar
                                    </Button>
                                </Link>
                                <Link href={`/dashboard?path=${page.path}&contentId=${page.id}`} className="flex-1">
                                    <Button className="w-full h-9 bg-[#0061FE] text-white hover:bg-[#0054DA] rounded-lg font-mono text-[10px] uppercase tracking-wider shadow-lg shadow-blue-500/10 transition-all">
                                        Usar Rota
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {filteredPages.length === 0 && (
                <div className="py-32 text-center bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-dashed border-slate-200 dark:border-white/5 rounded-[2.5rem]">
                    <Search size={40} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhuma página encontrada</h3>
                    <Button variant="link" onClick={() => setSearchQuery('')} className="text-[#0061FE] text-xs mt-2">Limpar busca</Button>
                </div>
            )}

            {/* Subtle Terminal Status Overlay */}
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 line-clamp-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        REPOSITORIO_ONLINE
                    </span>
                    <span className="hidden md:block">ASSETS: {STATIC_PAGES.length}</span>
                    <span className="hidden md:block">TIPO: ESTATICO</span>
                </div>
                <div className="opacity-50">
                    NODE_ID: STATIC_01
                </div>
            </div>

        </div>
    );
}
