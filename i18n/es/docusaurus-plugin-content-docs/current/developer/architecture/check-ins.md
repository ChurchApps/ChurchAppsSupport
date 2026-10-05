---
title: "Registros de Asistencia"
---

# Registros de Asistencia

<div class="article-intro">

El registro de asistencia es un sistema con tres puertas delanteras: la aplicación de quiosco B1Checkin para estaciones atendidas y de autoservicio, el registro de asistencia dentro del portal de miembros B1App y la asistencia del lado del administrador en B1Admin. Los tres escriben en el mismo módulo de asistencia en la Api central, y el enrutamiento de aulas está completamente impulsado por Grupos — no hay ninguna entidad "ubicaciones" o "salas" separada. Una capa de seguridad infantil se sienta encima: tipos de registro de asistencia por visita, puertas de capacidad y relación de voluntarios del lado del servidor, elegibilidad de edad/grado del lado del quiosco, verificación de recogida de confianza al momento de retiro y búsqueda de padres a través del proveedor de mensajería de texto de la iglesia. Esta página mapea el modelo de datos, los flujos de registro de asistencia, la capa de seguridad y la tubería de impresión de etiquetas.

</div>

## Descripción General

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Ruta de impresión de etiqueta (solo quiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superficie | Repo | Pila | Rol |
|---------|------|-------|------|
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivo expo-router; compilaciones EAS para Android, Amazon Fire e iOS; actualizaciones OTA a través de `expo-updates` | Estación atendida o de autoservicio con impresión de etiquetas y retiro verificado |
| Registro de asistencia de autoservicio | `B1App` | Next.js (portal de miembros b1.church) | Los miembros conectados registran su hogar desde un teléfono; sin impresión |
| Admin | `B1Admin` | Aplicación React SPA | Configura la estructura del servicio, asigna grupos a tiempos de servicio, diseña etiquetas, registra asistencia manual, ejecuta informes |

Los tres llaman a los mismos dos módulos API a través de `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo demás.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecado aquí — los campus se dominan en el módulo de membresía (`/membership/campuses`); la copia de asistencia está congelada como solo lectura para lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Un encuentro recurrente, por ejemplo, "Domingo por la Mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Un intervalo de tiempo dentro de un servicio, por ejemplo, "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué tiempos de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha — creado perezosamente en tiempo de registro de asistencia (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona asistiendo en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado), establecido por el quiosco y consumido por las puertas de capacidad/relación |
| `visitSessions` | visitId, sessionId | Cuál(es) sesión(es) cubre una visita — un niño registrado en dos tiempos de servicio obtiene dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Diseños de etiqueta designables (`models/LabelTemplate.ts`) |

### Cómo se persiste un registro de asistencia completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) maneja `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es una matriz de objetos `Visit`, cada uno con `visitSessions` cuyas `session` incrustadas nombran solo un par `(serviceTimeId, groupId)`. El servidor entonces:

1. **Compuertas de capacidad y relaciones antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica la capacidad de cada sala objetivo, capacidad de invitado, bandera cerrada y relación de voluntarios contra la ocupación actual. postCheckin **no es transaccional**, por lo que la compuerta debe ejecutarse antes de la primera guardada — una violación dura devuelve una 409 que nombra la(s) sala(s) ofensiva(s) y nada se persiste. Ver [Puertas de capacidad y relación de voluntarios](#puertas-de-capacidad-y-relación-de-voluntarios).
2. **Resuelve sesiones perezosamente.** `getSessionId()` encuentra o crea la fila de `sessions` para `(groupId, serviceTimeId, hoy)` — los ids de sesión se cachean en el proceso por fecha. Las nuevas sesiones emiten un webhook `session.created`. El bucle es un `for..of` esperado — un anterior `forEach(async …)` de disparo y olvido corrió la guardada y escribió NULL sessionIds en la creación de la primera sesión (fijo; anotado en un comentario de código en el bucle).
3. **Reemplaza los registros del día.** Cualquier visita existente para esas personas en ese servicio hoy se elimina junto con sus visitSessions, luego se guarda el conjunto enviado. Re-registrar una familia es por lo tanto una operación "este es el estado actual" idempotente, no una anexión. Pasar `?checkDuplicates=true` en su lugar devuelve `{ duplicates: [personId…] }` sin escribir, que es cómo el quiosco advierte antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales o caracteres ambiguos, así los códigos no pueden deletrear palabras o malinterpretarse). El servidor reintentos en colisión contra las visitas abiertas del mismo día de la misma iglesia y sella el código en cada visita del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` mapea personId a recuento de asistencia de semana consecutiva; el quiosco celebra hitos (cada quinta semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada** — si eso fue una semana anterior los ids se eliminan, así que el cliente recibe una copia pre-rellenada de las selecciones de sala de la semana pasada que se guardarán como nuevos registros.

### Retiro

Dos extremos cierran el bucle (`VisitController`):

- `GET /attendance/visits/code/:code` — las visitas de hoy aún no retiradas que llevan ese código de seguridad, con sesiones completadas.
- `POST /attendance/visits/checkout` — cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; sella `checkoutTime` y quién recogió, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos autentican con `attendance.checkin`, lo que otorga exactamente la superficie de registro de asistencia/retiro/plantilla de etiqueta; `attendance.view`/`attendance.edit` cubren informes y entrada manual; la estructura (servicios, tiempos de servicio, asignaciones de grupo) requiere `services.edit`. El registro de asistencia de autoservicio de miembros (B1App) no necesita permiso en absoluto: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor restringe los `personId`s enviados al hogar del llamante (403 de otro modo — esta cerca es lo que mantiene los `securityCode`s de otras familias inlegibles). La membresía es la concesión; si los miembros *ven* la característica es controlada por las pestañas de navegación de B1App de la iglesia. Los otros extremos de registro de asistencia (`code/:code`, `checkout`, `guardians`, `CheckinController`) permanecen solo para quiosco/personal.

## Los grupos conducen el enrutamiento de salas

No hay entidad de sala o aula en ninguna parte del sistema. Una "sala" es una **grupo** de membresía con `trackAttendance` habilitado, vinculado a uno o más tiempos de servicio a través de `groupServiceTimes`. Los campos de grupo (en `Api/src/modules/membership/models/Group.ts`) que dan forma al comportamiento del quiosco:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en asistencia en absoluto; el árbol de configuración de B1Admin marca grupos `trackAttendance` sin fila `groupServiceTimes` como sin asignar |
| `parentPickup` | Marca una sala infantil: el registro en ella hace que la visita sea una visita "infantil", que imprime una etiqueta de recogida familiar y pone el código de seguridad en la etiqueta |
| `printNametag` | Si los registros en este grupo imprimen una etiqueta en absoluto |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de sala y un interruptor "cerrado" duro, reforzado del lado del servidor por la puerta de registro de asistencia (editado en la configuración del grupo de B1Admin bajo "Capacidad de Registro de Asistencia") |
| `volunteerRatio` / `minVolunteers` | Relación de niños por voluntario y recuento de voluntarios mínimos, reforzado según la configuración de `ratioEnforcement` de toda la iglesia |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad de edad/grado evaluados del lado del quiosco para resaltar o atenuar salas |

Cada cliente desnormaliza de la misma manera (por ejemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargar `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups` en paralelo, luego para cada tiempo de servicio recopilar los grupos cuya fila `groupServiceTimes` apunta a él en `serviceTime.groups`. Esa matriz es lo que el selector de sala muestra, organizado por grupo `categoryName`.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), y el árbol Campus → Servicio → Tiempo de Servicio → Grupo completo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` a través de `GET /attendance/attendancerecords/tree`.

:::info
Porque los grupos son la única fuente de verdad, la misma membresía de grupo potencia el enrutamiento del quiosco, asistencia de estilo lista en las páginas de grupo de B1Admin e informes de asistencia — asignar un grupo a un tiempo de servicio es el único paso necesario para convertirlo en un destino de registro de asistencia.
:::

## Seguridad infantil

### Tipos de registro de asistencia

Cada visita lleva un `checkinType` — `member`, `guest` o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo se elige **del lado del quiosco**: fichas Miembro / Invitado / Voluntario en la fila de miembro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), sellada en cada visita pendiente al completarse (`app/checkinComplete.tsx`, por defecto a `member`). El servidor lo consume en la puerta — los voluntarios cuentan hacia la cobertura de relación en lugar de contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Puertas de capacidad y relación de voluntarios

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardada (el extremo no es transaccional, así que la puerta anterior a la guardada es el mecanismo de corrección). Carga la ocupación actual por grupo objetivo (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo a través de la puerta del módulo de membresía, luego clasifica violaciones:

- **Duro (siempre bloquea):** `checkinClosed`, `actual + entrada > capacidad`, recuento de invitado sobre `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — el quiosco muestra la sala nombrada.
- **Relación (advertencia o bloqueo):** entrada no voluntaria en una sala donde `voluntarios < minVolunteers`, sin voluntarios en absoluto, o `niños > voluntarios × volunteerRatio`. La severidad sigue la configuración `ratioEnforcement` de toda la iglesia (`"warn"` predeterminado / `"block"`, editado en B1Admin Administrar Iglesia → Registro de Asistencia, `CheckinSettingsEdit.tsx`). El modo de advertencia devuelve `409 { warning: true, error: "ratio", … }` a menos que el cliente reenvíe con `acknowledgeWarnings=true` — ese reenvío es la confirmación de personal del quiosco.

### Elegibilidad de edad/grado (del lado del quiosco)

La elegibilidad de la sala es interfaz de usuario consultiva, evaluada en el quiosco, no reforzada por el servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento/grado de una persona contra los `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grado: PreK, K, 1–12, Graduado) y devuelve `eligible` / `ineligible` / `unknown` — los datos faltantes rinden `unknown` y nunca ocultan una sala. Las edades y grados se calculan a partir de la **fecha de promoción de grado** de la iglesia (`gradePromotionDate` configuración, `"MM-DD"`, editado en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco la obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` elige la ocurrencia más reciente en o antes de hoy. El selector de sala resalta salas elegibles y atenúa las inelegibles; escoger una sala atenuada requiere una confirmación de personal.

### Recogida de confianza y no autorizada

Las personas de recogida son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario de iglesia autenticado, así los quioscos pueden leerlo) más `POST` / `DELETE` cerrado por `people.edit`. El personal administra la lista en la tarjeta **Recogida** de la página de persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relación y una ficha de estado Confiado/No Autorizado.

En el retiro (`B1Checkin/app/checkout.tsx`), el quiosco carga la lista de recogida del hogar: las entradas `trusted` se renderizan como tarjetas de recogida tocables junto con la cuadrícula de foto de adultos del hogar, y un nombre "Otro" de tipo libre se compara difusamente (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — una coincidencia bloquea el retiro con una hoja de advertencia y un botón de **Anulación** de personal. La anulación se registra en la visita misma: publica `checkedOutBy` como `"OVERRIDE: {name}"` a través del `POST /attendance/visits/checkout` normal, así que aterriza en el registro de asistencia y el webhook `attendance.checkout` en lugar de una tabla de auditoría separada.

### Búsqueda de padre y transmisión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos extremos de SMS:

- `POST /page` — `{ visitId, message }`: busca a los guardianes de un niño registrado (pantalla de retiro de quiosco, modo manejado).
- `POST /broadcast` — `{ serviceId, message }`: envía un mensaje de texto a cada hogar registrado de adultos para un servicio (configuración de administrador de quiosco, detrás de una hoja de confirmación de tipo `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven adultos del hogar a través de la puerta de membresía, luego entregan a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la puerta cruzada del módulo en la puerta del proveedor de mensajería de texto configurado de la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no hay remitente de SMS integrado). La puerta registra una fila `sentText` más entradas `deliveryLog` por destinatario e impone un límite de lote de 500 destinatarios; sin proveedor configurado devuelve `no_provider`, que el quiosco muestra como "Sin proveedor de SMS configurado". El `dispatch()` del controlador deduplica números de teléfono y omite personas sin móvil u `optedOut` establecido, devolviendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` así el quiosco puede mostrar lo que se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos expo-router bajo `B1Checkin/app/`; el estado entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no estado React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Búsqueda** (`app/lookup.tsx`) — búsqueda por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 o completo) o por nombre (`GET /membership/people/search?term=`). Seleccionar una coincidencia carga el hogar (`GET /membership/people/household/{householdId}`) y visitas existentes (`GET /attendance/visits/checkin`), sembrando `pendingVisits` con selecciones de la semana pasada.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada fila de miembro muestra una insignia ya registrada, insignia de alergia/`nametagNotes` y fichas de sala actuales. Expandir un miembro enumera cada tiempo de servicio con un botón de sala más fichas de tipo de registro de asistencia Miembro / Invitado / Voluntario (`MemberServiceTimes.tsx`). Bajo cada nombre de tiempo de servicio, `ServiceTimeHelper.getGroupSummary()` muestra los grupos ofrecidos allí (los nombres `serviceTime.groups`, recortados, deduplicados sin distinción de mayúsculas, unidos por comas); nada se renderiza cuando el tiempo no tiene grupos.
3. **Asignación de grupo** (`app/selectGroup.tsx`) — un árbol de categoría construido a partir de `serviceTime.groups`, con salas elegibles de edad/grado resaltadas e inelegibles atenuadas detrás de una confirmación de personal (ver [Elegibilidad de edad/grado](#elegibilidad-de-edadgrado-del-lado-del-quiosco)); escoger una sala escribe un `{ session: { serviceTimeId, groupId } }` visitSession en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "Ninguno" la borra.
4. **Completar** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (cada uno sellado con su `checkinType`), luego imprime etiquetas si una impresora está configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad muestra la sala completada/cerrada nombrada; una advertencia de relación ofrece una confirmación de personal que reenvía con `acknowledgeWarnings=true`.

La pantalla **retiro** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres a través de una entrada enfocada automáticamente — así los escáneres de códigos de barras de cuña de teclado USB/Bluetooth funcionan sin cámara — o un teclado en pantalla usando el mismo alfabeto, automáticamente presentado en 4 caracteres. Un botón **Escanear** abre una hoja con el `src/components/CodeScanner.tsx` de cámara compartida (cara trasera por defecto, aceptando QR, Code 128 y Code 39) así las estaciones sin un escáner de cuña pueden leer la etiqueta de recogida; un código escaneado alimenta el mismo camino `handleCode()` que entrada tipografía. Busca el código, muestra los niños siendo recogidos, y presenta a la gente de **recogida confiada** del hogar como tarjetas tocables junto a una cuadrícula de foto de adultos del hogar (más una opción libre de "Otro" que se verifica difusamente contra nombres no autorizados — ver [Recogida de confianza y no autorizada](#recogida-de-confianza-y-no-autorizada)), luego publica `POST /attendance/visits/checkout` con el nombre/id del receptor. En modo manejado la pantalla también ofrece **Buscar un padre** (`POST /attendance/checkin/page`) e **reimpresión de etiqueta de seguridad** — `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las alimenta a través del mismo conducto `PrintUI` que el registro de asistencia.

La personalidad de la estación es una bandera de AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternada en `app/adminSettings.tsx`). El modo manejado agrega el punto de entrada de retiro en la pantalla de búsqueda y edición de perfil por miembro (`POST /membership/people`) desde la pantalla del hogar. El endurecimiento de quiosco está integrado: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) cierra las pantallas de administrador e impresora, la pantalla de administrador se abre solo a través de 7 toques rápidos en el logotipo del encabezado, y una pantalla de atracción inactiva (`src/hooks/useInactivityTimer.ts`) se apodera entre familias.

## Registro de asistencia de autoservicio (B1App)

Los miembros se registran desde el portal b1.church en la pantalla `/mobile/checkin` (enrutado por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Requiere un usuario conectado y camina los mismos cuatro pasos que el quiosco — servicios → hogar → grupos → completar — contra los mismos extremos, con estado mantenido en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias del quiosco: el hogar proviene del `householdId` propio del usuario conectado (sin paso de búsqueda), y no hay impresión de etiqueta — en su lugar la pantalla de finalización muestra el código de seguridad del lote como QR (`qrcode.react`) con una pista "muestre esto en una estación de registro de asistencia". Si el hogar ya está registrado cuando la página carga, un botón "Mostrar código de registro de asistencia" vuelve a mostrar el QR de la primera visita existente (de `GET /attendance/visits/checkin`) que lleva un `securityCode`. El registro de asistencia se registra inmediatamente al enviar (no hay estado pendiente); el QR solo impulsa la impresión de etiqueta en el quiosco.

**Impresión de etiqueta de teléfono a quiosco** (`B1Checkin/app/scan.tsx`, alcanzado desde el botón "Escanear código" del QR en la pantalla de búsqueda): el quiosco muestra `CodeScanner` (un `CameraView` de `expo-camera`, cara frontal por defecto, invertible) escaneando códigos QR. `ScanCodeHelper.parse()` acepta una carga útil solo cuando es un código de 4 caracteres desnudo en el alfabeto del código de seguridad, y `ScanCodeHelper.isRepeat()` ignora el mismo código durante 4 segundos, así que tanto el QR de B1App como el QR de etiqueta impresa funcionan. La pantalla entonces sigue el camino de reimpresión de retiro — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — y vuelve a la búsqueda. Ninguna escritura de asistencia sucede en tiempo de escaneo; solo etiquetas. Los códigos sin visitas activas, estaciones sin impresora y grupos sin etiqueta cada uno muestra un tostada y vuelve a la búsqueda.

Los tipos y `ApiHelper`/`ArrayHelper` vienen de `@churchapps/helpers` y `@churchapps/apphelper`; ningún componente React se comparte con B1Admin.

## Asistencia del lado del administrador (B1Admin)

- **Configuración** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza el árbol de estructura y crea servicios (`ServiceEdit.tsx`) y tiempos de servicio (`ServiceTimeEdit.tsx`). Los datos del campus provienen de membresía a través del gancho `useCampuses()`.
- **La asistencia manual** vive del lado de Grupos, no la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`; al agregar, `SessionEdit.tsx` puede incluir una sesión por cada otro grupo que comparta el tiempo de servicio elegido, omitiendo grupos que ya tienen una sesión en esa fecha) y marca personas presentes vía `POST /attendance/visitsessions/log`, que encuentra o crea la visita para esa persona y sesión. Los líderes de grupo pueden registrar asistencia para sus propios grupos sin el permiso `attendance.edit` — los controladores verifican `au.leaderGroupIds`.
- **Informes** — la tendencia de asistencia y asistencia de grupo son informes definidos por servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi; definiciones en `Api/reports/*.json`). Ambos toman `startDate`/`endDate` (fecha final inclusive); el informe de tendencia por defecto a un año atrás a través de hoy y añade una columna `sessionDates` por semana, e el árbol en pantalla de asistencia de grupo incluye el `checkinTime` de cada visita y el `membershipStatus` de la persona. El CSV de asistencia de grupo proviene del informe complementario `groupAttendanceDownload`, pivotado por `GroupAttendanceDownloadHelper` en una fila por miembro del grupo con una columna presente/ausente por sesión fechada; el historial por persona es `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, alcanzado desde la página de configuración de Registro de Asistencia). Una plantilla es una fila `labelTemplates` cuyo `content` es una matriz JSON de bloques — `text`, `field`, `barcode`, `qrcode` o `box` — cada uno posicionado en coordenadas de porcentaje con fuente, alineación, simbología (`code39`/`code128`/`qr`) y condiciones de visibilidad opcionales (por ejemplo, solo renderizar el cuadro de alergia cuando `person.nametagNotes` no es vacío). Dos `labelType`s existen: `nametag` (uno por persona registrada; campos como `person.displayName`, `sessions`, `securityCode` y `person.isBirthdayWeek` -- `"true"` cuando el cumpleaños mes/día es dentro de 3 días de hoy, envolviendo a través del cambio de año, calculado por `LabelHelper.isBirthdayWithin()`) y `pickup` (uno por familia; campos como `children`, `childrenAllergies`). El servidor refuerza un solo predeterminado por tipo por iglesia (`LabelTemplateController.save`). El diseñador envía plantillas de inicio reflejando las etiquetas incluidas del quiosco y previsualizaciones contra datos de ejemplo.

### Renderización e impresión en el quiosco

Al completar el registro de asistencia, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir a partir de las banderas de grupo en cada visita pendiente: etiquetas para grupos `printNametag`, más una etiqueta de recogida familiar si alguna visita golpeó un grupo `parentPickup`. Las visitas con `checkinType` `volunteer` son omitidas por `LabelHelper.selectChildVisits()`, así un trabajador de guardería en una sala de Recogida de Padres nunca desencadena una etiqueta de recogida. El código de seguridad de la respuesta del registro de asistencia va a etiquetas de niño y etiqueta de recogida; las etiquetas de adulto se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte bloques + un contexto de campo en un documento HTML independiente; de lo contrario el HTML de etiquetas incluidas en `B1Checkin/assets/labels/` se utiliza con sustitución de marcador de posición.

Los códigos de barras se generan como SVG en línea por codificadores TypeScript puros en `B1Checkin/src/helpers/barcode.ts` — tablas de patrones Code 39 y Code 128 (conjunto de código B con suma de verificación mod-103) tablas de ancho, más QR a través del paquete `qrcode`. **Estos codificadores se duplican intencionalmente en B1Admin** (`LabelEditor.tsx` en línea las mismas tablas, anotado en un comentario de código) así las vistas previas del diseñador son fielmente pixel a salida del quiosco; un cambio a uno debe ser reflejado en el otro.

El conducto de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura a JPG a través de `react-native-view-shot` y pasa los URIs de imagen al módulo nativo **printer-helper** de Expo (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red QL-series (QL-800/810W/820NWB/1100/1110NWB…), etiquetas troqueladas 29×90, el predeterminado recomendado |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento de red + impresión de imagen TCP/ZPL |

La selección de impresora vive en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip`; la elección persiste a AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en dispositivo mostrado a través de un punto de estado vivo en el encabezado del quiosco.

## Registro de invitados

Dos caminos crean una persona a mediados de registro de asistencia:

- **En el quiosco** — la pantalla del hogar "Agregar invitado" abre `B1Checkin/app/addGuest.tsx`, que primero busca `GET /membership/people/search?term=` una coincidencia existente no miembro e de otro modo crea una con `POST /membership/people`, adjunta al hogar actual. El invitado entonces fluye a través de la asignación de grupo como cualquier miembro.
- **Autoservicio a través de QR** — cuando la configuración de iglesia `enableQRGuestRegistration` está activada (configurada en la configuración de Registro de Asistencia de B1Admin, leída de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un código QR vinculado a `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre a sí misma en su propio teléfono a través del extremo `POST /membership/people/guest-register` anónimo, manteniendo la línea del quiosco moviéndose. La hoja de QR también tiene un botón **Regístrese aquí** que abre la misma página en el quiosco (`app/guestRegister.tsx`) en un `WebView` incógnito sin caché; `src/helpers/GuestRegisterHelper.ts` construye la URL para ambos QR y WebView y bloquea la navegación fuera `https://{subdomain}.b1.church/guest-register`. La pantalla salta atrás a búsqueda en **Hecho**, atrás o 120 segundos de inactividad (tipografía de forma se retransmite desde WebView como actividad), desmontando WebView así las entradas de una familia nunca llegan al siguiente.

## Páginas Relacionadas

- [Extremos de Asistencia](../api/endpoints/attendance) -- Superficie REST completa para campus, servicios, sesiones, visitas y sesiones de visita
- [Extremos de Pertenencia](../api/endpoints/membership) -- Personas, hogares y grupos
- [Webhooks](../api/webhooks) -- Los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura del Módulo](../api/module-structure) -- Cómo se organiza el módulo de asistencia del lado del servidor

