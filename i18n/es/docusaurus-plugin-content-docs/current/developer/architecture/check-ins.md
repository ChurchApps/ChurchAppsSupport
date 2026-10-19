---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

El check-in es un solo sistema con tres puntos de acceso: la aplicación de quiosco B1Checkin para estaciones con personal y de autoservicio, el registro de entrada en el portal de miembros de B1App, y la asistencia desde el lado administrativo en B1Admin. Los tres escriben en el mismo módulo de asistencia de la API principal, y el enrutamiento a las aulas se basa por completo en los Grupos; no existe una entidad independiente de "ubicaciones" o "salas". Encima de todo hay una capa de seguridad infantil: tipos de check-in por visita, controles de capacidad y de proporción de voluntarios en el servidor, elegibilidad por edad o grado en el quiosco, verificación de recogida de confianza al registrar la salida, y avisos a los padres mediante el proveedor de mensajes de texto de la iglesia. Esta página describe el modelo de datos, los flujos de check-in, la capa de seguridad y el proceso de impresión de etiquetas.

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
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivos con expo-router; compilaciones con EAS para Android, Amazon Fire e iOS; actualizaciones OTA mediante `expo-updates` | Estación con personal o de autoservicio con impresión de etiquetas y registro de salida verificado |
| Check-in propio | `B1App` | Next.js (portal de miembros b1.church) | Los miembros con sesión iniciada registran a su hogar desde el teléfono; sin impresión |
| Administración | `B1Admin` | SPA de React | Configura la estructura de servicios, asigna grupos a los horarios de servicio, diseña etiquetas, registra la asistencia manual y genera informes |

Los tres llaman a los mismos dos módulos de la API mediante `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo demás de la lista siguiente.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta aquí: los campus se gestionan en el módulo de membresía (`/membership/campuses`); la copia de asistencia está congelada en solo lectura para los lectores heredados (`models/Campus.ts`) |
| `services` | campusId, name | Una reunión recurrente, p. ej. "Domingo por la mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Un horario dentro de un servicio, p. ej. "9:00 AM" (`models/ServiceTime.ts`). Las columnas de programación son opcionales (migración `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) y determinan la [ventana de check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué horarios de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha; se crea de forma diferida en el momento del check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona que asiste en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado), lo asigna el quiosco y lo consumen los controles de capacidad y proporción |
| `visitSessions` | visitId, sessionId | Qué sesión(es) cubre una visita; un niño registrado en dos horarios de servicio tiene dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Diseños de etiquetas personalizables (`models/LabelTemplate.ts`) |

### Cómo se guarda un check-in completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) gestiona `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es un arreglo de objetos `Visit`, cada uno con `visitSessions` cuya `session` incrustada solo indica un par `(serviceTimeId, groupId)`. Luego el servidor:

1. **Verifica la capacidad y las proporciones antes de escribir.** `evaluateGates()` → `CheckinGateHelper.evaluate()` revisa para cada sala destino la capacidad, la capacidad de invitados, la marca de cerrada y la proporción de voluntarios frente a la ocupación actual. postCheckin **no es transaccional**, por lo que el control debe ejecutarse antes del primer guardado: una violación grave devuelve un 409 que indica la(s) sala(s) afectada(s) y no se guarda nada. Véase [Controles de capacidad y proporción de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve las sesiones de forma diferida.** `getSessionId()` busca o crea la fila de `sessions` para `(groupId, serviceTimeId, hoy)`; los ids de sesión se guardan en caché en el proceso por fecha. Las sesiones nuevas emiten un webhook `session.created`. El bucle es un `for..of` con `await`: un `forEach(async …)` sin esperar causaba una carrera con el guardado y escribía sessionIds NULL al crear la primera sesión (corregido; se indica en un comentario de código en el bucle).
3. **Reemplaza los registros del día.** Las visitas existentes de esas personas en ese servicio hoy se eliminan junto con sus visitSessions, y luego se guarda el conjunto enviado. Volver a registrar a una familia es, por tanto, una operación idempotente de "este es el estado actual", no un añadido. Si se pasa `?checkDuplicates=true`, se devuelve `{ duplicates: [personId…] }` sin escribir nada; así es como el quiosco avisa antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres a partir del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales ni caracteres ambiguos, para que los códigos no formen palabras ni se lean mal). El servidor reintenta si hay colisión con las visitas abiertas del mismo día de la misma iglesia y asigna el código a cada visita del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` asigna a cada personId el número de semanas consecutivas de asistencia; el quiosco celebra los hitos (cada 5.ª semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de las personas desde su **última fecha registrada**; si fue una semana anterior, los ids se eliminan, de modo que el cliente recibe una copia precargada de las selecciones de salas de la semana pasada que se guardarán como registros nuevos.

### Registro de salida

Dos endpoints completan el ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` — las visitas de hoy que aún no tienen salida registrada y llevan ese código de seguridad, con las sesiones cargadas.
- `POST /attendance/visits/checkout` — cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; registra `checkoutTime` y quién recogió, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos se autentican con `attendance.checkin`, que concede exactamente la superficie de check-in, check-out y plantillas de etiquetas; `attendance.view`/`attendance.edit` cubren los informes y la entrada manual; la estructura (servicios, horarios de servicio, asignaciones de grupos) requiere `services.edit`. El check-in propio de los miembros (B1App) no necesita ningún permiso: cualquier usuario autenticado con una persona vinculada en la iglesia puede llamar a `GET`/`POST /attendance/visits/checkin`, y el servidor limita los `personId` enviados a su propio hogar (403 en caso contrario); esta barrera es lo que impide leer los `securityCode` de otras familias. La membresía es el permiso; si los *miembros ven* la función lo controlan las pestañas de navegación de B1App de la iglesia. Los demás endpoints de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) siguen siendo solo para quiosco y personal.

## Los grupos determinan el enrutamiento a las salas

En todo el sistema no existe ninguna entidad de sala o aula. Una "sala" es un **grupo** de membresía con `trackAttendance` activado, vinculado a uno o más horarios de servicio mediante `groupServiceTimes`. Los campos del grupo (en `Api/src/modules/membership/models/Group.ts`) que determinan el comportamiento del quiosco son:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en la asistencia; el árbol de configuración de B1Admin marca como no asignados los grupos con `trackAttendance` que no tienen una fila en `groupServiceTimes` |
| `parentPickup` | Marca una sala infantil: registrarse en ella convierte la visita en una visita "infantil", lo que imprime una etiqueta de recogida familiar y coloca el código de seguridad en la credencial |
| `printNametag` | Si los registros en este grupo imprimen una credencial |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de la sala y un interruptor "cerrada" de carácter estricto, aplicados en el servidor por el control de check-in (se edita en la configuración del grupo en B1Admin, bajo "Capacidad de check-in") |
| `volunteerRatio` / `minVolunteers` | Proporción de niños por voluntario y número mínimo de voluntarios, aplicados según el ajuste `ratioEnforcement` de toda la iglesia |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad por edad o grado, evaluados en el quiosco para resaltar o atenuar las salas |

Todos los clientes desnormalizan los datos de la misma forma (p. ej. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): cargan en paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` y `GET /membership/groups`, y luego, para cada horario de servicio, reúnen en `serviceTime.groups` los grupos cuya fila de `groupServiceTimes` apunta a ese horario. Ese arreglo es lo que muestra el selector de salas, organizado por el `categoryName` del grupo.

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), y todo el árbol Campus → Servicio → Horario de servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` mediante `GET /attendance/attendancerecords/tree`.

:::info
Como los grupos son la única fuente de verdad, la misma pertenencia a un grupo alimenta el enrutamiento del quiosco, la asistencia tipo lista en las páginas de grupos de B1Admin y los informes de asistencia: asignar un grupo a un horario de servicio es el único paso necesario para convertirlo en un destino de check-in.
:::

## Seguridad infantil

### Tipos de check-in

Cada visita lleva un `checkinType`: `member`, `guest` o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo lo elige el **quiosco**: los chips Miembro / Invitado / Voluntario de la fila expandida del miembro (`B1Checkin/src/components/MemberServiceTimes.tsx`), y se asigna a cada visita pendiente al completar el registro (`app/checkinComplete.tsx`, con `member` por defecto). El servidor lo usa en el control: los voluntarios cuentan para la cobertura de proporción en lugar de contar contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Controles de capacidad y proporción de voluntarios {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el endpoint no es transaccional, así que el control previo al guardado es el mecanismo de corrección). Carga la ocupación actual de cada grupo destino (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo a través de la pasarela del módulo de membresía, y luego clasifica las violaciones:

- **Graves (siempre bloquean):** `checkinClosed`, `actual + entrante > capacity`, número de invitados por encima de `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`; el quiosco muestra la sala indicada.
- **De proporción (avisan o bloquean):** no voluntarios entrantes en una sala donde `volunteers < minVolunteers`, sin voluntarios en absoluto, o `children > volunteers × volunteerRatio`. La gravedad sigue el ajuste de la iglesia `ratioEnforcement` (`"warn"` por defecto / `"block"`, que se edita en B1Admin Gestionar iglesia → Check-In, `CheckinSettingsEdit.tsx`). En modo aviso devuelve `409 { warning: true, error: "ratio", … }` salvo que el cliente reenvíe con `acknowledgeWarnings=true`; ese reenvío es la anulación que confirma el personal en el quiosco.

### Ventanas de check-in programadas {#scheduled-check-in-windows}

Un horario de servicio puede tener una programación semanal opcional (`dayOfWeek` de 0 a 6, donde 0 es domingo; `startTime`/`endTime` en formato `HH:mm`; `checkinOpenMinutes` y `checkinCloseMinutes`), que se edita en el formulario de horario de servicio de **Asistencia → Configuración** de B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Programación de check-in"). `CheckinGateHelper.hasSchedule()` considera que un horario de servicio está programado solo cuando se han definido `dayOfWeek` y `startTime`; los horarios sin programar nunca se limitan por tiempo. `isServiceTimeOpen()` calcula la ventana en la hora local de la iglesia (`DateHelper.toChurchTime`). La zona horaria es la `timeZone` de la iglesia; las iglesias sin ella configurada recurren al primer campus no eliminado que tenga un `timezone` (`MembershipModuleGateway.loadCampusTimeZone`) y, solo en último caso, a `America/New_York`. Tanto la lista como las rutas de envío resuelven la zona de la misma manera. La ventana abarca desde `checkinOpenMinutes` antes del inicio hasta `checkinCloseMinutes` después del final (o después del inicio si no hay final), y admite ventanas que cruzan la medianoche o el límite de la semana.

La ventana se aplica en dos puntos:

- **Listado:** `GET /attendance/servicetimes` añade a cada fila un booleano calculado `checkinOpen`. El check-in propio de B1App (`CheckinPage.tsx`) y el selector de servicios de B1Checkin (`app/services.tsx`) descartan los horarios con `checkinOpen === false` y muestran "El check-in no está abierto para este servicio en este momento." cuando un servicio tiene horarios pero ninguno está abierto (el quiosco ofrece un botón Atrás para elegir otro servicio).
- **Envío:** dentro de `evaluateGates()`, antes de la evaluación de capacidad y proporción, `findClosedServiceTimeGroups()` rechaza el lote con `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` si el horario de servicio de alguna sesión destino queda fuera de su ventana. B1Checkin muestra esto en su pantalla de control estricto con el motivo "el check-in no está abierto en este momento" (las violaciones de capacidad siguen mostrando "la sala está llena o cerrada").

### Elegibilidad por edad o grado (en el quiosco) {#agegrade-eligibility-kiosk-side}

La elegibilidad de las salas es una interfaz orientativa que se evalúa en el quiosco, no la aplica el servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento o el grado de una persona con `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grados: PreK, K, 1–12, Graduated) y devuelve `eligible` / `ineligible` / `unknown`. Si faltan datos, el resultado es `unknown` y nunca oculta una sala. Las edades y los grados se calculan a la fecha de **promoción de grado** de la iglesia (ajuste `gradePromotionDate`, formato `"MM-DD"`, que se edita en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco lo obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` elige la ocurrencia más reciente en o antes de hoy. El selector de salas resalta las salas elegibles y atenúa las no elegibles; elegir una sala atenuada requiere la confirmación del personal.

### Recogida de confianza y personas no autorizadas {#trusted-and-not-authorized-pickup}

Las personas autorizadas para recoger son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). El CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario autenticado de la iglesia, para que los quioscos puedan leerlo) más `POST` / `DELETE` protegidos por `people.edit`. El personal gestiona la lista en la tarjeta **Recogida** de la página de la persona (`B1Admin/src/people/components/PickupPeople.tsx`): foto, parentesco y un chip de estado Confiable / No autorizado.

Al registrar la salida (`B1Checkin/app/checkout.tsx`), el quiosco carga la lista de recogida del hogar: las entradas `trusted` aparecen como tarjetas pulsables junto con la cuadrícula de fotos de los adultos del hogar, y un nombre escrito libremente en "Otro" se compara de forma aproximada (distancia de Levenshtein, `src/helpers/PickupMatchHelper.ts`) con las entradas `notAuthorized`. Una coincidencia bloquea la salida con una hoja de advertencia y un botón **Anular** para el personal. La anulación queda registrada en la propia visita: envía `checkedOutBy` como `"OVERRIDE: {name}"` mediante el `POST /attendance/visits/checkout` normal, de modo que aparece en el registro de asistencia y en el webhook `attendance.checkout`, en lugar de en una tabla de auditoría independiente.

### Aviso a los padres y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos endpoints de SMS:

- `POST /page` — `{ visitId, message }`: avisa a los tutores de un niño registrado (pantalla de salida del quiosco, modo con personal).
- `POST /broadcast` — `{ serviceId, message }`: envía un mensaje de texto a los adultos de cada hogar registrado para un servicio (ajustes de administrador del quiosco, tras una hoja de confirmación que exige escribir `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven los adultos del hogar a través de la pasarela de membresía y delegan el envío en **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`): la puerta entre módulos hacia el proveedor de mensajes de texto configurado por la iglesia (`@churchapps/texting`: TextInChurch, Clearstream o MutualMinistry; no existe un emisor de SMS integrado). La pasarela registra una fila `sentText` más entradas `deliveryLog` por destinatario y limita cada lote a 500 destinatarios; si no hay proveedor configurado, devuelve `no_provider`, que el quiosco muestra como "No hay un proveedor de SMS configurado". El `dispatch()` del controlador elimina los números de teléfono duplicados y omite a las personas sin móvil o con `optedOut` activado, y devuelve `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el quiosco pueda mostrar qué se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos de expo-router en `B1Checkin/app/`; el estado compartido entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no en el estado de React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Búsqueda** (`app/lookup.tsx`): buscar por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 dígitos o completo) o por nombre (`GET /membership/people/search?term=`). Al seleccionar una coincidencia se carga el hogar (`GET /membership/people/household/{householdId}`) y las visitas existentes (`GET /attendance/visits/checkin`), y se rellenan los `pendingVisits` con las selecciones de la semana pasada.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`): cada fila de miembro muestra una insignia de ya registrado, una insignia de alergia o `nametagNotes`, y los chips de sala actuales. Al expandir a un miembro se muestran todos los horarios de servicio con un botón de sala y los chips de tipo de check-in Miembro / Invitado / Voluntario (`MemberServiceTimes.tsx`). Debajo del nombre de cada horario de servicio, `ServiceTimeHelper.getGroupSummary()` muestra los grupos ofrecidos en él (los nombres de `serviceTime.groups`, sin espacios sobrantes, sin duplicados sin distinguir mayúsculas, separados por comas); si el horario no tiene grupos, no se muestra nada.
3. **Asignación de grupo** (`app/selectGroup.tsx`): un árbol de categorías construido a partir de `serviceTime.groups`, con las salas elegibles por edad o grado resaltadas y las no elegibles atenuadas tras una confirmación del personal (véase [Elegibilidad por edad o grado](#agegrade-eligibility-kiosk-side)); elegir una sala escribe una visitSession `{ session: { serviceTimeId, groupId } }` en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "Ninguno" la borra.
4. **Completar** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` con `pendingVisits` (cada uno con su `checkinType`); luego imprime las etiquetas si hay una impresora configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad o `notOpen` muestra la sala indicada con el motivo (llena o cerrada, o check-in no abierto); un aviso de proporción ofrece una confirmación del personal que reenvía con `acknowledgeWarnings=true`.

La pantalla de **salida** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres mediante un campo con enfoque automático, de modo que funcionan los lectores de códigos de barras USB o Bluetooth en modo teclado sin necesidad de cámara, o un teclado en pantalla que usa el mismo alfabeto y se envía automáticamente al llegar a 4 caracteres. Un botón **Escanear** abre una hoja con la cámara compartida `src/components/CodeScanner.tsx` (por defecto la trasera, y acepta QR, Code 128 y Code 39) para las estaciones sin lector de teclado, de modo que puedan leer la etiqueta de recogida; un código escaneado sigue la misma ruta `handleCode()` que el texto escrito. La pantalla busca el código, muestra los niños que se van a recoger y presenta las **personas de recogida de confianza** del hogar como tarjetas pulsables, junto con una cuadrícula de fotos de los adultos del hogar (más una opción de texto libre "Otro", que se verifica de forma aproximada contra los nombres no autorizados; véase [Recogida de confianza y personas no autorizadas](#trusted-and-not-authorized-pickup)); después envía `POST /attendance/visits/checkout` con el nombre/id elegido. En modo con personal, la pantalla también ofrece **Avisar a un padre** (`POST /attendance/checkin/page`) y una **reimpresión de la etiqueta de seguridad**: `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las envía por el mismo proceso `PrintUI` que el check-in.

El modo de la estación es una marca de AsyncStorage `@StationMode` (`"self"` | `"manned"`, que se cambia en `app/adminSettings.tsx`). El modo con personal añade el punto de entrada de salida en la pantalla de búsqueda y la edición de perfil de cada miembro (`POST /membership/people`) desde la pantalla del hogar. El quiosco incluye protecciones: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege las pantallas de administración e impresoras, la pantalla de administración se abre solo con 7 toques rápidos en el logotipo del encabezado, y una pantalla de reposo inactiva (`src/hooks/useInactivityTimer.ts`) toma el control entre familias.

## Check-in propio (B1App)

Los miembros hacen el check-in desde el portal b1.church en la pantalla `/mobile/checkin` (enrutada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Requiere un usuario con sesión iniciada y recorre los mismos cuatro pasos que el quiosco (servicios → hogar → grupos → completar) contra los mismos endpoints, con el estado guardado en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias con el quiosco: el hogar procede del `householdId` propio del usuario con sesión iniciada (sin paso de búsqueda), y no hay impresión de etiquetas; en su lugar, la pantalla de finalización muestra el código de seguridad del lote como QR (`qrcode.react`) con la indicación "muestre esto en una estación de check-in". Si el hogar ya tiene un check-in registrado al cargar la página, un botón "Mostrar código de check-in" vuelve a mostrar el QR a partir de la primera visita existente (de `GET /attendance/visits/checkin`) que tenga un `securityCode`. El check-in se registra de inmediato al enviar (no hay estado pendiente); el QR solo sirve para imprimir etiquetas en el quiosco.

**Impresión de etiquetas desde el teléfono en el quiosco** (`B1Checkin/app/scan.tsx`, al que se llega desde el botón "Escanear código" del QR en la pantalla de búsqueda): el quiosco muestra `CodeScanner` (un `CameraView` de `expo-camera`, por defecto la cámara frontal, que se puede girar) buscando códigos QR. `ScanCodeHelper.parse()` acepta una carga útil solo si es un código de 4 caracteres del alfabeto de códigos de seguridad, y `ScanCodeHelper.isRepeat()` ignora el mismo código durante 4 segundos, de modo que funcionan tanto el QR de B1App como el bloque QR de una etiqueta impresa. La pantalla sigue luego la ruta de reimpresión de salida: `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`, y vuelve a la búsqueda. Al escanear no se escribe nada en asistencia; solo se imprimen etiquetas. Los códigos sin visitas activas, las estaciones sin impresora y los grupos sin etiquetas muestran cada uno un aviso emergente y vuelven a la búsqueda.

Los tipos y `ApiHelper`/`ArrayHelper` proceden de `@churchapps/helpers` y `@churchapps/apphelper`; no se comparten componentes de React con B1Admin.

## Asistencia en el lado administrativo (B1Admin)

- **Configuración**: `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) muestra el árbol de la estructura y permite crear servicios (`ServiceEdit.tsx`) y horarios de servicio (`ServiceTimeEdit.tsx`). Los datos de campus proceden de membresía mediante el hook `useCampuses()`.
- **La asistencia manual** se gestiona en la sección de Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`; al añadir, `SessionEdit.tsx` puede incluir una sesión por cada otro grupo que comparta el horario de servicio elegido, omitiendo los grupos que ya tienen una sesión en esa fecha) y marca a las personas como presentes mediante `POST /attendance/visitsessions/log`, que busca o crea la visita de esa persona para esa sesión. Los líderes de grupo pueden registrar la asistencia de sus propios grupos sin el permiso `attendance.edit`; los controladores comprueban `au.leaderGroupIds`.
- **Informes**: la tendencia de asistencia y la asistencia por grupo son informes definidos en el servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi; las definiciones están en `Api/reports/*.json`). Ambos usan `startDate`/`endDate` (la fecha final incluida); el informe de tendencia usa por defecto desde hace un año hasta hoy y añade una columna `sessionDates` por semana, y el árbol en pantalla de asistencia por grupo incluye el `checkinTime` de cada visita y el `membershipStatus` de la persona. El CSV de asistencia por grupo procede del informe complementario `groupAttendanceDownload`, que `GroupAttendanceDownloadHelper` convierte en una fila por miembro del grupo con una columna de presente/ausente por cada sesión con fecha; el historial individual está en `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin, en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, al que se llega desde la página de configuración de Check-In). Una plantilla es una fila de `labelTemplates` cuyo `content` es un arreglo JSON de bloques (`text`, `field`, `barcode`, `qrcode` o `box`), cada uno posicionado en coordenadas porcentuales con fuente, alineación, simbología (`code39`/`code128`/`qr`) y condiciones de visibilidad opcionales (p. ej., mostrar el recuadro de alergias solo cuando `person.nametagNotes` no está vacío). Hay dos `labelType`: `nametag` (una por persona registrada; campos como `person.displayName`, `sessions`, `securityCode` y `person.isBirthdayWeek`, que vale `"true"` cuando el mes y día del cumpleaños están a 3 días de hoy, incluso cruzando el cambio de año, calculado por `LabelHelper.isBirthdayWithin()`) y `pickup` (una por familia; campos como `children`, `childrenAllergies`). El servidor impone un único valor predeterminado por tipo y por iglesia (`LabelTemplateController.save`). El diseñador incluye plantillas iniciales que replican las etiquetas incluidas en el quiosco y muestra vistas previas con datos de ejemplo.

### Renderizado e impresión en el quiosco

Al completar el check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir según las marcas del grupo de cada visita pendiente: credenciales para los grupos con `printNametag`, más una etiqueta de recogida familiar única si alguna visita coincidió con un grupo `parentPickup`. Las visitas con `checkinType` `volunteer` se omiten en `LabelHelper.selectChildVisits()`, de modo que un voluntario de cuidado infantil en una sala de Recogida de padres nunca dispara una etiqueta de recogida. El código de seguridad de la respuesta de check-in se incluye en las credenciales de los niños y en la etiqueta de recogida; las credenciales de adultos se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte los bloques y un contexto de campos en un documento HTML independiente; si no las tiene, se usan las etiquetas HTML incluidas en `B1Checkin/assets/labels/` con sustitución de marcadores.

Los códigos de barras se generan como SVG en línea mediante codificadores en TypeScript puro incluidos en `B1Checkin/src/helpers/barcode.ts`: tablas de patrones de Code 39 y tablas de anchos de Code 128 (conjunto B con suma de control mod-103), además de QR mediante el paquete `qrcode`. **Estos codificadores están duplicados a propósito en B1Admin** (`LabelEditor.tsx` incluye las mismas tablas en línea, lo que se indica en un comentario de código), para que las vistas previas del diseñador sean fieles al píxel con la salida del quiosco; un cambio en uno debe replicarse en el otro.

El proceso de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura como JPG con `react-native-view-shot` y entrega las URI de las imágenes al módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()` y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK de impresión de Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red de la serie QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas troqueladas de 29×90, la opción predeterminada recomendada |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Detección en red + impresión de imágenes por TCP/ZPL |

La selección de impresora está en `app/printers.tsx` (el escaneo de red devuelve entradas `brand~model~ip` y la elección se guarda en AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en el dispositivo que se muestra mediante un indicador de estado en vivo en el encabezado del quiosco.

## Registro de invitados

Hay dos vías para crear una persona durante el check-in:

- **En el quiosco**: la opción "Agregar invitado" de la pantalla del hogar abre `B1Checkin/app/addGuest.tsx`, que primero busca una coincidencia existente que no sea miembro mediante `GET /membership/people/search?term=` y, si no la encuentra, crea una con `POST /membership/people`, asociada al hogar actual. El invitado sigue después la asignación de grupo como cualquier miembro.
- **Autoservicio mediante QR**: cuando el ajuste de la iglesia `enableQRGuestRegistration` está activado (se configura en la configuración de Check-In de B1Admin y se lee de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un código QR que enlaza a `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página de B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre desde su propio teléfono mediante el endpoint anónimo `POST /membership/people/guest-register`, lo que mantiene la fila del quiosco en movimiento. La hoja del QR también tiene un botón **Registrarse aquí** que abre la misma página en el quiosco (`app/guestRegister.tsx`) en un `WebView` de incógnito sin caché; `src/helpers/GuestRegisterHelper.ts` construye la URL tanto para el QR como para el WebView, y bloquea la navegación fuera de `https://{subdomain}.b1.church/guest-register`. La pantalla vuelve a la búsqueda al pulsar **Listo**, al retroceder o tras 120 segundos de inactividad (lo que escriba el formulario se comunica desde el WebView como actividad), y desmonta el WebView para que los datos de una familia nunca lleguen a la siguiente.

## Páginas relacionadas

- [Endpoints de asistencia](../api/endpoints/attendance) -- API REST completa para campus, servicios, sesiones, visitas y visitas por sesión
- [Endpoints de membresía](../api/endpoints/membership) -- Personas, hogares y grupos
- [Webhooks](../api/webhooks) -- Los eventos `session.created`, `attendance.recorded` y `attendance.checkout`
- [Estructura de módulos](../api/module-structure) -- Cómo está organizado el módulo de asistencia en el servidor
