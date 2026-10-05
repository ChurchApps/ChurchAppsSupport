---
title: "Segurança no Check-In"
---

# Segurança no Check-In

<div class="article-intro">

O B1 inclui um conjunto de controles de segurança infantil para check-in: limites de capacidade de sala e proporções de voluntários para crianças, orientação de idade e série no quiosque, tipos de check-in que distinguem membros, hóspedes e voluntários, e uma lista de pessoa autorizada para buscar por núcleo familiar que é verificada no checkout. Esta página cobre como configurar cada recurso de segurança no B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure sua [estrutura de presença](setup.md) e [quiosques de check-in](check-in.md)
- Salas são [grupos](../groups/creating-groups.md) ligados a horários de serviço — as configurações de segurança abaixo vivem no grupo
- Page-a-parent e difusão de emergência requerem um provedor de mensagens de texto conectado ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream), ou Mutual Ministry)

</div>

## Capacidade de Sala e Fechamento de Uma Sala

Cada sala de check-in (grupo) pode aplicar seus próprios limites. Abra o grupo, clique no **ícone de lápis** para editar suas configurações, e encontre a seção **Capacidade de Check-In**:

- **Capacidade** -- O número máximo de pessoas que podem fazer check-in nesta sala de uma vez. Quando a sala está cheia, o check-in para ela é bloqueado e o quiosque nomeia a sala cheia.
- **Capacidade de Hóspedes** -- Um limite opcional separado sobre quantos hóspedes a sala pode acomodar.
- **Fechado para Check-In** -- Defina como **Sim** para parar todos os check-ins para esta sala imediatamente (por exemplo, quando uma classe é cancelada ou uma sala não está disponível). Check-outs ainda funcionam.

## Proporções de Voluntários

A mesma seção **Capacidade de Check-In** no grupo inclui regras de pessoal:

- **Crianças por Voluntário** -- O número máximo de crianças que cada voluntário verificado pode cobrir (por exemplo, 5 significa um voluntário para cada cinco crianças).
- **Voluntários Mínimos** -- O menor número de voluntários que devem fazer check-in antes que as crianças possam fazer check-in na sala.

Voluntários contam para estas regras quando fazem check-in com o tipo **Voluntário** no quiosque (veja [Tipos de Check-In](#check-in-types) abaixo).

### Escolhendo Avisar vs. Bloquear

Como as proporções são aplicadas rigorosamente é uma configuração de toda a igreja:

1. No B1 Admin, vá para **Configurações** e abra a seção **Check-In**.
2. Defina **Aplicação de Proporção de Voluntários**:
   - **Avisar (permitir com confirmação)** -- O quiosque mostra um aviso quando uma sala está acima da proporção ou abaixo de seus voluntários mínimos, e um membro da equipe pode confirmar para prosseguir de qualquer forma. Esta é a padrão.
   - **Bloquear (prevenir check-in)** -- O check-in para a sala é recusado até que voluntários suficientes façam check-in.

:::info
Capacidade e Fechado para Check-In são sempre limites rígidos — a escolha de avisar/bloquear se aplica apenas às proporções de voluntários.
:::

## Tipos de Check-In

Cada check-in registra se a pessoa é um **Membro**, **Hóspede** ou **Voluntário**. O tipo é escolhido com fichas na tela do quiosque da família (Membro é o padrão). Os tipos alimentam as regras de segurança — voluntários fornecem cobertura de proporção, e hóspedes contam contra a Capacidade de Hóspedes da sala.

## Orientação de Sala de Idade e Série

Você pode dar a cada sala limites de idade ou série para que o quiosque oriente famílias para salas apropriadas:

- Nas configurações do grupo, use a seção **Idade e Série** para definir a idade mínima/máxima (anos e meses) e/ou série para a sala.
- No quiosque, salas para as quais uma criança se qualifica são destacadas e salas que ela não se qualifica são escurecidas. Uma sala escurecida ainda pode ser escolhida com uma confirmação da equipe — a orientação nunca bloqueia com dureza.

As séries mudam na **data de promoção de série** da sua igreja:

1. No B1 Admin, vá para **Configurações** e abra a seção **Promoção de Série**.
2. Defina o mês e o dia em que sua igreja promove alunos (por exemplo, 1º de agosto). As idades e séries no quiosque são computadas a partir da data de promoção mais recente.

## Pessoas Autorizadas e Não Autorizadas para Buscar

Cada núcleo familiar pode ter uma lista de pessoas que são — ou não — autorizadas a buscar suas crianças.

1. Abra a página de uma pessoa em **Pessoas** e encontre o card **Buscar**.
2. Clique em **Adicionar**. Pesquise uma pessoa existente, ou adicione alguém não no sistema inserindo seu **Nome**, **Relacionamento** e uma foto.
3. Defina o **Status**:
   - **Autorizada** -- No checkout, esta pessoa aparece como um card de busca tocável com sua foto, tornando a busca verificada rápida.
   - **Não Autorizada** -- Se alguém tentar buscar sob este nome, o quiosque bloqueia o checkout com um aviso. Um membro da equipe pode substituir, e a substituição é registrada no registro de presença.

Clique no chip de status de uma pessoa no card para alternar entre Autorizada e Não Autorizada.

:::tip
Adicione fotos a pessoas autorizadas para buscar sempre que possível — a tela de checkout mostra a foto para que voluntários possam verificar visualmente a pessoa em frente a eles.
:::

## Page-a-Parent e Difusão de Emergência

Ambos os recursos enviam mensagens de texto através do provedor de mensagens de texto conectado da sua igreja — não há serviço SMS incorporado, portanto um dos provedores suportados deve ser configurado primeiro.

- **Chamar um pai/mãe** -- De tela de checkout de um quiosque tripulado, a equipe pode enviar uma mensagem de texto para os pais/responsáveis de uma criança verificada (por exemplo, "Por favor, venha para a creche").
- **Difusão de emergência** -- Das configurações de administrador do quiosque, a equipe pode enviar uma mensagem de texto para todos os responsáveis de núcleos familiares verificados para o serviço selecionado de uma vez. Enviar requer digitar **EMERGÊNCIA** para confirmar.

Pessoas que optaram por não receber mensagens de texto, ou que não têm número móvel no arquivo, são ignoradas automaticamente — o quiosque relata quantas mensagens foram enviadas e quantas foram ignoradas.

Veja o guia passo a passo do lado do quiosque em [Check-Out & Segurança Infantil](../../b1-checkin/check-in/checking-out).

## Artigos Relacionados

- [Check-In](check-in.md) — configuração de quiosque e hardware
- [Check-Out & Segurança Infantil](../../b1-checkin/check-in/checking-out) — checkout do quiosque, verificação de busca e fluxos de chamada
- [Criando Grupos](../groups/creating-groups.md) — onde as configurações de sala vivem
- [Configuração de Presença](setup.md) — serviços, horários de serviço e atribuições de sala
- [Idade Mínima para Mensagens Privadas](../settings/mobile-app.md#member-directory--messaging-settings) — bloqueia novas conversas de mensagens privadas com crianças enquanto as mantém no diretório
