---
title: "Meldinger API-endepunkter"
---

# Meldinger API-endepunkter

<div class="article-intro">

Meldingermodulen administrerer sanntidssamtaler, chatmeldinger, pushvarsler, SMS/e-postlevering, WebSocket-forbindelser, privat meldingsgiving, enhetsregistrering og tekstingleverandører. Den gir kommunikasjonslaget som brukes på tvers av alle ChurchApps-applikasjoner for både direktekringkastingschat og asynkrone varsler.

</div>

**Basisbane:** `/messaging`

## Samtaler

Basisbane: `/messaging/conversations`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Last inn samtaler etter komma-separerte ID-er med første/siste meldinger |
| GET | `/messages/:contentType/:contentId` | JWT | — | Last inn samtaler for innhold med paginerte meldinger (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hent posttype-samtaler for gjeldende brukers grupper |
| GET | `/posts/group/:groupId` | JWT | — | Hent posttype-samtaler for en spesifikk gruppe |
| GET | `/current/:churchId/:contentType/:contentId` | Offentlig | — | Hent eller opprett gjeldende samtale for innhold (auto-dekrypterer contentId) |
| GET | `/:churchId/:contentType/:contentId` | Offentlig | — | Last inn samtaler etter innholdstype og ID |
| GET | `/:churchId/:id` | Offentlig | — | Last inn en enkelt samtale etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater samtaler (parti) |
| POST | `/start` | JWT | — | Start en ny samtale med en innledende kommentarmelding |
| DELETE | `/:churchId/:id` | JWT | — | Slett en samtale |

### Eksempel: Start en samtale

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Ukentlig diskusjon",
  "comment": "Velkommen til denne ukens diskusjonstråd!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "title": "Ukentlig diskusjon"
}
```

Se API-dokumentasjonen for flere detaljer.
