---
title: "Posouzení rizik přenosu"
description: "Záznam shody ChurchApps pro přenosy dat církví z UK/EHP do USA v B1 Admin, včetně záruk, subdodavatelů a řízení přístupu."
---

# Posouzení rizik přenosu

<div class="article-intro">

Tento dokument zaznamenává posouzení rizik společnosti ChurchApps spojených s mezinárodními přenosy osobních údajů z Velké Británie a EHP do Spojených států, jak to vyžaduje britské GDPR a evropské GDPR. Jde o interní záznam o dodržování předpisů, který vede společnost ChurchApps jako zpracovatel údajů.

</div>

**Naposledy přezkoumáno:** duben 2026

## 1. Podrobnosti o přenosu

| Položka | Podrobnosti |
|---|---|
| **Vyvážející subjekt (exportér)** | Církve používající ChurchApps (správci údajů) se sídlem ve Velké Británii nebo EHP |
| **Dovážející subjekt (importér)** | ChurchApps (zpracovatel údajů) působící ze Spojených států |
| **Kategorie subjektů údajů** | Členové církve, návštěvníci, hosté, dárci, dobrovolníci, děti (spravované rodiči nebo administrátory) |
| **Kategorie osobních údajů** | Jména, e-mailové adresy, telefonní čísla, poštovní adresy, data narození, pohlaví, rodinný stav, profilové fotografie, záznamy o darech, záznamy o docházce, členství ve skupinách, přiřazení dobrovolníků, historie zpráv |
| **Citlivé údaje** | Nejsou záměrně shromažďovány. Nejsou uchovávány zdravotní údaje, biometrické údaje ani údaje o trestné činnosti. Údaje o finančních účtech (kreditní karty, bankovní účty) nikdy neukládá společnost ChurchApps, protože je zpracovává přímo Stripe. |
| **Účel přenosu** | Poskytování softwarových služeb pro správu církve (správa členů, dary, sledování docházky, komunikace, plánování dobrovolníků, registrace na akce) |
| **Cílová země** | Spojené státy |
| **Mechanismus přenosu** | Standardní smluvní doložky EU (SCC) a Dodatek o mezinárodním přenosu údajů Spojeného království (IDTA), začleněné prostřednictvím Dodatku o zpracování údajů AWS |

## 2. Subzpracovatelé

| Subzpracovatel | Role | Umístění | Mechanismus přenosu |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hostování infrastruktury, ukládání dat, doručování obsahu (oblast us-east-2) | Spojené státy | DPA AWS se SCC (automaticky zahrnuto v podmínkách služeb AWS) |
| **Stripe** | Zpracování plateb za dary | Spojené státy | DPA Stripe se SCC |

Údaje o kreditních kartách a bankovních účtech se přenášejí přímo z prohlížeče uživatele do Stripe a nikdy nejsou ukládány na serverech společnosti ChurchApps ani jimi neprocházejí.

## 3. Posouzení rizik

### 3.1 Šifrování

- **Při přenosu:** Veškerá data jsou šifrována pomocí TLS/HTTPS pro veškerou komunikaci mezi uživateli a servery ChurchApps.
- **V klidu:** Data uložená na AWS jsou šifrována v klidu pomocí šifrování spravovaného AWS.

### 3.2 Řízení přístupu

- Přístup k produkčním serverům je omezen na dvě osoby, které jsou členy správní rady společnosti ChurchApps.
- Vývojáři, dobrovolníci a ostatní členové správní rady nemají přístup k produkčním serverům ani databázím.
- Databázové servery jsou za firewallem a nejsou přímo přístupné z internetu.
- Údaje jednotlivých církví jsou logicky odděleny. Každá církev může přistupovat pouze ke svým vlastním údajům prostřednictvím řízení přístupu na úrovni aplikace.

### 3.3 Oddělení údajů

Údaje jsou rozděleny do šesti nezávislých databází (Membership, Giving, Attendance, Messaging, Doing, Content). Kompromitace jedné databáze neodhalí údaje z ostatních. Například databáze Giving obsahuje částky a data darů, ale neobsahuje jména ani kontaktní údaje dárců, které jsou uloženy v databázi Membership.

### 3.4 Minimalizace údajů

- Nejsou ukládány informace o kreditních kartách ani bankovních účtech (zpracovává Stripe).
- Hesla jsou ukládána pomocí jednosměrného hašování a nelze je získat zpět.
- Církve řídí, jaké údaje o svých členech shromažďují.

### 3.5 Práva subjektů údajů

Společnost ChurchApps poskytuje technické nástroje, které církvím umožňují plnit žádosti subjektů údajů:

- **Přístup a přenositelnost:** Úplný export údajů ve strojově čitelném formátu JSON.
- **Výmaz:** Anonymizace napříč všemi šesti databázemi, při níž jsou osobní údaje nahrazeny obecnými hodnotami a zachovány souhrnné záznamy vyžadované pro finanční vykazování.
- **Omezení:** Stav neaktivního členství vylučuje jednotlivce z vyhledávání, adresáře, přehledů a zpráv, přičemž jejich záznam zůstává zachován.
- **Oprava:** Členové a administrátoři mohou upravovat osobní údaje prostřednictvím aplikace.

### 3.6 Oznamování porušení

Společnost ChurchApps se zavazuje informovat dotčené církve do 72 hodin od okamžiku, kdy se dozví o porušení ochrany osobních údajů, jak je uvedeno v [Podmínkách služby](https://churchapps.org/terms) (článek 11.6).

### 3.7 Riziko přístupu vládních orgánů USA

Hlavním rizikem spojeným s údaji hostovanými v USA je potenciální přístup amerických vládních orgánů podle oddílu 702 FISA nebo výkonného nařízení 12333. Toto riziko je posouzeno jako **nízké** z následujících důvodů:

- Společnost ChurchApps zpracovává údaje o členství a docházce v církvi, nikoli údaje se zpravodajskou hodnotou.
- Subjekty údajů jsou členové církve a návštěvníci. Nejde o kategorie, na které jsou sledovací programy obvykle zaměřeny.
- Nejsou uchovávány žádné citlivé osobní údaje (zdravotní údaje, údaje o finančních účtech, politické názory).
- DPA AWS obsahuje závazky týkající se žádostí vládních orgánů o přístup a zpráv o transparentnosti.
- Rámec EU-USA pro ochranu údajů (zavedený v roce 2023) poskytuje další záruky pro přenosy údajů certifikovaným americkým organizacím.

## 4. Celkový závěr o riziku

Riziko pro subjekty údajů z tohoto mezinárodního přenosu je posouzeno jako **nízké**. Kombinace:

- Standardních smluvních doložek jako právního mechanismu přenosu
- Šifrování při přenosu i v klidu
- Přísného řízení přístupu, kde mají oprávnění pouze dvě osoby
- Oddělení údajů do nezávislých databází
- Neukládání údajů o finančních účtech
- Nízké citlivosti a nízké zpravodajské hodnoty zpracovávaných údajů
- Technických nástrojů pro výkon všech práv subjektů údajů

poskytuje přiměřená doplňková opatření, která zajišťují, že přenesené údaje požívají úroveň ochrany v podstatě rovnocennou té, která je zaručena ve Velké Británii a EHP.

## 5. Harmonogram přezkumu

Toto posouzení bude přezkoumáváno každoročně nebo při podstatné změně zpracování údajů, subzpracovatelů nebo právního rámce upravujícího mezinárodní přenosy údajů.
