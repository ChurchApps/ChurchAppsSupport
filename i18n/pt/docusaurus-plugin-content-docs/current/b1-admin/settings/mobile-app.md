---
title: "Configurações do aplicativo móvel"
---

# Configurações do aplicativo móvel

<div class="article-intro">

A página Configurações do aplicativo móvel permite configurar as abas de navegação que aparecem na **experiência mobile do B1.church (PWA)** para os membros da sua igreja. Você controla quais abas ficam visíveis, para onde elas direcionam e como são exibidas.

</div>

## Vídeo de treinamento

<YouTube id="ydY7WGK16fE" title="Customizing Your Church's Member App in B1" />

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

## Adicionando uma nova aba {#adding-a-new-tab}

1. Clique no botão **Adicionar aba** no topo da página.
2. Preencha os detalhes da aba:
   - **Nome** -- O rótulo que aparece na aba (por exemplo, "Sermões" ou "Ofertar").
   - **Ícone** -- Clique no seletor de ícones para escolher um ícone para a aba.
   - **Imagem** -- Clique em **Selecionar imagem** (ou **Alterar imagem**) para dar uma foto à aba. Abas com foto aparecem como blocos de foto na tela inicial do aplicativo -- consulte [Blocos da tela inicial](#home-screen-tiles).
   - **Tipo de aba** -- Selecione entre opções como Bíblia, Transmissão ao vivo, Doação, Site e outras.
   - **URL** -- Digite o endereço web para o qual a aba deve direcionar.
   - **Visibilidade** -- Controla quem pode ver a aba (todos, somente membros etc.). Para uma aba **Diretório de membros**, isso controla apenas quem vê a própria aba; quem pode abrir o diretório é definido por **Mostrar no diretório** na página Portal do membro (consulte [Configurações do diretório de membros e mensagens](#member-directory--messaging-settings)).
3. Clique em **Salvar aba** para adicionar a aba ao seu aplicativo.

## Editando uma aba existente

1. Clique em qualquer aba existente na lista **Abas do aplicativo**.
2. Atualize o nome, o ícone, a URL, o tipo ou as configurações de visibilidade da aba.
3. Clique em **Salvar aba** para aplicar as alterações.

## Reordenando abas

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Arraste e solte as abas na lista para reorganizá-las. A ordem exibida nesta página corresponde à ordem que os seus membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando determinadas condições são atendidas -- por exemplo, uma aba de Transmissão ao vivo pode surgir quando uma transmissão está ativa. As abas adicionadas manualmente dão a você controle total sobre o que os membros veem o tempo todo.
:::

:::tip
Mantenha o número de abas sob controle. Três a cinco abas funcionam bem para a maioria das igrejas. Muitas abas podem tornar a navegação confusa para os membros.
:::

## Configurações do diretório de membros e mensagens {#member-directory--messaging-settings}

O item **Portal do membro**, na mesma seção Mobile, reúne as configurações que regem o diretório de membros e as mensagens privadas na experiência do B1.church:

- **Grupo de aprovação do diretório** -- O grupo que revisa as atualizações do diretório de membros e as [solicitações de exclusão de conta](../profile/account-deletion.md) antes que entrem em vigor.
- **Mostrar no diretório** -- Quem pode abrir o diretório de membros e quem está listado nele: **Somente administradores**, **Membros e acima** (o padrão), **Frequentadores regulares e acima** ou **Visitantes e acima**. Pessoas cujo status de membresia está abaixo do nível escolhido não veem o diretório nem aparecem nele. **Somente administradores** fecha o diretório para todos, exceto a equipe com a permissão Pessoas > Ver (o status de membresia Equipe, sozinho, não basta), que sempre pode abrir o diretório e ver todos, independentemente desta configuração. Visitantes nunca são incluídos, já que qualquer pessoa que se cadastra online começa como visitante.
- **Preferência de visibilidade** -- Define o padrão de toda a igreja para os membros que ainda não escolheram a própria configuração. **Endereço**, **Telefone** e **E-mail** têm, cada um, sua própria lista suspensa, com os mesmos cinco níveis disponíveis em todos os pontos onde a visibilidade é configurada:
  - **Todos** -- visível para qualquer pessoa, inclusive visitantes anônimos
  - **Membros** -- visível somente para pessoas com um registro de Membro ou Equipe
  - **Somente grupos** -- visível somente para pessoas que compartilham um grupo com esta pessoa, mais a equipe
  - **Líderes dos meus grupos e equipe** -- visível somente para líderes de um grupo do qual esta pessoa participa, mais a equipe
  - **Somente equipe** -- visível somente para a equipe (quem tem status de membresia Equipe ou a permissão Pessoas > Ver) e para a própria pessoa

  "Equipe" nesses níveis significa qualquer pessoa cujo status de membresia seja Equipe ou que tenha a permissão Pessoas > Ver. As alterações de grupo entram em vigor imediatamente: quem entra em um grupo, ou é nomeado líder de um grupo, passa a ver os detalhes **Somente grupos** ou **Líderes dos meus grupos e equipe** dos membros desse grupo, sem precisar sair e entrar de novo.

  Os membros podem substituir esses padrões no próprio registro pela aba **Privacidade** do perfil no PWA do B1.church -- consulte [Editando seu perfil](/docs/b1-church/getting-started/me-page).
- **Idade mínima para mensagens privadas** -- Um controle de segurança infantil. O B1 não abre uma **nova** conversa privada quando uma das pessoas está abaixo dessa idade, com base na data de nascimento (a função na família é usada como alternativa quando não há data de nascimento cadastrada). Pessoas abaixo dessa idade continuam totalmente visíveis no diretório -- somente o envio de mensagens diretas é bloqueado, **nos dois sentidos**, para todos, inclusive a equipe. Conversas em grupo e mensagens para os pais de uma criança continuam funcionando. As opções são Desligado, 13, 16 ou 18; o padrão é **18**. Conversas existentes não são afetadas.

:::tip
Como a verificação de idade mínima depende das datas de nascimento, certifique-se de que as datas de nascimento estejam preenchidas para as crianças da sua congregação. Esta configuração faz parte da mesma família de controles de segurança infantil dos [controles de segurança do check-in](../attendance/checkin-safety.md).
:::

### Aviso de login na tela inicial {#home-screen-sign-in-prompt}

Visitantes que abrem a [tela inicial](/docs/b1-church/getting-started/navigating#home) do aplicativo sem entrar veem um breve aviso -- por padrão, *"Entre para ver seus grupos, ofertas e muito mais."* -- ao lado de um botão **Entrar**. As configurações **Aviso de login na tela inicial**, na mesma página Portal do membro (`/mobile/b1-mobile`), permitem alterá-lo:

- **Mostrar aviso de login na tela inicial do aplicativo** -- Desative para ocultar o aviso e o botão **Entrar** da tela inicial. Os visitantes ainda podem entrar pelo menu do aplicativo.
- **Texto do aviso de login** -- Substitua o texto padrão pela sua própria mensagem (até 150 caracteres). Deixe em branco para usar o padrão. Esta caixa fica desabilitada enquanto o aviso estiver desligado.

Clique em **Salvar** para aplicar. Uma mensagem **Salvo** confirma a alteração. Ao salvar, o cache de configurações do aplicativo é atualizado, então a mudança aparece na próxima vez que a tela inicial for carregada.

### Blocos da tela inicial {#home-screen-tiles}

Abas que têm foto (consulte **Imagem** em [Adicionando uma nova aba](#adding-a-new-tab)) aparecem na [tela inicial](/docs/b1-church/getting-started/navigating#home) do aplicativo como blocos de foto, em uma seção com o nome da sua igreja. Isso inclui uma aba Versículo do dia, se você lhe der uma foto. As abas com foto também continuam aparecendo na barra de abas.

A configuração **Blocos da tela inicial**, na mesma página Portal do membro (`/mobile/b1-mobile`), controla como esses blocos são organizados. Escolha um **Layout**:

- **Grade** -- Dois blocos por linha (o padrão). Quando o número de blocos é ímpar, o primeiro bloco ocupa a largura toda.
- **Linha com rolagem** -- Uma linha de blocos que os membros deslizam para o lado.
- **Rolagem (automática)** -- A mesma linha lateral, mas que também se move sozinha, avançando um bloco a cada quatro segundos e voltando ao início no final. Ela pausa quando um membro toca, passa o mouse ou entra na linha com o teclado, e retoma alguns segundos depois. Em dispositivos com a opção de reduzir movimento ativada, a linha fica parada e funciona como **Linha com rolagem**.
- **Lista** -- Uma lista com uma pequena miniatura da foto ao lado do nome de cada aba.

Clique em **Salvar** para aplicar.

### Seções da tela inicial {#home-screen-sections}

Membros conectados sempre veem o próprio histórico de presença e os formulários enviados na [página Eu](/docs/b1-church/getting-started/me-page). As opções **Seções da tela inicial**, na mesma página Portal do membro (`/mobile/b1-mobile`), podem mostrá-los também na tela inicial:

- **Mostrar Minha presença na tela inicial** -- Adiciona uma seção **Minha presença** com quantas vezes o membro compareceu nos últimos 90 dias, suas duas visitas mais recentes e um link **Histórico** para a lista completa de presenças.
- **Mostrar Meus formulários na tela inicial** -- Adiciona uma seção **Meus formulários** com os dois envios de formulário mais recentes do membro e um link **Todos os formulários**.

As duas opções vêm desativadas por padrão. Uma seção só aparece para membros conectados que tenham pelo menos um registro para mostrar. Clique em **Salvar** para aplicar.

## Onde essas abas aparecem

As abas que você configura aqui são exibidas no **PWA do B1.church** que os seus membros instalam a partir de qualquer página de `https://yourchurchname.b1.church`. As alterações feitas nesta página são refletidas na próxima vez que um membro abrir o aplicativo.

No celular, a barra de abas inferior mostra **Início**, até três das suas abas e **Mais**; no computador, o cabeçalho mostra até cinco. Telas integradas (como Sermões, Ofertas ou Grupos) recebem os espaços primeiro, e abas de **Página interna** preenchem os espaços que sobrarem. Abas de **URL externa** e **Versículo do dia** nunca recebem um espaço. Todas as abas, inclusive as que não cabem, aparecem na página **Mais** do aplicativo. Consulte [Navegando pelo B1App](/docs/b1-church/getting-started/navigating) para ver o que os membros veem. (As abas também são exibidas pelo [aplicativo B1 Mobile nativo legado](/docs/b1-mobile/) para os membros que ainda o utilizam, mas esse aplicativo está descontinuado e não recebe mais atualizações.)

## Próximos passos

- [Configurações da igreja](./church-settings.md) -- Configure as informações e a identidade visual da sua igreja
- [Funções e permissões](./roles-permissions.md) -- Gerencie o acesso da sua equipe
