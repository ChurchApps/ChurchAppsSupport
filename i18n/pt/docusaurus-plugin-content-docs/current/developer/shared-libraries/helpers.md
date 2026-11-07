---
title: "Helpers"
---

# Helpers

<div class="article-intro">

O pacote `@churchapps/helpers` fornece utilitários básicos usados por todos os projetos da ChurchApps, tanto no frontend quanto no backend. Ele é independente de framework e inclui auxiliares comuns, como `DateHelper`, `ApiHelper` e `CurrencyHelper`, além das interfaces TypeScript compartilhadas que formam o contrato de dados entre os aplicativos e as APIs.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o **Node.js** e o **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com a configuração do [workspace Packages](./index.md) e com o fluxo de publicação

</div>

## Quem Consome Este Pacote

Todas as APIs da ChurchApps (a Api principal, a AskApi e a LessonsApi) e todos os frontends web (B1Admin, B1App, B1Transfer e LessonsApp) dependem diretamente deste pacote. Os frontends também recebem muitas de suas exportações (`ApiHelper`, `DateHelper`, `UserHelper` e outras interfaces) reexportadas por meio do [`@churchapps/apphelper`](./app-helper). Os demais pacotes compartilhados declaram este pacote como dependência de peer, para que cada aplicativo use exatamente uma cópia.

## Configuração para Desenvolvimento Local

Este pacote fica no workspace [Packages](https://github.com/ChurchApps/Packages), junto com as outras bibliotecas compartilhadas:

1. Clone o workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instale as dependências na raiz do workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Compile (converte o TypeScript para `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   Ou execute `yarn build` na raiz para compilar todos os pacotes na ordem de dependência.

Para testar alterações dentro de um projeto que consome o pacote, use um portal temporário do Yarn -- veja [Desenvolvimento Local com um Aplicativo Consumidor](./index.md#local-development-against-a-consuming-app).

## Publicação

As versões são publicadas com changesets, e não com incrementos manuais de versão:

1. Execute `yarn changeset` na raiz do workspace, selecione `@churchapps/helpers` com o tipo de incremento apropriado e faça commit do arquivo de changeset gerado junto com a sua alteração.
2. Quando estiver pronto para publicar, execute `yarn publish-all` na raiz -- ele incrementa as versões, gera os CHANGELOGs, compila na ordem de dependência e publica no npm.

Novas interfaces compartilhadas devem ir em `helpers/src/interfaces/` e ser reexportadas pelo barrel do pacote. O catálogo de tipos de elementos do criador de sites (`ElementTypes.ts` -- 35 tipos com seus esquemas de respostas) também fica aqui. Ele é o contrato compartilhado pelos renderizadores do apphelper, pelos formulários de edição do B1Admin e pelos prompts de geração com IA (veja [Arquitetura do Criador de Sites](../architecture/website-builder)).

:::warning
Como este pacote é usado por todos os projetos da ChurchApps, alterações aqui têm grande impacto. Uma publicação do `helpers` incrementa automaticamente o `apihelper` e o `apphelper` para que suas faixas de dependência permaneçam atualizadas. Teste com um portal do Yarn em pelo menos uma API consumidora e um aplicativo web consumidor antes de publicar.
:::

## Artigos Relacionados

- **[ApiHelper](./api-helper)** -- Utilitários do lado do servidor que dependem deste pacote
- **[AppHelper](./app-helper)** -- Componentes React que dependem deste pacote
- **[Visão Geral das Bibliotecas Compartilhadas](./index.md)** -- Configuração do workspace, fluxo de publicação e fluxo de links locais
