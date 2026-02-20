---
title: "Segurança de Dados"
---

# Segurança de Dados

<div class="article-intro">

Embora não exista um sistema perfeitamente seguro, o ChurchApps leva a segurança de dados a sério. Esta página explica as medidas tomadas para proteger todos os dados inseridos no B1.church Admin e outros produtos ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Revise esta página para entender como os dados da sua igreja são protegidos
- Configure [Funções e Permissões](./roles-permissions.md) para controlar quem pode acessar informações sensíveis
- Familiarize-se com a [política de privacidade](https://churchapps.org/privacy)

</div>

## Limitação de dados sensíveis armazenados

Nossa primeira abordagem é não armazenar mais dados sensíveis do que o necessário. Isso significa nunca armazenar detalhes de cartão de crédito ou conta bancária usados para doações. Quando um usuário faz uma doação usando o B1.church Admin ou o B1, os dados do cartão de crédito nunca são transmitidos para nenhum dos nossos servidores, apenas para o seu gateway de pagamento (Stripe). Isso significa que, no caso de uma violação de dados, nenhum dado de cartão de crédito ou bancário seria comprometido.

Também nunca armazenamos senhas em nosso sistema. Todas as senhas são processadas por meio de um algoritmo de hashing unidirecional no qual parte dos dados é destruída, tornando impossível para qualquer pessoa recuperar senhas do banco de dados, mesmo para nós. Para verificar senhas, o valor inserido deve passar pelo mesmo hash unidirecional e produzir o mesmo resultado.

Após remover essas duas fontes, os únicos dados sensíveis que permanecem são uma lista de nomes e informações de contato.

:::tip
Como o ChurchApps nunca armazena informações de cartão de crédito ou bancárias, mesmo no pior cenário, uma violação de dados não exporia detalhes de contas financeiras. Apenas nomes e informações de contato estariam em risco.
:::

## Uso de melhores práticas padrão

Usamos as melhores práticas padrão do setor para segurança, incluindo a criptografia de todos os dados em trânsito de e para nossos servidores usando HTTPS. Todos os servidores são hospedados em um datacenter físico seguro com a Amazon Web Services. Todos os servidores de banco de dados estão armazenados atrás de um firewall e são inacessíveis pela Internet.

## Segregação de dados

Os dados são separados em diferentes bancos de dados com base no escopo. Cada uma das nossas APIs (Membership, Giving, Attendance, Messaging, Doing e Lessons) são silos independentes de dados com seus próprios bancos de dados. Se um deles for comprometido, a utilidade dos dados é limitada sem que outros também sejam comprometidos. Por exemplo, se a API/banco de dados Giving fosse comprometido, um agente malicioso poderia potencialmente obter acesso a uma lista de doações e datas (mas nunca dados de cartão/banco). No entanto, não teria acesso a quais usuários fizeram as doações ou para quais igrejas, pois esses dados são armazenados no banco de dados separado Membership.

:::info
A segregação de dados significa que comprometer um sistema não dá acesso a todos os dados da igreja. Cada API opera independentemente com seu próprio banco de dados, limitando o impacto de qualquer violação potencial.
:::

## Acesso limitado

O acesso aos servidores de produção é estritamente limitado aos administradores de servidor que necessitam de acesso. Atualmente, são duas pessoas que também são membros do conselho. Desenvolvedores, voluntários e outros membros do conselho não têm permissão para acessar os servidores de produção.

## Política de privacidade

Seus dados são seus e nunca serão vendidos a terceiros. Você pode ler nossa política de privacidade completa [aqui](https://churchapps.org/privacy).

## Conformidade com o GDPR

O ChurchApps atualmente não suporta conformidade com o GDPR devido aos requisitos técnicos e financeiros significativos envolvidos. O GDPR exigiria que hospedássemos dados em servidores baseados na UE e construíssemos uma infraestrutura separada para rotear e armazenar dados regionalmente, efetivamente dobrando nossos custos de hospedagem e desenvolvimento. Como uma organização sem fins lucrativos que oferece ferramentas gratuitas para igrejas, não temos os recursos para suportar isso neste momento.

:::warning
Se sua igreja tem membros na União Europeia, esteja ciente de que o ChurchApps atualmente não atende aos requisitos do GDPR. Consulte seu consultor jurídico sobre obrigações de conformidade antes de armazenar dados de membros da UE.
:::
