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

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]';
  const primaryButtonClasses = 'bg-[#0061FE] hover:bg-[#0054DA] text-white';
  const textColor = 'text-gray-900 dark:text-white';
  const labelColor = 'text-gray-600 dark:text-zinc-300';

  const handleParamToggle = (key: string, isChecked: boolean) => {
    setSelectedParams(prev => {
      const newState = { ...prev };
      if (isChecked) {
        // Se for UTM, usa o valor padrão ou string vazia
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

      // Adiciona os parâmetros selecionados
      Object.entries(selectedParams).forEach(([key, value]) => {
        if (value === true) {
          // Macro da Taboola - adiciona sem codificar as chaves
          url.searchParams.set(key, `{${key}}`);
        } else if (typeof value === 'string' && value.trim()) {
          // UTM com valor fixo
          url.searchParams.set(key, value.trim());
        }
      });

      // Retorna a URL como string, garantindo que as macros não sejam codificadas
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
    toast.success("Link com UTMs e macros copiado para a área de transferência!");
  };

  const isReady = baseLink && generatedLink.startsWith('http');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={primaryButtonClasses}>
          <Plus className="mr-2 h-4 w-4" />
          Gerador de Links UTM
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[800px]", cardBg, borderColor, textColor)}>
        <DialogHeader>
          <DialogTitle>Gerador de Links com UTM e Macros Taboola</DialogTitle>
          <DialogDescription className={labelColor}>
            Crie URLs com parâmetros UTM e macros dinâmicas da Taboola para rastreamento completo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">

          {/* 1. Link Base */}
          <div className="space-y-2">
            <Label className={labelColor}>Link Base</Label>
            <Input
              value={baseLink}
              onChange={(e) => setBaseLink(e.target.value)}
              placeholder="https://seusite.com/checkout"
              className={cn(inputBg, borderColor, textColor)}
              required
            />
            <p className="text-xs text-gray-500 dark:text-zinc-500">
              URL base para onde os usuários serão redirecionados.
            </p>
          </div>

          {/* 2. Parâmetros UTM */}
          <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-[#0f172a]">
            <h3 className="font-semibold text-lg">Parâmetros UTM</h3>
            <div className="space-y-3">
              {TRACKING_OPTIONS.map(option => (
                <div key={option.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={`utm-${option.key}`}
                    checked={!!selectedParams[option.key]}
                    onCheckedChange={(checked) => handleParamToggle(option.key, checked as boolean)}
                  />
                  <Label htmlFor={`utm-${option.key}`} className="flex-1 cursor-pointer font-mono text-sm">
                    {option.label}
                  </Label>
                  {!option.isMacro && selectedParams[option.key] !== undefined && (
                    <Input
                      value={selectedParams[option.key] as string}
                      onChange={(e) => handleParamValueChange(option.key, e.target.value)}
                      placeholder="Valor Personalizado"
                      className={cn(inputBg, borderColor, textColor, "w-40 h-8 text-sm")}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Link Gerado */}
          <div className="space-y-2">
            <Label className={labelColor}>Link Gerado</Label>
            <div className="flex items-center gap-2">
              <Input
                value={generatedLink}
                readOnly
                className={cn(inputBg, borderColor, textColor, "font-mono text-sm")}
              />
              <Button
                type="button"
                onClick={handleCopy}
                disabled={!isReady}
                className={primaryButtonClasses}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-500">
              {isReady ? 'Copie e use este link nas suas campanhas Taboola.' : 'Preencha o link base e selecione os parâmetros.'}
            </p>
          </div>

        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}