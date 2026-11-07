---
title: "Nastavení církve"
---

# Nastavení církve

<div class="article-intro">

Stránka Nastavení církve slouží ke konfiguraci základních údajů vaší církve, kontaktních informací a vizuální identity. Tyto údaje se používají ve všech nástrojích ChurchApps, včetně webových stránek B1.church a aplikace B1 Mobile.

</div>

## Školicí video

<YouTube id="634zSbzDkYA" title="Nastavení údajů o církvi a vizuální identity v B1" next="Role, oprávnění a pozvání týmu v B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění „Upravit nastavení církve“. Pokud k němu nemáte přístup, podívejte se na [Role a oprávnění](./roles-permissions.md).
- Připravte si adresu, kontaktní údaje a logo vaší církve

</div>

## Úprava informací o církvi

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Settings** a klikněte na **Settings**.
2. V sekci **Church Information** (v horní části stránky) klikněte na **Edit**.
3. Upravte kterékoli z následujících polí:
   - **Church Name** -- název zobrazovaný ve všech produktech ChurchApps.
   - **Address** -- fyzická adresa vaší církve.
   - **Contact Information** -- telefonní číslo, e-mail a další kontaktní údaje.
   - **Time Zone** -- časové pásmo vaší církve. Viz [Časové pásmo](#time-zone) níže.
4. Změny použijete kliknutím na **Save**.

## Nastavení subdomény

Vaše církev dostane bezplatnou subdoménu **yourchurch.1.church**. Na této webové adrese mohou členové a návštěvníci najít online prezentaci vaší církve.

1. Na stránce Settings klikněte v sekci **Church Information** na **Edit** a najděte pole **Subdomain**.
2. Zadejte požadovanou subdoménu (například „gracechurch“ pro gracechurch.1.church).
3. Uložte změny.

:::info
Subdoména musí být jedinečná napříč všemi církvemi v ChurchApps. Pokud je váš zvolený název obsazený, zkuste přidat název města nebo státu (například „gracechurch-dallas“).
:::

Pokud chcete, aby návštěvníci vašich stránek přicházeli na vlastní doménu (například **`www.gracechurch.org`**), podívejte se na [Vlastní doménu](./custom-domain.md).

## Nastavení vizuální identity

Upravte, jak se vaše církev zobrazuje ve všech nástrojích ChurchApps:

1. Nahrajte **logo církve** kliknutím do oblasti loga a výběrem obrázku.
2. Přidejte další **obrázky církve**, které se používají na vašich webových stránkách a v [mobilní aplikaci](./mobile-app.md).

:::tip
Nejlepších výsledků dosáhnete s logem ve formátu PNG s průhledným pozadím. Bude tak dobře vypadat na světlém i tmavém pozadí.
:::

## První den v týdnu

Vyberte, který den mají vaše kalendáře začínat. Rozbalovací nabídka **First Day of Week** v sekci Church Information je ve výchozím stavu nastavena na **Sunday**, lze ji však nastavit na libovolný den. Po změně se nastavení uplatní v kalendářových mřížkách v B1 Admin a v členském portálu B1.church. Kalendáře skupin, kurátorské kalendáře i editor událostí budou týdny vykreslovat od zvoleného dne.

## Časové pásmo

Rozbalovací nabídka **Time Zone** v sekci **Church Information** nastavuje časové pásmo vaší církve (například *America/Chicago*). Volbou **None** pole ponecháte prázdné. Po uložení se pásmo zobrazí v souhrnu Church Information.

B1 používá toto časové pásmo pro časy platné pro celou církev, například pro připomínky událostí a rozvrhy na televizích [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Rozvrhy odbavení](../attendance/setup.md#setting-a-check-in-schedule) se nejprve měří v časovém pásmu [pobočky](./campuses.md), na které se bohoslužba koná. Časové pásmo církve se použije jen tehdy, když pobočka žádné nemá. Pokud jsou všechny vaše pobočky ve stejném časovém pásmu, nastavte jej jak u církve, tak u každé pobočky.

## Region (formát data a telefonu)

Nastavení **Region** určuje, jak se v celém B1 zapisují data a časy. Ve výchozím stavu se data zobrazují v americkém formátu (například „Sep 28, 2026“ a „9/28/2026“). Církve mimo USA mohou přepnout na svůj vlastní formát. Například volba English (United Kingdom) zobrazí místo toho „28 Sept 2026“ a „28/09/2026“.

1. Na stránce Settings klikněte v levém seznamu na **Region** a poté v sekci **Region** klikněte na **Edit**.
2. Z rozbalovací nabídky **Region** vyberte svůj region. Každá volba zobrazuje ukázkové datum, abyste přesně viděli, jak budou data vypadat.
3. Klikněte na **Save**.

Sekce Region pak zobrazí zvolený region, ukázku **Date format** a formát **Phone numbers**.

### Formát telefonních čísel

Stejná sekce Region obsahuje nastavení **Phone numbers**, které určuje, jak se telefonní čísla zadávají do záznamu osoby:

- **International (with country code)** -- výchozí volba. Telefonní pole zobrazují výběr vlajky země a čísla ukládají s předvolbou (například +1 918 555 1234).
- **Local (as typed)** -- telefonní pole se změní na prostá textová pole a čísla se ukládají přesně tak, jak je zadáte, bez přidání předvolby (například 0701 234 5678). Zvolte tuto možnost, pokud vaše církev zapisuje čísla v místním formátu a nechce, aby B1 přidávalo předvolbu země.

Pokud je vybrána volba **Local**, sekce Region vedle vašeho regionu zobrazí také „Local phone numbers“.

:::tip
SMS zprávy fungují nejlépe, když čísla obsahují předvolbu země. Pokud z B1 posíláte SMS, ponechte formát **International**, nebo se ujistěte, že čísla zadaná v režimu Local obsahují předvolbu země.
:::

Váš region se uplatňuje na data a časy v B1 Admin i na webových stránkách B1.church a v členském portálu, včetně kázání, blogových příspěvků, kalendářů skupin a plánů služeb. Členové tak vidí data ve stejném formátu jako vaši zaměstnanci.

## Textové zprávy {#texting}

Připojte poskytovatele SMS, abyste mohli z B1 Admin posílat SMS zprávy jedné osobě nebo celé skupině. Zprávy se odesílají přes váš vlastní účet u poskytovatele, takže platí jeho ceny a limity.

1. Na stránce Settings klikněte v levém seznamu na **Texting** a poté v sekci **Texting** klikněte na **Edit**.
2. Vyberte **Provider**:
   - **Clearstream** -- zadejte **API Key**. Vytvořte jej v nastavení svého účtu Clearstream v sekci API Keys.
   - **Text In Church** -- zadejte **API Key**. Nejprve požádejte podporu Text In Church o přístup k vývojářskému API a poté vytvořte klíč v sekci Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- jako **API Key** zadejte autorizační klíč z vašeho účtu Nalo Solutions a jako **Sender ID** (až 11 znaků) identifikátor, který vám Nalo schválilo.
   - **Twilio** -- použijte vlastní účet Twilio vaší církve; Twilio účtuje přímo vám. Zkopírujte **Account SID** a **Auth Token** z [Twilio Console](https://console.twilio.com) a zadejte **From Number** -- telefonní číslo Twilio registrované pro A2P 10DLC, ve formátu jako `+15551234567`. Po uložení vložte adresu příchozího webhooku (viz níže) do webhooku **A message comes in** u daného čísla v Twilio, aby se odpovědi STOP zaznamenávaly i v B1.
3. Klikněte na **Save**.

Chcete-li přestat posílat SMS, nastavte **Provider** na **None** a uložte. Tím se uložený poskytovatel odstraní.

### Odhlášení osob, které odpoví STOP

Jakmile je poskytovatel uložen, znovu otevřete sekci Texting tlačítkem **Edit**. Pod nastavením poskytovatele se zobrazuje pole **Inbound (STOP) webhook URL** určené pouze pro čtení, které obsahuje webovou adresu jedinečnou pro vaši církev. Kliknutím na pole adresu vyberte, zkopírujte ji a vložte do nastavení webhooku pro příchozí zprávy (odpovědi) u svého poskytovatele SMS. Funguje to u všech výše uvedených poskytovatelů, kteří dokážou příchozí odpovědi přeposílat na webhook.

Poté, když někdo odpoví **STOP** (nebo STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT nebo REVOKE) na některou z vašich zpráv, B1 najde všechny osoby s odpovídajícím mobilním číslem, označí je jako odhlášené a vypne jim připomínky SMS. Při hromadných zprávách pak budou přeskočeny. Ostatní odpovědi se ignorují.

:::info
Používá se stejné nastavení odhlášení jako u možnosti **Hide me from the member directory**, takže lidé, kteří odpoví STOP, se na svém profilu zobrazí také jako **Hidden from directory**. Pole se zobrazí pouze tehdy, když je vybrán uložený poskytovatel. Pokud přepnete rozbalovací nabídku na jiného poskytovatele, nejprve uložte, abyste adresu znovu uviděli.
:::

Jakmile je poskytovatel připojen, zobrazí se zaměstnancům s oprávněním k odesílání zpráv na stránce skupiny tlačítko **Text** (**Text this group**) a na stránce osoby s mobilním telefonem tlačítko **Send text message**. Napište zprávu a klikněte na **Send**. Dialog počítá znaky a segmenty SMS. U skupiny před odesláním ukáže, kolik členů zprávu dostane:

- Členové bez uloženého mobilního telefonu jsou přeskočeni.
- Členové, kteří zvolili **Hide me from the member directory**, jsou počítáni jako odhlášení a přeskočeni.
- Členové rodiny, kteří sdílejí mobilní číslo, dostanou zprávu pouze jednou.

### Personalizace zpráv pomocí slučovacích polí {#personalizing-texts-with-merge-fields}

Pod polem pro zprávu okno Text zobrazuje štítky zástupných polí: **First Name**, **Last Name**, **Display Name** a **Church Name**. Kliknutím na štítek vložíte jeho zástupné pole (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` nebo `{{churchName}}`) na místo kurzoru. Při odeslání se každé zástupné pole nahradí údaji daného příjemce, takže hromadná zpráva jako `Ahoj {{firstName}}, těšíme se na neděli!` dorazí ke každému členovi s jeho jménem. Zástupná pole fungují u hromadných zpráv i zpráv jedné osobě. U zpráv pro skupinu je k dispozici také štítek **Group Name** (`{{groupName}}`), který se nahradí názvem skupiny.

Chcete-li zprávu znovu použít, uložte ji jako [šablonu zprávy](./email-templates.md#text-templates) (e-mailovou šablonu s kategorií **Text**) a vyberte ji v poli **Load Template (optional)** v horní části okna Text.

:::info
Limit 1 600 znaků platí pro zprávu tak, jak ji píšete. Po doplnění zástupných polí se každý text delší než 1 600 znaků ořízne na tuto délku.
:::

Zprávy lze také odesílat automaticky v rámci kroku [pracovního postupu](../serving/workflows.md#sending-a-text) pomocí akce **Send Text**, která používá stejného poskytovatele a zástupná pole.

## Úložiště souborů

Ve výchozím stavu se soubory, které nahrajete na své webové stránky (přes [Files](../website/files.md)) a do dalších obsahových oblastí, ukládají do bezplatného hostovaného úložiště B1 až do 100 MB. Pokud potřebujete více místa, můžete místo toho připojit vlastní cloudové úložiště. Nové nahrávky pak půjdou přímo na váš účet bez limitu platformy.

1. Na stránce Settings klikněte v levém seznamu na **File Storage** a poté v sekci **File Storage** klikněte na **Edit**.
2. Vyberte poskytovatele: **Google Drive**, **Dropbox**, **OneDrive** nebo **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2 apod.).
3. U Google Drive, Dropboxu nebo OneDrive klikněte na **Connect** a přihlaste se a udělte přístup. U bucketu kompatibilního s S3 zadejte přístupový klíč, tajný klíč, název bucketu a základní veřejnou URL.
4. Klikněte na **Save**.

:::info
Toto se týká pouze nových nahrávek na vaše webové soubory a podobné obsahové oblasti. Obrázky galerie, náhledy, loga a fotografie osob vždy zůstávají ve výchozím úložišti B1.
:::

## Posun ročníků

Pokud u dětí a studentů sledujete **Grade**, může B1 všechny automaticky posunout o ročník výš k datu, které zvolíte (například 1. srpna). Nemusíte tak upravovat každý profil ručně.

1. Na stránce Settings klikněte v levém seznamu na **Grade Promotion** a poté v sekci **Grade Promotion** klikněte na **Edit**.
2. Zapněte přepínač (zobrazí **Enabled**) a zvolte **Month** a **Day**, kdy se ročníky každý rok posunou. V tento den se každý s ročníkem posune o jeden výš a žáci 12. ročníku se změní na **Graduated**.
3. Uložte změny.

Chcete-li automatický posun zastavit, vypněte přepínač, aby zobrazoval **Disabled**, a uložte. Datum posunu se odstraní a ročníky se již nebudou měnit samy.

## Přihlašování dobrovolníků {#volunteer-signup}

Ve výchozím stavu členové, kteří procházejí [přihlášky dobrovolníků](../../b1-church/serving/volunteer-signup.md), vidí všechny nadcházející týdny s volnými místy. Pokud je tento seznam dlouhý, můžete místo toho zobrazit jen nejbližší týden u každého typu plánu.

1. Na stránce Settings klikněte v levém seznamu na **Volunteer Signup** a poté v sekci **Volunteer Signup** klikněte na **Edit**.
2. Zapněte možnost **Show only the next week of each plan type**.
3. Uložte změny.

Po zapnutí se u každého typu plánu zobrazí jen jeho nejbližší nadcházející plán. Další týden se objeví, jakmile dané datum pomine. Řádek **Weeks shown** v sekci ukazuje buď **Only the next week of each plan type**, nebo **All upcoming weeks**.

## Soukromí darů {#giving-privacy}

Osoby s přístupem k darům běžně vidí souhrny darů dané osoby na jejím [záznamu osoby](../people/adding-people.md#editing-details). Pokud nechcete, aby se částky zobrazovaly pokaždé, když se záznam otevře, můžete je skrýt, dokud si je někdo nevyžádá.

1. Na stránce Settings klikněte v levém seznamu na **Giving privacy** a poté v sekci **Giving privacy** klikněte na **Edit**.
2. Zapněte možnost **Hide giving on person records until clicked**.
3. Uložte změny.

Po zapnutí karta darů na záznamu osoby zobrazí text „Giving is hidden on person records.“ Kliknutím na **Show giving** načtete a zobrazíte dary dané osoby. Při otevření jiné osoby se znovu skryjí. Kdo dary vidí, se nemění: kartu vidí pouze osoby s přístupem k darům.

## Import a export

Odkaz **Import/Export** pod názvem vaší církve na stránce Settings otevře samostatný nástroj v novém okně prohlížeče. Slouží k tomu, abyste:

- importovali údaje o členech z jiného systému pro správu církve,
- exportovali svá data ChurchApps pro zálohu nebo migraci.

To se hodí zejména při prvním nastavení církve, když potřebujete převést stávající záznamy do ChurchApps.

:::warning
Při importu dat nejprve vždy zazálohujte své stávající záznamy. Importní operace přidávají data do vašeho systému a při opakovaném spuštění mohou vytvořit duplicitní záznamy.
:::
