---
title: "Správa obrazoviek a skupín"
description: "Kontrola online TV FreePlay pripravených na nedeľu, úprava nastavení obrazoviek a skupiny zdieľajúce jeden kalendár vo FreePlay Admin."
---

# Správa obrazoviek a skupín

<div class="article-intro">

Na stránke **Obrazovky** v FreePlay Admin nájdete všetky televízory spárované s vaším kostolom, informácie o tom, čo práve prehrávajú, a o tom, či sú pripravené na nedeľu. Tu tiež spravujete **skupiny obrazoviek**. Obrazovky v rovnakej skupine zdieľajú jeden kalendár a jednu predvolenú slučku.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Prihláste sa do FreePlay Admin na adrese [admin.freeplay.church](https://admin.freeplay.church)
- [Spárujte aspoň jednu obrazovku](./pairing-a-screen.md)

</div>

## Stránka Obrazovky

V hornej časti sú tri čísla, ktoré vám poskytnú rýchly prehľad o stave:

- **Online teraz** - Obrazovky, ktoré sa prihlásili počas posledných 15 minút
- **Pripravené na nedeľu** - Koľko naplánovaných obrazoviek má všetko stiahnuté až do najbližšej nedele
- **Vyžaduje pozornosť** - Obrazovky, ktoré sú offline alebo im chýbajú súbory

Pod nimi použite **Hľadať obrazovky** a nájdite obrazovku podľa názvu, skupiny alebo toho, čo práve prehráva. Filtračné štítky zúžia zoznam na **Všetky**, **Naplánované**, **Manuálne**, **Vyžaduje pozornosť** alebo jednu konkrétnu skupinu. Medzi zobrazením **Tabuľka** a **Mriežka** prepnete pomocou prepínača vpravo.

Každá obrazovka zobrazuje:

- **Názov** a model zariadenia
- **Skupinu**
- **Režim** - **Naplánovaný** alebo **Manuálny**
- **Hrá teraz** - Čo je práve na obrazovke. Manuálne obrazovky zobrazujú **Učebňa · učiteľ stlačí Štart**
- **Pripravená do** - Dátum, dokedy má obrazovka stiahnuté súbory. Ak sa súbory nestiahli, namiesto toho zobrazí **Chýba N súborov**. Nová obrazovka zobrazí **Čaká sa na prvú synchronizáciu**
- **Naposledy videná** - Kedy sa obrazovka naposledy prihlásila. Obrazovka, ktorá sa dlhšie neprihlásila, zobrazí **Offline**, a obrazovka, ktorá sa nikdy nepripojila, zobrazí **Nikdy nevidená**

Použite **Prezentovať** na prehratie kalendára obrazovky vo vašom prehliadači alebo **Upraviť** na zmenu nastavení.

## Zobrazenie obrazovky

Kliknutím na názov obrazovky otvoríte jej stránku. Na ľavej strane:

- **Prezentovať v prehliadači** - Prehrá kalendár tejto obrazovky na celú obrazovku vo vašom prehliadači tak, ako by vyzeral na televízore. Pozri [Prezentovanie z prehliadača](./scheduled-playback.md#presenting-from-a-browser)
- **Upraviť** - Zmení názov, skupinu alebo režim
- **Viac** > **Zrušiť spárovanie** - Odpojí televízor. Ten sa vráti k zobrazovaniu párovacieho kódu

Zvyšok stránky obsahuje tieto sekcie:

- **Teraz a potom** - Čo sa práve prehráva a dokedy, nasledované všetkým naplánovaným na nasledujúcich 7 dní. Kliknutím na **Otvoriť kalendár** prejdete na kalendár tejto skupiny
- **Sťahovanie** - **Pripravená do** dátumu, keď je všetko stiahnuté, alebo zoznam chýbajúcich súborov
- **Zariadenie** - ID zariadenia, platforma, model, verzia aplikácie FreePlay, IP adresa, použité a voľné úložisko, naposledy videná a režim
- **Nedávne** - Najnovšia aktivita, ktorú obrazovka nahlásila

:::tip
Ak obrazovka zobrazuje chýbajúce súbory, uistite sa, že je online a má voľné úložisko. Televízor si chýbajúce súbory stiahne sám pri najbližšom prihlásení.
:::

## Úprava obrazovky

1. Kliknite na **Upraviť** vedľa obrazovky alebo na jej stránke.
2. Zmeňte **Názov**, **Skupinu** alebo **Režim** (**Naplánovaný** alebo **Manuálny**).
3. Kliknite na **Uložiť**.

Presunutím obrazovky do inej skupiny sa prepne na kalendár tejto skupiny.

## Skupiny obrazoviek

Skupina obrazoviek je súbor obrazoviek, ktoré prehrávajú to isté v rovnakom čase, napríklad „Vestibul“ alebo „Detské krídlo“. Každá skupina má vlastný kalendár a môže mať **predvolenú slučku**, ktorá sa prehrá vždy, keď nič nie je naplánované.

Na správu skupín kliknite na **Skupiny** v hornej časti stránky **Obrazovky**. Zoznam **Skupiny obrazoviek** zobrazuje názov každej skupiny, počet obrazoviek a jej predvolenú slučku. Kliknutím na **Obrazovky** sa vrátite späť.

### Pridanie skupiny

1. V zobrazení **Skupiny obrazoviek** kliknite na **Pridať skupinu**.
2. Zadajte **Názov**, napríklad „Vestibul“.
3. Vyberte playlist ako **Predvolenú slučku** alebo ponechajte **Žiadna — obrazovka je vypnutá**.
4. Kliknite na **Uložiť**.

Skupinu môžete vytvoriť aj počas párovania obrazovky, a to výberom **＋ Nová skupina…** v poli **Skupina**.

### Úprava alebo odstránenie skupiny

1. Kliknite na **Upraviť** vedľa skupiny.
2. Zmeňte názov alebo predvolenú slučku a potom kliknite na **Uložiť**.
3. Ak chcete skupinu odstrániť, kliknite na **Odstrániť** a potvrďte.

:::warning
Odstránením skupiny odstránite aj jej plán. Obrazovky v tejto skupine sa vypnú, kým ich nepresuniete do inej skupiny.
:::

## Súvisiace články

- **[Párovanie obrazovky](./pairing-a-screen.md)** - Pridanie nového televízora
- **[Plánovanie kalendára](./scheduling-the-calendar.md)** - Nastavenie, čo každá skupina prehráva, a jej predvolenej slučky
- **[Naplánované prehrávanie na televízore](./scheduled-playback.md)** - Čo znamená dátum „Pripravená do“ priamo na televízore
