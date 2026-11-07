---
title: "Nastavenia cirkvi"
---

# Nastavenia cirkvi

<div class="article-intro">

Na stránke Nastavenia cirkvi nastavujete základné údaje o vašej cirkvi, kontaktné údaje a branding. Tieto údaje sa používajú vo všetkých nástrojoch ChurchApps vrátane vašej webovej stránky B1.church a aplikácie B1 Mobile.

</div>

## Výukové video

<YouTube id="634zSbzDkYA" title="Nastavenie údajov o cirkvi a brandingu v B1" next="Roly, oprávnenia a pozvanie tímu v B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie „Upraviť nastavenia cirkvi“. Ak nemáte prístup, pozrite si [Roly a oprávnenia](./roles-permissions.md).
- Pripravte si adresu, kontaktné údaje a logo vašej cirkvi

</div>

## Úprava informácií o cirkvi

1. V aplikácii B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte položku **Settings** a kliknite na **Settings**.
2. V sekcii **Church Information** (v hornej časti stránky) kliknite na **Edit**.
3. Upravte ktorékoľvek z nasledujúcich polí:
   - **Church Name** -- Názov zobrazený vo všetkých produktoch ChurchApps.
   - **Address** -- Fyzická adresa vašej cirkvi.
   - **Contact Information** -- Telefónne číslo, e-mail a ďalšie kontaktné údaje.
   - **Time Zone** -- Časové pásmo vašej cirkvi. Pozri nižšie [Časové pásmo](#time-zone).
4. Kliknutím na **Save** uložte zmeny.

## Nastavenie subdomény

Vaša cirkev dostane bezplatnú subdoménu **yourchurch.1.church**. Je to webová adresa, na ktorej môžu členovia a návštevníci nájsť online prezentáciu vašej cirkvi.

1. Na stránke Settings kliknite v sekcii **Church Information** na **Edit** a nájdite pole **Subdomain**.
2. Zadajte požadovanú subdoménu (napríklad „gracechurch“ pre gracechurch.1.church).
3. Uložte zmeny.

:::info
Subdoména musí byť jedinečná medzi všetkými cirkvami v ChurchApps. Ak je váš požadovaný názov obsadený, skúste pridať názov mesta alebo štátu (napríklad „gracechurch-dallas“).
:::

Ak chcete, aby návštevníci našli váš web na vlastnej doméne (napríklad **`www.gracechurch.org`**), pozrite si [Vlastná doména](./custom-domain.md).

## Nastavenie brandingu

Prispôsobte si, ako sa vaša cirkev zobrazuje vo všetkých nástrojoch ChurchApps:

1. Nahrajte **logo cirkvi** kliknutím na oblasť loga a výberom obrázka.
2. Pridajte ďalšie **obrázky cirkvi**, ktoré sa používajú na vašej webovej stránke a v [mobilnej aplikácii](./mobile-app.md).

:::tip
Najlepšie výsledky dosiahnete, ak použijete logo vo formáte PNG s priehľadným pozadím. Vďaka tomu bude vyzerať dobre na svetlom aj tmavom pozadí.
:::

## Prvý deň v týždni

Vyberte, ktorým dňom sa majú začínať vaše kalendáre. Rozbaľovací zoznam **First Day of Week** v sekcii Church Info je predvolene nastavený na **Sunday**, ale môžete zvoliť ľubovoľný deň. Po zmene sa tento deň použije v kalendárových mriežkach v aplikácii B1 Admin a na portáli členov B1.church. Kalendáre skupín, kurátorské kalendáre aj editor udalostí budú týždne zobrazovať od vami zvoleného dňa.

## Časové pásmo

Rozbaľovací zoznam **Time Zone** v sekcii **Church Information** nastavuje časové pásmo vašej cirkvi (napríklad *America/Chicago*). Ak chcete pole ponechať prázdne, vyberte **None**. Po uložení sa časové pásmo zobrazí v súhrne Church Information.

B1 používa toto časové pásmo pre celocirkevné časy, napríklad pre pripomienky udalostí a rozpisy na vašich televízoroch [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Rozpisy prihlasovania](../attendance/setup.md#setting-a-check-in-schedule) sa najprv merajú v časovom pásme [pobočky](./campuses.md), ktorej bohoslužba patrí, a časové pásmo cirkvi sa použije, iba ak pobočka žiadne nemá. Ak sú všetky vaše pobočky v jednom časovom pásme, nastavte ho na cirkvi aj na každej pobočke.

## Región (formát dátumu a telefónneho čísla)

Nastavenie **Region** určuje, ako sa v celom B1 zapisujú dátumy a časy. Predvolene sa dátumy zobrazujú vo formáte Spojených štátov (napríklad „Sep 28, 2026“ a „9/28/2026“). Cirkvi mimo USA môžu prepnúť na svoj vlastný formát. Ak si napríklad zvolíte English (United Kingdom), zobrazí sa „28 Sept 2026“ a „28/09/2026“.

1. Na stránke Settings kliknite v ľavom zozname na **Region** a potom v sekcii **Region** kliknite na **Edit**.
2. Z rozbaľovacieho zoznamu **Region** vyberte svoj región. Každá možnosť zobrazuje ukážkový dátum, aby ste presne videli, ako budú dátumy vyzerať.
3. Kliknite na **Save**.

Sekcia Region potom zobrazí vami zvolený región, ukážku **Date format** a formát **Phone numbers**.

### Formát telefónnych čísel

V rovnakej sekcii Region je nastavenie **Phone numbers**, ktoré určuje, ako sa telefónne čísla zadávajú v zázname osoby:

- **International (with country code)** -- predvolená možnosť. Telefónne polia zobrazujú výber vlajky krajiny a čísla ukladajú s predvoľbou krajiny (napríklad +1 918 555 1234).
- **Local (as typed)** -- telefónne polia sa zmenia na obyčajné textové polia a čísla sa ukladajú presne tak, ako ich zadáte, bez pridania predvoľby krajiny (napríklad 0701 234 5678). Túto možnosť zvoľte, ak vaša cirkev zapisuje čísla v miestnom formáte a nechce, aby B1 pridával predvoľbu krajiny.

Ak je vybrané **Local**, sekcia Region vedľa vášho regiónu zobrazí aj text „Local phone numbers“.

:::tip
Textové správy fungujú najlepšie, keď čísla obsahujú predvoľbu krajiny. Ak posielate správy z B1, ponechajte formát **International** alebo sa uistite, že čísla zadané v režime Local obsahujú predvoľbu krajiny.
:::

Váš región sa uplatní na dátumy a časy v aplikácii B1 Admin, na webovej stránke B1.church a v portáli členov vrátane kázní, blogových príspevkov, kalendárov skupín a plánov služieb. Členovia tak vidia dátumy vo formáte, ktorý používajú vaši zamestnanci.

## Textové správy {#texting}

Pripojte poskytovateľa textových správ, aby ste z aplikácie B1 Admin mohli posielať SMS správy jednej osobe alebo celej skupine. Správy sa odosielajú cez váš vlastný účet u poskytovateľa, preto sa uplatňujú jeho ceny a limity.

1. Na stránke Settings kliknite v ľavom zozname na **Texting** a potom v sekcii **Texting** kliknite na **Edit**.
2. Vyberte **Provider**:
   - **Clearstream** -- zadajte **API Key**. Kľúč vytvoríte v nastaveniach svojho účtu Clearstream v časti API Keys.
   - **Text In Church** -- zadajte **API Key**. Najprv požiadajte podporu Text In Church o prístup k vývojárskemu API a potom kľúč vytvorte v sekcii Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- ako **API Key** zadajte autentifikačný kľúč z vášho účtu Nalo Solutions a ako **Sender ID** zadajte identifikátor odosielateľa (až 11 znakov), ktorý vám Nalo schválilo.
   - **Twilio** -- použite vlastný účet Twilio vašej cirkvi. Twilio vám účtuje priamo. Skopírujte **Account SID** a **Auth Token** z [Twilio Console](https://console.twilio.com) a zadajte **From Number** -- telefónne číslo Twilio zaregistrované pre A2P 10DLC v tvare podobnom `+15551234567`. Po uložení vložte URL adresu prichádzajúceho webhooku (pozri nižšie) do nastavenia **A message comes in** webhook v Twilio, aby sa odpovede STOP zaznamenali aj v B1.
3. Kliknite na **Save**.

Ak chcete prestať posielať textové správy, nastavte **Provider** na **None** a uložte. Tým sa uložený poskytovateľ odstráni.

### Odhlásenie ľudí, ktorí odpovedajú STOP

Keď je poskytovateľ uložený, znova otvorte sekciu Texting pomocou **Edit**. Pod nastaveniami poskytovateľa sa zobrazuje pole **Inbound (STOP) webhook URL** iba na čítanie, ktoré obsahuje webovú adresu jedinečnú pre vašu cirkev. Kliknutím na pole adresu označte, skopírujte ju a vložte do nastavenia prichádzajúcich správ (odpovedí) webhooku u vášho poskytovateľa. Funguje to s každým z uvedených poskytovateľov, ktorý dokáže preposielať prichádzajúce odpovede na webhook.

Keď potom niekto odpovie **STOP** (alebo STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT alebo REVOKE) na jednu z vašich správ, B1 nájde všetkých ľudí s takýmto mobilným číslom, označí ich ako odhlásených a vypne im textové pripomienky. Potom ich preskočia skupinové správy. Ostatné odpovede sa ignorujú.

:::info
Používa sa to isté nastavenie odhlásenia ako pri možnosti **Hide me from the member directory**, takže ľudia, ktorí odpovedajú STOP, sa na svojom profile zobrazia aj ako **Skryté v adresári**. Pole sa zobrazí iba vtedy, keď je vybraný uložený poskytovateľ. Ak v rozbaľovacom zozname prepnete na iného poskytovateľa, najprv uložte zmeny, aby sa URL adresa znova zobrazila.
:::

Keď je poskytovateľ pripojený, používatelia s oprávnením na odosielanie správ uvidia tlačidlo **Text** na stránke skupiny (**Text this group**) a na stránke osoby s mobilným telefónom (**Send text message**). Napíšte správu a kliknite na **Send**. Dialógové okno počíta znaky a segmenty SMS. Pri skupine pred odoslaním zobrazí, koľko členov správu dostane:

- Členovia bez mobilného telefónneho čísla v evidencii sú preskočení.
- Členovia, ktorí zvolili **Hide me from the member directory**, sa počítajú ako odhlásení a sú preskočení.
- Členovia rodiny, ktorí zdieľajú jedno mobilné číslo, dostanú správu iba raz.

### Personalizácia správ pomocou zlúčených polí {#personalizing-texts-with-merge-fields}

Pod textovým poľom dialógové okno Text zobrazuje tlačidlá s označením zástupných polí: **First Name**, **Last Name**, **Display Name** a **Church Name**. Kliknutím na tlačidlo vložíte jeho zástupný text (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` alebo `{{churchName}}`) na miesto kurzora. Pri odoslaní správy sa každý zástupný text nahradí údajmi príjemcu, takže skupinová správa ako `Hi {{firstName}}, see you Sunday!` oslovuje každého člena jeho menom. Zástupné polia fungujú pri skupinových správach aj pri správach jednotlivcom. Správy pre skupinu ponúkajú aj tlačidlo **Group Name** (`{{groupName}}`), ktoré sa nahradí názvom skupiny.

Ak chcete správu znovu použiť, uložte ju ako [šablónu textovej správy](./email-templates.md#text-templates) (šablóna e-mailu s kategóriou **Text**) a vyberte ju v poli **Load Template (optional)** v hornej časti okna Text.

:::info
Limit 1 600 znakov sa uplatňuje na správu, ako ju píšete. Po vyplnení zástupných polí sa každý text dlhší ako 1 600 znakov skráti na túto dĺžku.
:::

Správy sa môžu odosielať aj automaticky ako krok [workflow](../serving/workflows.md#sending-a-text) s akciou **Send Text**. Používa rovnakého poskytovateľa a zástupné polia.

## Úložisko súborov

Súbory, ktoré nahrávate na svoju webovú stránku (cez [Files](../website/files.md)) a do ďalších obsahových oblastí, sa predvolene ukladajú v bezplatnom hostingovom úložisku B1 s kapacitou až 100 MB. Ak potrebujete viac miesta, môžete pripojiť vlastné cloudové úložisko. Nové nahrávky potom idú priamo do vášho účtu bez limitu platformy.

1. Na stránke Settings kliknite v ľavom zozname na **File Storage** a potom v sekcii **File Storage** kliknite na **Edit**.
2. Vyberte poskytovateľa: **Google Drive**, **Dropbox**, **OneDrive** alebo **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2 a podobne).
3. Pri Google Drive, Dropbox alebo OneDrive kliknite na **Connect** a prihláste sa, aby ste udelili prístup. Pri úložisku typu S3-compatible bucket zadajte prístupový kľúč, tajný kľúč, názov bucketu a základ verejnej URL adresy.
4. Kliknite na **Save**.

:::info
Toto ovplyvňuje iba nové nahrávky na súbory vašej webovej stránky a podobné obsahové oblasti. Obrázky galérie, miniatúry, logá a fotografie osôb vždy zostávajú v predvolenom úložisku B1.
:::

## Postup do vyššieho ročníka

Ak u detí a študentov evidujete **Grade** (ročník), B1 môže v určený dátum (napríklad 1. augusta) automaticky posunúť všetkých o ročník vyššie. Nemusíte tak ručne upravovať každý profil.

1. Na stránke Settings kliknite v ľavom zozname na **Grade Promotion** a potom v sekcii **Grade Promotion** kliknite na **Edit**.
2. Zapnite prepínač (zobrazí **Enabled**) a vyberte **Month** a **Day**, kedy sa majú ročníky každý rok posúvať. V tento dátum sa každý s ročníkom posunie o jeden ročník vyššie a žiaci 12. ročníka sa zmenia na **Graduated**.
3. Uložte zmeny.

Ak chcete automatický postup vypnúť, prepínač prepnite tak, aby zobrazoval **Disabled**, a uložte. Dátum postupu sa odstráni a ročníky sa už nebudú meniť samy.

## Registrácia dobrovoľníkov {#volunteer-signup}

Členovia, ktorí prezerajú [registrácie dobrovoľníkov](../../b1-church/serving/volunteer-signup.md), predvolene vidia každý nadchádzajúci týždeň s voľnými pozíciami. Ak je tento zoznam dlhý, môžete zobraziť iba najbližší týždeň pre každý typ plánu.

1. Na stránke Settings kliknite v ľavom zozname na **Volunteer Signup** a potom v sekcii **Volunteer Signup** kliknite na **Edit**.
2. Zapnite možnosť **Show only the next week of each plan type**.
3. Uložte zmeny.

Po zapnutí sa pri každom type plánu zobrazí iba jeho najbližší nadchádzajúci plán. Ďalší týždeň sa zobrazí, až keď tento dátum minie. Riadok **Weeks shown** v sekcii ukazuje buď **Only the next week of each plan type**, alebo **All upcoming weeks**.

## Súkromie darov {#giving-privacy}

Ľudia s prístupom k darom zvyčajne vidia súhrny darov osoby na jej [zázname osoby](../people/adding-people.md#editing-details). Ak nechcete, aby sa sumy zobrazovali pri každom otvorení záznamu, môžete ich skryť, kým ich niekto nevyžiada.

1. Na stránke Settings kliknite v ľavom zozname na **Giving privacy** a potom v sekcii **Giving privacy** kliknite na **Edit**.
2. Zapnite možnosť **Hide giving on person records until clicked**.
3. Uložte zmeny.

Po zapnutí karta darov na zázname osoby zobrazuje text „Giving is hidden on person records.“ Kliknutím na **Show giving** sa načíta a zobrazí dary danej osoby. Pri otvorení inej osoby sa znovu skryjú. Nemení sa tým, kto môže dary vidieť: kartu vidia iba ľudia s prístupom k darom.

## Import a export

Odkaz **Import/Export** pod názvom vašej cirkvi na stránke Settings otvorí samostatný nástroj v novom okne prehliadača. Pomocou neho môžete:

- Importovať údaje o členoch z iného systému na správu cirkvi.
- Exportovať svoje údaje ChurchApps na zálohovanie alebo migráciu.

Je to najmä užitočné pri prvom nastavení cirkvi, keď potrebujete preniesť existujúce záznamy do ChurchApps.

:::warning
Pred importom údajov si vždy zálohujte existujúce záznamy. Importy pridávajú údaje do systému a pri opakovanom spustení môžu vytvoriť duplicitné záznamy.
:::
