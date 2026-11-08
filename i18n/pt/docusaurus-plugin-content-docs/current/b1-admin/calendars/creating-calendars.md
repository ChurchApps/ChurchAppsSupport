---
title: "Criando Calendários"
description: "Crie um calendário no B1 Admin, conecte grupos ou importe arquivos .ics e gerencie seus eventos, inscrições e notas em um só lugar."
---

# Criando Calendários

<div class="article-intro">

Criar um calendário no B1 Admin permite montar uma visão selecionada de eventos ao conectar um ou mais grupos. Os eventos são gerenciados pelos líderes de cada grupo, e o seu calendário exibe esses eventos em um único lugar. Administradores com acesso de edição podem adicionar ou editar eventos de qualquer grupo. Líderes de grupo que não são administradores só podem gerenciar eventos dos grupos que lideram.

</div>

## Vídeo de Treinamento

<YouTube id="Ko3kgsCSLFs" title="Criando Calendários, Eventos e Reservas de Salas no B1" next="Inscrições em Eventos e Eventos Pagos no B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você deseja incluir no seu calendário
- Você precisa de acesso administrativo à seção Calendários no B1 Admin

</div>

## Criando um Novo Calendário

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários** e clique em **Calendários**.
2. Clique em **Adicionar Calendário** no topo da página. O formulário de novo calendário será aberto abaixo da lista de calendários.
3. Digite um **nome** para o seu calendário (por exemplo, "Eventos do Ministério Jovem" ou "Calendário Principal da Igreja").
4. Adicione uma **descrição** opcional para ajudar sua equipe a entender a finalidade deste calendário.
5. Clique em **Criar** para salvar o novo calendário.

## A Página de Detalhes do Calendário

Depois de criar um calendário, clique em **Gerenciar Eventos** na linha correspondente para abrir a página de detalhes. Essa página tem duas áreas principais:

- **Coluna esquerda** -- O nome do calendário com suas ações (**Novo Evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido pela lista **Grupos no Calendário**, que mostra quais grupos estão incluídos neste calendário. Clique em **Remover** ao lado de um grupo para retirá-lo do calendário.
- **Área principal** -- A visualização **Eventos do Calendário**, com os eventos trazidos dos grupos conectados, e os botões **Assinar** e **Adicionar Grupo** acima dela.

## Conectando Grupos

Os grupos que possuem eventos no calendário aparecem automaticamente na lista **Grupos no Calendário**, do lado esquerdo da página de detalhes.

1. Clique em **Adicionar Grupo** acima do calendário para associar um grupo ao seu calendário.
2. Selecione o grupo na lista suspensa. A lista inclui todos os grupos da sua igreja, e não apenas os grupos aos quais você pertence.
3. Escolha se deseja incluir **todos os eventos** daquele grupo ou apenas **eventos específicos**.
4. Clique em **Salvar**.

Cada evento aparece no calendário apenas uma vez. Se você adicionar um grupo inteiro, quaisquer eventos desse grupo que você tenha adicionado antes, um a um, serão incorporados à entrada do grupo. Além disso, escolher eventos específicos de um grupo que já está no calendário não acrescenta nada novo. Somente os grupos adicionados por inteiro aparecem na lista **Grupos no Calendário**.

### Importando um Arquivo .ics

Clique em **Importar .ics** para trazer eventos de outro calendário. Escolha o **Grupo** ao qual os eventos devem pertencer e, em seguida, clique em **Escolher arquivo .ics** ou cole o conteúdo do arquivo, e clique em **Importar**. Os eventos serão criados nesse grupo, e o grupo será adicionado ao calendário do qual você importou, para que os eventos apareçam ali imediatamente.

### Removendo um Evento do Calendário

Clique em um evento no calendário e, depois, clique em **Remover do Calendário**. Isso apenas retira o evento deste calendário -- o evento em si permanece no seu grupo. Se o evento está no calendário porque o grupo inteiro foi adicionado, remover esse evento fará com que todos os eventos desse grupo sejam retirados deste calendário (os eventos continuam existindo no grupo). Para excluir um evento definitivamente, exclua-o pelo [calendário do grupo](../groups/group-calendar.md).

:::tip
Conectar grupos ao seu calendário é uma forma poderosa de agregar eventos automaticamente. Quando um líder de grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode aparecer no calendário de toda a igreja sem nenhum trabalho extra da sua parte.
:::

:::info
Se você quiser criar um único calendário que reúna eventos de muitos grupos da sua igreja, consulte [Calendário Curado](./curated-calendar.md) para uma abordagem mais simples.
:::

## Adicionando e Editando Eventos {#adding-and-editing-events}

Clique em **Novo Evento** na página de detalhes do calendário para adicionar um evento, ou clique em um evento no calendário e depois em **Editar** para alterá-lo. O formulário **Novo Evento** / **Editar Evento** tem estes campos:

- **Grupo** -- O grupo ao qual o evento pertence. Se a sua igreja tiver modelos de eventos, você também pode escolher um **Modelo** para preencher o formulário.
- **Título**
- **Foto do evento** -- Clique em **Adicionar Foto** (ou na caixa de foto vazia) para escolher ou enviar uma imagem, recortada no formato panorâmico 16:9. Clique em **Alterar Foto** para substituí-la. A foto é exibida no topo da página do evento no seu site e como seu bloco quando um elemento de Calendário mostra **Próximos eventos** (consulte [Exibindo Eventos no Seu Site](#showing-events-on-your-website)).
- **Descrição** -- Exibida na página do evento no seu site. Texto em negrito, listas e links são compatíveis.
- **Início** e **Término**, **Repetição** e **Visibilidade** (**Público** ou **Privado**).
- **Tags** -- Rótulos separados por vírgula, como `jovens, estudantes`. Um elemento de Calendário no seu site pode ser configurado para mostrar apenas eventos com determinada tag. Este é o mesmo campo **Tags** exibido nas configurações de inscrição do evento.
- **Quem pode ver as notas** e **Quem pode publicar notas** -- Quem pode ler e adicionar às notas do evento (consulte [Notas do Evento](#event-notes)). Escolha **Somente equipe** (o padrão), **Líderes de grupo** (líderes do grupo do evento) ou **Membros do grupo** (todos no grupo do evento, incluindo seus líderes).
- **Salas** e **Recursos** -- Reserve espaço e equipamentos para o evento. Consulte [Salas, Recursos e Agendamento](./rooms-resources.md).

Clique em **Salvar**. Se o evento se repetir, o B1 pedirá que você confirme, porque salvar atualiza todas as ocorrências da série.

### Notas do Evento {#event-notes}

Cada evento tem sua própria linha de notas para planejamento e acompanhamento. Clique em um evento na página de detalhes do calendário; a caixa de diálogo mostra os detalhes do evento, seus lembretes e suas **Notas** logo abaixo. Digite uma nota e publique-a para adicioná-la à conversa.

A equipe com permissão para editar conteúdo ou administrar calendários sempre pode ler e publicar notas de eventos. As configurações **Quem pode ver as notas** e **Quem pode publicar notas** do evento definem se os líderes ou membros do grupo do evento também podem fazê-lo.

### Exibindo Eventos no Seu Site {#showing-events-on-your-website}

Para colocar um calendário no seu site, adicione um elemento **Calendário** a uma página e escolha este calendário. O elemento pode mostrar um calendário mensal ou uma grade de blocos de próximos eventos, e pode ser limitado a eventos com uma tag específica. Os visitantes que clicarem em um evento abrem a página própria desse evento. Consulte [Usando o elemento Calendário](../website/page-editor.md#using-the-calendar-element).

## Ativando a Inscrição em Eventos {#enabling-event-registration}

Você pode ativar inscrições para qualquer evento do calendário, para que os membros se inscrevam pelo site do B1 ou pelo aplicativo móvel.

1. Clique em um evento existente ou crie um novo.
2. No editor de eventos, ative a opção **Inscrição**.
3. Configure as definições de inscrição:
   - **Capacidade** (opcional) -- Defina um número máximo de inscrições. Deixe em branco para ilimitado.
   - **Inscrições Abrem** -- A data e a hora em que as inscrições ficam disponíveis.
   - **Inscrições Encerram** -- A data e a hora em que as inscrições são encerradas.
   - **Tags** -- Rótulos separados por vírgula (por exemplo, "jovens, retiro, VBS") para ajudar a categorizar os eventos com inscrição.
   - **Perguntas de Inscrição** -- Opcionalmente, anexe um [formulário](../forms/creating-forms.md) para que os inscritos respondam perguntas adicionais (restrições alimentares, tamanho da camiseta, contato de emergência etc.) como parte da inscrição. Escolha **Nenhum** para não fazer perguntas.
   - **Ativar Lista de Espera** -- Quando o evento lotar, permita que inscritos adicionais entrem em uma lista de espera em vez de serem recusados. Consulte [Inscrições Pagas](./paid-registrations.md#waitlist).
4. Salve o evento.

Para eventos pagos, a mesma página de configurações permite definir **Tipos de Participante** com preço, **Seleções** opcionais (complementos) e **Códigos de Desconto**, com o pagamento processado pelo provedor de doações da sua igreja. Consulte [Inscrições Pagas](./paid-registrations.md) para o passo a passo completo.

Quando a inscrição estiver ativada, os membros verão um botão **Inscrever-se neste Evento** ao visualizar o evento em [B1.church ou no Aplicativo B1](../../b1-church/events/registering.md). Se você anexou um formulário, os inscritos verão uma etapa de **Perguntas** durante a inscrição, e suas respostas serão salvas junto com a inscrição.

:::info
As Perguntas de Inscrição funcionam apenas com formulários que **não** estão marcados como Restritos. Um formulário restrito é ignorado automaticamente durante a inscrição, em vez de ser exibido; por isso, use um formulário não restrito ao anexar perguntas a um evento.
:::

### Gerenciando Inscrições

Para ver e gerenciar as inscrições dos seus eventos:

1. No menu Jump, escolha **Calendários > Inscrições**.
2. Você verá uma tabela com todos os eventos com inscrição ativada, mostrando o título do evento, a data, a quantidade atual de inscritos em relação à capacidade e as tags.
3. Clique em um evento para ver a lista completa de inscrições, incluindo nomes, número de membros, tipos de participante, situação do pagamento e data da inscrição.
4. Na página de detalhes, você pode:
   - **Adicionar Participante** -- Inscrever manualmente alguém que se inscreveu presencialmente ou por telefone.
   - **Cancelar** inscrições individuais
   - **Excluir** inscrições permanentemente
   - **Promover** inscritos da lista de espera quando surgir uma vaga
   - **Exportar CSV** -- Baixe todas as inscrições, incluindo tipos de participante, seleções, valores pagos e respostas às perguntas

Se o evento tiver Perguntas de Inscrição anexadas, a página de detalhes também mostra um filtro **Somente perguntas sem resposta** para encontrar rapidamente os inscritos que ainda não enviaram respostas, além de um botão **Ver Respostas** em cada inscrição respondida, para ver as respostas. Eventos pagos acrescentam uma coluna **Tipo**, uma coluna **Pago / Total**, contagens por tipo e uma caixa de diálogo com os detalhes de pagamentos -- consulte [Inscrições Pagas](./paid-registrations.md#the-registration-roster).

:::tip
Use a barra de progresso de capacidade para acompanhar a rapidez com que os eventos estão lotando. A barra fica vermelha quando um evento atinge ou ultrapassa a capacidade.
:::

## Próximos Passos

- [Calendário Curado](./curated-calendar.md) -- Crie um calendário que reúne eventos de vários grupos
- [Inscrições Pagas](./paid-registrations.md) -- Tipos de participante, seleções de complementos, códigos de desconto, pagamentos e listas de espera
- [Guia de Inscrição em Eventos](../guides/event-registration.md) -- Passo a passo para configurar a inscrição em eventos
- [Visão Geral dos Calendários](./index.md) -- Voltar à visão geral dos calendários
