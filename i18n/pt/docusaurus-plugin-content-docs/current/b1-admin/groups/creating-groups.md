---
title: "Criando Grupos"
---

# Criando Grupos

<div class="article-intro">

Criar um grupo no B1 Admin é simples. Você vai configurar uma categoria, dar um nome ao grupo e, em seguida, configurar as suas opções. Grupos ajudam a organizar a sua igreja em unidades significativas, como pequenos grupos, comitês e turmas.

</div>

## Vídeo de Treinamento

<YouTube id="uG93pXVreNo" title="Creating Groups and Adding Members in B1" next="Group Join Requests and Group Calendars in B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar grupos. Consulte [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Decida uma estrutura de categorias para os seus grupos (por exemplo, "Pequenos Grupos", "Ministérios", "Comitês"). As categorias ajudam a manter os grupos relacionados organizados.

</div>

## Adicionando um Novo Grupo

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Grupos**.
2. Clique em **Adicionar Grupo** no cabeçalho da página. Um formulário **Novo Grupo** é aberto abaixo da lista. Digite um **Nome da Categoria**. As categorias ajudam a organizar grupos relacionados (por exemplo, "Pequenos Grupos", "Ministérios" ou "Comitês"). Se uma categoria já existir, você pode selecioná-la na lista.
3. Digite o **Nome** do grupo.
4. Clique em **Adicionar**. Seu novo grupo aparecerá na lista, com a categoria exibida abaixo do nome.

## Configurando as Opções do Grupo

Depois que o grupo for criado, você pode preencher detalhes adicionais:

1. Clique no **nome do grupo** na lista para abri-lo.
2. Clique no botão **Editar** no lado esquerdo da página do grupo, abaixo dos detalhes do grupo.
3. Configure as seguintes opções:
   - **Descrição** -- um breve resumo do que o grupo faz. Fica visível para os membros.
   - **Horários de Reunião** -- quando o grupo normalmente se reúne (por exemplo, "Quartas-feiras às 19h").
   - **Política de Entrada** -- escolha quem pode entrar neste grupo:
     - **Aberta** -- qualquer pessoa pode entrar imediatamente, sem aprovação
     - **Solicitação** -- as pessoas precisam enviar uma solicitação de entrada que requer aprovação (consulte [Solicitações de Entrada em Grupos](./group-join-requests.md))
     - **Fechada** -- os membros precisam ser adicionados manualmente por líderes ou administradores
   - **Rótulos** -- atribua um ou mais rótulos descritivos ao grupo (por exemplo, "Presencial", "Online", "Novos Membros São Bem-vindos"). Os rótulos são etiquetas livres que você define; marque todos os que se aplicam. Os rótulos podem ser usados para filtrar grupos no elemento de site Navegador de Grupos.
   - **Grupo confidencial** -- oculta este grupo e sua lista de membros de páginas públicas, do localizador de grupos e de pessoas que não são membros. Use isso para grupos sensíveis, como ministérios de recuperação ou aconselhamento; somente os membros do grupo e a equipe da igreja podem vê-lo.
   - **Discussões** -- ativa ou desativa o feed de chat do grupo, onde qualquer membro pode publicar. Ativado por padrão.
   - **Anúncios** -- ativa um segundo feed de chat, exclusivo para líderes: os membros podem ler e reagir, mas somente os líderes podem publicar. Ativado por padrão.
   - **Controle de presença** -- ative esta opção se quiser registrar a [presença](../attendance/tracking-attendance.md) deste grupo.
   - **Horários de Serviço** -- associe o grupo a horários de culto específicos da igreja, se aplicável. Consulte [Configuração de Presença](../attendance/setup.md) para detalhes sobre horários de serviço.
4. Clique em **Salvar** para aplicar as alterações.

:::tip
Adicionar uma descrição clara e um horário de reunião ajuda os membros a saberem o que esperar ao entrar em um grupo.
:::

:::info
Desativar tanto Discussões quanto Anúncios remove a aba Mensagens do grupo no portal do membro. Desativar apenas uma delas oculta a aba correspondente; os membros são direcionados para o feed que continuar ativo. As mensagens existentes são mantidas em qualquer caso -- as opções controlam apenas as novas publicações.
:::

## Duplicando um Grupo

Começando uma nova turma ou ministério recorrente? Em vez de digitar novamente todas as configurações, duplique um grupo existente:

1. Abra o grupo e clique em **Duplicar** (abaixo do botão **Editar**, no lado esquerdo da página do grupo).
2. Confirme a duplicação.

A cópia herda as configurações do original -- categoria, descrição, horário/local de reunião, política de entrada, rótulos e campus -- mas **não** os seus membros. O novo grupo recebe o nome do original com " (Cópia)" acrescentado; renomeie-o nas configurações do grupo.

## Arquivando um Grupo

Quando um grupo não estiver mais ativo, mas você quiser manter o histórico em vez de excluí-lo:

1. Abra o grupo e clique em **Editar** para editar as configurações.
2. Clique em **Arquivar** e confirme.

Grupos arquivados saem da lista principal de Grupos. Para encontrá-lo novamente, clique no botão **Mostrar arquivados** ao lado dos botões de categoria no topo da página de Grupos e, em seguida, clique em **Restaurar** ao lado do grupo para trazê-lo de volta.

:::info
Arquivar um grupo não exclui seus membros, seu histórico de presença nem os eventos da agenda -- apenas oculta o grupo da lista padrão até que você o restaure.
:::

## Próximos Passos

Depois de criar e configurar seu grupo, você está pronto para:

- **Adicionar membros** -- pesquise pessoas e adicione-as ao grupo. Use o ícone de estrela (**Tornar líder**) para designar líderes do grupo. Consulte [Membros do Grupo](./group-members.md).
- **Configurar uma agenda** -- crie eventos e reuniões recorrentes para o grupo. Consulte [Agenda do Grupo](./group-calendar.md).
- **Comunicar-se** -- envie mensagens para todos os membros do grupo diretamente da página do grupo.
- **Exportar dados** -- clique em **Exportar** acima da lista de membros do grupo para baixá-la.

:::info
Todo grupo pertence a uma categoria, e a página principal de Grupos permite filtrar a lista por categoria. Você sempre pode reorganizar ou renomear categorias conforme a sua igreja cresce.
:::
