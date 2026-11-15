---
title: "Configuração de Presença"
description: "Configure unidades, cultos, horários de culto e atribuições de grupos no B1 Admin para que o acompanhamento de presença e os horários de check-in funcionem em toda a sua igreja."
---

# Configuração de Presença

<div class="article-intro">

Antes de acompanhar a presença, você precisa informar ao B1 Admin os locais físicos da sua igreja, os horários em que os cultos acontecem e quais grupos se reúnem em cada culto. Essa configuração única cria a estrutura que sustenta todo o acompanhamento e os relatórios de presença da sua igreja.

</div>

## Vídeo de Treinamento {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Configurando Cultos e Presença no B1" next="Configurando o Check-in Infantil no B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com a permissão de presença **Editar Cultos**. A opção **Configuração** só aparece para quem tem essa permissão; apenas visualizar a presença não é suficiente. Veja [Funções e Permissões](../people/roles-permissions.md) se tiver dúvidas sobre o seu nível de acesso.
- Se você pretende atribuir grupos aos horários de culto, certifique-se de que seus [grupos estejam criados](../groups/creating-groups.md) antes.

</div>

## Conceitos-Chave {#key-concepts}

- **Unidade** -- um local físico onde a sua igreja se reúne (por exemplo, "Unidade Central", "Unidade Norte"). As unidades são gerenciadas em **Configurações**.
- **Culto** -- um encontro recorrente em uma unidade (por exemplo, "Culto de Domingo", "Culto de Meio de Semana").
- **Horário de Culto** -- um horário específico em que um culto acontece (por exemplo, "9:00", "11:00").
- **Grupo Agendado** -- um grupo atribuído a um horário de culto específico. A presença é acompanhada no contexto desse culto.
- **Grupo Não Agendado** -- um grupo que acompanha a presença por conta própria, sem estar vinculado a um horário de culto.

## Configurando a Estrutura de Presença {#setting-up-your-attendance-structure}

1. Abra o **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Pessoas**.
2. Clique em **Presença** e, em seguida, em **Configuração** na coluna da esquerda. A tabela **Estrutura de cultos** é aberta, com as contagens de unidades, horários de culto, grupos agendados e não agendados e o total de grupos no topo. As contagens são atualizadas assim que você adiciona, edita ou remove algo na tabela. Cada unidade lista os seus cultos, os horários e os grupos atribuídos a cada horário, agrupados por categoria (uma equipe de serviço aparece sob o nome do seu ministério). Os grupos que acompanham a presença, mas não têm horário de culto, aparecem na parte inferior, em **Não atribuídos**.
3. Clique em **Gerenciar unidades** (no canto superior direito do painel **Estrutura de cultos**). Isso leva você a **Configurações → Unidades**. Clique em **Adicionar unidade**, informe o nome do seu local (endereço e fuso horário são opcionais) e clique em **Salvar**.
4. Volte para **Pessoas → Presença** e clique em **Configuração**. Sua unidade agora aparece na tabela de configuração.
5. Clique no **botão + na coluna Culto** sob a sua unidade. Informe um nome de culto, como "Culto de Domingo", e clique em **Salvar**.
6. Clique no **botão + na coluna Horário** sob o culto. Informe um nome de **Horário de Culto**, como "9:00", opcionalmente preencha o [horário de check-in](#setting-a-check-in-schedule) e clique em **Salvar**. Repita para cada horário de culto.
7. Para vincular um grupo a um horário de culto, abra o grupo em **Pessoas > Grupos**, clique em **Editar** e use **Adicionar horário de culto** -- veja a próxima seção.

### Ativando o Controle de Presença em um Grupo {#enabling-track-attendance-on-a-group}

Antes que um grupo possa ter a presença registrada, o Controle de Presença precisa estar ativado para esse grupo.

1. No menu Jump, escolha **Pessoas > Grupos** e selecione o grupo.
2. Clique no botão **Editar** abaixo do nome do grupo.
3. Defina **Controlar presença** como **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de culto na etapa anterior, use também a opção **Adicionar horário de culto** na tela de edição do grupo para vinculá-lo ao culto correto. Isso garante que as sessões fiquem conectadas à unidade e ao horário certos.
:::

:::tip
Se um grupo se reúne fora de um culto regular -- como um pequeno grupo de meio de semana que controla a própria presença -- você pode mantê-lo como grupo não agendado. Ele continuará aparecendo no relatório **Presença por Grupo** para fins de relatórios de presença.
:::

## Configurando um Horário de Check-in {#setting-a-check-in-schedule}

Cada horário de culto pode ter um horário de check-in opcional, para que o [autoatendimento](check-in.md) abra e feche sozinho a cada semana. Sem um horário, o check-in desse horário de culto fica disponível o tempo todo (desde que a sala não esteja fechada por outros motivos, como estar lotada).

1. Na visão **Configuração**, clique no nome de um horário de culto na coluna **Horário** (ou adicione um novo).
2. Em **Horário de check-in**, escolha o **Dia** da semana em que o horário de culto acontece.
3. Defina a **Hora de início** e, opcionalmente, a **Hora de término**.
4. Informe **Abrir check-in (minutos antes do início)** -- por exemplo, `30` abre o check-in meia hora antes do início do culto.
5. Informe **Fechar check-in (minutos após o término)** -- por exemplo, `15` mantém o check-in aberto por 15 minutos depois do horário de término. Se você não definiu um horário de término, isso é contado a partir da hora de início. Se deixar em branco a **Hora de término** e o **Fechar check-in**, o check-in permanece aberto até o fim daquele dia.
6. Clique em **Salvar**.

O horário se repete todas as semanas e é medido no fuso horário da unidade do culto. Se essa unidade não tiver um fuso horário, é usado o [Fuso horário](../settings/church-settings.md#time-zone) da sua igreja; depois, o fuso horário da sua primeira unidade que tiver um definido; e, por fim, o horário de Nova York (America/New_York). Se o check-in abrir no horário errado, verifique o **Fuso horário** da unidade em [Unidades](../settings/campuses.md). Para remover um horário, defina o **Dia** de volta para **Sem horário** e clique em **Salvar**. Um horário só entra em vigor quando tanto o **Dia** quanto a **Hora de início** estiverem definidos.

Enquanto a janela de check-in de um horário de culto estiver fechada:

- O **autoatendimento no B1.church** lista esse horário de culto como **Fechado** (ou, por exemplo, **Fechado · abre dom 9:30**) e ele não pode ser selecionado. Se nenhum dos horários de um culto estiver aberto, as famílias veem quando o check-in abrirá, como "O check-in abre dom 9:30".
- **O aplicativo de quiosque B1 Checkin** também mostra o horário de culto como **Fechado**, com a informação de quando ele abre. Se todos os horários de um culto estiverem fechados, o quiosque informa quando o check-in desse culto será aberto. Quem já fez check-in em um horário de culto fechado vê o grupo com **Check-in feito** no lugar. Se uma janela fechar durante um check-in, o quiosque não concluirá a operação e exibirá a tela **Não é possível fazer check-in ainda**, listando a sala afetada para que a família escolha outra.

Uma família que já fez check-in em um horário de culto anterior ainda pode voltar e adicionar um horário posterior que esteja aberto, mesmo depois que a janela anterior tiver fechado. Os check-ins já feitos são mantidos.

:::tip
Defina uma janela de abertura generosa (por exemplo, 45 minutos antes do início) para que famílias e voluntários que chegam cedo possam fazer o check-in, e uma janela de fechamento curta para que quem chegar atrasado ainda possa fazer o check-in depois que o culto começar.
:::

## Editando a Sua Configuração {#editing-your-setup}

Você pode atualizar a sua configuração a qualquer momento:

- **Cultos e horários de culto** -- clique no nome de um culto ou horário de culto na tabela para abrir o formulário. Altere os dados e clique em **Salvar**, ou clique em **Excluir** para removê-lo.
- **Unidades** -- clique em **Gerenciar unidades** para adicionar, renomear ou remover unidades em **Configurações**.
- **Grupos** -- clique no nome de um grupo para abri-lo e, em seguida, clique em **Editar** para alterar os horários de culto dele ou ativar ou desativar o **Controlar presença**.

O botão **Check-in por quiosque, QR e etiquetas** no topo da tabela leva você às [configurações do B1 CheckIn](check-in.md).

:::info
Remover um horário de culto não exclui os registros de presença anteriores. Seus dados históricos são preservados mesmo que você altere a sua agenda.
:::

## Próximos Passos {#whats-next}

Quando suas unidades, horários de culto e grupos estiverem configurados, você estará pronto para começar a [registrar a presença](recording-attendance.md) manualmente ou configurar o [autoatendimento](check-in.md) nos seus cultos.
