---
title: "Criando grupos"
---

# Criando grupos

<div class="article-intro">

Criar um grupo no B1 Admin é simples. Você vai configurar uma categoria, dar um nome ao grupo e depois definir as suas configurações. Os grupos ajudam a organizar sua igreja em unidades significativas, como pequenos grupos, comitês e classes.

</div>

## Vídeo de treinamento

<YouTube id="uG93pXVreNo" title="Criando grupos e adicionando membros no B1" next="Solicitações de entrada em grupos e calendários de grupo no B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar grupos. Veja [Funções e permissões](../people/roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Defina uma estrutura de categorias para seus grupos (por exemplo, "Pequenos Grupos", "Ministérios", "Comitês"). As categorias ajudam a manter os grupos relacionados organizados.

</div>

## Adicionando um novo grupo

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Grupos**.
2. Clique em **Adicionar grupo** no cabeçalho da página. Um formulário **Novo grupo** é aberto abaixo da lista. Digite um **Nome da categoria**. As categorias ajudam a organizar grupos relacionados (por exemplo, "Pequenos Grupos", "Ministérios" ou "Comitês"). Se a categoria já existir, você pode selecioná-la na lista.
3. Digite o **Nome** do grupo.
4. Clique em **Adicionar**. Seu novo grupo aparecerá na lista, com a categoria exibida abaixo do nome.

## Configurando as opções do grupo

Depois que o grupo for criado, você pode preencher detalhes adicionais:

1. Clique no **nome do grupo** na lista para abri-lo.
2. Clique no botão **Editar** no lado esquerdo da página do grupo, abaixo dos detalhes do grupo.
3. Configure as seguintes opções:
   - **Descrição** -- Um breve resumo do que é o grupo. Fica visível para os membros.
   - **Horários de encontro** -- Quando o grupo normalmente se reúne (por exemplo, "Quartas-feiras às 19h").
   - **Política de entrada** -- Escolha quem pode entrar neste grupo:
     - **Aberto** -- Qualquer pessoa pode entrar imediatamente, sem aprovação
     - **Solicitação** -- As pessoas precisam enviar uma solicitação de entrada que exige aprovação (veja [Solicitações de entrada em grupos](./group-join-requests.md))
     - **Fechado** -- Os membros precisam ser adicionados manualmente por líderes ou administradores
   - **Etiquetas** -- Atribua uma ou mais etiquetas descritivas ao grupo (por exemplo, "Presencial", "Online", "Novos membros são bem-vindos"). As etiquetas são marcadores livres que você define; marque todas as que se aplicarem. As etiquetas podem ser usadas para filtrar grupos no elemento Navegador de grupos do site.
   - **Grupo confidencial** -- Oculta este grupo e sua lista de membros das páginas públicas, do localizador de grupos e de pessoas que não são membros. Use para grupos sensíveis, como ministérios de recuperação ou aconselhamento; somente os membros do grupo e a equipe da igreja podem vê-lo.
   - **Discussões** -- Ativa ou desativa o feed de chat do grupo, onde qualquer membro pode publicar. Ativado por padrão.
   - **Avisos** -- Ativa um segundo feed de chat, somente para líderes -- os membros podem ler e reagir, mas somente os líderes podem publicar. Ativado por padrão.
   - **Acompanhamento de presença** -- Ative esta opção se quiser registrar a [presença](../attendance/tracking-attendance.md) deste grupo.
   - **Horários de culto** -- Associe o grupo a horários de culto específicos da igreja, se aplicável. Veja [Configuração de presença](../attendance/setup.md) para detalhes sobre horários de culto.
4. Clique em **Salvar** para aplicar as alterações.

:::tip
Adicionar uma descrição clara e um horário de encontro ajuda os membros a saber o que esperar ao entrar em um grupo.
:::

:::info
Desativar tanto as Discussões quanto os Avisos remove a aba Mensagens do grupo no portal do membro. Desativar apenas uma delas oculta a sua aba; os membros são direcionados para o feed que ainda estiver ativo. As mensagens existentes são mantidas em ambos os casos — as opções controlam apenas as novas publicações.
:::

## Duplicando um grupo

Começando uma nova temporada de uma turma ou ministério recorrente? Em vez de digitar todas as configurações novamente, duplique um grupo existente:

1. Abra o grupo e clique em **Duplicar** (abaixo do botão **Editar**, no lado esquerdo da página do grupo).
2. Confirme a duplicação.

A cópia herda as configurações do original — categoria, descrição, horário/local de encontro, política de entrada, etiquetas e campus — mas **não** os seus membros. O novo grupo recebe o nome do original com " (Cópia)" acrescentado; renomeie-o nas configurações do grupo.

## Arquivando um grupo

Quando um grupo não está mais ativo, mas você quer manter o seu histórico em vez de excluí-lo:

1. Abra o grupo e clique em **Editar** para editar suas configurações.
2. Clique em **Arquivar** e confirme.

Grupos arquivados saem da lista principal de Grupos. Para encontrar um deles novamente, clique no botão **Mostrar arquivados** ao lado dos botões de categoria no topo da página Grupos e, em seguida, clique em **Restaurar** ao lado do grupo para trazê-lo de volta.

:::info
Arquivar um grupo não exclui seus membros, o histórico de presença nem os eventos do calendário — apenas oculta o grupo da lista padrão até que você o restaure.
:::

## Próximos passos

Depois de criar e configurar o seu grupo, você está pronto para:

- **Adicionar membros** -- Pesquise pessoas e adicione-as ao grupo. Use o ícone de estrela (**Tornar líder**) para designar líderes de grupo. Veja [Membros do grupo](./group-members.md).
- **Configurar um calendário** -- Crie eventos e encontros recorrentes para o grupo. Veja [Calendário do grupo](./group-calendar.md).
- **Comunicar-se** -- Envie mensagens para todos os membros do grupo diretamente pela página do grupo.
- **Exportar dados** -- Clique em **Exportar** acima da lista de membros do grupo para baixá-la.

:::info
Todo grupo pertence a uma categoria, e a página principal de Grupos permite filtrar a lista por categoria. Você sempre pode reorganizar ou renomear as categorias conforme sua igreja cresce.
:::
