---
title: "Exportación de datos"
description: "Exporte personas a CSV, listas de miembros de grupos o una copia de seguridad completa de la base de datos de B1 desde B1 Admin, y vea lo que contiene el archivo ZIP de exportación de B1."
---

# Exportación de datos

<div class="article-intro">

B1 Admin le permite exportar los datos de su iglesia para usarlos en hojas de cálculo, compartirlos con su equipo o guardar una copia de seguridad. Ya sea que necesite una lista rápida de nombres y correos electrónicos o una exportación completa de la base de datos, hay opciones para cada necesidad.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver los datos que desea exportar. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Para una exportación completa de la base de datos, necesita acceso al área de **Settings**.

</div>

## Exportar desde la página People {#exporting-from-the-people-page}

La forma más rápida de exportar su directorio es directamente desde la página **People**:

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **People** y haga clic en **People**.
2. Use la barra de búsqueda o los filtros para reducir los resultados que desea exportar (o déjela sin filtrar para exportar a todas las personas). Consulte [Búsqueda de personas](searching-people.md) para consejos sobre cómo filtrar.
3. Haga clic en el botón **Export** en el encabezado de la página People.
4. Se descargará a su computadora un archivo CSV llamado `people.csv` con las personas que estén en sus resultados actuales, incluidos su nombre, datos de contacto, dirección y otros campos estándar. Si no ha hecho ninguna búsqueda, la exportación incluye todo su directorio, aunque la página solo muestre la primera parte.

:::tip
La exportación incluye a todas las personas de sus resultados actuales. Haga una búsqueda, cargue una [Lista guardada](./lists.md) o use primero la búsqueda **Advanced** para exportar solo las personas que necesita.
:::

## Exportación completa de datos desde Settings {#full-data-export-from-settings}

Para una exportación completa de todos sus datos de B1 (no solo de personas), use la herramienta de exportación en Settings:

1. En el menú Jump, elija **Settings > Settings**.
2. Haga clic en el enlace **Import/Export** bajo el nombre de su iglesia, en la parte superior del menú de configuración de la izquierda.
3. Seleccione **B1 Database** en el menú desplegable **Data Source**.
4. Revise la vista previa de los datos y haga clic en **Continue to Destination**.
5. Seleccione **B1 Export Zip** como destino de la exportación.
6. Supervise el progreso de la exportación hasta que todos los elementos muestren una marca verde.
7. El archivo de exportación se descargará automáticamente. Busque el archivo `B1Export` en su carpeta de descargas.
8. Descomprima el archivo para acceder a los archivos CSV individuales (como `people.csv`) que puede abrir en Excel, Google Sheets o Numbers.

:::info
El archivo B1 Export Zip es una copia de seguridad completa de los datos de su iglesia. Contiene:

- personas (con fotos) y hogares, incluidos los contactos de recogida de los hogares
- campus, servicios y horarios de servicio
- grupos y miembros de grupos
- fondos y donaciones, incluidos los donativos divididos entre varios fondos
- asistencia
- formularios, preguntas, envíos y respuestas
- campos personalizados y sus valores
- listas guardadas de personas

Si la foto de una persona no se puede descargar o leer durante la exportación, esa foto se omite y la exportación continúa sin ella.

Para restaurarla, elija **B1 Import Zip** como origen y **B1 Database** como destino (consulte [Importar datos](./importing-data.md)). Los hogares, los contactos de recogida y las listas guardadas se reconstruyen junto con las personas. Los filtros de las listas guardadas se apuntan a los grupos, fondos, campus y campos personalizados restaurados.
:::

## Exportar datos de grupos {#exporting-group-data}

También puede exportar listas de miembros de grupos individuales. Desde la página **Groups**, abra un grupo y haga clic en el **icono de descarga** para exportar la lista de miembros de ese grupo. Consulte [Miembros del grupo](../groups/group-members.md) para más detalles.

:::info
Los archivos CSV exportados funcionan con todas las principales aplicaciones de hojas de cálculo, incluidas Microsoft Excel, Google Sheets y Apple Numbers.
:::
