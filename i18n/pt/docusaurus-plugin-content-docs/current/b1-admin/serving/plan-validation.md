---
title: "Validação de Planos e Notificações"
---

# Validação de Planos e Notificação de Voluntários

<div class="article-intro">

O B1 Admin verifica automaticamente seus planos em busca de problemas antes do domingo: posições não preenchidas, conflitos de agenda e voluntários que bloquearam a data. Quando tudo estiver certo, você pode notificar toda a equipe com um único clique.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie um [plano de culto](./plans.md) e atribua voluntários às posições
- Adicione [horários de culto](./plans.md) ao plano para que a detecção de conflitos possa verificar sobreposições
- Certifique-se de que os voluntários têm o aplicativo B1 Mobile instalado para receber notificações push

</div>

## O painel de validação

Todo plano tem um painel **Validação** que é executado automaticamente enquanto você o monta. Ele verifica três coisas:

### Posições não preenchidas
Se uma posição exige mais pessoas do que as que estão atribuídas no momento, o painel de validação lista exatamente o que ainda falta, por exemplo: *"Técnico de som: falta 1 pessoa."* Assim você vê, de relance, se o plano está totalmente preenchido antes da semana chegar.

### Conflitos de agenda
Se um voluntário está atribuído a duas posições que se sobrepõem no tempo dentro do mesmo plano, o painel de validação sinaliza o conflito, por exemplo: *"Jane Smith: conflito de horário entre Líder de Louvor e Check-in Infantil durante o Culto de Domingo."* Isso evita duplas reservas antes que se tornem um problema no domingo de manhã.

### Datas de bloqueio
Os voluntários podem definir datas em que não estão disponíveis no B1 Mobile. Se alguém está atribuído a um plano que cai em uma dessas datas de bloqueio, o painel de validação exibe o conflito automaticamente para que você possa encontrar um substituto.

### Conflitos entre planos
A validação também verifica todos os seus planos ao mesmo tempo. Se o mesmo voluntário está atribuído a dois planos diferentes que se sobrepõem no tempo, por exemplo, um culto às 9h e outro às 10h que terminam às 10h30, o B1 Admin sinalizará essa pessoa como reservada em duplicidade entre planos.

:::tip
Você não precisa fazer nada para executar a validação: ela é atualizada automaticamente sempre que você adiciona ou altera uma atribuição. Basta acompanhar o painel enquanto monta o plano.
:::

## Notificando voluntários

Quando o plano estiver definido, você pode notificar todos os voluntários atribuídos de uma só vez, diretamente pelo painel de validação.

1. Abra o plano e role até o painel **Validação**
2. Se houver voluntários não notificados, você verá um link indicando quantos precisam ser notificados (por exemplo, *"Notificar 8 voluntários"*)
3. Clique no link para enviar notificações push a todos que ainda não foram notificados
4. Os voluntários recebem uma notificação no celular informando que foram escalados e pedindo que confirmem a atribuição

:::info
Somente voluntários que ainda não foram notificados serão incluídos. Se você adicionar alguém ao plano depois, o link reaparecerá para que você possa notificar o novo integrante sem notificar novamente o restante da equipe.
:::

### Planos com um fluxo de confirmação

Se as configurações do plano indicarem um [fluxo de confirmação](./workflows.md#serving-assignment-confirmations), o painel mostra *"Novas solicitações usam o fluxo de confirmação. Os alertas no aplicativo continuam ativados. Os acompanhamentos param quando cada solicitação é aceita ou recusada."* Nesse caso:

- O link de notificação conta apenas os voluntários que ainda não foram notificados e que ainda não responderam.
- Ao clicar nele, é enviado o alerta habitual no aplicativo e é criado um cartão por solicitação no quadro do fluxo. Em seguida, o fluxo envia os acompanhamentos por e-mail e mensagem de texto e, se necessário, encaminha a solicitação para alguém que ligue para a pessoa.
- O plano precisa estar publicado (não em modo lápis) e o fluxo precisa estar ativo. Caso contrário, o painel mostra *"Não foi possível emitir as solicitações. Verifique se o fluxo selecionado está ativo e se o plano está publicado e tente novamente."*

:::warning
Os voluntários precisam ter a experiência móvel do B1.church instalada (PWA na tela inicial, ou o aplicativo nativo B1 Mobile, descontinuado, para quem ainda o usa) com as notificações ativadas para receber notificações push. Veja [Instalando como Aplicativo (PWA)](/docs/b1-church/getting-started/installing-pwa) para as instruções de configuração.
:::

## Artigos relacionados

- [Planos de Serviço](./plans.md)
- [Fluxos de Trabalho](./workflows.md)
- [Instalando o PWA do B1.church](/docs/b1-church/getting-started/installing-pwa)
