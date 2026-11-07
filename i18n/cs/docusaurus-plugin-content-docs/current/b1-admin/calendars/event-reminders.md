---
title: "Připomínky událostí"
---

# Připomínky událostí

<div class="article-intro">

Připomínky událostí automaticky upozorní správné lidi před začátkem události -- například: „Nezapomeňte! Zdravotnický workshop začíná zítra v 9:00.“ Připomínku nastavíte jednou u události a B1 ji odešle včas pomocí push notifikací, e-mailu a případně textových zpráv, pokud má váš sbor nastavené SMS. Členové si mohou ovládat, které připomínky dostávají, ve svých [Předvolbách oznámení](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvořte událost, na kterou chcete připomenout (viz [Vytváření kalendářů](creating-calendars))
- Chcete-li oslovit registrované účastníky, [zapněte registraci](creating-calendars) u události
- Chcete-li oslovit celou skupinu, ujistěte se, že událost patří do [skupiny](../groups/creating-groups) s členy

</div>

## Nastavení připomínky

Připomínky nastavujete v sekci **Připomínky** u události.

- Při **vytváření nové události** rozbalte sekci **Připomínky** v editoru události ještě před uložením.
- U **existující události** otevřete stránku **Podrobnosti registrace** (v sekci **Registrace**) a přidejte nebo změňte připomínku.

1. Zapněte **Povolit připomínky**.
2. Vyberte **Kdy** se má připomínka odeslat. Zvolte až tři časy: **7 dní předem**, **3 dny předem**, **1 den předem** a **V den konání**.
3. Nastavte **Denní čas**, kdy se má připomínka odeslat (výchozí je **9:00** v [časovém pásmu](../settings/church-settings.md#time-zone) vašeho sboru).
4. Vyberte, **komu** se má připomínka poslat (viz [Komu se připomínka posílá](#who-gets-reminded) níže).
5. Volitelně přidejte **Zprávu**. Pokud pole necháte prázdné, použije se výchozí znění, nebo můžete napsat vlastní. Můžete použít `{{eventTitle}}`, které bude nahrazeno názvem události.
6. Vyberte **Kanály**: **Push** notifikace, **E-mail** a, pokud má váš sbor připojeného [poskytovatele SMS](../settings/church-settings.md#texting), také **Textovou zprávu**.
7. Uložte událost.

Při úpravách se zobrazí **živý náhled**, který přibližně ukazuje, kolik lidí připomínku dostane, kolik účastníků nelze zastihnout a kdy proběhne další naplánované odeslání. Můžete tak před uložením ověřit, že připomínka vypadá správně.

## Komu se připomínka posílá

Nastavení **Komu** určuje, kdo připomínku dostane:

- **Pouze registrovaní** -- Všichni registrovaní na událost, kteří jsou propojeni se záznamem osoby. Toto je výchozí volba, pokud je u události zapnutá registrace, takže připomínka pro malou registrovanou událost nikdy omylem nepůjde celé skupině.
- **Vedoucí / pouze registrovaní** -- Jedna připomínka na registraci (osoba, která se registrovala), nikoli každému členovi rodiny uvedenému v registraci.
- **Členové skupiny** -- Všichni členové skupiny události. Toto je výchozí volba, pokud událost registraci nepoužívá.
- **Automaticky** -- Použije registrované, pokud je registrace zapnutá, jinak členy skupiny.

:::info
Hosté přidaní pouze jménem (bez propojeného záznamu osoby) nemohou připomínku dostat, protože neexistuje účet, zařízení ani e-mail, kam by ji bylo možné poslat. Náhled ukazuje, kolik účastníků do této skupiny spadá, aby nebylo nic překvapivého. Členové, kteří odmítli komunikaci, jsou také přeskočeni.
:::

## Kdy se připomínky odesílají

- Připomínky se odesílají v **čase, který zvolíte**, v místním časovém pásmu vašeho sboru, u každého z vybraných předstihů.
- Pokud **změníte datum nebo čas události**, čekající připomínky se automaticky přeplánují. Připomínku nemusíte upravovat.
- Pokud **smažete událost** (nebo zrušíte jednotlivý výskyt opakující se události), její čekající připomínky se automaticky zruší.
- Opakující se události se řeší automaticky: každý nadcházející výskyt dostane vlastní připomínku.

:::tip
Připomínky se posílají **nejprve jako push notifikace**, e-mail slouží jako záloha. Pokud má člen zapnuté push notifikace, dostane push; pokud ne, dostane místo něj e-mail. Kanály pro jednotlivé typy oznámení si členové vybírají ve svých [Předvolbách oznámení](../../b1-church/getting-started/notification-preferences).
:::

## Textové připomínky

Kanál **Text** se zobrazí pouze tehdy, je-li připojen poskytovatel SMS. Zprávy se odesílají přes poskytovatele SMS vašeho sboru a každá zpráva může sboru něco stát. Posílají se navíc k případné push nebo e-mailové připomínce a pouze lidem, kteří:

- v [Předvolbách oznámení](../../b1-church/getting-started/notification-preferences) zapnuli **Textové zprávy**, a
- mají ve svém profilu uvedené mobilní číslo.

Každá zpráva začíná názvem vašeho sboru, je omezena na jednu textovou zprávu a končí větou „Odpovězte STOP pro odhlášení.“ Kdo odpoví STOP, přestane od vašeho sboru zprávy dostávat. Aby odpovědi STOP mohly dorazit do B1, vložte **URL adresu webhooku pro příchozí zprávy (STOP)** z [nastavení SMS](../settings/church-settings.md#texting) do webhooku pro příchozí zprávy u vašeho poskytovatele.

## Co mohou členové ovládat

Připomínky vždy respektují [Předvolby oznámení](../../b1-church/getting-started/notification-preferences) každého člena. Člen může:

- Vypnout **Připomínky událostí** pro push, e-mail nebo textové zprávy a přitom ponechat zapnutá ostatní oznámení.
- Zapnout nebo vypnout textové připomínky pomocí **Textových zpráv**.
- Nastavit **tiché hodiny**, aby se nenaléhavá oznámení odesílala až v rozumnou dobu.

Nemůžete přepsat rozhodnutí člena odhlásit se z připomínek událostí. To udržuje B1 v souladu s pravidly proti spamu a členové tak mají kontrolu nad svou schránkou.

## Připomínky pro služby

Dobrovolníci naplánovaní v plánu dostanou samostatnou **připomínku služby** s podrobnostmi o plánu a, pokud ještě neodpověděli, tlačítka **Přijmout / Odmítnout** přímo v e-mailu. Tyto připomínky se nastavují u typu plánu, nikoli u události v kalendáři, a lze je odeslat také textovou zprávou. Jak plánování dobrovolníků a jejich připomínky fungují, se dozvíte v části [Připomínky dobrovolníkům](../serving/plans#volunteer-reminders) a v článku [Nedělní dobrovolníci](../guides/sunday-volunteers).

## Další kroky

- [Předvolby oznámení](../../b1-church/getting-started/notification-preferences) -- Co mohou členové ovládat
- [Průvodce registrací na události](../guides/event-registration) -- Nastavení registrace, aby se připomínky mohly dostat k účastníkům
- [Vytváření kalendářů](creating-calendars) -- Návrat k nastavení kalendáře
