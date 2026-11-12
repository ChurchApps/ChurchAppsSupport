---
title: "Guia: Lance o Site da Sua Igreja"
description: "Configure um site de igreja no B1 Admin: monte a página inicial, combine as cores e o logotipo, adicione as páginas principais, conecte um domínio próprio e inclua formulários de doação."
---

# Lance o Site da Sua Igreja

<div class="article-intro">

O B1.church inclui um criador de sites completo, sem custo adicional. Este guia orienta você na criação do site da sua igreja do zero -- configurando a página inicial, definindo a aparência, adicionando as páginas principais e, opcionalmente, conectando formulários de doação online e de inscrição em eventos.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="aA4UahZpmXg" title="Lançando o Site da Sua Igreja no B1" next="Editando Páginas e Navegação no B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Tenha o logotipo da sua igreja em mãos (PNG com fundo transparente funciona melhor)
- Escolha de 2 a 3 cores da sua identidade visual para o site
- Se for usar um domínio próprio (por exemplo, yourchurch.com), tenha acesso ao seu provedor de DNS (GoDaddy, Cloudflare etc.)
- Se quiser doações online no seu site, conclua antes a [Configuração de Doações Online](../donations/online-giving-setup.md) (Stripe)

</div>

## Passo 1: Configuração Inicial do Site {#step-1-initial-website-setup}

Comece criando a sua página inicial e a estrutura básica do site.

Siga o guia [Configuração Inicial do Site](../website/initial-setup.md) para:

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Site > Páginas**
2. Clique em **Adicionar Página**, escolha **Em branco**, informe "Início" como **Título da Página** e clique em **Salvar**. Em **Configurações da página**, defina o **Caminho da URL** como `/`
3. Clique em **Editar conteúdo**, adicione uma **Seção** e, em seguida, inclua o seu destaque principal, a mensagem de boas-vindas, o nome e o slogan da igreja e outras informações importantes

:::tip
Começando do zero? Um [Modelo de site](../website/managing-pages.md#starting-from-a-site-template) cria um conjunto de páginas prontas (início, sobre, conecte-se, contribua e outras), com os links de navegação já configurados -- basta substituir o conteúdo de exemplo pelo seu.
:::

## Passo 2: Configure a Aparência {#step-2-configure-appearance}

Defina a identidade visual do seu site -- cores, fontes, logotipo e rodapé.

Siga o guia [Aparência](../website/appearance.md) para:

1. No menu Jump, escolha **Site > Aparência**
2. Em **Logotipo**, envie um **Logotipo para Fundo Claro** e um **Logotipo para Fundo Escuro**
3. Em **Paleta de cores**, defina as cores da sua marca e clique em **Salvar paleta** e, em seguida, escolha as suas **Fontes**
4. Use **Navegação** para estilizar a barra de navegação e **Rodapé do site** para montar o rodapé que aparece em todas as páginas

:::tip
Mantenha a paleta de cores simples -- uma cor principal e uma cor de destaque costumam bastar. O criador de sites cuida do restante.
:::

## Passo 3: Adicione as Páginas de Conteúdo {#step-3-add-content-pages}

Crie as páginas de que os seus visitantes mais precisam.

Siga o guia [Gerenciando Páginas](../website/managing-pages.md) para criar páginas como:

- **Sobre** — A história da sua igreja, as suas crenças e a liderança
- **Pregações** — Um link para a sua [biblioteca de pregações](../sermons/managing-sermons.md)
- **Eventos** — Próximos eventos e inscrições
- **Contribua** — Página de doações online (requer a [configuração do Stripe](../donations/online-giving-setup.md))
- **Contato** — Localização, horários de culto e informações de contato

## Passo 4: Conecte o Seu Domínio {#step-4-connect-your-domain}

Se você quiser usar o seu próprio nome de domínio (como yourchurch.com) em vez do endereço padrão do B1:

Siga o guia [Domínio Próprio](../settings/custom-domain.md) para:

1. No seu provedor de domínio, adicione um registro **CNAME** para `www` apontando para `proxy.b1.church` (ou um registro **A** para o seu domínio principal apontando para `3.23.251.61`)
2. No menu Jump, escolha **Configurações > Configurações**, clique em **Editar** na seção **Domínios**, digite o seu domínio e clique em **Salvar**

:::info
Configure o DNS primeiro: o B1 salva o domínio imediatamente, mas não carrega o seu site (nem obtém o certificado SSL) até que o DNS aponte para o B1. As alterações de DNS podem levar de alguns minutos a algumas horas. O endereço padrão do B1 continua funcionando o tempo todo.
:::

## Passo 5: Adicione Doações e Formulários {#step-5-add-giving-and-forms}

Enriqueça o seu site com elementos interativos:

- **Doações online** — Adicione um elemento **Doação** para que os membros possam contribuir diretamente pelo seu site. Veja [Configuração de Doações Online](../donations/online-giving-setup.md) para configurar o Stripe primeiro.
- **Formulários de inscrição** — Incorpore [formulários Independentes](../forms/creating-forms.md) para inscrições em eventos, cartões de visitante ou inscrições de voluntários com o elemento **Formulário**. Veja o [Editor de Páginas](../website/page-editor.md) para saber como adicionar elementos a qualquer página.

## Pronto! {#youre-done}

O site da sua igreja está no ar. Compartilhe o endereço com a sua congregação e nas redes sociais. Você pode atualizar o conteúdo, adicionar novas páginas e ajustar a aparência a qualquer momento pela seção **Site** do B1 Admin.

## Artigos Relacionados {#related-articles}

- [Configuração Inicial do Site](../website/initial-setup.md) — passo a passo detalhado da configuração
- [Gerenciando Páginas](../website/managing-pages.md) — adicione e edite páginas
- [Aparência](../website/appearance.md) — cores, logotipo e layout
- [Editor de Páginas](../website/page-editor.md) — adicione seções, textos, imagens, formulários e doações
- [Domínio Próprio](../settings/custom-domain.md) — use o seu próprio endereço na web
- [Gerenciando Arquivos](../website/files.md) — envie imagens e documentos
- [Configuração de Doações Online](../donations/online-giving-setup.md) — configure o Stripe
- [Criando Formulários](../forms/creating-forms.md) — crie formulários de inscrição e pesquisa
