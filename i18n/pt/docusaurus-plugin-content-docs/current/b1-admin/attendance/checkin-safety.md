---
title: "Segurança de Check-In"
---

# Segurança de Check-In

<div class="article-intro">

B1 inclui um conjunto de controles de segurança infantil para check-in: limites de capacidade de sala e proporções de voluntário para criança, orientação de idade e série no quiosque, tipos de check-in que distinguem membros, convidados e voluntários, e uma lista de retirada confiável por household que é verificada no checkout. Esta página cobre como configurar cada recurso de segurança no B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure sua [estrutura de presença](setup.md) e [quiosques de check-in](check-in.md)
- Salas são [grupos](../groups/creating-groups.md) vinculados a horários de serviço -- as configurações de segurança abaixo vivem no grupo
- Page-a-parent e broadcast de emergência requerem um provedor de texting conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacidade de Sala e Fechando uma Sala

Cada sala de check-in (grupo) pode impor seus próprios limites. Abra o grupo, clique no **ícone de lápis** para editar suas configurações e encontre a seção **Capacidade de Check-In**:

- **Capacidade** -- O número máximo de pessoas que podem estar registradas nesta sala de uma vez. Quando a sala está cheia, o check-in a ela é bloqueado e o quiosque nomeia a sala cheia.
- **Capacidade de Convidados** -- Um cap opcional separado em quantos convidados a sala pode conter.
- **Fechado para Check-In** -- Defina como **Sim** para parar todos os check-ins nesta sala imediatamente (por exemplo, quando uma aula é cancelada ou uma sala fica indisponível). Check-outs ainda funcionam.

## Proporções de Voluntários

A mesma seção **Capacidade de Check-In** no grupo inclui regras de staffing:

- **Crianças por Voluntário** -- O número máximo de crianças que cada voluntário registrado pode cobrir (por exemplo, 5 significa um voluntário para cinco crianças).
- **Mínimo de Voluntários** -- O menor número de voluntários que devem estar registrados antes que as crianças possam registrar nesta sala.

Voluntários contam para essas regras quando fazem check-in com o tipo **Voluntário** no quiosque (veja [Tipos de Check-In](#tipos-de-check-in) abaixo).

### Escolhendo Avisar vs. Bloquear

Como as proporções são rigorosamente aplicadas é uma configuração em toda a igreja:

1. No B1 Admin, vá para **Configurações > Gerenciar Igreja** e abra o bloco **Check-In**.
2. Defina **Aplicação de Proporção de Voluntário**:
   - **Avisar (permitir com confirmação)** -- O quiosque mostra um aviso quando uma sala está acima da proporção ou abaixo de seus voluntários mínimos, e um membro da equipe pode confirmar para prosseguir mesmo assim. Este é o padrão.
   - **Bloquear (impedir check-in)** -- Check-in para a sala é recusado até que voluntários suficientes estejam registrados.

:::info
Capacidade e Fechado para Check-In são sempre limites duros -- a escolha avisar/bloquear se aplica apenas às proporções de voluntários.
:::

## Tipos de Check-In

Cada check-in registra se a pessoa é um **Membro**, **Convidado** ou **Voluntário**. O tipo é escolhido com chips na tela do quiosque do household (Membro é o padrão). Tipos alimentam as regras de segurança -- voluntários fornecem cobertura de proporção e convidados contam contra a Capacidade de Convidados da sala.

## Orientação de Sala por Idade e Série

Você pode dar a cada sala limites de idade ou série para que o quiosque guie famílias para salas apropriadas:

- Nas configurações do grupo, use a seção **Idade & Série** para definir a idade mínima/máxima (anos e meses) e/ou série para a sala.
- No quiosque, salas que uma criança se qualifica são destacadas e salas que não são atenuadas. Uma sala atenuada ainda pode ser escolhida com confirmação de staff -- a orientação nunca bloqueia com força.

As séries avançam na **data de promoção de série** da sua igreja:

1. No B1 Admin, vá para **Configurações > Gerenciar Igreja** e abra o bloco de promoção de série.
2. Defina o mês e dia sua igreja promove alunos (por exemplo, 1 de agosto). Idades e séries no quiosque são computadas a partir da data de promoção mais recente.

## Pessoas de Retirada Confiáveis e Não-Autorizadas

Cada household pode carregar uma lista de pessoas que são -- ou não são -- autorizadas a buscar seus filhos.

1. Abra a página de uma pessoa em **Pessoas** e encontre o card **Retirada**.
2. Clique **Adicionar**. Procure uma pessoa existente ou adicione alguém não no sistema inserindo seu **Nome**, **Relacionamento** e uma foto.
3. Defina o **Status**:
   - **Confiável** -- No checkout, esta pessoa aparece como um card de retirada tocável com sua foto, tornando a retirada verificada rápida.
   - **Não Autorizado** -- Se alguém tentar retirada sob este nome, o quiosque bloqueia o check-out com um aviso. Um membro da equipe pode anular e a anulação é registrada no registro de presença.

Clique no chip de status de uma pessoa no card para alternar entre Confiável e Não Autorizado.

:::tip
Adicione fotos a pessoas de retirada confiáveis sempre que possível -- a tela de checkout mostra a foto para que voluntários possam verificar visualmente a pessoa em pé à sua frente.
:::

## Page-a-Parent e Broadcast de Emergência

Ambos os recursos enviam mensagens de texto através do provedor de texting conectado da sua igreja -- não há serviço SMS integrado, portanto um dos provedores suportados deve ser configurado primeiro.

- **Page a parent** -- Na tela de check-out de um quiosque tripulado, o staff pode textar os pais/guardiões de uma criança registrada (por exemplo, "Por favor, venha para a creche").
- **Broadcast de emergência** -- Nas configurações de admin do quiosque, o staff pode textar os guardiões de cada household registrado para o serviço selecionado de uma vez. O envio requer digitar **EMERGÊNCIA** para confirmar.

Pessoas que optaram por não receber textos ou que não têm número de celular registrado são puladas automaticamente -- o quiosque relata quantas mensagens foram enviadas e quantas foram puladas.

Veja o guia pelo lado do quiosque em [Check-Out & Segurança Infantil](../../b1-checkin/check-in/checking-out).

## Artigos Relacionados

- [Check-In](check-in.md) -- configuração de quiosque e hardware
- [Check-Out & Segurança Infantil](../../b1-checkin/check-in/checking-out) -- checkout do quiosque, verificação de retirada e fluxos de paging
- [Criando Grupos](../groups/creating-groups.md) -- onde as configurações de sala vivem
- [Configuração de Presença](setup.md) -- serviços, horários de serviço e atribuições de sala
