---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

O pacote `@churchapps/apphelper` fornece componentes React compartilhados e utilitários para todas as aplicações web do ChurchApps. É um único pacote publicado que expõe módulos de funcionalidade através de pontos de entrada de subcaminho -- login, doações, formulários, markdown e funcionalidade de website/CMS -- junto com um conjunto principal de componentes e helpers compartilhados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com a configuração do [workspace Packages](./index.md) e fluxo de lançamento

</div>

## Pontos de Entrada

O pacote define exportações de subcaminho em seu `package.json`, assim cada módulo de funcionalidade é importável por conta própria:

| Ponto de entrada | Conteúdo |
|-------------|----------|
| `@churchapps/apphelper` | Componentes principais, helpers e hooks |
| `@churchapps/apphelper/login` | Login e UI de registro |
| `@churchapps/apphelper/donations` | Componentes de doações e ofertas |
| `@churchapps/apphelper/forms` | Componentes de envio de formulários |
| `@churchapps/apphelper/markdown` | Editores e renderizadores de markdown e HTML |
| `@churchapps/apphelper/website` | Componentes de website builder e CMS |

## Quem Consome O Quê

Antes de alterar uma exportação compartilhada, verifique quais aplicações a importam:

| Área de Exportação | O que fornece | Consumido por |
|---|---|---|
| Root -- componentes principais e hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, mais utilitários re-exportados de `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- chrome do site | `SiteHeader` (nav, menu do usuário, notificações) | B1Admin, B1Transfer, LessonsApp |
| Root -- editores de conteúdo admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- encanamento em tempo real | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- lojas de chat/presença | `ConversationStore`, `PresenceStore` | B1App |
| Root -- UI de notas e messaging | `Notes` (notas de staff em pessoas/tarefas); `AddNote`, `SubscriptionToggle` (mensagens de membros) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- específico de Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (compartilhado); `MarkdownPreview`, `HtmlEditor` (edição de conteúdo admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (compartilhado); `FundDonations` (admin apenas) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderiza `ConversationalForm` quando o `displayMode` do formulário é `conversational`) | B1Admin, B1App |
| `./website` | Núcleo de renderização de página compartilhado pelo editor e renderizador (`Element` + os renderizadores por-tipo resolvidos via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widgets de site (` AnnouncementBanner`, `Launcher` + seus helpers `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` usados apenas pelo renderizador de acesso público | B1Admin (editor), B1App (componentes de editor + renderizador) |

B1Transfer e LessonsApp usam apenas os pontos de entrada root e `login` -- os subcaminhos `donations`, `forms` e `website` são consumidos exclusivamente por B1Admin e B1App hoje.

## Configuração para Desenvolvimento Local

Este pacote vive no workspace [Packages](https://github.com/ChurchApps/Packages) ao lado das outras bibliotecas compartilhadas:

1. Clone o workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instale as dependências na raiz do workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Inicie o playground Vite do diretório do pacote:

   ```bash
   cd apphelper && yarn dev
   ```

   O servidor de desenvolvimento do playground inicia em **http://localhost:3001**. Copie `playground/dotenv.sample` para `playground/.env` e preencha os valores necessários primeiro.

Para construir o pacote para consumo (compila para `dist/` e copia assets de locale/CSS), execute `yarn workspace @churchapps/apphelper build` -- ou `yarn build` na raiz para construir cada pacote em ordem de dependência. Para testar uma construção não publicada dentro de uma aplicação consumidora, use um portal Yarn temporário -- veja [Desenvolvimento Local Contra uma Aplicação Consumidora](./index.md#local-development-against-a-consuming-app).

:::tip
O playground é a forma mais rápida de desenvolver e testar componentes do AppHelper. Ele faz hot-reload do servidor de desenvolvimento Vite para que você possa ver as alterações em tempo real.
:::

## Publicando

Lançamentos vão através de changesets: execute `yarn changeset` na raiz do workspace com cada mudança, depois `yarn publish-all` quando pronto para lançar. Veja [Visão Geral de Bibliotecas Compartilhadas](./index.md#releasing-with-changesets) para o fluxo completo.

:::warning
Nunca remova ou renomeie uma exportação até que a substituição seja publicada e todo consumidor tenha sido migrado -- grep todos os repos consumidores antes de fazer merge de uma remoção.
:::

## Artigos Relacionados

- **[Helpers](./helpers)** -- O pacote de utilitários base usado junto com AppHelper
- **[Aplicações Web](../web-apps/)** -- As aplicações web que consomem este pacote
- **[Visão Geral de Bibliotecas Compartilhadas](./index.md)** -- Configuração de workspace, fluxo de lançamento e fluxo de local-link
