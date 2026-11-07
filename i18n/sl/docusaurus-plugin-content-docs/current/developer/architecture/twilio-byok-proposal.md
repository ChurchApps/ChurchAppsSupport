---
title: "Twilio BYOK (predlog)"
description: "Predlagana cerkveno lastna integracija Twilio, model privolitve, obseg implementacije in merila za izdajo."
---

# Predlog integracije Twilio BYOK

:::caution Predlog — ni na voljo kot integracija
To je zasnova za pregled s strani vzdrževalcev, ki temelji na javni izvorni kodi in dokumentaciji Twilio, pregledani 22. oktobra 2026. Od takrat je bil izdan osnovni ponudnik Twilio (`@churchapps/texting` 0.6.0 in B1 Admin **Nastavitve > Pošiljanje SMS-ov**): cerkev vnese svoj Account SID, Auth Token in pošiljateljevo številko (ponudnik sprejme tudi Messaging Service SID, ki se začne z `MG`, vendar je stolpec `fromNumber` še vedno `varchar(20)`, kar je prekratko za 34-znakovni SID). Sporočila se pošiljajo z eno zahtevo na prejemnika prek Twilio Messages API, odgovori STOP pa dosežejo B1 prek obstoječega dohodnega webhooka. Glej [Nastavitve cerkve: Pošiljanje SMS-ov](../../b1-admin/settings/church-settings.md#texting). Model privolitve, obravnava Advanced Opt-Out, stanje dostave in spodaj opisana preverjanja pripravljenosti nastavitev so še vedno predlogi, ne izdano vedenje. Spremljajoči [osnutek uvajanja cerkve](./twilio-byok-onboarding-draft.md) vsebuje predlagana navodila za nastavitev in primere, specifične za cerkve.
:::

## Priporočena pot

Dodajte Twilio v obstoječi sistem ponudnikov SMS-ov v B1 z **lastnim računom Twilio cerkve, API-poverilnicami, Messaging Service in številko, ki podpira SMS**. Cerkev registrira svojo pravno osebo in kampanjo sporočil, plačuje Twilio neposredno, vzdržuje privolitve prejemnikov in upravlja odobritev v Twilio Console. ChurchApps zagotavlja integracijo in dokumentacijo.

Začnite z enim programom sporočil, eno Messaging Service in enim lokalnim 10DLC pošiljateljem v ZDA na cerkev B1. Podprite posamezna besedila, skupinska besedila, besedila iz delovnih tokov in opomnike za prijavo prek obstoječih zaslonov B1. Smiseln prvi program zajema spremembe bogoslužij, opomnike za dogodke in razporejanje prostovoljcev, če so vsi trije opisani v privolitvi te cerkve in v odobreni kampanji. Financiranje ali promocijska sporočila zahtevajo ločeno oceno obsega in privolitve; ne dodajajte jih tiho v ta program.

| Odgovornost | Cerkev | B1 / ChurchApps |
|---|---|---|
| Račun Twilio, obračun, lastništvo številk | Je lastnik in jih upravlja | Ne zagotavlja platformnega računa in ne prodaja kreditov naprej |
| Blagovna znamka, kampanja, registracija številke | Predloži točne podatke o cerkvi; obravnava pregled in popravke | Pojasni predpogoje in prebere razpoložive podatke o pripravljenosti |
| Stran za prijavo, pravilniki, namen sporočil | Jih objavlja in vzdržuje | Zagotavlja združljive kontrole obrazcev, primere in evidence privolitev |
| Upravičenost prejemnikov in obravnava STOP | Pregleda dokaze o privolitvi in zahteva odgovore, prejete zunaj SMS-a | Uveljavlja privolitev, izključitve, dovoljenja in podpisane webhooke |
| Dostava in podpora | Spremlja napake Twilio, stanje računa in dohodne odgovore | Prikazuje stanje oddaje in dostave, brez trditev o zagotovilih za odobritev |

Odložite ChurchApps-ov matični račun Twilio, podračune strank, nakup številk, oddaje v Trust Hub, obračun, pogovorni nabiralnik, MMS/WhatsApp, mednarodno pošiljanje in uvajanje brezplačnih (toll-free) številk. Brezplačne številke so ločena pot za preverjene pošiljatelje, ne obvoz registracije. Te meje ohranjajo prvo izdajo usklajeno z obstoječim modelom B1 „lastnega ponudnika“ (bring-your-own-provider).

## Obstoječe osnove in vrzeli

Naslednja opažanja so vezana na posnetke izvorne kode, ne na predpostavko o tem, kaj je trenutno nameščeno:

| Komponenta | Obstoječe vedenje | Posledica |
|---|---|---|
| [Register ponudnikov in pogodba](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` podpira posamezna in skupinska pošiljanja, preverjanje, neobvezne zmogljivosti naročnikov/seznamov ter ID sporočila ponudnika v rezultatih. Nobena prilagoditev za Twilio ni registrirana. | Dodajte Twilio v `@churchapps/texting`; ni potrebno ustvarjanje naročnikov ali seznamov, ki jih upravlja ponudnik. |
| [Nastavitve pošiljanja SMS-ov](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church in Nalo so izbirni; MinistryStuff je omejen s funkcijami. Urejanje in shranjevanje pošiljatelja je trenutno specifično za Nalo. | Dodajte izrecna polja za Twilio, preverjanje, shranjevanje pošiljatelja in pomoč pri uvajanju. Sama vnosna postavka v spustnem meniju ni zadostna. |
| [Krmilnik](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) in [prehod modula](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Poverilnice so šifrirane in maskirane; ročna in samodejna pošiljanja določijo ponudnika cerkve. Skupinska pošiljanja odstranijo podvojene telefonske številke. | Ponovno uporabite te poti in ohranite avtorizacijo. Nove vrata privolitve in pripravljenosti postavite v skupno strežniško pot, da delovni tokovi ne morejo mimo njih. |
| [Pomočnik STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Razčlenjuje `From`/`Body` v slogu Twilio; preveri žeton URL cerkve; nastavi `person.optedOut` in onemogoči opomnike SMS. Drugi odgovori se prezrejo. | Koristna izhodiščna točka, ne popoln Twilio webhook. Dodajte podpise Twilio in neodvisno stanje naročnine na SMS. |
| [Shema sporočil](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Shranjuje `apiKey`, `apiSecret` in 20-znakovni `fromNumber`; dnevniki dostave hranijo takojšnji uspeh ali napako, ne pa ID-jev ponudnika ali končnih stanj dostave. | Pošiljateljeva številka E.164 ustreza; 34-znakovni Messaging Service SID potrebuje lastno polje. Dodajte trajno shranjevanje sporočil in stanj ponudnika. |
| [Javna stran obrazca](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [skupni prikazovalnik obrazcev](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) in [krmilnik oddaj obrazcev](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Obstajajo neomejeni obrazci in izbirna potrditvena polja. Opisi so navadno besedilo. Oddaje hranijo odgovore, vendar pot SMS-a nima evidence privolitev za posamezno kampanjo. | Dodajte konfigurirano kontrolo privolitve za SMS z dejanskimi povezavami do pravilnikov in beleženjem dokazov na strežniku. Splošno potrditveno polje ali članstvo v skupini samodejno ne sme dovoliti SMS-ov. |

[Uporabniška dokumentacija o nastavitvah cerkve](../../b1-admin/settings/church-settings.md#texting) tudi pojasnjuje, da je trenutna zastavica za odjavo deljena z zasebnostjo imenika. Ta povezava je pomembna za izdajo: odgovor START nikoli ne sme spremeniti vidnosti v imeniku.

## Konfiguracija in zasnova poverilnic

Uporabite izrecna, dodatna konfiguracijska polja namesto preobremenjevanja `fromNumber` ali shranjevanja strukturiranih podatkov v nizu API-ključa:

| Polje | Predlagan namen |
|---|---|
| `accountSid` | Identifikator računa/projekta Twilio cerkve (`AC…`) |
| `apiKey`, `apiSecret` | Namenski Twilio API Key SID (`SK…`) in skrivnost za odhodni dostop do API-ja; šifrirana in maskirana |
| `webhookAuthToken` | Auth Token računa, ki ga SDK Twilio uporablja za preverjanje dohodnih podpisov; ločeno šifrirana in maskirana |
| `messagingServiceSid` | Messaging Service cerkve (`MG…`, 34 znakov) |
| `fromNumber` | Izbrana številka, ki podpira SMS, v formatu E.164, preverjena kot pošiljatelj v tem računu ali storitvi |
| Konfiguracija programa | Stabilni ID programa, ime, dovoljeni nameni, URL-ji za prijavo in pravilnike ter različica obvestila |

Twilio [za REST avtentikacijo priporoča API-ključe](https://www.twilio.com/docs/iam/api-keys). Uporabite najožja preizkušena dovoljenja ključa, ki pokrivajo pošiljanje in zahtevane preglede nastavitev samo za branje. Auth Token računa je še vedno potreben za [standardno preverjanje podpisa webhooka Twilio](https://www.twilio.com/docs/usage/security). To razliko pojasnite v vmesniku; skrivnost API-ja ni Auth Token za webhook. Poverilnice hranite izključno v strežniški shrambi nastavitev, nikoli na javnih straneh, v odgovorih obrazcev, v zahtevah za pošiljanje iz brskalnika ali v podpornih zadevah.

Cerkev te vire ustvari in upravlja v Console. Preverjanje v B1 sme samo brati nastavljeno storitev, pošiljatelje in podatke o registraciji. Ne sme kupovati številk, ustvarjati kampanj, spreminjati nastavitev Twilio ali kot stranski učinek poslati testnega sporočila. Za pošiljanje testnega sporočila uporabite ločeno, izrecno dejanje, omejeno na upravičenega prejemnika, ki je privolil.

Masko poverilnic ohranite samo pri urejanju istega shranjenega ponudnika. Preklop na Twilio mora zahtevati lastne poverilnice in počistiti zastarele vrednosti, specifične za ponudnika; maskiranega ključa Clearstream ali Nalo ne smete prenesti v konfiguracijo Twilio.

Vsako nalaganje in posodobitev omejite na prijavljeno cerkev B1. Povratne klice vežite na shranjeno integracijo in pričakovani račun, storitev ter pošiljatelja Twilio ter zavrnite nasprotujoče si dodelitve med različnimi cerkvami. Rotacija poverilnic in prekinitev povezave s ponudnikom morata razveljaviti pripravljenost in začasno ustaviti čakajoča pošiljanja, pri čemer ne smeta izbrisati privolitev ali zgodovinskih zapisov o dostavi.

## Privolitev in izključitev sta obvezno delo pred izdajo

Uvedite zapise naročnin, vezane na telefonsko številko, za program Twilio, ter dogodke privolitve in izključitve, ki jih ni mogoče spreminjati (append-only). Predlagani najmanjši dokazi so: ID cerkve, ID programa, normalizirana telefonska številka, po možnosti preverjena povezava z osebo, dejanje potrditve, ID oddaje ali pregledan zunanji dokaz, časovni žig na strežniku, besedilo in različica obvestila, URL vira, URL-ji pravilnikov ter dogodki preklica in ponovne aktivacije. Dostop in hrambo omejite v skladu z obstoječo politiko varnosti podatkov cerkve.

Uporabite stanja, kot so `unknown`, `pending`, `active` in `suppressed`. Obstoječe mobilne številke, uvožene stike, prisotnost, donacije, članstvo v skupini, `person.optedOut = false` in `allowSms` ne pomenijo izrecne privolitve za program. Uvoz dokumentirane privolitve naj bo dejanje z dovoljenjem, ki se revidira in ima zabeležen vir; migracija ne sme vpisati vseh.

Za začetni spletni tok uporabite standardni javni način obrazca v B1. Dodajte izrecno nastavljeno vprašanje o privolitvi za SMS, ki je na začetku neobkljukano, ostane neobvezno, prikazuje povezave do pravilnikov, na katere je mogoče klikniti, in se preslika v en program ter eno mobilno polje. To preslikavo preverite na strežniku in ob shranjevanju pritrdilnega odgovora shranite prikazano obvestilo. Privolitve nikoli ne izpeljujte iz poljubnih oznak vprašanj, pogovorne umetne inteligence ali članstva v delovnem toku. Pogovorni ekvivalent omogočite šele, ko sta preizkušena izrecna pritrdilna interakcija in beleženje dokazov.

Neobkljukana oddaja ne ustvari naročnine in ne sme preklicati obstoječe privolitve nekoga drugega. Privolitev vežite na oddano telefonsko številko; osebje lahko razreši dvoumne povezave z osebami brez združevanja gospodinjstev. Spremenjena mobilna številka potrebuje lastno privolitev. Pri anonimnih obrazcih uporabite nadzor zlorab in naredite vsako preverjanje lastništva številke ali dvojno potrditev izrecno; sama obkljukana škatlica ne dokazuje, kdo je lastnik telefona. Če uporabite potrditev, naj naročnina ostane v stanju pending, dokler ni dokončana, in ta točen postopek opišite v gradivih za prijavo.

Za Twilio ločite zatiranje SMS-ov od vidnosti v imeniku. Vsako staro odjavo previdno prenesite v zapis o zatiranju; ostale stare prejemnike pustite v stanju `unknown`. Izrecna, dokumentirana nova prijava lahko vzpostavi privolitev za SMS, medtem ko zasebnost v imeniku ostane nespremenjena. Vedenje drugih ponudnikov ohranite, dokler njihove migracije niso ločeno pregledane.

Ob vsakem dejanskem pošiljanju zahtevajte, da je integracija cerkve omogočena oziroma pripravljena, da za točno telefonsko številko obstaja veljavna privolitev za program, da ni zatiranja na ravni številke in da obstaja obstoječe dovoljenje klicatelja. Opomniki dodatno upoštevajo `allowSms`, nastavitve kategorij in tihe ure. Po uvrstitvi v čakalno vrsto ponovno preverite, razrešite polja za združevanje, normalizirajte in preverite številke ter odstranite podvojitve po telefonski številki. STOP zatre vsa pošiljanja za storitev ali program, vključno z ročnimi pošiljanji in delovnimi tokovi; zajeti morajo tudi vsako osebo, ki deli to telefonsko številko.

Ime cerkve in navodilo STOP dosledno prikažite v skupni poti pošiljanja Twilio ter predogledajte končno število SMS-ov oziroma segmentov. Razširitev polj za združevanje in obravnava dolžine morata ohraniti ta elementa; navodila za odjavo ne smete tiho skrajšati. Primeri in dejanske predloge opominkov ter delovnih tokov naj ostanejo usklajeni.

## Pošiljanje, odgovori in stanje dostave prek Twilio

Implementirajte `TwilioProvider.sendMessage` prek Messages API z izbrano Messaging Service in pošiljateljem. Vrnite SID sporočila ponudnika in rezultat „sprejeto/oddano“; HTTP potrditev ni dostava na napravo prejemnika. Skupinsko pošiljanje vrača rezultate za posameznega prejemnika v vrstnem redu vnosa.

Omejite sočasnost odhodnih pošiljanj za **obe** metodi, `sendBulk` in posamična pošiljanja: trenutna veja z zlivanjem polj sproži več klicev `sendMessage` hkrati. Trajno shranite namen pošiljanja in opravila, ki jih je mogoče prevzeti, za skupine, ki se ne morejo prilagoditi proračunu ene zahteve. Ponovno uporabite obstoječi model uvajanja, namesto da bi cerkve morale zagnati še eno storitev. Znane prehodne napake ali napake zaradi omejitve hitrosti ponovno poskusite z zakasnitvami (backoff). Dvoumne časovne omejitve obravnavajte kot neznane izide, ki jih je treba uskladiti, ne kot ukaz za slepo ponovno pošiljanje, ki bi lahko povzročilo podvojena besedila in dodatne stroške.

Nastavite URL-je za dohodne in povratne klice o stanju, specifične za cerkev. Podpis `X-Twilio-Signature` preverite s SDK-jem, točnim konfiguriranim zunanjim URL-jem, izvirnimi parametri obrazca in ustreznim Auth Token računa. Sam skrivni URL ni zadosten. Povratne klice povežite s shranjenimi zapisi cerkve, računa in sporočila; obravnavajte podvojene klice in klice, ki prispejo, preden je rezultat pošiljanja shranjen; preprečite, da bi starejši dogodki prepisali končno stanje. Za dohodno potrditev vrnite prazen TwiML, za dogodke o stanju pa ustrezen uspešen odgovor. [Varnost Twilio](https://www.twilio.com/docs/usage/security), [povratni klici o stanju](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Priporočamo **Advanced Opt-Out** za Messaging Service. Potrditve za STOP, START in HELP upravlja Twilio; B1 uporablja overjene dogodke `OptOutType` brez pošiljanja podvojenih potrditev. STOP takoj zabeleži zatiranje. START obnovi samo znano naročnino na ta isti razkriti program, z novim dogodkom ponovne aktivacije; ne sme vpisati nove osebe v nepovezano sporočanje ali vklopiti nastavitev opominkov. HELP nikogar ne vpiše. Drugi dohodni odgovori ostanejo zunaj obsega nabiralnika B1; cerkve potrebujejo dokumentiran način, kako jih spremljati v Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Poleg dnevnika dostave shranite SID sporočila Twilio, vezavo računa in storitve, čas oddaje, končno stanje ali kodo napake ter čas povratnega klica. Prikažite stanja „v čakalni vrsti/sprejeto“, „dostavljeno“, „neuspelo“, „nedostavljeno“ ali „neznano“ natančno. Ohranite obstoječo pogodbo o odzivu za druge ponudnike in določite, ali skupni uspešni števci pomenijo oddajo ali dostavo.

## Pripravljenost nastavitev in preverjanje odobritve

Pokažite ločene kontrolne točke za poverilnice, lastništvo storitve in pošiljateljev, odobritev kampanje, registracijo številke, preverjanja webhookov in preizkusno sporočilo, ki je bilo dostavljeno. Nikoli ne prikažite enega samega zelenega značka „odobreno“ samo zato, ker poverilnice delujejo.

Za lokalne številke v ZDA preberite [vir kampanje Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) za storitev in zahtevajte, da ima ustrezna kampanja stanje `VERIFIED`. Ločeno preverite, ali je izbrana telefonska številka povezana s to storitvijo in je dokončala registracijo številke: odobrena kampanja lahko še vedno ima čakajočo številko. Kjer podprt bralni API ne izpostavi zahtevanega signala, prikažite **zahtevano ročno preverjanje v Console** in zabeležite datirano potrditev skrbnika cerkve kot takšno; ne označite je kot preverjene prek API-ja. Samodejni dogodki registracije številk so lahko naknadna nadgradnja. [Napake registracije številk](https://www.twilio.com/docs/api/errors/30035), [dogodki registracije A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Pred omogočanjem pošiljanja zahtevajte aktualna preverjanja. Zabeležite, kdaj in kako je bila pripravljenost preverjena, zastarela preverjanja potečejo, pošiljanje pa se ustavi ob preklicanih poverilnicah, spremenjenih pošiljateljih, napakah registracije ali trajnih napakah računa. Uspešna dostava preizkusnega sporočila potrjuje samo preizkušeno pot, ne splošne odobritve s strani operaterjev ali privolitve prejemnika. Spremljajoči osnutek določa predodjemne, predzagonske in tekoče operativne preglede cerkve.

## Repozitorij in načrt izdaje

[Smernice organizacije za prispevke](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) usmerjajo zahteve za funkcije B1 v ChurchAppsSupport, implementacijske PR-je pa v lastniške repozitorije. Uporabite eno osrednjo zahtevo za funkcijo in jo povežite s fokusiranimi implementacijskimi PR-ji:

1. **ChurchAppsSupport:** pregledajte to zasnovo in njen osnutek uvajanja, preden Twilio predstavite kot uporabniško funkcijo.
2. **Packages:** dodajte prilagoditev za Twilio, izrecno skupno konfiguracijo in vmesnike ter prikaz obrazca za privolitev za SMS, kjer ga uporabljata B1Admin in B1App. Vključite changesete in objavite prek obstoječega delovnega toka izdaj, preden posodobite porabnike.
3. **Api:** dodajte aditivne migracije za metapodatke integracij, privolitve in zatiranje ter stanja dostave; implementirajte preverjanje konfiguracije, skupna vrata za pošiljanje, zajemanje dokazov iz obrazcev, obravnavo povratnih klicev in trajno shranjevanje pošiljanj.
4. **B1Admin:** dodajte uporabniški vmesnik za konfiguracijo in pripravljenost Twilio, upravljanje programov in privolitev, shranjevanje pošiljateljev, ki upošteva ponudnika, ter natančno poročanje o dostavi. Pri običajnem urejanju osebe ne izpostavljajte nobenega prepisa privolitve za SMS.
5. **B1App:** preverite javni obrazec in izkušnjo strani s pravilniki glede na skupne kontrole, vključno z anonimnimi in mobilnimi obiskovalci. Ločen brskalniški odjemalec za Twilio ni potreben.
6. **ChurchAppsSupport:** po izdaji spremenite osnutek uvajanja v podprte strani z nastavitvami in pomočjo, dodajte dejanske posnetke zaslona, ju povežite iz nastavitev pošiljanja SMS-ov in uredite prevode.

Najprej uvedite shemo in skupne pakete, šele nato porabnike. Twilio naj ostane omejen s funkcijo za majhen pilotni program s prostovoljno vključitvijo; obstoječi ponudniki morajo še naprej delovati. Vrnitev nazaj onemogoči pošiljanje prek Twilio in prekliče neoddana opravila, pri čemer ohrani odjave in dokaze; ne sme samodejno preklopiti prejemnikov na drugega ponudnika ali pošiljatelja.

## Ocena napora

Načrtovalska ocena za sodelavca, ki pozna ekosistem; pri tej oceni niso bile uporabljene produkcijske poverilnice niti žive SMS-sporočila:

| Delo | Razvijalski dnevi |
|---|---|
| Prilagoditev, razširitve konfiguracije in sheme, uporabniški vmesnik nastavitev | 2–3 |
| Privolitev za telefon/program, ločeno zatiranje, skupna vrata za pošiljanje, integracija javnih obrazcev | 3–5 |
| Podpisani povratni klici, trajno shranjevanje dostave, omejeno/trajno razpošiljanje | 2–3 |
| Uporabniški vmesnik za pripravljenost, vodnik za cerkve, integracijsko in regresijsko testiranje, popravki pilota | 3–4 |
| **Priporočen obseg zagona** | **10–15 skupaj** |

Osnovna prilagoditev/predlog nastavitev je približno 1–2 dni. Ocena samo za pošiljatelja izključuje delo s privolitvijo in uvajanjem, ki je potrebno za to priporočilo. Čas zunanjega pregleda s strani Twilio/operaterjev je ločen in spremenljiv; projekt ne sme obljubljati datuma odobritve ali izida odobritve.

## Merila sprejemljivosti

- [ ] Cerkev je lastnica računa, storitve, registriranega pošiljatelja in kampanje ter plačuje zanje; ni potreben račun Twilio, ki ga upravlja ChurchApps.
- [ ] Poverilnice so šifrirane in maskirane, omejene na najemnika, obnovljive in odsotne iz dnevnikov ali javne vsebine; preverjanje je samo za branje.
- [ ] Neobkljukana neobvezna privolitev prikaže prave povezave do pravilnikov in na strežniku shrani dokaze o programu, telefonski številki in obvestilu; zavrnitev še vedno dovoli glavno dejanje obrazca.
- [ ] Vse ročne, skupinske poti z zlivanjem polj, delovne tokove in opomnike uveljavljajo enako vrata upravičenosti za Twilio. Neznani, nepriviljeni, prejemniki s spremenjeno številko ali zatrti prejemniki so preskočeni z uporabnim razlogom; prikaz po razširitvi ohrani ime cerkve in navodila STOP ter upošteva obravnavo dolžine.
- [ ] Stara zasebnost imenika nikogar ne vpiše v naročnino; STOP in START nikoli ne spremenita vidnosti v imeniku ali nepovezanih nastavitev. Primeri z deljeno telefonsko številko in med različnimi cerkvami so preizkušeni.
- [ ] Podpisani STOP, START in HELP, neveljavni podpisi, napačni računi ali storitve, podvojeni dogodki, ponovljene oddaje obrazcev ter ponarejene preslikave privolitve so pokriti s testi.
- [ ] Velikost skupine, časovne omejitve, omejitve hitrosti, delna odpoved, dvoumni izidi, tekme povratnih klicev in dogodki dostave v napačnem vrstnem redu so preizkušeni brez podvojenih pošiljanj.
- [ ] Odobritev kampanje in dokončana registracija številke sta ločeni od preverjanja poverilnic. Ročni dokazi so jasno označeni; zastarela ali preklicana pripravljenost blokira pošiljanja.
- [ ] Pilotna cerkev preveri svojo stran za prijavo, poti z zavrnjenim in sprejetim obrazcem, točne URL-je pravilnikov ter testnega prejemnika, ki je privolil, skozi oddajo, dostavo, zatiranje ob STOP in dovoljeno ponovno naročnino.
- [ ] Obstoječe nastavitve in vedenje pošiljanja za Clearstream, Text In Church in Nalo prestanejo regresijske preglede; besedilo pomoči jasno ločuje predloge od izdanih funkcij.
