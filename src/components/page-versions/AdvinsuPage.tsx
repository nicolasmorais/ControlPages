"use client";

import React from 'react';
import Image from 'next/image';
import {
    Heart,
    ChevronRight,
    Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageTracker } from './PageTracker';

export function AdvinsuPage() {
    return (
        <>
            <PageTracker contentId="advinsu" />

            {/* Fundo ultra limpo para leitura */}
            <div className="bg-white min-h-screen text-[#1a1a1a] font-sans selection:bg-yellow-100">

                {/* Header Simplificado para Confiança */}
                <header className="border-b-2 border-slate-50 py-6 sticky top-0 bg-white/95 backdrop-blur-md z-50">
                    <div className="max-w-[800px] mx-auto px-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Heart size={20} className="text-red-500" fill="currentColor" />
                            <span className="text-xl font-black text-black tracking-tight">Bella Diaries</span>
                        </div>
                        <div className="hidden md:block h-4 w-px bg-slate-200" />
                        <span className="text-[10px] md:text-sm font-bold uppercase tracking-tighter text-slate-400">Meu Diário de Saúde | Março 2025</span>
                    </div>
                </header>

                <main className="max-w-[800px] mx-auto px-6 py-12 md:py-20">
                    <article className="space-y-16">

                        {/* Headline Gigante e Legível */}
                        <header className="space-y-8 text-left">
                            <h1 className="text-4xl md:text-6xl font-black text-black leading-[1.1] tracking-tight">
                                Fiz tudo certo por 2 anos — dieta, remédio, caminhada — e minha glicemia não saía de 210. Hoje está em 109. O que mudou foi uma coisa só.
                            </h1>
                            <div className="flex items-center gap-4 text-xl md:text-2xl text-slate-500 font-medium border-t border-slate-50 pt-8">
                                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 relative">
                                    <Image src="/images/advinsu-hero.png" alt="Sônia Ferreira" fill className="object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-black font-black">Sônia Ferreira</span>
                                    <span className="text-sm uppercase tracking-widest text-slate-400">Goiânia, GO</span>
                                </div>
                            </div>
                        </header>

                        {/* Texto Principal - Narrativa Completa */}
                        <div className="space-y-12 text-2xl md:text-3xl leading-[1.6] text-slate-800">
                            <p>Tem uma coisa que eu nunca falei pra minha filha enquanto estava passando por isso.</p>
                            <p>Toda vez que ela ligava perguntando como eu estava, eu dizia que estava bem. Mas não estava. Eu tinha medo. Medo de verdade — daquele tipo que você carrega sozinha pra não preocupar ninguém.</p>
                            <p>Medo de perder a visão. Medo de acordar um dia com um pé comprometido. Medo de o médico me olhar e dizer que não tinha mais como evitar a insulina.</p>
                            <p>Eu tinha 52 anos. Diabetes tipo 2 há dois anos. E fazia tudo que mandavam.</p>

                            <h2 className="text-3xl md:text-5xl font-black text-black pt-8">Eu fazia tudo certinho. Mas nada funcionava.</h2>
                            <p>Cortei o arroz, o pão, a fruta doce, o refrigerante. Cheguei a pesar a comida em balança de cozinha como se fosse atleta. Não era exagero — era desespero de quem quer fazer certo e não sabe mais o que certo significa.</p>
                            <p>Toda manhã eu acordava esperando um número bom no aparelhinho. E toda manhã ele me decepcionava. 180. 210. 190. Nunca abaixo de 160 em jejum.</p>

                            <div className="bg-blue-50/50 border-l-8 border-blue-600 p-8 rounded-r-3xl">
                                <p className="font-bold text-black italic">"Eu olhava pro visor e pensava: o que mais eu preciso cortar? Até quando?"</p>
                            </div>

                            <p>Fui à endocrinologista três vezes em seis meses. Ela ajustava o remédio, pedia exames novos, e no final dizia sempre a mesma coisa: 'Continue com a dieta, Sônia. O estresse também atrapalha.' Eu saía do consultório com a receita na mão e uma sensação de que não estava sendo ouvida.</p>
                            <p>Tentei outras coisas por conta própria. Canela em cápsula por três meses. Chá de pata de vaca todo dia — gosto horrível, resultado zero. Um suplemento importado que uma colega indicou, R$180 a caixinha, comprei duas. Nada. A glicemia não movia um ponto.</p>

                            <div className="bg-slate-50 border-l-8 border-slate-900 p-8 rounded-r-3xl">
                                <p className="font-bold text-black italic">"Não era falta de força de vontade. Eu tinha de sobra. Era que eu estava tentando resolver com as ferramentas erradas um problema que eu nem sabia direito qual era."</p>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-black pt-8">O áudio que eu quase não ouvi</h2>
                            <p>Foi minha amiga Dalva quem me mandou. A gente se conhece desde o colégio — então quando o áudio longo chegou no WhatsApp, eu quase ignorei. Achei que era mais uma indicação de chá milagroso.</p>
                            <p>Mas ouvi. E ela estava chorando.</p>
                            <p>Ela contou que a glicemia dela tinha caído de 198 para 112 em jejum em menos de dois meses. Sem mudar o remédio. Sem mudar a dieta.</p>
                            <p>Liguei pra ela na hora.</p>
                            <p>Ela me explicou que estava usando um suplemento chamado <strong>Insubeta</strong> — gotas com cinco ativos que trabalham juntos no mesmo ponto: a resistência à insulina. Não é remédio, não substitui o médico. Mas age onde os suplementos comuns não chegam.</p>

                            <div className="bg-blue-600 text-white p-12 rounded-[3rem] shadow-2xl shadow-blue-500/20 leading-relaxed font-bold">
                                <p className="text-3xl md:text-4xl font-black">"É como se seu corpo estivesse tentando processar o açúcar com uma ferramenta quebrada. O Insubeta conserta a ferramenta."</p>
                            </div>

                            <p>Perguntei pra ela: 'Dalva, mas funciona pra quem já tem diabetes há mais tempo? Porque eu já tentei tanta coisa que não acredito mais fácil.'</p>
                            <p>Ela disse: 'Sônia, funciona exatamente porque trata a raiz, não o sintoma. Não é suplemento de academia. É feito pra quem tem resistência à insulina de verdade.'</p>
                            <p>Comprei naquela mesma noite.</p>
                            <p>Entrei no site e a primeira coisa que me chamou atenção foi que eles indicam o kit de acordo com a glicemia. Quem está entre 150 e 200, o tratamento de 3 meses. Quem está acima de 200, o kit de 5 meses — porque a resistência à insulina é maior e o corpo precisa de mais tempo pra responder.</p>
                            <p>Eu estava em 210. Me encaixava no kit de 5, mas decidi começar pelo de 3 pra ver se funcionava pra mim.</p>
                            <p>O que me convenceu a não comprar só um pote foi entender como o suplemento age. Ele não derruba a glicemia na hora como um remédio. Ele trabalha na raiz — vai corrigindo a resistência à insulina aos poucos, mês a mês. Se parar antes do ciclo completo, o corpo não termina o processo e o efeito some. É como um tratamento de verdade, não um produto de resultado imediato.</p>

                            <div className="bg-blue-50/50 border-l-8 border-blue-600 p-8 rounded-r-3xl">
                                <p className="font-bold text-black italic">"Pensei: já gastei dinheiro com coisa que não funcionou fazendo pela metade. Se esse aqui tem fundamento, vou fazer direito."</p>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-black pt-8">O que foi acontecendo</h2>
                            <p>Na primeira semana, acordei sem aquela sensação de cabeça pesada que eu achava que era normal. Fiz o teste quase sem esperança. 174. Achei coincidência.</p>
                            <p>Mas a coincidência foi se repetindo. No fim do primeiro mês, mostrei o aparelho pro meu marido sem falar nada. Ele me olhou, olhou pro número, e a gente ficou ali parado sem saber se ria ou chorava. Era a menor medição que eu tinha tido em meses.</p>
                            <p>No segundo mês, levei o resultado pra consulta. A dra. Ana Paula pediu pra repetir o exame — achou que tinha dado erro. Não era erro.</p>

                            <div className="bg-slate-50 border-l-8 border-slate-900 p-8 rounded-r-3xl">
                                <p className="font-bold text-black italic">"Ela me olhou e perguntou: 'Sônia, o que você mudou?' Contei sobre o Insubeta. Ela anotou o nome."</p>
                            </div>

                            <p>No terceiro mês, o resultado veio em 109. Dentro da faixa. Pela primeira vez em dois anos, a médica reduziu a dose da metformina.</p>

                            <h2 className="text-3xl md:text-5xl font-black text-black pt-8">Três meses depois</h2>
                            <p>Hoje minha glicemia está controlada. Continuo com a dieta e caminhando — mas agora o esforço tem resultado. O que mudou de verdade foi o medo. Aquele medo constante de acordar e ver o número subindo foi embora.</p>
                            <p>Na semana passada minha filha veio me visitar e fez bolo de aniversário sem açúcar. Comemos juntas. Eu testei antes e depois. A diferença foi mínima. E eu não passei a noite com culpa.</p>

                            <div className="bg-green-50/50 border-l-8 border-green-600 p-8 rounded-r-3xl">
                                <p className="font-bold text-black italic">"Diabetes não precisa ser sentença. Mas você precisa das ferramentas certas — não só força de vontade."</p>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-black pt-8 underline decoration-blue-600 decoration-8 underline-offset-8">Outras mulheres com a mesma história</h2>
                            <div className="grid grid-cols-1 gap-10 py-8">
                                {[
                                    { n: "Maria das Graças, 54 anos — Belo Horizonte, MG", t: "Minha glicose estava em 220 há meses. Com 3 semanas de Insubeta foi pra 167. Com 2 meses chegou em 119. Nunca tinha conseguido isso só com dieta." },
                                    { n: "Conceição Alves, 49 anos — Recife, PE", t: "Minha endocrinologista disse que ia precisar aumentar o remédio. Comecei o Insubeta antes da próxima consulta. Quando voltei, ela disse que não precisava aumentar nada. Fiquei sem palavras." },
                                    { n: "Rosária Nunes, 51 anos — Fortaleza, CE", t: "Já tinha desistido. Achei que era genética e não tinha o que fazer. Em 30 dias minha glicose caiu 40 pontos. Chorei muito." }
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 p-10 rounded-[2rem] border-2 border-slate-100 space-y-4">
                                        <p className="text-2xl font-bold italic text-black leading-relaxed">"{item.t}"</p>
                                        <p className="text-lg font-black uppercase tracking-widest text-slate-400">— {item.n}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Seção de Oferta "Nativa" */}
                            <div className="my-20 space-y-12 bg-slate-50 border-4 border-dashed border-slate-200 p-8 md:p-16 rounded-[3rem]">
                                <h2 className="text-3xl md:text-5xl font-black leading-tight text-black">
                                    O desconto que consegui para as leitoras aqui
                                </h2>

                                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
                                    Recebi tantas mensagens de amigas perguntando como fazer que entrei em contato direto com o Insubeta. Eles toparam oferecer 50% de desconto para quem chegar pelo meu link.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="bg-white border-2 border-slate-200 p-8 rounded-3xl space-y-4 shadow-sm">
                                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Para glicemia entre 150 e 200</p>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-black text-black">Kit 3 meses</span>
                                            <span className="text-4xl font-black text-blue-600">R$ 297,00</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full w-fit">
                                            <Check size={16} strokeWidth={4} /> Frete Grátis
                                        </div>
                                    </div>

                                    <div className="bg-white border-4 border-blue-600 p-8 rounded-3xl space-y-4 shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-4 py-1 uppercase tracking-tighter">Mais Comum</div>
                                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Para glicemia acima de 200</p>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-2xl font-black text-black">Kit 5 meses</span>
                                            <span className="text-4xl font-black text-blue-600">R$ 397,00</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full w-fit">
                                            <Check size={16} strokeWidth={4} /> Frete Grátis
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg md:text-xl font-bold text-slate-500 italic text-center">
                                    O desconto de 50% é aplicado automaticamente ao acessar pelo link abaixo. Frete grátis nos dois.
                                </p>

                                <div className="bg-white border-2 border-green-500/30 p-10 rounded-[2.5rem] space-y-6 relative group transition-all hover:border-green-500">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="bg-green-500 text-white p-3 rounded-2xl shadow-lg shadow-green-500/20">
                                            <Check size={24} strokeWidth={4} />
                                        </div>
                                        <h3 className="text-3xl font-black text-black">Você não paga nada agora</h3>
                                    </div>
                                    <p className="text-xl md:text-2xl leading-relaxed font-medium text-slate-700">
                                        O pagamento é feito na entrega. Você entra no site, escolhe o kit e agenda o recebimento. Quando o produto chegar, um atendente entra em contato pelo <span className="text-green-600 font-bold">WhatsApp</span> para confirmar que está tudo certo e realizar a cobrança. <span className="underline decoration-green-500 decoration-4 underline-offset-4">Só paga quando o produto estiver na sua mão.</span>
                                    </p>
                                    <div className="pl-6 border-l-4 border-slate-200">
                                        <p className="text-lg font-bold italic text-slate-500">
                                            "Esse foi um dos motivos que me deu segurança na primeira compra. Sem precisar confiar cegamente antes de ver o produto."
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <a
                                        href="https://seulinkdeoferta.com"
                                        target="_blank"
                                        className="inline-flex items-center justify-center w-full bg-blue-600 h-28 rounded-[2.5rem] font-black text-2xl md:text-4xl uppercase tracking-tighter shadow-3xl hover:bg-blue-500 transition-all active:scale-95 leading-none px-8 text-center text-white"
                                    >
                                        ACESSAR O SITE OFICIAL DO INSUBETA COM 50% DE DESCONTO
                                    </a>
                                </div>
                            </div>

                            {/* Depoimentos Estratégicos */}
                            <section className="pt-20 space-y-12">
                                <h3 className="text-3xl font-black text-black border-b-4 border-slate-50 pb-6 uppercase tracking-tight">Depoimentos Recentes</h3>
                                <div className="space-y-12">
                                    {[
                                        {
                                            n: "Maria Helena Castro",
                                            t: "Estava com muito medo de ser só mais um produto desses da internet que não funcionam. Mas o fato de poder pagar só quando o produto chega na minha mão me deu coragem de testar. Minha glicemia já baixou de 190 para 145 em apenas 2 semanas. Vale cada centavo!",
                                            i: "M",
                                            c: "bg-purple-100 text-purple-600",
                                            likes: 42
                                        },
                                        {
                                            n: "João Carlos Mendes",
                                            t: "Levei a fórmula para minha endocrinologista ver. Ela disse que os componentes (Cromo e Inositol principalmente) são excelentes para quem tem resistência à insulina. Estou no segundo mês do tratamento de 5 potes e nunca me senti tão disposto. Minha visão até parou de embaçar.",
                                            i: "J",
                                            c: "bg-blue-100 text-blue-600",
                                            likes: 31
                                        },
                                        {
                                            n: "Teresa Rocha",
                                            t: "Tenho diabetes há 12 anos e achei que meu corpo já não respondia a mais nada. O Insubeta não é milagre, é tratamento. Você sente que ele vai corrigindo o corpo por dentro. Comecei com 220 de glicemia e hoje acordei com 112. Recomendo comprar o kit de 5 meses para não interromper o tratamento.",
                                            i: "T",
                                            c: "bg-orange-100 text-orange-600",
                                            likes: 56
                                        },
                                        {
                                            n: "Sâmara Abreu",
                                            t: "Chegou muito rápido aqui no RS! Estava preocupada se ia demorar, mas em 4 dias estava na porta. O atendimento pelo WhatsApp para confirmar a entrega foi muito educado. Podem confiar que a empresa é séria.",
                                            i: "S",
                                            c: "bg-green-100 text-green-600",
                                            likes: 19
                                        }
                                    ].map((comment, i) => (
                                        <div key={i} className="flex gap-6 items-start border-b border-slate-50 pb-10">
                                            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shrink-0 shadow-sm", comment.c)}>{comment.i}</div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-black text-xl text-black">{comment.n}</span>
                                                    <span className="text-sm font-bold text-green-500 flex items-center gap-1"><Check size={14} strokeWidth={4} /> Compra Verificada</span>
                                                </div>
                                                <p className="text-xl md:text-2xl text-slate-600 leading-relaxed italic">"{comment.t}"</p>
                                                <div className="flex items-center gap-6 pt-2">
                                                    <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">
                                                        <Heart size={18} /> Curtir ({comment.likes})
                                                    </button>
                                                    <button className="text-sm font-bold text-slate-400 hover:text-black transition-colors">Responder</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <div className="pt-20 border-t-4 border-slate-50">
                                <p className="italic text-2xl mb-4">Com carinho,</p>
                                <p className="font-black text-4xl text-black not-italic leading-none">Sônia Ferreira</p>
                                <p className="text-lg uppercase tracking-widest text-slate-400 mt-2">Goiânia, GO</p>
                            </div>
                        </div>

                        <footer className="pt-20 pb-20 border-t border-slate-50">
                            <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed italic text-center max-w-[600px] mx-auto">
                                Nota: Este conteúdo é informativo e baseado em relato pessoal. Resultados podem variar. Não substitui acompanhamento médico. Produto notificado na ANVISA.
                            </p>
                        </footer>
                    </article>
                </main>
            </div>
        </>
    );
}
