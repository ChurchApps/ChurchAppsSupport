---
title: "Kutingenisela nge-Docker"
---

# Kutingenisela nge-Docker

<div class="article-intro">

Gijimisa i-instance yakho yangasese ye-B1 Admin, i-B1 member portal, i-API, kanye ne-database ye-MySQL kunoma ngumuphi umshini une-Docker -- iseva yasekhaya, i-VPS ye-$5, kumbe ibhokisi le-on-prem. Umyalo munye we-`docker compose up` uyakha futsi ucalisa konkhe. Nangabe ungatsandzi kuphatsa iseva nakukanjani, bona [Kutingenisela ku-Railway](./railway-template) kutfola lokunye lokuphatfwako.

</div>

## Kucala Ngekushesha

<div class="prereqs">
<h4>Loko Lokudzingeka</h4>

- I-[Docker Engine](https://docs.docker.com/engine/install/) ine-Compose v2 (ihlanganisiwe ku-Docker Desktop)
- Cishe u-4 GB we-RAM lokhona ngesikhatsi sekwakha kwekucala (tinhlelo te-web takhiwa kusuka ku-source)
- I-Git, kumbe kumane ifayela le-`docker-compose.yml` lelicwebekile

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

Kugijima kwekucala kutsatsa emaminithi lasi-10-20: kwakha i-B1Admin kusuka ku-clone yakho futsi kwakha i-API ne-B1App ngco kusuka ku-repository tato te-GitHub. Kucala lokulandzelako kutsatsa imizuzwana.

Nakukhona tisita letine tonkhe sesikhona:

1. Vula i-**http://localhost:3101** (B1 Admin).
2. Cindzetela **Register** bese wakha akhawunti yakho. I-akhawunti yekucala iba ngu-server admin ngco.
3. Landzela imiyalo lengekhatsi kwelinhlelo kute wakhe libandla lakho lekucala.

Ema-schema e-database akhiwa ngco ngeluhambo lwe-startup migration ye-container ye-API -- akudzingi i-SQL nangesandla.

| Sisita | I-URL |
|---------|-----|
| B1Admin (baphatsi/basebenti) | http://localhost:3101 |
| B1App (member portal / sayithi) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | ngekhatsi kuphela (`mysql:3306` ku-network ye-compose) |

## Kuhlelwa

Konkhe kuhlelwa kuhlala ku-fayela le-`.env` eceleni kwe-`docker-compose.yml`. Livariyebuli ngalinye linekusebenta kwe-default ye-localhost, ngako ifayela akudzingeki kuze kutsi ulikhetsekise.

```bash
# .env — konkhe akudzingeki; kukhonjiswe nema-default
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # tinhlamvu letili-32 ngco

# Ema-URL Lomphakatsi (shintja loku nawukhipha ngale kwelocalhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# I-Email — bona sigaba se-Email semhlahlandlela we-Railway kutfola imihambo yebaniki
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Ngaphambi kwekusetjentiswa lokungempela, shintja i-`MYSQL_ROOT_PASSWORD`, i-`JWT_SECRET`, kanye ne-`ENCRYPTION_KEY` (noma yimuphi umugca wetinhlamvu letili-32).

:::warning
Emanani la-`*_URL` **agcotjwe etinhlelweni te-web ngesikhatsi sekwakha** (kutiphatsa lokujwayelekile kwe-Vite/Next.js). Kushintja loku ku-`.env` kudzinga kwakha kabusha, hhayi kucala kabusha kuphela:

```bash
docker compose up -d --build
```
:::

Kushintja liphasiwedi le-MySQL ngemuva kwekucala kokugijimiswa kudzinga kubuyeketa liphasiwedi ngekhatsi kwe-MySQL nako -- i-volume igcina ema-credential lamadzala.

## Kuyikhipha Ku-Inthanethi

Beka noma ngumuphi i-reverse proxy ngembili bese unika sisita ngasinye ligama le-host. Nge-[Caddy](https://caddyserver.com/) kunje:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Bese uhlela ema-URL ku-`.env` bese wakha kabusha:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

I-WebSocket lesetjentiswa yekukhulumisana kanye netatiso letiphilako yabelana ne-port ye-API, ngako i-`SOCKET_URL` yimane iyi-URL ye-API nge-`wss://`.

## I-Email, Kunikela, Emasayithi Lamanyenti, Kanye Nekuhlanganiswa

Loku kusebenta ngendlela lefanako nekufakwa kwe-Railway -- emavariyebuli endzawo lafanako, ahlelwa ku-fayela lakho le-`.env` esikhundleni se-dashboard ye-Railway (i-compose file iwadlulisela ku-API):

- **[I-Email / SMTP](./railway-template#1-email-highly-recommended)** -- kuncocedwa kakhulu; ngaphandle kwako emalungu akakwati kubuyisela emaphasiwedi
- **[Emasayithi Lamanyenti](./railway-template#3-multi-site-multiple-churches-on-one-instance)** -- emabandla langenamkhawulo ku-instance yinye, aphatfwa ku-admin UI
- **[Kunikela ngco](./railway-template#4-online-giving-stripe--paypal)** -- kuhlelwa ngalinye libandla ku-admin UI, hhayi ngemavariyebuli endzawo
- **[Kuhlanganiswa lokungakhetsakala](./railway-template#6-optional-feature-integrations)** -- `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Imininingwane, Kugcinwa Kwesipeya (Backups), Kanye Nekugcinwa Kwemafayela

Ema-volume lamabili la-Docker lanemagama agcina sonkhe simo:

| Ivolume | Kucuketfwe |
|--------|----------|
| `mysql-data` | Onkhe ema-schema e-database |
| `api-content` | Emafayela lalayishiwe -- imidvwebo, imibhalo, imidvwebo yesayithi (igcotjwe ku-`/app/content`) |

Gcina sipeya se-database nge-command yinye (uyihlele nge-cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Gcina sipeya semafayela lalayishiwe ngekukopisha i-volume:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Emalybhulari lamakhulu emidvwebo, ungashintjela kugcinwa kwemafayela ku-S3 esikhundleni se-volume yasekhaya -- hlela i-`FILE_STORE=S3` kanye nemavariyebuli la-`AWS_*` lachaziwe [sigabeni sekugcinwa kwemafayela semhlahlandlela we-Railway](./railway-template#5-file-storage).

## Kubuyeketa

I-API ne-B1App takhiwa kusuka ku-`main` branch ye-repository tato te-GitHub; i-B1Admin yakhiwa kusuka ku-clone yakho yasekhaya.

```bash
git pull                              # buyeketa i-B1Admin
docker compose build --pull           # yakha kabusha onkhe emidvwebo ngeku-latest main
docker compose up -d
```

Ema-migration e-database agijima ngco nakucala i-container ye-API.

Kubopha tivasyini esikhundleni sekulandzela i-`main`, khomba ema-build context kuliphawu (tag) ku-`.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Batfutfukisi bangakhomba emavariyebuli lafanako ku-ema-checkout asekhaya (sibonelo, `API_CONTEXT=../Api`).

## Kulungisa Tinkinga

| Luphawu | Imbangela levamile | Sicondziso |
|---------|--------------|-----|
| I-container ye-`api` icala kabusha njalonjalo | I-MySQL ayikalungi kumbe migration iyehluleka | `docker compose logs api` -- i-migration ikhipha kutsi ngumuphi umodyuli lowehlulekile |
| Kungena kubuyisela ku-`api.churchapps.org` | Uhlelo lwe-web lwakhiwe ngaphandle kwema-`custom` stage args | Yakha kabusha: `docker compose build --no-cache b1admin b1app` |
| Ushintje i-URL ku-`.env` kodvwa akwenteki lutfo | Ema-URL agcotjwa ngesikhatsi sekwakha | `docker compose up -d --build` |
| "Check your email" kodvwa akukho imeyili lefikako | `MAIL_SYSTEM=SMTP` ine-credential lembi | Lungisa ema-credential, kumbe susa i-`MAIL_SYSTEM` kute uvimbe imeyili |
| Tici tekukhulumisana/kuphila tithule dvu | I-`SOCKET_URL` ayifinyeleleki kusuka ku-browser | Kufanele ibe `wss://` ngemuva kwe-HTTPS futsi iproxishwe ku-port 8084 |
| Kwakha kuyafa ku-VPS lencane | Kute i-memory ngesikhatsi se-`next build` | Engeta i-swap, kumbe wakhe kulomunye umshini bese `docker save`/`load` |

Usasibambekile? Vula i-issue ku-[github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) unamatsele lokukhishwe yi-`docker compose logs`.

## Emahloko Lahlobene

- **[Kutingenisela ku-Railway](./railway-template)** -- lokunye lokuphatfwako, kanye nemihlahlandlela yekuhlelwa lokulandzela kufakwa lesabelwanako
- **[Kuhlelwa Kwekucala](../../getting-started/initial-setup)** -- tinyatselo tekucala ngemuva kwekutsi libandla lakho likhiwe
- **[API Local Setup](../api/local-setup)** -- kugijimisa situlo ngco ekutfutfukiseni
