---
title: "Endpoints de Frequência"
---

# Endpoints de Frequência

<div class="article-intro">

O módulo de Frequência gerencia locais de campus, serviços, horários de serviço, sessões de frequência, visitas e sessões de visita. Ele fornece a infraestrutura para rastrear quem compareceu a qual serviço ou reunião de grupo, oferece suporte a fluxos de check-in e disponibiliza relatórios de tendência e resumo de frequência.

</div>

**Caminho base:** `/attendance`

## Campi

Caminho base: `/attendance/campuses`

Controlador CRUD padrão (estende GenericCrudController). Fornece as rotas `getById`, `getAll`, `post` e `delete` por meio da classe base de CRUD.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listar todos os campi da igreja |
| GET | `/:id` | JWT | — | Obter um campus por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar campi |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um campus |

## Serviços

Caminho base: `/attendance/services`

Estende GenericCrudController com as rotas CRUD `getById`, `getAll`, `post` e `delete`. Os endpoints `getAll` (`GET /`) e `search` são substituídos por implementações personalizadas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listar todos os serviços (inclui informações de campus) |
| GET | `/:id` | JWT | — | Obter um serviço por ID |
| GET | `/search?campusId=` | JWT | — | Buscar serviços por ID de campus |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar serviços |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um serviço |

### Exemplo: Buscar Serviços por Campus

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Horários de Serviço

Caminho base: `/attendance/servicetimes`

Estende GenericCrudController com as rotas CRUD `getById`, `post` e `delete`. Os endpoints `getAll` e `search` são implementações personalizadas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listar todos os horários de serviço. Filtrar por `?serviceId=`. Adicionar `?include=groups` para anexar dados de grupo |
| GET | `/:id` | JWT | — | Obter um horário de serviço por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar horários de serviço por campus e serviço |
| GET | `/public/:churchId` | Public | — | Obter a árvore campus → serviço → horário para uma igreja. Alimenta o elemento `serviceTimes` do construtor de sites |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar horários de serviço |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um horário de serviço |

## Horários de Serviço por Grupo

Caminho base: `/attendance/groupservicetimes`

Vincula grupos a horários de serviço específicos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Listar todas as associações grupo-horário de serviço. Filtrar por `?groupId=` para obter associações com nomes de serviço |
| GET | `/:id` | JWT | — | Obter uma associação grupo-horário de serviço por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar associações grupo-horário de serviço |
| DELETE | `/:id` | JWT | Services.Edit | Excluir uma associação grupo-horário de serviço |

## Registros de Frequência

Caminho base: `/attendance/attendancerecords`

Fornece visualizações agregadas somente leitura dos dados de frequência para relatórios e exibição.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Carregar registros de frequência de uma pessoa. Requer `?personId=` |
| GET | `/tree` | JWT | — | Carregar a árvore completa de frequência (campi, serviços, horários de serviço, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carregar dados de tendência de frequência com filtros opcionais |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carregar frequência de grupo para um serviço em uma determinada semana |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Buscar registros de frequência com filtros (campus, serviço, horário de serviço, grupo, intervalo de datas) |

### Exemplo: Tendência de Frequência

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sessões

Caminho base: `/attendance/sessions`

Estende GenericCrudController com as rotas CRUD `getById` e `delete`. Os endpoints `getAll` e `save` são implementações personalizadas que também permitem que líderes de grupo gerenciem sessões dos próprios grupos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou Líder de Grupo | Listar todas as sessões. Filtrar por `?groupId=` (inclui nomes). Líderes de grupo podem visualizar sessões dos próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão por ID |
| POST | `/` | JWT | Attendance.Edit ou Líder de Grupo | Criar ou atualizar sessões. Líderes de grupo podem salvar sessões dos próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma sessão |

## Visitas

Caminho base: `/attendance/visits`

Gerencia registros de visita individuais (uma pessoa comparecendo em uma data específica) e fornece o fluxo de check-in.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Listar todas as visitas. Filtrar por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obter uma visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Carregar dados de check-in de pessoas em um serviço. Retorna visitas com sessões de visita da última data registrada |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Enviar dados de check-in. Cria/atualiza visitas e sessões de visita, remove registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma visita |

### Exemplo: Fluxo de Check-In

**Etapa 1 -- Carregar dados de check-in existentes:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Etapa 2 -- Enviar check-in:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

## Sessões de Visita

Caminho base: `/attendance/visitsessions`

Gerencia a associação entre visitas e sessões (a qual sessão específica uma pessoa compareceu durante uma visita). Também fornece um endpoint de registro rápido e um endpoint de download/exportação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View ou Líder de Grupo | Listar sessões de visita. Filtrar por `?sessionId=`. Líderes de grupo podem visualizar sessões de visita dos próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Baixar frequência de uma sessão (retorna nomes de pessoas com status presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar sessões de visita |
| POST | `/log` | JWT | Attendance.Edit ou Líder de Grupo | Registrar rapidamente a frequência de uma pessoa em uma sessão. Cria a visita automaticamente, se necessário. Líderes de grupo podem registrar frequência dos próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma sessão de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou Líder de Grupo | Remover uma pessoa de uma sessão. Exclui a sessão de visita e a visita pai se nenhuma sessão restar. Líderes de grupo podem remover frequência dos próprios grupos |

### Exemplo: Registro Rápido de Frequência

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Exemplo: Baixar Frequência de uma Sessão

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Sequências

Caminho base: `/attendance/streaks`

Rastreia sequências de frequência de indivíduos -- semanas consecutivas em que uma pessoa compareceu. Útil para métricas de engajamento e gamificação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Carregar sequências de frequência de uma pessoa |

## Páginas Relacionadas

- [Endpoints de Membros](./membership) — Pessoas, grupos, funções e gerenciamento da igreja
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, modelo de permissões
- [Estrutura do Módulo](../module-structure) — Padrões de organização de código
