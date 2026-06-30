---
title: "Tjenesteplaner"
---

# Tjenesteplaner

<div class="article-intro">

Tjenesteplaner organiserer hvem som tjener og når. Hver plan er knyttet til en spesifikk dato og ministerium, noe som gjør det enkelt å koordinere frivillige-lagene dine uke for uke og sikre at hver tjeneste er fullt bemannet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp ministeriene dine og lagene i Serving-området
- Kontroller at frivillige er lagt til i [personkatalogen](../people/adding-people.md) din og tildelt til lag

</div>

## Tilgang til planer

1. Naviger til **Serving** fra hovedmenyen.
2. Velg en **ministry tab** øverst på siden.
3. Klikk på en **plan type** for å se listen over planer for den typen.
4. Klikk på en spesifikk plan for å åpne den.

:::info
Full admin-tilgang er ikke nødvendig for å administrere planer. Alle som er medlemmer av et ministerium kan navigere til Serving og opprette, redigere og planlegge planer for sitt eget ministerium uten å trenge Plans Edit-tillatelsen. Redigerere med Plans Edit-rollen kan administrere planer på tvers av alle ministerier.
:::

## Opprettelse av en plan

1. Fra plantypesvisningen klikker du **New Plan**.
2. Gi planen et navn eller bruk datoen som navn. Velg **date** for tjenesten.
3. Hvis du vil kopiere fra en tidligere plan, velger du bare stillinger eller stillinger og oppgaver. Hvis du ikke vil kopiere, velger du bare ingenting. Du kan også kopiere tjenesterekkefølgen fra min tidligere plan.
4. Lagre planen. Du kan nå begynne å tildele teammedlemmer og bygge ut [tjenesterekkefølgen](./service-order.md).

## Plandetalj-siden

Når du åpner en plan, ser du to faner:

- **Assignments** -- Administrer hvilke teammedlemmer som er tildelt denne planen. Du kan legge til personer fra dine eksisterende lag og se hvem som har bekreftet eller fortsatt venter.
- **[Service Order](./service-order.md)** -- Bygg tjenesterekkefølgen med elementer som tilbedelsessanger, bønner, kunngjøringer og preken.

## Tildeling av teammedlemmer

1. Åpne en plan og gå til **Assignments**-fanen.
2. Klikk på **add Position** for å utvide den. Fyll ut informasjonen i legg til en stilling-skjema. For kategorinavn legg til hva som helst kategori du liker.
3. Klikk på **People Needed** og velg frivillige for å fylle den stillingen.
4. Legg til medlemmer fra teamroster-listen din ved å klikke **Add**.
5. Tildelte medlemmer vises under sitt lag med tildelingsstatus.
6. Klikk varsle frivillige for å varsle dem innenfor B1-appen eller via e-post.

:::tip
Sett opp lagene dine i ministeriet-innstillingene før du oppretter planer. På denne måten vil du ha et klart reservoar av frivillige å velge fra.
:::

## Frivillig-påminnelser

B1 kan automatisk minne frivillige på tjenestene de er planlagt for, slik at du ikke trenger å jage laget ditt hver uke. Påminnelser går til **alle som er planlagt** — både de som har bekreftet og de som ennå ikke har svart — via e-post og som en in-app/push-varsling. Hver påminnelse inkluderer den frivilliges stilling(er), tjenestdatoen, plannotatene og din egendefinerte melding.

Påminnelsestidspunkt og innhold angis per **plan type**, slik at hver tjeneste kan beholde sitt eget tidsplan.

1. Fra **Serving**-området velger du ministeriet som inneholder plantypen.
2. Klikk **edit (pencil) icon** ved siden av plantypen.
3. I **Reminders**-delen setter du:
   - **Reminder days before service** — en komma-separert liste over hvor mange dager før for å sende, for eksempel `7,1,0`. Bruk `0` for å sende en påminnelse på tjenestdagen. La dette feltet stå tomt for å slå av påminnelser for denne plantypen.
   - **Custom reminder message** *(valgfritt)* — ekstra tekst lagt til påminnelsen, for eksempel "Ankomst 30 minutter tidlig for å øve."
4. Lagre plantypen.

Nye plantyper minner frivillige **2 dager før** hver tjeneste som standard inntil du endrer dette.

:::tip
Frivillige som ennå ikke har bekreftet får **Accept** og **Decline**-knapper rett innenfor påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

:::info
Hver påminnelse sendes en gang. Planer som fortsatt er blyant-skissert (ennå ikke sendt til laget) utløser ikke påminnelser.
:::

## Tilknytting av grupper til en plantype

Under plannlisten på plantypesiden kan **Groups**-delen la deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen deres. Dette er en rask måte å presentere kommende tjenester for de rette lagene uten å gi dem admin-tilgang.

1. På plantypesiden blar du ned til **Groups**-delen.
2. Klikk **Add Group** og velg en gruppe fra rullegardin.
3. I **Shows**-kolonnen velger du om medlemmer av den gruppen skal se **Past**, **Future**, eller **Both** planer for denne plantypen.
4. Gjenta for å knytte til flere grupper, eller klikk papirkurvikonet for å fjerne en gruppe.

:::info
Bare grupper merket som **Standard** vises i plukker. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypen sine planer på [Plans](/docs/b1-church/plans/) -fanen i B1 medlemsportal — begrenset til fortid/fremtid/begge vinduet du valgte.
:::

## Utskrift av planer

Du kan skrive ut en plan for distribusjon til laget ditt. Åpne planen, Åpne tjenesterekkefølgen-fanen og bruk **Print**-alternativet for å generere en utskrivbar versjon som inkluderer oppgaver og tjenesterekkefølgen. Dette er nyttig for å dele ut på øvelser eller legge ut på et felles område.

:::info
Planer er organisert etter ministerium. Kontroller at du er på den riktige ministeriefanen før du oppretter eller viser planer.
:::

## Neste steg

- Bruk [Plans Overview](./plans-overview.md) for å se alle kommende oppgaver på tvers av flere uker i ett rutenett og identifisere ufylte stillinger — og tildel frivillige direkte fra rutenettet
- Lagre en plans struktur som en [Plan Template](./plan-templates.md) slik at du kan stempel den på fremtidlige planer i ett klikk
- Bygg ut din [Service Order](./service-order.md) med sanger, lesinger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte inn i tjenesterekkefølgen
- Bruk [Tasks](./tasks.md) for å tildele oppfølgingsoppgaver til teammedlemmer
