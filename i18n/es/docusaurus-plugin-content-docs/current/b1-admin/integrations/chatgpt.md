---
title: "ChatGPT"
description: "Conecte ChatGPT a los datos de B1 de su iglesia con una clave de API para poder hacer preguntas en lenguaje sencillo sobre personas, donaciones y asistencia en B1 Admin."
---

# ChatGPT

<div class="article-intro">

Conecte ChatGPT a los datos de B1 de su iglesia y hágale preguntas en lenguaje sencillo: responderá con la información en vivo de los registros de su iglesia. También puede pedirle ayuda con tareas que requerirían varios pasos en B1 Admin.

**Algunas cosas que puede preguntar:**
- *"Muéstrame a todas las personas que asistieron la semana pasada pero que aún no han sido asignadas a un grupo pequeño"*
- *"Resume las donaciones de este mes por fondo"*
- *"¿Quiénes son nuestros miembros más recientes y hemos hecho seguimiento con ellos?"*
- *"No sé cómo hacer X en B1, ¿puedes guiarme paso a paso?"*

</div>

<div class="prereqs">
<h4>Lo que necesita</h4>

- **La aplicación de escritorio de ChatGPT** para Mac o Windows
- **Un plan de pago de ChatGPT** (Plus o superior). Las cuentas gratuitas de ChatGPT no pueden conectarse a B1.
- **Su inicio de sesión de B1** con permiso para administrar la configuración de la iglesia (necesario para crear una clave). ¿No lo tiene? Pídaselo al administrador de B1 de su iglesia.

</div>

:::tip Recomendado: pruebe Claude primero, es gratis
[Claude](./claude.md) se conecta a B1 en su **plan gratuito** y se configura en menos de 3 minutos: solo agregue B1 como conector e inicie sesión con su cuenta de B1. No necesita clave. Es la forma más sencilla para que su iglesia pruebe la IA con B1 antes de pagar por algo.
:::

## Configúrelo {#set-it-up}

Las pantallas pueden verse un poco diferentes en su versión de ChatGPT.

---

**Paso 1: Cree su clave de B1**

La clave es lo que permite a ChatGPT entrar en *el* B1 de su iglesia; piénsela como una contraseña exclusiva para ChatGPT.

1. Inicie sesión en [B1 Admin](https://admin.b1.church) y vaya a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **API Keys**, haga clic en **New API Key** y póngale el nombre `ChatGPT`.
3. **Permisos (Scopes):** marque lo que ChatGPT puede hacer. Cada área tiene una casilla **read** (solo lectura) y una casilla **write** (hacer cambios). ¿No está seguro? Para empezar, marque solo las casillas **read**.
4. Haga clic en **Save** y luego en **Copy** para copiar la clave (comienza con `cak_`). Solo se muestra una vez.

---

**Paso 2: Haga clic en su nombre en la esquina inferior izquierda de ChatGPT**

![Haga clic en su nombre de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Paso 3: Haga clic en Settings**

![Haga clic en Settings en el menú](/img/guides/chatgpt-mcp/02.png)

---

**Paso 4: Haga clic en Plugins en la barra lateral izquierda**

![Haga clic en Plugins en Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Paso 5: Haga clic en la pestaña MCPs**

![Haga clic en la pestaña MCPs](/img/guides/chatgpt-mcp/04.png)

Aquí verá los servidores MCP que ya haya agregado.

---

**Paso 6: Haga clic en Add → Add MCP server**

![Haga clic en Add y luego en Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Paso 7: Complete el formulario y haga clic en Save**

![Formulario para conectar un MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Haga clic en **Streamable HTTP** y luego complete:

| Campo | Qué introducir |
|---|---|
| **Name** | `B1 Church` (o cualquier nombre que prefiera) |
| **Type** | Haga clic en **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Déjelo en blanco |
| **Headers** | Haga clic en **+ Add header** → Key: `Authorization` → Value: vea abajo |

![Ejemplo completado que muestra Authorization en Key y la clave Bearer en Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_yourkey`: la palabra Bearer, un espacio y luego su clave

Haga clic en **Save**.

¡Eso es todo! Vuelva a un chat y pregunte algo como *"¿Cuántas personas hay en nuestra iglesia?"*, y ChatGPT obtendrá la respuesta directamente de B1.

---

## ¿Es seguro? {#is-it-safe}

- ChatGPT solo puede ver los datos **de su iglesia**.
- Solo puede hacer lo que permita su clave: una clave con solo las casillas **read** marcadas puede consultar, pero nunca cambiar nada.
- Para desactivarlo, elimine la clave en B1 Admin en **Configuración → Desarrollador**. El acceso se detiene de inmediato.

## ¿Cuánto cuesta? {#what-does-it-cost}

La conexión con B1 es gratuita: forma parte de ChurchApps. ChatGPT necesita un plan de pago (Plus o superior) para conectarse; consulte los precios de OpenAI.

## Detalles técnicos {#technical-details}

El resto de esta página es para usuarios técnicos y asistentes de IA. El servidor MCP de B1 está en `https://api.churchapps.org/mcp` (Streamable HTTP) y recibe la clave de API como un encabezado `Authorization: Bearer cak_…`. Consulte la [referencia para desarrolladores del servidor MCP](/docs/developer/api/mcp).

### GPT personalizado con Actions {#custom-gpt-with-actions}

Un GPT personalizado le permite crear un asistente dedicado que todo su equipo puede compartir: abren un enlace y empiezan a hacer preguntas sin ninguna configuración de su parte. Requiere una cuenta de ChatGPT Plus, Team o Enterprise y unos 10 minutos.

#### 1. Cree una clave de API {#1-create-an-api-key}

Siga el Paso 1 de Configúrelo más arriba si todavía no lo ha hecho.

#### 2. Cree el GPT personalizado {#2-build-the-custom-gpt}

1. En ChatGPT, haga clic en su perfil → **My GPTs** → **Create a GPT**.
2. Cambie a la pestaña **Configure**, póngale un nombre al GPT (por ejemplo, "Asistente de B1") y agregue las instrucciones:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Desplácese a **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** pegue su clave `cak_…`
   - **Auth Type:** Bearer
   - Guarde.

4. En el cuadro **Schema**, pegue esta especificación inicial de OpenAPI:

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Guarde la acción. Pruébela: *"¿cuántas personas hay en la iglesia?"*: ChatGPT llama a `listPeople` y responde.
6. **Publique** el GPT (Solo yo / Cualquier persona con el enlace / Organización) y comparta el enlace con su equipo.

#### 3. Úselo {#3-use-it}

Cualquier persona con el enlace puede hacer preguntas en lenguaje natural. Los permisos de la clave siguen aplicando: una clave de solo lectura rechaza las escrituras sin importar lo que diga el esquema de la acción.

---

### Seguridad y límites {#safety-and-limits}

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. ChatGPT no puede ver los datos de otras iglesias.
- **Limitado por permisos.** La clave solo tiene los permisos que usted otorgó. Si quita un permiso (eliminando la clave y creando una nueva), ese acceso se corta en la siguiente llamada.
- **Revocable al instante.** Elimine la clave en **Configuración → Desarrollador → API Keys** y el acceso termina de inmediato.
- **Compartir un GPT personalizado comparte los datos.** Todas las personas con acceso al GPT pueden ver todo lo que permitan los permisos de la clave. Para los GPT que se compartan ampliamente, prefiera permisos más restringidos (por ejemplo, omita `donations:read`).
- **Registro de auditoría.** Cualquier cambio hecho a través de ChatGPT pasa por el mismo registro de auditoría que las acciones de B1 Admin; encuéntrelos en **Configuración → Registro de auditoría**.

### Solución de problemas {#troubleshooting}

**El conector MCP dice "Unauthorized" o muestra un error 401:** su clave de API falta o es incorrecta. Abra la configuración del conector y revise el encabezado **Authorization**: el valor debe ser la palabra `Bearer`, un espacio y luego la clave `cak_…` completa, sin espacios adicionales.

**ChatGPT dice que no puede encontrar ciertos datos:** es posible que la clave no tenga los permisos adecuados. Cree una nueva clave en **Configuración → Desarrollador → API Keys** con los permisos adicionales y actualice el conector.

**La acción del GPT personalizado devuelve 401:** en el panel de autenticación de la acción, confirme que **Auth Type: Bearer** esté seleccionado y que la clave no incluya la palabra `Bearer` (ChatGPT la agrega automáticamente).

**La acción del GPT personalizado devuelve 403:** la clave no tiene el permiso para ese endpoint. Cree una nueva clave con los permisos correctos y actualice el GPT.

**Se rechaza el esquema de la acción:** ChatGPT requiere OpenAPI 3.1 con al menos una entrada `paths` y una URL en `servers`. Valide el YAML en [editor.swagger.io](https://editor.swagger.io) antes de pegarlo.

## Relacionados {#related}

- [Claves de API](/docs/developer/api/api-keys): referencia completa de permisos
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [Claude](./claude.md): la misma idea, para los modelos de Anthropic
- [Referencia de la API REST](/docs/developer/api/endpoints): todos los endpoints que puede llamar una acción de GPT personalizado
