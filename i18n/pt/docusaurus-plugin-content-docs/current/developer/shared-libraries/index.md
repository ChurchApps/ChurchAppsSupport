---
title: "Bibliotecas Compartilhadas"
---

# Bibliotecas Compartilhadas

<div class="article-intro">

O código compartilhado do ChurchApps é publicado no npm sob o escopo `@churchapps/*`. Esses pacotes fornecem utilitários comuns, helpers do lado do servidor e componentes React que são consumidos por todos os projetos do ChurchApps como dependências npm regulares.

</div>

## Pacotes

| Pacote | Descrição | Usado Por |
|--------|-----------|-----------|
| [`@churchapps/helpers`](./helpers) | Utilitários base (DateHelper, ApiHelper, etc.) | Todos os projetos |
| [`@churchapps/apihelper`](./api-helper) | Utilitários Express.js do lado do servidor | Todas as APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartilhados e utilitários | Todas as aplicações web |

## Desenvolvimento Local com `npm link`

Ao desenvolver uma biblioteca compartilhada junto com um projeto consumidor, use `npm link` para testar alterações sem publicar no npm:

```bash
# Compilar e vincular a biblioteca
cd Helpers && npm run build && npm link

# Vinculá-la no projeto consumidor
cd ../Api && npm link @churchapps/helpers
```

Isso cria um link simbólico do `node_modules/@churchapps/helpers` do projeto consumidor para a saída de compilação local, então as alterações são refletidas imediatamente após recompilar.

:::tip
Lembre-se de executar `npm run build` no projeto da biblioteca após fazer alterações -- o projeto consumidor lê da pasta compilada `dist/`, não do código-fonte.
:::

:::warning
As conexões `npm link` são redefinidas sempre que você executa `npm install` no projeto consumidor. Você precisará executar novamente o comando `npm link @churchapps/<package>` após instalar dependências.
:::
