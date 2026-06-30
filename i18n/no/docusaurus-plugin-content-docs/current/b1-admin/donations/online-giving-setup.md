---
title: "Oppsett av online-gaver"
---

# Oppsett av online-gaver

<div class="article-intro">

B1 Admin integreres med **Stripe**, **PayPal** og **Kingdom Funding** slik at medlemmene dine kan gi online gjennom nettstedet ditt B1.church. Når det er konfigurert, vises online-donasjoner automatisk i postene dine ved siden av gaver som er skrevet inn manuelt, slik at alt er på ett sted.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [donasjonsfondene](funds.md) dine slik at givere kan øremerke gavene sine
- Opprett en Stripe-konto på [stripe.com](https://stripe.com) og aktiver den (ta den ut av testmodus)
- Ha B1 Admin-påloggingslegitimasjonen din klar

</div>

## Oppsett av Stripe

1. Opprett en konto på [stripe.com](https://stripe.com) hvis du ikke allerede har en. Pass på å **aktivere kontoen din** og ta den ut av testmodus.
2. I Stripe, gå til **Developers > API Keys**.
3. Kopier **Publishable Key** din.
4. Logg inn på [B1 Admin](https://admin.b1.church/).
5. Klikk **Church** i toppnavigasjonen, deretter klikk **Edit Church Settings**.
6. Klikk redigeringsikonet ved siden av **Church Settings**.
7. Bla ned til **Giving**-delen.
8. Sett **Provider** til **Stripe**.
9. Lim inn Publishable Key din i **Public Key**-feltet.
10. Gå tilbake til Stripe og vis **Secret Key** (du kan bare se denne en gang, så lagre en sikkerhetskopi).
11. Lim inn Secret Key i **Secret Key**-feltet og klikk **Save**.

:::warning
Din Stripe Secret Key vises bare en gang. Kopier den til et sikkert sted før du navigerer bort fra Stripe-instrumentbordet. Hvis du mister den, må du generere en ny nøkkel.
:::

## Valg av valuta

Etter at du har valgt Stripe som leverandør, vises en **Currency**-rullegardin ved siden av API-nøklene dine. Velg valutaen som samsvarer med oppgjøringsvalutaen din i Stripe-kontoen slik at donasjoner blir belastet riktig.

Støttede valutaer inkluderer USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN og BRL. Du kan bekrefte eller endre standardvalutaen for kontoen din i [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Valutaen du velger her brukes for engangsdonasjoner, gjentakende abonnement, gebyrberegninger og donasjonssrapporter. Hvis du bytter valuta senere, bruker bare nye donasjoner og abonnement den nye valutaen — eksisterende gjentakende gaver fortsetter i valutaen de ble opprettet med.
:::

:::warning
Kontroller at Stripe-kontoen din er konfigurert til å godta valutaen du velger. Hvis Stripe-kontoen din ikke støtter den valgte valutaen, mislykkes donasjoner ved kassen.
:::

## Legge til en donasjonside på nettstedet ditt B1.church

1. Gå til [b1.church](https://b1.church/) og logg inn.
2. Klikk **Settings**-ikonet.
3. Klikk **Add Tab**.
4. Velg **Donation** som type.
5. Skriv inn et navn for fanen (f.eks. "Give") og klikk **Save**.
6. Valgfritt kan du endre fane-ikonet — skriv "Giv" i ikonsøket for å finne et givelsmessig ikon.

Donasjonssiden din er nå live. Medlemmer kan besøke den på `yoursubdomain.b1.church/donate`.

## Deling av din givlingslenke

For å finne URL-en din for giver, gå til **B1 Admin** og klikk **Settings**-ikonet for å se ditt underdomene. Donasjonslenkjen din følger formatet:

`https://yoursubdomain.b1.church/donate`

Del denne lenken på nettstedet ditt, i e-poster eller i avisen slik at medlemmer vet hvor de skal gi online.

## Donasjonsmeldinger

Stripe sender en e-postmelding hver gang en donasjon mottas. For å endre e-postadressen for meldinger, gå til Stripe-instrumentbordet, klikk profilen din i øvre høyre hjørne, velg **Profile** og oppdater e-postadressen din.

## Alternativer for behandlingsgebyr

Du kan konfigurere givesiden din til å la givere valgfritt dekke behandlingsgebyrer slik at kirken din mottar hele donasjonsbeløpet. Denne innstillingen administreres i kirkeinnstillingene dine i B1 Admin.

:::tip
Etter oppsettet gjør du en liten testdonasjon for å bekrefte at alt fungerer før du annonserer online-giver til menigheten din.
:::

## Oppsett av Kingdom Funding

Kingdom Funding er en kristen betalingsbehandler som støtter kreditt-/debetkort og ACH-bankoverføringer. Hvis kirken din er påmeldt Kingdom Funding, kan du koble det som din giverportal.

:::info
Kingdom Funding-integrasjonen er for tiden i betaversjon. Kontakt din B1-kontoreprresentant for å aktivere det for kirken din.
:::

1. Registrer deg eller logg inn på [kingdomfunding.org](https://kingdomfunding.org).
2. Få **Security Key** (offentlig) og **Private Key** fra Kingdom Funding-forretningsportalen.
3. I B1 Admin, gå til **Settings** og åpne **Church Settings**.
4. I **Giving**-delen setter du **Provider** til **Kingdom Funding**.
5. Lim inn Security Key din i **Security Key**-feltet og Private Key din i **Private Key**-feltet.
6. Sett **Webhook Key** du mottok fra Kingdom Funding, og kopier den viste webhook-URL-en til Kingdom Funding-forretningsinnstillingene dine slik at Kingdom Funding kan varsle B1 om fullførte transaksjoner.
7. Lagre.

Når det er koblet sammen, vil medlemmer se en kort/bank-omskifter på donasjonssiden og kan gi via kredittkort eller ACH-overføring.

## Neste steg

- Bruk [Stripe Import](stripe-import.md) for å hente online-transaksjoner inn i B1 Admin hvis de ikke synkroniseres automatisk
- Sjekk [Donation Reports](donation-reports.md) for å bekrefte at online-donasjoner vises riktig
- Generer [Giving Statements](giving-statements.md) som inkluderer både online og offline-donasjoner
