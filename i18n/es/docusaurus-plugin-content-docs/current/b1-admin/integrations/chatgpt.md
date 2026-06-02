---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Conecta ChatGPT de OpenAI a los datos de tu iglesia en B1 para que puedas hacer preguntas como "¿quién no ha estado en un grupo este trimestre?" o "resumir donaciones para el fondo de construcción este mes" y que ChatGPT extraiga las respuestas directamente de B1. Se admiten dos caminos: un **GPT personalizado** que funciona en cualquier plan de ChatGPT Plus, y el **servidor MCP** para herramientas de desarrollo que lo admiten.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Un administrador de iglesia con el permiso **Editar configuración** (para acuñar una clave API)
- Una cuenta de **ChatGPT Plus, Pro, Team o Enterprise** (el nivel gratuito no puede usar GPTs personalizados o conectores)
- La URL completa de tu B1 API -- generalmente `https://api.churchapps.org` para iglesias alojadas, o tu host Api autohospedado

</div>

## Elegir el camino correcto

| Camino | Plan necesario | Esfuerzo | Lo que obtienes |
|---|---|---|---|
| **GPT personalizado con acciones** | ChatGPT Plus / Team / Enterprise | 10 minutos | Un GPT compartible que llama a la API REST de B1 para cualquier compañero de equipo usar |
| **MCP a través de herramientas de OpenAI** | Desarrollador / Agent SDK / Pro Connectors | Más | Descubrimiento completo a través del servidor MCP, adecuado para herramientas de codificación y plataformas de agentes |

Para la mayoría de las iglesias el camino **GPT personalizado** es la respuesta correcta -- no requiere configuración de desarrollador, funciona dentro de la aplicación normal de ChatGPT y clientes móviles, y puede ser compartido con tu equipo. El camino MCP se documenta a continuación para personal técnico que usa herramientas de desarrollador de OpenAI o plataformas de agentes.

## Camino A -- GPT personalizado con acciones

Esto conecta ChatGPT directamente a la API REST de B1. Tu GPT personalizado podrá leer y (opcionalmente) escribir registros de B1 en nombre de quienquiera que lo use.

### 1. Crear una clave API

1. En B1Admin ve a **Configuración → Desarrollador → Claves API**.
2. Haz clic en **Nueva clave API**, nómbrala `ChatGPT`, y elige ámbitos. Los conjuntos iniciales comunes:
   - **Asistente de solo lectura:** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Lectura + escritura:** agrega los ámbitos `:write` correspondientes
3. Guarda y copia la clave completa `cak_…`.

Ver [Claves API](/docs/developer/api/api-keys) para la lista de ámbitos completa.

### 2. Construir el GPT personalizado

1. En ChatGPT, haz clic en tu perfil → **Mis GPTs** → **Crear un GPT**.
2. Cambia a la pestaña **Configurar** y da al GPT un nombre (p. ej. "Asistente B1") e instrucciones como:

   ```
   Ayudas al personal de la iglesia a consultar sus registros de B1. Usa las acciones de la API de B1 para
   buscar personas, grupos, asistencia, donaciones y contenido. Siempre limita
   las respuestas a datos que el usuario tiene permiso de ver. Sé conciso.
   ```

3. Desplázate a **Acciones** → **Crear nueva acción** → **Autenticación**.
   - **Tipo de autenticación:** Clave API
   - **Clave API:** `cak_<prefijo>.<secreto>`
   - **Tipo de autenticación:** Portador
   - Guarda.
4. En el cuadro **Esquema**, pega una especificación mínima de OpenAPI describiendo los puntos finales que quieres que use el GPT. Un iniciador que cubre las lecturas más comunes:

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
         summary: Obtener una persona única por id
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

   Expande el esquema con más puntos finales según sea necesario -- cada ruta autenticada en B1 acepta la misma clave `cak_…`. La [referencia de API REST](/docs/developer/api/endpoints) enumera lo que está disponible.

5. Guarda la acción. Pruébala con un mensaje como *"¿cuántas personas hay en la iglesia?"* -- ChatGPT llamará a `listPeople` y responderá.
6. **Publica** el GPT (Solo yo / Cualquiera con el enlace / Organización) y comparte con tu equipo.

### 3. Úsalo

Cualquiera con quien compartas el GPT puede hacer preguntas en lenguaje natural -- ChatGPT elige la acción correcta, llama a B1 y responde. Los ámbitos de la clave aún se aplican: una clave de solo lectura rechazará escrituras independientemente de la acción definida en el esquema.

## Camino B -- MCP a través de herramientas de OpenAI

La API de B1 incluye un servidor MCP en `/mcp` que cualquier herramienta consciente de MCP puede usar -- por ejemplo el [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents), la herramienta MCP de la API de respuestas, o plataformas de agentes de terceros que consumen servidores MCP.

Auténtica con la misma clave `cak_…` en el encabezado `Autorización: Portador`. Se exponen tres herramientas: `list_endpoints`, `describe_endpoint`, y `api_call`. Ver la [referencia para desarrolladores del servidor MCP](/docs/developer/api/mcp) para el protocolo, transporte y esquemas de herramientas.

Los "Conectores" integrados de ChatGPT (Pro/Business/Enterprise) actualmente esperan servidores MCP con formas de herramienta específicas de `search` y `fetch` y autenticación basada en OAuth, que el servidor MCP de B1 no publicita. Para ChatGPT dentro de la aplicación de consumidor, el camino GPT personalizado anterior es la opción práctica.

## Seguridad y límites

- **Aislamiento por iglesia.** La clave API se resuelve a una iglesia. ChatGPT no puede ver datos de otras iglesias.
- **Limitado por permiso.** Si eliminas un permiso de la persona que acuñó la clave, ChatGPT lo pierde en la siguiente llamada -- instantáneamente.
- **Revocable.** Elimina la clave en **Configuración → Desarrollador → Claves API** y el acceso de ChatGPT termina inmediatamente.
- **Compartir un GPT personalizado comparte los datos.** Cualquiera con acceso al GPT puede hacerle preguntas y ver lo que los ámbitos de la clave permiten. Limita la compartición a personal que debería ver esos datos, y prefiere ámbitos más estrechos (p. ej. omitir `donations:read` para un GPT compartido ampliamente).
- **Rastro de auditoría.** Las mutaciones pasan por el mismo registro de auditoría que las acciones de B1Admin; revisalas en **Reportes → Registro de auditoría**.

## Costo

ChurchApps es gratuito y de código abierto -- la API que tu GPT personalizado llama es parte de la API que tu iglesia ya ejecuta. OpenAI cobra por el uso de ChatGPT según sus planes. No hay un costo por llamada desde ChurchApps.

## Solución de problemas

**Acción devuelve 401:** el encabezado portador no está configurado correctamente. En el panel de autenticación de la acción asegúrate de que **Tipo de autenticación: Portador** está seleccionado y el valor clave no incluye la palabra `Portador` (ChatGPT la antepone por ti).

**Acción devuelve 403:** la clave no tiene el ámbito para ese punto final. Acuña una nueva clave con los ámbitos correctos y actualiza el GPT.

**ChatGPT llama a la acción equivocada:** ajusta los campos `summary` y `description` en tu esquema de OpenAPI para que el modelo elija el correcto. Agregar consultas de ejemplo a las instrucciones del GPT también ayuda.

**El panel de acciones rechaza el esquema:** ChatGPT requiere OpenAPI 3.1 con al menos una entrada de `paths` y una URL de `servers`. Valida el YAML en cualquier validador de OpenAPI en línea antes de pegar.

**Desarrollo local:** apunta a la URL de `servers` de la acción a tu API local (p. ej. `http://localhost:8084`) -- pero nota que las acciones de ChatGPT solo llaman a URLs públicas, así que para pruebas locales usa un túnel como `ngrok` o golpea la API directamente con `curl` para confirmar la clave primero.

## Relacionado

- [Claves API](/docs/developer/api/api-keys) -- referencia de ámbitos completa
- [Servidor MCP (referencia para desarrolladores)](/docs/developer/api/mcp) -- detalles de protocolo y esquemas de herramientas
- [Claude](./claude) -- la misma idea, para los modelos de Anthropic
- [Referencia de API REST](/docs/developer/api/endpoints) -- cada punto final que una acción de GPT personalizado puede golpear
