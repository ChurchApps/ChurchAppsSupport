---
title: "Gerenciando Telas e Grupos"
---

# Gerenciando Telas e Grupos

<div class="article-intro">

A página **Telas** no FreePlay Admin lista todas as TVs pareadas à sua igreja, com o que está sendo exibido agora e se estão prontas para o domingo. Você também gerencia os **grupos de telas** aqui. As telas do mesmo grupo compartilham um calendário e um loop padrão.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Faça login no FreePlay Admin em [admin.freeplay.church](https://admin.freeplay.church)
- [Pareie pelo menos uma tela](./pairing-a-screen)

</div>

## A Página de Telas

No topo, três números oferecem uma verificação rápida da situação:

- **Online agora** - Telas que fizeram check-in nos últimos 15 minutos
- **Prontas para o domingo** - Quantas telas agendadas já têm tudo baixado até este próximo domingo
- **Precisa de atenção** - Telas que estão offline ou com arquivos faltando

Logo abaixo, use **Pesquisar telas** para encontrar uma tela pelo rótulo, pelo grupo ou pelo que está sendo exibido. Os filtros em forma de chip restringem a lista a **Todas**, **Agendadas**, **Manuais**, **Precisa de atenção** ou a um único grupo. Alterne entre as visualizações **Tabela** e **Grade** com o botão à direita.

Cada tela mostra seu:

- **Rótulo** e modelo do dispositivo
- **Grupo**
- **Modo** - **Agendado** ou **Manual**
- **Reproduzindo agora** - O que está na tela neste momento. Telas manuais mostram **Sala de aula · professor pressiona Iniciar**
- **Pronta até** - A data até a qual a tela baixou o conteúdo. Se os arquivos não foram baixados, mostra **N arquivos faltando** no lugar. Uma tela nova mostra **Aguardando a primeira sincronização**
- **Visto por último** - Quando a tela fez check-in pela última vez. Uma tela que não faz check-in há algum tempo mostra **Offline**, e uma que nunca se conectou mostra **Nunca visto**

Use **Apresentar** para reproduzir o calendário da tela no seu navegador, ou **Editar** para alterar suas configurações.

## Visualizando uma Tela

Clique no rótulo de uma tela para abrir a página dela. À esquerda, você encontra:

- **Apresentar no navegador** - Reproduz o calendário desta tela em tela cheia no seu navegador, como apareceria na TV. Veja [Apresentando a partir de um Navegador](./scheduled-playback#presenting-from-a-browser)
- **Editar** - Altera o rótulo, o grupo ou o modo
- **Mais** > **Desparear** - Desconecta a TV. Ela volta a exibir um código de pareamento

O restante da página tem estas seções:

- **Agora e a seguir** - O que está sendo reproduzido agora e até quando, seguido de tudo o que está agendado para os próximos 7 dias. Clique em **Abrir calendário** para ir ao calendário deste grupo
- **Downloads** - **Pronta até** uma data em que tudo foi baixado, ou uma lista dos arquivos que estão faltando
- **Dispositivo** - ID do dispositivo, plataforma, modelo, versão do aplicativo FreePlay, endereço IP, armazenamento usado e livre, última vez visto e modo
- **Recentes** - As atividades mais recentes que a tela reportou

:::tip
Se uma tela mostrar arquivos faltando, verifique se ela está online e se tem espaço livre no armazenamento. A TV baixa os arquivos faltantes por conta própria na próxima vez que fizer check-in.
:::

## Editando uma Tela

1. Clique em **Editar** ao lado da tela, ou na página dela.
2. Altere o **Rótulo**, o **Grupo** ou o **Modo** (**Agendado** ou **Manual**).
3. Clique em **Salvar**.

Mover uma tela para outro grupo faz com que ela passe a seguir o calendário desse grupo.

## Grupos de Telas {#screen-groups}

Um grupo de telas é um conjunto de telas que reproduzem a mesma coisa ao mesmo tempo, como "Saguão" ou "Ala Infantil". Cada grupo tem seu próprio calendário e pode ter um **loop padrão** que é reproduzido sempre que nada estiver agendado.

Para gerenciar os grupos, clique em **Grupos** no topo da página **Telas**. A lista **Grupos de telas** mostra o nome de cada grupo, quantas telas ele possui e seu loop padrão. Clique em **Telas** para voltar.

### Adicionando um Grupo

1. Na visualização **Grupos de telas**, clique em **Adicionar grupo**.
2. Informe um **Nome**, por exemplo "Saguão".
3. Escolha uma lista de reprodução para o **Loop padrão**, ou deixe em **Nenhum — tela apagada**.
4. Clique em **Salvar**.

Você também pode criar um grupo ao parear uma tela, escolhendo **＋ Novo grupo…** no campo **Grupo**.

### Editando ou Excluindo um Grupo

1. Clique em **Editar** ao lado do grupo.
2. Altere o nome ou o loop padrão e clique em **Salvar**.
3. Para remover o grupo, clique em **Excluir** e confirme.

:::warning
Excluir um grupo também exclui a programação dele. As telas desse grupo ficam apagadas até que você as mova para outro grupo.
:::

## Artigos Relacionados

- **[Pareando uma Tela](./pairing-a-screen)** - Adicione uma nova TV
- **[Agendando o Calendário](./scheduling-the-calendar)** - Defina o que cada grupo reproduz e seu loop padrão
- **[Reprodução Agendada na TV](./scheduled-playback)** - O que a data "Pronta até" significa na própria TV
