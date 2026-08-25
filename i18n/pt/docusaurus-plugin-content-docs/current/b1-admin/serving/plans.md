---
title: "Planos de Serviço"
---

# Planos de Serviço

<div class="article-intro">

Planos de serviço organizam quem está servindo e quando. Cada plano está vinculado a uma data e ministério específicos, tornando fácil coordenar seus times de voluntários semana a semana e garantir que cada serviço esteja totalmente abastecido.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus ministérios e times na área de Serviço
- Certifique-se de que voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md) e atribuídos aos times

</div>

## Acessando Planos

1. Navegue para **Serving** no menu principal.
2. Selecione uma **guia de ministério** no topo da página.
3. Clique em um **tipo de plano** para ver a lista de planos para aquele tipo.
4. Clique em um plano específico para abri-lo.

:::info
Acesso de admin total não é necessário para gerenciar planos. Qualquer um que é um membro de um ministério pode navegar para Serving e criar, editar e agendar planos para seu próprio ministério sem precisar da permissão Plans Edit. Editores com a função Plans Edit podem gerenciar planos em cada ministério.
:::

## Criando um Plano

1. Da visualização do tipo de plano, clique em **New Plan**.
2. Dê um nome ao plano ou use a data como nome. Selecione a **data** para o serviço.
3. Se você gostaria de copiar de um plano anterior, escolha apenas posições ou posições e atribuições. Se você não quer copiar, apenas escolha nada. Você também pode copiar a ordem de serviço do meu plano anterior.
4. Salve o plano. Você pode agora começar a atribuir membros do time e construir a [ordem de serviço](./service-order.md).

## A Página de Detalhe do Plano

Quando você abre um plano, você verá duas guias:

- **Assignments** -- Gerencie quais membros do time estão atribuídos a este plano. Você pode adicionar pessoas de seus times existentes e ver quem confirmou ou ainda está pendente.
- **[Service Order](./service-order.md)** -- Construa a ordem de serviço com elementos como cânticos de adoração, orações, anúncios e o sermão.

## Atribuindo Membros do Time

1. Abra um plano e vá para a guia **Assignments**.
2. Clique em **add Position** para expandir. Preencha a informação no formulário add a position. Para nome de categoria adicione qualquer categoria que goste.
3. Clique em **People Needed** e escolha voluntários para preencher aquela posição.
4. Adicione membros do seu roster do time clicando em **Add**.
5. Membros atribuídos aparecerão sob seu time com seu status de atribuição.
6. Clique notify volunteers para notificá-los no aplicativo B1 ou via email.

Cada posição mostra um chip de contagem (por exemplo, "2/3") para que você possa ver quantos pontos estão preenchidos num relance. No topo da guia Assignments, uma barra de progresso e um chip de resumo ("X de Y posições preenchidas") mostram seu pessoal geral para o plano, mudando para **Fully staffed** uma vez que cada posição esteja coberta.

:::tip
Configure seus times nas configurações de ministério antes de criar planos. Desta forma, você terá um pool pronto de voluntários para atribuir.
:::

## Configurações de Plano

Cada plano tem configurações adicionais que você pode configurar clicando o ícone edit (lápis) no plano. Estas incluem:

- **Signup Deadline** — o número de horas antes do serviço quando inscrições de voluntários fecham. Digite um número negativo para manter inscrições abertas após a hora de início do serviço.
- **Show volunteer names on signup page** — quando marcado, voluntários podem ver quem mais já se inscreveu para cada posição.
- **Penciled in** — esconde atribuições de voluntários até que você esteja pronto para publicar o cronograma.
- **Automatically schedule a replacement when a volunteer declines** — quando marcado, se um voluntário atribuído declinar sua posição B1 automaticamente contata a próxima pessoa disponível na lista do time e pergunta se podem servir. Isto continua na lista até alguém aceitar, mantendo suas posições preenchidas sem acompanhamento manual.

## Lembretes de Voluntários

B1 pode automaticamente lembrar voluntários com antecedência dos serviços que estão agendados para, para que você não tenha que correr atrás de seu time cada semana. Lembretes vão para **everyone scheduled** — ambos os que confirmaram e aqueles que ainda não responderam — por email e como notificação in-app/push. Cada lembrete inclui as posição(ões) do voluntário, a data do serviço, as notas do plano e sua mensagem personalizada.

Tempo e conteúdo do lembrete são definidos por **tipo de plano**, para que cada tipo de serviço possa manter seu próprio cronograma.

1. Da área **Serving**, selecione o ministério que contém o tipo de plano.
2. Clique no **ícone edit (lápis)** próximo ao tipo de plano.
3. Na seção **Reminders**, defina:
   - **Reminder days before service** — uma lista separada por vírgula de quantos dias à frente para enviar, por exemplo `7,1,0`. Use `0` para enviar um lembrete no dia do serviço. Deixe este campo em branco para desligar lembretes para este tipo de plano.
   - **Custom reminder message** *(opcional)* — texto extra adicionado ao lembrete, como "Chegue 30 minutos cedo para ensaiar."
4. Salve o tipo de plano.

Novos tipos de plano lembram voluntários **2 dias antes** de cada serviço por padrão até você alterar isto.

:::tip
Voluntários que ainda não confirmaram conseguem botões **Accept** e **Decline** direto dentro do email de lembrete, para que possam responder sem fazer login.
:::

:::info
Cada lembrete é enviado uma vez. Planos que ainda estão lápis (não ainda enviados ao time) não acionam lembretes.
:::

## Associando Grupos com um Tipo de Plano

Abaixo da lista de plano na página tipo de plano, a seção **Groups** permite você decidir quais grupos podem ver os planos para este tipo de plano do seu portal de membro. Esta é uma maneira rápida de superficializar serviços próximos aos times certos sem dar-lhes acesso de admin.

1. Na página tipo de plano, role para baixo para a seção **Groups**.
2. Clique **Add Group** e escolha um grupo no dropdown.
3. Na coluna **Shows**, escolha se membros daquele grupo devem ver planos **Past**, **Future** ou **Both** para este tipo de plano.
4. Repita para associar grupos adicionais ou clique no ícone de lixo para remover um grupo.

:::info
Apenas grupos marcados como **Standard** aparecem no seletor. Membros de um grupo associado automaticamente veem este tipo de plano planos na página do grupo no portal de membro B1 — limitado à janela de past/future/both que você selecionou.
:::

Se os planos são aulas Lessons.church, membros do grupo associado também veem um cartão **This weeks lesson** na página do grupo (linha inferior, verso e uma pergunta para pais). Associe um grupo de pais aqui e defina o filtro para **Past** para que a lição de hoje seja incluída. Times de voluntários tipicamente usam **Future** ou **Both**.

## Imprimindo Planos

Você pode imprimir um plano para distribuição ao seu time. Abra o plano, abra a guia de ordem de serviço e use a opção **Print** para gerar uma versão imprimível que inclui atribuições e a ordem de serviço. Isto é útil para distribuir em ensaios ou postar em uma área comum.

:::info
Planos estão organizados por ministério. Certifique-se de que você está na guia de ministério correta antes de criar ou visualizar planos.
:::

## Próximas Etapas

- Use o [Plans Overview](./plans-overview.md) para ver todas as atribuições próximas em múltiplas semanas em uma grade e identificar posições não preenchidas — e atribuir voluntários direto da grade
- Salve a estrutura de um plano como um [Plan Template](./plan-templates.md) para que você possa carimbar em planos futuros em um clique
- Construa sua [Service Order](./service-order.md) com cânticos, leituras e outros elementos
- Adicione [cânticos](./songs.md) de sua biblioteca direto à ordem de serviço
- Use [Tasks](./tasks.md) para atribuir itens de ação de acompanhamento aos membros do time
- Exiba conteúdo de lição atual em uma TV do lobby com [Digital Signage](./digital-signage.md)
