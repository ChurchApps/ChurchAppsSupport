---
title: "Innstillinger for mobilappen"
---

# Innstillinger for mobilappen

<div class="article-intro">

På siden Innstillinger for mobilappen konfigurerer du navigasjonsfanene som vises i **B1.church-mobilopplevelsen (PWA)** for kirkens medlemmer. Du styrer hvilke faner som er synlige, hva de lenker til og hvordan de vises.

</div>

:::info Den innebygde B1 Mobile-appen er utfaset
Fanene som konfigureres her, leveres gjennom [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), som har erstattet den innebygde B1 Mobile-appen. Del kirkens installasjonsside — `https://yourchurchname.b1.church/mobile/install` — med medlemmene; den veileder dem gjennom installasjon av appen på enheten sin, uten nedlasting fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer [Kirkeinnstillinger](./church-settings.md) først, inkludert kirkens navn og profilering

</div>

## Åpne navigasjonsinnstillingene

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **Navigasjon** (`/mobile/navigation`).
3. Navigasjonssiden viser appfanene du har nå.

## Legge til en ny fane

1. Klikk på knappen **Legg til fane** øverst på siden.
2. Fyll ut detaljene for fanen:
   - **Navn** -- Etiketten som vises på fanen (for eksempel «Prekener» eller «Gi»).
   - **Ikon** -- Klikk på ikonvelgeren for å velge et ikon til fanen. Du kan også laste opp et eget bilde.
   - **Fanetype** -- Velg blant alternativer som Bibel, Direktesending, Donasjon, Nettsted og flere.
   - **URL** -- Skriv inn nettadressen fanen skal lenke til.
   - **Synlighet** -- Styr hvem som kan se denne fanen (alle, bare medlemmer osv.).
3. Klikk på **Lagre fane** for å legge den til i appen din.

## Redigere en eksisterende fane

1. Klikk på en av fanene i listen **Appfaner**.
2. Oppdater fanens navn, ikon, URL, type eller synlighetsinnstillinger.
3. Klikk på **Lagre fane** for å ta i bruk endringene.

## Endre rekkefølgen på fanene

Du kan endre rekkefølgen fanene vises i i mobilappen. Dra og slipp fanene i listen for å omorganisere dem. Rekkefølgen på denne siden tilsvarer rekkefølgen medlemmene dine ser i appen.

:::info
Noen faner kan dukke opp automatisk når bestemte vilkår er oppfylt -- for eksempel kan en Direktesending-fane vises når en sending er aktiv. Faner du legger til manuelt, gir deg full kontroll over hva medlemmene ser til enhver tid.
:::

:::tip
Hold antallet faner overkommelig. Tre til fem faner fungerer bra for de fleste kirker. For mange faner kan gjøre navigasjonen forvirrende for medlemmene.
:::

## Innstillinger for medlemsregister og meldinger

Punktet **Medlemsportal** i samme Mobil-del inneholder innstillingene som styrer medlemsregisteret og private meldinger i B1.church-opplevelsen:

- **Godkjenningsgruppe for registeret** -- Gruppen som gjennomgår oppdateringer av medlemsregisteret, og [forespørsler om sletting av konto](../profile/account-deletion.md), før de trer i kraft.
- **Vis i registeret** -- Hvem som kan vises i medlemsregisteret (fra Bare ansatte til Alle).
- **Synlighetspreferanse** -- Setter kirkens standard for medlemmer som ikke har valgt sin egen innstilling ennå. **Adresse**, **Telefonnummer** og **E-post** har hver sin nedtrekksmeny, med de samme fem nivåene overalt der synlighet konfigureres:
  - **Alle** -- synlig for alle, også anonyme besøkende
  - **Medlemmer** -- synlig bare for personer med en medlems- eller ansattpost
  - **Bare grupper** -- synlig bare for personer som deler en gruppe med denne personen
  - **Mine gruppeledere og ansatte** -- synlig bare for ledere i en gruppe denne personen tilhører, pluss ansatte
  - **Bare ansatte** -- synlig bare for ansatte med tillatelsen Personer &gt; Vis, og for personen selv

  Medlemmer kan overstyre disse standardene for sin egen profil fra fanen **Personvern** i profilen sin i B1.church PWA -- se [Redigere profilen din](/docs/b1-church/getting-started/me-page).
- **Minimumsalder for private meldinger** -- En barnesikkerhetskontroll. B1 åpner ikke en **ny** privat samtale når en av personene er under denne alderen, basert på fødselsdato (husstandsrolle brukes som reserve når ingen fødselsdato er registrert). Personer under aldersgrensen er fortsatt fullt synlige i registeret -- bare direktemeldinger blokkeres, i **begge retninger**, for alle inkludert ansatte. Gruppesamtaler og meldinger til et barns foreldre fungerer fortsatt. Alternativene er Av, 13, 16 eller 18; standard er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi aldersgrensekontrollen bygger på fødselsdato, bør du sørge for at fødselsdato er fylt ut for barn i menigheten. Denne innstillingen hører til samme barnesikkerhetsfamilie som [sikkerhetskontrollene for innsjekking](../attendance/checkin-safety.md).
:::

### Innloggingsmelding på startskjermen

Besøkende som åpner appens [startskjerm](/docs/b1-church/getting-started/navigating#home) uten å logge inn, ser en kort melding -- som standard *«Logg inn for å se gruppene dine, giving og mer.»* -- ved siden av en **Logg inn**-knapp. Innstillingene for **Innloggingsmelding på startskjermen** på den samme Medlemsportal-siden (`/mobile/b1-mobile`) lar deg endre den:

- **Vis innloggingsmelding på appens startskjerm** -- Slå av dette for å skjule både meldingen og **Logg inn**-knappen fra startskjermen. Besøkende kan fortsatt logge inn fra appmenyen.
- **Tekst for innloggingsmelding** -- Erstatt standardteksten med din egen melding (opptil 150 tegn). La feltet stå tomt for å bruke standarden. Dette feltet er deaktivert mens meldingen er slått av.

Klikk på **Lagre** for å ta det i bruk. Lagring oppdaterer appens hurtigbufrede innstillinger, så endringen vises neste gang startskjermen lastes.

## Hvor disse fanene vises

Fanene du konfigurerer her, vises i **B1.church PWA** som medlemmene installerer fra hvilken som helst side på `https://yourchurchname.b1.church`. Endringer du gjør på denne siden, vises neste gang et medlem åpner appen. (Fanene vises også i den eldre [innebygde B1 Mobile-appen](/docs/b1-mobile/) for medlemmer som fortsatt bruker den, men den appen er utfaset og oppdateres ikke lenger.)

## Neste steg

- [Kirkeinnstillinger](./church-settings.md) -- Konfigurer kirkeinformasjon og profilering
- [Roller og tillatelser](./roles-permissions.md) -- Administrer tilgang for teamet ditt
