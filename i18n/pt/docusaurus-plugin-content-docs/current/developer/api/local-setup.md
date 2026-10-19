---
title: "Configuração Local da API"
---

# Configuração Local da API

<div class="article-intro">

Este guia mostra como configurar a API da ChurchApps para desenvolvimento local. Você vai clonar o repositório, configurar as conexões com o banco de dados, inicializar o esquema e iniciar o servidor de desenvolvimento com recarregamento automático.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale o **Node.js 22+**, o **Git** e o **MySQL 8.0+** -- veja [Pré-requisitos](../setup/prerequisites)
- Crie um usuário MySQL com permissão para criar bancos de dados
- Consulte a referência de [Variáveis de Ambiente](../setup/environment-variables) para a configuração da API

</div>

## Passo a passo da configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instale as dependências

O projeto usa o Yarn (uma proteção bloqueia o `npm install`):

```bash
cd Api
yarn install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.sample .env
```

Abra o `.env` e configure as strings de conexão com o MySQL. Cada módulo precisa de sua própria conexão com o banco de dados, no seguinte formato:

```
mysql://root:password@localhost:3306/dbname
```

Você vai precisar das strings de conexão dos seis bancos de dados dos módulos (membership, attendance, content, giving, messaging, doing).

### 4. Inicialize os bancos de dados

```bash
npm run initdb
```

Este comando cria automaticamente os seis bancos de dados e suas tabelas.

:::tip
Você pode inicializar o banco de dados de um único módulo com `npm run initdb -- --module=membership` (ou `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A API inicia com recarregamento automático em [http://localhost:8084](http://localhost:8084).

## Comandos principais

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com recarregamento automático (tsx watch) |
| `npm run build` | Limpa, compila o TypeScript e copia os recursos |
| `npm run test` | Executa os testes com Jest (inclui cobertura) |
| `npm run test:watch` | Executa os testes em modo de observação |
| `npm run lint` | Executa o ESLint com correção automática (o ESLint é o único formatador) |

## Implantação

O ambiente de staging foi desativado. A Api é implantada no ambiente de demonstração a cada push para `main` e, em produção, pelo workflow manual **Deploy Prod**, que também aplica as migrações pendentes do banco de dados. Veja [Implantação da API](../deployment/apis) para mais detalhes.

## Desenvolvimento de bibliotecas locais

Se você precisar desenvolver uma biblioteca compartilhada (`@churchapps/helpers` ou `@churchapps/apihelper`) junto com a API, compile-a no workspace [Packages](https://github.com/ChurchApps/Packages) e adicione um portal temporário do Yarn na API:

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Isso permite testar alterações de bibliotecas na API sem publicá-las no npm. Veja [Bibliotecas Compartilhadas](../shared-libraries/#local-development-against-a-consuming-app) para mais detalhes -- e nunca faça commit da resolução de portal que o link grava no `package.json`.

## Artigos relacionados

- **[Banco de Dados](./database)** -- Entenda a arquitetura de um banco de dados por módulo
- **[Estrutura dos Módulos](./module-structure)** -- Como controladores, repositórios e modelos são organizados
- **[Bibliotecas Compartilhadas](../shared-libraries/)** -- Trabalhando com `@churchapps/helpers` e `@churchapps/apihelper`
