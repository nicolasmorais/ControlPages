"use client";

import { Clock, Calendar, CheckCircle } from "lucide-react";

export const Header = () => {
  const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <header className="relative pt-12 pb-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        {/* Editorial Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            <Calendar size={12} className="text-blue-500" />
            Atualizado em {today}
          </span>
          <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            <Clock size={12} className="text-blue-500" />
            Leitura: 5 minutos
          </span>
          <span className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100 text-green-600">
            <CheckCircle size={12} />
            Conteúdo Verificado
          </span>
        </div>

        <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1 rounded-md bg-red-600 mb-2">
                <p className="text-[10px] text-white font-black uppercase tracking-[0.3em]">
                    Urgente: Saúde Pública
                </p>
            </div>
            
            <h1 className="text-3xl md:text-6xl text-slate-900 leading-[1.15] font-black tracking-tight drop-shadow-sm">
              Dr. Roberto Yano afirma: 7 em cada 10 diabéticos tipo 2 estão sendo
              tratados de forma <span className="text-red-600 underline decoration-red-600/20 underline-offset-8">errada</span> no Brasil.
            </h1>
            
            <div className="relative py-8 px-6 md:px-12 bg-slate-50 rounded-3xl border border-slate-100 italic">
                <span className="absolute -top-4 left-8 text-6xl text-blue-200 font-serif">“</span>
                <h2 className="text-xl md:text-2xl font-medium text-slate-600 leading-relaxed relative z-10">
                  A Metformina está sufocando o seu pâncreas e impedindo a sua regeneração natural.
                </h2>
                <span className="absolute -bottom-10 right-8 text-6xl text-blue-200 font-serif rotate-180">“</span>
            </div>
        </div>
      </div>
    </header>
  );
};