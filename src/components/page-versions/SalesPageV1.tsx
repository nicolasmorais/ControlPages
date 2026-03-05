"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTracker } from './PageTracker';

export function SalesPageV1() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-red-100 selection:text-red-900 leading-relaxed">
            <PageTracker contentId="vsl-insubeta" />

            {/* Top Banner - Urgency/Constraint */}
            <div className="bg-slate-900 text-white py-3 px-4 text-center text-base md:text-lg font-bold tracking-tight">
                <span className="text-red-500 animate-pulse">●</span> OFERTA EXCLUSIVA: FRETE GRÁTIS PARA TODO O BRASIL HOJE
            </div>

            {/* Hero Section */}
            <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-40">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-50 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-100/30 blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-top-8 duration-1000">
                        {/* Tagline */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 text-[#DC2626] rounded-full text-sm md:text-base font-black uppercase tracking-[0.2em]">
                            <ShieldCheck className="w-5 h-5" /> TRATAMENTO NATURAL CERTIFICADO
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 leading-[1.05] tracking-tighter">
                            Todo dia você acorda com medo do <span className="text-[#DC2626]">número no aparelhinho.</span>
                        </h1>

                        {/* Subheadline/Bridge */}
                        <p className="text-2xl md:text-4xl text-slate-600 font-bold leading-tight max-w-4xl mx-auto">
                            Isso não vai mudar enquanto o problema de verdade — a <span className="text-slate-950 font-black underline decoration-red-500 decoration-8 underline-offset-4">resistência à insulina</span> — não for tratado.
                        </p>

                        {/* Social Proof Bar */}
                        <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-10 pt-6">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-white bg-slate-200 shadow-md">
                                            <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="avatar" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-lg md:text-2xl font-black text-slate-900">+50 mil brasileiros</span>
                            </div>
                            <div className="h-8 w-px bg-slate-300 hidden md:block" />
                            <div className="flex items-center gap-2 text-red-600">
                                {[1, 2, 3, 4, 5].map(i => <Zap key={i} className="w-6 h-6 md:w-8 md:h-8 fill-current" />)}
                                <span className="text-lg md:text-2xl font-black text-slate-900 ml-2">Tecnologia InsuBeta</span>
                            </div>
                        </div>
                    </div>


                    {/* Benefits List (Post-Hero) */}
                    <div className="mt-24 max-w-5xl mx-auto">
                        <div className="bg-red-50/40 rounded-[64px] p-10 md:p-20 border-2 border-red-100 text-center shadow-xl">
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 leading-tight">
                                50 mil brasileiros trataram a raiz com InsuBeta e finalmente viram a <span className="text-[#DC2626]">glicose responder.</span>
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
                                {[
                                    { t: "Sem dieta radical", d: "Não precisa cortar o arroz e feijão para ter resultados." },
                                    { t: "Sem trocar remédio", d: "Funciona em conjunto com o seu tratamento atual." },
                                    { t: "Ação na Raiz", d: "Ataca a resistência à insulina, não apenas o sintoma." }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-6 items-center md:items-start text-center md:text-left p-2">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl md:text-2xl font-black text-slate-900">{item.t}</h4>
                                            <p className="text-lg md:text-xl text-slate-600 font-medium mt-2 leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mega CTA */}
                            <div className="mt-16 text-center">
                                <Button className="w-full md:w-auto h-24 px-16 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full font-black text-2xl md:text-3xl shadow-2xl shadow-red-500/40 transition-all hover:scale-[1.03] active:scale-95 group uppercase tracking-tight">
                                    Quero Tratar a Raiz Agora <ArrowRight className="ml-3 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                                </Button>
                                <p className="mt-8 text-sm md:text-lg font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-3">
                                    <ShieldCheck className="w-6 h-6" /> Compra 100% Segura e Garantida
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why it Works Section (Enhanced for Senior Reading) */}
                <section className="mt-32 max-w-6xl mx-auto px-6 py-24 bg-slate-50 rounded-[64px] border border-slate-100 italic-none shadow-sm">
                    <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight">
                            POR QUE O INSUBETA FUNCIONA QUANDO <span className="text-[#DC2626]">TUDO MAIS FALHOU</span>
                        </h2>
                        <p className="text-2xl md:text-3xl text-slate-600 font-bold italic-none leading-relaxed">Não é mais uma promessa. Tem uma razão científica para isso.</p>
                    </div>

                    <div className="space-y-16">
                        <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-[1.5] space-y-8">
                                <p className="text-slate-800 leading-relaxed text-2xl md:text-3xl font-medium">
                                    Existe um motivo pelo qual você faz tudo certo e a glicose não cede. Ele tem nome: <span className="text-slate-950 font-black underline decoration-[#DC2626] decoration-[6px] underline-offset-4">resistência à insulina.</span>
                                </p>
                                <p className="text-slate-700 leading-relaxed text-xl md:text-2xl">
                                    É quando suas células param de responder ao sinal da insulina. O açúcar fica no sangue, circulando, danificando — mesmo com dieta, mesmo com remédio.
                                </p>
                                <p className="text-slate-700 leading-relaxed font-bold text-xl md:text-2xl">
                                    Enquanto isso não for tratado diretamente, nada do que você já faz vai funcionar do jeito que deveria. <span className="text-[#DC2626] font-black underline decoration-[4px] underline-offset-4">O InsuBeta foi criado exatamente para isso.</span>
                                </p>
                            </div>
                            <div className="w-full md:w-1/3 aspect-square bg-red-50 rounded-[32px] flex items-center justify-center p-12">
                                <ShieldCheck className="w-full h-full text-[#DC2626] animate-pulse" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    t: "Age na raiz, não no sintoma",
                                    d: "Remédio baixa a glicose. Dieta controla o que entra. O InsuBeta trata por que a glicose está alta — a resistência à insulina. Quando a raiz é tratada, tudo que você já faz começa a ter resultado.",
                                    icon: "✦"
                                },
                                {
                                    t: "Cinco ativos agindo juntos",
                                    d: "Não é um ingrediente isolado. São cinco compostos comprovados: restaura a insulina, acelera o metabolismo, protege nervos e o coração, e elimina o desejo por doce. Juntos, eles fecham o ciclo.",
                                    icon: "✦"
                                },
                                {
                                    t: "Protege o que a glicose está destruindo",
                                    d: "Olhos, nervos e coração. A glicose age em silêncio nesses lugares. O InsuBeta não só baixa o número — ele protege cada órgão enquanto o tratamento age na raiz.",
                                    icon: "✦"
                                },
                                {
                                    t: "Potencializa seus resultados",
                                    d: "Não precisa de nova dieta. Não troca seu remédio. Ele entra no seu dia a dia para fazer o seu esforço finalmente valer a pena.",
                                    icon: "✦"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-10 rounded-[48px] border-2 border-slate-100 hover:border-red-200 transition-colors shadow-sm">
                                    <div className="text-[#DC2626] text-4xl font-black mb-6">{item.icon}</div>
                                    <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight">{item.t}</h4>
                                    <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-medium">{item.d}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-[#DC2626] p-12 md:p-20 rounded-[64px] text-white flex flex-col items-center text-center space-y-8 shadow-2xl">
                            <ShieldCheck className="w-24 h-24" />
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-black leading-tight">Notificado na ANVISA.<br />Produzido no Brasil.</h1>
                                <p className="text-xl md:text-3xl text-red-50 leading-relaxed max-w-3xl font-medium">
                                    Você sabe o que está tomando, de onde veio e que passou pelos critérios mais rigorosos de segurança.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonial Gallery Section (With Larger Text) */}
                <section className="mt-40 max-w-6xl mx-auto px-6 py-10">
                    <div className="text-center mb-20 space-y-6">
                        <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight max-w-5xl mx-auto">
                            Elas também achavam que não tinha mais jeito. <span className="text-[#DC2626]">Até resolverem.</span>
                        </h2>
                        <p className="text-xl md:text-3xl text-slate-500 font-bold leading-relaxed">Histórias reais de quem recuperou a liberdade e o controle da vida.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="group relative aspect-video bg-slate-100 rounded-[48px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-4 border-slate-50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                <img
                                    src={`https://images.unsplash.com/photo-${i === 1 ? '1551076805-e1869033e561' : i === 2 ? '1581579438747-1dc8d17bbce4' : i === 3 ? '1576091160550-217359f48f4c' : i === 4 ? '1543332164-6e82f355badc' : i === 5 ? '1516589174184-c67086636260' : '1559839734-2b71f153671f'}?auto=format&fit=crop&q=80&w=600`}
                                    alt={`Depoimento ${i}`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl inline-block">
                                        <span className="text-[#DC2626] font-black text-base md:text-lg uppercase tracking-widest flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5" /> Caso Verificado {i}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <p className="text-slate-400 font-black text-lg md:text-2xl uppercase tracking-[0.3em]">Resultados comprovados por estudos clínicos e laboratoriais</p>
                    </div>
                </section>
            </section>
        </div>
    );
}
