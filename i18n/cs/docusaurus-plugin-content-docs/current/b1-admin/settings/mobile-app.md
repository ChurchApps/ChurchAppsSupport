---
title: "Nastavení mobilní aplikace"
---

# Nastavení mobilní aplikace

<div class="article-intro">

Stránka Nastavení mobilní aplikace umožňuje nakonfigurovat navigační karty, které se vašim členům církve zobrazují v **prostředí B1.church pro mobily (PWA)**. Určujete, které karty jsou viditelné, kam odkazují a jak se zobrazují.

</div>

## Výukové video

<YouTube id="ydY7WGK16fE" title="Přizpůsobení aplikace pro členy vaší církve v B1" />

:::info Nativní aplikace B1 Mobile je zastaralá
Karty nastavené zde se zobrazují prostřednictvím [progresivní webové aplikace (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), která nahradila nativní aplikaci B1 Mobile. Sdílejte s členy stránku pro instalaci vaší církve — `https://yourchurchname.b1.church/mobile/install`. Provede je instalací aplikace do zařízení a nebude potřeba nic stahovat z App Store ani Google Play.
:::

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění „Edit Church Settings“. Pokud k němu nemáte přístup, podívejte se na [Role a oprávnění](./roles-permissions.md).
- Nejprve nakonfigurujte [nastavení církve](./church-settings.md), včetně názvu církve a brandingu.

</div>

## Přístup k nastavení navigace

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte **Mobile**.
2. Klikněte na **Navigation** (`/mobile/navigation`).
3. Stránka Navigation zobrazuje vaše aktuální karty aplikace.

## Přidání nové karty

1. Klikněte na tlačítko **Add Tab** v horní části stránky.
2. Vyplňte údaje o kartě:
   - **Name** -- Popisek, který se zobrazí na kartě (například „Kázání“ nebo „Dary“).
   - **Icon** -- Klikněte na výběr ikony a zvolte ikonu pro kartu.
   - **Image** -- Klikněte na **Select Image** (nebo **Change Image**) a přiřaďte kartě fotografii. Karty s fotografií se na domovské obrazovce aplikace zobrazují jako dlaždice s fotkou -- viz [Dlaždice na domovské obrazovce](#home-screen-tiles).
   - **Tab Type** -- Vyberte z možností, jako jsou Bible, Live Stream, Donation, Website a další.
   - **URL** -- Zadejte webovou adresu, na kterou má karta odkazovat.
   - **Visibility** -- Určete, kdo kartu uvidí (všichni, pouze členové atd.). U karty **Member Directory** toto nastavení určuje pouze to, kdo kartu vidí. Kdo může adresář otevřít, nastavuje volba **Show in Directory** na stránce Member portal (viz [Nastavení adresáře členů a zpráv](#member-directory--messaging-settings)).
3. Klikněte na **Save Tab**, čímž kartu přidáte do aplikace.

## Úprava existující karty

1. Klikněte na libovolnou existující kartu v seznamu **App Tabs**.
2. Upravte název karty, ikonu, URL, typ nebo nastavení viditelnosti.
3. Klikněte na **Save Tab**, čímž změny použijete.

## Změna pořadí karet

Pořadí, v jakém se karty v mobilní aplikaci zobrazují, můžete změnit. Karty v seznamu přetáhněte myší na jiné místo. Pořadí zobrazené na této stránce odpovídá pořadí, které členové uvidí v aplikaci.

:::info
Některé karty se mohou zobrazit automaticky, když nastanou určité podmínky. Například karta Live Stream se může objevit, když je spuštěný přenos. Ručně přidané karty vám dávají plnou kontrolu nad tím, co členové vidí v každou chvíli.
:::

:::tip
Udržujte počet karet přehledný. Pro většinu církví je ideální tři až pět karet. Příliš mnoho karet může členům navigaci zkomplikovat.
:::

## Nastavení adresáře členů a zpráv

Položka **Member portal** ve stejné sekci Mobile obsahuje nastavení, kterými se řídí adresář členů a soukromé zprávy v prostředí B1.church:

- **Directory Approval Group** -- Skupina, která před zapsáním v platnost kontroluje změny v adresáři členů a [žádosti o smazání účtu](../profile/account-deletion.md).
- **Show in Directory** -- Kdo může adresář členů otevřít a kdo se v něm zobrazí: **Admins Only**, **Members and Above** (výchozí), **Regular Attendees and Above** nebo **Visitors and Above**. Lidé, jejichž stav členství je nižší než úroveň, kterou zvolíte, adresář neuvidí a v seznamu se neobjeví. **Admins Only** uzavře adresář všem kromě zaměstnanců s oprávněním People &gt; View (samotný stav členství Staff nestačí). Ti mohou adresář vždy otevřít a vidí všechny členy bez ohledu na toto nastavení. Hosté se nikdy nezobrazují, protože každý, kdo se registruje online, je zpočátku host.
- **Visibility Preference** -- Výchozí nastavení pro celou církev, které platí pro členy, kteří si zatím sami nezvolili vlastní možnost. **Address**, **Phone Number** a **Email** mají každý vlastní rozbalovací seznam se stejnými pěti úrovněmi, které jsou dostupné všude, kde se nastavuje viditelnost:
  - **Everyone** -- Viditelné pro kohokoli, včetně anonymních návštěvníků.
  - **Members** -- Viditelné pouze pro osoby se záznamem člena nebo zaměstnance.
  - **Groups Only** -- Viditelné pouze pro osoby, které sdílejí skupinu s touto osobou, a dále pro zaměstnance.
  - **My Group Leaders and Staff** -- Viditelné pouze pro vedoucí skupiny, do které tato osoba patří, a dále pro zaměstnance.
  - **Staff Only** -- Viditelné pouze pro zaměstnance (kohokoli, kdo má stav členství Staff nebo oprávnění People &gt; View), a dále pro danou osobu samotnou.

  „Zaměstnanci“ v těchto úrovních znamenají každého, kdo má stav členství Staff nebo oprávnění People &gt; View. Změny ve skupinách se projeví okamžitě: kdo se připojí ke skupině nebo se stane jejím vedoucím, uvidí údaje členů této skupiny odpovídající úrovním **Groups Only** nebo **My Group Leaders and Staff**, aniž by se musel odhlásit a znovu přihlásit.

  Členové mohou tyto výchozí hodnoty přepsat pro svůj vlastní záznam na kartě **Privacy** ve svém profilu v PWA B1.church. Viz [Úprava profilu](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Ochrana dětí. B1 neotevře **novou** konverzaci v soukromých zprávách, pokud je některá ze stran mladší než tento věk. Věk se počítá podle data narození (pokud není uvedeno, použije se jako náhrada role v domácnosti). Lidé mladší tohoto věku zůstávají v adresáři plně viditelní. Blokovaní jsou pouze přímé zprávy, a to **v obou směrech** a pro všechny, včetně zaměstnanců. Skupinové konverzace a zprávy rodičům dítěte fungují dál. Na výběr je Off, 13, 16 nebo 18. Výchozí hodnota je **18**. Stávající konverzace tím nejsou dotčeny.

:::tip
Protože kontrola minimálního věku se opírá o data narození, ujistěte se, že jsou u dětí ve vašem sboru vyplněna. Toto nastavení patří do stejné skupiny ochranných opatření pro děti jako [bezpečnostní nastavení přihlašování](../attendance/checkin-safety.md).
:::

### Výzva k přihlášení na domovské obrazovce

Návštěvníci, kteří otevřou [domovskou obrazovku](/docs/b1-church/getting-started/navigating#home) aplikace bez přihlášení, uvidí krátkou výzvu. Ve výchozím nastavení zní: *„Sign in to see your groups, giving, and more.“* Vedle ní je tlačítko **Sign In**. Na stejné stránce Member portal (`/mobile/b1-mobile`) můžete výzvu změnit v nastavení **Home screen sign-in prompt**:

- **Show sign-in prompt on the app home screen** -- Vypnutím skryjete výzvu i tlačítko **Sign In** z domovské obrazovky. Návštěvníci se mohou přihlásit i nadále z nabídky aplikace.
- **Sign-in prompt text** -- Nahraďte výchozí text vlastní zprávou (až 150 znaků). Pokud pole nechcete vyplňovat, nechte ho prázdné a použije se výchozí text. Toto pole je neaktivní, dokud je výzva vypnutá.

Klikněte na **Save**, čímž změny použijete. Zpráva **Saved** potvrdí uložení. Uložení obnoví uložená nastavení aplikace, takže se změna projeví při příštím načtení domovské obrazovky.

### Dlaždice na domovské obrazovce

Karty s fotografií (viz **Image** v části [Přidání nové karty](#adding-a-new-tab)) se na [domovské obrazovce](/docs/b1-church/getting-started/navigating#home) aplikace zobrazují jako fotografické dlaždice v sekci s názvem vaší církve. Patří sem i karta Verse of the Day, pokud jí přiřadíte fotografii. Karty s fotografií se zobrazují také v liště karet.

Nastavení **Home screen tiles** na stejné stránce Member portal (`/mobile/b1-mobile`) určuje rozložení těchto dlaždic. Vyberte **Layout**:

- **Grid** -- Dvě dlaždice v řádku (výchozí). Pokud je počet dlaždic lichý, první dlaždice zabere celou šířku.
- **Scrolling row** -- Jeden řádek dlaždic, které členové posouvají do stran.
- **Scrolling (automatic)** -- Stejný posuvný řádek, který se ale pohybuje sám. Každé přibližně čtyři sekundy posune o jednu dlaždici a na konci se vrátí na začátek. Pozastaví se, když se člen řádku dotkne, na něj najede kurzorem nebo se do něj zaklikne, a po několika sekundách pokračuje. Na zařízeních s omezeným pohybem řádek zůstává nehybný a funguje jako **Scrolling row**.
- **List** -- Seznam s malým náhledem fotografie vedle názvu každé karty.

Klikněte na **Save**, čímž změny použijete.

### Sekce na domovské obrazovce

Přihlášení členové mají vždy k dispozici svou historii docházky a odeslané formuláře na [stránce Me](/docs/b1-church/getting-started/me-page). Přepínače **Home screen sections** na stejné stránce Member portal (`/mobile/b1-mobile`) umožňují zobrazit je i na domovské obrazovce:

- **Show My Attendance on Home** -- Přidá sekci **My Attendance**, která ukazuje, kolikrát se člen za posledních 90 dní zúčastnil, jeho dvě poslední návštěvy a odkaz **History** na celý seznam jeho účasti.
- **Show My Forms on Home** -- Přidá sekci **My Forms** se dvěma posledními odeslanými formuláři člena a odkazem **All forms**.

Obě jsou ve výchozím nastavení vypnuté. Sekce se zobrazí jen přihlášeným členům, kteří mají alespoň jeden záznam k zobrazení. Klikněte na **Save**, čímž změny použijete.

## Kde se karty zobrazují

Karty, které zde nastavíte, se zobrazují v **PWA B1.church**, kterou si členové nainstalují z libovolné stránky na adrese `https://yourchurchname.b1.church`. Změny provedené na této stránce se projeví při příštím otevření aplikace členem.

Na telefonu spodní lišta zobrazuje **Home**, až tři vaše karty a **More**. Na počítači hlavička zobrazí až pět karet. Vestavěné obrazovky (například Sermons, Giving nebo Groups) dostávají místa jako první a karty **Internal Page** zaplní všechna volná místa. Karty **External URL** a **Verse of the Day** se na lištu nikdy nedostanou. Každá karta, včetně těch, které se na lištu nevešly, je uvedena na stránce **More** v aplikaci. Co členové vidí, popisuje [Navigace v B1App](/docs/b1-church/getting-started/navigating). Karty se také zobrazují ve starší [nativní aplikaci B1 Mobile](/docs/b1-mobile/) pro členy, kteří ji ještě používají. Tato aplikace je ale zastaralá a již se neaktualizuje.

## Další kroky

- [Nastavení církve](./church-settings.md) -- Nastavení informací o církvi a brandingu
- [Role a oprávnění](./roles-permissions.md) -- Správa přístupu pro váš tým
