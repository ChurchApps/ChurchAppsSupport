---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) ejecuta verificaciones de antecedentes para personal y voluntarios -- una necesidad casi universal para cualquier iglesia que maneje un programa para niños o jóvenes. B1 **no tiene una característica integrada de verificación de antecedentes** -- ordenar verificaciones, rastrear resultados, y cumplimiento de verificación todos viven en Checkr; la receta a continuación solo conecta eventos de B1 a ella. Checkr no tiene una aplicación de Zapier, pero [la integración de Checkr de Make.com](https://www.make.com/en/integrations/checkr) está verificada y expone las acciones que necesitas para iniciar una verificación desde un evento de B1.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Checkr](https://checkr.com) con acceso API y al menos un paquete de verificación configurado
- Una cuenta de [Make](https://www.make.com)
- Un usuario de B1 Admin con permiso **Editar Configuración**

</div>

## Qué puedes conectar

La aplicación Checkr de Make expone 1 disparador y 6 acciones:

| Dirección | Disparador de B1 / Make | Acción |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado a un grupo de voluntarios) | Checkr: Crear Candidato → Crear Invitación de Verificación de Antecedentes |
| Checkr → B1 | Webhook de Checkr (evento de invitación / informe) | B1: Actualizar el registro de la persona (p. ej. etiquetar "Checkr Autorizado") |

Acciones de Checkr de Make: Crear Candidato, Crear Invitación de Verificación de Antecedentes, Obtener Candidato, Obtener Informe, Obtener ETA de Informe, Obtener una Invitación. Más 4 módulos de búsqueda.

## Configuración

### 1. Acuña una clave API de B1

**Configuración → Desarrollador → Claves API → Nueva Clave API**:

- `settings:write` — para el webhook del disparador
- `people:read` — para buscar el nombre/correo de la persona al iniciar una verificación
- (Opcional) `people:write` si deseas escribir el estado del informe como un campo personalizado o etiqueta

### 2. Construye el escenario "iniciar una verificación al inscribirse un voluntario" en Make

1. **Disparador** — B1 Church: Ver Eventos (`group.member.added`).
2. **Filtro** — continúa solo si `data.groupId` coincide con tu grupo "Voluntarios de Niños" (o equivalente).
3. **Acción** — B1 Church: Buscar Persona (por `data.personId`) para obtener correo + nombre/apellido.
4. **Acción** — Checkr: Crear Candidato. Mapea nombre/apellido/correo del paso 3.
5. **Acción** — Checkr: Crear Invitación de Verificación de Antecedentes. Mapea el nuevo id de candidato del paso 4 al campo *candidate_id*. Elige el paquete de verificación (p. ej. `tasker_standard` o lo que tu cuenta exponga).
6. (Opcional) **Acción** — Slack: notifica a tu coordinador de seguridad ministerial que se ha iniciado una verificación.

Activa el escenario. Los nuevos voluntarios en el grupo objetivo reciben automáticamente una invitación de Checkr por correo; la completan en su teléfono o portátil; Checkr ejecuta la verificación.

### 3. (Opcional) Recibe el informe de vuelta

1. **Disparador** — Checkr: Ver Eventos (webhook). Make registra un webhook de Checkr al activarse.
2. **Filtro** — continúa solo si `event_type = report.completed`.
3. **Acción** — Checkr: Obtener Informe (usa el id de informe del webhook).
4. **Acción** — B1 Church: Buscar Persona (por correo del candidato).
5. **Acción** — Slack / Correo Condicional: notifica al coordinador con estado `clear` / `consider` / `suspended`.

Nota: B1 no tiene un campo "estado de verificación de antecedentes" integrado hoy. Las opciones prácticas son (a) publicar el resultado en un canal privado de Slack para revisión, (b) escribirlo en una hoja de Google para auditoría, o (c) agregar la persona a un grupo de B1 "Voluntarios Autorizados" en `clear`.

## Recetas comunes

### Re-verificar voluntarios cada 2 años

Empareja lo anterior con un disparador de programación de Make:

- **Disparador** — Make: Programación (mensual)
- **Acción** — B1 Church: Listar Miembros del Grupo para "Voluntarios Autorizados"
- **Acción** — Filtro por Make: fecha autorizada más antigua que 22 meses
- **Acción** — Checkr: Crear Invitación de Verificación de Antecedentes (igual que el flujo inicial)

### Bloquea el acceso de etapa 1 hasta que se complete la verificación

Si tu iglesia usa membresía de grupo B1 para controlar acceso (p. ej. solo los miembros del grupo "Autorizado" aparecen en cronogramas de servicio), mantén nuevos voluntarios en un grupo de espera hasta que el evento `report.completed` de Checkr los cambie.

## Límites y notas

- **Checkr es solo EE.UU.** para la mayoría de paquetes de verificación. Las iglesias de Australia, Reino Unido y Canadá necesitarán una alternativa.
- **Precios** por verificación -- cada Create Invitation en Make gasta una verificación real. Prueba primero en la cuenta sandbox / staging de Checkr (la aplicación Checkr de Make respeta las credenciales que pasas en la conexión, así que cambiar credenciales cambia sandbox/vivo).
- **El acceso a la API de Checkr está puesto tras un muro** según plan. Las cuentas más pequeñas de Checkr pueden estar en un nivel solo de interfaz; contacta a Checkr para habilitar API.

## Solución de problemas

- **Create Candidate falla con `403`** — el token de API de Checkr es de solo lectura o carece de los permisos de cuenta correctos. Re-emítelo desde el panel de Checkr con alcance de escritura.
- **La invitación nunca llega** — verifica el correo del candidato en el paso 3; B1 puede tener un campo de correo vacío para esa persona. Agrega un filtro requerido de correo antes del paso de Checkr.
- **El disparador de webhook no se activa** — el registro de webhook de Checkr a veces falla silenciosamente si tu cuenta de Make no está en un nivel pagado que soporte webhooks de salida. Verifica en la página *Webhooks* del panel de Checkr que la URL de Make esté listada.

## Ver también

- [Make (Descripción General)](../make) — Lado de B1 de cada escenario de Make
- [Mensaje Móvil](./mobile-message) — para proveedores de SMS sin aplicaciones de Zapier, el mismo patrón Webhooks/HTTP que el cableado de Checkr de Make
- [Documentos API de Checkr](https://docs.checkr.com/)
