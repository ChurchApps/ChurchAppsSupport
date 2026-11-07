---
title: "Introducere și tendințe ale numărului de participanți"
description: "Introduceți în B1 Admin numărul total de participanți pentru un serviciu sau grup, fără listă nominală, și urmăriți tendința în raportul Headcount Trend."
---

# Introducere și tendințe ale numărului de participanți

<div class="article-intro">

Numărul de participanți vă permite să înregistrați un total simplu al prezenței -- pentru o slujbă, un interval orar sau un grup -- fără a verifica o listă nominală. Folosiți-l atunci când doriți doar să știți „câte persoane au fost prezente”, iar apoi asociați-l cu raportul Headcount Trend pentru a urmări evoluția acestui număr în timp.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Campusurile, slujbele și intervalele orare trebuie să fie configurate. Consultați [Configurarea prezenței](setup.md).
- Introducerea unui număr de participanți necesită permisiunea **Attendance &gt; Edit**; vizualizarea raportului de tendințe necesită **Attendance &gt; View**. Consultați [Roluri și permisiuni](../settings/roles-permissions.md).

</div>

:::info
Numărul de participanți este o alternativă care reține doar totalul, în locul [Înregistrării prezenței](recording-attendance.md). Dacă trebuie să știți **cine** a participat -- de exemplu, pentru a contacta persoanele care nu au mai revenit -- continuați să folosiți prezența nominală pe sesiune din secțiunea Sessions a unui grup. Numărul de participanți stochează doar o cifră.
:::

## Înregistrarea numărului de participanți

1. Deschideți **B1 Admin**, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul stânga sus), extindeți **People** și faceți clic pe **Attendance**.
2. Faceți clic pe **Enter headcount** în coloana din stânga.
3. Completați formularul:
   - **Service** *(obligatoriu)*
   - **Service Time** -- lăsați necompletat pentru a înregistra un total pentru toate intervalele orare
   - **Group** -- opțional; sunt afișate doar grupurile cu Track Attendance activat. Lăsați necompletat pentru „No group (whole service)”.
   - **Date**
   - **Headcount** -- numărul total de persoane prezente
4. Faceți clic pe **Save**.

Tabelul **Recent Headcounts** de lângă formular listează ultimele înregistrări, cu data, slujba, intervalul orar, grupul și numărul. Faceți clic pe un rând pentru a-l încărca din nou în formular, dacă trebuie să corectați sau să ștergeți înregistrarea.

## Raportul de tendințe al numărului de participanți

1. Din aceeași pagină **Attendance**, faceți clic pe **All years** în coloana din stânga, apoi selectați fila **Headcount Trend**.
2. Folosiți filtrele **Campus**, **Service**, **Service Time** și **Group** pentru a restrânge raportul.

Raportul afișează numărul de participanți înregistrați, însumat pe săptămâni, atât sub formă de grafic liniar, cât și de tabel -- în același stil ca rapoartele din filele [Attendance Trend și Group Attendance](tracking-attendance.md). Numărul de participanți introdus pentru săptămâna curentă apare și sub **Headcounts this week** pe pagina principală Attendance.

## Pagini conexe

- [Înregistrarea prezenței](recording-attendance.md) -- prezență nominală, pe persoană, pe sesiune
- [Urmărirea prezenței](tracking-attendance.md) -- rapoarte de prezență și de tendințe pentru grupuri
- [Configurarea prezenței](setup.md) -- configurarea campusurilor, slujbelor și intervalelor orare
