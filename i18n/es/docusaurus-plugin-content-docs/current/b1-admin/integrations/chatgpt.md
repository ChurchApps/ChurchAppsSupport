---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecta ChatGPT de OpenAI con los datos de B1 de tu iglesia y deja que haga el trabajo pesado. Una vez conectado, ChatGPT puede ver tus registros de iglesia en tiempo real y ayudarte a completar tareas que de otro modo requerirían varios pasos en B1 Admin, o que ni siquiera sabrías cómo hacer.

**Algunas cosas que puedes pedirle:**
- *"Configura los salones de Escuela Dominical y asigna a cada maestro al salón correcto según su grupo"*
- *"Muéstrame a todas las personas que asistieron la semana pasada pero que no han sido asignadas a un grupo pequeño"*
- *"Resume las ofrendas de este mes por fondo"*
- *"¿Quiénes son nuestros miembros más recientes y hemos dado seguimiento a ellos?"*
- *"No sé cómo hacer X en B1, ¿puedes explicarme el proceso o hacerlo por mí?"*

ChatGPT obtiene las respuestas y realiza las acciones directamente a partir de tus datos de B1, limitado únicamente a tu iglesia.

:::tip Recomendado: Claude Code
Para la experiencia MCP más sencilla, [Claude Code](./claude) es el cliente recomendado: la configuración toma un solo comando y funciona de inmediato. ChatGPT también funciona y es una gran opción si tu equipo ya lo usa.
:::

Se admiten dos caminos: el **MCP Connector** (integrado en ChatGPT) y un **GPT personalizado** para equipos que quieran un asistente que puedan compartir.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Un administrador de la iglesia con el permiso **Edit Settings** en B1 Admin (necesario para crear una clave de API)
- Una cuenta de **ChatGPT Plus, Pro, Team o Enterprise**

</div>

## Guía rápida de configuración

Sigue estos pasos en la **aplicación de escritorio de ChatGPT** (Mac/Windows). Las pantallas pueden verse un poco diferentes en otras versiones.

---

**Paso 1: Obtén primero tu clave de API desde B1 Admin**

Antes de abrir ChatGPT, crea una clave de API en B1 Admin para tenerla lista para pegarla:

1. Ve a **Settings → Developer → API Keys** en B1 Admin
2. Haz clic en **New API Key**, ponle el nombre `ChatGPT`, elige tus scopes (empieza con `people:read`, `groups:read`, `attendance:read`, `donations:read`) y haz clic en **Save**
3. Copia la clave `cak_…`; solo se muestra una vez

---

**Paso 2: Haz clic en tu nombre en la esquina inferior izquierda de ChatGPT**

![Haz clic en tu nombre de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Paso 3: Haz clic en Settings**

![Haz clic en Settings del menú](/img/guides/chatgpt-mcp/02.png)

---

**Paso 4: Haz clic en Plugins en la barra lateral izquierda**

![Haz clic en Plugins bajo Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Paso 5: Haz clic en la pestaña MCPs**

![Haz clic en la pestaña MCPs](/img/guides/chatgpt-mcp/04.png)

Aquí verás los servidores MCP que ya hayas agregado.

---

**Paso 6: Haz clic en Add → Add MCP server**

![Haz clic en Add y luego en Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Paso 7: Completa el formulario y haz clic en Save**

![Formulario de conexión a un MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Haz clic en **Streamable HTTP** y luego completa:

| Campo | Qué ingresar |
|---|---|
| **Name** | `B1 Church` (o cualquier nombre que prefieras) |
| **Type** | Haz clic en **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Déjalo en blanco |
| **Headers** | Haz clic en **+ Add header** → Key: `Authorization` → Value: ver abajo |

![Ejemplo completado que muestra Authorization en Key y la clave Bearer en Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_tuclave`: la palabra Bearer, un espacio y luego tu clave

Haz clic en **Save**.

¡Listo! Vuelve a un chat y pregunta algo como *"¿Cuántas personas hay en nuestra iglesia?"* y ChatGPT obtendrá la respuesta directamente de B1.

---

## Paso 1: Crea una clave de API en B1 Admin

Cada conexión a B1 usa una clave de API que tú creas. Esta clave identifica a tu iglesia, controla lo que ChatGPT puede ver y puede revocarse en cualquier momento.

1. Abre **B1 Admin** y ve a **Settings → Developer → API Keys**.
2. Haz clic en **New API Key**.
3. Ponle un nombre a la clave: `ChatGPT` funciona bien.
4. Selecciona los scopes (permisos) que debe tener ChatGPT. Un buen conjunto inicial para un asistente de solo lectura:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Haz clic en **Save**.
6. Copia la clave completa que aparece: comienza con `cak_` y se muestra **una sola vez**. Guárdala en un lugar seguro.

:::tip
Si alguna vez necesitas revocar el acceso de ChatGPT, vuelve a **Settings → Developer → API Keys** y elimina la clave. El acceso termina de inmediato.
:::

---

## Camino A: MCP Connector de ChatGPT (recomendado)

Esta es la forma más sencilla de conectarse. ChatGPT tiene un cuadro de diálogo integrado "Connect to a custom MCP" que funciona directamente con el servidor MCP de B1, sin necesidad de un GPT personalizado.

### Lo que necesitas

- Tu clave `cak_…` del Paso 1

### Abre el conector MCP en ChatGPT

En ChatGPT, ve a **Settings → Plugins → MCPs** y haz clic en **Add → Add MCP server**.

### Completa el cuadro de diálogo

Haz clic en **Streamable HTTP** y luego usa estos valores:

| Campo | Valor |
|---|---|
| **Name** | `B1 Church` (o cualquier nombre que prefieras) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Déjalo en blanco |
| **Headers** | Key: `Authorization` / Value: `Bearer cak_tuprefijo.tusecreto` |

En el campo Value, escribe la palabra `Bearer`, un espacio y luego pega tu clave, todo en la misma casilla. Ejemplo: `Bearer cak_prefijo.secreto`.

Haz clic en **Save**.

### Pregúntale algo a ChatGPT

Una vez conectado, simplemente pregunta en lenguaje natural; no se necesitan comandos especiales:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"¿Quiénes se unieron en los últimos 30 días?"*
- *"¿Qué grupos están activos en este momento?"*
- *"Resume las ofrendas de este mes por fondo."*

ChatGPT llamará a B1 por detrás y responderá con tus datos en tiempo real.

---

## Camino B: GPT personalizado con Actions

Un GPT personalizado te permite crear un asistente dedicado que todo tu equipo puede compartir: abren un enlace y empiezan a hacer preguntas sin ninguna configuración de su parte. Requiere una cuenta de ChatGPT Plus, Team o Enterprise y unos 10 minutos.

### 1. Crea una clave de API

Sigue el Paso 1 de arriba si aún no lo has hecho.

### 2. Crea el GPT personalizado

1. En ChatGPT, haz clic en tu perfil → **My GPTs** → **Create a GPT**.
2. Cambia a la pestaña **Configure**, dale un nombre al GPT (por ejemplo, "B1 Assistant") y agrega las instrucciones:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Desplázate hasta **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** pega tu clave `cak_…`
   - **Auth Type:** Bearer
   - Guarda.

4. En el cuadro **Schema**, pega esta especificación OpenAPI inicial:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Guarda la acción. Pruébala con: *"¿cuántas personas hay en la iglesia?"*: ChatGPT llama a `listPeople` y responde.
6. **Publica** el GPT (Only me / Anyone with link / Organization) y comparte el enlace con tu equipo.

### 3. Úsalo

Cualquier persona con el enlace puede hacer preguntas en lenguaje natural. Los scopes de la clave siguen aplicando: una clave de solo lectura rechaza las escrituras sin importar lo que diga el esquema de la acción.

---

## Seguridad y límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. ChatGPT no puede ver los datos de otras iglesias.
- **Limitado por permisos.** La clave solo tiene los scopes que le otorgaste. Quitar un scope (eliminando y creando de nuevo la clave) corta ese acceso en la siguiente llamada.
- **Revocable al instante.** Elimina la clave en **Settings → Developer → API Keys** y el acceso termina de inmediato.
- **Compartir un GPT personalizado comparte los datos.** Todas las personas con acceso al GPT pueden ver lo que permitan los scopes de la clave. Prefiere scopes más restringidos (por ejemplo, omite `donations:read`) para GPT que se compartan ampliamente.
- **Registro de auditoría.** Los cambios realizados a través de ChatGPT pasan por el mismo registro de auditoría que las acciones de B1 Admin; encuéntralos en **Settings → Audit Log**.

## Costo

ChurchApps es gratuito y de código abierto: la API que llama ChatGPT forma parte de lo que tu iglesia ya utiliza. OpenAI cobra por el uso de ChatGPT según sus propios planes. ChurchApps no cobra por llamada.

## Solución de problemas

**El conector MCP dice "Unauthorized" o muestra un error 401:** tu clave de API falta o es incorrecta. Abre la configuración del conector y verifica que la clave en el argumento `Authorization:Bearer` sea el valor `cak_…` completo, sin espacios adicionales.

**ChatGPT dice que no puede encontrar ciertos datos:** es posible que la clave no tenga los scopes correctos. Crea una nueva clave en **Settings → Developer → API Keys** con los scopes adicionales y actualiza el conector.

**El comando `npx` falla:** es posible que Node.js no esté instalado. Descárgalo e instálalo desde [nodejs.org](https://nodejs.org) y luego intenta guardar el conector de nuevo.

**La acción del GPT personalizado devuelve 401:** en el panel de autenticación de la acción, confirma que **Auth Type: Bearer** esté seleccionado y que la clave no incluya la palabra `Bearer` (ChatGPT la agrega automáticamente).

**La acción del GPT personalizado devuelve 403:** la clave no tiene el scope para ese endpoint. Crea una nueva clave con los scopes correctos y actualiza el GPT.

**El esquema de la acción es rechazado:** ChatGPT requiere OpenAPI 3.1 con al menos una entrada en `paths` y una URL en `servers`. Valida el YAML en [editor.swagger.io](https://editor.swagger.io) antes de pegarlo.

## Relacionado

- [API Keys](/docs/developer/api/api-keys): referencia completa de scopes
- [MCP Server (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [Claude](./claude): la misma idea, para los modelos de Anthropic
- [REST API reference](/docs/developer/api/endpoints): cada endpoint que puede llamar una acción de GPT personalizado
