---
title: "Registros de entrada"
description: "Cómo funciona el registro de asistencia en B1Checkin, B1App y B1 Admin: el modelo de datos de asistencia, los grupos como salas, los límites de capacidad y las reglas de seguridad para la recogida."
---

# Registros de entrada

<div class="article-intro">

El registro de entrada es un solo sistema con tres puertas de acceso: la aplicación de quiosco B1Checkin para las estaciones atendidas y de autoservicio, el autorregistro dentro del portal de miembros de B1App, y la asistencia desde el lado administrativo en B1Admin. Las tres escriben en el mismo módulo de asistencia de la API principal, y el enrutamiento a los salones se basa por completo en los Grupos: no existe una entidad aparte de "ubicaciones" o "salones". Sobre todo esto hay una capa de seguridad infantil: tipos de registro por visita, compuertas de capacidad y de proporción de voluntarios en el servidor, elegibilidad por edad o grado en el quiosco, verificación de personas autorizadas para recoger al momento de la salida, y avisos a los padres a través del proveedor de mensajes de texto de la iglesia. Esta página describe el modelo de datos, los flujos de registro, la capa de seguridad y la canalización de impresión de etiquetas.

</div>

## Descripción general

```
┌──────────────────────────┐
│ B1Checkin (quiosco Expo) │──┐         ┌──────────────────────────────────────────────┐
│  búsqueda → hogar →      │  │         │ Api                                          │
│  grupos → completar/imprimir │  HTTPS  │  ┌─ módulo membership ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personas · hogares · grupos             │ │
│ B1App (autorregistro)    │──┤         │  └─────────────────────────────────────────┘ │
│  pantalla /mobile/checkin│  │         │  ┌─ módulo attendance ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campus → servicios → horarios de servicio│ │
│ B1Admin (personal)       │──┘         │  │ groupServiceTimes  (enrutamiento a salón)│ │
│  configuración · informes ·│          │  │ sessions ← visitSessions → visits       │ │
│  diseñador de etiquetas  │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Ruta de impresión de etiquetas (solo quiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (plantillas de etiqueta, o HTML integrado de respaldo)
       └▶ LabelRenderer → documento HTML + códigos de barras SVG en línea
            └▶ PrintUI: renderizado en WebView → captura JPG con ViewShot
                 └▶ módulo nativo printer-helper → Brother QL / Zebra
```

| Superficie | Repositorio | Stack | Función |
|------------|-------------|-------|---------|
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivos de expo-router; compilaciones EAS para Android, Amazon Fire e iOS; actualizaciones OTA mediante `expo-updates` | Estación atendida o de autoservicio con impresión de etiquetas y salida verificada |
| Autorregistro | `B1App` | Next.js (portal de miembros b1.church) | Los miembros con sesión iniciada registran la entrada de su hogar desde el teléfono; sin impresión |
| Administración | `B1Admin` | SPA de React | Configura la estructura de servicios, asigna grupos a horarios de servicio, diseña etiquetas, registra la asistencia manual y ejecuta informes |

Las tres llaman a los mismos dos módulos de la API mediante `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; y **AttendanceApi** (`/attendance`) para todo lo que sigue.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|-----------------|--------------|-------------|
| `campuses` | name, address | Obsoleta aquí: los campus se administran en el módulo membership (`/membership/campuses`); la copia de attendance quedó congelada como solo lectura para los lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Una reunión recurrente, por ejemplo "Domingo por la mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un espacio de horario dentro de un servicio, por ejemplo "9:00 AM" (`models/ServiceTime.ts`). Las columnas de horario son opcionales (migración `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) y determinan la [ventana de registro](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (salones) se reúnen en qué horarios de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha; se crea de forma perezosa al momento del registro (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona que asiste en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado); lo establece el quiosco y lo consumen las compuertas de capacidad y proporción |
| `visitSessions` | visitId, sessionId | A qué sesión(es) cubre una visita; un niño registrado en dos horarios de servicio recibe dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (bloques JSON) | Diseños de etiqueta configurables (`models/LabelTemplate.ts`) |

### Cómo se persiste un registro completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) atiende `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es un arreglo de objetos `Visit`, cada uno con `visitSessions` cuya `session` incrustada solo indica un par `(serviceTimeId, groupId)`. Después, el servidor:

1. **Aplica las compuertas de capacidad y proporción antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica la capacidad de cada salón afectado, la capacidad de invitados, la bandera de cerrado y la proporción de voluntarios frente a la ocupación actual. postCheckin **no es transaccional**, así que la compuerta debe ejecutarse antes del primer guardado: una violación grave devuelve un 409 que nombra el salón o salones afectados, y no se persiste nada. Vea [Compuertas de capacidad y proporción de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve las sesiones de forma perezosa.** `getSessionId()` busca o crea la fila de `sessions` para `(groupId, serviceTimeId, hoy)`; los IDs de sesión se guardan en caché dentro del proceso por fecha. Las sesiones nuevas emiten un webhook `session.created`. El bucle es un `for..of` con `await`: un `forEach(async …)` sin esperar había competido con el guardado y escribía sessionIds NULL al crear la primera sesión (corregido; hay un comentario en el código junto al bucle).
3. **Reemplaza los registros del día.** Las visitas existentes de esas personas en ese servicio hoy se eliminan junto con sus visitSessions, y luego se guarda el conjunto enviado. Por eso, volver a registrar a una familia es una operación idempotente de "este es el estado actual", no una adición. Si se pasa `?checkDuplicates=true`, se devuelve `{ duplicates: [personId…] }` sin escribir nada; así es como el quiosco advierte antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres a partir del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales ni caracteres ambiguos, así que los códigos no pueden formar palabras ni leerse mal). El servidor reintenta si hay colisión con las visitas abiertas de la misma iglesia en el mismo día, y estampa el código en cada visita del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` asigna a cada personId el conteo de asistencias en semanas consecutivas; el quiosco celebra los hitos (cada 5.ª semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada**: si fue una semana anterior, se quitan los IDs, así que el cliente recibe una copia precargada de las selecciones de salón de la semana pasada, que se guardará como registros nuevos.

### Salida

Dos endpoints completan el ciclo (`VisitController`):

- `GET /attendance/visits/code/:code`: las visitas de hoy que aún no tienen salida y llevan ese código de seguridad, con las sesiones pobladas.
- `POST /attendance/visits/checkout`: cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; estampa `checkoutTime` y quién recogió, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos se autentican con `attendance.checkin`, que concede exactamente la superficie de registro, salida y plantillas de etiqueta, además de las búsquedas de hogar que necesita un quiosco sin `people.view` (búsqueda por teléfono o nombre, miembros del hogar en el modelo de registro y la lista de personas autorizadas para recoger). `SessionHelper.filterChurches` de B1Checkin solo ofrece las iglesias en las que la cuenta tiene `Attendance/Checkin` o `Attendance/Edit`. `Checkin` ya no forma parte de los permisos de Everyone (rol nulo) (`RoleHelper` y la migración `2026-11-01_remove_everyone_checkin`), así que debe otorgarse mediante un rol real; `attendance.view`/`attendance.edit` cubren los informes y la captura manual; la estructura (servicios, horarios de servicio, asignaciones de grupos) requiere `services.edit`. El autorregistro de miembros (B1App) no necesita ningún permiso: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor restringe los `personId` enviados al propio hogar de quien llama (403 en otro caso; esta barrera es lo que mantiene ilegibles los `securityCode` de otras familias). La membresía es la concesión; si los miembros *ven* la función lo controlan las pestañas de navegación de B1App de la iglesia. Los demás endpoints de registro (`code/:code`, `checkout`, `guardians`, `CheckinController`) siguen siendo solo para quiosco y personal.

## Los grupos determinan el enrutamiento a salones

No existe en todo el sistema una entidad de salón o aula. Un "salón" es un **grupo** de membership con `trackAttendance` activado, vinculado a uno o más horarios de servicio mediante `groupServiceTimes`. Los campos del grupo (en `Api/src/modules/membership/models/Group.ts`) que determinan el comportamiento del quiosco:

| Campo | Efecto |
|-------|--------|
| `trackAttendance` | El grupo participa en la asistencia; el árbol de configuración de B1Admin marca como no asignados los grupos con `trackAttendance` que no tienen fila en `groupServiceTimes` |
| `parentPickup` | Marca un salón infantil: registrarse en él convierte la visita en una visita "infantil", que imprime una etiqueta de recogida familiar y pone el código de seguridad en el gafete |
| `printNametag` | Si los registros en este grupo imprimen un gafete o no |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad del salón y un interruptor duro de "cerrado", aplicados en el servidor por la compuerta de registro (se editan en la configuración del grupo de B1Admin, en "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Proporción de niños por voluntario y número mínimo de voluntarios, aplicados según la configuración de toda la iglesia `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad por edad o grado que se evalúan en el quiosco para destacar o atenuar los salones |

Todos los clientes desnormalizan de la misma forma (por ejemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargan en paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups`, y luego, para cada horario de servicio, reúnen en `serviceTime.groups` los grupos cuya fila de `groupServiceTimes` apunta a él. Ese arreglo es lo que muestra el selector de salón, organizado por la `categoryName` del grupo.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, con `POST`/`DELETE /attendance/groupservicetimes`), y todo el árbol Campus → Servicio → Horario de servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` mediante `GET /attendance/attendancerecords/tree`.

:::info
Como los grupos son la única fuente de verdad, la misma membresía del grupo impulsa el enrutamiento del quiosco, la asistencia tipo lista en las páginas de grupo de B1Admin y los informes de asistencia. Asignar un grupo a un horario de servicio es el único paso necesario para convertirlo en destino de registro.
:::

## Seguridad infantil

### Tipos de registro {#check-in-types}

Cada visita lleva un `checkinType`: `member`, `guest` o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo lo elige el **quiosco**: los chips Member / Guest / Volunteer en la fila expandida del miembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), y se estampa en cada visita pendiente al completar (`app/checkinComplete.tsx`, con `member` por defecto). El servidor lo usa en la compuerta: los voluntarios cuentan para la cobertura de proporción en lugar de contar contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Compuertas de capacidad y proporción de voluntarios {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el endpoint no es transaccional, así que la corrección depende de validar antes de guardar). Carga la ocupación actual por grupo afectado (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo a través del gateway del módulo membership, y luego clasifica las violaciones:

- **Graves (siempre bloquean):** `checkinClosed`, `actual + entrante > capacity`, o más invitados que `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`, y el quiosco muestra el salón señalado.
- **De proporción (advierten o bloquean):** no voluntarios entrantes a un salón donde `volunteers < minVolunteers`, sin voluntarios en absoluto, o donde `children > volunteers × volunteerRatio`. La severidad depende de la configuración por iglesia `ratioEnforcement` (`"warn"` por defecto / `"block"`, que se edita en B1Admin en Manage Church → Check-In, `CheckinSettingsEdit.tsx`). En modo de advertencia devuelve `409 { warning: true, error: "ratio", … }`, a menos que el cliente reenvíe con `acknowledgeWarnings=true`; ese reenvío es la anulación confirmada por el personal en el quiosco.

### Ventanas de registro programadas {#scheduled-check-in-windows}

Un horario de servicio puede tener una programación semanal opcional (`dayOfWeek` de 0 a 6, con 0 = domingo; `startTime`/`endTime` en formato `HH:mm`; `checkinOpenMinutes`; `checkinCloseMinutes`), que se edita en el formulario de horario de servicio de **Attendance → Setup** de B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` considera que un horario de servicio está programado solo cuando `dayOfWeek` y `startTime` están definidos; los horarios sin programar nunca se limitan por tiempo. `isServiceTimeOpen()` calcula la ventana en hora local de pared (`DateHelper.toChurchTime`). La zona horaria se resuelve por horario de servicio con `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): primero la `timezone` del campus del servicio (`service.campusId`, mediante `MembershipModuleGateway.loadCampusTimeZones`), luego el `timeZone` de la iglesia (configurado en Church Information de B1Admin), después el primer campus no eliminado que tenga una `timezone` (`loadCampusTimeZone`), y solo al final `America/New_York`. El campus va primero porque muchas iglesias tenían `America/New_York` retroactivamente como zona de la iglesia. Tanto la ruta de listado como la de envío que se describen abajo resuelven la zona de la misma forma. La ventana va desde `checkinOpenMinutes` antes del inicio hasta `checkinCloseMinutes` después del final (o después del inicio, si no hay final), y maneja las ventanas que cruzan la medianoche o el límite de la semana.

La ventana se aplica en dos lugares:

- **Listado:** `GET /attendance/servicetimes` estampa cada fila con un booleano calculado `checkinOpen`. El autorregistro de B1App (`CheckinPage.tsx`) y el selector de servicios de B1Checkin (`app/services.tsx`) conservan todos los horarios. Cuando todos los horarios de un servicio están cerrados, muestran la próxima apertura ("Check-in opens Sun 9:30 AM." en B1App, "Check-in for this service opens Sun 9:30 AM." en B1Checkin, a partir de `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), y si no puede calcularse ninguna apertura recurren a "Check-in isn't open for this service right now." (el quiosco ofrece un botón Atrás para elegir otro servicio). De lo contrario, los horarios cerrados se muestran como una fila no seleccionable "Closed" / "Closed · opens 9:30 AM". La pantalla de hogar de B1Checkin (`MemberServiceTimes.tsx`) vuelve a evaluar en vivo si el horario está abierto con el reloj del dispositivo mediante `ServiceTimeHelper.isCheckinOpen()` (zona horaria del dispositivo, no la de la iglesia), así que un quiosco que se deja encendido abre y cierra a tiempo, y muestra "Kids Room 1 · Checked in" (nombre del grupo) en un horario cerrado en el que la persona ya tiene registro.
- **Envío:** dentro de `evaluateGates()`, antes de la evaluación de capacidad y proporción, `findClosedServiceTimeGroups()` rechaza el lote con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si el horario de servicio de alguna sesión afectada está fuera de su ventana. Como los registros de hoy de un hogar se reenvían con cada registro, las sesiones que la persona ya tiene (`personId|sessionId` en las visitas existentes) omiten esta compuerta: así, agregar un horario de servicio posterior que esté abierto no se rechaza solo porque cerró una ventana anterior. B1Checkin muestra esto en su pantalla de compuerta dura con el motivo "check-in isn't open right now" (las violaciones de capacidad siguen mostrando "room is full or closed").

### Elegibilidad por edad o grado (en el quiosco) {#agegrade-eligibility-kiosk-side}

La elegibilidad de los salones es una interfaz de orientación, evaluada en el quiosco y no aplicada por el servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento o el grado de una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grados: PreK, K, 1–12, Graduated) y devuelve `eligible` / `ineligible` / `unknown`; los datos faltantes producen `unknown` y nunca ocultan un salón. Las edades y los grados se calculan a la fecha de la **promoción de grado** de la iglesia (configuración `gradePromotionDate`, `"MM-DD"`, que se edita en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco la obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` toma la ocurrencia más reciente en o antes de hoy. El selector de salones destaca los salones elegibles y atenúa los no elegibles; elegir un salón atenuado requiere una confirmación del personal.

### Recogida autorizada y no autorizada {#trusted-and-not-authorized-pickup}

Las personas autorizadas para recoger son una entidad de membership, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`: householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). El CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario autenticado de la iglesia, para que los quioscos puedan leerla), más `POST` / `DELETE` protegidos por `people.edit`. El personal administra la lista en la tarjeta **Pickup** de la página de la persona (`B1Admin/src/people/components/PickupPeople.tsx`): foto, parentesco y un chip de estado Trusted / Not Authorized.

Al momento de la salida (`B1Checkin/app/checkout.tsx`), el quiosco carga la lista de recogida del hogar: las entradas `trusted` aparecen como tarjetas de recogida tocables junto con la cuadrícula de fotos de los adultos del hogar, y un nombre escrito libremente como "Other" se compara de forma aproximada (distancia de Levenshtein, `src/helpers/PickupMatchHelper.ts`) con las entradas `notAuthorized`; una coincidencia bloquea la salida con una hoja de advertencia y un botón de **Override** del personal. La anulación queda registrada en la propia visita: envía `checkedOutBy` como `"OVERRIDE: {name}"` mediante el `POST /attendance/visits/checkout` normal, así que aparece en el registro de asistencia y en el webhook `attendance.checkout`, en lugar de en una tabla de auditoría separada.

### Localizar a un padre y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos endpoints de SMS:

- `POST /page`: `{ visitId, message }`: localiza a los tutores de un niño registrado (pantalla de salida del quiosco, en modo atendido).
- `POST /broadcast`: `{ serviceId, message }`: envía un mensaje de texto a los adultos de cada hogar registrado en un servicio (configuración de administrador del quiosco, detrás de una hoja de confirmación de tipo `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven a los adultos del hogar a través del gateway de membership y luego entregan el envío a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`): la puerta entre módulos hacia el proveedor de mensajes de texto configurado de la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no hay un emisor de SMS integrado). El gateway registra una fila `sentText` más entradas `deliveryLog` por destinatario, y limita un lote a 500 destinatarios; si no hay proveedor configurado, devuelve `no_provider`, que el quiosco muestra como "No SMS provider configured". El `dispatch()` del controlador elimina los números duplicados y omite a las personas sin celular o con `optedOut` activo, y devuelve `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el quiosco muestre qué se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos de expo-router bajo `B1Checkin/app/`; el estado entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no en el estado de React.

```
index (arranque/inicio automático) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carga serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ imprime etiquetas,
             groupServiceTimes,           │             └▶ checkout (atendido)         vuelve automáticamente
             labelTemplates               │                                            a lookup
```

1. **Búsqueda** (`app/lookup.tsx`): busca por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 dígitos o completo) o por nombre (`GET /membership/people/search?term=`). Al seleccionar una coincidencia se carga el hogar (`GET /membership/people/household/{householdId}`) y las visitas existentes (`GET /attendance/visits/checkin`), que precargan los `pendingVisits` con las selecciones de la semana pasada.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`): cada fila de miembro muestra una insignia de ya registrado, una insignia de alergias / `nametagNotes` y sus chips de salón actuales. Al expandir un miembro se listan todos los horarios de servicio con un botón de salón más los chips de tipo de registro Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Debajo del nombre de cada horario de servicio, `ServiceTimeHelper.getGroupSummary()` muestra los grupos ofrecidos ahí (los nombres de `serviceTime.groups`, recortados, sin duplicados sin distinguir mayúsculas, separados por comas); no se muestra nada cuando el horario no tiene grupos.
3. **Asignación de grupo** (`app/selectGroup.tsx`): un árbol de categorías construido a partir de `serviceTime.groups`, con los salones elegibles por edad o grado destacados y los no elegibles atenuados detrás de una confirmación del personal (vea [Elegibilidad por edad o grado](#agegrade-eligibility-kiosk-side)); elegir un salón escribe una visitSession `{ session: { serviceTimeId, groupId } }` en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "None" la borra.
4. **Completar** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` con `pendingVisits` (cada una estampada con su `checkinType`), luego imprime las etiquetas si hay una impresora configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad o `notOpen` muestra el salón señalado con el motivo (lleno o cerrado, o registro no abierto); una advertencia de proporción ofrece una confirmación del personal que reenvía con `acknowledgeWarnings=true`.

La pantalla de **salida** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres mediante un campo con enfoque automático, de modo que los escáneres de código de barras por teclado USB o Bluetooth funcionan sin cámara, o un teclado numérico en pantalla que usa el mismo alfabeto, con envío automático a los 4 caracteres. Un botón **Scan** abre una hoja con la cámara compartida `src/components/CodeScanner.tsx` (cámara trasera por defecto, que acepta QR, Code 128 y Code 39), para que las estaciones sin escáner de teclado puedan leer la etiqueta de recogida; un código escaneado alimenta la misma ruta `handleCode()` que la entrada escrita. Busca el código, muestra los niños que se van a recoger y presenta las **personas autorizadas para recoger** del hogar como tarjetas tocables junto con una cuadrícula de fotos de los adultos del hogar (más una opción "Other" de texto libre que se verifica de forma aproximada contra los nombres no autorizados; vea [Recogida autorizada y no autorizada](#trusted-and-not-authorized-pickup)), y luego envía `POST /attendance/visits/checkout` con el nombre/ID del elegido. En modo atendido, la pantalla también ofrece **Page a parent** (`POST /attendance/checkin/page`) y una **reimpresión de la etiqueta de seguridad**: `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las envía por la misma canalización `PrintUI` que el registro.

La personalidad de la estación es un indicador de AsyncStorage `@StationMode` (`"self"` | `"manned"`, que se alterna en `app/adminSettings.tsx`). El modo atendido agrega el punto de entrada de salida en la pantalla de búsqueda y la edición de perfil por miembro (`POST /membership/people`) desde la pantalla del hogar. El endurecimiento del quiosco viene integrado: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege las pantallas de administrador e impresora; la pantalla de administrador solo se abre con 7 toques rápidos en el logotipo del encabezado; y una pantalla de reposo (`src/hooks/useInactivityTimer.ts`) toma el control entre una familia y otra.

## Autorregistro (B1App)

Los miembros registran su entrada desde el portal b1.church, en la pantalla `/mobile/checkin` (que `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` enruta a `screens/CheckinPage.tsx`). Requiere un usuario con sesión iniciada y recorre los mismos cuatro pasos que el quiosco —servicios → hogar → grupos → completar— con los mismos endpoints, con el estado en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias con el quiosco: el hogar viene del `householdId` propio del usuario con sesión (no hay paso de búsqueda), y no hay impresión de etiquetas; en su lugar, la pantalla de finalización muestra el código de seguridad del lote como QR (`qrcode.react`) con la indicación "show this at a check-in station". Si el hogar ya está registrado al cargar la página, un botón "Show check-in code" vuelve a mostrar el QR de la primera visita existente (de `GET /attendance/visits/checkin`) que tenga un `securityCode`. El registro se guarda de inmediato al enviar (no hay estado pendiente); el QR solo sirve para impulsar la impresión de etiquetas en el quiosco.

**Impresión de etiquetas desde el teléfono en el quiosco** (`B1Checkin/app/scan.tsx`, al que se llega desde el botón "Scan code" del QR en la pantalla de búsqueda): el quiosco muestra `CodeScanner` (un `CameraView` de `expo-camera`, con cámara frontal por defecto y que se puede voltear) buscando códigos QR. `ScanCodeHelper.parse()` acepta una carga solo cuando es un código de 4 caracteres del alfabeto de códigos de seguridad, y `ScanCodeHelper.isRepeat()` ignora el mismo código durante 4 segundos, así que funcionan tanto el QR de B1App como el bloque QR de una etiqueta impresa. La pantalla sigue entonces la ruta de reimpresión de salida —`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`— y regresa a la búsqueda. No hay ninguna escritura de asistencia al escanear; solo etiquetas. Los códigos sin visitas activas, las estaciones sin impresora y los grupos sin etiquetas muestran un aviso emergente y regresan a la búsqueda.

Los tipos y `ApiHelper`/`ArrayHelper` provienen de `@churchapps/helpers` y `@churchapps/apphelper`; no se comparten componentes de React con B1Admin.

## Asistencia desde el administrador (B1Admin)

- **Configuración**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) muestra el árbol de estructura y permite crear servicios (`ServiceEdit.tsx`) y horarios de servicio (`ServiceTimeEdit.tsx`). Los datos de campus provienen de membership mediante el hook `useCampuses()`.
- **La asistencia manual** vive en el lado de Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`; al agregar, `SessionEdit.tsx` puede incluir una sesión por cada otro grupo que comparta el horario de servicio elegido, omitiendo los grupos que ya tienen una sesión en esa fecha) y marca a las personas como presentes mediante `POST /attendance/visitsessions/log`, que busca o crea la visita de esa persona y sesión. Los líderes de grupo pueden registrar la asistencia de sus propios grupos sin el permiso `attendance.edit`: los controladores verifican `au.leaderGroupIds`.
- **Informes**: la tendencia de asistencia y la asistencia por grupo son informes definidos en el servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi; las definiciones están en `Api/reports/*.json`). Ambos reciben `startDate`/`endDate` (fecha final incluida); el informe de tendencia usa por defecto desde hace un año hasta hoy y agrega una columna `sessionDates` por semana, y el árbol en pantalla de asistencia por grupo incluye el `checkinTime` de cada visita y el `membershipStatus` de la persona. El CSV de asistencia por grupo proviene del informe complementario `groupAttendanceDownload`, pivotado por `GroupAttendanceDownloadHelper` en una fila por miembro del grupo con una columna de presente/ausente por cada sesión con fecha; el historial por persona es `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin, en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, a la que se llega desde la página de configuración de Check-In). Una plantilla es una fila de `labelTemplates` cuyo `content` es un arreglo JSON de bloques (`text`, `field`, `barcode`, `qrcode` o `box`), cada uno posicionado en coordenadas porcentuales, con fuente, alineación, simbología (`code39`/`code128`/`qr`) y condiciones de visibilidad opcionales (por ejemplo, mostrar el cuadro de alergias solo cuando `person.nametagNotes` no esté vacío). Existen dos `labelType`: `nametag` (una por persona registrada; campos como `person.displayName`, `sessions`, `securityCode` y `person.isBirthdayWeek`, que es `"true"` cuando el mes y el día del cumpleaños están a menos de 3 días de hoy, con envoltura al cambiar de año, calculado por `LabelHelper.isBirthdayWithin()`) y `pickup` (una por familia; campos como `children`, `childrenAllergies`). El servidor impone una sola plantilla predeterminada por tipo y por iglesia (`LabelTemplateController.save`). El diseñador incluye plantillas iniciales que reproducen las etiquetas integradas del quiosco y muestra vistas previas con datos de ejemplo.

### Renderizado e impresión en el quiosco

Al completar el registro, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir a partir de las banderas de grupo de cada visita pendiente: gafetes para los grupos con `printNametag`, más una etiqueta familiar de recogida si alguna visita llegó a un grupo `parentPickup`. Las visitas con `checkinType` `volunteer` las omite `LabelHelper.selectChildVisits()`, así que un trabajador de cuidado infantil en un salón de Parent Pickup nunca activa una etiqueta de recogida. El código de seguridad de la respuesta del registro se coloca en los gafetes de los niños y en la etiqueta de recogida; los gafetes de adultos se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte los bloques más un contexto de campos en un documento HTML independiente; si no, se usan las etiquetas HTML integradas en `B1Checkin/assets/labels/` con sustitución de marcadores.

Los códigos de barras se generan como SVG en línea mediante codificadores en TypeScript puro en `B1Checkin/src/helpers/barcode.ts`: tablas de patrones de Code 39 y tablas de anchos de Code 128 (conjunto B con suma de verificación mod-103), además de QR mediante el paquete `qrcode`. **Estos codificadores están duplicados a propósito en B1Admin** (`LabelEditor.tsx` incluye en línea las mismas tablas, lo que se anota en un comentario del código), para que las vistas previas del diseñador sean fieles píxel a píxel a la salida del quiosco; un cambio en uno debe reflejarse en el otro.

La canalización de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura como JPG mediante `react-native-view-shot` y entrega las URI de las imágenes al módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK de impresión de Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red de la serie QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas troqueladas de 29×90, la opción predeterminada recomendada |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento en red + impresión de imagen por TCP/ZPL |

La selección de impresora está en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip`; la elección se guarda en AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en el dispositivo, visible mediante un punto de estado en vivo en el encabezado del quiosco.

## Registro de invitados

Dos rutas crean una persona durante el registro:

- **En el quiosco**: "Add guest" de la pantalla del hogar abre `B1Checkin/app/addGuest.tsx`, que primero busca en `GET /membership/people/search?term=` una coincidencia existente que no sea miembro y, si no la hay, crea una con `POST /membership/people`, asociada al hogar actual. El invitado sigue después la asignación de grupo como cualquier miembro.
- **Autoservicio mediante QR**: cuando la configuración de la iglesia `enableQRGuestRegistration` está activa (se configura en Check-In de B1Admin, y se lee de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un QR que enlaza a `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre desde su propio teléfono mediante el endpoint anónimo `POST /membership/people/guest-register`, con lo que la fila del quiosco avanza. La hoja del QR también tiene un botón **Register here** que abre la misma página en el quiosco (`app/guestRegister.tsx`) en un `WebView` de incógnito, sin caché; `src/helpers/GuestRegisterHelper.ts` construye la URL tanto para el QR como para el WebView, y bloquea la navegación fuera de `https://{subdomain}.b1.church/guest-register`. La pantalla regresa a la búsqueda al pulsar **Done**, al retroceder o tras 120 segundos de inactividad (la escritura en el formulario se reenvía desde el WebView como actividad), y desmonta el WebView para que los datos de una familia nunca lleguen a la siguiente.

El registro por QR se controla con configuraciones de la iglesia guardadas desde la tarjeta **QR Guest Registration** de B1Admin (`src/mobile/CheckInPage.tsx`):

| Configuración | Visibilidad | Propósito |
|---|---|---|
| `enableQRGuestRegistration` | pública | Interruptor de adhesión para el QR del quiosco y los endpoints anónimos |
| `guestRegistrationFields` | pública | Mapa JSON de `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Por defecto: correo y teléfono opcionales, el resto desactivado. El nombre y los apellidos siempre son obligatorios |
| `guestRegistrationImage` | pública | URL de la foto de encabezado; B1App la muestra en 16:9 en lugar del ícono del formulario y de la pantalla de confirmación |
| `guestRegistrationGroupId` | privada | Grupo al que se agrega cada registro (los invitados nunca lo ven ni lo eligen) |
| `guestRegistrationRecordAttendance` | privada | `"true"` para registrar también la asistencia de ese grupo |

`src/components/checkin/GuestRegister.tsx` de B1App obtiene la lista de verificación del endpoint anónimo `GET /membership/people/guest-register/options?churchId=` y muestra solo los campos incluidos (correo, teléfono, estado civil y dirección en el contacto principal; fecha de nacimiento, género y grado por miembro; un solo cuadro de comentarios), y envía únicamente esos. El servidor vuelve a aplicar la lista en `GuestRegistrationHelper.sanitize()`: los campos desactivados se descartan, y los valores obligatorios faltantes o fuera de la lista producen un 400, antes de que se ejecute `PersonHelper.registerGuestHousehold()`. Primero llama a `PersonRepo.findGuestMatch()` para cada miembro con correo o teléfono: se reutiliza exactamente una persona activa con el mismo nombre y el mismo correo o los mismos dígitos de teléfono (cero o varias coincidencias crean una persona nueva, así que nunca adivina). Un miembro sin datos de contacto se relaciona por nombre dentro del hogar relacionado. Las personas reutilizadas nunca se editan, así que un formulario anónimo no puede sobrescribir datos guardados, y la respuesta repite los nombres enviados. Los miembros no relacionados se unen al hogar relacionado o a uno nuevo, como `membershipStatus: "Visitor"`, y emiten `person.created` por cada persona nueva. Después, los fallos se registran en lugar de devolverse: los miembros se agregan al grupo configurado (`group.member.added`); si el registro de asistencia está activado, `AttendanceModuleGateway.recordAttendance()` marca a cada miembro como presente en todos los horarios de servicio programados del grupo cuya ventana de registro (`CheckinGateHelper.isServiceTimeOpen`) esté abierta en ese momento, y crea la sesión para la fecha local de la iglesia si hace falta; los horarios sin programar y los registros fuera de la ventana no registran nada; y los comentarios se convierten en una conversación de nota privada de la persona sobre el jefe de hogar (autor del mensaje "Guest sign-up"), vinculada mediante `person.conversationId`.

## Páginas relacionadas

- [Endpoints de Attendance](../api/endpoints/attendance.md): superficie REST completa para campus, servicios, sesiones, visitas y visitSessions
- [Endpoints de Membership](../api/endpoints/membership.md): personas, hogares y grupos
- [Webhooks](../api/webhooks.md): los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura de módulos](../api/module-structure.md): cómo se organiza del lado del servidor el módulo de asistencia
