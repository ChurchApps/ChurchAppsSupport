---
title: "Üyelik Uç Noktaları"
---

# Üyelik Uç Noktaları

<div class="article-intro">

Üyelik modülü kişileri, kiliseleri, grupları, hanehalklarını, rolleri, izinleri, formları ve ayarları yönetir. En büyük modüldür ve diğer tüm modüller için temel kimlik ve yetkilendirme katmanını sağlar.

</div>

**Temel yol:** `/membership`

## Kişiler

Temel yol: `/membership/people`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | People.View veya Member | Kilisenin tüm kişilerini listeler |
| GET | `/:id` | JWT | People.View veya kendi kaydi | Kimliğe göre bir kişi getirir (form gönderimlerini de içerir) |
| GET | `/ids?ids=` | JWT | People.View, Member veya People.ViewNames | Virgülle ayrılmış kimliklerle birden fazla kişiyi getirir. People.View izni olmayan People.ViewNames çağıranlar temel modeli alır; devre dışı bırakan kişiler çıkarılır (çağıran kişi hariç) |
| GET | `/basic?ids=` | JWT | — | Birden fazla kişinin temel bilgilerini (yalnızca ad) getirir |
| GET | `/names?ids=` | JWT | Herhangi bir kilise izni | `[{ id, name: { display, first, last }, photo }]` döndürür; çağıranın zaten sahip olduğu virgülle ayrılmış kimlikler için soyada, ardından ada göre sıralanır. Böylece People.View izni olmayan roller (bağışlar, yoklama) kişileri etiketleyebilir. Arama ya da dizin filtresi yoktur |
| POST | `/names` | JWT | Herhangi bir kilise izni | `GET /names` ile aynıdır. Gövde: `{ peopleIds }` (veya `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member veya People.ViewNames | Son eklenen kişiler. People.View izni olmayan People.ViewNames çağıranlar (dizin erişimi olan üyeler dahil) temel modeli alır (`id`, `name.display`, `photo`, `membershipStatus`); devre dışı bırakan kişiler çıkarılır |
| GET | `/guest-register/options?churchId=` | Herkese açık | — | QR konuk kayıt kontrol listesi: `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }` döndürür; her biri `"off"`, `"optional"` veya `"required"` değerindedir (herkese açık `guestRegistrationFields` ayarından ayrıştırılır; eksik veya hatalı değerler e-posta ve telefonu isteğe bağlı, diğerlerini kapalı olarak kabul eder). Eşleşen bir site/kilise belirteci taşınmadıkça `enableQRGuestRegistration` gerektirir; hız sınırına tabidir (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member veya People.ViewNames | Kişileri ada veya e-postaya göre arar (en fazla 100, soyada, ardından ada göre sıralı). People.View izni olmayan People.ViewNames çağıranlar (dizin erişimi olan üyeler dahil) ad aramasında temel modeli alır; `email` araması `[]` döndürür |
| GET | `/search/phone?number=` | JWT | People.View veya Member | Telefon numarasına göre arar |
| GET | `/search/group?groupId=` | JWT | People.View veya Member | Belirli bir gruptaki kişileri getirir |
| GET | `/household/:householdId` | JWT | — | Bir hanehalkındaki tüm kişileri getirir |
| GET | `/attendance` | JWT | People.Edit | Filtrelerle katılımcıları yükler (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Kişiler ve gruplar için zaman çizelgesi verilerini yükler |
| GET | `/directory/:id` | JWT | — | Dizin görünümü için kişiyi getirir (görünürlük tercihlerine uyar) |
| GET | `/claim/:churchId` | JWT | — | Bir kilisede geçerli kullanıcı için kişi kaydını talep eder |
| POST | `/` | JWT | People.Edit veya EditSelf | Kişileri toplu olarak oluşturur veya günceller |
| POST | `/search` | JWT | People.View, Member veya People.ViewNames | Kişileri arar (POST varyantı). Gövde: `{ term }` veya `{ email }`; `GET /search` ile aynı yalnızca ad kuralları geçerlidir |
| POST | `/advancedSearch` | JWT | People.View veya Member | Çok koşullu arama (yaş, birthMonth, membershipStatus vb.). Gövde bir koşul dizisidir; boş gövde koşul olmadığı anlamına gelir, dizi olmayan diğer gövdeler 400 döndürür |
| POST | `/loadOrCreate` | Herkese açık | — | E-postaya göre kişiyi bulur veya oluşturur. Gövde: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Herkese açık | — | QR konuk kaydı. Gövde: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 üye; email/phone/maritalStatus yalnızca ilk üyeye uygulanır). Kilisenin kapattığı alanlar atlanır; eksik zorunlu veya geçersiz değerler 400 döndürür. Önce mevcut kişileri yeniden kullanır: bir üye, tam olarak bir kaldırılmamış kişinin aynı adı (büyük/küçük harf duyarsız) ve aynı e-postayı veya telefon hanelerini (ev, iş veya cep) paylaşması durumunda eşleşir; e-postası veya telefonu olmayan bir üye, eşleşen hanehalkı içinde ad ile eşleşir. Eşleşen kişiler asla düzenlenmez. Eşleşmeyen üyeler, eşleşen hanehalkına veya yoksa yeni bir hanehalkına (adı ilk üyenin soyadından alınır) `membershipStatus: "Visitor"` ve ortak `address` ile katılır. `comments` ilk üyeye not olarak kaydedilir; ayarlanmışsa herkes özel `guestRegistrationGroupId` grubuna eklenir ve `guestRegistrationRecordAttendance` değeri `"true"` ise, o grubun şu anda yoklama penceresi açık olan planlanmış ibadet saatleri için yoklama kaydedilir. `{ householdId, people: [{ id, name }] }` döndürür; kayıtlı adları değil, gönderilen adları yansıtır. Seçim/belirteç ve hız sınırı kuralları seçenekler çağrısıyla aynıdır |
| POST | `/household/:householdId` | JWT | People.Edit | Hanehalkı üye atamalarını günceller |
| POST | `/public/email` | Herkese açık | — | Bir kişiye e-posta gönderir. Gövde: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Dahili | — | Kimliklere göre kişi e-postalarını yükler (sunucudan sunucuya, jwtSecret gerekir) |
| DELETE | `/:id` | JWT | People.Edit | Bir kişiyi siler |

### Örnek: Kişi Arama

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Örnek: Kişi Oluşturma

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Kullanıcılar

Temel yol: `/membership/users`

Oturum açma, kayıt ve parola yönetimi uç noktaları için bkz. [Kimlik Doğrulama ve İzinler](./authentication).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| POST | `/login` | Herkese açık | — | Oturum açar (e-posta/parola, JWT yenileme veya authGuid) |
| POST | `/register` | Herkese açık | — | Yeni bir kullanıcı kaydeder |
| POST | `/forgot` | Herkese açık | — | Parola sıfırlama e-postası gönderir |
| POST | `/setPasswordGuid` | Herkese açık | — | E-postadaki bağlantıdan gelen auth GUID ile parola belirler |
| POST | `/verifyCredentials` | Herkese açık | — | E-posta/parolayı doğrular ve ilişkili kiliseleri döndürür |
| POST | `/loadOrCreate` | JWT | — | E-posta/userId ile kullanıcıyı bulur veya oluşturur |
| POST | `/setDisplayName` | JWT | — | Kullanıcının adını ve soyadını günceller |
| POST | `/updateEmail` | JWT | — | Kullanıcının e-posta adresini değiştirir |
| POST | `/updatePassword` | JWT | — | Kullanıcının parolasını değiştirir (en az 6 karakter) |
| POST | `/updateOptedOut` | JWT | — | Bir kişinin devre dışı bırakma durumunu ayarlar |
| POST | `/sendInviteEmail` | JWT | People.Edit | Bu kilisedeki bir kişiye davet e-postası gönderir (`email`, `personName`, `contextName`). Düğme, hesabı olmayan biri için **Sign Up**, mevcut bir kullanıcı için **Log In** yazar. Hiç oturum açmamış bir kullanıcı ise 7 gün içinde sona eren bir **Set Your Password** bağlantısı alır. Sabit bir şablon olduğu için kilisenin günlük e-posta sınırına dahil edilmez |
| GET | `/search?term=` | JWT | Server.Admin | Tüm kullanıcıları ad/e-postaya göre arar |
| DELETE | `/` | JWT | — | Geçerli kullanıcı hesabını siler |

## Kiliseler

Temel yol: `/membership/churches`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Geçerli kullanıcının tüm kiliselerini yükler |
| GET | `/:id` | JWT | — | Kimliğe göre kiliseyi getirir |
| GET | `/:id/getDomainAdmin` | JWT | — | Bir kilisenin alan adı yöneticisi kullanıcısını getirir |
| GET | `/:id/impersonate` | JWT | Server.Admin | Bir kiliseyi taklit eder (yalnızca sunucu yöneticisi) |
| GET | `/all?term=` | JWT | Server.Admin | Tüm kiliseleri arar (yönetici) |
| GET | `/search/?name=` | Herkese açık | — | Kiliseleri ada göre arar |
| GET | `/lookup/?subDomain=&id=` | Herkese açık | — | Bir kiliseyi alt alan adına veya kimliğe göre bulur |
| POST | `/` | JWT | Settings.Edit | Kilise bilgilerini günceller |
| POST | `/add` | JWT | — | Yeni bir kilise kaydeder. Zorunlu alanlar: name, address1, city, state, zip, country |
| POST | `/search` | Herkese açık | — | Kiliseleri ada göre arar (POST varyantı) |
| POST | `/select` | JWT | — | Bir kiliseyi seçer/bu kiliseye geçer. Gövde: `{ churchId }` veya `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Bir kiliseyi arşivler veya arşivden çıkarır |
| POST | `/byIds` | Herkese açık | — | Kimliklere göre birden fazla kiliseyi yükler |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | 7 gün veya daha uzun süredir terk edilmiş kiliseleri siler |

## Gruplar

Temel yol: `/membership/groups`

Standart CRUD'u genişletir (temel sınıftan GET `/`, GET `/:id`).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Tüm grupları listeler |
| GET | `/:id` | JWT | — | Kimliğe göre grubu getirir |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Grupları ibadet filtrelerine göre arar |
| GET | `/my` | JWT | — | Geçerli kullanıcının gruplarını getirir |
| GET | `/my/:tag` | JWT | — | Geçerli kullanıcının gruplarını etikete göre filtreler |
| GET | `/tag/:tag` | JWT | — | Belirli bir etikete sahip tüm grupları getirir |
| GET | `/public/:churchId/:id` | Herkese açık | — | Kilise ve kimliğe göre herkese açık bir grubu getirir |
| GET | `/public/:churchId/tag/:tag` | Herkese açık | — | Etikete göre herkese açık grupları getirir |
| GET | `/public/:churchId/label?label=` | Herkese açık | — | Etikete göre herkese açık grupları getirir |
| GET | `/public/:churchId/slug/:slug` | Herkese açık | — | Slug'a göre herkese açık bir grubu getirir |
| POST | `/` | JWT | Groups.Edit | Grupları oluşturur veya günceller (slug'ı otomatik üretir) |
| DELETE | `/:id` | JWT | Groups.Edit | Bir grubu siler (hizmet grupları için alt ekipleri de siler) |

## Grup Üyeleri

Temel yol: `/membership/groupmembers`

Standart CRUD'u genişletir (temel sınıftan GET `/:id`, DELETE `/:id`).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Kimliğe göre grup üyesini getirir |
| GET | `/` | JWT | GroupMembers.View* | Grup üyelerini listeler. `?groupId=`, `?groupIds=` veya `?personId=` ile filtreleyin. *Kullanıcı grupta ise veya kendi personId'sini sorguluyorsa ve Attendance.View ya da Attendance.Edit iznine sahipse, gizli olmayan herhangi bir grubun `?groupId=` sorgusu için de izin verilir (13 yaşın altındaki üyeler bu kullanıcılara dahil edilir) |
| GET | `/my` | JWT | — | Geçerli kullanıcının grup üyeliklerini getirir |
| GET | `/basic/:groupId` | JWT | — | Bir grup için temel üye listesini getirir |
| GET | `/public/leaders/:churchId/:groupId` | Herkese açık | — | Grup liderlerini getirir (herkese açık) |
| GET | `/public/:churchId/:groupId` | Herkese açık | — | Bir grubun herkese açık kadrosunu getirir (asgari alanlar: `personId`, `displayName`, `leader`, fotoğraf). Yalnızca grup `publicRoster` üzerinden katılırsa çalışır; web sitesi oluşturucunun `staffGrid` öğesine güç verir |
| POST | `/` | JWT | GroupMembers.Edit | Grup üyeleri ekler veya günceller |
| DELETE | `/:id` | JWT | GroupMembers.View | Bir grup üyesini kaldırır |

## Hanehalkları

Temel yol: `/membership/households`

Standart CRUD denetleyicisi.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Tüm hanehalklarını listeler |
| GET | `/:id` | JWT | — | Kimliğe göre hanehalkını getirir |
| POST | `/` | JWT | People.Edit | Hanehalklarını oluşturur veya günceller |
| DELETE | `/:id` | JWT | People.Edit | Bir hanehalkını siler |

## Roller

Temel yol: `/membership/roles`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | Roles.View | Kimliğe göre rolü getirir |
| GET | `/church/:churchId` | JWT | Roles.View | Bir kilisenin tüm rollerini getirir. Her rol, içindeki farklı kullanıcı sayısını gösteren `memberCount` alanını içerir |
| POST | `/` | JWT | Roles.Edit | Rolleri oluşturur veya günceller |
| DELETE | `/:id` | JWT | Roles.Edit | Bir rolü siler (izinlerini ve üyelerini de kaldırır) |

## Rol Üyeleri

Temel yol: `/membership/rolemembers`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Bir rolün üyelerini getirir. Kullanıcı ayrıntılarını eklemek için `?include=users` ekleyin |
| POST | `/` | JWT | Roles.Edit | Bir role üye ekler (e-posta yoksa kullanıcı oluşturur) |
| DELETE | `/:id` | JWT | Roles.View | Bir rol üyesini kaldırır |
| DELETE | `/self/:churchId/:userId` | JWT | — | Kendinizi bir kiliseden çıkarın |

## Rol İzinleri

Temel yol: `/membership/rolepermissions`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Bir rolün izinlerini getirir ("Everyone" rolü için kimlik olarak `null` kullanın) |
| POST | `/` | JWT | Roles.Edit | Rol izinlerini oluşturur veya günceller |
| DELETE | `/:id` | JWT | Roles.Edit | Bir rol iznini siler |

## İzinler

Temel yol: `/membership/permissions`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Kullanılabilir izinlerin tam listesini getirir |

Her girdi `apiName`, `section` (içerik türü), `action` ve B1Admin'in rol düzenleyicisinde gösterdiği `displaySection` / `displayAction` etiketlerini içerir. Son eklenenler: `MembershipApi` / `People` / `View Names` (**View People Names Only**, People and Groups altında) ve `GivingApi` / `Donations` / `Enter` (**Enter Donations**, Donations altında; bkz. [Bağış Grupları](./giving.md#donation-batches)).

## Formlar

Temel yol: `/membership/forms`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin veya Forms.Edit | Tüm formları listeler (yönetici hepsini görür; düzenleyiciler atanmış ve üye olmayan formları görür) |
| GET | `/:id` | JWT | Form erişimi | Kimliğe göre formu getirir |
| GET | `/archived` | JWT | Forms.Admin veya Forms.Edit | Arşivlenmiş formları listeler |
| GET | `/group/:groupId` | JWT | Grup üyesi, grup lideri veya Forms.Admin | Gruba bağlı bağımsız formlar (`forms.groupId`); arşivlenmişler hariç, ada göre sıralı. `id`, `name`, `description` ve `open` (kullanılabilirlik penceresi içinde) alanlarını döndürür. Üyeler yalnızca açık formları görür; liderler ve form yöneticileri kapalı formları da görür. Grup sayfasındaki bağlı formları besler |
| GET | `/standalone/:id?churchId=` | JWT | — | Bağımsız bir formu getirir (kısıtlı formlar kimlik doğrulaması gerektirir) |
| POST | `/` | JWT | Forms.Admin veya Forms.Edit | Formları oluşturur veya günceller. Bağımsız formlar isteğe bağlı `photoUrl` (formun üstünde gösterilen başlık fotoğrafı) ve `groupId` (bağlı grup) kabul eder |
| DELETE | `/:id` | JWT | Form erişimi | Bir formu siler |

## Form Gönderimleri

Temel yol: `/membership/formsubmissions`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin veya Forms.Edit | Gönderimleri listeler. `?personId=` veya `?formId=` ile filtreleyin |
| GET | `/my?include=questions,answers` | JWT | — | Kendi kapsamı: oturum açmış üyenin gönderdiği veya kişisine bağlı olan en fazla 50 bağımsız form gönderimini (kişi formları değil) getirir (`contentType` `person`, `contentId` = kişi kimliği; örneğin bir yöneticinin kişi değişikliğinden sonra), en yeniden eskiye, her biri `form.name` ile birlikte. `include`, her formun sorularını ve gönderimin yanıtlarını ekler. Kullanıcı bir kişiye bağlı değilse `401` döndürür. B1 Me sayfasındaki **Formlarım** bölümünü besler |
| GET | `/group/:groupId` | JWT | Grubun lideri | Grubun liderleri için yanıtlar: bağlı form başına ve kayıt formu olan grup etkinliği başına bir girdi; her biri `form`, `event` (`id`, `title`, `start`; yalnızca etkinlik girdileri için), `questions` ve `submissions` (`answers` ve `personName` ile; anonimse `null`) içerir |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit veya görüntüleme erişimi | Kimliğe göre gönderimi getirir. `?include=form,questions,answers` ekleyin. Formun bağlı grubunun liderleri ve bir etkinlik kaydının ait olduğu grubun liderleri de okuyabilir |
| GET | `/formId/:formId` | JWT | Form erişimi (görüntüleme) | Bir form için tüm gönderimleri getirir (form, sorular ve yanıtları içerir). Formun bağlı grubunun liderleri görüntüleme erişimine sahiptir |
| POST | `/` | JWT | — | Form yanıtlarını gönderir (kısıtlı/kısıtsız formları işler, e-posta bildirimleri gönderir). Form `autoCreatePerson` içeriyorsa, e-postaya göre bir Guest kişiyi bulur veya oluşturur ve gönderimi bağlar; form ayrıca bir `groupId` içeriyorsa, kişiyi o gruba ekler; `followUpSubject`/`followUpBody` ayarlıysa, gönderene şablonlu bir takip e-postası gönderir. Çağıran formu yönetemiyorsa, `submittedBy` her zaman oturum açmış üyenin kişisine ayarlanır (veya anonim gönderimler için boş bırakılır) |
| DELETE | `/:id` | JWT | Forms.Admin veya Forms.Edit | Bir gönderimi ve yanıtlarını siler |

## Sorular

Temel yol: `/membership/questions`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Form erişimi | Bir formun sorularını listeler. `?formId=` gerekir |
| GET | `/:id` | JWT | Form erişimi | Kimliğe göre bir soruyu getirir |
| GET | `/unrestricted?formId=` | JWT | — | Kısıtsız bir formun sorularını getirir |
| GET | `/sort/:id/up` | JWT | — | Bir soruyu sıralamada yukarı taşır |
| GET | `/sort/:id/down` | JWT | — | Bir soruyu sıralamada aşağı taşır |
| POST | `/` | JWT | Form erişimi | Soruları oluşturur veya günceller (sıralamayı otomatik atar) |
| DELETE | `/:id?formId=` | JWT | Form erişimi | Bir soruyu siler |

## Yanıtlar

Temel yol: `/membership/answers`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin veya Forms.Edit | Yanıtları listeler. `?formSubmissionId=` ile filtreleyin |
| POST | `/` | JWT | Forms.Admin veya Forms.Edit | Yanıtları oluşturur veya günceller |

## Üye İzinleri

Temel yol: `/membership/memberpermissions`

Üye başına belirli formlara erişimi denetler.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | Form erişimi | Kimliğe göre bir üye iznini getirir |
| GET | `/member/:id` | JWT | Form erişimi | Bir üyenin tüm form izinlerini getirir |
| GET | `/form/:id` | JWT | Form erişimi | Bir formun tüm üye izinlerini getirir |
| GET | `/form/:id/my` | JWT | Form erişimi | Geçerli kullanıcının bir form için iznini getirir |
| POST | `/` | JWT | Form erişimi | Üye izinlerini oluşturur veya günceller |
| DELETE | `/:id?formId=` | JWT | Form erişimi | Bir üye iznini siler |
| DELETE | `/member/:id?formId=` | JWT | Form erişimi | Bir formda bir üyenin tüm izinlerini siler |

## Ayarlar

Temel yol: `/membership/settings`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Settings.Edit | Kilisenin tüm ayarlarını getirir |
| GET | `/public/:churchId` | Herkese açık | — | Bir kilisenin herkese açık ayarlarını getirir |
| POST | `/` | JWT | Settings.Edit | Ayarları kaydeder (base64 görüntü yüklemeyi destekler) |

## Alan Adları

Temel yol: `/membership/domains`

Temel sınıftan standart CRUD'u genişletir (GET `/:id`, GET `/`, DELETE `/:id`).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Tüm alan adlarını listeler |
| GET | `/:id` | JWT | — | Kimliğe göre alan adını getirir |
| GET | `/lookup/:domainName` | JWT | — | Bir alan adını ada göre bulur |
| GET | `/public/lookup/:domainName` | Herkese açık | — | Ada göre herkese açık alan adı araması |
| GET | `/health/check` | Herkese açık | — | Kontrol edilmemiş alan adları için sağlık denetimi çalıştırır |
| POST | `/` | JWT | Settings.Edit | Alan adlarını oluşturur veya günceller (Caddy güncellemesini tetikler) |
| DELETE | `/:id` | JWT | Settings.Edit | Bir alan adını siler |

## Kullanıcı Kilisesi

Temel yol: `/membership/userchurch`

Kullanıcılar ile kiliseler arasındaki ilişkiyi yönetir.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/userid/:userId` | JWT | — | Kullanıcı kimliğine göre kullanıcı-kilise kaydını getirir |
| GET | `/personid/:personId` | JWT | — | Bir kişiye bağlı kullanıcının e-postasını getirir |
| GET | `/user/:userId` | JWT | Server.Admin | Bir kullanıcının tüm kiliselerini yükler |
| POST | `/` | JWT | — | Bir kullanıcı-kilise ilişkisi oluşturur |
| PATCH | `/:userId` | JWT | — | Son erişim zamanını günceller ve erişimi kaydeder |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Bir kullanıcı-kilise kaydını siler |

## Görünürlük Tercihleri

Temel yol: `/membership/visibilityPreferences`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Geçerli kullanıcının görünürlük tercihlerini getirir |
| POST | `/` | JWT | — | Görünürlük tercihlerini kaydeder (adres, telefon, e-posta görünürlüğü) |

## Sorgu

Temel yol: `/membership/query`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| POST | `/members` | JWT | — | Yapay zekâ kullanarak doğal dille üye araması yapar. Gövde: `{ text, subDomain, siteUrl }` |

## İstemci Hataları

Temel yol: `/membership/clientErrors`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| POST | `/` | JWT | — | İstemci tarafındaki bir hatayı kaydeder |

## İlgili Sayfalar

- [Kimlik Doğrulama ve İzinler](./authentication): Oturum açma akışı, JWT, OAuth, izin modeli
- [Yoklama Uç Noktaları](./attendance): İbadet ve ziyaret takibi
- [Modül Yapısı](../module-structure): Kod organizasyon kalıpları
