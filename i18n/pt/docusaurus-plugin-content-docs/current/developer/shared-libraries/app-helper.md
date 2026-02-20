---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Os pacotes `@churchapps/apphelper*` fornecem componentes React compartilhados e utilitários para todas as aplicações web do ChurchApps. O AppHelper é estruturado como um workspace monorepo contendo seis pacotes que cobrem componentes principais, autenticação, doações, formulários, markdown e funcionalidades de website/CMS.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com o [fluxo de trabalho npm link](./index.md) para desenvolvimento local

</div>

## Pacotes

| Pacote | Descrição |
|--------|-----------|
| `@churchapps/apphelper` | Componentes e utilitários principais |
| `@churchapps/apphelper-login` | UI de login e registro |
| `@churchapps/apphelper-donations` | Componentes de doações e ofertas |
| `@churchapps/apphelper-forms` | Componentes de construtor de formulários |
| `@churchapps/apphelper-markdown` | Editor e renderizador de markdown |
| `@churchapps/apphelper-website` | Componentes de website e CMS |

## Configuração para Desenvolvimento Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. Instale as dependências:

   ```bash
   cd AppHelper && npm install
   ```

3. Compile todos os pacotes e inicie o playground Vite:

   ```bash
   npm run playground:reload
   ```

   Isso compila cada pacote no workspace e inicia o servidor de desenvolvimento do playground em **http://localhost:3001**.

:::tip
O playground é a maneira mais rápida de desenvolver e testar componentes do AppHelper. Ele faz hot-reload do servidor de desenvolvimento Vite para que você possa ver as alterações em tempo real.
:::

## Publicação

Publicar um único pacote:

```bash
npm run publish:apphelper
```

Publicar todos os pacotes:

```bash
npm run publish:all
```

:::warning
Ao publicar, certifique-se de atualizar o número da versão no(s) arquivo(s) `package.json` relevante(s) antes de executar o comando de publicação. Todos os pacotes que dependem de um pacote alterado também devem ser atualizados.
:::

## Artigos Relacionados

- **[Helpers](./helpers)** -- O pacote de utilitários base usado junto com o AppHelper
- **[Aplicações Web](../web-apps/)** -- As aplicações web que consomem esses pacotes
- **[Visão Geral das Bibliotecas Compartilhadas](./index.md)** -- Fluxo de trabalho `npm link` e visão geral dos pacotes
