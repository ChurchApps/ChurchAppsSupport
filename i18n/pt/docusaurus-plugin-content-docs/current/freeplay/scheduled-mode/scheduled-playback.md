---
title: "Reprodução agendada na TV"
---

# Reprodução agendada na TV

<div class="article-intro">

Depois que uma TV é pareada a um calendário, o FreePlay a executa para você. Ele baixa a semana seguinte, troca o conteúdo nos horários agendados e continua reproduzindo a partir do próprio armazenamento se a internet cair. Um professor ou voluntário ainda pode pausar, pular e navegar com o controle remoto da TV.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- [Pareie a TV a um calendário](./pairing-a-screen)
- [Coloque algo no calendário](./scheduling-the-calendar), ou defina um loop padrão para o grupo da tela

</div>

## O que a TV faz sozinha

- **Abre direto na programação** - Quando uma TV pareada inicia o FreePlay, ela vai diretamente para o player agendado
- **Baixa com antecedência** - O FreePlay baixa todos os arquivos agendados para os próximos 7 dias, além do loop padrão, e reproduz a partir desses downloads
- **Reproduz conforme o relógio** - Em cada horário de início agendado, a tela troca para aquele conteúdo. Quando nada está agendado, reproduz o loop padrão do grupo
- **Verifica alterações** - O FreePlay consulta regularmente o FreePlay Admin para ver mudanças no calendário e baixa o que for novo
- **Corrige arquivos com problema** - Se um arquivo baixado não reproduzir, o FreePlay o ignora e o baixa novamente

Antes que os primeiros arquivos cheguem, a tela mostra **Carregando programação...** ou **Baixando X de Y arquivos**. Se nada estiver agendado e o grupo não tiver loop padrão, ela mostra **Nada está agendado agora**.

## O painel de informações

Pressione **Selecionar** no controle remoto para abrir o painel de informações. Ele se fecha sozinho após alguns segundos. O painel mostra:

- **Canto superior direito** - **Pronto até** seguido de uma data, quando tudo até essa data já está baixado, ou **Baixando** enquanto os arquivos ainda estão chegando. Abaixo, quantos arquivos foram baixados e uma barra de progresso
- **Canto inferior esquerdo** - O nome do que está sendo reproduzido (ou **Loop padrão**), qual item está na tela e o que vem a seguir e quando
- **Última verificação** - Quando o FreePlay verificou pela última vez se houve mudanças na programação

O painel também tem três botões:

- **Fixar esta playlist** - Mantém o conteúdo atual em loop e ignora o calendário. Selecione **Desafixar playlist** para voltar à programação
- **Navegar pelo conteúdo** - Sai do player agendado para navegar pelos seus provedores conectados
- **Configurações** - Abre as configurações do FreePlay, onde você pode [desparear ou parear a outro calendário](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Para voltar à programação depois de navegar, feche e reabra o FreePlay. Uma TV pareada sempre abre no player agendado.
:::

## Controles remoto

| Botão do controle | Ação |
|---|---|
| **Selecionar** | Abre o painel de informações |
| **Reproduzir/Pausar** | Pausa ou retoma. Um ícone de play aparece enquanto está pausado |
| **Seta para a direita** | Próximo slide ou vídeo |
| **Seta para a esquerda** | Slide ou vídeo anterior |
| **Seta para cima** | Abre a visão geral dos slides para ir a qualquer slide |
| **Avançar rápido** | Avança 10 segundos em um vídeo |
| **Retroceder** | Volta 10 segundos em um vídeo |
| **Voltar** | Fecha a visão geral dos slides ou o painel de informações, ou abre o painel de informações |

Próximo e anterior permanecem dentro do conteúdo que está sendo reproduzido agora. Eles só voltam do último item para o primeiro quando a programação estiver configurada para repetir. Avançar rápido e Retroceder funcionam apenas durante um vídeo. Não fazem nada em um slide.

### Pulando para um slide

Pressione **Para cima** para abrir a visão geral dos slides. Ela mostra todos os itens da playlist ou lição atual. Mova até o que você quer e pressione **Selecionar** para ir direto para ele.

## Lições com ritmo do professor

Quando a programação está configurada como **Ritmo do professor**, os slides de imagem não avançam sozinhos. O professor avança com a **Seta para a direita**. Um vídeo é reproduzido até o fim e depois passa para o próximo item.

Uma lição com ritmo do professor permanece na tela além do horário de término agendado até que o professor chegue ao último slide e ele termine. Só então a tela passa para o que estiver agendado a seguir. Assim, uma aula que se estende além do previsto não é interrompida no meio da lição.

## Apresentando a partir de um navegador {#presenting-from-a-browser}

Você também pode reproduzir o calendário de uma tela em um navegador da web. No FreePlay Admin, abra a tela na página **Telas** e clique em **Apresentar no navegador**. O navegador segue o calendário da tela da mesma forma que a TV, e a barra de controles mostra o que vem a seguir. Use **Espaço** para pausar, **←** / **→** para pular, **F** para tela cheia e **Esc** para sair.

## Artigos relacionados

- **[Configurando o calendário](./scheduling-the-calendar)** - Defina o que é reproduzido e o que acontece quando termina mais cedo
- **[Gerenciando telas e grupos](./managing-screens)** - Verifique os downloads de cada tela no FreePlay Admin
- **[Reproduzindo conteúdo](../content-providers/playing-content)** - Controles do player quando você reproduz conteúdo manualmente
