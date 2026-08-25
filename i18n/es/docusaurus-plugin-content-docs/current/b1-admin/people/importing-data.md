---
title: "Importar Datos"
---

# Importar Datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer tus datos existentes a B1, ya sea que estés comenzando desde cero con una hoja de cálculo, migrando de otra plataforma de gestión de iglesia, o importando registros de donaciones. También se puede usar para exportar o hacer copias de seguridad de tus datos en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con acceso a **Configuración**.
- Ten tus datos exportados y listos de tu sistema anterior antes de comenzar.
- Esta herramienta está destinada a migración de datos inicial. Si ya has estado usando B1 por un tiempo, importar de nuevo puede crear registros duplicados.

</div>

## Accediendo a la Herramienta de Transferencia

1. Inicia sesión en **B1 Admin**.
2. Abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la pequeña flecha) y elige **Configuración**.
3. Haz clic en el botón **Importar/Exportar** en la esquina superior derecha del encabezado de la página.
4. Esto abrirá la herramienta **B1 Transfer** en una nueva pestaña en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia te guía a través de cuatro pasos: Origen, Vista Previa, Destino y Ejecutar.

---

## Paso 1 - Elige tu Origen

Selecciona de dónde provienen tus datos. Hay siete opciones:

- **Base de Datos B1** — Extrae datos directamente de tu iglesia B1 existente. Útil para hacer una copia de seguridad o convertir tus datos a otro formato. Debes estar conectado para usar esta opción.
- **ZIP de Importación B1** — Un archivo zip en el formato de B1. Se usa principalmente para restaurar una exportación anterior de B1.
- **ZIP de Importación Breeze** — Un archivo zip que contiene archivos exportados de Breeze ChMS.
- **ZIP de Planning Center** — Un archivo zip o CSV exportado de Planning Center.
- **CSV / Excel Personalizado** — Cualquier archivo CSV o Excel que contenga datos de personas. Después de cargar, mapearás tus columnas a campos B1 antes de que la importación continúe.
- **CSV de Tithe.ly** — Un archivo de exportación de personas o donaciones de Tithe.ly (formato CSV o Excel aceptado).
- **CSV de CCB / Pushpay** — Un CSV de personas o donaciones exportado de Church Community Builder o Pushpay.

Puedes arrastrar y soltar tu archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b - Mapea tus Campos (Solo CSV / Excel Personalizado)

Si seleccionaste **CSV / Excel Personalizado**, después de cargar tu archivo la herramienta mostrará una pantalla de mapeo de campos antes de pasar a la vista previa.

Cada columna de tu archivo se enumera junto a un valor de ejemplo. Para cada columna, usa el menú desplegable para elegir el campo B1 correspondiente. La herramienta auto-detectará nombres de columna comunes como "Nombre de Pila", "Correo Electrónico" o "Código Postal", pero debes revisar cada fila y corregir cualquier cosa que haya perdido.

Los campos B1 disponibles incluyen:

- Nombre de Pila, Apellido, Segundo Nombre, Apodo, Nombre de Pantalla, Título/Prefijo, Sufijo
- Correo Electrónico, Teléfono de Casa, Teléfono Móvil, Teléfono de Trabajo
- Línea de Dirección 1, Línea de Dirección 2, Ciudad, Estado, Código Postal
- Fecha de Nacimiento, Género, Estado Civil, Estado de Membresía
- Nombre de Hogar/Familia
- Nombre de Grupo — asigna la persona a un grupo por nombre
- **Respuesta de Formulario (campo personalizado)** — guarda el valor de esa columna como un campo personalizado adjunto al registro de la persona. Si usas esta opción, se te pedirá que le des nombre al formulario.

Las columnas que no deseas importar se pueden configurar en **(Saltar)**. Al menos un campo de nombre (Nombre de Pila o Apellido) debe ser mapeado antes de que puedas continuar.

Haz clic en **Confirmar Mapeo e Importar** para proceder a la vista previa.

---

## Paso 2 - Vista Previa de tus Datos

Después de cargar, la herramienta muestra una vista previa de todo lo que se importará. Usa las pestañas para revisar cada tipo de datos:

- **Personas** — Enumeradas por hogar, con fotos si se incluyen.
- **Grupos** — Organizados por campus, servicio, hora y categoría.
- **Asistencia** — Fechas de sesión, grupos y conteos de visitas.
- **Donaciones** — Lotes, fondos, donantes y cantidades.
- **Formularios** — Nombres y tipos de contenido de formularios.

Revisa esto cuidadosamente antes de proceder. Si algo se ve mal, haz clic en **Comenzar de Nuevo** y corrige tu archivo de origen.

---

## Paso 3 - Elige tu Destino

Selecciona a dónde deseas que vayan los datos:

- **Base de Datos B1** — Importa directamente en la base de datos B1 de tu iglesia. Después de seleccionar esto, la herramienta mostrará un conteo final de registros a añadir. Haz clic en **Iniciar Transferencia** para confirmar.
- **ZIP de Exportación B1** — Descarga tus datos como un archivo zip en formato B1. Bueno para copias de seguridad.
- **ZIP de Exportación Breeze** — Convierte tus datos al formato de Breeze.
- **ZIP de Planning Center** — Convierte tus datos al formato de Planning Center.

:::warning
El origen y destino no pueden ser el mismo formato. Si coinciden, la herramienta te advertirá para prevenir duplicación accidental.
:::

---

## Paso 4 - Ejecutar

La herramienta procesa la transferencia y muestra progreso para cada paso:

- Campus, Servicios y Horarios
- Personas
- Fotos
- Grupos y Miembros del Grupo
- Donaciones
- Asistencia
- Formularios, Preguntas, Respuestas y Envíos de Formularios
- Comprimiendo (solo para destinos de archivo zip)

:::warning
No cierres tu navegador mientras la transferencia se ejecuta. Espera hasta que todos los pasos muestren que se completaron.
:::

---

## Después de Importar

Una vez que la transferencia está completa, tómate un poco de tiempo para verificar tus datos:

1. Examina la página [Personas](../people/adding-people.md) y verifica manualmente algunos perfiles.
2. Confirma que nombres, correos electrónicos, números de teléfono y direcciones se transferían correctamente.
3. Verifica que las conexiones del hogar estén intactas.
4. Revisa cualquier grupo importado y registros de donación.

Si notas problemas, puedes editar perfiles individuales desde la página de Personas. También puedes ejecutar la herramienta de transferencia nuevamente para [exportar tus datos](exporting-data.md) como copia de seguridad.
