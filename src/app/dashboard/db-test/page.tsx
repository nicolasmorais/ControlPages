"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw, CheckCircle, XCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';

interface TestResult {
  success: boolean;
  message?: string;
  error?: string;
  details?: any;
  data?: any;
  timestamp: string;
}

import { Label } from "@/components/ui/label";

export default function DbTestPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/simple-db-test');
      const data = await response.json();
      setResult(data);

      if (data.success) {
        toast.success("Conexão bem-sucedida!");
      } else {
        toast.error("Falha na conexão");
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Falha ao fazer a requisição para o servidor de teste',
        timestamp: new Date().toISOString()
      });
      toast.error("Erro na requisição");
    } finally {
      setIsLoading(false);
    }
  };

  const resetDatabase = async () => {
    if (!window.confirm("ATENÇÃO: Isso apagará todos os dados e recriará as tabelas. Deseja continuar?")) return;

    try {
      const response = await fetch('/api/db/reset', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        toast.success("Banco de dados reinicializado!");
        runTest();
      } else {
        toast.error("Erro ao resetar: " + data.error);
      }
    } catch (error) {
      toast.error("Falha na conexão com a API de reset.");
    }
  };

  return (
    <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">
      <Toaster richColors position="top-center" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
            Diagnóstico de Conexão
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Console de Infraestrutura</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={runTest}
            disabled={isLoading}
            className="h-10 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-lg shadow-slate-900/10"
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
            {isLoading ? "Processando..." : "Rodar Teste"}
          </Button>
        </div>
      </div>

      {/* Diagnostic Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Result Console */}
        <div className="lg:col-span-2 bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-[10px] font-mono text-slate-400 uppercase">Saída do Sistema</Label>
              <h3 className="text-xl font-bold">Terminal de Saída</h3>
            </div>
            {result && (
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase",
                result.success ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
              )}>
                {result.success ? "Success" : "Error"}
              </div>
            )}
          </div>

          <div className="p-8 min-h-[300px] bg-slate-950/5 dark:bg-black/40 font-mono">
            {!result && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-20">
                <Database className="h-8 w-8 opacity-20" />
                <p className="text-xs uppercase tracking-widest">Aguardando comando de inicialização...</p>
              </div>
            )}

            {isLoading && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500 text-xs text-xs animate-pulse">
                  <span>&gt;</span>
                  <span>Iniciando handshake com o servidor...</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs opacity-50">
                  <span>&gt;</span>
                  <span>Verificando credenciais de ambiente...</span>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <span>&gt;</span>
                  <span>Teste finalizado em {new Date(result.timestamp).toLocaleTimeString()}</span>
                </div>

                <div className={cn(
                  "p-4 rounded-xl border font-mono leading-relaxed",
                  result.success ? "bg-green-500/5 border-green-500/10 text-green-600 dark:text-green-400" : "bg-red-500/5 border-red-500/10 text-red-600 dark:text-red-400"
                )}>
                  <p className="font-bold mb-2">{result.success ? "[CONEXÃO_ESTABELECIDA]" : "[ERRO_DE_CONEXÃO]"}</p>
                  {result.success && result.data && (
                    <div className="space-y-1 opacity-80">
                      <p>SVR_VERSION: {result.data.version}</p>
                      <p>SVR_TIME: {result.data.timestamp}</p>
                      <p>STATUS: ACTIVE_NODE_OK</p>
                    </div>
                  )}
                  {result.error && (
                    <div className="space-y-1">
                      <p>ERR_MSG: {result.error}</p>
                      {result.details && (
                        <pre className="mt-4 p-4 bg-black/80 rounded-lg text-[10px] overflow-auto text-red-300 border border-white/5">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 text-white">
            <Label className="text-[10px] font-mono uppercase text-slate-400">Operações Críticas</Label>
            <h3 className="text-xl font-bold mt-2">Banco de Dados</h3>

            <div className="mt-8 space-y-4">
              <Button
                onClick={runTest}
                disabled={isLoading}
                className="w-full h-12 bg-white text-black hover:bg-slate-100 rounded-xl font-bold transition-all active:scale-95"
              >
                Testar Novamente
              </Button>

              <Button
                onClick={resetDatabase}
                variant="ghost"
                className="w-full h-12 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-xl font-bold transition-all"
              >
                Reinicializar Estrutura
              </Button>
            </div>

            <p className="mt-6 text-[10px] text-slate-500 font-mono leading-relaxed italic">
              * A reinicialização apagará todos os dados existentes permanentemente.
            </p>
          </div>

          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] p-8">
            <Label className="text-[10px] font-mono uppercase text-slate-400">Configuração Inicial</Label>
            <div className="mt-4">
              <Link href="/init-database" className="flex items-center justify-between group">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#0061FE] transition-colors">Setup Automático</span>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#0061FE] transition-all" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Terminal Status Overlay */}
      <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 line-clamp-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            DIAG_ENGINE_V1
          </span>
          <span className="hidden md:block">POSTGRES_VER: 14.x</span>
        </div>
        <div className="opacity-50">
          CONSOLE_PORT: 5432
        </div>
      </div>

    </div>
  );
}