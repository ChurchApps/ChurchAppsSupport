---
title: "Fullføre innsjekkingen"
---

# Fullføre innsjekkingen

<div class="article-intro">

Når du har gått gjennom husstanden din og gjort eventuelle gruppetilordninger, er du klar til å fullføre innsjekkingen. Dette er siste steg i kioskarbeidsflyten. Appen sender oppmøtet, skriver ut etiketter og tilbakestiller seg for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gå gjennom husstanden din](./household-review) på skjermen for gjennomgang av husstanden
- [Tilordne grupper](./group-assignment) til familiemedlemmer som skal sjekke inn i en bestemt klasse eller et bestemt program
- Du kan eventuelt [legge til gjester](./adding-guests) som besøker sammen med familien din

</div>

## Slik sjekker du inn

1. Fra **skjermen for gjennomgang av husstanden** trykker du på knappen **Innsjekking** nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser en **suksessskjerm** med en grønn hake og en velkomstmelding.

Det er alt som skal til. Familiens oppmøte er registrert.

## Fulle rom og bemanningsforhold

Hvis menigheten din har satt [sikkerhetsgrenser](../../b1-admin/attendance/checkin-safety) for rommene sine, kontrollerer serveren dem før lagring:

- Hvis et valgt rom er **fullt eller stengt**, gjennomføres ikke innsjekkingen, og appen nevner rommet slik at du kan velge et annet.
- Hvis gudstjenestetiden har en [innsjekkingsplan](../../b1-admin/attendance/setup#setting-a-check-in-schedule) og innsjekkingsvinduet ikke er åpent akkurat nå, avvises også innsjekking til rommene for den gudstjenestetiden. Skjermen **Kan ikke sjekke inn ennå** viser rommet med årsaken "innsjekking er ikke åpen akkurat nå". Trykk på **Endre rom** for å velge en annen gudstjenestetid eller gruppe. (Gudstjenestetider som allerede er stengt når du [velger en gudstjeneste](./selecting-service#when-check-in-isnt-open), er skjult, så du ser vanligvis dette bare hvis et vindu stenger midt i en innsjekking.)
- Hvis et barnerom har **for få frivillige** i forhold til bemanningskravet, viser appen enten en advarsel som en ansatt kan bekrefte for å fortsette, eller blokkerer innsjekkingen helt. Dette avhenger av hvordan menigheten din har satt opp håndhevingen av bemanningsforholdet.

## Etikettutskrift

Hvis en nettverksskriver er satt opp, skriver appen automatisk ut etiketter etter innsjekking:

- **Navnelapper** skrives ut for hver person som er tilordnet en gruppe der innstillingen **Skriv ut navnelapp** er slått på. Navnelapper inneholder personens navn, gruppetilordningen og eventuell allergi- eller merknadsinformasjon som er registrert.
- **Hentelapper for foresatte** skrives ut når en innsjekket person er i en gruppe der innstillingen **Henting av foresatte** er slått på. Personer som er innsjekket som **frivillig**, hoppes over, slik at en barnepasser som tjenestegjør i et rom for henting av foresatte, ikke får en hentelapp. Hentelappen lister opp barna, gruppetilordningene deres og en unik **sikkerhetskode på 4 tegn**.

:::info
Den samme sikkerhetskoden står både på barnets navnelapp og på forelderens hentelapp. Ved henting bruker frivillige kodene til å kontrollere at riktig voksen henter hvert barn.
:::

Sikkerhetskoden genereres på nytt for hver innsjekking og bruker bare konsonanter og siffer. Vokaler er utelatt for å unngå at det dannes upassende ord.

:::warning
Hvis etikettene ikke skrives ut, åpner du administratorinnstillingene ved å trykke på **menighetslogoen** sju ganger, og deretter trykker du på **Endre skriver** for å kontrollere tilkoblingen til skriveren. Se [Oppsett av skriver](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva som skjer etter innsjekking

- Hvis en skriver er satt opp, skriver appen ut alle etikettene og går deretter automatisk tilbake til **oppslagsskjermen**, klar for neste familie.
- Hvis ingen skriver er satt opp, vises suksessskjermen i noen få sekunder, og deretter går den automatisk tilbake til **oppslagsskjermen**.

Du trenger ikke å trykke på noe for å komme tilbake til oppslagsskjermen. Appen håndterer overgangen automatisk.

:::tip
Appen tilbakestilles fullstendig etter hver innsjekking, så det er ingen risiko for at én familie ser en annen families informasjon.
:::

## Hva som registreres

Når du trykker på **Innsjekking**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetilordning:

- **personen** som sjekkes inn
- **gudstjenesten** de deltar på
- **gudstjenestetiden** og **gruppen** de er tilordnet

Disse dataene vises i B1 Admin under delen Oppmøte, der menighetsadministratorene kan se og administrere oppmøteregistreringene. Se [veiledningen for administrasjon av innsjekking](../../b1-admin/attendance/check-in.md) for detaljer.
