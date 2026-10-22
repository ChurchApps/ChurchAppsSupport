---
title: "Registro de entrada"
---

# Registro de entrada

<div class="article-intro">

B1 Admin admite el autorregistro en los servicios mediante la aplicación complementaria **B1 Checkin**. Los miembros pueden registrarse ellos mismos y a sus familias en quioscos o dispositivos dedicados al llegar, lo que hace el proceso más rápido y reduce la carga de trabajo de tus voluntarios. Cada registro de entrada se guarda automáticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Tus campus, horarios de servicio y grupos deben estar configurados en [Configuración de asistencia](setup.md).
- Necesitas [personas en tu base de datos](../people/adding-people.md) con [hogares](../people/adding-people.md#managing-households) configurados para que las familias puedan registrarse juntas.
- Necesitarás una tableta y, opcionalmente, una impresora de etiquetas Brother (consulta las [recomendaciones de hardware](#recommended-hardware) más abajo).

</div>

## Cómo funciona

La aplicación B1 Checkin se conecta a tu configuración de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se guarda automáticamente en el campus, el horario de servicio y el grupo correspondientes. No necesitas introducir manualmente la asistencia de quienes usan el sistema de registro.

## Configurar el registro de entrada

1. **Configura primero tu estructura de asistencia.** En B1 Admin, ve a **People > Attendance** y haz clic en **Setup** para asegurarte de que tus campus, horarios de servicio y grupos estén listos. La aplicación de registro depende de esta configuración. Opcionalmente, asigna a cada horario de servicio un [horario de registro](setup.md#setting-a-check-in-schedule) para que el registro se abra y se cierre automáticamente cada semana. Los horarios usan la zona horaria del campus del servicio o, si el campus no tiene una, la zona horaria de tu iglesia. El quiosco muestra como **Closed** los horarios de servicio cuya ventana está cerrada e indica a las familias cuándo se abre el registro. Consulta [Configuración de asistencia](setup.md) para más detalles.
2. **Instala la aplicación B1 Checkin** en los dispositivos que vayas a usar. La aplicación está disponible en las siguientes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tabletas Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tabletas Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicia sesión en la aplicación B1 Checkin** con las credenciales de la cuenta de tu iglesia.
4. **Selecciona el campus y el horario de servicio** de la reunión actual.
5. Los miembros ya pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloca los dispositivos de registro en lugares visibles y de fácil acceso, como las entradas del vestíbulo o los mostradores de bienvenida. Un breve anuncio durante los servicios ayuda a que los miembros sepan que esta opción está disponible.
:::

:::tip
Si tu iglesia tiene varios campus, deberás repetir la configuración para cada uno en [Configuración de asistencia](setup.md). Cada dispositivo de registro puede configurarse para un campus diferente.
:::

## Hardware recomendado

**Tabletas**: cualquiera de estas funciona bien con la aplicación:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla grande:** Samsung Galaxy Tab A8 10.5"
- **Económica:** Amazon Fire HD 10

**Impresoras**: los registros funcionan con impresoras de etiquetas Brother para imprimir gafetes:

- **Mejor opción:** Brother QL-1110NWB (admite varias tabletas por Bluetooth y WiFi)
- **Buena opción:** Brother QL-810W (admite varias tabletas por WiFi)
- **Económica:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Las impresoras de otras marcas no funcionarán para imprimir gafetes.
:::

:::info
Sigue las instrucciones de configuración de tu impresora para conectarla a la misma red WiFi que tu tableta. Puedes encontrar los controladores y las guías de configuración de las impresoras Brother en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalizar la apariencia del quiosco

Puedes personalizar el aspecto de la aplicación B1 Checkin para que coincida con la identidad visual de tu iglesia. En B1 Admin, ve a **Mobile > B1 CheckIn** y usa la tarjeta **Kiosk Theme** para configurar:

### Colores

Personaliza ocho colores para que coincidan con la identidad de tu iglesia:

- **Primary** y **Primary Contrast** -- Color principal de la marca y su color de texto.
- **Secondary** y **Secondary Contrast** -- Color de acento y su color de texto.
- **Header Background** y **Subheader Background** -- Colores de las áreas de encabezado del quiosco.
- **Button Background** y **Button Text** -- Colores de los botones interactivos.

### Imagen de fondo

Sube una imagen de fondo opcional para las pantallas de bienvenida y de búsqueda del quiosco. El tamaño recomendado es de 1920x1080 píxeles.

### Pantalla de inactividad / Protector de pantalla

Configura un protector de pantalla que se active después de un periodo de inactividad:

1. Activa o desactiva la pantalla de inactividad.
2. Define el **timeout** (cuántos segundos de inactividad pasan antes de que inicie el protector, con un mínimo de 10 segundos).
3. Agrega una o más **slides**: cada una tiene una imagen y una duración de visualización (mínimo 3 segundos).

:::tip
Usa la pantalla de inactividad para mostrar anuncios, próximos eventos o mensajes de bienvenida cuando el quiosco no esté en uso.
:::

## Registro de invitados mediante código QR

El quiosco de registro puede mostrar un código QR que los visitantes escanean para registrarse ellos mismos y a su familia desde su propio teléfono. Esto agiliza el proceso para los invitados que llegan por primera vez.

Cuando un invitado escanea el código QR, pasa a una [página de registro de invitados](../../b1-church/checkin/guest-registration), donde introduce su nombre, correo electrónico y los miembros de su familia. Después, un voluntario puede buscarlo en el quiosco y registrar su entrada.

### Activar el registro de invitados por código QR

Para activar la visualización del código QR:

1. En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expande **Mobile**.
2. Haz clic en **B1 CheckIn**.
3. Activa **QR Guest Registration** y haz clic en **Save**.

:::note
Esta configuración está en **Mobile > B1 CheckIn** (la misma página que la tarjeta **Kiosk Theme**), no en Attendance. La acción **Kiosk** de la página de asistencia tiene un enlace a esta página.
:::

### Compartir el enlace de registro

Una vez activado el registro de invitados por código QR, aparece una sección **Share registration QR code** debajo del interruptor. Así tienes dos formas de llevar a los invitados al formulario de registro, además del código QR del quiosco:

- **Copy link**: copia la URL de registro para pegarla en el sitio web de tu iglesia, en correos electrónicos o en cualquier lugar en línea.
- **Download PNG**: descarga el código QR como imagen para imprimirlo en volantes, boletines o carteles.

:::tip
Agrega el enlace de registro a la página "Plan Your Visit" o "I'm New" de tu sitio web para que los invitados puedan registrarse antes de llegar.
:::

## Qué se registra

Cada registro de entrada crea un registro de asistencia en B1 Admin. Puedes ver estos registros en la página [Seguimiento de asistencia](tracking-attendance.md) y en las sesiones de cada [grupo](../groups/group-members.md), igual que la asistencia introducida manualmente. No hay diferencia en cómo aparecen los datos: ambos métodos alimentan los mismos informes.
