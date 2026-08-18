---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

O pacote `@churchapps/apphelper` fornece componentes React compartilhados e utilitários para todos os aplicativos web ChurchApps. É um pacote publicado único que expõe módulos de recurso através de pontos de entrada de subcaminho -- login, doações, formulários, markdown e funcionalidade de site/CMS -- ao lado de um conjunto principal de componentes e helpers compartilhados.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **Node.js** e **Git** -- veja [Pré-requisitos](../setup/prerequisites)
- Familiarize-se com o setup do [espaço de trabalho Packages](./index.md) e fluxo de liberação

</div>

## Pontos de Entrada

O pacote define exportações de subcaminho em seu `package.json`, portanto cada módulo de recurso é importável por conta própria:

| Ponto de entrada | Conteúdo |
|-------------|----------|
| `@churchapps/apphelper` | Componentes principais, helpers e hooks |
| `@churchapps/apphelper/login` | UI de login e registro |
| `@churchapps/apphelper/donations` | Componentes de doação e dar |
| `@churchapps/apphelper/forms` | Componentes de envio de formulário |
| `@churchapps/apphelper/markdown` | Editores e renderizadores Markdown e HTML |
| `@churchapps/apphelper/website` | Componentes do construtor de site e CMS |

## Quem Consome O Quê

Antes de mudar uma exportação compartilhada, verifique quais aplicativos a importam:

| Área de Exportação | O que fornece | Consumido por |
|---|---|---|
| Root -- componentes principais e hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, além de re-exportados utilitários `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- chrome do site | `SiteHeader` (nav, menu de usuário, notificações) | B1Admin, B1Transfer, LessonsApp |
| Root -- editores de conteúdo admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- encanamento em tempo real | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- stores de chat/presença | `ConversationStore`, `PresenceStore` | B1App |
| Root -- UI de notas e mensagens | `Notes` (notas de pessoal em pessoas/tarefas); `AddNote`, `SubscriptionToggle` (mensagem de membro) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- específico de Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (compartilhado); `MarkdownPreview`, `HtmlEditor` (edição de conteúdo admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (compartilhado); `FundDonations` (apenas admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderiza `ConversationalForm` quando o `displayMode` do formulário é `conversational`) | B1Admin, B1App |
| `./website` | Núcleo de renderização de página compartilhado pelo editor e renderizador (`Element` + os renderizadores por tipo resolvidos via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widgets de todo o site (`AnnouncementBanner`, `Launcher` + seus helpers `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` usado apenas pelo renderizador público | B1Admin (editor), B1App (componentes do editor + renderizador) |

B1Transfer e LessonsApp usam apenas os pontos de entrada raiz e `login` -- os subcaminhos `donations`, `forms` e `website` são consumidos exclusivamente por B1Admin e B1App hoje.

## Setup para Desenvolvimento Local

Este pacote vive no espaço de trabalho [Packages](https://github.com/ChurchApps/Packages) ao lado das outras bibliotecas compartilhadas:

1. Clone o espaço de trabalho:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instale dependências na raiz do espaço de trabalho:

   ```bash
   cd Packages && yarn install
   ```

3. Lance o playground Vite do diretório do pacote:

   ```bash
   cd apphelper && yarn dev
   ```

   O servidor dev do playground inicia em `http://localhost:3001`. Copie `playground/dotenv.sample` para `playground/.env` e preencha os valores necessários primeiro.

Para construir o pacote para consumo (compila para `dist/` e copia assets de locale/CSS), execute `yarn workspace @churchapps/apphelper build` -- ou `yarn build` na raiz para construir cada pacote em ordem de dependência. Para testar um build não publicado dentro de um aplicativo consumidor, use um portal Yarn temporário -- veja [Desenvolvimento Local Contra um Aplicativo Consumidor](./index.md#local-development-against-a-consuming-app).

:::tip
O playground é a maneira mais rápida de desenvolver e testar componentes AppHelper. Ele hot-reloada o servidor dev Vite para que você possa ver mudanças em tempo real.
:::

## Publicação

Lançamentos passam por changesets: execute `yarn changeset` na raiz do espaço de trabalho com cada mudança, depois `yarn publish-all` quando pronto para lançar. Veja [Visão Geral de Bibliotecas Compartilhadas](./index.md#releasing-with-changesets) para o fluxo completo.

:::warning
Nunca remova ou renomeie uma exportação até que a substituição seja publicada e cada consumidor tenha sido migrado -- grep todos os repos consumidores antes de mesclar uma remoção.
:::

## Artigos Relacionados

- **[Helpers](./helpers)** -- O pacote de utilitário base usado ao lado do AppHelper
- **[Aplicativos Web](../web-apps/)** -- Os aplicativos web que consomem este pacote
- **[Visão Geral de Bibliotecas Compartilhadas](./index.md)** -- Setup do espaço de trabalho, fluxo de lançamento e workflow de link local
