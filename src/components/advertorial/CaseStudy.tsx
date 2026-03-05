"use client";

import { User, CheckCircle2, ShieldAlert, Award } from "lucide-react";

export const CaseStudy = () => {
  return (
    <section className="my-24 relative">
      <div className="absolute inset-0 bg-blue-600 rounded-[4rem] rotate-1 scale-[1.02] opacity-5"></div>
      <div className="relative p-8 md:p-16 bg-white rounded-[4rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="w-full md:w-auto">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 bg-blue-600 text-white p-3 rounded-2xl shadow-xl z-20">
                        <Award size={24} />
                    </div>
                    <img
                        src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/retrato-de-um-homem-de-meia-idade-usando-um-bone-colorido_335332-742%20%281%29-I7rcgiM28V7I462M9PijjBhrl934F6.jpg"
                        alt="Seu Manoel"
                        className="w-full md:w-[320px] aspect-square object-cover rounded-[3rem] shadow-2xl border-4 border-white"
                    />
                </div>
            </div>
            <div className="flex-1 space-y-6 text-center md:text-left">
                <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest">História Real Verificada</span>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                    Manoel — o diabético que quase parou na <span className="text-red-600">hemodiálise</span>
                </h2>
            </div>
        </div>

        <div className="space-y-10 text-xl leading-relaxed text-slate-700">
            <p className="font-medium text-2xl text-slate-900 leading-snug">
                Seu Manoel, 64 anos, com diabetes há 22 anos. Glicose em 290 mg/dL, visão embaçada e perda de sensibilidade nos pés. O diagnóstico era severo: nefropatia diabética.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                    <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-200">
                        <p className="font-black text-slate-900 mb-8 text-xl uppercase tracking-tighter border-b border-slate-200 pb-4">
                            O Protocolo Padrão Falho:
                        </p>
                        <ul className="space-y-6">
                        {[
                            "Tomava 3 comprimidos de Metformina (1500mg/dia)",
                            "Controlava rigorosamente o açúcar e caminhava",
                            "Evitava alimentos com alto índice glicêmico"
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-4 font-bold text-slate-600">
                            <div className="bg-white p-1 rounded-full text-red-500 shadow-sm shrink-0 mt-1">
                                <ShieldAlert className="h-5 w-5" />
                            </div>
                            <span>{item}</span>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                        <img
                            src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/urina-com-espuma-scaled-1-kSjxkgXRuOWxUI7AaEm6uWo3FX7ZK2.jpg"
                            alt="Sintoma grave"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="bg-red-600 p-8 rounded-[2.5rem] text-white text-center shadow-xl shadow-red-200">
                        <p className="text-2xl font-black leading-tight">
                            Mesmo assim, a glicose nunca estabilizava. Seu Manoel estava a um passo da máquina de hemodiálise.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                    src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/qualidade-vida-paciente-hemodialise-q0ctIYihvARlrqUtGTp18yGq0z4hLk.jpg"
                    alt="Hemodiálise"
                    className="w-full h-auto transition-transform duration-[2s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10">
                    <p className="text-white text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-70">Aviso: Imagem Forte</p>
                    <p className="text-white text-lg font-bold">O destino inevitável de quem ignora a causa raiz.</p>
                </div>
            </div>

            <div className="relative pt-12">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-blue-600 rounded-full"></div>
                <blockquote className="text-center space-y-6 italic">
                    <p className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                        “O seu corpo ainda é capaz de controlar a glicose naturalmente. O que falta é desbloquear o que está travado.”
                    </p>
                    <cite className="not-italic flex flex-col items-center gap-2">
                        <span className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">RY</span>
                        <span className="font-black text-blue-600 uppercase tracking-widest text-sm">Dr. Yano para Seu Manoel</span>
                    </cite>
                </blockquote>
            </div>
        </div>
      </div>
    </section>
  );
};