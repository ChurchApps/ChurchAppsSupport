---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

O pacote `@churchapps/apihelper` fornece utilitários do lado do servidor para todas as APIs Express.js do ChurchApps. Ele inclui a classe base de controller, autenticação JWT, utilitários de banco de dados e integrações AWS dos quais todo projeto de API depende.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com a configuração do [workspace Packages](./index.md) e fluxo de lançamento
- Este pacote depende de [`@churchapps/helpers`](./helpers) (como uma dependência de pares) e o re-exporta

</div>

## O Que Está Incluído

- **CustomBaseController** -- classe base para controllers de API, construída em `inversify-express-utils`
- **Auth** -- autenticação JWT via `CustomAuthProvider`, `AuthenticatedUser` e `Principal`
- **Utilitários de banco de dados** -- `DB.query` / `DB.queryOne` e a classe `Pool` para gerenciamento de conexões MySQL, mais `MySqlHelper` e `DBCreator` para configuração de schema
- **Integrações AWS** -- `AwsHelper` para armazenamento de arquivos S3 e leituras do Parameter Store
- **Email** -- `EmailHelper` suportando transportes SES e SMTP
- **Carregamento de configuração** -- `EnvironmentBase` lê strings de conexão e segredos de variáveis de ambiente ou Parameter Store
- **Misc** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Configuração para Desenvolvimento Local

Este pacote vive no workspace [Packages](https://github.com/ChurchApps/Packages) ao lado das outras bibliotecas compartilhadas:

1. Clone o workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instale as dependências na raiz do workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Construa (compila TypeScript para `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Ou execute `yarn build` na raiz para construir cada pacote em ordem de dependência.

Para testar mudanças dentro de uma API consumidora, use um portal Yarn temporário -- veja [Desenvolvimento Local Contra uma Aplicação Consumidora](./index.md#local-development-against-a-consuming-app).

## Publicando

Lançamentos vão através de changesets: execute `yarn changeset` na raiz do workspace com cada mudança, depois `yarn publish-all` quando pronto para lançar. Veja [Visão Geral de Bibliotecas Compartilhadas](./index.md#releasing-with-changesets) para o fluxo completo.

:::info
Este pacote é uma dependência de toda API ChurchApps -- a API principal, AskApi e LessonsApi. Ao fazer alterações, teste contra uma API localmente antes de publicar.
:::

## Artigos Relacionados

- **[Helpers](./helpers)** -- O pacote de utilitários base do qual este pacote depende
- **[Estrutura do Módulo](../api/module-structure)** -- Como controllers e middleware de autenticação são usados nos módulos da API
- **[Configuração Local da API](../api/local-setup)** -- Configurando a API para desenvolvimento local
