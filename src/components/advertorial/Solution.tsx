"use client";

import { Badge } from "@/components/ui/badge";
import { Leaf, Check, ShieldCheck, Microscope, FlaskConical, Sparkles } from "lucide-react";

export const Solution = () => {
    return (
        <section className="my-32 space-y-20 text-xl leading-relaxed">
            <div className="text-center max-w-4xl mx-auto space-y-6">
                <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest">A Descoberta que a Big Pharma Oculta</span>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                    O Pâncreas Não Está Morto. Ele Está <span className="relative inline-block">
                        <span className="relative z-10 text-blue-600">Adormecido.</span>
                        <span className="absolute bottom-2 left-0 w-full h-4 bg-blue-100 -z-10 rounded-full"></span>
                    </span>
                </h2>
                <p className="text-2xl md:text-3xl text-slate-500 font-medium italic max-w-2xl mx-auto">
                    "Existe uma forma natural de estimular a regeneração dessas células."
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 p-1 md:p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-[4rem] shadow-2xl shadow-green-200">
                    <div className="h-full bg-white rounded-[3.5rem] p-8 md:p-12 space-y-10">
                        <div className="relative group rounded-[2.5rem] overflow-hidden shadow-xl">
                            <img
                                src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2020_24_07-CegP8MFAadFJUCgpK40pYN2w5o7Ilv.png"
                                alt="Bebida ancestral"
                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl text-green-600 shadow-xl">
                                <Sparkles size={24} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <div className="bg-green-600 p-2 rounded-2xl text-white shadow-lg shadow-green-100">
                                    <Leaf size={28} />
                                </div>
                                Protocolo Oriental Validado
                            </h3>
                            <p className="text-slate-600 text-2xl font-medium leading-snug">
                                Dr. Yano revelou uma <span className="text-slate-900 font-black underline decoration-green-500/30 decoration-8 underline-offset-2">bebida medicinal japonesa ancestral</span> que age em três pilares fundamentais:
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Desinflama o tecido pancreático e as células beta",
                                    "Reativa a produção endógena de insulina",
                                    "Estabiliza os níveis glicêmicos sem efeitos colaterais"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 transition-all hover:bg-green-50 hover:border-green-200 group">
                                        <div className="bg-white p-1 rounded-full text-green-500 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                            <Check className="h-6 w-6" />
                                        </div>
                                        <span className="font-black text-slate-800 text-lg leading-tight">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10"><FlaskConical size={80} /></div>
                                <p className="font-black text-2xl relative z-10">Em 28 dias, os exames de Manoel se normalizaram: 98 mg/dL.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div className="flex-1 p-10 bg-slate-50 rounded-[3.5rem] border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div className="rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white">
                                <img
                                    src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%203%20de%20dez.%20de%202025%2C%2021_10_34-NTd4IPZ5iz7r2y4Z8tthkLa05ZVN6Y.png"
                                    alt="Gráfico científico"
                                    className="w-full h-auto"
                                />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                                <div className="bg-blue-600 p-2 rounded-2xl text-white shadow-lg">
                                    <Microscope size={28} />
                                </div>
                                Evidências Científicas
                            </h3>
                            <p className="text-slate-600 font-medium">
                                Pesquisas no <span className="italic font-bold text-slate-900 underline">Journal of Medicinal Food</span> confirmam que os compostos ativos do chá reduzem marcadores inflamatórios e aumentam a sensibilidade celular à insulina.
                            </p>
                        </div>
                        <Badge className="mt-8 text-lg p-8 font-black w-full text-center bg-blue-600 text-white rounded-[2rem] shadow-2xl hover:bg-blue-700 transition-all block border-none scale-105">
                            82% estabilizaram abaixo de 100 mg/dL em 3 semanas.
                        </Badge>
                    </div>

                    <div className="p-10 bg-white rounded-[3.5rem] border border-slate-100 shadow-xl space-y-8">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                            <Sparkles className="text-blue-500 h-7 w-7" />
                            Alcance Global
                        </h3>
                        <div className="space-y-6">
                            {[
                                { t: "7 em cada 10 usuários", d: "eliminaram o uso de insulina em 90 dias." },
                                { t: "91% de melhora", d: "na fadiga, tonturas e formigamentos." },
                                { t: "84% de melhora", d: "expressiva na cicatrição e pressão arterial." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <ShieldCheck className="h-7 w-7 text-blue-600 shrink-0 mt-1" />
                                    <p className="text-slate-600 text-base leading-snug">
                                        <span className="font-black text-slate-900 block">{item.t}</span> {item.d}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};