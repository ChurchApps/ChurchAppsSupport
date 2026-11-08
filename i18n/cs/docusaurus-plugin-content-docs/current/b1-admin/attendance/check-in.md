---
title: "Nastavení samoobslužného check-inu s aplikacemi B1 Checkin a B1 Admin"
sidebar_label: "Check-In"
description: "Nastavení samoobslužného check-inu na bohoslužby v aplikaci B1 Checkin v B1 Admin: zařízení, účty kiosků, plány, vzhled a registrace hostů pomocí QR kódu."
---

# Check-In

<div class="article-intro">

B1 Admin podporuje samoobslužný check-in na bohoslužbách pomocí doplňkové aplikace **B1 Checkin**. Členové se mohou při příchodu odbavit sami i se svými rodinami na kioscích nebo na vyhrazených zařízeních. Tím se proces zrychlí a sníží se zátěž dobrovolníků. Každý check-in se automaticky zaznamená jako docházka.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vaše sbory, časy bohoslužeb a skupiny musí být nastaveny v [Nastavení docházky](setup.md).
- Potřebujete [osoby ve své databázi](../people/adding-people.md) s nastavenými [domácnostmi](../people/adding-people.md#managing-households), aby se rodiny mohly odbavit společně.
- Budete potřebovat tablet a volitelně tiskárnu štítků Brother (viz [doporučený hardware](#recommended-hardware) níže).

</div>

## Jak to funguje

Aplikace B1 Checkin se připojuje k vašemu nastavení docházky v B1 Admin. Když se člen odbaví, jeho docházka se automaticky zapíše ke správnému sboru, času bohoslužby a skupině. U osob, které používají systém check-inu, nemusíte docházku zadávat ručně.

## Nastavení check-inu

1. **Nejprve nastavte strukturu docházky.** V B1 Admin přejděte na **Osoby > Docházka** a klikněte na **Nastavení**, abyste měli připravené sbory, časy bohoslužeb a skupiny. Aplikace pro check-in na této konfiguraci závisí. Každému času bohoslužby můžete volitelně přiřadit [plán check-inu](setup.md#setting-a-check-in-schedule), aby se check-in každý týden otevíral a zavíral automaticky. Plány používají časové pásmo sboru, ke kterému bohoslužba patří, nebo časové pásmo vaší církve, pokud sbor žádné nemá. Kiosk označí časy bohoslužeb, jejichž okno je uzavřeno, jako **Uzavřeno**, a rodinám sdělí, kdy se check-in otevře. Podrobnosti najdete v [Nastavení docházky](setup.md).
2. **Nainstalujte aplikaci B1 Checkin** na zařízení, která plánujete používat. Aplikace je dostupná na těchto platformách:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/tablety Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablety Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Přihlaste se do aplikace B1 Checkin** pomocí účtu, který má oprávnění docházky **Checkin** (nebo **Úprava docházky**). Viz [Účty kiosků pro check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Vyberte sbor a čas bohoslužby** pro aktuální shromáždění.
5. Členové nyní mohou na zařízení vyhledat své jméno a odbavit se.

:::tip
Zařízení pro check-in umístěte na viditelná a snadno přístupná místa, například ke vchodu do foyer nebo k přepážce pro návštěvníky. Krátké oznámení během bohoslužeb pomůže členům vědět, že tato možnost existuje.
:::

:::tip
Pokud má vaše církev více sborů, musíte nastavení zopakovat pro každý sbor v [Nastavení docházky](setup.md). Každé zařízení pro check-in lze nastavit pro jiný sbor.
:::

## Doporučený hardware

**Tablety** – s aplikací dobře fungují všechny tyto:

- **Kompaktní:** Samsung Galaxy Tab A7 Lite 8.7"
- **Velký displej:** Samsung Galaxy Tab A8 10.5"
- **Rozpočtová volba:** Amazon Fire HD 10

**Tiskárny** – check-in funguje s tiskárnami štítků Brother pro tisk jmenovek:

- **Nejlepší:** Brother QL-1110NWB (podporuje více tabletů přes Bluetooth a WiFi)
- **Dobrá volba:** Brother QL-810W (podporuje více tabletů přes WiFi)
- **Rozpočtová volba:** Brother QL-1100 (pouze WiFi)

**Štítky:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Aplikace B1 Checkin je kompatibilní pouze s tiskárnami štítků Brother. Tiskárny jiných značek nebudou pro tisk jmenovek fungovat.
:::

:::info
Podle návodu k tiskárně ji připojte ke stejné síti WiFi jako váš tablet. Ovladače a návody k nastavení tiskáren Brother najdete na [webu podpory Brother](https://support.brother.com).
:::

## Přizpůsobení vzhledu kiosku

Vzhled aplikace B1 Checkin můžete přizpůsobit tak, aby odpovídal vizuální identitě vaší církve. V B1 Admin přejděte na **Mobilní > B1 CheckIn** a v kartě **Motiv kiosku** nastavte:

### Barvy

Přizpůsobte osm barevných nastavení tak, aby odpovídala vizuální identitě vaší církve:

- **Primární** a **Kontrast primární** – Hlavní barva značky a barva textu na ní.
- **Sekundární** a **Kontrast sekundární** – Doplňková barva a barva textu na ní.
- **Pozadí záhlaví** a **Pozadí podzáhlaví** – Barvy záhlaví kiosku.
- **Pozadí tlačítka** a **Text tlačítka** – Barvy interaktivních tlačítek.

### Obrázek na pozadí

Nahrajte volitelný obrázek na pozadí pro uvítací obrazovku kiosku a obrazovky vyhledávání. Doporučená velikost je 1920 × 1080 pixelů.

### Nečinná obrazovka / spořič

Nastavte spořič, který se spustí po určité době nečinnosti:

1. Zapněte nebo vypněte nečinnou obrazovku.
2. Nastavte **časový limit** (kolik sekund nečinnosti předchází spuštění spořiče, minimum 10 sekund).
3. Přidejte jeden nebo více **snímků** – každý snímek má obrázek a dobu zobrazení (minimum 3 sekundy).

:::tip
Nečinnou obrazovku využijte k zobrazování oznámení, nadcházejících akcí nebo uvítacích zpráv, když kiosk zrovna nikdo nepoužívá.
:::

## Registrace hostů pomocí QR kódu

Kiosk pro check-in může zobrazit QR kód, který si návštěvníci naskenují, aby se zaregistrovali sami sebe i svou rodinu na vlastním telefonu. To urychlí check-in pro hosty, kteří přicházejí poprvé.

Když host naskenuje QR kód, otevře se mu [stránka registrace hosta](../../b1-church/checkin/guest-registration.md), kde zadá jména členů své rodiny a další údaje, o které se rozhodnete požádat. Dobrovolník je pak může na kiosku vyhledat a odbavit.

### Zapnutí registrace hostů pomocí QR kódu

Zobrazení QR kódu zapnete takto:

1. V B1 Admin otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte **Mobilní**.
2. Klikněte na **B1 CheckIn**.
3. Přepněte **Registrace hostů pomocí QR** na zapnuto a klikněte na **Uložit**.

:::note
Toto nastavení najdete v **Mobilní > B1 CheckIn** (na stejné stránce jako karta **Motiv kiosku**), nikoli v nastavení docházky. Akce **Kiosk** na stránce Docházka obsahuje odkaz na tuto stránku.
:::

Jakmile je přepínač zapnutý, zobrazí se v kartě **Registrace hostů pomocí QR** i ostatní níže popsané možnosti. Po změně kterékoli z nich klikněte na **Uložit** v této kartě.

### Výběr polí pro registraci

Seznam **Pole registrace** určuje, na co se registrační formulář ptá. **Jméno** a **Příjmení** jsou ve formuláři vždy a u každého člena rodiny jsou vždy povinné. U každého dalšího pole zapněte **Zahrnout**, aby se přidalo do formuláře, a poté zapněte **Povinné**, pokud host musí pole vyplnit. Možnost **Povinné** lze zapnout jen u zahrnutého pole a vypnutí **Zahrnout** ji zruší.

| Pole | Vyžádáno | Výchozí zahrnutí |
|------|----------|------------------|
| **Oslovení** | U každého člena rodiny jako rozbalovací seznam před jménem (Pan, Paní, Slečna, Dr., Prof., Farář, Pastor) | Ne |
| **E-mail** | Pouze u hlavního kontaktu | Ano (volitelné) |
| **Telefon** | U každého člena rodiny. Je-li povinné, musí ho vyplnit pouze hlavní kontakt. | Ano (volitelné) |
| **Role v domácnosti** | U každého člena rodiny kromě hlavního kontaktu – Manžel/Manželka, Dítě nebo Jiné. Hlavní kontakt je hlavou nové domácnosti. Kdo nemá roli, je uložen jako Jiné. | Ano (volitelné) |
| **Domácí adresa** | Jednou za rodinu – ulice, doplňující řádek adresy, město, stát a PSČ. Je-li povinné, musí být vyplněno vše kromě doplňujícího řádku adresy. Adresa se uloží u každého člena rodiny. | Ne |
| **Datum narození** | U každého člena rodiny | Ne |
| **Pohlaví** | U každého člena rodiny | Ne |
| **Rodinný stav** | Pouze u hlavního kontaktu | Ne |
| **Ročník** | U každého člena rodiny (od předškolní přípravy po 12. ročník, nebo Absolvent) | Ne |
| **Poznámky** | Jednou, v poli pod členy rodiny (až 1 000 znaků) | Ne |

Pole, která vypnete, se nikdy neukládají, ani když je někdo do registrace odešle jiným způsobem. Poznámky se uloží jako záznam u hlavního kontaktu (zapsaný jako „Guest sign-up“), takže je uvidíte v sekci **Poznámky** jeho profilu.

### Přidávání hostů do skupiny

Pomocí **Přidat nové hosty do skupiny** můžete automaticky zařadit každého, kdo se zaregistruje, do jedné ze svých skupin – například do skupiny „Noví“ nebo do skupiny pro dnešní akci. Výchozí volba **Žádná** tuto funkci přeskočí. Hosté skupinu nevidí ani si ji nemohou vybrat; nastavuje se pouze zde. Změňte ji před každou akcí, abyste mohli hosty dané akce kontaktovat společně.

### Zapisování docházky

Když je vybrána skupina, objeví se přepínač **Také zapsat docházku**. Zapněte jej, aby byli hosté označeni jako přítomní ihned po registraci, a nemuseli jste je odbavovat zvlášť.

Docházka se zapíše pouze tehdy, když se registrace uskuteční v jednom z **naplánovaných** časů bohoslužeb vybrané skupiny:

- Skupina musí být propojena s jedním nebo více časy bohoslužeb a tyto časy musí mít [plán check-inu](setup.md#setting-a-check-in-schedule) (**Den** a **Čas začátku**).
- „Během“ znamená uvnitř okna check-inu daného času bohoslužby – od počtu minut **Otevřít check-in** před začátkem až do počtu minut **Zavřít check-in** po konci (nebo po začátku, pokud není nastaven čas konce; pokud není nastaven ani čas konce, ani minuty zavření, pak až do konce daného dne), a to ve stejném časovém pásmu, jaké používá plán check-inu.
- Každý člen rodiny je v dané skupině označen jako přítomný pro každý ze svých časů bohoslužeb, který je v daném okamžiku otevřený, a to k dnešnímu datu.
- Registrace v jiný čas nebo pro skupinu, jejíž časy bohoslužeb nemají plán, se přidají do skupiny, ale nezapočítají se jako účast.

### Fotografie v záhlaví

V části **Fotografie v záhlaví** klikněte na **Změnit fotografii**, abyste vybrali nebo nahráli obrázek (oříznutý na poměr 16:9), který se zobrazí nahoře na registrační stránce místo výchozí ikony. Kliknutím na **Odebrat** se vrátíte k ikoně.

### Sdílení odkazu na registraci

Jakmile je registrace hostů pomocí QR kódu zapnutá, zobrazí se na spodku karty sekce **Sdílet QR kód registrace**. Nabízí dva způsoby, jak dostat hosty na registrační formulář kromě QR kódu na kiosku:

- **Kopírovat odkaz** – zkopíruje URL registrace, abyste ji mohli vložit na webové stránky církve, do e-mailů nebo kamkoli online.
- **Stáhnout PNG** – stáhne QR kód jako obrázek, který můžete vytisknout na letáky, do týdenníků nebo na značení.

:::tip
Přidejte odkaz na registraci na stránku „Naplánujte si návštěvu“ nebo „Jsem tu nový“ na webu vaší církve, aby se hosté mohli zaregistrovat ještě před příchodem.
:::

### Co se stane po registraci hosta

B1 nejprve hledá osoby, které už jsou v **Osobách**. Člen rodiny se spáruje s existující osobou, pokud existuje právě jedna osoba se stejným křestním jménem a stejným e-mailem nebo telefonem. Dítě zadané bez e-mailu nebo telefonu se páruje podle křestního jména v rámci domácnosti, která byla spárována. Spárované osoby se použijí tak, jak jsou – registrace nikdy nemění jejich údaje ani stav členství – a každý nový člověk se připojí ke spárované domácnosti.

Pokud se nikdo nespáruje, registrace vytvoří novou domácnost pojmenovanou podle příjmení hlavního kontaktu se záznamem osoby pro každého člena rodiny. Všichni noví se přidají do **Osob** se stavem členství **Návštěvník** a hlavním kontaktem jako hlavou domácnosti.

Spárované i nové osoby se přidají do vámi zvolené skupiny (pokud v ní ještě nejsou) a jejich docházka se zapíše, pokud je to zapnuto. Poznámky se uloží jako záznam u hlavního kontaktu.

Pro automatické navázání komunikace přidejte [spouštěč pracovního postupu](../serving/workflows.md#triggers), například **Osoba · Vytvořena** s podmínkou *Stav členství je Návštěvník*, nebo **Skupina · Člen se připojil** pro skupinu, kterou jste zvolili výše.

## Co se zaznamenává

Každý check-in vytvoří záznam docházky v B1 Admin. Tyto záznamy můžete zobrazit na stránce [Docházka](tracking-attendance.md) a v [sezeních každé skupiny](../groups/group-members.md) stejně jako docházku zadanou ručně. Data se zobrazují stejně – obě metody napájejí stejné přehledy.
