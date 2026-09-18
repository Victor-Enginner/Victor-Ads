# Victor AI - Portfolio Digital

Portfólio digital moderno construído com React, TypeScript e Vite. Este projeto inclui uma landing page profissional com sistema de dashboard para gerenciamento de contatos, agendamentos e chat.

## 🚀 Tecnologias

### Frontend
- **React 18.3.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool rápido e otimizado
- **TailwindCSS 4.1.4** - Framework CSS utilitário
- **React Router DOM 7.18.0** - Roteamento para aplicações React
- **Zustand 5.0.14** - Gerenciamento de estado
- **Motion 11.18.0** - Animações e transições
- **Lucide React 0.468.0** - Ícones modernos

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Backend tipado
- **Express** - Framework web (implícito nas rotas)

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/Victor-Enginner/Victor-Ads.git
cd Victor-Ads
```

2. Instale as dependências do frontend:
```bash
npm install
```

3. Instale as dependências do backend:
```bash
cd backend
npm install
```

4. Configure as variáveis de ambiente:
```bash
# Backend
cp backend/.env.example backend/.env
```

O frontend usa um `.env` próprio na raiz, com uma única variável:

```bash
VITE_API_URL=http://localhost:3001
```

Sem ela o cliente usa `http://localhost:3001` como padrão — o que significa que
um build publicado **sem** essa variável aponta para a máquina de quem abre o
site, e as telas de login e dashboard não funcionam.

5. Inicie o banco de dados (Windows PowerShell):
```powershell
.\start-db.ps1
```

6. Inicie o servidor de desenvolvimento:
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

## 🛠️ Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção

### Backend
- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Inicia servidor de produção

## 📁 Estrutura do Projeto

```
victor-ai/
├── src/                 # Código fonte React
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── hooks/          # Hooks customizados
│   ├── i18n/           # Traduções PT/EN e contexto de idioma
│   ├── lib/            # Utilitários e API
│   ├── types/          # Tipos compartilhados
│   └── stores/         # Estado global (Zustand)
├── backend/            # API Backend
│   └── src/
│       ├── config/     # Configurações
│       ├── middleware/ # Middlewares
│       ├── routes/     # Rotas da API
│       └── utils/      # Utilitários
├── database/           # Schema SQL
└── public/            # Arquivos estáticos (vídeo e poster do hero)
```

### Assets do hero

O fundo da landing page é servido pelo próprio domínio, não por CDN de
terceiro: `public/hero-background.mp4` (1920x1086, ~0,9 MB) e
`public/hero-poster.jpg`, que aparece enquanto o vídeo carrega ou caso o
navegador recuse o autoplay. Para trocar o clipe, reencode antes de commitar —
o original tinha 11 MB em 4K para um fundo que fica coberto por dois scrims:

```bash
ffmpeg -i entrada.mp4 -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart public/hero-background.mp4
ffmpeg -i entrada.mp4 -ss 1 -frames:v 1 -vf "scale=1920:-2" -q:v 4 public/hero-poster.jpg
```

### Animações

A landing page **não** tem regra `@media (prefers-reduced-motion: reduce)`, e
isso é intencional. Todas as animações de ambiente tinham uma, e o resultado em
um desktop com os efeitos de animação do Windows desligados era uma página
inteiramente parada. O que protege telefones é a query `max-width: 767px` em
`src/index.css` mais `pointer: coarse`.

## 🌐 Deploy

### Vercel (frontend)

No ar em <https://victor-ai-enginner.vercel.app>. Cada push na `main` dispara um
deploy automático.

**O backend não vai junto.** O `.vercelignore` exclui a pasta `backend/`, então
o que sobe é apenas o site estático — `/api/*` responde 404 no domínio
publicado. A API precisa ser hospedada à parte (Railway, Render, Fly) e o
endereço dela informado em `VITE_API_URL` no painel do Vercel.

Enquanto isso não for feito, a landing page funciona por completo, mas login,
registro e dashboard não — o cliente publicado aponta para `localhost:3001`.

## 🔐 Variáveis de Ambiente

Veja o arquivo `backend/.env.example` para todas as variáveis necessárias.

## 📝 Licença

Este projeto é privado e pertence ao proprietário.

## 👤 Autor

Victor - Victor AI
