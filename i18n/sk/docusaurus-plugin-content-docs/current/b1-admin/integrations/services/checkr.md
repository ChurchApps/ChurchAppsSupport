---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) zabezpečuje bezpečnostné previerky (background screening) pre zamestnancov a dobrovoľníkov. Je to takmer univerzálna potreba pre každý kostol, ktorý prevádzkuje detský alebo mládežnícky program. B1 **nemá vstavanú funkciu previerok**. Objednávanie previerok, sledovanie výsledkov a dodržiavanie predpisov o previerkach sa vykonávajú v Checkr. Postup nižšie len prepája udalosti v B1 s touto službou. Checkr nemá aplikáciu pre Zapier, ale [integrácia Checkr v Make.com](https://www.make.com/en/integrations/checkr) je overená a poskytuje akcie, ktoré potrebujete na spustenie previerky z udalosti v B1.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet [Checkr](https://checkr.com) s prístupom k API a aspoň jedným nakonfigurovaným balíkom previerok
- Účet [Make](https://www.make.com)
- Používateľ B1Admin s oprávnením **Upraviť nastavenia**

</div>

## Čo môžete prepojiť

Aplikácia Checkr v Make poskytuje 1 spúšťač a 6 akcií:

| Smer | Spúšťač v B1 / Make | Akcia |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrované na skupinu dobrovoľníkov) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook z Checkr (udalosť pozvánky / správy) | B1: Aktualizácia záznamu osoby (napr. štítok „Checkr cleared“) |

Akcie Checkr v Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA a Get an Invitation. Okrem toho 4 vyhľadávacie moduly.

## Nastavenie

### 1. Vytvorte API kľúč v B1

**Nastavenia → Vývojár → API kľúče → Nový API kľúč**:

- `settings:write` – pre webhook spúšťača
- `people:read` – na vyhľadanie mena a e-mailu osoby pri spustení previerky
- (Voliteľné) `people:write`, ak chcete zapisovať stav správy späť ako vlastné pole alebo štítok

### 2. Vytvorte scenár v Make: spustenie previerky pri registrácii dobrovoľníka

1. **Spúšťač** – B1.church: Watch Events (`group.member.added`).
2. **Filter** – pokračujte len vtedy, ak sa `data.groupId` zhoduje s vašou skupinou „Dobrovoľníci detského oddelenia“ (alebo ekvivalentnou).
3. **Akcia** – B1.church: Find Person (podľa `data.personId`), aby ste získali e-mail a meno a priezvisko.
4. **Akcia** – Checkr: Create Candidate. Namapujte meno, priezvisko a e-mail z kroku 3.
5. **Akcia** – Checkr: Create Background Check Invitation. Namapujte ID nového kandidáta z kroku 4 do poľa *candidate_id*. Vyberte balík previerok (napr. `tasker_standard` alebo ten, ktorý váš účet ponúka).
6. (Voliteľné) **Akcia** – Slack: upozorniť koordinátora bezpečnej služby, že previerka bola spustená.

Zapnite scenár. Noví dobrovoľníci v cieľovej skupine automaticky dostanú pozvánku z Checkr e-mailom. Vyplnia ju na telefóne alebo notebooku a Checkr vykoná previerku.

### 3. (Voliteľné) Prijímanie správy späť

1. **Spúšťač** – Checkr: Watch Events (webhook). Make pri aktivácii zaregistruje webhook v Checkr.
2. **Filter** – pokračujte len vtedy, ak `event_type = report.completed`.
3. **Akcia** – Checkr: Get Report (použite ID správy z webhooku).
4. **Akcia** – B1.church: Find Person (podľa e-mailu kandidáta).
5. **Podmienená akcia** – Slack / e-mail: upozorniť koordinátora so stavom `clear` / `consider` / `suspended`.

Poznámka: B1 zatiaľ nemá vstavané pole „stav previerky“. Praktické možnosti sú (a) odoslať výsledok do súkromného kanála v Slacku na kontrolu, (b) zapísať ho do Google Sheet na audit, alebo (c) pridať osobu do skupiny B1 „Overení dobrovoľníci“ pri stave `clear`.

## Bežné postupy

### Opätovná previerka dobrovoľníkov každé 2 roky

Predchádzajúci postup doplňte plánovaným spúšťačom v Make:

- **Spúšťač** – Make: Schedule (mesačne)
- **Akcia** – B1.church: List Group Members pre skupinu „Overení dobrovoľníci“
- **Akcia** – Filter v Make: dátum overenia staršie ako 22 mesiacov
- **Akcia** – Checkr: Create Background Check Invitation (rovnaký postup ako pri prvotnej previerke)

### Obmedzenie prístupu v prvej fáze, kým previerka neskončí

Ak vaša cirkev používa členstvo v skupinách B1 na riadenie prístupu (napr. v rozpisoch služieb sa zobrazujú len členovia skupiny „Overení“), ponechajte nových dobrovoľníkov v dočasnej skupine, kým udalosť Checkr `report.completed` ich neprepne.

## Obmedzenia a poznámky

- **Checkr je väčšinou obmedzený na USA** pre väčšinu balíkov previerok. Cirkvi v Austrálii, Spojenom kráľovstve a Kanade budú potrebovať alternatívu.
- **Cena** sa účtuje za každú previerku. Každé vytvorenie pozvánky v Make spotrebuje skutočnú previerku. Najskôr otestujte v sandbox alebo testovacom účte Checkr. Aplikácia Checkr v Make používa poverenia zadané v pripojení, takže výmenou poverení prepnete medzi sandboxom a ostrou prevádzkou.
- **Prístup k API Checkr závisí od tarifu.** Menšie účty Checkr môžu mať len používateľské rozhranie. Na aktiváciu API kontaktujte Checkr.

## Riešenie problémov

- **Create Candidate zlyhá s chybou `403`** – token API Checkr je len na čítanie alebo mu chýbajú správne oprávnenia účtu. Vydajte nový v informačnom paneli Checkr s oprávnením na zápis.
- **Pozvánka nikdy nedorazí** – skontrolujte e-mail kandidáta v kroku 3. B1 môže mať pre danú osobu prázdne pole e-mailu. Pred krok Checkr pridajte filter, ktorý vyžaduje e-mail.
- **Spúšťač webhooku sa nespustí** – registrácia webhooku v Checkr niekedy potichu zlyhá, ak váš účet Make nemá platený tarif, ktorý podporuje odchádzajúce webhooky. Overte na stránke *Webhooks* v Checkr, že URL Make je tam uvedená.

## Pozri tiež

- [Make (prehľad)](../make) – strana B1 každého scenára v Make
- [Mobile Message](./mobile-message) – pre SMS poskytovateľov bez aplikácií pre Zapier, rovnaký vzor Webhooks/HTTP ako pri prepojení Checkr s Make
- [Dokumentácia API Checkr](https://docs.checkr.com/)
