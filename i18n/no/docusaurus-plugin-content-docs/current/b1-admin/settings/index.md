---
title: "Innstillinger"
description: "Finn frem i B1 Admins innstillinger: kirkeinfo, merkevare, menighetsenheter, egendefinerte felt, brukerroller og navigasjon i B1.church-appen."
---

# Innstillinger

<div class="article-intro">

Innstillingsseksjonen er der du konfigurerer menighetens konto, merkevare og administrative valg i B1 Admin. Herfra kan du administrere alt fra menighetens navn og subdomene til brukertillatelser og oppsett av mobilappen.

</div>

## Dette finner du her {#what-you-will-find-here}

Innstillingsområdet er organisert i følgende underseksjoner:

1. **Innstillinger** -- Konfigurer menighetens grunnleggende informasjon, subdomene, region (dato- og telefonformat), giving, tekstmeldingsleverandør, fillagring med mer. Se [Kirkeinnstillinger](./church-settings.md) for detaljer. For å bruke ditt eget domenenavn (f.eks. yourchurch.org), se [Eget domene](./custom-domain.md).
2. **Menighetsenheter** -- Legg til og administrer flere fysiske lokasjoner for menigheten din. Når de er opprettet, vises menighetsenheter på personprofiler, i oppsettet for oppmøte og i demografioversikten. Du finner dem som en seksjon på hovedsiden for Innstillinger, ikke som et eget navigasjonspunkt. Se [Menighetsenheter](./campuses.md) for detaljer.
3. **Egendefinerte felt** -- Definer egne felt du vil følge med på for personer (en dato, et tall, et ja/nei-svar eller en nedtrekksliste), og fyll dem deretter inn på profiler og søk på dem. Også dette nås som en seksjon på hovedsiden for Innstillinger. Se [Egendefinerte felt](./custom-fields.md) for detaljer.
4. **Roller** -- Styr hva hver medarbeider og frivillig kan se og endre. Se [Roller og tillatelser](./roles-permissions.md).
5. **E-postmaler** -- Lagre gjenbrukbart e-postinnhold for manuell utsending eller utsending fra en arbeidsflyt. Se [E-postmaler](./email-templates.md) for detaljer.
6. **Revisjonslogg** og **Batcher** -- Gå gjennom endringer som er gjort på tvers av kontoen din ([Revisjonslogg](../reports/audit-log.md)), og gå gjennom eller angre masseimporter og -handlinger (**Batcher**).
7. **Serveradministrasjon** -- Avanserte administrasjonsverktøy, som bare vises for serveradministratorer i ChurchApps.

:::info
**Mobilappinnstillinger** og **Skjemaer** har nå egne navigasjonspunkter på øverste nivå -- **Mobil** og **Skjemaer** (under **Personer**) -- i stedet for å ligge inne i Innstillinger. Se [Innstillinger for mobilappen](./mobile-app.md) og [Opprette skjemaer](/docs/b1-admin/forms/creating-forms) for detaljer.
:::

## Hovedsiden for Innstillinger {#the-main-settings-page}

Når du første gang åpner siden Innstillinger, viser panelet til venstre menighetens **navn**, **subdomene** og adresse, sammen med en lenke **Import/eksport** som åpner verktøyet for import og eksport for å overføre data mellom systemer.

Under dette viser en liste **Konfigurasjon** lenker til hver innstillingsseksjon: **Kirkeinformasjon**, **Generelt**, **Region**, **Giving**, **Tekstmeldinger**, **Fillagring**, **Domener**, **Klassetrinnsopprykk**, **Innsjekking**, **Frivillig påmelding**, **Personvern for giving**, **Menighetsenheter**, **Egendefinerte felt** og **Utvikler**. Hvert punkt viser et kort sammendrag av gjeldende innstilling, og seksjoner som fortsatt må settes opp (for eksempel Giving, Tekstmeldinger eller Domener) er merket med en liten prikk. **Giving** vises bare for personer som kan redigere innstillinger for giving. På telefon er listen skjult; scroll siden for å komme til hver seksjon. Alle seksjonene ligger på én side -- klikk på et navn i listen for å scrolle til det, eller bare scroll ned. Hver seksjon viser de gjeldende innstillingene; klikk på **Rediger** i en seksjon for å endre dem.

Seksjonen **Utvikler** har tre faner: **API-nøkler**, **Webhooks** og **Tilkoblede apper**. Se [API-nøkler](../../developer/api/api-keys.md), [Webhooks](../../developer/api/webhooks.md) og [Tilkoblede apper](../../developer/api/connected-apps.md).

**E-postmaler**, **Revisjonslogg** og **Batcher** er egne sider -- åpne dem fra [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) under **Innstillinger**.

Start med delen **Kirkeinformasjon** for å redigere menighetens navn, adresse og kontaktinformasjon -- se [Kirkeinnstillinger](./church-settings.md). For å administrere brukerroller åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) og velger **Innstillinger > Roller** -- se [Roller og tillatelser](./roles-permissions.md).

:::tip
Begynn med å konfigurere menighetens navn og merkevare under **Kirkeinformasjon**, og sett deretter opp [Roller](./roles-permissions.md) for å invitere teammedlemmene dine med riktig tilgangsnivå.
:::

:::info
For informasjon om hvordan dataene dine er beskyttet, se [Datasikkerhet](./data-security.md).
:::

## Neste steg {#next-steps}

- [Kirkeinnstillinger](./church-settings.md) -- Konfigurer informasjon om menigheten og merkevare
- [Menighetsenheter](./campuses.md) -- Legg til lokasjoner for menigheter med flere steder
- [Roller og tillatelser](./roles-permissions.md) -- Sett opp brukerroller og tilgangskontroll
- [Innstillinger for mobilappen](./mobile-app.md) -- Tilpass navigasjonsfanene og fargene på temaet for B1.church-PWA-en
- [Push-varsler](./mobile-app.md#push-notifications) -- Send eller planlegg push-varsler til brukerne av appen din
- [Datasikkerhet](./data-security.md) -- Lær hvordan dataene dine er beskyttet
