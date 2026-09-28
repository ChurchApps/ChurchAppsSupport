---
title: "Validação de Plano e Notificações"
---

# Validação de Plano e Notificações de Voluntários

<div class="article-intro">

B1 Admin verifica automaticamente seus planos em busca de problemas antes do domingo — posições não preenchidas, conflitos de agendamento e voluntários que bloquearam a data. Quando tudo parece bem, você pode notificar sua equipe inteira com um único clique.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Crie um [plano de serviço](./plans.md) e atribua voluntários a posições
- Adicione [horários de serviço](./plans.md) ao plano para que a detecção de conflitos possa verificar sobreposições
- Certifique-se de que os voluntários têm o aplicativo B1 Mobile instalado para receber notificações push

</div>

## O Painel de Validação

Cada plano tem um painel de **Validação** que é executado automaticamente conforme você o constrói. Ele verifica três coisas:

### Posições Não Preenchidas
Se uma posição requer mais pessoas do que estão atualmente atribuídas, o painel de validação lista exatamente o que ainda é necessário — por exemplo, *"Tech de Som: 1 pessoa a mais necessária."* Você pode ver de um relance se seu plano está totalmente alocado antes da semana chegar.

### Conflitos de Agendamento
Se um voluntário for atribuído a duas posições que se sobrepõem no tempo dentro do mesmo plano, o painel de validação sinaliza o conflito — por exemplo, *"Jane Silva: conflito de tempo entre Líder de Adoração e Check-in das Crianças durante o Serviço Dominical."* Isto detecta duplos agendamentos antes de se tornarem um problema de domingo pela manhã.

### Datas de Bloqueio
Os voluntários podem definir datas em que não estão disponíveis no B1 Mobile. Se alguém for atribuído a um plano que caia dentro de uma de suas datas de bloqueio, o painel de validação detecta o conflito automaticamente para que você possa encontrar um substituto.

### Conflitos Entre Planos
A validação também verifica todos os seus planos de uma vez. Se o mesmo voluntário for atribuído em dois planos diferentes que se sobrepõem no tempo — por exemplo, um serviço às 9h e um serviço às 10h que ambos terminam às 10h30 — B1 Admin sinalizará essa pessoa como duplo agendamento entre planos.

:::tip
Você não precisa fazer nada para executar a validação — ela é atualizada automaticamente cada vez que você adiciona ou altera uma atribuição. Apenas fique atento ao painel conforme você constrói o plano.
:::

## Notificando Voluntários

Quando seu plano estiver definido, você pode notificar todos os voluntários atribuídos de uma vez diretamente do painel de validação.

1. Abra o plano e role para o painel de **Validação**
2. Se houver voluntários não notificados, você verá um link mostrando quantos precisam ser notificados (por exemplo, *"Notificar 8 voluntários"*)
3. Clique no link para enviar notificações push para todos que ainda não foram notificados
4. Os voluntários recebem uma notificação em seu telefone informando que foram agendados e solicitando que confirmem sua atribuição

:::info
Apenas voluntários que ainda não foram notificados serão incluídos. Se você adicionar alguém ao plano depois, o link reaparecerá para que você possa notificar a nova adição sem re-notificar o resto da equipe.
:::

:::warning
Os voluntários devem ter a experiência mobile B1.church instalada (PWA na tela inicial deles, ou o aplicativo nativo B1 Mobile deprecado para usuários que ainda o têm) com notificações ativadas para receber notificações push. Veja [Instalando como um Aplicativo (PWA)](/docs/b1-church/getting-started/installing-pwa) para instruções de configuração.
:::

## Artigos Relacionados

- [Planos de Serviço](./plans.md)
- [Fluxos de Trabalho](./workflows.md)
- [Instalando o PWA B1.church](/docs/b1-church/getting-started/installing-pwa)
