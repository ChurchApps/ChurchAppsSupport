---
title: "Importar Datos"
---

# Importar Datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer tus datos existentes a B1, ya sea que estés comenzando desde cero desde una hoja de cálculo, migrando desde otra plataforma de administración de iglesia, o importando registros de donaciones. También se puede usar para exportar o hacer copia de seguridad de tus datos en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con acceso a **Configuración**.
- Ten tus datos exportados y listos desde tu sistema anterior antes de comenzar.
- Esta herramienta está diseñada para migración inicial de datos. Si ya has estado usando B1 por un tiempo, importar nuevamente puede crear registros duplicados.

</div>

## Acceder a la Herramienta de Transferencia

1. Inicia sesión en **B1 Admin**.
2. Abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña) y elige **Configuración**.
3. Haz clic en el botón **Importar/Exportar** en la parte superior derecha del encabezado de la página.
4. Esto abrirá la herramienta **B1 Transfer** en una nueva pestaña en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia te guía a través de cuatro pasos: Fuente, Vista Previa, Destino y Ejecutar.

---

## Paso 1 - Elige Tu Fuente

Selecciona de dónde provienen tus datos. Hay siete opciones:

- **Base de Datos B1** — Extrae datos directamente de tu iglesia B1 existente. Útil para hacer una copia de seguridad o convertir tus datos a otro formato. Debes estar logueado para usar esta opción.
- **Zip de Importación B1** — Un archivo zip en el formato propio de B1. Se usa principalmente para restaurar una exportación anterior de B1.
- **Zip de Importación Breeze** — Un archivo zip que contiene archivos exportados de Breeze ChMS.
- **Zip de Planning Center** — Un archivo zip o CSV exportado desde Planning Center.
- **CSV / Excel Personalizado** — Cualquier archivo CSV o Excel que contenga datos de personas. Después de cargar, mapearás tus columnas a campos B1 antes de que la importación continúe.
- **CSV de Tithe.ly** — Un archivo de exportación de personas o donaciones de Tithe.ly (formato CSV o Excel aceptado).
- **CSV de CCB / Pushpay** — Un CSV de exportación de personas o donaciones de Church Community Builder o Pushpay.

Puedes arrastrar y soltar tu archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b - Mapea Tus Campos (Solo CSV / Excel Personalizado)

Si seleccionaste **CSV / Excel Personalizado**, después de cargar tu archivo la herramienta mostrará una pantalla de mapeo de campos antes de pasar a la vista previa.

Cada columna de tu archivo se enumera junto con un valor de muestra. Para cada columna, usa el menú desplegable para elegir el campo B1 correspondiente. La herramienta auto-detectará nombres de columna comunes como "Nombre de Pila", "Correo Electrónico" o "Código Postal", pero debes revisar cada fila y corregir cualquier cosa que haya perdido.

Los campos B1 disponibles incluyen:

- Nombre de Pila, Apellido, Nombre del Medio, Apodo, Nombre de Visualización, Título/Prefijo, Sufijo
- Correo Electrónico, Teléfono Casa, Teléfono Móvil, Teléfono Trabajo
- Línea de Dirección 1, Línea de Dirección 2, Ciudad, Estado, Código Postal
- Fecha de Nacimiento, Género, Estado Civil, Estado de Membresía
- Nombre del Hogar/Familia
- Nombre del Grupo — asigna la persona a un grupo por nombre
- **Respuesta de Formulario (campo personalizado)** — guarda el valor de esa columna como un campo personalizado adjunto al registro de la persona. Si usas esta opción, se te pedirá que des un nombre al formulario.

Las columnas que no deseas importar se pueden establecer en **(Saltar)**. Al menos un campo de nombre (Nombre de Pila o Apellido) debe mapearse antes de poder continuar.

Haz clic en **Confirmar Mapeo e Importar** para proceder a la vista previa.

---

## Paso 2 - Vista Previa de Tus Datos

Después de cargar, la herramienta muestra una vista previa de todo lo que será importado. Usa las pestañas para revisar cada tipo de dato:

- **Personas** — Enumeradas por hogar, con fotos si se incluyen.
- **Grupos** — Organizados por sede, servicio, hora y categoría.
- **Asistencia** — Fechas de sesiones, grupos y conteos de visitas.
- **Donaciones** — Lotes, fondos, donantes y montos.
- **Formularios** — Nombres de formularios y tipos de contenido.

Revisa esto cuidadosamente antes de proceder. Si algo se ve mal, haz clic en **Comenzar de Nuevo** y corrige tu archivo de fuente.

---

## Paso 3 - Elige Tu Destino

Selecciona a dónde deseas que vayan los datos:

- **Base de Datos B1** — Importa directamente a la base de datos B1 de tu iglesia. Después de seleccionar esto, la herramienta mostrará un recuento final de registros a agregar. Haz clic en **Iniciar Transferencia** para confirmar.
- **Zip de Exportación B1** — Descarga tus datos como un archivo zip en formato B1. Bueno para copias de seguridad.
- **Zip de Exportación Breeze** — Convierte tus datos a formato Breeze.
- **Zip de Planning Center** — Convierte tus datos a formato Planning Center.

:::warning
La fuente y destino no pueden ser el mismo formato. Si coinciden, la herramienta te advertirá para prevenir duplicación accidental.
:::

---

## Paso 4 - Ejecutar

La herramienta procesa la transferencia y muestra el progreso de cada paso:

- Sedes, Servicios y Horas
- Personas
- Fotos
- Grupos y Miembros del Grupo
- Donaciones
- Asistencia
- Formularios, Preguntas, Respuestas y Envíos de Formularios
- Comprimiendo (solo para destinos de archivo zip)

:::warning
No cierres tu navegador mientras se ejecuta la transferencia. Espera hasta que todos los pasos muestren como completados.
:::

---

## Preparar un Zip de Importación Breeze

1. En Breeze, ve a **Configuración** y haz clic en **Exportar** en la barra lateral izquierda.
2. Exporta tres archivos separados: **Personas**, **Etiquetas** y **Contribuciones**.
3. Selecciona los tres archivos, haz clic derecho y comprime en un archivo zip único.
   - En una Mac: selecciona los archivos, haz clic derecho y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a**, luego **carpeta comprimida (zipeada)**.
4. Carga el archivo zip usando la opción **Zip de Importación Breeze** en Paso 1.

La importación de Breeze transfiere personas, grupos (etiquetas) y registros de donaciones automáticamente.

---

## Preparar una Exportación de Planning Center

1. En Planning Center, exporta tus datos de personas como un archivo CSV o zip.
2. Cárgalo usando la opción **Zip de Planning Center** en Paso 1.

---

## Preparar una Exportación de Tithe.ly

1. En Tithe.ly, exporta tus datos de **Personas** como un archivo CSV o Excel. También puedes exportar un archivo separado de **Donaciones** si deseas traer registros de donaciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o donaciones basado en los nombres de columna.
3. Carga el archivo usando la opción **CSV de Tithe.ly** en Paso 1.

:::info
Las exportaciones de Tithe.ly se pueden importar una archivo a la vez. Ejecuta el proceso dos veces si necesitas importar personas y registros de donaciones por separado.
:::

---

## Preparar una Exportación de CCB o Pushpay

1. En Church Community Builder o Pushpay, exporta tus datos de **Personas** como un archivo CSV. También puedes exportar un archivo separado de donaciones/contribuciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o donaciones basado en los nombres de columna.
3. Carga el archivo usando la opción **CSV de CCB / Pushpay** en Paso 1.

---

## Después de Importar

Una vez que la transferencia se complete, tómate unos minutos para verificar tus datos:

1. Navega por la página de [Personas](../people/adding-people.md) y verifica algunas perfiles.
2. Confirma que nombres, correos electrónicos, números de teléfono y direcciones llegaron correctamente.
3. Verifica que las conexiones de hogar estén intactas.
4. Revisa grupos importados y registros de donaciones.

Si notas problemas, puedes editar perfiles individuales desde la página de Personas. También puedes ejecutar la herramienta de transferencia nuevamente para [exportar tus datos](exporting-data.md) como una copia de seguridad.
