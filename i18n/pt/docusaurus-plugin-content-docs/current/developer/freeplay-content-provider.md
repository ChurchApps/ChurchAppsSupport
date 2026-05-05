---
title: "Provedor de Conteúdo FreePlay"
---

# Provedor de Conteúdo FreePlay

<div class="article-intro">

FreePlay é o reprodutor de mídia do ChurchApps para transmitir lições e outros conteúdos de vídeo em telefones, tablets e TVs. Se você tem uma biblioteca de conteúdo de lições e gostaria de disponibilizá-la no FreePlay, este guia cobre tudo o que você precisa fornecer.

</div>

## Branding

Antes que a integração possa começar, precisamos:

- **Logo** -- Uma imagem de logo em proporção **16:9** (usada para cartões de provedor na UI do FreePlay)
- **Nome da marca** -- O nome preferido para exibir para sua organização no FreePlay

## Endpoints da API

FreePlay se comunica com seu serviço através de um pequeno conjunto de endpoints REST. Escrevemos um adaptador personalizado para cada provedor, então a estrutura de URL exata é flexível -- mas as informações abaixo são o que precisamos.

### Autenticação

Escolha o modelo que se encaixa em seu conteúdo:

| Modelo | Quando Usar | O Que Precisamos |
|-------|-------------|--------------|
| **None** | Conteúdo público, sem login necessário | Nada -- chamamos seus endpoints de catálogo diretamente |
| **OAuth (PKCE)** | Login web/mobile | URL de autorização, endpoint de troca de token, client ID, scopes |
| **Device Flow** | Preferido para apps de TV (usuário insere um código curto em seu telefone) | Endpoint de autorização de dispositivo, endpoint de polling de token, client ID |

:::tip
Se seu conteúdo requer autenticação, o endpoint de autenticação retorna um **token de usuário** que o FreePlay passa aos endpoints de navegação e lição para autorizar o acesso.
:::

### Browse / Catalog

Um endpoint (ou conjunto de endpoints) que retorna uma **árvore de pastas** de todas as lições disponíveis.

- Isso pode ser uma **única chamada** que retorna toda a árvore, ou **múltiplas chamadas** onde cada uma retorna um nível conforme o usuário navega mais profundamente.
- Cada item na árvore deve incluir:

| Campo | Obrigatório | Descrição |
|-------|----------|-------------|
| `id` | Sim | Um identificador único para a pasta |
| `name` | Sim | Nome de exibição para a pasta |
| `thumbnail` | Recomendado | Uma URL de miniatura **16:9** |

### Lesson Playlist

Um endpoint que retorna a **playlist de arquivos de mídia** para uma única lição.

Cada item na playlist deve incluir:

| Campo | Obrigatório | Descrição |
|-------|----------|-------------|
| `title` | Sim | Título de exibição do item de mídia |
| `mediaType` | Sim | `video` ou `image` |
| `url` | Sim | Link de download direto para o arquivo (veja [Media Formats](#formatos-de-midia) abaixo) |
| `thumbnail` | Recomendado | Uma imagem miniatura para o item |
| `duration` | Recomendado | Duração em segundos (para vídeos) |

## Formatos de Mídia

FreePlay baixa arquivos diretamente, então cada item de mídia deve ter um **link direto** (sem players incorporados ou redirecionamentos de página).

| Tipo | Formatos Aceitos |
|------|-----------------|
| Video | **MP4** (necessário para reprodução multiplataforma em dispositivos Apple e Android) |
| Image | JPG, PNG ou GIF |

## Notas

- Uma **API REST retornando JSON** é o padrão de integração típico, mas como escrevemos um adaptador personalizado para cada provedor, podemos trabalhar com praticamente qualquer formato de API.
- Se você está interessado em se tornar um provedor de conteúdo FreePlay, entre em contato no [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) ou abra um issue no [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
