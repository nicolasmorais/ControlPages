"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Save, ExternalLink, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface RouteMapping {
  path: string;
  contentId: string;
  name: string;
}

interface ContentOption {
  id: string;
  name: string;
}

interface RouteCardProps {
  route: RouteMapping;
  onSave: (path: string, contentId: string, name?: string) => Promise<void>;
  onDelete: (path: string, name: string) => Promise<void>;
  contentOptions: ContentOption[];
}

export function RouteCard({ route, onSave, onDelete, contentOptions }: RouteCardProps) {
  const [selectedContent, setSelectedContent] = useState(route.contentId);
  const [routeName, setRouteName] = useState(route.name);
  const [isSaving, setIsSaving] = useState(false);

  const isChanged = selectedContent !== route.contentId || routeName !== route.name;

  const handleSave = async () => {
    if (!isChanged) return;
    setIsSaving(true);
    try {
      await onSave(route.path, selectedContent, routeName);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    await onDelete(route.path, route.name);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0">
            <Globe className="h-4 w-4 text-white dark:text-black" />
          </div>
          <div className="min-w-0">
            <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white truncate tracking-tight">{route.path}</span>
            <span className="block text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase">Nodo_Rota</span>
          </div>
        </div>

        <Link href={route.path} target="_blank">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5" htmlFor={`name-${route.path}`}>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            Apelido
          </Label>
          <Input
            className="h-9 text-xs bg-slate-100/50 dark:bg-white/[0.02] border-slate-200/50 dark:border-white/5 rounded-lg focus-visible:ring-slate-400/20 font-medium"
            id={`name-${route.path}`}
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            Destino
          </Label>
          <Select value={selectedContent} onValueChange={setSelectedContent}>
            <SelectTrigger className="h-9 text-xs bg-slate-100/50 dark:bg-white/[0.02] border-slate-200/50 dark:border-white/5 rounded-lg focus:ring-slate-400/20 text-left font-medium">
              <SelectValue placeholder="Alvo" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200/60 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl">
              {contentOptions.map(opt => (
                <SelectItem key={opt.id} value={opt.id} className="text-xs rounded-lg focus:bg-slate-100 dark:focus:bg-white/10 py-2">
                  {opt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 mt-auto">
        <Button
          onClick={handleSave}
          disabled={isSaving || !isChanged}
          className={cn(
            "flex-1 h-9 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all",
            isChanged
              ? "bg-[#0061FE] text-white hover:bg-[#0054DA] shadow-lg shadow-blue-500/10"
              : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-600 font-normal"
          )}
        >
          {isSaving ? "Atualizando..." : isChanged ? "Confirmar Alterações" : "Sincronizado"}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDelete}
          className="h-9 w-9 rounded-lg border-slate-200 dark:border-white/5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}