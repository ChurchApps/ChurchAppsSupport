---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Bygg tilpassede skjemaer for a samle inn informasjon fra menigheten din. Du kan opprette skjemaer for arrangementsregistreringer, undersokelser, besokskort, medlemssoknad og mer. Skjemaer kan kobles til personer i databasen din eller brukes som frittstaaende sider med sin egen offentlige URL.

</div>

<div class="prereqs">
<h4>For du begynner</h4>

- For **People**-skjemaer (koblet til personoppforinger), ma du ha [personer i databasen din](../people/adding-people.md) forst.
- For skjemaer som samler inn **betalinger**, ma du ha [Stripe konfigurert for nettbaserte gaver](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Naviger til **Forms** fra hovedmenyen.
2. Klikk pa **Add Form**.
3. Skriv inn et **navn** for skjemaet ditt.
4. Velg skjematype fra rullegardinmenyen:
   - **People** — Knytter innsendinger til [personoppforinger](../people/adding-people.md) i databasen din.
   - **Stand Alone** — Oppretter et uavhengig skjema med sin egen offentlige URL, ideelt for eksterne registreringer.
5. Klikk pa **Save** for a opprette skjemaet.

Det nye skjemaet ditt vises i listen. Klikk pa det for a begynne a legge til sporsmal.

## Legge til sporsmal

1. Apne skjemaet ditt og ga til **Questions**-fanen.
2. Klikk pa **Add Question**.
3. Velg en **felttype** fra Provider-rullegardinmenyen. Tilgjengelige typer inkluderer:
   - **Textbox** — For korte tekstsvar
   - **Date** — For datovalg
   - **Email** — For e-postadresser
   - **Phone Number** — For telefoninntasting
   - **Multiple Choice** — For a velge fra forhands definerte alternativer
   - **Payment** — For a samle inn betalinger
4. Skriv inn en **Tittel** og valgfri **Beskrivelse** for sporsmalet.
5. Kryss av for **Require an answer** hvis feltet er obligatorisk.
6. Klikk pa **Save**.
7. Gjenta for a legge til flere sporsmal.

:::warning
Felttypen **Payment** krever at Stripe er konfigurert. Hvis du ikke har satt opp nettbaserte gaver enna, se [Oppsett for nettbaserte gaver](../donations/online-giving-setup.md) for du legger til betalingsfelt.
:::

## Administrere skjemamedlemmer

1. Apne skjemaet ditt og ga til **Members**-fanen.
2. Sok etter en person og legg dem til med en rolle:
   - **Admin** — Kan redigere skjemaet og se alle innsendinger.
   - **View Only** — Kan se innsendinger, men kan ikke redigere skjemaet.

## Konfigurere skjemaegenskaper

Du kan oppdatere skjemaets navn og innstillinger nar som helst. For Stand Alone-skjemaer vil du ogsa se en unik **offentlig URL** som du kan dele med hvem som helst.

:::tip
Stand Alone-skjemaer er flotte for arrangementsregistreringer. Del den offentlige URLen via e-post, sosiale medier, eller bygg skjemaet direkte inn pa kirkens nettsted.
:::

:::info
For a bygge inn et skjema pa B1-nettstedet ditt, ga til nettstedsredigereren, legg til en ny seksjon, og velg **Form**-elementet. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettstedet ditt.
:::
