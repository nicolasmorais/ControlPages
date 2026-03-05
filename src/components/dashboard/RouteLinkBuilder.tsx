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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Link as LinkIcon, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ContentOption {
  id: string;
  name: string;
}

interface RouteLinkBuilderProps {
  contentOptions: ContentOption[];
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

export function RouteLinkBuilder({ contentOptions }: RouteLinkBuilderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkBase, setLinkBase] = useState('');
  const [selectedContentId, setSelectedContentId] = useState('');
  const [selectedParams, setSelectedParams] = useState<Record<string, string | boolean>>({
    utm_source: true,
    utm_medium: true,
  });

  // Cores Dinâmicas
  const cardBg = 'bg-white dark:bg-[#1e293b]';
  const borderColor = 'border-gray-200 dark:border-[#334155]';
  const inputBg = 'bg-gray-100 dark:bg-[#020617]';
  const selectContentBg = 'bg-white dark:bg-[#1e293b]';
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
    if (!linkBase || !selectedContentId) return 'Preencha o link base e selecione o conteúdo.';

    const url = new URL(linkBase);

    // Adiciona o contentId como parâmetro 'adv_id'
    url.searchParams.set('adv_id', selectedContentId);

    // Adiciona os parâmetros selecionados
    Object.entries(selectedParams).forEach(([key, value]) => {
      if (value === true) {
        // Macro do Taboola
        url.searchParams.set(key, `{${key}}`);
      } else if (typeof value === 'string' && value.trim()) {
        // UTM com valor fixo
        url.searchParams.set(key, value.trim());
      }
    });

    // Retorna a URL como string, removendo o '?' se não houver parâmetros além do adv_id
    let finalUrl = url.toString();

    // Se o link base original não tinha search params, e o novo só tem o adv_id, 
    // precisamos garantir que o formato de macro {macro} seja mantido se for o caso.
    // A URL API codifica { e }, então precisamos reverter isso para as macros.
    finalUrl = finalUrl.replace(/%7B/g, '{').replace(/%7D/g, '}');

    return finalUrl;
  }, [linkBase, selectedContentId, selectedParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link de rastreamento copiado para a área de transferência!");
  };

  const isReady = linkBase && selectedContentId && generatedLink.startsWith('http');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={primaryButtonClasses}>
          <Plus className="mr-2 h-4 w-4" />
          Gerar Link de Rastreamento
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[650px]", cardBg, borderColor, textColor)}>
        <DialogHeader>
          <DialogTitle>Gerador de Links de Rastreamento</DialogTitle>
          <DialogDescription className={labelColor}>
            Crie um link de checkout com parâmetros UTM e macros do Taboola anexados.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">

          {/* 1. Link Base */}
          <div className="space-y-2">
            <Label className={labelColor}>Link Base do Checkout (URL Completa)</Label>
            <Input
              value={linkBase}
              onChange={(e) => setLinkBase(e.target.value)}
              placeholder="https://seusite.com/checkout"
              className={cn(inputBg, borderColor, textColor)}
              required
            />
          </div>

          {/* 2. Conteúdo a Rastrear */}
          <div className="space-y-2">
            <Label className={labelColor}>Advertorial a Rastrear (adv_id)</Label>
            <Select value={selectedContentId} onValueChange={setSelectedContentId} required>
              <SelectTrigger className={cn(inputBg, borderColor, textColor)}>
                <SelectValue placeholder="Selecione o advertorial" />
              </SelectTrigger>
              <SelectContent className={cn(selectContentBg, textColor, borderColor)}>
                {contentOptions.map(opt => (
                  <SelectItem key={opt.id} value={opt.id} className="focus:bg-gray-100 dark:focus:bg-[#1e293b]">
                    {opt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">
              O ID do advertorial será anexado como <code className="bg-gray-200 dark:bg-[#334155] px-1 rounded">?adv_id={'{ID}'}</code>
            </p>
          </div>

          {/* 3. Parâmetros de Rastreamento */}
          <div className="space-y-4 p-4 border rounded-md bg-gray-50 dark:bg-[#0f172a]">
            <h3 className="font-semibold text-lg">Parâmetros UTM e Macros</h3>
            <div className="grid grid-cols-2 gap-4">
              {TRACKING_OPTIONS.map(option => (
                <div key={option.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`param-${option.key}`}
                    checked={!!selectedParams[option.key]}
                    onCheckedChange={(checked) => handleParamToggle(option.key, checked as boolean)}
                  />
                  <Label htmlFor={`param-${option.key}`} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                  {!option.isMacro && selectedParams[option.key] && (
                    <Input
                      value={selectedParams[option.key] as string}
                      onChange={(e) => handleParamValueChange(option.key, e.target.value)}
                      placeholder="Valor Fixo"
                      className={cn(inputBg, borderColor, textColor, "w-24 h-8 text-sm")}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Link Gerado */}
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
            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
              {isReady ? 'Copie e use este link na sua plataforma de anúncios.' : 'Preencha os campos acima para gerar o link.'}
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