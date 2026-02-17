---
title: "Guía: Configurar donaciones en línea"
---

# Configurar donaciones en línea

<div class="article-intro">

Recorre todo lo necesario para aceptar donaciones en línea en tu iglesia — desde crear fondos de donación, hasta conectar Stripe para el procesamiento de pagos, hasta compartir la página de donaciones con tu congregación. Al finalizar, los miembros podrán dar en línea a través de tu sitio web y aplicación móvil.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador — consulta [Roles y permisos](../people/roles-permissions.md)
- Una cuenta de Stripe (crea una gratis en [stripe.com](https://stripe.com) si es necesario)

</div>

## Paso 1: Crear fondos de donación

Los fondos son las categorías a las que los donantes pueden contribuir. Necesitas al menos un fondo antes de poder aceptar donaciones.

Sigue la guía [Fondos](../donations/funds.md) para configurar tus categorías de donación:

1. Crea tus fondos más comunes (por ejemplo, "Fondo General", "Fondo de Construcción", "Misiones")
2. Marca los fondos deducibles de impuestos adecuadamente — esto afecta los estados de cuenta de donaciones de fin de año

:::tip
Puedes agregar más fondos en cualquier momento. Comienza con tus categorías de donación más comunes.
:::

## Paso 2: Conectar Stripe

Stripe maneja todo el procesamiento de pagos. Conectarás tu cuenta de Stripe a B1 Admin para que las donaciones fluyan a tu cuenta bancaria.

Sigue la guía [Configuración de donaciones en línea](../donations/online-giving-setup.md) para conectar Stripe:

1. Inicia sesión en tu panel de Stripe y obtén tu Clave publicable y Clave secreta
2. En B1 Admin, ve a Configuración e ingresa ambas claves

:::warning
Stripe muestra tu Clave secreta solo una vez. Cópiala y guárdala antes de salir del panel de Stripe. Si la pierdes, necesitarás generar una nueva.
:::

## Paso 3: Agregar una página de donaciones a tu sitio web

Haz que las donaciones sean accesibles agregando una página de donaciones a tu sitio web B1.

Sigue las guías [Configuración de donaciones en línea](../donations/online-giving-setup.md) y [Gestionar páginas](../website/managing-pages.md) para:

1. Agregar una pestaña "Donar" a tu sitio B1.church
2. Tu URL de donaciones será: `https://tusubdominio.b1.church/donate`
3. Los miembros pueden dar sin iniciar sesión (página pública) o iniciar sesión para métodos de pago guardados e historial de donaciones

## Paso 4: Hacer una donación de prueba

Antes de anunciarlo a tu congregación, verifica que todo funcione.

1. Haz una pequeña donación de prueba para verificar que el flujo funcione de principio a fin
2. Comprueba que la donación aparezca en B1 Admin en la sección de Donaciones

:::tip
Usa el modo de prueba de Stripe primero si quieres verificar sin cargos reales, luego cambia al modo en vivo antes de anunciarlo a tu congregación.
:::

## Paso 5: Anunciar a tu congregación

Difunde la noticia para que los miembros sepan que pueden dar en línea.

1. Comparte la URL de donaciones a través de tu sitio web, boletines por correo electrónico, hojas informativas y redes sociales
2. Los miembros también pueden dar a través de la [aplicación B1 Mobile](../../b1-mobile/giving/) — la función de donaciones está integrada

:::info
Los miembros que inician sesión pueden guardar métodos de pago, configurar donaciones recurrentes y ver su historial de donaciones. Las donaciones anónimas también funcionan — no se requiere inicio de sesión.
:::

## Paso 6: Gestión continua

Mantén tus registros de donaciones actualizados y genera informes a lo largo del año.

1. [Importa las transacciones de Stripe](../donations/stripe-import.md) regularmente (semanal o mensualmente) para mantener tus registros al día
2. [Consulta los informes de donaciones](../donations/donation-reports.md) para seguir las tendencias y totales de donaciones por fondo
3. [Genera estados de cuenta de donaciones de fin de año](../donations/giving-statements.md) para los registros fiscales de tus donantes

:::tip
Ejecuta las importaciones de Stripe al menos mensualmente para que tus registros se mantengan actualizados. Consulta la [Guía de informes de fin de año](./year-end-reports.md) para el proceso completo de fin de año.
:::

## ¡Listo!

Tu iglesia ahora acepta donaciones en línea. Los miembros pueden dar a través de tu sitio web, la aplicación B1 Mobile o cualquier dispositivo con navegador web. Todas las donaciones se rastrean automáticamente en B1 Admin.

## Artículos relacionados

- [Fondos](../donations/funds.md) — crear y gestionar categorías de donación
- [Lotes](../donations/batches.md) — organizar donaciones en grupos
- [Registrar donaciones](../donations/recording-donations.md) — ingresar manualmente donaciones en efectivo y con cheque
- [Importación de Stripe](../donations/stripe-import.md) — traer transacciones en línea a B1 Admin
- [Informes de donaciones](../donations/donation-reports.md) — ver tendencias y totales de donaciones
- [Estados de cuenta de donaciones](../donations/giving-statements.md) — generar estados de cuenta fiscales de fin de año
- [Hacer donaciones (Web)](../../b1-church/giving/making-donations.md) — la experiencia del miembro al donar
- [Hacer donaciones (Móvil)](../../b1-mobile/giving/making-donations.md) — donar desde la aplicación móvil
