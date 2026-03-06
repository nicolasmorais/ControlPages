"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { Skeleton } from '@/components/ui/skeleton';
import { ContentBlock, CustomAdvertorialHeader, CustomAdvertorial, CustomAdvertorialFooter, PagePixelConfig, defaultCustomAdvertorialFooter } from '@/lib/advertorial-types';
import Link from 'next/link';
import { getDefaultBlock } from '@/lib/advertorial-utils';
import { cn } from '@/lib/utils';
import { ArrowLeft, ExternalLink, Save, Loader2, Copy } from 'lucide-react';

// Import modular components
import { HeaderEditor } from '@/components/dashboard/custom-advertorials/HeaderEditor';
import { BlocksEditor } from '@/components/dashboard/custom-advertorials/BlocksEditor';
import { FooterEditor } from '@/components/dashboard/custom-advertorials/FooterEditor';
import { PixelEditor } from '@/components/dashboard/custom-advertorials/PixelEditor';

export default function CustomAdvertorialEditor() {
    const params = useParams();
    const router = useRouter();

    const advertorialId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || 'new';
    const isNew: boolean = advertorialId === 'new';

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [header, setHeader] = useState<CustomAdvertorialHeader>({ preTitle: '', title: '', subheadline: '', fontFamily: 'sans' });
    const [blocks, setBlocks] = useState<ContentBlock[]>([]);
    const [footer, setFooter] = useState<CustomAdvertorialFooter | null>(null);
    const [pixels, setPixels] = useState<PagePixelConfig>({ metaPixelId: '', taboolaPixelId: '', customScripts: '', useGlobalPixels: true });

    const defaultFooter: CustomAdvertorialFooter = useMemo(() => defaultCustomAdvertorialFooter, []);

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/custom-advertorials/${advertorialId}`)
                .then((res: Response) => {
                    if (!res.ok) throw new Error('Not found');
                    return res.json();
                })
                .then((data: CustomAdvertorial) => {
                    setName(data.name);
                    setHeader({ ...data.header, fontFamily: data.header.fontFamily || 'sans' });
                    setBlocks(data.blocks.map((b: ContentBlock) => {
                        const { fontFamily, ...rest } = b;
                        return rest;
                    }));
                    setFooter({
                        ...defaultFooter,
                        ...(data.footer || {}),
                        hideDisclaimers: data.footer?.hideDisclaimers ?? false,
                        hideCompanyInfo: data.footer?.hideCompanyInfo ?? false,
                        hidePolicies: data.footer?.hidePolicies ?? false,
                    });
                    setPixels(data.pixels || { metaPixelId: '', taboolaPixelId: '', customScripts: '', useGlobalPixels: true });
                })
                .catch((error) => {
                    console.error('Erro ao carregar advertorial:', error);
                    toast.error("Advertorial não encontrado.");
                    router.push('/dashboard/custom-advertorials');
                })
                .finally(() => setIsLoading(false));
        } else {
            setName('Novo Advertorial Dinâmico');
            setHeader({
                preTitle: 'Reportagem Especial',
                title: 'Título do Seu Novo Conteúdo',
                subheadline: 'Subtítulo atraente para prender o leitor.',
                fontFamily: 'sans'
            });
            setBlocks([getDefaultBlock('text'), getDefaultBlock('pricing')]);
            setFooter(defaultFooter);
            setPixels({ metaPixelId: '', taboolaPixelId: '', customScripts: '', useGlobalPixels: true });
            setIsLoading(false);
        }
    }, [advertorialId, isNew, router, defaultFooter]);

    const handleHeaderChange = (field: keyof CustomAdvertorialHeader, value: string): void => {
        setHeader(prev => ({ ...prev, [field]: value }));
    };

    const handleFooterChange = (section: keyof CustomAdvertorialFooter | 'copyright' | 'hideDisclaimers' | 'hideCompanyInfo' | 'hidePolicies', field: string, value: any): void => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            if (section === 'companyInfo') {
                newFooter.companyInfo = { ...newFooter.companyInfo, [field]: value };
            } else if (section === 'copyright') {
                newFooter.copyright = value;
            } else if (section.startsWith('hide')) {
                (newFooter as any)[section] = value;
            }
            return newFooter;
        });
    };

    const handleFooterArrayChange = <T extends object>(arrayName: 'disclaimers' | 'policies', index: number, field: keyof T, value: string): void => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            const array = (newFooter as any)[arrayName] as T[];
            array[index] = { ...array[index], [field]: value };
            return newFooter;
        });
    };

    const handleAddFooterItem = (arrayName: 'disclaimers' | 'policies'): void => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            if (arrayName === 'disclaimers') {
                newFooter.disclaimers.push({ title: `Novo Aviso`, text: 'Conteúdo do aviso aqui.' });
            } else if (arrayName === 'policies') {
                newFooter.policies.push({ title: `Nova Política`, trigger: `Link da Política`, content: 'Texto completo da política.' });
            }
            return newFooter;
        });
    };

    const handleRemoveFooterItem = (arrayName: 'disclaimers' | 'policies', index: number): void => {
        setFooter(prev => {
            if (!prev) return null;
            const newFooter = { ...prev };
            (newFooter as any)[arrayName] = (newFooter as any)[arrayName].filter((_: any, i: number) => i !== index);
            return newFooter;
        });
    };

    const handlePixelChange = (field: keyof PagePixelConfig, value: string | boolean): void => {
        setPixels(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async (): Promise<void> => {
        if (!name || blocks.length === 0 || !footer) {
            toast.error("Nome, Blocos e Rodapé são campos obrigatórios.");
            return;
        }
        setIsSaving(true);
        const payload: CustomAdvertorial = { id: isNew ? '' : advertorialId, name, header, blocks, footer, pixels };
        try {
            const response = await fetch('/api/custom-advertorials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error('Save error');
            const result = await response.json();
            toast.success("Salvo com sucesso!");
            if (isNew) router.replace(`/dashboard/custom-advertorials/${result.advertorial.id}`);
        } catch (error) {
            toast.error("Erro ao salvar.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDuplicateInEditor = async (): Promise<void> => {
        if (isNew) return;

        setIsSaving(true);
        toast.loading("Duplicando advertorial...", { id: "duplicate-toast" });

        try {
            // Criar payload para duplicação (sem ID para o backend gerar um novo)
            const duplicatePayload: CustomAdvertorial = {
                id: '', // Backend gera um novo UUID
                name: `${name} (Cópia)`,
                header,
                blocks,
                footer,
                pixels
            };

            const response = await fetch('/api/custom-advertorials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(duplicatePayload),
            });

            if (!response.ok) throw new Error('Save error');
            const result = await response.json();

            toast.success("Duplicado com sucesso!", { id: "duplicate-toast" });

            // Redirecionar para o novo advertorial criado
            router.push(`/dashboard/custom-advertorials/${result.advertorial.id}`);
        } catch (error) {
            toast.error("Erro ao duplicar.", { id: "duplicate-toast" });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || !footer) {
        return (
            <div className="space-y-6 max-w-5xl mx-auto p-4 animate-in fade-in duration-500">
                <Skeleton className="h-20 w-full rounded-2xl bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-64 w-full rounded-3xl bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-96 w-full rounded-3xl bg-slate-100 dark:bg-slate-800" />
            </div>
        );
    }

    return (
        <>
            <Toaster richColors position="top-right" />

            {/* Editor Container */}
            <div className="max-w-5xl mx-auto pb-20">

                {/* Floating Action Header */}
                <div className="sticky top-0 z-30 mb-8 py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 -mx-4 px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/custom-advertorials">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                                {isNew ? "Novo Conteúdo" : name}
                            </h1>
                            <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-widest">Editor Dinâmico</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {!isNew && (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={handleDuplicateInEditor}
                                    disabled={isSaving}
                                    className="rounded-xl font-bold h-11 px-5 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                                >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Duplicar
                                </Button>
                                <Link href={`/${advertorialId}`} target="_blank">
                                    <Button variant="outline" className="rounded-xl font-bold h-11 px-5 border-slate-200 dark:border-slate-800">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Visualizar
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-[#0061FE] hover:bg-[#0054DA] text-white rounded-xl font-bold h-11 px-6 shadow-lg shadow-blue-500/20"
                        >
                            {isSaving ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            {isSaving ? "Salvando..." : "Salvar Agora"}
                        </Button>
                    </div>
                </div>

                <div className="space-y-10 px-2 animate-in slide-in-from-bottom-4 duration-700">
                    {/* Modular Editors with Refined Styling */}
                    <div className="group">
                        <HeaderEditor
                            name={name}
                            header={header}
                            setName={setName}
                            handleHeaderChange={handleHeaderChange}
                        />
                    </div>

                    <div className="group">
                        <PixelEditor
                            pixels={pixels}
                            handlePixelChange={handlePixelChange}
                        />
                    </div>

                    <div className="group">
                        <BlocksEditor
                            blocks={blocks}
                            setBlocks={setBlocks}
                            onSave={handleSave}
                            isSaving={isSaving}
                            name={name}
                        />
                    </div>

                    <div className="group">
                        <FooterEditor
                            footer={footer}
                            handleFooterChange={handleFooterChange}
                            handleFooterArrayChange={handleFooterArrayChange as any}
                            handleAddFooterItem={handleAddFooterItem}
                            handleRemoveFooterItem={handleRemoveFooterItem}
                            onSave={handleSave}
                            isSaving={isSaving}
                            name={name}
                        />
                    </div>

                    {/* Final Save Button for Easy Access */}
                    <div className="flex justify-center pt-6">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            size="lg"
                            className="bg-[#0061FE] hover:bg-[#0054DA] text-white rounded-2xl font-black h-16 px-12 shadow-xl shadow-blue-500/30 text-xl transition-all hover:scale-105 active:scale-95"
                        >
                            {isSaving ? <Loader2 className="h-6 w-6 animate-spin mr-3" /> : <Save className="h-6 w-6 mr-3" />}
                            {isSaving ? "SALVANDO..." : "CONCLUIR E SALVAR"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}