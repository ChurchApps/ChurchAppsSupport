---
title: "Eseményemlékeztetők"
description: "Eseményemlékeztetők beállítása a B1 Admin-ban push-értesítéshez, e-mailhez és SMS-hez: időzítés, címzettek és egyedi üzenet, hogy időben értesüljenek."
---

# Eseményemlékeztetők

<div class="article-intro">

Az eseményemlékeztetők automatikusan értesítik a megfelelő embereket egy esemény előtt, például: „Ne maradj le róla! A egészségügyi műhely holnap 9:00-kor kezdődik.” Az emlékeztetőt egyszer kell beállítani az eseményen, és a B1 az ütemezett időpontban elküldi push-értesítésként, e-mailben, illetve – ha a gyülekezetben be van állítva az SMS-küldés – szöveges üzenetben. A tagok a saját [Értesítési beállításaik](../../b1-church/getting-started/notification-preferences.md) között szabályozhatják, hogy mely emlékeztetőket kapják meg.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Hozza létre azt az eseményt, amelyre emlékeztetni szeretné az embereket (lásd: [Naptárak létrehozása](./creating-calendars.md))
- A regisztrált résztvevők eléréséhez [engedélyezze a regisztrációt](./creating-calendars.md) az eseményen
- Egy teljes csoport eléréséhez győződjön meg róla, hogy az esemény egy olyan [csoporthoz](../groups/creating-groups.md) tartozik, amelynek vannak tagjai

</div>

## Emlékeztető beállítása

Az emlékeztetőket az esemény **Emlékeztetők** szakaszában állíthatja be.

- Új esemény **létrehozásakor** a mentés előtt bontsa ki az **Emlékeztetők** szakaszt az eseményszerkesztőben.
- Meglévő eseménynél nyissa meg az esemény **Regisztráció részletei** oldalát (a **Regisztrációk** szakaszból), és ott adja hozzá vagy módosítsa az emlékeztetőt.

1. Kapcsolja be az **Emlékeztetők engedélyezése** opciót.
2. Válassza ki a **Mikor** beállítást: legfeljebb három időpontot jelölhet be: **7 nappal előtte**, **3 nappal előtte**, **1 nappal előtte** és **Aznap**.
3. Állítsa be a **Napszakot**, amikor az emlékeztetőnek ki kell mennie (alapértelmezés: **9:00**, a gyülekezete [időzónája](../settings/church-settings.md#time-zone) szerint).
4. Válassza ki, hogy **kinek** küldje (lásd lent: [Kik kapnak emlékeztetőt](#who-gets-reminded)).
5. Opcionálisan adjon meg egy **Üzenetet**. Ha üresen hagyja, az alapértelmezett szöveg lesz használva, vagy megírhatja a sajátját – ide beírhatja a `{{eventTitle}}` kifejezést is, amely az esemény nevével lesz helyettesítve.
6. Válassza ki a **Csatornákat**: **Push-értesítés**, **E-mail** és – ha a gyülekezete csatlakoztatott [SMS-szolgáltatót](../settings/church-settings.md#texting) – **SMS**.
7. Mentse az eseményt.

A módosítások közben az **élő előnézet** megmutatja, nagyjából hány embernek megy ki az emlékeztető, hány résztvevő nem érhető el, valamint a következő tervezett küldési időpontokat, így a mentés előtt ellenőrizheti, hogy az emlékeztető a várt módon fog-e működni.

## Kik kapnak emlékeztetőt

A **Kinek** beállítás határozza meg, kinek megy az emlékeztető:

- **Csak a regisztráltak** – Mindenki, aki regisztrált az eseményre, és egy személyi adatlaphoz van kapcsolva. Ez az alapértelmezett, ha az eseményen be van kapcsolva a regisztráció, így egy kis létszámú regisztrált eseményhez szóló emlékeztető soha nem megy véletlenül egy egész csoportnak.
- **Csak a regisztrálók / háztartásfők** – Regisztrációnként egy emlékeztető (a regisztrált személynek), nem pedig a regisztráción szereplő minden családtagnak.
- **Csoporttagok** – Az esemény csoportjának minden tagja. Ez az alapértelmezett, ha az esemény nem használ regisztrációt.
- **Automatikus** – Ha a regisztráció be van kapcsolva, a regisztráltakat használja, ellenkező esetben a csoportot.

:::info
A csak névvel megadott vendégek (személyi adatlap nélkül) nem kaphatnak emlékeztetőt, mert nincs olyan fiók, eszköz vagy e-mail-cím, amelyre el lehetne küldeni. Az előnézet megmutatja, hány résztvevő esik ebbe a csoportba, hogy ne érje meglepetés. A kommunikációról leiratkozott tagok szintén kimaradnak.
:::

## Mikor küldjük ki az emlékeztetőket

- Az emlékeztetők a **kiválasztott napszakban** indulnak, a gyülekezet helyi időzónája szerint, a kiválasztott időpontok mindegyikén.
- Ha **megváltoztatja az esemény dátumát vagy időpontját**, a függőben lévő emlékeztetők automatikusan újraütemeződnek – nem kell az emlékeztetőt külön szerkesztenie.
- Ha **törli az eseményt** (vagy egy ismétlődő esemény egyetlen előfordulását), a hozzá tartozó függőben lévő emlékeztetők automatikusan törlődnek.
- Az ismétlődő eseményeket a rendszer automatikusan kezeli: minden közelgő előfordulás külön emlékeztetőt kap.

:::tip
Az emlékeztetők elsősorban **push-értesítésként** mennek ki, e-mail pedig tartalékként szolgál. Ha egy tagnak be van kapcsolva a push-értesítés, push-üzenetet kap; ha nincs, helyette e-mailt. A tagok értesítéstípusonként döntik el, mely csatornákat szeretnék, az [Értesítési beállításaikban](../../b1-church/getting-started/notification-preferences.md).
:::

## Szöveges emlékeztetők

Az **SMS** csatorna csak akkor jelenik meg, ha a gyülekezete csatlakoztatott egy SMS-szolgáltatót. Az üzenetek a gyülekezet SMS-szolgáltatóján keresztül mennek ki, és minden üzenet költséget jelenthet a gyülekezet számára. Ezek a push- vagy e-mail-emlékeztetők mellé küldődnek, és kizárólag azoknak, akik:

- bekapcsolták az **SMS-üzenetek** opciót az [Értesítési beállításaikban](../../b1-church/getting-started/notification-preferences.md), és
- van mobilszám a profiljukon.

Minden SMS a gyülekezet nevével kezdődik, egyetlen SMS-be fér bele, és a következő mondattal zárul: „Leiratkozáshoz válaszoljon STOP üzenettel.” Aki STOP-ot küld vissza, nem kap többé SMS-t a gyülekezettől. Ahhoz, hogy a STOP-válaszok eljussanak a B1-hez, másolja be a **bejövő (STOP) webhook URL-t** az [SMS-beállításaiból](../settings/church-settings.md#texting) a szolgáltatója bejövő üzenetekhez tartozó webhook-beállításába.

## Mit szabályozhatnak a tagok

Az emlékeztetők mindig tiszteletben tartják az egyes tagok [Értesítési beállításait](../../b1-church/getting-started/notification-preferences.md). A tag:

- kikapcsolhatja az **Eseményemlékeztetőket** push, e-mail vagy SMS csatornán, miközben a többi értesítés marad bekapcsolva,
- az **SMS-üzenetek** opcióval be- vagy kikapcsolhatja a szöveges emlékeztetőket,
- beállíthat **csendes órákat**, hogy a nem sürgős értesítések észszerű időpontig várakozzanak.

A tag eseményemlékeztetőről való leiratkozási döntését nem írhatja felül: ez biztosítja, hogy a B1 megfeleljen a spamellenes szabályoknak, és a tagok megtarthassák az irányítást a postaládájuk felett.

## Szolgálati emlékeztetők

A tervben szolgálatra beosztott önkéntesek külön **szolgálati emlékeztetőt** kapnak a terv részleteivel, és ha még nem válaszoltak, közvetlenül az e-mailben megjelennek az **Elfogadás / Elutasítás** gombok. Ezek az emlékeztetők a tervtípuson állíthatók be, nem egy naptáresemény esetében, és SMS-ben is kimehetnek. Az önkéntes-beosztás és az emlékeztetők működéséről lásd: [Önkéntes emlékeztetők](../serving/plans.md#volunteer-reminders) és [Vasárnapi önkéntesek](../guides/sunday-volunteers.md).

## Következő lépések

- [Értesítési beállítások](../../b1-church/getting-started/notification-preferences.md) – Amit a tagok szabályozhatnak
- [Eseményregisztrációs útmutató](../guides/event-registration.md) – A regisztráció beállítása, hogy az emlékeztetők elérjék a résztvevőket
- [Naptárak létrehozása](./creating-calendars.md) – Vissza a naptárbeállításhoz
