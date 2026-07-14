---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

El paquete `@churchapps/apphelper` proporciona componentes React compartidos y utilidades para todas las aplicaciones web de ChurchApps. Es un único paquete publicado que expone módulos de características a través de puntos de entrada de subruta -- login, donaciones, formularios, markdown, y funcionalidad de sitio web/CMS -- junto con un conjunto central de componentes y ayudantes compartidos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js** y **Git** -- consulta [Requisitos Previos](../setup/prerequisites)
- Familiarízate con la configuración del [espacio de trabajo Packages](./index.md) y el flujo de lanzamiento

</div>

## Puntos de Entrada

El paquete define exportaciones de subruta en su `package.json`, así que cada módulo de característica es importable por sí mismo:

| Punto de entrada | Contenidos |
|-------------|----------|
| `@churchapps/apphelper` | Componentes, ayudantes, y hooks principales |
| `@churchapps/apphelper/login` | Interfaz de inicio de sesión y registro |
| `@churchapps/apphelper/donations` | Componentes de donaciones |
| `@churchapps/apphelper/forms` | Componentes de envío de formulario |
| `@churchapps/apphelper/markdown` | Editores y renderizadores de Markdown y HTML |
| `@churchapps/apphelper/website` | Componentes de generador de sitios web y CMS |

## Quién Consume Qué

Antes de cambiar una exportación compartida, verifica qué aplicaciones la importan:

| Área de exportación | Qué proporciona | Consumido por |
|---|---|---|
| Raíz -- componentes y hooks principales | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, más utilidades re-exportadas de `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Raíz -- chrome del sitio | `SiteHeader` (nav, menú de usuario, notificaciones) | B1Admin, B1Transfer, LessonsApp |
| Raíz -- editores de contenido admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Raíz -- infraestructura en tiempo real | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Raíz -- almacenes de chat/presencia | `ConversationStore`, `PresenceStore` | B1App |
| Raíz -- notas y UI de mensajería | `Notes` (notas de personal sobre personas/tareas); `AddNote`, `SubscriptionToggle` (mensajería de miembros) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Raíz -- específico de Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (compartido); `MarkdownPreview`, `HtmlEditor` (edición de contenido admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (compartido); `FundDonations` (solo admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderiza `ConversationalForm` cuando el `displayMode` del formulario es `conversational`) | B1Admin, B1App |
| `./website` | Núcleo de renderizado de página compartido por el editor y el renderizador (`Element` + los renderizadores por tipo resueltos vía `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widgets de todo el sitio (`AnnouncementBanner`, `Launcher` + sus ayudantes `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` usados solo por el renderizador orientado al público | B1Admin (editor), B1App (componentes de editor + renderizador) |

B1Transfer y LessonsApp usan solo los puntos de entrada raíz y `login` -- las subrutas `donations`, `forms`, y `website` son consumidas exclusivamente por B1Admin y B1App hoy.

## Configuración para Desarrollo Local

Este paquete vive en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages) junto con las otras bibliotecas compartidas:

1. Clona el espacio de trabajo:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instala dependencias en la raíz del espacio de trabajo:

   ```bash
   cd Packages && yarn install
   ```

3. Lanza el playground de Vite desde el directorio del paquete:

   ```bash
   cd apphelper && yarn dev
   ```

   El servidor de desarrollo del playground se inicia en **http://localhost:3001**. Copia `playground/dotenv.sample` a `playground/.env` y completa los valores requeridos primero.

Para compilar el paquete para consumo (compila a `dist/` y copia recursos de locale/CSS), ejecuta `yarn workspace @churchapps/apphelper build` -- o `yarn build` en la raíz para compilar cada paquete en orden de dependencia. Para probar una compilación no publicada dentro de una aplicación consumidora, usa un portal Yarn temporal -- consulta [Desarrollo Local Contra una Aplicación Consumidora](./index.md#local-development-against-a-consuming-app).

:::tip
El playground es la forma más rápida de desarrollar y probar componentes de AppHelper. Recarga en caliente el servidor de desarrollo de Vite para que puedas ver los cambios en tiempo real.
:::

## Publicación

Los lanzamientos pasan por changesets: ejecuta `yarn changeset` en la raíz del espacio de trabajo con cada cambio, luego `yarn publish-all` cuando estés listo para lanzar. Consulta la [Descripción General de Bibliotecas Compartidas](./index.md#releasing-with-changesets) para el flujo completo.

:::warning
Nunca elimines o renombres una exportación hasta que el reemplazo esté publicado y cada consumidor haya sido migrado -- busca con grep en todos los repositorios consumidores antes de fusionar una eliminación.
:::

## Artículos Relacionados

- **[Helpers](./helpers)** -- El paquete de utilidades base usado junto con AppHelper
- **[Aplicaciones Web](../web-apps/)** -- Las aplicaciones web que consumen este paquete
- **[Descripción General de Bibliotecas Compartidas](./index.md)** -- Configuración del espacio de trabajo, flujo de lanzamiento, y flujo de trabajo de enlace local
