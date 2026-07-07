---
title: "Helpers"
---

# Helpers

<div class="article-intro">

O pacote `@churchapps/helpers` fornece utilitários base usados por todos os projetos do ChurchApps, tanto frontend quanto backend. Ele é agnóstico de framework e inclui helpers comuns como `DateHelper`, `ApiHelper`, `CurrencyHelper`, além das interfaces TypeScript compartilhadas que formam o contrato de dados entre aplicações e APIs.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com a configuração do [workspace Packages](./index.md) e fluxo de lançamento

</div>

## Quem Consome Isto

Toda API ChurchApps (a API principal, AskApi e LessonsApi) e todo frontend web (B1Admin, B1App, B1Transfer, LessonsApp) depende deste pacote diretamente. Os frontends também obtêm muitas de suas exportações (`ApiHelper`, `DateHelper`, `UserHelper` e outras interfaces) re-exportadas através de [`@churchapps/apphelper`](./app-helper). Os outros pacotes compartilhados o declaram como uma dependência de pares para que cada aplicação resolva exatamente uma cópia.

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
   yarn workspace @churchapps/helpers build
   ```

   Ou execute `yarn build` na raiz para construir cada pacote em ordem de dependência.

Para testar mudanças dentro de um projeto consumidor, use um portal Yarn temporário -- veja [Desenvolvimento Local Contra uma Aplicação Consumidora](./index.md#local-development-against-a-consuming-app).

## Publicando

Lançamentos vão através de changesets em vez de bumps manuais de versão:

1. Execute `yarn changeset` na raiz do workspace e selecione `@churchapps/helpers` com o tipo de bump apropriado; faça commit do arquivo changeset gerado com sua mudança.
2. Quando pronto para lançar, execute `yarn publish-all` na raiz -- ele faz bump de versões, escreve CHANGELOGs, constrói em ordem de dependência e publica no npm.

Novas interfaces compartilhadas vão em `helpers/src/interfaces/` e são re-exportadas através do barrel do pacote. O catálogo de tipos de elemento do website builder (`ElementTypes.ts` — 35 tipos com seus schemas de respostas) também vive aqui; é o contrato compartilhado pelos renderizadores do apphelper, pelos formulários do editor B1Admin e pelos prompts de geração de IA (veja [Website Builder Architecture](../architecture/website-builder)).

:::warning
Como este pacote é usado por todo projeto do ChurchApps, mudanças aqui têm um impacto amplo. Um lançamento de `helpers` automaticamente faz bump em `apihelper` e `apphelper` para que seus intervalos de dependência fiquem atuais. Teste com um portal Yarn em pelo menos uma API consumidora e uma aplicação web consumidora antes de publicar.
:::

## Artigos Relacionados

- **[ApiHelper](./api-helper)** -- Utilitários do lado do servidor que dependem deste pacote
- **[AppHelper](./app-helper)** -- Componentes React que dependem deste pacote
- **[Visão Geral das Bibliotecas Compartilhadas](./index.md)** -- Fluxo de trabalho `npm link` e visão geral dos pacotes
