---
title: "Attendance Reports"
---

# Attendance Reports

<div class="article-intro">

B1 Admin nudi tri izvještaja o posjećenosti koji vam pomažu razumjeti kako se ljudi uključuju u vaše službe i grupe. Svaki izvještaj nudi drugačiju perspektivu na podatke o posjećenosti, od općih trendova do dnevnih pregleda.

</div>

<div class="prereqs">
<h4>Prije nego počnete</h4>

- Provjerite da se posjećenost dosljedno [bilježi](../attendance/tracking-attendance.md) za vaše službe i grupe
- Provjerite jesu li vaše [grupe](../groups/creating-groups.md) i službe postavljene u B1 Admin
- Potrebne su vam odgovarajuće [dozvole](../settings/roles-permissions.md) za pristup izvještajima

</div>

## Trend posjećenosti

Izvještaj o trendu posjećenosti prikazuje kako se posjećenost vaših službi mijenja tijekom vremena.

1. Idite izravno na **admin.b1.church/reports/attendanceTrend** u svom pregledniku (izvještaji nemaju stavku u izborniku za navigaciju, pa je najlakši način za povratak na njih spremanje adrese u oznake). Isti izvještaj nalazi se i na stranici Posjećenost: kliknite **All years**, a zatim odaberite karticu **Attendance Trend**.
2. Po želji odaberite **Campus**, **Service**, **Service Time** ili **Group** kako biste filtrirali rezultate.
3. Postavite **Start Date** i **End Date**. Prema zadanim postavkama izvještaj obuhvaća protekla godinu dana, od prije godinu dana do danas, a krajnji datum uključen je u cijelosti. Kliknite **Run Report**.
4. Izvještaj prikazuje stupčasti grafikon i tablicu ukupnih posjeta po tjednu. Svaki tjedan označen je datumom nedjelje tog tjedna, a stupac **Session Dates** u tablici navodi stvarne datume u tom tjednu na koje je bilo posjećenosti (na primjer, „9/27, 9/30”).

Ovaj izvještaj koristan je za uočavanje obrazaca poput sezonskih padova, rasta ili utjecaja posebnih događaja.

## Posjećenost grupa

Izvještaj o posjećenosti grupa prikazuje tko je sudjelovao u svakom sastanku grupe u određenom razdoblju.

1. Idite izravno na **admin.b1.church/reports/groupAttendance** u svom pregledniku ili na stranici Posjećenost kliknite **All years** i odaberite karticu **Group Attendance**.
2. Po želji odaberite **Campus** i **Service**.
3. Postavite **Start Date** i **End Date**. Prema zadanim postavkama izvještaj obuhvaća razdoblje od prošle nedjelje do danas, a krajnji datum uključen je u cijelosti.
4. Kliknite **Run Report**.

Rezultati su grupirani prema datumu sastanka, zatim prema vremenu službe, pa prema grupi, a sudionici su navedeni ispod svake grupe. Vremena službi, grupe i imena poredani su abecednim redom. Pored imena svake osobe, stupac **Checked In** prikazuje vrijeme kada je njezina posjećenost zabilježena (prazno ako vrijeme nije evidentirano), a stupac **Membership Status** prikazuje njezin status, primjerice Member ili Visitor. Uključeni su i sastanci grupa koje se ne održavaju u određeno vrijeme službe; oni se prikazuju bez vremena službe.

Za preuzimanje proračunske tablice kliknite **Download Options** i odaberite **Summary**. CSV datoteka sadrži:

- Jedan redak za svakog člana svake grupe koja se sastala u navedenom razdoblju, sortiran prema grupi, a zatim prema imenu.
- Ime osobe i naziv grupe u prvim stupcima.
- Jedan stupac za svaki datirani sastanak, nazvan prema službi, vremenu službe i datumu (na primjer, „Sunday - 9:00 AM (2026-09-27)”), pri čemu je svaka osoba označena kao **present** ili **absent**. Sastanak bez vremena službe imenovan je samo prema datumu.

Koristite ovaj izvještaj za usporedbu posjećenosti među grupama i utvrđivanje koje grupe rastu ili zahtijevaju pozornost.

## Dnevna posjećenost grupa

Izvještaj o dnevnoj posjećenosti grupa (naslovljen **Group attendance by day**) prikazuje broj ljudi koji su sudjelovali u jednoj grupi, dan po dan.

1. Idite izravno na **admin.b1.church/reports/dailyGroupAttendance** u svom pregledniku.
2. Upotrijebite padajuće izbornike **Campus**, **Service** i **Service Time** kako biste suzili popis, zatim odaberite **Group** koju želite pregledati.
3. Pokrenite izvještaj. Prikazuje svaki dan u kojem se grupa sastala, od najstarijeg prema najnovijem, sa stupcem **Date** i brojem **Attendees** zabilježenih tog dana.

Ovaj izvještaj pruža detaljan uvid, koristan za razumijevanje tjednih razlika ili utvrđivanje pojedinih dana s neobično visokom ili niskom posjećenošću.

:::tip
Koristite izvještaj o trendu posjećenosti za opći pregled, a izvještaj o dnevnoj posjećenosti grupa kada trebate detaljnije pregledati određene datume.
:::

## Praktična primjena

- **Planiranje** -- Koristite trendove posjećenosti za planiranje sjedenja, osoblja i resursa za nadolazeće službe.
- **Doseg** -- Pravovremeno uočite opadajuće obrasce posjećenosti kako biste mogli kontaktirati članove.
- **Izvještaji za upravu** -- Uključite podatke o posjećenosti u redovite izvještaje za vodstvo kako biste pokazali zdravlje službe.
- **Procjena događaja** -- Usporedite posjećenost prije i nakon posebnih događaja kako biste izmjerili njihov utjecaj.

:::warning
Podaci o posjećenosti bilježe se kroz procese prijave vaših grupa i službi. Ako se posjećenost ne bilježi dosljedno, izvještaji neće točno odražavati stvarno sudjelovanje. Upute za postavljanje potražite u [Bilježenje posjećenosti](../attendance/tracking-attendance.md).
:::
