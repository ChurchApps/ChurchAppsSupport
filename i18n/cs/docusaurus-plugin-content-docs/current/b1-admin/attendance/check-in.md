---
title: "Příchod"
---

# Příchod

<div class="article-intro">

B1 Admin podporuje samoobslužný příchod na bohoslužby pomocí doprovodné aplikace **B1 Checkin**. Členové se mohou při příchodu sami přihlásit i se svými rodinami na kioscích nebo na vyhrazených zařízeních. Tím je proces rychlejší a dobrovolníci mají méně práce. Každý příchod se automaticky zaznamená jako docházka.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vaše sbory, časy bohoslužeb a skupiny musí být nastaveny v [nastavení docházky](setup.md).
- Potřebujete [lidi ve své databázi](../people/adding-people.md) s nastavenými [domácnostmi](../people/adding-people.md#managing-households), aby se rodiny mohly přihlašovat společně.
- Budete potřebovat tablet a volitelně štítkovou tiskárnu Brother (viz [doporučený hardware](#recommended-hardware) níže).

</div>

## Jak to funguje

Aplikace B1 Checkin se připojuje k vašemu nastavení docházky v B1 Admin. Když se člen přihlásí, jeho docházka se automaticky zaznamená ke správnému sboru, času bohoslužby a skupině. U nikoho, kdo používá systém příchodu, nemusíte docházku zadávat ručně.

## Nastavení příchodu

1. **Nejprve nastavte strukturu docházky.** V B1 Admin přejděte na **People > Attendance** a klikněte na **Setup**, abyste měli nastavené sbory, časy bohoslužeb a skupiny. Aplikace příchodu na této konfiguraci závisí. Volitelně můžete každému času bohoslužby přiřadit [rozvrh příchodu](setup.md#setting-a-check-in-schedule), aby se příchod každý týden automaticky otevíral a zavíral. Rozvrhy používají časové pásmo sboru, ve kterém se bohoslužba koná, nebo časové pásmo vaší církve, pokud sbor žádné nemá nastavené. Kiosek uvádí časy bohoslužeb, jejichž okno je uzavřeno, jako **Closed**, a rodinám ukazuje, kdy se příchod otevře. Podrobnosti najdete v článku [Nastavení docházky](setup.md).
2. **Nainstalujte aplikaci B1 Checkin** na zařízeních, která plánujete používat. Aplikace je dostupná na těchto platformách:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/tablety Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **tablety Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Přihlaste se do aplikace B1 Checkin** pomocí účtu, který má oprávnění pro docházku **Checkin** (nebo **Edit Attendance**). Viz [Účty kiosků pro příchod](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Vyberte sbor a čas bohoslužby** pro aktuální shromáždění.
5. Členové nyní mohou na zařízení vyhledat své jméno a přihlásit se.

:::tip
Zařízení pro příchod umístěte na viditelná a snadno dostupná místa, například ke vchodům do foyer nebo k uvítacímu stolku. Krátké oznámení během bohoslužby pomůže členům vědět, že tato možnost existuje.
:::

:::tip
Pokud má vaše církev více sborů, musíte nastavení zopakovat pro každý sbor v [nastavení docházky](setup.md). Každé zařízení pro příchod lze nastavit pro jiný sbor.
:::

## Doporučený hardware

**Tablety** – s aplikací dobře fungují kterékoli z těchto:

- **Kompaktní:** Samsung Galaxy Tab A7 Lite 8.7"
- **Velká obrazovka:** Samsung Galaxy Tab A8 10.5"
- **Úsporná varianta:** Amazon Fire HD 10

**Tiskárny** – příchod funguje s tiskárnami štítků Brother pro tisk jmenovek:

- **Nejlepší:** Brother QL-1110NWB (podporuje více tabletů přes Bluetooth a WiFi)
- **Dobrá volba:** Brother QL-810W (podporuje více tabletů přes WiFi)
- **Úsporná varianta:** Brother QL-1100 (pouze WiFi)

**Štítky:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Aplikace B1 Checkin je kompatibilní pouze s tiskárnami štítků Brother. Tiskárny jiných značek pro tisk jmenovek nebudou fungovat.
:::

:::info
Podle návodu k tiskárně ji připojte ke stejné síti WiFi jako tablet. Ovladače a návody k nastavení tiskáren Brother najdete na [webu podpory Brother](https://support.brother.com).
:::

## Přizpůsobení vzhledu kiosku

Vzhled aplikace B1 Checkin můžete přizpůsobit tak, aby odpovídal vaší značce církve. V B1 Admin přejděte na **Mobile > B1 CheckIn** a pomocí karty **Kiosk Theme** nastavte:

### Barvy

Upravte osm barevných nastavení tak, aby odpovídala vaší značce církve:

- **Primary** a **Primary Contrast** – Hlavní barva značky a barva textu na ní.
- **Secondary** a **Secondary Contrast** – Doplňková barva a barva textu na ní.
- **Header Background** a **Subheader Background** – Barvy oblastí záhlaví kiosku.
- **Button Background** a **Button Text** – Barvy interaktivních tlačítek.

### Obrázek na pozadí

Nahrajte volitelný obrázek na pozadí pro uvítací obrazovku kiosku a obrazovky vyhledávání. Doporučená velikost je 1920x1080 pixelů.

### Úvodní obrazovka / spořič

Nastavte spořič, který se spustí po určité době nečinnosti:

1. Přepněte úvodní obrazovku na **zapnuto** nebo **vypnuto**.
2. Nastavte **timeout** (kolik sekund nečinnosti předchází spuštění spořiče, minimálně 10 sekund).
3. Přidejte jeden nebo více **snímků** – každý snímek má obrázek a dobu zobrazení (minimálně 3 sekundy).

:::tip
Úvodní obrazovku použijte k zobrazení oznámení, nadcházejících akcí nebo uvítacích zpráv, když se kiosek zrovna nepoužívá.
:::

## Registrace hostů pomocí QR kódu

Kiosek pro příchod může zobrazit QR kód, který návštěvníci naskenují a sami se na svém telefonu zaregistrují i se svou rodinou. Tím se urychlí příchod nových hostů.

Když host naskenuje QR kód, otevře se mu [stránka registrace hosta](../../b1-church/checkin/guest-registration), kde zadá jména své rodiny a další údaje, na které se rozhodnete zeptat. Dobrovolník je pak může na kiosku vyhledat a přihlásit.

### Zapnutí registrace hostů pomocí QR kódu

Zapnutí zobrazení QR kódu:

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte **Mobile**.
2. Klikněte na **B1 CheckIn**.
3. Přepněte **QR Guest Registration** na zapnuto a klikněte na **Save**.

:::note
Toto nastavení najdete v **Mobile > B1 CheckIn** (na stejné stránce jako karta **Kiosk Theme**), nikoli v části Attendance. Akce **Kiosk** na stránce docházky obsahuje odkaz na tuto stránku.
:::

Jakmile je přepínač zapnutý, se zbylými možnostmi níže se objeví v kartě **QR Guest Registration**. Po změně kterékoli z nich klikněte na kartě na **Save**.

### Výběr polí pro registraci

Seznam **Sign-up fields** určuje, na co se registrační formulář ptá. Pole **First Name** a **Last Name** jsou na formuláři vždy a u každého člena rodiny jsou vždy povinná. U každého dalšího pole zapněte **Include**, aby se přidalo do formuláře, a poté zapněte **Required**, pokud musí host pole vyplnit. **Required** lze zapnout pouze u zahrnutého pole a vypnutí **Include** jej vymaže.

| Pole | Požadováno | Výchozí zahrnutí |
|------|------------|------------------|
| **Email** | Pouze hlavní kontaktní osoba | Ano (volitelné) |
| **Phone** | Pouze hlavní kontaktní osoba | Ano (volitelné) |
| **Home address** | Jednou za rodinu – ulice, řádek adresy 2, město, stát a PSČ. Je-li povinné, musí být vyplněno vše kromě řádku adresy 2. Adresa se uloží ke každému členu rodiny. | Ne |
| **Birth date** | Každý člen rodiny | Ne |
| **Gender** | Každý člen rodiny | Ne |
| **Marital status** | Pouze hlavní kontaktní osoba | Ne |
| **Grade** | Každý člen rodiny (od PreK po 12. ročník, nebo Graduated) | Ne |
| **Comments** | Jednou, do pole pod členy rodiny (až 1 000 znaků) | Ne |

Pole, která vypnete, se nikdy neuloží, ani když je někdo do registrace odešle jiným způsobem. Komentáře se uloží jako poznámka k záznamu hlavní kontaktní osoby (zapsaná jako „Guest sign-up“), takže je můžete přečíst v sekci **Notes** jejího profilu.

### Přidání hostů do skupiny

Pomocí **Add new guests to group** automaticky přidáte všechny, kdo se registrují, do jedné z vašich skupin – například do skupiny „Newcomers“ nebo do skupiny pro dnešní akci. Volba **None** (výchozí) tento krok přeskočí. Hosté skupinu nikdy nevidí ani si ji nevybírají; nastavuje se pouze zde. Změňte ji před každou akcí, abyste mohli hosty dané akce sledovat společně.

### Zaznamenávání docházky

Když je vybrána skupina, objeví se přepínač **Also record attendance**. Zapněte jej, aby se hosté označili jako přítomní ihned po registraci a nemuseli se přihlašovat zvlášť.

Docházka se zaznamená jen tehdy, pokud se registrace uskuteční během některé z **naplánovaných** bohoslužeb vybrané skupiny:

- Skupina musí být propojena s jedním nebo více časy bohoslužeb a tyto časy musí mít [rozvrh příchodu](setup.md#setting-a-check-in-schedule) (**Day** a **Start Time**).
- „Během“ znamená uvnitř okna příchodu dané bohoslužby – od počtu minut **Open check-in** před začátkem do počtu minut **Close check-in** po konci (nebo po začátku, pokud není nastaven čas konce; bez času konce i bez minut zavření do konce daného dne), a to ve stejném časovém pásmu, jaké používá rozvrh příchodu.
- Každý člen rodiny se označí jako přítomný ve skupině u každé její bohoslužby, která je v daný okamžik otevřená, a to k dnešnímu datu.
- Registrace v jiný čas nebo pro skupinu, jejíž bohoslužby nemají rozvrh, se do skupiny přidají, ale nezapočítají se jako účast.

### Hlavička fotografie

V části **Header photo** klikněte na **Change photo**, vyberte nebo nahrajte obrázek (oříznutý na tvar 16:9), který se zobrazí nahoře na registrační stránce místo výchozí ikony. Kliknutím na **Remove** se vrátíte k ikoně.

### Sdílení odkazu na registraci

Jakmile je registrace hostů pomocí QR kódu zapnutá, na konci karty se objeví sekce **Share registration QR code**. Kromě QR kódu na kiosku vám poskytne dva způsoby, jak dostat hosty na registrační formulář:

- **Copy link** – zkopíruje URL registrace, abyste ji mohli vložit na webové stránky církve, do e-mailů nebo kamkoli online.
- **Download PNG** – stáhne QR kód jako obrázek, který můžete vytisknout na letáky, do věstníků nebo na cedule.

:::tip
Přidejte odkaz na registraci na stránku „Plan Your Visit“ nebo „I'm New“ na webu vaší církve, aby se hosté mohli zaregistrovat ještě před příchodem.
:::

### Co se stane po registraci hosta

B1 nejprve hledá lidi, kteří už jsou v **People**. Člen rodiny se spáruje s existující osobou, pokud existuje přesně jedna osoba se stejným křestním jménem a stejným e-mailem nebo telefonním číslem. Dítě zadané bez e-mailu nebo telefonu se páruje podle křestního jména v rámci spárované domácnosti. Spárované osoby se používají beze změny – registrace nikdy nemění jejich údaje ani stav členství – a každý nový člověk se připojí ke spárované domácnosti.

Pokud se nikdo nespáruje, registrace vytvoří novou domácnost pojmenovanou podle příjmení hlavní kontaktní osoby, se záznamem osoby pro každého člena rodiny. Všichni noví se přidají do **People** se stavem členství **Visitor** a hlavní kontaktní osoba bude vedoucí domácnosti.

Spárovaní i noví lidé se přidají do vámi zvolené skupiny (pokud v ní ještě nejsou) a jejich docházka se zaznamená, je-li to zapnuto. Komentáře se uloží jako poznámka k hlavní kontaktní osobě.

Chcete-li sledovat hosty automaticky, přidejte [spouštěč pracovního postupu](../serving/workflows.md#triggers), například **Person · Created** s podmínkou *Membership Status is Visitor*, nebo **Group · Member Joined** pro skupinu, kterou jste zvolili výše.

## Co se zaznamenává

Každý příchod vytvoří záznam docházky v B1 Admin. Tyto záznamy si můžete prohlédnout na stránce [Attendance](tracking-attendance.md) a v [sezeních](../groups/group-members.md) každé skupiny, stejně jako docházku zadanou ručně. Data se zobrazují stejně – obě metody napájejí stejné přehledy.
