---
title: "Initialoppsett"
---

# Initialoppsett

<div class="article-intro">

Hver B1-konto kommer med et nettsted klart til bruk. Denne veiledningen gjennomgår oppsetting av kirkens domene, konfigurering av nettstedets utseende, opprettelse av de første sidene dine og organisering av navigasjonen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en B1.church-konto med administratortilgang
- Hvis du bruker et egendefinert domene, ha påloggingsinformasjonen for DNS-leverandøren din klar (f.eks. GoDaddy, Cloudflare eller AWS)
- Forbered kirkens logo i PNG-format med transparent bakgrunn for best resultat

</div>

## Oppsetting av domenet

Kirken din mottar automatisk et underdomene på B1.church (for eksempel, `yourchurch.b1.church`). Du kan også peke ditt eget egendefinerte domene til B1-nettstedet.

1. Gå til **B1.church Admin** ved å besøke admin.b1.church eller klikk profilrullegardinmenyen og velg **Bytt app**.
2. Åpne **seksjonmenyen** i øvre venstre hjørne (seksjonsnavn med liten pil) og velg **Innstillinger**.
3. Åpne **Kirkeinformasjon**-seksjonen for å vise underdomenet. Sett det til noe kort og gjenkjennelig uten mellomrom.
4. Hvis du vil bruke et egendefinert domene, logger du inn på DNS-leverandøren din (for eksempel GoDaddy, Cloudflare eller AWS) og legger til to poster:
   - En **A-post** for rotdomenet som peker på `3.23.251.61`
   - En **CNAME-post** for `www` som peker på `proxy.b1.church`
5. Gå tilbake til B1.church Admin, legg til det egendefinerte domenet i listen, og klikk **Legg til** og deretter **Lagre**. Nettstedet vil være tilgjengelig fra det egendefinerte domenet innen noen få minutter.

:::tip
Hvis du ikke ser Innstillinger-alternativet, ber du personen som satte opp kirkekontoen din om å gi deg tillatelsen "Rediger kirkeinnstillinger". Se [Roller og tillatelser](../settings/roles-permissions.md) for detaljer.
:::

## Opprettelse av den første siden

1. I B1 Admin klikker du **Nettsted** i venstre meny for å åpne Nettsideperspektivet.
2. Klikk **Legg til side** i øvre høyre hjørne.
3. Velg **Blank** som sidetype og gi den navnet "Hjem."
4. Klikk **Sideinnstillinger** og sett URL-banen til `/` (en skråstrek uten tekst) for hjemmesiden. Andre sider bruker `/page-name`.
5. Klikk **Rediger innhold** for å begynne å bygge. Hver side må begynne med en **Seksjon** -- dette er beholderen for alle andre elementer.
6. Etter å ha lagt til en seksjon, klikk **Legg til innhold** igjen for å sette inn tekst, bilder, videoer, kort, skjemaer og mer ved å dra dem inn i seksjonen.

:::info
For detaljerte instruksjoner om arbeid med sider og navigasjon, se [Administrering av sider](managing-pages). For en fullstendig guide til den visuelle editoren, se [Bruk av sideeditoren](page-editor).
:::

## Konfigurering av nettstedets utseende

1. Fra Nettsideperspektivet klikker du **Utseende**-fanen øverst.
2. Bruk **Fargepaletten** for å sette merkevarefarger for primær, sekundær og aksentfarger.
3. Under **Typografiinnstillinger** velger du skrifter for overskrifter og brødtekst fra skriftleseren.
4. Last opp kirkens logo under **Logo** i Stilinnstillinger. Gi både en versjon for lys og en for mørk bakgrunn.
5. Konfigurer **Nettstedsfooter** med kirkens kontaktinformasjon og lenker.

:::info
Endringer du gjør under Utseende gjelder hele nettstedet. Se siden [Utseende](appearance) for detaljerte instruksjoner for hver innstilling.
:::

## Oppsetting av navigasjon

Navigasjonslenkene dine vises i Nettsideperspektivet. For å organisere dem:

1. Klikk **Legg til** for å opprette en ny navigasjonslenke og pek den til en av sidene dine.
2. Dra og slipp lenker for å sortere dem eller neste dem under overordnede elementer.
3. Forhåndsvis nettstedet for å bekrefte at navigasjonen ser riktig ut.

## Neste steg

- [Administrering av sider](managing-pages) -- Lær hvordan du arbeider med sider og navigasjon i detalj
- [Utseende](appearance) -- Fin-justering av farger, skrifter og layout på nettstedet
- [Filer](files) -- Last opp bilder og dokumenter for nettstedet
