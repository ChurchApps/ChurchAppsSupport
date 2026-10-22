---
title: "Fullføre innsjekken"
---

# Fullføre innsjekken {#completing-check-in}

<div class="article-intro">

Når du har gått gjennom husstanden din og gjort eventuelle nødvendige gruppetildelinger, er du klar til å fullføre innsjekken. Dette er siste steg i kioskarbeidsflyten – appen sender oppmøtet, skriver ut etiketter og tilbakestilles for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gå gjennom husstanden din](./household-review) på skjermen for gjennomgang av husstanden
- [Tildel grupper](./group-assignment) til familiemedlemmer som skal sjekkes inn i en bestemt klasse eller et bestemt program
- Eventuelt [legg til gjester](./adding-guests) som besøker familien din

</div>

## Slik sjekker du inn {#how-to-check-in}

1. Trykk på knappen **Innsjekk** nederst på skjermen for gjennomgang av husstanden.
2. Appen sender oppmøtedataene til serveren og viser en **suksessskjerm** med en grønn hake og en velkomsthilsen.

Det er alt som skal til. Familiens oppmøte er registrert.

## Fulle rom og frivillighetsforhold {#full-rooms-and-volunteer-ratios}

Hvis kirken din har konfigurert [sikkerhetsgrenser](../../b1-admin/attendance/checkin-safety) for rommene sine, sjekker serveren dem før lagring:

- Hvis et valgt rom er **fullt eller stengt**, går ikke innsjekken gjennom, og appen nevner rommet slik at du kan velge et annet.
- Hvis gudstjenestetiden har en [innsjekkplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) og innsjekkvinduet ikke er åpent akkurat nå, nektes også innsjekk til rommene for den gudstjenestetiden. Skjermen **Kan ikke sjekke inn ennå** viser rommet med årsaken «innsjekk er ikke åpen akkurat nå»; trykk på **Endre rom** for å velge en annen gudstjenestetid eller gruppe. (Gudstjenestetider som allerede er stengt, vises som **Stengt** på [husstandsskjermen](./household-review) og kan ikke velges, så du ser vanligvis dette bare hvis et vindu lukkes midt i en innsjekk.)
- En husstand som har sjekket inn til en tidligere gudstjenestetid, kan komme tilbake senere og legge til en åpen gudstjenestetid, selv etter at det tidligere vinduet er stengt. Deres eksisterende innsjekk beholdes, og den forårsaker ikke at den nye innsjekken nektes.
- Hvis et barnerom har **for få frivillige** i forhold til kravet, viser appen enten en advarsel som en ansatt kan bekrefte for å fortsette, eller blokkerer innsjekken helt – avhengig av hvordan kirken din har konfigurert håndhevingen av forholdstall.

## Utskrift av etiketter {#label-printing}

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekk:

- **Navneetiketter** skrives ut for hver person som er tildelt en gruppe der innstillingen **Skriv ut navnelapp** er slått på. Navneetiketter inneholder personens navn, gruppetildelingen og eventuell informasjon om allergier eller merknader som finnes registrert.
- **Hentelapper for foreldre** skrives ut når en innsjekket person er i en gruppe der innstillingen **Henting av foreldre** er slått på. Personer som er innsjekket som **Frivillig**, hoppes over, slik at en barnepasser som tjenestegjør i et rom for henting av foreldre ikke får en hentelapp. Hentelappen lister opp barna, gruppetildelingene deres og en unik **sikkerhetskode på 4 tegn**.

:::info
Den samme sikkerhetskoden vises både på barnets navnetikett og på foreldrenes hentelapp. Ved henting sammenligner frivillige kodene for å bekrefte at riktig voksen henter hvert barn.
:::

Sikkerhetskoden lages på nytt for hver innsjekk og bruker bare konsonanter og sifre (vokaler utelates for å unngå at det dannes upassende ord).

:::warning
Hvis etiketter ikke skrives ut, åpner du admininnstillingene ved å trykke på **kirkelogoen** syv ganger, og deretter trykker du på **Bytt skriver** for å kontrollere tilkoblingen til skriveren. Se [Oppsett av skriver](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva skjer etter innsjekk {#what-happens-after-check-in}

- Hvis en skriver er konfigurert, skriver appen ut alle etikettene og går deretter automatisk tilbake til **oppslagsskjermen**, klar for neste familie.
- Hvis ingen skriver er konfigurert, vises suksessskjermen i noen sekunder, og deretter går appen automatisk tilbake til **oppslagsskjermen**.

Du trenger ikke å trykke på noe for å komme tilbake til oppslagsskjermen – appen håndterer overgangen automatisk.

:::tip
Appen tilbakestilles fullstendig etter hver innsjekk, så det er ingen risiko for at én familie ser en annen families informasjon.
:::

## Hva som blir registrert {#what-gets-recorded}

Når du trykker på **Innsjekk**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetildeling:

- **personen** som sjekkes inn
- **tjenesten** de deltar på
- **gudstjenestetiden** og **gruppen** de er tildelt

Disse dataene vises i B1 Admin under delen Oppmøte, der kirkens administratorer kan se og administrere oppmøteregistreringene. Se [veiledningen for innsjekk for administratorer](../../b1-admin/attendance/check-in.md) for detaljer.
