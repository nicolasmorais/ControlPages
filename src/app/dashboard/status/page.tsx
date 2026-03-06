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
import { cn } from '@/lib/utils';
import { Database, CheckCircle, XCircle, Clock, Route, LayoutGrid, TrendingUp, Lock, Activity } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

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

export default function StatusPage() {
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

  const lastViewTime = (safeStatus.metrics && safeStatus.metrics.lastPageView !== 'N/A')
    ? formatDistanceToNow(parseISO(safeStatus.metrics.lastPageView), { addSuffix: true, locale: ptBR })
    : 'Nunca';

  return (
    <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">
      <Toaster richColors position="top-center" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
            Status do Sistema
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Monitoramento de Saúde</p>
        </div>

        <Button
          onClick={fetchStatus}
          disabled={isLoading}
          className="h-10 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-lg shadow-slate-900/10"
        >
          <Clock className="mr-2 h-4 w-4" />
          {isLoading ? "Atualizando..." : "Atualizar Agora"}
        </Button>
      </div>

      {/* Core Health Interface */}
      <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/40 dark:bg-white/5">

          {/* Status Geral */}
          <div className="bg-white dark:bg-black/20 p-8 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0">
                <Activity className="h-4 w-4 text-white dark:text-black" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">STATUS_SYSTEM</span>
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Integridade</Label>
              <div className={cn(
                "font-mono text-xs font-bold px-3 py-1.5 rounded-lg border flex items-center gap-2",
                safeStatus.status === 'OK' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
              )}>
                <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", safeStatus.status === 'OK' ? "bg-green-500" : "bg-red-500")} />
                {safeStatus.status === 'OK' ? 'SISTEMA_OPERACIONAL' : 'ERRO_CRITICO'}
              </div>
            </div>
          </div>

          {/* Database */}
          <div className="bg-white dark:bg-black/20 p-8 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0">
                <Database className="h-4 w-4 text-white dark:text-black" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">STORAGE_DB</span>
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Conectividade</Label>
              <div className={cn(
                "font-mono text-xs font-bold px-3 py-1.5 rounded-lg border",
                safeStatus.database === 'OK' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
              )}>
                {safeStatus.database === 'OK' ? 'POSTGRES_CONECTADO' : 'SEM_CONEXAO'}
              </div>
            </div>
          </div>

          {/* Auth */}
          <div className="bg-white dark:bg-black/20 p-8 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0">
                <Lock className="h-4 w-4 text-white dark:text-black" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">AUTH_LAYER</span>
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Segurança</Label>
              <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 font-mono text-xs font-bold px-3 py-1.5 rounded-lg text-slate-500">
                {safeStatus.authStatus.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white dark:bg-black/20 p-8 flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 text-white dark:text-black" />
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white tracking-tight">REALTIME_METRICS</span>
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Última Visualização</Label>
              <div className="text-[11px] font-mono font-medium text-slate-900 dark:text-white">
                {lastViewTime.toUpperCase()}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Route, label: "Rotas Mapeadas", value: safeStatus.metrics?.routes, color: "text-blue-500" },
          { icon: LayoutGrid, label: "Advertoriais", value: safeStatus.metrics?.advertorials, color: "text-[#0061FE]" },
          { icon: TrendingUp, label: "Visualizações", value: safeStatus.metrics?.pageViews, color: "text-green-500" },
        ].map((metric, i) => (
          <div key={i} className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2rem] p-8 flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400">{metric.label}</Label>
              <div className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{metric.value}</div>
            </div>
            <div className={cn("p-4 rounded-2xl bg-slate-50 dark:bg-white/5", metric.color)}>
              <metric.icon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      {safeStatus.message && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
            <XCircle className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] font-mono font-bold text-red-500 uppercase">System Error Log</span>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{safeStatus.message}</p>
          </div>
        </div>
      )}

      {/* Subtle Terminal Status Overlay */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6 pt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 line-clamp-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            NODE_PING: 12ms
          </span>
          <span className="hidden md:block">UPTIME: ONLINE</span>
          <span className="hidden md:block">TIMESTAMP: {safeStatus.timestamp}</span>
        </div>
        <div className="opacity-50 text-right">
          SYS_VER: 2.0.4_BETA
        </div>
      </div>

    </div>
  );
}