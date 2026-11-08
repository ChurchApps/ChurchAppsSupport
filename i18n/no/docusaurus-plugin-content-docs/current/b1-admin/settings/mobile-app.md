---
title: "Innstillinger for mobilappen"
description: "Konfigurer navigasjonsfanene, flisene på startskjermen, innloggingsforespørselen og personverninnstillingene for medlemskatalogen i medlemsappen B1.church i B1 Admin."
---

# Innstillinger for mobilappen

<div class="article-intro">

Siden for innstillinger for mobilappen lar deg konfigurere navigasjonsfanene som vises i **B1.church-mobilopplevelsen (PWA)** for medlemmene i menigheten din. Du bestemmer hvilke faner som er synlige, hvor de lenker, og hvordan de vises.

</div>

## Opplæringsvideo

<YouTube id="ydY7WGK16fE" title="Tilpasse medlemsappen for menigheten din i B1" />

:::info
Fanene du konfigurerer her, vises i B1-appen, som medlemmene kan [installere som en progressiv web-app (PWA)](../../b1-church/getting-started/installing-pwa.md). Del installasjonssiden for menigheten din, `https://yourchurchname.b1.church/mobile/install`, med medlemmene. Den viser dem hvordan de installerer appen på enheten sin, uten at de trenger å laste ned noe fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer [kirkeinnstillingene](./church-settings.md) først, inkludert navnet på menigheten og profilen din

</div>

## Gå til navigasjonsinnstillinger

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **Navigasjon** (`/mobile/navigation`).
3. Navigasjonssiden viser de gjeldende appfanene dine.

## Legge til en ny fane

1. Klikk på knappen **Legg til fane** øverst på siden.
2. Fyll inn detaljene for fanen:
   - **Navn** -- Teksten som vises på fanen (for eksempel «Preken» eller «Gi»).
   - **Ikon** -- Klikk på ikonvelgeren for å velge et ikon for fanen.
   - **Bilde** -- Klikk på **Velg bilde** (eller **Bytt bilde**) for å gi fanen et bilde. Faner med bilde vises som bildeflisер på startskjermen i appen. Se [Fliser på startskjermen](#home-screen-tiles).
   - **Fanetype** -- Velg blant alternativer som Bibel, Direktesending, Gave, Nettsted og flere.
   - **URL** -- Skriv inn nettadressen fanen skal lenke til.
   - **Synlighet** -- Bestem hvem som kan se fanen (alle, bare medlemmer osv.). For en **Medlemskatalog**-fane styrer dette bare hvem som ser selve fanen. Hvem som kan åpne katalogen, settes med **Vis i katalog** på siden for medlemsportalen (se [Innstillinger for medlemskatalog og meldinger](#member-directory--messaging-settings)).
3. Klikk på **Lagre fane** for å legge den til i appen.

## Redigere en eksisterende fane

1. Klikk på en eksisterende fane i listen **Appfaner**.
2. Oppdater navn, ikon, URL, type eller synlighetsinnstillinger for fanen.
3. Klikk på **Lagre fane** for å bruke endringene.

## Endre rekkefølgen på fanene

Du kan endre rekkefølgen fanene vises i i mobilappen. Dra og slipp fanene i listen for å ordne dem på nytt. Rekkefølgen på denne siden samsvarer med rekkefølgen medlemmene ser i appen.

:::info
Noen faner kan dukke opp automatisk når visse betingelser er oppfylt. For eksempel kan en fane for direktesending vises når en sending er aktiv. Faner du legger til manuelt, gir deg full kontroll over hva medlemmene ser til enhver tid.
:::

:::tip
Hold antall faner håndterbart. Tre til fem faner fungerer godt for de fleste menigheter. For mange faner kan gjøre navigasjonen forvirrende for medlemmene.
:::

## Innstillinger for medlemskatalog og meldinger

Elementet **Medlemsportal** i den samme mobildelen inneholder innstillingene som styrer medlemskatalogen og private meldinger i B1.church-opplevelsen:

- **Godkjenningsgruppe for katalog** -- Gruppen som gjennomgår oppdateringer i medlemskatalogen og [forespørsler om sletting av konto](../profile/account-deletion.md), før de trer i kraft.
- **Vis i katalog** -- Hvem som kan åpne medlemskatalogen, og hvem som står oppført i den: **Bare administratorer**, **Medlemmer og høyere** (standard), **Faste deltakere og høyere** eller **Besøkende og høyere**. Personer med medlemsstatus under nivået du velger, ser ikke katalogen og står ikke oppført i den. **Bare administratorer** stenger katalogen for alle unntatt ansatte med tillatelsen Personer &gt; Vis (medlemsstatusen Ansatt alene er ikke nok). Disse kan alltid åpne katalogen og se alle, uansett hvordan dette er satt. Gjester tas aldri med, siden alle som registrerer seg selv på nettet, starter som gjester.
- **Synlighetsvalg** -- Angir standarden for hele menigheten for medlemmer som ikke har valgt sin egen innstilling ennå. **Adresse**, **Telefonnummer** og **E-post** har hver sin nedtrekksliste, med de samme fem nivåene som brukes overalt der synlighet konfigureres:
  - **Alle** -- synlig for alle, inkludert anonyme besøkende
  - **Medlemmer** -- synlig bare for personer med en post som medlem eller ansatt
  - **Bare gruppedeltakere** -- synlig bare for personer som deler en gruppe med denne personen, pluss ansatte
  - **Mine gruppeledere og ansatte** -- synlig bare for ledere av en gruppe denne personen tilhører, pluss ansatte
  - **Bare ansatte** -- synlig bare for ansatte (alle med medlemsstatusen Ansatt, eller med tillatelsen Personer &gt; Vis), og for personen selv

  «Ansatt» betyr i disse nivåene alle med medlemsstatusen Ansatt eller med tillatelsen Personer &gt; Vis. Endringer i grupper trer i kraft med en gang: den som blir med i en gruppe, eller gjøres til gruppeleder, kan se de tilsvarende detaljene **Bare gruppedeltakere** eller **Mine gruppeledere og ansatte** for medlemmene i gruppen, uten å logge ut og inn igjen.

  Medlemmer kan overstyre disse standardene for sin egen post fra fanen **Personvern** på profilen sin i B1.church-PWA-en. Se [Redigere profilen din](/docs/b1-church/getting-started/me-page).
- **Minimumsalder for private meldinger** -- En barnesikkerhetskontroll. B1 åpner ikke en **ny** privat meldingssamtale når en av personene er under denne alderen, basert på fødselsdato (husstandsrollen brukes som reserve når det ikke finnes fødselsdato). Personer under denne alderen er fortsatt fullt synlige i katalogen. Det er bare direkte meldinger som blokkeres, i **begge retninger**, for alle, også ansatte. Gruppesamtaler og meldinger til et barns foreldre fungerer fortsatt. Alternativene er Av, 13, 16 eller 18. Standarden er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi aldersjekken er avhengig av fødselsdatoer, må du sørge for at fødselsdatoer er fylt inn for barn i menigheten din. Denne innstillingen hører til samme gruppe barnesikkerhetskontroller som [sikkerhetskontrollene for innsjekking](../attendance/checkin-safety.md).
:::

### Innloggingsforespørsel på startskjermen

Besøkende som åpner [startskjermen](/docs/b1-church/getting-started/navigating#home) i appen uten å logge inn, ser en kort forespørsel. Som standard er den *«Logg inn for å se gruppene dine, gaver og mer.»*, og den vises ved siden av knappen **Logg inn**. Innstillingene for **innloggingsforespørsel på startskjermen** på samme side for medlemsportalen (`/mobile/b1-mobile`) lar deg endre den:

- **Vis innloggingsforespørsel på appens startskjerm** -- Slå av dette for å skjule både forespørselen og knappen **Logg inn** fra startskjermen. Besøkende kan fortsatt logge inn fra appmenyen.
- **Tekst for innloggingsforespørsel** -- Erstatt standardteksten med din egen melding (opptil 150 tegn). La feltet stå tomt for å bruke standardteksten. Feltet er deaktivert mens forespørselen er slått av.

Klikk på **Lagre** for å bruke endringene. En melding om **Lagret** bekrefter endringen. Lagring oppdaterer appens bufrede innstillinger, så endringen vises neste gang startskjermen lastes.

### Fliser på startskjermen

Faner som har et bilde (se **Bilde** under [Legge til en ny fane](#adding-a-new-tab)), vises på [startskjermen](/docs/b1-church/getting-started/navigating#home) i appen som bildeflisер, i en seksjon med menighetens navn som overskrift. Dette gjelder også en fane for Dagens vers, hvis du gir den et bilde. Faner med bilde vises også i fanelinjen.

Innstillingen **Fliser på startskjermen** på samme side for medlemsportalen (`/mobile/b1-mobile`) styrer hvordan flisene er ordnet. Velg en **Oppsett**:

- **Rutenett** -- To fliser per rad (standard). Når antallet fliser er odde, strekker den første flisen seg over hele bredden.
- **Rullerad** -- En rad med fliser som medlemmene sveiper sidelengs gjennom.
- **Rulling (automatisk)** -- Den samme sidelengs raden, men den beveger seg også av seg selv og går videre til den første flisen igjen etter den siste. Den flytter seg én flis omtrent hvert fjerde sekund. Den stopper mens et medlem berører, holder musepekeren over eller tabulerer inn i raden, og fortsetter noen sekunder senere. På enheter der redusert bevegelse er slått på, står raden stille og fungerer som **Rullerad**.
- **Liste** -- En liste med et lite bildeminiatyr ved siden av navnet på hver fane.

I begge rulleoppsettene vises en rad med prikker under flisene når det er flere fliser enn det får plass på skjermen. Det er én prikk per flis, og prikken for den gjeldende flisen er fylt. Medlemmene kan trykke på en prikk for å hoppe til den flisen.

Klikk på **Lagre** for å bruke endringene.

### Seksjoner på startskjermen

Innloggede medlemmer ser alltid sin egen oppmøtehistorikk og innsendte skjemaer på [Meg-siden](/docs/b1-church/getting-started/me-page). Bryterne for **Seksjoner på startskjermen** på samme side for medlemsportalen (`/mobile/b1-mobile`) kan vise dem på startskjermen også:

- **Vis mitt oppmøte på startskjermen** -- Legger til en seksjon **Mitt oppmøte** med hvor mange ganger medlemmet har møtt opp de siste 90 dagene, de to siste besøkene, og en lenke til **Historikk** med hele oppmøtelisten.
- **Vis mine skjemaer på startskjermen** -- Legger til en seksjon **Mine skjemaer** med medlemmets to siste skjemainnsendinger og en lenke til **Alle skjemaer**.

Begge er avslått som standard. En seksjon vises bare for medlemmer som er innlogget og har minst én post å vise. Klikk på **Lagre** for å bruke endringene.

## Hvor fanene vises

Fanene du konfigurerer her, vises i **B1.church-PWA-en** som medlemmene installerer fra en hvilken som helst side på `https://yourchurchname.b1.church`. Endringer du gjør på denne siden, vises neste gang et medlem åpner appen.

På en telefon viser fanelinjen nederst **Hjem**, opptil tre av fanene dine og **Mer**. På en datamaskin viser toppmenyen opptil fem. Innebygde skjermer (som Preken, Gaver eller Grupper) får plassene først, og faner av typen **Intern side** fyller ledige plasser. Faner av typen **Ekstern URL** og **Dagens vers** får aldri en plass. Alle faner, også de som ikke får plass, står oppført på siden **Mer** i appen.

Faner plassert inne i en **mappe**-fane er et unntak. De vises bare på mappens egen skjerm, som medlemmene åpner ved å trykke på mappen. Den skjermen viser fanene som bildeflisер når alle har et bilde, og ellers som en liste. En mappe uten faner som et medlem kan se, er skjult for dette medlemmet. Se [Mappefaner](../../b1-church/getting-started/navigating.md#folder-tabs). Se [Navigere i B1App](../../b1-church/getting-started/navigating.md) for hva medlemmene ser.

## Neste steg

- [Kirkeinnstillinger](./church-settings.md) -- Konfigurer informasjon om menigheten og profilen
- [Roller og tillatelser](./roles-permissions.md) -- Administrer tilgang for teamet ditt
