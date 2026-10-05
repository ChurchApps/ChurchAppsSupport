---
title: "Planos de Serviço"
---

# Planos de Serviço

<div class="article-intro">

Planos de serviço organizam quem está servindo e quando. Cada plano está vinculado a uma data específica e ministério, facilitando coordenar suas equipes de voluntários semana a semana e garantir que cada serviço esteja totalmente equipado.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure seus ministérios e equipes na área Servindo
- Certifique-se de que os voluntários foram adicionados ao seu [diretório de pessoas](../people/adding-people.md) e atribuídos a equipes

</div>

## Acessando Planos

1. Em B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Servindo** e clique em **Planos**.
2. Selecione uma **aba de ministério** no topo da página.
3. Clique em um **tipo de plano** para ver a lista de planos para esse tipo.
4. Clique em um plano específico para abri-lo.

:::info
Acesso de administrador completo não é necessário para gerenciar planos. Qualquer pessoa que seja membro de um ministério pode navegar para Servindo e criar, editar e agendar planos para seu próprio ministério sem precisar da permissão de Edição de Planos. Editores com o papel de Edição de Planos podem gerenciar planos em cada ministério.
:::

## Criando um Plano

1. Na visualização do tipo de plano, clique em **Novo Plano**.
2. Dê ao plano um nome ou use a data como nome. Selecione a **data** para o serviço.
3. Se você gostaria de copiar de um plano anterior, escolha apenas posições ou posições e atribuições. Se você não quer copiar, basta não escolher nada. Você também pode copiar a ordem de serviço do meu plano anterior.
4. Salve o plano. Você pode agora começar a atribuir membros da equipe e construir a [ordem de serviço](./service-order.md).

## A Página de Detalhes do Plano

Quando você abre um plano, verá duas abas:

- **Atribuições** -- Gerencie quais membros da equipe estão atribuídos a este plano. Você pode adicionar pessoas de suas equipes existentes e ver quem confirmou ou ainda está pendente.
- **[Ordem de Serviço](./service-order.md)** -- Construa a ordem de serviço com elementos como músicas de adoração, orações, anúncios e o sermão.

## Atribuindo Membros da Equipe

1. Abra um plano e vá para a aba **Atribuições**.
2. Clique em **adicionar Posição** para expandir. Preencha as informações no formulário de adição de posição. Para o nome da categoria adicione qualquer categoria que você goste. Para permitir que qualquer pessoa em sua igreja preencha a posição (não apenas membros de uma equipe), deixe o **Grupo de Voluntários** definido como **Nenhum**.
3. Clique em **Pessoas Necessárias** e escolha voluntários para preencher essa posição. Se a posição tiver um **Grupo de Voluntários**, você escolhe entre os membros desse grupo. Se seu Grupo de Voluntários está definido como **Nenhum**, você pode procurar por qualquer pessoa em sua igreja.
4. Adicione membros do seu escalão da equipe clicando em **Adicionar**.
5. Membros atribuídos aparecerão em sua equipe com seu status de atribuição.
6. Clique em notificar voluntários para notificá-los dentro do aplicativo B1 ou via email.

Cada posição mostra um chip de contagem (por exemplo, "2/3") para que você possa ver quantos spots estão preenchidos de relance. No topo da aba Atribuições, uma barra de progresso e um chip de resumo ("X de Y posições preenchidas") mostram seu pessoal geral para o plano, alternando para **Totalmente equipado** uma vez que cada posição está coberta.

:::tip
Configure suas equipes nas configurações de ministério antes de criar planos. Dessa forma, você terá um pool pronto de voluntários para atribuir.
:::

## Configurações de Plano

Cada plano tem configurações adicionais que você pode configurar clicando no ícone de edição (lápis) no plano. Estas incluem:

- **Prazo de Inscrição** -- o número de horas antes do serviço quando as inscrições de voluntários fecham. Digite um número negativo para manter as inscrições abertas após o horário de início do serviço.
- **Mostrar nomes de voluntários na página de inscrição** -- quando marcado, os voluntários podem ver quem mais já se inscreveu para cada posição.
- **Esboçado** -- oculta atribuições dos voluntários até você estar pronto para publicar o cronograma.
- **Agendar automaticamente um substituto quando um voluntário recusa** -- quando marcado, se um voluntário atribuído recusar sua posição B1 entrará em contato automaticamente com a próxima pessoa disponível no escalão da equipe e perguntará se eles podem servir. Isso continua descendo a lista até que alguém aceite, mantendo suas posições preenchidas sem acompanhamento manual.

## Lembretes de Voluntários

B1 pode lembrar automaticamente voluntários antes dos serviços em que estão agendados, para que você não tenha que perseguir sua equipe cada semana. Lembretes vão para **todos agendados** -- tanto aqueles que confirmaram quanto aqueles que ainda não responderam -- por email e como uma notificação no aplicativo/push. Cada lembrete inclui a(s) posição(ões) do voluntário, a data do serviço, as notas do plano e sua mensagem personalizada.

Tempo e conteúdo de lembrete são definidos por **tipo de plano**, para que cada tipo de serviço possa manter seu próprio cronograma.

1. Da área **Servindo**, selecione o ministério que contém o tipo de plano.
2. Clique no **ícone de edição (lápis)** ao lado do tipo de plano.
3. Na seção **Lembretes**, defina:
   - **Dias de lembrete antes do serviço** -- uma lista separada por vírgulas de quantos dias antes enviar, por exemplo `7,1,0`. Use `0` para enviar um lembrete no dia do serviço. Deixe este campo em branco para desativar lembretes para este tipo de plano.
   - **Mensagem de lembrete personalizada** *(opcional)* -- texto extra adicionado ao lembrete, como "Chegue 30 minutos mais cedo para ensaiar".
4. Salve o tipo de plano.

Novos tipos de plano lembretes de voluntários **2 dias antes** cada serviço por padrão até você mudar isso.

:::tip
Voluntários que ainda não confirmaram recebem botões **Aceitar** e **Recusar** dentro do email de lembrete, para que possam responder sem fazer login.
:::

:::info
Cada lembrete é enviado uma vez. Planos que ainda estão esboçados (ainda não enviados para a equipe) não acionam lembretes.
:::

## Associando Grupos a um Tipo de Plano

Abaixo da lista de planos na página de tipo de plano, a seção **Grupos** permite que você decida quais grupos podem ver os planos para este tipo de plano do portal de membros. Esta é uma maneira rápida de mostrar serviços futuros para as equipes certas sem dar-lhes acesso de administrador.

1. Na página de tipo de plano, role para baixo até a seção **Grupos**.
2. Clique em **Adicionar Grupo** e escolha um grupo na lista suspensa.
3. Na coluna **Mostra**, escolha se os membros desse grupo devem ver **Passados**, **Futuros** ou **Ambos** planos para este tipo de plano.
4. Repita para associar grupos adicionais, ou clique no ícone de lixo para remover um grupo.

:::info
Apenas grupos marcados como **Padrão** aparecem no seletor. Membros de um grupo associado veem automaticamente os planos deste tipo de plano na página do grupo no portal de membros B1 -- limitado à janela passado/futuro/ambos que você selecionou.
:::

Se os planos são aulas de Lessons.church, membros do grupo associado também veem um cartão **Aula desta semana** na página do grupo (linha inferior, verso e uma pergunta para os pais). Associe um grupo de pais aqui e defina o filtro para **Passados** para que a aula de hoje seja incluída. Equipes de voluntários geralmente usam **Futuros** ou **Ambos**.

## Imprimindo Planos

Você pode imprimir um plano para distribuição à sua equipe. Abra o plano, Abra a aba ordem de serviço e use a opção **Imprimir** para gerar uma versão imprimível que inclui atribuições e a ordem de serviço. O topo da impressão mostra o nome de sua igreja e o nome do plano, para que páginas soltas sejam fáceis de identificar. Isso é útil para distribuir em ensaios ou postar em uma área comum.

:::info
Planos são organizados por ministério. Certifique-se de que você está na aba de ministério correta antes de criar ou visualizar planos.
:::

## Próximas Etapas

- Use a [Visão Geral de Planos](./plans-overview.md) para ver todas as atribuições futuras em múltiplas semanas em uma única grade e identificar posições não preenchidas -- e atribua voluntários diretamente da grade
- Salve a estrutura de um plano como um [Modelo de Plano](./plan-templates.md) para que você possa aplicá-lo a futuros planos em um clique
- Construa sua [Ordem de Serviço](./service-order.md) com músicas, leituras e outros elementos
- Adicione [músicas](./songs.md) de sua biblioteca diretamente na ordem de serviço
- Use [Tarefas](./tasks.md) para atribuir itens de ação de acompanhamento a membros da equipe
- Exiba conteúdo da aula atual em uma TV de saguão com [Sinalização Digital](./digital-signage.md)
