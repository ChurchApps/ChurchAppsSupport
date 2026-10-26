---
title: "Registrando a presença"
---

# Registrando a presença

<div class="article-intro">

Depois que seus campi, horários de culto e grupos estiverem configurados, você pode registrar a presença manualmente após cada reunião. O B1 Admin organiza a presença em torno de **sessões** -- uma sessão por grupo por data de encontro. Você cria a sessão, marca quem compareceu, e os dados alimentam diretamente seus relatórios de presença.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Seus campi, horários de culto e grupos precisam estar configurados. Consulte [Configuração de Presença](setup.md) se ainda não fez isso.
- Os grupos que você quer acompanhar precisam ter **Registrar presença** ativado. Consulte [Configuração de Presença](setup.md) para mais detalhes.
- Você precisa da permissão **Editar presença** para salvar a presença. Voluntários que têm apenas **Ver somente nomes de pessoas** podem registrar a presença desta forma -- eles abrem as turmas em **Grupos** e veem os membros apenas pelo nome. Consulte [Somente nomes de pessoas](../settings/roles-permissions.md#people-names-only).

</div>

## Criando uma sessão

Uma sessão representa uma ocorrência de uma reunião de grupo -- por exemplo, sua turma do 1º ao 3º ano do Ensino Fundamental em um domingo específico.

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Pessoas** e clique em **Grupos**.
2. Selecione o grupo para o qual você quer registrar a presença.
3. Na seção **Sessões** da página do grupo, clique em **Todas as sessões**.
4. Clique em **Novo** para criar uma nova sessão.
5. Se o grupo estiver atribuído a um horário de culto, escolha o **Horário de culto**. Se for um grupo sem agenda, este campo não aparecerá.
6. Selecione a **Data da sessão** -- pode ser hoje, uma data passada ou uma data futura.
7. Clique em **Salvar**.

### Adicionando sessões para todas as turmas de um horário de culto

Se outros grupos se reúnem no mesmo horário de culto (por exemplo, todas as turmas infantis às 9h00 do domingo), você pode criar as sessões deles em uma única etapa, em vez de visitar cada grupo.

1. Siga os passos acima e escolha um **Horário de culto**.
2. Marque **Também adicionar para os outros _N_ grupos em _horário de culto_**. A caixa de seleção mostra quantos outros grupos estão atribuídos a esse horário de culto. Ela só aparece ao adicionar uma nova sessão e quando pelo menos outro grupo se reúne naquele horário.
3. Clique em **Salvar**.

Uma sessão é criada para o grupo atual e para cada um dos outros grupos na mesma data e horário de culto. Grupos que já têm uma sessão para aquela data e horário são ignorados, então você não terá duplicatas.

:::tip
Você pode criar sessões para datas passadas para regularizar a presença que ainda não foi registrada, ou criá-las com antecedência para que estejam prontas quando seu grupo se reunir.
:::

## Anotações da sessão {#session-notes}

Cada sessão pode ter anotações -- um resumo do que foi abordado, avisos ou pedidos de oração.

1. Ao adicionar uma sessão, ou após clicar no ícone **Editar** (lápis) ao lado de uma sessão na lista, digite na caixa **Anotações (o que foi abordado, avisos, pedidos de oração)** abaixo da data. A barra de ferramentas permite adicionar negrito, listas e links.
2. Clique em **Salvar**.

As anotações aparecem no topo da lista de presença da sessão. Elas também são as anotações da reunião que os membros do grupo leem na seção **Reuniões** da página do grupo no B1.church, onde os líderes do grupo podem escrevê-las e editá-las também. Consulte [Detalhes do grupo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcando a presença

Selecione uma sessão para ver sua lista de presença. Cada membro do grupo aparece com uma caixa de seleção, ordenado pelo sobrenome, e quem já estiver registrado como presente aparece marcado.

1. Marque a caixa ao lado de cada pessoa que compareceu. Use **Selecionar todos** ou **Desmarcar todos** para alterar todos de uma vez.
2. A contagem acima da lista (por exemplo, "12 de 15 presentes") é atualizada conforme você marca as caixas.
3. Clique em **Salvar presença**. Nada é registrado até que você salve, e uma mensagem confirma quando o salvamento é concluído. Se você tentar fechar ou recarregar a aba do navegador enquanto um salvamento ainda estiver em andamento, o navegador avisará antes para que as alterações não sejam perdidas.

Desmarcar alguém que já estava registrado como presente e depois salvar remove essa pessoa da sessão.

### Adicionando visitantes

Para registrar alguém que não é membro do grupo, pesquise-o na busca de pessoas ao lado da lista de presença. Se a pessoa ainda não estiver no seu banco de dados, você pode criá-la a partir da busca. Em ambos os casos, ela é adicionada à lista já marcada. Clique em **Salvar presença** para registrá-la.

Pessoas que fizeram check-in em um quiosque exibem um marcador **Voluntário** ou **Visitante**. Pessoas que não são membros do grupo exibem um marcador **Visitante**.

## Verificando quais grupos ainda precisam de presença

Quando várias turmas se reúnem no mesmo horário de culto, você pode ver de relance quais ainda precisam ter a presença lançada para aquela data.

1. Abra uma sessão que tenha um horário de culto.
2. Clique em **Quem ainda precisa de presença** no topo da lista de presença.
3. Uma caixa de diálogo lista cada grupo atribuído àquele horário de culto, com um resumo como "5 de 8 grupos lançados" no topo.

Grupos sem ninguém marcado como presente naquela data exibem um marcador **Não lançado** e aparecem primeiro na lista. Grupos que têm presença exibem **Lançado** com o número de pessoas marcadas como presentes (por exemplo, "Lançado (12)"). Clique no nome de um grupo para abrir as sessões desse grupo com a sessão da mesma data já selecionada, para que você possa registrar a presença dele imediatamente. Se o grupo ainda não tiver uma sessão para aquela data, a lista de sessões dele é aberta para que você possa adicionar uma.

:::tip
Combine isso com **Imprimir todas as turmas** e [adicionar sessões para todas as turmas de um horário de culto](#adding-sessions-for-every-class-in-a-service-time): crie as sessões, entregue as folhas de chamada e use **Quem ainda precisa de presença** para ver quais folhas ainda não foram lançadas.
:::

## Imprimindo uma folha de chamada

Uma folha de chamada é uma lista de turma imprimível que os professores podem marcar à mão e entregar a você para lançar depois. Cada folha mostra o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um) com o nome da igreja abaixo, a turma, uma grande linha de **Data** abaixo do nome da turma e o horário de culto. Os membros são listados em duas colunas (leia de cima para baixo na coluna da esquerda e depois na da direita), para que mais nomes caibam em uma página, e cada membro tem as caixas **Presente** e **Ausente**. Há linhas em branco para visitantes e uma área de **Professor / Observações**.

- **A partir de uma sessão** -- Clique no ícone **Imprimir folha de chamada** (impressora) no topo da lista de presença da sessão. A folha é datada com a data da sessão.
- **Todas as turmas de um culto** -- Se a sessão tiver um horário de culto, clique em **Imprimir todas as turmas** para imprimir uma folha por turma atribuída àquele horário de culto. Cada turma é impressa em sua própria página.
- **A partir da lista de membros** -- Na página do grupo, clique em **Todos os membros**, depois clique no ícone **Imprimir folha de chamada** acima da lista de membros e escolha **Folha de presença** para imprimir uma folha sem data. O mesmo menu tem um layout **Lista de contatos** com o telefone, e-mail e endereço de cada membro -- consulte [Imprimindo a lista de membros](../groups/group-members.md#printing-the-member-list).

A folha abre em uma nova aba e a caixa de diálogo de impressão do navegador aparece automaticamente.

## Exportando a presença para uma planilha

Você pode baixar um registro da sessão como um arquivo CSV para usar no Excel, Numbers ou Planilhas Google.

1. Abra a sessão que você quer exportar.
2. Clique no botão **Exportar** no topo da lista de presença.
3. Abra o arquivo baixado no seu aplicativo de planilhas.

## Visualizando a presença registrada

Depois de registrar as sessões, os dados aparecem nos seus relatórios de presença.

- **Aba Tendência de presença** (em **Todos os anos** na página de Presença) -- mostra as tendências de toda a igreja ao longo do tempo. Consulte [Acompanhando a presença](tracking-attendance.md).
- **Aba Presença por grupo** -- mostra a presença detalhada por grupo individual. Consulte [Relatórios de presença](../reports/attendance-reports.md#group-attendance).

:::tip
Se uma sessão que você acabou de criar não aparecer nos relatórios imediatamente, verifique se a data da sessão está dentro do intervalo de datas selecionado nos filtros do relatório.
:::
