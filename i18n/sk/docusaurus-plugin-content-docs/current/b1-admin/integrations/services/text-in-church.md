---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) spája SMS a postupnosti kvapkovej komunikácie (drip) s automatizáciou prihlasovacích kariet (connect card). Jeho aplikácia pre Zapier umožňuje obidva smery – udalosti z B1 môžete poslať do pracovného postupu Text In Church a naopak, spúšťače z prihlasovacích kariet alebo nových kontaktov môžete preniesť z Text In Church do B1.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet [Text In Church](https://textinchurch.com) s plánom, ktorý zahŕňa integráciu so Zapier
- Účet [Zapier](https://zapier.com)
- Používateľ B1Admin s oprávnením **Edit Settings**

</div>

## Čo môžete prepojiť

| Smer | Spúšťač | Akcia |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message cez príslušný tím |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (zrkadlenie členstva v skupine) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Akcie v Text In Church zahŕňajú aj *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* a pridanie alebo odobratie člena skupiny.

## Nastavenie

### 1. Vytvorte kľúč API pre B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` – potrebné pre Zap-y spúšťané z B1
- `people:read`, `people:write` – na vyhľadanie alebo vytvorenie osoby
- `groups:write` – na synchronizáciu skupín
- (Voliteľné) `donations:write`, ak chcete posielať potvrdenia darov do TIC

### 2. Pripojte Text In Church k Zapier

Postupujte podľa [návodu na integráciu Text In Church so Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Token API si vygenerujú priamo v ovládacom paneli TIC.

### 3. Vytvorte Zap z prihlasovacej karty do B1

Ide o najbežnejší smer. Prihlasovacie karty odoslané cez TIC sa automaticky stanú novými osobami v B1.

1. **Spúšťač** – Text In Church: Connect Card Submitted.
2. **Akcia** – B1.church: Find Person (podľa e-mailu).
3. **Vetvenie** – rozdeľte podľa toho, či bola osoba nájdená:
   - Nenájdená → B1.church: Create Person.
   - Nájdená → pokračujte ďalej.
4. **Akcia** – B1.church: Add Group Member do skupiny „New Contact".

Zap zapnite. Ďalšia prihlasovacia karta odoslaná cez TIC sa automaticky objaví v **B1Admin → People**.

## Bežné postupy

### Spustenie pracovného postupu typu prihlasovacia karta z formulára B1

- **Spúšťač** – B1.church: New Form Submission (filtrujte podľa ID formulára „I'm new here")
- **Akcia** – Text In Church: Create/Update Person, pričom odpovede na e-mail, telefón a meno z formulára namapujte na príslušné polia
- **Akcia** – Text In Church: Add to Group, ak má skupina priradený pripravený uvítací pracovný postup

### Zrkadlenie členstva v skupine

- **Spúšťač** – B1.church: New Group Member, filtrovaný podľa konkrétneho `groupId`
- **Akcia** – Text In Church: Add to Group (rovnaká osoba, zrkadlová skupina). Ak chcete úplnú synchronizáciu, spárujte to so Zap-om `group.member.removed`.

### Upozornenie vedúceho, keď sa niekto pridá

- **Spúšťač** – B1.church: New Group Member
- **Akcia** – Text In Church: Send Text Message, príjemca = telefónne číslo vedúceho skupiny, text = `"{first} {last} just joined {group}"`.

## Obmedzenia a poznámky

- **Aplikácia TIC pre Zapier je dostupná len v určitých plánoch.** Ak je integrácia so Zapier v ovládacom paneli TIC neaktívna (sivá), kontaktujte podporu TIC, aby ju aktivovala pre váš plán.
- **ID skupín sú z TIC, nie z B1.** Pri zrkadlení budete potrebovať mapovaciu tabuľku (napríklad *Lookup Table* v Zapier alebo pevne zadané hodnoty v jednotlivých Zap-och).
- **Odoslanie textovej správy spotrebúva kredity.** Každý Zap, ktorý spustí *Send Text*, čerpá z vášho prídelu SMS v TIC.

## Riešenie problémov

- **Spúšťač Connect-Card sa nespustí** – V TIC musí byť zapnutý prepínač integrácie so Zapier. Overte tiež, že formulár, ktorý ste testovali, je nastavený ako „Connect Card", a nie ako bežný prieskum.
- **Create Person v B1 zlyhá s chybou 401** – kľúč API je nesprávny, zrušený alebo mu chýba `people:write`. Vytvorte nový kľúč.
- **Duplicitné osoby v B1** – TIC posiela pre tú istú udalosť aj *Person Created*, aj *Connect Card Submitted*. Vyberte jeden z nich ako zdroj pravdy a na druhý pridajte filter v Zapier.

## Pozrite tiež

- [Clearstream](./clearstream) – alternatívna platforma SMS s podobným zapojením cez Zapier
- [Zapier (prehľad)](../zapier) – strana B1 pre každý recept v Zapier
- [Návod na Text In Church pre Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (dokumentácia TIC)
