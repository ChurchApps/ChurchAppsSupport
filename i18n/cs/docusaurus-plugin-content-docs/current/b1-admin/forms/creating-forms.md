---
title: "Vytváření formulářů"
description: "Vytvářejte v B1 Admin vlastní formuláře pro registrace na akce, průzkumy a návštěvní karty a sdílejte je odkazem, QR kódem nebo tiskem."
---

# Vytváření formulářů

<div class="article-intro">

Vytvořte si vlastní formuláře pro sběr informací od členů sboru. Můžete vytvářet formuláře pro registrace na akce, průzkumy, návštěvnické karty, žádosti o členství a další účely. Formuláře lze propojit s osobami ve vaší databázi nebo použít jako samostatné stránky s vlastní veřejnou adresou URL.

</div>

## Video k výuce

<YouTube id="sr9wxEj9ghQ" title="Vytváření formulářů a správa odpovědí v B1" next="Spuštění webu vašeho sboru v B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Než začnete</h4>

- U formulářů **Osoby** (propojených se záznamy osob) nejprve potřebujete [osoby ve své databázi](../people/adding-people.md).
- U formulářů, které přijímají **platby**, musíte mít nejprve nastaveno [Stripe pro online dary](../donations/online-giving-setup.md).

</div>

## Vytvoření nového formuláře

1. Otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře v B1 Admin), rozbalte **Osoby** a klikněte na **Formuláře**.
2. Klikněte na **Přidat formulář**.
3. Zadejte **název** formuláře.
4. V rozbalovacím seznamu **Přiřadit k** zvolte typ formuláře:
   - **Osoby** — Přiřazuje odpovědi k [záznamům osob](../people/adding-people.md) ve vaší databázi. Formuláře pro osoby se vyplňují z osobního záznamu, takže nemají sdílitelný odkaz.
   - **Samostatný** — Vytvoří nezávislý formulář s vlastní veřejnou adresou URL, ideální pro externí registrace. Pouze samostatné formuláře nabízejí [záhlavní fotografii](#adding-a-header-photo), [QR kód](#sharing-a-form-with-a-qr-code), [propojenou skupinu](#linking-a-form-to-a-group) a možnost **Vytvořit záznam osoby z odpovědí**.
5. Klikněte na **Uložit** a vytvořte formulář.

Váš nový formulář se zobrazí v seznamu. Kliknutím na něj začnete přidávat otázky.

## Tisk prázdného formuláře {#printing-a-blank-form}

Potřebujete papírovou verzi k rozdání, například návštěvnickou kartu u uvítacího stolku, nebo formulář, který může někdo bez přístupu k internetu vyplnit ručně? Na hlavním seznamu formulářů klikněte vedle formuláře na **Tisk**, otevřete náhled a potom klikněte na **Tisk**. Prázdná pole se vytisknou s podtržítkem nebo zaškrtávacím políčkem u každé otázky, aby je lidé mohli vyplnit ručně. Povinné otázky jsou označeny hvězdičkou. V horní části stránky se zobrazí logo vašeho sboru (**logo pro světlé pozadí** z [Web > Vzhled](../website/appearance.md), pokud jste ho nahráli) a pod ním název sboru, poté název formuláře. Jiné možnosti tisku nejsou k dispozici – vytisknete buď celý formulář, nebo nic.

## Sdílení formuláře pomocí QR kódu {#sharing-a-form-with-a-qr-code}

Samostatné formuláře mají na hlavním seznamu formulářů vedle sebe odkaz **QR kód** (archivované formuláře ho nemají). Kliknutím na něj otevřete QR kód pro veřejnou adresu URL formuláře, pod kterým je zobrazen odkaz. Kliknutím na **Stáhnout PNG** uložíte kód jako obrázek, který můžete vytisknout do pořadu bohoslužby nebo zobrazit na promítání. Kdo ho naskenuje, otevře formulář v telefonu.

## Přidávání otázek {#adding-questions}

1. Otevřete svůj formulář a přejděte na záložku **Otázky**.
2. Klikněte na **Přidat otázku**.
3. V rozbalovacím seznamu Poskytovatel vyberte **typ pole**. Mezi dostupné typy patří:
   - **Textové pole** — Pro krátké textové odpovědi
   - **Datum** — Pro výběr data
   - **E-mail** — Pro e-mailové adresy
   - **Telefonní číslo** — Pro zadání telefonu
   - **Výběr z možností** — Pro výběr z předem určených možností
   - **Platba** — Pro přijímání plateb
4. Zadejte **Nadpis** a volitelný **Popis** otázky. Popis se zobrazí pod otázkou, když lidé formulář vyplňují, takže ho použijte pro nápovědu, například „Uveďte případné alergie, o kterých bychom měli vědět.“
5. Zaškrtněte **Vyžadovat odpověď**, pokud je pole povinné.
6. Klikněte na **Uložit**.
7. Opakováním přidejte další otázky.

:::warning
Typ pole **Platba** vyžaduje nastavené Stripe. Pokud jste ještě nenastavili online dary, než přidáte platební pole, podívejte se na [Nastavení online darů](../donations/online-giving-setup.md). Lidé, kteří platí na formuláři bez přihlášení, musí před přijetím karty zaškrtnout políčko **Nejsem robot**.
:::

## Správa členů formuláře {#managing-form-members}

1. Otevřete svůj formulář a přejděte na záložku **Členové formuláře**.
2. Vyhledejte osobu a přidejte ji s rolí:
   - **Správce** — Může formulář upravovat a zobrazovat všechny odpovědi.
   - **Pouze zobrazení** — Může zobrazovat odpovědi, ale nemůže formulář upravovat.

## Propojení formuláře se skupinou {#linking-a-form-to-a-group}

Libovolný samostatný formulář můžete propojit se skupinou, například formulář s modlitebními prosbami pro malou skupinu nebo lékařské potvrzení pro výlet mládeže:

1. Otevřete **Podrobnosti** formuláře.
2. V části **Propojená skupina** vyberte skupinu, nebo ponechte možnost **Žádná**.
3. Klikněte na **Uložit**.

Jakmile je formulář propojen:

- **Členové skupiny** vidí formulář v sekci **Formuláře** na stránce skupiny na B1.church, dokud je formulář otevřený. Tlačítko **Vyplnit** ho otevře (viz [Podrobnosti skupiny](../../b1-church/groups/group-details.md#linked-forms)).
- **Vedoucí skupiny** vidí i uzavřené formuláře a mohou číst odpovědi všech účastníků a tisknout je (jednu odpověď nebo **Vytisknout vše**). Vedoucí mohou odpovědi pouze zobrazit – formulář nemohou upravovat, pokud nejsou zároveň [členy formuláře](#managing-form-members).
- **V B1 Admin** zobrazuje stránka skupiny sekci **Propojené formuláře**, která vypisuje každý propojený formulář se stavem **Otevřený** nebo **Uzavřený**. Sekce je viditelná pro vedoucí skupiny a pro osoby, které mohou formuláře spravovat. Viz [Členové skupiny](../groups/group-members.md#linked-forms).

Formulář je uzavřený, pokud je mimo časové období dostupnosti. Archivované formuláře se na stránce skupiny nezobrazují.

### Automatické přidávání odesílatelů do skupiny {#automatically-adding-submitters-to-a-group}

Propojení formuláře se skupinou samo o sobě nikoho do skupiny nepřidá. Chcete-li přidat všechny odesílatele do soupisu propojené skupiny, zapněte také možnost **Vytvořit záznam osoby z odpovědí** v podrobnostech formuláře a klikněte na **Uložit**.

Pokaždé, když někdo formulář odešle, je přiřazená nebo nově vytvořená osoba přidána do skupiny (osoby, které již ve skupině jsou, se přeskočí). Je to užitečné například u přihlašovacího formuláře na tábor, který má automaticky vytvořit soupis účastníků tábora.

### Odeslání navazujícího e-mailu

Když máte zapnutou možnost **Vytvořit záznam osoby z odpovědí**, můžete také poslat e-mail každé osobě, která formulář odešle. V podrobnostech formuláře vyplňte **Předmět navazujícího e-mailu** a **Text navazujícího e-mailu**. V obou můžete použít značky `{firstName}` a `{churchName}`. E-mail se odešle pouze tehdy, když jsou vyplněna obě pole.

:::info
Navazující e-maily se odesílají až poté, co váš sbor získá schválení k odesílání e-mailů skupinám, a počítají se do denního limitu e-mailů vašeho sboru. Viz [Zapnutí e-mailů skupin pro váš sbor](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplikování formuláře

Chcete-li použít formulář jako výchozí bod pro nový, klikněte na seznamu formulářů vedle něj na **Duplikovat** a potvrďte. B1 vytvoří přesnou kopii formuláře včetně všech otázek, kterou pak můžete přejmenovat a upravit nezávisle na originálu.

:::tip
Duplikování se hodí u opakujících se akcí, kde zůstávají registrační otázky stejné z roku na rok. Zduplikujte loňský formulář, aktualizujte název a data a můžete začít.
:::

## Nastavení vlastností formuláře

Název a nastavení formuláře můžete kdykoli změnit. U samostatných formulářů uvidíte také jedinečnou **veřejnou adresu URL**, kterou můžete sdílet s kýmkoli, a pole **Popis** – text zobrazený nad otázkami na veřejné stránce formuláře, který je užitečný k vysvětlení, k čemu formulář slouží, dříve než ho lidé začnou vyplňovat.

### Přidání záhlavní fotografie {#adding-a-header-photo}

Samostatné formuláře mohou v horní části zobrazovat **záhlavní fotografii**. V podrobnostech formuláře klikněte na políčko fotografie nebo na **Přidat fotografii**, poté vyberte nebo nahrajte obrázek (ořízne se na tvar 16:9). Klikněte na **Uložit**. Fotografie se zobrazí pod názvem formuláře, nad popisem, na stránce s veřejnou adresou URL formuláře a všude tam, kde je formulář vložen na web pomocí prvku webu **Formulář**. Pomocí **Změnit fotografii** ji nahradíte nebo pomocí **Odebrat** ji smažete.

Do pole **Poděkování** nastavíte, co lidé uvidí po odeslání formuláře, včetně stránky s veřejnou adresou URL formuláře. Pokud ho necháte prázdné, uvidí text „Děkujeme za odeslání formuláře!“

:::tip
Samostatné formuláře se hodí pro registrace na akce. Sdílejte veřejnou adresu URL e-mailem nebo na sociálních sítích, nebo formulář vložte přímo na web svého sboru.
:::

:::info
Chcete-li vložit formulář na svůj web v B1, otevřete editor webu, přidejte novou sekci a vyberte prvek **Formulář**. Poté vyberte formulář, který chcete zobrazit. Podrobnosti o úpravách webu najdete v části [Správa stránek](../website/managing-pages.md).
:::
