---
title: "Domínio Personalizado"
---

# Domínio Personalizado

<div class="article-intro">

Você pode apontar seu próprio domínio (por exemplo, **www.yourchurch.org**) para seu site B1 para que os visitantes o alcancem no endereço web real de sua igreja, em vez do endereço padrão yourchurch.1.church.

</div>

## Passo 1 — Adicione o Registro DNS Primeiro

Antes de adicionar seu domínio no B1, você precisa apontá-lo para os servidores B1 em seu registrador de domínio (GoDaddy, Namecheap, Cloudflare, etc.).

Adicione um desses registros -- CNAME é preferido:

| Type (Tipo) | Host | Value (Valor) |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Use o **CNAME** para seu endereço `www`. Use o **registro A** se seu registrador não suportar CNAME em um domínio raiz/apex (sem www), ou se você quiser que o domínio raiz também funcione.

As alterações de DNS podem levar alguns minutos a algumas horas para entrar em vigor.

## Passo 2 — Adicione o Domínio no B1

Depois que o DNS aponta para o B1:

1. Vá para **Settings** (Configurações) no B1 Admin.
2. Clique em **Domains** (Domínios).
3. Digite seu domínio no campo e clique em **Save** (Salvar).

Você não precisa clicar no botão **+** primeiro -- um domínio deixado digitado no campo é adicionado quando você salva. Use **+** (ou pressione **Enter**) quando você deseja adicionar vários domínios à lista antes de salvar.

O B1 trata SSL automaticamente -- nenhuma compra de certificado necessária.

:::warning
Se você adicionar o domínio no B1 antes que seus registros de DNS estejam em vigor, ele não será salvo. Sempre configure o DNS primeiro.
:::

## Verificando se está Funcionando

Depois de salvar, visite seu domínio em um navegador. Se ele carregar seu site B1, você terminou. Se você vir um erro, o DNS ainda pode estar se propagando -- aguarde alguns minutos e tente novamente.

Você também pode verificar a propagação de DNS em [dnschecker.org](https://dnschecker.org) -- procure seu domínio e procure seu registro CNAME ou A aparecendo.
