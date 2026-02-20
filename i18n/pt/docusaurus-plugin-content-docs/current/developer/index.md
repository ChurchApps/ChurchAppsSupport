---
title: "Documentação para desenvolvedores"
---

# Documentação para desenvolvedores

<div class="article-intro">

ChurchApps é uma coleção de aproximadamente 20 projetos de código aberto que juntos fornecem uma plataforma completa de gestão de igrejas. Os projetos abrangem APIs backend, aplicações web, aplicativos móveis, um aplicativo de desktop e bibliotecas compartilhadas -- todos escritos em TypeScript. Esta seção fornece tudo o que você precisa para configurar um ambiente de desenvolvimento local e começar a contribuir.

</div>

## Arquitetura em resumo

Os projetos são **repositórios independentes** (não um monorepo). O código compartilhado é publicado no npm sob o escopo `@churchapps/*` e consumido como dependências regulares. Isso significa que você pode trabalhar em um único projeto sem clonar todo o ecossistema.

Características principais:

- **Linguagem:** TypeScript em todo o projeto
- **Backend:** APIs Node.js / Express implantadas no AWS Lambda via Serverless Framework
- **Web:** React 19 (Vite e Next.js), Material-UI 7
- **Mobile:** React Native com Expo
- **Banco de dados:** MySQL 8.0, um banco de dados por módulo de API

## O que esta seção abrange

- **[Configuração](setup/)** -- Ambiente de desenvolvimento local, pré-requisitos e configuração
  - [Pré-requisitos](setup/prerequisites) -- Ferramentas e software necessários
  - [Visão geral dos projetos](setup/project-overview) -- Todos os projetos em um relance
  - [Variáveis de ambiente](setup/environment-variables) -- Configurando arquivos `.env`
- **[API](api/)** -- Configuração local da API principal, inicialização do banco de dados e estrutura dos módulos
- **[Aplicações Web](web-apps/)** -- Executando B1Admin, B1App e LessonsApp localmente
- **[Aplicativos Móveis](mobile/)** -- Compilando B1Mobile e outros aplicativos Expo
- **[Bibliotecas compartilhadas](shared-libraries/)** -- Trabalhando com Helpers, ApiHelper e AppHelper
- **[Implantação](deployment/)** -- Implantando APIs, aplicações web e aplicativos móveis

## Comunidade e recursos

| Recurso | Link |
|----------|------|
| Organização GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Rastreador de issues | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunidade Slack | [Entrar no Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
A maneira mais rápida de começar a contribuir é escolher uma aplicação web (como B1Admin), apontá-la para as **APIs de staging** e começar a fazer alterações no frontend. Nenhuma configuração de banco de dados ou API é necessária.
:::
