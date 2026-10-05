---
title: "Dominio personalizado"
---

# Dominio personalizado

<div class="article-intro">

Puedes apuntar tu propio dominio (por ejemplo, **www.tuiglesia.org**) a tu sitio B1 para que los visitantes lo accedan en la dirección web real de tu iglesia en lugar de la dirección predeterminada tuiglesia.1.church.

</div>

## Paso 1 — Agregar el registro DNS primero

Antes de agregar tu dominio en B1, necesitas apuntarlo a los servidores de B1 en tu registrador de dominios (GoDaddy, Namecheap, Cloudflare, etc.).

Agrega uno de estos registros: CNAME es preferido:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `tuiglesia.org` | `3.23.251.61` |

Usa **CNAME** para tu dirección `www`. Usa el **registro A** si tu registrador no admite CNAME en un dominio raíz/apex (sin www), o si deseas que el dominio raíz también funcione.

Los cambios de DNS pueden tomar desde unos minutos hasta unas pocas horas para surtir efecto.

## Paso 2 — Agregar el dominio en B1

Una vez que DNS está apuntando a B1:

1. Ve a **Configuración** en B1 Admin.
2. Haz clic en **Dominios**.
3. Escribe tu dominio en el campo y haz clic en **Guardar**.

No necesitas hacer clic en el botón **+** primero: un dominio dejado escrito en el campo se agrega cuando guardas. Usa **+** (o presiona **Intro**) cuando desees agregar varios dominios a la lista antes de guardar.

B1 maneja SSL automáticamente: no es necesaria la compra de certificado.

:::warning
Si agregagas el dominio en B1 antes de que tus registros DNS estén en su lugar, no se guardará. Siempre configura DNS primero.
:::

## Verificar si está funcionando

Después de guardar, visita tu dominio en un navegador. Si carga tu sitio B1, está hecho. Si ves un error, DNS puede estar propagándose: espera unos minutos e intenta de nuevo.

También puedes verificar la propagación de DNS en [dnschecker.org](https://dnschecker.org): busca tu dominio y busca tu registro CNAME o A apareciendo.
