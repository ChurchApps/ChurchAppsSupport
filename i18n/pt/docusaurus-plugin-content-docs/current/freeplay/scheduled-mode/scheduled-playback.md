---
title: "Reprodução Agendada na TV"
---

# Reprodução Agendada na TV

<div class="article-intro">

Depois que uma TV é pareada com um calendário, o FreePlay a executa para você. Ele baixa a semana seguinte, troca o conteúdo nos horários agendados e continua reproduzindo a partir do próprio armazenamento caso a internet caia. Um professor ou voluntário ainda pode pausar, pular e navegar com o controle remoto da TV.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Pareie a TV com um calendário](./pairing-a-screen)
- [Coloque algo no calendário](./scheduling-the-calendar), ou defina uma playlist padrão para o grupo da tela

</div>

## O Que a TV Faz Sozinha

- **Abre direto na programação** - Quando uma TV pareada inicia o FreePlay, ela vai diretamente ao reprodutor agendado
- **Baixa com antecedência** - O FreePlay baixa todos os arquivos agendados para os próximos 7 dias, além da playlist padrão, e reproduz a partir desses downloads
- **Reproduz de acordo com o relógio** - Em cada horário de início agendado, a tela troca para aquele conteúdo. Quando nada está agendado, reproduz a playlist padrão do grupo
- **Verifica mudanças** - O FreePlay verifica regularmente o FreePlay Admin em busca de alterações no calendário e baixa o que for novo
- **Corrige arquivos com problema** - Se um arquivo baixado não reproduzir, o FreePlay o ignora e o baixa novamente

Antes que os primeiros arquivos cheguem, a tela mostra **Carregando programação...** ou **Baixando X de Y arquivos**. Se nada estiver agendado e o grupo não tiver uma playlist padrão, ela mostra **Nada está agendado agora**.

## O Painel de Informações

Pressione **OK** no controle remoto para abrir o painel de informações. Ele se fecha sozinho após alguns segundos. O painel mostra:

- **Canto superior direito** - **Pronto até** seguido de uma data, quando tudo até essa data já estiver baixado, ou **Baixando** enquanto os arquivos ainda estão chegando. Abaixo disso, quantos arquivos foram baixados e uma barra de progresso
- **Canto inferior esquerdo** - O nome do que está sendo reproduzido (ou **Playlist padrão**), qual item está na tela e o que vem a seguir, com o horário
- **Última verificação** - Quando o FreePlay verificou pela última vez se havia mudanças na programação

O painel também tem três botões:

- **Fixar esta Playlist** - Mantém o conteúdo atual em loop e ignora o calendário. Selecione **Desafixar Playlist** para voltar à programação
- **Navegar pelo Conteúdo** - Sai do reprodutor agendado para navegar pelos seus provedores conectados
- **Configurações** - Abre as configurações do FreePlay, onde você pode [desparear ou parear com outro calendário](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Para voltar à programação depois de navegar, pressione **Voltar** no controle remoto na tela **Provedores de Conteúdo**, ou abra as **Configurações**, selecione **Parear com um calendário** e escolha **Voltar à programação**. Uma TV pareada também volta ao reprodutor agendado sempre que o FreePlay retorna ao primeiro plano, e sempre abre no reprodutor agendado.
:::

## Controles do Remoto

| Botão do Remoto | Ação |
|---|---|
| **OK** | Abre o painel de informações |
| **Play/Pause** | Pausa ou retoma. Um ícone de play aparece enquanto estiver pausado |
| **Seta para a direita** | Próximo slide ou vídeo |
| **Seta para a esquerda** | Slide ou vídeo anterior |
| **Seta para cima** | Abre a visão geral dos slides para pular para qualquer um |
| **Avançar** | Avança 10 segundos em um vídeo |
| **Retroceder** | Volta 10 segundos em um vídeo |
| **Voltar** | Fecha a visão geral dos slides ou o painel de informações, ou abre o painel de informações |

Próximo e anterior ficam dentro do conteúdo que está sendo reproduzido agora. Eles só voltam do último item para o primeiro quando a programação estiver configurada para repetir. Avançar e Retroceder funcionam somente durante um vídeo. Não fazem nada em um slide.

### Pulando para um Slide

Pressione **Para cima** para abrir a visão geral dos slides. Ela mostra todos os itens da playlist ou lição atual. Vá até o que você quer e pressione **OK** para pular direto para ele.

## Lições com Ritmo do Professor

Quando a programação está definida como **Ritmo do professor**, os slides de imagem não avançam sozinhos. O professor avança com a **Seta para a direita**. Um vídeo toca até o fim e depois passa para o próximo item.

Uma lição com ritmo do professor continua na tela além do horário de término agendado, até que o professor chegue ao último slide e ele termine. Só então a tela passa para o próximo conteúdo agendado. Isso evita que uma aula que se estende demais seja cortada no meio da lição.

## Apresentando pelo Navegador

Você também pode reproduzir o calendário de uma tela em um navegador da web. No FreePlay Admin, abra a tela na página **Telas** e clique em **Apresentar no navegador**. O navegador segue o calendário da tela da mesma forma que a TV, e a barra de controles mostra o que vem a seguir. Use **Espaço** para pausar, **←** / **→** para pular, **F** para tela cheia e **Esc** para sair.

## Artigos Relacionados

- **[Agendando o Calendário](./scheduling-the-calendar)** - Defina o que é reproduzido e o que acontece quando termina antes
- **[Gerenciando Telas e Grupos](./managing-screens)** - Verifique os downloads de cada tela no FreePlay Admin
- **[Reproduzindo Conteúdo](../content-providers/playing-content)** - Controles do reprodutor quando você mesmo reproduz conteúdo
