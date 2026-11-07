---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) zajišťuje prověřování bezúhonnosti zaměstnanců a dobrovolníků, což je téměř univerzální potřeba každé církve, která provozuje program pro děti nebo mládež. B1 **nemá žádnou vestavěnou funkci pro prověřování bezúhonnosti**. Objednávání kontrol, sledování výsledků i dodržování předpisů o prověřování probíhají všechny v Checkr. Níže popsaný postup pouze propojí události v B1 s Checkr. Checkr nemá aplikaci pro Zapier, ale [integrace Checkr v Make.com](https://www.make.com/en/integrations/checkr) je ověřená a nabízí akce, které potřebujete ke spuštění kontroly z události v B1.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet [Checkr](https://checkr.com) s přístupem k API a alespoň jedním nakonfigurovaným prověřovacím balíčkem
- Účet v [Make](https://www.make.com)
- Uživatel B1Admin s oprávněním **Edit Settings** (Upravit nastavení)

</div>

## Co můžete propojit

Aplikace Checkr v Make nabízí 1 spouštěč a 6 akcí:

| Směr | Spouštěč v B1 / Make | Akce |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrováno na skupinu dobrovolníků) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook Checkr (událost pozvánky / zprávy) | B1: Aktualizace záznamu osoby (např. štítek „Checkr cleared“) |

Akce Checkr v Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Dále 4 vyhledávací moduly.

## Nastavení

### 1. Vytvořte klíč API pro B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` pro webhook spouštěče
- `people:read` pro vyhledání jména a e-mailu osoby při zahájení kontroly
- (Volitelné) `people:write`, pokud chcete stav zprávy zapisovat zpět jako vlastní pole nebo štítek

### 2. Vytvořte v Make scénář „zahájení kontroly při přihlášení dobrovolníka“

1. **Spouštěč** – B1.church: Watch Events (`group.member.added`).
2. **Filtr** – pokračovat pouze tehdy, když `data.groupId` odpovídá vaší skupině „Children's Volunteers“ (nebo obdobné).
3. **Akce** – B1.church: Find Person (podle `data.personId`), aby se získal e-mail a jméno a příjmení.
4. **Akce** – Checkr: Create Candidate. Namapujte jméno, příjmení a e-mail z kroku 3.
5. **Akce** – Checkr: Create Background Check Invitation. Namapujte ID nového kandidáta z kroku 4 do pole *candidate_id*. Vyberte prověřovací balíček (např. `tasker_standard` nebo ten, který váš účet nabízí).
6. (Volitelné) **Akce** – Slack: upozornit koordinátora pro bezpečnost ve službě, že byla zahájena kontrola.

Zapněte scénář. Noví dobrovolníci v cílové skupině dostanou automaticky pozvánku do Checkr e-mailem. Vyplní ji na telefonu nebo notebooku a Checkr provede prověrku.

### 3. (Volitelné) Získání zprávy zpět

1. **Spouštěč** – Checkr: Watch Events (webhook). Make po aktivaci zaregistruje webhook v Checkr.
2. **Filtr** – pokračovat pouze tehdy, když `event_type = report.completed`.
3. **Akce** – Checkr: Get Report (použijte ID zprávy z webhooku).
4. **Akce** – B1.church: Find Person (podle e-mailu kandidáta).
5. **Podmíněná akce** – Slack / e-mail: upozornit koordinátora se stavem `clear` / `consider` / `suspended`.

Poznámka: B1 zatím nemá vestavěné pole pro „stav prověření bezúhonnosti“. Praktické možnosti jsou (a) odeslat výsledek do soukromého kanálu Slack ke kontrole, (b) zapsat jej do Tabulky Google kvůli auditu, nebo (c) při stavu `clear` přidat osobu do skupiny B1 „Cleared volunteers“.

## Běžné postupy

### Opakované prověřování dobrovolníků každé 2 roky

Výše uvedený postup doplňte plánovaným spouštěčem v Make:

- **Spouštěč** – Make: Schedule (měsíčně)
- **Akce** – B1.church: List Group Members pro skupinu „Cleared volunteers“
- **Akce** – Filtr v Make: datum prověření starší než 22 měsíců
- **Akce** – Checkr: Create Background Check Invitation (stejně jako při prvním postupu)

### Blokování přístupu k první fázi, dokud kontrola neskončí

Pokud vaše církev používá členství ve skupinách B1 k řízení přístupu (např. do plánů služeb se zobrazují pouze členové skupiny „Cleared“), ponechte nové dobrovolníky v dočasné skupině, dokud událost Checkr `report.completed` jejich stav nezmění.

## Omezení a poznámky

- **Checkr funguje většinou pouze v USA** u většiny prověřovacích balíčků. Církve v Austrálii, Spojeném království a Kanadě budou potřebovat jinou službu.
- **Ceny** se účtují za kontrolu. Každé vytvoření pozvánky v Make spotřebuje skutečnou kontrolu. Nejprve otestujte v sandboxu nebo testovacím účtu Checkr. Aplikace Checkr v Make používá přihlašovací údaje, které předáte v připojení, takže výměnou údajů přepnete mezi sandboxem a ostrým provozem.
- **Přístup k API v Checkr závisí na tarifu.** Menší účty Checkr mohou mít pouze přístup přes webové rozhraní. Pro zpřístupnění API kontaktujte Checkr.

## Řešení potíží

- **Create Candidate selže s chybou `403`** – token API v Checkr je pouze pro čtení nebo mu chybí potřebná oprávnění účtu. Vygenerujte jej znovu v řídicím panelu Checkr s oprávněním pro zápis.
- **Pozvánka nikdy nedorazí** – zkontrolujte e-mail kandidáta v kroku 3. B1 může mít u dané osoby prázdné pole e-mailu. Před krok Checkr přidejte filtr, který vyžaduje e-mail.
- **Webhook spouštěč se nespustí** – registrace webhooku v Checkr občas tiše selže, pokud váš účet Make není na placeném tarifu, který podporuje odchozí webhooky. Ověřte na stránce *Webhooks* v řídicím panelu Checkr, že je URL Make uvedena.

## Viz také

- [Make (přehled)](../make) – strana B1 každého scénáře v Make
- [Mobile Message](./mobile-message) – pro poskytovatele SMS bez aplikací pro Zapier, stejný vzor Webhooks/HTTP jako propojení Checkr s Make
- [Dokumentace API Checkr](https://docs.checkr.com/)
