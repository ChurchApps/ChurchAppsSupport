---
title: "Arquitectura"
---

# Arquitectura

<div class="article-intro">

Estas páginas son mapas de sistemas entre repositorios: documentan cómo funciona de principio a fin un sistema central de ChurchApps (a través de las aplicaciones, los módulos de la API y las bibliotecas compartidas), en lugar de cómo se configura un proyecto concreto. Léalas antes de cambiar el comportamiento de un sistema; lea [Configuración](../setup/) para poner en marcha un proyecto y la [sección de API](../api/) para la referencia de endpoints.

</div>

## El ecosistema de un vistazo

ChurchApps está formado por unos 20 repositorios independientes (no es un monorepo). Las aplicaciones cliente se comunican con un pequeño conjunto de APIs de backend a través de HTTPS y WebSocket, y comparten código mediante paquetes npm publicados bajo el ámbito `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dos reglas estructurales determinan todo lo que se documenta en esta sección:

1. **Los módulos están aislados.** Cada módulo de la API es dueño de su base de datos y sus tablas; los demás módulos y aplicaciones solo acceden a sus datos a través de sus endpoints REST. Consulte [Estructura de módulos](../api/module-structure).
2. **El código compartido se distribuye como paquetes npm.** Las aplicaciones nunca importan el código fuente de otras; todo lo que se reutiliza cruza los límites de los repositorios mediante `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`. Consulte [Bibliotecas compartidas](../shared-libraries/).

## Mapas de sistemas

| Página | Qué cubre | Abarca |
|------|----------------|-------|
| [Notificaciones y recordatorios](./notifications) | Cómo algo le comunica algo a una persona: las dos puertas de envío, la cadena de escalado entre canales y el motor de recordatorios | Api (messaging), B1Admin, B1App |
| [Tiempo real](../realtime) | El marco de entrega por WebSocket que sustenta el chat, la presencia y la entrega dentro de la aplicación | Api (messaging), todas las aplicaciones web |
| [Notificaciones push web](../web-push) | El canal de push del navegador: claves VAPID, almacenamiento de suscripciones, entrega | Api (messaging), todas las aplicaciones web |
| [Donaciones](./giving) | Proveedores de pago y pasarelas, flujos de donación, fondos y lotes, webhooks de las pasarelas | Api (giving), apphelper, B1App, B1Admin |
| [Registros a eventos](./registrations) | El modelo comercial de los registros: tipos de asistente, selecciones, códigos de descuento, pagos a través de la pasarela de donaciones y la lista de espera | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins) | Check-in en kiosco y propio, el modelo de datos de asistencia, el enrutamiento a las salas, la capa de seguridad infantil, la impresión de etiquetas | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructor de sitios web](./website-builder) | El árbol de páginas, secciones y elementos, el contrato de tipos de elemento y sus renderizadores, el blog, las páginas con acceso restringido, el SEO y la generación con IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Enrutamiento de sitios web y multisitio](./websites) | Cómo una solicitud se resuelve en una iglesia y un sitio concreto, el modelo de datos multisitio con `siteId` y el borde de dominios personalizados con Caddy | B1App, Api (membership + content), B1Admin |
| [Integraciones](./integrations) | La superficie de extensión: OAuth, claves de API, webhooks, proveedores de contenido, MCP | Api, bibliotecas compartidas, aplicaciones externas |
| [Registro de auditoría y lotes reversibles](./audit-log) | Auditoría activa por defecto de cada mutación en el punto de control de los controladores, y la capa de lotes que hace reversibles las importaciones y las acciones masivas | Api (todos los módulos), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | El servicio de pago de almacenamiento y créditos de mensajes de texto: identidad mediante JWT compartido, S2S con clave de servicio, los puntos de integración de proveedores de mensajes y almacenamiento, facturación con Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paquetes texting/apihelper, B1Admin |
| [Almacenamiento propio (BYOS)](./byos-storage) | Las iglesias vinculan Google Drive, Dropbox, OneDrive o un bucket compatible con S3 para subidas que superen los 100 MB gratuitos: conexión OAuth, formas de subida por proveedor, redirección de descarga pública | Api (content + membership), paquetes helpers/apphelper, B1Admin, B1App |
| [Contenido común](./commons) | La base compartida de recursos y envíos detrás del contenido generado por usuarios entre productos, y la cola de moderación única de uso exclusivo del personal en Administración del servidor de B1Admin | Api (módulo commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Cuando un cambio altera el funcionamiento de uno de estos sistemas, y no solo de una página dentro de una aplicación, el mapa de sistema correspondiente de aquí debe actualizarse en el mismo trabajo. Así esta sección sigue siendo fiable como primer punto de consulta para los nuevos colaboradores.
:::

## Propuestas

Estos documentos describen trabajo propuesto para revisión, y no comportamiento disponible del producto.

| Propuesta | Qué cubre |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Cuenta, claves, servicio y número de teléfono propiedad de la iglesia; alcance de la integración, consentimiento, entrega, estimaciones y verificaciones de publicación |
| [Borrador de incorporación de iglesias a Twilio](./twilio-byok-onboarding-draft) | Ajustes propuestos para el formulario de registro de B1, ejemplos de campañas específicas para iglesias y listas de verificación de aprobación y operación |
