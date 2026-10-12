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
3. Klikk på knappen **Legg til person** i sidetoppen. Siden ruller ned til skjemaet **Legg til ny person** under katalogen.
4. Fyll inn personens **Fornavn**, **Etternavn** og **E-post**, og klikk deretter på **Legg til**.

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

1. På personens profilside klikker du på **Rediger** under kontaktopplysningene til venstre.
2. I skjemaet **Personlige opplysninger** fyller du inn tilleggsopplysninger som mellomnavn, medlemsstatus (**Besøkende**, **Gjest**, **Fast deltaker**, **Medlem**, **Ansatt**, **Inaktiv** eller **Avdød**), datoer, adresse, telefonnumre og (for barn og elever) klassetrinn og skole.
3. Klikk på **Lagre** for å lagre de personlige opplysningene.

Venstre side av profilen viser personens bilde, navn, medlemsstatus, kontaktopplysninger, eventuelle verdier for [egendefinerte felt](../settings/custom-fields.md) og husstanden. Klikk på bildet for å endre det. Under knappen **Rediger** finner du flere handlinger: **Arbeidsflyt** (legg personen til i en [arbeidsflyt](../serving/workflows.md)), **Slå sammen**, **Eksporter** og **Eksporter data**.

Resten av profilen viser et sammendrag for hver type relatert informasjon:

- **Oppmøte** — Viser hvilke av de siste ukene personen var til stede, og de siste besøkene. Klikk på **Alle år** for hele besøkshistorikken, inkludert avdeling, samling, samlingstid, gruppe og en kolonne **Sjekket inn** med tidspunktet for innsjekking på kiosken (vises som en strek for besøk som er registrert uten kioskinnsjekking), eller på **Skriv ut** for å skrive den ut. For utvikling i hele menigheten i stedet for én persons historikk, se [Følge opp oppmøte](../attendance/tracking-attendance.md)
- **Gaver** — Viser gavene i år. Klikk på **Alle år** for hele [giverhistorikken](../donations/recording-donations.md), eller **Registrer en gave** for å registrere en ny
- **Grupper** — Viser personens [gruppemedlemskap](../groups/group-members.md)
- **Notater** — Viser nylige notater om personen (sjelesorg, oppfølging osv.). Klikk på **Alle notater** for å lese og legge til notater
- **Skjemaer** — Viser personens skjemaer og om hvert enkelt er sendt inn (se [Arbeide med skjemaer](#working-with-forms) nedenfor)

Når du åpner en av de fullstendige visningene, klikker du på lenken **Tilbake til** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp **E-post** under kontaktopplysningene til venstre i profilen.

1. Klikk på **E-post** i personens profil.
2. En dialog **E-post** med personens navn som tittel åpnes, og viser **Sendes til** med personens adresse.
3. Velg eventuelt en lagret mal under **Last inn mal (valgfritt)**.
4. Skriv inn et **Emne** og skriv meldingen.
5. Klikk på **Send e-post**.

Hvis du heller vil skrive meldingen i ditt eget e-postprogram, klikker du på **Åpne i e-postappen min**.

:::info
Sending fra B1 bruker samme godkjenning og daglige grenser som gruppe-e-post. Hvis menigheten din ikke er godkjent ennå, ber dialogen deg om å be om en gjennomgang – du kan fortsatt klikke på **Åpne i e-postappen min** i mellomtiden. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere som ikke har tillatelse til å redigere gruppemedlemmer, går rett til e-postappen sin når de klikker på **E-post**.
:::

## Arbeide med skjemaer {#working-with-forms}

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan bygge ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. Finn seksjonen **Skjemaer** i personens profil. Den viser hvert skjema og om det er **Sendt inn** eller **Ikke sendt inn**.
2. Klikk på navnet på et skjema for å åpne det (eller klikk på **Alle skjemaer** for å se hele listen).
3. Klikk på **redigeringsikonet** (blyant) på skjemaet, fyll inn opplysningene og klikk på **Lagre**.

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

1. Klikk på **Rediger** ved siden av overskriften **Husstand** til venstre i en persons profil.
2. Husstandsredigereren åpnes. Velg **husstandsrollen** for den aktuelle personen (for eksempel Hode, Ektefelle, Barn, Annen).
3. Klikk på **Legg til**-ikonet for å legge til et nytt husstandsmedlem.
4. Under **Legg til husstandsmedlem** skriver du inn personens navn i søkefeltet og trykker **Enter** eller klikker på søkeikonet. (Før du skriver noe, vises en kort liste over **Nylige personer**.)
5. Når personen vises i resultatene, klikker du på navnet eller legg-til-ikonet ved siden av.
6. Velg husstandsrollen til personen og klikk på **Lagre** for å fullføre husstandsoppsettet.
