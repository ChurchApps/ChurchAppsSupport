---
title: "VOMO"
description: "Conecte las inscripciones de voluntarios y los registros en quiosco de VOMO con las personas y grupos de B1 Admin mediante Zapier, incluidos los permisos de la clave de API y los pasos de configuración."
---

# VOMO

<div class="article-intro">

VOMO es una plataforma de participación de voluntarios: las personas se inscriben en proyectos, registran su entrada en el quiosco y acumulan horas. Si usa VOMO para programar voluntarios pero B1 para los registros de personas, Zapier puede sincronizar la membresía y los registros de entrada entre ambos para que ninguno se desfase.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [VOMO](https://vomo.org) con un plan que incluya Zapier (consulte con el soporte de VOMO si no está seguro)
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

La aplicación de Zapier de VOMO expone cuatro disparadores instantáneos y cuatro acciones. Las recetas que más les interesan a las iglesias:

| Dirección | Disparador | Acción |
|---|---|---|
| VOMO → B1 | VOMO Membership (creada) | B1: Find Person → Create Person (si es nueva) |
| VOMO → B1 | Registro de entrada en el quiosco de VOMO | B1: Add Group Member a un grupo "Sirviendo actualmente", o registrar como asistencia |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (por correo electrónico); si no existe, un paso personalizado |
| Ambas | VOMO Participation (inscripciones) | B1: Add Group Member a un grupo específico del proyecto |

Las acciones de VOMO se limitan a **redactar proyectos** y **buscar** organizadores o proyectos existentes; hoy no hay una acción para "agregar esta persona a un proyecto de VOMO". La conexión más útil es sobre todo de VOMO → B1.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**. Scopes:

- `settings:write`: Zapier verifica cada clave de B1 contra la lista de webhooks de B1 al conectarla, así que la conexión falla sin este permiso
- `people:read`, `people:write`: para buscar y crear voluntarios como personas de B1
- `groups:write`: para agregarlos a los grupos de equipos de servicio
- (Opcional) `attendance:write` si trata los registros de entrada en el quiosco como asistencia

### 2. Cree el Zap de sincronización de membresía {#2-build-the-membership-sync-zap}

1. **Disparador**: VOMO: Membership (evento = `created`).
2. **Acción**: B1.church: Find Person, por correo electrónico.
3. **Acción**: B1.church: Add Group Member, agregando a la persona del paso 2 al grupo de voluntarios correspondiente.

   *Find Person* de B1 detiene el Zap con un error "No person found" cuando nadie coincide. Para los voluntarios que todavía no están en B1, active el manejo de errores de Zapier para el paso Find Person y, en su ruta de error, ejecute B1.church: Create Person y luego Add Group Member.
4. Active el Zap. Los nuevos voluntarios de VOMO ahora aparecerán en B1 con la membresía de grupo correcta.

### 3. (Opcional) Cree el Zap de registro de entrada en el quiosco {#3-optional-build-the-kiosk-check-in-zap}

1. **Disparador**: VOMO: Kiosk
2. **Acción**: B1.church: Find Person (por correo electrónico)
3. **Acción**: elija una opción:
   - *Si lo trata como asistencia*: Webhooks by Zapier POST al endpoint `/attendance/visits` de B1 (la aplicación de Zapier de B1 todavía no tiene una acción *Record Attendance* propia). La [clave de API](/docs/developer/api/api-keys) de B1 va en el encabezado `Authorization: Bearer cak_…`.
   - *Si lo trata como membresía de grupo*: B1.church: Add Group Member a un grupo "Sirviendo actualmente (hoy)", y un segundo Zap más tarde ese día los quita mediante una limpieza programada.

## Recetas comunes {#common-recipes}

### Sincronización de grupos por proyecto {#per-project-group-sync}

- **Disparador**: VOMO: Participation (creada)
- **Acción**: Filter by Zapier por el id del proyecto, y luego
- **Acción**: B1.church: Add Group Member a un grupo de B1 cuyo nombre refleje el proyecto de VOMO.

Cuando termine el proyecto de VOMO, borre manualmente el grupo de B1 (o combine esto con un disparador de *Participation deleted* que los quite).

### Enviar un mensaje de texto de "gracias por inscribirse" {#send-a-thanks-for-signing-up-text-via-sms}

Encadene VOMO Participation → Clearstream Send Text o Text In Church Send Message en el mismo Zap. Ambas tienen acciones de Zapier propias: consulte [Clearstream](./clearstream.md) y [Text In Church](./text-in-church.md).

### Detectar abandono {#detect-drop-off}

Ejecute un disparador diario *Schedule* de Zapier que llame a Find Organizer en VOMO para una lista de personas de B1 que se unieron al equipo de servicio este mes; si VOMO devuelve "not found", no activaron su cuenta de VOMO y necesitan un recordatorio.

## Límites y notas {#limits--notes}

- **El correo electrónico es la clave de unión.** Las cargas de VOMO exponen el correo electrónico del usuario, pero no el id de persona de B1. Los donantes que usen correos distintos en cada sistema generarán duplicados.
- **No hay una acción "Add to Project" en la aplicación de Zapier de VOMO por ahora.** Si necesita inscribir personas de B1 en proyectos de VOMO, tendría que hacer POST a la API REST de VOMO desde un paso *Webhooks by Zapier*, lo cual es una integración personalizada.
- **Los planes gratuitos o básicos de VOMO pueden no incluir Zapier.** Confirme con el soporte de VOMO antes de prometer una fecha de conexión.

## Solución de problemas {#troubleshooting}

- **El disparador nunca se activa**: los disparadores instantáneos de VOMO requieren que el token de API siga siendo válido. Pruebe de nuevo el Zap; vuelva a conectar VOMO si el token se rotó.
- **B1 *Add Group Member* falla**: el grupo de la acción ya no existe. Vuelva a elegir el grupo en el menú desplegable **Group** del paso, o abra el grupo en B1Admin (**People > Groups**) y copie el id del final de su dirección web.
- **Personas duplicadas en B1 a partir de un solo voluntario de VOMO**: probablemente se inscribieron con un correo distinto al que ya tenían en B1. Estandarice los correos electrónicos o agregue un *Path* de Zapier que también busque por teléfono antes de crear.

## Vea también {#see-also}

- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier
- [Clearstream](./clearstream.md) y [Text In Church](./text-in-church.md): combine las inscripciones de voluntarios con confirmaciones por SMS
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks): los eventos en los que VOMO puede activarse
