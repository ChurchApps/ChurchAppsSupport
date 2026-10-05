---
title: "Conectando a Provedores"
---

# Conectando a Provedores

<div class="article-intro">

Antes de poder navegar conteúdo de um provedor, você precisa se conectar a ele. Alguns provedores requerem autenticação através de um código QR ou login de email, enquanto outros podem ser conectados com um único clique.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale e inicie FreePlay -- veja [Primeiros Passos](../getting-started/)
- Tenha seu controle remoto de TV pronto para navegação
- Para provedores que requerem login, tenha suas credenciais de conta disponíveis

</div>

:::tip Configurando B1 Admin + FreePlay juntos?
Nosso **<a href="/guides/freeplay-b1admin" target="_blank">guia passo a passo</a>** percorre vinculando B1 Admin, agendando uma aula e conectando FreePlay — tudo em um lugar. Abra em uma nova aba para acompanhar.
:::

## Navegando Provedores Disponíveis

1. Abra **Settings** na parte inferior da barra lateral e selecione **Providers** para abrir a tela **Content Providers**
2. Você verá uma grade de cartões de provedor, cada um mostrando o logo e nome do provedor
3. Provedores conectados exibem um crachá verde **Connected** abaixo de seus nomes
4. Provedores que ainda não estão disponíveis mostram um label **Coming Soon**

## Conectando Sem Autenticação

Alguns provedores não requerem login. Quando você seleciona um destes provedores, FreePlay se conecta imediatamente e abre o navegador de conteúdo. Nenhuma credencial é necessária.

## Autenticação de Fluxo de Dispositivo (Código QR)

Certos provedores usam um fluxo de dispositivo, semelhante a como você entra em aplicativos de streaming em uma TV:

1. Selecione o cartão de provedor na tela **Content Providers**
2. FreePlay exibe um código QR e uma URL de verificação
3. Escaneie o código QR com seu telefone, ou visite a URL exibida em qualquer dispositivo
4. Insira o código do usuário mostrado na tela da TV
5. Complete o processo de sign-in em seu telefone ou computador
6. FreePlay detecta o login bem-sucedido e exibe **Connected!**
7. O navegador de conteúdo abre automaticamente

:::info
Um indicador pulsante **Waiting for authorization** mostra que FreePlay está verificando seu login. O código expira após vários minutos, então complete o processo prontamente.
:::

**Go Curriculum** usa este mesmo padrão de sign-in com código QR -- escaneie o código e faça login com sua conta gocurriculum.com para se conectar.

## Login de Formulário

Outros provedores usam um login tradicional de email e senha:

1. Selecione o cartão de provedor
2. Insira seu **Email** e **Password** usando o teclado na tela
3. Selecione o botão **Sign In**
4. Se suas credenciais estiverem corretas, FreePlay exibe **Connected!** e abre o navegador de conteúdo

:::tip
Use o direcional em seu controle remoto para mover entre o campo de email, campo de senha e botão de sign-in. Pressione **Select** em um campo de texto para abrir o teclado na tela.
:::

## Encontrando um Provedor em Sua Rede

**FreeShow** é encontrado em sua rede local em vez de através de um sign-in: FreePlay procura a rede, lista cada computador executando FreeShow que encontra e se conecta ao que você seleciona (escolha **Scan Again** se nenhum aparecer).

## Configurações do Provedor

Selecionar um cartão de provedor que mostra o crachá **Connected** abre sua tela **Provider Settings**:

- **Browse Library** -- Mostrar ou ocultar a biblioteca de conteúdo deste provedor na barra lateral
- **Auto-Download Today's Lesson** -- Use este provedor como a fonte da aula de hoje e pre-baixe seus arquivos (apenas mostrado para provedores que oferecem uma aula atual)
- **Use for Announcements** -- Escolha uma pasta deste provedor para fazer loop a partir do item **Announcements** na barra lateral. Veja [Announcements](./announcements)
- **Check for Announcement Updates** -- Mostrado uma vez que uma pasta de anúncios é escolhida; baixa novos slides e remove os deletados
- **Disconnect** -- Remover a conexão

## Desconectando um Provedor

Para desconectar de um provedor ao qual você já se conectou:

1. Vá para a tela **Content Providers** (**Settings** > **Providers**)
2. Selecione o cartão de provedor que mostra o crachá **Connected**
3. Na tela **Provider Settings**, selecione **Disconnect**

Após desconectar, o conteúdo do provedor não aparecerá mais em sua barra lateral. Se você estava usando uma de suas pastas para anúncios, esses slides também são removidos.

:::warning
Desconectar remove a autenticação salva de seu dispositivo. Você precisará fazer login novamente se quiser se reconectar mais tarde.
:::

## Artigos Relacionados

- **[Navegando e Baixando Conteúdo](./browsing-content)** - Navegue pastas e toque conteúdo após se conectar
- **[Anúncios](./announcements)** - Faça loop de uma pasta de slides de um provedor conectado
- **[Visão Geral de Provedores de Conteúdo](./index.md)** - Veja todos os provedores disponíveis
