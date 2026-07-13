---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Liphakheji le-`@churchapps/apphelper` linikeza tincumo te-React kanye netisetjentiswa letihlanganyelwe kuto tonkhe tinhlelo tewebhu ta-ChurchApps. Ngiliphakheji linye lelishicilelwe lelembula emamojula ngendlela ye-subpath entry point -- kungena, imnikelo, emafomu, i-markdown, kanye nemisebenti yewebhusayithi/CMS -- ndzawonye nelicembu lesisekelo setincumo netisetjentiswa letihlanganyelwe.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka i-**Node.js** kanye ne-**Git** -- bona [Tidzingo Letandzulelo](../setup/prerequisites)
- Tijwayeze ne-[indzawo yekusebenta ye-Packages](./index.md) kanye nendlela yekukhishwa

</div>

## Tindzawo Tekungena

Liphakheji lichaza kukhishwa kwe-subpath ku-`package.json` yalo, ngako-ke mojula ngamunye wemsebenti ungangeniswa wodvwa:

| Indzawo yekungena | Loko lokucuketfwe |
|-------------|----------|
| `@churchapps/apphelper` | Tincumo tesisekelo, tisetjentiswa, kanye netihooks |
| `@churchapps/apphelper/login` | I-UI yekungena nekubhalisa |
| `@churchapps/apphelper/donations` | Tincumo temnikelo nekupha |
| `@churchapps/apphelper/forms` | Tincumo tekutfumela emafomu |
| `@churchapps/apphelper/markdown` | Ema-editha nema-renderer e-markdown ne-HTML |
| `@churchapps/apphelper/website` | Sakhi sewebhusayithi netincumo te-CMS |

## Ngubani Losebentisa Yini

Ngaphambi kwekushintja loko lokukhishwako lokuhlanganyelwe, hlola kutsi ngutiphi tinhlelo letikungenisako:

| Indzawo yekukhipha | Loko lekunikezako | Kusetjentiswa yini |
|---|---|---|
| Emsuka -- tincumo tesisekelo ne-hooks | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, kanye netisetjentiswa te-`@churchapps/helpers` letikhishwe kabusha (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, njll.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Emsuka -- luhlaka lwelisayithi | `SiteHeader` (kuzulazula, imenyu yemsebentisi, tatiso) | B1Admin, B1Transfer, LessonsApp |
| Emsuka -- ema-editha elicuktfwe lekuphatsa | `ImageEditor`, `HelpIcon` | B1Admin |
| Emsuka -- luhlaka lwe-realtime | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Emsuka -- tigcini tenkulumo/kuba khona | `ConversationStore`, `PresenceStore` | B1App |
| Emsuka -- I-UI yemanotsi nemilayeto | `Notes` (emanotsi ebasebenti mayelana nebantfu/imisebenti); `AddNote`, `SubscriptionToggle` (kutfumela imilayeto emalunga) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Emsuka -- lokukhetsekile kwe-Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (kuhlanganyelwe); `MarkdownPreview`, `HtmlEditor` (kuhlela loko lokucuketfwe kwelicembu leliphatsako) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (kuhlanganyelwe); `FundDonations` (kuphatsa kuphela) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (yembula i-`ConversationalForm` nakuba i-`displayMode` yelifomu ingu-`conversational`) | B1Admin, B1App |
| `./website` | Luhlaka lwesisekelo lwekwembula likhasi lolwabelwana ngalo umhleli kanye ne-renderer (`Element` kanye nema-renderer ngalinye lohlobo latfolwa nge-`ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); tinsimbi tesive selisayithi lelipheleli (`AnnouncementBanner`, `Launcher` ndzawonye netisita tato ta-`parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` letisetjentiswa yi-renderer lekhombisa umphakatsi kuphela | B1Admin (umhleli), B1App (tincumo temhleli kanye ne-renderer) |

B1Transfer ne-LessonsApp basebentisa tindzawo temsuka nate-`login` kuphela -- tindzawo te-`donations`, `forms`, ne-`website` tisetjentiswa yi-B1Admin ne-B1App kuphela kulesikhatsi samanje.

## Kuhlela Kwekutfuthukisa Kwasekhaya

Leliphakheji lihlala endzaweni yekusebenta ye-[Packages](https://github.com/ChurchApps/Packages) kanye netinye tincwadzi letihlanganyelwe:

1. Khuphela indzawo yekusebenta:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Faka tintfo letincikako emsukeni wendzawo yekusebenta:

   ```bash
   cd Packages && yarn install
   ```

3. Cala i-Vite playground kusukela kuluhlu lweliphakheji:

   ```bash
   cd apphelper && yarn dev
   ```

   Iseva ye-playground yekutfuthukisa icala ku-**http://localhost:3001**. Kopisha `playground/dotenv.sample` uyifake ku-`playground/.env` bese ugcwalisa tintfo letidzingekako kucala.

Kwakhela liphakheji kutsi lisetjentiswe (kwakhela ku-`dist/` bese kukopisha tintfo te-locale ne-CSS), sebentisa `yarn workspace @churchapps/apphelper build` -- nome `yarn build` emsukeni kwakhe onkhe emaphakheji ngendlela lelandzelana ngayo kuncika. Kuze uhlole kwakhiwa lokungakashicilelwa ngekhatsi kwahlelo loludzinga, sebentisa i-Yarn portal yesikhashana -- bona [Kutfuthukisa Kwasekhaya Kumelene Nehlelo Loludzingako](./index.md#local-development-against-a-consuming-app).

:::tip
I-playground yindlela lesheshako yekutfuthukisa nekuhlola tincumo te-AppHelper. Iyaphindza itfwale kabusha iseva ye-Vite yekutfuthukisa kuze ubone tishintjo ngesikhatsi lesifanako.
:::

## Kukhishwa

Kukhishwa kuhamba ngema-changeset: gijimisa `yarn changeset` emsukeni wendzawo yekusebenta nakuba kukhona lushintjo, bese ugijimisa `yarn publish-all` nasekulungele kukhishwa. Bona [Sishwebo Setincwadzi Letihlanganyelwe](./index.md#releasing-with-changesets) kuze utfole indlela lengephetseli.

:::warning
Ungasuki nome uphindze ubize kabusha loko lokukhishiwe ngaphambi kwekutsi lokutsatsa indzawo kushicilelwe futsi onkhe emahlelo lasebentisako asuke afakwe emphakathini -- hlola (grep) onkhe emahlelo lasebentisako ngaphambi kwekuhlanganisa kususwa.
:::

## Bomake Lohlobene

- **[Helpers](./helpers)** -- Liphakheji lesisekelo lesisetjentiswa ndzawonye ne-AppHelper
- **[Tinhlelo TeWebhu](../web-apps/)** -- Tinhlelo tewebhu letisebentisa leliphakheji
- **[Sibonakaliso Sesikhashana Setincwadzi Letihlanganyelwe](./index.md)** -- Kuhlela kwendzawo yekusebenta, indlela yekukhishwa, kanye nendlela yekuhlanganiswa kwasekhaya
