---
title: "Úkoly"
---

# Úkoly

<div class="article-intro">

Úkoly umožňují přiřazovat akční položky lidem nebo skupinám ve vašem sboru. Ať už jde o jednorázový úkol, nebo o opakující se povinnost, úkoly pomáhají sledovat, co je třeba udělat a kdo za to odpovídá, aby nic nezůstalo nepovšimnuto.

</div>

<div class="prereqs">
<h4>Před začátkem</h4>

- Ujistěte se, že lidé nebo [skupiny](../groups/creating-groups.md), kterým chcete úkoly přiřadit, existují v B1 Admin
- V [nabídce Jump](../introduction.md#getting-around-with-the-jump-menu) vyberte **Služba > Moje práce**, kde uvidíte úkoly

</div>

## Zobrazení úkolů

V nabídce Jump vyberte **Služba > Moje práce** (nebo vyhledejte „Moje práce“). Seznam **Úkoly** zobrazuje název každého úkolu, osobu nebo skupinu, ke které se vztahuje, komu je přiřazen, kdy byl otevřen, a jeho stav. Vaše [pracovní postupy](./workflows.md) se zobrazují vedle něj pod **Moje karty**. Příjemci mohou své karty a otevřené úkoly zobrazit a zpracovávat také na obrazovce **Já** v aplikaci B1.

Pomocí záložek nad seznamem přepínejte mezi úkoly **Přiřazené mně**, **Přiřazené mým skupinám** a **Zadané mnou**. Každá záložka ukazuje, kolik úkolů obsahuje.

:::tip
Ve výchozím nastavení se zobrazují pouze otevřené úkoly. Pro zobrazení dokončených úkolů vyberte nad seznamem **Uzavřené**.
:::

## Vytvoření úkolu

1. Na stránce **Moje práce** klikněte na **Přidat úkol**. Otevře se formulář **Nový úkol**.
2. Volitelně klikněte do pole **Souvisí s** a vyberte osobu nebo skupinu, které se úkol týká. Pokud jde o obecný úkol, například připomínku pro sebe, pole nechte prázdné.
3. Klikněte do pole **Přiřadit komu**. V okně **Vyberte osobu nebo skupinu** vyhledejte na záložce **Osoba**, nebo přepněte na záložku **Skupina**, vyhledejte skupinu a výsledek vyberte.
4. Zadejte **Název** úkolu.
5. Volitelně vyberte **Termín**.
6. Přidejte **Poznámky** s podrobnostmi nebo pokyny pro příjemce.
7. Klikněte na **Uložit**.

Úkol se nyní zobrazí v seznamu úkolů a příjemce ho uvidí na svém přehledu a v mobilní aplikaci.

## Správa úkolu

Klikněte na libovolný úkol a otevřete jeho detailní stránku. Odtud můžete:

- **Uzavřít nebo znovu otevřít úkol** -- Až bude práce hotová, klikněte na **Uzavřít úkol**. Pro opětovné otevření klikněte na **Znovu otevřít úkol**.
- **Přiřadit úkol jinak** -- Klikněte na **Přiřadit** a vyberte jinou osobu nebo skupinu.
- **Změnit, koho se úkol týká** -- Klikněte na **Souvisí s** a vyberte jinou osobu nebo skupinu, nebo zvolte **Žádná osoba ani skupina** a údaj vymažte.
- **Změnit termín** -- Vyberte datum v poli **Termín**; uloží se, když kliknete mimo pole. (Úkoly vytvořené pro [potvrzení přiřazení ke službě](./workflows.md#serving-assignment-confirmations) zobrazují termín, ale zde ho nelze změnit.)
- **Přidat poznámky** -- Do poznámek úkolu zapište aktualizace nebo podrobnosti pro příjemce.
- **Nastavit připomínky** -- Viz [Připomínky úkolů](#task-reminders) níže.

## Připomínky úkolů

Úkol s termínem může příjemce upozornit ještě před jeho splněním.

1. Na stránce úkolu klikněte u **Připomínky** na **Upravit**.
2. Zapněte **Odesílat připomínky k tomuto úkolu**.
3. V části **Kdy mají připomínky odejít?** vyberte až tři časy: **7 dní předem**, **3 dny předem**, **1 den předem**, nebo **V den termínu**.
4. Nastavte **Denní čas** a volitelně **Zprávu**.
5. V části **Odeslat pomocí** vyberte **Push**, **E-mail** a, pokud má váš sbor připojeného [poskytovatele SMS](../settings/church-settings.md#texting), také **SMS**.
6. Klikněte na **Uložit připomínky**.

Pokud úkol nemá termín, B1 vás upozorní, že se žádné připomínky neodešlou, dokud nebude termín nastaven v poli **Termín**. Připomínky v SMS dorazí pouze lidem, kteří zapnuli **Textové zprávy** v [předvolbách oznámení](../../b1-church/getting-started/notification-preferences.md), a každá SMS může sboru stát peníze.

## Životní cyklus úkolu

1. Nový úkol začíná se stavem **Otevřený**.
2. Příjemce dostane oznámení a může úkol zobrazit na svém přehledu, v **Služba > Moje práce**, nebo v mobilní aplikaci.
3. Jakmile je práce hotová, příjemce (nebo správce) klikne na **Uzavřít úkol**.
4. Uzavřené úkoly se ve výchozím zobrazení skryjí, ale lze je najít výběrem **Uzavřené** nad seznamem úkolů.

:::info
B1 Admin již nevytváří opakující se úkoly podle plánu. Pro opakované sledování lidí použijte [pracovní postup](./workflows.md) se [spouštěčem podle plánu](./workflows.md#schedule-triggers).
:::

:::tip
Když potřebujete provést mnoho lidí stejnými fázemi -- například sledováním nových návštěvníků nebo procesem členství -- použijte [Pracovní postupy](./workflows.md). Pracovní postupy převádějí úkoly na karty na tabuli s přetahováním, s kroky, termíny a směrováním.
:::

:::info
Některé úkoly vytvářejí automaticky jiné části B1 a místo standardního zobrazení poznámky a přiřazení se otevírají na speciální kartě ke kontrole -- [žádosti o připojení ke skupině](../groups/group-join-requests.md#approving-from-the-tasks-page), [žádosti o změnu profilu](../profile/approving-profile-changes.md) a [žádosti o smazání účtu](../profile/account-deletion.md) fungují stejným způsobem.
:::

## Další kroky

- Projděte více kroky procesu pomocí [Pracovních postupů](./workflows.md)
- Používejte [Pracovní postupy](./workflows.md) k automatickému průchodu opakujícími se procesy
- Používejte úkoly spolu s [Plány bohoslužeb](./plans.md) ke sledování úkolů při přípravě bohoslužby
