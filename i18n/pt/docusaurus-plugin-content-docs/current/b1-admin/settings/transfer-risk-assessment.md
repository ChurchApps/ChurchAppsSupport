---
title: "Avaliação de Risco de Transferência"
---

# Avaliação de Risco de Transferência

<div class="article-intro">

Este documento registra a avaliação do ChurchApps de riscos associados a transferências internacionais de dados pessoais do Reino Unido/EEA para os Estados Unidos, conforme exigido sob GDPR do Reino Unido e GDPR da UE. Este é um registro de conformidade interna mantido pelo ChurchApps como processador de dados.

</div>

**Última revisão:** Abril de 2026

## 1. Detalhes da Transferência

| Item | Detalhe |
|---|---|
| **Exportador de Dados** | Igrejas que usam ChurchApps (Controladores de Dados) localizadas no Reino Unido/EEA |
| **Importador de Dados** | ChurchApps (Processador de Dados), operando nos Estados Unidos |
| **Categorias de Titulares de Dados** | Membros da igreja, participantes, visitantes, doadores, voluntários, crianças (gerenciadas por pais/administradores) |
| **Categorias de Dados Pessoais** | Nomes, endereços de e-mail, números de telefone, endereços postais, datas de nascimento, gênero, estado civil, fotos de perfil, registros de doações, registros de presença, associações a grupos, atribuições de voluntários, histórico de mensagens |
| **Dados Sensíveis** | Nenhum intencionalmente coletado. Nenhum dado de saúde, dados biométricos ou registros criminais são armazenados. Detalhes de contas financeiras (cartões de crédito, contas bancárias) nunca são armazenados pelo ChurchApps — estes são tratados diretamente pelo Stripe. |
| **Finalidade da Transferência** | Fornecimento de serviços de software de gerenciamento de igrejas (gerenciamento de membros, doações, rastreamento de presença, comunicações, agendamento de voluntários, registro de eventos) |
| **País de Destino** | Estados Unidos |
| **Mecanismo de Transferência** | Cláusulas Contratuais Padrão da UE (SCCs) e Adenda de Transferência de Dados Internacional do Reino Unido (IDTA), incorporadas através da Adenda de Processamento de Dados do AWS |

## 2. Sub-Processadores

| Sub-Processador | Papel | Localização | Mecanismo de Transferência |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hospedagem de infraestrutura, armazenamento de dados, entrega de conteúdo (região us-east-2) | Estados Unidos | AWS DPA com SCCs (automaticamente incluído nos Termos de Serviço do AWS) |
| **Stripe** | Processamento de pagamentos para doações | Estados Unidos | Stripe DPA com SCCs |

Os dados de cartão de crédito e conta bancária são transmitidos diretamente do navegador do usuário para Stripe e nunca são armazenados em ou transmitidos através dos servidores ChurchApps.

## 3. Avaliação de Risco

### 3.1 Criptografia

- **Em trânsito:** Todos os dados são criptografados usando TLS/HTTPS para todas as comunicações entre usuários e servidores ChurchApps.
- **Em repouso:** Os dados armazenados no AWS são criptografados em repouso usando criptografia gerenciada pelo AWS.

### 3.2 Controles de Acesso

- O acesso do servidor de produção é limitado a dois indivíduos que são membros do conselho de administração do ChurchApps.
- Desenvolvedores, voluntários e outros membros do conselho não têm acesso aos servidores de produção ou bancos de dados.
- Os servidores de banco de dados estão protegidos por um firewall e não são diretamente acessíveis pela internet.
- Os dados da igreja são logicamente separados — cada igreja só pode acessar seus próprios dados através de controles de acesso no nível da aplicação.

### 3.3 Segregação de Dados

Os dados são distribuídos entre seis bancos de dados independentes (Associação, Doações, Presença, Mensagens, Fazendo, Conteúdo). O comprometimento de um banco de dados não expõe dados dos outros. Por exemplo, o banco de dados de Doações contém valores e datas de doações, mas não os nomes ou informações de contato dos doadores (armazenados em Associação).

### 3.4 Minimização de Dados

- Nenhuma informação de cartão de crédito ou conta bancária é armazenada (tratada pelo Stripe).
- As senhas são armazenadas usando hash unidirecional e não podem ser recuperadas.
- As igrejas controlam quais dados elas coletam de seus membros.

### 3.5 Direitos do Titular de Dados

O ChurchApps fornece ferramentas técnicas que permitem às igrejas cumprir pedidos de titulares de dados:

- **Acesso e Portabilidade:** Exportação completa de dados em formato JSON legível por máquina.
- **Exclusão:** Anonimização em todos os seis bancos de dados, substituindo dados pessoais por valores genéricos enquanto preserva registros agregados necessários para relatórios financeiros.
- **Restrição:** O status de associação inativa exclui indivíduos de pesquisa, diretório, relatórios e mensagens enquanto retém seu registro.
- **Retificação:** Membros e administradores podem editar informações pessoais através da aplicação.

### 3.6 Notificação de Violação

O ChurchApps se compromete a notificar as igrejas afetadas dentro de 72 horas após tomar conhecimento de uma violação de dados pessoais, conforme documentado nos [Termos de Serviço](https://churchapps.org/terms) (Seção 11.6).

### 3.7 Risco de Acesso do Governo dos EUA

O risco principal associado a dados hospedados nos EUA é o acesso potencial pelas autoridades governamentais dos EUA sob FISA Seção 702 ou Ordem Executiva 12333. Este risco é avaliado como **baixo** pelos seguintes motivos:

- O ChurchApps processa dados de associação e presença de igrejas, não dados de valor de inteligência.
- Os titulares de dados são membros e participantes de igrejas — não categorias normalmente alvo de programas de vigilância.
- Nenhum dado pessoal sensível (saúde, contas financeiras, opiniões políticas) é armazenado.
- A DPA do AWS inclui compromissos relativos a pedidos de acesso do governo e relatórios de transparência.
- O Quadro de Privacidade de Dados UE-EUA (estabelecido em 2023) fornece salvaguardas adicionais para transferências de dados para organizações dos EUA certificadas.

## 4. Conclusão Geral de Risco

O risco aos titulares de dados desta transferência internacional é avaliado como **baixo**. A combinação de:

- Cláusulas Contratuais Padrão como mecanismo legal de transferência
- Criptografia em trânsito e em repouso
- Controles de acesso rigorosos com apenas dois indivíduos autorizados
- Segregação de dados em bancos de dados independentes
- Nenhum armazenamento de detalhes de contas financeiras
- Baixa sensibilidade e baixo valor de inteligência dos dados processados
- Ferramentas técnicas para exercer todos os direitos do titular de dados

fornece medidas suplementares adequadas para garantir que os dados transferidos recebam um nível de proteção essencialmente equivalente ao garantido dentro do Reino Unido/EEA.

## 5. Cronograma de Revisão

Esta avaliação será revisada anualmente ou quando houver uma alteração material no processamento de dados, sub-processadores ou quadro legal governando transferências de dados internacionais.
