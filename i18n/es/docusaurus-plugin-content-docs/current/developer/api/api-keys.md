---
title: "Claves de API"
---

# Claves de API

<div class="article-intro">

Las claves de API (tokens de acceso personal) son la forma más sencilla de autenticarse con la API de B1 desde un script del lado del servidor, un conector de terceros (Zapier, Make, Google Sheets) o en cualquier caso en que un flujo OAuth completo sea excesivo. Una clave está vinculada a una persona específica en una iglesia específica y hereda los permisos de esa persona, restringidos por un conjunto opcional de permisos (scopes).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Un administrador de la iglesia con el permiso **Editar configuración** crea y administra las claves
- La clave completa se muestra **una sola vez** al crearla: guárdala en un lugar seguro de inmediato
- Todas las solicitudes a la API deben usar **HTTPS**

</div>

## Formato de la clave

Una clave de API de B1 tiene este aspecto:

```
cak_<prefix>.<secret>
```

- `cak_` — identificador fijo (el prefijo de la clave de API con el que coincide la capa de autenticación)
- `<prefix>` — segmento público de búsqueda de 8 caracteres
- `<secret>` — secreto de 48 caracteres; en el servidor solo se almacena un hash SHA-256

La clave completa se envía al servidor en el encabezado bearer estándar:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

La capa de autenticación de la API dirige cualquier token que comience con `cak_` a la ruta de claves de API, calcula el hash del secreto, lo busca por prefijo y resuelve los permisos actuales de la persona de la clave. Por eso, revocar un permiso en B1Admin surte efecto en la siguiente solicitud, y la clave nunca queda desincronizada con el rol.

## Crear una clave (B1Admin)

1. Inicia sesión en B1Admin con un usuario que tenga **Editar configuración**.
2. Abre **Configuración → Desarrollador → Claves de API**.
3. Haz clic en **Nueva clave de API**, dale un nombre reconocible (por ejemplo, "Zapier — sincronización de donaciones"), selecciona los permisos que debe tener la clave y haz clic en **Guardar**.
4. La clave completa `cak_…` se muestra **una sola vez** en un cuadro de diálogo. Cópiala en la configuración de tu integración antes de cerrarlo: no hay forma de recuperarla después. Siempre puedes crear una nueva clave.

## Permisos (scopes)

Un permiso **restringe** lo que puede hacer una clave: nunca puede otorgar un permiso que la persona subyacente no tenga. Si no hay permisos (vacío), la clave tiene el conjunto completo de permisos de la persona.

| Permiso | Permite |
|---|---|
| `people:read` / `people:write` | Ver / editar personas, hogares y miembros de grupos |
| `groups:read` / `groups:write` | Ver / editar grupos y su membresía |
| `donations:read` / `donations:write` | Ver / registrar donaciones |
| `attendance:read` / `attendance:write` | Ver / registrar asistencia, sesiones y registros de entrada |
| `forms:write` | Administrar formularios (el acceso de lectura está implícito en escritura) |
| `content:read` / `content:write` | Ver / editar contenido del sitio web, inscripciones y transmisiones |
| `messaging:read` / `messaging:write` | Leer mensajería; escribir también permite enviar SMS |
| `roles:read` / `roles:write` | Ver / editar definiciones de roles |
| `settings:read` / `settings:write` | Ver / editar la configuración de la iglesia (**necesario** para registrar webhooks mediante programación) |
| `workflows:read` / `workflows:write` | Ver flujos de trabajo y tareas / ejecutar y editar flujos de trabajo. Ejecutar un flujo de trabajo puede enviar correos y textos, disparar webhooks y cambiar la membresía de grupos |
| `offline_access` | Permite tokens de actualización de larga duración (solo flujos OAuth; no tiene efecto en las claves de API) |

Los permisos `write` incluyen implícitamente el `read` correspondiente. Los permisos de administrador del servidor y del dominio no se exponen deliberadamente como permisos: una credencial con permisos restringidos nunca puede elevarse a administración del sitio.

:::tip
Si vas a usar la clave para registrar webhooks (por ejemplo, para una integración de Zapier o Make), la clave necesita `settings:write`. Una clave que solo tiene `people:read` responde con un 403 sin previo aviso en `POST /membership/webhooks`.
:::

## Usar una clave

Igual que cualquier token bearer: cada endpoint autenticado acepta las claves de API exactamente como acepta los JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Una solicitud cuya clave no tenga permisos suficientes responde con **403 Forbidden**, con la misma estructura que usa cualquier error de permiso denegado.

## Administrar claves mediante la API

Todos los endpoints están bajo la ruta `/membership/apiKeys` del módulo Membership y requieren un JWT (no una clave de API) de un administrador de la iglesia con **Editar configuración**.

| Método y ruta | Propósito |
|---|---|
| `GET /membership/apiKeys` | Lista las claves de la iglesia (sin el secreto; solo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lista de todos los nombres de permisos disponibles; para una interfaz de creación de claves |
| `POST /membership/apiKeys` | Crea una nueva clave. Cuerpo: `{ "name": "...", "scopes": ["people:read"] }`. La respuesta incluye la clave `cak_…` completa **una sola vez**. |
| `DELETE /membership/apiKeys/:id` | Revoca una clave; surte efecto en la siguiente solicitud |

Una clave revocada deja de funcionar de inmediato: no hay periodo de gracia.

## Buenas prácticas

- **Una clave por integración.** Si algo se ve comprometido, revocas una sola clave sin afectar a las demás.
- **Crea los permisos más restringidos que funcionen.** Una exportación a Google Sheets solo necesita `people:read`, no `settings:write`.
- **Vincula la clave a una cuenta de servicio, no a un miembro real del personal.** Si un miembro del personal se va, su acceso a B1 termina, y con él las claves creadas bajo su identidad.
- **Guarda las claves en un gestor de secretos** (las variables de entorno de tu proveedor de hosting, AWS Secrets Manager, etc.), nunca en el control de código fuente.
- **Rota las claves** si sospechas que se han expuesto: crea una nueva clave, actualiza la integración y luego elimina la anterior.

## Diferencias con OAuth

Las claves de API son adecuadas cuando **tu iglesia es la única que usa la integración**. Para un conector que necesita acceder a muchas iglesias con el consentimiento explícito de cada una, como una aplicación SaaS compartida por la comunidad de B1, usa [OAuth y aplicaciones conectadas](./connected-apps) en su lugar.

| | Clave de API | OAuth |
|---|---|---|
| Quién la instala | Un administrador de la iglesia | Cada administrador de la iglesia autoriza la aplicación |
| Encabezado de autenticación | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Duración del token | Hasta que se revoque | Acceso ≈ 7 días, actualización ≈ 90 días |
| Ideal para | Scripts internos, conectores de Zapier/Make/Sheets | Aplicaciones de terceros multiinquilino |
