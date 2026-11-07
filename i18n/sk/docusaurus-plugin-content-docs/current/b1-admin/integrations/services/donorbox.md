---
title: "Donorbox"
description: "Pripojte Donorbox k B1 Admin cez Zapier, aby online dary automaticky vytvárali záznamy darov a profily darcov bez ručného exportu."
---

# Donorbox

<div class="article-intro">

Ak vaša cirkev prijíma dary cez Donorbox, ale ľudí a výpisy eviduje v B1, môžete nastaviť, aby okamžité spúšťače Donorbox v Zapier vytvárali zodpovedajúce záznamy darov v B1 a zároveň vytvorili darcu ako osobu v B1, ak ešte neexistuje. Nie je potrebné manuálne zosúladenie ani mesačný export.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet [Donorbox](https://donorbox.org) s aspoň jednou kampaňou
- Účet [Zapier](https://zapier.com)
- Používateľ B1Admin s oprávnením **Edit Settings**

</div>

## Čo môžete nastaviť

| Smer | Spúšťač Donorbox | Akcia v B1 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (okamžite) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (opakované) | Find Person → Add Donation (ako poznámku použite id plánu) |

Donorbox publikuje svoje spúšťače ako **okamžité** – aktivujú sa do niekoľkých sekúnd po skutočnom dare. Nedochádza k oneskoreniu kvôli dopytovaniu.

## Nastavenie

### 1. Vytvorte API kľúč pre B1

V B1Admin prejdite na **Settings → Developer → API Keys → New API Key**. Rozsahy:

- `people:read` – na vyhľadanie darcu podľa e-mailu
- `people:write` – na vytvorenie darcu, ak je nový
- `donations:write` – na zaznamenanie daru

Spúšťače v tomto smere patria Donorbox, nie B1, takže tu nepotrebujete `settings:write`.

### 2. Vytvorte Zap „zaznamenanie daru“

1. **Spúšťač** – Donorbox: New Donation. Pripojte ho pomocou API kľúča Donorbox (v Donorbox: *Account → Profile → API Settings*).
2. **Akcia** – B1.church: Find Person. Namapujte e-mail darcu zo spúšťača do vyhľadávacieho poľa *Email*.
3. **Akcia** – Filter by Zapier (voliteľné): pokračujte len vtedy, ak darca nebol nájdený, potom…
4. **Akcia** – B1.church: Create Person. Namapujte meno, priezvisko a e-mail tak, aby sa darca zapísal ako člen, nielen ako záznam daru.
5. **Akcia** – B1.church: Add Donation. Namapujte:
   - Amount → `data.amount`
   - Donation Date → dátum daru zo spúšťača
   - Fund → vyberte fond v B1, ktorý zodpovedá kampani Donorbox (Zapier umožňuje meniť fond na základe filtra alebo kroku Formatter)
   - Method → „Online“
   - Notes → transakčné id Donorbox (užitočné pri zosúlaďovaní)

Zap zapnite. Ďalší živý dar cez Donorbox sa automaticky objaví v **B1Admin → Donations**.

## Bežné postupy

### Jeden Zap pre každý fond

Ak prevádzkujete viacero kampaní Donorbox, ktoré zodpovedajú samostatným fondom v B1, najčistejším riešením je jeden Zap pre každú kampaň s filtrom *campaign* v Donorbox na začiatku. Mapovanie fondu bude pevne zadané a krok vyhľadávania odpadne.

### Upravené dary ako opravy

Spúšťač *New or Updated Donation* z Donorbox sa aktivuje aj pri úpravách. Pomocou kroku Zapier *Path* nad poľom `event_type` rozdeľte tok: „new“ → Add Donation, „updated“ → Find Donation + Update (poznámka: aplikácia B1 pre Zapier momentálne nemá akciu Update Donation – zatiaľ zapisujte udalosti „updated“ do kanála Slack na manuálnu kontrolu).

### Synchronizácia zmien opakovaných plánov do kanála Slack

- **Spúšťač** – Donorbox: New or Updated Plan
- **Akcia** – Slack: Send Message do `#donations` (napr. „Plán sa zmenil – mesačný dar Sarah je teraz 200 USD“)

## Obmedzenia a poznámky

- **Darcov párujte podľa e-mailu.** Donorbox nezdieľa id osoby v B1; jediným trvalým spojovacím kľúčom je e-mail. Darcovia, ktorí darujú pod iným e-mailom, vytvoria novú osobu v B1 – vaše mesačné zosúladenie by ich malo hľadať.
- **Vrátenia peňazí nie sú samostatne zobrazené** – Donorbox odošle aktualizáciu stavu pre ten istý dar. Aplikácia B1 pre Zapier momentálne nemá akciu *Update Donation*; bezpečným postupom je zatiaľ zaznamenávať udalosti vrátenia mimo systému a dar upraviť manuálne.
- **Najskôr otestujte v sandboxe Donorbox**, aby ste v produkčnom B1 nevytvorili falošné dary. Donorbox poskytuje testovacie prihlasovacie údaje oddelené od živých.

## Riešenie problémov

- **Upozornenie „Person not found“ pri každom spustení** – je to v poriadku, ak ste kroky zoradili tak, že *Create Person* sa spúšťa vo vetve „not found“. Ak sa krok Create Person nespustí vôbec, skontrolujte, či má API kľúč oprávnenie `people:write`.
- **Suma daru je 100-krát väčšia alebo menšia** – Donorbox v niektorých variantoch údajov posiela centy a v iných doláre. Ak je to potrebné, použite krok *Formatter by Zapier — Numbers* na vydelenie 100.
- **Duplicitné dary z jedného daru** – Donorbox odosiela *New Donation* aj *Updated Donation*. Buď filtrujte na `event_type = "donation.succeeded"`, alebo vytvorte dva Zapy s nepretínajúcimi sa filtrami.

## Pozri tiež

- [Zapier (prehľad)](../zapier.md) – strana B1 každého receptu pre Zapier
- [Subsplash](./subsplash.md) – ďalšia platforma na dary s aplikáciou pre Zapier
- [Mailchimp](./mailchimp.md) – prepojenie „nového daru“ s e-mailovým značkovaním
