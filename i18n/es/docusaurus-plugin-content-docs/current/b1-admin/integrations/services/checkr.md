---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) realiza verificaciones de antecedentes para personal y voluntarios — una necesidad casi universal para cualquier iglesia que administre un programa infantil o juvenil. B1 **no tiene una función integrada de verificación de antecedentes** — la solicitud de verificaciones, el seguimiento de resultados y el cumplimiento de la evaluación viven todos en Checkr; la receta a continuación solo conecta los eventos de B1 con él. Checkr no tiene una aplicación de Zapier, pero la [integración de Checkr con Make.com](https://www.make.com/en/integrations/checkr) está verificada y expone las acciones que necesita para iniciar una verificación desde un evento de B1.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Checkr](https://checkr.com) con acceso a la API y al menos un paquete de evaluación configurado
- Una cuenta de [Make](https://www.make.com)
- Un usuario de B1Admin con permiso de **Editar Configuración**

</div>

## Qué Puede Conectar

La aplicación de Checkr en Make expone 1 disparador y 6 acciones:

| Dirección | Disparador de B1 / Make | Acción |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado a un grupo de voluntarios) | Checkr: Crear Candidato → Crear Invitación de Verificación de Antecedentes |
| Checkr → B1 | Webhook de Checkr (evento de invitación / informe) | B1: Actualizar el registro de la persona (por ejemplo, etiqueta "Checkr aprobado") |

Acciones de Checkr en Make: Crear Candidato, Crear Invitación de Verificación de Antecedentes, Obtener Candidato, Obtener Informe, Obtener el ETA del Informe, Obtener una Invitación. Además de 4 módulos de búsqueda.

## Configuración

### 1. Genere una clave API de B1

**Configuración → Desarrollador → Claves API → Nueva Clave API**:

- `settings:write` — para el webhook del disparador
- `people:read` — para consultar el nombre/correo electrónico de la persona al iniciar una verificación
- (Opcional) `people:write` si desea escribir el estado del informe de vuelta como un campo personalizado o etiqueta

### 2. Construya el escenario de "iniciar una verificación al registrarse un voluntario" en Make

1. **Disparador** — B1.church: Observar Eventos (`group.member.added`).
2. **Filtro** — continuar solo si `data.groupId` coincide con su grupo "Voluntarios de Niños" (o equivalente).
3. **Acción** — B1.church: Buscar Persona (por `data.personId`) para obtener correo electrónico + nombre/apellido.
4. **Acción** — Checkr: Crear Candidato. Mapee nombre/apellido/correo electrónico del paso 3.
5. **Acción** — Checkr: Crear Invitación de Verificación de Antecedentes. Mapee el id del nuevo candidato del paso 4 al campo *candidate_id*. Elija el paquete de evaluación (por ejemplo, `tasker_standard` o el que exponga su cuenta).
6. (Opcional) **Acción** — Slack: notifique a su coordinador de ministerio seguro que se ha iniciado una verificación.

Active el escenario. Los nuevos voluntarios en el grupo elegido reciben una invitación automática de Checkr por correo electrónico; la completan en su teléfono o computadora portátil; Checkr realiza la evaluación.

### 3. (Opcional) Recibir el informe de vuelta

1. **Disparador** — Checkr: Observar Eventos (webhook). Make registra un webhook de Checkr al activarse.
2. **Filtro** — continuar solo si `event_type = report.completed`.
3. **Acción** — Checkr: Obtener Informe (use el id del informe del webhook).
4. **Acción** — B1.church: Buscar Persona (por correo electrónico del candidato).
5. **Acción** — Slack / Correo condicional: notifique al coordinador con el estado `clear` / `consider` / `suspended`.

Nota: B1 no tiene actualmente un campo integrado de "estado de verificación de antecedentes". Las opciones prácticas son (a) publicar el resultado en un canal privado de Slack para revisión, (b) escribirlo en una Hoja de Google para auditoría, o (c) agregar a la persona a un grupo de B1 "Voluntarios aprobados" en `clear`.

## Recetas Comunes

### Volver a evaluar voluntarios cada 2 años

Combine lo anterior con un disparador de programación de Make:

- **Disparador** — Make: Programación (mensual)
- **Acción** — B1.church: Listar Miembros del Grupo para "Voluntarios aprobados"
- **Acción** — Filtrar por Make: fecha de aprobación anterior a 22 meses
- **Acción** — Checkr: Crear Invitación de Verificación de Antecedentes (igual que el flujo inicial)

### Bloquear el acceso a la etapa 1 hasta que se complete la verificación

Si su iglesia usa la membresía de grupo de B1 para controlar el acceso (por ejemplo, solo los miembros del grupo "Aprobados" aparecen en los horarios de servicio), mantenga a los nuevos voluntarios en un grupo de espera hasta que el evento `report.completed` de Checkr los transfiera.

## Límites y Notas

- **Checkr es solo para EE. UU.** en la mayoría de los paquetes de evaluación. Las iglesias de Australia, Reino Unido y Canadá necesitarán una alternativa.
- **Pricing** es por verificación — cada Crear Invitación en Make consume una verificación real. Pruebe primero en la cuenta de sandbox / staging de Checkr (la aplicación de Checkr en Make respeta las credenciales que pasa en la conexión, así que cambiar las credenciales cambia entre sandbox/producción).
- **El acceso a la API de Checkr está limitado por plan.** Las cuentas de Checkr más pequeñas pueden estar en un nivel solo de interfaz; contacte a Checkr para habilitar la API.

## Solución de Problemas

- **Crear Candidato falla con `403`** — el token de la API de Checkr es de solo lectura o carece de los permisos de cuenta correctos. Vuelva a emitirlo desde el panel de Checkr con permiso de escritura.
- **La invitación nunca llega** — verifique el correo electrónico del candidato en el paso 3; B1 puede tener un campo de correo electrónico vacío para esa persona. Agregue un filtro de correo electrónico obligatorio antes del paso de Checkr.
- **El disparador del webhook no se activa** — el registro de webhook de Checkr a veces falla silenciosamente si su cuenta de Make no está en un nivel de pago que admita webhooks salientes. Verifique en la página *Webhooks* del panel de Checkr que la URL de Make esté listada.

## Vea También

- [Make (resumen)](../make) — el lado de B1 de cada escenario de Make
- [Mobile Message](./mobile-message) — para proveedores de SMS sin aplicaciones de Zapier, el mismo patrón de Webhooks/HTTP que la conexión de Checkr en Make
- [Documentación de la API de Checkr](https://docs.checkr.com/)
