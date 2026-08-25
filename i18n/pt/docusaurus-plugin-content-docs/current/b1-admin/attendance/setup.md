---
title: "Configuração de Presença"
---

# Configuração de Presença

<div class="article-intro">

Antes de poder rastrear presença, você precisa dizer ao B1 Admin sobre as localizações físicas de sua igreja, quando os serviços acontecem e quais grupos se reúnem em cada serviço. Esta configuração única cria a estrutura que alimenta todo o rastreamento e relatório de presença em sua igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com permissão para gerenciar presença. Consulte [Funções e Permissões](../people/roles-permissions.md) se não tiver certeza sobre seu nível de acesso.
- Se você planeja atribuir grupos a horários de serviço, certifique-se de que seus [grupos estão criados](../groups/creating-groups.md) primeiro.

</div>

## Conceitos-Chave

- **Campus** - uma localização física onde sua igreja se reúne (por exemplo, "Campus Principal", "Campus Norte"). Os campi são gerenciados em **Configurações**.
- **Serviço** - um encontro recorrente em um campus (por exemplo, "Serviço de Domingo", "Semana").
- **Horário do Serviço** - um horário específico que um serviço acontece (por exemplo, "9:00 AM", "11:00 AM").
- **Grupo Agendado** - um grupo atribuído a um horário de serviço específico. A presença é rastreada no contexto daquele serviço.
- **Grupo Não Agendado** - um grupo que rastreia presença por conta própria, sem estar vinculado a um horário de serviço.

## Configurando Sua Estrutura de Presença

1. Abra **B1 Admin**, clique no **menu de seção** no canto superior esquerdo (o nome da seção com a seta pequena) e escolha **Pessoas**.
2. Na barra de navegação, clique na guia **Presença**. A guia **Configuração** é selecionada por padrão.
3. Clique em **Gerenciar Campi** (canto superior direito do painel Configuração). Isto o leva a **Configurações → Campi**. Clique em **Adicionar Campus**, digite o nome de sua localização (endereço e fuso horário são opcionais) e clique em **Salvar**.
4. Retorne a **Pessoas → Presença → Configuração**. Seu campus agora aparece na tabela de configuração.
5. Clique no **botão + na coluna Serviço** sob seu campus. Digite um nome de serviço como "Serviço de Domingo" e clique em **Salvar**.
6. Clique no **botão + na coluna Hora** sob o serviço. Digite uma hora como "9:00 AM" e clique em **Salvar**. Repita para cada horário de serviço.
7. Para conectar um grupo a um horário de serviço, abra o grupo na guia **Grupos**, clique no lápis **Editar** e use **Adicionar Horário do Serviço** — veja a próxima seção.

### Ativando Rastrear Presença em um Grupo

Antes de um grupo poder ter presença registrada, Rastrear Presença deve estar ligado para esse grupo.

1. Abra o **menu de seção** no canto superior esquerdo e escolha **Pessoas**, depois clique na guia **Grupos** e selecione o grupo.
2. Clique no ícone do lápis **Editar**.
3. Defina **Rastrear Presença** como **Sim**.
4. Clique em **Salvar**.

:::tip
Se você atribuiu o grupo a um horário de serviço na etapa anterior, também use a opção **Adicionar Horário do Serviço** na tela de edição do grupo para vinculá-lo ao serviço correto. Isto garante que as sessões estejam conectadas ao campus e hora corretos.
:::

:::tip
Se um grupo se reúne fora de um serviço regular - como um pequeno grupo entre semana que rastreia sua própria presença - você pode deixá-lo como um grupo não agendado. Ele ainda aparecerá na guia Grupos para relatório de presença.
:::

## Editando Sua Configuração

Você pode atualizar sua configuração a qualquer momento. Selecione um campus, horário de serviço ou grupo e clique em **Editar** para alterar seus detalhes ou **Deletar** para removê-lo.

:::info
Remover um horário de serviço não deleta registros de presença passados. Seus dados históricos são preservados mesmo se você alterar seu cronograma.
:::

## O Que Vem a Seguir

Quando seus campi, horários de serviço e grupos estiverem em vigor, você está pronto para começar a [registrar presença](recording-attendance.md) manualmente ou configurar [check-in automático](check-in.md) para seus serviços.
