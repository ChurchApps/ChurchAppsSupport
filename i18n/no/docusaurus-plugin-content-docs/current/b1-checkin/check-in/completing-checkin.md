---
title: "Fullføre innsjekking"
---

# Fullføre innsjekking

<div class="article-intro">

Når du har gjennomgått husstanden din og gjort eventuelle nødvendige gruppetildelinger, er du klar til å fullføre innsjekkingen. Dette er det siste trinnet i kiosk-arbeidsflyten -- appen sender inn oppmøtet, skriver ut etiketter og tilbakestilles for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gjennomgå husstanden din](./household-review) på husstandsgjennomgangsskjermen
- [Tildel grupper](./group-assignment) til eventuelle familiemedlemmer som trenger å sjekke inn på en bestemt klasse eller et bestemt program
- Eventuelt kan du [legge til gjester](./adding-guests) som er på besøk med familien din

</div>

## Slik sjekker du inn

1. Fra **husstandsgjennomgangsskjermen** trykker du på **Sjekk inn**-knappen nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser en **suksesskjerm** med et grønt hakemerke og en velkomstmelding.

Det er alt som skal til. Familiens oppmøte er nå registrert.

## Fulle rom og forholdstall for frivillige

Hvis kirken din har konfigurert [sikkerhetsgrenser](../../b1-admin/attendance/checkin-safety) på rommene sine, sjekker serveren dem før lagring:

- Hvis et valgt rom er **fullt eller stengt**, gjennomføres ikke innsjekkingen, og appen navngir rommet slik at du kan velge et annet.
- Hvis et barnerom har **for få frivillige** i forhold til forholdstallet sitt, viser appen enten en advarsel som en ansatt kan bekrefte for å fortsette, eller den blokkerer innsjekkingen helt — avhengig av hvordan kirken din har konfigurert håndhevelse av forholdstall.

## Etikettutskrift

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekking:

- **Navneetiketter** skrives ut for hver person som er tildelt en gruppe som har innstillingen **Skriv ut navneskilt** aktivert. Navneetiketter inkluderer personens navn, gruppetildeling og informasjon om allergier/notater hvis noe er registrert.
- **Hentelapper for foreldre** skrives ut når en innsjekket person er i en gruppe som har innstillingen **Foreldrehenting** aktivert. Hentelappen viser barna, deres gruppetildelinger og en unik **4-tegns sikkerhetskode**.

:::info
Den samme sikkerhetskoden vises både på barnets navneetikett og forelderens hentelapp. Ved henting matcher frivillige kodene for å bekrefte at riktig voksen henter hvert barn.
:::

Sikkerhetskoden genereres på nytt for hver innsjekking og bruker bare konsonanter og tall (vokaler er utelatt for å unngå å danne upassende ord).

:::warning
Hvis etikettene ikke skrives ut, åpner du Admin-innstillinger ved å trykke på **kirkelogoen** sju ganger, og trykker deretter på **Bytt skriver** for å verifisere skrivertilkoblingen. Se [Skrivoppsett](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva skjer etter innsjekking

- Hvis en skriver er konfigurert, skriver appen ut alle etiketter og returnerer deretter automatisk til **oppslagsskjermen**, klar for neste familie.
- Hvis ingen skriver er konfigurert, vises suksesskjermen i noen sekunder og returnerer deretter automatisk til **oppslagsskjermen**.

Du trenger ikke å trykke på noe for å komme tilbake til oppslagsskjermen -- appen håndterer overgangen automatisk.

:::tip
Appen tilbakestilles fullstendig etter hver innsjekking, slik at det ikke er noen risiko for at én familie ser en annen families informasjon.
:::

## Hva som blir registrert

Når du trykker på **Sjekk inn**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetildeling:

- **Personen** som sjekkes inn
- **Gudstjenesten** de deltar på
- **Gudstjenestetidspunktet** og **gruppen** de er tildelt

Disse dataene vises i B1 Admin under Oppmøte-seksjonen, der kirkens administratorer kan se og administrere oppmøteregistreringer. Se [administrasjonsveiledningen for innsjekking](../../b1-admin/attendance/check-in.md) for detaljer.
