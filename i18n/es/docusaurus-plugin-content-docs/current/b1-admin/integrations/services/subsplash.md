---
title: "Subsplash"
description: "Conecte las donaciones, las personas nuevas y las respuestas de formularios de Subsplash con B1 mediante Zapier, para que las donaciones y los perfiles lleguen automáticamente a B1 Admin."
---

# Subsplash

<div class="article-intro">

Si usa Subsplash para la aplicación de su iglesia, las donaciones o los formularios, pero quiere que B1 sea el sistema de registro de personas y donaciones, la aplicación de Zapier de Subsplash puede enviar donaciones, perfiles nuevos y respuestas de formularios a B1 en tiempo real. Tenga en cuenta que la aplicación de Zapier de Subsplash es actualmente **solo de disparadores**: la conexión es unidireccional (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de Subsplash con un plan que incluya acceso a **API + Zapier** (consulte con su Client Success Manager de Subsplash: estas funciones dependen del nivel del plan)
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

Todos los disparadores de abajo son de Subsplash. Las acciones son de B1.

| Disparador de Subsplash | Acción de B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person si no existe) |
| New Pledge | Add Donation (con `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (no hay una acción directa en B1; regístrelo en una hoja de Google para revisión manual) |
| New Form Response | Create Person + (opcionalmente) Add Group Member según el formulario |

Por ahora, Subsplash → B1 es la única dirección que admite la aplicación de Subsplash.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

En B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read`: para buscar al donante por correo electrónico
- `people:write`: para crearlo si no existe
- `donations:write`: para registrar el donativo
- `settings:write`: Zapier verifica cada clave de B1 contra la lista de webhooks de B1 al conectarla, así que la conexión falla sin este permiso (aunque en este caso el disparador lo maneja Subsplash, no B1)

### 2. Conecte Subsplash con Zapier {#2-connect-subsplash-to-zapier}

Siga la [guía de integración de Subsplash con Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash emite un token de API desde su panel, y Zapier lo usa para autenticar el lado del disparador.

### 3. Cree el Zap "registrar una donación" {#3-build-the-record-a-donation-zap}

1. **Disparador**: Subsplash: New Donation
2. **Acción**: B1.church: Find Person (por correo electrónico)
3. **Acción**: B1.church: Add Donation, usando el id de la persona del paso 2. Asigne el monto, la fecha, el fondo, method = "Online" y notes = el id de la transacción de Subsplash.

*Find Person* de B1 detiene el Zap con un error "No person found" cuando nadie coincide, así que un paso de Filter o Path no puede bifurcarse según ese resultado. Para manejar a los donantes que dan por primera vez, active el manejo de errores de Zapier para el paso Find Person y, en su ruta de error, ejecute B1.church: Create Person → B1.church: Add Donation (usando el id de la persona recién creada).

Active el Zap. Las futuras donaciones de Subsplash aparecerán en **B1Admin → Donations** en cuestión de segundos.

## Recetas comunes {#common-recipes}

### Enviar un agradecimiento cuando llega un primer donativo {#send-a-thank-you-when-a-first-time-gift-lands}

- **Disparador**: Subsplash: New Donation
- **Acción**: Filter by Zapier: continúe solo si es el primer donativo de la persona (use una *Lookup Table* con el correo electrónico del donante contra una hoja de Google con los donantes anteriores, o un paso *Paths* de Zapier según la fecha de creación del donante)
- **Acción**: Mailchimp / SMTP / SendGrid: enviar el mensaje de agradecimiento por el primer donativo
- **Acción**: B1.church: Add Donation (como de costumbre)

### Separar las promesas del flujo de donaciones regulares {#filter-pledges-off-the-regular-giving-flow}

- **Disparador**: Subsplash: New Pledge
- **Acción**: B1.church: Add Donation con `notes = "Pledge — Subsplash"` y un fondo llamado `Pledges` (separado de su fondo operativo) para poder reportar las promesas por separado en **B1Admin → Donations → Summary**.

### Sincronizar a los nuevos usuarios de la aplicación como personas de B1 {#sync-new-app-users-as-b1-people}

- **Disparador**: Subsplash: New Person Created
- **Acción**: B1.church: Create Person, con nombre, correo electrónico y teléfono. Etiquételos en B1 agregando a la persona nueva a un grupo como "Usuarios de la app Subsplash".

## Límites y notas {#limits--notes}

- **La aplicación de Zapier de Subsplash es solo de disparadores.** Si quiere cambios del lado de B1 (por ejemplo, que una persona nueva de B1 también aparezca en Subsplash), tendría que crear ese puente a partir de los disparadores de la aplicación de Zapier de B1 que llamen a la API REST de Subsplash mediante una acción personalizada *Webhooks by Zapier — POST*. Eso es una integración personalizada, no una receta.
- **El acceso a la API depende del plan.** Si la conexión de Zapier falla con `403 Forbidden`, es probable que su plan de Subsplash no incluya acceso a la API; comuníquese con su Client Success Manager.
- **La asignación de fondos es manual.** Subsplash envía el nombre de una campaña o categoría, y B1 necesita uno de sus propios fondos. Puede elegir el fondo en el menú desplegable **Fund** del paso Add Donation, o mantener una *Lookup Table* de Zapier que asigne las campañas de Subsplash a los fondos de B1.

## Solución de problemas {#troubleshooting}

- **Ningún disparador se activa después de una donación**: verifique en el panel de Zapier de Subsplash que la conexión siga mostrando *Connected*. Si el token de API se rotó del lado de Subsplash, el Zap se detiene sin aviso; vuelva a conectarlo.
- **B1 *Add Donation* registra el donativo sin fondo**: el campo **Fund** estaba vacío o asignado a un valor que no es un id de fondo de B1. Elija el fondo en el menú desplegable **Fund** del paso (muestra los fondos de **Donations > Funds** en B1Admin), o asigne una Lookup Table que devuelva ids de fondos de B1.
- **El primer donativo activa el disparador dos veces**: Subsplash a veces vuelve a enviar un disparador si Zapier no confirmó su recepción. Agregue un *Filter by Zapier* sobre el id de la donación (Subsplash lo envía en la carga) para eliminar los duplicados.

## Vea también {#see-also}

- [Donorbox](./donorbox.md): la misma forma de receta, con otra plataforma de donaciones
- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier
- [Guía de integración de Subsplash con Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentación de Subsplash)
