---
title: "Registro de asistencia"
description: "Registra la asistencia de cada reunión de grupo en B1 Admin: crea una sesión, marca asistentes, guarda notas e imprime listas o exporta a una hoja de cálculo."
---

# Registro de asistencia

<div class="article-intro">

Una vez que sus campus, horarios de servicio y grupos estén configurados, puede registrar manualmente la asistencia después de cada reunión. B1 Admin organiza la asistencia en torno a **sesiones** -- una sesión por grupo y por fecha de reunión. Usted crea la sesión, marca quién asistió, y los datos alimentan directamente sus informes de asistencia.

</div>

## Video de capacitación

<YouTube id="gS8h2rhyMys" title="Registro y seguimiento de asistencia en B1" next="Creación de planes y programación de voluntarios en B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Sus campus, horarios de servicio y grupos deben estar configurados. Consulte [Configuración de asistencia](setup.md) si aún no lo ha hecho.
- Los grupos que desea registrar deben tener activada la opción **Registrar asistencia**. Consulte [Configuración de asistencia](setup.md) para más detalles.
- Necesita el permiso **Editar asistencia** para guardar la asistencia. Los voluntarios que solo tienen **Ver solo nombres de personas** pueden tomar asistencia de esta forma -- abren las clases desde **Grupos** y ven a los miembros solo por nombre. Consulte [Solo nombres de personas](../settings/roles-permissions.md#people-names-only).

</div>

## Creación de una sesión

Una sesión representa una ocurrencia de la reunión de un grupo -- por ejemplo, su clase de K a 3.er grado en un domingo específico.

1. Abra **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Personas** y haga clic en **Grupos**.
2. Seleccione el grupo para el que desea registrar la asistencia.
3. En la sección **Sesiones** de la página del grupo, haga clic en **Todas las sesiones**.
4. Haga clic en **Nuevo** para crear una nueva sesión.
5. Si el grupo está asignado a un horario de servicio, elija el **Horario de servicio**. Si es un grupo sin horario, este campo no aparecerá.
6. Seleccione la **Fecha de la sesión** -- puede ser hoy, una fecha pasada o una fecha futura.
7. Haga clic en **Guardar**.

### Agregar sesiones para cada clase de un horario de servicio {#adding-sessions-for-every-class-in-a-service-time}

Si otros grupos se reúnen en el mismo horario de servicio (por ejemplo, todas las clases de sus niños a las 9:00 a. m. del domingo), puede crear sus sesiones en un solo paso en lugar de visitar cada grupo.

1. Siga los pasos anteriores y elija un **Horario de servicio**.
2. Marque **También agregar para los otros _N_ grupos en _horario de servicio_**. La casilla muestra cuántos otros grupos están asignados a ese horario de servicio. Solo aparece al agregar una nueva sesión y cuando al menos otro grupo se reúne en ese horario.
3. Haga clic en **Guardar**.

Se crea una sesión para el grupo actual y para cada uno de los otros grupos en la misma fecha y horario de servicio. Los grupos que ya tienen una sesión para esa fecha y horario se omiten, así que no tendrá duplicados.

:::tip
Puede crear sesiones para fechas pasadas para ponerse al día con la asistencia que aún no ha registrado, o crearlas con anticipación para que estén listas cuando su grupo se reúna.
:::

## Notas de la sesión {#session-notes}

Cada sesión puede tener notas -- un resumen de lo que se cubrió, anuncios o peticiones de oración.

1. Al agregar una sesión, o después de hacer clic en el ícono **Editar** (lápiz) junto a una sesión en la lista, escriba en el cuadro **Notas (lo que se cubrió, anuncios, peticiones de oración)** debajo de la fecha. La barra de herramientas le permite agregar texto en negrita, listas y enlaces.
2. Haga clic en **Guardar**.

Las notas aparecen en la parte superior de la lista de asistencia de la sesión. También son las notas de la reunión que los miembros del grupo leen en la sección **Reuniones** de la página del grupo en B1.church, donde los líderes del grupo también pueden escribirlas y editarlas. Consulte [Detalles del grupo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcar la asistencia

Seleccione una sesión para ver su lista de asistencia. Cada miembro del grupo aparece con una casilla, ordenados por apellido, y cualquier persona ya registrada como presente aparece marcada.

1. Marque la casilla junto a cada persona que asistió. Use **Seleccionar todos** o **Deseleccionar todos** para cambiar a todos a la vez.
2. El contador sobre la lista (por ejemplo, "12 de 15 presentes") se actualiza conforme marca las casillas.
3. Haga clic en **Guardar asistencia**. No se registra nada hasta que guarde, y un mensaje confirma cuando el guardado termina. Si intenta cerrar o recargar la pestaña del navegador mientras un guardado sigue en curso, su navegador le advertirá primero para que los cambios no se pierdan.

Desmarcar a alguien que ya estaba registrado como presente y luego guardar lo elimina de la sesión.

### Agregar visitantes

Para registrar a alguien que no es miembro del grupo, busque a esa persona en la búsqueda de personas junto a la lista de asistencia. Si todavía no está en su base de datos, puede crearla desde la búsqueda. En cualquier caso, se agrega a la lista ya marcada. Haga clic en **Guardar asistencia** para registrarla.

Las personas que registraron su entrada en un quiosco muestran una etiqueta de **Voluntario** o **Invitado**. Las personas que no son miembros del grupo muestran una etiqueta de **Invitado**.

## Revisar qué grupos aún necesitan asistencia

Cuando varias clases se reúnen en el mismo horario de servicio, puede ver de un vistazo cuáles todavía necesitan que se registre su asistencia para esa fecha.

1. Abra una sesión que tenga un horario de servicio.
2. Haga clic en **Quién aún necesita asistencia** en la parte superior de la lista de asistencia.
3. Un cuadro de diálogo muestra cada grupo asignado a ese horario de servicio, con un resumen como "5 de 8 grupos registrados" en la parte superior.

Los grupos sin nadie marcado como presente para esa fecha muestran una etiqueta de **No registrado** y aparecen primero. Los grupos que tienen asistencia muestran **Registrado** con el número de personas marcadas como presentes (por ejemplo, "Registrado (12)"). Haga clic en el nombre de un grupo para abrir las sesiones de ese grupo con la sesión de la misma fecha ya seleccionada, para que pueda registrar su asistencia de inmediato. Si el grupo aún no tiene una sesión para esa fecha, se abre su lista de sesiones para que pueda agregar una.

:::tip
Combine esto con **Imprimir todas las clases** y [agregar sesiones para cada clase de un horario de servicio](#adding-sessions-for-every-class-in-a-service-time): cree las sesiones, entregue las hojas de asistencia y luego use **Quién aún necesita asistencia** para ver cuáles hojas todavía no se han registrado.
:::

## Impresión de una hoja de asistencia {#printing-a-roll-sheet}

Una hoja de asistencia es una lista de clase imprimible que los maestros pueden marcar a mano y devolverle para que la registre después. Cada hoja muestra el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) con el nombre de la iglesia debajo, la clase, una línea grande de **Fecha** debajo del nombre de la clase, y el horario de servicio. Los miembros aparecen en dos columnas (se lee hacia abajo la columna izquierda y luego la derecha) para que quepan más nombres en una página, y cada miembro tiene las casillas **Presente** y **Ausente**. Hay líneas en blanco para visitantes y un área de **Maestro / Notas**.

- **Desde una sesión** -- Haga clic en el ícono de **Imprimir hoja de asistencia** (impresora) en la parte superior de la lista de asistencia de la sesión. La hoja lleva la fecha de la sesión y muestra el horario de servicio de esa sesión.
- **Todas las clases de un servicio** -- Si la sesión tiene un horario de servicio, haga clic en **Imprimir todas las clases** para imprimir una hoja por cada clase asignada a ese horario de servicio. Cada clase se imprime en su propia página.
- **Desde la lista de miembros** -- En la página del grupo, haga clic en **Todos los miembros**, luego haga clic en el ícono **Imprimir hoja de asistencia** encima de la lista de miembros y elija **Hoja de asistencia** para imprimir una hoja sin fecha. El mismo menú tiene un diseño de **Lista de contacto** con el teléfono, correo electrónico y dirección de cada miembro -- consulte [Imprimir la lista de miembros](../groups/group-members.md#printing-the-member-list).

La hoja se abre en una pestaña nueva y el cuadro de diálogo de impresión de su navegador aparece automáticamente.

## Exportar la asistencia a una hoja de cálculo

Puede descargar un registro de la sesión como archivo CSV para usarlo en Excel, Numbers o Hojas de cálculo de Google.

1. Abra la sesión que desea exportar.
2. Haga clic en el botón **Exportar** en la parte superior de la lista de asistencia.
3. Abra el archivo descargado en su aplicación de hojas de cálculo.

## Ver la asistencia registrada

Después de registrar las sesiones, los datos aparecen en sus informes de asistencia.

- **Pestaña Tendencia de asistencia** (en **Todos los años** de la página de Asistencia) -- muestra las tendencias de toda la iglesia a lo largo del tiempo. Consulte [Seguimiento de la asistencia](tracking-attendance.md).
- **Pestaña Asistencia por grupo** -- muestra la asistencia desglosada por cada grupo. Consulte [Informes de asistencia](../reports/attendance-reports.md#group-attendance).

:::tip
Si una sesión que acaba de crear no aparece en los informes de inmediato, asegúrese de que la fecha de la sesión esté dentro del rango de fechas seleccionado en los filtros del informe.
:::
