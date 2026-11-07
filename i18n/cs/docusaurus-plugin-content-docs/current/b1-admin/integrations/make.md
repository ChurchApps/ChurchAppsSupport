---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (dříve Integromat) je vizuální platforma pro automatizaci pracovních postupů. Je podobná nástroji Zapier, ale nabízí pružnější logiku a při větším objemu bývá levnější. Oficiální aplikace B1.church pro Make vám umožní vytvářet „scénáře“, které okamžitě reagují na události v B1 a zapisují záznamy zpět do B1.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet na [Make](https://www.make.com) (bezplatná úroveň stačí pro menší pracovní postupy)
- Správce církve s oprávněním **Edit Settings** v B1Admin
- Základní představa o scénáři, který chcete vytvořit

</div>

## Moduly

| Typ | Co dělá | Událost nebo endpoint v B1 |
|---|---|---|
| **Instant Trigger** | Sledovat události | libovolná odebíraná událost B1 (`person.created`, `donation.created`, …) |
| **Action** | Vytvořit osobu | přidá novou osobu |
| **Action** | Přidat dar | zaznamená dar |
| **Action** | Přidat člena skupiny | přidá osobu do skupiny |
| **Search** | Hledat osoby | najde osoby podle jména nebo e-mailu |

Okamžitý spouštěč umožňuje vybrat, kterou událost sledovat. Každý scénář má jeden spouštěcí modul, který se nastavuje zvlášť pro každou událost.

## Nastavení

### 1. Vytvoření klíče API v B1

1. V B1Admin přejděte do **Settings → Developer → API Keys**.
2. Klikněte na **New API Key**, pojmenujte jej „Make“ a udělte potřebná oprávnění (scopes).
3. **Přidejte `settings:write`**, pokud některý ze scénářů používá okamžitý spouštěč. Make při zapnutí scénáře za vás zaregistruje webhook.
4. Udělte také oprávnění, která potřebují akční moduly (např. `donations:write` pro modul Add Donation).
5. Uložte a zkopírujte klíč `cak_…`.

### 2. Vytvoření připojení

1. V Make vytvořte nový scénář a na plátno přetáhněte spouštěcí modul **B1.church**.
2. Když se zobrazí výzva, zvolte **Create a connection**. Vložte klíč API do pole *API Key* a pole *API Base URL* ponechte jako `https://api.churchapps.org` (pokud netestujete na staging prostředí).
3. Klikněte na **Save**. Make klíč ověří načtením profilu vaší církve.

Připojení se uloží ke vašemu účtu Make a lze jej znovu použít v různých scénářích.

### 3. Nastavení spouštěče

1. Otevřete nastavení modulu **Watch Events**.
2. Vyberte požadovanou událost, např. `donation.created`.
3. Uložte. Make vygeneruje jedinečnou adresu URL webhooku a interně ji uloží.

### 4. Přidání navazujících modulů

Na plátno můžete přidat libovolný z mnoha stovek modulů Make, například Mailchimp, Google Sheets, Slack, HubSpot nebo vlastní HTTP endpoint. Výstup spouštěče (`event`, `churchId`, `data.id`, `data.amount`, …) namapujte do vstupních polí těchto modulů. Moduly pro zploštění (flatten), iterátor, router a agregátor vám umožní vytvářet větvené a paralelní toky, které by se v Zapieru stavěly obtížně.

### 5. Zapnutí scénáře

Přepněte přepínač **Active** v záhlaví scénáře. Make zavolá endpoint B1 `POST /membership/webhooks` a zaregistruje adresu URL. Od tohoto okamžiku prochází každá odpovídající událost B1 scénářem v reálném čase.

Vypnutí scénáře zavolá `DELETE /membership/webhooks/{id}`, takže nezůstanou žádná osiřelá odběrná nastavení.

## Běžné postupy

### Synchronizace darů do Google Sheet pro finanční kontrolu

- **Spouštěč** — B1: Watch Events (`donation.created`)
- **Akce** — Google Sheets: Add a Row. Namapujte `data.donationDate`, `data.amount`, `data.personId`, `data.method` a `data.batchId` do sloupců tabulky.

### Podmíněné upozornění na Slacku podle výše daru

- **Spouštěč** — B1: Watch Events (`donation.created`)
- **Router**:
  - Větev A — Filtr: `data.amount >= 1000` → Slack: odeslat zprávu do `#major-gifts`
  - Větev B — jinak (fallthrough) → Slack: odeslat zprávu do `#donations`

### Nová osoba → CRM + uvítací e-mail + Slack

- **Spouštěč** — B1: Watch Events (`person.created`)
- **Akce** — HubSpot: Create Contact
- **Akce** — Mailgun: Send Welcome Email
- **Akce** — Slack: upozornit `#new-people` (paralelně, pomocí routeru v Make)

## Jak funguje okamžitý spouštěč

Okamžitý spouštěč je založen na webhooku, nikoli na dotazování (polling). Po aktivaci zavolá Make endpoint `POST /membership/webhooks` s vygenerovanou adresou URL a zvolenou událostí. Když se událost v B1 odehraje, B1 odešle obálku události na adresu URL v Make a váš scénář se spustí během několika sekund. Deaktivace scénáře webhook odstraní.

Spouštěč reaguje pouze na události, které nastanou **během aktivity scénáře**. Zpětné doplňování neprobíhá.

## Omezení a poznámky

- **Jedna událost na modul Watch Events.** Chcete-li v jednom scénáři sledovat více událostí, přidejte více spouštěcích modulů do samostatných scénářů, nebo použijte jeden modul se sjednocením seznamu událostí (viz níže).
- **Ověření podpisu není dostupné.** Make nepředává hlavičku `X-B1-Signature` do scénáře. Důvěryhodnost zajišťuje nepředvídatelná adresa URL webhooku pro každý scénář, což je běžný postup v Make. Pokud potřebujete explicitní kontrolu podpisu, vytvořte vlastní integraci pomocí [SDK](/docs/developer/api/webhooks#sdk-support).
- **Počet operací.** Každé volání API z akčního modulu se počítá do vaší kvóty operací v Make, nikoli na straně B1.

## Řešení potíží

- **Test připojení selže** — nejčastěji jde o překlep v klíči API. Zkopírujte jej znovu z B1Admin. Celý klíč se zobrazí pouze jednou. Pokud jste jej ztratili, vytvořte nový klíč.
- **Modul spouštěče se neaktivuje** — v B1Admin zkontrolujte **Settings → Developer → Webhooks**. Pokud se po aktivaci scénáře nezobrazí řádek „Make — &lt;event&gt;“, klíč nemá oprávnění `settings:write`. Aktualizujte klíč a scénář znovu aktivujte.
- **Akce vrací `403 Forbidden`** — klíč API nemá oprávnění pro daný endpoint. Například Add Donation vyžaduje `donations:write`. Aktualizujte klíč v B1Admin a spusťte test znovu.

## Přizpůsobení aplikace

Aplikace B1.church pro Make je open source. Definice JSON jsou v repozitáři `B1Integrations/Make/`. Pokud potřebujete modul, který neexistuje (např. novou akci pro endpoint, který ještě nepokrываме), založte issue nebo PR v tomto repozitáři.

## Viz také

- [Zapier](./zapier) — stejný princip s jednodušším rozhraním a větším katalogem aplikací
- [Slack a Discord](./slack-discord) — vestavěná chatová upozornění bez Make
- [Webhooky (referenční příručka pro vývojáře)](/docs/developer/api/webhooks)
