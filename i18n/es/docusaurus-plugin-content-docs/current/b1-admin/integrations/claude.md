---
title: "Claude"
description: "Conecta B1 Admin a Claude para preguntar sobre asistencia, donaciones y grupos en lenguaje natural, con inicio de sesión o una clave de permisos limitados."
---

# Claude

<div class="article-intro">

Pregunte a Claude sobre su iglesia en lenguaje sencillo y responderá con base en sus datos de B1, incluidas sus lecciones de FreePlay y sus salones. Preguntas como *"¿cuántos visitantes nuevos vinieron el domingo?"* o *"¿quién se unió a un grupo pequeño este mes?"*, o pídale que haga cosas, como *"agrega una página nueva a nuestro sitio web llamada Eventos"*. La configuración toma menos de 3 minutos y no necesita conocimientos técnicos ni instalar software.

</div>

<div class="prereqs">
<h4>Lo que necesita</h4>

- **Una cuenta de Claude.** El **plan gratuito funciona**; es una buena forma de probarlo. Sin embargo, las cuentas gratuitas tienen un límite diario de mensajes, y consultar datos en B1 gasta mensajes rápidamente, así que si lo usa con regularidad le recomendamos **Claude Pro** (unos 20 dólares al mes).
- **Su inicio de sesión de B1**: el mismo que usa para B1 Admin.

</div>

:::tip Recomendado: se puede probar gratis
Claude es la forma más sencilla de conectar B1 con la IA, y funciona con el **plan gratuito** de Claude, una forma perfecta de que su iglesia lo pruebe antes de pagar por algo.
:::

Hay dos formas de conectarlo. La **Opción 1 es la más sencilla**: no necesita clave ni instalar nada.

## Opción 1: iniciar sesión con B1 (lo más sencillo)

Funciona en el sitio web de Claude, en la aplicación de escritorio de Claude y en la aplicación de Claude para teléfono. Configúrelo una vez y estará disponible en todos.

### Paso 1: abrir la configuración de conectores de Claude

1. Vaya a [claude.ai](https://claude.ai) e inicie sesión (o cree una cuenta gratuita).
2. Haga clic en su nombre en la esquina inferior izquierda y luego en **Configuración** → **Conectores**.

### Paso 2: agregar B1

1. Haga clic en **Agregar** y luego en **Agregar conector personalizado**.
2. **Nombre:** escriba `B1`.
3. **URL:** pegue `https://api.churchapps.org/mcp`
4. Deje las demás opciones como están y haga clic en **Agregar**.

### Paso 3: iniciar sesión en B1

1. Haga clic en **Conectar**. Se abre una página de inicio de sesión de B1.
2. Inicie sesión con su cuenta de B1. Si pertenece a más de una iglesia, verifique que aparezca la correcta en la parte superior.
3. B1 muestra lo que Claude solicita hacer y confirma que volverá a **claude.ai**. Haga clic en **Permitir**.

Volverá a Claude, y B1 aparecerá como conectado.

### Paso 4: hágale una pregunta

Inicie un **chat nuevo** y pruebe con:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"Enumera nuestros grupos activos."*
- *"Resume las donaciones de este mes por fondo."*
- *"¿Quién se unió a la iglesia en los últimos 30 días?"*

La primera vez, Claude pedirá permiso para usar B1. Haga clic en **Permitir**.

## Opción 2: extensión de escritorio con una clave de B1

Use esta opción si prefiere darle a Claude una clave con permisos limitados (por ejemplo, solo de consulta). Funciona en la aplicación de escritorio de Claude para Mac o Windows, y necesita permiso para administrar la configuración de la iglesia en B1 para crear una clave.

### Paso 1: obtener la aplicación de Claude

Descargue la aplicación de Claude desde [claude.com/download](https://claude.com/download), instálela, ábrala e inicie sesión.

### Paso 2: crear su clave de B1

La clave es lo que permite a Claude entrar al B1 de *su* iglesia. Piénsela como una contraseña exclusiva para Claude.

1. Inicie sesión en [B1 Admin](https://admin.b1.church) y vaya a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **Claves de API**, haga clic en **Nueva clave de API**.
3. **Nombre:** escriba `Claude`.
4. **Ámbitos:** marque lo que Claude puede hacer. Cada área tiene una casilla de **lectura** (solo consulta) y una casilla de **escritura** (hacer cambios). ¿No está seguro? Marque solo las casillas de **lectura** para empezar; más adelante puede crear una nueva clave con más permisos.
5. Haga clic en **Guardar** y luego en **Copiar** la clave. Solo se muestra una vez, así que pase directamente al Paso 3.

### Paso 3: agregar B1 a Claude

1. [Descargue la extensión de B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. Haga **doble clic** en el archivo descargado (`b1-churchapps.mcpb`). Claude se abre y muestra **B1 (ChurchApps)**.
3. Haga clic en **Instalar**.
4. Cuando le pida su **clave de API de B1**, pegue la clave del Paso 2 y guarde.
5. **Cierre Claude por completo** (Mac: **Cmd+Q** · Windows: haga clic derecho en el ícono de Claude en la barra de tareas → **Salir**) y ábralo de nuevo.

Si al hacer doble clic no se abre Claude, vaya en Claude a **Configuración → Extensiones → Configuración avanzada → Instalar extensión…** y elija el archivo descargado. Después inicie un chat nuevo y hágale una pregunta.

:::tip ¿Ya instaló la extensión?
No hay nada que hacer: FreePlay funciona con la misma conexión. La única excepción es la versión 1.1.0, que pedía un correo electrónico y una contraseña de B1: descargue e instale la extensión de nuevo para actualizarla. Su clave se conserva.
:::

## ¿Es seguro?

- Claude solo puede ver los datos **de su iglesia**.
- **Con inicio de sesión (Opción 1):** Claude nunca puede hacer más de lo que puede hacer su propio inicio de sesión de B1. La página de inicio de sesión de B1 enumera todo lo que Claude puede hacer antes de que haga clic en **Permitir**.
- **Con clave (Opción 2):** Claude solo puede hacer lo que permite la clave en B1. Una clave con solo casillas de **lectura** marcadas puede consultar, pero nunca cambiar nada. FreePlay funciona igual, con la misma clave.
- **Para desactivarlo:** en B1 Admin vaya a **Configuración → Desarrollador** y revoque la aplicación en **Aplicaciones conectadas** (Opción 1) o elimine la clave en **Claves de API** (Opción 2). El acceso se detiene de inmediato. También puede hacer clic en **Desconectar** en el conector de B1 dentro de Claude.

## ¿Cuánto cuesta?

La conexión con B1 es gratuita; forma parte de ChurchApps. Claude tiene un plan gratuito; Claude Pro (unos 20 dólares al mes) le da mucho más uso. Consulte [claude.com/pricing](https://claude.com/pricing).

## Detalles técnicos

El resto de esta página es para usuarios técnicos y asistentes de IA: ámbitos, otras formas de conectarse y cómo funciona.

### Ámbitos {#scopes}

Claude se comunica con B1 a través del **servidor del Protocolo de contexto de modelos (MCP)** integrado en la API de B1 (`https://api.churchapps.org/mcp`). Cada llamada pasa por las mismas reglas de autenticación, permisos y alcance por iglesia que una solicitud desde B1 Admin. Claude está limitado a los **permisos y ámbitos** de la clave de API, y no puede acceder a webhooks, a los endpoints administrativos de OAuth ni a otras rutas exclusivas del operador.

Conjuntos de ámbitos iniciales comunes:

- **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lectura + agregar notas / tareas:** agregue `people:write`
- **Asistente operativo completo:** agregue los ámbitos `:write` correspondientes que desee

Una clave con `donations:read` permite que Claude resuma las donaciones, pero no puede registrar un donativo. Una clave con `people:write` puede agregar una persona, pero no puede ver las donaciones. Consulte [Claves de API](/docs/developer/api/api-keys) para saber qué permite cada ámbito.

### Otras formas de conectarse

#### Claude Code (CLI)

En una terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. En cualquier sesión de Claude Code, escriba `/mcp` para confirmar que el servidor `b1` está conectado, y luego haga cualquier pregunta sobre su iglesia.

#### Claude Desktop: configuración manual (avanzado)

Si prefiere no usar la extensión, edite el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agregue una entrada de servidor `b1` que se conecte con B1 mediante `mcp-remote` (requiere [Node.js](https://nodejs.org)):

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

Reinicie Claude Desktop. El menú de conectores en el campo de escritura del chat mostrará `b1` con sus herramientas.

#### Claude.ai (web): conector personalizado

Consulte la **Opción 1** de arriba. El conector usa OAuth 2.1: Claude descubre el servidor de autorización de B1 a partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registra con el registro dinámico de clientes e inicia sesión con PKCE. En los planes Team y Enterprise, un propietario puede necesitar agregar primero el conector para la organización. Claude no solicita ámbitos específicos, así que la página de consentimiento ofrece todo lo que la cuenta de B1 con sesión iniciada puede acceder. Puede revocarlo en **Configuración → Desarrollador → Aplicaciones conectadas** en B1 Admin.

### Cómo funciona

La API de B1 expone un único endpoint MCP en `/mcp`. Claude se conecta a él, se autentica con su clave `cak_…` y obtiene acceso a cuatro herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Enumera los endpoints REST que Claude puede llamar, filtrables por ruta. Se usa para descubrirlos. |
| `describe_endpoint` | Devuelve un resumen breve y un ejemplo de solicitud y respuesta para un endpoint específico. |
| `api_call` | Invoca realmente un endpoint REST como el usuario autenticado. |
| `describe_page_builder` | Una guía para crear y editar las páginas del sitio web de su iglesia, que Claude lee antes de trabajar con contenido del sitio. |

Es la misma superficie `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. que usa B1 Admin; todas las reglas de autorización se aplican de forma idéntica. Los endpoints de FreePlay (lessons.church) aparecen bajo `/lessons/*`; las llamadas de Claude a ellos se reenvían a FreePlay como el mismo usuario, con los mismos permisos.

### Seguridad y límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. Claude no puede ver los datos de otras iglesias.
- **Limitado por permisos.** Si quita un permiso a la persona que generó la clave en B1Admin, Claude lo pierde en la siguiente llamada, de inmediato.
- **Revocable.** Elimine la clave en **Configuración → Desarrollador → Claves de API** y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los webhooks de proveedores, los endpoints de administración de clientes OAuth y la ruta exclusiva del operador `apiEmails` no se pueden llamar mediante MCP.
- **Límite de tamaño de respuesta.** Una sola respuesta de herramienta se limita a 64 KB para que las listas largas no saturen el contexto de Claude; cuando esto ocurre, Claude reduce la consulta con filtros.
- **Registro de auditoría.** Las modificaciones pasan por el mismo registro de auditoría que las acciones de B1Admin; puede revisarlas en **Configuración → Registro de auditoría**.

### Solución de problemas

**Claude pide un correo electrónico y una contraseña de B1 para usar FreePlay:** tiene la versión 1.1.0 de la extensión de escritorio. Descárguela e instálela de nuevo para actualizar; las versiones nuevas solo usan su clave.

**Claude informa "Unauthorized" o 401:** falta el token de portador, está mal formado o la clave fue revocada. Si usó la extensión, abra **Configuración → Extensiones → B1 (ChurchApps)** en Claude y pegue la clave de nuevo. De lo contrario, revise el encabezado `Authorization: Bearer cak_…` (fíjese en el espacio y en la palabra literal `Bearer`).

**Una llamada a una herramienta devuelve 403:** la clave de API no tiene el ámbito para ese endpoint. Agregue el ámbito en **Configuración → Desarrollador → Claves de API** (tendrá que crear una clave nueva, porque los ámbitos no se pueden cambiar en la clave existente) y pegue la nueva clave en la configuración de la extensión o en la configuración de Claude.

**Claude no encuentra un endpoint:** pídale que llame a `list_endpoints` con un filtro, por ejemplo: *"usa list_endpoints con el filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera a partir de la API en vivo, así que todo lo que pueda consultar con `curl` está disponible.

**Desarrollo local:** cambie `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp`; la autenticación y las herramientas son las mismas.

## Relacionado

- [Claves de API](/docs/developer/api/api-keys): referencia completa de ámbitos
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt.md): la misma idea, para los modelos de OpenAI
