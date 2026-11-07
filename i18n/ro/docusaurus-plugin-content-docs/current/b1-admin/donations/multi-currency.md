---
title: "Hỗ trợ đa tiền tệ"
description: "Înregistrați și raportați donații în monede diferite în B1 Admin, inclusiv introducerea manuală, donațiile online Stripe și modul de conversie a totalurilor."
---

Thấy có lỗi: tiêu đề tiếng Việt lẫn vào file Romania. Sửa lại đúng:

---
title: "Suport multi-valutar"
---

# Suport multi-valutar

<div class="article-intro">

Funcția multi-valutar din B1 permite bisericii dumneavoastră să accepte și să înregistreze donații în monede diferite. Acest lucru este util în mod deosebit pentru bisericile cu membri internaționali, misionari sau campusuri multiple din țări diferite.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Aveți nevoie de permisiunea de a gestiona donațiile. Consultați [Roluri și permisiuni](../people/roles-permissions.md) pentru detalii.
- Configurați [donațiile online](./online-giving-setup.md) cu Stripe, care acceptă tranzacții multi-valutare.
- Înțelegeți nevoile contabile ale bisericii dumneavoastră pentru gestionarea mai multor monede.

</div>

## Activarea multi-valutei

Suportul multi-valutar este acum activat implicit în B1. Odată activat:

- Membrii pot dona în moneda lor locală atunci când donează online
- Puteți înregistra manual donații în orice monedă
- Rapoartele de donații afișează sumele în moneda originală
- Stripe gestionează automat conversia valutară pentru donațiile online

## Monede acceptate

Sistemul acceptă toate monedele majore din lume, inclusiv:

- **USD** -- Dolarul american
- **EUR** -- Euro
- **GBP** -- Lira sterlină
- **CAD** -- Dolarul canadian
- **AUD** -- Dolarul australian
- **MXN** -- Peso mexican
- **BRL** -- Real brazilian
- **INR** -- Rupia indiană
- **CNY** -- Yuanul chinezesc
- **JPY** -- Yenul japonez
- Și multe altele...

Monedele disponibile pentru donațiile online depind de monedele suportate de contul dumneavoastră Stripe.

## Înregistrarea donațiilor în monede diferite

### Donații online

Atunci când un membru donează online prin Stripe:

1. Acesta își selectează moneda preferată la finalizarea comenzii
2. Stripe procesează plata în moneda respectivă
3. Donația este înregistrată în B1 cu suma în moneda originală
4. Stripe gestionează automat orice conversie valutară necesară către moneda implicită a contului dumneavoastră

### Introducere manuală

Pentru a înregistra o donație în numerar sau cu cec într-o altă monedă:

1. Accesați **Donations > Batches** în B1 Admin și deschideți lotul
2. Faceți clic pe **Add Donation** din partea de sus a paginii lotului
3. Selectați moneda din lista verticală de monede
4. Introduceți suma în acea monedă
5. Completați restul detaliilor donației
6. Faceți clic pe **Save**

## Vizualizarea donațiilor în mai multe monede

### Rapoarte de donații

Rapoartele de donații afișează sumele în moneda originală:

- Înregistrările individuale ale donațiilor afișează codul monedei (de exemplu, "$100.00 USD")
- Totalurile sunt calculate separat pentru fiecare monedă
- Puteți filtra după monede specifice

### Totaluri convertite

Acolo unde B1 afișează un singur total combinat -- cardurile KPI din rezumatul donațiilor, totalul unui lot de donații și totalul unui fond -- donațiile înregistrate într-o monedă diferită de moneda implicită a bisericii sunt convertite în moneda bisericii dumneavoastră, folosind cursurile de schimb actuale, astfel încât totalul să fie un singur număr relevant, în loc să adune monede diferite. O notă **Converted at current exchange rates** apare sub total ori de câte ori s-a aplicat o conversie. Elementele individuale ale donațiilor continuă să fie afișate în moneda originală.

### Situații de donații

Atunci când generați situațiile de donații:

- Fiecare donație apare cu moneda sa originală
- Totalurile sunt defalcate pe monedă
- Membrii văd exact ce au donat în fiecare monedă

## Integrarea cu Stripe

Pentru donațiile online, Stripe gestionează tranzacțiile multi-valutare:

- **Conversie automată** -- Stripe convertește monedele în moneda implicită a contului dumneavoastră
- **Cursuri de schimb** -- Stripe folosește cursurile de piață actuale
- **Comisioane** -- Conversia valutară poate implica comisioane suplimentare Stripe
- **Moneda de plată** -- Fondurile sunt depuse în moneda implicită a contului dumneavoastră

:::info
Verificați panoul Stripe pentru a vedea cursurile de conversie actuale și comisioanele asociate tranzacțiilor multi-valutare.
:::

## Considerente contabile

Atunci când lucrați cu mai multe monede:

- **Evidența** -- Păstrați evidența sumelor și monedelor originale ale donațiilor pentru rapoarte corecte
- **Cursuri de schimb** -- Rețineți că ratele de conversie Stripe pot diferi de cele ale băncii dumneavoastră
- **Chitanțe fiscale** -- Consultați contabilul dumneavoastră cu privire la modul de raportare a donațiilor în monede diferite în scopuri fiscale
- **Alocarea fondurilor** -- Puteți aloca donațiile unor fonduri specifice, indiferent de monedă

## Bune practici

- **Moneda implicită** -- Setați moneda principală a bisericii ca implicită pentru majoritatea tranzacțiilor
- **Comunicare clară** -- Spuneți donatorilor în ce monedă donează în timpul procesului de plată
- **Raportare consecventă** -- Totalurile combinate sunt întotdeauna convertite automat în moneda bisericii; folosiți filtrul de monedă pentru fiecare donație atunci când aveți nevoie să vedeți sumele originale
- **Reconciliere periodică** -- Reconciliați plățile Stripe cu evidența donațiilor, ținând cont de conversiile valutare

## Limitări

- Conversia valutară pentru procesarea plăților este gestionată de Stripe, numai pentru donațiile online; donațiile manuale sunt înregistrate exact așa cum sunt introduse, fără conversie automată
- Rapoartele istorice și elementele individuale ale donațiilor afișează întotdeauna moneda originală în care a fost înregistrat darul
- Totalurile combinate (cardurile KPI, totalurile loturilor, totalurile fondurilor) sunt convertite în moneda bisericii folosind cursurile de schimb actuale -- aceste cursuri pot diferi ușor de cele ale băncii dumneavoastră sau ale Stripe la momentul decontării fondurilor

## Articole conexe

- [Configurarea donațiilor online](./online-giving-setup.md) -- Configurați Stripe pentru acceptarea donațiilor
- [Înregistrarea donațiilor](./recording-donations.md) -- Introduceți manual înregistrările de donații
- [Rapoarte de donații](./donation-reports.md) -- Generați și vizualizați rezumatele donațiilor
- [Situații de donații](./giving-statements.md) -- Creați situații de donații de sfârșit de an
