---
title: "Ghid: Configurarea check-in-ului pentru ministerul copiilor"
---

# Configurarea check-in-ului pentru ministerul copiilor

<div class="article-intro">

Acest ghid vă parcurge tot ce este necesar pentru a pune în funcțiune un sistem de check-in pentru copii în biserica dumneavoastră: de la adăugarea familiilor în baza de date, la configurarea grupelor potrivite pentru fiecare vârstă, până la tipărirea etichetelor cu nume în dimineața de duminică. Până la final, părinții vor putea să își înregistreze copiii la o tabletă de tip chiosc și vor primi un tag de securitate care se potrivește cu al copilului.

</div>

## Videoclip de instruire

<YouTube id="Ep9CBUcJwPI" title="Configurarea check-in-ului pentru copii în B1" next="Înregistrarea și urmărirea prezenței în B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Creați-vă contul bisericii la [admin.b1.church](https://admin.b1.church)
- Asigurați-vă că aveți acces de administrator — consultați [Roluri și permisiuni](../people/roles-permissions.md), dacă este necesar
- Opțional: pregătiți un fișier CSV cu familiile, dacă migrați de la un alt sistem

</div>

## Pasul 1: Adăugați familiile în baza de date

Înainte ca check-in-ul să poată funcționa, sistemul trebuie să cunoască familiile dumneavoastră. Fiecare copil trebuie legat de un părinte prin funcția de gospodărie.

Urmați ghidul [Adăugarea persoanelor](../people/adding-people.md) pentru a adăuga cel puțin o familie. Asigurați-vă că:

- Adăugați mai întâi părintele (părinții)
- Adăugați fiecare copil
- Îi legați în aceeași gospodărie folosind [editorul de gospodării](../people/adding-people.md#managing-households)

:::tip
Dacă aveți mai mult de câteva familii de adăugat, folosiți instrumentul de [import CSV](../people/importing-data.md) în loc să le adăugați una câte una. Puteți importa întregul dumneavoastră registru în câteva minute.
:::

## Pasul 2: Creați grupele pentru copii

Grupele definesc clasele în care copiii se înregistrează. De obicei, veți dori câte o grupă pentru fiecare interval de vârstă.

Urmați ghidul [Crearea grupelor](../groups/creating-groups.md) pentru a crea grupe precum:

- **Grădiniță pentru bebeluși** (0–2 ani)
- **Preșcolari** (3–5 ani)
- **Școlari mici** (6–10 ani)

Puteți ajusta denumirile și intervalele de vârstă, astfel încât să corespundă structurii ministerului dumneavoastră.

## Pasul 3: Configurați campusurile și serviciile

Check-in-ul este legat de anumite ore de slujbă. Trebuie să configurați cel puțin un campus și un serviciu.

Urmați ghidul [Configurarea prezenței](../attendance/setup.md) pentru a:

1. Adăuga campusul dumneavoastră (de exemplu, „Campusul Principal”)
2. Adăuga un serviciu (de exemplu, „Dimineața de duminică”)
3. Seta ora serviciului (de exemplu, „9:00”) și, opțional, un [program de check-in](../attendance/setup.md#setting-a-check-in-schedule), astfel încât check-in-ul să se deschidă automat înainte de fiecare serviciu și să se închidă după acesta
4. Atribui grupele pentru copii serviciului

## Pasul 4: Configurați aplicația de check-in

Acum conectați totul prin instalarea aplicației de check-in pe o tabletă.

1. Instalați aplicația **B1 Checkin** — consultați articolul [Check-In](../attendance/check-in.md) pentru linkurile de descărcare
2. Autentificați-vă cu datele dumneavoastră de acces B1 Admin
3. Selectați campusul și ora serviciului

Consultați articolul complet [Check-In](../attendance/check-in.md) pentru pașii detaliați de configurare.

## Pasul 5: Procurați echipamentele

Aveți nevoie de o tabletă pentru chiosc și, opțional, de o imprimantă de etichete Brother pentru etichetele cu nume.

Strict necesar:
- **O tabletă Android sau Amazon Fire** — consultați [tabletele recomandate](../attendance/check-in.md#recommended-hardware)
- **O imprimantă de etichete Brother** — se recomandă QL-1110NWB pentru suportul Bluetooth și WiFi
- **Etichete Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Doar imprimantele de etichete Brother sunt compatibile cu aplicația B1 Checkin. Imprimantele de alte mărci nu vor funcționa.
:::

## Pasul 6: Efectuați un test de check-in

Înainte de dimineața de duminică, faceți o rulare de probă:

1. Deschideți aplicația B1 Checkin pe tableta dumneavoastră
2. Selectați campusul și ora corectă a serviciului
3. Căutați una dintre familiile pe care le-ați adăugat
4. Înregistrați un copil și verificați:
   - Că prezența apare în B1 Admin, la **Prezențe**
   - Dacă folosiți o imprimantă, că eticheta cu nume se tipărește corect

:::tip
Instruiți voluntarii din echipa de primire despre procesul de check-in înainte de lansare. De obicei, este suficientă o scurtă prezentare de 5 minute.
:::

## Gata!

Check-in-ul pentru ministerul copiilor este gata. Părinții pot căuta familia, pot selecta copiii și pot face check-in la chiosc. Prezența este înregistrată automat în B1 Admin.

## Articole conexe

- [Adăugarea persoanelor](../people/adding-people.md) — adăugați mai multe familii pe măsură ce vin în vizită
- [Crearea grupelor](../groups/creating-groups.md) — gestionați grupele copiilor
- [Configurarea prezenței](../attendance/setup.md) — configurați campusurile și serviciile
- [Check-In](../attendance/check-in.md) — configurarea detaliată a aplicației de check-in și a echipamentelor
- [Urmărirea prezenței](../attendance/tracking-attendance.md) — vizualizați rapoartele de check-in
