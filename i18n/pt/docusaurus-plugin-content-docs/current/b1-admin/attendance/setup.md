---
title: "Configuração de Presença"
---

# Configuração de Presença

<div class="article-intro">

Antes de poder rastrear a presença, você precisa informar ao B1 Admin sobre os locais físicos de sua igreja, quando os serviços acontecem e quais grupos se reúnem em cada serviço. Esta configuração única cria a estrutura que alimenta todo o rastreamento e relatório de presença em toda a sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para gerenciar presença. Veja [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se você planeja atribuir grupos a horários de serviço, certifique-se de que seus [grupos estão criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos-Chave

- **Campus** -- um local físico onde sua igreja se reúne (por exemplo, "Campus Principal", "Campus Norte"). Os campi são gerenciados em **Settings**.
- **Serviço** -- uma reunião recorrente em um campus (por exemplo, "Culto de Domingo", "Meio da Semana").
- **Horário de Serviço** -- um horário específico em que um serviço acontece (por exemplo, "9:00 AM", "11:00 AM").
- **Grupo Programado** -- um grupo atribuído a um horário de serviço específico. A presença é rastreada no contexto desse serviço.
- **Grupo Não Programado** -- um grupo que rastreia presença por conta própria, sem estar vinculado a um horário de serviço.

## Configurando Sua Estrutura de Presença

1. Abra **B1 Admin**, clique no **menu de seções** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **People**.
2. Na barra de navegação, clique na aba **Attendance**. A aba **Setup** é selecionada por padrão.
3. Clique em **Manage Campuses** (no canto superior direito do painel Setup). Isso leva você para **Settings → Campuses**. Clique em **Add Campus**, insira o nome de seu local (endereço e fuso horário são opcionais) e clique em **Save**.
4. Retorne para **People → Attendance → Setup**. Seu campus agora aparece na tabela de configuração.
5. Clique no **botão + na coluna Service** abaixo de seu campus. Insira um nome de serviço como "Sunday Service" e clique em **Save**.
6. Clique no **botão + na coluna Time** abaixo do serviço. Insira um horário como "9:00 AM" e clique em **Save**. Repita para cada horário de serviço.
7. Para conectar um grupo a um horário de serviço, abra o grupo pela aba **Groups**, clique no lápis **Edit** e use **Add Service Time** — veja a próxima seção.

### Habilitando Rastreamento de Presença em um Grupo

Antes de um grupo poder ter presença registrada, Rastreamento de Presença deve ser ativado para aquele grupo.

1. Clique em **Groups** na barra lateral e selecione o grupo.
2. Clique no ícone de lápis **Edit**.
3. Defina **Track Attendance** para **Yes**.
4. Clique em **Save**.

:::tip
Se você atribuiu o grupo a um horário de serviço na etapa anterior, também use a opção **Add Service Time** na tela de edição do grupo para vinculá-lo ao serviço correto. Isso garante que as sessões estejam conectadas ao campus e hora corretos.
:::

:::tip
Se um grupo se reúne fora de um serviço regular -- como um pequeno grupo de meio de semana que rastreia sua própria presença -- você pode deixá-lo como um grupo não programado. Ele ainda aparecerá na aba Groups para relatórios de presença.
:::

## Editando Sua Configuração

Você pode atualizar sua configuração a qualquer momento. Selecione um campus, horário de serviço ou grupo e clique em **Edit** para alterar seus detalhes, ou **Delete** para removê-lo.

:::info
Remover um horário de serviço não exclui registros de presença anteriores. Seus dados históricos são preservados mesmo que você mude sua programação.
:::

## O Que Vem Depois

Uma vez que seus campi, horários de serviço e grupos estejam em vigor, você está pronto para começar [registrando presença](recording-attendance.md) manualmente ou configurar [auto check-in](check-in.md) para seus serviços.
