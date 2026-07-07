---
title: "Puntos finales de contenido"
---

# Puntos finales de contenido

<div class="article-intro">

El módulo de contenido gestiona páginas del sitio web, secciones, elementos, bloques, publicaciones de blog, redireccionamientos, sermones, listas de reproducción, servicios de transmisión, eventos, calendarios curados, archivos, galerías, traducciones bíblicas y búsquedas de versículos, canciones, arreglos, estilos globales, fotos de stock y configuración. Es el módulo más grande en la API y alimenta el CMS, características de medios/transmisión, planificación de adoración y características bíblicas en todas las aplicaciones de ChurchApps.

</div>

**Ruta base:** `/content`

## Páginas

Ruta base: `/content/pages`

| Método | Ruta | Autenticación | Permiso | Descripción |
|--------|------|-------|---------|-------------|
| GET | `/:churchId/tree?url=&id=` | Público | — | Cargar árbol completo de página (secciones, elementos, bloques) por URL o ID. Quita IDs internos cuando se obtienen por URL. Las búsquedas basadas en URL aplican `pages.visibility`: una página cerrada devuelve `{ restricted: true, visibility }` a menos que el JWT (opcional) satisfaga la puerta |
| GET | `/public/:churchId` | Público | — | Enumera páginas públicas (`url`, `title`, `metaDescription`); solo `visibility = everyone` |
| GET | `/:id` | JWT | — | Obtener una página por ID |
| GET | `/` | JWT | — | Enumera todas las páginas de la iglesia |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicar una página con todas las secciones y elementos |
| POST | `/temp/ai` | JWT | Content.Edit | Guardar una página generada por IA (página, secciones y elementos en una llamada) |
| POST | `/` | JWT | Content.Edit | Crear o actualizar páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Eliminar una página |

### Ejemplo: Cargar árbol de página

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Página relacionada

- [Arquitectura del generador de sitios web](../../architecture/website-builder) -- Cómo se encajan páginas, secciones, elementos, publicaciones y redireccionamientos en toda la aplicación
- [Puntos finales de membresía](./membership) — Personas, iglesias, grupos, roles, permisos
- [Puntos finales de asistencia](./attendance) — Servicio y rastreo de visitas
- [Autenticación y permisos](./authentication) — Flujo de inicio de sesión, JWT, modelo de permiso
- [Estructura del módulo](../module-structure) — Patrones de organización del código
