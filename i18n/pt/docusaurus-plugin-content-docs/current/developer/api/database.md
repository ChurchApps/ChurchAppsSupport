---
title: "Banco de Dados"
---

# Banco de Dados

<div class="article-intro">

A API do ChurchApps usa uma arquitetura de **banco de dados por módulo**. Cada um dos seis módulos de dados tem seu próprio banco de dados MySQL com um pool de conexões independente, fornecendo limites de dados claros enquanto mantém tudo em uma única implantação.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale **MySQL 8.0+** -- veja [Pré-requisitos](../setup/prerequisites)
- Configure strings de conexão de banco de dados em seu arquivo `.env` -- veja [Variáveis de Ambiente](../setup/environment-variables)

</div>

## Visão Geral da Arquitetura

```
Api
├── membership_db   ← Pessoas, grupos, permissões
├── attendance_db   ← Serviços, sessões, registros
├── content_db      ← Páginas, seções, elementos
├── giving_db       ← Doações, fundos, pagamentos
├── messaging_db    ← Conversas, notificações
└── doing_db        ← Tarefas, planos, atribuições
```

### Principais Decisões de Design

- **Um banco de dados por módulo** -- Cada módulo mantém seu próprio banco de dados MySQL com um pool de conexões dedicado (gerenciado por `KyselyPool`). Isso mantém os módulos desacoplados e permite a evolução de esquema independente.
- **Propriedade exclusiva** -- As tabelas de um módulo são lidas e escritas apenas pelo código do próprio módulo. Quando outro módulo precisa dos dados, ele chama o gateway do módulo proprietário em vez de consultar as tabelas diretamente -- veja [Comunicação Entre Módulos](./module-structure#cross-module-communication).
- **Padrão de repositório sem ORM** -- Todo acesso a dados passa por classes de repositório que constroem SQL digitado com o construtor de consultas Kysely contra o esquema do módulo. Isso fornece controle total sobre o desempenho e o comportamento da consulta.
- **Multi-inquilino por design** -- Toda consulta é escopo por `churchId`. Todas as tabelas incluem uma coluna `churchId`, e a camada de repositório aplica isolamento de inquilino automaticamente.

## Strings de Conexão

A conexão de banco de dados de cada módulo é configurada em `.env` usando o formato padrão de string de conexão MySQL:

```
mysql://user:password@host:port/database
```

Por exemplo, uma configuração de desenvolvimento local pode ser assim:

Cada módulo lê sua conexão de uma variável de ambiente chamada `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Em produção, as strings de conexão são armazenadas no AWS SSM Parameter Store e lidas pela classe `Environment` na inicialização.
:::

## Scripts de Esquema

Os esquemas de tabela são definidos como migrações Kysely no diretório `tools/migrations/`, organizados por módulo:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

As migrações definem criação de tabela, índices e alterações de esquema. O diretório `tools/dbScripts/` contém dados de demonstração e seed que podem ser carregados no topo do esquema.

## Inicialização de Banco de Dados

### Inicializar todos os bancos de dados

```bash
npm run initdb
```

Isso cria todos os seis bancos de dados e executa as migrações para cada um.

### Inicializar um único módulo

```bash
npm run initdb -- --module=membership
```

:::tip
Ao trabalhar em um módulo específico, você pode reinicializar apenas o banco de dados desse módulo sem afetar os outros.
:::

## Padrão de Acesso a Dados

Os repositórios constroem consultas com o construtor de consultas Kysely contra o esquema de banco de dados digitado do módulo, obtido através da função `getDb()` do módulo. Um método típico de repositório fica assim:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Os repositórios são obtidos via `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Sempre inclua `churchId` em suas consultas para manter isolamento multi-inquilino. Nunca consulte entre inquilinos a menos que você tenha uma razão específica e autorizada para fazer isso.
:::

## Referências Entre Módulos

Como os dados de cada módulo vivem em um banco de dados separado, não há chaves estrangeiras ou junções SQL através de limites de módulo. Um registro que se relaciona com dados de outro módulo armazena o id desse registro -- por exemplo, uma doação no banco de dados de doações carrega o `personId` de uma pessoa no banco de dados de membros -- e qualquer composição entre módulos acontece no código da aplicação.

Essa restrição é o que torna os limites de módulo reais: cada esquema pode evoluir independentemente, o banco de dados de um módulo pode ser movido para seu próprio servidor, e um módulo poderia até ser extraído em um serviço independente sem desemaranhar tabelas compartilhadas ou consultas entre bancos de dados.

## Artigos Relacionados

- **[Estrutura de Módulo](./module-structure)** -- Como controladores e repositórios são organizados dentro de cada módulo
- **[Configuração Local da API](./local-setup)** -- Guia de configuração completo passo a passo
