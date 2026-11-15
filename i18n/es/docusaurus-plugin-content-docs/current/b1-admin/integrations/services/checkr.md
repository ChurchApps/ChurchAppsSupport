---
title: "Checkr"
description: "Conecte las inscripciones de voluntarios de B1 Admin con las verificaciones de antecedentes de Checkr mediante Make.com, con alertas opcionales sobre el estado de los informes para su coordinador de ministerio seguro."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) realiza verificaciones de antecedentes para el personal y los voluntarios, una necesidad casi universal para cualquier iglesia que tenga un programa infantil o juvenil. B1 **no tiene una función integrada de verificación de antecedentes**: solicitar verificaciones, dar seguimiento a los resultados y cumplir con los requisitos de detección se hacen por completo en Checkr; la receta que aparece a continuación solo conecta los eventos de B1 con Checkr. Checkr no tiene una aplicación para Zapier, pero la [integración de Checkr en Make.com](https://www.make.com/en/integrations/checkr) está verificada y expone las acciones que necesita para iniciar una verificación a partir de un evento de B1.

</div>

:::caution
Esta receta usa la aplicación de Make para B1.church, que todavía no está publicada (consulte [Make](../make.md)). Mientras tanto, el lado de B1 de estos escenarios debe construirse con el módulo **HTTP** de Make, que llama a la [API REST](/docs/developer/api) de B1.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Checkr](https://checkr.com) con acceso a la API y al menos un paquete de evaluación configurado
- Una cuenta de [Make](https://www.make.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

La aplicación de Checkr en Make expone 1 disparador y 6 acciones:

| Dirección | Disparador de B1 / Make | Acción |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado a un grupo de voluntarios) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook de Checkr (evento de invitación / informe) | B1: Actualizar el registro de la persona (por ejemplo, etiquetarla "Checkr cleared") |

Las acciones de Checkr en Make son: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA y Get an Invitation. Además, 4 módulos de búsqueda.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: para el webhook del disparador
- `people:read`: para buscar el nombre y el correo electrónico de la persona al iniciar una verificación
- (Opcional) `people:write` si quiere escribir el estado del informe de vuelta como campo personalizado o etiqueta

### 2. Cree el escenario "iniciar una verificación al inscribirse como voluntario" en Make {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Disparador**: B1.church: Watch Events (`group.member.added`).
2. **Filtro**: continúe solo si `data.groupId` coincide con su grupo "Children's Volunteers" (o el equivalente).
3. **Acción**: B1.church: Find Person (por `data.personId`) para obtener el correo electrónico y el nombre y apellido.
4. **Acción**: Checkr: Create Candidate. Asigne el nombre, el apellido y el correo electrónico del paso 3.
5. **Acción**: Checkr: Create Background Check Invitation. Asigne el id del candidato nuevo del paso 4 al campo *candidate_id*. Elija el paquete de evaluación (por ejemplo, `tasker_standard` u otro que muestre su cuenta).
6. (Opcional) **Acción**: Slack: notifique a su coordinador de ministerio seguro que se inició una verificación.

Active el escenario. Los nuevos voluntarios del grupo indicado recibirán automáticamente una invitación de Checkr por correo electrónico; la completan en su teléfono o computadora portátil, y Checkr realiza la evaluación.

### 3. (Opcional) Reciba el informe de vuelta {#3-optional-receive-the-report-back}

1. **Disparador**: Checkr: Watch Events (webhook). Make registra un webhook de Checkr al activarse.
2. **Filtro**: continúe solo si `event_type = report.completed`.
3. **Acción**: Checkr: Get Report (use el id del informe que llega en el webhook).
4. **Acción**: B1.church: Find Person (por el correo electrónico del candidato).
5. **Acción**: Slack / Email condicional: notifique al coordinador con el estado `clear` / `consider` / `suspended`.

Nota: B1 todavía no tiene un campo integrado de "estado de verificación de antecedentes". Las opciones prácticas son (a) publicar el resultado en un canal privado de Slack para revisarlo, (b) escribirlo en una hoja de Google para auditoría, o (c) agregar a la persona a un grupo de B1 "Voluntarios aprobados" cuando el resultado sea `clear`.

## Recetas comunes {#common-recipes}

### Volver a evaluar a los voluntarios cada 2 años {#re-screen-volunteers-every-2-years}

Combine lo anterior con un disparador de programación de Make:

- **Disparador**: Make: Schedule (mensual)
- **Acción**: HTTP — Make a request: GET de `/membership/groupmembers?groupId=…` de B1 para su grupo "Voluntarios aprobados" (la aplicación de B1.church no tiene una acción de lista)
- **Acción**: Filtro de Make: fecha de aprobación anterior a 22 meses
- **Acción**: Checkr: Create Background Check Invitation (igual que el flujo inicial)

### Bloquear el acceso de la etapa 1 hasta que termine la verificación {#block-stage-1-access-until-check-completes}

Si su iglesia usa la membresía de grupos de B1 para controlar el acceso (por ejemplo, solo los miembros del grupo "Aprobados" aparecen en los horarios de servicio), mantenga a los voluntarios nuevos en un grupo de espera hasta que el evento `report.completed` de Checkr los cambie.

## Límites y notas {#limits--notes}

- **Checkr opera solo en EE. UU.** para la mayoría de los paquetes de evaluación. Las iglesias de Australia, el Reino Unido y Canadá necesitarán una alternativa.
- **El precio** es por verificación: cada Create Invitation en Make genera una verificación real. Pruebe primero en el entorno sandbox o de staging de Checkr (la aplicación de Checkr en Make respeta las credenciales que pase en la conexión, así que cambiar las credenciales alterna entre sandbox y producción).
- **El acceso a la API de Checkr depende del plan.** Las cuentas pequeñas de Checkr pueden estar en un nivel solo con interfaz web; comuníquese con Checkr para habilitar la API.

## Solución de problemas {#troubleshooting}

- **Create Candidate falla con `403`**: el token de la API de Checkr es de solo lectura o no tiene los permisos de cuenta correctos. Vuelva a emitirlo desde el panel de Checkr con permiso de escritura.
- **La invitación nunca llega**: revise el correo electrónico del candidato en el paso 3; es posible que B1 tenga vacío el campo de correo electrónico de esa persona. Agregue un filtro que exija correo electrónico antes del paso de Checkr.
- **El disparador del webhook no se activa**: el registro del webhook de Checkr a veces falla sin aviso si su cuenta de Make no tiene un plan de pago que admita webhooks salientes. Verifique en la página *Webhooks* del panel de Checkr que aparezca la URL de Make.

## Vea también {#see-also}

- [Make (descripción general)](../make.md): el lado de B1 de cada escenario de Make
- [Mobile Message](./mobile-message.md): para proveedores de SMS sin aplicaciones de Zapier, con el mismo patrón de Webhooks/HTTP que la conexión de Checkr en Make
- [Documentación de la API de Checkr](https://docs.checkr.com/)
