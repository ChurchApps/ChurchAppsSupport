---
title: "Legge til personer"
---

# Legge til personer

<div class="article-intro">

Delen Personer er grunnmuren i B1 Admin – det er menighetens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, gaver, skjemaer) er knyttet til personkort. Denne veiledningen viser deg hvordan du legger en person inn i databasen, redigerer opplysningene og knytter familiemedlemmer sammen i husstander.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du skal legge til mer enn en håndfull personer, bør du heller bruke verktøyet for [CSV-import](importing-data.md).

</div>

## Legge til en person

1. Gå til dashbordet i B1.church Admin.
2. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk på **Personer**.
3. Klikk på knappen **Legg til person** øverst til høyre.
4. Fyll inn personens fornavn, etternavn og e-postadresse, og klikk deretter på **Legg til**.

Personens profilside åpnes, klar for at du kan legge til flere opplysninger.

:::tip
Hvis du flytter over fra et annet system for menighetsadministrasjon, kan du med funksjonen [Importer data](importing-data.md) hente inn hele registeret fra en CSV-fil – mye raskere enn å legge til personer én og én.
:::

### Advarsler om duplikater

Hvis e-postadressen (eller, når du oppretter en person fra det fullstendige redigeringsskjemaet, telefonnummeret eller kombinasjonen av fornavn, etternavn og fødselsdato) samsvarer med noen som allerede finnes i databasen, vises en dialog med **Mulig duplikat** før den nye posten lagres. Den viser hver samsvarende person med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk på **Bruk eksisterende** ved siden av et treff for å bruke den personens post i stedet for å opprette en ny.
- Klikk på **Opprett likevel** for å legge til den nye personen selv om det ble funnet et mulig treff.

Dette kontrolleres bare når du oppretter en helt ny person – redigering av en eksisterende post utløser det aldri. Det forhindrer bare nye duplikater; det slår ikke sammen to poster som allerede finnes.

## Redigere opplysninger

1. På personens profilside klikker du på **blyanten for redigering** ved siden av navnet.
2. Fyll inn tilleggsopplysninger som mellomnavn, medlemsstatus, datoer, adresse, telefonnumre og (for barn og elever) klassetrinn og skole.
3. Klikk på **Lagre** for å lagre de personlige opplysningene.

Profilen har også flere faner for relatert informasjon:

- **Notater** — Legg til notater om personen (sjelesorg, oppfølging osv.)
- **Grupper** — Se og administrer [gruppemedlemskap](../groups/group-members.md)
- **Oppmøte** — Se personens egen besøkshistorikk, inkludert avdeling, samling, samlingstid, gruppe og en kolonne **Sjekket inn** med tidspunktet for innsjekking på kiosken (vises som en strek for besøk som er registrert uten kioskinnsjekking). For utvikling i hele menigheten i stedet for én persons historikk, se [Følge opp oppmøte](../attendance/tracking-attendance.md)
- **Gaver** — Se [giverhistorikk](../donations/recording-donations.md)

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp **Send e-post til denne personen** (konvoluttikon) i profilhodet.

1. Klikk på **konvoluttikonet** i personens profil.
2. En dialog **E-post** med personens navn som tittel åpnes, og viser **Sendes til** med personens adresse.
3. Velg eventuelt en lagret mal under **Last inn mal (valgfritt)**.
4. Skriv inn et **Emne** og skriv meldingen.
5. Klikk på **Send e-post**.

Hvis du heller vil skrive meldingen i ditt eget e-postprogram, klikker du på **Åpne i e-postappen min**.

:::info
Sending fra B1 bruker samme godkjenning og daglige grenser som gruppe-e-post. Hvis menigheten din ikke er godkjent ennå, ber dialogen deg om å be om en gjennomgang – du kan fortsatt klikke på **Åpne i e-postappen min** i mellomtiden. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere som ikke har tillatelse til å redigere gruppemedlemmer, går rett til e-postappen sin når de klikker på konvoluttikonet.
:::

## Arbeide med skjemaer

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan bygge ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. Klikk på nedtrekkslisten **Skjemaer** i personens profil for å velge et skjema.
2. Klikk på **Legg til skjema** for å åpne det.
3. Fyll inn opplysningene i skjemaet og klikk på **Lagre**.

Når et skjema er sendt inn, klikker du på **utskriftsikonet** ved siden av det for å skrive ut personens utfylte svar.

Hvis en innsending havnet hos feil person, klikker du på ikonet **Bytt person** (to piler) ved siden av den for å flytte den til noen andre eller fjerne koblingen. Se [Bytte person på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer som er knyttet til en persons profil, bruker skjematypen **Personer**. Hvis du trenger et frittstående skjema (for eksempel en arrangementspåmelding), kan du se [alternativet for frittstående skjema](../forms/creating-forms.md) i veiledningen om skjemaer.
:::

:::tip
Hvis du bare trenger å registrere én eller to ekstra opplysninger om personer – en dato, et tall, et ja/nei-svar – kan du bruke [Egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut og kan søkes direkte i avansert søk.
:::

## Administrere husstander

Med husstander kan du knytte familiemedlemmer sammen. Det er særlig nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. Klikk på **blyanten for redigering** ved siden av husstandsnavnet i en persons profil.
2. Husstandsredigereren åpnes. Velg **husstandsrollen** for den aktuelle personen (for eksempel Hode, Ektefelle, Barn).
3. Klikk på **Legg til** for å legge til et nytt husstandsmedlem.
4. Skriv inn personens navn i søkefeltet og klikk på **Søk**.
5. Når personen vises i søkeresultatene, klikker du på **Velg**.
6. Velg husstandsrollen til personen og klikk på **Lagre** for å fullføre husstandsoppsettet.
