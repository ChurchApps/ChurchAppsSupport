---
title: "Upravljanje strežnika"
---

# Upravljanje strežnika

<div class="article-intro">

Funkcije za upravljanje strežnika v ChurchApps so na voljo samo uporabnikom z dovoljenjem **Server.Admin**. Ta orodja se uporabljajo za upravljanje platforme, podporo in odpravljanje težav pri vseh cerkvah v sistemu.

</div>

:::warning Omejen dostop
Funkcije, opisane na tej strani, zahtevajo dovoljenje **Server.Admin** in niso na voljo rednim skrbnikom cerkve. Namenjene so le upraviteljem platforme in osebju za podporo.
:::

## Dostop do upravljanja strežnika

Uporabniki z dovoljenjem Server.Admin lahko odprejo nadzorno ploščo za upravljanje strežnika v aplikaciji B1 Admin:

1. Prijavite se na [admin.b1.church](https://admin.b1.church).
2. Odprite [meni Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), razširite **Nastavitve** in kliknite **Server Admin**. (Do istega mesta pridete tudi neposredno prek naslova `admin.b1.church/admin`.)
3. Plošča Server Admin prikazuje svoje razdelke v levem stolpcu v treh skupinah: **Imenik** (Cerkve, Uporabniki, Vsiljevanje uporabnika), **Delovanje** (Opravila v ozadju, Commons, Trendi uporabe) in **Sistem** (Iskanja prevodov, Stanje strežnika, Migracije baze podatkov).

## Ponastavitev dvostopenjske prijave

Če ima uporabnik vklopljeno [dvostopenjsko prijavo](../b1-admin/profile/managing-profile.md#two-factor-sign-in) in je izgubil tako telefon kot rezervne kode, lahko skrbnik strežnika to prijavo izklopi:

1. Odprite razdelek **Uporabniki** na plošči Server Admin in poiščite uporabnika.
2. Uporabniki z vklopljeno dvostopenjsko prijavo imajo značko **Dvostopenjska prijava vklopljena**. Poleg nje kliknite **Ponastavi 2FA**.
3. Potrdite poziv. To storite šele, ko ste preverili, s kom govorite.

Uporabnik se nato lahko prijavi samo z geslom in na svojem profilu znova nastavi dvostopenjsko prijavo. Ponastavitve se zapišejo v dnevnik revizij kot `mfa_reset`. Končna točka je `POST /membership/users/mfa/reset/:userId` in zahteva dovoljenje Server.Admin.

## Vsiljevanje uporabnika

Funkcija vsiljevanja omogoča skrbnikom strežnika, da se prijavijo kot drug uporabnik, za namene podpore in odpravljanja težav. Uporabna je pri preiskovanju težav, ki jih prijavijo uporabniki, ali pri pomoči cerkvam pri nastavitvi sistema.

### Kako vsiliti uporabnika

1. Odprite razdelek **Vsiljevanje uporabnika** na plošči Server Admin.
2. V iskalno polje vnesite ime ali e-poštni naslov uporabnika.
3. Kliknite **Išči** ali pritisnite Enter.
4. Med rezultati iskanja kliknite uporabnika, ki ga želite vsiliti.
5. Potrdite vsiljevanje v pogovornem oknu, ki se prikaže.
6. Prijavljeni boste kot ta uporabnik in preusmerjeni na njegov račun.

### Pomembne opombe

- Vsiljevanje ustvari novo sejo z dovoljenji in dostopom do cerkva ciljnega uporabnika.
- Vaša prvotna skrbniška seja se konča, ko vsilite drugega uporabnika.
- Vsa dejanja, opravljena med vsiljevanjem, se zabeležijo v dnevniku revizij.
- Da se vrnete na svoj skrbniški račun, se odjavite in se nato znova prijavite s svojimi poverilnicami.
- Vsiljevanje uporabite samo, kadar je to nujno potrebno za podporo, in uporabnike vedno obvestite, kadar dostopate do njihovih računov zaradi podpore.

### Končna točka API

Funkcija vsiljevanja temelji na končni točki `/users/:userId/impersonate` v API-ju za člane. Tehnične podrobnosti najdete na strani [Končne točke za člane](/docs/developer/api/endpoints/membership#users).

### Varnostni vidiki

- Vsiljevanje zahteva dovoljenje Server.Admin. To dovoljenje dodeljujte zelo previdno in samo zaupanja vrednim upraviteljem platforme.
- Vsi dogodki vsiljevanja se beležijo z ID-jem skrbniškega uporabnika in ID-jem ciljnega uporabnika.
- Cerkve ob vsiljevanju niso obveščene, zato vnaprej določite jasna pravila, kdaj in kako se ta funkcija uporablja.
- Razmislite o tem, da dogodke vsiljevanja dokumentirate v svojem sistemu za sledenje podpornim zahtevkom, zaradi odgovornosti.

## Moderiranje Commons

Commons je skupna vrsta za moderiranje vsebin, ki jih oddajajo uporabniki v različnih izdelkih. Pesmi WorshipCommons, lekcije Lessons.church, predloge FreeShow in predloge spletnega urejevalnika B1 se vse stekajo v isto vrsto namesto v ločena orodja za pregled posameznih izdelkov.

### Dostop do Commons

1. Odprite zavihek **Commons** na plošči Server Admin.
2. Videli boste tri podzavihke: **Vrsta**, **Prijave** in **Sredstva**.

Vloga omejenega **urejevalnika glasbe** lahko vidi tudi zavihek Vrsta, vendar ne sme odobravati oddaj, ki spreminjajo pravice ali licenco pesmi.

### Vrsta

Vrsta prikazuje vse čakajoče oddaje v vseh izdelkih, filtrirljive po izdelku in vrsti sredstva. Vsaka vrstica prikazuje, ali gre za novo sredstvo, urejanje, ki ga je opravil izvirni avtor, ali urejanje tretje osebe. Poleg tega prikazuje zgodovino odobritev oddajatelja in čas, ki ga je oddaja čakala (označeno, ko preseže 72 ur).

Kliknite **Pregled**, da odprete predal s prikazom sprememb po poljih, predogledi datotek in vdelanim predogledom elementa samo za branje. Za odobritev ali zavrnitev uporabite bližnjični tipki **a** in **r**, s tipkama **j** in **k** pa se premikate na naslednjo ali prejšnjo oddajo, ne da bi zapustili predal. Pri zavrnitvi morate izbrati razlog (na primer kakovost, podvojeno, licenca, ccli, ai ali neustrezno temi) in dodati opombo.

### Prijave

Zavihek Prijave obravnava prijave zaradi avtorskih pravic ter pravilnosti in kakovosti za že objavljena sredstva. Prijave so razdeljene v ločeni vrsti za avtorske pravice in za pravila ter drugo, poleg zgodovine rešenih prijav. Prijavo prevzamete tako, da jo označite za svojo, nato pa jo rešite z ustrezno odločitvijo (potrjeno, zavrnjeno ali podvojeno) in dejanjem (brez dejanja, prekliči objavo ali odstrani).

### Sredstva

Zavihek Sredstva je iskalni brskalnik objavljenih vsebin z dejanji: **Izpostavi** sredstvo (prikaže ga na domači strani izdelka), **Prekliči objavo** ali **Znova objavi** ter **Odstrani** (z razlogom glede avtorskih pravic ali pravil).

Posebej za pesmi je tu tudi mesto, kjer pesem postane **pripravljena za nedeljo** in se lahko prikaže v iskanju pesmi v aplikaciji B1 Admin posamezne cerkve. Pregledovalec odpre sredstvo in vsak objavljeni ton označi kot **Preslušano**, ko ga prepozna in potrdi, da so notni zapis, akordi in diapozitivi vsi prisotni. Pesem postane pripravljena za nedeljo šele, ko so označeni vsi toni.

:::info
Moderiranje Commons je namenjeno samo osebju. Posamezne cerkve te vrste nikoli ne vidijo. Edino mesto, kjer aplikacija B1 Admin posamezne cerkve uporablja podatke Commons, je razdelek »WorshipCommons – brezplačno« v [iskanju pesmi](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), ki prikazuje samo pesmi, ki so že prestale ta pregled.
:::

Za podatkovni model in življenjski cikel oddaj glejte stran [Arhitektura Content Commons](/docs/developer/architecture/commons).

## Odobritev e-pošte skupin

Cerkve ne morejo pošiljati e-pošte, ki so jo napisale same (e-pošta skupin, nadaljnja sporočila obrazcev, e-pošta delovnih tokov in vabila v račune), dokler skrbnik strežnika ne odobri te možnosti. S tem preprečimo, da bi cerkve, registrirane prek botov, uporabljale skupni naslov ChurchApps za pošiljanje neželene pošte.

1. Odprite zavihek **Cerkve** na plošči Server Admin.
2. Vsaka cerkev prikazuje oznako **E-pošta skupin**: **Odobreno** (zeleno) ali **Ni odobreno** (z obrobo).
3. Kliknite oznako in potrdite, da odobrite cerkev ali prekličete odobritev.

Osebje cerkve zaprosi za odobritev z gumbom **Zahtevaj pregled** v pogovornem oknu Pošlji e-pošto v aplikaciji B1 Admin. Zahtevek se pošlje po e-pošti na naslov za podporo in vsebuje ime cerkve, ID, datum registracije, lokacijo ter osebo, ki je zahtevek oddala. Cerkev lahko odda en zahtevek na teden. Za dnevno kvoto in samodejno ustavitev ob zavrnjenih sporočilih ter pritožbah glejte [omejitve e-pošte, ki jo napiše cerkev](/docs/developer/architecture/notifications#church-authored-email-limits).

## Migracije baze podatkov

Delovni tok **Deploy Prod** uporabi čakajoče migracije sam. Gostovane baze podatkov sprejemajo povezave samo iz omrežja API-ja, zato GitHub runner do njih ne dostopa. Namesto tega delovni tok takoj po `serverless deploy` pokliče Lambda funkcijo `migrate` API-ja (`api-Prod-migrate`). Ta zažene čakajoče migracije vseh modulov z istim izvajalcem kot ta zavihek in prekine namestitev, če kateri modul javi napako ali je zavrnjen. **Rollback Prod** povrne samo kodo Lambda funkcije. Uporabljene migracije ostanejo uporabljene. Zavihek **Migracije baze podatkov** je namenjen preverjanju stanja, zagonu vsega, kar namestitev ni zagnala (na primer v demo okolju, kjer namestitev ne izvede migracij), in določanju začetne točke za module brez zgodovine.

Zavihek prikazuje trenutno okolje in po eno vrstico za vsak modul (članstvo, obiskanost, darovanja in podobno) s stanjem, številom uporabljenih in čakajočih migracij ter zadnjo uporabljeno migracijo.

- **Zaženi čakajoče migracije** uporabi vsako čakajočo migracijo, po en modul naenkrat, po vrstnem redu. Ustavi se ob prvi napaki in za vsak modul prikaže, kaj je bilo uporabljeno.
- Modul z oznako **Ni zgodovine** ima bazo podatkov, ki je starejša od sledenja migracijam. Takega modula se nikoli ne zažene samodejno, ker bi to ponovno zagnalo stare migracije podatkov nad aktivnimi tabelami. Namesto tega kliknite **Preveri shemo**. API primerja tabele, stolpce in indekse, ki jih ustvari vsaka migracija, z aktivno bazo podatkov ter vsako migracijo označi kot **Že uporabljeno**, **Manjka**, **Delno uporabljeno** ali **Samo podatki**. Preverjanje ničesar ne spremeni.
- V rezultatih preverjanja lahko **Zabeleži kot že uporabljeno** zapiše zaznane migracije v zgodovino migracij brez zagona (po potrditvi). Zabeleženo je vse do zadnje migracije z oznako **Že uporabljeno**, vključno z migracijami **Samo podatki** v tem obsegu. Migracije z oznako **Manjka** ostanejo čakajoče in jih lahko nato običajno zaženete z **Zaženi čakajoče migracije**.
- Migracija z oznako **Delno uporabljeno** ne dovoli zabeležitve. Če je migracijo varno zagnati znova (najprej jo preberite), označite **Ponovno zaženi**, da ostane čakajoča in se zažene znova od začetka.

Plošča Server Admin in ukazna vrstica (`yarn migrate:up`) uporabljata isti migrator Kysely in isto tabelo `kysely_migration`, zato se vedno strinjata o tem, kaj je bilo uporabljeno. Podporne končne točke so `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` in `POST .../:module/baseline`, vse samo za Server.Admin.

## Sorodne strani

- [Avtentikacija in dovoljenja](/docs/developer/api/endpoints/authentication) — model dovoljenj in avtentikacija JWT
- [Končne točke za člane](/docs/developer/api/endpoints/membership) — API za upravljanje uporabnikov in cerkva
- [Dnevnik revizij](/docs/b1-admin/reports/audit-log) — ogled dnevnikov aktivnosti za cerkev
- [Arhitektura Content Commons](/docs/developer/architecture/commons) — skupni model sredstev in življenjski cikel moderiranja
