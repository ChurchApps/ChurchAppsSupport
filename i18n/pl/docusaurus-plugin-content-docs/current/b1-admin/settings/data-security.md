---
title: "Bezpieczeństwo danych"
---

# Bezpieczeństwo danych

<div class="article-intro">

Nie istnieje coś takiego jak doskonale bezpieczny system, jednak ChurchApps traktuje bezpieczeństwo danych bardzo poważnie. Ta strona wyjaśnia, jakie środki podjęto, aby chronić wszystkie dane wprowadzane do B1.church Admin oraz innych produktów ChurchApps.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Przejrzyj tę stronę, aby zrozumieć, w jaki sposób chronione są dane Twojego kościoła
- Skonfiguruj [Role i uprawnienia](./roles-permissions.md), aby kontrolować, kto ma dostęp do wrażliwych informacji
- Zapoznaj się z [polityką prywatności](https://churchapps.org/privacy)

</div>

## Ograniczanie przechowywania danych wrażliwych

Naszym pierwszym podejściem jest nieprzechowywanie większej ilości danych wrażliwych, niż jest to konieczne. Oznacza to, że nigdy nie przechowujemy danych kart kredytowych ani rachunków bankowych wykorzystywanych do dokonywania darowizn. Gdy użytkownik dokonuje darowizny za pomocą B1.church Admin lub B1, dane karty kredytowej nigdy nie są przesyłane na nasze serwery, a jedynie do Twojej bramki płatniczej (Stripe). Oznacza to, że w przypadku naruszenia bezpieczeństwa danych żadne informacje o karcie kredytowej ani rachunku bankowym nie zostaną przejęte.

Nie przechowujemy również haseł w naszym systemie. Wszystkie hasła są przetwarzane za pomocą jednokierunkowego algorytmu haszującego, w którym część danych zostaje nieodwracalnie usunięta. Dzięki temu nikt, nawet my, nie jest w stanie odzyskać haseł z bazy danych. Aby zweryfikować hasło, wprowadzona wartość musi przejść przez ten sam jednokierunkowy haszing i dać identyczny wynik.

Po wyeliminowaniu tych dwóch źródeł jedynymi danymi wrażliwymi, które pozostają, są lista imion i nazwisk oraz dane kontaktowe.

:::tip
Ponieważ ChurchApps nigdy nie przechowuje informacji o kartach kredytowych ani rachunkach bankowych, nawet w najgorszym scenariuszu naruszenia danych nie zostałyby ujawnione szczegóły kont finansowych. Zagrożone byłyby jedynie imiona, nazwiska i dane kontaktowe.
:::

## Stosowanie standardowych najlepszych praktyk

Stosujemy przemysłowe standardy najlepszych praktyk w zakresie bezpieczeństwa, w tym szyfrowanie wszystkich danych przesyłanych do i z naszych serwerów za pomocą HTTPS. Wszystkie serwery są hostowane w bezpiecznym centrum danych fizycznych w Amazon Web Services. Wszystkie serwery baz danych znajdują się za zaporą sieciową i są niedostępne z Internetu.

## Segregacja danych

Dane są rozdzielone na różne bazy danych w zależności od zakresu. Każde z naszych interfejsów API (Membership, Giving, Attendance, Messaging, Doing i Lessons) stanowi niezależne silosy danych, posiadające własne bazy danych. Jeśli jeden z nich zostanie naruszony, użyteczność danych jest ograniczona, o ile inne nie zostaną również naruszone. Na przykład, gdyby interfejs API/baza danych Giving została naruszona, osoba niepowołana mogłaby potencjalnie uzyskać dostęp do listy darowizn i dat (nigdy jednak do danych kart lub rachunków bankowych). Nie miałaby jednak dostępu do informacji o tym, którzy użytkownicy dokonali darowizn ani na rzecz których kościołów, ponieważ te dane są przechowywane w oddzielnej bazie danych Membership.

:::info
Segregacja danych oznacza, że naruszenie jednego systemu nie daje dostępu do wszystkich danych kościoła. Każdy interfejs API działa niezależnie, posiadając własną bazę danych, co ogranicza skutki ewentualnego naruszenia.
:::

## Ograniczony dostęp

Dostęp do serwerów produkcyjnych jest ściśle ograniczony do administratorów serwerów, którzy go potrzebują. Obecnie są to dwie osoby, które jednocześnie są członkami zarządu. Deweloperzy, wolontariusze oraz pozostali członkowie zarządu nie mają dostępu do serwerów produkcyjnych.

## Polityka prywatności

Twoje dane należą do Ciebie i nigdy nie zostaną sprzedane podmiotom trzecim. Pełną treść naszej polityki prywatności możesz przeczytać [tutaj](https://churchapps.org/privacy).

## Zgodność z RODO

ChurchApps wspiera zgodność z RODO (GDPR) dla kościołów, których członkowie znajdują się w Wielkiej Brytanii lub Unii Europejskiej. Oto, jak odnosimy się do kluczowych wymogów:

### Prawa osób, których dane dotyczą

ChurchApps udostępnia narzędzia, które pomagają kościołom odpowiadać na wnioski osób, których dane dotyczą:

- **Prawo dostępu (art. 15)** — Członkowie mogą zażądać kopii swoich danych osobowych, kontaktując się ze swoim kościołem. Administratorzy mogą wyeksportować dane dowolnej osoby z sekcji **Zarządzanie danymi** na stronie szczegółów osoby w B1.church Admin.
- **Prawo do usunięcia danych (art. 17)** — Członkowie mogą samodzielnie zażądać usunięcia konta ze strony swojego profilu (zobacz [Rozpatrywanie wniosków o usunięcie konta](../profile/account-deletion.md)) lub kontaktując się bezpośrednio ze swoim kościołem. Administratorzy mogą także zanonimizować dane osoby we wszystkich modułach, korzystając z sekcji **Zarządzanie danymi** na stronie szczegółów osoby. Anonimizacja zastępuje dane osobowe ogólnymi wartościami, zachowując jednocześnie zbiorcze zapisy (sumy darowizn, liczby obecności) potrzebne do sprawozdawczości finansowej kościoła.
- **Prawo do ograniczenia przetwarzania (art. 18)** — Członkowie mogą zażądać ograniczenia przetwarzania, kontaktując się ze swoim kościołem, w tym rezygnując z otrzymywania komunikatów.
- **Prawo do przenoszenia danych (art. 20)** — Administratorzy mogą eksportować dane osobowe w ustrukturyzowanym, nadającym się do odczytu maszynowego formacie JSON w imieniu członków, którzy o to wnioskują.

### Korzystanie z narzędzi do zarządzania danymi

Aby uzyskać dostęp do narzędzi do obsługi danych RODO dla konkretnej osoby:

1. Przejdź do sekcji **Osoby** w B1 Admin i otwórz kartę danej osoby.
2. Kliknij **Edytuj**, aby przejść do trybu edycji.
3. Przewiń w dół do sekcji **Zarządzanie danymi** (domyślnie zwiniętej) i kliknij, aby ją rozwinąć.
4. Użyj opcji **Eksportuj dane**, aby pobrać plik JSON ze wszystkimi danymi przechowywanymi o tej osobie.
5. Użyj opcji **Anonimizuj**, aby zastąpić dane osobowe ogólnymi wartościami. Zostaniesz poproszony o wpisanie `ANONYMIZE` w celu potwierdzenia — tej operacji nie można cofnąć.

:::warning
Anonimizacja jest nieodwracalna. Sumy darowizn i liczby obecności są zachowywane do celów sprawozdawczości finansowej, ale wszystkie identyfikatory osobowe (imię, nazwisko, adres e-mail, adres itd.) zostają usunięte i nie można ich odzyskać.
:::

### Przetwarzanie danych

ChurchApps działa jako **podmiot przetwarzający dane** w imieniu Twojego kościoła (**administratora danych**). Nasza [Umowa o przetwarzaniu danych](https://churchapps.org/terms) określa obowiązki każdej ze stron, w tym korzystanie z podprocesorów, procedury zgłaszania naruszeń oraz postępowanie z danymi po rozwiązaniu umowy.

### Międzynarodowe transfery danych

Dane ChurchApps są hostowane w Amazon Web Services (AWS) w Stanach Zjednoczonych. Międzynarodowe transfery danych z Wielkiej Brytanii i UE są objęte standardowymi klauzulami umownymi (SCC) AWS na mocy [Aneksu o przetwarzaniu danych AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Aneks DPA AWS jest automatycznie włączony do Warunków usług AWS dla wszystkich klientów. Hosting w UE nie jest wymagany, jeśli zastosowano odpowiednie mechanizmy transferu, takie jak SCC.

Szczegółowe informacje o sposobie oceny ryzyka związanego z transferem można znaleźć w [Ocenie ryzyka transferu](./transfer-risk-assessment.md).

### Podprocesory

- **Amazon Web Services (AWS)** — hosting infrastruktury, przechowywanie danych i dostarczanie treści
- **Stripe** — przetwarzanie płatności za darowizny (ChurchApps nie przechowuje danych kart)

:::info
Pełne informacje o tym, jak przetwarzamy dane osobowe, znajdziesz w naszej [Polityce prywatności](https://churchapps.org/privacy) oraz [Warunkach świadczenia usług](https://churchapps.org/terms). W razie pytań dotyczących zgodności z RODO skontaktuj się z nami pod adresem support@churchapps.org.
:::
