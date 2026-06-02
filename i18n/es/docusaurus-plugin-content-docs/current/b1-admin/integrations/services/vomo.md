---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO es una plataforma de participación de voluntarios — la gente se registra en proyectos, marca en el quiosco y acumula horas. Si usas VOMO para la programación de voluntarios pero B1 para registros de personas, Zapier puede sincronizar membresía y registros entre ellos para que ninguno lado derive.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [VOMO](https://vomo.org) en un plan que expone Zapier (verifica con soporte de VOMO si no estás seguro)
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

La aplicación de Zapier de VOMO expone cuatro disparadores instantáneos y cuatro acciones. Las recetas que la mayoría de iglesias desean:

| Dirección | Disparador | Acción |
|---|---|---|
| VOMO → B1 | Membresía de VOMO (creada) | B1: Buscar persona → Crear persona (si es nueva) |
| VOMO → B1 | Registro de quiosco de VOMO | B1: Agregar miembro de grupo a un grupo "Sirviendo actualmente", o registrar como asistencia |
| B1 → VOMO | B1 `person.created` | VOMO: Buscar organizador (por correo); si no, paso personalizado |
| Ya sea | Participación de VOMO (registros) | B1: Agregar miembro de grupo a grupo específico del proyecto |

Las acciones de VOMO se limitan a **proyectos de borrador** y **búsqueda** de organizadores/proyectos existentes — no hay "agregar esta persona a un proyecto de VOMO" hoy. El cableado interesante es principalmente VOMO → B1.

## Configuración

### 1. Crear una clave de API B1

**Configuración → Desarrollador → Claves de API → Nueva Clave de API**. Alcances:

- `people:read`, `people:write` — para buscar y crear voluntarios como personas de B1
- `groups:write` — para agregarlos a grupos de equipos de servicio
- (Opcional) `attendance:write` si tratas registros de quiosco como asistencia

### 2. Construir el Zap de sincronización de membresía

1. **Disparador** — VOMO: Membresía (evento = `created`).
2. **Acción** — B1.church: Buscar persona, coincidida en correo.
3. **Filtro / ruta** — bifurca en encontrado vs. no encontrado:
   - No encontrado → B1.church: Crear persona, luego Agregar miembro de grupo al grupo de voluntarios apropiado.
   - Encontrado → B1.church: Agregar miembro de grupo directamente.
4. Activa. Los nuevos voluntarios de VOMO ahora aparecen en B1 con la membresía de grupo correcta.

### 3. (Opcional) Construir el Zap de registro de quiosco

1. **Disparador** — VOMO: Quiosco
2. **Acción** — B1.church: Buscar persona (por correo)
3. **Acción** — tu elección:
   - *Si se trata como asistencia* — Webhooks por Zapier POST al punto final `/attendance/visits` de B1 (la aplicación de Zapier de B1 aún no tiene una acción de *Registrar asistencia* de primera clase). La [clave de API](/docs/developer/api/api-keys) de B1 va en el encabezado `Authorization: Bearer cak_…`.
   - *Si se trata como membresía de grupo* — B1.church: Agregar miembro de grupo con un grupo "Sirviendo actualmente (hoy)", y un segundo Zap más tarde en el día los elimina a través de una limpieza programada.

## Recetas Comunes

### Sincronización de grupo por proyecto

- **Disparador** — VOMO: Participación (creada)
- **Acción** — Filtro por Zapier en id de proyecto, luego
- **Acción** — B1.church: Agregar miembro de grupo a un grupo de B1 cuyo nombre refleja el proyecto de VOMO.

Cuando el proyecto de VOMO termina, limpia manualmente el grupo de B1 (o empareja esto con un disparador *Participación eliminada* que los elimina).

### Enviar un texto "gracias por registrarte" a través de SMS

Encadena VOMO Participación → Clearstream Enviar texto o Text In Church Enviar mensaje en el mismo Zap. Ambos tienen acciones de Zapier de primera clase — ve [Clearstream](./clearstream) y [Text In Church](./text-in-church).

### Detectar abandono

Ejecuta un disparador de *Programación* de Zapier diaria que llama Buscar organizador en VOMO para una lista de personas de B1 que se unieron al equipo de servicio este mes — si VOMO devuelve "no encontrado", no activaron VOMO y necesitan un empujón.

## Límites y Notas

- **El correo es la clave de unión.** Las cargas de VOMO exponen un correo de usuario pero sin id de persona de B1. Los donantes que usan correos diferentes en cada sistema crearán duplicados.
- **Sin acción "Agregar a proyecto" en la aplicación de Zapier de VOMO hoy.** Si necesitas inscripción de proyecto B1 → VOMO, deberías POST a la API REST de VOMO desde un paso *Webhooks por Zapier*, que es una integración personalizada.
- **Los niveles gratuito / más bajo de VOMO pueden no incluir Zapier.** Confirma con soporte de VOMO antes de prometer una fecha de cableado.

## Solución de Problemas

- **El disparador nunca se activa** — los disparadores instantáneos de VOMO requieren que el token de API permanezca válido. Vuelve a probar el Zap; reconecta VOMO si el token fue rotado.
- **B1 *Agregar miembro de grupo* falla con 422** — la id de grupo en la acción no existe. Abre **B1Admin → Grupos**, haz clic en el grupo, y copia el segmento de id de URL en el paso de Zap.
- **Personas duplicadas de B1 de un único voluntario de VOMO** — probablemente se registraron bajo un correo diferente al que ya tenían en B1. Ya sea estandariza correos, o agrega una *ruta* de Zapier que también busca por teléfono antes de crear.

## Ver También

- [Zapier (descripción general)](../zapier) — lado B1 de cada receta de Zapier
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — empareja registros de voluntarios con confirmaciones de SMS
- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks) — los eventos en los que VOMO puede disparar
