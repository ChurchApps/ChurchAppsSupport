---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Pokud vaše církev přijímá dary přes Donorbox, ale lidi a výpisy eviduje v B1, můžete nechat okamžité triggery Donorboxu přes Zapier vytvářet odpovídající záznamy darů přímo v B1. Pokud dárce ještě neexistuje, vytvoří se jako osoba v B1. Žádné ruční porovnávání a žádný měsíční export.

</div>

<div class="prereqs">
<h4>Před začátkem</h4>

- Účet [Donorbox](https://donorbox.org) s alespoň jednou kampaní
- Účet [Zapier](https://zapier.com)
- Uživatel B1Admin s oprávněním **Edit Settings**

</div>

## Co můžete propojit

| Směr | Trigger v Donorboxu | Akce v B1 |
|---|---|---|
| Donorbox → B1 | Nový nebo upravený dar (okamžitě) | Najít osobu → Přidat dar |
| Donorbox → B1 | Nový nebo upravený dárce | Vytvořit osobu |
| Donorbox → B1 | Nový nebo upravený plán (opakovaný) | Najít osobu → Přidat dar (jako poznámku použít ID plánu) |

Donorbox publikuje své triggery jako **okamžité**. Spustí se během několika sekund od skutečného daru, bez zpoždění kvůli dotazování.

## Nastavení

### 1. Vytvořte API klíč B1

V B1Admin: **Settings → Developer → API Keys → New API Key**. Oprávnění:

- `people:read` — vyhledání dárce podle e-mailu
- `people:write` — vytvoření dárce, pokud je nový
- `donations:write` — zaznamenání daru

Triggery v tomto směru patří Donorboxu, ne B1, takže zde nepotřebujete `settings:write`.

### 2. Vytvořte Zap „zaznamenání daru"

1. **Trigger** — Donorbox: New Donation. Připojte pomocí API klíče Donorboxu (v Donorboxu: *Account → Profile → API Settings*).
2. **Akce** — B1.church: Find Person. Namapujte e-mail dárce z triggeru do vyhledávacího pole *Email*.
3. **Akce** — Filter by Zapier (volitelné): pokračovat, pouze pokud dárce nebyl nalezen, jinak…
4. **Akce** — B1.church: Create Person. Namapujte jméno, příjmení a e-mail, aby se dárce zapsal jako člen, nejen jako záznam daru.
5. **Akce** — B1.church: Add Donation. Namapujte:
   - Amount → `data.amount`
   - Donation Date → datum daru z triggeru
   - Fund → vyberte fond v B1, který odpovídá kampani Donorboxu (Zapier umožňuje přepínat fondy podle filtru nebo kroku Formatter)
   - Method → „Online"
   - Notes → ID transakce z Donorboxu (užitečné při porovnávání)

Zap zapněte. Další živý dar přes Donorbox se automaticky objeví v **B1Admin → Donations**.

## Běžné postupy

### Jeden Zap na fond

Pokud provozujete více kampaní Donorboxu, které se mapují na samostatné fondy v B1, nejčistší je mít jeden Zap na kampaň s filtrem *campaign* Donorboxu na začátku. Mapování fondu je tak pevně nastaveno a krok vyhledávání odpadne.

### Úpravy darů berte jako opravy

Trigger *New or Updated Donation* Donorboxu se spouští i při úpravách. Pomocí kroku Zapier *Path* nad polem `event_type` můžete větvit: „new" → Add Donation, „updated" → Find Donation + Update (pozor: akce Update Donation v aplikaci B1 pro Zapier zatím neexistuje, proto události „updated" prozatím zapisujte do kanálu Slack k ruční kontrole).

### Synchronizace změn pravidelných plánů do kanálu Slack

- **Trigger** — Donorbox: New or Updated Plan
- **Akce** — Slack: Send Message do `#donations` (např. „Plán se změnil — měsíční dar Sarah je nyní 200 $")

## Omezení a poznámky

- **Porovnávejte dárce podle e-mailu.** Donorbox nesdílí ID osoby z B1, jediným trvalým spojovacím klíčem je tedy e-mail. Dárci, kteří dávají pod jiným e-mailem, vytvoří novou osobu v B1. Při měsíčním porovnávání na ně zaměřte pozornost.
- **Vratky nejsou zvlášť zachyceny.** Donorbox odešle aktualizaci stavu u téhož daru. Akce Update Donation v aplikaci B1 pro Zapier zatím neexistuje, takže bezpečný postup je události vratek zaznamenávat mimo systém a dar upravit ručně.
- **Nejprve otestujte v sandboxu Donorboxu,** aby se v ostré B1 nevytvořily falešné dary. Donorbox poskytuje přihlašovací údaje pro testovací režim odděleně od živého provozu.

## Řešení potíží

- **Upozornění „Person not found" při každém spuštění** — to je v pořádku, pokud jste kroky uspořádali tak, aby se krok *Create Person* spustil ve větvi „nenalezeno". Pokud se krok Create Person nespustí vůbec, zkontrolujte, zda má API klíč oprávnění `people:write`.
- **Částka daru vypadá 100× větší nebo menší** — Donorbox v některých variantách dat posílá centy a v jiných dolary. V případě potřeby použijte krok *Formatter by Zapier — Numbers* k vydělení 100.
- **Duplicitní dary z jednoho daru** — Donorbox spouští jak *New Donation*, tak *Updated Donation*. Buď filtrujte na `event_type = "donation.succeeded"`, nebo vytvořte dva Zapy s nepřekrývajícími se filtry.

## Viz také

- [Zapier (přehled)](../zapier) — strana B1 u každého receptu pro Zapier
- [Subsplash](./subsplash) — další platforma pro dary s aplikací pro Zapier
- [Mailchimp](./mailchimp) — navázání „nového daru" na e-mailový štítek
