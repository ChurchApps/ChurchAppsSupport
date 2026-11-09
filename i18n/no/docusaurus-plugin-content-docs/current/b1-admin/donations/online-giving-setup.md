---
title: "Oppsett av nettbasert giving"
description: "Koble Stripe, PayPal, Kingdom Funding eller Paystack til B1 Admin slik at medlemmene kan gi på nett via B1.church-nettstedet ditt, og gaver synkroniseres til registrene dine."
---

# Oppsett av nettbasert giving

<div class="article-intro">

B1 Admin integreres med **Stripe**, **PayPal**, **Kingdom Funding** og **Paystack** (for menigheter i Afrika), slik at medlemmene kan gi på nett via B1.church-nettstedet ditt. Når det er satt opp, dukker nettdonasjoner automatisk opp i donasjonsregistrene dine sammen med gaver som er registrert for hånd, slik at alt holdes i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [donasjonsfondene](funds.md) dine slik at givere kan knytte gavene sine til dem
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha påloggingsopplysningene dine til B1 Admin klare

</div>

## Sette opp Stripe

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke har en fra før. Husk å **aktivere kontoen** og ta den ut av testmodus.
2. I Stripe går du til **Developers > API Keys** (utviklere > API-nøkler).
3. Kopier din **Publishable Key** (offentlig nøkkel).
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Gå til **Innstillinger** og åpne seksjonen **Giving**.
6. Klikk **Rediger** i seksjonen **Giving**.
7. Sett **Leverandør** til **Stripe**.
8. Lim inn din Publishable Key i feltet **Offentlig nøkkel**.
9. Gå tilbake til Stripe og vis din **Secret Key** (hemmelige nøkkel). Den kan bare vises én gang, så lagre en kopi.
10. Lim inn Secret Key i feltet **Secret Key** og klikk **Lagre**.

:::warning
Stripe-hemmeligheten din (Secret Key) vises bare én gang. Kopier den til et trygt sted før du forlater Stripe-dashbordet. Hvis du mister den, må du lage en ny nøkkel.
:::

## Velge valuta {#choosing-your-currency}

Etter at du har valgt Stripe som leverandør, vises en nedtrekksliste for **Valuta** ved siden av API-nøklene dine. Velg valutaen som tilsvarer Stripe-kontoens oppgjørsvaluta, slik at donasjoner belastes riktig.

Hvis du ikke har lagret en valuta ennå, starter nedtrekkslisten med valutaen for menighetens land fra registreringen, i stedet for amerikanske dollar. Kontroller at den stemmer med Stripe-kontoen din før du lagrer.

Hvis menigheten din ikke tar imot gaver på nett, lar du **Leverandør** stå på **Ingen**, men velger likevel en **valuta** -- listen inneholder da alle valutaer, med merknaden «Valutaen menigheten din fører gaver i.» Gaver du legger inn for hånd i batcher, føres i den valutaen, og giving-summene vises i den.

Støttede valutaer inkluderer USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL og PHP. Du kan bekrefte eller endre standardvalutaen for kontoen din i [Stripe-dashbordet](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her, brukes for engangsdonasjoner, gjentakende abonnementer, gebyrberegninger og donasjonsrapporter. Hvis du bytter valuta senere, vil bare nye donasjoner og abonnementer bruke den nye valutaen -- eksisterende gjentakende gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Sørg for at Stripe-kontoen din er satt opp til å ta imot valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, vil donasjoner mislykkes i kassen.
:::

## Apple Pay og Google Pay

Menigheter på Stripe får automatisk knapper for Apple Pay og Google Pay på den offentlige giving-siden. Knappene vises over kortfeltene for engangsgaver, når giveren har valgt et fond og et beløp, og bare når giverens nettleser eller enhet har en lommebok satt opp. Gjentakende gaver bruker fortsatt kort- eller bankfeltene.

Google Pay krever ingen oppsett. Apple Pay krever at domenet til giving-siden din er registrert hos Stripe; B1 registrerer det første gang giving-siden lastes på domenet ditt. Hvis Apple Pay-knappen ikke vises på en iPhone, sjekk **Innstillinger > Payment method domains** i Stripe-dashbordet og bekreft at `dittunderdomene.b1.church` (eller eget domene) er oppført og bekreftet.

## Anonyme gaver

Givere på den offentlige giving-siden kan krysse av for **Gi anonymt**. En anonym gave registreres uten giver, går fortsatt til fondet giveren valgte, og vises som **Anonym** i batcher og rapporter. Givers e-postadresse er fortsatt påkrevd, slik at kvitteringen kan sendes, men det opprettes ingen personpost. Anonyme gaver gjelder bare engangsgaver og vises ikke på noen gaveoppgave.

## Mislykkede gjentakende gaver

Når en gjentakende gave på Stripe mislykkes (for eksempel et utløpt eller avvist kort), vises den mislykkede belastningen under **Donasjoner > Mislykkede gaver** med giveren, beløpet, datoen og årsaken gatewayen oppga. Klikk **Prøv på nytt** for å forsøke belastningen igjen når giveren har oppdatert betalingsmetoden sin.

B1 sender også giveren en e-post når belastningen mislykkes, og igjen tre og syv dager senere hvis den fortsatt ikke har gått gjennom, med en lenke for å oppdatere betalingsmetoden i B1.church.

:::info
Hvis menigheten din satte opp Stripe før denne funksjonen fantes, åpner du **Innstillinger** > **Giving**, klikker på rediger og klikker **Lagre** én gang. Det oppdaterer Stripe-webhooken slik at mislykkede belastninger rapporteres til B1.
:::

## Legge til en donasjonsside på B1.church-nettstedet ditt

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk på **Innstillinger**-ikonet.
3. Klikk **Legg til fane**.
4. Velg **Donasjon** som type.
5. Skriv inn et navn for fanen (f.eks. «Gi») og klikk **Lagre**.
6. Du kan eventuelt endre ikonet for fanen -- skriv «Giv» i ikonsøket for å finne et giving-relatert ikon.

Donasjonssiden din er nå aktiv. Medlemmene kan besøke den på `dittunderdomene.b1.church/donate`.

## Dele giving-lenken din

For å finne giving-nettadressen din går du til **B1 Admin** og klikker **Innstillinger**-ikonet for å se underdomenet ditt. Donasjonslenken din har dette formatet:

`https://dittunderdomene.b1.church/donate`

Del denne lenken på nettstedet ditt, i e-post eller i menighetsbladet, slik at medlemmene vet hvor de kan gi på nett.

### Lenker med forhåndsvalgt fond og beløp

For å sende givere rett til et bestemt fond, gå til **Donasjoner > Fond** og klikk **Giving-lenke** på fondet. Skriv eventuelt inn et beløp, og kopier deretter lenken. Dialogen viser også en QR-kode for den samme lenken; klikk **Last ned PNG** for å lagre den til menighetsbladet, et lysbilde eller en plakat. Når en giver åpner lenken eller skanner koden, er fondet og beløpet allerede valgt på giving-siden. Lenken har formatet:

`https://dittunderdomene.b1.church/donate?fundId=FUND_ID&amount=25`

De samme parameterne fungerer i elementet **Donasjonslenke** i nettstedbyggeren.

## Donasjonsvarsler

Stripe sender et e-postvarsel hver gang en donasjon mottas. For å endre e-postadressen for varsler, gå til Stripe-dashbordet, klikk profilen din øverst til høyre, velg **Profile** og oppdater e-postadressen din.

## Alternativer for behandlingsgebyr

Du kan sette opp giving-siden din slik at givere valgfritt kan dekke behandlingsgebyrer, slik at menigheten din får hele donasjonsbeløpet. Denne innstillingen administreres i kirkeinnstillingene dine i B1 Admin.

:::tip
Etter oppsettet bør du gjøre en liten testdonasjon for å bekrefte at alt fungerer, før du kunngjør nettbasert giving for menigheten.
:::

## Sette opp Kingdom Funding

Kingdom Funding er en kristen betalingsleverandør som støtter kreditt- og debetkort og ACH-banktransaksjoner. Hvis menigheten din er registrert hos Kingdom Funding, kan du koble den til som giving-gateway.

:::info
Kingdom Funding-integrasjonen er for tiden i beta. Kontakt din B1-kontoansvarlige for å aktivere den for menigheten din.
:::

1. Registrer deg eller logg inn på [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hent din **Security Key** (offentlig) og **Private Key** fra Kingdom Fundings portal for forhandlere.
3. I B1 Admin går du til **Innstillinger**, åpner seksjonen **Giving** og klikker rediger.
4. Sett **Leverandør** til **Kingdom Funding**.
5. Lim inn Security Key i feltet **Security Key** og Private Key i feltet **Private Key**.
6. Angi **Webhook Key** du fikk fra Kingdom Funding, og kopier den viste webhook-nettadressen til innstillingene for forhandleren din hos Kingdom Funding, slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Lagre.

Når det er koblet til, vil medlemmene se en bryter for kort/bank på donasjonssiden og kan gi med kredittkort eller ACH-overføring.

## PayPal- og Venmo-knapper

Menigheter som bruker **PayPal** som leverandør, får knapper for **PayPal** og **Venmo** over kortfeltene på giving-siden for engangsgaver. Givere som klikker på en av dem, fullfører betalingen i et PayPal-vindu, og gaven registreres som alle andre nettdonasjoner. Venmo vises bare for givere i USA på enheter PayPal regner som kvalifiserte. Gjentakende gaver bruker fortsatt kortfeltene.

## Sette opp Paystack (Afrika)

Stripe åpner ikke kontoer for menigheter i Ghana, Nigeria, Kenya, Sør-Afrika eller Elfenbenskysten. [Paystack](https://paystack.com) gjør det, og det godtar lokale kort, **mobilpenger** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banktransaksjoner og USSD -- givere betaler i din lokale valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrer deg på [paystack.com](https://paystack.com) med menighetens registreringsbevis for virksomheten og din lokale bankkonto, og fullfør Paystacks aktiveringsgjennomgang (go-live).
2. I Paystack-dashbordet åpner du **Settings → API Keys & Webhooks** og kopierer **Public Key** og **Secret Key** (bruk de ekte nøklene, ikke testnøklene).
3. I B1 Admin går du til **Innstillinger**, åpner seksjonen **Giving** og klikker rediger.
4. Sett **Leverandør** til **Paystack**, lim inn Public Key og Secret Key, og velg din **valuta**.
5. Kopier **webhook-nettadressen** som vises under leverandøren, gå tilbake til Paystack-dashbordet (**Settings → API Keys & Webhooks**) og lim den inn i feltet **Webhook URL**. Slik blir gjentakende gaver og betalinger med mobilpenger registrert.
6. Lagre.

Givere fullfører betalingen i et sikkert Paystack-vindu og kan velge kort, mobilpenger eller banktransaksjon der. Merk:

- **Gjentakende gaver** krever et kort; mobilpenger kan ikke belastes automatisk på nytt, så Paystack tillater bare engangsgaver med mobilpenger.
- Gjentakende gaver på Paystack kan avbrytes fra B1, men ikke settes på pause eller redigeres -- avbryt og opprett en ny for å endre beløpet.
- Standardene for **Behandlingsgebyr** speiler Paystacks lokale kortsatser for valutaen din; rediger dem hvis dine avtalte satser er annerledes.

## Neste steg

- Bruk [Stripe-import](stripe-import.md) til å hente transaksjoner på nett inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [Donasjonsrapporter](donation-reports.md) for å bekrefte at donasjoner på nett vises riktig
- Lag [Gaveoppgaver](giving-statements.md) som inkluderer både nettdonasjoner og donasjoner som ikke er gjort på nett
