---
title: "Návrhář štítků pro přihlašování"
---

# Návrhář štítků pro přihlašování

<div class="article-intro">

Návrhář štítků vám umožňuje vytvářet a upravovat šablony jmenovek a lístků pro vyzvednutí, které se tisknou při přihlašování dětí. Můžete přesně určit, jaké informace se objeví na každém štítku, kde budou umístěny a jak budou vypadat.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte [Docházku](setup) a nakonfigurujte alespoň jeden čas bohoslužby s povoleným přihlašováním
- Nastavte [Přihlašování](check-in), aby se štítky tiskly
- Potřebujete administrátorský přístup do sekce Docházka

</div>

## Otevření návrháře štítků

V B1 Admin otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu), rozbalte **Mobile** a klikněte na **B1 CheckIn**. Poté klikněte na tlačítko **Design Labels** na kartě Check-in Labels. Uvidíte seznam uložených šablon štítků, rozdělených podle typu: **Nametag** (jmenovka) a **Pickup Slip** (lístek pro vyzvednutí).

## Typy štítků

- **Nametag** (jmenovka) — vytiskne se a připevní na dítě. Obvykle obsahuje jméno dítěte, jeho třídu nebo bohoslužbu a bezpečnostní kód.
- **Pickup Slip** (lístek pro vyzvednutí) — předá se rodiči nebo zákonnému zástupci. Obvykle obsahuje bezpečnostní kód a seznam dětí, které byly přihlášeny.

B1 vám nabízí výchozí jmenovku a výchozí lístek pro vyzvednutí, navržené pro standardní termální štítky o velikosti 3,5 × 1,1 palce.

## Vytvoření šablony štítku

1. Klikněte na **Add** (Přidat) a z nabídky vyberte výchozí bod: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** nebo **Blank** (Prázdný).
2. Nová šablona se otevře v editoru štítků.

### Editor štítků

Editor zobrazuje zmenšený náhled štítku v nastavené velikosti. V levém panelu můžete nastavit:

- **Name** (Název) — název šablony (slouží pouze pro vaši orientaci)
- **Label Type** (Typ štítku) — Nametag (jmenovka), nebo Pickup Slip (lístek pro vyzvednutí)
- **Width / Height** (Šířka / Výška) — velikost štítku v palcích

### Přidávání bloků

Štítek se skládá z bloků — jednotlivých částí obsahu umístěných na plátně štítku. Kliknutím na **Add Block** (Přidat blok) vložíte nový blok a vyberete jeho typ:

- **Field** (Pole) — při tisku načte hodnotu z dat:
  - `person.displayName` — celé jméno osoby
  - `sessions` — bohoslužba nebo třída, do které byla přihlášena
  - `securityCode` — náhodně vygenerovaný bezpečnostní kód pro vyzvednutí
  - `children` — seznam dětí (pro lístky pro vyzvednutí)
  - `person.nametagNotes` — případné zvláštní poznámky v záznamu osoby
  - `person.isBirthdayWeek` — hodnota true, pokud narozeniny osoby (měsíc a den) připadají na období 3 dny před nebo po datu přihlášení
  - `campus` — název sboru nebo pobočky
- **Text** — statický text, který zadáte ručně (pro nadpisy, popisky nebo pokyny)
- **Barcode** (Čárový kód) — čárový kód zakódovaný s bezpečnostním kódem

### Umísťování bloků

Každý blok má pole **X**, **Y**, **Width** (Šířka) a **Height** (Výška), vyjádřená v procentech plátna štítku (0–100). Těmito hodnotami upravíte přesnou polohu obsahu. Dále můžete nastavit:

- **Font Size** (Velikost písma) — velikost textu v bodech
- **Bold** (Tučně) — zapne nebo vypne tučné písmo
- **Align** (Zarovnání) — zarovnání textu vlevo, na střed nebo vpravo
- **Condition** (Podmínka) — volitelně skryje blok, pokud je pole prázdné (například zobrazí `person.nametagNotes` pouze tehdy, když má hodnotu). Funguje také s polem `person.isBirthdayWeek`, takže můžete zobrazit narozeninovou grafiku nebo text jen na jmenovkách dětí, jejichž narozeniny připadají na několik dní kolem přihlášení.

### Ukládání

Kliknutím na **Save** (Uložit) šablonu uložíte. Aktualizovaná šablona se použije při příštím tisku štítků v B1 Checkin.

## Změna pořadí šablon

Pokud máte více šablon jmenovek nebo lístků pro vyzvednutí, B1 Checkin standardně použije první šablonu v seznamu. Šablony můžete přeřadit přetažením.

## Smazání šablony

Klikněte na ikonu koše u libovolného řádku šablony a smazání potvrďte. Smazáním poslední šablony daného typu obnovíte výchozí vestavěnou šablonu.

:::tip
Po úpravě šablony si vytiskněte zkušební štítek, abyste před další bohoslužbou ověřili, že rozložení vypadá správně.
:::

## Související články

- [Nastavení přihlašování](setup) — nastavení bohoslužeb a skupin pro přihlašování
- [Dokončení přihlášení](check-in) — postup přihlašování pro rodiny
- [Začínáme s B1 Checkin](../../b1-checkin/getting-started/) — aplikace kiosku Checkin
