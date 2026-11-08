---
title: "Umhlahlandlela: Setha Ukunikela Ngelinethi"
description: "Setha ukunikela ngelinethi ku-B1 Admin ngekudala emafundi emininikelo, uxhume ne-Stripe, futsi ungeze ikhasi le-Donate kuwebhusayithi yakho ye-B1.church yemalungu."
---

# Setha Ukunikela Ngelinethi

<div class="article-intro">

Hamba kuyo yonkhe into lefunekako kuze wemukele imininikelo ngelinethi esontweni lakho, kusukela ekudaleni emafundi emininikelo, kuya ekuxhumeni ne-Stripe yekucubungula tikhokhelo, kuya ekwabelaneni ngekhasi lekunikela nebandla lakho. Ekugcineni, emalungu azakwazi kunikela ngelinethi kuwebhusayithi yakho nakuhlelo lwakho lwemakhompyutha lemnyenti.

</div>

<div class="prereqs">
<h4>Ngaphambi Kokuqala</h4>

- I-akhawunti ye-B1 Admin lenelungelo le-admin — bona [Tindzima Netimvume](../people/roles-permissions.md)
- I-akhawunti ye-Stripe (yakha eyemahhala ku-[stripe.com](https://stripe.com) uma kudzingeka)

</div>

## Sitepisi 1: Dala Emafundi Emininikelo

Emafundi ngetigaba tetinikelo labanikela kuto. Udzinga okungenani lilulo lelilodvwa ngaphambi kokuba wemukele imininikelo.

Landzela umhlahlandlela we-[Funds](../donations/funds.md) kuze usete tigaba takho tekunikela:

1. Dala emafundi lamavame kakhulu (njenge "General Fund", "Building Fund", "Missions")
2. Phawula emafundi atfolakala kutekukhokha intela ngendlela lefanele — lokukhetsa kuyathinta tingcaciso tekunikela ngekugcina umnyaka

:::tip
Ungengeta emanye emafundi noma nini. Qala ngetigaba letikhulu kakhulu tekunikela.
:::

## Sitepisi 2: Xhuma ne-Stripe

I-Stripe icubungula tonkhe tikhokhelo. Uyawuxhuma i-akhawunti yakho ye-Stripe ne-B1 Admin kuze imininikelo ingene ku-akhawunti yakho yebhange.

Landzela umhlahlandlela we-[Online Giving Setup](../donations/online-giving-setup.md) uxhume i-Stripe:

1. Ngena ku-dashibhodi yakho ye-Stripe bese uthola i-Publishable Key nelikhiye le-Secret Key
2. Ku-B1 Admin, ngena ku-Settings bese ufake tikhiye letimbili

:::warning
I-Stripe ikhombisa i-Secret Key kanye nje. Yikopishe bese uyigcina ngaphambi kokushiya i-dashibhodi ye-Stripe. Uma uyilahlekelwa, kuyakudzingeka udale enye.
:::

## Sitepisi 3: Engeza Ikhasi Lekunikela Kuwebhusayithi Yakho

Yenta kutfolakale kalula ngekungeta ikhasi lekunikela kuwebhusayithi yakho ye-B1.

Landzela imihlahlandlela ye-[Online Giving Setup](../donations/online-giving-setup.md) ne-[Managing Pages](../website/managing-pages.md) kuze:

1. Ungeze ithebhu ye-"Donate" kusayithi yakho ye-B1.church
2. I-URL yakho yekunikela itawuba: `https://yoursubdomain.b1.church/donate`
3. Emalungu anganikela angangeni ngemvume (ikhasi lelivulekile) noma angene ngemvume kuze agcine tindlela tekukhokha letigciniwe kanye nemlandvo wemininikelo yawo

## Sitepisi 4: Yenta Umnikelo Wekuhlola

Ngaphambi kokumemetela ebandleni lakho, hlola kutsi konkhe kuyasebenta.

1. Nikela imali lencane yekuhlola kuze uhlole kutsi inqubo isebenta kusukela kuqala kuya ekugcineni
2. Hlola kutsi umnikelo uvela ku-B1 Admin ngaphansi kwe-Donations

:::tip
Sebentisa imodi yekuhlola ye-Stripe kuqala uma ufuna kuhlola ngaphandle kwetikhokhelo letiyiqiniso, bese uyashintsha kumodi yekuphila ngaphambi kokumemetela ebandleni lakho.
:::

## Sitepisi 5: Memetela Ebandleni Lakho

Tsatsa ligama kutsi emalungu atfole kutsi angakunikela ngelinethi.

1. Yabelana ngeURL yekunikela ngewebhusayithi yakho, emalitsamanti lemalitsamanti, emabhuletini, nakutinkundla tetentsandvo
2. Emalungu angakunikela futsi nge-[B1 App](../../b1-church/giving/index.md) — sici sekunikela sakhiwe ngekwayo

:::info
Emalungu langena ngemvume angagcina tindlela tekukhokha, asete imininikelo lephindvwelako, futsi abuke umlandvo wawo wekunikela. Kunikela ngekungatsi ubaziwe nakho kuyasebenta — akudzingeki kungene ngemvume.
:::

## Sitepisi 6: Kuphatsa Lokuqhubekako

Gcina emarekhodi akho emininikelo amasha futsi wenta imibiko njalo ngalo lonkhe umnyaka.

1. [Ngenisa tenkhulumisano te-Stripe](../donations/stripe-import.md) njalo (nsuku zonkhe noma inyanga zonkhe) kuze emarekhodi akho agcine amasha
2. [Bona imibiko yemininikelo](../donations/donation-reports.md) kuze ulandzele tindlela temnikelo kanye nemagalelo ngemafundi
3. [Yenta titatimende temnikelo temnyaka](../donations/giving-statements.md) letikhomba tetintela temalungakho

:::tip
Gijima ukungenisa kwe-Stripe nyanga ngayinye ubuncane kuze emarekhodi akho agcine amasha. Bona [Umhlahlandlela Wemibiko Yemnyaka](./year-end-reports.md) kuze uthole inqubo yekugcina umnyaka iphelele.
:::

## Sekuphelile!

Sonkhe manje sesemukela imininikelo ngelinethi. Emalungu angakunikela kuwebhusayithi yakho, ku-B1 App, noma nanoma yiliphi lidivayisi lelinebhulawuza yewebhu. Yonkhe imininikelo ilandzelwa ngekuzenzekela ku-B1 Admin.

## Tindzatfo Letihlobene

- [Funds](../donations/funds.md) — dala futsi uphatse tigaba temnikelo
- [Batches](../donations/batches.md) — hlela iminikelo ibe tiqembu
- [Recording Donations](../donations/recording-donations.md) — ngenta ngesandla imininikelo yemali nelisheki
- [Stripe Import](../donations/stripe-import.md) — hwebelela tikhokhelo letentelwe ku-inthanethi ku-B1 Admin
- [Donation Reports](../donations/donation-reports.md) — bona tindlela temnikelo kanye nemagalelo
- [Giving Statements](../donations/giving-statements.md) — dala titatimende temutsi temnyaka
- [Making Donations](../../b1-church/giving/making-donations.md) — umuntfu lonikela ku-B1.church nasi-B1 App
