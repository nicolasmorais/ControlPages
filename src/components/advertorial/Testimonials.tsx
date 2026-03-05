"use client";

import { CheckCircle2, Star, ThumbsUp } from "lucide-react";

const testimonials = [
  {
    name: "João Oliveira, 62 anos",
    text: "Recebi tudo no e-mail em 3 minutos! Em 2 semanas minha glicemia caiu de 240 para 130. Estou impressionado com a simplicidade e o resultado!",
    time: "há 2 horas",
    avatar: "11"
  },
  {
    name: "Renata Tanaka, 54 anos",
    text: "Eu era cética, mas resolvi tentar. Melhor decisão! O chá funciona. Minha glicose baixou 90 pontos. Meu médico ficou boquiaberto!",
    time: "há 5 horas",
    avatar: "32"
  },
  {
    name: "Sérgio Vaz, 58 anos",
    text: "Achei que ia ser complicado, mas é muito simples! Já não sinto mais aquele formigamento terrível nas pernas. Vale MUITO a pena!",
    time: "há 1 dia",
    avatar: "24"
  },
];

export const Testimonials = () => {
  return (
    <section className="my-32">
      <div className="text-center mb-20 space-y-6">
        <span className="inline-flex items-center gap-2 px-4 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest border border-amber-100">
            <ThumbsUp size={14} /> Recomendado pela Comunidade
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Comunidade & Resultados
        </h2>
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center gap-1.5 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={32} fill="currentColor" className="drop-shadow-sm" />)}
            </div>
            <p className="text-slate-500 font-black text-lg tracking-tight uppercase">Média 4.9/5 estrelas baseada em 2.400+ relatos</p>
        </div>
      </div>

      <div className="space-y-12 max-w-4xl mx-auto px-4">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start gap-8 group animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${index * 200}ms` }}>
            <div className="shrink-0">
                <div className="relative">
                    <div className="w-20 h-20 rounded-[2rem] border-4 border-white shadow-2xl bg-slate-200 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                        <img src={`https://i.pravatar.cc/150?img=${testimonial.avatar}`} alt={testimonial.name} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white">
                        <CheckCircle2 size={16} />
                    </div>
                </div>
            </div>
            
            <div className="flex-1 relative">
                <div className="absolute -top-6 -left-6 text-slate-100 text-9xl font-serif select-none pointer-events-none group-hover:text-blue-50 transition-colors">“</div>
                <div className="relative p-10 bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.1)] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <p className="font-black text-slate-900 text-2xl tracking-tight leading-none flex items-center gap-3">
                            {testimonial.name}
                        </p>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{testimonial.time}</span>
                    </div>
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium italic">
                    "{testimonial.text}"
                    </p>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 text-center">
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] hover:text-blue-700 transition-colors underline underline-offset-8 decoration-2 decoration-blue-100 hover:decoration-blue-200">
              Ver mais depoimentos reais
          </button>
      </div>
    </section>
  );
};