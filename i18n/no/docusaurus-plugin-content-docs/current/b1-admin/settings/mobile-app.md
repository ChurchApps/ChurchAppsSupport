---
title: "Innstillinger for mobilappen"
---

# Innstillinger for mobilappen

<div class="article-intro">

Siden Innstillinger for mobilappen lar deg konfigurere navigasjonsfanene som vises i **B1.church-mobilopplevelsen (PWA)** for medlemmene i menigheten din. Du styrer hvilke faner som er synlige, hvor de lenker til, og hvordan de vises.

</div>

:::info Den opprinnelige B1 Mobile-appen er utfaset
Faner som konfigureres her leveres gjennom [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), som har erstattet den opprinnelige B1 Mobile-appen. Del menighetens installasjonsside — `https://yourchurchname.b1.church/mobile/install` — med medlemmene; den viser dem hvordan de installerer appen på enheten sin, uten nedlasting fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer dine [Kirkeinnstillinger](./church-settings.md) først, inkludert kirkens navn og profilering

</div>

## Åpne navigasjonsinnstillinger

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **Navigasjon** (`/mobile/navigation`).
3. Siden Navigasjon viser appens nåværende faner.

## Legge til en ny fane

1. Klikk på knappen **Legg til fane** øverst på siden.
2. Fyll inn fanedetaljene:
   - **Navn** -- Etiketten som vises på fanen (for eksempel «Preken» eller «Gi»).
   - **Ikon** -- Klikk på ikonvelgeren for å velge et ikon for fanen.
   - **Bilde** -- Klikk på **Velg bilde** (eller **Endre bilde**) for å gi fanen et bilde. Faner med bilde vises som bildeflis på appens startskjerm -- se [Fliser på startskjermen](#home-screen-tiles).
   - **Fanetype** -- Velg fra alternativer som Bibel, Direktesending, Gave, Nettside og flere.
   - **URL** -- Skriv inn nettadressen fanen skal lenke til.
   - **Synlighet** -- Styr hvem som kan se denne fanen (alle, bare medlemmer osv.). For en fane for **Medlemskatalog** styrer dette bare hvem som ser selve fanen; hvem som kan åpne katalogen, settes med **Vis i katalog** på siden Medlemsportal (se [Innstillinger for medlemskatalog og meldinger](#member-directory--messaging-settings)).
3. Klikk på **Lagre fane** for å legge den til i appen.

## Redigere en eksisterende fane

1. Klikk på en eksisterende fane i listen **Appfaner**.
2. Oppdater fanens navn, ikon, URL, type eller synlighetsinnstillinger.
3. Klikk på **Lagre fane** for å bruke endringene.

## Endre rekkefølgen på faner

Du kan endre rekkefølgen fanene vises i mobilappen. Dra og slipp faner i listen for å ordne dem på nytt. Rekkefølgen som vises på denne siden, samsvarer med rekkefølgen medlemmene dine ser i appen.

:::info
Noen faner kan vises automatisk når bestemte vilkår er oppfylt -- for eksempel kan en fane for direktesending vises når en sending er aktiv. Faner du legger til manuelt, gir deg full kontroll over hva medlemmene dine ser til enhver tid.
:::

:::tip
Hold antallet faner overkommelig. Tre til fem faner fungerer godt for de fleste menigheter. For mange faner kan gjøre navigasjonen forvirrende for medlemmene dine.
:::

## Innstillinger for medlemskatalog og meldinger

Elementet **Medlemsportal** i samme seksjon Mobil inneholder innstillingene som styrer medlemskatalogen og private meldinger i B1.church-opplevelsen:

- **Godkjenningsgruppe for katalog** -- Gruppen som gjennomgår oppdateringer i medlemskatalogen, og [forespørsler om sletting av konto](../profile/account-deletion.md), før de trer i kraft.
- **Vis i katalog** -- Hvem som kan åpne medlemskatalogen og hvem som er oppført i den: **Bare administratorer**, **Medlemmer og over** (standard), **Faste deltakere og over**, eller **Besøkende og over**. Personer hvis medlemsstatus er lavere enn nivået du velger, ser ikke katalogen og er ikke oppført i den. **Bare administratorer** stenger katalogen for alle unntatt ansatte med tillatelsen Personer > Vis (en medlemsstatus som Ansatt alene er ikke nok), som alltid kan åpne katalogen og se alle, uansett hva dette er satt til. Gjester er aldri med, siden alle som registrerer seg selv på nettet, starter som gjest.
- **Synlighetsvalg** -- Angir standarden for hele menigheten for medlemmer som ikke har valgt sin egen innstilling ennå. **Adresse**, **Telefonnummer** og **E-post** har hver sin nedtrekksliste, med de samme fem nivåene som er tilgjengelige overalt der synlighet konfigureres:
  - **Alle** -- synlig for alle, inkludert anonyme besøkende
  - **Medlemmer** -- synlig bare for personer med en medlems- eller ansattpost
  - **Bare gruppemedlemmer** -- synlig bare for personer som deler en gruppe med denne personen, pluss ansatte
  - **Mine gruppeledere og ansatte** -- synlig bare for ledere av en gruppe denne personen er med i, pluss ansatte
  - **Bare ansatte** -- synlig bare for ansatte (alle med medlemsstatus Ansatt, eller som har tillatelsen Personer > Vis), og for personen selv

  «Ansatt» på disse nivåene betyr alle med medlemsstatus Ansatt eller med tillatelsen Personer > Vis. Endringer i grupper trer i kraft med en gang: noen som blir med i en gruppe, eller gjøres til gruppeleder, kan se de tilsvarende detaljene **Bare gruppemedlemmer** eller **Mine gruppeledere og ansatte** for medlemmene i den gruppen, uten å logge av og på igjen.

  Medlemmer kan overstyre disse standardene for sin egen post under fanen **Personvern** på profilen sin i B1.church PWA -- se [Redigere profilen din](/docs/b1-church/getting-started/me-page).
- **Minimumsalder for private meldinger** -- En kontroll for barns sikkerhet. B1 åpner ikke en **ny** privat meldingssamtale når en av personene er under denne alderen, basert på fødselsdatoen (rollen i husstanden brukes som reserve når ingen fødselsdato er registrert). Personer under denne alderen er fortsatt fullt synlige i katalogen -- bare direktemeldinger blokkeres, i **begge retninger**, for alle, inkludert ansatte. Gruppesamtaler og meldinger til et barns foreldre fungerer fortsatt. Valgene er Av, 13, 16 eller 18; standarden er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi kontrollen for minimumsalder bygger på fødselsdatoer, må du sørge for at fødselsdatoer er fylt ut for barn i menigheten din. Denne innstillingen hører til samme familie av sikkerhetskontroller for barn som [sikkerhetskontrollene for innsjekking](../attendance/checkin-safety.md).
:::

### Påloggingsmelding på startskjermen

Besøkende som åpner appens [startskjerm](/docs/b1-church/getting-started/navigating#home) uten å logge inn, ser en kort melding -- som standard *«Logg inn for å se gruppene dine, gaver og mer.»* -- ved siden av en knapp **Logg inn**. Innstillingene for **Påloggingsmelding på startskjermen** på samme side for medlemsportalen (`/mobile/b1-mobile`) lar deg endre den:

- **Vis påloggingsmelding på appens startskjerm** -- Slå av dette for å skjule både meldingen og knappen **Logg inn** på startskjermen. Besøkende kan fortsatt logge inn fra appmenyen.
- **Tekst i påloggingsmelding** -- Erstatt standardteksten med din egen melding (opptil 150 tegn). La feltet stå tomt for å bruke standarden. Denne boksen er deaktivert mens meldingen er slått av.

Klikk på **Lagre** for å bruke endringene. En melding **Lagret** bekrefter endringen. Ved lagring oppdateres appens bufrede innstillinger, og endringen vises neste gang startskjermen lastes.

### Fliser på startskjermen

Faner som har et bilde (se **Bilde** under [Legge til en ny fane](#adding-a-new-tab)) vises på appens [startskjerm](/docs/b1-church/getting-started/navigating#home) som bildeflis, i en seksjon med menighetens navn som overskrift. Dette gjelder også en fane for Dagens vers, hvis du gir den et bilde. Fanene med bilde vises fortsatt i fanelinjen også.

Innstillingen **Fliser på startskjermen** på samme side for medlemsportalen (`/mobile/b1-mobile`) styrer hvordan disse flisene er ordnet. Velg en **Layout**:

- **Rutenett** -- To fliser per rad (standard). Når antallet fliser er oddetall, strekker den første flisen seg over hele bredden.
- **Rullende rad** -- Én rad med fliser som medlemmene sveiper sideveis.
- **Rullende (automatisk)** -- Samme sideveis rad, men den beveger seg også av seg selv, og går videre én flis omtrent hvert fjerde sekund og starter på nytt ved slutten. Den stanser mens et medlem trykker på, holder musepekeren over eller tabulerer inn i raden, og fortsetter noen sekunder senere. På enheter som er satt til redusert bevegelse, står raden stille og fungerer som **Rullende rad**.
- **Liste** -- En liste med et lite miniatyrbilde ved siden av navnet på hver fane.

Klikk på **Lagre** for å bruke endringene.

### Seksjoner på startskjermen

Innloggede medlemmer ser alltid sin egen oppmøtehistorikk og innsendte skjemaer på [Me-siden](/docs/b1-church/getting-started/me-page). Bryterne **Seksjoner på startskjermen** på samme side for medlemsportalen (`/mobile/b1-mobile`) kan vise dem på startskjermen også:

- **Vis mitt oppmøte på startsiden** -- Legger til en seksjon **Mitt oppmøte** med hvor mange ganger medlemmet var til stede de siste 90 dagene, de to siste besøkene, og en lenke **Historikk** til hele oppmøtelisten.
- **Vis mine skjemaer på startsiden** -- Legger til en seksjon **Mine skjemaer** med medlemmets to siste skjemainnsendinger og en lenke **Alle skjemaer**.

Begge er av som standard. En seksjon vises bare for medlemmer som er innlogget og har minst én post å vise. Klikk på **Lagre** for å bruke endringene.

## Hvor disse fanene vises

Fanene du konfigurerer her, vises i **B1.church PWA** som medlemmene dine installerer fra en hvilken som helst side på `https://yourchurchname.b1.church`. Endringer du gjør på denne siden, vises neste gang et medlem åpner appen.

På en telefon viser fanelinjen nederst **Hjem**, opptil tre av fanene dine og **Mer**; på en datamaskin viser topptekstlinjen opptil fem. Innebygde skjermer (som Taler, Gaver eller Grupper) får plassene først, og faner for **Intern side** fyller eventuelle ledige plasser. Faner for **Ekstern URL** og **Dagens vers** får aldri en plass. Hver fane, også de som ikke får plass, står oppført på appens side **Mer**. Se [Navigere i B1App](/docs/b1-church/getting-started/navigating) for hva medlemmene ser. (Faner gjengis også av den eldre [B1 Mobile-appen](/docs/b1-mobile/) for medlemmer som fortsatt bruker den, men den appen er utfaset og oppdateres ikke lenger.)

## Neste steg

- [Kirkeinnstillinger](./church-settings.md) -- Konfigurer kirkens informasjon og profilering
- [Roller og tillatelser](./roles-permissions.md) -- Administrer tilgang for teamet ditt
