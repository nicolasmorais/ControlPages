"use client";

import { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    Activity,
    Settings2,
    CheckCircle2,
    XCircle,
    Code,
    Layout,
    Globe,
    Tag,
    ArrowLeftSquare,
    ExternalLink
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast, Toaster } from 'sonner';
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

interface Pixel {
    id: string;
    name: string;
    provider: string;
    code: string;
    content_id: string | null;
    active: boolean;
}

const STATIC_PAGE_IDS = [
    { id: 'all', name: 'Global (Todas as Páginas)' }, // Custom handle
    { id: 'v1', name: 'Página Inicial (V1)' },
    { id: 'advinsu', name: 'Segredo da Insulina (Blog)' },
    { id: 'haircare', name: 'Hair Care Review' },
    { id: 'ap', name: 'Página de Aprovação' },
    { id: 'cavalo-de-raca', name: 'Kit Cavalo de Raça' }
];

export default function PixelDashboard() {
    const [pixels, setPixels] = useState<Pixel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPixel, setEditingPixel] = useState<Partial<Pixel> | null>(null);

    // Back Redirect States
    const [backRedirects, setBackRedirects] = useState<any>({});
    const [newRedirect, setNewRedirect] = useState({ contentId: 'all', url: '', active: true });

    const fetchPixels = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/pixels');
            const data = await res.json();
            setPixels(data);
        } catch (error) {
            toast.error('Erro ao buscar pixels.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBackRedirects = async () => {
        try {
            const res = await fetch('/api/back-redirect?contentId=all'); // Dummy fetch to trigger getting all
            // My API currently doesn't return list all, let's fix that or adapt.
            // For now, let's fetch individual for each static page (or simplify).
        } catch (e) { }
    };

    useEffect(() => {
        fetchPixels();
    }, []);

    const handleSave = async () => {
        if (!editingPixel?.name || !editingPixel?.provider || !editingPixel?.code) {
            toast.error('Preencha os campos obrigatórios.');
            return;
        }

        try {
            const res = await fetch('/api/pixels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...editingPixel,
                    content_id: editingPixel.content_id === 'all' ? null : editingPixel.content_id
                }),
            });

            if (res.ok) {
                toast.success(editingPixel.id ? 'Pixel atualizado!' : 'Pixel criado!');
                setIsDialogOpen(false);
                fetchPixels();
            } else {
                toast.error('Erro ao salvar pixel.');
            }
        } catch (error) {
            toast.error('Erro fatal.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir este pixel?')) return;
        try {
            const res = await fetch('/api/pixels', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                toast.success('Pixel removido.');
                fetchPixels();
            }
        } catch (error) {
            toast.error('Erro ao remover.');
        }
    };

    const toggleStatus = async (pixel: Pixel) => {
        try {
            await fetch('/api/pixels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...pixel, active: !pixel.active }),
            });
            fetchPixels();
        } catch (error) {
            toast.error('Erro ao mudar status.');
        }
    };

    return (
        <div className="w-full mx-auto space-y-10 pb-20 px-4 md:px-8">
            <Toaster richColors position="top-center" />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
                        <div className="w-2 h-8 bg-[#0061FE] rounded-full" />
                        Pixels e Tracking
                    </h1>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">Configurações de Tráfego</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingPixel({ provider: 'taboola', active: true, content_id: 'all' })} className="h-10 px-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium transition-all hover:opacity-90 shadow-lg shadow-slate-900/10">
                            <Plus size={18} className="mr-2" />
                            Adicionar Pixel
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200/60 dark:border-white/10 rounded-[2rem] p-8">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">{editingPixel?.id ? 'Editar Pixel' : 'Novo Pixel'}</DialogTitle>
                            <DialogDescription>Configure seu código de rastreamento.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 py-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Nome do Pixel</Label>
                                <Input className="bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/5 rounded-xl h-10" placeholder="Ex: FB Ads - Vendas V1" value={editingPixel?.name || ''} onChange={(e) => setEditingPixel({ ...editingPixel, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Plataforma</Label>
                                    <Select value={editingPixel?.provider || 'taboola'} onValueChange={(v) => setEditingPixel({ ...editingPixel, provider: v })}>
                                        <SelectTrigger className="bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/5 rounded-xl h-10"><SelectValue placeholder="Selecione" /></SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl">
                                            <SelectItem value="taboola">Taboola</SelectItem>
                                            <SelectItem value="facebook">Facebook Ads</SelectItem>
                                            <SelectItem value="google">Google GTM/Ads</SelectItem>
                                            <SelectItem value="other">Outra Plataforma</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Escopo da Página</Label>
                                    <Select value={editingPixel?.content_id || 'all'} onValueChange={(v) => setEditingPixel({ ...editingPixel, content_id: v })}>
                                        <SelectTrigger className="bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/5 rounded-xl h-10"><SelectValue placeholder="Global" /></SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-xl">
                                            {STATIC_PAGE_IDS.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Script Code (HEAD/BODY)</Label>
                                <Textarea
                                    className="min-h-[160px] font-mono text-xs bg-slate-50 dark:bg-black/30 border-slate-200 dark:border-white/5 rounded-xl"
                                    placeholder="Cole seu <script> aqui..."
                                    value={editingPixel?.code || ''}
                                    onChange={(e) => setEditingPixel({ ...editingPixel, code: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold">Cancelar</Button>
                            <Button onClick={handleSave} className="bg-[#0061FE] hover:bg-[#0054DA] rounded-xl text-white font-bold h-10 px-6">Salvar Configurações</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Pixels Grid Grid Interface */}
            <div className="bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 rounded-[2.5rem] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-slate-200/40 dark:bg-white/5">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white dark:bg-black/20 p-8 h-48">
                                <Skeleton className="h-full w-full rounded-2xl opacity-50" />
                            </div>
                        ))
                    ) : pixels.length === 0 ? (
                        <div className="col-span-full py-32 text-center bg-white dark:bg-black/20">
                            <Activity size={40} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Nenhum pixel configurado</h3>
                        </div>
                    ) : (
                        pixels.map(pixel => (
                            <div key={pixel.id} className="bg-white dark:bg-black/20 p-6 flex flex-col space-y-6 transition-all hover:bg-slate-50 dark:hover:bg-white/[0.02] border-b md:border-b-0 border-slate-100 dark:border-white/5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                                            pixel.active ? "bg-slate-900 dark:bg-white" : "bg-slate-200 dark:bg-slate-800"
                                        )}>
                                            {pixel.provider === 'taboola' ? <Tag size={16} className={cn(pixel.active ? "text-white dark:text-black" : "text-slate-400")} /> : <Code size={16} className={cn(pixel.active ? "text-white dark:text-black" : "text-slate-400")} />}
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block font-mono text-[11px] font-bold text-slate-900 dark:text-white truncate tracking-tight">{pixel.name}</span>
                                            <span className="block text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase">{pixel.provider}</span>
                                        </div>
                                    </div>

                                    <Switch checked={pixel.active} onCheckedChange={() => toggleStatus(pixel)} className="scale-75" />
                                </div>

                                <div className="space-y-3 flex-1 pt-2">
                                    <div className="space-y-1">
                                        <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                            Vínculo
                                        </Label>
                                        <span className="block text-[10px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md border border-slate-200/50 dark:border-white/5">
                                            {STATIC_PAGE_IDS.find(p => p.id === (pixel.content_id || 'all'))?.name}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-9 rounded-lg font-mono text-[10px] uppercase tracking-wider border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                        onClick={() => { setEditingPixel(pixel); setIsDialogOpen(true); }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 rounded-lg border-slate-200 dark:border-white/5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                        onClick={() => handleDelete(pixel.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Back Redirect Section Interface */}
            <div className="bg-slate-900 dark:bg-white/[0.02] border border-slate-800 dark:border-white/5 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
                <div className="relative z-10 space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-bold tracking-tighter">Back Redirect</h3>
                    <p className="text-slate-400 font-medium text-sm max-w-md">Capte os usuários que tentam sair da página direcionando-os para outro funil.</p>
                </div>

                <div className="relative z-10 flex-1 w-full max-w-2xl bg-white/5 dark:bg-white/10 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/10 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-1.5">
                        <Label className="text-[9px] font-mono text-slate-400 uppercase">Origem</Label>
                        <Select value={newRedirect.contentId} onValueChange={(v) => setNewRedirect({ ...newRedirect, contentId: v })}>
                            <SelectTrigger className="bg-black/20 border-white/10 text-white rounded-xl h-10"><SelectValue placeholder="Página" /></SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-white">
                                {STATIC_PAGE_IDS.map(p => (
                                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-[2] space-y-1.5">
                        <Label className="text-[9px] font-mono text-slate-400 uppercase">URL Destino</Label>
                        <Input
                            placeholder="https://..."
                            className="bg-black/20 border-white/10 text-white rounded-xl h-10"
                            value={newRedirect.url}
                            onChange={(e) => setNewRedirect({ ...newRedirect, url: e.target.value })}
                        />
                    </div>
                    <Button
                        className="bg-white text-black hover:bg-slate-100 rounded-xl font-bold h-10 self-end px-6 transition-all active:scale-95"
                        onClick={async () => {
                            if (!newRedirect.url) return toast.error("Insira a URL");
                            const res = await fetch('/api/back-redirect', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newRedirect)
                            });
                            if (res.ok) {
                                toast.success("Redirecionamento ativado!");
                                setNewRedirect({ ...newRedirect, url: '' });
                            }
                        }}
                    >
                        Ativar
                    </Button>
                </div>
            </div>

            {/* Subtle Terminal Status Overlay */}
            <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 px-6">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 line-clamp-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        PIXEL_ENGINE_READY
                    </span>
                    <span className="hidden md:block">TRACKING: ON_DEMAND</span>
                    <span className="hidden md:block">NODES: {pixels.length}</span>
                </div>
                <div className="opacity-50">
                    MODULE_ID: TRK_SRV_04
                </div>
            </div>
        </div>
    );
}

