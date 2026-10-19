---
title: "Registrando a Presença"
---

# Registrando a Presença

<div class="article-intro">

Depois que seus campi, horários de culto e grupos estiverem configurados, você pode registrar a presença manualmente após cada reunião. O B1 Admin organiza a presença em torno de **sessões** — uma sessão por grupo por data de encontro. Você cria a sessão, marca quem compareceu, e os dados alimentam diretamente seus relatórios de presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de culto e grupos devem estar configurados. Consulte [Configuração da Presença](setup.md) se você ainda não fez isso.
- Os grupos que você deseja acompanhar devem ter **Track Attendance** habilitado. Consulte [Configuração da Presença](setup.md) para mais detalhes.

</div>

## Criando uma Sessão

Uma sessão representa uma ocorrência de uma reunião de grupo — por exemplo, a sua turma do Jardim de Infância ao 3º ano em um domingo específico.

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Grupos**.
2. Selecione o grupo para o qual você deseja registrar a presença.
3. Na seção **Sessions** da página do grupo, clique em **All sessions**.
4. Clique em **New** para criar uma nova sessão.
5. Se o grupo estiver atribuído a um horário de culto, escolha o **Service Time**. Se for um grupo sem horário fixo, esse campo não aparecerá.
6. Selecione a **Session Date** — pode ser hoje, uma data passada ou uma data futura.
7. Clique em **Save**.

### Adicionando Sessões para Todas as Turmas de um Horário de Culto {#adding-sessions-for-every-class-in-a-service-time}

Se outros grupos se reúnem no mesmo horário de culto (por exemplo, todas as turmas infantis no domingo às 9:00), você pode criar as sessões delas de uma só vez, em vez de visitar cada grupo.

1. Siga os passos acima e escolha um **Service Time**.
2. Marque **Also add for the other _N_ groups in _service time_**. A caixa mostra quantos outros grupos estão atribuídos a esse horário de culto. Ela só aparece ao adicionar uma nova sessão e quando pelo menos outro grupo se reúne nesse horário.
3. Clique em **Save**.

Uma sessão é criada para o grupo atual e para cada um dos outros grupos na mesma data e horário de culto. Grupos que já têm uma sessão para essa data e horário são ignorados, então você não terá duplicatas.

:::tip
Você pode criar sessões para datas passadas para recuperar presenças que ainda não registrou, ou criá-las com antecedência para que estejam prontas quando seu grupo se reunir.
:::

## Notas da Sessão {#session-notes}

Cada sessão pode ter notas — um resumo do que foi tratado, avisos ou pedidos de oração.

1. Ao adicionar uma sessão, ou depois de clicar no ícone **Edit** (lápis) ao lado de uma sessão na lista, digite na caixa **Notes (what was covered, announcements, prayer requests)** abaixo da data. A barra de ferramentas permite adicionar texto em negrito, listas e links.
2. Clique em **Save**.

As notas aparecem no topo da lista de presença da sessão. Elas também são as notas de reunião que os membros do grupo leem na seção **Meetings** da página do grupo no B1.church, onde os líderes de grupo também podem escrever e editar. Consulte [Detalhes do Grupo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcando a Presença

Selecione uma sessão para ver sua lista de presença. Cada membro do grupo aparece com uma caixa de seleção, ordenado por sobrenome, e quem já estiver registrado como presente aparece marcado.

1. Marque a caixa ao lado de cada pessoa que compareceu. Use **Select All** ou **Select None** para alterar todos de uma vez.
2. A contagem acima da lista (por exemplo, "12 of 15 present") é atualizada conforme você marca as caixas.
3. Clique em **Save Attendance**. Nada é registrado até que você salve, e uma mensagem confirma quando o salvamento estiver concluído.

Desmarcar alguém que já estava registrado como presente e salvar remove essa pessoa da sessão.

### Adicionando Visitantes

Para registrar alguém que não é membro do grupo, pesquise essa pessoa na busca de pessoas ao lado da lista de presença. Se ela ainda não estiver no seu banco de dados, você pode criá-la a partir da busca. Em ambos os casos, ela é adicionada à lista já marcada. Clique em **Save Attendance** para registrá-la.

Pessoas que fizeram check-in em um quiosque mostram um selo **Volunteer** ou **Guest**. Pessoas que não são membros do grupo mostram um selo **Guest**.

## Verificando Quais Grupos Ainda Precisam de Presença

Quando várias turmas se reúnem no mesmo horário de culto, você pode ver de relance quais ainda precisam ter a presença lançada para aquela data.

1. Abra uma sessão que tenha um horário de culto.
2. Clique em **Who Still Needs Attendance** no topo da lista de presença.
3. Um diálogo lista cada grupo atribuído a esse horário de culto, com um resumo como "5 of 8 groups entered" no topo.

Grupos sem ninguém marcado como presente naquela data mostram um selo **Not entered** e aparecem primeiro. Grupos que já têm presença mostram **Entered** com o número de pessoas marcadas como presentes (por exemplo, "Entered (12)"). Clique no nome de um grupo para abrir as sessões desse grupo com a sessão da mesma data já selecionada, para que você possa registrar a presença dele imediatamente. Se o grupo ainda não tiver uma sessão para essa data, a lista de sessões dele é aberta para que você possa adicionar uma.

:::tip
Combine isso com **Print All Classes** e [adicionar sessões para todas as turmas de um horário de culto](#adding-sessions-for-every-class-in-a-service-time): crie as sessões, entregue as folhas de chamada e use **Who Still Needs Attendance** para ver quais folhas ainda não foram lançadas.
:::

## Imprimindo uma Folha de Chamada {#printing-a-roll-sheet}

Uma folha de chamada é uma lista de turma imprimível que os professores podem marcar à mão e entregar para você lançar depois. Cada folha mostra o logo da sua igreja (o **Light Background Logo** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da igreja abaixo, a turma, uma linha grande de **Date** logo abaixo do nome da turma e o horário de culto. Os membros são listados em duas colunas (leia de cima para baixo na coluna da esquerda, depois na da direita) para que caibam mais nomes em uma página, e cada membro tem as caixas **Present** e **Absent**. Há linhas em branco para visitantes e uma área **Teacher / Notes**.

- **A partir de uma sessão** — Clique no ícone de impressora **Print Roll Sheet** no topo da lista de presença da sessão. A folha tem a data da sessão.
- **Todas as turmas de um culto** — Se a sessão tiver um horário de culto, clique em **Print All Classes** para imprimir uma folha por turma atribuída a esse horário. Cada turma é impressa em sua própria página.
- **A partir da lista de membros** — Na página do grupo, clique em **All members**, depois clique no ícone **Print Roll Sheet** acima da lista de membros e escolha **Attendance Sheet** para imprimir uma folha sem data. O mesmo menu tem um layout **Contact Roster** com o telefone, e-mail e endereço de cada membro — consulte [Imprimindo a Lista de Membros](../groups/group-members.md#printing-the-member-list).

A folha abre em uma nova aba e a caixa de diálogo de impressão do seu navegador aparece automaticamente.

## Exportando a Presença para uma Planilha

Você pode baixar um registro da sessão como arquivo CSV para usar no Excel, Numbers ou Google Sheets.

1. Abra a sessão que deseja exportar.
2. Clique no botão **Export** no topo da lista de presença.
3. Abra o arquivo baixado no seu aplicativo de planilhas.

## Visualizando a Presença Registrada

Depois de registrar sessões, os dados aparecem nos seus relatórios de presença.

- **Aba Attendance Trend** (em **All years** na página Attendance) — mostra as tendências da igreja inteira ao longo do tempo. Consulte [Acompanhando a Presença](tracking-attendance.md).
- **Aba Group Attendance** — mostra a presença detalhada por grupo. Consulte [Relatórios de Presença](../reports/attendance-reports.md#group-attendance).

:::tip
Se uma sessão que você acabou de criar não aparecer nos relatórios imediatamente, verifique se a data da sessão está dentro do intervalo de datas selecionado nos filtros do relatório.
:::
