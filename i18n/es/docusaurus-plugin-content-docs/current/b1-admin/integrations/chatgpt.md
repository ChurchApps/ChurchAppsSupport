---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte ChatGPT a los datos de B1 de su iglesia y hágale preguntas en lenguaje sencillo — le responde con los registros actuales de su iglesia. También puede pedirle ayuda con tareas que tomarían varios pasos en B1 Admin.

**Algunas cosas que puede preguntar:**
- *"Muéstrame a todos los que asistieron la semana pasada pero no han sido asignados a un grupo pequeño"*
- *"Resume las donaciones de este mes por fondo"*
- *"¿Quiénes son nuestros miembros más nuevos y hemos hecho seguimiento con ellos?"*
- *"No sé cómo hacer X en B1 — ¿puedes guiarme paso a paso?"*

</div>

<div class="prereqs">
<h4>Lo Que Necesita</h4>

- **La aplicación de escritorio de ChatGPT** para Mac o Windows
- **Un plan de pago de ChatGPT** (Plus o superior). Las cuentas gratuitas de ChatGPT no pueden conectarse a B1.
- **Su inicio de sesión de B1** con permiso para administrar la configuración de la iglesia (necesario para crear una clave). ¿No lo tiene? Pídaselo al administrador de B1 de su iglesia.

</div>

:::tip Recomendado: pruebe Claude primero — es gratis
[Claude](./claude) se conecta a B1 con su **plan gratuito** y se configura en menos de 3 minutos — solo agregue B1 como conector e inicie sesión con su cuenta de B1. No se necesita ninguna clave. Es la forma más fácil para que su iglesia pruebe la IA con B1 antes de pagar por nada.
:::

## Configúrelo

Las pantallas pueden verse ligeramente diferentes en su versión de ChatGPT.

---

**Paso 1 — Cree su clave de B1**

La clave es lo que le da a ChatGPT acceso al B1 de *su* iglesia — piense en ella como una contraseña solo para ChatGPT.

1. Inicie sesión en [B1 Admin](https://admin.b1.church) y vaya a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **Claves de API**, haga clic en **Nueva Clave de API** y nómbrela `ChatGPT`.
3. **Alcances:** marque lo que ChatGPT puede hacer. Cada área tiene una casilla **read** (solo ver) y una casilla **write** (hacer cambios). ¿No está seguro? Para empezar marque solo las casillas **read**.
4. Haga clic en **Guardar** y luego en **Copiar** para copiar la clave (comienza con `cak_`). Solo se muestra una vez.

---

**Paso 2 — Haga clic en su nombre en la esquina inferior izquierda de ChatGPT**

![Haga clic en su nombre de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Paso 3 — Haga clic en Settings (Configuración)**

![Haga clic en Settings en el menú](/img/guides/chatgpt-mcp/02.png)

---

**Paso 4 — Haga clic en Plugins en la barra lateral izquierda**

![Haga clic en Plugins bajo Integraciones](/img/guides/chatgpt-mcp/03.png)

---

**Paso 5 — Haga clic en la pestaña MCPs**

![Haga clic en la pestaña MCPs](/img/guides/chatgpt-mcp/04.png)

Aquí verá cualquier servidor MCP que ya haya agregado.

---

**Paso 6 — Haga clic en Add → Add MCP server (Agregar → Agregar servidor MCP)**

![Haga clic en Add y luego en Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Paso 7 — Complete el formulario y haga clic en Save (Guardar)**

![Formulario para conectar a un MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Haga clic en **Streamable HTTP**, luego complete:

| Campo | Qué ingresar |
|---|---|
| **Name** (Nombre) | `B1 Church` (o cualquier nombre que le guste) |
| **Type** (Tipo) | Haga clic en **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Déjelo en blanco |
| **Headers** (Encabezados) | Haga clic en **+ Add header** → Key: `Authorization` → Value: vea a continuación |

![Ejemplo completo mostrando Authorization en Key y la clave Bearer en Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_suclave` — la palabra Bearer, un espacio, luego su clave

Haga clic en **Save** (Guardar).

¡Eso es todo! Vuelva a un chat y pregunte algo como *"¿Cuántas personas hay en nuestra iglesia?"* y ChatGPT obtendrá la respuesta directamente de B1.

---

## ¿Es Seguro?

- ChatGPT solo puede ver los datos de **su iglesia**.
- Solo puede hacer lo que su clave permite — una clave con solo las casillas **read** marcadas puede mirar pero nunca cambiar nada.
- Para desactivarlo, elimine la clave en B1 Admin en **Configuración → Desarrollador**. El acceso se detiene de inmediato.

## ¿Cuánto Cuesta?

La conexión con B1 es gratuita — es parte de ChurchApps. ChatGPT necesita un plan de pago (Plus o superior) para conectarse; consulte los precios de OpenAI.

## Detalles Técnicos

El resto de esta página es para usuarios técnicos y asistentes de IA. El servidor MCP de B1 está en `https://api.churchapps.org/mcp` (Streamable HTTP) y recibe la clave de API como encabezado `Authorization: Bearer cak_…`. Consulte la [referencia de desarrollador del Servidor MCP](/docs/developer/api/mcp).

### GPT Personalizado con Acciones

Un GPT Personalizado le permite crear un asistente dedicado que todo su equipo puede compartir — abren un enlace y comienzan a hacer preguntas sin ninguna configuración de su parte. Requiere una cuenta ChatGPT Plus, Team o Enterprise y unos 10 minutos.

#### 1. Crear una clave de API

Siga el Paso 1 de Configúrelo más arriba si aún no lo ha hecho.

#### 2. Construir el GPT Personalizado

1. En ChatGPT, haga clic en su perfil → **My GPTs** (Mis GPTs) → **Create a GPT** (Crear un GPT).
2. Cambie a la pestaña **Configure** (Configurar), dé al GPT un nombre (p. ej. "Asistente B1") y agregue instrucciones:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Desplácese a **Actions** (Acciones) → **Create new action** (Crear nueva acción) → **Authentication** (Autenticación).
   - **Authentication type:** API Key
   - **API Key:** pegue su clave `cak_…`
   - **Auth Type:** Bearer
   - Guardar.

4. En el cuadro **Schema** (Esquema), pegue esta especificación OpenAPI inicial:

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

5. Guarde la acción. Pruébela: *"¿cuántas personas hay en la iglesia?"* — ChatGPT llama a `listPeople` y responde.
6. **Publique** el GPT con **Publish** (Only me / Anyone with link / Organization) y comparta el enlace con su equipo.

#### 3. Úselo

Cualquiera con el enlace puede hacer preguntas en lenguaje natural. Los alcances de la clave siguen aplicándose — una clave de solo lectura rechaza escrituras sin importar lo que diga el esquema de acciones.

---

### Seguridad y Límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. ChatGPT no puede ver datos de otras iglesias.
- **Limitado por permisos.** La clave solo lleva los alcances que usted otorgó. Quitar un alcance (eliminando y recreando la clave) corta ese acceso en la siguiente llamada.
- **Revocable al instante.** Elimine la clave en **Configuración → Desarrollador → Claves de API** y el acceso termina inmediatamente.
- **Compartir un GPT Personalizado comparte los datos.** Todos los que tengan acceso al GPT pueden ver lo que permitan los alcances de la clave. Prefiera alcances más estrechos (p. ej. omita `donations:read`) para GPTs compartidos ampliamente.
- **Registro de auditoría.** Cualquier cambio realizado a través de ChatGPT pasa por el mismo registro de auditoría que las acciones de B1 Admin — encuéntrelos en **Configuración → Registro de Auditoría**.

### Solución de Problemas

**El conector MCP dice "Unauthorized" o muestra un error 401:** su clave de API falta o es incorrecta. Abra la configuración del conector y verifique el encabezado **Authorization**: el valor debe ser la palabra `Bearer`, un espacio y luego la clave completa `cak_…` sin espacios adicionales.

**ChatGPT dice que no puede encontrar ciertos datos:** es posible que la clave no tenga los alcances correctos. Cree una nueva clave en **Configuración → Desarrollador → Claves de API** con los alcances adicionales y actualice el conector.

**La acción del GPT personalizado devuelve 401:** en el panel de autenticación de la acción confirme que **Auth Type: Bearer** esté seleccionado y que la clave no incluya la palabra `Bearer` (ChatGPT la agrega automáticamente).

**La acción del GPT personalizado devuelve 403:** la clave no tiene el alcance para ese punto final. Cree una nueva clave con los alcances correctos y actualice el GPT.

**El esquema de acciones es rechazado:** ChatGPT requiere OpenAPI 3.1 con al menos una entrada `paths` y una URL `servers`. Valide el YAML en [editor.swagger.io](https://editor.swagger.io) antes de pegarlo.

## Relacionado

- [Claves de API](/docs/developer/api/api-keys) — referencia completa de alcances
- [Servidor MCP (referencia de desarrollador)](/docs/developer/api/mcp) — detalles del protocolo y esquemas de herramientas
- [Claude](./claude) — misma idea, para los modelos de Anthropic
- [Referencia de API REST](/docs/developer/api/endpoints) — cada punto final que una acción de GPT personalizado puede llamar
