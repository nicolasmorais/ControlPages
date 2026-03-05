"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomAdvertorialHeader } from '@/lib/advertorial-types';
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderEditorProps {
    name: string;
    header: CustomAdvertorialHeader;
    setName: (name: string) => void;
    handleHeaderChange: (field: keyof CustomAdvertorialHeader, value: string) => void;
}

const FONT_OPTIONS = [
    { value: 'merriweather', label: 'Merriweather (Serif)' },
    { value: 'sans', label: 'Default Sans (Space Grotesk)' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'open-sans', label: 'Open Sans' },
];

export const HeaderEditor = ({ name, header, setName, handleHeaderChange }: HeaderEditorProps) => {
    // Cores Dinâmicas
    const cardBg = 'bg-white dark:bg-[#1e293b]';
    const borderColor = 'border-gray-200 dark:border-[#334155]';
    const inputBg = 'bg-gray-100 dark:bg-[#020617]'; 
    const selectContentBg = 'bg-white dark:bg-[#1e293b]'; 
    const textColor = 'text-gray-900 dark:text-white';
    const labelColor = 'text-gray-600 dark:text-zinc-300';

    return (
        <Card className={cn(cardBg, borderColor, textColor)}>
            <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div><Label className={labelColor}>Nome Interno</Label><Input className={cn(inputBg, borderColor, textColor)} value={name} onChange={e => setName(e.target.value)} /></div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div><Label className={labelColor}>Pré-Título</Label><Input className={cn(inputBg, borderColor, textColor)} value={header.preTitle} onChange={e => handleHeaderChange('preTitle', e.target.value)} /></div>
                    <div><Label className={labelColor}>Família da Fonte (Global)</Label>
                        <Select 
                            value={header.fontFamily || 'sans'} 
                            onValueChange={(v) => handleHeaderChange('fontFamily', v)}
                        >
                            <SelectTrigger className={cn(inputBg, borderColor, textColor)}>
                                <SelectValue placeholder="Selecione a fonte" />
                            </SelectTrigger>
                            <SelectContent className={cn(selectContentBg, textColor, borderColor)}>
                                {FONT_OPTIONS.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value} className={`focus:bg-gray-100 dark:focus:bg-[#1e293b] font-${opt.value}`}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                
                <div><Label className={labelColor}>Título Principal</Label><Input className={cn(inputBg, borderColor, textColor)} value={header.title} onChange={e => handleHeaderChange('title', e.target.value)} /></div>
                <div><Label className={labelColor}>Sub-headline</Label><Input className={cn(inputBg, borderColor, textColor)} value={header.subheadline} onChange={e => handleHeaderChange('subheadline', e.target.value)} /></div>
            </CardContent>
        </Card>
    );
};