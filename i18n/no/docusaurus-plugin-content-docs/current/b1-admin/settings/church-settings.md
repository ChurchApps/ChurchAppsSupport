---
title: "Kirkeinnstillinger"
---

# Kirkeinnstillinger

<div class="article-intro">

Siden for Kirkeinnstillinger er hvor du konfigurerer kirkens grunnleggende informasjon, kontaktdetaljer og merkevarebygging. Disse detaljene brukes på tvers av alle ChurchApps-verktøy, inkludert B1.church-nettstedet ditt og B1 Mobile-appen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen "Rediger kirkeinnstillinger". Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktinformasjon og logo klar

</div>

## Redigering av kirkeinformasjon

1. I B1 Admin åpner du **seksjonmenyen** i øvre venstre hjørne (seksjonsnavn med liten pil) og velger **Innstillinger**.
2. Åpne seksjonen **Kirkeinformasjon** og klikk på redigeringsikonet (blyant).
3. Oppdater noen av følgende felt:
   - **Kirkenavn** -- Navn som vises på tvers av alle ChurchApps-produkter.
   - **Adresse** -- Kirkens fysiske adresse.
   - **Kontaktinformasjon** -- Telefonnummer, e-post og andre kontaktdetaljer.
4. Klikk **Lagre** for å bruke endringene.

## Konfigurering av underdomene

Kirken din får et gratis underdomene på **yourchurch.1.church**. Dette er nettadressen der medlemmer og besøkende kan få tilgang til kirkens nettilstedeværelse.

1. På siden Innstillinger finner du **Underdomene**-feltet.
2. Skriv inn det foretrukne underdomenet (for eksempel, "gracechurch" for gracechurch.1.church).
3. Lagre endringene.

:::info
Underdomenet ditt må være unikt på tvers av alle ChurchApps-kirker. Hvis det foretrukne navnet er tatt, prøv å legge til byen eller staten din (for eksempel, "gracechurch-dallas").
:::

Hvis du vil at besøkende skal nå nettstedet ditt på ditt eget domene (for eksempel, **www.gracechurch.org**), se [Egendefinert domene](./custom-domain.md).

## Konfigurering av merkevarebygging

Tilpass hvordan kirken din vises på tvers av alle ChurchApps-verktøy:

1. Last opp **kirkelogoen** din ved å klikke på logoområdet og velge en bildefil.
2. Legg til eventuelle ekstra **kirkebilleder** som brukes på nettstedet ditt og [mobilappen](./mobile-app.md).

:::tip
For beste resultat, bruk en logo med transparent bakgrunn i PNG-format. Dette sikrer at det ser bra ut på både lyse og mørke bakgrunner.
:::

## Første dag i uka

Velg hvilken dag kalendarene dine skal starte. Rullegardinmenyen **Første dag i uka** i seksjonen Kirkeinformasjon har som standard **Søndag**, men kan settes til en hvilken som helst dag. Når det er endret, blir det respektert på tvers av kalendarrutenett i B1 Admin og B1.church-medlemsportalen -- gruppkalendere, kuraterte kalendere og hendelsesredigering legger alle ut uker som starter på den dagen du velger.

## Fillagring

Som standard bruker filene du laster opp til nettstedet (gjennom [Filer](../website/files.md)) og andre innholdsområder B1s gratis vertslagte lagring, opptil 100MB. Hvis du trenger mer plass, kan du i stedet koble til din egen skystoraging -- nye opplastinger går deretter rett til kontoen din uten plattformgrense.

1. På siden Innstillinger finner du **Fillagring**-kortet og klikker for å redigere det.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive**, eller en **S3-kompatibel bøtte** (AWS S3, Cloudflare R2, Backblaze B2, osv.).
3. For Google Drive, Dropbox eller OneDrive klikker du på **Koble til** og logger inn for å autorisere tilgang. For en S3-kompatibel bøtte oppgir du tilgangsnøkkel, hemmelighet, bøttenavn og offentlig URL-base.
4. Klikk **Lagre**.

:::info
Dette påvirker bare nye opplastinger til nettstedets filer dine og lignende innholdsområder. Galleribilleder, miniatyrbilder, logoer og personfotos blir alltid værende på B1s standardlagring.
:::

## Klassefremmelse

Hvis du sporer **Klasse** på barn og elever, kan B1 automatisk forflytte alle opp en klasse på en dato du velger (for eksempel 1. august) i stedet for å kreve at du redigerer hver profil for hånd.

1. På siden Innstillinger finner du alternativet **Klassefremmelse**.
2. Slå det på og velg **måned og dag** for å fremme klasser hvert år.
3. Lagre endringene.

## Import og eksport

Knappen **Import/Eksport** i Innstillinger-overskriften åpner et dedikert verktøy i et nytt nettleservindu. Bruk dette til å:

- Importere medlemsdata fra et annet kirkestyrelsessystem.
- Eksportere ChurchApps-dataene dine for sikkerhetskopi eller migreringshensikter.

Dette er spesielt nyttig når du først setter opp kirken og må overføre eksisterende poster til ChurchApps.

:::warning
Når du importerer data, sikrer du alltid at du har sikkerhetskopi av de eksisterende postene først. Importoperasjoner legger data til systemet ditt og kan opprette duplikater hvis de kjøres flere ganger.
:::
