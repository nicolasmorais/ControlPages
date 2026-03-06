"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Edit, ExternalLink, AlertTriangle, Search, FileText, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomAdvertorial } from '@/lib/advertorial-types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CustomAdvertorialsPage() {
  const [advertorials, setAdvertorials] = useState<CustomAdvertorial[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdvertorials = (): void => {
    setIsLoading(true);
    fetch('/api/custom-advertorials')
      .then((res: Response) => res.json())
      .then((data: CustomAdvertorial[]) => {
        setAdvertorials(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        toast.error("Falha ao carregar os advertoriais.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvertorials();
  }, []);

  const handleDelete = async (id: string, name: string): Promise<void> => {
    if (!window.confirm(`Tem certeza que deseja excluir o advertorial: "${name}"? Todas as rotas associadas também serão removidas.`)) {
      return;
    }
    try {
      const response = await fetch(`/api/custom-advertorials/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete');
      toast.success(`Advertorial "${name}" excluído com sucesso!`);
      fetchAdvertorials();
    } catch (error) {
      toast.error(`Falha ao excluir o advertorial "${name}".`);
    }
  };

  const filteredAdvertorials = advertorials.filter(adv =>
    adv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">
      <Toaster richColors position="top-center" />

      {/* Minimal Tech Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
            Meus Advertoriais
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Gerenciador de Conteúdo</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <Input
              placeholder="Filtrar conteúdos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-slate-100/50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 rounded-xl pl-10 h-10 text-xs font-mono focus-visible:ring-slate-400/20 transition-all"
            />
          </div>
          <Link href="/dashboard/custom-advertorials/new">
            <Button className="h-10 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-lg shadow-slate-900/10">
              <Plus className="mr-2 h-4 w-4" />
              Novo Advertorial
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Interface */}
      <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/40 dark:bg-white/5">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-black/20 p-8 h-48">
                <Skeleton className="h-full w-full rounded-2xl opacity-50" />
              </div>
            ))
          ) : filteredAdvertorials.length === 0 ? (
            <div className="col-span-full py-32 text-center bg-white dark:bg-black/20">
              <FileText size={40} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhum conteúdo encontrado</h3>
              <Button variant="link" onClick={() => setSearchTerm('')} className="text-[#0061FE] text-xs mt-2">Limpar filtros</Button>
            </div>
          ) : (
            filteredAdvertorials.map((adv) => (
              <div key={adv.id} className="bg-white dark:bg-black/20 p-6 flex flex-col space-y-6 transition-all hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b md:border-b-0 border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <LayoutGrid className="h-4 w-4 text-white dark:text-black" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white truncate tracking-tight">{adv.name}</span>
                      <span className="block text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase">IDENTIFICADOR_CID</span>
                    </div>
                  </div>

                  <Link href={`/${adv.id}`} target="_blank">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-1.5 flex-1 pt-2">
                  <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                    Código Único
                  </Label>
                  <code className="block text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1.5 rounded-md border border-slate-200/50 dark:border-white/5 truncate">
                    {adv.id}
                  </code>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                  <Link href={`/dashboard/custom-advertorials/${adv.id}`} className="flex-1">
                    <Button variant="outline" className="w-full h-9 rounded-lg font-mono text-[10px] uppercase tracking-wider border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                      <Edit className="h-3.5 w-3.5 mr-2" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(adv.id, adv.name)}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg border-slate-200 dark:border-white/5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Subtle Terminal Status Overlay */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 line-clamp-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            CONTENT_SRV_ACTIVE
          </span>
          <span className="hidden md:block">BANCO: POSTGRES</span>
          <span className="hidden md:block">ITENS_MAPEADOS: {filteredAdvertorials.length}</span>
        </div>
        <div className="opacity-50">
          PAGE_REF: ADV_DASH_02
        </div>
      </div>

    </div>
  );
}