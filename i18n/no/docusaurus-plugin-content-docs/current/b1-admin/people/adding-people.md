---
title: "Legge til personer"
description: "Legg til en person i menighetsdatabasen i B1 Admin, fyll inn detaljene deres, og koble familiemedlemmer sammen i husstander for innsjekking og rapportering."
---

# Legge til personer

<div class="article-intro">

Personer-delen er grunnlaget for B1 Admin -- det er menighetens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, donasjoner, skjemaer) knyttes til personposter. Denne veiledningen viser deg hvordan du legger noen til i databasen, redigerer detaljene deres og kobler familiemedlemmer sammen i husstander.

</div>

## Opplæringsvideo

<YouTube id="GtsczJ8JPio" title="Legge til personer og husstander i B1" next="Importere personregisteret ditt i B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Hvis du legger til mer enn en håndfull personer, bør du vurdere å bruke [CSV-import](importing-data.md) i stedet.

</div>

## Legge til en person

1. Gå til dashbordet for B1.church Admin.
2. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk **Personer**.
3. Klikk knappen **Legg til person** i sidehodet. Siden ruller ned til skjemaet **Legg til ny person** under katalogen.
4. Fyll inn personens **fornavn** og **etternavn**, og eventuelt **tittel** (velg et forslag som Mr, Mrs, Dr eller Pastor, eller skriv inn din egen, opptil 10 tegn), **e-postadresse** og **mobiltelefon**, og klikk deretter **Legg til**.

Personens profilside åpnes, klar for at du kan legge til flere detaljer.

:::tip
Hvis du flytter fra et annet system for medlemsregistrering, lar funksjonen [Importer data](importing-data.md) deg hente hele katalogen din fra en CSV-fil -- det går mye raskere enn å legge til én person om gangen.
:::

### Varsler om duplikater

Hvis e-postadressen (eller, når en person opprettes fra det fulle skjemaet for redigering, telefonnummeret eller samme fornavn + etternavn + fødselsdato) samsvarer med noen som allerede finnes i databasen, vises en dialog for **Mulig duplikat** før den nye posten lagres. Den viser hver samsvarende person med e-postadressen, telefonnummeret og fødselsdatoen deres, slik at du kan sammenligne.

- Klikk **Bruk eksisterende** ved siden av en treff for å bruke den personens post i stedet for å opprette en ny.
- Klikk **Opprett likevel** for å legge til den nye personen selv om det ble funnet et mulig treff.

Sjekken for duplikater gjelder bare når du oppretter en helt ny person -- å redigere en eksisterende post utløser den aldri. Den forhindrer nye duplikater, men den slår ikke sammen to poster som allerede finnes.

## Redigere detaljer {#editing-details}

1. På personens profilside klikker du knappen **Rediger** under kontaktopplysningene på venstre side.
2. I skjemaet **Personlige detaljer** fyller du inn tilleggsopplysninger som **tittel** (velg Mr, Mrs, Miss, Ms, Dr, Prof, Rev eller Pastor fra listen, eller skriv inn din egen, opptil 10 tegn), mellomnavn, medlemsstatus (**Besøkende**, **Gjest**, **Fast deltaker**, **Medlem**, **Ansatt**, **Inaktiv** eller **Død**), datoer, adresse, telefonnumre, og (for barn og elever) klassetrinn og skole.
3. Klikk **Lagre** for å lagre de personlige opplysningene.

Venstre side av profilen viser personens bilde, navn, medlemsstatus, kontaktopplysninger, eventuelle verdier i [egendefinerte felt](../settings/custom-fields.md), og husstanden. Under husstanden vises **Lagt til**, som viser datoen posten ble opprettet (bare for personer lagt til etter slutten av oktober 2026). Klikk på bildet for å endre det. Under knappen **Rediger** finner du noen flere handlinger: **Arbeidsflyt** (legg personen til i en [arbeidsflyt](../serving/workflows.md)), **Slå sammen**, **Eksporter** og **Eksporter data**.

Resten av profilen viser et sammendragsavsnitt for hver type relatert informasjon:

- **Oppmøte** — Viser hvilke av de siste ukene personen var til stede, og de siste besøkene. Klikk **Alle år** for hele besøkshistorikken, inkludert campus, gudstjeneste, gudstjenestetid, gruppe og en kolonne **Sjekket inn** med tidspunktet for innsjekking på kiosken (vist som en strek for besøk registrert uten innsjekking på kiosk), eller **Skriv ut** for å skrive den ut (utskriften har menighetens logo og navn midtstilt øverst, over personens navn). For trender for hele menigheten i stedet for én persons historikk, se [Følge oppmøte](../attendance/tracking-attendance.md)
- **Donasjoner** — Viser årets gaver, inkludert gaver til fond som ikke er skattefradragsberettiget. Klikk **Alle år** for hele [donasjonshistorikken](../donations/recording-donations.md), eller **Før en gave** for å registrere en ny. Hvis menigheten din har slått på [Gavepersonvern](../settings/church-settings.md#giving-privacy), forblir beløpene skjult til du klikker **Vis giving**
- **Grupper** — Lister opp personens [gruppemedlemskap](../groups/group-members.md), med **Ble med** og datoen de ble med i hver gruppe når den er registrert
- **Notater** — Viser nylige notater om personen (pastoral omsorg, oppfølginger osv.). Klikk **Alle notater** for å lese og legge til notater. Hvert notat viser hvem som skrev det, og datoen og klokkeslettet det ble lagt ut. For å formatere et notat, marker teksten i notatboksen og velg **Fet**, **Kursiv**, **Punktliste** eller **Nummerert liste** fra den lille popup-menyen (eller trykk **Ctrl+B** / **Ctrl+I**, **Cmd** på en Mac); notatet viser formateringen når det er lagt ut. Å slette et notat krever at du bekrefter først, fordi det ikke kan angres. For å se nylige notater for alle samtidig, bruk siden [Notater](./notes.md)
- **Skjemaer** — Viser personens skjemaer og om hvert av dem er sendt inn (se [Arbeide med skjemaer](#working-with-forms) nedenfor)
- **Forespørsler og påmeldinger** — Viser personens [forespørsler om rom og ressurser](../calendars/approvals.md) (med rommene eller ressursene som er bedt om og **Ventende**, **Godkjent** eller **Avslått**) og deres [arrangementspåmeldinger](../calendars/paid-registrations.md) (med hvor mange de har meldt på og **Påmeldt**, **Ventende**, **På venteliste** eller **Avbestilt**), nyeste først. De fem siste vises; klikk **Alle forespørsler** for hele listen. Du ser forespørsler om arrangementer hvis du kan bruke siden [Godkjenninger](../calendars/approvals.md), og påmeldinger hvis du kan se påmeldinger; uten noen av delene er seksjonen skjult

Når du åpner en av disse fullstendige visningene, klikker du lenken **Tilbake til** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp for **E-post** under kontaktopplysningene på venstre side av profilen.

1. På personens profil klikker du **E-post**.
2. En dialog for **E-post** med personens navn i tittelen åpnes og viser **Sendes til** med personens adresse.
3. Velg eventuelt en lagret mal fra **Last mal (valgfritt)**.
4. Skriv inn et **emne** og skriv meldingen.
5. Klikk **Send e-post**.

For å skrive meldingen i ditt eget e-postprogram i stedet, klikker du **Åpne i e-postappen min**.

:::info
Utsending fra B1 bruker de samme godkjennings- og døgngrensene som gruppe-e-post. Hvis menigheten din ikke er godkjent ennå, ber dialogen deg om å be om gjennomgang -- du kan fortsatt klikke **Åpne i e-postappen min** i mellomtiden. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere uten tillatelse til å redigere gruppemedlemmer går rett til e-postappen sin når de klikker **E-post**.
:::

## Arbeide med skjemaer {#working-with-forms}

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan lage ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. På personens profil finner du seksjonen **Skjemaer**. Den viser hvert skjema og om det er **Sendt inn** eller **Ikke sendt inn**.
2. Klikk på navnet på et skjema for å åpne det (eller klikk **Alle skjemaer** for å se hele listen).
3. Klikk **redigeringsikonet** (blyant) på skjemaet, fyll inn detaljene og klikk **Lagre**.

Når et skjema er sendt inn, klikker du **utskriftsikonet** ved siden av det for å skrive ut personens utfylte svar. Når personen har én innsending av et skjema, viser skjemaet **Sendt inn** med datoen over svarene.

Hvis en innsending havnet på feil person, klikker du ikonet **Endre person** (to piler) ved siden av den for å flytte den til noen andre eller koble den fra. Se [Endre personen på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer koblet til en persons profil bruker skjematypen **Personer**. Hvis du trenger et frittstående skjema (for eksempel en arrangementspåmelding), se alternativet [Frittstående skjema](../forms/creating-forms.md) i veiledningen for skjemaer.
:::

:::tip
Hvis du bare trenger å følge én eller to ekstra opplysninger om personer -- en dato, et tall, et ja/nei-svar -- bruk [egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut, og de kan søkes direkte i avansert søk.
:::

## Administrere husstander {#managing-households}

Husstander lar deg koble familiemedlemmer sammen. Dette er særlig nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. På en persons profil klikker du **Rediger** ved siden av overskriften **Husstand** på venstre side.
2. Husstandseditoren åpnes. Velg **husstandsrollen** for den nåværende personen (f.eks. Hode, Ektefelle, Barn, Annen).
3. Klikk **Legg til**-ikonet for å legge til et annet husstandsmedlem.
4. Under **Legg til husstandsmedlem** skriver du inn personens navn i søkeboksen og trykker **Enter** eller klikker søkeikonet. (Før du skriver noe, vises en kort liste over **Nylige personer** -- personene du sist valgte i et personsøk, deretter de nyeste personene i B1.)
5. Når personen vises i resultatene, klikker du navnet deres eller legg-til-ikonet ved siden av.
6. Velg husstandsrollen deres og klikk **Lagre** for å fullføre oppsettet av husstanden.

Hvis personen ikke finnes i B1 ennå, klikker du **Legg til ny person** under søket i stedet. I tillegg til navn, tittel, e-postadresse og mobiltelefon spør dialogen etter **husstandsrollen** deres (Hode, Ektefelle, Barn eller Annen). Den nye personen opprettes og plasseres i denne husstanden med den rollen; klikk **Lagre** for å fullføre.
