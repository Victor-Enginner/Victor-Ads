export type Language = 'en' | 'pt';

export type TranslationKey =
  // AuraiHero / Nav
  | 'nav.services' | 'nav.process' | 'nav.work' | 'nav.pricing' | 'nav.contact'
  | 'nav.login' | 'nav.letsTalk'
  // AuraiHero - Hero body
  | 'hero.terminal.boot' | 'hero.terminal.orchestrated' | 'hero.terminal.online' | 'hero.terminal.ready'
  | 'hero.badge.claude' | 'hero.badge.make' | 'hero.badge.multiagent'
  | 'hero.title.line1' | 'hero.title.line2'
  | 'hero.subtitle'
  | 'hero.cta.audit' | 'hero.cta.seeWork'
  | 'hero.pill.wf' | 'hero.pill.chatbots' | 'hero.pill.content'
  // TrustMarquee
  | 'trust.label'
  // ServicesSection
  | 'services.tag' | 'services.title.line1' | 'services.title.line2'
  | 'services.card1.title' | 'services.card1.desc'
  | 'services.card2.title' | 'services.card2.desc'
  | 'services.card3.title' | 'services.card3.desc'
  | 'services.card4.title' | 'services.card4.desc'
  | 'services.card5.title' | 'services.card5.desc'
  // HowItWorks
  | 'process.tag' | 'process.title.line1' | 'process.title.line2'
  | 'process.step1.title' | 'process.step1.desc'
  | 'process.step2.title' | 'process.step2.desc'
  | 'process.step3.title' | 'process.step3.desc'
  | 'process.term.init' | 'process.term.mapping' | 'process.term.identified'
  | 'process.term.build' | 'process.term.wiring' | 'process.term.deployed'
  | 'process.term.result'
  // SentinelSection
  | 'sentinel.tag' | 'sentinel.title.line1' | 'sentinel.title.line2'
  | 'sentinel.stat1' | 'sentinel.stat2' | 'sentinel.stat3' | 'sentinel.stat4'
  // PortfolioSection
  | 'portfolio.tag' | 'portfolio.title.line1' | 'portfolio.title.line2'
  | 'portfolio.desc'
  | 'portfolio.cat.automation' | 'portfolio.cat.chatbot' | 'portfolio.cat.content'
  | 'portfolio.comingSoon'
  // PricingSection
  | 'pricing.tag' | 'pricing.title.line1' | 'pricing.title.line2'
  | 'pricing.toggle.retainer' | 'pricing.toggle.project'
  | 'pricing.plan1.name' | 'pricing.plan1.tagline'
  | 'pricing.plan2.name' | 'pricing.plan2.tagline'
  | 'pricing.plan3.name' | 'pricing.plan3.tagline'
  | 'pricing.feature1.plan1' | 'pricing.feature2.plan1' | 'pricing.feature3.plan1' | 'pricing.feature4.plan1'
  | 'pricing.feature1.plan2' | 'pricing.feature2.plan2' | 'pricing.feature3.plan2' | 'pricing.feature4.plan2' | 'pricing.feature5.plan2'
  | 'pricing.feature1.plan3' | 'pricing.feature2.plan3' | 'pricing.feature3.plan3' | 'pricing.feature4.plan3' | 'pricing.feature5.plan3'
  | 'pricing.popular' | 'pricing.perMonth' | 'pricing.once' | 'pricing.custom' | 'pricing.cta'
  // FaqSection
  | 'faq.tag' | 'faq.title.line1' | 'faq.title.line2'
  | 'faq.q1' | 'faq.a1'
  | 'faq.q2' | 'faq.a2'
  | 'faq.q3' | 'faq.a3'
  | 'faq.q4' | 'faq.a4'
  | 'faq.q5' | 'faq.a5'
  // CtaSection
  | 'cta.tag' | 'cta.title.line1' | 'cta.title.line2'
  | 'cta.subtitle'
  | 'cta.cta.audit' | 'cta.cta.email'
  // Footer
  | 'footer.brand.desc'
  | 'footer.nav.title'
  | 'footer.nav.services' | 'footer.nav.process' | 'footer.nav.work' | 'footer.nav.pricing' | 'footer.nav.faq'
  | 'footer.contact.title'
  | 'footer.contact.whatsapp' | 'footer.contact.email' | 'footer.contact.login'
  | 'footer.copyright' | 'footer.tagline'
  // FloatingWhatsApp
  | 'whatsapp.label'
  // LoginPage
  | 'login.title' | 'login.subtitle'
  | 'login.email.label' | 'login.email.placeholder'
  | 'login.password.label' | 'login.password.placeholder'
  | 'login.submit' | 'login.submitting'
  | 'login.noAccount' | 'login.createOne'
  | 'login.backHome' | 'login.error'
  // RegisterPage
  | 'register.title' | 'register.subtitle'
  | 'register.name.label' | 'register.name.placeholder'
  | 'register.email.label' | 'register.email.placeholder'
  | 'register.password.label' | 'register.password.placeholder'
  | 'register.business.label' | 'register.business.placeholder'
  | 'register.business.optional'
  | 'register.submit' | 'register.submitting'
  | 'register.hasAccount' | 'register.signIn'
  | 'register.backHome' | 'register.error'
  // ProtectedRoute
  | 'loading'
  // Sidebar
  | 'sidebar.overview' | 'sidebar.chat' | 'sidebar.contacts'
  | 'sidebar.appointments' | 'sidebar.knowledge' | 'sidebar.billing' | 'sidebar.settings'
  // Topbar
  | 'topbar.plan.pro' | 'topbar.plan.starter'
  | 'topbar.logout'
  // LanguageToggle
  | 'lang.en' | 'lang.pt';

const en: Record<TranslationKey, string> = {
  // Nav
  'nav.services': 'Services',
  'nav.process': 'Process',
  'nav.work': 'Work',
  'nav.pricing': 'Pricing',
  'nav.contact': 'Contact',
  'nav.login': 'Log in',
  'nav.letsTalk': "Let's talk",

  // Hero
  'hero.terminal.boot': 'booting victor.ai_os…',
  'hero.terminal.orchestrated': '12 AI tools orchestrated',
  'hero.terminal.online': 'automation engine: online',
  'hero.terminal.ready': 'system online · ready',
  'hero.badge.claude': 'Claude Code',
  'hero.badge.make': 'Make · n8n · Zapier',
  'hero.badge.multiagent': 'Multi-agent',
  'hero.title.line1': 'Your business,',
  'hero.title.line2': 'on autopilot.',
  'hero.subtitle': "I'm Victor Ads. I design AI systems and automations that handle the repetitive work — so a one-person business runs like a team of ten.",
  'hero.cta.audit': 'Book a free audit',
  'hero.cta.seeWork': 'See what I build',
  'hero.pill.wf': 'Workflow Automation',
  'hero.pill.chatbots': 'AI Chatbots',
  'hero.pill.content': 'Content at Scale',

  // TrustMarquee
  'trust.label': 'Built on a best-in-class AI & automation stack',

  // Services
  'services.tag': 'What I build',
  'services.title.line1': 'AI systems that run',
  'services.title.line2': 'your business for you',
  'services.card1.title': 'Workflow Automation',
  'services.card1.desc': 'Custom pipelines on Make, n8n and Zapier that connect your tools and erase repetitive manual work — running 24/7 without you.',
  'services.card2.title': 'AI Chatbots',
  'services.card2.desc': 'Smart assistants on WhatsApp & Instagram that qualify leads and book meetings.',
  'services.card3.title': 'Content at Scale',
  'services.card3.desc': 'Dozens of on-brand posts, scripts and articles generated in minutes.',
  'services.card4.title': 'Data & Insights',
  'services.card4.desc': 'AI reads your reports, transcribes calls and turns noise into action plans.',
  'services.card5.title': 'Voice & Video',
  'services.card5.desc': 'Realistic voiceovers, AI avatars and auto-cut shorts from long content.',

  // Process
  'process.tag': 'The process',
  'process.title.line1': 'From chaos to',
  'process.title.line2': 'autopilot',
  'process.step1.title': 'Map the bottleneck',
  'process.step1.desc': 'We audit your day and find the repetitive, time-draining tasks that AI and automation can eliminate.',
  'process.step2.title': 'Build the system',
  'process.step2.desc': 'I design and wire a custom AI workflow — connecting your tools into one machine that runs on autopilot.',
  'process.step3.title': 'Ship & scale',
  'process.step3.desc': 'It goes live, I monitor and refine it, and you reclaim hours every week while output goes up.',
  'process.term.init': 'victor init automation --client "you"',
  'process.term.mapping': 'mapping repetitive tasks...',
  'process.term.identified': '7 workflows identified',
  'process.term.build': 'build --ai claude --connect make,n8n',
  'process.term.wiring': 'wiring tools together...',
  'process.term.deployed': 'system deployed · running 24/7',
  'process.term.result': 'you just got 40h / month back',

  // Sentinel
  'sentinel.tag': 'The engine',
  'sentinel.title.line1': 'One operator.',
  'sentinel.title.line2': 'Infinite leverage.',
  'sentinel.stat1': 'Saved per month, per client',
  'sentinel.stat2': 'AI tools orchestrated',
  'sentinel.stat3': 'Tasks fully automated',
  'sentinel.stat4': 'Systems running live',

  // Portfolio
  'portfolio.tag': 'Selected work',
  'portfolio.title.line1': 'Case studies,',
  'portfolio.title.line2': 'coming soon',
  'portfolio.desc': "Real systems I've shipped will live here. The slots are ready — the results are on the way.",
  'portfolio.cat.automation': 'Automation',
  'portfolio.cat.chatbot': 'AI Chatbot',
  'portfolio.cat.content': 'Content System',
  'portfolio.comingSoon': 'Project coming soon',

  // Pricing
  'pricing.tag': 'Pricing',
  'pricing.title.line1': 'Invest once,',
  'pricing.title.line2': 'save forever',
  'pricing.toggle.retainer': 'Monthly retainer',
  'pricing.toggle.project': 'One-off project',
  'pricing.plan1.name': 'Starter',
  'pricing.plan1.tagline': 'One workflow, fully automated',
  'pricing.plan2.name': 'Growth System',
  'pricing.plan2.tagline': 'A full AI operation for your business',
  'pricing.plan3.name': 'Partner',
  'pricing.plan3.tagline': 'I become your automation team',
  'pricing.feature1.plan1': '1 automation built',
  'pricing.feature2.plan1': 'Up to 3 tools connected',
  'pricing.feature3.plan1': 'Documentation included',
  'pricing.feature4.plan1': '14 days of support',
  'pricing.feature1.plan2': 'Up to 5 automations',
  'pricing.feature2.plan2': 'AI chatbot setup',
  'pricing.feature3.plan2': 'Content generation flow',
  'pricing.feature4.plan2': 'Monitoring & tweaks',
  'pricing.feature5.plan2': 'Priority support',
  'pricing.feature1.plan3': 'Unlimited automations',
  'pricing.feature2.plan3': 'Dedicated strategy calls',
  'pricing.feature3.plan3': 'Custom AI integrations',
  'pricing.feature4.plan3': 'Same-day support',
  'pricing.feature5.plan3': 'Quarterly roadmap',
  'pricing.popular': 'Most popular',
  'pricing.perMonth': '/mo',
  'pricing.once': ' once',
  'pricing.custom': 'Custom',
  'pricing.cta': 'Get started',

  // FAQ
  'faq.tag': 'FAQ',
  'faq.title.line1': 'Questions,',
  'faq.title.line2': 'answered',
  'faq.q1': 'Do I need to be technical to work with you?',
  'faq.a1': 'Not at all. You bring the problem — "I waste hours doing X" — and I design the system. You just press go and watch the manual work disappear.',
  'faq.q2': 'Which tools do you build on?',
  'faq.a2': 'Make, n8n and Zapier for automation; GPT, Claude and Gemini for intelligence; ManyChat for messaging; ElevenLabs, HeyGen and Midjourney for media. I pick the right stack for your case — no lock-in.',
  'faq.q3': 'How long does a project take?',
  'faq.a3': 'A single automation usually ships in a few days. A full Growth System takes 1–3 weeks depending on complexity. You see progress the whole way.',
  'faq.q4': 'What happens after it goes live?',
  'faq.a4': 'On a retainer I monitor, maintain and keep improving your systems. On a one-off project you get documentation and a support window so it keeps running smoothly.',
  'faq.q5': 'Is my data safe?',
  'faq.a5': 'Yes. I work within your own accounts and tools, follow least-privilege access, and never sell or repurpose your data. You stay in full control.',

  // CTA
  'cta.tag': "Let's build",
  'cta.title.line1': 'Stop doing what',
  'cta.title.line2': 'AI can do for you.',
  'cta.subtitle': "Tell me where your time disappears. I'll design the system that gives it back.",
  'cta.cta.audit': 'Book a free audit',
  'cta.cta.email': 'Send a message',

  // Footer
  'footer.brand.desc': 'AI systems & automation for one-person businesses. I build the machine — you run the business.',
  'footer.nav.title': 'Navigate',
  'footer.nav.services': 'Services',
  'footer.nav.process': 'Process',
  'footer.nav.work': 'Work',
  'footer.nav.pricing': 'Pricing',
  'footer.nav.faq': 'FAQ',
  'footer.contact.title': 'Get in touch',
  'footer.contact.whatsapp': 'WhatsApp · {phone}',
  'footer.contact.email': 'Email',
  'footer.contact.login': 'Client login',
  'footer.copyright': '© 2026 Victor Ads. All rights reserved.',
  'footer.tagline': 'Built with AI, shipped by a human.',

  // WhatsApp
  'whatsapp.label': 'Fala comigo 👋',

  // Login
  'login.title': 'Victor Ads',
  'login.subtitle': 'Sign in to your dashboard',
  'login.email.label': 'Email',
  'login.email.placeholder': 'you@example.com',
  'login.password.label': 'Password',
  'login.password.placeholder': '••••••••',
  'login.submit': 'Sign in',
  'login.submitting': 'Signing in...',
  'login.noAccount': "Don't have an account?",
  'login.createOne': 'Create one',
  'login.backHome': '← Back to home',
  'login.error': 'Login failed',

  // Register
  'register.title': 'Victor Ads',
  'register.subtitle': 'Create your account',
  'register.name.label': 'Full Name',
  'register.name.placeholder': 'Victor Borsari',
  'register.email.label': 'Email',
  'register.email.placeholder': 'you@example.com',
  'register.password.label': 'Password',
  'register.password.placeholder': 'Min 8 characters',
  'register.business.label': 'Business Name',
  'register.business.placeholder': 'Clínica Sorriso',
  'register.business.optional': '(optional)',
  'register.submit': 'Create account',
  'register.submitting': 'Creating account...',
  'register.hasAccount': 'Already have an account?',
  'register.signIn': 'Sign in',
  'register.backHome': '← Back to home',
  'register.error': 'Registration failed',

  // Shared
  'loading': 'Loading...',

  // Sidebar
  'sidebar.overview': 'Overview',
  'sidebar.chat': 'Chat',
  'sidebar.contacts': 'Contacts',
  'sidebar.appointments': 'Appointments',
  'sidebar.knowledge': 'Knowledge Base',
  'sidebar.billing': 'Billing',
  'sidebar.settings': 'Settings',

  // Topbar
  'topbar.plan.pro': 'Pro Plan',
  'topbar.plan.starter': 'Starter Plan',
  'topbar.logout': 'Logout',

  // Language
  'lang.en': 'EN',
  'lang.pt': 'PT',
};

const pt: Record<TranslationKey, string> = {
  // Nav
  'nav.services': 'Serviços',
  'nav.process': 'Processo',
  'nav.work': 'Trabalhos',
  'nav.pricing': 'Preços',
  'nav.contact': 'Contato',
  'nav.login': 'Entrar',
  'nav.letsTalk': 'Vamos conversar',

  // Hero
  'hero.terminal.boot': 'iniciando victor.ai_os…',
  'hero.terminal.orchestrated': '12 ferramentas de IA orquestradas',
  'hero.terminal.online': 'motor de automação: online',
  'hero.terminal.ready': 'sistema online · pronto',
  'hero.badge.claude': 'Claude Code',
  'hero.badge.make': 'Make · n8n · Zapier',
  'hero.badge.multiagent': 'Multi-agente',
  'hero.title.line1': 'Seu negócio,',
  'hero.title.line2': 'no piloto automático.',
  'hero.subtitle': 'Sou Victor Ads. Projeto sistemas de IA e automações que cuidam do trabalho repetitivo — para que um negócio de uma pessoa só funcione como um time de dez.',
  'hero.cta.audit': 'Agende uma consultoria grátis',
  'hero.cta.seeWork': 'Veja o que eu construo',
  'hero.pill.wf': 'Automação de Fluxos',
  'hero.pill.chatbots': 'Chatbots com IA',
  'hero.pill.content': 'Conteúdo em Escala',

  // TrustMarquee
  'trust.label': 'Construído com o melhor stack de IA & automação',

  // Services
  'services.tag': 'O que eu construo',
  'services.title.line1': 'Sistemas de IA que rodam',
  'services.title.line2': 'seu negócio por você',
  'services.card1.title': 'Automação de Fluxos',
  'services.card1.desc': 'Pipelines personalizados no Make, n8n e Zapier que conectam suas ferramentas e eliminam trabalho manual repetitivo — funcionando 24/7 sem você.',
  'services.card2.title': 'Chatbots com IA',
  'services.card2.desc': 'Assistentes inteligentes no WhatsApp e Instagram que qualificam leads e agendam reuniões.',
  'services.card3.title': 'Conteúdo em Escala',
  'services.card3.desc': 'Dezenas de posts, roteiros e artigos alinhados à sua marca gerados em minutos.',
  'services.card4.title': 'Dados & Insights',
  'services.card4.desc': 'IA lê seus relatórios, transcreve chamadas e transforma ruído em planos de ação.',
  'services.card5.title': 'Voz & Vídeo',
  'services.card5.desc': 'Narrações realistas, avatares com IA e cortes automáticos de vídeos longos.',

  // Process
  'process.tag': 'O processo',
  'process.title.line1': 'Do caos ao',
  'process.title.line2': 'piloto automático',
  'process.step1.title': 'Mapeie o gargalo',
  'process.step1.desc': 'Auditamos seu dia e encontramos as tarefas repetitivas que a IA e a automação podem eliminar.',
  'process.step2.title': 'Construa o sistema',
  'process.step2.desc': 'Projeto e conecto um fluxo de IA personalizado — unindo suas ferramentas em uma máquina que roda no piloto automático.',
  'process.step3.title': 'Lance & evolua',
  'process.step3.desc': 'Entra no ar, eu monitoro e refino, e você recupera horas toda semana enquanto a produção aumenta.',
  'process.term.init': 'victor init automacao --cliente "você"',
  'process.term.mapping': 'mapeando tarefas repetitivas...',
  'process.term.identified': '7 fluxos identificados',
  'process.term.build': 'build --ia claude --conectar make,n8n',
  'process.term.wiring': 'conectando ferramentas...',
  'process.term.deployed': 'sistema implantado · rodando 24/7',
  'process.term.result': 'você acabou de recuperar 40h / mês',

  // Sentinel
  'sentinel.tag': 'O motor',
  'sentinel.title.line1': 'Um operador.',
  'sentinel.title.line2': 'Alavancagem infinita.',
  'sentinel.stat1': 'Horas economizadas por mês, por cliente',
  'sentinel.stat2': 'Ferramentas de IA orquestradas',
  'sentinel.stat3': 'Tarefas totalmente automatizadas',
  'sentinel.stat4': 'Sistemas rodando ao vivo',

  // Portfolio
  'portfolio.tag': 'Trabalhos selecionados',
  'portfolio.title.line1': 'Estudos de caso,',
  'portfolio.title.line2': 'em breve',
  'portfolio.desc': 'Os sistemas reais que entreguei vão ficar aqui. As vagas estão prontas — os resultados estão a caminho.',
  'portfolio.cat.automation': 'Automação',
  'portfolio.cat.chatbot': 'Chatbot com IA',
  'portfolio.cat.content': 'Sistema de Conteúdo',
  'portfolio.comingSoon': 'Projeto em breve',

  // Pricing
  'pricing.tag': 'Preços',
  'pricing.title.line1': 'Invista uma vez,',
  'pricing.title.line2': 'economize para sempre',
  'pricing.toggle.retainer': 'Mensalidade',
  'pricing.toggle.project': 'Projeto único',
  'pricing.plan1.name': 'Inicial',
  'pricing.plan1.tagline': 'Um fluxo, totalmente automatizado',
  'pricing.plan2.name': 'Sistema de Crescimento',
  'pricing.plan2.tagline': 'Uma operação completa de IA para seu negócio',
  'pricing.plan3.name': 'Parceiro',
  'pricing.plan3.tagline': 'Viro seu time de automação',
  'pricing.feature1.plan1': '1 automação construída',
  'pricing.feature2.plan1': 'Até 3 ferramentas conectadas',
  'pricing.feature3.plan1': 'Documentação inclusa',
  'pricing.feature4.plan1': '14 dias de suporte',
  'pricing.feature1.plan2': 'Até 5 automações',
  'pricing.feature2.plan2': 'Configuração de chatbot com IA',
  'pricing.feature3.plan2': 'Fluxo de geração de conteúdo',
  'pricing.feature4.plan2': 'Monitoramento e ajustes',
  'pricing.feature5.plan2': 'Suporte prioritário',
  'pricing.feature1.plan3': 'Automações ilimitadas',
  'pricing.feature2.plan3': 'Sessões de estratégia dedicadas',
  'pricing.feature3.plan3': 'Integrações personalizadas de IA',
  'pricing.feature4.plan3': 'Suporte no mesmo dia',
  'pricing.feature5.plan3': 'Roadmap trimestral',
  'pricing.popular': 'Mais popular',
  'pricing.perMonth': '/mês',
  'pricing.once': ' única',
  'pricing.custom': 'Personalizado',
  'pricing.cta': 'Começar',

  // FAQ
  'faq.tag': 'FAQ',
  'faq.title.line1': 'Perguntas,',
  'faq.title.line2': 'respondidas',
  'faq.q1': 'Preciso ser técnico para trabalhar com você?',
  'faq.a1': 'De jeito nenhum. Você traz o problema — "perco horas fazendo X" — e eu projeto o sistema. Você só aperta o play e vê o trabalho manual desaparecer.',
  'faq.q2': 'Com quais ferramentas você trabalha?',
  'faq.a2': 'Make, n8n e Zapier para automação; GPT, Claude e Gemini para inteligência; ManyChat para mensagens; ElevenLabs, HeyGen e Midjourney para mídia. Escolho o stack certo para o seu caso — sem dependência.',
  'faq.q3': 'Quanto tempo leva um projeto?',
  'faq.a3': 'Uma automação simples geralmente fica pronta em alguns dias. Um Sistema de Crescimento completo leva de 1 a 3 semanas, dependendo da complexidade. Você vê o progresso o tempo todo.',
  'faq.q4': 'O que acontece depois que o sistema entra no ar?',
  'faq.a4': 'No plano mensal, eu monitoro, mantenho e continuo melhorando seus sistemas. Em um projeto único, você recebe documentação e uma janela de suporte para tudo funcionar perfeitamente.',
  'faq.q5': 'Meus dados estão seguros?',
  'faq.a5': 'Sim. Trabalho dentro das suas próprias contas e ferramentas, sigo o princípio do menor privilégio, e nunca vendo ou reaproveito seus dados. Você mantém o controle total.',

  // CTA
  'cta.tag': 'Vamos construir',
  'cta.title.line1': 'Pare de fazer o que',
  'cta.title.line2': 'a IA pode fazer por você.',
  'cta.subtitle': 'Me diga onde seu tempo desaparece. Vou projetar o sistema que devolve ele pra você.',
  'cta.cta.audit': 'Agende uma consultoria grátis',
  'cta.cta.email': 'Enviar mensagem',

  // Footer
  'footer.brand.desc': 'Sistemas de IA e automação para negócios de uma pessoa só. Eu construo a máquina — você toca o negócio.',
  'footer.nav.title': 'Navegue',
  'footer.nav.services': 'Serviços',
  'footer.nav.process': 'Processo',
  'footer.nav.work': 'Trabalhos',
  'footer.nav.pricing': 'Preços',
  'footer.nav.faq': 'FAQ',
  'footer.contact.title': 'Contato',
  'footer.contact.whatsapp': 'WhatsApp · {phone}',
  'footer.contact.email': 'Email',
  'footer.contact.login': 'Login do cliente',
  'footer.copyright': '© 2026 Victor Ads. Todos os direitos reservados.',
  'footer.tagline': 'Construído com IA, entregue por um humano.',

  // WhatsApp
  'whatsapp.label': 'Fala comigo 👋',

  // Login
  'login.title': 'Victor Ads',
  'login.subtitle': 'Entrar no seu painel',
  'login.email.label': 'Email',
  'login.email.placeholder': 'voce@exemplo.com',
  'login.password.label': 'Senha',
  'login.password.placeholder': '••••••••',
  'login.submit': 'Entrar',
  'login.submitting': 'Entrando...',
  'login.noAccount': 'Não tem uma conta?',
  'login.createOne': 'Criar conta',
  'login.backHome': '← Voltar ao início',
  'login.error': 'Falha ao entrar',

  // Register
  'register.title': 'Victor Ads',
  'register.subtitle': 'Criar sua conta',
  'register.name.label': 'Nome Completo',
  'register.name.placeholder': 'Victor Borsari',
  'register.email.label': 'Email',
  'register.email.placeholder': 'voce@exemplo.com',
  'register.password.label': 'Senha',
  'register.password.placeholder': 'Mínimo 8 caracteres',
  'register.business.label': 'Nome do Negócio',
  'register.business.placeholder': 'Clínica Sorriso',
  'register.business.optional': '(opcional)',
  'register.submit': 'Criar conta',
  'register.submitting': 'Criando conta...',
  'register.hasAccount': 'Já tem uma conta?',
  'register.signIn': 'Entrar',
  'register.backHome': '← Voltar ao início',
  'register.error': 'Falha ao cadastrar',

  // Shared
  'loading': 'Carregando...',

  // Sidebar
  'sidebar.overview': 'Visão Geral',
  'sidebar.chat': 'Chat',
  'sidebar.contacts': 'Contatos',
  'sidebar.appointments': 'Agendamentos',
  'sidebar.knowledge': 'Base de Conhecimento',
  'sidebar.billing': 'Financeiro',
  'sidebar.settings': 'Configurações',

  // Topbar
  'topbar.plan.pro': 'Plano Pro',
  'topbar.plan.starter': 'Plano Inicial',
  'topbar.logout': 'Sair',

  // Language
  'lang.en': 'EN',
  'lang.pt': 'PT',
};

export const translations = { en, pt };
