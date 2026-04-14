---
title: "Puntos Finales de Contenido"
---

# Puntos Finales de Contenido

<div class="article-intro">

El módulo de Contenido gestiona páginas de sitio web, secciones, elementos, bloques, sermones, listas de reproducción, servicios de transmisión, eventos, calendarios curados, archivos, galerías, traducciones de Biblia y búsquedas de versículos, canciones, arreglos, estilos globales, fotos de stock y configuración. Es el módulo más grande en la API y alimenta el CMS, medios/transmisión, planificación de adoración y características de Biblia en todas las aplicaciones ChurchApps.

</div>

**Ruta base:** `/content`

## Páginas

Ruta base: `/content/pages`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Cargar árbol de página completo por URL o ID |
| GET | `/:id` | JWT | — | Obtener una página por ID |
| GET | `/` | JWT | — | Listar todas las páginas para la iglesia |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar una página con todas las secciones y elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Guardar una página generada por IA |
| POST | `/` | JWT | Content.Edit | Crear o actualizar páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una página |

## Sermones

Ruta base: `/content/sermons`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/public/:churchId` | Public | — | Listar todos los sermones públicos para una iglesia |
| GET | `/:id` | JWT | — | Obtener un sermón por ID |
| GET | `/` | JWT | — | Listar todos los sermones |
| GET | `/lookup?videoType=&videoData=` | Public | — | Buscar metadatos de sermón desde YouTube o Vimeo |
| POST | `/` | JWT | StreamingServices.Edit | Crear o actualizar sermones (lote) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Eliminar un sermón |

## Eventos

Ruta base: `/content/events`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/group/:groupId` | JWT | — | Obtener eventos para un grupo |
| GET | `/public/group/:churchId/:groupId` | Public | — | Obtener eventos públicos para un grupo |
| GET | `/:id` | JWT | — | Obtener un evento por ID |
| POST | `/` | JWT | — | Crear o actualizar eventos (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un evento |

## Archivos

Ruta base: `/content/files`

| Método | Ruta | Auth | Permiso | Descripción |
|--------|------|------|---------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Obtener archivos por tipo de contenido e ID de contenido |
| GET | `/` | JWT | — | Listar todos los archivos para el sitio web de la iglesia |
| GET | `/:id` | JWT | — | Obtener un archivo por ID |
| POST | `/` | JWT | Content.Edit | Cargar archivos (base64) |
| POST | `/postUrl` | JWT | Content.Edit | Obtener URL de carga S3 preeimpresa |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar un archivo |

## Páginas Relacionadas

- [Puntos Finales de Membresía](./membership) -- Personas, iglesias, grupos, roles, permisos
- [Puntos Finales de Asistencia](./attendance) -- Seguimiento de servicio y visita
- [Autenticación y Permisos](./authentication) -- Flujo de inicio de sesión, JWT, modelo de permisos
- [Estructura de Módulo](../module-structure) -- Patrones de organización de código
