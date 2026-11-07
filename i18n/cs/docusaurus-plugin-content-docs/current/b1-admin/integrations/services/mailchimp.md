---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Udržujte publikum v Mailchimpu automaticky synchronizované s B1: lidé se do něj přidávají se jménem, e-mailem a telefonem; členství ve skupinách a seznamech se promítá jako štítky Mailchimpu; smazaní lidé jsou archivováni. Synchronizace je součástí B1. Nepotřebujete žádnou službu třetí strany ani platbu za jednotlivé úlohy a změny se projeví téměř v reálném čase, nikoli podle nočního plánu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet [Mailchimp](https://mailchimp.com) s publikem, které má B1 spravovat
- **API klíč** Mailchimpu (Mailchimp: ikona profilu → **Account & billing → Extras → API keys**)
- Vaše **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Uživatel B1Admin s oprávněním **Edit Settings**

</div>

## Co se synchronizuje

| Změna v B1 | Účinek v Mailchimpu |
|---|---|
| Osoba přidána nebo upravena | Odběratel přidán/aktualizován (křestní jméno, příjmení, telefon; noví odběratelé se přidají se stavem `subscribed`) |
| Osoba smazána (nebo vymazána podle GDPR) | Odběratel archivován |
| Osoba se připojí ke skupině | Přidán štítek pojmenovaný podle skupiny |
| Osoba opustí skupinu | Tento štítek odebrán |
| Osoba vstoupí do uloženého seznamu | Přidán štítek pojmenovaný podle seznamu |
| Osoba opustí uložený seznam | Tento štítek odebrán |

**Uložené seznamy jsou obvykle lepším zdrojem štítků.** [Uložený seznam](/docs/b1-admin/people/lists) v B1 je publikum založené na pravidlech, které se samo průběžně přepočítává, například „všichni na severním kampusu“ nebo „členové, kteří souhlasili s pastoračními e-maily“. Pokud vaše segmenty v Mailchimpu založíte na štítcích seznamů, synchronizace je bude udržovat aktuální. Štítky skupin se hodí pro rozesílky týmům služby.

Synchronizace je **jednosměrná** (B1 → Mailchimp) a mění pouze standardní pole Mailchimpu, takže nemůže být v konfliktu s poli sloučení (merge fields) ani segmenty, které spravujete přímo v Mailchimpu.

## Nastavení

1. V B1Admin přejděte na **Settings → Developer → Webhooks → New Webhook**.
2. Nastavte **Connector Type** na **Mailchimp**.
3. Vložte svůj **Mailchimp API Key** a **Audience ID**. Klíč se uloží šifrovaně a už se nikdy nezobrazí.
4. Příslušné události jsou předvybrané; odškrtněte ty, které nechcete (např. ponechte události osob, ale přeskočte štítky skupin).
5. Uložte. Před přijetím B1 ověří klíč a publikum u Mailchimpu. Překlep selže okamžitě s uvedeným důvodem.

Kdykoli můžete použít **Send Test** k opětovnému ověření připojení. Každý pokus o synchronizaci se zaznamená v historii doručení webhooku spolu se skutečnou odpovědí Mailchimpu. Neúspěšná doručení se automaticky opakují s postupným prodlužováním intervalu zhruba pět dní.

## Počáteční import

Konektor synchronizuje *změny* od okamžiku zapnutí; zpětně nedoplňuje váš stávající adresář. Pro den nastavení:

1. V B1Admin přejděte na **People**, vyhledejte osoby, které chcete (nebo spusťte uložený seznam), a klikněte na **Export**. Stáhne se CSV soubor.
2. V Mailchimpu použijte **Audience → Import contacts** k nahrání CSV souboru a při importu případně přiřaďte štítky.

Počáteční načtení přes importér Mailchimpu vám ponechá kontrolu nad souhlasem. Importujte pouze osoby, které skutečně souhlasily s přijímáním vašich e-mailů. Hromadný import celého adresáře jako odebírajících kontaktů může porušovat podmínky Mailchimpu a protispamové zákony (CAN-SPAM/GDPR).

## Omezení a poznámky

- **Jednosměrná synchronizace.** Odhlášení, nedoručené e-maily (bounces) a úpravy provedené v Mailchimpu se do B1 nepromítnou. Člověk, který se odhlásí v Mailchimpu, může stále dostávat e-maily odeslané přímo z B1. Pro souhlas s hromadnými e-maily berte Mailchimp jako zdroj pravdy.
- **Osoby bez e-mailové adresy se přeskočí** (v historii doručení se to zaznamená), protože odběratelé Mailchimpu jsou identifikováni e-mailem.
- **Změna e-mailové adresy vytvoří nového odběratele.** Mailchimp rozlišuje osoby podle e-mailu, takže změna e-mailu v B1 přidá osobu pod novou adresou. Starý odběratel zůstane, dokud ho nearchivujete v Mailchimpu.
- **Synchronizují se pouze standardní pole**: křestní jméno, příjmení, telefon. Stav členství, kampus ani vlastní pole B1 se v této verzi nemapují na pole sloučení v Mailchimpu. K segmentaci používejte štítky seznamů.
- **Názvy štítků odpovídají názvům skupin a seznamů.** Přejmenování skupiny nebo seznamu znamená, že se štítkování začne používat pod novým názvem. Starý štítek zůstane u stávajících odběratelů, dokud ho neodstraníte v Mailchimpu.
- **Platí limity kontaktů Mailchimpu.** Pokud synchronizace přesune publikum na bezplatném plánu přes jeho limit, v historii doručení se zapíše chyba `Member limit reached`.

## Další postupy (Zapier / Make)

Vše nad rámec synchronizace publika, například označování dárců při události `donation.created`, opačný směr Mailchimp → B1 nebo synchronizace s úplně jinou e-mailovou platformou (Constant Contact, Brevo apod.), je stále dostupné přes [Zapier](../zapier) nebo [Make](../make). Tyto nástroje reagují na stejné události webhooku:

- **Označování dárců:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Obousměrně:** Mailchimp *New Subscriber* → B1 *Create Person*

Pokud jste dříve propojili synchronizaci osob a skupin přes Zapier, po zapnutí nativního konektoru tyto Zaps vypněte. Provoz obou najednou zpracuje každou událost dvakrát a zbytečně spotřebuje úlohy Zapieru.

## Řešení problémů

- **Uložení selže s hláškou „Mailchimp rejected the API key“.** Klíč byl zrušen nebo přepsán. Klíče musí končit příponou datového centra, například `-us21`.
- **Uložení selže s hláškou „audience not found“.** Audience ID v daném účtu neexistuje. Zkopírujte jej z **Audience → Settings → Audience name and defaults** (nejde o název publika).
- **Osoba se v Mailchimpu nikdy neobjevila.** Zkontrolujte historii doručení webhooku. Hláška „Skipped: person has no email address“ znamená přesně to, co říká. Odpověď `4xx` z Mailchimpu uvádí důvod v těle odpovědi.
- **Doručování se úplně zastavilo.** Po opakovaných vyčerpaných pokusech se webhook automaticky vypne. Odstraňte příčinu (obvykle zrušený klíč), webhook znovu zapněte a pomocí **Send Test** ověřte funkčnost.

## Související

- [Webhooky (referenční příručka pro vývojáře)](/docs/developer/api/webhooks): engine, na kterém to celé stojí, katalog událostí a sémantika doručení a opakování
- [Uložené seznamy](/docs/b1-admin/people/lists): pravidlová publika, která se přirozeně mapují na štítky Mailchimpu
- [Zapier (přehled)](../zapier): pro postupy nad rámec synchronizace publika
