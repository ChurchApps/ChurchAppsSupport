---
title: "Atribuirea rolurilor"
---

# Atribuirea rolurilor

<div class="article-intro">

B1 Admin folosește un sistem de permisiuni bazat pe roluri pentru a controla ce poate vedea și face fiecare utilizator din echipa dumneavoastră. Prin atribuirea rolurilor, le puteți oferi personalului și voluntarilor acces exact la zonele de care au nevoie -- și nimic în plus. Gestionarea corectă a rolurilor păstrează datele bisericii în siguranță și ajută echipa să lucreze eficient.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de acces **Domain Admin** sau de un rol cu permisiunea de a gestiona **Settings** (Setări) în B1 Admin.
- Persoanele cărora doriți să le atribuiți roluri trebuie să existe deja în directorul dumneavoastră. Consultați [Adăugarea persoanelor](adding-people.md) dacă trebuie să le adăugați mai întâi.

</div>

## Despre roluri

Un rol este un set de permisiuni pe care îl atribuiți unuia sau mai multor utilizatori. De exemplu, puteți crea un rol „Echipa financiară” care acordă acces la [înregistrările de donații](../donations/recording-donations.md) sau un rol „Voluntar la check-in” care permite doar accesul la [funcțiile de prezență](../attendance/check-in.md).

Fiecare rol controlează accesul la anumite zone ale B1 Admin, inclusiv:

- **People** (Persoane) -- vizualizarea și editarea profilurilor membrilor. Secțiunea Notes (Note) de pe fișa unei persoane necesită permisiunea **Edit People**, iar o permisiune separată, **View Confidential Notes** (Vizualizare note confidențiale), controlează accesul la secțiunea Confidential Notes (pentru îngrijire pastorală, istoric personal și note similare sensibile). **View People Names Only** (Vizualizare doar a numelor persoanelor) permite cuiva să caute persoane după nume (vede doar numele, fotografia și statutul de membru), fără acces la directorul complet. Combinată cu **View Attendance** (Vizualizare prezență) sau **Edit Attendance** (Editare prezență), permite unui voluntar să deschidă **Groups** (Grupuri) și să vadă listele claselor după nume; cu **Edit Attendance**, poate, de asemenea, să [înregistreze prezența](../attendance/recording-attendance.md). Consultați [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** (Donații) -- gestionarea contribuțiilor și a rapoartelor financiare. **Enter Donations** (Introducere donații) este o opțiune mai restrânsă pentru echipele de numărare: permite cuiva să introducă daruri, dar doar în [loturile](../donations/batches.md#who-can-change-a-batch) care sunt încă deschise.
- **Attendance** (Prezență) -- înregistrarea și vizualizarea datelor de prezență
- **Forms** (Formulare) -- crearea și gestionarea [formularelor personalizate](../forms/creating-forms.md)
- **Groups** (Grupuri) -- gestionarea [apartenenței la grupuri](../groups/group-members.md) și a calendarelor
- **Settings** (Setări) -- configurarea setărilor la nivel de biserică

:::warning
**Domain Admins** (Administratorii domeniului) au acces complet la toate zonele B1 Admin. Permisiunile lor nu pot fi editate sau restricționate. Folosiți acest rol doar pentru administratorii principali.
:::

## Vizualizarea și gestionarea rolurilor

1. Deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus al B1 Admin) și extindeți **Settings** (Setări).
2. Faceți clic pe **Roles** (Roluri).
3. Veți vedea lista tuturor rolurilor configurate pentru biserica dumneavoastră, cu o coloană **Members** (Membri) care arată câți utilizatori sunt în fiecare rol.
4. Faceți clic pe orice rol pentru a vedea membrii și permisiunile acestuia.

## Adăugarea utilizatorilor într-un rol

1. În meniul Jump, alegeți **Settings > Roles** (Setări > Roluri).
2. Faceți clic pe rolul la care doriți să adăugați un utilizator.
3. În secțiunea **Members** (Membri), căutați persoana după nume.
4. Faceți clic pe **Add** (Adaugă) pentru a o atribui rolului.

Utilizatorul va avea acum toate permisiunile asociate cu acel rol de la următoarea autentificare.

## Editarea permisiunilor unui rol

1. În meniul Jump, alegeți **Settings > Roles** (Setări > Roluri).
2. Faceți clic pe rolul pe care doriți să îl modificați.
3. În secțiunea **Permissions** (Permisiuni), bifați sau debifați zonele la care doriți ca rolul să aibă acces. Fiecare grup de permisiuni arată câte dintre permisiunile sale sunt bifate (de exemplu, **2 of 5** -- 2 din 5).
4. Fiecare modificare se salvează imediat ce bifați sau debifați o casetă.

:::tip
Respectați principiul privilegiului minim -- acordați fiecărui rol doar permisiunile de care chiar are nevoie. Acest lucru păstrează datele în siguranță și reduce riscul modificărilor accidentale.
:::

## Exemple comune de roluri

- **Personal de birou** -- acces la People, Donations, Attendance și Forms
- **Lideri de grupuri** -- acces doar la [Groups](../groups/creating-groups.md)
- **Voluntari la check-in** -- permisiunea de prezență **Checkin**, de care are nevoie contul conectat la un [chioșc de check-in](../attendance/check-in.md)
- **Echipa financiară** -- acces la [Donations](../donations/recording-donations.md) și rapoarte
- **Echipa de numărare** -- **Enter Donations** și **View Donations**, astfel încât voluntarii să poată introduce colecta în loturile deschise fără să vadă sumarele donațiilor

Consultați [Roles & Permissions](../settings/roles-permissions.md) pentru o prezentare mai detaliată a permisiunilor legate de donații și persoane.
