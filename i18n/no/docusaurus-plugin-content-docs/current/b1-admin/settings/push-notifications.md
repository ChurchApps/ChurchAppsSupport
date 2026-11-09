---
title: "Pushvarsler"
description: "Send eller planlegg pushvarsler til alle med menighetens app eller til én gruppe fra B1 Admin, og rediger, send, avbryt eller fjern dem etterpå."
---

# Pushvarsler

<div class="article-intro">

Siden **Pushvarsler** under **Mobil** lar deg sende et pushvarsel til alle som bruker menighetens app, eller til medlemmene i én gruppe, med én gang eller på et tidspunkt du velger. Den viser hva som er planlagt, slik at du kan redigere, sende eller avbryte et varsel før det går ut, og den viser en historikk over nylige varsler som du kan tømme.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For å sende til **Alle med appen** trenger du tillatelse til å redigere innhold. For å sende til en gruppe trenger du tillatelse til å redigere gruppemedlemmer. Se [Roller og tillatelser](./roles-permissions.md).
- Medlemmene mottar pushvarsler først etter at de har [installert menighetens app](../../b1-church/getting-started/installing-pwa.md) og tillatt varsler.

</div>

## Åpne siden

I B1 Admin går du til **Mobil** og klikker **Pushvarsler**. Siden har et kort for **Planlagt** og et kort for **Nylig**. Tidspunktene på siden vises i menighetens tidssone (eller din datamaskins, hvis menigheten ikke har satt en), og tidssonen vises over listen Planlagt.

## Sende eller planlegge et varsel

1. Klikk **Send varsel**.
2. Velg **målgruppen**: **Alle med appen**, eller en av gruppene dine. Du ser bare de valgene tillatelsene dine gir deg tilgang til.
3. B1 viser hvor mange personer pushvarselet vil nå -- for eksempel *42 av 60 personer som bruker appen har push slått på* -- og hvor mange som har push av. Du utelates fra ditt eget push.
4. Under **Når** velger du **Send nå**, eller **Planlegg senere** og velger et **Send kl.**-tidspunkt i fremtiden.
5. Skriv inn en **tittel** (opptil 80 tegn) og en **melding** (opptil 240 tegn).
6. Du kan eventuelt legge til en **Åpne lenke eller plakat-URL** (en `https`-adresse eller en appsti som `/mobile/groups`) som pushvarselet skal åpne, og en **Bilde-URL** (en `https`-adresse) som vises sammen med det.
7. Klikk **Send varsel** (eller **Planlegg varsel**).

For et planlagt push kontrolleres det hvem det når på nytt når det går ut, slik at alle som blir med i gruppen eller slår på varsler i mellomtiden blir inkludert.

Du kan også sende til en gruppe fra gruppens egen side med **Varsle**. Se [Sende pushvarsler til gruppemedlemmer](../groups/group-members.md#sending-push-notifications-to-group-members).

:::tip
Når et push ikke har en lenke, åpner det appens varselliste for et kirkedekkende push, eller gruppens side for et gruppepush.
:::

## Administrere planlagte varsler

Kortet **Planlagt** lister opp hvert varsel som venter på å bli sendt, med tidspunktet **Send kl.**, **målgruppen**, tittelen og meldingen. For hvert av dem kan du:

- **Rediger** -- endre målgruppen, tidspunktet eller teksten, og klikk deretter **Lagre endringer**.
- **Send nå** -- send det med en gang i stedet for å vente.
- **Avbryt** -- stopp det fra å bli sendt. Et avbrutt varsel flyttes til kortet Nylig.

Et varsel som går ut akkurat nå viser **Sender** og kan ikke endres.

## Nylige varsler

Kortet **Nylig** lister opp varsler som er sendt eller har stoppet, med en **Status** for hvert:

| Status | Betydning |
|--------|---------|
| **Sendt: X av Y** | Pushet gikk ut. *Y* personer kunne motta det, og *X* fikk det som pushvarsel. |
| **Savnet (sendetidspunktet passerte)** | Varselet var mer enn 30 minutter forsinket da B1 prøvde å sende det, så det ble ikke sendt. |
| **Mislyktes** | Sendingen mislyktes tre ganger. Feilen vises under statusen. |
| **Avbrutt** | Noen avbrøt det før det gikk ut. |

For å fjerne ett varsel fra listen klikker du **Fjern** på raden. For å tømme listen klikker du **Tøm alle** øverst på kortet; dette fjerner alle sendte, mislykkede og avbrutte varsler du har tillatelse til å administrere. Begge handlingene ber deg bekrefte, og ingen kan angres. Å fjerne et varsel tar det ikke tilbake fra personer som allerede har fått det.

:::info
Medlemmer som har slått av **Kirkeannonseringer** i sine [varselinnstillinger](../../b1-church/getting-started/notification-preferences.md), får ikke disse pushene, enten de sendes til alle eller til en gruppe.
:::

## Relaterte artikler

- [Innstillinger for mobilappen](./mobile-app.md)
- [Gruppemedlemmer](../groups/group-members.md)
- [Roller og tillatelser](./roles-permissions.md)
- [Varselinnstillinger](../../b1-church/getting-started/notification-preferences.md)
