"use client";

import React, { useState, useMemo } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Link as LinkIcon, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface UTMLinkGeneratorProps {
  // Props futuras se necessário
}

// Macros do Taboola e UTMs comuns
const TRACKING_OPTIONS = [
  { key: 'utm_source', label: 'utm_source (Taboola)', isMacro: false, defaultValue: 'Taboola' },
  { key: 'utm_medium', label: 'utm_medium (referral)', isMacro: false, defaultValue: 'referral' },
  { key: 'utm_campaign', label: 'utm_campaign', isMacro: false, defaultValue: '' },
  { key: 'utm_content', label: 'utm_content', isMacro: false, defaultValue: '' },
  { key: 'utm_term', label: 'utm_term', isMacro: false, defaultValue: '' },
  { key: 'creative_name', label: '{creative_name}', isMacro: true },
  { key: 'site', label: '{site}', isMacro: true },
  { key: 'site_id', label: '{site_id}', isMacro: true },
  { key: 'campaign_id', label: '{campaign_id}', isMacro: true },
  { key: 'campaign_name', label: '{campaign_name}', isMacro: true },
  { key: 'campaign_item_id', label: '{campaign_item_id}', isMacro: true },
  { key: 'platform', label: '{platform}', isMacro: true },
];

export function UTMLinkGenerator({ }: UTMLinkGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [baseLink, setBaseLink] = useState('');
  const [selectedParams, setSelectedParams] = useState<Record<string, string | boolean>>({
    utm_source: true,
    utm_medium: true,
  });

  const handleParamToggle = (key: string, isChecked: boolean) => {
    setSelectedParams(prev => {
      const newState = { ...prev };
      if (isChecked) {
        const option = TRACKING_OPTIONS.find(opt => opt.key === key);
        newState[key] = option?.isMacro ? true : (option?.defaultValue || '');
      } else {
        delete newState[key];
      }
      return newState;
    });
  };

  const handleParamValueChange = (key: string, value: string) => {
    setSelectedParams(prev => ({ ...prev, [key]: value }));
  };

  const generatedLink = useMemo(() => {
    if (!baseLink) return 'Preencha o link base para gerar o URL final.';

    try {
      const url = new URL(baseLink);
      Object.entries(selectedParams).forEach(([key, value]) => {
        if (value === true) {
          url.searchParams.set(key, `{${key}}`);
        } else if (typeof value === 'string' && value.trim()) {
          url.searchParams.set(key, value.trim());
        }
      });

      let finalUrl = url.toString();
      finalUrl = finalUrl.replace(/%7B/g, '{').replace(/%7D/g, '}');
      return finalUrl;

    } catch (error) {
      console.error("Erro ao construir o link:", error);
      return 'Link base inválido. Verifique o formato.';
    }
  }, [baseLink, selectedParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copiado com sucesso!");
  };

  const isReady = baseLink && generatedLink.startsWith('http');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-black/50 hover:bg-slate-50 dark:hover:bg-white/5 font-medium transition-all">
          <LinkIcon className="mr-2 h-4 w-4 text-slate-500" />
          Gerador UTM
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/60 dark:border-white/10 rounded-[2rem] p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Gerador de Links UTM</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
            Crie URLs rastreáveis com parâmetros UTM e macros do Taboola.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8 py-4 max-h-[60vh] overflow-y-auto px-1 scrollbar-hide">

          {/* 1. Link Base */}
          <div className="space-y-2.5">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Link Base (Destino)</Label>
            <Input
              value={baseLink}
              onChange={(e) => setBaseLink(e.target.value)}
              placeholder="https://seuhotsite.com/oferta"
              className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl h-10 text-sm focus-visible:ring-slate-400/20"
              required
            />
          </div>

          {/* 2. Parâmetros UTM */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-tight text-slate-900 dark:text-white">Configurar Rastreamento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-slate-50/50 dark:bg-black/20 rounded-[1.5rem] p-6 border border-slate-100 dark:border-white/5">
              {TRACKING_OPTIONS.map(option => (
                <div key={option.key} className="flex items-center gap-3 min-h-[2.5rem]">
                  <Checkbox
                    id={`utm-${option.key}`}
                    checked={!!selectedParams[option.key]}
                    onCheckedChange={(checked) => handleParamToggle(option.key, checked as boolean)}
                    className="rounded-md border-slate-300 dark:border-white/20 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-white"
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <Label htmlFor={`utm-${option.key}`} className="cursor-pointer font-medium text-xs text-slate-700 dark:text-slate-300 truncate">
                      {option.label}
                    </Label>
                    {!option.isMacro && selectedParams[option.key] !== undefined && (
                      <Input
                        value={selectedParams[option.key] as string}
                        onChange={(e) => handleParamValueChange(option.key, e.target.value)}
                        placeholder="Valor"
                        className="h-7 text-[10px] bg-white dark:bg-black/40 border-slate-200 dark:border-white/10 rounded-lg mt-1 focus-visible:ring-slate-400/10 px-2"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Link Gerado */}
          <div className="space-y-2.5">
            <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Link Final Gerado</Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  value={generatedLink}
                  readOnly
                  className="bg-slate-50 dark:bg-black/30 border-slate-200/60 dark:border-white/5 rounded-xl block w-full pr-12 font-mono text-[10px] text-slate-500 dark:text-slate-400 h-11"
                />
                <Button
                  type="button"
                  onClick={handleCopy}
                  disabled={!isReady}
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-9 w-9 bg-white dark:bg-white/5 rounded-lg text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

        </div>
        <DialogFooter className="pt-4 sm:justify-center">
          <Button onClick={() => setIsOpen(false)} variant="ghost" className="rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white">
            Fechar Gerador
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}