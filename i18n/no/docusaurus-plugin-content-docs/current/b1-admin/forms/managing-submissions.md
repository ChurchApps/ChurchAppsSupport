---
title: "Administrere innsendinger"
---

# Administrere innsendinger

<div class="article-intro">

Når skjemaet ditt er i gang, begynner innsendingene å komme inn. Fanen **Form Submissions** lar deg gjennomgå alle svar, se hvem som har sendt inn, og bruke dataene til å følge opp menigheten din i tide.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Opprett et skjema](./creating-forms.md) med minst ett spørsmål
- Del skjemaet via den offentlige nettadressen, eller bygg det inn på [nettsiden din](../website/managing-pages.md)

</div>

## Se innsendinger

1. Åpne [Hopp til-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **People** og klikk på **Forms**.
2. Klikk på skjemaet du vil gjennomgå.
3. Gå til fanen **Form Submissions**.

Du ser en liste over alle svar som er mottatt for skjemaet. Hver innsending viser respondentens informasjon og datoen den ble sendt inn, etterfulgt av én kolonne for hvert spørsmål i skjemaet. Hvis skjemaet har mange spørsmål, kan du rulle tabellen sideveis for å se de resterende kolonnene.

## Gjennomgå enkeltinnsendinger

Klikk på en hvilken som helst innsending for å se alle detaljene. Du ser alle svarene personen ga på hvert spørsmål i skjemaet.

Klikk på **utskriftsikonet** ved siden av innsendingen for å skrive ut personens utfylte svar -- nyttig for en papirmappe eller en signert frigivelse du må ha tilgjengelig. Utskriften viser menighetens logo (**Light Background Logo** fra [Website > Appearance](../website/appearance.md), hvis du har lastet opp en) midtstilt øverst, med menighetens navn under. Utskrifter bruker alltid mørk tekst på hvit bakgrunn, selv om du bruker B1 Admin i mørk modus. Dette er atskilt fra [utskrift av et tomt skjema](./creating-forms.md#printing-a-blank-form); det skriver ut svarene til én person som allerede er sendt inn, ikke en tom kopi. Det samme utskriftsikonet vises overalt der en innsending vises, også på [en persons profil](../people/adding-people.md#working-with-forms).

## Endre personen på en innsending

Hvis en innsending er knyttet til feil person -- for eksempel hvis to familiemedlemmer deler en e-postadresse -- kan du flytte den til riktig person, eller koble den fra.

1. På fanen **Form Submissions** klikker du på ikonet **Change person** (to piler) ved siden av personens navn. Samme ikon vises ved siden av en innsending på [en persons profil](../people/adding-people.md#working-with-forms).
2. I dialogen **Change person** søker du etter riktig person og klikker på **Move to this person**.
3. Eller klikk på **Unlink (Anonymous)** for å koble innsendingen fra enhver person. Den vises da som **Anonymous**.

Det er bare koblingen som endres. Svarene forblir de samme, og det sendes ikke nye oppfølgingse-poster.

:::info
For skjemaer som er satt til å opprette en personprofil, blir innsendingen knyttet til vedkommendes egen profil når en person er logget inn på menighetens nettside mens de sender inn skjemaet, selv om en annen person i databasen din deler e-postadressen. Når du [slår sammen to personprofiler](../people/adding-people.md), flyttes innsendingene fra den fjernede personen til personen du beholder.
:::

## Hvordan innsendinger samles inn

Innsendinger kan komme inn via flere kanaler:

- **Offentlig nettadresse** -- Hvis skjemaet ditt har en offentlig nettadresse (Stand Alone-skjemaer), kan alle med lenken sende inn et svar. Del nettadressen via e-post, sosiale medier eller tekstmeldinger.
- **Innebygd på nettsiden din** -- Skjemaer som er innebygd på B1-nettsiden din, samler automatisk inn innsendinger når besøkende fyller dem ut.
- **Internt bruk** -- Ansatte og frivillige kan også sende inn skjemaer på vegne av andre direkte i B1 Admin.

:::tip
Sjekk fanen **Form Submissions** regelmessig for skjemaer som besøkskort eller bønnebehov, slik at du kan følge opp raskt.
:::

## Bruke innsendingsdata

Dataene som samles inn gjennom skjemaer, kan hjelpe deg med å:

- Følge med på påmeldinger til arrangementer og planlegge deretter
- Følge opp besøkende eller nye medlemmer
- Samle inn tilbakemeldinger fra undersøkelser til planlegging av tjenester
- Behandle betalinger for arrangementer eller programmer

:::info
Skjemamedlemmer med rollen **Admin** eller **View Only** kan åpne fanen **Form Submissions**. Sørg for at de riktige personene på teamet ditt har tilgang til skjemaene de trenger, ved å administrere roller på fanen **Form Members**.
:::

:::info
Hvis et Stand Alone-skjema er [knyttet til en gruppe](./creating-forms.md#linking-a-form-to-a-group), kan gruppens ledere lese og skrive ut innsendingene fra gruppens side på B1.church, uten å være skjemamedlemmer. Ledere kan også lese svarene på påmeldingsspørsmål til gruppens arrangementer der. Se [Gruppedetaljer](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Hvis et **Stand Alone**-skjema er satt til å opprette en personprofil, vises alle innsendinger som er koblet til en eksisterende person også i seksjonen **Forms** på vedkommendes side i People -- ikke bare for People-skjemaer.
:::

## Neste steg

- Lær hvordan du bygger og tilpasser skjemaer i [Opprette skjemaer](./creating-forms.md)
- Legg til personer fra skjemainnsendinger i [personregisteret ditt](../people/adding-people.md) for videre oppfølging
- [Knytt et skjema til en gruppe](./creating-forms.md#linking-a-form-to-a-group) slik at gruppens ledere kan lese svarene, eller [legg innsendere til gruppen automatisk](./creating-forms.md#automatically-adding-submitters-to-a-group) slik at et frittstående påmeldingsskjema bygger sin egen medlemsliste
