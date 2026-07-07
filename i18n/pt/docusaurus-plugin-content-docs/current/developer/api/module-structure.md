---
title: "Estrutura do Módulo"
---

# Estrutura do Módulo

<div class="article-intro">

Cada módulo da API segue uma estrutura interna consistente com controllers, repositórios, modelos e helpers. Entender essa organização torna simples navegar pela base de código e adicionar novas funcionalidades a qualquer módulo.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure a API localmente -- veja [Configuração Local da API](./local-setup)
- Revise a arquitetura de [Banco de Dados](./database) para entender a camada de acesso a dados

</div>

## Organização de Diretórios

Os módulos vivem em `src/modules/{name}/`. Um módulo típico contém quatro diretórios:

```
src/modules/{name}/
├── controllers/    ← Manipuladores de rotas (endpoints Express)
├── repositories/   ← Camada de acesso a dados (consultas SQL tipadas)
├── models/         ← Interfaces e tipos TypeScript
└── helpers/        ← Lógica de negócios específica do módulo
```

Por exemplo, o módulo membership:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Os seis módulos de dados principais -- membership, attendance, content, giving, messaging e doing -- todos seguem esse layout. Alguns módulos especializados (como reporting, que serve relatórios de cross-module e não possui dados próprios) ficam ao lado deles em `src/modules/`.

## Uma Aplicação, Muitos Módulos

A API é um **monólito modular**: módulos marcam limites de organização de código e propriedade de dados, não serviços separados. Na inicialização, todos os controllers de cada módulo são registrados em um único contêiner de injeção de dependência atrás de uma única aplicação Express, então toda a API é construída, executada e implantada como uma unidade -- as funções implantadas descritas abaixo são todos pontos de entrada nesta mesma aplicação.

Cada rota do módulo vive sob um prefixo de URL correspondente ao nome do módulo:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Isso mantém a superfície da API de cada módulo independente enquanto os clientes ainda falam com um único host.

## Controllers

Os controllers definem as rotas da API para um módulo. Cada módulo tem seu próprio controller base (por exemplo `MembershipBaseController`), que estende o `BaseController` compartilhado -- ele próprio construído sobre `CustomBaseController` do `@churchapps/apihelper`. As rotas são registradas com decoradores Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = contexto do usuário autenticado
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

O `actionWrapper` autentica a requisição e hidrata `this.repos` com os repositórios do módulo antes de executar sua ação.

### Decoradores de Rotas

| Decorador | Método HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

O decorador `@controller("/base")` define o caminho base para todas as rotas no controller.

## Repositórios

Os repositórios lidam com todas as operações de banco de dados. Não há ORM -- as consultas são escritas com o construtor de consultas Kysely, tipadas contra o schema do banco de dados do módulo. O `db/index.ts` de cada módulo expõe uma função `getDb()` que retorna a instância Kysely tipada do módulo.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Dentro de um controller, os repositórios do módulo estão disponíveis como `this.repos`. Fora dos controllers, obtenha-os através de `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Comunicação Entre Módulos

Cada módulo possui seu próprio banco de dados (veja [Banco de Dados](./database)), e um módulo nunca consulta as tabelas de outro módulo diretamente. Quando um módulo precisa de dados possuídos por outro -- por exemplo, o módulo doing resolvendo pessoas do membership -- ele vai através do **gateway** do módulo proprietário em `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Todo gateway (`MembershipModuleGateway`, `GivingModuleGateway`, e assim por diante) é uma interface TypeScript que define exatamente quais operações o módulo proprietário expõe para o resto da API. A interface é o contrato: as implementações atuais leem o banco de dados do módulo proprietário em processo, mas porque os chamadores dependem apenas da interface, uma implementação poderia ser trocada -- por exemplo, por uma que faz chamadas HTTP -- se um módulo fosse algum dia extraído para um serviço separado.

:::info
Se os dados que você precisa vivem em outro módulo e seu gateway não expõe uma operação para isso, estenda a interface do gateway em vez de alcançar os repositórios do outro módulo ou banco de dados.
:::

## Autenticação e Autorização

### Autenticação JWT

Todas as requisições são autenticadas via tokens JWT gerenciados pelo `CustomAuthProvider`. O token é validado automaticamente e o contexto do usuário autenticado (`au`) está disponível em toda ação do controller.

### Verificações de Permissão

Use `au.checkAccess()` para verificar se o usuário atual tem a permissão necessária. As permissões são constantes predefinidas que combinam um tipo de conteúdo e uma ação:

```typescript
au.checkAccess(Permissions.people.view);    // Acesso de leitura
au.checkAccess(Permissions.people.edit);    // Acesso de escrita
```

Se o usuário não tiver a permissão necessária, uma resposta de erro é retornada automaticamente.

:::warning
Sempre chame `au.checkAccess()` antes de realizar qualquer operação com dados. Nunca pule verificações de permissão, mesmo para endpoints aparentemente somente leitura.
:::

## Configuração de Ambiente

A classe `Environment` gerencia a configuração entre ambientes:

- **Desenvolvimento local:** Lê do arquivo `.env` na raiz do projeto
- **Ambientes implantados:** Lê do AWS SSM Parameter Store

```typescript
// Acessar variáveis de ambiente
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Essa abstração significa que seu código não precisa saber de onde vem a configuração.

## Funções Lambda

Quando implantada na AWS, a API é executada como seis funções Lambda:

| Função | Propósito |
|--------|-----------|
| `web` | Lida com todas as requisições HTTP da API REST |
| `socket` | Gerencia conexões WebSocket para funcionalidades em tempo real |
| `timer15Min` | Agendada a cada 30 minutos para notificações por email (o nome é histórico) |
| `timerMidnight` | Agendada diariamente para emails resumidos e manutenção |
| `timerScheduledTasks` | Agendada diariamente para automações vencidas e processamento de fluxo de trabalho atrasado |
| `timerWebhooks` | Agendada a cada minuto para entregar webhooks de saída enfileirados |

:::info
Localmente, a função `web` roda na porta 8084 e a função `socket` roda na porta 8087. As funções de timer podem ser acionadas manualmente durante o desenvolvimento.
:::

## Artigos Relacionados

- **[Banco de Dados](./database)** -- Strings de conexão, scripts de esquema e padrões de acesso a dados
- **[Configuração Local da API](./local-setup)** -- Guia completo de configuração passo a passo
- **[ApiHelper](../shared-libraries/api-helper)** -- A biblioteca compartilhada que fornece `CustomBaseController` e middleware de autenticação
