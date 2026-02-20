---
title: "Helpers"
---

# Helpers

<div class="article-intro">

O pacote `@churchapps/helpers` fornece utilitários base usados por todos os projetos do ChurchApps, tanto frontend quanto backend. Ele é agnóstico de framework e inclui helpers comuns como `DateHelper`, `ApiHelper`, `CurrencyHelper` e outros utilitários compartilhados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com o [fluxo de trabalho npm link](./index.md) para desenvolvimento local

</div>

## Configuração para Desenvolvimento Local

1. Clone o repositório:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Instale as dependências:

   ```bash
   cd Helpers && npm install
   ```

3. Compile o pacote (compila TypeScript para `dist/`):

   ```bash
   npm run build
   ```

4. Disponibilize para vinculação local:

   ```bash
   npm link
   ```

Você pode então vinculá-lo em qualquer projeto consumidor:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Publicação

Para publicar uma nova versão no npm:

1. Atualize a versão no `package.json`
2. Publique:

   ```bash
   npm publish --access=public
   ```

:::warning
Como este pacote é usado por todo projeto do ChurchApps, alterações aqui têm um impacto amplo. Teste cuidadosamente com `npm link` em pelo menos uma API consumidora e uma aplicação web consumidora antes de publicar.
:::

## Artigos Relacionados

- **[ApiHelper](./api-helper)** -- Utilitários do lado do servidor que dependem deste pacote
- **[AppHelper](./app-helper)** -- Componentes React que dependem deste pacote
- **[Visão Geral das Bibliotecas Compartilhadas](./index.md)** -- Fluxo de trabalho `npm link` e visão geral dos pacotes
