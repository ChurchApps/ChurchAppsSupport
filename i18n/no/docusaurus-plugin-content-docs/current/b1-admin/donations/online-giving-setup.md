---
title: "Oppsett for nettbasert giving"
---

# Oppsett for nettbasert giving

<div class="article-intro">

B1 Admin integreres med **Stripe**, **PayPal**, **Kingdom Funding** og **Paystack** (for kirker i Afrika), slik at medlemmene dine kan gi på nett via B1.church-nettstedet ditt. Når dette er konfigurert, vises nettgaver automatisk i giveregistreringene dine sammen med gaver som er registrert manuelt, slik at alt ligger i ett system.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [giverfondene dine](funds.md), slik at givere kan øremerke gavene sine
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha innloggingsopplysningene dine til B1 Admin klare

</div>

## Sette opp Stripe

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke har en allerede. Husk å **aktivere kontoen din** og ta den ut av testmodus.
2. I Stripe går du til **Utviklere > API-nøkler**.
3. Kopier **publiserbar nøkkel**.
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Gå til **Innstillinger** og åpne delen **Giving**.
6. Klikk **Rediger** i delen **Giving**.
7. Sett **Leverandør** til **Stripe**.
8. Lim inn den publiserbare nøkkelen i feltet **Offentlig nøkkel**.
9. Gå tilbake til Stripe og vis din **hemmelige nøkkel** (du kan bare se den én gang, så lagre en sikkerhetskopi).
10. Lim inn den hemmelige nøkkelen i feltet **Hemmelig nøkkel** og klikk **Lagre**.

:::warning
Stripe-hemmeligheten din vises bare én gang. Kopier den til et trygt sted før du forlater Stripe-dashbordet. Hvis du mister den, må du lage en ny nøkkel.
:::

## Velge valuta

Etter at du har valgt Stripe som leverandør, vises en nedtrekksliste for **Valuta** ved siden av API-nøklene dine. Velg valutaen som samsvarer med oppgjørsvalutaen på Stripe-kontoen din, slik at gavene belastes riktig.

Støttede valutaer inkluderer USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN og BRL. Du kan bekrefte eller endre standardvalutaen for kontoen din i [Stripe-dashbordet](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her brukes for engangsgaver, gjentakende abonnementer, gebyrberegninger og giverrapporter. Hvis du bytter valuta senere, bruker bare nye gaver og abonnementer den nye valutaen -- eksisterende gjentakende gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Sørg for at Stripe-kontoen din er konfigurert til å godta valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, vil gaver mislykkes i kassen.
:::

## Apple Pay og Google Pay

Kirker på Stripe får automatisk knapper for Apple Pay og Google Pay på den offentlige givesiden. Knappene vises over kortfeltene for engangsgaver når giveren har valgt et fond og et beløp, og bare når giverens nettleser eller enhet har en lommebok satt opp. Gjentakende gaver bruker fortsatt kort- eller bankfeltene.

Google Pay krever ingen oppsett. Apple Pay krever at domenet til givesiden din er registrert hos Stripe; B1 registrerer det første gangen givesiden lastes inn på domenet ditt. Hvis Apple Pay-knappen ikke vises på en iPhone, sjekker du **Innstillinger > Betalingsmetodedomener** i Stripe-dashbordet og bekrefter at `dittundernavn.b1.church` (eller egendefinert) domenet er oppført og verifisert.

## Anonyme gaver

Givere på den offentlige givesiden kan krysse av for **Gi anonymt**. En anonym gave registreres uten giver knyttet til seg, går fortsatt til fondet giveren valgte, og vises som **Anonym** i bunter og rapporter. E-postadressen til giveren kreves fortsatt slik at kvitteringen kan sendes, men det opprettes ingen personpost. Anonyme gaver gjelder bare engangsgaver og vises ikke på noen giveroppgave.

## Mislykkede gjentakende gaver

Når en gjentakende gave på Stripe mislykkes (for eksempel et utløpt eller avvist kort), vises den mislykkede belastningen under **Gaver > Mislykkede gaver** med giveren, beløpet, datoen og årsaken som betalingsløsningen oppga. Klikk **Prøv igjen** for å forsøke belastningen på nytt når giveren har oppdatert betalingsmetoden sin.

B1 sender også giveren en e-post når belastningen mislykkes, og igjen tre og syv dager senere hvis den fortsatt ikke har gått gjennom, med en lenke for å oppdatere betalingsmetoden i B1.church.

:::info
Hvis kirken din satte opp Stripe før denne funksjonen fantes, åpner du **Innstillinger** > **Giving**, klikker rediger og klikker **Lagre** én gang. Dette oppdaterer Stripe-webhooken, slik at mislykkede belastninger rapporteres til B1.
:::

## Legge til en gavereside på B1.church-nettstedet ditt

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk på **Innstillinger**-ikonet.
3. Klikk **Legg til fane**.
4. Velg **Gave** som type.
5. Skriv inn et navn på fanen (f.eks. «Gi») og klikk **Lagre**.
6. Du kan eventuelt endre ikonet på fanen -- skriv «Giv» i ikonsøket for et gaverelatert ikon.

Gavesiden din er nå aktiv. Medlemmer kan besøke den på `dittundernavn.b1.church/donate`.

## Dele giverlenken din

For å finne lenken til giving, går du til **B1 Admin** og klikker på **Innstillinger**-ikonet for å se undernavnet ditt. Gavelenken din følger dette formatet:

`https://dittundernavn.b1.church/donate`

Del denne lenken på nettstedet ditt, i e-poster eller i kirkebladet, slik at medlemmene vet hvor de kan gi på nett.

### Lenker med forhåndsvalgt fond og beløp

For å sende givere rett til et bestemt fond, går du til **Gaver > Fond** og klikker **Giverlenke** på fondet. Skriv eventuelt inn et beløp, og kopier deretter lenken. Dialogen viser også en QR-kode for den samme lenken; klikk **Last ned PNG** for å lagre den til kirkebladet, en lysbilde eller et plakat. Når en giver åpner lenken eller skanner koden, er fondet og beløpet allerede valgt på givesiden. Lenken har formen:

`https://dittundernavn.b1.church/donate?fundId=FUND_ID&amount=25`

De samme parameterne fungerer i elementet **Giverlenke** i nettsidebyggeren.

## Gavevarsler

Stripe sender en e-postvarsling hver gang en gave mottas. For å endre e-postadressen for varsler går du til Stripe-dashbordet, klikker på profilen din øverst til høyre, velger **Profil** og oppdaterer e-postadressen din.

## Alternativer for behandlingsgebyr

Du kan konfigurere givesiden din slik at givere eventuelt kan dekke behandlingsgebyrene, slik at kirken din mottar hele gavebeløpet. Denne innstillingen administreres under kirkeinnstillingene dine i B1 Admin.

:::tip
Etter oppsettet bør du gjøre en liten testgave for å bekrefte at alt fungerer før du kunngjør nettbasert giving for menigheten.
:::

## Sette opp Kingdom Funding

Kingdom Funding er en kristen betalingsleverandør som støtter kredit- og debetkort og ACH-banktransaksjoner. Hvis kirken din er registrert hos Kingdom Funding, kan du koble den til som givebetalingsløsning.

:::info
Integrasjonen med Kingdom Funding er for øyeblikket i beta. Kontakt B1-kontaktpersonen din for å aktivere den for kirken din.
:::

1. Registrer deg eller logg inn på [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hent din **sikkerhetsnøkkel** (offentlig) og **private nøkkel** fra Kingdom Fundings portal for forhandlere.
3. I B1 Admin går du til **Innstillinger**, åpner delen **Giving** og klikker rediger.
4. Sett **Leverandør** til **Kingdom Funding**.
5. Lim inn sikkerhetsnøkkelen i feltet **Sikkerhetsnøkkel** og den private nøkkelen i feltet **Privat nøkkel**.
6. Sett **Webhook-nøkkelen** du fikk fra Kingdom Funding, og kopier den viste webhook-URL-en inn i innstillingene for forhandler hos Kingdom Funding, slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Lagre.

Når det er koblet til, ser medlemmene en bryter for kort/bank på givesiden og kan gi med kredittkort eller ACH-overføring.

## PayPal- og Venmo-knapper

Kirker som bruker **PayPal** som leverandør, får knapper for **PayPal** og **Venmo** over kortfeltene på givesiden for engangsgaver. Givere som klikker på en av dem, fullfører betalingen i et PayPal-vindu, og gaven registreres som alle andre nettgaver. Venmo vises bare for givere i USA på enheter som PayPal anser som kvalifiserte. Gjentakende gaver bruker fortsatt kortfeltene.

## Sette opp Paystack (Afrika)

Stripe åpner ikke kontoer for kirker i Ghana, Nigeria, Kenya, Sør-Afrika eller Elfenbenskysten. [Paystack](https://paystack.com) gjør det, og den godtar lokale kort, **mobilpenger** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banktransaksjoner og USSD -- givere betaler i din lokale valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrer deg på [paystack.com](https://paystack.com) med kirkens attest for registrering i foretaksregisteret og lokal bankkonto, og fullfør Paystacks aktiveringsgjennomgang (go-live).
2. I Paystack-dashbordet åpner du **Innstillinger → API-nøkler og webhooks** og kopierer **offentlig nøkkel** og **hemmelig nøkkel** (bruk de aktive nøklene, ikke testnøklene).
3. I B1 Admin går du til **Innstillinger**, åpner delen **Giving** og klikker rediger.
4. Sett **Leverandør** til **Paystack**, lim inn den offentlige nøkkelen og den hemmelige nøkkelen, og velg **Valuta**.
5. Kopier **webhook-URL-en** som vises under leverandøren, gå tilbake til Paystack-dashbordet (**Innstillinger → API-nøkler og webhooks**) og lim den inn i feltet **Webhook-URL**. Slik blir gjentakende gaver og mobilpengebetalinger registrert.
6. Lagre.

Givere fullfører betalingen i et sikkert Paystack-vindu og kan velge kort, mobilpenger eller banktransaksjon der. Merk:

- **Gjentakende gaver** krever kort; mobilpenger kan ikke belastes automatisk på nytt, så Paystack tillater bare engangsgaver med mobilpenger.
- Gjentakende gaver via Paystack kan avbestilles fra B1, men ikke settes på pause eller redigeres -- avbestill og opprett en ny for å endre beløpet.
- Standardverdiene for **behandlingsgebyr** følger Paystacks lokale kortsatser for valutaen din; rediger dem hvis de avtalte satsene dine er annerledes.

## Neste steg

- Bruk [Stripe-import](stripe-import.md) for å hente nettbaserte transaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [giverrapportene](donation-reports.md) for å verifisere at nettgaver vises riktig
- Lag [giveroppgaver](giving-statements.md) som inkluderer både nett- og manuelle gaver
