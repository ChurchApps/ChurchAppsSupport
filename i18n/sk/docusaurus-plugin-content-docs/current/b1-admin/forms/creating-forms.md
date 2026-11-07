---
title: "Vytváranie formulárov"
description: "Vytvárajte vlastné formuláre v B1 Admin pre registrácie na udalosti, prieskumy a návštevnícke karty a zdieľajte ich odkazom, QR kódom alebo tlačou."
---

# Vytváranie formulárov

<div class="article-intro">

Vytvárajte vlastné formuláre na zber informácií od vášho zboru. Môžete vytvárať formuláre na registrácie na podujatia, prieskumy, návštevnícke karty, prihlášky za člena a ďalšie. Formuláre možno prepojiť s osobami vo vašej databáze alebo používať ako samostatné stránky s vlastnou verejnou adresou URL.

</div>

## Video na zaškolenie

<YouTube id="sr9wxEj9ghQ" title="Vytváranie formulárov a správa odoslaní v B1" next="Spustenie webovej stránky vášho zboru v B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Pre formuláre **Osoby** (prepojené so záznamami osôb) najprv potrebujete [ľudí vo vašej databáze](../people/adding-people.md).
- Pre formuláre, ktoré zbierajú **platby**, musíte mať [nastavené Stripe pre online dary](../donations/online-giving-setup.md).

</div>

## Vytvorenie nového formulára

1. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu B1 Admin), rozbaľte **Osoby** a kliknite na **Formuláre**.
2. Kliknite na **Pridať formulár**.
3. Zadajte **názov** formulára.
4. Typ formulára vyberte z rozbaľovacieho zoznamu **Spojiť s**:
   - **Osoby** — Priraďuje odoslania k [záznamom osôb](../people/adding-people.md) vo vašej databáze. Formuláre pre osoby sa vypĺňajú zo záznamu osoby, preto nemajú odkaz na zdieľanie.
   - **Samostatný** — Vytvára samostatný formulár s vlastnou verejnou adresou URL, ideálny na externé registrácie. Iba samostatné formuláre ponúkajú [fotografiu hlavičky](#adding-a-header-photo), [QR kód](#sharing-a-form-with-a-qr-code), [prepojenú skupinu](#linking-a-form-to-a-group) a **Vytvoriť záznam osoby z odoslaní**.
5. Kliknite na **Uložiť**, čím vytvoríte formulár.

Vami vytvorený formulár sa zobrazí v zozname. Kliknutím naň začnete pridávať otázky.

## Tlač prázdneho formulára {#printing-a-blank-form}

Potrebujete papierovú kópiu na rozdanie – napríklad návštevnícku kartu pri uvítacom stole alebo formulár, ktorý môže ručne vyplniť niekto bez prístupu na internet? Kliknite na **Tlačiť** vedľa formulára v hlavnom zozname Formulárov, čím otvoríte náhľad, potom kliknite na **Tlačiť**. Prázdne polia sa vytlačia s podčiarknutím alebo políčkom pri každej otázke, aby ich ľudia mohli vyplniť ručne; povinné otázky sú označené hviezdičkou. Na vrchu stránky sa zobrazí logo vášho zboru (**Logo pre svetlé pozadie** z [Web > Vzhľad](../website/appearance.md), ak ste ho nahrali), pod ním názov zboru a potom názov formulára. Iné možnosti tlače nie sú – vytlačíte celý formulár alebo nič.

## Zdieľanie formulára pomocou QR kódu {#sharing-a-form-with-a-qr-code}

Samostatné formuláre majú vedľa seba odkaz **QR Code** v hlavnom zozname Formulárov (archivované formuláre nie). Kliknutím otvoríte QR kód pre verejnú adresu URL formulára, pod ním sa zobrazí odkaz. Kliknite na **Stiahnuť PNG**, čím uložíte kód ako obrázok, ktorý môžete vytlačiť do vestníkov alebo zobraziť na prezentácii. Každý, kto ho naskenuje, otvorí formulár vo svojom telefóne.

## Pridávanie otázok {#adding-questions}

1. Otvorte svoj formulár a prejdite na kartu **Otázky**.
2. Kliknite na **Pridať otázku**.
3. Vyberte **typ poľa** z rozbaľovacieho zoznamu Provider. Dostupné typy zahŕňajú:
   - **Textové pole** — Na krátke textové odpovede
   - **Dátum** — Na výber dátumu
   - **E-mail** — Na e-mailové adresy
   - **Telefónne číslo** — Na zadanie telefónneho čísla
   - **Výber z možností** — Na výber z vopred pripravených možností
   - **Platba** — Na zber platieb
4. Zadajte **Názov** a voliteľný **Popis** otázky. Popis sa zobrazí pod otázkou, keď ľudia vypĺňajú formulár, takže ho využite na nápovedy, napríklad „Uveďte akékoľvek alergie, o ktorých by sme mali vedieť.“
5. Začiarknite **Vyžadovať odpoveď**, ak je pole povinné.
6. Kliknite na **Uložiť**.
7. Opakujte, ak chcete pridať ďalšie otázky.

:::warning
Typ poľa **Platba** vyžaduje nastavené Stripe. Ak ešte nemáte nastavené online dary, pozrite si [Nastavenie online darov](../donations/online-giving-setup.md) pred pridaním platobných polí. Ľudia, ktorí platia vo formulári bez prihlásenia, musia pred prijatím karty zaškrtnúť políčko **Nie som robot**.
:::

## Správa členov formulára {#managing-form-members}

1. Otvorte svoj formulár a prejdite na kartu **Členovia formulára**.
2. Vyhľadajte osobu a pridajte ju s rolou:
   - **Správca** — Môže upravovať formulár a zobraziť všetky odoslania.
   - **Iba na zobrazenie** — Môže zobrazovať odoslania, ale nemôže upravovať formulár.

## Prepojenie formulára so skupinou {#linking-a-form-to-a-group}

Ľubovoľný samostatný formulár môžete prepojiť so skupinou – napríklad formulár na modlitebné prosby pre malú skupinu alebo lekárske uvoľnenie na výlet mládeže:

1. Otvorte **Podrobnosti** svojho formulára.
2. V časti **Prepojená skupina** vyberte skupinu alebo ponechajte **Žiadna**.
3. Kliknite na **Uložiť**.

Keď je formulár prepojený:

- **Členovia skupiny** vidia formulár v sekcii **Formuláre** na stránke skupiny na B1.church, kým je formulár otvorený, s tlačidlom **Vyplniť**, ktoré ho otvorí (pozrite [Podrobnosti skupiny](../../b1-church/groups/group-details.md#linked-forms)).
- **Vedúci skupiny** vidia aj uzavreté formuláre a môžu čítať odpovede každého odoslania a tlačiť ich (jedno odoslanie alebo **Tlačiť všetko**). Vedúci môžu iba zobrazovať odpovede – nemôžu upravovať formulár, pokiaľ nie sú zároveň [členmi formulára](#managing-form-members).
- **V B1 Admin** stránka skupiny zobrazuje sekciu **Prepojené formuláre**, ktorá vypisuje každý prepojený formulár ako **Otvorený** alebo **Uzavretý**. Zobrazuje sa vedúcim skupiny a osobám, ktoré môžu spravovať formuláre. Pozrite [Členovia skupiny](../groups/group-members.md#linked-forms).

Formulár je uzavretý, keď je mimo svojho časového rozsahu dostupnosti. Archivované formuláre sa na stránke skupiny nezobrazujú.

### Automatické pridávanie odosielateľov do skupiny {#automatically-adding-submitters-to-a-group}

Prepojenie formulára so skupinou samo osebe nikoho do nej nepridá. Ak chcete pridať každého odosielateľa do zoznamu prepojenej skupiny, zapnite aj **Vytvoriť záznam osoby z odoslaní** v podrobnostiach formulára a kliknite na **Uložiť**.

Vždy, keď niekto formulár odošle, zodpovedajúca alebo novovytvorená osoba sa pridá do skupiny (existujúci členovia skupiny sa preskočia). Je to užitočné napríklad pri prihláške na tábor, ktorá má automaticky vytvárať zoznam účastníkov tábora.

### Odoslanie následného e-mailu

Ak máte zapnuté **Vytvoriť záznam osoby z odoslaní**, môžete tiež poslať e-mail každej osobe, ktorá formulár odošle. Vyplňte **Predmet následného e-mailu** a **Text následného e-mailu** v podrobnostiach formulára. V oboch môžete použiť tokeny `{firstName}` a `{churchName}`. E-mail sa odošle, iba ak sú obe polia vyplnené.

:::info
Následné e-maily sa odosielajú až po schválení vášho zboru na odosielanie skupinových e-mailov a počítajú sa do denného limitu e-mailov vášho zboru. Pozrite [Zapnutie skupinových e-mailov pre váš zbor](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplikovanie formulára

Ak chcete použiť formulár ako východisko pre nový, kliknite na **Duplikovať** vedľa formulára v zozname Formulárov a potvrďte. B1 vytvorí presnú kópiu formulára – vrátane všetkých otázok –, ktorú potom môžete premenovať a upravovať nezávisle.

:::tip
Duplikovanie je praktické pri opakujúcich sa podujatiach, kde zostávajú registračné otázky rovnaké z roka na rok. Duplikujte minuloročný formulár, aktualizujte názov a dátumy a môžete začať.
:::

## Nastavenie vlastností formulára

Názov a nastavenia formulára môžete kedykoľvek aktualizovať. Pri samostatných formulároch uvidíte aj jedinečnú **verejnú adresu URL**, ktorú môžete zdieľať s kýmkoľvek, a pole **Popis** – text zobrazený nad otázkami na verejnej stránke formulára, užitočný na vysvetlenie, na čo formulár slúži, skôr ako ho ľudia začnú vypĺňať.

### Pridanie fotografie hlavičky {#adding-a-header-photo}

Samostatné formuláre môžu zobraziť **Fotografiu hlavičky** v hornej časti formulára. V podrobnostiach formulára kliknite na políčko s fotografiou alebo **Pridať fotografiu**, potom vyberte alebo nahrajte obrázok (orezá sa na pomer 16:9). Kliknite na **Uložiť**. Fotografia sa zobrazí pod názvom formulára, nad popisom, na stránke verejnej adresy URL formulára a všade, kde je formulár vložený pomocou prvku **Formulár** na webe. Použite **Zmeniť fotografiu** na jej nahradenie alebo **Odstrániť** na jej odstránenie.

Pomocou poľa **Text poďakovania** nastavte, čo ľudia uvidia po odoslaní formulára, vrátane stránky verejnej adresy URL formulára. Ak ho necháte prázdne, uvidia „Ďakujeme za odoslanie formulára!“

:::tip
Samostatné formuláre sú skvelé na registrácie na podujatia. Verejnú adresu URL zdieľajte e-mailom, na sociálnych sieťach alebo formulár priamo vložte na webovú stránku vášho zboru.
:::

:::info
Ak chcete vložiť formulár na svoju webovú stránku B1, otvorte editor webu, pridajte novú sekciu a vyberte prvok **Formulár**. Potom vyberte formulár, ktorý chcete zobraziť. Podrobnosti o úprave webovej stránky nájdete v [Správa stránok](../website/managing-pages.md).
:::
