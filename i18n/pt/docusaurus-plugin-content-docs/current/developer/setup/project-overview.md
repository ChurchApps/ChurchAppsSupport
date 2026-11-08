---
title: "Visão Geral do Projeto"
description: "Mapeie todos os repositórios da ChurchApps por categoria, com frameworks, portas de desenvolvimento, bancos de dados e como os pacotes compartilhados @churchapps conectam os projetos, na documentação de configuração para desenvolvedores."
---

# Visão Geral do Projeto

<div class="article-intro">

A ChurchApps é composta por aproximadamente 20 repositórios independentes, cada um publicado sob a [organização ChurchApps no GitHub](https://github.com/ChurchApps). Esta página apresenta um inventário completo de todos os projetos organizados por categoria, junto com seus frameworks, portas e relacionamentos.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale os [pré-requisitos](./prerequisites.md) da categoria de projeto em que você deseja trabalhar

</div>

## APIs de Backend

Todas as APIs são construídas com Node.js, Express e TypeScript, e são implantadas no AWS Lambda por meio do Serverless Framework.

| Projeto | Finalidade | Porta de Desenvolvimento | Banco de Dados |
|---------|-----------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Módulo principal monolítico modular que abrange membros, presença, conteúdo, doações, mensagens e escalas de serviço | 8084 | Banco MySQL separado por módulo (6 no total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend do Lessons.church | -- | Banco MySQL único `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Ferramenta de consulta com IA baseada na OpenAI | -- | -- |

:::info
O projeto **Api** principal é um monólito modular. Cada módulo (membership, attendance, content, giving, messaging, doing) possui seu próprio banco de dados e é acessível em um subcaminho, como `/membership` ou `/giving`. Em produção, esses módulos são expostos como funções Lambda separadas atrás do API Gateway.
:::

## Aplicativos Web

| Projeto | Framework | Porta de Desenvolvimento | Finalidade |
|---------|-----------|----------|----------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | Painel de administração da igreja |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplicativo público para membros da igreja |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend do Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilitário de importação e exportação de dados |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Estático | -- | Sites institucionais estáticos para igrejas |

## Aplicativos Móveis

Todos os aplicativos móveis usam React Native com Expo.

| Projeto | Finalidade | Versões Principais |
|---------|--------------|---------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplicativo de quiosque para check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Exibição de lições para Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Reprodução de conteúdo (incluindo sistemas operacionais de TV) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Controle remoto móvel para o FreeShow | Expo |

## Desktop

| Projeto | Stack | Finalidade |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software de apresentação e culto |

## Bibliotecas Compartilhadas

O código compartilhado é publicado no npm sob o escopo `@churchapps` e consumido como dependências npm comuns pelos projetos acima. Todos os pacotes compartilhados estão em um único repositório — [Packages](https://github.com/ChurchApps/Packages) — gerenciado como um workspace do Yarn e publicado com changesets.

| Pacote | Finalidade | Usado Por |
|---------|---------|---------|
| `@churchapps/helpers` | Utilitários base e interfaces TypeScript compartilhadas (DateHelper, ApiHelper, CurrencyHelper, etc.) | Todos os projetos |
| `@churchapps/apihelper` | Utilitários para servidor Express (autenticação, controladores base, acesso ao banco de dados, integrações com AWS) | Todas as APIs |
| `@churchapps/apphelper` | Biblioteca de componentes React com submódulos para login, doações, formulários, markdown e criação de sites | Todos os aplicativos web |
| `@churchapps/content-providers` | Abstração de provedores de conteúdo de terceiros (Lessons.church, Planning Center, Dropbox e outros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de integração do B1.church: webhooks, cliente REST, OAuth | Desenvolvedores de integrações externas |
| `@churchapps/texting` | Abstração de provedores de SMS | Api |

Consulte [Bibliotecas Compartilhadas](../shared-libraries/index.md) para a configuração do workspace e o fluxo de publicação.

## Relacionamento entre os Projetos

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

Todos os aplicativos de frontend dependem de `@churchapps/helpers`. Os aplicativos web dependem adicionalmente dos pacotes `@churchapps/apphelper`. Todas as APIs de backend dependem de `@churchapps/helpers` e `@churchapps/apihelper`.

## Próximos Passos

- **[Variáveis de Ambiente](./environment-variables.md)** — Configure seus arquivos `.env` para conectar às APIs
- **[Configuração Local da API](../api/local-setup.md)** — Configure a API de backend localmente
