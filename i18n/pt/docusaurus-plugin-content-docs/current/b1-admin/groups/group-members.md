---
title: "Membros do Grupo"
---

# Membros do Grupo

<div class="article-intro">

Depois de criar um grupo, o próximo passo é adicionar membros. Na página de detalhes de um grupo, você pode pesquisar pessoas, adicioná-las ao grupo, designar líderes, enviar mensagens e exportar a lista de membros. Gerenciar a participação nos grupos é essencial para coordenar pequenos grupos, comitês e classes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa ter pelo menos um grupo configurado no B1 Admin. Consulte [Criando Grupos](creating-groups.md) se ainda não criou um.
- As pessoas que você quer adicionar já devem estar no seu diretório de [Pessoas](../people/adding-people.md). Se alguém não estiver, você pode cadastrá-la pela busca de membros (veja abaixo).

</div>

## Adicionando Membros a um Grupo

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Pessoas > Grupos** e clique no grupo que deseja gerenciar.
2. Na seção **Membros** da página do grupo, clique em **Todos os membros**. (Equipes e ministérios abrem diretamente na lista de membros.)
3. Na caixa **Adicionar Pessoa** abaixo da lista de membros, digite o nome da pessoa que deseja adicionar e pressione **Enter** ou clique no ícone de pesquisa.
4. Clique no nome da pessoa, ou no ícone de adicionar ao lado dele, nos resultados da pesquisa.
5. A pessoa agora aparece na lista de membros do grupo.

:::tip
Antes de digitar qualquer coisa, a caixa **Adicionar Pessoa** mostra uma pequena lista de **Pessoas recentes** que você pode adicionar com um único clique.
:::

Quando terminar, clique no link **Voltar para** com o nome do grupo para retornar à página do grupo. A página do grupo mostra um resumo de **Membros**, **Sessões**, **Calendário** e **Saúde**, cada um com um link para a sua visualização completa.

### Adicionando Alguém Que Ainda Não Está no B1

Se a pesquisa não encontrar ninguém, ela mostra **Nenhum registro encontrado** com um link **Adicionar Nova Pessoa**. Clique nele, digite o primeiro nome, o sobrenome e, opcionalmente, o e-mail, e clique em **Adicionar**. A nova pessoa é criada no seu diretório de Pessoas e adicionada ao grupo em uma única etapa -- você não precisa pesquisá-la novamente.

## Designando Líderes do Grupo

Líderes de grupo têm privilégios especiais -- eles podem editar o [calendário do grupo](group-calendar.md), gerenciar eventos e ajudar a coordenar o grupo.

1. Na lista de membros do grupo, encontre a pessoa que deseja tornar líder.
2. Clique no **ícone de estrela** (**Tornar Líder**) ao lado do nome dela.
3. A pessoa passa a ser designada como líder do grupo e exibe um selo **Líder**.

Para remover o status de líder, clique novamente no ícone de estrela (**Remover Acesso de Líder**).

:::info
Qualquer membro do grupo pode ver o calendário e os eventos do grupo, mas somente os líderes podem adicionar ou editar eventos do calendário.
:::

## Enviando Mensagens aos Membros do Grupo

Você pode se comunicar com todos os membros de um grupo diretamente pelo B1 Admin:

1. Na lista de membros do grupo, clique no ícone **Enviar uma mensagem aos membros** acima da lista.
2. Digite sua mensagem na caixa de texto (ou escolha uma em **Modelos**).
3. Clique em **Enviar**.

Sua mensagem será entregue a todos os membros do grupo.

## Enviando E-mails aos Membros do Grupo

Você pode enviar e-mails formatados para todos os membros de um grupo:

1. Na página de detalhes do grupo, clique no botão **E-mail** no lado esquerdo da página.
2. A caixa de diálogo Enviar E-mail é aberta, mostrando quantos membros receberão o e-mail e quantos não têm endereço de e-mail cadastrado.
3. Opcionalmente, selecione um **modelo de e-mail** na lista suspensa ou escreva uma mensagem do zero. Clique em **Gerenciar Modelos** para criar ou editar modelos.
4. Digite uma **linha de assunto**. Você pode inserir campos de mesclagem clicando nos chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Escreva o **corpo do e-mail** usando o editor HTML. Os mesmos campos de mesclagem estão disponíveis aqui.
6. Clique em **Enviar**.
7. Um resumo mostra quantos e-mails foram enviados com sucesso e quantos membros foram ignorados (sem e-mail cadastrado).

:::tip
Crie modelos de e-mail reutilizáveis para comunicações recorrentes, como atualizações semanais, anúncios de eventos ou pedidos de oração. Os modelos economizam tempo e garantem mensagens consistentes.
:::

### Ativando E-mail em Grupo para Sua Igreja {#turning-on-group-email-for-your-church}

Todas as igrejas no B1 enviam e-mails do mesmo endereço, por isso compartilham uma mesma reputação de envio. Para evitar que os e-mails de todos caiam na pasta de spam, a equipe da ChurchApps analisa cada igreja uma vez antes que ela possa enviar e-mail em grupo.

Se a sua igreja ainda não foi analisada, a caixa de diálogo Enviar E-mail mostra **E-mail de grupo precisa de uma análise rápida** em vez do editor de mensagens:

1. Clique em **Solicitar análise**. A equipe de suporte da ChurchApps é notificada.
2. A caixa de diálogo muda para **Análise solicitada**. Você pode fechá-la.
3. O e-mail em grupo geralmente é ativado em até um dia útil. Abra a caixa de diálogo Enviar E-mail novamente depois disso para enviar sua mensagem.

Até que sua igreja seja aprovada, o B1 também não envia [e-mails de acompanhamento de formulários](../forms/creating-forms.md#sending-a-follow-up-email) nem a etapa **Enviar e-mail** em [fluxos de trabalho](../serving/workflows.md).

:::info Limites de envio
Após a aprovação, uma igreja pode enviar até 150 e-mails escritos pela igreja por dia. O limite aumenta conforme sua igreja constrói um histórico de envio limpo, chegando a 2.000 por dia. Se mensagens recentes tiverem sido devolvidas ou marcadas como spam, o e-mail em grupo é pausado e a caixa de diálogo pede que você entre em contato com o suporte. Se um envio ultrapassar seu limite diário, o B1 não o envia e mostra um erro.
:::

## Enviando Mensagens de Texto aos Membros do Grupo

Depois que sua igreja tiver conectado um [provedor de mensagens de texto](../settings/church-settings.md#texting), um botão **Texto** (**Enviar texto para este grupo**) aparece ao lado do botão **E-mail** na página do grupo.

1. Na página de detalhes do grupo, clique em **Texto**.
2. A caixa de diálogo mostra quantos membros receberão a mensagem. Membros sem número de celular cadastrado ou que cancelaram o recebimento são ignorados.
3. Digite sua mensagem. Para personalizá-la, clique em um chip de campo abaixo da caixa de mensagem -- **Primeiro Nome**, **Sobrenome**, **Nome de Exibição** ou **Nome da Igreja** -- para inseri-lo na posição do cursor. Cada campo é preenchido com os dados do próprio destinatário quando o texto é enviado.
4. Clique em **Enviar**.

Consulte [Personalizando Textos com Campos de Mesclagem](../settings/church-settings.md#personalizing-texts-with-merge-fields) para mais detalhes.

## Exportando Dados do Grupo

Para baixar a lista de membros do grupo como um arquivo:

1. Na lista de membros do grupo, clique em **Exportar** acima da lista.
2. Um arquivo CSV com as informações dos membros do grupo será baixado para o seu computador.

Um CSV exportado é útil para importar dados em outras ferramentas ou manter registros offline. Para mais opções de exportação, consulte [Exportando Dados](../people/exporting-data.md).

## Imprimindo a Lista de Membros {#printing-the-member-list}

Na lista de membros do grupo, clique no ícone **Imprimir Folha de Chamada** (impressora) acima da lista e escolha um layout. A página abre em uma nova aba e a caixa de diálogo de impressão do seu navegador aparece automaticamente.

- **Folha de Presença** -- uma lista de classe sem data, com caixas **Presente** e **Ausente** para os professores marcarem à mão. Consulte [Imprimindo uma Folha de Chamada](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Lista de Contatos** -- uma lista de contatos do grupo, datada de hoje e com o logotipo da sua igreja (o **Logotipo para Fundo Claro** em [Website > Aparência](../website/appearance.md), se você tiver enviado um) e o nome da sua igreja abaixo, além do nome do grupo. Cada membro tem uma linha com **Nome**, **Telefone**, **E-mail** e **Endereço**. Os líderes aparecem primeiro e são marcados como **Líder**, seguidos dos demais em ordem alfabética pelo sobrenome. O telefone exibido é o celular do membro ou, se não houver celular, o telefone residencial ou comercial. Os dados de contato ficam em branco para quem cancelou o recebimento de mensagens.

:::warning
Uma lista de contatos contém informações pessoais de contato dos membros. Compartilhe cópias impressas somente com os líderes do grupo e outras pessoas que precisem delas.
:::

## Enviando Notificações Push aos Membros do Grupo

Você pode enviar uma notificação push diretamente a todos os membros do grupo que tenham o aplicativo B1.church instalado em seus dispositivos com notificações push ativadas.

1. Na página de detalhes do grupo, clique em **Notificar** (abaixo dos botões **E-mail** e **Texto** -- o botão **Texto** aparece depois que um [provedor de mensagens de texto](../settings/church-settings.md#texting) está conectado).
2. Abre-se uma caixa de diálogo mostrando quantos membros do seu grupo têm notificações push ativadas.
3. Preencha os detalhes da notificação:
   - **Título** *(obrigatório)* -- Um resumo curto, de até 80 caracteres.
   - **Mensagem** *(obrigatória)* -- O texto da notificação, de até 240 caracteres.
   - **Link do aplicativo ou URL do panfleto** *(opcional)* -- Um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL `https://` completa que a notificação abre ao ser tocada.
   - **URL da imagem** *(opcional)* -- Uma URL `https://` de uma imagem que aparece junto à notificação em dispositivos compatíveis.
4. Uma prévia ao vivo mostra como a notificação aparecerá no dispositivo.
5. Clique em **Enviar Notificação**.

:::info
As notificações push são entregues apenas aos membros do grupo que instalaram o PWA do B1.church e não desativaram as notificações push. Membros sem dispositivo de push registrado ou com push desativado são contados como ignorados, e o resumo do envio mostra quantos foram alcançados e quantos foram ignorados.
:::

:::tip
Depois do envio, a caixa de diálogo mostra quantas notificações foram enfileiradas com sucesso. Se a maioria dos membros aparecer como ignorada, lembre-os de acessar o site do B1.church, instalá-lo como um aplicativo na tela inicial e permitir as notificações quando solicitado.
:::

## Removendo Membros

Para remover alguém de um grupo, localize o nome dessa pessoa na lista de membros e clique no botão **remover** ao lado do registro.

:::info
Remover uma pessoa de um grupo não a exclui do diretório da sua igreja. Ela continuará aparecendo na seção [Pessoas](../people/adding-people.md) e poderá ser adicionada novamente ao grupo a qualquer momento.
:::
