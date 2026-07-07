---
title: "API"
---

# API

<div class="article-intro">

La API de ChurchApps es un **monolito modular** -- un único código que sirve seis módulos de datos, cada uno con su propia base de datos. Esta arquitectura te proporciona los beneficios organizacionales de los microservicios (límites claros, almacenes de datos independientes) con la simplicidad operacional de una única implementación.

</div>

## Módulos

| Módulo | Propósito |
|--------|---------|
| **Membership** | Personas, grupos, familias, permisos |
| **Attendance** | Servicios, sesiones, registros de asistencia |
| **Content** | Páginas, secciones, elementos, transmisión |
| **Giving** | Donaciones, fondos, procesamiento de pagos |
| **Messaging** | Conversaciones, notificaciones, correo |
| **Doing** | Tareas, planes, asignaciones |

## En esta sección

- **[Configuración local](./local-setup)** -- Clonar, configurar y ejecutar la API localmente
- **[Estructura del módulo](./module-structure)** -- Controladores, repositorios, modelos y autenticación
- **[Servidor MCP](./mcp)** -- Punto final del Protocolo de contexto del modelo que expone la API a asistentes de IA
