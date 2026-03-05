"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, ChevronRight } from "lucide-react";

export const Problem = () => {
  return (
    <section className="space-y-12 text-xl leading-relaxed text-slate-800">
      <p className="first-letter:text-7xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-4 first-letter:float-left first-letter:mt-2">
        Você já parou para pensar o por que da sua glicose continuar alta, mesmo
        tomando os remédios receitados corretamente, fazendo o que os médicos
        pedem e até mesmo comendo um pouco menos açúcar?
      </p>
      
      <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img
            src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/metformina-6DhI93KiQK2MaPncdPNDTznhGiePYK.jpg"
            alt="Análise de Metformina"
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 z-20 text-white font-black text-xs uppercase tracking-widest bg-red-600 px-4 py-2 rounded-lg shadow-xl">
            Evidência Crucial
          </div>
      </div>

      <div className="flex items-center gap-6 p-8 bg-red-50 rounded-[2rem] border border-red-100">
          <div className="h-16 w-16 shrink-0 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200">
            <AlertTriangle size={32} />
          </div>
          <p className="font-black text-2xl md:text-3xl text-red-900 tracking-tight leading-none">
            Pois saiba que isso não é sua culpa.
          </p>
      </div>
      
      <Alert className="bg-amber-400 border-none p-10 rounded-[2.5rem] shadow-2xl shadow-amber-200/50">
        <div className="flex flex-col items-center text-center">
            <div className="animate-bounce bg-white p-3 rounded-full mb-6">
                <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
            <AlertTitle className="font-black text-gray-900 text-3xl md:text-4xl mb-6 tracking-tighter uppercase">
                ⚠️ LEITURA OBRIGATÓRIA
            </AlertTitle>
            <AlertDescription className="text-gray-900 text-xl md:text-2xl leading-relaxed font-bold max-w-2xl">
              Este pode ser o texto mais importante que você já leu sobre a Diabetes
              Tipo 2. O que você fará nos próximos 5 minutos pode decidir se você
              irá vencer essa doença silenciosa ou continuar rumo a amputações,
              cegueira e dependência eterna de remédios.
            </AlertDescription>
        </div>
      </Alert>

      <div className="prose prose-xl max-w-none text-slate-700">
        <p>
            <strong className="text-slate-900 underline decoration-blue-500/30 decoration-4">Um novo estudo conduzido por pesquisadores Japoneses</strong> na Universidade de Tóquio (Bunkyō), foi recebido pela Universidade de São Paulo (USP) aqui no brasil, e revelou que <strong className="text-slate-900">7 em cada 10 pacientes diabéticos tipo 2 estão seguindo um protocolo de tratamento ultrapassado</strong>, ineficaz — e em muitos casos, perigoso.
        </p>
      </div>

      <div className="bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100">
          <img
            src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/1_20250716143121-jkwImCoFGKN9UfW8l7MpZ8MkwC7a2S.jpg"
            alt="Gráfico de eficácia"
            className="w-full h-auto rounded-[1.5rem]"
          />
      </div>

      <h2 className="text-4xl md:text-5xl font-black text-center py-10 text-slate-900 tracking-tighter leading-tight">
        O nome disso? <span className="text-white bg-red-600 px-4 py-1 rounded-xl rotate-[-2deg] inline-block shadow-lg">Erro médico sistemático.</span>
      </h2>

      <p className="text-center max-w-2xl mx-auto font-medium text-slate-500">
        Os remédios receitados como Metformina, Glifage, Glicazida por vezes
        trazem aquela falsa sensação de que você está fazendo a coisa certa,
        parecem controlar momentaneamente o problema, mas por dentro você sabe:
        seu corpo continua entrando em colapso.
      </p>

      <div className="relative mt-20 group">
        <div className="absolute inset-0 bg-blue-600 rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
        <div className="relative p-10 bg-white rounded-[3rem] border border-slate-100 shadow-2xl flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/2">
                <img
                    src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/enhanced_441b7b5d-8850-444d-af70-488f594d5c22-aBTZK4gzJYBzRRy8spjG8H089khVpA.png"
                    alt="Dr. Roberto Kazushigue Yano"
                    className="w-full h-auto rounded-3xl shadow-2xl border-4 border-slate-50"
                />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">Autoridade Médica</div>
                <p className="text-xl leading-relaxed font-medium text-slate-700">
                Quem afirma isso é o <span className="font-black text-slate-900">Dr. Roberto Kazushigue Yano</span>, figura importante da medicina brasileira com mais de 7 milhões de seguidores e 26 anos de experiência.
                </p>
                <blockquote className="border-l-4 border-blue-600 pl-6 italic text-2xl text-slate-900 font-black tracking-tight">
                "Depois de acompanhar centenas de pacientes, tantas amputações evitáveis... vi com meus próprios olhos: os medicamentos só empurram a glicose para dentro das células à força, sem tratar a causa real."
                </blockquote>
            </div>
        </div>
      </div>

      <div className="py-20">
        <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
            O erro de foco no seu tratamento...
            </h3>
            <div className="h-1.5 w-24 bg-red-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <p className="text-center max-w-2xl mx-auto mb-12 text-slate-600 font-medium">
          A medicina tradicional foca obsessivamente em baixar os níveis de
          glicose no sangue. Mas a glicose alta não é a causa da doença, e sim a consequência de algo muito mais profundo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Glicose descontrolada crônica",
            "Ganho de peso e acúmulo de gordura visceral",
            "Dependência progressiva de insulina",
            "Complicações circulatórias graves",
            "Neuropatia, risco de amputações e cegueira",
            'A frase que destrói esperanças: "você vai conviver com isso pra sempre"',
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
              <div className="h-10 w-10 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-inner">
                <ChevronRight className="h-6 w-6" />
              </div>
              <span className="font-black text-slate-800 text-lg leading-tight">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};