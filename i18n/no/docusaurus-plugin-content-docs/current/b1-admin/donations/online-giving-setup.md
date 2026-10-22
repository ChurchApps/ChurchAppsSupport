---
title: "Oppsett av nettbasert giving"
---

# Oppsett av nettbasert giving {#online-giving-setup}

<div class="article-intro">

B1 Admin integreres med **Stripe**, **PayPal**, **Kingdom Funding** og **Paystack** (for kirker i Afrika), slik at medlemmene dine kan gi på nettet via B1.church-siden din. Når dette er konfigurert, dukker nettbaserte gaver automatisk opp i gaveregistreringene dine, sammen med gaver som registreres manuelt, slik at alt ligger i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [gavefondene](funds.md) dine, slik at givere kan øremerke gavene sine
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha påloggingsopplysningene for B1 Admin klare

</div>

## Sette opp Stripe {#setting-up-stripe}

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke har en fra før. Sørg for å **aktivere kontoen din** og ta den ut av testmodus.
2. I Stripe går du til **Developers > API Keys** (utviklere > API-nøkler).
3. Kopier din **Publishable Key** (publiserbar nøkkel).
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Gå til **Innstillinger** og åpne delen **Giving**.
6. Klikk **Rediger** i delen **Giving**.
7. Sett **Leverandør** til **Stripe**.
8. Lim inn din publiserbare nøkkel i feltet **Offentlig nøkkel**.
9. Gå tilbake til Stripe og vis din **Secret Key** (hemmelige nøkkel). Den kan bare vises én gang, så lagre en sikkerhetskopi.
10. Lim inn den hemmelige nøkkelen i feltet **Secret Key** og klikk **Lagre**.

:::warning
Stripe-nøkkelen din vises bare én gang. Kopier den til et trygt sted før du forlater Stripe-dashbordet. Hvis du mister den, må du generere en ny nøkkel.
:::

## Velge valuta {#choosing-your-currency}

Etter at du har valgt Stripe som leverandør, vises en nedtrekksliste **Valuta** ved siden av API-nøklene dine. Velg valutaen som samsvarer med Stripe-kontoens oppgjørsvaluta, slik at gavene belastes riktig.

Støttede valutaer inkluderer USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN og BRL. Du kan bekrefte eller endre kontoens standardvaluta i [Stripe-dashbordet](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her brukes for engangsgaver, faste gaver (abonnementer), gebyrberegninger og gaverapporter. Hvis du bytter valuta senere, bruker bare nye gaver og abonnementer den nye valutaen -- eksisterende faste gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Sørg for at Stripe-kontoen din er konfigurert til å akseptere valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, mislykkes gavene ved betaling.
:::

## Apple Pay og Google Pay {#apple-pay-and-google-pay}

Kirker som bruker Stripe, får knapper for Apple Pay og Google Pay på den offentlige giving-siden automatisk. Knappene vises over kortfeltene for engangsgaver når giveren har valgt et fond og et beløp, og bare når giverens nettleser eller enhet har en lommebok satt opp. Faste gaver bruker fortsatt kort- eller bankfeltene.

Google Pay krever ingen oppsett. Apple Pay krever at giving-sidens domene er registrert hos Stripe. B1 registrerer det første gangen giving-siden lastes på domenet ditt. Hvis Apple Pay-knappen ikke vises på en iPhone, sjekk **Innstillinger > Payment method domains** i Stripe-dashbordet ditt, og kontroller at `dittundernavn.b1.church` (eller egendefinert domene) er listet og verifisert.

## Anonyme gaver {#anonymous-gifts}

Givere på den offentlige giving-siden kan krysse av for **Gi anonymt**. En anonym gave registreres uten giver knyttet til seg, går fortsatt til fondet giveren valgte, og vises som **Anonym** i batchene og rapportene dine. Giverens e-post kreves fortsatt slik at kvitteringen kan sendes, men det opprettes ingen personpost. Anonyme gaver er bare engangsgaver, og de vises ikke på noen gaveoversikt.

## Mislykkede faste gaver {#failed-recurring-gifts}

Når en fast gave på Stripe mislykkes (for eksempel på grunn av et utløpt eller avvist kort), vises den mislykkede belastningen under **Gaver > Mislykkede gaver** med giveren, beløpet, datoen og årsaken som betalingsleverandøren oppga. Klikk **Prøv igjen** for å forsøke belastningen på nytt når giveren har oppdatert betalingsmetoden sin.

B1 sender også giveren en e-post når belastningen mislykkes, og igjen tre og syv dager senere hvis den fortsatt ikke har gått gjennom, med en lenke for å oppdatere betalingsmetoden i B1.church.

:::info
Hvis kirken din satte opp Stripe før denne funksjonen fantes, åpner du **Innstillinger** > **Giving**, klikker rediger og klikker **Lagre** én gang. Dette oppdaterer Stripe-webhooken, slik at mislykkede belastninger rapporteres til B1.
:::

## Legge til en gaveside på B1.church-siden din {#adding-a-donation-page-to-your-b1church-site}

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk på **Innstillinger**-ikonet.
3. Klikk **Legg til fane**.
4. Velg **Gave** som type.
5. Skriv inn et navn på fanen (for eksempel «Gi») og klikk **Lagre**.
6. Du kan eventuelt endre fanens ikon -- skriv «Giv» i ikonsøket for å finne et ikon knyttet til giving.

Gavesiden din er nå tilgjengelig. Medlemmer kan besøke den på `dittundernavn.b1.church/donate`.

## Dele giving-lenken din {#sharing-your-giving-link}

For å finne din giving-URL går du til **B1 Admin** og klikker på **Innstillinger**-ikonet for å se undernavnet ditt. Gavelenken din har dette formatet:

`https://dittundernavn.b1.church/donate`

Del denne lenken på nettsiden din, i e-post eller i menighetsbladet, slik at medlemmene vet hvor de kan gi på nettet.

### Lenker med forhåndsvalgt fond og beløp {#links-with-a-preset-fund-and-amount}

For å sende givere direkte til et bestemt fond, går du til **Gaver > Fond** og klikker **Giving-lenke** på fondet. Skriv eventuelt inn et beløp, og kopier deretter lenken. Når en giver åpner den, er fondet og beløpet allerede valgt på giving-siden. Lenken har dette formatet:

`https://dittundernavn.b1.church/donate?fundId=FUND_ID&amount=25`

De samme parameterne fungerer i elementet **Gavelenke** i nettsidebyggeren.

## Gavevarsler {#donation-notifications}

Stripe sender en e-postvarsling hver gang det kommer inn en gave. For å endre e-postadressen for varslene går du til Stripe-dashbordet, klikker på profilen din øverst til høyre, velger **Profile** og oppdaterer e-postadressen din.

## Alternativer for behandlingsgebyr {#processing-fee-options}

Du kan konfigurere giving-siden din slik at givere valgfritt kan dekke behandlingsgebyrer, slik at kirken din mottar hele gavebeløpet. Denne innstillingen styres i kirkeinnstillingene dine i B1 Admin.

:::tip
Etter oppsettet gjør du en liten testgave for å bekrefte at alt fungerer før du annonserer nettbasert giving for menigheten.
:::

## Sette opp Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding er en kristen betalingsleverandør som støtter kreditt- og debetkort og ACH-banktrekk. Hvis kirken din er registrert hos Kingdom Funding, kan du koble den til som din gaveleverandør.

:::info
Integrasjonen med Kingdom Funding er for øyeblikket i beta. Kontakt din B1-kontaktperson for å aktivere den for kirken din.
:::

1. Registrer deg eller logg inn på [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hent din **Security Key** (offentlig) og **Private Key** fra Kingdom Fundings handelsportal.
3. I B1 Admin går du til **Innstillinger**, åpner delen **Giving** og klikker rediger.
4. Sett **Leverandør** til **Kingdom Funding**.
5. Lim inn Security Key i feltet **Security Key** og Private Key i feltet **Private Key**.
6. Angi **Webhook Key** du fikk fra Kingdom Funding, og kopier den viste webhook-URLen inn i dine innstillinger for handelsfirmaet hos Kingdom Funding, slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Lagre.

Når den er koblet til, ser medlemmene en bryter for kort/bank på gavesiden og kan gi med kredittkort eller ACH-overføring.

## PayPal- og Venmo-knapper {#paypal-and-venmo-buttons}

Kirker som bruker **PayPal** som leverandør, får knappene **PayPal** og **Venmo** over kortfeltene på giving-siden for engangsgaver. Givere som klikker på en av dem, fullfører betalingen i et PayPal-vindu, og gaven registreres på samme måte som alle andre nettbaserte gaver. Venmo vises bare for givere i USA på enheter som PayPal anser som kvalifiserte. Faste gaver bruker fortsatt kortfeltene.

## Sette opp Paystack (Afrika) {#setting-up-paystack-africa}

Stripe åpner ikke kontoer for kirker i Ghana, Nigeria, Kenya, Sør-Afrika eller Elfenbenskysten. [Paystack](https://paystack.com) gjør det, og aksepterer lokale kort, **mobilpenger** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banktrekk og USSD. Givere betaler i din lokale valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrer deg på [paystack.com](https://paystack.com) med kirkens registreringsbevis for virksomhet og lokal bankkonto, og fullfør Paystacks aktiveringsgjennomgang (go-live).
2. I Paystack-dashbordet åpner du **Innstillinger → API Keys & Webhooks** og kopierer **Public Key** og **Secret Key** (bruk de ekte nøklene, ikke testnøklene).
3. I B1 Admin går du til **Innstillinger**, åpner delen **Giving** og klikker rediger.
4. Sett **Leverandør** til **Paystack**, lim inn Public Key og Secret Key, og velg din **Valuta**.
5. Kopier **webhook-URLen** som vises under leverandøren, gå tilbake til Paystack-dashbordet (**Innstillinger → API Keys & Webhooks**) og lim den inn i feltet **Webhook URL**. Slik registreres faste gaver og betalinger med mobilpenger.
6. Lagre.

Givere fullfører betalingen i et sikkert Paystack-vindu og kan velge kort, mobilpenger eller banktrekk der. Merk:

- **Faste gaver** krever et kort; mobilpenger kan ikke belastes automatisk igjen, så Paystack tillater bare engangsgaver med mobilpenger.
- Faste gaver på Paystack kan avbrytes fra B1, men ikke settes på pause eller redigeres -- avbryt og opprett en ny for å endre beløpet.
- Standardverdiene for **Behandlingsgebyr** følger Paystacks satser for lokale kort i din valuta; rediger dem hvis dine avtalte satser er annerledes.

## Neste steg {#next-steps}

- Bruk [Stripe-import](stripe-import.md) for å hente nettbaserte transaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [Gaverapportene](donation-reports.md) dine for å kontrollere at nettbaserte gaver vises riktig
- Generer [Gaveoversikter](giving-statements.md) som inkluderer både nettbaserte og manuelle gaver
