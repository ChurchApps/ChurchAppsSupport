---
title: "Seguridad de datos"
---

# Seguridad de datos

<div class="article-intro">

Aunque no existe un sistema perfectamente seguro, ChurchApps toma la seguridad de datos muy en serio. Esta página explica las medidas tomadas para proteger todos los datos ingresados en B1.church Admin y otros productos de ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Revisa esta página para entender cómo se protegen los datos de tu iglesia
- Configura los [Roles y permisos](./roles-permissions.md) para controlar quién puede acceder a información sensible
- Familiarízate con la [política de privacidad](https://churchapps.org/privacy)

</div>

## Limitación de datos sensibles almacenados

Nuestro primer enfoque es no almacenar más datos sensibles de los necesarios. Esto significa nunca almacenar detalles de tarjetas de crédito o cuentas bancarias utilizadas para hacer donaciones. Cuando un usuario hace una donación usando B1.church Admin o B1, los datos de la tarjeta de crédito nunca se transmiten a ninguno de nuestros servidores, solo a tu pasarela de pago (Stripe). Esto significa que en caso de una violación de datos, no se comprometería información de tarjetas de crédito ni datos bancarios.

Tampoco almacenamos contraseñas en nuestro sistema. Todas las contraseñas se procesan a través de un algoritmo de hash unidireccional en el que parte de los datos se destruye, haciendo imposible que alguien recupere las contraseñas de la base de datos, incluso nosotros. Para verificar contraseñas, el valor ingresado debe pasar por el mismo hash unidireccional y producir el mismo resultado.

Después de eliminar estas dos fuentes, los únicos datos sensibles que quedan son una lista de nombres e información de contacto.

:::tip
Debido a que ChurchApps nunca almacena información de tarjetas de crédito ni datos bancarios, incluso una violación de datos en el peor de los casos no expondría detalles de cuentas financieras. Solo los nombres e información de contacto estarían en riesgo.
:::

## Uso de mejores prácticas estándar

Utilizamos las mejores prácticas estándar de la industria para la seguridad, incluyendo el cifrado de todos los datos en tránsito hacia y desde nuestros servidores usando HTTPS. Todos los servidores están alojados en un centro de datos físicamente seguro con Amazon Web Services. Todos los servidores de bases de datos están detrás de un firewall y son inaccesibles desde Internet.

## Segregación de datos

Los datos se separan en diferentes bases de datos según su alcance. Cada una de nuestras APIs (Membresía, Donaciones, Asistencia, Mensajería, Tareas y Lecciones) son silos independientes de datos con sus propias bases de datos. Si uno de ellos se ve comprometido, la utilidad de los datos es limitada sin que los demás también se vean comprometidos. Por ejemplo, si la API/base de datos de Donaciones se viera comprometida, un actor malintencionado podría potencialmente obtener acceso a una lista de donaciones y fechas (pero nunca a datos de tarjetas/cuentas bancarias). Sin embargo, no tendría acceso a qué usuarios hicieron las donaciones ni a qué iglesias pertenecían, ya que esos datos se almacenan en la base de datos separada de Membresía.

:::info
La segregación de datos significa que comprometer un sistema no da acceso a todos los datos de la iglesia. Cada API opera de forma independiente con su propia base de datos, limitando el impacto de cualquier posible violación.
:::

## Acceso limitado

El acceso a los servidores de producción está estrictamente limitado a los administradores de servidores que requieren acceso. Actualmente son dos personas que también son miembros de la junta directiva. Los desarrolladores, voluntarios y otros miembros de la junta no tienen acceso permitido a los servidores de producción.

## Política de privacidad

Tus datos son tuyos y nunca se venderán a terceros. Puedes leer nuestra política de privacidad completa [aquí](https://churchapps.org/privacy).

## Cumplimiento del RGPD

ChurchApps apoya el cumplimiento del RGPD para iglesias con miembros en el Reino Unido o la Unión Europea. A continuación se explica cómo abordamos los requisitos clave:

### Derechos del interesado

ChurchApps proporciona herramientas para ayudar a las iglesias a responder a las solicitudes de los interesados:

- **Derecho de acceso (Artículo 15)** — Los miembros pueden descargar todos sus datos personales desde el portal de miembros usando el botón "Descargar mis datos". Los administradores también pueden exportar los datos de cualquier persona desde la página de detalle de la persona.
- **Derecho de supresión (Artículo 17)** — Los miembros pueden eliminar su propia cuenta desde el portal de miembros. Los administradores pueden anonimizar o eliminar permanentemente los datos de una persona en todos los módulos. La anonimización reemplaza la información personal con valores genéricos mientras preserva los registros agregados (totales de donaciones, conteos de asistencia) necesarios para los informes financieros de la iglesia.
- **Derecho a la limitación del tratamiento (Artículo 18)** — Los miembros pueden restringir el procesamiento de sus datos, incluyendo la exclusión de comunicaciones.
- **Derecho a la portabilidad de datos (Artículo 20)** — La función de exportación de datos proporciona todos los datos personales en un formato JSON estructurado y legible por máquina.

### Procesamiento de datos

ChurchApps actúa como **encargado del tratamiento** en nombre de tu iglesia (el **responsable del tratamiento**). Nuestro [Acuerdo de procesamiento de datos](https://churchapps.org/terms) describe las responsabilidades de cada parte, incluyendo el uso de subencargados, los procedimientos de notificación de violaciones y el manejo de datos en caso de terminación.

### Transferencias internacionales de datos

Los datos de ChurchApps están alojados en Amazon Web Services (AWS) en Estados Unidos. Las transferencias internacionales de datos desde el Reino Unido/UE están cubiertas por las Cláusulas Contractuales Tipo (SCCs) de AWS bajo el [Anexo de procesamiento de datos de AWS](https://aws.amazon.com/compliance/data-processing-addendum/). No se requiere alojamiento en la UE cuando existen mecanismos de transferencia apropiados como las SCCs.

### Subencargados

- **Amazon Web Services (AWS)** — Alojamiento de infraestructura, almacenamiento de datos y distribución de contenido
- **Stripe** — Procesamiento de pagos para donaciones (ChurchApps no almacena datos de tarjetas)

:::info
Para más detalles sobre cómo gestionamos los datos personales, consulta nuestra [Política de privacidad](https://churchapps.org/privacy) y nuestros [Términos de servicio](https://churchapps.org/terms). Si tienes preguntas sobre el cumplimiento del RGPD, contáctanos en support@churchapps.org.
:::
