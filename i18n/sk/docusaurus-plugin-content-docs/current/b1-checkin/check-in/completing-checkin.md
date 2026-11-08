---
title: "Dokončenie prihlásenia"
description: "Dokončite kioskové prihlásenie rodiny v aplikácii B1 Checkin vrátane limitov miestností, tlače štítkov, bezpečnostných kódov na vyzdvihnutie a toho, čo aplikácia urobí ďalej."
---

# Dokončenie prihlásenia

<div class="article-intro">

Keď ste skontrolovali svoju domácnosť a v prípade potreby priradili skupiny, môžete prihlásenie dokončiť. Toto je posledný krok pracovného postupu na kiosku -- aplikácia odošle účasť, vytlačí štítky a resetuje sa pre ďalšiu rodinu.

</div>

<div class="prereqs">
<h4>Pred začiatkom</h4>

- [Skontrolujte svoju domácnosť](./household-review.md) na obrazovke kontroly domácnosti
- [Priraďte skupiny](./group-assignment.md) každému členovi rodiny, ktorý sa potrebuje prihlásiť do konkrétnej triedy alebo programu
- Voliteľne [pridajte hostí](./adding-guests.md), ktorí navštevujú vašu rodinu

</div>

## Ako sa prihlásiť

1. Na **obrazovke kontroly domácnosti** klepnite na tlačidlo **Prihlásiť** v spodnej časti obrazovky.
2. Aplikácia odošle údaje o účasti na server a zobrazí **obrazovku úspechu** so zelenou značkou začiarknutia a uvítacou správou.

To je všetko. Účasť vašej rodiny bola zaznamenaná.

Ak niekto, koho ste vybrali, sa už dnes prihlásil na túto bohoslužbu, najprv sa zobrazí okno **Už prihlásený**, ktoré ho uvedie. Klepnutím na **Prihlásiť znova** uložíte jeho nové výbery skupín, alebo klepnutím na **Zrušiť** sa vrátite na obrazovku domácnosti.

## Plné miestnosti a pomer dobrovoľníkov

Ak vaša cirkev nastavila [bezpečnostné limity](../../b1-admin/attendance/checkin-safety.md) pre svoje miestnosti, server ich skontroluje pred uložením:

- Ak je vybraná miestnosť **plná alebo zatvorená**, prihlásenie neprebehne a aplikácia uvedie názov miestnosti, aby ste mohli vybrať inú.
- Ak má čas bohoslužby [harmonogram prihlásenia](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) a jeho okno prihlásenia momentálne nie je otvorené, prihlásenie do miestností tohto času bohoslužby je tiež zamietnuté. Obrazovka **Zatiaľ sa nedá prihlásiť** uvádza miestnosť s dôvodom „prihlásenie momentálne nie je otvorené“. Klepnutím na **Zmeniť miestnosti** vyberte iný čas bohoslužby alebo skupinu. (Časy bohoslužieb, ktoré sú už uzavreté, sa na [obrazovke domácnosti](./household-review.md) zobrazujú ako **Zatvorené** a nedajú sa vybrať, takže túto správu zvyčajne uvidíte, iba ak okno prihlásenia zatvorí počas prihlasovania.)
- Domácnosť, ktorá sa prihlásila na skorší čas bohoslužby, sa môže vrátiť neskôr a pridať otvorený čas bohoslužby, aj keď skoršie okno už bolo zatvorené. Jej existujúce prihlásenia sa zachovajú a nebudú dôvodom na zamietnutie nového prihlásenia.
- Ak detskej miestnosti **chýba dostatok dobrovoľníkov** podľa jej pomeru, aplikácia buď zobrazí upozornenie, ktoré môže potvrdiť člen personálu, aby sa pokračovalo, alebo prihlásenie úplne zablokuje. Závisí to od toho, ako vaša cirkev nastavila presadzovanie pomeru.

## Tlač štítkov

Ak je nakonfigurovaná sieťová tlačiareň, aplikácia po prihlásení automaticky vytlačí štítky:

- **Menovky** sa tlačia pre každú osobu, ktorá je priradená do skupiny s povoleným nastavením **Tlačiť menovku**. Menovky obsahujú meno osoby, priradenie do skupiny a informácie o alergiách alebo poznámky, ak sú v evidencii.
- **Lístky na vyzdvihnutie rodičmi** sa tlačia vtedy, keď je ktorákoľvek prihlásená osoba v skupine s povoleným nastavením **Vyzdvihnutie rodičmi**. Osoby prihlásené ako **Dobrovoľník** sa preskakujú, takže pracovník detskej starostlivosti, ktorý slúži v miestnosti Vyzdvihnutie rodičmi, lístok nedostane. Lístok obsahuje deti, ich priradenia do skupín a jedinečný **4-znakový bezpečnostný kód**.

:::info
Rovnaký bezpečnostný kód sa objaví na menovke dieťaťa aj na lístku rodiča. Pri vyzdvihnutí dobrovoľníci porovnajú kódy, aby overili, že každé dieťa preberá správny dospelý.
:::

Bezpečnostný kód sa vygeneruje nanovo pri každom prihlásení a obsahuje iba spoluhlásky a číslice. Samohlásky sú vynechané, aby sa nevytvárali nevhodné slová.

:::warning
Ak sa štítky netlačia, otvorte Nastavenia správcu klepnutím na **logo cirkvi** sedemkrát a potom klepnite na **Zmeniť tlačiareň**, aby ste overili pripojenie tlačiarne. Kroky riešenia problémov nájdete v časti [Nastavenie tlačiarne](../getting-started/printer-setup.md).
:::

## Čo sa stane po prihlásení

- Ak je nakonfigurovaná tlačiareň, aplikácia vytlačí všetky štítky a potom sa automaticky vráti na **obrazovku vyhľadávania**, pripravenú na ďalšiu rodinu.
- Ak tlačiareň nie je nakonfigurovaná, aplikácia sa tiež automaticky vráti na **obrazovku vyhľadávania**.

Tak či onak obrazovka úspechu zostane zobrazená aspoň 6 sekúnd od chvíle, keď sa objaví (8 sekúnd, keď oslavuje dosiahnutie míľnika účasti niekoho), aby rodiny videli, že prihlásenie fungovalo. Ak tlač trvá dlhšie, aplikácia sa vráti približne o sekundu a pol po jej dokončení.

Na návrat na obrazovku vyhľadávania nemusíte nič klepnúť. Aplikácia prechod zvláda automaticky. Keď je obrazovka zobrazená chvíľu, môžete na ňu klepnúť a vrátiť sa okamžite. Klepnutie v prvej sekunde a pol sa ignoruje, takže rýchle dvojité klepnutie na **Prihlásiť** túto obrazovku nepreskočí.

:::tip
Aplikácia sa po každom prihlásení úplne resetuje, takže neexistuje riziko, že jedna rodina uvidí informácie inej rodiny.
:::

## Čo sa zaznamenáva

Keď klepnete na **Prihlásiť**, aplikácia odošle na server nasledujúce údaje pre každého člena domácnosti, ktorý má priradenú skupinu:

- **osoba**, ktorá sa prihlasuje
- **bohoslužba**, ktorú navštevuje
- **čas bohoslužby** a **skupina**, do ktorej je priradená

Tieto údaje sa zobrazujú v B1 Admin v sekcii Účasť, kde správcovia vašej cirkvi môžu prezerať a spravovať záznamy o účasti. Podrobnosti nájdete v [sprievodcovi správou prihlásenia](../../b1-admin/attendance/check-in.md).
