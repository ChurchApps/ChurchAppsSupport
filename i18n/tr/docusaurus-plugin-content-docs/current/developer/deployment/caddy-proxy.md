---
title: "Caddy Özel Alan Adı Proxy'si"
---

# Caddy Özel Alan Adı Proxy'si

<div class="article-intro">

Özel kilise alan adları (`mychurch.org` → kilisenin B1 web sitesi), Caddy çalıştıran tek bir Windows EC2 makinesine gelir. Bu makine TLS sertifikalarını yönetir, her alan adını kendi `{sub}.b1.church` sitesine çözümler ve Host başlığını yeniden yazarak ters proxy yapar. Tüm yapılandırması iki dosyadan oluşur: statik bir `Caddyfile` ve Membership API'den yenilenen bir `hosts.map`. Bu yüzden yeniden başlatmalara çalışma zamanı durumu olmadan dayanır. Bu sayfa makinenin sıfırdan nasıl kurulduğunu, nasıl çalıştığını ve bunu yeniden kuracak herkesi ısıran, sahada test edilmiş tuzakları anlatır.

</div>

Bir isteğin B1App'e ulaştıktan sonra hangi kilise ve siteye nasıl çözüldüğü için bkz. [Web Sitesi Yönlendirmesi ve Çoklu Site](../architecture/websites).

## Bileşenler

| Parça | Açıklama |
|---|---|
| EC2 örneği | Windows Server; Elastic IP **`3.23.251.61`** (kiliselerin DNS kayıtlarında dünya genelinde kayıtlıdır; IP kalıcıdır, örnekler ise tek kullanımlıktır) |
| `C:\caddy\caddy.exe` | **Özel** Caddy derlemesi, `techknowlogick/certmagic-s3` depolama modülüyle. Standart Caddy sertifika deposunu okuyamaz |
| `C:\caddy\Caddyfile` | Tüm proxy yapılandırması: isteğe bağlı TLS, ana bilgisayar→üst hedef `map`'i, www→apex yönlendirmeleri, `:80`→https |
| `C:\caddy\hosts.map` | Yönlendirilebilir her alan adı için bir `{domain} {sub}.b1.church` satırı; Caddyfile'daki `map` bloğuna içe aktarılır |
| `sync-hostmap.ps1` + `CaddyHostmapSync` görevi | Zamanlanmış görev (5 dakikada bir ve açılışta, SYSTEM olarak) `hosts.map` dosyasını API'den yeniler; yalnızca değişiklik olduğunda Caddy'yi zarifçe yeniden yükler |
| Windows hizmeti `caddy` (WinSW sarmalayıcısı) | `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile` çalıştırır; hata durumunda otomatik yeniden başlatır. Caddy SCM farkındalığına sahip olmadığı için sarmalayıcı gereklidir |
| S3 kovası `churchapps-caddy-certs` | Ortak sertifika deposu (`region us-east-2`, önek `certs`); sertifikalar makine yeniden kurulsa bile korunur |
| IAM rolü `CaddyRole` | Örneğe S3 erişimi verir; Caddy AWS varsayılan kimlik bilgisi zincirini kullanır (yapılandırmada anahtar yoktur) |

## Makinenin bağlı olduğu iki API uç noktası

İkisi de Membership API üzerindedir. `authorize` anonimdir. `hostmap` ise Api PR #67'den (2026-08-16) beri `x-internal-key: <INTERNAL_API_KEY>` başlığını gerektirir. `sync-hostmap.ps1` bu anahtarı `C:\caddy\internal-key.txt` dosyasından okur:

| Uç nokta | Görevi |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | Caddy'nin **isteğe bağlı TLS `ask` kapısı**. Ana bilgisayar (www. ana bilgisayarı için üst alan adı) `domains` tablosunda bir satırsa `200 {"authorized":true}`, aksi halde `404` döner. Bu, kötüye kullanıma karşı bir denetimdir: Caddy, bu uç noktanın reddettiği bir ana bilgisayar için sertifika vermez |
| `GET /membership/domains/hostmap` | `x-internal-key` (veya sunucu yöneticisi JWT'si) gerektirir. `text/plain` biçiminde, sıralı ve tekilleştirilmiş `{domain} {sub}.b1.church` satırları döner. Site farkındalığı vardır: ikincil bir siteye atanmış alan adı, o sitenin alt alan adına yönlenir. `map`'in kaynağıdır |

## İstek akışı

1. Tarayıcı `mychurch.org` adresini `3.23.251.61`'e çözümler (apex `A` kaydı veya `CNAME proxy.b1.church`).
2. Caddy TLS'yi sonlandırır. Sertifika S3'te varsa sunulur. SNI bilinmiyorsa `authorize` sorulur; 200 dönerse Let's Encrypt üzerinden isteğe bağlı olarak verilir; 404 dönerse **el sıkışma reddedilir**. Sertifika yoktur, yanıt yoktur. Bilinmeyen bir ana bilgisayar HTTP hatası değil, TLS reddi alır.
3. `map`, ana bilgisayarı `{sub}.b1.church`'e çözer. `www.{apex}` 302 ile apex'e yönlendirilir. Yetkili ama henüz eşlenmemiş bir ana bilgisayar (≤5 dakikalık senkronizasyon penceresi içindeki yeni bir alan adı) temiz bir 404 alır.
4. `reverse_proxy`, `{sub}.b1.church:443`'e SNI ve yeniden yazılmış Host ile bağlanır. Böylece Vercel'in kenar sunucusu B1App sitesini sunar. Caddy ayrıca ziyaretçinin özgün alan adını `X-Church-Host` olarak gönderir, çünkü Vercel `X-Forwarded-Host` başlığını yeniden yazılmış Host ile üzerine yazar. B1App ara katmanı bu başlığı yalnızca `/domains/public/lookup/{host}` isteği, alan adını istek ana bilgisayarıyla aynı `{sub}`'a eşlediğinde kabul eder. Kabul edilirse kanonik `Link` başlığı, `robots.txt` ve `sitemap.xml` için `x-public-host` olarak sunulur. İstemcinin gönderdiği `x-public-host` her zaman silinir. Schema.org `ChurchJsonLd` hâlâ `b1.church` URL'sini kullanır; bu yerde başlıkları okumak sayfaları dinamik hale getirirdi.
5. 80. port ACME HTTP-01 doğrulamalarını geçirir ve diğer her şeyi https'e 308 ile yönlendirir.

Yeni alan adlarının yayılımı: B1Admin'de kaydedilen bir alan adı yaklaşık 5 dakika içinde yönlendirilebilir hale gelir (senkronizasyon görevi). Sertifikası ise ilk HTTPS isteğinde basılır.

## Makineyi sıfırdan kurmak

Bu, sahada test edilmiş prosedürün özetidir. Adım adım kopyala-yapıştır komutlarının tamamı bu depoda değil, operasyon çalışma alanındadır. Önce ön koşullar gelir. Onlar olmadan kurulum çalışmaz:

1. **IAM**: `CaddyRole` rolünü (sertifika kovasına S3 erişimi) örneğe ekleyin. Makineden IMDSv2 ile doğrulayın. Düz bir IMDS GET isteğinin 401 dönmesi yalnızca IMDSv2'nin zorunlu olduğu anlamına gelir; "rol yok" anlamına gelmez.
2. **API sağlığı**: Başka bir şeyden önce `authorize` sahte bir alan adı için 404 dönmeli, `hostmap` ise (`x-internal-key` başlığıyla) 200 dönmelidir.

Ardından:

3. **İkili dosya**: Caddy'nin derleme servisinden özel bir derleme indirin: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (yazı sırasında v2.11.4, yaklaşık 57 MB; standart derleme yaklaşık 45 MB). Modül seçimi önemlidir. `techknowlogick/certmagic-s3`, mevcut sertifika düzenine uyan `bucket`/`region`/`prefix` anahtarlarını kullanır. `ss098` çatalı ise `host`/`endpoint` kullanır ve mevcut sertifikaları **bulamaz**.
4. **Dosyalar**: `Caddyfile`, `sync-hostmap.ps1` ve `internal-key.txt` (üretim `INTERNAL_API_KEY`, tek satır) dosyalarını `C:\caddy\` içine koyun. Haritayı bir kez `sync-hostmap.ps1 -NoReload` ile doldurun.
5. **İlk başlatmadan önceki kapılar**: `caddy list-modules` s3 depolama modülünü göstermelidir. `caddy adapt` depolama bloğunda `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` üretmelidir. `caddy validate` geçmelidir.
6. **Hizmet**: WinSW ile kurun (hizmet kimliği `caddy`, hata durumunda otomatik yeniden başlatma, döner günlükler). LocalSystem olarak çalışır ve rol kimlik bilgileri için IMDS'ye erişir.
7. **Senkronizasyon görevi**: `CaddyHostmapSync` görevini kaydedin (SYSTEM, her 5 dakikada bir ve başlangıçta, 4 dakikalık yürütme sınırı).
8. **Geçiş öncesi doğrulama**: Alan adlarını `curl --resolve` ile `127.0.0.1`'e zorlayın. EIP taşınana kadar makinede gerçek trafik yoktur. Mevcut bir alan adı, taşınmış geçerli sertifikasıyla sunulmalıdır. `www.` 302 dönmelidir. Bilinmeyen bir ana bilgisayar TLS ile reddedilmelidir. `Restart-Service caddy` komutundan sonra makine **elle yeniden ısıtma yapılmadan** sunmaya dönmelidir. Bu yeniden başlatma testi, statik tasarımın tüm amacıdır.
9. **Canlıya geçiş**: Elastic IP `3.23.251.61`'i yeni örneğe yeniden bağlayın. Kiliselerin DNS kayıtları hiç değişmez.

## Sahada test edilmiş tuzaklar (zor yoldan öğrenildi, geri dönmeyin)

| Tuzak | Belirti | Çözüm |
|---|---|---|
| reverse_proxy transport'unda `tls_server_name {vars.upstream}` | Proxy'lenen her alan adı 502 verir. Map yer tutucuları **TLS bağlantısı kurulurken boş çözülür** ("either ServerName or InsecureSkipVerify must be specified") | Transport'a özgü yer tutucuyu kullanın: `tls_server_name {http.reverse_proxy.upstream.host}` |
| `hosts.map` içinde yinelenen anahtarlar veya çöp satırlar | Caddy'nin `map` işleyicisi, yinelenen bir giriş anahtarında **sert hata verir**. Tek bir bozuk satır tüm yapılandırmayı çökertebilir | Senkronizasyon betiği boşlukları normalleştirir, hatalı satırları atar (yalnızca satırların %20'den fazlası bozuksa tamamını reddeder), ilk gelen kazanır şeklinde tekilleştirir ve **BOM'suz** UTF-8 yazar (BOM ilk harita anahtarını bozar). API de kaynakta boş veya boşluk içeren alan adı satırlarını filtreler |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Görev kaydı **sessizce başarısız olur** (aralık dışı XML, sonlandırılmayan hata) | Tekrarı, süresi olmadan ve `Interval = "PT5M"` ile bir `MSFT_TaskRepetitionPattern` CIM örneği olarak oluşturun. 4 dakikalık bir `ExecutionTimeLimit` ekleyin. İlk SYSTEM çalıştırması, soğuk bir TLS/CRL aramasında takılabilir |

:::warning
Yönetici API'si yalnızca `localhost:2019`'a bağlanır. Eski çalışma zamanı modu, Membership API'nin yönlendirme yapılandırmalarını itebilmesi için bunu uzaktan açıyordu. Statik tasarım uzaktan itme gerektirmez ve daha küçük yüzey bilinçli bir tercihtir. Senkronizasyon betiğinin yerel olarak çalıştırdığı `caddy reload`, yönetici API'sinin tek tüketicisidir.
:::

:::info Eski çalışma zamanı push işlemi
API'deki `CaddyHelper` (ve `/membership/domains/caddy` + `/caddy/init` uç noktaları), eski çalışma zamanı yapılandırmalı moda dönüş yolu olarak hâlâ mevcuttur. Statik makine birkaç hafta kararlı çalıştıktan sonra silinmesi planlanmıştır. O zamandan sonra `authorize` ve `hostmap` tek entegrasyon noktaları olacaktır.
:::

## İşletim

- **Günlükler**: `C:\caddy\` içindeki WinSW döner günlükleri (hizmetin stdout ve stderr çıktısı; ters proxy hataları `caddy-service.err.log` dosyasına düşer). Senkronizasyon geçmişi `C:\caddy\sync-hostmap.log` içindedir.
- **Harita yenilemeyi zorlamak**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Yapılandırma değişikliği**: `C:\caddy\Caddyfile` dosyasını düzenleyin, ardından `caddy validate` ve `caddy reload` çalıştırın (veya `Restart-Service caddy` kullanın; yeniden başlatmalar tasarım gereği güvenlidir).
- **Toplu alan adı silme** işlemi, senkronizasyon betiğinin küçülme korumasını tasarım gereği tetikler. Kasıtlı büyük bir küçülmeyi kabul ettirmek için eski `hosts.map` dosyasını kenara taşıyın ve görevi yeniden çalıştırın.
- **Kiliseler için DNS talimatları sonsuza dek değişmez**: apex `A 3.23.251.61` veya `CNAME proxy.b1.church`.

## İlgili Sayfalar

- [Web Sitesi Yönlendirmesi ve Çoklu Site](../architecture/websites): proxy'lenen bir isteğin B1App'te bir kilise ve siteye nasıl çözüldüğü
- [API Dağıtımı](./apis): `authorize` ve `hostmap` uç noktalarını sunan Membership API'nin dağıtımı
