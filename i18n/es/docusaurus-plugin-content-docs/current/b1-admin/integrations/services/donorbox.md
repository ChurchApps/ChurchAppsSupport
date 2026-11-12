---
title: "Donorbox"
description: "Conecte Donorbox con B1 Admin mediante Zapier para que las donaciones en línea creen registros de donación y perfiles de donantes automáticamente, sin necesidad de exportar datos manualmente."
---

# Donorbox

<div class="article-intro">

Si su iglesia recibe donaciones a través de Donorbox pero registra a las personas y los estados de cuenta en B1, puede hacer que los disparadores instantáneos de Zapier de Donorbox creen registros de donación correspondientes dentro de B1, y que creen al donante como persona de B1 si todavía no existe. Sin conciliación manual ni exportación mensual.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Donorbox](https://donorbox.org) con al menos una campaña
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Lo que puede conectar {#what-you-can-wire-up}

| Dirección | Disparador de Donorbox | Acción de B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (instantáneo) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (recurrente) | Find Person → Add Donation (use el id del plan como nota) |

Donorbox publica sus disparadores como **instantáneos**: se activan en cuestión de segundos después de una donación real. No hay retraso de sondeo.

## Configuración {#setup}

### 1. Cree una clave de API de B1 {#1-mint-a-b1-api-key}

En B1Admin: **Settings → Developer → API Keys → New API Key**. Scopes:

- `people:read`: para buscar al donante por correo electrónico
- `people:write`: para crearlo si es nuevo
- `donations:write`: para registrar el donativo

- `settings:write`: Zapier verifica cada clave de B1 contra la lista de webhooks de B1 al conectarla, así que la conexión falla sin este permiso (aunque en este caso el disparador lo maneja Donorbox, no B1)

### 2. Cree el Zap "registrar una donación" {#2-build-the-record-a-donation-zap}

1. **Disparador**: Donorbox: New Donation. Conéctelo con la clave de API de Donorbox (en Donorbox: *Account → Profile → API Settings*).
2. **Acción**: B1.church: Find Person. Asigne el correo electrónico del donante que viene del disparador al campo *Email*.
3. **Acción**: B1.church: Add Donation. Asigne:
   - Person → el id del paso 2
   - Amount → el monto de la donación del disparador
   - Donation Date → la fecha de la donación del disparador
   - Fund → elija el fondo de B1 que refleje la campaña de Donorbox (Zapier le permite cambiar de fondo según un filtro o un paso de formato)
   - Method → "Online"
   - Notes → el id de la transacción de Donorbox (útil para conciliar)

Active el Zap. La siguiente donación en vivo a través de Donorbox aparecerá automáticamente en **B1Admin → Donations**.

*Find Person* de B1 detiene el Zap con un error "No person found" cuando nadie tiene ese correo electrónico, así que un paso de Filter no puede bifurcarse según ese resultado. Para manejar a los donantes que dan por primera vez, active el manejo de errores de Zapier para el paso Find Person y, en su ruta de error, ejecute B1.church: Create Person (asigne nombre, apellido y correo electrónico) y luego Add Donation con el id de la persona nueva. También puede ejecutar el Zap *New Donor* → *Create Person* de la tabla anterior para que los donantes existan en B1 antes de que llegue su donativo.

## Recetas comunes {#common-recipes}

### Un Zap por fondo {#one-zap-per-fund}

Si ejecuta varias campañas de Donorbox que corresponden a fondos separados de B1, la forma más limpia es un Zap por campaña, con un filtro de *campaign* de Donorbox al inicio; así la asignación de fondos queda fija y se evita el paso de búsqueda.

### Tratar las donaciones actualizadas como correcciones {#treat-updated-donations-as-corrections}

*New or Updated Donation* de Donorbox también se activa con las ediciones. Use un paso *Path* de Zapier sobre `event_type` para bifurcar: "new" → Add Donation, "updated" → Find Donation + Update (nota: la aplicación de Zapier de B1 todavía no tiene una acción Update Donation; por ahora, registre los eventos "updated" en un canal de Slack para revisión manual).

### Sincronizar los cambios de planes recurrentes con un canal de Slack {#sync-recurring-plan-changes-to-a-slack-channel}

- **Disparador**: Donorbox: New or Updated Plan
- **Acción**: Slack: Send Message a `#donations` (por ejemplo, "Cambió el plan: el donativo mensual de Sarah ahora es de $200")

## Límites y notas {#limits--notes}

- **Haga coincidir a los donantes por correo electrónico.** Donorbox no comparte el id de persona de B1; la única clave de unión duradera es el correo electrónico. Los donantes que den con un correo distinto crearán una nueva persona en B1: su conciliación mensual debe buscar estos casos.
- **Los reembolsos no se exponen por separado**: Donorbox emite una actualización de estado sobre la misma donación. La aplicación de Zapier de B1 no tiene actualmente una acción *Update Donation*; el patrón seguro por ahora es registrar los eventos de reembolso fuera del sistema y ajustar la donación manualmente.
- **Pruebe primero en el sandbox de Donorbox** para no crear donativos falsos en el B1 de producción. Donorbox proporciona credenciales de modo de prueba separadas de las de producción.

## Solución de problemas {#troubleshooting}

- **Errores "No person found"**: el donante todavía no está en B1 (o donó con otro correo electrónico). Agregue la ruta de error descrita arriba y verifique que la clave de API tenga `people:write` para que *Create Person* pueda ejecutarse.
- **El monto de la donación parece 100 veces mayor o menor**: Donorbox envía centavos en algunas variantes de carga y dólares en otras. Use un paso *Formatter by Zapier — Numbers* para dividir entre 100 si es necesario.
- **Donaciones duplicadas de un solo donativo**: Donorbox activa tanto *New Donation* como *Updated Donation*. Filtre por `event_type = "donation.succeeded"` o cree dos Zaps con filtros que no se solapen.

## Vea también {#see-also}

- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier
- [Subsplash](./subsplash.md): otra plataforma de donaciones con aplicación de Zapier
- [Mailchimp](./mailchimp.md): encadene "nuevo donativo" con una etiqueta de correo electrónico
