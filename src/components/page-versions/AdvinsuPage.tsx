"use client";

import React from 'react';
import Image from 'next/image';
import {
    Heart,
    ChevronRight,
    Instagram,
    Facebook
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageTracker } from './PageTracker';

export function AdvinsuPage() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <PageTracker contentId="advinsu" />

            <div className="bg-white min-h-screen font-space-grotesk text-slate-800">
                {/* Header Simples - Estilo Blog Minimalista */}
                <header className="border-b border-slate-100 py-6 md:py-10">
                    <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            <Heart size={24} className="text-pink-400" fill="currentColor" />
                            <span className="text-3xl font-light tracking-widest text-slate-900 uppercase">
                                Bella <span className="text-pink-400 font-medium">Diaries</span>
                            </span>
                        </div>
                    </div>
                </header>

                <main className="max-w-3xl mx-auto px-6 py-12">
                    {/* Headline Limpa */}
                    <div className="text-center mb-12">
                        <span className="text-pink-400 text-xs font-bold uppercase tracking-widest block mb-4">Meu Diário de Saúde | Março 2025</span>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
                            Eu seguia à risca a dieta para diabetes — e minha glicose continuava nas alturas.
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-slate-400 text-xs italic">
                            <span>Por Sônia Ferreira</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            <span>Goiânia, GO</span>
                        </div>
                    </div>

                    {/* Imagem Hero */}
                    <div className="relative w-full aspect-[16/9] mb-12 rounded-lg overflow-hidden grayscale-[10%] hover:grayscale-0 transition-all duration-700 shadow-sm">
                        <Image
                            src="/images/advinsu-hero.png"
                            alt="Sônia Ferreira"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="max-w-none text-slate-600 leading-relaxed font-space-grotesk text-2xl md:text-xl space-y-8">
                        <p className="text-3xl md:text-2xl text-slate-900 font-medium leading-relaxed">
                            Até que uma amiga me mandou uma mensagem no WhatsApp que mudou tudo...
                        </p>

                        <p className="italic text-base">Relato de Sônia Ferreira — Goiânia, GO</p>

                        <p>Tem uma coisa que eu nunca contei pra minha filha.</p>
                        <p>Toda vez que ela me ligava perguntando 'mãe, como você tá?', eu respondia 'tô bem, filha.' Mas por dentro, eu não estava bem. Eu estava com medo.</p>
                        <p>Medo de acordar um dia e não ter mais a visão. Medo de perder um dedo, um pé. Medo de chegar num ponto que o médico olhasse pra mim e dissesse: 'Sônia, agora não tem mais como evitar a insulina.'</p>
                        <p>Eu tinha 52 anos. Diagnóstico de diabetes tipo 2 havia dois anos. E fazia tudo certo — ou achava que fazia.</p>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-12 mb-6">A dieta que eu seguia e a glicose que não cedia</h2>
                        <p>Eu cortei o arroz. Cortei o pão. Cortei o doce, o refrigerante, a fruta doce. Cheguei a pesar comida em balança de cozinha como se fosse atleta de competição.</p>
                        <p>Toda manhã eu acordava esperando que o aparelhinho desse um número bom. E toda manhã ele me decepcionava. 180, 210, 190. Nunca abaixo de 160 em jejum.</p>

                        <blockquote className="border-l-4 border-pink-200 pl-8 py-2 my-10 italic text-slate-900 text-4xl md:text-3xl leading-relaxed">
                            "Eu ficava olhando pro aparelho pensando: o que mais eu preciso cortar? Quanto mais eu posso me privar?"
                        </blockquote>

                        <p>Meu marido, o Renato, via meu rosto toda manhã na hora do teste. Ele aprendeu a não perguntar o resultado quando eu ficava quieta. Era o nosso código não dito.</p>
                        <p>Fui ao endocrinologista pela terceira vez em seis meses. Ele ajustou a metformina, pediu novos exames e disse a mesma coisa que sempre dizia: 'Sônia, continue com a dieta, o estresse também atrapalha.' Como se eu não soubesse disso.</p>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-12 mb-6">O que eu gastei tentando resolver sozinha</h2>
                        <p>Antes de te contar o que funcionou, preciso te contar tudo que não funcionou. Porque eu sei que você provavelmente já tentou muita coisa também.</p>
                        <ul className="list-disc pl-6 space-y-4 mb-8 text-xl">
                            <li>Canela em cápsula — usei três meses. A glicose não mexeu.</li>
                            <li>Chá de pata de vaca todo dia. Gosto horrível. Resultado zero.</li>
                            <li>Um suplemento importado que uma colega indicou. R$180 a caixinha. Duas caixas. Nada.</li>
                            <li>Aula de caminhada toda manhã às 6h, debaixo de chuva ou sol. Minha glicose caía um pouco depois do exercício e voltava no dia seguinte.</li>
                        </ul>

                        <p className="font-bold text-slate-900 italic">"O problema não era minha força de vontade. O problema era que eu não sabia o que realmente estava causando a resistência à insulina no meu corpo."</p>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-12 mb-6">A mensagem que eu quase ignorei</h2>
                        <p>Foi minha amiga Dalva quem me mandou. A gente se conhece desde o colégio. Ela me mandou um áudio longo — e eu quase não ouvi, porque achei que era mais uma indicação de chá milagroso.</p>
                        <p>Mas o áudio era diferente. Ela estava chorando de emoção. Contou que a glicose dela tinha caído de 198 para 112 em jejum em menos de dois meses. E que ela não tinha mudado a dieta nem o remédio.</p>
                        <p>Liguei pra ela na hora.</p>
                        <p>Ela me contou que estava usando o <strong>Insubeta</strong> — um suplemento com cinco ativos que trabalham juntos no mesmo problema: a resistência à insulina. Não é um remédio, não substitui o médico. Mas age onde os suplementos comuns não chegam.</p>

                        <div className="bg-pink-50/50 p-8 my-10 rounded-sm italic border-l-4 border-pink-200 text-slate-950">
                            <p className="mb-4 text-2xl md:text-xl font-medium leading-relaxed">"É como se seu corpo estivesse tentando processar o açúcar com uma ferramenta quebrada. O Insubeta conserta a ferramenta."</p>
                            <p className="text-lg md:text-base not-italic text-slate-600 mb-0">Me explicou os ingredientes: a Laranja Moro que acelera o metabolismo do açúcar no sangue e ajuda a combater a retinopatia — aquela complicação que pode roubar a visão. O Inositol que melhora a sensibilidade à insulina. O Cromo que regula a glicose e reduz o desejo por doce. A Vitamina B12 que protege os nervos, que é exatamente onde o diabetes bate mais forte. E o Magnésio que reduz pressão e previne complicações no coração.</p>
                        </div>

                        <p>Perguntei logo: 'Dalva, mas funciona mesmo pra quem já tem diabetes há mais tempo? Porque eu já tentei tanta coisa...'</p>
                        <p>Ela disse: 'Sônia, funciona exatamente porque trata a raiz, não o sintoma. Não é suplemento de academia. É feito pra quem tem resistência à insulina de verdade.'</p>
                        <p>Comprei naquela mesma noite.</p>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-12 mb-6">O que aconteceu semana a semana</h2>
                        <ul className="space-y-6 my-10 list-none p-0 text-lg">
                            {[
                                { d: "DIA 3", t: "Acordei sem aquela sensação de cabeça pesada que eu achava que era normal. Fiz o teste. 174. Achei coincidência." },
                                { d: "DIA 7", t: "164 em jejum. A menor medição que eu tinha tido em meses. Fiquei parada segurando o aparelho." },
                                { d: "SEM 2", t: "154. Mostrei pro Renato. Ele ficou me olhando sem acreditar. A gente não sabia se ria ou chorava." },
                                { d: "SEM 4", t: "138. Minha filha ligou. Contei tudo. Ela chorou. Eu chorei junto." },
                                { d: "MÊS 2", t: "118 em jejum. A endocrinologista pediu pra repetir o exame achando que era erro. No era." },
                                { d: "MÊS 3", t: "109. Dentro da faixa. A médica ajustou a medicação pra baixo pela primeira vez." }
                            ].map((item, i) => (
                                <li key={i} className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-slate-50 pb-6">
                                    <span className="font-bold text-pink-500 w-24 flex-shrink-0 tracking-widest">{item.d}</span>
                                    <span className="text-slate-600 leading-relaxed font-medium">{item.t}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="italic text-lg">Na consulta do segundo mês, a dra. Ana Paula me olhou e disse: 'Sônia, o que você mudou?' Contei sobre o Insubeta. Ela anotou o nome.</p>
                        <p className="font-bold text-slate-900 text-xl">"Quando um profissional de saúde que você respeita te olha nos olhos e pergunta o que você fez diferente — você sabe que algo mudou de verdade."</p>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-12 mb-6">Três meses depois: eu me reconheço de novo</h2>
                        <p>Hoje mi glicose está controlada. A médica reduziu a dose da metformina. Continuo com a dieta, continuo caminhando — mas agora o esforço tem resultado.</p>
                        <p>O que mudou mais foi o medo. Aquele medo constante de acordar e ver o número subindo, de saber que as complicações estavam chegando... ele foi embora.</p>
                        <p>Na semana passada, minha filha veio me visitar e fez bolo de aniversário — sem açúcar, ela fez questão. Eu testei antes e depois. A diferença foi mínima. Comemos juntas e eu não passei a noite com culpa.</p>

                        <p className="text-3xl md:text-2xl text-slate-950 font-bold italic my-10 border-l-4 border-pink-200 pl-8 leading-relaxed">"Diabetes não precisa ser sentença. Mas você precisa das ferramentas certas. Não só força de vontade."</p>

                        <p>Não sou só eu. Desde que contei pra minhas amigas, recebi mensagens de mulheres com a mesma história. Peço licença pra compartilhar algumas:</p>

                        <h3 className="text-2xl md:text-xl font-bold text-slate-900 mt-12 mb-6 uppercase tracking-wider">O que outras mulheres estão dizendo</h3>
                        <div className="grid grid-cols-1 gap-6 mb-12">
                            {[
                                { n: "Maria das Graças, 54 anos — Belo Horizonte, MG", t: "Minha glicose estava em 220 em jejum há meses. Com 3 semanas de Insubeta estava em 167. Com 2 meses chegou em 119. Nunca tinha conseguido isso só com dieta." },
                                { n: "Conceição Alves, 49 anos — Recife, PE", t: "Endocrinologista me disse que ia precisar aumentar o remédio. Comecei o Insubeta antes da próxima consulta. Quando voltei, ele disse que não ia precisar aumentar nada. Fiquei sem palavras." },
                                { n: "Rosária Nunes, 51 anos — Fortaleza, CE", t: "Já tinha desistido de controlar. Achei que era genética e que não tinha o que fazer. Minha irmã me mandou o link. Em 30 dias minha glicose caiu 40 pontos. Chorei muito." }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-8 rounded-lg border-l-4 border-slate-200 shadow-sm">
                                    <p className="mb-4 italic text-slate-700 text-xl md:text-lg leading-relaxed font-medium">"{item.t}"</p>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">— {item.n}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-12 mb-6">Por que estou escrevendo isso aqui hoje</h2>
                        <p>Recebi tantas mensagens de amigas perguntando o que eu tinha feito que resolvi escrever de vez.</p>
                        <p>Entrei em contato com o site do Insubeta e expliquei que muitas leitoras do meu blog estavam perguntando. Eles me passaram um link com condições especiais para quem vem daqui.</p>
                        <p>Não é indicação paga. Só quero que você tenha acesso ao mesmo tratamento que mudou a minha vida.</p>

                        {/* Insubeta Features */}
                        <div className="bg-slate-900 text-white p-8 md:p-12 my-12 rounded-2xl shadow-2xl">
                            <h3 className="text-2xl md:text-xl font-bold mb-8 text-pink-400 uppercase tracking-[0.2em]">O que você recebe no Insubeta</h3>
                            <div className="space-y-8">
                                {[
                                    { t: "Laranja Moro", d: "Acelera o metabolismo do açúcar no sangue e combate a retinopatia (perda de visão)" },
                                    { t: "Inositol", d: "Melhora a sensibilidade à insulina e reduz resistência — ideal para diabetes tipo 2" },
                                    { t: "Cromo", d: "Regula a glicose e reduz o desejo por açúcares — o gatilho que sabota a dieta" },
                                    { t: "Vitamina B12", d: "Protege os nervos contra danos — complicação silenciosa e comum do diabetes" },
                                    { t: "Magnésio", d: "Reduz a pressão e previne complicações cardiovasculares — o maior risco para diabéticos" }
                                ].map((item, i) => (
                                    <div key={i} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                                        <p className="font-bold text-2xl md:text-xl mb-2 text-white">{item.t}</p>
                                        <p className="text-slate-400 text-lg md:text-base leading-relaxed">{item.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="my-16 text-center border-4 border-slate-100 p-8 md:p-16 rounded-3xl shadow-sm">
                            <h3 className="text-3xl md:text-2xl font-bold text-slate-900 mb-6">Quanto custa e como funciona</h3>
                            <p className="text-xl md:text-lg text-slate-500 mb-8 leading-relaxed">
                                O tratamento completo (3 potes — 3 meses) é <strong className="text-slate-900">R$ 297,00</strong> à vista ou 12x de R$ 29,82. <span className="text-green-600 block md:inline">Frete grátis.</span>
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                <div className="p-6 bg-slate-50 border border-slate-100 italic rounded-2xl">Kit 1 pote: R$ 197,00</div>
                                <div className="p-6 bg-pink-50 border border-pink-100 font-bold rounded-2xl text-pink-700">Kit 5 potes: R$ 397,00</div>
                            </div>

                            <p className="text-green-600 font-bold text-sm md:text-xs mb-10 uppercase tracking-[0.2em] bg-green-50 py-3 px-6 rounded-full inline-block">
                                Pagamento na entrega disponível
                            </p>

                            <div className="space-y-6">
                                <p className="text-red-500 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">⏳ Oferta por tempo limitado</p>

                                <a
                                    href="https://seulinkdeoferta.com"
                                    target="_blank"
                                    className="inline-flex items-center justify-center w-full md:w-auto h-20 px-12 bg-slate-950 text-white rounded-full font-bold text-2xl md:text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl hover:bg-pink-500 uppercase tracking-widest"
                                >
                                    → SITE OFICIAL INSUBETA
                                </a>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-2xl font-bold text-slate-900 mt-16 mb-6">Da última vez que testei a glicose...</h2>
                        <p>Você lembra que eu comecei esse texto falando do medo? De acordar todo dia e ter medo do número no aparelhinho?</p>
                        <p>Da última vez que testei, eu estava sorrindo antes de ver o resultado. Era a mesma mulher. O mesmo aparelho. O mesmo dedo. Tudo diferente.</p>
                        <p className="text-3xl md:text-2xl font-bold text-slate-950 mt-10 mb-12 leading-tight">Não desiste de você mesma.</p>

                        <div className="pt-10 border-t border-slate-100">
                            <p className="italic text-xl mb-2">Com carinho,</p>
                            <p className="font-bold text-2xl text-slate-900 not-italic">Sônia Ferreira — Goiânia, GO</p>
                        </div>

                        <p className="text-[10px] md:text-xs text-slate-400 mt-20 uppercase tracking-[0.2em] leading-relaxed italic">
                            Este conteúdo é informativo e baseado em relato pessoal. Resultados podem variar. Não substitui acompanhamento médico. Produto notificado na ANVISA.
                        </p>
                    </div>
                </main>

                {/* Seção de Comentários (Social Proof) */}
                <section className="max-w-3xl mx-auto px-6 py-16 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Comentários <span className="bg-slate-100 text-slate-500 text-sm px-2 py-0.5 rounded-full">18</span>
                        </h3>
                        <div className="text-sm font-medium text-slate-400">Mais recentes</div>
                    </div>

                    <div className="space-y-10">
                        {[
                            {
                                name: "Maria Helena",
                                time: "2 horas atrás",
                                avatar: "M",
                                color: "bg-purple-100 text-purple-600",
                                content: "Sônia, que relato lindo! Eu estou na segunda semana do Insubeta e pela primeira vez vi minha glicose em 140. Chorei quando vi o resultado hoje cedo. Obrigada por compartilhar!",
                                likes: 24
                            },
                            {
                                name: "João Carlos",
                                time: "5 horas atrás",
                                avatar: "J",
                                color: "bg-blue-100 text-blue-600",
                                content: "Eu estava cético, mas o preço promocional me convenceu a testar. Já sinto muito mais disposição e a vontade de comer doce diminuiu absurdamente.",
                                likes: 12
                            },
                            {
                                name: "Teresa Rocha",
                                time: "8 horas atrás",
                                avatar: "T",
                                color: "bg-pink-100 text-pink-600",
                                content: "Meu kit chegou ontem! Super bem embalado e entrega muito rápida. Ansiosa para começar meu tratamento.",
                                likes: 5
                            },
                        ].map((comment, i) => (
                            <div key={i} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 150}ms` }}>
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm", comment.color)}>
                                    {comment.avatar}
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="font-bold text-slate-900">{comment.name}</div>
                                        <div className="text-xs text-slate-400 font-medium">{comment.time}</div>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed text-lg italic italic">"{comment.content}"</p>
                                    <div className="flex items-center gap-6 pt-2">
                                        <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-pink-500 transition-colors">
                                            <Heart size={14} /> {comment.likes}
                                        </button>
                                        <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Responder</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-slate-50 rounded-3xl p-8 border border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium mb-4">Apenas usuários verificados podem comentar</p>
                        <button className="text-pink-500 font-bold hover:underline">Fazer login para comentar</button>
                    </div>
                </section>

                <footer className="border-t border-slate-100 py-16 mt-20 text-center">
                    <div className="flex justify-center gap-6 mb-8 text-slate-300">
                        <Instagram size={24} className="hover:text-pink-400 cursor-pointer transition-colors" />
                        <Facebook size={24} className="hover:text-pink-400 cursor-pointer transition-colors" />
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-medium">© 2025 Bella Diaries | Todos os direitos reservados</p>
                </footer>
            </div>
        </>
    );
}
