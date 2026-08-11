---
title: "Registración"
---

# Registración

<div class="article-intro">

B1 Admin soporta auto-registración en servicios a través de la aplicación complementaria **B1 Checkin**. Los miembros pueden registrarse a sí mismos y a sus familias en quioscos o dispositivos dedicados cuando llegan, haciendo el proceso rápido y reduciendo la carga en tus voluntarios. Cada registración se registra automáticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Tus sedes, horarios de servicio y grupos deben estar configurados en [Configuración de Asistencia](setup.md).
- Necesitas [personas en tu base de datos](../people/adding-people.md) con [hogares](../people/adding-people.md#managing-households) configurados para que las familias puedan registrarse juntas.
- Necesitarás una tableta y opcionalmente una impresora de etiquetas Brother (ver [recomendaciones de hardware](#recommended-hardware) abajo).

</div>

## Cómo Funciona

La aplicación B1 Checkin se conecta a tu configuración de asistencia en B1 Admin. Cuando un miembro se registra, su asistencia se registra automáticamente contra la sede correcta, horario de servicio y grupo. No necesitas ingresar manualmente la asistencia de nadie que use el sistema de registración.

## Configurar la Registración

1. **Configura tu estructura de asistencia primero.** En B1 Admin, ve a **Asistencia > Configuración** y asegúrate de que tus sedes, horarios de servicio y grupos estén en su lugar. La aplicación de registración depende de esta configuración. Ver [Configuración de Asistencia](setup.md) para más detalles.
2. **Instala la aplicación B1 Checkin** en los dispositivos que planeas usar. La aplicación está disponible en las siguientes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicia sesión en la aplicación B1 Checkin** usando las credenciales de cuenta de tu iglesia.
4. **Selecciona la sede y el horario de servicio** para la reunión actual.
5. Los miembros ahora pueden buscar su nombre en el dispositivo e ingresarse.

:::tip
Coloca los dispositivos de registración en ubicaciones visibles y de fácil acceso, como las entradas de los pasillos o mesas de bienvenida. Un breve anuncio durante los servicios ayuda a que los miembros sepan que esta opción está disponible.
:::

:::tip
Si tu iglesia tiene múltiples sedes, deberás repetir la configuración para cada sede en [Configuración de Asistencia](setup.md). Cada dispositivo de registración puede configurarse para una sede diferente.
:::

## Hardware Recomendado

**Tabletas** — cualquiera de éstas funciona bien con la aplicación:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla Grande:** Samsung Galaxy Tab A8 10.5"
- **Presupuesto:** Amazon Fire HD 10

**Impresoras** — la registración funciona con impresoras de etiquetas Brother para imprimir identificadores:

- **La Mejor:** Brother QL-1110NWB (soporta múltiples tabletas vía Bluetooth y WiFi)
- **Buena:** Brother QL-810W (soporta múltiples tabletas vía WiFi)
- **Presupuesto:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Otras marcas de impresoras no funcionarán para imprimir identificadores.
:::

:::info
Sigue las instrucciones de configuración de tu impresora para conectarla a la misma red WiFi que tu tableta. Puedes encontrar controladores de impresora Brother y guías de configuración en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalizar la Apariencia del Quiosco

Puedes personalizar el aspecto de la aplicación B1 Checkin para que coincida con la marca de tu iglesia. En B1 Admin, ve a **Asistencia > Tema de Quiosco** para configurar:

### Colores

Personaliza ocho configuraciones de color para que coincidan con la marca de tu iglesia:

- **Principal** y **Contraste Principal** -- Color principal de la marca y su color de texto.
- **Secundario** y **Contraste Secundario** -- Color de énfasis y su color de texto.
- **Fondo del Encabezado** y **Fondo del Subencabezado** -- Colores para las áreas de encabezado del quiosco.
- **Fondo de Botón** y **Texto del Botón** -- Colores para los botones interactivos.

### Imagen de Fondo

Sube una imagen de fondo opcional para las pantallas de bienvenida y búsqueda del quiosco. El tamaño recomendado es 1920x1080 píxeles.

### Pantalla Inactiva / Protector de Pantalla

Configura un protector de pantalla que se active después de un período de inactividad:

1. Alterna la pantalla inactiva **activada** o **desactivada**.
2. Establece el **tiempo de espera** (cuántos segundos de inactividad antes de que comience el protector de pantalla, mínimo 10 segundos).
3. Agrega una o más **diapositivas** -- cada diapositiva tiene una imagen y una duración de visualización (mínimo 3 segundos).

:::tip
Usa la pantalla inactiva para mostrar anuncios, eventos próximos o mensajes de bienvenida cuando el quiosco no está siendo usado activamente.
:::

## Registro de Invitados vía Código QR

El quiosco de registración puede mostrar un código QR que los visitantes escanean para registrarse a sí mismos y a su familia en su propio teléfono. Esto acelera el proceso de registración para invitados por primera vez.

Cuando un invitado escanea el código QR, es llevado a una [página de registro de invitados](../../b1-church/checkin/guest-registration) donde ingresa su nombre, correo electrónico y miembros de la familia. Un voluntario luego puede buscarlo en el quiosco e ingresarlo.

### Habilitar Registro de Invitados por Código QR

Para activar la visualización del código QR:

1. En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña) y elige **Móvil**.
2. Selecciona la pestaña **B1 CheckIn**.
3. Alterna **Registro de Invitados por Código QR** activado y haz clic en **Guardar**.

:::note
Esta configuración está bajo **Móvil**, no bajo Asistencia > Tema de Quiosco.
:::

### Compartir el Enlace de Registro

Una vez que se habilita el Registro de Invitados por Código QR, aparece una sección **Compartir código QR de registro** debajo del interruptor. Esto te da dos formas de llevar a los invitados al formulario de registro además del código QR del quiosco:

- **Copiar enlace** — copia la URL de registro para que puedas pegarla en tu sitio web de la iglesia, correos electrónicos o cualquier lugar en línea.
- **Descargar PNG** — descarga el código QR como una imagen que puedas imprimir en volantes, boletines o señalización.

:::tip
Agrega el enlace de registro a la página "Plan Tu Visita" o "Soy Nuevo" del sitio web de tu iglesia para que los invitados puedan registrarse incluso antes de llegar.
:::

## Qué Se Registra

Cada registración crea un registro de asistencia en B1 Admin. Puedes ver estos registros en las pestañas de [Asistencia](tracking-attendance.md) y [Grupos](../groups/group-members.md) tal como la asistencia ingresada manualmente. No hay diferencia en cómo aparecen los datos — ambos métodos se alimentan en los mismos reportes.
