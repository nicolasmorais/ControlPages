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
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

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
        <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gerenciamento de Pixels</h1>
                    <p className="text-slate-500 font-medium tracking-tight">Configure seus códigos do Taboola, Facebook, etc.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingPixel({ provider: 'taboola', active: true, content_id: 'all' })} className="bg-[#0061FE] hover:bg-[#0054DA] rounded-xl font-bold gap-2 text-white">
                            <Plus size={20} />
                            Adicionar Pixel
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-white">
                        <DialogHeader>
                            <DialogTitle>{editingPixel?.id ? 'Editar Pixel' : 'Novo Pixel'}</DialogTitle>
                            <DialogDescription>Insira o código fornecido pela plataforma.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Nome Interno</label>
                                <Input placeholder="Ex: Lead Taboola Advinsu" value={editingPixel?.name || ''} onChange={(e) => setEditingPixel({ ...editingPixel, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Provedor</label>
                                    <Select value={editingPixel?.provider || 'taboola'} onValueChange={(v) => setEditingPixel({ ...editingPixel, provider: v })}>
                                        <SelectTrigger><SelectValue placeholder="Selecione o provedor" /></SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="taboola">Taboola</SelectItem>
                                            <SelectItem value="facebook">Facebook</SelectItem>
                                            <SelectItem value="google">Google Tag</SelectItem>
                                            <SelectItem value="other">Outro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Página de Destino</label>
                                    <Select value={editingPixel?.content_id || 'all'} onValueChange={(v) => setEditingPixel({ ...editingPixel, content_id: v })}>
                                        <SelectTrigger><SelectValue placeholder="Global" /></SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {STATIC_PAGE_IDS.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Código do Pixel (HTML/Script)</label>
                                <Textarea
                                    className="min-h-[200px] font-mono text-xs bg-slate-50 border-slate-200"
                                    placeholder="Cole aqui seu código <script>..."
                                    value={editingPixel?.code || ''}
                                    onChange={(e) => setEditingPixel({ ...editingPixel, code: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl">Cancelar</Button>
                            <Button onClick={handleSave} className="bg-[#0061FE] hover:bg-[#0054DA] rounded-xl text-white">Salvar Pixel</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {isLoading ? (
                    <div className="text-center py-10">Carregando pixels...</div>
                ) : pixels.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400">
                        Nenhum pixel cadastrado.
                    </div>
                ) : (
                    pixels.map(pixel => (
                        <Card key={pixel.id} className="border-slate-200 shadow-sm overflow-hidden">
                            <div className="flex items-center p-6 gap-6">
                                <div className={cn("p-4 rounded-2xl", pixel.provider === 'taboola' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500')}>
                                    {pixel.provider === 'taboola' ? <Tag size={24} /> : <Code size={24} />}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-slate-900 text-lg truncate">{pixel.name}</h3>
                                        <Badge variant="outline" className="uppercase text-[10px] bg-slate-50 border-slate-200 text-slate-500 font-bold tracking-widest">
                                            {STATIC_PAGE_IDS.find(p => p.id === (pixel.content_id || 'all'))?.name}
                                        </Badge>
                                    </div>
                                    <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest leading-none">
                                        {pixel.provider} • ID: {pixel.id.slice(0, 8)}...
                                    </p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {pixel.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                        <Switch checked={pixel.active} onCheckedChange={() => toggleStatus(pixel)} />
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="secondary" size="icon" className="rounded-xl h-10 w-10" onClick={() => { setEditingPixel(pixel); setIsDialogOpen(true); }}>
                                            <Settings2 size={18} className="text-slate-600" />
                                        </Button>
                                        <Button variant="destructive" size="icon" className="rounded-xl h-10 w-10 bg-red-50 hover:bg-red-100 text-red-500 border-none shadow-none" onClick={() => handleDelete(pixel.id)}>
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Back Redirect Section */}
            <div className="pt-12 border-t border-slate-100">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Back Redirect</h2>
                    <p className="text-slate-500 font-medium tracking-tight">
                        Redirecione o usuário quando ele clicar no botão "voltar" do navegador.
                    </p>
                </div>

                <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400">Novo Redirecionamento</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Página de Origem</label>
                                <Select value={newRedirect.contentId} onValueChange={(v) => setNewRedirect({ ...newRedirect, contentId: v })}>
                                    <SelectTrigger className="bg-white"><SelectValue placeholder="Selecione a página" /></SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {STATIC_PAGE_IDS.map(p => (
                                            <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 md:col-span-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Link de Destino</label>
                                <Input
                                    placeholder="https://sua-pagina-de-vendas.com"
                                    className="bg-white"
                                    value={newRedirect.url}
                                    onChange={(e) => setNewRedirect({ ...newRedirect, url: e.target.value })}
                                />
                            </div>
                            <Button
                                className="bg-[#0061FE] hover:bg-[#0054DA] rounded-xl font-bold gap-2 text-white h-10"
                                onClick={async () => {
                                    if (!newRedirect.url) return toast.error("Insira a URL");
                                    const res = await fetch('/api/back-redirect', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(newRedirect)
                                    });
                                    if (res.ok) {
                                        toast.success("Back Redirect configurado!");
                                        setNewRedirect({ ...newRedirect, url: '' });
                                    }
                                }}
                            >
                                <ArrowLeftSquare size={18} />
                                Ativar Redirecionamento
                            </Button>
                        </div>
                        <p className="mt-4 text-[10px] text-slate-400 font-medium italic">
                            * O redirecionamento funciona manipulando o histórico do navegador (History API).
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function cn(...classes: any[]) { return classes.filter(Boolean).join(' '); }
