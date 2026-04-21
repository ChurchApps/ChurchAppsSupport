---
title: "Oprettelse af formularer"
---

# Oprettelse af formularer

<div class="article-intro">

Byg brugerdefinerede formularer for at samle oplysninger fra din menighed. Du kan oprette formularer til begivenhedsregistreringer, undersøgelser, besøgerkort, medlemskabsansøgninger og meget mere. Formularer kan være knyttet til personer i din database eller bruges som selvstændige sider med deres eget offentlige URL.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- For **personer**-formularer (knyttet til personrecords), har du brug for [personer i din database](../people/adding-people.md) først.
- For formularer, der samler **betalinger**, skal du have [Stripe konfigureret til online giving](../donations/online-giving-setup.md).

</div>

## Oprettelse af en ny formular

1. Gå til **Formularer** fra hovedmenuen.
2. Klik **Tilføj formular**.
3. Angiv et **navn** til din formular.
4. Vælg formulartypen fra rullelisten:
   - **Personer** — Forbinder indsendelser med [personrecords](../people/adding-people.md) i din database.
   - **Selvstændig** — Opretter en uafhængig formular med sit eget offentlige URL, ideelt til eksterne registreringer.
5. Klik **Gem** for at oprette formularen.

Din nye formular vises i listen. Klik på den for at starte med at tilføje spørgsmål.

## Tilføjelse af spørgsmål

1. Åbn din formular og gå til fanen **Spørgsmål**.
2. Klik **Tilføj spørgsmål**.
3. Vælg en **felttype** fra Provider-rullelisten. Tilgængelige typer inkluderer:
   - **Tekstboks** -- For korte tekstsvar
   - **Dato** -- For datomarkering
   - **Email** -- For e-mailadresser
   - **Telefonnummer** -- For telefoninput
   - **Flere valg** -- For at vælge fra foruddefinerede indstillinger
   - **Betaling** -- For at samle betalinger
4. Angiv en **titel** og valgfri **beskrivelse** til spørgsmålet.
5. Markér **Kræv et svar**, hvis feltet er obligatorisk.
6. Klik **Gem**.
7. Gentag for at tilføje flere spørgsmål.

:::warning
Felttypen **Betaling** kræver, at Stripe er konfigureret. Hvis du ikke har opsat online giving endnu, skal du se [Online Giving Setup](../donations/online-giving-setup.md), før du tilføjer betalingsfelter.
:::

## Styring af formularmedlemmer

1. Åbn din formular og gå til fanen **Medlemmer**.
2. Søg efter en person og tilføj dem med en rolle:
   - **Admin** -- Kan redigere formularen og se alle indsendelser.
   - **Kun visning** -- Kan se indsendelser, men kan ikke redigere formularen.

## Konfigurering af formularegenskaber

Du kan opdatere din formulars navn og indstillinger til enhver tid. For selvstændige formularer vil du også se et unikt **offentligt URL**, som du kan dele med hvem som helst.

:::tip
Selvstændige formularer er fantastiske til begivenhedsregistreringer. Del det offentlige URL via e-mail, sociale medier eller integrer formularen direkte på dit kirkewebsted.
:::

:::info
For at integrer en formular på dit B1-websted skal du gå til dit websredigeringsprogram, tilføje en ny sektion, og vælge **Form**-elementet. Vælg derefter den formular, du vil vise. Se [Styring af sider](../website/managing-pages.md) for detaljer om redigering af dit websted.
:::
