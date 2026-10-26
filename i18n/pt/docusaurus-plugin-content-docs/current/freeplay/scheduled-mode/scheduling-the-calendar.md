---
title: "Agendando o calendário"
---

# Agendando o calendário

<div class="article-intro">

A página **Calendário** no FreePlay Admin controla o que cada grupo de telas reproduz e quando. Adicione um agendamento para uma playlist, um plano de culto ou uma pasta de provedor, e defina se ele se repete semanalmente ou toca uma única vez. Quando nada está agendado, o loop padrão do grupo é reproduzido.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie pelo menos um grupo de telas. Veja [Gerenciando telas e grupos](./managing-screens#screen-groups)
- [Crie uma playlist](./building-playlists), ou tenha um tipo de plano configurado no B1 Admin

</div>

## Lendo o calendário

1. Vá para **Calendário**.
2. Escolha um grupo de telas nas abas no topo. Cada aba mostra quantos agendamentos o grupo tem.
3. A visualização semanal vai de segunda a domingo, das 6h às 22h. Uma linha vermelha marca o horário atual.
4. Use as setas para ir para a semana anterior ou seguinte, ou clique em **Hoje** para voltar a esta semana.

O subtítulo da página mostra o fuso horário usado pelo calendário. Os agendamentos seguem o fuso horário da sua igreja, que você define no B1 Admin em [Informações da igreja](../../b1-admin/settings/church-settings.md#time-zone). Se a sua igreja não tiver um fuso horário definido, o FreePlay usa o fuso horário do seu campus. O calendário e as suas TVs usam o mesmo fuso horário, então um bloco colocado às 9:00 no calendário toca às 9:00 na tela, mesmo que o seu computador esteja configurado para outro fuso horário.

Os agendamentos são codificados por cores conforme o tipo. Uma legenda explica as cores:

- **Loop padrão** - Fundo hachurado, exibido por trás de tudo quando o grupo tem um loop padrão
- **Playlist**
- **Plano de culto**
- **Pasta de provedor**

Cada bloco mostra o seu nome, e blocos mais altos também mostram os horários, se o agendamento se repete (**semanal** ou **uma vez**) e o que acontece quando ele termina antes do previsto.

## Definindo o loop padrão

O loop padrão é reproduzido nas telas do grupo sempre que nada estiver agendado.

1. Na página **Calendário**, clique em **Loop padrão…** no cabeçalho. Se um loop padrão já estiver definido, o botão mostra **Loop padrão:** seguido do nome da playlist.
2. Escolha uma **Playlist**, ou escolha **Nenhum — tela apagada**.
3. Clique em **Salvar**.

## Adicionando um agendamento

Há três formas de começar um novo agendamento:

- Clique em um espaço vazio do calendário. O formulário abre com aquele dia e meia hora já preenchidos.
- Clique em **Adicionar agendamento** no cabeçalho.
- Escolha **Adicionar agendamento** na paleta de comandos (**Ctrl+K** ou **⌘K**).

Depois, preencha o formulário:

1. **Reproduzir** - Escolha o que toca:
   - **Playlists** - Qualquer playlist que você tenha criado
   - **Planos de culto** - Um tipo de plano do B1 Admin, marcado como **(plano atual)**. A tela reproduz o plano vigente para aquele tipo a cada semana, incluindo as lições do Go Curriculum (inclusive as personalizadas), que usam o login do Go vinculado ao ministério do tipo de plano
   - **Pasta de provedor…** - Abre **Escolha uma pasta de provedor**. Navegue até uma pasta e clique em **Usar esta pasta**. Para escolher outra pasta depois, clique em **Alterar**
2. **Repete** - Selecione os dias da semana em que este agendamento toca. Para uma data única, ative **Uma vez** e escolha a **Data**.
3. **Início** e **Fim** - Os horários em que o agendamento começa e termina.
4. **Se terminar antes** - O que fazer quando o conteúdo acaba antes do horário final:
   - **Repetir até o horário final** - Recomeça do início. Bom para loops de sinalização, anúncios e contagens regressivas
   - **Ritmo do professor** - Os slides aguardam o controle remoto do professor. A lição permanece no ar após o horário final, até o último slide
   - **Tocar uma vez e voltar ao loop padrão**
5. Para agendamentos recorrentes, defina **Começa em** como a primeira data. Em **Termina**, escolha **Nunca**, ou escolha **Em data** e informe uma **Data final**.
6. Clique em **Salvar**.

:::info
**Ritmo do professor** substituiu a antiga opção "manter o último slide". Agendamentos salvos com essa opção agora tocam como ritmo do professor.
:::

## Editando ou excluindo um agendamento

1. Clique no bloco do agendamento no calendário.
2. Altere qualquer campo e clique em **Salvar**, ou clique em **Excluir** para remover o agendamento.

## Agendamentos sobrepostos

Se dois agendamentos se sobreporem, o formulário mostra um aviso: **Sobrepõe outro agendamento. O que começa mais tarde prevalece.** Enquanto o agendamento posterior estiver em execução, as telas o reproduzem. Quando ele termina, elas voltam ao agendamento anterior, se ele ainda estiver em execução.

## Como as telas recebem as mudanças

As telas pareadas baixam tudo o que está agendado para os próximos 7 dias e verificam mudanças por conta própria. Você não precisa mexer na TV depois de editar o calendário. Para ver quando uma tela tem tudo o que precisa, verifique **Pronta até** na [página Telas](./managing-screens).

## Artigos relacionados

- **[Criando playlists](./building-playlists)** - Crie as playlists que você agenda
- **[Reprodução programada na TV](./scheduled-playback)** - Como as lições em ritmo do professor e o controle remoto funcionam na TV
- **[Gerenciando telas e grupos](./managing-screens)** - Adicione grupos e verifique os downloads de cada tela
