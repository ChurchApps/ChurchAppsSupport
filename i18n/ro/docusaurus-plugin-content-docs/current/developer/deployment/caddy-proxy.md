---
title: "Proxy Caddy pentru domenii personalizate"
---

# Proxy Caddy pentru domenii personalizate

<div class="article-intro">

Domeniile personalizate ale bisericilor (`mychurch.org` → site-ul web B1 al bisericii) ajung la o singură mașină Windows EC2 care rulează Caddy. Mașina deține certificatele TLS, asociază fiecare domeniu cu site-ul său `{sub}.b1.church` și face reverse-proxy cu un antet Host rescris. Întreaga ei configurație constă în două fișiere: un `Caddyfile` static și un `hosts.map` reîmprospătat din Membership API. Așadar, supraviețuiește repornirilor fără nicio stare la rulare. Această pagină explică cum se construiește mașina de la zero, cum funcționează și capcanele verificate în practică, în care ar putea cădea oricine o reconstruiește.

</div>

Pentru modul în care o cerere ajunge la o biserică/un site odată ce a ajuns în B1App, consultați [Rutarea site-urilor web și multi-site](../architecture/websites).

## Componente

| Element | Ce este |
|---|---|
| Instanță EC2 | Windows Server; Elastic IP **`3.23.251.61`** (inclus în DNS-ul bisericilor din toată lumea — IP-ul este permanent, instanțele sunt înlocuibile) |
| `C:\caddy\caddy.exe` | Build **personalizat** de Caddy cu modulul de stocare `techknowlogick/certmagic-s3` — Caddy standard nu poate citi depozitul de certificate |
| `C:\caddy\Caddyfile` | Întreaga configurație a proxy-ului: TLS la cerere, `map` host→upstream, redirecționări www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Câte o linie `{domain} {sub}.b1.church` pentru fiecare domeniu care poate fi rutat, importată în blocul `map` din Caddyfile |
| `sync-hostmap.ps1` + sarcina `CaddyHostmapSync` | Sarcină programată (la fiecare 5 minute și la pornire, ca SYSTEM) care reîmprospătează `hosts.map` din API și reîncarcă Caddy grațios doar dacă s-a modificat ceva |
| Serviciul Windows `caddy` (înveliș WinSW) | Rulează `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; repornire automată la eșec. Caddy nu este compatibil cu SCM, deci este necesar un înveliș |
| Bucket S3 `churchapps-caddy-certs` | Stocare partajată a certificatelor (`region us-east-2`, prefix `certs`) — certificatele supraviețuiesc reconstruirii instanțelor |
| Rolul IAM `CaddyRole` | Acordă instanței acces S3; Caddy folosește lanțul implicit de credențiale AWS (fără chei în configurație) |

## Cele două endpoint-uri API de care depinde mașina

Ambele se află în Membership API. `authorize` este anonim; `hostmap` necesită antetul `x-internal-key: <INTERNAL_API_KEY>` de la Api PR #67 (2026-08-16) — `sync-hostmap.ps1` îl citește din `C:\caddy\internal-key.txt`:

| Endpoint | Rol |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | **Poarta `ask` pentru TLS la cerere** a Caddy: `200 {"authorized":true}` când host-ul (sau, pentru un host `www.`, apex-ul său) este un rând din `domains`; `404` în caz contrar. Acesta este mecanismul de control împotriva abuzului — Caddy nu va emite un certificat pentru un host respins de acest endpoint |
| `GET /membership/domains/hostmap` | Necesită `x-internal-key` (sau un JWT de administrator de server). `text/plain`, linii `{domain} {sub}.b1.church` sortate și fără duplicate (conștiente de site: un domeniu atribuit unui site secundar apelează subdomeniul acelui site). Sursa pentru `map` |

## Fluxul unei cereri

1. Browserul rezolvă `mychurch.org` → `3.23.251.61` (înregistrare `A` la apex sau `CNAME proxy.b1.church`).
2. Caddy termină TLS. Certificatul există în S3 → se servește; SNI necunoscut → se interoghează `authorize`; 200 → se emite la cerere prin Let's Encrypt; 404 → **handshake-ul este refuzat** (fără certificat, fără răspuns — un host necunoscut primește refuz TLS, nu o eroare HTTP).
3. `map` rezolvă host-ul în `{sub}.b1.church`; `www.{apex}` primește un 302 către apex; un host autorizat, dar nemapat (un domeniu nou, în fereastra de sincronizare de ≤5 minute) primește un 404 curat.
4. `reverse_proxy` se conectează la `{sub}.b1.church:443` cu SNI și Host rescrise către upstream, astfel încât edge-ul Vercel servește site-ul B1App.
   Caddy trimite și domeniul original al vizitatorului ca `X-Church-Host` (Vercel suprascrie `X-Forwarded-Host` cu Host-ul rescris). Middleware-ul B1App îl acceptă doar dacă `/domains/public/lookup/{host}` îl asociază cu același `{sub}` ca host-ul cererii, apoi îl expune ca `x-public-host` pentru antetul canonic `Link`, pentru `robots.txt` și pentru `sitemap.xml`; `x-public-host` trimis de client este întotdeauna eliminat. `ChurchJsonLd` din Schema.org folosește în continuare URL-ul `b1.church` (citirea antetelor acolo ar face paginile dinamice).
5. Portul 80 trece provocările ACME HTTP-01 și redirecționează cu 308 toate celelalte cereri către https.

Propagarea domeniilor noi: un domeniu salvat în B1Admin devine rutabil în ~5 minute (sarcina de sincronizare); certificatul său este emis la prima accesare HTTPS.

## Construirea mașinii de la zero

Condensat din procedura verificată în practică (procedura completă, pas cu pas, cu comenzi gata de copiat, se află în spațiul de lucru pentru operațiuni, nu în acest depozit). Mai întâi cerințele prealabile — fără ele construirea nu funcționează:

1. **IAM**: atașați `CaddyRole` (acces S3 la bucketul de certificate) la instanță. Verificați prin IMDSv2 de pe mașină — rețineți că un simplu GET IMDS care returnează 401 înseamnă doar că IMDSv2 este obligatoriu, nu că „nu există rol".
2. **Starea API**: `authorize` trebuie să returneze 404 pentru un domeniu inexistent, iar `hostmap` (cu antetul `x-internal-key`) trebuie să returneze 200 înainte de orice altceva.

Apoi:

3. **Binarul**: descărcați un build personalizat de la serviciul de build al Caddy — `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB față de ~45 MB pentru versiunea standard; v2.11.4 la data scrierii). Alegerea modulului contează: `techknowlogick/certmagic-s3` folosește cheile `bucket`/`region`/`prefix`, care corespund structurii existente a certificatelor; fork-ul `ss098` folosește `host`/`endpoint` și **nu va găsi** certificatele existente.
4. **Fișiere**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` de producție, o singură linie) în `C:\caddy\`; populați harta o singură dată cu `sync-hostmap.ps1 -NoReload`.
5. **Verificări înainte de prima pornire**: `caddy list-modules` trebuie să afișeze modulul de stocare s3; `caddy adapt` trebuie să emită `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` în blocul de stocare; `caddy validate` trebuie să treacă.
6. **Serviciu**: instalați-l prin WinSW (id-ul serviciului `caddy`, repornire automată la eșec, jurnale rotative). Rulează ca LocalSystem, care ajunge la IMDS pentru credențialele rolului.
7. **Sarcina de sincronizare**: înregistrați `CaddyHostmapSync` (SYSTEM, la fiecare 5 minute și la pornire, cu o limită de execuție de 4 minute).
8. **Verificare înainte de comutare** prin forțarea rezolvării domeniilor către `127.0.0.1` cu `curl --resolve` (mașina nu primește trafic real până nu se mută EIP-ul): un domeniu existent trebuie să se servească cu un certificat valid transferat; `www.` trebuie să returneze 302; un host necunoscut trebuie să primească refuz TLS; iar `Restart-Service caddy` trebuie să revină și să servească **fără reamorsare manuală** — acest test de repornire este tot scopul designului static.
9. **Punerea în funcțiune**: reasociați Elastic IP `3.23.251.61` la noua instanță. DNS-ul bisericilor nu se modifică niciodată.

## Capcane verificate în practică (învățate pe calea grea — nu le reintroduceți)

| Capcană | Simptom | Soluție |
|---|---|---|
| `tls_server_name {vars.upstream}` în transportul reverse_proxy | Fiecare domeniu proxiat returnează 502: substituentele din map se rezolvă **goale în momentul conexiunii TLS** („either ServerName or InsecureSkipVerify must be specified") | Folosiți substituentul nativ al transportului: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Chei duplicate sau linii nevalide în `hosts.map` | Handler-ul `map` al Caddy **eșuează fatal la o cheie de intrare duplicată** — o singură linie defectă poate doborî întreaga configurație | Scriptul de sincronizare normalizează spațiile, elimină liniile malformate (respinge întregul fișier doar dacă >20% sunt defecte), elimină duplicatele păstrând prima apariție și scrie UTF-8 **fără BOM** (un BOM corupe prima cheie din map). API-ul filtrează, de asemenea, la sursă rândurile de domenii goale sau care conțin spații |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Înregistrarea sarcinii **eșuează silențios** (XML în afara intervalului, eroare neterminantă) | Construiți repetarea ca instanță CIM `MSFT_TaskRepetitionPattern` cu `Interval = "PT5M"` și fără durată; adăugați un `ExecutionTimeLimit` de 4 minute (prima rulare SYSTEM poate bloca la o căutare TLS/CRL la rece) |

:::warning
API-ul de administrare se leagă doar la `localhost:2019`. Modul legacy de rulare îl expunea de la distanță, astfel încât Membership API să poată transmite configurații de rute; designul static nu necesită transmiteri de la distanță, iar suprafața mai mică este intenționată. `caddy reload` (rulat local de scriptul de sincronizare) este singurul consumator al API-ului de administrare.
:::

:::info Împingere legacy la rulare
`CaddyHelper` din API (precum și endpoint-urile `/membership/domains/caddy` + `/caddy/init`) există încă drept calea de revenire la vechiul mod configurat la rulare. Sunt programate pentru ștergere după ce mașina statică a fost stabilă timp de câteva săptămâni — după aceea, `authorize` + `hostmap` sunt singurele puncte de integrare.
:::

## Operațiuni

- **Jurnale**: jurnale rotative WinSW în `C:\caddy\` (stdout/stderr ale serviciului — erorile reverse-proxy ajung în `caddy-service.err.log`); istoricul sincronizării în `C:\caddy\sync-hostmap.log`.
- **Forțarea reîmprospătării hărții**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Modificarea configurației**: editați `C:\caddy\Caddyfile`, apoi rulați `caddy validate` + `caddy reload` (sau `Restart-Service caddy` — reporniri sunt sigure prin design).
- **Ștergerea în masă a domeniilor** declanșează, prin design, garda de reducere a scriptului de sincronizare; mutați `hosts.map` vechi deoparte și rulați din nou sarcina pentru a accepta o reducere mare intenționată.
- **Instrucțiunile DNS pentru biserici rămân neschimbate pentru totdeauna**: apex `A 3.23.251.61` sau `CNAME proxy.b1.church`.

## Pagini conexe

- [Rutarea site-urilor web și multi-site](../architecture/websites) — cum se asociază cererea proxiată cu o biserică/un site în B1App
- [Implementarea API-urilor](./apis) — implementarea Membership API care servește `authorize`/`hostmap`
