---
title: "Registros"
---

# Registros

<div class="article-intro">

El registro es un sistema con tres puertas de entrada: la aplicación de quiosco B1Checkin para estaciones administradas y de autoservicio, el registro automático dentro del portal de miembros B1App, y la asistencia del lado administrativo en B1Admin. Los tres escriben en el mismo módulo de asistencia en la Api central, y el enrutamiento del aula se impulsa completamente por Grupos — no hay una entidad separada de "ubicaciones" o "salas". Una capa de seguridad infantil se sienta encima: tipos de registro por visita, puertas de capacidad y relación de voluntarios del lado del servidor, elegibilidad de edad/grado del lado del quiosco, verificación de recogida de confianza en el registro, y búsqueda de padres a través del proveedor de mensajes de texto de la iglesia. Esta página mapea el modelo de datos, los flujos de registro, la capa de seguridad, y la canalización de impresión de etiquetas.

</div>

## Descripción General

```
┌──────────────────────────┐
│ B1Checkin (Quiosco Expo) │──┐         ┌──────────────────────────────────────────────┐
│  buscar → hogar →        │  │         │ Api                                          │
│  grupos → completar/impr │  │  HTTPS  │  ┌─ módulo de membresía ──────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ personas · hogares · grupos             │ │
│ B1App (registro automático)│──┤         │  └─────────────────────────────────────────┘ │
│  pantalla /mobile/checkin │  │         │  ┌─ módulo de asistencia ──────────────────┐ │
├──────────────────────────┤  │         │  │ campus → servicios → tiempos de servicio│
│ B1Admin (personal)       │──┘         │  │ tiempos de servicio de grupo  (enrutamiento) │
│  configuración · reportes│            │  │ sesiones ← visitas de sesión → visitas  │
│  diseñador de etiquetas  │            │  │ plantillas de etiqueta                  │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Ruta de impresión de etiqueta (solo quiosco):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (plantillas de etiqueta, o HTML integrado alternativo)
       └▶ LabelRenderer → documento HTML + códigos de barras SVG en línea
            └▶ PrintUI: renderizar WebView → captura JPG de ViewShot
                 └▶ módulo nativo printer-helper → Brother QL / Zebra
```

| Superficie | Repo | Pila | Rol |
|---------|------|-------|------|
| Quiosco | `B1Checkin` | Expo / React Native, enrutamiento de archivo expo-router; compilaciones EAS para Android, Amazon Fire e iOS; actualizaciones OTA vía `expo-updates` | Estación administrada o de autoservicio con impresión de etiquetas y registro verificado |
| Registro automático | `B1App` | Next.js (portal de miembros b1.church) | Los miembros conectados registran su hogar desde un teléfono; sin impresión |
| Administración | `B1Admin` | SPA de React | Configura la estructura de servicio, asigna grupos a tiempos de servicio, diseña etiquetas, registra asistencia manual, ejecuta reportes |

Los tres llaman a los mismos dos módulos API a través de `ApiHelper`: **MembershipApi** (`/membership`) para personas, hogares y grupos; **AttendanceApi** (`/attendance`) para todo lo siguiente.

## Modelo de datos (`Api/src/modules/attendance`)

| Entidad / tabla | Campos clave | Significado |
|----------------|-----------|---------|
| `campuses` | nombre, dirección | Desaprobado aquí — los campus se dominan en el módulo de membresía (`/membership/campuses`); la copia de asistencia está congelada de solo lectura para lectores heredados (`models/Campus.ts`) |
| `services` | campusId, nombre | Una reunión recurrente, p. ej. "Domingo por la Mañana" (`models/Service.ts`) |
| `serviceTimes` | serviceId, nombre | Una franja horaria dentro de un servicio, p. ej. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabla de unión: qué grupos (aulas) se reúnen en qué tiempos de servicio (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Una reunión de un grupo en una fecha — creada perezosamente en el momento del registro (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Una persona asistiendo en una fecha (`models/Visit.ts`). `checkinType` es `member` / `guest` / `volunteer` (NULL = miembro heredado), establecido por el quiosco y consumido por las puertas de capacidad/proporción |
| `visitSessions` | visitId, sessionId | Qué sesión(es) cubre una visita — un niño registrado en dos tiempos de servicio obtiene dos filas (`models/VisitSession.ts`) |
| `labelTemplates` | nombre, labelType (`nametag`/`pickup`), ancho, alto, esDefault, contenido (bloques JSON) | Diseños de etiqueta editables (`models/LabelTemplate.ts`) |

### Cómo se persiste un registro completado

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) maneja `POST /attendance/visits/checkin?serviceId=&peopleIds=`. El cuerpo es una matriz de objetos `Visit`, cada uno llevando `visitSessions` cuya `session` incrustada solo nombra un par `(serviceTimeId, groupId)`. El servidor entonces:

1. **Las puertas de capacidad y proporciones antes de cualquier escritura.** `evaluateGates()` → `CheckinGateHelper.evaluate()` comprueba la capacidad de cada sala objetivo, capacidad de invitados, bandera cerrada, y proporción de voluntarios contra la ocupación actual. postCheckin **no es transaccional**, así que la puerta debe ejecutarse antes del primer guardado — una violación dura devuelve un 409 nombrando la(s) sala(s) infractora(s) y nada se persiste. Ver [Puertas de capacidad y proporción de voluntarios](#capacity-and-volunteer-ratio-gates).
2. **Resuelve sesiones perezosamente.** `getSessionId()` encuentra o crea la fila `sessions` para `(groupId, serviceTimeId, hoy)` — los ids de sesión se cachean en proceso por fecha. Las nuevas sesiones emiten un webhook `session.created`. El bucle es un `for..of` esperado — un anterior `forEach(async …)` disparar-y-olvidar corrió la carrera con la guardia y escribió sessionIds NULL en la creación de primera sesión (fijo; anotado en un comentario de código en el bucle).
3. **Reemplaza los registros del día.** Cualquier visita existente para esas personas en ese servicio hoy se elimina junto con sus visitSessions, luego se guarda el conjunto presentado. Re-registrar a una familia es, por lo tanto, una operación idempotente "este es el estado actual", no una adición. Pasar `?checkDuplicates=true` en su lugar devuelve `{ duplicates: [personId…] }` sin escribir, que es cómo el quiosco advierte antes de sobrescribir.
4. **Genera un código de seguridad por lote.** `SecurityCodeHelper.generate()` produce un código de 4 caracteres del alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sin vocales o caracteres ambiguos, por lo que los códigos no pueden deletrear palabras o malinterpretarse). El servidor reintentos en colisión contra las visitas abiertas del mismo día de la iglesia y marca el código en cada visita del lote.
5. **Devuelve `{ streaks, securityCode }`.** `streaks` mapea personId al conteo de asistencia de semana consecutiva; el quiosco celebra hitos (cada 5ª semana) con confeti.

Cada visita guardada también emite un webhook `attendance.recorded`. El lado de lectura, `GET /attendance/visits/checkin`, devuelve las visitas de la persona desde su **última fecha registrada** — si eso fue una semana anterior, los ids se eliminan, así que el cliente recibe una copia previamente rellenada de las selecciones de sala de la semana pasada que se guardarán como nuevos registros.

### Registro de salida

Dos extremos completan el bucle (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoy aún no registradas que portan ese código de seguridad, con sesiones pobladas.
- `POST /attendance/visits/checkout` — cuerpo `{ visitIds, checkedOutBy?, checkedOutById? }`; marca `checkoutTime` y quién recogió, y emite un webhook `attendance.checkout` por visita.

Permisos: los quioscos autentican con `attendance.checkin`, que otorga exactamente la superficie de registro/registro de salida/plantilla de etiqueta; `attendance.view`/`attendance.edit` cubren reportes y entrada manual; la estructura (servicios, tiempos de servicio, asignaciones de grupo) requiere `services.edit`.

## Los grupos impulsan el enrutamiento de la sala

No hay entidad de sala o aula en ningún lugar del sistema. Una "sala" es un **grupo** de membresía con `trackAttendance` habilitado, vinculado a uno o más tiempos de servicio a través de `groupServiceTimes`. Los campos de grupo (en `Api/src/modules/membership/models/Group.ts`) que moldean el comportamiento del quiosco:

| Campo | Efecto |
|------|--------|
| `trackAttendance` | El grupo participa en asistencia en absoluto; el árbol de configuración de B1Admin marca grupos `trackAttendance` sin fila `groupServiceTimes` como sin asignar |
| `parentPickup` | Marca una sala de niños: registrarse en ella hace que la visita sea una visita "infantil", que imprime una etiqueta de recogida familiar y pone el código de seguridad en la etiqueta del nombre |
| `printNametag` | Si los registros a este grupo imprimen una etiqueta de nombre en absoluto |
| `capacity` / `guestCapacity` / `checkinClosed` | Límites de capacidad de sala y un interruptor "cerrado" duro, aplicados del lado del servidor por la puerta de registro (editados en la configuración de grupo de B1Admin bajo "Capacidad de Registro") |
| `volunteerRatio` / `minVolunteers` | Relación de niños por voluntario y conteo mínimo de cabezas de voluntarios, aplicados según la configuración `ratioEnforcement` de toda la iglesia |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Límites de elegibilidad de edad/grado evaluados del lado del quiosco para resaltar o atenuar salas |

Cada cliente desnormaliza de la misma manera (p. ej. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carga `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, y `GET /membership/groups` en paralelo, luego para cada tiempo de servicio recopila los grupos cuya fila `groupServiceTimes` apunta a ella en `serviceTime.groups`. Esa matriz es lo que muestra el selector de sala, organizado por `categoryName` de grupo. 

Las asignaciones se editan desde la página del grupo en B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), y todo el árbol Campus → Servicio → Tiempo de Servicio → Grupo se visualiza en `B1Admin/src/attendance/components/AttendanceSetup.tsx` vía `GET /attendance/attendancerecords/tree`.

:::info
Debido a que los grupos son la única fuente de verdad, la misma membresía de grupo impulsa el enrutamiento del quiosco, la asistencia de estilo de lista en las páginas de grupo de B1Admin, y los reportes de asistencia — asignar un grupo a un tiempo de servicio es el único paso necesario para convertirlo en un destino de registro.
:::

## Seguridad infantil

### Tipos de registro

Cada visita lleva un `checkinType` — `member`, `guest`, o `volunteer` (NULL significa heredado/miembro; migración `tools/migrations/attendance/2026-07-03_checkin_type.ts`). El tipo se elige **del lado del quiosco**: fichas Miembro / Invitado / Voluntario en la fila de miembro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), marcadas en cada visita pendiente al completarse (`app/checkinComplete.tsx`, predeterminado a `member`). El servidor lo consume en la puerta — los voluntarios cuentan hacia la cobertura de proporción en lugar de contra la capacidad, y los invitados cuentan contra `guestCapacity`.

### Puertas de capacidad y proporción de voluntarios

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) se ejecuta dentro de `postCheckin` antes de cualquier guardado (el extremo no es transaccional, así que la puerta antes de guardado es el mecanismo de corrección). Carga la ocupación actual por grupo objetivo (`VisitRepo.countActiveByGroupToday`) y la configuración del grupo a través de la puerta de manera del módulo de membresía, luego clasifica violaciones:

- **Duro (siempre bloquear):** `checkinClosed`, `current + incoming > capacity`, recuento de invitados sobre `guestCapacity`. El lote se rechaza con `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — el quiosco muestra la sala nombrada.
- **Proporción (advertir o bloquear):** no voluntarios entrantes en una sala donde `volunteers < minVolunteers`, sin voluntarios en absoluto, o `children > volunteers × volunteerRatio`. La gravedad sigue la configuración por iglesia `ratioEnforcement` (`"warn"` predeterminado / `"block"`, editado en B1Admin Gestionar Iglesia → Registro, `CheckinSettingsEdit.tsx`). El modo de advertencia devuelve `409 { warning: true, error: "ratio", … }` a menos que el cliente reenvíe con `acknowledgeWarnings=true` — ese reenvío es la anulación de confirmación del personal del quiosco.

### Elegibilidad de edad/grado (del lado del quiosco)

La elegibilidad de la sala es consultiva de la interfaz de usuario, evaluada en el quiosco, no aplicada por el servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara la fecha de nacimiento/grado de una persona contra `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` del grupo (orden de grado: PreK, K, 1–12, Graduado) y devuelve `eligible` / `ineligible` / `unknown` — los datos faltantes producen `unknown` y nunca ocultan una sala. Las edades y grados se calculan a partir de la **fecha de promoción de grado** de la iglesia (`gradePromotionDate` configuración, `"MM-DD"`, editado en `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); el quiosco la obtiene de `GET /attendance/checkin/settings`, y `resolveAsOfDate` elige la ocurrencia más reciente en o antes de hoy. El selector de sala resalta salas elegibles y atenúa las inelegibles; elegir una sala atenuada requiere una confirmación del personal.

### Recogida de confianza y no autorizada

Las personas de recogida son una entidad de membresía, por hogar: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, nombre, photoUrl, relación, `status` `trusted` / `notAuthorized`, notas). CRUD es `GET /membership/householdpickup/:householdId` (cualquier usuario de iglesia autenticado, para que los quioscos puedan leerlo) más `POST` / `DELETE` cerrado por `people.edit`. El personal gestiona la lista en la tarjeta **Recogida** de la página de la persona (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relación, y un chip de estado Confiado/No Autorizado.

Al registrar salida (`B1Checkin/app/checkout.tsx`) el quiosco carga la lista de recogida del hogar: las entradas `trusted` se renderizan como tarjetas de recogida tocables junto con la cuadrícula de fotos de adultos del hogar, y un nombre de "Otro" de tipo libre es coincidente difuso (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — una coincidencia bloquea el registro de salida con una hoja de advertencia y un botón **Anular** del personal. El anulación se registra en la visita misma: publica `checkedOutBy` como `"OVERRIDE: {name}"` a través del `POST /attendance/visits/checkout` normal, para que aterrice en el registro de asistencia y el webhook `attendance.checkout` en lugar de una tabla de auditoría separada.

### Página-a-padre y difusión de emergencia

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expone dos extremos SMS:

- `POST /page` — `{ visitId, message }`: página los tutores de un niño registrado (pantalla de salida del quiosco, modo administrado).
- `POST /broadcast` — `{ serviceId, message }`: textos adultos de cada hogar registrado para un servicio (configuración de administrador del quiosco, detrás de una hoja de confirmación de tipo `EMERGENCY` en `B1Checkin/app/adminSettings.tsx`).

Ambos resuelven adultos del hogar a través de la puerta de manera del módulo de membresía, luego entregan a **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — la puerta entre módulos en el proveedor de mensajes de texto configurado de la iglesia (`@churchapps/texting`: TextInChurch, Clearstream, o MutualMinistry; no hay remitente SMS integrado). La puerta registra una fila `sentText` más entradas `deliveryLog` por destinatario y limita un lote a 500 destinatarios; sin proveedor configurado devuelve `no_provider`, que el quiosco muestra como "Sin proveedor SMS configurado". El `dispatch()` del controlador deduplicates números de teléfono y salta personas sin móvil u `optedOut` establecido, devolviendo `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que el quiosco pueda mostrar qué se omitió.

## El quiosco (B1Checkin)

Las pantallas son archivos expo-router bajo `B1Checkin/app/`; el estado entre pantallas vive en una clase estática `CachedData` (`src/helpers/CachedData.ts`), no en estado React.

```
índice (arranque/inicio de sesión automático) → selectChurch → servicios ──▶ búsqueda ──▶ hogar ──▶ completeCheckin
                                          │             │  ▲         │ │            │
             carga tiempos de servicio,  │             │  └─────────┘ └▶ addGuest  └▶ imprimir etiquetas,
             grupos,                      │             └▶ salida (administrado)      retorno automático
             groupServiceTimes,           │                                            a búsqueda
             plantillas de etiqueta       │
```

1. **Búsqueda** (`app/lookup.tsx`) — búsqueda por teléfono (`GET /membership/people/search/phone?number=`, últimos 4 o completo) o por nombre (`GET /membership/people/search?term=`). Seleccionar una coincidencia carga el hogar (`GET /membership/people/household/{householdId}`) y visitas existentes (`GET /attendance/visits/checkin`), sembrando `pendingVisits` con selecciones de la semana pasada.
2. **Revisión del hogar** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada fila de miembro muestra una insignia ya registrada, insignia de alergia/`nametagNotes`, y sus fichas de sala actuales. Expandir un miembro lista cada tiempo de servicio con un botón de sala más las fichas de tipo de registro Miembro / Invitado / Voluntario (`MemberServiceTimes.tsx`).
3. **Asignación de grupo** (`app/selectGroup.tsx`) — un árbol de categoría construido a partir de `serviceTime.groups`, con salas elegibles por edad/grado resaltadas e inelegibles atenuadas detrás de una confirmación del personal (ver [Elegibilidad de edad/grado](#agegrade-eligibility-kiosk-side)); elegir una sala escribe una `{ session: { serviceTimeId, groupId } }` visitSession en la visita pendiente de esa persona (`src/helpers/VisitSessionHelper.ts`). "Ninguno" la borra.
4. **Completar** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` con `pendingVisits` (cada una marcada con su `checkinType`), luego imprime etiquetas si una impresora está configurada y vuelve automáticamente a la búsqueda. Una respuesta `409` de capacidad muestra la sala llena/cerrada nombrada; una advertencia de proporción ofrece una confirmación del personal que reenvía con `acknowledgeWarnings=true`.

La **pantalla de salida** (`app/checkout.tsx`) acepta el código de seguridad de 4 caracteres a través de una entrada de enfoque automático — así que los escáneres de código de barras de cuña de teclado USB/Bluetooth funcionan sin cámara — o un teclado en pantalla que usa el mismo alfabeto, autoenvío a los 4 caracteres. Busca el código, muestra a los niños siendo recogidos, y presenta las **personas de recogida de confianza** del hogar como tarjetas tocables junto con una cuadrícula de fotos de adultos del hogar (más una opción de "Otro" de texto libre que se verifica difusamente contra nombres no autorizados — ver [Recogida de confianza y no autorizada](#trusted-and-not-authorized-pickup)), luego publica `POST /attendance/visits/checkout` con el nombre/id del recogedor. En modo administrado la pantalla también ofrece **Página a un padre** (`POST /attendance/checkin/page`) y un **reimpresión de etiqueta de seguridad** — `reprint()` reconstruye las etiquetas de la familia con `LabelHelper.getAllLabelsFor(...)` y las alimenta a través de la misma canalización `PrintUI` que el registro.

La personalidad de la estación es una bandera `@StationMode` de AsyncStorage (`"self"` | `"manned"`, alterada en `app/adminSettings.tsx`). El modo administrado agrega el punto de entrada de salida en la pantalla de búsqueda y edición de perfil por miembro (`POST /membership/people`) desde la pantalla del hogar. El endurecimiento del quiosco está integrado: un PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) cierra las pantallas de administrador e impresora, la pantalla de administrador se abre solo a través de 7 toques rápidos en el logo del encabezado, y una pantalla de atracción inactiva (`src/hooks/useInactivityTimer.ts`) toma el control entre familias.

## Registro automático (B1App)

Los miembros se registran desde el portal b1.church en la pantalla `/mobile/checkin` (enrutada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` a `screens/CheckinPage.tsx`). Requiere un usuario conectado y camina los mismos cuatro pasos que el quiosco — servicios → hogar → grupos → completar — contra los extremos idénticos, con estado mantenido en `B1App/src/helpers/CheckinHelper.ts`. Las diferencias del quiosco: el hogar viene del `householdId` del usuario conectado (sin paso de búsqueda), y el flujo termina en una pantalla de confirmación — sin visualización de código de seguridad ni impresión de etiqueta. Los tipos y `ApiHelper`/`ArrayHelper` vienen de `@churchapps/helpers` y `@churchapps/apphelper`; ningún componente de React se comparte con B1Admin.

## Asistencia del lado de administrador (B1Admin)

- **Configuración** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza el árbol de estructura y crea servicios (`ServiceEdit.tsx`) y tiempos de servicio (`ServiceTimeEdit.tsx`). Los datos de campus vienen de membresía a través del gancho `useCampuses()`.
- **Asistencia manual** vive en el lado de Grupos, no en la sección de asistencia: `B1Admin/src/groups/components/GroupSessionsTab.tsx` crea sesiones (`POST /attendance/sessions`) y marca a las personas presentes vía `POST /attendance/visitsessions/log`, que encuentra o crea la visita para esa persona y sesión. Los líderes de grupo pueden registrar asistencia para sus propios grupos sin el permiso `attendance.edit` — los controladores revisan `au.leaderGroupIds`.
- **Reportes** — la asistencia de tendencia y la asistencia de grupo son reportes definidos por el servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi); el historial por persona es `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impresión de etiquetas

### Plantillas y el diseñador

Las iglesias diseñan sus propias etiquetas en B1Admin en `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, alcanzados desde la página de configuración de Registro). Una plantilla es una fila `labelTemplates` cuyo `content` es una matriz JSON de bloques — `text`, `field`, `barcode`, `qrcode`, o `box` — cada uno posicionado en coordenadas de porcentaje con fuente, alineación, simbología (`code39`/`code128`/`qr`), y condiciones de visibilidad opcionales (p. ej. solo renderizar la caja de alergia cuando `person.nametagNotes` no esté vacío). Existen dos `labelType`s: `nametag` (uno por persona registrada; campos como `person.displayName`, `sessions`, `securityCode`) y `pickup` (uno por familia; campos como `children`, `childrenAllergies`). El servidor aplica un predeterminado único por tipo por iglesia (`LabelTemplateController.save`). El diseñador envía plantillas de inicio que espejan las etiquetas integradas del quiosco y vista previa contra datos de muestra.

### Renderización e impresión en el quiosco

Al completar el registro, `B1Checkin/src/helpers/LabelHelper.ts` decide qué imprimir a partir de las banderas de grupo en cada visita pendiente: nametags para grupos `printNametag`, más una etiqueta de recogida de familia si alguna visita golpeó un grupo `parentPickup`. El código de seguridad de la respuesta de registro va a nametags de niños y la etiqueta de recogida; los nametags de adultos se imprimen sin código. Si la iglesia tiene plantillas, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) convierte bloques + un contexto de campo en un documento HTML independiente; de lo contrario, se usan etiquetas HTML integradas en `B1Checkin/assets/labels/` con sustitución de marcador de posición.

Los códigos de barras se generan como SVG en línea por codificadores TypeScript puros en `B1Checkin/src/helpers/barcode.ts` — tablas de patrones de Código 39 y Código 128 (conjunto de códigos B con suma de comprobación mod-103) tablas de ancho, más QR a través del paquete `qrcode`. **Estos codificadores se duplican intencionalmente en B1Admin** (`LabelEditor.tsx` integra las mismas tablas, anotado en un comentario de código) para que las vistas previas del diseñador sean fieles al píxel de la salida del quiosco; un cambio en una debe reflejarse en la otra.

La canalización de impresión (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML en un `WebView`, la captura a JPG vía `react-native-view-shot`, y entrega los URIs de imagen al módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). El módulo expone `scan()`, `checkInit()`, `printUris()`, y eventos de estado, con un proveedor por marca en ambas plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impresoras de red de serie QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas de corte mueren 29×90, la recomendación predeterminada |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descubrimiento de red + impresión de imagen TCP/ZPL |

La selección de impresora vive en `app/printers.tsx` (la búsqueda de red devuelve entradas `brand~model~ip`; la opción persiste a AsyncStorage), y `src/helpers/PrinterLog.ts` mantiene un registro de diagnóstico en el dispositivo expuesto a través de un punto de estado en vivo en el encabezado del quiosco.

## Registro de invitado

Dos rutas crean a una persona a mitad del registro:

- **En el quiosco** — el "Agregar invitado" de la pantalla del hogar abre `B1Checkin/app/addGuest.tsx`, que primero busca `GET /membership/people/search?term=` una coincidencia no miembro existente y de lo contrario crea uno con `POST /membership/people`, adjunto al hogar actual. El invitado luego fluye a través de la asignación de grupo como cualquier miembro.
- **Autoservicio a través de QR** — cuando la configuración de la iglesia `enableQRGuestRegistration` está activada (configurada en la configuración de Registro de B1Admin, leída de `GET /membership/settings/public/{churchId}`), la pantalla de búsqueda del quiosco muestra un código QR que enlaza a `https://{subdomain}.b1.church/guest-register?serviceId=`. Esa página B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que una familia visitante se registre a sí misma en su propio teléfono a través del extremo `POST /membership/people/guest-register` anónimo, manteniendo la línea del quiosco en movimiento.

## Páginas Relacionadas

- [Extremos de Asistencia](../api/endpoints/attendance) -- Superficie REST completa para campus, servicios, sesiones, visitas, y sesiones de visita
- [Extremos de Membresía](../api/endpoints/membership) -- Personas, hogares, y grupos
- [Webhooks](../api/webhooks) -- Los eventos `session.created`, `attendance.recorded`, y `attendance.checkout`
- [Estructura del Módulo](../api/module-structure) -- Cómo se organiza el módulo de asistencia del lado del servidor
