---
title: "Agendando o calendário"
---

# Agendando o calendário

<div class="article-intro">

A página **Calendário** no FreePlay Admin controla o que cada grupo de telas exibe e quando. Adicione uma programação para uma playlist, um plano de culto ou uma pasta de provedor, e defina se ela se repete semanalmente ou toca uma única vez. Quando nada está programado, toca o loop padrão do grupo.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie pelo menos um grupo de telas. Consulte [Gerenciando telas e grupos](./managing-screens#screen-groups)
- [Crie uma playlist](./building-playlists), ou tenha um tipo de plano configurado no B1 Admin

</div>

## Lendo o calendário

1. Acesse **Calendário**.
2. Escolha um grupo de telas nas abas no topo. Cada aba mostra quantas programações o grupo tem.
3. A visão semanal vai de segunda a domingo, das 6h às 22h. Uma linha vermelha marca o horário atual.
4. Use as setas para ir para a semana anterior ou seguinte, ou clique em **Hoje** para voltar a esta semana.

O subtítulo da página mostra o fuso horário usado pelo calendário. As programações seguem o fuso horário da sua igreja, que você define no B1 Admin em [Informações da igreja](../../b1-admin/settings/church-settings.md#time-zone). Se a sua igreja não tiver um fuso horário definido, o FreePlay usa o fuso horário do seu campus. O calendário e as suas TVs usam o mesmo fuso horário, então um bloco colocado às 9:00 no calendário toca às 9:00 na tela, mesmo que o seu computador esteja configurado para outro fuso.

As programações são codificadas por cor de acordo com o tipo. Uma legenda explica as cores:

- **Loop padrão** - Fundo hachurado, exibido por trás de tudo quando o grupo tem um loop padrão
- **Playlist**
- **Plano de culto**
- **Pasta do provedor**

Cada bloco mostra o seu nome, e os blocos mais altos também mostram os horários, se ele se repete (**semanal** ou **uma vez**) e o que acontece quando termina antes do previsto.

## Definindo o loop padrão

O loop padrão toca nas telas do grupo sempre que nada estiver programado.

1. Na página **Calendário**, clique em **Loop padrão…** no cabeçalho. Se um loop padrão já estiver definido, o botão mostra **Loop padrão:** seguido do nome da playlist.
2. Escolha uma **Playlist** ou escolha **Nenhum — tela apagada**.
3. Clique em **Salvar**.

## Adicionando uma programação

Há três formas de iniciar uma nova programação:

- Clique em um espaço vazio do calendário. O formulário abre com aquele dia e aquela meia hora já preenchidos.
- Clique em **Adicionar programação** no cabeçalho.
- Escolha **Adicionar programação** na paleta de comandos (**Ctrl+K** ou **⌘K**).

Depois, preencha o formulário:

1. **Tocar** - Escolha o que será exibido:
   - **Playlists** - Qualquer playlist que você tenha montado
   - **Planos de culto** - Um tipo de plano do B1 Admin, marcado como **(plano atual)**. A tela toca, toda semana, o plano que estiver atual para aquele tipo de plano, incluindo lições do Go Curriculum (inclusive as personalizadas), que usam o login do Go vinculado ao ministério do tipo de plano
   - **Pasta do provedor…** - Abre **Escolha uma pasta do provedor**. Navegue até uma pasta e clique em **Usar esta pasta**. Para escolher outra pasta depois, clique em **Alterar**
2. **Repete** - Selecione os dias da semana em que a programação será exibida. Para uma data única, ative **Uma vez** e escolha a **Data**.
3. **Início** e **Fim** - Os horários em que a programação começa e termina.
4. **Se terminar antes** - O que fazer quando o conteúdo acabar antes do horário de término:
   - **Repetir até o horário de término** - Recomeça do início. Bom para loops de sinalização, avisos e contagens regressivas
   - **Ritmo do professor** - Os slides aguardam o controle remoto do professor. A aula permanece na tela além do horário de término até o último slide
   - **Tocar uma vez e depois voltar ao loop padrão**
5. Para programações que se repetem, defina **Começa em** com a primeira data. Em **Termina**, escolha **Nunca**, ou escolha **Em data** e informe uma **Data de término**.
6. Clique em **Salvar**.

:::info
**Ritmo do professor** substituiu a opção anterior "manter o último slide". Programações salvas com essa opção agora tocam como ritmo do professor.
:::

## Editando ou excluindo uma programação

1. Clique no bloco da programação no calendário.
2. Altere qualquer campo e clique em **Salvar**, ou clique em **Excluir** para remover a programação.

## Programações sobrepostas

Se duas programações se sobrepõem, o formulário mostra um aviso: **Sobrepõe outra programação. Vence a que começa mais tarde.** Enquanto a programação posterior está em execução, as telas a exibem. Quando ela termina, voltam à programação anterior, se ela ainda estiver em execução.

## Como as telas recebem as alterações

As telas pareadas baixam tudo o que está programado para os próximos 7 dias e verificam sozinhas se há alterações. Você não precisa mexer na TV depois de editar o calendário. Para ver quando uma tela já tem tudo o que precisa, confira **Pronto até** na [página Telas](./managing-screens).

## Artigos relacionados

- **[Criando playlists](./building-playlists)** - Crie as playlists que você programa
- **[Reprodução programada na TV](./scheduled-playback)** - Como as aulas em ritmo do professor e o controle remoto funcionam na TV
- **[Gerenciando telas e grupos](./managing-screens)** - Adicione grupos e confira os downloads de cada tela
- **[Mantendo apenas parte de cada lição](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Recorte cada lição agendada de um tipo de plano nas partes que a sua sala toca
