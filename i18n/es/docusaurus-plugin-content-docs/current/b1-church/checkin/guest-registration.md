---
title: "Registro de invitados"
description: "Regístrese a usted y a su familia como invitados de primera vez con el formulario de código QR de B1 Checkin, para que los voluntarios puedan registrar su entrada cuando llegue."
---

# Registro de invitados {#guest-registration}

<div class="article-intro">

Si visita una iglesia por primera vez, puede registrarse a usted y a su familia como invitados usando la página de registro de invitados. Esto crea un registro en el sistema de la iglesia para que los voluntarios puedan registrar su entrada cuando llegue.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Su iglesia debe tener activado el registro de invitados por código QR. Si no lo está, la página muestra "El registro de invitados no está habilitado para esta iglesia."
- Escanee el código QR que aparece en el kiosco de registro de entrada, toque **Registrarse aquí** en el kiosco, o reciba un enlace de un voluntario de la iglesia

</div>

## Cómo funciona el registro de invitados {#how-guest-registration-works}

El registro de invitados está pensado para visitantes que todavía no tienen una cuenta. En el kiosco de registro de entrada de la iglesia, toque **Registrarse como invitado** para mostrar un código QR que enlaza con la página de registro. También puede recibir el enlace de un voluntario o de un recibidor, o encontrarlo en un volante o en el sitio web de la iglesia.

¿No tiene el teléfono a mano? En la misma ventana del código QR del kiosco, toque **Registrarse aquí** para completar el formulario en el propio kiosco. Consulte [Registrarse como invitado](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest) para ver cómo funciona esto en el kiosco.

La página se abre con el título **Registro de invitados**. Si la iglesia ha agregado una foto de encabezado, aparece en la parte superior de la página; de lo contrario, verá un pequeño icono.

## Registrar a su familia {#registering-your-family}

1. **Escanee el código QR** en el kiosco de registro de entrada o abra el enlace de registro de invitados en su teléfono. (Si tocó **Registrarse aquí** en el kiosco, el formulario ya está abierto).
2. Complete la tarjeta del **Contacto principal**. El **Nombre** y el **Apellido** siempre son obligatorios. Según lo que pida su iglesia, es posible que también vea:
   - **Título** (como Sr., Sra., Dr. o Pastor), delante del nombre
   - **Correo electrónico** y **Teléfono**
   - **Estado civil**
   - **Dirección particular** -- **Calle**, **Línea de dirección 2**, **Ciudad**, **Estado** y **Código postal**. Se comparte entre toda la familia.
3. El formulario empieza con una segunda tarjeta para el **Miembro de familia 2**. Ingrese su nombre y apellido, o toque la **X** en la esquina de la tarjeta para quitarla si se registra solo.
4. Para agregar más personas, toque **Agregar miembro de la familia**. La nueva tarjeta completa automáticamente el apellido del contacto principal. Puede registrar hasta 10 personas a la vez.
5. Si su iglesia lo pide, la tarjeta de cada persona también puede incluir **Título**, **Correo electrónico**, **Teléfono**, **Fecha de nacimiento**, **Género** y **Grado**. Cada tarjeta después del contacto principal también puede pedir un **Rol en el hogar** -- **Cónyuge**, **Hijo/a** u **Otro** --, para que la iglesia sepa cómo se relaciona cada persona con el contacto principal.
   Si su iglesia pide una foto, cada tarjeta tiene un botón **Agregar foto**. Tóquelo, elija o tome una imagen, recórtela y guárdela; la foto aparecerá en la tarjeta. Toque **Cambiar foto** para elegir otra o **Quitar foto** para eliminarla. La foto se guarda como foto de perfil de esa persona cuando se crea su registro.
6. Si su iglesia incluye un cuadro de **Comentarios** debajo de los miembros de la familia, úselo para compartir lo que quiera que la iglesia sepa (hasta 1.000 caracteres).
7. Toque **Registrarse** para enviar.

Los campos marcados con un asterisco (`*`) son obligatorios. Cada tarjeta necesita nombre y apellido; si falta alguno, el formulario muestra "El nombre y el apellido son obligatorios para cada miembro." Si otro campo obligatorio queda en blanco, muestra "Por favor, complete todos los campos obligatorios." No se envía nada hasta que los complete.

## Después de registrarse {#after-registering}

Una vez que envía el formulario, aparece una pantalla de confirmación con el mensaje: "Registro completado: ¡Todo listo! Un miembro del personal registrará su entrada en breve."

Su registro crea registros en la base de datos de la iglesia:

- Se crea un **hogar** con el apellido del contacto principal, y el contacto principal como jefe de hogar.
- Se crean **registros de personas** para cada miembro de la familia con un estado de membresía de "Visitante". Cada miembro de la familia recibe el rol en el hogar que eligió, o **Otro** si no se pidió ninguno.
- Los comentarios que escribió se guardan como una nota en el registro del contacto principal, para que el personal de la iglesia los lea.
- Si la iglesia eligió un grupo para los nuevos invitados, su familia se agrega a él. Es posible que la iglesia también registre su asistencia automáticamente si se registra durante uno de los horarios de servicio programados de ese grupo.
- Un voluntario o administrador de la iglesia puede entonces registrar la entrada de su familia usando el kiosco de [B1 Checkin](../../b1-checkin/check-in/looking-up-members.md).

:::info
Si se registra de nuevo con el mismo nombre y el mismo correo electrónico o número de teléfono, los registros de la iglesia lo reconocen y reutilizan su perfil existente en lugar de agregar un duplicado. Cualquier otra persona se agrega como nueva. Si ya se registró, también puede simplemente buscar su nombre o su número de teléfono en el kiosco.
:::

:::tip
Si el formulario pide su dirección de correo electrónico, proporcionarla ayuda a la iglesia a dar seguimiento después de su visita.
:::

## Artículos relacionados {#related-articles}

- [Registro propio de entrada](./self-checkin.md) -- Registre su propia entrada después de registrarse
- [Agregar invitados (kiosco)](../../b1-checkin/check-in/adding-guests.md) -- Cómo los voluntarios agregan invitados en el kiosco
- [Registro de entrada](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Cómo los administradores de la iglesia configuran el registro de invitados por código QR
