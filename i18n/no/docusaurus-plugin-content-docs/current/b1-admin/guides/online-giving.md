---
title: "Veiledning: Sett opp nettbasert giving"
description: "Sett opp nettbasert giving i B1 Admin ved å opprette gavefond, koble til Stripe og legge til en giving-side for medlemmer på B1.church-nettstedet ditt."
---

# Sett opp nettbasert giving

<div class="article-intro">

Gå gjennom alt som trengs for å ta imot nettgaver i menigheten din – fra å opprette gavefond, til å koble til Stripe for betalingsbehandling, til å dele giving-siden med menigheten. Når du er ferdig, kan medlemmene gi på nett via nettstedet ditt og mobilappen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang – se [Roller og tillatelser](../people/roles-permissions.md)
- En Stripe-konto (opprett en gratis på [stripe.com](https://stripe.com) om nødvendig)

</div>

## Steg 1: Opprett gavefond {#step-1-create-donation-funds}

Fond er kategoriene givere kan gi til. Du trenger minst ett fond før du kan ta imot gaver.

Følg veiledningen [Fond](../donations/funds.md) for å sette opp gavekategoriene dine:

1. I [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Donations > Funds** og klikker **Add Fund**
2. Opprett de vanligste fondene dine (f.eks. «General Fund», «Building Fund», «Missions»)
3. Kryss av for **Tax Deductible** på fond der gavene skal med på årlige gaveoversikter, og la **Visible to Donors** være avkrysset for fond givere skal kunne velge på nettet

:::tip
Du kan legge til flere fond når som helst. Start med de vanligste gavekategoriene dine.
:::

## Steg 2: Koble til Stripe {#step-2-connect-stripe}

Stripe håndterer all betalingsbehandling. Du kobler Stripe-kontoen din til B1 Admin, slik at gavene går inn på bankkontoen din.

Følg veiledningen [Oppsett av nettbasert giving](../donations/online-giving-setup.md) for å koble til Stripe:

1. Logg inn på Stripe-dashbordet ditt og gå til **Developers > API Keys** for å finne Publishable Key og Secret Key
2. I B1 Admin går du til **Settings**, klikker **Edit** i seksjonen **Giving**, og setter **Provider** til **Stripe**
3. Lim inn Publishable Key i **Public Key** og Secret Key i **Secret Key**, kontroller **Currency**, og klikk **Save**

B1 støtter også **Kingdom Funding** og **Paystack** (for menigheter i Afrika) som giveleverandører – se [Oppsett av nettbasert giving](../donations/online-giving-setup.md).

:::warning
Stripe viser Secret Key bare én gang. Kopier og lagre den før du forlater Stripe-dashbordet. Hvis du mister den, må du lage en ny.
:::

## Steg 3: Legg til en giving-side på nettstedet ditt {#step-3-add-a-giving-page-to-your-website}

Gjør det enkelt å gi ved å legge til en giving-side på B1-nettstedet ditt.

Følg veiledningene [Oppsett av nettbasert giving](../donations/online-giving-setup.md) og [Administrere sider](../website/managing-pages.md) for å:

1. Legge til en fane **Donation** på B1.church-nettstedet ditt (eller et element **Donation** på en side i nettsidebyggeren)
2. Giving-adressen din blir: `https://yoursubdomain.b1.church/donate`
3. Medlemmer kan gi uten å logge inn (offentlig side), eller logge inn for å lagre betalingsmetoder og se givehistorikken sin
4. For å sende givere rett til ett fond klikker du **Giving Link** på fondet under **Donations > Funds** for å kopiere en lenke (eller laste ned en QR-kode) med fondet og beløpet forhåndsvalgt

## Steg 4: Gjør en testgave {#step-4-make-a-test-donation}

Før du kunngjør til menigheten, kontroller at alt fungerer.

1. Gjør en liten testgave for å bekrefte at hele flyten fungerer
2. Kontroller at gaven vises i B1 Admin under **Donations > Batches**

:::tip
For å teste uten ekte belastninger kan du lagre Stripes testnøkler først, og deretter erstatte dem med de ekte nøklene dine under **Settings > Giving** før du kunngjør til menigheten.
:::

## Steg 5: Kunngjør til menigheten {#step-5-announce-to-your-congregation}

Fortell menigheten om det, slik at medlemmene vet at de kan gi på nett.

1. Del giving-adressen via nettstedet ditt, e-postbrev, bulletiner og sosiale medier
2. Medlemmene kan også gi via [B1-appen](../../b1-church/giving/index.md) – funksjonen for giving er innebygd

:::info
Medlemmer som logger inn, kan lagre betalingsmetoder, sette opp gjentakende gaver og se givehistorikken sin. Anonym giving fungerer også – ingen innlogging nødvendig.
:::

## Steg 6: Løpende administrasjon {#step-6-ongoing-management}

Hold giveregistreringene dine oppdatert og lag rapporter gjennom hele året.

1. Nettgaver registreres automatisk. Bruk [Stripe-import](../donations/stripe-import.md) for å fange opp Stripe-transaksjoner som ikke ble synkronisert – klikk **Preview** for å se hva som mangler, og deretter **Import Missing**
2. [Se gaverapporter](../donations/donation-reports.md) under **Donations > Summary** for å følge givertrender og summer per fond
3. Sjekk **Donations > Failed Gifts** for gjentakende gaver der kortet ble avslått, og klikk **Retry** når giveren har oppdatert betalingsmetoden sin
4. [Lag årlige gaveoversikter](../donations/giving-statements.md) til givernes skatteregistreringer

:::tip
Kjør en forhåndsvisning av Stripe-import før du avslutter hver måned, slik at registreringene dine stemmer med Stripe. Se [veiledningen for årsrapporter](./year-end-reports.md) for hele årsavslutningen.
:::

## Ferdig! {#youre-done}

Menigheten din tar nå imot nettgaver. Medlemmene kan gi via nettstedet ditt, B1-appen eller en hvilken som helst enhet med nettleser. Alle gaver registreres automatisk i B1 Admin.

## Relaterte artikler {#related-articles}

- [Fond](../donations/funds.md) — opprett og administrer gavekategorier
- [Batcher](../donations/batches.md) — organiser gaver i grupper
- [Registrere gaver](../donations/recording-donations.md) — før inn kontant- og sjekkgaver manuelt
- [Stripe-import](../donations/stripe-import.md) — hent nettransaksjoner inn i B1 Admin
- [Gaverapporter](../donations/donation-reports.md) — se givertrender og summer
- [Gaveoversikter](../donations/giving-statements.md) — lag årlige skatteoversikter
- [Gi gaver](../../b1-church/giving/making-donations.md) — givingopplevelsen for medlemmer på B1.church og i B1-appen
