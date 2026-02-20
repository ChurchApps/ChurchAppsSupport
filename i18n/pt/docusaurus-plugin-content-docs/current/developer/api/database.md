---
title: "Banco de Dados"
---

# Banco de Dados

<div class="article-intro">

A API do ChurchApps usa uma arquitetura de **banco de dados por módulo**. Cada um dos seis módulos possui seu próprio banco de dados MySQL com um pool de conexões independente, proporcionando limites de dados claros enquanto mantém tudo em uma única implantação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o **MySQL 8.0+** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure as strings de conexão do banco de dados no seu arquivo `.env` -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

## Visão Geral da Arquitetura

```
Api
├── membership_db   ← Pessoas, grupos, permissões
├── attendance_db   ← Cultos, sessões, registros
├── content_db      ← Páginas, seções, elementos
├── giving_db       ← Doações, fundos, pagamentos
├── messaging_db    ← Conversas, notificações
└── doing_db        ← Tarefas, planos, atribuições
```

### Decisões Principais de Design

- **Um banco de dados por módulo** -- Cada módulo mantém seu próprio banco de dados MySQL com um pool de conexões dedicado (`EnhancedPoolHelper`). Isso mantém os módulos desacoplados e permite evolução independente do esquema.
- **Padrão repository com SQL direto** -- Não há ORM. Todo acesso a dados passa por classes de repositório que executam SQL diretamente usando `DB.query()`. Isso dá controle total sobre o desempenho e comportamento das consultas.
- **Multi-tenant por design** -- Toda consulta é limitada por `churchId`. Todas as tabelas incluem uma coluna `churchId`, e a camada de repositório impõe o isolamento de tenant automaticamente.

## Strings de Conexão

A conexão do banco de dados de cada módulo é configurada no `.env` usando o formato padrão de string de conexão MySQL:

```
mysql://user:password@host:port/database
```

Por exemplo, uma configuração de desenvolvimento local pode ser assim:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Em produção, as strings de conexão são armazenadas no AWS SSM Parameter Store e lidas pela classe `Environment` na inicialização.
:::

## Scripts de Esquema

Os scripts de esquema do banco de dados estão localizados no diretório `tools/dbScripts/`, organizados por módulo:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Esses scripts definem a criação de tabelas, índices e quaisquer dados iniciais necessários.

## Inicialização do Banco de Dados

### Inicializar todos os bancos de dados

```bash
npm run initdb
```

Isso cria todos os seis bancos de dados e executa os scripts de esquema para cada um.

### Inicializar um único módulo

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Ao trabalhar em um módulo específico, você pode reinicializar apenas o banco de dados daquele módulo sem afetar os outros.
:::

## Padrão de Acesso a Dados

Os repositórios acessam dados através do método `DB.query()`. Um método de repositório típico se parece com isso:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Os repositórios são obtidos via `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Sempre inclua `churchId` nas suas consultas para manter o isolamento multi-tenant. Nunca consulte entre tenants a menos que você tenha um motivo específico e autorizado para fazê-lo.
:::

## Artigos Relacionados

- **[Estrutura do Módulo](./module-structure)** -- Como controllers e repositórios são organizados dentro de cada módulo
- **[Configuração Local da API](./local-setup)** -- Guia completo de configuração passo a passo
