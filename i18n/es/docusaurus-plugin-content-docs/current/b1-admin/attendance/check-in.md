---
title: "Registro de Entrada"
---

# Registro de Entrada

<div class="article-intro">

B1 Admin permite el registro de entrada autónomo en los servicios a través de la aplicación complementaria **B1 Checkin**. Los miembros pueden registrarse ellos mismos y a sus familias en quioscos o dispositivos dedicados al llegar, lo que hace el proceso rápido y reduce la carga de trabajo de sus voluntarios. Cada registro de entrada se graba automáticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Sus sedes, horarios de servicio y grupos deben estar configurados en [Configuración de Asistencia](setup.md).
- Necesita [personas en su base de datos](../people/adding-people.md) con [hogares](../people/adding-people.md#managing-households) configurados para que las familias puedan registrarse juntas.
- Necesitará una tableta y, opcionalmente, una impresora de etiquetas Brother (consulte las [recomendaciones de hardware](#recommended-hardware) a continuación).

</div>

## Cómo Funciona

La aplicación B1 Checkin se conecta a la configuración de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se graba automáticamente en la sede, horario de servicio y grupo correctos. No necesita ingresar la asistencia manualmente para ninguna persona que use el sistema de registro de entrada.

## Configuración del Registro de Entrada

1. **Configure primero su estructura de asistencia.** En B1 Admin, vaya a **Asistencia > Configuración** y asegúrese de que sus sedes, horarios de servicio y grupos estén en su lugar. La aplicación de registro de entrada depende de esta configuración. Consulte [Configuración de Asistencia](setup.md) para más detalles.
2. **Instale la aplicación B1 Checkin** en los dispositivos que planea usar. La aplicación está disponible en las siguientes plataformas:
   - **Tabletas Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tabletas Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicie sesión en la aplicación B1 Checkin** usando las credenciales de la cuenta de su iglesia.
4. **Seleccione la sede y el horario de servicio** para la reunión actual.
5. Los miembros ahora pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloque los dispositivos de registro de entrada en ubicaciones visibles y de fácil acceso, como entradas del vestíbulo o mesas de bienvenida. Un breve anuncio durante los servicios ayuda a que los miembros sepan que la opción está disponible.
:::

:::tip
Si su iglesia tiene múltiples sedes, necesitará repetir la configuración para cada sede en la [Configuración de Asistencia](setup.md). Cada dispositivo de registro de entrada puede configurarse para una sede diferente.
:::

## Hardware Recomendado

**Tabletas** — cualquiera de estas funciona bien con la aplicación:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla Grande:** Samsung Galaxy Tab A8 10.5"
- **Económica:** Amazon Fire HD 10

**Impresoras** — los registros de entrada funcionan con impresoras de etiquetas Brother para imprimir identificaciones:

- **Mejor:** Brother QL-1110NWB (compatible con múltiples tabletas vía Bluetooth y WiFi)
- **Buena:** Brother QL-810W (compatible con múltiples tabletas vía WiFi)
- **Económica:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Otras marcas de impresoras no funcionarán para imprimir identificaciones.
:::

:::info
Siga las instrucciones de configuración de su impresora para conectarla a la misma red WiFi que su tableta. Puede encontrar controladores e instrucciones de configuración de impresoras Brother en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalización de la Apariencia del Quiosco

Puede personalizar el aspecto de la aplicación B1 Checkin para que coincida con la imagen de su iglesia. En B1 Admin, vaya a **Asistencia > Tema del Quiosco** para configurar:

### Colores

Personalice ocho configuraciones de color para que coincidan con la imagen de su iglesia:

- **Primario** y **Contraste Primario** -- Color principal de la marca y su color de texto.
- **Secundario** y **Contraste Secundario** -- Color de acento y su color de texto.
- **Fondo del Encabezado** y **Fondo del Subencabezado** -- Colores para las áreas de encabezado del quiosco.
- **Fondo del Botón** y **Texto del Botón** -- Colores para los botones interactivos.

### Imagen de Fondo

Suba una imagen de fondo opcional para las pantallas de bienvenida y búsqueda del quiosco. El tamaño recomendado es 1920x1080 píxeles.

### Pantalla Inactiva / Protector de Pantalla

Configure un protector de pantalla que se active después de un período de inactividad:

1. Active o desactive la pantalla inactiva.
2. Establezca el **tiempo de espera** (cuántos segundos de inactividad antes de que se inicie el protector de pantalla, mínimo 10 segundos).
3. Agregue una o más **diapositivas** -- cada diapositiva tiene una imagen y una duración de visualización (mínimo 3 segundos).

:::tip
Use la pantalla inactiva para mostrar anuncios, próximos eventos o mensajes de bienvenida cuando el quiosco no se está usando activamente.
:::

## Registro de Visitantes mediante Código QR

El quiosco de registro de entrada puede mostrar un código QR que los visitantes escanean para registrarse ellos mismos y a su familia en su propio teléfono. Esto agiliza el proceso de registro de entrada para los visitantes primerizos.

Cuando un visitante escanea el código QR, se le lleva a una [página de registro de visitantes](../../b1-church/checkin/guest-registration) donde ingresa su nombre, correo electrónico y miembros de la familia. Un voluntario puede entonces buscarlos en el quiosco y registrarlos.

### Habilitar el Registro de Visitantes por QR

Para activar la visualización del código QR:

1. En B1 Admin, vaya a **Móvil** en la barra lateral izquierda (icono de teléfono).
2. Seleccione la pestaña **Registro de Entrada**.
3. Active **Registro de Visitantes por QR**.

:::note
Esta configuración está en **Móvil**, no en Asistencia > Tema del Quiosco.
:::

## Qué se Registra

Cada registro de entrada crea un registro de asistencia en B1 Admin. Puede ver estos registros en las pestañas de [Asistencia](tracking-attendance.md) y [Grupos](../groups/group-members.md) igual que la asistencia ingresada manualmente. No hay diferencia en cómo aparecen los datos — ambos métodos alimentan los mismos informes.
