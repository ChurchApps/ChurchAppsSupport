---
title: "Configuração Local da API"
---

# Configuração Local da API

<div class="article-intro">

Este guia orienta você na configuração da API do ChurchApps para desenvolvimento local. Você irá clonar o repositório, configurar suas conexões de banco de dados, inicializar o esquema e iniciar o servidor de desenvolvimento com hot reload.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js 22+**, **Git** e **MySQL 8.0+** -- veja [Pré-requisitos](../setup/prerequisites)
- Crie um usuário MySQL com privilégios de criação de banco de dados
- Revise a referência de [Variáveis de Ambiente](../setup/environment-variables) para configuração da API

</div>

## Configuração Passo a Passo

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instale as dependências

```bash
cd Api
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.sample .env
```

Abra o `.env` e configure suas strings de conexão MySQL. Cada módulo precisa de sua própria conexão de banco de dados no seguinte formato:

```
mysql://root:password@localhost:3306/dbname
```

Você precisará de strings de conexão para todos os seis bancos de dados de módulos (membership, attendance, content, giving, messaging, doing).

### 4. Inicialize os bancos de dados

```bash
npm run initdb
```

Isso cria todos os seis bancos de dados e suas tabelas automaticamente.

:::tip
Você pode inicializar o banco de dados de um único módulo com `npm run initdb:membership` (ou `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A API inicia com hot reload em [http://localhost:8084](http://localhost:8084).

## Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento com hot reload (tsx watch) |
| `npm run build` | Limpar, compilar TypeScript e copiar assets |
| `npm run test` | Executar testes com Jest (inclui cobertura) |
| `npm run test:watch` | Executar testes em modo de observação |
| `npm run lint` | Executar Prettier e ESLint com auto-correção |

## Implantação em Staging

Para implantar no ambiente de staging:

```bash
npm run deploy-staging
```

Isso executa um build de produção e depois implanta via Serverless Framework.

:::warning
Certifique-se de que suas credenciais AWS estejam configuradas antes de executar o comando de implantação.
:::

## Desenvolvimento Local de Bibliotecas

Se você precisar desenvolver uma biblioteca compartilhada (`@churchapps/helpers` ou `@churchapps/apihelper`) junto com a API, use `npm link`:

```bash
# No diretório da biblioteca
cd Helpers
npm run build
npm link

# No diretório da API
cd ../Api
npm link @churchapps/helpers
```

Isso permite testar alterações na biblioteca contra a API sem publicar no npm.

## Artigos Relacionados

- **[Banco de Dados](./database)** -- Entendendo a arquitetura de banco de dados por módulo
- **[Estrutura do Módulo](./module-structure)** -- Como controllers, repositórios e modelos são organizados
- **[Bibliotecas Compartilhadas](../shared-libraries/)** -- Trabalhando com `@churchapps/helpers` e `@churchapps/apihelper`
