---
title: "Seguridad de datos"
description: "Conozca cómo ChurchApps protege los datos de su iglesia en B1 Admin, desde contraseñas con hash y HTTPS hasta bases de datos separadas y herramientas de datos conforme al RGPD."
---

# Seguridad de datos

<div class="article-intro">

Aunque no existe un sistema perfectamente seguro, ChurchApps se toma muy en serio la seguridad de los datos. Esta página explica las medidas que se toman para proteger todos los datos ingresados en B1.church Admin y en otros productos de ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Revise esta página para entender cómo se protegen los datos de su iglesia
- Configure [Roles y permisos](./roles-permissions.md) para controlar quién puede acceder a la información sensible
- Familiarícese con la [política de privacidad](https://churchapps.org/privacy)

</div>

## Limitar los datos sensibles almacenados {#limiting-sensitive-data-stored}

Nuestro primer enfoque es no almacenar más datos sensibles de los necesarios. Esto significa que nunca guardamos los datos de tarjetas de crédito ni de cuentas bancarias usados para hacer donaciones. Cuando un usuario hace una donación con B1.church Admin o con B1, los datos de la tarjeta nunca se transmiten a nuestros servidores, solo a su pasarela de pagos (Stripe). Por eso, en caso de una filtración de datos, no se comprometería ninguna información de tarjetas o cuentas bancarias.

Tampoco almacenamos contraseñas en nuestro sistema. Todas las contraseñas se procesan con un algoritmo de hash unidireccional, que destruye parte de los datos y hace imposible que cualquiera recupere las contraseñas desde la base de datos, incluidos nosotros. Para verificar una contraseña, el valor ingresado debe pasar por el mismo hash unidireccional y producir el mismo resultado.

Una vez eliminadas estas dos fuentes, los únicos datos sensibles que quedan son una lista de nombres e información de contacto.

:::tip
Como ChurchApps nunca almacena información de tarjetas ni de cuentas bancarias, incluso en el peor escenario de una filtración de datos no se expondrían los detalles de cuentas financieras. Solo estarían en riesgo los nombres y la información de contacto.
:::

## Seguir las mejores prácticas estándar {#using-standard-best-practices}

Usamos las mejores prácticas estándar de la industria en seguridad, incluido el cifrado de todos los datos en tránsito hacia y desde nuestros servidores mediante HTTPS. Todos los servidores están alojados en un centro de datos físico seguro de Amazon Web Services. Todos los servidores de bases de datos están detrás de un cortafuegos y son inaccesibles desde Internet.

## Separación de datos {#data-segregation}

Los datos se separan en distintas bases de datos según su alcance. Cada uno de nuestros módulos (Membresía, Donaciones, Asistencia, Mensajería, Operaciones y Contenido) es un silo de datos independiente, con sus propias bases de datos. Si uno de ellos se viera comprometido, la utilidad de los datos sería limitada sin que también se vieran comprometidos los demás. Por ejemplo, si se comprometiera la API o la base de datos de Donaciones, un actor malintencionado podría obtener acceso a una lista de donaciones y fechas (pero nunca a datos de tarjetas o cuentas bancarias). Sin embargo, no tendría acceso a qué usuarios hicieron las donaciones ni para qué iglesias eran, porque esa información se guarda en la base de datos de Membresía, separada.

:::info
La separación de datos significa que comprometer un sistema no da acceso a todos los datos de la iglesia. Cada API funciona de forma independiente con su propia base de datos, lo que limita el impacto de una posible filtración.
:::

## Acceso limitado {#limited-access}

El acceso a los servidores de producción está estrictamente limitado a los administradores de servidores que lo necesitan. Actualmente son dos personas, que además son miembros de la junta directiva. Los desarrolladores, los voluntarios y los demás miembros de la junta no tienen permitido acceder a los servidores de producción.

## Política de privacidad {#privacy-policy}

Sus datos son suyos y nunca se venderán a terceros. Puede leer nuestra política de privacidad completa [aquí](https://churchapps.org/privacy).

## Cumplimiento del RGPD {#gdpr-compliance}

ChurchApps respalda el cumplimiento del Reglamento General de Protección de Datos (RGPD) para iglesias con miembros en el Reino Unido o en la Unión Europea. Así abordamos los requisitos clave:

### Derechos de los interesados {#data-subject-rights}

ChurchApps ofrece herramientas para que las iglesias respondan a las solicitudes de los interesados:

- **Derecho de acceso (artículo 15)** — Los miembros pueden solicitar una copia de sus datos personales comunicándose con su iglesia. Los administradores pueden exportar los datos de cualquier persona con **Exportar datos** en el registro de la persona, o desde la sección **Gestión de datos** del formulario de edición de la persona, en B1.church Admin.
- **Derecho de supresión (artículo 17)** — Los miembros pueden solicitar la eliminación de su cuenta directamente desde la página de su Perfil (consulte [Revisar solicitudes de eliminación de cuenta](../profile/account-deletion.md)), o comunicándose directamente con su iglesia. Los administradores también pueden anonimizar los datos de una persona en todos los módulos desde la sección **Gestión de datos** de la página de detalle de la persona. La anonimización reemplaza la información personal por valores genéricos, pero conserva los registros agregados (totales de donaciones, recuentos de asistencia) necesarios para los informes financieros de la iglesia.
- **Derecho a la limitación (artículo 18)** — Los miembros pueden solicitar la limitación del tratamiento comunicándose con su iglesia, incluido el rechazo a las comunicaciones.
- **Derecho a la portabilidad de los datos (artículo 20)** — Los administradores pueden exportar los datos personales en un formato JSON estructurado y legible por máquina, en nombre de los miembros que lo soliciten.

### Uso de las herramientas de gestión de datos {#using-the-data-management-tools}

Para acceder a las herramientas de datos del RGPD de una persona:

1. Vaya a **Personas** en B1 Admin y abra el registro de la persona.
2. Haga clic en **Editar** para entrar en el modo de edición.
3. Desplácese hasta la sección **Gestión de datos** (plegada de forma predeterminada) y haga clic para expandirla.
4. Use **Exportar datos** para descargar un archivo JSON con todos los datos almacenados de esa persona. (El mismo enlace **Exportar datos** también aparece entre las acciones debajo del nombre de la persona, sin necesidad de abrir el formulario de edición).
5. Use **Anonimizar** para reemplazar la información personal por valores genéricos. Se le pedirá que escriba `ANONYMIZE` para confirmar; esta acción no se puede deshacer.

:::warning
La anonimización es permanente. Los totales de donaciones y los recuentos de asistencia se conservan para fines de informes financieros, pero todos los identificadores personales (nombre, correo electrónico, dirección, etc.) se eliminan y no pueden recuperarse.
:::

### Tratamiento de datos {#data-processing}

ChurchApps actúa como **encargado del tratamiento** en nombre de su iglesia (el **responsable del tratamiento**). Nuestro [Acuerdo de tratamiento de datos](https://churchapps.org/terms) describe las responsabilidades de cada parte, incluido el uso de subencargados, los procedimientos de notificación de brechas y el tratamiento de los datos al finalizar el servicio.

### Transferencias internacionales de datos {#international-data-transfers}

Los datos de ChurchApps están alojados en Amazon Web Services (AWS) en Estados Unidos. Las transferencias internacionales desde el Reino Unido o la UE están cubiertas por las Cláusulas Contractuales Tipo (SCC) de AWS, en virtud del [Anexo de tratamiento de datos de AWS](https://aws.amazon.com/compliance/data-processing-addendum/). El anexo de tratamiento de datos de AWS se incorpora automáticamente en las Condiciones de Servicio de AWS para todos los clientes. No se requiere alojamiento en la UE cuando existen mecanismos de transferencia adecuados, como las SCC.

Para más detalles sobre cómo se han evaluado los riesgos de las transferencias, consulte la [Evaluación de riesgos de transferencia](./transfer-risk-assessment.md).

### Subencargados {#sub-processors}

- **Amazon Web Services (AWS)** — Alojamiento de infraestructura, almacenamiento de datos y entrega de contenido
- **Stripe** — Procesamiento de pagos de donaciones (ChurchApps no almacena datos de tarjetas)

:::info
Para conocer en detalle cómo tratamos los datos personales, consulte nuestra [Política de privacidad](https://churchapps.org/privacy) y nuestras [Condiciones del servicio](https://churchapps.org/terms). Si tiene preguntas sobre el cumplimiento del RGPD, escríbanos a support@churchapps.org.
:::
