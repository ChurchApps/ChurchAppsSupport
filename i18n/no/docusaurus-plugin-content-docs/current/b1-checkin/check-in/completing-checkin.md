---
title: "Fullføre Innsjekking"
---

# Fullføre Innsjekking

<div class="article-intro">

Når du har gjennomgått husstanden din og gjort nødvendige gruppetildelinger, er du klar til å fullføre innsjekkingen. Dette er det siste trinnet i kioskens arbeidsflyt -- appen sender inn oppmøte, skriver ut etiketter og nullstiller seg for neste familie.

</div>

<div class="prereqs">
<h4>Før Du Begynner</h4>

- [Gjennomgå husstanden din](./household-review) på husstandsgjennomgangsskjermen
- [Tildel grupper](./group-assignment) til familiemedlemmer som trenger å sjekke inn i en bestemt klasse eller program
- Eventuelt [legg til gjester](./adding-guests) som besøker familien din

</div>

## Hvordan Sjekke Inn

1. Fra **husstandsgjennomgangsskjermen**, trykk på **Check-in**-knappen nederst på skjermen.
2. Appen sender oppmøtedataene til serveren og viser en **suksessskjerm** med et grønt avkrysningsmerke og en velkomstmelding.

Det er alt som skal til. Familiens oppmøte er registrert.

## Etikettutskrift

Hvis en nettverksskriver er konfigurert, skriver appen automatisk ut etiketter etter innsjekking:

- **Navnelapper** skrives ut for hver person som er tildelt en gruppe med **Print Nametag**-innstillingen aktivert. Navnelapper inkluderer personens navn, gruppetildeling og allergi-/notatinformasjon hvis det er registrert.
- **Hentesedler for foreldre** skrives ut når en innsjekket person er i en gruppe med **Parent Pickup**-innstillingen aktivert. Henteseddelen viser barna, gruppetildelingene deres og en unik **4-tegns sikkerhetskode**.

:::info
Den samme sikkerhetskoden vises på både barnets navnelapp og forelderens henteseddel. Ved henting matcher frivillige kodene for å bekrefte at riktig voksen henter hvert barn.
:::

Sikkerhetskoden genereres på nytt for hver innsjekking og bruker bare konsonanter og sifre (vokaler er utelatt for å unngå å danne upassende ord).

:::warning
Hvis etiketter ikke skrives ut, sjekk skriverstatuslinjen øverst på skjermen. Du kan trykke på den for å gå til skriverinnstillinger og bekrefte tilkoblingen. Se [Skriveroppsett](../getting-started/printer-setup) for feilsøkingstrinn.
:::

## Hva Skjer Etter Innsjekking

- Hvis en skriver er konfigurert, skriver appen ut alle etiketter og går deretter automatisk tilbake til **søkeskjermen**, klar for neste familie.
- Hvis ingen skriver er konfigurert, vises suksessskjermen i noen sekunder og går deretter automatisk tilbake til **søkeskjermen**.

Du trenger ikke å trykke på noe for å komme tilbake til søkeskjermen -- appen håndterer overgangen automatisk.

:::tip
Appen nullstiller seg fullstendig etter hver innsjekking, så det er ingen risiko for at én familie ser en annen families informasjon.
:::

## Hva Som Registreres

Når du trykker **Check-in**, sender appen følgende til serveren for hvert husstandsmedlem som har en gruppetildeling:

- **Personen** som sjekkes inn
- **Gudstjenesten** de deltar på
- **Gudstjenestetiden** og **gruppen** de er tildelt

Disse dataene vises i B1 Admin under Oppmøte-seksjonen, der kirkens administratorer kan se og administrere oppmøteposter. Se [veiledning for innsjekkingsadministrasjon](../../b1-admin/attendance/check-in.md) for detaljer.
