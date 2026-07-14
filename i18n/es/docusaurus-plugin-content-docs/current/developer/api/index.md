---
title: "API"
---

# API

<div class="article-intro">

La API de ChurchApps es un **monolito modular** -- un único código base que sirve seis módulos de datos, cada uno con su propia base de datos. Esta arquitectura te proporciona los beneficios organizacionales de los microservicios (límites claros, almacenes de datos independientes) con la simplicidad operacional de una única implementación.

</div>

## Módulos

| Módulo | Propósito |
|--------|---------|
| **Membership** | Personas, grupos, hogares, permisos |
| **Attendance** | Servicios, sesiones, registros de check-in |
| **Content** | Páginas, secciones, elementos, transmisión |
| **Giving** | Donaciones, fondos, procesamiento de pagos |
| **Messaging** | Conversaciones, notificaciones, correo |
| **Doing** | Tareas, planes, asignaciones |

## Stack Tecnológico

- **Runtime:** Node.js 22.x con TypeScript (módulos ES)
- **Framework:** Express
- **Inyección de Dependencias:** Inversify (enrutamiento basado en decoradores)
- **Base de Datos:** MySQL -- una base de datos por módulo, cada una con su propio grupo de conexiones
- **Auth:** Autenticación basada en JWT vía `CustomAuthProvider`
- **Implementación:** AWS Lambda vía Serverless Framework v3

## Puertos

| Protocolo | Puerto | Descripción |
|----------|------|-------------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexiones de socket en tiempo real |

## Funciones Lambda

Cuando se implementa en AWS, la API se ejecuta como seis funciones Lambda:

- **`web`** -- Maneja todas las solicitudes HTTP
- **`socket`** -- Gestiona conexiones WebSocket
- **`timer15Min`** -- Se ejecuta cada 30 minutos para notificaciones por correo (el nombre es histórico)
- **`timerMidnight`** -- Se ejecuta diariamente para correos de resumen y tareas de mantenimiento
- **`timerScheduledTasks`** -- Se ejecuta diariamente para automatizaciones vencidas y procesamiento de flujos de trabajo atrasados
- **`timerWebhooks`** -- Se ejecuta cada minuto para entregar webhooks salientes en cola

## Bibliotecas Compartidas

La API depende de dos paquetes compartidos de ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilidades base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilidades de servidor Express incluyendo auth, ayudantes de base de datos, e integraciones AWS

:::info
La API usa módulos ES (`"type": "module"` en `package.json`). Asegúrate de que tus importaciones usen la sintaxis de módulos ES.
:::

## En esta Sección

- **[Configuración Local](./local-setup)** -- Clonar, configurar, y ejecutar la API localmente
- **[Base de Datos](./database)** -- Arquitectura de base de datos por módulo, scripts de esquema, y patrones de acceso a datos
- **[Estructura del Módulo](./module-structure)** -- Controladores, repositorios, modelos, y autenticación
- **[Claves API](./api-keys)** -- Tokens de acceso personal para scripts y conectores
- **[Aplicaciones Conectadas (OAuth)](./connected-apps)** -- Flujo OAuth multi-inquilino para aplicaciones de terceros
- **[Webhooks](./webhooks)** -- Enviar notificaciones de eventos a sistemas externos
- **[Servidor MCP](./mcp)** -- Punto final del Protocolo de Contexto del Modelo que expone la API a asistentes de IA
- **[Referencia de Puntos Finales](./endpoints/)** -- Documentación completa de la API REST para todos los módulos
