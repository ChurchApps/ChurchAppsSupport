---
title: "Galutinių taškų nuoroda"
---

# Galutinių taškų nuoroda

<div class="article-intro">

Šiame skyriuje aprašyti visi REST galutiniai taškai, kuriuos teikia ChurchApps API. Kiekviename modulio puslapyje išvardyti visi maršrutai su HTTP metodu, keliu, autentifikavimo reikalavimais ir reikalingais leidimais.

</div>

## Bazinis URL

| Aplinka | URL |
|---------|-----|
| Vietinė kūrimo aplinka | `http://localhost:8084` |
| Produkcinė aplinka | `https://api.churchapps.org` |

## Užklausų konvencijos

- **Content-Type:** Visi užklausų ir atsakymų turiniai naudoja `application/json`
- **Multi-tenant:** Kiekviena autentifikuota užklausa apribojama `churchId`, išgautu iš JWT žetono – `churchId` URL adrese perduoti nereikia
- **Masinis išsaugojimas:** Dauguma `POST` galutinių taškų priima **objektų masyvą**. API vienu kvietimu įterps naujus įrašus (be `id` lauko) ir atnaujins esamus įrašus (su `id` lauku)
- **ID:** Visi subjektų ID yra UUID

### Pavyzdys: masinis išsaugojimas

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Pirmasis objektas bus sukurtas (naujas), o antrasis – atnaujintas (turi `id`).

## Atsakymo formatas

Sėkmingi atsakymai grąžina JSON – arba vieną objektą, arba masyvą. Klaidų atsakymai naudoja standartinius HTTP statuso kodus:

| Kodas | Reikšmė |
|-------|---------|
| `200` | Sėkmingai |
| `400` | Neteisinga užklausa (validacijos klaidos) |
| `401` | Neautorizuota (trūksta arba netinkamas žetonas, arba nepakanka leidimų) |
| `404` | Nerasta |
| `500` | Serverio klaida |

Validacijos klaidos grąžina:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Kaip skaityti galutinių taškų lenteles

Kiekvienas modulio puslapis galutinius taškus suskirsto pagal valdiklį (controller). Lentelėse naudojami šie stulpeliai:

| Stulpelis | Aprašymas |
|-----------|-----------|
| **Metodas** | HTTP metodas (`GET`, `POST`, `DELETE`) |
| **Kelias** | Maršruto kelias, santykinis valdiklio bazinio kelio atžvilgiu |
| **Auth** | **JWT** = reikalingas Bearer žetonas, **Public** = autentifikavimas nereikalingas |
| **Leidimas** | Reikalingas leidimas (pvz., `People.Edit`). `—` reiškia, kad pakanka bet kurio prisijungusio naudotojo |
| **Aprašymas** | Ką daro galutinis taškas |

Valdikliai, paveldintys standartinę CRUD bazinę klasę, automatiškai pateikia keturis galutinius taškus: `GET /` (išvardyti visus), `GET /:id` (gauti pagal ID), `POST /` (sukurti arba atnaujinti) ir `DELETE /:id` (ištrinti).

## Ataskaitų modulis

Ataskaitų modulis veikia kitaip nei kiti moduliai. Vietoj duomenų bazėje saugomų CRUD operacijų jis įkelia ataskaitų aprašus iš JSON failų diske ir vykdo parametrizuotas SQL užklausas.

| Metodas | Kelias | Auth | Aprašymas |
|---------|--------|------|-----------|
| GET | `/reporting/reports/:keyName` | JWT | Įkelti ataskaitos aprašą pagal raktinį pavadinimą |
| GET | `/reporting/reports/:keyName/run` | JWT | Vykdyti ataskaitą ir grąžinti rezultatus |

Ataskaitų parametrai perduodami kaip užklausos eilutės reikšmės (pvz., `?startDate=2024-01-01&endDate=2024-12-31`). Parametras `churchId` automatiškai įtraukiamas iš JWT žetono. Kiekvienas ataskaitos aprašas gali nurodyti savo leidimų reikalavimus.

## Modulių rodyklė

| Modulis | Bazinis kelias | Aprašymas |
|---------|----------------|-----------|
| [Autentifikavimas](./authentication) | `/membership/users`, `/membership/oauth` | Prisijungimas, registracija, JWT žetonai, OAuth, leidimai |
| [Narystė](./membership) | `/membership/*` | Asmenys, bažnyčios, grupės, namų ūkiai, vaidmenys, formos, nustatymai |
| [Lankomumas](./attendance) | `/attendance/*` | Filialai, pamaldos, sesijos, apsilankymai, registracijos įrašai |
| [Turinys](./content) | `/content/*` | Puslapiai, pamokslai, renginiai, failai, galerijos, Biblija, transliacijos |
| [Aukojimai](./giving) | `/giving/*` | Aukos, fondai, mokėjimų vartai, prenumeratos |
| [Pranešimai](./messaging) | `/messaging/*` | Pokalbiai, pranešimai, įrenginiai, SMS |
| [Doing](./doing) | `/doing/*` | Planai, užduotys, priskyrimai, automatizavimas, tvarkaraščiai |
