---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecte ChatGPT de OpenAI a los datos de B1 de su iglesia y deje que haga el trabajo pesado. Una vez conectado, ChatGPT puede ver sus registros de iglesia en vivo y ayudarle a hacer cosas que de otro modo tomarían varios pasos en B1 Admin — o que ni siquiera sabía cómo hacer.

**Algunas cosas que puede pedirle que haga:**
- *"Configura las aulas de la escuela dominical y pon a cada maestro en la sala correcta según su grupo"*
- *"Muéstrame a todos los que asistieron la semana pasada pero no han sido asignados a un grupo pequeño"*
- *"Resume las donaciones de este mes por fondo"*
- *"¿Quiénes son nuestros miembros más nuevos y hemos hecho seguimiento con ellos?"*
- *"No puedo entender cómo hacer X en B1 — ¿puedes guiarme o hacerlo por mí?"*

ChatGPT extrae las respuestas y toma las acciones directamente de sus datos de B1, limitados solo a su iglesia.

:::tip Recomendado: Claude Code
Para la experiencia MCP más fluida, [Claude Code](./claude) es el cliente recomendado — la configuración toma un comando y funciona de inmediato. ChatGPT también funciona y es una excelente opción si su equipo ya lo está usando.
:::

Se soportan dos rutas: el **Conector MCP** (integrado en ChatGPT) y un **GPT Personalizado** para equipos que desean un asistente compartible.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un administrador de iglesia con el permiso **Editar Configuración** en B1 Admin (necesario para crear una clave API)
- Una cuenta **ChatGPT Plus, Pro, Team o Enterprise**

</div>

## Guía de Configuración Rápida

Siga estos pasos en la **aplicación de escritorio ChatGPT** (Mac/Windows). Las pantallas pueden verse ligeramente diferentes en otras versiones.

---

**Paso 1 — Obtenga su clave API de B1 Admin primero**

Antes de tocar ChatGPT, cree una clave API en B1 Admin para tenerla lista para pegar:

1. Vaya a **Configuración → Desarrollador → Claves de API** en B1 Admin
2. Haga clic en **Nueva Clave de API**, nómbrela `ChatGPT`, elija sus alcances (comience con `people:read`, `groups:read`, `attendance:read`, `donations:read`), y haga clic en **Guardar**
3. Copie la clave `cak_…` — solo se muestra una vez

---

**Paso 2 — Haga clic en su nombre en la esquina inferior izquierda de ChatGPT**

![Haga clic en su nombre de perfil](/img/guides/chatgpt-mcp/01.png)

---

**Paso 3 — Haga clic en Configuración**

![Haga clic en Configuración del menú](/img/guides/chatgpt-mcp/02.png)

---

**Paso 4 — Haga clic en Complementos en la barra lateral izquierda**

![Haga clic en Complementos bajo Integraciones](/img/guides/chatgpt-mcp/03.png)

---

**Paso 5 — Haga clic en la pestaña MCPs**

![Haga clic en la pestaña MCPs](/img/guides/chatgpt-mcp/04.png)

Verá cualquier servidor MCP que ya haya agregado aquí.

---

**Paso 6 — Haga clic en Agregar → Agregar servidor MCP**

![Haga clic en Agregar y luego Agregar servidor MCP](/img/guides/chatgpt-mcp/06.png)

---

**Paso 7 — Complete el formulario y haga clic en Guardar**

![Conectar a un formulario MCP personalizado](/img/guides/chatgpt-mcp/07.png)

Haga clic en **HTTP Transmisible**, luego complete:

| Campo | Qué ingresar |
|---|---|
| **Nombre** | `B1 Church` (o cualquier nombre que le guste) |
| **Tipo** | Haga clic en **HTTP Transmisible** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable de entorno de token portador** | Deje en blanco |
| **Encabezados** | Haga clic en **+ Agregar encabezado** → Clave: `Authorization` → Valor: vea a continuación |

![Ejemplo completo mostrando Authorization en Clave y clave Bearer en Valor](/img/guides/chatgpt-mcp/08.png)

- **Clave:** `Authorization`
- **Valor:** `Bearer cak_suaclave` — la palabra Bearer, un espacio, luego su clave

Haga clic en **Guardar**.

¡Eso es! Vuelva a un chat y haga una pregunta como *"¿Cuántas personas hay en nuestra iglesia?"* y ChatGPT extraerá la respuesta directamente de B1.

---

## Paso 1 — Crear una Clave de API en B1 Admin

Cada conexión a B1 usa una clave de API que crea. Esta clave identifica su iglesia, controla lo que ChatGPT puede ver, y se puede revocar en cualquier momento.

1. Abra **B1 Admin** y vaya a **Configuración → Desarrollador → Claves de API**.
2. Haga clic en **Nueva Clave de API**.
3. Dé a la clave un nombre — `ChatGPT` funciona bien.
4. Seleccione los alcances (permisos) que ChatGPT debería tener. Un buen conjunto inicial para un asistente de solo lectura:
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Haga clic en **Guardar**.
6. Copie la clave completa que aparece — comienza con `cak_` y se muestra **solo una vez**. Péguelo en un lugar seguro.

:::tip
Si alguna vez necesita revocar el acceso de ChatGPT, vuelva a **Configuración → Desarrollador → Claves de API** y elimine la clave. El acceso termina inmediatamente.
:::

---

## Ruta A — Conector MCP de ChatGPT (Recomendado)

Esta es la forma más simple de conectarse. ChatGPT tiene un diálogo "Conectar a un MCP personalizado" integrado que funciona directamente con el servidor MCP de B1 — no se necesita GPT personalizado.

### Lo que necesita

- Su clave `cak_…` del Paso 1

### Abra el conector MCP en ChatGPT

En ChatGPT, vaya a **Configuración → Complementos → MCPs** y haga clic en **Agregar → Agregar servidor MCP**.

### Complete el diálogo

Haga clic en **HTTP Transmisible**, luego use estos valores:

| Campo | Valor |
|---|---|
| **Nombre** | `B1 Church` (o cualquier nombre que le guste) |
| **Tipo** | **HTTP Transmisible** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable de entorno de token portador** | Deje en blanco |
| **Encabezados** | Clave: `Authorization` / Valor: `Bearer cak_suprefix.susecret` |

Para el campo Valor, escriba la palabra `Bearer`, un espacio, luego pegue su clave — todo en la misma caja. Ejemplo: `Bearer cak_prefix.secret`.

Haga clic en **Guardar**.

### Pregúntele a ChatGPT algo

Una vez conectado, simplemente pregunte en lenguaje natural — no se necesita sintaxis especial:

- *"¿Cuántas personas hay en nuestra iglesia?"*
- *"¿Quién se unió en los últimos 30 días?"*
- *"¿Qué grupos están activos ahora?"*
- *"Resume las donaciones de este mes por fondo."*

ChatGPT llamará a B1 detrás de escenas y responderá desde sus datos en vivo.

---

## Ruta B — GPT Personalizado con Acciones

Un GPT Personalizado le permite crear un asistente dedicado que todo su equipo puede compartir — abren un enlace y comienzan a hacer preguntas sin ninguna configuración de su parte. Requiere una cuenta ChatGPT Plus, Team o Enterprise y unos 10 minutos.

### 1. Crear una clave de API

Siga el Paso 1 anterior si aún no lo ha hecho.

### 2. Construir el GPT Personalizado

1. En ChatGPT, haga clic en su perfil → **Mis GPTs** → **Crear un GPT**.
2. Cambie a la pestaña **Configurar**, dé al GPT un nombre (p. ej. "Asistente B1") y agregue instrucciones:

   ```
   Ayudas al personal de la iglesia a consultar sus registros de B1. Usa las acciones de la API de B1 para
   buscar personas, grupos, asistencia, donaciones y contenido. Siempre limita
   las respuestas a datos que el usuario tiene permiso de ver. Sé conciso.
   ```

3. Desplácese a **Acciones** → **Crear nueva acción** → **Autenticación**.
   - **Tipo de autenticación:** Clave de API
   - **Clave de API:** pegue su clave `cak_…`
   - **Tipo de Autenticación:** Portador
   - Guardar.

4. En la caja **Esquema**, pegue este especificador OpenAPI inicial:

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
         summary: Listar personas en la iglesia
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
         summary: Obtener una sola persona por id
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
         summary: Listar grupos en la iglesia
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: Listar donaciones
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
         summary: Listar registros de asistencia
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
6. **Publique** el GPT (Solo yo / Cualquiera con el enlace / Organización) y comparta el enlace con su equipo.

### 3. Úselo

Cualquiera con el enlace puede hacer preguntas en lenguaje natural. Los alcances de la clave aún se aplican — una clave de solo lectura rechaza escrituras sin importar lo que diga el esquema de acciones.

---

## Seguridad y Límites

- **Aislamiento por iglesia.** La clave de API se resuelve a una iglesia solo. ChatGPT no puede ver datos de otras iglesias.
- **Limitado por permisos.** La clave solo lleva los alcances que otorgó. Quitar un alcance (eliminando y recreando la clave) corta ese acceso en la siguiente llamada.
- **Revocable instantáneamente.** Elimine la clave en **Configuración → Desarrollador → Claves de API** y el acceso termina inmediatamente.
- **Compartir un GPT Personalizado comparte los datos.** Todos con acceso al GPT pueden ver lo que permitan los alcances de la clave. Prefiera alcances más estrechos (p. ej. omita `donations:read`) para GPTs compartidos ampliamente.
- **Registro de auditoría.** Cualquier cambio realizado a través de ChatGPT va a través del mismo registro de auditoría que las acciones de B1 Admin — encuéntrelos bajo **Reportes → Registro de Auditoría**.

## Costo

ChurchApps es gratis y de código abierto — la API que ChatGPT llama es parte de lo que su iglesia ya ejecuta. OpenAI cobra por el uso de ChatGPT según sus propios planes. No hay costo por llamada desde ChurchApps.

## Solución de Problemas

**El conector MCP dice "No Autorizado" o muestra un error 401:** su clave de API falta o es incorrecta. Abra la configuración del conector y verifique que la clave en el argumento `Authorization:Bearer` sea el valor completo `cak_…` sin espacios adicionales.

**ChatGPT dice que no puede encontrar ciertos datos:** la clave puede no tener los alcances correctos. Cree una nueva clave en **Configuración → Desarrollador → Claves de API** con los alcances adicionales y actualice el conector.

**El comando `npx` falla:** Node.js puede no estar instalado. Descargue e instálelo desde [nodejs.org](https://nodejs.org), luego intente guardar el conector nuevamente.

**La acción del GPT personalizado devuelve 401:** en el panel de autenticación de la acción confirme que **Tipo de Autenticación: Portador** esté seleccionado y la clave no incluya la palabra `Bearer` (ChatGPT la agrega automáticamente).

**La acción del GPT personalizado devuelve 403:** la clave no tiene el alcance para ese punto final. Cree una nueva clave con los alcances correctos y actualice el GPT.

**El esquema de acciones es rechazado:** ChatGPT requiere OpenAPI 3.1 con al menos una entrada `paths` y una URL `servers`. Valide el YAML en [editor.swagger.io](https://editor.swagger.io) antes de pegarlo.

## Relacionado

- [Claves de API](/docs/developer/api/api-keys) — referencia completa de alcances
- [Servidor MCP (referencia de desarrollador)](/docs/developer/api/mcp) — detalles del protocolo y esquemas de herramientas
- [Claude](./claude) — misma idea, para modelos de Anthropic
- [Referencia de API REST](/docs/developer/api/endpoints) — cada punto final que una acción GPT personalizada puede llamar
