---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) obavlja proveru prošlosti (background screening) za zaposlene i volontere, što je gotovo opšta potreba za svaku crkvu koja vodi dečji ili omladinski program. B1 **nema ugrađenu funkciju za provere prošlosti**. Naručivanje provera, praćenje rezultata i usklađenost sa propisima o proverama sve se odvija u Checkr-u. Recept u nastavku samo povezuje B1 događaje sa Checkr-om. Checkr nema Zapier aplikaciju, ali [Make.com-ova integracija sa Checkr-om](https://www.make.com/en/integrations/checkr) je proverena i nudi radnje koje su vam potrebne da biste pokrenuli proveru iz B1 događaja.

</div>

<div class="prereqs">
<h4>Pre nego što počnete</h4>

- Nalog na [Checkr](https://checkr.com) sa pristupom API-ju i najmanje jednim konfigurisanim paketom provere
- Nalog na [Make](https://www.make.com)
- B1Admin korisnik sa dozvolom **Edit Settings**

</div>

## Šta možete da povežete

Make-ova Checkr aplikacija nudi 1 okidač i 6 radnji:

| Smer | B1 / Make okidač | Radnja |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrirano na grupu volontera) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (događaj pozivnice / izveštaja) | B1: Ažuriranje zapisa osobe (npr. oznaka „Checkr cleared“) |

Make-ove Checkr radnje su: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA i Get an Invitation. Pored toga, postoje 4 modula za pretragu.

## Podešavanje

### 1. Napravite B1 API ključ

**Settings → Developer → API Keys → New API Key**:

- `settings:write`, za okidački webhook
- `people:read`, za pronalaženje imena i e-adrese osobe pri pokretanju provere
- (Opciono) `people:write`, ako želite da status izveštaja upisujete nazad kao prilagođeno polje ili oznaku

### 2. Napravite scenario „pokreni proveru pri prijavi volontera“ u Make-u

1. **Okidač** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — nastavi samo ako se `data.groupId` poklapa sa grupom „Children's Volunteers“ (ili sličnom).
3. **Radnja** — B1.church: Find Person (prema `data.personId`) da biste dobili e-adresu i ime i prezime.
4. **Radnja** — Checkr: Create Candidate. Mapirajte ime, prezime i e-adresu iz koraka 3.
5. **Radnja** — Checkr: Create Background Check Invitation. Mapirajte ID novog kandidata iz koraka 4 u polje *candidate_id*. Izaberite paket provere (npr. `tasker_standard` ili šta god vaš nalog nudi).
6. (Opciono) **Radnja** — Slack: obavestite koordinatora za bezbednost dece da je provera pokrenuta.

Uključite scenario. Novi volonteri u ciljnoj grupi automatski dobijaju Checkr pozivnicu e-poštom. Popunjavaju je na telefonu ili laptopu, a Checkr sprovodi proveru.

### 3. (Opciono) Primanje izveštaja nazad

1. **Okidač** — Checkr: Watch Events (webhook). Make registruje Checkr webhook pri aktivaciji.
2. **Filter** — nastavi samo ako je `event_type = report.completed`.
3. **Radnja** — Checkr: Get Report (koristite ID izveštaja iz webhook-a).
4. **Radnja** — B1.church: Find Person (prema e-adresi kandidata).
5. **Radnja** — Uslovni Slack / e-pošta: obavestite koordinatora sa statusom `clear` / `consider` / `suspended`.

Napomena: B1 trenutno nema ugrađeno polje za status provere prošlosti. Praktične opcije su: (a) objavite rezultat u privatnom Slack kanalu radi pregleda, (b) upišite ga u Google tabelu radi evidencije ili (c) dodajte osobu u B1 grupu „Cleared volunteers“ kada dobije `clear`.

## Česti recepti

### Ponovna provera volontera na svake 2 godine

Uz gore opisano, povežite okidač rasporeda u Make-u:

- **Okidač** — Make: Schedule (mesečno)
- **Radnja** — B1.church: List Group Members za „Cleared volunteers“
- **Radnja** — Filter u Make-u: datum prolaska provere stariji od 22 meseca
- **Radnja** — Checkr: Create Background Check Invitation (isti tok kao početni)

### Blokiranje pristupa za fazu 1 dok se provera ne završi

Ako vaša crkva koristi članstvo u B1 grupama za kontrolu pristupa (npr. samo članovi grupe „Cleared“ se pojavljuju u rasporedima službe), zadržite nove volontere u privremenoj grupi dok događaj Checkr `report.completed` ne promeni njihov status.

## Ograničenja i napomene

- **Checkr radi samo u SAD** za većinu paketa provere. Crkve iz Australije, Velike Britanije i Kanade će morati da koriste neku drugu uslugu.
- **Cena** se računa po proveri. Svaka pozivnica kreirana u Make-u troši pravu proveru. Prvo testirajte u Checkr-ovom sandbox ili test nalogu (Make-ova Checkr aplikacija koristi akreditive koje unesete u vezi, pa zamena akreditiva prebacuje između test i produkcionog režima).
- **Pristup Checkr API-ju zavisi od plana.** Manji Checkr nalozi mogu biti na nivou samo za korišćenje preko korisničkog interfejsa. Za omogućavanje API-ja obratite se Checkr-u.

## Rešavanje problema

- **Create Candidate ne uspeva sa `403`**: Checkr API token je samo za čitanje ili nema odgovarajuće dozvole za nalog. Ponovo ga izdajte iz Checkr kontrolne table sa dozvolom za pisanje.
- **Pozivnica nikad ne stigne**: proverite e-adresu kandidata u koraku 3. B1 možda nema e-adresu za tu osobu. Dodajte filter koji zahteva e-adresu pre Checkr koraka.
- **Okidač webhook-a se ne aktivira**: Checkr ponekad tiho ne uspe da registruje webhook ako vaš Make nalog nije na plaćenom nivou koji podržava odlazne webhook-ove. Proverite na Checkr kontrolnoj tabli, na stranici *Webhooks*, da li je Make-ov URL naveden.

## Pogledajte i

- [Make (pregled)](../make): B1 strana svakog Make scenarija
- [Mobile Message](./mobile-message): za SMS provajdere bez Zapier aplikacija, isti obrazac Webhooks/HTTP kao kod Checkr povezivanja u Make-u
- [Checkr API dokumentacija](https://docs.checkr.com/)
