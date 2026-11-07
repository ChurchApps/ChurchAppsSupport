---
title: "Plačljive prijave"
---

# Plačljive prijave

<div class="article-intro">

Prijava na dogodek lahko presega preprosto štetje udeležencev. Določite lahko cenovno opredeljene vrste udeležencev (na primer Odrasli in Otroci), ponudite izbirne dodatke s svojimi cenami in količinami, ustvarite kode za popust ter ob prijavi zbirate plačila prek obstoječega ponudnika darovanj vaše cerkve. Ko se dogodek zapolni, izbirni seznam čakanja ohrani zainteresirane člane v vrsti in jih samodejno uvrsti, ko se sprostijo mesta.

</div>

## Video za usposabljanje

<YouTube id="eGSZv24Dlzk" title="Prijave na dogodke in plačljivi dogodki v B1" next="Objava vaše cerkvene spletne strani v B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Najprej omogočite prijave za dogodek — glejte [Ustvarjanje koledarjev](creating-calendars#enabling-event-registration)
- Za spletno zbiranje plačil mora vaša cerkev imeti [nastavljeno spletno darovanje](../donations/online-giving-setup.md) (Stripe, PayPal ali Kingdom Funding). Brezplačni dogodki ne potrebujejo nastavitve darovanja. Brez spletnega darovanja plačljive prijave še vedno delujejo, vendar ljudje plačajo neposredno cerkvi — glejte [Cerkve brez spletnega darovanja](#churches-without-online-giving).

</div>

## Odpiranje nastavitev prijav

1. V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), izberite **Calendars > Registrations** (Koledarji > Prijave) in odprite svoj dogodek (ali ga odprite iz njegovega koledarja).
2. Kartica **Registration Settings** (Nastavitve prijav) prikazuje osnove — **Enable Registration** (Omogoči prijave), **Capacity** (Zmogljivost), **Registration Opens/Closes** (Prijave se odprejo/zaprejo), **Tags** (Oznake) in **Registration Questions** (Vprašanja za prijavo).
3. Pod osnovami so tri razširljive plošče: **Attendee Types** (Vrste udeležencev), **Selections** (Izbire) in **Discount Codes** (Kode za popust).

## Vrste udeležencev

Vrste udeležencev vam omogočajo, da različnim vrstam udeležencev zaračunate različne cene in da vsaki posebej določite največje število.

1. Razširite ploščo **Attendee Types** (Vrste udeležencev) in kliknite **Add Type** (Dodaj vrsto).
2. Vnesite **Name** (Ime), na primer „Odrasli“, „Otrok“ ali „Študent“.
3. Nastavite **Price** (Cena). Za brezplačno vrsto vnesite 0.
4. Po želji nastavite **Capacity** (Zmogljivost) samo za to vrsto (na primer samo 20 mest za otroke). Če pustite prazno, za vrsto ni omejitve.
5. Kliknite **Save** (Shrani).

Med prijavo vsak udeleženec izbere vrsto; razprodane vrste so prikazane kot **Sold out** (Razprodano) in jih ni mogoče izbrati. Seznam prijavljenih prikazuje vrsto vsakega udeleženca in tekoče število po vrstah.

## Izbire

Izbire so izbirni dodatki s ceno — majice, obroki, nadgradnje aktivnosti.

1. Razširite ploščo **Selections** (Izbire) in kliknite **Add Selection** (Dodaj izbiro).
2. Vnesite **Name** (Ime), po želji **Description** (Opis) in **Price** (Cena) (0 je prikazano kot „Free“ (Brezplačno)).
3. Po želji nastavite **Capacity** (Zmogljivost; skupno razpoložljivo število pri vseh prijavah) in **Max Qty** (Največja količina; največ, kolikor lahko ena prijava naroči).
4. Kliknite **Save** (Shrani).

Prijavljeni med prijavo izberejo količine, skupna števila pa se štejejo proti zmogljivosti, tako da nikoli ne prodate preveč.

## Kode za popust

1. Razširite ploščo **Discount Codes** (Kode za popust) in kliknite **Add Discount Code** (Dodaj kodo za popust).
2. Vnesite **Code** (Koda), ki jo bodo vnašali prijavljeni.
3. Izberite **Type** (Vrsta) — **Percent** (Odstotek) ali **Amount** (Znesek) — in vnesite **Value** (Vrednost).
4. Po želji omejite kodo z **Start Date** (Datum začetka) / **End Date** (Datum konca), **Min Members** (Najmanj članov; najmanjše število udeležencev pri prijavi) in **Max Uses** (Največ uporab).
5. Kliknite **Save** (Shrani).

Pri vsaki kodi je prikazano število **Uses** (Uporabe), tako da vidite, kako pogosto je bila unovčena. Prijavljeni takoj dobijo povratne informacije, ko uporabijo kodo — vključno z jasnimi sporočili, ko je koda potekla, še ni začela veljati ali zahteva več udeležencev.

## Seznam čakanja

V kartici Registration Settings (Nastavitve prijav) vklopite **Enable Waitlist** (Omogoči seznam čakanja). Ko dogodek doseže zmogljivost:

- Novi prijavljeni dobijo mesto na seznamu čakanja namesto zavrnitve. Opravijo isto prijavo (plačilo med čakanjem preskočeno).
- Ko nekdo odpove prijavo, se najstarejša prijava s seznama čakanja **samodejno uvrsti** in prejme e-poštno sporočilo, da se je sprostilo mesto. Če dolgujejo znesek, sporočilo povezuje na [Moje prijave](../../b1-church/events/my-registrations) na spletnem mestu B1 vaše cerkve, kjer lahko opravijo plačilo.
- Osebo lahko kadarkoli ročno uvrstite z dejanjem **Promote** (Uvrsti) v vrstici s seznama čakanja — uporabno po povečanju zmogljivosti dogodka.

:::info
Uvrščene prijave ostanejo *na čakanju* (pending), dokler ni poravnan morebitni dolg; plačilo (ali odsotnost dolga) jih potrdi.
:::

## Seznam prijavljenih

Odprite dogodek na strani Registrations (Prijave), da vidite vse prijave. Naslov kartice prikazuje, koliko prijav zaseda mesta glede na zmogljivost (na primer *Registrations (18 / 20)*). Štejejo samo prijave na čakanju (pending) in potrjene prijave; ko so ljudje na seznamu čakanja, naslov dodatno prikaže število (na primer *· 3 waitlisted* (3 na čakanju)), enako število pa je prikazano pod vrstico zmogljivosti. Tabela prikazuje **Name** (Ime), **Members** (Člani), **Type** (Vrsta; vrsta vsakega udeleženca), **Paid / Total** (Plačano / Skupaj; z opozorilom o dolgu, kadar je znesek še neporavnan), **Status** (Stanje) in **Date** (Datum), nad tabelo pa so žetoni s številom po vrstah.

- Kliknite ikono podrobnosti v vrstici, da odprete pogovorno okno **Registration Details** (Podrobnosti prijave) — člani, izbire, plačano/dolg in tabelo **Payments** (Plačila), ki navaja vsak zaračun (znesek, način, datum).
- **Export CSV** prenese celoten seznam prijavljenih s stolpci za člane, vrste udeležencev, izbire, plačano/skupaj/dolg, stanje in en stolpec za vsako vprašanje ob prijavi.
- **Add Attendee** (Dodaj udeleženca) zabeleži prijavo brez spleta ali po telefonu za katero koli osebo v vaši cerkvi. Izberite osebo in pri plačljivem dogodku še njeno vrsto udeleženca. Njihova kartica ni zaračunana: plačljiva prijava se shrani kot **pending** (na čakanju) s celotnim zneskom kot neporavnanim dolgom. Če ima vaša cerkev spletno darovanje, lahko oseba plača prek [Moje prijave](../../b1-church/events/my-registrations); sicer znesek zberete osebno. Za dodajanje udeležencev potrebujete dovoljenje Registrations Edit (Urejanje prijav).

:::info
Vračil denarja v B1 ni mogoče obdelati. Če morate vrniti denar za odpovedano plačljivo prijavo, ga izvedite na nadzorni plošči vašega ponudnika darovanj (na primer Stripe).
:::

## Kako poteka plačilo

Plačila potekajo prek istega prehoda za darovanja, ki ga vaša cerkev že uporablja za donacije — podatki o kartici gredo neposredno k ponudniku in nikoli ne pridejo na strežnike B1. Cene se vedno izračunajo na strežniku iz vaših nastavljenih vrst, izbir in kod za popust, tako da prijavljeni ne morejo spremeniti skupnega zneska. Prijavljeni člani lahko plačajo s shranjeno kartico. Gostje vnesejo kartico ob blagajni in morajo pred plačilom označiti **I'm not a robot** (Nisem robot).

### Cerkve brez spletnega darovanja

Če vaša cerkev nima nastavljenega ponudnika darovanj, lahko plačljivi dogodki vseeno sprejemajo prijave. Korak plačila prijavljenim sporoči, da spletno plačilo ni na voljo in da lahko cerkvi plačajo neposredno, gumb **Register and Pay Later** (Prijavi se in plačaj kasneje) pa shrani prijavo. Shrani se kot **pending** (na čakanju) s celotnim zneskom kot neporavnanim dolgom in se prikaže na seznamu s opozorilom o dolgu. Denar zberite na način, ki ga vaša cerkev običajno uporablja.

:::info
B1 nima načina, da bi označil, da je bilo offline plačilo prejeto. Neporavnani dolg ostane na seznamu in na kartici [Moje prijave](../../b1-church/events/my-registrations) prijavljenega tudi potem, ko ga zberete, zato vodite lastno evidenco o tem, kdo je plačal.
:::

## Sorodni članki

- [Ustvarjanje koledarjev](creating-calendars#enabling-event-registration) — omogočite prijave in osnovne nastavitve
- [Nastavitev spletnega darovanja](../donations/online-giving-setup.md) — nastavite prehod za plačila, ki se uporablja ob blagajni
- [Prijava na dogodke](../../b1-church/events/registering) — kaj člani vidijo, ko se prijavijo
- [Moje prijave](../../b1-church/events/my-registrations) — kako člani poravnajo dolgove in urejajo prijave
