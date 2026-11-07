---
title: "Návrhár štítkov pri prihlasovaní"
description: "Prispôsobte šablóny menoviek a lístkov na vyzdvihnutie pri check-ine v B1 Admin: polia, umiestnenie a podmienky pre narodeniny alebo poznámky."
---

# Návrhár štítkov pri prihlasovaní

<div class="article-intro">

Návrhár štítkov vám umožňuje vytvárať a prispôsobovať šablóny menoviek a lístkov na vyzdvihnutie, ktoré sa vytlačia, keď rodiny prihlasujú svoje deti. Presne môžete určiť, aké informácie sa zobrazia na každom štítku, kde budú umiestnené a ako budú vyzerať.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte [Dochádzku](./setup.md) a nakonfigurujte aspoň jeden čas služby s povoleným prihlasovaním
- Nastavte [Prihlasovanie](./check-in.md), aby sa štítky tlačili
- Potrebujete administrátorský prístup k sekcii Dochádzka

</div>

## Otvorenie návrhára štítkov

V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte **Mobile** a kliknite na **B1 CheckIn**. Potom kliknite na tlačidlo **Design Labels** na karte Check-in Labels. Uvidíte zoznam uložených šablón štítkov rozdelených podľa typu: **Menovka** a **Lístok na vyzdvihnutie**.

## Typy štítkov

- **Menovka** — vytlačí sa a pripne sa k dieťaťu. Zvyčajne obsahuje meno dieťaťa, jeho triedu alebo reláciu a bezpečnostný kód.
- **Lístok na vyzdvihnutie** — odovzdá sa rodičovi alebo zákonnému zástupcovi. Zvyčajne obsahuje bezpečnostný kód a zoznam detí, ktoré prihlásili.

B1 vám ako východiskový bod ponúka predvolenú menovku a predvolený lístok na vyzdvihnutie, dimenzované pre štandardné tepelné štítky o veľkosti 3.5 × 1.1 palca.

## Vytvorenie šablóny štítka

1. Kliknite na **Pridať** a z ponuky vyberte východiskový bod: **Menovka 3.5" x 1.1"**, **Lístok na vyzdvihnutie 3.5" x 1.1"** alebo **Prázdny**.
2. Nová šablóna sa otvorí v editore štítkov.

### Editor štítkov

Editor zobrazuje zmenšený náhľad štítka v nakonfigurovanej veľkosti. V ľavom paneli môžete nastaviť:

- **Name** — názov šablóny (slúži iba na vašu orientáciu)
- **Label Type** — Menovka alebo Lístok na vyzdvihnutie
- **Width / Height** — rozmery štítka v palcoch

### Pridávanie blokov

Štítok sa skladá z blokov — jednotlivých častí obsahu umiestnených na plátne štítka. Kliknite na **Add Block**, čím vložíte nový blok, a vyberte jeho typ:

- **Field** — pri tlači načíta údajovú hodnotu:
  - `person.displayName` — celé meno osoby
  - `sessions` — služba alebo trieda, do ktorej sa osoba prihlásila
  - `securityCode` — náhodne vygenerovaný bezpečnostný kód na vyzdvihnutie
  - `children` — zoznam detí (pre lístky na vyzdvihnutie)
  - `person.nametagNotes` — akékoľvek osobitné poznámky k záznamu osoby
  - `person.isBirthdayWeek` — hodnota true, ak narodeniny osoby (mesiac a deň) pripadajú na obdobie najviac 3 dní pred alebo po dátume prihlásenia
  - `campus` — názov kampusu
- **Text** — statický text, ktorý zadáte (na nadpisy, popisky alebo pokyny)
- **Barcode** — čiarový kód, ktorý kóduje bezpečnostný kód

### Umiestňovanie blokov

Každý blok má polia **X**, **Y**, **Width** a **Height**, vyjadrené v percentách plátna štítka (0 – 100). Upravte ich, aby ste obsah umiestnili presne. Môžete tiež nastaviť:

- **Font Size** — veľkosť textu v bodoch
- **Bold** — zapnutie alebo vypnutie tučného písma
- **Align** — zarovnanie textu doľava, na stred alebo doprava
- **Condition** — voliteľne skryje blok, ak je pole prázdne (napríklad zobrazí `person.nametagNotes` iba vtedy, ak má hodnotu). Funguje to aj s `person.isBirthdayWeek`, takže grafiku alebo text k narodeninám môžete zobraziť len na menovkách detí, ktorých narodeniny pripadajú na niekoľko dní pred prihlásením alebo po ňom.

### Uloženie

Kliknutím na **Save** šablónu uložíte. Aktualizovaná šablóna sa použije pri ďalšej tlači štítkov v B1 Checkin.

## Zmena poradia šablón

Ak máte viac šablón menoviek alebo lístkov na vyzdvihnutie, B1 Checkin predvolene použije prvú šablónu v zozname. Šablóny presuňte myšou, čím zmeníte ich poradie.

## Odstránenie šablóny

Kliknite na ikonu odstránenia pri ľubovoľnom riadku šablóny a potvrďte. Odstránením poslednej šablóny daného typu obnovíte predvolenú vstavanú šablónu.

:::tip
Po úprave šablóny urobte skúšobnú tlač, aby ste pred ďalšou bohoslužbou overili, že rozloženie vyzerá správne.
:::

## Súvisiace články

- [Nastavenie prihlasovania](./setup.md) — konfigurácia služieb a skupín pre prihlasovanie
- [Dokončenie prihlasovania](./check-in.md) — postup prihlasovania pre rodiny
- [Úvod do B1 Checkin](../../b1-checkin/getting-started/index.md) — aplikácia kiosku Checkin
