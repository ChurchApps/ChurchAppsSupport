---
title: "Programar Lecciones"
---

# Programar Lecciones desde Lessons.church

<div class="article-intro">

B1 Admin se integra directamente con [Lessons.church](https://lessons.church) para que puedas programar plan de estudios para tus aulas directamente dentro de tus planes de servicio. Esto mantiene todo -- voluntarios, asignaciones y contenido de lecciones -- en un solo lugar.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Configura tus ministerios en el área de Servicio
- Ten una cuenta activa de [Lessons.church](https://lessons.church) -- regístrate allí primero si tu iglesia aún no tiene una

</div>

:::tip Sigue un tutorial guiado
¿Quieres ver la configuración completa de principio a fin? Nuestra **<a href="/guides/freeplay-b1admin" target="_blank">guía paso a paso</a>** cubre vinculación de proveedores, programación de una lección y conexión de FreePlay a tu TV del aula -- con videos cortos y pasos escritos que puedes marcar mientras avanzas.
:::

## Paso 1 -- Vincula Tu Cuenta de Lessons.church

Esta es una configuración única por ministerio. Necesitas conectar tu cuenta de Lessons.church antes de poder explorar y programar contenido.

1. Inicia sesión en [B1 Admin](https://admin.b1.church/) y ve a **Servicio**
2. Abre el ministerio que quieres conectar (por ejemplo, Ministerio Infantil)
3. Desplázate hasta la sección **Cuentas de Proveedor de Contenido**
4. Haz clic en **Vincular Nuevo Proveedor**
5. Selecciona **Lessons.church** de la lista
6. Aparecerá una pantalla de autorización de dispositivo con un código
7. Ve a [lessons.church](https://lessons.church), inicia sesión e ingresa el código para autorizar la conexión
8. Una vez aprobado, verás **"Cuenta vinculada"** bajo Lessons.church en B1 Admin

:::info
La sección Cuentas de Proveedor de Contenido es por ministerio. Si ejecutas múltiples ministerios (por ejemplo, Infantil y Adolescentes), necesitarás vincular Lessons.church para cada uno por separado.
:::

## Paso 2 -- Programa una Lección

Una vez vinculado, puedes programar lecciones directamente desde Planes.

1. En B1 Admin, ve a **Servicio → Planes**
2. Selecciona tu pestaña de ministerio y haz clic en **Añadir Tipo de Plan** -- dale al tipo de plan un nombre como Iglesia Infantil o Escuela Dominical
3. Haz clic en el tipo de plan que acabas de crear y haz clic en **Programar Lección**. Desde ese menú puedes programar una lección, programar en lote una serie, o **Aplicar Plan de Año** para desplegar una secuencia de año publicada desde Lessons.church.
4. Selecciona la **fecha** para la lección (por defecto el próximo domingo)
5. Haz clic en **Seleccionar Lección** -- se abre un diálogo del navegador de contenido
6. El diálogo se abre con **Lessons.church** seleccionado como el proveedor (o el proveedor usado para las lecciones anteriores de este tipo de plan). Si has vinculado otros proveedores, puedes cambiar entre ellos en la parte superior del diálogo
7. Navega a través del contenido:
   - Selecciona un **Programa** (por ejemplo, "Historias de la Biblia para Niños")
   - Selecciona un **Estudio** dentro de ese programa (por ejemplo, "Creación e Historias Tempranas")
   - Selecciona la **Lección** específica
   - Selecciona el **Lugar** -- esta es la versión del grupo de edad de la lección
8. Haz clic en **Asociar Lección** para confirmar
9. Elige tu **opción de copia** para voluntarios:
   - **Nada** -- plan fresco, no se transfieren voluntarios
   - **Solo Posiciones** -- copia roles de voluntarios del plan anterior pero no quién está asignado
   - **Posiciones y Asignaciones** -- copia ambos roles y voluntarios asignados *(más común)*
10. Haz clic en **Guardar**

El plan se crea y nombra automáticamente (por ejemplo, "23 de Feb - Elemental"). Los voluntarios pueden abrir el plan para ver sus asignaciones y revisar el contenido de la lección antes del domingo.

:::warning
Asegúrate de seleccionar el **Lugar** correcto para el grupo de edad de tu aula. Elegir el lugar incorrecto significa que tus voluntarios verán contenido diseñado para un nivel de edad diferente.
:::

## Aplicar un Plan de Año

Si un editor de plan de estudios ha publicado un plan de año en Lessons.church, puedes cargar toda la secuencia en este tipo de plan en un paso:

1. Haz clic en **Programar Lección → Aplicar Plan de Año**
2. Elige el plan de año publicado
3. Si el plan es anclado al calendario (por ejemplo Ark Kids), elige el **año objetivo**. Los estudios de Pascua y Navidad caen en las fechas de ese año. Ajusta las fechas de primera y última clase si solo estás programando parte del año.
4. Si el plan no está anclado al calendario, establece la primera fecha de clase (semana 1 cae en esa fecha; semanas posteriores son siete días aparte) y cuántas semanas escribir (12, 24, 44 o 52)
5. Opcionalmente copia posiciones de voluntarios del plan anterior
6. Vista previa de la lista. Desmarca cualquier semana que no desees -- las lecciones posteriores en ese tramo se mueven al próximo domingo abierto en lugar de dejar un agujero. Las fechas que ya tienen un plan se saltan de la misma manera para planes anclados al calendario.
7. Guarda. Cada semana se convierte en un plan de servicio que puedes editar como siempre -- cambia la lección, voluntarios o fecha -- y FreePlay reproducirá lo que esté en el plan de esa semana.

:::tip
**Planifica con anticipación** -- Puedes programar múltiples semanas de lecciones a la vez para que tu equipo pueda prepararse con anticipación. Usa la lista de lecciones pasadas en la vista del plan para evitar repetir contenido accidentalmente.
:::

## Personalizar Contenido de Lección

Una vez que se programa una lección, puedes adaptarla para tu aula específica -- elimina secciones que no se aplican, oculta roles que tu sala no usa, o reordena el contenido para que coincida con tu flujo preferido. Las personalizaciones se pueden guardar para solo un aula o aplicarse en todos los aulas de tu iglesia.

Consulta la guía [Personalizar Lecciones](/docs/lessons-church/customization/customizing-lessons) para instrucciones paso a paso.

## Reproducir Lecciones en una TV del Aula con FreePlay

Programar una lección en B1 Admin se combina perfectamente con **[FreePlay](/docs/freeplay/)** -- el reproductor de medios gratuito de ChurchApps para TVs del aula y Fire Sticks. Cuando tu plan está configurado, FreePlay puede extraer el contenido de la lección directamente de Lessons.church y reproducirlo a pantalla completa en el aula. Tu maestro controla el ritmo con un control remoto del TV, avanzando a través de videos y diapositivas mientras fluye la lección.

Esto significa que tus voluntarios ven el plan en sus teléfonos mientras el contenido se reproduce en la TV de la sala -- sin configuración separada, sin unidades USB, sin precipitación de último minuto.

[Aprende cómo conectar FreePlay a un proveedor de contenido →](/docs/freeplay/content-providers/connecting-providers)

## ¿No Ves Tu Proveedor de Plan de Estudios?

La lista de proveedores disponibles está creciendo. Si tu iglesia usa un proveedor de plan de estudios que aún no aparece en B1 Admin, comunícate con nosotros y trabajaremos en agregarlo.

Siéntete libre de copiar y enviar el mensaje a continuación directamente a tu proveedor de plan de estudios -- una vez que se comuniquen con nosotros, prepararemos la integración:

---

> **Asunto: Solicitud de Integración de ChurchApps**
>
> Hola [Equipo del Proveedor de Plan de Estudios],
>
> Amamos tu plan de estudios y lo usamos cada semana con nuestros niños. También usamos ChurchApps para gestionar nuestros voluntarios y planes de servicio, y usamos FreePlay (freeplay.church) para reproducir contenido de lecciones directamente en nuestras TVs del aula. Ha sido un cambio de juego para nuestros maestros.
>
> Ahora tenemos que gestionar tu plan de estudios por separado, pero si fueras integrado con ChurchApps podríamos programar tus lecciones directamente dentro de nuestros planes de servicio y reproducirlas a través de FreePlay en nuestras pantallas del aula -- todo sin salir de las herramientas que ya usamos.
>
> ChurchApps ya funciona con varios proveedores de plan de estudios y su equipo está listo para trabajar contigo también. ¿Podrías comunicarte con ellos en **support@churchapps.org** para iniciar la conversación? ¡Nos encantaría que esto suceda!
>
> ¡Gracias!

---

## Artículos Relacionados

- [Planes de Servicio](./plans.md)
- [Orden del Servicio](./service-order.md)
- [Personalizar Lecciones](/docs/lessons-church/customization/customizing-lessons)
- [FreePlay -- Reproducir Lecciones en una TV del Aula](/docs/freeplay/classroom-mode/playing-lessons)
- [Guía de Programación de Lessons.church](/docs/lessons-church/classrooms/scheduling-lessons)
