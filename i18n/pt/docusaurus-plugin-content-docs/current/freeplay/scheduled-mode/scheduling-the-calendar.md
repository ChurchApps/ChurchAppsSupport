---
title: "Programando o Calendário"
---

# Programando o Calendário

<div class="article-intro">

A página **Calendário** no FreePlay Admin controla o que cada grupo de telas exibe e quando. Adicione uma programação para uma playlist, um plano de culto ou uma pasta de provedor, e defina se ela se repete semanalmente ou toca uma única vez. Quando nada está programado, o loop padrão do grupo é exibido.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie pelo menos um grupo de telas. Consulte [Gerenciando Telas e Grupos](./managing-screens#screen-groups)
- [Monte uma playlist](./building-playlists) ou tenha um tipo de plano configurado no B1 Admin

</div>

## Lendo o calendário

1. Acesse **Calendário**.
2. Escolha um grupo de telas nas abas no topo. Cada aba mostra quantas programações o grupo tem.
3. A visualização semanal vai de segunda a domingo, das 6h às 22h. Uma linha vermelha marca o horário atual.
4. Use as setas para ir para a semana anterior ou seguinte, ou clique em **Hoje** para voltar a esta semana.

O subtítulo da página mostra o fuso horário usado pelo calendário. As programações seguem o fuso horário da sua igreja. Se a sua igreja não tiver um fuso horário definido, o FreePlay usa o fuso horário do seu campus.

As programações são coloridas por tipo. Uma legenda explica as cores:

- **Loop padrão** - Fundo hachurado, exibido atrás de tudo quando o grupo tem um loop padrão
- **Playlist**
- **Plano de culto**
- **Pasta de provedor**

Cada bloco mostra seu nome, e os blocos mais altos também mostram os horários, se ele se repete (**semanal** ou **uma vez**) e o que acontece quando termina antes do previsto.

## Definindo o loop padrão

O loop padrão é exibido nas telas do grupo sempre que nada está programado.

1. Na página **Calendário**, clique em **Loop padrão…** no cabeçalho. Se um loop padrão já estiver definido, o botão mostra **Loop padrão:** seguido do nome da playlist.
2. Escolha uma **Playlist**, ou escolha **Nenhum — tela apagada**.
3. Clique em **Salvar**.

## Adicionando uma programação

Há três maneiras de iniciar uma nova programação:

- Clique em um espaço vazio do calendário. O formulário abre com aquele dia e meia hora já preenchidos.
- Clique em **Adicionar programação** no cabeçalho.
- Escolha **Adicionar programação** na paleta de comandos (**Ctrl+K** ou **⌘K**).

Em seguida, preencha o formulário:

1. **Reproduzir** - Escolha o que será exibido:
   - **Playlists** - Qualquer playlist que você tenha montado
   - **Planos de culto** - Um tipo de plano do B1 Admin, marcado como **(plano atual)**. A tela exibe, a cada semana, o plano atual daquele tipo
   - **Pasta de provedor…** - Abre **Escolher uma pasta de provedor**. Navegue até uma pasta e clique em **Usar esta pasta**. Para escolher outra pasta depois, clique em **Alterar**
2. **Repete** - Selecione os dias da semana em que a programação será exibida. Para uma data única, ative **Uma vez** e escolha a **Data**.
3. **Início** e **Fim** - Os horários em que a programação começa e termina.
4. **Se terminar antes** - O que fazer quando o conteúdo acabar antes do horário de término:
   - **Repetir até o horário de término** - Recomeça desde o início. Bom para loops de sinalização, anúncios e contagens regressivas
   - **Ritmo do professor** - Os slides aguardam o controle remoto do professor. A lição permanece na tela além do horário de término até o último slide
   - **Tocar uma vez e depois voltar ao loop padrão**
5. Para programações recorrentes, defina **Começa em** como a primeira data. Em **Termina**, escolha **Nunca**, ou escolha **Em data** e informe uma **Data de término**.
6. Clique em **Salvar**.

:::info
**Ritmo do professor** substituiu a opção mais antiga "manter o último slide". As programações salvas com essa opção agora são exibidas com o ritmo do professor.
:::

## Editando ou excluindo uma programação

1. Clique no bloco da programação no calendário.
2. Altere qualquer campo e clique em **Salvar**, ou clique em **Excluir** para remover a programação.

## Programações sobrepostas

Se duas programações se sobrepuserem, o formulário mostra um aviso: **Sobrepõe outra programação. Vence a que começa depois.** Enquanto a programação posterior estiver em execução, as telas a exibem. Quando ela termina, as telas voltam à programação anterior, se ela ainda estiver em execução.

## Como as telas recebem as alterações

As telas pareadas baixam tudo o que está programado para os próximos 7 dias e verificam alterações por conta própria. Você não precisa mexer na TV depois de editar o calendário. Para ver quando uma tela já tem tudo o que precisa, verifique **Pronto até** na [página de Telas](./managing-screens).

## Artigos relacionados

- **[Criando Playlists](./building-playlists)** - Monte as playlists que você programa
- **[Reprodução programada na TV](./scheduled-playback)** - Como as lições em ritmo do professor e o controle remoto funcionam na TV
- **[Gerenciando Telas e Grupos](./managing-screens)** - Adicione grupos e verifique os downloads de cada tela
