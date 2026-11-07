---
title: "VOMO"
description: "Pripojte registrácie dobrovoľníkov VOMO a check-iny z kiosku k ľuďom a skupinám v B1 Admin cez Zapier vrátane rozsahov API kľúčov a krokov nastavenia."
---

# VOMO

<div class="article-intro">

VOMO je platforma na zapájanie dobrovoľníkov. Ľudia sa prihlasujú na projekty, prihlasujú sa na kiosku a zbierajú hodiny. Ak používate VOMO na plánovanie dobrovoľníkov, ale B1 na evidenciu osôb, Zapier dokáže synchronizovať členstvo a prihlásenia medzi nimi, aby sa obe strany nerozchádzali.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet [VOMO](https://vomo.org) v pláne, ktorý umožňuje používať Zapier (ak si nie ste istí, opýtajte sa podpory VOMO)
- Účet [Zapier](https://zapier.com)
- Používateľ B1Admin s oprávnením **Edit Settings**

</div>

## Čo môžete prepojiť

Aplikácia VOMO pre Zapier sprístupňuje štyri okamžité spúšťače a štyri akcie. Recepty, ktoré si väčšina cirkví praje najviac:

| Smer | Spúšťač | Akcia |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (ak je osoba nová) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member do skupiny "Currently Serving" alebo zaznamenanie ako účasť |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (podľa e-mailu); inak vlastný krok |
| Oba smery | VOMO Participation (prihlásenia) | B1: Add Group Member do skupiny projektu |

Akcie VOMO sa obmedzujú na **vytváranie konceptov projektov** a **vyhľadávanie** existujúcich organizátorov a projektov. Momentálne neexistuje akcia „pridať túto osobu do projektu VOMO“. Najzaujímavejšie prepojenie je väčšinou smerom VOMO → B1.

## Nastavenie

### 1. Vytvorte API kľúč B1

**Settings → Developer → API Keys → New API Key**. Rozsahy:

- `people:read`, `people:write` – na vyhľadávanie a vytváranie dobrovoľníkov ako osôb v B1
- `groups:write` – na pridávanie do skupín obsluhujúcich tímov
- (Voliteľné) `attendance:write`, ak kioskové prihlásenia považujete za účasť

### 2. Vytvorte Zap na synchronizáciu členstva

1. **Spúšťač** – VOMO: Membership (udalosť = `created`).
2. **Akcia** – B1.church: Find Person, párovanie podľa e-mailu.
3. **Filter / Path** – rozdeľte podľa toho, či bola osoba nájdená:
   - Nenájdená → B1.church: Create Person, potom Add Group Member do príslušnej skupiny dobrovoľníkov.
   - Nájdená → B1.church: Add Group Member priamo.
4. Zapnite ho. Noví dobrovoľníci z VOMO sa teraz objavia v B1 so správnym členstvom v skupinách.

### 3. (Voliteľné) Vytvorte Zap pre kioskové prihlásenia

1. **Spúšťač** – VOMO: Kiosk
2. **Akcia** – B1.church: Find Person (podľa e-mailu)
3. **Akcia** – podľa vašej voľby:
   - *Ak sa to považuje za účasť* – Webhooks by Zapier odošle POST na endpoint `/attendance/visits` v B1 (aplikácia B1 pre Zapier zatiaľ nemá natívnu akciu *Record Attendance*). [API kľúč](/docs/developer/api/api-keys) B1 sa vkladá do hlavičky `Authorization: Bearer cak_…`.
   - *Ak sa to považuje za členstvo v skupine* – B1.church: Add Group Member so skupinou „Currently Serving (Today)“ a druhý Zap neskôr počas dňa ich odstráni prostredníctvom naplánovaného čistenia.

## Bežné recepty

### Synchronizácia skupiny podľa projektu

- **Spúšťač** – VOMO: Participation (created)
- **Akcia** – Filter by Zapier podľa ID projektu, potom
- **Akcia** – B1.church: Add Group Member do skupiny B1, ktorej názov zodpovedá projektu VOMO.

Keď projekt VOMO skončí, skupinu v B1 vyprázdnite ručne (alebo to spárujte so spúšťačom *Participation deleted*, ktorý ich odstráni).

### Odoslanie SMS s poďakovaním za prihlásenie

V tom istom Zape zreťazte VOMO Participation → Clearstream Send Text alebo Text In Church Send Message. Obe majú natívne akcie Zapier – pozrite si [Clearstream](./clearstream.md) a [Text In Church](./text-in-church.md).

### Zisťovanie odpadnutia

Spúšťajte denný naplánovaný spúšťač Zapier *Schedule*, ktorý v VOMO zavolá Find Organizer pre zoznam osôb v B1, ktoré sa tento mesiac pridali do obslužného tímu. Ak VOMO vráti „not found“, dotyční si účet VOMO neaktivovali a treba ich pripomenúť.

## Obmedzenia a poznámky

- **E-mail je spájací kľúč.** Údaje z VOMO obsahujú e-mail používateľa, ale nie ID osoby v B1. Darcovia, ktorí v každom systéme používajú iný e-mail, vytvoria duplicity.
- **V aplikácii VOMO pre Zapier momentálne nie je akcia „Add to Project“.** Ak potrebujete zapisovať osoby z B1 do projektu VOMO, musíte z kroku *Webhooks by Zapier* odoslať POST na REST API VOMO. Ide o vlastnú integráciu.
- **Bezplatné alebo nižšie plány VOMO nemusia obsahovať Zapier.** Pred sľubom termínu prepojenia si overte u podpory VOMO.

## Riešenie problémov

- **Spúšťač nikdy nevystrelí** – okamžité spúšťače VOMO vyžadujú, aby API token zostal platný. Zap znova otestujte; ak sa token zmenil, pripojte VOMO znova.
- **B1 *Add Group Member* zlyhá s chybou 422** – ID skupiny v akcii neexistuje. Otvorte **B1Admin → Groups**, kliknite na skupinu a skopírujte časť ID z adresy URL do kroku Zap.
- **Duplicitné osoby v B1 z jedného dobrovoľníka VOMO** – pravdepodobne sa prihlásili pod iným e-mailom, než aký už mali v B1. Buď zjednotte e-maily, alebo pridajte Zapier *Path*, ktorý pred vytvorením hľadá aj podľa telefónneho čísla.

## Pozri tiež

- [Zapier (prehľad)](../zapier.md) – strana B1 pre každý recept Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) – spárujte prihlásenia dobrovoľníkov s SMS potvrdeniami
- [Webhooks (referencia pre vývojárov)](/docs/developer/api/webhooks) – udalosti, na ktoré môže VOMO spúšťať
