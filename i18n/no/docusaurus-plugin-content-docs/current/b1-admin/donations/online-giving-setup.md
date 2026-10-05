---
title: "Oppsett av nettgiving"
---

# Oppsett av nettgiving

<div class="article-intro">

B1 Admin er integrert med **Stripe**, **PayPal**, **Kingdom Funding** og **Paystack** (for menigheter i Afrika), slik at medlemmene dine kan gi online via B1.church-siden din. Når oppsettet er ferdig, vises nettgaver automatisk i gaveregistreringene dine sammen med gaver du har lagt inn manuelt, slik at alt samles i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [givefondene dine](funds.md) slik at givere kan øremerke gavene sine
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha innloggingsopplysningene dine til B1 Admin klare

</div>

## Sette opp Stripe

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke har en fra før. Husk å **aktivere kontoen** og ta den ut av testmodus.
2. Gå til **Developers > API Keys** i Stripe.
3. Kopier **Publishable Key**.
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Gå til **Innstillinger** og åpne delen **Giving**.
6. Klikk på redigeringsikonet i delen **Giving**.
7. Sett **Leverandør** til **Stripe**.
8. Lim inn Publishable Key i feltet **Offentlig nøkkel**.
9. Gå tilbake til Stripe og vis **Secret Key** (du kan bare se denne én gang, så ta en sikkerhetskopi).
10. Lim inn Secret Key i feltet **Hemmelig nøkkel** og klikk på **Lagre**.

:::warning
Stripe Secret Key vises bare én gang. Kopier den til et trygt sted før du forlater Stripe-dashbordet. Hvis du mister den, må du opprette en ny nøkkel.
:::

## Velge valuta

Når du har valgt Stripe som leverandør, vises en nedtrekksmeny for **Valuta** ved siden av API-nøklene. Velg valutaen som tilsvarer oppgjørsvalutaen på Stripe-kontoen din, slik at gavene belastes riktig.

Støttede valutaer er blant annet USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN og BRL. Du kan bekrefte eller endre kontoens standardvaluta i [Stripe-dashbordet](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her brukes til enkeltgaver, faste abonnementer, beregning av gebyrer og giverrapporter. Hvis du bytter valuta senere, er det bare nye gaver og abonnementer som bruker den nye valutaen. Eksisterende faste gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Pass på at Stripe-kontoen din er satt opp til å ta imot valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, vil gaver mislykkes ved betaling.
:::

## Apple Pay og Google Pay

Menigheter som bruker Stripe får automatisk knapper for Apple Pay og Google Pay på den offentlige givesiden. Knappene vises over kortfeltene for enkeltgaver når giveren har valgt fond og beløp, og bare hvis giverens nettleser eller enhet har en lommebok satt opp. Faste gaver bruker fortsatt kort- eller bankfeltene.

Google Pay krever ingen oppsett. Apple Pay krever at domenet til givesiden din er registrert hos Stripe. B1 registrerer det første gang givesiden lastes på domenet ditt. Hvis Apple Pay-knappen ikke vises på en iPhone, kan du sjekke **Settings > Payment method domains** i Stripe-dashbordet og bekrefte at `yoursubdomain.b1.church`-domenet ditt (eller et eget domene) er oppført og verifisert.

## Anonyme gaver

Givere på den offentlige givesiden kan krysse av for **Gi anonymt**. En anonym gave registreres uten tilknyttet giver, går fortsatt til fondet giveren valgte, og vises som **Anonym** i gavebuntene og rapportene dine. Giverens e-postadresse er fortsatt påkrevd slik at kvitteringen kan sendes, men det opprettes ingen personpost. Anonyme gaver er bare enkeltgaver og vises ikke på noen giveroppgave.

## Mislykkede faste gaver

Når en fast gave i Stripe mislykkes (for eksempel på grunn av utløpt eller avvist kort), vises den mislykkede belastningen under **Gaver > Mislykkede gaver** med giver, beløp, dato og årsaken betalingsleverandøren oppga. Klikk på **Prøv igjen** for å forsøke belastningen på nytt etter at giveren har oppdatert betalingsmåten sin.

B1 sender også e-post til giveren når belastningen mislykkes, og igjen tre og sju dager senere hvis den fortsatt ikke har gått gjennom, med en lenke til å oppdatere betalingsmåten i B1.church.

:::info
Hvis menigheten din satte opp Stripe før denne funksjonen fantes, åpner du **Innstillinger** > **Giving**, klikker på rediger og klikker på **Lagre** én gang. Da oppdateres Stripe-webhooken slik at mislykkede belastninger rapporteres til B1.
:::

## Legge til en givingside på B1.church-siden din

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk på ikonet **Innstillinger**.
3. Klikk på **Legg til fane**.
4. Velg **Donasjon** som type.
5. Skriv inn et navn på fanen (for eksempel «Gi») og klikk på **Lagre**.
6. Du kan også endre fanens ikon. Skriv «Giv» i ikonsøket for å finne et ikon som passer til giving.

Givesiden din er nå live. Medlemmene kan besøke den på `yoursubdomain.b1.church/donate`.

## Dele givelenken din

For å finne givelenken din går du til **B1 Admin** og klikker på ikonet **Innstillinger** for å se underdomenet ditt. Givelenken har dette formatet:

`https://yoursubdomain.b1.church/donate`

Del denne lenken på nettstedet ditt, i e-poster eller i menighetsbrevet, slik at medlemmene vet hvor de kan gi online.

### Lenker med forhåndsvalgt fond og beløp

For å sende givere rett til et bestemt fond går du til **Gaver > Fond** og klikker på **Givelenke** på fondet. Du kan eventuelt skrive inn et beløp, og deretter kopiere lenken. Når en giver åpner den, er fondet og beløpet allerede valgt på givesiden. Lenken har denne formen:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

De samme parameterne fungerer i elementet **Donasjonslenke** i nettstedsbyggeren.

## Varsler om gaver

Stripe sender et e-postvarsel hver gang en gave mottas. For å endre e-postadressen som varslene sendes til, går du til Stripe-dashbordet, klikker på profilen din øverst til høyre, velger **Profile** og oppdaterer e-postadressen din.

## Alternativer for transaksjonsgebyrer

Du kan sette opp givesiden slik at givere kan velge å dekke transaksjonsgebyrene, slik at menigheten din mottar hele gavebeløpet. Denne innstillingen administreres i menighetsinnstillingene i B1 Admin.

:::tip
Etter oppsettet bør du gjøre en liten testgave for å bekrefte at alt fungerer før du kunngjør nettgiving for menigheten.
:::

## Sette opp Kingdom Funding

Kingdom Funding er en kristen betalingsformidler som støtter kreditt-/debetkort og ACH-banköverføringer. Hvis menigheten din er registrert hos Kingdom Funding, kan du koble den til som gavegateway.

:::info
Kingdom Funding-integrasjonen er for øyeblikket i betaversjon. Kontakt din B1-kontaktperson for å aktivere den for menigheten din.
:::

1. Registrer deg eller logg inn på [kingdomfunding.org](https://kingdomfunding.org).
2. Hent **Security Key** (offentlig) og **Private Key** fra Kingdom Funding-portalen for forhandlere.
3. Gå til **Innstillinger** i B1 Admin, åpne delen **Giving** og klikk på rediger.
4. Sett **Leverandør** til **Kingdom Funding**.
5. Lim inn Security Key i feltet **Security Key** og Private Key i feltet **Private Key**.
6. Angi **Webhook Key** du fikk fra Kingdom Funding, og kopier den viste webhook-URL-en inn i forhandlerinnstillingene hos Kingdom Funding, slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Lagre.

Når tilkoblingen er på plass, ser medlemmene en bryter for kort/bank på givesiden og kan gi med kredittkort eller ACH-overføring.

## PayPal- og Venmo-knapper

Menigheter som bruker **PayPal** som leverandør får knapper for **PayPal** og **Venmo** over kortfeltene på givesiden for enkeltgaver. Givere som klikker på en av dem fullfører betalingen i et PayPal-vindu, og gaven registreres som alle andre nettgaver. Venmo vises bare for givere i USA på enheter PayPal anser som kvalifiserte. Faste gaver bruker fortsatt kortfeltene.

## Sette opp Paystack (Afrika)

Stripe åpner ikke kontoer for menigheter i Ghana, Nigeria, Kenya, Sør-Afrika eller Elfenbenskysten. [Paystack](https://paystack.com) gjør det, og støtter lokale kort, **mobile penger** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banköverføring og USSD. Giverne betaler i din lokale valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrer deg på [paystack.com](https://paystack.com) med menighetens firmaregistreringsbevis og lokale bankkonto, og gjennomfør Paystacks aktiveringsgjennomgang (go-live).
2. Åpne **Settings → API Keys & Webhooks** i Paystack-dashbordet og kopier **Public Key** og **Secret Key** (bruk de ekte nøklene, ikke testnøklene).
3. Gå til **Innstillinger** i B1 Admin, åpne delen **Giving** og klikk på rediger.
4. Sett **Leverandør** til **Paystack**, lim inn Public Key og Secret Key, og velg **Valuta**.
5. Kopier **webhook-URL-en** som vises under leverandøren, gå tilbake til Paystack-dashbordet (**Settings → API Keys & Webhooks**) og lim den inn i feltet **Webhook URL**. Slik blir faste gaver og betalinger med mobile penger registrert.
6. Lagre.

Giverne fullfører betalingen i et sikkert Paystack-vindu og kan velge kort, mobile penger eller banköverføring der. Merk:

- **Faste gaver** krever kort. Mobile penger kan ikke belastes automatisk på nytt, så Paystack tillater bare enkeltgaver med mobile penger.
- Faste gaver i Paystack kan kanselleres fra B1, men ikke settes på pause eller redigeres. Kanseller og opprett en ny for å endre beløpet.
- Standardverdiene for **Transaksjonsgebyr** gjenspeiler Paystacks satser for lokale kort i din valuta. Rediger dem hvis dine forhandlede satser er annerledes.

## Neste steg

- Bruk [Stripe-import](stripe-import.md) for å hente nettransaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [giverrapportene](donation-reports.md) for å bekrefte at nettgaver vises som de skal
- Opprett [giveroppgaver](giving-statements.md) som inkluderer både nettgaver og andre gaver
