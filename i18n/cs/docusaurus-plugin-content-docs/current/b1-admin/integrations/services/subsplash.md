---
title: "Subsplash"
description: "Propojte dary, nové lidi a odpovědi formulářů ze Subsplash s B1 přes Zapier, aby se dary a profily automaticky ukládaly do B1 Admin."
---

# Subsplash

<div class="article-intro">

Pokud pro svou církevní aplikaci, dary nebo formuláře používáte Subsplash, ale chcete mít B1 jako hlavní systém pro evidenci lidí a darů, může aplikace Subsplash pro Zapier předávat dary, nové profily a odpovědi z formulářů do B1 v reálném čase. Mějte na paměti, že aplikace Subsplash pro Zapier je zatím **pouze triggery** a propojení funguje jen jedním směrem (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet Subsplash s tarifem, který zahrnuje přístup k **API + Zapier** (ověřte u svého Client Success Manageru ze Subsplash, protože tyto funkce jsou vázané na úroveň tarifu)
- Účet na [Zapier](https://zapier.com)
- Uživatel B1Admin s oprávněním **Edit Settings**

</div>

## Co můžete propojit

Všechny triggery níže pocházejí ze Subsplash. Akce patří B1.

| Trigger v Subsplash | Akce v B1 |
|---|---|
| New Donation | Find Person → Add Donation (Create Person, pokud osoba chybí) |
| New Pledge | Add Donation (s `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (žádná přímá akce v B1; zapište do Google Sheetu k ručnímu přezkoumání) |
| New Form Response | Create Person + (volitelně) Add Group Member podle formuláře |

Směr Subsplash → B1 je momentálně jediný, který aplikace Subsplash podporuje.

## Nastavení

### 1. Vytvořte klíč API v B1

V B1Admin přejděte na **Settings → Developer → API Keys → New API Key**. Oprávnění (scopes):

- `people:read`: vyhledání dárce podle e-mailu
- `people:write`: vytvoření dárce, pokud ještě neexistuje
- `donations:write`: zaznamenání daru
- (Oprávnění `settings:write` není potřeba, protože trigger zde spravuje Subsplash, nikoli B1.)

### 2. Propojte Subsplash se Zapier

Postupujte podle [návodu Subsplash pro integraci se Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash vydá API token v Subsplash Dashboardu, který Zapier použije k ověření na straně triggeru.

### 3. Vytvořte Zap „zaznamenání daru“

1. **Trigger**: Subsplash: New Donation
2. **Akce**: B1.church: Find Person (podle e-mailu)
3. **Filtr / Path**: větvení podle výsledku „person found“:
   - **Nalezeno:** B1.church: Add Donation. Namapujte částku, datum, fond, metodu = "Online" a `notes` = ID transakce ze Subsplash.
   - **Nenalezeno:** B1.church: Create Person → B1.church: Add Donation (s ID nově vytvořené osoby).

Zap zapněte. Budoucí dary ze Subsplash se pak během několika sekund objeví v **B1Admin → Donations**.

## Běžné scénáře

### Poděkování při prvním daru

- **Trigger**: Subsplash: New Donation
- **Akce**: Filter by Zapier: pokračovat jen tehdy, pokud jde o první dar dárce (použijte *Lookup Table* s e-mailem dárce proti Google Sheetu se seznamem dosavadních dárců, nebo krok Zapier *Paths* podle data vytvoření dárce)
- **Akce**: Mailchimp / SMTP / SendGrid: odeslat zprávu s poděkováním za první dar
- **Akce**: B1.church: Add Donation (jako obvykle)

### Oddělení slibů od běžného darování

- **Trigger**: Subsplash: New Pledge
- **Akce**: B1.church: Add Donation s `notes = "Pledge — Subsplash"` a fondem nazvaným `Pledges` (odděleným od vašeho provozního fondu), abyste mohli sliby vykazovat samostatně v **B1Admin → Donations → Summary**.

### Synchronizace nových uživatelů aplikace jako osob v B1

- **Trigger**: Subsplash: New Person Created
- **Akce**: B1.church: Create Person, s vyplněním jména, e-mailu a telefonu. Označte je v B1 tak, že je přidáte do skupiny „Subsplash App Users“.

## Omezení a poznámky

- **Aplikace Subsplash pro Zapier je pouze triggery.** Pokud chcete, aby se změny provedené v B1 (například nová osoba v B1) propsaly i do Subsplash, musíte takové propojení vytvořit sami: z triggerů aplikace B1 pro Zapier volat REST API Subsplash přes vlastní akci *Webhooks by Zapier — POST*. Jde o vlastní integraci, nikoli o hotový recept.
- **API je vázané na tarif.** Pokud připojení v Zapier selže s chybou `403 Forbidden`, váš tarif Subsplash pravděpodobně nezahrnuje přístup k API. Kontaktujte svého Client Success Manageru.
- **Mapování fondů je ruční.** Subsplash předává název kampaně nebo kategorie, zatímco B1 potřebuje číselné ID fondu. Buď fond pevně zapíšete do Zapu, nebo udržujete *Lookup Table* v Zapier, která mapuje kampaně Subsplash na fondy B1.

## Řešení potíží

- **Po daru se nespustí žádný trigger.** V řídicím panelu Zapier pro Subsplash ověřte, že připojení stále ukazuje stav *Connected*. Pokud byl API token na straně Subsplash změněn, Zap tiše přestane fungovat; připojení znovu obnovte.
- **Krok B1 *Add Donation* selže s chybou 422.** Nejčastěji chybí `fundId` nebo není rozpoznán. Seznam fondů najdete v **B1Admin → Donations → Funds** a přesné ID zkopírujte do kroku Zapu.
- **První dar se zpracuje dvakrát.** Subsplash občas znovu doručí trigger, pokud Zapier nepotvrdil jeho přijetí. Přidejte *Filter by Zapier* podle ID daru (Subsplash ho posílá v datech), aby se duplicitní záznamy vyřadily.

## Viz také

- [Donorbox](./donorbox.md): stejný tvar receptu, jiná platforma pro dary
- [Zapier (přehled)](../zapier.md): strana B1 u každého receptu pro Zapier
- [Návod Subsplash pro integraci se Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (dokumentace Subsplash)
