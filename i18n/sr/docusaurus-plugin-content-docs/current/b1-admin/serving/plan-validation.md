---
title: "Provera plana i obaveštenja"
description: "Проверите планове служења у B1 Admin за непопуњене позиције, сукобе у распореду и блокиране волонтере, па једним кликом обавестите цео тим."
---

# Provera plana i obaveštenja volontera

<div class="article-intro">

B1 Admin automatski proverava vaše planove pre nedelje i traži probleme: nepopunjene pozicije, sukobe u rasporedu i volontere koji su označili da taj datum ne mogu. Kada je sve u redu, celom timu možete poslati obaveštenje jednim klikom.

</div>

<div class="prereqs">
<h4>Pre nego što počnete</h4>

- Kreirajte [plan službe](./plans.md) i dodelite volontere pozicijama
- Dodajte [termine službi](./plans.md) u plan kako bi provera sukoba mogla da otkrije preklapanja
- Proverite da su volonteri instalirali aplikaciju B1 Mobile kako bi mogli da primaju push obaveštenja

</div>

## Panel za proveru

Svaki plan ima panel **Validation** (Provera) koji se pokreće automatski dok pravite plan. Proverava tri stvari:

### Nepopunjene pozicije
Ako pozicija zahteva više ljudi nego što je trenutno dodeljeno, panel za proveru navodi tačno koliko je još potrebno, na primer: *„Tonski tehničar: potrebna je još 1 osoba.“* Na prvi pogled vidite da li je plan potpuno popunjen pre nego što stigne nedelja.

### Sukobi u rasporedu
Ako je volonter dodeljen na dve pozicije koje se u istom planu vremenski preklapaju, panel za proveru označava sukob, na primer: *„Jana Smit: vremenski sukob između vođe bogosluženja i prijave dece tokom nedeljne službe.“* Ovo sprečava dvostruko zakazivanje pre nego što postane problem tokom nedeljnog jutra.

### Datumi nedostupnosti
Volonteri mogu u aplikaciji B1 Mobile da podese datume kada nisu dostupni. Ako je neko dodeljen planu koji pada u jedan od tih datuma, panel za proveru automatski prikazuje sukob kako biste mogli da pronađete zamenu.

### Sukobi među planovima
Provera takođe obuhvata sve vaše planove odjednom. Ako je isti volonter dodeljen u dva različita plana koja se vremenski preklapaju, na primer u službi u 9 časova i službi u 10 časova koje traju do 10:30, B1 Admin će tu osobu označiti kao dvostruko zakazanu među planovima.

:::tip
Ne morate ništa posebno da radite da biste pokrenuli proveru. Ona se ažurira automatski svaki put kada dodate ili promenite dodelu. Samo pratite panel dok pravite plan.
:::

## Obaveštavanje volontera

Kada je plan gotov, možete odjednom obavestiti sve dodeljene volontere direktno iz panela za proveru.

1. Otvorite plan i pomerite se do panela **Validation** (Provera)
2. Ako postoje volonteri koji nisu obavešteni, videćete link sa brojem onih kojima treba poslati obaveštenje (na primer: *„Obavesti 8 volontera“*)
3. Kliknite na link da biste poslali push obaveštenja svima kojima još nije poslato
4. Volonteri na telefonu dobijaju obaveštenje da su raspoređeni i da treba da potvrde svoju dodelu

:::info
Uključuju se samo volonteri koji još nisu obavešteni. Ako kasnije dodate nekoga u plan, link će se ponovo pojaviti kako biste mogli da obavestite tu novu osobu bez ponovnog obaveštavanja ostatka tima.
:::

### Planovi sa tokom potvrde

Ako podešavanja plana navode [tok potvrde](./workflows.md#serving-assignment-confirmations), panel prikazuje: *„Nови zahtevi koriste tok potvrde. Upozorenja u aplikaciji ostaju uključena. Podsetnici se zaustavljaju kada se svaki zahtev prihvati ili odbije.“* U tom slučaju:

- Link za obaveštavanje broji samo volontere kojima nije poslato obaveštenje i koji još nisu odgovorili.
- Klikom na link šalje se uobičajeno upozorenje u aplikaciji i kreira po jedna kartica za svaki zahtev na tabli toka. Tok zatim šalje podsetnike putem e-pošte i SMS-a i, ako je potrebno, dodeljuje zahtev nekome ko će volontera pozvati telefonom.
- Plan mora biti objavljen (a ne samo privremeno zakazan), a tok mora biti aktivan. U suprotnom panel prikazuje: *„Zahtevi nisu mogli da budu poslati. Proverite da je izabrani tok aktivan i da je plan objavljen, pa pokušajte ponovo.“*

:::warning
Volonteri moraju imati instaliran B1.church mobilni doživljaj (PWA na početnom ekranu ili zastarelu nativnu aplikaciju B1 Mobile za korisnike koji je još koriste), uz uključena obaveštenja, kako bi primali push obaveštenja. Uputstva za podešavanje potražite u članku [Instaliranje kao aplikacije (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Povezani članci

- [Planovi službi](./plans.md)
- [Tokovi rada](./workflows.md)
- [Instaliranje B1.church PWA aplikacije](/docs/b1-church/getting-started/installing-pwa)
