---
title: "Innstillinger for mobilappen"
---

# Innstillinger for mobilappen {#mobile-app-settings}

<div class="article-intro">

Siden Innstillinger for mobilappen lar deg konfigurere navigasjonsfanene som vises i **B1.church-mobilopplevelsen (PWA)** for medlemmene i kirken din. Du bestemmer hvilke faner som er synlige, hvor de lenker til, og hvordan de vises.

</div>

:::info Den opprinnelige B1 Mobile-appen er utfaset
Faner som konfigureres her leveres gjennom [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), som har erstattet den opprinnelige B1 Mobile-appen. Del installasjonssiden til kirken din – `https://dinkirke.b1.church/mobile/install` – med medlemmene; den viser dem hvordan de installerer appen på enheten sin, uten nedlasting fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer [Kirkeinnstillinger](./church-settings.md) først, inkludert kirkens navn og profilering

</div>

## Åpne navigasjonsinnstillingene {#accessing-navigation-settings}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **Navigasjon** (`/mobile/navigation`).
3. Siden Navigasjon viser de gjeldende appfanene dine.

## Legge til en ny fane {#adding-a-new-tab}

1. Klikk på knappen **Legg til fane** øverst på siden.
2. Fyll inn detaljene for fanen:
   - **Navn** – teksten som vises på fanen (for eksempel «Preken» eller «Gi»).
   - **Ikon** – klikk på ikonvelgeren for å velge et ikon for fanen.
   - **Bilde** – klikk på **Velg bilde** (eller **Endre bilde**) for å gi fanen et bilde. Faner med bilde vises som bildeflis på appens startskjerm – se [Fliser på startskjermen](#home-screen-tiles).
   - **Fanetype** – velg fra alternativer som Bibel, Direktesending, Gave og Nettside, med mer.
   - **URL** – skriv inn webadressen fanen skal lenke til.
   - **Synlighet** – styr hvem som kan se fanen (alle, bare medlemmer osv.). For en fane for **Medlemskatalog** styrer dette bare hvem som ser selve fanen; hvem som kan åpne katalogen, settes av **Vis i katalog** på siden Medlemsportal (se [Innstillinger for medlemskatalog og meldinger](#member-directory--messaging-settings)).
3. Klikk på **Lagre fane** for å legge den til i appen.

## Redigere en eksisterende fane {#editing-an-existing-tab}

1. Klikk på en eksisterende fane i listen **Appfaner**.
2. Oppdater fanens navn, ikon, URL, type eller synlighetsinnstillinger.
3. Klikk på **Lagre fane** for å bruke endringene.

## Endre rekkefølgen på faner {#reordering-tabs}

Du kan endre rekkefølgen fanene vises i i mobilappen. Dra og slipp fanene i listen for å flytte dem. Rekkefølgen på denne siden samsvarer med rekkefølgen medlemmene dine ser i appen.

:::info
Noen faner kan vises automatisk når bestemte forhold er oppfylt – for eksempel kan en fane for Direktesending dukke opp når en sending er aktiv. Faner du legger til manuelt, gir deg full kontroll over hva medlemmene dine ser til enhver tid.
:::

:::tip
Hold antall faner håndterlig. Tre til fem faner fungerer bra for de fleste kirker. For mange faner kan gjøre navigasjonen forvirrende for medlemmene dine.
:::

## Innstillinger for medlemskatalog og meldinger {#member-directory--messaging-settings}

Elementet **Medlemsportal** i samme Mobil-del inneholder innstillingene som styrer medlemskatalogen og privat meldingsutveksling i B1.church-opplevelsen:

- **Godkjenningsgruppe for katalog** – gruppen som gjennomgår oppdateringer i medlemskatalogen, og [forespørsler om sletting av konto](../profile/account-deletion.md), før de trer i kraft.
- **Vis i katalog** – hvem som kan åpne medlemskatalogen og hvem som står oppført i den: **Kun ansatte**, **Medlemmer og ansatte** (standard), **Faste deltakere og oppover** eller **Alle (inkludert besøkende)**. Personer med en medlemsstatus under nivået du velger, ser ikke katalogen og står ikke oppført i den. Ansatte med tillatelsen Personer > Vis kan alltid åpne katalogen og se alle, uansett hva dette er satt til.
- **Synlighetsvalg** – setter standarden for hele kirken for medlemmer som ikke har valgt sin egen innstilling ennå. **Adresse**, **Telefonnummer** og **E-post** har hver sin nedtrekksliste, med de samme fem nivåene som brukes overalt der synlighet konfigureres:
  - **Alle** – synlig for alle, inkludert anonyme besøkende
  - **Medlemmer** – synlig bare for personer med en post som medlem eller ansatt
  - **Bare grupper** – synlig bare for personer som deler en gruppe med denne personen
  - **Mine gruppeledere og ansatte** – synlig bare for ledere av en gruppe denne personen er med i, pluss ansatte
  - **Kun ansatte** – synlig bare for ansatte med tillatelsen Personer > Vis, og for personen selv

  Medlemmer kan overstyre disse standardene for sin egen post under fanen **Personvern** på profilen sin i B1.church PWA – se [Redigere profilen din](/docs/b1-church/getting-started/me-page).
- **Minimumsalder for private meldinger** – en kontroll for barnesikkerhet. B1 åpner ikke en **ny** privat meldingssamtale når en av partene er under denne alderen, basert på fødselsdato (rollen i husstanden brukes som reserve når ingen fødselsdato er registrert). Personer under alderen er fortsatt fullt synlige i katalogen – bare direkte meldinger blokkeres, i **begge retninger**, for alle, også ansatte. Gruppesamtaler og meldinger til et barns foreldre fungerer fortsatt. Valgene er Av, 13, 16 eller 18; standarden er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi sjekken for minimumsalder bygger på fødselsdatoer, må du sørge for at fødselsdatoene er fylt ut for barna i menigheten din. Denne innstillingen hører til samme gruppe som [sikkerhetskontrollene for innsjekk](../attendance/checkin-safety.md).
:::

### Påloggingsmelding på startskjermen {#home-screen-sign-in-prompt}

Besøkende som åpner appens [startskjerm](/docs/b1-church/getting-started/navigating#home) uten å logge inn, ser en kort melding – som standard *«Logg inn for å se gruppene dine, gavene dine og mer.»* – ved siden av en knapp **Logg inn**. Innstillingene for **Påloggingsmelding på startskjermen** på samme side i Medlemsportal (`/mobile/b1-mobile`) lar deg endre den:

- **Vis påloggingsmelding på startskjermen** – slå dette av for å skjule både meldingen og knappen **Logg inn** fra startskjermen. Besøkende kan fortsatt logge inn fra appmenyen.
- **Tekst i påloggingsmelding** – erstatt standardteksten med din egen melding (opptil 150 tegn). La feltet stå tomt for å bruke standarden. Dette feltet er deaktivert mens meldingen er slått av.

Klikk på **Lagre** for å bruke endringene. Ved lagring oppdateres appens hurtigbufrede innstillinger, så endringen vises neste gang startskjermen lastes.

### Fliser på startskjermen {#home-screen-tiles}

Faner som har et bilde (se **Bilde** under [Legge til en ny fane](#adding-a-new-tab)) vises på appens [startskjerm](/docs/b1-church/getting-started/navigating#home) som bildeflis, i en seksjon med kirkens navn som overskrift. Dette gjelder også en fane for Dagens vers, hvis du gir den et bilde. Faner med bilde vises i tilfelle også i fanelinjen.

Innstillingen **Fliser på startskjermen** på samme side i Medlemsportal (`/mobile/b1-mobile`) styrer hvordan disse flisene er ordnet. Velg et **Oppsett**:

- **Rutenett** – to fliser per rad (standard). Når antallet fliser er oddetall, strekker den første flisen seg over hele bredden.
- **Rulleende rad** – én rad med fliser som medlemmene sveiper sideveis.
- **Liste** – en liste med en liten bildeminiatyr ved siden av navnet på hver fane.

Klikk på **Lagre** for å bruke endringene.

## Hvor disse fanene vises {#where-these-tabs-appear}

Fanene du konfigurerer her, vises i **B1.church PWA** som medlemmene dine installerer fra en hvilken som helst side på `https://dinkirke.b1.church`. Endringer du gjør på denne siden vises neste gang et medlem åpner appen.

På en telefon viser fanelinjen nederst **Hjem**, opptil tre av fanene dine og **Mer**; på en datamaskin viser headeren opptil fem. Innebygde skjermer (som Preken, Gaver eller Grupper) får plassene først, og faner av typen **Intern side** fyller ledige plasser. Faner av typen **Ekstern URL** og **Dagens vers** får aldri en plass. Alle faner, også de som ikke får plass, vises på siden **Mer** i appen. Se [Navigere i B1App](/docs/b1-church/getting-started/navigating) for hva medlemmene ser. (Faner gjengis også av den eldre [B1 Mobile-appen](/docs/b1-mobile/) for medlemmer som fortsatt bruker den, men den appen er utfaset og oppdateres ikke lenger.)

## Neste steg {#next-steps}

- [Kirkeinnstillinger](./church-settings.md) – konfigurer kirkeinformasjon og profilering
- [Roller og tillatelser](./roles-permissions.md) – administrer tilgang for teamet ditt
