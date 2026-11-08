---
title: "Variáveis de Ambiente"
description: "Configure arquivos .env para os projetos ChurchApps, escolha a API de demonstração compartilhada ou uma API local e preencha as variáveis para B1 Admin, B1.church, B1 Checkin e outros."
---

# Variáveis de Ambiente

<div class="article-intro">

Todos os projetos ChurchApps usam um arquivo `.env` para a configuração local. Cada projeto inclui um arquivo de exemplo que você copia e personaliza. Esta página aborda as variáveis de ambiente para APIs, aplicativos web e aplicativos móveis, incluindo como escolher entre os destinos de API de demonstração e local.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale os [pré-requisitos](./prerequisites.md) do seu projeto
- Clone o repositório do projeto em que você quer trabalhar
- Revise a [Visão Geral do Projeto](./project-overview.md) para entender quais módulos de API o seu projeto precisa

</div>

## Padrão Geral

1. Procure por `dotenv.sample.txt` ou `.env.sample` na raiz do projeto.
2. Copie-o para `.env`.
3. Edite os valores conforme necessário.

```bash
# Exemplo para um projeto com .env.sample
cp .env.sample .env

# Exemplo para um projeto com dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nunca envie arquivos `.env` para o controle de versão.** Eles contêm segredos como credenciais de banco de dados, chaves de API e segredos JWT. Todos os projetos ChurchApps incluem `.env` no `.gitignore`, mas sempre verifique novamente antes de fazer commit.
:::

## Escolhendo um Destino de API

A decisão mais importante é para onde o seu frontend aponta as chamadas de API. Há duas opções:

### Opção 1: APIs de Demonstração (Recomendada para Desenvolvimento de Frontend)

Use o ambiente de demonstração compartilhado. Não é necessário configurar API ou banco de dados local. Ele executa o código mais recente da branch `main`, e seus dados de exemplo são recarregados todas as noites.

```bash
# Padrão de URL base
https://api.demo.churchapps.org/{module}

# Exemplos de URLs de módulos
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
O ambiente de staging (`api.staging.churchapps.org`, `api.staging.lessons.church` e hosts relacionados) foi desativado. Alguns arquivos `.env` de exemplo ainda podem conter URLs de staging; substitua-as pelos valores de demonstração ou locais mostrados nesta página. Não existe uma API Lessons compartilhada de não produção -- execute o [LessonsApi](https://github.com/ChurchApps/LessonsApi) localmente (ele escuta na porta `8090`) quando precisar dela.
:::

### Opção 2: API Local

Execute o projeto Api na sua máquina. Requer MySQL 8.0+ com bancos de dados criados para cada módulo. Consulte o guia de [configuração local da API](../api/local-setup.md).

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

O projeto principal **Api** (`.env.sample`) tem a configuração mais extensa. Estas são as variáveis principais:

### Configurações Compartilhadas

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `ENVIRONMENT` | Ambiente de execução | `dev` |
| `SERVER_PORT` | Porta HTTP do servidor de desenvolvimento local | `8084` |
| `ENCRYPTION_KEY` | Chave de criptografia de 192 bits para dados sensíveis | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Segredo para assinar JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Onde armazenar os arquivos enviados (`disk` ou `s3`) | `disk` |
| `CORS_ORIGIN` | Origens CORS permitidas (`*` para desenvolvimento local) | `*` |

### Conexão com o Banco de Dados

Uma única URL base aponta a API para o MySQL. A API deriva um banco de dados por módulo (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) a partir dessa base.

| Variável | Exemplo |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Substitua `root:password` pelas suas credenciais reais do MySQL. Cada banco de dados por módulo deve existir antes de executar a API. Use `npm run initdb` para criar o esquema de todos os módulos, ou `npm run initdb:membership` para um único módulo.
:::

### Configurações do WebSocket

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SOCKET_PORT` | Porta do servidor WebSocket | `8087` |
| `SOCKET_URL` | URL do WebSocket para os clientes se conectarem | `ws://localhost:8087` |

---

## Variáveis de Ambiente dos Aplicativos Web

### B1Admin (React + Vite)

Arquivo de exemplo: `.env.sample`

| Variável | Descrição | Exemplo (Demonstração) |
|----------|-----------|------------------------|
| `REACT_APP_STAGE` | Nome do ambiente | `demo` |
| `PORT` | Porta do servidor de desenvolvimento | `3101` |
| `REACT_APP_API_BASE` | URL base única para todas as APIs ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` são adicionados automaticamente) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL de entrega de conteúdo | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID do Google Analytics (opcional) | `UA-123456789-1` |

Para o desenvolvimento com API local, aponte a URL base para a sua stack local:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Arquivo de exemplo: `.env.sample`

| Variável | Descrição | Exemplo (Demonstração) |
|----------|-----------|------------------------|
| `NEXT_PUBLIC_API_BASE` | URL base única para todas as APIs ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` são adicionados automaticamente) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de conteúdo | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID do Google Analytics (opcional) | `UA-123456789-1` |

:::info
O Next.js exige o prefixo `NEXT_PUBLIC_` para qualquer variável de ambiente que precise estar disponível no navegador. Variáveis usadas somente no servidor não precisam desse prefixo.
:::

### LessonsApp (Next.js)

Arquivo de exemplo: `dotenv.sample.txt`

| Variável | Descrição | Exemplo (LessonsApi local) |
|----------|-----------|----------------------------|
| `STAGE` | Estágio do ambiente (deixe sem definir ou use `dev` para desenvolvimento local) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL da API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de conteúdo | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Base da API ChurchApps usada para login (considerada somente quando `STAGE` não está definido ou é `dev`) | `https://api.demo.churchapps.org` |

---

## Variáveis de Ambiente dos Aplicativos Móveis

### B1Checkin (React Native / Expo)

Arquivo de exemplo: `dotenv.sample.txt`

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `EXPO_PUBLIC_STAGE` | Define o conjunto de APIs ao qual o aplicativo se conecta: `dev` (API local em `http://127.0.0.1:8084`), `staging` ou `prod` (o padrão quando não definido) | `dev` |

O B1Checkin usa apenas os módulos de API Membership e Attendance, além da URL de entrega de conteúdo; os endereços de cada estágio são definidos em `src/helpers/EnvironmentHelper.ts`.

:::info
O Expo incorpora ao pacote do aplicativo apenas as variáveis com prefixo `EXPO_PUBLIC_`. Reinicie o servidor de desenvolvimento com `yarn start --reset-cache` após alterar o `.env`.
:::

---

## Referência Rápida: Locais dos Arquivos de Exemplo

| Projeto | Arquivo de Exemplo |
|---------|--------------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
