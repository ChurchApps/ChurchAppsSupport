---
title: "Claude"
---

# Claude

<div class="article-intro">

Pregúntale a Claude sobre tu iglesia en lenguaje sencillo y te responde con los datos de B1. Preguntas como *"¿cuántos visitantes por primera vez vinieron el domingo?"* o *"¿quién se unió a un grupo pequeño este mes?"* — o pídele que haga cosas, como *"agrega una nueva página a nuestro sitio web llamada Eventos."* La configuración toma menos de 3 minutos y no necesitas conocimientos técnicos ni instalar ningún programa.

</div>

<div class="prereqs">
<h4>Lo Que Necesitas</h4>

- **Una cuenta de Claude.** El **plan gratuito funciona** — una buena forma de probarlo. Sin embargo, las cuentas gratuitas tienen un límite diario de mensajes, y las consultas a B1 consumen mensajes rápidamente, así que si lo usas con regularidad te recomendamos **Claude Pro** (unos 20 USD/mes).
- **Tu inicio de sesión de B1** — el mismo que usas para B1 Admin.

</div>

:::tip Recomendado — gratis para probar
Claude es la forma más fácil de conectar B1 con la IA, y funciona con el **plan gratuito** de Claude — una manera perfecta para que tu iglesia lo pruebe antes de pagar por nada.
:::

Hay dos formas de conectarlo. **La Opción 1 es la más fácil** — sin clave y sin nada que instalar.

## Opción 1 — Inicia sesión con B1 (la más fácil)

Funciona en el sitio web de Claude, en la aplicación de escritorio de Claude y en la aplicación móvil de Claude — configúralo una vez y estará en todas.

### Paso 1 — Abre la configuración de conectores de Claude

1. Ve a [claude.ai](https://claude.ai) e inicia sesión (o crea una cuenta gratuita).
2. Haz clic en tu nombre en la esquina inferior izquierda y luego en **Settings** (Configuración) → **Connectors** (Conectores).

### Paso 2 — Agrega B1

1. Haz clic en **Add** (Agregar) y luego en **Add custom connector** (Agregar conector personalizado).
2. **Name** (Nombre): escribe `B1`.
3. **URL:** pega `https://api.churchapps.org/mcp`
4. Deja las demás opciones como están y haz clic en **Add** (Agregar).

### Paso 3 — Inicia sesión en B1

1. Haz clic en **Connect** (Conectar). Se abre una página de inicio de sesión de B1.
2. Inicia sesión con tu cuenta de B1. Si perteneces a más de una iglesia, verifica que arriba aparezca la iglesia correcta.
3. B1 muestra lo que Claude solicita hacer y confirma que volverás a **claude.ai**. Haz clic en **Allow** (Permitir).

Estás de vuelta en Claude, y B1 aparece como conectado.

### Paso 4 — Pregúntale algo

Inicia un **nuevo chat** y prueba:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"Enumera nuestros grupos activos."*
- *"Resume las donaciones de este mes por fondo."*
- *"¿Quién se unió a la iglesia en los últimos 30 días?"*

La primera vez, Claude pide permiso para usar B1 — haz clic en **Allow** (Permitir).

## Opción 2 — Extensión de escritorio con una clave de B1

Usa esta opción si prefieres darle a Claude una clave con permisos limitados (por ejemplo, solo para consultar). Funciona en la aplicación de escritorio de Claude para Mac o Windows, y necesitas permiso para administrar la configuración de la iglesia en B1 para crear una clave.

### Paso 1 — Obtén la aplicación de Claude

Descarga la aplicación de Claude desde [claude.com/download](https://claude.com/download), instálala, ábrela e inicia sesión.

### Paso 2 — Crea tu clave de B1

La clave es lo que le da a Claude acceso al B1 de *tu* iglesia — piensa en ella como una contraseña solo para Claude.

1. Inicia sesión en [B1 Admin](https://admin.b1.church) y ve a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **Claves de API**, haz clic en **Nueva Clave de API**.
3. **Nombre:** escribe `Claude`.
4. **Alcances:** marca lo que Claude puede hacer. Cada área tiene una casilla **read** (solo ver) y una casilla **write** (hacer cambios). ¿No estás seguro? Para empezar marca solo las casillas **read** — más adelante puedes crear una nueva clave con más permisos.
5. Haz clic en **Guardar** y luego en **Copiar** para copiar la clave. Solo se muestra una vez, así que pasa directamente al Paso 3.

### Paso 3 — Agrega B1 a Claude

1. [Descarga la extensión de B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. Haz **doble clic** en el archivo descargado (`b1-churchapps.mcpb`). Claude se abre y muestra **B1 (ChurchApps)**.
3. Haz clic en **Install** (Instalar).
4. Cuando te pida tu **B1 API key**, pega la clave del Paso 2 y guarda.
5. **Cierra Claude por completo** (Mac: **Cmd+Q** · Windows: clic derecho en el icono de Claude en la barra de tareas → **Quit** (Salir)) y vuelve a abrirlo.

Si al hacer doble clic no se abre Claude, ve a **Settings → Extensions → Advanced settings → Install Extension…** (Configuración → Extensiones → Configuración avanzada → Instalar extensión) en Claude y elige el archivo descargado. Luego inicia un nuevo chat y pregúntale algo.

## ¿Es Seguro?

- Claude solo puede ver los datos de **tu iglesia**.
- **Con sesión iniciada (Opción 1):** Claude nunca puede hacer más de lo que permite tu propio inicio de sesión de B1. La página de inicio de sesión de B1 enumera todo lo que Claude podrá hacer antes de que hagas clic en **Allow** (Permitir).
- **Con una clave (Opción 2):** Claude solo puede hacer lo que la clave permite — una clave con solo las casillas **read** marcadas puede mirar pero nunca cambiar nada.
- **Para desactivarlo:** en B1 Admin ve a **Configuración → Desarrollador** y revoca la aplicación en **Aplicaciones Conectadas** (Opción 1) o elimina la clave en **Claves de API** (Opción 2). El acceso se detiene de inmediato. También puedes hacer clic en **Disconnect** (Desconectar) en el conector de B1 en Claude.

## ¿Cuánto Cuesta?

La conexión con B1 es gratuita — es parte de ChurchApps. Claude tiene un plan gratuito; Claude Pro (unos 20 USD/mes) te da mucho más uso. Consulta [claude.com/pricing](https://claude.com/pricing).

## Detalles Técnicos

El resto de esta página es para usuarios técnicos y asistentes de IA: alcances, otras formas de conectarse y cómo funciona.

### Alcances

Claude se comunica con B1 a través del **servidor Model Context Protocol (MCP)** integrado en la API B1 (`https://api.churchapps.org/mcp`). Cada llamada se ejecuta a través de las mismas reglas de autenticación, permiso y delimitación de iglesia que una solicitud de B1 Admin. Claude se limita a los **permisos y alcances** de la clave de API, y no puede acceder a webhooks, puntos finales de administración de OAuth u otras rutas solo para operadores.

Conjuntos de alcances de inicio comunes:

- **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lectura + agregar notas / tareas:** agrega `people:write`
- **Asistente operativo completo:** agrega los alcances `:write` correspondientes que desees

Una clave `donations:read` permite a Claude resumir donaciones pero no registrar una ofrenda. Una clave `people:write` puede agregar una persona pero no ver donaciones. Consulta [Claves de API](/docs/developer/api/api-keys) para ver qué permite cada alcance.

### Otras formas de conectarse

#### Claude Code (CLI)

En una terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. Dentro de cualquier sesión de Claude Code, escribe `/mcp` para confirmar que el servidor `b1` está conectado, luego hazle a Claude cualquier pregunta sobre tu iglesia.

#### Claude Desktop — configuración manual (avanzado)

Si prefieres no usar la extensión, edita el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agrega una entrada del servidor `b1` que hace de puente a B1 a través de `mcp-remote` (requiere [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Reinicia Claude Desktop. El menú de conectores en el compositor de chat mostrará `b1` con sus herramientas.

#### Claude.ai (web) — Conector Personalizado

Consulta la **Opción 1** más arriba. El conector usa OAuth 2.1: Claude descubre el servidor de autorización de B1 a partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registra mediante Dynamic Client Registration e inicia sesión con PKCE. En los planes Team y Enterprise, es posible que primero un propietario deba agregar el conector para la organización. Claude no solicita alcances específicos, así que la página de consentimiento ofrece todo aquello a lo que puede acceder la cuenta de B1 con la que se inició sesión. Revócalo en **Configuración → Desarrollador → Aplicaciones Conectadas** en B1 Admin.

### Cómo Funciona

La API B1 expone un único punto final MCP en `/mcp`. Claude se conecta a él, se autentica con tu clave `cak_…`, y obtiene acceso a cuatro herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Lista los puntos finales REST que Claude puede llamar, filtrables por ruta. Se usa para descubrimiento. |
| `describe_endpoint` | Devuelve un resumen breve y una solicitud/respuesta de ejemplo para un punto final específico. |
| `api_call` | Invoca realmente un punto final REST como el usuario autenticado. |
| `describe_page_builder` | Una guía para crear y editar las páginas del sitio web de tu iglesia, que Claude lee antes de trabajar en el contenido del sitio web. |

Esta es la misma superficie `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que usa tu B1 Admin — cada regla de autorización se aplica de forma idéntica.

### Seguridad y Límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. Claude no tiene forma de ver datos de otras iglesias.
- **Limitado por permisos.** Si quitas un permiso a la persona que creó la clave en B1 Admin, Claude lo pierde en la siguiente llamada — al instante.
- **Revocable.** Elimina la clave en **Configuración → Desarrollador → Claves de API** y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los webhooks de proveedores, los puntos finales de administración de clientes OAuth y la ruta `apiEmails` solo para operadores no se pueden llamar a través de MCP.
- **Límite de tamaño de respuesta.** Una sola respuesta de herramienta está limitada a 64 KB para que las listas largas no saturen el contexto de Claude — Claude acotará la consulta con filtros cuando esto suceda.
- **Registro de auditoría.** Los cambios pasan por el mismo registro de auditoría que las acciones de B1 Admin; puedes revisarlos en **Configuración → Registro de Auditoría**.

### Solución de Problemas

**Claude reporta "Unauthorized" o 401:** el token portador falta, tiene un formato incorrecto o la clave ha sido revocada. Si usaste la extensión, abre **Settings → Extensions → B1 (ChurchApps)** (Configuración → Extensiones) en Claude y pega la clave de nuevo. De lo contrario, verifica nuevamente el encabezado `Authorization: Bearer cak_…` (fíjate en el espacio y en la palabra literal `Bearer`).

**Una llamada de herramienta devuelve 403:** la clave de API no tiene el alcance para ese punto final. Agrega el alcance en **Configuración → Desarrollador → Claves de API** (necesitarás crear una clave nueva — los alcances no se pueden cambiar en una clave existente) y pega la nueva clave en la configuración de la extensión o en la configuración de Claude.

**Claude no puede encontrar un punto final:** pídele que llame a `list_endpoints` con un filtro, p. ej. *"usa list_endpoints con el filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera desde la API en vivo, así que todo lo que puedas consultar con `curl` está ahí.

**Desarrollo local:** cambia `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` — misma autenticación, mismas herramientas.

## Relacionado

- [Claves de API](/docs/developer/api/api-keys) — referencia completa de alcances
- [Servidor MCP (referencia de desarrollador)](/docs/developer/api/mcp) — detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt) — misma idea, para los modelos de OpenAI
