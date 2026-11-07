---
title: "API"
description: "Explica el diseño de monolito modular de la API de ChurchApps, sus seis módulos de datos, la pila tecnológica, los puertos y las funciones Lambda, con enlaces a la documentación de configuración, base de datos, autenticación y endpoints para desarrolladores."
---

# API

<div class="article-intro">

La API de ChurchApps es un **monolito modular**: una sola base de código que sirve a seis módulos de datos, cada uno con su propia base de datos. Esta arquitectura ofrece los beneficios organizativos de los microservicios (límites claros, almacenes de datos independientes) con la sencillez operativa de un único despliegue.

</div>

## Módulos

| Módulo | Propósito |
|--------|-----------|
| **Membership** | Personas, grupos, hogares, permisos |
| **Attendance** | Servicios, sesiones, registros de entrada |
| **Content** | Páginas, secciones, elementos, transmisión en vivo |
| **Giving** | Donaciones, fondos, procesamiento de pagos |
| **Messaging** | Conversaciones, notificaciones, correo electrónico |
| **Doing** | Tareas, planes, asignaciones |

## Stack tecnológico

- **Runtime:** Node.js 24.x con TypeScript (módulos ES)
- **Framework:** Express
- **Inyección de dependencias:** Inversify (enrutamiento basado en decoradores)
- **Base de datos:** MySQL: una base de datos por módulo, cada una con su propio pool de conexiones
- **Autenticación:** autenticación basada en JWT mediante `CustomAuthProvider`
- **Despliegue:** AWS Lambda mediante Serverless Framework v3

## Puertos

| Protocolo | Puerto | Descripción |
|-----------|--------|-------------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexiones de socket en tiempo real |

## Funciones Lambda

Cuando se despliega en AWS, la API se ejecuta como seis funciones Lambda:

- **`web`**: atiende todas las solicitudes HTTP
- **`socket`**: administra las conexiones WebSocket
- **`timer15Min`**: se ejecuta cada 30 minutos para las notificaciones por correo electrónico (el nombre es histórico)
- **`timerMidnight`**: se ejecuta diariamente para los correos de resumen y las tareas de mantenimiento
- **`timerScheduledTasks`**: se ejecuta diariamente para las automatizaciones vencidas y el procesamiento de flujos de trabajo atrasados
- **`timerWebhooks`**: se ejecuta cada minuto para entregar los webhooks salientes en cola

## Bibliotecas compartidas

La API depende de dos paquetes compartidos de ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers.md)**: utilidades base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper.md)**: utilidades del servidor Express, incluidas la autenticación, los auxiliares de base de datos y las integraciones con AWS

:::info
La API usa módulos ES (`"type": "module"` en `package.json`). Asegúrese de que sus importaciones usen la sintaxis de módulos ES.
:::

## En esta sección

- **[Configuración local](./local-setup.md)**: clone, configure y ejecute la API localmente
- **[Base de datos](./database.md)**: arquitectura de una base de datos por módulo, scripts de esquema y patrones de acceso a datos
- **[Estructura de módulos](./module-structure.md)**: controladores, repositorios, modelos y autenticación
- **[Claves de API](./api-keys.md)**: tokens de acceso personales para scripts y conectores
- **[Aplicaciones conectadas (OAuth)](./connected-apps.md)**: flujo OAuth multiinquilino para aplicaciones de terceros
- **[Webhooks](./webhooks.md)**: envíe notificaciones de eventos a sistemas externos
- **[Servidor MCP](./mcp.md)**: endpoint del Protocolo de contexto de modelos que expone la API a asistentes de IA
- **[Referencia de endpoints](./endpoints/index.md)**: documentación REST completa de la API para todos los módulos
