---
title: "Registro de Auditoría y Lotes Reversibles"
---

# Registro de Auditoría y Lotes Reversibles

<div class="article-intro">

Cada mutación iniciada por el usuario en la Api se registra — quién, qué, cuándo, y desde dónde — en todos los módulos, sin necesidad de cableado por controlador. En la parte superior de ese libro mayor se encuentra una capa de lotes: una importación o acción en masa puede etiquetarse como un lote y luego **deshacerse** fila por fila, al estilo de Planning Center. Ambos viven en una única tabla `auditLogs` en la base de datos de membresía y se controlan enteramente desde un punto de estrangulamiento, `BaseController.actionWrapper`. Esta página mapea qué se audita, dónde viven los datos, los compromisos de rendimiento que los moldean, y cómo deshacer revierte un lote de forma segura sin transacciones entre bases de datos.

</div>

## Descripción General

```
cada solicitud de mutación (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derivar {module, entityType, category, action}
        │                         desde req.baseUrl + método  (AUDIT_REGISTRY = anulaciones/exclusiones solamente)
        │
        ├─ modo normal ─────────▶ ejecutar acción ─▶ esperar AuditLogHelper.log(después-de-valores)  ──┐
        │                                        (los deletes también capturan una imagen anterior)     │
        │                                                                                  ▼
        └─ X-Batch-Id presente ──▶ captura imágenes antes (estricta) ─▶ ejecutar acción ─▶ filas de auditoría etiquetadas batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (base datos membresía, una tabla, todos los módulos)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ caminar filas en reversa, por entidad ┘
                                          guardia de conflictos → restaurar / eliminar / reinserta
```

Dos hechos estructurales impulsan todo lo siguiente:

1. **La capa de controlador es el único lugar que conoce al actor.** Los repositorios nunca ven `AuthenticatedUser`; solo los controladores tienen `au`. El `actionWrapper` de cada módulo ya pasa por `BaseController`, así que ese es donde se engancha la auditoría — no cambian las firmas del repositorio en ningún lugar.
2. **Una tabla sirve a todos los módulos.** Las filas de auditoría para donaciones, asistencia, contenido, etc. se escriben todas en la tabla `auditLogs` de la base datos de membresía a través de `RepoManager.getRepos("membership")`, incluso desde un controlador que no es de membresía. "Todo lo que Jane cambió hoy" se mantiene como una única consulta.

## Qué se audita

La auditoría es **activada de forma predeterminada para cada verbo que muta en cada ruta**. `actionWrapper` deriva los campos de auditoría de la solicitud sin configuración por ruta:

| Campo | Derivado de |
|-------|--------------|
| `module` | `this.moduleName` (el módulo propietario) |
| `entityType` | último segmento singularizado de `req.baseUrl` (p. ej. `/membership/people` → `person`) |
| `category` | por defecto a `entityType` |
| `action` | `${entityType}_saved` para `POST /`, `${entityType}_deleted` para `DELETE /:id`, de lo contrario `${entityType}_${method}:${routePath}` por lo que las subrutas no CRUD (p. ej. `task_post:/:id/move`) se capturan automáticamente |

`BaseController.AUDIT_REGISTRY` es **solo para anulaciones y exclusiones** — no es una lista de permitidos. Una ruta aparece allí para renombrar su categoría/entityType, para declarar `{ dbModule, table }` (que la hace capaz de lote y deshacer), para marcarla `sensitive` (auditar mutaciones anónimas), o para apagarla con `optOut: true`.

**Lista de exclusión** (rutas de escritura de manguera de incendios que saturarían el libro mayor): asistencia `visits` / `visitsessions` / `sessions` / `checkin` (la tormenta de registro del domingo) y mensajería `messages` / `connections` / `devices` (chat y presencia). Todo lo demás se registra.

**Extremos masivos** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) se registran en `BULK_ROUTES` y emiten **una fila de auditoría por id tocado**, por lo que una importación de 10k personas produce 10k filas — esa granularidad por entidad es exactamente lo que hace el lote reversible.

**Mutaciones anónimas** (`actionWrapperAnon` — donación de invitado, registro de invitado, envíos de formularios) se auditan solo para rutas `sensitive` de registro, escritas con `userId="anonymous"` más la IP del cliente. Las donaciones encabezan la lista; ese camino tiene un verdadero historial de regresión.

### Redacción de secretos y límites de tamaño

Antes de que cualquier carga útil de `details` se almacene, `AuditLogHelper.capDetails()` ejecuta `sanitizeValue()` sobre ella:

- **Las claves secretas se redactan.** Cualquier campo cuyo nombre en minúsculas esté en `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) se reemplaza con `"[redacted]"`.
- **Los escalares enormes se eliminan.** Cualquier `data:` URI o cadena de más de 4 KB (fotos base64, blobs) se convierte en `"[stripped]"`.
- **Las filas de tamaño excesivo se limitan.** Si el JSON serializado supera ~64 KB, toda la carga útil se reemplaza con `{ truncated: true }`. Las filas truncadas aún son visibles — pero **no se pueden deshacer** (no hay imagen anterior/posterior para restaurar).

## Dónde viven los datos

Una única tabla `auditLogs` en la base de datos de **membresía** respalda cada módulo. Columnas: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. La migración `tools/migrations/membership/2026-07-04_audit_universal.ts` agrega `module` + `batchId`, amplía `details` de `TEXT` a `MEDIUMTEXT`, agrega índices `ix_auditLogs_batch (batchId)` e `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, y crea la tabla `batches`. La columna `module` existe precisamente para que las colisiones `entityType` entre módulos (`note`, `setting` existen en varios) permanezcan filtrables, y el índice de entidad es lo que impulsa tanto el historial por entidad como la guardia de conflictos de deshacer.

Las escrituras entre módulos van a través de `RepoManager.getRepos("membership")` desde dentro del contenedor. El orden es deliberado: **la escritura principal se confirma en la base de datos del módulo primero, la inserción de auditoría en segundo lugar.** En modo normal, una falla de inserción de auditoría se rechaza (`console.error`, Sentry lo recoge) — la auditoría es consultiva y nunca debe fallar en la solicitud de un usuario. En **modo de lote es estricta** (ver abajo).

:::info ¿Por qué no triggers, CDC, o tablas por módulo?
- Los **triggers de MySQL** no conocen al usuario que actúa (la conexión no tiene `au`), y significarían mantener conjuntos de triggers en cada esquema.
- **binlog / CDC** es un proyecto completo de infraestructura con el mismo problema de identidad del actor.
- **Enhebrar `userId` a través de cada repositorio** requeriría tocar cientos de archivos para mover información que la capa de controlador ya tiene.
- **Tablas de auditoría por módulo** significarían 7× el cableado y consultas de abanico para cualquier pregunta entre módulos. Una tabla en el punto de estrangulamiento del controlador es el diseño de código más pequeño que aún captura al actor.
:::

## Postura de rendimiento

La ruta activa es deliberadamente barata; el costo se paga solo donde compra algo.

- **Sin lectura-antes-escritura en actualizaciones normales.** Un guardado regular **no** carga el registro anterior. Los **valores posteriores presentados** se almacenan en `details.after`; la interfaz de usuario reconstruye viejo→nuevo en *tiempo de visualización* comparándola contra la fila de auditoría anterior de la entidad. Una consulta en tiempo de visualización, costo cero en tiempo de escritura. Los campos nunca tocados desde el lanzamiento simplemente no muestran valor "anterior" — aceptable.
- **Los eliminados obtienen una imagen anterior.** `DELETE /:id` en una ruta de registro con `{ dbModule, table }` carga la fila genéricamente primero y la almacena en `details.before`. Los eliminados son raros y la imagen anterior es el valor forense completo.
- **El modo de lote es el único de lectura-antes-escritura sistemático**, y es opcional — una operación masiva/importación ya es costosa, por lo que las lecturas de instantánea N son el precio del deshacer.
- **Las inserciones de auditoría se esperan.** `actionWrapper` recopila las promesas de registro y `awaita Promise.allSettled(...)` antes de regresar. Esta es la invariante más importante: en Lambda el contenedor **congela el instante en que la respuesta regresa**, por lo que una inserción no esperada se silencia. "Disparar y olvidar" aquí significa *los errores nunca fallan en la solicitud*, no *no esperar* — una única inserción en el grupo de membresía ya cálido es ~1–3 ms.

## Lotes y deshacer

Un **lote** agrupa un conjunto de mutaciones para que puedan revisarse y revertirse juntas. Hay dos formas de abrir uno:

- **Explícito:** `POST /membership/batches { label, source }` devuelve un `batchId`. El cliente (B1Transfer, una interfaz de usuario de importación de B1Admin) luego envía `X-Batch-Id: <id>` en cada guardado/eliminación posterior. `POST /membership/batches/:id/complete` lo cierra y marca `itemCount`.
- **Implícito:** los cuatro extremos masivos abren, populan y completan su propio lote dentro de la única solicitud, devolviendo el `batchId` en la respuesta.

La tabla `batches` (base de datos de membresía): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### El modo de lote es estricto

Cuando `X-Batch-Id` está presente, `actionWrapper` aprieta cada guardia (`writeBatchAuditRows`):

1. El lote debe existir, estar `open`, y pertenecer a `au.churchId` — de lo contrario **403**.
2. La ruta debe ser capaz de lote (`{ dbModule, table }` en el registro) — de lo contrario **400**.
3. Antes de que la acción se ejecute, las imágenes anteriores de todos los ids afectados se cargan en **una** consulta `WHERE id IN (...) AND churchId = ?`. Si esa lectura de instantánea falla, la solicitud **falla 500 y la acción no se ejecuta** — el modo de lote nunca debe producir un libro mayor sin deshacer en silencio. (El modo normal, por el contrario, es lo mejor que puede hacer y rechaza silenciosamente los fallos de instantánea).
4. Después de que la acción tenga éxito, una fila de auditoría por entidad se escribe con `batchId`, `details.before`, y `details.after`, más un **marcador de crear** explícito para filas que el lote creó.

### Deshacer

`POST /membership/batches/:id/undo` (permiso: creador de lote u `Permissions.server.admin`). Se rechaza si el lote no es `completed` o es más antiguo que la **ventana de deshacer de 30 días**. `BatchUndoHelper.undo()` entonces:

1. Carga las filas de auditoría del lote y **las agrupa por `(module, entityType, entityId)`.** Una entidad tocada varias veces dentro de un lote se revierte **una vez**, de vuelta a su verdadero estado anterior al lote — la imagen anterior más antigua, o una eliminación si el lote la creó. Por eso deshacer no repite ingenua cada fila: restaurar una instantánea de mitad de lote sería incorrecto.
2. Para cada entidad, ejecuta primero la **guardia de conflictos**: `auditLog.hasLaterModification()` pregunta si existe alguna *entrada de auditoría posterior* para ese mismo `(module, entityType, entityId)` fuera de este lote. Si es así, la entidad se editó después de la importación — se **omite y se reporta**, nunca se sobrescribe. Esto reutiliza el propio registro de auditoría como detector de modificación; no se necesitan columnas `modifiedAt` en ninguna tabla.
3. Revierte según la operación registrada, resolviendo `{ dbModule, table }` del registro y usando escrituras genéricas de Kysely:
   - **created** → eliminar duramente la fila.
   - **updated** → escribir `details.before` de vuelta.
   - **deleted** → reinsertar `details.before` (actualizar o insertar si una fila con ese id resurgió).
4. Cada reversión se audita a sí misma (`action: "<entityType>_undone"`, sin `batchId` — deshacer de deshacer está fuera del alcance).

La operación se elige del **marcador de crear** explícito, no se infiere de una imagen anterior faltante — una imagen anterior legítimamente vacía o una fila truncada no deben confundirse con una creación.

El resultado de la carga útil es `{ restored, skippedConflicts: [...], failed: [...], status }`; el lote se mueve a `undone` (limpio) o `partial`. **No hay transacción entre bases de datos** — deshacer es lo mejor que puede hacer por fila, la misma limitación que Planning Center documenta para perfiles combinados.

:::warning Las entidades con efectos secundarios necesitan un gancho `onUndo`
Revertir una creación de `groupMember` también debe escribir `groupMemberHistory` ("izquierda"), o los análisis de rotación se rompen silenciosamente — una invariante del espacio de trabajo permanente. Tales entidades registran una devolución de llamada `onUndo` en `AUDIT_REGISTRY` que devuelve `true` cuando ha manejado completamente la reversión, omitiendo la ruta genérica. `groupMembers` es el caso canónico (con clave por id de fila en la ruta explícita pero por `personId` en extremos masivos, e históricamente rastreado en cada agregar/eliminar).
:::

## Superficies del consumidor

Ambas superficies de administración son **en progreso**; la intención:

| Superficie | Repo | Propósito |
|---------|------|---------|
| **Página de Registro de Auditoría** | B1Admin (ManageChurch → Audit Log) | Filtrar por módulo/categoría/usuario/entidad e renderizar diffs antiguos→nuevos — para ediciones comparando contra la entrada anterior de la entidad, para eliminaciones de `details.before`. Respaldado por `GET /membership/auditlogs`, cerrado por `Permissions.server.admin`. |
| **Página de Lotes** | B1Admin (mismo centro de Configuración) | Listar lotes con estado y recuentos, **Ver Resultados** (las filas de auditoría del lote a través de `GET /membership/batches/:id/results`), y un botón **Deshacer** que muestra el informe de conflicto omitido / fallido. |
| **Lotes de importación** | B1Transfer | Abrir un lote, enviar `X-Batch-Id` en sus llamadas de guardado normales, completar al final — las importaciones se vuelven reversibles sin nuevos extremos de importación. El legado `importKey` permanece como marcador de linaje solo de creaciones, superado para deshacer. |

## Gotchas que un cambio futuro no debe regresar

- **Las inserciones de auditoría deben permanecer esperadas.** Un `AuditLogHelper.log(...)` no esperado se cae por la congelación de Lambda. Recopila promesas y `espera Promise.allSettled` antes de regresar.
- **Kysely deja `undefined` fuera de `.set()`/`.values()`.** En restauración, una columna borrada sobreviviría sin cambios. `BatchUndoHelper` convierte cada campo ausente a `null` explícito (`nullify`) — nunca lo omitas por una escritura "más rápida".
- **La retención debe permanecer muy por encima de la ventana de deshacer.** `AuditLogRepo.deleteOld()` se ejecuta en el temporizador nocturno (retención predeterminada de 365 días); la ventana de deshacer es de 30 días. Si la retención alguna vez se acerca a la ventana, los libros mayores de deshacer se purifican fuera de lotes abiertos.
- **Las filas truncadas no se pueden deshacer.** Una carga útil `{ truncated: true }` no tiene imagen anterior/posterior; deshacer la reporta como `failed`, nunca adivina.
- **El orden es módulo-escritura-luego-auditoría.** Nunca muevas la inserción de auditoría adelante de la escritura real, y mantenla estricta en lote / consultiva en normal.

## Inventario de archivos

| Área | Archivos |
|------|-------|
| Contenedor / registro | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, instantánea + escribir-filas) |
| Motor Deshacer | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Ayudante Auditoría | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controladores | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modelos / repositorios | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migración | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Interfaz de usuario de administrador (en progreso) | Páginas de Registro de Auditoría + Lotes de B1Admin; encabezado de lote de importación de B1Transfer |

## Páginas Relacionadas

- [Estructura del Módulo](../api/module-structure) — cómo un controlador que no es de membresía alcanza los repositorios de membresía a través de `RepoManager`
- [Donaciones](./giving) — los caminos de escritura de donación que se auditan como `sensitive` incluso cuando son anónimos
- [Extremos de Membresía](../api/endpoints/membership) — la superficie REST que lleva `X-Batch-Id` y expone `/auditlogs` y `/batches`
