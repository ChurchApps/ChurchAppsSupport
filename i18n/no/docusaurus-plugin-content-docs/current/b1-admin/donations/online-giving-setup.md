---
title: "Oppsett av nettbasert givning"
---

# Oppsett av nettbasert givning

<div class="article-intro">

B1 Admin integreres med **Stripe**, **PayPal**, **Kingdom Funding** og **Paystack** (for menigheter i Afrika), slik at medlemmene kan gi på nett via B1.church-nettstedet ditt. Når det er konfigurert, vises nettgaver automatisk i gaveregistreringene dine sammen med gaver som registreres manuelt, slik at alt ligger i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [fondene](funds.md) dine, slik at givere kan øremerke gavene sine
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha innloggingsopplysningene dine for B1 Admin klare

</div>

## Sette opp Stripe

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke har en fra før. Sørg for å **aktivere kontoen** og ta den ut av testmodus.
2. I Stripe går du til **Utviklere > API-nøkler**.
3. Kopier **publiserbar nøkkel** (Publishable Key).
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Gå til **Innstillinger** og åpne delen **Givning**.
6. Klikk **Rediger** i delen **Givning**.
7. Sett **Leverandør** til **Stripe**.
8. Lim inn den publiserbare nøkkelen din i feltet **Offentlig nøkkel** (Public Key).
9. Gå tilbake til Stripe og vis den **hemmelige nøkkelen** din (Secret Key). Du kan bare se denne én gang, så lagre en kopi.
10. Lim inn den hemmelige nøkkelen i feltet **Hemmelig nøkkel** (Secret Key) og klikk **Lagre**.

:::warning
Den hemmelige Stripe-nøkkelen din vises bare én gang. Kopier den til et trygt sted før du forlater Stripe-dashbordet. Hvis du mister den, må du lage en ny nøkkel.
:::

## Velge valuta

Etter at du har valgt Stripe som leverandør, vises en rullegardin for **Valuta** ved siden av API-nøklene dine. Velg valutaen som samsvarer med oppgjørsvalutaen til Stripe-kontoen din, slik at gaver belastes riktig.

Støttede valutaer inkluderer USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN og BRL. Du kan bekrefte eller endre standardvalutaen til kontoen din i [Stripe-dashbordet](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her brukes til engangsgaver, gjentakende abonnementer, gebyrberegninger og gaverapporter. Hvis du bytter valuta senere, bruker bare nye gaver og abonnementer den nye valutaen -- eksisterende gjentakende gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Kontroller at Stripe-kontoen din er satt opp til å akseptere valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, vil gaver mislykkes i betalingsprosessen.
:::

## Apple Pay og Google Pay

Menigheter på Stripe får automatisk knapper for Apple Pay og Google Pay på den offentlige givingssiden. Knappene vises over kortfeltene for engangsgaver når giveren har valgt et fond og et beløp, og bare når giverens nettleser eller enhet har en lommebok satt opp. Gjentakende gaver bruker fortsatt kort- eller bankfeltene.

Google Pay krever ingen oppsett. Apple Pay krever at domenet til givingssiden din er registrert hos Stripe; B1 registrerer det første gang givingssiden lastes inn på domenet ditt. Hvis Apple Pay-knappen ikke vises på en iPhone, sjekker du **Innstillinger > Domener for betalingsmetoder** i Stripe-dashbordet og bekrefter at ditt `yoursubdomain.b1.church` (eller egendefinerte) domene er listet og bekreftet.

## Anonyme gaver

Givere på den offentlige givingssiden kan krysse av for **Gi anonymt**. En anonym gave registreres uten giver tilknyttet, går fortsatt til fondet giveren valgte, og vises som **Anonym** i buntene og rapportene dine. Giverens e-postadresse er fortsatt påkrevd, slik at kvitteringen kan sendes, men det opprettes ingen personpost. Anonyme gaver gjelder bare engangsgaver og vises ikke på noen givertjeneste.

## Mislykkede gjentakende gaver

Når en gjentakende gave på Stripe mislykkes (for eksempel på grunn av et utløpt eller avvist kort), vises den mislykkede belastningen under **Gaver > Mislykkede gaver** med giveren, beløpet, datoen og årsaken betalingsløsningen oppga. Klikk **Prøv igjen** for å forsøke belastningen på nytt når giveren har oppdatert betalingsmetoden sin.

B1 sender også giveren en e-post når belastningen mislykkes, og igjen tre og syv dager senere hvis den fortsatt ikke har gått gjennom, med en lenke for å oppdatere betalingsmetoden i B1.church.

:::info
Hvis menigheten din satte opp Stripe før denne funksjonen fantes, åpner du **Innstillinger** > **Givning**, klikker rediger og klikker **Lagre** én gang. Dette oppdaterer Stripe-webhooken, slik at mislykkede belastninger rapporteres til B1.
:::

## Legge til en givingsside på B1.church-nettstedet ditt

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk på **Innstillinger**-ikonet.
3. Klikk **Legg til fane**.
4. Velg **Gave** som type.
5. Skriv inn et navn på fanen (f.eks. «Gi») og klikk **Lagre**.
6. Du kan eventuelt endre fane-ikonet -- skriv «Giv» i ikonsøket for å finne et ikon knyttet til givning.

Givingssiden din er nå i drift. Medlemmer kan besøke den på `yoursubdomain.b1.church/donate`.

## Dele givingslenken din

For å finne givingsadressen din går du til **B1 Admin** og klikker **Innstillinger**-ikonet for å se subdomenet ditt. Givingslenken din har dette formatet:

`https://yoursubdomain.b1.church/donate`

Del denne lenken på nettstedet ditt, i e-poster eller i menighetsbladet, slik at medlemmene vet hvor de kan gi på nett.

### Lenker med forhåndsvalgt fond og beløp

For å sende givere rett til et bestemt fond, går du til **Gaver > Fond** og klikker **Givingslenke** på fondet. Du kan eventuelt skrive inn et beløp, og deretter kopiere lenken. Når en giver åpner den, er fondet og beløpet allerede valgt på givingssiden. Lenken har formen:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

De samme parameterne fungerer i elementet **Gavelenke** i nettsidebyggeren.

## Varsler om gaver

Stripe sender et e-postvarsel hver gang en gave mottas. For å endre e-postadressen for varsler går du til Stripe-dashbordet, klikker profilen din øverst til høyre, velger **Profil** og oppdaterer e-postadressen din.

## Alternativer for behandlingsgebyr

Du kan sette opp givingssiden din slik at givere kan velge å dekke behandlingsgebyrene, slik at menigheten din får hele gavebeløpet. Denne innstillingen administreres i menighetsinnstillingene dine i B1 Admin.

:::tip
Etter oppsettet bør du gjøre en liten testgave for å bekrefte at alt fungerer, før du forteller menigheten om nettbasert givning.
:::

## Sette opp Kingdom Funding

Kingdom Funding er en kristen betalingsleverandør som støtter kredittkort/debetkort og ACH-banktransaksjoner. Hvis menigheten din er registrert hos Kingdom Funding, kan du koble den til som givingsløsning.

:::info
Integrasjonen med Kingdom Funding er for øyeblikket i beta. Kontakt din B1-kontaktperson for å aktivere den for menigheten din.
:::

1. Registrer deg eller logg inn på [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hent din **sikkerhetsnøkkel** (Security Key, offentlig) og **private nøkkel** (Private Key) fra Kingdom Fundings portal for forhandlere.
3. I B1 Admin går du til **Innstillinger**, åpner delen **Givning** og klikker rediger.
4. Sett **Leverandør** til **Kingdom Funding**.
5. Lim inn sikkerhetsnøkkelen din i feltet **Security Key**, og den private nøkkelen i feltet **Private Key**.
6. Sett **Webhook-nøkkelen** du fikk fra Kingdom Funding, og kopier den viste webhook-adressen inn i innstillingene for forhandlere hos Kingdom Funding, slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Lagre.

Når den er koblet til, ser medlemmer en bryter for kort/bank på givingssiden og kan gi med kredittkort eller ACH-overføring.

## PayPal- og Venmo-knapper

Menigheter som bruker **PayPal** som leverandør får knapper for **PayPal** og **Venmo** over kortfeltene på givingssiden for engangsgaver. Givere som klikker på en av dem fullfører betalingen i et PayPal-vindu, og gaven registreres på samme måte som alle andre nettgaver. Venmo vises bare for givere i USA på enheter som PayPal anser som kvalifisert. Gjentakende gaver bruker fortsatt kortfeltene.

## Sette opp Paystack (Afrika)

Stripe åpner ikke kontoer for menigheter i Ghana, Nigeria, Kenya, Sør-Afrika eller Elfenbenskysten. [Paystack](https://paystack.com) gjør det, og den godtar lokale kort, **mobilpenger** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banktransaksjoner og USSD -- givere betaler i din lokale valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrer deg på [paystack.com](https://paystack.com) med menighetens registreringsattest for virksomhet og lokal bankkonto, og fullfør Paystacks aktiveringsgjennomgang (go-live).
2. I Paystack-dashbordet går du til **Innstillinger → API-nøkler og webhooks** og kopierer **offentlig nøkkel** (Public Key) og **hemmelig nøkkel** (Secret Key) (bruk de ekte nøklene, ikke testnøklene).
3. I B1 Admin går du til **Innstillinger**, åpner delen **Givning** og klikker rediger.
4. Sett **Leverandør** til **Paystack**, lim inn den offentlige og den hemmelige nøkkelen, og velg **valutaen** din.
5. Kopier **webhook-adressen** som vises under leverandøren, gå tilbake til Paystack-dashbordet (**Innstillinger → API-nøkler og webhooks**) og lim den inn i feltet **Webhook-URL**. Slik registreres gjentakende gaver og mobilbetalinger.
6. Lagre.

Givere fullfører betalingen i et sikkert Paystack-vindu og kan velge kort, mobilpenger eller banktransaksjon der. Merknader:

- **Gjentakende gaver** krever kort; mobilpenger kan ikke belastes automatisk igjen, så Paystack tillater bare engangsgaver med mobilpenger.
- Gjentakende gaver på Paystack kan avbrytes fra B1, men ikke settes på pause eller redigeres -- avbryt og opprett en ny for å endre beløpet.
- **Behandlingsgebyret** har standardverdier basert på Paystacks satser for lokale kort i valutaen din; rediger dem hvis de avtalte satsene dine er annerledes.

## Neste steg

- Bruk [Stripe-import](stripe-import.md) for å hente nettbaserte transaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [Gaverapportene](donation-reports.md) dine for å bekrefte at nettgaver vises riktig
- Lag [Givertjenester](giving-statements.md) som inkluderer både nettgaver og gaver gitt på andre måter
