---
title: "VOMO"
description: "Propojte registrace dobrovolníků VOMO a odbavení na kiosku s lidmi a skupinami v B1 Admin přes Zapier, včetně oprávnění API klíče a kroků nastavení."
---

# VOMO

<div class="article-intro">

VOMO je platforma pro zapojení dobrovolníků. Lidé se přihlašují do projektů, odbavují se na kiosku a sbírají odpracované hodiny. Pokud používáte VOMO pro plánování dobrovolníků, ale evidenci osob vedete v B1, může Zapier synchronizovat členství a příchody mezi oběma systémy, aby se nerozcházely.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet [VOMO](https://vomo.org) na tarifu, který zpřístupňuje Zapier (pokud si nejste jistí, zeptejte se podpory VOMO)
- Účet [Zapier](https://zapier.com)
- Uživatel B1Admin s oprávněním **Upravit nastavení**

</div>

## Co můžete propojit

Aplikace VOMO pro Zapier nabízí čtyři okamžité spouštěče a čtyři akce. Nejčastěji používané scénáře jsou tyto:

| Směr | Spouštěč | Akce |
|---|---|---|
| VOMO → B1 | VOMO Membership (vytvořeno) | B1: Find Person → Create Person (pokud osoba neexistuje) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member do skupiny „Aktuálně slouží“ nebo zápis jako docházka |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (podle e-mailu); jinak vlastní krok |
| Oběma směry | VOMO Participation (přihlášky) | B1: Add Group Member do skupiny pro konkrétní projekt |

Akce VOMO se omezují na **vytváření konceptů projektů** a **vyhledávání** existujících organizátorů a projektů. Zatím neexistuje akce „přidat tuto osobu do projektu VOMO“. Hlavní propojení tedy směřuje hlavně z VOMO do B1.

## Nastavení

### 1. Vytvořte klíč API v B1

**Nastavení → Vývojář → API klíče → Nový API klíč**. Oprávnění:

- `people:read`, `people:write` – k vyhledávání a vytváření dobrovolníků jako osob v B1
- `groups:write` – k přidávání do skupin služebních týmů
- (Volitelně) `attendance:write`, pokud kiosková přihlášení chcete evidovat jako docházku

### 2. Vytvořte Zap pro synchronizaci členství

1. **Spouštěč** – VOMO: Membership (událost = `created`).
2. **Akce** – B1.church: Find Person, shoda podle e-mailu.
3. **Filtr / Větev** – rozdělení podle toho, zda byla osoba nalezena:
   - Nenalezena → B1.church: Create Person, poté Add Group Member do příslušné skupiny dobrovolníků.
   - Nalezena → B1.church: Add Group Member přímo.
4. Zapněte. Noví dobrovolníci z VOMO se nyní objeví v B1 se správným členstvím ve skupině.

### 3. (Volitelně) Vytvořte Zap pro přihlášení na kiosku

1. **Spouštěč** – VOMO: Kiosk
2. **Akce** – B1.church: Find Person (podle e-mailu)
3. **Akce** – podle vašeho výběru:
   - *Pokud přihlášení chcete evidovat jako docházku* – Webhooks by Zapier odešle POST na endpoint `/attendance/visits` v B1. (Aplikace B1 pro Zapier zatím nemá vlastní akci *Record Attendance*.) Klíč API z B1 se předá v hlavičce `Authorization: Bearer cak_…`. Viz [klíče API](/docs/developer/api/api-keys).
   - *Pokud přihlášení chcete evidovat jako členství ve skupině* – B1.church: Add Group Member do skupiny „Aktuálně slouží (dnes)“. Druhý Zap pak později během dne osoby odebere pomocí naplánovaného úklidu.

## Běžné scénáře

### Synchronizace skupiny podle projektu

- **Spouštěč** – VOMO: Participation (created)
- **Akce** – Filtr v Zapieru podle ID projektu, poté
- **Akce** – B1.church: Add Group Member do skupiny v B1, jejíž název odpovídá projektu ve VOMO.

Když projekt ve VOMO skončí, skupinu v B1 vyprázdněte ručně (nebo tento scénář doplňte spouštěčem *Participation deleted*, který osoby odebere).

### Odeslání SMS „děkujeme za přihlášení“

V jednom Zapu za sebou zařaďte VOMO Participation → Clearstream Send Text nebo Text In Church Send Message. Obě aplikace mají vlastní akce pro Zapier. Viz [Clearstream](./clearstream.md) a [Text In Church](./text-in-church.md).

### Zjišťování odpadu dobrovolníků

Naplánujte denní spouštěč *Schedule* v Zapieru, který zavolá Find Organizer ve VOMO pro seznam osob z B1, které se tento měsíc připojily ke službě. Pokud VOMO vrátí „not found“, osoba si účet VOMO neaktivovala a je třeba ji připomenout.

## Omezení a poznámky

- **Klíčem propojení je e-mail.** Údaje z VOMO obsahují e-mail uživatele, ale ne ID osoby v B1. Pokud dárci v každém systému používají jiný e-mail, vzniknou duplicity.
- **Ve VOMO pro Zapier zatím není akce „Přidat do projektu“.** Pokud potřebujete zapsat osobu z B1 do projektu VOMO, musíte z kroku *Webhooks by Zapier* odeslat požadavek na REST API VOMO. Jde o vlastní integraci.
- **Bezplatné nebo nižší tarify VOMO nemusí Zapier obsahovat.** Před slibem termínu propojení si to ověřte u podpory VOMO.

## Řešení potíží

- **Spouštěč se nikdy nespustí** – Okamžité spouštěče VOMO vyžadují, aby zůstal platný přístupový token API. Zap znovu otestujte a pokud byl token změněn, znovu propojte VOMO.
- **B1 *Add Group Member* končí chybou 422** – ID skupiny v akci neexistuje. Otevřete **B1Admin → Skupiny**, klikněte na skupinu a zkopírujte část ID z adresy URL do kroku Zapu.
- **Duplicitní osoby v B1 pro jednoho dobrovolníka z VOMO** – Pravděpodobně se přihlásil pod jiným e-mailem, než který již měl v B1. Buď sjednoťte e-mailové adresy, nebo přidejte do Zapu větev *Path*, která před vytvořením osoby vyhledá také podle telefonního čísla.

## Viz také

- [Zapier (přehled)](../zapier.md) – strana B1 u každého scénáře pro Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) – spojení přihlášek dobrovolníků s SMS potvrzeními
- [Webhooks (referenční příručka pro vývojáře)](/docs/developer/api/webhooks) – události, na které může VOMO reagovat
