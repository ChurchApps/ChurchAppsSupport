---
title: "Načrti bogoslužij"
description: "Nastavite načrtovanje prostovoljcev v B1 Admin: ustvarite načrte bogoslužij po datumih, kopirajte prejšnje tedne, dodelite člane ekipe položajem ter upravljajte roke za prijave in opomnike."
---

# Načrti bogoslužij

<div class="article-intro">

Načrti bogoslužij organizirajo, kdo služi in kdaj. Vsak načrt je vezan na določen datum in službo, kar omogoča lažje usklajevanje prostovoljskih ekip iz tedna v teden in zagotavlja, da je vsaka služba v celoti zasedena.

</div>

## Video za usposabljanje

<YouTube id="47DstBXKl74" title="Ustvarjanje načrtov in razporejanje prostovoljcev v B1" next="Oblikovanje poteka bogoslužja in knjižnice pesmi v B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Nastavite svoja služenja in ekipe v območju Služenje
- Poskrbite, da so prostovoljci dodani v vaš [imenik oseb](../people/adding-people.md) in dodeljeni ekipam

</div>

## Dostop do načrtov

1. V B1 Admin odprite [meni Skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo), razširite **Služenje** in kliknite **Načrti**.
2. Na vrhu strani izberite **zavihek službe**.
3. Kliknite **vrsto načrta**, da si ogledate seznam načrtov za to vrsto. Nad seznamom uporabite **Prihajajoči** in **Pretekli**, da preklapljate med prihodnjimi in prejšnjimi načrti. **Prihajajoči** prikaže načrte od danes naprej, od najbližjega, na koncu pa načrte brez datuma. **Pretekli** prikaže samo prejšnje načrte, od najnovejšega.
4. Kliknite določen načrt, da ga odprete.

Vsaka stran načrta prikazuje povezave nazaj na njegovo vrsto načrta in na **Načrti**, tako da se lahko vrnete višje brez gumba za nazaj v brskalniku.

:::info
Za upravljanje načrtov ni potreben poln skrbniški dostop. Vsak, ki je član službe, lahko odpre Služenje ter ustvarja, ureja in razporeja načrte za svojo službo, ne da bi potreboval dovoljenje Urejanje načrtov. Urejevalniki z vlogo Urejanje načrtov lahko upravljajo načrte v vseh službah.
:::

## Ustvarjanje načrta

1. Na strani vrste načrta kliknite **Nov načrt** na vrhu strani.
2. Načrtu dajte ime ali uporabite datum kot ime. Izberite **datum** službe.
3. Če ima vaša služba [predloge](./plan-templates.md), lahko pod **Začni iz predloge** izberete eno in tako v enem koraku izpolnite potek bogoslužja, položaje in opombe.
4. Sicer, če želite kopirati iz prejšnjega načrta, uporabite **Kopiraj iz prejšnjega načrta** in izberite **Samo položaji** ali **Položaji in dodelitve**. Če ne želite kopirati, izberite **Nič**. Lahko označite tudi **Kopiraj potek bogoslužja**. Ko kopirate iz prejšnjega načrta, novi načrt prevzame tudi njegove **Opombe**, **Rok za prijavo**, **Pokaži imena prostovoljcev na strani za prijavo** in nastavitev samodejne zamenjave, tako da jih vsak teden ne vnašate znova. Katero koli od teh lahko spremenite v nastavitvah novega načrta.
5. Če želite hkrati pripraviti več načrtov med kopiranjem, izberite **Ponovi vsake** in **Pogostost** (Dan, Teden ali Mesec), nato vnesite **Število načrtov** (do 12). Pri Mesecu vam **Na** omogoča, da ohranite isti dan v mesecu ali isti dan v tednu, na primer drugo soboto. B1 pred shranjevanjem prikaže datume in ustvari en načrt za vsak datum, pri čemer je vsak kopiran iz prejšnjega. Če je načrt poimenovan po datumu, bo vsak novi načrt dobil ime po svojem datumu.
6. Po želji nastavite **Rok za prijavo (ure pred službo)**. Nov načrt začne s rokom prejšnjega načrta, tukaj pa ga lahko spremenite. Če roka ne želite, pustite prazno. Kako se rok šteje, je opisano v [Nastavitvah načrta](#plan-settings).
7. Shranite načrt. Zdaj lahko začnete dodeljevati člane ekipe in oblikovati [potek bogoslužja](./service-order.md).

:::tip
Nastavitve ponavljanja so na voljo samo med kopiranjem iz prejšnjega načrta (položajev, dodelitev ali poteka bogoslužja).
:::

## Stran podrobnosti načrta

Ko odprete načrt, se na vrhu prikažejo ime načrta, služba, vrsta načrta in datum službe, z gumboma **Uredi** in **Natisni**. Spodaj je vse na eni strani:

- **[Potek bogoslužja](./service-order.md)** -- Oblikujte potek bogoslužja z elementi, kot so pesmi, molitve, obvestila in pridiga.
- **Dodelitve ekipe za služenje** -- Upravljajte, kateri člani ekipe so dodeljeni temu načrtu. Dodate lahko ljudi iz obstoječih ekip in vidite, kdo je potrdil ali še čaka. Povezave nad položaji vam omogočajo odpiranje **Opomb** in **Časov** načrta.

## Dodeljevanje članov ekipe

1. Odprite načrt in se pomaknite do **Dodelitve ekipe za služenje**.
2. Kliknite **Dodaj položaj**. Izpolnite podatke v obrazcu za dodajanje položaja. Za ime kategorije vpišite poljubno kategorijo. Če želite, da lahko položaj zasede kdorkoli v vaši cerkvi (ne samo člani ene ekipe), pustite **Skupina prostovoljcev** nastavljeno na **Brez**.
3. Kliknite **Potrebni ljudje** in izberite prostovoljce za ta položaj. Če ima položaj **Skupino prostovoljcev**, izbirate med člani te skupine. Če je njegova skupina prostovoljcev nastavljena na **Brez**, lahko namesto tega iščete kogarkoli v vaši cerkvi.
4. Dodajte člane iz seznama ekipe s klikom na **Dodaj**.
5. Dodeljeni člani se prikažejo pod svojo ekipo s statusom dodelitve.
6. Kliknite obvesti prostovoljce, da jih obvestite v aplikaciji B1 ali po e-pošti. Če načrt uporablja [potek potrditve](#plan-settings), obveščanje sproži tudi kartico poteka, ki spremlja vsako zahtevo, dokler prostovoljec ne odgovori.

Vsak položaj prikazuje števec (na primer „2/3“), tako da na prvi pogled vidite, koliko mest je zasedenih. Pod naslovom **Dodelitve ekipe za služenje** povzetek („X od Y položajev zasedenih“) prikazuje skupno zasedenost načrta, skupaj s številom še potrebnih mest, in preklopi na **Popolnoma zasedeno**, ko je vsak položaj pokrit.

:::tip
Pred ustvarjanjem načrtov nastavite svoje ekipe v nastavitvah službe. Tako boste imeli pripravljen nabor prostovoljcev, iz katerega lahko dodeljujete.
:::

### Kopiranje položajev v prazen načrt

Če načrt še nima položajev in obstaja prejšnji načrt iste vrste, se v **Dodelitve ekipe za služenje** prikaže povezava **Kopiraj iz prejšnjega načrta**. Izberite **Samo položaji** ali **Položaji in dodelitve**, da odprti načrt napolnite s položaji (in prostovoljci) prejšnjega načrta. Kopija gre v trenutni načrt; ne ustvari drugega načrta za isti datum.

## Nastavitve načrta

Vsak načrt ima dodatne nastavitve, ki jih lahko konfigurirate s klikom na **Uredi** ob načrtu na seznamu vrste načrta ali z gumbom **Uredi** na vrhu strani načrta. Kliknite **Končano** (ali ime načrta), da se vrnete v načrt. Med njimi so:

- **Rok za prijavo (ure pred službo)** — število ur pred službo, ob katerem se prijave prostovoljcev zaprejo. Ure se štejejo nazaj od prvega časa **Služba** načrta (vaje in drugi časi se preskočijo, razen če načrt nima ničesar drugega), tako da se 2-urni rok pri storitvi ob 10.00 zapre prijave to jutro ob 8.00. Če načrt nima časov, se rok šteje od 9.00 na datum službe v časovnem pasu vaše cerkve. Ko rok poteče, se prostovoljci ne morejo več prijaviti niti odjaviti. Vnesite negativno število, če želite prijave odpreti tudi po začetku službe. Pustite prazno ali izbrišite, če roka ni.
- **Potek potrditve** — izberite [potek potrditve dodelitve služenja](./workflows.md#serving-assignment-confirmations), ki spremlja zahteve za služenje za ta načrt po e-pošti in SMS-u, dokler vsak prostovoljec ne sprejme ali zavrne. Ko na objavljenem načrtu **obvestite** prostovoljce, dobi vsaka nova zahteva lastno kartico na tabli tega poteka, nad povezavo za obveščanje pa se prikaže opomba *„Nove zahteve uporabljajo potek potrditve.“* Pustite na **Uporabi obstoječa obvestila o dodelitvah**, če želite ohraniti običajna obvestila. Na seznamu so samo aktivni poteki potrditve; najprej jih ustvarite pod **Služenje > Poteki**.
- **Pokaži imena prostovoljcev na strani za prijavo** — ko je označeno, lahko prijavljeni prostovoljci na strani za prijavo B1.church vidijo, kdo se je že prijavil na vsak položaj. Imena nikoli ne vidijo obiskovalci, ki niso prijavljeni.
- **Zadržano** — skrije dodelitve pred prostovoljci, dokler niste pripravljeni objaviti urnika.
- **Samodejno določi nadomestilo, ko prostovoljec zavrne** — ko je označeno, če dodeljeni prostovoljec zavrne svoj položaj, bo B1 samodejno kontaktiral naslednjo razpoložljivo osebo na seznamu ekipe in vprašal, ali lahko služi. To se nadaljuje po seznamu, dokler nekdo ne sprejme, tako da so vaši položaji zasedeni brez ročnega sledenja.

:::tip
Na strani za prijavo članov so odprti položaji vsakega načrta navedeni po kategoriji in nato po imenu. Člani vidijo vsak prihajajoči teden z odprtimi položaji, razen če v [Nastavitve > Prijava prostovoljcev](../settings/church-settings.md#volunteer-signup) vklopite **Prikaži samo naslednji teden vsake vrste načrta**.
:::

## Opomniki prostovoljcem {#volunteer-reminders}

B1 lahko prostovoljce samodejno opomni pred službami, za katere so razporejeni, tako da vam ni treba vsak teden loviti ekipe. Opomniki gredo **vsem razporejenim** — tako tistim, ki so potrdili, kot tistim, ki se še niso odzvali. Izjema je zahteva, poslana prek [poteka potrditve](./workflows.md#serving-assignment-confirmations): ta prostovoljec prejema opomnike šele, ko sprejme, saj potek do takrat skrbi za sledenje. Vsak e-poštni opomnik vključuje položaj(e) prostovoljca, datum službe, opombe načrta in vaše sporočilo po meri.

Čas in vsebino opomnikov nastavite po **vrsti načrta**, tako da lahko vsaka vrsta službe ohrani svoj urnik.

1. V območju **Služenje** izberite službo, ki vsebuje vrsto načrta.
2. Na seznamu **Vrste načrtov** kliknite **Uredi** ob vrsti načrta.
3. Razširite razdelek **Opomniki** in vklopite **Pošlji opomnike za načrte te vrste**.
4. Pod **Kdaj naj gredo opomniki?** izberite do tri časovne točke: **7 dni prej**, **3 dni prej**, **2 dni prej**, **1 dan prej** ali **Na dan**.
5. Nastavite **Čas dneva**, ob katerem gredo opomniki.
6. Po želji dodajte **Sporočilo**. Če ga pustite prazno, bo uporabljeno privzeto besedilo opomnika.
7. Pod **Pošlji z** izberite **Potisno**, **E-pošta** in, če je vaša cerkev povezana s [ponudnikom SMS-ov](../settings/church-settings.md#texting), **SMS**.
8. Kliknite **Shrani opomnike**.

Opomniki so za vrsto načrta izklopljeni, dokler jih ne vklopite.

:::tip
Prostovoljci, ki še niso potrdili, dobijo gumba **Sprejmi** in **Zavrni** neposredno v e-poštnem opomniku, tako da se lahko odzovejo, ne da bi se prijavili.
:::

### Opomniki po SMS-u

Možnost **SMS** se prikaže samo, ko je v vaši cerkvi povezan ponudnik SMS-ov. SMS-i gredo prek ponudnika SMS-ov vaše cerkve, vsak SMS pa lahko stane vašo cerkev. Prostovoljec prejme opomnik po SMS-u samo, če ima vklopljeno **Sporočila SMS** v svojih [Nastavitvah obveščanja](../../b1-church/getting-started/notification-preferences.md) in ima na svojem profilu mobilno številko. Vsak SMS se začne z imenom vaše cerkve, je omejen na eno sporočilo SMS in se konča z „Za odjavo odgovorite STOP.“ Kdor odgovori STOP, ne prejema več SMS-ov od vaše cerkve. Da odgovori STOP dosežejo B1, prilepite **URL vhodnega (STOP) webhooka** iz vaših [nastavitev SMS-ov](../settings/church-settings.md#texting) v vhodni webhook sporočil vašega ponudnika.

Če želite takoj poslati SMS vsem razporejenim v določenem časovnem obdobju, uporabite **Pošlji SMS prostovoljcem** na [Pregledu načrtov](./plans-overview.md#texting-everyone-scheduled).

:::info
Vsak opomnik je poslan enkrat. Opomniki po SMS-u gredo poleg potisnih sporočil in e-pošte, ne namesto njih.
:::

## Povezovanje skupin z vrsto načrta

Pod seznamom načrtov na strani vrste načrta vam razdelek **Povezane skupine** omogoča, da odločite, katere skupine lahko vidijo načrte za to vrsto načrta v svojem portalu za člane. To je hiter način, da ustrezne ekipe seznanite z nadolžnimi službami, ne da bi jim dali skrbniški dostop.

1. Na strani vrste načrta kliknite **Povezane skupine** na vrhu strani (ali se pomaknite do tega razdelka).
2. Kliknite **Dodaj skupino** in izberite skupino iz spustnega seznama.
3. V stolpcu **Prikaže** izberite, ali naj člani te skupine za to vrsto načrta vidijo **Samo pretekle načrte**, **Samo prihajajoče načrte** ali **Pretekle in prihajajoče načrte**.
4. Ponovite za povezavo dodatnih skupin ali kliknite ikono koša, da odstranite skupino.

:::info
V izbirniku so prikazane samo skupine, označene kot **Standardne**. Člani povezane skupine samodejno vidijo načrte te vrste načrta na strani skupine v portalu za člane B1 — omejeno na časovno obdobje, ki ste ga izbrali.
:::

Če so načrti lekcije Lessons.church, člani povezane skupine na strani skupine vidijo tudi kartico **Današnja lekcija** (spodnja vrstica, verz in vprašanje za starše). Tukaj povežite starševsko skupino in nastavite filter na **Samo pretekle načrte**, da je vključena današnja lekcija. Ekipe za prostovoljce običajno uporabljajo **Samo prihajajoče načrte** ali **Pretekle in prihajajoče načrte**.

## Tiskanje načrtov

Načrt lahko natisnete za razdelitev svoji ekipi. Odprite načrt in kliknite **Natisni** na vrhu strani, da ustvarite natisljivo različico, ki vključuje dodelitve in potek bogoslužja. Na vrhu izpisa je logotip vaše cerkve (**Logotip za svetlo ozadje** iz [Spletna stran > Videz](../website/appearance.md), če ste ga naložili), pod njim pa ime vaše cerkve ter ime načrta, tako da so posamezne strani enostavno prepoznavne. To je uporabno za delitev na vajah ali objavo na skupnem prostoru.

Izpis izpusti vse, kar bi bilo prazno. Če ni dodeljenih prostovoljcev, ni polja za ekipo in potek bogoslužja uporablja celotno širino strani. Če nobena točka nima dolžine, je stolpec **Dolžina** izpuščen, in če načrt nima časov službe in dolžin, je izpuščen tudi stolpec **Čas**. Če želite odstraniti črno glavo **Potek bogoslužja** z datumom službe, odznačite **Prikaži glavo Potek bogoslužja** na vrhu strani za tiskanje; B1 Admin si vašo izbiro zapomni v tem brskalniku.

:::info
Načrti so organizirani po službah. Preden ustvarjate ali si ogledujete načrte, se prepričajte, da ste na pravem zavihku službe.
:::

## Naslednji koraki

- Uporabite [Pregled načrtov](./plans-overview.md), da v eni mreži vidite vse prihajajoče dodelitve v več tednih in odkrijete nezasedene položaje — prostovoljce lahko dodeljujete neposredno iz mreže
- Shranite strukturo načrta kot [Predlogo načrta](./plan-templates.md), da jo lahko z enim klikom vstavite v prihodnje načrte
- Oblikujte [Potek bogoslužja](./service-order.md) s pesmimi, branji in drugimi elementi
- Dodajte [pesmi](./songs.md) iz svoje knjižnice neposredno v potek bogoslužja
- Uporabite [Naloge](./tasks.md), da članom ekipe dodelite sledilne naloge
- Prikažite trenutno vsebino lekcije na TV-ju v predsobju z [Digitalno signalizacijo](./digital-signage.md)
