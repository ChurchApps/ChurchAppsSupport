---
title: "Criando calendários"
---

# Criando calendários

<div class="article-intro">

Criar um calendário no B1 Admin permite montar uma visão organizada de eventos, conectando um ou mais grupos. Os eventos são gerenciados pelos líderes de cada grupo, e o seu calendário exibe esses eventos em um só lugar. Administradores com acesso de edição podem adicionar ou editar eventos de qualquer grupo. Líderes de grupo que não são administradores podem gerenciar apenas os eventos dos grupos que lideram.

</div>

## Vídeo de treinamento

<YouTube id="Ko3kgsCSLFs" title="Creating Calendars, Events, and Room Bookings in B1" next="Event Registration and Paid Events in B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você quer incluir no seu calendário
- Você precisa de acesso administrativo à seção Calendários do B1 Admin

</div>

## Criando um novo calendário

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários** e clique em **Calendários**.
2. Clique em **Adicionar calendário** no topo da página. O formulário de novo calendário abre abaixo da lista de calendários.
3. Digite um **nome** para o seu calendário (por exemplo, "Eventos do Ministério de Jovens" ou "Calendário Principal da Igreja").
4. Adicione uma **descrição** opcional para ajudar a sua equipe a entender para que serve este calendário.
5. Clique em **Criar** para salvar o novo calendário.

## A página de detalhes do calendário

Depois de criar um calendário, clique em **Gerenciar eventos** na linha dele para abrir a página de detalhes. Esta página tem duas áreas principais:

- **Coluna da esquerda** -- O nome do calendário com suas ações (**Novo evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido da lista **Grupos no calendário**, que mostra quais grupos estão incluídos neste calendário. Clique em **Remover** ao lado de um grupo para tirá-lo do calendário.
- **Área principal** -- A visão **Eventos do calendário**, com os eventos trazidos dos grupos conectados, e os botões **Assinar** e **Adicionar grupo** acima dela.

## Conectando grupos

Os grupos que têm eventos no calendário aparecem automaticamente na lista **Grupos no calendário**, do lado esquerdo da página de detalhes.

1. Clique em **Adicionar grupo** acima do calendário para associar um grupo a ele.
2. Selecione o grupo na lista suspensa. A lista inclui todos os grupos da sua igreja, não apenas os grupos de que você participa.
3. Escolha se quer incluir **todos os eventos** daquele grupo ou apenas **eventos específicos**.
4. Clique em **Salvar**.

Cada evento aparece no calendário apenas uma vez. Se você adicionar um grupo inteiro, quaisquer eventos dele que você já tinha adicionado um a um serão incorporados à entrada do grupo, e escolher eventos específicos de um grupo que já está no calendário não adiciona nada de novo. Somente os grupos adicionados por inteiro aparecem na lista **Grupos no calendário**.

### Importando um arquivo .ics

Clique em **Importar .ics** para trazer eventos de outro calendário. Escolha o **Grupo** ao qual os eventos devem pertencer e, em seguida, clique em **Escolher arquivo .ics** ou cole o conteúdo do arquivo, e clique em **Importar**. Os eventos são criados nesse grupo, e o grupo é adicionado ao calendário de onde você importou, para que os eventos apareçam ali imediatamente.

### Removendo um evento do calendário

Clique em um evento no calendário e, depois, em **Remover do calendário**. Isso apenas tira o evento deste calendário -- o evento em si continua no seu grupo. Se o evento está no calendário porque o grupo inteiro foi adicionado, remover esse evento tira todos os eventos daquele grupo deste calendário (os eventos continuam no grupo). Para excluir um evento definitivamente, exclua-o pelo [calendário do grupo](../groups/group-calendar.md).

:::tip
Conectar grupos ao seu calendário é uma forma eficiente de agregar eventos automaticamente. Quando um líder de grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode aparecer no calendário de toda a igreja sem nenhum trabalho extra da sua parte.
:::

:::info
Se você quiser criar um único calendário que reúna eventos de muitos grupos da sua igreja, consulte [Calendário curado](curated-calendar) para uma abordagem mais simples.
:::

## Adicionando e editando eventos {#adding-and-editing-events}

Clique em **Novo evento** na página de detalhes do calendário para adicionar um evento, ou clique em um evento no calendário e depois em **Editar** para alterá-lo. O formulário **Novo evento** / **Editar evento** tem estes campos:

- **Grupo** -- O grupo ao qual o evento pertence. Se a sua igreja tiver modelos de evento, você também pode escolher um **Modelo** para preencher o formulário.
- **Título**
- **Foto do evento** -- Clique em **Adicionar foto** (ou na caixa de foto vazia) para escolher ou enviar uma imagem, recortada no formato largo 16:9. Clique em **Alterar foto** para substituí-la. A foto aparece no topo da página do evento no seu site e como seu bloco quando um elemento Calendário mostra **Próximos eventos** (consulte [Exibindo eventos no seu site](#showing-events-on-your-website)).
- **Descrição** -- Exibida na página do evento no seu site. Texto em negrito, listas e links são aceitos.
- **Início** e **Fim**, **Repetir** e **Visibilidade** (**Público** ou **Privado**).
- **Tags** -- Rótulos separados por vírgula, como `youth, students`. Um elemento Calendário no seu site pode ser configurado para mostrar apenas eventos com uma determinada tag. Este é o mesmo campo **Tags** exibido nas configurações de inscrição do evento.
- **Quem pode ver as anotações** e **Quem pode publicar anotações** -- Quem pode ler e incluir anotações no evento (consulte [Anotações do evento](#event-notes)). Escolha **Somente equipe** (o padrão), **Líderes de grupo** (líderes do grupo do evento) ou **Membros do grupo** (todos no grupo do evento, incluindo os líderes).
- **Salas** e **Recursos** -- Reserve espaço e equipamentos para o evento. Consulte [Salas, recursos e agendamento](rooms-resources).

Clique em **Salvar**. Se o evento se repetir, o B1 pede que você confirme, porque salvar atualiza todas as ocorrências da série.

### Anotações do evento {#event-notes}

Cada evento tem sua própria sequência de anotações para planejamento e acompanhamento. Clique em um evento na página de detalhes do calendário; a janela mostra os detalhes do evento, seus lembretes e suas **Anotações** abaixo. Digite uma anotação e publique-a para adicioná-la à sequência.

A equipe com permissão para editar conteúdo ou administrar calendários sempre pode ler e publicar anotações do evento. As configurações **Quem pode ver as anotações** e **Quem pode publicar anotações** do evento definem se os líderes ou membros do grupo do evento também podem.

### Exibindo eventos no seu site {#showing-events-on-your-website}

Para colocar um calendário no seu site, adicione um elemento **Calendário** a uma página e escolha este calendário. O elemento pode mostrar um calendário mensal ou uma grade de blocos de próximos eventos, e pode ser limitado a eventos com uma tag. Os visitantes que clicam em um evento abrem a página própria dele. Consulte [Usando o elemento Calendário](../website/page-editor.md#using-the-calendar-element).

## Ativando inscrições em eventos {#enabling-event-registration}

Você pode ativar inscrições em qualquer evento do calendário para que os membros se inscrevam pelo site ou pelo aplicativo móvel do B1.

1. Clique em um evento existente ou crie um novo.
2. No editor de eventos, ative **Inscrições**.
3. Configure as opções de inscrição:
   - **Capacidade** (opcional) -- Defina um número máximo de inscrições. Deixe em branco para ilimitado.
   - **Inscrições abrem** -- A data e a hora em que as inscrições ficam disponíveis.
   - **Inscrições fecham** -- A data e a hora em que as inscrições se encerram.
   - **Tags** -- Rótulos separados por vírgula (por exemplo, "jovens, retiro, VBS") para ajudar a categorizar eventos com inscrição.
   - **Perguntas de inscrição** -- Opcionalmente, anexe um [formulário](../forms/creating-forms.md) para que os inscritos respondam perguntas extras (restrições alimentares, tamanho de camiseta, contato de emergência etc.) como parte da inscrição. Escolha **Nenhum** para não ter perguntas.
   - **Ativar lista de espera** -- Quando o evento lota, permite que inscritos adicionais entrem em uma lista de espera em vez de serem recusados. Consulte [Inscrições pagas](paid-registrations#waitlist).
4. Salve o evento.

Para eventos pagos, a mesma página de configurações permite definir **Tipos de participante** com preços, **Seleções** opcionais (complementos) e **Códigos de desconto**, com pagamento processado pelo provedor de doações da sua igreja. Consulte [Inscrições pagas](paid-registrations) para o passo a passo completo.

Depois que a inscrição estiver ativada, os membros verão o botão **Inscreva-se neste evento** quando abrirem o evento no [site do B1](../../b1-church/events/registering) ou no [aplicativo móvel do B1](../../b1-mobile/events/registering). Se você anexou um formulário, os inscritos verão uma etapa **Perguntas** durante a inscrição, e as respostas serão salvas junto com a inscrição.

:::info
As perguntas de inscrição funcionam apenas com formulários que **não** estão marcados como Restrito. Um formulário restrito é ignorado automaticamente durante a inscrição em vez de ser exibido; por isso, use um formulário sem restrição ao anexar perguntas a um evento.
:::

### Gerenciando inscrições

Para ver e gerenciar as inscrições dos seus eventos:

1. No menu Jump, escolha **Calendários > Inscrições**.
2. Você verá uma tabela com todos os eventos com inscrição ativada, mostrando o título do evento, a data, a contagem atual de inscrições em relação à capacidade e as tags.
3. Clique em um evento para ver a lista completa de inscrições, incluindo nomes, número de membros, tipos de participante, situação do pagamento e data da inscrição.
4. Na página de detalhes, você pode:
   - **Adicionar participante** -- Inscrever manualmente alguém que se inscreveu offline ou por telefone.
   - **Cancelar** inscrições individuais
   - **Excluir** inscrições permanentemente
   - **Promover** inscrições da lista de espera quando surgir uma vaga
   - **Exportar CSV** -- Baixar todas as inscrições, incluindo tipos de participante, seleções, valores pagos e respostas às perguntas

Se o evento tiver perguntas de inscrição anexadas, a página de detalhes também mostra um filtro **Somente perguntas sem resposta** para encontrar rapidamente os inscritos que ainda não enviaram respostas, e um botão **Ver respostas** em cada inscrição respondida para ver as respostas. Eventos pagos acrescentam uma coluna **Tipo**, uma coluna **Pago / Total**, contagens por tipo e uma janela de detalhes de pagamentos -- consulte [Inscrições pagas](paid-registrations#the-registration-roster).

:::tip
Use a barra de progresso da capacidade para acompanhar a rapidez com que os eventos estão lotando. A barra fica vermelha quando um evento atinge ou ultrapassa a capacidade.
:::

## Próximos passos

- [Calendário curado](curated-calendar) -- Crie um calendário que reúna vários grupos
- [Inscrições pagas](paid-registrations) -- Tipos de participante, complementos, códigos de desconto, pagamentos e listas de espera
- [Guia de inscrição em eventos](../guides/event-registration) -- Passo a passo para configurar inscrições em eventos
- [Visão geral dos calendários](./) -- Volte à visão geral dos calendários
