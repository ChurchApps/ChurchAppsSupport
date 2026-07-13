---
title: "Kuphatfwa Kwe-Server"
---

# Kuphatfwa Kwe-Server

<div class="article-intro">

Tici tekuphatfwa kwe-server ku-ChurchApps titfolakala kuphela kubasebentisi labanemvumo ye-**Server.Admin**. Lamathulusi asetjentiswa emisebentini ye-platform, kusekela, kanye nekulungisa tinkinga kuwo onkhe emabandla kulolusetjentiswa.

</div>

:::warning Kufinyelela Kuvinjelwe
Tici letichasiswe kulelikhasi tidzinga imvumo ye-**Server.Admin** futsi atitfolakali kubaphatsi bebandla labavamile. Tenteselwe baphatsi be-platform kanye nebasebenti besekelo kuphela.
:::

## Kufinyelela Ku-Server Admin

Basebentisi labanemvumo ye-Server.Admin bangafinyelela kupheneli ye-server admin kusuka ku-B1 Admin:

1. Ngena ku-[admin.b1.church](https://admin.b1.church)
2. Cindzetela kuthebhu ye-**Admin** kukucobha lokusemcoka
3. Ipheneli ye-Server Admin ifaka emathebhu ekuphatsa emabandla, basebentisi, kanye nemisebenti yelusetjentiswa

## Kutigcina Njengalomunye Umsebentisi (User Impersonation)

Sici sekutigcina njengalomunye umuntfu sivumela baphatsi be-server kungena njengomunye umsebentisi ngenjongo yekusekela nekulungisa tinkinga. Loku kuyasita nangabe uphenya tinkinga letibikwe ngumsebentisi nobe usita emabandla ahlele lusetjentiswa lwawo.

### Indlela Yekutigcina Njengalomunye Umsebentisi

1. Cobha uye kuthebhu ye-**Impersonate** kupheneli ye-Server Admin
2. Faka ligama lemsebentisi nobe likheli le-imeyili ensimini yekusesha
3. Cindzetela **Search** nobe ucindzetele Enter
4. Kuletiphumo tekusesha, cindzetela lomsebentisi lofuna kutigcina njengaye
5. Cinisekisa kutigcina njengalomunye umuntfu kuliphupho (dialog) lelivelako
6. Utawungena njengalowo msebentisi bese ucondziswa ku-akhawunti yakhe

### Emanotsi Lasemcoka

- Kutigcina njengalomunye kudala sikhatsi lesisha ngemvumo yemsebentisi locondziwe kanye nekufinyelela ebandleni
- Sikhatsi sakho sekucala se-admin siyaphela nangabe utigcina njengalomunye umsebentisi
- Tento tonkhe letentiwe ngesikhatsi utigcina njengalomunye tiyabhalwa ku-audit trail
- Kute ubuyele ku-akhawunti yakho ye-admin, phuma bese ungena futsi ngeminingwane yakho
- Sebentisa kutigcina njengalomunye kuphela nangabe kuyadzingeka ngenjongo yekusekela futsi njalo wati basebentisi nangabe ufinyelela ema-akhawunti yabo ngenjongo yekusekela

### I-Endpoint ye-API

Sici sekutigcina njengalomunye sisekelwa yi-endpoint ye-`/users/:userId/impersonate` ku-Membership API. Bona [Membership Endpoints](/docs/developer/api/endpoints/membership#users) kutfola imininingwane yebuchwepheshe.

### Kucatjangelwa Kwekuphepha

- Kutigcina njengalomunye kudzinga imvumo ye-Server.Admin - lemvumo kufanele inikwe ngekucophelela futsi kuphela kubaphatsi be-platform labatsenjwako
- Etehlo tonkhe tekutigcina njengalomunye tiyabhalwa nge-ID yemsebentisi we-admin kanye ne-ID yemsebentisi locondziwe
- Emabandla awatiswa nangabe kutigcina njengalomunye kwentekile, ngako sungula tinqubomgomo letisicondzile tetsi ngunini nangani lesi sici kufanele sisetjentiswe
- Cabanga ngekubhala etehlo tekutigcina njengalomunye kulusetjentiswa lwakho lwema-ticket ekusekela kute kubekhona kubalulwa

## Emakhasi Lahambelanako

- [Kucinisekiswa Kwebuwena & Timvumo](/docs/developer/api/endpoints/authentication) — Imodeli yemvumo kanye nekucinisekiswa kwe-JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — I-API yekuphatsa umsebentisi nebandla
- [Audit Log](/docs/b1-admin/reports/audit-log) — Bukela emalogi emisebenti ebandla
