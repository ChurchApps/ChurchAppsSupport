---
title: "Base de Datos"
---

# Base de Datos

<div class="article-intro">

La API de ChurchApps utiliza una arquitectura de **base de datos por módulo**. Cada uno de los seis módulos tiene su propia base de datos MySQL con un grupo de conexiones independiente, proporcionando límites de datos claros manteniendo todo dentro de un único despliegue.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **MySQL 8.0+** -- ver [Requisitos Previos](../setup/prerequisites)
- Configurar cadenas de conexión de base de datos en su archivo `.env` -- ver [Variables de Entorno](../setup/environment-variables)

</div>

## Descripción General de la Arquitectura

```
Api
├── membership_db   ← Personas, grupos, permisos
├── attendance_db   ← Servicios, sesiones, registros
├── content_db      ← Páginas, secciones, elementos
├── giving_db       ← Donaciones, fondos, pagos
├── messaging_db    ← Conversaciones, notificaciones
└── doing_db        ← Tareas, planes, asignaciones
```

### Decisiones Clave de Diseño

- **Una base de datos por módulo** -- Cada módulo mantiene su propia base de datos MySQL con un grupo de conexiones dedicado (`EnhancedPoolHelper`). Esto mantiene los módulos desacoplados y permite que la evolución del esquema sea independiente.
- **Patrón de repositorio con SQL directo** -- No hay ORM. Todo acceso a datos va a través de clases de repositorio que ejecutan SQL directamente usando `DB.query()`. Esto da control total sobre el rendimiento y comportamiento de las consultas.
- **Multi-inquilino por diseño** -- Cada consulta está delimitada por `churchId`. Todas las tablas incluyen una columna `churchId`, y la capa del repositorio impone aislamiento de inquilinos automáticamente.

## Cadenas de Conexión

Cada conexión de base de datos de módulo se configura en `.env` usando el formato estándar de cadena de conexión MySQL:

```
mysql://user:password@host:port/database
```

Por ejemplo, una configuración local de desarrollo podría verse así:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
En producción, las cadenas de conexión se almacenan en AWS SSM Parameter Store y se leen mediante la clase `Environment` al iniciar.
:::

## Scripts de Esquema

Los scripts de esquema de base de datos se encuentran en el directorio `tools/dbScripts/`, organizados por módulo:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Estos scripts definen la creación de tablas, índices y cualquier dato semilla necesario.

## Inicialización de Base de Datos

### Inicializar todas las bases de datos

```bash
npm run initdb
```

Esto crea las seis bases de datos y ejecuta los scripts de esquema para cada una.

### Inicializar un módulo único

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Cuando trabaja en un módulo específico, puede reinicializar solo la base de datos de ese módulo sin afectar los demás.
:::

## Patrón de Acceso a Datos

Los repositorios acceden a datos a través del método `DB.query()`. Un método de repositorio típico se vería así:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Se obtienen repositorios a través de `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Siempre incluya `churchId` en sus consultas para mantener el aislamiento multi-inquilino. Nunca consulte entre inquilinos a menos que tenga una razón específica y autorizada para hacerlo.
:::

## Artículos Relacionados

- **[Estructura de Módulo](./module-structure)** -- Cómo se organizan los controladores y repositorios dentro de cada módulo
- **[Configuración Local de API](./local-setup)** -- Guía completa paso a paso de configuración
