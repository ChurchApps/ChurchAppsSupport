---
title: "Zapier"
description: "Pripojte B1 Admin k Zapier a spúšťajte automatizácie pri nových ľuďoch, darech a členoch skupín a zapisujte záznamy späť do B1 bez programovania."
---

# Zapier

<div class="article-intro">

Oficiálna aplikácia B1.church v Zapier umožňuje, aby Zap reagoval na udalosti vo vašej cirkvi (nová osoba, nový dar, nový člen skupiny, …) a zapisoval záznamy späť do B1. Nie je potrebné programovanie ani vlastná infraštruktúra. Všetko nastavíte v editore Zapier pretiahnutím prvkov, vložíte API kľúč a Zap zapnete.

</div>

:::caution Čaká sa na schválenie v Zapier
Aplikácia B1.church je hotová a funguje, no stále čaká na kontrolu zo strany Zapier, kým sa verejne objaví v adresári aplikácií editora Zap. Dovtedy ju môžu používať iba pozvané účty. Všetko nižšie popisuje, ako to bude fungovať po schválení.
:::

<div class="prereqs">
<h4>Než začnete</h4>

- Účet [Zapier](https://zapier.com) (na niekoľko Zapov postačí bezplatný plán)
- Správca cirkvi s oprávnením **Upraviť nastavenia** v B1Admin (vytvoríte API kľúč)
- Predstava o tom, čo chcete robiť, napr. „keď sa v B1 pridá osoba, pridaj ju do môjho zoznamu v Mailchimp“

</div>

## Spúšťače a akcie

| Typ | Čo | Udalosť / endpoint v B1 |
|---|---|---|
| **Spúšťač** | Nová osoba | `person.created` |
| **Spúšťač** | Aktualizovaná osoba | `person.updated` |
| **Spúšťač** | Nový dar | `donation.created` |
| **Spúšťač** | Nový člen skupiny | `group.member.added` |
| **Spúšťač** | Nové odoslanie formulára | `form.submission.created` |
| **Akcia** | Vytvoriť osobu | pridá novú osobu |
| **Akcia** | Pridať dar | zaznamená dar |
| **Akcia** | Pridať člena skupiny | pridá osobu do skupiny |
| **Akcia** | Nájsť osobu | vyhľadá osobu podľa ID, e-mailu alebo mena; ak sa nikto nezhoduje, úloha zlyhá |

Tieto prvky môžete ľubovoľne kombinovať s ktoroukoľvek z viac než 7 000 podporovaných aplikácií Zapier.

## Nastavenie

### 1. Vytvorte API kľúč pre B1

1. V B1Admin prejdite na **Nastavenia → Vývojár → API kľúče**.
2. Kliknite na **Nový API kľúč**, zadajte názov napr. „Zapier“ a vyberte rozsahy oprávnení, ktoré Zap potrebuje.
3. **Dôležité:** Spúšťače Zapier pri zapnutí Zapu registrujú webhook v mene vášho účtu, na čo je potrebný rozsah **`settings:write`**. Ak niektorý z vašich Zapov používa spúšťač B1, vždy zahrňte `settings:write`.
4. Udeľte aj rozsahy, ktoré potrebujú akcie. Napríklad akcia „Pridať dar“ potrebuje `donations:write` a „Vytvoriť osobu“ potrebuje `people:write`.
5. Uložte. Úplný kľúč `cak_…` sa zobrazí **iba raz**, skopírujte si ho.

### 2. Pripojte Zapier k B1

1. V Zapier vytvorte nový Zap.
2. Keď prvýkrát vyberiete spúšťač alebo akciu B1, Zapier vás vyzve, aby ste sa **prihlásili do B1.church**.
3. Vložte API kľúč z kroku 1 a kliknite na **Áno, pokračovať**. Zapier kľúč overí voči vašej cirkvi.

Pripojenie sa uloží v Zapier a použijú ho všetky Zapy vo vašom účte.

### 3. Vytvorte Zap

Vyberte spúšťač a potom pridajte jeden alebo viac krokov akcií. Príklady sú uvedené nižšie.

## Bežné postupy

### Pridať nové osoby z B1 do Mailchimp

- **Spúšťač** — B1: Nová osoba
- **Akcia** — Mailchimp: Pridať/aktualizovať odberateľa. Namapujte `name__first`, `name__last` a `contactInfo__email` z B1 do polí Meno, Priezvisko a E-mail v Mailchimp.

### Odosielať dary do kanála Slack s bohatšou kartou, než ponúka vstavaný konektor

- **Spúšťač** — B1: Nový dar
- **Akcia** — Slack: Odoslať správu do kanála. Zostavte ľubovoľné rozloženie, napríklad tlačidlá, prílohy a podobne, ktoré [konektor Slack](./slack-discord.md) nedokáže vytvoriť.

### Pridávať nových členov skupiny do Google Group

- **Spúšťač** — B1: Nový člen skupiny (filtrovaný na konkrétne `groupId`)
- **Akcia** — Filter by Zapier: pokračovať iba vtedy, ak je skupina z B1 tá, ktorá vás zaujíma
- **Akcia** — B1: Nájsť osobu (použite `personId` zo spúšťača na získanie e-mailu)
- **Akcia** — Google Groups: Pridať člena

### Preposielať odoslané formuláre do nástroja na sledovanie projektov

- **Spúšťač** — B1: Nové odoslanie formulára
- **Akcia** — Notion / Linear / Asana / Trello: Vytvoriť stránku / problém / úlohu

## Ako spúšťače fungujú v pozadí

Spúšťače sú **REST hooky**, nie dotazovanie sa v intervaloch. Zapier neposiela B1 požiadavky každých 15 minút. Keď Zap zapnete, Zapier požiada B1, aby zaregistrovala webhook smerujúci na súkromnú adresu Zapier. Keď nastane udalosť, B1 odošle údaje do Zapier a váš Zap sa spustí **počas niekoľkých sekúnd**. Keď Zap vypnete, Zapier požiada B1 o odstránenie webhooku, takže nezostanú žiadne osirelé odbery.

To znamená, že spúšťač reaguje iba na udalosti, ktoré nastanú **po** zapnutí Zapu. Nespracúva spätne staršie údaje. Zapnutie Zapu nezopakuje včerajšie dary.

## Obmedzenia a poznámky

- **Viacero Zapov s rovnakým spúšťačom** si zaregistruje každý vlastný webhook v B1. Nedochádza ku konfliktu, no je dobré vedieť, prečo ak pri kontrole **Nastavenia → Vývojár → Webhooky** vidíte tri identické riadky „Zapier — donation.created“.
- **Testovacie údaje pri nastavení Zapu**: Pri vytváraní Zapu Zapier požiada o vzorové údaje na namapovanie polí. Ak existuje, načíta najnovšiu zodpovedajúcu udalosť z B1. Inak použije syntetickú vzorku z definície aplikácie.
- **Zlyhania akcií sa zobrazia ako chyby Zapu** v histórii úloh v Zapier. Častou príčinou je API kľúč bez správneho rozsahu, napríklad akcia „Pridať dar“ potrebuje `donations:write`. Vytvorte kľúč znova so správnymi rozsahmi a znova ho pripojte v Zapier.
- **Kvóty odchádzajúcich volaní API**: Každé volanie API z B1 z akcie sa počíta do vašej kvóty úloh v Zapier, nie niečo na strane B1.

## Riešenie problémov

- **„Overenie zlyhalo“** pri pripájaní: API kľúč je nesprávny, zrušený alebo mu chýbajú rozsahy, ktoré Zap potrebuje. V B1Admin vytvorte kľúč znova aspoň s `settings:write` a s rozsahmi zdrojov, ktoré Zap používa, a potom aktualizujte pripojenie.
- **Spúšťač sa nikdy nespustí**: Overte, že sa webhook skutočne zaregistroval. V B1Admin by sa v **Nastavenia → Vývojár → Webhooky** mal objaviť riadok s názvom „Zapier — &lt;udalosť&gt;“. Ak tam nie je, API kľúču pravdepodobne chýbal `settings:write` v čase zapnutia Zapu. Opravte kľúč, vypnite Zap a znova ho zapnite.
- **Spúšťač sa spustí dvakrát**: Zapier občas doručí udalosť znova, ak sa stratilo jeho potvrdenie. Ak potrebujete prísnu deduplikáciu, použite krok „Filter by Zapier“ na jedinečnom ID (napr. `id` osoby).

## Pozri tiež

- [Make](./make.md) — rovnaký postup, iná platforma
- [Slack a Discord](./slack-discord.md) — jednoduchšie upozornenia v chate bez Zapier
- [Webhooky (referencia pre vývojárov)](/docs/developer/api/webhooks)
