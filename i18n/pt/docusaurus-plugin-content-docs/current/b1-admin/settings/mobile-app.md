---
title: "Configurações do aplicativo móvel"
description: "Configure as abas de navegação, os blocos da tela Início, o convite para entrar e as configurações de privacidade do diretório de membros do aplicativo B1.church no B1 Admin."
---

# Configurações do aplicativo móvel

<div class="article-intro">

A página Configurações do aplicativo móvel permite configurar as abas de navegação que aparecem na **experiência móvel do B1.church (PWA)** para os membros da sua igreja. Você controla quais abas ficam visíveis, para onde elas direcionam e como são exibidas.

</div>

## Vídeo de treinamento

<YouTube id="ydY7WGK16fE" title="Personalizando o Aplicativo de Membros da Sua Igreja no B1" />

:::info
As abas configuradas aqui aparecem no aplicativo B1, que os membros podem [instalar como um Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Compartilhe com os membros a página de instalação da sua igreja — `https://yourchurchname.b1.church/mobile/install`. Ela os orienta na instalação do aplicativo no dispositivo, sem necessidade de baixar nada da App Store ou do Google Play.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão "Editar configurações da igreja". Veja [Funções e permissões](./roles-permissions.md) se você não tiver acesso.
- Configure primeiro as suas [Configurações da igreja](./church-settings.md), incluindo o nome e a identidade visual da igreja

</div>

## Acessando as configurações de navegação

1. No B1 Admin, abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **Navegação** (`/mobile/navigation`).
3. A página de Navegação exibe as abas atuais do seu aplicativo.

## Adicionando uma nova aba {#adding-a-new-tab}

1. Clique no botão **Adicionar aba** no topo da página.
2. Preencha os detalhes da aba:
   - **Nome** -- O rótulo que aparece na aba (por exemplo, "Sermões" ou "Doar").
   - **Ícone** -- Clique no seletor de ícones para escolher um ícone para a aba.
   - **Imagem** -- Clique em **Selecionar imagem** (ou **Trocar imagem**) para dar uma foto à aba. As abas com foto aparecem como blocos de foto na tela Início do aplicativo -- veja [Blocos da tela Início](#home-screen-tiles).
   - **Tipo de aba** -- Escolha entre opções como Bíblia, Transmissão ao vivo, Doação, Inscrições, Solicitações, Site e outras. **Inscrições** abre as inscrições em eventos do membro; **Solicitações** abre Minhas solicitações, em que o membro pode pedir um evento e ver o status das solicitações anteriores. Defina a visibilidade como Usuários conectados ou Membros e equipe para essas opções, já que elas exigem um membro conectado.
   - **URL** -- Digite o endereço da web para o qual a aba deve direcionar.
   - **Visibilidade** -- Controle quem pode ver esta aba (todos, somente membros etc.). Para uma aba **Diretório de membros**, isso controla apenas quem vê a própria aba; quem pode abrir o diretório é definido pela opção **Mostrar no diretório** na página Portal do membro (veja [Configurações do diretório de membros e mensagens](#member-directory--messaging-settings)).
3. Clique em **Salvar aba** para adicioná-la ao seu aplicativo.

## Editando uma aba existente

1. Clique em qualquer aba existente na lista **Abas do aplicativo**.
2. Atualize o nome, o ícone, a URL, o tipo ou as configurações de visibilidade da aba.
3. Clique em **Salvar aba** para aplicar as alterações.

## Reordenando as abas

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Arraste e solte as abas na lista para reorganizá-las. A ordem exibida nesta página é a mesma que os membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando certas condições são atendidas -- por exemplo, uma aba de Transmissão ao vivo pode aparecer quando uma transmissão está ativa. As abas adicionadas manualmente dão a você controle total sobre o que os membros veem o tempo todo.
:::

:::tip
Mantenha a quantidade de abas sob controle. Três a cinco abas funcionam bem para a maioria das igrejas. Abas demais podem tornar a navegação confusa para os membros.
:::

## Configurações do diretório de membros e mensagens {#member-directory--messaging-settings}

O item **Portal do membro**, na mesma seção Mobile, reúne as configurações que regem o diretório de membros e as mensagens privadas na experiência do B1.church:

- **Grupo de aprovação do diretório** -- O grupo que revisa as atualizações do diretório de membros e as [solicitações de exclusão de conta](../profile/account-deletion.md) antes que entrem em vigor.
- **Mostrar no diretório** -- Quem pode abrir o diretório de membros e quem aparece nele: **Somente administradores**, **Membros e acima** (o padrão), **Frequentadores regulares e acima** ou **Visitantes e acima**. Pessoas cuja situação de membro esteja abaixo do nível escolhido não veem o diretório e não aparecem nele. **Somente administradores** fecha o diretório para todos, exceto para a equipe com a permissão Pessoas > Visualizar (a situação de membro Equipe, sozinha, não basta), que sempre pode abrir o diretório e ver todos, independentemente desta configuração. Convidados nunca são incluídos, já que quem se cadastra online começa como convidado.
- **Preferência de visibilidade** -- Define o padrão da igreja para os membros que ainda não escolheram a própria configuração. **Endereço**, **Número de telefone** e **E-mail** têm, cada um, seu próprio menu suspenso, com os mesmos cinco níveis disponíveis em todos os lugares onde a visibilidade é configurada:
  - **Todos** -- visível para qualquer pessoa, inclusive visitantes anônimos
  - **Membros** -- visível somente para pessoas com registro de Membro ou Equipe
  - **Somente grupos** -- visível somente para pessoas que compartilham um grupo com esta pessoa, além da equipe
  - **Líderes dos meus grupos e equipe** -- visível somente para os líderes de um grupo do qual esta pessoa participa, além da equipe
  - **Somente equipe** -- visível somente para a equipe (qualquer pessoa cuja situação de membro seja Equipe, ou que tenha a permissão Pessoas > Visualizar) e para a própria pessoa

  "Equipe", nesses níveis, significa qualquer pessoa cuja situação de membro seja Equipe ou que tenha a permissão Pessoas > Visualizar. As alterações de grupo entram em vigor imediatamente: quem entra em um grupo, ou é designado líder de um grupo, pode ver os detalhes **Somente grupos** ou **Líderes dos meus grupos e equipe** dos membros desse grupo, sem precisar sair e entrar de novo.

  Os membros podem substituir esses padrões para o próprio registro pela aba **Privacidade** do perfil no PWA do B1.church -- veja [Editando seu perfil](/docs/b1-church/getting-started/me-page).
- **Idade mínima para mensagens privadas** -- Um controle de segurança infantil. O B1 não abre uma **nova** conversa de mensagem privada quando qualquer uma das pessoas está abaixo dessa idade, com base na data de nascimento (o papel no domicílio é usado como alternativa quando não há data de nascimento cadastrada). Pessoas abaixo da idade continuam totalmente visíveis no diretório -- somente a mensagem direta é bloqueada, nos **dois sentidos**, para todos, inclusive a equipe. Conversas em grupo e mensagens aos pais de uma criança continuam funcionando. As opções são Desativado, 13, 16 ou 18; o padrão é **18**. As conversas existentes não são afetadas.

:::tip
Como a verificação de idade mínima depende das datas de nascimento, certifique-se de que elas estejam preenchidas para as crianças da sua congregação. Esta configuração faz parte da mesma família de controles de segurança infantil dos [controles de segurança do check-in](../attendance/checkin-safety.md).
:::

### Convite para entrar na tela Início {#home-screen-sign-in-prompt}

Visitantes que abrem a [tela Início](/docs/b1-church/getting-started/navigating#home) do aplicativo sem entrar veem um breve convite -- por padrão, *"Entre para ver seus grupos, doações e muito mais."* -- ao lado de um botão **Entrar**. As configurações de **convite para entrar na tela Início**, na mesma página Portal do membro (`/mobile/b1-mobile`), permitem alterá-lo:

- **Mostrar convite para entrar na tela inicial do aplicativo** -- Desative esta opção para ocultar da tela Início tanto o convite quanto o botão **Entrar**. Os visitantes ainda podem entrar pelo menu do aplicativo.
- **Texto do convite para entrar** -- Substitua o texto padrão pela sua própria mensagem (até 150 caracteres). Deixe em branco para usar o padrão. Esta caixa fica desativada enquanto o convite estiver desligado.

Clique em **Salvar** para aplicar. Uma mensagem **Salvo** confirma a alteração. Salvar atualiza as configurações em cache do aplicativo, então a mudança aparece na próxima vez que a tela Início for carregada.

### Blocos da tela Início {#home-screen-tiles}

As abas que têm uma foto (veja **Imagem** em [Adicionando uma nova aba](#adding-a-new-tab)) aparecem na [tela Início](/docs/b1-church/getting-started/navigating#home) do aplicativo como blocos de foto, em uma seção com o nome da sua igreja. Isso inclui a aba Versículo do dia, caso você lhe dê uma foto. As abas com foto continuam aparecendo também na barra de abas.

A configuração **Blocos da tela Início**, na mesma página Portal do membro (`/mobile/b1-mobile`), controla como esses blocos são organizados. Escolha um **Layout**:

- **Grade** -- Dois blocos por linha (o padrão). Quando a quantidade de blocos é ímpar, o primeiro bloco ocupa a largura total.
- **Linha com rolagem** -- Uma linha de blocos que os membros deslizam para os lados.
- **Rolagem (automática)** -- A mesma linha lateral, mas que também se move sozinha, avançando um bloco a cada quatro segundos aproximadamente e voltando ao primeiro bloco depois do último. Ela pausa quando um membro toca, passa o cursor sobre ela ou navega até a linha com a tecla Tab, e retoma alguns segundos depois. Em dispositivos configurados para reduzir movimento, a linha fica parada e funciona como **Linha com rolagem**.
- **Lista** -- Uma lista com uma pequena miniatura da foto ao lado do nome de cada aba.
- **Grade e lista** -- As três primeiras abas com foto em grade, com o primeiro bloco ocupando a largura total, e as demais listadas abaixo, com uma pequena miniatura ao lado de cada nome. Quando há mais de três, o título da seção mostra um link **Todas**, que abre a página **Mais** do aplicativo, com todas as abas.
- **Rolagem (automática) e lista** -- As três primeiras abas com foto na linha de rolagem automática descrita acima, e as demais listadas abaixo, com o mesmo link **Todas**.

Nos dois layouts com rolagem, quando há mais blocos do que cabem na largura da tela, aparece uma fileira de pontos abaixo dos blocos, um para cada bloco, com o ponto do bloco atual preenchido. Os membros podem tocar em um ponto para ir até aquele bloco.

Clique em **Salvar** para aplicar.

### Seções da tela Início {#home-screen-sections}

Membros conectados sempre veem o próprio histórico de presença e os formulários enviados na [página Eu](/docs/b1-church/getting-started/me-page). As opções **Seções da tela Início**, na mesma página Portal do membro (`/mobile/b1-mobile`), podem mostrar esses itens também na tela Início:

- **Mostrar minha presença no início** -- Adiciona a seção **Minha presença**, com quantas vezes o membro compareceu nos últimos 90 dias, suas duas visitas mais recentes e um link **Histórico** para a lista completa de presenças.
- **Mostrar meus formulários no início** -- Adiciona a seção **Meus formulários**, com os dois envios de formulário mais recentes do membro e um link **Todos os formulários**.

As duas opções vêm desativadas por padrão. Uma seção só aparece para membros conectados que tenham pelo menos um registro para exibir.

- **Mostrar notícias no início** -- Adiciona a seção **Notícias** logo abaixo da saudação, com as cinco postagens mais recentes publicadas do [blog](../website/blog.md) como cartões com foto, em uma fileira que se move sozinha. Tocar em um cartão abre a postagem completa dentro do aplicativo, e um link **Todas as notícias** lista as postagens recentes. Depois de ativada, a opção **Somente esta categoria** permite escolher uma categoria do blog (por exemplo, *Avisos*) para que só essas postagens apareçam; deixe em **Todas as postagens** para mostrar tudo. As notícias aparecem para todos que abrem o aplicativo, conectados ou não, porque as postagens do blog são públicas no seu site. A opção vem desativada por padrão e só aparece quando há pelo menos uma postagem publicada.

Clique em **Salvar** para aplicar.

## Onde essas abas aparecem

As abas que você configura aqui são exibidas no **PWA do B1.church**, que os seus membros instalam a partir de qualquer página em `https://yourchurchname.b1.church`. As alterações feitas nesta página são refletidas na próxima vez que um membro abrir o aplicativo.

Em um celular, a barra de abas inferior mostra **Início**, até três das suas abas e **Mais**; em um computador, o cabeçalho mostra até cinco. As telas integradas (como Sermões, Doações ou Grupos) recebem essas posições primeiro, e as abas de **Página interna** preenchem as posições que sobrarem. As abas de **URL externa** e de **Versículo do dia** nunca recebem uma posição. Todas as abas, inclusive as que não cabem, aparecem na página **Mais** do aplicativo.

As abas colocadas dentro de uma aba **Pasta** são a exceção: elas aparecem somente na tela da própria pasta, que os membros abrem tocando nela. Essa tela mostra as abas como blocos de foto quando todas têm imagem, ou como lista caso contrário. Uma pasta que não tenha abas visíveis para um membro fica oculta para ele. Veja [Abas de pasta](../../b1-church/getting-started/navigating.md#folder-tabs). Veja [Navegando pelo B1App](../../b1-church/getting-started/navigating.md) para saber o que os membros veem.

## Tema do aplicativo

Em **Mobile > Tema do aplicativo**, defina as cores do aplicativo da sua igreja para os modos **Claro** e **Escuro**: **Fundo**, **Superfície**, **Primária**, **Contraste da primária**, **Secundária** e **Cor do texto**. Escolha uma cor na amostra ou digite o valor no campo **Hex** ao lado (por exemplo, `#1565C0`; o `#` é opcional). Uma cor digitada é aplicada quando os seis dígitos hexadecimais são informados.

## Notificações push

Para enviar ou agendar notificações push para todos que têm o seu aplicativo ou para um grupo, use **Mobile > Notificações push**. Veja [Notificações push](./push-notifications.md).

## Próximos passos

- [Configurações da igreja](./church-settings.md) -- Configure as informações e a identidade visual da sua igreja
- [Funções e permissões](./roles-permissions.md) -- Gerencie o acesso da sua equipe
