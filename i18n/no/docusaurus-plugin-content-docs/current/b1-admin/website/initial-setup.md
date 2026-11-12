---
title: "Komme i gang med B1 Admin-nettstedet ditt"
sidebar_label: "Førstegangsoppsett"
description: "Sett opp menighetens nettsted i B1 Admin: koble et subdomene eller eget domene, lag hjemmesiden din, velg merkevarefarger og logo, og bygg navigasjonen."
---

# Førstegangsoppsett

<div class="article-intro">

Hver B1-konto kommer med et nettsted klart til bruk. Denne veiledningen går deg gjennom oppsett av menighetens domene, konfigurering av nettstedets utseende, opprettelse av de første sidene og organisering av navigasjonen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en B1.church-konto med administratortilgang
- Hvis du bruker et eget domene, ha innloggingsopplysningene til DNS-leverandøren din klare (f.eks. GoDaddy, Cloudflare eller AWS)
- Klargjør menighetens logo i PNG-format med gjennomsiktig bakgrunn for best resultat

</div>

## Sette opp domenet ditt {#setting-up-your-domain}

Menigheten din får automatisk et subdomene på B1.church (for eksempel `yourchurch.b1.church`). Du kan også peke ditt eget domene til B1-nettstedet ditt.

1. Gå til **B1.church Admin** ved å besøke admin.b1.church, eller klikk på profilrullegardinen og velg **Bytt app**.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Innstillinger** og klikk på **Innstillinger**.
3. Åpne delen **Kirkeinformasjon** for å se subdomenet ditt. Sett det til noe kort og gjenkjennelig uten mellomrom.
4. For å bruke et eget domene logger du inn hos DNS-leverandøren din (for eksempel GoDaddy, Cloudflare eller AWS) og legger til to poster:
   - En **A-post** for rotdomenet ditt som peker til `3.23.251.61`
   - En **CNAME-post** for `www` som peker til `proxy.b1.church`
5. Gå tilbake til B1.church Admin, åpne delen **Domener** på samme side for Innstillinger, legg til det egne domenet ditt i listen, og klikk på **Legg til** og deretter **Lagre**. Nettstedet ditt vil være tilgjengelig på det egne domenet innen noen få minutter.

:::tip
Hvis du ikke ser alternativet Innstillinger, be personen som satte opp menighetskontoen din om å gi deg tillatelsen «Rediger kirkeinnstillinger». Se [Roller og tillatelser](../settings/roles-permissions.md) for detaljer.
:::

## Opprette den første siden din {#creating-your-first-page}

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Nettside** og klikker på **Sider**.
2. Klikk på **Legg til side** øverst til høyre.
3. Velg **Tom** som sidetype, skriv inn «Hjem» som **sidetittel**, og klikk på **Lagre**.
4. Klikk på **Sideinnstillinger** på den nye sidens rad og endre **URL-sti** til `/` (en skråstrek uten tekst) for hjemmesiden din. Andre sider bruker `/page-name`.
5. Klikk på **Rediger innhold** for å begynne å bygge. Hver side må starte med en **seksjon** -- dette er beholderen for alle andre elementer. Klikk på **Legg til innhold** og dra **Seksjon** inn på siden, og velg deretter et ferdig seksjonsoppsett eller **Tom seksjon**.
6. Etter at du har lagt til en seksjon, klikker du på **Legg til innhold** igjen for å sette inn tekst, bilder, videoer, kort, skjemaer og mer ved å dra dem inn i seksjonen din.

:::info
For detaljerte instruksjoner om arbeid med sider og navigasjon, se [Administrere sider](./managing-pages.md). For en fullstendig veiledning til den visuelle editoren, se [Bruke sideeditoren](./page-editor.md).
:::

## Konfigurere nettstedets utseende {#configuring-site-appearance}

1. I Hurtigmenyen velger du **Nettside > Utseende**.
2. Bruk **Fargepalett** til å sette merkevarefargene dine -- de lyse grunnnyansene, aksent og mørke nyanser, samt farger for primære og sekundære knapper -- og klikk deretter på **Lagre palett**.
3. Under **Skrifter** velger du overskrifts- og brødtekstskriftene dine fra skriftvelgeren og klikker på **Lagre skrifter**.
4. Last opp menighetens logo under **Logo** i Stilinnstillinger. Oppgi både en versjon for lys bakgrunn og en for mørk bakgrunn, og klikk deretter på **Lagre endringer**.
5. Klikk på **Bunntekst** for å åpne bunnteksten i blokkeditoren, og legg til menighetens kontaktinformasjon og lenker.

:::info
Endringer du gjør under Utseende gjelder for hele nettstedet ditt. Se siden [Utseende](./appearance.md) for detaljerte instruksjoner om hver innstilling.
:::

## Sette opp navigasjonen {#setting-up-navigation}

Navigasjonslenkene dine vises i visningen Sider. Slik organiserer du dem:

1. I panelet **Hovednavigasjon** klikker du på **Legg til**, skriver inn **lenketeksten** og sidens sti (for eksempel `/about`) som **URL**, og klikker på **Lagre**.
2. Dra og slipp lenker for å endre rekkefølgen eller nøste dem under overordnede elementer.
3. Forhåndsvis nettstedet ditt for å bekrefte at navigasjonen ser riktig ut.

## Neste steg {#next-steps}

- [Administrere sider](./managing-pages.md) -- Lær mer om å arbeide med sider og navigasjon i detalj
- [Utseende](./appearance.md) -- Finjuster nettstedets farger, skrifter og oppsett
- [Filer](./files.md) -- Last opp bilder og dokumenter til nettstedet ditt
