---
title: "Endpoints de Presença"
---

# Endpoints de Presença

<div class="article-intro">

O módulo de Presença gerencia locais de campus, serviços, horários de serviço, sessões de presença, visitas e sessões de visita. Fornece a infraestrutura para rastrear quem frequentou qual serviço ou reunião de grupo, suporta fluxos de trabalho de verificação de entrada e oferece relatórios de tendência de presença e resumo.

</div>

**Caminho base:** `/attendance`

## Campus

Caminho base: `/attendance/campuses`

Controlador CRUD padrão (estende GenericCrudController). Fornece rotas `getById`, `getAll`, `post` e `delete` através da classe CRUD base.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | — | Listar todos os campus da igreja |
| GET | `/:id` | JWT | — | Obter um campus por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar campus |
| DELETE | `/:id` | JWT | Services.Edit | Deletar um campus |

## Serviços

Caminho base: `/attendance/services`

Estende GenericCrudController com rotas CRUD `getById`, `getAll`, `post` e `delete`. Os endpoints `getAll` (`GET /`) e `search` são sobrescritos com implementações customizadas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | — | Listar todos os serviços (inclui informações de campus) |
| GET | `/:id` | JWT | — | Obter um serviço por ID |
| GET | `/search?campusId=` | JWT | — | Pesquisar serviços por ID de campus |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar serviços |
| DELETE | `/:id` | JWT | Services.Edit | Deletar um serviço |

### Exemplo: Pesquisar Serviços por Campus

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

Estende GenericCrudController com rotas CRUD `getById`, `post` e `delete`. Os endpoints `getAll` e `search` são implementações customizadas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | — | Listar todos os horários de serviço. Filtrar por `?serviceId=`. Adicionar `?include=groups` para incluir dados de grupos |
| GET | `/:id` | JWT | — | Obter um horário de serviço por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Pesquisar horários de serviço por campus e serviço |
| GET | `/public/:churchId` | Público | — | Obter a árvore campus → serviço → tempo para uma igreja. Alimenta o elemento `serviceTimes` do construtor de sites |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar horários de serviço |
| DELETE | `/:id` | JWT | Services.Edit | Deletar um horário de serviço |

## Horários de Serviço do Grupo

Caminho base: `/attendance/groupservicetimes`

Liga grupos a horários de serviço específicos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | — | Listar todas as associações grupo-serviço-tempo. Filtrar por `?groupId=` para obter associações com nomes de serviço |
| GET | `/:id` | JWT | — | Obter uma associação grupo-serviço-tempo por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar associações grupo-serviço-tempo |
| DELETE | `/:id` | JWT | Services.Edit | Deletar uma associação grupo-serviço-tempo |

## Registros de Presença

Caminho base: `/attendance/attendancerecords`

Fornece visualizações agregadas somente leitura de dados de presença para relatórios e exibição.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | Attendance.View | Carregar registros de presença para uma pessoa. Requer `?personId=` |
| GET | `/tree` | JWT | — | Carregar a árvore de presença completa (campus, serviços, horários de serviço, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carregar dados de tendência de presença com filtros opcionais |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carregar presença de grupo para um serviço em uma semana específica |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Para cada grupo atribuído ao horário de serviço, retornar `{ groupId, sessionId, attendanceCount }` para essa data (`date` é `YYYY-MM-DD`; `sessionId` é null quando o grupo não tem sessão). Alimenta o diálogo **Who Still Needs Attendance** do B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Pesquisar registros de presença com filtros (campus, serviço, horário de serviço, grupo, intervalo de datas) |

### Exemplo: Tendência de Presença

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

Estende GenericCrudController com rotas CRUD `getById` e `delete`. Os endpoints `getAll` e `save` são implementações customizadas que também permitem líderes de grupo gerenciar sessões para seus grupos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Listar todas as sessões. Filtrar por `?groupId=` (inclui nomes). Líderes de grupo podem visualizar sessões de seus próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão por ID |
| POST | `/` | JWT | Attendance.Edit ou Group Leader | Criar ou atualizar sessões. Líderes de grupo podem salvar sessões de seus próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Deletar uma sessão |

## Visitas

Caminho base: `/attendance/visits`

Gerencia registros individuais de visitas (uma pessoa frequentando em uma data específica) e fornece o fluxo de trabalho de verificação de entrada.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | Attendance.View | Listar todas as visitas. Filtrar por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obter uma visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Carregar dados de verificação de entrada para pessoas em um serviço. Retorna visitas com sessões de visita da última data registrada |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Enviar dados de verificação de entrada. Cria/atualiza visitas e sessões de visita, remove registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Deletar uma visita |

### Exemplo: Fluxo de Verificação de Entrada

**Passo 1 -- Carregar dados de verificação de entrada existentes:**

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

**Passo 2 -- Enviar verificação de entrada:**

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

Gerencia a associação entre visitas e sessões (qual sessão específica uma pessoa frequentou durante uma visita). Também fornece um endpoint de registro rápido e um endpoint de download/exportação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Listar sessões de visita. Filtrar por `?sessionId=`. Líderes de grupo podem visualizar sessões de visita de seus próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Baixar presença para uma sessão (retorna nomes de pessoas com status presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar sessões de visita |
| POST | `/log` | JWT | Attendance.Edit ou Group Leader | Registrar rapidamente a presença de uma pessoa em uma sessão. Cria automaticamente visita se necessária. Líderes de grupo podem registrar presença para seus próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Deletar uma sessão de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou Group Leader | Remover uma pessoa de uma sessão. Deleta a sessão de visita e a visita pai se nenhuma sessão permanecer. Líderes de grupo podem remover presença de seus próprios grupos |

### Exemplo: Registrar Presença Rapidamente

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

### Exemplo: Baixar Presença da Sessão

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

## Séries

Caminho base: `/attendance/streaks`

Rastreia sequências de presença para indivíduos -- semanas consecutivas que uma pessoa frequentou. Útil para métricas de engajamento e gamificação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|---|------------|-------------|
| GET | `/person/:personId` | JWT | — | Carregar sequências de presença para uma pessoa |

## Páginas Relacionadas

- [Membership Endpoints](./membership) — Pessoas, grupos, papéis e gerenciamento da igreja
- [Authentication & Permissions](./authentication) — Fluxo de login, JWT, modelo de permissão
- [Module Structure](../module-structure) — Padrões de organização de código
