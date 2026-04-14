---
title: "Innholdsintegrering API-endepunkter"
---

# Innholdsintegrering API-endepunkter

<div class="article-intro">

Innholdsmodulen administrerer nettstedssider, seksjoner, elementer, blokker, prekener, spillelister, strømmetjenester, hendelser, kuraterte kalendere, filer, gallerier, Bibeloversettelser og versslokalisering, sanger, arrangementer, globale stiler, lagerfotos og innstillinger. Det er den største modulen i API-et og driver CMS, media/streaming, dyrkinsgplanlegging og Bibelaksfunksjoner på tvers av alle ChurchApps-applikasjoner.

</div>

**Basisbane:** `/content`

## Sider

Basisbane: `/content/pages`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Offentlig | — | Last inn full sidetre (seksjoner, elementer, blokker) etter URL eller ID. Fjerner interne ID-er når de hentes etter URL |
| GET | `/:id` | JWT | — | Hent en side etter ID |
| GET | `/` | JWT | — | Vis alle sider for kirken |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliker en side med alle seksjoner og elementer |
| POST | `/temp/ai` | JWT | Content.Edit | Lagre en AI-generert side (side, seksjoner og elementer i ett kall) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sider (parti) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en side |

### Eksempel: Last inn sidetre

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "Om",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Velkommen" } }
      ]
    }
  ]
}
```

Se API-dokumentasjonen for flere detaljer.
