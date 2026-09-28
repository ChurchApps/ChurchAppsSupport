---
title: "Fullføring av innsjekking"
---

# Fullføring av innsjekking

<div class="article-intro">

Når du har gjennomgått husstanden din og gjort eventuelle nødvendige gruppetildelinger, er du klar til å fullføre innsjekkingen. Dette er det siste steget i kiosk-arbeidsflyten -- appen sender inn oppmøte, skriver ut etiketter og tilbakestilles for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gjennomgå husstanden din](./household-review) på husstandsgjennomgangsskjermen
- [Tildel grupper](./group-assignment) til eventuelle familiemedlemmer som trenger å sjekke inn på en bestemt klasse eller program
- Eventuelt [legg til gjester](./adding-guests) som besøker sammen med familien

</div>

## Slik sjekker du inn

1. Fra **husstandsgjennomgangsskjermen** trykker du på **Innsjekking**-knappen nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser en **vellykket skjerm** med et grønt hakemerke og en velkomstmelding.

Det er alt som skal til. Familiens oppmøte er registrert.

## Fulle rom og frivillige-forhold

Hvis kirken din har konfigurert [sikkerhetsgrenser](../../b1-admin/attendance/checkin-safety) på rommene sine, sjekker serveren dem før lagring:

- Hvis et valgt rom er **fullt eller lukket**, gjennomføres ikke innsjekkingen, og appen navngir rommet slik at du kan velge et annet.
- Hvis et barnerom er **kort på frivillige** for sitt forhold, viser appen enten en advarsel som en ansatt kan bekrefte for å fortsette, eller blokkerer innsjekkingen helt -- avhengig av hvordan kirken din har konfigurert håndhevelse av forhold.

## Etikettutskrift

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekking:

- **Navneetiketter** skrives ut for hver person som er tildelt en gruppe som har **Skriv ut navneskilt**-innstillingen aktivert. Navneetiketter inkluderer personens navn, gruppetildeling og allergi-/merknadsinformasjon hvis det fins på fil.
- **Hentelapper for foreldre** skrives ut når en innsjekket person er i en gruppe som har **Foreldrehenting**-innstillingen aktivert. Mennesker som sjekkes inn som **Frivillig** blir hoppet over, slik at en barnehagearbeider som tjener på et Foreldrehenting-rom ikke får en hentelapp. Hentelappen lister barna, deres gruppetildelinger og en unik **4-tegns sikkerhetskode**.

:::info
Den samme sikkerhetskoden vises både på barnets navneetikett og foreldernes hentelapp. Ved henting matcher frivillige kodene for å bekrefte at riktig voksen henter hvert barn.
:::

Sikkerhetskoden genereres ferskt for hver innsjekking og bruker bare konsonanter og tall (vokaler er utelatt for å unngå å danne upassende ord).

:::warning
Hvis etiketter ikke skrives ut, åpner du Admin-innstillinger ved å trykke på **kirkelogoen** sju ganger, og trykk deretter **Endre skriver** for å verifisere skriveroppkoblingen. Se [Skriveroppsett](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva som skjer etter innsjekking

- Hvis en skriver er konfigurert, skriver appen ut alle etiketter og returnerer deretter automatisk til **oppslags-skjermen**, klar for neste familie.
- Hvis ingen skriver er konfigurert, vises vellykket-skjermen i noen sekunder og returnerer deretter automatisk til **oppslags-skjermen**.

Du trenger ikke å trykke på noe for å komme tilbake til oppslags-skjermen -- appen håndterer overgangen automatisk.

:::tip
Appen tilbakestilles helt etter hver innsjekking, slik at det ikke er noen risiko for at en familie ser en annen families informasjon.
:::

## Hva som blir registrert

Når du trykker **Innsjekking**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetildeling:

- **Personen** som sjekkes inn
- **Tjenesten** de deltar på
- **Tjenestetiden** og **gruppen** de er tildelt

Disse dataene vises i B1 Admin under Oppmøte-seksjonen, der kirkens administratorer kan se og administrere oppmøteregistreringer. Se [administrasjonsveiledningen for innsjekking](../../b1-admin/attendance/check-in.md) for detaljer.
