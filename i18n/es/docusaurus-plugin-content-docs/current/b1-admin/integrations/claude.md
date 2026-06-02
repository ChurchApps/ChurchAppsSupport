---
title: "Claude"
---

# Claude

<div class="article-intro">

Conecta Claude de Anthropic a los datos de B1 de tu iglesia. Con una clave de API y algunos minutos de configuración, puedes hacer preguntas a Claude como "¿cuántos visitantes por primera vez vinieron el domingo?" o "redacta un correo de agradecimiento a las personas que donaron al fondo de construcción este mes" — y Claude leerá las respuestas directamente de los registros de tu iglesia, limitado a tus permisos.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un administrador de iglesia con el permiso **Editar Configuración** (para crear una clave de API)
- Uno de: **Claude Code** (CLI / extensión IDE), **Claude Desktop** (Mac/Windows), o una cuenta **Claude Pro/Max/Team**
- La URL completa de tu API B1 — normalmente `https://api.churchapps.org` para iglesias alojadas, o tu host de Api auto-alojado

</div>

## Qué Puede Ver Claude

Claude se comunica con B1 a través del **servidor Model Context Protocol (MCP)** integrado en la API B1. Cada llamada que hace Claude se ejecuta a través de las mismas reglas de autenticación, permiso y delimitación de iglesia que una solicitud de B1Admin — lo que significa que Claude:

- Solo ve datos de **tu** iglesia
- Se limita a los **permisos y alcances** que tenga la clave de API que le proporciones
- No puede acceder a webhooks, puntos finales de administración de OAuth u otras rutas solo para operadores (esos están bloqueados)

Una clave `donations:read` permite a Claude resumir donaciones pero no registrar un regalo. Una clave `people:write` puede agregar una persona pero no ver donaciones. Elige los alcances que coincidan con el trabajo.

## Configuración

### 1. Crear una clave de API

1. En B1Admin ve a **Configuración → Desarrollador → Claves de API**.
2. Haz clic en **Nueva Clave de API**, nómbrala `Claude`, y selecciona los alcances que Claude debería tener. Conjuntos de inicio comunes:
   - **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lectura + agregar notas / tareas:** agrega `people:write`
   - **Asistente operativo completo:** agrega los alcances `:write` correspondientes que desees
3. Guarda. La clave completa `cak_…` se muestra **una vez** — cópiala.

Consulta [Claves de API](/docs/developer/api/api-keys) para ver qué permite cada alcance.

### 2. Conectar Claude

Elige el cliente Claude que uses:

#### Claude Code (CLI)

En una terminal:

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Eso es todo. Dentro de cualquier sesión de Claude Code, escribe `/mcp` para confirmar que el servidor `b1` está conectado, luego haz cualquier pregunta a Claude sobre tu iglesia.

#### Claude Desktop

Edita el archivo de configuración de Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Agrega una entrada del servidor `b1`. Las versiones más nuevas de Claude Desktop hablan HTTP MCP de forma nativa:

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

Si tu versión de Claude Desktop solo soporta servidores stdio, puente a través de `mcp-remote`:

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

Reinicia Claude Desktop. El icono del conector en el compositor de chat mostrará `b1` con tres herramientas (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Conector Personalizado

La función "Agregar conector personalizado" de Claude.ai requiere OAuth, que el servidor MCP de B1 no soporta hoy. Usa Claude Code o Claude Desktop en su lugar.

### 3. Pregúntale a Claude algo

Una vez conectado, no se necesita sintaxis especial — Claude descubre lo que está disponible sobre la marcha. Ejemplos:

- *"¿Cuántas personas hay en mi iglesia y cuáles son los grupos activos?"*
- *"Resume las donaciones de este mes por fondo."*
- *"Enumera a las personas que asistieron al servicio de las 10am el domingo pasado pero no han asistido a un grupo del miércoles en los últimos 60 días."*
- *"Redacta un correo de bienvenida para las cuatro personas agregadas esta semana, dirigidas por nombre."*

Detrás de escenas Claude llamará a las herramientas MCP — primero para descubrir el punto final correcto, luego para obtener los datos — y responderá en lenguaje natural.

## Cómo Funciona

La API B1 expone un único punto final MCP en `/mcp`. Claude se conecta a él, se autentica con tu clave `cak_…`, y obtiene acceso a tres herramientas:

| Herramienta | Qué hace |
|---|---|
| `list_endpoints` | Lista los puntos finales REST que Claude puede llamar, filtrables por ruta. Se usa para descubrimiento. |
| `describe_endpoint` | Devuelve un resumen breve y una solicitud/respuesta de ejemplo para un punto final específico. |
| `api_call` | En realidad invoca un punto final REST como el usuario autenticado. |

Esta es la misma superficie `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que usa tu B1Admin — cada regla de autorización se aplica idénticamente.

## Seguridad y Límites

- **Aislamiento por iglesia.** La clave de API se resuelve a una iglesia. Claude no tiene forma de ver datos de otras iglesias.
- **Limitado por permisos.** Si quitas un permiso de la persona que creó la clave en B1Admin, Claude lo pierde en la siguiente llamada — al instante.
- **Revocable.** Elimina la clave en **Configuración → Desarrollador → Claves de API** y el acceso de Claude termina de inmediato.
- **Lista de bloqueo.** Los webhooks del proveedor, puntos finales de administración del cliente OAuth, y la ruta `apiEmails` solo para operadores no se pueden llamar a través de MCP.
- **Límite de tamaño de respuesta.** Una respuesta de herramienta única está limitada a 64 KB para que las listas largas no consuman el contexto de Claude — Claude estrechará la consulta con filtros cuando esto suceda.
- **Registro de auditoría.** Las mutaciones se registran en el mismo registro de auditoría que las acciones de B1Admin; puedes revisar bajo **Reportes → Registro de Auditoría**.

## Costo

ChurchApps es gratis y de código abierto — el servidor MCP es parte de la API que tu iglesia ya ejecuta. Anthropic cobra por el uso de Claude según sus planes. No hay costo por llamada desde ChurchApps.

## Solución de Problemas

**Claude reporta "No autorizado" o 401:** el token portador falta, tiene formato incorrecto, o la clave ha sido revocada. Verifica nuevamente el encabezado `Authorization: Bearer cak_…` (nota el espacio y el `Bearer` literal).

**Una llamada de herramienta devuelve 403:** la clave de API no tiene el alcance para ese punto final. Agrega el alcance en **Configuración → Desarrollador → Claves de API** (necesitarás crear una clave nueva — los alcances no se pueden cambiar en su lugar) y actualiza la configuración de Claude.

**Claude no puede encontrar un punto final:** pídele que llame a `list_endpoints` con un filtro, p. ej. *"usa list_endpoints con filtro 'donations' para encontrar la ruta correcta"*. El inventario de rutas se genera desde la API en vivo, así que cualquier cosa que puedas golpear con `curl` está allí.

**Desarrollo local:** cambia `https://api.churchapps.org/mcp` por `http://localhost:8084/mcp` — misma autenticación, mismas herramientas.

## Relacionado

- [Claves de API](/docs/developer/api/api-keys) — referencia completa de alcances
- [Servidor MCP (referencia de desarrollador)](/docs/developer/api/mcp) — detalles del protocolo y esquemas de herramientas
- [ChatGPT](./chatgpt) — misma idea, para modelos de OpenAI
