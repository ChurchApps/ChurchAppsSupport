---
title: "Vytváranie kalendárov"
---

# Vytváranie kalendárov

<div class="article-intro">

Vytvorenie kalendára v B1 Admin vám umožní zostaviť prehľad udalostí tak, že prepojíte jednu alebo viac skupín. Udalosti spravujú vedúci skupín v rámci svojich skupín a váš kalendár zobrazuje tieto udalosti na jednom mieste. Administrátori s právom úprav môžu pridávať alebo upravovať udalosti pre ktorúkoľvek skupinu. Vedúci skupín bez administrátorských práv môžu spravovať udalosti len pre skupiny, ktoré vedú.

</div>

## Video na zaučenie

<YouTube id="Ko3kgsCSLFs" title="Vytváranie kalendárov, udalostí a rezervácií miestností v B1" next="Registrácia na udalosti a platené udalosti v B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nastavte [skupiny](../groups/creating-groups.md), ktorých udalosti chcete zahrnúť do kalendára
- Potrebujete administratívny prístup k sekcii Kalendáre v B1 Admin

</div>

## Vytvorenie nového kalendára

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte **Kalendáre** a kliknite na **Kalendáre**.
2. Na hornej časti stránky kliknite na **Pridať kalendár**. Formulár pre nový kalendár sa otvorí pod zoznamom kalendárov.
3. Zadajte **názov** kalendára (napríklad „Udalosti mládeže“ alebo „Hlavný kostolný kalendár“).
4. Voliteľne pridajte **popis**, aby váš tím vedel, na čo tento kalendár slúži.
5. Kliknutím na **Vytvoriť** uložte nový kalendár.

## Stránka s detailom kalendára

Po vytvorení kalendára kliknite na **Spravovať udalosti** v jeho riadku a otvorte stránku s detailom. Táto stránka má dve hlavné časti:

- **Ľavý stĺpec** -- Názov kalendára s jeho akciami (**Nová udalosť**, **Upraviť**, **Importovať .ics** a **Tlačiť**), nasledovaný zoznamom **Skupiny v kalendári**, ktorý ukazuje, ktoré skupiny sú v tomto kalendári zahrnuté. Kliknutím na **Odstrániť** vedľa skupiny ju z kalendára odoberiete.
- **Hlavná oblasť** -- Zobrazenie **Udalosti kalendára** s udalosťami načítanými z prepojených skupín, nad ktorým sú tlačidlá **Odoberať** a **Pridať skupinu**.

## Prepájanie skupín

Skupiny, ktoré majú udalosti v kalendári, sa automaticky zobrazia v zozname **Skupiny v kalendári** na ľavej strane stránky s detailom.

1. Kliknutím na **Pridať skupinu** nad kalendárom priradíte skupinu ku kalendáru.
2. Vyberte skupinu z rozbaľovacieho zoznamu. Zoznam obsahuje všetky skupiny vo vašej cirkvi, nielen skupiny, do ktorých patríte.
3. Vyberte, či chcete zahrnúť **všetky udalosti** z danej skupiny, alebo len **konkrétne udalosti**.
4. Kliknite na **Uložiť**.

Každá udalosť sa v kalendári zobrazí len raz. Ak pridáte celú skupinu, všetky jej udalosti, ktoré ste už predtým pridali jednotlivo, sa začlenia do záznamu skupiny. Výber konkrétnych udalostí zo skupiny, ktorá už je v kalendári, nepridá nič nové. Pod položkou **Skupiny v kalendári** sa zobrazujú len skupiny pridané ako celok.

### Import súboru .ics

Kliknutím na **Importovať .ics** načítate udalosti z iného kalendára. Vyberte **Skupinu**, do ktorej majú udalosti patriť, potom kliknite na **Vybrať súbor .ics** alebo vložte obsah súboru, a kliknite na **Importovať**. Udalosti sa vytvoria v danej skupine a skupina sa pridá do kalendára, z ktorého importujete, takže sa udalosti hneď zobrazia aj tam.

### Odstránenie udalosti z kalendára

Kliknite na udalosť v kalendári a potom na **Odstrániť z kalendára**. Týmto sa udalosť odoberie len z tohto kalendára -- samotná udalosť zostane vo svojej skupine. Ak sa udalosť v kalendári nachádza preto, lebo bola pridaná celá jej skupina, odstránením sa z kalendára odoberú všetky udalosti tejto skupiny (udalosti zostanú v skupine). Ak chcete udalosť natrvalo vymazať, odstráňte ju v [kalendári skupiny](../groups/group-calendar.md).

:::tip
Prepojenie skupín s kalendárom je účinný spôsob, ako automaticky zhromažďovať udalosti. Keď vedúci skupiny pridá udalosť do svojej [skupiny](../groups/creating-groups.md), môže sa bez ďalšej práce z vašej strany zobraziť v kalendári celej cirkvi.
:::

:::info
Ak chcete vytvoriť jeden kalendár, ktorý zbiera udalosti z mnohých skupín v rámci vašej cirkvi, pozrite si [Kurátorský kalendár](curated-calendar), kde nájdete jednoduchší postup.
:::

## Pridávanie a úprava udalostí {#adding-and-editing-events}

Na stránke s detailom kalendára kliknite na **Nová udalosť**, ak chcete pridať udalosť, alebo kliknite na udalosť v kalendári a potom na **Upraviť**, ak ju chcete zmeniť. Formulár **Nová udalosť** / **Upraviť udalosť** obsahuje tieto polia:

- **Skupina** -- Skupina, do ktorej udalosť patrí. Ak vaša cirkev používa šablóny udalostí, môžete tiež vybrať **Šablónu**, ktorá formulár predvyplní.
- **Názov**
- **Fotografia udalosti** -- Kliknite na **Pridať fotku** (alebo na prázdne políčko pre fotku), aby ste vybrali alebo nahrali obrázok, ktorý sa orezáva do širokého tvaru 16:9. Kliknutím na **Zmeniť fotku** ju nahradíte. Fotografia sa zobrazuje na vrchu stránky udalosti na vašom webe a ako jej dlaždica, keď prvok Kalendár zobrazuje **Nadchádzajúce udalosti** (pozrite si [Zobrazovanie udalostí na vašom webe](#showing-events-on-your-website)).
- **Popis** -- Zobrazuje sa na stránke udalosti na vašom webe. Podporovaný je tučný text, zoznamy a odkazy.
- **Začiatok** a **Koniec**, **Opakovanie** a **Viditeľnosť** (**Verejná** alebo **Súkromná**).
- **Značky** -- Štítky oddelené čiarkami, napríklad `mládež, študenti`. Prvok Kalendár na vašom webe možno nastaviť tak, aby zobrazoval len udalosti s určitou značkou. Ide o rovnaké pole **Značky**, aké je v nastaveniach registrácie udalosti.
- **Kto môže zobraziť poznámky** a **Kto môže pridávať poznámky** -- Kto môže čítať a pridávať poznámky k udalosti (pozrite si [Poznámky k udalosti](#event-notes)). Vyberte **Iba zamestnanci** (predvolené nastavenie), **Vedúci skupiny** (vedúci skupiny udalosti) alebo **Členovia skupiny** (všetci v skupine udalosti vrátane jej vedúcich).
- **Miestnosti** a **Zdroje** -- Rezervujte priestor a vybavenie pre udalosť. Pozrite si [Miestnosti, zdroje a plánovanie](rooms-resources).

Kliknite na **Uložiť**. Ak sa udalosť opakuje, B1 vás požiada o potvrdenie, pretože uloženie aktualizuje každý výskyt v sérii.

### Poznámky k udalosti {#event-notes}

Každá udalosť má vlastné vlákno poznámok na plánovanie a nadväzujúce kroky. Kliknite na udalosť na stránke s detailom kalendára; dialógové okno zobrazí podrobnosti udalosti, jej pripomienky a pod nimi **Poznámky**. Napíšte poznámku a odošlite ju, aby sa pridala do vlákna.

Zamestnanci s oprávnením upravovať obsah alebo spravovať kalendáre môžu vždy čítať a pridávať poznámky k udalostiam. Nastavenia **Kto môže zobraziť poznámky** a **Kto môže pridávať poznámky** na udalosti určujú, či to môžu robiť aj vedúci alebo členovia skupiny udalosti.

### Zobrazovanie udalostí na vašom webe {#showing-events-on-your-website}

Ak chcete na svojom webe zobraziť kalendár, pridajte na stránku prvok **Kalendár** a vyberte tento kalendár. Prvok môže zobraziť mesačný kalendár alebo mriežku dlaždíc nadchádzajúcich udalostí a možno ho obmedziť na udalosti s jednou značkou. Návštevníci, ktorí kliknú na udalosť, otvoria jej vlastnú stránku. Pozrite si [Používanie prvku Kalendár](../website/page-editor.md#using-the-calendar-element).

## Zapnutie registrácie na udalosť {#enabling-event-registration}

Registráciu môžete zapnúť pre ľubovoľnú udalosť v kalendári, aby sa členovia mohli prihlásiť cez web alebo mobilnú aplikáciu B1.

1. Kliknite na existujúcu udalosť alebo vytvorte novú.
2. V editore udalosti prepnite **Registrácia** na zapnuté.
3. Nastavte možnosti registrácie:
   - **Kapacita** (voliteľné) -- Nastavte maximálny počet registrácií. Ak necháte prázdne, kapacita je neobmedzená.
   - **Otvorenie registrácie** -- Dátum a čas, kedy sa registrácia sprístupní.
   - **Uzavretie registrácie** -- Dátum a čas, kedy sa registrácia uzavrie.
   - **Značky** -- Štítky oddelené čiarkami (napríklad „mládež, retreat, VBS“), ktoré pomáhajú kategorizovať udalosti, na ktoré sa možno registrovať.
   - **Otázky k registrácii** -- Voliteľne pripojte [formulár](../forms/creating-forms.md), aby registrovaní odpovedali na dodatočné otázky (stravovacie obmedzenia, veľkosť tričky, núdzový kontakt a podobne) ako súčasť prihlasovania. Ak chcete otázky preskočiť, vyberte **Žiadne**.
   - **Zapnúť čakaciu listinu** -- Keď sa udalosť zaplní, ďalší záujemcovia sa môžu zapísať na čakaciu listinu namiesto toho, aby boli odmietnutí. Pozrite si [Platené registrácie](paid-registrations#waitlist).
4. Uložte udalosť.

Pri platených udalostiach môžete na tej istej stránke nastavení definovať spoplatnené **Typy účastníkov**, voliteľné **Výbery** (doplnkové služby) a **Zľavové kódy**, pričom platby sa prijímajú cez poskytovateľa darov vašej cirkvi. Úplný postup nájdete v [Platené registrácie](paid-registrations).

Keď je registrácia zapnutá, členovia uvidia tlačidlo **Registrovať sa na túto udalosť**, keď si udalosť zobrazia na [webe B1](../../b1-church/events/registering) alebo v [mobilnej aplikácii B1](../../b1-mobile/events/registering). Ak ste pripojili formulár, registrovaní uvidia počas registrácie krok **Otázky** a ich odpovede sa uložia spolu s ich registráciou.

:::info
Otázky k registrácii fungujú len s formulármi, ktoré **nie sú** označené ako Obmedzené. Obmedzený formulár sa pri registrácii automaticky preskočí a nezobrazí sa, preto pri pripájaní otázok k udalosti používajte neobmedzený formulár.
:::

### Správa registrácií

Ak chcete zobraziť a spravovať registrácie na vaše udalosti:

1. V ponuke Jump vyberte **Kalendáre > Registrácie**.
2. Zobrazí sa tabuľka všetkých udalostí so zapnutou registráciou, ktorá obsahuje názov udalosti, dátum, aktuálny počet registrácií v porovnaní s kapacitou a značky.
3. Kliknutím na udalosť zobrazíte úplný zoznam registrácií vrátane mien, počtu členov, typov účastníkov, stavu platby a dátumu registrácie.
4. Na stránke s detailom môžete:
   - **Pridať účastníka** -- Ručne zaregistrovať osobu, ktorá sa prihlásila offline alebo telefonicky.
   - **Zrušiť** jednotlivé registrácie
   - **Vymazať** registrácie natrvalo
   - **Presunúť** registrácie z čakacej listiny, keď sa uvoľní miesto
   - **Exportovať CSV** -- Stiahnuť všetky registrácie vrátane typov účastníkov, výberov, súm platieb a odpovedí na otázky

Ak má udalosť pripojené otázky k registrácii, stránka s detailom tiež zobrazuje filter **Len nezodpovedané otázky**, ktorým rýchlo nájdete registrovaných, ktorí ešte neodoslali odpovede, a tlačidlo **Zobraziť odpovede** pri každej zodpovedanej registrácii, aby ste videli ich odpovede. Platené udalosti pridávajú stĺpec **Typ**, stĺpec **Zaplatené / Spolu**, počty podľa typu a dialógové okno s podrobnosťami o platbách -- pozrite si [Platené registrácie](paid-registrations#the-registration-roster).

:::tip
Pomocou ukazovateľa kapacity sledujte, ako rýchlo sa udalosti zapĺňajú. Ukazovateľ sa zmení na červený, keď je udalosť na kapacite alebo ju prekračuje.
:::

## Ďalšie kroky

- [Kurátorský kalendár](curated-calendar) -- Vytvorte kalendár, ktorý zbiera udalosti z viacerých skupín
- [Platené registrácie](paid-registrations) -- Typy účastníkov, doplnkové výbery, zľavové kódy, platby a čakacie listiny
- [Sprievodca registráciou na udalosti](../guides/event-registration) -- Postup krok za krokom pri nastavovaní registrácie na udalosti
- [Prehľad kalendárov](./) -- Návrat na prehľad kalendárov
