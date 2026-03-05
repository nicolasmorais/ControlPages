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
import { Plus, Trash2, Edit, ExternalLink, AlertTriangle, Search, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomAdvertorial } from '@/lib/advertorial-types';
import { Input } from '@/components/ui/input';

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

  // Cores do Projeto
  const primaryColor = '#0061FE';

  return (
    <>
      <Toaster richColors />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Meus Advertoriais</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Crie e gerencie conteúdos dinâmicos com facilidade.</p>
        </div>
        <Link href="/dashboard/custom-advertorials/new">
          <Button className={cn("h-12 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 text-white")} style={{ backgroundColor: primaryColor }}>
            <Plus className="mr-2 h-5 w-5" />
            Novo Advertorial
          </Button>
        </Link>
      </div>

      {/* Alert Tip */}
      <div className="p-4 mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-xl text-blue-600 dark:text-blue-300">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed py-1">
          <strong>Dica Pro:</strong> O ID de Conteúdo é o identificador único. Use-o no
          <Link href="/dashboard" className="font-bold underline ml-1 hover:text-blue-600 transition-colors">Route Control</Link> para criar URLs amigáveis como <code>/promo-verao</code>.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Conteúdos Ativos</CardTitle>
              <CardDescription>Gerencie todos os seus layouts dinâmicos em um só lugar.</CardDescription>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome ou ID..."
                className="pl-10 h-10 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
              <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                <TableHead className="w-[40%] font-bold text-slate-500 uppercase text-[11px] tracking-widest pl-6">Nome do Advertorial</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase text-[11px] tracking-widest">ID de Identificação</TableHead>
                <TableHead className="text-right font-bold text-slate-500 uppercase text-[11px] tracking-widest pr-6">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i} className="border-slate-50 dark:border-slate-800">
                    <TableCell className="pl-6"><Skeleton className="h-5 w-48 rounded-md" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32 rounded-md" /></TableCell>
                    <TableCell className="text-right pr-6"><Skeleton className="h-9 w-24 ml-auto rounded-lg" /></TableCell>
                  </TableRow>
                ))
              ) : filteredAdvertorials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3 opacity-50">
                      <FileText className="h-12 w-12 text-slate-400" />
                      <p className="text-slate-500 font-medium">Nenhum advertorial encontrado.</p>
                      <Button variant="link" onClick={() => setSearchTerm('')} className="text-[#0061FE] font-bold">Limpar filtros</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdvertorials.map((adv) => (
                  <TableRow key={adv.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors border-slate-50 dark:border-slate-800">
                    <TableCell className="py-4 pl-6">
                      <div className="font-bold text-slate-900 dark:text-white group-hover:text-[#0061FE] transition-colors">{adv.name}</div>
                    </TableCell>
                    <TableCell>
                      <code className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border border-slate-200 dark:border-slate-700">
                        {adv.id}
                      </code>
                    </TableCell>
                    <TableCell className="text-right pr-6 space-x-2">
                      <Link href={`/dashboard/custom-advertorials/${adv.id}`}>
                        <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-[#0061FE] transition-all">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                      <Link href={`/${adv.id}`} target="_blank">
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(adv.id, adv.name)}
                        className="h-10 w-10 p-0 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}