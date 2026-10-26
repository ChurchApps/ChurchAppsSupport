---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecta ChatGPT a los datos de B1 de tu iglesia y hazle preguntas en lenguaje sencillo: responde con los registros actuales de tu iglesia. También puedes pedirle ayuda con tareas que requerirían varios pasos en B1 Admin.

**Algunas cosas que puedes preguntar:**
- *"Muéstrame a todos los que asistieron la semana pasada pero que todavía no están asignados a un grupo pequeño"*
- *"Resume las ofrendas de este mes por fondo"*
- *"¿Quiénes son nuestros miembros más nuevos y les hemos dado seguimiento?"*
- *"No sé cómo hacer X en B1, ¿me puedes guiar paso a paso?"*

</div>

<div class="prereqs">
<h4>Lo que necesitas</h4>

- **La aplicación de escritorio de ChatGPT** para Mac o Windows
- **Un plan de pago de ChatGPT** (Plus o superior). Las cuentas gratuitas de ChatGPT no pueden conectarse a B1.
- **Tu inicio de sesión de B1** con permiso para administrar la configuración de la iglesia (necesario para crear una clave). ¿No lo tienes? Pídeselo al administrador de B1 de tu iglesia.

</div>

:::tip Recomendado: prueba primero Claude, es gratis
[Claude](./claude) se conecta a B1 con su **plan gratuito** y se configura en menos de 3 minutos: solo agrega B1 como conector e inicia sesión con tu cuenta de B1. No necesitas clave. Es la forma más sencilla para que tu iglesia pruebe la IA con B1 antes de pagar por algo.
:::

## Configuración

Las pantallas pueden verse un poco distintas en tu versión de ChatGPT.

---

**Paso 1: Crea tu clave de B1**

La clave es lo que permite que ChatGPT entre al B1 de *tu* iglesia. Piénsala como una contraseña solo para ChatGPT.

1. Inicia sesión en [B1 Admin](https://admin.b1.church) y ve a [Configuración → Desarrollador](https://admin.b1.church/settings/developer).
2. En la pestaña **Claves de API**, haz clic en **Nueva clave de API** y dale el nombre `ChatGPT`.
3. **Permisos:** marca lo que ChatGPT puede hacer. Cada área tiene una casilla **lectura** (solo consultar) y una casilla **escritura** (hacer cambios). ¿No estás seguro? Para empezar, marca solo las casillas de **lectura**.
4. Haz clic en **Guardar** y luego en **Copiar** la clave (empieza con `cak_`). Solo se muestra una vez.

---

**Paso 2: Haz clic en tu nombre en la esquina inferior izquierda de ChatGPT**

![Haz clic en tu nombre de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Paso 3: Haz clic en Configuración**

![Haz clic en Configuración desde el menú](/img/guides/chatgpt-mcp/02.png)

---

**Paso 4: Haz clic en Plugins en la barra lateral izquierda**

![Haz clic en Plugins en Integraciones](/img/guides/chatgpt-mcp/03.png)

---

**Paso 5: Haz clic en la pestaña MCPs**

![Haz clic en la pestaña MCPs](/img/guides/chatgpt-mcp/04.png)

Aquí verás los servidores MCP que ya hayas agregado.

---

**Paso 6: Haz clic en Agregar → Agregar servidor MCP**

![Haz clic en Agregar y luego en Agregar servidor MCP](/img/guides/chatgpt-mcp/06.png)

---

**Paso 7: Completa el formulario y haz clic en Guardar**

![Formulario para conectar un MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Haz clic en **Streamable HTTP** y luego completa:

| Campo | Qué escribir |
|---|---|
| **Nombre** | `B1 Church` (o cualquier nombre que prefieras) |
| **Tipo** | Haz clic en **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable de entorno del token Bearer** | Déjalo en blanco |
| **Encabezados** | Haz clic en **+ Agregar encabezado** → Clave: `Authorization` → Valor: ver abajo |

![Ejemplo completado que muestra Authorization en Clave y la clave Bearer en Valor](/img/guides/chatgpt-mcp/08.png)

- **Clave:** `Authorization`
- **Valor:** `Bearer cak_yourkey`: la palabra Bearer, un espacio y tu clave

Haz clic en **Guardar**.

¡Eso es todo! Regresa a un chat y pregunta algo como *"¿Cuántas personas hay en nuestra iglesia?"*, y ChatGPT obtendrá la respuesta directamente de B1.

---

## ¿Es seguro?

- ChatGPT solo puede ver los datos **de tu iglesia**.
- Solo puede hacer lo que permita tu clave: una clave con solo casillas de **lectura** marcadas puede consultar, pero nunca cambiar nada.
- Para desactivarlo, elimina la clave en B1 Admin en **Configuración → Desarrollador**. El acceso se detiene de inmediato.

## ¿Cuánto cuesta?

La conexión con B1 es gratuita: es parte de ChurchApps. ChatGPT requiere un plan de pago (Plus o superior) para conectarse; consulta los precios de OpenAI.

## Detalles técnicos

El resto de esta página es para usuarios técnicos y asistentes de IA. El servidor MCP de B1 está en `https://api.churchapps.org/mcp` (Streamable HTTP) y recibe la clave de API como encabezado `Authorization: Bearer cak_…`. Consulta la [referencia para desarrolladores del servidor MCP](/docs/developer/api/mcp).

### GPT personalizado con Acciones

Un GPT personalizado te permite crear un asistente dedicado que todo tu equipo puede compartir: abren un enlace y empiezan a hacer preguntas sin ninguna configuración previa. Requiere una cuenta de ChatGPT Plus, Team o Enterprise y unos 10 minutos.

#### 1. Crea una clave de API

Sigue el Paso 1 de Configuración arriba si todavía no lo has hecho.

#### 2. Crea el GPT personalizado

1. En ChatGPT, haz clic en tu perfil → **Mis GPT** → **Crear un GPT**.
2. Cambia a la pestaña **Configurar**, dale un nombre al GPT (por ejemplo, "Asistente de B1") y agrega las instrucciones:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Desplázate hasta **Acciones** → **Crear nueva acción** → **Autenticación**.
   - **Tipo de autenticación:** Clave de API
   - **Clave de API:** pega tu clave `cak_…`
   - **Tipo de autenticación:** Bearer
   - Guarda.

4. En el cuadro **Esquema**, pega esta especificación OpenAPI inicial:

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

5. Guarda la acción. Pruébala con: *"¿cuántas personas hay en la iglesia?"*. ChatGPT llama a `listPeople` y responde.
6. **Publica** el GPT (Solo yo / Cualquiera con el enlace / Organización) y comparte el enlace con tu equipo.

#### 3. Úsalo

Cualquiera que tenga el enlace puede hacer preguntas en lenguaje natural. Los permisos de la clave siguen aplicando: una clave de solo lectura rechaza las escrituras sin importar lo que diga el esquema de la acción.

---

### Seguridad y límites

- **Aislamiento por iglesia.** La clave de API corresponde a una sola iglesia. ChatGPT no puede ver los datos de otras iglesias.
- **Limitada por permisos.** La clave solo incluye los permisos que concediste. Quitar un permiso (eliminando y volviendo a crear la clave) corta ese acceso en la siguiente llamada.
- **Revocable al instante.** Elimina la clave en **Configuración → Desarrollador → Claves de API** y el acceso termina de inmediato.
- **Compartir un GPT personalizado comparte los datos.** Todos los que tengan acceso al GPT pueden ver lo que permitan los permisos de la clave. Para GPT que se compartirán ampliamente, prefiere permisos más restringidos (por ejemplo, omite `donations:read`).
- **Registro de auditoría.** Los cambios hechos a través de ChatGPT pasan por el mismo registro de auditoría que las acciones de B1 Admin; encuéntralos en **Configuración → Registro de auditoría**.

### Solución de problemas

**El conector MCP dice "Unauthorized" o muestra un error 401:** tu clave de API falta o es incorrecta. Abre la configuración del conector y revisa el encabezado **Authorization**: el valor debe ser la palabra `Bearer`, un espacio, y luego la clave `cak_…` completa, sin espacios adicionales.

**ChatGPT dice que no puede encontrar ciertos datos:** es posible que la clave no tenga los permisos correctos. Crea una nueva clave en **Configuración → Desarrollador → Claves de API** con los permisos adicionales y actualiza el conector.

**La acción del GPT personalizado devuelve 401:** en el panel de autenticación de la acción, confirma que está seleccionado **Tipo de autenticación: Bearer** y que la clave no incluye la palabra `Bearer` (ChatGPT la agrega automáticamente).

**La acción del GPT personalizado devuelve 403:** la clave no tiene el permiso para ese endpoint. Crea una nueva clave con los permisos correctos y actualiza el GPT.

**El esquema de la acción es rechazado:** ChatGPT requiere OpenAPI 3.1 con al menos una entrada en `paths` y una URL en `servers`. Valida el YAML en [editor.swagger.io](https://editor.swagger.io) antes de pegarlo.

## Relacionados

- [Claves de API](/docs/developer/api/api-keys): referencia completa de permisos
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp): detalles del protocolo y esquemas de herramientas
- [Claude](./claude): la misma idea, para los modelos de Anthropic
- [Referencia de la API REST](/docs/developer/api/endpoints): todos los endpoints que puede llamar una acción de GPT personalizado
