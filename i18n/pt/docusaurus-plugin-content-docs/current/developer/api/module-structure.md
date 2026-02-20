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

Todo módulo fica em `src/modules/{name}/` e contém quatro diretórios:

```
src/modules/{name}/
├── controllers/    ← Manipuladores de rotas (endpoints Express)
├── repositories/   ← Camada de acesso a dados (SQL direto)
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
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Controllers

Os controllers definem as rotas da API para um módulo. Eles estendem `CustomBaseController` do `@churchapps/apihelper` e usam decoradores Inversify para registro de rotas.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = contexto do usuário autenticado
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... lógica de salvamento
    });
  }
}
```

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

Os repositórios lidam com todas as operações de banco de dados usando SQL direto via `DB.query()`. Não há ORM -- você escreve SQL diretamente.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // Lógica de INSERT ou UPDATE
  }
}
```

Acesse os repositórios através do `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## Autenticação e Autorização

### Autenticação JWT

Todas as requisições são autenticadas via tokens JWT gerenciados pelo `CustomAuthProvider`. O token é validado automaticamente e o contexto do usuário autenticado (`au`) está disponível em toda ação do controller.

### Verificações de Permissão

Use `au.checkAccess()` para verificar se o usuário atual tem a permissão necessária:

```typescript
au.checkAccess("People", "View");    // Acesso de leitura
au.checkAccess("People", "Edit");    // Acesso de escrita
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
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Essa abstração significa que seu código não precisa saber de onde vem a configuração.

## Funções Lambda

Quando implantada na AWS, a API roda como quatro funções Lambda:

| Função | Propósito |
|--------|-----------|
| `web` | Lida com todas as requisições HTTP da API REST |
| `socket` | Gerencia conexões WebSocket para funcionalidades em tempo real |
| `timer15Min` | Agendada a cada 15 minutos para notificações por email |
| `timerMidnight` | Agendada diariamente para emails de resumo e manutenção |

:::info
Localmente, a função `web` roda na porta 8084 e a função `socket` roda na porta 8087. As funções de timer podem ser acionadas manualmente durante o desenvolvimento.
:::

## Artigos Relacionados

- **[Banco de Dados](./database)** -- Strings de conexão, scripts de esquema e padrões de acesso a dados
- **[Configuração Local da API](./local-setup)** -- Guia completo de configuração passo a passo
- **[ApiHelper](../shared-libraries/api-helper)** -- A biblioteca compartilhada que fornece `CustomBaseController` e middleware de autenticação
