---
title: "Ustawienia kościoła"
---

# Ustawienia kościoła

<div class="article-intro">

Strona Ustawienia kościoła służy do konfigurowania podstawowych informacji o Twoim kościele, danych kontaktowych i identyfikacji wizualnej. Te dane są wykorzystywane we wszystkich narzędziach ChurchApps, w tym na Twojej stronie B1.church i w aplikacji B1 Mobile.

</div>

## Film szkoleniowy

<YouTube id="634zSbzDkYA" title="Konfigurowanie informacji o kościele i identyfikacji wizualnej w B1" next="Role, uprawnienia i zapraszanie zespołu w B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz uprawnienia „Edycja ustawień kościoła”. Jeśli nie masz dostępu, zobacz [Role i uprawnienia](./roles-permissions.md).
- Przygotuj adres kościoła, dane kontaktowe i logo

</div>

## Edycja informacji o kościele

1. W B1 Admin otwórz [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu), rozwiń **Settings** i kliknij **Settings**.
2. W sekcji **Church Information** (na górze strony) kliknij **Edit**.
3. Zaktualizuj dowolne z poniższych pól:
   - **Church Name** -- nazwa wyświetlana we wszystkich produktach ChurchApps.
   - **Address** -- fizyczny adres Twojego kościoła.
   - **Contact Information** -- numer telefonu, adres e-mail i inne dane kontaktowe.
   - **Time Zone** -- strefa czasowa Twojego kościoła. Zobacz [Strefa czasowa](#time-zone) poniżej.
4. Kliknij **Save**, aby zastosować zmiany.

## Konfigurowanie subdomeny

Twój kościół otrzymuje bezpłatną subdomenę **yourchurch.1.church**. Pod tym adresem członkowie i goście mogą odwiedzić internetową stronę Twojego kościoła.

1. Na stronie Settings kliknij **Edit** w sekcji **Church Information** i znajdź pole **Subdomain**.
2. Wpisz wybraną subdomenę (na przykład „gracechurch” dla gracechurch.1.church).
3. Zapisz zmiany.

:::info
Subdomena musi być unikalna wśród wszystkich kościołów ChurchApps. Jeśli wybrana nazwa jest zajęta, spróbuj dodać nazwę miasta lub regionu (na przykład „gracechurch-dallas”).
:::

Jeśli chcesz, aby odwiedzający trafiali na Twoją stronę pod własną domeną (na przykład **`www.gracechurch.org`**), zobacz [Domena niestandardowa](./custom-domain.md).

## Konfigurowanie identyfikacji wizualnej

Dostosuj wygląd Twojego kościoła we wszystkich narzędziach ChurchApps:

1. Prześlij **logo kościoła**, klikając obszar logo i wybierając plik graficzny.
2. Dodaj dodatkowe **zdjęcia kościoła**, które będą używane na Twojej stronie internetowej i w [aplikacji mobilnej](./mobile-app.md).

:::tip
Najlepsze efekty uzyskasz, używając logo w formacie PNG z przezroczystym tłem. Dzięki temu będzie dobrze wyglądać zarówno na jasnym, jak i ciemnym tle.
:::

## Pierwszy dzień tygodnia

Wybierz, od którego dnia mają się zaczynać Twoje kalendarze. Lista rozwijana **First Day of Week** w sekcji Church Info domyślnie ustawiona jest na **Sunday**, ale można wybrać dowolny dzień. Po zmianie ustawienie obowiązuje we wszystkich siatkach kalendarza w B1 Admin i na portalu członków B1.church -- kalendarze grup, kalendarze kuratorskie i edytor wydarzeń będą wyświetlać tygodnie zaczynające się od wybranego dnia.

## Strefa czasowa

Lista rozwijana **Time Zone** w sekcji **Church Information** ustawia strefę czasową Twojego kościoła (na przykład *America/Chicago*). Wybierz **None**, aby pozostawić to pole puste. Po zapisaniu strefa pojawi się w podsumowaniu Church Information.

B1 używa tej strefy czasowej do czasów obowiązujących w całym kościele, na przykład do przypomnień o wydarzeniach i harmonogramów na telewizorach [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). [Harmonogramy zameldowania](../attendance/setup.md#setting-a-check-in-schedule) są mierzone najpierw w strefie czasowej [kampusu](./campuses.md), w którym odbywa się nabożeństwo, a strefę czasową kościoła stosuje się tylko wtedy, gdy kampus jej nie ma. Jeśli wszystkie Twoje kampusy znajdują się w jednej strefie czasowej, ustaw ją zarówno dla kościoła, jak i dla każdego kampusu.

## Region (format daty i telefonu)

Ustawienie **Region** określa, jak zapisywane są daty i godziny w całym B1. Domyślnie daty mają format amerykański (na przykład „Sep 28, 2026” i „9/28/2026”). Kościoły spoza USA mogą przełączyć się na własny format -- na przykład wybór English (United Kingdom) spowoduje wyświetlanie „28 Sept 2026” i „28/09/2026”.

1. Na stronie Settings kliknij **Region** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Region**.
2. Wybierz swój region z listy rozwijanej **Region**. Każda opcja pokazuje przykładową datę, dzięki czemu widać dokładnie, jak będą wyglądać daty.
3. Kliknij **Save**.

Sekcja Region pokaże wtedy wybrany region, przykład **Date format** oraz format **Phone numbers**.

### Format numerów telefonów

W tej samej sekcji Region znajduje się ustawienie **Phone numbers**, które określa, jak wpisywane są numery telefonów w karcie danej osoby:

- **International (with country code)** -- ustawienie domyślne. Pola telefonu wyświetlają wybór flagi kraju i zapisują numery z kodem kraju (na przykład +1 918 555 1234).
- **Local (as typed)** -- pola telefonu stają się zwykłymi polami tekstowymi i zapisują numery dokładnie tak, jak je wpiszesz, bez dodawania kodu kraju (na przykład 0701 234 5678). Wybierz tę opcję, jeśli Twój kościół zapisuje numery w formacie lokalnym i nie chcesz, aby B1 dodawało kod kraju.

Gdy wybrana jest opcja **Local**, sekcja Region wyświetla także napis „Local phone numbers” obok Twojego regionu.

:::tip
Wysyłanie SMS-ów działa najlepiej, gdy numery zawierają kod kraju. Jeśli wysyłasz wiadomości z B1, zostaw format **International** lub upewnij się, że numery wpisywane w trybie Local zawierają kod kraju.
:::

Twój region wpływa na daty i godziny w B1 Admin oraz na stronie B1.church i portalu członków, w tym na kazania, wpisy na blogu, kalendarze grup i plany służby, dzięki czemu członkowie widzą daty w tym samym formacie co pracownicy.

## Wysyłanie SMS-ów {#texting}

Połącz dostawcę usług SMS, aby wysyłać wiadomości tekstowe do jednej osoby lub całej grupy z poziomu B1 Admin. Wiadomości są wysyłane przez Twoje własne konto u dostawcy, więc obowiązują jego ceny i limity.

1. Na stronie Settings kliknij **Texting** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Texting**.
2. Wybierz **Provider**:
   - **Clearstream** -- wpisz **API Key**. Klucz utworzysz w ustawieniach konta Clearstream w sekcji API Keys.
   - **Text In Church** -- wpisz **API Key**. Najpierw poproś Text In Church Support o dostęp do API dla deweloperów, a następnie utwórz klucz w sekcji Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- jako **API Key** wpisz klucz autoryzacyjny z konta Nalo Solutions oraz **Sender ID** (do 11 znaków) zatwierdzony dla Ciebie przez Nalo.
   - **Twilio** -- użyj własnego konta Twilio kościoła; Twilio rozlicza się bezpośrednio z Tobą. Skopiuj **Account SID** i **Auth Token** z [Twilio Console](https://console.twilio.com) i wpisz **From Number** -- numer telefonu Twilio zarejestrowany w usłudze A2P 10DLC, w formacie takim jak `+15551234567`. Po zapisaniu wklej adres webhooka przychodzących wiadomości (zobacz poniżej) do pola **A message comes in** tego numeru w Twilio, aby odpowiedzi STOP były zapisywane także w B1.
3. Kliknij **Save**.

Aby zakończyć wysyłanie SMS-ów, ustaw **Provider** na **None** i zapisz. Spowoduje to usunięcie zapisanego dostawcy.

### Wypisywanie osób, które odpowiedzą STOP

Gdy dostawca jest zapisany, otwórz ponownie sekcję Texting przyciskiem **Edit**. Poniżej ustawień dostawcy pole tylko do odczytu **Inbound (STOP) webhook URL** pokazuje adres internetowy przypisany do Twojego kościoła. Kliknij pole, aby zaznaczyć adres, skopiuj go i wklej w ustawieniu webhooka odpowiedzi (wiadomości przychodzących) u swojego dostawcy. Działa to z każdym z wymienionych dostawców, którzy potrafią przekazywać przychodzące odpowiedzi do webhooka.

Od tego momentu, gdy ktoś odpowie **STOP** (lub STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT albo REVOKE) na jedną z Twoich wiadomości, B1 znajdzie wszystkie osoby o pasującym numerze komórkowym, oznaczy je jako wypisane i wyłączy ich przypomnienia SMS. Będą one wtedy pomijane przy wysyłaniu wiadomości grupowych. Inne odpowiedzi są ignorowane.

:::info
Ta funkcja korzysta z tego samego ustawienia rezygnacji co **Ukryj mnie w katalogu członków**, więc osoby, które odpowiedzą STOP, będą też widoczne jako **Hidden from directory** w swoim profilu. Pole pojawia się tylko wtedy, gdy zapisany dostawca jest wybrany -- jeśli zmienisz wybór na innego dostawcę, najpierw zapisz zmiany, aby ponownie zobaczyć adres.
:::

Gdy dostawca jest połączony, osoby z uprawnieniem do wysyłania wiadomości zobaczą przycisk **Text** na stronie grupy (**Text this group**) oraz na stronie osoby z numerem komórkowym (**Send text message**). Wpisz wiadomość i kliknij **Send**. Okno dialogowe liczy znaki i segmenty SMS. W przypadku grupy pokazuje, ilu członków otrzyma wiadomość, zanim ją wyślesz:

- Członkowie bez numeru komórkowego w karcie są pomijani.
- Członkowie, którzy wybrali **Ukryj mnie w katalogu członków**, są liczeni jako wypisani i pomijani.
- Członkowie rodziny, którzy udostępniają ten sam numer komórkowy, otrzymują wiadomość tylko raz.

### Personalizacja wiadomości za pomocą pól scalania {#personalizing-texts-with-merge-fields}

Pod polem wiadomości okno Text pokazuje przyciski symboli zastępczych: **First Name**, **Last Name**, **Display Name** i **Church Name**. Kliknij przycisk, aby wstawić symbol zastępczy (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` lub `{{churchName}}`) w miejscu kursora. Po wysłaniu wiadomości każdy symbol zostanie zastąpiony danymi danego odbiorcy, więc wiadomość grupowa w rodzaju `Cześć {{firstName}}, do zobaczenia w niedzielę!` dotrze do każdego członka z jego imieniem. Symbole działają zarówno w wiadomościach grupowych, jak i w wiadomościach do pojedynczej osoby. Wiadomości do grupy oferują także przycisk **Group Name** (`{{groupName}}`), który zostanie zastąpiony nazwą grupy.

Aby ponownie użyć wiadomości, zapisz ją jako [szablon SMS](./email-templates.md#text-templates) (szablon e-mail z kategorią **Text**) i wybierz go z listy **Load Template (optional)** na górze okna Text.

:::info
Limit 1600 znaków dotyczy wiadomości w czasie pisania. Po wstawieniu symboli zastępczych wszystko, co przekracza 1600 znaków, zostanie ucięte do tej długości.
:::

Wiadomości mogą być również wysyłane automatycznie w ramach kroku [przepływu pracy](../serving/workflows.md#sending-a-text) z akcją **Send Text**, która korzysta z tego samego dostawcy i symboli zastępczych.

## Przechowywanie plików

Domyślnie pliki przesyłane na Twoją stronę internetową (za pośrednictwem [Files](../website/files.md)) i do innych obszarów treści korzystają z bezpłatnego hostingu B1, do 100 MB. Jeśli potrzebujesz więcej miejsca, możesz podłączyć własną chmurę -- nowe przesyłane pliki trafią wtedy bezpośrednio na Twoje konto, bez limitu platformy.

1. Na stronie Settings kliknij **File Storage** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **File Storage**.
2. Wybierz dostawcę: **Google Drive**, **Dropbox**, **OneDrive** lub **zasobnik zgodny z S3** (AWS S3, Cloudflare R2, Backblaze B2 itp.).
3. W przypadku Google Drive, Dropbox lub OneDrive kliknij **Connect** i zaloguj się, aby udzielić dostępu. W przypadku zasobnika zgodnego z S3 wpisz klucz dostępu, klucz tajny, nazwę zasobnika oraz podstawowy publiczny adres URL.
4. Kliknij **Save**.

:::info
Dotyczy to tylko nowych plików przesyłanych do Files na stronie internetowej i podobnych obszarów treści. Zdjęcia z galerii, miniatury, logo i zdjęcia osób zawsze pozostają w domyślnym magazynie B1.
:::

## Promocja do wyższej klasy

Jeśli śledzisz **Grade** (klasę) dzieci i uczniów, B1 może automatycznie przenieść wszystkich o klasę wyżej w wybranym przez Ciebie dniu (na przykład 1 sierpnia), zamiast wymagać ręcznej edycji każdego profilu.

1. Na stronie Settings kliknij **Grade Promotion** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Grade Promotion**.
2. Włącz przełącznik (pokaże **Enabled**) i wybierz **Month** oraz **Day**, w których mają być awansowane klasy każdego roku. Tego dnia każdy z przypisaną klasą przechodzi o jedną klasę wyżej, a uczniowie klasy 12 otrzymują status **Graduated**.
3. Zapisz zmiany.

Aby wyłączyć automatyczną promocję, wyłącz przełącznik, tak aby pokazywał **Disabled**, i zapisz. Data promocji zostanie usunięta, a klasy nie będą już zmieniać się automatycznie.

## Zapisy na wolontariat {#volunteer-signup}

Domyślnie członkowie przeglądający [zapisy na wolontariat](../../b1-church/serving/volunteer-signup.md) widzą każdy nadchodzący tydzień, w którym są wolne miejsca. Jeśli lista robi się długa, możesz pokazywać tylko najbliższy tydzień dla każdego typu planu.

1. Na stronie Settings kliknij **Volunteer Signup** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Volunteer Signup**.
2. Włącz opcję **Show only the next week of each plan type** (pokaż tylko najbliższy tydzień każdego typu planu).
3. Zapisz zmiany.

Po włączeniu tej opcji każdy typ planu pokazuje tylko jego najbliższy nadchodzący plan. Kolejny tydzień pojawi się, gdy minie ta data. W wierszu **Weeks shown** w tej sekcji widnieje **Only the next week of each plan type** lub **All upcoming weeks**.

## Prywatność datków {#giving-privacy}

Osoby z dostępem do datków zwykle widzą sumy datków danej osoby w jej [karcie osoby](../people/adding-people.md#editing-details). Jeśli nie chcesz, aby kwoty były widoczne za każdym razem, gdy otwierana jest karta, możesz je ukryć, dopóki ktoś o nie nie poprosi.

1. Na stronie Settings kliknij **Giving privacy** na liście po lewej stronie, a następnie kliknij **Edit** w sekcji **Giving privacy**.
2. Włącz opcję **Hide giving on person records until clicked** (ukryj datki na kartach osób do momentu kliknięcia).
3. Zapisz zmiany.

Po włączeniu tej opcji karta datków na karcie osoby wyświetla komunikat „Giving is hidden on person records” (datki są ukryte na kartach osób). Kliknij **Show giving**, aby wczytać i wyświetlić datki tej osoby. Ukryją się ponownie, gdy otworzysz kartę innej osoby. Ta opcja nie zmienia tego, kto może widzieć datki: tylko osoby z dostępem do datków w ogóle zobaczą tę kartę.

## Import i eksport

Link **Import/Export** pod nazwą kościoła na stronie Settings otwiera dedykowane narzędzie w nowym oknie przeglądarki. Używaj go, aby:

- Importować dane członków z innego systemu zarządzania kościołem.
- Eksportować dane ChurchApps w celu wykonania kopii zapasowej lub migracji.

Jest to szczególnie pomocne, gdy dopiero konfigurujesz swój kościół i musisz przenieść istniejące rekordy do ChurchApps.

:::warning
Przed importem danych zawsze najpierw wykonaj kopię zapasową istniejących rekordów. Operacje importu dodają dane do systemu i mogą tworzyć zduplikowane wpisy, jeśli zostaną uruchomione wielokrotnie.
:::
