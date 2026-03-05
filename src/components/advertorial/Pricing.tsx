"use client";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, AlertTriangle, ShieldCheck, Lock, CreditCard, ArrowRight, Timer } from "lucide-react";
import { useState, useEffect } from 'react';

const faqItems = [
  {
    question: "Como recebo o material após o pagamento?",
    answer: "Imediatamente no seu e-mail após a confirmação. Link de acesso vitalício.",
  },
  {
    question: "Onde encontro os ingredientes do chá?",
    answer: "Lojas de produtos naturais ou internet. Fornecemos uma lista detalhada.",
  },
  {
    question: "Preciso parar meus medicamentos?",
    answer: "NUNCA! Use o protocolo como complemento. Seu médico decidirá reduções.",
  },
];

export const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState(897); // 14:57

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="my-32 space-y-16">
      <div className="relative p-12 bg-slate-50 border border-slate-200 rounded-[4rem] text-center max-w-4xl mx-auto shadow-inner overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tighter">
          Contribuição Simbólica
        </h3>
        <p className="text-xl md:text-2xl leading-relaxed text-slate-500 font-medium italic max-w-2xl mx-auto">
          "Estabeleci um valor simbólico para que este conhecimento transformador 
          alcance o maior número de brasileiros, cobrindo apenas os custos da pesquisa."
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
          {/* Animated Background Rings */}
          <div className="absolute inset-0 -m-8 border-2 border-green-100 rounded-[5rem] animate-pulse"></div>
          <div className="absolute inset-0 -m-4 border-2 border-green-200 rounded-[4.5rem]"></div>
          
          <div className="relative bg-white border-[6px] border-green-500 rounded-[4rem] shadow-[0_64px_128px_-24px_rgba(22,163,74,0.3)] p-10 md:p-16 space-y-10 overflow-hidden text-center">
            
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl animate-bounce">
                <Timer size={14} /> Oferta expira em {formatTime(timeLeft)}
            </div>
            
            <div className="space-y-2">
                <p className="text-xl font-black uppercase tracking-[0.3em] text-slate-300">
                Acesso Completo Por Apenas:
                </p>
                <div className="flex items-center justify-center gap-6">
                    <span className="text-4xl md:text-5xl font-bold text-slate-200 line-through decoration-red-500/50 decoration-4">R$ 147</span>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-green-600 text-[10rem] md:text-[12rem] font-black tracking-tighter leading-none h-[11rem] md:h-[13rem]">29<span className="text-6xl md:text-8xl">,90</span></span>
                        <span className="text-green-600/50 text-xl font-black uppercase tracking-[0.5em] w-full text-center">Reais</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8 border-y border-slate-100">
                <div className="flex items-center justify-center gap-3 font-black text-slate-700 text-sm tracking-widest">
                    <ShieldCheck className="h-8 w-8 text-green-500" />
                    <span>PAGAMENTO ÚNICO</span>
                </div>
                <div className="flex items-center justify-center gap-3 font-black text-slate-700 text-sm tracking-widest">
                    <Zap className="h-8 w-8 text-green-500" />
                    <span>ACESSO VITALÍCIO</span>
                </div>
            </div>

            <div className="space-y-6">
                <Button
                size="lg"
                className="w-full h-28 text-2xl md:text-4xl font-black bg-green-600 hover:bg-green-700 text-white shadow-[0_20px_40px_-10px_rgba(22,163,74,0.5)] rounded-[2.5rem] transition-all hover:scale-[1.03] active:scale-95 group"
                >
                    <div className="flex flex-col items-center">
                        <span className="flex items-center gap-3">
                            QUERO ACESSAR AGORA <ArrowRight className="group-hover:translate-x-2 transition-transform h-8 w-8" />
                        </span>
                        <span className="text-[10px] opacity-70 font-bold uppercase tracking-[0.3em] mt-1">Acesso imediato no e-mail</span>
                    </div>
                </Button>

                <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <Lock size={16} /> 256-bit SSL
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <CreditCard size={16} /> Visa / Master / Pix
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck size={16} /> Compra Segura
                    </div>
                </div>
            </div>
          </div>
      </div>

      <div className="relative max-w-4xl mx-auto group">
          <div className="absolute inset-0 bg-red-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <Alert variant="destructive" className="bg-white border-8 border-red-600 p-12 md:p-20 rounded-[4rem] shadow-2xl relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] text-red-900"><AlertTriangle size={200} /></div>
            <AlertTriangle className="h-16 w-16 text-red-600 mb-10 mx-auto" />
            <AlertTitle className="font-black text-red-600 text-3xl md:text-5xl mb-8 tracking-tighter text-center uppercase leading-tight">
                ATENÇÃO: RISCO DE <br /> COMPLICAÇÕES GRAVES
            </AlertTitle>
            <AlertDescription className="text-slate-700 text-xl md:text-2xl leading-relaxed font-bold text-center max-w-2xl mx-auto mb-12">
                A demora pode ser irreversível. Você está vivendo com uma bomba-relógio: 
                Amputações, Cegueira, Insuficiência renal e Infarto silencioso são as próximas fases.
            </AlertDescription>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-50">
                <img
                    src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ferida-no-pe-diabetico-1024x512%20%281%29-WBhIaxRKCsgD0YUgYr4DpR52RKyiZ2.jpg"
                    alt="Alerta de saúde"
                    className="w-full h-auto grayscale-[0.3]"
                />
                <div className="absolute inset-0 bg-red-900/10"></div>
            </div>
          </Alert>
      </div>

      <div className="max-w-4xl mx-auto pt-24 space-y-12">
        <h3 className="text-3xl md:text-4xl font-black text-center text-slate-900 tracking-tighter">Perguntas Frequentes</h3>
        <div className="grid gap-6">
            {faqItems.map((item, index) => (
              <div key={index} className="p-8 md:p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <p className="text-xl md:text-2xl font-black text-slate-900 mb-4 flex items-center gap-4">
                    <span className="h-8 w-8 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-black">?</span>
                    {item.question}
                </p>
                <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed pl-12 border-l-2 border-slate-100 group-hover:border-blue-200 transition-colors">
                    {item.answer}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};