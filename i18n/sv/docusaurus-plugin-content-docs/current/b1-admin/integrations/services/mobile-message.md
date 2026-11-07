---
title: "Mobile Message"
description: "Koppla B1 Admin-händelser till Mobile Message, ett australiskt SMS-API, med Zapier- eller Make-webhooks för att skicka välkomst-, gåvo- och påminnelsesms."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) är ett australiskt SMS-API som är populärt bland australiska kyrkor eftersom det erbjuder lokala nummer och konkurrenskraftiga priser i Australien, där Clearstream och Text In Church är inriktade mot USA. Mobile Message har ingen förstklassig Zapier-app i dagsläget, men de publicerar ett offentligt REST API, så du kan koppla B1-händelser till SMS via **Webhooks by Zapier** (eller HTTP-modulen i Make) på några minuter.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Ett [Mobile Message](https://mobilemessage.com.au)-konto med ett registrerat Sender ID och API-uppgifter (API-användarnamn och lösenord under *Konto → API-inställningar*)
- Ett [Zapier](https://zapier.com)-konto (eller [Make](https://www.make.com))
- En B1Admin-användare med behörigheten **Redigera inställningar**

</div>

## Vad du kan koppla ihop

Mobile Message API:et är utformat för att skicka SMS. Det finns inga triggers, bara utgående text. Därför handlar recepten uteslutande om B1 → SMS:

| Riktning | B1-trigger | Resultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Välkomst-SMS till den nya personen |
| B1 → Mobile Message | `donation.created` | Tack-SMS till givaren |
| B1 → Mobile Message | `form.submission.created` | Larma jourgruppen |
| B1 → Mobile Message | `event.created` | Påminnelse till en lista |

## Installation

### 1. Skapa en B1 API-nyckel

**Inställningar → Utvecklare → API-nycklar → Ny API-nyckel**:

- `settings:write`: för att registrera webhooken för triggern
- `people:read`: för att slå upp mottagarens telefonnummer utifrån ett `personId`

### 2. Bygg Zap:en med Webhooks by Zapier

1. **Trigger**: B1.church: välj den händelse du vill ha (t.ex. Ny gåva).
2. **Åtgärd**: B1.church: Hitta person (med `data.personId`) för att hämta telefonnummer och namn.
3. **Åtgärd**: Webhooks by Zapier: **POST**. Konfigurera enligt nedan.

POST-stegets inställningar:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier lägger till detta automatiskt)
- **Basic Auth**: ange *Basic Auth*-fältet till `<api_username>|<api_password>` (Zapier omvandlar detta till rätt `Authorization: Basic …`-header)

Aktivera Zap:en. Skicka en testgåva i B1Admin för att kontrollera att ett SMS kommer fram.

## Vanliga recept

### Påminnelser om händelser på morgonen

- **Trigger**: Schedule by Zapier (dagligen, kl. 07.00)
- **Åtgärd**: B1.church: Hitta händelser för idag (eller använd ett Hitta-steg med ett fast datumfilter, eller spara dagens händelselista i ett Google Sheet)
- **Åtgärd**: Webhooks by Zapier: POST till Mobile Message med händelselistan till en registrerad prenumerantgrupp

### Använd batch-endpointen för ett listutskick

Mobile Message:s `/v1/messages`-endpoint accepterar upp till 10 000 meddelanden per anrop. Så här skickar du ut till en B1-grupp:

- **Trigger**: B1.church: Ny formulärinlämning (filtrera till ett specifikt formulär)
- **Åtgärd**: B1.church: Lista gruppmedlemmar för en målgrupp (via ett *Webhooks by Zapier — GET*-steg på `/membership/groupmembers?groupId=…`)
- **Åtgärd**: Formatter by Zapier → Utilities → Line-itemize svaret till en `messages`-array
- **Åtgärd**: Webhooks by Zapier: POST hela arrayen till `/v1/messages`

### Make som alternativ

Om du föredrar Make lägger du till modulen **HTTP — Make a request** efter B1 Watch Events-triggern och konfigurerar den på samma sätt (POST, Basic Auth, JSON-body). Se [Make-översikten](../make.md) för B1-delen.

## Begränsningar och noteringar

- **Basic Auth är den enda autentiseringsmetoden**. Mobile Message utfärdar ett användarnamn och lösenord från instrumentpanelen. Behandla båda som hemligheter.
- **`sender` måste vara ett registrerat Sender ID** på ditt Mobile Message-konto, annars returnerar sändningen `400 Invalid sender`. Australiska regler kräver registrering av avsändare.
- **Australiska telefonnummer** kan skrivas som `0412345678` (lokalt) eller `+61412345678` (internationellt). API:et accepterar båda, men normalisera till `+61…` om du också skickar utomlands.
- **Upp till 10 000 meddelanden per förfrågan**. Det är användbart för utskick, men en enskild B1-webhookleverans innehåller sällan en lista så stor. Spara batch-endpointen för schemalagda massutskick via Zaps.

## Felsökning

- **POST returnerar `401 Unauthorized`**: Basic Auth-uppgifterna är felaktiga. Kopiera dem på nytt från Mobile Message-instrumentpanelen under *Konto → API-inställningar*. Observera att användarnamnet som standard är ditt kontos e-postadress, inte en separat API-nyckel.
- **POST returnerar `400 Invalid sender`**: värdet i `sender` är inte ett registrerat Sender ID på ditt konto. Registrera det i Mobile Message-instrumentpanelen först.
- **Texten kommer fram men är avklippt**: Mobile Message delar upp meddelanden som är längre än cirka 160 tecken i flera delar, och du faktureras per del. Kontrollera svarets innehåll, eftersom det visar antalet delar.

## Se även

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): alternativa SMS-leverantörer med inbyggda Zapier-appar (inget Webhooks by Zapier-steg behövs)
- [Zapier (översikt)](../zapier.md): B1-sidan för varje Zapier-recept
- [Mobile Message API-dokumentation](https://mobilemessage.com.au/api-documentation)
