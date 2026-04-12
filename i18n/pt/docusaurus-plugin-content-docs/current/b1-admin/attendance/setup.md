---
title: "Configuração de Presença"
---

# Configuração de Presença

<div class="article-intro">

Antes de poder acompanhar a presença, você precisa informar ao B1 Admin sobre as localizações físicas da sua igreja, quando os cultos acontecem e quais grupos se reúnem em cada culto. Esta configuração única cria a estrutura que alimenta todo o acompanhamento e relatórios de presença da sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com permissão para gerenciar presença. Consulte [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se planeja atribuir grupos a horários de culto, certifique-se de que seus [grupos estejam criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos Principais

- **Campus** -- uma localização física onde sua igreja se reúne (ex.: "Campus Principal", "Campus Norte").
- **Horário de Culto** -- uma reunião recorrente em um campus (ex.: "Domingo 9:00", "Quarta 19:00").
- **Grupo Programado** -- um grupo atribuído a um horário de culto específico. A presença é acompanhada no contexto desse culto.
- **Grupo Não Programado** -- um grupo que acompanha a presença por conta própria, sem estar vinculado a um horário de culto.

## Configurando Sua Estrutura de Presença

1. Abra o **B1 Admin** e clique em **Presença** na barra lateral.
2. Selecione a aba **Configuração**.
3. Clique em **Adicionar Campus** e insira o nome da sua localização. Clique em **Salvar**.
4. Com seu campus selecionado, clique em **Adicionar Horário de Culto**. Insira um nome como "Domingo 9:00" e clique em **Salvar**.
5. Repita para cada horário de culto nesse campus.
6. Para atribuir um grupo a um horário de culto, selecione o horário de culto e clique em **Adicionar Grupo**. Escolha o grupo na lista e clique em **Salvar**.

### Ativando o Acompanhamento de Presença em um Grupo

Antes de um grupo poder ter presença registrada, o Acompanhamento de Presença deve ser ativado para esse grupo.

1. Clique em **Grupos** na barra lateral e selecione o grupo.
2. Clique no ícone de **Editar** (lápis).
3. Defina **Acompanhar Presença** como **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de culto na etapa anterior, use também a opção **Adicionar Horário de Culto** na tela de edição do grupo para vinculá-lo ao culto correto. Isso garante que as sessões sejam conectadas ao campus e horário corretos.
:::

:::tip
Se um grupo se reúne fora de um culto regular -- como um pequeno grupo no meio da semana que acompanha sua própria presença -- você pode deixá-lo como um grupo não programado. Ele ainda aparecerá na aba de Grupos para relatórios de presença.
:::

## Editando Sua Configuração

Você pode atualizar sua configuração a qualquer momento. Selecione um campus, horário de culto ou grupo e clique em **Editar** para alterar seus detalhes, ou **Excluir** para removê-lo.

:::info
Remover um horário de culto não exclui registros de presença anteriores. Seus dados históricos são preservados mesmo se você alterar sua programação.
:::

## Próximos Passos

Uma vez que seus campi, horários de culto e grupos estejam configurados, você está pronto para começar a [registrar a presença](recording-attendance.md) manualmente ou configurar o [check-in autônomo](check-in.md) para seus cultos.
