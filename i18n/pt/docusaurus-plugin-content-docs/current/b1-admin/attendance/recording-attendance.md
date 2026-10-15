---
title: "Registrando a Presença"
---

# Registrando a Presença

<div class="article-intro">

Depois que seus campi, horários de culto e grupos estiverem configurados, você pode registrar manualmente a presença após cada reunião. O B1 Admin organiza a presença em torno de **sessões** -- uma sessão por grupo por data de reunião. Você cria a sessão, marca quem compareceu, e os dados alimentam diretamente seus relatórios de presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de culto e grupos devem estar configurados. Consulte [Configuração de Presença](setup.md) se você ainda não fez isso.
- Os grupos que você deseja acompanhar devem ter **Rastrear Presença** ativado. Consulte [Configuração de Presença](setup.md) para mais detalhes.

</div>

## Criando uma Sessão

Uma sessão representa uma ocorrência de uma reunião de grupo -- por exemplo, sua turma do 1º ao 3º ano em um domingo específico.

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Grupos**.
2. Selecione o grupo para o qual deseja registrar a presença.
3. Na seção **Sessões** da página do grupo, clique em **Todas as sessões**.
4. Clique em **Novo** para criar uma nova sessão.
5. Se o grupo estiver atribuído a um horário de culto, escolha o **Horário de Culto**. Se for um grupo sem horário definido, este campo não aparecerá.
6. Selecione a **Data da Sessão** -- pode ser hoje, uma data passada ou uma data futura.
7. Clique em **Salvar**.

### Adicionando Sessões para Todas as Turmas de um Horário de Culto

Se outros grupos se reúnem no mesmo horário de culto (por exemplo, todas as turmas infantis às 9h00 de domingo), você pode criar as sessões deles em uma única etapa, em vez de visitar cada grupo.

1. Siga os passos acima e escolha um **Horário de Culto**.
2. Marque **Também adicionar para os outros _N_ grupos em _horário de culto_**. A caixa de seleção mostra quantos outros grupos estão atribuídos a esse horário de culto. Ela só aparece ao adicionar uma nova sessão e quando pelo menos um outro grupo se reúne nesse horário.
3. Clique em **Salvar**.

Uma sessão é criada para o grupo atual e para cada um dos outros grupos na mesma data e horário de culto. Grupos que já tenham uma sessão para essa data e horário são ignorados, para que você não tenha duplicatas.

:::tip
Você pode criar sessões para datas passadas para regularizar a presença que ainda não registrou, ou criá-las com antecedência para que estejam prontas quando seu grupo se reunir.
:::

## Marcando a Presença

Selecione uma sessão para ver sua lista de presença. Cada membro do grupo aparece com uma caixa de seleção, ordenado pelo sobrenome, e quem já foi registrado como presente aparece marcado.

1. Marque a caixa ao lado de cada pessoa que compareceu. Use **Selecionar Todos** ou **Desmarcar Todos** para alterar todos de uma vez.
2. A contagem acima da lista (por exemplo, "12 de 15 presentes") é atualizada conforme você marca as caixas.
3. Clique em **Salvar Presença**. Nada é registrado até você salvar, e uma mensagem confirma quando o salvamento estiver concluído.

Desmarcar uma pessoa que já havia sido registrada como presente e depois salvar a remove da sessão.

### Adicionando Visitantes

Para registrar alguém que não é membro do grupo, pesquise-o na busca de pessoas ao lado da lista de presença. Se essa pessoa ainda não estiver no seu banco de dados, você pode criá-la a partir da pesquisa. Em ambos os casos, ela será adicionada à lista já marcada. Clique em **Salvar Presença** para registrá-la.

Pessoas que fizeram check-in em um totem mostram um selo **Voluntário** ou **Visitante**. Pessoas que não são membros do grupo mostram um selo **Visitante**.

## Verificando Quais Grupos Ainda Precisam de Presença

Quando várias turmas se reúnem no mesmo horário de culto, você pode ver de relance quais ainda precisam ter a presença lançada para aquela data.

1. Abra uma sessão que tenha um horário de culto.
2. Clique em **Quem Ainda Precisa de Presença** no topo da lista de presença.
3. Um diálogo lista todos os grupos atribuídos àquele horário de culto, com um resumo como "5 de 8 grupos lançados" no topo.

Grupos sem ninguém marcado como presente naquela data mostram um selo **Não lançado** e aparecem primeiro. Grupos que já têm presença mostram **Lançado** com o número de pessoas marcadas como presentes (por exemplo, "Lançado (12)"). Clique no nome de um grupo para abrir as sessões desse grupo com a sessão da mesma data já selecionada, para que você possa registrar a presença imediatamente. Se o grupo ainda não tiver uma sessão para essa data, a lista de sessões dele será aberta para que você possa adicionar uma.

:::tip
Combine isso com **Imprimir Todas as Turmas** e [adicionar sessões para todas as turmas de um horário de culto](#adding-sessions-for-every-class-in-a-service-time): crie as sessões, entregue as folhas de chamada e, em seguida, use **Quem Ainda Precisa de Presença** para ver quais folhas ainda não foram lançadas.
:::

## Imprimindo uma Folha de Chamada

Uma folha de chamada é uma lista de turma imprimível que os professores podem marcar à mão e devolver para você lançar depois. Cada folha mostra o logotipo da sua igreja (o **Logotipo para Fundo Claro** de [Website > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da igreja abaixo, a turma, uma linha grande de **Data** abaixo do nome da turma e o horário de culto. Os membros são listados em duas colunas (leia de cima para baixo na coluna da esquerda, depois na da direita), para que caibam mais nomes em uma página, e cada membro tem as caixas **Presente** e **Ausente**. Há linhas em branco para visitantes e uma área de **Professor / Observações**.

- **A partir de uma sessão** -- Clique no ícone de impressora **Imprimir Folha de Chamada** no topo da lista de presença da sessão. A folha é datada com a data da sessão.
- **Todas as turmas de um culto** -- Se a sessão tiver um horário de culto, clique em **Imprimir Todas as Turmas** para imprimir uma folha por turma atribuída àquele horário. Cada turma é impressa em sua própria página.
- **A partir da lista de membros** -- Na página do grupo, clique em **Todos os membros**, depois clique no ícone **Imprimir Folha de Chamada** acima da lista de membros e escolha **Folha de Presença** para imprimir uma folha sem data. O mesmo menu tem um layout **Lista de Contatos** com o telefone, e-mail e endereço de cada membro -- consulte [Imprimindo a Lista de Membros](../groups/group-members.md#printing-the-member-list).

A folha abre em uma nova aba e a janela de impressão do seu navegador aparece automaticamente.

## Exportando a Presença para uma Planilha

Você pode baixar um registro da sessão como um arquivo CSV para usar no Excel, Numbers ou Google Planilhas.

1. Abra a sessão que deseja exportar.
2. Clique no botão **Exportar** no topo da lista de presença.
3. Abra o arquivo baixado no seu aplicativo de planilhas.

## Visualizando a Presença Registrada

Depois de registrar as sessões, os dados aparecem nos seus relatórios de presença.

- **Aba Tendência de Presença** (em **Todos os anos** na página de Presença) -- mostra as tendências de toda a igreja ao longo do tempo. Consulte [Acompanhando a Presença](tracking-attendance.md).
- **Aba Presença por Grupo** -- mostra a presença detalhada por grupo individual. Consulte [Relatórios de Presença](../reports/attendance-reports.md#group-attendance).

:::tip
Se uma sessão que você acabou de criar não aparecer nos relatórios imediatamente, verifique se a data da sessão está dentro do intervalo de datas selecionado nos filtros do relatório.
:::
