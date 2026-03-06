"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Route,
  Plus,
  RefreshCw,
  Search,
  Globe,
  Activity,
  Zap,
  Settings2,
  Filter,
  ArrowRightLeft,
  Link2,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CreateRouteDialog } from '@/components/dashboard/CreateRouteDialog';
import { UTMLinkGenerator } from '@/components/dashboard/UTMLinkGenerator';
import { RouteCard } from '@/components/dashboard/RouteCard';
import { AutoRouteManager } from '@/components/dashboard/AutoRouteManager';
import { Input } from '@/components/ui/input';

interface CustomAdvertorial {
  id: string;
  name: string;
}

interface ExistingRoute {
  path: string;
  name: string;
  contentId: string;
}

interface AutoRoute {
  [slug: string]: string;
}

const STATIC_CONTENT_OPTIONS: CustomAdvertorial[] = [
  { id: 'v1', name: 'Advertorial V1 (Original)' },
  { id: 'v2', name: 'Advertorial V2' },
  { id: 'v3', name: 'Advertorial V3' },
  { id: 'ap', name: 'Página de Aprovação (AP)' },
  { id: 'cavalo-de-raca', name: 'Kit Cavalo de Raça (Cosméticos)' },
  { id: 'advinsu', name: 'Segredo da Insulina (Blog Feminino)' },
];

export default function DashboardPage() {
  const [advertorials, setAdvertorials] = useState<CustomAdvertorial[]>([]);
  const [existingRoutes, setExistingRoutes] = useState<ExistingRoute[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');

  const allContentOptions = [...STATIC_CONTENT_OPTIONS, ...advertorials];

  const fetchAllData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const [advRes, routeRes] = await Promise.all([
        fetch('/api/custom-advertorials'),
        fetch('/api/routes')
      ]);

      const routeData = await routeRes.json();
      const advData = await advRes.json();

      setAdvertorials(advData);
      setExistingRoutes(routeData);
    } catch (error: any) {
      toast.error(`Falha ao carregar os dados.`);
    } finally {
      setIsLoading(false);
    }
  };

  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toISOString());
    fetchAllData();
  }, []);

  const filteredRoutes = useMemo(() => {
    return existingRoutes.filter(r =>
      r.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [existingRoutes, searchQuery]);

  const handleSaveRoute = async (path: string, contentId: string, name?: string): Promise<void> => {
    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, contentId, name }),
      });
      if (!response.ok) throw new Error('Failed to save route');
      toast.success(`Rota atualizada!`);
      fetchAllData();
    } catch (error) {
      toast.error("Falha ao salvar.");
    }
  };

  const handleDeleteRoute = async (path: string, name: string): Promise<void> => {
    if (!window.confirm(`Excluir rota: ${name}?`)) return;
    try {
      const response = await fetch('/api/routes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
      if (!response.ok) throw new Error('Failed to delete');
      toast.success(`Rota removida.`);
      fetchAllData();
    } catch (error) {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">

        {/* Minimal Tech Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
              <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
              Route Control
            </h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Terminal de Gerenciamento</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Buscar comando..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-slate-100/50 dark:bg-white/[0.03] border-slate-200 dark:border-white/5 rounded-xl pl-10 h-10 text-xs font-mono focus-visible:ring-slate-400/20 transition-all"
              />
            </div>
            <CreateRouteDialog
              contentOptions={allContentOptions}
              onRouteCreated={fetchAllData}
            />
            <Button
              onClick={fetchAllData}
              variant="outline"
              className="h-10 w-10 p-0 rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-black/50 hover:bg-slate-50 dark:hover:bg-white/5"
            >
              <RefreshCw className={cn("h-4 w-4 text-slate-400", isLoading && "animate-spin")} />
            </Button>
          </div>
        </div>

        {/* Main Interface */}
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-slate-200/40 dark:bg-white/5">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-black/20 p-8 h-48">
                  <Skeleton className="h-full w-full rounded-2xl opacity-50" />
                </div>
              ))
            ) : filteredRoutes.length === 0 ? (
              <div className="col-span-full py-32 text-center bg-white dark:bg-black/20">
                <Globe size={40} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhuma rota encontrada</h3>
                <Button variant="link" onClick={() => setSearchQuery('')} className="text-[#0061FE] text-xs mt-2">Limpar busca</Button>
              </div>
            ) : (
              filteredRoutes.map((route) => (
                <div key={route.path} className="bg-white dark:bg-black/20 p-6 transition-all hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b md:border-b-0 border-slate-100 dark:border-white/5">
                  <RouteCard
                    route={route}
                    contentOptions={allContentOptions}
                    onSave={handleSaveRoute}
                    onDelete={handleDeleteRoute}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Subtle Terminal Status Overlay */}
        {isClient && (
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 line-clamp-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SISTEMA_ATIVO
              </span>
              <span className="hidden md:block">BANCO_DADOS: POSTGRES</span>
              <span className="hidden md:block">ROTAS_ATIVAS: {filteredRoutes.length}</span>
            </div>
            <div className="opacity-50">
              {currentTime}
            </div>
          </div>
        )}

      </div>
    </>
  );
}