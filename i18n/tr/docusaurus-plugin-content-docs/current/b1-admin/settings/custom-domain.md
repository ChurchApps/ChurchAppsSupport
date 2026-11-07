---
title: "Özel Alan Adı"
---

# Özel Alan Adı

<div class="article-intro">

Kendi alan adınızı (örneğin **`www.yourchurch.org`**) B1 sitenize yönlendirebilirsiniz. Böylece ziyaretçiler varsayılan yourchurch.b1.church adresi yerine kilisenizin gerçek web adresine ulaşır.

</div>

## Eğitim Videosu

<YouTube id="L5yaDusHts8" title="B1'de Özel Alan Adı Bağlama" next="Setting Up Live Streaming in B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Adım 1 — Önce DNS Kaydını Ekleyin

Alan adınızı B1'e eklemeden önce, alan adı kayıt firmanızda (GoDaddy, Namecheap, Cloudflare vb.) alan adınızı B1'in sunucularına yönlendirmeniz gerekir.

Bu kayıtlardan birini ekleyin — CNAME tercih edilir:

| Tür | Ana Bilgisayar | Değer |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

`www` adresiniz için **CNAME** kullanın. Kayıt firmanız kök (çıplak, www içermeyen) alan adında CNAME desteklemiyorsa veya kök alan adının da çalışmasını istiyorsanız **A kaydını** kullanın.

DNS değişikliklerinin yürürlüğe girmesi birkaç dakika ile birkaç saat arasında sürebilir.

## Adım 2 — B1'de Alan Adını Ekleyin

DNS, B1'i gösterecek şekilde ayarlandıktan sonra:

1. B1 Admin'de **Settings** (Ayarlar) bölümüne gidin.
2. Sol taraftaki listede **Domains** (Alan Adları) seçeneğine tıklayın, ardından **Domains** bölümünde **Edit** (Düzenle) düğmesine tıklayın.
3. Alan adınızı alana yazın ve **Save** (Kaydet) düğmesine tıklayın.

Önce **+** düğmesine tıklamanıza gerek yoktur — alana yazılı bırakılan alan adı, kaydettiğinizde eklenir. Kaydetmeden önce listeye birden fazla alan adı eklemek istediğinizde **+** düğmesini (veya **Enter** tuşunu) kullanın.

B1 SSL'i otomatik olarak yönetir — ayrıca sertifika satın almanız gerekmez.

:::warning
DNS kayıtları yerine oturmadan önce alan adını B1'e eklerseniz, kaydedilmeyecektir. Her zaman önce DNS'i ayarlayın.
:::

## Çalışıp Çalışmadığını Kontrol Etme

Kaydettikten sonra alan adınızı bir tarayıcıda açın. B1 sitenizi yüklüyorsa işiniz tamamdır. Bir hata görürseniz, DNS değişikliği hâlâ yayılıyor olabilir — birkaç dakika bekleyip tekrar deneyin.

DNS yayılımını [dnschecker.org](https://dnschecker.org) adresinden de kontrol edebilirsiniz — alan adınızı arayın ve CNAME veya A kaydınızın göründüğünü kontrol edin.
