---
title: "Membros do grupo"
---

# Membros do grupo

<div class="article-intro">

Depois de criar um grupo, o próximo passo é adicionar membros. Na página de detalhes do grupo você pode pesquisar pessoas, adicioná-las ao grupo, designar líderes, enviar mensagens e exportar a lista de membros. Gerenciar a participação nos grupos é essencial para coordenar pequenos grupos, comitês e turmas.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de pelo menos um grupo configurado no B1 Admin. Veja [Criando grupos](creating-groups.md) se ainda não criou um.
- As pessoas que você quer adicionar devem já estar no seu diretório de [Pessoas](../people/adding-people.md). Se alguém não estiver, você pode criá-lo a partir da busca de membros (veja abaixo).

</div>

## Adicionando membros a um grupo

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Pessoas > Grupos** e clique no grupo que deseja gerenciar.
2. Na seção **Membros** da página do grupo, clique em **Todos os membros**. (Equipes e ministérios abrem diretamente a lista de membros.)
3. Na caixa **Adicionar pessoa** abaixo da lista de membros, digite o nome da pessoa que deseja adicionar e pressione **Enter** ou clique no ícone de busca.
4. Clique no nome da pessoa, ou no ícone de adicionar ao lado dele, nos resultados da busca.
5. A pessoa agora aparece na lista de membros do grupo.

:::tip
Antes de digitar qualquer coisa, a caixa **Adicionar pessoa** mostra uma lista curta de **Pessoas recentes** que você pode adicionar com um clique.
:::

Quando terminar, clique no link **Voltar para** com o nome do grupo para retornar à página do grupo. A página do grupo mostra um resumo de **Membros**, **Sessões**, **Calendário** e **Saúde**, cada um com um link para sua visão completa. Se você for um dos líderes do grupo, ela também mostra as **Notas de liderança** (veja [Notas de liderança](#leader-notes) abaixo). Quando há formulários vinculados ao grupo, aparece também uma seção **Formulários vinculados** (veja [Formulários vinculados](#linked-forms) abaixo).

### Adicionando alguém que ainda não está no B1

Se a sua busca não encontrar ninguém, a busca mostra **Nenhum registro encontrado** com um link **Adicionar nova pessoa**. Clique nele, digite o primeiro nome, o sobrenome e (opcionalmente) o e-mail da pessoa, e clique em **Adicionar**. A nova pessoa é criada no seu diretório de Pessoas e adicionada ao grupo em uma única etapa — você não precisa pesquisá-la novamente.

## Designando líderes de grupo {#designating-group-leaders}

Os líderes de grupo têm privilégios especiais — podem editar o [calendário do grupo](group-calendar.md), gerenciar eventos e ajudar a coordenar o grupo.

1. Na lista de membros do grupo, encontre a pessoa que você quer tornar líder.
2. Clique no **ícone de estrela** (**Tornar líder**) ao lado do nome dela.
3. A pessoa agora é designada como líder de grupo e exibe um selo **Líder**.

Para remover o status de líder, clique novamente no ícone de estrela (**Remover acesso de líder**).

:::info
Qualquer membro do grupo pode ver o calendário e os eventos do grupo, mas somente os líderes podem adicionar ou editar eventos do calendário.
:::

## Formulários vinculados {#linked-forms}

Quando um formulário Independente é [vinculado ao grupo](../forms/creating-forms.md#linking-a-form-to-a-group), a página do grupo mostra uma seção **Formulários vinculados** com o nome de cada formulário, se ele está **Aberto** ou **Encerrado**, e quantos formulários estão vinculados. A seção aparece somente para os líderes do grupo e para pessoas que podem administrar formulários, e somente quando pelo menos um formulário está vinculado. Administradores de formulários podem clicar no nome de um formulário para abri-lo, ou em **Todos os formulários** para ir à página de Formulários.

Os líderes do grupo leem e imprimem as respostas desses formulários a partir da página do grupo no [B1.church](../../b1-church/groups/group-details.md#linked-forms).

## Notas de liderança {#leader-notes}

Os líderes de grupo podem manter notas privadas sobre o grupo — por exemplo, acompanhamentos, pedidos de oração ou preocupações pastorais — que o restante do grupo nunca vê.

A seção **Notas de liderança** aparece na página do grupo somente para as pessoas que são líderes desse grupo. Ela mostra a nota mais recente, quem a escreveu e quando, e quantas notas existem.

1. Na página do grupo, clique em **Todas as notas** na seção **Notas de liderança**.
2. Digite sua nota na caixa e publique-a. As notas são listadas com o nome e a foto do autor e a data e a hora em que cada uma foi publicada.
3. Clique no link **Voltar para** com o nome do grupo para retornar à página do grupo.

:::info
As notas de liderança são visíveis apenas para os líderes do grupo. Outros membros não podem vê-las, e nem a equipe nem os administradores — mesmo com permissões totais — podem, a menos que também sejam líderes desse grupo. Para dar acesso a outra pessoa, [torne-a líder](#designating-group-leaders). Os líderes também veem essas notas na seção **Notas de liderança** da página do grupo no [B1.church](../../b1-church/groups/group-details.md#leader-notes) e na aba **Grupos** da página [Notas](../people/notes.md) no B1 Admin.
:::

## Enviando mensagens aos membros do grupo

Você pode se comunicar com todos os membros de um grupo diretamente pelo B1 Admin:

1. Na lista de membros do grupo, clique no ícone **Enviar uma mensagem aos membros** acima da lista.
2. Digite sua mensagem na caixa de texto (ou escolha uma em **Modelos**).
3. Clique em **Enviar**.

Sua mensagem será entregue a todos os membros do grupo.

## Enviando e-mails aos membros do grupo

Você pode enviar e-mails formatados para todos os membros de um grupo:

1. A partir da página de detalhes do grupo, clique no botão **E-mail** no lado esquerdo da página.
2. A janela Enviar e-mail é aberta, mostrando quantos membros receberão o e-mail e quantos não têm endereço de e-mail cadastrado.
3. Opcionalmente, selecione um **modelo de e-mail** na lista suspensa ou escreva uma mensagem do zero. Clique em **Gerenciar modelos** para criar ou editar modelos.
4. Digite um **assunto**. Você pode inserir campos de mesclagem clicando nos chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}` e **Nome do grupo** (`{{groupName}}`), que é preenchido com o nome do grupo.
5. Escreva o **corpo do e-mail** usando o editor HTML. Os mesmos campos de mesclagem estão disponíveis aqui.
6. Clique em **Enviar**.
7. Um resumo mostra quantos e-mails foram enviados com sucesso e quantos membros foram ignorados (sem e-mail cadastrado).

:::tip
Crie modelos de e-mail reutilizáveis para comunicações recorrentes, como atualizações semanais, anúncios de eventos ou pedidos de oração. Os modelos economizam tempo e garantem uma mensagem consistente.
:::

### Ativando o e-mail de grupo para sua igreja {#turning-on-group-email-for-your-church}

Todas as igrejas no B1 enviam e-mails do mesmo endereço e, por isso, compartilham a mesma reputação de envio. Para evitar que os e-mails de todos caiam na caixa de spam, a equipe da ChurchApps analisa cada igreja uma vez antes que ela possa enviar e-mails de grupo.

Se a sua igreja ainda não foi analisada, a janela Enviar e-mail mostra **O e-mail de grupo precisa de uma análise rápida** no lugar do editor de mensagens:

1. Clique em **Solicitar análise**. A equipe de suporte da ChurchApps é notificada.
2. A janela muda para **Análise solicitada**. Você pode fechá-la.
3. O e-mail de grupo geralmente é ativado em até um dia útil. Depois disso, abra novamente a janela Enviar e-mail para enviar sua mensagem.

Até que sua igreja seja aprovada, o B1 também não envia os [e-mails de acompanhamento de formulários](../forms/creating-forms.md#sending-a-follow-up-email) nem a etapa **Enviar e-mail** dos [fluxos de trabalho](../serving/workflows.md).

:::info Limites de envio
Após a aprovação, uma igreja pode enviar até 150 e-mails escritos pela igreja por dia. O limite aumenta conforme sua igreja constrói um histórico de envio limpo, chegando a 2.000 por dia. Se mensagens recentes tiverem sido devolvidas ou marcadas como spam, o e-mail de grupo é pausado e a janela pede que você entre em contato com o suporte. Se um envio ultrapassar o seu limite diário, o B1 não o envia e exibe um erro.
:::

## Enviando mensagens de texto aos membros do grupo {#texting-group-members}

Assim que sua igreja tiver conectado um [provedor de SMS](../settings/church-settings.md#texting), um botão **Texto** (**Enviar texto a este grupo**) aparece ao lado do botão **E-mail** na página do grupo.

1. A partir da página de detalhes do grupo, clique em **Texto**.
2. A janela mostra quantos membros receberão a mensagem. Membros sem celular cadastrado ou que cancelaram a inscrição são ignorados.
3. Opcionalmente, escolha uma mensagem de texto salva em **Carregar modelo (opcional)** para preencher a mensagem. O seletor aparece assim que sua igreja tiver [modelos de texto](../settings/email-templates.md#text-templates); quem pode editar configurações também vê um link **Gerenciar modelos**.
4. Digite ou edite sua mensagem. Para personalizá-la, clique em um chip de marcador abaixo da caixa de mensagem — **Primeiro nome**, **Sobrenome**, **Nome de exibição**, **Nome da igreja** ou **Nome do grupo** — para inseri-lo na posição do cursor. Cada marcador é preenchido com os dados do próprio destinatário quando o texto é enviado; **Nome do grupo** se torna o nome do grupo.
5. Clique em **Enviar**.

Veja [Personalizando textos com campos de mesclagem](../settings/church-settings.md#personalizing-texts-with-merge-fields) para mais detalhes.

## Exportando os dados do grupo

Para baixar a lista de membros do grupo como arquivo:

1. Na lista de membros do grupo, clique em **Exportar** acima da lista.
2. Um arquivo CSV com as informações dos membros do grupo será baixado para o seu computador.

A exportação em CSV é útil para importar dados em outras ferramentas ou para manter registros offline. Para mais opções de exportação, veja [Exportando dados](../people/exporting-data.md).

## Imprimindo a lista de membros {#printing-the-member-list}

Na lista de membros do grupo, clique no ícone **Imprimir folha de chamada** (impressora) acima da lista e escolha um layout. A página abre em uma nova aba e a janela de impressão do navegador aparece automaticamente.

- **Folha de presença** -- uma lista de turma sem data, com as caixas **Presente** e **Ausente** para os professores marcarem à mão. Veja [Imprimindo uma folha de chamada](../attendance/recording-attendance.md#printing-a-roll-sheet).
- **Lista de contatos** -- uma lista de contatos do grupo, datada de hoje e com o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) no cabeçalho, com o nome da igreja abaixo e o nome do grupo. Cada membro tem uma linha com seu **Nome**, **Telefone**, **E-mail** e **Endereço**. Os líderes aparecem primeiro e são marcados como **Líder**, e depois todos os demais por sobrenome. O telefone exibido é o celular do membro ou, se ele não tiver celular, o telefone residencial ou comercial. Os dados de contato ficam em branco para quem cancelou a inscrição.

:::warning
Uma lista de contatos contém informações pessoais de contato dos membros. Compartilhe as cópias impressas somente com os líderes do grupo e com outras pessoas que precisem delas.
:::

## Enviando notificações push aos membros do grupo {#sending-push-notifications-to-group-members}

Você pode enviar uma notificação push diretamente a todos os membros do grupo que têm o aplicativo B1.church instalado no dispositivo com notificações push ativadas.

1. Na página de detalhes do grupo, clique em **Notificar** (abaixo dos botões **E-mail** e **Texto** — o botão **Texto** aparece assim que um [provedor de SMS](../settings/church-settings.md#texting) estiver conectado).
2. Uma janela é aberta mostrando quantos membros do grupo têm as notificações push ativadas.
3. Preencha os detalhes da notificação:
   - **Título** *(obrigatório)* -- Um resumo curto, de até 80 caracteres.
   - **Mensagem** *(obrigatória)* -- O corpo da notificação, de até 240 caracteres.
   - **Link para abrir ou URL do panfleto** *(opcional)* -- Um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL completa `https://` que a notificação abre ao ser tocada.
   - **URL da imagem** *(opcional)* -- Uma URL `https://` de uma imagem que aparece junto com a notificação em dispositivos compatíveis.
4. Uma prévia ao vivo mostra como a notificação vai aparecer no dispositivo.
5. Clique em **Enviar notificação**.

:::info
As notificações push são entregues somente aos membros do grupo que instalaram o PWA do B1.church e não desativaram as notificações push. Membros sem um dispositivo de push registrado ou com as notificações desativadas são contados como ignorados, e o resumo do envio mostra quantos foram alcançados e quantos foram ignorados.
:::

:::tip
Depois do envio, a janela mostra quantas notificações foram colocadas na fila com sucesso. Se a maioria dos membros aparecer como ignorada, lembre-os de visitar o site do B1.church deles, instalá-lo como aplicativo na tela inicial e permitir as notificações quando solicitado.
:::

## Removendo membros

Para remover alguém do grupo, localize o nome dele na lista de membros e clique no botão **remover** ao lado do registro.

:::info
Remover uma pessoa do grupo não a exclui do diretório da igreja. Ela continuará aparecendo na seção [Pessoas](../people/adding-people.md) e pode ser adicionada novamente ao grupo a qualquer momento.
:::
