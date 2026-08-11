---
title: "Segurança de Check-In"
---

# Segurança de Check-In

<div class="article-intro">

B1 inclui um conjunto de controles de segurança infantil para check-in: limites de capacidade de sala e proporções de voluntário para criança, orientação de idade e série no quiosque, tipos de check-in que distinguem membros, convidados e voluntários, e uma lista de retirada confiável por família que é verificada no checkout. Esta página aborda como configurar cada recurso de segurança no B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure sua [estrutura de presença](setup.md) e [quiosques de check-in](check-in.md)
- Salas são [grupos](../groups/creating-groups.md) vinculados a horários de serviço — as configurações de segurança abaixo ficam no grupo
- Chamar um responsável e transmissão de emergência requerem um provedor de mensagens de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacidade da Sala e Fechamento de uma Sala

Cada sala de check-in (grupo) pode enforçar seus próprios limites. Abra o grupo, clique no **ícone de lápis** para editar suas configurações e encontre a seção **Capacidade de Check-In**:

- **Capacidade** -- O número máximo de pessoas que podem fazer check-in nesta sala de uma vez. Quando a sala está cheia, o check-in nela é bloqueado e o quiosque nomeia a sala cheia.
- **Capacidade de Convidados** -- Um limite separado opcional de quantos convidados a sala pode acomodar.
- **Fechado para Check-In** -- Defina como **Sim** para parar todos os check-ins nesta sala imediatamente (por exemplo, quando uma aula é cancelada ou uma sala fica indisponível). Os checkouts ainda funcionam.

## Proporções de Voluntários

A mesma seção **Capacidade de Check-In** no grupo inclui regras de pessoal:

- **Crianças por Voluntário** -- O número máximo de crianças que cada voluntário com check-in pode cobrir (por exemplo, 5 significa um voluntário para cada cinco crianças).
- **Voluntários Mínimos** -- O menor número de voluntários que devem ter check-in antes que as crianças possam fazer check-in na sala.

Voluntários contam para essas regras quando fazem check-in com o tipo **Voluntário** no quiosque (consulte [Tipos de Check-In](#check-in-types) abaixo).

### Escolhendo Avisar vs. Bloquear

Como as proporções são rigorosamente aplicadas é uma configuração de toda a igreja:

1. No B1 Admin, vá para **Configurações > Gerenciar Igreja** e abra o ladrilho **Check-In**.
2. Defina **Execução de Proporção de Voluntários**:
   - **Avisar (permitir com confirmação)** -- O quiosque mostra um aviso quando uma sala está acima da proporção ou abaixo de seus voluntários mínimos, e um membro da equipe pode confirmar para continuar assim mesmo. Este é o padrão.
   - **Bloquear (prevenir check-in)** -- O check-in na sala é recusado até que voluntários suficientes estejam com check-in.

:::info
Capacidade e Fechado para Check-In são sempre limites rígidos — a escolha avisar/bloquear se aplica apenas às proporções de voluntários.
:::

## Tipos de Check-In

Cada check-in registra se a pessoa é um **Membro**, **Convidado** ou **Voluntário**. O tipo é escolhido com chips na tela da família do quiosque (Membro é o padrão). Os tipos alimentam as regras de segurança — voluntários fornecem cobertura de proporção e convidados contam contra a Capacidade de Convidados da sala.

## Orientação de Idade e Série da Sala

Você pode dar a cada sala limites de idade ou série para que o quiosque guie as famílias para salas apropriadas:

- Nas configurações do grupo, use a seção **Idade e Série** para definir a idade mínima/máxima (anos e meses) e/ou série para a sala.
- No quiosque, as salas para as quais uma criança se qualifica são destacadas e as salas que não são desativadas. Uma sala desativada ainda pode ser escolhida com uma confirmação da equipe — a orientação nunca bloqueia.

As séries mudam na **data de promoção de série** da sua igreja:

1. No B1 Admin, vá para **Configurações > Gerenciar Igreja** e abra o ladrilho de promoção de série.
2. Defina o mês e o dia em que sua igreja promove estudantes (por exemplo, 1º de agosto). As idades e séries no quiosque são calculadas a partir da data de promoção mais recente.

## Pessoas Confiáveis e Não Autorizadas para Retirada

Cada família pode ter uma lista de pessoas que estão — ou não — autorizadas a retirar suas crianças.

1. Abra a página de uma pessoa em **Pessoas** e encontre o cartão **Retirada**.
2. Clique em **Adicionar**. Procure por uma pessoa existente ou adicione alguém que não esteja no sistema inserindo seu **Nome**, **Relacionamento** e uma foto.
3. Defina o **Status**:
   - **Confiável** -- No checkout, essa pessoa aparece como um cartão de retirada tocável com sua foto, tornando a retirada verificada rápida.
   - **Não Autorizado** -- Se alguém tentar retirada sob esse nome, o quiosque bloqueia o checkout com um aviso. Um membro da equipe pode substituir e a substituição é registrada no registro de presença.

Clique no chip de status de uma pessoa no cartão para alternar entre Confiável e Não Autorizado.

:::tip
Adicione fotos às pessoas de retirada confiáveis sempre que possível — a tela de checkout mostra a foto para que os voluntários possam verificar visualmente a pessoa na frente deles.
:::

## Chamar um Responsável e Transmissão de Emergência

Ambas as funcionalidades enviam mensagens de texto através do provedor de mensagens de texto conectado da sua igreja — não há serviço SMS integrado, portanto, um dos provedores suportados deve ser configurado primeiro.

- **Chamar um responsável** -- De uma tela de checkout de quiosque operado, a equipe pode textar os pais/responsáveis de uma criança com check-in (por exemplo, "Por favor, venha ao berçário").
- **Transmissão de emergência** -- A partir das configurações de administrador do quiosque, a equipe pode textar os responsáveis de todas as famílias com check-in para o serviço selecionado de uma vez. O envio requer digitar **EMERGÊNCIA** para confirmar.

Pessoas que optaram por não receber mensagens de texto ou que não têm número celular registrado são automaticamente ignoradas — o quiosque relata quantas mensagens foram enviadas e quantas foram ignoradas.

Consulte o passo a passo do lado do quiosque em [Checkout e Segurança Infantil](../../b1-checkin/check-in/checking-out).

## Artigos Relacionados

- [Check-In](check-in.md) — configuração do quiosque e hardware
- [Checkout e Segurança Infantil](../../b1-checkin/check-in/checking-out) — o checkout do quiosque, verificação de retirada e fluxos de chamada
- [Criando Grupos](../groups/creating-groups.md) — onde as configurações da sala ficam
- [Configuração de Presença](setup.md) — serviços, horários de serviço e atribuições de sala
- [Idade Mínima para Mensagens Privadas](../settings/mobile-app.md#member-directory--messaging-settings) — bloqueia novas conversas de mensagens privadas com crianças enquanto as mantém no diretório
