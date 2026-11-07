---
title: "Live Streaming"
---

# Živé vysielanie

<div class="article-intro">

Stránka Časy živého vysielania vám umožňuje nastaviť harmonogram streamovania vašej cirkvi, spravovať časy bohoslužieb a prispôsobiť zážitok divákov. Nastavte opakujúce sa týždenné bohoslužby alebo jednorazové udalosti, nakonfigurujte nastavenia chatu a videa a určte, kedy sa váš stream spustí.

</div>

## Školiace video

<YouTube id="tpEY-sEYW6A" title="Nastavenie živého vysielania v B1" next="Prispôsobenie aplikácie pre členov vašej cirkvi v B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Predtým, než začnete</h4>

- Potrebujete oprávnenie **contentApi.streamingServices.edit**. Ak nemáte prístup, pozrite si [Roly a oprávnenia](../settings/roles-permissions.md).
- Ak plánujete používať automatizované živé vysielanie, pripravte si ID vášho kanála YouTube
- Pridajte aspoň jedno [kázanie](managing-sermons) alebo trvalú živú URL adresu ako zdroj vysielania

</div>

Živé vysielanie sa spravuje z dvoch stránok v sekcii **Kázania** v ponuke Jump: **Časy živého vysielania** na správu harmonogramu živého vysielania a **Nastavenia** na konfiguráciu záložiek na vašej stránke vysielania.

## Správa bohoslužieb

### Pridanie bohoslužby

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte **Kázania** a kliknite na **Časy živého vysielania**.
2. Kliknutím na tlačidlo **Pridať bohoslužbu** v hornej časti stránky vytvorte novú naplánovanú bohoslužbu. Existujúce bohoslužby sú uvedené v tabuľke, ktorá zobrazuje názov, čas, poskytovateľa a trvanie každej bohoslužby; ak chcete zmeniť záznam, kliknite na ikonu úpravy v riadku.
3. Zadajte **Názov bohoslužby** (napríklad „Nedeľné ráno“).
4. Nastavte **Čas bohoslužby** – vyberte deň a čas, kedy bohoslužba začína.
5. Nastavte **Opakuje sa týždenne** na **Áno** pre pravidelné týždenné bohoslužby alebo na **Nie** pre jednorazovú udalosť.

### Nastavenie chatu a videa

6. V časti **Nastavenia chatu** nastavte, koľko minút pred a po bohoslužbe sa má chat sprístupniť. Návštevníci tak môžu začať chatovať ešte pred začiatkom bohoslužby a pokračovať aj po nej.
7. V časti **Nastavenia videa** nastavte, koľko skôr sa má začať video stream pre odpočítavanie alebo obsah pred bohoslužbou. Chat sa otvorí o toľko minút *pred* skorším začiatkom videa, takže čas zobrazený vedľa nastavenia minút pred chatom zahŕňa obe hodnoty. Napríklad pri bohoslužbe o 10:00 s 15 minútami chatu pred bohoslužbou a 5-minútovým skorším štartom sa chat otvorí o 9:40.
8. Z rozbaľovacieho zoznamu vyberte kázanie, ktoré sa má prehrať:
   - **Najnovšie kázanie** – automaticky prehrá vaše naposledy pridané video.
   - **Aktuálna živá bohoslužba** – prehrá váš aktuálny živý stream z YouTube pomocou vášho ID kanála.
   - Môžete tiež vybrať ľubovoľné konkrétne kázanie, ktoré ste už uložili.
9. Kliknutím na **Uložiť** naplánujte bohoslužbu.

:::info
Ak je bohoslužba nastavená ako opakujúca sa, bude sa každý týždeň automaticky aktualizovať. Zostáva na rovnakom miestnom čase, keď sa začína alebo končí letný čas. Môžete pridať toľko bohoslužieb, koľko potrebujete. Návštevníci uvidia čas najbližšej naplánovanej bohoslužby, keď navštívia vašu stránku vysielania.
:::

## Nastavenia stránky vysielania

Ak chcete prispôsobiť záložky a odkazy, ktoré sa zobrazujú vedľa vášho živého vysielania, otvorte ponuku Jump, rozbaľte **Kázania** a kliknite na **Nastavenia**. Stránka **Nastavenia vysielania** zobrazuje zoznam **Záložiek obsahu**.

### Pridávanie záložiek

1. Kliknutím na tlačidlo **Pridať** pridáte novú záložku na stránku živého vysielania.
2. Vyberte **Typ odkazu**: **Externá URL adresa** pre vlastný odkaz alebo jednu z preddefinovaných záložiek **Chat** alebo **Modlitby**.
3. Pri záložke Chat stačí zadať názov do poľa **Text záložky** a nastavenie je hotové.
4. Pri odkazovej záložke zadajte názov záložky, vyberte ikonu kliknutím na tlačidlo ikony a zadajte URL adresu.
5. Nakonfigurované záložky sa zobrazia na stránke živého vysielania, aby ich diváci mohli využiť na prístup k ďalším zdrojom a interaktívnym funkciám.

### Ukážka vášho vysielania

Na stránke **Časy živého vysielania** kliknite v hornej časti stránky na **Zobraziť vaše vysielanie**, aby ste presne videli, ako bude vaša stránka živého vysielania vyzerať pre návštevníkov, vrátane vášho loga, časov bohoslužieb a nakonfigurovaných záložiek.

## Nastavenie živého vysielania na YouTube

Ak chcete pripojiť váš kanál YouTube na automatické živé vysielanie:

1. Prejdite do sekcie **Kázania** a kliknite na **Pridať kázanie**, potom vyberte **Pridať trvalú živú URL adresu**.
2. Poskytovateľ videa je predvolene nastavený na **Aktuálny živý stream YouTube**. Zadajte vaše **ID kanála YouTube**.
3. Pridajte názov a popis, potom kliknite na **Uložiť**.
4. V **Časoch živého vysielania** vytvorte bohoslužbu a vyberte svoju trvalú živú URL adresu z rozbaľovacieho zoznamu kázaní.

:::tip
ID vášho kanála YouTube nájdete tak, že prejdete do rozšírených nastavení vášho kanála YouTube a skopírujete hodnotu ID kanála.
:::

## Prispôsobenie farieb a loga

Vaša stránka živého vysielania používa nastavenia [Vzhľadu](../website/appearance) vašej webovej stránky:

- Pre hlavičku sa používa **svetlá zvýrazňujúca farba** s tmavým textom.
- Pre bočný panel sa používa **tmavá zvýrazňujúca farba** so svetlým textom.
- Na stránke vysielania sa zobrazuje vaše **logo pre svetlé pozadie**. Použite obrázok s priehľadným pozadím a pomerom strán 4:1.

Ak chcete tieto nastavenia zmeniť, prejdite do **Webová stránka** a potom do **Vzhľad** a aktualizujte nastavenia [farebnej palety](../website/appearance#color-palette) a [loga](../website/appearance#logo-and-branding).

## Pridávanie hostiteľov vysielania

Ak chcete členom tímu umožniť prístup k chatu iba pre hostiteľov spolu s verejným chatom:

1. V ponuke Jump vyberte **Nastavenia > Roly**.
2. Kliknite na tlačidlo plus a vyberte **Pridať vlastnú rolu**.
3. Rolu pomenujte „Hostiteľ vysielania“ a kliknite na **Uložiť**.
4. Kliknite na novú rolu a potom v sekcii Členovia kliknite na **Pridať** a pridajte osoby.
5. Posuňte sa nadol k **Upraviť oprávnenia**, rozbaľte sekciu **Obsah** a zaškrtnite **Chat hostiteľa**.

Keď sa hostitelia prihlásia na stránku živého vysielania, vedľa verejného chatu sa zobrazí súkromná záložka **Chat hostiteľa** pre konverzácie určené len pre zamestnancov počas prenosu.

:::info
Ďalšie podrobnosti o vytváraní rolí a správe oprávnení nájdete v časti [Roly a oprávnenia](../settings/roles-permissions.md).
:::

## Riešenie problémov

Ak sa váš automatizovaný živý stream z YouTube nezobrazuje správne pri použití možnosti „Aktuálny živý stream YouTube“ s vaším ID kanála, skúste nasledujúce kroky:

**Príznaky:**
- Vložený živý stream zobrazuje „Video nie je dostupné“
- Stránka sa načíta, ale nezobrazuje sa žiadne video
- Priame vloženie videa z YouTube funguje, ale automatizovaný živý stream z kanála nie

**Riešenie:**
Skontrolujte svoj kanál YouTube, či neobsahuje staré alebo naplánované živé vysielania, a odstráňte ich:

1. Prejdite do YouTube Studio.
2. Prejdite na **Obsah** a potom na **Živé**.
3. Vyhľadajte staré naplánované živé vysielania alebo naplánované streamy, ktoré ešte neprebehli.
4. Odstráňte tieto staré alebo naplánované položky živého vysielania.
5. Znovu otestujte svoju stránku živého vysielania.

:::warning
Automatizované živé vysielanie kanála YouTube sa môže zablokovať, ak je vo vašom kanáli viacero naplánovaných alebo minulých živých vysielaní. Ich odstránenie umožní YouTube správne identifikovať a zobraziť váš aktuálny živý stream.
:::

**Ďalšie požiadavky:**
- Váš živý stream musí byť nastavený na **Verejný** (nie Neuvedený ani Súkromný).
- Vkladanie musí byť povolené v nastaveniach streamovania YouTube.
- Uistite sa, že používate poskytovateľa **Aktuálny živý stream YouTube** (s ID kanála), nie poskytovateľa **YouTube** (s ID videa).

## Ďalšie kroky

- [Správa kázaní](managing-sermons) – Pridávanie kázaní do vašej knižnice
- [Playlisty](playlists) – Usporiadanie kázaní do sérií
