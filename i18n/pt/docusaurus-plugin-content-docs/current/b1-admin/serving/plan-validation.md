---
title: "Validação de plano e notificações"
---

# Validação de plano e notificações de voluntários

<div class="article-intro">

O B1 Admin verifica automaticamente seus planos em busca de problemas antes do domingo — posições não preenchidas, conflitos de agendamento e voluntários que bloquearam a data. Quando tudo estiver certo, você pode notificar toda a sua equipe com um único clique.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Crie um [plano de serviço](./plans.md) e atribua voluntários às posições
- Adicione [horários de culto](./plans.md) ao plano para que a detecção de conflitos possa verificar sobreposições
- Certifique-se de que os voluntários tenham o aplicativo B1 Mobile instalado para receber notificações push

</div>

## O painel de validação

Cada plano tem um painel de **Validação** que é executado automaticamente conforme você o constrói. Ele verifica três coisas:

### Posições não preenchidas
Se uma posição requer mais pessoas do que as atualmente atribuídas, o painel de validação lista exatamente o que ainda é necessário — por exemplo, *"Técnico de som: mais 1 pessoa necessária."* Você pode ver rapidamente se seu plano está totalmente coberto antes da semana chegar.

### Conflitos de agendamento
Se um voluntário está atribuído a duas posições que se sobrepõem no tempo dentro do mesmo plano, o painel de validação sinaliza o conflito — por exemplo, *"Jane Smith: conflito de horário entre Líder de louvor e Check-in infantil durante o Culto Dominical."* Isso detecta reservas duplas antes que se tornem um problema na manhã de domingo.

### Datas bloqueadas
Os voluntários podem definir datas em que não estão disponíveis no B1 Mobile. Se alguém está atribuído a um plano que cai em uma de suas datas bloqueadas, o painel de validação exibe o conflito automaticamente para que você possa encontrar um substituto.

### Conflitos entre planos
A validação também verifica em todos os seus planos de uma vez. Se o mesmo voluntário está atribuído em dois planos diferentes que se sobrepõem no tempo — por exemplo, um culto das 9h e um culto das 10h que ambos vão até as 10h30 — o B1 Admin sinalizará essa pessoa como duplamente reservada entre os planos.

:::tip
Você não precisa fazer nada para executar a validação — ela se atualiza automaticamente toda vez que você adiciona ou altera uma atribuição. Apenas fique de olho no painel enquanto constrói o plano.
:::

## Notificando voluntários

Quando seu plano estiver pronto, você pode notificar todos os voluntários atribuídos de uma vez diretamente do painel de validação.

1. Abra o plano e role até o painel de **Validação**
2. Se houver voluntários não notificados, você verá um link mostrando quantos precisam ser notificados (ex., *"Notificar 8 voluntários"*)
3. Clique no link para enviar notificações push para todos que ainda não foram notificados
4. Os voluntários recebem uma notificação no telefone informando que foram agendados e solicitando que confirmem sua atribuição

:::info
Apenas voluntários que ainda não foram notificados serão incluídos. Se você adicionar alguém ao plano depois, o link reaparecerá para que você possa notificar a nova adição sem re-notificar o restante da equipe.
:::

:::warning
Os voluntários devem ter o aplicativo B1 Mobile instalado e as notificações habilitadas para receber a notificação push. Consulte o [guia de Notificações](/docs/b1-mobile/community/notifications) para saber como os voluntários podem habilitar isso em seus dispositivos.
:::

## Artigos relacionados

- [Planos de serviço](./plans.md)
- [Automações](./automations.md)
- [Notificações do B1 Mobile](/docs/b1-mobile/community/notifications)
