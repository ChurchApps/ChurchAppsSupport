---
title: "Documentação para Desenvolvedores"
description: "Encontre o seu caminho na documentação para desenvolvedores da ChurchApps: configuração local, guias de API e aplicações web, bibliotecas compartilhadas, builds móveis e implantação dos projetos de código aberto."
---

# Documentação para Desenvolvedores

<div class="article-intro">

A ChurchApps é uma coleção de aproximadamente 20 projetos de código aberto que, juntos, fornecem uma plataforma completa de gestão de igrejas. Os projetos abrangem APIs de backend, aplicações web, aplicativos móveis, uma aplicação para desktop e bibliotecas compartilhadas -- todos escritos em TypeScript. Esta seção oferece tudo o que você precisa para configurar um ambiente de desenvolvimento local e começar a contribuir.

</div>

## Visão Geral da Arquitetura

Os projetos são **repositórios independentes** (não um monorepo). O código compartilhado é publicado no npm sob o escopo `@churchapps/*` e utilizado como dependências comuns. Isso significa que você pode trabalhar em um único projeto sem precisar clonar todo o ecossistema.

Principais características:

- **Linguagem:** TypeScript em todo o projeto
- **Backend:** APIs em Node.js / Express implantadas no AWS Lambda por meio do Serverless Framework
- **Web:** React 19 (Vite e Next.js), Material-UI 7
- **Mobile:** React Native com Expo
- **Banco de dados:** MySQL 8.0, um banco de dados por módulo de API

## O Que Esta Seção Aborda

- **[Configuração](./setup/index.md)** -- Ambiente de desenvolvimento local, pré-requisitos e configuração
  - [Pré-requisitos](./setup/prerequisites.md) -- Ferramentas e softwares necessários
  - [Visão Geral dos Projetos](./setup/project-overview.md) -- Todos os projetos em resumo
  - [Variáveis de Ambiente](./setup/environment-variables.md) -- Como configurar os arquivos `.env`
- **[API](./api/index.md)** -- Configuração local da API principal, inicialização do banco de dados e estrutura dos módulos
- **[Aplicações Web](./web-apps/index.md)** -- Como executar o B1Admin, o B1App e o LessonsApp localmente
- **[Aplicativos Móveis](./mobile/index.md)** -- Como criar o B1Checkin e outros aplicativos Expo
- **[Bibliotecas Compartilhadas](./shared-libraries/index.md)** -- Como trabalhar com Helpers, ApiHelper e AppHelper
- **[Implantação](./deployment/index.md)** -- Como implantar APIs, aplicações web e aplicativos móveis
- **[Provedor de Conteúdo do FreePlay](./freeplay-content-provider.md)** -- Como integrar a sua biblioteca de lições ao FreePlay

## Comunidade e Recursos

| Recurso | Link |
|----------|------|
| Organização no GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Rastreador de Problemas | [Problemas do ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunidade no Slack | [Entrar no Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
A maneira mais rápida de começar a contribuir é escolher uma aplicação web (como o B1Admin), apontá-la para as **APIs de demonstração** compartilhadas e começar a fazer alterações no frontend. Não é necessário configurar banco de dados nem API.
:::
