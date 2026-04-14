---
title: "Avaliação de Risco de Transferência"
---

# Avaliação de Risco de Transferência

<div class="article-intro">

Este documento registra a avaliação de ChurchApps de riscos associados com transferências internacionais de dados pessoais do Reino Unido/EEA para os Estados Unidos, conforme exigido sob UK GDPR e EU GDPR. Este é um registro de conformidade interno mantido por ChurchApps como processador de dados.

</div>

**Última revisão:** April 2026

## 1. Detalhes de Transferência

| Item | Detalhe |
|---|---|
| **Data Exporter** | Igrejas usando ChurchApps (Data Controllers) localizadas no Reino Unido/EEA |
| **Data Importer** | ChurchApps (Data Processor), operando dos Estados Unidos |
| **Categories of Data Subjects** | Membros da iglesia, frequentadores, visitantes, doadores, voluntários, crianças (gerenciadas por pais/administradores) |
| **Categories of Personal Data** | Nomes, endereços de email, números de telefone, endereços postais, datas de nascimento, sexo, estado civil, fotos de perfil, registros de doação, registros de presença, filiações a grupos, atribuições de voluntários, histórico de mensagens |
| **Sensitive Data** | Nenhum intencionalmente coletado. Nenhum dado de saúde, dados biométricos ou registros criminais são armazenados. Detalhes de contas financeiras (cartões de crédito, contas bancárias) nunca são armazenados por ChurchApps — estes são manipulados diretamente por Stripe. |
| **Purpose of Transfer** | Fornecendo serviços de software de gerenciamento de iglesia (gerenciamento de membros, doações, rastreamento de presença, comunicações, agendamento de voluntários, registro de evento) |
| **Destination Country** | Estados Unidos |
| **Transfer Mechanism** | EU Standard Contractual Clauses (SCCs) e UK International Data Transfer Addendum (IDTA), incorporados via AWS Data Processing Addendum |

## 2. Subprocessadores

| Sub-Processor | Role | Location | Transfer Mechanism |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hospedagem de infraestrutura, armazenamento de dados, entrega de conteúdo (região us-east-2) | Estados Unidos | AWS DPA com SCCs (automaticamente incluído nos AWS Service Terms) |
| **Stripe** | Processamento de pagamento para doações | Estados Unidos | Stripe DPA com SCCs |

Dados de cartão de crédito e conta bancária são transmitidos diretamente do navegador do usuário para Stripe e nunca são armazenados em ou transmitidos através de servidores ChurchApps.

## 3. Avaliação de Risco

### 3.1 Criptografia

- **Em trânsito:** Todos os dados são criptografados usando TLS/HTTPS para todas as comunicações entre usuários e servidores ChurchApps.
- **Em repouso:** Dados armazenados em AWS são criptografados em repouso usando criptografia gerenciada por AWS.

### 3.2 Controles de Acesso

- Acesso a servidores de produção é limitado a dois indivíduos que são membros do conselho de diretores do ChurchApps.
- Desenvolvedores, voluntários e outros membros do conselho não têm acesso aos servidores ou bancos de dados de produção.
- Servidores de banco de dados estão atrás de um firewall e não são diretamente acessíveis da internet.
- Dados de iglesia são logicamente separados — cada iglesia pode apenas acessar seus próprios dados através de controles de acesso em nível de aplicação.

### 3.3 Segregação de Dados

Dados são distribuídos em seis bancos de dados independentes (Membership, Giving, Attendance, Messaging, Doing, Content). Compromisso de um banco de dados não expõe dados dos outros. Por exemplo, o banco de dados de Giving contém valores de doação e datas mas não os nomes ou informações de contato dos doadores (armazenados em Membership).

### 3.4 Data Minimization

- Nenhuma informação de cartão de crédito ou conta bancária é armazenada (manipulada por Stripe).
- Senhas são armazenadas usando hashing unidirecional e não podem ser recuperadas.
- Igrejas controlam que dados eles coletam de seus membros.

### 3.5 Direitos de Sujeito de Dados

ChurchApps fornece ferramentas técnicas habilitando igrejas a cumprir solicitações de sujeitos de dados:

- **Access & Portability:** Exportação completa de dados em formato JSON legível por máquina.
- **Erasure:** Anonimização em todos os seis bancos de dados, substituindo dados pessoais com valores genéricos enquanto preserva registros agregados necessários para relatório financeiro.
- **Restriction:** Status de membr inativo exclui indivíduos de pesquisa, diretório, relatórios e mensagens enquanto retém seu registro.
- **Rectification:** Membros e administradores podem editar informação pessoal através do aplicativo.

### 3.6 Notificação de Violação

ChurchApps se compromete a notificar igrejas afetadas em 72 horas de ficar ciente de uma violação de dados pessoais, como documentado nos [Terms of Service](https://churchapps.org/terms) (Section 11.6).

### 3.7 Risco de Acesso do Governo Americano

O risco primário associado com dados hospedados nos EUA é acesso potencial por autoridades governamentais dos EUA sob FISA Section 702 ou Executive Order 12333. Este risco é avaliado como **baixo** pelos seguintes motivos:

- ChurchApps processa dados de membros de iglesia e presença, não dados de valor de inteligência.
- Sujeitos de dados são membros de iglesia e frequentadores — não categorias tipicamente alvo por programas de vigilância.
- Nenhum dado pessoal sensível (saúde, contas financeiras, opiniões políticas) é armazenado.
- DPA da AWS inclui compromissos sobre solicitações de acesso governamental e relatório de transparência.
- O EU-US Data Privacy Framework (estabelecido 2023) fornece salvaguardas adicionais para transferências de dados para organizações certificadas dos EUA.

## 4. Conclusão Geral de Risco

O risco para sujeitos de dados dessa transferência internacional é avaliado como **baixo**. A combinação de:

- Standard Contractual Clauses como mecanismo de transferência legal
- Criptografia em trânsito e em repouso
- Controles de acesso rigorosos com apenas dois indivíduos autorizados
- Segregação de dados em bancos de dados independentes
- Nenhum armazenamento de detalhes de contas financeiras
- Baixa sensibilidade e baixo valor de inteligência dos dados processados
- Ferramentas técnicas para exercer todos os direitos de sujeitos de dados

fornece medidas suplementares adequadas para garantir que os dados transferidos receberuma nível de proteção essencialmente equivalente àquele garantido dentro do Reino Unido/EEA.

## 5. Cronograma de Revisão

Esta avaliação será revisada anualmente ou quando há uma mudança material ao processamento de dados, subprocessadores ou contexto legal governando transferências internacionais de dados.
