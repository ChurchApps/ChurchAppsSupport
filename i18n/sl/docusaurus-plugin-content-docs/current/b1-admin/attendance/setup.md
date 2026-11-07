---
title: "Nastavitev obiskanosti"
---

# Nastavitev obiskanosti

<div class="article-intro">

Preden lahko spremljate obiskanost, morate v aplikaciji B1 Admin navesti fizične lokacije vaše cerkve, kdaj potekajo bogoslužja in katere skupine se srečujejo pri posameznem bogoslužju. Ta enkratna nastavitev ustvari strukturo, na kateri temelji vse spremljanje in poročanje o obiskanosti v vaši cerkvi.

</div>

## Video vadnica

<YouTube id="LQPc2gVlXvQ" title="Nastavitev bogoslužij in obiskanosti v aplikaciji B1" next="Nastavitev prijave otrok v B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete aktiven račun B1 Admin z dovoljenjem **Uredi bogoslužja** za obiskanost. Možnost **Nastavitev** se prikaže samo osebam, ki imajo to dovoljenje; sam ogled obiskanosti ne zadostuje. Če niste prepričani glede svoje ravni dostopa, si oglejte [Vloge in dovoljenja](../people/roles-permissions.md).
- Če nameravate skupine dodeliti časom bogoslužij, najprej poskrbite, da so vaše [skupine ustvarjene](../groups/creating-groups.md).

</div>

## Ključni pojmi

- **Kampus** -- fizična lokacija, kjer se vaša cerkev zbira (npr. »Glavni kampus«, »Severni kampus«). Kampusi se upravljajo pod **Nastavitve**.
- **Bogoslužje** -- ponavljajoče se srečanje na kampusu (npr. »Nedeljsko bogoslužje«, »Sredina«).
- **Čas bogoslužja** -- določen čas, ob katerem bogoslužje poteka (npr. »9:00«, »11:00«).
- **Razporejena skupina** -- skupina, dodeljena določenemu času bogoslužja. Obiskanost se spremlja v okviru tega bogoslužja.
- **Nerazporejena skupina** -- skupina, ki spremlja obiskanost samostojno, brez povezave s časom bogoslužja.

## Nastavitev strukture obiskanosti

1. Odprite **B1 Admin**, odprite [meni za hitri skok](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na zgornjem levem delu) in razširite **Ljudje**.
2. Kliknite **Obiskanost**, nato v levem stolpcu kliknite **Nastavitev**. Odpre se tabela **Struktura bogoslužij**, na vrhu katere so prikazana števila vaših kampusov, časov bogoslužij ter razporejenih in nerazporejenih skupin. Števila se posodobijo takoj, ko v tabeli kaj dodate, uredite ali odstranite.
3. Kliknite **Upravljaj kampuse** (zgoraj desno na plošči **Struktura bogoslužij**). Odpre se **Nastavitve → Kampusi**. Kliknite **Dodaj kampus**, vnesite ime svoje lokacije (naslov in časovni pas sta neobvezna) in kliknite **Shrani**.
4. Vrnite se na **Ljudje → Obiskanost** in kliknite **Nastavitev**. Vaš kampus se zdaj prikaže v tabeli nastavitev.
5. Kliknite gumb **+ v stolpcu Bogoslužje** pod svojim kampusom. Vnesite ime bogoslužja, npr. »Nedeljsko bogoslužje«, in kliknite **Shrani**.
6. Kliknite gumb **+ v stolpcu Čas** pod bogoslužjem. Vnesite ime **časa bogoslužja**, npr. »9:00«, po želji izpolnite [urnik prijave](#nastavitev-urnika-prijave) in kliknite **Shrani**. Ponovite za vsak čas bogoslužja.
7. Če želite skupino povezati s časom bogoslužja, odprite skupino pod **Ljudje > Skupine**, kliknite **Uredi** in uporabite **Dodaj čas bogoslužja** -- glejte naslednji razdelek.

### Vklop spremljanja obiskanosti za skupino

Preden se za skupino lahko beleži obiskanost, mora biti za to skupino vklopljeno spremljanje obiskanosti.

1. V meniju za hitri skok izberite **Ljudje > Skupine** in izberite skupino.
2. Kliknite gumb **Uredi** pod imenom skupine.
3. Nastavite **Spremljaj obiskanost** na **Da**.
4. Kliknite **Shrani**.

:::tip
Če ste skupino v prejšnjem koraku dodelili času bogoslužja, na zaslonu za urejanje skupine uporabite še možnost **Dodaj čas bogoslužja** in jo tako povežite s pravilnim bogoslužjem. Tako so srečanja povezana s pravilnim kampusom in časom.
:::

:::tip
Če se skupina srečuje zunaj rednega bogoslužja -- na primer sredi tedna kot manjša skupina, ki spremlja svojo obiskanost --, jo lahko pustite kot nerazporejeno skupino. Še vedno se bo prikazala v poročilu **Obiskanost skupin**.
:::

## Nastavitev urnika prijave

Vsak čas bogoslužja lahko ima neobvezen urnik prijave, tako da se [samoprijava](check-in.md) vsak teden sama odpre in zapre. Brez urnika je prijava za ta čas bogoslužja na voljo kadarkoli (če soba iz drugih razlogov ni zaprta, na primer ker je polna).

1. Na pogledu **Nastavitev** kliknite ime časa bogoslužja v stolpcu **Čas** (ali dodajte novega).
2. Pod **Urnik prijave** izberite **Dan** v tednu, ko se čas bogoslužja srečuje.
3. Nastavite **Začetni čas** in po želji **Končni čas**.
4. Vnesite **Odpri prijavo (minut pred začetkom)** -- na primer `30` pomeni, da se prijava odpre pol ure pred začetkom bogoslužja.
5. Vnesite **Zapri prijavo (minut po koncu)** -- na primer `15` pomeni, da ostane prijava odprta še 15 minut po končnem času. Če končnega časa niste nastavili, se šteje od začetnega časa. Če pustite prazna polja **Končni čas** in **Zapri prijavo**, ostane prijava odprta do konca tega dne.
6. Kliknite **Shrani**.

Urnik se vsak teden ponovi in se meri v časovnem pasu kampusa, kateremu bogoslužje pripada. Če kampus nima časovnega pasu, se uporabi [časovni pas](../settings/church-settings.md#time-zone) vaše cerkve, nato časovni pas prvega kampusa, ki ga ima, in nazadnje vzhodni čas (America/New_York). Če se prijava odpre ob napačni uri, preverite **Časovni pas** na kampusu v razdelku [Kampusi](../settings/campuses.md). Če želite urnik odstraniti, nastavite **Dan** nazaj na **Brez urnika** in kliknite **Shrani**. Urnik začne veljati šele, ko sta nastavljena tako **Dan** kot **Začetni čas**.

Medtem ko je okno za prijavo za čas bogoslužja zaprto:

- **Samoprijava na B1.church** prikaže ta čas bogoslužja kot **Zaprto** (ali na primer **Zaprto · odpre se ned 9:30**) in ga ni mogoče izbrati. Če so vsi časi nekega bogoslužja zaprti, družine vidijo, kdaj se prijava odpre, na primer »Prijava se odpre ned 9:30«.
- **Aplikacija B1 Checkin na kiosku** prav tako prikaže čas bogoslužja kot **Zaprto** s podatkom, kdaj se odpre. Če so vsi časi nekega bogoslužja zaprti, kiosk pove, kdaj se prijava za to bogoslužje odpre. Nekdo, ki je že prijavljen na zaprt čas bogoslužja, bo pri svoji skupini videl stanje **Prijavljen**. Če se okno zapre med prijavo, kiosk prijave ne dokonča in prikaže zaslon **Prijava še ni mogoča** s seznamom prizadete sobe, da lahko družina izbere drugo.

Gospodinjstvo, ki se je že prijavilo na prejšnji čas bogoslužja, se lahko vrne in doda poznejši čas bogoslužja, ki je odprt, tudi potem, ko je prejšnje okno že zaprto. Obstoječe prijave ostanejo ohranjene.

:::tip
Nastavite dovolj širok čas odpiranja (na primer 45 minut pred začetkom), da se lahko prijavijo tudi družine in prostovoljci, ki pridejo zgodaj, ter kratek čas zapiranja, da se lahko zamudniki prijavijo tudi, ko bogoslužje že poteka.
:::

## Urejanje nastavitev

Nastavitve lahko posodobite kadarkoli. Izberite kampus, čas bogoslužja ali skupino in kliknite **Uredi**, da spremenite podrobnosti, ali **Izbriši**, da jo odstranite.

:::info
Odstranitev časa bogoslužja ne izbriše preteklih zapisov o obiskanosti. Vaši zgodovinski podatki ostanejo ohranjeni, tudi če spremenite urnik.
:::

## Kaj sledi

Ko so vaši kampusi, časi bogoslužij in skupine pripravljeni, lahko začnete [ročno beležiti obiskanost](recording-attendance.md) ali nastavite [samoprijavo](check-in.md) za svoja bogoslužja.
