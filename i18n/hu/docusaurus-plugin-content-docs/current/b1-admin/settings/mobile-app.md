---
title: "Mobilní aplikace – nastavení"
---

# Mobilní aplikace – nastavení

<div class="article-intro">

Na stránce Nastavení mobilní aplikace můžete upravit navigační karty, které se zobrazují ve **mobilní verzi B1.church (PWA)** pro členy vašeho sboru. Určujete, které karty jsou viditelné, kam odkazují a jak se zobrazují.

</div>

## Výukové video

<YouTube id="ydY7WGK16fE" title="Přizpůsobení aplikace pro členy vašeho sboru v B1" />

:::info Nativní aplikace B1 Mobile je zastaralá
Karty nastavené zde se doručují prostřednictvím [progresivní webové aplikace (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), která nahradila nativní aplikaci B1 Mobile. Členům sdílejte stránku pro instalaci vašeho sboru — `https://yourchurchname.b1.church/mobile/install`. Provede je instalací aplikace do jejich zařízení bez nutnosti stahování z App Store nebo Google Play.
:::

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění „Upravit nastavení sboru“. Pokud k němu nemáte přístup, podívejte se na [Role a oprávnění](./roles-permissions.md).
- Nejprve nastavte [Nastavení sboru](./church-settings.md), včetně názvu sboru a vzhledu

</div>

## Přístup k nastavení navigace

1. V aplikaci B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte položku **Mobile**.
2. Klikněte na **Navigace** (`/mobile/navigation`).
3. Stránka Navigace zobrazuje vaše aktuální karty aplikace.

## Přidání nové karty

1. Klikněte na tlačítko **Přidat kartu** v horní části stránky.
2. Vyplňte údaje o kartě:
   - **Název** -- Popisek, který se zobrazí na kartě (například „Kázání“ nebo „Dary“).
   - **Ikona** -- Kliknutím na výběr ikony zvolte ikonu pro kartu.
   - **Obrázek** -- Kliknutím na **Vybrat obrázek** (nebo **Změnit obrázek**) přiřadíte kartě fotografii. Karty s fotografií se na domovské obrazovce aplikace zobrazí jako dlaždice s fotkou -- viz [Dlaždice domovské obrazovky](#home-screen-tiles).
   - **Typ karty** -- Vyberte z možností, jako je Bible, Živý přenos, Dar, Webová stránka a další.
   - **URL** -- Zadejte webovou adresu, na kterou má karta odkazovat.
   - **Viditelnost** -- Určete, kdo kartu uvidí (všichni, pouze členové atd.). U karty **Adresář členů** tato volba řídí pouze to, kdo kartu vidí. Kdo může adresář otevřít, nastavuje položka **Zobrazit v adresáři** na stránce Portál členů (viz [Nastavení adresáře členů a zpráv](#member-directory--messaging-settings)).
3. Kliknutím na **Uložit kartu** přidáte kartu do aplikace.

## Úprava existující karty

1. Klikněte na libovolnou existující kartu v seznamu **Karty aplikace**.
2. Upravte název, ikonu, URL, typ nebo nastavení viditelnosti.
3. Kliknutím na **Uložit kartu** změny použijete.

## Změna pořadí karet

Pořadí karet v mobilní aplikaci můžete změnit. Karty přetáhněte v seznamu myší a uspořádejte je. Pořadí zobrazené na této stránce odpovídá pořadí, které uvidí vaši členové v aplikaci.

:::info
Některé karty se mohou zobrazit automaticky, když nastanou určité podmínky -- například karta Živý přenos se může objevit, když je přenos aktivní. Ručně přidané karty vám dávají plnou kontrolu nad tím, co členové vidí neustále.
:::

:::tip
Udržujte počet karet přehledný. Pro většinu sborů je ideální tři až pět karet. Příliš mnoho karet může členům navigaci ztěžovat.
:::

## Nastavení adresáře členů a zpráv

Položka **Portál členů** v téže části Mobile obsahuje nastavení, která řídí adresář členů a soukromé zprávy v prostředí B1.church:

- **Skupina pro schvalování adresáře** -- Skupina, která kontroluje aktualizace adresáře členů a [žádosti o smazání účtu](../profile/account-deletion.md), než nabydou účinnosti.
- **Zobrazit v adresáři** -- Kdo může adresář členů otevřít a kdo v něm bude uveden: **Pouze správci**, **Členové a výše** (výchozí), **Pravidelní návštěvníci a výše** nebo **Hosté a výše**. Lidé, jejichž stav členství je pod úrovní, kterou zvolíte, adresář neuvidí a nebudou v něm uvedeni. Volba **Pouze správci** zavře adresář všem kromě zaměstnanců s oprávněním People &gt; View (samotný stav členství Staff nestačí). Ti mohou adresář vždy otevřít a vidí všechny členy bez ohledu na toto nastavení. Hosté se nikdy nezahrnují, protože každý, kdo se registruje online, začíná jako host.
- **Předvolba viditelnosti** -- Výchozí nastavení pro celý sbor pro členy, kteří si ještě nezvolili vlastní. **Adresa**, **Telefonní číslo** a **E-mail** mají každý vlastní rozbalovací nabídku se stejnými pěti úrovněmi, které jsou dostupné všude, kde se viditelnost nastavuje:
  - **Všichni** -- Viditelné pro kohokoli, včetně anonymních návštěvníků
  - **Členové** -- Viditelné pouze pro osoby se záznamem Člen nebo Zaměstnanec
  - **Pouze skupiny** -- Viditelné pouze pro osoby, které sdílejí skupinu s touto osobou, a pro zaměstnance
  - **Vedoucí mých skupin a zaměstnanci** -- Viditelné pouze pro vedoucí skupiny, do které tato osoba patří, a pro zaměstnance
  - **Pouze zaměstnanci** -- Viditelné pouze pro zaměstnance (kohokoli se stavem členství Staff nebo s oprávněním People &gt; View) a pro danou osobu samotnou

  „Zaměstnanec“ na těchto úrovních znamená kohokoli se stavem členství Staff nebo s oprávněním People &gt; View. Změny skupin se projeví okamžitě: někdo, kdo se připojí ke skupině nebo se stane vedoucím skupiny, uvidí odpovídající údaje členů této skupiny s úrovní **Pouze skupiny** nebo **Vedoucí mých skupin a zaměstnanci**, aniž by se musel odhlásit a znovu přihlásit.

  Členové mohou tyto výchozí hodnoty přepsat pro svůj vlastní záznam na kartě **Soukromí** ve svém profilu v PWA B1.church -- viz [Úprava vašeho profilu](/docs/b1-church/getting-started/me-page).
- **Minimální věk pro soukromé zprávy** -- Ochrana dětí. B1 neotevře **novou** konverzaci se soukromými zprávami, pokud je některá ze dvou osob mladší tohoto věku, a to podle data narození (pokud není datum narození uvedeno, použije se role v domácnosti). Lidé mladší tohoto věku zůstávají v adresáři plně viditelní -- blokováno je pouze přímé posílání zpráv, a to **v obou směrech**, pro všechny, včetně zaměstnanců. Skupinové konverzace a zprávy rodičům dítěte stále fungují. Na výběr jsou možnosti Vypnuto, 13, 16 nebo 18; výchozí je **18**. Stávající konverzace tímto nejsou dotčeny.

:::tip
Protože kontrola minimálního věku se opírá o data narození, ujistěte se, že jsou u dětí ve vašem sboru vyplněna. Toto nastavení patří do stejné skupiny ochrany dětí jako [bezpečnostní opatření při přihlašování](../attendance/checkin-safety.md).
:::

### Výzva k přihlášení na domovské obrazovce

Návštěvníci, kteří otevřou [domovskou obrazovku](/docs/b1-church/getting-started/navigating#home) aplikace bez přihlášení, uvidí krátkou výzvu -- ve výchozím nastavení *„Přihlaste se a zobrazte své skupiny, dary a další.“* -- vedle tlačítka **Přihlásit se**. Nastavení **Výzvy k přihlášení na domovské obrazovce** na stejné stránce Portál členů (`/mobile/b1-mobile`) umožňuje její úpravu:

- **Zobrazit výzvu k přihlášení na domovské obrazovce aplikace** -- Vypnutím skryjete výzvu i tlačítko **Přihlásit se** z domovské obrazovky. Návštěvníci se mohou přihlásit i z nabídky aplikace.
- **Text výzvy k přihlášení** -- Nahraďte výchozí znění vlastní zprávou (až 150 znaků). Pokud pole necháte prázdné, použije se výchozí text. Toto pole je zakázáno, dokud je výzva vypnutá.

Kliknutím na **Uložit** změny použijete. Zpráva **Uloženo** potvrdí změnu. Uložení obnoví mezipaměť nastavení aplikace, takže se změna projeví při příštím načtení domovské obrazovky.

### Dlaždice domovské obrazovky

Karty s fotografií (viz **Obrázek** v části [Přidání nové karty](#adding-a-new-tab)) se na [domovské obrazovce](/docs/b1-church/getting-started/navigating#home) aplikace zobrazí jako dlaždice s fotkou v sekci nadepsané názvem vašeho sboru. Patří sem i karta Text dne, pokud jí přiřadíte fotografii. Karty s fotografií se zobrazují i na liště karet.

Nastavení **Dlaždice domovské obrazovky** na stejné stránce Portál členů (`/mobile/b1-mobile`) řídí rozvržení těchto dlaždic. Vyberte **Rozvržení**:

- **Mřížka** -- Dvě dlaždice v řádku (výchozí). Pokud je počet dlaždic lichý, první dlaždice zabere celou šířku.
- **Posouvací řádek** -- Jeden řádek dlaždic, který členové posouvají do stran.
- **Posouvání (automatické)** -- Stejný vodorovný řádek, ale posouvá se sám od sebe, přibližně každé čtyři sekundy posune o jednu dlaždici a na konci se vrátí na začátek. Pozastaví se, když se člen řádku dotkne, najede na něj kurzorem nebo se na něj přepne klávesou Tab, a po několika sekundách pokračuje. Na zařízeních s omezeným pohybem řádek zůstává nehybný a funguje jako **Posouvací řádek**.
- **Seznam** -- Seznam s malým náhledem fotografie vedle názvu každé karty.

Kliknutím na **Uložit** změny použijete.

### Sekce domovské obrazovky

Přihlášení členové vždy vidí svou historii docházky a odeslané formuláře na [stránce Já](/docs/b1-church/getting-started/me-page). Přepínače **Sekce domovské obrazovky** na stejné stránce Portál členů (`/mobile/b1-mobile`) je mohou zobrazit i na domovské obrazovce:

- **Zobrazit Moji docházku na domovské obrazovce** -- Přidá sekci **Moje docházka** s počtem návštěv člena za posledních 90 dní, jeho dvěma posledními návštěvami a odkazem **Historie** na úplný seznam docházky.
- **Zobrazit Moje formuláře na domovské obrazovce** -- Přidá sekci **Moje formuláře** se dvěma posledními odeslanými formuláři člena a odkazem **Všechny formuláře**.

Obě možnosti jsou ve výchozím nastavení vypnuté. Sekce se zobrazí pouze přihlášeným členům, kteří mají alespoň jeden záznam k zobrazení. Kliknutím na **Uložit** změny použijete.

## Kde se karty zobrazují

Karty, které zde nastavíte, se zobrazují v **PWA B1.church**, kterou si vaši členové nainstalují z libovolné stránky na `https://yourchurchname.b1.church`. Změny na této stránce se projeví při příštím otevření aplikace členem.

Na telefonu zobrazuje spodní lišta karet položky **Domů**, až tři vaše karty a **Více**; na počítači záhlaví zobrazuje až pět karet. Vestavěné obrazovky (například Kázání, Dary nebo Skupiny) dostávají místa přednostně a karty **Interní stránka** vyplní všechna zbývající volná místa. Karty **Externí URL** a **Text dne** místo na liště nikdy nezískají. Každá karta, včetně těch, které se na lištu nevejdou, je uvedena na stránce **Více** v aplikaci. Co členové vidí, popisuje článek [Navigace v aplikaci B1](/docs/b1-church/getting-started/navigating). (Karty se také vykreslují v zastaralé [nativní aplikaci B1 Mobile](/docs/b1-mobile/) pro členy, kteří ji ještě používají, ale tato aplikace je zastaralá a už se neaktualizuje.)

## Další kroky

- [Nastavení sboru](./church-settings.md) -- Nastavte informace o sboru a jeho vzhled
- [Role a oprávnění](./roles-permissions.md) -- Spravujte přístup pro svůj tým
