---
title: "Domínio Personalizado"
---

# Domínio Personalizado

<div class="article-intro">

Você pode apontar seu próprio domínio (por exemplo, **www.suaigreja.org**) para seu site B1 para que visitantes o acessem no endereço da web real de sua igreja em vez do endereço padrão suaigreja.1.church.

</div>

## Etapa 1 — Adicione o Registro DNS Primeiro

Antes de adicionar seu domínio no B1, você precisa apontá-lo para os servidores B1 no seu registrador de domínios (GoDaddy, Namecheap, Cloudflare, etc.).

Adicione um desses registros -- CNAME é preferido:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `suaigreja.org` | `3.23.251.61` |

Use o **CNAME** para seu endereço `www`. Use o **Registro A** se seu registrador não suportar CNAME em um domínio raiz/apex (sem www) ou se você quiser que o domínio raiz também funcione.

As alterações de DNS podem levar alguns minutos a algumas horas para entrar em vigor.

## Etapa 2 — Adicione o Domínio no B1

Assim que o DNS estiver apontando para o B1:

1. Vá para **Configurações** no B1 Admin.
2. Clique em **Domínios**.
3. Digite seu domínio no campo e clique em **Salvar**.

O B1 lida com SSL automaticamente -- nenhuma compra de certificado é necessária.

:::warning
Se você adicionar o domínio no B1 antes de seus registros DNS estarem no lugar, ele não salvará. Sempre configure DNS primeiro.
:::

## Verificando Se Está Funcionando

Após salvar, visite seu domínio em um navegador. Se ele carregar seu site B1, você está pronto. Se você vê um erro, o DNS ainda pode estar propagando -- aguarde alguns minutos e tente novamente.

Você também pode verificar a propagação DNS em [dnschecker.org](https://dnschecker.org) -- procure por seu domínio e procure seu registro CNAME ou A aparecendo.
