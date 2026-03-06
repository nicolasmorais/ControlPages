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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ContentOption {
  id: string;
  name: string;
}

interface CreateRouteDialogProps {
  contentOptions: ContentOption[];
  onRouteCreated: () => void;
}

export function CreateRouteDialog({ contentOptions, onRouteCreated }: CreateRouteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState('');
  const [name, setName] = useState('');
  const [contentId, setContentId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!path || !contentId) {
      toast.error("O caminho (URL) e o conteúdo são obrigatórios.");
      return;
    }

    setIsSaving(true);
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    try {
      const response = await fetch('/api/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: normalizedPath, contentId, name }),
      });

      if (response.status === 201) {
        toast.success(`Nova rota criada com sucesso!`);
        onRouteCreated();
        setIsOpen(false);
        setPath('');
        setName('');
        setContentId('');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Falha ao criar a rota.");
      }
    } catch (error) {
      toast.error("Erro de conexão ao criar a rota.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-md shadow-slate-900/10">
          <Plus className="mr-2 h-4 w-4" />
          Nova Rota
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/60 dark:border-white/10 rounded-[2rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Criar Nova Rota</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
            Defina um novo caminho amigável para seus conteúdos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-path" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Caminho (URL)</Label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono text-sm">/</span>
              <Input
                id="new-path"
                value={path.startsWith('/') ? path.substring(1) : path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="ex: promocao-verao"
                className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl h-10 text-sm focus-visible:ring-slate-400/20"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-name" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Apelido (Opcional)</Label>
            <Input
              id="new-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Campanha Facebook Março"
              className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl h-10 text-sm focus-visible:ring-slate-400/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-content" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Conteúdo</Label>
            <Select value={contentId} onValueChange={setContentId} required>
              <SelectTrigger className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl h-10 text-sm focus:ring-slate-400/20">
                <SelectValue placeholder="Selecione o conteúdo" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200/60 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl">
                {contentOptions.map(opt => (
                  <SelectItem key={opt.id} value={opt.id} className="text-sm rounded-lg focus:bg-slate-100 dark:focus:bg-white/10">
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={isSaving} className="w-full h-11 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-md shadow-slate-900/10">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Criando..." : "Finalizar Rota"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}