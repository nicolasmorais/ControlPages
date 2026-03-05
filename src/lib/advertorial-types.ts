// Tipos de dados para o Advertorial Dinâmico

// Tipos de Blocos de Conteúdo
export type BlockType = 'text' | 'image' | 'alert' | 'pricing' | 'html';

// Macros do Taboola para referência
export const TABOOLA_MACROS = [
    '{creative_name}', '{custom_id}', '{site}', '{site_id}', '{site_domain}', 
    '{thumbnail}', '{title}', '{timestamp}', '{cachebuster}', '{platform}', 
    '{campaign_id}', '{campaign_name}', '{campaign_item_id}', '{cpc}', 
    '${GDPR}', '${GDPR_CONSENT_XXXXX}'
];

export interface ContentBlock {
  id: string;
  type: BlockType;
  // Common fields
  value: string;
  fontSize?: string;
  fontFamily?: string;
  caption?: string;
  // Specific fields for 'alert'
  alertTitle?: string;
  alertVariant?: 'default' | 'destructive' | 'warning';
  // Specific fields for 'pricing'
  price?: string;
  buttonText?: string;
  buttonUrl?: string;
  prePriceText?: string;
  paymentType?: string;
  postButtonText?: string;
  checkoutUrl?: string; // URL do Checkout com UTMs
}

export interface CustomAdvertorialHeader {
  preTitle: string;
  title: string;
  subheadline: string;
  fontFamily: 'sans' | 'merriweather' | 'roboto' | 'open-sans';
}

export interface Policy {
  title: string;
  trigger: string;
  content: string;
}

export interface Disclaimer {
  title: string;
  text: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  cnpj: string;
  contact: string;
}

export interface PagePixelConfig {
  metaPixelId: string;
  taboolaPixelId: string;
  customScripts: string;
  useGlobalPixels: boolean;
}

export interface GlobalPixelConfig {
  metaPixelId: string;
  taboolaPixelId: string;
  globalScripts: string;
}

export interface CustomAdvertorialFooter {
  disclaimers: Disclaimer[];
  companyInfo: CompanyInfo;
  policies: Policy[];
  copyright: string;
  // Toggles de visibilidade
  hideDisclaimers?: boolean;
  hideCompanyInfo?: boolean;
  hidePolicies?: boolean;
}

export const defaultCustomAdvertorialFooter: CustomAdvertorialFooter = {
    disclaimers: [
        { title: "Isenção de Responsabilidade", text: "Este conteúdo tem caráter exclusivamente informativo..." },
    ],
    companyInfo: { name: "Sua Empresa", address: "Rua Exemplo, 123", cnpj: "00.000.000/0000-00", contact: "contato@exemplo.com" },
    policies: [
        { title: "Termos e Condições", trigger: "Termos", content: "Conteúdo dos termos..." },
    ],
    copyright: "Todos os direitos reservados © 2024",
    hideDisclaimers: false,
    hideCompanyInfo: false,
    hidePolicies: false,
};

export interface CustomAdvertorial {
  id: string;
  name: string;
  header: CustomAdvertorialHeader;
  blocks: ContentBlock[];
  footer: CustomAdvertorialFooter;
  pixels: PagePixelConfig;
}

// Tipos para a Página de Aprovação (AP)
export interface ApprovalPageContent {
  header: { preTitle: string; title: string; subheadline: string; };
  body: { imageUrl1: string; advertorialText: string; imageUrl2: string; guaranteeText: string; };
  pricing: { prePriceText: string; price: string; paymentType: string; buttonText: string; buttonUrl: string; postButtonText: string; };
  footer: CustomAdvertorialFooter; // Reutiliza o tipo CustomAdvertorialFooter
  pixels: PagePixelConfig;
}

// Tipos para Rotas
export interface RouteMapping {
  path: string;
  name: string;
  contentId: string;
}

// Tipos para Analytics
export interface PageViewEvent {
  id: string;
  contentId: string;
  path: string;
  timestamp: string;
  country?: string;
  regionName?: string;
}

// Estrutura de dados padrão para inicialização do DB (se necessário)
export const defaultDbData = {
    examples: [],
    routes: [],
    customAdvertorials: [],
    pageViews: [],
    auth: {
        passwordHash: ""
    },
    pixelConfig: {
        metaPixelId: "",
        taboolaPixelId: "",
        globalScripts: ""
    },
    approvalPageContent: {
        header: {
            preTitle: "Bem-Estar e Saúde",
            title: "Um Guia Para Uma Rotina Mais Saudável",
            subheadline: "Uma nova abordagem para o seu bem-estar diário."
        },
        body: {
            imageUrl1: "https://via.placeholder.com/800x400.png?text=Imagem+Principal",
            advertorialText: "Este é o espaço para o texto principal do seu advertorial.",
            imageUrl2: "https://via.placeholder.com/800x400.png?text=Imagem+Secundária",
            guaranteeText: "Garantia de satisfação de 7 dias."
        },
        pricing: {
            prePriceText: "ACESSO AO GUIA COMPLETO",
            price: "R$ 29,90",
            paymentType: "Pagamento Único",
            buttonText: "COMPRAR ACESSO",
            buttonUrl: "#",
            postButtonText: "Compra segura e acesso imediato."
        },
        footer: defaultCustomAdvertorialFooter,
        pixels: {
            metaPixelId: "",
            taboolaPixelId: "",
            customScripts: "",
            useGlobalPixels: true
        }
    }
};

// Define a estrutura completa do banco de dados (PostgreSQL não usa isso diretamente, mas é útil para tipagem)
export interface DbSchema {
    examples: any[];
    routes: RouteMapping[];
    customAdvertorials: CustomAdvertorial[];
    pageViews: PageViewEvent[];
    auth: { passwordHash: string };
    pixelConfig: GlobalPixelConfig;
    approvalPageContent: ApprovalPageContent;
}