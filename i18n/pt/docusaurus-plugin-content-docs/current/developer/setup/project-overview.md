---
title: "Visão Geral dos Projetos"
---

# Visão Geral dos Projetos

<div class="article-intro">

ChurchApps consiste em aproximadamente 20 repositórios independentes, todos publicados na [organização GitHub ChurchApps](https://github.com/ChurchApps). Esta página fornece um inventário completo de todos os projetos organizados por categoria, juntamente com seus frameworks, portas e relacionamentos.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale os [pré-requisitos](./prerequisites) para a categoria de projeto na qual deseja trabalhar

</div>

## APIs backend

Todas as APIs são construídas com Node.js, Express e TypeScript, e são implantadas no AWS Lambda via Serverless Framework.

| Projeto | Finalidade | Porta dev | Banco de dados |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | Monólito modular principal cobrindo membership, attendance, content, giving, messaging e doing | 8084 | Banco MySQL separado por módulo (6 no total) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Backend do Lessons.church | -- | Banco MySQL único `lessons` |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | Ferramenta de consulta AI alimentada por OpenAI | -- | -- |

:::info
O projeto **Api** principal é um monólito modular. Cada módulo (membership, attendance, content, giving, messaging, doing) tem seu próprio banco de dados e é acessível em um subcaminho como `/membership` ou `/giving`. Em produção, eles são expostos como funções Lambda separadas atrás do API Gateway.
:::

## Aplicações web

| Projeto | Framework | Porta dev | Finalidade |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | Painel de administração da igreja |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Aplicação pública para membros da igreja |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Frontend do Lessons.church |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | Utilitário de importação/exportação de dados |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | Sites estáticos de brochura para igrejas |

## Aplicativos móveis

Todos os aplicativos móveis usam React Native com Expo.

| Projeto | Finalidade | Versões principais |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | Aplicativo para membros da igreja para iOS e Android | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | Aplicativo de quiosque para check-in | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Display de lições para Android TV | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | Reprodução de conteúdo (incluindo TV OS) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | Controle remoto móvel para FreeShow | Expo |

## Desktop

| Projeto | Stack | Finalidade |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | Software de apresentação e adoração |

## Bibliotecas compartilhadas

O código compartilhado é publicado no npm sob o escopo `@churchapps`. Estes são consumidos como dependências npm regulares pelos projetos acima.

| Pacote | Nome npm | Finalidade | Usado por |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | Utilitários base (DateHelper, ApiHelper, CurrencyHelper, etc.) | Todos os projetos |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Utilitários de servidor Express (auth middleware, DB helpers, integração AWS) | Todas as APIs |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | Workspace com 6 pacotes | Biblioteca de componentes React | Todas as aplicações web |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | Provedores de conteúdo YouTube, Vimeo e locais | FreeShow, FreePlay, Api |

### Sub-pacotes AppHelper

O projeto AppHelper é um workspace monorepo que publica seis pacotes:

| Pacote | Nome npm |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## Relacionamentos entre projetos

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

Todas as aplicações frontend dependem de `@churchapps/helpers`. As aplicações web dependem adicionalmente dos pacotes `@churchapps/apphelper`. Todas as APIs backend dependem tanto de `@churchapps/helpers` quanto de `@churchapps/apihelper`.

## Próximos passos

- **[Variáveis de ambiente](./environment-variables)** -- Configure seus arquivos `.env` para conectar às APIs
- **[Configuração local da API](../api/local-setup)** -- Configure a API backend localmente
