---
title: "Nastavení kostela"
description: "Nastavte název, adresu, subdoménu, časové pásmo, formát regionu, poskytovatele SMS a úložiště souborů pro svůj kostel na stránce Nastavení kostela v B1 Admin."
---

# Nastavení kostela

<div class="article-intro">

Stránka Nastavení kostela slouží k nastavení základních informací o vašem kostele, kontaktních údajů a vizuální identity. Tyto údaje se používají ve všech nástrojích ChurchApps, včetně vašeho webu B1.church a aplikace B1 App.

</div>

## Školicí video

<YouTube id="634zSbzDkYA" title="Nastavení informací o kostele a vizuální identity v B1" next="Role, oprávnění a pozvání vašeho týmu v B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění „Upravit nastavení kostela“. Pokud k němu nemáte přístup, podívejte se na [Role a oprávnění](./roles-permissions.md).
- Připravte si adresu kostela, kontaktní informace a logo

</div>

## Úprava informací o kostele

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu), rozbalte položku **Settings** a klikněte na **Settings**.
2. V sekci **Church Information** (v horní části stránky) klikněte na **Edit**.
3. Upravte kterékoli z následujících polí:
   - **Church Name** -- Název, který se zobrazuje ve všech produktech ChurchApps.
   - **Address** -- Fyzická adresa vašeho kostela.
   - **Contact Information** -- Telefonní číslo, e-mail a další kontaktní údaje.
   - **Time Zone** -- Časové pásmo vašeho kostela. Viz [Časové pásmo](#time-zone) níže.
4. Klikněte na **Save**, čímž se změny uloží.

## Nastavení subdomény

Váš kostel získá bezplatnou subdoménu **yourchurch.1.church**. Na této webové adrese mohou členové a návštěvníci najít online prezentaci vašeho kostela.

1. Na stránce Settings klikněte v sekci **Church Information** na **Edit** a najděte pole **Subdomain**.
2. Zadejte požadovanou subdoménu (například „gracechurch“ pro gracechurch.1.church).
3. Uložte změny.

:::info
Vaše subdoména musí být jedinečná mezi všemi kostely ChurchApps. Pokud je požadovaný název již obsazen, zkuste přidat název města nebo státu (například „gracechurch-dallas“).
:::

Pokud chcete, aby návštěvníci našli váš web na vlastní doméně (například **`www.gracechurch.org`**), podívejte se na [Vlastní doména](./custom-domain.md).

## Nastavení vizuální identity

Upravte, jak se váš kostel zobrazuje ve všech nástrojích ChurchApps:

1. Nahrajte **logo kostela** kliknutím na oblast loga a výběrem obrázku.
2. Přidejte další **obrázky kostela**, které se používají na vašem webu a [mobilní aplikaci](./mobile-app.md).

:::tip
Nejlepších výsledků dosáhnete, pokud použijete logo s průhledným pozadím ve formátu PNG. Bude tak dobře vypadat na světlém i tmavém pozadí.
:::

## První den v týdnu

Zvolte, který den mají vaše kalendáře začínat. Rozbalovací nabídka **First Day of Week** v sekci Church Info je nastavena na **Sunday**, ale můžete zvolit libovolný den. Po změně se nastavení uplatní v kalendářových mřížkách v B1 Admin i v členském portálu B1.church – kalendáře skupin, kurátorské kalendáře i editor událostí budou týdny zobrazovat od zvoleného dne.

## Časové pásmo

Rozbalovací nabídka **Time Zone** v sekci **Church Information** nastavuje časové pásmo vašeho kostela (například *America/Chicago*). Chcete-li ji ponechat prázdnou, zvolte **None**. Po uložení se časové pásmo zobrazí v souhrnu Church Information.

B1 toto časové pásmo používá pro celokostelní časy, například pro připomenutí událostí a rozpisy na televizorech [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Rozpisy odbavení](../attendance/setup.md#setting-a-check-in-schedule) se nejprve počítají podle časového pásma [pobočky](./campuses.md), ve které se bohoslužba koná, a časové pásmo kostela se použije, pouze pokud pobočka žádné nemá. Pokud jsou všechny vaše pobočky ve stejném časovém pásmu, nastavte ho jak u kostela, tak u každé pobočky.

## Region (formát data a telefonního čísla)

Nastavení **Region** určuje, jak se data a časy zapisují v celém B1. Ve výchozím nastavení se data zobrazují ve formátu používaném ve Spojených státech (například „Sep 28, 2026“ a „9/28/2026“). Kostely mimo USA mohou přepnout na svůj vlastní formát – například volba English (United Kingdom) zobrazí místo toho „28 Sept 2026“ a „28/09/2026“.

1. Na stránce Settings klikněte v levém seznamu na **Region** a poté v sekci **Region** klikněte na **Edit**.
2. Ze rozbalovací nabídky **Region** vyberte svůj region. Každá možnost zobrazuje ukázkové datum, takže přesně uvidíte, jak budou data vypadat.
3. Klikněte na **Save**.

Sekce Region pak zobrazí vybraný region, ukázku **Date format** a formát **Phone numbers**.

### Formát telefonních čísel

Stejná sekce Region obsahuje nastavení **Phone numbers**, které určuje, jak se telefonní čísla zadávají v záznamu osoby:

- **International (with country code)** -- výchozí možnost. Telefonní pole zobrazují výběr vlajky státu a čísla ukládají s předvolbou země (například +1 918 555 1234).
- **Local (as typed)** -- telefonní pole se změní na obyčejná textová pole a čísla ukládají přesně tak, jak je zadáte, bez přidání předvolby země (například 0701 234 5678). Zvolte tuto možnost, pokud váš kostel píše čísla v místním formátu a nechce, aby B1 přidávalo předvolbu země.

Pokud je vybrána možnost **Local**, sekce Region vedle vašeho regionu také zobrazí text „Local phone numbers“.

:::tip
SMS zprávy fungují nejlépe, pokud čísla obsahují předvolbu země. Pokud odesíláte SMS z B1, ponechte formát **International**, nebo se ujistěte, že čísla zadaná v režimu Local obsahují předvolbu země.
:::

Váš region se uplatňuje na data a časy v celém B1 Admin a na webu B1.church a členském portálu, včetně kázání, blogových příspěvků, kalendářů skupin a plánů služby, takže členové vidí data ve stejném formátu jako vaši zaměstnanci.

## SMS zprávy {#texting}

Připojte poskytovatele SMS, abyste z B1 Admin mohli odesílat textové zprávy jednotlivci nebo celé skupině. Zprávy se odesílají přes váš vlastní účet u poskytovatele, takže se na ně vztahují jeho ceny a limity.

1. Na stránce Settings klikněte v levém seznamu na **Texting** a poté v sekci **Texting** klikněte na **Edit**.
2. Zvolte **Provider**:
   - **Clearstream** -- zadejte **API Key**. Vytvořte jej v nastavení svého účtu Clearstream v sekci API Keys.
   - **Text In Church** -- zadejte **API Key**. Nejprve požádejte podporu Text In Church o přístup k vývojářskému API a poté vytvořte klíč v sekci Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- jako **API Key** zadejte autentizační klíč ze svého účtu Nalo Solutions a jako **Sender ID** (až 11 znaků) zadejte identifikátor odesílatele, který vám Nalo schválilo.
   - **Twilio** -- použijte vlastní účet Twilio vašeho kostela; Twilio vám účtuje přímo. Zkopírujte **Account SID** a **Auth Token** z [konzole Twilio](https://console.twilio.com) a zadejte **From Number** – telefonní číslo Twilio registrované pro A2P 10DLC ve formátu například `+15551234567`. Po uložení vložte příchozí webhook URL (viz níže) do pole **A message comes in** webhooku daného čísla v Twilio, aby se odpovědi STOP zaznamenávaly i v B1.
3. Klikněte na **Save**.

Chcete-li odesílání SMS zastavit, nastavte **Provider** na **None** a uložte. Tím se uložený poskytovatel odstraní.

### Odhlášení osob, které odpoví STOP

Jakmile je poskytovatel uložen, znovu otevřete sekci Texting tlačítkem **Edit**. Pod nastavením poskytovatele se zobrazí pole **Inbound (STOP) webhook URL** pouze pro čtení, které obsahuje webovou adresu jedinečnou pro váš kostel. Kliknutím na pole adresu vyberete, zkopírujete a vložte do nastavení příchozích zpráv (odpovědí) webhooku u svého poskytovatele SMS. Funguje to u všech výše uvedených poskytovatelů, kteří dokážou přeposílat příchozí odpovědi na webhook.

Poté, když někdo odpoví **STOP** (nebo STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT či REVOKE) na některou z vašich zpráv, B1 najde všechny osoby s odpovídajícím mobilním číslem, označí je jako odhlášené a vypne jim připomenutí SMS. Poté budou přeskakovány při hromadném odesílání zpráv skupinám. Ostatní odpovědi se ignorují.

:::info
Tato funkce používá stejné nastavení odhlášení jako **Hide me from the member directory**, takže lidé, kteří odpoví STOP, se na svém profilu zobrazí také jako **Hidden from directory**. Pole se zobrazí pouze tehdy, je-li vybrán uložený poskytovatel – pokud v nabídce přepnete na jiného poskytovatele, nejprve uložte změnu, abyste adresu URL znovu uviděli.
:::

Jakmile je poskytovatel připojen, uživatelé s oprávněním k odesílání zpráv uvidí na stránce skupiny tlačítko **Text** (**Text this group**) a na stránce osoby s mobilním telefonem tlačítko **Send text message**. Napište zprávu a klikněte na **Send**. Dialog počítá znaky a segmenty SMS. U skupiny před odesláním zobrazí, kolik členů zprávu obdrží:

- Členové bez uloženého mobilního telefonu budou přeskočeni.
- Členové, kteří zvolili **Hide me from the member directory**, se počítají jako odhlášení a budou přeskočeni.
- Členové rodiny, kteří sdílejí mobilní číslo, dostanou zprávu pouze jednou.

### Personalizace zpráv pomocí polí pro sloučení {#personalizing-texts-with-merge-fields}

Pod polem pro zprávu zobrazuje dialog Text štítky se zástupnými poli: **First Name**, **Last Name**, **Display Name** a **Church Name**. Kliknutím na štítek vložíte jeho zástupný text (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` nebo `{{churchName}}`) na místo kurzoru. Při odeslání zprávy se každé zástupné pole nahradí údaji daného příjemce, takže hromadná zpráva typu `Hi {{firstName}}, see you Sunday!` oslovuje každého člena jeho jménem. Zástupná pole fungují jak u hromadných zpráv, tak u zpráv jednotlivé osobě. U zpráv skupině je k dispozici také štítek **Group Name** (`{{groupName}}`), který se nahradí názvem skupiny.

Chcete-li zprávu znovu použít, uložte ji jako [šablonu zprávy](./email-templates.md#text-templates) (e-mailovou šablonu s kategorií **Text**) a vyberte ji v nabídce **Load Template (optional)** v horní části okna Text.

:::info
Limit 1 600 znaků se vztahuje na zprávu v podobě, v jaké ji píšete. Po doplnění zástupných polí se každý text delší než 1 600 znaků na této délce oříznie.
:::

Zprávy mohou být odesílány automaticky také jako krok [pracovního postupu](../serving/workflows.md#sending-a-text) s akcí **Send Text**, která používá stejného poskytovatele a stejná zástupná pole.

## Úložiště souborů

Soubory, které nahrajete na svůj web (prostřednictvím [Files](../website/files.md)) a do dalších obsahových oblastí, se ve výchozím nastavení ukládají do bezplatného hostovaného úložiště B1 s kapacitou až 100 MB. Pokud potřebujete více místa, můžete připojit vlastní cloudové úložiště – nové nahrávky pak půjdou přímo do vašeho účtu bez limitu platformy.

1. Na stránce Settings klikněte v levém seznamu na **File Storage** a poté v sekci **File Storage** klikněte na **Edit**.
2. Zvolte poskytovatele: **Google Drive**, **Dropbox**, **OneDrive** nebo **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2 apod.).
3. U služeb Google Drive, Dropbox nebo OneDrive klikněte na **Connect** a přihlaste se a udělte přístup. U úložiště typu S3-compatible bucket zadejte přístupový klíč, tajný klíč, název bucketu a základní veřejnou URL.
4. Klikněte na **Save**.

:::info
Toto nastavení ovlivňuje pouze nové nahrávky do souborů vašeho webu a podobných obsahových oblastí. Obrázky z galerie, náhledy, loga a fotografie osob vždy zůstávají ve výchozím úložišti B1.
:::

## Povýšení ročníků

Pokud u dětí a studentů sledujete **Grade** (ročník), může B1 automaticky posunout všechny o ročník výš v datum, které zvolíte (například 1. srpna), místo abyste každý profil museli upravovat ručně.

1. Na stránce Settings klikněte v levém seznamu na **Grade Promotion** a poté v sekci **Grade Promotion** klikněte na **Edit**.
2. Zapněte přepínač (zobrazí se **Enabled**) a zvolte **Month** a **Day**, kdy se mají ročníky každý rok povyšovat. V tento den se každý, kdo má ročník, posune o jeden výš a žáci 12. ročníku získají stav **Graduated**.
3. Uložte změny.

Chcete-li automatické povyšování zastavit, vypněte přepínač tak, aby zobrazoval **Disabled**, a uložte. Datum povýšení se odstraní a ročníky se již nebudou měnit samy od sebe.

## Přihlašování dobrovolníků {#volunteer-signup}

Ve výchozím nastavení členové, kteří procházejí [přihlašování dobrovolníků](../../b1-church/serving/volunteer-signup.md), vidí všechny nadcházející týdny s volnými pozicemi. Pokud je tento seznam dlouhý, můžete místo toho zobrazit pouze nejbližší týden každého typu plánu.

1. Na stránce Settings klikněte v levém seznamu na **Volunteer Signup** a poté v sekci **Volunteer Signup** klikněte na **Edit**.
2. Zapněte možnost **Show only the next week of each plan type**.
3. Uložte změny.

Při zapnuté možnosti každý typ plánu zobrazuje pouze svůj nejbližší nadcházející plán. Další týden se objeví, jakmile toto datum pomine. V řádku **Weeks shown** v této sekci se zobrazí buď **Only the next week of each plan type**, nebo **All upcoming weeks**.

## Ochrana soukromí darů {#giving-privacy}

Osoby s přístupem k darům běžně vidí souhrny darů dané osoby na [záznamu osoby](../people/adding-people.md#editing-details). Pokud nechcete, aby se částky zobrazovaly pokaždé, když se záznam otevře, můžete je skrýt, dokud si je někdo nevyžádá.

1. Na stránce Settings klikněte v levém seznamu na **Giving privacy** a poté v sekci **Giving privacy** klikněte na **Edit**.
2. Zapněte možnost **Hide giving on person records until clicked**.
3. Uložte změny.

Při zapnuté možnosti karta darů na záznamu osoby zobrazuje text „Giving is hidden on person records.“ Kliknutím na **Show giving** se načtou a zobrazí dary dané osoby. Při otevření jiné osoby se znovu skryjí. Kdo může dary vidět, se nemění: kartu vždy uvidí pouze lidé s přístupem k darům.

## Import a export

Odkaz **Import/Export** pod názvem vašeho kostela na stránce Settings otevře samostatný nástroj v novém okně prohlížeče. Použijte jej k:

- importu dat členů z jiného systému pro správu kostela,
- exportu dat ChurchApps pro zálohování nebo migraci.

Tato funkce je velmi užitečná při prvním nastavování kostela, kdy potřebujete přenést stávající záznamy do ChurchApps.

:::warning
Před importem dat vždy nejprve zálohujte stávající záznamy. Importní operace přidávají data do systému a při opakovaném spuštění mohou vytvořit duplicitní položky.
:::
