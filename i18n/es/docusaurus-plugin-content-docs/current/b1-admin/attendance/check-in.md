---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin permite el registro de entrada por autoservicio en las reuniones mediante la aplicación complementaria **B1 Checkin**. Los miembros pueden registrar su llegada y la de sus familias en kioscos o dispositivos dedicados al llegar, lo que hace el proceso más rápido y reduce la carga de trabajo de sus voluntarios. Cada registro de entrada se guarda automáticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Sus campus, horarios de servicio y grupos deben estar configurados en [Configuración de asistencia](setup.md).
- Necesita [personas en su base de datos](../people/adding-people.md) con [hogares](../people/adding-people.md#managing-households) configurados para que las familias puedan registrarse juntas.
- Necesitará una tableta y, opcionalmente, una impresora de etiquetas Brother (consulte las [recomendaciones de hardware](#recommended-hardware) más abajo).

</div>

## Cómo funciona

La aplicación B1 Checkin se conecta a su configuración de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se guarda automáticamente en el campus, horario de servicio y grupo correctos. No necesita introducir la asistencia manualmente para las personas que usan el sistema de registro.

## Configuración del registro de entrada

1. **Configure primero su estructura de asistencia.** En B1 Admin, vaya a **Personas > Asistencia** y haga clic en **Configuración** para asegurarse de que sus campus, horarios de servicio y grupos estén establecidos. La aplicación de registro depende de esta configuración. Opcionalmente, asigne a cada horario de servicio un [horario de registro](setup.md#setting-a-check-in-schedule) para que el registro se abra y se cierre automáticamente cada semana. Los horarios usan la zona horaria del campus del servicio, o la zona horaria de su iglesia si el campus no tiene una configurada; el kiosco muestra como **Cerrado** los horarios de servicio cuya ventana está cerrada e informa a las familias cuándo se abre el registro. Para más detalles, consulte [Configuración de asistencia](setup.md).
2. **Instale la aplicación B1 Checkin** en los dispositivos que planea usar. La aplicación está disponible en las siguientes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tabletas Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tabletas Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicie sesión en la aplicación B1 Checkin** con las credenciales de la cuenta de su iglesia.
4. **Seleccione el campus y el horario de servicio** de la reunión actual.
5. Los miembros ya pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloque los dispositivos de registro en lugares visibles y de fácil acceso, como las entradas del vestíbulo o las mesas de bienvenida. Un breve anuncio durante los servicios ayuda a los miembros a saber que esta opción está disponible.
:::

:::tip
Si su iglesia tiene varios campus, deberá repetir la configuración para cada campus en [Configuración de asistencia](setup.md). Cada dispositivo de registro puede configurarse para un campus diferente.
:::

## Hardware recomendado

**Tabletas**: cualquiera de estas funciona bien con la aplicación:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla grande:** Samsung Galaxy Tab A8 10.5"
- **Económica:** Amazon Fire HD 10

**Impresoras**: el registro funciona con impresoras de etiquetas Brother para imprimir gafetes:

- **Mejor opción:** Brother QL-1110NWB (admite varias tabletas por Bluetooth y WiFi)
- **Buena opción:** Brother QL-810W (admite varias tabletas por WiFi)
- **Económica:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Las impresoras de otras marcas no funcionarán para imprimir gafetes.
:::

:::info
Siga las instrucciones de configuración de su impresora para conectarla a la misma red WiFi que su tableta. Puede encontrar los controladores y guías de configuración de impresoras Brother en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalización de la apariencia del kiosco

Puede personalizar el aspecto de la aplicación B1 Checkin para que coincida con la identidad visual de su iglesia. En B1 Admin, vaya a **Móvil > B1 CheckIn** y use la tarjeta **Tema del kiosco** para configurar:

### Colores

Personalice ocho configuraciones de color para que coincidan con la identidad de su iglesia:

- **Principal** y **Contraste principal**: color principal de la marca y su color de texto.
- **Secundario** y **Contraste secundario**: color de acento y su color de texto.
- **Fondo del encabezado** y **Fondo del subencabezado**: colores de las áreas de encabezado del kiosco.
- **Fondo de botones** y **Texto de botones**: colores de los botones interactivos.

### Imagen de fondo

Suba una imagen de fondo opcional para las pantallas de bienvenida y de búsqueda del kiosco. El tamaño recomendado es de 1920x1080 píxeles.

### Pantalla de inactividad / Protector de pantalla

Configure un protector de pantalla que se active tras un período de inactividad:

1. Active o desactive la pantalla de inactividad.
2. Establezca el **tiempo de espera** (cuántos segundos de inactividad pasan antes de que comience el protector de pantalla; mínimo 10 segundos).
3. Agregue una o más **diapositivas**: cada diapositiva tiene una imagen y una duración de visualización (mínimo 3 segundos).

:::tip
Use la pantalla de inactividad para mostrar anuncios, próximos eventos o mensajes de bienvenida cuando el kiosco no esté en uso.
:::

## Registro de visitantes mediante código QR

El kiosco de registro puede mostrar un código QR que los visitantes escanean para registrarse ellos mismos y a su familia desde su propio teléfono. Esto agiliza el registro de los visitantes que llegan por primera vez.

Cuando un visitante escanea el código QR, se le dirige a una [página de registro de visitantes](../../b1-church/checkin/guest-registration), donde ingresa los nombres de su familia y los demás datos que usted decida solicitar. Luego, un voluntario puede buscarlo en el kiosco y registrar su llegada.

### Activación del registro de visitantes por QR

Para activar la visualización del código QR:

1. En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Móvil**.
2. Haga clic en **B1 CheckIn**.
3. Active **Registro de visitantes por QR** y haga clic en **Guardar**.

:::note
Esta configuración se encuentra en **Móvil > B1 CheckIn** (la misma página que la tarjeta **Tema del kiosco**), no en Asistencia. La acción **Kiosco** de la página de Asistencia tiene un enlace a esta página.
:::

Una vez activado el interruptor, las demás opciones que aparecen a continuación se muestran en la misma tarjeta **Registro de visitantes por QR**. Haga clic en **Guardar** en la tarjeta después de cambiar cualquiera de ellas.

### Elección de los campos de registro

La lista de **campos de registro** controla lo que solicita el formulario de registro. **Nombre** y **Apellido** siempre aparecen en el formulario y siempre son obligatorios para cada miembro de la familia. Para cada uno de los demás campos, active **Incluir** para agregarlo al formulario y luego active **Obligatorio** si los visitantes deben completarlo. **Obligatorio** solo puede activarse para un campo incluido, y desactivar **Incluir** lo borra.

| Campo | Se solicita | Incluido por defecto |
|-------|-------------|----------------------|
| **Correo electrónico** | Solo al contacto principal | Sí (opcional) |
| **Teléfono** | Solo al contacto principal | Sí (opcional) |
| **Dirección de casa** | Una vez por familia: calle, línea de dirección 2, ciudad, estado y código postal. Cuando es obligatorio, todo excepto la línea de dirección 2 debe completarse. La dirección se guarda en cada miembro de la familia. | No |
| **Fecha de nacimiento** | Cada miembro de la familia | No |
| **Género** | Cada miembro de la familia | No |
| **Estado civil** | Solo al contacto principal | No |
| **Grado** | Cada miembro de la familia (desde PreKínder hasta 12, o Graduado) | No |
| **Comentarios** | Una vez, en un cuadro debajo de los miembros de la familia (hasta 1,000 caracteres) | No |

Los campos que desactive nunca se guardan, incluso si alguien los envía al registro de otra forma. Los comentarios se guardan como una nota en el registro del contacto principal (publicada como "Registro de visitante"), para que pueda leerlos en la sección **Notas** de su perfil.

### Agregar visitantes a un grupo

Use **Agregar nuevos visitantes al grupo** para incluir automáticamente a todas las personas que se registren en uno de sus grupos, por ejemplo, un grupo de "Recién llegados" o un grupo para el evento de este fin de semana. Elija **Ninguno** (la opción predeterminada) para omitir esto. Los visitantes nunca ven ni eligen el grupo; solo se configura aquí. Cámbielo antes de cada evento para poder hacer seguimiento a los visitantes de ese evento en conjunto.

### Registro de asistencia

Cuando se selecciona un grupo, aparece un interruptor **Registrar también la asistencia**. Actívelo para marcar a los visitantes como presentes en el momento en que se registran, para que no tenga que registrarlos por separado.

La asistencia solo se registra cuando el registro ocurre durante uno de los horarios de servicio **programados** del grupo seleccionado:

- El grupo debe estar vinculado a uno o más horarios de servicio, y esos horarios de servicio deben tener un [horario de registro](setup.md#setting-a-check-in-schedule) (un **Día** y una **Hora de inicio**).
- "Durante" significa dentro de la ventana de registro de ese horario de servicio: desde los minutos de **Abrir registro** antes del inicio hasta los minutos de **Cerrar registro** después del final (o después del inicio, si no se establece una hora de fin), en la misma zona horaria que usa el horario de registro.
- Cada miembro de la familia se marca como presente en el grupo para cada uno de sus horarios de servicio que esté abierto en ese momento, en la fecha de hoy.
- Los registros en cualquier otro momento, o para un grupo cuyos horarios de servicio no tienen horario de registro, se agregan al grupo pero no se cuentan como asistencia.

### Foto de encabezado

En **Foto de encabezado**, haga clic en **Cambiar foto** para elegir o subir una imagen (recortada a una proporción de 16:9) que se mostrará en la parte superior de la página de registro en lugar del ícono predeterminado. Haga clic en **Quitar** para volver al ícono.

### Compartir el enlace de registro

Una vez activado el registro de visitantes por QR, aparece una sección **Compartir código QR de registro** en la parte inferior de la tarjeta. Esto le ofrece dos formas de llevar a los visitantes al formulario de registro, además del código QR del kiosco:

- **Copiar enlace**: copia la URL de registro para que pueda pegarla en el sitio web de su iglesia, en correos electrónicos o en cualquier lugar en línea.
- **Descargar PNG**: descarga el código QR como una imagen que puede imprimir en volantes, boletines o señalización.

:::tip
Agregue el enlace de registro a la página "Planee su visita" o "Soy nuevo" del sitio web de su iglesia para que los visitantes puedan registrarse incluso antes de llegar.
:::

### Qué sucede después de que un visitante se registra

Cada registro crea un nuevo hogar con el apellido del contacto principal, con un registro de persona para cada miembro de la familia. Todos se agregan a **Personas** con el estado de membresía **Visitante**, y el contacto principal como jefe de hogar.

Para hacer seguimiento automáticamente, agregue un [disparador de flujo de trabajo](../serving/workflows.md#triggers), como **Persona · Creada** con la condición *Estado de membresía es Visitante*, o **Grupo · Miembro se unió** para el grupo que eligió arriba.

## Qué se registra

Cada registro de entrada crea un registro de asistencia en B1 Admin. Puede ver estos registros en la página de [Asistencia](tracking-attendance.md) y en las sesiones de cada [grupo](../groups/group-members.md), igual que la asistencia ingresada manualmente. No hay diferencia en cómo aparecen los datos: ambos métodos alimentan los mismos informes.
