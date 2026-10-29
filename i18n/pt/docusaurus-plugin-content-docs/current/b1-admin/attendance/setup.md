---
title: "Configuração de Presença"
---

# Configuração de Presença

<div class="article-intro">

Antes de poder controlar a presença, você precisa informar ao B1 Admin sobre os locais físicos da sua igreja, quando acontecem os cultos e quais grupos se reúnem em cada culto. Esta configuração única cria a estrutura que sustenta todo o controle e os relatórios de presença da sua igreja.

</div>

## Vídeo de Treinamento

<YouTube id="LQPc2gVlXvQ" title="Setting Up Services and Attendance in B1" next="Setting Up Children's Check-In in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar a presença. Consulte [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza do seu nível de acesso.
- Se você pretende atribuir grupos a horários de serviço, certifique-se de que seus [grupos estejam criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos-Chave

- **Campus** -- um local físico onde a sua igreja se reúne (por exemplo, "Campus Central", "Campus Norte"). Os campi são gerenciados em **Configurações**.
- **Culto** -- uma reunião recorrente em um campus (por exemplo, "Culto de Domingo", "Meio de Semana").
- **Horário de Serviço** -- um horário específico em que um culto acontece (por exemplo, "9h00", "11h00").
- **Grupo Agendado** -- um grupo atribuído a um horário de serviço específico. A presença é controlada no contexto desse culto.
- **Grupo Não Agendado** -- um grupo que controla a presença por conta própria, sem estar vinculado a um horário de serviço.

## Configurando a Estrutura de Presença

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Pessoas**.
2. Clique em **Presença** e depois em **Configuração** na coluna da esquerda. A tabela **Estrutura de cultos** é aberta, com as contagens de campi, horários de serviço e grupos agendados e não agendados no topo. As contagens são atualizadas assim que você adiciona, edita ou remove algo na tabela.
3. Clique em **Gerenciar campi** (no canto superior direito do painel **Estrutura de cultos**). Isso leva você para **Configurações → Campi**. Clique em **Adicionar campus**, digite o nome do seu local (endereço e fuso horário são opcionais) e clique em **Salvar**.
4. Volte para **Pessoas → Presença** e clique em **Configuração**. Seu campus agora aparece na tabela de configuração.
5. Clique no **botão +, na coluna Culto,** abaixo do seu campus. Digite um nome de culto, como "Culto de Domingo", e clique em **Salvar**.
6. Clique no **botão +, na coluna Horário,** abaixo do culto. Digite um nome de **Horário de Serviço**, como "9h00", opcionalmente preencha a [programação de check-in](#setting-a-check-in-schedule) e clique em **Salvar**. Repita para cada horário de serviço.
7. Para vincular um grupo a um horário de serviço, abra o grupo em **Pessoas > Grupos**, clique em **Editar** e use **Adicionar horário de serviço** -- veja a próxima seção.

### Ativando o Controle de Presença em um Grupo

Antes que um grupo possa ter presença registrada, o controle de presença precisa estar ativado para esse grupo.

1. No menu Jump, escolha **Pessoas > Grupos** e selecione o grupo.
2. Clique no botão **Editar** abaixo do nome do grupo.
3. Defina **Controlar presença** como **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de serviço na etapa anterior, use também a opção **Adicionar horário de serviço** na tela de edição do grupo para vinculá-lo ao culto correto. Isso garante que as sessões fiquem conectadas ao campus e ao horário certos.
:::

:::tip
Se um grupo se reúne fora de um culto regular -- como um pequeno grupo de meio de semana que controla a própria presença -- você pode deixá-lo como grupo não agendado. Ele continuará aparecendo no relatório **Presença por Grupo** para fins de relatórios de presença.
:::

## Definindo uma Programação de Check-in

Cada horário de serviço pode ter uma programação de check-in opcional, para que o [autoatendimento de check-in](check-in.md) abra e feche sozinho a cada semana. Sem uma programação, o check-in desse horário de serviço fica disponível a qualquer momento (desde que a sala não esteja fechada por outros motivos, como estar lotada).

1. Na visualização **Configuração**, clique no nome de um horário de serviço na coluna **Horário** (ou adicione um novo).
2. Em **Programação de check-in**, escolha o **Dia** da semana em que o horário de serviço acontece.
3. Defina o **Horário de início** e, opcionalmente, o **Horário de término**.
4. Informe **Abrir check-in (minutos antes do início)** -- por exemplo, `30` abre o check-in meia hora antes do início do culto.
5. Informe **Fechar check-in (minutos após o término)** -- por exemplo, `15` mantém o check-in aberto por 15 minutos após o horário de término. Se você não definiu um horário de término, a contagem é feita a partir do horário de início.
6. Clique em **Salvar**.

A programação se repete toda semana e é medida no fuso horário do campus do culto. Se esse campus não tiver um fuso horário, o [Fuso horário](../settings/church-settings.md#time-zone) da sua igreja é usado no lugar; depois, o fuso horário do primeiro campus da sua igreja que tenha um definido; e, por fim, o horário de Nova York (America/New_York). Se o check-in abrir no horário errado, verifique o **Fuso horário** do campus em [Campi](../settings/campuses.md). Para remover uma programação, defina o **Dia** de volta para **Sem programação** e clique em **Salvar**. Uma programação só tem efeito quando tanto o **Dia** quanto o **Horário de início** estão definidos.

Enquanto a janela de check-in de um horário de serviço estiver fechada:

- O **autoatendimento de check-in no B1.church** lista esse horário de serviço como **Fechado** (ou, por exemplo, **Fechado · abre dom 9h30**) e ele não pode ser escolhido. Se nenhum dos horários de um culto estiver aberto, as famílias veem quando o check-in será aberto, como "O check-in abre dom 9h30".
- **O aplicativo de quiosque B1 Checkin** também exibe o horário de serviço como **Fechado**, com a informação de quando ele abre. Se todos os horários de um culto estiverem fechados, o quiosque informa quando o check-in daquele culto será aberto. Alguém que já fez check-in em um horário de serviço fechado vê o grupo dele com **Check-in feito** em vez disso. Se uma janela fechar no meio de um check-in, o quiosque não concluirá o processo e exibirá uma tela **Ainda não é possível fazer check-in** com a sala afetada, para que a família possa escolher outra.

Uma família que já fez check-in em um horário de serviço anterior ainda pode voltar e adicionar um horário de serviço posterior que esteja aberto, mesmo depois de a janela anterior ter fechado. Os check-ins que ela já tinha são mantidos.

:::tip
Defina uma janela de abertura generosa (por exemplo, 45 minutos antes do início) para que as famílias e os voluntários que chegam cedo possam fazer check-in, e uma janela de fechamento curta para que quem chega atrasado ainda possa fazer check-in depois que o culto começar.
:::

## Editando sua Configuração

Você pode atualizar sua configuração a qualquer momento. Selecione um campus, horário de serviço ou grupo e clique em **Editar** para alterar os detalhes, ou em **Excluir** para removê-lo.

:::info
Remover um horário de serviço não exclui os registros de presença passados. Seu histórico é preservado mesmo se você alterar sua programação.
:::

## Próximos Passos

Assim que seus campi, horários de serviço e grupos estiverem no lugar, você estará pronto para começar a [registrar a presença](recording-attendance.md) manualmente ou configurar o [autoatendimento de check-in](check-in.md) para seus cultos.
