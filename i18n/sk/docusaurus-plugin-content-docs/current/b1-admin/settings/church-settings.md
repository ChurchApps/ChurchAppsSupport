---
title: "Nastavenia cirkvi"
description: "Nastavte názov, adresu, subdoménu, časové pásmo, formát regiónu, poskytovateľa SMS správ a úložisko súborov pre svoju cirkev na stránke Nastavenia cirkvi v B1 Admin."
---

# Nastavenia cirkvi

<div class="article-intro">

Stránka Nastavenia cirkvi slúži na konfiguráciu základných informácií o vašej cirkvi, kontaktných údajov a brandingu. Tieto údaje sa používajú vo všetkých nástrojoch ChurchApps, vrátane vašej webovej stránky B1.church a aplikácie B1 App.

</div>

## Video o školení

<YouTube id="634zSbzDkYA" title="Nastavenie informácií o cirkvi a brandingu v B1" next="Roly, oprávnenia a pozvanie tímu v B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete oprávnenie „Edit Church Settings“ (Upraviť nastavenia cirkvi). Ak nemáte prístup, pozrite si [Roly a oprávnenia](./roles-permissions.md).
- Pripravte si adresu svojej cirkvi, kontaktné informácie a logo

</div>

## Úprava informácií o cirkvi

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Settings** (Nastavenia) a kliknite na **Settings** (Nastavenia).
2. V sekcii **Church Information** (Informácie o cirkvi) v hornej časti stránky kliknite na **Edit** (Upraviť).
3. Aktualizujte ktorékoľvek z nasledujúcich polí:
   - **Church Name** (Názov cirkvi) -- názov, ktorý sa zobrazuje vo všetkých produktoch ChurchApps.
   - **Address** (Adresa) -- fyzická adresa vašej cirkvi.
   - **Contact Information** (Kontaktné informácie) -- telefónne číslo, e-mail a ďalšie kontaktné údaje.
   - **Time Zone** (Časové pásmo) -- časové pásmo vašej cirkvi. Pozrite si nižšie [Časové pásmo](#time-zone).
4. Kliknutím na **Save** (Uložiť) použijte zmeny.

## Nastavenie subdomény

Vaša cirkev dostane bezplatnú subdoménu **yourchurch.1.church**. Na tejto webovej adrese môžu členovia a návštevníci nájsť online prezentáciu vašej cirkvi.

1. Na stránke Settings (Nastavenia) kliknite na **Edit** (Upraviť) v sekcii **Church Information** (Informácie o cirkvi) a nájdite pole **Subdomain** (Subdoména).
2. Zadajte požadovanú subdoménu (napríklad „gracechurch“ pre gracechurch.1.church).
3. Uložte zmeny.

:::info
Vaša subdoména musí byť jedinečná medzi všetkými cirkvami ChurchApps. Ak je požadovaný názov obsadený, skúste pridať názov mesta alebo štátu (napríklad „gracechurch-dallas“).
:::

Ak chcete, aby návštevníci našli váš web na vlastnej doméne (napríklad **`www.gracechurch.org`**), pozrite si [Vlastná doména](./custom-domain.md).

## Nastavenie brandingu

Prispôsobte, ako sa vaša cirkev zobrazuje vo všetkých nástrojoch ChurchApps:

1. Nahrajte **logo cirkvi** kliknutím na oblasť loga a výberom obrázka.
2. Pridajte ďalšie **obrázky cirkvi**, ktoré sa používajú na vašej webovej stránke a v [mobilnej aplikácii](./mobile-app.md).

:::tip
Najlepšie výsledky dosiahnete s logom vo formáte PNG s priehľadným pozadím. Vďaka tomu bude vyzerať dobre na svetlom aj tmavom pozadí.
:::

## Prvý deň v týždni

Vyberte, ktorý deň má začínať váš kalendár. Rozbaľovacia ponuka **First Day of Week** (Prvý deň v týždni) v sekcii Church Info (Informácie o cirkvi) je predvolene nastavená na **Sunday** (nedeľu), ale môžete zvoliť ľubovoľný deň. Po zmene sa táto voľba uplatní v kalendárnych mriežkach v B1 Admin aj v portáli členov B1.church. Kalendáre skupín, kurátorské kalendáre a editor udalostí budú týždne zobrazovať od vami zvoleného dňa.

## Časové pásmo

Rozbaľovacia ponuka **Time Zone** (Časové pásmo) v sekcii **Church Information** (Informácie o cirkvi) nastavuje časové pásmo vašej cirkvi (napríklad *America/Chicago*). Ak chcete pole ponechať prázdne, vyberte **None** (Žiadne). Po uložení sa pásmo zobrazí v súhrne informácií o cirkvi.

B1 používa toto časové pásmo pre časy platné pre celú cirkev, napríklad pri pripomienkach udalostí a pri rozvrhoch na vašich televízoroch [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Rozvrhy odbavenia](../attendance/setup.md#setting-a-check-in-schedule) sa najprv merajú v časovom pásme [kampusu](./campuses.md), v ktorom sa bohoslužba koná. Časové pásmo cirkvi použije len vtedy, ak kampus žiadne nemá. Ak sú všetky vaše kampusy v jednom časovom pásme, nastavte ho pre cirkev aj pre každý kampus.

## Región (formát dátumu a telefónneho čísla)

Nastavenie **Region** určuje, ako sa dátumy a časy zapisujú v celom B1. Predvolene sa dátumy zobrazujú vo formáte Spojených štátov (napríklad „Sep 28, 2026“ a „9/28/2026“). Cirkvi mimo USA môžu prepnúť na vlastný formát. Ak si napríklad zvolíte English (United Kingdom), zobrazia sa dátumy ako „28 Sept 2026“ a „28/09/2026“.

1. Na stránke Settings (Nastavenia) kliknite v ľavom zozname na **Region** a potom v sekcii **Region** kliknite na **Edit** (Upraviť).
2. V rozbaľovacej ponuke **Region** vyberte svoj región. Každá možnosť zobrazuje ukážkový dátum, aby ste presne videli, ako budú dátumy vyzerať.
3. Kliknite na **Save** (Uložiť).

Sekcia Region potom zobrazí vybraný región, ukážku formátu v poli **Date format** (Formát dátumu) a formát v poli **Phone numbers** (Telefónne čísla).

### Formát telefónnych čísel

V rovnakej sekcii Region nájdete nastavenie **Phone numbers** (Telefónne čísla), ktoré určuje, ako sa telefónne čísla zadávajú v zázname osoby:

- **International (with country code)** (Medzinárodný, s predvoľbou krajiny) -- predvolená možnosť. Telefónne polia zobrazia výber vlajky krajiny a čísla ukladajú s predvoľbou krajiny (napríklad +1 918 555 1234).
- **Local (as typed)** (Miestny, tak ako sa zadá) -- telefónne polia sa zmenia na jednoduché textové polia a čísla sa uložia presne tak, ako ich zadáte, bez pridania predvoľby krajiny (napríklad 0701 234 5678). Zvoľte túto možnosť, ak vaša cirkev zapisuje čísla v miestnom formáte a nechce, aby B1 pridával predvoľbu krajiny.

Ak je vybraná možnosť **Local**, sekcia Region vedľa vášho regiónu zobrazí aj „Local phone numbers“ (Miestne telefónne čísla).

:::tip
Posielanie SMS správ funguje najlepšie, keď čísla obsahujú predvoľbu krajiny. Ak posielate SMS správy z B1, ponechajte formát **International** (Medzinárodný) alebo sa uistite, že čísla zadané v režime Local obsahujú predvoľbu krajiny.
:::

Váš región sa uplatňuje na dátumy a časy v B1 Admin, na vašej webovej stránke B1.church a v portáli členov, vrátane kázní, blogových príspevkov, kalendárov skupín a plánov služieb. Členovia tak vidia dátumy vo rovnakom formáte ako vaši zamestnanci.

## Posielanie SMS správ {#texting}

Pripojte poskytovateľa SMS služieb, aby ste z B1 Admin mohli posielať SMS správy jednotlivcovi alebo celej skupine. Správy sa odosielajú cez váš vlastný účet u poskytovateľa, takže sa na ne vzťahujú jeho ceny a limity.

1. Na stránke Settings (Nastavenia) kliknite v ľavom zozname na **Texting** (Posielanie SMS) a potom v sekcii **Texting** kliknite na **Edit** (Upraviť).
2. Vyberte **Provider** (Poskytovateľa):
   - **Clearstream** -- zadajte **API Key** (Kľúč API). Kľúč vytvoríte v nastaveniach účtu Clearstream v časti API Keys.
   - **Text In Church** -- zadajte **API Key** (Kľúč API). Najprv požiadajte podporu Text In Church o prístup k vývojárskemu API a potom vytvorte kľúč v sekcii Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- ako **API Key** zadajte autorizačný kľúč z vášho účtu Nalo Solutions a ako **Sender ID** (ID odosielateľa) zadajte identifikátor (až 11 znakov), ktorý vám Nalo schválilo.
   - **Twilio** -- použite vlastný účet Twilio vašej cirkvi; Twilio vám účtuje priamo. Skopírujte **Account SID** a **Auth Token** z [Twilio Console](https://console.twilio.com) a zadajte **From Number** (Odosielacie číslo) -- telefónne číslo Twilio zaregistrované pre A2P 10DLC v tvare ako `+15551234567`. Po uložení vložte webhook URL pre prichádzajúce správy (pozri nižšie) do poľa **A message comes in** (Správa prichádza) v nastaveniach čísla v Twilio, aby sa odpovede STOP zaznamenávali aj v B1.
3. Kliknite na **Save** (Uložiť).

Ak chcete posielanie SMS zastaviť, nastavte **Provider** na **None** (Žiadny) a uložte. Uložený poskytovateľ sa tým odstráni.

### Odhlásenie osôb, ktoré odpovedia STOP

Keď je poskytovateľ uložený, znova otvorte sekciu Texting pomocou **Edit** (Upraviť). Pod nastaveniami poskytovateľa sa zobrazí pole **Inbound (STOP) webhook URL** len na čítanie. Obsahuje webovú adresu jedinečnú pre vašu cirkev. Kliknutím na pole adresu označte, skopírujte ju a vložte do nastavenia webhooku pre prichádzajúce správy (odpovede) u vášho poskytovateľa SMS. Funguje to so všetkými vyššie uvedenými poskytovateľmi, ktorí dokážu presmerovať prichádzajúce odpovede na webhook.

Potom, keď niekto odpovie **STOP** (alebo STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT alebo REVOKE) na jednu z vašich správ, B1 nájde všetkých, ktorých mobilné číslo sa zhoduje, označí ich ako odhlásených a vypne im pripomienky cez SMS. Pri skupinových správach sa potom preskočia. Ostatné odpovede sa ignorujú.

:::info
Toto používa rovnaké nastavenie odhlásenia ako **Hide me from the member directory** (Skryť ma v adresári členov), takže osoby, ktoré odpovedali STOP, sa na svojom profile zobrazia aj ako **Hidden from directory** (Skryté v adresári). Pole sa zobrazí iba vtedy, keď je vybraný uložený poskytovateľ. Ak v rozbaľovacej ponuke prepnete na iného poskytovateľa, najprv uložte zmeny, aby ste URL znova videli.
:::

Keď je poskytovateľ pripojený, zamestnanci s oprávnením posielať správy uvidia na stránke skupiny tlačidlo **Text** (**Text this group** -- Poslať správu tejto skupine) a na stránke osoby s mobilným telefónom tlačidlo **Send text message** (Odoslať SMS). Napíšte správu a kliknite na **Send** (Odoslať). Dialógové okno počíta znaky a segmenty SMS. Pri skupine pred odoslaním zobrazí, koľko členov správu dostane:

- Členovia, ktorí nemajú uložené mobilné číslo, sú preskočení.
- Členovia, ktorí zvolili **Hide me from the member directory** (Skryť ma v adresári členov), sa počítajú ako odhlásení a sú preskočení.
- Členovia rodiny, ktorí zdieľajú mobilné číslo, dostanú správu iba raz.

### Personalizácia správ pomocou zástupných polí {#personalizing-texts-with-merge-fields}

Pod poľom so správou dialógové okno Text zobrazuje štítky zástupných polí: **First Name** (Meno), **Last Name** (Priezvisko), **Display Name** (Zobrazované meno) a **Church Name** (Názov cirkvi). Kliknutím na štítok vložíte jeho zástupný znak (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` alebo `{{churchName}}`) na miesto kurzora. Pri odoslaní sa každý zástupný znak nahradí údajmi konkrétneho príjemcu. Skupinová správa ako `Ahoj {{firstName}}, uvidíme sa v nedeľu!` sa tak dostane ku každému členovi s jeho menom. Zástupné polia fungujú pre skupinové správy aj pre správy jednotlivcom. Správy skupine majú navyše štítok **Group Name** (Názov skupiny) (`{{groupName}}`), ktorý sa nahradí názvom skupiny.

Ak chcete správu znova použiť, uložte ju ako [šablónu SMS](./email-templates.md#text-templates) (šablóna e-mailu s kategóriou **Text**) a vyberte ju v poli **Load Template (optional)** (Načítať šablónu, voliteľné) v hornej časti okna Text.

:::info
Limit 1 600 znakov platí pre správu v momente písania. Po doplnení zástupných polí sa každý text dlhší ako 1 600 znakov skráti na túto dĺžku.
:::

Správy sa môžu odosielať aj automaticky v kroku [pracovného postupu](../serving/workflows.md#sending-a-text) s akciou **Send Text** (Odoslať SMS). Ten používa rovnakého poskytovateľa a rovnaké zástupné polia.

## Úložisko súborov

Súbory, ktoré nahrávate na svoju webovú stránku (cez [Súbory](../website/files.md)), a iný obsah používajú predvolene bezplatné hostované úložisko B1 až do 100 MB. Ak potrebujete viac miesta, môžete pripojiť vlastné cloudové úložisko. Nové nahrávky potom idú priamo na váš účet bez limitu platformy.

1. Na stránke Settings (Nastavenia) kliknite v ľavom zozname na **File Storage** (Úložisko súborov) a potom v sekcii **File Storage** kliknite na **Edit** (Upraviť).
2. Vyberte poskytovateľa: **Google Drive**, **Dropbox**, **OneDrive** alebo **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2 a pod.).
3. Pri Google Drive, Dropboxe alebo OneDrive kliknite na **Connect** (Pripojiť) a prihláste sa, aby ste udelili prístup. Pri úložisku S3 zadajte prístupový kľúč, tajný kľúč, názov bucketu a základnú verejnú URL.
4. Kliknite na **Save** (Uložiť).

:::info
Toto ovplyvňuje iba nové nahrávky na súbory vašej webovej stránky a podobné oblasti obsahu. Obrázky z galérie, miniatúry, logá a fotografie osôb vždy zostávajú v predvolenom úložisku B1.
:::

## Povyšovanie ročníkov

Ak sledujete **Grade** (Ročník) detí a študentov, B1 môže všetkých automaticky posunúť o ročník k dátumu, ktorý zvolíte (napríklad 1. augusta). Nemusíte tak upravovať každý profil ručne.

1. Na stránke Settings (Nastavenia) kliknite v ľavom zozname na **Grade Promotion** (Povyšovanie ročníkov) a potom v sekcii **Grade Promotion** kliknite na **Edit** (Upraviť).
2. Zapnite prepínač (zobrazí sa **Enabled** -- Zapnuté) a vyberte **Month** (Mesiac) a **Day** (Deň), kedy sa ročníky každý rok povýšia. V tento deň sa každý s ročníkom posunie o jeden ročník nahor a žiaci 12. ročníka získajú stav **Graduated** (Absolvent).
3. Uložte zmeny.

Ak chcete automatické povyšovanie vypnúť, prepnite prepínač na **Disabled** (Vypnuté) a uložte. Dátum povýšenia sa odstráni a ročníky sa už nebudú meniť automaticky.

## Prihlasovanie na dobrovoľnícke služby {#volunteer-signup}

Členovia, ktorí si prezerajú [prihlasovanie na dobrovoľnícke služby](../../b1-church/serving/volunteer-signup.md), predvolene vidia každý nadchádzajúci týždeň, v ktorom sú voľné miesta. Ak je tento zoznam dlhý, môžete zobraziť iba najbližší týždeň pre každý typ plánu.

1. Na stránke Settings (Nastavenia) kliknite v ľavom zozname na **Volunteer Signup** (Prihlasovanie na dobrovoľnícke služby) a potom v sekcii **Volunteer Signup** kliknite na **Edit** (Upraviť).
2. Zapnite možnosť **Show only the next week of each plan type** (Zobraziť iba najbližší týždeň pre každý typ plánu).
3. Uložte zmeny.

Po zapnutí sa pri každom type plánu zobrazí iba jeho najbližší nadchádzajúci plán. Ďalší týždeň sa zobrazí, keď tento dátum uplynie. Riadok **Weeks shown** (Zobrazené týždne) v sekcii ukazuje buď **Only the next week of each plan type** (Iba najbližší týždeň pre každý typ plánu), alebo **All upcoming weeks** (Všetky nadchádzajúce týždne).

## Ochrana súkromia darov {#giving-privacy}

Osoby s prístupom k darom zvyčajne vidia súhrny darov osoby na jej [karte osoby](../people/adding-people.md#editing-details). Ak nechcete, aby sa sumy zobrazovali pri každom otvorení karty, môžete ich skryť, kým ich niekto nevyžiada.

1. Na stránke Settings (Nastavenia) kliknite v ľavom zozname na **Giving privacy** (Ochrana súkromia darov) a potom v sekcii **Giving privacy** kliknite na **Edit** (Upraviť).
2. Zapnite možnosť **Hide giving on person records until clicked** (Skryť dary na kartách osôb, kým sa neklikne).
3. Uložte zmeny.

Po zapnutí karta darov na karte osoby zobrazí text „Giving is hidden on person records“ (Dary sú na kartách osôb skryté). Kliknutím na **Show giving** (Zobraziť dary) načítate a zobrazíte dary danej osoby. Keď otvoríte inú osobu, zobrazenie sa opäť skryje. Nemení sa tým, kto môže dary vidieť: karta sa zobrazuje iba osobám s prístupom k darom.

## Import a export

Odkaz **Import/Export** pod názvom vašej cirkvi na stránke Settings (Nastavenia) otvorí samostatný nástroj v novom okne prehliadača. Pomocou neho môžete:

- Importovať údaje o členoch z iného systému na správu cirkvi.
- Exportovať svoje údaje ChurchApps na zálohovanie alebo migráciu.

Táto funkcia je veľmi užitočná, keď cirkev len nastavujete a potrebujete preniesť existujúce záznamy do ChurchApps.

:::warning
Pri importe dát si vždy najprv zálohujte existujúce záznamy. Importy pridávajú dáta do systému a pri opakovanom spustení môžu vytvoriť duplicitné záznamy.
:::
