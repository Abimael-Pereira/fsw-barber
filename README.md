# 💈 FSW Barber

<div align="center">

![FSW Barber Logo](./public/logo.png)

**Sistema moderno de agendamento para barbearias com interface responsiva**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)

</div>

---

## 📋 Sobre o Projeto

O **FSW Barber** é uma aplicação web moderna para agendamento de serviços em barbearias, oferecendo uma experiência completa tanto para clientes quanto para estabelecimentos. Desenvolvido com as mais modernas tecnologias do ecossistema React/Next.js.

### 🎯 Principais Diferenciais

- 💈 **Múltiplas Barbearias**: Sistema multi-tenant com suporte a várias unidades
- 🔐 **Autenticação Simplificada**: Login rápido com Google OAuth
- 📱 **Design Responsivo**: Interface adaptável para desktop e mobile
- ⏰ **Agendamento Inteligente**: Sistema de reservas por data e horário
- 🎨 **Interface Moderna**: Design clean e experiência de usuário otimizada
- 🛡️ **Type Safety**: 100% TypeScript com validação Zod

---

## ✨ Funcionalidades

### 🏠 Dashboard Principal

- **Busca Inteligente**: Encontre barbearias por nome ou localização
- **Barbearias em Destaque**: Carousel com estabelecimentos recomendados
- **Serviços Populares**: Lista dos serviços mais procurados
- **Navegação Rápida**: Acesso direto às principais funcionalidades

### 💈 Catálogo de Barbearias

- **Listagem Completa**: Visualize todas as barbearias disponíveis
- **Informações Detalhadas**: Endereço, avaliações e horário de funcionamento
- **Galeria de Imagens**: Fotos dos estabelecimentos e ambientes
- **Sistema de Avaliações**: Ratings e comentários dos clientes

### 📅 Sistema de Agendamentos

- **Seleção de Serviços**: Corte, barba, hidratação, massagem e mais
- **Calendário Interativo**: Escolha data e horário disponível
- **Resumo do Agendamento**: Confirmação com todos os detalhes
- **Gestão de Reservas**: Visualize e cancele agendamentos

### 👤 Área do Cliente

- **Perfil Personalizado**: Gerenciamento de dados pessoais
- **Histórico de Serviços**: Acompanhe todos os agendamentos
- **Agendamentos Ativos**: Visualize reservas confirmadas
- **Serviços Concluídos**: Histórico completo de atendimentos

---

## 🏗️ Tecnologias

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Componentes**: Radix UI primitives
- **Formulários**: React Hook Form + Zod
- **Calendário**: React Day Picker
- **Carrossel**: Embla Carousel
- **Notificações**: Sonner
- **Ícones**: Lucide React

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes + Server Actions
- **Validação**: Zod schemas
- **ORM**: Prisma
- **Banco**: PostgreSQL
- **Autenticação**: NextAuth.js

### Integrações

- **Autenticação**: Google OAuth via NextAuth.js
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Deploy**: Vercel (frontend) + NeonDB
- **Containerização**: Docker + Docker Compose

### Qualidade & Performance

- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Tipagem**: TypeScript
- **Performance**: Next.js optimizations + Vercel Speed Insights
- **SEO**: Meta tags otimizadas e estrutura semântica

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL (ou Docker)
- Conta Google (para OAuth)

### 1. Clone o repositório

```bash
git clone https://github.com/Abimael-Pereira/fsw-barber.git
cd fsw-barber
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/fsw_barber"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Configure o banco de dados

#### Opção 1: Docker (Recomendado)

```bash
# Iniciar PostgreSQL via Docker
docker-compose up -d

# Executar migrações
npx prisma migrate dev

# Seed do banco (dados iniciais)
npx prisma db seed
```

#### Opção 2: PostgreSQL Local

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Seed do banco
npx prisma db seed

# (Opcional) Visualizar banco
npx prisma studio
```

### 5. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📁 Estrutura do Projeto

```
fsw-barber/
├── app/                          # App Router (Next.js 14)
│   ├── _actions/                 # Server Actions
│   │   ├── create-booking.ts     # Criar agendamento
│   │   ├── delete-booking.ts     # Cancelar agendamento
│   │   └── get-bookings.ts       # Listar agendamentos
│   ├── _components/              # Componentes reutilizáveis
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── barbershop-item.tsx   # Card de barbearia
│   │   ├── booking-item.tsx      # Item de agendamento
│   │   ├── service-item.tsx      # Card de serviço
│   │   └── ...                   # Outros componentes
│   ├── _constants/               # Constantes da aplicação
│   ├── _data/                    # Data fetching functions
│   ├── _hooks/                   # Custom hooks
│   │   ├── useBookings.ts        # Hook de agendamentos
│   │   └── useIsDesktop.ts       # Hook de responsividade
│   ├── _lib/                     # Utilitários
│   │   ├── auth.ts               # Configuração NextAuth
│   │   ├── prisma.ts             # Cliente Prisma
│   │   └── utils.ts              # Funções utilitárias
│   ├── _providers/               # Context providers
│   ├── _schemas/                 # Schemas de validação Zod
│   ├── _types/                   # Tipos TypeScript
│   ├── api/auth/[...nextauth]/   # Rotas de autenticação
│   ├── barbershops/              # Páginas de barbearias
│   │   ├── _components/          # Componentes específicos
│   │   └── [id]/                 # Página dinâmica de barbearia
│   ├── bookings/                 # Página de agendamentos
│   │   └── _components/          # Componentes específicos
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página inicial
├── prisma/                       # Configuração do banco
│   ├── migrations/               # Migrações do banco
│   ├── schema.prisma             # Schema do banco
│   └── seed.ts                   # Dados iniciais
├── public/                       # Assets estáticos
└── ...configs                   # Configurações (tailwind, next, etc.)
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build de produção
npm run start        # Inicia servidor de produção

# Qualidade
npm run lint         # Executar ESLint

# Banco de dados
npx prisma generate  # Gerar cliente Prisma
npx prisma migrate   # Executar migrações
npx prisma db seed   # Popular banco com dados iniciais
npx prisma studio    # Interface visual do banco

# Docker
docker-compose up -d # Iniciar PostgreSQL
docker-compose down  # Parar containers
```

---

## 🎨 Screenshots

<div align="center">

### Página Inicial

![Homepage](./docs/homepage.png)

### Detalhes da Barbearia

![Barbershop Details](./docs/barbershop-details.png)

### Sistema de Agendamento

![Booking System](./docs/booking-system.png)

### Área do Cliente

![Client Area](./docs/client-area.png)

</div>

---

## 🗄️ Modelo de Dados

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  image         String?
  bookings      Booking[]
}

model BarberShop {
  id          String               @id @default(cuid())
  name        String
  address     String
  imageUrl    String
  description String
  services    BarberShopService[]
  bookings    Booking[]
}

model BarberShopService {
  id           String     @id @default(cuid())
  name         String
  description  String
  imageUrl     String
  price        Decimal
  barbershop   BarberShop @relation(fields: [barbershopId], references: [id])
  barbershopId String
  bookings     Booking[]
}

model Booking {
  id         String            @id @default(cuid())
  userId     String
  user       User              @relation(fields: [userId], references: [id])
  serviceId  String
  service    BarberShopService @relation(fields: [serviceId], references: [id])
  date       DateTime
  barbershop BarberShop        @relation(fields: [barbershopId], references: [id])
  barbershopId String
  createdAt  DateTime          @default(now())
}
```

---

## ❓ FAQ

<details>
<summary><strong>Como configurar a autenticação Google?</strong></summary>

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Google+ API**
4. Vá em **Credenciais** → **Criar credenciais** → **ID do cliente OAuth**
5. Configure as URLs autorizadas:
   - **Origens JavaScript**: `http://localhost:3000`
   - **URIs de redirecionamento**: `http://localhost:3000/api/auth/callback/google`
6. Copie o **Client ID** e **Client Secret** para o `.env`

</details>

<details>
<summary><strong>O projeto funciona sem Docker?</strong></summary>

Sim! O Docker é opcional. Você pode:

- **Com Docker**: Use `docker-compose up -d` para PostgreSQL
- **Sem Docker**: Instale PostgreSQL localmente e configure a `DATABASE_URL`

O projeto se adapta a qualquer configuração de banco PostgreSQL.

</details>

<details>
<summary><strong>Como adicionar novas barbearias?</strong></summary>

Execute o seed do Prisma para popular com dados de exemplo:

```bash
npx prisma db seed
```

Ou use o Prisma Studio para adicionar manualmente:

```bash
npx prisma studio
```

Futuramente, haverá um painel administrativo para isso.

</details>

<details>
<summary><strong>Este é um projeto real ou apenas para portfólio?</strong></summary>

Este é um **projeto acadêmico/portfólio** desenvolvido para demonstrar habilidades em:

- Desenvolvimento Full Stack com Next.js 14
- Integração com APIs de autenticação (NextAuth.js)
- Arquitetura escalável e boas práticas de código
- UI/UX moderna e responsiva
- Gestão de estado e validações robustas
- Banco de dados relacional com Prisma ORM
</details>

---

## 👨‍💻 Autor

**Abimael Pereira**

- GitHub: [@Abimael-Pereira](https://github.com/Abimael-Pereira)
- LinkedIn: [Abimael Pereira](https://www.linkedin.com/in/abimaelpereira)
- Email: abimael.spdev@gmail.com

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React de produção
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI modernos
- [Prisma](https://prisma.io/) - ORM type-safe para Node.js
- [NextAuth.js](https://next-auth.js.org/) - Autenticação para Next.js
- [Vercel](https://vercel.com/) - Plataforma de deploy e hospedagem
- [Radix UI](https://radix-ui.com/) - Primitivos de UI acessíveis
- [Lucide](https://lucide.dev/) - Biblioteca de ícones moderna

---

<div align="center">

**Desenvolvido com 💈 e ☕ por [Abimael Pereira](https://github.com/Abimael-Pereira)**

⭐ Se este projeto foi útil, considere dar uma estrela!

[![GitHub stars](https://img.shields.io/github/stars/Abimael-Pereira/fsw-barber?style=social)](https://github.com/Abimael-Pereira/fsw-barber)

</div>
