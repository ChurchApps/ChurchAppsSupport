---
title: "Online Giving Setup"
---

# Online Giving Setup

<div class="article-intro">

B1 Admin integreras med **Stripe**, **PayPal**, **Kingdom Funding** och **Paystack** (för kyrkor i Afrika) så att dina medlemmar kan ge online via din B1.church-webbplats. När det är konfigurerat visas onlinedonationer automatiskt i dina gåvoregister tillsammans med manuellt registrerade gåvor, så allt finns i ett och samma system.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa dina [donationsfonder](funds.md) så att givare kan ange vart deras gåvor ska gå
- Skapa ett Stripe-konto på [stripe.com](https://stripe.com) och aktivera det (ta det ur testläge)
- Ha dina inloggningsuppgifter för B1 Admin redo

</div>

## Konfigurera Stripe

1. Skapa ett konto på [stripe.com](https://stripe.com) om du inte redan har ett. Se till att **aktivera ditt konto** och ta det ur testläge.
2. I Stripe, gå till **Developers > API Keys**.
3. Kopiera din **Publishable Key**.
4. Logga in på [B1 Admin](https://admin.b1.church/).
5. Gå till **Settings** och öppna avsnittet **Giving**.
6. Klicka på **Edit** i avsnittet **Giving**.
7. Ställ in **Provider** till **Stripe**.
8. Klistra in din Publishable Key i fältet **Public Key**.
9. Gå tillbaka till Stripe och visa din **Secret Key** (du kan bara se den en gång, så spara en kopia).
10. Klistra in Secret Key i fältet **Secret Key** och klicka på **Save**.

:::warning
Din Stripe Secret Key visas bara en gång. Kopiera den till en säker plats innan du lämnar Stripe-instrumentpanelen. Om du förlorar den måste du skapa en ny nyckel.
:::

## Välj din valuta

När du har valt Stripe som leverantör visas en rullgardinsmeny för **Currency** bredvid dina API-nycklar. Välj den valuta som motsvarar valutan för ditt Stripe-kontos utbetalningar, så att donationer debiteras korrekt.

Valutor som stöds inkluderar USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN och BRL. Du kan bekräfta eller ändra ditt kontos standardvaluta i din [Stripe-instrumentpanel](https://dashboard.stripe.com/settings/currencies).

:::info
Valutan du väljer här används för engångsdonationer, återkommande prenumerationer, avgiftsberäkningar och donationsrapporter. Om du byter valuta senare använder endast nya donationer och prenumerationer den nya valutan. Befintliga återkommande gåvor fortsätter i den valuta de skapades med.
:::

:::warning
Se till att ditt Stripe-konto är konfigurerat för att ta emot den valuta du väljer. Om ditt Stripe-konto inte stöder den valda valutan misslyckas donationer vid utcheckningen.
:::

## Apple Pay och Google Pay

Kyrkor som använder Stripe får automatiskt knappar för Apple Pay och Google Pay på den offentliga givarsidan. Knapparna visas ovanför kortfälten för engångsgåvor när givaren har valt en fond och ett belopp, och endast om givarens webbläsare eller enhet har en plånbok konfigurerad. Återkommande gåvor använder fortfarande kort- eller bankfälten.

Google Pay kräver ingen konfiguration. Apple Pay kräver att domänen för din givarsida registreras hos Stripe. B1 registrerar den första gången givarsidan laddas på din domän. Om Apple Pay-knappen inte visas på en iPhone, kontrollera **Settings > Payment method domains** i din Stripe-instrumentpanel och bekräfta att din `dinunderdomän.b1.church`-domän (eller din egen domän) finns med och är verifierad.

## Anonyma gåvor

Givare på den offentliga givarsidan kan markera **Give anonymously**. En anonym gåva registreras utan någon kopplad givare, går ändå till den fond givaren valt och visas som **Anonymous** i dina batcher och rapporter. Givarens e-postadress krävs fortfarande så att kvittot kan skickas, men ingen personpost skapas. Anonyma gåvor gäller endast engångsgåvor och visas inte på något givarsammanställning.

## Misslyckade återkommande gåvor

När en återkommande gåva via Stripe misslyckas (till exempel på grund av ett utgånget eller nekat kort), visas den misslyckade debiteringen under **Donations > Failed Gifts** med givaren, beloppet, datumet och det skäl som betalningsleverantören angav. Klicka på **Retry** för att försöka debitera igen när givaren har uppdaterat sin betalningsmetod.

B1 skickar också ett e-postmeddelande till givaren när debiteringen misslyckas, och igen tre och sju dagar senare om den fortfarande inte har gått igenom. Meddelandet innehåller en länk för att uppdatera betalningsmetoden i B1.church.

:::info
Om din kyrka konfigurerade Stripe innan den här funktionen fanns, öppna **Settings** > **Giving**, klicka på redigera och klicka på **Save** en gång. Det uppdaterar Stripe-webhooken så att misslyckade debiteringar rapporteras till B1.
:::

## Lägg till en donationssida på din B1.church-webbplats

1. Gå till [b1.church](https://b1.church/) och logga in.
2. Klicka på ikonen **Settings**.
3. Klicka på **Add Tab**.
4. Välj **Donation** som typ.
5. Ange ett namn för fliken (t.ex. "Ge") och klicka på **Save**.
6. Byt eventuellt flikikonen. Skriv "Giv" i ikonsökningen för att hitta en ikon som har med givande att göra.

Din donationssida är nu publicerad. Medlemmar kan besöka den på `dinunderdomän.b1.church/donate`.

## Dela din givarlänk

För att hitta din webbadress för givande, gå till **B1 Admin** och klicka på ikonen **Settings** för att se din underdomän. Din donationslänk har följande format:

`https://dinunderdomän.b1.church/donate`

Dela den här länken på din webbplats, i e-post eller i din församlingsbrev så att medlemmar vet var de kan ge online.

### Länkar med förvald fond och belopp

För att skicka givare direkt till en specifik fond, gå till **Donations > Funds** och klicka på **Giving Link** för fonden. Ange eventuellt ett belopp och kopiera sedan länken. Dialogrutan visar också en QR-kod för samma länk. Klicka på **Download PNG** för att spara den till ett församlingsbrev, en bild eller en affisch. När en givare öppnar länken eller skannar koden är fonden och beloppet redan valda på givarsidan. Länken har följande format:

`https://dinunderdomän.b1.church/donate?fundId=FUND_ID&amount=25`

Samma parametrar fungerar i elementet **Donate Link** i webbplatsbyggaren.

## Donationsnotiser

Stripe skickar ett e-postmeddelande varje gång en donation tas emot. För att ändra e-postadressen för notiser, gå till Stripe-instrumentpanelen, klicka på din profil uppe till höger, välj **Profile** och uppdatera din e-postadress.

## Alternativ för behandlingsavgifter

Du kan konfigurera din givarsida så att givare valfritt kan täcka behandlingsavgifter, så att din kyrka får hela donationsbeloppet. Den här inställningen hanteras i dina kyrkoinställningar i B1 Admin.

:::tip
Gör en liten testdonation efter konfigurationen för att bekräfta att allt fungerar innan du meddelar din församling om onlinegivande.
:::

## Konfigurera Kingdom Funding

Kingdom Funding är en kristen betalningsleverantör som stöder kredit- och betalkort samt ACH-banköverföringar. Om din kyrka är ansluten till Kingdom Funding kan du koppla den som din gateway för givande.

:::info
Integrationen med Kingdom Funding är för närvarande i beta. Kontakta din B1-kontaktperson för att aktivera den för din kyrka.
:::

1. Registrera dig eller logga in på [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Hämta din **Security Key** (offentlig) och **Private Key** från Kingdom Fundings portal för handlare.
3. I B1 Admin, gå till **Settings**, öppna avsnittet **Giving** och klicka på redigera.
4. Ställ in **Provider** till **Kingdom Funding**.
5. Klistra in din Security Key i fältet **Security Key** och din Private Key i fältet **Private Key**.
6. Ange den **Webhook Key** du fick från Kingdom Funding och kopiera den visade webhook-adressen till dina handlarinställningar hos Kingdom Funding, så att Kingdom Funding kan meddela B1 om genomförda transaktioner.
7. Spara.

När anslutningen är klar ser medlemmar en växlingsknapp för kort/bank på donationssidan och kan ge med kredit- eller betalkort eller ACH-överföring.

## Knappar för PayPal och Venmo

Kyrkor som använder **PayPal** som leverantör får knappar för **PayPal** och **Venmo** ovanför kortfälten på givarsidan för engångsgåvor. Givare som klickar på en av dem slutför betalningen i ett PayPal-fönster, och gåvan registreras precis som andra onlinedonationer. Venmo visas endast för givare i USA på enheter som PayPal anser vara kvalificerade. Återkommande gåvor använder fortfarande kortfälten.

## Konfigurera Paystack (Afrika)

Stripe öppnar inte konton för kyrkor i Ghana, Nigeria, Kenya, Sydafrika eller Elfenbenskusten. [Paystack](https://paystack.com) gör det, och de accepterar lokala kort, **mobila betalningar** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), banköverföringar och USSD. Givare betalar i din lokala valuta (GHS, NGN, KES, ZAR, XOF).

1. Registrera dig på [paystack.com](https://paystack.com) med din kyrkas registreringsbevis för verksamhet och ett lokalt bankkonto, och slutför Paystacks aktiveringsgranskning (go-live).
2. I Paystack-instrumentpanelen, öppna **Settings → API Keys & Webhooks** och kopiera **Public Key** och **Secret Key** (använd de skarpa nycklarna, inte testnycklarna).
3. I B1 Admin, gå till **Settings**, öppna avsnittet **Giving** och klicka på redigera.
4. Ställ in **Provider** till **Paystack**, klistra in Public Key och Secret Key och välj din **Currency**.
5. Kopiera **webhook-adressen** som visas under leverantören, gå tillbaka till Paystack-instrumentpanelen (**Settings → API Keys & Webhooks**) och klistra in den i fältet **Webhook URL**. Det är så att återkommande gåvor och mobila betalningar registreras.
6. Spara.

Givare slutför sin betalning i ett säkert Paystack-fönster och kan välja kort, mobil betalning eller banköverföring där. Observera följande:

- **Återkommande gåvor** kräver ett kort. Mobila betalningar kan inte debiteras automatiskt igen, så Paystack tillåter endast engångsgåvor via mobil betalning.
- Återkommande gåvor via Paystack kan avslutas från B1 men inte pausas eller redigeras. Avsluta och skapa en ny för att ändra beloppet.
- Standardvärdena för **Processing Fee** speglar Paystacks lokala kortavgifter för din valuta. Ändra dem om dina förhandlade avgifter skiljer sig.

## Nästa steg

- Använd [Stripe Import](stripe-import.md) för att hämta onlinetransaktioner till B1 Admin om de inte synkroniseras automatiskt
- Kontrollera dina [donationsrapporter](donation-reports.md) för att verifiera att onlinedonationer visas korrekt
- Skapa [givarsammanställningar](giving-statements.md) som inkluderar både online- och offlinedonationer
