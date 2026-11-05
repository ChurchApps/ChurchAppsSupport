---
title: "Innstillinger for mobilappen"
---

# Innstillinger for mobilappen

<div class="article-intro">

Siden Mobile App Settings lar deg konfigurere navigasjonsfanene som vises i **B1.church-mobilopplevelsen (PWA)** for medlemmene i menigheten din. Du styrer hvilke faner som er synlige, hvor de lenker til, og hvordan de vises.

</div>

## Opplæringsvideo

<YouTube id="ydY7WGK16fE" title="Customizing Your Church's Member App in B1" />

:::info Den opprinnelige B1 Mobile-appen er utfaset
Faner som konfigureres her, leveres gjennom [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), som har erstattet den opprinnelige B1 Mobile-appen. Del menighetens installasjonsside -- `https://yourchurchname.b1.church/mobile/install` -- med medlemmene. Den viser dem hvordan de installerer appen på enheten sin, uten nedlasting fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Edit Church Settings». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer [Kirkeinnstillinger](./church-settings.md) først, inkludert menighetens navn og profilering

</div>

## Åpne navigasjonsinnstillingene

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobile**.
2. Klikk på **Navigation** (`/mobile/navigation`).
3. Siden Navigation viser appens nåværende faner.

## Legge til en ny fane {#adding-a-new-tab}

1. Klikk på knappen **Add Tab** øverst på siden.
2. Fyll inn fanedetaljene:
   - **Name** -- Teksten som vises på fanen (for eksempel «Sermons» eller «Give»).
   - **Icon** -- Klikk på ikonvelgeren for å velge et ikon til fanen.
   - **Image** -- Klikk på **Select Image** (eller **Change Image**) for å gi fanen et bilde. Faner med bilde vises som bildeflis på appens startskjerm -- se [Fliser på startskjermen](#home-screen-tiles).
   - **Tab Type** -- Velg fra alternativer som Bible, Live Stream, Donation, Website og flere.
   - **URL** -- Skriv inn nettadressen fanen skal lenke til.
   - **Visibility** -- Styr hvem som kan se fanen (alle, bare medlemmer osv.). For en fane for **Member Directory** styrer dette bare hvem som ser selve fanen. Hvem som kan åpne katalogen, settes med **Show in Directory** på siden Member portal (se [Innstillinger for medlemskatalog og meldinger](#member-directory--messaging-settings)).
3. Klikk på **Save Tab** for å legge fanen til i appen.

## Redigere en eksisterende fane

1. Klikk på en eksisterende fane i listen **App Tabs**.
2. Oppdater fanens navn, ikon, URL, type eller synlighetsinnstillinger.
3. Klikk på **Save Tab** for å bruke endringene.

## Endre rekkefølgen på faner

Du kan endre rekkefølgen fanene vises i mobilappen. Dra og slipp fanene i listen for å ordne dem på nytt. Rekkefølgen på denne siden samsvarer med rekkefølgen medlemmene dine ser i appen.

:::info
Noen faner kan vises automatisk når bestemte vilkår er oppfylt. For eksempel kan en fane for Live Stream dukke opp når en sending er aktiv. Faner du legger til manuelt, gir deg full kontroll over hva medlemmene dine ser til enhver tid.
:::

:::tip
Hold antall faner håndterlig. Tre til fem faner fungerer godt for de fleste menigheter. For mange faner kan gjøre navigasjonen forvirrende for medlemmene dine.
:::

## Innstillinger for medlemskatalog og meldinger {#member-directory--messaging-settings}

Elementet **Member portal** i samme Mobile-seksjon inneholder innstillingene som styrer medlemskatalogen og private meldinger i B1.church-opplevelsen:

- **Directory Approval Group** -- Gruppen som gjennomgår oppdateringer i medlemskatalogen, og [forespørsler om sletting av konto](../profile/account-deletion.md), før de trer i kraft.
- **Show in Directory** -- Hvem som kan åpne medlemskatalogen, og hvem som står oppført i den: **Admins Only**, **Members and Above** (standard), **Regular Attendees and Above** eller **Visitors and Above**. Personer med et medlemskap under nivået du velger, ser ikke katalogen og er ikke oppført i den. **Admins Only** stenger katalogen for alle unntatt ansatte med tillatelsen People > View (en medlemsstatus som Staff alene er ikke nok). Disse kan alltid åpne katalogen og se alle, uansett hva dette er satt til. Gjester er aldri med, siden alle som registrerer seg selv på nettet, starter som gjester.
- **Visibility Preference** -- Angir standarden for hele menigheten for medlemmer som ennå ikke har valgt sin egen innstilling. **Address**, **Phone Number** og **Email** har hver sin nedtrekksliste, med de samme fem nivåene som finnes overalt der synlighet konfigureres:
  - **Everyone** -- synlig for alle, også anonyme besøkende
  - **Members** -- synlig bare for personer med en Member- eller Staff-post
  - **Groups Only** -- synlig bare for personer som deler en gruppe med denne personen, pluss ansatte
  - **My Group Leaders and Staff** -- synlig bare for ledere av en gruppe denne personen er med i, pluss ansatte
  - **Staff Only** -- synlig bare for ansatte (alle med medlemsstatus Staff, eller med tillatelsen People > View), og for personen selv

  «Staff» på disse nivåene betyr alle med medlemsstatus Staff, eller med tillatelsen People > View. Endringer i grupper trer i kraft med en gang: noen som blir med i en gruppe, eller gjøres til gruppeleder, kan se de tilsvarende detaljene **Groups Only** eller **My Group Leaders and Staff** for medlemmene i den gruppen, uten å logge ut og inn igjen.

  Medlemmer kan overstyre disse standardene for sin egen post under fanen **Privacy** på profilen sin i B1.church PWA. Se [Redigere profilen din](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- En kontroll for barns sikkerhet. B1 åpner ikke en **ny** privat meldingssamtale når en av personene er under denne alderen, basert på fødselsdato. (Husstandsrollen brukes som reserve når det ikke er registrert en fødselsdato.) Personer under denne alderen er fortsatt fullt synlige i katalogen -- bare direktemeldinger blokkeres, i **begge retninger**, for alle, også ansatte. Gruppesamtaler og meldinger til et barns foreldre fungerer fortsatt. Valgene er Off, 13, 16 eller 18. Standarden er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi kontrollen for minimumsalder bygger på fødselsdatoer, må du sørge for at fødselsdatoene er fylt ut for barn i menigheten din. Denne innstillingen hører til samme familie av sikkerhetskontroller for barn som [sikkerhetskontrollene for innsjekking](../attendance/checkin-safety.md).
:::

### Påloggingsmelding på startskjermen {#home-screen-sign-in-prompt}

Besøkende som åpner appens [startskjerm](/docs/b1-church/getting-started/navigating#home) uten å logge inn, ser en kort melding -- som standard *«Sign in to see your groups, giving, and more.»* -- ved siden av en knapp **Sign In**. Innstillingene for **Home screen sign-in prompt** på samme side for Member portal (`/mobile/b1-mobile`) lar deg endre den:

- **Show sign-in prompt on the app home screen** -- Slå av dette for å skjule både meldingen og knappen **Sign In** på startskjermen. Besøkende kan fortsatt logge inn fra appmenyen.
- **Sign-in prompt text** -- Erstatt standardteksten med din egen melding (opptil 150 tegn). La feltet stå tomt for å bruke standarden. Denne boksen er deaktivert mens meldingen er slått av.

Klikk på **Save** for å bruke endringene. En melding **Saved** bekrefter endringen. Ved lagring oppdateres appens bufrede innstillinger, og endringen vises neste gang startskjermen lastes.

### Fliser på startskjermen {#home-screen-tiles}

Faner som har et bilde (se **Image** under [Legge til en ny fane](#adding-a-new-tab)), vises på appens [startskjerm](/docs/b1-church/getting-started/navigating#home) som bildeflis, i en seksjon med menighetens navn som overskrift. Dette gjelder også en fane for Verse of the Day, hvis du gir den et bilde. Fanene med bilde vises fortsatt i fanelinjen også.

Innstillingen **Home screen tiles** på samme side for Member portal (`/mobile/b1-mobile`) styrer hvordan flisene er ordnet. Velg en **Layout**:

- **Grid** -- To fliser per rad (standard). Når antallet fliser er oddetall, strekker den første flisen seg over hele bredden.
- **Scrolling row** -- Én rad med fliser som medlemmene sveiper sideveis.
- **Scrolling (automatic)** -- Den samme sideveis raden, men den beveger seg også av seg selv. Den går videre én flis omtrent hvert fjerde sekund og begynner på nytt ved slutten. Den stanser mens et medlem trykker på raden, holder musepekeren over den eller tabber inn i den, og fortsetter noen sekunder senere. På enheter som er satt til redusert bevegelse, står raden stille og fungerer som **Scrolling row**.
- **List** -- En liste med et lite miniatyrbilde ved siden av navnet på hver fane.

Klikk på **Save** for å bruke endringene.

### Seksjoner på startskjermen {#home-screen-sections}

Innloggede medlemmer ser alltid sin egen oppmøtehistorikk og innsendte skjemaer på [Me-siden](/docs/b1-church/getting-started/me-page). Bryterne **Home screen sections** på samme side for Member portal (`/mobile/b1-mobile`) kan vise dem på startskjermen også:

- **Show My Attendance on Home** -- Legger til en seksjon **My Attendance** med hvor mange ganger medlemmet var til stede de siste 90 dagene, de to siste besøkene, og en lenke **History** til hele oppmøtelisten.
- **Show My Forms on Home** -- Legger til en seksjon **My Forms** med medlemmets to siste innsendte skjemaer og en lenke **All forms**.

Begge er av som standard. En seksjon vises bare for medlemmer som er innlogget og har minst én post å vise. Klikk på **Save** for å bruke endringene.

## Hvor disse fanene vises

Fanene du konfigurerer her, vises i **B1.church PWA** som medlemmene dine installerer fra en hvilken som helst side på `https://yourchurchname.b1.church`. Endringer du gjør på denne siden, vises neste gang et medlem åpner appen.

På en telefon viser fanelinjen nederst **Home**, opptil tre av fanene dine og **More**. På en datamaskin viser topptekstfeltet opptil fem. Innebygde skjermer (som Sermons, Giving eller Groups) får plassene først, og faner av typen **Internal Page** fyller eventuelle ledige plasser. Faner av typen **External URL** og **Verse of the Day** får aldri en plass. Hver fane, også de som ikke får plass, står oppført på appens side **More**. Se [Navigere i B1App](/docs/b1-church/getting-started/navigating) for hva medlemmene ser. (Faner gjengis også av den eldre [B1 Mobile-appen](/docs/b1-mobile/) for medlemmer som fortsatt bruker den, men den appen er utfaset og oppdateres ikke lenger.)

## Neste steg

- [Kirkeinnstillinger](./church-settings.md) -- konfigurer menighetens informasjon og profilering
- [Roller og tillatelser](./roles-permissions.md) -- administrer tilgang for teamet ditt
