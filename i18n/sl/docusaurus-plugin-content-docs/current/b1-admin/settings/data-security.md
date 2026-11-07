---
title: "Varnost podatkov"
---

# Varnost podatkov

<div class="article-intro">

Popolnoma varnega sistema ni, vendar ChurchApps varnost podatkov jemlje resno. Ta stran pojasnjuje ukrepe, ki so sprejeti za zaščito vseh podatkov, vnesenih v B1.church Admin in druge izdelke ChurchApps.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Preglejte to stran, da razumete, kako so zaščiteni podatki vaše cerkve
- Nastavite [Vloge in dovoljenja](./roles-permissions.md), da nadzirate, kdo lahko dostopa do občutljivih informacij
- Seznanite se z [politiko zasebnosti](https://churchapps.org/privacy)

</div>

## Omejevanje shranjevanja občutljivih podatkov

Naš prvi pristop je, da shranjujemo čim manj občutljivih podatkov. To pomeni, da nikoli ne shranjujemo podatkov o kreditnih karticah ali bančnih računih, uporabljenih za donacije. Ko uporabnik opravi donacijo prek B1.church Admin ali B1, se podatki o kreditni kartici nikoli ne prenesejo na naše strežnike, temveč le na vaš plačilni ponudnik (Stripe). To pomeni, da v primeru kršitve podatkov ne bi bili ogroženi nobeni podatki o kreditnih karticah ali bankah.

Gesel v našem sistemu prav tako nikoli ne shranjujemo. Vsa gesla se obdelajo z enosmerno zgoščevalno funkcijo, pri kateri se del podatkov uniči, zaradi česar gesla iz baze podatkov ni mogoče pridobiti – niti nam ne. Za preverjanje gesla mora vneseni podatek prestati isto enosmerno zgoščevanje in dati enak rezultat.

Po odstranitvi teh dveh virov ostane kot edini občutljivi podatek seznam imen in kontaktnih podatkov.

:::tip
Ker ChurchApps nikoli ne shranjuje podatkov o kreditnih karticah ali bančnih računih, tudi v najslabšem primeru kršitve podatkov ne bi bili razkriti podatki o finančnih računih. Ogroženi bi bili le imena in kontaktni podatki.
:::

## Uporaba standardnih najboljših praks

Uporabljamo industrijsko standardne najboljše prakse za varnost, vključno s šifriranjem vseh podatkov pri prenosu do in od naših strežnikov prek HTTPS. Vsi strežniki gostujejo v varnem fizičnem podatkovnem centru pri Amazon Web Services. Vsi strežniki baz podatkov so za požarnim zidom in niso dostopni z interneta.

## Ločevanje podatkov

Podatki so ločeni v različne baze podatkov glede na obseg. Vsak od naših API-jev (Membership, Giving, Attendance, Messaging, Doing in Lessons) predstavlja neodvisen sklop podatkov z lastnimi bazami podatkov. Če je eden od njih ogrožen, je uporabnost podatkov omejena, brez da bi bili ogroženi tudi drugi. Na primer, če bi bil ogrožen API/baza podatkov za Giving, bi napadalec morda pridobil seznam donacij in datumov (nikoli pa podatkov o kartici ali banki). Vendar ne bi imel dostopa do tega, kateri uporabniki so donacije opravili ali za katere cerkve so bile, saj so ti podatki shranjeni v ločeni bazi podatkov Membership.

:::info
Ločevanje podatkov pomeni, da ogrožitev enega sistema ne omogoča dostopa do vseh podatkov cerkve. Vsak API deluje neodvisno z lastno bazo podatkov, kar omejuje posledice morebitne kršitve.
:::

## Omejen dostop

Dostop do produkcijskih strežnikov je strogo omejen na skrbnike strežnikov, ki ga potrebujejo. Trenutno sta to dva posameznika, ki sta tudi člana upravnega odbora. Razvijalci, prostovoljci in drugi člani upravnega odbora nimajo dovoljenja za dostop do produkcijskih strežnikov.

## Politika zasebnosti

Vaši podatki so vaši in nikoli ne bodo prodani tretjim osebam. Celotno politiko zasebnosti lahko preberete [tukaj](https://churchapps.org/privacy).

## Skladnost z GDPR

ChurchApps podpira skladnost z GDPR za cerkve s člani v Združenem kraljestvu ali Evropski uniji. Tukaj je opisano, kako obravnavamo ključne zahteve:

### Pravice posameznikov, na katere se nanašajo podatki

ChurchApps ponuja orodja, ki cerkvam pomagajo odgovarjati na zahteve posameznikov, na katere se nanašajo podatki:

- **Pravica do dostopa (člen 15)** — Člani lahko zahtevajo kopijo svojih osebnih podatkov tako, da se obrnejo na svojo cerkev. Skrbniki lahko izvozijo podatke katere koli osebe v razdelku **Upravljanje podatkov** na strani s podrobnostmi o osebi v B1.church Admin.
- **Pravica do izbrisa (člen 17)** — Člani lahko sami zahtevajo izbris računa na svoji strani Profil (glejte [Pregled zahtevkov za izbris računa](../profile/account-deletion.md)) ali tako, da se neposredno obrnejo na svojo cerkev. Skrbniki lahko tudi anonimizirajo podatke osebe v vseh modulih v razdelku **Upravljanje podatkov** na strani s podrobnostmi o osebi. Anonimizacija nadomesti osebne podatke s splošnimi vrednostmi, pri čemer ohrani skupne zapise (skupne zneske donacij, števila udeležb), potrebne za finančno poročanje cerkve.
- **Pravica do omejitve obdelave (člen 18)** — Člani lahko zahtevajo omejitev obdelave tako, da se obrnejo na svojo cerkev, tudi z odjavo od komunikacij.
- **Pravica do prenosljivosti podatkov (člen 20)** — Skrbniki lahko v imenu članov, ki to zahtevajo, izvozijo osebne podatke v strukturirani, strojno berljivi obliki JSON.

### Uporaba orodij za upravljanje podatkov

Za dostop do orodij za podatke GDPR za posameznika:

1. Pojdite na **Ljudje** v B1 Admin in odprite zapis osebe.
2. Kliknite **Uredi**, da preklopite v način urejanja.
3. Pomaknite se navzdol do razdelka **Upravljanje podatkov** (privzeto strnjen) in kliknite, da ga razširite.
4. Z **Izvozi podatke** prenesite datoteko JSON z vsemi podatki, shranjenimi za to osebo.
5. Z **Anonimiziraj** nadomestite osebne podatke s splošnimi vrednostmi. Vneseti boste morali `ANONYMIZE`, da potrdite dejanje – tega dejanja ni mogoče razveljaviti.

:::warning
Anonimizacija je trajna. Skupni zneski donacij in števila udeležb se ohranijo za namene finančnega poročanja, vsi osebni identifikatorji (ime, e-pošta, naslov itd.) pa so odstranjeni in jih ni mogoče obnoviti.
:::

### Obdelava podatkov

ChurchApps deluje kot **obdelovalec podatkov** v imenu vaše cerkve (**upravljavec podatkov**). Naša [Pogodba o obdelavi podatkov](https://churchapps.org/terms) določa odgovornosti vsake stranke, vključno z uporabo podobdelovalcev, postopki obveščanja o kršitvah in ravnanjem s podatki ob prekinitvi.

### Mednarodni prenosi podatkov

Podatki ChurchApps gostujejo pri Amazon Web Services (AWS) v Združenih državah. Mednarodne prenose podatkov iz Združenega kraljestva/EU pokrivajo Standardne pogodbene klavzule (SCC) AWS v okviru [Dodatka o obdelavi podatkov AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Dodatek o obdelavi podatkov AWS je samodejno vključen v Pogoje storitev AWS za vse stranke. Gostovanje v EU ni potrebno, kadar so ustrezni mehanizmi prenosa, kot so SCC, vzpostavljeni.

Za podrobnosti o tem, kako so bada tveganja prenosa ocenjena, glejte [Oceno tveganja prenosa](./transfer-risk-assessment.md).

### Podobdelovalci

- **Amazon Web Services (AWS)** — Gostovanje infrastrukture, shranjevanje podatkov in dostava vsebin
- **Stripe** — Obdelava plačil za donacije (ChurchApps ne shranjuje podatkov o karticah)

:::info
Za popolne podrobnosti o tem, kako obravnavamo osebne podatke, glejte našo [Politiko zasebnosti](https://churchapps.org/privacy) in [Pogoje storitve](https://churchapps.org/terms). Če imate vprašanja o skladnosti z GDPR, nas kontaktirajte na support@churchapps.org.
:::
