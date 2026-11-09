---
title: "Programar lecciones desde Lessons.church en B1 Admin"
sidebar_label: "Programar lecciones"
description: "Vincule Lessons.church con B1 Admin y luego programe lecciones, programe en lote una serie completa o aplique un plan anual a los planes de servicio de un ministerio."
---

# Programar lecciones desde Lessons.church

<div class="article-intro">

B1 Admin se integra directamente con [Lessons.church](https://lessons.church), para que pueda programar el currículo de sus salones dentro de los planes de servicio. Así todo queda en un solo lugar: voluntarios, asignaciones y contenido de las lecciones.

</div>

## Video de capacitación

<YouTube id="29DVkNF4UsY" title="Reusing a Lesson Trim for Every Week in B1" next="Plan Templates, Tasks, and Workflows in B1" nextUrl="/docs/b1-admin/serving/plan-templates" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus ministerios en el área de Serving
- Tenga una cuenta activa de [Lessons.church](https://lessons.church); regístrese allí primero si su iglesia todavía no tiene una

</div>

:::tip Siga una guía paso a paso
¿Quiere ver la configuración completa de principio a fin? Nuestra **<a href="/guides/freeplay-b1admin" target="_blank">guía paso a paso</a>** explica cómo vincular proveedores, programar una lección y conectar FreePlay al televisor de su salón, con videos cortos y pasos escritos que puede marcar a medida que avanza.
:::

## Paso 1: vincular su cuenta de Lessons.church

Esta es una configuración única por ministerio. Necesita conectar su cuenta de Lessons.church antes de poder explorar y programar contenido.

1. Inicie sesión en [B1 Admin](https://admin.b1.church/) y vaya a **Serving**
2. Abra el ministerio que quiere conectar (por ejemplo, Children's Ministry)
3. Desplácese hasta la sección **Content Providers**
4. Haga clic en **Link New Provider**
5. Seleccione **Lessons.church** de la lista
6. Aparecerá una pantalla de autorización de dispositivo con un código
7. Vaya a [lessons.church](https://lessons.church), inicie sesión e introduzca el código para autorizar la conexión
8. Una vez aprobada, verá **Linked** debajo de Lessons.church en B1 Admin

:::info
La sección Content Providers es por ministerio. Si tiene varios ministerios (por ejemplo, de niños y de jóvenes), deberá vincular Lessons.church a cada uno por separado.
:::

Lessons.church no es la única opción. La misma lista de **Link New Provider** también ofrece otras fuentes de currículo y archivos, entre ellas SignPresenter, The Bible Project, Jesus Film Project, Go Curriculum, Dropbox, Google Drive y OneDrive. Puede vincular cualquiera de ellas de la misma forma, y aparecerán como proveedores a los que puede cambiar al seleccionar una lección.

## Paso 2: programar una lección

Una vez vinculado, puede programar lecciones directamente desde Plans.

1. En B1 Admin, vaya a **Serving → Plans**
2. Seleccione la pestaña de su ministerio y haga clic en **Add Plan Type** (o en **Create Plan Type** si el ministerio todavía no tiene ninguno); dé al tipo de plan un nombre como Children's Church o Sunday School
3. Haga clic en el tipo de plan que acaba de crear y en **Schedule Lesson**. Desde ese menú puede programar una lección, programar una serie en lote o **Apply Year Plan** para incorporar una secuencia anual publicada desde Lessons.church.
4. Seleccione la **date** de la lección (por defecto, el próximo domingo)
5. Haga clic en **Select Lesson**; se abre un cuadro de diálogo para explorar el contenido
6. El cuadro de diálogo se abre con **Lessons.church** seleccionado como proveedor (o con el proveedor usado en las lecciones anteriores de este tipo de plan). Si ha vinculado otros proveedores, puede cambiar entre ellos en la parte superior del cuadro de diálogo
7. Explore el contenido:
   - Seleccione un **Program** (por ejemplo, "Bible Stories for Kids")
   - Seleccione un **Study** dentro de ese programa (por ejemplo, "Creation and Early Stories")
   - Seleccione la **Lesson** concreta
   - Seleccione la **Venue**: es la versión de la lección para el grupo de edad

   Otros proveedores organizan el contenido de otra manera. Por ejemplo, **Go Curriculum** empieza por **Elementary** o **Preschool**, luego una serie y después la lección en sí; no hay versión por edad que elegir.
8. Haga clic en **Associate Lesson** para confirmar
9. Elija su **copy option** para los voluntarios:
   - **Nothing** — plan nuevo, sin voluntarios arrastrados
   - **Positions Only** — copia los roles de voluntario del plan anterior, pero no quién está asignado
   - **Positions and Assignments** — copia tanto los roles como los voluntarios asignados *(lo más habitual)*
10. Haga clic en **Save**

El plan se crea y se nombra automáticamente (por ejemplo, "Feb 23 - Elementary"). Los voluntarios pueden abrir el plan para ver sus asignaciones y revisar el contenido de la lección antes del domingo.

:::warning
Asegúrese de seleccionar la **Venue** correcta para el grupo de edad de su salón. Elegir una versión incorrecta significa que sus voluntarios verán contenido diseñado para otro nivel de edad.
:::

## Programar una serie en lote

Para programar varias lecciones de la misma serie a la vez, haga clic en **Schedule Lesson → Bulk Schedule**:

1. En **Starting Lesson**, haga clic en **Select Lesson** y elija la primera lección que quiera programar
2. Establezca la **Start Date** y elija un **Interval** (**Weekly** o **Bi-Weekly**)
3. Elija qué copiar del plan anterior (**Nothing**, **Positions Only** o **Positions and Assignments**)
4. Revise la lista: la lección inicial y el resto de su serie, cada una con una fecha. Desmarque las que quiera omitir
5. Haga clic en **Save** para crear un plan por cada lección

En el caso de Lessons.church, la lista también muestra la **Venue** que usará cada lección, emparejada por nombre con la versión que eligió para la lección inicial (si una lección no tiene esa versión, se usa otra y se marca como **substituted**). Los proveedores cuyas lecciones no tienen nivel de versión por edad, como Go Curriculum, programan las lecciones directamente y la columna Venue se oculta.

## Conservar solo una parte de cada lección

Si su salón usa las mismas partes de cada lección (por ejemplo, el video de apertura, el versículo para memorizar y las preguntas sobre la historia) y el resto lo hace en vivo, puede guardar ese recorte una sola vez por tipo de plan, en lugar de editar cada plan:

1. Abra el plan de una lección programada y haga clic en **Customize**
2. Elimine las secciones que no use, como lo haría normalmente. Para conservar solo un paso de una sección, como el video del versículo para memorizar, expanda esa sección en sus pasos y elimine los demás
3. Debajo del orden de servicio, haga clic en **Use this for every lesson in Elementary** (el enlace indica el nombre de su tipo de plan)
4. Revise la lista de partes que se conservarán. Deje marcada **Also trim the upcoming lessons already scheduled** para recortar también las lecciones que ya tiene programadas en este tipo de plan (esto reemplaza su orden de servicio)
5. Haga clic en **Save**

A partir de ese momento, cada lección programada en ese tipo de plan con **Schedule Lesson**, **Bulk Schedule**, **Apply Year Plan** o **Link Lesson** llega ya recortada a las mismas partes, de modo que FreePlay reproduce solo esas partes en el televisor del salón. Las partes se emparejan por nombre, así que una sección que cambie ligeramente de nombre ("Bible Story Questions" en lugar de "Big Bible Story Questions") se sigue encontrando. Un paso dentro de una sección cuyo nombre cambia cada semana, como un video de versículo para memorizar que se llama según su referencia, se conserva según su posición dentro de la sección.

Cuando una lección no encaja con el patrón (falta una parte, no tiene video o imagen esa semana, o se conservó por su posición en lugar de por su nombre), ese plan se recorta solo a lo que coincidió y se marca: aparece una advertencia debajo del plan en la lista de planes y en la parte superior de la página del plan, y los líderes del ministerio reciben una notificación. Revise el orden de servicio de ese plan antes del domingo. La advertencia desaparece cuando edita el orden de servicio o hace clic en **Dismiss**. Si no coincide nada de una lección, la lección se deja completa y se marca.

Los planes que ya tienen un orden de servicio no cambian al programarse. Para cambiar el recorte guardado, personalice otro plan y haga clic en **Replace the saved trim for Elementary** (de nuevo, con el nombre de su tipo de plan). Para dejar de recortar, abra el diálogo **Edit** del tipo de plan y haga clic en **Clear** junto a **Lesson trim**.

## Guías para líderes de Go Curriculum

Cuando programa una lección de Go Curriculum, el orden de servicio del plan se construye a partir de la guía para líderes de **Large Group** de la lección: cada parte de la guía se convierte en una sección, y cada paso dentro de ella se muestra con su tipo (como say, do, play o note) y su texto. Los pasos que reproducen un video u otro archivo multimedia llevan consigo ese archivo, así que se reproduce en orden. (Una lección sin guía de Large Group recurre a una lista simple con sus archivos multimedia).

Cada serie que tiene material para grupos pequeños también empieza con una carpeta **Small Group Guides**. Ábrala y elija una lección para programar la guía **Small Group** de esa lección, con un nombre como "Lesson Name - Small Group", útil para un tipo de plan aparte para los grupos pequeños. Las guías de grupos pequeños son sobre todo pasos de discusión y normalmente no tienen contenido multimedia. Como la carpeta aparece primero en la lista, la programación en lote de una serie desde una de sus lecciones nunca la incluye.

## Aplicar un plan anual

Si un editor de currículo ha publicado un plan anual en Lessons.church, puede cargar toda la secuencia en este tipo de plan en un solo paso:

1. Haga clic en **Schedule Lesson → Apply Year Plan**
2. Elija el plan anual publicado
3. Si el plan está anclado al calendario (por ejemplo, Ark Kids), elija el **target year**. Los estudios de Pascua y Navidad caen en las fechas de ese año. Ajuste la fecha de la primera y de la última clase si solo va a programar parte del año.
4. Si el plan no está anclado al calendario, establezca la fecha de la primera clase (la semana 1 cae en esa fecha; las semanas siguientes están separadas por siete días) y cuántas semanas quiere escribir (12, 24, 44 o 52)
5. Opcionalmente, copie las posiciones de voluntarios del plan anterior
6. Revise la lista de vista previa. Desmarque cualquier semana que no quiera: las lecciones posteriores de ese tramo se mueven al siguiente domingo libre en lugar de dejar un hueco. Las fechas que ya tienen un plan se omiten de la misma forma en los planes anclados al calendario.
7. Guarde. Cada semana se convierte en un plan de servicio que puede editar como de costumbre: cambie la lección, los voluntarios o la fecha. FreePlay reproducirá lo que haya en el plan de cada semana.

:::tip
**Planifique con antelación**: puede programar varias semanas de lecciones a la vez para que su equipo pueda prepararse con tiempo. Use la lista de lecciones pasadas en la vista del plan para no repetir contenido sin darse cuenta.
:::

## Personalizar el contenido de la lección

Una vez programada una lección, puede adaptarla a su salón: quitar las secciones que no se aplican, ocultar los roles que su salón no usa o reordenar el contenido para que siga el flujo que prefiera. Las personalizaciones se pueden guardar solo para un salón o aplicar a todos los salones de su iglesia.

Consulte la guía [Personalizar lecciones](/docs/lessons-church/customization/customizing-lessons) para ver las instrucciones paso a paso.

## Reproducir lecciones en el televisor del salón con FreePlay

Programar una lección en B1 Admin encaja perfectamente con **[FreePlay](/docs/freeplay/)**, el reproductor multimedia gratuito de ChurchApps para televisores de salón y Fire Sticks. Cuando su plan está configurado, FreePlay puede obtener el contenido de la lección directamente de Lessons.church y reproducirlo a pantalla completa en el salón. El maestro controla el ritmo con un mando a distancia del televisor, avanzando entre videos y diapositivas a medida que avanza la lección.

Así, sus voluntarios ven el plan en sus teléfonos mientras el contenido se reproduce en el televisor del salón: sin configuración adicional, sin memorias USB y sin improvisaciones de última hora.

[Aprenda a conectar FreePlay a un proveedor de contenido →](/docs/freeplay/content-providers/connecting-providers)

## ¿No ve su proveedor de currículo?

La lista de proveedores disponibles sigue creciendo. Si su iglesia usa un proveedor de currículo que todavía no aparece en B1 Admin, póngase en contacto con nosotros y trabajaremos para añadirlo.

Siéntase libre de copiar y enviar el mensaje siguiente directamente a su proveedor de currículo; cuando se pongan en contacto con nosotros, prepararemos la integración:

---

> **Asunto: Solicitud de integración con ChurchApps**
>
> Hola [Equipo del proveedor de currículo]:
>
> Nos encanta su currículo y lo usamos cada semana con nuestros niños. También usamos ChurchApps para gestionar a nuestros voluntarios y planes de servicio, y usamos FreePlay (freeplay.church) para reproducir el contenido de las lecciones directamente en los televisores de nuestros salones. Ha sido un cambio enorme para nuestros maestros.
>
> Ahora mismo tenemos que gestionar su currículo por separado, pero si estuvieran integrados con ChurchApps podríamos programar sus lecciones directamente dentro de nuestros planes de servicio y reproducirlas con FreePlay en las pantallas de nuestros salones, sin salir de las herramientas que ya usamos.
>
> ChurchApps ya trabaja con varios proveedores de currículo, y su equipo también está listo para trabajar con ustedes. ¿Podrían ponerse en contacto con ellos en **support@churchapps.org** para iniciar la conversación? ¡Nos encantaría que esto se hiciera realidad!
>
> ¡Muchas gracias!

---

## Artículos relacionados

- [Planes de servicio](./plans.md)
- [Orden de servicio](./service-order.md)
- [Personalizar lecciones](/docs/lessons-church/customization/customizing-lessons)
- [FreePlay: reproducir contenido de lecciones](/docs/freeplay/content-providers/playing-content)
- [Guía de programación de Lessons.church](/docs/lessons-church/classrooms/scheduling-lessons)
