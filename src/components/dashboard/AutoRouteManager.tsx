"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, Save, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AutoRoute {
  slug: string;
  advertorialId: string;
}

interface ContentOption {
  id: string;
  name: string;
}

interface AutoRouteManagerProps {
  autoRoutes: { [slug: string]: string };
  contentOptions: ContentOption[];
  onRefresh: () => void;
}

export function AutoRouteManager({ autoRoutes, contentOptions, onRefresh }: AutoRouteManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [slug, setSlug] = useState('');
  const [selectedContentId, setSelectedContentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleCreateRoute = async () => {
    if (!slug || !selectedContentId) {
      toast.error("O slug e o conteúdo são obrigatórios.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/auto-routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ advertorialId: selectedContentId, slug }),
      });

      if (response.status === 409) {
        toast.error("Este slug já está em uso.");
      } else if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Falha ao criar.");
      } else {
        toast.success(`Redirecionamento criado!`);
        setSlug('');
        setSelectedContentId('');
        setIsOpen(false);
        onRefresh();
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRoute = async (slugToDelete: string) => {
    if (!window.confirm(`Excluir redirecionamento /${slugToDelete}?`)) return;

    setIsDeleting(slugToDelete);
    try {
      const response = await fetch('/api/auto-routes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: slugToDelete }),
      });

      if (response.ok) {
        toast.success(`Removido com sucesso.`);
        onRefresh();
      } else {
        toast.error("Falha ao excluir.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    } finally {
      setIsDeleting(null);
    }
  };

  const occupiedSlugs = Object.keys(autoRoutes);

  return (
    <Card className="bg-white/50 dark:bg-black/20 backdrop-blur-sm border-slate-200/60 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-sm">
      <CardHeader className="border-b border-slate-100 dark:border-white/5 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Redirecionamentos Rápidos
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-500 font-medium">
              Mapeie slugs temporários para conteúdos fixos instantaneamente.
            </CardDescription>
          </div>
          <Button onClick={onRefresh} variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <RefreshCw className={cn("h-4 w-4", isDeleting && "animate-spin")} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-8">

        {/* Lista de Rotas Existentes */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Atalhos Ativos</h3>
          {occupiedSlugs.length === 0 ? (
            <div className="py-8 text-center border-2 border-dashed border-slate-100 dark:border-white/5 rounded-2xl">
              <p className="text-sm text-slate-400 font-medium">Nenhum atalho criado ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {occupiedSlugs.map((slugKey) => {
                const route = autoRoutes[slugKey];
                const contentName = contentOptions.find(opt => opt.id === route)?.name || route;
                return (
                  <div
                    key={slugKey}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group transition-all hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 font-mono text-xs mb-1">
                        <span className="text-slate-900 dark:text-white font-bold">/{slugKey}</span>
                        <span className="text-slate-300 dark:text-slate-700">→</span>
                        <span className="text-slate-500 truncate">/{route}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-medium">
                        {contentName}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteRoute(slugKey)}
                      disabled={isDeleting === slugKey}
                      className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      {isDeleting === slugKey ? (
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Botão para Criar Nova Rota */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-11 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-md shadow-slate-900/10">
              <Plus className="mr-2 h-4 w-4" />
              Novo Redirecionamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/60 dark:border-white/10 rounded-[2rem] p-8">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Criar Atalho Rápido</DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
                Mapeie um slug simples para um conteúdo complexo.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Atalho (Slug)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-sm">/</span>
                  <Input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="ex: menopausa"
                    className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl h-10 text-sm focus-visible:ring-slate-400/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Conteúdo de Destino</Label>
                <Select value={selectedContentId} onValueChange={setSelectedContentId}>
                  <SelectTrigger className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl h-10 text-sm focus:ring-slate-400/20 text-left">
                    <SelectValue placeholder="Selecione o destino" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200/60 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl">
                    {contentOptions.map(opt => (
                      <SelectItem
                        key={opt.id}
                        value={opt.id}
                        className="text-sm rounded-lg focus:bg-slate-100 dark:focus:bg-white/10"
                      >
                        {opt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button
                onClick={handleCreateRoute}
                disabled={isSaving || !slug || !selectedContentId}
                className="w-full h-11 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-md shadow-slate-900/10"
              >
                {isSaving ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {isSaving ? "Criando..." : "Criar Redirecionamento"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}