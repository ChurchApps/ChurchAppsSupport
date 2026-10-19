---
title: "Configuração"
---

# Configuração

<div class="article-intro">

Esta seção orienta você na configuração de um ambiente de desenvolvimento local para os projetos da ChurchApps. Você pode apontar o seu frontend para as APIs de demonstração compartilhadas, para um início rápido de desenvolvimento, ou executar a stack completa localmente, para trabalho no backend.

</div>

## Duas Abordagens

Há duas formas de desenvolver localmente, dependendo de quanto da stack você precisa:

### 1. Aponte para as APIs de Demonstração (Mais Fácil)

Se você estiver trabalhando em um **projeto de frontend** (aplicativo web, aplicativo móvel ou aplicativo de desktop), o caminho mais rápido é apontar o seu aplicativo local para as APIs de demonstração compartilhadas. Não é necessário configurar banco de dados nem backend.

A URL base da API de demonstração é:

```
https://api.demo.churchapps.org
```

Cada módulo da API está disponível em um caminho abaixo dessa base, por exemplo:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

O ambiente de demonstração executa o código mais recente da branch `main`, e os seus dados de exemplo são recriados todas as noites, então não espere que nada que você criar ali dure. (O antigo ambiente de staging, `api.staging.churchapps.org`, foi desativado. Alguns arquivos `.env` de exemplo ainda podem listar URLs de staging -- substitua-as pelas URLs de demonstração ou locais.)

:::tip
Essa abordagem permite começar a fazer alterações no frontend em minutos. É o caminho recomendado para a maioria dos colaboradores.
:::

### 2. Execute Tudo Localmente

Se você precisar modificar o código da API ou trabalhar offline, pode executar a stack completa localmente. Isso exige MySQL 8.0+ e configuração adicional. Veja o guia de [configuração local da API](../api/local-setup) para instruções detalhadas.

## Primeiros Passos

Siga estas páginas em ordem:

1. **[Pré-requisitos](prerequisites)** -- Instale as ferramentas necessárias (Node.js, Git, MySQL, etc.)
2. **[Visão Geral do Projeto](project-overview)** -- Entenda quais projetos existem e o que cada um faz
3. **[Variáveis de Ambiente](environment-variables)** -- Configure os seus arquivos `.env` para conectar tudo

:::info
Cada projeto da ChurchApps é um repositório Git independente. Você só precisa clonar o(s) projeto(s) em que quer trabalhar.
:::
