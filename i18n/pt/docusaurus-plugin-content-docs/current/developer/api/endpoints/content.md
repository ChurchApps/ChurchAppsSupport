---
title: "Endpoints de Conteúdo"
---

# Endpoints de Conteúdo

<div class="article-intro">

O módulo de Content gerencia páginas do website, seções, elementos, blocos, sermões, playlists, serviços de transmissão, eventos, calendários curados, arquivos, galerias, traduções de Bíblia e pesquisas de versículos, músicas, arranjos, estilos globais, fotos em estoque e configurações. É o maior módulo na API e alimenta o CMS, mídia/transmissão, planejamento de adoração e recursos de Bíblia em todos os aplicativos da ChurchApps.

</div>

**Caminho base:** `/content`

## Páginas

Caminho base: `/content/pages`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Carregue árvore de página completa (seções, elementos, blocos) por URL ou ID |
| GET | `/:id` | JWT | — | Obtenha uma página por ID |
| GET | `/` | JWT | — | Liste todas as páginas para a iglesia |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar páginas (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma página |

## Seções

Caminho base: `/content/sections`

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obtenha uma seção por ID |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar seções (lote) |
| DELETE | `/:id` | JWT | Content.Edit | Deletar uma seção |

## Blocos

Caminho base: `/content/blocks`

Estende CRUD padrão (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` da classe base com permissão Content.Edit para escritas).

| Método | Caminho | Auth | Permissão | Descrição |
|--------|---------|------|-----------|-----------|
| GET | `/:id` | JWT | — | Obtenha um bloco por ID |
| GET | `/` | JWT | — | Liste todos os blocos |
| POST | `/` | JWT | Content.Edit | Criar ou atualizar blocos |
| DELETE | `/:id` | JWT | Content.Edit | Deletar um bloco |

Para mais informações sobre os endpoints de Content, veja a documentação completa da API.
