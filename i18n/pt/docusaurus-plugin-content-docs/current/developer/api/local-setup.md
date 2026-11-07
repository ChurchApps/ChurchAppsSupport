---
title: "Configuração local da API"
description: "Configure a API ChurchApps localmente: clone o repositório, configure seis bancos MySQL, inicialize o esquema e rode o servidor com hot reload."
---

# Configuração local da API

<div class="article-intro">

Este guia orienta você na configuração da API do ChurchApps para desenvolvimento local. Você vai clonar o repositório, configurar as conexões com o banco de dados, inicializar o esquema e iniciar o servidor de desenvolvimento com recarga automática.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale o **Node.js 24+**, o **Git** e o **MySQL 8.0+** -- veja [Pré-requisitos](../setup/prerequisites.md)
- Crie um usuário MySQL com privilégios para criar bancos de dados
- Revise a referência de [Variáveis de ambiente](../setup/environment-variables.md) para a configuração da API

</div>

## Passo a passo da configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instale as dependências

O projeto usa Yarn (uma proteção bloqueia `npm install`):

```bash
cd Api
yarn install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.sample .env
```

Abra o `.env` e configure as strings de conexão com o MySQL. Cada módulo precisa de sua própria conexão com o banco de dados no seguinte formato:

```
mysql://root:password@localhost:3306/dbname
```

Você vai precisar de strings de conexão para os seis bancos de dados dos módulos (membership, attendance, content, giving, messaging, doing).

### 4. Inicialize os bancos de dados

```bash
npm run initdb
```

Isso cria os seis bancos de dados e suas tabelas automaticamente.

:::tip
Você pode inicializar o banco de dados de um único módulo com `npm run initdb -- --module=membership` (ou `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A API inicia com recarga automática em [http://localhost:8084](http://localhost:8084).

## Comandos principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com recarga automática (tsx watch) |
| `npm run build` | Limpa, compila o TypeScript e copia os recursos |
| `npm run test` | Executa os testes com Jest (inclui cobertura) |
| `npm run test:watch` | Executa os testes em modo de observação |
| `npm run lint` | Executa o ESLint com correção automática (o ESLint é o único formatador) |

## Implantação

O ambiente de staging foi desativado. A API é implantada no ambiente de demonstração a cada push para `main` e na produção pelo fluxo de trabalho manual **Deploy Prod**, que também aplica as migrações de banco de dados pendentes. Veja [Implantação da API](../deployment/apis.md) para detalhes.

## Desenvolvimento local de bibliotecas

Se você precisar desenvolver uma biblioteca compartilhada (`@churchapps/helpers` ou `@churchapps/apihelper`) junto com a API, compile-a no workspace [Packages](https://github.com/ChurchApps/Packages) e adicione um portal Yarn temporário na API:

```bash
# No workspace Packages
yarn build

# No diretório da API
yarn link ../Packages/helpers
# ... teste ...
yarn unlink ../Packages/helpers && yarn install
```

Isso permite testar alterações das bibliotecas com a API sem publicar no npm. Veja [Bibliotecas compartilhadas](../shared-libraries/index.md#local-development-against-a-consuming-app) para detalhes -- e nunca faça commit da resolução de portal que o link grava no `package.json`.

## Artigos relacionados

- **[Banco de dados](./database.md)** -- Entenda a arquitetura de um banco por módulo
- **[Estrutura do módulo](./module-structure.md)** -- Como controllers, repositórios e modelos são organizados
- **[Bibliotecas compartilhadas](../shared-libraries/index.md)** -- Trabalhando com `@churchapps/helpers` e `@churchapps/apihelper`
