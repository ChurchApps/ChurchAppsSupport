---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Bygg egendefinerte skjemaer for å samle informasjon fra menigheten din. Du kan lage skjemaer for påmeldinger til arrangementer, undersøkelser, besøkskort, medlemssøknader og mer. Skjemaer kan være knyttet til personer i databasen din eller brukt som frittstående sider med sin egen offentlige URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For **Person**-skjemaer (knyttet til personregistreringer), trenger du [personer i databasen din](../people/adding-people.md) først.
- For skjemaer som samler **betalinger**, må du ha [Stripe konfigurert for elektronisk giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne **Personer** fra seksjonsmenyen, og klikk deretter **Skjemaer** i navigasjonslinjen.
2. Klikk **Legg til skjema**.
3. Skriv inn et **navn** for skjemaet ditt.
4. Velg skjematypen fra rullegardinlisten:
   - **Person** — Forbinder innsendinger med [personregistreringer](../people/adding-people.md) i databasen din.
   - **Frittstående** — Oppretter et uavhengig skjema med sin egen offentlige URL, ideelt for eksterne påmeldinger.
5. Klikk **Lagre** for å opprette skjemaet.

Ditt nye skjema vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema

Trenger du en papierkopi å dele ut -- for et besøkskort på velkomstsalsen, eller et skjema noen uten internettilgang kan fylle ut for hånd? Klikk på **utskriftsikonet** ved siden av et skjema på hovedskjemaet listen for å åpne en forhåndsvisning, og klikk deretter **Skriv ut**. Blanke felt skrives ut med en understrek eller avmerkingsboks for hvert spørsmål slik at folk kan fylle det ut for hånd; obligatoriske spørsmål er merket med en stjerne. Det er ingen andre utskriftsalternativer -- skriv ut hele skjemaet eller ingenting.

## Legge til spørsmål

1. Åpne skjemaet ditt og gå til **Spørsmål**-fanen.
2. Klikk **Legg til spørsmål**.
3. Velg en **felttype** fra Provider-rullegardinlisten. Tilgjengelige typer inkluderer:
   - **Tekstboks** — For korte tekstsvar
   - **Dato** — For datovalg
   - **E-post** — For e-postadresser
   - **Telefonnummer** -- For telefoninput
   - **Flere valg** — For valg fra forhåndsinnstilte alternativer
   - **Betaling** — For innkreving av betalinger
4. Skriv inn **Tittel** og valgfri **Beskrivelse** for spørsmålet.
5. Merk av **Krev et svar** hvis feltet er obligatorisk.
6. Klikk **Lagre**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Felttypen **Betaling** krever at Stripe er konfigurert. Hvis du ikke har satt opp elektronisk giving ennå, se [Oppsett for elektronisk giving](../donations/online-giving-setup.md) før du legger til betalingsfelter.
:::

## Administrere skjemamedlemmer

1. Åpne skjemaet ditt og gå til **Medlemmer**-fanen.
2. Søk etter en person og legg dem til med en rolle:
   - **Admin** — Kan redigere skjemaet og vise alle innsendinger.
   - **Kun visning** — Kan vise innsendinger, men kan ikke redigere skjemaet.

## Automatisk legge til innehavere av innsendinger til en gruppe

Når **Opprett en personregistrering fra innsendinger** er aktivert, kan du også knytte skjemaet til en gruppe slik at hver innehaver av innsendings automatisk legges til gruppens rolle:

1. Åpne skjemaets **Detaljer**, og slå på **Opprett en personregistrering fra innsendinger**.
2. Under **Legg til innehavere av innsendinger til en gruppe**, velg gruppen for å legge til innehavere av innsendinger til, eller la den stå på **Ingen**.
3. Klikk **Lagre**.

Hver gang noen sender inn skjemaet, blir den matchende eller nylig opprettede personen lagt til gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som et leir-påmeldingsskjema som skal automatisk bygge leirets grupperolle.

### Sende en oppfølgingsepost

Med **Opprett en personregistrering fra innsendinger** slått på, kan du også sende e-post til hver person som sender inn skjemaet. Fyll inn **Emne for oppfølgingsepost** og **Brødtekst for oppfølgingsepost** i skjemaets detaljer. Du kan bruke `{firstName}` og `{churchName}` tokens i begge deler. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgingsmeldinger sendes bare etter at kirken din er godkjent til å sende gruppeepost, og de teller mot kirkas daglige e-postgrense. Se [Slå på gruppeepost for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisering av et skjema

For å gjenbruke et skjema som utgangspunkt for et nytt, klikk på **Dupliser**-ikonet (kopieringsikon) ved siden av skjemaet i skjemalistenen. B1 oppretter en nøyaktig kopi av skjemaet -- inkludert alle spørsmål -- som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er praktisk for gjentakende arrangementer der registreringsspørsmålene forblir de samme fra år til år. Dupliser forrige års skjema, oppdater navn og datoer, og du er klar til å gå.
:::

## Konfigurere skjemaegenskaper

Du kan oppdatere skjemaets navn og innstillinger når som helst. For frittstående skjemaer vil du også se en unik **offentlig URL** som du kan dele med hvem som helst, sammen med et **Beskrivelse**-felt -- tekst som vises over spørsmålene på den offentlige skjemaoversikten, nyttig for å fortelle folk hva skjemaet er til før de begynner å fylle det ut.

:::tip
Frittstående skjemaer er bra for påmeldinger til arrangementer. Del den offentlige URL-en via e-post, sosiale medier eller integrer skjemaet direkte på kirkas nettsted.
:::

:::info
For å integrer et skjema på B1-nettstedet ditt, gå til nettstedseditoren din, legg til en ny seksjon og velg **Skjema**-elementet. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettstedet ditt.
:::
