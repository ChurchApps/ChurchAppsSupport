---
title: "Docker ile Kendi Sunucunuzda Barındırma"
---

# Docker ile Kendi Sunucunuzda Barındırma

<div class="article-intro">

Docker kurulu herhangi bir makinede — ev sunucusu, küçük bir VPS ya da yerel bir kutu — B1 Admin, B1 üye portalı ve web sitesi, API ve bir MySQL veritabanından oluşan kendi özel örneğinizi çalıştırın. Kurulum tek bir komutla yapılır, güncelleme tek bir komutla yapılır ve her güncellemeden önce yedek alınır. Hiç sunucu yönetmek istemiyorsanız, yönetilen alternatif için [Railway ile Kendi Sunucunuzda Barındırma](./railway-template) bölümüne bakın.

</div>

## Hızlı Başlangıç

<div class="prereqs">
<h4>Gerekenler</h4>

- Bir Linux makinesi (ya da WSL veya Git Bash ile macOS / Windows — `b1` yardımcı programı bir bash betiğidir) ve [Docker Engine](https://docs.docker.com/engine/install/) ile Compose v2 (Docker Desktop ile birlikte gelir)
- Yaklaşık 2 GB RAM ve 5 GB disk alanı
- Herkese açık bir site için: makineye yönlendirilmiş bir alan adı ve erişilebilir 80 ve 443 numaralı portlar

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

`http://localhost` üzerinde çalıştırmak için `--domain` parametresini atlayın. Kurucu bir `b1church` klasörü oluşturur, yeni üretilmiş gizli anahtarlarla bir `.env` dosyası yazar, hazır imajları GitHub Container Registry'den çeker ve API'nin sağlıklı olduğunu bildirmesini bekler. Makinenizde hiçbir şey derlenmez, bu yüzden ilk başlatma bir-iki dakika sürer.

Kurulum tamamlandığında:

1. **https://church.example.org/admin** adresini (ya da http://localhost/admin) açın ve **Kaydol** düğmesine tıklayın. İlk hesap otomatik olarak sunucu yöneticisi olur.
2. Uygulama içindeki yönergeleri izleyerek ilk kilisenizi oluşturun. Kilise oluşturulur oluşturulmaz web siteniz ve üye portalınız **https://church.example.org/** adresinde yayına girer.

Her şey tek bir alan adının arkasında çalışır:

| Yol | Hizmet |
|------|---------|
| `/` | B1App — kilise web sitesi ve üye portalı |
| `/admin` | B1Admin — personel paneli |
| `/api` | API, yüklenen dosyalar ve canlı güncellemeler için websocket |

HTTPS otomatiktir: birlikte gelen [Caddy](https://caddyserver.com/) proxy'si, `.env` içindeki alan adı için bir Let's Encrypt sertifikası alır ve yeniler. Yalnızca 80 ve 443 numaralı portlar açıktır; veritabanına yalnızca Docker ağının içinden erişilebilir.

## `b1` komutu

Kurucu, `docker-compose.yml` dosyasının yanına bir `deploy/b1` betiği bırakır. Günlük kullanımda ihtiyacınız olan tek şey budur:

| Komut | Ne yapar |
|---------|--------------|
| `./deploy/b1 upgrade` | Güncel sürümü çeker, yedek alır, yeniden başlatır ve API'nin sağlıklı olduğunu doğrular |
| `./deploy/b1 upgrade 2026.10.1` | Aynısı, belirli bir sürüme sabitlenmiş olarak |
| `./deploy/b1 backup` | Veritabanını, yüklenen dosyaları ve `.env` dosyasını `backups/<zaman damgası>/` içine kaydeder |
| `./deploy/b1 restore backups/<zaman damgası>` | Bir yedeği geri yükler (çalışma sırasında API durdurulur) |
| `./deploy/b1 rollback` | En yeni yedeği, alındığı sürümle birlikte geri yükler |
| `./deploy/b1 status` | Kurulu sürüm ve konteyner sağlığı |
| `./deploy/b1 logs api` | Bir hizmetin günlüklerini canlı izler |

Sürümler, üç imajın her zaman uyumlu kalması için tek bir sürümlü paket olarak yayınlanır. `.env` içindeki `B1_VERSION=stable` en son sürümü izler; belirli bir sürüme sabitlemek için bu değeri o sürüme ayarlayın. Sürüm notlarına [B1Admin sürümleri](https://github.com/ChurchApps/B1Admin/releases) altından ulaşabilirsiniz.

## Yapılandırma

Tüm ayarlar `docker-compose.yml` dosyasının yanındaki `.env` dosyasında tutulur. Gerekli ayarları kurucu doldurur:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # Caddy'nin sunduğu adres; yerel kurulum için http://localhost
PUBLIC_URL=https://church.example.org    # tarayıcılar ve e-postalar siteye nasıl ulaşır
MYSQL_ROOT_PASSWORD=…                    # üretilir
JWT_SECRET=…                             # üretilir
ENCRYPTION_KEY=…                         # üretilir, tam olarak 32 karakter — kimlik bilgileri kaydedildikten sonra asla değiştirmeyin

# E-posta — şiddetle önerilir; bu olmadan üyeler kendi şifrelerini sıfırlayamaz
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

`.env` dosyasını düzenledikten sonra değişiklikleri `docker compose up -d` komutuyla uygulayın. Web uygulamaları hangi API ile konuşacaklarını tarayıcıdaki adresten belirler; bu nedenle alan adını değiştirmek için yalnızca `SITE_ADDRESS` ve `PUBLIC_URL` değerlerini güncelleyip yeniden başlatmak yeterlidir — yeniden derleme gerekmez.

:::warning
`.env` dosyanızı güvende tutun. `ENCRYPTION_KEY`, saklanan ödeme geçidi ve depolama kimlik bilgilerini korur; bu anahtar olmadan alınan bir yedek bu bilgileri çözemez. `./deploy/b1 backup` komutu bu nedenle anahtarın bir kopyasını da içerir.
:::

### Daha sonra bir alan adına geçiş

Siteyi `localhost` üzerine kurduysanız ve daha sonra herkese açık hale getirmek istiyorsanız: DNS kaydını makineye yönlendirin, `.env` dosyasında `DOMAIN`, `SITE_ADDRESS` (çıplak alan adı) ve `PUBLIC_URL` (`https://` ile alan adının birleşimi) değerlerini ayarlayın, ardından `docker compose up -d` komutunu çalıştırın. Caddy ilk istekte bir sertifika alır.

## E-posta, Bağış, Çoklu Site ve Entegrasyonlar

Bunların hepsi Railway'deki gibi çalışır — aynı ortam değişkenleri, Railway panelinde değil `.env` dosyasında ayarlanır:

- **[E-posta / SMTP](./railway-template#1-email-highly-recommended)** — Resend, Brevo ve Gmail için sağlayıcı adım adım kılavuzları
- **[Çoklu site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — örnek başına sınırsız kilise. `/` adresi, slug'ı `DEFAULT_CHURCH_SLUG` olan kiliseyi sunar (ilk kilisenin slug'ı `church`'tür); ek alan adlarını makineye yönlendirin ve B1Admin içinde **Ayarlar → Alan Adları** altında eşleştirin
- **[Çevrimiçi bağış](./railway-template#4-online-giving-stripe--paypal)** — her kilise için yönetim arayüzünde yapılandırılır
- **[İsteğe bağlı entegrasyonlar](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Anlık bildirimler](#push-notifications)** — `WEB_PUSH_*`; kurucu bunları boş bırakır, bu nedenle siz ekleyene kadar anlık bildirimler kapalıdır

Kilise tarafından gönderilen davetiyeler ve diğer e-postalar, kendi barındırdığınız örnekte otomatik olarak etkinleştirilir (barındırılan hizmet ise gönderen itibarını korumak için bunları manuel incelemeye tabi tutar).

## Anlık Bildirimler

Tarayıcı ve mobil web anlık bildirimleri, sunucuda bir VAPID anahtar çifti bulunana kadar kapalı kalır. Kurucu bu anahtarı oluşturmaz. Siz ekleyene kadar mobil web uygulamasının Bildirimler sayfası, sitede anlık bildirimlerin açık olmadığını gösterir.

1. Bir anahtar çifti oluşturun. Bunun için yalnızca Docker gerekir:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. İki değeri `.env` dosyasına ekleyin. `WEB_PUSH_SUBJECT` isteğe bağlıdır ve anlık bildirim hizmetlerinin gördüğü iletişim adresidir:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Değişiklikleri uygulayın:

   ```bash
   docker compose up -d
   ```

4. Doğrulamak için B1Admin içinde **Sunucu Yönetimi → Sunucu Durumu** sayfasını açın. Her iki Web Push anahtarının da yapılandırılmış olarak görünmesi gerekir. Üyeler bundan sonra mobil web uygulamasından bildirimleri açabilir.

:::warning
Üyeler kaydolduktan sonra aynı anahtarları koruyun. Anahtarları değiştirmek mevcut tüm abonelikleri geçersiz kılar ve her cihazın yeniden kayıt olması gerekir.
:::

## Veri, Yedekler ve Dosya Depolama

Tüm veriler üç adlandırılmış Docker biriminde (volume) tutulur:

| Birim | İçerik |
|--------|----------|
| `b1church_mysql-data` | Tüm veritabanı şemaları |
| `b1church_api-content` | Yüklenen dosyalar — fotoğraflar, belgeler, web sitesi görselleri |
| `b1church_caddy-data` | TLS sertifikaları |

`./deploy/b1 backup` komutu, ilk iki birimin tutarlı bir anlık görüntüsünü ve `.env` dosyasını `backups/<zaman damgası>/` içine yazar. Cron ile zamanlayın ve klasörü makine dışında bir yere kopyalayın:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Büyük medya kitaplıkları için dosya depolamayı S3'e geçirebilirsiniz — [Railway kılavuzunun Dosya Depolama bölümünde](./railway-template#5-file-storage) açıklanan `FILE_STORE=S3` ve `AWS_*` değişkenlerini ayarlayın. Veritabanı yedekleri S3 nesnelerini içermez; bu nedenle bucket için sürümlemeyi etkinleştirin.

## Güncelleme

```bash
./deploy/b1 upgrade
```

Sırasıyla şunları yapar: sürümü çeker, yedek alır, konteynerleri yeniden oluşturur, API başlarken bekleyen veritabanı geçişlerini (migration) çalıştırır ve API'nin sağlık kontrolünü bekler. Bir şey başarısız olursa durur ve `./deploy/b1 rollback` komutunu çalıştırmanızı söyler; bu komut o yedeği ve önceki sürümü geri yükler. Veritabanı geçişleri yalnızca ileri yönlüdür; geri almak her zaman anlık görüntünün geri yüklenmesi anlamına gelir.

`.env` dosyanız hazır olduğunda, imajları kaynak koddan derleyen beta compose dosyasından yükseltme de aynı şekilde çalışır: bu dosya varsayılan olarak `MYSQL_ROOT_PASSWORD=churchapps` kullanıyordu. Bu değeri `PUBLIC_URL` ve `SITE_ADDRESS` ile birlikte `.env` dosyasına yazın, `docker-compose.yml` dosyasını ve `deploy/` klasörünü güncel dosyalarla değiştirin, ardından `./deploy/b1 upgrade` komutunu çalıştırın.

## Kaynak koddan derleme

Geliştiriciler, imajları çekmek yerine yerel olarak derleyebilir:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`.env` içindeki `API_CONTEXT` ve `B1APP_CONTEXT`, derlemelerin yerel kopyalara (ör. `../Api`) ya da bir git referansına yönelmesini sağlar.

## Sorun Giderme

| Belirti | Olası neden | Çözüm |
|---------|--------------|-----|
| `api` konteyneri sürekli yeniden başlıyor | geçiş hatası ya da yanlış veritabanı şifresi | `./deploy/b1 logs api` — geçiş, hangi modülün başarısız olduğunu yazdırır |
| `api` günlüğünde "ENCRYPTION_KEY must be exactly 32 characters" | `.env` içinde elle düzenlenmiş ya da kesilmiş anahtar | özgün 32 karakterlik anahtarı geri yükleyin (yalnızca hiç kimlik bilgisi saklanmadıysa yeni bir anahtar üretin) |
| Tarayıcı bir sertifika uyarısı gösteriyor | DNS henüz bu makineye yönlendirilmemiş ya da 80/443 portu engelli | DNS / güvenlik duvarını düzeltin; Caddy kendiliğinden yeniden dener |
| `/` adresi web sitesi yerine bir panel gösteriyor | henüz kilise yok ya da `DEFAULT_CHURCH_SLUG` eşleşmiyor | kilisesi oluşturun ya da slug'ı **Ayarlar → Kilise** bölümünden ayarlayın |
| "E-postanızı kontrol edin" görünüyor ama e-posta gelmiyor | `MAIL_SYSTEM=SMTP` ile hatalı kimlik bilgileri | kimlik bilgilerini düzeltin ya da e-postayı devre dışı bırakmak için `MAIL_SYSTEM` değerini kaldırın |
| Mobil web uygulaması anlık bildirimlerin açık olmadığını söylüyor | sunucuda VAPID anahtarı yok | [Anlık Bildirimler](#push-notifications) bölümünde anlatıldığı gibi anahtarları ekleyin |
| Sohbet / canlı özellikler sessiz | önündeki başka bir proxy websocket'i engelliyor | websocket aynı port üzerinden `/api/` yolunda çalışır; `Upgrade` başlıklarına izin verin |
| `install` çalışmayı reddediyor: "database volume already exists" | önceki bir kurulumdan kalan veriler | silmek için `docker compose down -v` çalıştırın ya da bir `.env` yazıp `upgrade` kullanın |

Hâlâ takılı kaldınız mı? `./deploy/b1 logs` çıktısını ekleyerek [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) adresinde bir sorun bildirin.

## İlgili Makaleler

- **[Railway ile Kendi Sunucunuzda Barındırma](./railway-template)** — yönetilen barındırma alternatifi ve ortak dağıtım sonrası yapılandırma kılavuzları
- **[İlk Kurulum](../../getting-started/initial-setup)** — kilisenizi oluşturduktan sonra ilk adımlar
- **[Yerel API Kurulumu](../api/local-setup)** — geliştirme için yığını doğrudan çalıştırma
