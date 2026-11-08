---
title: "Vytváranie kalendárov"
description: "Vytvorte kalendár v B1 Admin, prepojte skupiny alebo importujte súbory .ics a spravujte jeho udalosti, registrácie a poznámky na jednom mieste."
---

# Vytváranie kalendárov

<div class="article-intro">

Vytvorenie kalendára v B1 Admin vám umožní zostaviť prehľadné zobrazenie udalostí prepojením jednej alebo viacerých skupín. Udalosti spravujú vedúci skupín v rámci svojich skupín a váš kalendár zobrazuje tieto udalosti na jednom mieste. Administrátori s právom úprav môžu pridávať alebo upravovať udalosti pre ľubovoľnú skupinu. Vedúci skupín, ktorí nie sú administrátori, môžu spravovať udalosti iba pre skupiny, ktoré vedú.

</div>

## Video na zaučenie

<YouTube id="Ko3kgsCSLFs" title="Vytváranie kalendárov, udalostí a rezervácií miestností v B1" next="Registrácia na udalosti a platené udalosti v B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte [skupiny](../groups/creating-groups.md), ktorých udalosti chcete zahrnúť do kalendára
- Potrebujete administrátorský prístup do sekcie Kalendáre v B1 Admin

</div>

## Vytvorenie nového kalendára

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Kalendáre** a kliknite na **Kalendáre**.
2. Kliknite na **Pridať kalendár** v hornej časti stránky. Formulár pre nový kalendár sa otvorí pod zoznamom kalendárov.
3. Zadajte **názov** kalendára (napríklad „Udalosti mládeže“ alebo „Hlavný cirkevný kalendár“).
4. Pridajte voliteľný **popis**, ktorý pomôže vášmu tímu pochopiť, na čo tento kalendár slúži.
5. Kliknite na **Vytvoriť**, čím uložíte nový kalendár.

## Detail kalendára

Po vytvorení kalendára kliknite na **Spravovať udalosti** v jeho riadku, čím otvoríte stránku s detailmi. Táto stránka má dve hlavné oblasti:

- **Ľavý stĺpec** -- Názov kalendára spolu s akciami (**Nová udalosť**, **Upraviť**, **Importovať .ics** a **Tlačiť**), za ktorými nasleduje zoznam **Skupiny v kalendári**, ktorý zobrazuje, ktoré skupiny sú v tomto kalendári zahrnuté. Kliknutím na **Odstrániť** vedľa skupiny ju z kalendára odstránite.
- **Hlavná oblasť** -- Zobrazenie **Udalosti kalendára** s udalosťami načítanými z prepojených skupín, nad ktorým sú tlačidlá **Odoberať** a **Pridať skupinu**.

## Prepojenie skupín

Skupiny, ktoré majú udalosti v kalendári, sa automaticky zobrazia v zozname **Skupiny v kalendári** na ľavej strane detailu.

1. Kliknite na **Pridať skupinu** nad kalendárom, čím skupinu priradíte ku kalendáru.
2. Vyberte skupinu z rozbaľovacieho zoznamu. Zoznam obsahuje všetky skupiny vašej cirkvi, nie iba tie, do ktorých patríte.
3. Vyberte, či chcete zahrnúť **všetky udalosti** danej skupiny, alebo iba **konkrétne udalosti**.
4. Kliknite na **Uložiť**.

Každá udalosť sa v kalendári zobrazí iba raz. Ak pridáte celú skupinu, všetky jej udalosti, ktoré ste už predtým pridali jednotlivo, sa zahrnú do záznamu skupiny, a výber konkrétnych udalostí zo skupiny, ktorá je už v kalendári, nepridá nič nové. V zozname **Skupiny v kalendári** sa uvádzajú iba skupiny pridané ako celok.

### Import súboru .ics

Kliknutím na **Importovať .ics** importujete udalosti z iného kalendára. Vyberte **Skupinu**, do ktorej majú udalosti patriť, potom kliknite na **Vybrať súbor .ics** alebo vložte obsah súboru a kliknite na **Importovať**. Udalosti sa vytvoria v tejto skupine a skupina sa pridá do kalendára, z ktorého importujete, takže sa udalosti hneď zobrazia aj tam.

### Odstránenie udalosti z kalendára

Kliknite na udalosť v kalendári a potom na **Odstrániť z kalendára**. Týmto sa udalosť odstráni iba z tohto kalendára -- samotná udalosť zostane vo svojej skupine. Ak sa udalosť nachádza v kalendári preto, že bola pridaná celá jej skupina, odstránením sa z tohto kalendára odstránia všetky udalosti tejto skupiny (udalosti však zostanú v skupine). Ak chcete udalosť natrvalo vymazať, odstráňte ju z [kalendára skupiny](../groups/group-calendar.md).

:::tip
Prepojenie skupín s vaším kalendárom je účinný spôsob, ako automaticky zhromažďovať udalosti. Keď vedúci skupiny pridá udalosť do svojej [skupiny](../groups/creating-groups.md), môže sa bez ďalšej práce z vašej strany zobraziť v celocirkevnom kalendári.
:::

:::info
Ak chcete vytvoriť jeden kalendár, ktorý načítava udalosti z mnohých skupín vo vašej cirkvi, pozrite si [Kurátorský kalendár](./curated-calendar.md), kde nájdete jednoduchý postup.
:::

## Pridávanie a úprava udalostí {#adding-and-editing-events}

Kliknite na **Nová udalosť** na stránke detailu kalendára, čím pridáte udalosť, alebo kliknite na udalosť v kalendári a potom na **Upraviť**, čím ju zmeníte. Formulár **Nová udalosť** / **Upraviť udalosť** obsahuje tieto polia:

- **Skupina** -- Skupina, ktorej udalosť patrí. Ak vaša cirkev používa šablóny udalostí, môžete tiež vybrať **Šablónu**, ktorá vyplní formulár.
- **Názov**
- **Fotografia udalosti** -- Kliknite na **Pridať fotografiu** (alebo na prázdne políčko pre fotografiu), čím vyberiete alebo nahráte obrázok, orezaný na širokotvarý pomer 16:9. Kliknutím na **Zmeniť fotografiu** ju nahradíte. Fotografia sa zobrazuje v hornej časti stránky udalosti na vašej webovej stránke a ako jej dlaždica, keď prvok Kalendár zobrazuje **Nadchádzajúce udalosti** (pozri [Zobrazenie udalostí na vašej webovej stránke](#showing-events-on-your-website)).
- **Popis** -- Zobrazuje sa na stránke udalosti na vašej webovej stránke. Podporovaný je tučný text, zoznamy a odkazy.
- **Začiatok** a **Koniec**, **Opakuje sa** a **Viditeľnosť** (**Verejné** alebo **Súkromné**).
- **Štítky** -- Označenia oddelené čiarkami, napríklad `youth, students`. Prvok Kalendár na vašej webovej stránke možno nastaviť tak, aby zobrazoval iba udalosti s určitým štítkom. Ide o rovnaké pole **Štítky**, aké je zobrazené v nastaveniach registrácie udalosti.
- **Kto môže zobraziť poznámky** a **Kto môže pridávať poznámky** -- Kto môže čítať a pridávať poznámky k udalosti (pozri [Poznámky k udalosti](#event-notes)). Vyberte **Iba zamestnanci** (predvolená možnosť), **Vedúci skupiny** (vedúci skupiny udalosti) alebo **Členovia skupiny** (všetci v skupine udalosti vrátane jej vedúcich).
- **Miestnosti** a **Zdroje** -- Rezervujte priestor a vybavenie pre udalosť. Pozri [Miestnosti, zdroje a plánovanie](./rooms-resources.md).

Kliknite na **Uložiť**. Ak sa udalosť opakuje, B1 vás požiada o potvrdenie, pretože uloženie aktualizuje každý výskyt v sérii.

### Poznámky k udalosti {#event-notes}

Každá udalosť má vlastné vlákno poznámok na plánovanie a nadväzujúce kroky. Kliknite na udalosť na stránke detailu kalendára; dialóg zobrazí podrobnosti o udalosti, jej pripomienky a pod nimi sekciu **Poznámky**. Napíšte poznámku a odošlite ju, aby sa pridala do vlákna.

Zamestnanci s oprávnením upravovať obsah alebo spravovať kalendáre môžu vždy čítať a pridávať poznámky k udalostiam. Nastavenia **Kto môže zobraziť poznámky** a **Kto môže pridávať poznámky** určujú, či ich môžu čítať a pridávať aj vedúci alebo členovia skupiny udalosti.

### Zobrazenie udalostí na vašej webovej stránke {#showing-events-on-your-website}

Ak chcete na svoju webovú stránku umiestniť kalendár, pridajte na stránku prvok **Kalendár** a vyberte tento kalendár. Prvok môže zobrazovať mesačný kalendár alebo mriežku dlaždíc s nadchádzajúcimi udalosťami a možno ho obmedziť na udalosti s jedným štítkom. Návštevníci, ktorí kliknú na udalosť, otvoria jej vlastnú stránku udalosti. Pozri [Použitie prvku Kalendár](../website/page-editor.md#using-the-calendar-element).

## Povolenie registrácie na udalosti {#enabling-event-registration}

Registráciu môžete povoliť pre ľubovoľnú udalosť v kalendári, aby sa členovia mohli prihlásiť cez webovú stránku B1 alebo mobilnú aplikáciu.

1. Kliknite na existujúcu udalosť alebo vytvorte novú.
2. V editore udalostí prepnite **Registrácia** na zapnutú.
3. Nakonfigurujte nastavenia registrácie:
   - **Kapacita** (voliteľné) -- Nastavte maximálny počet registrácií. Ak necháte prázdne, kapacita je neobmedzená.
   - **Registrácia sa otvára** -- Dátum a čas, odkedy je registrácia dostupná.
   - **Registrácia sa uzatvára** -- Dátum a čas, kedy sa registrácia uzatvára.
   - **Štítky** -- Označenia oddelené čiarkami (napr. "youth, retreat, vbs"), ktoré pomáhajú kategorizovať udalosti, na ktoré sa možno registrovať.
   - **Otázky k registrácii** -- Voliteľne priložte [formulár](../forms/creating-forms.md), aby registrujúci odpovedali na dodatočné otázky (diétne obmedzenia, veľkosť trička, núdzový kontakt atď.) ako súčasť prihlásenia. Vyberte **Žiadne**, ak chcete otázky preskočiť.
   - **Povoliť čakaciu listinu** -- Keď sa udalosť zaplní, umožnite ďalším registrujúcim pridať sa na čakaciu listinu namiesto toho, aby boli odmietnutí. Pozri [Platené registrácie](./paid-registrations.md#waitlist).
4. Uložte udalosť.

Pri platených udalostiach môžete na tej istej stránke nastavení definovať spoplatnené **Typy účastníkov**, voliteľné **Výbery** (doplnkové služby) a **Zľavové kódy**, pričom platby sa vyberajú cez poskytovateľa darov vašej cirkvi. Kompletný postup nájdete v časti [Platené registrácie](./paid-registrations.md).

Keď je registrácia povolená, členovia uvidia tlačidlo **Zaregistrovať sa na túto udalosť**, keď si udalosť zobrazia na [B1.church alebo v aplikácii B1](../../b1-church/events/registering.md). Ak ste priložili formulár, registrujúci sa počas registrácie zobrazí krok **Otázky** a ich odpovede sa uložia spolu s ich registráciou.

:::info
Otázky k registrácii fungujú iba s formulármi, ktoré **nie sú** označené ako Obmedzený. Obmedzený formulár sa počas registrácie automaticky preskočí a nezobrazí sa, preto pri priložení otázok k udalosti používajte neobmedzený formulár.
:::

### Správa registrácií

Ak chcete zobraziť a spravovať registrácie na svoje udalosti:

1. V ponuke Jump vyberte **Kalendáre > Registrácie**.
2. Zobrazí sa tabuľka všetkých udalostí s povolenou registráciou, ktorá obsahuje názov udalosti, dátum, aktuálny počet registrácií v porovnaní s kapacitou a štítky.
3. Kliknutím na udalosť zobrazíte úplný zoznam registrácií vrátane mien, počtu členov, typov účastníkov, stavu platby a dátumu registrácie.
4. Na stránke detailu môžete:
   - **Pridať účastníka** -- Ručne zaregistrovať niekoho, kto sa prihlásil offline alebo telefonicky.
   - **Zrušiť** jednotlivé registrácie
   - **Odstrániť** registrácie natrvalo
   - **Presunúť** registrácie z čakacej listiny, keď sa uvoľní miesto
   - **Exportovať CSV** -- Stiahnuť všetky registrácie vrátane typov účastníkov, výberov, súm platieb a odpovedí na otázky

Ak sú k udalosti priložené otázky k registrácii, stránka detailu zobrazuje aj filter **Iba nezodpovedané otázky**, ktorý rýchlo nájde registrujúcich, ktorí ešte neodoslali odpovede, a tlačidlo **Zobraziť odpovede** pri každej zodpovedanej registrácii, aby ste videli ich odpovede. Platené udalosti pridávajú stĺpec **Typ**, stĺpec **Zaplatené / Celkom**, počty podľa typu a dialóg s podrobnosťami o platbách -- pozri [Platené registrácie](./paid-registrations.md#the-registration-roster).

:::tip
Pomocou ukazovateľa kapacity sledujte, ako rýchlo sa udalosti zapĺňajú. Ukazovateľ sa zmení na červenú, keď udalosť dosiahne alebo prekročí kapacitu.
:::

## Ďalšie kroky

- [Kurátorský kalendár](./curated-calendar.md) -- Vytvorte kalendár, ktorý čerpá z viacerých skupín
- [Platené registrácie](./paid-registrations.md) -- Typy účastníkov, doplnkové výbery, zľavové kódy, platby a čakacie listiny
- [Sprievodca registráciou na udalosti](../guides/event-registration.md) -- Postup krok za krokom pri nastavení registrácie na udalosti
- [Prehľad kalendárov](./index.md) -- Návrat na prehľad kalendárov
