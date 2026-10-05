---
title: "Importar Datos"
---

# Importar Datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer tus datos existentes a B1, ya sea que estés comenzando desde cero con una hoja de cálculo, migrando desde otra plataforma de gestión de iglesia o importando registros de donaciones. También se puede usar para exportar o hacer copia de seguridad de tus datos en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta B1 Admin activa con acceso a **Configuración**.
- Ten tus datos exportados y listos desde tu sistema anterior antes de comenzar.
- Esta herramienta está diseñada para migración de datos inicial. Si ya has estado usando B1 durante un tiempo, importar nuevamente puede crear registros duplicados.

</div>

## Acceder a la Herramienta de Transferencia

1. Inicia sesión en **B1 Admin**.
2. Abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Configuración**, y haz clic en **Configuración**.
3. Haz clic en el botón **Importar/Exportar** en la esquina superior derecha del encabezado de la página.
4. Esto abrirá la herramienta **B1 Transfer** en una nueva pestaña en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia te guía a través de cuatro pasos: Fuente, Vista Previa, Destino, y Ejecutar.

---

## Paso 1 - Elegir tu Fuente

Selecciona de dónde vienen tus datos. Hay siete opciones:

- **B1 Database** — Extrae datos directamente de tu iglesia B1 existente. Útil para hacer una copia de seguridad o convertir tus datos a otro formato. Debes estar conectado para usar esta opción.
- **B1 Import Zip** — Un archivo zip en el formato propio de B1. Esto se utiliza principalmente para restaurar una exportación anterior de B1.
- **Breeze Import Zip** — Un archivo zip que contiene archivos exportados de Breeze ChMS.
- **Planning Center Zip** — Un archivo zip o CSV exportado de Planning Center.
- **Custom CSV / Excel** — Cualquier archivo CSV o Excel que contiene datos de personas. Después de cargar, mapearás tus columnas a campos B1 antes de que continúe la importación.
- **Tithe.ly CSV** — Un archivo de personas o donaciones exportado de Tithe.ly (formato CSV o Excel aceptado).
- **CCB / Pushpay CSV** — Un CSV de personas o donaciones exportado de Church Community Builder o Pushpay.

Puedes arrastrar y soltar tu archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b - Mapear Tus Campos (Solo Custom CSV / Excel)

Si seleccionaste **Custom CSV / Excel**, después de cargar tu archivo la herramienta mostrará una pantalla de mapeo de campos antes de pasar a la vista previa.

Cada columna de tu archivo se enumera junto con un valor de muestra. Para cada columna, usa el menú desplegable para elegir el campo B1 coincidente. La herramienta detectará automáticamente nombres de columnas comunes como "Nombre de Pila", "Correo Electrónico" o "Código Postal", pero debes revisar cada fila y corregir cualquier cosa que haya perdido.

Los campos B1 disponibles incluyen:

- Nombre, Apellido, Nombre del Medio, Apodo, Nombre Mostrado, Título/Prefijo, Sufijo
- Correo Electrónico, Teléfono Hogar, Teléfono Móvil, Teléfono Trabajo
- Dirección Línea 1, Dirección Línea 2, Ciudad, Estado, Código Postal
- Fecha de Nacimiento, Aniversario, Género, Estado Civil, Estado de Membresía
- Nombre Hogar/Familia
- Nombre de Grupo — asigna la persona a un grupo por nombre
- **Custom Field (match by name)** — guarda la columna en uno de los [campos de persona personalizados](../settings/custom-fields.md) de tu iglesia. Aparece un cuadro **Nombre de campo B1**, completo con el encabezado de columna. Cambia al nombre del campo exactamente como aparece en B1 (las mayúsculas no importan).
- **Form Answer (custom field)** — guarda el valor de esa columna como campo personalizado adjunto al registro de la persona. Si usas esta opción, se te pedirá que des un nombre al formulario.

Las fechas pueden estar en formatos comunes como `9/17/1994` y se convierten automáticamente. Para campos personalizados, los campos Sí/No aceptan valores como Sí, No, S, N, Verdadero, Falso, 1, y 0, y los campos de opción múltiple aceptan el texto de opción o su valor.

:::info
Crea tus campos de persona personalizados en B1 Admin antes de importar. Cuando la importación termine, el paso **Campos Personalizados** enumera cualquier nombre de columna que no coincida con un campo B1 y cuenta cualquier valor que no se ajuste al tipo del campo. Esos valores se saltan, y el resto de la importación aún se completa.
:::

Las columnas que no deseas importar pueden configurarse en **(Saltar)**. Al menos un campo de nombre (Nombre o Apellido) debe mapearse antes de que puedas continuar.

Haz clic en **Confirmar Mapeo e Importar** para proceder a la vista previa.

---

## Paso 2 - Previsualizar tus Datos

Después de cargar, la herramienta muestra una vista previa de todo lo que será importado. Usa las pestañas para revisar cada tipo de datos:

- **People** — Listados por hogar, con fotos si están incluidas.
- **Grupos** — Organizados por sede, servicio, hora y categoría.
- **Asistencia** — Fechas de sesión, grupos y conteos de visitas.
- **Donaciones** — Lotes, fondos, donantes, y montos.
- **Formularios** — Nombres de formularios y tipos de contenido.

Revisa esto cuidadosamente antes de continuar. Si algo parece incorrecto, haz clic en **Comenzar de Nuevo** y corrige tu archivo de origen.

---

## Paso 3 - Elegir tu Destino

Selecciona a dónde deseas que vayan los datos:

- **B1 Database** — Importa directamente en la base de datos B1 de tu iglesia. Después de seleccionar esto, la herramienta mostrará un recuento final de registros a ser agregados. Haz clic en **Iniciar Transferencia** para confirmar.
- **B1 Export Zip** — Descarga tus datos como un archivo zip en formato B1. Bueno para copias de seguridad.
- **Breeze Export Zip** — Convierte tus datos al formato Breeze.
- **Planning Center Zip** — Convierte tus datos al formato Planning Center.

:::warning
La fuente y el destino no pueden ser el mismo formato. Si coinciden, la herramienta te advertirá para prevenir duplicación accidental.
:::

---

## Paso 4 - Ejecutar

La herramienta procesa la transferencia y muestra progreso para cada paso:

- Sedes, Servicios, y Tiempos
- Personas
- Fotos
- Grupos y Miembros de Grupo
- Donaciones
- Asistencia
- Formularios, Preguntas, Respuestas, y Envíos de Formularios
- Campos Personalizados (cuando hayas mapeado columnas de Campos Personalizados)
- Comprimiendo (para destinos de archivo zip solamente)

Cuando el destino es **B1 Database**, la tarjeta de progreso se titula **Progreso de Importación** y termina con **¡Importación Completada!** (o **Importación Completada con Errores**). Para destinos de archivo zip, los mismos mensajes dicen **Exportación**.

:::warning
No cierres tu navegador mientras la transferencia está en ejecución. Espera hasta que todos los pasos muestren completados.
:::

---

## Preparando un Zip de Importación de Breeze

1. En Breeze, ve a **Configuración** y haz clic en **Exportar** en la barra lateral izquierda.
2. Exporta tres archivos separados: **Personas**, **Etiquetas**, y **Contribuciones**.
3. Selecciona los tres archivos, haz clic derecho, y comprime en un archivo zip.
   - En una Mac: selecciona los archivos, haz clic derecho, y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a**, luego **Carpeta comprimida (zip)**.
4. Carga el archivo zip usando la opción **Breeze Import Zip** en el Paso 1.

La importación de Breeze transfiere personas, grupos (etiquetas), y registros de donación automáticamente.

---

## Preparando una Exportación de Planning Center

1. Inicia sesión en Planning Center y abre el producto **Personas**.
2. En la barra lateral izquierda, haz clic en **Listas** y crea una lista que incluya a todos los que deseas traer. (Si ya tienes una lista de toda tu congregación, usa esa.)
3. Abre la lista y usa su opción de **exportación** para descargar tus personas como un archivo **CSV**. Incluye los campos que deseas mantener — nombre, correo electrónico, teléfono, dirección, fecha de nacimiento, género, y estado de membresía todos se mapean a B1.
4. Si Planning Center te da más de un archivo, selecciona todos, haz clic derecho, y comprime en un único zip.
   - En una Mac: selecciona los archivos, haz clic derecho, y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a**, luego **Carpeta comprimida (zip)**.
5. Carga el CSV o zip usando la opción **Planning Center Zip** en el Paso 1.

Después de cargar, continúa a la vista previa y confirma que tus personas y hogares se ven bien antes de ejecutar la importación.

---

## Preparando una Exportación de Tithe.ly

1. En Tithe.ly, exporta tus datos de **Personas** como archivo CSV o Excel. También puedes exportar un archivo de **Donaciones** separado si deseas traer registros de donaciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o donaciones basado en los nombres de columnas.
3. Carga el archivo usando la opción **Tithe.ly CSV** en el Paso 1.

:::info
Las exportaciones de Tithe.ly pueden ser importadas una archivo a la vez. Ejecuta el proceso dos veces si necesitas importar personas y registros de donaciones por separado.
:::

---

## Preparando una Exportación de CCB o Pushpay

1. En Church Community Builder o Pushpay, exporta tus datos de **Personas** como archivo CSV. También puedes exportar un archivo de donaciones/contribuciones separado.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o donaciones basado en los nombres de columnas.
3. Carga el archivo usando la opción **CCB / Pushpay CSV** en el Paso 1.

---

## Después de Importar

Una vez que la transferencia se completa, tómate unos minutos para verificar tus datos:

1. Examina la página [People](../people/adding-people.md) y verifica algunos perfiles.
2. Confirma que nombres, correos electrónicos, números de teléfono y direcciones vinieron correctamente.
3. Verifica que las conexiones de hogar están intactas.
4. Revisa cualquier grupo importado y registros de donaciones.

Si notas problemas, puedes editar perfiles individuales desde la página de Personas. También puedes ejecutar la herramienta de transferencia nuevamente para [exportar tus datos](exporting-data.md) como copia de seguridad.
