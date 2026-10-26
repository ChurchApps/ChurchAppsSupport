---
title: "Configurações do aplicativo móvel"
---

# Configurações do aplicativo móvel

<div class="article-intro">

A página Configurações do aplicativo móvel permite configurar as abas de navegação que aparecem na **experiência mobile do B1.church (PWA)** para os membros da sua igreja. Você controla quais abas ficam visíveis, para onde elas direcionam e como são exibidas.

</div>

:::info O aplicativo B1 Mobile nativo está descontinuado
As abas configuradas aqui são entregues pelo [Progressive Web App (PWA) do B1.church](/docs/b1-church/getting-started/installing-pwa), que substituiu o aplicativo B1 Mobile nativo. Compartilhe com os membros a página de instalação da sua igreja, `https://yourchurchname.b1.church/mobile/install`. Ela os orienta na instalação do aplicativo no dispositivo, sem necessidade de baixar nada da App Store ou do Google Play.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão "Editar configurações da igreja". Consulte [Funções e permissões](./roles-permissions.md) se não tiver acesso.
- Configure primeiro as [Configurações da igreja](./church-settings.md), incluindo o nome da igreja e a identidade visual

</div>

## Acessando as configurações de navegação

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **Navegação** (`/mobile/navigation`).
3. A página Navegação exibe as abas atuais do aplicativo.

## Adicionando uma nova aba

1. Clique no botão **Adicionar aba** no topo da página.
2. Preencha os detalhes da aba:
   - **Nome**: o rótulo que aparece na aba (por exemplo, "Sermões" ou "Ofertar").
   - **Ícone**: clique no seletor de ícones para escolher um ícone para a aba.
   - **Imagem**: clique em **Selecionar imagem** (ou **Alterar imagem**) para dar uma foto à aba. Abas com foto aparecem como blocos de foto na tela inicial do aplicativo. Consulte [Blocos da tela inicial](#home-screen-tiles).
   - **Tipo de aba**: selecione entre opções como Bíblia, Transmissão ao vivo, Doação, Site e outras.
   - **URL**: informe o endereço da web para onde a aba deve direcionar.
   - **Visibilidade**: controla quem pode ver a aba (todos, somente membros etc.). Para uma aba **Diretório de membros**, isso controla apenas quem vê a própria aba. Quem pode abrir o diretório é definido por **Mostrar no diretório** na página Portal do membro (consulte [Configurações do diretório de membros e mensagens](#member-directory--messaging-settings)).
3. Clique em **Salvar aba** para adicioná-la ao aplicativo.

## Editando uma aba existente

1. Clique em qualquer aba existente na lista **Abas do aplicativo**.
2. Atualize o nome, o ícone, a URL, o tipo ou as configurações de visibilidade da aba.
3. Clique em **Salvar aba** para aplicar as alterações.

## Reordenando as abas

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Arraste e solte as abas na lista para reorganizá-las. A ordem exibida nesta página é a mesma que os membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando determinadas condições são atendidas. Por exemplo, uma aba de Transmissão ao vivo pode aparecer quando uma transmissão estiver ativa. As abas adicionadas manualmente dão a você controle total sobre o que os membros veem o tempo todo.
:::

:::tip
Mantenha a quantidade de abas gerenciável. Três a cinco abas funcionam bem para a maioria das igrejas. Abas demais podem tornar a navegação confusa para os membros.
:::

## Configurações do diretório de membros e mensagens

O item **Portal do membro**, na mesma seção Mobile, reúne as configurações que regem o diretório de membros e as mensagens privadas na experiência do B1.church:

- **Grupo de aprovação do diretório**: o grupo que revisa as atualizações do diretório de membros e as [solicitações de exclusão de conta](../profile/account-deletion.md) antes que entrem em vigor.
- **Mostrar no diretório**: quem pode abrir o diretório de membros e quem aparece nele: **Somente administradores**, **Membros e acima** (o padrão), **Frequentadores regulares e acima** ou **Visitantes e acima**. Pessoas com status de membresia abaixo do nível escolhido não veem o diretório e não aparecem nele. **Somente administradores** fecha o diretório para todos, exceto a equipe com a permissão Pessoas &gt; Ver (um status de membresia Equipe sozinho não basta), que sempre pode abrir o diretório e ver todos, independentemente desta configuração. Visitantes nunca são incluídos, pois quem se cadastra online começa como visitante.
- **Preferência de visibilidade**: define o padrão para toda a igreja, para os membros que ainda não escolheram a própria configuração. **Endereço**, **Telefone** e **E-mail** têm cada um sua própria lista suspensa, com os mesmos cinco níveis disponíveis em todos os lugares onde a visibilidade é configurada:
  - **Todos**: visível para qualquer pessoa, inclusive visitantes anônimos
  - **Membros**: visível somente para pessoas com registro de Membro ou Equipe
  - **Somente grupos**: visível somente para pessoas que compartilham um grupo com esta pessoa, além da equipe
  - **Meus líderes de grupo e equipe**: visível somente para líderes de um grupo do qual esta pessoa faz parte, além da equipe
  - **Somente equipe**: visível somente para a equipe (qualquer pessoa cujo status de membresia seja Equipe, ou que tenha a permissão Pessoas &gt; Ver), e para a própria pessoa

  "Equipe" nesses níveis significa qualquer pessoa cujo status de membresia seja Equipe ou que tenha a permissão Pessoas &gt; Ver. As alterações de grupo têm efeito imediato: quem entra em um grupo ou é nomeado líder de grupo pode ver os detalhes **Somente grupos** ou **Meus líderes de grupo e equipe** dos membros desse grupo, sem precisar sair e entrar novamente.

  Os membros podem substituir esses padrões para o próprio registro na aba **Privacidade** do perfil, no PWA do B1.church. Consulte [Editando seu perfil](/docs/b1-church/getting-started/me-page).
- **Idade mínima para mensagens privadas**: um controle de segurança infantil. O B1 não abre uma **nova** conversa privada quando qualquer uma das duas pessoas está abaixo dessa idade, com base na data de nascimento (o papel no domicílio é usado como alternativa quando não há data de nascimento registrada). Pessoas abaixo da idade continuam totalmente visíveis no diretório. Somente a mensagem direta é bloqueada, **nos dois sentidos**, para todos, inclusive a equipe. Conversas em grupo e mensagens aos pais de uma criança continuam funcionando. As opções são Desativada, 13, 16 ou 18; o padrão é **18**. As conversas existentes não são afetadas.

:::tip
Como a verificação de idade mínima depende das datas de nascimento, certifique-se de que as datas estejam preenchidas para as crianças da sua congregação. Esta configuração pertence à mesma família de controles de segurança infantil dos [controles de segurança do check-in](../attendance/checkin-safety.md).
:::

### Pedido de login na tela inicial

Visitantes que abrem a [tela inicial](/docs/b1-church/getting-started/navigating#home) do aplicativo sem fazer login veem um breve aviso, por padrão *"Entre para ver seus grupos, doações e muito mais."*, ao lado de um botão **Entrar**. As configurações **Pedido de login na tela inicial**, na mesma página Portal do membro (`/mobile/b1-mobile`), permitem alterá-lo:

- **Mostrar pedido de login na tela inicial do aplicativo**: desative esta opção para ocultar o aviso e o botão **Entrar** da tela inicial. Os visitantes ainda podem fazer login pelo menu do aplicativo.
- **Texto do pedido de login**: substitua o texto padrão pela sua própria mensagem (até 150 caracteres). Deixe em branco para usar o padrão. Esta caixa fica desabilitada enquanto o aviso estiver desativado.

Clique em **Salvar** para aplicar. Uma mensagem **Salvo** confirma a alteração. Ao salvar, as configurações em cache do aplicativo são atualizadas, e a mudança aparece na próxima vez que a tela inicial for carregada.

### Blocos da tela inicial

As abas que têm foto (consulte **Imagem** em [Adicionando uma nova aba](#adding-a-new-tab)) aparecem na [tela inicial](/docs/b1-church/getting-started/navigating#home) do aplicativo como blocos de foto, em uma seção com o nome da sua igreja. Isso inclui a aba Versículo do dia, se você lhe der uma foto. As abas com foto também continuam aparecendo na barra de abas.

A configuração **Blocos da tela inicial**, na mesma página Portal do membro (`/mobile/b1-mobile`), controla como esses blocos são organizados. Escolha um **Layout**:

- **Grade**: dois blocos por linha (o padrão). Quando o número de blocos é ímpar, o primeiro bloco ocupa a largura inteira.
- **Linha com rolagem**: uma única linha de blocos que os membros deslizam para os lados.
- **Rolagem (automática)**: a mesma linha lateral, mas que também se move sozinha, avançando um bloco a cada quatro segundos aproximadamente e voltando ao início no final. Ela pausa quando um membro toca, passa o mouse sobre a linha ou navega até ela com a tecla Tab, e retoma alguns segundos depois. Em dispositivos com a opção de reduzir movimento ativada, a linha fica parada e funciona como **Linha com rolagem**.
- **Lista**: uma lista com uma pequena miniatura da foto ao lado do nome de cada aba.

Clique em **Salvar** para aplicar.

### Seções da tela inicial

Membros conectados sempre veem o próprio histórico de presença e os formulários enviados na [página Eu](/docs/b1-church/getting-started/me-page). As opções **Seções da tela inicial**, na mesma página Portal do membro (`/mobile/b1-mobile`), podem exibir essas informações também na tela inicial:

- **Mostrar Minha presença na tela inicial**: adiciona uma seção **Minha presença** com o número de vezes que o membro compareceu nos últimos 90 dias, suas duas visitas mais recentes e um link **Histórico** para a lista completa de presenças.
- **Mostrar Meus formulários na tela inicial**: adiciona uma seção **Meus formulários** com os dois envios de formulário mais recentes do membro e um link **Todos os formulários**.

As duas opções vêm desativadas por padrão. Uma seção só aparece para membros conectados que tenham pelo menos um registro para exibir. Clique em **Salvar** para aplicar.

## Onde essas abas aparecem

As abas configuradas aqui são exibidas no **PWA do B1.church** que os membros instalam a partir de qualquer página em `https://yourchurchname.b1.church`. As alterações feitas nesta página são refletidas na próxima vez que um membro abrir o aplicativo.

Em um celular, a barra de abas inferior mostra **Início**, até três das suas abas e **Mais**. Em um computador, o cabeçalho mostra até cinco. As telas integradas (como Sermões, Ofertas ou Grupos) recebem os espaços primeiro, e as abas **Página interna** preenchem os espaços que sobrarem. As abas **URL externa** e **Versículo do dia** nunca recebem um espaço. Todas as abas, inclusive as que não cabem, aparecem na página **Mais** do aplicativo. Consulte [Navegando pelo B1App](/docs/b1-church/getting-started/navigating) para saber o que os membros veem. (As abas também são renderizadas pelo [aplicativo B1 Mobile nativo legado](/docs/b1-mobile/) para os membros que ainda o utilizam, mas esse aplicativo está descontinuado e não recebe mais atualizações.)

## Próximos passos

- [Configurações da igreja](./church-settings.md): configure as informações e a identidade visual da sua igreja
- [Funções e permissões](./roles-permissions.md): gerencie o acesso da sua equipe
