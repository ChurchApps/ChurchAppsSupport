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

## Cómo funciona

La app B1 Checkin se conecta con la configuración de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se guarda automáticamente en el campus, el horario de servicio y el grupo correctos. No necesita introducir la asistencia manualmente para quienes usan el sistema de registro de entrada.

## Configuración del registro de entrada

1. **Configure primero la estructura de asistencia.** En B1 Admin, vaya a **Personas > Asistencia** y haga clic en **Configuración** para asegurarse de que sus campus, horarios de servicio y grupos estén listos. La app de registro depende de esta configuración. Opcionalmente, asigne a cada horario de servicio un [horario de registro](setup.md#setting-a-check-in-schedule) para que el registro se abra y cierre automáticamente cada semana. Los horarios usan la zona horaria del campus del servicio o, si el campus no tiene una definida, la zona horaria de su iglesia. El quiosco muestra como **Cerrado** los horarios de servicio cuya ventana está cerrada e informa a las familias cuándo se abrirá el registro. Consulte [Configuración de asistencia](setup.md) para más detalles.
2. **Instale la app B1 Checkin** en los dispositivos que planea usar. La app está disponible en las siguientes plataformas:
   - **iPad/iOS:** [App Store de Apple](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tabletas Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tabletas Amazon Fire:** [Tienda de aplicaciones de Amazon](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicie sesión en la app B1 Checkin** con una cuenta que tenga el permiso de asistencia **Checkin** (o **Editar asistencia**). Consulte [Cuentas de quiosco para el registro de entrada](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Seleccione el campus y el horario de servicio** de la reunión actual.
5. Ahora los miembros pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloque los dispositivos de registro en lugares visibles y de fácil acceso, como las entradas del vestíbulo o las mesas de bienvenida. Un breve anuncio durante los servicios ayuda a que los miembros sepan que esta opción está disponible.
:::

:::tip
Si su iglesia tiene varios campus, deberá repetir la configuración para cada uno en [Configuración de asistencia](setup.md). Cada dispositivo de registro puede configurarse para un campus diferente.
:::

## Hardware recomendado

**Tabletas**: cualquiera de estas funciona bien con la app:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla grande:** Samsung Galaxy Tab A8 10.5"
- **Económica:** Amazon Fire HD 10

**Impresoras**: el registro de entrada funciona con impresoras de etiquetas Brother para imprimir gafetes:

- **Mejor opción:** Brother QL-1110NWB (admite varias tabletas mediante Bluetooth y WiFi)
- **Buena opción:** Brother QL-810W (admite varias tabletas mediante WiFi)
- **Económica:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la app B1 Checkin. Las impresoras de otras marcas no funcionarán para imprimir gafetes.
:::

:::info
Siga las instrucciones de configuración de su impresora para conectarla a la misma red WiFi que su tableta. Puede encontrar los controladores y las guías de configuración de las impresoras Brother en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Personalización del aspecto del quiosco

Puede personalizar el aspecto de la app B1 Checkin para que coincida con la identidad visual de su iglesia. En B1 Admin, vaya a **Móvil > B1 CheckIn** y use la tarjeta **Tema del quiosco** para configurar:

### Colores

Personalice ocho colores para que coincidan con la identidad visual de su iglesia:

- **Principal** y **Contraste principal** -- Color principal de la marca y su color de texto.
- **Secundario** y **Contraste secundario** -- Color de acento y su color de texto.
- **Fondo del encabezado** y **Fondo del subencabezado** -- Colores de las áreas de encabezado del quiosco.
- **Fondo de botones** y **Texto de botones** -- Colores de los botones interactivos.

### Imagen de fondo

Suba una imagen de fondo opcional para las pantallas de bienvenida y búsqueda del quiosco. El tamaño recomendado es de 1920x1080 píxeles.

### Pantalla de inactividad / Protector de pantalla

Configure un protector de pantalla que se active después de un período de inactividad:

1. Active o desactive la pantalla de inactividad.
2. Defina el **tiempo de espera** (cuántos segundos de inactividad deben pasar antes de que inicie el protector, con un mínimo de 10 segundos).
3. Agregue una o más **diapositivas**: cada diapositiva tiene una imagen y un tiempo de visualización (mínimo 3 segundos).

:::tip
Use la pantalla de inactividad para mostrar anuncios, próximos eventos o mensajes de bienvenida cuando el quiosco no se esté usando.
:::

## Registro de visitantes mediante código QR

El quiosco de registro de entrada puede mostrar un código QR que los visitantes escanean para registrarse ellos mismos y a su familia desde su propio teléfono. Esto agiliza el proceso de registro de entrada para los visitantes que llegan por primera vez.

Cuando un visitante escanea el código QR, se le lleva a una [página de registro de visitantes](../../b1-church/checkin/guest-registration.md) donde introduce los nombres de su familia y los demás datos que usted decida solicitar. Después, un voluntario puede buscarlo en el quiosco y registrar su entrada.

### Activación del registro de visitantes con QR

Para activar la visualización del código QR:

1. En B1 Admin, abra el [menú de navegación rápida](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Móvil**.
2. Haga clic en **B1 CheckIn**.
3. Active **Registro de visitantes con QR** y haga clic en **Guardar**.

:::note
Esta configuración se encuentra en **Móvil > B1 CheckIn** (la misma página que la tarjeta **Tema del quiosco**), no en Asistencia. La acción **Quiosco** de la página de Asistencia tiene un enlace a esta página.
:::

Una vez activado el interruptor, las demás opciones aparecen en la misma tarjeta **Registro de visitantes con QR**. Haga clic en **Guardar** en la tarjeta después de cambiar cualquiera de ellas.

### Elección de los campos de registro

La lista **Campos de registro** controla lo que pide el formulario de registro. **Nombre** y **Apellido** siempre aparecen en el formulario y siempre son obligatorios para cada miembro de la familia. Para cada uno de los demás campos, active **Incluir** para agregarlo al formulario y, después, active **Obligatorio** si los visitantes deben completarlo. **Obligatorio** solo puede activarse para un campo incluido, y desactivar **Incluir** lo borra.

| Campo | Se solicita | Incluido por defecto |
|-------|-------------|----------------------|
| **Tratamiento** | A cada miembro de la familia, como lista desplegable delante del nombre (Sr., Sra., Srta., Dr., Dra., Prof., Rev., Pastor) | No |
| **Correo electrónico** | Solo al contacto principal | Sí (opcional) |
| **Teléfono** | A cada miembro de la familia. Si es obligatorio, solo el contacto principal debe completarlo. | Sí (opcional) |
| **Rol en el hogar** | A cada miembro de la familia después del contacto principal: Cónyuge, Hijo/a u Otro. El contacto principal es el jefe de un nuevo hogar. Quien no tenga rol se guarda como Otro. | Sí (opcional) |
| **Dirección particular** | Una vez para toda la familia: calle, línea de dirección 2, ciudad, estado y código postal. Si es obligatoria, todo debe completarse excepto la línea de dirección 2. La dirección se guarda en cada miembro de la familia. | No |
| **Fecha de nacimiento** | A cada miembro de la familia | No |
| **Género** | A cada miembro de la familia | No |
| **Estado civil** | Solo al contacto principal | No |
| **Grado** | A cada miembro de la familia (de PreK a 12, o Graduado) | No |
| **Comentarios** | Una vez, en un cuadro debajo de los miembros de la familia (hasta 1,000 caracteres) | No |

Los campos que desactive nunca se guardan, aunque alguien los envíe de otra manera al formulario. Los comentarios se guardan como una nota en el registro del contacto principal (publicada como «Registro de visitante»), para que pueda leerlos en la sección **Notas** de su perfil.

### Agregar visitantes a un grupo

Use **Agregar nuevos visitantes al grupo** para incluir automáticamente a todas las personas que se registren en uno de sus grupos, por ejemplo, un grupo de «Recién llegados» o un grupo para el evento de este fin de semana. Elija **Ninguno** (la opción predeterminada) para omitir este paso. Los visitantes nunca ven ni eligen el grupo; solo se asigna aquí. Cámbielo antes de cada evento para poder hacer seguimiento a los visitantes de ese evento en conjunto.

### Registro de asistencia

Cuando se selecciona un grupo, aparece el interruptor **Registrar también la asistencia**. Actívelo para marcar a los visitantes como presentes en el momento en que se registran, de modo que no tenga que registrar su entrada por separado.

La asistencia solo se registra cuando el registro ocurre durante uno de los horarios de servicio **programados** del grupo seleccionado:

- El grupo debe estar vinculado a uno o más horarios de servicio, y esos horarios deben tener un [horario de registro](setup.md#setting-a-check-in-schedule) (un **Día** y una **Hora de inicio**).
- «Durante» significa dentro de la ventana de registro de ese horario de servicio: desde los minutos de **Abrir registro** antes del inicio hasta los minutos de **Cerrar registro** después del final (o después del inicio, si no hay hora de finalización; si no hay hora de finalización ni minutos de cierre, hasta el final de ese día), en la misma zona horaria que usa el horario de registro.
- Cada miembro de la familia se marca como presente en el grupo para cada uno de sus horarios de servicio que esté abierto en ese momento, en la fecha de hoy.
- Los registros en cualquier otro momento, o para un grupo cuyos horarios de servicio no tengan horario de registro, se agregan al grupo pero no se cuentan como asistencia.

### Foto de encabezado

En **Foto de encabezado**, haga clic en **Cambiar foto** para elegir o subir una imagen (recortada en formato 16:9) que se mostrará en la parte superior de la página de registro en lugar del ícono predeterminado. Haga clic en **Quitar** para volver al ícono.

### Compartir el enlace de registro

Una vez activado el registro de visitantes con QR, aparece una sección **Compartir código QR de registro** en la parte inferior de la tarjeta. Esto le ofrece dos formas de llevar a los visitantes al formulario de registro, además del código QR del quiosco:

- **Copiar enlace**: copia la URL de registro para que pueda pegarla en el sitio web de su iglesia, en correos electrónicos o en cualquier lugar en línea.
- **Descargar PNG**: descarga el código QR como imagen para imprimirlo en volantes, boletines o señalización.

:::tip
Agregue el enlace de registro a la página «Planee su visita» o «Soy nuevo» del sitio web de su iglesia para que los visitantes puedan registrarse incluso antes de llegar.
:::

### Qué sucede después de que un visitante se registra

B1 primero busca personas que ya estén en **Personas**. Un miembro de la familia se vincula con una persona existente cuando exactamente una persona tiene el mismo nombre y el mismo correo electrónico o teléfono. Un niño ingresado sin correo electrónico ni teléfono se vincula por nombre dentro del hogar que se haya vinculado. Las personas vinculadas se reutilizan tal como están: el registro nunca cambia sus datos ni su estado de membresía, y cualquier persona nueva se une al hogar vinculado.

Cuando nadie coincide, el registro crea un nuevo hogar con el apellido del contacto principal, junto con un registro de persona para cada miembro de la familia. Todas las personas nuevas se agregan a **Personas** con el estado de membresía **Visitante**, y el contacto principal es el jefe del hogar.

Las personas vinculadas y las nuevas se agregan al grupo que usted eligió (si aún no están en él) y se les registra la asistencia cuando esa opción está activada. Los comentarios se guardan como una nota en el contacto principal.

Para hacer seguimiento automáticamente, agregue un [disparador de flujo de trabajo](../serving/workflows.md#triggers) como **Persona · Creada** con la condición *Estado de membresía es Visitante*, o **Grupo · Miembro unido** para el grupo que eligió arriba.

## Qué se registra

Cada registro de entrada crea un registro de asistencia en B1 Admin. Puede ver estos registros en la página de [Asistencia](tracking-attendance.md) y en las sesiones de cada [grupo](../groups/group-members.md), igual que la asistencia introducida manualmente. No hay diferencia en la forma en que se muestran los datos: ambos métodos alimentan los mismos informes.
