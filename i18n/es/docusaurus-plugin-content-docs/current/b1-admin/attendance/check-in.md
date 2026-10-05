---
title: "Registro de Entrada"
---

# Registro de Entrada

<div class="article-intro">

B1 Admin permite el registro de entrada automático en servicios a través de la aplicación complementaria **B1 Checkin**. Los miembros pueden registrarse a sí mismos y a sus familias en quioscos o dispositivos dedicados cuando llegan, lo que agiliza el proceso y reduce la carga de trabajo de sus voluntarios. Cada registro se graba automáticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Sus sedes, horarios de servicios y grupos deben configurarse en [Configuración de Asistencia](setup.md).
- Necesita [personas en su base de datos](../people/adding-people.md) con [familias](../people/adding-people.md#managing-households) configuradas para que las familias puedan registrarse juntas.
- Necesitará una tableta y opcionalmente una impresora de etiquetas Brother (consulte [recomendaciones de hardware](#recommended-hardware) a continuación).

</div>

## Cómo Funciona

La aplicación B1 Checkin se conecta a su configuración de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se graba automáticamente contra la sede, el horario de servicio y el grupo correctos. No necesita ingresar asistencia manualmente para nadie que use el sistema de registro.

## Configurar el Registro de Entrada

1. **Configure primero su estructura de asistencia.** En B1 Admin, vaya a **Attendance > Setup** y asegúrese de que sus sedes, horarios de servicios y grupos estén en su lugar. La aplicación de registro depende de esta configuración. Consulte [Configuración de Asistencia](setup.md) para más detalles.
2. **Instale la aplicación B1 Checkin** en los dispositivos que planea usar. La aplicación está disponible en las siguientes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicie sesión en la aplicación B1 Checkin** usando las credenciales de la cuenta de su iglesia.
4. **Seleccione la sede y el horario del servicio** para la reunión actual.
5. Los miembros ahora pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloque los dispositivos de registro en ubicaciones visibles y de fácil acceso, como entradas al vestíbulo o mostradores de bienvenida. Un breve anuncio durante los servicios ayuda a los miembros a saber que la opción está disponible.
:::

:::tip
Si su iglesia tiene múltiples sedes, deberá repetir la configuración para cada sede en [Configuración de Asistencia](setup.md). Cada dispositivo de registro se puede configurar para una sede diferente.
:::

## Hardware Recomendado

**Tabletas** — cualquiera de estas funcionan bien con la aplicación:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla Grande:** Samsung Galaxy Tab A8 10.5"
- **Presupuesto:** Amazon Fire HD 10

**Impresoras** — los registros funcionan con impresoras de etiquetas Brother para imprimir etiquetas de nombres:

- **Mejor:** Brother QL-1110NWB (admite múltiples tabletas vía Bluetooth y WiFi)
- **Bueno:** Brother QL-810W (admite múltiples tabletas vía WiFi)
- **Presupuesto:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Otras marcas de impresoras no funcionarán para imprimir etiquetas de nombres.
:::

:::info
Siga las instrucciones de configuración de su impresora para conectarla a la misma red WiFi que su tableta. Puede encontrar controladores de impresoras Brother y guías de configuración en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalizar la Apariencia del Quiosco

Puede personalizar el aspecto y la sensación de la aplicación B1 Checkin para que coincida con la marca de su iglesia. En B1 Admin, vaya a **Mobile > B1 CheckIn** y use la tarjeta **Kiosk Theme** para configurar:

### Colores

Personalice ocho configuraciones de color para que coincidan con la marca de su iglesia:

- **Primary** y **Primary Contrast** -- Color de marca principal y su color de texto.
- **Secondary** y **Secondary Contrast** -- Color de acento y su color de texto.
- **Header Background** y **Subheader Background** -- Colores para las áreas de encabezado del quiosco.
- **Button Background** y **Button Text** -- Colores para botones interactivos.

### Imagen de Fondo

Cargue una imagen de fondo opcional para las pantallas de bienvenida y búsqueda del quiosco. El tamaño recomendado es 1920x1080 píxeles.

### Pantalla de Inactividad / Protector de Pantalla

Configure un protector de pantalla que se active después de un período de inactividad:

1. Active o desactive la pantalla de inactividad **on** u **off**.
2. Establezca el **timeout** (cuántos segundos de inactividad antes de que comience el protector de pantalla, mínimo 10 segundos).
3. Agregue una o más **slides** -- cada slide tiene una imagen y una duración de visualización (mínimo 3 segundos).

:::tip
Use la pantalla de inactividad para mostrar anuncios, eventos próximos o mensajes de bienvenida cuando el quiosco no se está usando activamente.
:::

## Registro de Huéspedes mediante Código QR

El quiosco de registro puede mostrar un código QR que los visitantes escanean para registrarse a sí mismos y a su familia en su propio teléfono. Esto acelera el proceso de registro para huéspedes que llegan por primera vez.

Cuando un huésped escanea el código QR, se le lleva a una [página de registro de huéspedes](../../b1-church/checkin/guest-registration) donde ingresa su nombre, correo electrónico y miembros de la familia. Un voluntario puede entonces buscarlo en el quiosco y registrarlo.

### Habilitar Registro de Huéspedes mediante Código QR

Para activar la visualización del código QR:

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Mobile**.
2. Haga clic en **B1 CheckIn**.
3. Activa el **QR Guest Registration** y haz clic en **Save**.

:::note
Esta configuración está en **Mobile > B1 CheckIn** (la misma página que la tarjeta **Kiosk Theme**), no en Attendance.
:::

### Compartir el Enlace de Registro

Una vez que el Registro de Huéspedes mediante Código QR esté habilitado, aparece una sección **Share registration QR code** debajo del interruptor. Esto le proporciona dos formas de llevar a los huéspedes al formulario de registro más allá del código QR del quiosco:

- **Copy link** — copia la URL de registro para que pueda pegarla en el sitio web de su iglesia, en correos electrónicos o en cualquier lugar en línea.
- **Download PNG** — descarga el código QR como una imagen que puede imprimir en volantes, boletines o carteles.

:::tip
Agregue el enlace de registro a la página "Plan Your Visit" o "I'm New" del sitio web de su iglesia para que los huéspedes puedan registrarse antes de que incluso lleguen.
:::

## Lo Que Se Graba

Cada registro crea un registro de asistencia en B1 Admin. Puede ver estos registros en las pestañas [Attendance](tracking-attendance.md) y [Groups](../groups/group-members.md) tal como lo haría con la asistencia ingresada manualmente. No hay diferencia en cómo aparecen los datos — ambos métodos se introducen en los mismos informes.
