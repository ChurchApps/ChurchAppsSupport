---
title: "Guía: configurar la donación en línea"
description: "Configure la donación en línea en B1 Admin creando fondos de donación, conectando Stripe y añadiendo una página de donaciones a su sitio web de B1.church para los miembros."
---

# Configurar la donación en línea

<div class="article-intro">

Recorra todo lo necesario para aceptar donaciones en línea en su iglesia: desde crear los fondos de donación, hasta conectar Stripe para el procesamiento de pagos y compartir la página de donaciones con su congregación. Al final, los miembros podrán donar en línea a través de su sitio web y su app móvil.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador: consulte [Roles y permisos](../people/roles-permissions.md)
- Una cuenta de Stripe (cree una gratis en [stripe.com](https://stripe.com) si la necesita)

</div>

## Paso 1: crear los fondos de donación {#step-1-create-donation-funds}

Los fondos son las categorías a las que pueden donar los donantes. Necesita al menos un fondo antes de poder aceptar donaciones.

Siga la guía de [Fondos](../donations/funds.md) para configurar sus categorías de donación:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Donaciones > Fondos** y haga clic en **Añadir fondo**
2. Cree sus fondos más comunes (por ejemplo, "Fondo general", "Fondo para el edificio", "Misiones")
3. Marque **Deducible de impuestos** en los fondos cuyos donativos deban aparecer en los estados de donación de fin de año, y deje marcada la opción **Visible para los donantes** en los fondos que los donantes deban poder elegir en línea

:::tip
Puede añadir más fondos en cualquier momento. Empiece con sus categorías de donación más comunes.
:::

## Paso 2: conectar Stripe {#step-2-connect-stripe}

Stripe se encarga de todo el procesamiento de pagos. Conectará su cuenta de Stripe con B1 Admin para que las donaciones lleguen a su cuenta bancaria.

Siga la guía de [Configuración de donación en línea](../donations/online-giving-setup.md) para conectar Stripe:

1. Inicie sesión en su panel de Stripe y vaya a **Desarrolladores > Claves de API** para encontrar su Clave publicable y su Clave secreta
2. En B1 Admin, vaya a **Configuración**, haga clic en **Editar** en la sección **Donaciones** y configure el **Proveedor** como **Stripe**
3. Pegue la Clave publicable en **Clave pública** y la Clave secreta en **Clave secreta**, verifique la **Moneda** y haga clic en **Guardar**

B1 también admite **Kingdom Funding** y **Paystack** (para iglesias en África) como proveedores de donaciones; consulte [Configuración de donación en línea](../donations/online-giving-setup.md).

:::warning
Stripe muestra su Clave secreta solo una vez. Cópiela y guárdela antes de salir del panel de Stripe. Si la pierde, tendrá que generar una nueva.
:::

## Paso 3: añadir una página de donaciones a su sitio web {#step-3-add-a-giving-page-to-your-website}

Facilite la donación añadiendo una página de donaciones a su sitio web de B1.

Siga las guías de [Configuración de donación en línea](../donations/online-giving-setup.md) y [Administrar páginas](../website/managing-pages.md) para:

1. Añadir una pestaña **Donación** a su sitio de B1.church (o un elemento **Donación** a una página en el creador de sitios web)
2. Su URL de donaciones será: `https://yoursubdomain.b1.church/donate`
3. Los miembros pueden donar sin iniciar sesión (página pública) o iniciar sesión para usar métodos de pago guardados y ver su historial de donaciones
4. Para enviar a los donantes directamente a un solo fondo, haga clic en **Enlace de donación** en ese fondo en **Donaciones > Fondos** para copiar un enlace (o descargar un código QR) con el fondo y el monto preestablecidos

## Paso 4: hacer una donación de prueba {#step-4-make-a-test-donation}

Antes de anunciarlo a su congregación, verifique que todo funcione.

1. Haga una pequeña donación de prueba para verificar que el flujo funciona de principio a fin
2. Compruebe que la donación aparezca en B1 Admin en **Donaciones > Lotes**

:::tip
Para verificar sin cobros reales, puede guardar primero las claves de prueba de Stripe y luego reemplazarlas por sus claves reales en **Configuración > Donaciones** antes de anunciarlo a su congregación.
:::

## Paso 5: anunciarlo a su congregación {#step-5-announce-to-your-congregation}

Difunda la noticia para que los miembros sepan que pueden donar en línea.

1. Comparta la URL de donaciones a través de su sitio web, boletines por correo electrónico, boletines impresos y redes sociales
2. Los miembros también pueden donar a través de la [App de B1](../../b1-church/giving/index.md): la función de donaciones está integrada

:::info
Los miembros que inicien sesión pueden guardar métodos de pago, configurar donativos recurrentes y ver su historial de donaciones. La donación anónima también funciona, sin necesidad de iniciar sesión.
:::

## Paso 6: administración continua {#step-6-ongoing-management}

Mantenga sus registros de donación al día y genere informes durante todo el año.

1. Las donaciones en línea se registran automáticamente. Use la [Importación de Stripe](../donations/stripe-import.md) para detectar las transacciones de Stripe que no se sincronizaron: haga clic en **Vista previa** para ver lo que falta y luego en **Importar faltantes**
2. [Vea los informes de donaciones](../donations/donation-reports.md) en **Donaciones > Resumen** para dar seguimiento a las tendencias de donación y a los totales por fondo
3. Revise **Donaciones > Donativos fallidos** para ver los donativos recurrentes cuya tarjeta fue rechazada, y haga clic en **Reintentar** cuando el donante actualice su método de pago
4. [Genere los estados de donación de fin de año](../donations/giving-statements.md) para los registros fiscales de sus donantes

:::tip
Haga una vista previa de la Importación de Stripe antes de cerrar cada mes para que sus registros coincidan con Stripe. Consulte la [Guía de informes de fin de año](./year-end-reports.md) para ver el proceso completo de fin de año.
:::

## ¡Listo! {#youre-done}

Su iglesia ya acepta donaciones en línea. Los miembros pueden donar a través de su sitio web, de la app de B1 o de cualquier dispositivo con navegador web. Todas las donaciones se registran automáticamente en B1 Admin.

## Artículos relacionados {#related-articles}

- [Fondos](../donations/funds.md): cree y administre las categorías de donación
- [Lotes](../donations/batches.md): organice las donaciones en grupos
- [Registrar donaciones](../donations/recording-donations.md): ingrese manualmente las donaciones en efectivo y cheque
- [Importación de Stripe](../donations/stripe-import.md): traiga las transacciones en línea a B1 Admin
- [Informes de donaciones](../donations/donation-reports.md): vea las tendencias y los totales de donación
- [Estados de donación](../donations/giving-statements.md): genere los estados fiscales de fin de año
- [Hacer donaciones](../../b1-church/giving/making-donations.md): la experiencia de donación de los miembros en B1.church y en la App de B1
