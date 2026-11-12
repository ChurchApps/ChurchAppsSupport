---
title: "Segurança de dados"
description: "Veja como a ChurchApps protege os dados da sua igreja no B1 Admin, desde senhas com hash e HTTPS até bancos de dados separados e ferramentas de dados do GDPR."
---

# Segurança de dados

<div class="article-intro">

Embora não exista um sistema perfeitamente seguro, a ChurchApps leva a segurança dos dados a sério. Esta página explica as medidas adotadas para proteger todos os dados inseridos no B1.church Admin e em outros produtos da ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Leia esta página para entender como os dados da sua igreja são protegidos
- Configure [Funções e permissões](./roles-permissions.md) para controlar quem pode acessar informações sensíveis
- Familiarize-se com a [política de privacidade](https://churchapps.org/privacy)

</div>

## Limitando os dados sensíveis armazenados {#limiting-sensitive-data-stored}

Nossa primeira abordagem é não armazenar mais dados sensíveis do que o necessário. Isso significa nunca guardar dados de cartões de crédito ou de contas bancárias usados para fazer doações. Quando um usuário faz uma doação pelo B1.church Admin ou pelo B1, os dados do cartão nunca são transmitidos a nenhum dos nossos servidores, apenas ao seu gateway de pagamento (Stripe). Assim, em caso de vazamento de dados, nenhuma informação de cartão ou conta bancária seria comprometida.

Também nunca armazenamos senhas no nosso sistema. Todas as senhas passam por um algoritmo de hash unidirecional, no qual parte dos dados é descartada, tornando impossível que qualquer pessoa recupere as senhas a partir do banco de dados, nem mesmo nós. Para verificar uma senha, o valor digitado precisa passar pelo mesmo hash unidirecional e produzir o mesmo resultado.

Depois de eliminar essas duas fontes, o único dado sensível que resta é uma lista de nomes e informações de contato.

:::tip
Como a ChurchApps nunca armazena informações de cartões de crédito ou contas bancárias, mesmo no pior cenário de vazamento de dados os detalhes de contas financeiras não seriam expostos. Somente nomes e informações de contato estariam em risco.
:::

## Seguindo boas práticas padrão {#using-standard-best-practices}

Usamos as boas práticas de segurança do setor, incluindo a criptografia de todos os dados em trânsito de e para os nossos servidores usando HTTPS. Todos os servidores são hospedados em um data center físico seguro da Amazon Web Services. Todos os servidores de banco de dados ficam atrás de um firewall e são inacessíveis pela Internet.

## Segregação de dados {#data-segregation}

Os dados são separados em bancos de dados diferentes conforme o escopo. Cada um dos nossos módulos (Membresia, Doações, Presença, Mensagens, Atividades e Conteúdo) é um silo independente de dados, com seus próprios bancos de dados. Se um deles for comprometido, a utilidade dos dados fica limitada sem que os outros também sejam comprometidos. Por exemplo, se a API/banco de dados de Doações fosse comprometida, um agente mal-intencionado poderia obter acesso a uma lista de doações e datas (mas nunca dados de cartão ou de conta bancária). No entanto, não teria acesso a quais usuários fizeram as doações nem a quais igrejas elas se destinavam, pois esses dados ficam no banco de dados de Membresia, separado.

:::info
A segregação de dados significa que comprometer um sistema não dá acesso a todos os dados da igreja. Cada API opera de forma independente, com seu próprio banco de dados, limitando o impacto de qualquer possível vazamento.
:::

## Acesso limitado {#limited-access}

O acesso aos servidores de produção é estritamente restrito aos administradores de servidores que precisam dele. Atualmente são duas pessoas, que também são membros da diretoria. Desenvolvedores, voluntários e os demais membros da diretoria não têm permissão de acesso aos servidores de produção.

## Política de privacidade {#privacy-policy}

Os seus dados são seus e nunca serão vendidos a terceiros. Você pode ler nossa política de privacidade completa [aqui](https://churchapps.org/privacy).

## Conformidade com o GDPR {#gdpr-compliance}

A ChurchApps oferece suporte à conformidade com o GDPR para igrejas com membros no Reino Unido ou na União Europeia. Veja como atendemos aos principais requisitos:

### Direitos do titular dos dados {#data-subject-rights}

A ChurchApps oferece ferramentas para ajudar as igrejas a responder às solicitações dos titulares dos dados:

- **Direito de acesso (Artigo 15)** — Os membros podem solicitar uma cópia dos seus dados pessoais entrando em contato com a igreja. Os administradores podem exportar os dados de qualquer pessoa com **Exportar dados** no cadastro da pessoa, ou na seção **Gestão de dados** do formulário de edição da pessoa, no B1.church Admin.
- **Direito ao apagamento (Artigo 17)** — Os membros podem solicitar a exclusão da própria conta diretamente na página de Perfil (veja [Revisando solicitações de exclusão de conta](../profile/account-deletion.md)), ou entrando em contato diretamente com a igreja. Os administradores também podem anonimizar os dados de uma pessoa em todos os módulos pela seção **Gestão de dados** na página de detalhes da pessoa. A anonimização substitui as informações pessoais por valores genéricos, preservando os registros agregados (totais de doações, contagens de presença) necessários para os relatórios financeiros da igreja.
- **Direito à restrição do tratamento (Artigo 18)** — Os membros podem solicitar a restrição do tratamento entrando em contato com a igreja, inclusive optando por não receber comunicações.
- **Direito à portabilidade dos dados (Artigo 20)** — Os administradores podem exportar dados pessoais em formato JSON estruturado e legível por máquina, em nome dos membros que solicitarem.

### Usando as ferramentas de gestão de dados {#using-the-data-management-tools}

Para acessar as ferramentas de dados do GDPR de uma pessoa:

1. Acesse **Pessoas** no B1 Admin e abra o cadastro da pessoa.
2. Clique em **Editar** para entrar no modo de edição.
3. Role até a seção **Gestão de dados** (recolhida por padrão) e clique para expandi-la.
4. Use **Exportar dados** para baixar um arquivo JSON com todos os dados armazenados sobre essa pessoa. (O mesmo link **Exportar dados** também está entre as ações sob o nome da pessoa, sem precisar abrir o formulário de edição.)
5. Use **Anonimizar** para substituir as informações pessoais por valores genéricos. Você será solicitado a digitar `ANONYMIZE` para confirmar — esta ação não pode ser desfeita.

:::warning
A anonimização é permanente. Os totais de doações e as contagens de presença são preservados para fins de relatórios financeiros, mas todos os identificadores pessoais (nome, e-mail, endereço etc.) são removidos e não podem ser recuperados.
:::

### Tratamento de dados {#data-processing}

A ChurchApps atua como **operadora de dados** em nome da sua igreja (a **controladora de dados**). Nosso [Contrato de Tratamento de Dados](https://churchapps.org/terms) define as responsabilidades de cada parte, incluindo o uso de suboperadores, os procedimentos de notificação de violações e o tratamento dos dados na rescisão.

### Transferências internacionais de dados {#international-data-transfers}

Os dados da ChurchApps são hospedados na Amazon Web Services (AWS) nos Estados Unidos. As transferências internacionais de dados do Reino Unido/UE são cobertas pelas Cláusulas Contratuais Padrão (SCCs) da AWS, no âmbito do [Adendo de Tratamento de Dados da AWS](https://aws.amazon.com/compliance/data-processing-addendum/). O Adendo de Tratamento de Dados da AWS é incorporado automaticamente aos Termos de Serviço da AWS para todos os clientes. A hospedagem na UE não é exigida quando há mecanismos de transferência adequados, como as SCCs.

Para detalhes sobre como os riscos da transferência foram avaliados, veja a [Avaliação de Risco de Transferência](./transfer-risk-assessment.md).

### Suboperadores {#sub-processors}

- **Amazon Web Services (AWS)** — Hospedagem da infraestrutura, armazenamento de dados e entrega de conteúdo
- **Stripe** — Processamento de pagamentos das doações (a ChurchApps não armazena dados de cartão)

:::info
Para detalhes completos sobre como tratamos os dados pessoais, veja nossa [Política de privacidade](https://churchapps.org/privacy) e nossos [Termos de serviço](https://churchapps.org/terms). Se tiver dúvidas sobre a conformidade com o GDPR, entre em contato pelo e-mail support@churchapps.org.
:::
