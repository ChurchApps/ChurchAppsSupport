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
2. Clique em **Presença**. A aba **Configuração** é selecionada por padrão.
3. Clique em **Gerenciar Campi** (canto superior direito do painel Configuração). Isso o leva para **Configurações → Campi**. Clique em **Adicionar Campus**, digite o nome de sua localização (endereço e fuso horário são opcionais), e clique em **Salvar**.
4. Retorne para **Pessoas → Presença → Configuração**. Seu campus agora aparece na tabela de configuração.
5. Clique no **+ botão na coluna Serviço** sob seu campus. Digite um nome de serviço tal como "Serviço de Domingo" e clique em **Salvar**.
6. Clique no **+ botão na coluna Hora** sob o serviço. Digite uma hora tal como "9:00 AM" e clique em **Salvar**. Repita para cada horário de serviço.
7. Para conectar um grupo a um horário de serviço, abra o grupo de **Pessoas > Grupos**, clique no lápis **Editar**, e use **Adicionar Horário de Serviço** — veja a próxima seção.

### Habilitando Rastrear Presença em um Grupo

Antes que um grupo possa ter presença registrada, Rastrear Presença deve ser ligado para aquele grupo.

1. No menu Jump, escolha **Pessoas > Grupos** e selecione o grupo.
2. Clique no ícone de lápis **Editar**.
3. Defina **Rastrear Presença** para **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de serviço na seção anterior, também use a opção **Adicionar Horário de Serviço** na tela de edição do grupo para ligá-lo ao serviço correto. Isso garante que as sessões estejam conectadas ao campus e hora corretos.
:::

:::tip
Se um grupo se reúne fora de um serviço regular -- como um pequeno grupo de midweek que rastreia sua própria presença -- você pode deixá-lo como um grupo não agendado. Ele ainda aparecerá na aba Grupos para relatório de presença.
:::

## Editando Sua Configuração

Você pode atualizar sua configuração a qualquer hora. Selecione um campus, horário de serviço ou grupo e clique em **Editar** para mudar seus detalhes, ou **Deletar** para removê-lo.

:::info
Remover um horário de serviço não deleta registros de presença passados. Seus dados históricos são preservados mesmo se você mudar seu cronograma.
:::

## O Que Vem Depois

Uma vez que seus campi, horários de serviço e grupos estão em vigor, você está pronto para começar a [registrar presença](recording-attendance.md) manualmente ou configurar [check-in automático](check-in.md) para seus serviços.
