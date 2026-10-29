---
title: "Membros do Grupo"
---

# Membros do Grupo

<div class="article-intro">

Depois de criar um grupo, o próximo passo é adicionar membros. Na página de detalhes de um grupo, você pode pesquisar pessoas, adicioná-las ao grupo, designar líderes, enviar mensagens e exportar a lista de membros. Gerenciar a participação nos grupos é essencial para coordenar pequenos grupos, comitês e turmas.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de pelo menos um grupo configurado no B1 Admin. Consulte [Criando Grupos](creating-groups.md) se ainda não criou um.
- As pessoas que você quer adicionar devem já estar no seu diretório de [Pessoas](../people/adding-people.md). Se alguém não estiver lá, você pode criá-lo a partir da busca de membros (veja abaixo).

</div>

## Adicionando Membros a um Grupo

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Pessoas > Grupos** e clique no grupo que você quer gerenciar.
2. Na seção **Membros** da página do grupo, clique em **Todos os membros**. (Equipes e ministérios abrem diretamente a lista de membros.)
3. Na caixa **Adicionar pessoa** abaixo da lista de membros, digite o nome da pessoa que quer adicionar e pressione **Enter** ou clique no ícone de pesquisa.
4. Clique no nome da pessoa, ou no ícone de adicionar ao lado dele, nos resultados da pesquisa.
5. A pessoa agora aparece na lista de membros do grupo.

:::tip
Antes de digitar qualquer coisa, a caixa **Adicionar pessoa** mostra uma pequena lista de **Pessoas recentes** que você pode adicionar com um único clique.
:::

Quando terminar, clique no link **Voltar para** com o nome do grupo para retornar à página do grupo. A página do grupo mostra um resumo de **Membros**, **Sessões**, **Agenda** e **Saúde**, cada um com um link para sua visualização completa. Se você for um dos líderes do grupo, ela também mostra as **Anotações do líder** (veja [Anotações do Líder](#leader-notes) abaixo). Quando há formulários vinculados ao grupo, aparece também uma seção **Formulários vinculados** (veja [Formulários Vinculados](#linked-forms) abaixo).

### Adicionando Alguém que Ainda Não Está no B1

Se a sua pesquisa não encontrar ninguém, a busca mostra **Nenhum registro encontrado** com um link **Adicionar nova pessoa**. Clique nele, digite o primeiro nome, o sobrenome e (opcionalmente) o e-mail da pessoa, e clique em **Adicionar**. A nova pessoa é criada no seu diretório de Pessoas e adicionada ao grupo em uma única etapa -- você não precisa pesquisá-la novamente.

## Designando Líderes de Grupo {#designating-group-leaders}

Os líderes de grupo têm privilégios especiais -- eles podem editar a [agenda do grupo](group-calendar.md), gerenciar eventos e ajudar a coordenar o grupo.

1. Na lista de membros do grupo, encontre a pessoa que você quer tornar líder.
2. Clique no **ícone de estrela** (**Tornar líder**) ao lado do nome dela.
3. A pessoa passa a ser designada como líder do grupo e exibe um selo **Líder**.

Para remover o status de líder, clique novamente no ícone de estrela (**Remover acesso de líder**).

:::info
Qualquer membro do grupo pode ver a agenda e os eventos do grupo, mas somente os líderes podem adicionar ou editar eventos da agenda.
:::

## Formulários Vinculados {#linked-forms}

Quando um formulário Independente é [vinculado ao grupo](../forms/creating-forms.md#linking-a-form-to-a-group), a página do grupo mostra uma seção **Formulários vinculados** com o nome de cada formulário, se ele está **Aberto** ou **Fechado**, e quantos formulários estão vinculados. A seção aparece somente para os líderes do grupo e para pessoas que podem administrar formulários, e somente quando pelo menos um formulário está vinculado. Administradores de formulários podem clicar no nome de um formulário para abri-lo, ou em **Todos os formulários** para ir à página de Formulários.

Os líderes do grupo leem e imprimem as respostas desses formulários a partir da página do grupo no [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Anotações do Líder {#leader-notes}

Os líderes de grupo podem manter anotações privadas sobre o grupo -- por exemplo, acompanhamentos, pedidos de oração ou preocupações pastorais -- que o restante do grupo nunca vê.

A seção **Anotações do líder** aparece na página do grupo somente para as pessoas que são líderes desse grupo. Ela mostra a anotação mais recente, quem a escreveu e quando, e quantas anotações existem.

1. Na página do grupo, clique em **Todas as anotações** na seção **Anotações do líder**.
2. Digite sua anotação na caixa e publique-a. As anotações são listadas com o nome e a foto do autor e a data e a hora em que foram publicadas.
3. Clique no link **Voltar para** com o nome do grupo para retornar à página do grupo.

:::info
As anotações do líder são visíveis apenas para os líderes do grupo. Os outros membros não podem vê-las, e tampouco a equipe ou os administradores -- mesmo com permissões completas -- a menos que também sejam líderes desse grupo. Para dar acesso a outra pessoa, [torne-a líder](#designating-group-leaders). Os líderes também veem essas anotações na seção **Anotações do líder** da página do grupo no [B1.church](../../b1-church/groups/group-details.md#leader-notes), e na aba **Grupos** da página [Anotações](../people/notes.md) no B1 Admin.
:::

## Enviando Mensagens para os Membros do Grupo

Você pode se comunicar com todos os membros de um grupo diretamente pelo B1 Admin:

1. Na lista de membros do grupo, clique no ícone **Enviar uma mensagem aos membros** acima da lista.
2. Digite sua mensagem na caixa de texto (ou escolha uma das **Modelos**).
3. Clique em **Enviar**.

Sua mensagem será entregue a todos os membros do grupo.

## Enviando E-mails para os Membros do Grupo

Você pode enviar e-mails formatados para todos os membros de um grupo:

1. Na página de detalhes do grupo, clique no botão **E-mail** no lado esquerdo da página.
2. A caixa de diálogo Enviar E-mail é aberta, mostrando quantos membros vão receber o e-mail e quantos não têm endereço de e-mail cadastrado.
3. Opcionalmente, selecione um **modelo de e-mail** na lista suspensa, ou escreva uma mensagem do zero. Clique em **Gerenciar modelos** para criar ou editar modelos.
4. Digite um **assunto**. Você pode inserir campos de mesclagem clicando nos chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}` e **Nome do grupo** (`{{groupName}}`), que é preenchido com o nome do grupo.
5. Escreva o **corpo do e-mail** usando o editor HTML. Os mesmos campos de mesclagem estão disponíveis aqui.
6. Clique em **Enviar**.
7. Um resumo mostra quantos e-mails foram enviados com sucesso e quantos membros foram ignorados (sem e-mail cadastrado).

:::tip
Crie modelos de e-mail reutilizáveis para comunicações recorrentes, como atualizações semanais, anúncios de eventos ou pedidos de oração. Os modelos economizam tempo e garantem uma comunicação consistente.
:::

### Ativando o E-mail de Grupo para a Sua Igreja {#turning-on-group-email-for-your-church}

Todas as igrejas no B1 enviam e-mails a partir do mesmo endereço, portanto compartilham uma mesma reputação de envio. Para evitar que os e-mails de todos caiam na caixa de spam, a equipe da ChurchApps revisa cada igreja uma vez antes que ela possa enviar e-mails de grupo.

Se a sua igreja ainda não foi revisada, a caixa de diálogo Enviar E-mail mostra **O e-mail de grupo precisa de uma revisão rápida** em vez do editor de mensagens:

1. Clique em **Solicitar revisão**. A equipe de suporte da ChurchApps é notificada.
2. A caixa de diálogo muda para **Revisão solicitada**. Você pode fechá-la.
3. O e-mail de grupo geralmente é ativado em até um dia útil. Abra a caixa de diálogo Enviar E-mail novamente depois disso para enviar sua mensagem.

Até que a sua igreja seja aprovada, o B1 também não envia os [e-mails de acompanhamento de formulários](../forms/creating-forms.md#sending-a-follow-up-email) nem a etapa **Enviar e-mail** dos [fluxos de trabalho](../serving/workflows.md).

:::info Limites de envio
Após a aprovação, uma igreja pode enviar até 150 e-mails escritos pela igreja por dia. O limite aumenta conforme sua igreja constrói um histórico de envio limpo, chegando a 2.000 por dia. Se mensagens recentes tiverem sido devolvidas ou marcadas como spam, o e-mail de grupo é pausado e a caixa de diálogo pede que você entre em contato com o suporte. Se um envio ultrapassar o seu limite diário, o B1 não o envia e exibe um erro.
:::

## Enviando Mensagens de Texto para os Membros do Grupo

Assim que a sua igreja tiver conectado um [provedor de SMS](../settings/church-settings.md#texting), um botão **SMS** (**Enviar SMS para este grupo**) aparece ao lado do botão **E-mail** na página do grupo.

1. Na página de detalhes do grupo, clique em **SMS**.
2. A caixa de diálogo mostra quantos membros vão receber a mensagem. Membros sem celular cadastrado ou que cancelaram o recebimento são ignorados.
3. Opcionalmente, escolha uma mensagem de texto salva em **Carregar modelo (opcional)** para preencher a mensagem. O seletor aparece quando a sua igreja tem [modelos de texto](../settings/email-templates.md#text-templates); quem pode editar configurações também vê um link **Gerenciar modelos**.
4. Digite ou edite sua mensagem. Para personalizá-la, clique em um chip de campo abaixo da caixa de mensagem -- **Nome**, **Sobrenome**, **Nome de exibição**, **Nome da igreja** ou **Nome do grupo** -- para inseri-lo na posição do cursor. Cada campo é preenchido com os dados do destinatário quando o texto é enviado; **Nome do grupo** se torna o nome do grupo.
5. Clique em **Enviar**.

Consulte [Personalizando Textos com Campos de Mesclagem](../settings/church-settings.md#personalizing-texts-with-merge-fields) para mais detalhes.

## Exportando os Dados do Grupo

Para baixar a lista de membros do grupo como arquivo:

1. Na lista de membros do grupo, clique em **Exportar** acima da lista.
2. Um arquivo CSV com as informações dos membros do grupo será baixado para o seu computador.

A exportação em CSV é útil para importar dados em outras ferramentas ou para manter registros offline. Para mais opções de exportação, consulte [Exportando Dados](../people/exporting-data.md).

## Imprimindo a Lista de Membros

Na lista de membros do grupo, clique no ícone **Imprimir lista de chamada** (impressora) acima da lista e escolha um layout. A página abre em uma nova aba e a caixa de diálogo de impressão do navegador aparece automaticamente.

- **Folha de presença** -- uma lista de turma sem data, com as caixas **Presente** e **Ausente** para os professores marcarem à mão. Consulte [Imprimindo uma Lista de Chamada](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Lista de contatos** -- uma lista de contatos do grupo, datada de hoje e com o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um) no topo, seguido do nome da igreja e do nome do grupo. Cada membro tem uma linha com seu **Nome**, **Telefone**, **E-mail** e **Endereço**. Os líderes aparecem primeiro e são marcados como **Líder**; depois, todos os demais em ordem alfabética pelo sobrenome. O telefone exibido é o celular do membro ou, se não houver celular, o telefone residencial ou comercial. Os dados de contato ficam em branco para quem cancelou o recebimento.

:::warning
Uma lista de contatos contém informações pessoais de contato dos membros. Compartilhe cópias impressas somente com os líderes do grupo e com outras pessoas que precisem delas.
:::

## Enviando Notificações Push aos Membros do Grupo

Você pode enviar uma notificação push diretamente a todos os membros do grupo que tenham o aplicativo B1.church instalado no dispositivo com as notificações push ativadas.

1. Na página de detalhes do grupo, clique em **Notificar** (abaixo dos botões **E-mail** e **SMS** -- o botão **SMS** aparece assim que um [provedor de SMS](../settings/church-settings.md#texting) estiver conectado).
2. Uma caixa de diálogo é aberta, mostrando quantos membros do seu grupo têm as notificações push ativadas.
3. Preencha os detalhes da notificação:
   - **Título** *(obrigatório)* -- um resumo curto, de até 80 caracteres.
   - **Mensagem** *(obrigatória)* -- o corpo da notificação, de até 240 caracteres.
   - **Link para abrir ou URL do folheto** *(opcional)* -- um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL completa `https://` que a notificação abre ao ser tocada.
   - **URL da imagem** *(opcional)* -- uma URL `https://` de uma imagem que aparece junto da notificação em dispositivos compatíveis.
4. Uma pré-visualização mostra como a notificação aparecerá no dispositivo.
5. Clique em **Enviar notificação**.

:::info
As notificações push são entregues somente aos membros do grupo que instalaram o PWA do B1.church e não desativaram as notificações push. Membros sem um dispositivo de push registrado, ou com o push desativado, são contados como ignorados, e o resumo do envio mostra quantos foram alcançados e quantos foram ignorados.
:::

:::tip
Depois do envio, a caixa de diálogo mostra quantas notificações foram colocadas na fila com sucesso. Se a maioria dos membros aparecer como ignorada, lembre-os de visitar o site B1.church, instalá-lo como aplicativo na tela inicial e permitir as notificações quando solicitado.
:::

## Removendo Membros

Para remover alguém de um grupo, localize o nome dela na lista de membros e clique no botão **remover** ao lado do registro.

:::info
Remover uma pessoa de um grupo não a exclui do diretório da igreja. Ela continuará aparecendo na seção [Pessoas](../people/adding-people.md) e poderá ser adicionada novamente ao grupo a qualquer momento.
:::
