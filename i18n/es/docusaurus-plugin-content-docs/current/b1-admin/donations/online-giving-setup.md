---
title: "Configuración de Donaciones en Línea"
---

# Configuración de Donaciones en Línea

<div class="article-intro">

B1 Admin se integra con **Stripe** y **PayPal** para que tus miembros puedan donar en línea a través de tu sitio B1.church. Una vez configurado, las donaciones en línea aparecen automáticamente en tus registros de donaciones junto con los regalos ingresados manualmente, manteniendo todo en un sistema.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Configura tus [fondos de donación](funds.md) para que los donantes puedan designar sus regalos
- Crea una cuenta Stripe en [stripe.com](https://stripe.com) y actívala (sácala del modo de prueba)
- Ten tus credenciales de inicio de sesión de B1 Admin listas

</div>

## Configurar Stripe

1. Crea una cuenta en [stripe.com](https://stripe.com) si no tienes una. Asegúrate de **activar tu cuenta** y sacarla del modo de prueba.
2. En Stripe, ve a **Developers > API Keys**.
3. Copia tu **Clave Publicable**.
4. Inicia sesión en [B1 Admin](https://admin.b1.church/).
5. Haz clic en **Church** en la navegación superior, luego haz clic en **Edit Church Settings**.
6. Haz clic en el icono de editar junto a **Church Settings**.
7. Desplázate hacia abajo hasta la sección **Giving**.
8. Establece el **Provider** en **Stripe**.
9. Pega tu Clave Publicable en el campo **Public Key**.
10. Vuelve a Stripe y revela tu **Clave Secreta** (solo puedes verla una vez, así que guarda una copia de seguridad).
11. Pega la Clave Secreta en el campo **Secret Key** y haz clic en **Save**.

:::warning
Tu Clave Secreta de Stripe solo se muestra una vez. Cópiala en una ubicación segura antes de navegar fuera del panel de Stripe. Si la pierdes, necesitarás generar una nueva clave.
:::

## Elegir Tu Moneda

Después de seleccionar Stripe como tu proveedor, aparece un menú desplegable de **Currency** junto a tus claves API. Elige la moneda que coincida con la moneda de liquidación de tu cuenta Stripe para que las donaciones se cobren correctamente.

Las monedas soportadas incluyen USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN y BRL. Puedes confirmar o cambiar la moneda predeterminada de tu cuenta en tu [Panel de Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La moneda que selecciones aquí se utiliza para donaciones únicas, suscripciones recurrentes, cálculos de tarifas e informes de donaciones. Si cambias monedas más adelante, solo las donaciones y suscripciones nuevas usarán la nueva moneda; los regalos recurrentes existentes continúan en la moneda en la que se crearon.
:::

:::warning
Asegúrate de que tu cuenta Stripe está configurada para aceptar la moneda que elijas. Si tu cuenta Stripe no admite la moneda seleccionada, las donaciones fallarán en el proceso de pago.
:::

## Agregar una Página de Donación a Tu Sitio B1.church

1. Ve a [b1.church](https://b1.church/) e inicia sesión.
2. Haz clic en el icono de **Settings**.
3. Haz clic en **Add Tab**.
4. Elige **Donation** como el tipo.
5. Ingresa un nombre para la pestaña (por ejemplo, "Give") y haz clic en **Save**.
6. Opcionalmente, cambia el icono de la pestaña; escribe "Giv" en la búsqueda de iconos para encontrar un icono relacionado con donaciones.

Tu página de donación ahora está activa. Los miembros pueden visitarla en `yoursubdomain.b1.church/donate`.

## Compartir Tu Enlace de Donación

Para encontrar tu URL de donación, ve a **B1 Admin** y haz clic en el icono de **Settings** para ver tu subdominio. Tu enlace de donación sigue el formato:

`https://yoursubdomain.b1.church/donate`

Comparte este enlace en tu sitio web, en correos electrónicos o en tu boletín para que los miembros sepan dónde donar en línea.

## Notificaciones de Donación

Stripe envía una notificación por correo electrónico cada vez que se recibe una donación. Para cambiar la dirección de correo electrónico de notificación, ve al panel de Stripe, haz clic en tu perfil en la esquina superior derecha, elige **Profile** y actualiza tu dirección de correo electrónico.

## Opciones de Tarifa de Procesamiento

Puedes configurar tu página de donación para permitir que los donantes cubran opcionalmente las tarifas de procesamiento para que tu iglesia reciba el monto completo de la donación. Esta configuración se administra en la configuración de tu iglesia dentro de B1 Admin.

:::tip
Después de la configuración, realiza una pequeña donación de prueba para confirmar que todo funciona antes de anunciar donaciones en línea a tu congregación.
:::

## Próximos Pasos

- Usa [Stripe Import](stripe-import.md) para extraer transacciones en línea a B1 Admin si no se sincronizan automáticamente
- Revisa tus [Donation Reports](donation-reports.md) para verificar que las donaciones en línea estén apareciendo correctamente
- Genera [Giving Statements](giving-statements.md) que incluyan donaciones en línea y fuera de línea
