---
title: "Segurança de Dados"
---

# Segurança de Dados

<div class="article-intro">

Embora não exista tal coisa como um sistema perfeitamente seguro, ChurchApps leva segurança de dados a sério. Esta página explica as medidas tomadas para proteger todos os dados inseridos no B1.church Admin e outros produtos da ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Revise esta página para entender como os dados de sua igreja são protegidos
- Configure [Funções e Permissões](./roles-permissions.md) para controlar quem pode acessar informações sensíveis
- Familiarize-se com nossa [política de privacidade](https://churchapps.org/privacy)

</div>

## Limitando Dados Sensíveis Armazenados

Nossa primeira abordagem é não armazenar mais dados sensíveis do que o necessário. Isso significa nunca armazenar qualquer detalhe de cartão de crédito ou conta bancária usado para fazer doações. Quando um usuário faz uma doação usando B1.church Admin ou B1, os dados do cartão de crédito nunca são transmitidos para nenhum de nossos servidores, apenas seu gateway de pagamento (Stripe). Isso significa na eventualidade de uma violação de dados, nenhuma informação de cartão de crédito ou banco seria comprometida.

Nós também nunca armazenamos senhas em nosso sistema. Todas as senhas são processadas através de um algoritmo de hashing unidirecional em que alguns dos dados são destruídos, tornando impossível para qualquer pessoa recuperar senhas do banco de dados, até mesmo para nós. Para verificar senhas, o valor inserido deve passar através do mesmo hash unidirecional e produzir o mesmo resultado.

Depois de remover essas duas fontes o único dado sensível que permanece é uma lista de nomes e informações de contato.

:::tip
Como ChurchApps nunca armazena informações de cartão de crédito ou banco, até mesmo uma violação de dados no pior caso não exporia detalhes de contas financeiras. Apenas nomes e informações de contato estariam em risco.
:::

## Usando Boas Práticas Padrão

Usamos as melhores práticas padrão da indústria para segurança, incluindo criptografar todos os dados em trânsito para e dos nossos servidores usando HTTPS. Todos os servidores estão hospedados em um centro de dados físico seguro com Amazon Web Services. Todos os servidores de banco de dados são armazenados atrás de um firewall e não são acessíveis da Internet.

## Segregação de Dados

Dados são separados em diferentes bancos de dados baseados em escopo. Cada uma de nossas APIs (Membership, Giving, Attendance, Messaging, Doing e Lessons) são silos independentes de dados com seus próprios bancos de dados. Se um deles é comprometido, a utilidade dos dados é limitada sem que outros também sejam comprometidos. Por exemplo, se o banco de dados de API/Giving fosse comprometido, um ator mal-intencionado poderia potencialmente ganhar acesso a uma lista de doações e datas (mas nunca dados de cartão/banco). No entanto, eles não teriam acesso a quais usuários fizeram as doações ou para quais igrejas elas eram já que aquele dado é armazenado no banco de dados de Membership separado.

:::info
Segregação de dados significa que comprometer um sistema não dá acesso a todos os dados da igreja. Cada API opera independentemente com seu próprio banco de dados, limitando o impacto de qualquer violação potencial.
:::

## Acesso Limitado

Acesso aos servidores de produção é estritamente limitado aos administradores de servidor que requerem acesso. Isso é atualmente dois indivíduos que também são membros do conselho. Desenvolvedores, voluntários e outros membros do conselho não têm permissão para acesso aos servidores de produção.

## Política de Privacidade

Seus dados são seus e nunca serão vendidos a terceiros. Você pode ler nossa política de privacidade completa [aqui](https://churchapps.org/privacy).

## Conformidade GDPR

ChurchApps suporta conformidade GDPR para igrejas com membros no Reino Unido ou União Europeia. Aqui está como abordamos os requisitos-chave:

### Direitos de Sujeito de Dados

ChurchApps fornece ferramentas para ajudar igrejas a responder a solicitações de sujeitos de dados:

- **Right of Access (Article 15)** — Membros podem solicitar uma cópia de seus dados pessoais contacting sua iglesia. Administradores podem exportar dados de qualquer pessoa da seção **Data Management** na página de detalhe de pessoa no B1.church Admin.
- **Right to Erasure (Article 17)** — Membros podem solicitar deletação de conta contacting sua iglesia. Administradores podem anonimizar dados de uma pessoa em todos os módulos da seção **Data Management** na página de detalhe de pessoa. Anonimização substitui informação pessoal com valores genéricos enquanto preserva registros agregados (totais de doação, contagens de presença) necessários para relatório financeiro de igre ja.
- **Right to Restriction (Article 18)** — Membros podem solicitar restrição de processamento contacting sua iglesia, incluindo exclusão de comunicações.
- **Right to Data Portability (Article 20)** — Administradores podem exportar dados pessoais em um formato JSON estruturado, legível por máquina em nome de membros que solicitam.

### Usando Ferramentas de Gerenciamento de Dados

Para acessar ferramentas GDPR para um indivíduo:

1. Vá até **People** no B1 Admin e abra o registro da pessoa.
2. Clique em **Edit** para entrar em modo de edição.
3. Role para baixo até a seção **Data Management** (colapsada por padrão) e clique para expandi-la.
4. Use **Export Data** para baixar um arquivo JSON de todos os dados armazenados para aquela pessoa.
5. Use **Anonymize** para substituir informação pessoal com valores genéricos. Você será solicitado a digitar `ANONYMIZE` para confirmar — esta ação não pode ser desfeita.

:::warning
Anonimização é permanente. Totais de doação e contagens de presença são preservados para fins de relatório financeiro, mas todos os identificadores pessoais (nome, email, endereço, etc.) são removidos e não podem ser recuperados.
:::

### Processamento de Dados

ChurchApps atua como um **processador de dados** em nome de sua chiesa (o **controlador de dados**). Nosso [Data Processing Agreement](https://churchapps.org/terms) delineia as responsabilidades de cada parte, incluindo uso de subprocessadores, procedimentos de notificação de violação e manipulação de dados após encerramento.

### Transferências Internacionais de Dados

Os dados de ChurchApps estão hospedados na Amazon Web Services (AWS) nos Estados Unidos. Transferências de dados internacionais do Reino Unido/UE são cobertas pelas Cláusulas Contratuais Padrão da AWS (SCCs) sob o [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). O AWS DPA é automaticamente incorporado nos AWS Service Terms para todos os clientes. Hospedagem baseada em EU não é necessária quando mecanismos de transferência apropriados como SCCs estão em vigor.

Para detalhes sobre como riscos de transferência foram avaliados, veja a [Transfer Risk Assessment](./transfer-risk-assessment.md).

### Subprocessadores

- **Amazon Web Services (AWS)** — Hospedagem de infraestrutura, armazenamento de dados e entrega de conteúdo
- **Stripe** — Processamento de pagamento para doações (nenhum dado de cartão é armazenado por ChurchApps)

:::info
Para detalhes completos sobre como manipulamos dados pessoais, veja nossa [Privacy Policy](https://churchapps.org/privacy) e [Terms of Service](https://churchapps.org/terms). Se você tem questões sobre conformidade GDPR, contact-nos em support@churchapps.org.
:::
