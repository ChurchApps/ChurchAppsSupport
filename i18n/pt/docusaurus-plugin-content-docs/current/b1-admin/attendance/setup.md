---
title: "Configuração de presença"
---

# Configuração de presença

<div class="article-intro">

Antes de poder acompanhar a presença, você precisa informar ao B1 Admin os locais físicos da sua igreja, quando acontecem os cultos e quais grupos se reúnem em cada culto. Esta configuração única cria a estrutura que alimenta todo o acompanhamento e os relatórios de presença da sua igreja.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar a presença. Consulte [Funções e permissões](../people/roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você planeja atribuir grupos a horários de culto, certifique-se de que seus [grupos estejam criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos principais

- **Campus** -- um local físico onde sua igreja se reúne (por exemplo, "Campus Principal", "Campus Norte"). Os campi são gerenciados em **Configurações**.
- **Culto** -- uma reunião recorrente em um campus (por exemplo, "Culto de domingo", "Meio de semana").
- **Horário de culto** -- um horário específico em que um culto acontece (por exemplo, "9h00", "11h00").
- **Grupo com horário** -- um grupo atribuído a um horário de culto específico. A presença é acompanhada no contexto desse culto.
- **Grupo sem horário** -- um grupo que acompanha a presença por conta própria, sem estar vinculado a um horário de culto.

## Configurando a estrutura de presença

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Pessoas**.
2. Clique em **Presença** e depois em **Configuração** na coluna da esquerda. A tabela **Estrutura de cultos** é aberta, com a contagem de seus campi, horários de culto e grupos com e sem horário no topo. As contagens são atualizadas assim que você adiciona, edita ou remove algo na tabela.
3. Clique em **Gerenciar campi** (no canto superior direito do painel **Estrutura de cultos**). Isso leva você para **Configurações → Campi**. Clique em **Adicionar campus**, informe o nome do seu local (endereço e fuso horário são opcionais) e clique em **Salvar**.
4. Volte para **Pessoas → Presença** e clique em **Configuração**. Seu campus agora aparece na tabela de configuração.
5. Clique no **botão +, na coluna Culto,** abaixo do seu campus. Informe um nome de culto, como "Culto de domingo", e clique em **Salvar**.
6. Clique no **botão +, na coluna Horário,** abaixo do culto. Informe um nome de **Horário de culto**, como "9h00", opcionalmente preencha a [programação de check-in](#setting-a-check-in-schedule) e clique em **Salvar**. Repita para cada horário de culto.
7. Para conectar um grupo a um horário de culto, abra o grupo em **Pessoas > Grupos**, clique em **Editar** e use **Adicionar horário de culto** -- veja a próxima seção.

### Ativando o registro de presença em um grupo

Antes que um grupo possa ter presença registrada, é preciso ativar o **Registrar presença** para esse grupo.

1. No menu Jump, escolha **Pessoas > Grupos** e selecione o grupo.
2. Clique no botão **Editar** abaixo do nome do grupo.
3. Defina **Registrar presença** como **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de culto na etapa anterior, use também a opção **Adicionar horário de culto** na tela de edição do grupo para vinculá-lo ao culto correto. Isso garante que as sessões fiquem conectadas ao campus e horário certos.
:::

:::tip
Se um grupo se reúne fora de um culto regular -- como um pequeno grupo de meio de semana que acompanha a própria presença -- você pode deixá-lo como grupo sem horário. Ele continuará aparecendo no relatório **Presença por grupo** para fins de relatórios de presença.
:::

## Configurando uma programação de check-in

Cada horário de culto pode ter uma programação de check-in opcional, para que o [autoatendimento de check-in](check-in.md) abra e feche sozinho toda semana. Sem uma programação, o check-in para aquele horário de culto fica disponível a qualquer momento (desde que a sala não esteja fechada por outros motivos, como estar lotada).

1. Na tela **Configuração**, clique no nome de um horário de culto na coluna **Horário** (ou adicione um novo).
2. Em **Programação de check-in**, escolha o **Dia** da semana em que o horário de culto acontece.
3. Defina o **Horário de início** e, opcionalmente, o **Horário de término**.
4. Informe **Abrir check-in (minutos antes do início)** -- por exemplo, `30` abre o check-in meia hora antes do início do culto.
5. Informe **Fechar check-in (minutos após o término)** -- por exemplo, `15` mantém o check-in aberto por 15 minutos após o horário de término. Se você não definiu um horário de término, essa contagem é feita a partir do horário de início.
6. Clique em **Salvar**.

A programação se repete toda semana e é medida no fuso horário do campus do culto. Se esse campus não tiver um fuso horário, o [Fuso horário](../settings/church-settings.md#time-zone) da sua igreja é usado no lugar, depois o fuso horário do primeiro campus que tiver um definido e, por fim, o horário de Nova York (America/New_York). Se o check-in abrir no horário errado, verifique o **Fuso horário** do campus em [Campi](../settings/campuses.md). Para remover uma programação, defina o **Dia** de volta para **Sem programação** e clique em **Salvar**. Uma programação só tem efeito quando tanto o **Dia** quanto o **Horário de início** estão definidos.

Enquanto a janela de check-in de um horário de culto estiver fechada:

- O **autoatendimento de check-in no B1.church** lista esse horário de culto como **Fechado** (ou, por exemplo, **Fechado · abre dom 9h30**) e ele não pode ser selecionado. Se nenhum dos horários de um culto estiver aberto, as famílias veem quando o check-in será aberto, como "O check-in abre dom 9h30".
- **O aplicativo de quiosque B1 Checkin** também mostra o horário de culto como **Fechado**, com a informação de quando ele abre. Se todos os horários de um culto estiverem fechados, o quiosque informa quando o check-in para aquele culto será aberto. Alguém que já fez check-in em um horário de culto fechado vê o grupo dele com **Check-in feito** no lugar. Se uma janela se fechar durante um check-in, o quiosque não o concluirá e exibirá uma tela **Não é possível fazer check-in ainda** listando a sala afetada, para que a família possa escolher outra.

Uma família que já fez check-in para um horário de culto anterior ainda pode voltar e adicionar um horário de culto posterior que esteja aberto, mesmo depois que a janela do horário anterior tiver se encerrado. Os check-ins existentes são mantidos.

:::tip
Defina uma janela de abertura generosa (por exemplo, 45 minutos antes do início) para que as famílias e os voluntários que chegam cedo possam fazer o check-in, e uma janela de fechamento curta para que quem chega atrasado ainda possa fazer o check-in depois que o culto tiver começado.
:::

## Editando sua configuração

Você pode atualizar sua configuração a qualquer momento. Selecione um campus, horário de culto ou grupo e clique em **Editar** para alterar seus detalhes, ou em **Excluir** para removê-lo.

:::info
Remover um horário de culto não exclui os registros de presença anteriores. Seus dados históricos são preservados mesmo que você altere sua programação.
:::

## Próximos passos

Quando seus campi, horários de culto e grupos estiverem definidos, você estará pronto para começar a [registrar a presença](recording-attendance.md) manualmente ou configurar o [autoatendimento de check-in](check-in.md) para seus cultos.
