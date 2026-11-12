---
title: "Claves de API"
description: "Crea, limita con alcances y revoca claves de API de B1 en B1 Admin para scripts de servidor y conectores como Zapier, Make o Google Sheets, sin necesidad de un flujo OAuth completo."
---

# Claves de API

<div class="article-intro">

Las claves de API (tokens de acceso personal) son la forma más sencilla de autenticarse con la API de B1 desde un script del lado del servidor, un conector de terceros (Zapier, Make, Google Sheets) o cualquier caso en el que un flujo OAuth completo sea excesivo. Una clave está vinculada a una persona específica en una iglesia específica y hereda los permisos de esa persona, limitados por un conjunto opcional de alcances.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Un administrador de la iglesia con el permiso **Editar configuración** crea y administra las claves
- La clave completa se muestra **una sola vez** al crearla; guárdala de inmediato en un lugar seguro
- Todas las solicitudes a la API deben usar **HTTPS**

</div>

## Formato de la clave {#key-format}

Una clave de API de B1 tiene este aspecto:

```
cak_<prefix>.<secret>
```

- `cak_` — identificador fijo (el prefijo de clave de API que coincide la capa de autenticación)
- `<prefix>` — segmento público de búsqueda de 8 caracteres
- `<secret>` — secreto de 48 caracteres; del lado del servidor solo se almacena un hash SHA-256

La clave completa se presenta al servidor en el encabezado bearer estándar:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

La capa de autenticación de la API envía cualquier token que empiece con `cak_` a la ruta de claves de API, calcula el hash del secreto, lo busca por prefijo y resuelve los permisos actuales de la persona propietaria de la clave. Por eso, revocar un permiso en B1Admin surte efecto en la siguiente solicitud, y la clave nunca queda desincronizada con el rol.

## Crear una clave (B1Admin) {#creating-a-key-b1admin}

1. Inicia sesión en B1Admin con un usuario que tenga **Editar configuración**.
2. Abre **Configuración → Desarrollador → Claves de API**.
3. Haz clic en **Nueva clave de API**, asígnale un **Nombre** reconocible (por ejemplo, "Zapier — sincronización de donaciones"), selecciona al menos uno de los **Alcances** que debe tener la clave, opcionalmente elige una fecha de **Vence** (déjala en blanco para una clave que nunca caduca), y haz clic en **Guardar**.
4. La clave completa `cak_…` se muestra **una sola vez** en un cuadro de diálogo. Cópiala en la configuración de tu integración antes de cerrarlo; no hay forma de recuperarla después. Siempre puedes crear una nueva clave.

## Alcances {#scopes}

Un alcance **limita** lo que puede hacer una clave: nunca puede otorgar un permiso que la persona subyacente no tenga. Sin alcances, la clave tiene el conjunto completo de permisos de la persona; B1Admin siempre pide al menos un alcance, así que una clave sin alcances solo puede crearse a través de la API.

| Alcance | Permite |
|---|---|
| `people:read` / `people:write` | Ver / editar personas, hogares, miembros de grupos |
| `groups:read` / `groups:write` | Ver / editar grupos y su membresía |
| `donations:read` / `donations:write` | Ver / registrar donaciones |
| `attendance:read` / `attendance:write` | Ver / registrar asistencia, sesiones, registros de llegada |
| `forms:write` | Administrar formularios (el acceso de lectura está implícito en escritura) |
| `content:read` / `content:write` | Ver / editar contenido del sitio web, inscripciones, transmisión |
| `messaging:read` / `messaging:write` | Leer mensajería; escritura también permite enviar SMS |
| `roles:read` / `roles:write` | Ver / editar definiciones de roles |
| `settings:read` / `settings:write` | Ver / editar la configuración de la iglesia (**obligatorio** para registrar webhooks mediante programación) |
| `workflows:read` / `workflows:write` | Ver flujos de trabajo y tareas / ejecutar y editar flujos. Ejecutar un flujo puede enviar correos y mensajes de texto, disparar webhooks y cambiar la membresía de grupos |
| `offline_access` | Permite tokens de actualización de larga duración (solo flujos OAuth; no tiene efecto en las claves de API) |

Los alcances de `write` incluyen implícitamente el `read` correspondiente. Los permisos de administrador del servidor y del dominio no se exponen como alcances a propósito: una credencial limitada nunca puede elevarse a administración del sitio.

:::tip
Si vas a usar la clave para registrar webhooks (por ejemplo, para una integración de Zapier o Make), la clave necesita `settings:write`. Una clave solo con `people:read` responde 403 silenciosamente en `POST /membership/webhooks`.
:::

## Usar una clave {#using-a-key}

Igual que cualquier token bearer: todos los endpoints autenticados aceptan claves de API exactamente como aceptan JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Si una solicitud cuya clave no tiene alcances suficientes, responde **403 Forbidden** con la misma estructura que cualquier error de permiso denegado.

## Administrar claves mediante la API {#managing-keys-via-the-api}

Todos los endpoints están bajo la ruta `/membership/apiKeys` del módulo Membership y requieren un JWT (no una clave de API) de un administrador de la iglesia con **Editar configuración**.

| Método y ruta | Propósito |
|---|---|
| `GET /membership/apiKeys` | Lista las claves de la iglesia (sin el secreto; solo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista de todos los nombres de alcances disponibles, para una interfaz de creación de claves |
| `POST /membership/apiKeys` | Crea una nueva clave. Cuerpo: `{ "name": "...", "scopes": ["people:read"] }`. La respuesta incluye la clave `cak_…` completa **una sola vez**. |
| `DELETE /membership/apiKeys/:id` | Revoca una clave; surte efecto en la siguiente solicitud |

Una clave revocada deja de funcionar de inmediato; no hay período de gracia.

## Buenas prácticas {#best-practices}

- **Una clave por integración.** Si algo se compromete, revocas una sola clave sin romper las demás.
- **Crea con los alcances más restrictivos que funcionen.** Una exportación a Google Sheets solo necesita `people:read`, no `settings:write`.
- **Vincula la clave a una cuenta de servicio, no a un miembro real del personal.** Si un miembro del personal se va, su acceso a B1 termina, y con él las claves creadas bajo su identidad.
- **Guarda las claves en un gestor de secretos** (las variables de entorno de tu proveedor de hosting, AWS Secrets Manager, etc.), nunca en el control de versiones.
- **Rota las claves** si sospechas que se expusieron: crea una nueva, actualiza la integración y luego elimina la anterior.

## En qué se diferencia de OAuth {#how-it-differs-from-oauth}

Las claves de API son adecuadas cuando **tu iglesia es la única que usa la integración**. Para un conector que necesita acceder a muchas iglesias, cada una con su consentimiento explícito (como una app SaaS compartida en la comunidad de B1), usa [OAuth y aplicaciones conectadas](./connected-apps.md) en su lugar.

| | Clave de API | OAuth |
|---|---|---|
| Quién la instala | Un administrador de una iglesia | Cada administrador de iglesia autoriza la app |
| Encabezado de autenticación | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Vida del token | Hasta que se revoque | Acceso ≈ 7 días, actualización ≈ 90 días |
| Ideal para | Scripts internos, conectores Zapier/Make/Sheets | Apps de terceros multiinquilino |
