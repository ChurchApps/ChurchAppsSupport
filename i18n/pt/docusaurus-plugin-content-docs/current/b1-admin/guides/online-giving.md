---
title: "Guía: Configurar las donaciones en línea"
description: "Configure las donaciones en línea en B1 Admin creando fondos de donación, conectando Stripe y agregando una página de Donar a su sitio web B1.church para los miembros."
---

# Configurar las donaciones en línea

<div class="article-intro">

Repase todo lo necesario para aceptar donaciones en línea en su iglesia: desde crear los fondos de donación, pasando por conectar Stripe para el procesamiento de pagos, hasta compartir la página de ofrendas con su congregación. Al terminar, los miembros podrán dar en línea a través de su sitio web y de la aplicación móvil.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador: consulte [Roles y permisos](../people/roles-permissions.md)
- Una cuenta de Stripe (cree una gratis en [stripe.com](https://stripe.com) si es necesario)

</div>

## Paso 1: Crear fondos de donación

Los fondos son las categorías a las que los donantes pueden dar. Necesita al menos un fondo antes de poder aceptar donaciones.

Siga la guía [Fondos](../donations/funds.md) para configurar sus categorías de ofrendas:

1. Cree sus fondos más comunes (por ejemplo, "Fondo general", "Fondo de construcción", "Misiones")
2. Marque adecuadamente los fondos deducibles de impuestos: esto afecta los estados de cuenta de donaciones de fin de año

:::tip
Puede agregar más fondos en cualquier momento. Comience con sus categorías de donación más comunes.
:::

## Paso 2: Conectar Stripe

Stripe maneja todo el procesamiento de pagos. Conectará su cuenta de Stripe a B1 Admin para que las donaciones lleguen a su cuenta bancaria.

Siga la guía [Configuración de donaciones en línea](../donations/online-giving-setup.md) para conectar Stripe:

1. Inicie sesión en su panel de Stripe y obtenga su clave publicable y su clave secreta
2. En B1 Admin, vaya a Configuración e ingrese ambas claves

:::warning
Stripe muestra su clave secreta una sola vez. Cópiela y guárdela antes de salir del panel de Stripe. Si la pierde, deberá generar una nueva.
:::

## Paso 3: Agregar una página de ofrendas a su sitio web

Haga que la ofrenda sea accesible agregando una página de donaciones a su sitio web de B1.

Siga las guías [Configuración de donaciones en línea](../donations/online-giving-setup.md) y [Administrar páginas](../website/managing-pages.md) para:

1. Agregar una pestaña "Donar" a su sitio de B1.church
2. Su URL de ofrendas será: `https://yoursubdomain.b1.church/donate`
3. Los miembros pueden dar sin iniciar sesión (página pública) o iniciar sesión para usar métodos de pago guardados e historial de donaciones

## Paso 4: Realizar una donación de prueba

Antes de anunciarlo a su congregación, verifique que todo funcione.

1. Realice una pequeña donación de prueba para verificar que el proceso funciona de principio a fin
2. Compruebe que la donación aparece en B1 Admin, en Donaciones

:::tip
Use primero el modo de prueba de Stripe si desea verificar sin cargos reales, y luego cambie al modo en vivo antes de anunciarlo a su congregación.
:::

## Paso 5: Anunciar a su congregación

Dé a conocer la novedad para que los miembros sepan que pueden dar en línea.

1. Comparta la URL de ofrendas a través de su sitio web, boletines por correo electrónico, boletines de la iglesia y redes sociales
2. Los miembros también pueden dar a través de la [aplicación B1](../../b1-church/giving/index.md): la función de ofrendas está integrada

:::info
Los miembros que inicien sesión pueden guardar métodos de pago, configurar donaciones recurrentes y ver su historial de ofrendas. Las ofrendas anónimas también funcionan: no se requiere inicio de sesión.
:::

## Paso 6: Gestión continua

Mantenga sus registros de donaciones actualizados y genere informes durante todo el año.

1. [Importe las transacciones de Stripe](../donations/stripe-import.md) periódicamente (semanal o mensualmente) para mantener sus registros al día
2. [Vea los informes de donaciones](../donations/donation-reports.md) para hacer seguimiento de las tendencias de ofrendas y los totales por fondo
3. [Genere los estados de cuenta de ofrendas de fin de año](../donations/giving-statements.md) para los registros fiscales de sus donantes

:::tip
Realice las importaciones de Stripe al menos una vez al mes para que sus registros se mantengan actualizados. Consulte la [Guía de informes de fin de año](./year-end-reports.md) para el proceso completo de fin de año.
:::

## ¡Listo!

Su iglesia ya acepta donaciones en línea. Los miembros pueden dar a través de su sitio web, de la aplicación B1 o desde cualquier dispositivo con un navegador web. Todas las donaciones se registran automáticamente en B1 Admin.

## Artículos relacionados

- [Fondos](../donations/funds.md): cree y administre las categorías de donación
- [Lotes](../donations/batches.md): organice las donaciones en grupos
- [Registrar donaciones](../donations/recording-donations.md): ingrese manualmente las donaciones en efectivo y con cheque
- [Importación de Stripe](../donations/stripe-import.md): incorpore las transacciones en línea a B1 Admin
- [Informes de donaciones](../donations/donation-reports.md): vea las tendencias y totales de ofrendas
- [Estados de cuenta de ofrendas](../donations/giving-statements.md): genere los estados de cuenta fiscales de fin de año
- [Hacer donaciones](../../b1-church/giving/making-donations.md): la experiencia de ofrendas de los miembros en B1.church y en la aplicación B1
