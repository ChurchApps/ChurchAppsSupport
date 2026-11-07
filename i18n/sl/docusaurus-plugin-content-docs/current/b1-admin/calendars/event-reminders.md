---
title: "Opomniki za dogodke"
---

# Opomniki za dogodke

<div class="article-intro">

Opomniki za dogodke samodejno obvestijo prave ljudi pred dogodkom, na primer: „Ne zamudite! Zdravstvena delavnica se začne jutri ob 9.00.“ Opomnik nastavite enkrat na dogodku, B1 pa ga pošlje ob določenem času prek potisnih obvestil, e-pošte in, če ima vaša cerkev nastavljeno pošiljanje SMS-sporočil, tudi prek sporočil SMS. Člani lahko v svojih [nastavitvah obvestil](../../b1-church/getting-started/notification-preferences) sami izberejo, katere opomnike želijo prejemati.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Ustvarite dogodek, za katerega želite poslati opomnik (glejte [Ustvarjanje koledarjev](creating-calendars))
- Če želite doseči prijavljene udeležence, na dogodku [omogočite prijave](creating-calendars)
- Če želite doseči celotno skupino, poskrbite, da dogodek pripada [skupini](../groups/creating-groups) z družabniki

</div>

## Nastavitev opomnika

Opomnike nastavljate v razdelku **Opomniki** dogodka.

- Pri **ustvarjanju novega dogodka** razširite razdelek **Opomniki** v urejevalniku dogodkov, preden ga shranite.
- Pri **obstoječem dogodku** odprite stran **Podrobnosti prijave** dogodka (iz razdelka **Prijave**), da dodate ali spremenite opomnik.

1. Vklopite **Omogoči opomnike**.
2. Izberite **Kdaj** naj se pošlje. Izberete lahko do tri termine: **7 dni pred**, **3 dni pred**, **1 dan pred** in **na dan dogodka**.
3. Nastavite **čas dneva**, ob katerem naj se opomnik pošlje (privzeto je **9.00**, v [časovnem pasu](../settings/church-settings.md#time-zone) vaše cerkve).
4. Izberite, **koga** naj opomnik doseže (glejte [Kdo prejme opomnik](#who-gets-reminded) spodaj).
5. Po želji dodajte **Sporočilo**. Če ga pustite prazno, se uporabi privzeto besedilo, lahko pa napišete svojega. Vključite lahko `{{eventTitle}}`, ki bo nadomeščen z imenom dogodka.
6. Izberite **kanale**: **potisno obvestilo**, **e-pošto** in, če je vaša cerkev povezana z [ponudnikom SMS-sporočil](../settings/church-settings.md#texting), **SMS**.
7. Shranite dogodek.

Ko spreminjate nastavitve, vam **predogled v živo** prikaže približno število ljudi, ki bodo prejeli opomnik, število udeležencev, ki jih ni mogoče doseči, in naslednje načrtovane čase pošiljanja. Tako lahko preverite, ali je opomnik pravilen, še preden ga shranite.

## Kdo prejme opomnik

Nastavitev **Koga** določa, kdo prejme opomnik:

- **Samo prijavljeni** – Vsi, ki so se prijavili na dogodek in so povezani z zapisom osebe. To je privzeta izbira, kadar je na dogodku omogočena prijava, tako da opomnik za majhen dogodek s prijavami nikoli slučajno ne pride do cele skupine.
- **Samo nosilci / prijavljeni** – En opomnik na prijavo (osebi, ki se je prijavila), ne pa vsakemu družinskemu članu na prijavi.
- **Člani skupine** – Vsi v skupini dogodka. To je privzeta izbira, kadar dogodek ne uporablja prijav.
- **Samodejno** – Uporabi prijavljene, če je prijava omogočena, sicer pa skupino.

:::info
Gostje, dodani samo z imenom (brez povezanega zapisa osebe), ne morejo prejeti opomnika, ker ni računa, naprave ali e-poštnega naslova, na katerega bi ga poslali. Predogled vam pove, koliko udeležencev spada v to skupino, da ne boste presenečeni. Člani, ki so se odjavili od komunikacije, se prav tako preskočijo.
:::

## Kdaj se opomniki pošljejo

- Opomniki se sprožijo ob **času dneva, ki ga izberete**, po lokalnem času vaše cerkve, ob vsakem izbranem časovnem zamiku.
- Če **spremenite datum ali čas dogodka**, se čakajoči opomniki samodejno prestavijo. Opomnika ni treba urejati.
- Če **izbrišete dogodek** (ali prekličete posamezno ponovitev ponavljajočega se dogodka), se njegovi čakajoči opomniki samodejno prekličejo.
- Ponavljajoči se dogodki se obravnavajo samodejno: vsaka prihodnja ponovitev dobi svoj opomnik.

:::tip
Opomniki se pošiljajo najprej kot **potisna obvestila**, e-pošta pa je rezervna možnost. Če ima član vklopljena potisna obvestila, bo prejel potisno obvestilo; če ne, bo namesto tega prejel e-pošto. Člani lahko v svojih [nastavitvah obvestil](../../b1-church/getting-started/notification-preferences) izberejo kanale za vsako vrsto obvestila posebej.
:::

## Opomniki prek SMS-sporočil

Kanal **SMS** se prikaže le, kadar je vaša cerkev povezana z ponudnikom SMS-sporočil. Sporočila se pošiljajo prek ponudnika SMS-sporočil vaše cerkve, vsako sporočilo pa lahko vaši cerkvi stane. Pošljejo se poleg morebitnih potisnih obvestil ali opomnikov po e-pošti, in sicer samo osebam, ki:

- so v svojih [nastavitvah obvestil](../../b1-church/getting-started/notification-preferences) vklopile **SMS-sporočila**, in
- imajo v svojem profilu vnesено mobilno številko.

Vsako SMS-sporočilo se začne z imenom vaše cerkve, obsega eno samo SMS-sporočilo in se konča z besedilom „Odgovorite STOP, če se želite odjaviti.“ Kdor odgovori STOP, ne bo več prejemal SMS-sporočil od vaše cerkve. Da bodo odgovori STOP prispeli v B1, prilepite **URL spletne kljuke za dohodna sporočila (STOP)** iz vaših [nastavitev SMS-sporočil](../settings/church-settings.md#texting) v dohodno kljuko za sporočila pri svojem ponudniku.

## Kaj lahko nastavijo člani

Opomniki vedno upoštevajo [nastavitve obvestil](../../b1-church/getting-started/notification-preferences) posameznega člana. Član lahko:

- izklopi **opomnike za dogodke** za potisna obvestila, e-pošto ali SMS, druga obvestila pa pusti vklopljena.
- vklopi ali izklopi opomnike po SMS-u z možnostjo **SMS-sporočila**.
- nastavi **tihe ure**, da nenujna obvestila počakajo na primeren čas.

Odločitve člana, da se odjavi od opomnikov za dogodke, ne morete preglasiti. Tako B1 ostaja skladen s predpisi proti neželeni pošti, člani pa ohranjajo nadzor nad svojimi nabiralniki.

## Opomniki za bogoslužne službe

Prostovoljci, razporejeni v načrt, prejmejo ločen **opomnik za službo** s podrobnostmi o načrtu in, če se še niso odzvali, gumba **Sprejmi / Zavrni** neposredno v e-pošti. Ti opomniki se nastavljajo pri vrsti načrta, ne pri dogodku v koledarju, prav tako pa jih lahko pošljete tudi prek SMS-sporočil. Za več informacij o razporejanju prostovoljcev in opomnikih glejte [Opomniki za prostovoljce](../serving/plans#volunteer-reminders) in [Nedeljski prostovoljci](../guides/sunday-volunteers).

## Naslednji koraki

- [Nastavitve obvestil](../../b1-church/getting-started/notification-preferences) – Kaj lahko nastavijo člani
- [Vodnik za prijave na dogodke](../guides/event-registration) – Nastavite prijave, da bodo opomniki dosegli udeležence
- [Ustvarjanje koledarjev](creating-calendars) – Vrnitev na nastavitev koledarja
