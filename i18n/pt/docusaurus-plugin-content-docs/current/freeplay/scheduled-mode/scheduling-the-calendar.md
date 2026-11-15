---
title: "Agendando o calendário"
description: "Configure uma programação semanal ou pontual no Calendário do FreePlay Admin para reproduzir playlists, planos de culto ou pastas de provedores nos seus grupos de telas, com loops padrão como alternativa."
---

# Agendando o calendário

<div class="article-intro">

A página **Calendário** do FreePlay Admin controla o que cada grupo de telas reproduz e quando. Adicione uma programação para uma playlist, um plano de culto ou uma pasta de provedor, e configure-a para repetir semanalmente ou tocar uma única vez. Quando nada está programado, o loop padrão do grupo é reproduzido.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie pelo menos um grupo de telas. Veja [Gerenciando telas e grupos](./managing-screens.md#screen-groups)
- [Crie uma playlist](./building-playlists.md), ou tenha um tipo de plano configurado no B1 Admin

</div>

## Lendo o calendário {#reading-the-calendar}

1. Acesse **Calendário**.
2. Escolha um grupo de telas nas abas no topo. Cada aba mostra quantas programações o grupo tem.
3. A visão semanal vai de segunda a domingo, das 6h às 22h. Uma linha vermelha marca a hora atual.
4. Use as setas para ir para a semana anterior ou seguinte, ou clique em **Hoje** para voltar a esta semana.

O subtítulo da página mostra o fuso horário usado pelo calendário. As programações seguem o fuso horário da sua igreja, que você define no B1 Admin em [Informações da igreja](../../b1-admin/settings/church-settings.md#time-zone). Se a sua igreja não tiver um fuso horário definido, o FreePlay usa o fuso horário do seu campus. O calendário e as suas TVs usam o mesmo fuso horário, então um bloco colocado às 9:00 no calendário é reproduzido às 9:00 na tela, mesmo que o seu computador esteja configurado em outro fuso horário.

As programações são codificadas por cor de acordo com o tipo. Uma legenda explica as cores:

- **Loop padrão** - Fundo hachurado, exibido atrás de tudo quando o grupo tem um loop padrão
- **Playlist**
- **Plano de culto**
- **Pasta de provedor**

Cada bloco mostra seu nome, e blocos mais altos também mostram os horários, se ele se repete (**semanal** ou **uma vez**) e o que acontece quando termina antes do previsto.

## Definindo o loop padrão {#setting-the-default-loop}

O loop padrão é reproduzido nas telas do grupo sempre que nada estiver programado.

1. Na página **Calendário**, clique em **Loop padrão…** no cabeçalho. Se um loop padrão já estiver definido, o botão mostra **Loop padrão:** seguido do nome da playlist.
2. Escolha uma **Playlist**, ou escolha **Nenhum — tela apagada**.
3. Clique em **Salvar**.

## Adicionando uma programação {#adding-a-schedule}

Há três formas de iniciar uma nova programação:

- Clique em um espaço vazio do calendário. O formulário abre com aquele dia e meia hora já preenchidos.
- Clique em **Adicionar programação** no cabeçalho.
- Escolha **Adicionar programação** na paleta de comandos (**Ctrl+K** ou **⌘K**).

Depois, preencha o formulário:

1. **Reproduzir** - Escolha o que será reproduzido:
   - **Playlists** - Qualquer playlist que você tenha criado
   - **Planos de culto** - Um tipo de plano do B1 Admin, marcado como **(plano atual)**. A tela reproduz o plano que estiver atual para aquele tipo de plano a cada semana, incluindo as lições do Go Curriculum (inclusive as personalizadas), que usam o login do Go vinculado ao ministério do tipo de plano
   - **Pasta de provedor…** - Abre **Escolha uma pasta de provedor**. Navegue até uma pasta e clique em **Usar esta pasta**. Para escolher outra pasta depois, clique em **Alterar**
2. **Repete** - Selecione os dias da semana em que esta programação será reproduzida. Para uma data única, ative **Uma vez** e escolha a **Data**.
3. **Início** e **Fim** - Os horários em que a programação começa e termina.
4. **Se terminar antes** - O que fazer quando o conteúdo acaba antes do horário de término:
   - **Repetir até o horário de término** - Recomeça do início. Bom para loops de sinalização, avisos e contagens regressivas
   - **Ritmo do professor** - Os slides aguardam o controle remoto do professor. A lição permanece na tela após o horário de término até o último slide
   - **Reproduzir uma vez, depois voltar ao loop padrão**
5. Para programações que se repetem, defina **Começa em** como a primeira data. Em **Termina**, escolha **Nunca**, ou escolha **Em data** e informe uma **Data de término**.
6. Clique em **Salvar**.

:::info
**Ritmo do professor** substituiu a opção mais antiga "manter o último slide". Programações salvas com essa opção agora são reproduzidas como ritmo do professor.
:::

## Editando ou excluindo uma programação {#editing-or-deleting-a-schedule}

1. Clique no bloco da programação no calendário.
2. Altere qualquer campo e clique em **Salvar**, ou clique em **Excluir** para remover a programação.

## Programações sobrepostas {#overlapping-schedules}

Se duas programações se sobrepuserem, o formulário mostra um aviso: **Sobrepõe-se a outra programação. A que começar mais tarde prevalece.** Enquanto a programação posterior estiver em execução, as telas a reproduzem. Quando ela termina, elas voltam à programação anterior, se esta ainda estiver em execução.

## Como as telas recebem as alterações {#how-screens-pick-up-changes}

As telas pareadas baixam tudo o que está programado para os próximos 7 dias e verificam alterações por conta própria. Você não precisa mexer na TV depois de editar o calendário. Para ver quando uma tela tem tudo o que precisa, confira **Pronta até** na [página de Telas](./managing-screens.md).

## Artigos relacionados {#related-articles}

- **[Criando playlists](./building-playlists.md)** - Crie as playlists que você vai programar
- **[Reprodução agendada na TV](./scheduled-playback.md)** - Como as lições em ritmo do professor e o controle remoto funcionam na TV
- **[Gerenciando telas e grupos](./managing-screens.md)** - Adicione grupos e verifique os downloads de cada tela
- **[Mantendo apenas parte de cada lição](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Ajuste cada lição programada em um tipo de plano para as partes que a sua sala reproduz
