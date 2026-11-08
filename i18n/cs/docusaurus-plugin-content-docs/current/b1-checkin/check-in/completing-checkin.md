---
title: "Dokončení check-inu"
description: "Dokončete check-in rodiny na kiosku v aplikaci B1 Checkin, včetně limitů místností, tisku štítků, bezpečnostních kódů pro vyzvednutí a toho, co aplikace udělá dál."
---

# Dokončení check-inu

<div class="article-intro">

Jakmile zkontrolujete svou domácnost a provedete potřebná přiřazení do skupin, můžete check-in dokončit. Toto je poslední krok při práci s kioskem – aplikace odešle docházku, vytiskne štítky a připraví se pro další rodinu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Zkontrolujte svou domácnost](./household-review.md) na obrazovce kontroly domácnosti
- [Přiřaďte skupiny](./group-assignment.md) všem členům rodiny, kteří se mají přihlásit do konkrétní třídy nebo programu
- Volitelně [přidejte hosty](./adding-guests.md), kteří navštěvují vaši rodinu

</div>

## Jak provést check-in

1. Na **obrazovce kontroly domácnosti** klepněte na tlačítko **Check-in** ve spodní části obrazovky.
2. Aplikace odešle údaje o docházce na server a zobrazí **obrazovku úspěchu** se zeleným zaškrtnutím a uvítací zprávou.

To je vše. Docházka vaší rodiny byla zaznamenána.

Pokud se některá z vybraných osob už dnes na tuto bohoslužbu přihlásila, nejprve se zobrazí okno **Už přihlášeno** a uvede jejich jména. Klepnutím na **Přihlásit znovu** uložíte jejich nové volby skupin, nebo na **Zrušit** se vrátíte na obrazovku domácnosti.

## Plné místnosti a poměry dobrovolníků

Pokud vaše církev nastavila na svých místnostech [bezpečnostní limity](../../b1-admin/attendance/checkin-safety.md), server je před uložením zkontroluje:

- Pokud je vybraná místnost **plná nebo uzavřená**, check-in neproběhne a aplikace název místnosti zobrazí, abyste si mohli vybrat jinou.
- Pokud má čas bohoslužby [harmonogram check-inu](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) a jeho okno pro check-in není právě otevřené, check-in do místností tohoto času bohoslužby je také odmítnut. Obrazovka **Zatím nelze přihlásit** uvede místnost s důvodem „check-in právě není otevřen“; klepněte na **Změnit místnosti** a vyberte jiný čas bohoslužby nebo skupinu. (Časy bohoslužeb, které už jsou uzavřeny, jsou na [obrazovce domácnosti](./household-review.md) označeny jako **Uzavřeno** a nelze je vybrat, takže tuto situaci uvidíte obvykle jen tehdy, když se okno zavře uprostřed check-inu.)
- Domácnost, která se přihlásila na dřívější čas bohoslužby, se může vrátit později a přidat otevřený čas bohoslužby, a to i poté, co dřívější okno už bylo zavřeno. Jejich stávající přihlášení zůstanou zachována a nebrání tomu, aby byl nový check-in odmítnut.
- Pokud je v dětské místnosti **nedostatek dobrovolníků** podle nastaveného poměru, aplikace buď zobrazí upozornění, které může potvrdit pracovník, aby pokračoval, nebo check-in zcela zablokuje – podle toho, jak vaše církev nastavila vynucování poměrů.

## Tisk štítků

Pokud je nakonfigurována síťová tiskárna, aplikace po check-inu automaticky vytiskne štítky:

- **Jmenovky** se tisknou pro každou osobu přiřazenou ke skupině, u které je zapnuto nastavení **Tisknout jmenovku**. Jmenovka obsahuje jméno osoby, přiřazenou skupinu a informace o alergiích či poznámky, pokud jsou k dispozici.
- **Lístky pro vyzvednutí rodiči** se tisknou, pokud je některá přihlášená osoba ve skupině, u které je zapnuto nastavení **Vyzvednutí rodiči**. Osoby přihlášené jako **Dobrovolník** se přeskočí, takže pečovatel, který slouží v místnosti pro vyzvedávání rodiči, lístek nedostane. Lístek pro vyzvednutí uvádí děti, jejich skupiny a jedinečný **bezpečnostní kód o 4 znacích**.

:::info
Stejný bezpečnostní kód se objeví na jmenovce dítěte i na lístku pro vyzvednutí rodiče. Při vyzvedávání dobrovolníci kódy porovnají, aby ověřili, že každé dítě vyzvedává správný dospělý.
:::

Bezpečnostní kód se vygeneruje znovu pro každý check-in a obsahuje pouze souhlásky a číslice (samohlásky jsou vynechány, aby nevznikala nevhodná slova).

:::warning
Pokud se štítky netisknou, otevřete nastavení administrátora klepnutím sedmkrát na **logo církve**, poté klepněte na **Změnit tiskárnu** a ověřte připojení tiskárny. Kroky při řešení potíží najdete v článku [Nastavení tiskárny](../getting-started/printer-setup.md).
:::

## Co se děje po check-inu

- Pokud je tiskárna nakonfigurována, aplikace vytiskne všechny štítky a poté se automaticky vrátí na **obrazovku vyhledávání**, připravenou pro další rodinu.
- Pokud tiskárna nakonfigurována není, aplikace se rovněž automaticky vrátí na **obrazovku vyhledávání**.

V obou případech zůstane obrazovka úspěchu zobrazena alespoň 6 sekund od chvíle, kdy se objeví (8 sekund, pokud slaví něčí milník v účasti), aby rodiny viděly, že check-in proběhl. Pokud tisk trvá déle, aplikace se vrátí přibližně o jeden a půl sekundy po dokončení tisku.

Abyste se vrátili na obrazovku vyhledávání, nemusíte nic klepat – aplikace přechod zvládne automaticky. Jakmile je obrazovka zobrazena chvíli, můžete na ni klepnout a vrátit se okamžitě; klepnutí v prvních jeden a půl sekundy se ignoruje, takže rychlé dvojité klepnutí na **Check-in** nepřeskočí tuto obrazovku.

:::tip
Aplikace se po každém check-inu plně resetuje, takže neexistuje riziko, že by jedna rodina viděla údaje jiné rodiny.
:::

## Co se zaznamenává

Když klepnete na **Check-in**, aplikace odešle na server následující údaje pro každého člena domácnosti, který má přiřazenou skupinu:

- **osobu**, která se přihlašuje
- **bohoslužbu**, které se účastní
- **čas bohoslužby** a **skupinu**, ke které je přiřazena

Tyto údaje se zobrazí v aplikaci B1 Admin v sekci Docházka, kde mohou správci vaší církve docházku prohlížet a spravovat. Podrobnosti najdete v [průvodci správou check-inu](../../b1-admin/attendance/check-in.md).
