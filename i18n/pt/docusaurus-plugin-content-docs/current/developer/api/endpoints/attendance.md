---
title: "Endpoints de Presença"
---

# Endpoints de Presença

<div class="article-intro">

O módulo de Attendance gerencia locais de campus, serviços, horários de serviço, sessões de presença, visitas e sessões de visita. Fornece a infraestrutura para rastrear quem frequentou qual serviço ou reunião de grupo, suporta fluxos de trabalho de check-in e oferece relatórios de tendência e resumo de presença.

</div>

**Caminho base:** `/attendance`

## Campi

Caminho base: `/attendance/campuses`

Controlador CRUD padrão (estende GenericCrudController). Fornece rotas `getById`, `getAll`, `post` e `delete` via classe base CRUD.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os campi para a iglesia |
| GET | `/:id` | JWT | — | Obtenha um campus por ID |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar campi |
| DELETE | `/:id` | JWT | Services.Edit | Deletar um campus |

## Serviços

Caminho base: `/attendance/services`

Estende GenericCrudController com rotas CRUD `getById`, `getAll`, `post` e `delete`. Os endpoints `getAll` (`GET /`) e `search` são sobrescritos com implementações personalizadas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os serviços (inclui informações de campus) |
| GET | `/:id` | JWT | — | Obtenha um serviço por ID |
| GET | `/search?campusId=` | JWT | — | Procure serviços por ID de campus |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar serviços |
| DELETE | `/:id` | JWT | Services.Edit | Deletar um serviço |

## Horários de Serviço

Caminho base: `/attendance/servicetimes`

Estende GenericCrudController com rotas CRUD `getById`, `post` e `delete`. Os endpoints `getAll` e `search` são implementações personalizadas.

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/` | JWT | — | Lista todos os horários de serviço. Filtro por `?serviceId=`. Adicione `?include=groups` para anexar dados do grupo |
| GET | `/:id` | JWT | — | Obtenha um horário de serviço por ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Procure horários de serviço por campus e serviço |
| POST | `/` | JWT | Services.Edit | Criar ou atualizar horários de serviço |
| DELETE | `/:id` | JWT | Services.Edit | Deletar um horário de serviço |

Para mais informações sobre os endpoints de Attendance, veja a documentação completa da API.
