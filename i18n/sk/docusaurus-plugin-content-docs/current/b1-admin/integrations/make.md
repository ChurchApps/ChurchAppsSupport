---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (predtým Integromat) je vizuálna platforma na automatizáciu pracovných postupov. Svojím zameraním je podobná Zapieru, ponúka však flexibilnejšiu logiku a pri väčšom objeme lacnejšiu cenu. Oficiálna aplikácia Make pre B1.church vám umožňuje vytvárať „scenáre“, ktoré okamžite reagujú na udalosti v B1 a zapisujú záznamy späť do B1.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet v [Make](https://www.make.com) (bezplatná úroveň stačí na menšie pracovné postupy)
- Správca cirkvi s oprávnením **Edit Settings** v B1Admin
- Hrubú predstavu o scenári, ktorý chcete vytvoriť

</div>

## Moduly

| Typ | Čo | Udalosť / koncový bod B1 |
|---|---|---|
| **Instant Trigger** | Watch Events | ľubovoľná odoberaná udalosť B1 (`person.created`, `donation.created`, …) |
| **Action** | Create Person | pridá novú osobu |
| **Action** | Add Donation | zaznamená dar |
| **Action** | Add Group Member | pridá osobu do skupiny |
| **Search** | Search People | nájde osoby podľa mena alebo e-mailu |

Okamžitý spúšťač vám umožňuje vybrať, ktorú udalosť má sledovať. Každý scenár obsahuje jeden modul spúšťača, ktorý sa nastavuje pre konkrétnu udalosť.

## Nastavenie

### 1. Vytvorte kľúč API pre B1

1. V B1Admin prejdite na **Settings → Developer → API Keys**.
2. Kliknite na **New API Key**, pomenujte ho „Make“ a udeľte rozsahy, ktoré potrebujete.
3. **Zahrňte `settings:write`**, ak niektorý z vašich scenárov používa okamžitý spúšťač. Make pri zapnutí scenára zaregistruje webhook v mene vášho účtu.
4. Udeľte tiež rozsahy, ktoré potrebujú akčné moduly (napr. `donations:write` pre modul Add Donation).
5. Uložte a skopírujte kľúč `cak_…`.

### 2. Nainštalujte pripojenie

1. V Make vytvorte nový scenár a pretiahnite modul spúšťača **B1.church** na plátno.
2. Keď sa zobrazí výzva, zvoľte **Create a connection**. Vložte kľúč API do poľa *API Key* a v poli *API Base URL* ponechajte `https://api.churchapps.org` (pokiaľ netestujete na staging prostredí).
3. Kliknite na **Save**. Make kľúč otestuje načítaním profilu vašej cirkvi.

Pripojenie sa uloží vo vašom účte Make a použije sa vo všetkých scenároch.

### 3. Nakonfigurujte spúšťač

1. Otvorte nastavenia modulu **Watch Events**.
2. Vyberte udalosť, ktorú chcete sledovať, napr. `donation.created`.
3. Uložte nastavenia. Make vygeneruje jedinečnú webhook URL a interne ju uloží.

### 4. Pridajte nadväzujúce moduly

Na plátno môžete pridať ktorýkoľvek z viac ako stoviek aplikačných modulov Make, napríklad Mailchimp, Google Sheets, Slack, HubSpot alebo váš vlastný HTTP koncový bod. Výstup spúšťača (`event`, `churchId`, `data.id`, `data.amount`, …) namapujte do ich vstupných polí. Moduly Make flatten, iterator, router a aggregator vám umožnia vytvárať vetvené a paralelné toky, ktoré by v Zapieri boli ťažko realizovateľné.

### 5. Zapnite scenár

Prepnite **Active** v hlavičke scenára. Make zavolá B1 `POST /membership/webhooks` a zaregistruje URL. Od tohto okamihu každá zodpovedajúca udalosť v B1 prechádza scenárom v reálnom čase.

Vypnutím scenára sa zavolá `DELETE /membership/webhooks/{id}`, takže nezostanú žiadne osirelé odbery.

## Bežné postupy

### Synchronizácia darov do Google Sheets na finančnú kontrolu

- **Spúšťač** — B1: Watch Events (`donation.created`)
- **Akcia** — Google Sheets: Add a Row. Namapujte `data.donationDate`, `data.amount`, `data.personId`, `data.method` a `data.batchId` do stĺpcov tabuľky.

### Podmienené upozornenie v Slacku podľa výšky daru

- **Spúšťač** — B1: Watch Events (`donation.created`)
- **Router**:
  - Vetva A — Filter: `data.amount >= 1000` → Slack: odoslať správu do `#major-gifts`
  - Vetva B — všetko ostatné → Slack: odoslať správu do `#donations`

### Nová osoba → CRM + uvítací e-mail + Slack

- **Spúšťač** — B1: Watch Events (`person.created`)
- **Akcia** — HubSpot: Create Contact
- **Akcia** — Mailgun: Send Welcome Email
- **Akcia** — Slack: Notify `#new-people` (paralelne, pomocou routera Make)

## Ako funguje okamžitý spúšťač

Okamžitý spúšťač je založený na webhookoch, nie na dopytovaní. Po aktivácii Make zavolá `POST /membership/webhooks` s vygenerovanou URL a zvolenou udalosťou. Keď sa udalosť v B1 vykoná, B1 odošle obálku na URL Make a váš scenár sa spustí do niekoľkých sekúnd. Deaktivácia scenára webhook odstráni.

Spúšťač reaguje iba na udalosti, ktoré nastanú **počas aktívneho scenára**. Spätné dopĺňanie udalostí neexistuje.

## Obmedzenia a poznámky

- **Jedna udalosť na modul Watch Events.** Ak chcete v jednom scenári sledovať viacero udalostí, pridajte viac modulov spúšťača do samostatných scenárov, prípadne použite jeden modul so zjednoteným zoznamom udalostí (pozri nižšie).
- **Overenie podpisu nie je dostupné.** Make neodovzdáva `X-B1-Signature` do scenára. Hranicou dôvery je neuhádnuteľná webhook URL, ktorú Make priradí každému scenáru. Ide o bežnú prax v Make. Ak potrebujete explicitné kontroly podpisu, vytvorte vlastnú integráciu pomocou [SDK](/docs/developer/api/webhooks#sdk-support).
- **Počet operácií.** Každé volanie API z akčného modulu sa počíta do vašej kvóty operácií Make, nie do ničoho na strane B1.

## Riešenie problémov

- **Test pripojenia zlyhá.** Najčastejšie ide o preklep v kľúči API. Skopírujte ho znova z B1Admin. Úplný kľúč sa zobrazí iba raz, takže ak ste ho stratili, vytvorte nový kľúč.
- **Modul spúšťača sa neaktivuje.** Skontrolujte **Settings → Developer → Webhooks** v B1Admin. Ak po aktivácii scenára nevidíte riadok „Make — &lt;event&gt;“, kľúču chýba `settings:write`. Aktualizujte kľúč a scenár znova aktivujte.
- **Akcia vráti `403 Forbidden`.** Kľúč API nemá rozsah pre daný koncový bod. Napríklad modul Add Donation vyžaduje `donations:write`. Aktualizujte kľúč v B1Admin a otestujte znova.

## Prispôsobenie aplikácie

Aplikácia Make pre B1.church je open source. Definície JSON sa nachádzajú v repozitári `B1Integrations/Make/`. Ak potrebujete modul, ktorý neexistuje (napr. novú akciu pre koncový bod, ktorý ešte nepokrývame), otvorte tam issue alebo pull request.

## Pozri tiež

- [Zapier](./zapier) — rovnaký vzor s jednoduchším rozhraním a väčším katalógom aplikácií
- [Slack & Discord](./slack-discord) — vstavané upozornenia v chate bez použitia Make
- [Webhooky (referencia pre vývojárov)](/docs/developer/api/webhooks)
