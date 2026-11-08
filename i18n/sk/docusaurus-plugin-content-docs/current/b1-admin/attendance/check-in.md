---
title: "Nastavenie samoobslužného prihlasovania s aplikáciami B1 Checkin a B1 Admin"
sidebar_label: "Prihlasovanie"
description: "Nastavte samoobslužné prihlasovanie na bohoslužby pomocou aplikácie B1 Checkin v B1 Admin, vrátane zariadení, kioskových účtov, rozvrhov, brandingu a registrácie hostí cez QR kód."
---

# Prihlasovanie

<div class="article-intro">

B1 Admin podporuje samoobslužné prihlasovanie na bohoslužby prostredníctvom doplnkovej aplikácie **B1 Checkin**. Členovia sa môžu pri príchode sami prihlásiť aj so svojimi rodinami na kioskoch alebo vyhradených zariadeniach, čo proces urýchľuje a znižuje pracovné zaťaženie dobrovoľníkov. Každé prihlásenie sa automaticky zaznamená ako účasť.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Vaše kampusy, časy bohoslužieb a skupiny musia byť nastavené v [Nastavení účasti](setup.md).
- Potrebujete [ľudí vo vašej databáze](../people/adding-people.md) s [domácnosťami](../people/adding-people.md#managing-households), aby sa rodiny mohli prihlásiť spoločne.
- Budete potrebovať tablet a voliteľne tlačiareň štítkov Brother (pozri [odporúčania k hardvéru](#recommended-hardware) nižšie).

</div>

## Ako to funguje

Aplikácia B1 Checkin sa pripája k vášmu nastaveniu účasti v B1 Admin. Keď sa člen prihlási, jeho účasť sa automaticky zaznamená k správnemu kampusu, času bohoslužby a skupine. Účasť u osôb, ktoré používajú systém prihlasovania, nemusíte zadávať ručne.

## Nastavenie prihlasovania

1. **Najprv nastavte štruktúru účasti.** V B1 Admin prejdite na **Ľudia > Účasť** a kliknite na **Nastavenie**, aby ste mali kampusy, časy bohoslužieb a skupiny pripravené. Aplikácia na prihlasovanie sa spolieha na túto konfiguráciu. Voliteľne môžete každému času bohoslužby priradiť [rozvrh prihlasovania](setup.md#setting-a-check-in-schedule), aby sa prihlasovanie každý týždeň automaticky otváralo a zatváralo. Rozvrhy používajú časové pásmo kampusu bohoslužby, alebo časové pásmo vašej cirkvi, ak kampus žiadne nemá nastavené. Kiosk zobrazuje časy bohoslužieb, ktorých okno je zatvorené, ako **Zatvorené**, a rodinám oznámi, kedy sa prihlasovanie otvorí. Podrobnosti nájdete v [Nastavení účasti](setup.md).
2. **Nainštalujte aplikáciu B1 Checkin** na zariadenia, ktoré plánujete používať. Aplikácia je dostupná na nasledujúcich platformách:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/tablety Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablety Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Prihláste sa do aplikácie B1 Checkin** pomocou účtu, ktorý má oprávnenie **Checkin** na účasť (alebo **Upraviť účasť**). Pozri [Účty kiosku na prihlasovanie](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Vyberte kampus a čas bohoslužby** pre aktuálne stretnutie.
5. Členovia môžu teraz na zariadení vyhľadať svoje meno a prihlásiť sa.

:::tip
Zariadenia na prihlasovanie umiestnite na viditeľné a ľahko dostupné miesta, napríklad pri vchode do lobby alebo pri recepcii. Krátke oznámenie počas bohoslužieb pomôže členom vedieť, že táto možnosť existuje.
:::

:::tip
Ak má vaša cirkev viacero kampusov, musíte nastavenie zopakovať pre každý kampus v [Nastavení účasti](setup.md). Každé zariadenie na prihlasovanie je možné nakonfigurovať pre iný kampus.
:::

## Odporúčaný hardvér

**Tablety** — s aplikáciou dobre fungujú ktorékoľvek z týchto:

- **Kompaktný:** Samsung Galaxy Tab A7 Lite 8,7"
- **Veľká obrazovka:** Samsung Galaxy Tab A8 10,5"
- **Rozpočtový:** Amazon Fire HD 10

**Tlačiarne** — prihlasovanie funguje s tlačiarňami štítkov Brother na tlač menoviek:

- **Najlepšia:** Brother QL-1110NWB (podporuje viac tabletov cez Bluetooth a WiFi)
- **Dobrá:** Brother QL-810W (podporuje viac tabletov cez WiFi)
- **Rozpočtová:** Brother QL-1100 (iba WiFi)

**Štítky:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Aplikácia B1 Checkin je kompatibilná iba s tlačiarňami štítkov Brother. Tlačiarne iných značiek nebudú na tlač menoviek fungovať.
:::

:::info
Podľa návodu k tlačiarni ju pripojte k rovnakej sieti WiFi ako váš tablet. Ovládače a návody na nastavenie tlačiarní Brother nájdete na [webe podpory Brother](https://support.brother.com).
:::

## Prispôsobenie vzhľadu kiosku

Vzhľad aplikácie B1 Checkin môžete prispôsobiť brandingu vašej cirkvi. V B1 Admin prejdite na **Mobilné > B1 CheckIn** a v karte **Téma kiosku** nastavte:

### Farby

Prispôsobte osem farebných nastavení tak, aby zodpovedali brandingu vašej cirkvi:

- **Primárna** a **Primárna kontrastná** — Hlavná značková farba a jej farba textu.
- **Sekundárna** a **Sekundárna kontrastná** — Doplnková farba a jej farba textu.
- **Pozadie hlavičky** a **Pozadie podhlavičky** — Farby oblastí hlavičky kiosku.
- **Pozadie tlačidiel** a **Text tlačidiel** — Farby interaktívnych tlačidiel.

### Obrázok pozadia

Voliteľne nahrajte obrázok pozadia pre uvítaciu obrazovku kiosku a obrazovky vyhľadávania. Odporúčaná veľkosť je 1920x1080 pixelov.

### Pokojová obrazovka / šetrič obrazovky

Nastavte šetrič obrazovky, ktorý sa aktivuje po určitom čase nečinnosti:

1. Zapnite alebo vypnite pokojovú obrazovku.
2. Nastavte **časový limit** (koľko sekúnd nečinnosti pred spustením šetriča, minimum 10 sekúnd).
3. Pridajte jeden alebo viac **snímok** — každá snímka obsahuje obrázok a dobu zobrazenia (minimum 3 sekundy).

:::tip
Pokojovú obrazovku využite na zobrazovanie oznámení, nadchádzajúcich podujatí alebo uvítacích správ, keď sa kiosk aktívne nepoužíva.
:::

## Registrácia hostí cez QR kód

Kiosk na prihlasovanie môže zobraziť QR kód, ktorý si návštevníci naskenujú a zaregistrujú sa sami s rodinou vo svojom telefóne. To urýchľuje prihlasovanie pre hostí, ktorí sú na návšteve prvýkrát.

Keď hosť naskenuje QR kód, dostane sa na [stránku registrácie hostí](../../b1-church/checkin/guest-registration.md), kde zadá mená svojej rodiny a ďalšie údaje, o ktoré sa rozhodnete požiadať. Dobrovoľník ho potom môže vyhľadať na kiosku a prihlásiť.

### Zapnutie registrácie hostí cez QR kód

Ak chcete zobrazenie QR kódu zapnúť:

1. V B1 Admin otvorte [rýchlu navigáciu](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu) a rozbaľte **Mobilné**.
2. Kliknite na **B1 CheckIn**.
3. Prepnite **Registrácia hostí cez QR** do zapnutého stavu a kliknite na **Uložiť**.

:::note
Toto nastavenie sa nachádza v **Mobilné > B1 CheckIn** (na rovnakej stránke ako karta **Téma kiosku**), nie v časti Účasť. Akcia **Kiosk** na stránke Účasť obsahuje odkaz na túto stránku.
:::

Keď je prepínač zapnutý, ďalšie možnosti uvedené nižšie sa zobrazia v rovnakej karte **Registrácia hostí cez QR**. Po zmene ktorejkoľvek z nich kliknite na **Uložiť** na karte.

### Výber polí pre registráciu

Zoznam **Polia registrácie** určuje, o čo sa formulár registrácie pýta. **Meno** a **Priezvisko** sú vo formulári vždy a pre každého člena rodiny sú vždy povinné. Pri každom inom poli zapnite **Zahrnúť**, aby sa pridalo do formulára, a potom zapnite **Povinné**, ak musia hostia pole vyplniť. **Povinné** je možné zapnúť len pre zahrnuté pole a vypnutie **Zahrnúť** ho zruší.

| Pole | Pýta sa | Predvolene zahrnuté |
|------|---------|---------------------|
| **Titul** | Každého člena rodiny ako rozbaľovací zoznam pred menom (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nie |
| **E-mail** | Iba hlavný kontakt | Áno (voliteľné) |
| **Telefón** | Každého člena rodiny. Ak je povinné, musí ho vyplniť iba hlavný kontakt. | Áno (voliteľné) |
| **Úloha v domácnosti** | Každého člena rodiny okrem hlavného kontaktu — manžel/manželka, dieťa alebo iné. Hlavný kontakt je hlavou novej domácnosti. Kto nemá úlohu, je uložený ako iné. | Áno (voliteľné) |
| **Domáca adresa** | Raz za rodinu — ulica, adresný riadok 2, mesto, štát a PSČ. Ak je povinné, musí byť vyplnené všetko okrem adresného riadku 2. Adresa sa uloží ku každému členovi rodiny. | Nie |
| **Dátum narodenia** | Každého člena rodiny | Nie |
| **Pohlavie** | Každého člena rodiny | Nie |
| **Rodinný stav** | Iba hlavný kontakt | Nie |
| **Ročník** | Každého člena rodiny (PreK až 12, alebo Absolvent) | Nie |
| **Komentáre** | Raz, v poli pod členmi rodiny (až 1 000 znakov) | Nie |

Polia, ktoré vypnete, sa nikdy neuložia, aj keby ich niekto do registrácie poslal iným spôsobom. Komentáre sa uložia ako poznámka k záznamu hlavného kontaktu (zapísaná ako „Registrácia hosťa“), takže si ich môžete prečítať v sekcii **Poznámky** jeho profilu.

### Pridávanie hostí do skupiny

Pomocou **Pridať nových hostí do skupiny** automaticky zaradíte všetkých, ktorí sa zaregistrujú, do jednej z vašich skupín — napríklad do skupiny „Noví“ alebo do skupiny pre dnešné podujatie. Ak chcete tento krok preskočiť, vyberte **Žiadna** (predvolená hodnota). Hostia skupinu nikdy nevidia ani si ju nevyberajú; nastavuje sa iba tu. Zmeňte ju pred každým podujatím, aby ste mohli hostí daného podujatia sledovať spoločne.

### Zaznamenávanie účasti

Keď je vybraná skupina, zobrazí sa prepínač **Zaznamenať aj účasť**. Zapnite ho, ak chcete hostí označiť ako prítomných hneď pri registrácii, aby ste ich nemuseli prihlasovať osobitne.

Účasť sa zaznamená iba vtedy, ak sa registrácia uskutoční počas jedného z **naplánovaných** časov bohoslužieb vybranej skupiny:

- Skupina musí byť prepojená s jedným alebo viacerými časmi bohoslužieb a tieto časy musia mať [rozvrh prihlasovania](setup.md#setting-a-check-in-schedule) (**deň** a **začiatok**).
- „Počas“ znamená v rámci okna prihlasovania daného času bohoslužby — od počtu minút **Otvoriť prihlasovanie** pred začiatkom až do počtu minút **Zatvoriť prihlasovanie** po konci (alebo po začiatku, ak nie je nastavený koniec; ak nie je nastavený ani koniec, ani minúty zatvorenia, až do konca toho dňa), a to v tom istom časovom pásme, aké používa rozvrh prihlasovania.
- Každý člen rodiny sa označí ako prítomný v skupine pre každý jej čas bohoslužby, ktorý je v tom okamihu otvorený, a to k dnešnému dátumu.
- Registrácie v inom čase alebo pre skupinu, ktorej časy bohoslužieb nemajú rozvrh, sa do skupiny pridajú, ale nepočítajú sa ako účasť.

### Fotografia hlavičky

V časti **Fotografia hlavičky** kliknite na **Zmeniť fotografiu**, aby ste vybrali alebo nahrali obrázok (orezaný na pomer 16:9), ktorý sa zobrazí v hornej časti registračnej stránky namiesto predvolenej ikony. Kliknutím na **Odstrániť** sa vrátite k ikone.

### Zdieľanie odkazu na registráciu

Po zapnutí registrácie hostí cez QR kód sa v spodnej časti karty zobrazí sekcia **Zdieľať QR kód registrácie**. Získate tak dva spôsoby, ako dostať hostí na registračný formulár aj mimo QR kódu na kiosku:

- **Kopírovať odkaz** — skopíruje URL adresu registrácie, aby ste ju mohli vložiť na webovú stránku cirkvi, do e-mailov alebo kamkoľvek na internet.
- **Stiahnuť PNG** — stiahne QR kód ako obrázok, ktorý môžete vytlačiť na letáky, do bulletinov alebo na tabule.

:::tip
Pridajte odkaz na registráciu na stránku „Naplánujte si návštevu“ alebo „Som tu nový“ na webe vašej cirkvi, aby sa hostia mohli zaregistrovať ešte pred príchodom.
:::

### Čo sa stane po registrácii hosťa

B1 najprv hľadá osoby, ktoré sú už v **Ľudia**. Člen rodiny sa priradí k existujúcej osobe, keď existuje presne jedna osoba s rovnakým menom a rovnakým e-mailom alebo telefónnym číslom. Dieťa zadané bez e-mailu alebo telefónu sa priradí podľa mena v rámci domácnosti, ktorá bola priradená. Priradené osoby sa použijú tak, ako sú — registrácia nikdy nemení ich údaje ani stav členstva — a každý nový člen sa pridá do priradenej domácnosti.

Ak sa nikto nezhoduje, registrácia vytvorí novú domácnosť pomenovanú podľa priezviska hlavného kontaktu so záznamom osoby pre každého člena rodiny. Všetci noví sa pridajú do **Ľudia** so stavom členstva **Návštevník** a hlavný kontakt bude hlavou domácnosti.

Priradení aj noví ľudia sa pridajú do vybranej skupiny (ak v nej ešte nie sú) a ich účasť sa zaznamená, ak je to zapnuté. Komentáre sa uložia ako poznámka k hlavnému kontaktu.

Ak chcete na návštevníkov reagovať automaticky, pridajte [spúšťač pracovného postupu](../serving/workflows.md#triggers), napríklad **Osoba · Vytvorená** s podmienkou *Stav členstva je Návštevník*, alebo **Skupina · Člen sa pripojil** pre skupinu, ktorú ste vybrali vyššie.

## Čo sa zaznamenáva

Každé prihlásenie vytvorí záznam účasti v B1 Admin. Tieto záznamy môžete zobraziť na stránke [Účasť](tracking-attendance.md) a v [sedeniach každej skupiny](../groups/group-members.md) rovnako ako účasť zadanú ručne. Údaje sa zobrazujú rovnako — obe metódy napájajú tie isté prehľady.
