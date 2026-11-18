---
title: "Claude"
description: "Conecte B1 Admin a Claude para preguntar sobre asistencia, donaciones y grupos en lenguaje sencillo, con una opción de inicio de sesión y una opción de clave con permisos limitados."
---

# Claude

<div class="article-intro">

Pregúntele a Claude sobre su iglesia en lenguaje sencillo y le responderá con sus datos de B1, incluidas sus lecciones y aulas de FreePlay. Preguntas como *"¿cuántos visitantes primerizos vinieron el domingo?"* o *"¿quién se unió a un grupo pequeño este mes?"*, o pídale que haga cosas, como *"agrega una nueva página a nuestro sitio web llamada Eventos"*. La configuración toma menos de 3 minutos y no necesita conocimientos técnicos ni instalar software.

</div>

<div class="prereqs">
<h4>Lo que necesita</h4>

- **Una cuenta de Claude.** El **plan gratuito funciona**, y es una buena forma de probarlo. Sin embargo, las cuentas gratuitas tienen un límite diario de mensajes, y consultar datos en B1 consume mensajes rápidamente, así que si lo va a usar con regularidad le recomendamos **Claude Pro** (unos $20 al mes).
- **Su inicio de sesión de B1**: el mismo que usa para B1 Admin.

</div>

:::tip Recomendado: gratis para probar
Claude es la forma más sencilla de conectar B1 con la IA, y funciona en el **plan gratuito** de Claude: una manera perfecta para que su iglesia lo pruebe antes de pagar por algo.
:::

Hay dos formas de conectarse. La **Opción 1 es la más sencilla**: no requiere clave ni instalar nada.

## Opción 1: Inicie sesión con B1 (lo más sencillo) {#option-1--sign-in-with-b1-easiest}

Funciona en el sitio web de Claude, en la aplicación de escritorio de Claude y en la aplicación de Claude para teléfono: configúrelo una vez y estará disponible en todos.

### Paso 1: Abra la configuración de conectores de Claude {#step-1--open-claudes-connector-settings}

1. Vaya a [claude.ai](https://claude.ai) e inicie sesión (o cree una cuenta gratuita).
2. Haga clic en su nombre en la esquina inferior izquierda y luego en **Customize** → **Connectors**.

### Paso 2: Agregue B1 {#step-2--add-b1}

1. Haga clic en **Add** y luego en **Add custom connector**.
2. **Name:** escriba `B1`.
3. **URL:** pegue `https://api.churchapps.org/mcp`
4. Deje las demás opciones como están y haga clic en **Add**.

### Paso 3: Inicie sesión en B1 {#step-3--sign-in-to-b1}

1. Haga clic en **Connect**. Se abrirá una página de inicio de sesión de B1.
2. Inicie sesión con su cuenta de B1. Si pertenece a más de una iglesia, verifique que la página mencione la iglesia correcta ("¿Desea acceder a los siguientes datos de *su iglesia*…?").
3. B1 enumera lo que Claude solicita (**Todo lo que su cuenta de B1 puede acceder**), indica que la aplicación se registró sola en B1 y confirma que lo devolverá a **claude.ai**. Haga clic en **Allow**.

Volverá a Claude y B1 aparecerá como conectado.

### Paso 4: Pregúntele algo {#step-4--ask-it-something}

Inicie un **chat nuevo** e intente con:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"Enumere nuestros grupos activos."*
- *"Resuma las donaciones de este mes por fondo."*
- *"¿Quién se unió a la iglesia en los últimos 30 días?"*

La primera vez, Claude le pedirá permiso para usar B1: haga clic en **Allow**.

## Opción 2: Extensión de escritorio con una clave de B1 {#option-2--desktop-extension-with-a-b1-key}

Use esta opción si prefiere darle a Claude una clave con permisos limitados (por ejemplo, solo de lectura). Funciona en la aplicación de escritorio de Claude para Mac o Windows, y necesita permiso para administrar la configuración de la iglesia en B1 para crear una clave.

### Paso 1: Obtenga la aplicación de Claude {#step-1--get-the-claude-app}

Descargue la aplicación de Claude desde [claude.com/download](https://claude.com/download), instálela, ábrala e inicie sesión.

### Paso 2: Cree su clave de B1 {#step-2--make-your-b1-key}

La clave es lo que permite a Claude entrar en el B1 de *su* iglesia; piénsela como una contraseña exclusiva para Claude.

1. Inicie sesión en [B1 Admin](https://admin.b1.church) y vaya a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **API Keys**, haga clic en **New API Key**.
3. **Name:** escriba `Claude`.
4. **Scopes:** marque lo que Claude puede hacer. La mayoría de las áreas tienen una casilla **read** (solo consulta) y una casilla **write** (hacer cambios); los formularios solo tienen **forms:write**. ¿No está seguro? Para empezar, marque solo las casillas **read**: más adelante puede crear una nueva clave con más permisos.
5. Haga clic en **Save** y luego en **Copy** para copiar la clave. Solo se muestra una vez, así que pase directamente al Paso 3.

### Paso 3: Agregue B1 a Claude {#step-3--add-b1-to-claude}

1. [Descargue la extensión de B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Haga doble clic** en el archivo descargado (`b1-churchapps.mcpb`). Claude se abrirá y mostrará **B1 (ChurchApps)**.
3. Haga clic en **Install**.
4. Cuando pida su **clave de API de B1**, pegue la clave del Paso 2 y guárdela.
5. **Cierre Claude por completo** (Mac: **Cmd+Q** · Windows: haga clic derecho en el icono de Claude en la barra de tareas → **Quit**) y vuelva a abrirlo.

Si al hacer doble clic no se abre Claude, vaya a **Settings → Extensions → Advanced settings → Install Extension…** en Claude y elija el archivo descargado. Después, inicie un chat nuevo y pregúntele algo.

:::tip ¿Ya instaló la extensión?
No hay nada que hacer: FreePlay funciona a través de la misma conexión. La única excepción es la versión 1.1.0, que pedía un correo electrónico y una contraseña de B1: descargue e instale la extensión nuevamente para actualizarla. Su clave se conserva.
:::

## ¿Es seguro? {#is-it-safe}

- Claude solo puede ver los datos **de su iglesia**.
- **Con inicio de sesión (Opción 1):** Claude nunca puede hacer más de lo que puede hacer su propio inicio de sesión de B1. La página de inicio de sesión de B1 muestra lo que Claude solicita antes de que haga clic en **Allow**.
- **Con una clave (Opción 2):** Claude solo puede hacer lo que permita la clave en B1; una clave con solo las casillas **read** marcadas puede consultar, pero nunca cambiar nada. FreePlay funciona de la misma manera, con la misma clave.
- **Para desactivarlo:** en B1 Admin vaya a **Settings → Developer** y revoque la aplicación en **Connected Apps** (Opción 1) o elimine la clave en **API Keys** (Opción 2). El acceso se detiene de inmediato. También puede hacer clic en **Disconnect** en el conector de B1 dentro de Claude.

## ¿Cuánto cuesta? {#what-does-it-cost}

La conexión con B1 es gratuita: forma parte de ChurchApps. Claude tiene un plan gratuito; Claude Pro (unos $20 al mes) le permite usarlo mucho más. Consulte [claude.com/pricing](https://claude.com/pricing).

## Detalles técnicos {#technical-details}

El resto de esta página es para usuarios técnicos y asistentes de IA: permisos, otras formas de conectarse y cómo funciona.

### Permisos (scopes) {#scopes}

Claude se comunica con B1 a través del **servidor de Model Context Protocol (MCP)** integrado en la API de B1 (`https://api.churchapps.org/mcp`). Cada llamada pasa por las mismas reglas de autenticación, permisos y alcance por iglesia que una solicitud desde B1 Admin. Claude está limitado a los **permisos y scopes** de la clave de API y no puede acceder a los webhooks de los proveedores de pagos, a los endpoints de administración de clientes OAuth, ni a los endpoints de inicio de sesión y contraseña.

Conjuntos de permisos iniciales comunes:

- **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lectura + agregar notas / tareas:** agregue `people:write`
- **Asistente operativo completo:** agregue los scopes `:write` correspondientes que desee

Una clave con `donations:read` permite a Claude resumir las donaciones, pero no puede registrar un donativo. Una clave con `people:write` puede agregar una persona, pero no puede ver las donaciones. Consulte [Claves de API](/docs/developer/api/api-keys) para saber qué permite cada scope.

### Otras formas de conectarse {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

En una terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. En cualquier sesión de Claude Code, escriba `/mcp` para confirmar que el servidor `b1` está conectado, y luego hágale cualquier pregunta sobre su iglesia.

#### Claude Desktop: configuración manual (avanzado) {#claude-desktop--manual-config-advanced}

Si prefiere no usar la extensión, edite el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agregue una entrada de servidor `b1` que se conecte con B1 a través de `mcp-remote` (requiere [Node.js](https://nodejs.org)):

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

Reinicie Claude Desktop. El menú de conectores del cuadro de chat mostrará `b1` con sus herramientas.

#### Claude.ai (web): conector personalizado {#claudeai-web--custom-connector}

Consulte la **Opción 1** más arriba. El conector usa OAuth 2.1: Claude descubre el servidor de autorización de B1 a partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registra a sí mismo con Dynamic Client Registration e inicia sesión con PKCE. En los planes Team y Enterprise, es posible que un propietario primero tenga que agregar el conector para la organización. Claude no solicita scopes específicos, por lo que la página de consentimiento ofrece todo lo que puede acceder la cuenta de B1 con la que se inició sesión. Revóquelo en **Settings → Developer → Connected Apps** en B1 Admin.

### Cómo funciona {#how-it-works}

La API de B1 expone un único endpoint MCP en `/mcp`. Claude se conecta a él, se autentica con su clave `cak_…` y obtiene acceso a cuatro herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Enumera los endpoints REST que Claude puede llamar, filtrables por ruta. Se usa para descubrirlos. |
| `describe_endpoint` | Devuelve un resumen breve y un ejemplo de solicitud y respuesta para un endpoint específico. |
| `api_call` | Invoca realmente un endpoint REST como el usuario autenticado. |
| `describe_page_builder` | Una guía para crear y editar las páginas del sitio web de su iglesia, que Claude lee antes de trabajar con el contenido del sitio. |

Es la misma superficie de `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. que usa B1 Admin: se aplica exactamente la misma regla de autorización. Los endpoints de FreePlay (lessons.church) aparecen en `/lessons/*`; las llamadas de Claude a ellos se reenvían a FreePlay como el mismo usuario, con los mismos permisos.

### Seguridad y límites {#safety-and-limits}

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. Claude no tiene forma de ver los datos de otras iglesias.
- **Limitado por permisos.** Si quita un permiso a la persona que creó la clave en B1 Admin, Claude lo pierde en la siguiente llamada, de inmediato.
- **Revocable.** Elimine la clave en **Settings → Developer → API Keys** y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los endpoints de webhooks de proveedores de pagos, los endpoints de administración de clientes OAuth y los endpoints de inicio de sesión, registro, contraseña y autenticación de dos factores no se pueden llamar mediante MCP.
- **Límite de tamaño de respuesta.** Una sola respuesta de herramienta se limita a 64 KB para que las listas largas no saturen el contexto de Claude; cuando esto ocurre, Claude reduce la consulta con filtros.
- **Registro de auditoría.** Las modificaciones pasan por el mismo registro de auditoría que las acciones de B1 Admin; puede revisarlas en **Settings → Audit Log**.

### Solución de problemas {#troubleshooting}

**Claude pide un correo electrónico y una contraseña de B1 para usar FreePlay:** tiene la versión 1.1.0 de la extensión de escritorio. Descárguela e instálela de nuevo para actualizarla; las versiones nuevas solo usan su clave.

**Claude informa "Unauthorized" o 401:** falta el token de portador, tiene un formato incorrecto o la clave fue revocada. Si usó la extensión, abra **Settings → Extensions → B1 (ChurchApps)** en Claude y pegue la clave de nuevo. De lo contrario, revise el encabezado `Authorization: Bearer cak_…` (fíjese en el espacio y en la palabra `Bearer` tal cual).

**Una llamada a herramienta devuelve 403:** la clave de API no tiene el scope para ese endpoint. Agregue el scope en **Settings → Developer → API Keys** (deberá crear una clave nueva, porque los scopes no se pueden cambiar en una clave existente) y pegue la nueva clave en la configuración de la extensión o en la configuración de Claude.

**Claude no encuentra un endpoint:** pídale que llame a `list_endpoints` con un filtro, por ejemplo: *"usa list_endpoints con el filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera a partir de la API en vivo, así que todo lo que pueda consultarse con `curl` está incluido.

**Desarrollo local:** cambie `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp`: la misma autenticación y las mismas herramientas.

## Relacionados {#related}

- [Claves de API](/docs/developer/api/api-keys): referencia completa de scopes
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt.md): la misma idea, para los modelos de OpenAI
