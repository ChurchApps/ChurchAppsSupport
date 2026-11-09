---
title: "Criando calendários"
description: "Crie um calendário no B1 Admin, conecte grupos ou importe arquivos .ics e gerencie os eventos, as inscrições e as anotações em um só lugar."
---

# Criando calendários

<div class="article-intro">

Criar um calendário no B1 Admin permite montar uma visão personalizada de eventos conectando um ou mais grupos. Os eventos são gerenciados pelos líderes de cada grupo dentro dos seus grupos, e o seu calendário exibe esses eventos em um só lugar. Administradores com acesso de edição podem adicionar ou editar eventos de qualquer grupo. Líderes de grupo que não são administradores só podem gerenciar os eventos dos grupos que lideram.

</div>

## Vídeo de treinamento

<YouTube id="Ko3kgsCSLFs" title="Criando Calendários, Eventos e Reservas de Salas no B1" next="Inscrições em Eventos e Eventos Pagos no B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você quer incluir no seu calendário
- Você precisa de acesso administrativo à seção Calendários no B1 Admin

</div>

## Criando um novo calendário

1. No B1 Admin, abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Calendários** e clique em **Calendários**.
2. Clique em **Adicionar calendário** no topo da página. O formulário de novo calendário abre abaixo da lista de calendários.
3. Digite um **nome** para o seu calendário (por exemplo, "Eventos do Ministério Jovem" ou "Calendário Principal da Igreja").
4. Adicione uma **descrição** opcional para ajudar sua equipe a entender para que serve este calendário.
5. Clique em **Criar** para salvar o novo calendário.

## A página de detalhes do calendário

Depois de criar um calendário, clique em **Gerenciar eventos** na linha dele para abrir a página de detalhes. Ela tem duas áreas principais:

- **Coluna esquerda** -- O nome do calendário com suas ações (**Novo evento**, **Editar**, **Importar .ics** e **Imprimir**), seguido da lista **Grupos no calendário**, que mostra quais grupos estão incluídos neste calendário. Clique em **Remover** ao lado de um grupo para tirá-lo do calendário.
- **Área principal** -- A visualização **Eventos do calendário**, com os eventos trazidos dos grupos conectados, e os botões **Assinar** e **Adicionar grupo** acima dela. Cada evento é desenhado na cor do seu grupo. As cores são escolhidas automaticamente, e um grupo mantém a mesma cor em todos os calendários.

Clique em **Imprimir** para obter um mês para impressão. A impressão começa com o logotipo da igreja para fundo claro (em [Aparência](../website/appearance.md), se você tiver definido um), o nome da igreja e o nome do calendário. Os nomes dos eventos quebram em mais linhas em vez de serem cortados, e as cores dos grupos são mantidas.

## Conectando grupos

Os grupos que têm eventos no calendário aparecem automaticamente na lista **Grupos no calendário**, do lado esquerdo da página de detalhes.

1. Clique em **Adicionar grupo** acima do calendário para associar um grupo ao seu calendário.
2. Selecione o grupo na lista suspensa. A lista inclui todos os grupos da sua igreja, e não apenas os grupos aos quais você pertence.
3. Escolha se deseja incluir **todos os eventos** desse grupo ou apenas **eventos específicos**.
4. Clique em **Salvar**.

Cada evento aparece no calendário apenas uma vez. Se você adicionar um grupo inteiro, quaisquer eventos dele que você tenha adicionado antes, um a um, serão incorporados à entrada do grupo. Além disso, escolher eventos específicos de um grupo que já está no calendário não acrescenta nada novo. Somente os grupos adicionados por inteiro aparecem na lista **Grupos no calendário**.

### Importando um arquivo .ics

Clique em **Importar .ics** para trazer eventos de outro calendário. Escolha o **Grupo** ao qual os eventos devem pertencer e, em seguida, clique em **Escolher arquivo .ics** ou cole o conteúdo do arquivo, e clique em **Importar**. Os eventos serão criados nesse grupo, e o grupo será adicionado ao calendário de onde você importou, para que os eventos apareçam ali imediatamente.

### Removendo um evento do calendário

Clique em um evento no calendário e, depois, em **Remover do calendário**. Isso apenas retira o evento deste calendário -- o evento em si permanece no seu grupo. Se o evento está no calendário porque o grupo inteiro foi adicionado, remover esse evento tira do calendário todos os eventos desse grupo (os eventos continuam existindo no grupo). Para excluir um evento definitivamente, exclua-o pelo [calendário do grupo](../groups/group-calendar.md).

:::tip
Conectar grupos ao seu calendário é uma forma poderosa de reunir eventos automaticamente. Quando um líder de grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode aparecer no calendário de toda a igreja sem nenhum trabalho extra da sua parte.
:::

:::info
Se você quiser criar um único calendário que reúna eventos de muitos grupos da igreja, veja [Calendário personalizado](./curated-calendar.md) para uma abordagem mais simples.
:::

## Adicionando e editando eventos {#adding-and-editing-events}

Clique em **Novo evento** na página de detalhes do calendário para adicionar um evento, ou clique em um evento no calendário e depois em **Editar** para alterá-lo. O formulário **Novo evento** / **Editar evento** tem estes campos:

- **Grupo** -- O grupo ao qual o evento pertence. Se a sua igreja tiver modelos de evento, você também pode escolher um **Modelo** para preencher o formulário.
- **Título**
- **Foto do evento** -- Clique em **Adicionar foto** (ou na caixa de foto vazia) para escolher ou enviar uma imagem, recortada no formato panorâmico 16:9. Clique em **Trocar foto** para substituí-la. A foto aparece no topo da página do evento no seu site e como seu bloco quando um elemento Calendário mostra **Próximos eventos** (veja [Mostrando eventos no seu site](#showing-events-on-your-website)).
- **Descrição** -- Exibida na página do evento no seu site. Texto em negrito, listas e links são compatíveis.
- **Início** e **Término**, **Repetição** e **Visibilidade** (**Público** ou **Privado**).
- **Tags** -- Rótulos separados por vírgula, como `youth, students`. Um elemento Calendário no seu site pode ser configurado para mostrar apenas eventos com determinada tag. Este é o mesmo campo **Tags** exibido nas configurações de inscrição do evento.
- **Quem pode ver as anotações** e **Quem pode publicar anotações** -- Quem pode ler e adicionar anotações ao evento (veja [Anotações do evento](#event-notes)). Escolha **Somente equipe** (o padrão), **Líderes de grupo** (líderes do grupo do evento) ou **Membros do grupo** (todos no grupo do evento, incluindo os líderes).
- **Salas** e **Recursos** -- Reserve espaço e equipamentos para o evento. Veja [Salas, recursos e agendamento](./rooms-resources.md).

Clique em **Salvar**. Se o evento se repetir, o B1 pede confirmação, porque salvar atualiza todas as ocorrências da série.

### Anotações do evento {#event-notes}

Cada evento tem sua própria thread de anotações para planejamento e acompanhamento. Clique em um evento na página de detalhes do calendário; a caixa de diálogo mostra os detalhes do evento, seus lembretes e suas **Anotações** logo abaixo. Digite uma anotação e publique-a para adicioná-la à thread.

A equipe com permissão para editar conteúdo ou administrar calendários sempre pode ler e publicar anotações de eventos. As configurações **Quem pode ver as anotações** e **Quem pode publicar anotações** do evento definem se os líderes ou os membros do grupo do evento também podem fazê-lo.

### Mostrando eventos no seu site {#showing-events-on-your-website}

Para colocar um calendário no seu site, adicione um elemento **Calendário** a uma página e escolha este calendário. O elemento pode mostrar um calendário mensal ou uma grade de blocos de próximos eventos, e pode ser limitado a eventos com uma tag específica. Os visitantes que clicarem em um evento abrem a página própria dele. Veja [Usando o elemento Calendário](../website/page-editor.md#using-the-calendar-element).

## Ativando a inscrição em eventos {#enabling-event-registration}

Você pode ativar inscrições em qualquer evento do calendário, para que os membros se inscrevam pelo site do B1 ou pelo aplicativo móvel.

1. Clique em um evento existente ou crie um novo.
2. No editor de eventos, ative a opção **Inscrição**.
3. Configure as opções de inscrição:
   - **Capacidade** (opcional) -- Defina um número máximo de inscrições. Deixe em branco para ilimitado.
   - **Inscrições abrem em** -- A data e a hora em que as inscrições ficam disponíveis.
   - **Inscrições fecham em** -- A data e a hora em que as inscrições são encerradas.
   - **Tags** -- Rótulos separados por vírgula (por exemplo, "jovens, retiro, VBS") para ajudar a categorizar os eventos com inscrição.
   - **Perguntas da inscrição** -- Opcionalmente, anexe um [formulário](../forms/creating-forms.md) para que os inscritos respondam perguntas adicionais (restrições alimentares, tamanho da camiseta, contato de emergência etc.) como parte da inscrição. Escolha **Nenhum** para não fazer perguntas.
   - **Ativar lista de espera** -- Quando o evento lotar, permita que inscritos adicionais entrem em uma lista de espera em vez de serem recusados. Veja [Inscrições pagas](./paid-registrations.md#waitlist).
4. Salve o evento.

Para eventos pagos, a mesma página de configurações permite definir **Tipos de participante** com preço, **Opções** adicionais (complementos) e **Códigos de desconto**, com o pagamento recebido pelo provedor de doações da sua igreja. Veja [Inscrições pagas](./paid-registrations.md) para o passo a passo completo.

Depois que a inscrição estiver ativada, os membros verão um botão **Inscreva-se neste evento** ao visualizar o evento em [B1.church ou no aplicativo B1](../../b1-church/events/registering.md). Se você anexou um formulário, os inscritos verão uma etapa **Perguntas** durante a inscrição, e suas respostas são salvas junto com a inscrição.

:::info
As perguntas da inscrição só funcionam com formulários que **não** estejam marcados como Restritos. Um formulário restrito é ignorado automaticamente durante a inscrição, em vez de ser exibido; por isso, use um formulário sem restrição ao anexar perguntas a um evento.
:::

### Gerenciando inscrições

Para ver e gerenciar as inscrições dos seus eventos:

1. No menu de atalhos, escolha **Calendários > Inscrições**.
2. Você verá uma tabela com todos os eventos com inscrição ativada, mostrando o título do evento, a data, a quantidade atual de inscritos em relação à capacidade e as tags.
3. Clique em um evento para ver a lista completa de inscrições, incluindo nomes, número de membros, tipos de participante, situação do pagamento e data da inscrição.
4. Na página de detalhes, você pode:
   - **Adicionar participante** -- Inscrever manualmente alguém que se inscreveu presencialmente ou por telefone.
   - **Cancelar** inscrições individuais
   - **Excluir** inscrições permanentemente
   - **Promover** inscritos da lista de espera quando surgir uma vaga
   - **Exportar CSV** -- Baixar todas as inscrições, incluindo tipos de participante, opções, valores pagos e respostas às perguntas

Se o evento tiver perguntas de inscrição anexadas, a página de detalhes também mostra um filtro **Somente perguntas sem resposta**, para encontrar rapidamente os inscritos que ainda não enviaram respostas, e um botão **Ver respostas** em cada inscrição respondida. Eventos pagos acrescentam uma coluna **Tipo**, uma coluna **Pago / Total**, contagens por tipo e uma caixa de diálogo com os detalhes de pagamentos -- veja [Inscrições pagas](./paid-registrations.md#the-registration-roster).

:::tip
Use a barra de progresso da capacidade para acompanhar a rapidez com que os eventos estão lotando. A barra fica vermelha quando um evento atinge ou ultrapassa a capacidade.
:::

## Próximos passos

- [Calendário personalizado](./curated-calendar.md) -- Crie um calendário que reúne eventos de vários grupos
- [Inscrições pagas](./paid-registrations.md) -- Tipos de participante, opções de complemento, códigos de desconto, pagamentos e listas de espera
- [Guia de inscrição em eventos](../guides/event-registration.md) -- Passo a passo para configurar a inscrição em eventos
- [Visão geral dos calendários](./index.md) -- Volte à visão geral dos calendários
