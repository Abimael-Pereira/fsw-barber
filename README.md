# 💈 FSW Barber

**Plataforma de agendamento de serviços para barbearias**, com suporte a múltiplas unidades, autenticação Google e interface para reservas.

## 🧩 Funcionalidades

- Múltiplas barbearias e serviços
- Login com conta Google
- Agendamento por data e horário
- Cancelamento de reservas
- Painel do cliente
- Backend com PostgreSQL + Prisma

## 🛠️ Tecnologias utilizadas

- **Next.js** – SSR + SSG
- **Tailwind CSS** – Estilização rápida e eficiente
- **PostgreSQL** – Banco de dados relacional
- **Prisma ORM** – Acesso moderno ao banco de dados
- **NextAuth** – Autenticação com Google
- **Docker (em desenvolvimento)**

## 💻 Instalação local

```bash
git clone https://github.com/Abimael-Pereira/fsw-barber.git
cd fsw-barber

# Instale as dependencias

npm install

# Configure o .env utilizando o .env.example como referência

# Suba o docker-compose e faça o migrate do prisma

npx prisma migrate dev

# Faça a seed do banco de dados

npx prisma db seed

# Inicialize a aplicação

npm run dev
