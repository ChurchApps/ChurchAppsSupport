---
title: "Exportar datos"
---

# Exportar datos

<div class="article-intro">

B1 Admin te permite exportar los datos de tu iglesia para usarlos en hojas de cálculo, compartirlos con tu equipo o conservar una copia de respaldo. Ya sea que necesites una lista rápida de nombres y correos electrónicos o una exportación completa de la base de datos, hay opciones para cada necesidad.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para ver los datos que quieres exportar. Consulta [Roles y permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Para una exportación completa de la base de datos, necesitas acceso al área de **Settings**.

</div>

## Exportar desde la página People

La forma más rápida de exportar tu directorio es directamente desde la página **People**:

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **People** y haz clic en **People**.
2. Usa la barra de búsqueda o los filtros para acotar los resultados que quieres exportar (o déjala sin filtros para exportar a todos). Consulta [Buscar personas](searching-people.md) para consejos sobre cómo filtrar.
3. Haz clic en el botón **Export** en el encabezado de la página People.
4. Se descargará a tu computadora un archivo CSV con las personas que aparecen en tus resultados actuales, incluidos su nombre, datos de contacto, dirección y otros campos estándar.

:::tip
La exportación incluye a todas las personas de tus resultados actuales. Haz una búsqueda, carga una [lista guardada](./lists.md) o usa primero la búsqueda **Advanced** para exportar solo a las personas que necesitas.
:::

## Exportación completa de datos desde Settings

Para una exportación completa de todos tus datos de B1 (no solo de personas), usa la herramienta de exportación en Settings:

1. En el menú Jump, elige **Settings > Settings**.
2. Haz clic en el enlace **Import/Export** debajo del nombre de tu iglesia, en la parte superior del menú de configuración de la izquierda.
3. Selecciona **B1 Database** en el menú desplegable **Data Source**.
4. Revisa la vista previa de los datos y haz clic en **Continue to Destination**.
5. Selecciona **B1 Export Zip** como destino de la exportación.
6. Supervisa el progreso de la exportación hasta que todos los elementos muestren una marca verde.
7. El archivo de exportación se descargará automáticamente. Busca el archivo `B1Export` en tu carpeta de descargas.
8. Descomprime el archivo para acceder a los archivos CSV individuales (como `people.csv`) que puedes abrir en Excel, Google Sheets o Numbers.

:::info
El B1 Export Zip es una copia de respaldo completa de los datos de tu iglesia. Incluye:

- personas (con fotos) y hogares, incluidos los contactos para recoger a los niños en el hogar
- sedes, servicios y horarios de servicio
- grupos y miembros de grupos
- fondos y donaciones, incluidos los regalos repartidos entre varios fondos
- asistencia
- formularios, preguntas, respuestas y las respuestas enviadas
- campos personalizados y sus valores
- listas guardadas de personas

Para restaurarlo, elige **B1 Import Zip** como origen y **B1 Database** como destino (consulta [Importar datos](./importing-data.md)). Los hogares, los contactos para recoger y las listas guardadas se reconstruyen junto con las personas. Los filtros de las listas guardadas se vinculan a los grupos, fondos, sedes y campos personalizados restaurados.
:::

## Exportar datos de grupos

También puedes exportar las listas de miembros de grupos individuales. Desde la página **Groups**, abre un grupo y haz clic en el **icono de descarga** para exportar la lista de miembros de ese grupo. Consulta [Miembros de grupos](../groups/group-members.md) para más detalles.

:::info
Los archivos CSV exportados funcionan con las principales aplicaciones de hojas de cálculo, como Microsoft Excel, Google Sheets y Apple Numbers.
:::
