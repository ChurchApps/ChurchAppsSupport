---
title: "التخزين الخاص بك (BYOS)"
description: "اربط Google Drive أو Dropbox أو OneDrive أو حاوية S3 المتوافقة الخاصة بك في B1 Admin، ليتجاوز رفع ملفات الكنيسة حد المنصة البالغ 100 ميجابايت."
---

# التخزين الخاص بك (BYOS)

تحصل الكنائس على نحو 100 ميغابايت من التخزين المستضاف مجانًا للملفات (الواجهات في `/content/files`: ملفات الموقع الإلكتروني، ومواد المجموعات). يتيح BYOS للكنيسة ربط مساحة التخزين السحابية الخاصة بها، مثل **Google Drive أو Dropbox أو OneDrive أو أي حاوية متوافقة مع S3** (AWS S3 وCloudflare R2 وBackblaze B2)، فتُحفظ الملفات الجديدة المرفوعة في حساب الكنيسة نفسه دون أي سقف تفرضه المنصة. تبقى ChurchApps مجانية، والحد الوحيد هو حساب الكنيسة الخاص.

## طبقة المزوّد

يعيد BYOS استخدام طبقة التخزين التي أُنشئت لـ [MinistryStuff](./ministrystuff.md): الواجهة `IStorageProvider` (في `Packages/apihelper`)، ويحدّدها `StorageResolver` لكل كنيسة على حدة من جدول `content.storageProviders`. وعلى عكس مزوّدي `churchapps` و`ministrystuff` المفردين، تحتفظ مزوّدات BYOS ببيانات اعتماد خاصة بكل كنيسة، لذلك ينشئ `StorageResolver.forChurch` نسخة لكل طلب بناءً على سجل الكنيسة. تقع التطبيقات بجانب المحدِّد في `Api/src/modules/content/helpers/`: وهي `GoogleDriveStorageProvider` و`DropboxStorageProvider` و`OneDriveStorageProvider` و`S3CompatibleStorageProvider`، إضافةً إلى `ByosAuth` (لتبادل رموز OAuth وتجديدها بشكل فردي، إذ تُدوِّر Dropbox رموز التجديد، لذلك تُزال عمليات التجديد المكررة بالطريقة نفسها التي يعتمدها `ProviderProxyController`).

يحتوي `storageProviders` على بيانات الاعتماد: إما `accessToken` و`refreshToken` و`tokenExpiresAt` (مشفّرة، وهي مجموعة OAuth الثلاثية)، أو `apiKey` و`apiSecret` مع حقل `settings` بصيغة JSON (`{endpoint, region, bucket, publicBase}` لخدمة S3). لا تصل الرموز إلى العميل أبدًا، إذ تُخفي `GET /content/storage/providers` الأسرار وتعيد قيمة منطقية باسم `connected`.

## تدفق الرفع

العقد نفسه المكوّن من ثلاث خطوات كما في السابق، مع شكل موسّع لتوقيع الرفع المسبق. يعيد `POST /content/files/postUrl` البيانات `PresignedPostData` التي تحمل الآن بشكل اختياري الحقول `method` و`rawBody` و`headers` و`chunkSize` و`externalIdField`:

| المزوّد | الرفع المسبق | إرسال البايتات من العميل |
|---|---|---|
| churchapps (الافتراضي) | S3 presigned POST | نموذج متعدد الأجزاء (قديم) |
| Google Drive | جلسة رفع قابلة للاستئناف (نطاق `drive.file`) | طلب PUT واحد إلى عنوان الجلسة |
| Dropbox | `files/get_temporary_upload_link` (4 ساعات) | طلب POST خام |
| OneDrive | `createUploadSession` (في approot) | رفع PUT مقسّم (20 ميبибايت، مضاعفات 320 كيبibايت من Graph) |
| متوافق مع S3 | presigned PUT (لا تدعم B2 سياسات POST) | طلب PUT خام |

تتولى `FileHelper.uploadPresignedFile` (من `@churchapps/helpers`) جميع هذه الأشكال، وتعيد معرّف الملف لدى المزوّد عندما تتضمنه الاستجابة (كما في Drive). ويمرّره العميل بوصفه `externalId` في تسجيل `POST /content/files`، ويسجّل الحقلان `files.provider` و`files.externalId` مكان وجود البايتات (معرّف ملف Drive، أو المسار في المزوّدين الآخرين). ولا يُطبَّق فحص حصة 100 ميغابايت إلا عندما يكون المزوّد المحدَّد هو `churchapps`.

## التنزيلات العامة

لا يمكن الربط المباشر بالملفات في السحابات الاستهلاكية (إذ تتجاوز روابط Drive الحصة، وتنتهي صلاحية روابط Dropbox وOneDrive)، لذلك بالنسبة لمجموعة OAuth الثلاثية يشير `contentPath` إلى مسار ثابت في واجهة Api: `GET /content/files/download/:id` (مجهول الهوية) يحمّل صف الملف، ويُنشئ رابطًا مباشرًا قصير الصلاحية عبر الدالة `getDownloadUrl` الخاصة بالمزوّد (`webContentLink` أو `get_temporary_link` أو `@microsoft.graph.downloadUrl`)، ويخزنه مؤقتًا في الذاكرة لمدة 30 دقيقة، ثم يعيد التوجيه بالرمز 302 مع الترويسة `Cache-Control: max-age=300`. وتنتقل حركة النطاق الترددي بين المتصفح والمزوّد مباشرةً، ولا تمرّ عبر Api. أما متوافقو S3 فيتجاوزون إعادة التوجيه كليًا، إذ يكون `contentPath` هو عنوان `publicBase + key` الثابت (يجب أن تسمح الحاوية بالقراءة العامة وبطلب CORS من نوع PUT).

تُوجَّه عمليات الحذف والتنزيل بحسب `files.provider` (عبر `StorageResolver.forFile`)، أما الصفوف القديمة التي لا تحمل هذا الحقل فتعود إلى التوجيه بحسب بادئة عنوان URL. وإعادة التسمية لملفات BYOS تتم في قاعدة البيانات فقط، لأن البايتات تُعنوَن بواسطة `externalId` وليس بالاسم. وعند فصل مزوّد ما زالت لديه ملفات، لا يُحذف الصف بل يُعطَّل تعطيلًا ناعمًا (مع الاحتفاظ بالرموز حتى تستمر التنزيلات والحذف في العمل) بدلًا من حذفه.

## الربط (B1Admin ← الإعدادات ← تخزين الملفات)

تستخدم مجموعة OAuth الثلاثية تدفق الترحيل نفسه المستخدم لمزوّدي المحتوى: نافذة منبثقة ← موافقة المزوّد ← `{membershipApi}/oauth/relay/callback` ← يستطلع B1Admin جلسة الترحيل ← يُجري `POST /content/storage/exchange` تبادل الرمز بالرمز على الخادم (لا تغادر أسرار العميل الخادم أبدًا؛ إذ يستخدم Google المتغيّر `GOOGLE_DRIVE_CLIENT_SECRET` وOneDrive المتغيّر `ONEDRIVE_CLIENT_SECRET`، أما Dropbox فهي عميل عام يعتمد PKCE). توجد معرّفات العملاء في `B1Admin/src/settings/components/byosProviders.ts` وفي `Api .../ByosAuth.ts`. والنطاقات محدودة عمدًا: `drive.file` في Google (للملفات التي ينشئها التطبيق فقط، دون الحاجة إلى التحقق من النطاقات المقيّدة)، و`Files.ReadWrite.AppFolder` في OneDrive، ووصول مجلد التطبيق في Dropbox. أما S3 فهو نموذج بيانات اعتماد بسيط.

ملاحظة حول النطاق: يغطي BYOS واجهات `/content/files` فقط. تبقى صور المعرض والصور المصغّرة والشعارات وصور الأشخاص على المزوّد الافتراضي (فهي صغيرة، ومُقدَّمة عبر شبكة CDN، ومحسّنة للصور). ويجوز للعميل أيضًا تمرير `platformStorage: true` في نص الطلب `postUrl` لتثبيت الرفع على مزوّد churchapps الافتراضي بصرف النظر عن إعداد BYOS الخاص بالكنيسة. يستخدم FreeShow هذا الخيار لحالة المزامنة `files/group/{teamId}/current.zip`، وهي حالة تُقرأ مباشرةً من مضيف المحتوى العام ولا تُسجَّل أبدًا كصف ملف.
