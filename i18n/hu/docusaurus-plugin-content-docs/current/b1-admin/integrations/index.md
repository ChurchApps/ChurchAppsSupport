---
title: "Integrációk"
---

# Integrációk

<div class="article-intro">

A B1 jól illeszkedik azokhoz az eszközökhöz, amelyeket a csapata már használ. Csatlakoztassa a Slacket vagy a Discordot a munkatársi értesítésekhez, automatizáljon munkafolyamatokat Zapierrel vagy Make-kel, vagy exportáljon adatokat igény szerint Google Sheetsbe. Ehhez nem kell külön integrációs platformra fizetnie, és a ChurchApps nem üzemeltet ehhez semmi pluszt. Minden integráció a harmadik fél saját infrastruktúráján fut, és a B1 webhookjain vagy REST API-ján keresztül kommunikál az egyházával.

</div>

## Elérhető integrációk

| Integráció | Mit csinál | Irány | Beállítás ideje |
|---|---|---|---|
| **[Slack](./slack-discord)** | Olvasható értesítéseket küld (új személyek, adományok, regisztrációk, …) egy Slack-csatornára | B1 → Slack | 2 perc |
| **[Discord](./slack-discord)** | Ugyanez egy Discord-csatornára | B1 → Discord | 2 perc |
| **[Zapier](./zapier)** | B1-eseményeket használhat indítóként, és B1-műveleteket futtathat a Zapier több mint 7000 alkalmazásának bármelyikében | Mindkettő | 5–10 perc Zapenként |
| **[Make](./make)** | Ugyanaz az elv, mint a Zapier esetén, Make vizuális forgatókönyv-szerkesztőjében | Mindkettő | 5–10 perc forgatókönyvenként |
| **[Google Sheets](./google-sheets)** | Igény szerint exportálja a Személyeket / Adományokat / Csoportokat / Részvételt táblázatba | B1 → Táblázat | 5 perc |
| **[Claude](./claude)** | Kérdéseket tehet fel az Anthropic Claude-jának az egyház adatairól, a jogosultságainak megfelelően – ingyenesen kipróbálható, ajánlott | Mindkettő | 3 percen belül |
| **[ChatGPT](./chatgpt)** | Ugyanez az OpenAI ChatGPT-jével (fizetős ChatGPT-csomag szükséges) | Mindkettő | 10 perc |
| **[Csatlakoztatott szolgáltatások](./services/)** | Válogatott leírások a Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr szolgáltatásokhoz | Változó | 5–10 perc szolgáltatásonként |

## Melyiket válassza?

- **Csak egy értesítést szeretne a csevegésben?** Használja a **Slacket** vagy a **Discordot** – nincs szükség külön harmadik féltől származó fiókra, és nem kell Zap-et karbantartani. Teljes egészében a B1Admin felületén állítható be.
- **Több alkalmazás között szeretne automatizálni valamit** (pl. „ha valaki adakozik, adja hozzá a Mailchimp-listámhoz és küldje a Slack #donations csatornájába”)? Használja a **Zapiert** vagy a **Make-et**. A Zapier barátságosabb, a Make olcsóbb nagy méretben, és rugalmasabb logikát tesz lehetővé.
- **Egyszeri adatlekérdezésre vagy ütemezett jelentésre van szüksége?** Használja a **Google Sheetset** – illessze be az API-kulcsot a kiegészítő oldalsávjába, majd kattintson az Exportálás gombra.
- **Egyszerű magyar nyelven szeretne kérdezni** („hány első alkalommal érkező látogató volt az elmúlt vasárnap?”, „foglalja össze az adakozást ebben a hónapban”)? Kezdje a **[Claude](./claude)** integrációval – ingyenesen kipróbálható, és kevesebb mint 3 perc alatt beállítható. A **[ChatGPT](./chatgpt)** is működik fizetős csomaggal. A Claude a B1-fiókjával történő bejelentkezéssel csatlakozik, a ChatGPT pedig B1 API-kulcsot használ.
- **Saját egyedi integrációt épít?** Egyik fent felsorolt sem megfelelő – közvetlenül a [REST API-val](/docs/developer/api) dolgozzon egy [API-kulccsal](/docs/developer/api/api-keys), vagy iratkoztasson fel egy Önük által üzemeltetett szervert a [webhookokra](/docs/developer/api/webhooks).

## Közös jellemzők

Minden integráció **B1 API-kulccsal** hitelesíti magát, amelyet a B1Adminban hozhat létre a **Settings → Developer → API Keys** menüpont alatt. A kulcs:

- Az egyháza egy konkrét személyéhez kötődik, és az adott személy jogosultságait örökli
- **Hatókörökkel** szűkíthető – például egy Google Sheets-export csak `people:read` jogosultságot igényel, `settings:write` jogosultságot nem
- Bármikor visszavonható, ami azonnal megszünteti az integráció hozzáférését anélkül, hogy bármi mást befolyásolna

Néhány összekötő (Zapier, Make) a Zap vagy forgatókönyv bekapcsolásakor automatikusan regisztrál egy [webhookot](/docs/developer/api/webhooks) Ön nevében, a Zap kikapcsolásakor pedig törli azt. A webhook URL-jét nem Önnek kell kezelnie.

:::tip
Ahhoz, hogy a Zapier és a Make automatikusan regisztrálhasson webhookokat, az API-kulcsnak rendelkeznie kell a **`settings:write`** hatókörrel (valamint az integráció által érintett erőforrások hatókörével). Csak olvasási jogosultságú kulcs működik műveletekhez és exportokhoz, de indítókhoz nem.
:::

## Költségek

A ChurchApps ingyenes és nyílt forráskódú. A Slack/Discord, a [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) csomag, valamint a hivatalos Zapier-, Make- és Google Sheets-összekötők részünkről szintén ingyenesek. A harmadik felek saját platformjaikért díjat számíthatnak fel (a Zapier és a Make is bőkezű ingyenes csomagot kínál; a Slack, a Discord és a Google Sheets erre a célra ingyenesek).

## Saját integráció építése

Ha a fentiek egyike sem megfelelő, a B1 minden felülete nyitott:

- **[REST API](/docs/developer/api)** – hívja a B1-et bármely nyelvről `Authorization: Bearer cak_…` fejléccel
- **[Webhookok](/docs/developer/api/webhooks)** – iratkoztasson fel egy nyilvános HTTPS-végpontot egy vagy több eseménytípusra, és aláírt JSON-adatcsomagokat fogadjon
- **[OAuth + Csatlakoztatott alkalmazások](/docs/developer/api/connected-apps)** – ha több egyház által használt SaaS-terméket épít

## Következő lépések

- [Slack és Discord](./slack-discord) – csevegési értesítések küldése
- [Zapier](./zapier) – csatlakozás több mint 7000 alkalmazáshoz
- [Make](./make) – vizuális munkafolyamat-automatizálás
- [Google Sheets](./google-sheets) – exportálás táblázatokba
- [Claude](./claude) – kérdések az Anthropic Claude-jának az egyház adatairól
- [ChatGPT](./chatgpt) – kérdések az OpenAI ChatGPT-jének az egyház adatairól
- [Csatlakoztatott szolgáltatások](./services/) – szolgáltatásonkénti leírások (Mailchimp, Donorbox, Clearstream, …)
