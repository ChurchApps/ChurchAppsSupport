---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Si usas Subsplash para la aplicación de tu iglesia, las ofrendas o los formularios, pero quieres que B1 sea el sistema de registro para personas y donaciones, la aplicación de Zapier de Subsplash puede enviar donaciones, nuevos perfiles y respuestas de formularios a B1 en tiempo real. Ten en cuenta que la aplicación de Zapier de Subsplash actualmente es **solo de disparadores**: la conexión es unidireccional (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de Subsplash con un plan que incluya acceso a **API + Zapier** (consulta con tu Client Success Manager de Subsplash; estas funciones dependen del nivel del plan)
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puedes configurar

Todos los disparadores siguientes son de Subsplash. Las acciones son de B1.

| Disparador de Subsplash | Acción de B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person si no existe) |
| New Pledge | Add Donation (con `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (no hay una acción directa en B1; registrar en una hoja de Google para revisión manual) |
| New Form Response | Create Person + (opcionalmente) Add Group Member según el formulario |

Por ahora, la dirección Subsplash → B1 es la única que admite la aplicación de Subsplash.

## Configuración

### 1. Crea una clave de API de B1

En B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read`: para buscar al donante por correo electrónico
- `people:write`: para crearlo si no existe
- `donations:write`: para registrar la donación
- (No se necesita `settings:write`: aquí el disparador lo controla Subsplash, no B1).

### 2. Conecta Subsplash con Zapier

Sigue la [guía de integración de Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Ellos emiten un token de API desde el Dashboard de Subsplash que Zapier usa para autenticar el lado del disparador.

### 3. Crea el Zap de "registrar una donación"

1. **Disparador:** Subsplash: New Donation
2. **Acción:** B1.church: Find Person (por correo electrónico)
3. **Filtro / Ruta:** bifurca según "person found":
   - **Encontrada:** B1.church: Add Donation. Asigna el monto, la fecha, el fondo, el método = "Online" y las notas = el id de la transacción de Subsplash.
   - **No encontrada:** B1.church: Create Person → B1.church: Add Donation (usando el id de la persona recién creada).

Activa el Zap. Las futuras donaciones de Subsplash llegarán a **B1Admin → Donations** en segundos.

## Recetas comunes

### Envía un agradecimiento cuando llegue una primera ofrenda

- **Disparador:** Subsplash: New Donation
- **Acción:** Filter by Zapier: continúa solo si es la primera ofrenda del donante (usa un *Lookup Table* con el correo electrónico del donante contra una hoja de Google con los donantes anteriores, o un paso *Paths* de Zapier basado en la fecha de creación del donante)
- **Acción:** Mailchimp / SMTP / SendGrid: envía el mensaje de agradecimiento por la primera ofrenda
- **Acción:** B1.church: Add Donation (como de costumbre)

### Separa las promesas del flujo de ofrendas regular

- **Disparador:** Subsplash: New Pledge
- **Acción:** B1.church: Add Donation con `notes = "Pledge — Subsplash"` y un fondo llamado `Pledges` (separado de tu fondo operativo) para que puedas informar sobre las promesas por separado en **B1Admin → Donations → Summary**.

### Sincroniza los nuevos usuarios de la aplicación como personas de B1

- **Disparador:** Subsplash: New Person Created
- **Acción:** B1.church: Create Person, completando nombre, correo electrónico y teléfono. Etiqueta en B1 agregando a la nueva persona a un grupo como "Subsplash App Users".

## Límites y notas

- **La aplicación de Zapier de Subsplash es solo de disparadores.** Si quieres que los cambios del lado de B1 (por ejemplo, una nueva persona en B1 que también aparezca en Subsplash) se reflejen, tendrías que crear ese puente desde los disparadores de la aplicación de Zapier de B1, llamando a la REST API de Subsplash mediante una acción personalizada *Webhooks by Zapier — POST*. Eso es una integración personalizada, no una receta.
- **El acceso a la API depende del plan.** Si la conexión con Zapier falla con `403 Forbidden`, es probable que tu plan de Subsplash no incluya acceso a la API; contacta a tu Client Success Manager.
- **La asignación de fondos es manual.** Subsplash envía el nombre de una campaña o categoría, pero B1 necesita un id numérico de fondo. Puedes fijar el fondo en el Zap o mantener un *Lookup Table* de Zapier que relacione las campañas de Subsplash con los fondos de B1.

## Solución de problemas

- **Ningún disparador se activa después de una donación:** verifica en el panel de Zapier de Subsplash que la conexión todavía muestre *Connected*. Si el token de API se rotó del lado de Subsplash, el Zap se detiene en silencio; vuelve a conectarlo.
- **B1 *Add Donation* falla con 422:** lo más común es un `fundId` faltante o no reconocido. Lista tus fondos en **B1Admin → Donations → Funds** y copia el id exacto en el paso del Zap.
- **La primera ofrenda activa el disparador dos veces:** Subsplash a veces vuelve a enviar un disparador si Zapier no recibió su confirmación. Agrega un *Filter by Zapier* sobre el id de la donación (Subsplash lo envía en la carga) para descartar duplicados.

## Consulta también

- [Donorbox](./donorbox): la misma estructura de receta, pero con otra plataforma de donaciones
- [Zapier (descripción general)](../zapier): el lado de B1 de cada receta de Zapier
- [Guía de integración de Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentación de Subsplash)
