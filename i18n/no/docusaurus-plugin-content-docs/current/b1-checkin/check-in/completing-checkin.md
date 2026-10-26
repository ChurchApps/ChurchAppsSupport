---
title: "Fullføre innsjekking"
---

# Fullføre innsjekking

<div class="article-intro">

Når du har gått gjennom husstanden din og gjort eventuelle nødvendige gruppetilordninger, er du klar til å fullføre innsjekkingen. Dette er det siste trinnet i arbeidsflyten på kiosken -- appen sender inn oppmøtet, skriver ut etiketter og tilbakestilles for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gå gjennom husstanden din](./household-review) på skjermbildet for gjennomgang av husstanden
- [Tilordne grupper](./group-assignment) til familiemedlemmer som skal sjekkes inn i en bestemt klasse eller et bestemt program
- Eventuelt [legg til gjester](./adding-guests) som besøker sammen med familien din

</div>

## Slik sjekker du inn

1. Fra **skjermbildet for gjennomgang av husstanden** trykker du på knappen **Innsjekking** nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser et **suksessbilde** med en grønn hake og en velkomsthilsen.

Det er alt du trenger å gjøre. Familiens oppmøte er registrert.

## Fulle rom og bemanningsforhold

Hvis menigheten din har konfigurert [sikkerhetsgrenser](../../b1-admin/attendance/checkin-safety) for rommene sine, sjekker serveren dem før lagring:

- Hvis et valgt rom er **fullt eller stengt**, går ikke innsjekkingen gjennom, og appen navngir rommet slik at du kan velge et annet.
- Hvis gudstjenestetiden har en [innsjekkingsplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) og innsjekkingsvinduet ikke er åpent akkurat nå, blir innsjekking til rommene for den gudstjenestetiden også avvist. Skjermbildet **Kan ikke sjekke inn ennå** viser rommet med begrunnelsen «innsjekking er ikke åpen akkurat nå»; trykk på **Endre rom** for å velge en annen gudstjenestetid eller gruppe. (Gudstjenestetider som allerede er stengt, vises som **Stengt** på [husstandsskjermbildet](./household-review) og kan ikke velges, så du vil vanligvis bare se dette hvis et vindu lukkes midt i en innsjekking.)
- En husstand som sjekket inn til en tidligere gudstjenestetid, kan komme tilbake senere og legge til en åpen gudstjenestetid, selv etter at det tidligere vinduet er lukket. Deres eksisterende innsjekkinger beholdes og fører ikke til at den nye innsjekkingen avvises.
- Hvis et barnerom har **for få frivillige** i forhold til kravet, viser appen enten en advarsel som en ansatt kan bekrefte for å fortsette, eller blokkerer innsjekkingen helt -- avhengig av hvordan menigheten din har konfigurert håndhevelsen av bemanningsforholdet.

## Etikettutskrift

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekking:

- **Navneetiketter** skrives ut for hver person som er tilordnet en gruppe der innstillingen **Skriv ut navneskilt** er slått på. Navneetiketter inneholder personens navn, gruppetilordningen og eventuell informasjon om allergier eller merknader som er registrert.
- **Lapper for henting av barn** skrives ut når en innsjekket person er i en gruppe der innstillingen **Henting av barn** er slått på. Personer som er innsjekket som **Frivillig**, hoppes over, slik at en barnepasser som tjenestegjør i et rom for henting av barn ikke får en henteseddel. Henteseddelen lister barna, gruppetilordningene deres og en unik **sikkerhetskode på 4 tegn**.

:::info
Den samme sikkerhetskoden vises på både barnets navneetikett og foreldrenes henteseddel. Ved henting matcher frivillige kodene for å bekrefte at riktig voksen henter hvert barn.
:::

Sikkerhetskoden genereres på nytt for hver innsjekking og bruker bare konsonanter og sifre (vokaler utelates for å unngå at det dannes upassende ord).

:::warning
Hvis etiketter ikke skrives ut, åpner du administratorinnstillingene ved å trykke på **menighetens logo** sju ganger, og deretter trykker du på **Endre skriver** for å bekrefte tilkoblingen til skriveren. Se [Oppsett av skriver](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva skjer etter innsjekking

- Hvis en skriver er konfigurert, skriver appen ut alle etikettene og går deretter automatisk tilbake til **oppslagsskjermbildet**, klar for neste familie.
- Hvis ingen skriver er konfigurert, går appen også automatisk tilbake til **oppslagsskjermbildet**.

Uansett vises suksessbildet i minst 6 sekunder fra det vises (8 sekunder når det feirer at noen har nådd en oppmøtemilepæl), slik at familiene kan se at innsjekkingen var vellykket. Hvis utskriften tar lengre tid enn dette, går appen tilbake omtrent halvannet sekund etter at utskriften er ferdig.

Du trenger ikke å trykke på noe for å komme tilbake til oppslagsskjermbildet -- appen håndterer overgangen automatisk. Når skjermbildet har vært oppe en stund, kan du trykke på det for å gå tilbake med en gang; et trykk i de første halvannet sekundene ignoreres, slik at et raskt dobbeltrykk på **Innsjekking** ikke hopper over det.

:::tip
Appen tilbakestilles fullstendig etter hver innsjekking, så det er ingen risiko for at én familie ser en annen familie sin informasjon.
:::

## Hva som registreres

Når du trykker på **Innsjekking**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetilordning:

- Den **personen** som sjekkes inn
- **Gudstjenesten** de deltar på
- **Gudstjenestetiden** og **gruppen** de er tilordnet

Disse dataene vises i B1 Admin under delen Oppmøte, der menighetens administratorer kan se og administrere oppmøteregistreringene. Se [veiledningen for administrasjon av innsjekking](../../b1-admin/attendance/check-in.md) for detaljer.
