---
title: "Formato de Lição Aberta"
---

# Formato de Lição Aberta

<div class="article-intro">

O Formato de Lição Aberta é um esquema JSON padronizado que permite que provedores de conteúdo terceiros publiquem currículos para o Lessons.church. Qualquer organização que hospede um feed nesse formato pode ser adicionada como provedor externo, tornando seu conteúdo navegável e reproduzível junto com a biblioteca integrada.

</div>

## Como Funciona

Um provedor hospeda dois tipos de endpoints:

1. **Árvore do Provedor** -- Uma única URL que retorna o catálogo completo de programas, estudos, lições e versões. Cada versão inclui uma URL de feed apontando para o conteúdo detalhado da lição.
2. **Feed da Versão** -- Uma URL por versão, retornando o conteúdo completo da lição (seções, ações e arquivos de mídia).

Quando uma igreja adiciona a URL do seu provedor no Lessons.church, a plataforma busca sua árvore para descobrir o conteúdo disponível e, em seguida, busca os feeds de cada versão sob demanda.

## Árvore do Provedor

A URL do seu provedor deve retornar um objeto JSON com esta estrutura:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Campos da Árvore

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `programs[].id` | string | Identificador único do programa |
| `programs[].name` | string | Nome de exibição |
| `programs[].slug` | string | Nome amigável para URL |
| `programs[].image` | string | URL da imagem do programa (opcional) |
| `programs[].about` | string | Descrição (opcional) |
| `studies[].id` | string | Identificador único do estudo |
| `studies[].name` | string | Nome de exibição |
| `studies[].slug` | string | Nome amigável para URL |
| `studies[].image` | string | URL da imagem do estudo (opcional) |
| `lessons[].id` | string | Identificador único da lição |
| `lessons[].name` | string | Nome de exibição |
| `lessons[].slug` | string | Nome amigável para URL |
| `lessons[].title` | string | Título completo |
| `lessons[].image` | string | URL da imagem da lição (opcional) |
| `lessons[].description` | string | Resumo da lição (opcional). Texto de catálogo para professores que navegam pela biblioteca, não a mensagem para levar para casa aos pais. |
| `lessons[].bottomLine` | string | Frase única com a mensagem para os pais levarem para casa (opcional) |
| `lessons[].verse` | string | Referência do versículo para memorizar e texto curto (opcional) |
| `lessons[].parentQuestion` | string | Uma pergunta para os pais fazerem em casa (opcional) |
| `lessons[].parentNote` | string | Nota extra opcional para os pais (markdown) |
| `venues[].id` | string | Identificador único da versão |
| `venues[].name` | string | Nome da versão (por exemplo, "Crianças", "Adultos", "Jovens") |
| `venues[].apiUrl` | string | URL que retorna o feed da versão (veja abaixo) |

Os quatro campos de mensagem para os pais (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) são opcionais tanto na árvore quanto no feed da versão. Se forem omitidos, serão tratados como vazios. Não copie `description` para esses campos.

**Versões** representam diferentes adaptações da mesma lição, voltadas para públicos diferentes (faixas etárias, contextos etc.).

## Feed da Versão

O `apiUrl` de cada versão deve retornar um objeto JSON que corresponda a este esquema:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Campos do Feed da Versão

#### Objeto Raiz

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador da versão |
| `name` | string | Nome da versão |
| `lessonId` | string | Identificador da lição |
| `lessonName` | string | Nome de exibição da lição |
| `lessonImage` | string | URL da imagem da lição |
| `lessonDescription` | string | Resumo da lição (texto de catálogo) |
| `bottomLine` | string | Frase única com a mensagem para os pais levarem para casa (opcional) |
| `verse` | string | Referência do versículo para memorizar e texto curto (opcional) |
| `parentQuestion` | string | Uma pergunta para os pais fazerem em casa (opcional) |
| `parentNote` | string | Nota extra opcional para os pais, em markdown (opcional) |
| `studyName` | string | Nome do estudo pai |
| `studySlug` | string | Nome amigável para URL do estudo pai |
| `programName` | string | Nome do programa pai |
| `programSlug` | string | Nome amigável para URL do programa pai |
| `programAbout` | string | Descrição do programa |
| `downloads` | array | Pacotes de arquivos para download |
| `sections` | array | Seções ordenadas da lição |

#### Seção

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador da seção |
| `name` | string | Título da seção |
| `sort` | número | Ordem de exibição |
| `materials` | string | Materiais ou notas de preparação (opcional) |
| `actions` | array | Ações ordenadas dentro desta seção |

#### Ação

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador da ação |
| `actionType` | string | Um de: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Conteúdo de texto ou rótulo da mídia |
| `sort` | número | Ordem de exibição |
| `role` | string | Nome do papel, por exemplo, "Líder", "Crianças" (opcional) |
| `roleId` | string | Identificador do papel (opcional) |
| `files` | array | Arquivos de mídia para ações `play` (opcional) |

#### Arquivo

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string | Identificador do arquivo |
| `name` | string | Nome do arquivo |
| `url` | string | URL de download direto |
| `streamUrl` | string | URL de streaming, por exemplo, link do Vimeo (opcional) |
| `fileType` | string | Tipo MIME (por exemplo, `video/mp4`, `image/jpeg`) |
| `seconds` | número | Duração em segundos para áudio ou vídeo (opcional) |
| `bytes` | número | Tamanho do arquivo em bytes (opcional) |
| `thumbnail` | string | URL da imagem de miniatura (opcional) |
| `loop` | booleano | Se a mídia deve ser repetida (opcional, padrão `false`) |

#### Download

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `name` | string | Nome do pacote de download (por exemplo, "Materiais Imprimíveis") |
| `files` | array | Arquivos neste pacote de download (mesmos campos de Arquivo acima) |

## Tipos de Ação

| Tipo | Finalidade |
|------|------------|
| `play` | Reprodução de mídia -- vídeo, áudio ou apresentação de slides. Deve incluir `files`. |
| `text` | Conteúdo de texto estático. Aceita negrito no estilo markdown (`**texto**`). |
| `question` | Pergunta para discussão ou reflexão do público. |
| `quote` | Uma citação destacada ou passagem das Escrituras. |
| `subhead` | Um título ou divisor dentro de uma seção. |

:::tip
Para ver um exemplo funcional do feed em ação, você pode consultar a árvore de conteúdo integrada do Lessons.church em `https://api.lessons.church/lessons/public/tree` e buscar qualquer URL de feed de versão a partir dela.
:::
