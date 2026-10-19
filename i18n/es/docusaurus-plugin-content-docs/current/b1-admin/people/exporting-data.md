---
title: "Exportar datos"
---

# Exportar datos

<div class="article-intro">

B1 Admin le permite exportar los datos de su iglesia para usarlos en hojas de cálculo, compartirlos con su equipo o conservar una copia de respaldo. Ya sea que necesite una lista rápida de nombres y correos electrónicos o una exportación completa de la base de datos, hay opciones para cada necesidad.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver los datos que desea exportar. Consulte [Roles y permisos](roles-permissions.md) si no está seguro de su nivel de acceso.
- Para una exportación completa de la base de datos, necesita acceso al área de **Configuración**.

</div>

## Exportar desde la página de Personas

La forma más rápida de exportar su directorio es directamente desde la página **Personas**:

1. Abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **Personas** y haga clic en **Personas**.
2. Use la barra de búsqueda o los filtros para reducir los resultados que desea exportar (o déjelo sin filtros para exportar a todos). Consulte [Buscar personas](searching-people.md) para consejos sobre cómo filtrar.
3. Haga clic en el botón **Exportar** en el encabezado de la página Personas.
4. Se descargará a su computadora un archivo CSV con las personas que están en sus resultados actuales, incluidos su nombre, datos de contacto, dirección y otros campos estándar.

:::tip
La exportación incluye a todas las personas de sus resultados actuales. Haga una búsqueda, cargue una [Lista guardada](./lists.md) o use primero la búsqueda **Avanzada** para exportar solo las personas que necesita.
:::

## Exportación completa de datos desde Configuración {#full-data-export-from-settings}

Para una exportación completa de todos sus datos de B1 (no solo personas), use la herramienta de exportación en Configuración:

1. En el menú de salto, elija **Configuración > Configuración**.
2. Haga clic en el enlace **Importar/Exportar** debajo del nombre de su iglesia, en la parte superior del menú de configuración de la izquierda.
3. Seleccione **Base de datos de B1** en el menú desplegable **Fuente de datos**.
4. Revise la vista previa de los datos y haga clic en **Continuar al destino**.
5. Seleccione **Archivo ZIP de exportación de B1** como destino de la exportación.
6. Supervise el progreso de la exportación hasta que todos los elementos muestren marcas verdes.
7. El archivo de exportación se descargará automáticamente. Busque el archivo `B1Export` en su carpeta de descargas.
8. Descomprima el archivo para acceder a los archivos CSV individuales (como `people.csv`) que puede abrir en Excel, Google Sheets o Numbers.

:::info
El Archivo ZIP de exportación de B1 es una copia de respaldo completa de los datos de su iglesia. Contiene:

- personas (con fotos) y hogares, incluidos los contactos de recogida del hogar
- campus, servicios y horarios de servicio
- grupos y miembros de grupos
- fondos y donaciones, incluidos los donativos divididos entre varios fondos
- asistencia
- formularios, preguntas, envíos y respuestas
- campos personalizados y sus valores
- listas guardadas de personas

Si la foto de una persona no puede descargarse o leerse durante la exportación, esa foto se omite y la exportación continúa sin ella.

Para restaurarla, elija **Archivo ZIP de importación de B1** como fuente y **Base de datos de B1** como destino (consulte [Importar datos](./importing-data.md)). Los hogares, los contactos de recogida y las listas guardadas se reconstruyen junto con las personas. Los filtros de las listas guardadas se apuntan a los grupos, fondos, campus y campos personalizados restaurados.
:::

## Exportar datos de grupos

También puede exportar listas de miembros de grupos individuales. Desde la página **Grupos**, abra un grupo y haga clic en el **ícono de descarga** para exportar la lista de miembros de ese grupo. Consulte [Miembros del grupo](../groups/group-members.md) para más detalles.

:::info
Los archivos CSV exportados funcionan con las principales aplicaciones de hojas de cálculo, incluidas Microsoft Excel, Google Sheets y Apple Numbers.
:::
