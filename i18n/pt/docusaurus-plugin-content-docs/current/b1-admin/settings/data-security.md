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

O ChurchApps oferece suporte à conformidade com o GDPR para igrejas com membros no Reino Unido ou na União Europeia. Veja como abordamos os principais requisitos:

### Direitos do Titular dos Dados

O ChurchApps fornece ferramentas para ajudar as igrejas a responder às solicitações dos titulares de dados:

- **Direito de Acesso (Artigo 15)** — Os membros podem baixar todos os seus dados pessoais pelo portal do membro usando o botão "Baixar Meus Dados". Os administradores também podem exportar os dados de qualquer pessoa a partir da página de detalhes da pessoa.
- **Direito à Eliminação (Artigo 17)** — Os membros podem excluir sua própria conta pelo portal do membro. Os administradores podem anonimizar ou excluir permanentemente os dados de uma pessoa em todos os módulos. A anonimização substitui as informações pessoais por valores genéricos, preservando os registros agregados (totais de doações, contagens de frequência) necessários para os relatórios financeiros da igreja.
- **Direito à Limitação do Tratamento (Artigo 18)** — Os membros podem restringir o processamento de seus dados, incluindo a desativação de comunicações.
- **Direito à Portabilidade dos Dados (Artigo 20)** — O recurso de exportação de dados fornece todos os dados pessoais em um formato JSON estruturado e legível por máquina.

### Processamento de Dados

O ChurchApps atua como **processador de dados** em nome da sua igreja (o **controlador de dados**). Nosso [Acordo de Processamento de Dados](https://churchapps.org/terms) descreve as responsabilidades de cada parte, incluindo o uso de subprocessadores, procedimentos de notificação de violação e tratamento de dados na rescisão.

### Transferências Internacionais de Dados

Os dados do ChurchApps são hospedados na Amazon Web Services (AWS) nos Estados Unidos. As transferências internacionais de dados do Reino Unido/UE são cobertas pelas Cláusulas Contratuais Padrão (SCCs) da AWS sob o [Adendo de Processamento de Dados da AWS](https://aws.amazon.com/compliance/data-processing-addendum/). A hospedagem baseada na UE não é necessária quando mecanismos de transferência apropriados como SCCs estão em vigor.

### Subprocessadores

- **Amazon Web Services (AWS)** — Hospedagem de infraestrutura, armazenamento de dados e entrega de conteúdo
- **Stripe** — Processamento de pagamentos para doações (nenhum dado de cartão é armazenado pelo ChurchApps)

:::info
Para detalhes completos sobre como tratamos os dados pessoais, consulte nossa [Política de Privacidade](https://churchapps.org/privacy) e os [Termos de Serviço](https://churchapps.org/terms). Se você tiver dúvidas sobre a conformidade com o GDPR, entre em contato conosco em support@churchapps.org.
:::
