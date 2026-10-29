---
title: "API"
---

# API

<div class="article-intro">

La API de ChurchApps es un **monolito modular**: una única base de código que atiende seis módulos de datos, cada uno con su propia base de datos. Esta arquitectura le ofrece los beneficios organizativos de los microservicios (límites claros, almacenes de datos independientes) con la simplicidad operativa de un único despliegue.

</div>

## Módulos

| Módulo | Propósito |
|--------|-----------|
| **Membership** | Personas, grupos, hogares, permisos |
| **Attendance** | Servicios, sesiones, registros de entrada |
| **Content** | Páginas, secciones, elementos, transmisión |
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

- **`web`** -- Atiende todas las solicitudes HTTP
- **`socket`** -- Administra las conexiones WebSocket
- **`timer15Min`** -- Se ejecuta cada 30 minutos para las notificaciones por correo (el nombre es histórico)
- **`timerMidnight`** -- Se ejecuta diariamente para los correos de resumen y las tareas de mantenimiento
- **`timerScheduledTasks`** -- Se ejecuta diariamente para las automatizaciones pendientes y el procesamiento de flujos de trabajo vencidos
- **`timerWebhooks`** -- Se ejecuta cada minuto para entregar los webhooks salientes en cola

## Bibliotecas compartidas

La API depende de dos paquetes compartidos de ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilidades base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilidades del servidor Express, incluidas la autenticación, los auxiliares de base de datos y las integraciones con AWS

:::info
La API usa módulos ES (`"type": "module"` en `package.json`). Asegúrese de que sus importaciones usen la sintaxis de módulos ES.
:::

## En esta sección

- **[Configuración local](./local-setup)** -- Clonar, configurar y ejecutar la API localmente
- **[Base de datos](./database)** -- Arquitectura de una base de datos por módulo, scripts de esquema y patrones de acceso a datos
- **[Estructura del módulo](./module-structure)** -- Controladores, repositorios, modelos y autenticación
- **[Claves de API](./api-keys)** -- Tokens de acceso personal para scripts y conectores
- **[Aplicaciones conectadas (OAuth)](./connected-apps)** -- Flujo OAuth multiinquilino para aplicaciones de terceros
- **[Webhooks](./webhooks)** -- Envío de notificaciones de eventos a sistemas externos
- **[Servidor MCP](./mcp)** -- Endpoint del Model Context Protocol que expone la API a asistentes de IA
- **[Referencia de endpoints](./endpoints/)** -- Documentación completa de la API REST para todos los módulos
