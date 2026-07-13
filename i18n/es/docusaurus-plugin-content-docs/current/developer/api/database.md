---
title: "Base de datos"
---

# Base de datos

<div class="article-intro">

La API de ChurchApps utiliza una arquitectura de **base de datos por módulo**. Cada uno de los seis módulos de datos tiene su propia base de datos MySQL con un grupo de conexiones independiente, proporcionando límites de datos claros mientras se mantiene todo dentro de una única implementación.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **MySQL 8.0+** -- ve [Requisitos previos](../setup/prerequisites)
- Configura las cadenas de conexión de base de datos en tu archivo `.env` -- ve [Variables de entorno](../setup/environment-variables)

</div>

## Descripción general de la arquitectura

```
Api
├── membership_db   ← Personas, grupos, permisos
├── attendance_db   ← Servicios, sesiones, registros
├── content_db      ← Páginas, secciones, elementos
├── giving_db       ← Donaciones, fondos, pagos
├── messaging_db    ← Conversaciones, notificaciones
└── doing_db        ← Tareas, planes, asignaciones
```

### Decisiones clave de diseño

- **Una base de datos por módulo** -- Cada módulo mantiene su propia base de datos MySQL con un grupo de conexiones dedicado (gestionado por `KyselyPool`). Esto mantiene los módulos desacoplados y permite la evolución independiente del esquema.
- **Propiedad exclusiva** -- Las tablas de un módulo son leídas y escritas solo por el código de ese módulo. Cuando otro módulo necesita los datos, llama a la puerta de enlace del módulo propietario en lugar de consultar las tablas directamente; ve [Comunicación entre módulos](./module-structure#cross-module-communication).
- **Patrón de repositorio sin un ORM** -- Todo el acceso a datos va a través de clases de repositorio que construyen SQL escrito con el generador de consultas Kysely contra el esquema del módulo. Esto da control total sobre el rendimiento y comportamiento de la consulta.
- **Multi-inquilino por diseño** -- Cada consulta está limitada por `churchId`. Todas las tablas incluyen una columna `churchId`, y la capa del repositorio aplica el aislamiento del inquilino automáticamente.

## Cadenas de conexión

Cada conexión de base de datos del módulo se configura en `.env` usando el formato de cadena de conexión MySQL estándar:

```
mysql://user:password@host:port/database
```

Por ejemplo, una configuración de desarrollo local podría verse así:

Cada módulo lee su conexión desde una variable de entorno llamada `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
En producción, las cadenas de conexión se almacenan en AWS SSM Parameter Store y son leídas por la clase `Environment` al iniciar.
:::

## Scripts de esquema

Los esquemas de tabla se definen como migraciones de Kysely en el directorio `tools/migrations/`, organizadas por módulo:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Las migraciones definen la creación de tablas, índices y cambios de esquema. El directorio `tools/dbScripts/` contiene datos de demostración y semilla que se pueden cargar sobre el esquema.

## Inicialización de base de datos

### Inicializar todas las bases de datos

```bash
npm run initdb
```

Esto crea las seis bases de datos y ejecuta las migraciones para cada una.

### Inicializar un solo módulo

```bash
npm run initdb -- --module=membership
```

:::tip
Cuando trabajes en un módulo específico, puedes reinicializar solo la base de datos de ese módulo sin afectar a los demás.
:::

## Patrón de acceso a datos

Los repositorios construyen consultas con el generador de consultas Kysely contra el esquema de base de datos escrita del módulo, obtenido a través de la función `getDb()` del módulo. Un método típico de repositorio se ve así:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Los repositorios se obtienen a través de `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Siempre incluye `churchId` en tus consultas para mantener el aislamiento de inquilino múltiple. Nunca consultes entre inquilinos a menos que tengas una razón específica y autorizada para hacerlo.
:::

## Referencias entre módulos

Debido a que los datos de cada módulo viven en una base de datos separada, no hay claves ajenas o uniones SQL en los límites del módulo. Un registro que se relaciona con los datos de otro módulo almacena el `id` de ese registro; por ejemplo, una donación en la base de datos de donaciones lleva el `personId` de una persona en la base de datos de membresía, y cualquier composición entre módulos ocurre en el código de aplicación.

Esta restricción es lo que hace que los límites del módulo sean reales: cada esquema puede evolucionar independientemente, la base de datos de un módulo puede moverse a su propio servidor, e incluso un módulo podría extraerse en un servicio independiente sin desenredar tablas compartidas o consultas entre bases de datos.

## Artículos relacionados

- **[Estructura del módulo](./module-structure)** -- Cómo se organizan los controladores y repositorios dentro de cada módulo
- **[Configuración local de API](./local-setup)** -- Guía completa paso a paso para la instalación