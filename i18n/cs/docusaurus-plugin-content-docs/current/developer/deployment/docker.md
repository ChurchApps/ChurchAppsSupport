---
title: "Self-Hosting with Docker"
---

# Self-Hosting with Docker

<div class="article-intro">

Spusťte si vlastní soukromou instanci aplikace B1 Admin, webu a členského portálu B1, API a databáze MySQL na libovolném počítači s Dockerem — domácím serveru, malém VPS nebo lokálním serveru. Jediným příkazem to nainstalujete a jediným příkazem aktualizujete, přičemž každá aktualizace nejprve vytvoří zálohu. Pokud nechcete spravovat server vůbec, podívejte se na [Self-Hosting na Railway](./railway-template), který nabízí spravovanou alternativu.

</div>

## Rychlý start

<div class="prereqs">
<h4>Co potřebujete</h4>

- Počítač s Linuxem (nebo macOS / Windows s WSL nebo Git Bash — pomocný skript `b1` je bashový skript) s [Docker Engine](https://docs.docker.com/engine/install/) a Compose v2 (součástí Docker Desktopu)
- Přibližně 2 GB RAM a 5 GB volného místa na disku
- Pro veřejný web: doménové jméno nasměrované na tento počítač, s dostupnými porty 80 a 443

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Pokud vynecháte `--domain`, aplikace poběží na adrese `http://localhost`. Instalátor vytvoří složku `b1church`, zapíše soubor `.env` s nově vygenerovanými tajnými klíči, stáhne připravené obrazy z GitHub Container Registry a počká, dokud API nenahlásí, že je v pořádku. Nic se na vašem počítači nesestavuje, takže první spuštění trvá minutu nebo dvě.

Po dokončení:

1. Otevřete **https://church.example.org/admin** (nebo http://localhost/admin) a klikněte na **Registrovat**. První účet se automaticky stane správcem serveru.
2. Podle pokynů v aplikaci vytvořte svůj první sbor. Jeho web a členský portál jsou dostupné na adrese **https://church.example.org/** ihned po jeho vytvoření.

Vše běží pod jednou doménou:

| Cesta | Služba |
|-------|--------|
| `/` | B1App — web sboru a členský portál |
| `/admin` | B1Admin — přehled pro zaměstnance |
| `/api` | API, nahrané soubory a websocket pro živé aktualizace |

HTTPS se nastavuje automaticky: přiložený proxy server [Caddy](https://caddyserver.com/) získá a obnovuje certifikát Let's Encrypt pro doménu uvedenou v souboru `.env`. Ven jsou vystaveny pouze porty 80 a 443; databáze je dostupná pouze zevnitř Docker sítě.

## Příkaz `b1`

Instalátor vedle souboru `docker-compose.yml` vytvoří skript `deploy/b1`. Pro každodenní provoz je to jediný nástroj, který budete potřebovat:

| Příkaz | Co dělá |
|--------|---------|
| `./deploy/b1 upgrade` | Stáhne aktuální verzi, vytvoří zálohu, restartuje služby a ověří, že API je v pořádku |
| `./deploy/b1 upgrade 2026.10.1` | Totéž, ale pro konkrétní verzi |
| `./deploy/b1 backup` | Uloží snímek databáze, nahraných souborů a souboru `.env` do `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Obnoví snímek (během obnovy se API zastaví) |
| `./deploy/b1 rollback` | Obnoví nejnovější zálohu včetně verze, ve které byla pořízena |
| `./deploy/b1 status` | Nainstalovaná verze a stav kontejnerů |
| `./deploy/b1 logs api` | Sledování logů služby |

Verze se vydávají jako jeden číslovaný balíček, takže tři obrazy jsou vždy vzájemně sladěné. `B1_VERSION=stable` v souboru `.env` sleduje nejnovější verzi; pokud chcete zůstat u konkrétní verze, nastavte ji explicitně. Poznámky k vydání najdete v sekci [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Konfigurace

Veškerá nastavení jsou v souboru `.env` vedle souboru `docker-compose.yml`. Instalátor vyplní povinné hodnoty:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # adresa, kterou obsluhuje Caddy; pro lokální instalaci http://localhost
PUBLIC_URL=https://church.example.org    # jak se prohlížeče a e-maily dostanou na web
MYSQL_ROOT_PASSWORD=…                    # vygenerováno
JWT_SECRET=…                             # vygenerováno
ENCRYPTION_KEY=…                         # vygenerováno, přesně 32 znaků — po uložení přihlašovacích údajů jej nikdy neměňte

# E-mail — silně doporučeno; bez něj si členové nemohou sami obnovit heslo
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Po úpravě souboru `.env` změny použijete příkazem `docker compose up -d`. Webové aplikace zjistí, se kterým API mají komunikovat, podle adresy v prohlížeči, takže při změně domény stačí aktualizovat hodnoty `SITE_ADDRESS` a `PUBLIC_URL` a restartovat služby — není potřeba nic znovu sestavovat.

:::warning
Chraňte soubor `.env`. `ENCRYPTION_KEY` chrání uložené přihlašovací údaje k platebním bránám a úložištím; záloha bez něj je nedokáže dešifrovat. Příkaz `./deploy/b1 backup` z tohoto důvodu zahrnuje také kopii tohoto klíče.
:::

### Pozdější přechod na doménu

Pokud jste instalovali na `localhost` a později ji chcete zpřístupnit veřejně: nasměrujte DNS na tento počítač, v souboru `.env` nastavte `DOMAIN`, `SITE_ADDRESS` (samotnou doménu) a `PUBLIC_URL` (`https://` + doména), a poté spusťte `docker compose up -d`. Caddy získá certifikát při prvním požadavku.

## E-mail, online dary, více webů a integrace

Tyto funkce fungují úplně stejně jako na Railway — stejné proměnné prostředí, jen nastavené v souboru `.env` místo řídicího panelu Railway:

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** — návody pro poskytovatele Resend, Brevo a Gmail
- **[Více webů](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — neomezený počet sborů v jedné instanci. Na `/` se zobrazuje sbor, jehož slug odpovídá hodnotě `DEFAULT_CHURCH_SLUG` (prvním sborem je `church`); další domény nasměrujte na tento server a namapujte je v aplikaci B1Admin v sekci **Nastavení → Domény**
- **[Online dary](./railway-template#4-online-giving-stripe--paypal)** — nastavují se pro každý sbor v administračním rozhraní
- **[Volitelné integrace](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Push notifikace](#push-notifikace)** — `WEB_PUSH_*`; instalátor je ponechává prázdné, takže push notifikace jsou vypnuté, dokud je nedoplníte

Pozvánky a další e-maily odesílané sborem jsou na self-hostované instanci povoleny automaticky. (Hostovaná služba je z důvodu ochrany reputace odesílatele zpřístupňuje až po ruční kontrole.)

## Push notifikace

Webové push notifikace v prohlížeči a mobilní webové verzi zůstávají vypnuté, dokud server nemá pár klíčů VAPID. Instalátor jej nevytváří. Dokud jej nepřidáte, stránka Notifikace v mobilní webové aplikaci hlásí, že push notifikace pro tento web nejsou zapnuté.

1. Vygenerujte pár klíčů. K tomu stačí Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Obě hodnoty přidejte do souboru `.env`. `WEB_PUSH_SUBJECT` je volitelný a je to kontaktní adresa, kterou uvidí push služby:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Změny použijte:

   ```bash
   docker compose up -d
   ```

4. Pro ověření otevřete v aplikaci B1Admin položku **Server Admin → Server Health**. Oba klíče Web Push by měly být zobrazeny jako nakonfigurované. Členové pak mohou notifikace zapnout v mobilní webové aplikaci.

:::warning
Jakmile se členové přihlásí k odběru, klíče si ponechte stejné. Jejich změna zneplatní všechna stávající předplatná a každé zařízení se bude muset znovu registrovat.
:::

## Data, zálohy a ukládání souborů

Všechna data jsou uložena ve třech pojmenovaných Docker svazcích:

| Svazek | Obsah |
|--------|-------|
| `b1church_mysql-data` | Všechna databázová schémata |
| `b1church_api-content` | Nahrané soubory — fotografie, dokumenty, obrázky webu |
| `b1church_caddy-data` | Certifikáty TLS |

Příkaz `./deploy/b1 backup` zapíše konzistentní snímek prvních dvou svazků a souboru `.env` do složky `backups/<timestamp>/`. Můžete jej naplánovat přes cron a složku zkopírovat na jiné místo, než je tento počítač:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

U velkých mediálních knihoven můžete úložiště souborů přepnout na S3 — nastavte `FILE_STORE=S3` a proměnné `AWS_*` popsané v sekci [Ukládání souborů v průvodci pro Railway](./railway-template#5-file-storage). Zálohy databáze neobsahují objekty v S3; v tomto případě zapněte verzování bucketu.

## Aktualizace

```bash
./deploy/b1 upgrade
```

Příkaz postupně stáhne verzi, vytvoří zálohu, znovu vytvoří kontejnery, spustí čekající migrace databáze při startu API a počká na kontrolu stavu API. Pokud cokoli selže, zastaví se a vypíše pokyn spustit `./deploy/b1 rollback`, který obnoví tuto zálohu a předchozí verzi. Migrace jsou jednosměrné; návrat zpět proto vždy znamená obnovení snímku.

Pokud aktualizujete ze starého souboru beta compose (který obrazy sestavoval ze zdrojového kódu), postupujte stejně, jakmile máte soubor `.env`: výchozí hodnota byla `MYSQL_ROOT_PASSWORD=churchapps`, takže ji uložte do `.env` spolu s `PUBLIC_URL` a `SITE_ADDRESS`, nahraďte soubor `docker-compose.yml` a složku `deploy/` aktuálními soubory a spusťte `./deploy/b1 upgrade`.

## Sestavení ze zdrojového kódu

Vývojáři mohou obrazy sestavit lokálně místo jejich stahování:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

Proměnné `API_CONTEXT` a `B1APP_CONTEXT` v souboru `.env` nasměrují sestavení na lokální kopie zdrojového kódu (např. `../Api`) nebo na konkrétní git referenci.

## Řešení potíží

| Příznak | Pravděpodobná příčina | Řešení |
|---------|-----------------------|--------|
| Kontejner `api` se neustále restartuje | selhání migrace nebo špatné heslo k databázi | `./deploy/b1 logs api` — migrace vypíše, který modul selhal |
| `api` loguje „ENCRYPTION_KEY must be exactly 32 characters“ | klíč v `.env` byl ručně upraven nebo oříznut | obnovte původní 32znakový klíč (nový generujte, jen pokud zatím nejsou uloženy žádné přihlašovací údaje) |
| Prohlížeč zobrazuje varování o certifikátu | DNS ještě nemíří sem, nebo jsou porty 80/443 blokovány | opravte DNS nebo firewall; Caddy se pokusí znovu sám |
| `/` zobrazuje přehled místo webu | sbor ještě neexistuje, nebo se `DEFAULT_CHURCH_SLUG` neshoduje | vytvořte sbor, nebo nastavte slug v sekci **Nastavení → Sbor** |
| „Zkontrolujte svůj e-mail“, ale e-mail nedorazí | `MAIL_SYSTEM=SMTP` se špatnými přihlašovacími údaji | opravte přihlašovací údaje, nebo zrušte `MAIL_SYSTEM` a e-maily vypněte |
| Mobilní webová aplikace hlásí, že push notifikace nejsou zapnuté | na serveru chybí klíče VAPID | přidejte je podle postupu v sekci [Push notifikace](#push-notifikace) |
| Chat / živé funkce nefungují | websocket blokuje jiný proxy server před aplikací | socket běží na `/api/` na stejném portu; povolte hlavičky `Upgrade` |
| `install` odmítne s hlášením „database volume already exists“ | zbytky z dřívější instalace | `docker compose down -v` pro smazání, nebo vytvořte `.env` a použijte `upgrade` |

Stále nejde problém vyřešit? Otevřete issue na adrese [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) a připojte výstup příkazu `./deploy/b1 logs`.

## Související články

- **[Self-Hosting na Railway](./railway-template)** — alternativa se spravovaným hostingem a společné průvodce konfigurací po nasazení
- **[Počáteční nastavení](../../getting-started/initial-setup)** — první kroky po vytvoření sboru
- **[Nastavení lokálního API](../api/local-setup)** — spuštění celého stacku přímo pro vývoj
