---
title: "Creando Formularios"
---

# Creando Formularios

<div class="article-intro">

Crea formularios personalizados para recopilar información de tu congregación. Puedes crear formularios para registros de eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios pueden vincularse a personas en tu base de datos o usarse como páginas independientes con su propia URL pública.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Para formularios de **Personas** (vinculados a registros de persona), necesitas [personas en tu base de datos](../people/adding-people.md) primero.
- Para formularios que recopilan **pagos**, debes tener [Stripe configurado para ofrendas en línea](../donations/online-giving-setup.md).

</div>

## Creando un Nuevo Formulario

1. Abre **Personas** del menú de sección, luego haz clic en **Formularios** en la barra de navegación.
2. Haz clic en **Añadir Formulario**.
3. Ingresa un **nombre** para tu formulario.
4. Elige el tipo de formulario del menú desplegable:
   - **Personas** — Asocia envíos con [registros de personas](../people/adding-people.md) en tu base de datos.
   - **Independiente** — Crea un formulario independiente con su propia URL pública, ideal para registros externos.
5. Haz clic en **Guardar** para crear el formulario.

Tu nuevo formulario aparecerá en la lista. Haz clic en él para comenzar a añadir preguntas.

## Imprimiendo un Formulario en Blanco

¿Necesitas una copia en papel para repartir -- para una tarjeta de visitante en la mesa de bienvenida, o un formulario que alguien sin acceso a internet pueda rellenar a mano? Haz clic en el **icono de impresión** junto a un formulario en la lista principal de Formularios para abrir una vista previa, luego haz clic en **Imprimir**. Los campos en blanco se imprimen con un guión bajo o casilla de verificación para cada pregunta para que las personas puedan completarlas a mano; las preguntas requeridas se marcan con un asterisco. No hay otras opciones de impresión -- imprime el formulario completo o nada.

## Añadiendo Preguntas

1. Abre tu formulario y ve a la pestaña **Preguntas**.
2. Haz clic en **Añadir Pregunta**.
3. Selecciona un **tipo de campo** del menú desplegable del Proveedor. Los tipos disponibles incluyen:
   - **Cuadro de Texto** — Para respuestas de texto corto
   - **Fecha** — Para selecciones de fecha
   - **Correo Electrónico** — Para direcciones de correo electrónico
   - **Número de Teléfono** — Para entrada de teléfono
   - **Opción Múltiple** — Para seleccionar de opciones predefinidas
   - **Pago** — Para recopilar pagos
4. Ingresa un **Título** y una **Descripción** opcional para la pregunta.
5. Marca **Requerir una respuesta** si el campo es obligatorio.
6. Haz clic en **Guardar**.
7. Repite para añadir más preguntas.

:::warning
El tipo de campo **Pago** requiere que Stripe esté configurado. Si aún no has configurado ofrendas en línea, consulta [Configuración de Ofrendas en Línea](../donations/online-giving-setup.md) antes de añadir campos de pago.
:::

## Gestionando Miembros del Formulario

1. Abre tu formulario y ve a la pestaña **Miembros**.
2. Busca una persona y añádela con un rol:
   - **Admin** — Puede editar el formulario y ver todos los envíos.
   - **Solo Ver** — Puede ver envíos pero no puede editar el formulario.

## Añadiendo Automáticamente Remitentes a un Grupo

Cuando **Crear un registro de persona a partir de envíos** está habilitado, también puedes vincular el formulario a un grupo para que cada remitente se añada automáticamente al registro del grupo:

1. Abre los **Detalles** de tu formulario y activa **Crear un registro de persona a partir de envíos**.
2. Bajo **Añadir remitentes a un grupo**, selecciona el grupo al que añadir remitentes, o déjalo configurado a **Ninguno**.
3. Haz clic en **Guardar**.

Cada vez que alguien envía el formulario, la persona coincidente o recién creada se añade al grupo (se omiten los miembros del grupo existente). Esto es útil para cosas como un formulario de inscripción de campamento que debería construir automáticamente el grupo de registro del campamento.

### Enviando un Correo Electrónico de Seguimiento

Con **Crear un registro de persona a partir de envíos** activado, también puedes enviar un correo electrónico a cada persona que envía el formulario. Completa **Asunto del Correo Electrónico de Seguimiento** y **Cuerpo del Correo Electrónico de Seguimiento** en los detalles del formulario. Puedes usar los tokens `{firstName}` y `{churchName}` en ambos. El correo electrónico se envía solo cuando ambos campos están completos.

:::info
Los correos electrónicos de seguimiento solo se envían después de que tu iglesia haya sido aprobada para enviar correos electrónicos de grupo, y cuentan hacia el límite de correos electrónicos diarios de tu iglesia. Consulta [Activando Correo Electrónico de Grupo para Tu Iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicando un Formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haz clic en el icono **Duplicar** (icono de copia) junto al formulario en la lista de Formularios. B1 crea una copia exacta del formulario -- incluyendo todas las preguntas -- que luego puedes renombrar y editar independientemente.

:::tip
La duplicación es útil para eventos recurrentes donde las preguntas de registro se mantienen igual de año en año. Duplica el formulario del año pasado, actualiza el nombre y las fechas, y estás listo.
:::

## Configurando Propiedades del Formulario

Puedes actualizar el nombre y la configuración de tu formulario en cualquier momento. Para formularios Independientes, también verás una **URL pública** única que puedes compartir con cualquiera, junto con un campo de **Descripción** -- texto mostrado encima de las preguntas en la página del formulario público, útil para decirle a las personas para qué es el formulario antes de que comiencen a completarlo.

:::tip
Los formularios Independientes son excelentes para registros de eventos. Comparte la URL pública por correo electrónico, redes sociales o incrusta el formulario directamente en tu sitio web de iglesia.
:::

:::info
Para incrustar un formulario en tu sitio web B1, ve a tu editor de sitio web, añade una nueva sección y selecciona el elemento **Formulario**. Luego elige el formulario que deseas mostrar. Consulta [Gestionando Páginas](../website/managing-pages.md) para obtener detalles sobre edición de tu sitio web.
:::
