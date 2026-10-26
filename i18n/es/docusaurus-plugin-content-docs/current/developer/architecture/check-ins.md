---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

El check-in es un único sistema con tres puertas de acceso: la aplicación de kiosco B1Checkin para estaciones con personal y de autoservicio, el check-in por cuenta propia dentro del portal de miembros B1App y la asistencia desde el lado administrativo en B1Admin. Los tres escriben en el mismo módulo de asistencia de la Api principal, y el enrutamiento a las aulas se basa por completo en los Grupos; no existe una entidad independiente de "ubicaciones" o "salas". Sobre todo esto hay una capa de seguridad infantil: tipos de check-in por visita, controles de capacidad y proporción de voluntarios en el servidor, verificación de elegibilidad por edad o grado en el kiosco, verificación de recogida de confianza al hacer el check-out y avisos a los padres a través del proveedor de mensajes de texto de la iglesia. Esta página describe el modelo de datos, los flujos de check-in, la capa de seguridad y el proceso de impresión de etiquetas.

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

| Superficie | Repositorio | Tecnología | Función |
|---------|------|-------|------|
| Kiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivos con expo-router; compilaciones EAS para Android, Amazon Fire e iOS; actualizaciones OTA mediante `expo-updates` | Estación con personal o de autoservicio con impresión de etiquetas y check-out verificado |
| Check-in propio | `B1App` | Next.js (portal de miembros b1.church) | Los miembros con sesión registran a su hogar desde el teléfono; sin impresión |
| Administración | `B1Admin` | SPA en React | Configura la estructura de servicios, asigna grupos a horarios, diseña etiquetas, registra la asistencia manual y genera informes |

Los tres llaman a los mismos dos módulos de la API a través de `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo demás de esta página.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta aquí: los campus se gestionan en el módulo de membresía (`/membership/campuses`); la copia de asistencia está congelada en modo de solo lectura para los lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Una reunión recurrente, por ejemplo "Domingo por la mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un horario dentro de un servicio, por ejemplo "9:00 AM" (`models/ServiceTime.ts`). Las columnas de programación son opcionales (migración `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) y determinan la [ventana de check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué horarios de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha; se crea de forma diferida en el momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona que asiste en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado), lo establece el kiosco y lo consumen los controles de capacidad y proporción |
| `visitSessions` | visitId, sessionId | La(s) sesión(es) que cubre una visita; un niño registrado en dos horarios de servicio tendrá dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloques JSON) | Diseños de etiquetas personalizables (`models/LabelTemplate.ts`) |

### Cómo se guarda un check-in completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestiona `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es un arreglo de objetos `Visit`, cada uno con `visitSessions` cuyo `session` incrustado solo indica un par `(serviceTimeId, groupId)`. Luego el servidor:

1. **Aplica los controles de capacidad y proporción antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` revisa para cada sala de destino la capacidad, la capacidad de invitados, la marca de cerrado y la proporción de voluntarios frente a la ocupación actual. postCheckin **no es transaccional**, así que el control debe ejecutarse antes del primer guardado: si hay una infracción grave, se devuelve un 409 que indica las salas afectadas y no se guarda nada. Consulte [Controles de capacidad y proporción de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve las sesiones de forma diferida.** `getSessionId()` busca o crea la fila de `sessions` para `(groupId, serviceTimeId, hoy)`; los identificadores de sesión se almacenan en caché dentro del proceso por fecha. Las nuevas sesiones emiten un webhook `session.created`. El bucle es un `for..of` con `await`; un `forEach(async …)` anterior, sin esperar, competía con el guardado y escribía sessionIds en NULL al crear la primera sesión (corregido; hay un comentario en el código en el bucle).
3. **Reemplaza los registros del día.** Las visitas existentes de esas personas en ese servicio hoy se eliminan junto con sus visitSessions, y después se guarda el conjunto enviado. Por tanto, volver a registrar a una familia es una operación idempotente que establece "este es el estado actual", no una adición. Si se envía `?checkDuplicates=true` en su lugar, se devuelve `{ duplicates: [personId…] }` sin escribir nada; así es como el kiosco advierte antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres a partir del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales ni caracteres ambiguos, para que los códigos no formen palabras ni se lean mal). El servidor reintenta si hay colisión con las visitas abiertas del mismo día de la misma iglesia y asigna el código a todas las visitas del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` asigna a cada personId el número de semanas consecutivas de asistencia; el kiosco celebra los hitos (cada 5.ª semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada**. Si esa fecha corresponde a una semana anterior, se eliminan los identificadores, de modo que el cliente recibe una copia precargada de las selecciones de salas de la semana pasada que se guardarán como nuevos registros.

### Check-out

Dos endpoints completan el ciclo (`VisitController`):

- `GET /attendance/visits/code/:code`: las visitas de hoy aún no retiradas que tienen ese código de seguridad, con las sesiones cargadas.
- `POST /attendance/visits/checkout`: cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; registra `checkoutTime` y quién recogió al niño, y emite un webhook `attendance.checkout` por visita.

Permisos: los kioscos se autentican con `attendance.checkin`, que concede exactamente la superficie de check-in, check-out y plantillas de etiquetas; `attendance.view` / `attendance.edit` cubren los informes y el registro manual; la estructura (servicios, horarios de servicio, asignaciones de grupos) requiere `services.edit`. El check-in propio de miembros (B1App) no necesita ningún permiso: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor restringe los `personId` enviados al hogar del propio usuario (de lo contrario, 403); esta barrera es la que impide leer los `securityCode` de otras familias. La membresía es el permiso; si los miembros *ven* la función lo controlan las pestañas de navegación de B1App de la iglesia. Los demás endpoints de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) siguen siendo exclusivos del kiosco y del personal.

## Los grupos determinan el enrutamiento a las salas

En ninguna parte del sistema existe una entidad de sala o aula. Una "sala" es un **grupo** de membresía con `trackAttendance` activado, vinculado a uno o más horarios de servicio mediante `groupServiceTimes`. Los campos del grupo (en `Api/src/modules/membership/models/Group.ts`) que determinan el comportamiento del kiosco son:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en la asistencia; el árbol de configuración de B1Admin marca como no asignados los grupos con `trackAttendance` que no tienen ninguna fila en `groupServiceTimes` |
| `parentPickup` | Marca una sala infantil: registrar a alguien en ella convierte la visita en una visita "infantil", que imprime una etiqueta de recogida familiar y coloca el código de seguridad en la etiqueta del nombre |
| `printNametag` | Si los check-ins en este grupo imprimen o no una etiqueta con el nombre |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de la sala y un interruptor duro de "cerrado", aplicados en el servidor por el control de check-in (se editan en la configuración del grupo en B1Admin, en "Capacidad de check-in") |
| `volunteerRatio` / `minVolunteers` | Proporción de niños por voluntario y número mínimo de voluntarios, aplicados según la configuración `ratioEnforcement` de toda la iglesia |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad por edad o grado, evaluados en el kiosco para resaltar o atenuar las salas |

Cada cliente desnormaliza los datos de la misma forma (por ejemplo, `B1Checkin/app/services.tsx` y `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargan en paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups`; luego, para cada horario de servicio, reúnen en `serviceTime.groups` los grupos cuya fila de `groupServiceTimes` apunta a ese horario. Ese arreglo es lo que muestra el selector de salas, organizado por el `categoryName` del grupo.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`: `POST`/`DELETE /attendance/groupservicetimes`), y todo el árbol Campus → Servicio → Horario de servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` mediante `GET /attendance/attendancerecords/tree`.

:::info
Como los grupos son la única fuente de verdad, la misma membresía de grupo alimenta el enrutamiento del kiosco, las listas de asistencia de las páginas de grupos en B1Admin y los informes de asistencia. Asignar un grupo a un horario de servicio es el único paso necesario para convertirlo en un destino de check-in.
:::

## Seguridad infantil

### Tipos de check-in

Cada visita lleva un `checkinType`: `member`, `guest` o `volunteer` (NULL significa miembro heredado; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo lo elige el **kiosco**: las opciones Miembro / Invitado / Voluntario en la fila expandida del miembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), que se asignan a cada visita pendiente al completar el check-in (`app/checkinComplete.tsx`, con `member` por defecto). El servidor lo usa en el control: los voluntarios cuentan para la cobertura de proporción en lugar de contar contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Controles de capacidad y proporción de voluntarios

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el endpoint no es transaccional, así que la validación antes de guardar es el mecanismo que garantiza la corrección). Carga la ocupación actual de cada grupo de destino (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo a través de la pasarela del módulo de membresía, y luego clasifica las infracciones:

- **Graves (siempre bloquean):** `checkinClosed`, `actual + entrantes > capacity`, número de invitados por encima de `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`, y el kiosco muestra la sala indicada.
- **Proporción (advertir o bloquear):** entran no voluntarios en una sala donde `volunteers < minVolunteers`, sin ningún voluntario, o donde `children > volunteers × volunteerRatio`. La gravedad depende de la configuración de la iglesia `ratioEnforcement` (`"warn"` por defecto / `"block"`, que se edita en B1Admin, Gestionar iglesia → Check-In, `CheckinSettingsEdit.tsx`). En modo de advertencia se devuelve `409 { warning: true, error: "ratio", … }` salvo que el cliente vuelva a enviar con `acknowledgeWarnings=true`; ese reenvío es la anulación que confirma el personal en el kiosco.

### Ventanas de check-in programadas

Un horario de servicio puede tener una programación semanal opcional (`dayOfWeek` de 0 a 6, donde 0 es domingo; `startTime`/`endTime` en formato `HH:mm`; `checkinOpenMinutes` y `checkinCloseMinutes`), que se edita en el formulario de horario de servicio de **Asistencia → Configuración** en B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Programación de check-in"). `CheckinGateHelper.hasSchedule()` considera que un horario de servicio está programado solo si tiene definidos `dayOfWeek` y `startTime`; los horarios sin programación nunca se limitan por tiempo. `isServiceTimeOpen()` calcula la ventana en hora local de reloj (`DateHelper.toChurchTime`). La zona horaria se resuelve para cada horario de servicio mediante `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): primero la `timezone` del campus del servicio (`service.campusId`, mediante `MembershipModuleGateway.loadCampusTimeZones`), luego el `timeZone` de la iglesia (definido en Información de la iglesia en B1Admin), después el primer campus no eliminado que tenga una `timezone` (`loadCampusTimeZone`) y, solo por último, `America/New_York`. El campus va primero porque muchas iglesias tenían `America/New_York` asignado como zona de la iglesia por una migración de datos. Tanto el listado como las rutas de envío descritas abajo resuelven la zona de la misma manera. La ventana va desde `checkinOpenMinutes` antes del inicio hasta `checkinCloseMinutes` después del final (o después del inicio, si no hay final), y gestiona las ventanas que cruzan la medianoche o el límite de la semana.

La ventana se aplica en dos lugares:

- **Listado:** `GET /attendance/servicetimes` añade a cada fila un booleano calculado `checkinOpen`. El check-in propio de B1App (`CheckinPage.tsx`) y el selector de servicios de B1Checkin (`app/services.tsx`) muestran todos los horarios. Cuando todos los horarios de un servicio están cerrados, muestran la siguiente apertura ("El check-in abre el dom 9:30 AM." en B1App, "El check-in para este servicio abre el dom 9:30 AM." en B1Checkin, a partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`). Si no se puede calcular ninguna apertura, se muestra "El check-in no está abierto para este servicio en este momento." (el kiosco ofrece un botón Atrás para elegir otro servicio). De lo contrario, los horarios cerrados aparecen como una fila no seleccionable, "Cerrado" / "Cerrado · abre 9:30 AM". La pantalla de hogar de B1Checkin (`MemberServiceTimes.tsx`) reevalúa en vivo si el horario está abierto con el reloj del dispositivo mediante `ServiceTimeHelper.isCheckinOpen()` (zona horaria del dispositivo, no la de la iglesia), de modo que un kiosco que queda encendido abre y cierra a tiempo, y muestra "Sala infantil 1 · Registrado" (nombre del grupo) en un horario cerrado en el que la persona ya tiene un registro.
- **Envío:** dentro de `evaluateGates()`, antes de la evaluación de capacidad y proporción, `findClosedServiceTimeGroups()` rechaza el lote con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si la sesión de algún destino está fuera de la ventana de su horario de servicio. Como las visitas existentes de un hogar para hoy se reenvían con cada check-in, las sesiones que la persona ya tiene (`personId|sessionId` en las visitas existentes) se saltan este control, de modo que añadir un horario de servicio posterior abierto no se rechaza porque una ventana anterior ya se haya cerrado. B1Checkin muestra esto en su pantalla de bloqueo duro con el motivo "el check-in no está abierto en este momento" (las infracciones de capacidad siguen mostrando "la sala está llena o cerrada").

### Elegibilidad por edad o grado (en el kiosco)

La elegibilidad de las salas es solo una ayuda visual que se evalúa en el kiosco; el servidor no la aplica. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento o el grado de una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grados: PreK, K, 1–12, Graduado) y devuelve `eligible` / `ineligible` / `unknown`. Si faltan datos, el resultado es `unknown` y nunca oculta una sala. Las edades y los grados se calculan a la fecha de **promoción de grado** de la iglesia (configuración `gradePromotionDate`, en formato `"MM-DD"`, que se edita en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el kiosco la obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` toma la aparición más reciente en o antes de hoy. El selector de salas resalta las salas elegibles y atenúa las no elegibles; elegir una sala atenuada requiere la confirmación del personal.

### Recogida de confianza y recogida no autorizada

Las personas autorizadas a recoger son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`: householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). El CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario autenticado de la iglesia, para que los kioscos puedan leerlo), además de `POST` / `DELETE`, protegidos por `people.edit`. El personal gestiona la lista en la tarjeta **Recogida** de la página de la persona en B1Admin (`B1Admin/src/people/components/PickupPeople.tsx`): foto, parentesco y un distintivo de estado Confiable / No autorizado.

Al hacer el check-out (`B1Checkin/app/checkout.tsx`), el kiosco carga la lista de recogida del hogar: las entradas `trusted` aparecen como tarjetas pulsables junto a la cuadrícula de fotos de los adultos del hogar, y un nombre escrito libremente en la opción "Otro" se compara de forma aproximada (distancia de Levenshtein, `src/helpers/PickupMatchHelper.ts`) con las entradas `notAuthorized`. Si hay coincidencia, el check-out queda bloqueado con una hoja de advertencia y un botón de **Anular** para el personal. La anulación queda registrada en la propia visita: envía `checkedOutBy` como `"OVERRIDE: {name}"` mediante el `POST /attendance/visits/checkout` normal, de modo que aparece en el registro de asistencia y en el webhook `attendance.checkout`, en lugar de en una tabla de auditoría separada.

### Avisar a un padre y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos endpoints de SMS:

- `POST /page`: `{ visitId, message }`: avisa a los tutores de un niño registrado (pantalla de check-out del kiosco, en modo atendido).
- `POST /broadcast`: `{ serviceId, message }`: envía un mensaje de texto a los adultos de cada hogar con registros de un servicio (configuración de administrador del kiosco, tras una hoja de confirmación que exige escribir `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven los adultos del hogar a través de la pasarela de membresía y luego delegan el envío en **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`), la puerta entre módulos hacia el proveedor de mensajes de texto configurado por la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no existe un emisor de SMS integrado). La pasarela registra una fila `sentText` y entradas `deliveryLog` por destinatario, y limita cada lote a 500 destinatarios. Si no hay ningún proveedor configurado, devuelve `no_provider`, y el kiosco muestra "No hay ningún proveedor de SMS configurado". El método `dispatch()` del controlador elimina los números de teléfono duplicados y omite a las personas sin móvil o con `optedOut` activo, y devuelve `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el kiosco muestre qué se omitió.

## El kiosco (B1Checkin)

Las pantallas son archivos de expo-router dentro de `B1Checkin/app/`; el estado compartido entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no en el estado de React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Búsqueda** (`app/lookup.tsx`): busca por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 dígitos o completo) o por nombre (`GET /membership/people/search?term=`). Al seleccionar una coincidencia, se carga el hogar (`GET /membership/people/household/{householdId}`) y las visitas existentes (`GET /attendance/visits/checkin`), y `pendingVisits` se rellena con las selecciones de la semana pasada.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`): cada fila de miembro muestra un distintivo de ya registrado, un distintivo de alergias o `nametagNotes`, y las salas actuales como chips. Al expandir a un miembro se listan todos los horarios de servicio con un botón de sala y los chips de tipo de check-in Miembro / Invitado / Voluntario (`MemberServiceTimes.tsx`). Debajo del nombre de cada horario, `ServiceTimeHelper.getGroupSummary()` muestra los grupos que se ofrecen allí (los nombres de `serviceTime.groups`, sin espacios sobrantes, sin duplicados sin distinguir mayúsculas, separados por comas); si el horario no tiene grupos, no se muestra nada.
3. **Asignación de grupo** (`app/selectGroup.tsx`): un árbol de categorías construido a partir de `serviceTime.groups`, con las salas elegibles por edad o grado resaltadas y las no elegibles atenuadas tras una confirmación del personal (ver [Elegibilidad por edad o grado](#agegrade-eligibility-kiosk-side)); al elegir una sala se escribe un visitSession `{ session: { serviceTimeId, groupId } }` en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "Ninguno" lo borra.
4. **Completar** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` con `pendingVisits` (cada una con su `checkinType`), luego imprime las etiquetas si hay una impresora configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad o `notOpen` muestra la sala indicada con el motivo (llena o cerrada, o check-in no abierto); una advertencia de proporción ofrece una confirmación del personal que reenvía con `acknowledgeWarnings=true`.

La pantalla de **check-out** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres a través de un campo con enfoque automático, de modo que funcionan los lectores de códigos de barras USB o Bluetooth que actúan como teclado, o bien un teclado en pantalla con el mismo alfabeto, que se envía automáticamente al llegar a 4 caracteres. El botón **Escanear** abre una hoja con la cámara compartida `src/components/CodeScanner.tsx` (por defecto la cámara trasera, y acepta QR, Code 128 y Code 39), para que las estaciones sin lector de teclado puedan leer la etiqueta de recogida; un código escaneado sigue la misma ruta `handleCode()` que el texto escrito. La pantalla busca el código, muestra los niños que se van a recoger y presenta las **personas de confianza para recoger** del hogar como tarjetas pulsables junto a una cuadrícula de fotos de los adultos del hogar (además de una opción de texto libre "Otro", que se compara de forma aproximada con los nombres no autorizados; ver [Recogida de confianza y recogida no autorizada](#trusted-and-not-authorized-pickup)); después envía `POST /attendance/visits/checkout` con el nombre o id de quien recoge. En modo atendido, la pantalla también ofrece **Avisar a un padre** (`POST /attendance/checkin/page`) y **reimprimir la etiqueta de seguridad**: `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las envía por la misma ruta `PrintUI` que el check-in.

El modo de la estación es una marca de AsyncStorage `@StationMode` (`"self"` | `"manned"`, que se cambia en `app/adminSettings.tsx`). El modo atendido añade el punto de entrada de check-out en la pantalla de búsqueda y la edición del perfil de cada miembro (`POST /membership/people`) desde la pantalla del hogar. El kiosco incluye medidas de seguridad: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege las pantallas de administración e impresoras, la pantalla de administración solo se abre tras 7 toques rápidos en el logotipo del encabezado, y una pantalla de reposo por inactividad (`src/hooks/useInactivityTimer.ts`) toma el control entre familias.

## Check-in propio (B1App)

Los miembros hacen el check-in desde el portal b1.church en la pantalla `/mobile/checkin` (enrutada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` hacia `screens/CheckinPage.tsx`). Requiere un usuario con sesión iniciada y recorre los mismos cuatro pasos que el kiosco (servicios → hogar → grupos → completar), con los mismos endpoints, y el estado se guarda en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias con el kiosco son: el hogar proviene del `householdId` propio del usuario con sesión iniciada (sin paso de búsqueda), y no hay impresión de etiquetas; en su lugar, la pantalla de finalización muestra el código de seguridad del lote como QR (`qrcode.react`) con la indicación "muestre este código en una estación de check-in". Si el hogar ya está registrado cuando se carga la página, un botón "Mostrar código de check-in" vuelve a mostrar el QR de la primera visita existente (de `GET /attendance/visits/checkin`) que tenga un `securityCode`. El registro se guarda inmediatamente al enviar (no hay estado pendiente); el QR solo sirve para imprimir etiquetas en el kiosco.

**Impresión de etiquetas desde el teléfono en el kiosco** (`B1Checkin/app/scan.tsx`, al que se llega desde el botón "Escanear código" del QR en la pantalla de búsqueda): el kiosco muestra `CodeScanner` (un `CameraView` de `expo-camera`, por defecto la cámara frontal, con opción de cambiarla) buscando códigos QR. `ScanCodeHelper.parse()` acepta una carga solo si es un código de 4 caracteres dentro del alfabeto de códigos de seguridad, y `ScanCodeHelper.isRepeat()` ignora el mismo código durante 4 segundos; así funcionan tanto el QR de B1App como el bloque QR de una etiqueta impresa. La pantalla sigue luego la ruta de reimpresión de check-out: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`, y vuelve a la búsqueda. Al escanear no se escribe nada en la asistencia; solo se imprimen etiquetas. Los códigos sin visitas activas, las estaciones sin impresora y los grupos sin etiquetas muestran un aviso y devuelven a la búsqueda.

Los tipos y `ApiHelper`/`ArrayHelper` provienen de `@churchapps/helpers` y `@churchapps/apphelper`; no se comparten componentes de React con B1Admin.

## Asistencia desde el lado administrativo (B1Admin)

- **Configuración**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) muestra el árbol de estructura y permite crear servicios (`ServiceEdit.tsx`) y horarios de servicio (`ServiceTimeEdit.tsx`). Los datos de campus provienen de membresía mediante el hook `useCampuses()`.
- **Asistencia manual** se encuentra en la sección de Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`; al añadir, `SessionEdit.tsx` puede incluir una sesión por cada otro grupo que comparta el horario de servicio elegido, omitiendo los grupos que ya tienen una sesión en esa fecha) y marca a las personas presentes mediante `POST /attendance/visitsessions/log`, que busca o crea la visita de esa persona para esa sesión. Los líderes de grupo pueden registrar la asistencia de sus propios grupos sin el permiso `attendance.edit`; los controladores comprueban `au.leaderGroupIds`.
- **Informes**: la tendencia de asistencia y la asistencia por grupo son informes definidos en el servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi; las definiciones están en `Api/reports/*.json`). Ambos reciben `startDate`/`endDate` (la fecha final está incluida); el informe de tendencia usa por defecto desde hace un año hasta hoy y añade una columna `sessionDates` por semana, y el árbol en pantalla de asistencia por grupo incluye el `checkinTime` de cada visita y el `membershipStatus` de la persona. El CSV de asistencia por grupo proviene del informe complementario `groupAttendanceDownload`, que `GroupAttendanceDownloadHelper` transforma en una fila por miembro del grupo con una columna de presente/ausente por cada sesión con fecha; el historial de cada persona está en `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin, en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, a la que se llega desde la página de configuración de Check-In). Una plantilla es una fila de `labelTemplates` cuyo `content` es un arreglo JSON de bloques (`text`, `field`, `barcode`, `qrcode` o `box`), cada uno posicionado en coordenadas porcentuales, con fuente, alineación, simbología (`code39`/`code128`/`qr`) y condiciones de visibilidad opcionales (por ejemplo, mostrar el recuadro de alergias solo cuando `person.nametagNotes` no esté vacío). Existen dos `labelType`: `nametag` (una por persona registrada; con campos como `person.displayName`, `sessions`, `securityCode` y `person.isBirthdayWeek`, que vale `"true"` cuando el mes y el día del cumpleaños están a menos de 3 días de hoy, incluso si cruza el cambio de año, calculado por `LabelHelper.isBirthdayWithin()`) y `pickup` (una por familia; con campos como `children`, `childrenAllergies`). El servidor aplica una sola plantilla predeterminada por tipo y por iglesia (`LabelTemplateController.save`). El diseñador incluye plantillas iniciales que reproducen las etiquetas incluidas en el kiosco y permite previsualizar con datos de ejemplo.

### Renderizado e impresión en el kiosco

Al completar el check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir según las marcas del grupo de cada visita pendiente: etiquetas con el nombre para los grupos con `printNametag`, más una etiqueta de recogida familiar si alguna visita está en un grupo con `parentPickup`. Las visitas con `checkinType` `volunteer` se omiten en `LabelHelper.selectChildVisits()`, de modo que un trabajador de la guardería en una sala de Recogida de padres nunca genera una etiqueta de recogida. El código de seguridad de la respuesta del check-in se coloca en las etiquetas de los niños y en la etiqueta de recogida; las etiquetas de adultos se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte los bloques y un contexto de campos en un documento HTML independiente; si no, se usan las etiquetas HTML incluidas en `B1Checkin/assets/labels/`, con sustitución de marcadores.

Los códigos de barras se generan como SVG en línea mediante codificadores en TypeScript puro en `B1Checkin/src/helpers/barcode.ts`: tablas de patrones de Code 39 y tablas de anchos de Code 128 (conjunto B con suma de verificación mod-103), además de QR mediante el paquete `qrcode`. **Estos codificadores están duplicados a propósito en B1Admin** (`LabelEditor.tsx` incluye las mismas tablas, según indica un comentario en el código), para que las previsualizaciones del diseñador coincidan píxel a píxel con la salida del kiosco; un cambio en uno debe replicarse en el otro.

La ruta de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura como JPG con `react-native-view-shot` y entrega las URI de las imágenes al módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK de impresión de Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red de la serie QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas troqueladas de 29×90, la opción predeterminada recomendada |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento en red e impresión de imágenes por TCP/ZPL |

La selección de impresora está en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip`; la elección se guarda en AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en el dispositivo que se muestra a través de un indicador de estado en vivo en el encabezado del kiosco.

## Registro de invitados

Hay dos rutas para crear una persona durante el check-in:

- **En el kiosco**: "Añadir invitado" en la pantalla del hogar abre `B1Checkin/app/addGuest.tsx`, que primero busca en `GET /membership/people/search?term=` una coincidencia de persona no miembro y, si no la hay, crea una con `POST /membership/people`, asociada al hogar actual. El invitado sigue después la asignación de grupo como cualquier miembro.
- **Autoservicio mediante QR**: cuando la configuración de la iglesia `enableQRGuestRegistration` está activada (se configura en la página de Check-In de B1Admin y se lee desde `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del kiosco muestra un código QR que enlaza a `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre desde su propio teléfono mediante el endpoint anónimo `POST /membership/people/guest-register`, lo que mantiene la fila del kiosco en movimiento. La hoja del QR también tiene un botón **Registrarse aquí** que abre la misma página en el kiosco (`app/guestRegister.tsx`) en un `WebView` de incógnito, sin caché; `src/helpers/GuestRegisterHelper.ts` construye la URL tanto para el QR como para el `WebView` y bloquea la navegación hacia fuera de `https://{subdomain}.b1.church/guest-register`. La pantalla vuelve a la búsqueda al pulsar **Listo**, al retroceder o tras 120 segundos de inactividad (escribir en el formulario cuenta como actividad, y el `WebView` lo notifica), y desmonta el `WebView` para que los datos de una familia nunca lleguen a la siguiente.

El registro por QR se configura con las opciones de la iglesia guardadas desde la tarjeta **Registro de invitados por QR** en B1Admin (`src/mobile/CheckInPage.tsx`):

| Configuración | Visibilidad | Propósito |
|---|---|---|
| `enableQRGuestRegistration` | pública | Interruptor de activación para el QR del kiosco y los endpoints anónimos |
| `guestRegistrationFields` | pública | Mapa JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Por defecto: correo y teléfono opcionales, el resto desactivado. El nombre y los apellidos siempre son obligatorios |
| `guestRegistrationImage` | pública | URL de la foto de encabezado; B1App la muestra en formato 16:9 en lugar del icono del formulario y de la pantalla de confirmación |
| `guestRegistrationGroupId` | privada | Grupo al que se añade cada registro (los invitados nunca lo ven ni lo eligen) |
| `guestRegistrationRecordAttendance` | privada | `"true"` para registrar también la asistencia de ese grupo |

`src/components/checkin/GuestRegister.tsx` de B1App obtiene la lista de campos del endpoint anónimo `GET /membership/people/guest-register/options?churchId=` y muestra solo los campos incluidos (correo, teléfono, estado civil y dirección en el contacto principal; fecha de nacimiento, género y grado por miembro; un solo cuadro de comentarios), y envía solo esos datos. El servidor vuelve a aplicar la lista en `GuestRegistrationHelper.sanitize()`: los campos desactivados se descartan y los valores obligatorios faltantes o fuera de la lista devuelven un 400; después `PersonHelper.registerGuestHousehold()` crea un nuevo hogar (sin deduplicar por correo) con cada miembro como `membershipStatus: "Visitor"`, y emite `person.created` por cada uno. Después, los fallos se registran en el log en lugar de devolverse: los miembros se añaden al grupo configurado (`group.member.added`); si el registro de asistencia está activado, `AttendanceModuleGateway.recordAttendance()` marca a cada miembro como presente en cada horario de servicio del grupo que tenga programación y cuya ventana de check-in (`CheckinGateHelper.isServiceTimeOpen`) esté abierta en ese momento, creando la sesión para la fecha local de la iglesia si hace falta; los horarios sin programación y los registros fuera de la ventana no registran nada. Y los comentarios se convierten en una conversación de notas de persona oculta para el jefe del hogar (autor del mensaje "Registro de invitado"), vinculada mediante `person.conversationId`.

## Páginas relacionadas

- [Endpoints de asistencia](../api/endpoints/attendance): referencia REST completa para campus, servicios, sesiones, visitas y visitSessions
- [Endpoints de membresía](../api/endpoints/membership): personas, hogares y grupos
- [Webhooks](../api/webhooks): los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura de módulos](../api/module-structure): cómo está organizado el módulo de asistencia en el servidor
