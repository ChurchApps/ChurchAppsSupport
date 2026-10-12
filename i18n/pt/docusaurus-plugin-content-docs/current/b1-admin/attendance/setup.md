---
title: "Configuração de Presença"
---

# Configuração de Presença

<div class="article-intro">

Antes que você possa rastrear presença, você precisa contar ao B1 Admin sobre as localizações físicas da sua igreja, quando serviços acontecem, e quais grupos se reúnem em cada serviço. Esta configuração única cria a estrutura que alimenta todo rastreamento de presença e relatório em sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa do B1 Admin com permissão para gerenciar presença. Veja [Funções e Permissões](../people/roles-permissions.md) se você tem certeza sobre seu nível de acesso.
- Se você planeja atribuir grupos a horários de serviço, certifique-se de que seus [grupos estão criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos-Chave

- **Campus** -- um local físico onde sua igreja se reúne (por exemplo, "Campus Principal", "Campus Norte"). Campi são gerenciados em **Configurações**.
- **Serviço** -- uma reunião recorrente em um campus (por exemplo, "Serviço de Domingo", "Midweek").
- **Horário de Serviço** -- um tempo específico um serviço acontece (por exemplo, "9:00 AM", "11:00 AM").
- **Grupo Agendado** -- um grupo atribuído a um horário de serviço específico. A presença é rastreada no contexto daquele serviço.
- **Grupo Não Agendado** -- um grupo que rastreia presença por sua conta, sem ser ligado a um horário de serviço.

## Configurando Sua Estrutura de Presença

1. Abra **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), e expanda **Pessoas**.
2. Clique em **Presença**, depois clique em **Configuração** na coluna da esquerda. A tabela **Estrutura de serviço** abre, com contagens dos seus campi, horários de serviço e grupos agendados e não agendados no topo.
3. Clique em **Gerenciar Campi** (canto superior direito do painel **Estrutura de serviço**). Isso o leva para **Configurações → Campi**. Clique em **Adicionar Campus**, digite o nome de sua localização (endereço e fuso horário são opcionais), e clique em **Salvar**.
4. Retorne para **Pessoas → Presença** e clique em **Configuração**. Seu campus agora aparece na tabela de configuração.
5. Clique no **+ botão na coluna Serviço** sob seu campus. Digite um nome de serviço tal como "Serviço de Domingo" e clique em **Salvar**.
6. Clique no **+ botão na coluna Hora** sob o serviço. Digite um **Nome do Horário de Serviço** tal como "9:00 AM", opcionalmente preencha o [cronograma de check-in](#setting-a-check-in-schedule), e clique em **Salvar**. Repita para cada horário de serviço.
7. Para conectar um grupo a um horário de serviço, abra o grupo de **Pessoas > Grupos**, clique em **Editar**, e use **Adicionar Horário de Serviço** — veja a próxima seção.

### Habilitando Rastrear Presença em um Grupo

Antes que um grupo possa ter presença registrada, Rastrear Presença deve ser ligado para aquele grupo.

1. No menu Jump, escolha **Pessoas > Grupos** e selecione o grupo.
2. Clique no botão **Editar** abaixo do nome do grupo.
3. Defina **Rastrear Presença** para **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de serviço na seção anterior, também use a opção **Adicionar Horário de Serviço** na tela de edição do grupo para ligá-lo ao serviço correto. Isso garante que as sessões estejam conectadas ao campus e hora corretos.
:::

:::tip
Se um grupo se reúne fora de um serviço regular -- como um pequeno grupo de midweek que rastreia sua própria presença -- você pode deixá-lo como um grupo não agendado. Ele ainda aparecerá no relatório **Presença do Grupo** para relatórios de presença.
:::

## Configurando um Cronograma de Check-in {#setting-a-check-in-schedule}

Cada horário de serviço pode ter um cronograma de check-in opcional, para que o [check-in self-service](check-in.md) abra e feche sozinho toda semana. Sem um cronograma, o check-in para esse horário de serviço fica disponível a qualquer momento (desde que a sala não esteja fechada por outros motivos, como estar lotada).

1. Na visão **Configuração**, clique no nome de um horário de serviço na coluna **Hora** (ou adicione um novo).
2. Em **Cronograma de Check-in**, escolha o **Dia** da semana em que o horário de serviço acontece.
3. Defina o **Horário de Início** e, opcionalmente, o **Horário de Término**.
4. Digite **Abrir check-in (minutos antes do início)** -- por exemplo, `30` abre o check-in meia hora antes do início do serviço.
5. Digite **Fechar check-in (minutos após o término)** -- por exemplo, `15` mantém o check-in aberto por 15 minutos após o horário de término. Se você não definiu um horário de término, isso é contado a partir do horário de início.
6. Clique em **Salvar**.

O cronograma usa o horário local da sua igreja e se repete toda semana. Para remover um cronograma, defina o **Dia** de volta para **Sem cronograma** e clique em **Salvar**. Um cronograma só tem efeito quando tanto um **Dia** quanto um **Horário de Início** estão definidos.

Enquanto a janela de check-in de um horário de serviço estiver fechada:

- O **check-in self-service no B1.church** oculta esse horário de serviço. Se nenhum dos horários de um serviço estiver aberto, as famílias veem "O check-in não está aberto para este serviço no momento."
- O **aplicativo de quiosque B1 Checkin** não concluirá um check-in nos grupos desse horário de serviço; o quiosque mostra uma tela **Não é possível fazer check-in ainda** listando a sala afetada, para que a família possa escolher outra.

:::tip
Defina uma janela de abertura generosa (por exemplo, 45 minutos antes do início) para que famílias e voluntários que chegam cedo possam fazer check-in, e uma janela de fechamento curta para que quem chega atrasado ainda possa fazer check-in depois que o serviço começar.
:::

## Editando Sua Configuração

Você pode atualizar sua configuração a qualquer hora. Selecione um campus, horário de serviço ou grupo e clique em **Editar** para mudar seus detalhes, ou **Deletar** para removê-lo.

:::info
Remover um horário de serviço não deleta registros de presença passados. Seus dados históricos são preservados mesmo se você mudar seu cronograma.
:::

## O Que Vem Depois

Uma vez que seus campi, horários de serviço e grupos estão em vigor, você está pronto para começar a [registrar presença](recording-attendance.md) manualmente ou configurar [check-in automático](check-in.md) para seus serviços.
