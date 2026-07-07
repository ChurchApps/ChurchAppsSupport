---
title: "Estructura del módulo"
---

# Estructura del módulo

<div class="article-intro">

Cada módulo de la API sigue una estructura interna consistente con controladores, repositorios, modelos y ayudantes.

</div>

## Disposición de directorio

Los módulos viven bajo `src/modules/{name}/`. Un módulo típico contiene cuatro directorios:

```
src/modules/{name}/
├── controllers/    ← Manejadores de ruta
├── repositories/   ← Capa de acceso a datos
├── models/         ← Interfaces y tipos
└── helpers/        ← Lógica empresarial
```

## Controladores

Los controladores definen las rutas de la API para un módulo.

### Decoradores de ruta

| Decorador | Método HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

## Artículos relacionados

- **[Base de datos](./database)** -- Arquitectura de base de datos
- **[Configuración local de API](./local-setup)** -- Guía de configuración
