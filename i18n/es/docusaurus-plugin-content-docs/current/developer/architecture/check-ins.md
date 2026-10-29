---
title: "Registro de entrada"
---

# Registro de entrada

<div class="article-intro">

El registro de entrada es un solo sistema con tres puntos de acceso: la aplicación de quiosco B1Checkin para estaciones con personal y de autoservicio, el registro de entrada por autoservicio dentro del portal de miembros de B1App, y la asistencia desde el lado administrativo en B1Admin. Los tres escriben en el mismo módulo de asistencia de la Api principal, y el enrutamiento a las aulas se controla por completo mediante los Grupos: no existe una entidad aparte de "ubicaciones" o "salones". Sobre todo esto hay una capa de seguridad infantil: tipos de registro por visita, controles de capacidad y de proporción de voluntarios en el servidor, criterios de elegibilidad por edad/grado en el quiosco, verificación de recogida de confianza al registrar la salida, y avisos a los padres a través del proveedor de mensajes de texto de la iglesia. Esta página describe el modelo de datos, los flujos de registro, la capa de seguridad y el proceso de impresión de etiquetas.

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
|------------|-------------|-------|---------|
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivos de expo-router; compilaciones de EAS para Android, Amazon Fire e iOS; actualizaciones OTA mediante `expo-updates` | Estación con personal o de autoservicio con impresión de etiquetas y registro de salida verificado |
| Registro de entrada propio | `B1App` | Next.js (portal de miembros b1.church) | Los miembros con sesión iniciada registran a su hogar desde un teléfono; sin impresión |
| Administración | `B1Admin` | SPA de React | Configura la estructura de servicios, asigna grupos a los horarios de servicio, diseña etiquetas, registra la asistencia manual y genera informes |

Los tres llaman a los mismos dos módulos de la API a través de `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo demás.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|-----------------|--------------|-------------|
| `campuses` | name, address | Obsoleta aquí: los campus se administran en el módulo de membresía (`/membership/campuses`); la copia de asistencia está congelada y es de solo lectura para los lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Una reunión recurrente, por ejemplo "Domingo por la mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un horario dentro de un servicio, por ejemplo "9:00 AM" (`models/ServiceTime.ts`). Las columnas de programación son opcionales (migración `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) y determinan la [ventana de registro](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué horarios de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha; se crea de forma diferida al momento del registro (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona que asiste en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado); lo establece el quiosco y lo consumen los controles de capacidad/proporción |
| `visitSessions` | visitId, sessionId | Qué sesión(es) cubre una visita; un niño registrado en dos horarios de servicio obtiene dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloques JSON) | Diseños de etiquetas personalizables (`models/LabelTemplate.ts`) |

### Cómo se persiste un registro completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) maneja `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es un arreglo de objetos `Visit`, cada uno con `visitSessions` cuya `session` embebida solo indica un par `(serviceTimeId, groupId)`. Luego el servidor:

1. **Verifica la capacidad y las proporciones antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica la capacidad de cada sala afectada, la capacidad para invitados, el indicador de cerrado y la proporción de voluntarios frente a la ocupación actual. postCheckin **no es transaccional**, así que la verificación debe ejecutarse antes del primer guardado: una violación grave devuelve un 409 que nombra la(s) sala(s) afectada(s) y no se guarda nada. Consulte [Controles de capacidad y proporción de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve las sesiones de forma diferida.** `getSessionId()` busca o crea la fila de `sessions` para `(groupId, serviceTimeId, today)`; los ids de sesión se almacenan en caché dentro del proceso por fecha. Las sesiones nuevas emiten un webhook `session.created`. El bucle es un `for..of` con `await`: un `forEach(async …)` sin esperar, usado antes, competía con el guardado y escribía sessionIds NULL al crear la primera sesión (corregido; se indica con un comentario de código en el bucle).
3. **Reemplaza los registros del día.** Las visitas existentes de esas personas en ese servicio hoy se eliminan junto con sus visitSessions, y luego se guarda el conjunto enviado. Volver a registrar a una familia es, por tanto, una operación idempotente de "este es el estado actual", no una adición. Si se pasa `?checkDuplicates=true` en su lugar, se devuelve `{ duplicates: [personId…] }` sin escribir, y así el quiosco advierte antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales ni caracteres ambiguos, para que los códigos no formen palabras ni se lean mal). El servidor reintenta si hay colisión con las visitas abiertas del mismo día de la misma iglesia, y coloca el código en todas las visitas del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` asocia cada personId con el conteo de asistencias en semanas consecutivas; el quiosco celebra los hitos (cada 5.ª semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada**; si fue una semana anterior, los ids se eliminan, de modo que el cliente recibe una copia precargada de las selecciones de salón de la semana pasada que se guardará como registros nuevos.

### Registro de salida

Dos endpoints completan el ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoy aún no registradas como salida que tengan ese código de seguridad, con las sesiones cargadas.
- `POST /attendance/visits/checkout` — cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; establece `checkoutTime` y quién recogió, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos se autentican con `attendance.checkin`, que concede exactamente la superficie de registro de entrada/salida y de plantillas de etiquetas; `attendance.view`/`attendance.edit` cubren los informes y la captura manual; la estructura (servicios, horarios de servicio, asignaciones de grupos) requiere `services.edit`. El registro de entrada de miembros (B1App) no necesita ningún permiso: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor restringe los `personId` enviados a los de su propio hogar (403 en caso contrario); esta barrera es la que impide leer los `securityCode` de otras familias. La membresía es la autorización; si los miembros *ven* la función lo controlan las pestañas de navegación de B1App de la iglesia. Los demás endpoints de registro (`code/:code`, `checkout`, `guardians`, `CheckinController`) siguen siendo exclusivos de quiosco/personal.

## Los grupos determinan el enrutamiento a las salas

En todo el sistema no existe ninguna entidad de sala o aula. Una "sala" es un **grupo** de membresía con `trackAttendance` habilitado, vinculado a uno o más horarios de servicio mediante `groupServiceTimes`. Los campos del grupo (en `Api/src/modules/membership/models/Group.ts`) que determinan el comportamiento del quiosco:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en la asistencia; el árbol de configuración de B1Admin marca como sin asignar los grupos con `trackAttendance` que no tienen una fila en `groupServiceTimes` |
| `parentPickup` | Marca una sala infantil: registrarse en ella hace que la visita sea una visita "infantil", que imprime una etiqueta de recogida familiar y coloca el código de seguridad en la etiqueta de nombre |
| `printNametag` | Si los registros en este grupo imprimen una etiqueta de nombre |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de la sala y un interruptor de "cerrado" manual, aplicados en el servidor por el control de registro (se edita en la configuración del grupo de B1Admin, en "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Proporción de niños por voluntario y número mínimo de voluntarios, aplicados según la configuración de toda la iglesia `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad por edad/grado que se evalúan en el quiosco para resaltar u oscurecer las salas |

Todos los clientes desnormalizan de la misma manera (por ejemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargan en paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups`, y luego, para cada horario de servicio, reúnen en `serviceTime.groups` los grupos cuya fila de `groupServiceTimes` apunta a él. Ese arreglo es el que muestra el selector de salas, organizado por el `categoryName` del grupo.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), y todo el árbol Campus → Servicio → Horario de servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` mediante `GET /attendance/attendancerecords/tree`.

:::info
Como los grupos son la única fuente de verdad, la misma membresía de grupo alimenta el enrutamiento del quiosco, la asistencia tipo lista en las páginas de grupos de B1Admin y los informes de asistencia. Asignar un grupo a un horario de servicio es el único paso necesario para convertirlo en un destino de registro.
:::

## Seguridad infantil

### Tipos de registro

Cada visita lleva un `checkinType`: `member`, `guest` o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo lo elige el **quiosco**: los chips Member / Guest / Volunteer en la fila expandida del miembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), que se asigna a cada visita pendiente al completar (`app/checkinComplete.tsx`, con `member` por defecto). El servidor lo usa en el control: los voluntarios cuentan para la cobertura de la proporción en lugar de contar contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Controles de capacidad y proporción de voluntarios

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el endpoint no es transaccional, así que el mecanismo de corrección es verificar antes de guardar). Carga la ocupación actual por grupo afectado (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo mediante la pasarela del módulo de membresía, y luego clasifica las infracciones:

- **Graves (siempre bloquean):** `checkinClosed`, `current + incoming > capacity`, número de invitados por encima de `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`; el quiosco muestra la sala indicada.
- **Proporción (advierten o bloquean):** no voluntarios entrantes en una sala donde `volunteers < minVolunteers`, sin voluntarios en absoluto, o `children > volunteers × volunteerRatio`. La gravedad sigue la configuración de la iglesia `ratioEnforcement` (`"warn"` por defecto / `"block"`, que se edita en B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). En modo de advertencia se devuelve `409 { warning: true, error: "ratio", … }` salvo que el cliente vuelva a enviar con `acknowledgeWarnings=true`; ese reenvío es la anulación que confirma el personal en el quiosco.

### Ventanas de registro programadas

Un horario de servicio puede tener una programación semanal opcional (`dayOfWeek` 0–6 con 0 = domingo, `startTime`/`endTime` en formato `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), que se edita en el formulario de horario de servicio de B1Admin en **Attendance → Setup** (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` considera que un horario de servicio está programado solo cuando se establecen tanto `dayOfWeek` como `startTime`; los horarios sin programar nunca se limitan por tiempo. `isServiceTimeOpen()` calcula la ventana en hora local de reloj (`DateHelper.toChurchTime`). La zona horaria se resuelve por horario de servicio mediante `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): primero la `timezone` del campus del servicio (`service.campusId`, mediante `MembershipModuleGateway.loadCampusTimeZones`), luego la `timeZone` de la iglesia (definida en Church Information de B1Admin), después el primer campus no eliminado que tenga una `timezone` (`loadCampusTimeZone`), y solo en último caso `America/New_York`. El campus va primero porque a muchas iglesias se les asignó retroactivamente `America/New_York` como zona de la iglesia. Tanto la ruta de listado como la de envío que aparecen abajo resuelven la zona de la misma manera. La ventana va desde `checkinOpenMinutes` antes del inicio hasta `checkinCloseMinutes` después del fin (o después del inicio si no hay fin), y admite ventanas que cruzan la medianoche o el límite de la semana.

La ventana se aplica en dos lugares:

- **Listado:** `GET /attendance/servicetimes` añade a cada fila un booleano calculado `checkinOpen`. El registro de entrada propio de B1App (`CheckinPage.tsx`) y el selector de servicios de B1Checkin (`app/services.tsx`) mantienen todos los horarios. Cuando todos los horarios de un servicio están cerrados, muestran la próxima apertura ("Check-in opens Sun 9:30 AM." en B1App, "Check-in for this service opens Sun 9:30 AM." en B1Checkin, a partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), y recurren a "Check-in isn't open for this service right now." cuando no se puede calcular ninguna apertura (el quiosco ofrece un botón Atrás para elegir otro servicio). De lo contrario, los horarios cerrados aparecen como una fila no seleccionable "Closed" / "Closed · opens 9:30 AM". La pantalla de hogar de B1Checkin (`MemberServiceTimes.tsx`) reevalúa en vivo si está abierto con el reloj del dispositivo mediante `ServiceTimeHelper.isCheckinOpen()` (zona horaria del dispositivo, no la de la iglesia), de modo que un quiosco que queda encendido abre y cierra a tiempo, y muestra "Kids Room 1 · Checked in" (nombre del grupo) en un horario cerrado que la persona ya tiene.
- **Envío:** dentro de `evaluateGates()`, antes de la evaluación de capacidad/proporción, `findClosedServiceTimeGroups()` rechaza el lote con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si el horario de servicio de alguna sesión afectada está fuera de su ventana. Como las visitas existentes de un hogar para hoy se reenvían con cada registro, las sesiones que la persona ya tiene (`personId|sessionId` en las visitas existentes) omiten este control, de modo que agregar después un horario de servicio abierto no se rechaza porque una ventana anterior ya se cerró. B1Checkin muestra esto a través de su pantalla de control estricto con el motivo "check-in isn't open right now" (las infracciones de capacidad siguen mostrando "room is full or closed").

### Elegibilidad por edad y grado (en el quiosco)

La elegibilidad de las salas es una interfaz orientativa, evaluada en el quiosco y no aplicada por el servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento y el grado de una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grados: PreK, K, 1–12, Graduated) y devuelve `eligible` / `ineligible` / `unknown`. Si faltan datos, el resultado es `unknown` y nunca oculta una sala. Las edades y los grados se calculan a la fecha de **promoción de grado** de la iglesia (configuración `gradePromotionDate`, `"MM-DD"`, que se edita en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco la obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` elige la ocurrencia más reciente en o antes de hoy. El selector de salas resalta las salas elegibles y atenúa las no elegibles; elegir una sala atenuada requiere la confirmación del personal.

### Recogida de confianza y no autorizada

Las personas autorizadas para recoger son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). El CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario autenticado de la iglesia, para que los quioscos puedan leerlo) más `POST` / `DELETE` protegidos por `people.edit`. El personal administra la lista en la tarjeta **Pickup** de la página de la persona en B1Admin (`B1Admin/src/people/components/PickupPeople.tsx`): foto, parentesco y un chip de estado Trusted / Not Authorized.

En el registro de salida (`B1Checkin/app/checkout.tsx`), el quiosco carga la lista de recogida del hogar: las entradas `trusted` aparecen como tarjetas de recogida tocables junto con la cuadrícula de fotos de los adultos del hogar, y un nombre "Other" escrito libremente se compara de forma aproximada (distancia de Levenshtein, `src/helpers/PickupMatchHelper.ts`) con las entradas `notAuthorized`; una coincidencia bloquea el registro de salida con una hoja de advertencia y un botón **Override** del personal. La anulación queda registrada en la propia visita: envía `checkedOutBy` como `"OVERRIDE: {name}"` mediante el `POST /attendance/visits/checkout` normal, de modo que queda en el registro de asistencia y en el webhook `attendance.checkout` en lugar de en una tabla de auditoría aparte.

### Avisar a los padres y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos endpoints de SMS:

- `POST /page` — `{ visitId, message }`: avisa a los tutores de un niño registrado (pantalla de registro de salida del quiosco, modo con personal).
- `POST /broadcast` — `{ serviceId, message }`: envía un mensaje de texto a los adultos de cada hogar registrado para un servicio (configuración de administrador del quiosco, detrás de una hoja de confirmación de tipo `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven los adultos del hogar mediante la pasarela de membresía y luego delegan el envío en **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`): la puerta entre módulos hacia el proveedor de mensajes de texto configurado por la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no existe un emisor de SMS integrado). La pasarela registra una fila `sentText` más entradas `deliveryLog` por destinatario, y limita cada lote a 500 destinatarios; si no hay proveedor configurado, devuelve `no_provider`, que el quiosco muestra como "No SMS provider configured". El `dispatch()` del controlador elimina los números de teléfono duplicados y omite a las personas sin móvil o con `optedOut` activo, y devuelve `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el quiosco pueda mostrar lo que se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos de expo-router en `B1Checkin/app/`; el estado entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no en el estado de React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Búsqueda** (`app/lookup.tsx`) — buscar por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 dígitos o completo) o por nombre (`GET /membership/people/search?term=`). Al seleccionar una coincidencia se carga el hogar (`GET /membership/people/household/{householdId}`) y las visitas existentes (`GET /attendance/visits/checkin`), y se llenan `pendingVisits` con las selecciones de la semana anterior.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada fila de miembro muestra una insignia de ya registrado, una insignia de alergia/`nametagNotes` y sus chips de sala actuales. Al expandir un miembro se listan todos los horarios de servicio con un botón de sala y los chips de tipo de registro Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Debajo del nombre de cada horario de servicio, `ServiceTimeHelper.getGroupSummary()` muestra los grupos ofrecidos allí (los nombres de `serviceTime.groups`, sin espacios sobrantes, sin duplicados sin distinguir mayúsculas, separados por comas); no se muestra nada cuando el horario no tiene grupos.
3. **Asignación de grupo** (`app/selectGroup.tsx`) — un árbol de categorías construido a partir de `serviceTime.groups`, con las salas elegibles por edad/grado resaltadas y las no elegibles atenuadas tras una confirmación del personal (consulte [Elegibilidad por edad/grado](#agegrade-eligibility-kiosk-side)); al elegir una sala se escribe un visitSession `{ session: { serviceTimeId, groupId } }` en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "None" lo borra.
4. **Completar** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (cada una con su `checkinType`), luego imprime las etiquetas si hay una impresora configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad o `notOpen` muestra la sala indicada con el motivo (llena/cerrada, o registro no abierto); una advertencia de proporción ofrece una confirmación del personal que vuelve a enviar con `acknowledgeWarnings=true`.

La pantalla de **registro de salida** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres mediante un campo con enfoque automático, de modo que funcionan los escáneres de código de barras de teclado USB/Bluetooth sin cámara, o un teclado en pantalla que usa el mismo alfabeto y se envía automáticamente al llegar a 4 caracteres. Un botón **Scan** abre una hoja con la cámara compartida `src/components/CodeScanner.tsx` (por defecto la trasera, y acepta QR, Code 128 y Code 39), para que las estaciones sin escáner de teclado puedan leer la etiqueta de recogida; un código escaneado alimenta la misma ruta `handleCode()` que la entrada escrita. Busca el código, muestra los niños que se van a recoger y presenta las **personas de recogida de confianza** del hogar como tarjetas tocables junto con una cuadrícula de fotos de los adultos del hogar (además de una opción de texto libre "Other" que se compara de forma aproximada con los nombres no autorizados; consulte [Recogida de confianza y no autorizada](#trusted-and-not-authorized-pickup)), y luego envía `POST /attendance/visits/checkout` con el nombre/id de quien eligió. En modo con personal, la pantalla también ofrece **Page a parent** (`POST /attendance/checkin/page`) y una **reimpresión de la etiqueta de seguridad**: `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las envía por la misma canalización `PrintUI` que el registro de entrada.

El modo de estación es una marca de AsyncStorage `@StationMode` (`"self"` | `"manned"`, que se cambia en `app/adminSettings.tsx`). El modo con personal agrega el punto de entrada de registro de salida en la pantalla de búsqueda y la edición de perfiles de miembros (`POST /membership/people`) desde la pantalla del hogar. El endurecimiento del quiosco viene integrado: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege las pantallas de administración e impresoras; la pantalla de administración solo se abre con 7 toques rápidos en el logotipo del encabezado; y una pantalla de reposo inactiva (`src/hooks/useInactivityTimer.ts`) toma el control entre familias.

## Autoservicio (B1App)

Los miembros se registran desde el portal b1.church en la pantalla `/mobile/checkin` (enrutada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Requiere un usuario con sesión iniciada y recorre los mismos cuatro pasos que el quiosco (servicios → hogar → grupos → completar) contra los mismos endpoints, con el estado guardado en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias con el quiosco: el hogar proviene del `householdId` propio del usuario con sesión iniciada (sin paso de búsqueda), y no hay impresión de etiquetas; en su lugar, la pantalla de finalización muestra el código de seguridad del lote como un QR (`qrcode.react`) con la indicación "show this at a check-in station". Si el hogar ya está registrado al cargar la página, un botón "Show check-in code" vuelve a mostrar el QR a partir de la primera visita existente (de `GET /attendance/visits/checkin`) que tenga un `securityCode`. El registro se guarda de inmediato al enviar (no hay estado pendiente); el QR solo sirve para imprimir etiquetas en el quiosco.

**Impresión de etiquetas desde el teléfono en el quiosco** (`B1Checkin/app/scan.tsx`, al que se llega desde el botón "Scan code" del QR en la pantalla de búsqueda): el quiosco muestra `CodeScanner` (un `CameraView` de `expo-camera`, por defecto la cámara frontal, con opción de cambiarla) que escanea códigos QR. `ScanCodeHelper.parse()` acepta una carga útil solo si es un código simple de 4 caracteres del alfabeto de códigos de seguridad, y `ScanCodeHelper.isRepeat()` ignora el mismo código durante 4 segundos, de modo que funcionan tanto el QR de B1App como el bloque QR de una etiqueta impresa. La pantalla sigue luego la ruta de reimpresión del registro de salida — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — y regresa a la búsqueda. Al escanear no se escribe ninguna asistencia; solo se imprimen etiquetas. Los códigos sin visitas activas, las estaciones sin impresora y los grupos sin etiquetas muestran cada uno un aviso emergente y regresan a la búsqueda.

Los tipos y `ApiHelper`/`ArrayHelper` provienen de `@churchapps/helpers` y `@churchapps/apphelper`; no se comparten componentes de React con B1Admin.

## Asistencia desde el lado administrativo (B1Admin)

- **Configuración** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) muestra el árbol de la estructura y permite crear servicios (`ServiceEdit.tsx`) y horarios de servicio (`ServiceTimeEdit.tsx`). Los datos de campus provienen de membresía mediante el hook `useCampuses()`.
- **La asistencia manual** se encuentra en la sección de Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`; al agregar, `SessionEdit.tsx` puede incluir una sesión por cada otro grupo que comparta el horario de servicio elegido, omitiendo los grupos que ya tienen una sesión en esa fecha) y marca a las personas como presentes mediante `POST /attendance/visitsessions/log`, que busca o crea la visita de esa persona y sesión. Los líderes de grupo pueden registrar la asistencia de sus propios grupos sin el permiso `attendance.edit`: los controladores verifican `au.leaderGroupIds`.
- **Informes** — la tendencia de asistencia y la asistencia por grupo son informes definidos en el servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi; las definiciones están en `Api/reports/*.json`). Ambos reciben `startDate`/`endDate` (fecha final inclusiva); el informe de tendencia usa por defecto desde hace un año hasta hoy y agrega una columna `sessionDates` por semana, y el árbol en pantalla de la asistencia por grupo incluye el `checkinTime` de cada visita y el `membershipStatus` de la persona. El CSV de asistencia por grupo proviene del informe complementario `groupAttendanceDownload`, que `GroupAttendanceDownloadHelper` transforma en una fila por miembro del grupo, con una columna de presente/ausente por cada sesión con fecha; el historial por persona es `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, al que se llega desde la página de configuración de Check-In). Una plantilla es una fila de `labelTemplates` cuyo `content` es un arreglo JSON de bloques — `text`, `field`, `barcode`, `qrcode` o `box` — cada uno posicionado en coordenadas de porcentaje con fuente, alineación, simbología (`code39`/`code128`/`qr`) y condiciones de visibilidad opcionales (por ejemplo, mostrar el cuadro de alergias solo cuando `person.nametagNotes` no esté vacío). Existen dos `labelType`: `nametag` (una por persona registrada; con campos como `person.displayName`, `sessions`, `securityCode` y `person.isBirthdayWeek` — `"true"` cuando el día y mes del cumpleaños están a 3 días o menos de hoy, incluso si cruza el cambio de año, calculado por `LabelHelper.isBirthdayWithin()`) y `pickup` (una por familia; con campos como `children`, `childrenAllergies`). El servidor aplica un único valor predeterminado por tipo y por iglesia (`LabelTemplateController.save`). El diseñador incluye plantillas iniciales que reproducen las etiquetas incluidas en el quiosco y muestra vistas previas con datos de ejemplo.

### Renderizado e impresión en el quiosco

Al completar el registro, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir según las banderas del grupo de cada visita pendiente: etiquetas de nombre para los grupos con `printNametag`, más una etiqueta de recogida familiar si alguna visita llegó a un grupo `parentPickup`. Las visitas con `checkinType` `volunteer` se omiten en `LabelHelper.selectChildVisits()`, de modo que un trabajador de guardería en una sala de Parent Pickup nunca activa una etiqueta de recogida. El código de seguridad de la respuesta de registro va en las etiquetas de nombre de los niños y en la etiqueta de recogida; las etiquetas de adultos se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte los bloques más un contexto de campos en un documento HTML independiente; si no, se usan las etiquetas HTML incluidas en `B1Checkin/assets/labels/` con sustitución de marcadores de posición.

Los códigos de barras se generan como SVG en línea mediante codificadores de TypeScript puro en `B1Checkin/src/helpers/barcode.ts`: tablas de patrones de Code 39 y tablas de anchos de Code 128 (conjunto B con suma de verificación mod-103), además de QR mediante el paquete `qrcode`. **Estos codificadores están duplicados a propósito en B1Admin** (`LabelEditor.tsx` incorpora las mismas tablas, lo que se indica en un comentario de código), para que las vistas previas del diseñador sean fieles píxel a píxel a la salida del quiosco; un cambio en uno debe reflejarse en el otro.

La canalización de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura a JPG con `react-native-view-shot` y entrega las URI de imagen al módulo nativo de Expo **printer-helper** (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK de impresión de Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red de la serie QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas troqueladas de 29×90, la opción predeterminada recomendada |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento en red + impresión de imágenes por TCP/ZPL |

La selección de impresora está en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip`; la elección se guarda en AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en el dispositivo que se muestra mediante un punto de estado en vivo en el encabezado del quiosco.

## Registro de invitados

Hay dos caminos para crear una persona en mitad del registro de entrada:

- **En el quiosco** — la opción "Add guest" de la pantalla del hogar abre `B1Checkin/app/addGuest.tsx`, que primero busca en `GET /membership/people/search?term=` una coincidencia existente que no sea miembro, y si no la encuentra crea una con `POST /membership/people`, asociada al hogar actual. El invitado luego pasa por la asignación de grupo como cualquier miembro.
- **Autoservicio mediante QR** — cuando la configuración de la iglesia `enableQRGuestRegistration` está activada (se configura en la sección Check-In de B1Admin y se lee de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un código QR que enlaza a `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre desde su propio teléfono mediante el endpoint anónimo `POST /membership/people/guest-register`, lo que mantiene avanzando la fila del quiosco. La hoja del QR también tiene un botón **Register here** que abre la misma página en el quiosco (`app/guestRegister.tsx`) dentro de un `WebView` de incógnito, sin caché; `src/helpers/GuestRegisterHelper.ts` construye la URL tanto para el QR como para el `WebView` y bloquea la navegación fuera de `https://{subdomain}.b1.church/guest-register`. La pantalla vuelve a la búsqueda al pulsar **Done**, al retroceder, o tras 120 segundos de inactividad (escribir en el formulario se transmite desde el `WebView` como actividad), desmontando el `WebView` para que los datos de una familia nunca lleguen a la siguiente.

El registro por QR se controla con la configuración de la iglesia guardada desde la tarjeta **QR Guest Registration** de B1Admin (`src/mobile/CheckInPage.tsx`):

| Configuración | Visibilidad | Propósito |
|---------------|-------------|-----------|
| `enableQRGuestRegistration` | pública | Interruptor de adhesión para el QR del quiosco y los endpoints anónimos |
| `guestRegistrationFields` | pública | Mapa JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Predeterminado: correo y teléfono opcionales, el resto desactivado. El nombre y apellido siempre son obligatorios |
| `guestRegistrationImage` | pública | URL de la foto de encabezado; B1App la muestra en formato 16:9 en lugar del icono en el formulario y en la pantalla de confirmación |
| `guestRegistrationGroupId` | privada | Grupo al que se agrega cada registro (los invitados nunca lo ven ni lo eligen) |
| `guestRegistrationRecordAttendance` | privada | `"true"` para también registrar la asistencia de ese grupo |

`src/components/checkin/GuestRegister.tsx` de B1App obtiene la lista de verificación del endpoint anónimo `GET /membership/people/guest-register/options?churchId=` y muestra solo los campos incluidos (correo, teléfono, estado civil y dirección en el contacto principal; fecha de nacimiento, género y grado por miembro; un cuadro de comentarios), y envía solo esos. El servidor vuelve a aplicar la lista de verificación en `GuestRegistrationHelper.sanitize()` — los campos desactivados se descartan, y los obligatorios faltantes o los valores fuera de la lista producen un 400 — antes de que se ejecute `PersonHelper.registerGuestHousehold()`. Primero llama a `PersonRepo.findGuestMatch()` para cada miembro con correo o teléfono: exactamente una persona activa con el mismo nombre y el mismo correo o los mismos dígitos de teléfono se reutiliza (cero o varias coincidencias crean una persona nueva, de modo que nunca adivina). Un miembro sin contacto se busca por nombre dentro del hogar coincidente. Las personas reutilizadas nunca se editan, de modo que un formulario anónimo no puede sobrescribir datos almacenados, y la respuesta repite los nombres enviados. Los miembros no coincidentes se unen al hogar coincidente o a uno nuevo, como `membershipStatus: "Visitor"`, emitiendo `person.created` por cada persona nueva. Después, los fallos se registran en lugar de devolverse: los miembros se agregan al grupo configurado (`group.member.added`); si el registro de asistencia está activado, `AttendanceModuleGateway.recordAttendance()` marca como presente a cada miembro en cada horario de servicio del grupo que tenga programación y cuya ventana de registro (`CheckinGateHelper.isServiceTimeOpen`) esté abierta en este momento, creando la sesión para la fecha local de la iglesia si hace falta; los horarios sin programar y los registros fuera de la ventana no registran nada; y los comentarios se convierten en una conversación oculta de nota de persona sobre el jefe de hogar (autor del mensaje "Guest sign-up"), vinculada mediante `person.conversationId`.

## Páginas relacionadas

- [Endpoints de Attendance](../api/endpoints/attendance) -- REST completo para campus, servicios, sesiones, visitas y visitas por sesión
- [Endpoints de Membership](../api/endpoints/membership) -- Personas, hogares y grupos
- [Webhooks](../api/webhooks) -- Los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura del módulo](../api/module-structure) -- Cómo se organiza el módulo de asistencia en el servidor
