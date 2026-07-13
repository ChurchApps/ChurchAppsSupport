---
title: "Luhla Lwema-Endpoint"
---

# Luhla Lwema-Endpoint

<div class="article-intro">

Lesigaba sichaza tonkhe tema-endpoint te-REST letikhitjwa yi-ChurchApps API. Likhasi lemodule ngalinye libala umkhondvo ngamunye nendlela yawo ye-HTTP, tidzingo tekutivakalisa, kanye netimvumo letidzingekako.

</div>

## URL Yesisekelo

| Simo | URL |
|-------------|-----|
| Kutfutfuka endzaweni | `http://localhost:8084` |
| Production | `https://api.churchapps.org` |

## Tinchubo Tesicelo

- **Content-Type:** Yonkhe imitimba yesicelo nemphendvulo isebentisa i-`application/json`
- **Multi-tenant:** Sicelo ngasinye lesitivakalisiwe sincishiswa yi-`churchId` lekhishwe ku-JWT token — awukayidluliseli i-`churchId` ku-URL
- **Kugcina nge-batch:** Emaningi ema-endpoint e-`POST` yemukela **luhla lwetitfo**. I-API itawufaka imibhalo lemisha (kute insimu ye-`id`) futsi ibuyeketa leyekhona (nge-`id`) kubita kunye
- **Ema-ID:** Onkhe ema-ID etitfo ngema-UUID

### Sibonelo: Kugcina Nge-Batch

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Sitfo sekucala siyakhiwa (kusha); sesibili siyabuyeketwa (sinayo i-`id`).

## Umumo We-Mphendvulo

Timphendvulo letiphumelele tibuyisela i-JSON — nome sitfo lesisodwa nobe luhla. Timphendvulo temaphutsa tisebentisa emakhodi lavamile e-status e-HTTP:

| Ikhodi | Incazelo |
|------|---------|
| `200` | Kuphumelele |
| `400` | Sicelo lesibi (emaphutsa ekucinisekisa) |
| `401` | Akuvunyelwe (token lelisilele/lengafanele nobe timvumo letingenele) |
| `404` | Akutfolakalanga |
| `500` | Liphutsa le-server |

Emaphutsa ekucinisekisa abuyisela:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Indlela Yekufundza Emathebula Ema-Endpoint

Likhasi lemodule ngalinye lihlela ema-endpoint nge-controller. Emathebula asebentisa lamakholomu:

| Kholomu | Incazelo |
|--------|-------------|
| **Inchubo** | Indlela ye-HTTP (`GET`, `POST`, `DELETE`) |
| **Umkhondvo** | Umkhondvo lohambisana nemkhondvo losisekelo we-controller |
| **Kutivakalisa** | **JWT** = idzinga i-Bearer token, **Ngeyeveleni** = akudzingi kutivakalisa |
| **Imvumo** | Imvumo ledzingekako (sibonelo `People.Edit`). `—` kusho umsebentisi lotivakalisiwe nome ngubani |
| **Incazelo** | Loku i-endpoint lokwentako |

Ema-controller lasandisa i-CRUD base class levamile aniketa ema-endpoint lamane ngekutentekela: `GET /` (bala konkhe), `GET /:id` (tfola nge-ID), `POST /` (akha/buyeketa), kanye ne-`DELETE /:id` (sula).

## Module Ye-Reporting

I-module ye-Reporting isebenta ngendlela lehlukile kunaletinye ema-module. Kunekutsi isebentise i-CRUD lesekelwe ku-database, ilayisha ticazelo tembiko kusuka kumafayela e-JSON ku-disk futsi ihambise imibuto ye-SQL lene-parameter.

| Inchubo | Umkhondvo | Kutivakalisa | Incazelo |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Layisha sichazo sembiko nge-ligama lakhona (key name) |
| GET | `/reporting/reports/:keyName/run` | JWT | Hambisa umbiko futsi ubuyisele imiphumela |

Ema-parameter embiko adluliswa njengemanani e-query string (sibonelo `?startDate=2024-01-01&endDate=2024-12-31`). I-parameter ye-`churchId` ifakwa ngekutentekela kusuka ku-JWT token. Sichazo sembiko ngasinye singachaza tidzingo tayo tekwehlukene temvumo.

## Luhla Lwema-Module

| Module | Umkhondvo Losisekelo | Incazelo |
|--------|-----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Kungena, kubhaliswa, ema-token e-JWT, i-OAuth, timvumo |
| [Membership](./membership) | `/membership/*` | Bantfu, emabandla, emacembu, emakhaya, ema-role, emafomu, tilungiselelo |
| [Attendance](./attendance) | `/attendance/*` | Ema-campus, ema-service, ticgawu, kuvakasha, imibhalo yekungena |
| [Content](./content) | `/content/*` | Emakhasi, tishumayelo, imicimbi, emafayela, ema-gallery, liBhayibheli, kusakaza |
| [Giving](./giving) | `/giving/*` | Eminikelo, tikhwama, ema-gateway etinkhokhelo, ema-subscription |
| [Messaging](./messaging) | `/messaging/*` | Tinkhulumo, tatiso, emadivayisi, i-SMS |
| [Doing](./doing) | `/doing/*` | Ema-plan, imisebenti, kwabelwa, kuzenzakalela, kuhlelwa kwesikhatsi |
