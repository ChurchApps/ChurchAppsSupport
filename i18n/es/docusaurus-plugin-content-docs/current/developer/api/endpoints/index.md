---
title: "Referencia de Puntos de Conexión"
---

# Referencia de Puntos de Conexión

<div class="article-intro">

Esta sección documenta todos los puntos de conexión REST expuestos por la API de ChurchApps. Cada página de módulo lista cada ruta con su método HTTP, ruta, requisitos de autenticación y permisos requeridos.

</div>

## URL Base

| Entorno | URL |
|---------|-----|
| Desarrollo local | `http://localhost:8084` |
| Producción | `https://api.churchapps.org` |

## Convenciones de Solicitud

- **Content-Type:** Todos los cuerpos de solicitud y respuesta utilizan `application/json`
- **Multi-inquilino:** Toda solicitud autenticada está delimitada a un `churchId` extraído del token JWT -- no pasa `churchId` en la URL
- **Guardados por lotes:** La mayoría de los puntos de conexión `POST` aceptan una **matriz de objetos**. La API insertará registros nuevos (sin campo `id`) y actualizará los existentes (con campo `id`) en una única llamada
- **IDs:** Todos los IDs de entidad son UUIDs

### Ejemplo: Guardar por Lotes

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

El primer objeto se crea (nuevo); el segundo se actualiza (tiene `id`).

## Formato de Respuesta

Las respuestas exitosas devuelven JSON -- ya sea un objeto único o una matriz. Las respuestas de error utilizan códigos de estado HTTP estándar:

| Código | Significado |
|--------|-------------|
| `200` | Éxito |
| `400` | Solicitud incorrecta (errores de validación) |
| `401` | No autorizado (token faltante/inválido o permisos insuficientes) |
| `404` | No encontrado |
| `500` | Error del servidor |

Los errores de validación devuelven:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Cómo Leer Tablas de Puntos de Conexión

Cada página de módulo organiza los puntos de conexión por controlador. Las tablas utilizan estas columnas:

| Columna | Descripción |
|---------|-------------|
| **Método** | Método HTTP (`GET`, `POST`, `DELETE`) |
| **Ruta** | Ruta relativa a la ruta base del controlador |
| **Autenticación** | **JWT** = requiere token de portador, **Público** = no se requiere autenticación |
| **Permiso** | Permiso requerido (p. ej. `Personas.Editar`). `—` significa cualquier usuario autenticado |
| **Descripción** | Lo que hace el punto de conexión |

Los controladores que extienden la clase base CRUD estándar proporcionan cuatro puntos de conexión automáticamente: `GET /` (listar todos), `GET /:id` (obtener por ID), `POST /` (crear/actualizar) y `DELETE /:id` (eliminar).

## Módulo de Reporting

El módulo Reporting funciona diferente de los otros módulos. En lugar de CRUD respaldado por base de datos, carga definiciones de informe de archivos JSON en disco y ejecuta consultas SQL parametrizadas.

| Método | Ruta | Autenticación | Descripción |
|--------|------|---------------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Cargar una definición de informe por nombre clave |
| GET | `/reporting/reports/:keyName/run` | JWT | Ejecutar un informe y devolver resultados |

Los parámetros del informe se pasan como valores de cadena de consulta (p. ej. `?startDate=2024-01-01&endDate=2024-12-31`). El parámetro `churchId` se inyecta automáticamente desde el token JWT. Cada definición de informe puede especificar sus propios requisitos de permisos.

## Índice de Módulos

| Módulo | Ruta Base | Descripción |
|--------|-----------|-------------|
| [Autenticación](./authentication) | `/membership/users`, `/membership/oauth` | Inicio de sesión, registro, tokens JWT, OAuth, permisos |
| [Membresía](./membership) | `/membership/*` | Personas, iglesias, grupos, hogares, roles, formularios, configuración |
| [Asistencia](./attendance) | `/attendance/*` | Ubicaciones, servicios, sesiones, visitas, registros de registro |
| [Contenido](./content) | `/content/*` | Páginas, sermones, eventos, archivos, galerías, Biblia, transmisión en directo |
| [Giving](./giving) | `/giving/*` | Donaciones, fondos, pasarelas de pago, suscripciones |
| [Mensajería](./messaging) | `/messaging/*` | Conversaciones, notificaciones, dispositivos, SMS |
| [Doing](./doing) | `/doing/*` | Planes, tareas, asignaciones, automatizaciones, programación |
