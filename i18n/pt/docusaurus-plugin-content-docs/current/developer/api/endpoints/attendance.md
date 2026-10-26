---
title: "Endpoints de Frequência"
---

# Endpoints de Frequência

<div class="article-intro">

O módulo de Frequência gerencia locais de campus, serviços, horários de serviço, sessões de frequência, visitas e sessões de visita. Ele fornece a infraestrutura para registrar quem compareceu a qual culto ou reunião de grupo, oferece suporte aos fluxos de check-in e disponibiliza relatórios de tendências e resumos de frequência.

</div>

**Caminho base:** `/attendance`

## Campus

Caminho base: `/attendance/campuses`

Controlador CRUD padrão (estende GenericCrudController). Fornece as rotas `getById`, `getAll`, `post` e `delete` por meio da classe base CRUD.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os campus da igreja |
| GET | `/:id` | JWT | — | Obter um campus pelo ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar campus |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um campus |

## Serviços

Caminho base: `/attendance/services`

Estende GenericCrudController com as rotas CRUD `getById`, `getAll`, `post` e `delete`. Os endpoints `getAll` (`GET /`) e `search` são sobrescritos com implementações personalizadas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os serviços (inclui informações do campus) |
| GET | `/:id` | JWT | — | Obter um serviço pelo ID |
| GET | `/search?campusId=` | JWT | — | Pesquisar serviços pelo ID do campus |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar serviços |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um serviço |

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

Estende GenericCrudController com as rotas CRUD `getById`, `post` e `delete`. Os endpoints `getAll` e `search` têm implementações personalizadas.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todos os horários de serviço. Filtrar por `?serviceId=`. Adicione `?include=groups` para incluir os dados dos grupos. Cada linha inclui um booleano calculado `checkinOpen` (falso somente quando o horário de serviço tem uma programação de check-in cuja janela está fechada neste momento). A janela é medida no fuso horário do campus do serviço, depois no fuso horário da igreja, depois no primeiro campus que tiver um, e por fim em `America/New_York` |
| GET | `/:id` | JWT | — | Obter um horário de serviço pelo ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Pesquisar horários de serviço por campus e serviço |
| GET | `/public/:churchId` | Pública | — | Obter a árvore campus → serviço → horário de uma igreja. Alimenta o elemento `serviceTimes` do construtor de sites |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar horários de serviço. Campos opcionais de programação: `dayOfWeek` (0 = domingo … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (antes do início), `checkinCloseMinutes` (após o término). O check-in só é limitado por horário quando `dayOfWeek` e `startTime` estão definidos |
| DELETE | `/:id` | JWT | Services.Edit | Excluir um horário de serviço |

## Horários de Serviço dos Grupos

Caminho base: `/attendance/groupservicetimes`

Vincula grupos a horários de serviço específicos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | — | Listar todas as associações grupo-horário de serviço. Filtre por `?groupId=` para obter as associações com os nomes dos serviços |
| GET | `/:id` | JWT | — | Obter uma associação grupo-horário de serviço pelo ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar associações grupo-horário de serviço |
| DELETE | `/:id` | JWT | Services.Edit | Excluir uma associação grupo-horário de serviço |

## Registros de Frequência

Caminho base: `/attendance/attendancerecords`

Fornece visões agregadas somente leitura dos dados de frequência para relatórios e exibição.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Attendance.View | Carregar os registros de frequência de uma pessoa. Requer `?personId=` |
| GET | `/my` | JWT | — | Com escopo do próprio usuário: os registros de frequência do próprio membro autenticado dos últimos 12 meses, do mais recente para o mais antigo. Retorna `401` se o usuário não estiver vinculado a uma pessoa. Alimenta a seção **My Attendance** da página B1 Me |
| GET | `/tree` | JWT | — | Carregar a árvore completa de frequência (campus, serviços, horários de serviço, grupos) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Carregar os dados de tendência de frequência com filtros opcionais |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Carregar a frequência dos grupos de um serviço em uma determinada semana |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Para cada grupo atribuído ao horário de serviço, retorna `{ groupId, sessionId, attendanceCount }` para aquela data (`date` no formato `YYYY-MM-DD`; `sessionId` é null quando o grupo não tem sessão). Alimenta o diálogo **Who Still Needs Attendance** do B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Pesquisar registros de frequência com filtros (campus, serviço, horário de serviço, grupo, intervalo de datas) |

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

Estende GenericCrudController com as rotas CRUD `getById` e `delete`. Os endpoints `getAll` e `save` têm implementações personalizadas que também permitem que líderes de grupo gerenciem as sessões de seus grupos.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Listar todas as sessões. Filtre por `?groupId=` (inclui os nomes). Líderes de grupo podem visualizar as sessões dos seus próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão pelo ID |
| POST | `/` | JWT | Attendance.Edit ou Group Leader | Criar ou atualizar sessões. Líderes de grupo podem salvar sessões dos seus próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma sessão |

## Visitas

Caminho base: `/attendance/visits`

Gerencia os registros individuais de visita (uma pessoa comparecendo em uma data específica) e fornece o fluxo de check-in.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Attendance.View | Listar todas as visitas. Filtre por `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Obter uma visita pelo ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View ou Attendance.Checkin | Carregar os dados de check-in de pessoas em um serviço. Retorna as visitas com as sessões de visita da última data registrada |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar visitas |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit ou Attendance.Checkin | Enviar os dados de check-in. Cria/atualiza visitas e sessões de visita e remove os registros obsoletos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma visita |

### Exemplo: Fluxo de Check-in

**Passo 1 -- Carregar os dados de check-in existentes:**

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

**Passo 2 -- Enviar o check-in:**

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

Se um horário de serviço escolhido tiver uma programação de check-in e a janela estiver fechada (medida na mesma ordem de fuso horário, priorizando o campus, usada por `checkinOpen`), nada é salvo e a resposta é `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Violações de capacidade e de proporção de voluntários também retornam 409 (`error: "capacity"` ou `"ratio"`). As sessões que uma pessoa já possui hoje (reenviadas a cada check-in) ignoram a verificação da janela, de modo que uma família pode adicionar um horário de serviço aberto depois que a janela de um horário anterior já tiver fechado.

## Sessões de Visita

Caminho base: `/attendance/visitsessions`

Gerencia a associação entre visitas e sessões (em qual sessão específica uma pessoa compareceu durante uma visita). Também fornece um endpoint de registro rápido e um endpoint de download/exportação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/` | JWT | Attendance.View ou Group Leader | Listar sessões de visita. Filtre por `?sessionId=`. Líderes de grupo podem visualizar as sessões de visita dos seus próprios grupos |
| GET | `/:id` | JWT | Attendance.View | Obter uma sessão de visita pelo ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Baixar a frequência de uma sessão (retorna os nomes das pessoas com o status de presente/ausente) |
| POST | `/` | JWT | Attendance.Edit | Criar ou atualizar sessões de visita |
| POST | `/log` | JWT | Attendance.Edit ou Group Leader | Registrar rapidamente a frequência de uma pessoa em uma sessão. Cria a visita automaticamente, se necessário. Líderes de grupo podem registrar a frequência dos seus próprios grupos |
| DELETE | `/:id` | JWT | Attendance.Edit | Excluir uma sessão de visita pelo ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit ou Group Leader | Remover uma pessoa de uma sessão. Exclui a sessão de visita e a visita pai caso não restem sessões. Líderes de grupo podem remover a frequência dos seus próprios grupos |

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

### Exemplo: Baixar a Frequência de uma Sessão

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

Acompanha as sequências de frequência de cada pessoa -- semanas consecutivas em que ela compareceu. Útil para métricas de engajamento e gamificação.

| Método | Caminho | Autenticação | Permissão | Descrição |
|--------|---------|--------------|-----------|-----------|
| GET | `/person/:personId` | JWT | — | Carregar as sequências de frequência de uma pessoa |

## Páginas Relacionadas

- [Endpoints de Membresia](./membership) — Pessoas, grupos, funções e gestão da igreja
- [Autenticação e Permissões](./authentication) — Fluxo de login, JWT, modelo de permissões
- [Estrutura de Módulos](../module-structure) — Padrões de organização do código
