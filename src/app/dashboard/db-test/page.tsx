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
      console.error('Erro no teste:', error);
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
        runTest(); // Roda o teste novamente após reset
      } else {
        toast.error("Erro ao resetar: " + data.error);
      }
    } catch (error) {
      toast.error("Falha na conexão com a API de reset.");
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <RefreshCw className="h-6 w-6 animate-spin text-yellow-500" />;
    if (!result) return <Database className="h-6 w-6 text-gray-400" />;
    return result.success
      ? <CheckCircle className="h-6 w-6 text-green-500" />
      : <XCircle className="h-6 w-6 text-red-500" />;
  };

  const getStatusColor = () => {
    if (isLoading) return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
    if (!result) return "border-gray-300 bg-gray-50 dark:bg-gray-900/20";
    return result.success
      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
      : "border-red-500 bg-red-50 dark:bg-red-900/20";
  };

  return (
    <>
      <Toaster richColors />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Diagnóstico de Conexão</h1>
          <p className="text-gray-500 dark:text-zinc-400">Teste de conexão simples com o banco PostgreSQL</p>
        </div>

        <Card className={cn("border-2", getStatusColor())}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getStatusIcon()}
              Status da Conexão
            </CardTitle>
            <CardDescription>
              Teste direto de conexão com o banco de dados PostgreSQL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Button
                onClick={runTest}
                disabled={isLoading}
                className="bg-[#0061FE] hover:bg-[#0054DA] text-white"
              >
                <Database className="mr-2 h-4 w-4" />
                {isLoading ? "Testando..." : "Testar Conexão"}
              </Button>

              {result?.success && (
                <Button
                  onClick={resetDatabase}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Reinicializar Banco
                </Button>
              )}
            </div>

            {result && (
              <div className="space-y-4">
                <div className={cn(
                  "p-4 rounded-lg border",
                  result.success
                    ? "border-green-200 bg-green-100 dark:bg-green-900/30"
                    : "border-red-200 bg-red-100 dark:bg-red-900/30"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={cn(
                      "font-semibold",
                      result.success ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                    )}>
                      {result.success ? "Conexão Estabelecida" : "Falha na Conexão"}
                    </span>
                  </div>

                  <div className="text-sm">
                    <p><strong>Data/Hora:</strong> {new Date(result.timestamp).toLocaleString('pt-BR')}</p>
                    {result.success && result.data && (
                      <>
                        <p><strong>Versão PostgreSQL:</strong> {result.data.version}</p>
                        <p><strong>Timestamp do Servidor:</strong> {result.data.timestamp}</p>
                      </>
                    )}
                    {!result.success && (
                      <>
                        <p><strong>Erro:</strong> {result.error}</p>
                        {result.details && (
                          <details className="mt-2">
                            <summary className="cursor-pointer font-mono text-xs">Detalhes técnicos</summary>
                            <pre className="mt-2 p-2 bg-black/10 rounded text-xs overflow-auto">
                              {JSON.stringify(result.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!result?.success && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-500 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Possíveis Soluções:</h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Verifique se a porta está correta (geralmente 5432 para PostgreSQL)</li>
                  <li>• Confirme se o IP 147.93.179.152 permite conexões externas</li>
                  <li>• Verifique se o firewall está bloqueando a porta</li>
                  <li>• Confirme se as credenciais (usuário/senha) estão corretas</li>
                  <li>• Tente habilitar SSL se o banco exigir (mudar ssl: false para true)</li>
                </ul>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/init-database"
                className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
              >
                Ir para configuração inicial do banco
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}