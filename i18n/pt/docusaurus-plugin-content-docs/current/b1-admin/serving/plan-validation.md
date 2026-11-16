---
title: "Validação de planos e notificações"
description: "Verifique os planos de culto no B1 Admin quanto a posições não preenchidas, conflitos de escala e voluntários com indisponibilidade, e depois notifique toda a equipe com um único clique."
---

# Validação de planos e notificações aos voluntários {#plan-validation--volunteer-notifications}

<div class="article-intro">

O B1 Admin verifica automaticamente seus planos antes do domingo, em busca de problemas — posições não preenchidas, conflitos de escala e voluntários que bloquearam a data. Quando tudo estiver certo, você pode notificar toda a sua equipe com um único clique.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie um [plano de culto](./plans.md) e atribua voluntários às posições
- Adicione [horários de culto](./plans.md) ao plano para que a detecção de conflitos possa verificar sobreposições
- Certifique-se de que os voluntários têm o [aplicativo B1 instalado](../../b1-church/getting-started/installing-pwa.md) para receber notificações push

</div>

## O painel de validação {#the-validation-panel}

Cada plano tem um painel **Validação** que é executado automaticamente enquanto você o monta. Abra o plano e clique em **Gerenciar equipe de serviço** para vê-lo ao lado das posições. A própria página do plano mostra um resumo de uma linha em **Equipe de serviço** (por exemplo, "2 conflitos · 3 não notificados"), com um link **Revisar** para o painel completo. As posições que ainda precisam de pessoas também aparecem na página do plano, portanto a linha de resumo conta apenas os conflitos e os voluntários que ainda não foram notificados.

O painel verifica o seguinte:

### Posições não preenchidas {#unfilled-positions}
Se uma posição exigir mais pessoas do que as atualmente atribuídas, o painel de validação lista exatamente o que ainda falta — por exemplo, *"Técnico de som: falta 1 pessoa."* Você pode ver de relance se o seu plano está com a equipe completa antes de a semana chegar.

### Conflitos de escala {#scheduling-conflicts}
Se um voluntário estiver atribuído a duas posições que se sobrepõem no tempo dentro do mesmo plano, o painel de validação sinaliza o conflito — por exemplo, *"Jane Smith: conflito de horário entre Líder de louvor e Check-in infantil durante o Culto de domingo."* Isso detecta escalas duplicadas antes que se tornem um problema no domingo de manhã.

### Datas de indisponibilidade {#blockout-dates}
Os voluntários podem definir no aplicativo B1 as datas em que não estão disponíveis. Se alguém for atribuído a um plano que cai em uma dessas datas, o painel de validação mostra o conflito automaticamente para que você possa encontrar um substituto.

Voluntários com indisponibilidade também são sinalizados enquanto você escala. Na página da equipe de serviço e na caixa de diálogo **Atribuir posição**, o nome deles aparece com um selo vermelho **Indisponível**; passe o mouse sobre ele para ver as datas (por exemplo, *Bloqueado: Nov 22, 2026 – Nov 29, 2026*). Na caixa de diálogo **Atribuir posição**, eles aparecem depois de todos os outros da equipe, e você ainda pode atribuí-los. Na [Visão geral dos planos](./plans-overview.md), um pequeno ícone vermelho de calendário ao lado de um nome indica a mesma situação.

Para voluntários que não usam o aplicativo, a equipe pode lançar as datas de indisponibilidade no lugar deles. Abra a equipe (a partir da lista **Equipes de serviço** do ministério) e role até o cartão **Datas de indisponibilidade**, abaixo da lista de membros. Ele mostra as indisponibilidades futuras de cada membro, com as colunas **Membro da equipe**, **De** e **Até**:

1. Clique em **Adicionar indisponibilidade**.
2. Escolha o **Membro da equipe** e, em seguida, defina as datas **De** e **Até**.
3. Clique em **Salvar**.

Para remover uma indisponibilidade, clique no ícone de exclusão na linha dela e confirme. Adicionar e remover datas de indisponibilidade exige permissão para editar planos; quem mais abrir a equipe vê somente a lista.

### Conflitos entre planos {#cross-plan-conflicts}
A validação também verifica todos os seus planos ao mesmo tempo. Se o mesmo voluntário estiver atribuído em dois planos diferentes que se sobrepõem no tempo — por exemplo, um culto às 9h e outro às 10h, ambos com duração até as 10h30 —, o B1 Admin sinalizará essa pessoa como escalada em duplicidade entre planos.

### Preferências de escala {#scheduling-preferences}
Se um voluntário tiver [preferências de escala](./plans.md#scheduling-preferences), o painel avisa quando uma atribuição contraria essas preferências: quando ele está escalado mais vezes no mês do que o seu **Máximo de vezes por mês**, quando nenhum horário do plano corresponde aos seus **Horários de culto preferidos** ou quando ele pediu para não servir no mesmo dia que sua família, e um membro da família também está escalado.

Quando tudo estiver correto, o painel exibe **Plano válido.**

:::tip
Você não precisa fazer nada para executar a validação — ela é atualizada automaticamente sempre que você adiciona ou altera uma atribuição. Basta acompanhar o painel enquanto monta o plano.
:::

## Notificando os voluntários {#notifying-volunteers}

Quando o plano estiver definido, você pode notificar todos os voluntários escalados de uma vez, diretamente pelo painel de validação.

1. Abra o plano e clique em **Gerenciar equipe de serviço** (ou em **Revisar** na linha de resumo do plano) para ver o painel **Validação**.
2. Se houver voluntários não notificados, você verá um link indicando quantos precisam ser notificados (por exemplo, *"Notificar 8 voluntário(s)"*). Quando todos tiverem sido notificados, o painel exibe **Todos os voluntários foram notificados.**
3. Clique no link para enviar notificações push a todos que ainda não foram notificados.
4. Os voluntários recebem uma notificação no celular informando que foram escalados e pedindo que confirmem a atribuição.

:::info
Somente voluntários que ainda não foram notificados são incluídos. Se você adicionar alguém ao plano depois, o link reaparecerá para que você possa notificar a nova pessoa sem notificar novamente o restante da equipe.
:::

### Publicando um plano em análise {#publishing-a-penciled-in-plan}

Se o plano estiver [em análise](./plans.md#plan-settings), os voluntários ainda não podem ver suas atribuições, e o painel mostra *"Em análise — os voluntários ainda não podem ver estas atribuições."* com um botão no lugar do link de notificação:

- **Publicar plano** torna as atribuições visíveis.
- **Publicar e notificar** (exibido quando alguns voluntários não foram notificados, por exemplo *"Publicar e notificar 8 voluntário(s)"*) torna as atribuições visíveis e notifica esses voluntários imediatamente.

Confirme na caixa de diálogo para publicar.

### Planos com fluxo de confirmação {#plans-with-a-confirmation-workflow}

Se as configurações do plano indicarem um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations), o painel mostra *"Novas solicitações usam o fluxo de confirmação. Os alertas no aplicativo continuam ativados. Os acompanhamentos param quando cada solicitação for aceita ou recusada."* Nesse caso:

- O link de notificação conta apenas os voluntários que ainda não foram notificados e que ainda não responderam.
- Ao clicar nele, é enviado o alerta habitual no aplicativo e é criado um card por solicitação no quadro do fluxo de trabalho. Em seguida, o fluxo envia os acompanhamentos por e-mail e SMS e, se necessário, encaminha a solicitação para alguém ligar.
- O plano precisa estar publicado (não em análise) e o fluxo de trabalho precisa estar ativo. Caso contrário, o painel mostra *"Não foi possível emitir as solicitações. Verifique se o fluxo de trabalho selecionado está ativo e se o plano está publicado, e tente novamente."*

:::warning
Para receber notificações push, os voluntários precisam ter o aplicativo B1 instalado na tela inicial, com as notificações ativadas. Veja [Instalando como aplicativo (PWA)](../../b1-church/getting-started/installing-pwa.md) para as instruções de configuração.
:::

## Artigos relacionados {#related-articles}

- [Planos de culto](./plans.md)
- [Fluxos de trabalho](./workflows.md)
- [Instalando o PWA do B1.church](/docs/b1-church/getting-started/installing-pwa)
