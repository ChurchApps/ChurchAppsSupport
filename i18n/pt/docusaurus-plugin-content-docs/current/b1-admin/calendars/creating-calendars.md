---
title: "Criando Calendários"
description: "Crie um calendário no B1 Admin, conecte grupos ou importe arquivos .ics e gerencie os eventos, as inscrições e as anotações em um só lugar."
---

# Criando Calendários

<div class="article-intro">

Criar um calendário no B1 Admin permite montar uma visão curada de eventos, conectando um ou mais grupos. Os eventos são gerenciados pelos líderes de cada grupo, e o seu calendário exibe esses eventos em um só lugar. Administradores com acesso de edição podem adicionar ou editar eventos de qualquer grupo. Líderes de grupo que não são administradores só podem gerenciar eventos dos grupos que lideram.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="Ko3kgsCSLFs" title="Criando Calendários, Eventos e Reservas de Salas no B1" next="Inscrições e Eventos Pagos no B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure os [grupos](../groups/creating-groups.md) cujos eventos você quer incluir no seu calendário
- Você precisa da permissão **Editar Conteúdo**

</div>

## Criando um Novo Calendário {#creating-a-new-calendar}

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Calendários** e clique em **Calendários**.
2. Clique em **Adicionar Calendário** no topo da página. O formulário de novo calendário abre abaixo da lista de calendários.
3. Informe o **Nome do Calendário** (por exemplo, "Eventos do Ministério de Jovens" ou "Calendário Principal da Igreja").
4. Clique em **Criar** para salvar o novo calendário.

Para renomear ou excluir um calendário depois, passe o cursor sobre a linha dele na página Calendários e clique em **Editar** (ou clique em **Editar** na página de detalhes do calendário).

## A Página de Detalhes do Calendário {#the-calendar-detail-page}

Depois de criar um calendário, clique no nome dele (ou passe o cursor sobre a linha e clique em **Gerenciar Eventos**) para abrir a página de detalhes. Essa página tem duas áreas principais:

- **Coluna da esquerda** -- O nome do calendário com as suas ações (**Novo Evento**, **Editar**, **Importar .ics** e **Imprimir**), um link para quaisquer aprovações pendentes e a lista **Grupos no Calendário**, que mostra quais grupos estão incluídos neste calendário. Clique em **Remover** ao lado de um grupo para tirá-lo do calendário.
- **Área principal** -- A visão **Eventos do Calendário**, com os eventos trazidos dos grupos conectados, e os botões **Assinar** e **Adicionar Grupo** acima dela. Use **Hoje**, **Voltar**, **Avançar** e as visões **Mês**, **Semana**, **Dia** e **Agenda** para navegar. Cada evento é desenhado na cor do seu grupo. As cores são escolhidas automaticamente, e um grupo mantém a mesma cor em todos os calendários.

Clique em **Imprimir** para obter um mês em formato imprimível. A impressão começa com o logotipo da sua igreja em fundo claro (da página [Aparência](../website/appearance.md), se você tiver definido um), o nome da igreja e o nome do calendário. Os nomes dos eventos quebram em mais linhas em vez de serem cortados, e as cores dos grupos são mantidas.

## Conectando Grupos {#connecting-groups}

Os grupos que têm eventos no calendário aparecem automaticamente na lista **Grupos no Calendário**, do lado esquerdo da página de detalhes.

1. Clique em **Adicionar Grupo** acima do calendário para associar um grupo ao seu calendário.
2. Escolha o grupo em **Selecione um Grupo**. A lista inclui todos os grupos da sua igreja, não apenas os grupos de que você participa.
3. Escolha **Adicionar todos os eventos do grupo** ou **Adicionar eventos específicos** e clique em cada evento desejado no pequeno calendário que aparece.
4. Clique em **Salvar**.

Cada evento aparece no calendário apenas uma vez. Se você adicionar um grupo inteiro, quaisquer eventos dele que você já tivesse adicionado um a um serão incorporados à entrada do grupo, e escolher eventos específicos de um grupo que já está no calendário não acrescenta nada. Somente os grupos adicionados por inteiro aparecem em **Grupos no Calendário**.

### Importando um Arquivo .ics {#importing-an-ics-file}

Clique em **Importar .ics** para trazer eventos de outro calendário. Escolha o **Grupo** ao qual os eventos devem pertencer, depois clique em **Escolher arquivo .ics** ou cole o conteúdo do arquivo, e clique em **Importar**. Os eventos são criados nesse grupo, e o grupo é adicionado ao calendário do qual você importou, de modo que os eventos apareçam ali imediatamente.

### Removendo um Evento do Calendário {#removing-an-event-from-the-calendar}

Clique em um evento no calendário e, em seguida, clique em **Remover do Calendário**. Isso apenas tira o evento deste calendário -- o evento em si continua no seu grupo. Se o evento está no calendário porque o grupo inteiro foi adicionado, remover esse evento tira todos os eventos daquele grupo deste calendário (os eventos continuam no grupo). Para excluir um evento de vez, exclua-o pelo [calendário do grupo](../groups/group-calendar.md).

:::tip
Conectar grupos ao seu calendário é uma forma poderosa de agregar eventos automaticamente. Quando um líder de grupo adiciona um evento ao seu [grupo](../groups/creating-groups.md), ele pode aparecer no calendário de toda a igreja sem nenhum trabalho extra da sua parte.
:::

:::info
Se você quer criar um único calendário que reúna eventos de muitos grupos da sua igreja, veja [Calendário Curado](./curated-calendar.md) para uma abordagem mais simples.
:::

## Adicionando e Editando Eventos {#adding-and-editing-events}

Clique em **Novo Evento** na página de detalhes do calendário para adicionar um evento, ou clique em um evento no calendário e depois em **Editar** para alterá-lo. O formulário **Novo Evento** / **Editar Evento** tem estes campos:

- **Grupo** -- O grupo ao qual o evento pertence. Se a sua igreja tiver modelos de evento, você também pode escolher um **Modelo** para preencher o formulário.
- **Título**
- **Foto do evento** -- Clique em **Adicionar Foto** (ou na caixa de foto vazia) para escolher ou enviar uma imagem, recortada em um formato largo de 16:9. Clique em **Trocar Foto** para substituí-la. A foto é exibida no topo da página do evento no seu site e como o seu bloco quando um elemento de Calendário mostra **Próximos eventos** (veja [Exibindo Eventos no Seu Site](#showing-events-on-your-website)).
- **Descrição** -- Exibida na página do evento no seu site. Texto em negrito, listas e links são suportados.
- **Início** e **Término**, **Repete** e **Visibilidade** (**Pública** ou **Privada**).
- **Tags** -- Rótulos separados por vírgula, como `youth, students`. Um elemento de Calendário no seu site pode ser configurado para mostrar apenas eventos com determinada tag. Este é o mesmo campo **Tags** exibido nas configurações de inscrição do evento.
- **Quem pode ver as anotações** e **Quem pode publicar anotações** -- Quem pode ler e adicionar anotações ao evento (veja [Anotações do Evento](#event-notes)). Escolha **Somente equipe** (o padrão), **Líderes de grupo** (líderes do grupo do evento) ou **Membros do grupo** (todas as pessoas do grupo do evento, incluindo os líderes).
- **Salas** e **Recursos** -- Reserve espaço e equipamentos para o evento. Veja [Salas, Recursos e Agendamento](./rooms-resources.md). Depois de escolher um deles, você também pode adicionar tempo de preparação e desmontagem ou uma janela de reserva personalizada -- veja [Reservando uma Sala ou Recurso](./availability.md#booking-a-room-or-resource).
- **Lembretes** -- Expanda esta seção para enviar lembretes antes do evento. Veja [Lembretes de Eventos](./event-reminders.md).

**Grupo**, **Título**, **Início** e **Término** são obrigatórios, e o término deve ser posterior ao início. Clique em **Salvar**. Se o evento se repetir, o B1 pedirá sua confirmação, pois salvar atualiza todas as ocorrências da série. Para excluir um evento, abra-o no editor e clique em **Excluir**.

### Anotações do Evento {#event-notes}

Cada evento tem sua própria linha de anotações para planejamento e acompanhamento. Clique em um evento na página de detalhes do calendário; a caixa mostra os detalhes do evento, os lembretes e as **Anotações** abaixo, com os botões **Editar**, **Gerenciar Inscrições** e **Remover do Calendário**. Digite uma anotação e publique-a para adicioná-la à linha.

A equipe com permissão para editar conteúdo ou administrar calendários sempre pode ler e publicar anotações de eventos. As configurações **Quem pode ver as anotações** e **Quem pode publicar anotações** do evento definem se os líderes ou os membros do grupo do evento também podem.

### Exibindo Eventos no Seu Site {#showing-events-on-your-website}

Para colocar um calendário no seu site, adicione um elemento **Calendário** a uma página e escolha este calendário. O elemento pode mostrar um calendário mensal ou uma grade de blocos de próximos eventos, e pode ser limitado a eventos com uma tag. Os visitantes que clicam em um evento abrem a página própria dele. Veja [Usando o elemento Calendário](../website/page-editor.md#using-the-calendar-element).

## Habilitando a Inscrição em Eventos {#enabling-event-registration}

Você pode habilitar inscrições para qualquer evento do calendário, para que os membros se inscrevam pelo site ou pelo aplicativo B1.

1. Clique em um evento existente no calendário (crie-o primeiro, se necessário) e clique em **Gerenciar Inscrições**. A página de inscrições do evento se abre. (O botão **Ativar inscrições** na página **Inscrições** leva você aos seus calendários para escolher um evento.)
2. Clique em **Editar configurações** e, em seguida, ative **Habilitar Inscrições** no cartão **Configurações de Inscrição**.
3. Configure as opções de inscrição:
   - **Capacidade** (opcional) -- Defina um número máximo de inscrições. Deixe em branco para ilimitado.
   - **Inscrições Abrem** -- A data e a hora em que as inscrições ficam disponíveis.
   - **Inscrições Encerram** -- A data e a hora em que as inscrições são encerradas.
   - **Tags** -- Rótulos separados por vírgula (por exemplo, "jovens, retiro, VBS") para ajudar a categorizar os eventos com inscrição.
   - **Perguntas da Inscrição** -- Opcionalmente, anexe um [formulário](../forms/creating-forms.md) para que os inscritos respondam perguntas adicionais (restrições alimentares, tamanho de camiseta, contato de emergência etc.) como parte da inscrição. Escolha **Nenhum** para não fazer perguntas.
   - **Habilitar Lista de Espera** -- Quando o evento lotar, permita que inscritos adicionais entrem em uma lista de espera em vez de serem recusados. Veja [Inscrições Pagas](./paid-registrations.md#waitlist).
4. Clique em **Salvar Configurações**.

Para eventos pagos, a mesma página de configurações permite definir **Tipos de Participante** com preço, **Seleções** opcionais (complementos) e **Códigos de Desconto**, com o pagamento recebido pelo provedor de doações da sua igreja. Veja [Inscrições Pagas](./paid-registrations.md) para o passo a passo completo.

Depois que a inscrição estiver habilitada, os membros verão um botão **Inscrever-se neste Evento** ao visualizar o evento no [B1.church ou no aplicativo B1](../../b1-church/events/registering.md). Se você anexou um formulário, os inscritos verão uma etapa de **Perguntas** durante a inscrição, e as respostas ficam salvas junto com a inscrição.

:::info
As Perguntas da Inscrição só funcionam com formulários que **não** estão marcados como Restritos. Um formulário restrito é ignorado automaticamente durante a inscrição, em vez de ser exibido; por isso, use um formulário não restrito ao anexar perguntas a um evento.
:::

### Gerenciando Inscrições {#managing-registrations}

Para ver e gerenciar as inscrições dos seus eventos:

1. No menu Jump, escolha **Calendários > Inscrições**.
2. Você verá uma tabela com todos os eventos que têm inscrição habilitada, mostrando o título do evento, a data, a quantidade atual de inscrições em relação à capacidade e as tags. Digite em **Pesquisar eventos** para filtrá-la.
3. Clique no nome de um evento para ver a lista completa de inscrições, com as colunas **Nome**, **Membros**, **Tipo**, **Pago / Total**, **Situação** e **Data**.
4. Na página de detalhes, você pode:
   - **Adicionar Participante** -- Inscrever manualmente alguém que se inscreveu presencialmente ou por telefone.
   - **Cancelar Inscrição** em inscrições individuais (pede confirmação)
   - **Excluir** inscrições permanentemente (pede confirmação)
   - **Promover** inscrições da lista de espera quando surgir uma vaga
   - **Exportar CSV** -- Baixe todas as inscrições, incluindo tipos de participante, seleções, valores pagos e respostas das perguntas

   Essas ações de linha são ícones no fim de cada linha; passe o cursor sobre um ícone para ver o nome dele.

Se o evento tiver Perguntas da Inscrição anexadas, a página de detalhes também mostra um filtro **Somente perguntas não respondidas** para encontrar rapidamente os inscritos que ainda não enviaram respostas, e um botão **Ver Respostas** em cada inscrição respondida para ver as respostas. Eventos com tipos de participante também mostram contagens por tipo acima da tabela, e cada linha tem uma caixa **Detalhes da Inscrição** com os pagamentos -- veja [Inscrições Pagas](./paid-registrations.md#the-registration-roster).

O lado esquerdo da página de detalhes mostra quantas pessoas estão inscritas (o inscrito principal mais todos os de sua inscrição), com uma barra de capacidade, a quantidade na lista de espera, as tags do evento e os seus **Lembretes**. O título do cartão **Inscrições** conta as inscrições, que é o que os limites de capacidade consideram -- assim, uma família de quatro pessoas é uma inscrição, mas quatro pessoas.

:::tip
Use a barra de progresso de capacidade na página de Inscrições para acompanhar a rapidez com que os eventos estão lotando. A barra fica vermelha quando um evento atinge ou ultrapassa a capacidade.
:::

## Próximos Passos {#next-steps}

- [Calendário Curado](./curated-calendar.md) -- Crie um calendário que reúna vários grupos
- [Inscrições Pagas](./paid-registrations.md) -- Tipos de participante, seleções complementares, códigos de desconto, pagamentos e listas de espera
- [Guia de Inscrição em Eventos](../guides/event-registration.md) -- Passo a passo para configurar a inscrição em eventos
- [Visão Geral dos Calendários](./index.md) -- Volte para a visão geral dos calendários
