---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

El paquete `@churchapps/apphelper` proporciona componentes React compartidos y utilidades para todas las aplicaciones web de ChurchApps. Es un paquete único publicado que expone módulos de características a través de puntos de entrada de ruta de subpaquete -- inicio de sesión, donaciones, formularios, markdown y funcionalidad de sitio web/CMS -- junto con un conjunto central de componentes y helpers compartidos.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instala **Node.js** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Familiarízate con la configuración del [espacio de trabajo de Paquetes](./index.md) y flujo de lanzamiento

</div>

## Puntos de Entrada

El paquete define exportaciones de ruta de subpaquete en su `package.json`, así que cada módulo de características es importable por sí solo:

| Punto de Entrada | Contenidos |
|-------------|----------|
| `@churchapps/apphelper` | Componentes principales, helpers y hooks |
| `@churchapps/apphelper/login` | Interfaz de usuario de inicio de sesión y registro |
| `@churchapps/apphelper/donations` | Componentes de donación y donación |
| `@churchapps/apphelper/forms` | Componentes de envío de formulario |
| `@churchapps/apphelper/markdown` | Editores y renderizadores de markdown y HTML |
| `@churchapps/apphelper/website` | Componentes del generador de sitios web y CMS |

## Quién Consume Qué

Antes de cambiar una exportación compartida, verifica qué aplicaciones la importan:

| Área de Exportación | Lo que Proporciona | Consumido por |
|---|---|---|
| Raíz -- componentes principales y hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, más utilidades de `@churchapps/helpers` re-exportadas (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Raíz -- cromo del sitio | `SiteHeader` (navegación, menú de usuario, notificaciones) | B1Admin, B1Transfer, LessonsApp |
| Raíz -- editores de contenido administrativo | `ImageEditor`, `HelpIcon` | B1Admin |
| Raíz -- plomería de tiempo real | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Raíz -- almacenes de chat/presencia | `ConversationStore`, `PresenceStore` | B1App |
| Raíz -- notas y interfaz de usuario de mensajería | `Notes` (notas del personal en personas/tareas); `AddNote`, `SubscriptionToggle` (mensajería de miembros) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Raíz -- específico de Lecciones | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (compartido); `MarkdownPreview`, `HtmlEditor` (edición de contenido administrativo) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (compartido); `FundDonations` (solo administrativo) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderiza `ConversationalForm` cuando el `displayMode` del formulario es `conversational`) | B1Admin, B1App |
| `./website` | Núcleo de renderización de página compartido por el editor y renderizador (`Element` + los renderizadores por tipo resueltos vía `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widgets en todo el sitio (`AnnouncementBanner`, `Launcher` + sus helpers `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` usados solo por el renderizador orientado al público | B1Admin (editor), B1App (componentes de editor + renderizador) |

B1Transfer y LessonsApp usan solo los puntos de entrada raíz y `login` -- los subpaquetes `donations`, `forms` y `website` son consumidos exclusivamente por B1Admin y B1App hoy.

## Configuración para Desarrollo Local

Este paquete vive en el espacio de trabajo [Paquetes](https://github.com/ChurchApps/Packages) junto con las otras bibliotecas compartidas:

1. Clona el espacio de trabajo:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instala dependencias en la raíz del espacio de trabajo:

   ```bash
   cd Packages && yarn install
   ```

3. Lanza el campo de juego de Vite desde el directorio del paquete:

   ```bash
   cd apphelper && yarn dev
   ```

   El servidor dev del campo de juego comienza en `http://localhost:3001`. Copia `playground/dotenv.sample` a `playground/.env` y completa los valores requeridos primero.

Para construir el paquete para consumo (compila a `dist/` y copia activos de locale/CSS), ejecuta `yarn workspace @churchapps/apphelper build` -- o `yarn build` en la raíz para construir cada paquete en orden de dependencia. Para probar una compilación no publicada dentro de una aplicación consumidora, usa un portal Yarn temporal -- ver [Desarrollo Local Contra una Aplicación Consumidora](./index.md#local-development-against-a-consuming-app).

:::tip
El campo de juego es la forma más rápida de desarrollar y probar componentes de AppHelper. Se recarga en caliente el servidor dev de Vite para que puedas ver cambios en tiempo real.
:::

## Publicación

Los lanzamientos van a través de changesets: ejecuta `yarn changeset` en la raíz del espacio de trabajo con cada cambio, luego `yarn publish-all` cuando estés listo para lanzar. Ver la [Descripción General de Bibliotecas Compartidas](./index.md#releasing-with-changesets) para el flujo completo.

:::warning
Nunca elimines o renombres una exportación hasta que el reemplazo esté publicado y cada consumidor haya sido migrado -- busca en todos los repositorios consumidores antes de fusionar una eliminación.
:::

## Artículos Relacionados

- **[Helpers](./helpers)** -- El paquete de utilidad base usado junto a AppHelper
- **[Aplicaciones Web](../web-apps/)** -- Las aplicaciones web que consumen este paquete
- **[Descripción General de Bibliotecas Compartidas](./index.md)** -- Configuración del espacio de trabajo, flujo de lanzamiento y flujo de vinculación local
