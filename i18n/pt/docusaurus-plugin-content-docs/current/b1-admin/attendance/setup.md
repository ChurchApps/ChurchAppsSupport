---
title: "Configuração de Presença"
---

# Configuração de Presença

<div class="article-intro">

Antes de rastrear a presença, você precisa informar o B1 Admin sobre os locais físicos da sua igreja, quando os serviços acontecem e quais grupos se reúnem em cada serviço. Esta configuração única cria a estrutura que alimenta todo o rastreamento e relatório de presença em toda a sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para gerenciar presença. Consulte [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se você planeja atribuir grupos a horários de serviço, certifique-se de que seus [grupos sejam criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos-Chave

- **Campus** -- um local físico onde sua igreja se reúne (por exemplo, "Campus Principal", "Campus Norte"). Os campi são gerenciados em **Configurações**.
- **Serviço** -- um encontro recorrente em um campus (por exemplo, "Serviço de Domingo", "Meio de Semana").
- **Horário de Serviço** -- uma hora específica em que um serviço acontece (por exemplo, "9:00", "11:00").
- **Grupo Agendado** -- um grupo atribuído a um horário de serviço específico. A presença é rastreada no contexto desse serviço.
- **Grupo Não Agendado** -- um grupo que rastreia presença por conta própria, sem estar vinculado a um horário de serviço.

## Configurando Sua Estrutura de Presença

1. Abra **B1 Admin**, clique no **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Pessoas**.
2. Na barra de navegação, clique na aba **Presença**. A aba **Configuração** é selecionada por padrão.
3. Clique em **Gerenciar Campi** (canto superior direito do painel Configuração). Isso o leva para **Configurações → Campi**. Clique em **Adicionar Campus**, insira o nome do seu local (endereço e fuso horário são opcionais) e clique em **Salvar**.
4. Retorne para **Pessoas → Presença → Configuração**. Seu campus agora aparece na tabela de configuração.
5. Clique no **botão + na coluna Serviço** sob seu campus. Insira um nome de serviço como "Serviço de Domingo" e clique em **Salvar**.
6. Clique no **botão + na coluna Horário** sob o serviço. Insira um horário como "9:00" e clique em **Salvar**. Repita para cada horário de serviço.
7. Para conectar um grupo a um horário de serviço, abra o grupo na aba **Grupos**, clique no lápis **Editar** e use **Adicionar Horário de Serviço** — veja a próxima seção.

### Ativando Rastreamento de Presença em um Grupo

Antes de a presença poder ser registrada para um grupo, Rastreamento de Presença deve ser ativado para esse grupo.

1. Clique em **Grupos** na barra lateral e selecione o grupo.
2. Clique no ícone de lápis **Editar**.
3. Defina **Rastreamento de Presença** como **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de serviço na etapa anterior, também use a opção **Adicionar Horário de Serviço** na tela de edição do grupo para vinculá-lo ao serviço correto. Isso garante que as sessões estejam conectadas ao campus e hora corretos.
:::

:::tip
Se um grupo se reúne fora de um serviço regular -- como um pequeno grupo de meio de semana que rastreia sua própria presença -- você pode deixá-lo como um grupo não agendado. Ele ainda aparecerá na aba Grupos para relatório de presença.
:::

## Editando Sua Configuração

Você pode atualizar sua configuração a qualquer momento. Selecione um campus, horário de serviço ou grupo e clique em **Editar** para alterar seus detalhes ou **Deletar** para removê-lo.

:::info
Remover um horário de serviço não exclui registros de presença anteriores. Seus dados históricos são preservados mesmo se você alterar sua agenda.
:::

## Próximos Passos

Depois que seus campi, horários de serviço e grupos estiverem no lugar, você está pronto para começar a [registrar presença](recording-attendance.md) manualmente ou configurar [auto check-in](check-in.md) para seus serviços.
