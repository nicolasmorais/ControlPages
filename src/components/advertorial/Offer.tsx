"use client";

import { BookOpen, Video, FileText, Calendar, CheckCircle2, Gift } from "lucide-react";

const productItems = [
  {
    icon: BookOpen,
    title: "MANUAL COMPLETO DO CHÁ JAPONÊS",
    description: "PDF Digital - 58 páginas com a fórmula exata revelada.",
    badge: "Principal"
  },
  {
    icon: Video,
    title: "VÍDEO-AULA EXCLUSIVA: PREPARO",
    description: "Dr. Yano mostra na prática o ritual de preparo japonês.",
    badge: "HD Video"
  },
  {
    icon: FileText,
    title: "DIÁRIO DE CONTROLE GLICÊMICO",
    description: "Ferramenta para acompanhar sua evolução diária.",
    badge: "Bônus"
  },
  {
    icon: BookOpen,
    title: "GUIA ALIMENTAR SINÉRGICO",
    description: "Alimentos que potenciam o efeito regenerativo do chá.",
    badge: "Acelerador"
  },
  {
    icon: Calendar,
    title: "PROTOCOLO DE 90 DIAS",
    description: "Cronograma estruturado para resultados permanentes.",
    badge: "Vitalício"
  },
];

export const Offer = () => {
  return (
    <section id="offer" className="my-32 space-y-16">
      <div className="relative text-center p-16 bg-slate-900 text-white rounded-[4rem] shadow-[0_48px_80px_-16px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full -mr-48 -mt-48 blur-[100px] opacity-20 animate-pulse"></div>
        <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1 bg-blue-600 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4">
                <Gift size={14} /> Oferta Especial de Lançamento
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              O Protocolo do <span className="text-blue-400">Chá Japonês</span>
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-slate-400 font-sans tracking-tight">
              Edição Digital Regenerativa • Vagas Limitadas
            </p>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-white rounded-[4rem] shadow-2xl border border-slate-100"></div>
          <div className="relative z-10 p-8 md:p-16 space-y-12">
            <h3 className="text-xl font-black text-center uppercase tracking-[0.4em] text-slate-300">
                O QUE VOCÊ RECEBE IMEDIATAMENTE:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {productItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-6 group hover:-translate-y-1 transition-transform">
                        <div className="bg-slate-50 p-5 rounded-3xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-xl group-hover:shadow-blue-100 shrink-0">
                            <item.icon size={32} />
                        </div>
                        <div className="py-1 flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="font-black text-xl text-slate-900 tracking-tight leading-none">{item.title}</p>
                            </div>
                            <p className="text-lg text-slate-500 font-medium leading-snug">
                                {item.description}
                            </p>
                            <span className="inline-block text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">{item.badge}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="pt-12 border-t border-slate-100 flex flex-col items-center gap-4">
                <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg">
                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                        </div>
                    ))}
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-lg">+2k</div>
                </div>
                <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Junte-se a milhares de pessoas que já transformaram suas vidas</p>
            </div>
          </div>
      </div>
    </section>
  );
};