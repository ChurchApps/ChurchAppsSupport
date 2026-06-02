---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Si tu iglesia recibe donaciones a través de Donorbox pero rastrea personas e instrucciones en B1, puedes hacer que los disparadores instantáneos de Zapier de Donorbox creen registros de donación coincidentes dentro de B1 — y creen el donante como una persona de B1 si aún no existe. Sin reconciliación manual, sin exportación mensual.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Donorbox](https://donorbox.org) con al menos una campaña
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

| Dirección | Disparador de Donorbox | Acción de B1 |
|---|---|---|
| Donorbox → B1 | Donación nueva o actualizada (instantáneo) | Buscar persona → Agregar donación |
| Donorbox → B1 | Donante nuevo o actualizado | Crear persona |
| Donorbox → B1 | Plan nuevo o actualizado (recurrente) | Buscar persona → Agregar donación (usar id del plan como nota) |

Donorbox publica sus disparadores como **instantáneos** — se activan dentro de segundos de una donación real. Sin demora de sondeo.

## Configuración

### 1. Crear una clave de API B1

En B1Admin: **Configuración → Desarrollador → Claves de API → Nueva Clave de API**. Alcances:

- `people:read` — para buscar el donante por correo
- `people:write` — para crear uno si es nuevo
- `donations:write` — para registrar el regalo

Los disparadores en esta dirección son de Donorbox, no de B1, así que no necesitas `settings:write` aquí.

### 2. Construir el Zap "registrar una donación"

1. **Disparador** — Donorbox: Nueva donación. Conecta con la clave de API de Donorbox (en Donorbox: *Cuenta → Perfil → Configuración de API*).
2. **Acción** — B1.church: Buscar persona. Asigna el correo del donante del disparador al campo de búsqueda de *Correo*.
3. **Acción** — Filtro por Zapier (opcional): continuar solo si el donante no fue encontrado, entonces…
4. **Acción** — B1.church: Crear persona. Asigna nombre/apellido/correo para que el donante se registre como miembro, no solo como registro de regalo.
5. **Acción** — B1.church: Agregar donación. Asigna:
   - Cantidad → `data.amount`
   - Fecha de donación → fecha de donación del disparador
   - Fondo → elige el fondo de B1 que refleja la campaña de Donorbox (Zapier te permite cambiar fondos basado en un paso de filtro o formateador)
   - Método → "En línea"
   - Notas → id de transacción de Donorbox (útil cuando reconcilias)

Activa el Zap. La siguiente donación en directo a través de Donorbox llega a **B1Admin → Donaciones** automáticamente.

## Recetas Comunes

### Un Zap por fondo

Si ejecutas múltiples campañas de Donorbox que se asignan a fondos de B1 separados, el diseño más limpio es un Zap por campaña con un filtro de *campaña* de Donorbox en la parte superior — de esa forma la asignación de fondo es codificado e inesperado el paso de búsqueda.

### Tratar donaciones actualizadas como correcciones

El *Donación nueva o actualizada* de Donorbox se activa en ediciones también. Usa un paso de *ruta* de Zapier en `event_type` para bifurcar: "nuevo" → Agregar donación, "actualizado" → Buscar donación + Actualizar (nota: la aplicación de Zapier de B1 no tiene actualmente una acción de actualización de donación — por ahora, registra eventos "actualizados" en un canal de Slack para revisión manual).

### Sincronizar cambios de plan recurrente a un canal de Slack

- **Disparador** — Donorbox: Plan nuevo o actualizado
- **Acción** — Slack: Enviar mensaje a `#donations` (p. ej. "Plan cambiado — el regalo mensual de Sarah es ahora $200")

## Límites y Notas

- **Coincide donantes por correo.** Donorbox no comparte la id de persona de B1; la única clave de unión duradera es el correo. Los donantes que dan bajo un correo diferente crearán una nueva persona de B1 — tu reconciliación mensual debería buscar estas.
- **Los reembolsos no se exponen por separado** — Donorbox emite una actualización de estado en la misma donación. La aplicación de Zapier de B1 actualmente no tiene una acción de *actualización de donación*; el patrón seguro hoy es registrar eventos de reembolso fuera de banda y ajustar la donación manualmente.
- **Prueba primero en el sandbox de Donorbox** para evitar crear regalos falsos en B1 de producción. Donorbox proporciona credenciales de modo de prueba separadas de en directo.

## Solución de Problemas

- **Advertencia "Persona no encontrada" cada ejecución** — está bien si has ordenado los pasos para que una ejecución de *crear persona* en la rama no encontrada. Si el paso Crear persona nunca se ejecuta tampoco, verifica que la clave de API tenga `people:write`.
- **La cantidad de donación se ve 100× demasiado grande o pequeña** — Donorbox envía centavos en algunas variantes de carga y dólares en otras. Usa un paso de *Formateador por Zapier — Números* para dividir por 100 si es necesario.
- **Donaciones duplicadas de un único regalo** — Donorbox activa tanto *Donación nueva* como *Donación actualizada*. Filtra por `event_type = "donation.succeeded"` o construye dos Zaps con filtros que no se superpongan.

## Ver También

- [Zapier (descripción general)](../zapier) — el lado B1 de cada receta de Zapier
- [Subsplash](./subsplash) — otra plataforma de donación con una aplicación de Zapier
- [Mailchimp](./mailchimp) — encadena "nuevo regalo" en una etiqueta de correo
