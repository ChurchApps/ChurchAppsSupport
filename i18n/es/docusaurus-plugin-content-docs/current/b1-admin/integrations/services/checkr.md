---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) ejecuta verificaciones de antecedentes para personal y voluntarios — una necesidad casi universal para cualquier iglesia que ejecute un programa infantil o juvenil. Checkr no tiene una aplicación de Zapier, pero [la integración de Checkr de Make.com](https://www.make.com/en/integrations/checkr) está verificada y expone las acciones que necesitas para iniciar una verificación desde un evento de B1.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Checkr](https://checkr.com) con acceso de API y al menos un paquete de evaluación configurado
- Una cuenta de [Make](https://www.make.com)
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

La aplicación Checkr de Make expone 1 disparador y 6 acciones:

| Dirección | Disparador B1 / Make | Acción |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado a un grupo de voluntarios) | Checkr: Crear candidato → Crear invitación de verificación de antecedentes |
| Checkr → B1 | Webhook de Checkr (evento de invitación / informe) | B1: Actualizar el registro de la persona (p. ej. etiqueta "Checkr aprobado") |

Las acciones de Checkr de Make: Crear candidato, Crear invitación de verificación de antecedentes, Obtener candidato, Obtener informe, Obtener ETA del informe, Obtener una invitación. Más 4 módulos de búsqueda.

## Configuración

### 1. Crear una clave de API B1

**Configuración → Desarrollador → Claves de API → Nueva Clave de API**:

- `settings:write` — para el webhook de disparador
- `people:read` — para buscar el nombre/correo de la persona al iniciar una verificación
- (Opcional) `people:write` si deseas escribir el estado del informe de vuelta como un campo personalizado o etiqueta

### 2. Construir el escenario "iniciar una verificación al registrarse un voluntario" en Make

1. **Disparador** — B1.church: Ver eventos (`group.member.added`).
2. **Filtro** — continuar solo si `data.groupId` coincide con tu "Voluntarios infantiles" (u equivalente).
3. **Acción** — B1.church: Buscar persona (por `data.personId`) para obtener correo + nombre/apellido.
4. **Acción** — Checkr: Crear candidato. Asigna nombre/apellido/correo del paso 3.
5. **Acción** — Checkr: Crear invitación de verificación de antecedentes. Asigna la nueva id de candidato del paso 4 al campo *candidate_id*. Elige el paquete de evaluación (p. ej. `tasker_standard` u lo que tu cuenta exponga).
6. (Opcional) **Acción** — Slack: notifica a tu coordinador de ministerio seguro que se ha iniciado una verificación.

Activa el escenario. Los nuevos voluntarios en el grupo objetivo reciben automáticamente una invitación de Checkr por correo; la completan en su teléfono o laptop; Checkr ejecuta la evaluación.

### 3. (Opcional) Recibir el informe de vuelta

1. **Disparador** — Checkr: Ver eventos (webhook). Make registra un webhook de Checkr al activar.
2. **Filtro** — continuar solo si `event_type = report.completed`.
3. **Acción** — Checkr: Obtener informe (usa la id de informe del webhook).
4. **Acción** — B1.church: Buscar persona (por correo de candidato).
5. **Acción** — Slack/Correo condicional: notifica al coordinador con estado `clear` / `consider` / `suspended`.

Nota: B1 no tiene un campo "estado de verificación de antecedentes" integrado hoy. Las opciones pragmáticas son (a) publicar el resultado a un canal Slack privado para revisión, (b) escribirlo en una hoja de Google para auditoría, o (c) agregar la persona a un grupo "Voluntarios aprobados" de B1 en `clear`.

## Recetas Comunes

### Revérifier voluntarios cada 2 años

Empareja lo anterior con un disparador de programación de Make:

- **Disparador** — Make: Programación (mensual)
- **Acción** — B1.church: Enumerar miembros de grupo para "Voluntarios aprobados"
- **Acción** — Filtro por Make: fecha de aprobación anterior a 22 meses
- **Acción** — Checkr: Crear invitación de verificación de antecedentes (igual que el flujo inicial)

### Bloquear acceso de etapa 1 hasta que se complete la verificación

Si tu iglesia usa membresía de grupo de B1 para controlar acceso (p. ej. solo los miembros del grupo "Aprobado" aparecen en horarios de servicio), mantén los nuevos voluntarios en un grupo de espera hasta que el evento `report.completed` de Checkr los voltee.

## Límites y Notas

- **Checkr es solo para EE. UU.** para la mayoría de los paquetes de evaluación. Las iglesias australianas, del Reino Unido y canadienses necesitarán una alternativa.
- **Los precios** son por verificación — cada "Crear invitación" en Make consume una verificación real. Prueba primero en la cuenta de sandbox / staging de Checkr (la aplicación Checkr de Make respeta las credenciales que pasas en la conexión, así que cambiar credenciales cambia sandbox/en directo).
- **El acceso a la API de Checkr está controlado por plan.** Las cuentas de Checkr más pequeñas pueden estar en un nivel solo de interfaz de usuario; contacta a Checkr para habilitarlo.

## Solución de Problemas

- **Crear candidato falla con `403`** — el token de API de Checkr es de solo lectura o carece de los permisos correctos de cuenta. Vuelve a emitirlo desde el panel de Checkr con alcance de escritura.
- **La invitación nunca llega** — verifica el correo del candidato en el paso 3; B1 puede tener un campo de correo vacío para esa persona. Agrega un filtro requerido de correo antes del paso de Checkr.
- **El disparador de webhook no se activa** — el registro de webhook de Checkr a veces falla silenciosamente si tu cuenta de Make no está en un nivel de pago que soporta webhooks salientes. Verifica en la página *Webhooks* del panel de Checkr que la URL de Make esté listada.

## Ver También

- [Make (descripción general)](../make) — lado B1 de cada escenario de Make
- [Mobile Message](./mobile-message) — para proveedores SMS sin aplicación de Zapier, el mismo patrón de webhooks/HTTP que la conectividad de Checkr Make
- [Documentos de API de Checkr](https://docs.checkr.com/)
