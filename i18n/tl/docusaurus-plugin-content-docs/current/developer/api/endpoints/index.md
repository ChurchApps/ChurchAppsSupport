---
title: "Sanggunian ng Endpoint"
---

# Sanggunian ng Endpoint

<div class="article-intro">

Dokumentado sa seksyong ito ang lahat ng REST endpoint na nilalantad ng ChurchApps API. Ang bawat pahina ng module ay naglilista ng bawat ruta kasama ang HTTP method, path, mga kinakailangan sa authentication, at mga kinakailangang pahintulot.

</div>

## Base URL

| Kapaligiran | URL |
|-------------|-----|
| Lokal na development | `http://localhost:8084` |
| Production | `https://api.churchapps.org` |

## Mga Kumbensyon sa Kahilingan

- **Content-Type:** Lahat ng request at response body ay gumagamit ng `application/json`
- **Multi-tenant:** Bawat naka-authenticate na kahilingan ay naka-scope sa isang `churchId` na kinuha mula sa JWT token — hindi mo ipinasa ang `churchId` sa URL
- **Batch na pag-save:** Karamihan sa mga `POST` endpoint ay tumatanggap ng **array ng mga object**. Ang API ay maglalagay ng mga bagong talaan (walang `id` field) at mag-a-update ng mga umiiral (may `id` field) sa isang tawag
- **Mga ID:** Lahat ng entity ID ay mga UUID

### Halimbawa: Batch na Pag-save

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Ang unang object ay nililikha (bago); ang pangalawa ay ina-update (may `id`).

## Format ng Tugon

Ang mga matagumpay na tugon ay nagbabalik ng JSON — isang object o isang array. Ang mga tugon ng error ay gumagamit ng karaniwang mga HTTP status code:

| Code | Kahulugan |
|------|---------|
| `200` | Matagumpay |
| `400` | Masamang kahilingan (mga error sa validation) |
| `401` | Hindi awtorisado (nawawala/hindi wastong token o hindi sapat na mga pahintulot) |
| `404` | Hindi natagpuan |
| `500` | Error ng server |

Ang mga error sa validation ay nagbabalik ng:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Paano Basahin ang mga Talahanayan ng Endpoint

Ang bawat pahina ng module ay nag-oorganisa ng mga endpoint ayon sa controller. Ang mga talahanayan ay gumagamit ng mga kolum na ito:

| Kolum | Paglalarawan |
|--------|-------------|
| **Method** | HTTP method (`GET`, `POST`, `DELETE`) |
| **Path** | Path ng ruta na kaugnay sa base path ng controller |
| **Auth** | **JWT** = nangangailangan ng Bearer token, **Pampubliko** = walang kinakailangang auth |
| **Permission** | Kinakailangang pahintulot (hal. `People.Edit`). `—` ay nangangahulugang sinumang naka-authenticate na gumagamit |
| **Paglalarawan** | Kung ano ang ginagawa ng endpoint |

Ang mga controller na nag-eextend ng karaniwang CRUD base class ay nagbibigay ng apat na endpoint nang awtomatiko: `GET /` (ilista lahat), `GET /:id` (kunin ayon sa ID), `POST /` (lumikha/mag-update), at `DELETE /:id` (burahin).

## Module ng Pag-uulat

Ang Reporting module ay gumagana nang iba mula sa ibang mga module. Sa halip na CRUD na sinusuportahan ng database, naglo-load ito ng mga kahulugan ng ulat mula sa mga JSON file sa disk at nagpapatupad ng mga parameterized na SQL query.

| Method | Path | Auth | Paglalarawan |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | I-load ang isang kahulugan ng ulat ayon sa key name |
| GET | `/reporting/reports/:keyName/run` | JWT | Ipatupad ang isang ulat at ibalik ang mga resulta |

Ang mga parameter ng ulat ay ipinasa bilang mga halaga ng query string (hal. `?startDate=2024-01-01&endDate=2024-12-31`). Ang parameter na `churchId` ay awtomatikong itinatagda mula sa JWT token. Ang bawat kahulugan ng ulat ay maaaring tumukoy ng sariling mga kinakailangan sa pahintulot.

## Index ng Module

| Module | Base Path | Paglalarawan |
|--------|-----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Pag-login, pagpaparehistro, mga JWT token, OAuth, mga pahintulot |
| [Membership](./membership) | `/membership/*` | Mga tao, simbahan, grupo, sambahayan, tungkulin, form, setting |
| [Attendance](./attendance) | `/attendance/*` | Mga campus, serbisyo, sesyon, pagbisita, mga talaan ng check-in |
| [Content](./content) | `/content/*` | Mga pahina, sermon, event, file, gallery, Bibliya, streaming |
| [Giving](./giving) | `/giving/*` | Mga donasyon, pondo, payment gateway, subscription |
| [Messaging](./messaging) | `/messaging/*` | Mga pag-uusap, abiso, device, SMS |
| [Doing](./doing) | `/doing/*` | Mga plano, gawain, takdang-aralin, automation, pag-iiskedyul |
