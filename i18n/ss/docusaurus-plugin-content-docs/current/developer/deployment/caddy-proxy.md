---
title: "I-Caddy Custom-Domain Proxy"
---

# I-Caddy Custom-Domain Proxy

<div class="article-intro">

Emadomeni ebandla lakhetsekile (`mychurch.org` → sayithi ye-B1 yebandla) aphelela ku-bhokisi yinye ye-Windows EC2 legijimisa i-Caddy. Lelibhokisi linamalungelo etitifiketi te-TLS, lisombulula ngamunye wemadomeni abe yisayithi yayo ye-`{sub}.b1.church`, futsi lisebentisa i-reverse-proxy nge-Host header lebuyekwetiwe. Kuhlelwa kwalo konkhe kumafayela lamabili -- i-`Caddyfile` lemile kanye ne-`hosts.map` lebuyekwetwa kusuka ku-Membership API -- ngako liyasinda ekucaleni kabusha (restarts) ngaphandle kwe-runtime state. Lelikhasi likhuluma ngendlela lelibhokisi lakhiwa ngayo kusuka ekucaleni, ngendlela lisebenta ngayo, kanye netingoti letihlolwe ensimini letitokusiluma nome ngubani lolakha kabusha.

</div>

Kutsi sicelo (request) sisombulula njani kubandla/sayithi nasesifikile ku-B1App, bona [Website Routing & Multi-Site](../architecture/websites).

## Tincumo (Components)

| Incenye | Yini |
|---|---|
| I-EC2 instance | I-Windows Server; Elastic IP **`3.23.251.61`** (yakhelwe ku-DNS yebandla emhlabeni wonkhe -- i-IP yihlala njalo, ema-instance ayalahlwa) |
| `C:\caddy\caddy.exe` | I-Caddy build **lekhetsekile** lenemodyuli yekugcina i-`techknowlogick/certmagic-s3` -- i-Caddy lejwayelekile ayikwati kufundza i-cert store |
| `C:\caddy\Caddyfile` | Kuhlelwa kwakho konkhe kwe-proxy: on-demand TLS, i-`map` ye-host→upstream, kubuyisela www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Umugca munye we-`{domain} {sub}.b1.church` ngelilodwa lelidomeni lelicondzako, longeniswe ku-blog ye-`map` ye-Caddyfile |
| `sync-hostmap.ps1` + umsebenti we-`CaddyHostmapSync` | Umsebenti lohlelekile (ngemaminithi lasihlanu + ekucaleni, njenge-SYSTEM) obuyeketa i-`hosts.map` kusuka ku-API futsi ubuyisela i-Caddy kamnandzi kuphela nakukhona kushintjo |
| Umsebenti we-Windows we-`caddy` (WinSW wrapper) | Ugijimisa i-`caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; uyacala kabusha ngco nakuhlulekile. I-Caddy ayati i-SCM, ngako i-wrapper iyadzingeka |
| I-bucket ye-S3 `churchapps-caddy-certs` | Kugcinwa kwesitifiketi lokusabelwanako (`region us-east-2`, prefix `certs`) -- titifiketi tiyasinda ekwakhweni kabusha kwe-instance |
| Indima ye-IAM `CaddyRole` | Inika i-instance imfinyelelo ye-S3; i-Caddy isebentisa i-AWS default credential chain (kute makhi ekuhleleni) |

## Ema-endpoint lamabili we-API lelibhokisi lincike kuwo

Onkhe lamabili awadzingi kungena (anonymous), ku-Membership API:

| Endpoint | Indzima |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Isango le-Caddy's on-demand TLS `ask`: `200 {"authorized":true}` nakukhona i-host (kumbe, ye-host ye-`www.`, i-apex yayo) iyilayini ku-`domains`; `404` nangabe kungenjalo. Loku kulawulo lekulimala (abuse control) -- i-Caddy ayikukhishi sitifiketi se-host lelilahlwa yilendlela |
| `GET /membership/domains/hostmap` | I-`text/plain`, ihleliwe, ngaphandle kwekuphindzaphindza kwemigca ye-`{domain} {sub}.b1.church` (yati sayithi: idomeni lelinikwe sayithi lesesibili lifonela i-subdomain yaleso sayithi). Umtfombo we-`map` |

## Luhambo Lwesicelo (Request Flow)

1. I-browser isombulula i-`mychurch.org` → `3.23.251.61` (irekhodi le-apex `A`, kumbe i-`CNAME proxy.b1.church`).
2. I-Caddy iphelisa i-TLS. Sitifiketi sikhona ku-S3 → sikhontiswa; i-SNI lengaziwa → i-`authorize` iyabuztwa; 200 → sikhishwa nge-on demand nge-Let's Encrypt; 404 → **luxhumano luyalahlwa** (kute sitifiketi, kute mphendvulo -- i-host lengaziwa iyalahlwa ku-TLS, hhayi i-phutsa le-HTTP).
3. I-`map` isombulula i-Host ibe `{sub}.b1.church`; i-`www.{apex}` itfola i-302 iye ku-apex; i-host lelivumelekile kodvwa lelingakamephwa (idomeni lensha lisese ku-window yekubuyeketwa le-≤5-emaminithi) itfola i-404 lecwebekile.
4. I-`reverse_proxy` ifonela i-`{sub}.b1.church:443` nge-SNI ne-Host lebuyekwetiwe kutsi zibe yi-upstream, ngako i-edge ye-Vercel isikhontisa sayithi ye-B1App.
5. I-port 80 ivumela ema-ACME HTTP-01 challenges futsi ibuyisela ngeb-308 konkhe lokunye ku-https.

Kusabalala kwedomeni lelisha: idomeni legcinwe ku-B1Admin ibe lecondzako emaminithini lacishe abe ngu-5 (umsebenti wekubuyeketa); sitifiketi sayo sikhishwa ekufikeni kwakuchamuka kwe-HTTPS.

## Kwakha Lelibhokisi Kusuka Ekucaleni

Kufingiwe kusuka endleleni lehlolwe ensimini (imiyalo lecwebekile lenyatselo-nganyatselo ihlala ku-ops workspace, hhayi kule repository). Tidzingo kucala -- kwakha akusebenti ngaphandle kwato:

1. **IAM**: hlomisa i-`CaddyRole` (imfinyelelo ye-S3 ku-bucket yesitifiketi) ku-instance. Chaka nge-IMDSv2 kusuka ebhokisini -- caphela kutsi i-IMDS GET lengenalutfo lebuyisa i-401 kumane kutsi i-IMDSv2 iyaphocelelwa, hhayi kutsi "akukho ndima".
2. **Kuphila kwe-API**: i-`authorize` kufanele ibuyise i-404 yedomeni lengasiyo yangempela futsi i-`hostmap` kufanele ibuyise i-200 ngaphambi kwaloko lokunye.

Bese:

3. **I-Binary**: landza i-build lekhetsekile kusuka ku-build service ye-Caddy -- `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB uma kucatjaniswa ne~45 MB lejwayelekile; v2.11.4 ngesikhatsi kubhalwa loku). Kukhetfwa kwemodyuli kuyabaluleka: i-`techknowlogick/certmagic-s3` isebentisa emakhi la-`bucket`/`region`/`prefix` lafana nesakhiwo sesitifiketi lesikhona; i-fork ye-`ss098` isebentisa i-`host`/`endpoint` futsi **ngeke** itfole titifiketi letikhona.
4. **Emafayela**: i-`Caddyfile` + i-`sync-hostmap.ps1` ku-`C:\caddy\`; hlwanyela i-map kanyekanye nge-`sync-hostmap.ps1 -NoReload`.
5. **Emasango ngaphambi kwekucala kwekucala**: i-`caddy list-modules` kufanele ikhombise imodyuli yekugcina ye-s3; i-`caddy adapt` kufanele ikhiphe i-`"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` ku-blog yayo yekugcina; i-`caddy validate` kufanele iphumelele.
6. **Umsebenti**: faka nge-WinSW (service id `caddy`, kucala kabusha ngco nakuhlulekile, ema-logi laqhubekako). Igijima njenge-LocalSystem, lefinyelela ku-IMDS kutfola ema-credential endima.
7. **Umsebenti wekuhlanganisa**: bhalisa i-`CaddyHostmapSync` (SYSTEM, ngemaminithi lasihlanu + ekucaleni, umkhawulo wekusebenta wemaminithi lasine).
8. **Chaka ngaphambi kwekushintjwa (pre-cutover)** ngekusombulula ngenkani emadomeni abe `127.0.0.1` nge-`curl --resolve` (lelibhokisi alikho na-traffic yangempela kuze kutsi i-EIP yisuke): idomeni lelikhona kufanele likhontise ngesitifiketi lesivalidi lesitfwalwe (carried-over); i-`www.` kufanele i-302; i-host lengaziwa kufanele ilahlwe ku-TLS; futsi i-`Restart-Service caddy` kufanele ibuyele ikhontisa **ngaphandle kwekuphindze kuhlonyelwa ngesandla** -- lolo hlolo lwekucala kabusha ngiko konke lenhloso yalesakhiwo lesimile.
9. **Kucala Kusebenta**: hlanganisa kabusha i-Elastic IP `3.23.251.61` ku-instance lensha. I-DNS yebandla ayishintji.

## Tingoti letihlolwe ensimini (funda ngobunzima -- ungabuyeli emuva)

| Ingoti | Luphawu | Sicondziso |
|---|---|---|
| `tls_server_name {vars.upstream}` ku-reverse_proxy transport | Onkhe idomeni leliyi-proxy liba ne-502: ema-placeholder e-map asombulula **angenalutfo ngesikhatsi se-TLS-dial** ("either ServerName or InsecureSkipVerify must be specified") | Sebentisa i-placeholder ye-transport-native: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Tinkhinombolo letiphindziwe kumbe imigca lengasiyo yangempela ku-`hosts.map` | I-`map` handler ye-Caddy **iyaphutsa nakukhona kunkhinombolo lephindziwe** -- umugca munye lomubi ungawisa konkhe kuhlelwa | Iscript sekuhlanganisa sihlela emagebhe, silahla imigca lengekho ngendlela lefanele (silahla konkhe kuphela nangabe >20% ayimibi), sisusa kuphindzaphindza kucala kuwina, futsi sibhala i-UTF-8 **legcono BOM** (i-BOM ionakalisa inkhinombolo yekucala ye-map). I-API nayo icoca imigca legcwele nome lena tikhala kusuka emtfombeni |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Kubhaliswa komsebenti **kuyehluleka ngasese** (XML lengekho ku-range, iphutsa lelingapheli) | Yakha kuphindza-phindza njenge-`MSFT_TaskRepetitionPattern` CIM instance nge-`Interval = "PT5M"` futsi ngaphandle kwesikhatsi; engeta umkhawulo wesikhatsi sekusebenta wemaminithi lamane (lokucala kwe-SYSTEM kungabambeka ku-TLS/CRL lookup lebandzako) |

:::warning
I-admin API ibopha ku-`localhost:2019` kuphela. Indlela ye-runtime lendzabuko yembula loku kubukwa kutalekutsi kutsi i-Membership API icindzetele kuhlelwa kwendlela; sakhiwo lesimile asidzingi kucindzetelwa kwangaphandle, futsi indzawo lencane iyahlosiwe. I-`caddy reload` (legijima ngasekhaya yiscript sekuhlanganisa) yiyo kuphela lesebentisa i-admin-API.
:::

:::info Kucindzetelwa kwendabuko ye-runtime
I-`CaddyHelper` ku-API (kanye nema-endpoint la-`/membership/domains/caddy` + `/caddy/init`) asakhona njengendlela yekubuyela emuva ku-indlela lendabuko lehlelwe ye-runtime. Kuhlelelwe kususwa nakusiphelile emaviki lambalwa lelibhokisi lelimile selizinzile -- ngemuva kwaloko, `authorize` + `hostmap` yiwo kuphela emaphoyinti ekuhlanganisa.
:::

## Kusebenta (Operations)

- **Ema-Logi**: ema-logi laqhubekako e-WinSW ku-`C:\caddy\` (i-service stdout/err -- emaphutsa e-reverse-proxy afika ku-`caddy-service.err.log`); umlandvu wekuhlanganisa ku-`C:\caddy\sync-hostmap.log`.
- **Cindzetela kubuyeketwa kwe-map**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Kushintja kuhlelwa**: hlela i-`C:\caddy\Caddyfile`, bese `caddy validate` + `caddy reload` (kumbe `Restart-Service caddy` -- kucala kabusha kuphephile ngesakhiwo).
- **Kususwa kwemadomeni lamanyenti** kucindzetela isivikeli sekunciphisa (shrink guard) seskripthi sekuhlanganisa ngenhloso; sudvusela i-`hosts.map` lendzala eceleni bese uphindza ugijimise umsebenti kute wemukele kunciphiswa lokukhulu lokuhlosiwe.
- **Imiyalo ye-DNS yemabandla ayishintji nanini**: apex `A 3.23.251.61` kumbe `CNAME proxy.b1.church`.

## Emakhasi Lahlobene

- [Website Routing & Multi-Site](../architecture/websites) -- kutsi sicelo lesiyi-proxy sisombulula njani kubandla/sayithi ku-B1App
- [Kufakwa Kwe-API](./apis) -- kufaka i-Membership API lesebentisa i-`authorize`/`hostmap`
