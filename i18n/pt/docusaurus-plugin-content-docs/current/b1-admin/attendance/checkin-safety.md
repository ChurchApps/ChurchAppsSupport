---
title: "Segurança de Check-In"
---

# Segurança de Check-In

<div class="article-intro">

O B1 inclui um conjunto de controles de segurança infantil para check-in: limites de capacidade de sala e proporções de voluntário para criança, orientação de idade e série no quiosque, tipos de check-in que distinguem membros, convidados e voluntários, e uma lista de retirada confiável por domicílio que é verificada no checkout. Esta página cobre como configurar cada recurso de segurança no B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure sua [estrutura de presença](setup.md) e [quiosques de check-in](check-in.md)
- As salas são [grupos](../groups/creating-groups.md) vinculados a horários de serviço — as configurações de segurança abaixo ficam no grupo
- A página de um pai e o broadcast de emergência exigem um provedor de SMS conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Ministério Mútuo)

</div>

## Capacidade de sala e fechamento de sala

Cada sala de check-in (grupo) pode impor seus próprios limites. Abra o grupo, clique no **ícone de lápis** para editar suas configurações e localize a seção **Capacidade de Check-In**:

- **Capacidade** -- O número máximo de pessoas que podem ser marcadas como presentes nesta sala de uma vez. Quando a sala está cheia, o check-in nela é bloqueado e o quiosque nomeia a sala cheia.
- **Capacidade de Convidados** -- Um limite separado opcional sobre quantos convidados a sala pode acomodar.
- **Fechado para Check-In** -- Defina como **Sim** para parar todos os check-ins nesta sala imediatamente (por exemplo, quando uma aula é cancelada ou uma sala fica indisponível). Os checkouts ainda funcionam.

## Proporções de voluntários

A mesma seção **Capacidade de Check-In** no grupo inclui regras de pessoal:

- **Crianças por voluntário** -- O número máximo de crianças que cada voluntário registrado pode acompanhar (por exemplo, 5 significa um voluntário para cada cinco crianças).
- **Voluntários mínimos** -- O menor número de voluntários que devem estar marcados antes que as crianças possam se registrar na sala.

Os voluntários contam para essas regras quando fazem check-in com o tipo **Voluntário** no quiosque (veja [Tipos de Check-In](#tipos-de-check-in) abaixo).

### Escolhendo Avisar vs. Bloquear

A forma como as proporções são aplicadas é uma configuração em toda a igreja:

1. No B1 Admin, vá para **Configurações > Gerenciar Igreja** e abra o bloco **Check-In**.
2. Configure **Aplicação de Proporção de Voluntários**:
   - **Avisar (permitir com confirmação)** -- O quiosque mostra um aviso quando uma sala está acima da proporção ou abaixo de seus voluntários mínimos, e um membro da equipe pode confirmar para prosseguir mesmo assim. Este é o padrão.
   - **Bloquear (impedir check-in)** -- O check-in na sala é recusado até que voluntários suficientes estejam marcados.

:::info
Capacidade e Fechado para Check-In são sempre limites físicos — a escolha avisar/bloquear se aplica apenas às proporções de voluntários.
:::

## Tipos de Check-In

Todo check-in registra se a pessoa é um **Membro**, **Convidado** ou **Voluntário**. O tipo é escolhido com chips na tela do domicílio do quiosque (Membro é o padrão). Os tipos alimentam as regras de segurança — voluntários fornecem cobertura de proporção e convidados contam contra a Capacidade de Convidados da sala.

## Orientação de idade e série da sala

Você pode dar a cada sala limites de idade ou série para que o quiosque guie as famílias para salas apropriadas:

- Na configuração do grupo, use a seção **Idade e Série** para definir a idade mínima/máxima (anos e meses) e/ou série da sala.
- No quiosque, as salas para as quais uma criança é elegível são destacadas e as salas para as quais não são ficam desbotadas. Uma sala desbotada ainda pode ser escolhida com confirmação do pessoal — a orientação nunca bloqueia com força.

As séries mudam na **data de promoção de série** da sua igreja:

1. No B1 Admin, vá para **Configurações > Gerenciar Igreja** e abra o bloco de promoção de série.
2. Defina o mês e dia em que sua igreja promove alunos (por exemplo, 1º de agosto). As idades e séries no quiosque são calculadas a partir da data de promoção mais recente.

## Pessoas de retirada confiável e não autorizadas

Cada domicílio pode manter uma lista de pessoas que são — ou não — autorizadas a retirar seus filhos.

1. Abra a página de uma pessoa em **Pessoas** e localize o cartão **Retirada**.
2. Clique em **Adicionar**. Procure uma pessoa existente ou adicione alguém não no sistema inserindo seu **Nome**, **Relacionamento** e uma foto.
3. Configure o **Status**:
   - **Confiável** -- No checkout, esta pessoa aparece como um cartão de retirada tocável com sua foto, tornando a retirada verificada rápida.
   - **Não Autorizado** -- Se alguém tentar retirada sob esse nome, o quiosque bloqueia o checkout com um aviso. Um membro da equipe pode substituir, e a substituição é registrada no registro de presença.

Clique no chip de status de uma pessoa no cartão para alternar entre Confiável e Não Autorizado.

:::tip
Adicione fotos a pessoas de retirada confiável sempre que possível — a tela de checkout mostra a foto para que os voluntários possam verificar visualmente a pessoa em pé na frente deles.
:::

## Página de um pai e broadcast de emergência

Ambos os recursos enviam mensagens de SMS através do provedor de SMS conectado da sua igreja — não há serviço de SMS integrado, portanto um dos provedores suportados deve ser configurado primeiro.

- **Avisar um pai** -- A partir da tela de checkout de um quiosque com pessoal, a equipe pode enviar um SMS aos pais/responsáveis de uma criança marcada como presente (por exemplo, "Por favor, venha ao berçário").
- **Broadcast de emergência** -- Nas configurações de admin do quiosque, a equipe pode enviar SMS aos guardiões de cada domicílio marcado para o serviço selecionado de uma vez. O envio requer digitar **EMERGÊNCIA** para confirmar.

As pessoas que optaram por não receber SMS ou que não têm número de celular em arquivo são puladas automaticamente — o quiosque informa quantas mensagens foram enviadas e quantas foram puladas.

Veja o passo a passo do lado do quiosque em [Checkout e Segurança Infantil](../../b1-checkin/check-in/checking-out).

## Artigos relacionados

- [Check-In](check-in.md) — configuração de quiosque e hardware
- [Checkout e Segurança Infantil](../../b1-checkin/check-in/checking-out) — o checkout do quiosque, verificação de retirada e fluxos de paginação
- [Criando grupos](../groups/creating-groups.md) — onde as configurações de sala vivem
- [Configuração de presença](setup.md) — serviços, horários de serviço e atribuições de sala
- [Idade mínima para mensagens privadas](../settings/mobile-app.md#configurações-de-diretório-de-membros--mensagens) — bloqueia novas conversas de mensagens privadas com crianças mantendo-as no diretório
