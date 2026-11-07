---
title: "Dokončenie prihlásenia"
---

# Dokončenie prihlásenia

<div class="article-intro">

Keď skontrolujete svoju domácnosť a prípadne priradíte skupiny, ste pripravení dokončiť prihlásenie. Toto je posledný krok pracovného postupu na kiosku – aplikácia odošle dochádzku, vytlačí štítky a pripraví sa pre ďalšiu rodinu.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- [Skontrolujte svoju domácnosť](./household-review) na obrazovke kontroly domácnosti
- [Priraďte skupiny](./group-assignment) každému členovi rodiny, ktorý sa potrebuje prihlásiť do konkrétnej triedy alebo programu
- Voliteľne [pridajte hostí](./adding-guests), ktorí navštevujú vašu rodinu

</div>

## Ako sa prihlásiť

1. Na **obrazovke kontroly domácnosti** klepnite na tlačidlo **Prihlásiť** v dolnej časti obrazovky.
2. Aplikácia odošle údaje o dochádzke na server a zobrazí **obrazovku úspechu** so zeleným znakom začiarknutia a uvítacou správou.

To je všetko. Dochádzka vašej rodiny bola zaznamenaná.

## Plné miestnosti a pomer dobrovoľníkov

Ak váš kostol nastavil [bezpečnostné limity](../../b1-admin/attendance/checkin-safety) pre svoje miestnosti, server ich pred uložením skontroluje:

- Ak je vybraná miestnosť **plná alebo zatvorená**, prihlásenie neprebehne a aplikácia uvedie názov miestnosti, aby ste mohli vybrať inú.
- Ak má čas bohoslužby [harmonogram prihlasovania](../../b1-admin/attendance/setup#setting-a-check-in-schedule) a jeho okno na prihlasovanie momentálne nie je otvorené, prihlásenie do miestností tohto času bohoslužby je tiež odmietnuté. Obrazovka **Zatiaľ sa nemôžete prihlásiť** uvádza miestnosť s dôvodom „prihlasovanie momentálne nie je otvorené“; klepnutím na **Zmeniť miestnosti** vyberte iný čas bohoslužby alebo skupinu. (Časy bohoslužieb, ktoré sú už uzavreté, sa zobrazujú ako **Zatvorené** na [obrazovke domácnosti](./household-review) a nedajú sa vybrať, takže túto správu zvyčajne uvidíte len vtedy, ak okno zatvorí počas prihlasovania.)
- Domácnosť, ktorá sa prihlásila na skorší čas bohoslužby, sa môže neskôr vrátiť a pridať otvorený čas bohoslužby, a to aj po tom, ako skoršie okno zatvorilo. Ich existujúce prihlásenia sa zachovajú a nespôsobia, že nové prihlásenie bude odmietnuté.
- Ak má detská miestnosť na svoj pomer **nedostatok dobrovoľníkov**, aplikácia buď zobrazí upozornenie, ktoré môže zamestnanec potvrdiť, aby mohol pokračovať, alebo prihlásenie úplne zablokuje – podľa toho, ako váš kostol nastavil presadzovanie pomeru.

## Tlač štítkov

Ak je nakonfigurovaná sieťová tlačiareň, aplikácia po prihlásení automaticky vytlačí štítky:

- **Menovky** sa tlačia pre každú osobu priradenú do skupiny, pre ktorú je zapnuté nastavenie **Tlačiť menovku**. Menovka obsahuje meno osoby, jej priradenie do skupiny a informácie o alergiách alebo poznámky, ak sú v evidencii.
- **Lístky na vyzdvihnutie rodičmi** sa tlačia vtedy, keď je ktokoľvek z prihlásených osôb v skupine, pre ktorú je zapnuté nastavenie **Vyzdvihnutie rodičmi**. Osoby prihlásené ako **Dobrovoľník** sa preskočia, takže pracovník detskej opatrovateľskej služby, ktorý slúži v miestnosti na vyzdvihnutie rodičmi, nedostane lístok. Lístok na vyzdvihnutie uvádza deti, ich priradenie do skupín a jedinečný **4-znakový bezpečnostný kód**.

:::info
Rovnaký bezpečnostný kód sa objaví na menovke dieťaťa aj na lístku na vyzdvihnutie rodiča. Pri vyzdvihnutí dobrovoľníci porovnajú kódy, aby overili, že každé dieťa preberá správny dospelý.
:::

Bezpečnostný kód sa pri každom prihlásení vygeneruje nanovo a obsahuje iba spoluhlásky a číslice (samohlásky sú vynechané, aby sa nevytvárali nevhodné slová).

:::warning
Ak sa štítky netlačia, otvorte nastavenia správcu klepnutím na **logo kostola** sedemkrát a potom klepnite na **Zmeniť tlačiareň**, aby ste overili pripojenie tlačiarne. Kroky na riešenie problémov nájdete v časti [Nastavenie tlačiarne](../getting-started/printer-setup).
:::

## Čo sa stane po prihlásení

- Ak je tlačiareň nakonfigurovaná, aplikácia vytlačí všetky štítky a potom sa automaticky vráti na **obrazovku vyhľadávania**, pripravená na ďalšiu rodinu.
- Ak tlačiareň nie je nakonfigurovaná, aplikácia sa tiež automaticky vráti na **obrazovku vyhľadávania**.

V každom prípade zostane obrazovka úspechu zobrazená najmenej 6 sekúnd od jej zobrazenia (8 sekúnd, keď oslavuje míľnik dochádzky niekoho), aby rodiny videli, že prihlásenie prebehlo úspešne. Ak tlač trvá dlhšie, aplikácia sa vráti približne o jeden a pol sekundy po skončení tlače.

Na návrat na obrazovku vyhľadávania nemusíte nič klepnúť – aplikácia prechod zvláda automaticky. Keď je obrazovka zobrazená chvíľu, môžete na ňu klepnúť a vrátiť sa okamžite; klepnutie v prvej sekunde a pol sa ignoruje, takže rýchle dvojité klepnutie na **Prihlásiť** nepreskočí túto obrazovku.

:::tip
Aplikácia sa po každom prihlásení úplne resetuje, takže neexistuje riziko, že jedna rodina uvidí informácie inej rodiny.
:::

## Čo sa zaznamenáva

Keď klepnete na **Prihlásiť**, aplikácia odošle na server nasledujúce údaje pre každého člena domácnosti, ktorý má priradenú skupinu:

- **Osoba**, ktorá sa prihlasuje
- **Služba**, na ktorú sa zúčastňuje
- **Čas bohoslužby** a **skupina**, do ktorých je priradená

Tieto údaje sa zobrazujú v B1 Admin v sekcii Dochádzka, kde môžu správcovia vášho kostola zobrazovať a spravovať záznamy o dochádzke. Podrobnosti nájdete v [príručke správy prihlasovania](../../b1-admin/attendance/check-in.md).
