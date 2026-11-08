---
title: "Tinguquko Temkhatsi"
description: "Setha tifayela te-.envetiprojekthi te-ChurchApps, khetha i-API yedemo noma leyendzawo, bese ugcwalisa tinguquko te-B1 Admin, B1.church, B1 Checkin, nalokunye."
---

# Tinguquko Temkhatsi

<div class="article-intro">

Yonkhe iprojekthi ye-ChurchApps isebenzisa ifayela le-`.env` lekulungiselela endzaweni. Ngayinye yetiprojekthi ifaka ifayela lesampula lolungiselwa kutsi uyakopisha bese uyalungisa. Leli phepha limboza tinguquko temkhatsi te-API, ema-web app, nema-mobile app, kanye nendlela yekukhetha phakati kwetindzawo tedemo netendzawo letendzeni.

</div>

<div class="prereqs">
<h4>Ngaphambi Kokuqala</h4>

- Faka [tintfo letidzingekako](./prerequisites.md) letiprojekthi yakho
- Klone i-repository yeprojekthi ofuna kuyisebentela
- Hlola [Ukubuka Ngale Kweprojekthi](./project-overview.md) kutsi uyati kutsi yiphi imodyuli ye-API leprojekthi yakho edzinga

</div>

## Indlela Lejwayelekile

1. Funa `dotenv.sample.txt` noma `.env.sample` endzaweni yemzuzo weprojekthi.
2. Yikopisha ibe `.env`.
3. Lungisa tinkhomba njengoba kudzingeka.

```bash
# Sibonelo lweprojekthi ene-.env.sample
cp .env.sample .env

# Sibonelo lweprojekthi ene-dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Ungalokhi emafayela `.env` ku-version control.** Aqukete imfihlo njengetitifakelo tedatabhethi, tikhiye te-API, nemakhiyi e-JWT. Yonkhe iprojekthi ye-ChurchApps ifaka `.env` ku-`.gitignore`, kodvwa hlala uhlola kahle ngaphambi kokuthumela ekhodi.
:::

## Kukhetha Indzawo Ye-API

Sinqumo lesibaluleke kakhulu kutsi i-frontend yakho icondzise kuphi tikhombo te-API. Kukhona tinketho letimbili:

### Inketho 1: I-API Yedemo (Iyanconywa Kuntfuntfo Lwe-Frontend)

Sebentisa indzawo yedemo yelabelwanako. Akudzingeki i-API yendzawo noma kusetfwa kwedatabhethi. Isebentisa likhodi lelisha kakhulu kusuka ku-`main`, nedatha yayo yesampula igcwaliswa kabusuku ngabusuku.

```bash
# Indlela yesisekelo yeURL
https://api.demo.churchapps.org/{module}

# Tibonelo tetimodyuli te-URL
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Indzawo yekuhlola (`api.staging.churchapps.org`, `api.staging.lessons.church`, nakutikhomba letihlobene nato) seyiyekiwe. Tifayela tesampula te-`.env` letitsite tingase tisafake ema-URL ekuhlola; tishintshe ngetinkhomba tedemo noma tendzawo letikhonjiswe kuleli phepha. Alikho i-API ye-Lessons yelabelwanako yekungakakhiqizi -- sebentisa i-[LessonsApi](https://github.com/ChurchApps/LessonsApi) endzaweni (iletfwa ku-port `8090`) uma uyidzinga.
:::

### Inketho 2: I-API Yendzawo

Gijima iprojekthi ye-Api ekhompyutha yakho. Idzinga i-MySQL 8.0+ nemadatabhethi adalwe ngemodyuli ngayinye. Bona umhlahlandlela we-[kusetfwa kwendzawo kwe-API](../api/local-setup.md).

```bash
# Indlela yesisekelo yeURL
http://localhost:8084/{module}

# Tibonelo tetimodyuli te-URL
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Tinguquko Temkhatsi Te-API

Iprojekthi yesisekelo ye-**Api** (`.env.sample`) inetilungiselelo letinyenti kakhulu. Nansi tinguquko letibalulekile:

### Tilungiselelo Letabelanako

| Inguquko | Incazelo | Sibonelo |
|----------|-------------|---------|
| `ENVIRONMENT` | Indzawo yekusebenta | `dev` |
| `SERVER_PORT` | I-HTTP port yeseva yendzawo yekuthuthukisa | `8084` |
| `ENCRYPTION_KEY` | Likhiye lekubhalela le-192-bit yedatha lebucayi | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Imfihlo yekusayina ama-JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Lapho kugcinwa khona emafayela lalayishiwe (`disk` noma `s3`) | `disk` |
| `CORS_ORIGIN` | Tindzawo te-CORS letivumelekile (`*` yendzawo yekuthuthukisa) | `*` |

### Kuxhumana Nedatabhethi

I-URL yesisekelo yodvwa icondzisa i-API ku-MySQL. I-API ibeka indzawo yedatha ngayinye yemodyuli (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) kusuka kulesisekelo.

| Inguquko | Sibonelo |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Vuselela `root:password` ngetitifakelo takho te-MySQL letitfolo. Yonkhe i-database yemodyuli kufanele ibe khona ngaphambi kokugijima i-API. Sebentisa `npm run initdb` kutsi udale sakhiwo lwedatha lwayo yonkhe imodyuli, noma `npm run initdb:membership` kwemodyuli lenye.
:::

### Tilungiselelo Te-WebSocket

| Inguquko | Incazelo | Sibonelo |
|----------|-------------|---------|
| `SOCKET_PORT` | Port yeseva ye-WebSocket | `8087` |
| `SOCKET_URL` | I-URL ye-WebSocket lamaklayenti ayakhumbelela kuyo | `ws://localhost:8087` |

---

## Tinguquko Temkhatsi Te-Web App

### B1Admin (React + Vite)

Ifayela lesampula: `.env.sample`

| Inguquko | Incazelo | Sibonelo (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Libito lendzawo | `demo` |
| `PORT` | Port yeseva yekuthuthukisa | `3101` |
| `REACT_APP_API_BASE` | I-URL yesisekelo leyodvwa yazo tonkhe tI-API ye-ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` tiyangezelwa ngekutfola) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | I-URL yekulethwa kwemkhatsi | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | I-ID ye-Google Analytics (ayikho ibalulekile) | `UA-123456789-1` |

Kuze kuthuthukiswe i-API yendzawo, chaza i-URL yesisekelo kuleyo stack yakho yendzawo:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Ifayela lesampula: `.env.sample`

| Inguquko | Incazelo | Sibonelo (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | I-URL yesisekelo leyodvwa yazo tonkhe tI-API ye-ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` tiyangezelwa ngekutfola) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | I-URL yekulethwa kwemkhatsi | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | I-ID ye-Google Analytics (ayikho ibalulekile) | `UA-123456789-1` |

:::info
I-Next.js idinga sicalo `NEXT_PUBLIC_` kunoma yiphi inguquko yemkhatsi ledingeka kutsi itfolakale ku-browser. Tinguquko letisebenta ku-server kayidingi sicalo lesi.
:::

### LessonsApp (Next.js)

Ifayela lesampula: `dotenv.sample.txt`

| Inguquko | Incazelo | Sibonelo (LessonsApi Yendzawo) |
|----------|-------------|----------------------------|
| `STAGE` | Sigaba sendzawo (shiya ingasetfwanga noma `dev` kuze kuthuthukiswe endzaweni) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | I-URL ye-Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | I-URL yekulethwa kwemkhatsi | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Isisekelo se-API ye-ChurchApps lesetfwa kungena ngayo (yamukelwa kuphela uma i-`STAGE` ingasetfwanga noma ibe `dev`) | `https://api.demo.churchapps.org` |

---

## Tinguquko Temkhatsi Te-Mobile App

### B1Checkin (React Native / Expo)

Ifayela lesampula: `dotenv.sample.txt`

| Inguquko | Incazelo | Sibonelo |
|----------|-------------|---------|
| `EXPO_PUBLIC_STAGE` | Ikhetha sette ye-API i-app ehlanganisa kuyo: `dev` (i-API yendzawo ku-`http://127.0.0.1:8084`), `staging`, noma `prod` (yona leyisendleko uma ingasetfwanga) | `dev` |

I-B1Checkin isebentisa emamodyuli e-API ye-Membership ne-Attendance kuphela, kanye ne-URL yekulethwa kwemkhatsi; tindzawo tato ngalesigaba ngasinye tibekwe ku-`src/helpers/EnvironmentHelper.ts`.

:::info
I-Expo ifaka kuphela tinguquko letinesicalo `EXPO_PUBLIC_` ku-bundle yeapp. Qala kabusha i-dev server ngemyalo `yarn start --reset-cache` uma ushintsha i-`.env`.
:::

---

## Incwadzi Lesheshi Yekusheshisa: Tindzawo Tetifayela Tesampula

| Iprojekthi | Ifayela Lesampula |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
