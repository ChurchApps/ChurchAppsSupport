---
title: "Dominio personalizado"
---

# Dominio personalizado

<div class="article-intro">

Puedes apuntar tu propio dominio (por ejemplo, **`www.tuiglesia.org`**) a tu sitio de B1 para que los visitantes lleguen a la dirección web real de tu iglesia en lugar de la dirección predeterminada tuiglesia.b1.church.

</div>

## Paso 1: Agrega primero el registro DNS

Antes de agregar tu dominio en B1, debes apuntarlo a los servidores de B1 en tu registrador de dominios (GoDaddy, Namecheap, Cloudflare, etc.).

Agrega uno de estos registros; se prefiere CNAME:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `tuiglesia.org` | `3.23.251.61` |

Usa el **CNAME** para tu dirección `www`. Usa el **registro A** si tu registrador no admite CNAME en el dominio raíz (sin www), o si quieres que el dominio raíz también funcione.

Los cambios en el DNS pueden tardar desde unos minutos hasta unas horas en hacerse efectivos.

## Paso 2: Agrega el dominio en B1

Una vez que el DNS apunte a B1:

1. Ve a **Configuración** en B1 Admin.
2. Haz clic en **Dominios** en la lista del lado izquierdo y luego en **Editar** en la sección **Dominios**.
3. Escribe tu dominio en el campo y haz clic en **Guardar**.

No necesitas hacer clic primero en el botón **+**: un dominio que quede escrito en el campo se agrega al guardar. Usa **+** (o presiona **Enter**) cuando quieras agregar varios dominios a la lista antes de guardar.

B1 gestiona el SSL automáticamente; no necesitas comprar un certificado.

:::warning
Si agregas el dominio en B1 antes de que los registros DNS estén configurados, no se guardará. Configura siempre primero el DNS.
:::

## Comprobar que funciona

Después de guardar, visita tu dominio en un navegador. Si carga tu sitio de B1, ya terminaste. Si ves un error, es posible que el DNS aún se esté propagando: espera unos minutos y vuelve a intentarlo.

También puedes comprobar la propagación del DNS en [dnschecker.org](https://dnschecker.org): busca tu dominio y verifica que aparezca tu registro CNAME o A.
