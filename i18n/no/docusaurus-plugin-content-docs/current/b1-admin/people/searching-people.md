---
title: "Søke etter personer"
description: "Søk i personkatalogen din i B1 Admin på navn, sorter og velg kolonner i tabellvisningen, lag filtre med avansert søk, og eksporter treff til CSV."
---

# Søke etter personer

<div class="article-intro">

Siden **Personer** viser kirkekatalogen din som en søkbar liste over husstander, eller som en sorterbar tabell over enkeltpersoner. Du kan raskt finne hvem som helst i menigheten din, tilpasse hvilken informasjon som vises, og eksportere resultatene dine. Effektivt søk er avgjørende for daglig kirkeadministrasjon, som oppfølging av besøkende, klargjøring av kontaktlister og vedlikehold av medlemsposter.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="7Y-tN9RmnDQ" title="Søke etter personer og lage lister i B1" next="Egendefinerte felt, masseredigering og eksport i B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å se personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Kirkekatalogen din bør ha personer i seg. Hvis du ikke har lagt til noen ennå, se [Legge til personer](adding-people.md) eller [Importere data](importing-data.md).

</div>

## Husstands- og tabellvisninger {#households-and-table-views}

Siden Personer lister katalogen din etter **husstand**, gruppert alfabetisk. Hver rad viser husstandens bilder, navnet (for eksempel «Familien Hansen») og navnene til alle i den. Klikk på en husstand for å åpne profilen til husstandens hovedperson, eller klikk på navnet til et medlem for å åpne den personen. Et antall over listen viser hvor mange husstander og personer som vises.

Bruk bryteren **Vis som** over listen for å bytte mellom **Husstander** og **Tabell**. Visningen **Tabell** lister én person per rad, og det er her du kan sortere og velge kolonner (se nedenfor). B1 husker valget ditt på den enheten.

I visningen **Tabell** vises hver persons medlemsstatus under navnet. Hver av de sju statusene har sin egen farge, den samme som brukes på personens profil. Alle som har husstandsrollen **Barn**, viser også en merkelapp **Barn** ved siden av statusen. For å merke noen som barn, sett rollen deres i [husstandspanelet](./adding-people.md#managing-households) på profilen deres.

Som standard laster siden den første delen av katalogen din. Hvis du har flere personer, klikker du på **Vis alle medlemmer** under listen for å laste alle.

## Hurtigsøk {#quick-search}

Boksen **Finn en husstand eller person** øverst på siden Personer lar deg finne medlemmer i sanntid:

1. Klikk i **søkeboksen** øverst på siden Personer.
2. Begynn å skrive et navn.
3. Resultatene filtreres automatisk mens du skriver. Det er en kort forsinkelse på omtrent et halvt sekund, slik at søket ikke kjøres på hvert tastetrykk.
4. Listen under oppdateres og viser bare de treffende resultatene.

Klikk på **Tøm** (under søkeboksen) for å nullstille søket og vise hele katalogen din igjen.

:::tip
Du trenger ikke trykke Enter. Søket kjøres automatisk etter at du slutter å skrive.
:::

## Sortere resultater {#sorting-results}

I visningen **Tabell** listes personer etter etternavn, deretter fornavn. Du kan sortere katalogen på en annen måte ved å klikke på en hvilken som helst kolonneoverskrift:

1. Klikk på en **kolonneoverskrift** (for eksempel **Navn** eller **E-post**) for å sortere etter den kolonnen.
2. Klikk på samme overskrift igjen for å reversere sorteringsrekkefølgen.

Det første klikket sorterer kolonnen stigende (A til Å, yngst til eldst, tidligste dato først), og pilen ved siden av overskriften viser retningen. Personer uten verdi i den kolonnen listes alltid sist. Det gjør det enkelt å finne personer alfabetisk, etter alder eller etter en annen synlig kolonne. B1 husker sorteringen på den enheten, så tabellen forblir sortert på samme måte etter at du laster siden på nytt eller kommer tilbake senere.

## Tilpasse kolonner {#customizing-columns}

Ikke all informasjon trenger å være synlig samtidig. Du kan velge hvilke kolonner som vises i tabellen:

1. Klikk på ikonet **Velg kolonner** i sidetoppen på siden Personer. (Kolonner gjelder for visningen **Tabell**, så når du krysser av for en kolonne, bytter siden også til visningen **Tabell**.)
2. Kryss av eller fjern avkrysningen for kolonner for å vise eller skjule dem. Fanen **Standard** tilbyr:
   - **Bilde** og **Visningsnavn** (vises som standard)
   - **Etternavn**, **Fornavn** og **Mellomnavn**
   - **Adresse**, **By**, **Fylke/provins** og **Postnummer**
   - **Primær e-post** og **Primær telefon** (mobilnummeret, eller hjemme- eller arbeidsnummeret når det ikke finnes mobil)
   - **Fødselsdato**, **Bursdag (uten år)** og **Alder**
   - **Kjønn**, **Medlemsstatus**, **Kampus**, **Sivilstatus** og **Bryllupsdag**
   - **Merknader til navneskilt**
   - **Dato lagt til**: når personens post ble opprettet
   - **Slettealternativ**: legger til et slettikon på hver rad (tilbys bare hvis du kan redigere personer)
3. Tabellen oppdateres umiddelbart for å vise valgene dine. Klikk på **Ferdig** (eller **Lukk**) for å lukke dialogen **Velg kolonner**. B1 husker kolonnene dine på den enheten.

### Vise egendefinerte felt som kolonner {#showing-custom-fields-as-columns}

Kolonnevelgeren har to faner: **Standard** inneholder de innebygde kolonnene som er listet over, og **Egendefinert** inneholder kirkens [egendefinerte felt](../settings/custom-fields.md) sammen med spørsmålene fra eventuelle skjemaer for personer. Kryss av for et egendefinert felt på fanen **Egendefinert** for å legge det til som en kolonne, og hver persons verdi for det feltet vises i tabellen. Verdier vises på samme måte som på personens profil. Ja/nei-felt viser *Ja* eller *Nei*, flervalgsfelt viser etikettene til alternativene, og datoer vises som korte datoer. Personer uten verdi for feltet får en tom celle.


## Eksportere søkeresultater {#exporting-search-results}

Du kan laste ned de nåværende søkeresultatene dine som en CSV-fil når som helst:

1. Bruk de søkene eller filtrene du vil ha.
2. Klikk på knappen **Eksporter** i sidetoppen på siden Personer.
3. En CSV-fil lastes ned til datamaskinen din, klar til å åpnes i Excel, Google Sheets eller et hvilket som helst regnearkprogram.

For mer informasjon om eksport, se [Eksportere data](./exporting-data.md).

:::tip
For mer avanserte spørringer, som å finne alle som ikke har vært til stede de siste tre månedene, prøv funksjonen [AI-søk](./ai-search.md). Den lar deg søke med spørsmål på vanlig språk.
:::

## Avansert søk {#advanced-search}

Avansert søk lar deg lage presise filtre ved å kombinere betingelser. Åpne det ved å klikke på **Avansert** under søkeboksen på siden Personer. Utvid deretter en kategori og kryss av for feltene du vil filtrere på (du kan klikke på feltets navn eller på avkrysningsboksen), og velg en operator og en verdi for hvert felt. Kategoriene inkluderer **Navn**, **Demografi**, **Kontaktinformasjon**, **Medlemskap og grupper** (medlemsstatus, kampus, dato lagt til og gruppemedlemskap), **Aktivitet** (gaver og oppmøte) og **Egendefinerte felt**.

Det finnes ingen søkeknapp. Resultatene oppdateres automatisk omtrent et halvt sekund etter at du endrer et filter, og personer må treffe alle filtrene du har krysset av for. Filtrene du har slått på, vises som brikker over kategoriene. Klikk på **x** på en brikke for å fjerne det filteret, eller på **Tøm alle** for å fjerne alle. Klikk på **Avansert** igjen for å skjule panelet.

For å finne nye personer, åpne **Medlemskap og grupper** og kryss av for **Dato lagt til**. Den starter på **i de siste N dagene** med 30 fylt inn, slik at du kan finne alle som er lagt til den siste måneden med ett klikk. Endre antall dager, eller bytt til *er lik / etter / før* for å velge en dato. **Fødselsdato** og **Bryllupsdag** tilbyr også **i de siste N dagene**. Dato lagt til registreres bare for personer som er opprettet siden slutten av oktober 2026. Personer som ble lagt til tidligere, har ingen dato, så dette filteret finner dem ikke.

Kategorien **Egendefinerte felt** lister kirkens [egendefinerte felt](../settings/custom-fields.md), feltene du definerer i Innstillinger for å spore din egen informasjon (for eksempel en utløpsdato for bakgrunnssjekk). Operatorene som tilbys, samsvarer med hvert felts type. Tekstfelt støtter *inneholder / er lik / begynner med / slutter med*, tallfelt støtter sammenligningsoperatorene, datofelt støtter *er lik / etter / før*, og ja/nei- og flervalgsfelt lar deg velge en verdi. Ethvert felt du kan filtrere på her, kan lagres som en levende [liste](./lists.md).

## Lagre søk som lister {#saving-searches-as-lists}

Etter at du har kjørt et søk som gir minst én person, vises en knapp **Lagre som liste** i sidetoppen på siden Personer (for ansatte som kan redigere personer). Klikk på den for å lagre den nåværende spørringen under et navn og en valgfri kategori, slik at du kan laste den umiddelbart i fremtidige økter. Se [Lagrede lister](./lists.md) for alle detaljer.
