---
title: "Criando Grupos"
---

# Criando Grupos

<div class="article-intro">

Criar um grupo no B1 Admin é direto. Você vai configurar uma categoria, dar um nome ao seu grupo e então configurar suas definições. Grupos ajudam você a organizar sua igreja em unidades significativas como grupos pequenos, comitês e classes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa do B1 Admin com permissão para gerenciar grupos. Consulte [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Decida sobre uma estrutura de categoria para seus grupos (por exemplo, "Grupos Pequenos", "Ministérios", "Comitês"). Categorias ajudam a manter grupos relacionados organizados.

</div>

## Adicionando um Novo Grupo

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Grupos**.
2. Clique em **Adicionar Grupo** no cabeçalho da página. Um formulário **Novo Grupo** abre abaixo da lista. Digite um **Nome de Categoria**. Categorias ajudam você a organizar grupos relacionados juntos (por exemplo, "Grupos Pequenos", "Ministérios" ou "Comitês"). Se uma categoria já existe, você pode selecioná-la da lista.
3. Digite o **Nome** do grupo.
4. Clique em **Adicionar**. Seu novo grupo aparecerá na lista, com sua categoria exibida abaixo do nome.

## Configurando as Configurações do Grupo

Depois que seu grupo é criado, você pode preencher detalhes adicionais:

1. Clique no **nome do grupo** na lista para abri-lo.
2. Clique no botão **Editar** à esquerda da página do grupo, abaixo dos detalhes do grupo.
3. Configure as seguintes opções:
   - **Descrição** -- Um breve resumo do que é o grupo. Isso é visível aos membros.
   - **Horários de Reunião** -- Quando o grupo normalmente se reúne (por exemplo, "Quartas-feiras às 19h").
   - **Política de Adesão** -- Escolha quem pode ingressar neste grupo:
     - **Aberto** -- Qualquer pessoa pode ingressar imediatamente sem aprovação
     - **Solicitação** -- As pessoas devem enviar uma solicitação de adesão que requer aprovação (consulte [Solicitações de Adesão ao Grupo](./group-join-requests.md))
     - **Fechado** -- Os membros devem ser adicionados manualmente pelos líderes ou administradores
   - **Rótulos** -- Atribua um ou mais rótulos descritivos ao grupo (por exemplo, "Presencial", "Online", "Bem-vindos Novos Membros"). Rótulos são tags de forma livre que você define; marque tudo que se aplicar. Os rótulos podem ser usados para filtrar grupos no elemento do site do Navegador de Grupos.
   - **Grupo confidencial** -- Oculte este grupo e sua lista de membros de páginas públicas, localizador de grupos e não-membros. Use isso para grupos sensíveis como ministérios de recuperação ou aconselhamento; apenas os membros do grupo e funcionários da igreja podem vê-lo.
   - **Discussões** -- Ativa o feed de chat do grupo ou desativa, onde qualquer membro pode postar. Ativado por padrão.
   - **Anúncios** -- Ativa um segundo feed de chat apenas para líderes -- membros podem ler e reagir, mas apenas líderes podem postar. Ativado por padrão.
   - **Rastreamento de Presença** -- Habilite isso se você deseja registrar [presença](../attendance/tracking-attendance.md) para este grupo.
   - **Horários de Serviço** -- Associe o grupo aos horários de serviço da igreja específicos, se aplicável. Consulte [Configuração de Presença](../attendance/setup.md) para detalhes sobre horários de serviço.
4. Clique em **Salvar** para aplicar suas alterações.

:::tip
Adicionar uma descrição clara e horário de reunião ajuda os membros a saber o que esperar quando ingressarem em um grupo.
:::

:::info
Desativar tanto Discussões quanto Anúncios remove a aba Mensagens do grupo inteiro no portal de membros. Desativar apenas um oculta sua aba; membros são movidos para o feed que ainda está ativado. Mensagens existentes são mantidas de qualquer forma -- os alternadores apenas controlam novos posts.
:::

## Duplicando um Grupo

Iniciando uma nova sessão de uma classe ou ministério recorrente? Em vez de reinserir todas as configurações, duplique um grupo existente:

1. Abra o grupo e clique em **Duplicar** (abaixo do botão **Editar** à esquerda da página do grupo).
2. Confirme a duplicação.

A cópia traz as configurações do original -- categoria, descrição, horário/local de reunião, política de adesão, rótulos e campus -- mas **não** seus membros. O novo grupo é nomeado após o original com " (Cópia)" anexado; renomeie-o nas configurações do grupo.

## Arquivando um Grupo

Quando um grupo não está mais ativo, mas você quer manter seu histórico em vez de deletá-lo:

1. Abra o grupo e clique em **Editar** para editar suas configurações.
2. Clique em **Arquivar** e confirme.

Grupos arquivados saem da lista principal de Grupos. Para encontrar um novamente, clique no botão **Mostrar arquivados** ao lado dos botões de categoria no topo da página Grupos, depois clique em **Restaurar** ao lado do grupo para trazê-lo de volta.

:::info
Arquivar um grupo não deleta seus membros, histórico de presença ou eventos de calendário -- ele apenas oculta o grupo da lista padrão até que você o restaure.
:::

## Próximos Passos

Depois de criar e configurar seu grupo, você está pronto para:

- **Adicionar membros** -- Procure pessoas e adicione-as ao grupo. Use o ícone de estrela (**Tornar Líder**) para designar líderes de grupo. Consulte [Membros do Grupo](./group-members.md).
- **Configurar um calendário** -- Crie eventos e reuniões recorrentes para o grupo. Consulte [Calendário do Grupo](./group-calendar.md).
- **Comunicar** -- Envie mensagens para todos os membros do grupo diretamente da página do grupo.
- **Exportar dados** -- Clique em **Exportar** acima da lista de membros do grupo para baixá-la.

:::info
Todo grupo pertence a uma categoria, e a página principal de Grupos permite filtrar a lista por categoria. Você pode sempre reorganizar ou renomear categorias conforme sua igreja cresce.
:::
