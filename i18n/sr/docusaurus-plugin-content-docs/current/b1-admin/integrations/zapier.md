---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Zvanična B1.church aplikacija na Zapier-u omogućava da se Zap odziva na događaje u vašoj crkvi (nova osoba, nova donacija, novi član grupe, …) i da upisuje zapise nazad u B1. Nije potrebno programiranje ni posebna infrastruktura. Sve povezujete u Zapier-ovom uređivaču prevlačenjem, unesete API ključ i uključite Zap.

</div>

:::caution Čeka se Zapier-ovo odobrenje
Aplikacija B1.church je izgrađena i radi, ali još uvek čeka Zapier-ov pregled pre nego što se javno pojavi u direktorijumu aplikacija u uređivaču Zap-ova. Dok ne bude odobrena, samo pozvani nalozi mogu da je koriste. Sve što sledi opisuje kako će funkcionisati nakon odobrenja.
:::

<div class="prereqs">
<h4>Pre početka</h4>

- [Zapier](https://zapier.com) nalog (besplatni plan je dovoljan za nekoliko Zap-ova)
- Administrator crkve sa dozvolom **Edit Settings** u B1Admin-u (kreiraćete API ključ)
- Ideja o tome šta želite da postignete, npr. „kada se osoba doda u B1, dodaj je na moju Mailchimp listu”

</div>

## Okidači i radnje

| Vrsta | Šta | B1 događaj / endpoint |
|---|---|---|
| **Okidač** | New Person | `person.created` |
| **Okidač** | Updated Person | `person.updated` |
| **Okidač** | New Donation | `donation.created` |
| **Okidač** | New Group Member | `group.member.added` |
| **Okidač** | New Form Submission | `form.submission.created` |
| **Radnja** | Create Person | dodaje novu osobu |
| **Radnja** | Add Donation | evidentira donaciju |
| **Radnja** | Add Group Member | dodaje osobu u grupu |
| **Radnja** | Find Person | traži osobu po ID-u, e-pošti ili imenu; zadatak ne uspeva ako nijedna osoba ne odgovara |

Ove okidače i radnje možete slobodno kombinovati sa bilo kojom od Zapier-ovih više od 7.000 podržanih aplikacija.

## Podešavanje

### 1. Kreirajte B1 API ključ

1. U B1Admin-u idite na **Settings → Developer → API Keys**.
2. Kliknite **New API Key**, dajte mu ime, npr. „Zapier”, i izaberite opsege (scopes) koje Zap zahteva.
3. **Važno:** Zapier okidači registruju webhook u vaše ime kada se Zap uključi, a za to je potreban opseg **`settings:write`**. Uvek uključite `settings:write` ako bilo koji vaš Zap koristi B1 okidač.
4. Takođe dodelite opsege koje zahtevaju radnje. Na primer, radnja „Add Donation” zahteva `donations:write`, a „Create Person” zahteva `people:write`.
5. Sačuvajte. Ceo `cak_…` ključ se prikazuje **samo jednom**, pa ga odmah kopirajte.

### 2. Povežite Zapier sa B1

1. U Zapier-u napravite novi Zap.
2. Kada prvi put izaberete B1 okidač ili radnju, Zapier će vas zamoliti da se **prijavite na B1.church**.
3. Nalepite API ključ iz koraka 1 i kliknite **Yes, Continue**. Zapier ga proverava za vašu crkvu.

Veza se čuva u Zapier-u i koristi je svaki Zap na vašem nalogu.

### 3. Napravite Zap

Izaberite okidač, zatim dodajte jedan ili više koraka sa radnjama. Primeri su ispod.

## Česti primeri

### Dodavanje novih osoba iz B1 u Mailchimp

- **Okidač** — B1: New Person
- **Radnja** — Mailchimp: Add/Update Subscriber. Mapirajte B1 polja `name__first`, `name__last` i `contactInfo__email` u polja First Name, Last Name i Email u Mailchimp-u.

### Slanje donacija na Slack kanal sa bogatijom karticom nego što nudi ugrađeni konektor

- **Okidač** — B1: New Donation
- **Radnja** — Slack: Send Channel Message. Sastavite bilo koji raspored (dugmad, prilozi itd.) koji [ugrađeni Slack konektor](./slack-discord) ne može da napravi.

### Dodavanje novih članova grupe u Google grupu

- **Okidač** — B1: New Group Member (filtrirano na određeni `groupId`)
- **Radnja** — Filter by Zapier: nastavi samo ako je B1 grupa ona koja vas zanima
- **Radnja** — B1: Find Person (koristite `personId` iz okidača da biste dobili e-poštu)
- **Radnja** — Google Groups: Add Member

### Prosleđivanje slanja obrazaca u alat za praćenje projekata

- **Okidač** — B1: New Form Submission
- **Radnja** — Notion / Linear / Asana / Trello: Create page / issue / task

## Kako okidači rade u pozadini

Okidači su **REST hook-ovi**, a ne proveravanje u intervalima (polling). Zapier ne proverava B1 svakih 15 minuta. Kada uključite Zap, Zapier traži od B1 da registruje webhook koji pokazuje na privatni Zapier URL. Kada se događaj desi, B1 šalje paket Zapier-u i vaš Zap se pokreće **za nekoliko sekundi**. Kada isključite Zap, Zapier traži od B1 da obriše webhook, pa ne ostaju zaostale pretplate.

To znači da se okidač aktivira samo za događaje koji se dese **nakon** što uključite Zap. Nema naknadnog učitavanja: uključivanje Zap-a ne ponavlja juče donacije.

## Ograničenja i napomene

- **Više Zap-ova sa istim okidačem** svaki registruje sopstveni B1 webhook. Nema sukoba, ali vredi znati ako pregledate **Settings → Developer → Webhooks** i pitate se zašto postoje tri identična reda `Zapier — donation.created`.
- **Probni podaci pri podešavanju Zap-a:** kada pravite Zap, Zapier traži uzorke podataka za mapiranje polja. Povući će najnoviji odgovarajući događaj iz B1 ako postoji. U suprotnom koristi sintetički uzorak iz definicije aplikacije.
- **Greške radnji se prikazuju kao greške Zap-a** u istoriji zadataka u Zapier-u. Čest uzrok je API ključ bez odgovarajućeg opsega (npr. radnja „Add Donation” zahteva `donations:write`). Ponovo kreirajte ključ sa ispravnim opsezima i ponovo se povežite u Zapier-u.
- **Kvote za odlazne API pozive:** svaki B1 API poziv iz radnje se računa u vašu Zapier kvotu zadataka, a ne u bilo šta na strani B1.

## Rešavanje problema

- **„Authentication failed”** pri povezivanju: API ključ je pogrešan, opozvan ili mu nedostaju opsezi koje Zap zahteva. Ponovo kreirajte ključ u B1Admin-u sa najmanje `settings:write` i opsezima resursa koje Zap koristi, pa ažurirajte vezu.
- **Okidač se nikada ne aktivira:** proverite da li je webhook zaista registrovan. U B1Admin-u, na **Settings → Developer → Webhooks**, trebalo bi da se sada vidi red pod nazivom „Zapier — &lt;event&gt;”. Ako ga nema, API ključu je verovatno nedostajao `settings:write` kada ste uključili Zap. Ispravite ključ, isključite Zap pa ga ponovo uključite.
- **Okidač se aktivira dvaput:** Zapier povremeno ponovo šalje isporuku ako mu se potvrda izgubi. Ako su vam potrebni strogi uslovi deduplikacije, koristite korak „Filter by Zapier” na jedinstvenom ID-u (npr. `id` osobe).

## Pogledajte i

- [Make](./make): isti obrazac, druga platforma
- [Slack & Discord](./slack-discord): jednostavnija obaveštenja u ćaskanju bez Zapier-a
- [Webhook-ovi (referenca za programere)](/docs/developer/api/webhooks)
