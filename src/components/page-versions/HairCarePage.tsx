"use client";

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Heart, 
  Sparkles, 
  Timer,
  Lock,
  CreditCard,
  ChevronRight,
  Award,
  Users,
  CheckCircle2,
  Trash2,
  Droplets,
  Scissors,
  XCircle,
  AlertCircle,
  Frown,
  Ban,
  Image as ImageIcon,
  ShoppingBag,
  DollarSign,
  Home,
  Dumbbell,
  Play,
  Microscope,
  FlaskConical,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageTracker } from "./PageTracker";
import { cn } from '@/lib/utils';

const GALLERY_IMAGES = [
  "https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769896113265-ChatGPT-Image-31-de-jan.-de-2026,-18_44_47.png",
  "https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769896120372-ChatGPT-Image-31-de-jan.-de-2026,-18_42_42.png",
  "https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769896125840-Gemini_Generated_Image_kw7t7bkw7t7bkw7t-(1).png",
  "https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769896189867-ChatGPT-Image-31-de-jan.-de-2026,-18_49_38.png"
];

const TIKTOK_VIDEOS = [
  "https://vhost.onebasex.pro/video/1769896865284-ssstik.io_%40renatadelpasso_1769896654074.mp4",
  "https://vhost.onebasex.pro/video/1769897057244-ssstik.io_%40donademim_pvh_1769896463897.mp4",
  "https://vhost.onebasex.pro/video/1769897045880-ssstik.io_%40studioestefaniribeiro_1769896850804.mp4"
];

export function HairCarePage() {
  const [timeLeft, setTimeLeft] = useState(1194); // 19:54

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <PageTracker contentId="cavalo-de-raca" />
      <div className="bg-[#FDF8F3] text-slate-900 font-sans selection:bg-orange-100 antialiased min-h-screen">
        
        {/* BARRA DE URGÊNCIA */}
        <div className="bg-slate-950 py-2 px-4 text-center border-b border-orange-900/20 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-center items-center gap-4 md:gap-8">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-orange-200 flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                Promoção Exclusiva Direto da Indústria
            </p>
            <div className="hidden md:flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest bg-orange-900/40 px-4 py-1 rounded-full border border-orange-500/20">
              <Clock size={12} className="text-orange-400" />
              Oferta termina em: <span className="font-mono text-orange-400">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="relative pt-12 md:pt-24 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-orange-500/30 shadow-2xl">
                <Award size={14} /> Tecnologia Bio Instinto
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-950 mb-8 max-w-4xl">
              Finalmente Solte Esse Cabelo <span className="text-orange-800 italic underline decoration-orange-500/30 underline-offset-8">Sem Medo, Sem Vergonha, Sem Desculpas</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 mb-12 font-medium max-w-2xl leading-relaxed">
              Recupere em 7 dias a força, o brilho e a autoestima que você perdeu - com a mesma tecnologia profissional que salões cobram R$ 500 por sessão.
            </p>

            {/* IMAGEM DO PRODUTO */}
            <div className="relative group max-w-3xl w-full">
              <img 
                src="https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769844571647-ChatGPT-Image-31-de-jan.-de-2026,-04_29_21.png" 
                alt="Kit Cavalo de Raça Bio Instinto" 
                className="rounded-[3rem] relative z-10 mx-auto"
              />
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20">
                 <div className="bg-white p-4 rounded-2xl shadow-xl border border-orange-100 animate-bounce">
                    <p className="text-[10px] font-black text-orange-800 uppercase tracking-widest mb-1">Resultados</p>
                    <p className="text-sm font-bold text-slate-700">Na 1ª Aplicação ✨</p>
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* 1. SEÇÃO: GALERIA DE IMAGENS */}
        <section className="py-24 px-6 bg-white border-y border-orange-100">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="inline-block text-orange-600 font-black text-xs uppercase tracking-[0.4em]">Paixão Nacional</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 uppercase">
                O kit mais Amado do Brasil
              </h2>
              <div className="h-1.5 w-32 bg-orange-500 mx-auto rounded-full"></div>
            </div>

            {/* Grid da Galeria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GALLERY_IMAGES.map((url, i) => (
                <div key={i} className="group relative aspect-square rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer border border-orange-100">
                   <img 
                      src={url} 
                      alt={`Imagem da Galeria ${i + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <p className="text-slate-500 font-medium italic">Milhares de mulheres compartilhando seus resultados reais todos os dias.</p>
            </div>
          </div>
        </section>

        {/* 2. SEÇÃO: SOLUÇÃO E PÚBLICO-ALVO (COPY SIMPLIFICADA) */}
        <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-16">
                    <div className="flex-1 space-y-8">
                        <span className="inline-block text-orange-800 font-black text-xs uppercase tracking-[0.4em] mb-2">A SOLUÇÃO QUE VOCÊ PRECISAVA</span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter leading-tight">
                            Resultado de salão no seu chuveiro. <span className="text-orange-700">Sem gastar R$ 300 todo mês.</span>
                        </h2>

                        <div className="pt-8 space-y-6">
                            <h4 className="text-2xl font-black text-slate-950 border-b-2 border-orange-200 inline-block pb-1 uppercase tracking-tight">PARA VOCÊ QUE:</h4>
                            <ul className="space-y-4">
                                {[
                                    "Trabalha, cuida da casa, tem mil coisas pra resolver",
                                    "Não tem R$ 300 livre no orçamento todo mês",
                                    "Não pode passar o sábado inteiro no salão",
                                    "Não abre mão de se sentir bonita e confiante"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-lg font-bold text-slate-700">
                                        <div className="bg-orange-100 p-1 rounded-full text-orange-600"><Check size={16} strokeWidth={3} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="space-y-4 text-2xl font-black text-slate-900 tracking-tight leading-tight pt-4">
                                <p>Porque você merece olhar no espelho e gostar do que vê.</p>
                                <p className="text-orange-800 italic underline decoration-orange-300">Sem precisar escolher entre cabelo bonito ou pagar as contas.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 lg:sticky lg:top-24 relative w-full">
                        <div className="absolute inset-0 bg-orange-300 rounded-full blur-[100px] opacity-10"></div>
                        <img 
                            src="https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769820004362-ChatGPT-Image-30-de-jan.-de-2026,-21_39_39.png" 
                            alt="Mulher Confiante com Cabelo Lindo" 
                            className="relative z-10 w-full h-auto drop-shadow-2xl rounded-[3rem] border-8 border-white"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* 3. SEÇÃO: DIFERENCIAIS (DESIGN MELHORADO COM CORES DA MARCA) */}
        <section className="py-32 px-6 bg-white relative">
            <div className="max-w-6xl mx-auto space-y-20">
                <div className="text-center space-y-4">
                    <span className="inline-block text-orange-600 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] mb-2">Por que somos os melhores</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 uppercase leading-none">
                        POR QUE ESSE KIT É <span className="text-orange-700">DIFERENTE?</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-10">
                    {/* Linha de Cima: 3 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: Sparkles, 
                                t: "Tecnologia Bio Instinto Profissional", 
                                d: "O mesmo produto que cabeleireiros usam para entregar resultados rápidos." 
                            },
                            { 
                                icon: Dumbbell, 
                                t: "Trata de verdade, não mascara", 
                                d: "Reconstrução real na fibra capilar, tratando o fio de dentro para fora." 
                            },
                            { 
                                icon: Zap, 
                                t: "Resultado na primeira aplicação", 
                                d: "Você sente a diferença no toque e no brilho assim que termina o banho." 
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-6 p-10 bg-[#FDF8F3] rounded-[3rem] border border-orange-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(139,94,60,0.1)] hover:border-orange-300 transition-all duration-500 hover:-translate-y-2 group">
                                <div className="p-5 rounded-[1.5rem] bg-white shadow-sm group-hover:scale-110 transition-transform w-fit">
                                    <item.icon className="h-8 w-8 text-orange-700" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-3">
                                    <p className="font-black text-slate-900 text-xl uppercase tracking-tight leading-tight">{item.t}</p>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Linha de Baixo: 2 Cards Centralizados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-4xl lg:mx-auto">
                        {[
                            { 
                                icon: Home, 
                                t: "15 minutos no banho", 
                                d: "Desenvolvido para caber na rotina da mulher moderna que não tem tempo a perder." 
                            },
                            { 
                                icon: DollarSign, 
                                t: "Menos de R$ 2 por dia", 
                                d: "Um único kit rende de 2 a 3 meses de tratamento completo de alto nível." 
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-6 p-10 bg-[#FDF8F3] rounded-[3rem] border border-orange-100 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(139,94,60,0.1)] hover:border-orange-300 transition-all duration-500 hover:-translate-y-2 group">
                                <div className="p-5 rounded-[1.5rem] bg-white shadow-sm group-hover:scale-110 transition-transform w-fit">
                                    <item.icon className="h-8 w-8 text-orange-700" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-3">
                                    <p className="font-black text-slate-900 text-xl uppercase tracking-tight leading-tight">{item.t}</p>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 4. SEÇÃO: O QUE VEM NESSE KIT COMPLETO: */}
        <section className="py-24 px-6 bg-[#FDF8F3] border-y border-orange-100">
            <div className="max-w-6xl mx-auto space-y-20">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase">O QUE VEM NESSE KIT COMPLETO:</h2>
                    <p className="text-orange-700 font-bold text-lg md:text-xl uppercase tracking-widest">
                        🧴 4 PRODUTOS PROFISSIONAIS QUE VÃO RESSUSCITAR SEU CABELO:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { 
                          n: "1️⃣ SHAMPOO", 
                          v: "300ml", 
                          t: "CAVALO DE RAÇA", 
                          bullets: [
                            "Limpa PROFUNDAMENTE sem destruir",
                            "Espuma cremosa que você NUNCA viu igual",
                            "Perfume viciante que dura DIAS",
                            "Prepara o fio pra reconstrução REAL"
                          ] 
                        },
                        { 
                          n: "2️⃣ CONDICIONADOR", 
                          v: "300ml", 
                          t: "CAVALO DE RAÇA", 
                          bullets: [
                            "Desembaraça na PRIMEIRA PASSADA",
                            "Você vai sentir a diferença IMEDIATAMENTE",
                            "Brilho absurdo, maciez de comercial",
                            "Sela as cutículas e protege os fios"
                          ] 
                        },
                        { 
                          n: "3️⃣ MÁSCARA", 
                          v: "250g", 
                          t: "CONDICIONANTE", 
                          bullets: [
                            "Aqui é onde a MÁGICA ACONTECE",
                            "Reconstrução PROFUNDA na fibra capilar",
                            "Força e resistência que você VAI SENTIR",
                            "É tipo esteróides pro seu cabelo (só que legal)"
                          ] 
                        },
                        { 
                          n: "4️⃣ CREME DE PENTEAR", 
                          v: "200ml", 
                          t: "CAVALO DE RAÇA", 
                          bullets: [
                            "Finalização IMPECÁVEL",
                            "Controla frizz, protege do calor, nutre",
                            "Deixa aquele acabamento de salão",
                            "Seu cabelo vai parecer de OUTRA PESSOA"
                          ] 
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between hover:border-orange-200 transition-all hover:-translate-y-2 group shadow-sm">
                            <div className="space-y-4">
                                <div className="text-orange-800 font-black text-xs uppercase tracking-widest">{item.n} ({item.v})</div>
                                <h3 className="text-2xl font-black text-slate-900 leading-tight">{item.t}</h3>
                                <div className="space-y-3 pt-2">
                                  {item.bullets.map((bullet, idx) => (
                                    <p key={idx} className="text-slate-600 text-sm font-medium leading-snug flex items-start gap-2">
                                      <span className="text-orange-600 shrink-0">→</span>
                                      {bullet}
                                    </p>
                                  ))}
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <div className="h-2 w-12 bg-orange-600 rounded-full group-hover:w-full transition-all duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RESULTADOS SECTION */}
                <div className="bg-white text-slate-900 rounded-[3.5rem] p-10 md:p-16 shadow-xl relative overflow-hidden border border-orange-100">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.15] pointer-events-none text-orange-200">
                      <Sparkles size={250} />
                    </div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-200/20 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    <div className="text-center mb-12 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 text-orange-950">
                          🔥 RESULTADOS QUE VÃO TE FAZER CHORAR:
                        </h2>
                        <div className="h-1.5 w-24 bg-orange-400 mx-auto rounded-full shadow-sm"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
                        {[
                          { t: "FORÇA ABSURDA", d: "Fios que aguentam TUDO" },
                          { t: "ZERO QUEBRA", d: "Acabou aquele cabelo no pente" },
                          { t: "HIDRATAÇÃO REAL", d: "Não aquela ilusão temporária" },
                          { t: "MACIEZ INSANA", d: "Você não vai parar de passar a mão" },
                          { t: "BRILHO DE REVISTA", d: "Tipo aqueles comerciais impossíveis" },
                          { t: "CRESCIMENTO ACELERADO", d: "Fios fortes crescem RÁPIDO" },
                          { t: "AUTOESTIMA LÁ EM CIMA", d: "Isso não tem preço" }
                        ].map((res, i) => (
                          <div key={i} className="flex items-center gap-4 bg-slate-50/80 p-5 rounded-2xl border border-orange-100 shadow-sm hover:bg-white hover:border-orange-300 transition-all duration-300 group/item">
                              <div className="bg-orange-100 text-orange-700 p-2 rounded-full group-hover/item:scale-110 transition-transform">
                                <Check size={18} strokeWidth={4} />
                              </div>
                              <div>
                                <span className="font-black text-orange-900 mr-1 tracking-tight uppercase text-sm">{res.t}</span>
                                <span className="font-medium text-slate-500 text-sm">- {res.d}</span>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* 5. SEÇÃO: GALERIA DE VÍDEOS VERTICAIS (TikTok Style) */}
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-16">
                <div className="text-center space-y-4">
                    <span className="inline-block text-orange-600 font-black text-xs uppercase tracking-[0.5em] mb-2">Comunidade Cavalo de Raça</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 uppercase leading-tight">
                      Aperte o Play na <span className="text-orange-700 underline decoration-orange-300 decoration-8 underline-offset-8">Sua Nova Versão</span> ✨
                    </h2>
                    <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto pt-4">Veja por que o Kit Cavalo de Raça é a maior febre do momento entre as brasileiras.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TIKTOK_VIDEOS.map((url, i) => (
                        <div key={i} className="group relative aspect-[9/16] bg-slate-950 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transition-all hover:scale-[1.02] hover:shadow-orange-200/50">
                            <iframe 
                                src={url} 
                                className="absolute inset-0 w-full h-full"
                                frameBorder="0" 
                                allowFullScreen 
                                allow="autoplay; fullscreen"
                            ></iframe>
                            
                            {/* Overlay de Brilho sutil */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 6. SEÇÃO: DESENVOLVIDO POR ESPECIALISTAS (BIO INSTINTO) - SUAVIZADA */}
        <section className="py-24 px-6 bg-orange-50/50 text-slate-900 relative overflow-hidden border-y border-orange-100">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 border border-orange-200 rounded-full text-orange-800 text-[10px] font-black uppercase tracking-widest">
                            <Microscope size={14} /> Ciência Aplicada
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-slate-950">
                            Desenvolvido por <span className="text-orange-700 italic">Especialistas.</span>
                        </h2>
                        <div className="space-y-6">
                            <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                                Bio Instinto: 12 anos de expertise capilar
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                Não é produto genérico de farmácia. É tecnologia profissional da Bio Instinto - uma das maiores indústrias de cosméticos do Brasil.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {[
                                "12 anos transformando cabelos", 
                                "500 mil clientes ativos", 
                                "Linha profissional de salão", 
                                "Fórmulas testadas em laboratório"
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-orange-100 shadow-sm hover:border-orange-300 transition-all group">
                                    <div className="bg-orange-100 p-1.5 rounded-full text-orange-700 group-hover:scale-110 transition-transform">
                                        <Check size={16} strokeWidth={4} />
                                    </div>
                                    <span className="font-bold text-sm text-slate-800">{stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white text-slate-950 p-10 md:p-16 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(249,115,22,0.1)] relative border border-orange-100">
                        <div className="absolute -top-6 -right-6 bg-orange-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-black rotate-12 shadow-xl border-4 border-white">
                            TOP 1
                        </div>
                        <h3 className="text-3xl font-black mb-6 leading-tight flex items-center gap-3">
                            <Award className="text-orange-600" /> Qualidade Garantida
                        </h3>
                        <div className="space-y-4 mb-10">
                            <p className="text-lg text-slate-600 font-medium">O que isso significa para você?</p>
                            <ul className="space-y-4">
                                {[
                                    "Você leva pra casa o mesmo produto que profissionais usam",
                                    "O mesmo tratamento que já transformou meio milhão de cabelos",
                                    "Direto da indústria. Sem intermediário e sem taxas extras"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 font-bold text-slate-800 leading-snug">
                                        <div className="mt-1 text-orange-600"><Check size={18} strokeWidth={3} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 bg-[#FDF8F3] rounded-3xl border border-orange-100 text-center">
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Veredito Profissional</p>
                            <p className="text-xl font-black text-slate-950 tracking-tight italic">"Não é promessa. É ciência aplicada."</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* TESTEMUNHOS */}
        <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter">Mulheres Reais</h2>
                    <div className="flex justify-center gap-1 text-orange-500">
                        {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { n: "Mariana R.", i: "34 anos", t: "Chorei na primeira vez que usei. Eu não acreditava que meu cabelo pudesse voltar a ser assim." },
                        { n: "Juliana S.", i: "29 anos", t: "Meu marido perguntou se eu tinha ido ao salão. O perfume é incrível e o brilho é absurdo!" },
                        { n: "Camila F.", i: "41 anos", t: "Gastava R$200 todo mês no salão. Esse kit me deu resultado profissional em casa por muito menos." }
                    ].map((test, i) => (
                        <div key={i} className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-xl relative group hover:-translate-y-2 transition-all">
                            <div className="absolute -top-6 -left-4 text-orange-100 text-9xl font-serif select-none pointer-events-none group-hover:text-orange-200 transition-colors opacity-50">“</div>
                            <p className="italic text-slate-700 text-lg font-medium leading-relaxed relative z-10 mb-8">"{test.t}"</p>
                            <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-black text-orange-800">{test.n[0]}</div>
                                <div>
                                    <p className="font-black text-slate-900">{test.n}</p>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{test.i}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* PRICING & OFFER */}
        <section id="pricing" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-7xl font-black text-slate-950 mb-16 tracking-tighter leading-none">
                    Qual dessas mulheres você quer ser <br /> <span className="text-orange-700 underline decoration-orange-300">daqui a 7 dias?</span>
                </h2>

                <div className="bg-white rounded-[4rem] p-8 md:p-16 shadow-[0_64px_128px_-24px_rgba(139,94,60,0.3)] relative border-[6px] border-white space-y-12">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {/* OPÇÃO CARTÃO (AMARELO DA PALETA) */}
                        <div className="bg-amber-400 p-10 rounded-[3rem] border-4 border-white shadow-xl flex flex-col justify-center gap-4 group">
                            <div className="flex items-center justify-center gap-2 text-slate-900 font-black text-xs md:text-sm uppercase tracking-[0.3em] opacity-80">
                                <CreditCard size={18} /> Pagamento no Cartão
                            </div>
                            <div className="space-y-1">
                                <p className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter">R$ 157,00</p>
                                <p className="text-sm md:text-base font-black text-slate-900/60 uppercase tracking-widest">Em até 12x sem juros</p>
                            </div>
                        </div>

                        {/* OPÇÃO PIX (VERDE) */}
                        <div className="bg-emerald-600 p-10 rounded-[3rem] border-4 border-white shadow-2xl flex flex-col justify-center gap-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-white group-hover:scale-110 transition-transform">
                                <Zap size={80} />
                            </div>
                            <div className="flex items-center justify-center gap-2 text-white font-black text-xs md:text-sm uppercase tracking-[0.3em] relative z-10">
                                <Zap size={14} fill="currentColor" /> Desconto Exclusivo PIX
                            </div>
                            <div className="space-y-1 relative z-10">
                                <div className="flex items-start justify-center gap-1">
                                    <span className="text-2xl font-black text-emerald-100 mt-4">R$</span>
                                    <span className="text-7xl md:text-8xl font-black text-white tracking-tighter">97<span className="text-4xl">,00</span></span>
                                </div>
                                <p className="text-xs md:text-sm font-black text-emerald-100 uppercase tracking-widest bg-black/10 py-1 rounded-full px-4 inline-block">À vista no PIX</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 py-6 border-y border-slate-100">
                        <p className="text-green-600 font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-2">
                            <Truck size={18} /> Frete Grátis Para Todo Brasil
                        </p>
                        <p className="text-blue-600 font-black text-xs md:text-sm uppercase tracking-[0.2em] flex items-center gap-2">
                            <Zap size={18} /> Envio Imediato em 24h
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto mb-12 bg-[#FDF8F3] p-8 rounded-[2.5rem] border border-orange-100">
                        {["Kit Completo 4 Passos", "Frascos de Tamanho Profissional", "Tratamento para 3 meses", "Garantia Total de 7 Dias", "Bio Instinto Original"].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 font-bold text-slate-700 text-sm">
                                <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={16} /></div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full h-24 bg-green-600 hover:bg-green-700 text-white rounded-[2.5rem] shadow-2xl transition-all hover:scale-[1.03] active:scale-95 group overflow-hidden">
                        <div className="flex flex-col items-center">
                            <span className="flex items-center gap-4 text-xl md:text-3xl font-black">
                                <ShoppingBag className="h-6 w-6 md:h-10 md:w-10 group-hover:scale-110 transition-transform" />
                                COMPRAR AGORA
                            </span>
                        </div>
                    </Button>

                    <div className="flex flex-wrap justify-center gap-8 opacity-30 grayscale">
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest"><ShieldCheck size={20} /> ORIGINAL</div>
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest"><Zap size={20} /> ENVIO EXPRESS</div>
                        <div className="flex items-center gap-2 text-[10px] font-black tracking-widest"><CreditCard size={20} /> PIX / CARTÃO</div>
                    </div>
                </div>
            </div>
        </section>

        {/* GARANTIA */}
        <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-[#FDF8F3] border-[6px] border-dashed border-orange-500/30 p-12 md:p-24 rounded-[4rem] relative overflow-hidden">
                    <ShieldCheck className="mx-auto h-24 w-24 text-orange-700 mb-10" />
                    <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter uppercase text-slate-950">Satisfação ou seu Dinheiro de Volta</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium italic mb-10">
                        Use o Kit Cavalo de Raça por 7 dias. Se você não AMAR o resultado, nós devolvemos 100% do seu dinheiro. Sem perguntas. Porque temos certeza que você vai se apaixonar.
                    </p>
                    <div className="inline-block px-8 py-2 bg-slate-950 text-orange-400 rounded-full text-xs font-black uppercase tracking-[0.4em]">Compromisso Bio Instinto</div>
                </div>
            </div>
        </section>

        {/* FOOTER PROFISSIONALIZADO */}
        <footer className="py-20 bg-[#FDF8F3] text-slate-900 relative overflow-hidden border-t border-slate-200">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 opacity-30"></div>
          
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 items-start mb-20">
              
              {/* Coluna 1: Logo e Empresa */}
              <div className="space-y-6 text-center md:text-left">
                <img 
                    src="https://pub-da9fd1c19b8e45d691d67626b9a7ba6d.r2.dev/1769910342967-ChatGPT-Image-31-de-jan.-de-2026,-22_38_10-(1).png" 
                    alt="OneBase Logo" 
                    className="h-14 mx-auto md:mx-0"
                />
                <div className="space-y-2">
                    <p className="text-sm font-black text-orange-800 uppercase tracking-widest">OneBase | Soluções Digitais</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        E-Business Rio Verde | Aparecida de Goiania - GO<br />
                        CNPJ: 60.357.932/0001-18
                    </p>
                </div>
                <div className="flex justify-center md:justify-start gap-4 text-slate-300">
                    <Lock size={18} /> <ShieldCheck size={18} /> <CreditCard size={18} /> <Truck size={18} />
                </div>
              </div>

              {/* Coluna 2: Links e Políticas */}
              <div className="space-y-6 text-center md:text-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-900/80">Links Úteis</p>
                <nav className="flex flex-col gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <button className="hover:text-orange-600 transition-colors text-left">Termos de Uso</button>
                    <button className="hover:text-orange-600 transition-colors text-left">Política de Privacidade</button>
                    <button className="hover:text-orange-600 transition-colors text-left">Aviso de Reembolso</button>
                    <button className="hover:text-orange-600 transition-colors text-left">Rastrear Pedido</button>
                </nav>
              </div>

              {/* Coluna 3: Atendimento */}
              <div className="space-y-6 text-center md:text-left">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-900/80">Precisa de Ajuda?</p>
                <div className="space-y-4">
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Nossa equipe de suporte está pronta para te atender de Segunda a Sexta, das 09h às 18h.
                    </p>
                    <div className="inline-block p-4 rounded-2xl bg-black/5 border border-slate-200 w-full">
                        <p className="text-[10px] font-black uppercase text-orange-800 mb-1">E-mail de Suporte</p>
                        <p className="text-sm font-bold text-slate-900">contato@cavalo-de-raca.pro</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Disclaimer Legal */}
            <div className="pt-12 border-t border-slate-200 space-y-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-[0.1em] text-center italic">
                        <strong>IMPORTANTE:</strong> Os resultados podem variar de pessoa para pessoa. Este produto é um cosmético de uso externo e não garante cura de condições patológicas pré-existentes. Em caso de irritação, suspenda o uso e procure orientação médica. As informações contidas neste site são apenas para fins informativos.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">© 2024 Cavalo de Raça - Original Bio Instinto</p>
                        <div className="h-1 w-12 bg-orange-600/30 rounded-full"></div>
                    </div>
                </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}