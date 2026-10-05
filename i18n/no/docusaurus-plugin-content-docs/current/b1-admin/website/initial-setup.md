---
title: "Førstegangsoppsett"
---

# Førstegangsoppsett

<div class="article-intro">

Alle B1-kontoer kommer med et nettsted som er klart til bruk. Denne veiledningen tar deg gjennom oppsett av kirkens domene, utseendet på nettstedet, de første sidene og organiseringen av navigasjonen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en B1.church-konto med administratortilgang
- Hvis du bruker et eget domene, må du ha innloggingsopplysningene til DNS-leverandøren klare (for eksempel GoDaddy, Cloudflare eller AWS)
- Gjør kirkens logo klar i PNG-format med gjennomsiktig bakgrunn for best resultat

</div>

## Sette opp domenet

Kirken din får automatisk et underdomene på B1.church (for eksempel `yourchurch.b1.church`). Du kan også la ditt eget domene peke til B1-nettstedet.

1. Gå til **B1.church Admin** ved å besøke admin.b1.church eller ved å klikke på profilmenyen og velge **Bytt app**.
2. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Innstillinger** og klikk på **Innstillinger**.
3. Åpne delen **Kirkeinformasjon** for å se underdomenet ditt. Velg noe kort og lett gjenkjennelig uten mellomrom.
4. Hvis du vil bruke et eget domene, logger du inn hos DNS-leverandøren din (for eksempel GoDaddy, Cloudflare eller AWS) og legger til to oppføringer:
   - En **A-oppføring** for rotdomenet som peker til `3.23.251.61`
   - En **CNAME-oppføring** for `www` som peker til `proxy.b1.church`
5. Gå tilbake til B1.church Admin, legg til det egne domenet i listen og klikk på **Legg til** og deretter **Lagre**. Nettstedet blir tilgjengelig fra ditt eget domene i løpet av få minutter.

:::tip
Hvis du ikke ser alternativet Innstillinger, ber du personen som opprettet kirkekontoen om å gi deg tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](../settings/roles-permissions.md) for mer informasjon.
:::

## Opprette den første siden

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), utvid **Nettsted** og klikk på **Sider**.
2. Klikk på **Legg til side** øverst til høyre.
3. Velg **Tom** som sidetype og gi den navnet «Hjem».
4. Klikk på **Sideinnstillinger** og sett URL-banen til `/` (en skråstrek uten tekst) for hjemmesiden. Andre sider bruker `/sidenavn`.
5. Klikk på **Rediger innhold** for å begynne å bygge. Hver side må starte med en **Seksjon** -- dette er beholderen for alle andre elementer.
6. Når du har lagt til en seksjon, klikker du på **Legg til innhold** igjen for å sette inn tekst, bilder, videoer, kort, skjemaer og mer ved å dra dem inn i seksjonen.

:::info
Du finner en detaljert veiledning om sider og navigasjon under [Administrere sider](managing-pages). En full gjennomgang av den visuelle redigeringen finner du under [Bruke sideredigeringen](page-editor).
:::

## Konfigurere utseendet på nettstedet

1. Velg **Nettsted > Utseende** i Jump-menyen.
2. Bruk **Fargepalett** til å angi profilfargene for primære, sekundære og aksenttoner.
3. Under **Typografiinnstillinger** velger du skrifttyper for overskrifter og brødtekst i skriftleseren.
4. Last opp kirkens logo under **Logo** i Stilinnstillinger. Legg inn både en versjon for lys bakgrunn og en for mørk bakgrunn.
5. Sett opp **Nettstedets bunntekst** med kirkens kontaktinformasjon og lenker.

:::info
Endringer du gjør under Utseende, gjelder hele nettstedet. Se siden [Utseende](appearance) for en detaljert veiledning til hver innstilling.
:::

## Sette opp navigasjon

Navigasjonslenkene dine vises i visningen Nettstedssider. Slik organiserer du dem:

1. Klikk på **Legg til** for å opprette en ny navigasjonslenke og la den peke til en av sidene dine.
2. Dra og slipp lenker for å endre rekkefølgen eller legge dem under overordnede elementer.
3. Forhåndsvis nettstedet for å kontrollere at navigasjonen ser riktig ut.

## Neste steg

- [Administrere sider](managing-pages) -- Lær mer om sider og navigasjon
- [Utseende](appearance) -- Finjuster farger, skrifttyper og oppsett
- [Filer](files) -- Last opp bilder og dokumenter til nettstedet
