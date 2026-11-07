---
title: "Protokol auditu"
---

# Protokol auditu

<div class="article-intro">

Protokol auditu eviduje všechny významné akce a změny v celém vašem systému pro správu sboru. Použijte jej k přezkoumání aktivity přihlášení, ke sledování, kdo provedl změny v záznamech osob, k monitorování aktualizací oprávnění a k udržení odpovědnosti v celém vašem týmu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet B1 Admin s přístupem správce serveru
- Přejděte do **Nastavení**, kde najdete protokol auditu

</div>

## Zobrazení protokolu auditu

1. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu aplikace B1 Admin) a rozbalte **Nastavení**.
2. Klikněte na **Protokol auditu**.
3. Protokol zobrazí nedávné záznamy v tabulce s těmito sloupci:
   - **Datum** -- Kdy se akce stala.
   - **Kategorie** -- Typ akce (barevně odlišeno pro rychlou orientaci).
   - **Akce** -- Co bylo provedeno (např. create, update, delete, login_success).
   - **Entita** -- Typ a ID záznamu, kterého se akce dotkla.
   - **IP adresa** -- IP adresa uživatele, který akci provedl.
   - **Podrobnosti** -- Shrnutí konkrétních provedených změn.

## Filtrování protokolu

Použijte filtry v horní části stránky k zúžení výsledků:

- **Kategorie** -- Filtrování podle typu akce:
  - **Všechny kategorie** -- Zobrazit vše.
  - **Přihlášení** -- Úspěšná a neúspěšná přihlášení.
  - **Osoby** -- Vytváření, úprava nebo mazání záznamů osob.
  - **Oprávnění** -- Udělování a odebírání oprávnění.
  - **Dary** -- Změny záznamů darů.
  - **Skupiny** -- Akce související se správou skupin.
  - **Formuláře** -- Aktivita odeslání formulářů.
  - **Nastavení** -- Změny konfigurace.
- **Datum od** -- Zobrazit záznamy od tohoto data dál.
- **Datum do** -- Zobrazit záznamy až do tohoto data.

Po nastavení filtrů klikněte na **Hledat** a aktualizujte výsledky.

## Pochopení kategorií

Každá kategorie je barevně odlišena pro rychlou identifikaci:

- **Přihlášení** -- Modrý štítek. Eviduje úspěšné i neúspěšné pokusy o přihlášení.
- **Osoby** -- Fialový štítek. Eviduje vytváření, úpravy a mazání záznamů osob.
- **Oprávnění** -- Červený štítek. Eviduje, kdy jsou přístupová práva udělena nebo odebrána.
- **Dary** -- Zelený štítek. Eviduje změny záznamů darů.
- **Skupiny** -- Šedý štítek. Eviduje operace správy skupin.
- **Formuláře** -- Oranžový štítek. Eviduje aktivitu odeslání formulářů.
- **Nastavení** -- Žlutý štítek. Eviduje změny konfigurace.

## Export protokolu

Když jsou zobrazeny záznamy protokolu, objeví se tlačítko pro **stažení CSV**. Kliknutím exportujete aktuálně filtrované výsledky do tabulky pro offline kontrolu nebo vedení evidence.

## Stránkování

Pro procházení výsledků použijte ovládací prvky stránkování pod tabulkou. Na stránku můžete zobrazit 25, 50 nebo 100 záznamů.

:::info
Záznamy auditního protokolu se automaticky uchovávají po dobu jednoho roku. Záznamy starší než 365 dní jsou odstraněny, aby systém zůstal výkonný.
:::

:::tip
Protokol auditu pravidelně kontrolujte, zejména po zaškolení nových členů týmu nebo při významných změnách konfigurace. Pomáhá včas odhalit neočekávanou aktivitu.
:::

## Související články

- [Role a oprávnění](../settings/roles-permissions) -- Správa toho, kdo má k čemu přístup
- [Zabezpečení dat](../settings/data-security) -- Pochopení způsobu ochrany vašich dat
- [Přehled sestav](./index.md) -- Zobrazení všech dostupných sestav
