---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

O pacote `@churchapps/apihelper` oferece utilitários do lado do servidor para todas as APIs Express.js da ChurchApps. Ele inclui a classe base de controladores, a autenticação JWT, utilitários de banco de dados e integrações com a AWS, que todos os projetos de API utilizam.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale o **Node.js** e o **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com a configuração e o fluxo de lançamento do [espaço de trabalho de Pacotes](./index.md)
- Este pacote depende de [`@churchapps/helpers`](./helpers) (como dependência de par) e o reexporta

</div>

## O que está incluído

- **CustomBaseController** -- classe base para controladores de API, construída sobre o `inversify-express-utils`
- **Autenticação** -- autenticação JWT por meio de `CustomAuthProvider`, `AuthenticatedUser` e `Principal`
- **Utilitários de banco de dados** -- `DB.query` / `DB.queryOne` e a classe `Pool` para o gerenciamento de conexões MySQL, além de `MySqlHelper` e `DBCreator` para a configuração do esquema
- **Integrações com a AWS** -- `AwsHelper` para o armazenamento de arquivos no S3 e a leitura do SSM Parameter Store
- **E-mail** -- `EmailHelper`, com suporte aos transportes SES e SMTP
- **Carregamento de configuração** -- `EnvironmentBase` lê strings de conexão e segredos a partir de variáveis de ambiente ou do Parameter Store
- **Diversos** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Configuração para desenvolvimento local

Este pacote está no espaço de trabalho [Packages](https://github.com/ChurchApps/Packages), junto com as demais bibliotecas compartilhadas:

1. Clone o espaço de trabalho:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instale as dependências na raiz do espaço de trabalho:

   ```bash
   cd Packages && yarn install
   ```

3. Compile o projeto (transforma o TypeScript em `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Ou execute `yarn build` na raiz para compilar todos os pacotes na ordem de dependência.

Para testar alterações dentro de uma API que o consome, use um portal temporário do Yarn -- veja [Desenvolvimento local com uma aplicação consumidora](./index.md#local-development-against-a-consuming-app).

## Publicação

As versões são publicadas com o changesets: execute `yarn changeset` na raiz do espaço de trabalho para cada alteração e, quando estiver pronto para lançar, execute `yarn publish-all`. Veja o [Panorama das bibliotecas compartilhadas](./index.md#releasing-with-changesets) para o fluxo completo.

:::info
Este pacote é uma dependência de todas as APIs da ChurchApps -- a Api principal, a AskApi e a LessonsApi. Ao fazer alterações, teste-as localmente em uma API antes de publicar.
:::

## Artigos relacionados

- **[Helpers](./helpers)** -- O pacote base de utilitários do qual este pacote depende
- **[Estrutura de módulos](../api/module-structure)** -- Como os controladores e o middleware de autenticação são usados nos módulos da API
- **[Configuração local da API](../api/local-setup)** -- Como configurar a API para desenvolvimento local
