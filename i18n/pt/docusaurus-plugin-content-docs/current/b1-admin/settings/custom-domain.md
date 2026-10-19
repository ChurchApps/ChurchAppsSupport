---
title: "Domínio personalizado"
---

# Domínio personalizado

<div class="article-intro">

Você pode apontar o seu próprio domínio (por exemplo, **www.suaigreja.org**) para o seu site do B1, para que os visitantes acessem o endereço web real da sua igreja, em vez do endereço padrão suaigreja.b1.church.

</div>

## Passo 1 — Adicione primeiro o registro DNS

Antes de adicionar seu domínio no B1, você precisa apontá-lo para os servidores do B1 no seu registrador de domínios (GoDaddy, Namecheap, Cloudflare etc.).

Adicione um destes registros -- o CNAME é o preferido:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `suaigreja.org` | `3.23.251.61` |

Use o **CNAME** para o seu endereço `www`. Use o **registro A** se o seu registrador não oferecer suporte a CNAME no domínio raiz (sem www), ou se você quiser que o domínio raiz também funcione.

As alterações de DNS podem levar de alguns minutos a algumas horas para ter efeito.

## Passo 2 — Adicione o domínio no B1

Quando o DNS estiver apontando para o B1:

1. Vá em **Configurações** no B1 Admin.
2. Clique em **Domínios** na lista à esquerda e depois em **Editar** na seção **Domínios**.
3. Digite o seu domínio no campo e clique em **Salvar**.

Você não precisa clicar primeiro no botão **+** -- um domínio deixado digitado no campo é adicionado quando você salva. Use o **+** (ou pressione **Enter**) quando quiser adicionar vários domínios à lista antes de salvar.

O B1 cuida do SSL automaticamente -- não é necessário comprar certificado.

:::warning
Se você adicionar o domínio no B1 antes de os registros DNS estarem configurados, ele não será salvo. Configure sempre o DNS primeiro.
:::

## Verificando se está funcionando

Depois de salvar, acesse o seu domínio em um navegador. Se ele carregar o seu site do B1, está tudo pronto. Se aparecer um erro, o DNS pode ainda estar se propagando -- aguarde alguns minutos e tente novamente.

Você também pode verificar a propagação do DNS em [dnschecker.org](https://dnschecker.org) -- pesquise o seu domínio e procure o seu registro CNAME ou A aparecendo.
