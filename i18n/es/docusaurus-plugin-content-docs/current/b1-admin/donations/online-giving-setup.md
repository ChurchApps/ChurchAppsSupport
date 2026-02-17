---
title: "Configuraci\u00f3n de ofrendas en l\u00ednea"
---

# Configuraci\u00f3n de ofrendas en l\u00ednea

<div class="article-intro">

B1 Admin se integra con **Stripe** y **PayPal** para que sus miembros puedan dar en l\u00ednea a trav\u00e9s de su sitio B1.church. Una vez configuradas, las donaciones en l\u00ednea aparecen autom\u00e1ticamente en sus registros de donaciones junto con las ofrendas ingresadas manualmente, manteniendo todo en un solo sistema.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure sus [fondos de donaci\u00f3n](funds.md) para que los donantes puedan designar sus ofrendas
- Cree una cuenta de Stripe en [stripe.com](https://stripe.com) y act\u00edvela (saque del modo de prueba)
- Tenga listas sus credenciales de inicio de sesi\u00f3n de B1 Admin

</div>

## Configurar Stripe

1. Cree una cuenta en [stripe.com](https://stripe.com) si a\u00fan no tiene una. Aseg\u00farese de **activar su cuenta** y sacarla del modo de prueba.
2. En Stripe, vaya a **Desarrolladores > Claves API**.
3. Copie su **Clave publicable**.
4. Inicie sesi\u00f3n en [B1 Admin](https://admin.b1.church/).
5. Haga clic en **Iglesia** en la navegaci\u00f3n superior, luego haga clic en **Editar configuraci\u00f3n de la iglesia**.
6. Haga clic en el icono de edici\u00f3n junto a **Configuraci\u00f3n de la iglesia**.
7. Despl\u00e1cese hacia abajo hasta la secci\u00f3n de **Ofrendas**.
8. Establezca el **Proveedor** en **Stripe**.
9. Pegue su Clave publicable en el campo de **Clave p\u00fablica**.
10. Regrese a Stripe y revele su **Clave secreta** (solo puede verla una vez, as\u00ed que guarde una copia de respaldo).
11. Pegue la Clave secreta en el campo de **Clave secreta** y haga clic en **Guardar**.

:::warning
Su Clave secreta de Stripe solo se muestra una vez. C\u00f3piela en una ubicaci\u00f3n segura antes de navegar fuera del panel de Stripe. Si la pierde, necesitar\u00e1 generar una nueva clave.
:::

## Agregar una p\u00e1gina de donaciones a su sitio B1.church

1. Vaya a [b1.church](https://b1.church/) e inicie sesi\u00f3n.
2. Haga clic en el icono de **Configuraci\u00f3n**.
3. Haga clic en **Agregar pesta\u00f1a**.
4. Elija **Donaci\u00f3n** como el tipo.
5. Ingrese un nombre para la pesta\u00f1a (por ejemplo, "Ofrendar") y haga clic en **Guardar**.
6. Opcionalmente, cambie el icono de la pesta\u00f1a -- escriba "Giv" en la b\u00fasqueda de iconos para encontrar un icono relacionado con ofrendas.

Su p\u00e1gina de donaciones ya est\u00e1 activa. Los miembros pueden visitarla en `susubdominio.b1.church/donate`.

## Compartir su enlace de ofrendas

Para encontrar su URL de ofrendas, vaya a **B1 Admin** y haga clic en el icono de **Configuraci\u00f3n** para ver su subdominio. Su enlace de donaciones sigue el formato:

`https://susubdominio.b1.church/donate`

Comparta este enlace en su sitio web, en correos electr\u00f3nicos o en su bolet\u00edn para que los miembros sepan d\u00f3nde pueden dar en l\u00ednea.

## Notificaciones de donaciones

Stripe env\u00eda una notificaci\u00f3n por correo electr\u00f3nico cada vez que se recibe una donaci\u00f3n. Para cambiar la direcci\u00f3n de correo electr\u00f3nico de notificaci\u00f3n, vaya al panel de Stripe, haga clic en su perfil en la esquina superior derecha, elija **Perfil** y actualice su direcci\u00f3n de correo electr\u00f3nico.

## Opciones de comisi\u00f3n por procesamiento

Puede configurar su p\u00e1gina de ofrendas para permitir que los donantes opcionalmente cubran las comisiones de procesamiento para que su iglesia reciba el monto completo de la donaci\u00f3n. Esta configuraci\u00f3n se administra en la configuraci\u00f3n de su iglesia dentro de B1 Admin.

:::tip
Despu\u00e9s de la configuraci\u00f3n, haga una peque\u00f1a donaci\u00f3n de prueba para confirmar que todo funciona antes de anunciar las ofrendas en l\u00ednea a su congregaci\u00f3n.
:::

## Pr\u00f3ximos pasos

- Use la [Importaci\u00f3n de Stripe](stripe-import.md) para traer transacciones en l\u00ednea a B1 Admin si no se est\u00e1n sincronizando autom\u00e1ticamente
- Revise sus [Reportes de donaciones](donation-reports.md) para verificar que las donaciones en l\u00ednea aparezcan correctamente
- Genere [Estados de cuenta de ofrendas](giving-statements.md) que incluyan tanto las donaciones en l\u00ednea como las presenciales
