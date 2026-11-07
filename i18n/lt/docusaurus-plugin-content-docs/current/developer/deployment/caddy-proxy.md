---
title: "Caddy pasirinktinių domenų tarpinis serveris"
---

# Caddy pasirinktinių domenų tarpinis serveris

<div class="article-intro">

Pasirinktiniai bažnyčių domenai (`mychurch.org` → bažnyčios B1 svetainė) pasiekia vieną Windows EC2 serverį, kuriame veikia Caddy. Serveris valdo TLS sertifikatus, kiekvieną domeną susieja su jo `{sub}.b1.church` svetaine ir perduoda užklausas toliau (reverse-proxy) su perrašyta Host antraště. Visa jo konfigūracija sudaryta iš dviejų failų – statinio `Caddyfile` ir `hosts.map`, kurį atnaujina Membership API – todėl jis po paleidimo iš naujo atsistato be jokios veikimo metu saugomos būsenos. Šiame puslapyje aprašoma, kaip serveris sukuriamas nuo nulio, kaip juo valdoma ir kokių praktiškai patikrintų spąstų reikia vengti tiems, kas jį atkurs.

</div>

Apie tai, kaip užklausa, pasiekusi B1App, nustatoma į bažnyčią ir svetainę, skaitykite [Svetainių maršrutizavimas ir kelios svetainės](../architecture/websites).

## Komponentai

| Dalis | Ką ji reiškia |
|---|---|
| EC2 egzempliorius | Windows Server; Elastic IP **`3.23.251.61`** (bažnyčių DNS įrašuose visame pasaulyje – IP nuolatinis, egzemplioriai gali būti pakeičiami) |
| `C:\caddy\caddy.exe` | **Pritaikyta** Caddy versija su `techknowlogick/certmagic-s3` saugyklos moduliu – standartinis Caddy nemoka nuskaityti sertifikatų saugyklos |
| `C:\caddy\Caddyfile` | Visa tarpinio serverio konfigūracija: TLS pagal poreikį, `map` iš domeno į vidinį adresą, www → šaknies domeno nukreipimai, `:80` → https |
| `C:\caddy\hosts.map` | Po vieną eilutę `{domain} {sub}.b1.church` kiekvienam maršrutizuojamam domenui; įtraukiama į Caddyfile `map` bloką |
| `sync-hostmap.ps1` ir `CaddyHostmapSync` užduotis | Suplanuota užduotis (kas 5 minutes ir paleidus sistemą, kaip SYSTEM) atnaujina `hosts.map` iš API ir Caddy sklandžiai perkrauna tik tada, kai pasikeičia turinys |
| Windows paslauga `caddy` (WinSW apvalkalas) | Paleidžia `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; automatiškai paleidžiama iš naujo po klaidos. Caddy nepalaiko SCM, todėl reikalingas apvalkalas |
| S3 saugykla `churchapps-caddy-certs` | Bendra sertifikatų saugykla (`region us-east-2`, priešdėlis `certs`) – sertifikatai išlieka pakeitus egzempliorių |
| IAM vaidmuo `CaddyRole` | Suteikia egzemplioriui prieigą prie S3; Caddy naudoja standartinę AWS numatytųjų kredencialų grandinę (konfigūracijoje raktų nėra) |

## Dvi API galinės vietos, nuo kurių priklauso serveris

Abi – Membership API. `authorize` pasiekiama be autentifikacijos; `hostmap` nuo Api PR #67 (2026-08-16) reikalauja antraštės `x-internal-key: <INTERNAL_API_KEY>` – `sync-hostmap.ps1` ją nuskaito iš `C:\caddy\internal-key.txt`:

| Galinė vieta | Paskirtis |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy **pagal poreikį TLS `ask` vartai**: `200 {"authorized":true}`, kai host (o `www.` host atveju – jo šaknies domenas) yra `domains` lentelės eilutė; kitu atveju `404`. Tai apsaugos nuo piktnaudžiavimo priemonė – Caddy nesukurs sertifikato host, kurio ši galinė vieta atmeta |
| `GET /membership/domains/hostmap` | Reikalauja `x-internal-key` (arba serverio administratoriaus JWT). `text/plain`, surūšiuotos, be dublikatų `{domain} {sub}.b1.church` eilutės (atsižvelgiama į svetaines: domenas, priskirtas antrinei svetainei, nukreipiamas į tos svetainės subdomeną). Šaltinis `map` |

## Užklausos eiga

1. Naršyklė išsprendžia `mychurch.org` → `3.23.251.61` (šaknies domeno `A` įrašas arba `CNAME proxy.b1.church`).
2. Caddy užbaigia TLS. Sertifikatas jau yra S3 → pateikiamas; nežinomas SNI → klausiama `authorize`; 200 → išduodamas pagal poreikį per Let's Encrypt; 404 → **rankospaudimas atmetamas** (nėra sertifikato, nėra atsakymo – nežinomas host gauna TLS atmetimą, o ne HTTP klaidą).
3. `map` išsprendžia Host į `{sub}.b1.church`; `www.{apex}` gauna 302 nukreipimą į šaknies domeną; leidžiamas, bet nesusietas host (visiškai naujas domenas per ≤5 minučių sinchronizavimo langą) gauna švarią 404.
4. `reverse_proxy` jungiasi prie `{sub}.b1.church:443` su SNI ir Host, perrašytu į vidinį adresą, todėl Vercel kraštinis serveris pateikia B1App svetainę.
   Caddy taip pat siunčia lankytojo pradinį domeną kaip `X-Church-Host` (Vercel perrašo `X-Forwarded-Host` perrašytu Host). B1App tarpinė programinė įranga priima jį tik tada, kai `/domains/public/lookup/{host}` susieja jį su tuo pačiu `{sub}`, kaip ir užklausos host, tada atskleidžia jį kaip `x-public-host` kanoniniam `Link` antraštei, `robots.txt` ir `sitemap.xml`; kliento siunčiama `x-public-host` visada pašalinama. Schema.org `ChurchJsonLd` vis dar naudoja `b1.church` URL (antraščių skaitymas ten padarytų puslapius dinamiškus).
5. 80 prievadas perduoda ACME HTTP-01 patikrinimus ir visa kita 308 nukreipimu perkelia į https.

Naujo domeno sklaida: domenas, išsaugotas B1Admin, tampa maršrutizuojamas per ~5 minutes (sinchronizavimo užduotis); jo sertifikatas sukuriamas pirmą kartą atsidarius HTTPS.

## Serverio kūrimas nuo nulio

Suglaudinta praktiškai patikrinto proceso versija (išsamios instrukcijos su kopijuojamomis komandomis yra operacijų darbo aplinkoje, ne šioje saugykloje). Pirmiausia – būtinos sąlygos; be jų kūrimas neveiks:

1. **IAM**: prie egzemplioriaus prijunkite `CaddyRole` (prieiga prie S3 sertifikatų saugyklos). Patikrinkite per IMDSv2 iš serverio – atkreipkite dėmesį, kad paprasta IMDS GET užklausa, grąžinanti 401, reiškia tik tai, kad IMDSv2 yra privalomas, o ne tai, kad vaidmens nėra.
2. **API būklė**: prieš viską `authorize` turi grąžinti 404 netikram domenui, o `hostmap` (su antraštė `x-internal-key`) – 200.

Tada:

3. **Dvejetainis failas**: atsisiųskite pritaikytą versiją iš Caddy kūrimo paslaugos – `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB, palyginti su ~45 MB standartine; v2.11.4 rašymo metu). Modulio pasirinkimas svarbus: `techknowlogick/certmagic-s3` naudoja raktus `bucket`/`region`/`prefix`, atitinkančius esamą sertifikatų struktūrą; `ss098` šaka naudoja `host`/`endpoint` ir **nesuras esamų sertifikatų**.
4. **Failai**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (produkcinis `INTERNAL_API_KEY`, viena eilutė) į `C:\caddy\`; žemėlapį vieną kartą užpildykite su `sync-hostmap.ps1 -NoReload`.
5. **Patikros prieš pirmą paleidimą**: `caddy list-modules` turi rodyti s3 saugyklos modulį; `caddy adapt` turi išvesti `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` saugyklos bloke; `caddy validate` turi praeiti.
6. **Paslauga**: įdiekite per WinSW (paslaugos id `caddy`, automatinis paleidimas iš naujo po klaidos, sukamieji žurnalai). Veikia kaip LocalSystem, kuris pasiekia IMDS vaidmens kredencialams gauti.
7. **Sinchronizavimo užduotis**: užregistruokite `CaddyHostmapSync` (SYSTEM, kas 5 minutes ir paleidžiant, 4 minučių vykdymo riba).
8. **Patikrinimas prieš perjungimą**: priverstinai išspręskite domenus į `127.0.0.1` su `curl --resolve` (kol EIP nepakeistas, serveris negauna tikro srauto): esamas domenas turi būti pateikiamas su galiojančiu perkeltu sertifikatu; `www.` turi gauti 302; nežinomas host turi būti TLS atmetamas; o `Restart-Service caddy` turi grąžinti paslaugą **be jokio rankinio pakartotinio paruošimo** – šis paleidimo iš naujo testas ir yra visas statinio dizaino tikslas.
9. **Paleidimas**: perkelkite Elastic IP `3.23.251.61` į naują egzempliorių. Bažnyčių DNS niekada nekeičiamas.

## Praktiškai patikrinti spąstai (išmokta sunkiu būdu – neatkartokite)

| Spąstai | Simptomas | Sprendimas |
|---|---|---|
| `tls_server_name {vars.upstream}` reverse_proxy transporte | Kiekvienas perduodamas domenas gauna 502: `map` vietos rezervavimo ženklai **TLS jungimosi metu išsprendžiami į tuščią reikšmę** („either ServerName or InsecureSkipVerify must be specified") | Naudokite transporto vietinį vietos rezervavimo ženklą: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Dublikuoti raktai ar šiukšlių eilutės `hosts.map` | Caddy `map` apdorojimo priemonė **griežtai nutraukia darbą dėl dublikuoto įvesties rakto** – viena bloga eilutė gali sugadinti visą konfigūraciją | Sinchronizavimo skriptas normalizuoja tarpus, pašalina netinkamas eilutes (atmeta visą failą tik tada, jei >20% yra blogos), pašalina dublikatus išlaikydamas pirmąjį ir įrašo **be BOM** UTF-8 (BOM sugadina pirmąjį žemėlapio raktą). API taip pat filtruoja tuščias domenų eilutes arba eilutes su tarpais dar šaltinyje |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Užduoties registracija **tyliai nepavyksta** (XML už ribų, nefatališka klaida) | Pakartojimą sukurkite kaip `MSFT_TaskRepetitionPattern` CIM egzempliorių su `Interval = "PT5M"` ir be trukmės; pridėkite 4 minučių `ExecutionTimeLimit` (pirmasis SYSTEM paleidimas gali užstrigti dėl šaltos TLS/CRL užklausos) |

:::warning
Administravimo API įrištas tik prie `localhost:2019`. Senasis veikimo laiko režimas leido jį pasiekti nuotoliniu būdu, kad Membership API galėtų siųsti maršrutų konfigūracijas; statiniam dizainui nuotoliniai siuntimai nereikalingi, o mažesnis paviršius yra sąmoningas sprendimas. `caddy reload` (paleidžiamas lokaliai sinchronizavimo skripto) yra vienintelis administravimo API vartotojas.
:::

:::info Senasis veikimo laiko siuntimas
`CaddyHelper` API (ir `/membership/domains/caddy` + `/caddy/init` galinės vietos) vis dar egzistuoja kaip atsarginis kelias į senąjį veikimo laiko konfigūruojamą režimą. Jos bus ištrintos, kai statinis serveris bus stabilus kelias savaites – po to vienintelės integracijos vietos bus `authorize` ir `hostmap`.
:::

## Veikimas

- **Žurnalai**: WinSW sukamieji žurnalai `C:\caddy\` kataloge (paslaugos stdout/err – tarpinio serverio perdavimo klaidos patenka į `caddy-service.err.log`); sinchronizavimo istorija – `C:\caddy\sync-hostmap.log`.
- **Priverstinis žemėlapio atnaujinimas**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Konfigūracijos pakeitimas**: redaguokite `C:\caddy\Caddyfile`, tada `caddy validate` + `caddy reload` (arba `Restart-Service caddy` – paleidimas iš naujo yra saugus pagal dizainą).
- **Masinis domenų trynimas** sąmoningai suaktyvina sinchronizavimo skripto apsaugą nuo susitraukimo; norėdami patvirtinti tyčinį didelį susitraukimą, perkelkite seną `hosts.map` į šalį ir paleiskite užduotį iš naujo.
- **DNS instrukcijos bažnyčioms nesikeičia niekada**: šaknies domenas `A 3.23.251.61` arba `CNAME proxy.b1.church`.

## Susiję puslapiai

- [Svetainių maršrutizavimas ir kelios svetainės](../architecture/websites) – kaip tarpinio serverio užklausa B1App nustatoma į bažnyčią ir svetainę
- [API diegimas](./apis) – Membership API, kuris teikia `authorize`/`hostmap`, diegimas
