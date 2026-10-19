---
title: "Søke etter personer"
---

# Søke etter personer

<div class="article-intro">

Siden **Personer** viser kirkekatalogen din som en søkbar liste over husstander, eller som en sorterbar tabell med enkeltpersoner. Du kan raskt finne hvem som helst i menigheten, tilpasse hvilken informasjon som vises, og eksportere resultatene. Effektivt søk er avgjørende for den daglige administrasjonen i kirken, som å følge opp besøkende, lage kontaktlister og administrere medlemsposter.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Kirkekatalogen din bør ha personer i seg. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Husstander og tabellvisninger

Siden Personer viser katalogen din etter **husstand**, gruppert alfabetisk. Hver rad viser husstandens bilder, navnet (for eksempel «The Smith Family») og navnene på alle i den. Klikk på en husstand for å åpne hovedpersonens profil, eller klikk på et medlems navn for å åpne den personen. Et antall over listen viser hvor mange husstander og personer som vises.

Bruk bryteren **Vis som** over listen for å bytte mellom **Husstander** og **Tabell**. Visningen **Tabell** lister én person per rad, og det er der du kan sortere og velge kolonner (se nedenfor). B1 husker valget ditt på denne enheten.

Som standard laster siden den første delen av katalogen din. Hvis du har flere personer, klikker du **Vis alle medlemmer** under listen for å laste alle.

## Hurtigsøk

Boksen **Finn en husstand eller person** øverst på siden Personer lar deg finne medlemmer i sanntid:

1. Klikk på **søkefeltet** øverst på siden Personer.
2. Begynn å skrive et navn.
3. Resultatene filtreres automatisk mens du skriver (det er en kort forsinkelse på omtrent et halvt sekund, slik at søket ikke kjøres for hvert tastetrykk).
4. Listen under oppdateres og viser bare de treffene som passer.

Klikk **Tøm** (under søkefeltet) for å nullstille søket og vise hele katalogen din igjen.

:::tip
Du trenger ikke trykke Enter. Søket kjøres automatisk når du slutter å skrive.
:::

## Sortere resultater

I visningen **Tabell** listes personer etter etternavn, deretter fornavn. Du kan sortere katalogen på en annen måte ved å klikke på en kolonneoverskrift:

1. Klikk på en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk den samme overskriften igjen for å reversere sorteringsrekkefølgen.

Dette gjør det enkelt å finne personer alfabetisk, etter alder eller etter en annen synlig kolonne.

## Tilpasse kolonner

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Klikk på ikonet **Velg kolonner** i overskriften på siden Personer. (Kolonner gjelder for visningen **Tabell**.)
2. Kryss av eller fjern krysset for kolonner for å vise eller skjule dem. Tilgjengelige kolonner inkluderer:
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
3. Tabellen oppdateres umiddelbart for å vise valgene dine.

### Vise egendefinerte felt som kolonner {#showing-custom-fields-as-columns}

Kolonnevelgeren har to faner: **Standard** inneholder de innebygde kolonnene listet over, og **Egendefinert** inneholder kirkens [egendefinerte felt](../settings/custom-fields.md) sammen med spørsmålene fra eventuelle skjemaer for personer. Kryss av et egendefinert felt på fanen **Egendefinert** for å legge det til som kolonne, så vises hver persons verdi for det feltet i tabellen. Verdiene vises på samme måte som på personens profil — Ja/Nei-felt viser *Ja* eller *Nei*, felt med flervalg viser etiketten for alternativet, og datoer vises som korte datoer. Personer uten verdi for feltet får en tom celle.


## Eksportere søkeresultater

Du kan laste ned gjeldende søkeresultater som en CSV-fil når som helst:

1. Bruk de søkene eller filtrene du ønsker.
2. Klikk på knappen **Eksporter** i overskriften på siden Personer.
3. En CSV-fil lastes ned til datamaskinen din, klar til å åpnes i Excel, Google Sheets eller et annet regneark.

For mer informasjon om eksport, se [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer — for eksempel å finne alle som ikke har kommet de siste tre månedene — prøv funksjonen [AI-søk](./ai-search.md), som lar deg søke med spørsmål i vanlig språk.
:::

## Avansert søk {#advanced-search}

Avansert søk lar deg bygge presise filtre ved å kombinere betingelser. Åpne det ved å klikke **Avansert** under søkefeltet på siden Personer, utvid deretter en kategori og kryss av feltene du vil filtrere på, og velg en operator og verdi for hvert av dem. Kategoriene inkluderer **Navn**, **Demografi**, **Kontakt**, **Medlemskap**, **Aktivitet** (gaver og oppmøte) og **Egendefinerte felt**.

Kategorien **Egendefinerte felt** lister kirkens [egendefinerte felt](../settings/custom-fields.md) — feltene du definerer under Innstillinger for å spore din egen informasjon (for eksempel en utløpsdato for bakgrunnssjekk). Operatorene som tilbys samsvarer med hvert felts type: tekstfelt støtter *inneholder / er lik / starter med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og Ja/Nei- og flervalgsfelt lar deg velge en verdi. Ethvert felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister

Etter at du har kjørt et søk, vises knappen **Lagre som liste** i overskriften på siden Personer. Klikk på den for å lagre spørringen din under et navn og eventuelt en kategori, slik at du kan laste den igjen med én gang i fremtidige økter. Se [Lagrede lister](./lists.md) for fullstendige detaljer.
