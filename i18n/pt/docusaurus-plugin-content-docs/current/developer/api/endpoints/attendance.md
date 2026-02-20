---
title: "Endpoints de Presença"
---

# Endpoints de Presença

<div class="article-intro">

O módulo de Presença gerencia locais de campus, cultos, horários de culto, sessões de presença, visitas e sessões de visita. Ele fornece a infraestrutura para rastrear quem participou de qual culto ou reunião de grupo, suporta fluxos de check-in e oferece relatórios de tendências e resumos de presença.

</div>

**Caminho base:** `/attendance`

## Campus

Caminho base: `/attendance/campuses`

Controller CRUD padrão (estende GenericCrudController). Fornece rotas `getById`, `getAll`, `post` e `delete` via a classe base CRUD.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os campus da igreja |
| GET | `/:id` | JWT | — | Obter um campus por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar campus |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um campus |

## Cultos

Caminho base: `/attendance/services`

Estende GenericCrudController com rotas CRUD `getById`, `getAll`, `post` e `delete`. Os endpoints `getAll` (`GET /`) e `search` são sobrescritos com implementações personalizadas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os cultos (inclui informações do campus) |
| GET | `/:id` | JWT | — | Obter um culto por ID |
| GET | `/search?campusId=` | JWT | — | Buscar cultos por ID do campus |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar cultos |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um culto |

### Exemplo: Buscar Cultos por Campus

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

## Horários de Culto

Caminho base: `/attendance/servicetimes`

Estende GenericCrudController com rotas CRUD `getById`, `post` e `delete`. Os endpoints `getAll` e `search` são implementações personalizadas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os horários de culto. Filtrar por `?serviceId=`. Adicione `?include=groups` para incluir dados de grupos |
| GET | `/:id` | JWT | — | Obter um horário de culto por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Buscar horários de culto por campus e culto |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar horários de culto |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um horário de culto |

## Horários de Culto de Grupos

Caminho base: `/attendance/groupservicetimes`

Vincula grupos a horários de culto específicos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as associações grupo-horário de culto. Filtrar por `?groupId=` para obter associações com nomes de cultos |
| GET | `/:id` | JWT | — | Obter uma associação grupo-horário de culto por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar associações grupo-horário de culto |
| DELETE | `/:id` | JWT | Services.Edit | Excluir uma associação grupo-horário de culto |

## Registros de Presença

Caminho base: `/attendance/attendancerecords`

Fornece visualizações agregadas somente leitura dos dados de presença para relatórios e exibição.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Attendance.View | Carregar registros de presença de uma pessoa. Requer `?personId=` |
| GET | `/tree` | JWT | — | Carregar a árvore completa de presença (campus, cultos, horários de culto, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carregar dados de tendência de presença com filtros opcionais |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carregar presença de grupos para um culto em uma determinada semana |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Buscar registros de presença com filtros (campus, culto, horário de culto, grupo, intervalo de datas) |

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

Estende GenericCrudController com rotas CRUD `getById` e `delete`. Os endpoints `getAll` e `save` são implementações personalizadas que também permitem que líderes de grupo gerenciem sessões de seus grupos.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Attendance.View ou Líder de Grupo | Listar todas as sessões. Filtrar por `?groupId=` (inclui nomes). Líderes de grupo podem visualizar sessões de seus próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão por ID |
| POST | `/` | JWT | Attendance.Edit ou Líder de Grupo | Criar ou atualizar sessões. Líderes de grupo podem salvar sessões de seus próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma sessão |

## Visitas

Caminho base: `/attendance/visits`

Gerencia registros individuais de visita (uma pessoa participando em uma data específica) e fornece o fluxo de check-in.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Attendance.View | Listar todas as visitas. Filtrar por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obter uma visita por ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Carregar dados de check-in para pessoas em um culto. Retorna visitas com sessões de visita da última data registrada |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Enviar dados de check-in. Cria/atualiza visitas e sessões de visita, remove registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma visita |

### Exemplo: Fluxo de Check-in

**Passo 1 -- Carregar dados de check-in existentes:**

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

**Passo 2 -- Enviar check-in:**

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

Gerencia a associação entre visitas e sessões (qual sessão específica uma pessoa participou durante uma visita). Também fornece um endpoint de registro rápido e um endpoint de download/exportação.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | Attendance.View ou Líder de Grupo | Listar sessões de visita. Filtrar por `?sessionId=`. Líderes de grupo podem visualizar sessões de visita de seus próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão de visita por ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Baixar presença de uma sessão (retorna nomes de pessoas com status presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar sessões de visita |
| POST | `/log` | JWT | Attendance.Edit ou Líder de Grupo | Registro rápido de presença de uma pessoa em uma sessão. Cria visita automaticamente se necessário. Líderes de grupo podem registrar presença de seus próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma sessão de visita por ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou Líder de Grupo | Remover uma pessoa de uma sessão. Exclui a sessão de visita e a visita pai se não restarem sessões. Líderes de grupo podem remover presença de seus próprios grupos |

### Exemplo: Registro Rápido de Presença

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

## Páginas Relacionadas

- [Endpoints de Membros](./membership) — Pessoas, grupos, papéis e gerenciamento da igreja
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, modelo de permissões
- [Estrutura do Módulo](../module-structure) — Padrões de organização de código
