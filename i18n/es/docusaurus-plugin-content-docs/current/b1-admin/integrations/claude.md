---
title: "Claude"
---

# Claude

<div class="article-intro">

Pregúntele a Claude sobre su iglesia en lenguaje sencillo y responderá con los datos de B1, incluidas sus lecciones de FreePlay y sus salones. Preguntas como *"¿cuántas personas nuevas vinieron el domingo?"* o *"¿quién se unió a un grupo pequeño este mes?"*, o pídale que haga cosas, como *"agregue una página nueva a nuestro sitio web llamada Eventos"*. La configuración toma menos de 3 minutos y no necesita conocimientos técnicos ni instalar software.

</div>

<div class="prereqs">
<h4>Lo que necesita</h4>

- **Una cuenta de Claude.** El **plan gratuito funciona**: una buena forma de probarlo. Sin embargo, las cuentas gratuitas tienen un límite diario de mensajes, y consultar información en B1 consume mensajes rápidamente, así que si lo usa con regularidad le recomendamos **Claude Pro** (aproximadamente $20 al mes).
- **Su inicio de sesión de B1.** El mismo que usa para B1 Admin.

</div>

:::tip Recomendado: prueba gratuita
Claude es la forma más fácil de conectar B1 con la IA, y funciona con el **plan gratuito** de Claude: una forma perfecta de que su iglesia lo pruebe antes de pagar por algo.
:::

Hay dos formas de conectarse. **La opción 1 es la más fácil**: sin clave y sin instalar nada.

## Opción 1: Inicie sesión con B1 (lo más fácil)

Funciona en el sitio web de Claude, en la aplicación de escritorio de Claude y en la aplicación de teléfono de Claude: configúrelo una vez y estará disponible en todas.

### Paso 1: Abra la configuración de conectores de Claude

1. Vaya a [claude.ai](https://claude.ai) e inicie sesión (o cree una cuenta gratuita).
2. Haga clic en su nombre en la esquina inferior izquierda y luego en **Configuración** → **Conectores**.

### Paso 2: Agregue B1

1. Haga clic en **Agregar** y luego en **Agregar conector personalizado**.
2. **Nombre:** escriba `B1`.
3. **URL:** pegue `https://api.churchapps.org/mcp`
4. Deje las demás opciones como están y haga clic en **Agregar**.

### Paso 3: Inicie sesión en B1

1. Haga clic en **Conectar**. Se abre una página de inicio de sesión de B1.
2. Inicie sesión con su cuenta de B1. Si pertenece a más de una iglesia, verifique que aparezca la correcta en la parte superior.
3. B1 muestra lo que Claude está pidiendo hacer y confirma que lo devolverá a **claude.ai**. Haga clic en **Permitir**.

Regresará a Claude y B1 aparecerá como conectado.

### Paso 4: Pregúntele algo

Inicie un **chat nuevo** y pruebe con:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"Enumere nuestros grupos activos."*
- *"Resuma las donaciones de este mes por fondo."*
- *"¿Quién se unió a la iglesia en los últimos 30 días?"*

La primera vez, Claude le pedirá permiso para usar B1: haga clic en **Permitir**.

## Opción 2: Extensión de escritorio con una clave de B1

Use esta opción si prefiere darle a Claude una clave con permisos limitados (por ejemplo, solo de consulta). Funciona en la aplicación de escritorio de Claude para Mac o Windows, y necesita permiso para administrar la configuración de la iglesia en B1 para crear una clave.

### Paso 1: Obtenga la aplicación de Claude

Descargue la aplicación de Claude desde [claude.com/download](https://claude.com/download), instálela, ábrala e inicie sesión.

### Paso 2: Cree su clave de B1

La clave es lo que permite a Claude entrar al B1 de *su* iglesia: piénsela como una contraseña solo para Claude.

1. Inicie sesión en [B1 Admin](https://admin.b1.church) y vaya a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **Claves de API**, haga clic en **Nueva clave de API**.
3. **Nombre:** escriba `Claude`.
4. **Alcances:** marque lo que Claude puede hacer. Cada área tiene una casilla de **lectura** (solo consulta) y una casilla de **escritura** (hacer cambios). ¿No está seguro? Marque solo las casillas de **lectura** para empezar: puede crear una clave nueva con más permisos después.
5. Haga clic en **Guardar** y luego en **Copiar** la clave. Solo se muestra una vez, así que vaya directo al Paso 3.

### Paso 3: Agregue B1 a Claude

1. [Descargue la extensión de B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Haga doble clic** en el archivo descargado (`b1-churchapps.mcpb`). Claude se abre y muestra **B1 (ChurchApps)**.
3. Haga clic en **Instalar**.
4. Cuando pida su **clave de API de B1**, pegue la clave del Paso 2 y guárdela.
5. **Cierre Claude por completo** (Mac: **Cmd+Q** · Windows: haga clic derecho en el icono de Claude en la barra de tareas → **Salir**) y vuelva a abrirlo.

Si hacer doble clic no abre Claude, vaya a **Configuración → Extensiones → Configuración avanzada → Instalar extensión…** en Claude y elija el archivo descargado. Luego inicie un chat nuevo y pregúntele algo.

:::tip ¿Ya instaló la extensión?
No hay nada que hacer: FreePlay funciona con la misma conexión. La única excepción es la versión 1.1.0, que pedía un correo electrónico y una contraseña de B1: descargue e instale la extensión de nuevo para actualizarla. Su clave se conserva.
:::

## ¿Es seguro?

- Claude solo puede ver los datos **de su iglesia**.
- **Con inicio de sesión (opción 1):** Claude nunca puede hacer más de lo que puede hacer su propio inicio de sesión de B1. La página de inicio de sesión de B1 enumera todo lo que Claude puede hacer antes de que haga clic en **Permitir**.
- **Con una clave (opción 2):** Claude solo puede hacer lo que la clave permite en B1. Una clave con solo casillas de **lectura** marcadas puede consultar, pero nunca cambiar nada. FreePlay funciona igual, con la misma clave.
- **Para desactivarlo:** en B1 Admin vaya a **Configuración → Desarrollador** y revoque la aplicación en **Aplicaciones conectadas** (opción 1), o elimine la clave en **Claves de API** (opción 2). El acceso se detiene de inmediato. También puede hacer clic en **Desconectar** en el conector de B1 en Claude.

## ¿Cuánto cuesta?

La conexión con B1 es gratuita: es parte de ChurchApps. Claude en sí tiene un plan gratuito; Claude Pro (aproximadamente $20 al mes) ofrece mucho más uso. Consulte [claude.com/pricing](https://claude.com/pricing).

## Detalles técnicos

El resto de esta página es para usuarios técnicos y asistentes de IA: alcances, otras formas de conectarse y cómo funciona.

### Alcances

Claude se comunica con B1 a través del **servidor de Model Context Protocol (MCP)** integrado en la API de B1 (`https://api.churchapps.org/mcp`). Cada llamada pasa por las mismas reglas de autenticación, permisos y límites por iglesia que una solicitud desde B1 Admin. Claude está limitado a los **permisos y alcances** de la clave de API, y no puede acceder a webhooks, endpoints de administración OAuth ni otras rutas exclusivas del operador.

Conjuntos de alcances iniciales comunes:

- **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lectura + agregar notas / tareas:** agregue `people:write`
- **Asistente operativo completo:** agregue los alcances `:write` correspondientes que desee

Una clave con `donations:read` permite a Claude resumir donaciones, pero no puede registrar una donación. Una clave con `people:write` puede agregar una persona, pero no puede ver donaciones. Consulte [Claves de API](/docs/developer/api/api-keys) para saber qué permite cada alcance.

### Otras formas de conectarse

#### Claude Code (CLI)

En una terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. Dentro de cualquier sesión de Claude Code, escriba `/mcp` para confirmar que el servidor `b1` está conectado, y luego pregunte a Claude cualquier cosa sobre su iglesia.

#### Claude Desktop: configuración manual (avanzada)

Si prefiere no usar la extensión, edite el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agregue una entrada de servidor `b1` que se conecte a B1 mediante `mcp-remote` (requiere [Node.js](https://nodejs.org)):

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

Reinicie Claude Desktop. El menú de conectores en el área de chat mostrará `b1` con sus herramientas.

#### Claude.ai (web): conector personalizado

Consulte la **Opción 1** arriba. El conector usa OAuth 2.1: Claude descubre el servidor de autorización de B1 desde `https://api.churchapps.org/.well-known/oauth-protected-resource`, se registra a sí mismo con Dynamic Client Registration e inicia sesión con PKCE. En los planes Team y Enterprise, un propietario puede necesitar agregar primero el conector para la organización. Claude no solicita alcances específicos, así que la página de consentimiento ofrece todo lo que la cuenta de B1 con sesión iniciada puede acceder. Revóquelo en **Configuración → Desarrollador → Aplicaciones conectadas** en B1 Admin.

### Cómo funciona

La API de B1 expone un solo endpoint MCP en `/mcp`. Claude se conecta a él, se autentica con su clave `cak_…` y obtiene acceso a cuatro herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Enumera los endpoints REST que Claude puede llamar, filtrables por ruta. Se usa para descubrimiento. |
| `describe_endpoint` | Devuelve un resumen breve y un ejemplo de solicitud y respuesta para un endpoint específico. |
| `api_call` | Invoca realmente un endpoint REST como el usuario autenticado. |
| `describe_page_builder` | Una guía para crear y editar las páginas del sitio web de su iglesia, que Claude lee antes de trabajar con contenido del sitio. |

Es la misma superficie `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. que usa B1Admin: cada regla de autorización se aplica de forma idéntica. Los endpoints de FreePlay (lessons.church) aparecen bajo `/lessons/*`; las llamadas de Claude a ellos se reenvían a FreePlay como el mismo usuario, con los mismos permisos.

### Seguridad y límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. Claude no tiene forma de ver los datos de otras iglesias.
- **Limitado por permisos.** Si quita un permiso a la persona que creó la clave en B1Admin, Claude lo pierde en la siguiente llamada, de inmediato.
- **Revocable.** Elimine la clave en **Configuración → Desarrollador → Claves de API** y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los webhooks de proveedores, los endpoints de administración de clientes OAuth y la ruta exclusiva del operador `apiEmails` no se pueden llamar mediante MCP.
- **Límite de tamaño de respuesta.** Una sola respuesta de herramienta está limitada a 64 KB para que las listas largas no saturen el contexto de Claude: Claude reducirá la consulta con filtros cuando ocurra esto.
- **Registro de auditoría.** Las modificaciones pasan por el mismo registro de auditoría que las acciones de B1Admin; puede revisarlas en **Configuración → Registro de auditoría**.

### Solución de problemas

**Claude pide un correo electrónico y una contraseña de B1 para usar FreePlay:** tiene la versión 1.1.0 de la extensión de escritorio. Descárguela e instálela de nuevo para actualizar; las versiones nuevas solo usan su clave.

**Claude reporta "Unauthorized" o 401:** falta el token de portador, tiene un formato incorrecto o la clave fue revocada. Si usó la extensión, abra **Configuración → Extensiones → B1 (ChurchApps)** en Claude y pegue la clave de nuevo. De lo contrario, revise el encabezado `Authorization: Bearer cak_…` (observe el espacio y la palabra literal `Bearer`).

**Una llamada a herramienta devuelve 403:** la clave de API no tiene el alcance para ese endpoint. Agregue el alcance en **Configuración → Desarrollador → Claves de API** (tendrá que crear una clave nueva, ya que los alcances no se pueden cambiar en su lugar) y pegue la nueva clave en la configuración de la extensión o en la configuración de Claude.

**Claude no encuentra un endpoint:** pídale que llame a `list_endpoints` con un filtro, por ejemplo, *"use list_endpoints con el filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera a partir de la API en vivo, así que todo lo que pueda consultar con `curl` está ahí.

**Desarrollo local:** cambie `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp`: misma autenticación, mismas herramientas.

## Relacionados

- [Claves de API](/docs/developer/api/api-keys): referencia completa de alcances
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt): la misma idea, para los modelos de OpenAI
