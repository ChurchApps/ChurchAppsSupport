---
title: "API ključi"
description: "Ustvarjajte, omejujte in preklicujte API ključe B1 v B1 Admin za strežniške skripte in konektorje Zapier, Make ali Google Sheets brez toka OAuth."
---

# API ključi

<div class="article-intro">

API ključi (osebni dostopni žetoni) so najenostavnejši način za avtentikacijo pri API-ju B1 iz strežniške skripte, povezave tretje osebe (Zapier, Make, Google Sheets) ali kjer koli, kjer je celoten postopek OAuth preveč zapleten. Ključ je vezan na določeno osebo v določeni cerkvi in podeduje dovoljenja te osebe, ki jih lahko dodatno omejite z izbranim naborom obsegov.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Skrbnik cerkve z dovoljenjem **Urejanje nastavitev** ustvari in upravlja ključe
- Surovi ključ je prikazan **samo enkrat**, ob ustvarjanju — takoj ga shranite na varno mesto
- Vse zahteve API-ju morajo uporabljati **HTTPS**

</div>

## Oblika ključa

Ključ API B1 izgleda takole:

```
cak_<prefix>.<secret>
```

- `cak_` — fiksni identifikator (predpona ključa API, po kateri sloj za avtentikacijo prepozna ključ)
- `<prefix>` — 8-znakovni javni iskalni del
- `<secret>` — 48-znakovna skrivnost; na strežniku se shrani samo zgoščena vrednost SHA-256

Celoten ključ se strežniku predloži v standardni glavi bearer:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Sloj za avtentikacijo API-ja vsak žeton, ki se začne s `cak_`, preusmeri na pot za ključe API, zgosti skrivnost, poišče ključ po predponi in razreši trenutna dovoljenja osebe, ki ji ključ pripada. Preklic dovoljenja v B1Admin tako začne veljati že pri naslednji zahtevi, ključ pa se nikoli ne razhaja z vlogo.

## Ustvarjanje ključa (B1Admin)

1. Prijavite se v B1Admin kot uporabnik z dovoljenjem **Urejanje nastavitev**.
2. Odprite **Nastavitve → Razvijalec → API ključi**.
3. Kliknite **Nov ključ API**, mu dajte prepoznavno ime (npr. "Zapier — sinhronizacija darov"), izberite obsege, ki naj jih ključ ima, in kliknite **Shrani**.
4. Celoten ključ `cak_…` se enkrat prikaže v pogovornem oknu. Preden okno zaprete, ga kopirajte v nastavitve svoje integracije — kasneje ga ni mogoče ponovno prebrati. Vedno lahko ustvarite nov ključ.

## Obsegi

Obseg **omeji**, kaj lahko ključ počne — nikoli ne more podeliti dovoljenja, ki ga osnovna oseba nima. Prazen seznam obsegov pomeni, da ključ dobi celoten nabor dovoljenj osebe.

| Obseg | Dovoljuje |
|---|---|
| `people:read` / `people:write` | Ogled / urejanje oseb, gospodinjstev in članov skupin |
| `groups:read` / `groups:write` | Ogled / urejanje skupin in njihovega članstva |
| `donations:read` / `donations:write` | Ogled / beleženje darov |
| `attendance:read` / `attendance:write` | Ogled / beleženje udeležbe, sej in prijav |
| `forms:write` | Upravljanje obrazcev (branje je vključeno v pisanje) |
| `content:read` / `content:write` | Ogled / urejanje vsebine spletne strani, prijav in pretakanja |
| `messaging:read` / `messaging:write` | Branje sporočil; pisanje omogoča tudi pošiljanje SMS-ov |
| `roles:read` / `roles:write` | Ogled / urejanje definicij vlog |
| `settings:read` / `settings:write` | Ogled / urejanje nastavitev cerkve (**potrebno** za programsko registracijo webhookov) |
| `workflows:read` / `workflows:write` | Ogled delovnih tokov in nalog / zagon in urejanje delovnih tokov. Zagon delovnega toka lahko pošlje e-pošto in SMS-e, sproži webhooke in spremeni članstvo v skupinah |
| `offline_access` | Dovoli dolgotrajne osvežitvene žetone (samo pri tokovih OAuth — pri ključih API nima učinka) |

Obsegi `write` vključujejo ustrezni `read` implicitno. Skrbniška dovoljenja strežnika in domene namenoma niso izpostavljena kot obsegi — poverilnica z omejenimi obsegi nikoli ne more dvigniti dostopa na skrbništvo spletnega mesta.

:::tip
Če boste ključ uporabljali za registracijo webhookov (npr. za integracijo Zapier ali Make), ključ potrebuje `settings:write`. Ključ z samo `people:read` tiho vrne napako 403 pri `POST /membership/webhooks`.
:::

## Uporaba ključa

Enako kot vsak nosilni žeton — vsaka končna točka z avtentikacijo sprejme ključe API natanko tako kot JWT-je:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Zahteva, katere ključ nima dovolj obsegov, vrne **403 Forbidden** v isti obliki kot vsaka napaka zavrnjenega dovoljenja.

## Upravljanje ključev prek API-ja

Vse končne točke so pod potjo `/membership/apiKeys` modula Membership in zahtevajo JWT (ne ključa API) od skrbnika cerkve z dovoljenjem **Urejanje nastavitev**.

| Metoda in pot | Namen |
|---|---|
| `GET /membership/apiKeys` | Seznam ključev cerkve (brez skrivnosti — samo `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Seznam vseh razpoložljivih imen obsegov — za uporabniški vmesnik pri ustvarjanju ključa |
| `POST /membership/apiKeys` | Ustvari nov ključ. Telo: `{ "name": "...", "scopes": ["people:read"] }`. Odgovor vsebuje surovi ključ `cak_…` **samo enkrat**. |
| `DELETE /membership/apiKeys/:id` | Prekliče ključ — začne veljati pri naslednji zahtevi |

Preklicani ključ takoj neha delovati — ni nobenega obdobja milosti.

## Najboljše prakse

- **En ključ za vsako integracijo.** Če je nekaj ogroženo, prekličete samo en ključ, ne da bi prekinili druge.
- **Ustvarite kar najožje obsege, ki delujejo.** Izvoz v Google Sheets potrebuje samo `people:read`, ne `settings:write`.
- **Ključ vežite na servisni račun, ne na pravega zaposlenega.** Če zaposleni odide, se mu dostop do B1 konča — in z njim tudi vsi ključi, ustvarjeni pod njegovo identiteto.
- **Ključe shranjujte v upravitelju skrivnosti** (spremenljivke okolja vašega gostitelja, AWS Secrets Manager itd.) — nikoli v sistemu za nadzor različic.
- **Zamenjajte ključe**, če sumite, da so bili izpostavljeni: ustvarite nov ključ, posodobite integracijo in nato izbrišite stari ključ.

## Razlika od OAuth

Ključi API so primerni, kadar je **vaša cerkev edina, ki uporablja integracijo**. Za povezavo, ki mora dostopati do mnogih cerkva z izrecnim soglasjem vsake — na primer aplikacijo SaaS, deljeno v skupnosti B1 — raje uporabite [OAuth in povezane aplikacije](./connected-apps.md).

| | Ključ API | OAuth |
|---|---|---|
| Kdo ga namesti | En skrbnik cerkve | Vsak skrbnik cerkve odobri aplikacijo |
| Glava za avtentikacijo | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Življenjska doba žetona | Do preklica | Dostop ≈ 7 dni, osvežitev ≈ 90 dni |
| Najprimernejše za | Interne skripte, povezave Zapier/Make/Sheets | Večnajemniške aplikacije tretjih oseb |
