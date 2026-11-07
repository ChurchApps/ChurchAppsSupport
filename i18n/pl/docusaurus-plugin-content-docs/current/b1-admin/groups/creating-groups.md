---
title: "Tworzenie grup"
---

# Tworzenie grup

<div class="article-intro">

Utworzenie grupy w B1 Admin jest proste. Skonfigurujesz kategorię, nadasz grupie nazwę, a następnie ustawisz jej opcje. Grupy pomagają zorganizować Kościół w znaczące jednostki, takie jak małe grupy, komitety i klasy.

</div>

## Film szkoleniowy

<YouTube id="uG93pXVreNo" title="Tworzenie grup i dodawanie członków w B1" next="Prośby o dołączenie do grupy i kalendarze grup w B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz aktywnego konta B1 Admin z uprawnieniami do zarządzania grupami. Jeśli nie masz pewności co do swojego poziomu dostępu, zobacz [Role i uprawnienia](../people/roles-permissions.md).
- Zastanów się nad strukturą kategorii dla swoich grup (na przykład „Małe grupy", „Służby", „Komitety"). Kategorie pomagają utrzymać powiązane grupy w porządku.

</div>

## Dodawanie nowej grupy

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu B1 Admin), rozwiń **People** i kliknij **Groups**.
2. Kliknij **Add Group** w nagłówku strony. Poniżej listy otworzy się formularz **New Group**. Wpisz **Category Name**. Kategorie pomagają grupować powiązane grupy (na przykład „Małe grupy", „Służby" lub „Komitety"). Jeśli kategoria już istnieje, możesz wybrać ją z listy.
3. Wpisz **Name** grupy.
4. Kliknij **Add**. Nowa grupa pojawi się na liście, a jej kategoria będzie widoczna pod nazwą.

## Konfigurowanie ustawień grupy

Gdy grupa zostanie utworzona, możesz uzupełnić dodatkowe szczegóły:

1. Kliknij **nazwę grupy** na liście, aby ją otworzyć.
2. Kliknij przycisk **Edit** po lewej stronie strony grupy, poniżej szczegółów grupy.
3. Skonfiguruj następujące opcje:
   - **Description** -- Krótkie podsumowanie tematyki grupy. Jest widoczne dla członków.
   - **Meeting Times** -- Kiedy grupa zwykle się spotyka (na przykład „Środy o 19:00").
   - **Join Policy** -- Wybierz, kto może dołączyć do tej grupy:
     - **Open** -- Każdy może dołączyć od razu, bez zatwierdzenia
     - **Request** -- Osoby muszą złożyć prośbę o dołączenie, która wymaga zatwierdzenia (zobacz [Prośby o dołączenie do grupy](./group-join-requests.md))
     - **Closed** -- Członkowie muszą być dodawani ręcznie przez liderów lub administratorów
   - **Labels** -- Przypisz grupie jedną lub więcej opisowych etykiet (na przykład „Stacjonarnie", „Online", „Witamy nowych członków"). Etykiety to dowolne znaczniki, które sam definiujesz; zaznacz wszystkie, które mają zastosowanie. Etykiet można używać do filtrowania grup w elemencie strony Groups Browser.
   - **Confidential group** -- Ukrywa tę grupę i jej listę członków przed stronami publicznymi, wyszukiwarką grup i osobami spoza grupy. Używaj tej opcji dla wrażliwych grup, takich jak służba odzyskiwania czy poradnictwa; widzieć ją mogą tylko członkowie grupy i pracownicy kościoła.
   - **Discussions** -- Włącza lub wyłącza czat grupy, na którym każdy członek może pisać. Domyślnie włączone.
   - **Announcements** -- Włącza drugi czat, dostępny tylko dla liderów -- członkowie mogą czytać i reagować, ale pisać mogą wyłącznie liderzy. Domyślnie włączone.
   - **Attendance Tracking** -- Włącz tę opcję, jeśli chcesz rejestrować [frekwencję](../attendance/tracking-attendance.md) w tej grupie.
   - **Service Times** -- Powiąż grupę z określonymi godzinami nabożeństw, jeśli dotyczy. Szczegóły dotyczące godzin nabożeństw znajdziesz w artykule [Konfiguracja frekwencji](../attendance/setup.md).
4. Kliknij **Save**, aby zastosować zmiany.

:::tip
Jasny opis i godzina spotkań pomagają członkom wiedzieć, czego się spodziewać po dołączeniu do grupy.
:::

:::info
Wyłączenie zarówno Discussions, jak i Announcements usuwa całkowicie zakładkę Messages z grupy w portalu członka. Wyłączenie tylko jednej z opcji ukrywa jej zakładkę; członkowie są przenoszeni do tego czatu, który pozostaje włączony. Istniejące wiadomości są zachowane w obu przypadkach -- przełączniki kontrolują jedynie możliwość pisania nowych wiadomości.
:::

## Duplikowanie grupy

Rozpoczynasz nową edycję cyklicznych zajęć lub służby? Zamiast ponownie wprowadzać wszystkie ustawienia, zduplikuj istniejącą grupę:

1. Otwórz grupę i kliknij **Duplicate** (poniżej przycisku **Edit** po lewej stronie strony grupy).
2. Potwierdź duplikowanie.

Kopia przejmuje ustawienia oryginału -- kategorię, opis, czas i miejsce spotkań, zasady dołączania, etykiety oraz kampus -- ale **nie** jego członków. Nowa grupa otrzymuje nazwę oryginału z dopiskiem „ (Copy)"; zmień ją w ustawieniach grupy.

## Archiwizowanie grupy

Gdy grupa nie jest już aktywna, ale chcesz zachować jej historię zamiast ją usuwać:

1. Otwórz grupę i kliknij **Edit**, aby edytować jej ustawienia.
2. Kliknij **Archive** i potwierdź.

Zarchiwizowane grupy znikają z głównej listy Groups. Aby je odnaleźć, kliknij przycisk **Show archived** obok przycisków kategorii na górze strony Groups, a następnie kliknij **Restore** obok grupy, aby ją przywrócić.

:::info
Archiwizacja grupy nie usuwa jej członków, historii frekwencji ani wydarzeń w kalendarzu -- jedynie ukrywa grupę na domyślnej liście, dopóki jej nie przywrócisz.
:::

## Następne kroki

Po utworzeniu i skonfigurowaniu grupy możesz:

- **Dodać członków** -- Wyszukaj osoby i dodaj je do grupy. Użyj ikony gwiazdki (**Make Leader**), aby wyznaczyć liderów grupy. Zobacz [Członkowie grupy](./group-members.md).
- **Skonfigurować kalendarz** -- Twórz wydarzenia i cykliczne spotkania dla grupy. Zobacz [Kalendarz grupy](./group-calendar.md).
- **Komunikować się** -- Wysyłaj wiadomości do wszystkich członków grupy bezpośrednio ze strony grupy.
- **Eksportować dane** -- Kliknij **Export** nad listą członków grupy, aby ją pobrać.

:::info
Każda grupa należy do kategorii, a na głównej stronie Groups możesz filtrować listę według kategorii. Kategorie możesz w każdej chwili przestawiać lub zmieniać ich nazwy wraz z rozwojem Kościoła.
:::
