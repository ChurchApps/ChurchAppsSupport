---
title: "Fullføring av innsjekking"
---

# Fullføring av innsjekking

<div class="article-intro">

Når du har gjennomgått husholdet og gjort nødvendige gruppetilordninger, er du klar til å sluttføre innsjekkingen. Dette er det siste trinnet i kioskarbeidsflytene -- appen sender inn oppmøte, skriver ut etiketter og tilbakestiller for neste familie.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Gjennomgå husholdet ditt](./household-review) på husholdsgjennomgangsens skjerm
- [Tilordne grupper](./group-assignment) til familiemedlemmer som må sjekke inn i en bestemt klasse eller program
- Valgfritt [legg til gjester](./adding-guests) som besøker familien

</div>

## Hvordan sjekke inn

1. Fra **husholdsgjennomgangsenskjermen**, trykk på **Innsjekk**-knappen nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser en **suksessskjerm** med en grønn hake og en velkomstmelding.

Det er alt som kreves. Familiens oppmøte har blitt registrert.

## Etikettutskrift

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekking:

- **Navn-etiketter** skrives ut for hver person som er tilordnet en gruppe som har **Print Nametag**-innstillingen aktivert. Navn-etiketter inkluderer personens navn, gruppetilordning og allergi / merknader hvis de er på fil.
- **Foreldreplukkslips** skrives ut når noen som sjekket inn er i en gruppe som har **Foreldreplukkinnstillingen** aktivert. Plukkslipet viser barna, gruppetilordningene og en unik **4-tegn sikkerhetskode**.

:::info
Samme sikkerhetskode vises på både barnets navn-etikett og foreldrens plukkslip. Ved plukk-tid, samsvarer frivillige kodene for å bekrefte at riktig voksen plukker opp hvert barn.
:::

Sikkerhetskoden genereres frisk for hver innsjekking og bruker kun konsonanter og sifre (vokaler utelukkes for å unngå å danne upassende ord).

:::warning
Hvis etiketter ikke skrives ut, åpne Admin Settings ved å trykke på **kirkens logo** sju ganger, og trykk deretter **Endre skriver** for å bekrefte skriverforbindelsen. Se [Skriverppsett](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva skjer etter innsjekking

- Hvis en skriver er konfigurert, skriver appen ut alle etiketter og blir deretter automatisk tilbake til **søkeskjermen**, klar for neste familie.
- Hvis ingen skriver er konfigurert, vises suksessskjermen i noen sekunder og blir deretter automatisk tilbake til **søkeskjermen**.

Du trenger ikke å trykke på noe for å komme tilbake til søkeskjermen -- appen håndterer overgangen automatisk.

:::tip
Appen tilbakestilles fullstendig etter hver innsjekking, slik at det ikke er noen risiko for at en familie ser en annen families informasjon.
:::

## Hva som blir registrert

Når du trykker på **Innsjekk**, sender appen følgende til serveren for hvert husholdsmedlem som har en gruppetilordning:

- **Personen** som sjekker inn
- **Servicen** de deltar på
- **Servicetiden** og **gruppen** de er tilordnet

Disse dataene vises i B1 Admin under Oppmøte-delen, hvor kirkens administratorer kan vise og administrere oppmøteposter. Se [innsjekkingsadministrasjonsveiledningen](../../b1-admin/attendance/check-in.md) for detaljer.
