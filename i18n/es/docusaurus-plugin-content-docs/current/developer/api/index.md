---
title: "API"
---

# API

<div class="article-intro">

La API de ChurchApps es un **monolito modular** -- una única base de código que sirve a seis módulos distintos, cada uno con su propia base de datos. Esta arquitectura te da los beneficios organizacionales de los microservicios (límites claros, almacenes de datos independientes) con la simplicidad operacional de un único despliegue.

</div>

## Módulos

| Módulo | Propósito |
|--------|---------|
| **Membership** | Personas, grupos, hogares, permisos |
| **Attendance** | Servicios, sesiones, registros de asistencia |
| **Content** | Páginas, secciones, elementos, transmisión |
| **Giving** | Donaciones, fondos, procesamiento de pagos |
| **Messaging** | Conversaciones, notificaciones, correo |
| **Doing** | Tareas, planes, asignaciones |

## Stack Tecnológico

- **Runtime:** Node.js 22.x con TypeScript (módulos ES)
- **Framework:** Express
- **Inyección de Dependencias:** Inversify (enrutamiento basado en decoradores)
- **Base de Datos:** MySQL -- una base de datos por módulo, cada una con su propio pool de conexiones
- **Autenticación:** Autenticación basada en JWT a través de `CustomAuthProvider`
- **Despliegue:** AWS Lambda mediante Serverless Framework v3

## Puertos

| Protocolo | Puerto | Descripción |
|----------|------|-------------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexiones de socket en tiempo real |

## Funciones de Lambda

Cuando se despliega en AWS, la API se ejecuta como cuatro funciones de Lambda:

- **`web`** -- Maneja todas las solicitudes HTTP
- **`socket`** -- Gestiona conexiones WebSocket
- **`timer15Min`** -- Se ejecuta cada 15 minutos para notificaciones por correo electrónico
- **`timerMidnight`** -- Se ejecuta diariamente para resúmenes de correo electrónico y tareas de mantenimiento

## Bibliotecas Compartidas

La API depende de dos paquetes compartidos de ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilidades base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilidades de servidor Express incluyendo autenticación, ayudantes de base de datos e integraciones con AWS

:::info
La API utiliza módulos ES (`"type": "module"` en `package.json`). Asegúrate de que tus importaciones usen la sintaxis de módulos ES.
:::

## En Esta Sección

- **[Configuración Local](./local-setup)** -- Clona, configura y ejecuta la API localmente
- **[Base de Datos](./database)** -- Arquitectura de base de datos por módulo, scripts de esquema y patrones de acceso a datos
- **[Estructura de Módulos](./module-structure)** -- Controladores, repositorios, modelos y autenticación
- **[Claves de API](./api-keys)** -- Tokens de acceso personal para scripts y conectores
- **[Aplicaciones Conectadas (OAuth)](./connected-apps)** -- Flujo OAuth multiinquilino para aplicaciones de terceros
- **[Webhooks](./webhooks)** -- Notificaciones de eventos push a sistemas externos
- **[Servidor MCP](./mcp)** -- Punto final del Protocolo de Contexto de Modelos que expone la API a asistentes de IA
- **[Referencia de Puntos Finales](./endpoints/)** -- Documentación completa de la API REST para todos los módulos
