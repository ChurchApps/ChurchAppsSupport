---
title: "Criando Grupos"
description: "Configure um novo grupo no B1 Admin, desde a escolha de uma categoria e o nome até a definição da política de entrada, dos rótulos, das mensagens e das configurações de presença."
---

# Criando Grupos

<div class="article-intro">

Criar um grupo no B1 Admin é simples. Você define uma categoria, dá um nome ao grupo e, em seguida, configura as suas opções. Os grupos ajudam a organizar a sua igreja em unidades com propósito, como pequenos grupos, comitês e turmas.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="uG93pXVreNo" title="Criando Grupos e Adicionando Membros no B1" next="Solicitações de Entrada em Grupos e Calendários de Grupos no B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar grupos. Veja [Funções e Permissões](../people/roles-permissions.md) se tiver dúvidas sobre o seu nível de acesso.
- Defina uma estrutura de categorias para os seus grupos (por exemplo, "Pequenos Grupos", "Ministérios", "Comitês"). As categorias ajudam a manter os grupos relacionados organizados.

</div>

## Adicionando um Novo Grupo {#adding-a-new-group}

1. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo do B1 Admin), expanda **Pessoas** e clique em **Grupos**.
2. Clique em **Adicionar Grupo** no cabeçalho da página. Abre-se um formulário **Novo Grupo** abaixo da lista. Informe um **Nome da Categoria**. As categorias ajudam a organizar grupos relacionados (por exemplo, "Pequenos Grupos", "Ministérios" ou "Comitês"). Se a categoria já existir, você pode selecioná-la na lista.
3. Informe o **Nome** do grupo.
4. Clique em **Adicionar** (ou em **Cancelar** para fechar o formulário). O seu novo grupo aparecerá na lista, com a categoria exibida abaixo do nome.

## Configurando as Opções do Grupo {#configuring-group-settings}

Depois que o grupo for criado, você pode preencher mais detalhes:

1. Clique no **nome do grupo** na lista para abri-lo.
2. Clique no botão **Editar**, no lado esquerdo da página do grupo, abaixo dos detalhes do grupo. Abre-se o formulário **Detalhes do Grupo**.
3. Configure as opções a seguir:
   - **Nome da Categoria** e **Nome do Grupo** -- Altere a categoria do grupo ou renomeie-o.
   - **Horário de encontro** e **Local de encontro** -- Quando e onde o grupo normalmente se reúne (por exemplo, "Quartas às 19h" na "Sala 204").
   - **Descrição** -- Um breve resumo sobre o que é o grupo, escrito no editor de formatação. Fica visível para os membros.
   - **Foto** -- Clique na caixa de foto ou em **Adicionar Foto** para escolher ou enviar uma imagem para o grupo.
   - **Slug** -- O nome curto usado no endereço do grupo no site da sua igreja.
   - **Rótulos** -- Atribua um ou mais rótulos descritivos ao grupo (por exemplo, "Presencial", "Online", "Novos Membros Bem-vindos"). Os rótulos são etiquetas livres que você define; marque todos os que se aplicam ou clique em **Adicionar Novo Rótulo** para criar um. Os rótulos podem ser usados para filtrar grupos no elemento de site Localizador de Grupos, e um elemento de site Lista de Grupos pode mostrar apenas os grupos que têm um determinado rótulo.
   - **Unidade** -- A unidade à qual o grupo pertence, se a sua igreja tiver mais de uma.
   - **Inscrição** -- Escolha quem pode entrar neste grupo:
     - **Aberto (membros podem entrar imediatamente)** -- Qualquer pessoa pode entrar sem aprovação
     - **Solicitar entrada (requer aprovação do líder)** -- As pessoas precisam enviar uma solicitação de entrada que exige aprovação (veja [Solicitações de Entrada em Grupos](./group-join-requests.md))
     - **Fechado (somente adição pelo admin)** -- Os membros precisam ser adicionados manualmente pelos líderes ou administradores
   - **Discussões** -- Ativa ou desativa o feed de conversas do grupo, em que qualquer membro pode publicar. Ativado (**Sim**) por padrão.
   - **Avisos** -- Ativa um segundo feed de conversas, somente para líderes -- os membros podem ler e reagir, mas somente os líderes podem publicar. Ativado (**Sim**) por padrão.
   - **Mostrar lista de membros no site** -- Defina como **Sim** para listar os membros do grupo na página dele no site da sua igreja.
   - **Grupo confidencial** -- Oculta este grupo e a sua lista de membros das páginas públicas, do localizador de grupos e das pessoas que não são membros. Use para grupos sensíveis, como ministérios de recuperação ou aconselhamento; somente os membros do grupo e a equipe da igreja podem vê-lo.
4. Para turmas e salas infantis, o formulário também tem estas seções:
   - **Idade e série** -- **Idade mínima** e **Idade máxima** (em anos e meses) e **Série mínima** e **Série máxima**, usadas para sugerir a sala certa no check-in. Deixe-as em branco (ou em **Sem limite**) para não ter limite. Veja [Segurança no Check-In](../attendance/checkin-safety.md#age-and-grade-room-guidance).
   - **Capacidade de check-in** -- **Capacidade**, **Capacidade de convidados**, **Crianças por voluntário**, **Mínimo de voluntários** e **Fechado para check-in**. Veja [Segurança no Check-In](../attendance/checkin-safety.md#room-capacity-and-closing-a-room).
   - **Presença** -- **Controlar presença** (defina como **Sim** para registrar a [presença](../attendance/tracking-attendance.md) deste grupo), **E-mails de lembrete de presença** (lembra os líderes do grupo quando um dos eventos do calendário do grupo aconteceu ontem, mas nenhuma presença foi registrada), **Retirada pelos pais** e **Imprimir crachá** (opções de check-in para grupos infantis).
   - **Horários de culto (opcional)** -- Escolha um horário de culto em **Adicionar horário de culto** e clique no botão de mais para associar o grupo a ele; clique no ícone de remover ao lado de um horário de culto para retirá-lo. Veja [Configuração de Presença](../attendance/setup.md) para detalhes sobre os horários de culto.
5. Clique em **Salvar** para aplicar as alterações, ou em **Cancelar** para fechar o formulário sem salvar.

O lado esquerdo da página do grupo mostra a categoria, o horário e o local de encontro, a descrição, os rótulos e os horários de culto do grupo, além de marcas de verificação para **Controlar presença**, **Imprimir crachá**, **Retirada pelos pais**, **Discussões** e **Avisos**, para que você veja de relance quais estão ativados.

:::tip
Incluir uma descrição clara e o horário de encontro ajuda os membros a saber o que esperar ao entrar em um grupo.
:::

:::info
Desativar ao mesmo tempo as Discussões e os Avisos remove por completo a aba Mensagens do grupo no portal do membro. Desativar apenas um deles oculta a respectiva aba, e os membros passam para o feed que continua ativo. As mensagens existentes são mantidas em qualquer caso -- as opções controlam apenas as novas publicações.
:::

## Duplicando um Grupo {#duplicating-a-group}

Vai iniciar uma nova edição de uma turma ou ministério recorrente? Em vez de digitar novamente todas as configurações, duplique um grupo existente:

1. Abra o grupo e clique em **Duplicar** (abaixo do botão **Editar**, no lado esquerdo da página do grupo).
2. Confirme a duplicação.

A cópia herda as configurações do original -- categoria, descrição, foto, horário e local de encontro, inscrição, rótulos, unidade, feeds de conversa, confidencialidade, limites de idade e série, capacidade de check-in e opções de presença -- mas **não** os seus membros nem os horários de culto. O novo grupo abre imediatamente; ele recebe o nome do original com " (Cópia)" acrescentado, então renomeie-o nas configurações do grupo.

## Arquivando um Grupo {#archiving-a-group}

Quando um grupo não está mais ativo, mas você quer manter o seu histórico em vez de excluí-lo:

1. Abra o grupo e clique em **Editar** para editar as suas configurações.
2. Clique em **Arquivar** e confirme.

Os grupos arquivados saem da lista principal de Grupos. Para encontrá-los novamente, clique no botão **Mostrar arquivados** ao lado dos botões de categoria no topo da página de Grupos e, depois, clique em **Restaurar** ao lado do grupo e confirme para trazê-lo de volta.

:::info
Arquivar um grupo não exclui os seus membros, o histórico de presença nem os eventos do calendário -- apenas oculta o grupo da lista padrão até que você o restaure.
:::

## Excluindo um Grupo {#deleting-a-group}

Para remover um grupo permanentemente, abra-o, clique em **Editar**, clique em **Excluir** na parte inferior do formulário **Detalhes do Grupo** e confirme. A exclusão não pode ser desfeita -- se você puder precisar do histórico do grupo no futuro, [arquive-o](#archiving-a-group) em vez disso.

## Próximos Passos {#next-steps}

Depois de criar e configurar o seu grupo, você está pronto para:

- **Adicionar membros** -- Pesquise pessoas e adicione-as ao grupo. Use o ícone de estrela (**Tornar líder**) para designar os líderes do grupo. Veja [Membros do Grupo](./group-members.md).
- **Configurar um calendário** -- Crie eventos e reuniões recorrentes para o grupo. Veja [Calendário do Grupo](./group-calendar.md).
- **Comunicar-se** -- Envie um e-mail, um texto ou uma notificação push para os membros do grupo a partir da página do grupo. Veja [Membros do Grupo](./group-members.md#emailing-group-members).
- **Exportar dados** -- Clique em **Exportar** acima da lista de membros do grupo para baixá-la. Para baixar a lista completa de grupos, clique em **Exportar** no cabeçalho da página de Grupos.

:::info
Todo grupo pertence a uma categoria, e a página principal de Grupos permite filtrar a lista por categoria. Você pode reorganizar ou renomear as categorias sempre que a sua igreja crescer.
:::
