---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Spustite textovú správu [Clearstream](https://clearstream.io) z ľubovoľnej udalosti v B1, napríklad pri novej osobe, novom darovaní, odoslanom formulári alebo zmene v kalendári, a odpovede z nej vracajte späť ako záznamy v B1. Aplikácia Clearstream pre Zapier podporuje oba smery, takže celé prepojenie je len postup a nie vlastný kód.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet [Clearstream](https://clearstream.io) aspoň s jedným zoznamom a kreditom na SMS správy
- Účet [Zapier](https://zapier.com)
- Používateľ B1Admin s oprávnením **Edit Settings**

</div>

## Čo môžete prepojiť

| Smer | Spúšťač | Akcia |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (napr. upozornenie finančného tímu) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to List (napr. tím pre modlitebné prosby) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; označte kľúčovým slovom, ktoré osoba poslala |

Akcie Clearstream v Zapier: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Nastavenie

### 1. Vytvorte kľúč API v B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — potrebné, aby B1 zaregistroval webhook spúšťača
- `people:read` — potrebné na vyhľadanie osoby z udalosti (`personId` → meno/telefón/e-mail)
- (Voliteľné) `people:write`, ak majú odpovede z Clearstream vytvárať kontakty v B1

### 2. Vytvorte Zap „text pri novom darovaní“

1. **Spúšťač** — B1.church: New Donation
2. **Akcia** — B1.church: Find Person (`personId` z darovania)
3. **Akcia** — Clearstream: Send Text to Number. Ako príjemcu použite telefón osoby z kroku 2 a napíšte správu (`"Ďakujeme za váš dar, {first}! …"`).

Zap zapnite. B1 pri aktivácii zaregistruje webhook darovaní a v **Settings → Developer → Webhooks** sa zobrazí `Zapier — donation.created`.

### 3. (Voliteľné) Vracajte odpovede späť ako záznamy v B1

1. **Spúšťač** — Clearstream: New Incoming Text
2. **Akcia** — Filter by Zapier podľa kľúčového slova, napr. pokračovať len vtedy, ak text správy začína na `PRAY`
3. **Akcia** — B1.church: Find Person (podľa telefónu)
4. **Akcia** — Filter / Path — ak osoba nebola nájdená, vytvorte ju; v každom prípade uložte text správy niekam (Slack, Google Sheet alebo odoslanie formulára v B1 cez Webhooks by Zapier).

## Bežné postupy

### Upozornenie tímu služby

- **Spúšťač** — B1.church: New Form Submission (filtrované podľa ID formulára modlitebnej prosby)
- **Akcia** — Clearstream: Send Text to List, kde zoznamom je váš pohotovostný pastoračný tím. Text správy napíšte ako `New prayer request: {data.questions.0.answer}`.

### Sled správ pre návštevníka, ktorý prišiel prvýkrát

- **Spúšťač** — B1.church: New Person, filtrované podľa štítku osoby v B1 „First-time visitor“
- **Akcia** — Clearstream: Add Subscriber to Automated Workflow. ID pracovného postupu namapujte na vopred pripravený 7-dňový sled správ.

### Pripojenie do skupiny cez kľúčové slovo

- **Spúšťač** — Clearstream: New Incoming Text (filtrované na kľúčové slovo `MENS`)
- **Akcia** — B1.church: Find Person (podľa telefónu); ak osoba nebola nájdená → Create Person
- **Akcia** — B1.church: Add Group Member do skupiny Men's Ministry

## Limity a poznámky

- **Clearstream účtuje SMS správy podľa počtu správ.** Každá akcia Send Text spotrebuje jeden alebo viac kreditov podľa dĺžky a počtu príjemcov. Skontrolujte kvótu vo svojom pláne.
- **Telefónne číslo musí byť vo formáte E.164** (napr. `+15555550199`) pre *Send Text to Number*. B1 ukladá číslo presne tak, ako bolo zadané. Ak nemôžete zaručiť formát, použite krok *Formatter by Zapier — Numbers → Format Phone Number*.
- **B1 nevyžaduje zo svojej strany žiadnu hlavičku.** Autentifikácia Clearstream je úplne v rámci jeho pripojenia v Zapier.

## Riešenie problémov

- **Spúšťač sa nikdy nespustí** — `Settings → Developer → Webhooks` by sa po zapnutí Zap mal zobraziť riadok `Zapier — <event>`. Ak sa nezobrazí, kľúč API v B1 nemá `settings:write`. Vytvorte kľúč znova a pripojte ho.
- **Clearstream vráti „Invalid phone number“** — pole príjemcu nie je vo formáte E.164. Pridajte krok Format Phone Number.
- **Send Text to List zlyhá s chybou `403`** — používateľ API v Clearstream nemá oprávnenie pre daný zoznam alebo je ID zoznamu nesprávne. ID zoznamov nájdete na stránke s detailom zoznamu v Clearstream.

## Pozri tiež

- [Text In Church](./text-in-church) — alternatívna SMS platforma s podobným zapojením
- [Mobile Message](./mobile-message) — pre cirkvi mimo USA
- [Zapier (prehľad)](../zapier) — strana B1 pre každý recept v Zapier
- [Dokumentácia API Clearstream](https://api-docs.clearstream.io/) — pre vlastné integrácie nad rámec aplikácie Zapier
