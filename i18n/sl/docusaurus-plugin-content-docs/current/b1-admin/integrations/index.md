---
title: "Integracije"
---

# Integracije

<div class="article-intro">

B1 se poveže z orodji, ki jih vaša ekipa že uporablja. Povežite Slack ali Discord za obvestila za osebje, avtomatizirajte delovne tokove v Zapier ali Make ali na zahtevo izvozite podatke v Google Sheets, brez plačila ločene platforme za integracije in brez da bi ChurchApps gostil kaj dodatnega. Vsaka integracija teče na infrastrukturi tretje osebe in s vašo cerkvijo komunicira prek B1-jevih webhookov ali REST API-ja.

</div>

## Kaj je na voljo

| Integracija | Kaj počne | Smer | Napor za nastavitev |
|---|---|---|---|
| **[Slack](./slack-discord)** | Objavlja berljiva obvestila (novi ljudje, darovi, prijave, …) v Slack kanal | B1 → Slack | 2 minuti |
| **[Discord](./slack-discord)** | Enako, v Discord kanal | B1 → Discord | 2 minuti |
| **[Zapier](./zapier)** | Uporablja dogodke B1 kot sprožilce in dejanja B1 v katerikoli od več kot 7.000 aplikacij Zapierja | Obojesmerno | 5–10 min na Zap |
| **[Make](./make)** | Enaka zamisel kot Zapier, v vizualnem graditelju scenarijev Make | Obojesmerno | 5–10 min na scenarij |
| **[Google Sheets](./google-sheets)** | Na zahtevo izvozi Osebe / Darove / Skupine / Udeležbo v preglednico | B1 → Preglednica | 5 minut |
| **[Claude](./claude)** | Postavljajte vprašanja Anthropicovemu Claudeu o podatkih vaše cerkve, omejeno na vaša dovoljenja. Brezplačno za preizkus, priporočeno | Obojesmerno | Manj kot 3 minute |
| **[ChatGPT](./chatgpt)** | Enaka zamisel z OpenAI-jevim ChatGPT-jem (potrebuje plačljiv paket ChatGPT) | Obojesmerno | 10 minut |
| **[Povezane storitve](./services/)** | Izbrani recepti za Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Različno | 5–10 min vsaka |

## Kako izbrati

- **Samo želite obvestilo v klepetu?** Uporabite **Slack** ali **Discord**. Ne potrebujete računa tretje osebe in ne Zapa za vzdrževanje. Nastavi se v celoti znotraj B1Admin.
- **Želite nekaj avtomatizirati med aplikacijami** (npr. »ko nekdo daruje, ga dodaj na moj seznam v Mailchimpu in v Slack #darovi«)? Uporabite **Zapier** ali **Make**. Zapier je prijaznejši; Make je pri večjem obsegu cenejši in ima bolj prilagodljivo logiko.
- **Potrebujete enkraten izvoz podatkov ali načrtovano poročilo?** Uporabite **Google Sheets**. V stransko vrstico dodatka prilepite API ključ in kliknite Export.
- **Želite v preprostem jeziku postavljati vprašanja** (»koliko prvoobiskovalcev je bilo prejšnjo nedeljo?«, »povzemi darove v tem mesecu«)? Začnite s **[Claude](./claude)**. Preizkus je brezplačen in nastavitev traja manj kot 3 minute. **[ChatGPT](./chatgpt)** deluje tudi, s plačljivim paketom. Claude se poveže s prijavo z vašim B1 računom, ChatGPT pa uporablja B1 API ključ.
- **Gradite lastno integracijo po meri?** Nič od zgoraj. Komunicirajte neposredno z [REST API-jem](/docs/developer/api) z [API ključem](/docs/developer/api/api-keys) ali naročite strežnik, ki ga nadzorujete, na [webhooke](/docs/developer/api/webhooks).

## Kaj imajo skupnega

Vsaka integracija se overi z **B1 API ključem**, ustvarjenim v B1Admin pod **Settings → Developer → API Keys**. Ključ:

- Je vezan na določeno osebo v vaši cerkvi in podeduje njena dovoljenja
- Se lahko omeji z **obsegi**. Na primer, izvoz v Google Sheets potrebuje le `people:read`, ne `settings:write`
- Se lahko kadarkoli prekliče, s čimer se takoj ukine dostop integracije, ne da bi to vplivalo na kaj drugega

Nekatere povezave (Zapier, Make) ob vklopu Zapa ali scenarija v vašem imenu registrirajo [webhook](/docs/developer/api/webhooks), ob izklopu Zapa pa ga odstranijo. URL webhooka ne upravljate sami.

:::tip
Da Zapier in Make samodejno registrirata webhooke, mora API ključ imeti obseg **`settings:write`** (in obsege virov za vse, kar integracija uporablja). Ključ samo za branje deluje za dejanja in izvoze, ne pa za sprožilce.
:::

## Stroški

ChurchApps je brezplačen in odprtokoden. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) ter uradni konektorji za Zapier, Make in Google Sheets so z naše strani prav tako brezplačni. Tretje osebe lahko zaračunavajo svoje platforme. Zapier in Make imata obsežne brezplačne pakete, Slack, Discord in Google Sheets pa so za ta namen brezplačni.

## Gradnja lastne

Če nič od zgornjega ne ustreza, je vsaka površina B1 odprta:

- **[REST API](/docs/developer/api)**: kličite B1 iz katerega koli jezika z glavo `Authorization: Bearer cak_…`
- **[Webhooki](/docs/developer/api/webhooks)**: naročite javno HTTPS končno točko na enega ali več tipov dogodkov in prejemajte podpisane JSON podatke
- **[OAuth + Povezane aplikacije](/docs/developer/api/connected-apps)**: če gradite SaaS izdelek, ki ga uporablja veliko cerkva

## Naslednji koraki

- [Slack in Discord](./slack-discord): objavljanje obvestil v klepetu
- [Zapier](./zapier): povezava z več kot 7.000 aplikacijami
- [Make](./make): vizualna avtomatizacija delovnih tokov
- [Google Sheets](./google-sheets): izvoz v preglednice
- [Claude](./claude): vprašanja o podatkih vaše cerkve z Anthropicovim Claudeom
- [ChatGPT](./chatgpt): vprašanja o podatkih vaše cerkve z OpenAI-jevim ChatGPT-jem
- [Povezane storitve](./services/): recepti za posamezne storitve (Mailchimp, Donorbox, Clearstream, …)
