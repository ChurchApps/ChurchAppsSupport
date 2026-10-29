---
title: "Pareando uma Tela"
---

# Pareando uma Tela

<div class="article-intro">

Para colocar uma TV em um calendário, pareie-a com o **FreePlay Admin**. A TV mostra um código de quatro letras. Você digita esse código em [admin.freeplay.church](https://admin.freeplay.church) e escolhe o grupo de telas cujo calendário ela deve seguir. Isso só precisa ser feito uma vez por TV.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale e abra o FreePlay na TV. Consulte [Primeiros Passos](../getting-started/)
- Tenha um login do ChurchApps para a sua igreja, para entrar no FreePlay Admin
- Opcionalmente, [monte uma playlist](./building-playlists) e [agende-a](./scheduling-the-calendar) antes, para que a TV já tenha algo para reproduzir

</div>

## Mostrando o Código na TV

1. Na TV, abra **Configurações** na parte inferior da barra lateral.
2. Selecione **Parear com um calendário**. A linha mostra **Não pareado** enquanto a TV ainda não estiver pareada.
3. A tela **Parear esta tela** mostra um QR code e um código de pareamento de quatro letras, com a mensagem **Escaneie com seu celular, ou acesse freeplay.church/pair e digite este código**.
4. Abaixo do código, **Aguardando confirmação** pisca enquanto o FreePlay espera que você conclua o pareamento.

O código vale por 15 minutos, e uma contagem regressiva abaixo dele mostra quanto tempo resta. Quando o tempo acaba, o FreePlay mostra um novo código automaticamente. Você também pode selecionar **Gerar Novo Código** para obter outro, ou **Cancelar** para voltar às Configurações.

## Pareando no FreePlay Admin

1. Escaneie o QR code com o seu celular ou acesse **freeplay.church/pair** em qualquer computador ou celular. Faça login se for solicitado. O FreePlay Admin abre o formulário **Parear tela** com o código já preenchido.
   - Você também pode abrir o formulário manualmente. Acesse **Telas** no FreePlay Admin e clique em **Parear tela**.
2. Confira o **Código de pareamento**. São as quatro letras que aparecem na TV.
3. Digite um **Rótulo** para diferenciar esta TV das outras, por exemplo "Saguão esquerdo". Isso é opcional.
4. Em **Grupo**, escolha o grupo de telas cujo calendário esta TV deve seguir. Para criar um novo, escolha **＋ Novo grupo…** e digite um **Nome do novo grupo**.
5. Em **Modo**, deixe **Agendado** selecionado. A TV vai reproduzir de acordo com o calendário do grupo, sem intervenção.
6. Clique em **Parear**.

A TV mostra **Conectado!** e depois **Carregando sua programação...**. Ela baixa o conteúdo agendado e começa a reproduzir. Consulte [Reprodução Agendada na TV](./scheduled-playback).

:::info
Se o FreePlay Admin disser **Esse código não corresponde a uma TV**, confira o código na tela. Se ele tiver expirado, use o novo código que a TV está mostrando agora.
:::

### Agendado vs. Manual

A configuração **Modo** tem duas opções:

- **Agendado** - Reproduz de acordo com o calendário do grupo, sem intervenção. Ninguém precisa apertar Iniciar.
- **Manual** - Alguém escolhe o conteúdo pelo controle remoto. Uma tela manual continua aparecendo na sua lista de **Telas**, mas não segue um calendário, então o campo **Grupo** fica desativado.

Você pode trocar o modo de uma tela depois, em **Editar** na [página Telas](./managing-screens).

## Pareando com um Plano de Culto

O código da tela **Parear esta tela** também funciona no B1 Admin. Se você digitá-lo lá e escolher um tipo de plano em **Mostrar Planos De**, a TV passa a seguir esse tipo de plano no [Modo Plano](../plan-mode/), em vez de um calendário. Consulte [Parear Seu Dispositivo](../plan-mode/device-pairing).

## Alterando ou Desparear pela TV

Depois que a TV estiver pareada, a linha **Parear com um calendário** nas **Configurações** mostra o nome do grupo de telas que ela segue. Selecione a linha para abrir a caixa de diálogo **Pareado com**, que tem três opções:

- **Voltar à programação** - Fecha a caixa de diálogo e volta ao reprodutor agendado. Nada sobre o pareamento muda.
- **Desparear** - Para de seguir um calendário. O FreePlay abre a tela **Provedores de Conteúdo**.
- **Parear com outro calendário** - Desparea e mostra um novo código de pareamento, para que você possa parear a TV novamente.

:::warning
Desparear remove os arquivos que o FreePlay baixou para aquele calendário.
:::

## Desparear pelo FreePlay Admin

1. Acesse **Telas** e clique no rótulo da tela.
2. Clique em **Mais** e depois em **Desparear**.
3. Clique em **Desparear** novamente para confirmar.

A TV volta a mostrar um código de pareamento. Pareie-a novamente sempre que quiser que ela volte a funcionar.

## Artigos Relacionados

- **[Gerenciando Telas e Grupos](./managing-screens)** - Renomeie uma tela, mova-a para outro grupo ou verifique seus downloads
- **[Agendando o Calendário](./scheduling-the-calendar)** - Defina o que as telas do grupo reproduzem
- **[Escolhendo um Modo de Pareamento](../getting-started/pairing-modes)** - Compare o Modo Agendado com o Modo Plano e a navegação manual pelos provedores
