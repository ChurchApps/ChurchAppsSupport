---
title: "Estructura de Módulo"
---

# Estructura de Módulo

<div class="article-intro">

Cada módulo de API sigue una estructura interna consistente con controladores, repositorios, modelos y ayudantes. Comprender este diseño permite navegar fácilmente por la base de código y agregar nuevas funcionalidades a cualquier módulo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configurar la API localmente -- ver [Configuración Local de API](./local-setup)
- Revisar la arquitectura [Base de Datos](./database) para entender la capa de acceso a datos

</div>

## Diseño de Directorio

Cada módulo vive bajo `src/modules/{name}/` y contiene cuatro directorios:

```
src/modules/{name}/
├── controllers/    ← Controladores de ruta (puntos de conexión Express)
├── repositories/   ← Capa de acceso a datos (SQL directo)
├── models/         ← Interfaces de TypeScript y tipos
└── helpers/        ← Lógica de negocio específica del módulo
```

Por ejemplo, el módulo de membresía:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Controladores

Los controladores definen las rutas de API para un módulo. Extienden `CustomBaseController` de `@churchapps/apihelper` y utilizan decoradores de Inversify para registro de rutas.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = contexto de usuario autenticado
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... lógica de guardar
    });
  }
}
```

### Decoradores de Ruta

| Decorador | Método HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

El decorador `@controller("/base")` establece la ruta base para todas las rutas en el controlador.

## Repositorios

Los repositorios manejan todas las operaciones de base de datos utilizando SQL directo a través de `DB.query()`. No hay ORM -- escribe SQL directamente.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // Lógica de INSERT o UPDATE
  }
}
```

Acceda a repositorios a través de `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Autenticación y Autorización

### Autenticación JWT

Todas las solicitudes se autentican a través de tokens JWT manejados por `CustomAuthProvider`. El token se valida automáticamente y el contexto de usuario autenticado (`au`) está disponible en cada acción del controlador.

### Verificaciones de Permiso

Use `au.checkAccess()` para verificar que el usuario actual tiene el permiso requerido:

```typescript
au.checkAccess("People", "View");    // Acceso de lectura
au.checkAccess("People", "Edit");    // Acceso de escritura
```

Si al usuario le falta el permiso requerido, se devuelve automáticamente una respuesta de error.

:::warning
Siempre llame a `au.checkAccess()` antes de realizar cualquier operación de datos. Nunca omita verificaciones de permisos, incluso para puntos de conexión aparentemente de solo lectura.
:::

## Configuración de Entorno

La clase `Environment` maneja la configuración entre entornos:

- **Desarrollo local:** Lee desde el archivo `.env` en la raíz del proyecto
- **Entornos desplegados:** Lee desde AWS SSM Parameter Store

```typescript
// Acceder a variables de entorno
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Esta abstracción significa que su código no necesita saber de dónde proviene la configuración.

## Funciones de Lambda

Cuando se despliega en AWS, la API se ejecuta como cuatro funciones de Lambda:

| Función | Propósito |
|---------|---------|
| `web` | Maneja todas las solicitudes de API REST HTTP |
| `socket` | Gestiona conexiones de WebSocket para características en tiempo real |
| `timer15Min` | Programada cada 15 minutos para notificaciones por correo |
| `timerMidnight` | Programada diariamente para correos resumen y mantenimiento |

:::info
Localmente, la función `web` se ejecuta en el puerto 8084 y la función `socket` se ejecuta en el puerto 8087. Las funciones del temporizador se pueden activar manualmente durante el desarrollo.
:::

## Artículos Relacionados

- **[Base de Datos](./database)** -- Cadenas de conexión, scripts de esquema y patrones de acceso a datos
- **[Configuración Local de API](./local-setup)** -- Guía completa paso a paso de configuración
- **[ApiHelper](../shared-libraries/api-helper)** -- La biblioteca compartida que proporciona `CustomBaseController` y middleware de autenticación
