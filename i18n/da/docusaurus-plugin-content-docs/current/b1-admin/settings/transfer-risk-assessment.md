---
title: "overføring risiko vurdering"
---

# overføring risiko vurdering

<div class="article-intro">

Denne dokument registrerer ChurchApps vurdering af risiko forbundet med internationale overføringer af personlig data fra Storbritannien/EEA til Forenede stater, som påkrævet under Storbritannien GDPR og EU GDPR. Dette er en intern compliace registrering vedligeholdt af ChurchApps som data processor.

</div>

**senest gennemgået:** april 2026

## 1. overføring detaljer

| element | detalje |
|---|---|
| **data eksportør** | kirker ved hjælp af ChurchApps (data controllers) placeret i Storbritannien/EEA |
| **data importør** | ChurchApps (data processor), operativ fra Forenede stater |
| **kategorier af data emner** | kirkemedlemmer, deltager, besøgende, donorer, frivillige, børn (administreret af forældre/administratorer) |
| **kategorier af personlig data** | navne, e-mail adresser, telefon numre, post adresser, fødsels datoer, køn, ægteskabelig status, profil billeder, donation registreringer, tilstedeværelse registreringer, gruppe medlemskaber, frivillig opgaver, messaging historie |
| **sensitiv data** | ingen bevidst indsamlet. ingen sundhed data, biometrisk data eller kriminel registreringer bliver lagret. økonomisk konto detaljer (kreditkort, bankrød) er aldrig lagret af ChurchApps — disse bliver håndteret direkte af stripe. |
| **formål for overføring** | giving af kirke ledelse softwareservice (medlem ledelse, donationer, tilstedeværelse sporing, kommunikation, frivillig planlægning, event registrering) |
| **destination land** | Forenede stater |
| **overføring mekanisme** | EU standard kontraktual klausuler (SCCs) og Storbritannien international data overføring tillæg (IDTA), indarbejdet via AWS data behandling tillæg |

## 2. under-processualer

| under-processor | rolle | placering | overføring mekanisme |
|---|---|---|---|
| **Amazon web services (AWS)** | infrastruktur hosting, data lagring, indhold levering (us-east-2 område) | Forenede stater | AWS DPA med SCCs (automatisk inkluderet i AWS service vilkår) |
| **stripe** | betaling behandling til donationer | Forenede stater | stripe DPA med SCCs |

kreditkort og bankrød data bliver sendt direkte fra brugers browser til stripe og er aldrig lagret på eller sendt gennem ChurchApps servere.

## 3. risiko vurdering

### 3.1 kryptering

- **transit:** alle data er krypteret ved hjælp af TLS/HTTPS til alle kommunikation mellem brugere og ChurchApps servere.
- **rest:** data lagret på AWS er krypteret rest ved hjælp af AWS-administreret kryptering.

### 3.2 adgangskontroller

- produktions server adgang er begrænset til to personer som er medlemmer af ChurchApps bestyrelsesrådet.
- udvikler, frivillige og anden bestyrelsesmedlemmer har ikke adgang til produktions servere eller databaser.
- database servere er bag en brandmur og er ikke direkte tilgængelig fra internettet.
- kirke data er logisk adskilt — hver kirke kan kun få adgang til dens eget data gennem applikation-niveau adgangskontroller.

### 3.3 data segregering

data er distribueret på tværs af seks uafhængige databaser (medlemskab, givning, tilstedeværelse, messaging, gør, indhold). kompromis af en database afsløre ikke data fra de andre. For eksempel, givning databasen indeholder donation beløb og datoer men ikke navne eller kontakt information af donorer (lagret i medlemskab).

### 3.4 data minimalisering

- ingen kreditkort eller bankrød information er lagret (håndteret af stripe).
- adgangskoder er lagret ved hjælp af enveis hashing og kan ikke hentes.
- kirker styre hvad data de indsamler fra deres medlemmer.

### 3.5 data emne rettigheder

ChurchApps giver teknisk værktøjer gør kirker i stand til at opfylde data emne anmodninger:

- **adgang og transportabilitet:** fuld data eksport i maskine-læselig JSON format.
- **sletning:** anonymisering på tværs af alle seks databaser, erstatning personlig data med generisk værdier mens bevare sammenlignende registreringer påkrævet til økonomisk rapportering.
- **begrænsning:** inaktiv medlemsstatus udelukker personer fra søgning, katalog, rapporter og messaging mens forblive deres registrering.
- **rettelse:** medlemmer og administratorer kan redige personlig information gennem applikationen.

### 3.6 brud meddelelse

ChurchApps forpligter at underrette påvirket kirker inden 72 timer om at blive opmærksom på personlig data brud, som dokumenteret i [servicebetingelser](https://churchapps.org/terms) (sektion 11.6).

### 3.7 USA regering adgang risiko

Primær risiko forbundet med USA-værtet data er potentiel adgang af USA regering autoriteiter under FISA sektion 702 eller executive order 12333. Denne risiko vurderes som **lav** til følgende grunde:

- ChurchApps processer kirke medlemskab og tilstedeværelse data, ikke data af intelligens værdier.
- data emner er kirkemedlemmer og deltager — ikke kategorier typisk målrettet af overvågnings programmer.
- ingen sensitiv personlig data (sundhed, økonomisk konti, politisk meninger) er lagret.
- AWS's DPA inkluderer engagement omkring regering adgang anmodninger og transparents rapportering.
- EU-USA data privatlivs framework (etableret 2023) giver yderligere sikkerhed til data overføringer til certificeret USA organisationer.

## 4. overordnet risiko konklusion

Risiko til data emner fra denne internationale overføring vurderes som **lav**. kombinationen af:

- standard kontraktual klausuler som juridisk overføring mekanisme
- kryptering transit og rest
- streng adgangskontroller med kun to autoriseret personer
- data segregering på tværs af uafhængige databaser
- ingen lagring af økonomiske konti detaljer
- lav følsomhed og lav intelligens værdier af dataene behandlet
- teknisk værktøjer til udøvelse af alle data emne rettigheder

giver tilstrækkelig supplerende tiltag for at sikre at den overførte data modtager beskyttelsesniveau væsentlig ensbetydende med det garanteret inden Storbritannien/EEA.

## 5. gennemgå skema

Denne vurdering vil blive gennemgået årligt eller når der er materiel ændring til data behandling, under-processualer eller juridisk framework styrer internationale data overføringer.
