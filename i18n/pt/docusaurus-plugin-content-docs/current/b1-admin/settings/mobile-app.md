---
title: "Configurações do aplicativo móvel"
description: "Configure as abas de navegação, os blocos da tela inicial, a mensagem de login e as configurações de privacidade do diretório de membros do aplicativo de membros do B1.church no B1 Admin."
---

# Configurações do aplicativo móvel

<div class="article-intro">

A página Configurações do aplicativo móvel permite configurar as abas de navegação que aparecem na **experiência móvel do B1.church (PWA)** para os membros da sua igreja. Você controla quais abas ficam visíveis, para onde elas levam e como são exibidas.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="7x2CQG_pH6o" title="Personalizando o aplicativo de membros da sua igreja no B1" />

:::info
As abas configuradas aqui aparecem no aplicativo B1, que os membros podem [instalar como um Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Compartilhe com os membros a página de instalação da sua igreja — `https://yourchurchname.b1.church/mobile/install` — ela os orienta a instalar o aplicativo no próprio dispositivo, sem precisar baixar nada na App Store ou no Google Play.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão "Editar configurações da igreja". Veja [Funções e permissões](./roles-permissions.md) se você não tiver acesso.
- Configure primeiro as suas [Configurações da igreja](./church-settings.md), incluindo o nome e a identidade visual da igreja

</div>

## Acessando as configurações de navegação {#accessing-navigation-settings}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **Navegação** (`/mobile/navigation`). Você precisa da permissão **Editar conteúdo** para vê-la.
3. A lista **Abas do aplicativo** mostra as abas atuais na ordem em que aparecem, cada uma com sua visibilidade. As abas dentro de uma pasta ficam recuadas abaixo dela.

O menu Mobile também tem **Tema do aplicativo**, **Portal de membros**, **Check-in B1**, **Etiquetas** e **Notificações push**. O Tema do aplicativo e o Portal de membros são explicados abaixo; veja [Notificações push](#push-notifications) para agendar notificações.

## Adicionando uma nova aba {#adding-a-new-tab}

1. Clique no botão **Adicionar aba** no topo da página.
2. Preencha os detalhes da aba:
   - **Nome da aba** -- O texto que aparece na aba (por exemplo, "Sermões" ou "Doar").
   - **Ícone** -- Clique no seletor de ícones para escolher um ícone para a aba.
   - **Imagem** -- Clique em **Selecionar imagem** (ou **Trocar imagem**) para dar uma foto à aba. Abas com foto aparecem como blocos com foto na tela inicial do aplicativo -- veja [Blocos da tela inicial](#home-screen-tiles). Para retirar a foto, clique em **Remover imagem** e salve; a aba passa a aparecer como uma aba simples, e não como um bloco da tela inicial.
   - **Tipo de aba** -- **Bíblia**, **Transmissão ao vivo**, **Versículo do dia**, **Sermões**, **Check-in**, **Doação**, **Diretório de membros**, **Meus grupos**, **Oportunidades de voluntariado**, **Planos de culto**, **Inscrições**, **Solicitações**, **URL externa**, **Página interna** ou **Pasta**. **Inscrições** abre as inscrições em eventos do membro; **Solicitações** abre Minhas solicitações, onde o membro pode solicitar um evento e ver o status das solicitações anteriores. Para essas abas, defina a Visibilidade como Usuários conectados ou Membros e equipe, já que elas exigem um membro conectado.
   - **URL** -- Mostrado nas abas de **URL externa**: o endereço web que a aba abre.
   - **Página** -- Mostrado nas abas de **Página interna**: escolha uma das páginas do seu site.
   - **Aba pai** -- Coloque a aba dentro de uma aba **Pasta**, ou deixe em **Nenhuma (nível superior)**. Veja [Onde estas abas aparecem](#where-these-tabs-appear).
   - **Visibilidade** -- Quem pode ver esta aba: **Todos (inclusive anônimos)**, **Usuários conectados**, **Membros e equipe**, **Somente equipe**, **Membros da equipe de serviço** ou **Grupos específicos...** (depois marque os grupos). Para uma aba de **Diretório de membros**, isto controla apenas quem vê a própria aba; quem pode abrir o diretório é definido por **Exibir no diretório** na página Portal de membros (veja [Configurações do diretório de membros e de mensagens](#member-directory--messaging-settings)).
3. Clique em **Salvar aba** para adicioná-la ao seu aplicativo.

## Editando uma aba existente {#editing-an-existing-tab}

1. Clique no ícone de editar (lápis) em uma aba da lista **Abas do aplicativo**.
2. Atualize o nome, o ícone, a imagem, o tipo ou as configurações de visibilidade da aba.
3. Clique em **Salvar aba** para aplicar as alterações. Para remover a aba, clique em **Excluir aba**. Excluir uma pasta move as abas dela de volta para o nível superior.

## Reordenando as abas {#reordering-tabs}

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Use as setas **Mover para cima** e **Mover para baixo** de cada aba para reorganizá-las. As abas dentro de uma pasta se movem somente dentro dela. A ordem exibida nesta página corresponde à ordem que os membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando certas condições são atendidas -- por exemplo, a aba de Transmissão ao vivo pode surgir quando uma transmissão está ativa. As abas adicionadas manualmente dão a você controle total sobre o que os membros veem o tempo todo.
:::

:::tip
Mantenha o número de abas controlável. De três a cinco abas funcionam bem para a maioria das igrejas. Abas demais podem tornar a navegação confusa para os membros.
:::

## Tema do aplicativo {#app-theme}

**Mobile > Tema do aplicativo** (`/mobile/theme`) define as cores usadas pelo aplicativo B1, pelo portal de membros e pelo quiosque de check-in. Você precisa da permissão **Editar configurações da igreja**.

1. Expanda **Modo claro** ou **Modo escuro**.
2. Para cada cor -- **Fundo**, **Superfície**, **Primária**, **Contraste da primária** (texto nos botões e cabeçalhos de cor primária), **Secundária** e **Cor do texto** -- clique na amostra para escolher uma cor, ou digite-a na caixa **Hex**. A **Prévia** abaixo mostra um cabeçalho, um cartão e um botão nas suas cores.
3. Clique em **Salvar**.

Clique em **Restaurar padrões** para voltar às cores padrão. O tema **Personalizado** próprio do B1 Admin também usa a cor **Primária** do modo claro -- veja [Gerenciando seu perfil](../profile/managing-profile.md).

## Configurações do diretório de membros e de mensagens {#member-directory--messaging-settings}

O item **Portal de membros**, na mesma seção Mobile (`/mobile/b1-mobile`, com o título **Configurações do portal**), reúne as configurações que governam o diretório de membros e as mensagens privadas na experiência do B1.church. Você precisa da permissão **Editar configurações da igreja**. Altere qualquer uma das configurações abaixo e clique em **Salvar** na parte inferior da página:

- **Grupo de aprovação do diretório** -- O grupo que revisa as atualizações do diretório de membros, e as [solicitações de exclusão de conta](../profile/account-deletion.md), antes de elas terem efeito.
- **Exibir no diretório** -- Quem pode abrir o diretório de membros e quem aparece nele: **Somente administradores**, **Membros e acima** (o padrão), **Frequentadores regulares e acima** ou **Visitantes e acima**. Pessoas cuja situação de membro esteja abaixo do nível escolhido não veem o diretório e não aparecem nele. **Somente administradores** fecha o diretório para todos, exceto a equipe com a permissão Pessoas &gt; Visualizar (a situação de membro Equipe, sozinha, não basta), que sempre pode abrir o diretório e ver todos, independentemente desta configuração. Visitantes nunca são incluídos, já que quem se cadastra sozinho on-line começa como visitante.
- **Preferência de visibilidade** -- Define o padrão de toda a igreja para os membros que ainda não escolheram a própria configuração. **Endereço**, **Telefone** e **E-mail** têm cada um sua própria lista suspensa (todas começam em **Membros**), com os mesmos cinco níveis disponíveis em todos os lugares onde a visibilidade é configurada:
  - **Todos** -- visível para qualquer pessoa, inclusive visitantes anônimos
  - **Membros** -- visível somente para pessoas com um registro de Membro ou Equipe
  - **Apenas grupos** -- visível somente para pessoas que compartilham um grupo com esta pessoa, além da equipe
  - **Líderes dos meus grupos e equipe** -- visível somente para líderes de um grupo do qual esta pessoa faz parte, além da equipe
  - **Somente equipe** -- visível somente para a equipe (qualquer pessoa cuja situação de membro seja Equipe, ou que tenha a permissão Pessoas &gt; Visualizar), e para a própria pessoa

  "Equipe" nesses níveis significa qualquer pessoa cuja situação de membro seja Equipe ou que tenha a permissão Pessoas &gt; Visualizar. As alterações de grupo têm efeito imediato: quem entra em um grupo, ou é nomeado líder de um grupo, pode ver os dados **Apenas grupos** ou **Líderes dos meus grupos e equipe** dos membros desse grupo, sem precisar sair e entrar novamente.

  Os membros podem substituir esses padrões para o próprio cadastro pela aba **Privacidade** do perfil, no B1.church PWA -- veja [Editando seu perfil](/docs/b1-church/getting-started/me-page).
- **Idade mínima para mensagens privadas** -- Um controle de segurança infantil. O B1 não abre uma **nova** conversa de mensagem privada quando uma das pessoas está abaixo dessa idade, com base na data de nascimento (o papel na família é usado como alternativa quando não há data de nascimento cadastrada). As pessoas abaixo da idade continuam totalmente visíveis no diretório -- somente as mensagens diretas são bloqueadas, em **ambos os sentidos**, para todos, inclusive a equipe. Conversas em grupo e mensagens para os pais de uma criança continuam funcionando. As opções são Desativado, 13, 16 ou 18; o padrão é **18**. As conversas existentes não são afetadas.

:::tip
Como a verificação de idade mínima depende das datas de nascimento, certifique-se de que as datas estejam preenchidas para as crianças da sua congregação. Esta configuração pertence à mesma família de controles de segurança infantil dos [controles de segurança do check-in](../attendance/checkin-safety.md).
:::

### Mensagem de login na tela inicial {#home-screen-sign-in-prompt}

Visitantes que abrem a [tela inicial](/docs/b1-church/getting-started/navigating#home) do aplicativo sem fazer login veem uma mensagem curta -- por padrão, *"Entre para ver seus grupos, doações e muito mais."* -- ao lado de um botão **Entrar**. As configurações de **Mensagem de login na tela inicial**, na mesma página Portal de membros (`/mobile/b1-mobile`), permitem alterá-la:

- **Exibir mensagem de login na tela inicial do aplicativo** -- Desative para ocultar tanto a mensagem quanto o botão **Entrar** da tela inicial. Os visitantes ainda podem fazer login pelo menu do aplicativo.
- **Texto da mensagem de login** -- Substitua o texto padrão pela sua própria mensagem (até 150 caracteres). Deixe em branco para usar o padrão. Esta caixa fica desativada enquanto a mensagem estiver desligada.

Clique em **Salvar** para aplicar. Uma mensagem **Salvo** confirma a alteração. Salvar atualiza as configurações em cache do aplicativo, então a mudança aparece na próxima vez que a tela inicial for carregada.

### Blocos da tela inicial {#home-screen-tiles}

As abas que têm foto (veja **Imagem** em [Adicionando uma nova aba](#adding-a-new-tab)) aparecem na [tela inicial](/docs/b1-church/getting-started/navigating#home) do aplicativo como blocos com foto, em uma seção com o nome da sua igreja no cabeçalho. Isso inclui a aba Versículo do dia, se você der a ela uma foto. As abas com foto também continuam aparecendo na barra de abas.

A configuração **Blocos da tela inicial**, na mesma página Portal de membros (`/mobile/b1-mobile`), controla como esses blocos são organizados. Escolha um **Layout**:

- **Grade** -- Dois blocos por linha (o padrão). Quando o número de blocos é ímpar, o primeiro bloco ocupa a largura toda.
- **Linha com rolagem** -- Uma linha de blocos que os membros deslizam para os lados.
- **Rolagem (automática)** -- A mesma linha lateral, mas que também se move sozinha, avançando um bloco a cada quatro segundos e voltando ao primeiro bloco depois do último. Ela pausa enquanto um membro toca, passa o mouse ou navega com a tecla Tab até a linha, e retoma alguns segundos depois. Em dispositivos com a opção de reduzir movimento ativada, a linha fica parada e funciona como **Linha com rolagem**.
- **Lista** -- Uma lista com uma pequena miniatura da foto ao lado do nome de cada aba.
- **Grade e lista** -- As três primeiras abas com foto em grade, com o primeiro bloco ocupando a largura toda, e as três seguintes listadas abaixo, com uma pequena miniatura ao lado de cada nome. Quando há mais de três, o cabeçalho da seção mostra um link **Todas**, que abre a página **Mais** do aplicativo, listando todas as abas.
- **Rolagem (automática) e lista** -- Todas as abas com foto na linha de rolagem automática descrita acima, com as três primeiras também listadas abaixo, e o mesmo link **Todas** quando há mais de três.

Nos dois layouts com rolagem, quando há mais blocos do que cabem na largura da tela, aparece uma fileira de pontos abaixo dos blocos, um para cada bloco, com o ponto do bloco atual preenchido. Os membros podem tocar em um ponto para ir até aquele bloco.

Clique em **Salvar** para aplicar.

### Seções da tela inicial {#home-screen-sections}

Membros conectados sempre veem o próprio histórico de presença e os formulários enviados na [página Eu](/docs/b1-church/getting-started/me-page). As chaves de **Seções da tela inicial**, na mesma página Portal de membros (`/mobile/b1-mobile`), podem exibi-los também na tela inicial:

- **Mostrar Minha presença na início** -- Adiciona uma seção **Minha presença** com quantas vezes o membro compareceu nos últimos 90 dias, suas duas visitas mais recentes e um link **Histórico** para a lista completa de presenças dele.
- **Mostrar Meus formulários na início** -- Adiciona uma seção **Meus formulários** com os dois envios de formulário mais recentes do membro e um link **Todos os formulários**.

Ambas vêm desativadas por padrão. Uma seção só aparece para membros conectados que tenham pelo menos um registro para mostrar.

- **Mostrar Notícias na início** -- Adiciona uma seção **Notícias**, logo abaixo da saudação, que mostra suas cinco postagens publicadas mais recentes do [blog](../website/blog.md) como cartões com foto, em uma fileira que se move sozinha. Tocar em um cartão abre a postagem completa dentro do aplicativo, e um link **Todas as notícias** lista as postagens recentes. Depois de ativada, a opção **Somente esta categoria** permite escolher uma categoria do blog (por exemplo, *Anúncios*) para que apenas essas postagens apareçam; deixe em **Todas as postagens** para mostrar tudo. As notícias são exibidas para todos que abrem o aplicativo, conectados ou não, porque as postagens do blog são públicas no seu site. Vem desativada por padrão e só aparece quando há pelo menos uma postagem publicada.

Clique em **Salvar** para aplicar.

## Notificações push {#push-notifications}

**Mobile > Notificações push** (`/mobile/notifications`) envia ou agenda uma notificação push para as pessoas que têm o aplicativo B1 instalado com as notificações ativadas. Você precisa da permissão **Editar conteúdo** para enviar para todos, ou **Editar membros do grupo** para enviar para um grupo.

1. Clique em **Enviar notificação**.
2. Escolha o **Público**: **Todos com o aplicativo**, ou um dos seus grupos. O B1 mostra quantas pessoas a notificação alcançará e quantas desativaram as notificações push; você fica de fora das suas próprias notificações.
3. Digite um **Título** (até 80 caracteres) e uma **Mensagem** (até 240 caracteres), e opcionalmente um **URL do link ou do folheto** para abrir e um **URL da imagem** (os mesmos campos de uma [notificação de grupo](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Em **Quando**, mantenha **Enviar agora**, ou escolha **Agendar para depois** e selecione uma data e hora futuras em **Enviar em**.
5. Clique em **Enviar notificação** (ou **Agendar notificação**).

A página lista as notificações **Agendadas** (com **Editar**, **Enviar agora** e **Cancelar** em cada uma) e as **Recentes**, com o status de cada uma, como *Enviada: 12 de 15*, *Cancelada* ou *Perdida (o horário de envio passou)*. Clique em **Remover** para tirar uma notificação concluída da lista, ou em **Limpar tudo** para remover todas as enviadas, com falha e canceladas. Os horários são exibidos no [fuso horário](./church-settings.md#time-zone) da sua igreja, ou no do seu computador, caso a igreja não tenha um definido. Quem recebe uma notificação agendada é determinado novamente no momento do envio.

Uma notificação enviada com mais de 30 minutos de atraso, quando o B1 tenta enviá-la, é marcada como *Perdida* e não é enviada; uma que falha três vezes aparece como *Falhou*, com o erro. Remover uma notificação da lista não a retira de quem já a recebeu. Quando uma notificação não tem link, tocar nela abre a lista de notificações do aplicativo, no caso de uma notificação para toda a igreja, ou a página do grupo, no caso de uma notificação de grupo. Os membros que desativaram **Avisos da igreja** nas suas [preferências de notificação](../../b1-church/getting-started/notification-preferences.md) não recebem essas notificações, sejam elas enviadas para todos ou para um grupo.

## Onde estas abas aparecem {#where-these-tabs-appear}

As abas que você configura aqui são exibidas no **PWA do B1.church** que os seus membros instalam a partir de qualquer página de `https://yourchurchname.b1.church`. As alterações feitas nesta página são refletidas na próxima vez que um membro abrir o aplicativo.

No celular, a barra de abas inferior mostra **Início**, até três das suas abas e **Mais**; no computador, o cabeçalho mostra até cinco. As telas integradas (como Sermões, Doações ou Grupos) têm prioridade nesses espaços, e as abas de **Página interna** preenchem os espaços que sobrarem. As abas de **URL externa** e de **Versículo do dia** nunca ocupam um espaço. Todas as abas, inclusive as que não cabem, são listadas na página **Mais** do aplicativo.

As abas colocadas dentro de uma aba **Pasta** são a exceção: elas aparecem somente na própria tela da pasta, que os membros abrem tocando na pasta. Essa tela mostra cada aba que tem imagem como um banner com foto em largura total, com as abas sem imagem listadas abaixo delas. Uma pasta que não contenha abas que um membro possa ver fica oculta para esse membro. Veja [Abas de pasta](../../b1-church/getting-started/navigating.md#folder-tabs). Veja [Navegando no B1App](../../b1-church/getting-started/navigating.md) para saber o que os membros veem.

## Próximos passos {#next-steps}

- [Configurações da igreja](./church-settings.md) -- Configure as informações e a identidade visual da sua igreja
- [Funções e permissões](./roles-permissions.md) -- Gerencie o acesso da sua equipe
