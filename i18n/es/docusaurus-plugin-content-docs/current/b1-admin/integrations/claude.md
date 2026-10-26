---
title: "Claude"
---

# Claude

<div class="article-intro">

Pregúntale a Claude sobre tu iglesia en lenguaje sencillo y responderá con los datos de tu B1. Preguntas como *"¿cuántas visitas primerizas vinieron el domingo?"* o *"¿quién se unió a un grupo pequeño este mes?"*, o pídele que haga cosas, como *"agrega una nueva página a nuestro sitio web llamada Eventos"*. La configuración toma menos de 3 minutos y no necesitas conocimientos técnicos ni instalar software.

</div>

<div class="prereqs">
<h4>Lo que necesitas</h4>

- **Una cuenta de Claude.** El **plan gratuito funciona**; es una buena forma de probarlo. Sin embargo, las cuentas gratuitas tienen un límite diario de mensajes, y consultar datos en B1 consume mensajes rápidamente, así que si lo vas a usar con regularidad te recomendamos **Claude Pro** (unos $20 USD al mes).
- **Tu inicio de sesión en B1.** El mismo que usas para B1 Admin.

</div>

:::tip Recomendado: gratis para probar
Claude es la forma más sencilla de conectar B1 con la IA, y funciona con el **plan gratuito** de Claude, una manera ideal para que tu iglesia lo pruebe antes de pagar por algo.
:::

Hay dos formas de conectarlo. **La opción 1 es la más fácil**: no necesitas una clave ni instalar nada.

## Opción 1: Iniciar sesión con B1 (la más fácil)

Funciona en el sitio web de Claude, en la aplicación de escritorio de Claude y en la aplicación de Claude para el teléfono. Configúralo una vez y estará disponible en todas.

### Paso 1: Abre la configuración de conectores de Claude

1. Ve a [claude.ai](https://claude.ai) e inicia sesión (o crea una cuenta gratuita).
2. Haz clic en tu nombre en la esquina inferior izquierda y luego en **Configuración** → **Conectores**.

### Paso 2: Agrega B1

1. Haz clic en **Agregar** y luego en **Agregar conector personalizado**.
2. **Nombre:** escribe `B1`.
3. **URL:** pega `https://api.churchapps.org/mcp`
4. Deja las demás opciones como están y haz clic en **Agregar**.

### Paso 3: Inicia sesión en B1

1. Haz clic en **Conectar**. Se abrirá una página de inicio de sesión de B1.
2. Inicia sesión con tu cuenta de B1. Si perteneces a más de una iglesia, verifica que aparezca la correcta en la parte superior.
3. B1 muestra lo que Claude está solicitando hacer y confirma que serás devuelto a **claude.ai**. Haz clic en **Permitir**.

Volverás a Claude y B1 aparecerá como conectado.

### Paso 4: Hazle una pregunta

Inicia un **chat nuevo** y prueba con:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"Enumera nuestros grupos activos."*
- *"Resume las donaciones de este mes por fondo."*
- *"¿Quién se unió a la iglesia en los últimos 30 días?"*

La primera vez, Claude pedirá permiso para usar B1. Haz clic en **Permitir**.

## Opción 2: Extensión de escritorio con una clave de B1

Usa esta opción si prefieres darle a Claude una clave con permisos limitados (por ejemplo, solo de lectura). Funciona en la aplicación de escritorio de Claude para Mac o Windows, y necesitas permiso para administrar la configuración de la iglesia en B1 para crear una clave.

### Paso 1: Obtén la aplicación de Claude

Descarga la aplicación de Claude desde [claude.com/download](https://claude.com/download), instálala, ábrela e inicia sesión.

### Paso 2: Crea tu clave de B1

La clave es lo que permite a Claude entrar al B1 de *tu* iglesia. Piénsala como una contraseña exclusiva para Claude.

1. Inicia sesión en [B1 Admin](https://admin.b1.church) y ve a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **Claves de API**, haz clic en **Nueva clave de API**.
3. **Nombre:** escribe `Claude`.
4. **Permisos (scopes):** marca lo que Claude puede hacer. Cada área tiene una casilla de **lectura** (solo consultar) y una casilla de **escritura** (hacer cambios). ¿No estás seguro? Marca solo las casillas de **lectura** para empezar; más adelante puedes crear una clave nueva con más permisos.
5. Haz clic en **Guardar** y luego en **Copiar** la clave. Solo se muestra una vez, así que pasa directamente al Paso 3.

### Paso 3: Agrega B1 a Claude

1. [Descarga la extensión de B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Haz doble clic** en el archivo descargado (`b1-churchapps.mcpb`). Claude se abrirá y mostrará **B1 (ChurchApps)**.
3. Haz clic en **Instalar**.
4. Cuando pida tu **clave de API de B1**, pega la clave del Paso 2 y guárdala.
5. **Cierra Claude por completo** (en Mac: **Cmd+Q** · en Windows: haz clic derecho en el icono de Claude en la barra de tareas → **Salir**) y vuelve a abrirlo.

Si al hacer doble clic no se abre Claude, ve a **Configuración → Extensiones → Configuración avanzada → Instalar extensión…** dentro de Claude y elige el archivo descargado. Luego inicia un chat nuevo y hazle una pregunta.

## ¿Es seguro?

- Claude solo puede ver los datos **de tu iglesia**.
- **Con inicio de sesión (Opción 1):** Claude nunca puede hacer más de lo que puede hacer tu propia cuenta de B1. La página de inicio de sesión de B1 muestra todo lo que Claude puede hacer antes de que hagas clic en **Permitir**.
- **Con una clave (Opción 2):** Claude solo puede hacer lo que permite la clave. Una clave con solo casillas de **lectura** marcadas puede consultar datos, pero nunca cambiar nada.
- **Para desactivarlo:** en B1 Admin ve a **Configuración → Desarrollador** y revoca la aplicación en **Aplicaciones conectadas** (Opción 1), o elimina la clave en **Claves de API** (Opción 2). El acceso se detiene de inmediato. También puedes hacer clic en **Desconectar** en el conector de B1 dentro de Claude.

## ¿Cuánto cuesta?

La conexión con B1 es gratuita; forma parte de ChurchApps. Claude tiene un plan gratuito; Claude Pro (unos $20 USD al mes) ofrece mucho más uso. Consulta [claude.com/pricing](https://claude.com/pricing).

## Detalles técnicos

El resto de esta página es para usuarios técnicos y asistentes de IA: permisos (scopes), otras formas de conectarse y cómo funciona.

### Permisos (scopes)

Claude se comunica con B1 a través del **servidor del Model Context Protocol (MCP)** integrado en la API de B1 (`https://api.churchapps.org/mcp`). Cada llamada pasa por las mismas reglas de autenticación, permisos y aislamiento por iglesia que una solicitud desde B1 Admin. Claude está limitado a los **permisos y scopes** de la clave de API y no puede acceder a webhooks, endpoints de administración de OAuth ni otras rutas exclusivas del operador.

Conjuntos de permisos iniciales comunes:

- **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lectura + agregar notas / tareas:** agrega `people:write`
- **Asistente operativo completo:** agrega los permisos `:write` correspondientes que quieras

Una clave con `donations:read` permite a Claude resumir donaciones, pero no puede registrar una ofrenda. Una clave con `people:write` puede agregar una persona, pero no puede ver donaciones. Consulta [Claves de API](/docs/developer/api/api-keys) para ver lo que permite cada permiso.

### Otras formas de conectarse

#### Claude Code (CLI)

En una terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. Dentro de cualquier sesión de Claude Code, escribe `/mcp` para confirmar que el servidor `b1` está conectado y luego hazle cualquier pregunta sobre tu iglesia.

#### Claude Desktop: configuración manual (avanzada)

Si prefieres no usar la extensión, edita el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agrega una entrada de servidor `b1` que se conecte a B1 mediante `mcp-remote` (requiere [Node.js](https://nodejs.org)):

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

Reinicia Claude Desktop. El menú de conectores en el campo de chat mostrará `b1` con sus herramientas.

#### Claude.ai (web): conector personalizado

Consulta la **Opción 1** de arriba. El conector usa OAuth 2.1: Claude descubre el servidor de autorización de B1 desde `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registra mediante Dynamic Client Registration e inicia sesión con PKCE. En los planes Team y Enterprise, un propietario quizá deba agregar primero el conector para la organización. Claude no solicita permisos específicos, así que la página de consentimiento ofrece todo lo que la cuenta de B1 con sesión iniciada puede acceder. Para revocarlo, ve a **Configuración → Desarrollador → Aplicaciones conectadas** en B1 Admin.

### Cómo funciona

La API de B1 expone un único endpoint MCP en `/mcp`. Claude se conecta a él, se autentica con tu clave `cak_…` y obtiene acceso a cuatro herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Enumera los endpoints REST que Claude puede llamar, filtrables por ruta. Se usa para descubrimiento. |
| `describe_endpoint` | Devuelve un resumen breve y un ejemplo de solicitud y respuesta para un endpoint específico. |
| `api_call` | Invoca realmente un endpoint REST como el usuario autenticado. |
| `describe_page_builder` | Una guía para crear y editar las páginas de tu sitio web de la iglesia, que Claude lee antes de trabajar en el contenido del sitio. |

Es la misma superficie `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. que usa B1Admin; todas las reglas de autorización se aplican de la misma manera.

### Seguridad y límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. Claude no tiene forma de ver datos de otras iglesias.
- **Limitado por permisos.** Si quitas un permiso a la persona que creó la clave en B1Admin, Claude lo pierde en la siguiente llamada, de inmediato.
- **Revocable.** Elimina la clave en **Configuración → Desarrollador → Claves de API** y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los webhooks de proveedores, los endpoints de administración de clientes OAuth y la ruta exclusiva del operador `apiEmails` no se pueden llamar mediante MCP.
- **Límite de tamaño de respuesta.** Cada respuesta de herramienta se limita a 64 KB para que las listas largas no saturen el contexto de Claude; si esto ocurre, Claude reducirá la consulta con filtros.
- **Registro de auditoría.** Las modificaciones pasan por el mismo registro de auditoría que las acciones de B1Admin; puedes revisarlas en **Configuración → Registro de auditoría**.

### Solución de problemas

**Claude informa "Unauthorized" o 401:** falta el token de portador, está mal formado o la clave fue revocada. Si usaste la extensión, abre **Configuración → Extensiones → B1 (ChurchApps)** en Claude y pega la clave de nuevo. De lo contrario, revisa el encabezado `Authorization: Bearer cak_…` (fíjate en el espacio y en la palabra `Bearer` tal cual).

**Una llamada a herramienta devuelve 403:** la clave de API no tiene el permiso necesario para ese endpoint. Agrega el permiso en **Configuración → Desarrollador → Claves de API** (tendrás que crear una clave nueva, porque los permisos no se pueden cambiar en una existente) y pega la nueva clave en la configuración de la extensión o en la configuración de Claude.

**Claude no encuentra un endpoint:** pídele que llame a `list_endpoints` con un filtro, por ejemplo, *"usa list_endpoints con el filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera a partir de la API en vivo, así que cualquier cosa que puedas consultar con `curl` está incluida.

**Desarrollo local:** cambia `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp`; la autenticación y las herramientas son las mismas.

## Relacionado

- [Claves de API](/docs/developer/api/api-keys): referencia completa de permisos
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt): la misma idea, para los modelos de OpenAI
