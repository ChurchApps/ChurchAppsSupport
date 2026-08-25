---
title: "Kirkestillinger"
---

# Kirkestillinger

<div class="article-intro">

Church Settings-siden er hvor du konfigurerer grunnleggende kirkeinformasjon, kontaktdetaljer og merkevaregivning. Disse detaljer brukes på tvers av alle ChurchApps-verktøy, inkludert B1.church-nettstedet og B1 Mobile-appen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger "Edit Church Settings"-tillatelse. Se [Roles & Permissions](./roles-permissions.md) hvis du ikke har tilgang.
- Ha kirkens adresse, kontaktinformasjon og logo klar

</div>

## Redigering av kirkeinformasjonen

1. I B1 Admin åpner du **seksjonsmenyen** i øvre venstre hjørne og velger **Settings**.
2. Klikk **Edit Settings**-knappen i hovudet.
3. Oppdater noen av følgende felt:
   - **Church Name** -- Navnet som vises på tvers av alle ChurchApps-produkter.
   - **Address** -- Kirkens fysiske adresse.
   - **Contact Information** -- Telefonnummer, e-post og andre kontaktdetaljer.
4. Klikk **Save** for å bruke endringene.

## Oppsett av domenet ditt

Kirken din får et gratis domene ved **yourchurch.b1.church**. Dette er webadresse hvor medlemmer og besøkende kan få tilgang til kirkens online tilstedeværelse.

1. På Settings-siden, finn **Subdomain**-feltet.
2. Angi ønsket subdomene (for eksempel "gracechurch" for gracechurch.b1.church).
3. Lagre endringene.

:::info
Subdomenet ditt må være unikt på tvers av alle ChurchApps-kirker. Hvis det foretrukne navn er tatt, prøv å legge til by eller stat (for eksempel "gracechurch-dallas").
:::

## Konfigurering av merkevaregivning

Tilpass hvordan kirken din vises på tvers av alle ChurchApps-verktøy:

1. Last opp **church logo** ved å klikke logoområdet og velge bildefil.
2. Legg til eventuelle ekstra **church images** som brukes på nettstedet og [mobile app](./mobile-app.md).

:::tip
For beste resultater, bruk en logo med gjennomsiktig bakgrunn i PNG-format. Dette sikrer at den ser bra ut på både lys og mørk bakgrunn.
:::

## Fillagring

Som standard bruker filer du laster opp på nettstedet ditt (gjennom [Files](../website/files.md)) B1s gratis vertede lagring, opp til 100MB. Hvis du trenger mer plass, kan du koble ditt eget skylagring i stedet -- nye opplastinger goes direkte til kontoen din med ingen plattformgrense.

1. På Settings-siden, finn **File Storage**-kortet og klikk for å redigere.
2. Velg en leverandør: **Google Drive**, **Dropbox**, **OneDrive**, eller en **S3-kompatibel bøtte** (AWS S3, Cloudflare R2, Backblaze B2, etc.).
3. For Google Drive, Dropbox eller OneDrive, klikk **Connect** og logg inn for å godkjenne tilgang.
4. Klikk **Save**.

## Klasse-promotering

Hvis du sporer **Grade** på barn og studenter, kan B1 automatisk bumpe alle opp en klasse på en dato du velger (for eksempel 1. august) i stedet for å kreve at du redigerer hver profil for hånd.

1. På Settings-siden, finn **Grade Promotion**-alternativet.
2. Slå det på og velg **måned og dag** for å promotere karakter hvert år.
3. Lagre endringene.

## Import og eksport

**Import/Export**-knappen i Settings-hovudet åpner et dedikert verktøy i et nytt nettleservindu. Bruk dette for å:

- Importere medlemsdata fra en annen kirkestyringsystem.
- Eksporter ChurchApps-dataene dine for sikkerhetskopi eller migrasjonsformål.

:::warning
Når du importerer data, sikkerhetskopier alltid eksisterende oppføringer først. Importoperasjoner legger data til systemet og kan opprette duplikatoppføringer hvis kjørt flere ganger.
:::

