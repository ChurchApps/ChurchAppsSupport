---
title: "Make"
description: "Conecte B1 Admin con Make para automatizar flujos de trabajo: cree una clave de API, configure el disparador y las acciones de B1.church, y resuelva los errores comunes."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (antes Integromat) es una plataforma visual de automatización de flujos de trabajo, similar en espíritu a Zapier, con una lógica más flexible y una factura más económica a gran escala. La aplicación oficial de Make para B1.church le permite crear "escenarios" que reaccionan al instante a los eventos de B1 y escriben registros de vuelta en B1.

</div>

:::caution Todavía no disponible
La aplicación de Make para B1.church todavía no está publicada en el directorio de aplicaciones de Make, así que hoy no puede agregar los módulos de **B1.church** que aparecen más abajo a un escenario. Mientras tanto, use [Zapier](./zapier.md), o llame a la [API REST](/docs/developer/api) de B1 desde el módulo **HTTP — Make a request** de Make con una [clave de API](/docs/developer/api/api-keys). Todo lo que aparece a continuación describe cómo funcionará la aplicación una vez publicada.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Make](https://www.make.com) (el plan gratuito cubre flujos de trabajo pequeños)
- Un administrador de la iglesia con el permiso **Edit Settings** en B1Admin
- Una idea general del escenario que desea crear

</div>

## Módulos {#modules}

| Tipo | Qué es | Evento / endpoint de B1 |
|---|---|---|
| **Instant Trigger** | Watch Events | cualquier evento de B1 suscrito (`person.created`, `donation.created`, …) |
| **Action** | Create Person | agrega una persona nueva |
| **Action** | Add Donation | registra una donación |
| **Action** | Add Group Member | agrega una persona a un grupo |
| **Search** | Search People | busca personas por nombre o correo electrónico |

El disparador instantáneo le permite elegir qué evento escuchar: un módulo disparador por escenario, configurado para cada evento.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-create-a-b1-api-key}

1. En B1Admin vaya a **Settings → Developer → API Keys**.
2. Haga clic en **New API Key**, póngale el nombre "Make" y otorgue los scopes que necesite.
3. **Incluya `settings:write`** si alguno de sus escenarios usa el disparador instantáneo: Make registra un webhook en su nombre cuando se activa el escenario.
4. Otorgue también los scopes que necesiten los módulos de acción (por ejemplo, `donations:write` para el módulo Add Donation).
5. Guarde y copie la clave `cak_…`.

### 2. Instale la conexión {#2-install-the-connection}

1. En Make, cree un escenario nuevo y arrastre el módulo disparador **B1.church** al lienzo.
2. Cuando se le pida, haga clic en **Create a connection**. Pegue la clave de API en el campo *API Key* y deje *API Base URL* como `https://api.churchapps.org` (a menos que esté haciendo pruebas en el entorno de staging).
3. Haga clic en **Save**: Make prueba la clave leyendo el perfil de su iglesia.

La conexión se guarda en su cuenta de Make y se reutiliza en todos los escenarios.

### 3. Configure el disparador {#3-configure-the-trigger}

1. Abra la configuración del módulo **Watch Events**.
2. Elija el evento que desea, por ejemplo, `donation.created`.
3. Guarde. Make genera una URL de webhook única y la almacena internamente.

### 4. Agregue módulos posteriores {#4-add-downstream-modules}

Arrastre al lienzo cualquiera de los cientos de módulos de aplicaciones de Make: Mailchimp, Google Sheets, Slack, HubSpot, su propio endpoint HTTP, etc. Asigne la salida del disparador (`event`, `churchId`, `data.id`, `data.amount`, …) a sus campos de entrada. Los módulos de aplanado, iterador, enrutador y agregador de Make le permiten crear flujos ramificados y paralelos que serían difíciles en Zapier.

### 5. Active el escenario {#5-turn-the-scenario-on}

Active **Active** en el encabezado del escenario. Make llama a `POST /membership/webhooks` de B1 para registrar la URL. A partir de ese momento, cada evento de B1 que coincida fluye por el escenario en tiempo real.

Al desactivar el escenario se llama a `DELETE /membership/webhooks/{id}`, de modo que no quedan suscripciones huérfanas.

## Recetas comunes {#common-recipes}

### Sincronizar donaciones con una hoja de Google para la revisión financiera {#sync-donations-to-a-google-sheet-for-finance-review}

- **Disparador**: B1: Watch Events (`donation.created`)
- **Acción**: Google Sheets: Add a Row. Asigne `data.donationDate`, `data.amount`, `data.personId`, `data.method` y `data.batchId` a las columnas de la hoja.

### Notificación condicional de Slack según el monto de la donación {#conditional-slack-notification-by-donation-amount}

- **Disparador**: B1: Watch Events (`donation.created`)
- **Enrutador**:
  - Rama A: Filter: `data.amount >= 1000` → Slack: publicar en `#major-gifts`
  - Rama B: caso alternativo → Slack: publicar en `#donations`

### Persona nueva → CRM + correo de bienvenida + Slack {#new-person--crm--welcome-email--slack}

- **Disparador**: B1: Watch Events (`person.created`)
- **Acción**: HubSpot: Create Contact
- **Acción**: Mailgun: Send Welcome Email
- **Acción**: Slack: Notificar a `#new-people` (en paralelo, usando el enrutador de Make)

## Cómo funciona el disparador instantáneo {#how-the-instant-trigger-works}

El disparador instantáneo se basa en webhooks, no en sondeo: al activarse, Make llama a `POST /membership/webhooks` con la URL generada y el evento que usted eligió. Cuando el evento ocurre en B1, B1 envía la carga a la URL de Make y su escenario se ejecuta en cuestión de segundos. Al desactivar el escenario se elimina el webhook.

El disparador solo se activa con eventos que ocurren **mientras el escenario está activo**. No hay recuperación de eventos anteriores.

## Límites y notas {#limits--notes}

- **Un evento por módulo Watch Events.** Para escuchar varios eventos, cree un escenario por evento.
- **La verificación de firma no está expuesta**: Make no pasa `X-B1-Signature` al escenario; el límite de confianza es la URL de webhook por escenario, que es imposible de adivinar. Esta es una práctica normal en Make. Si necesita verificaciones de firma explícitas, cree una integración personalizada con el [SDK](/docs/developer/api/webhooks#sdk-support).
- **Cantidad de operaciones**: cada llamada a la API desde un módulo de acción cuenta contra su cuota de operaciones de Make, no contra nada del lado de B1.

## Solución de problemas {#troubleshooting}

- **Falla la prueba de conexión**: casi siempre es un error de escritura en la clave de API. Cópiela de nuevo desde B1Admin (la clave completa solo se muestra una vez; si la perdió, cree una clave nueva).
- **El módulo disparador no se activa**: revise **Settings → Developer → Webhooks** en B1Admin. Si después de activar el escenario no ve una fila "Make — &lt;event&gt;", la clave no tiene `settings:write`. Actualice la clave y vuelva a activar el escenario.
- **La acción devuelve `403 Forbidden`**: la clave de API no tiene el scope para ese endpoint. Por ejemplo, Add Donation necesita `donations:write`. Actualice la clave en B1Admin y vuelva a probarla.

## ¿Falta un módulo? {#missing-a-module}

Si necesita un módulo que no existe (por ejemplo, una acción nueva para un endpoint que todavía no cubrimos), escriba a [support@churchapps.org](mailto:support@churchapps.org). Mientras tanto, el módulo **HTTP — Make a request** de Make puede llamar a cualquier endpoint de B1 con un encabezado `Authorization: Bearer cak_…`.

## Vea también {#see-also}

- [Zapier](./zapier.md): el mismo patrón con una interfaz más sencilla y un catálogo de aplicaciones más amplio
- [Slack y Discord](./slack-discord.md): notificaciones de chat integradas, sin Make
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks)
