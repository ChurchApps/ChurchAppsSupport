---
title: "Variáveis de Ambiente"
---

# Variáveis de Ambiente

<div class="article-intro">

Todos os projetos do ChurchApps usam um arquivo `.env` para a configuração local. Cada projeto inclui um arquivo de exemplo que você copia e personaliza. Esta página trata das variáveis de ambiente para APIs, aplicativos web e aplicativos móveis, incluindo como escolher entre os destinos de API de demonstração e local.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale os [pré-requisitos](./prerequisites) para o seu projeto
- Clone o repositório do projeto em que você quer trabalhar
- Revise a [Visão geral do projeto](./project-overview) para entender quais módulos de API o seu projeto precisa

</div>

## Padrão geral

1. Procure `dotenv.sample.txt` ou `.env.sample` na raiz do projeto.
2. Copie-o para `.env`.
3. Edite os valores conforme necessário.

```bash
# Example for a project with .env.sample
cp .env.sample .env

# Example for a project with dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Nunca faça commit de arquivos `.env` no controle de versão.** Eles contêm segredos como credenciais de banco de dados, chaves de API e segredos JWT. Todos os projetos do ChurchApps incluem `.env` no `.gitignore`, mas sempre confira antes de fazer commit.
:::

## Escolhendo o destino da API

A decisão mais importante é para onde o seu frontend aponta as chamadas de API. Há duas opções:

### Opção 1: APIs de demonstração (recomendado para desenvolvimento de frontend)

Use o ambiente de demonstração compartilhado. Não é necessário configurar API ou banco de dados locais. Ele executa o código mais recente da `main`, e seus dados de exemplo são recarregados todas as noites.

```bash
# Base URL pattern
https://api.demo.churchapps.org/{module}

# Example module URLs
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

### Opção 2: API local

Execute o projeto Api na sua máquina. Requer MySQL 8.0+ com bancos de dados criados para cada módulo. Veja o guia de [configuração local da API](../api/local-setup).

```bash
# Base URL pattern
http://localhost:8084/{module}

# Example module URLs
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variáveis de ambiente da API

O projeto **Api** principal (`.env.sample`) tem a configuração mais extensa. Estas são as variáveis principais:

### Configurações compartilhadas

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `ENVIRONMENT` | Ambiente de execução | `dev` |
| `SERVER_PORT` | Porta HTTP do servidor de desenvolvimento local | `8084` |
| `ENCRYPTION_KEY` | Chave de criptografia de 192 bits para dados sensíveis | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Segredo para assinar JSON Web Tokens | `jwt-secret-dev` |
| `FILE_STORE` | Onde armazenar os arquivos enviados (`disk` ou `s3`) | `disk` |
| `CORS_ORIGIN` | Origens CORS permitidas (`*` para desenvolvimento local) | `*` |

### Conexão com o banco de dados

Uma única URL base aponta a API para o MySQL. A API deriva um banco de dados por módulo (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) a partir dessa base.

| Variável | Exemplo |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Substitua `root:password` pelas suas credenciais reais do MySQL. Cada banco de dados por módulo precisa existir antes de executar a API. Use `npm run initdb` para criar o esquema de todos os módulos, ou `npm run initdb:membership` para um único módulo.
:::

### Configurações do WebSocket

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SOCKET_PORT` | Porta do servidor WebSocket | `8087` |
| `SOCKET_URL` | URL do WebSocket para os clientes se conectarem | `ws://localhost:8087` |

---

## Variáveis de ambiente dos aplicativos web

### B1Admin (React + Vite)

Arquivo de exemplo: `.env.sample`

| Variável | Descrição | Exemplo (Demo) |
|----------|-----------|----------------|
| `REACT_APP_STAGE` | Nome do ambiente | `demo` |
| `PORT` | Porta do servidor de desenvolvimento | `3101` |
| `REACT_APP_API_BASE` | URL base única para todas as APIs do ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` são acrescentados automaticamente) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL de entrega de conteúdo | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID do Google Analytics (opcional) | `UA-123456789-1` |

Para o desenvolvimento com API local, aponte a URL base para a sua estrutura local:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Arquivo de exemplo: `.env.sample`

| Variável | Descrição | Exemplo (Demo) |
|----------|-----------|----------------|
| `NEXT_PUBLIC_API_BASE` | URL base única para todas as APIs do ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` são acrescentados automaticamente) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de conteúdo | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID do Google Analytics (opcional) | `UA-123456789-1` |

:::info
O Next.js exige o prefixo `NEXT_PUBLIC_` para qualquer variável de ambiente que precise estar disponível no navegador. Variáveis usadas somente no servidor não precisam desse prefixo.
:::

### LessonsApp (Next.js)

Arquivo de exemplo: `dotenv.sample.txt`

| Variável | Descrição | Exemplo (API Lessons local) |
|----------|-----------|----------------------------|
| `STAGE` | Estágio do ambiente (deixe sem definir ou use `dev` para desenvolvimento local) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL da API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL de entrega de conteúdo | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | URL base da API do ChurchApps usada para o login (somente respeitada quando `STAGE` não estiver definido ou for `dev`) | `https://api.demo.churchapps.org` |

---

## Variáveis de ambiente dos aplicativos móveis

### B1Mobile (React Native / Expo)

Arquivo de exemplo: `dotenv.sample.txt`

| Variável | Descrição | Exemplo (Demo) |
|----------|-----------|----------------|
| `STAGE` | Nome do ambiente | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Uma URL por módulo de API do ChurchApps (cada uma usa a produção por padrão quando não definida) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (host separado; não há uma compartilhada de não produção) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL de entrega de conteúdo | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL do site Lessons | `https://lessons.church` |

:::info
Os aplicativos móveis não usam o prefixo `REACT_APP_` nem `NEXT_PUBLIC_`. O acesso às variáveis de ambiente é tratado pela configuração do Expo.
:::

---

## Referência rápida: locais dos arquivos de exemplo

| Projeto | Arquivo de exemplo |
|---------|-------------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
