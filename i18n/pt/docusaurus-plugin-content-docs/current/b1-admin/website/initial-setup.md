---
title: "Configuração Inicial"
---

# Configuração Inicial

<div class="article-intro">

Toda conta B1 já vem com um site pronto para usar. Este guia orienta você pela configuração do domínio da sua igreja, configuração da aparência do site, criação das primeiras páginas e organização da navegação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1.church com acesso administrativo
- Se estiver usando um domínio personalizado, tenha as credenciais de login do seu provedor de DNS prontas (ex.: GoDaddy, Cloudflare ou AWS)
- Prepare o logo da sua igreja em formato PNG com fundo transparente para melhores resultados

</div>

## Configurando Seu Domínio

Sua igreja recebe automaticamente um subdomínio no B1.church (por exemplo, `suaigreja.b1.church`). Você também pode apontar seu próprio domínio personalizado para o seu site B1.

1. Acesse o **B1.church Admin** visitando admin.b1.church ou clicando no menu suspenso do seu perfil e escolhendo **Trocar Aplicativo**.
2. Clique em **Painel** na barra lateral esquerda, depois selecione **Configurações** no menu suspenso.
3. Clique em **Gerenciar** para visualizar seu subdomínio. Defina-o como algo curto e reconhecível sem espaços.
4. Para usar um domínio personalizado, faça login no seu provedor de DNS (como GoDaddy, Cloudflare ou AWS) e adicione dois registros:
   - Um **registro A** para seu domínio raiz apontando para `3.23.251.61`
   - Um **registro CNAME** para `www` apontando para `proxy.b1.church`
5. Volte ao B1.church Admin, adicione seu domínio personalizado à lista e clique em **Adicionar** e depois **Salvar**. Seu site estará acessível pelo seu domínio personalizado em poucos minutos.

:::tip
Se você não vê a opção Configurações, peça à pessoa que configurou a conta da sua igreja para conceder a permissão "Editar Configurações da Igreja". Veja [Funções e Permissões](../settings/roles-permissions.md) para detalhes.
:::

## Criando Sua Primeira Página

1. No B1 Admin, clique em **Site** no menu esquerdo para abrir a visualização de Páginas do Site.
2. Clique em **Adicionar Página** no canto superior direito.
3. Escolha **Em Branco** como tipo de página e nomeie-a como "Início".
4. Clique em **Configurações da Página** e defina o caminho da URL como `/` (uma barra sem texto) para sua página inicial. Outras páginas usam `/nome-da-pagina`.
5. Clique em **Editar Conteúdo** para começar a construir. Toda página deve começar com uma **Seção** -- este é o container para todos os outros elementos.
6. Após adicionar uma seção, clique em **Adicionar Conteúdo** novamente para inserir texto, imagens, vídeos, cartões, formulários e mais, arrastando-os para dentro da sua seção.

:::info
Para instruções detalhadas sobre trabalhar com páginas, navegação e tipos de página, veja [Gerenciamento de Páginas](managing-pages).
:::

## Configurando a Aparência do Site

1. Na visualização de Páginas do Site, clique na aba **Aparência** no topo.
2. Use a **Paleta de Cores** para definir as cores da sua marca para tons primário, secundário e de destaque.
3. Em **Configurações de Tipografia**, escolha suas fontes para títulos e texto do corpo no navegador de fontes.
4. Envie o logo da sua igreja em **Logo** nas Configurações de Estilo. Forneça tanto a versão para fundo claro quanto para fundo escuro.
5. Configure o **Rodapé do Site** com as informações de contato e links da sua igreja.

:::info
As alterações que você faz na Aparência se aplicam em todo o seu site. Veja a página de [Aparência](appearance) para instruções detalhadas sobre cada configuração.
:::

## Configurando a Navegação

Seus links de navegação aparecem na barra lateral esquerda da visualização de Páginas do Site. Para organizá-los:

1. Clique em **Adicionar** para criar um novo link de navegação e aponte-o para uma das suas páginas.
2. Arraste e solte links para reordená-los ou aninhá-los sob itens pai.
3. Pré-visualize seu site para confirmar que a navegação está correta.

## Próximos Passos

- [Gerenciamento de Páginas](managing-pages) -- Aprenda como trabalhar com páginas e navegação em detalhes
- [Aparência](appearance) -- Ajuste as cores, fontes e layout do seu site
- [Arquivos](files) -- Envie imagens e documentos para o seu site
