---
title: "Afslutte innsjekking"
description: "Fullfør en familiers innsjekking på kiosken i B1 Checkin, inkludert romgrenser, utskrift av etiketter, hentesikkerhetskoder og hva appen gjør videre."
---

# Afslutte innsjekking

<div class="article-intro">

Når du har gjennomgått husstanden din og gjort nødvendige gruppetildelinger, er du klar til å fullføre innsjekkingen. Dette er siste steg i arbeidsflyten på kiosken -- appen sender inn oppmøtet, skriver ut etiketter og tilbakestiller seg for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gå gjennom husstanden din](./household-review.md) på skjermbildet for gjennomgang av husstanden
- [Tildel grupper](./group-assignment.md) til familiemedlemmer som skal sjekke inn i en bestemt klasse eller et bestemt program
- Legg eventuelt [til gjester](./adding-guests.md) som besøker familien din

</div>

## Slik sjekker du inn

1. Fra **skjermbildet for gjennomgang av husstanden** trykker du på knappen **Innsjekking** nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser et **suksessskjermbilde** med en grønn hake og en velkomsthilsen.

Det er alt som skal til. Familiens oppmøte er nå registrert.

Hvis noen du har valgt, allerede har sjekket inn for denne gudstjenesten i dag, vises først et vindu med **Allerede innsjekket**, som nevner dem. Trykk på **Sjekk inn igjen** for å lagre de nye gruppevalgene deres, eller på **Avbryt** for å gå tilbake til husstandsskjermbildet.

## Fulle rom og bemanningsforhold

Hvis menigheten din har konfigurert [sikkerhetsgrenser](../../b1-admin/attendance/checkin-safety.md) for rommene sine, kontrollerer serveren dem før lagring:

- Hvis et valgt rom er **fullt eller stengt**, gjennomføres ikke innsjekkingen, og appen nevner rommet slik at du kan velge et annet.
- Hvis gudstjenestetidspunktet har en [innsjekkingsplan](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) og innsjekkingsvinduet ikke er åpent akkurat nå, avvises også innsjekking til rommene for dette gudstjenestetidspunktet. Skjermbildet **Kan ikke sjekke inn ennå** viser rommet med årsaken «innsjekking er ikke åpen akkurat nå». Trykk på **Endre rom** for å velge et annet gudstjenestetidspunkt eller en annen gruppe. (Gudstjenestetidspunkter som allerede er stengt, vises som **Stengt** på [husstandsskjermbildet](./household-review.md) og kan ikke velges, så du vil vanligvis bare se dette hvis et vindu stenger midt under en innsjekking.)
- En husstand som har sjekket inn for et tidligere gudstjenestetidspunkt, kan komme tilbake senere og legge til et åpent gudstjenestetidspunkt, selv etter at det tidligere vinduet er stengt. Eksisterende innsjekkinger beholdes, og de fører ikke til at den nye innsjekkingen avvises.
- Hvis et barnerom mangler frivillige i forhold til bemanningskravet, viser appen enten en advarsel som en ansatt kan bekrefte for å fortsette, eller blokkerer innsjekkingen helt -- avhengig av hvordan menigheten din har konfigurert håndhevingen av bemanningsforholdet.

## Utskrift av etiketter

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekking:

- **Navneetiketter** skrives ut for hver person som er tildelt en gruppe der innstillingen **Skriv ut navneskilt** er aktivert. Navneetiketter inneholder personens navn, gruppetildelingen og eventuell allergi- eller merknadsinformasjon som er registrert.
- **Hentelapper for foreldre** skrives ut når en innsjekket person er i en gruppe der innstillingen **Henting av foreldre** er aktivert. Personer som er innsjekket som **frivillig**, hoppes over, så en barnepasser som tjenestegjør i et rom med henting av foreldre, får ikke en hentelapp. Hentelappen viser barna, gruppetildelingene deres og en unik **sikkerhetskode på 4 tegn**.

:::info
Den samme sikkerhetskoden vises både på barnets navneetikett og på forelderens hentelapp. Ved henting bruker frivillige kodene til å kontrollere at riktig voksen henter hvert barn.
:::

Sikkerhetskoden genereres på nytt for hver innsjekking og består kun av konsonanter og siffer (vokaler er utelatt for å unngå at det dannes upassende ord).

:::warning
Hvis etikettene ikke skrives ut, åpner du administratorinnstillingene ved å trykke på **menighetslogoen** sju ganger, og trykker deretter på **Bytt skriver** for å kontrollere tilkoblingen til skriveren. Se [Oppsett av skriver](../getting-started/printer-setup.md) for feilsøkingstrinn.
:::

## Hva skjer etter innsjekking

- Hvis en skriver er konfigurert, skriver appen ut alle etiketter og går deretter automatisk tilbake til **oppslagsskjermbildet**, klar for neste familie.
- Hvis ingen skriver er konfigurert, går appen også automatisk tilbake til **oppslagsskjermbildet**.

Uansett vises suksessskjermbildet i minst 6 sekunder fra det vises (8 sekunder når det markerer at noen har nådd en milepæl for oppmøte), slik at familiene kan se at innsjekkingen fungerte. Hvis utskriften tar lengre tid enn dette, går appen tilbake omtrent halvannet sekund etter at utskriften er ferdig.

Du trenger ikke å trykke på noe for å komme tilbake til oppslagsskjermbildet -- appen håndterer overgangen automatisk. Når skjermbildet har vært oppe en liten stund, kan du trykke på det for å gå tilbake med en gang. Et trykk i løpet av de første halvannet sekundene ignoreres, slik at et raskt dobbelttrykk på **Innsjekking** ikke hopper over det.

:::tip
Appen tilbakestilles fullstendig etter hver innsjekking, så det er ingen risiko for at én familie ser en annen families informasjon.
:::

## Hva som registreres

Når du trykker på **Innsjekking**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetildeling:

- **personen** som sjekkes inn
- **tjenesten** vedkommende deltar i
- **gudstjenestetidspunktet** og **gruppen** de er tildelt

Disse dataene vises i B1 Admin under oppmøteseksjonen, der menighetsadministratorene kan se og administrere oppmøteregistreringene. Se [veiledningen for innsjekkingsadministrasjon](../../b1-admin/attendance/check-in.md) for detaljer.
