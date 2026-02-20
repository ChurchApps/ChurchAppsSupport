---
title: "Variáveis de Ambiente"
---

# Variáveis de Ambiente

<div class="article-intro">

Todo projeto ChurchApps usa um arquivo `.env` para configuração local. Cada projeto inclui um arquivo de exemplo que você copia e personaliza. Esta página cobre as variáveis de ambiente para APIs, aplicações web e aplicações móveis, incluindo como escolher entre alvos de API staging e local.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale os [pré-requisitos](./prerequisites) para seu projeto
- Clone o repositório do projeto em que deseja trabalhar
- Revise a [Visão Geral do Projeto](./project-overview) para entender quais módulos de API seu projeto precisa

</div>

## Padrão Geral

1. Procure por `dotenv.sample.txt` ou `.env.sample` na raiz do projeto.
2. Copie para `.env`.
3. Edite os valores conforme necessário.

```bash
# Exemplo para um projeto com .env.sample
cp .env.sample .env

# Exemplo para um projeto com dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nunca faça commit de arquivos `.env` no controle de versão.** Eles contêm segredos como credenciais de banco de dados, chaves de API e segredos JWT. Todos os projetos ChurchApps incluem `.env` no `.gitignore`, mas sempre verifique novamente antes de fazer commit.
:::

## Escolhendo um Alvo de API

A decisão mais importante é para onde seu frontend aponta para chamadas de API. Existem duas opções:

### Opção 1: APIs de Staging (Recomendado para Desenvolvimento Frontend)

Use o ambiente de staging compartilhado. Nenhuma configuração local de API ou banco de dados é necessária.

```bash
# Padrão de URL base
https://api.staging.churchapps.org/{module}

# Exemplos de URLs de módulos
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/content
https://api.staging.churchapps.org/giving
https://api.staging.churchapps.org/messaging
https://api.staging.churchapps.org/doing
```

### Opção 2: API Local

Execute o projeto Api na sua máquina. Requer MySQL 8.0+ com bancos de dados criados para cada módulo. Veja o guia de [configuração local da API](../api/local-setup).

```bash
# Padrão de URL base
http://localhost:8084/{module}

# Exemplos de URLs de módulos
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variáveis de Ambiente da API

O projeto principal **Api** (`.env.sample`) tem a maior configuração. Aqui estão as variáveis principais:

### Configurações Compartilhadas

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `ENVIRONMENT` | Ambiente de execução | `dev` |
| `SERVER_PORT` | Porta HTTP para o servidor de desenvolvimento local | `8084` |
| `ENCRYPTION_KEY` | Chave de criptografia de 192 bits para dados sensíveis | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Segredo para assinar JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Onde armazenar arquivos enviados (`disk` ou `s3`) | `disk` |
| `CORS_ORIGIN` | Origens CORS permitidas (`*` para dev local) | `*` |

### Conexões de Banco de Dados

Cada módulo da API tem seu próprio banco de dados MySQL e string de conexão:

| Variável | Banco de Dados |
|----------|----------------|
| `MEMBERSHIP_CONNECTION_STRING` | `mysql://root:password@localhost:3306/membership` |
| `ATTENDANCE_CONNECTION_STRING` | `mysql://root:password@localhost:3306/attendance` |
| `CONTENT_CONNECTION_STRING` | `mysql://root:password@localhost:3306/content` |
| `GIVING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/giving` |
| `MESSAGING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/messaging` |
| `DOING_CONNECTION_STRING` | `mysql://root:password@localhost:3306/doing` |

:::tip
Atualize `root:password` com suas credenciais reais do MySQL. Cada banco de dados deve ser criado antes de executar a API. Use `npm run initdb` para criar o esquema de todos os módulos, ou `npm run initdb:membership` para um único módulo.
:::

### Configurações de WebSocket

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SOCKET_PORT` | Porta para o servidor WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket para conexão dos clientes | `ws://localhost:8087` |

---

## Variáveis de Ambiente de Aplicações Web

### B1Admin (React + Vite)

Arquivo de exemplo: `.env.sample`

| Variável | Descrição | Exemplo (Staging) |
|----------|-----------|-------------------|
| `REACT_APP_STAGE` | Nome do ambiente | `demo` |
| `PORT` | Porta do servidor de desenvolvimento | `3101` |
| `REACT_APP_MEMBERSHIP_API` | URL da API de Membros | `https://api.staging.churchapps.org/membership` |
| `REACT_APP_ATTENDANCE_API` | URL da API de Presença | `https://api.staging.churchapps.org/attendance` |
| `REACT_APP_GIVING_API` | URL da API de Doações | `https://api.staging.churchapps.org/giving` |
| `REACT_APP_CONTENT_ROOT` | URL de entrega de conteúdo | `https://content.staging.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID do Google Analytics (opcional) | `UA-123456789-1` |

Para desenvolvimento local da API, descomente e use as variantes `localhost`:

```bash
REACT_APP_MEMBERSHIP_API=http://localhost:8084/membership
REACT_APP_ATTENDANCE_API=http://localhost:8084/attendance
REACT_APP_GIVING_API=http://localhost:8084/giving
REACT_APP_CONTENT_API=http://localhost:8084/content
REACT_APP_DOING_API=http://localhost:8084/doing
REACT_APP_MESSAGING_API=http://localhost:8084/messaging
```

### B1App (Next.js)

Arquivo de exemplo: `.env.sample`

| Variável | Descrição | Exemplo (Staging) |
|----------|-----------|-------------------|
| `NEXT_PUBLIC_MEMBERSHIP_API` | URL da API de Membros | `https://api.staging.churchapps.org/membership` |
| `NEXT_PUBLIC_ATTENDANCE_API` | URL da API de Presença | `https://api.staging.churchapps.org/attendance` |
| `NEXT_PUBLIC_GIVING_API` | URL da API de Doações | `https://api.staging.churchapps.org/giving` |
| `NEXT_PUBLIC_MESSAGING_API` | URL da API de Mensagens | `https://api.staging.churchapps.org/messaging` |
| `NEXT_PUBLIC_CONTENT_API` | URL da API de Conteúdo | `https://api.staging.churchapps.org/content` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de conteúdo | `https://staging.churchapps.org/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL base do ChurchApps | `https://staging.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID do Google Analytics (opcional) | `UA-123456789-1` |

:::info
O Next.js requer o prefixo `NEXT_PUBLIC_` para qualquer variável de ambiente que precise estar disponível no navegador. Variáveis apenas do servidor não precisam desse prefixo.
:::

### LessonsApp (Next.js)

Arquivo de exemplo: `dotenv.sample.txt`

| Variável | Descrição | Exemplo (Staging) |
|----------|-----------|-------------------|
| `STAGE` | Estágio do ambiente | `staging` |
| `NEXT_PUBLIC_LESSONS_API` | URL da API de Lições | `https://api.staging.lessons.church` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de conteúdo | `https://api.staging.lessons.church/content` |
| `NEXT_PUBLIC_CHURCH_APPS_URL` | URL base do ChurchApps | `https://staging.churchapps.org` |

---

## Variáveis de Ambiente de Aplicações Móveis

### B1Mobile (React Native / Expo)

Arquivo de exemplo: `dotenv.sample.txt`

| Variável | Descrição | Exemplo (Staging) |
|----------|-----------|-------------------|
| `STAGE` | Nome do ambiente | `dev` |
| `MEMBERSHIP_API` | URL da API de Membros | `https://api.staging.churchapps.org/membership` |
| `MESSAGING_API` | URL da API de Mensagens | `https://api.staging.churchapps.org/messaging` |
| `ATTENDANCE_API` | URL da API de Presença | `https://api.staging.churchapps.org/attendance` |
| `GIVING_API` | URL da API de Doações | `https://api.staging.churchapps.org/giving` |
| `DOING_API` | URL da API de Tarefas | `https://api.staging.churchapps.org/doing` |
| `CONTENT_API` | URL da API de Conteúdo | `https://api.churchapps.org/content` |
| `CONTENT_ROOT` | URL de entrega de conteúdo | `https://content.staging.churchapps.org` |
| `LESSONS_ROOT` | URL do site de lições | `https://staging.lessons.church` |

:::info
Aplicações móveis não usam o prefixo `REACT_APP_` ou `NEXT_PUBLIC_`. O acesso às variáveis de ambiente é gerenciado pela configuração do Expo.
:::

---

## Referência Rápida: Localização dos Arquivos de Exemplo

| Projeto | Arquivo de Exemplo |
|---------|-------------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
