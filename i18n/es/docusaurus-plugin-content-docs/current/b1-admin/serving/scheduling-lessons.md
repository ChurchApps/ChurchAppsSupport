---
title: "Programar lecciones de Lessons.church en B1 Admin"
sidebar_label: "Programar lecciones"
description: "Conecte Lessons.church a B1 Admin y luego programe lecciones, programe una serie en lote o aplique un plan anual a los planes de servicio de un ministerio."
---

# Programar lecciones de Lessons.church

<div class="article-intro">

B1 Admin se integra directamente con [Lessons.church](https://lessons.church) para que pueda programar el currículo de sus salones dentro de sus planes de servicio. Así todo queda en un solo lugar: voluntarios, asignaciones y contenido de las lecciones.

</div>

## Video de capacitación {#training-video}

<YouTube id="29DVkNF4UsY" title="Reutilizar un recorte de lección para cada semana en B1" next="Plantillas de plan, tareas y flujos de trabajo en B1" nextUrl="/docs/b1-admin/serving/plan-templates" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Configure sus ministerios en el área de Servicio
- Tenga una cuenta activa de [Lessons.church](https://lessons.church); regístrese allí primero si su iglesia todavía no tiene una

</div>

:::tip Siga una guía paso a paso
¿Quiere ver la configuración completa de principio a fin? Nuestra **<a href="/guides/freeplay-b1admin" target="_blank">guía paso a paso</a>** explica cómo vincular proveedores, programar una lección y conectar FreePlay al televisor de su salón, con videos breves y pasos escritos que puede marcar a medida que avanza.
:::

## Paso 1: vincule su cuenta de Lessons.church {#step-1--link-your-lessonschurch-account}

Esta es una configuración única por ministerio. Debe conectar su cuenta de Lessons.church antes de poder explorar y programar contenido.

1. Inicie sesión en [B1 Admin](https://admin.b1.church/) y vaya a **Servicio**
2. Abra el ministerio que desea conectar (por ejemplo, Ministerio infantil)
3. Desplácese hasta la sección **Proveedores de contenido**
4. Haga clic en **Vincular nuevo proveedor**
5. Seleccione **Lessons.church** de la lista
6. Aparecerá una pantalla de autorización de dispositivo con un código
7. Vaya a [lessons.church](https://lessons.church), inicie sesión e ingrese el código para autorizar la conexión
8. Una vez aprobada, verá **Vinculado** debajo de Lessons.church en B1 Admin

:::info
La sección Proveedores de contenido es por ministerio. Si administra varios ministerios (por ejemplo, Infantil y Jóvenes), deberá vincular Lessons.church por separado en cada uno.
:::

Lessons.church no es la única opción. La misma lista **Vincular nuevo proveedor** también ofrece otras fuentes de currículo y archivos, como SignPresenter, The Bible Project, Jesus Film Project, Go Curriculum, Dropbox, Google Drive y OneDrive. Vincúlelos de la misma forma, y aparecerán como proveedores a los que puede cambiar al seleccionar una lección.

## Paso 2: programe una lección {#step-2--schedule-a-lesson}

Una vez vinculado, puede programar lecciones directamente desde Planes.

1. En B1 Admin, vaya a **Servicio → Planes**
2. Seleccione la pestaña de su ministerio y haga clic en **Agregar tipo de plan** (o **Crear tipo de plan** si el ministerio todavía no tiene ninguno); asigne al tipo de plan un nombre como Iglesia infantil o Escuela dominical
3. Haga clic en el tipo de plan que acaba de crear y haga clic en **Programar lección**. Desde ese menú puede programar una sola lección, programar una serie en lote o **Aplicar plan anual** para incorporar una secuencia anual publicada desde Lessons.church
4. Seleccione la **Fecha programada** de la lección (por defecto, el próximo domingo)
5. Haga clic en **Seleccionar lección**: se abre un diálogo de exploración de contenido
6. El diálogo se abre con **Lessons.church** seleccionado como proveedor (o el proveedor usado en las lecciones anteriores de este tipo de plan). Si ha vinculado otros proveedores, puede cambiar entre ellos en la parte superior del diálogo
7. Explore el contenido:
   - Seleccione un **Programa** (por ejemplo, "Historias bíblicas para niños")
   - Seleccione un **Estudio** dentro de ese programa (por ejemplo, "La creación y los primeros relatos")
   - Seleccione la **Lección** específica
   - Seleccione el **Lugar**: es la versión de la lección para el grupo de edad

   Otros proveedores organizan el contenido de forma diferente. Por ejemplo, **Go Curriculum** empieza con **Elemental** o **Preescolar**, luego una serie y, por último, la lección en sí; no hay lugar que elegir.
8. Haga clic en **Asociar lección** para confirmar
9. Elija su **opción de copia** para los voluntarios:
   - **Nada**: plan nuevo, sin voluntarios arrastrados
   - **Solo puestos**: copia los roles de voluntario del plan anterior, pero no quién está asignado
   - **Puestos y asignaciones**: copia tanto los roles como los voluntarios asignados *(la opción más común)*
10. Haga clic en **Guardar**

El plan se crea y se nombra automáticamente (por ejemplo, "23 feb - Elemental"). Los voluntarios pueden abrir el plan para ver sus asignaciones y revisar el contenido de la lección antes del domingo.

:::warning
Asegúrese de seleccionar el **Lugar** correcto para el grupo de edad de su salón. Elegir un lugar equivocado significa que sus voluntarios verán contenido diseñado para otro nivel de edad.
:::

## Programar una serie en lote {#bulk-schedule-a-series}

Para programar varias lecciones de la misma serie a la vez, haga clic en **Programar lección → Programar en lote**:

1. En **Lección inicial**, haga clic en **Seleccionar lección** y elija la primera lección que quiera programar
2. Establezca la **Fecha de inicio** y elija un **Intervalo** (**Semanal** o **Quincenal**)
3. Elija qué copiar del plan anterior (**Nada**, **Solo puestos** o **Puestos y asignaciones**)
4. Revise la lista: la lección inicial y el resto de su serie, cada una con una fecha. Desmarque las que quiera omitir
5. Haga clic en **Guardar** para crear un plan por cada lección

En el caso de Lessons.church, la lista también muestra el **Lugar** que usará cada lección, emparejado por nombre con el lugar que eligió para la lección inicial (si una lección no tiene ese lugar, se usa otro y se marca como **sustituido**). Los proveedores cuyas lecciones no tienen nivel de lugar, como Go Curriculum, programan las lecciones directamente y la columna Lugar queda oculta.

## Conservar solo una parte de cada lección {#keeping-only-part-of-every-lesson}

Si su salón usa las mismas partes de cada lección (por ejemplo, el video de apertura, el versículo para memorizar y las preguntas del relato) y el resto lo hace en vivo, puede guardar ese recorte una vez por tipo de plan en lugar de editar cada plan:

1. Abra el plan de una lección programada, haga clic en **Editar orden del servicio** y haga clic en **Personalizar**
2. Elimine las secciones que no usa, como lo haría normalmente. Para conservar solo un paso de una sección, como el video del versículo para memorizar, expanda esa sección en sus pasos y elimine los demás
3. Debajo del orden del servicio, haga clic en **Usar esto para cada lección de Elemental** (el enlace indica el nombre de su tipo de plan)
4. Revise la lista de partes que se conservarán. Deje marcada la opción **Recortar también las lecciones próximas que ya están programadas** para recortar las lecciones que ya programó en este tipo de plan (esto reemplaza su orden del servicio)
5. Haga clic en **Guardar**

A partir de ese momento, cada lección programada en ese tipo de plan con **Programar lección**, **Programar en lote**, **Aplicar plan anual** o **Asociar lección** (en el orden del servicio de un plan) llega ya recortada a esas mismas partes, de modo que FreePlay reproduce solo esas partes en el televisor del salón. Las partes se emparejan por nombre, así que una sección que cambia ligeramente de nombre ("Preguntas del relato bíblico" en lugar de "Preguntas del gran relato bíblico") igual se encuentra. Un paso dentro de una sección cuyo nombre cambia cada semana, como un video de versículo para memorizar que se llama según su referencia, se conserva por su posición dentro de la sección.

Cuando una lección no encaja con el patrón (falta una parte, no tiene video o imagen esa semana, o se conservó por su posición en lugar de por su nombre), ese plan igualmente se recorta con lo que sí coincidió y se marca: aparece una advertencia debajo del plan en la lista de planes y en la parte superior de la página del plan, y los líderes del ministerio reciben una notificación. Revise el orden del servicio de ese plan antes del domingo. La advertencia desaparece cuando edita el orden del servicio o hace clic en **Descartar**. Si nada de una lección coincide, la lección se deja completa y marcada.

Los planes que ya tienen un orden del servicio no se modifican al programarlos. Para cambiar el recorte guardado, personalice otro plan y haga clic en **Reemplazar el recorte guardado para Elemental** (de nuevo, con el nombre de su tipo de plan). Para dejar de recortar, abra el diálogo **Editar** del tipo de plan y haga clic en **Borrar** junto a **Recorte de lección**.

## Guías de líder de Go Curriculum {#go-curriculum-leader-guides}

Cuando programa una lección de Go Curriculum, el orden del servicio del plan se construye a partir de la guía de líder del **Grupo grande** de la lección: cada parte de la guía se convierte en una sección, y cada paso dentro de ella aparece con su tipo (como decir, hacer, reproducir o nota) y su texto. Los pasos que reproducen un video u otro medio llevan consigo ese archivo, así que se reproduce en orden. (Una lección sin guía de Grupo grande recurre a una lista simple de sus archivos multimedia).

Cada serie que tiene material para grupos pequeños también empieza con una carpeta **Guías de grupos pequeños**. Ábrala y elija una lección para programar la guía de **Grupo pequeño** de esa lección, con un nombre como "Nombre de la lección - Grupo pequeño"; es útil para un tipo de plan aparte para grupos pequeños. Las guías de grupos pequeños son sobre todo pasos de discusión y normalmente no tienen medios. Como la carpeta aparece primero en la lista, programar en lote una serie desde una de sus lecciones nunca la incluye.
## Aplicar un plan anual {#apply-a-year-plan}

Si un editor de currículo ha publicado un plan anual en Lessons.church, puede cargar toda la secuencia en este tipo de plan en un solo paso:

1. Haga clic en **Programar lección → Aplicar plan anual**
2. Elija el plan anual publicado
3. Si el plan está anclado al calendario (por ejemplo, Ark Kids), elija el **año de destino**. Los estudios de Pascua y Navidad caen en las fechas de ese año. Ajuste la primera y la última fecha de clase si solo programa una parte del año
4. Si el plan no está anclado al calendario, establezca la fecha de la primera clase (la semana 1 cae en esa fecha; las semanas siguientes están separadas por siete días) y cuántas semanas crear (12, 24, 44 o 52)
5. Opcionalmente, copie los puestos de voluntarios del plan anterior
6. Revise la vista previa de la lista. Desmarque cualquier semana que no quiera: las lecciones posteriores de ese tramo se mueven al siguiente domingo libre en lugar de dejar un hueco. Las fechas que ya tienen un plan se omiten de la misma forma en los planes anclados al calendario
7. Guarde. Cada semana se convierte en un plan de servicio que puede editar como de costumbre (cambiar la lección, los voluntarios o la fecha), y FreePlay reproducirá lo que haya en el plan de esa semana

:::tip
**Planifique con anticipación**: puede programar varias semanas de lecciones a la vez para que su equipo pueda prepararse con tiempo. Use la lista de lecciones pasadas en la vista del plan para evitar repetir contenido sin darse cuenta.
:::

## Personalizar el contenido de la lección {#customizing-lesson-content}

Una vez programada una lección, puede adaptarla a su salón: eliminar secciones que no aplican, ocultar los roles que su salón no usa o reordenar el contenido según el flujo que prefiera. Las personalizaciones pueden guardarse solo para un salón o aplicarse a todos los salones de su iglesia.

Consulte la guía [Personalizar lecciones](/docs/lessons-church/customization/customizing-lessons) para ver las instrucciones paso a paso.

## Reproducir lecciones en el televisor del salón con FreePlay {#playing-lessons-on-a-classroom-tv-with-freeplay}

Programar una lección en B1 Admin encaja perfectamente con **[FreePlay](/docs/freeplay/)**, el reproductor multimedia gratuito de ChurchApps para televisores de salón y Fire Sticks. Cuando su plan está configurado, FreePlay puede obtener el contenido de la lección directamente de Lessons.church y reproducirlo a pantalla completa en el salón. Su maestro controla el ritmo con un control remoto de televisor, avanzando por videos y diapositivas a medida que avanza la lección.

Esto significa que sus voluntarios ven el plan en sus teléfonos mientras el contenido se reproduce en el televisor del salón: sin configuración adicional, sin memorias USB y sin prisas de última hora.

[Aprenda a conectar FreePlay a un proveedor de contenido →](/docs/freeplay/content-providers/connecting-providers)

## ¿No ve a su proveedor de currículo? {#dont-see-your-curriculum-provider}

La lista de proveedores disponibles está creciendo. Si su iglesia usa un proveedor de currículo que todavía no aparece en B1 Admin, escríbanos y trabajaremos para agregarlo.

Puede copiar y enviar directamente a su proveedor de currículo el mensaje siguiente; cuando se pongan en contacto con nosotros, prepararemos la integración:

---

> **Asunto: Solicitud de integración con ChurchApps**
>
> Hola, equipo de [Proveedor de currículo]:
>
> Nos encanta su currículo y lo usamos cada semana con nuestros niños. También usamos ChurchApps para administrar nuestros voluntarios y planes de servicio, y usamos FreePlay (freeplay.church) para reproducir el contenido de las lecciones directamente en los televisores de nuestros salones. Ha sido un cambio enorme para nuestros maestros.
>
> Por ahora tenemos que administrar su currículo por separado, pero si estuvieran integrados con ChurchApps, podríamos programar sus lecciones directamente dentro de nuestros planes de servicio y reproducirlas con FreePlay en las pantallas de nuestros salones, sin salir de las herramientas que ya usamos.
>
> ChurchApps ya trabaja con varios proveedores de currículo, y su equipo también está listo para trabajar con ustedes. ¿Podrían escribirles a **support@churchapps.org** para iniciar la conversación? ¡Nos encantaría que esto sucediera!
>
> ¡Muchas gracias!

---

## Artículos relacionados {#related-articles}

- [Planes de servicio](./plans.md)
- [Orden del servicio](./service-order.md)
- [Personalizar lecciones](/docs/lessons-church/customization/customizing-lessons)
- [FreePlay: reproducir lecciones en el televisor del salón](/docs/freeplay/content-providers/playing-content)
- [Guía de programación de Lessons.church](/docs/lessons-church/classrooms/scheduling-lessons)
