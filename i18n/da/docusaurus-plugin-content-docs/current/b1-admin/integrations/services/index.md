---
title: "Tilsluttede tjenester"
description: "Forbind B1 Admin til Mailchimp, Donorbox, Subsplash, VOMO, Clearstream og andre værktøjer med Zapier- eller Make-opskrifter og opsætningsvejledning til hver."
---

# Tilsluttede tjenester

<div class="article-intro">

Den hurtigste måde at forbinde B1 med et andet kirketeknologisk værktøj er normalt en Zapier- eller Make-opskrift. Du behøver ikke ny B1-infrastruktur, og tredjepartsleverandøren hoster workflowet. Denne side er en udvalgt liste over tjenester, vi har bekræftet kan forbindes i dag, med en kort opsætningsvejledning til hver, som du kan kopiere og indsætte.

</div>

## Overblik

| Tjeneste | Kategori | Bro | Hvad du kan forbinde |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-mail | Zapier eller Make | Synkroniser nye B1-personer og givere til et Mailchimp-publikum |
| [Donorbox](./donorbox.md) | Donationer | Zapier | Send Donorbox-donationer og donorer tilbage til B1 |
| [Subsplash](./subsplash.md) | App / Donationer | Zapier | Hent Subsplash-gaver og personer ind i B1 |
| [VOMO](./vomo.md) | Frivilligt arbejde | Zapier | Synkroniser frivillige tilmeldinger mellem B1-grupper og VOMO-projekter |
| [Clearstream](./clearstream.md) | SMS | Zapier | Udløs en Clearstream-sms fra B1-hændelser; modtag svar som B1-poster |
| [Text In Church](./text-in-church.md) | SMS / Workflows | Zapier | Udløs Text In Church-workflows fra B1; modtag Connect Card-data |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier eller Make | Send sms fra enhver B1-hændelse |
| [Checkr](./checkr.md) | Baggrundstjek | Make | Start et baggrundstjek, når nogen tilslutter sig et tjenesteteam |

## Hvad de alle har til fælles

1. **B1-siden af forbindelsen er identisk.** Opret en API-nøgle med de rette scopes under **B1Admin → Settings → Developer → API Keys**, og lad enten broen registrere et webhook for udløseren (Zapier og Make gør dette automatisk og kræver `settings:write`), eller kald B1's REST-endpoints fra en efterfølgende handling.
2. **Broen fakturerer dig, ikke os.** ChurchApps er gratis. Zapier og Make har begge gratis niveauer, der dækker et par opskrifter.
3. **Du kan teste forbindelsen uden at gå live.** Begge broer har en "Test step"-knap, der udløser hændelsen én gang mod B1 og viser dataformatet, før du aktiverer opskriften.

## Valg af bro

- **Zapier** er mere brugervenlig og har det største app-katalog. Brug den som standard, medmindre omkostninger er et problem.
- **Make** er billigere i stor skala og har mere fleksibel routing- og filterlogik. Brug den, når et enkelt workflow har fan-out, betingelser eller mange trin.
- **Webhooks by Zapier** (brugt i Mobile Message-dokumentationen) er en generisk adapter, der lader dig sende POST til ethvert HTTP-endpoint fra en Zap, når destinationen ikke er en førsteklasses Zapier-app.

Hvis du vil have noget, der ikke står på denne liste, er B1's [REST API](/docs/developer/api) og [webhooks](/docs/developer/api/webhooks) åbne. Du kan bygge en engangsbro med [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) på få timer.

## Hvad der ikke er her (og hvorfor)

Flere populære kirketeknologiske værktøjer (Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck og MinistrySafe) har i dag hverken en offentliggjort Zapier-app eller et Make-modul. De har deres egne API'er, men at forbinde dem med B1 er et specialkodningsarbejde og ikke en opskrift, så de passer ikke på denne liste. Hvis en leverandør tilføjer en Zapier-app eller et Make-modul, tilføjer vi dokumentationen.

Vi har også bevidst udeladt Planning Center-Services-specifikke værktøjer (musik og præsentation), konkurrerende ChMS-produkter, migreringskonsulenter og værktøjer, der kun rydder op i PCO-specifikke data. Ingen af dem har en brugbar forbindelsesvej til B1.

## Se også

- [Zapier (oversigt)](../zapier.md): B1-siden af enhver Zapier-opskrift er identisk, og denne dokumentation dækker den én gang
- [Make (oversigt)](../make.md): samme for Make-scenarier
- [Slack & Discord](../slack-discord.md): chatnotifikationer uden nogen bro
- [Google Sheets](../google-sheets.md): eksporter efter behov
- [Webhooks (udviklerreference)](/docs/developer/api/webhooks): hændelseskataloget, som alle opskrifter er afhængige af
