---
title: "API kľúče"
---

# API kľúče

<div class="article-intro">

API kľúče (osobné prístupové tokeny) sú najjednoduchší spôsob, ako sa autentifikovať voči B1 API zo serverového skriptu, konektora tretej strany (Zapier, Make, Google Sheets) alebo kdekoľvek, kde je úplný tok OAuth zbytočne zložitý. Kľúč je viazaný na konkrétnu osobu v konkrétnej cirkvi a dedí oprávnenia tejto osoby, ktoré je možné voliteľne zúžiť sadou rozsahov (scopes).

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Kľúče vytvára a spravuje správca cirkvi s oprávnením **Upraviť nastavenia**
- Surový kľúč sa zobrazí **iba raz** pri vytvorení – okamžite ho uložte na bezpečné miesto
- Všetky požiadavky na API musia používať **HTTPS**

</div>

## Formát kľúča

Kľúč B1 API vyzerá takto:

```
cak_<prefix>.<secret>
```

- `cak_` — pevný identifikátor (prefix API kľúča, podľa ktorého autentifikačná vrstva kľúč rozpoznáva)
- `<prefix>` — 8-znakový verejný vyhľadávací segment
- `<secret>` — 48-znakové tajomstvo; na strane servera sa ukladá iba hash SHA-256

Úplný kľúč sa serveru predkladá v štandardnej hlavičke bearer:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Autentifikačná vrstva API smeruje každý token začínajúci na `cak_` do cesty pre API kľúče, zahashuje tajomstvo, vyhľadá kľúč podľa prefixu a zistí aktuálne oprávnenia osoby, ktorej kľúč patrí. Odobratie oprávnenia v B1Admin sa preto prejaví už pri ďalšej požiadavke a kľúč nikdy nie je nesúladný s rolou.

## Vytvorenie kľúča (B1Admin)

1. Prihláste sa do B1Admin ako používateľ s oprávnením **Upraviť nastavenia**.
2. Otvorte **Nastavenia → Vývojár → API kľúče**.
3. Kliknite na **Nový API kľúč**, zadajte rozpoznateľný názov (napr. „Zapier — synchronizácia darov“), vyberte rozsahy, ktoré má kľúč mať, a kliknite na **Uložiť**.
4. Úplný kľúč `cak_…` sa zobrazí **iba raz** v dialógovom okne. Skopírujte ho do konfigurácie svojej integrácie ešte pred zatvorením okna – neskôr ho už nebude možné získať. Nový kľúč môžete kedykoľvek vytvoriť znova.

## Rozsahy (scopes)

Rozsah kľúč **zužuje** – nikdy nemôže udeliť oprávnenie, ktoré osoba nemá. Prázdny zoznam rozsahov znamená, že kľúč má celú sadu oprávnení danej osoby.

| Rozsah | Umožňuje |
|---|---|
| `people:read` / `people:write` | Zobrazovanie / úprava osôb, domácností, členov skupín |
| `groups:read` / `groups:write` | Zobrazovanie / úprava skupín a ich členstva |
| `donations:read` / `donations:write` | Zobrazovanie / zaznamenávanie darov |
| `attendance:read` / `attendance:write` | Zobrazovanie / zaznamenávanie účasti, relácií a prihlásení |
| `forms:write` | Správa formulárov (prístup na čítanie je implicitne súčasťou zápisu) |
| `content:read` / `content:write` | Zobrazovanie / úprava obsahu webu, registrácií a streamovania |
| `messaging:read` / `messaging:write` | Čítanie správ; zápis umožňuje aj odosielanie SMS |
| `roles:read` / `roles:write` | Zobrazovanie / úprava definícií rolí |
| `settings:read` / `settings:write` | Zobrazovanie / úprava nastavení cirkvi (**potrebné** na programovú registráciu webhookov) |
| `workflows:read` / `workflows:write` | Zobrazovanie pracovných postupov a úloh / spúšťanie a úprava pracovných postupov. Spustenie pracovného postupu môže odoslať e-maily a správy, spustiť webhooky a zmeniť členstvo v skupinách |
| `offline_access` | Umožňuje dlhodobo platné obnovovacie tokeny (iba pri tokoch OAuth – na API kľúče nemá žiadny vplyv) |

Rozsahy `write` implicitne zahŕňajú zodpovedajúci `read`. Oprávnenia serverového a doménového administrátora nie sú úmyselne sprístupnené ako rozsahy – poverenie s obmedzeným rozsahom nikdy nemôže získať správcovský prístup k webu.

:::tip
Ak budete kľúč používať na registráciu webhookov (napr. pre integráciu so Zapier alebo Make), kľúč potrebuje `settings:write`. Kľúč iba s `people:read` bez upozornenia vráti chybu 403 pri `POST /membership/webhooks`.
:::

## Používanie kľúča

Rovnako ako ľubovoľný bearer token – každý autentifikovaný koncový bod prijíma API kľúče presne tak, ako prijíma tokeny JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Ak má kľúč v požiadavke nedostatočné rozsahy, server odpovie **403 Forbidden** v rovnakom tvare, ako každá iná chyba odmietnutia oprávnenia.

## Správa kľúčov cez API

Všetky koncové body sa nachádzajú pod cestou `/membership/apiKeys` modulu Membership a vyžadujú JWT (nie API kľúč) od správcu cirkvi s oprávnením **Upraviť nastavenia**.

| Metóda a cesta | Účel |
|---|---|
| `GET /membership/apiKeys` | Výpis kľúčov cirkvi (bez tajomstva – iba `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Zoznam všetkých dostupných názvov rozsahov – pre používateľské rozhranie na vytváranie kľúčov |
| `POST /membership/apiKeys` | Vytvorenie nového kľúča. Telo: `{ "name": "...", "scopes": ["people:read"] }`. Odpoveď obsahuje surový kľúč `cak_…` **iba raz**. |
| `DELETE /membership/apiKeys/:id` | Odvolanie kľúča – prejaví sa pri ďalšej požiadavke |

Odvolaný kľúč prestane fungovať okamžite – neexistuje žiadna lehota na prechod.

## Osvedčené postupy

- **Jeden kľúč pre každú integráciu.** Ak dôjde ku kompromitácii, odvoláte iba jeden kľúč bez narušenia ostatných.
- **Vytvárajte čo najužšie rozsahy, ktoré stačia.** Export do Google Sheets potrebuje iba `people:read`, nie `settings:write`.
- **Viažte kľúč na servisný účet, nie na skutočného zamestnanca.** Keď zamestnanec odíde, jeho prístup k B1 sa skončí – a spolu s ním aj všetky kľúče vytvorené pod jeho identitou.
- **Ukladajte kľúče do správcu tajomstiev** (premenné prostredia vášho hostingového poskytovateľa, AWS Secrets Manager a pod.) – nikdy nie do systému správy verzií.
- **Ak máte podozrenie na únik, kľúče obnovte:** vytvorte nový kľúč, aktualizujte integráciu a potom starý kľúč odstráňte.

## Rozdiel oproti OAuth

API kľúče sú vhodné vtedy, keď **vaša cirkev je jediná, ktorá integráciu používa**. Pre konektor, ktorý potrebuje prístup k mnohým cirkvám s výslovným súhlasom každej z nich – napríklad aplikáciu SaaS zdieľanú v komunite B1 – použite namiesto toho [OAuth a prepojené aplikácie](./connected-apps).

| | API kľúč | OAuth |
|---|---|---|
| Kto ho inštaluje | Jeden správca cirkvi | Každý správca cirkvi aplikáciu autorizuje |
| Hlavička autentifikácie | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Životnosť tokenu | Až do odvolania | Prístup ≈ 7 dní, obnovenie ≈ 90 dní |
| Najvhodnejšie pre | Interné skripty, konektory Zapier/Make/Sheets | Viacnájomové aplikácie tretích strán |
