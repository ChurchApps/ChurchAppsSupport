---
title: "Configuração Inicial"
---

# Configuração Inicial

<div class="article-intro">

Cada conta B1 vem com um site pronto para usar. Este guia o orienta através da configuração de seu domínio de igreja, configuração da aparência de seu site, criação de suas primeiras páginas e organização de sua navegação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1.church com acesso administrativo
- Se usar um domínio personalizado, tenha credenciais de login de seu provedor de DNS pronto (por exemplo, GoDaddy, Cloudflare ou AWS)
- Prepare seu logotipo da igreja em formato PNG com fundo transparente para melhores resultados

</div>

## Configurando Seu Domínio

Sua igreja recebe automaticamente um subdomínio em B1.church (por exemplo, `suaigreja.b1.church`). Você também pode apontar seu próprio domínio personalizado para seu site B1.

1. Vá para **B1.church Admin** visitando admin.b1.church ou clicando no seu menu suspenso de perfil e escolhendo **Trocar App**.
2. Abra o **menu de seção** no canto superior esquerdo (nome da seção com a pequena seta) e escolha **Configurações**.
3. Abra a seção **Informações da Igreja** para visualizar seu subdomínio. Configure-o para algo curto e reconhecível sem espaços.
4. Para usar um domínio personalizado, faça login em seu provedor de DNS (como GoDaddy, Cloudflare ou AWS) e adicione dois registros:
   - Um **Registro A** para seu domínio raiz apontando para `3.23.251.61`
   - Um **Registro CNAME** para `www` apontando para `proxy.b1.church`
5. Volte para B1.church Admin, adicione seu domínio personalizado à lista e clique em **Adicionar** depois em **Salvar**. Seu site será acessível de seu domínio personalizado em alguns minutos.

:::tip
Se você não vir a opção Configurações, peça à pessoa que configurou sua conta de igreja que lhe conceda a permissão "Editar Configurações da Igreja". Veja [Funções e Permissões](../settings/roles-permissions.md) para detalhes.
:::

## Criando Sua Primeira Página

1. No B1 Admin, clique em **Site** no menu esquerdo para abrir a visualização de Páginas do Site.
2. Clique em **Adicionar Página** no canto superior direito.
3. Escolha **Em Branco** como o tipo de página e nomeie-a "Página Inicial".
4. Clique em **Configurações da Página** e defina o caminho de URL para `/` (uma barra para frente sem texto) para sua página inicial. Outras páginas usam `/nome-da-página`.
5. Clique em **Editar Conteúdo** para começar a construir. Cada página deve começar com uma **Seção** -- este é o contêiner para todos os outros elementos.
6. Depois de adicionar uma seção, clique em **Adicionar Conteúdo** novamente para inserir texto, imagens, vídeos, cartões, formulários e mais arrastando-os para sua seção.

:::info
Para instruções detalhadas sobre trabalhar com páginas e navegação, veja [Gerenciando Páginas](managing-pages). Para um guia completo do editor visual, veja [Usando o Editor de Página](page-editor).
:::

## Configurando a Aparência do Site

1. Da visualização de Páginas do Site, clique na aba **Aparência** no topo.
2. Use a **Paleta de Cores** para definir suas cores de marca para tons primários, secundários e de destaque.
3. Em **Configurações de Tipografia**, escolha suas fontes de título e corpo do navegador de fontes.
4. Faça o upload de seu logotipo da igreja em **Logotipo** nas Configurações de Estilo. Forneça uma versão de fundo claro e uma versão de fundo escuro.
5. Configure o **Rodapé do Site** com as informações de contato e links de sua igreja.

:::info
As alterações que você faz em Aparência se aplicam em todo o seu site. Veja a página [Aparência](appearance) para instruções detalhadas sobre cada configuração.
:::

## Configurando Navegação

Seus links de navegação aparecem na visualização de Páginas do Site. Para organizá-los:

1. Clique em **Adicionar** para criar um novo link de navegação e apontá-lo para uma de suas páginas.
2. Arraste e solte links para reordená-los ou aninhá-los em itens pai.
3. Visualize seu site para confirmar que a navegação se parece correta.

## Próximas Etapas

- [Gerenciando Páginas](managing-pages) -- Aprenda como trabalhar com páginas e navegação em detalhes
- [Aparência](appearance) -- Ajuste fino das cores, fontes e layout do seu site
- [Arquivos](files) -- Faça o upload de imagens e documentos para seu site
