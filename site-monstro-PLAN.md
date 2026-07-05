# PLANO MESTRE - SITE MONSTRO

## Status: EM EXECUÇÃO
**Início:** 2026-05-05
**Duração estimada:** 14 dias corridos
**Objetivo:** Transformar o protótipo atual em produção completa com todas as features críticas

---

## SPRINT 0 - FUNDAÇÃO (1 dia)
**Status:** 🚀 EM EXECUÇÃO

- [x] T0.1 - Validar e melhorar .env.example  
- [x] T0.2 - Instalar pino + swagger  
- [x] T0.3 - Criar logger estruturado  
- [ ] T0.4 - Documentar API com Swagger  
- [ ] T0.5 - Melhorar CORS e error handling  
- [ ] T0.6 - Adicionar Prettier + padrões de código  

---

## SPRINT 1 - ROTAS CRÍTICAS (2 dias)

- [ ] T1.1 - POST /api/conversations  
- [ ] T1.2 - GET /api/conversations  
- [ ] T1.3 - GET /api/conversations/:id/messages  
- [ ] T1.4 - POST /api/conversations/:id/messages  
- [ ] T1.5 - GET /api/appointments  
- [ ] T1.6 - POST /api/appointments  
- [ ] T1.7 - PATCH /api/appointments/:id  
- [ ] T1.8 - DELETE /api/appointments/:id  
- [ ] T1.9 - GET /api/documents  
- [ ] T1.10 - POST /api/documents  
- [ ] T1.11 - DELETE /api/documents/:id  

---

## SPRINT 2 - FRONTEND INTEGRAÇÃO (3 dias)

- [ ] T2.1 - Refatorar api.ts com interceptors  
- [ ] T2.2 - Sistema de notificações toast  
- [ ] T2.3 - Loading skeletons  
- [ ] T2.4 - ChatPage funcional  
- [ ] T2.5 - ContactsPage CRUD  
- [ ] T2.6 - AppointmentsPage CRUD  
- [ ] T2.7 - KnowledgeBasePage upload  

---

## SPRINT 3 - AI & AUTOMAÇÃO (2 dias)

- [ ] T3.1 - POST /api/chat (AI endpoint)  
- [ ] T3.2 - Integração OpenRouter  
- [ ] T3.3 - RAG retrieval para documentos  
- [ ] T3.4 - System prompts customizáveis  
- [ ] T3.5 - Context management (histórico)  
- [ ] T3.6 - Webhook WhatsApp inbound  

---

## SPRINT 4 - BILLING & ANALYTICS (2 dias)

- [ ] T4.1 - GET /api/subscriptions  
- [ ] T4.2 - POST /api/subscriptions/webhook  
- [ ] T4.3 - BillingPage com planos  
- [ ] T4.4 - Usage tracking middleware  
- [ ] T4.5 - Dashboard analytics  
- [ ] T4.6 - Rate limiting por plano  

---

## SPRINT 5 - TESTES & DEPLOY (2 dias)

- [ ] T5.1 - Testes backend (auth, contacts)  
- [ ] T5.2 - Testes e2e frontend  
- [ ] T5.3 - Dockerfiles  
- [ ] T5.4 - CI/CD GitHub Actions  
- [ ] T5.5 - Deploy staging  

---

## SPRINT 6 - POLISH & FINAL (1 dia)

- [ ] T6.1 - Landing page bilíngue (EN + PT)  
- [ ] T6.2 - SEO meta tags  
- [ ] T6.3 - Assets finais (logo, favicon)  
- [ ] T6.4 - Performance optimization  
- [ ] T6.5 - Bug fixes finais  
- [ ] T6.6 - Documentação de uso  

---

## CHECKLIST FINAL MPV
- [ ] Site bilíngue funcional  
- [ ] Auth (register/login/refresh)  
- [ ] CRUD contacts  
- [ ] CRUD appointments  
- [ ] Chat com AI  
- [ ] Knowledge base  
- [ ] Billing/subscriptions  
- [ ] Testes passando  
- [ ] Deploy em produção  

---

## RECURSOS NECESSÁRIOS

### APIs Externas
- [ ] OpenRouter API Key (AI)  
- [ ] WhatsApp Cloud API (Meta)  
- [ ] Mercado Pago (billing)  
- [ ] Google Calendar (opcional)  

### Design
- [ ] Logo Aurai AI (SVG)  
- [ ] Favicon otimizado  
- [ ] Screenshots dashboard  

### Copy (Bilíngue)
- [ ] [EN] Hero headline + subheadline  
- [ ] [PT-BR] Hero headline + subheadline  
- [ ] Features description (ambos)  
- [ ] Pricing tables (ambos)  
- [ ] FAQ (ambos)  
- [ ] Meta tags SEO  

---

## PRÓXIMO PASSO IMEDIATO
**Executar T0.3** - Criar logger estruturado em `backend/src/utils/logger.ts`