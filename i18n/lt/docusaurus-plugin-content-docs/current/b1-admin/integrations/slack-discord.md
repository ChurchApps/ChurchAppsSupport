---
title: "Slack a Discord"
description: "Siųskite B1 Admin įvykius, pvz., naujus asmenis, aukas ir formų pateikimus, į Slack ar Discord kanalą per įeinantį webhook, be Zapier."
---

# Slack a Discord

<div class="article-intro">

Posielajte čitateľné upozornenia z B1 priamo do kanála v Slacku alebo Discorde — nových ľudí, dary, prihlásenia do skupín, odoslané formuláre, udalosti v kalendári a ďalšie. Nepotrebujete účet žiadnej tretej strany ani Zap, ktorý by bolo treba udržiavať: B1 udalosti preformátuje do správ pre chat a odošle ich priamo na webhook URL kanála.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie **Edit Settings** v B1Admin
- Správcu vo vašom pracovnom priestore Slack alebo na serveri Discord, ktorý vytvorí Incoming Webhook pre kanál
- Rozhodnite sa, do ktorého kanála chcete upozornenia (môžete použiť rovnaký kanál pre viacero typov udalostí alebo ich rozdeliť do viacerých kanálov)

</div>

## Ako to funguje

B1 má vstavaný **Connector Type** pre chatové platformy. Keď vytvoríte webhook s typom **Slack** alebo **Discord**, webhook engine stále vykonáva svoje obvyklé doručovanie, opakovanie pokusov a podpisované hlavičky, ale telo požiadavky sa prevedie z bežného obalu B1 `{event,churchId,data}` na krátku správu `{text}` (Slack) alebo `{content}` (Discord), ktorú tieto služby očakávajú.

Okrem existujúceho odchádzajúceho toku webhookov B1 neoslovuje Slack za každý kostol zvlášť — nič nové sa nehostuje a nič navyše sa neplatí.

## Slack — krok za krokom

### 1. Získajte Incoming Webhook URL pre Slack

1. Otvorte [api.slack.com/apps](https://api.slack.com/apps) v pracovnom priestore Slack, do ktorého chcete upozornenia.
2. Kliknite na **Create New App → From scratch**, pomenujte ju napríklad „B1 Notifications“ a vyberte pracovný priestor.
3. V ľavej navigácii vyberte **Incoming Webhooks** a prepnite **Activate Incoming Webhooks** na *On*.
4. Kliknite na **Add New Webhook to Workspace**, vyberte kanál (napr. `#donations`) a potom **Allow**.
5. Slack vás vráti na stránku s novou **Webhook URL**, ktorá vyzerá takto: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Skopírujte ju — je to jediný údaj, ktorý B1 potrebuje.

:::caution
Webhook URL pre Slack berte ako tajomstvo. Ktokoľvek, kto ju má, môže do kanála posielať ľubovoľné správy. Ak ju náhodou niekde zverejníte, vygenerujte ju znova na stránke vašej aplikácie v Slacku (regenerácia iba zmení URL; potom ju aktualizujte aj v B1).
:::

### 2. Pripojte ju v B1Admin

1. V B1Admin prejdite na **Settings → Developer → Webhooks**.
2. Kliknite na **New Webhook**.
3. Vyplňte:
   - **Name** — niečo zrozumiteľné, napríklad „Dary → #donations“. Vidí to len váš tím.
   - **Connector Type** — vyberte **Slack**.
   - **Payload URL** — vložte Slack URL z kroku 1.
   - **Events** — označte udalosti, ktoré chcete dostávať ako správy. Pre kanál s darmi stačí `donation.created`. Pre kanál #people skúste `person.created` a `group.member.added`.
4. Kliknite na **Save**. Zobrazí sa dialóg „Signing Secret“ — pre Slack ho môžete ignorovať (Slack podpisy B1 neoverує) a zavrieť ho.

### 3. Otestujte to

Znova otvorte webhook zo zoznamu a kliknite na **Send Test Event**. Do jednej-dvoch sekúnd sa vo vašom kanáli Slack objaví správa podobná tejto:

> 💝 New donation: $50.00

a v tabuľke **Recent Deliveries** na tej istej obrazovke sa objaví nový riadok so stavom `succeeded`. Hotovo.

## Discord — krok za krokom

### 1. Získajte Discord Webhook URL

1. Na vašom serveri Discord prejdite myšou na kanál, v ktorom chcete upozornenia, a kliknite na **⚙ ozubené koliesko** (Edit Channel).
2. Otvorte **Integrations → Webhooks → New Webhook**.
3. Dajte mu názov a voliteľne avatar, potom kliknite na **Copy Webhook URL** — vyzerá napríklad takto: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Pripojte ju v B1Admin

Postup je rovnaký ako pri Slacku, až na to, že **Connector Type** nastavte na **Discord**. Discord URL vložte do **Payload URL** a uložte.

:::tip
Na koniec Discord URL **nemusíte** pridávať `/slack` — B1 posiela údaje v natívnom formáte Discordu `{content}`, nie v formáte kompatibilnom so Slackom. Stačí vložiť URL, ktorú vám Discord poskytol.
:::

### 3. Otestujte to

Rovnaké tlačidlo **Send Test Event** — Discord zobrazí správu vo vybranom kanáli a v protokole doručovania sa stav zmení na `succeeded`.

## Ako vyzerajú správy

| Udalosť | Príklad správy |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Úplný zoznam sa nachádza v [katalógu udalostí webhookov](/docs/developer/api/webhooks#event-catalog) — ľubovoľnú z tam uvedených udalostí je možné smerovať do Slacku/Discordu.

## Jeden kanál na jednu tému

Nemusíte všetky udalosti dávať na jedno miesto. Väčšina kostolov nastaví niekoľko webhookov:

- Kanál **#donations**, ktorý počúva iba `donation.created`
- Kanál **#new-people** pre `person.created` a `group.member.added`
- Kanál **#admin-alerts** pre málo frekventované veci, napríklad `form.submission.created`

Počet webhookov na jeden kostol nie je obmedzený. Každý z nich je nezávislý — vymazanie alebo deaktivácia jedného neovplyvní ostatné.

## Kontrola doručení

Tabuľka **Recent Deliveries** v editore webhookov zobrazuje posledných 50 pokusov. Kliknutím na riadok zobrazíte presný odoslaný obsah a odpoveď, ktorá prišla späť. Pri konektore Slack je obsah `{"text":"💝 New donation: $50.00"}` — nie surový obal `{event,churchId,...}` — pretože B1 ho pred doručením preformátuje.

Ak niečo zlyhalo (červený odznak `failed` alebo `exhausted`), dialóg zobrazí HTTP stav a telo odpovede, aby ste presne videli, čo Slack alebo Discord neprijal — zvyčajne ide o chybu pri kopírovaní URL.

## Riešenie problémov

- **Správa sa neobjaví + stav doručenia `400`** — zvyčajne je Connector Type nastavený na **Standard**, ale URL je zo Slacku alebo Discordu. Slack a Discord surový obal odmietnu. Prepnite rozbaľovací zoznam na **Slack** alebo **Discord** a odošlite testovaciu udalosť znova.
- **Webhook sa automaticky vypol** — po 3 po sebe nasledujúcich neúspešných doručeniach B1 webhook vypne. Opravte URL (alebo ju na strane Slacku/Discordu vygenerujte nanovo) a znova zapnite **Active**.
- **Správa dorazila, ale chýbajú v nej podrobnosti** — každá chatová platforma obmedzuje veľkosť správy. Správy B1 sú schválne jednoriadkové; pre bohatšie upozornenia použite [Zapier](./zapier.md) alebo [Make](./make.md), ktoré pomocou svojich akcií pre Slack zostavia podrobnejšiu správu.

## Neskoršia zmena typu konektora

Typ konektora môžete zmeniť aj na existujúcom webhooku — prejaví sa pri ďalšom doručení. Ak prepnete zo Slacku na Standard, nasmerujte URL na svoj vlastný HTTPS endpoint; rovnaký podpisový kľúč (vydaný pri vytvorení webhooku) sa potom dá overiť na surovom obale.

## Pozri aj

- [Zapier](./zapier.md) — pre viackrokové pracovné postupy spúšťané udalosťami B1
- [Make](./make.md) — vizuálny editor scenárov
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — úplný formát obsahu a podpisu, ak niekedy nasmerujete webhook na svoj vlastný server
