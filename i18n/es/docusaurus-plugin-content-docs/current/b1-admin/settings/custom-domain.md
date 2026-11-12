---
title: "Dominio personalizado"
description: "Apunte su propio dominio, como www.yourchurch.org, a su sitio B1 en B1 Admin configurando los registros DNS y agregando el dominio en Configuración."
---

# Dominio personalizado

<div class="article-intro">

Puede apuntar su propio dominio (por ejemplo, **`www.yourchurch.org`**) a su sitio B1 para que los visitantes lleguen a él en la dirección web real de su iglesia, en lugar de la dirección predeterminada yourchurch.b1.church.

</div>

## Video de capacitación {#training-video}

<YouTube id="L5yaDusHts8" title="Conectar un dominio personalizado en B1" next="Configurar la transmisión en vivo en B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Paso 1: agregue primero el registro DNS {#step-1--add-the-dns-record-first}

Antes de agregar su dominio en B1, debe apuntarlo a los servidores de B1 en su registrador de dominios (GoDaddy, Namecheap, Cloudflare, etc.).

Agregue uno de estos registros; se prefiere CNAME:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Use el **CNAME** para su dirección `www`. Use el **registro A** si su registrador no admite CNAME en un dominio raíz o apex (sin www), o si también quiere que funcione el dominio raíz.

Los cambios de DNS pueden tardar desde unos minutos hasta algunas horas en aplicarse.

## Paso 2: agregue el dominio en B1 {#step-2--add-the-domain-in-b1}

Una vez que el DNS apunte a B1:

1. Vaya a **Configuración** en B1 Admin.
2. Haga clic en **Dominios** en la lista de la izquierda y luego en **Editar** en la sección **Dominios**.
3. Escriba su dominio en el campo y haga clic en **Guardar**.

No necesita hacer clic primero en el botón **+**: un dominio que quede escrito en el campo se agrega al guardar. Use **+** (o presione **Intro**) cuando quiera agregar varios dominios a la lista antes de guardar. Escriba solo el dominio, como `www.yourchurch.org`, y no `https://` ni una ruta de página.

Si su iglesia tiene más de un sitio web, cada dominio también tiene un menú desplegable **Sitio web**. Déjelo en **Sitio web principal** o elija el sitio que debe abrir ese dominio.

Para quitar un dominio, haga clic en el icono de eliminar de su fila y haga clic en **Guardar**.

B1 gestiona el SSL automáticamente; no necesita comprar un certificado.

:::warning
B1 guarda el dominio aunque los registros DNS todavía no estén configurados, pero el dominio no cargará su sitio, y B1 no puede emitir su certificado SSL, hasta que el DNS apunte a B1. Configure primero el DNS. No se puede agregar un dominio que ya usa otra iglesia.
:::

## Comprobar que funciona {#checking-if-its-working}

Después de guardar, visite su dominio en un navegador. Si carga su sitio B1, ya está listo. Si ve un error, el DNS puede seguir propagándose; espere unos minutos y vuelva a intentarlo.

También puede comprobar la propagación del DNS en [dnschecker.org](https://dnschecker.org): busque su dominio y verifique que aparezca su registro CNAME o A.
