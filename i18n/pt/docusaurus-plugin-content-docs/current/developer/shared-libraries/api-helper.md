---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

O pacote `@churchapps/apihelper` fornece utilitários do lado do servidor para todas as APIs Express.js do ChurchApps. Ele inclui a classe base de controller, middleware de autenticação JWT, utilitários de banco de dados e integrações AWS das quais todo projeto de API depende.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com o [fluxo de trabalho npm link](./index.md) para desenvolvimento local
- Este pacote depende do [`@churchapps/helpers`](./helpers)

</div>

## O Que Está Incluído

- **CustomBaseController** -- classe base para controllers de API
- **Middleware de autenticação** -- autenticação JWT via `CustomAuthProvider`
- **Utilitários de banco de dados** -- `DB.query`, `EnhancedPoolHelper` para gerenciamento de conexões MySQL
- **Integrações AWS** -- helpers para S3, SSM Parameter Store e outros serviços AWS
- **Configuração DI Inversify** -- configuração do container de injeção de dependências

## Configuração para Desenvolvimento Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. Instale as dependências:

   ```bash
   cd ApiHelper && npm install
   ```

3. Compile o pacote (compila TypeScript para `dist/`):

   ```bash
   npm run build
   ```

4. Disponibilize para vinculação local:

   ```bash
   npm link
   ```

## Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Compilar TypeScript para `dist/` |
| `npm run lint` | Executar ESLint |
| `npm run lint:fix` | Executar ESLint com auto-correção |
| `npm run format` | Formatar código com Prettier |

:::info
Este pacote é uma dependência de toda API do ChurchApps. Ao fazer alterações, use `npm link` para testar contra uma API localmente antes de publicar.
:::

## Artigos Relacionados

- **[Helpers](./helpers)** -- O pacote de utilitários base do qual este pacote depende
- **[Estrutura do Módulo](../api/module-structure)** -- Como controllers e middleware de autenticação são usados nos módulos da API
- **[Configuração Local da API](../api/local-setup)** -- Configurando a API para desenvolvimento local
