---
title: "Guía: Configurar las donaciones en línea"
description: "Configure las donaciones en línea en B1 Admin creando fondos de donación, conectando Stripe y añadiendo una página Donar a su sitio web B1.church para los miembros."
---

# Configurar las donaciones en línea

<div class="article-intro">

Repase todo lo necesario para aceptar donaciones en línea en su iglesia: desde crear los fondos de donación, pasando por conectar Stripe para el procesamiento de pagos, hasta compartir la página de ofrendas con su congregación. Al terminar, los miembros podrán dar en línea a través de su sitio web y de la aplicación móvil.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Cuenta de B1 Admin con acceso de administrador: consulte [Roles y permisos](../people/roles-permissions.md)
- Una cuenta de Stripe (cree una gratis en [stripe.com](https://stripe.com) si es necesario)

</div>

## Paso 1: Crear los fondos de donación

Los fondos son las categorías a las que pueden donar los miembros. Necesita al menos un fondo antes de poder aceptar donaciones.

Siga la guía [Fondos](../donations/funds.md) para configurar sus categorías de ofrenda:

1. Cree sus fondos más comunes (por ejemplo, "Fondo general", "Fondo de construcción", "Misiones")
2. Marque adecuadamente los fondos deducibles de impuestos; esto afecta a los estados de donaciones de fin de año

:::tip
Puede añadir más fondos en cualquier momento. Empiece con sus categorías de ofrenda más comunes.
:::

## Paso 2: Conectar Stripe

Stripe gestiona todo el procesamiento de pagos. Conectará su cuenta de Stripe a B1 Admin para que las donaciones lleguen a su cuenta bancaria.

Siga la guía [Configuración de donaciones en línea](../donations/online-giving-setup.md) para conectar Stripe:

1. Inicie sesión en su panel de Stripe y obtenga su clave publicable y su clave secreta
2. En B1 Admin, vaya a Configuración e introduzca ambas claves

:::warning
Stripe muestra su clave secreta una sola vez. Cópiela y guárdela antes de salir del panel de Stripe. Si la pierde, tendrá que generar una nueva.
:::

## Paso 3: Añadir una página de ofrendas a su sitio web

Facilite el acceso a las ofrendas añadiendo una página de donaciones a su sitio web B1.

Siga las guías [Configuración de donaciones en línea](../donations/online-giving-setup.md) y [Gestión de páginas](../website/managing-pages.md) para:

1. Añadir una pestaña "Donar" a su sitio B1.church
2. Su URL de ofrendas será: `https://yoursubdomain.b1.church/donate`
3. Los miembros pueden dar sin iniciar sesión (página pública) o iniciar sesión para usar métodos de pago guardados e ver su historial de donaciones

## Paso 4: Realizar una donación de prueba

Antes de anunciarlo a su congregación, verifique que todo funcione.

1. Realice una pequeña donación de prueba para comprobar que el proceso funciona de principio a fin
2. Compruebe que la donación aparece en B1 Admin, en Donaciones

:::tip
Si desea verificar sin cargos reales, use primero el modo de prueba de Stripe y, después, cambie al modo en vivo antes de anunciarlo a su congregación.
:::

## Paso 5: Anunciarlo a su congregación

Dé a conocer la novedad para que los miembros sepan que pueden dar en línea.

1. Comparta la URL de ofrendas a través de su sitio web, boletines por correo electrónico, boletines de la iglesia y redes sociales
2. Los miembros también pueden dar a través de la [aplicación B1](../../b1-church/giving/index.md); la función de ofrendas está integrada

:::info
Los miembros que inicien sesión pueden guardar métodos de pago, configurar donaciones recurrentes y consultar su historial de ofrendas. Las donaciones anónimas también funcionan; no se requiere inicio de sesión.
:::

## Paso 6: Gestión continua

Mantenga actualizados sus registros de donaciones y genere informes a lo largo del año.

1. [Importe las transacciones de Stripe](../donations/stripe-import.md) con regularidad (semanal o mensualmente) para mantener sus registros al día
2. [Consulte los informes de donaciones](../donations/donation-reports.md) para hacer seguimiento de las tendencias y los totales de ofrendas por fondo
3. [Genere los estados de donaciones de fin de año](../donations/giving-statements.md) para los registros fiscales de sus donantes

:::tip
Realice las importaciones de Stripe al menos una vez al mes para que sus registros se mantengan actualizados. Consulte la [Guía de informes de fin de año](./year-end-reports.md) para ver el proceso completo de cierre anual.
:::

## ¡Listo!

Su iglesia ya acepta donaciones en línea. Los miembros pueden dar a través de su sitio web, de la aplicación B1 o desde cualquier dispositivo con navegador web. Todas las donaciones se registran automáticamente en B1 Admin.

## Artículos relacionados

- [Fondos](../donations/funds.md): cree y gestione las categorías de donación
- [Lotes](../donations/batches.md): organice las donaciones en grupos
- [Registro de donaciones](../donations/recording-donations.md): introduzca manualmente donaciones en efectivo y con cheque
- [Importación de Stripe](../donations/stripe-import.md): incorpore las transacciones en línea a B1 Admin
- [Informes de donaciones](../donations/donation-reports.md): consulte las tendencias y los totales de ofrendas
- [Estados de donaciones](../donations/giving-statements.md): genere los estados fiscales de fin de año
- [Cómo donar](../../b1-church/giving/making-donations.md): la experiencia de ofrenda de los miembros en B1.church y en la aplicación B1
