---
title: "Configuração Inicial"
---

# Configuração Inicial

<div class="article-intro">

Toda conta B1 vem com um website pronto. Este guia o orienta através da configuração do seu domínio de igreja, configuração da aparência de seu site, criação de suas primeiras páginas e organização de sua navegação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1.church com acesso administrativo
- Se usar um domínio personalizado, tenha suas credenciais de login do provedor de DNS prontas (por exemplo, GoDaddy, Cloudflare ou AWS)
- Prepare seu logotipo da igreja em formato PNG com fundo transparente para melhores resultados

</div>

## Configurando seu Domínio

Sua igreja recebe automaticamente um subdomínio em B1.church (por exemplo, `suaigreja.b1.church`). Você também pode apontar seu próprio domínio personalizado para seu site B1.

1. Vá para **B1.church Admin** visitando admin.b1.church ou clicando no menu dropdown de seu perfil e escolhendo **Trocar Aplicativo**.
2. Abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Configurações**.
3. Clique em **Gerenciar** para visualizar seu subdomínio. Defina-o como algo curto e reconhecível sem espaços.
4. Para usar um domínio personalizado, faça login em seu provedor de DNS (como GoDaddy, Cloudflare ou AWS) e adicione dois registros:
   - Um **registro A** para seu domínio raiz apontando para `3.23.251.61`
   - Um **registro CNAME** para `www` apontando para `proxy.b1.church`
5. Retorne ao B1.church Admin, adicione seu domínio personalizado à lista e clique em **Adicionar** depois em **Salvar**. Seu site estará acessível a partir de seu domínio personalizado em alguns minutos.

:::tip
Se você não vir a opção Configurações, peça à pessoa que configurou sua conta de igreja para conceder a permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](../settings/roles-permissions.md) para detalhes.
:::

## Criando sua Primeira Página

1. Em B1 Admin, clique em **Website** no menu esquerdo para abrir a visualização de Páginas de Website.
2. Clique em **Adicionar Página** no canto superior direito.
3. Escolha **Em Branco** como tipo de página e nomeie como "Home".
4. Clique em **Configurações de Página** e defina o caminho de URL como `/` (uma barra com nenhum texto) para sua página inicial. Outras páginas usam `/nome-pagina`.
5. Clique em **Editar Conteúdo** para começar a construir. Cada página deve começar com uma **Seção** -- este é o contêiner para todos os outros elementos.
6. Depois de adicionar uma seção, clique em **Adicionar Conteúdo** novamente para inserir texto, imagens, vídeos, cartões, formulários e muito mais arrastando-os para sua seção.

:::info
Para instruções detalhadas sobre como trabalhar com páginas e navegação, consulte [Gerenciando Páginas](managing-pages). Para um guia completo do editor visual, consulte [Usando o Editor de Página](page-editor).
:::

## Configurando a Aparência do Site

1. Na visualização de Páginas de Website, clique na aba **Aparência** no topo.
2. Use a **Paleta de Cores** para definir suas cores de marca para tons primário, secundário e de destaque.
3. Em **Configurações de Tipografia**, escolha suas fontes de cabeçalho e corpo do navegador de fontes.
4. Carregue seu logotipo de igreja em **Logotipo** nas Configurações de Estilo. Fornece ambas as versões de fundo claro e escuro.
5. Configure seu **Rodapé do Site** com as informações de contato e links de sua igreja.

:::info
As mudanças que você faz em Aparência se aplicam em todo seu website. Consulte a página [Aparência](appearance) para instruções detalhadas sobre cada configuração.
:::

## Configurando Navegação

Seus links de navegação aparecem na visualização de Páginas de Website. Para organizá-los:

1. Clique em **Adicionar** para criar um novo link de navegação e aponte-o para uma de suas páginas.
2. Arraste e solte links para reorganizá-los ou ninhá-los sob itens principais.
3. Visualize seu site para confirmar se a navegação parece correta.

## Próximas Etapas

- [Gerenciando Páginas](managing-pages) -- Aprenda como trabalhar com páginas e navegação em detalhes
- [Aparência](appearance) -- Ajuste bem suas cores, fontes e layout do site
- [Arquivos](files) -- Carregue imagens e documentos para seu website
