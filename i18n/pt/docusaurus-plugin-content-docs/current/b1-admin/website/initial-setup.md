---
title: "Primeiros passos com o seu site no B1 Admin"
sidebar_label: "Configuração inicial"
description: "Configure o site da sua igreja no B1 Admin: aponte um subdomínio ou domínio próprio, crie a sua página inicial, escolha as cores e o logo da marca e monte a navegação."
---

# Configuração inicial

<div class="article-intro">

Cada conta B1 vem com um site pronto para uso. Este guia orienta você na configuração do domínio da sua igreja, na personalização da aparência do site, na criação das primeiras páginas e na organização da navegação.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta B1.church com acesso de administrador
- Se for usar um domínio próprio, tenha em mãos as credenciais de login do seu provedor de DNS (por exemplo, GoDaddy, Cloudflare ou AWS)
- Prepare o logo da sua igreja em formato PNG, com fundo transparente, para melhores resultados

</div>

## Configurando seu domínio {#setting-up-your-domain}

Sua igreja recebe automaticamente um subdomínio no B1.church (por exemplo, `yourchurch.b1.church`). Você também pode apontar o seu próprio domínio para o seu site B1.

1. Acesse o **B1.church Admin** visitando admin.b1.church ou clicando no menu do seu perfil e escolhendo **Trocar aplicativo**.
2. Abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
3. Abra a seção **Informações da igreja** para ver o seu subdomínio. Defina um nome curto e fácil de reconhecer, sem espaços.
4. Para usar um domínio próprio, entre no seu provedor de DNS (como GoDaddy, Cloudflare ou AWS) e adicione dois registros:
   - Um **registro A** para o seu domínio raiz apontando para `3.23.251.61`
   - Um **registro CNAME** para `www` apontando para `proxy.b1.church`
5. Volte ao B1.church Admin, abra a seção **Domínios** na mesma página de Configurações, adicione o seu domínio próprio à lista e clique em **Adicionar** e depois em **Salvar**. Seu site ficará acessível pelo seu domínio próprio em alguns minutos.

:::tip
Se você não vir a opção Configurações, peça à pessoa que configurou a conta da sua igreja para conceder a você a permissão "Editar configurações da igreja". Veja [Funções e permissões](../settings/roles-permissions.md) para detalhes.
:::

## Criando sua primeira página {#creating-your-first-page}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Site** e clique em **Páginas**.
2. Clique em **Adicionar página** no canto superior direito.
3. Escolha **Em branco** como tipo de página, digite "Início" como **Título da página** e clique em **Salvar**.
4. Clique em **Configurações da página** na linha da nova página e altere o **Caminho da URL** para `/` (uma barra, sem texto) para a sua página inicial. As demais páginas usam `/page-name`.
5. Clique em **Editar conteúdo** para começar a montar. Toda página deve começar com uma **Seção** -- ela é o contêiner de todos os outros elementos. Clique em **Adicionar conteúdo** e arraste **Seção** para a página, depois escolha um layout de seção pronto ou uma **Seção em branco**.
6. Depois de adicionar uma seção, clique novamente em **Adicionar conteúdo** para inserir textos, imagens, vídeos, cards, formulários e muito mais, arrastando-os para dentro da seção.

:::info
Para instruções detalhadas sobre como trabalhar com páginas e navegação, veja [Gerenciando páginas](./managing-pages.md). Para um guia completo do editor visual, veja [Usando o editor de páginas](./page-editor.md).
:::

## Configurando a aparência do site {#configuring-site-appearance}

1. No Menu de atalhos, escolha **Site > Aparência**.
2. Use a **Paleta de cores** para definir as cores da sua marca -- os tons base claro, de destaque e escuro, além das cores dos botões primário e secundário -- e depois clique em **Salvar paleta**.
3. Em **Fontes**, escolha as fontes de títulos e do corpo no seletor de fontes e clique em **Salvar fontes**.
4. Envie o logo da sua igreja em **Logo**, no painel Configurações de estilo. Forneça as versões para fundo claro e para fundo escuro, depois clique em **Salvar alterações**.
5. Clique em **Rodapé do site** para abrir o rodapé no editor de blocos e adicione as informações de contato e os links da sua igreja.

:::info
As alterações feitas em Aparência se aplicam a todo o seu site. Veja a página [Aparência](./appearance.md) para instruções detalhadas de cada configuração.
:::

## Configurando a navegação {#setting-up-navigation}

Os links de navegação aparecem na visualização de Páginas do site. Para organizá-los:

1. No painel **Navegação principal**, clique em **Adicionar**, digite o **Texto do link** e o caminho da página (por exemplo, `/about`) como **URL**, e clique em **Salvar**.
2. Arraste e solte os links para reordená-los ou aninhá-los sob itens principais.
3. Visualize o seu site para confirmar que a navegação está correta.

## Próximos passos {#next-steps}

- [Gerenciando páginas](./managing-pages.md) -- Aprenda a trabalhar com páginas e navegação em detalhes
- [Aparência](./appearance.md) -- Ajuste as cores, as fontes e o layout do seu site
- [Arquivos](./files.md) -- Envie imagens e documentos para o seu site
