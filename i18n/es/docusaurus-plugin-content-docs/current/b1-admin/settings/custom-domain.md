---
title: "Dominio personalizado"
---

# Dominio personalizado

<div class="article-intro">

Puede apuntar su propio dominio (por ejemplo, **`www.yourchurch.org`**) a su sitio de B1 para que los visitantes lleguen con la dirección web real de su iglesia, en lugar de la dirección predeterminada yourchurch.b1.church.

</div>

## Paso 1 — Agregar primero el registro DNS

Antes de agregar su dominio en B1, debe apuntarlo a los servidores de B1 en su registrador de dominios (GoDaddy, Namecheap, Cloudflare, etc.).

Agregue uno de estos registros; se prefiere CNAME:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Use el **CNAME** para su dirección `www`. Use el **registro A** si su registrador no admite CNAME en un dominio raíz (sin www), o si también quiere que funcione el dominio raíz.

Los cambios de DNS pueden tardar desde unos minutos hasta algunas horas en surtir efecto.

## Paso 2 — Agregar el dominio en B1

Una vez que el DNS apunte a B1:

1. Vaya a **Configuración** en B1 Admin.
2. Haga clic en **Dominios** en la lista de la izquierda y luego en **Editar** en la sección **Dominios**.
3. Escriba su dominio en el campo y haga clic en **Guardar**.

No necesita hacer clic primero en el botón **+**: un dominio escrito en el campo se agrega al guardar. Use **+** (o presione **Enter**) cuando quiera agregar varios dominios a la lista antes de guardar.

B1 gestiona SSL automáticamente; no necesita comprar un certificado.

:::warning
Si agrega el dominio en B1 antes de que los registros DNS estén configurados, no se guardará. Configure siempre primero el DNS.
:::

## Verificar que funciona

Después de guardar, visite su dominio en un navegador. Si carga su sitio de B1, ya está listo. Si ve un error, es posible que el DNS todavía se esté propagando: espere unos minutos e intente de nuevo.

También puede comprobar la propagación de DNS en [dnschecker.org](https://dnschecker.org): busque su dominio y verifique que aparezca su registro CNAME o A.
