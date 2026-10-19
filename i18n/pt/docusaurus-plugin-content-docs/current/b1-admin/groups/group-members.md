---
title: "Membros do Grupo"
---

# Membros do Grupo

<div class="article-intro">

Depois de criar um grupo, o próximo passo é adicionar membros. Na página de detalhes do grupo, você pode buscar pessoas, adicioná-las ao grupo, designar líderes, enviar mensagens e exportar a lista de membros. Gerenciar a participação no grupo é essencial para coordenar pequenos grupos, comitês e classes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa ter pelo menos um grupo configurado no B1 Admin. Veja [Criando Grupos](creating-groups.md) se ainda não criou um.
- As pessoas que você quer adicionar devem já estar no seu diretório de [Pessoas](../people/adding-people.md). Se alguém não estiver, você pode criá-la a partir da busca de membros (veja abaixo).

</div>

## Adicionando Membros a um Grupo

1. No [Menu de atalho](../introduction.md#getting-around-with-the-jump-menu), escolha **Pessoas > Grupos** e clique no grupo que você quer gerenciar.
2. Na seção **Membros** da página do grupo, clique em **Todos os membros**. (Equipes e ministérios abrem diretamente na lista de membros.)
3. Na caixa **Adicionar Pessoa**, abaixo da lista de membros, digite o nome da pessoa que você quer adicionar e pressione **Enter** ou clique no ícone de busca.
4. Clique no nome da pessoa, ou no ícone de adicionar ao lado dele, nos resultados da busca.
5. A pessoa agora aparece na lista de membros do grupo.

:::tip
Antes de digitar qualquer coisa, a caixa **Adicionar Pessoa** mostra uma lista curta de **Pessoas recentes** que você pode adicionar com um clique.
:::

Quando terminar, clique no link **Voltar para** com o nome do grupo para retornar à página do grupo. A página do grupo mostra um resumo de **Membros**, **Sessões**, **Calendário** e **Saúde**, cada um com um link para sua visualização completa. Se você for um dos líderes do grupo, ela também mostra as **Notas do líder** (veja [Notas do Líder](#leader-notes) abaixo).

### Adicionando Alguém Que Ainda Não Está no B1

Se a sua busca não encontrar ninguém, ela mostra **Nenhum registro encontrado** com um link **Adicionar Nova Pessoa**. Clique nele, informe o primeiro nome, o sobrenome e (opcionalmente) o e-mail, e clique em **Adicionar**. A nova pessoa é criada no seu diretório de Pessoas e adicionada ao grupo em um único passo -- você não precisa buscá-la novamente.

## Designando Líderes do Grupo {#designating-group-leaders}

Os líderes de grupo têm privilégios especiais -- eles podem editar o [calendário do grupo](group-calendar.md), gerenciar eventos e ajudar a coordenar o grupo.

1. Na lista de membros do grupo, encontre a pessoa que você quer tornar líder.
2. Clique no **ícone de estrela** (**Tornar Líder**) ao lado do nome dela.
3. A pessoa agora está designada como líder do grupo e mostra um selo **Líder**.

Para remover o status de líder, clique novamente no ícone de estrela (**Remover Acesso de Líder**).

:::info
Qualquer membro do grupo pode ver o calendário e os eventos do grupo, mas apenas os líderes podem adicionar ou editar eventos do calendário.
:::

## Notas do Líder {#leader-notes}

Os líderes de grupo podem manter notas particulares sobre o grupo -- por exemplo, acompanhamentos, pedidos de oração ou preocupações pastorais -- que o restante do grupo nunca vê.

A seção **Notas do líder** aparece na página do grupo apenas para as pessoas que são líderes desse grupo. Ela mostra a nota mais recente, quem a escreveu e quando, e quantas notas existem.

1. Na página do grupo, clique em **Todas as notas** na seção **Notas do líder**.
2. Digite sua nota na caixa e publique-a. As notas são listadas com o nome e a foto do autor.
3. Clique no link **Voltar para** com o nome do grupo para retornar à página do grupo.

:::info
As notas do líder são visíveis apenas para os líderes do grupo. Os outros membros não podem vê-las, e nem a equipe ou os administradores -- mesmo com permissões totais -- a menos que também sejam líderes desse grupo. Para dar acesso a outra pessoa, [torne-a líder](#designating-group-leaders). Os líderes também veem essas notas na seção **Notas do líder** da página do grupo no [B1.church](../../b1-church/groups/group-details.md#leader-notes).
:::

## Enviando Mensagens para Membros do Grupo

Você pode se comunicar com todos os membros de um grupo diretamente pelo B1 Admin:

1. Na lista de membros do grupo, clique no ícone **Enviar uma mensagem para os membros** acima da lista.
2. Digite sua mensagem na caixa de texto (ou escolha uma em **Modelos**).
3. Clique em **Enviar**.

Sua mensagem será entregue a todos os membros do grupo.

## Enviando E-mails para Membros do Grupo

Você pode enviar e-mails formatados para todos os membros de um grupo:

1. Na página de detalhes do grupo, clique no botão **E-mail** à esquerda da página.
2. A caixa Enviar E-mail é aberta, mostrando quantos membros vão receber o e-mail e quantos não têm endereço de e-mail cadastrado.
3. Opcionalmente, selecione um **modelo de e-mail** na lista suspensa ou escreva uma mensagem do zero. Clique em **Gerenciar Modelos** para criar ou editar modelos.
4. Digite um **assunto**. Você pode inserir campos de mesclagem clicando nos chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Escreva o **corpo do e-mail** usando o editor HTML. Os mesmos campos de mesclagem estão disponíveis aqui.
6. Clique em **Enviar**.
7. Um resumo mostra quantos e-mails foram enviados com sucesso e quantos membros foram ignorados (sem e-mail cadastrado).

:::tip
Crie modelos de e-mail reutilizáveis para comunicações recorrentes, como atualizações semanais, anúncios de eventos ou pedidos de oração. Os modelos economizam tempo e garantem mensagens consistentes.
:::

### Ativando o E-mail de Grupo para Sua Igreja {#turning-on-group-email-for-your-church}

Todas as igrejas no B1 enviam e-mails pelo mesmo endereço, por isso compartilham uma mesma reputação de envio. Para manter os e-mails de todos fora da caixa de spam, a equipe da ChurchApps analisa cada igreja uma vez antes que ela possa enviar e-mails de grupo.

Se a sua igreja ainda não foi analisada, a caixa Enviar E-mail mostra **O e-mail de grupo precisa de uma análise rápida** no lugar do editor de mensagens:

1. Clique em **Solicitar análise**. A equipe de suporte da ChurchApps é notificada.
2. A caixa muda para **Análise solicitada**. Você pode fechá-la.
3. O e-mail de grupo normalmente é ativado em até um dia útil. Depois disso, abra a caixa Enviar E-mail novamente para enviar sua mensagem.

Até que sua igreja seja aprovada, o B1 também não envia os [e-mails de acompanhamento de formulários](../forms/creating-forms.md#sending-a-follow-up-email) nem a etapa **Enviar e-mail** dos [fluxos de trabalho](../serving/workflows.md).

:::info Limites de envio
Após a aprovação, uma igreja pode enviar até 150 e-mails escritos pela igreja por dia. O limite aumenta conforme a igreja acumula um histórico de envios limpo, chegando a 2.000 por dia. Se mensagens recentes tiverem sido devolvidas ou marcadas como spam, o e-mail de grupo é pausado e a caixa pede que você entre em contato com o suporte. Se um envio ultrapassar o seu limite diário, o B1 não o envia e mostra um erro.
:::

## Enviando Mensagens de Texto para Membros do Grupo

Assim que sua igreja conectar um [provedor de mensagens de texto](../settings/church-settings.md#texting), um botão **Texto** (**Enviar texto para este grupo**) aparece ao lado do botão **E-mail** na página do grupo.

1. Na página de detalhes do grupo, clique em **Texto**.
2. A caixa mostra quantos membros vão receber a mensagem. Membros sem celular cadastrado ou que cancelaram a inscrição são ignorados.
3. Digite sua mensagem. Para personalizá-la, clique em um chip de campo abaixo da caixa de mensagem -- **Nome**, **Sobrenome**, **Nome de Exibição** ou **Nome da Igreja** -- para inseri-lo na posição do cursor. Cada campo é preenchido com os dados do próprio destinatário quando a mensagem é enviada.
4. Clique em **Enviar**.

Veja [Personalizando Mensagens de Texto com Campos de Mesclagem](../settings/church-settings.md#personalizing-texts-with-merge-fields) para mais detalhes.

## Exportando Dados do Grupo

Para baixar a lista de membros do grupo como arquivo:

1. Na lista de membros do grupo, clique em **Exportar** acima da lista.
2. Um arquivo CSV com as informações dos membros do grupo será baixado para o seu computador.

Uma exportação em CSV é útil para importar dados em outras ferramentas ou para manter registros offline. Para mais opções de exportação, veja [Exportando Dados](../people/exporting-data.md).

## Imprimindo a Lista de Membros {#printing-the-member-list}

Na lista de membros do grupo, clique no ícone de **Imprimir Lista de Chamada** (impressora) acima da lista e escolha um layout. A página é aberta em uma nova aba e a caixa de impressão do seu navegador aparece automaticamente.

- **Lista de Presença** -- uma lista de turma sem data, com caixas **Presente** e **Ausente** para os professores marcarem à mão. Veja [Imprimindo uma Lista de Chamada](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Lista de Contatos** -- uma lista de contatos do grupo, datada de hoje e com o logotipo da sua igreja no topo (o **Logotipo para Fundo Claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um), com o nome da igreja abaixo dele e o nome do grupo. Cada membro tem uma linha com **Nome**, **Telefone**, **E-mail** e **Endereço**. Os líderes aparecem primeiro e marcados como **Líder**, e depois os demais, por sobrenome. O telefone exibido é o celular do membro ou, se não houver celular, o telefone residencial ou comercial. Os dados de contato ficam em branco para quem cancelou a inscrição.

:::warning
Uma lista de contatos contém informações pessoais de contato dos membros. Compartilhe as cópias impressas apenas com os líderes do grupo e com outras pessoas que precisem delas.
:::

## Enviando Notificações Push para Membros do Grupo

Você pode enviar uma notificação push diretamente para todos os membros do grupo que tenham o aplicativo B1.church instalado em seus dispositivos e as notificações push ativadas.

1. Na página de detalhes do grupo, clique em **Notificar** (abaixo dos botões **E-mail** e **Texto** -- o botão **Texto** aparece assim que um [provedor de mensagens de texto](../settings/church-settings.md#texting) estiver conectado).
2. Uma caixa é aberta mostrando quantos membros do grupo têm as notificações push ativadas.
3. Preencha os detalhes da notificação:
   - **Título** *(obrigatório)* -- Um resumo curto, de até 80 caracteres.
   - **Mensagem** *(obrigatória)* -- O corpo da notificação, de até 240 caracteres.
   - **Link para abrir ou URL do folheto** *(opcional)* -- Um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL `https://` completa que a notificação abre ao ser tocada.
   - **URL da imagem** *(opcional)* -- Uma URL `https://` para uma imagem que aparece junto da notificação nos dispositivos compatíveis.
4. Uma prévia ao vivo mostra como a notificação vai aparecer no dispositivo.
5. Clique em **Enviar Notificação**.

:::info
As notificações push são entregues apenas aos membros do grupo que têm o PWA do B1.church instalado e não desativaram as notificações push. Membros sem um dispositivo registrado para push ou com push desativado são contados como ignorados, e o resumo do envio mostra quantos foram alcançados e quantos foram ignorados.
:::

:::tip
Depois do envio, a caixa mostra quantas notificações foram colocadas na fila com sucesso. Se a maioria dos membros aparecer como ignorada, lembre-os de acessar o site do B1.church, instalá-lo como aplicativo na tela inicial e permitir as notificações quando solicitado.
:::

## Removendo Membros

Para remover alguém de um grupo, localize o nome dela na lista de membros e clique no botão **remover** ao lado da entrada dela.

:::info
Remover uma pessoa de um grupo não a exclui do diretório da igreja. Ela continuará aparecendo na seção de [Pessoas](../people/adding-people.md) e poderá ser adicionada novamente ao grupo a qualquer momento.
:::
