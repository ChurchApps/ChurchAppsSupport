---
title: "Narystės galutiniai taškai"
description: "Galutinių taškų nuoroda ChurchApps Membership API: asmenys, namų ūkiai, grupės, vaidmenys, formos ir nustatymai, su autentifikacijos ir leidimų taisyklėmis."
---

# Narystės galutiniai taškai

<div class="article-intro">

Narystės modulis tvarko asmenis, bažnyčias, grupes, namų ūkius, vaidmenis, leidimus, formas ir nustatymus. Tai didžiausias modulis, jis teikia pagrindinį tapatybės ir autorizacijos sluoksnį visiems kitiems moduliams.

</div>

**Pagrindinis kelias:** `/membership`

## Asmenys

Pagrindinis kelias: `/membership/people`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View arba Member | Išvardyti visus bažnyčios asmenis |
| GET | `/:id` | JWT | People.View arba savo įrašas | Gauti asmenį pagal ID (įskaitant formų pateikimus) |
| GET | `/ids?ids=` | JWT | People.View, Member arba People.ViewNames | Gauti kelis asmenis pagal ID, atskirtus kableliais. Iškviečiantieji su People.ViewNames, bet be People.View, gauna pagrindinį modelį; asmenys, kurie atsisakė, praleidžiami (išskyrus patį iškviečiantįjį) |
| GET | `/basic?ids=` | JWT | — | Gauti pagrindinę informaciją (tik vardą) keliems asmenims |
| GET | `/names?ids=` | JWT | Bet koks bažnyčios leidimas | `[{ id, name: { display, first, last }, photo }]`, surikiuota pagal pavardę, tada pagal vardą, kableliais atskirtiems ID, kuriuos iškviečiantysis jau turi, kad vaidmenys be People.View (aukos, lankomumas) galėtų pažymėti asmenis. Be paieškos, be katalogo filtro |
| POST | `/names` | JWT | Bet koks bažnyčios leidimas | Tas pats kaip `GET /names`. Turinys: `{ peopleIds }` (arba `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member arba People.ViewNames | Neseniai pridėti asmenys. Iškviečiantieji su People.ViewNames, bet be People.View (net nariai su katalogo prieiga), gauna pagrindinį modelį (`id`, `name.display`, `photo`, `membershipStatus`); asmenys, kurie atsisakė, praleidžiami |
| GET | `/guest-register/options?churchId=` | Viešas | — | QR svečių registracijos kontrolinis sąrašas: grąžina `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, kiekvienas laukas yra `"off"`, `"optional"` arba `"required"` (nustatoma iš viešo `guestRegistrationFields` nustatymo; trūkstamos arba klaidingos reikšmės nukrenta prie el. paštas/telefonas neprivalomi, o likusieji išjungti). Reikalauja `enableQRGuestRegistration`, nebent užklausoje yra atitinkamas svetainės ar bažnyčios žetonas; taikomas užklausų ribojimas (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member arba People.ViewNames | Ieškoti asmenų pagal vardą arba el. paštą (iki 100, surikiuota pagal pavardę, tada pagal vardą). Iškviečiantieji su People.ViewNames, bet be People.View (net nariai su katalogo prieiga), gauna paieškos pagal vardą rezultatus su pagrindiniu modeliu; paieška pagal `email` grąžina `[]` |
| GET | `/search/phone?number=` | JWT | People.View arba Member | Ieškoti pagal telefono numerį |
| GET | `/search/group?groupId=` | JWT | People.View arba Member | Gauti konkrečios grupės asmenis |
| GET | `/household/:householdId` | JWT | — | Gauti visus namų ūkio asmenis |
| GET | `/attendance` | JWT | People.Edit | Įkelti dalyvius pagal filtrus (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Įkelti asmenų ir grupių laiko juostos duomenis |
| GET | `/directory/:id` | JWT | — | Gauti asmenį katalogo peržiūrai (atsižvelgiama į matomumo nuostatas) |
| GET | `/claim/:churchId` | JWT | — | Priskirti asmens įrašą dabartiniam naudotojui bažnyčioje |
| POST | `/` | JWT | People.Edit arba EditSelf | Sukurti arba atnaujinti asmenis (paketu) |
| POST | `/search` | JWT | People.View, Member arba People.ViewNames | Ieškoti asmenų (POST variantas). Turinys: `{ term }` arba `{ email }`; tos pačios vardų taisyklės kaip `GET /search` |
| POST | `/advancedSearch` | JWT | People.View arba Member | Paieška pagal kelias sąlygas (amžius, birthMonth, membershipStatus ir kt.). Turinys yra sąlygų masyvas; tuščias turinys reiškia be sąlygų, o bet koks kitas ne masyvo turinys grąžina 400 |
| POST | `/loadOrCreate` | Viešas | — | Rasti arba sukurti asmenį pagal el. paštą. Turinys: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Viešas | — | QR svečių registracija. Turinys: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (nuo 1 iki 10 narių; email/phone/maritalStatus taikomi tik pirmam nariui). Laukai, kuriuos bažnyčia išjungė, pašalinami; trūkstamos privalomos arba netinkamos reikšmės grąžina 400. Pirmiausia naudojami esami asmenys: narys atitinka, kai tiksliai vienas nepašalintas asmuo turi tokį patį vardą (nepriklausomai nuo raidžių dydžio) ir tokį patį el. paštą arba telefono skaitmenis (namų, darbo ar mobilųjį); narys be el. pašto ar telefono atitinka pagal vardą atitikusiame namų ūkyje. Atitikę asmenys niekada nekeičiami. Neatitikę nariai prisijungia prie atitikusio namų ūkio arba sukuriamas naujas namų ūkis (pavadintas pirmo nario pavarde) su `membershipStatus: "Visitor"` ir bendru `address`. `comments` išsaugomi kaip pastaba pirmam nariui; visi pridedami prie privačios `guestRegistrationGroupId` grupės, jei nustatyta; ir jei `guestRegistrationRecordAttendance` yra `"true"`, įrašomas lankomumas tos grupės planuotiems pamaldų laikams, kurių registracijos langas šiuo metu atviras. Grąžina `{ householdId, people: [{ id, name }] }`, pakartodamas pateiktus vardus, o ne saugomus. Tos pačios sutikimo / žetono ir užklausų ribojimo taisyklės kaip ir parinkčių užklausai |
| POST | `/household/:householdId` | JWT | People.Edit | Atnaujinti namų ūkio narių priskyrimus |
| POST | `/public/email` | Viešas | — | Išsiųsti el. laišką asmeniui. Turinys: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Vidinis | — | Įkelti asmenų el. paštus pagal ID (serveris su serveriu, reikalingas jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Ištrinti asmenį |

### Pavyzdys: asmenų paieška

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Pavyzdys: asmens sukūrimas

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Naudotojai

Pagrindinis kelias: `/membership/users`

Prisijungimo, registracijos ir slaptažodžio valdymo galutinius taškus žr. [Autentifikacija ir leidimai](./authentication.md).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| POST | `/login` | Viešas | — | Prisijungti (el. paštas/slaptažodis, JWT atnaujinimas arba authGuid) |
| POST | `/register` | Viešas | — | Registruoti naują naudotoją |
| POST | `/forgot` | Viešas | — | Išsiųsti slaptažodžio atkūrimo el. laišką |
| POST | `/setPasswordGuid` | Viešas | — | Nustatyti slaptažodį naudojant autentifikacijos GUID iš el. laiško nuorodos |
| POST | `/verifyCredentials` | Viešas | — | Patikrinti el. paštą ir slaptažodį bei grąžinti susietas bažnyčias |
| POST | `/loadOrCreate` | JWT | — | Rasti arba sukurti naudotoją pagal el. paštą / userId |
| POST | `/setDisplayName` | JWT | — | Atnaujinti naudotojo vardą ir pavardę |
| POST | `/updateEmail` | JWT | — | Pakeisti naudotojo el. pašto adresą |
| POST | `/updatePassword` | JWT | — | Pakeisti naudotojo slaptažodį (mažiausiai 6 simboliai) |
| POST | `/updateOptedOut` | JWT | — | Nustatyti asmens atsisakymo (opted-out) būseną |
| POST | `/sendInviteEmail` | JWT | People.Edit | Išsiųsti asmeniui šios bažnyčios kvietimą el. paštu (`email`, `personName`, `contextName`). Mygtukas rodo **Sign Up** asmeniui be paskyros ir **Log In** esamam naudotojui. Naudotojas, kuris niekada neprisijungė, vietoj to gauna **Set Your Password** nuorodą, galiojančią 7 dienas. Tai fiksuotas šablonas, todėl neskaičiuojamas pagal bažnyčios dienos el. laiškų limitą |
| GET | `/search?term=` | JWT | Server.Admin | Ieškoti visų naudotojų pagal vardą / el. paštą |
| DELETE | `/` | JWT | — | Ištrinti dabartinę naudotojo paskyrą |

## Bažnyčios

Pagrindinis kelias: `/membership/churches`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Įkelti visas dabartinio naudotojo bažnyčias |
| GET | `/:id` | JWT | — | Gauti bažnyčią pagal ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Gauti bažnyčios domeno administratorių |
| GET | `/:id/impersonate` | JWT | Server.Admin | Perimti bažnyčios tapatybę (tik serverio administratoriui) |
| GET | `/all?term=` | JWT | Server.Admin | Ieškoti visų bažnyčių (administratorius) |
| GET | `/search/?name=` | Viešas | — | Ieškoti bažnyčių pagal pavadinimą |
| GET | `/lookup/?subDomain=&id=` | Viešas | — | Rasti bažnyčią pagal subdomeną arba ID |
| POST | `/` | JWT | Settings.Edit | Atnaujinti bažnyčios duomenis |
| POST | `/add` | JWT | — | Registruoti naują bažnyčią. Privalomi laukai: name, address1, city, state, zip, country |
| POST | `/search` | Viešas | — | Ieškoti bažnyčių pagal pavadinimą (POST variantas) |
| POST | `/select` | JWT | — | Pasirinkti / perjungti į bažnyčią. Turinys: `{ churchId }` arba `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archyvuoti arba išarchyvuoti bažnyčią |
| POST | `/byIds` | Viešas | — | Įkelti kelias bažnyčias pagal ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Ištrinti bažnyčias, apleistas 7+ dienas |

## Grupės

Pagrindinis kelias: `/membership/groups`

Plečia standartinį CRUD (GET `/`, GET `/:id` iš bazinės klasės).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Išvardyti visas grupes |
| GET | `/:id` | JWT | — | Gauti grupę pagal ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Ieškoti grupių pagal pamaldų filtrus |
| GET | `/my` | JWT | — | Gauti dabartinio naudotojo grupes |
| GET | `/my/:tag` | JWT | — | Gauti dabartinio naudotojo grupes, filtruotas pagal žymę |
| GET | `/tag/:tag` | JWT | — | Gauti visas grupes su konkrečia žyme |
| GET | `/public/:churchId/:id` | Viešas | — | Gauti viešą grupę pagal bažnyčią ir ID |
| GET | `/public/:churchId/tag/:tag` | Viešas | — | Gauti viešas grupes pagal žymę |
| GET | `/public/:churchId/label?label=` | Viešas | — | Gauti viešas grupes pagal etiketę |
| GET | `/public/:churchId/slug/:slug` | Viešas | — | Gauti viešą grupę pagal slug |
| POST | `/` | JWT | Groups.Edit | Sukurti arba atnaujinti grupes (automatiškai generuoja slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Ištrinti grupę (taip pat ištrina pavaldžias komandas ministerijų grupėms) |

## Grupių nariai

Pagrindinis kelias: `/membership/groupmembers`

Plečia standartinį CRUD (GET `/:id`, DELETE `/:id` iš bazinės klasės).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Gauti grupės narį pagal ID |
| GET | `/` | JWT | GroupMembers.View* | Išvardyti grupių narius. Filtruoti pagal `?groupId=`, `?groupIds=` arba `?personId=`. *Leidžiama ir tada, jei naudotojas yra grupės narys arba prašo savo personId, o `?groupId=` atveju – bet kurios neslaptos grupės, kai naudotojas turi Attendance.View arba Attendance.Edit (jiems įtraukiami nariai iki 13 metų) |
| GET | `/my` | JWT | — | Gauti dabartinio naudotojo narystes grupėse |
| GET | `/basic/:groupId` | JWT | — | Gauti pagrindinį grupės narių sąrašą |
| GET | `/public/leaders/:churchId/:groupId` | Viešas | — | Gauti grupės vadovus (viešai) |
| GET | `/public/:churchId/:groupId` | Viešas | — | Gauti viešą grupės sąrašą (minimalūs laukai: `personId`, `displayName`, `leader`, nuotrauka). Tik tada, kai grupė pasirenka `publicRoster`; palaiko svetainės kūrėjo `staffGrid` elementą |
| POST | `/` | JWT | GroupMembers.Edit | Pridėti arba atnaujinti grupių narius |
| DELETE | `/:id` | JWT | GroupMembers.View | Pašalinti grupės narį |

## Namų ūkiai

Pagrindinis kelias: `/membership/households`

Standartinis CRUD valdiklis.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Išvardyti visus namų ūkius |
| GET | `/:id` | JWT | — | Gauti namų ūkį pagal ID |
| POST | `/` | JWT | People.Edit | Sukurti arba atnaujinti namų ūkius |
| DELETE | `/:id` | JWT | People.Edit | Ištrinti namų ūkį |

## Vaidmenys

Pagrindinis kelias: `/membership/roles`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Gauti vaidmenį pagal ID |
| GET | `/church/:churchId` | JWT | Roles.View | Gauti visus bažnyčios vaidmenis. Kiekvienas vaidmuo apima `memberCount` – skirtingų naudotojų skaičių jame |
| POST | `/` | JWT | Roles.Edit | Sukurti arba atnaujinti vaidmenis |
| DELETE | `/:id` | JWT | Roles.Edit | Ištrinti vaidmenį (taip pat pašalina jo leidimus ir narius) |

## Vaidmenų nariai

Pagrindinis kelias: `/membership/rolemembers`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Gauti vaidmens narius. Pridėkite `?include=users`, kad būtų įtraukta naudotojų informacija |
| POST | `/` | JWT | Roles.Edit | Pridėti narius prie vaidmens (sukuria naudotoją, jei el. paštas neegzistuoja) |
| DELETE | `/:id` | JWT | Roles.View | Pašalinti vaidmens narį |
| DELETE | `/self/:churchId/:userId` | JWT | — | Pasišalinti iš bažnyčios |

## Vaidmenų leidimai

Pagrindinis kelias: `/membership/rolepermissions`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Gauti vaidmens leidimus (naudokite `null` kaip ID vaidmeniui „Everyone“) |
| POST | `/` | JWT | Roles.Edit | Sukurti arba atnaujinti vaidmens leidimus |
| DELETE | `/:id` | JWT | Roles.Edit | Ištrinti vaidmens leidimą |

## Leidimai

Pagrindinis kelias: `/membership/permissions`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Gauti visą galimų leidimų sąrašą |

Kiekvienas įrašas turi `apiName`, `section` (turinio tipas), `action` ir `displaySection` / `displayAction` etiketes, kurias rodo B1Admin vaidmenų redaktorius. Naujausi papildymai: `MembershipApi` / `People` / `View Names` (**Peržiūrėti tik asmenų vardus**, skiltyje People and Groups) ir `GivingApi` / `Donations` / `Enter` (**Įvesti aukas**, skiltyje Donations; žr. [Aukų paketai](./giving.md#donation-batches)).

## Formos

Pagrindinis kelias: `/membership/forms`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin arba Forms.Edit | Išvardyti visas formas (administratorius mato visas; redaktoriai – priskirtas ir ne narių formas) |
| GET | `/:id` | JWT | Formos prieiga | Gauti formą pagal ID |
| GET | `/archived` | JWT | Forms.Admin arba Forms.Edit | Išvardyti archyvuotas formas |
| GET | `/group/:groupId` | JWT | Grupės narys, grupės vadovas arba Forms.Admin | Savarankiškos formos, susietos su grupe (`forms.groupId`), išskyrus archyvuotas, surikiuotos pagal pavadinimą. Grąžina `id`, `name`, `description` ir `open` (per prieinamumo laikotarpį). Nariai gauna tik atviras formas; vadovai ir formų administratoriai gauna ir uždaras. Palaiko grupės puslapyje rodomas susietas formas |
| GET | `/standalone/:id?churchId=` | JWT | — | Gauti savarankišką formą (apribotoms formoms reikalinga autentifikacija) |
| POST | `/` | JWT | Forms.Admin arba Forms.Edit | Sukurti arba atnaujinti formas. Savarankiškos formos gali turėti neprivalomą `photoUrl` (antraštės nuotrauka virš formos) ir `groupId` (susieta grupė) |
| DELETE | `/:id` | JWT | Formos prieiga | Ištrinti formą |

## Formų pateikimai

Pagrindinis kelias: `/membership/formsubmissions`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin arba Forms.Edit | Išvardyti pateikimus. Filtruoti pagal `?personId=` arba `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Tik savo: iki 50 savarankiškų formų pateikimų (ne asmens formų), kuriuos prisijungęs narys pateikė arba kurie susieti su jo asmeniu (`contentType` `person`, `contentId` – jo asmens ID; pavyzdžiui, po administratoriaus pakeitimo asmeniui), naujausi pirmi, kiekvienas su `form.name`. `include` priddeda kiekvienos formos klausimus ir pateikimo atsakymus. Grąžina `401`, jei naudotojas nėra susietas su asmeniu. Palaiko **Mano formos** skyrių B1 Me puslapyje |
| GET | `/group/:groupId` | JWT | Grupės vadovas | Grupės vadovų atsakymai: po vieną įrašą kiekvienai susietai formai ir kiekvienam grupės renginiui su registracijos forma, kiekvienas su `form`, `event` (`id`, `title`, `start`; tik renginių įrašams), `questions` ir `submissions` (su `answers` ir `personName`, `null`, jei anoniminis) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit arba peržiūros prieiga | Gauti pateikimą pagal ID. Pridėkite `?include=form,questions,answers`. Susietos formos grupės vadovai ir renginio registracijos grupės vadovai taip pat gali jį perskaityti |
| GET | `/formId/:formId` | JWT | Formos prieiga (peržiūra) | Gauti visus formos pateikimus (įskaitant formą, klausimus, atsakymus). Susietos formos grupės vadovai turi peržiūros prieigą |
| POST | `/` | JWT | — | Pateikti formos atsakymus (tvarko apribotas ir neapribotas formas, siunčia pranešimus el. paštu). Kai forma turi `autoCreatePerson`, pagal el. paštą randamas arba sukuriamas Guest asmuo ir susiejamas su pateikimu; kai forma turi ir `groupId`, tas asmuo pridedamas prie grupės; kai nustatyta `followUpSubject`/`followUpBody`, pateikėjui siunčiamas šablonu paremtas tolesnis el. laiškas. Nebent iškviečiantysis gali valdyti formą, `submittedBy` visada nustatomas į prisijungusio nario asmenį (arba paliekamas tuščias anoniminiams pateikimams) |
| DELETE | `/:id` | JWT | Forms.Admin arba Forms.Edit | Ištrinti pateikimą ir jo atsakymus |

## Klausimai

Pagrindinis kelias: `/membership/questions`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Formos prieiga | Išvardyti formos klausimus. Reikalingas `?formId=` |
| GET | `/:id` | JWT | Formos prieiga | Gauti klausimą pagal ID |
| GET | `/unrestricted?formId=` | JWT | — | Gauti neapribotos formos klausimus |
| GET | `/sort/:id/up` | JWT | — | Perkelti klausimą aukštyn rūšiavimo tvarka |
| GET | `/sort/:id/down` | JWT | — | Perkelti klausimą žemyn rūšiavimo tvarka |
| POST | `/` | JWT | Formos prieiga | Sukurti arba atnaujinti klausimus (automatiškai priskiria rūšiavimo tvarką) |
| DELETE | `/:id?formId=` | JWT | Formos prieiga | Ištrinti klausimą |

## Atsakymai

Pagrindinis kelias: `/membership/answers`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin arba Forms.Edit | Išvardyti atsakymus. Filtruoti pagal `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin arba Forms.Edit | Sukurti arba atnaujinti atsakymus |

## Nario leidimai

Pagrindinis kelias: `/membership/memberpermissions`

Valdo kiekvieno nario prieigą prie konkrečių formų.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Formos prieiga | Gauti nario leidimą pagal ID |
| GET | `/member/:id` | JWT | Formos prieiga | Gauti visus nario formų leidimus |
| GET | `/form/:id` | JWT | Formos prieiga | Gauti visus formos narių leidimus |
| GET | `/form/:id/my` | JWT | Formos prieiga | Gauti dabartinio naudotojo leidimą formai |
| POST | `/` | JWT | Formos prieiga | Sukurti arba atnaujinti narių leidimus |
| DELETE | `/:id?formId=` | JWT | Formos prieiga | Ištrinti nario leidimą |
| DELETE | `/member/:id?formId=` | JWT | Formos prieiga | Ištrinti visus nario leidimus formai |

## Nustatymai

Pagrindinis kelias: `/membership/settings`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Gauti visus bažnyčios nustatymus |
| GET | `/public/:churchId` | Viešas | — | Gauti viešus bažnyčios nustatymus |
| POST | `/` | JWT | Settings.Edit | Išsaugoti nustatymus (palaiko paveikslėlių įkėlimą base64 formatu) |

## Domenai

Pagrindinis kelias: `/membership/domains`

Plečia standartinį CRUD (GET `/:id`, GET `/`, DELETE `/:id` iš bazinės klasės).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Išvardyti visus domenus |
| GET | `/:id` | JWT | — | Gauti domeną pagal ID |
| GET | `/lookup/:domainName` | JWT | — | Rasti domeną pagal pavadinimą |
| GET | `/public/lookup/:domainName` | Viešas | — | Viešai rasti domeną pagal pavadinimą |
| GET | `/health/check` | Viešas | — | Paleisti tikrinimą nepatikrintiems domenams |
| POST | `/` | JWT | Settings.Edit | Sukurti arba atnaujinti domenus (paleidžia Caddy atnaujinimą) |
| DELETE | `/:id` | JWT | Settings.Edit | Ištrinti domeną |

## Naudotojo bažnyčia

Pagrindinis kelias: `/membership/userchurch`

Tvarko naudotojų ir bažnyčių ryšį.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Gauti naudotojo ir bažnyčios įrašą pagal naudotojo ID |
| GET | `/personid/:personId` | JWT | — | Gauti susieto naudotojo el. paštą pagal asmenį |
| GET | `/user/:userId` | JWT | Server.Admin | Įkelti visas naudotojo bažnyčias |
| POST | `/` | JWT | — | Sukurti naudotojo ir bažnyčios ryšį |
| PATCH | `/:userId` | JWT | — | Atnaujinti paskutinio pasiekimo laiką ir įrašyti prieigą |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Ištrinti naudotojo ir bažnyčios įrašą |

## Matomumo nuostatos

Pagrindinis kelias: `/membership/visibilityPreferences`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Gauti dabartinio naudotojo matomumo nuostatas |
| POST | `/` | JWT | — | Išsaugoti matomumo nuostatas (adreso, telefono, el. pašto matomumas) |

## Užklausa

Pagrindinis kelias: `/membership/query`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Ieškoti narių natūralia kalba naudojant DI. Turinys: `{ text, subDomain, siteUrl }` |

## Kliento klaidos

Pagrindinis kelias: `/membership/clientErrors`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Įrašyti kliento pusės klaidą |

## Susiję puslapiai

- [Autentifikacija ir leidimai](./authentication.md) — Prisijungimo eiga, JWT, OAuth, leidimų modelis
- [Lankomumo galutiniai taškai](./attendance.md) — Pamaldų ir apsilankymų sekimas
- [Modulių struktūra](../module-structure.md) — Kodo organizavimo modeliai
