---
title: "Configuração Inicial"
---

# Configuração Inicial

<div class="article-intro">

Toda conta B1 vem com um site pronto para usar. Este guia o orienta através da configuração do seu domínio de igreja, configurando a aparência do seu site, criando suas primeiras páginas e organizando sua navegação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1.church com acesso administrativo
- Se usar um domínio personalizado, tenha credenciais de login de seu provedor DNS prontas (por exemplo, GoDaddy, Cloudflare ou AWS)
- Prepare sua logo da igreja em formato PNG com fundo transparente para melhores resultados

</div>

## Configurando Seu Domínio

Sua igreja recebe automaticamente um subdomínio em B1.church (por exemplo, `yourchurch.b1.church`). Você também pode apontar seu próprio domínio personalizado para seu site B1.

1. Vá para **B1.church Admin** visitando admin.b1.church ou clicando em seu menu de perfil e escolhendo **Switch App**.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Settings**, e clique em **Settings**.
3. Abra a seção **Church Information** para visualizar seu subdomínio. Defina como algo curto e reconhecível sem espaços.
4. Para usar um domínio personalizado, faça login em seu provedor DNS (como GoDaddy, Cloudflare ou AWS) e adicione dois registros:
   - Um **A record** para seu domínio raiz apontando para `3.23.251.61`
   - Um **CNAME record** para `www` apontando para `proxy.b1.church`
5. Retorne ao B1.church Admin, adicione seu domínio personalizado à lista e clique em **Add** depois **Save**. Seu site será acessível a partir de seu domínio personalizado em alguns minutos.

:::tip
Se você não vir a opção Settings, peça à pessoa que configurou sua conta de igreja para conceder a você a permissão "Edit Church Settings". Consulte [Roles & Permissions](../settings/roles-permissions.md) para detalhes.
:::

## Criando Sua Primeira Página

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Website**, e clique em **Pages**.
2. Clique em **Add Page** no canto superior direito.
3. Escolha **Blank** como o tipo de página e nomeie como "Home".
4. Clique em **Page Settings** e defina o caminho da URL como `/` (uma barra invertida sem texto) para sua página inicial. Outras páginas usam `/page-name`.
5. Clique em **Edit Content** para começar a construir. Toda página deve começar com uma **Section** -- este é o contêiner para todos os outros elementos.
6. Após adicionar uma seção, clique em **Add Content** novamente para inserir texto, imagens, vídeos, cartões, formulários e muito mais arrastando-os para sua seção.

:::info
Para instruções detalhadas sobre como trabalhar com páginas e navegação, consulte [Managing Pages](managing-pages). Para um guia completo do editor visual, consulte [Using the Page Editor](page-editor).
:::

## Configurando Aparência do Site

1. No menu Jump, escolha **Website > Appearance**.
2. Use a **Color Palette** para definir suas cores de marca para tons primário, secundário e destaque.
3. Em **Typography Settings**, escolha suas fontes de título e corpo no navegador de fontes.
4. Envie sua logo da igreja em **Logo** nas Configurações de Estilo. Forneça versões de fundo claro e fundo escuro.
5. Configure seu **Site Footer** com informações de contato e links de sua igreja.

:::info
As mudanças que você faz em Aparência se aplicam em todo o seu site. Consulte a página [Appearance](appearance) para instruções detalhadas em cada configuração.
:::

## Configurando Navegação

Seus links de navegação aparecem na visualização Website Pages. Para organizá-los:

1. Clique em **Add** para criar um novo link de navegação e apontá-lo para uma de suas páginas.
2. Arraste e solte links para reordená-los ou aninhá-los sob itens pai.
3. Visualize seu site para confirmar que a navegação está correta.

## Próximas Etapas

- [Managing Pages](managing-pages) -- Saiba como trabalhar com páginas e navegação em detalhes
- [Appearance](appearance) -- Refine as cores, fontes e layout do seu site
- [Files](files) -- Envie imagens e documentos para seu site
