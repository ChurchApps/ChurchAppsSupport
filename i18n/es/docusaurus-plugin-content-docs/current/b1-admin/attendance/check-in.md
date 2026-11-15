---
title: "Configuración del autoservicio de registro de entrada con B1 Checkin y B1 Admin"
sidebar_label: "Registro de entrada"
description: "Configura el autoservicio de registro de entrada en los servicios con la app B1 Checkin en B1 Admin, incluyendo dispositivos, cuentas de quiosco, horarios, personalización visual y registro de visitantes mediante código QR."
---

# Registro de entrada

<div class="article-intro">

B1 Admin permite el autoservicio de registro de entrada en los servicios mediante la app complementaria **B1 Checkin**. Los miembros pueden registrarse a sí mismos y a sus familias en quioscos o dispositivos dedicados al llegar, lo que agiliza el proceso y reduce la carga de trabajo de sus voluntarios. Cada registro de entrada se guarda automáticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Sus campus, horarios de servicio y grupos deben estar configurados en [Configuración de asistencia](setup.md).
- Necesita [personas en su base de datos](../people/adding-people.md) con [hogares](../people/adding-people.md#managing-households) configurados para que las familias puedan registrarse juntas.
- Necesitará una tableta y, opcionalmente, una impresora de etiquetas Brother (consulte las [recomendaciones de hardware](#recommended-hardware) más abajo).

</div>

## Cómo funciona {#how-it-works}

La app B1 Checkin se conecta con la configuración de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se guarda automáticamente en el campus, el horario de servicio y el grupo correctos. No necesita introducir la asistencia manualmente para quienes usan el sistema de registro de entrada.

## Configuración del registro de entrada {#setting-up-check-in}

1. **Configure primero la estructura de asistencia.** En B1 Admin, vaya a **Personas > Asistencia** y haga clic en **Configuración** para asegurarse de que sus campus, horarios de servicio y grupos estén listos. La app de registro depende de esta configuración. Opcionalmente, asigne a cada horario de servicio un [horario de registro](setup.md#setting-a-check-in-schedule) para que el registro se abra y cierre automáticamente cada semana. Los horarios usan la zona horaria del campus del servicio o, si el campus no tiene una definida, la zona horaria de su iglesia. El quiosco muestra como **Cerrado** los horarios de servicio cuya ventana está cerrada e informa a las familias cuándo se abrirá el registro. Consulte [Configuración de asistencia](setup.md) para más detalles.
2. **Instale la app B1 Checkin** en los dispositivos que vaya a utilizar. La app está disponible en las siguientes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tabletas Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tabletas Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicie sesión en la app B1 Checkin** con una cuenta que tenga el permiso de asistencia **Checkin** (o **Editar asistencia**). Consulte [Cuentas de quiosco de registro de entrada](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Seleccione el campus y el horario de servicio** de la reunión actual.
5. Ahora los miembros pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloque los dispositivos de registro en lugares visibles y de fácil acceso, como las entradas del vestíbulo o las mesas de bienvenida. Un breve anuncio durante los servicios ayuda a los miembros a saber que esta opción está disponible.
:::

:::tip
Si su iglesia tiene varios campus, deberá repetir la configuración para cada campus en [Configuración de asistencia](setup.md). Cada dispositivo de registro puede configurarse para un campus diferente.
:::

## Hardware recomendado {#recommended-hardware}

**Tabletas**: cualquiera de estas funciona bien con la app:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla grande:** Samsung Galaxy Tab A8 10.5"
- **Económica:** Amazon Fire HD 10

**Impresoras**: el registro de entrada funciona con impresoras de etiquetas Brother para imprimir credenciales:

- **Mejor opción:** Brother QL-1110NWB (admite varias tabletas por Bluetooth y WiFi)
- **Buena opción:** Brother QL-810W (admite varias tabletas por WiFi)
- **Económica:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la app B1 Checkin. Las impresoras de otras marcas no funcionarán para imprimir credenciales.
:::

:::info
Siga las instrucciones de configuración de su impresora para conectarla a la misma red WiFi que su tableta. Puede encontrar los controladores y guías de configuración de impresoras Brother en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalización de la apariencia del quiosco {#customizing-the-kiosk-appearance}

Puede personalizar el aspecto de la app B1 Checkin para que coincida con la imagen de su iglesia. En B1 Admin, vaya a **Móvil > B1 CheckIn** (o haga clic en **Quiosco** en la página de Asistencia) y use la tarjeta **Tema del quiosco**. Haga clic en **Guardar** en la tarjeta después de realizar cambios.

### Colores {#colors}

El quiosco usa los mismos colores que la app de su iglesia. Configúrelos en **Móvil > Tema de la app**; la tarjeta Tema del quiosco no tiene sus propios ajustes de color.

### Imagen de fondo {#background-image}

En **Imagen de fondo**, haga clic en **Subir imagen** para añadir un fondo opcional para las pantallas de bienvenida y de búsqueda del quiosco. El tamaño recomendado es de 1920x1080 píxeles. Use **Cambiar imagen** o **Quitar** para reemplazarla o eliminarla.

### Pantalla de inactividad / Protector de pantalla {#idle-screen--screensaver}

Configure un protector de pantalla que se active después de un periodo de inactividad:

1. Abra **Pantalla de inactividad / Protector de pantalla** y active **Habilitar pantalla de inactividad**.
2. Establezca **Tiempo de espera (segundos)**: cuántos segundos de inactividad pasan antes de que se inicie el protector de pantalla (mínimo 10).
3. Haga clic en **Añadir diapositiva** por cada diapositiva, haga clic en **Subir** para elegir su imagen y establezca su **Duración (s)** (mínimo 3 segundos).

:::tip
Use la pantalla de inactividad para mostrar anuncios, próximos eventos o mensajes de bienvenida cuando el quiosco no esté siendo utilizado.
:::

## Registro de invitados mediante código QR {#guest-registration-via-qr-code}

El quiosco de registro de entrada puede mostrar un código QR que los visitantes escanean para registrarse ellos mismos y a su familia desde su propio teléfono. Esto agiliza el proceso de registro de entrada para los visitantes que llegan por primera vez.

Cuando un invitado escanea el código QR, se le lleva a una [página de registro de invitados](../../b1-church/checkin/guest-registration.md) donde introduce los nombres de su familia y cualquier otro dato que usted decida pedir. Después, un voluntario puede buscarlo en el quiosco y registrar su entrada.

### Activación del registro de invitados mediante QR {#enabling-qr-guest-registration}

Para activar la visualización del código QR:

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y despliegue **Móvil**.
2. Haga clic en **B1 CheckIn**.
3. Active **Registro de invitados por QR** y haga clic en **Guardar**.

:::note
Este ajuste se encuentra en **Móvil > B1 CheckIn** (la misma página que la tarjeta **Tema del quiosco**), no en Asistencia. La acción **Quiosco** de la página de Asistencia tiene un enlace a esta página.
:::

Una vez activado el interruptor, las demás opciones que aparecen a continuación se muestran en la misma tarjeta **Registro de invitados por QR**. Haga clic en **Guardar** en la tarjeta después de cambiar cualquiera de ellas.

### Elección de los campos de registro {#choosing-sign-up-fields}

La lista de **Campos de registro** controla lo que pide el formulario de registro. **Nombre** y **Apellido** siempre aparecen en el formulario y siempre son obligatorios para cada miembro de la familia. Para cada uno de los demás campos, active **Incluir** para añadirlo al formulario y luego active **Obligatorio** si los invitados deben completarlo. **Obligatorio** solo puede activarse para un campo incluido, y desactivar **Incluir** lo borra.

| Campo | Se solicita | Incluido por defecto |
|-------|-----------|---------------------|
| **Título** | A cada miembro de la familia, como un menú desplegable delante del nombre (Sr., Sra., Srta., Ms., Dr., Prof., Rev., Pastor) | No |
| **Correo electrónico** | Solo al contacto principal | Sí (opcional) |
| **Teléfono** | A cada miembro de la familia. Cuando es obligatorio, solo el contacto principal debe completarlo. | Sí (opcional) |
| **Rol en el hogar** | A cada miembro de la familia después del contacto principal: Cónyuge, Hijo o Otro. El contacto principal es el jefe de un nuevo hogar. Quien no tenga un rol se guarda como Otro. | Sí (opcional) |
| **Dirección particular** | Una vez para la familia: calle, línea de dirección 2, ciudad, estado y código postal. Cuando es obligatoria, todo excepto la línea de dirección 2 debe completarse. La dirección se guarda en cada miembro de la familia. | No |
| **Fecha de nacimiento** | A cada miembro de la familia | No |
| **Género** | A cada miembro de la familia | No |
| **Estado civil** | Solo al contacto principal | No |
| **Grado** | A cada miembro de la familia (de PreK a 12, o Graduado) | No |
| **Comentarios** | Una vez, en un cuadro debajo de los miembros de la familia (hasta 1,000 caracteres) | No |

Los campos que desactive nunca se guardan, incluso si alguien los envía al formulario de otra forma. Los comentarios se guardan como una nota en el registro del contacto principal (publicada como "Registro de invitado"), para que pueda leerlos en la sección **Notas** de su perfil.

### Añadir invitados a un grupo {#adding-guests-to-a-group}

Use **Añadir nuevos invitados al grupo** para incluir automáticamente a todos los que se registren en uno de sus grupos, por ejemplo, un grupo de "Nuevos" o un grupo para el evento de este fin de semana. Elija **Ninguno** (la opción predeterminada) para omitir este paso. Los invitados nunca ven ni eligen el grupo; se establece únicamente aquí. Cámbielo antes de cada evento para poder dar seguimiento juntos a los invitados de ese evento.

### Registro de asistencia {#recording-attendance}

Cuando se selecciona un grupo, aparece un interruptor **Registrar también la asistencia**. Actívelo para marcar a los invitados como presentes en el momento en que se registran, para que no tenga que registrar su entrada por separado.

La asistencia solo se registra cuando el registro se realiza durante uno de los horarios de servicio **programados** de los grupos seleccionados:

- El grupo debe estar vinculado a uno o más horarios de servicio, y esos horarios de servicio deben tener un [horario de registro](setup.md#setting-a-check-in-schedule) (un **Día** y una **Hora de inicio**).
- "Durante" significa dentro de la ventana de registro de ese horario de servicio: desde los minutos de **Abrir registro** antes del inicio hasta los minutos de **Cerrar registro** después del final (o después del inicio, si no hay hora de fin; si no hay ni hora de fin ni minutos de cierre, hasta el final de ese día), en la misma zona horaria que usa el horario de registro.
- Cada miembro de la familia se marca como presente en el grupo para cada uno de sus horarios de servicio que esté abierto en ese momento, en la fecha de hoy.
- Los registros en cualquier otro momento, o para un grupo cuyos horarios de servicio no tienen horario, se añaden al grupo pero no se cuentan como asistencia.

### Foto de encabezado {#header-photo}

En **Foto de encabezado**, haga clic en **Cambiar foto** para elegir o subir una imagen (recortada a un formato 16:9) que se mostrará en la parte superior de la página de registro en lugar del icono predeterminado. Haga clic en **Quitar** para volver al icono.

### Compartir el enlace de registro {#sharing-the-registration-link}

Una vez activado el registro de invitados por QR, aparece una sección **Compartir código QR de registro** en la parte inferior de la tarjeta. Esto le ofrece dos formas de llevar a los invitados al formulario de registro, además del código QR del quiosco:

- **Copiar enlace**: copia la URL de registro para que pueda pegarla en el sitio web de su iglesia, en correos electrónicos o en cualquier lugar en línea.
- **Descargar PNG**: descarga el código QR como una imagen que puede imprimir en volantes, boletines o señalización.

:::tip
Añada el enlace de registro a la página "Planifique su visita" o "Soy nuevo" del sitio web de su iglesia para que los invitados puedan registrarse incluso antes de llegar.
:::

### Qué sucede después de que un invitado se registra {#what-happens-after-a-guest-signs-up}

B1 primero busca personas que ya estén en **Personas**. Un miembro de la familia se relaciona con una persona existente cuando exactamente una persona tiene el mismo nombre y el mismo correo electrónico o teléfono. Un niño introducido sin correo electrónico ni teléfono se relaciona por nombre dentro del hogar que sí se relacionó. Las personas relacionadas se reutilizan tal como están: el registro nunca cambia sus datos ni su estado de membresía, y cualquier persona nueva se une al hogar relacionado.

Cuando nadie coincide, el registro crea un nuevo hogar con el apellido del contacto principal, con un registro de persona para cada miembro de la familia. Todas las personas nuevas se añaden a **Personas** con el estado de membresía **Visitante**, y el contacto principal es el jefe del hogar.

Tanto las personas relacionadas como las nuevas se añaden al grupo que eligió (si aún no están en él) y se registra su asistencia cuando esta opción está activada. Los comentarios se guardan como una nota en el contacto principal.

Para dar seguimiento automáticamente, añada un [disparador de flujo de trabajo](../serving/workflows.md#triggers) como **Persona · Creada** con la condición *Estado de membresía es Visitante*, o **Grupo · Miembro se unió** para el grupo que eligió arriba.

## Qué se registra {#what-gets-recorded}

Cada registro de entrada crea un registro de asistencia en B1 Admin. Puede ver estos registros en la página de [Asistencia](tracking-attendance.md) y en las sesiones de cada [grupo](../groups/group-members.md), igual que la asistencia introducida manualmente. No hay diferencia en la forma en que se muestran los datos: ambos métodos alimentan los mismos informes.
