---
title: "Registros de entrada (Check-Ins)"
---

# Registros de entrada (Check-Ins)

<div class="article-intro">

El registro de entrada es un único sistema con tres puertas de acceso: la aplicación de quiosco B1Checkin para estaciones atendidas y de autoservicio, el registro de entrada propio dentro del portal de miembros de B1App, y la asistencia desde el lado administrativo en B1Admin. Las tres escriben en el mismo módulo de asistencia de la API principal, y el enrutamiento a las aulas se basa por completo en los Grupos: no existe una entidad aparte de «ubicaciones» o «salas». Encima hay una capa de seguridad infantil: tipos de registro por visita, controles de capacidad y de proporción de voluntarios en el servidor, criterios de edad/grado de elegibilidad en el quiosco, verificación de recogida de confianza al registrar la salida, y avisos a los padres a través del proveedor de mensajes de texto de la iglesia. Esta página describe el modelo de datos, los flujos de registro, la capa de seguridad y el proceso de impresión de etiquetas.

</div>

## Descripción general

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

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superficie | Repositorio | Stack | Función |
|---------|------|-------|------|
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivos con expo-router; compilaciones EAS para Android, Amazon Fire e iOS; actualizaciones OTA mediante `expo-updates` | Estación atendida o de autoservicio con impresión de etiquetas y registro de salida verificado |
| Registro de entrada propio | `B1App` | Next.js (portal de miembros b1.church) | Los miembros que han iniciado sesión registran a su hogar desde el teléfono; sin impresión |
| Administración | `B1Admin` | SPA de React | Configura la estructura de los servicios, asigna grupos a los horarios, diseña etiquetas, registra la asistencia manual y genera informes |

Las tres llaman a los mismos dos módulos de la API a través de `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo demás de esta página.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta aquí: los campus se gestionan en el módulo de membresía (`/membership/campuses`); la copia de asistencia está congelada en modo solo lectura para lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Una reunión recurrente, por ejemplo «Domingo por la mañana» (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un bloque horario dentro de un servicio, por ejemplo «9:00 AM» (`models/ServiceTime.ts`). Las columnas de programación son opcionales (migración `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) y determinan la [ventana de registro](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué horarios de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha concreta; se crea de forma diferida en el momento del registro (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona que asiste en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado); lo establece el quiosco y lo consumen los controles de capacidad y proporción |
| `visitSessions` | visitId, sessionId | Las sesiones que cubre una visita: un niño registrado en dos horarios de servicio tiene dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloques JSON) | Diseños de etiquetas personalizables (`models/LabelTemplate.ts`) |

### Cómo se guarda un registro completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestiona `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es un array de objetos `Visit`, cada uno con `visitSessions` cuya `session` incrustada solo indica un par `(serviceTimeId, groupId)`. Después, el servidor:

1. **Aplica los controles de capacidad y proporción antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` comprueba la capacidad de cada sala de destino, la capacidad de invitados, el indicador de cerrada y la proporción de voluntarios frente a la ocupación actual. postCheckin **no es transaccional**, así que el control debe ejecutarse antes del primer guardado: una infracción grave devuelve un 409 que indica la(s) sala(s) afectada(s) y no se guarda nada. Véase [Controles de capacidad y proporción de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve las sesiones de forma diferida.** `getSessionId()` busca o crea la fila de `sessions` para `(groupId, serviceTimeId, hoy)`; los ids de sesión se guardan en caché en el proceso por fecha. Las sesiones nuevas emiten un webhook `session.created`. El bucle es un `for..of` con `await`: un antiguo `forEach(async …)` sin esperar competía con el guardado y escribía NULL en los sessionId al crear la primera sesión (corregido; se indica con un comentario en el código junto al bucle).
3. **Reemplaza los registros del día.** Las visitas existentes de esas personas para ese servicio hoy se eliminan junto con sus visitSessions, y después se guarda el conjunto enviado. Por tanto, volver a registrar a una familia es una operación idempotente que establece «este es el estado actual», no una adición. Si se pasa `?checkDuplicates=true`, se devuelve `{ duplicates: [personId…] }` sin escribir nada; así es como el quiosco avisa antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales ni caracteres ambiguos, para que los códigos no formen palabras ni se lean mal). El servidor reintenta si colisiona con las visitas abiertas del mismo día de la misma iglesia y asigna el código a cada visita del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` asocia cada personId con su número de semanas consecutivas de asistencia; el quiosco celebra los hitos (cada quinta semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada**; si esa fecha fue una semana anterior, se eliminan los ids, de modo que el cliente recibe una copia precargada de las selecciones de salas de la semana pasada que se guardará como registros nuevos.

### Registro de salida

Dos endpoints completan el ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoy que aún no tienen salida registrada y que llevan ese código de seguridad, con las sesiones cargadas.
- `POST /attendance/visits/checkout` — cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; establece `checkoutTime` y quién recogió al niño, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos se autentican con `attendance.checkin`, que concede exactamente el acceso a registro de entrada, registro de salida y plantillas de etiquetas; `attendance.view`/`attendance.edit` cubren los informes y el registro manual; la estructura (servicios, horarios de servicio, asignaciones de grupos) requiere `services.edit`. El autorregistro de miembros (B1App) no necesita ningún permiso: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor limita los `personId` enviados al hogar del propio usuario (si no, 403); esta barrera es la que impide leer los `securityCode` de otras familias. La pertenencia a la iglesia es la concesión; que los miembros *vean* la función lo controlan las pestañas de navegación de B1App de la iglesia. Los demás endpoints de registro (`code/:code`, `checkout`, `guardians`, `CheckinController`) siguen siendo solo para quioscos y personal.

## El enrutamiento por grupos

En todo el sistema no existe ninguna entidad de sala o aula. Una «sala» es un **grupo** de membresía con `trackAttendance` activado, vinculado a uno o más horarios de servicio mediante `groupServiceTimes`. Los campos del grupo (en `Api/src/modules/membership/models/Group.ts`) que determinan el comportamiento del quiosco:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en la asistencia; el árbol de configuración de B1Admin marca como no asignados los grupos con `trackAttendance` que no tienen una fila en `groupServiceTimes` |
| `parentPickup` | Marca una sala infantil: registrar a alguien en ella convierte la visita en una visita «infantil», que imprime una etiqueta de recogida familiar y coloca el código de seguridad en la etiqueta con el nombre |
| `printNametag` | Indica si los registros en este grupo imprimen una etiqueta con el nombre |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de la sala y un interruptor de «cerrada» forzado, aplicados en el servidor por el control de registro (se editan en la configuración del grupo en B1Admin, en «Check-In Capacity») |
| `volunteerRatio` / `minVolunteers` | Proporción de niños por voluntario y número mínimo de voluntarios, aplicados según el ajuste `ratioEnforcement` de toda la iglesia |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad por edad o grado, evaluados en el quiosco para resaltar o atenuar las salas |

Todos los clientes desnormalizan los datos del mismo modo (por ejemplo, `B1Checkin/app/services.tsx` y `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargan en paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups`, y después, para cada horario de servicio, reúnen en `serviceTime.groups` los grupos cuya fila de `groupServiceTimes` apunta a él. Ese array es lo que muestra el selector de salas, organizado por `categoryName` del grupo.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), y el árbol completo Campus → Servicio → Horario de servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` mediante `GET /attendance/attendancerecords/tree`.

:::info
Como los grupos son la única fuente de verdad, la misma pertenencia a grupos alimenta el enrutamiento del quiosco, la asistencia tipo lista en las páginas de grupos de B1Admin y los informes de asistencia; asignar un grupo a un horario de servicio es el único paso necesario para convertirlo en un destino de registro.
:::

## Seguridad infantil

### Tipos de registro

Cada visita lleva un `checkinType`: `member`, `guest` o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo lo elige el **quiosco**: los chips Miembro / Invitado / Voluntario de la fila del miembro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), que se asignan a cada visita pendiente al completar el registro (`app/checkinComplete.tsx`, con `member` por defecto). El servidor lo usa en el control: los voluntarios cuentan para la cobertura de proporción en lugar de contar contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Controles de capacidad y proporción de voluntarios

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el endpoint no es transaccional, así que la corrección depende de validar antes de guardar). Carga la ocupación actual de cada grupo de destino (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo a través de la pasarela del módulo de membresía, y después clasifica las infracciones:

- **Graves (siempre bloquean):** `checkinClosed`, `actual + entrante > capacity`, número de invitados por encima de `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`; el quiosco muestra la sala indicada.
- **De proporción (avisan o bloquean):** los no voluntarios entrantes en una sala donde `volunteers < minVolunteers`, sin ningún voluntario, o donde `children > volunteers × volunteerRatio`. La gravedad depende del ajuste de la iglesia `ratioEnforcement` (`"warn"` por defecto / `"block"`, que se edita en B1Admin en Manage Church → Check-In, `CheckinSettingsEdit.tsx`). En modo de aviso se devuelve `409 { warning: true, error: "ratio", … }` salvo que el cliente reenvíe con `acknowledgeWarnings=true`; ese reenvío es la anulación con confirmación del personal en el quiosco.

### Ventanas de registro programadas

Un horario de servicio puede tener una programación semanal opcional (`dayOfWeek` de 0 a 6, con 0 = domingo; `startTime`/`endTime` en formato `HH:mm`; `checkinOpenMinutes`; `checkinCloseMinutes`), que se edita en el formulario de horario de servicio de **Attendance → Setup** en B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, «Check-in Schedule»). `CheckinGateHelper.hasSchedule()` considera que un horario de servicio está programado solo si `dayOfWeek` y `startTime` están definidos; los horarios sin programar nunca están limitados por tiempo. `isServiceTimeOpen()` calcula la ventana en hora local de pared (`DateHelper.toChurchTime`). La zona horaria se resuelve por horario de servicio mediante `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): primero la `timezone` del campus del servicio (`service.campusId`, mediante `MembershipModuleGateway.loadCampusTimeZones`), después la `timeZone` de la iglesia (definida en Church Information de B1Admin), luego el primer campus no eliminado que tenga una `timezone` (`loadCampusTimeZone`) y, por último, `America/New_York`. El campus va primero porque muchas iglesias tenían `America/New_York` cargado como zona de la iglesia. Tanto la lista como las rutas de publicación de abajo resuelven la zona de la misma forma. La ventana va desde `checkinOpenMinutes` antes del inicio hasta `checkinCloseMinutes` después del fin (o después del inicio si no hay fin), y gestiona las ventanas que cruzan la medianoche o el límite de semana.

La ventana se aplica en dos lugares:

- **Listado:** `GET /attendance/servicetimes` añade a cada fila un booleano calculado `checkinOpen`. El registro propio de B1App (`CheckinPage.tsx`) y el selector de servicios de B1Checkin (`app/services.tsx`) mantienen todos los horarios. Cuando todos los horarios de un servicio están cerrados, muestran la próxima apertura («Check-in opens Sun 9:30 AM.» en B1App, «Check-in for this service opens Sun 9:30 AM.» en B1Checkin, a partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), y recurren a «Check-in isn't open for this service right now.» cuando no se puede calcular ninguna apertura (el quiosco ofrece un botón Atrás para elegir otro servicio). En caso contrario, los horarios cerrados aparecen como una fila no seleccionable «Closed» / «Closed · opens 9:30 AM». La pantalla de hogar de B1Checkin (`MemberServiceTimes.tsx`) reevalúa en vivo si está abierto con el reloj del dispositivo, mediante `ServiceTimeHelper.isCheckinOpen()` (zona horaria del dispositivo, no la de la iglesia), de modo que un quiosco que lleva tiempo encendido abre y cierra a la hora correcta, y muestra «Kids Room 1 · Checked in» (nombre del grupo) en un horario cerrado en el que la persona ya está registrada.
- **Publicación:** dentro de `evaluateGates()`, antes de la evaluación de capacidad/proporción, `findClosedServiceTimeGroups()` rechaza el lote con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si la ventana de horario de servicio de alguna sesión de destino está cerrada. Como las visitas existentes de un hogar para hoy se vuelven a enviar con cada registro, las sesiones que la persona ya tiene (`personId|sessionId` en las visitas existentes) omiten este control; así, añadir un horario de servicio posterior no se rechaza porque una ventana anterior ya haya cerrado. B1Checkin muestra esto en su pantalla de control grave con el motivo «check-in isn't open right now» (las infracciones de capacidad siguen mostrando «room is full or closed»).

### Elegibilidad por edad y grado (en el quiosco)

La elegibilidad de las salas es una ayuda visual que evalúa el quiosco; el servidor no la aplica. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento y el grado de la persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grados: PreK, K, 1–12, Graduated) y devuelve `eligible` / `ineligible` / `unknown`; si faltan datos el resultado es `unknown` y nunca oculta una sala. Las edades y los grados se calculan a la fecha de **promoción de grado** de la iglesia (ajuste `gradePromotionDate`, formato `"MM-DD"`, que se edita en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco lo obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` elige la ocurrencia más reciente en la fecha de hoy o anterior. El selector de salas resalta las salas elegibles y atenúa las no elegibles; elegir una sala atenuada requiere la confirmación del personal.

### Recogida de confianza y no autorizada

Las personas autorizadas a recoger a los niños son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). El CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario autenticado de la iglesia, para que los quioscos puedan leerlo) más `POST` / `DELETE`, protegidos por `people.edit`. El personal gestiona la lista en la tarjeta **Pickup** de la página de la persona (`B1Admin/src/people/components/PickupPeople.tsx`): foto, parentesco y un chip de estado Trusted / Not Authorized.

En la salida (`B1Checkin/app/checkout.tsx`), el quiosco carga la lista de recogida del hogar: las entradas `trusted` aparecen como tarjetas tocables junto a la cuadrícula de fotos de los adultos del hogar, y un nombre «Other» escrito libremente se compara de forma aproximada (distancia de Levenshtein, `src/helpers/PickupMatchHelper.ts`) con las entradas `notAuthorized`; si hay coincidencia, la salida se bloquea con una hoja de advertencia y un botón **Override** para el personal. La anulación queda registrada en la propia visita: envía `checkedOutBy` como `"OVERRIDE: {name}"` mediante el `POST /attendance/visits/checkout` habitual, de modo que aparece en el registro de asistencia y en el webhook `attendance.checkout`, en lugar de en una tabla de auditoría aparte.

### Aviso a los padres y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos endpoints de SMS:

- `POST /page` — `{ visitId, message }`: avisa a los tutores de un niño registrado (pantalla de salida del quiosco, en modo atendido).
- `POST /broadcast` — `{ serviceId, message }`: envía un mensaje de texto a los adultos de todos los hogares registrados de un servicio (ajustes de administrador del quiosco, tras una hoja de confirmación en la que hay que escribir `EMERGENCY`, en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven los adultos del hogar a través de la pasarela de membresía y después delegan el envío en **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`): la puerta entre módulos hacia el proveedor de mensajes de texto configurado por la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no hay un emisor de SMS integrado). La pasarela registra una fila `sentText` más entradas `deliveryLog` por destinatario, y limita cada lote a 500 destinatarios; si no hay proveedor configurado, devuelve `no_provider`, que el quiosco muestra como «No SMS provider configured». El `dispatch()` del controlador elimina los números de teléfono duplicados y omite a las personas sin móvil o con `optedOut` activado, y devuelve `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el quiosco muestre qué se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos de expo-router dentro de `B1Checkin/app/`; el estado entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no en el estado de React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Búsqueda** (`app/lookup.tsx`): busca por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 dígitos o completo) o por nombre (`GET /membership/people/search?term=`). Al seleccionar una coincidencia se carga el hogar (`GET /membership/people/household/{householdId}`) y las visitas existentes (`GET /attendance/visits/checkin`), que rellenan `pendingVisits` con las selecciones de la semana anterior.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`): cada fila de miembro muestra una insignia de «ya registrado», una insignia de alergias o `nametagNotes` y sus chips de sala actuales. Al expandir a un miembro aparecen todos los horarios de servicio, con un botón de sala y los chips de tipo de registro Miembro / Invitado / Voluntario (`MemberServiceTimes.tsx`). Bajo el nombre de cada horario de servicio, `ServiceTimeHelper.getGroupSummary()` muestra los grupos que se ofrecen allí (los nombres de `serviceTime.groups`, recortados, sin duplicados sin distinguir mayúsculas y separados por comas); si el horario no tiene grupos, no se muestra nada.
3. **Asignación de grupo** (`app/selectGroup.tsx`): un árbol de categorías construido a partir de `serviceTime.groups`, con las salas elegibles por edad/grado resaltadas y las no elegibles atenuadas tras una confirmación del personal (véase [Elegibilidad por edad/grado](#agegrade-eligibility-kiosk-side)); al elegir una sala se escribe una visitSession `{ session: { serviceTimeId, groupId } }` en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). «None» la borra.
4. **Completar** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` con `pendingVisits` (cada una con su `checkinType`); después imprime las etiquetas si hay una impresora configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad o `notOpen` muestra la sala indicada con el motivo (llena o cerrada, o registro no abierto); un aviso de proporción ofrece una confirmación del personal que reenvía con `acknowledgeWarnings=true`.

La pantalla de **salida** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres en un campo con enfoque automático, de modo que funcionan los lectores de códigos de barras USB/Bluetooth que actúan como teclado, o un teclado numérico en pantalla con el mismo alfabeto, que se envía automáticamente al llegar a 4 caracteres. El botón **Scan** abre una hoja con la cámara compartida `src/components/CodeScanner.tsx` (por defecto la cámara trasera, y acepta QR, Code 128 y Code 39), para que las estaciones sin lector de teclado puedan leer la etiqueta de recogida; un código escaneado sigue el mismo camino `handleCode()` que la entrada escrita. Busca el código, muestra los niños que se van a recoger y presenta las **personas autorizadas para recoger** del hogar como tarjetas tocables, junto con una cuadrícula de fotos de los adultos del hogar (además de una opción «Other» de texto libre que se compara de forma aproximada con los nombres no autorizados; véase [Recogida de confianza y no autorizada](#trusted-and-not-authorized-pickup)); después envía `POST /attendance/visits/checkout` con el nombre/id elegido. En el modo atendido, la pantalla también ofrece **Page a parent** (`POST /attendance/checkin/page`) y una **reimpresión de la etiqueta de seguridad**: `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las envía por el mismo proceso `PrintUI` que el registro.

El modo de la estación es una marca de AsyncStorage `@StationMode` (`"self"` | `"manned"`, que se cambia en `app/adminSettings.tsx`). El modo atendido añade el acceso a la salida en la pantalla de búsqueda y la edición del perfil de cada miembro (`POST /membership/people`) desde la pantalla del hogar. El quiosco incluye protecciones: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege las pantallas de administración y de impresoras; la pantalla de administración solo se abre con 7 toques rápidos en el logotipo de la cabecera; y una pantalla de reposo (`src/hooks/useInactivityTimer.ts`) toma el control entre familias.

## Autorregistro (B1App)

Los miembros se registran desde el portal b1.church, en la pantalla `/mobile/checkin` (enrutada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` hacia `screens/CheckinPage.tsx`). Requiere un usuario con sesión iniciada y recorre los mismos cuatro pasos que el quiosco (servicios → hogar → grupos → completar), con los mismos endpoints y con el estado guardado en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias con el quiosco: el hogar procede del `householdId` del propio usuario que ha iniciado sesión (sin paso de búsqueda), y no hay impresión de etiquetas; en su lugar, la pantalla de finalización muestra el código de seguridad del lote como QR (`qrcode.react`) con la indicación «show this at a check-in station». Si el hogar ya está registrado al cargar la página, un botón «Show check-in code» vuelve a mostrar el QR a partir de la primera visita existente (de `GET /attendance/visits/checkin`) que tenga un `securityCode`. El registro se guarda de inmediato al enviar (no hay estado pendiente); el QR solo sirve para imprimir etiquetas en el quiosco.

**Impresión de etiquetas desde el teléfono en el quiosco** (`B1Checkin/app/scan.tsx`, al que se llega desde el botón «Scan code» del QR en la pantalla de búsqueda): el quiosco muestra `CodeScanner` (un `CameraView` de `expo-camera`, con la cámara frontal por defecto y que se puede girar) buscando códigos QR. `ScanCodeHelper.parse()` solo acepta una carga útil que sea un código de 4 caracteres del alfabeto de códigos de seguridad, e `ScanCodeHelper.isRepeat()` ignora el mismo código durante 4 segundos, de modo que funcionan tanto el QR de B1App como el bloque QR de una etiqueta impresa. Después la pantalla sigue la ruta de reimpresión de la salida — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — y vuelve a la búsqueda. Al escanear no se escribe nada en la asistencia: solo imprime etiquetas. Los códigos sin visitas activas, las estaciones sin impresora y los grupos sin etiqueta muestran cada uno un aviso emergente y devuelven a la búsqueda.

Los tipos y `ApiHelper`/`ArrayHelper` provienen de `@churchapps/helpers` y `@churchapps/apphelper`; no se comparten componentes de React con B1Admin.

## Asistencia desde el lado administrativo (B1Admin)

- **Configuración**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) muestra el árbol de la estructura y permite crear servicios (`ServiceEdit.tsx`) y horarios de servicio (`ServiceTimeEdit.tsx`). Los datos de los campus provienen de membresía mediante el hook `useCampuses()`.
- **La asistencia manual** está en la sección de Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`; al añadir, `SessionEdit.tsx` puede incluir una sesión para cada otro grupo que comparta el horario de servicio elegido, omitiendo los grupos que ya tienen una sesión en esa fecha) y marca a las personas como presentes mediante `POST /attendance/visitsessions/log`, que busca o crea la visita de esa persona y sesión. Los líderes de grupo pueden registrar la asistencia de sus propios grupos sin el permiso `attendance.edit`: los controladores comprueban `au.leaderGroupIds`.
- **Informes**: la tendencia de asistencia y la asistencia por grupo son informes definidos en el servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx`, contra ReportingApi; las definiciones están en `Api/reports/*.json`). Ambos reciben `startDate`/`endDate` (fecha de fin incluida); el informe de tendencia usa por defecto desde hace un año hasta hoy y añade una columna `sessionDates` por semana, y el árbol en pantalla de la asistencia por grupo incluye el `checkinTime` de cada visita y el `membershipStatus` de la persona. El CSV de la asistencia por grupo procede del informe complementario `groupAttendanceDownload`, que `GroupAttendanceDownloadHelper` transforma en una fila por miembro del grupo, con una columna de presente/ausente por cada sesión con fecha; el historial de cada persona se obtiene de `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin, en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, al que se llega desde la página de ajustes de registro de entrada). Una plantilla es una fila de `labelTemplates` cuyo `content` es un array JSON de bloques (`text`, `field`, `barcode`, `qrcode` o `box`), cada uno colocado en coordenadas porcentuales, con fuente, alineación, simbología (`code39`/`code128`/`qr`) y condiciones de visibilidad opcionales (por ejemplo, mostrar el recuadro de alergias solo cuando `person.nametagNotes` no está vacío). Hay dos `labelType`: `nametag` (una por persona registrada; campos como `person.displayName`, `sessions`, `securityCode` y `person.isBirthdayWeek` —`"true"` cuando el mes y el día del cumpleaños están a menos de 3 días de hoy, incluso al cruzar el cambio de año, calculado por `LabelHelper.isBirthdayWithin()`—) y `pickup` (una por familia; campos como `children`, `childrenAllergies`). El servidor aplica un único valor predeterminado por tipo y por iglesia (`LabelTemplateController.save`). El diseñador incluye plantillas iniciales que reproducen las etiquetas integradas del quiosco y muestra vistas previas con datos de ejemplo.

### Renderizado e impresión en el quiosco

Al completar el registro, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir a partir de las marcas del grupo de cada visita pendiente: etiquetas con el nombre para los grupos con `printNametag`, más una etiqueta de recogida familiar si alguna visita llegó a un grupo `parentPickup`. Las visitas con `checkinType` `volunteer` las omite `LabelHelper.selectChildVisits()`, así que un voluntario de cuidado infantil en una sala de recogida de padres nunca activa una etiqueta de recogida. El código de seguridad de la respuesta de registro se coloca en las etiquetas de los niños y en la etiqueta de recogida; las etiquetas de los adultos se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte los bloques y un contexto de campos en un documento HTML independiente; si no, se usan las etiquetas HTML integradas de `B1Checkin/assets/labels/`, con sustitución de marcadores.

Los códigos de barras se generan como SVG en línea mediante codificadores en TypeScript puro en `B1Checkin/src/helpers/barcode.ts`: tablas de patrones de Code 39 y tablas de anchos de Code 128 (conjunto B con suma de control mod-103), y QR mediante el paquete `qrcode`. **Estos codificadores están duplicados a propósito en B1Admin** (`LabelEditor.tsx` incluye las mismas tablas, lo que se indica en un comentario del código) para que las vistas previas del diseñador sean fieles al resultado del quiosco; un cambio en uno debe reflejarse en el otro.

El proceso de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura como JPG con `react-native-view-shot` y entrega las URI de las imágenes al módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK de impresión de Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red de la serie QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas troqueladas de 29×90, la opción predeterminada recomendada |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento en red e impresión de imágenes por TCP/ZPL |

La selección de impresora está en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip`; la elección se guarda en AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en el dispositivo que se muestra mediante un indicador de estado en vivo en la cabecera del quiosco.

## Registro de invitados

Hay dos vías para crear una persona durante el registro de entrada:

- **En el quiosco**: el botón «Add guest» de la pantalla del hogar abre `B1Checkin/app/addGuest.tsx`, que primero busca una coincidencia de no miembro existente con `GET /membership/people/search?term=` y, si no la encuentra, crea una con `POST /membership/people`, asociada al hogar actual. Después, el invitado sigue el proceso de asignación de grupo como cualquier miembro.
- **Autoservicio mediante QR**: cuando el ajuste de la iglesia `enableQRGuestRegistration` está activado (se configura en los ajustes de registro de entrada de B1Admin y se lee de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un código QR que enlaza con `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre desde su propio teléfono mediante el endpoint anónimo `POST /membership/people/guest-register`, lo que mantiene la fila del quiosco en movimiento. La hoja del QR también tiene un botón **Register here** que abre la misma página en el quiosco (`app/guestRegister.tsx`) en un `WebView` de incógnito y sin caché; `src/helpers/GuestRegisterHelper.ts` construye la URL tanto para el QR como para el WebView y bloquea la navegación fuera de `https://{subdomain}.b1.church/guest-register`. La pantalla vuelve a la búsqueda al pulsar **Done**, al pulsar atrás o tras 120 segundos de inactividad (la escritura en el formulario se transmite desde el WebView como actividad), y desmonta el WebView para que los datos de una familia nunca lleguen a la siguiente.

## Páginas relacionadas

- [Endpoints de asistencia](../api/endpoints/attendance) — API REST completa para campus, servicios, sesiones, visitas y visitas por sesión
- [Endpoints de membresía](../api/endpoints/membership) — personas, hogares y grupos
- [Webhooks](../api/webhooks) — los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura de módulos](../api/module-structure) — cómo está organizado en el servidor el módulo de asistencia
