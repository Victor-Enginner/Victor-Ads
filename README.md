# Site Monstro - Portfolio Digital

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
git clone https://github.com/seu-usuario/site-monstro.git
cd site-monstro
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
# Copie o arquivo de exemplo
cp backend/.env.example backend/.env

# Edite o arquivo .env com suas configurações
```

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
site-monstro/
├── src/                 # Código fonte React
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── lib/            # Utilitários e API
│   └── stores/         # Estado global (Zustand)
├── backend/            # API Backend
│   └── src/
│       ├── config/     # Configurações
│       ├── middleware/ # Middlewares
│       ├── routes/     # Rotas da API
│       └── utils/      # Utilitários
├── database/           # Schema SQL
└── public/            # Arquivos estáticos
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Conecte este repositório ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. O Vercel fará deploy automático a cada push

### Outras Plataformas
- Netlify
- GitHub Pages
- Railway
- Render

## 🔐 Variáveis de Ambiente

Veja o arquivo `backend/.env.example` para todas as variáveis necessárias.

## 📝 Licença

Este projeto é privado e pertence ao proprietário.

## 👤 Autor

Seu Nome - Portfolio Digital
