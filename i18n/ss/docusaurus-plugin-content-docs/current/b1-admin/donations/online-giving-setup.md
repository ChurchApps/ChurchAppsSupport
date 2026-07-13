---
title: "Kuhlela Kunikela Kwenkhulumo-mgca"
---

# Kuhlela Kunikela Kwenkhulumo-mgca

<div class="article-intro">

B1 Admin ihlanganisa ne-**Stripe**, **PayPal**, kanye **Kingdom Funding** kute emalunga akho akwati kunikela ngenkhulumo-mgca ngesayithi lakho leB1.church. Nase kuhleliwe, iminikelo yenkhulumo-mgca ivela ngekutitomatika emarekhodini akho eminikelo ihlangene naletinye letifakwe ngesandla, kugcina konkhe kusistimu yinye.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Hlela [tikhwama tekunikela](funds.md) takho kuze banikeli bakwati kukhomba nome ngukuphi lubapho lwabo
- Dala i-akhawunti yeStripe ku-[stripe.com](https://stripe.com) bese uyivula (uyikhiphe endzaweni yekuhlola)
- Yiba nemininingwane yakho yekungena ku-B1 Admin lokulungele

</div>

## Kuhlela iStripe

1. Dala i-akhawunti ku-[stripe.com](https://stripe.com) uma ungakabinayo. Cinisekisa kutsi **uyivula i-akhawunti yakho** bese uyikhipha endzaweni yekuhlola.
2. Ku-Stripe, yiya ku-**Developers > API Keys**.
3. Kopisha **Publishable Key** yakho.
4. Ngena ku-[B1 Admin](https://admin.b1.church/).
5. Chofota **Church** kulukhalo lolusetulu, bese uchofota **Edit Church Settings**.
6. Chofota luphawu lwekuhlela lolusedvutane ne-**Church Settings**.
7. Skrola phansi uye esigabeni se-**Giving**.
8. Setsa **Provider** kutsi ibe ye-**Stripe**.
9. Namatsela i-Publishable Key yakho ensimini ye-**Public Key**.
10. Buyela kuStripe bese wembula **Secret Key** yakho (ungayibona kanye kuphela, ngako gcina i-bhekhaphi).
11. Namatsela i-Secret Key ensimini ye-**Secret Key** bese uchofota **Save**.

:::warning
I-Secret Key yeStripe yakho ikhonjiswa kanye kuphela. Yikopishele endzaweni levikelekile ngaphambi kwekusuka ku-idashbhodi yeStripe. Uma uyilahlekelwa, utawudzinga kukhiqiza sitfulo lesisha.
:::

## Kukhetsa Luhlobo Lwemali Yakho

Ngemuva kwekukhetsa iStripe njengomniki-msebenti wakho, luhlu lolwehlako lwe-**Currency** luyavela lisedvutane netitfulo takho te-API. Khetsa luhlobo lwemali loluhambisana neluhlobo lwemali lekukhokhwa lwe-akhawunti yakho yeStripe kuze iminikelo ikhokhwe ngendlela lefanele.

Tinhlobo temali letisekelwako tifaka i-USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, kanye ne-BRL. Ungafakazela nobe ushintje luhlobo lwemali lolujwayelekile lwe-akhawunti yakho ku-[Stripe Dashboard](https://dashboard.stripe.com/settings/currencies) yakho.

:::info
Luhlobo lwemali loluchakhetsa lapha lusetjentiswa kuminikelo yesikhatsi sinye, ekubhalisweni lokuphindzaphindzako, ekubalweni kwetindleko, nasemibikweni yeminikelo. Uma ushintja tinhlobo temali nasamuva, kuphela iminikelo lemisha nekubhaliswa lokusha kutawusebentisa luhlobo lolusha lwemali — tipho letiphindzaphindzako letikhona tichubeka ngoluhlobo lwemali letadalwa ngalo.
:::

:::warning
Cinisekisa kutsi i-akhawunti yakho yeStripe ihleliwe kwemukela luhlobo lwemali lokhetsile. Uma i-akhawunti yakho yeStripe ingasekeli luhlobo lwemali lokhetsile, iminikelo itawuhluleka ekukhokheni.
:::

## Kwengeta Likhasi Lekunikela Kusayithi Lakho LeB1.church

1. Yiya ku-[b1.church](https://b1.church/) bese ungena.
2. Chofota luphawu lwe-**Settings**.
3. Chofota **Add Tab**.
4. Khetsa **Donation** njengaluhlobo.
5. Faka ligama lethebhu (sib.e., "Nikela") bese uchofota **Save**.
6. Ngesihlengeto, shintja luphawu lwethebhu -- bhala "Giv" kusesha lwesifanekiso kute utfole luphawu loluhlotjaniswa nekunikela.

Likhasi lakho lekunikela selisebenta manje. Emalunga angalivakashela ku-`yoursubdomain.b1.church/donate`.

## Kwabelana Ngelinki Lakho Lekunikela

Kute utfole i-URL yakho yekunikela, yiya ku-**B1 Admin** bese uchofota luphawu lwe-**Settings** kute ubone i-subdomain yakho. Linki lakho lekunikela lilandzela lesakhiwo:

`https://yoursubdomain.b1.church/donate`

Yabelana ngalelilinki kusayithi lakho, kwemeyili, nobe ku-bhulethini lakho kuze emalunga akwati kutsi anganikela kuphi ngenkhulumo-mgca.

## Tatiso Temnikelo

IStripe itfumela satiso se-imeyili nsuku tonkhe nakemukelwa umnikelo. Kute ushintje ikheli le-imeyili lesatiso, yiya ku-idashbhodi yeStripe, uchofote iphrofayela yakho ngesencele sesekudla, ukhetse **Profile**, bese ubuyekete ikheli lakho le-imeyili.

## Kukhetsa Tindleko Tekucubungula

Ungakwati kuhlela likhasi lakho lekunikela kute uvumele banikeli ngesihlengeto kukhokha tindleko tekucubungula kuze libandla lakho lemukele linani lelisonkhe lemnikelo. Lesilungiselelo siphatswa etilungiselelweni telibandla lakho ngekhatsi ku-B1 Admin.

:::tip
Ngemuva kwekuhlela, wenta umnikelo lomncane wekuhlola kute ufakazele kutsi konkhe kusebenta ngaphambi kwekumemetela kunikela kwenkhulumo-mgca ebandleni lakho.
:::

## Kuhlela iKingdom Funding

IKingdom Funding ngumcubunguli wetinkhokhelo weKhristu losekela emakhadi ekukweleta/kukhokha kanye netincwadzi te-ACH tebhange. Uma libandla lakho libhalisiwe ku-Kingdom Funding, ungayihlanganisa njengelithuba lakho lekunikela.

:::info
Kuhlanganiswa kweKingdom Funding kusesigabeni sekuhlolwa manje. Tsindzana nemmeli wakho we-akhawunti yeB1 kute uyivulele libandla lakho.
:::

1. Bhalisa nobe ungene ku-[kingdomfunding.org](https://kingdomfunding.org).
2. Tfola **Security Key** yakho (yeluntfu) kanye ne-**Private Key** kusuka ku-merchant portal yeKingdom Funding.
3. Ku-B1 Admin, yiya ku-**Settings** bese uvula **Church Settings**.
4. Esigabeni se-**Giving**, setsa **Provider** kutsi ibe ye-**Kingdom Funding**.
5. Namatsela Security Key yakho ensimini ye-**Security Key** kanye ne-Private Key yakho ensimini ye-**Private Key**.
6. Setsa i-**Webhook Key** loyitfole kuKingdom Funding, bese ukopisha i-webhook URL lekhonjisiwe uyifake etilungiselelweni te-merchant teKingdom Funding kuze iKingdom Funding ikwati kwatisa iB1 nakuchedza ticoceleco.
7. Gcina.

Nase kuhlanganisiwe, emalunga atawubona sishintjanisi sekhadi/bhange ekhasini lekunikela futsi angakwati kunikela ngekhadi lekukweleta nobe nge-ACH.

## Tinyatselo Letilandzelako

- Sebentisa [Kungenisa kweStripe](stripe-import.md) kute udvonse ticoceleco tenkhulumo-mgca tingene ku-B1 Admin uma tingahlanganisi ngekutitomatika
- Hlola [Imibiko Yeminikelo](donation-reports.md) yakho kute ufakazele kutsi iminikelo yenkhulumo-mgca ivela kahle
- Khiqiza [Tincwadzi Temnikelo](giving-statements.md) letifaka kokubili iminikelo yenkhulumo-mgca nalengasiyo yenkhulumo-mgca
