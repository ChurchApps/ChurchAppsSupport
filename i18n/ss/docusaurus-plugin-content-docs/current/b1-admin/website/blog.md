---
title: "Ibhulogi"
---

# Ibhulogi

<div class="article-intro">

Likhasi le-Blog livumela kushicilela tindzaba, tibuyekezo, nemahlaba kuwebhusayithi yesonto lakho. Tipositi tibonakala ekhasini lemakhadi ku `/blog`, ekheleni lato, kanye ku-RSS feed lapho emanye emathuluzi (njenge-Zapier) angabona tipositi letintsha khona.

</div>

<div class="prereqs">
<h4>Ngaphambi Kokuqala</h4>

- Qedzela [Kusetfwa Kwekucala](initial-setup) kuwebhusayithi yakho
- Engeta sixhumanisi se-`/blog` kusuka ku-[Kuphatsa Emakhasi](managing-pages) uma ufuna kutsi bavakashi batfole ibhulogi yakho kusuka kumenyu

</div>

## Kufinyelela Ibhulogi

1. Ku-B1 Admin, vula [imenyu yeJump](../introduction.md#getting-around-with-the-jump-menu) (ibha yekufuna ngentasi ngentasi ngekhoneni lekhohlakele lelingenhla) bese unwebula **Website**.
2. Chofoza **Blog**.
3. Likhasi le-Blog libala tonkhe tipositi, kanye nesimo sato kanye nelusuku lekushicilelwa kwato.

## Kungeta Iposti

1. Chofoza **Add Post** ekhoneni lekhohlakele lelingenhla.
2. Faka **Title**. Ikheli le-webhu lelifundzeka kalula (**Web address**, slug) liyakhiwa ngekuzenzekelako lapho ubhala -- ungalihlela ngqo uma ufuna ikheli lehlukile.
3. Engeta **Excerpt** -- sifinyezo lesibonakala ohlwini lwetipositi, kumetadata yencazelo, nakuRSS feed. Uma uyishiya ingetulwa, ekhiwa ngekuzenzekelako kusuka ekuqaleni kwelivi lakho.
4. Bhala umtfombo weposti kumhleli we-**Content** usebenzisa Markdown. Chofoza **Preview** ukubona kutsi iposti lelifomethiwe lizobukeka kanjani.
5. Khetsa **Category** (khetsa lesikhona noma bhala lesisha) kanye ne-**Tags** lencono lehlukaniswe ngekhwebhu.
6. Chofoza **Select Image** ukukhetsa sithombe kugalari yakho ye-[Files](files), noma ulayishe lesisha. Tithombe letilayishiwe livula ithuluzi lekucekela lelakhelwe lelikhiyelwe ku-16:9, kuze ukwazi kwakha sithombe ngasinye ukuze sifanele inhloko yeposti nemakhadi ohlwini.
7. Setsa **Author** -- ikhona njengemvelisi yalelitsatsa, kodvwa ungafuna umuntu lotsite kusisekelo sakho sebantfu.
8. Vula **Published** bese usetsa **Publish Date** uma usulungele kwenta iposti libonakale kuwo wonkhe umuntu. Lisale livaliwe uma ufuna kugcina iposti njengemsebenti longakapheleli.

:::tip
Setsa **Publish Date** ngesikhatsi lesitako kute uhlele iposti. Iyafihleka kubavakashi, bese ibonisa umhlobiso lowetfwa **Scheduled** ohlwini lwe-Blog kuze kufike lelusuku.
:::

## Timo Tetiposti

Ngulamunye weposti ohlwini ubonisa imo yayo ngenye kwetintfo letintsatfu:

- **Draft** -- Ayishicilelwanga. Ibonakala kuphela kuma-admin.
- **Scheduled** -- I-**Published** ivuliwe, kodvwa lusuku lokushicilelwa lusakhatsatfu.
- **Published** -- Iphila kuwebhusayithi yakho futsi ifakwe ku-RSS feed.

## Kuhlela, Kubuka Kuqala, Nekususa Tiposti

- Chofoza **Edit** lisecondzana neposti ukwenta tishintsho.
- Chofoza **View on Site** (ebonakala kutiposti letishicilelwe) ukuvula iposti lelicedzeme kuwebhusayithi yakho kuthabhu lelisha.
- Chofoza **Delete** ukususa iposti ngokuphelela.

## Kutsi Bavakashi Babona Kanjani Ibhulogi Yakho

Tiposti letishicilelwe tibonakala ku `{yoursite}/blog`, tilishumi ngekhasi ngalinye, netixhumanisi te-**Older**/**Newer** tekuhamba ngemarekhodi ekugcineni. Kuphindze kube nesihlungi se-category kanye nemphilo nesithombe salowo lobhale ngasinye. Ma-tag nawo abonakala njengemasiginali lachofozekako, kuvumela bavakashi kutsi bahlunge uhlu ngama-tag ngendlela efanako. Tiposti ngatinye ihlala ku `{yoursite}/blog/{slug}` futsi ifaka tiposti letihlobene lelisuka ku-category lefanako. Likhasi le-blog futsi lishicilela i-RSS feed, leyatfolakala ngekuzenzekelako kumafundzi e-feed nakumathuluzi wekuzenzekela afana ne-Zapier.

:::info
Tiposti tibhulogi tiyinhlobo yencwadzi lehlukile kutsi emakhasi wewebhusayithi wetulo -- akakhiwa ku-[page editor](page-editor) futsi awabonakali ohlwini lwe-Pages. Lokhu kwenta kutsi kubhalwa kwebhulogi kube semandleni futsi kugxile ekubhaleni.
:::

## Kungeta Tikhomente Ngaphansi Kwetiposti

I-B1 ayisingethi tikhomente tebhulogi ngayo, kodvwa ungangeta inkhonzo yetikhomente. Ungabeka nanoma yini lenye ngaphansi kwayo yonkhe iposti, njengemphumelelo wekubhalisa ku-newsletter noma inkinobho yekunikela.

1. Bhalisela inkhonzo yetikhomente njenge-[Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com), noma [Disqus](https://disqus.com) bese ukopisha ikhodi yayo yekufaka.
2. Ku-Blog page, skrola uye ku-**Below Every Post**.
3. Namathela ikhodi yekufaka bese uchofoza **Save**.

Ikhodi ibonakala ngaphansi kwencwadzi yayo yonkhe iposti letishicilelwe. Inkhonzo yakho yetikhomente iphatha kulawula nekuhlunga kwe-spam, ngako hlola ideshibhodi yayo njalo.

:::tip
Susa umbhalo esibhokisini bese uchofoza **Save** ukususa ikhodi kuwo wonkhe emaposti. Labo labakwati kuhlela tilungiselelo tesonto kuphela ababona lebhokisi.
:::

## Tinyatelo Letilandzelako

- [Kuphatsa Emakhasi](managing-pages) -- Engeta sixhumanisi sekuhamba ku-blog yakho
- [Files](files) -- Layisha tithombe tekusebentisa kutiposti takho
- [Kuhlanganiswa ne-Zapier](../integrations/zapier.md) -- Vusa tencenye lekuzenzekelako lapho tiposti letintsha tishicilelwa
