---
title: "Søke etter personer"
---

# Søke etter personer

<div class="article-intro">

Siden **Personer** viser kirkekatalogen din som en søkbar liste over husstander, eller som en sorterbar tabell med enkeltpersoner. Du kan raskt finne alle i menigheten, tilpasse hvilken informasjon som vises, og eksportere resultatene. Effektivt søk er essensielt for den daglige administrasjonen i kirken, som å følge opp besøkende, forberede kontaktlister og administrere medlemsposter.

</div>

## Opplæringsvideo

<YouTube id="7Y-tN9RmnDQ" title="Søke etter personer og bygge lister i B1" next="Egendefinerte felt, massredigering og eksport i B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Kirkekatalogen din bør ha personer i seg. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Husstander og tabellvisninger

Siden Personer viser katalogen din etter **husstand**, gruppert alfabetisk. Hver rad viser husstandens bilder, navnet (for eksempel «Familien Hansen») og navnene på alle i den. Klikk på en husstand for å åpne overhodets profil, eller klikk på et medlems navn for å åpne den personen. Et antall over listen viser hvor mange husstander og personer som vises.

Bruk bryteren **Vis som** over listen for å bytte mellom **Husstander** og **Tabell**. Visningen **Tabell** lister én person per rad, og er der du kan sortere og velge kolonner (se nedenfor). B1 husker valget ditt på den enheten.

Som standard laster siden den første delen av katalogen din. Hvis du har flere personer, klikk **Vis alle medlemmer** under listen for å laste alle.

## Hurtigsøk

Boksen **Finn en husstand eller person** øverst på siden Personer lar deg finne medlemmer i sanntid:

1. Klikk på **søkeboksen** øverst på siden Personer.
2. Begynn å skrive et navn.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på rundt et halvt sekund, slik at søket ikke kjøres for hvert tastetrykk).
4. Listen nedenfor oppdateres og viser bare de matchende resultatene.

Klikk **Tøm** (under søkeboksen) for å nullstille søket og vise hele katalogen din igjen.

:::tip
Du trenger ikke trykke Enter. Søket kjøres automatisk etter at du slutter å skrive.
:::

## Sortere resultater

I visningen **Tabell** listes personene etter etternavn, deretter fornavn. Du kan sortere katalogen på en annen måte ved å klikke på en hvilken som helst kolonneoverskrift:

1. Klikk en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk den samme overskriften igjen for å reversere sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder, eller etter en annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Klikk ikonet **Velg kolonner** i sidehodet på Personer. (Kolonner gjelder for visningen **Tabell**.)
2. Kryss av eller av for kolonner for å vise eller skjule dem. Tilgjengelige kolonner inkluderer:
   - **Bilde**
   - **Navn**
   - **E-post**
   - **Telefon**
   - **Adresse**
   - **Fødselsdato**
   - **Alder**
   - **Kjønn**
   - **Medlemsstatus**
   - **Kampus**
   - **Dato lagt til** — når personens post ble opprettet
3. Tabellen oppdateres umiddelbart for å vise valgene dine. Klikk **Ferdig** for å lukke dialogen **Velg kolonner**.

### Vise egendefinerte felt som kolonner

Kolonnevelgeren har to faner: **Standard** inneholder de innebygde kolonnene som er listet over, og **Egendefinert** inneholder kirkens [egendefinerte felt](../settings/custom-fields.md) sammen med spørsmålene fra eventuelle skjemaer for personer. Kryss av et egendefinert felt på fanen **Egendefinert** for å legge det til som en kolonne, og hver persons verdi for det feltet vises i tabellen. Verdier vises på samme måte som på personens profil — Ja/Nei-felt viser *Ja* eller *Nei*, felt med flervalg viser etikettene til alternativet, og datoer vises som korte datoer. Personer uten verdi for feltet vises med en tom celle.

## Eksportere søkeresultater

Du kan laste ned gjeldende søkeresultater som en CSV-fil når som helst:

1. Bruk eventuelle søk eller filtre du ønsker.
2. Klikk knappen **Eksporter** i sidehodet på Personer.
3. En CSV-fil lastes ned til datamaskinen din, klar til å åpnes i Excel, Google Sheets eller et hvilket som helst regnearkprogram.

For flere detaljer om eksport, se [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer — for eksempel å finne alle som ikke har deltatt de siste tre månedene — prøv funksjonen [AI-søk](./ai-search.md), som lar deg søke med spørsmål på vanlig språk.
:::

## Avansert søk

Avansert søk lar deg bygge presise filtre ved å kombinere betingelser. Åpne det ved å klikke **Avansert** under søkeboksen på siden Personer, utvid deretter en kategori og kryss av feltene du vil filtrere på (du kan klikke på feltets navn eller avkryssingsboksen), og velg en operator og verdi for hvert felt. Kategorier inkluderer **Navn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (gaver og oppmøte) og **Egendefinerte felt**.

For å finne nye personer, åpne **Medlemskap** og kryss av **Dato lagt til**. Den starter på **i de siste N dagene** med 30 utfylt, slik at du finner alle som ble lagt til den siste måneden med ett klikk. Endre antall dager, eller bytt til *er lik / etter / før* for å velge en dato. **Fødselsdato** og **Jubileum** tilbyr også **i de siste N dagene**. Dato lagt til registreres bare for personer som er opprettet siden slutten av oktober 2026; personer som ble lagt til tidligere har ingen dato, så dette filteret finner dem ikke.

Kategorien **Egendefinerte felt** lister kirkens [egendefinerte felt](../settings/custom-fields.md) — feltene du definerer under Innstillinger for å spore din egen informasjon (for eksempel en utløpsdato for politiattest). Operatorene som tilbys samsvarer med hvert felts type: tekstfelt støtter *inneholder / er lik / starter med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og Ja/Nei- og flervalgsfelt lar deg velge en verdi. Ethvert felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises en knapp **Lagre som liste** i sidehodet på Personer. Klikk den for å lagre den gjeldende spørringen under et navn og eventuelt en kategori, slik at du kan laste den umiddelbart i fremtidige økter. Se [Lagrede lister](./lists.md) for fullstendige detaljer.
