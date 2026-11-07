---
title: "Přidávání osob"
---

# Přidávání osob

<div class="article-intro">

Sekce Lidé je základem aplikace B1 Admin – je to databáze členů vaší církve. Všechny ostatní funkce (skupiny, docházka, dary, formuláře) se vztahují k záznamům osob. Tento průvodce vás provede přidáním někoho do databáze, úpravou jeho údajů a propojením členů rodiny do domácností.

</div>

## Video s návodem

<YouTube id="NTL1UDQpx8s" title="Přidávání osob a domácností v B1" next="Import databáze osob do B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete aktivní účet B1 Admin s oprávněním spravovat osoby. Pokud si nejste jisti svou úrovní přístupu, podívejte se na [Role a oprávnění](roles-permissions.md).
- Pokud přidáváte více než pár osob, zvažte použití nástroje [import z CSV](importing-data.md).

</div>

## Přidání osoby

1. Přejděte na nástěnku B1.church Admin.
2. Otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Osoby** a klikněte na **Osoby**.
3. Klikněte na tlačítko **Přidat osobu** v záhlaví stránky. Stránka se posune dolů k formuláři **Nová osoba** pod seznamem.
4. Vyplňte **Křestní jméno**, **Příjmení** a **E-mail** a klikněte na **Přidat**.

Otevře se profil osoby, kde můžete doplnit další údaje.

:::tip
Pokud přecházíte z jiného systému pro správu církve, funkce [Import dat](importing-data.md) umožňuje nahrát celý adresář ze souboru CSV. Je to mnohem rychlejší než přidávat osoby jednu po druhé.
:::

### Upozornění na duplicity

Pokud e-mailová adresa (nebo při vytváření osoby z úplného formuláře Upravit telefonní číslo či shoda křestního jména, příjmení a data narození) odpovídá někomu, kdo už je ve vaší databázi, zobrazí se dialog **Možná duplicita** dříve, než se nový záznam uloží. Vypíše každou shodující se osobu spolu s jejím e-mailem, telefonem a datem narození, abyste je mohli porovnat.

- Klikněte na **Použít existující** u shody a použijete záznam této osoby místo vytvoření nového.
- Klikněte na **Přesto vytvořit**, pokud chcete osobu přidat, i když byla nalezena možná shoda.

Kontrola duplicit probíhá pouze při vytváření nové osoby. Úprava existujícího záznamu ji nikdy nespustí. Slouží pouze k zabránění vzniku nových duplicit; nesloučí dva již existující záznamy.

## Úprava údajů

1. Na profilu osoby klikněte vlevo pod jejími kontaktními údaji na tlačítko **Upravit**.
2. Ve formuláři **Osobní údaje** doplňte další informace, například **Oslovení** (vyberte Mr, Mrs, Miss, Ms, Dr, Prof, Rev nebo Pastor ze seznamu, nebo zadejte vlastní, až 10 znaků), prostřední jméno, stav členství (**Návštěvník**, **Host**, **Pravidelný účastník**, **Člen**, **Zaměstnanec**, **Neaktivní** nebo **Zesnulý**), data, adresu, telefonní čísla a (u dětí a studentů) ročník a školu.
3. Klikněte na **Uložit**, čímž osobní údaje uložíte.

Levá strana profilu zobrazuje fotografii osoby, jméno, stav členství, kontaktní údaje, hodnoty [vlastních polí](../settings/custom-fields.md) a její domácnost. Pod domácností se zobrazuje **Přidáno** s datem vytvoření záznamu (pouze u osob přidaných od konce října 2026). Kliknutím na fotografii ji změníte. Pod tlačítkem **Upravit** najdete další akce: **Pracovní postup** (přidat osobu do [pracovního postupu](../serving/workflows.md)), **Sloučit**, **Exportovat** a **Exportovat data**.

Zbytek profilu obsahuje přehledovou sekci pro každý typ souvisejících informací:

- **Docházka** ukazuje, které z posledních několika týdnů osoba navštívila, a její nejnovější návštěvy. Kliknutím na **Všechny roky** zobrazíte celou historii návštěv včetně sboru, bohoslužby, času bohoslužby, skupiny a sloupce **Přihlášeno** s časem přihlášení na kiosku (u návštěv bez přihlášení na kiosku se zobrazí pomlčka). Na **Tisk** kliknete, pokud chcete výpis vytisknout. Výtisk má logo a název vaší církve vycentrované nahoře nad jménem osoby. Pro celocírkevní trendy, nikoli historii jedné osoby, viz [Sledování docházky](../attendance/tracking-attendance.md).
- **Dary** ukazují letošní dary, včetně darů do nedaňových fondů. Kliknutím na **Všechny roky** zobrazíte celou [historii darů](../donations/recording-donations.md), nebo na **Zaznamenat dar** zapíšete nový. Pokud vaše církev zapnula [ochranu soukromí darů](../settings/church-settings.md#giving-privacy), zůstanou částky skryté, dokud neklikněte na **Zobrazit dary**.
- **Skupiny** vypisují [členství osoby ve skupinách](../groups/group-members.md) s údajem **Připojen** a datem připojení ke každé skupině, pokud je evidováno.
- **Poznámky** zobrazují nedávné poznámky o osobě (pastorační péče, následné kroky apod.). Kliknutím na **Všechny poznámky** je přečtete a přidáte nové. U každé poznámky je uvedeno, kdo ji napsal, a datum a čas zveřejnění. Chcete-li zobrazit nedávné poznámky u všech osob najednou, použijte stránku [Poznámky](./notes.md).
- **Formuláře** vypisují formuláře osoby a to, zda byl každý odeslán (viz níže [Práce s formuláři](#working-with-forms)).

Když otevřete některý z těchto úplných pohledů, klikněte na odkaz **Zpět na** s jménem osoby nahoře, čímž se vrátíte na profil.

## Odeslání e-mailu osobě

Pokud má osoba uvedenou e-mailovou adresu, pod jejími kontaktními údaji vlevo v profilu se zobrazí tlačítko **E-mail**.

1. Na profilu osoby klikněte na **E-mail**.
2. Otevře se dialog **E-mail** s názvem podle jména osoby, který zobrazuje **Odeslat na** s adresou osoby.
3. Volitelně vyberte uloženou šablonu z **Načíst šablonu (nepovinné)**.
4. Zadejte **Předmět** a napište zprávu.
5. Klikněte na **Odeslat e-mail**.

Chcete-li zprávu napsat ve svém poštovním programu, klikněte na **Otevřít v mé e-mailové aplikaci**.

:::info
Odesílání z aplikace B1 podléhá stejnému schválení a denním limitům jako e-mail skupinám. Pokud vaše církev ještě nebyla schválena, dialog vás požádá o zažádání o kontrolu. Mezitím můžete kliknout na **Otevřít v mé e-mailové aplikaci**. Viz [Zapnutí e-mailu skupin pro vaši církev](../groups/group-members.md#turning-on-group-email-for-your-church). Uživatelé bez oprávnění upravovat členy skupin po kliknutí na **E-mail** přejdou rovnou do své e-mailové aplikace.
:::

## Práce s formuláři

Vlastní formuláře můžete vyplňovat přímo z profilu osoby. Jsou to uživatelsky definované formuláře, které si můžete vytvořit podle průvodce [Vytváření formulářů](../forms/creating-forms.md).

1. Na profilu osoby najděte sekci **Formuláře**. Vypisuje každý formulář a zda byl **Odeslán**, nebo **Neodeslán**.
2. Kliknutím na název formuláře jej otevřete (nebo kliknutím na **Všechny formuláře** zobrazíte úplný seznam).
3. Klikněte na **ikonu úprav** (tužku) u formuláře, doplňte údaje a klikněte na **Uložit**.

Jakmile je formulář odeslán, kliknutím na **ikonu tisku** vedle něj vytisknete vyplněné odpovědi dané osoby. Pokud má osoba jediné odeslání daného formuláře, zobrazí se nad odpověďmi stav **Odeslán** s datem.

Pokud odeslání přiřadila špatné osobě, klikněte na ikonu **Změnit osobu** (dvě šipky) vedle něj a přesuňte ho k jiné osobě, nebo ho odpojte. Viz [Změna osoby u odeslání](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Formuláře propojené s profilem osoby používají typ formuláře **Osoby**. Pokud potřebujete samostatný formulář (například registraci na akci), viz [možnost samostatného formuláře](../forms/creating-forms.md) v průvodci formuláři.
:::

:::tip
Pokud potřebujete sledovat jen jeden nebo dva dodatečné údaje o osobách, například datum, číslo nebo ano/ne, použijte místo formuláře [vlastní pole](../settings/custom-fields.md). Vyplňují se rychleji a lze je vyhledávat přímo v Pokročilém hledání.
:::

## Správa domácností {#managing-households}

Domácnosti umožňují propojit členy rodiny. To je užitečné zejména pro [přihlašování na kiosku](../attendance/check-in.md), kde rodič může přihlásit všechny své děti najednou.

1. Na profilu osoby klikněte vlevo na **Upravit** vedle nadpisu **Domácnost**.
2. Otevře se editor domácnosti. Vyberte **roli v domácnosti** pro aktuální osobu (např. Hlava, Manžel/Manželka, Dítě, Jiný).
3. Kliknutím na ikonu **Přidat** přidáte dalšího člena domácnosti.
4. Pod nadpisem **Přidat člena domácnosti** zadejte jméno osoby do vyhledávacího pole a stiskněte **Enter**, nebo klikněte na ikonu hledání. (Před psaním se zobrazí krátký seznam **Nedávné osoby**.)
5. Až se osoba objeví ve výsledcích, klikněte na její jméno nebo na ikonu přidání vedle něj.
6. Vyberte její roli v domácnosti a kliknutím na **Uložit** dokončete nastavení domácnosti.
