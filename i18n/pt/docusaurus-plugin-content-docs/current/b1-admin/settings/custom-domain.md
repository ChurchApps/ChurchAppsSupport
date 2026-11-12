---
title: "Domínio personalizado"
description: "Aponte seu próprio domínio, como www.yourchurch.org, para o seu site B1 no B1 Admin, configurando os registros DNS e adicionando o domínio em Configurações."
---

# Domínio personalizado

<div class="article-intro">

Você pode apontar seu próprio domínio (por exemplo, **`www.yourchurch.org`**) para o seu site B1, para que os visitantes acessem o endereço web real da sua igreja, em vez do endereço padrão yourchurch.b1.church.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="L5yaDusHts8" title="Conectando um domínio personalizado no B1" next="Configurando a transmissão ao vivo no B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Etapa 1 — Adicione primeiro o registro DNS {#step-1--add-the-dns-record-first}

Antes de adicionar seu domínio no B1, você precisa apontá-lo para os servidores do B1 no seu registrador de domínios (GoDaddy, Namecheap, Cloudflare etc.).

Adicione um destes registros — o CNAME é o preferido:

| Tipo | Host | Valor |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Use o **CNAME** para o seu endereço `www`. Use o **registro A** se o seu registrador não suportar CNAME no domínio raiz (sem www), ou se você quiser que o domínio raiz também funcione.

As alterações de DNS podem levar de alguns minutos a algumas horas para surtir efeito.

## Etapa 2 — Adicione o domínio no B1 {#step-2--add-the-domain-in-b1}

Depois que o DNS estiver apontando para o B1:

1. Acesse **Configurações** no B1 Admin.
2. Clique em **Domínios** na lista à esquerda e depois em **Editar** na seção **Domínios**.
3. Digite o seu domínio no campo e clique em **Salvar**.

Você não precisa clicar primeiro no botão **+** — um domínio digitado no campo é adicionado quando você salva. Use **+** (ou pressione **Enter**) quando quiser adicionar vários domínios à lista antes de salvar. Digite apenas o domínio, como `www.yourchurch.org` — não `https://` nem um caminho de página.

Se a sua igreja tiver mais de um site, cada domínio também ganha uma lista suspensa **Site**. Deixe em **Site principal**, ou escolha o site que esse domínio deve abrir.

Para remover um domínio, clique no ícone de excluir na linha dele e clique em **Salvar**.

O B1 cuida do SSL automaticamente — não é preciso comprar certificado.

:::warning
O B1 salva o domínio mesmo que os registros DNS ainda não estejam configurados, mas o domínio não carregará o seu site, e o B1 não consegue emitir o certificado SSL, até que o DNS aponte para o B1. Configure o DNS primeiro. Um domínio que outra igreja já usa não pode ser adicionado.
:::

## Verificando se está funcionando {#checking-if-its-working}

Depois de salvar, acesse o seu domínio em um navegador. Se ele carregar o seu site B1, está tudo pronto. Se aparecer um erro, o DNS pode ainda estar se propagando — aguarde alguns minutos e tente novamente.

Você também pode verificar a propagação do DNS em [dnschecker.org](https://dnschecker.org) — pesquise o seu domínio e confira se o seu registro CNAME ou A aparece.
