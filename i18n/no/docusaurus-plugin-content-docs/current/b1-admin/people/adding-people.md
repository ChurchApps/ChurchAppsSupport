---
title: "Legge til personer"
---

# Legge til personer

<div class="article-intro">

Seksjonen Personer er grunnlaget for B1 Admin — kirkens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, gaver, skjemaer) knyttes til personposter. Denne veiledningen går gjennom hvordan du legger noen til i databasen, redigerer detaljene deres og kobler familiemedlemmer sammen i husstander.

</div>

## Opplæringsvideo

<YouTube id="NTL1UDQpx8s" title="Legge til personer og husstander i B1" next="Importere personregisteret ditt i B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du legger til mer enn en håndfull personer, bør du vurdere å bruke [CSV-import](importing-data.md) i stedet.

</div>

## Legge til en person

1. Gå til dashbordet for B1.church Admin.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk **Personer**.
3. Klikk knappen **Legg til person** i sidehodet. Siden ruller ned til skjemaet **Legg til ny person** under katalogen.
4. Fyll inn personens **Fornavn**, **Etternavn** og **E-post**, og klikk deretter **Legg til**.

Personens profilside åpnes, klar for at du kan legge til flere detaljer.

:::tip
Hvis du flytter fra et annet system for kirkeadministrasjon, lar funksjonen [Importer data](importing-data.md) deg hente inn hele katalogen din fra en CSV-fil — mye raskere enn å legge til personer én om gangen.
:::

### Dupliseringsadvarsler

Hvis e-postadressen (eller, når du oppretter en person fra det fullstendige redigeringsskjemaet, telefonnummeret eller samsvarende fornavn + etternavn + fødselsdato) samsvarer med noen som allerede finnes i databasen din, vises en dialog **Mulig duplikat** før den nye posten lagres. Den lister opp hver samsvarende person med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk **Bruk eksisterende** ved siden av et treff for å bruke den personens post i stedet for å opprette en ny.
- Klikk **Opprett likevel** for å legge til den nye personen selv om det ble funnet et mulig treff.

Dette sjekker bare for duplikater når du oppretter en helt ny person — redigering av en eksisterende post utløser aldri dette. Det hindrer bare nye duplikater; det slår ikke sammen to poster som allerede finnes.

## Redigere detaljer

1. På personens profilside klikker du **Rediger**-knappen under kontaktopplysningene dine på venstre side.
2. I skjemaet **Personlige detaljer** fyller du inn tilleggsinformasjon som mellomnavn, medlemsstatus (**Besøkende**, **Gjest**, **Vanlig deltaker**, **Medlem**, **Ansatt**, **Inaktiv** eller **Avdød**), datoer, adresse, telefonnumre og (for barn og elever) klassetrinn og skole.
3. Klikk **Lagre** for å lagre de personlige opplysningene.

Venstre side av profilen viser personens bilde, navn, medlemsstatus, kontaktopplysninger, eventuelle verdier for [egendefinerte felt](../settings/custom-fields.md) og husstanden deres. Under husstanden viser **Lagt til** datoen posten ble opprettet (bare for personer lagt til siden slutten av oktober 2026). Klikk på bildet for å endre det. Under **Rediger**-knappen finnes noen flere handlinger: **Arbeidsflyt** (legg personen til i en [arbeidsflyt](../serving/workflows.md)), **Slå sammen**, **Eksporter** og **Eksporter data**.

Resten av profilen viser en oppsummeringsseksjon for hver type relatert informasjon:

- **Oppmøte** — viser hvilke av de siste ukene personen deltok, og deres siste besøk. Klikk **Alle år** for hele besøkshistorikken deres, inkludert kampus, gudstjeneste, gudstjenestetid, gruppe og en kolonne **Innsjekket** med tidspunkt for innsjekking på kiosk (vist som en strek for besøk som ble registrert uten innsjekking på kiosk), eller **Skriv ut** for å skrive den ut (utskriften har kirkens logo og navn sentrert øverst, over personens navn). For trender for hele kirken i stedet for en persons historikk, se [Følge opp oppmøte](../attendance/tracking-attendance.md)
- **Gaver** — viser årets gaver, inkludert gaver til ikke-fradragsberettigede fond. Klikk **Alle år** for hele [gavehistorikken](../donations/recording-donations.md), eller **Registrer en gave** for å registrere en ny. Hvis kirken din har slått på [Gaveprivat](../settings/church-settings.md#giving-privacy), forblir beløpene skjult til du klikker **Vis gaver**
- **Grupper** — lister personens [gruppemedlemskap](../groups/group-members.md), med **Ble med** og datoen de ble med i hver gruppe når den er registrert
- **Notater** — viser nylige notater om personen (pastoral omsorg, oppfølginger osv.). Klikk **Alle notater** for å lese og legge til notater. Hvert notat viser hvem som skrev det, og datoen og klokkeslettet det ble lagt ut. For å se nylige notater for alle på en gang, bruk siden [Notater](./notes.md)
- **Skjemaer** — lister personens skjemaer og om hvert enkelt er sendt inn (se [Arbeide med skjemaer](#working-with-forms) nedenfor)

Når du åpner en av disse fullstendige visningene, klikker du lenken **Tilbake til** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp **E-post** under kontaktopplysningene deres på venstre side av profilen.

1. På personens profil klikker du **E-post**.
2. En dialog **E-post** med personens navn åpnes og viser **Sendes til** med personens adresse.
3. Velg eventuelt en lagret mal fra **Last inn mal (valgfritt)**.
4. Skriv inn et **Emne** og skriv meldingen.
5. Klikk **Send e-post**.

For å skrive meldingen i ditt eget e-postprogram i stedet, klikker du **Åpne i e-postappen min**.

:::info
Sending fra B1 bruker de samme godkjennings- og daglige grensene som gruppe-e-post. Hvis kirken din ikke er godkjent ennå, ber dialogen deg be om en gjennomgang — du kan fortsatt klikke **Åpne i e-postappen min** i mellomtiden. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere uten tillatelse til å redigere gruppemedlemmer går rett til e-postappen sin når de klikker **E-post**.
:::

## Arbeide med skjemaer

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer du kan lage ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. På personens profil finner du seksjonen **Skjemaer**. Den lister hvert skjema sammen med om det er **Sendt inn** eller **Ikke sendt inn**.
2. Klikk et skjemas navn for å åpne det (eller klikk **Alle skjemaer** for å se hele listen).
3. Klikk **redigeringsikonet** (blyanten) på skjemaet, fyll inn detaljene, og klikk **Lagre**.

Når et skjema er sendt inn, klikker du **utskriftsikonet** ved siden av det for å skrive ut personens utfylte svar. Når personen har én enkelt innsending av et skjema, viser skjemaet **Sendt inn** med datoen over svarene.

Hvis en innsending havnet på feil person, klikker du **Endre person**-ikonet (to piler) ved siden av den for å flytte den til noen andre eller koble den fra. Se [Endre personen på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer knyttet til en persons profil bruker skjematypen **Personer**. Hvis du trenger et frittstående skjema (for eksempel en arrangementspåmelding), se alternativet [Frittstående skjema](../forms/creating-forms.md) i veiledningen for skjemaer.
:::

:::tip
Hvis du bare trenger å spore en eller to ekstra opplysninger om personer — en dato, et tall, et ja/nei-svar — bruk [Egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut og kan søkes direkte i Avansert søk.
:::

## Administrere husstander {#managing-households}

Husstander lar deg koble familiemedlemmer sammen. Dette er spesielt nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. På en persons profil klikker du **Rediger** ved siden av overskriften **Husstand** på venstre side.
2. Husstandsredigeringen åpnes. Velg **husstandsrollen** for den nåværende personen (f.eks. Overhode, Ektefelle, Barn, Annen).
3. Klikk **Legg til**-ikonet for å legge til et annet husstandsmedlem.
4. Under **Legg til husstandsmedlem** skriver du personens navn i søkeboksen og trykker **Enter** eller klikker søkeikonet. (Før du skriver noe vises en kort liste over **Nylige personer**.)
5. Når personen vises i resultatene, klikker du navnet deres eller legg-til-ikonet ved siden av.
6. Velg deres husstandsrolle og klikk **Lagre** for å fullføre husstandsoppsettet.
