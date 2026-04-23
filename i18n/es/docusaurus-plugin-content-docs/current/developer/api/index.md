---
title: "API"
---

# API

<div class="article-intro">

La API de ChurchApps es un **monolito modular** -- un único código fuente que sirve a seis módulos distintos, cada uno con su propia base de datos. Esta arquitectura le proporciona los beneficios organizacionales de los microservicios (límites claros, almacenes de datos independientes) con la simplicidad operacional de un único despliegue.

</div>

## Módulos

| Módulo | Propósito |
|--------|---------|
| **Membresía** | Personas, grupos, hogares, permisos |
| **Asistencia** | Servicios, sesiones, registros de registro |
| **Contenido** | Páginas, secciones, elementos, transmisión en directo |
| **Giving** | Donaciones, fondos, procesamiento de pagos |
| **Mensajería** | Conversaciones, notificaciones, correo |
| **Doing** | Tareas, planes, asignaciones |

## Pila Tecnológica

- **Runtime:** Node.js 22.x con TypeScript (módulos ES)
- **Framework:** Express
- **Inyección de Dependencias:** Inversify (enrutamiento basado en decorador)
- **Base de Datos:** MySQL -- una base de datos por módulo, cada una con su propio grupo de conexiones
- **Autenticación:** Autenticación basada en JWT a través de `CustomAuthProvider`
- **Despliegue:** AWS Lambda a través de Serverless Framework v3

## Puertos

| Protocolo | Puerto | Descripción |
|-----------|--------|-------------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexiones de socket en tiempo real |

## Funciones de Lambda

Cuando se despliega en AWS, la API se ejecuta como cuatro funciones de Lambda:

- **`web`** -- Maneja todas las solicitudes HTTP
- **`socket`** -- Gestiona conexiones de WebSocket
- **`timer15Min`** -- Se ejecuta cada 15 minutos para notificaciones por correo
- **`timerMidnight`** -- Se ejecuta diariamente para correos resumen y tareas de mantenimiento

## Bibliotecas Compartidas

La API depende de dos paquetes compartidos de ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilidades base (DateHelper, ApiHelper, etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilidades del servidor Express incluyendo autenticación, ayudantes de base de datos e integraciones de AWS

:::info
La API utiliza módulos ES (`"type": "module"` en `package.json`). Asegúrese de que sus importaciones utilicen la sintaxis del módulo ES.
:::

## En Esta Sección

- **[Configuración Local](./local-setup)** -- Clonar, configurar y ejecutar la API localmente
- **[Base de Datos](./database)** -- Arquitectura de base de datos por módulo, scripts de esquema y patrones de acceso a datos
- **[Estructura de Módulo](./module-structure)** -- Controladores, repositorios, modelos y autenticación
- **[Referencia de Puntos de Conexión](./endpoints/)** -- Documentación completa de API REST para todos los módulos
