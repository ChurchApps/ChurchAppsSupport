---
title: "Segurança no Check-In"
---

# Segurança no Check-In

<div class="article-intro">

O B1 inclui um conjunto de controles de segurança infantil para o check-in: limites de capacidade de sala e proporções de voluntários por criança, orientação de idade e série no quiosque, tipos de check-in que distinguem membros, visitantes e voluntários, e uma lista de retirada confiável por família, verificada no check-out. Esta página aborda como configurar cada recurso de segurança no B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure sua [estrutura de frequência](setup.md) e os [quiosques de check-in](check-in.md)
- As salas são [grupos](../groups/creating-groups.md) vinculados a horários de culto — as configurações de segurança abaixo ficam no grupo
- Chamar um responsável (page-a-parent) e transmissão de emergência exigem um provedor de mensagens de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) ou Mutual Ministry)

</div>

## Capacidade da Sala e Fechamento de uma Sala

Cada sala de check-in (grupo) pode aplicar seus próprios limites. Abra o grupo, clique no **ícone de lápis** para editar suas configurações e encontre a seção **Check-In Capacity**:

- **Capacity** -- O número máximo de pessoas que podem ser registradas nessa sala ao mesmo tempo. Quando a sala está cheia, o check-in nela é bloqueado e o quiosque informa que a sala está cheia.
- **Guest Capacity** -- Um limite separado opcional para quantos visitantes a sala pode receber.
- **Closed for Check-In** -- Defina como **Yes** para interromper imediatamente todos os check-ins nessa sala (por exemplo, quando uma turma é cancelada ou uma sala fica indisponível). Os check-outs continuam funcionando.

## Proporções de Voluntários

A mesma seção **Check-In Capacity** no grupo inclui regras de equipe:

- **Children per Volunteer** -- O número máximo de crianças que cada voluntário registrado pode cobrir (por exemplo, 5 significa um voluntário para cada cinco crianças).
- **Minimum Volunteers** -- O menor número de voluntários que precisa estar registrado antes que as crianças possam fazer check-in na sala.

Os voluntários contam para essas regras quando fazem check-in com o tipo **Volunteer** no quiosque (veja [Tipos de Check-In](#tipos-de-check-in) abaixo).

### Escolhendo Avisar vs. Bloquear

O quão rigorosamente as proporções são aplicadas é uma configuração de toda a igreja:

1. No B1 Admin, vá em **Settings > Manage Church** e abra o card **Check-In**.
2. Defina **Volunteer Ratio Enforcement**:
   - **Warn (allow with confirmation)** -- O quiosque exibe um aviso quando uma sala está acima da proporção ou abaixo do mínimo de voluntários, e um membro da equipe pode confirmar para prosseguir mesmo assim. Este é o padrão.
   - **Block (prevent check-in)** -- O check-in na sala é recusado até que voluntários suficientes estejam registrados.

:::info
Capacity e Closed for Check-In são sempre limites rígidos — a escolha entre avisar/bloquear se aplica somente às proporções de voluntários.
:::

## Tipos de Check-In

Todo check-in registra se a pessoa é **Member**, **Guest** ou **Volunteer**. O tipo é escolhido com chips na tela de família do quiosque (Member é o padrão). Os tipos alimentam as regras de segurança — voluntários fornecem cobertura de proporção, e visitantes contam para a Guest Capacity da sala.

## Orientação de Idade e Série da Sala

Você pode dar a cada sala limites de idade ou série para que o quiosque oriente as famílias às salas apropriadas:

- Nas configurações do grupo, use a seção **Age & Grade** para definir a idade mínima/máxima (anos e meses) e/ou a série para a sala.
- No quiosque, as salas para as quais uma criança se qualifica são destacadas e as que não se qualifica ficam esmaecidas. Uma sala esmaecida ainda pode ser escolhida com a confirmação de um membro da equipe — a orientação nunca bloqueia totalmente.

As séries são atualizadas na **data de promoção de série** da sua igreja:

1. No B1 Admin, vá em **Settings > Manage Church** e abra o card de promoção de série.
2. Defina o mês e o dia em que sua igreja promove os alunos (por exemplo, 1º de agosto). As idades e séries no quiosque são calculadas a partir da data de promoção mais recente.

## Pessoas Autorizadas e Não Autorizadas para Retirada

Cada família pode manter uma lista de pessoas que estão — ou não estão — autorizadas a retirar suas crianças.

1. Abra a página de uma pessoa em **People** e encontre o card **Pickup**.
2. Clique em **Add**. Pesquise por uma pessoa existente ou adicione alguém que não está no sistema, inserindo seu **Name**, **Relationship** e uma foto.
3. Defina o **Status**:
   - **Trusted** -- No check-out, essa pessoa aparece como um cartão de retirada clicável com sua foto, tornando a retirada verificada rápida.
   - **Not Authorized** -- Se alguém tentar a retirada sob esse nome, o quiosque bloqueia o check-out com um aviso. Um membro da equipe pode substituir essa restrição, e a substituição é registrada no registro de frequência.

Clique no chip de status de uma pessoa no card para alternar entre Trusted e Not Authorized.

:::tip
Adicione fotos às pessoas de retirada confiável sempre que possível — a tela de check-out mostra a foto para que os voluntários possam verificar visualmente a pessoa à sua frente.
:::

## Chamar um Responsável e Transmissão de Emergência

Ambos os recursos enviam mensagens de texto por meio do provedor de mensagens de texto conectado à sua igreja — não há serviço de SMS integrado, então um dos provedores compatíveis deve ser configurado primeiro.

- **Page a parent** -- Na tela de check-out de um quiosque com equipe, a equipe pode enviar uma mensagem de texto aos pais/responsáveis de uma criança registrada (por exemplo, "Please come to the nursery").
- **Emergency broadcast** -- Nas configurações administrativas do quiosque, a equipe pode enviar mensagem de texto de uma vez para todos os responsáveis de famílias registradas no culto selecionado. O envio exige digitar **EMERGENCY** para confirmar.

Pessoas que optaram por não receber mensagens de texto, ou que não têm número de celular registrado, são ignoradas automaticamente — o quiosque informa quantas mensagens foram enviadas e quantas foram ignoradas.

Veja o passo a passo do lado do quiosque em [Check-Out e Segurança Infantil](../../b1-checkin/check-in/checking-out).

## Artigos Relacionados

- [Check-In](check-in.md) — configuração do quiosque e hardware
- [Check-Out e Segurança Infantil](../../b1-checkin/check-in/checking-out) — o check-out no quiosque, verificação de retirada e fluxos de chamada
- [Criando Grupos](../groups/creating-groups.md) — onde ficam as configurações de sala
- [Configuração de Frequência](setup.md) — cultos, horários de culto e atribuições de sala
