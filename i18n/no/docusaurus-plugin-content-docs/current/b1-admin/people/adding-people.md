---
title: "Legge til personer"
---

# Legge til personer

<div class="article-intro">

Personer-delen er grunnlaget for B1 Admin – det er kirkens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, gaver, skjemaer) knyttes tilbake til personregistreringer. Denne veiledningen går gjennom hvordan du legger noen til i databasen din, redigerer detaljene deres og kobler familiemedlemmer inn i husstander.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du legger til mer enn en håndfull personer, bør du vurdere å bruke verktøyet for [CSV-import](importing-data.md) i stedet.

</div>

## Legge til en person

1. Gå til B1.church-administrasjonspanelet.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer**, og klikk på **Personer**.
3. Klikk på knappen **Legg til person** i sidehodet. Siden ruller ned til skjemaet **Legg til ny person** under katalogen.
4. Fyll inn personens **fornavn**, **etternavn** og **e-post**, og klikk deretter på **Legg til**.

Personens profilside åpnes, klar for at du kan legge til flere detaljer.

:::tip
Hvis du flytter fra et annet system for medlemsadministrasjon, lar funksjonen [Importer data](importing-data.md) deg hente hele katalogen din fra en CSV-fil – mye raskere enn å legge til personer én om gangen.
:::

### Advarsler om duplikater

Hvis e-postadressen (eller, når du oppretter en person fra det fulle redigeringsskjemaet, telefonnummeret eller samsvarende fornavn + etternavn + fødselsdato) samsvarer med noen som allerede finnes i databasen din, vises en dialog **Mulig duplikat** før den nye registreringen lagres. Den lister opp hver samsvarende person med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk på **Bruk eksisterende** ved siden av en treff for å bruke den personens registrering i stedet for å opprette en ny.
- Klikk på **Opprett likevel** for å legge til den nye personen selv om det ble funnet en mulig treff.

Dette sjekker bare for duplikater når du oppretter en helt ny person – redigering av en eksisterende registrering utløser aldri den. Det forhindrer bare nye duplikater; det slår ikke sammen to registreringer som allerede finnes.

## Redigere detaljer

1. På personens profilside, klikk på knappen **Rediger** under kontaktdetaljene deres til venstre.
2. I skjemaet **Personlige detaljer** fyller du inn tilleggsinformasjon som mellomnavn, medlemsstatus (**Besøkende**, **Gjest**, **Fast deltaker**, **Medlem**, **Ansatt**, **Inaktiv** eller **Avdød**), datoer, adresse, telefonnumre, og (for barn og elever) klassetrinn og skole.
3. Klikk på **Lagre** for å lagre personopplysningene.

Venstre side av profilen viser personens bilde, navn, medlemsstatus, kontaktdetaljer, eventuelle verdier for [egendefinerte felt](../settings/custom-fields.md) og husstanden deres. Klikk på bildet for å endre det. Under knappen **Rediger** finnes noen flere handlinger: **Arbeidsflyt** (legg personen til i en [arbeidsflyt](../serving/workflows.md)), **Slå sammen**, **Eksporter** og **Eksporter data**.

Resten av profilen viser en oppsummeringsdel for hver type relatert informasjon:

- **Oppmøte** – Viser hvilke av de siste ukene personen møtte opp, og deres nyeste besøk. Klikk på **Alle år** for hele besøkshistorikken deres, inkludert campus, gudstjeneste, gudstjenestetid, gruppe og en kolonne **Innsjekket** med tidspunktet for kioskinnsjekking (vist som en strek for besøk som er registrert uten kioskinnsjekking), eller **Skriv ut** for å skrive den ut. For trender for hele kirken i stedet for én persons historikk, se [Spore oppmøte](../attendance/tracking-attendance.md)
- **Gaver** – Viser årets gaver, inkludert gaver til ikke-fradragsberettigede fond. Klikk på **Alle år** for hele [gavehistorikken](../donations/recording-donations.md), eller **Registrer en gave** for å registrere en ny. Hvis kirken din har slått på [gaveprivatliv](../settings/church-settings.md#giving-privacy), forblir beløpene skjult til du klikker på **Vis gaver**
- **Grupper** – Lister personens [gruppemedlemskap](../groups/group-members.md)
- **Notater** – Viser nylige notater om personen (pastoral omsorg, oppfølginger osv.). Klikk på **Alle notater** for å lese og legge til notater
- **Skjemaer** – Lister personens skjemaer og om hvert enkelt er **Innsendt** eller **Ikke innsendt** (se [Arbeide med skjemaer](#working-with-forms) nedenfor)

Når du åpner en av disse fullstendige visningene, klikk på lenken **Tilbake til** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp **E-post** under kontaktdetaljene deres til venstre på profilen.

1. På personens profil, klikk på **E-post**.
2. En dialog **E-post** med personens navn i tittelen åpnes, og viser **Sendes til** med personens adresse.
3. Velg eventuelt en lagret mal fra **Last inn mal (valgfritt)**.
4. Skriv inn et **Emne** og skriv meldingen.
5. Klikk på **Send e-post**.

For å skrive meldingen i ditt eget e-postprogram i stedet, klikk på **Åpne i e-postprogrammet mitt**.

:::info
Sending fra B1 bruker de samme godkjennings- og dagsgrensene som gruppe-e-post. Hvis kirken din ikke er godkjent ennå, ber dialogen deg om å be om en gjennomgang – du kan fortsatt klikke på **Åpne i e-postprogrammet mitt** i mellomtiden. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere uten tillatelse til å redigere gruppemedlemmer går rett til e-postprogrammet sitt når de klikker på **E-post**.
:::

## Arbeide med skjemaer

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan lage ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. På personens profil, finn delen **Skjemaer**. Den lister hvert skjema sammen med om det er **Innsendt** eller **Ikke innsendt**.
2. Klikk på et skjemas navn for å åpne det (eller klikk på **Alle skjemaer** for å se hele listen).
3. Klikk på **redigeringsikonet** (blyant) på skjemaet, fyll inn detaljene, og klikk på **Lagre**.

Når et skjema er innsendt, klikk på **utskriftsikonet** ved siden av det for å skrive ut den personens utfylte svar.

Hvis en innsending havnet på feil person, klikk på ikonet **Endre person** (to piler) ved siden av den for å flytte den til noen andre eller koble den fra. Se [Endre personen på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer koblet til en persons profil bruker skjematypen **Personer**. Hvis du trenger et frittstående skjema (som en påmelding til et arrangement), se alternativet [Frittstående skjema](../forms/creating-forms.md) i veiledningen for skjemaer.
:::

:::tip
Hvis du bare trenger å spore en eller to ekstra opplysninger om personer – en dato, et tall, et ja/nei-svar – bruk [egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut og kan søkes direkte i Avansert søk.
:::

## Administrere husstander {#managing-households}

Husstander lar deg koble familiemedlemmer sammen. Dette er spesielt nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. På en persons profil, klikk på **Rediger** ved siden av overskriften **Husstand** til venstre.
2. Redigeringsverktøyet for husstand åpnes. Velg **husstandsrollen** for den gjeldende personen (f.eks. Hode, Ektefelle, Barn, Annen).
3. Klikk på **Legg til**-ikonet for å legge til et nytt husstandsmedlem.
4. Under **Legg til husstandsmedlem** skriver du personens navn i søkefeltet og trykker **Enter** eller klikker på søkeikonet. (Før du skriver, vises en kort liste over **Nylige personer**.)
5. Når personen vises i resultatene, klikk på navnet deres eller add-ikonet ved siden av.
6. Velg husstandsrollen deres og klikk på **Lagre** for å fullføre oppsettet av husstanden.
