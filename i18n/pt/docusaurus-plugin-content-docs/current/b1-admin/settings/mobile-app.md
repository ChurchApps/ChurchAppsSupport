---
title: "Configurações do Aplicativo Móvel"
description: "Configure as abas de navegação, os blocos da tela Início, o convite para entrar e as configurações de privacidade do diretório de membros do aplicativo B1.church para membros no B1 Admin."
---

# Configurações do Aplicativo Móvel

<div class="article-intro">

A página Configurações do Aplicativo Móvel permite configurar as abas de navegação que aparecem na **experiência móvel B1.church (PWA)** para os membros da sua igreja. Você controla quais abas ficam visíveis, para onde elas direcionam e como são exibidas.

</div>

## Vídeo de Treinamento

<YouTube id="ydY7WGK16fE" title="Personalizando o Aplicativo de Membros da Sua Igreja no B1" />

:::info
As abas configuradas aqui aparecem no B1 App, que os membros podem [instalar como um Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Compartilhe com os membros a página de instalação da sua igreja — `https://yourchurchname.b1.church/mobile/install` — ela os orienta na instalação do aplicativo no dispositivo, sem necessidade de baixar nada da App Store ou do Google Play.
:::

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](./roles-permissions.md) caso não tenha acesso.
- Configure primeiro as suas [Configurações da Igreja](./church-settings.md), incluindo o nome da igreja e a identidade visual

</div>

## Acessando as Configurações de Navegação

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **Navegação** (`/mobile/navigation`).
3. A página de Navegação exibe as abas atuais do seu aplicativo.

## Adicionando uma Nova Aba

1. Clique no botão **Adicionar Aba** no topo da página.
2. Preencha os detalhes da aba:
   - **Nome** -- O rótulo que aparece na aba (por exemplo, "Sermões" ou "Ofertar").
   - **Ícone** -- Clique no seletor de ícones para escolher um ícone para a aba.
   - **Imagem** -- Clique em **Selecionar Imagem** (ou **Alterar Imagem**) para dar uma foto à aba. Abas com foto aparecem como blocos de foto na tela Início do aplicativo -- veja [Blocos da Tela Início](#home-screen-tiles).
   - **Tipo de Aba** -- Selecione entre opções como Bíblia, Transmissão ao Vivo, Doação, Site e outras.
   - **URL** -- Insira o endereço da web para o qual a aba deve direcionar.
   - **Visibilidade** -- Controle quem pode ver esta aba (todos, somente membros etc.). Para uma aba **Diretório de Membros**, isso controla apenas quem vê a própria aba; quem pode abrir o diretório é definido pela opção **Mostrar no Diretório** na página Portal do Membro (veja [Configurações do Diretório de Membros e Mensagens](#member-directory--messaging-settings)).
3. Clique em **Salvar Aba** para adicioná-la ao seu aplicativo.

## Editando uma Aba Existente

1. Clique em qualquer aba existente na lista **Abas do Aplicativo**.
2. Atualize o nome, o ícone, a URL, o tipo ou as configurações de visibilidade da aba.
3. Clique em **Salvar Aba** para aplicar as alterações.

## Reordenando as Abas

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Arraste e solte as abas na lista para reorganizá-las. A ordem exibida nesta página é a mesma que os membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando certas condições são atendidas -- por exemplo, uma aba de Transmissão ao Vivo pode aparecer quando uma transmissão está ativa. As abas adicionadas manualmente dão a você controle total sobre o que os membros veem o tempo todo.
:::

:::tip
Mantenha a quantidade de abas sob controle. Entre três e cinco abas funciona bem para a maioria das igrejas. Abas demais podem tornar a navegação confusa para os membros.
:::

## Configurações do Diretório de Membros e Mensagens

O item **Portal do membro**, na mesma seção Mobile, reúne as configurações que regem o diretório de membros e as mensagens privadas na experiência B1.church:

- **Grupo de Aprovação do Diretório** -- O grupo que revisa as atualizações do diretório de membros e as [solicitações de exclusão de conta](../profile/account-deletion.md) antes que entrem em vigor.
- **Mostrar no Diretório** -- Quem pode abrir o diretório de membros e quem nele aparece: **Somente Administradores**, **Membros e Acima** (o padrão), **Frequentadores Regulares e Acima** ou **Visitantes e Acima**. Pessoas cujo status de membro esteja abaixo do nível escolhido não veem o diretório e não aparecem nele. **Somente Administradores** fecha o diretório para todos, exceto para a equipe com a permissão People &gt; Visualizar (um status de membro de Equipe, sozinho, não é suficiente), que sempre pode abrir o diretório e ver todos, independentemente desta configuração. Visitantes nunca são incluídos, já que quem se cadastra online começa como visitante.
- **Preferência de Visibilidade** -- Define o padrão de toda a igreja para membros que ainda não escolheram a própria configuração. **Endereço**, **Número de Telefone** e **E-mail** têm, cada um, seu próprio menu suspenso, com os mesmos cinco níveis disponíveis em todos os lugares onde a visibilidade é configurada:
  - **Todos** -- visível para qualquer pessoa, inclusive visitantes anônimos
  - **Membros** -- visível somente para pessoas com registro de Membro ou de Equipe
  - **Somente Grupos** -- visível somente para pessoas que compartilham um grupo com esta pessoa, além da equipe
  - **Líderes dos Meus Grupos e Equipe** -- visível somente para líderes de um grupo do qual esta pessoa faz parte, além da equipe
  - **Somente Equipe** -- visível somente para a equipe (qualquer pessoa cujo status de membro seja Equipe, ou que tenha a permissão People &gt; Visualizar), e para a própria pessoa

  "Equipe" nesses níveis significa qualquer pessoa cujo status de membro seja Equipe ou que tenha a permissão People &gt; Visualizar. As alterações de grupo entram em vigor imediatamente: quem entra em um grupo, ou é nomeado líder de grupo, pode ver os detalhes **Somente Grupos** ou **Líderes dos Meus Grupos e Equipe** dos membros desse grupo, sem precisar sair e entrar novamente.

  Os membros podem substituir esses padrões para o próprio registro na aba **Privacidade** do perfil no PWA do B1.church -- veja [Editando Seu Perfil](/docs/b1-church/getting-started/me-page).
- **Idade Mínima para Mensagens Privadas** -- Um controle de segurança infantil. O B1 não abre uma **nova** conversa de mensagem privada quando qualquer uma das pessoas está abaixo dessa idade, com base na data de nascimento (o papel no domicílio é usado como alternativa quando não há data de nascimento registrada). Pessoas abaixo da idade continuam totalmente visíveis no diretório -- somente a mensagem direta é bloqueada, em **ambas as direções**, para todos, inclusive a equipe. Conversas em grupo e mensagens aos pais de uma criança continuam funcionando. As opções são Desativado, 13, 16 ou 18; o padrão é **18**. Conversas existentes não são afetadas.

:::tip
Como a verificação de idade mínima depende das datas de nascimento, certifique-se de que elas estejam preenchidas para as crianças da sua congregação. Esta configuração pertence à mesma família de controles de segurança infantil dos [controles de segurança do check-in](../attendance/checkin-safety.md).
:::

### Convite para Entrar na Tela Início

Visitantes que abrem a [tela Início](/docs/b1-church/getting-started/navigating#home) do aplicativo sem entrar veem um breve convite -- por padrão, *"Entre para ver seus grupos, ofertas e muito mais."* -- ao lado de um botão **Entrar**. As configurações de **convite para entrar na tela Início**, na mesma página Portal do Membro (`/mobile/b1-mobile`), permitem alterá-lo:

- **Mostrar convite para entrar na tela inicial do aplicativo** -- Desative esta opção para ocultar o convite e o botão **Entrar** da tela Início. Os visitantes ainda podem entrar pelo menu do aplicativo.
- **Texto do convite para entrar** -- Substitua o texto padrão pela sua própria mensagem (até 150 caracteres). Deixe em branco para usar o padrão. Esta caixa fica desativada enquanto o convite estiver desligado.

Clique em **Salvar** para aplicar. Uma mensagem **Salvo** confirma a alteração. Salvar atualiza as configurações em cache do aplicativo, então a mudança aparece na próxima vez que a tela Início for carregada.

### Blocos da Tela Início

Abas que têm uma foto (veja **Imagem** em [Adicionando uma Nova Aba](#adding-a-new-tab)) aparecem na [tela Início](/docs/b1-church/getting-started/navigating#home) do aplicativo como blocos de foto, em uma seção com o nome da sua igreja. Isso inclui a aba Versículo do Dia, caso você lhe dê uma foto. As abas com foto continuam aparecendo também na barra de abas.

A configuração **Blocos da tela Início**, na mesma página Portal do Membro (`/mobile/b1-mobile`), controla como esses blocos são organizados. Escolha um **Layout**:

- **Grade** -- Dois blocos por linha (o padrão). Quando a quantidade de blocos é ímpar, o primeiro bloco ocupa a largura total.
- **Linha com rolagem** -- Uma linha de blocos que os membros deslizam para os lados.
- **Rolagem (automática)** -- A mesma linha lateral, mas que também se move sozinha, avançando um bloco a cada quatro segundos aproximadamente e voltando ao primeiro bloco depois do último. Ela pausa quando um membro toca, passa o cursor sobre ela ou navega até a linha com a tecla Tab, e retoma alguns segundos depois. Em dispositivos configurados para reduzir movimento, a linha fica parada e funciona como **Linha com rolagem**.
- **Lista** -- Uma lista com uma pequena miniatura da foto ao lado do nome de cada aba.

Nos dois layouts com rolagem, quando há mais blocos do que cabem na largura da tela, aparece uma fileira de pontos abaixo dos blocos, um para cada bloco, com o ponto do bloco atual preenchido. Os membros podem tocar em um ponto para ir até aquele bloco.

Clique em **Salvar** para aplicar.

### Seções da Tela Início

Membros que entraram sempre veem o próprio histórico de presença e os formulários enviados na [página Eu](/docs/b1-church/getting-started/me-page). As opções **Seções da tela Início**, na mesma página Portal do Membro (`/mobile/b1-mobile`), podem mostrar esses itens também na tela Início:

- **Mostrar Minha Presença no Início** -- Adiciona a seção **Minha Presença**, com quantas vezes o membro compareceu nos últimos 90 dias, suas duas visitas mais recentes e um link **Histórico** para a lista completa de presenças.
- **Mostrar Meus Formulários no Início** -- Adiciona a seção **Meus Formulários**, com os dois envios de formulário mais recentes do membro e um link **Todos os formulários**.

As duas opções vêm desativadas por padrão. Uma seção só aparece para membros que entraram e têm pelo menos um registro para exibir. Clique em **Salvar** para aplicar.

## Onde Essas Abas Aparecem

As abas que você configura aqui são exibidas no **PWA do B1.church**, que seus membros instalam a partir de qualquer página em `https://yourchurchname.b1.church`. As alterações feitas nesta página são refletidas na próxima vez que um membro abrir o aplicativo.

Em um celular, a barra de abas inferior mostra **Início**, até três das suas abas e **Mais**; em um computador, o cabeçalho mostra até cinco. As telas integradas (como Sermões, Ofertas ou Grupos) recebem essas posições primeiro, e as abas de **Página Interna** preenchem as posições que sobrarem. As abas de **URL Externa** e de **Versículo do Dia** nunca recebem uma posição. Todas as abas, inclusive as que não cabem, aparecem na página **Mais** do aplicativo.

As abas colocadas dentro de uma aba **Pasta** são a exceção: elas aparecem somente na tela da própria pasta, que os membros abrem tocando na pasta. Essa tela mostra as abas como blocos de foto quando todas têm imagem, ou como lista caso contrário. Uma pasta que não contenha abas visíveis para um membro fica oculta para ele. Veja [Abas de Pasta](../../b1-church/getting-started/navigating.md#folder-tabs). Veja [Navegando pelo B1App](../../b1-church/getting-started/navigating.md) para saber o que os membros veem.

## Próximos Passos

- [Configurações da Igreja](./church-settings.md) -- Configure as informações e a identidade visual da sua igreja
- [Funções e Permissões](./roles-permissions.md) -- Gerencie o acesso da sua equipe
