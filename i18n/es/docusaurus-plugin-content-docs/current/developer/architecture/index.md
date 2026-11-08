---
title: "Arquitectura"
description: "Mapas de sistemas entre repositorios que muestran cómo funcionan las donaciones, los registros de entrada, las notificaciones y los sitios web entre B1 Admin, B1.church y la API, antes de realizar cambios."
---

# Arquitectura

<div class="article-intro">

Estas páginas son mapas de sistemas entre repositorios: documentan cómo funciona de extremo a extremo un sistema central de ChurchApps, abarcando las aplicaciones, los módulos de la API y las bibliotecas compartidas, en lugar de explicar cómo configurar un proyecto concreto. Léalas antes de modificar el comportamiento de un sistema; lea [Configuración](../setup/index.md) para poner en marcha un proyecto y la [sección de API](../api/index.md) para la referencia a nivel de endpoints.

</div>

## El ecosistema de un vistazo

ChurchApps está formado por unos 20 repositorios independientes (no es un monorepo). Las aplicaciones cliente se comunican con un pequeño conjunto de APIs de backend mediante HTTPS y WebSocket, y comparten código a través de paquetes npm publicados bajo el ámbito `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clientes                      │            │  Api — monolito modular central (AWS Lambda) │
│                                │            │                                              │
│  B1Admin    panel del personal │   HTTPS    │   membresía    asistencia    contenido       │
│  B1App      portal de miembros │ ─────────▶ │   donaciones   mensajería    grupos          │
│             + sitios de iglesia│            │                                              │
│  B1Checkin  kiosco de registro │ ◀───WS───▶ │   una base de datos MySQL por módulo (6)     │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   reproductor de TV  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — backend de Lessons.church      │
                │                             └──────────────────────────────────────────────┘
                │  código compartido vía npm (@churchapps/*)
                ▼
   helpers (interfaces entre aplicaciones) · apphelper (componentes React) · apihelper (utilidades Express/servidor)
```

Dos reglas estructurales determinan todo lo documentado en esta sección:

1. **Los módulos están aislados.** Cada módulo de la API es dueño de su base de datos y de sus tablas; los demás módulos y aplicaciones solo acceden a sus datos a través de sus endpoints REST. Consulte [Estructura de módulos](../api/module-structure.md).
2. **El código compartido se distribuye como paquetes npm.** Las aplicaciones nunca importan el código fuente de otras; todo lo que se reutiliza cruza los límites de los repositorios mediante `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`. Consulte [Bibliotecas compartidas](../shared-libraries/index.md).

## Mapas de sistemas

| Página | Qué cubre | Abarca |
|------|----------------|-------|
| [Notificaciones y recordatorios](./notifications.md) | Cómo se le comunica algo a una persona: las dos puertas de envío, la cadena de escalado entre canales y el motor de recordatorios | Api (mensajería), B1Admin, B1App |
| [Arquitectura en tiempo real](../realtime.md) | El marco de entrega por WebSocket que sustenta el chat, la presencia y la entrega dentro de la aplicación | Api (mensajería), todas las aplicaciones web |
| [Notificaciones push web](../web-push.md) | El canal de notificaciones push del navegador: claves VAPID, almacenamiento de suscripciones y entrega | Api (mensajería), todas las aplicaciones web |
| [Donaciones](./giving.md) | Proveedores de pago y pasarelas, flujos de donación, fondos/lotes y webhooks de las pasarelas | Api (donaciones), apphelper, B1App, B1Admin |
| [Registros de eventos](./registrations.md) | El modelo comercial de inscripciones: tipos de asistente, selecciones, códigos de descuento, pagos a través de la pasarela de donaciones y la lista de espera | Api (contenido + donaciones), B1App, B1Admin |
| [Registros de entrada](./check-ins.md) | Registro en kiosco y autoregistro, el modelo de datos de asistencia, el enrutamiento de salas, la capa de protección infantil e impresión de etiquetas | B1Checkin, B1App, B1Admin, Api (asistencia + membresía) |
| [Constructor de sitios web](./website-builder.md) | El árbol de páginas/secciones/elementos, el contrato de tipos de elemento y sus renderizadores, el blog, las páginas con acceso restringido, SEO y la generación con IA | Api (contenido), AskApi, helpers/apphelper, B1Admin, B1App |
| [Enrutamiento de sitios web y multisitio](./websites.md) | Cómo una solicitud se asocia con una iglesia y un sitio concreto, el modelo de datos multisitio `siteId` y el borde de dominios personalizados con Caddy | B1App, Api (membresía + contenido), B1Admin |
| [Integraciones](./integrations.md) | La superficie de extensión: OAuth, claves de API, webhooks, proveedores de contenido, MCP | Api, bibliotecas compartidas, aplicaciones externas |
| [Registro de auditoría y lotes reversibles](./audit-log.md) | Auditoría activada por defecto de cada modificación en el punto de control de los controladores, y la capa de lotes que hace reversibles las importaciones y las acciones masivas | Api (todos los módulos), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | El servicio de pago de almacenamiento y créditos de mensajes de texto: identidad mediante JWT compartido, S2S con clave de servicio, los puntos de integración de proveedores de mensajes y almacenamiento, y la facturación con Stripe | MinistryStuffApi, MinistryStuffWeb, Api (contenido + mensajería), paquetes de mensajes de texto/apihelper, B1Admin |
| [Almacenamiento propio (BYOS)](./byos-storage.md) | Las iglesias vinculan Google Drive, Dropbox, OneDrive o un bucket compatible con S3 para subidas más allá de los 100 MB gratuitos: conexión OAuth, formas de subida por proveedor y la redirección pública de descarga | Api (contenido + membresía), paquetes helpers/apphelper, B1Admin, B1App |
| [Commons de contenido](./commons.md) | La base compartida de recursos y envíos que sustenta el contenido generado por usuarios entre productos, y la cola de moderación única, solo para personal, en la Administración del servidor de B1Admin | Api (módulo commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Cuando un cambio altere el funcionamiento de uno de estos sistemas —no solo de una página dentro de una aplicación—, el mapa de sistema correspondiente de esta sección debe actualizarse en el mismo esfuerzo. Así esta sección sigue siendo fiable como primer punto de consulta para los nuevos colaboradores.
:::

## Propuestas

Estos documentos describen trabajos propuestos para su revisión, no el comportamiento del producto disponible.

| Propuesta | Qué cubre |
|---|---|
| [BYOK de Twilio](./twilio-byok-proposal.md) | Cuenta, claves, servicio y número de teléfono propiedad de la iglesia; alcance de la integración, consentimiento, entrega, estimaciones y verificaciones de publicación |
| [Borrador de incorporación de iglesias a Twilio](./twilio-byok-onboarding-draft.md) | Ajustes propuestos para el formulario de registro de B1, ejemplos de campañas específicas para iglesias y listas de verificación de aprobación y operación |
