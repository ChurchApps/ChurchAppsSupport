---
title: "Estructura del Módulo"
---

# Estructura del Módulo

<div class="article-intro">

Cada módulo de la API sigue una estructura interna consistente con controladores, repositorios, modelos, y ayudantes. Comprender esta disposición hace que sea sencillo navegar el código base y agregar nueva funcionalidad a cualquier módulo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura la API localmente -- consulta [Configuración Local de API](./local-setup)
- Revisa la arquitectura de [Base de Datos](./database) para comprender la capa de acceso a datos

</div>

## Disposición de Directorio

Los módulos viven bajo `src/modules/{name}/`. Un módulo típico contiene cuatro directorios:

```
src/modules/{name}/
├── controllers/    ← Manejadores de ruta (puntos finales Express)
├── repositories/   ← Capa de acceso a datos (consultas SQL tipadas)
├── models/         ← Interfaces y tipos de TypeScript
└── helpers/        ← Lógica de negocio específica del módulo
```

Por ejemplo, el módulo de membership:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Los seis módulos de datos centrales -- membership, attendance, content, giving, messaging, y doing -- siguen todos esta disposición. Algunos módulos especializados (como reporting, que sirve reportes entre módulos y no posee datos propios) se sitúan junto a ellos bajo `src/modules/`.

## Una Aplicación, Muchos Módulos

La API es un **monolito modular**: los módulos marcan límites de organización de código y propiedad de datos, no servicios separados. Al iniciar, los controladores de cada módulo se registran en un único contenedor de inyección de dependencias detrás de una aplicación Express, así que toda la API se construye, ejecuta, e implementa como una unidad -- las funciones implementadas descritas abajo son todas puntos de entrada a esta misma aplicación.

Las rutas de cada módulo viven bajo un prefijo de URL que coincide con el nombre del módulo:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Esto mantiene la superficie de API de cada módulo autocontenida mientras los clientes todavía hablan con un único host.

## Controladores

Los controladores definen las rutas de la API para un módulo. Cada módulo tiene su propio controlador base (por ejemplo `MembershipBaseController`), que extiende el `BaseController` compartido -- construido a su vez sobre `CustomBaseController` de `@churchapps/apihelper`. Las rutas se registran con decoradores de Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = contexto de usuario autenticado
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

El `actionWrapper` autentica la solicitud e hidrata `this.repos` con los repositorios del módulo antes de ejecutar tu acción.

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

Los repositorios manejan todas las operaciones de base de datos. No hay ORM -- las consultas se escriben con el generador de consultas Kysely, tipadas contra el esquema de base de datos del módulo. El `db/index.ts` de cada módulo expone una función `getDb()` que devuelve la instancia Kysely tipada del módulo.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Dentro de un controlador, los repositorios del módulo están disponibles como `this.repos`. Fuera de los controladores, obténlos a través de `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Comunicación entre Módulos

Cada módulo posee su propia base de datos (consulta [Base de Datos](./database)), y un módulo nunca consulta las tablas de otro módulo directamente. Cuando un módulo necesita datos que posee otro -- por ejemplo, el módulo doing resolviendo personas desde membership -- pasa a través de la **puerta de enlace** del módulo propietario en `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Cada puerta de enlace (`MembershipModuleGateway`, `GivingModuleGateway`, y así sucesivamente) es una interfaz de TypeScript que define exactamente qué operaciones expone el módulo propietario al resto de la API. La interfaz es el contrato: las implementaciones actuales leen la base de datos del módulo propietario en proceso, pero porque los llamadores dependen solo de la interfaz, una implementación podría intercambiarse -- por ejemplo, por una que haga llamadas HTTP -- si un módulo alguna vez se extrajera en un servicio separado.

:::info
Si los datos que necesitas viven en otro módulo y su puerta de enlace no expone una operación para ello, extiende la interfaz de la puerta de enlace en lugar de acceder directamente a los repositorios o base de datos del otro módulo.
:::

## Autenticación y Autorización

### Autenticación JWT

Todas las solicitudes se autentican vía tokens JWT manejados por `CustomAuthProvider`. El token se valida automáticamente y el contexto de usuario autenticado (`au`) está disponible en cada acción de controlador.

### Verificaciones de Permisos

Usa `au.checkAccess()` para verificar que el usuario actual tenga el permiso requerido. Los permisos son constantes predefinidas que combinan un tipo de contenido y una acción:

```typescript
au.checkAccess(Permissions.people.view);    // Acceso de lectura
au.checkAccess(Permissions.people.edit);    // Acceso de escritura
```

Si el usuario carece del permiso requerido, se devuelve automáticamente una respuesta de error.

:::warning
Siempre llama a `au.checkAccess()` antes de realizar cualquier operación de datos. Nunca omitas las verificaciones de permisos, incluso para puntos finales aparentemente de solo lectura.
:::

## Configuración de Entorno

La clase `Environment` maneja la configuración a través de entornos:

- **Desarrollo local:** Lee del archivo `.env` en la raíz del proyecto
- **Entornos implementados:** Lee de AWS SSM Parameter Store

```typescript
// Acceder a variables de entorno
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Esta abstracción significa que tu código no necesita saber de dónde viene la configuración.

## Funciones Lambda

Cuando se implementa en AWS, la API se ejecuta como seis funciones Lambda:

| Función | Propósito |
|----------|---------|
| `web` | Maneja todas las solicitudes de la API REST HTTP |
| `socket` | Gestiona conexiones WebSocket para características en tiempo real |
| `timer15Min` | Programado cada 30 minutos para notificaciones por correo (el nombre es histórico) |
| `timerMidnight` | Programado diariamente para correos de resumen y mantenimiento |
| `timerScheduledTasks` | Programado diariamente para automatizaciones vencidas y procesamiento de flujos de trabajo atrasados |
| `timerWebhooks` | Programado cada minuto para entregar webhooks salientes en cola |

:::info
Localmente, la función `web` se ejecuta en el puerto 8084 y la función `socket` se ejecuta en el puerto 8087. Las funciones de temporizador pueden activarse manualmente durante el desarrollo.
:::

## Artículos Relacionados

- **[Base de Datos](./database)** -- Cadenas de conexión, scripts de esquema, y patrones de acceso a datos
- **[Configuración Local de API](./local-setup)** -- Guía completa paso a paso para la instalación
- **[ApiHelper](../shared-libraries/api-helper)** -- La biblioteca compartida que proporciona `CustomBaseController` y middleware de auth
