---
title: "Kulungisa Kwekucala"
---

# Kulungisa Kwekucala

<div class="article-intro">

I-akhawunti yonkhe ye-B1 ita neliwebhusayithi lesele lilungele kusetjentiswa. Lomculu ukuhambisa ekulungiseni i-domain yelibandla lakho, kulungiseni kubukeka kwesayithi lakho, kudaleni emakhasi akho ekucala, kanye nekuhleleni i-navigation yakho.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Udzinga i-akhawunti ye-B1.church lenelifikelelo lekuphatsa
- Uma usebentisa domain lekhetsile, yenta kutsi umniningwane wekungena (login credentials) we-DNS provider wakho ulungile (sib. GoDaddy, Cloudflare, nome AWS)
- Lungisa ilogo yelibandla lakho ngesifomeni se-PNG lenesizinda lesicondzekako kutfola imiphumela lemihle kakhulu

</div>

## Kulungisa i-Domain Yakho

Libandla lakho lemukela ngekutentekela i-subdomain ku-B1.church (sibonelo, `yourchurch.b1.church`). Ungakwati futsi kukhomba i-domain yakho lekhetsile ku-lisayithi lakho le-B1.

1. Yendlulela ku- **B1.church Admin** ngekuvakashela admin.b1.church nome uchofote i-dropdown yephrofayili yakho bese ukhetsa **Switch App**.
2. Chofota **Dashboard** kulisayidbha lengesencele, bese ukhetsa **Settings** ku-dropdown menu.
3. Chofota **Manage** kute ubuke i-subdomain yakho. Yimise ibe ntfo lemfisha futsi leyatiwako ngaphandle kwemikhawulo.
4. Kute usebentise i-domain lekhetsile, ngena ku-DNS provider wakho (njenge-GoDaddy, Cloudflare, nome AWS) bese ungeta emarekhodi lamabili:
   - I- **A record** ye-root domain yakho lekhomba ku-`3.23.251.61`
   - I- **CNAME record** ye-`www` lekhomba ku-`proxy.b1.church`
5. Buyela ku-B1.church Admin, ngeta i-domain yakho lekhetsile kuluhlu, bese uchofota **Add** bese **Save**. Lisayithi lakho litawufinyeleleka kusuka ku-domain yakho lekhetsile ngekhatsi kwemaminithi lambalwa.

:::tip
Uma ungayiboni inketfo ye-Settings, cela umuntfu lolungise i-akhawunti yelibandla lakho kutsi akunike imvumo ye- "Edit Church Settings". Buka [Roles & Permissions](../settings/roles-permissions.md) kutfola imininingwane.
:::

## Kudala Likhasi Lakho Lekucala

1. Ku-B1 Admin, chofota **Website** kumenyu wangesencele kute uvule embukisi we-Website Pages.
2. Chofota **Add Page** engoshweni lesekudla lengetulu.
3. Khetsa **Blank** njengeluhlobo lwekhasi bese ulinika ligama "Home."
4. Chofota **Page Settings** bese usimisa indlela ye-URL ibe `/` (sikhandvo lesihamba embili ngaphandle kwembhalo) yelikhasi lakho lasekhaya. Lamanye emakhasi asebentisa `/page-name`.
5. Chofota **Edit Content** kute ucale kwakha. Likhasi ngalinye kufanele licale nge- **Section** -- lena yindzawo yekufaka tonkhe letinye ticenye.
6. Ngemuva kwekungeta sigaba, chofota **Add Content** futsi kute ufake umbhalo, titfombe, emavidiyo, emakhadi, emafomu, nakunye lokunyenti ngekutidvonsela esigabeni sakho.

:::info
Kutfola imiyalo lecacile ngekusebenta ngemakhasi ne-navigation, buka [Managing Pages](managing-pages). Kutfola umculu logcwele we-visual editor, buka [Using the Page Editor](page-editor).
:::

## Kulungisa Kubukeka Kwelisayithi

1. Kusuka embukisini we-Website Pages, chofota i-tab le- **Appearance** engetulu.
2. Sebentisa i- **Color Palette** kute usimise imibala yebrendi wakho yalokuyinhloko, lokwesibili, kanye ne-accent.
3. Ngaphansi kwe- **Typography Settings**, khetsa imibhalo yakho yesihloko nemtimba kusikhangisi semibhalo.
4. Layisha ilogo yelibandla lakho ngaphansi kwe- **Logo** ku-Style Settings. Nika tobabili tinguqulo tesizinda lesikhanyako kanye nesimnyama.
5. Lungisa i- **Site Footer** yakho ngemininingwane yekutsintsana yelibandla lakho kanye netilinki.

:::info
Tinshintjo lotenta ku-Appearance tisebenta kulo lonkhe liwebhusayithi lakho. Buka likhasi le- [Appearance](appearance) kutfola imiyalo lecacile yalinye lungiselelo.
:::

## Kulungisa I-Navigation

Tilinki takho te-navigation tivela kulisayidbha lengesencele lembukisi we-Website Pages. Kute utihlele:

1. Chofota **Add** kute udale linki lelisha le-navigation bese ulikhomba kuliphi lelikhasi lakho.
2. Dvonsa bese ulahla tilinki kute utihlele kabusha nome utifake ngaphansi kwentfo yenhloko.
3. Buka lisayithi lakho kucinisekisa kutsi i-navigation ibukeka kahle.

## Tinyatselo Letilandzelako

- [Managing Pages](managing-pages) -- Fundza kutsi usebenta njani ngemakhasi ne-navigation ngalokugcwele
- [Appearance](appearance) -- Hlela imibala, imibhalo, kanye nesakhiwo selisayithi lakho
- [Files](files) -- Layisha titfombe nemibhalo yeliwebhusayithi lakho
