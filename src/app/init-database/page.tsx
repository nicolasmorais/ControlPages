"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, RefreshCw, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast, Toaster } from 'sonner';
import Link from 'next/link';

export default function InitDatabasePage() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleInit = async () => {
    setIsInitializing(true);
    try {
      // Usamos a API de reset que já criamos, ela recria as tabelas e insere dados iniciais
      const res = await fetch('/api/db/reset', { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        toast.success("Banco de dados configurado com sucesso!");
        setIsDone(true);
      } else {
        toast.error("Erro na inicialização: " + data.error);
      }
    } catch (error) {
      toast.error("Falha ao conectar com o servidor para inicialização.");
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f172a] p-6">
      <Toaster richColors />
      <Card className="max-w-md w-full bg-white dark:bg-[#1e293b] border-gray-200 dark:border-[#334155] shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
            <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Configuração Inicial</CardTitle>
          <CardDescription>
            Prepare seu banco de dados PostgreSQL para o primeiro uso.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 text-sm text-yellow-800 dark:text-yellow-300">
            <div className="flex gap-2">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p>Este processo irá criar todas as tabelas necessárias e as rotas padrão (v1, v2, v3, ap).</p>
            </div>
          </div>

          {isDone && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg flex items-center gap-3 text-green-700 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">Tudo pronto! Você já pode entrar.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {!isDone ? (
            <Button
              onClick={handleInit}
              disabled={isInitializing}
              className="w-full h-12 bg-[#0061FE] hover:bg-[#0054DA] text-white text-lg font-bold"
            >
              {isInitializing ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Configurando...
                </>
              ) : (
                "Inicializar Banco de Dados"
              )}
            </Button>
          ) : (
            <Link href="/login" className="w-full">
              <Button className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-lg font-bold">
                Ir para o Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            Voltar para o login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}