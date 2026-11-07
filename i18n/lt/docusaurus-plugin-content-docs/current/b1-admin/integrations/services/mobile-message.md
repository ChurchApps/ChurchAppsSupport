---
title: "Mobile Message"
description: "Prijunkite B1 Admin renginius prie Mobile Message SMS API per Zapier ar Make, kad siųstumėte sveikinimo, aukų ir priminimų žinutes."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) yra Australijos SMS API. Jis populiarus tarp Australijos bažnyčių, nes siūlo vietinius numerius ir konkurencingas kainas Australijai, tuo tarpu Clearstream ir Text In Church daugiausia orientuoti į JAV. Mobile Message šiuo metu neturi pirmos klasės Zapier programėlės, tačiau viešai skelbia REST API, todėl B1 įvykius galite susieti su Mobile Message žinutėmis per **Webhooks by Zapier** (arba Make HTTP modulį) per kelias minutes.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Mobile Message](https://mobilemessage.com.au) paskyra su registruotu Sender ID ir API prisijungimo duomenimis (API vartotojo vardas ir slaptažodis, rasti *Account → API Settings*)
- [Zapier](https://zapier.com) paskyra (arba [Make](https://www.make.com))
- B1Admin vartotojas su **Edit Settings** leidimu

</div>

## Ką galite sujungti

Mobile Message API yra skirtas SMS siuntimui: jokių trigerių, tik išeinančios žinutės. Todėl visi receptai yra kryptimi B1 → SMS:

| Kryptis | B1 trigeris | Rezultatas |
|---|---|---|
| B1 → Mobile Message | `person.created` | Sveikinimo žinutė naujam asmeniui |
| B1 → Mobile Message | `donation.created` | Padėkos žinutė aukotojui |
| B1 → Mobile Message | `form.submission.created` | Pranešimas budinčiai komandai |
| B1 → Mobile Message | `event.created` | Priminimo transliacija sąrašui |

## Sąranka

### 1. Sukurkite B1 API raktą

**Settings → Developer → API Keys → New API Key**:

- `settings:write`, kad trigerio webhook galėtų užsiregistruoti
- `people:read`, kad pagal `personId` galėtumėte rasti gavėjo telefono numerį

### 2. Sukurkite Zap su Webhooks by Zapier

1. **Trigeris**: B1.church. Pasirinkite norimą įvykį (pvz., New Donation).
2. **Veiksmas**: B1.church. Find Person (naudojant `data.personId`), kad gautumėte telefono numerį ir vardą.
3. **Veiksmas**: Webhooks by Zapier. **POST**. Sukonfigūruokite kaip nurodyta žemiau.

POST žingsnio nustatymai:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier tai prideda automatiškai)
- **Basic Auth**: *Basic Auth* lauke nurodykite `<api_username>|<api_password>` (Zapier tai paverčia į teisingą `Authorization: Basic …` antraštę)

Įjunkite Zap. Išbandykite B1Admin sistemoje atlikdami bandomąją auką ir patikrinkite, ar atkeliauja žinutė.

## Dažni receptai

### Įvykių priminimai ryte

- **Trigeris**: Schedule by Zapier (kasdien, 7:00)
- **Veiksmas**: B1.church. Find Events šiandienai (arba naudokite Find žingsnį su fiksuotu datos filtru, arba išsaugokite šiandienos įvykių sąrašą Google Sheets)
- **Veiksmas**: Webhooks by Zapier. POST į Mobile Message su įvykių sąrašu pasirinktai prenumeratorių grupei

### Paketinio endpoint'o naudojimas sąrašo transliacijai

Mobile Message `/v1/messages` endpoint'as vienu kvietimu priima iki 10 000 žinučių. Norint transliuoti žinutę B1 grupei:

- **Trigeris**: B1.church. New Form Submission (filtruokite pagal konkrečią formą)
- **Veiksmas**: B1.church. List Group Members tikslinei grupei (per *Webhooks by Zapier — GET* žingsnį su `/membership/groupmembers?groupId=…`)
- **Veiksmas**: Formatter by Zapier → Utilities → Line-itemize, kad atsakymas būtų paverstas `messages` masyvu
- **Veiksmas**: Webhooks by Zapier. POST visą masyvą į `/v1/messages`

### Make alternatyva

Jei naudojate Make, po B1 Watch Events trigerio įdėkite **HTTP — Make a request** modulį ir sukonfigūruokite jį taip pat (POST, Basic Auth, JSON turinys). B1 pusės informaciją rasite [Make apžvalgoje](../make.md).

## Apribojimai ir pastabos

- **Basic Auth yra vienintelis autentifikavimo metodas.** Mobile Message išduoda vartotojo vardą ir slaptažodį iš valdymo skydelio. Su abiem elkitės kaip su slaptais duomenimis.
- **`sender` turi būti registruotas Sender ID jūsų Mobile Message paskyroje**, kitaip siuntimas grąžins `400 Invalid sender`. Australijos reglamentai reikalauja siuntėjo registracijos.
- **Australijos telefono numeriai** gali būti `0412345678` (vietinis) arba `+61412345678` (tarptautinis). API priima abu, tačiau jei siunčiate žinutes ir į užsienį, geriau normalizuokite numerius į formatą `+61…`.
- **Iki 10 000 žinučių vienai užklausai.** Tai naudinga transliacijoms, tačiau vienas B1 webhook pranešimas retai sukurs tokį didelį sąrašą, todėl paketinį endpoint'ą rezervuokite planuojamiems masiniams Zap.

## Trikčių šalinimas

- **POST grąžina `401 Unauthorized`**: Basic Auth prisijungimo duomenys neteisingi. Nukopijuokite juos iš Mobile Message valdymo skydelio *Account → API Settings* iš naujo. Atkreipkite dėmesį, kad vartotojo vardas pagal numatytuosius nustatymus yra jūsų paskyros el. paštas, o ne atskiras API raktas.
- **POST grąžina `400 Invalid sender`**: `sender` reikšmė nėra registruotas Sender ID jūsų paskyroje. Pirmiausia jį užregistruokite Mobile Message valdymo skydelyje.
- **Žinutė atkeliauja, bet nukirpta**: Mobile Message žinutes, ilgesnes nei ~160 simbolių, padalija į kelias dalis, o mokama už kiekvieną dalį. Patikrinkite atsakymo turinį, nes jame nurodytas dalių skaičius.

## Taip pat žr.

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): alternatyvūs SMS tiekėjai su natyviomis Zapier programėlėmis (Webhooks by Zapier žingsnio nereikia)
- [Zapier (apžvalga)](../zapier.md): B1 pusė kiekvienam Zapier receptui
- [Mobile Message API dokumentacija](https://mobilemessage.com.au/api-documentation)
