---
title: "Registros de Asistencia"
---

# Registros de Asistencia

<div class="article-intro">

El registro de asistencia es un sistema con tres puertas principales: la aplicación de quiosco B1Checkin para estaciones atendidas y de autoservicio, el auto registro de asistencia dentro del portal de miembros B1App, y la asistencia del lado administrativo en B1Admin. Los tres escriben en el mismo módulo de asistencia en la Api central, y el enrutamiento de aulas se basa enteramente en Grupos — no hay una entidad separada de "ubicaciones" o "salas". Una capa de seguridad infantil se coloca encima: tipos de registro de asistencia por visita, puertas de capacidad y relación de voluntarios del lado del servidor, elegibilidad de edad/grado del lado del quiosco, verificación de recogida de confianza al cierre, y búsqueda de padres a través del proveedor de mensajería de texto de la iglesia. Esta página asigna el modelo de datos, los flujos de registro de asistencia, la capa de seguridad y la tubería de impresión de etiquetas.

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

Ruta de impresión de etiquetas (solo quiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superficie | Repo | Pila | Rol |
|---------|------|-------|------|
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivos expo-router; compilaciones EAS para Android, Amazon Fire e iOS; actualizaciones OTA a través de `expo-updates` | Estación atendida o de autoservicio con impresión de etiquetas y registro de asistencia verificado |
| Auto registro de asistencia | `B1App` | Next.js (portal de miembros b1.church) | Los miembros conectados registran su hogar desde un teléfono; sin impresión |
| Admin | `B1Admin` | SPA de React | Configura la estructura del servicio, asigna grupos a horarios de servicio, diseña etiquetas, registra asistencia manual, ejecuta informes |

Los tres llaman a los mismos dos módulos de API a través de `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo siguiente.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleto aquí — los campus están maestra en el módulo de membresía (`/membership/campuses`); la copia de asistencia es de solo lectura congelada para lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Una reunión recurrente, por ejemplo "Domingo por la Mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Una franja horaria dentro de un servicio, por ejemplo "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué horarios de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha — creada de forma perezosa en el momento del registro de asistencia (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona asistiendo en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado), establecido por el quiosco y consumido por las puertas de capacidad/relación |
| `visitSessions` | visitId, sessionId | A qué sesión(es) cubre una visita — un niño registrado en dos horarios de servicio obtiene dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Diseños de etiquetas (`models/LabelTemplate.ts`) |

### Cómo se persiste un registro de asistencia completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) maneja `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es una matriz de objetos `Visit`, cada uno llevando `visitSessions` cuyo `session` incorporado llama solo a un par `(serviceTimeId, groupId)`. Luego el servidor:

1. **Puertas de capacidad y relaciones de puerta antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica la capacidad, capacidad de invitados, bandera cerrada y relación de voluntarios de cada sala dirigida contra la ocupación actual. postCheckin **no es transaccional**, por lo que la puerta debe ejecutarse antes del primer guardado — una violación dura devuelve un 409 nombrando la(s) sala(s) ofensiva(s) y nada se persiste. Consulta [Puertas de capacidad y relación de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve sesiones de forma perezosa.** `getSessionId()` encuentra o crea la fila `sessions` para `(groupId, serviceTimeId, hoy)` — los ids de sesión se almacenan en caché en proceso por fecha. Las nuevas sesiones emiten un webhook `session.created`. El ciclo es un `for..of` esperado — un `forEach(async …)` anterior de dispara y olvida raceó la guardia y escribió sessionIds NULL en la creación de la primera sesión (fijo; anotado en un comentario de código en el bucle).
3. **Reemplaza los registros del día.** Todas las visitas existentes para esas personas en ese servicio hoy se eliminan junto con sus visitSessions, luego se guarda el conjunto presentado. El re-registro de una familia es, por lo tanto, una operación idempotente "este es el estado actual", no un apéndice. Pasar `?checkDuplicates=true` en su lugar devuelve `{ duplicates: [personId…] }` sin escribir, que es cómo el quiosco advierte antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales ni caracteres ambiguos, por lo que los códigos no pueden deletrear palabras o malinterpretar). El servidor reintenta en colisión contra las visitas abiertas del mismo día de la misma iglesia y sella el código en todas las visitas en el lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` asigna personId a recuento de asistencia de semanas consecutivas; el quiosco celebra hitos (cada 5.ª semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada** — si eso fue una semana anterior los ids se eliminan, por lo que el cliente recibe una copia prellenada de las selecciones de sala de la semana pasada que se guardarán como nuevos registros.

### Cierre de Sesión

Dos puntos finales completan el ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoy aún no registradas que llevan ese código de seguridad, con sesiones pobladas.
- `POST /attendance/visits/checkout` — cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; sella `checkoutTime` y quién recogió, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos se autentican con `attendance.checkin`, que otorga exactamente la superficie de registro de asistencia/cierre/plantilla de etiqueta; `attendance.view`/`attendance.edit` cubren informes y entrada manual; la estructura (servicios, horarios de servicio, asignaciones de grupo) requiere `services.edit`. El auto registro de asistencia de miembros (B1App) no requiere permiso: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor restringe los `personId`s presentados al hogar del llamante (403 de lo contrario — esta cerca es lo que mantiene los `securityCode`s de otras familias ilegibles). La membresía es la concesión; si los miembros *ven* la característica se controla por las pestañas de navegación B1App de la iglesia. Los otros puntos finales de registro de asistencia (`code/:code`, `checkout`, `guardians`, `CheckinController`) permanecen solo en quiosco/personal.

## Los grupos impulsan el enrutamiento de salas

No hay entidad de sala o aula en ningún lugar del sistema. Una "sala" es un **grupo** de membresía con `trackAttendance` habilitado, vinculado a uno o más horarios de servicio a través de `groupServiceTimes`. Los campos de grupo (en `Api/src/modules/membership/models/Group.ts`) que dan forma al comportamiento del quiosco:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en asistencia en absoluto; el árbol de configuración de B1Admin marca grupos `trackAttendance` sin fila `groupServiceTimes` como sin asignar |
| `parentPickup` | Marca una sala de niños: el registro de asistencia a ella hace que la visita sea una visita "infantil", que imprime una etiqueta de recogida familiar y coloca el código de seguridad en la etiqueta de nombre |
| `printNametag` | Si los registros de asistencia a este grupo imprimen una etiqueta de nombre en absoluto |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de sala y un cambio "cerrado" duro, aplicados en el lado del servidor por la puerta de registro de asistencia (editado en la configuración del grupo de B1Admin en "Capacidad de Registro de Asistencia") |
| `volunteerRatio` / `minVolunteers` | Relación niños por voluntario y recuento de voluntarios mínimo, aplicados según la configuración `ratioEnforcement` de toda la iglesia |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad de edad/grado evaluados en el lado del quiosco para resaltar o oscurecer salas |

Cada cliente denormaliza de la misma manera (por ejemplo `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargar `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups` en paralelo, luego para cada hora de servicio recopilar los grupos cuya fila `groupServiceTimes` la señala en `serviceTime.groups`. Ese matriz es lo que muestra el selector de sala, organizado por `categoryName` de grupo.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), y el árbol completo Campus → Servicio → Hora de Servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` a través de `GET /attendance/attendancerecords/tree`.

:::info
Debido a que los grupos son la única fuente de verdad, la misma membresía de grupo impulsa enrutamiento de quiosco, asistencia de estilo de lista en páginas de grupo de B1Admin e informes de asistencia — asignar un grupo a un horario de servicio es el único paso necesario para hacerlo un destino de registro de asistencia.
:::

## Seguridad infantil

### Tipos de registro de asistencia

Cada visita lleva un `checkinType` — `member`, `guest` o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo se elige **lado del quiosco**: fichas Miembro / Invitado / Voluntario en la fila del miembro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), selladas en cada visita pendiente al completar (`app/checkinComplete.tsx`, predeterminando a `member`). El servidor lo consume en la puerta — los voluntarios cuentan hacia la cobertura de relación en lugar de contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Puertas de capacidad y relación de voluntarios

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el punto final no es transaccional, por lo que cercar antes de guardar es el mecanismo de corrección). Carga la ocupación actual por grupo dirigido (`VisitRepo.countActiveByGroupToday`) y la configuración de grupo a través de la puerta de gateway del módulo de membresía, luego clasifica violaciones:

- **Duro (siempre bloquear):** `checkinClosed`, `actual + entrante > capacidad`, recuento de invitados sobre `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — el quiosco muestra la sala nombrada.
- **Relación (advertir o bloquear):** no voluntarios entrantes en una sala donde `voluntarios < minVoluntarios`, sin voluntarios en absoluto, o `niños > voluntarios × volunteerRatio`. La gravedad sigue la configuración por iglesia `ratioEnforcement` (`"warn"` predeterminado / `"block"`, editado en B1Admin Administrar Iglesia → Registro de Asistencia, `CheckinSettingsEdit.tsx`). El modo de advertencia devuelve `409 { warning: true, error: "ratio", … }` a menos que el cliente reenvíe con `acknowledgeWarnings=true` — ese reenvío es la invalidación de confirmación de personal del quiosco.

### Elegibilidad de edad/grado (lado del quiosco)

La elegibilidad de la sala es UI de asesoramiento, evaluada en el quiosco, no aplicada por el servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento/grado de una persona contra el `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grado: PreK, K, 1–12, Graduado) y devuelve `elegible` / `no elegible` / `desconocido` — datos faltantes producen `desconocido` y nunca ocultan una sala. Las edades y grados se calculan a partir de la **fecha de promoción de grado** de la iglesia (`gradePromotionDate` configuración, `"MM-DD"`, editado en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco lo obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` elige la ocurrencia más reciente en o antes de hoy. El selector de sala resalta salas elegibles y oscurece las inelegibles; elegir una sala oscurecida requiere una confirmación de personal.

### Recogida de confianza y no autorizada

Las personas de recogida son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, nombre, photoUrl, relación, `status` `trusted` / `notAuthorized`, notas). CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario de iglesia autenticado, para que los quioscos puedan leerlo) además de `POST` / `DELETE` cerrado por `people.edit`. El personal administra la lista en la tarjeta **Recogida** de la página de la persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relación y un chip de estado Confiado/No Autorizado.

En el cierre (`B1Checkin/app/checkout.tsx`) el quiosco carga la lista de recogida del hogar: las entradas `trusted` se renderizan como tarjetas de recogida presionables junto a la cuadrícula de foto de adulto del hogar, y un nombre escrito libremente "Otro" se compara difusamente (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — una coincidencia bloquea el cierre con una hoja de advertencia y un botón **Invalidar** de personal. La anulación se registra en la visita misma: publica `checkedOutBy` como `"OVERRIDE: {name}"` a través del normal `POST /attendance/visits/checkout`, por lo que aterriza en el registro de asistencia y el webhook `attendance.checkout` en lugar de una tabla de auditoría separada.

### Página-un-padre y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos puntos finales de SMS:

- `POST /page` — `{ visitId, message }`: páginas de los guardianes de un niño registrado (pantalla de cierre del quiosco, modo asistido).
- `POST /broadcast` — `{ serviceId, message }`: textos cada hogar registrado de adultos para un servicio (configuración de administrador del quiosco, detrás de una hoja de confirmación de tipo `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven adultos del hogar a través de la puerta de gateway de membresía, luego la mano de entrega a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la puerta entre módulos hacia el proveedor de mensajería de texto configurado de la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no hay remitente de SMS incorporado). La puerta registra una fila `sentText` más entradas `deliveryLog` por destinatario y cubre un lote en 500 destinatarios; sin proveedor configurado devuelve `no_provider`, que el quiosco de la superficie como "Sin proveedor de SMS configurado". La `dispatch()` del controlador deduplica números de teléfono y omite personas sin móvil u `optedOut` conjunto, devolviendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el quiosco pueda mostrar qué se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos expo-router bajo `B1Checkin/app/`; el estado entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no estado de React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — búsqueda por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 o completo) o por nombre (`GET /membership/people/search?term=`). Seleccionar una coincidencia carga el hogar (`GET /membership/people/household/{householdId}`) y visitas existentes (`GET /attendance/visits/checkin`), sembrando `pendingVisits` con selecciones de la semana pasada.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada fila de miembro muestra un distintivo ya registrado, distintivo de alergia/`nametagNotes` y sus fichas de sala actual. Expandir un miembro enumera cada hora de servicio con un botón de sala más fichas de tipo de registro de asistencia Miembro / Invitado / Voluntario (`MemberServiceTimes.tsx`).
3. **Asignación de grupo** (`app/selectGroup.tsx`) — un árbol de categoría construido a partir de `serviceTime.groups`, con salas elegibles de edad/grado resaltadas e inelegibles oscurecidas detrás de una confirmación de personal (consulta [Elegibilidad de edad/grado](#agegrade-eligibility-kiosk-side)); elegir una sala escribe un `{ session: { serviceTimeId, groupId } }` visitSession en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "Ninguno" lo borra.
4. **Completar** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (cada uno sellado con su `checkinType`), luego imprime etiquetas si hay una impresora configurada y vuelve automáticamente a buscar. Una respuesta de capacidad `409` muestra la sala nombrada llena/cerrada; una advertencia de relación ofrece una confirmación de personal que reenvía con `acknowledgeWarnings=true`.

La **pantalla de cierre** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres a través de una entrada auto-enfocada — para que los lectores de códigos de barras de cuña de teclado USB/Bluetooth funcionen sin cámara — o un teclado en pantalla usando el mismo alfabeto, auto-enviando en 4 caracteres. Busca el código, muestra a los niños siendo recogidos, y presenta la **gente de recogida confiada** del hogar como tarjetas presionables junto a una cuadrícula de fotos de adultos del hogar (más una opción "Otro" texto libre que se verifica de forma difusa contra nombres no autorizados — consulta [Recogida de confianza y no autorizada](#trusted-and-not-authorized-pickup)), luego publica `POST /attendance/visits/checkout` con el nombre/id del recogedor. En modo asistido la pantalla también ofrece **Página un padre** (`POST /attendance/checkin/page`) y **reimpresión de etiqueta de seguridad** — `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las alimenta a través de la misma tubería `PrintUI` como registro de asistencia.

La personalidad de la estación es un indicador AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado en `app/adminSettings.tsx`). El modo asistido agrega el punto de entrada de cierre en la pantalla de búsqueda y edición de perfil por miembro (`POST /membership/people`) desde la pantalla del hogar. El endurecimiento del quiosco está incorporado: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) cierra las pantallas de administrador e impresora, la pantalla de administrador se abre solo a través de 7 toque rápidos en el logo del encabezado, y una pantalla de atracción inactiva (`src/hooks/useInactivityTimer.ts`) toma el control entre familias.

## Auto registro de asistencia (B1App)

Los miembros se registran desde el portal b1.church en la pantalla `/mobile/checkin` (enrutado por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Requiere un usuario conectado y camina los mismos cuatro pasos que el quiosco — servicios → hogar → grupos → completar — contra los puntos finales idénticos, con estado mantenido en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias del quiosco: el hogar viene del `householdId` del usuario conectado (sin paso de búsqueda), y no hay impresión de etiquetas — en su lugar la pantalla de finalización muestra el código de seguridad del lote como QR (`qrcode.react`) con una pista "mostrar esto en una estación de registro de asistencia". Si el hogar ya está registrado cuando se carga la página, un botón "Mostrar código de registro de asistencia" vuelve a mostrar el QR del código de seguridad de la visita existente. El registro de asistencia se registra inmediatamente en el tiempo de envío (no hay estado pendiente); el QR solo impulsa la impresión de etiquetas en el quiosco.

**Impresión de etiqueta de teléfono a quiosco** (`B1Checkin/app/scan.tsx`, alcanzado desde el botón "Escanear código" en la pantalla de búsqueda): el quiosco abre un `expo-camera` `CameraView` (de frente de forma predeterminada, volteable) escaneando códigos QR. Una carga útil escaneada se acepta cuando es un código de 4 caracteres desnudo en el alfabeto de código de seguridad, por lo que tanto el QR de B1App como un bloque QR de etiqueta impresa funcionan. La pantalla entonces sigue la ruta de reimpresión de cierre — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — y vuelve a buscar. No hay escritura de asistencia en el tiempo de exploración; solo etiquetas. Los códigos sin visitas activas, las estaciones sin impresora y los grupos sin etiquetas cada uno de la superficie una tostada y devuelven a buscar.

Los tipos y `ApiHelper`/`ArrayHelper` provienen de `@churchapps/helpers` y `@churchapps/apphelper`; ningún componente de React se comparte con B1Admin.

## Asistencia del lado administrativo (B1Admin)

- **Configuración** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza el árbol de estructura y crea servicios (`ServiceEdit.tsx`) y horarios de servicio (`ServiceTimeEdit.tsx`). Los datos de campus provienen de membresía a través del gancho `useCampuses()`.
- **La asistencia manual** vive en el lado Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`) y marca a las personas presentes a través de `POST /attendance/visitsessions/log`, que encuentra o crea la visita para esa persona y sesión. Los líderes de grupo pueden registrar asistencia para sus propios grupos sin el permiso `attendance.edit` — los controladores verifican `au.leaderGroupIds`.
- **Informes** — asistencia y asistencia al grupo son informes definidos por servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi); el historial por persona es `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, alcanzado desde la página de configuración de Registro de Asistencia). Una plantilla es una fila `labelTemplates` cuyo `content` es una matriz JSON de bloques — `text`, `field`, `barcode`, `qrcode` o `box` — cada posicionado en coordenadas de porcentaje con fuente, alineación, simbología (`code39`/`code128`/`qr`), y condiciones de visibilidad opcionales (por ejemplo, solo renderizar la caja de alergia cuando `person.nametagNotes` no está vacío). Existen dos `labelType`s: `nametag` (uno por persona registrada; campos como `person.displayName`, `sessions`, `securityCode`) y `pickup` (uno por familia; campos como `children`, `childrenAllergies`). El servidor aplica un único predeterminado por tipo por iglesia (`LabelTemplateController.save`). El diseñador envía plantillas de inicio espejo que los quiosco etiquetas agrupadas y se visualiza contra datos de muestra.

### Renderizado e impresión en el quiosco

Al completar el registro de asistencia, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir a partir de las banderas de grupo en cada visita pendiente: etiquetas de nombre para grupos `printNametag`, más una etiqueta de recogida familiar si alguna visita golpea un grupo `parentPickup`. El código de seguridad de la respuesta de registro de asistencia va en etiquetas de nombre infantil y la etiqueta de recogida; las etiquetas de nombre de adulto se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte bloques + un contexto de campo en un documento HTML independiente; de lo contrario las etiquetas HTML agrupadas en `B1Checkin/assets/labels/` se usan con sustitución de marcador de posición.

Los códigos de barras se generan como SVG en línea mediante codificadores de TypeScript puro en `B1Checkin/src/helpers/barcode.ts` — tablas de patrones de Código 39 y tablas de ancho de Código 128 (conjunto de código B con suma de comprobación mod-103), más QR a través del paquete `qrcode`. **Estos codificadores se duplican intencionalmente en B1Admin** (`LabelEditor.tsx` inserta las mismas tablas, anotadas en un comentario de código) para que las vistas previas del diseñador sean fiel en píxeles a la salida del quiosco; un cambio en uno debe reflejarse en el otro.

La tubería de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura a JPG a través de `react-native-view-shot`, y entrega los URIs de imagen al módulo **printer-helper** nativo de Expo (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red QL-series (QL-800/810W/820NWB/1100/1110NWB…), etiquetas de corte mueren 29×90, el predeterminado recomendado |
| Zebra | `ZebraProvider.kt` (Zebra Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento de red + impresión de imagen TCP/ZPL |

La selección de impresora vive en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip`; la opción persiste a AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en dispositivo de la superficie a través de un punto de estado activo en el encabezado del quiosco.

## Registro de invitado

Dos rutas crean una persona a mediados del registro de asistencia:

- **En el quiosco** — la pantalla del hogar "Agregar invitado" abre `B1Checkin/app/addGuest.tsx`, que primero busca `GET /membership/people/search?term=` una coincidencia no miembro existente y de lo contrario crea uno con `POST /membership/people`, adjunto al hogar actual. El invitado entonces fluye a través de la asignación de grupo como cualquier miembro.
- **Auto-servicio a través de QR** — cuando la configuración de iglesia `enableQRGuestRegistration` está activada (configurada en la configuración de Registro de Asistencia de B1Admin, leída de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un código QR que enlaza con `https://{subdominio}.b1.church/guest-register?serviceId=`. Esa página B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre a sí misma en su propio teléfono a través del punto final anónimo `POST /membership/people/guest-register`, manteniendo la línea del quiosco en movimiento.

## Páginas Relacionadas

- [Puntos Finales de Asistencia](../api/endpoints/attendance) -- Superficie REST completa para campus, servicios, sesiones, visitas y sesiones de visita
- [Puntos Finales de Membresía](../api/endpoints/membership) -- Personas, hogares y grupos
- [Webhooks](../api/webhooks) -- Los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura de Módulo](../api/module-structure) -- Cómo se organiza el módulo de asistencia en el lado del servidor
