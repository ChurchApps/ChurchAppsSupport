---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) je avstralski API za SMS sporočila, priljubljen med avstralskimi cerkvami, ker ponuja lokalne številke in konkurenčne avstralske cene, medtem ko sta Clearstream in Text In Church usmerjena v ZDA. Mobile Message danes nima uradne aplikacije za Zapier, vendar objavlja javni REST API, zato lahko dogodke v B1 v nekaj minutah povežete s SMS sporočili Mobile Message prek Webhooks by Zapier (ali modula HTTP v Make).

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun pri [Mobile Message](https://mobilemessage.com.au) z registriranim ID-jem pošiljatelja in API poverilnicami (uporabniško ime API in geslo pod *Račun → Nastavitve API*)
- Račun pri [Zapier](https://zapier.com) (ali [Make](https://www.make.com))
- Uporabnik B1Admin z dovoljenjem **Urejanje nastavitev**

</div>

## Kaj lahko povežete

API Mobile Message je zasnovan za pošiljanje SMS sporočil: nima sprožilcev, omogoča le odhodna sporočila. Zato so vsi recepti oblike B1 → SMS:

| Smer | Sprožilec v B1 | Rezultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Dobrodošlično sporočilo novi osebi |
| B1 → Mobile Message | `donation.created` | Zahvalno sporočilo darovalcu |
| B1 → Mobile Message | `form.submission.created` | Obvestilo dežurni ekipi |
| B1 → Mobile Message | `event.created` | Opomnik, poslan po seznamu |

## Nastavitev

### 1. Ustvarite ključ API v B1

**Nastavitve → Razvijalec → Ključi API → Nov ključ API**:

- `settings:write` — za registracijo sprožilnega webhooka
- `people:read` — za iskanje telefonske številke prejemnika na podlagi `personId`

### 2. Ustvarite Zap z Webhooks by Zapier

1. **Sprožilec** — B1.church: izberite dogodek (npr. Nov dar).
2. **Dejanje** — B1.church: Poišči osebo (z uporabo `data.personId`), da pridobite telefonsko številko in ime.
3. **Dejanje** — Webhooks by Zapier: **POST**. Nastavite, kot je spodaj.

Nastavitve koraka POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Vrsta podatkov** — JSON
- **Podatki** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Glave** — `Content-Type: application/json` (Webhooks by Zapier to doda samodejno)
- **Basic Auth** — v polje *Basic Auth* vnesite `<api_username>|<api_password>` (Zapier to pretvori v pravilno glavo `Authorization: Basic …`)

Vklopite Zap. Pošljite testni dar v B1Admin, da preverite, ali sporočilo prispe.

## Pogosti recepti

### Opomniki o dogodkih zjutraj

- **Sprožilec** — Schedule by Zapier (dnevno ob 7.)
- **Dejanje** — B1.church: Poišči dogodke za danes (ali uporabite korak Poišči s fiksnim filtrom datuma ali shranite seznam današnjih dogodkov v Google Sheet)
- **Dejanje** — Webhooks by Zapier: POST na Mobile Message s seznamom dogodkov za registrirano skupino naročnikov

### Uporaba paketne končne točke za množično oddajo seznamu

Končna točka `/v1/messages` pri Mobile Message sprejme do 10.000 sporočil na klic. Za množično oddajo skupini v B1:

- **Sprožilec** — B1.church: Nova oddaja obrazca (filtrirajte na določen obrazec)
- **Dejanje** — B1.church: Seznam članov ciljne skupine (prek koraka *Webhooks by Zapier — GET* na `/membership/groupmembers?groupId=…`)
- **Dejanje** — Formatter by Zapier → Utilities → Razbijte odgovor v vrstice v polje (array) `messages`
- **Dejanje** — Webhooks by Zapier: POST celotnega polja na `/v1/messages`

### Alternativa Make

Če raje uporabljate Make, po sprožilcu B1 Watch Events dodajte modul **HTTP — Make a request** in ga nastavite enako (POST, Basic Auth, JSON telo). Za stran B1 glejte [pregled Make](../make).

## Omejitve in opombe

- **Basic Auth je edina metoda avtentikacije.** Mobile Message izda uporabniško ime in geslo na nadzorni plošči. Obe obravnavajte kot skrivnosti.
- **`sender` mora biti registriran ID pošiljatelja** v vašem računu Mobile Message, sicer pošiljanje vrne `400 Invalid sender`. Predpisi v Avstraliji zahtevajo registracijo pošiljatelja.
- **Avstralske telefonske številke** so lahko `0412345678` (lokalno) ali `+61412345678` (mednarodno). API sprejme obe obliki, vendar če pošiljate tudi v tujino, številke normalizirajte na obliko `+61…`.
- **Do 10.000 sporočil na zahtevo.** To je uporabno za množična obveščanja, vendar en sam klic webhooka iz B1 le redko odda tako velik seznam, zato paketno končno točko rezervirajte za načrtovane množične Zape.

## Odpravljanje težav

- **POST vrne `401 Unauthorized`** — poverilnice Basic Auth so napačne. Ponovno jih kopirajte z nadzorne plošče Mobile Message: *Račun → Nastavitve API*. Uporabniško ime je privzeto e-poštni naslov vašega računa, ne ločen ključ API.
- **POST vrne `400 Invalid sender`** — vrednost `sender` ni registriran ID pošiljatelja v vašem računu. Najprej ga registrirajte na nadzorni plošči Mobile Message.
- **Sporočilo prispe, vendar je okrnjeno** — Mobile Message razdeli sporočila, daljša od približno 160 znakov, na več delov, za vsakega pa se zaračuna posebej. V telesu odgovora je navedeno število delov.

## Glejte tudi

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternativna ponudnika SMS z uradnimi aplikacijami za Zapier (korak Webhooks by Zapier ni potreben)
- [Zapier (pregled)](../zapier) — stran B1 za vse recepte Zapier
- [Dokumentacija API Mobile Message](https://mobilemessage.com.au/api-documentation)
