---
title: "Descripción general de B1 Admin"
---

# Descripción general de B1 Admin

<div class="article-intro">

B1 Admin es su panel de administración de la iglesia. Ofrece herramientas para administrar todos los aspectos de las operaciones de su iglesia -- desde los directorios de miembros y las donaciones hasta la creación del sitio web y la transmisión en vivo -- todo desde un solo lugar.

</div>

## Primeros pasos

1. Abra su navegador y vaya a [admin.b1.church](https://admin.b1.church)
2. Inicie sesión con su nombre de usuario y contraseña
3. Llegará al **Panel**, su página de inicio. Muestra el orden de servicio de esta semana, quién ha registrado su entrada y está sirviendo en tiempo real, lo que requiere su atención (como aprobaciones pendientes o solicitudes para unirse a grupos), sus tareas abiertas y sus grupos

:::tip
¿Es nuevo en B1 Admin? Comience con la [Introducción](./introduction) para ver un video de recorrido, y después visite [Configuración](./settings/) para configurar la información de su iglesia e invitar a su equipo.
:::

## Su panel

El Panel es la página de inicio de B1 Admin (`/`). Está organizado en torno al servicio semanal de su iglesia:

- **Servicio de esta semana** -- el nombre del plan actual o próximo y su orden de servicio, con un enlace al plan completo
- **Estado en vivo** -- cuando las personas empiezan a registrar su entrada el domingo, la página muestra cuántas hay en el salón, quién está sirviendo en esta hora, los invitados que llegan por primera vez y un desglose por salón con barras de capacidad
- **Requiere atención** -- aprobaciones pendientes y solicitudes para unirse a grupos que necesitan una acción
- **Mis tareas** y **Mis grupos** -- sus tareas abiertas (agregue una con **Agregar tarea**, o haga clic en **Todas las tareas** para ver la lista completa) y los grupos a los que pertenece

Lo que muestra el Panel depende de su [rol](./settings/roles-permissions.md). Por ejemplo, el enlace al plan completo solo aparece si puede abrir ese plan (usted edita planes, pertenece al ministerio del plan o está sirviendo en él), y el enlace **Todos los grupos** solo aparece si puede administrar grupos, ver los miembros de los grupos o ver personas.

:::tip
Todas las secciones, incluidas Sermones, Calendarios, Móvil y Configuración, están en el [menú Jump](./introduction.md#getting-around-with-the-jump-menu) en la parte superior izquierda de B1 Admin. Haga clic en él o presione **Ctrl+K** (o **Cmd+K**), y luego explore o empiece a escribir.
:::

## Funciones principales

- **[Personas](./people/)** - Administre el directorio de su iglesia, agregue miembros, edite datos en lote y explore por hogar o en una tabla ordenable. Cada persona se abre en una sola página de registro con sus datos a la izquierda y los resúmenes de asistencia, donaciones, grupos, notas y formularios a su lado. Encuentre a las personas agregadas recientemente con la búsqueda de **Fecha de alta**. La página de [Notas](./people/notes) muestra las notas recientes de personas, grupos, eventos y tarjetas de flujo de trabajo
- **[Grupos](./groups/)** - Cree y organice los grupos de la iglesia con solicitudes de ingreso, administración de miembros, correo de grupo, mensajes de texto personalizados con plantillas reutilizables y un marcador de Nombre del grupo, y listas de contacto imprimibles. Cada grupo se abre en una página con sus acciones a la izquierda y los resúmenes de miembros, sesiones, calendario y estado a su lado
- **[Asistencia](./attendance/)** - Configure campus y horarios de servicio, registre la asistencia nominal con hojas de asistencia de clase imprimibles, vea qué clases aún necesitan que se registre su asistencia, registre conteos simples de personas con informes de tendencias, asigne a cada horario de servicio un horario de registro para que el autorregistro se abra y cierre por sí solo, en la zona horaria de cada campus, y permita que los invitados que llegan por primera vez se registren desde un [código QR](./attendance/check-in#guest-registration-via-qr-code) con los campos que usted elija
- **[Donaciones](./donations/)** - Registre donativos en varias monedas, administre fondos, registre un solo donativo desde el registro de una persona, imprima lotes (uno a la vez o todos los lotes de un rango de fechas) con el membrete de su iglesia y subtotales por fondo, cierre los lotes una vez contados, importe un lote desde un archivo CSV, permita que los equipos de conteo registren donativos con el permiso **Ingresar donaciones**, y genere estados de cuenta impresos con el logotipo de su iglesia
- **[Servicio](./serving/)** - Coordine voluntarios, cree planes de servicio (o copie uno hacia adelante cada semana por hasta 12 semanas), envíe recordatorios por notificación push, correo electrónico o mensaje de texto, envíe mensajes de texto a todos los programados con **Enviar texto a voluntarios**, administre tareas y lleve a las personas por flujos de trabajo paso a paso que pueden enviar correos y textos, notificar a un miembro del personal, registrar asistencia y dar seguimiento a si los voluntarios confirmaron sus asignaciones. Las reglas de flujo de trabajo programadas pueden encontrar a donantes habituales inactivos, y los planes impresos omiten las columnas vacías
- **[Formularios](./forms/)** - Cree formularios personalizados para inscripciones y recopilación de datos, agregue una foto de encabezado, comparta formularios independientes con un código QR y vincule un formulario a un grupo para que sus líderes puedan leer e imprimir las respuestas
- **[Informes](./reports/)** - Consulte los informes de cumpleaños, asistencia y donaciones
- **[Sitio web](./website/)** - Cree y administre el sitio web de su iglesia con estilos de navegación personalizados, dé seguimiento a las visitas a su sitio y a su aplicación de B1 con su ID de GA4, o desactive el sitio público y conserve solo el portal de miembros
- **[Sermones](./sermons/)** - Administre su biblioteca de sermones, la transmisión en vivo y una fuente automática de podcast
- **[Calendarios](./calendars/)** - Cree calendarios seleccionados, administre reservaciones de salones y recursos, y consulte la disponibilidad. Reciba [inscripciones a eventos](./calendars/paid-registrations) con tipos de asistente con precio, agregue asistentes a mano sin cobrarles, y permita que las personas se inscriban y paguen después cuando su iglesia no tiene donaciones en línea
- **[Configuración](./settings/)** - Configure todo desde una sola página con una lista de acceso rápido: información de la iglesia, región, formato de fecha y teléfono, mensajes de texto (incluida su propia cuenta de Twilio), roles con conteo de miembros, permisos y campos personalizados de personas

:::info
Haga clic en el ícono de signo de interrogación en la esquina superior derecha de cualquier página para acceder rápidamente a la ayuda y la documentación. Para cambiar el tema de color (**Predeterminado**, **Clásico** o **Personalizado**) o alternar entre el modo claro y oscuro, abra el menú de usuario y use **Preferencias de tema**. Para proteger su cuenta con un código de una aplicación de autenticación, active la [Verificación en dos pasos](./profile/managing-profile#two-factor-sign-in) en su perfil.
:::

Para soporte, escriba a [support@churchapps.org](mailto:support@churchapps.org).
