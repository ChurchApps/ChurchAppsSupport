---
title: "Przypisywanie ról"
---

# Przypisywanie ról

<div class="article-intro">

B1 Admin korzysta z systemu uprawnień opartego na rolach, który kontroluje, co każdy użytkownik w Twoim zespole może zobaczyć i zrobić. Przypisując role, możesz dać pracownikom i wolontariuszom dostęp dokładnie do tych obszarów, których potrzebują, i nie więcej. Dobre zarządzanie rolami chroni dane Twojego kościoła i pozwala zespołowi pracować sprawniej.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz dostępu **Domain Admin** lub roli z uprawnieniem do zarządzania **Ustawieniami** w B1 Admin.
- Osoby, którym chcesz przypisać role, muszą już istnieć w Twoim katalogu. Jeśli musisz je najpierw dodać, zobacz [Dodawanie osób](adding-people.md).

</div>

## Zrozumienie ról

Rola to zestaw uprawnień, który przypisujesz jednemu lub kilku użytkownikom. Na przykład możesz utworzyć rolę „Zespół finansowy”, która daje dostęp do [zapisów darowizn](../donations/recording-donations.md), albo rolę „Wolontariusz zameldowań”, która pozwala tylko na dostęp do [funkcji frekwencji](../attendance/check-in.md).

Każda rola kontroluje dostęp do określonych obszarów B1 Admin, w tym:

- **Osoby** – przeglądanie i edytowanie profili członków. Sekcja Notatki w karcie osoby wymaga uprawnienia **Edycja osób**, a osobne uprawnienie **Wyświetlanie poufnych notatek** kontroluje dostęp do sekcji Poufne notatki (na potrzeby duszpasterstwa, historii osobistej i podobnych wrażliwych notatek). **Wyświetlanie tylko imion osób** pozwala wyszukiwać osoby po imieniu (widoczne są tylko imię, zdjęcie i status członkostwa), bez dostępu do pełnego katalogu. W połączeniu z **Wyświetlanie frekwencji** lub **Edycja frekwencji** pozwala wolontariuszowi otworzyć **Grupy** i zobaczyć listy uczestników zajęć po imieniu; z **Edycja frekwencji** może on także [zapisywać frekwencję](../attendance/recording-attendance.md). Zobacz [Osoby – tylko imiona](../settings/roles-permissions.md#people-names-only).
- **Darowizny** – zarządzanie wpłatami i raportami finansowymi. **Wprowadzanie darowizn** to węższa opcja dla zespołów liczących ofiary: pozwala wprowadzać dary, ale tylko w [partiach](../donations/batches.md#who-can-change-a-batch), które są nadal otwarte.
- **Frekwencja** – zapisywanie i przeglądanie danych o frekwencji
- **Formularze** – tworzenie i zarządzanie [formularzami niestandardowymi](../forms/creating-forms.md)
- **Grupy** – zarządzanie [członkostwem w grupach](../groups/group-members.md) i kalendarzami
- **Ustawienia** – konfigurowanie ustawień obowiązujących w całym kościele

:::warning
**Domain Admin** ma pełny dostęp do każdego obszaru B1 Admin. Jego uprawnień nie można edytować ani ograniczać. Tej roli używaj tylko dla swoich głównych administratorów.
:::

## Przeglądanie i zarządzanie rolami

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu B1 Admin) i rozwiń **Ustawienia**.
2. Kliknij **Role**.
3. Zobaczysz listę wszystkich ról skonfigurowanych dla Twojego kościoła, z kolumną **Członkowie** pokazującą, ilu użytkowników należy do każdej roli.
4. Kliknij dowolną rolę, aby zobaczyć jej członków i uprawnienia.

## Dodawanie użytkowników do roli

1. W menu Jump wybierz **Ustawienia > Role**.
2. Kliknij rolę, do której chcesz dodać użytkownika.
3. W sekcji **Członkowie** wyszukaj osobę po imieniu.
4. Kliknij **Dodaj**, aby przypisać ją do roli.

Użytkownik będzie miał wszystkie uprawnienia związane z tą rolą przy następnym zalogowaniu.

## Edycja uprawnień roli

1. W menu Jump wybierz **Ustawienia > Role**.
2. Kliknij rolę, którą chcesz zmienić.
3. W sekcji **Uprawnienia** zaznacz lub odznacz obszary, do których rola ma mieć dostęp. Każda grupa uprawnień pokazuje, ile jej uprawnień jest zaznaczonych (na przykład **2 z 5**).
4. Każda zmiana zapisuje się od razu po zaznaczeniu lub odznaczeniu pola.

:::tip
Stosuj zasadę najmniejszych uprawnień – przydzielaj każdej roli tylko te uprawnienia, których naprawdę potrzebuje. Dzięki temu dane są bezpieczne, a ryzyko przypadkowych zmian maleje.
:::

## Typowe przykłady ról

- **Pracownicy biura** – dostęp do Osób, Darowizn, Frekwencji i Formularzy
- **Liderzy grup** – dostęp tylko do [Grup](../groups/creating-groups.md)
- **Wolontariusze zameldowań** – uprawnienie frekwencji **Zameldowanie**, którego potrzebuje konto zalogowane na [kiosku zameldowań](../attendance/check-in.md)
- **Zespół finansowy** – dostęp do [Darowizn](../donations/recording-donations.md) i raportów
- **Zespół liczący ofiary** – **Wprowadzanie darowizn** i **Wyświetlanie darowizn**, aby wolontariusze mogli wprowadzać ofiary do otwartych partii bez wglądu w podsumowania wpłat

Zobacz [Role i uprawnienia](../settings/roles-permissions.md), aby poznać bliżej uprawnienia dotyczące darowizn i osób.
