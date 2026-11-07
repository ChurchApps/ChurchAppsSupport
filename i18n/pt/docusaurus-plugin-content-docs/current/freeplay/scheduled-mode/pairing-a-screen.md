---
title: "Parceando uma tela"
description: "Pareie uma TV FreePlay a um calendário de grupo de telas no FreePlay Admin com o código de quatro letras exibido na TV, para reprodução automática."
---

# Parceando uma tela

<div class="article-intro">

Para colocar uma TV em um calendário, faça o pareamento dela com o **FreePlay Admin**. A TV mostra um código de quatro letras. Você digita esse código em [admin.freeplay.church](https://admin.freeplay.church) e escolhe o grupo de telas cujo calendário ela deve seguir. Você só precisa fazer isso uma vez por TV.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale e abra o FreePlay na TV. Veja [Primeiros passos](../getting-started/index.md)
- Tenha um login do ChurchApps para a sua igreja, para entrar no FreePlay Admin
- Opcionalmente, [monte uma lista de reprodução](./building-playlists.md) e [agende-a](./scheduling-the-calendar.md) antes, para que a TV já tenha algo para reproduzir

</div>

## Mostrando o código na TV

1. Na TV, abra **Configurações** na parte inferior da barra lateral.
2. Selecione **Parear com um calendário**. A linha mostra **Não pareada** quando a TV ainda não está pareada.
3. A tela **Parear esta tela** mostra um QR code e um código de pareamento de quatro letras, com a mensagem **Escaneie com o seu celular, ou acesse freeplay.church/pair e digite este código**.
4. Abaixo do código, **Aguardando confirmação** pulsa enquanto o FreePlay espera você concluir o pareamento.

O código vale por 15 minutos, e uma contagem regressiva abaixo dele mostra quanto tempo resta. Quando o tempo acaba, o FreePlay mostra um novo código sozinho. Você também pode selecionar **Gerar novo código** para obter outro, ou **Cancelar** para voltar às Configurações.

## Parceando no FreePlay Admin

1. Escaneie o QR code com o seu celular, ou acesse **freeplay.church/pair** em qualquer computador ou celular. Entre se for solicitado. O FreePlay Admin abre o formulário **Parear tela** com o código já preenchido.
   - Você também pode abrir o formulário por conta própria. Acesse **Telas** no FreePlay Admin e clique em **Parear tela**.
2. Confira o **Código de pareamento**. São as quatro letras que aparecem na TV.
3. Digite um **Rótulo** para distinguir esta TV das outras, por exemplo "Entrada esquerda". É opcional.
4. Em **Grupo**, escolha o grupo de telas cujo calendário esta TV deve seguir. Para começar um novo, escolha **＋ Novo grupo…** e digite um **Nome do novo grupo**.
5. Em **Modo**, deixe **Agendado** selecionado. A TV vai reproduzir de acordo com o calendário do grupo, sozinha.
6. Clique em **Parear**.

A TV mostra **Conectado!** e depois **Carregando sua programação...**. Ela baixa o que está agendado e começa a reproduzir. Veja [Reprodução agendada na TV](./scheduled-playback.md).

:::info
Se o FreePlay Admin disser **Esse código não corresponde a uma TV**, confira o código na tela. Se ele tiver expirado, use o novo código que a TV está mostrando agora.
:::

### Agendado x manual

A configuração **Modo** tem duas opções:

- **Agendado** - Reproduz de acordo com o calendário do grupo, sozinha. Ninguém precisa apertar Iniciar.
- **Manual** - Alguém escolhe o conteúdo com o controle remoto. Uma tela manual continua aparecendo na sua lista de **Telas**, mas não segue um calendário, então o campo **Grupo** fica desativado.

Você pode trocar o modo de uma tela depois, em **Editar** na [página de Telas](./managing-screens.md).

## Parceando com um plano de culto

O código da tela **Parear esta tela** também funciona no B1 Admin. Se você digitá-lo lá e escolher um tipo de plano em **Mostrar planos de**, a TV segue esse tipo de plano no [Modo de plano](../plan-mode/index.md), em vez de um calendário. Veja [Parceando seu dispositivo](../plan-mode/device-pairing.md).

## Alterando ou desfazendo o pareamento pela TV {#changing-or-unpairing-from-the-tv}

Depois que a TV está pareada, a linha **Parear com um calendário** nas **Configurações** mostra o nome do grupo de telas que ela segue. Selecione a linha para abrir a janela **Pareada a**, que tem três opções:

- **Voltar à programação** - Fecha a janela e volta ao player agendado. Nada no pareamento muda.
- **Desfazer pareamento** - Para de seguir uma programação. O FreePlay abre a tela **Provedores de conteúdo**.
- **Parear com outro calendário** - Desfaz o pareamento e depois mostra um novo código para você parear a TV de novo.

:::warning
Desfazer o pareamento remove os arquivos que o FreePlay baixou para aquele calendário.
:::

## Desfazendo o pareamento no FreePlay Admin

1. Acesse **Telas** e clique no rótulo da tela.
2. Clique em **Mais** e depois em **Desfazer pareamento**.
3. Clique em **Desfazer pareamento** novamente para confirmar.

A TV volta a mostrar um código de pareamento. Pareie-a de novo sempre que quiser que ela volte a funcionar.

## Artigos relacionados

- **[Gerenciando telas e grupos](./managing-screens.md)** - Renomeie uma tela, mova-a para outro grupo ou veja seus downloads
- **[Agendando o calendário](./scheduling-the-calendar.md)** - Decida o que as telas do grupo reproduzem
- **[Escolhendo um modo de pareamento](../getting-started/pairing-modes.md)** - Compare o Modo agendado com o Modo de plano e com a navegação manual pelos provedores
