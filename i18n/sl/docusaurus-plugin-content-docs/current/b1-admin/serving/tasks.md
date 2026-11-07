---
title: "Naloge"
---

# Naloge

<div class="article-intro">

Naloge vam omogočajo, da dodelite opravila posameznikom ali skupinam v vaši cerkvi. Ne glede na to, ali gre za enkratno opravilo ali ponavljajočo se odgovornost, naloge pomagajo spremljati, kaj je treba narediti, in kdo je zanj odgovoren, da se nič ne spregleda.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Prepričajte se, da osebe ali [skupine](../groups/creating-groups.md), ​​ki jim želite dodeliti naloge, obstajajo v B1 Admin
- V [meniju Jump](../introduction.md#getting-around-with-the-jump-menu) izberite **Serving > My Work**, da si ogledate naloge

</div>

## Ogled nalog

V meniju Jump izberite **Serving > My Work** (ali poiščite »My Work«). Seznam **Tasks** prikazuje naslov vsake naloge, osebo ali skupino, s katero je povezana, osebo, ki ji je dodeljena, datum odprtja in stanje. Vaše [delovne tokove](./workflows.md) kartice se prikažejo poleg njega pod **My Cards**. Prejemniki nalog lahko svoje kartice in odprte naloge vidijo in obdelujejo tudi na zaslonu **Me** v aplikaciji B1.

Z zavihki nad seznamom preklopite med nalogami **Assigned to Me**, **Assigned to My Groups** in **Requested by Me**. Vsak zavihek prikazuje, koliko nalog vsebuje.

:::tip
Privzeto so prikazane samo odprte naloge. Izberite **Closed** nad seznamom, če želite namesto tega videti dokončane naloge.
:::

## Ustvarjanje naloge

1. Na strani **My Work** kliknite **Add Task**. Odpre se obrazec **New Task**.
2. Po želji kliknite polje **Associate with** in izberite osebo ali skupino, na katero se naloga nanaša. Pustite prazno, če gre za preprosto opravilo, ki se ne nanaša na nikogar, na primer opomnik zase.
3. Kliknite polje **Assign to**. V oknu **Select a Person or Group** iščite na zavihku **Person** ali preklopite na zavihek **Group** in poiščite skupino, nato izberite rezultat.
4. Vnesite **Title** naloge.
5. Po želji izberite **Due date**.
6. Dodajte **Notes** z morebitnimi podrobnostmi ali navodili za prejemnika.
7. Kliknite **Save**.

Naloga se bo zdaj prikazala na seznamu nalog in bo prejemniku vidna na njegovi nadzorni plošči ter v mobilni aplikaciji.

## Upravljanje naloge

Kliknite katero koli nalogo, da odprete njeno podrobno stran. Tukaj lahko:

- **Zaprete ali znova odprete nalogo** -- Ko je delo opravljeno, kliknite **Close task**, da jo zaprete, ali **Reopen task**, da jo znova odprete.
- **Ponovno dodelite nalogo** -- Kliknite **Assign**, da izberete drugo osebo ali skupino.
- **Spremenite, na koga se nanaša** -- Kliknite **Associate**, da izberete drugo osebo ali skupino, ali izberite **No person or group**, da povezavo odstranite.
- **Spremenite rok** -- Izberite datum v polju **Due**; shrani se, ko kliknete drugam. (Naloge, ustvarjene za [potrditev dodelitve pri oddaji storitve](./workflows.md#serving-assignment-confirmations), prikazujejo svoj rok, vendar ga tukaj ni mogoče spremeniti.)
- **Dodajte opombe** -- Objavite posodobitve ali podrobnosti za prejemnika v opombah naloge.
- **Nastavite opomnike** -- Glejte [Opomniki za naloge](#task-reminders) spodaj.

## Opomniki za naloge

Naloga z rokom lahko prejemnika opomni pred iztekom roka.

1. Na strani naloge kliknite **Edit** poleg **Reminders**.
2. Vklopite **Send reminders for this task**.
3. Pod **When should reminders go out?** izberite do tri termine: **7 days before**, **3 days before**, **1 day before** ali **Day of**.
4. Nastavite **Time of Day** in po želji **Message**.
5. Pod **Send By** izberite **Push**, **Email** in, če je vaša cerkev povezana s [ponudnikom SMS-sporočil](../settings/church-settings.md#texting), **Text**.
6. Kliknite **Save Reminders**.

Če naloga nima roka, vas B1 opozori, da opomniki ne bodo poslani, dokler rok ni nastavljen v polju **Due**. Opomniki v obliki SMS-sporočil dosežejo le osebe, ki so v svojih [nastavitvah obvestil](../../b1-church/getting-started/notification-preferences.md) vklopile **Text messages**, pri čemer lahko vsako sporočilo stane vašo cerkev.

## Življenjski cikel naloge

1. Nova naloga se začne s stanjem **Open**.
2. Prejemnik prejme obvestilo in lahko nalogo pregleda na svoji nadzorni plošči, v **Serving > My Work** ali v mobilni aplikaciji.
3. Ko je delo opravljeno, prejemnik (ali skrbnik) klikne **Close task**.
4. Zaprte naloge se izpustijo iz privzetega pogleda, vendar jih še vedno lahko najdete, če nad seznamom nalog izberete **Closed**.

:::info
B1 Admin ne ustvarja več ponavljajočih se nalog po urniku. Za ponavljajoče se spremljanje oseb uporabite [delovni tok](./workflows.md) s [sprožilcem urnika](./workflows.md#schedule-triggers).
:::

:::tip
Kadar želite več ljudi pripeljati skozi isti niz faz -- na primer spremljanje novih obiskovalcev ali postopek včlanitve -- uporabite [Delovne tokove](./workflows.md). Delovni tokovi naloge spremenijo v kartice na tabli za povleci-in-spusti s koraki, roki in usmerjanjem.
:::

:::info
Nekatere naloge samodejno ustvarjajo drugi deli B1 in se odprejo na posebni kartici za pregled namesto standardnega pogleda za opombe/ponovno dodelitev -- [zahteve za pridružitev skupini](../groups/group-join-requests.md#approving-from-the-tasks-page), [zahteve za spremembo profila](../profile/approving-profile-changes.md) in [zahteve za brisanje računa](../profile/account-deletion.md) delujejo na enak način.
:::

## Naslednji koraki

- Pripeljite ljudi skozi večstopenjski postopek z [Delovnimi tokovi](./workflows.md)
- Uporabite [Delovne tokove](./workflows.md), da ljudi samodejno vodite skozi ponovljive postopke
- Uporabite naloge skupaj z [Načrti bogoslužja](./plans.md), da spremljate opravila pri pripravi bogoslužja
