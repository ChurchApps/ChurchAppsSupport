---
title: "Søke etter personer"
description: "Søk i B1 Admin-katalogen etter navn, sorter og velg kolonner i tabellvisningen, bygg filtre med Advanced Search, og eksporter treff til CSV."
---

# Søke etter personer

<div class="article-intro">

Siden **Personer** viser kirkekatalogen din som en søkbar liste over husstander, eller som en sorterbar tabell over enkeltpersoner. Du kan raskt finne hvem som helst i menigheten, tilpasse hvilken informasjon som vises, og eksportere resultatene. Effektivt søk er avgjørende for daglige administrative oppgaver i kirken, som oppfølging av besøkende, klargjøring av kontaktlister og administrasjon av medlemsposter.

</div>

## Opplæringsvideo

<YouTube id="7Y-tN9RmnDQ" title="Søke etter personer og bygge lister i B1" next="Egendefinerte felt, massredigering og eksport i B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Kirkekatalogen din bør ha personer i seg. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Husstander og tabellvisninger

Siden Personer viser katalogen din etter **husstand**, sortert alfabetisk. Hver rad viser husstandens bilder, navnet (for eksempel «Familien Hansen») og navnene på alle i den. Klikk på en husstand for å åpne hovedpersonens profil, eller klikk på et medlems navn for å åpne den personen. En teller over listen viser hvor mange husstander og personer som vises.

Bruk bryteren **Vis som** over listen for å bytte mellom **Husstander** og **Tabell**. Visningen **Tabell** lister én person per rad, og er der du kan sortere og velge kolonner (se nedenfor). B1 husker valget ditt på denne enheten.

I visningen **Tabell** vises hver persons medlemsstatus under navnet, og hver av de sju statusene har sin egen farge -- den samme som brukes på personens profil. Alle med husstandsrollen **Barn** viser også en merkelapp **Barn** ved siden av statusen. For å merke noen som barn, setter du rollen deres i [husstandspanelet](./adding-people.md#managing-households) på profilen deres.

Som standard laster siden den første delen av katalogen din. Hvis du har flere personer, klikker du **Vis alle medlemmer** under listen for å laste alle.

## Hurtigsøk

Søkeboksen **Finn en husstand eller person** øverst på siden Personer lar deg finne medlemmer i sanntid:

1. Klikk på **søkeboksen** øverst på siden Personer.
2. Begynn å skrive et navn.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent et halvt sekund, slik at søket ikke kjøres for hvert tastetrykk).
4. Listen under oppdateres og viser bare de treffende resultatene.

Klikk **Tøm** (under søkeboksen) for å nullstille søket og vise hele katalogen igjen.

:::tip
Du trenger ikke å trykke Enter. Søket kjøres automatisk etter at du har sluttet å skrive.
:::

## Sortere resultater

I visningen **Tabell** er personer oppført etter etternavn, deretter fornavn. Du kan sortere katalogen på en annen måte ved å klikke på en kolonneoverskrift:

1. Klikk en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk den samme overskriften igjen for å reversere sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder eller etter en annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Klikk ikonet **Velg kolonner** i sidehodet for Personer. (Kolonner gjelder for visningen **Tabell**.)
2. Kryss av eller fjern avkrysningen for kolonner for å vise eller skjule dem. Tilgjengelige kolonner inkluderer:
   - **Bilde**
   - **Navn**
   - **E-post**
   - **Telefon**
   - **Adresse**
   - **Fødselsdato**
   - **Alder**
   - **Kjønn**
   - **Medlemsstatus**
   - **Kirkested**
   - **Dato lagt til** -- når personens post ble opprettet
3. Tabellen oppdateres med en gang for å vise valgene dine. Klikk **Ferdig** for å lukke dialogen **Velg kolonner**.

### Vise egendefinerte felt som kolonner {#showing-custom-fields-as-columns}

Kolonnevelgeren har to faner: **Standard** inneholder de innebygde kolonnene som er listet opp over, og **Egendefinert** inneholder kirkens [egendefinerte felt](../settings/custom-fields.md) sammen med spørsmålene fra eventuelle skjemaer for personer. Kryss av for et egendefinert felt på fanen **Egendefinert** for å legge det til som kolonne, og hver persons verdi for det feltet vises i tabellen. Verdiene vises på samme måte som på personens profil -- Ja/Nei-felt viser *Ja* eller *Nei*, flervalgsfelt viser valgets etikett, og datoer vises i kort format. Personer uten verdi for feltet vises med en tom celle.

## Eksportere søkeresultater

Du kan laste ned de gjeldende søkeresultatene som en CSV-fil når som helst:

1. Bruk de søkene eller filtrene du ønsker.
2. Klikk knappen **Eksporter** i sidehodet for Personer.
3. En CSV-fil lastes ned til datamaskinen din, klar til å åpnes i Excel, Google Sheets eller et hvilket som helst regnearkprogram.

For mer om eksport, se [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer -- som å finne alle som ikke har kommet de siste tre månedene -- prøv funksjonen [KI-søk](./ai-search.md), som lar deg søke med spørsmål i vanlig språk.
:::

## Avansert søk {#advanced-search}

Avansert søk lar deg bygge presise filtre ved å kombinere betingelser. Åpne det ved å klikke **Avansert** under søkeboksen på siden Personer, utvid deretter en kategori og kryss av feltene du vil filtrere på (du kan klikke på feltets navn eller avkrysningsboksen), og velg en operator og verdi for hvert. Kategoriene inkluderer **Navn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (gaver og oppmøte) og **Egendefinerte felt**.

For å finne nye personer, åpne **Medlemskap** og kryss av for **Dato lagt til**. Den starter på **i løpet av de siste N dagene** med 30 utfylt, slik at du kan finne alle som er lagt til den siste måneden med ett klikk. Endre antall dager, eller bytt til *lik / etter / før* for å velge en dato. **Fødselsdato** og **Jubileum** tilbyr også **i løpet av de siste N dagene**. Dato lagt til registreres bare for personer som er opprettet siden slutten av oktober 2026; personer som er lagt til tidligere har ingen dato, så dette filteret finner dem ikke.

Kategorien **Egendefinerte felt** lister opp kirkens [egendefinerte felt](../settings/custom-fields.md) -- feltene du definerer i Innstillinger for å følge din egen informasjon (for eksempel en utløpsdato for bakgrunnssjekk). Operatorene som tilbys samsvarer med hvert felts type: tekstfelt støtter *inneholder / er lik / begynner med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og Ja/Nei- og flervalgsfelt lar deg velge en verdi. Ethvert felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises en knapp **Lagre som liste** i sidehodet for Personer. Klikk på den for å lagre gjeldende spørring under et navn og en eventuell kategori, slik at du kan laste den på nytt med en gang i fremtidige økter. Se [Lagrede lister](./lists.md) for fullstendige detaljer.
