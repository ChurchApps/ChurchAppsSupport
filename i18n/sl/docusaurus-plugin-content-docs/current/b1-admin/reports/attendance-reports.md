---
title: "Izvoz poročil o udeležbi"
description: "Spoznajte tri poročila o udeležbi v B1 Admin (Trend udeležbe, Udeležba skupin, Dnevna udeležba skupin), kaj prikazuje vsako od njih, ter kako jih zaženete in izvozite."
---

# Poročila o udeležbi

<div class="article-intro">

B1 Admin ponuja tri poročila o udeležbi, ki vam pomagajo razumeti, kako se ljudje udeležujejo vaših bogoslužij in skupin. Vsako poročilo ponuja drugačen pogled na podatke o udeležbi, od splošnih trendov do dnevnih razčlenitev.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Poskrbite, da se udeležba dosledno [beleži](../attendance/tracking-attendance.md) za vaša bogoslužja in skupine
- Preverite, ali so vaše [skupine](../groups/creating-groups.md) in bogoslužja nastavljeni v B1 Admin
- Za dostop do poročil potrebujete ustrezna [dovoljenja](../settings/roles-permissions.md)

</div>

## Trend udeležbe

Poročilo o trendu udeležbe prikazuje, kako se udeležba vaših bogoslužij spreminja skozi čas.

1. V brskalniku pojdite neposredno na **admin.b1.church/reports/attendanceTrend** (poročila nimajo vnosa v navigacijskem meniju – najlažji način, da se vrnete nanje, je, da si naslov shranite med zaznamke). Isto poročilo je na voljo tudi na strani Udeležba: kliknite **Vsa leta**, nato izberite zavihek **Trend udeležbe**.
2. Po želji izberite **Zbor**, **Bogoslužje**, **Čas bogoslužja** ali **Skupino**, da filtrirate rezultate.
3. Nastavite **Datum začetka** in **Datum konca**. Privzeto poročilo zajema zadnje leto, od pred enega leta do danes, datum konca pa je vključen v celoti. Kliknite **Zaženi poročilo**.
4. Poročilo prikaže stolpični grafikon in tabelo skupnega števila obiskov na teden. Vsak teden je označen z datumom nedelje tistega tedna, stolpec **Datumi srečanj** v tabeli pa navaja dejanske datume v tem tednu, ko je bila zabeležena udeležba (na primer "9/27, 9/30").

To poročilo je uporabno za prepoznavanje vzorcev, kot so sezonski upadi, rast ali vpliv posebnih dogodkov.

## Udeležba v skupinah

Poročilo o udeležbi v skupinah prikazuje, kdo se je udeležil posameznega srečanja skupine v določenem obdobju.

1. V brskalniku pojdite neposredno na **admin.b1.church/reports/groupAttendance** ali pa na strani Udeležba kliknite **Vsa leta** in izberite zavihek **Udeležba v skupinah**.
2. Po želji izberite **Zbor** in **Bogoslužje**.
3. Nastavite **Datum začetka** in **Datum konca**. Privzeto poročilo zajema obdobje od zadnje nedelje do danes, datum konca pa je vključen v celoti.
4. Kliknite **Zaženi poročilo**.

Rezultati so razvrščeni po datumu srečanja, nato po času bogoslužja, nato po skupini, pod vsako skupino pa so navedeni ljudje, ki so se udeležili. Časi bogoslužij, skupine in imena so razvrščeni po abecedi. Ob imenu vsake osebe stolpec **Prijavljen ob** prikazuje čas, ob katerem je bila njena udeležba zabeležena (prazno, če čas ni shranjen), stolpec **Status članstva** pa prikazuje njen status, na primer Član ali Obiskovalec. Vključena so tudi srečanja za skupine, ki se ne srečujejo ob določenem času bogoslužja; ta se prikažejo brez časa bogoslužja.

Za prenos preglednice kliknite **Možnosti prenosa** in izberite **Povzetek**. Datoteka CSV vsebuje:

- Eno vrstico za vsakega člana vsake skupine, ki se je srečala v določenem obdobju, razvrščeno po skupini in nato po imenu.
- Ime osebe in ime skupine v prvih stolpcih.
- En stolpec za vsako datirano srečanje, poimenovan z bogoslužjem, časom bogoslužja in datumom (na primer "Nedelja - 9:00 (2026-09-27)"), pri čemer je vsaka oseba označena kot **prisotna** ali **odsotna**. Srečanje brez časa bogoslužja je poimenovano samo z datumom.

To poročilo uporabite za primerjavo udeležbe med skupinami in za prepoznavanje skupin, ki rastejo ali potrebujejo pozornost.

## Dnevna udeležba v skupinah

Poročilo o dnevni udeležbi v skupinah (z naslovom **Udeležba v skupini po dnevih**) prikazuje dnevno število ljudi, ki so se udeležili ene skupine.

1. V brskalniku pojdite neposredno na **admin.b1.church/reports/dailyGroupAttendance**.
2. S spustnimi seznami **Zbor**, **Bogoslužje** in **Čas bogoslužja** zožite seznam, nato izberite **Skupino**, ki jo želite pregledati.
3. Zaženite poročilo. Prikaže vsak dan, ko se je skupina srečala, od najstarejšega do najnovejšega, z **Datumom** in številom **Udeležencev**, zabeleženih tisti dan.

To poročilo ponuja podrobnejši pregled, ki je koristen za razumevanje nihanj iz tedna v teden ali za prepoznavanje posameznih dni z neobičajno visoko ali nizko udeležbo.

:::tip
Za splošen pregled uporabite poročilo o trendu udeležbe, za podroben pregled posameznih datumov pa poročilo o dnevni udeležbi v skupinah.
:::

## Praktična uporaba

- **Načrtovanje** -- Z uporabo trendov udeležbe načrtujte sedeže, osebje in vire za prihajajoča bogoslužja.
- **Doseg** -- Zgodaj prepoznajte upadajoče vzorce udeležbe, da lahko sledite članom.
- **Poročila za odbor** -- Vključite podatke o udeležbi v redna poročila vodstva, da prikažete stanje službe.
- **Vrednotenje dogodkov** -- Primerjajte udeležbo pred in po posebnih dogodkih, da izmerite njihov vpliv.

:::warning
Podatki o udeležbi se zapisujejo prek postopkov prijave v vaše skupine in bogoslužja. Če se udeležba ne beleži dosledno, poročila ne bodo natančno odražala dejanske udeležbe. Navodila za nastavitev najdete v razdelku [Beleženje udeležbe](../attendance/tracking-attendance.md).
:::
