---
title: "Tworzenie formularzy"
---

# Tworzenie formularzy

<div class="article-intro">

Twórz własne formularze, aby zbierać informacje od członków zboru. Możesz tworzyć formularze do rejestracji na wydarzenia, ankiety, karty odwiedzających, wnioski o członkostwo i inne. Formularze mogą być powiązane z osobami w bazie danych lub używane jako samodzielne strony z własnym publicznym adresem URL.

</div>

## Film szkoleniowy

<YouTube id="sr9wxEj9ghQ" title="Tworzenie formularzy i zarządzanie zgłoszeniami w B1" next="Uruchamianie strony internetowej zboru w B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Aby tworzyć formularze **Osoby** (powiązane z kartotekami osób), najpierw potrzebujesz [osób w bazie danych](../people/adding-people.md).
- Aby zbierać **płatności** w formularzach, musisz najpierw skonfigurować [Stripe do darowizn online](../donations/online-giving-setup.md).

</div>

## Tworzenie nowego formularza

1. Otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu B1 Admin), rozwiń **Osoby** i kliknij **Formularze**.
2. Kliknij **Dodaj formularz**.
3. Wpisz **nazwę** formularza.
4. Wybierz typ formularza z listy rozwijanej **Powiązany z**:
   - **Osoby** — Łączy zgłoszenia z [kartotekami osób](../people/adding-people.md) w bazie danych. Formularze osób są wypełniane z karty danej osoby, więc nie mają linku do udostępnienia.
   - **Samodzielny** — Tworzy niezależny formularz z własnym publicznym adresem URL, idealny do zewnętrznych rejestracji. Tylko formularze samodzielne oferują [zdjęcie nagłówka](#adding-a-header-photo), [kod QR](#sharing-a-form-with-a-qr-code), [powiązaną grupę](#linking-a-form-to-a-group) oraz opcję **Utwórz kartotekę osoby na podstawie zgłoszeń**.
5. Kliknij **Zapisz**, aby utworzyć formularz.

Twój nowy formularz pojawi się na liście. Kliknij go, aby zacząć dodawać pytania.

## Drukowanie pustego formularza {#printing-a-blank-form}

Potrzebujesz wersji papierowej do rozdania — na przykład karty odwiedzającego przy stanowisku powitalnym lub formularza dla osoby bez dostępu do internetu, którą wypełni ręcznie? Kliknij **Drukuj** obok formularza na głównej liście Formularze, aby otworzyć podgląd, a następnie kliknij **Drukuj**. Puste pola zostaną wydrukowane z linią lub polem wyboru przy każdym pytaniu, aby można je było wypełnić ręcznie. Pytania wymagane są oznaczone gwiazdką. Na górze strony widoczne jest logo zboru (**logo na jasne tło** z [Witryna > Wygląd](../website/appearance.md), jeśli je wgrałeś), pod którym znajduje się nazwa zboru, a następnie nazwa formularza. Brak innych opcji drukowania — drukowany jest cały formularz lub nic.

## Udostępnianie formularza za pomocą kodu QR {#sharing-a-form-with-a-qr-code}

Obok formularzy samodzielnych na głównej liście Formularze znajduje się link **Kod QR** (formularzy zarchiwizowanych nie dotyczy). Kliknij go, aby otworzyć kod QR dla publicznego adresu URL formularza, z linkiem wyświetlonym pod spodem. Kliknij **Pobierz PNG**, aby zapisać kod jako obraz, który możesz wydrukować w biuletynie lub pokazać na slajdach. Każdy, kto go zeskanuje, otworzy formularz na swoim telefonie.

## Dodawanie pytań {#adding-questions}

1. Otwórz formularz i przejdź do zakładki **Pytania**.
2. Kliknij **Dodaj pytanie**.
3. Wybierz **typ pola** z listy Provider. Dostępne typy to:
   - **Pole tekstowe** — Do krótkich odpowiedzi tekstowych
   - **Data** — Do wyboru daty
   - **E-mail** — Do adresów e-mail
   - **Numer telefonu** — Do wprowadzania telefonu
   - **Wielokrotny wybór** — Do wyboru z gotowych opcji
   - **Płatność** — Do zbierania płatności
4. Wpisz **Tytuł** i opcjonalny **Opis** pytania. Opis wyświetla się pod pytaniem, gdy ktoś wypełnia formularz, więc użyj go do podpowiedzi w rodzaju „Podaj wszystkie alergie, o których powinniśmy wiedzieć”.
5. Zaznacz **Wymagaj odpowiedzi**, jeśli pole jest obowiązkowe.
6. Kliknij **Zapisz**.
7. Powtórz, aby dodać kolejne pytania.

:::warning
Typ pola **Płatność** wymaga skonfigurowanego Stripe. Jeśli nie skonfigurowałeś jeszcze darowizn online, zobacz [Konfigurację darowizn online](../donations/online-giving-setup.md), zanim dodasz pola płatności. Osoby, które płacą w formularzu bez logowania, muszą zaznaczyć **Nie jestem robotem**, zanim karta zostanie zaakceptowana.
:::

## Zarządzanie członkami formularza {#managing-form-members}

1. Otwórz formularz i przejdź do zakładki **Członkowie formularza**.
2. Wyszukaj osobę i dodaj ją z rolą:
   - **Administrator** — Może edytować formularz i przeglądać wszystkie zgłoszenia.
   - **Tylko podgląd** — Może przeglądać zgłoszenia, ale nie może edytować formularza.

## Łączenie formularza z grupą {#linking-a-form-to-a-group}

Dowolny formularz samodzielny możesz powiązać z grupą — na przykład formularz próśb modlitewnych dla grupy domowej lub zgodę medyczną na wyjazd młodzieży:

1. Otwórz **Szczegóły** formularza.
2. W sekcji **Powiązana grupa** wybierz grupę lub pozostaw ustawienie **Brak**.
3. Kliknij **Zapisz**.

Po powiązaniu formularza:

- **Członkowie grupy** widzą formularz w sekcji **Formularze** na stronie grupy w B1.church, dopóki formularz jest otwarty. Przycisk **Wypełnij** otwiera go (zobacz [Szczegóły grupy](../../b1-church/groups/group-details.md#linked-forms)).
- **Liderzy grupy** widzą również zamknięte formularze i mogą przeczytać odpowiedzi z każdego zgłoszenia oraz je wydrukować (pojedyncze zgłoszenie albo **Drukuj wszystkie**). Liderzy mogą tylko przeglądać odpowiedzi — nie mogą edytować formularza, chyba że są również [członkami formularza](#managing-form-members).
- **W B1 Admin** strona grupy wyświetla sekcję **Powiązane formularze** z listą każdego formularza jako **Otwarty** lub **Zamknięty**. Sekcja pojawia się dla liderów grupy i dla osób, które mogą zarządzać formularzami. Zobacz [Członkowie grupy](../groups/group-members.md#linked-forms).

Formularz jest zamknięty, gdy znajduje się poza okresem dostępności. Zarchiwizowane formularze nie są wyświetlane na stronie grupy.

### Automatyczne dodawanie osób wypełniających do grupy {#automatically-adding-submitters-to-a-group}

Samo powiązanie formularza z grupą nikogo do niej nie dodaje. Aby dodać każdą osobę wypełniającą formularz do listy członków powiązanej grupy, włącz również opcję **Utwórz kartotekę osoby na podstawie zgłoszeń** w szczegółach formularza i kliknij **Zapisz**.

Za każdym razem, gdy ktoś wyśle formularz, dopasowana lub nowo utworzona osoba zostaje dodana do grupy (osoby, które już są członkami grupy, są pomijane). Jest to przydatne np. w przypadku formularza zapisów na obóz, który ma automatycznie tworzyć listę uczestników obozu w grupie.

### Wysyłanie wiadomości uzupełniającej

Przy włączonej opcji **Utwórz kartotekę osoby na podstawie zgłoszeń** możesz również wysłać e-mail do każdej osoby, która wyśle formularz. Wypełnij pola **Temat wiadomości uzupełniającej** i **Treść wiadomości uzupełniającej** w szczegółach formularza. W obu polach możesz użyć znaczników `{firstName}` i `{churchName}`. Wiadomość zostanie wysłana tylko wtedy, gdy oba pola są wypełnione.

:::info
Wiadomości uzupełniające są wysyłane dopiero po zatwierdzeniu zboru do wysyłania e-maili grupowych, a wliczają się do dziennego limitu e-maili zboru. Zobacz [Włączanie e-maili grupowych dla zboru](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplikowanie formularza

Aby użyć formularza jako punktu wyjścia dla nowego, kliknij **Duplikuj** obok formularza na liście Formularze i potwierdź. B1 utworzy dokładną kopię formularza — łącznie ze wszystkimi pytaniami — którą możesz następnie zmienić nazwę i edytować niezależnie.

:::tip
Duplikowanie jest wygodne przy cyklicznych wydarzeniach, w których pytania rejestracyjne są z roku na rok takie same. Zduplikuj formularz z zeszłego roku, zaktualizuj nazwę i daty — i gotowe.
:::

## Konfigurowanie właściwości formularza

Nazwę i ustawienia formularza możesz zmienić w dowolnym momencie. Dla formularzy samodzielnych zobaczysz też unikalny **publiczny adres URL**, który możesz udostępnić każdemu, oraz pole **Opis** — tekst wyświetlany nad pytaniami na publicznej stronie formularza. Przydaje się, aby wyjaśnić, do czego służy formularz, zanim ktoś zacznie go wypełniać.

### Dodawanie zdjęcia nagłówka {#adding-a-header-photo}

Formularze samodzielne mogą wyświetlać **Zdjęcie nagłówka** u góry formularza. W szczegółach formularza kliknij pole zdjęcia lub **Dodaj zdjęcie**, a następnie wybierz lub wgraj obraz (zostanie przycięty do proporcji 16:9). Kliknij **Zapisz**. Zdjęcie pojawi się pod nazwą formularza, nad opisem, na stronie z publicznym adresem URL formularza oraz wszędzie tam, gdzie formularz jest osadzony za pomocą elementu witryny **Formularz**. Użyj **Zmień zdjęcie**, aby je zastąpić, lub **Usuń**, aby je usunąć.

W polu **Wiadomość z podziękowaniem** ustaw tekst, który zobaczą osoby po wysłaniu formularza, również na publicznej stronie formularza. Jeśli pole pozostanie puste, zobaczą komunikat „Dziękujemy za wysłanie formularza!”.

:::tip
Formularze samodzielne świetnie sprawdzają się przy rejestracjach na wydarzenia. Udostępnij publiczny adres URL e-mailem lub w mediach społecznościowych albo osadź formularz bezpośrednio na stronie internetowej zboru.
:::

:::info
Aby osadzić formularz na stronie B1, otwórz edytor witryny, dodaj nową sekcję i wybierz element **Formularz**. Następnie wybierz formularz do wyświetlenia. Szczegóły edycji strony internetowej znajdziesz w [Zarządzanie stronami](../website/managing-pages.md).
:::
