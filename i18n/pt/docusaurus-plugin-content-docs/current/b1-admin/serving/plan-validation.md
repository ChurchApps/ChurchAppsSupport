---
title: "Validação de Plano & Notificações"
---

# Validação de Plano & Notificações de Voluntários

<div class="article-intro">

B1 Admin verifica automaticamente seus planos para problemas antes do domingo — posições não preenchidas, conflitos de agendamento e voluntários que bloquearam a data. Quando tudo se parece bom, você pode notificar toda sua equipe com um único clique.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie um [plano de serviço](./plans.md) e designe voluntários a posições
- Adicione [horários de serviço](./plans.md) ao plano para que a detecção de conflito possa verificar sobreposições
- Certifique-se que voluntários têm o aplicativo B1 Mobile instalado para receber notificações push

</div>

## O Painel de Validação

Cada plano tem um painel de **Validation** que é executado automaticamente conforme você o constrói. Ele verifica três coisas:

### Posições Não Preenchidas

Se uma posição requer mais pessoas do que estão atualmente designadas, o painel de validação lista exatamente o que ainda é necessário — por exemplo, *"Sound Tech: 1 more person needed."* Você pode ver em um relance se seu plano está completamente pessoado antes que a semana chegue.

### Conflitos de Agendamento

Se um voluntário é designado a duas posições que se sobrepõem no tempo dentro do mesmo plano, o painel de validação sinaliza o conflito — por exemplo, *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."* Isso detecta double-bookings antes que eles se tornem um problema de domingo de manhã.

### Datas de Bloqueio

Voluntários podem definir datas que eles estão indisponíveis no B1 Mobile. Se alguém é designado a um plano que cai dentro de uma de suas datas de bloqueio, o painel de validação apareça o conflito automaticamente para que você possa encontrar um substituto.

### Conflitos Entre Planos

A validação também verifica em todos os seus planos de uma vez. Se o mesmo voluntário é designado em dois planos diferentes que se sobrepõem no tempo — por exemplo, um serviço às 9am e um serviço às 10am que ambos rodam até 10:30am — B1 Admin sinalizará aquela pessoa como double-booked entre planos.

:::tip
Você não precisa fazer nada para executar validação — ela é atualizada automaticamente toda vez que você adiciona ou muda uma atribuição. Apenas mantenha um olho no painel conforme você constrói o plano.
:::

## Notificando Voluntários

Depois que seu plano é definido, você pode notificar todos os voluntários designados de uma vez diretamente do painel de validação.

1. Abra o plano e role para o painel de **Validation**
2. Se há voluntários não notificados, você verá um link mostrando quantos precisam ser notificados (por exemplo, *"Notify 8 volunteers"*)
3. Clique no link para enviar notificações push para todos que ainda não foram notificados
4. Voluntários recebem uma notificação em seu telefone deixando-os saber que foram agendados e os incentivando a confirmar sua atribuição

:::info
Apenas voluntários que ainda não foram notificados serão incluídos. Se você adicionar alguém ao plano depois, o link reaparecerá para que você possa notificar a nova adição sem re-notificar o resto da equipe.
:::

:::warning
Voluntários devem ter o aplicativo B1 Mobile instalado e notificações ativadas para receber a notificação push. Veja o guia de [Notificações](/docs/b1-mobile/community/notifications) para como voluntários podem ativar isso em seu dispositivo.
:::

## Artigos Relacionados

- [Service Plans](./plans.md)
- [Automations](./automations.md)
- [B1 Mobile Notifications](/docs/b1-mobile/community/notifications)
