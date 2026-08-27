---
title: "Creando Formularios"
---

# Creando Formularios

<div class="article-intro">

Construya formularios personalizados para recopilar información de su congregación. Puede crear formularios para inscripciones a eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios pueden vincularse a personas en su base de datos o usarse como páginas independientes con su propia URL pública.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Para formularios de **Personas** (vinculados a registros de personas), necesita tener [personas en su base de datos](../people/adding-people.md) primero.
- Para formularios que recopilan **pagos**, debe tener [Stripe configurado para donaciones en línea](../donations/online-giving-setup.md).

</div>

## Creando un Nuevo Formulario

1. Navegue a **Formularios** desde el menú principal.
2. Haga clic en **Agregar Formulario**.
3. Ingrese un **nombre** para su formulario.
4. Elija el tipo de formulario del menú desplegable:
   - **Personas** — Asocia las respuestas con [registros de personas](../people/adding-people.md) en su base de datos.
   - **Independiente** — Crea un formulario independiente con su propia URL pública, ideal para inscripciones externas.
5. Haga clic en **Guardar** para crear el formulario.

Su nuevo formulario aparecerá en la lista. Haga clic en él para comenzar a agregar preguntas.

## Agregando Preguntas

1. Abra su formulario y vaya a la pestaña **Preguntas**.
2. Haga clic en **Agregar Pregunta**.
3. Seleccione un **tipo de campo** del menú desplegable de Proveedor. Los tipos disponibles incluyen:
   - **Cuadro de Texto** — Para respuestas de texto corto
   - **Fecha** — Para selección de fechas
   - **Correo Electrónico** — Para direcciones de correo electrónico
   - **Número de Teléfono** — Para entrada de teléfono
   - **Opción Múltiple** — Para seleccionar entre opciones predefinidas
   - **Pago** — Para recopilar pagos
4. Ingrese un **Título** y una **Descripción** opcional para la pregunta.
5. Marque **Requerir una Respuesta** si el campo es obligatorio.
6. Haga clic en **Guardar**.
7. Repita para agregar más preguntas.

:::warning
El tipo de campo **Pago** requiere que Stripe esté configurado. Si aún no ha configurado las donaciones en línea, consulte [Configuración de Donaciones en Línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Administrando Miembros del Formulario

1. Abra su formulario y vaya a la pestaña **Miembros**.
2. Busque una persona y agréguela con un rol:
   - **Administrador** — Puede editar el formulario y ver todas las respuestas.
   - **Solo Lectura** — Puede ver las respuestas pero no puede editar el formulario.

## Agregando Automáticamente Remitentes a un Grupo

Cuando **Crear un registro de persona desde respuestas** está habilitado, también puede vincular el formulario a un grupo para que cada remitente se agregue automáticamente al grupo del grupo:

1. Abra los **Detalles** de su formulario, y active **Crear un registro de persona desde respuestas**.
2. Debajo de **Agregar remitentes a un grupo**, seleccione el grupo al que agregar remitentes, o déjelo establecido en **Ninguno**.
3. Haga clic en **Guardar**.

Cada vez que alguien envía el formulario, la persona coincidente o recientemente creada se agrega al grupo (se omiten los miembros del grupo existentes). Esto es útil para cosas como un formulario de inscripción a campamento que debería construir automáticamente el grupo de participantes del campamento.

## Duplicando un Formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haga clic en el icono **Duplicar** (icono de copia) junto al formulario en la lista de Formularios. B1 crea una copia exacta del formulario — incluyendo todas las preguntas — que luego puede renombrar y editar independientemente.

:::tip
La duplicación es útil para eventos recurrentes donde las preguntas de inscripción permanecen igual de año en año. Duplique el formulario del año pasado, actualice el nombre y las fechas, ¡y estará listo!
:::

## Configurando Propiedades del Formulario

Puede actualizar el nombre y la configuración de su formulario en cualquier momento. Para formularios Independientes, también verá una **URL pública** única que puede compartir con cualquier persona.

:::tip
Los formularios Independientes son ideales para inscripciones a eventos. Comparta la URL pública por correo electrónico, redes sociales o incruste el formulario directamente en el sitio web de su iglesia.
:::

:::info
Para incrustar un formulario en su sitio web de B1, vaya al editor de su sitio web, agregue una nueva sección y seleccione el elemento **Formulario**. Luego elija el formulario que desea mostrar. Consulte [Administrando Páginas](../website/managing-pages.md) para obtener detalles sobre la edición de su sitio web.
:::
