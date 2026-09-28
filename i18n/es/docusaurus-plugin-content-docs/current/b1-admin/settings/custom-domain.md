---
title: "Dominio personalizado"
---

# Dominio personalizado

<div class="article-intro">

Puedes apuntar tu propio dominio (por ejemplo, **www.tuiglesia.org**) a tu sitio B1 para que los visitantes lo alcancen en la dirección web real de tu iglesia en lugar de la dirección predeterminada tuiglesia.1.church.

</div>

## Paso 1 - Agregar el registro DNS primero

Antes de agregar tu dominio en B1, necesitas apuntarlo a los servidores de B1 en tu registrador de dominio (GoDaddy, Namecheap, Cloudflare, etc.).

Agrega uno de estos registros: CNAME es preferido:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `tuiglesia.org` | `3.23.251.61` |

Usa el **CNAME** para tu dirección `www`. Usa el **registro A** si tu registrador no soporta CNAME en un dominio raíz/ápice (sin www), o si deseas que el dominio raíz también funcione.

Los cambios de DNS pueden tomar desde unos minutos hasta algunas horas para tomar efecto.

## Paso 2 - Agregar el dominio en B1

Una vez que DNS apunta a B1:

1. Ve a **Configuración** en B1 Admin.
2. Haz clic en **Dominios**.
3. Escribe tu dominio en el campo y haz clic en **Guardar**.

B1 maneja SSL automáticamente: no hay necesidad de comprar un certificado.

:::warning
Si agregas el dominio en B1 antes de que tus registros DNS estén en su lugar, no se guardará. Siempre configura DNS primero.
:::

## Verificar si está funcionando

Después de guardar, visita tu dominio en un navegador. Si carga tu sitio B1, está hecho. Si ves un error, DNS puede aún estar propagándose: espera unos minutos e intenta de nuevo.

También puedes verificar la propagación de DNS en [dnschecker.org](https://dnschecker.org): busca tu dominio y busca tu registro CNAME o A mostrándose.
