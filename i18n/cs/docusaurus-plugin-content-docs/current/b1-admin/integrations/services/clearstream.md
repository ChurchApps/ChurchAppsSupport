---
title: "Clearstream"
description: "Propojte Clearstream SMS s B1 Admin přes Zapier: posílejte SMS při nových darech nebo odeslaných formulářích a vracejte příchozí odpovědi jako osoby."
---

# Clearstream

<div class="article-intro">

Odešlete textovou zprávu přes [Clearstream](https://clearstream.io) z libovolné události v B1, ať jde o novou osobu, nový dar, odeslaný formulář nebo změnu v kalendáři. Odpovědi z Clearstreamu se mohou zase vracet do B1 jako záznamy. Aplikace Clearstream pro Zapier podporuje oba směry, takže celé propojení je hotový recept a nemusíte psát vlastní kód.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet [Clearstream](https://clearstream.io) alespoň s jedním seznamem a kreditem na SMS zprávy
- Účet [Zapier](https://zapier.com)
- Uživatel B1Admin s oprávněním **Edit Settings**

</div>

## Co můžete propojit

| Směr | Spouštěč | Akce |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (např. upozornění finančnímu týmu) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (např. tým pro modlitební požadavky) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; označit klíčovým slovem, které osoba poslala |

Akce Clearstreamu v Zapieru: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Nastavení

### 1. Vytvořte API klíč B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` – nutné, aby B1 zaregistrovalo webhook spouštěče
- `people:read` – potřebné k vyhledání osoby z události (`personId` → jméno, telefon, e-mail)
- (Volitelné) `people:write`, pokud mají odpovědi z Clearstreamu vytvářet kontakty v B1

### 2. Vytvořte Zap „text při novém daru“

1. **Spouštěč** – B1.church: New Donation
2. **Akce** – B1.church: Find Person (`personId` daru)
3. **Akce** – Clearstream: Send Text to Number. Jako příjemce použijte telefon osoby z kroku 2 a napište zprávu, např. `„Děkujeme za váš dar, {first}! …“` (`{first}` je zástupný symbol pro jméno.)

Zap zapněte. B1 zaregistruje webhook darů při aktivaci a v **Settings → Developer → Webhooks** se zobrazí `Zapier — donation.created`.

### 3. (Volitelné) Odpovědi jako záznamy v B1

1. **Spouštěč** – Clearstream: New Incoming Text
2. **Akce** – Filter by Zapier podle klíčového slova, např. pokračovat jen tehdy, když text začíná na `PRAY`
3. **Akce** – B1.church: Find Person (podle telefonu)
4. **Akce** – Filter / Path – pokud osoba nenalezena, vytvořte ji; v obou případech uložte text zprávy někam (Slack, Google Sheet nebo odeslání formuláře v B1 přes Webhooks by Zapier).

## Běžné recepty

### Upozornění týmu dobrovolníků

- **Spouštěč** – B1.church: New Form Submission (filtrováno podle ID formuláře s modlitebním požadavkem)
- **Akce** – Clearstream: Send Text to List, kde seznam je váš pohotovostní pastorační tým. Text zprávy napište jako `New prayer request: {data.questions.0.answer}`.

### Posloupnost sledování návštěvníků poprvé

- **Spouštěč** – B1.church: New Person, filtrováno podle štítku osoby „First-time visitor“
- **Akce** – Clearstream: Add Subscriber to Automated Workflow. Namapujte ID pracovního postupu na předpřipravenou sedmidenní řadu textových zpráv.

### Připojení do skupiny podle klíčového slova

- **Spouštěč** – Clearstream: New Incoming Text (filtr na klíčové slovo `MENS`)
- **Akce** – B1.church: Find Person (podle telefonu); pokud osoba nenalezena → Create Person
- **Akce** – B1.church: Add Group Member, přidání do skupiny Men's Ministry

## Omezení a poznámky

- **Clearstream účtuje SMS podle počtu zpráv.** Každá akce Send Text spotřebuje jeden nebo více kreditů podle délky zprávy a počtu příjemců. Zkontrolujte limit svého tarifu.
- **Telefon musí být ve formátu E.164** (např. `+15555550199`) pro *Send Text to Number*. Záznam osoby v B1 ukládá číslo tak, jak bylo zadáno. Pokud si formátem nejste jisti, přidejte krok *Formatter by Zapier — Numbers → Format Phone Number*.
- **Z dané strany B1 není potřeba žádná hlavička.** Autentizace Clearstreamu je celá uvnitř jeho připojení v Zapieru.

## Řešení potíží

- **Spouštěč se nikdy nespustí** – Po zapnutí Zapu by se v `Settings → Developer → Webhooks` měl objevit řádek `Zapier — <event>`. Pokud ne, API klíči B1 chybí `settings:write`. Vytvořte nový klíč a znovu připojte.
- **Clearstream vrací „Invalid phone number“** – pole příjemce není ve formátu E.164. Přidejte krok Format Phone Number.
- **Send Text to List selže s chybou `403`** – uživatel API Clearstreamu nemá oprávnění k tomuto seznamu, nebo je ID seznamu špatné. ID seznamů najdete na detailu seznamu v Clearstreamu.

## Viz také

- [Text In Church](./text-in-church.md) – alternativní platforma pro SMS se podobným zapojením
- [Mobile Message](./mobile-message.md) – pro sbory mimo USA
- [Zapier (přehled)](../zapier.md) – strana B1 u všech receptů pro Zapier
- [Dokumentace API Clearstreamu](https://api-docs.clearstream.io/) – pro vlastní integrace nad rámec aplikace Zapier
