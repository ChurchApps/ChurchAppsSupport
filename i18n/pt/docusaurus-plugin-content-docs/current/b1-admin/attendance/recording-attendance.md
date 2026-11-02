---
title: "Registrando presença"
---

# Registrando presença

<div class="article-intro">

Depois que seus campi, horários de culto e grupos estiverem configurados, você poderá lançar a presença manualmente após cada reunião. O B1 Admin organiza a presença em torno de **sessões** -- uma sessão por grupo em cada data de encontro. Você cria a sessão, marca quem compareceu, e os dados alimentam diretamente os seus relatórios de presença.

</div>

## Vídeo de treinamento

<YouTube id="gS8h2rhyMys" title="Registrando e acompanhando a presença no B1" next="Criando planos e escalando voluntários no B1" nextUrl="/docs/b1-admin/serving/plans" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Seus campi, horários de culto e grupos devem estar configurados. Veja [Configuração de Presença](setup.md) se você ainda não fez isso.
- Os grupos que você quer acompanhar devem ter a opção **Acompanhar presença** ativada. Veja [Configuração de Presença](setup.md) para mais detalhes.
- Você precisa da permissão **Editar Presença** para salvar a presença. Voluntários que têm somente **Ver nomes de pessoas apenas** podem registrar a presença desta forma -- eles abrem as turmas em **Grupos** e veem os membros apenas pelo nome. Veja [Nomes de pessoas apenas](../settings/roles-permissions.md#people-names-only).

</div>

## Criando uma sessão

Uma sessão representa uma ocorrência de um encontro de grupo -- por exemplo, a sua turma do 1º ao 3º ano em um domingo específico.

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas** e clique em **Grupos**.
2. Selecione o grupo para o qual você quer registrar a presença.
3. Na seção **Sessões** da página do grupo, clique em **Todas as sessões**.
4. Clique em **Novo** para criar uma nova sessão.
5. Se o grupo estiver vinculado a um horário de culto, escolha o **Horário de culto**. Se for um grupo sem agendamento, este campo não aparecerá.
6. Selecione a **Data da sessão** -- pode ser hoje, uma data passada ou uma data futura.
7. Clique em **Salvar**.

### Adicionando sessões para todas as turmas de um horário de culto {#adding-sessions-for-every-class-in-a-service-time}

Se outros grupos se reúnem no mesmo horário de culto (por exemplo, todas as turmas infantis às 9:00 de domingo), você pode criar as sessões deles em uma única etapa, em vez de visitar cada grupo.

1. Siga os passos acima e escolha um **Horário de culto**.
2. Marque **Também adicionar para os outros _N_ grupos em _horário de culto_**. A caixa de seleção mostra quantos outros grupos estão vinculados àquele horário de culto. Ela só aparece ao adicionar uma nova sessão e quando pelo menos outro grupo se reúne naquele horário.
3. Clique em **Salvar**.

É criada uma sessão para o grupo atual e para cada um dos outros grupos na mesma data e no mesmo horário de culto. Os grupos que já têm uma sessão para aquela data e horário são ignorados, então você não terá duplicatas.

:::tip
Você pode criar sessões para datas passadas para registrar a presença que ainda não lançou, ou criá-las com antecedência para que estejam prontas quando o seu grupo se reunir.
:::

## Notas da sessão {#session-notes}

Cada sessão pode ter notas -- um resumo do que foi abordado, anúncios ou pedidos de oração.

1. Ao adicionar uma sessão, ou depois de clicar no ícone **Editar** (lápis) ao lado de uma sessão na lista, digite no campo **Notas (o que foi abordado, anúncios, pedidos de oração)** abaixo da data. A barra de ferramentas permite adicionar texto em negrito, listas e links.
2. Clique em **Salvar**.

As notas aparecem no topo da lista de presença da sessão. Elas também são as notas da reunião que os membros do grupo leem na seção **Reuniões** da página do grupo no B1.church, onde os líderes do grupo também podem escrever e editar. Veja [Detalhes do grupo](../../b1-church/groups/group-details.md#meeting-notes-and-attendance).

## Marcando a presença

Selecione uma sessão para ver a sua lista de presença. Cada membro do grupo aparece com uma caixa de seleção, ordenado pelo sobrenome, e quem já estiver registrado como presente aparece marcado.

1. Marque a caixa ao lado de cada pessoa que compareceu. Use **Selecionar todos** ou **Desmarcar todos** para alterar todos de uma vez.
2. A contagem acima da lista (por exemplo, "12 de 15 presentes") é atualizada conforme você marca as caixas.
3. Clique em **Salvar presença**. Nada é registrado até você salvar, e uma mensagem confirma quando o salvamento terminar. Se você tentar fechar ou recarregar a aba do navegador enquanto um salvamento ainda estiver em andamento, o navegador avisará antes, para que as alterações não se percam.

Desmarcar alguém que já estava registrado como presente e depois salvar remove essa pessoa da sessão.

### Adicionando visitantes

Para registrar alguém que não é membro do grupo, pesquise essa pessoa na busca de pessoas ao lado da lista de presença. Se ela ainda não estiver no seu banco de dados, você pode criá-la a partir da busca. Em ambos os casos, ela é adicionada à lista já marcada. Clique em **Salvar presença** para registrá-la.

Pessoas que fizeram check-in em um quiosque exibem uma etiqueta **Voluntário** ou **Visitante**. Pessoas que não são membros do grupo exibem uma etiqueta **Visitante**.

## Verificando quais grupos ainda precisam de presença

Quando várias turmas se reúnem no mesmo horário de culto, você pode ver de relance quais ainda precisam ter a presença lançada para aquela data.

1. Abra uma sessão que tenha um horário de culto.
2. Clique em **Quem ainda precisa de presença** no topo da lista de presença.
3. Uma janela lista cada grupo vinculado àquele horário de culto, com um resumo como "5 de 8 grupos lançados" no topo.

Grupos sem ninguém marcado como presente naquela data exibem uma etiqueta **Não lançado** e aparecem primeiro na lista. Grupos que já têm presença exibem **Lançado** com o número de pessoas marcadas como presentes (por exemplo, "Lançado (12)"). Clique no nome de um grupo para abrir as sessões desse grupo com a sessão da mesma data já selecionada, para que você possa registrar a presença dele imediatamente. Se o grupo ainda não tiver uma sessão para aquela data, a lista de sessões dele é aberta para que você possa adicionar uma.

:::tip
Combine isso com **Imprimir todas as turmas** e [adicionar sessões para todas as turmas de um horário de culto](#adding-sessions-for-every-class-in-a-service-time): crie as sessões, entregue as folhas de chamada e depois use **Quem ainda precisa de presença** para ver quais folhas ainda não foram lançadas.
:::

## Imprimindo uma folha de chamada {#printing-a-roll-sheet}

Uma folha de chamada é uma lista de turma imprimível que os professores podem marcar à mão e devolver para você lançar depois. Cada folha mostra o logotipo da sua igreja (o **Logotipo para fundo claro** de [Site > Aparência](../website/appearance.md), se você tiver enviado um) com o nome da igreja logo abaixo, a turma, uma linha grande de **Data** abaixo do nome da turma e o horário de culto. Os membros são listados em duas colunas (leia de cima para baixo na coluna da esquerda e depois na da direita), para que caibam mais nomes em uma página, e cada membro tem as caixas **Presente** e **Ausente**. Há linhas em branco para visitantes e uma área de **Professor / Notas**.

- **A partir de uma sessão** -- Clique no ícone **Imprimir folha de chamada** (impressora) no topo da lista de presença da sessão. A folha é datada com a data da sessão e mostra o horário de culto dessa sessão.
- **Todas as turmas de um culto** -- Se a sessão tiver um horário de culto, clique em **Imprimir todas as turmas** para imprimir uma folha por turma vinculada àquele horário de culto. Cada turma é impressa em sua própria página.
- **A partir da lista de membros** -- Na página do grupo, clique em **Todos os membros**, depois clique no ícone **Imprimir folha de chamada** acima da lista de membros e escolha **Folha de presença** para imprimir uma folha sem data. O mesmo menu tem um layout **Lista de contatos** com o telefone, o e-mail e o endereço de cada membro -- veja [Imprimindo a lista de membros](../groups/group-members.md#printing-the-member-list).

A folha abre em uma nova aba e a janela de impressão do navegador aparece automaticamente.

## Exportando a presença para uma planilha

Você pode baixar um registro da sessão como um arquivo CSV para usar no Excel, no Numbers ou no Planilhas Google.

1. Abra a sessão que você quer exportar.
2. Clique no botão **Exportar** no topo da lista de presença.
3. Abra o arquivo baixado no seu aplicativo de planilhas.

## Visualizando a presença registrada

Depois de registrar as sessões, os dados aparecem nos seus relatórios de presença.

- **Aba Tendência de presença** (em **Todos os anos** na página Presença) -- mostra as tendências de toda a igreja ao longo do tempo. Veja [Acompanhando a presença](tracking-attendance.md).
- **Aba Presença por grupo** -- mostra a presença detalhada por grupo individual. Veja [Relatórios de presença](../reports/attendance-reports.md#group-attendance).

:::tip
Se uma sessão que você acabou de criar não aparecer nos relatórios imediatamente, verifique se a data da sessão está dentro do intervalo de datas selecionado nos filtros do relatório.
:::
