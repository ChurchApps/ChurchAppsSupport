---
title: "Nastavenie samoobslužného check-inu s B1 Checkin a B1 Admin"
sidebar_label: "Prihlásenie"
description: "Nastavte samoobslužný check-in pre bohoslužby s aplikáciou B1 Checkin v B1 Admin: zariadenia, kiosk účty, rozvrhy, branding a registrácia hostí cez QR kód."
---

# Prihlásenie

<div class="article-intro">

B1 Admin podporuje samoprihlasovanie na bohoslužby prostredníctvom doplnkovej aplikácie **B1 Checkin**. Členovia sa môžu pri príchode sami prihlásiť aj so svojimi rodinami na kioskoch alebo vyhradených zariadeniach, čo proces zrýchli a zníži záťaž vašich dobrovoľníkov. Každé prihlásenie sa automaticky zaznamená ako dochádzka.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Vaše kampusy, časy bohoslužieb a skupiny musia byť nastavené v [Nastavení dochádzky](setup.md).
- Potrebujete [ľudí vo vašej databáze](../people/adding-people.md) s nastavenými [domácnosťami](../people/adding-people.md#managing-households), aby sa rodiny mohli prihlásiť spoločne.
- Budete potrebovať tablet a voliteľne tlačiareň štítkov Brother (pozri [odporúčaný hardvér](#recommended-hardware) nižšie).

</div>

## Ako to funguje

Aplikácia B1 Checkin sa pripája k nastaveniu dochádzky v B1 Admin. Keď sa člen prihlási, jeho dochádzka sa automaticky zaznamená pre správny kampus, čas bohoslužby a skupinu. Dochádzku nemusíte zadávať ručne pre nikoho, kto používa systém prihlasovania.

## Nastavenie prihlasovania

1. **Najprv nastavte štruktúru dochádzky.** V B1 Admin prejdite na **Ľudia > Dochádzka** a kliknite na **Nastavenie**, aby ste sa uistili, že máte nastavené kampusy, časy bohoslužieb a skupiny. Aplikácia na prihlasovanie sa spolieha na túto konfiguráciu. Voliteľne môžete každému času bohoslužby priradiť [plán prihlasovania](setup.md#setting-a-check-in-schedule), aby sa prihlasovanie každý týždeň otváralo a zatváralo automaticky. Plány používajú časové pásmo kampusu, v ktorom bohoslužba prebieha, alebo časové pásmo vášho kostola, ak kampus žiadne nemá nastavené. Kiosk časy bohoslužieb, ktorých okno je uzavreté, zobrazuje ako **Zatvorené** a rodinám oznámi, kedy sa prihlasovanie otvorí. Podrobnosti nájdete v [Nastavení dochádzky](setup.md).
2. **Nainštalujte aplikáciu B1 Checkin** na zariadeniach, ktoré plánujete používať. Aplikácia je dostupná na týchto platformách:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/tablety Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablety Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Prihláste sa do aplikácie B1 Checkin** pomocou účtu, ktorý má oprávnenie **Prihlasovanie** (alebo **Upraviť dochádzku**). Pozri [Účty kiosku na prihlasovanie](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Vyberte kampus a čas bohoslužby** pre aktuálne stretnutie.
5. Členovia teraz môžu na zariadení vyhľadať svoje meno a prihlásiť sa.

:::tip
Umiestnite zariadenia na prihlasovanie na viditeľné a ľahko dostupné miesta, napríklad pri vchode do vestibulu alebo pri uvítacom pulte. Krátke oznámenie počas bohoslužieb pomôže členom vedieť, že táto možnosť existuje.
:::

:::tip
Ak má váš kostol viacero kampusov, nastavenie musíte zopakovať pre každý kampus v [Nastavení dochádzky](setup.md). Každé prihlasovacie zariadenie možno nakonfigurovať pre iný kampus.
:::

## Odporúčaný hardvér

**Tablety** — ktorékoľvek z týchto dobre fungujú s aplikáciou:

- **Kompaktný:** Samsung Galaxy Tab A7 Lite 8,7"
- **Veľká obrazovka:** Samsung Galaxy Tab A8 10,5"
- **Rozpočtový:** Amazon Fire HD 10

**Tlačiarne** — prihlasovanie funguje s tlačiarňami štítkov Brother na tlač menoviek:

- **Najlepšia:** Brother QL-1110NWB (podporuje viacero tabletov cez Bluetooth a WiFi)
- **Dobrá:** Brother QL-810W (podporuje viacero tabletov cez WiFi)
- **Rozpočtová:** Brother QL-1100 (iba WiFi)

**Štítky:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
S aplikáciou B1 Checkin sú kompatibilné iba tlačiarne štítkov Brother. Tlačiarne iných značiek na tlač menoviek fungovať nebudú.
:::

:::info
Podľa návodu k tlačiarni ju pripojte k rovnakej WiFi sieti ako váš tablet. Ovládače a návody na nastavenie tlačiarní Brother nájdete na [webe podpory Brother](https://support.brother.com).
:::

## Prispôsobenie vzhľadu kiosku

Vzhľad aplikácie B1 Checkin môžete prispôsobiť tak, aby zodpovedal značke vášho kostola. V B1 Admin prejdite na **Mobil > B1 CheckIn** a použite kartu **Téma kiosku** na nastavenie:

### Farby

Nastavte osem farieb tak, aby zodpovedali značke vášho kostola:

- **Primárna** a **Kontrast primárnej** -- Hlavná značková farba a farba jej textu.
- **Sekundárna** a **Kontrast sekundárnej** -- Doplnková farba a farba jej textu.
- **Pozadie hlavičky** a **Pozadie podhlavičky** -- Farby oblastí hlavičky kiosku.
- **Pozadie tlačidiel** a **Text tlačidiel** -- Farby interaktívnych tlačidiel.

### Obrázok na pozadí

Na uvítacie a vyhľadávacie obrazovky kiosku môžete nahrať voliteľný obrázok na pozadí. Odporúčaná veľkosť je 1920x1080 pixelov.

### Nečinná obrazovka / šetrič obrazovky

Nastavte šetrič obrazovky, ktorý sa aktivuje po určitom čase nečinnosti:

1. Zapnite alebo vypnite nečinnú obrazovku.
2. Nastavte **časový limit** (koľko sekúnd nečinnosti musí uplynúť, kým sa spustí šetrič, minimálne 10 sekúnd).
3. Pridajte jeden alebo viac **snímok** — každá snímka má obrázok a dobu zobrazenia (minimálne 3 sekundy).

:::tip
Nečinnú obrazovku využite na zobrazovanie oznámení, nadchádzajúcich podujatí alebo uvítacích správ, keď sa kiosk aktívne nepoužíva.
:::

## Registrácia hostí pomocou QR kódu

Prihlasovací kiosk môže zobraziť QR kód, ktorý návštevníci naskenujú a zaregistrujú sa sami seba aj svoju rodinu vo vlastnom telefóne. Tým sa urýchli prihlasovanie pre hostí, ktorí prichádzajú prvýkrát.

Keď hosť naskenuje QR kód, otvorí sa mu [stránka registrácie hostí](../../b1-church/checkin/guest-registration.md), kde zadá mená členov svojej rodiny a ďalšie údaje, o ktoré sa rozhodnete požiadať. Dobrovoľník ho potom môže vyhľadať na kiosku a prihlásiť.

### Zapnutie registrácie hostí cez QR kód

Ak chcete zapnúť zobrazenie QR kódu:

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu) a rozbaľte **Mobil**.
2. Kliknite na **B1 CheckIn**.
3. Prepnite **Registrácia hostí cez QR** do zapnutej polohy a kliknite na **Uložiť**.

:::note
Toto nastavenie je pod **Mobil > B1 CheckIn** (na rovnakej stránke ako karta **Téma kiosku**), nie pod Dochádzkou. Akcia **Kiosk** na stránke Dochádzka obsahuje odkaz na túto stránku.
:::

Po zapnutí prepínača sa ostatné možnosti uvedené nižšie zobrazia na rovnakej karte **Registrácia hostí cez QR**. Po zmene ktorejkoľvek z nich kliknite na **Uložiť** na karte.

### Výber polí pre registráciu

Zoznam **Polia registrácie** určuje, na čo sa registračný formulár pýta. **Meno** a **Priezvisko** sú vo formulári vždy a pre každého člena rodiny sú vždy povinné. Pri každom inom poli zapnite **Zahrnúť**, aby sa pridalo do formulára, a potom zapnite **Povinné**, ak musia hostia pole vyplniť. **Povinné** možno zapnúť iba pre zahrnuté pole a vypnutie **Zahrnúť** ho zruší.

| Pole | Pýta sa | Zahrnuté predvolene |
|-------|-----------|---------------------|
| **E-mail** | Iba hlavný kontakt | Áno (voliteľné) |
| **Telefón** | Iba hlavný kontakt | Áno (voliteľné) |
| **Domáca adresa** | Raz za rodinu — ulica, adresný riadok 2, mesto, štát a PSČ. Ak je povinná, musí byť vyplnené všetko okrem adresného riadku 2. Adresa sa uloží ku každému členovi rodiny. | Nie |
| **Dátum narodenia** | Každý člen rodiny | Nie |
| **Pohlavie** | Každý člen rodiny | Nie |
| **Rodinný stav** | Iba hlavný kontakt | Nie |
| **Ročník** | Každý člen rodiny (od PreK po 12, alebo Absolvoval) | Nie |
| **Komentáre** | Raz, v poli pod členmi rodiny (až 1 000 znakov) | Nie |

Polia, ktoré vypnete, sa nikdy neuložia, ani keby ich niekto do registrácie poslal iným spôsobom. Komentáre sa uložia ako poznámka do záznamu hlavného kontaktu (zverejnená ako „Registrácia hosťa“), takže si ich môžete prečítať v sekcii **Poznámky** jeho profilu.

### Pridanie hostí do skupiny

Použite **Pridať nových hostí do skupiny**, aby sa každý, kto sa zaregistruje, automaticky zaradil do jednej z vašich skupín — napríklad do skupiny „Noví“ alebo do skupiny pre tohtoročné podujatie. Vyberte **Žiadna** (predvolené), ak to nechcete. Hostia skupinu nevidia ani si ju nevyberajú; nastavuje sa iba tu. Pred každým podujatím ju zmeňte, aby ste mohli hostí daného podujatia sledovať spoločne.

### Zaznamenávanie dochádzky

Keď je vybraná skupina, zobrazí sa prepínač **Zaznamenať aj dochádzku**. Zapnite ho, aby sa hostia označili ako prítomní už v momente registrácie, a nemuseli ste ich prihlasovať osobitne.

Dochádzka sa zaznamená iba vtedy, keď sa registrácia uskutoční počas jedného z **naplánovaných** časov bohoslužieb vybranej skupiny:

- Skupina musí byť priradená k jednému alebo viacerým časom bohoslužieb a tieto časy musia mať [plán prihlasovania](setup.md#setting-a-check-in-schedule) (**Deň** a **Čas začiatku**).
- „Počas“ znamená v rámci okna prihlasovania daného času bohoslužby — od počtu minút **Otvoriť prihlasovanie** pred začiatkom až po počet minút **Zatvoriť prihlasovanie** po skončení (alebo po začiatku, ak nie je nastavený čas skončenia; ak nie je nastavený ani čas skončenia, ani minúty zatvorenia, tak do konca daného dňa), v rovnakom časovom pásme, aký používa plán prihlasovania.
- Každý člen rodiny sa označí ako prítomný v skupine pre každý z jej časov bohoslužieb, ktorý je v danom okamihu otvorený, s dnešným dátumom.
- Registrácie v inom čase alebo pre skupinu, ktorej časy bohoslužieb nemajú plán, sa do skupiny pridajú, ale nepočítajú sa ako účasť.

### Hlavička s fotografiou

V časti **Fotografia hlavičky** kliknite na **Zmeniť fotografiu**, aby ste vybrali alebo nahrali obrázok (orezaný na pomer 16:9), ktorý sa zobrazí na vrchu registračnej stránky namiesto predvolenej ikony. Kliknutím na **Odstrániť** sa vrátite k ikone.

### Zdieľanie registračného odkazu

Po zapnutí registrácie hostí cez QR kód sa na spodku karty zobrazí sekcia **Zdieľať registračný QR kód**. Poskytuje dva spôsoby, ako dostať hostí na registračný formulár aj mimo QR kódu na kiosku:

- **Kopírovať odkaz** — skopíruje registračnú adresu URL, aby ste ju mohli vložiť na webovú stránku kostola, do e-mailov alebo kamkoľvek online.
- **Stiahnuť PNG** — stiahne QR kód ako obrázok, ktorý môžete vytlačiť na letáky, do vestníkov alebo na tabule.

:::tip
Pridajte registračný odkaz na stránku „Naplánujte si návštevu“ alebo „Som nový“ na webe vášho kostola, aby sa hostia mohli zaregistrovať ešte pred príchodom.
:::

### Čo sa stane po registrácii hosťa

B1 najprv hľadá ľudí, ktorí sú už v **Ľuďoch**. Člen rodiny sa spáruje s existujúcou osobou, keď existuje presne jedna osoba s rovnakým menom a rovnakým e-mailom alebo telefónnym číslom. Dieťa zadané bez e-mailu alebo telefónu sa spáruje podľa mena v rámci domácnosti, ktorá bola spárovaná. Spárovaní ľudia sa použijú takí, akí sú — registrácia nikdy nemení ich údaje ani stav členstva — a každý nový človek sa pridá do spárovanej domácnosti.

Ak sa nikto nespáruje, registrácia vytvorí novú domácnosť pomenovanú podľa priezviska hlavného kontaktu, so záznamom osoby pre každého člena rodiny. Všetci noví sa pridajú do **Ľudí** so stavom členstva **Návštevník** a hlavný kontakt bude hlavou domácnosti.

Spárovaní aj noví ľudia sa pridajú do vybranej skupiny (ak v nej ešte nie sú) a ich dochádzka sa zaznamená, ak je to zapnuté. Komentáre sa uložia ako poznámka k hlavnému kontaktu.

Ak chcete nadviazať automaticky, pridajte [spúšťač pracovného postupu](../serving/workflows.md#triggers), napríklad **Osoba · Vytvorená** s podmienkou *Stav členstva je Návštevník*, alebo **Skupina · Člen sa pripojil** pre skupinu, ktorú ste zvolili vyššie.

## Čo sa zaznamenáva

Každé prihlásenie vytvorí záznam dochádzky v B1 Admin. Tieto záznamy si môžete pozrieť na stránke [Dochádzka](tracking-attendance.md) a v [sedeniach každej skupiny](../groups/group-members.md) rovnako ako dochádzku zadanú ručne. Údaje sa zobrazujú rovnako — obe metódy napájajú tie isté prehľady.
