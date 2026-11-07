---
title: "Referință endpoint-uri"
description: "Găsiți fiecare endpoint al API-ului ChurchApps după modul, vedeți metoda HTTP, calea, autentificarea și permisiunea pentru fiecare rută și aflați convențiile de salvare în lot și de erori înainte de a apela API-ul."
---

# Referință endpoint-uri

<div class="article-intro">

Această secțiune documentează toate endpoint-urile REST expuse de API-ul ChurchApps. Fiecare pagină de modul listează toate rutele, cu metoda HTTP, calea, cerințele de autentificare și permisiunile necesare.

</div>

## URL de bază

| Mediu | URL |
|-------|-----|
| Dezvoltare locală | `http://localhost:8084` |
| Producție | `https://api.churchapps.org` |

## Convenții pentru cereri

- **Content-Type:** Toate corpurile cererilor și răspunsurilor folosesc `application/json`
- **Multi-tenant:** Fiecare cerere autentificată este limitată la un `churchId` extras din tokenul JWT — nu transmiți `churchId` în URL
- **Salvări în lot:** Majoritatea endpoint-urilor `POST` acceptă un **array de obiecte**. API-ul inserează înregistrările noi (fără câmpul `id`) și actualizează pe cele existente (cu câmpul `id`) într-un singur apel
- **ID-uri:** Toate ID-urile entităților sunt UUID-uri

### Exemplu: salvare în lot

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Primul obiect este creat (nou); al doilea este actualizat (are `id`).

## Format de răspuns

Răspunsurile de succes returnează JSON — fie un singur obiect, fie un array. Răspunsurile de eroare folosesc codurile standard de stare HTTP:

| Cod | Semnificație |
|-----|--------------|
| `200` | Succes |
| `400` | Cerere invalidă (erori de validare) |
| `401` | Neautorizat (token lipsă sau invalid, ori permisiuni insuficiente) |
| `404` | Negăsit |
| `500` | Eroare de server |

Erorile de validare returnează:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Cum se citesc tabelele de endpoint-uri

Fiecare pagină de modul organizează endpoint-urile pe controlere. Tabelele folosesc următoarele coloane:

| Coloană | Descriere |
|---------|-----------|
| **Method** | Metoda HTTP (`GET`, `POST`, `DELETE`) |
| **Path** | Calea rutei, relativă la calea de bază a controlerului |
| **Auth** | **JWT** = necesită token Bearer, **Public** = nu necesită autentificare |
| **Permission** | Permisiunea necesară (de exemplu `People.Edit`). `—` înseamnă orice utilizator autentificat |
| **Description** | Ce face endpoint-ul |

Controlerele care extind clasa de bază CRUD standard oferă automat patru endpoint-uri: `GET /` (listează toate), `GET /:id` (obține după ID), `POST /` (creează/actualizează) și `DELETE /:id` (șterge).

## Modulul Rapoarte

Modulul Rapoarte funcționează diferit de celelalte module. În loc de operații CRUD cu baza de date, încarcă definițiile rapoartelor din fișiere JSON de pe disc și execută interogări SQL parametrizate.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Încarcă definiția unui raport după numele cheii |
| GET | `/reporting/reports/:keyName/run` | JWT | Execută un raport și returnează rezultatele |

Parametrii raportului se transmit ca valori din șirul de interogare (de exemplu `?startDate=2024-01-01&endDate=2024-12-31`). Parametrul `churchId` este injectat automat din tokenul JWT. Fiecare definiție de raport își poate specifica propriile cerințe de permisiune.

## Indexul modulelor

| Modul | Cale de bază | Descriere |
|-------|--------------|-----------|
| [Autentificare](./authentication.md) | `/membership/users`, `/membership/oauth` | Autentificare, înregistrare, tokenuri JWT, OAuth, permisiuni |
| [Apartenență](./membership.md) | `/membership/*` | Persoane, biserici, grupuri, gospodării, roluri, formulare, setări |
| [Prezență](./attendance.md) | `/attendance/*` | Campusuri, servicii, sesiuni, vizite, înregistrări de check-in |
| [Conținut](./content.md) | `/content/*` | Pagini, predici, evenimente, fișiere, galerii, Biblie, streaming |
| [Donații](./giving.md) | `/giving/*` | Donații, fonduri, gateway-uri de plată, abonamente |
| [Mesagerie](./messaging.md) | `/messaging/*` | Conversații, notificări, dispozitive, SMS |
| [Activități](./doing.md) | `/doing/*` | Planuri, sarcini, atribuiri, automatizări, programare |
