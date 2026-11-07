---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Jei naudojate Subsplash savo bažnyčios programėlei, aukoms ar formoms, bet norite, kad B1 būtų pagrindinė žmonių ir aukų apskaitos sistema, Subsplash Zapier programėlė gali realiuoju laiku perduoti aukas, naujus profilius ir formų atsakymus į B1. Atkreipkite dėmesį, kad Subsplash Zapier programėlė šiuo metu palaiko tik **trigerius** — ryšys veikia tik viena kryptimi (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Subsplash paskyra su planu, apimančiu **API + Zapier** prieigą (pasiteiraukite savo Subsplash klientų sėkmės vadybininko — šios funkcijos priklauso nuo plano)
- [Zapier](https://zapier.com) paskyra
- B1Admin naudotojas su leidimu **Edit Settings**

</div>

## Ką galite susieti

Visi toliau nurodyti trigeriai priklauso Subsplash. Veiksmai priklauso B1.

| Subsplash trigeris | B1 veiksmas |
|---|---|
| New Donation | Find Person → Add Donation (Create Person, jei asmens nėra) |
| New Pledge | Add Donation (su `notes` = "Pledge: …") |
| New Person Created | Create Person |
| Person Updated Profile | (nėra tiesioginio B1 veiksmo — įrašyti į Google Sheet peržiūrai rankiniu būdu) |
| New Form Response | Create Person + (pasirinktinai) Add Group Member pagal formą |

Subsplash → B1 yra vienintelė kryptis, kurią Subsplash programėlė šiuo metu palaiko.

## Sąranka

### 1. Sukurkite B1 API raktą

B1Admin: **Settings → Developer → API Keys → New API Key**. Leidimai (scopes):

- `people:read` — rasti aukotoją pagal el. paštą
- `people:write` — sukurti aukotoją, jei jo nėra
- `donations:write` — įrašyti auką
- (`settings:write` nereikia — trigerį čia valdo Subsplash, o ne B1.)

### 2. Prijunkite Subsplash prie Zapier

Vadovaukitės [Subsplash Zapier integracijos vadovu](https://support.subsplash.com/en/articles/9825926-zapier-integration). Jie išduoda API raktą iš Subsplash Dashboard, kurį Zapier naudoja trigerio pusės autentifikacijai.

### 3. Sukurkite „įrašyti auką“ Zap

1. **Trigeris** — Subsplash: New Donation
2. **Veiksmas** — B1.church: Find Person (pagal el. paštą)
3. **Filtras / kelias** — šakokite pagal „asmuo rastas“:
   - **Rastas:** B1.church: Add Donation. Susiekite sumą, datą, fondą, metodą = "Online", notes = Subsplash transakcijos ID.
   - **Nerastas:** B1.church: Create Person → B1.church: Add Donation (naudojant naujai sukurto asmens ID).

Įjunkite Zap. Būsimos Subsplash aukos per kelias sekundes pasirodys **B1Admin → Donations**.

## Dažniausi receptai

### Siųsti padėkos žinutę, kai ateina pirmoji auka

- **Trigeris** — Subsplash: New Donation
- **Veiksmas** — Filter by Zapier: tęsti tik tuo atveju, jei tai pirmoji aukotojo auka (naudokite *Lookup Table* pagal Donor Email su Google Sheet, kuriame yra ankstesnių aukotojų sąrašas, arba Zapier *Paths* žingsnį pagal aukotojo sukūrimo datą)
- **Veiksmas** — Mailchimp / SMTP / SendGrid: išsiųsti pirmosios aukos padėkos žinutę
- **Veiksmas** — B1.church: Add Donation (kaip įprasta)

### Atskirti pažadus nuo įprastų aukų

- **Trigeris** — Subsplash: New Pledge
- **Veiksmas** — B1.church: Add Donation su `notes = "Pledge — Subsplash"` ir fondu, pavadintu `Pledges` (atskirtu nuo veiklos fondo), kad galėtumėte atskirai teikti pažadų ataskaitas **B1Admin → Donations → Summary**.

### Sinchronizuoti naujus programėlės naudotojus kaip B1 asmenis

- **Trigeris** — Subsplash: New Person Created
- **Veiksmas** — B1.church: Create Person, užpildant vardą, el. paštą ir telefoną. Pažymėkite asmenį B1 pridėdami jį į grupę „Subsplash App Users“.

## Apribojimai ir pastabos

- **Subsplash Zapier programėlė palaiko tik trigerius.** Jei norite B1 pusėje atlikti pakeitimus (pvz., kad naujas B1 asmuo atsirastų ir Subsplash), reikėtų sukurti tokį ryšį iš B1 Zapier programėlės trigerių, kviečiančių Subsplash REST API per pasirinktinį *Webhooks by Zapier — POST* veiksmą. Tai pasirinktinė integracija, o ne paruoštas receptas.
- **API prieiga priklauso nuo plano.** Jei Zapier ryšys nepavyksta su `403 Forbidden`, jūsų Subsplash planas greičiausiai neapima API prieigos — susisiekite su savo klientų sėkmės vadybininku.
- **Fondų susiejimas atliekamas rankiniu būdu.** Subsplash perduoda kampanijos ar kategorijos pavadinimą, o B1 reikia skaitinio fondo ID. Arba įrašykite fondą tiesiai į Zap, arba palaikykite Zapier *Lookup Table*, kuri susieja Subsplash kampanijas su B1 fondais.

## Trikčių šalinimas

- **Po aukos neįvyksta joks trigeris** — Subsplash Zapier skydelyje patikrinkite, ar ryšys vis dar rodo *Connected*. Jei Subsplash pusėje buvo pakeistas API raktas, Zap tyliai nustoja veikti; prijunkite iš naujo.
- **B1 *Add Donation* nepavyksta su 422** — dažniausiai trūksta `fundId` arba jis neatpažintas. Peržiūrėkite savo fondus **B1Admin → Donations → Funds** ir nukopijuokite tikslų ID į Zap žingsnį.
- **Pirmoji auka suveikia du kartus** — Subsplash kartais pakartotinai išsiunčia trigerį, jei Zapier nepavyko gauti patvirtinimo. Pridėkite *Filter by Zapier* pagal aukos ID (Subsplash jį siunčia užklausos turinyje), kad pašalintumėte dublikatus.

## Taip pat žr.

- [Donorbox](./donorbox) — tokio paties tipo receptai, tik kita aukų platforma
- [Zapier (apžvalga)](../zapier) — B1 pusė kiekvienam Zapier receptui
- [Subsplash Zapier integracijos vadovas](https://support.subsplash.com/en/articles/9825926-zapier-integration) (Subsplash dokumentacija)
