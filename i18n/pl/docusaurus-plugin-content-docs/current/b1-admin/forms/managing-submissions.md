---
title: "Správa odeslaných formulářů"
---

Hmm, wait. I'm supposed to output Polish, not Czech. Let me redo that properly.

---
title: "Zarządzanie zgłoszeniami"
---

# Zarządzanie zgłoszeniami

<div class="article-intro">

Gdy formularz jest już aktywny, zaczną napływać zgłoszenia. Zakładka **Zgłoszenia formularza** pozwala przeglądać każdą odpowiedź, sprawdzać, kto już wysłał formularz, i wykorzystywać te dane, aby na bieżąco kontaktować się z członkami zboru.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- [Utwórz formularz](./creating-forms.md) z co najmniej jednym pytaniem
- Udostępnij formularz za pomocą jego publicznego adresu URL lub osadź go na swojej [stronie internetowej](../website/managing-pages.md)

</div>

## Przeglądanie zgłoszeń

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu B1 Admin), rozwiń **People** i kliknij **Forms**.
2. Kliknij formularz, który chcesz przejrzeć.
3. Przejdź do zakładki **Zgłoszenia formularza**.

Zobaczysz listę wszystkich odpowiedzi otrzymanych dla tego formularza. Każde zgłoszenie pokazuje dane osoby, która je wysłała, oraz datę wysłania, a następnie osobną kolumnę dla każdego pytania w formularzu. Jeśli formularz zawiera wiele pytań, przewiń tabelę w bok, aby zobaczyć pozostałe kolumny.

## Przeglądanie pojedynczych zgłoszeń

Kliknij dowolne zgłoszenie, aby zobaczyć pełne szczegóły. Zobaczysz wszystkie odpowiedzi udzielone przez tę osobę na każde pytanie w formularzu.

Kliknij **ikonę drukarki** obok zgłoszenia, aby wydrukować wypełnione odpowiedzi tej osoby. Jest to przydatne, gdy potrzebujesz papierowej dokumentacji lub podpisanej zgody, którą musisz mieć pod ręką. Wydruk pokazuje logo zboru (**logo do jasnego tła** z [Witryna > Wygląd](../website/appearance.md), jeśli je przesłałeś), wyśrodkowane u góry, a pod nim nazwę zboru. Wydruki zawsze mają ciemny tekst na białym tle, nawet jeśli korzystasz z trybu ciemnego w B1 Admin. Ta funkcja różni się od [drukowania pustego formularza](./creating-forms.md#printing-a-blank-form); drukuje ona odpowiedzi jednej osoby, które już zostały wysłane, a nie pusty egzemplarz. Ikona drukarki pojawia się także w każdym miejscu, gdzie wyświetlane jest zgłoszenie, w tym na [profilu osoby](../people/adding-people.md#working-with-forms).

## Zmiana osoby przypisanej do zgłoszenia

Jeśli zgłoszenie jest połączone z niewłaściwą osobą — na przykład dwoje członków rodziny ma ten sam adres e-mail — możesz przenieść je do właściwej osoby lub je odłączyć.

1. Na zakładce **Zgłoszenia formularza** kliknij ikonę **Zmień osobę** (dwie strzałki) obok nazwiska osoby. Ta sama ikona pojawia się obok zgłoszenia na [profilu osoby](../people/adding-people.md#working-with-forms).
2. W oknie **Zmień osobę** wyszukaj właściwą osobę i kliknij **Przenieś do tej osoby**.
3. Możesz też kliknąć **Odłącz (Anonimowe)**, aby odłączyć zgłoszenie od jakiejkolwiek osoby. Będzie ono wtedy wyświetlane jako **Anonimowe**.

Zmienia się wyłącznie powiązanie. Odpowiedzi pozostają bez zmian i nie są ponownie wysyłane e-maile z potwierdzeniem.

:::info
W przypadku formularzy ustawionych tak, aby tworzyć rekord osoby, jeśli osoba jest zalogowana na stronie zboru w chwili wysyłania, zgłoszenie zostaje połączone z jej własnym rekordem, nawet jeśli inna osoba w bazie danych ma ten sam adres e-mail. Gdy [scalisz dwa rekordy osób](../people/adding-people.md), zgłoszenia formularzy usuniętej osoby zostaną przeniesione do osoby, którą zachowujesz.
:::

## Jak zbierane są zgłoszenia

Zgłoszenia mogą napływać na kilka sposobów:

- **Publiczny adres URL** — jeśli formularz ma publiczny adres URL (formularze Stand Alone), każdy posiadający link może wysłać odpowiedź. Udostępniaj adres URL e-mailem, w mediach społecznościowych lub w wiadomościach tekstowych.
- **Osadzony na stronie internetowej** — formularze osadzone na Twojej stronie B1 zbierają zgłoszenia automatycznie, gdy odwiedzający je wypełnią.
- **Użytek wewnętrzny** — personel i wolontariusze mogą również wysyłać formularze w imieniu innych osób bezpośrednio w B1 Admin.

:::tip
Regularnie sprawdzaj zakładkę **Zgłoszenia formularza** w przypadku formularzy takich jak karty odwiedzających czy prośby o modlitwę, aby móc szybko się z nimi skontaktować.
:::

## Wykorzystanie danych ze zgłoszeń

Dane zebrane za pomocą formularzy mogą pomóc Ci:

- śledzić zapisy na wydarzenia i odpowiednio je planować,
- kontaktować się z odwiedzającymi lub nowymi członkami,
- zbierać opinie z ankiet na potrzeby planowania służb,
- przetwarzać płatności za wydarzenia lub programy.

:::info
Członkowie formularza z rolą **Administrator** lub **Tylko podgląd** mogą uzyskać dostęp do zakładki **Zgłoszenia formularza**. Upewnij się, że odpowiedni członkowie zespołu mają dostęp do formularzy, których potrzebują, zarządzając rolami na zakładce **Członkowie formularza**.
:::

:::info
Jeśli formularz Stand Alone jest [powiązany z grupą](./creating-forms.md#linking-a-form-to-a-group), liderzy tej grupy mogą czytać i drukować jego zgłoszenia ze strony grupy na B1.church, bez bycia członkami formularza. Liderzy mogą tam również czytać odpowiedzi na pytania rejestracyjne dotyczące wydarzeń ich grupy. Zobacz [Szczegóły grupy](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Jeśli formularz **Stand Alone** jest ustawiony tak, aby tworzyć rekord osoby, wszystkie zgłoszenia dopasowane do istniejącej osoby pojawiają się również w sekcji **Formularze** na stronie tej osoby w People — nie tylko w formularzach typu People.
:::

## Następne kroki

- Dowiedz się, jak tworzyć i dostosowywać formularze, w artykule [Tworzenie formularzy](./creating-forms.md)
- Dodawaj osoby ze zgłoszeń formularzy do [katalogu osób](../people/adding-people.md), aby kontynuować kontakt
- [Powiąż formularz z grupą](./creating-forms.md#linking-a-form-to-a-group), aby jej liderzy mogli czytać odpowiedzi, lub [automatycznie dodawaj osoby zgłaszające się do grupy](./creating-forms.md#automatically-adding-submitters-to-a-group), aby formularz zapisów Stand Alone sam budował listę uczestników
