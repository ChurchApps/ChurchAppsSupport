---
title: "Claude"
---

# Claude

<div class="article-intro">

Conecta Claude de Anthropic con los datos de B1 de tu iglesia. Agrega B1 como conector personalizado en claude.ai e inicia sesión, o usa una clave de API con Claude Code o Claude Desktop. Después de unos minutos de configuración, puedes hacerle preguntas a Claude como "¿cuántos visitantes primerizos vinieron el domingo?" o "redacta un correo de agradecimiento para las personas que dieron al fondo del edificio este mes", y Claude leerá las respuestas directamente de los registros de tu iglesia, limitado a tus permisos.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de **Claude Pro/Max/Team/Enterprise** (para el conector personalizado de claude.ai), o **Claude Code** (CLI / extensión para IDE) o **Claude Desktop** (Mac/Windows)
- Para la configuración con clave de API: un administrador de la iglesia con el permiso **Edit Settings** (para crear una clave de API)
- La URL completa de tu API de B1: normalmente `https://api.churchapps.org` para iglesias alojadas, o el host de tu Api autoalojada

</div>

## Lo que Claude puede ver

Claude se comunica con B1 a través del **servidor Model Context Protocol (MCP)** integrado en la API de B1. Cada llamada que Claude hace pasa por las mismas reglas de autenticación, permisos y alcance por iglesia que una solicitud desde B1Admin, lo que significa que Claude:

- Solo ve datos de **tu** iglesia
- Está limitado a los **permisos y scopes** que tenga la clave de API o el inicio de sesión que le proporciones
- No puede acceder a webhooks, endpoints de administración de OAuth ni otras rutas exclusivas del operador (están en una lista de bloqueo)

Una clave `donations:read` permite a Claude resumir las ofrendas, pero no puede registrar una donación. Una clave `people:write` puede agregar a una persona, pero no puede ver las donaciones. Elige los scopes que correspondan al trabajo.

## Configuración

Hay dos formas de conectarse:

- **Conector personalizado de Claude.ai**: la más sencilla. Inicias sesión en B1 y apruebas el acceso en tu navegador, sin necesidad de copiar una clave. El conector también funciona en Claude Desktop y en las aplicaciones móviles de Claude una vez agregado a tu cuenta.
- **Clave de API**: para Claude Code o un archivo de configuración de Claude Desktop. Creas una clave y la pegas en la configuración de Claude.

### Claude.ai (web): conector personalizado

1. En Claude, abre **Settings → Connectors** y haz clic en **Add custom connector**. (En los planes Team y Enterprise, es posible que un propietario deba agregarlo primero para la organización.)
2. Asígnale el nombre `B1` e ingresa la URL del servidor `https://api.churchapps.org/mcp`, luego haz clic en **Add**.
3. Haz clic en **Connect**. Se abrirá una ventana de inicio de sesión de B1. Inicia sesión con tu cuenta de B1 y elige tu iglesia si se te pide.
4. La página **AUTHORIZATION REQUIRED** muestra el nombre de la aplicación, los datos que solicita (por ejemplo, **View people, households and contact details**, o **Everything your B1 account can access** si no pidió nada más restringido) y la dirección a la que serás redirigido después de elegir; verifica que sea **claude.ai**.
5. Haz clic en **Allow**. Volverás a Claude y B1 aparecerá como conectado.

Claude se registra en B1 la primera vez que te conectas, por eso la página también indica que la aplicación se registró por sí misma y que nunca puede hacer más de lo que puede hacer tu propia cuenta de B1. Para desconectarla más adelante, ve a **Settings → Developer → Connected Apps** en B1Admin y revócala.

### Usar una clave de API

#### 1. Crea una clave de API

1. En B1Admin ve a **Settings → Developer → API Keys**.
2. Haz clic en **New API Key**, ponle el nombre `Claude` y selecciona los scopes que debe tener Claude. Conjuntos iniciales comunes:
   - **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lectura + agregar notas / tareas:** agrega `people:write`
   - **Asistente operativo completo:** agrega los scopes `:write` correspondientes que quieras
3. Guarda. La clave `cak_…` completa se muestra **una vez**: cópiala.

Consulta [API Keys](/docs/developer/api/api-keys) para saber qué permite cada scope.

#### 2. Conecta Claude

Elige el cliente de Claude que utilizas:

##### Claude Code (CLI)

En una terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. Dentro de cualquier sesión de Claude Code, escribe `/mcp` para confirmar que el servidor `b1` está conectado, y luego hazle a Claude cualquier pregunta sobre tu iglesia.

##### Claude Desktop

Edita el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agrega una entrada de servidor `b1`. Las versiones más recientes de Claude Desktop admiten MCP por HTTP de forma nativa:

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Si tu versión de Claude Desktop solo admite servidores stdio, conéctalo a través de `mcp-remote`:

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

Reinicia Claude Desktop. El icono del conector en el cuadro de redacción del chat mostrará `b1` con tres herramientas (`list_endpoints`, `describe_endpoint`, `api_call`).

### Hazle una pregunta a Claude

Una vez conectado, no se necesita una sintaxis especial: Claude descubre lo que está disponible sobre la marcha. Ejemplos:

- *"¿Cuántas personas hay en mi iglesia y cuáles son los grupos activos?"*
- *"Resume las donaciones de este mes por fondo."*
- *"Enumera las personas que asistieron al servicio de las 10 am el domingo pasado pero que no han asistido a un grupo de miércoles en los últimos 60 días."*
- *"Redacta un correo de bienvenida para las cuatro personas agregadas esta semana, dirigido por nombre."*

Por detrás, Claude llamará a las herramientas MCP (primero para descubrir el endpoint correcto y luego para obtener los datos) y responderá en lenguaje sencillo.

## Cómo funciona

La API de B1 expone un único endpoint MCP en `/mcp`. Claude se conecta a él, se autentica con tu clave `cak_…` o con el inicio de sesión que aprobaste, y obtiene acceso a tres herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Lista los endpoints REST que Claude puede llamar, filtrables por ruta. Se usa para descubrimiento. |
| `describe_endpoint` | Devuelve un resumen breve y un ejemplo de solicitud y respuesta para un endpoint específico. |
| `api_call` | Invoca realmente un endpoint REST como el usuario autenticado. |

Esta es la misma superficie `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. que usa tu B1Admin; todas las reglas de autorización se aplican de forma idéntica.

## Seguridad y límites

- **Aislamiento por iglesia.** La clave de API o el inicio de sesión corresponden a una sola iglesia. Claude no tiene forma de ver los datos de otras iglesias.
- **Limitado por permisos.** Si quitas un permiso a la persona que creó la clave (o que inició sesión) en B1Admin, Claude lo pierde en la siguiente llamada, de inmediato.
- **Revocable.** Elimina la clave en **Settings → Developer → API Keys**, o revoca la conexión de claude.ai en **Settings → Developer → Connected Apps**, y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los webhooks de proveedores, los endpoints de administración de clientes OAuth y la ruta `apiEmails`, exclusiva del operador, no se pueden llamar mediante MCP.
- **Límite de tamaño de respuesta.** Una sola respuesta de herramienta se limita a 64 KB para que las listas largas no saturen el contexto de Claude; cuando esto ocurre, Claude reducirá la consulta con filtros.
- **Registro de auditoría.** Las modificaciones pasan por el mismo registro de auditoría que las acciones de B1Admin; puedes revisarlas en **Settings → Audit Log**.

## Costo

ChurchApps es gratuito y de código abierto: el servidor MCP forma parte de la API que tu iglesia ya utiliza. Anthropic cobra por el uso de Claude según sus planes. ChurchApps no cobra por llamada.

## Solución de problemas

**Claude informa "Unauthorized" o 401:** falta el token bearer, está mal formado o la clave fue revocada. Verifica el encabezado `Authorization: Bearer cak_…` (ten en cuenta el espacio y la palabra `Bearer` tal cual). En claude.ai, desconecta y vuelve a conectar el conector de B1 para iniciar sesión de nuevo.

**Una llamada a una herramienta devuelve 403:** la clave de API no tiene el scope para ese endpoint. Agrega el scope en **Settings → Developer → API Keys** (tendrás que crear una clave nueva, porque los scopes no se pueden cambiar en la misma clave) y actualiza la configuración de Claude.

**Claude no encuentra un endpoint:** pídele que llame a `list_endpoints` con un filtro, por ejemplo: *"usa list_endpoints con el filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera a partir de la API en vivo, así que todo lo que puedas consultar con `curl` está ahí.

**Desarrollo local:** cambia `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp`; la misma autenticación y las mismas herramientas.

## Relacionado

- [API Keys](/docs/developer/api/api-keys): referencia completa de scopes
- [MCP Server (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt): la misma idea, para los modelos de OpenAI
