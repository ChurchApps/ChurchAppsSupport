---
title: "Validação de Planos e Notificações"
description: "Verifique os planos de culto no B1 Admin quanto a posições não preenchidas, conflitos de horário e voluntários com datas bloqueadas, e envie uma notificação push para toda a equipe com um único clique."
---

# Validação de Planos e Notificações para Voluntários

<div class="article-intro">

O B1 Admin verifica automaticamente seus planos antes do domingo, em busca de problemas: posições não preenchidas, conflitos de horário e voluntários que bloquearam a data. Quando tudo estiver certo, você pode notificar toda a equipe com um único clique.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie um [plano de culto](./plans.md) e atribua voluntários às posições
- Adicione [horários de culto](./plans.md) ao plano para que a detecção de conflitos possa verificar sobreposições
- Certifique-se de que os voluntários tenham o [B1 App instalado](../../b1-church/getting-started/installing-pwa.md) para receber notificações push

</div>

## O Painel de Validação

Cada plano tem um painel **Validação** que é executado automaticamente enquanto você o monta. Ele verifica três coisas:

### Posições Não Preenchidas
Se uma posição exigir mais pessoas do que as atualmente atribuídas, o painel de validação lista exatamente o que ainda falta, por exemplo: *"Técnico de som: falta 1 pessoa."* Assim, você pode ver de relance se o plano está totalmente preenchido antes da semana chegar.

### Conflitos de Horário
Se um voluntário estiver atribuído a duas posições que se sobrepõem no tempo dentro do mesmo plano, o painel de validação sinaliza o conflito, por exemplo: *"Jane Smith: conflito de horário entre Líder de Louvor e Recepção Infantil durante o Culto de Domingo."* Isso evita duplas atribuições antes que virem um problema no domingo de manhã.

### Datas Bloqueadas
Os voluntários podem definir, no B1 App, as datas em que não estão disponíveis. Se alguém for escalado para um plano que cai dentro de uma de suas datas bloqueadas, o painel de validação mostra o conflito automaticamente para que você possa encontrar um substituto.

### Conflitos Entre Planos
A validação também verifica todos os seus planos ao mesmo tempo. Se o mesmo voluntário estiver atribuído a dois planos diferentes que se sobrepõem no tempo, por exemplo, um culto às 9h e outro às 10h que vão até as 10h30, o B1 Admin sinalizará essa pessoa como alocada duas vezes entre planos.

:::tip
Você não precisa fazer nada para executar a validação: ela é atualizada automaticamente sempre que você adiciona ou altera uma atribuição. Basta acompanhar o painel enquanto monta o plano.
:::

## Notificando Voluntários

Quando o plano estiver pronto, você pode notificar todos os voluntários atribuídos de uma só vez, diretamente pelo painel de validação.

1. Abra o plano e role até o painel **Validação**
2. Se houver voluntários não notificados, você verá um link indicando quantos precisam ser notificados (por exemplo, *"Notificar 8 voluntários"*)
3. Clique no link para enviar notificações push a todos que ainda não foram notificados
4. Os voluntários recebem uma notificação no celular informando que foram escalados e pedindo que confirmem sua participação

:::info
Somente os voluntários que ainda não foram notificados serão incluídos. Se você adicionar alguém ao plano depois, o link aparecerá novamente para que você possa notificar o novo integrante sem notificar de novo o restante da equipe.
:::

### Planos com Fluxo de Confirmação

Se as configurações do plano indicarem um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations), o painel mostra: *"Novas solicitações usam o fluxo de confirmação. Os alertas no app continuam ativados. Os lembretes são interrompidos quando cada solicitação é aceita ou recusada."* Nesse caso:

- O link de notificação conta apenas os voluntários que ainda não foram notificados e que ainda não responderam.
- Ao clicar nele, é enviado o alerta normal no app e é criado um cartão por solicitação no quadro do fluxo. Em seguida, o fluxo envia os lembretes por e-mail e mensagem de texto e, se necessário, encaminha a solicitação a alguém para que faça uma ligação.
- O plano precisa estar publicado (não apenas rascunhado) e o fluxo precisa estar ativo. Caso contrário, o painel mostra: *"Não foi possível emitir as solicitações. Verifique se o fluxo selecionado está ativo e se o plano está publicado e tente novamente."*

:::warning
Para receber notificações push, os voluntários precisam ter o B1 App instalado na tela inicial, com as notificações ativadas. Consulte [Instalando como Aplicativo (PWA)](../../b1-church/getting-started/installing-pwa.md) para ver as instruções de configuração.
:::

## Artigos Relacionados

- [Planos de Culto](./plans.md)
- [Fluxos de Trabalho](./workflows.md)
- [Instalando o PWA do B1.church](/docs/b1-church/getting-started/installing-pwa)
