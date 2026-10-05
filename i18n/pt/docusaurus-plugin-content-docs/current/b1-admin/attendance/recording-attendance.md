---
title: "Registrando Presença"
---

# Registrando Presença

<div class="article-intro">

Uma vez que seus campi, horários de serviço e grupos estão configurados, você pode registrar manualmente a presença após cada reunião. O B1 Admin organiza a presença em torno de **sessões** -- uma sessão por grupo por data de reunião. Você cria a sessão, marca quem compareceu, e os dados alimentam diretamente seus relatórios de presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de serviço e grupos devem ser configurados. Veja [Configuração de Presença](setup.md) se você ainda não fez isso.
- Os grupos que você quer rastrear devem ter **Rastrear Presença** habilitado. Veja [Configuração de Presença](setup.md) para detalhes.

</div>

## Criando uma Sessão

Uma sessão representa uma ocorrência de uma reunião de grupo -- por exemplo, sua classe de K--3ª série em um domingo específico.

1. Abra **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Pessoas**, e clique em **Grupos**.
2. Selecione o grupo que você quer registrar presença.
3. Clique na aba **Sessões**.
4. Clique em **Nova** para criar uma nova sessão.
5. Se o grupo é atribuído a um horário de serviço, escolha o **Horário do Serviço**. Se é um grupo não agendado, este campo não aparecerá.
6. Selecione a **Data da Sessão** -- isto pode ser hoje, uma data passada, ou uma data futura.
7. Clique em **Salvar**.

### Adicionando Sessões para Cada Classe em um Horário de Serviço

Se outros grupos se reúnem no mesmo horário de serviço (por exemplo, todas as suas classes infantis no domingo 9:00 AM), você pode criar suas sessões em um passo em vez de visitar cada grupo.

1. Siga os passos acima e escolha um **Horário do Serviço**.
2. Marque **Também adicionar para os outros _N_ grupos em _horário de serviço_**. A caixa de seleção mostra quantos outros grupos são atribuídos àquele horário de serviço. Ela apenas aparece quando adicionando uma nova sessão e pelo menos um outro grupo se reúne naquele horário.
3. Clique em **Salvar**.

Uma sessão é criada para o grupo atual e para cada um dos outros grupos na mesma data e horário de serviço. Grupos que já têm uma sessão para aquela data e horário de serviço são ignorados, para que você não obtenha duplicatas.

:::tip
Você pode criar sessões para datas passadas para acompanhar a presença que você ainda não registrou, ou criar antecipadamente para que estejam prontas quando seu grupo se reúne.
:::

## Marcando Presença

Selecione uma sessão para ver sua lista de presença. Cada membro do grupo é listado com uma caixa de seleção, ordenado por sobrenome, e qualquer um já registrado como presente está marcado.

1. Marque a caixa ao lado de cada pessoa que compareceu. Use **Selecionar Tudo** ou **Selecionar Nenhum** para mudar todos de uma vez.
2. A contagem acima da lista (por exemplo, "12 de 15 presentes") se atualiza conforme você marca caixas.
3. Clique em **Salvar Presença**. Nada é registrado até que você salve, e uma mensagem confirma quando o salvamento é feito.

Desmarcar alguém que já foi registrado como presente e depois salvar os remove da sessão.

### Adicionando Visitantes

Para registrar alguém que não é um membro do grupo, pesquise por eles na pesquisa de pessoa ao lado da lista de presença. Se eles ainda não estão em seu banco de dados, você pode criá-los a partir da pesquisa. Eles são adicionados à lista já marcados. Clique em **Salvar Presença** para registrá-los.

Pessoas que fizeram check-in em um quiosque mostram um chip **Voluntário** ou **Hóspede**. Pessoas que não são membros do grupo mostram um chip **Hóspede**.

## Verificando Quais Grupos Ainda Precisam de Presença

Quando várias classes se reúnem no mesmo horário de serviço, você pode ver num relance quais ainda precisam ter sua presença registrada para aquela data.

1. Abra uma sessão que tenha um horário de serviço.
2. Clique em **Quem Ainda Precisa de Presença** no topo da lista de presença.
3. Um diálogo lista cada grupo atribuído àquele horário de serviço, com um resumo tal como "5 de 8 grupos registrados" no topo.

Grupos com ninguém marcado como presente para aquela data mostram um chip **Não registrado** e são listados primeiro. Grupos que têm presença mostram **Registrado** com o número de pessoas marcadas como presentes (por exemplo, "Registrado (12)"). Clique no nome de um grupo para saltar para aquele grupo e registrar sua presença.

:::tip
Combine isso com **Imprimir Todas as Classes** e [adicionando sessões para cada classe em um horário de serviço](#adding-sessions-for-every-class-in-a-service-time): crie as sessões, distribua folhas de presença, depois use **Quem Ainda Precisa de Presença** para ver quais folhas ainda não foram registradas.
:::

## Imprimindo uma Folha de Presença

Uma folha de presença é uma lista de classe imprimível que professores podem marcar à mão e devolver para você registrar depois. Cada folha mostra o nome da igreja, a classe, uma grande linha de **Data** sob o nome da classe, e o horário de serviço. Membros são listados em duas colunas (leia para baixo a coluna esquerda, depois a direita) para que mais nomes caibam em uma página, e cada membro tem caixas **Presente** e **Ausente**. Há linhas em branco para visitantes e uma área de **Professor / Notas**.

- **De uma sessão** -- Clique no ícone **Imprimir Folha de Presença** (impressora) no topo da lista de presença da sessão. A folha é datada com a data da sessão.
- **Todas as classes para um serviço** -- Se a sessão tem um horário de serviço, clique em **Imprimir Todas as Classes** para imprimir uma folha por classe atribuída àquele horário de serviço. Cada classe imprime em sua própria página.
- **Da aba Membros** -- Clique no ícone **Imprimir Folha de Presença** acima da lista de membros do grupo para imprimir uma folha sem data.

A folha abre em uma nova aba e o diálogo de impressão do seu navegador aparece automaticamente.

## Exportando Presença para uma Planilha

Você pode baixar um registro da sessão como um arquivo CSV para usar no Excel, Numbers ou Google Sheets.

1. Abra a sessão que você quer exportar.
2. Clique no botão **Exportar** no topo da lista de presença.
3. Abra o arquivo baixado em sua aplicação de planilha.

## Visualizando Presença Registrada

Depois de registrar sessões, os dados aparecem em seus relatórios de presença.

- **Aba Tendência de Presença** -- mostra tendências de toda a igreja ao longo do tempo. Veja [Rastreando Presença](tracking-attendance.md).
- **Aba Presença do Grupo** -- mostra presença dividida por grupo individual. Veja [Relatórios de Presença](../reports/attendance-reports.md#group-attendance).

:::tip
Se uma sessão que você acabou de criar não aparece em relatórios imediatamente, certifique-se de que a data da sessão está dentro do intervalo de datas selecionado nos filtros do relatório.
:::
