---
title: "Innstillinger for mobilappen"
description: "Konfigurer navigasjonsfanene, flisene på startskjermen, påloggingsmeldingen og personverninnstillingene for medlemskatalogen for B1.church-medlemsappen i B1 Admin."
---

# Innstillinger for mobilappen

<div class="article-intro">

Siden Innstillinger for mobilappen lar deg konfigurere navigasjonsfanene som vises i **B1.church-mobilopplevelsen (PWA)** for medlemmene dine. Du bestemmer hvilke faner som er synlige, hva de lenker til, og hvordan de vises.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="7x2CQG_pH6o" title="Tilpasse menighetens medlemsapp i B1" />

:::info
Faner som settes opp her, vises i B1-appen, som medlemmene kan [installere som en progressiv webapp (PWA)](../../b1-church/getting-started/installing-pwa.md). Del menighetens installasjonsside — `https://yourchurchname.b1.church/mobile/install` — med medlemmene; den veileder dem gjennom installasjonen av appen på enheten sin, uten at det kreves nedlasting fra App Store eller Google Play.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](./roles-permissions.md) hvis du ikke har tilgang.
- Konfigurer [kirkeinnstillingene](./church-settings.md) først, inkludert menighetens navn og merkevare

</div>

## Åpne navigasjonsinnstillinger {#accessing-navigation-settings}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **Navigasjon** (`/mobile/navigation`). Du trenger tillatelsen **Rediger innhold** for å se den.
3. Listen **App-faner** viser de gjeldende fanene i rekkefølge, hver med synlighet. Faner inne i en mappe er innrykket under den.

Menyen Mobil inneholder også **App-tema**, **Medlemsportal**, **B1-innsjekking**, **Etiketter** og **Push-varsler**. App-tema og Medlemsportal er beskrevet nedenfor; se [Push-varsler](#push-notifications) for planlegging av varsler.

## Legge til en ny fane {#adding-a-new-tab}

1. Klikk på knappen **Legg til fane** øverst på siden.
2. Fyll inn detaljene for fanen:
   - **Fanenavn** -- Etiketten som vises på fanen (for eksempel «Preken» eller «Gi»).
   - **Ikon** -- Klikk på ikonvelgeren for å velge et ikon for fanen.
   - **Bilde** -- Klikk på **Velg bilde** (eller **Endre bilde**) for å gi fanen et foto. Faner med foto vises som fliser med bilde på appens startskjerm -- se [Fliser på startskjermen](#home-screen-tiles). For å fjerne et foto klikker du på **Fjern bilde** og lagrer; fanen vises da som en vanlig fane, ikke som en flis på startskjermen.
   - **Fanetype** -- **Bibel**, **Direktesending**, **Dagens vers**, **Preken**, **Innsjekking**, **Gave**, **Medlemskatalog**, **Mine grupper**, **Frivilligmuligheter**, **Tjenesteplaner**, **Påmeldinger**, **Forespørsler**, **Ekstern URL**, **Intern side** eller **Mappe**. **Påmeldinger** åpner medlemmets arrangementspåmeldinger; **Forespørsler** åpner Mine forespørsler, der et medlem kan be om et arrangement og se status på tidligere forespørsler. Sett synlighet til Innloggede brukere eller Medlemmer og ansatte for disse, siden de krever et innlogget medlem.
   - **URL** -- Vises for faner av typen **Ekstern URL**: webadressen fanen åpner.
   - **Side** -- Vises for faner av typen **Intern side**: velg en av nettstedets sider.
   - **Overordnet fane** -- Legg fanen inne i en fane av typen **Mappe**, eller la den stå på **Ingen (øverste nivå)**. Se [Hvor fanene vises](#where-these-tabs-appear).
   - **Synlighet** -- Hvem som kan se fanen: **Alle (inkludert anonyme)**, **Innloggede brukere**, **Medlemmer og ansatte**, **Kun ansatte**, **Medlemmer av tjenesteteam** eller **Bestemte grupper...** (huk deretter av gruppene). For en fane av typen **Medlemskatalog** styrer dette bare hvem som ser selve fanen; hvem som kan åpne katalogen settes med **Vis i katalog** på siden Medlemsportal (se [Innstillinger for medlemskatalog og meldinger](#member-directory--messaging-settings)).
3. Klikk på **Lagre fane** for å legge den til i appen.

## Redigere en eksisterende fane {#editing-an-existing-tab}

1. Klikk på redigeringsikonet (blyanten) på en fane i listen **App-faner**.
2. Oppdater fanens navn, ikon, bilde, type eller synlighet.
3. Klikk på **Lagre fane** for å bruke endringene. For å fjerne fanen klikker du på **Slett fane** i stedet. Hvis du sletter en mappe, flyttes fanene i den tilbake til øverste nivå.

## Endre rekkefølgen på faner {#reordering-tabs}

Du kan endre rekkefølgen fanene vises i mobilappen. Bruk pilene **Flytt opp** og **Flytt ned** på hver fane for å ordne dem på nytt. Faner inne i en mappe flyttes innenfor den mappen. Rekkefølgen som vises på denne siden, er den samme som medlemmene ser i appen.

:::info
Noen faner kan vises automatisk når bestemte vilkår er oppfylt -- for eksempel kan en fane for direktesending vises når en sending pågår. Manuelt tillagte faner gir deg full kontroll over hva medlemmene ser til enhver tid.
:::

:::tip
Hold antall faner håndterbart. Tre til fem faner fungerer godt for de fleste menigheter. For mange faner kan gjøre navigasjonen forvirrende for medlemmene dine.
:::

## App-tema {#app-theme}

**Mobil > App-tema** (`/mobile/theme`) setter fargene som brukes av B1-appen, medlemsportalen og innsjekkingskiosken. Du trenger tillatelsen **Rediger kirkeinnstillinger**.

1. Utvid **Lys modus** eller **Mørk modus**.
2. For hver farge -- **Bakgrunn**, **Flate**, **Primær**, **Primærkontrast** (tekst på knapper og topptekster i primærfarge), **Sekundær** og **Tekstfarge** -- klikker du på fargeprøven for å velge en farge, eller skriver den inn i boksen **Hex**. **Forhåndsvisningen** under viser en topptekst, et kort og en knapp i fargene dine.
3. Klikk på **Lagre**.

Klikk på **Tilbakestill til standard** for å gå tilbake til standardfargene. Egentemaet **Egendefinert** i B1 Admin bruker også fargen **Primær** i lys modus -- se [Administrere profilen din](../profile/managing-profile.md).

## Innstillinger for medlemskatalog og meldinger {#member-directory--messaging-settings}

Punktet **Medlemsportal** i samme del Mobil (`/mobile/b1-mobile`, med tittelen **Portalinnstillinger**) inneholder innstillingene som styrer medlemskatalogen og private meldinger i B1.church-opplevelsen. Du trenger tillatelsen **Rediger kirkeinnstillinger**. Endre en hvilken som helst av innstillingene under og klikk på **Lagre** nederst på siden:

- **Godkjenningsgruppe for katalog** -- Gruppen som gjennomgår oppdateringer i medlemskatalogen, og [forespørsler om sletting av konto](../profile/account-deletion.md), før de trer i kraft.
- **Vis i katalog** -- Hvem som kan åpne medlemskatalogen og hvem som står oppført i den: **Kun administratorer**, **Medlemmer og over** (standard), **Faste deltakere og over** eller **Besøkende og over**. Personer hvis medlemsstatus er lavere enn nivået du velger, ser ikke katalogen og står ikke oppført i den. **Kun administratorer** stenger katalogen for alle unntatt ansatte med tillatelsen Personer > Se (en medlemsstatus som ansatt alene er ikke nok), som alltid kan åpne katalogen og se alle, uansett hva dette er satt til. Gjester tas aldri med, siden alle som registrerer seg selv på nettet starter som gjest.
- **Synlighetsinnstilling** -- Setter standarden for hele menigheten for medlemmer som ikke har valgt sin egen innstilling ennå. **Adresse**, **Telefonnummer** og **E-post** har hver sin nedtrekksliste (hver starter på **Medlemmer**), med de samme fem nivåene som er tilgjengelige overalt der synlighet konfigureres:
  - **Alle** -- synlig for alle, inkludert anonyme besøkende
  - **Medlemmer** -- synlig bare for personer med en registrering som Medlem eller Ansatt
  - **Bare grupper** -- synlig bare for personer som deler en gruppe med denne personen, pluss ansatte
  - **Mine gruppeledere og ansatte** -- synlig bare for ledere av en gruppe denne personen tilhører, pluss ansatte
  - **Kun ansatte** -- synlig bare for ansatte (alle hvis medlemsstatus er Ansatt, eller som har tillatelsen Personer > Se), og for personen selv

  «Ansatte» i disse nivåene betyr alle hvis medlemsstatus er Ansatt, eller som har tillatelsen Personer > Se. Endringer i grupper trer i kraft med en gang: Den som blir med i en gruppe, eller gjøres til gruppeleder, kan se de tilsvarende detaljene for **Bare grupper**- eller **Mine gruppeledere og ansatte**-nivåene til medlemmene i den gruppen, uten å logge av og på igjen.

  Medlemmer kan overstyre disse standardverdiene for sin egen registrering under fanen **Personvern** på profilen sin i B1.church-PWA-en -- se [Redigere profilen din](/docs/b1-church/getting-started/me-page).
- **Minimumsalder for private meldinger** -- En barnesikkerhetsfunksjon. B1 åpner ikke en **ny** privat samtale når en av personene er under denne alderen, basert på fødselsdatoen (rolle i husstanden brukes som reserve når ingen fødselsdato er registrert). Personer under aldersgrensen forblir fullt synlige i katalogen -- bare direkte meldinger blokkeres, i **begge retninger**, for alle, inkludert ansatte. Gruppesamtaler og meldinger til et barns foreldre fungerer fortsatt. Alternativene er Av, 13, 16 eller 18; standarden er **18**. Eksisterende samtaler påvirkes ikke.

:::tip
Fordi kontrollen av minimumsalder bygger på fødselsdatoer, må du sørge for at fødselsdatoer er fylt inn for barn i menigheten din. Denne innstillingen hører til samme familie av barnesikkerhet som [sikkerhetskontrollene for innsjekking](../attendance/checkin-safety.md).
:::

### Påloggingsmelding på startskjermen {#home-screen-sign-in-prompt}

Besøkende som åpner appens [startskjerm](/docs/b1-church/getting-started/navigating#home) uten å logge inn, ser en kort melding -- som standard *«Logg inn for å se gruppene, gavene og mer.»* -- ved siden av en knapp for **Logg inn**. Innstillingene for **påloggingsmelding på startskjermen** på samme side for Medlemsportal (`/mobile/b1-mobile`) lar deg endre den:

- **Vis påloggingsmelding på startskjermen i appen** -- Slå av dette for å skjule både meldingen og knappen **Logg inn** fra startskjermen. Besøkende kan fortsatt logge inn fra appmenyen.
- **Tekst for påloggingsmelding** -- Erstatt standardteksten med din egen melding (opptil 150 tegn). La den stå tom for å bruke standarden. Denne boksen er deaktivert mens meldingen er slått av.

Klikk på **Lagre** for å bruke endringene. En melding om **Lagret** bekrefter endringen. Ved lagring oppdateres appens hurtigbufrede innstillinger, slik at endringen vises neste gang startskjermen lastes.

### Fliser på startskjermen {#home-screen-tiles}

Faner som har et foto (se **Bilde** under [Legge til en ny fane](#adding-a-new-tab)) vises på appens [startskjerm](/docs/b1-church/getting-started/navigating#home) som fliser med bilde, i en seksjon med menighetens navn som overskrift. Dette inkluderer en fane for Dagens vers, hvis du gir den et foto. Fanene med foto vises også i fanelinjen.

Innstillingen **Fliser på startskjermen** på samme side for Medlemsportal (`/mobile/b1-mobile`) styrer hvordan disse flisene er ordnet. Velg et **oppsett**:

- **Rutenett** -- To fliser per rad (standard). Når antallet fliser er oddetall, strekker den første flisen seg over hele bredden.
- **Rulleradd** -- Én rad med fliser som medlemmene sveiper sideveis.
- **Rulling (automatisk)** -- Den samme sideveis raden, men den beveger seg også selv og går videre til en flis omtrent hvert fjerde sekund, og starter igjen fra første flis etter den siste. Den stopper mens et medlem berører, holder musepekeren over eller tabulerer seg inn i raden, og fortsetter noen sekunder senere. På enheter der redusert bevegelse er slått på, står raden stille og fungerer som **Rulleradd**.
- **Liste** -- En liste med et lite fotominiatyrbilde ved siden av hvert fanenavn.
- **Rutenett og liste** -- De tre første fanene med foto som et rutenett, der den første flisen strekker seg over hele bredden, og de neste tre listet under med et lite miniatyrbilde ved siden av hvert navn. Når det er mer enn tre, viser overskriften for seksjonen en lenke **Alle** som åpner appens side **Mer**, som lister alle fanene.
- **Rulling (automatisk) og liste** -- Alle fanene med foto i den selvgående raden beskrevet ovenfor, med de tre første også listet under, og den samme lenken **Alle** når det er mer enn tre.

I begge rulleoppsettene vises det en rad med prikker under flisene når det er flere fliser enn det som får plass på skjermen, én prikk per flis, med prikken for gjeldende flis fylt ut. Medlemmer kan trykke på en prikk for å hoppe til den flisen.

Klikk på **Lagre** for å bruke endringene.

### Seksjoner på startskjermen {#home-screen-sections}

Innloggede medlemmer ser alltid sin egen oppmøtehistorikk og sine innsendte skjemaer på [Meg-siden](/docs/b1-church/getting-started/me-page). Bryterne for **Seksjoner på startskjermen** på samme side for Medlemsportal (`/mobile/b1-mobile`) kan vise dem på startskjermen også:

- **Vis Mitt oppmøte på startskjermen** -- Legger til en seksjon **Mitt oppmøte** med hvor mange ganger medlemmet var til stede de siste 90 dagene, deres to siste besøk, og en lenke **Historikk** til hele oppmøtelisten.
- **Vis Mine skjemaer på startskjermen** -- Legger til en seksjon **Mine skjemaer** med medlemmets to siste skjemainnsendinger og en lenke **Alle skjemaer**.

Begge er av som standard. En seksjon vises bare for medlemmer som er innlogget og har minst én registrering å vise.

- **Vis nyheter på startskjermen** -- Legger til en seksjon **Nyheter** rett under hilsenen, som viser de fem siste publiserte [blogginnleggene](../website/blog.md) dine som fotokort i en rad som beveger seg av seg selv. Når man trykker på et kort, åpnes hele innlegget i appen, og en lenke **Alle nyheter** lister de nyeste innleggene dine. Når den er slått på, lar **Bare denne kategorien** deg velge én blogg-kategori (for eksempel *Kunngjøringer*), slik at bare disse innleggene vises; la den stå på **Alle innlegg** for å vise alt. Nyheter vises for alle som åpner appen, innlogget eller ikke, fordi blogginnlegg er offentlige på nettstedet ditt. Den er av som standard og vises bare når du har minst ett publisert innlegg.

Klikk på **Lagre** for å bruke endringene.

## Push-varsler {#push-notifications}

**Mobil > Push-varsler** (`/mobile/notifications`) sender eller planlegger et push-varsel til personer som har B1-appen installert med varsler slått på. Du trenger **Rediger innhold** for å sende til alle, eller **Rediger gruppemedlemmer** for å sende til en gruppe.

1. Klikk på **Send varsel**.
2. Velg **målgruppen**: **Alle med appen**, eller en av gruppene dine. B1 viser hvor mange personer push-varselet når, og hvor mange som har slått av push; du utelates fra ditt eget push-varsel.
3. Skriv inn en **tittel** (opptil 80 tegn) og **melding** (opptil 240 tegn), og eventuelt en **lenke til åpning eller flyer** og en **bilde-URL** (de samme feltene som for et [gruppevarsel](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Under **Når** lar du **Send nå** stå, eller velger **Planlegg til senere** og velger et **Send kl.**-tidspunkt i fremtiden.
5. Klikk på **Send varsel** (eller **Planlegg varsel**).

Siden lister **planlagte** varsler (med **Rediger**, **Send nå** og **Avbryt** på hvert) og **nylige** med status, for eksempel *Sendt: 12 av 15*, *Avbrutt* eller *Savnet (sendetidspunktet har passert)*. Klikk på **Fjern** for å ta et fullført varsel av listen, eller **Tøm alle** for å fjerne alle sendte, mislykkede og avbrutte. Tidspunkter vises i menighetens [tidssone](./church-settings.md#time-zone), eller din egen datamaskins hvis menigheten ikke har en satt. Hvem som mottar et planlagt varsel, beregnes på nytt når det sendes.

Et varsel som er mer enn 30 minutter forsinket når B1 forsøker å sende det, merkes *Savnet* og sendes ikke; et som mislykkes tre ganger, viser *Mislyktes* med feilmeldingen. Å fjerne et varsel fra listen tar det ikke tilbake fra personer som allerede har fått det. Når et push-varsel ikke har en lenke, åpnes appens varselliste når det gjelder et push for hele menigheten, eller gruppens side når det gjelder et gruppe-push. Medlemmer som har slått av **Kirkekunngjøringer** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md), får ikke disse push-varslene, enten de sendes til alle eller til en gruppe.

## Hvor fanene vises {#where-these-tabs-appear}

Fanene du konfigurerer her, vises i **B1.church-PWA-en** som medlemmene dine installerer fra en hvilken som helst side på `https://yourchurchname.b1.church`. Endringer du gjør på denne siden gjenspeiles neste gang et medlem åpner appen.

På telefon viser fanelinjen nederst **Hjem**, opptil tre av fanene dine, og **Mer**; på datamaskin viser topptekstlinjen opptil fem. Innebygde skjermer (som Preken, Gave eller Grupper) får plassene først, og faner av typen **Intern side** fyller ledige plasser. Faner av typen **Ekstern URL** og **Dagens vers** får aldri en plass. Alle faner, også de som ikke får plass, listes på appens side **Mer**.

Faner som ligger inne i en fane av typen **Mappe**, er et unntak: de vises bare på mappens egen skjerm, som medlemmene åpner ved å trykke på mappen. Denne skjermen viser hver fane som har et bilde, som et bannerbilde i full bredde, med fanene uten bilde listet under dem. En mappe som ikke inneholder faner et medlem kan se, er skjult for det medlemmet. Se [Mappefaner](../../b1-church/getting-started/navigating.md#folder-tabs). Se [Navigere i B1-appen](../../b1-church/getting-started/navigating.md) for hva medlemmene ser.

## Neste steg {#next-steps}

- [Kirkeinnstillinger](./church-settings.md) -- Konfigurer informasjon om menigheten og merkevare
- [Roller og tillatelser](./roles-permissions.md) -- Administrer tilgang for teamet ditt
