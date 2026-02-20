---
title: "Configuração"
---

# Configuração

<div class="article-intro">

Esta seção orienta você na configuração de um ambiente de desenvolvimento local para projetos ChurchApps. Você pode apontar seu frontend para as APIs de staging compartilhadas para desenvolvimento rápido, ou executar a stack completa localmente para trabalho no backend.

</div>

## Duas abordagens

Existem duas formas de desenvolver localmente, dependendo de quanto da stack você precisa:

### 1. Apontar para as APIs de staging (mais fácil)

Se você está trabalhando em um **projeto frontend** (aplicação web, aplicativo móvel ou aplicativo desktop), o caminho mais rápido é apontar seu aplicativo local para as APIs de staging compartilhadas. Nenhuma configuração de banco de dados ou backend é necessária.

A URL base da API de staging é:

```
https://api.staging.churchapps.org
```

Cada módulo de API está disponível em um caminho sob esta base, por exemplo:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Esta abordagem permite que você comece a fazer alterações no frontend em minutos. É o caminho recomendado para a maioria dos contribuidores.
:::

### 2. Executar tudo localmente

Se você precisa modificar o código da API ou trabalhar offline, pode executar a stack completa localmente. Isso requer MySQL 8.0+ e configuração adicional. Consulte o guia de [Configuração local da API](../api/local-setup) para instruções detalhadas.

## Primeiros passos

Siga estas páginas na ordem:

1. **[Pré-requisitos](prerequisites)** -- Instale as ferramentas necessárias (Node.js, Git, MySQL, etc.)
2. **[Visão geral dos projetos](project-overview)** -- Entenda quais projetos existem e o que fazem
3. **[Variáveis de ambiente](environment-variables)** -- Configure seus arquivos `.env` para conectar tudo

:::info
Cada projeto ChurchApps é um repositório Git independente. Você só precisa clonar o(s) projeto(s) específico(s) no(s) qual(is) deseja trabalhar.
:::
