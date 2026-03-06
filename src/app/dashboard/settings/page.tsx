"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Database, CheckCircle, XCircle, Clock, Route, LayoutGrid, TrendingUp, Lock, RefreshCw, Settings, AlertTriangle, Activity } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface StatusMetrics {
  routes: number;
  advertorials: number;
  pageViews: number;
  lastPageView: string;
}

interface SystemStatus {
  status: 'OK' | 'ERROR';
  database: 'OK' | 'DOWN';
  authStatus: 'Configurado' | 'Padrão/Não Configurado';
  metrics: StatusMetrics;
  timestamp: string;
  message?: string;
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, i: number) => (
      <Card key={i} className="bg-white border-gray-200 dark:bg-[#1e293b] dark:border-[#334155]"><CardHeader><Skeleton className="h-6 w-1/2 bg-gray-200 dark:bg-[#334155]" /></CardHeader><CardContent><Skeleton className="h-10 w-full bg-gray-200 dark:bg-[#334155]" /></CardContent></Card>
    ))}
  </div>
);

const StatusIndicator = ({ status }: { status: string }) => {
  const isOk = status === 'OK' || status === 'Configurado';
  const Icon = isOk ? CheckCircle : XCircle;
  const color = isOk ? 'text-green-500' : 'text-red-500';
  const text = status || 'Indefinido';

  return (
    <div className={cn("flex items-center gap-2 font-semibold", color)}>
      <Icon className="h-5 w-5" />
      {text}
    </div>
  );
};

import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/status');
      const data = await res.json();

      if (data && typeof data === 'object') {
        setStatus(data);
      } else {
        throw new Error("Resposta inválida do servidor");
      }

      if (!res.ok) {
        toast.error(data.message || "Falha ao verificar o status do sistema.");
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor de status.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const safeStatus = status || {
    status: 'ERROR',
    database: 'DOWN',
    authStatus: 'Padrão/Não Configurado',
    metrics: { routes: 0, advertorials: 0, pageViews: 0, lastPageView: 'N/A' },
    timestamp: new Date().toISOString()
  };

  return (
    <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">
      <Toaster richColors position="top-center" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
            Configurações
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Parâmetros do Sistema</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchStatus}
            disabled={isLoading}
            variant="outline"
            className="h-10 px-4 border-slate-200 dark:border-white/5 rounded-xl font-medium transition-all hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
            Atualizar Status
          </Button>
          <Link href="/dashboard/db-test">
            <Button className="h-10 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-lg shadow-slate-900/10">
              <Database className="mr-2 h-4 w-4" />
              Diagnóstico
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Core System Status */}
        <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 dark:border-white/5">
            <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Status Operacional</Label>
            <h3 className="text-xl font-bold mt-2">Saúde do Ambiente</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200/40 dark:bg-white/5 flex-1">
            <div className="bg-white dark:bg-black/20 p-8 flex flex-col space-y-4">
              <Label className="text-[9px] font-mono text-slate-400 uppercase">Banco PostgreSQL</Label>
              <div className={cn(
                "font-mono text-xs font-bold px-3 py-1.5 rounded-lg border w-fit",
                safeStatus.database === 'OK' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
              )}>
                {safeStatus.database === 'OK' ? 'CONECTADO_E_ATIVO' : 'DB_OFFLINE'}
              </div>
            </div>
            <div className="bg-white dark:bg-black/20 p-8 flex flex-col space-y-4">
              <Label className="text-[9px] font-mono text-slate-400 uppercase">Segurança Auth</Label>
              <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 font-mono text-xs font-bold px-3 py-1.5 rounded-lg text-slate-500 w-fit">
                {safeStatus.authStatus.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Toolset */}
        <div className="bg-slate-900 dark:bg-white/[0.02] border border-slate-800 dark:border-white/5 rounded-[2.5rem] p-8 text-white">
          <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">Módulos de Gestão</Label>
          <h3 className="text-xl font-bold mt-2 mb-8">Ferramentas Rápidas</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/db-test">
              <Button variant="ghost" className="w-full justify-start h-14 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                  <Database className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold">Teste Conexão</span>
                  <span className="block text-[10px] text-slate-400">Validar DB externo</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/status">
              <Button variant="ghost" className="w-full justify-start h-14 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold">Monitor Detalhado</span>
                  <span className="block text-[10px] text-slate-400">Ver logs de status</span>
                </div>
              </Button>
            </Link>
            <Link href="/init-database">
              <Button variant="ghost" className="w-full justify-start h-14 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 gap-4 group">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-bold">Backup & Init</span>
                  <span className="block text-[10px] text-slate-400">Reparar tabelas</span>
                </div>
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* Subtle Terminal Status Overlay */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 line-clamp-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            CFG_SYNC_SUCCESS
          </span>
          <span className="hidden md:block">MASTER_NODE: 01</span>
          <span className="hidden md:block">LAST_UPDATE: {safeStatus.timestamp}</span>
        </div>
        <div className="opacity-50 text-right">
          CONFIG_LAYER_V2
        </div>
      </div>

    </div>
  );
}