---
title: "Arquitectura"
---

# Arquitectura

<div class="article-intro">

Estas páginas son mapas de sistema entre repositorios: documentan cómo funciona un sistema central de ChurchApps de extremo a extremo — a través de las aplicaciones, los módulos de API, y las bibliotecas compartidas — en lugar de cómo se configura cualquier proyecto individual. Léelas antes de cambiar el comportamiento de un sistema; lee [Configuración](../setup/) para ejecutar un proyecto y la [sección API](../api/) para referencia de nivel de extremo.

</div>

## El ecosistema de una ojeada

ChurchApps es ~20 repositorios independientes (no un monorepo). Las aplicaciones de cliente hablan con un pequeño conjunto de APIs de backend sobre HTTPS y WebSocket, y comparten código a través de paquetes npm publicados bajo el alcance `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clientes                      │            │  Api — monolito modular central (AWS Lambda) │
│                                │            │                                              │
│  B1Admin    panel de personal  │   HTTPS    │   membership    attendance    content        │
│  B1App      portal de miembros │ ─────────▶ │   giving        messaging     doing          │
│             + sitios web        │            │                                              │
│  B1Checkin  quiosco de registro│ ◀───WS───▶ │   una base de datos MySQL por módulo (6 total)
│  B1Mobile   (solo mantenimiento)│            └──────────────────────────────────────────────┘
│  FreePlay   reproductor contenido │          ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — backend de Lessons.church     │
                │                             └──────────────────────────────────────────────┘
                │  código compartido a través de npm (@churchapps/*)
                ▼
   helpers (interfaces entre aplicaciones) · apphelper (componentes React) · apihelper (utilidades Express/servidor)
```

Dos reglas estructurales moldean todo lo documentado en esta sección:

1. **Los módulos están aislados.** Cada módulo Api posee su base de datos y sus tablas; otros módulos y aplicaciones alcanzan sus datos solo a través de sus extremos REST. Ver [Estructura del Módulo](../api/module-structure).
2. **El código compartido se envía como paquetes npm.** Las aplicaciones nunca importan código fuente una de la otra; cualquier cosa reutilizada cruza límites de repositorio a través de `@churchapps/helpers`, `@churchapps/apphelper`, o `@churchapps/apihelper`. Ver [Bibliotecas Compartidas](../shared-libraries/).

## Mapas de sistema

| Página | Qué cubre | Abarca |
|------|----------------|-------|
| [Notificaciones y Recordatorios](./notifications) | Cómo cualquier cosa le dice a una persona algo: las dos puertas de despacho, la cadena de escalada de canal, y el motor de recordatorios | Api (messaging), B1Admin, B1App |
| [Arquitectura en Tiempo Real](../realtime) | La estructura de entrega de WebSocket detrás del chat, la presencia, y la entrega en la aplicación | Api (messaging), todas las aplicaciones web |
| [Notificaciones Push Web](../web-push) | El canal de inserción del navegador: claves VAPID, almacenamiento de suscripción, entrega | Api (messaging), todas las aplicaciones web |
| [Donaciones](./giving) | Proveedores de pago y puertas de enlace, flujos de donación, fondos/lotes, webhooks de puerta de enlace | Api (giving), apphelper, B1App, B1Admin |
| [Registros de Evento](./registrations) | El modelo de comercio de registro: tipos de asistentes, selecciones, códigos de descuento, pagos a través de la puerta de enlace de donación, y la lista de espera | Api (content + giving), B1App, B1Admin |
| [Registros](./check-ins) | Registro de quiosco y automático, el modelo de datos de asistencia, enrutamiento de sala, la capa de seguridad infantil, impresión de etiquetas | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructor de Sitios Web](./website-builder) | El árbol página/sección/elemento, el contrato de tipo de elemento y renderizadores, blog, páginas de acceso cerrado, SEO, generación de AI, formularios conversacionales | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Enrutamiento de Sitios Web y Multi-Sitio](./websites) | Cómo una solicitud se resuelve a una iglesia y un sitio específico, el modelo de datos `siteId` de multi-sitio, y el borde de dominio personalizado de Caddy | B1App, Api (membership + content), B1Admin |
| [Integraciones](./integrations) | La superficie de extensión: OAuth, claves API, webhooks, proveedores de contenido, MCP | Api, bibliotecas compartidas, aplicaciones externas |
| [Registro de Auditoría y Lotes Reversibles](./audit-log) | Auditoría activada de forma predeterminada de cada mutación en el punto de estrangulamiento del controlador, y la capa de lote que hace importaciones y acciones en masa reversibles | Api (all modules), B1Admin, B1Transfer |

:::tip
Cuando un cambio altera cómo funciona uno de estos sistemas — no solo una página dentro de una aplicación — el mapa de sistema correspondiente aquí debe actualizarse en el mismo esfuerzo. Eso mantiene esta sección confiable como la primera parada para nuevos contribuyentes.
:::
