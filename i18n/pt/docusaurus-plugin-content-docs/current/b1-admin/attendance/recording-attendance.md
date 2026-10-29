---
title: "Registrando Presença"
---

# Registrando Presença

<div class="article-intro">

Depois que seus campi, horários de serviço e grupos estiverem configurados, você pode registrar manualmente a presença após cada reunião. O B1 Admin organiza a presença em torno de **sessões** -- uma sessão por grupo por data de encontro. Você cria a sessão, marca quem compareceu, e os dados alimentam diretamente os seus relatórios de presença.

</div>

## Vídeo de Treinamento

<YouTube id="gS8h2rhyMys" title="Recording and Tracking Attendance in B1" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de serviço e grupos devem estar configurados. Consulte [Configuração de Presença](setup.md) se você ainda não fez isso.
- Os grupos que você quer acompanhar devem ter **Controlar presença** habilitado. Consulte [Configuração de Presença](setup.md) para mais detalhes.
- Você precisa da permissão **Editar presença** para salvar a presença. Voluntários que têm apenas **Ver somente nomes de pessoas** podem lançar a presença dessa forma -- eles abrem as turmas em **Grupos** e veem os membros somente pelo nome. Consulte [Somente nomes de pessoas](../settings/roles-permissions.md#people-names-only).

</div>

## Criando uma Sessão

Uma sessão representa uma ocorrência de uma reunião de grupo -- por exemplo, a sua turma do 1º ao 3º ano em um domingo específico.

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Grupos**.
2. Selecione o grupo para o qual você quer registrar a presença.
3. Na seção **Sessões** da página do grupo, clique em **Todas as sessões**.
4. Clique em **Novo** para criar uma nova sessão.
5. Se o grupo estiver atribuído a um horário de serviço, escolha o **Horário de serviço**. Se for um grupo sem agenda, este campo não aparecerá.
6. Selecione a **Data da sessão** -- pode ser hoje, uma data passada ou uma data futura.
7. Clique em **Salvar**.

### Adicionando Sessões para Todas as Turmas de um Horário de Serviço

Se outros grupos se reúnem no mesmo horário de serviço (por exemplo, todas as turmas das crianças às 9h00 de domingo), você pode criar as sessões delas em uma única etapa, em vez de visitar cada grupo.

1. Siga os passos acima e escolha um **Horário de serviço**.
2. Marque **Também adicionar para os outros _N_ grupos em _horário de serviço_**. A caixa de seleção mostra quantos outros grupos estão atribuídos a esse horário de serviço. Ela só aparece ao adicionar uma nova sessão e quando pelo menos outro grupo se reúne naquele horário.
3. Clique em **Salvar**.

Uma sessão é criada para o grupo atual e para cada um dos outros grupos na mesma data e horário de serviço. Grupos que já têm uma sessão para aquela data e horário de serviço são ignorados, então você não terá duplicatas.

:::tip
Você pode criar sessões para datas passadas para regularizar a presença que ainda não foi registrada, ou criá-las com antecedência para que estejam prontas quando o seu grupo se reunir.
:::

## Anotações da Sessão {#session-notes}

Cada sessão pode ter anotações -- um resumo do que foi abordado, anúncios ou pedidos de oração.

1. Ao adicionar uma sessão, ou depois de clicar no ícone **Editar** (lápis) ao lado de uma sessão na lista, digite na caixa **Anotações (o que foi abordado, anúncios, pedidos de oração)** abaixo da data. A barra de ferramentas permite adicionar texto em negrito, listas e links.
2. Clique em **Salvar**.

As anotações aparecem no topo da lista de presença da sessão. Elas também são as anotações da reunião que os membros do grupo leem na seção **Reuniões** da página do grupo no B1.church, onde os líderes do grupo também podem escrevê-las e editá-las. Consulte [Detalhes do Grupo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcando a Presença

Selecione uma sessão para ver a lista de presença dela. Cada membro do grupo aparece com uma caixa de seleção, ordenado pelo sobrenome, e quem já estiver registrado como presente aparece marcado.

1. Marque a caixa ao lado de cada pessoa que compareceu. Use **Selecionar tudo** ou **Desmarcar tudo** para alterar todos de uma vez.
2. A contagem acima da lista (por exemplo, "12 de 15 presentes") é atualizada conforme você marca as caixas.
3. Clique em **Salvar presença**. Nada é registrado até você salvar, e uma mensagem confirma quando o salvamento termina. Se você tentar fechar ou recarregar a aba do navegador enquanto um salvamento ainda estiver em andamento, o navegador avisará antes, para que as alterações não se percam.

Desmarcar alguém que já estava registrado como presente e, em seguida, salvar, remove essa pessoa da sessão.

### Adicionando Visitantes

Para registrar alguém que não é membro do grupo, pesquise essa pessoa na busca de pessoas ao lado da lista de presença. Se ela ainda não estiver no seu banco de dados, você pode criá-la a partir da busca. Em qualquer dos casos, ela é adicionada à lista já marcada. Clique em **Salvar presença** para registrá-la.

Pessoas que fizeram check-in em um quiosque exibem um marcador **Voluntário** ou **Visitante**. Pessoas que não são membros do grupo exibem um marcador **Visitante**.

## Verificando Quais Grupos Ainda Precisam de Presença

Quando várias turmas se reúnem no mesmo horário de serviço, você pode ver de relance quais ainda precisam ter a presença lançada para aquela data.

1. Abra uma sessão que tenha um horário de serviço.
2. Clique em **Quem ainda precisa de presença** no topo da lista de presença.
3. Uma caixa de diálogo lista todos os grupos atribuídos àquele horário de serviço, com um resumo como "5 de 8 grupos lançados" no topo.

Grupos sem ninguém marcado como presente naquela data exibem um marcador **Não lançado** e aparecem primeiro na lista. Grupos que já têm presença exibem **Lançado** com o número de pessoas marcadas como presentes (por exemplo, "Lançado (12)"). Clique no nome de um grupo para abrir as sessões desse grupo com a sessão da mesma data já selecionada, para que você possa lançar a presença imediatamente. Se o grupo ainda não tiver uma sessão para aquela data, a lista de sessões dele é aberta para que você possa adicionar uma.

:::tip
Combine isto com **Imprimir todas as turmas** e [adicionar sessões para todas as turmas de um horário de serviço](#adding-sessions-for-every-class-in-a-service-time): crie as sessões, entregue as listas de chamada e use **Quem ainda precisa de presença** para ver quais listas ainda não foram lançadas.
:::

## Imprimindo uma Lista de Chamada

Uma lista de chamada é uma relação de turma para impressão que os professores podem marcar à mão e devolver para você lançar depois. Cada lista mostra o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), caso você tenha enviado um) com o nome da igreja abaixo, a turma, uma linha grande de **Data** logo abaixo do nome da turma e o horário de serviço. Os membros são listados em duas colunas (leia de cima para baixo na coluna da esquerda e depois na da direita) para que caibam mais nomes em uma página, e cada membro tem as caixas **Presente** e **Ausente**. Há linhas em branco para visitantes e uma área de **Professor / Observações**.

- **A partir de uma sessão** -- Clique no ícone **Imprimir lista de chamada** (impressora) no topo da lista de presença da sessão. A lista é datada com a data da sessão e mostra o horário de serviço dessa sessão.
- **Todas as turmas de um serviço** -- Se a sessão tiver um horário de serviço, clique em **Imprimir todas as turmas** para imprimir uma lista por turma atribuída àquele horário de serviço. Cada turma é impressa em sua própria página.
- **A partir da lista de membros** -- Na página do grupo, clique em **Todos os membros**, depois clique no ícone **Imprimir lista de chamada** acima da lista de membros e escolha **Folha de presença** para imprimir uma folha sem data. O mesmo menu tem um layout **Lista de contatos** com o telefone, o e-mail e o endereço de cada membro -- consulte [Imprimindo a Lista de Membros](../groups/group-members.md#printing-the-member-list).

A lista abre em uma nova aba, e a caixa de diálogo de impressão do navegador aparece automaticamente.

## Exportando a Presença para uma Planilha

Você pode baixar um registro da sessão como arquivo CSV para usar no Excel, Numbers ou Google Planilhas.

1. Abra a sessão que você quer exportar.
2. Clique no botão **Exportar** no topo da lista de presença.
3. Abra o arquivo baixado no seu aplicativo de planilhas.

## Visualizando a Presença Registrada

Depois de registrar as sessões, os dados aparecem nos seus relatórios de presença.

- **Aba Tendência de Presença** (em **Todos os anos** na página Presença) -- mostra as tendências de toda a igreja ao longo do tempo. Consulte [Rastreamento de Presença](tracking-attendance.md).
- **Aba Presença por Grupo** -- mostra a presença dividida por grupo individual. Consulte [Relatórios de Presença](../reports/attendance-reports.md#group-attendance).

:::tip
Se uma sessão que você acabou de criar não aparecer nos relatórios imediatamente, verifique se a data da sessão está dentro do intervalo de datas selecionado nos filtros do relatório.
:::
