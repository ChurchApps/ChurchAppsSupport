---
title: "Guía: Configurar las donaciones en línea"
description: "Configure las donaciones en línea en B1 Admin creando fondos de donación, conectando Stripe y añadiendo una página de Donar a su sitio web B1.church para los miembros."
---

# Configurar las donaciones en línea

<div class="article-intro">

Repase todo lo necesario para aceptar donaciones en línea en su iglesia: desde crear los fondos de donación, hasta conectar Stripe para el procesamiento de pagos y compartir la página de ofrendas con su congregación. Al terminar, los miembros podrán dar en línea a través de su sitio web y de la aplicación móvil.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Cuenta de B1 Admin con acceso de administrador — consulte [Roles y permisos](../people/roles-permissions.md)
- Una cuenta de Stripe (cree una gratis en [stripe.com](https://stripe.com) si la necesita)

</div>

## Paso 1: Crear fondos de donación

Los fondos son las categorías a las que pueden donar los donantes. Necesita al menos un fondo antes de poder aceptar donaciones.

Siga la guía [Fondos](../donations/funds.md) para configurar sus categorías de ofrenda:

1. Cree sus fondos más comunes (por ejemplo, "Fondo general", "Fondo para edificio", "Misiones")
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

Haga que las ofrendas sean accesibles añadiendo una página de donaciones a su sitio web B1.

Siga las guías [Configuración de donaciones en línea](../donations/online-giving-setup.md) y [Gestión de páginas](../website/managing-pages.md) para:

1. Añadir una pestaña "Donar" a su sitio B1.church
2. Su URL de ofrendas será: `https://yoursubdomain.b1.church/donate`
3. Los miembros pueden donar sin iniciar sesión (página pública) o iniciar sesión para usar métodos de pago guardados y consultar su historial de donaciones

## Paso 4: Realizar una donación de prueba

Antes de anunciarlo a su congregación, compruebe que todo funciona.

1. Realice una pequeña donación de prueba para verificar que todo el proceso funciona de principio a fin
2. Compruebe que la donación aparece en B1 Admin, en Donaciones

:::tip
Use primero el modo de prueba de Stripe si desea verificar sin cargos reales, y luego cambie al modo en vivo antes de anunciarlo a su congregación.
:::

## Paso 5: Anunciarlo a su congregación

Dé a conocer la noticia para que los miembros sepan que pueden dar en línea.

1. Comparta la URL de ofrendas a través de su sitio web, boletines por correo electrónico, boletines de la iglesia y redes sociales
2. Los miembros también pueden dar a través de la [aplicación B1](../../b1-church/giving/index.md); la función de ofrendas está integrada

:::info
Los miembros que inicien sesión pueden guardar métodos de pago, configurar donaciones recurrentes y consultar su historial de ofrendas. Las ofrendas anónimas también funcionan: no es necesario iniciar sesión.
:::

## Paso 6: Gestión continua

Mantenga actualizados sus registros de donaciones y genere informes a lo largo del año.

1. [Importe las transacciones de Stripe](../donations/stripe-import.md) con regularidad (semanal o mensualmente) para mantener sus registros al día
2. [Consulte los informes de donaciones](../donations/donation-reports.md) para seguir las tendencias de ofrendas y los totales por fondo
3. [Genere los estados de donaciones de fin de año](../donations/giving-statements.md) para los registros fiscales de sus donantes

:::tip
Realice las importaciones de Stripe al menos una vez al mes para que sus registros se mantengan actualizados. Consulte la [Guía de informes de fin de año](./year-end-reports.md) para ver el proceso completo de fin de año.
:::

## ¡Listo!

Su iglesia ya acepta donaciones en línea. Los miembros pueden dar a través de su sitio web, de la aplicación B1 o desde cualquier dispositivo con navegador web. Todas las donaciones se registran automáticamente en B1 Admin.

## Artículos relacionados

- [Fondos](../donations/funds.md) — crear y gestionar categorías de donación
- [Lotes](../donations/batches.md) — organizar las donaciones en grupos
- [Registrar donaciones](../donations/recording-donations.md) — introducir manualmente donaciones en efectivo y con cheque
- [Importación de Stripe](../donations/stripe-import.md) — incorporar transacciones en línea a B1 Admin
- [Informes de donaciones](../donations/donation-reports.md) — consultar tendencias y totales de ofrendas
- [Estados de donaciones](../donations/giving-statements.md) — generar los estados fiscales de fin de año
- [Hacer donaciones](../../b1-church/giving/making-donations.md) — la experiencia de ofrenda de los miembros en B1.church y en la aplicación B1
