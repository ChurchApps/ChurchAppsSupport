---
title: "Arquitectura"
---

# Arquitectura

<div class="article-intro">

Estas páginas son mapas de sistema entre repositorios: documentan cómo funciona un sistema central de ChurchApps de extremo a extremo — en todas las aplicaciones, los módulos de API y las bibliotecas compartidas — en lugar de cómo se configura un solo proyecto. Léelas antes de cambiar el comportamiento de un sistema; lee [Configuración](../setup/) para poner en funcionamiento un proyecto y la [sección API](../api/) para referencia a nivel de punto final.

</div>

## El ecosistema de un vistazo

ChurchApps es ~20 repositorios independientes (no un monorepo). Las aplicaciones cliente hablan con un pequeño conjunto de APIs backend sobre HTTPS y WebSocket, y comparten código a través de paquetes npm publicados bajo el alcance `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clientes                      │            │  Api — monolito modular central (AWS Lambda) │
│                                │            │                                              │
│  B1Admin    panel de personal  │   HTTPS    │   membresía  asistencia   contenido          │
│  B1App      portal de miembros │ ─────────▶ │   dar        mensajería   haciendo          │
│             sitios web iglesia │            │                                              │
│  B1Checkin  quiosco registro   │ ◀───WS───▶ │   una base de datos MySQL por módulo (6 totales) │
│  B1Mobile   (solo mantenimiento│            └──────────────────────────────────────────────┘
│  FreePlay   reproductor contenido TV      │            │                             └──────────────────────────────────────┘
└───────────────┬────────────────┘            │  LessonsApi — Backend de Lessons.church         │
                │                             └──────────────────────────────────────────────┘
                │  código compartido vía npm (@churchapps/*)
                ▼
   helpers (interfaces entre aplicaciones) · apphelper (componentes React) · apihelper (utilidades Express/servidor)
```

Dos reglas estructurales dan forma a todo lo documentado en esta sección:

1. **Los módulos están aislados.** Cada módulo de Api posee su base de datos y sus tablas; otros módulos y aplicaciones llegan a sus datos solo a través de sus puntos finales REST. Consulta [Estructura de Módulo](../api/module-structure).
2. **El código compartido se envía como paquetes npm.** Las aplicaciones nunca importan el código fuente de otras; cualquier cosa reutilizada cruza límites de repositorio a través de `@churchapps/helpers`, `@churchapps/apphelper` o `@churchapps/apihelper`. Consulta [Bibliotecas Compartidas](../shared-libraries/).

## Mapas del sistema

| Página | Lo que cubre | Abarca |
|--------|----------------|-------|
| [Notificaciones y Recordatorios](./notifications) | Cómo algo le dice algo a una persona: las dos puertas de envío, la cadena de escalada de canal y el motor de recordatorio | Api (mensajería), B1Admin, B1App |
| [Arquitectura en Tiempo Real](../realtime) | El marco de entrega WebSocket detrás de chat, presencia y entrega en la aplicación | Api (mensajería), todas las aplicaciones web |
| [Notificaciones Web Push](../web-push) | El canal push del navegador: claves VAPID, almacenamiento de suscripción, entrega | Api (mensajería), todas las aplicaciones web |
| [Dar Dinero](./giving) | Proveedores y puertas de pago, flujos de donación, fondos/lotes, webhooks de puerta | Api (dar), apphelper, B1App, B1Admin |
| [Registros de Eventos](./registrations) | El modelo de comercio de registro: tipos de asistentes, selecciones, códigos de descuento, pagos a través de la puerta de dar, y la lista de espera | Api (contenido + dar), B1App, B1Admin |
| [Registros de Asistencia](./check-ins) | Quiosco y auto registro de asistencia, el modelo de datos de asistencia, enrutamiento de salas, la capa de seguridad infantil, impresión de etiquetas | B1Checkin, B1App, B1Admin, Api (asistencia + membresía) |
| [Constructor de Sitio Web](./website-builder) | El árbol página/sección/elemento, el contrato de tipo de elemento y renderizadores, blog, páginas con cierre de acceso, SEO y generación de IA | Api (contenido), AskApi, helpers/apphelper, B1Admin, B1App |
| [Enrutamiento y Sitios Múltiples del Sitio Web](./websites) | Cómo una solicitud se resuelve en una iglesia y un sitio específico, el modelo de datos `siteId` de múltiples sitios y el borde de dominio personalizado de Caddy | B1App, Api (membresía + contenido), B1Admin |
| [Integraciones](./integrations) | La superficie de extensión: OAuth, claves API, webhooks, proveedores de contenido, MCP | Api, bibliotecas compartidas, aplicaciones externas |
| [Registro de Auditoría y Lotes Deshacer](./audit-log) | Auditoría activada por defecto de cada mutación en el punto de estrangulamiento del controlador, y la capa de lote que hace importaciones y acciones masivas deshacer | Api (todos los módulos), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | El servicio pagado de almacenamiento y crédito de mensajería de texto: identidad JWT compartida, S2S de clave de servicio, las costuras del proveedor de almacenamiento y mensajería, facturación de Stripe | MinistryStuffApi, MinistryStuffWeb, Api (contenido + mensajería), paquetes texting/apihelper, B1Admin |
| [Traer Tu Propio Almacenamiento](./byos-storage) | Las iglesias vinculan Google Drive, Dropbox, OneDrive o un depósito compatible con S3 para subidas más allá de los 100 MB gratis: conectar OAuth, formas de carga por proveedor, la redirección de descarga pública | Api (contenido + membresía), paquetes helpers/apphelper, B1Admin, B1App |

:::tip
Cuando un cambio altera cómo funciona uno de estos sistemas — no solo una página dentro de una aplicación — el mapa del sistema de coincidencia aquí debe actualizarse en el mismo esfuerzo. Eso mantiene esta sección confiable como la primera parada para nuevos colaboradores.
:::
