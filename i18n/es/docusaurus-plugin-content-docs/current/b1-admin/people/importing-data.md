---
title: "Importar datos"
---

# Importar datos

<div class="article-intro">

B1 Admin facilita la importaci\u00f3n de los datos existentes de sus miembros al sistema. Ya sea que est\u00e9 migrando desde otra plataforma de gesti\u00f3n eclesi\u00e1stica o cargando registros desde una hoja de c\u00e1lculo, las herramientas de importaci\u00f3n le evitan tener que ingresar manualmente a cada persona. Puede importar desde un archivo CSV o migrar directamente desde Breeze ChMS.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con acceso a **Configuraci\u00f3n**. Consulte [Roles y permisos](roles-permissions.md) si no est\u00e1 seguro de su nivel de acceso.
- Tenga los datos de sus miembros listos en una hoja de c\u00e1lculo o exportados desde su sistema anterior.
- Si est\u00e1 migrando desde Breeze, aseg\u00farese de haber exportado primero sus archivos de Personas, Etiquetas y Contribuciones desde Breeze.

</div>

## Importar desde CSV

Si tiene datos de miembros en una hoja de c\u00e1lculo u otro sistema, puede importarlos usando un archivo CSV (valores separados por comas).

1. Vaya a **Configuraci\u00f3n** en la barra lateral izquierda.
2. Haga clic en **Importar/Exportar** en la navegaci\u00f3n superior.
3. Seleccione **B1 Import Zip** en el men\u00fa desplegable de **Fuente de datos**.
4. Haga clic en el enlace para **descargar archivos de ejemplo** para ver el formato esperado.
5. Abra el archivo de ejemplo `people.csv` y reemplace los datos de ejemplo con los suyos. Mantenga la fila de encabezado intacta.
6. Si tiene fotos de miembros, agr\u00e9guelas a la carpeta usando im\u00e1genes de 400x300px, nombre\u00e1ndolas para que coincidan con los n\u00fameros de `importKey` en su CSV.
7. Comprima sus archivos editados en un archivo zip.
8. De vuelta en B1 Admin, haga clic en **Subir** y seleccione su archivo zip.
9. Revise la vista previa de datos y haga clic en **Continuar al destino**.
10. Verifique que **B1 Database** est\u00e9 seleccionado, revise el resumen de importaci\u00f3n y haga clic en **Iniciar transferencia**.
11. Espere a que la importaci\u00f3n se complete, luego haga clic en **Ir a B1** para regresar a su panel de control.

:::tip
Siempre descargue y revise los archivos de ejemplo primero. Coincidir con el formato de columnas esperado evitar\u00e1 errores de importaci\u00f3n.
:::

:::warning
La importaci\u00f3n de datos agregar\u00e1 nuevos registros a su base de datos. Si importa el mismo archivo dos veces, podr\u00eda terminar con entradas duplicadas. Verifique su archivo antes de iniciar la transferencia.
:::

## Importar desde Breeze ChMS

Si est\u00e1 migrando desde Breeze, B1 tiene una opci\u00f3n de importaci\u00f3n dedicada que maneja la conversi\u00f3n autom\u00e1ticamente.

1. En Breeze, vaya a **Configuraci\u00f3n** y haga clic en **Exportar** en la barra lateral izquierda.
2. Exporte tres archivos: **Personas**, **Etiquetas** y **Contribuciones**.
3. Seleccione los tres archivos exportados, haga clic derecho y compr\u00edmalos en un solo archivo zip.
4. En B1 Admin, vaya a **Configuraci\u00f3n** y luego a **Importar/Exportar**.
5. Seleccione **Breeze Import Zip** en el men\u00fa desplegable de **Fuente de datos**.
6. Suba su archivo zip y siga los pasos en pantalla para revisar y completar la importaci\u00f3n.

:::info
La importaci\u00f3n desde Breeze transfiere personas, fotos, grupos, donaciones, asistencia, formularios y m\u00e1s -- brind\u00e1ndole una migraci\u00f3n completa en un solo paso.
:::

## Despu\u00e9s de importar

Una vez completada la importaci\u00f3n, t\u00f3mese unos minutos para verificar sus datos:

1. Navegue por la p\u00e1gina de [Personas](../people/adding-people.md) y revise algunos perfiles al azar.
2. Confirme que los nombres, correos electr\u00f3nicos, n\u00fameros de tel\u00e9fono y direcciones se importaron correctamente.
3. Verifique que las conexiones familiares est\u00e9n intactas.
4. Revise cualquier [grupo](../groups/creating-groups.md) o etiqueta que se haya importado.

Si nota alg\u00fan problema, puede editar perfiles individuales directamente desde la p\u00e1gina de Personas. Tambi\u00e9n puede [exportar sus datos](exporting-data.md) en cualquier momento para crear una copia de respaldo.
