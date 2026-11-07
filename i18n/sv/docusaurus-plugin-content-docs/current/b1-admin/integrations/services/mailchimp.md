---
title: "Mailchimp"
description: "Synkronisera personer och grupp- eller sparade listmedlemskap från B1 Admin till en Mailchimp-målgrupp som taggar, med installation, första import och felsökning."
---

# Mailchimp

<div class="article-intro">

Håll en Mailchimp-målgrupp synkroniserad med B1 automatiskt: personer kommer in med namn, e-post och telefon; grupp- och listmedlemskap blir Mailchimp-taggar; borttagna personer arkiveras. Synkroniseringen är inbyggd i B1. Det krävs ingen tredjepartstjänst och ingen avgift per uppgift, och ändringar kommer i nära realtid i stället för enligt ett nattligt schema.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Mailchimp](https://mailchimp.com)-konto med den målgrupp du vill att B1 ska hantera
- En Mailchimp-**API-nyckel** (Mailchimp: profilikonen → **Account & billing → Extras → API keys**)
- Ditt **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- En B1Admin-användare med behörigheten **Edit Settings**

</div>

## Vad som synkroniseras

| Ändring i B1 | Effekt i Mailchimp |
|---|---|
| Person läggs till eller uppdateras | Prenumerant läggs till eller uppdateras (förnamn, efternamn, telefon; nya prenumeranter får status `subscribed`) |
| Person raderas (eller raderas enligt GDPR) | Prenumerant arkiveras |
| Person går med i en grupp | Tagg med gruppens namn läggs till |
| Person lämnar en grupp | Den taggen tas bort |
| Person går med i en sparad lista | Tagg med listans namn läggs till |
| Person lämnar en sparad lista | Den taggen tas bort |

**Sparade listor är oftast den bättre källan för taggar.** En B1-[sparad lista](/docs/b1-admin/people/lists) är en regelbaserad målgrupp som uppdaterar sig själv, till exempel "alla på norra campus" eller "medlemmar som valt att få pastorala e-postmeddelanden". Låt dina Mailchimp-segment utgå från listtaggar så håller synkroniseringen dem uppdaterade. Använd grupptaggar för utskick till ministerieteam.

Synkroniseringen är **enkelriktad** (B1 → Mailchimp) och ändrar bara Mailchimps standardfält. Den kan därför inte komma i konflikt med sammanfogningsfält eller segment som du hanterar i Mailchimp.

## Installation

1. I B1Admin gå till **Settings → Developer → Webhooks → New Webhook**.
2. Ställ in **Connector Type** på **Mailchimp**.
3. Klistra in din **Mailchimp API Key** och ditt **Audience ID**. Nyckeln lagras krypterad och visas aldrig igen.
4. Relevanta händelser är förvalda. Avmarkera de du inte vill ha, till exempel om du vill behålla personhändelser men hoppa över grupptaggar.
5. Spara. B1 verifierar nyckeln och målgruppen mot Mailchimp innan de godkänns. Ett stavfel ger ett omedelbart fel med en orsak.

Använd **Send Test** när som helst för att verifiera anslutningen igen. Varje synkroniseringsförsök loggas i webhookens leveranshistorik med Mailchimps faktiska svar. Misslyckade leveranser försöks igen automatiskt med ökande väntetid i ungefär fem dagar.

## Första import

Kopplingen synkroniserar *ändringar* från och med att den är aktiverad. Den fyller inte i din befintliga katalog i efterhand. Inför installationsdagen:

1. I B1Admin gå till **People**, sök efter de personer du vill ha (eller kör en sparad lista) och klicka på **Export** för att ladda ner en CSV-fil.
2. I Mailchimp använd **Audience → Import contacts** för att läsa in CSV-filen och lägg till eventuella taggar under importen.

Om du gör den första inläsningen med Mailchimps importverktyg behåller du kontrollen över samtyckesfrågan. Importera bara personer som faktiskt har godkänt att ta emot dina e-postmeddelanden. Om du massimporterar en hel katalog som prenumeranter kan det strida mot Mailchimps villkor och mot lagar mot skräppost (CAN-SPAM/GDPR).

## Begränsningar och noteringar

- **Enkelriktad synkronisering.** Avprenumerationer, studsar och redigeringar som görs i Mailchimp skickas inte tillbaka till B1. Någon som avprenumererat i Mailchimp kan fortfarande få e-post som skickas direkt från B1. Behandla Mailchimp som källan för samtycke till massutskick.
- **Personer utan e-postadress hoppas över.** Detta loggas i leveranshistoriken. Mailchimp-prenumeranter identifieras med e-postadress.
- **Ändrad e-postadress skapar en ny prenumerant.** Mailchimp identifierar personer med e-postadress, så om du ändrar någons e-postadress i B1 läggs personen till under den nya adressen. Den gamla prenumeranten finns kvar tills du arkiverar den i Mailchimp.
- **Endast standardfält synkroniseras**: förnamn, efternamn och telefon. Medlemsstatus, campus och egna B1-fält mappas inte till Mailchimps sammanfogningsfält i den här versionen. Använd listtaggar för segmentering i stället.
- **Taggnamnen är grupp- och listnamnen.** Om du byter namn på en grupp eller lista börjar taggningen under det nya namnet. Den gamla taggen finns kvar på befintliga prenumeranter tills den tas bort i Mailchimp.
- **Mailchimps kontogränser gäller fortfarande.** Om en synkronisering skulle föra en gratismålgrupp över gränsen loggas felet `Member limit reached` i leveranshistoriken.

## Andra recept (Zapier / Make)

Allt utöver synkronisering av målgrupper, till exempel att tagga givare vid `donation.created`, en omvänd riktning från Mailchimp till B1 eller synkronisering till en helt annan e-postplattform (Constant Contact, Brevo med flera), fungerar fortfarande via [Zapier](../zapier.md) eller [Make](../make.md). De utlöses av samma webhook-händelser:

- **Tagga givare:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Tvåvägs:** Mailchimp *New Subscriber* → B1 *Create Person*

Om du tidigare kopplade person- och grupp­synkronisering via Zapier bör du stänga av de Zapparna när du har aktiverat den inbyggda kopplingen. Om båda körs bearbetas varje händelse två gånger, och du förbrukar Zapier-uppgifter i onödan.

## Felsökning

- **Sparandet misslyckas med "Mailchimp rejected the API key"**: nyckeln har återkallats eller skrivits fel. Nycklar slutar med ett datacentersuffix, till exempel `-us21`.
- **Sparandet misslyckas med "audience not found"**: Audience ID:t finns inte under det kontot. Kopiera det från **Audience → Settings → Audience name and defaults**. Det är inte målgruppens namn.
- **En person har aldrig dykt upp i Mailchimp**: kontrollera webhookens leveranshistorik. "Skipped: person has no email address" betyder just det. Ett `4xx`-svar från Mailchimp visar orsaken i svarets innehåll.
- **Leveranserna har stannat helt**: efter upprepade misslyckade leveranser stängs webhooken av automatiskt. Åtgärda orsaken (oftast en återkallad nyckel), aktivera den igen och använd **Send Test** för att bekräfta.

## Se även

- [Webhooks (utvecklarreferens)](/docs/developer/api/webhooks): motorn bakom, händelsekatalogen och hur leveranser och återförsök fungerar
- [Sparade listor](/docs/b1-admin/people/lists): regelbaserade målgrupper som passar naturligt med Mailchimp-taggar
- [Zapier (översikt)](../zapier.md): för recept som går utöver synkronisering av målgrupper
