---
title: "Legge til mennesker"
---

# Legge til mennesker

<div class="article-intro">

Mennesker-seksjonen er grunnlaget for B1 Admin -- det er kirchens medlemsdatabase. Alle andre funksjoner (grupper, frammøte, donasjoner, skjemaer) knytter seg tilbake til personnosposter. Denne veiledningen leder deg gjennom tillegg av noen til databasen din, redigering av detaljer deres og lenking av familiemedlemmer til husstander.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må ha en aktiv B1 Admin-konto med tillatelse til å administrere mennesker. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivå ditt.
- Hvis du legger til mer enn en håndful mennesker, vurder å bruke [CSV-import](importing-data.md)-verktøyet i stedet.

</div>

## Legge til en person

1. Naviger til B1.church Admin-instrumentbordet.
2. Åpne **seksjonsmeny** i øverste venstre hjørne og velg **Personer**.
3. Klikk på **Legg til person**-knappen i øverste høyre hjørne.
4. Fyll inn personens fornavn, etternavn og e-postadresse, og klikk **Legg til**.

Personens profilside åpnes, klar for deg til å legge til flere detaljer.

:::tip
Hvis du migrerer fra et annet kirkledelsessystem, [Importer data](importing-data.md)-funksjonen lar deg bringe inn hele mappen fra en CSV-fil -- mye raskere enn å legge til mennesker en om gangen.
:::

### Duplikatadvarler

Hvis e-postadressen (eller, når du oppretter en person fra det fulle redigeringsskjemaet, telefonnummeret eller sammenslåtte fornavn + etternavn + fødselsdato) samsvarer med noen allerede i databasen din, en **Mulig duplikat**-dialogboks vises før den nye posten lagres. Den viser hver sammenslåtte person sammen med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk **Bruk eksisterende** ved siden av en kamp for å bruke den personens oppføring i stedet for å opprette en ny.
- Klikk **Opprett uansett** for å legge til den nye personen selv om en mulig kamp ble funnet.

Dette kontrollerer kun duplikater når du oppretter en helt ny person -- redigering av en eksisterende oppføring utløser det aldri. Den forhindrer bare nye duplikater; den fletter ikke to poster som allerede finnes.

## Redigering av detaljer

1. På personens profilside, klikk på **rediger blyan** ved siden av deres navn.
2. Fyll inn tilleggsinformasjon som mellomnavnet, medlemskapsstatus, datoer, adresse, telefonnumre og (for barn og elever) klasse og skole.
3. Klikk **Lagre** for å lagre personinformasjonen.

Profilen inneholder også flere faner for tilknyttet informasjon:

- **Notater** -- Legg til notater om personen (pastoralomsorga, oppfølging osv.)
- **Grupper** -- Vis og administrer [gruppemedlemskap](../groups/group-members.md)
- **Frammøte** -- Vis denne personens individuelle besøkshistorikk, inkludert campus, service, servicetid, gruppe og en **Sjekket inn**-kolonne med kiosksjekk-inn-tiden (vist som en bindestrek for besøk registrert uten kiosksjekk-inn). For kirkeflemme trender i stedet for en persons historie, se [Spor frammøte](../attendance/tracking-attendance.md)
- **Donasjoner** -- Vis [donasjonhistorie](../donations/recording-donations.md)

## Arbeide med skjemaer

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan bygge ved å følge [Opprett skjemaer](../forms/creating-forms.md)-veiledningen.

1. På personens profil, klikk **Skjemaer**-rullegardinmenyen for å velge et skjema.
2. Klikk **Legg til skjema** for å åpne det.
3. Fyll ut skjemadetaljer og klikk **Lagre**.

Når et skjema er sendt inn, klikk på **skriv ut ikon** ved siden av det for å skrive ut den personens utfylte svar.

:::info
Skjemaer lenket til en persons profil bruker **Mennesker**-skjematypen. Hvis du trenger et frittstående skjema (som en eventregistrering), se [frittstående skjema-valget](../forms/creating-forms.md) i skjemaer-veiledningen.
:::

:::tip
Hvis du bare trenger å spore en eller to ekstra stykker informasjon på mennesker -- en dato, et tall, et ja/nei-svar -- bruk [Egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle inn og er søkbare direkte i avansert søk.
:::

## Administrering av husstander

Husstander lar deg lenke familiemedlemmer sammen. Dette er spesielt nyttig for [sjekk-inn](../attendance/check-in.md), hvor en forelder kan sjekke inn alle barnene deres på en gang.

1. På en persons profil, klikk på **rediger blyan** ved siden av husstandsnavnet.
2. Husstandsredigeringen åpnes. Velg **husstandsrollen** for gjeldende person (f.eks. Hode, ektefelle, barn).
3. Klikk **Legg til** for å legge til et annet husstandsmedlem.
4. Skriv inn personens navn i søkefeltet og klikk **Søk**.
5. Når personen vises i søkeresultatene, klikk **Velg**.
6. Velg deres husstandsrolle og klikk **Lagre** for å fullføre husstandsoppsettet.
