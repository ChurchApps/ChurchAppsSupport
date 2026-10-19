---
title: "Conectando-se aos provedores"
---

# Conectando-se aos provedores

<div class="article-intro">

Antes de navegar pelo conteúdo de um provedor, você precisa se conectar a ele. Alguns provedores exigem autenticação por QR code ou login por e-mail, enquanto outros podem ser conectados com um único clique.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale e abra o FreePlay -- veja [Primeiros passos](../getting-started/)
- Tenha o controle remoto da TV pronto para navegar
- Para provedores que exigem login, tenha as credenciais da sua conta em mãos

</div>

:::tip Configurando o B1 Admin + FreePlay juntos?
Nosso **<a href="/guides/freeplay-b1admin" target="_blank">guia passo a passo</a>** mostra como vincular o B1 Admin, agendar uma lição e conectar o FreePlay -- tudo em um só lugar. Abra-o em uma nova aba para acompanhar.
:::

## Navegando pelos provedores disponíveis

1. Abra **Configurações** na parte inferior da barra lateral e selecione **Provedores** para abrir a tela **Provedores de conteúdo**
2. Você verá uma grade de cartões de provedores, cada um mostrando o logo e o nome do provedor
3. Provedores conectados exibem um selo verde **Conectado** abaixo do nome
4. Provedores que ainda não estão disponíveis mostram o rótulo **Em breve**

## Conectando sem autenticação

Alguns provedores não exigem login. Ao selecionar um deles, o FreePlay se conecta imediatamente e abre o navegador de conteúdo. Não são necessárias credenciais.

## Autenticação por fluxo de dispositivo (QR code)

Certos provedores usam um fluxo de dispositivo, semelhante à forma como você entra em aplicativos de streaming em uma TV:

1. Selecione o cartão do provedor na tela **Provedores de conteúdo**
2. O FreePlay mostra uma tela **Conectar a** com o nome do provedor, um QR code e uma URL de verificação
3. Leia o QR code com o seu celular ou acesse a URL exibida em qualquer dispositivo
4. Digite o código mostrado na tela da TV
5. Conclua o login no seu celular ou computador
6. O FreePlay detecta o login bem-sucedido e exibe **Conectado!**
7. O navegador de conteúdo abre automaticamente

:::info
Um indicador pulsante **Aguardando confirmação** mostra que o FreePlay está verificando o seu login. A tela mostra quantos minutos restam antes que o código expire, então conclua o processo rapidamente. Selecione **Gerar novo código** se ele expirar.
:::

## Login pelo celular (somente QR code)

**Dropbox**, **OneDrive** e **Go Curriculum** usam um login por QR code um pouco diferente, sem nenhum código para digitar:

1. Selecione o cartão do provedor na tela **Provedores de conteúdo**
2. O FreePlay mostra uma tela **Conectar a** com o nome do provedor e um QR code
3. Leia o QR code com o seu celular e entre na sua conta desse provedor (sua conta Microsoft para o OneDrive, ou sua conta gocurriculum.com para o Go Curriculum)
4. Aprove o acesso. A TV se conecta automaticamente e exibe **Conectado!**

A tela mostra quantos minutos você tem para concluir o login.

## Login com formulário

Outros provedores usam o login tradicional com e-mail e senha:

1. Selecione o cartão do provedor
2. Digite seu **E-mail** e **Senha** usando o teclado na tela
3. Selecione o botão **Entrar**
4. Se suas credenciais estiverem corretas, o FreePlay exibe **Conectado!** e abre o navegador de conteúdo

:::tip
Use o direcional do controle remoto para mover-se entre o campo de e-mail, o campo de senha e o botão de entrar. Pressione **Selecionar** em um campo de texto para abrir o teclado na tela.
:::

## Configurações do provedor

Selecionar um cartão de provedor que exibe o selo **Conectado** abre a tela **Configurações do provedor**:

- **Navegar pela biblioteca** -- Mostra ou oculta a biblioteca de conteúdo deste provedor na barra lateral
- **Baixar automaticamente a lição de hoje** -- Usa este provedor como fonte da lição de hoje e pré-baixa os arquivos dele (exibido somente para provedores que oferecem uma lição atual)
- **Usar para avisos** -- Escolha uma pasta deste provedor para exibir em loop a partir do item **Avisos** na barra lateral. Veja [Avisos](./announcements)
- **Verificar atualizações de avisos** -- Exibido assim que uma pasta de avisos é escolhida; baixa os novos slides e remove os excluídos
- **Desconectar** -- Remove a conexão

## Desconectando um provedor

Para desconectar um provedor ao qual você já se conectou:

1. Vá até a tela **Provedores de conteúdo** (**Configurações** > **Provedores**)
2. Selecione o cartão do provedor que exibe o selo **Conectado**
3. Na tela **Configurações do provedor**, selecione **Desconectar**

Depois de desconectar, o conteúdo do provedor não aparece mais na sua barra lateral. Se você estava usando uma das pastas dele para avisos, esses slides também são removidos.

:::warning
Desconectar remove a autenticação salva no seu dispositivo. Você precisará entrar novamente se quiser se reconectar depois.
:::

## Artigos relacionados

- **[Navegando e baixando conteúdo](./browsing-content)** - Navegue pelas pastas e reproduza o conteúdo depois de se conectar
- **[Avisos](./announcements)** - Exiba em loop uma pasta de slides de um provedor conectado
- **[Visão geral dos provedores de conteúdo](./index.md)** - Veja todos os provedores disponíveis
