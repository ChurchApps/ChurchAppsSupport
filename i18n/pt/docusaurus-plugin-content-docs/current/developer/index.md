---
title: "Documentação para Desenvolvedores"
---

# Documentação para Desenvolvedores

<div class="article-intro">

O ChurchApps é uma coleção de aproximadamente 20 projetos de código aberto que, juntos, oferecem uma plataforma completa de gestão de igrejas. Os projetos abrangem APIs de backend, aplicativos web, aplicativos móveis, um aplicativo para desktop e bibliotecas compartilhadas -- todos escritos em TypeScript. Esta seção reúne tudo o que você precisa para configurar um ambiente de desenvolvimento local e começar a contribuir.

</div>

## Arquitetura em resumo

Os projetos são **repositórios independentes** (não um monorepo). O código compartilhado é publicado no npm sob o escopo `@churchapps/*` e consumido como dependências comuns. Isso significa que você pode trabalhar em um único projeto sem clonar todo o ecossistema.

Principais características:

- **Linguagem:** TypeScript em todo o projeto
- **Backend:** APIs Node.js / Express implantadas no AWS Lambda com o Serverless Framework
- **Web:** React 19 (Vite e Next.js), Material-UI 7
- **Mobile:** React Native com Expo
- **Banco de dados:** MySQL 8.0, um banco de dados por módulo de API

## O que esta seção abrange

- **[Configuração](setup/)** -- Ambiente local de desenvolvimento, pré-requisitos e configuração
  - [Pré-requisitos](setup/prerequisites) -- Ferramentas e softwares necessários
  - [Visão geral do projeto](setup/project-overview) -- Todos os projetos de relance
  - [Variáveis de ambiente](setup/environment-variables) -- Configurando os arquivos `.env`
- **[API](api/)** -- Configuração local da API principal, inicialização do banco de dados e estrutura dos módulos
- **[Aplicativos web](web-apps/)** -- Executando B1Admin, B1App e LessonsApp localmente
- **[Aplicativos móveis](mobile/)** -- Compilando o B1Mobile e outros apps Expo
- **[Bibliotecas compartilhadas](shared-libraries/)** -- Trabalhando com Helpers, ApiHelper e AppHelper
- **[Implantação](deployment/)** -- Implantando APIs, aplicativos web e aplicativos móveis
- **[Provedor de conteúdo do FreePlay](freeplay-content-provider)** -- Integrando sua biblioteca de lições ao FreePlay

## Comunidade e recursos

| Recurso | Link |
|----------|------|
| Organização no GitHub | [github.com/ChurchApps](https://github.com/ChurchApps) |
| Rastreador de problemas | [Issues do ChurchAppsSupport](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Comunidade no Slack | [Entrar no Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
A forma mais rápida de começar a contribuir é escolher um aplicativo web (como o B1Admin), apontá-lo para as **APIs de demonstração** compartilhadas e começar a fazer alterações no frontend. Não é necessário configurar banco de dados nem API.
:::
