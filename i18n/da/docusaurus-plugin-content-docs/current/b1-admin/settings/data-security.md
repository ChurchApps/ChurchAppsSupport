---
title: "datasikkerhed"
---

# datasikkerhed

<div class="article-intro">

Mens der er ingen sådan ting som et perfekt sikkert system, ChurchApps tager datasikkerhed alvorligt. Denne side forklarer tiltag taget for at beskytte alle data anført ind i B1.church Admin og andre ChurchApps produkter.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Gennemgå denne side for at forstå hvordan dit kirkes data er beskyttet
- opsæt [roller og tilladelser](./roles-permissions.md) for at styre hvem der kan få adgang til sensitiv information
- bliv bekendt med [privatlivspolitik](https://churchapps.org/privacy)

</div>

## begrænsning af sensitiv data lagret

Vores første tilgang er at ikke lagring af nogen mere sensitiv data som påkrævet. Dette betyder aldrig lagring af nogen kreditkort eller bankrød detaljer brugt til at gøre donationer. Når en bruger gør en donation ved hjælp af B1.church Admin eller B1, kreditkort data er aldrig sendt til nogen af vores servere, kun din betaling gateway (stripe). Dette betyder i tilfælde af en data brud, ingen kreditkort eller bank info ville være kompromitteret.

Vi lagrer også aldrig adgangskoder i vores system. Alle adgangskoder behandles gennem en enveis hashing algoritme i hvilken nogle af dataene er ødelagt, gør det umuligt for nogen at hente adgangskoder fra databasen, selvom os. For at verificere adgangskoder, den anførte værdi skal pass gennem den samme enveis hash og producere det samme resultat.

Efter fjernelse af disse to kilder den eneste sensitiv data som forbliver er en liste af navne og kontakt info.

:::tip
Fordi ChurchApps aldrig lagrer kreditkort eller bankdata, selvom et værste tilfælde data brud ville ikke afsløre økonomiske konto detaljer. kun navne og kontakt information ville være i risiko.
:::

## bruger standard bedste praksis

vi bruger industri standard bedste praksis til sikkerhed, inkluderet krypterer alle data transit til og fra vores servere ved hjælp af HTTPS. Alle servere er værtet i en sikker fysisk datacenter med Amazon web services. Alle database servere er lagret bag en brandmur og er utilgængelig fra internettet.

## data segregering

data er adskilt ind i forskellige databaser baseret på omfang. Hver af vores API'er (medlemskab, givning, tilstedeværelse, messaging, gør og lektioner) er uafhængig siloer af data med deres egne databaser. Hvis en af dem er kompromitteret, brugeligt af dataene er begrænset uden andre også bliver kompromitteret. For eksempel hvis givning API/database var at blive kompromitteret, en dårlig handling kunne muligt få adgang til en liste af donationer og datoer (men aldrig kort/bank data). Men de ville ikke have adgang til hvilke brugere gjorde donationer eller hvilke kirker de var til da dataene er lagret i den separate medlemskab database.

:::info
data segregering betyder at kompromittere et system ikke giver adgang til alle kirke data. Hver API virker uafhængigt med sin egen database, begrænsning påvirkning af nogen potentiel brud.
:::

## begrænset adgang

adgang til produktions servere er strengt begrænset til server administratorer som kræver adgang. Dette er for tiden to personer som er også medlemmer af bestyrelsesrådet. udvikler, frivillige og anden bestyrelsesmedlemmer er ikke tilladt adgang til produktions servere.

## privatlivspolitik

Dit data er dine og vil aldrig blive solgt til tredje parter. Du kan læse vores fulde privatlivspolitik [her](https://churchapps.org/privacy).

## GDPR compliace

ChurchApps understøtter GDPR compliace til kirker med medlemmer i Storbritannien eller Europæisk union. Her hvordan vi håndtere nøgle krav:

### data emne rettigheder

ChurchApps giver værktøjer for at hjælpe kirker svare til data emne anmodninger:

- **ret til adgang (artikel 15)** — medlemmer kan anmodning en kopi af deres personlig data ved at kontakte deres kirke. administratorer kan eksport ethvert persons data fra **data administration** sektion på person detalje siden i B1.church Admin.
- **ret til sletning (artikel 17)** — medlemmer kan anmodning konto sletning ved at kontakte deres kirke. administratorer kan anonymiserer en persons data på tværs af alle moduler fra **data administration** sektion på person detalje siden. anonymisering erstattes personlig information med generisk værdier mens vedligeholde sammenlignende registreringer (donation totaler, tilstedeværelse antal) behov til kirke økonomisk rapportering.
- **ret til begrænsning (artikel 18)** — medlemmer kan anmodning begrænsning af behandling ved at kontakte deres kirke, inkluderet opt ud af kommunikation.
- **ret til data transportabilitet (artikel 20)** — administratorer kan eksport personlig data i struktureret, maskine-læselig JSON format på vegne af medlemmer som anmodning den.

### brug af data administrations værktøjer

For at få adgang til GDPR data værktøjer til en person:

1. Gå til **folk** i B1 Admin og åbn persons registrering.
2. Klik **rediger** for at gå ind rediger tilstand.
3. rul ned til **data administration** sektion (kollapset som standard) og klik for at udvide den.
4. Brug **eksport data** for at download en JSON fil af alle data lagret til den person.
5. Brug **anonymiserer** for at erstatte personlig information med generisk værdier. Du vil blive bedt om at skrive `ANONYMIZE` for at bekræfte -- denne handling kan ikke fortrylles.

:::warning
anonymisering er permanent. donation totaler og tilstedeværelse antal blive bevaret til økonomisk rapportering formål, men alle personlig identifikatorer (navn, e-mail, adresse osv.) fjernes og kan ikke gendannes.
:::

### data behandling

ChurchApps virker som **data processor** på vegne af dit kirke (den **data controller**). Vores [data behandling aftale](https://churchapps.org/terms) skitserer ansvar for hver part, inkluderet under-processor bruger, brud meddelelse procedurer og data håndtering på opsigelse.

### international data overføringer

ChurchApps data er værtet på Amazon web services (AWS) i Forenede stater. internationale data overføringer fra Storbritannien/EU er dækket af AWS's standard kontraktual klausuler (SCCs) under [AWS data behandling tillæg](https://aws.amazon.com/compliance/data-processing-addendum/). AWS DPA er automatisk indarbejdet ind i AWS service vilkår til alle kunder. EU-baseret hosting er ikke påkrævet når passende overføring mekanismer som SCCs er på plads.

til detaljer hvordan overføring risiko har været vurderet, se [overføring risiko vurdering](./transfer-risk-assessment.md).

### under-processualer

- **Amazon web services (AWS)** — infrastruktur hosting, data lagring og indhold levering
- **stripe** — betaling behandling til donationer (ikke kort data lagres af ChurchApps)

:::info
til fulde detaljer hvordan vi håndtere personlig data, se vores [privatlivspolitik](https://churchapps.org/privacy) og [servicebetingelser](https://churchapps.org/terms). Hvis du har spørgsmål omkring GDPR compliace, kontakt os på support@churchapps.org.
:::
