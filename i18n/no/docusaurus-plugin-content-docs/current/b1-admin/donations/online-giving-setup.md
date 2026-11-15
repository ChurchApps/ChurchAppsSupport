---
title: "Oppsett av nettbasert giving"
description: "Koble Stripe, Kingdom Funding eller Paystack til B1 Admin slik at medlemmer kan gi på nett via B1.church-nettstedet ditt, og gaver synkroniseres til registreringene dine."
---

# Oppsett av nettbasert giving

<div class="article-intro">

B1 Admin samarbeider med **Stripe**, **Kingdom Funding** og **Paystack** (for menigheter i Afrika), slik at medlemmene dine kan gi på nett via B1.church-nettstedet ditt. Når dette er satt opp, dukker nettgaver automatisk opp i gaveregistreringene dine sammen med gaver som er lagt inn manuelt, og alt ligger i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp dine [gavefond](funds.md), slik at givere kan bestemme hvor gavene skal gå
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha påloggingsopplysningene dine til B1 Admin klare

</div>

## Sette opp Stripe {#setting-up-stripe}

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke har en fra før. Sørg for å **aktivere kontoen din** og ta den ut av testmodus.
2. I Stripe går du til **Developers > API Keys**.
3. Kopier din **Publishable Key**.
4. Logg inn i [B1 Admin](https://admin.b1.church/).
5. Gå til **Settings** og åpne seksjonen **Giving**.
6. Klikk **Edit** i seksjonen **Giving**.
7. Sett **Provider** til **Stripe**.
8. Lim inn Publishable Key i feltet **Public Key**.
9. Gå tilbake til Stripe og vis din **Secret Key** (den kan bare vises én gang, så lagre en kopi).
10. Lim inn Secret Key i feltet **Secret Key** og klikk **Save**.

:::warning
Stripe-hemmeligheten din vises bare én gang. Kopier den til et trygt sted før du forlater Stripe-dashbordet. Hvis du mister den, må du lage en ny nøkkel.
:::

## Velge valuta {#choosing-your-currency}

Etter at du har valgt Stripe som leverandør, vises en nedtrekksliste **Currency** ved siden av API-nøklene dine. Velg valutaen som samsvarer med oppgjørsvalutaen til Stripe-kontoen din, slik at gavene belastes riktig.

Hvis du ikke har lagret en valuta ennå, starter nedtrekkslisten på valutaen i landet til menigheten din fra registreringen, i stedet for amerikanske dollar. Kontroller at den stemmer med Stripe-kontoen din før du lagrer.

Hvis menigheten din ikke tar imot gaver på nett, lar du **Provider** stå på **None** og velger likevel en **Currency** – listen inneholder da alle valutaer, med merknaden «The currency your church records gifts in.» Gaver du legger inn for hånd i batcher, registreres i den valutaen, og giving-summene vises i den.

Støttede valutaer inkluderer USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL og PHP. Du kan bekrefte eller endre standardvalutaen for Stripe-kontoen din i [Stripe-dashbordet](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her, brukes for engangsgaver, gjentakende abonnementer, gebyrberegninger og gaverapporter. Hvis du bytter valuta senere, bruker bare nye gaver og abonnementer den nye valutaen – eksisterende gjentakende gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Sørg for at Stripe-kontoen din er satt opp til å ta imot valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, vil gaver mislykkes ved kassen.
:::

## Apple Pay og Google Pay {#apple-pay-and-google-pay}

Menigheter på Stripe får automatisk knapper for Apple Pay og Google Pay på den offentlige giving-siden. Knappene vises over kortfeltene for engangsgaver når giveren har valgt et fond og et beløp, og bare når giverens nettleser eller enhet har en lommebok satt opp. Gjentakende gaver bruker fortsatt kort- eller bankfeltene.

Google Pay krever ingen oppsett. Apple Pay krever at domenet til giving-siden din er registrert hos Stripe; B1 registrerer det første gangen giving-siden lastes på domenet ditt. Hvis Apple Pay-knappen ikke vises på en iPhone, sjekk **Settings > Payment method domains** i Stripe-dashbordet og bekreft at `yoursubdomain.b1.church` (eller ditt eget domene) står på listen og er verifisert.

## Anonyme gaver {#anonymous-gifts}

Givere på den offentlige giving-siden kan krysse av for **Give anonymously**. En anonym gave registreres uten giver, går fortsatt til fondet giveren valgte, og vises som **Anonymous** i batcher og rapporter. Giverens e-postadresse er fortsatt påkrevd, slik at kvitteringen kan sendes, men det opprettes ingen personpost. Anonyme gaver gjelder bare engangsgaver, og de vises ikke på noen gaveoversikt.

## Mislykkede gjentakende gaver {#failed-recurring-gifts}

Når en gjentakende gave på Stripe mislykkes (for eksempel på grunn av et utløpt eller avslått kort), vises den mislykkede belastningen under **Donations > Failed Gifts** med giveren, beløpet, datoen og årsaken som betalingsløsningen oppga. Klikk **Retry** for å prøve belastningen på nytt når giveren har oppdatert betalingsmetoden sin.

B1 sender også giveren en e-post når belastningen mislykkes, og igjen tre og syv dager senere hvis den fortsatt ikke har gått gjennom, med en lenke for å oppdatere betalingsmetoden i B1.church.

:::info
Hvis menigheten din satte opp Stripe før denne funksjonen fantes, åpner du **Settings** > **Giving**, klikker edit og klikker **Save** én gang. Dette oppdaterer Stripe-webhooken slik at mislykkede belastninger rapporteres til B1.
:::

## Legge til en giving-side på B1.church-nettstedet ditt {#adding-a-donation-page-to-your-b1church-site}

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk på ikonet **Settings**.
3. Klikk **Add Tab**.
4. Velg **Donation** som type.
5. Skriv inn et navn på fanen (f.eks. «Gi») og klikk **Save**.
6. Du kan eventuelt endre ikonet for fanen – skriv «Giv» i ikonsøket for å finne et ikon som passer til giving.

Giving-siden din er nå tilgjengelig. Medlemmer kan besøke den på `yoursubdomain.b1.church/donate`.

## Dele giving-lenken din {#sharing-your-giving-link}

For å finne giving-adressen din går du til **B1 Admin** og klikker på ikonet **Settings** for å se underdomenet ditt. Giving-lenken følger dette formatet:

`https://yoursubdomain.b1.church/donate`

Del denne lenken på nettstedet ditt, i e-poster eller i menighetsbladet, slik at medlemmene vet hvor de kan gi på nett.

### Lenker med forhåndsvalgt fond og beløp {#links-with-a-preset-fund-and-amount}

For å sende givere rett til et bestemt fond, gå til **Donations > Funds** og klikk **Giving Link** på fondet. Skriv eventuelt inn et beløp, og kopier deretter lenken. Dialogen viser også en QR-kode for den samme lenken; klikk **Download PNG** for å lagre den til menighetsbladet, en lysbilde-presentasjon eller en plakat. Når en giver åpner lenken eller skanner koden, er fondet og beløpet allerede valgt på giving-siden. Lenken har dette formatet:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

De samme parameterne fungerer i elementet **Donate Link** i nettsidebyggeren.

## Gavevarsler {#donation-notifications}

Stripe sender en e-postvarsling hver gang en gave mottas. For å endre e-postadressen for varslene går du til Stripe-dashbordet, klikker på profilen din øverst til høyre, velger **Profile** og oppdaterer e-postadressen din.

## Alternativer for behandlingsgebyr {#processing-fee-options}

Du kan la givere frivillig dekke behandlingsgebyrene, slik at menigheten får hele gavebeløpet. Under **Settings > Giving** klikker du edit og slår på bryteren **Transaction Fee** ved siden av nøklene dine. Satsene som brukes til å beregne gebyret, finner du under **Fees & statements**: **Flat Rate** og **Transaction Fee** for kort, og for banktrekk (ACH) via Stripe en prosentsats og en **Hard limit**. De starter på betalingsleverandørens standardsatser; endre dem hvis dine forhandlede satser er annerledes, og klikk deretter **Save**.

:::tip
Etter oppsettet bør du gjøre en liten testgave for å bekrefte at alt fungerer før du kunngjør nettbasert giving for menigheten.
:::

## Sette opp Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding er en kristen betalingsløsning som støtter kredit- og debetkort og banktrekk (ACH). Hvis menigheten din er registrert hos Kingdom Funding, kan du koble den til som giveløsning.

:::info
Integrasjonen med Kingdom Funding er for øyeblikket i beta. Kontakt din kontaktperson hos B1 for å aktivere den for menigheten din.
:::

1. Registrer deg eller logg inn på [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hent din **Tokenization Key** og **Source Key** fra Kingdom Funding-dashbordet.
3. I B1 Admin går du til **Settings**, åpner seksjonen **Giving** og klikker edit.
4. Sett **Provider** til **Kingdom Funding**.
5. Lim inn nøklene i feltene **Tokenization Key** og **Source Key**.
6. Skriv inn **Webhook Key** (webhookens signeringshemmelighet fra kontrollpanelet til Kingdom Funding), og kopier webhook-adressen som vises under leverandøren, inn i innstillingene dine hos Kingdom Funding, slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Klikk **Save**.

Når den er koblet til, ser medlemmene en bryter for kort/bank på giving-siden og kan gi med kredittkort eller ACH-overføring.

## PayPal- og Venmo-knapper {#paypal-and-venmo-buttons}

PayPal tilbys ikke lenger i listen **Provider** for nye oppsett. Menigheter som allerede er koblet til **PayPal**, får knapper for **PayPal** og **Venmo** over kortfeltene på giving-siden for engangsgaver. Givere som klikker på en av dem, fullfører betalingen i et PayPal-vindu, og gaven registreres som alle andre nettgaver. Venmo vises bare for givere i USA på enheter som PayPal anser som kvalifisert. Gjentakende gaver bruker fortsatt kortfeltene.

## Sette opp Paystack (Afrika) {#setting-up-paystack-africa}

Stripe åpner ikke kontoer for menigheter i Ghana, Nigeria, Kenya, Sør-Afrika eller Elfenbenskysten. [Paystack](https://paystack.com) gjør det, og den tar imot lokale kort, **mobilpenger** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banktrekk og USSD – givere betaler i din lokale valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrer deg på [paystack.com](https://paystack.com) med menighetens registreringsbevis og lokale bankkonto, og fullfør Paystacks aktiveringsgjennomgang (go-live).
2. I Paystack-dashbordet åpner du **Settings → API Keys & Webhooks** og kopierer **Public Key** og **Secret Key** (bruk de ekte nøklene, ikke testnøklene).
3. I B1 Admin går du til **Settings**, åpner seksjonen **Giving** og klikker edit.
4. Sett **Provider** til **Paystack**, lim inn Public Key og Secret Key, og velg din **Currency**.
5. Kopier **webhook-adressen** som vises under leverandøren, gå tilbake til Paystack-dashbordet (**Settings → API Keys & Webhooks**) og lim den inn i feltet **Webhook URL**. Dette er hvordan gjentakende gaver og betalinger med mobilpenger registreres.
6. Lagre.

Givere fullfører betalingen i et sikkert Paystack-vindu og kan velge kort, mobilpenger eller banktrekk der. Merknader:

- **Gjentakende gaver** krever et kort; mobilpenger kan ikke belastes automatisk igjen, så Paystack tillater bare engangsgaver med mobilpenger.
- Gjentakende gaver via Paystack kan avbrytes fra B1, men ikke settes på pause eller redigeres – avbryt og opprett en ny for å endre beløpet.
- Standardsatsene for **Processing Fee** speiler Paystacks satser for lokale kort i din valuta; rediger dem hvis dine forhandlede satser er annerledes.

## Neste steg {#next-steps}

- Bruk [Stripe-import](stripe-import.md) for å hente nettransaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [Gaverapporter](donation-reports.md) for å bekrefte at nettgaver vises riktig
- Lag [gaveoversikter](giving-statements.md) som inkluderer både nettgaver og gaver som ikke er gitt på nett
