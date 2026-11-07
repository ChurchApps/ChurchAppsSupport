---
title: "Reprodução agendada na TV"
description: "Uma TV pareada baixa a semana seguinte e toca pelo relógio, mesmo offline. Aborda o painel de informações, os botões do controle e como fixar uma playlist."
---

# Reprodução agendada na TV

<div class="article-intro">

Quando uma TV está pareada a um calendário, o FreePlay a executa para você. Ele baixa a semana seguinte, troca o conteúdo nos horários agendados e continua reproduzindo a partir do próprio armazenamento se a internet cair. Um professor ou voluntário ainda pode pausar, pular e navegar com o controle remoto da TV.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- [Pareie a TV a um calendário](./pairing-a-screen.md)
- [Coloque algo no calendário](./scheduling-the-calendar.md), ou defina um loop padrão para o grupo da tela

</div>

## O que a TV faz sozinha

- **Abre direto na programação** - Quando uma TV pareada inicia o FreePlay, ela vai diretamente ao player agendado
- **Baixa com antecedência** - O FreePlay baixa todos os arquivos agendados para os próximos 7 dias, além do loop padrão, e reproduz a partir desses downloads
- **Reproduz pelo relógio** - Em cada horário de início agendado, a tela troca para aquele conteúdo. Quando nada está agendado, reproduz o loop padrão do grupo
- **Verifica mudanças** - O FreePlay consulta o FreePlay Admin regularmente para ver mudanças no calendário e baixa o que for novo
- **Corrige arquivos com problema** - Se um arquivo baixado não reproduzir, o FreePlay o pula e o baixa de novo

Antes de os primeiros arquivos chegarem, a tela mostra **Carregando programação...** ou **Baixando X de Y arquivos**. Se nada estiver agendado e o grupo não tiver um loop padrão, mostra **Nada está agendado agora**.

## O painel de informações

Pressione **Selecionar** no controle remoto para abrir o painel de informações. Ele se fecha sozinho depois de alguns segundos. O painel mostra:

- **Canto superior direito** - **Pronto até** seguido de uma data, quando tudo até essa data já está baixado, ou **Baixando** enquanto os arquivos ainda estão chegando. Abaixo disso, quantos arquivos foram baixados e uma barra de progresso
- **Canto inferior esquerdo** - O nome do que está sendo reproduzido (ou **Loop padrão**), qual item está na tela, e o que vem a seguir e quando
- **Última verificação** - Quando o FreePlay verificou pela última vez se havia mudanças na programação

O painel também tem três botões:

- **Fixar esta lista** - Mantém o conteúdo atual tocando em loop e ignora o calendário. Selecione **Desafixar lista** para voltar à programação
- **Navegar pelo conteúdo** - Sai do player agendado para navegar pelos seus provedores conectados
- **Configurações** - Abre as configurações do FreePlay, onde você pode [desfazer o pareamento ou parear com outro calendário](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

:::tip
Para voltar à programação depois de navegar, pressione **Voltar** no controle remoto a partir da tela **Provedores de conteúdo**, ou abra **Configurações**, selecione **Parear com um calendário** e escolha **Voltar à programação**. Uma TV pareada também volta ao player agendado sempre que o FreePlay volta ao primeiro plano, e sempre abre no player agendado.
:::

## Controles remotos

| Botão do controle | Ação |
|---|---|
| **Selecionar** | Abre o painel de informações |
| **Play/Pausa** | Pausa ou retoma. Um ícone de play aparece enquanto está pausado |
| **Seta para a direita** | Próximo slide ou vídeo |
| **Seta para a esquerda** | Slide ou vídeo anterior |
| **Seta para cima** | Abre a visão geral dos slides para pular para qualquer um |
| **Avançar** | Avança 10 segundos em um vídeo |
| **Retroceder** | Volta 10 segundos em um vídeo |
| **Voltar** | Fecha a visão geral dos slides ou o painel de informações, ou abre o painel de informações |

Próximo e anterior ficam dentro do conteúdo que está tocando agora. Eles só voltam do último item para o primeiro quando a programação está configurada para repetir. Avançar e Retroceder funcionam somente durante um vídeo. Não fazem nada em um slide.

### Pulando para um slide

Pressione **Cima** para abrir a visão geral dos slides. Ela mostra todos os itens da lista ou da lição atual. Vá até o que você quer e pressione **Selecionar** para pular direto para ele.

## Lições no ritmo do professor

Quando uma programação está configurada como **Ritmo do professor**, os slides de imagem não avançam sozinhos. O professor avança com a **seta para a direita**. Um vídeo toca até o fim e depois passa para o item seguinte.

Uma lição no ritmo do professor fica na tela além do horário de término agendado, até que o professor chegue ao último slide e ele termine. Depois, a tela passa para o que estiver agendado em seguida. Isso evita que uma aula que se estende seja cortada no meio da lição.

## Apresentando a partir de um navegador {#presenting-from-a-browser}

Você também pode reproduzir o calendário de uma tela em um navegador web. No FreePlay Admin, abra a tela na página **Telas** e clique em **Apresentar no navegador**. O navegador segue o calendário dessa tela do mesmo jeito que a TV, e a barra de controles mostra o que vem a seguir. Use **Espaço** para pausar, **←** / **→** para pular, **F** para tela cheia e **Esc** para sair.

## Artigos relacionados

- **[Agendando o calendário](./scheduling-the-calendar.md)** - Defina o que é reproduzido e o que acontece quando termina mais cedo
- **[Gerenciando telas e grupos](./managing-screens.md)** - Veja os downloads de cada tela no FreePlay Admin
- **[Reproduzindo conteúdo](../content-providers/playing-content.md)** - Controles do player quando você mesmo reproduz um conteúdo
