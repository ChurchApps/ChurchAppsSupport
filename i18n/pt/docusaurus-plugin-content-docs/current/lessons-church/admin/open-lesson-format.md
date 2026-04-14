---
title: "Open Lesson Format"
---

# Open Lesson Format

<div class="article-intro">

O Open Lesson Format é um schema JSON padronizado que permite que provedores de conteúdo de terceiros publiquem currículo para Lessons.church. Qualquer organização que hospeda um feed neste formato pode ser adicionada como um provedor externo, tornando seu conteúdo navegável e tocável junto com a biblioteca integrada.

</div>

## Como Funciona

Um provedor hospeda dois tipos de endpoints:

1. **Provider Tree** -- Uma única URL que retorna o catálogo completo de programas, estudos, aulas e venues. Cada venue inclui uma URL de feed apontando para o conteúdo detalhado da aula.
2. **Venue Feed** -- Uma URL por venue, retornando o conteúdo completo da aula (seções, ações e arquivos de mídia).

Quando uma iglesia adiciona sua URL de provedor em Lessons.church, a plataforma busca sua árvore para descobrir conteúdo disponível, depois busca feeds de venue individual sob demanda.

## Provider Tree

Sua URL de provedor deve retornar um objeto JSON com esta estrutura:

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
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
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

## Venue Feed

Cada URL de venue deve retornar um objeto JSON contendo:

- `id` -- Identificador de venue
- `name` -- Nome do venue (ex: "Kids", "Adults")
- `lessonId` -- Identificador de aula
- `lessonName` -- Nome de exibição de aula
- `sections` -- Array de seções ordenadas
- Cada seção contém `actions` (ações da aula)

Para mais informações sobre o Open Lesson Format, veja a documentação completa de schema.

:::tip
Para ver um exemplo de trabalho do feed em ação, você pode visualizar a árvore de conteúdo integrada do Lessons.church em `https://api.lessons.church/lessons/public/tree`.
:::
