---
title: "Wdrożenie Twilio w kościele (wersja robocza)"
description: "Wersja robocza konfiguracji Twilio należącej do kościoła w B1, wskazówki dotyczące publicznego zapisu, przykłady kampanii i lista kontrolna do zatwierdzenia."
---

# Wersja robocza wdrożenia Twilio należącego do kościoła

:::caution Wersja robocza proponowanej integracji
To jest proponowany proces pracy. B1 ma już podstawowy wybór **Twilio** w sekcji **Ustawienia > SMS** (Account SID, Auth Token, numer nadawcy oraz webhook dla wiadomości STOP przychodzących) -- zobacz [Ustawienia kościoła: SMS](../../b1-admin/settings/church-settings.md#texting). Dodatkowe elementy konfiguracji B1, mapowanie zgód i kroki walidacji opisane poniżej są wymaganiami na przyszłe wydanie, a nie instrukcjami dotyczącymi istniejących ustawień. Zakres i zależności znajdziesz w [propozycji technicznej](./twilio-byok-proposal.md). Źródła Twilio sprawdzono 22 października 2026 r.; przed złożeniem kampanii zweryfikuj aktualne wymagania.
:::

## Zalecany model

Twój kościół jest właścicielem płatnego konta Twilio, numeru telefonu, usługi wiadomości (Messaging Service), rozliczeń i rejestracji kampanii. B1 wysyłałaby wiadomości przy użyciu tych zasobów, korzystając z danych uwierzytelniających wprowadzonych prywatnie w ustawieniach kościoła. Zadbaj o to, by co najmniej dwóch odpowiednich administratorów kościoła miało dostęp do konta Twilio, włącz zabezpieczenia konta i wyznacz osobę odpowiedzialną za zgody, przychodzące odpowiedzi oraz powiadomienia o odrzuceniu.

Pierwsze wydanie zaproponowane tutaj obejmuje jeden lokalny numer w USA i jeden dobrze opisany program wiadomości kościelnych. Poniższe przykłady używają fikcyjnego kościoła **Grace Community Church** i programu **Grace Church Updates**, dotyczącego zmian w nabożeństwach, przypomnień o wydarzeniach i grafików wolontariuszy. Zastąp każdą nazwę, domenę, częstotliwość, kontakt i cel rzeczywistą praktyką kościoła. Są to przykłady zasad Twilio dostosowane do konkretnego kościoła, a nie wstępnie zatwierdzona kampania ani obietnica akceptacji.

## 1. Przygotuj publiczne doświadczenie zapisu w B1

Opublikuj na stronie internetowej kościoła stronę taką jak `https://www.example.org/text-updates`, z osadzonym publicznym formularzem B1 lub wyraźnym odnośnikiem do samodzielnego publicznego formularza. Opublikuj także `https://www.example.org/privacy` oraz `https://www.example.org/sms-terms`. Te adresy są symbolami zastępczymi; w zgłoszeniu podaj rzeczywiste, działające adresy URL.

Dla proponowanego formularza zapisu SMS:

| Ustawienie | Zalecana konfiguracja |
|---|---|
| Dostęp | Publiczny, bez ograniczeń; aktywny podczas weryfikacji i w trakcie bieżących zapisów; dostępny bez logowania |
| Tryb formularza | Najpierw tryb standardowy; tryb konwersacyjny wymaga jawnej obsługi zgody opisanej w propozycji technicznej |
| Telefon komórkowy | Wyraźnie oznaczony z kodem kraju; wymagany tylko wtedy, gdy wybrano zapis SMS, jeśli pole jest używane w ogólnym formularzu kontaktowym lub wydarzenia |
| Wybór SMS | Osobne, opcjonalne pole wyboru, domyślnie odznaczone, powiązane z konkretnym programem i polem telefonu |
| Informacje | Widoczne obok wyboru SMS: kościół/program, cel i częstotliwość wiadomości, możliwe opłaty, STOP, HELP, kontakt do pomocy oraz rzeczywiste, klikalne linki do Polityki prywatności i Warunków SMS |
| Inne działania | Goście mogą wysłać kartę kontaktową, zapisać się na wydarzenie lub poprosić o informacje, bez zgody na SMS |
| Dowody | Zapisz program, dokładny numer telefonu, wybraną zgodę, zgłoszenie źródłowe, czas serwera oraz wersję informacji/polityki; sama zwykła odpowiedź w formularzu dziś nie zapisuje nikogo do SMS |
| Automatyzacja osób/grup | W początkowym pilotażu zapisów wyłącz automatyczne tworzenie osób i przypisywanie do grup, chyba że zostały sprawdzone pod kątem istniejących zasad dopasowania kościoła. Przypisanie do grupy nigdy nie jest autoryzacją SMS. |
| Istniejące automatyzacje | Nie zapisuj każdego autora zgłoszenia ani członka grupy do przepływu wiadomości tekstowych. Tylko proponowane, zweryfikowane mapowanie zgody może upoważnić ten program. |
| Wiadomość z podziękowaniem | Potwierdź, że formularz został otrzymany, bez twierdzenia, że osoba zapisała się do SMS, gdy pole zostało odrzucone lub potwierdzenie albo weryfikacja są jeszcze w toku. |

Istniejące pole wyboru może zilustrować formularz, ale B1 nadal potrzebuje rejestru zgód i bramek wysyłki. Obecny wspólny renderer wyświetla opisy jako zwykły tekst; wpisanie w nim Markdown lub adresu URL nie gwarantuje, że linki do polityk będą klikalne. Implementacja musi zapewnić dostępną kontrolkę zgody z rzeczywistymi linkami. Zobacz [tworzenie formularzy w B1](../../b1-admin/forms/creating-forms.md) oraz [propozycję techniczną](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio wymaga dobrowolnej, weryfikowalnej zgody (opt-in). Nie łącz zgody na SMS z obowiązkowymi warunkami członkostwa, zgodami na e-mail lub telefon, zgodą na darowiznę ani rejestracją na wydarzenie. Numer komórkowy na karcie odwiedzającego nie jest sam w sobie zgodą na SMS. Zobacz [wymagania Twilio dotyczące dobrowolnej zgody](https://www.twilio.com/docs/api/errors/30923) oraz [zalecenia dotyczące kampanii](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Przykładowy tekst zapisu

Używaj tego tekstu dopiero wtedy, gdy kościół wybrał rzeczywiste cele, nadawcę i częstotliwość. Pole wyboru jest opcjonalne i domyślnie odznaczone; nazwy polityk poniżej muszą być linkami w wyświetlanym formularzu.

> Tak, chcę, aby Grace Community Church wysyłał mi SMS-y w ramach programu Grace Church Updates o zmianach w nabożeństwach, wydarzeniach kościelnych i grafikach wolontariuszy z numeru [zarejestrowany numer kościoła]. Spodziewaj się maksymalnie 4 wiadomości miesięcznie. Mogą obowiązywać standardowe opłaty za wiadomości i transmisję danych. Odpowiedz STOP, aby zrezygnować, lub HELP, aby uzyskać pomoc. Zapis na SMS jest opcjonalny i nie jest wymagany, aby uczestniczyć w nabożeństwie, zapisać się lub przekazać darowiznę. Zobacz naszą Politykę prywatności oraz Warunki SMS. Pytania: [e-mail lub telefon do wsparcia kościoła].

„Maksymalnie 4” to przykładowe zobowiązanie, a nie limit narzucony przez Twilio. Zastąp je częstotliwością, której kościół rzeczywiście może dotrzymać; jeśli częstotliwość się zmienia, ujawnij to uczciwie i opisz spodziewany rytm wysyłki. Treści promocyjne lub dodatkowe programy służby nie powinny znaleźć się w tym polu wyboru, chyba że ich cele i zgody zostały osobno ocenione.

W ogólnym formularzu dla odwiedzających lub wydarzeń wysłanie formularza z odznaczonym polem musi nadal się udać. Formularz wyłącznie do SMS może wyjaśniać, że zaznaczenie pola oznacza prośbę o zapis, ale nigdy nie może uzależniać niezwiązanych z nim usług kościoła od zapisu. Sprawdź rzeczywiste działanie zarówno na telefonie, jak i na komputerze.

### Treści polityk do przygotowania

Strona prywatności kościoła powinna wyjaśniać, jakie informacje zbiera na potrzeby wiadomości tekstowych, jak je wykorzystuje i chroni oraz jakie są zasady przechowywania i kontaktu. Powinna jasno stwierdzać, że numery komórkowe i zgody na wiadomości nie są sprzedawane ani udostępniane osobom trzecim lub podmiotom powiązanym w celach marketingowych lub promocyjnych. Dokładnie opisz niezbędne przetwarzanie przez dostawców usług; nie twierdź, że kościół nigdy nie korzysta z podmiotów przetwarzających, skoro korzysta z B1 i Twilio. Odniesieniem dla tego rozróżnienia są [wskazówki Twilio dotyczące polityki prywatności](https://www.twilio.com/docs/api/errors/30908) oraz [zalecenia dotyczące kampanii](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

Warunki SMS powinny wskazywać kościół i program, cele, rzeczywistą częstotliwość, możliwe opłaty za wiadomości, instrukcje STOP i HELP, kontakt do pomocy oraz link do polityki prywatności; należy również uwzględnić wszelkie dodatkowe informacje wymagane przez bieżący przegląd Twilio. Linki do polityk na stronie zgody muszą dokładnie odpowiadać adresom URL zgłoszonym w kampanii. Od 30 czerwca 2026 r. Twilio wymaga dedykowanych, publicznych adresów URL polityki prywatności i warunków dla nowych rejestracji kampanii przez API; kreator w Konsoli również o nie pyta. [Wymaganie Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

To są wymagania dotyczące treści, które należy zastosować do rzeczywistych polityk kościoła, a nie zamiennik dla jego istniejących praktyk dotyczących prywatności ani ogólna polityka do wklejenia bez sprawdzenia.

## 2. Zarejestruj kościół i jego program wiadomości w Twilio

1. Utwórz lub użyj **płatnego konta należącego do kościoła** oraz lokalnego numeru w USA obsługującego SMS. Używaj spójnie prawnej nazwy kościoła, numeru EIN/informacji o rejestracji działalności, adresu, strony internetowej i upoważnionego przedstawiciela. Nie zastępuj tożsamości ChurchApps ani innego kościoła.
2. Postępuj zgodnie z procesem rejestracji marki (Brand) dla bezpośrednich klientów Twilio, właściwym dla rzeczywistego typu podmiotu kościoła. Dla uprawnionej organizacji non-profit skorzystaj z [wskazówek dotyczących rejestracji organizacji non-profit](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Przypadki użycia dla organizacji charytatywnych lub 501(c)(3) zależą od kwalifikowalności; sama nazwa kościoła nie oznacza zatwierdzenia ani zwolnienia przez Twilio.
3. Utwórz dedykowaną usługę wiadomości (Messaging Service) i złóż odpowiednią kampanię A2P 10DLC. Wybierz przypadek użycia, który uczciwie odpowiada rzeczywistym wiadomościom i opcjom dostępnym dla zatwierdzonej marki; przykłady tutaj nie narzucają uniwersalnego kodu przypadku użycia dla kościołów.
4. Podaj publiczny adres URL zapisu, adresy polityk, pełny opis zgody i przepływu wiadomości oraz żądane przykładowe wiadomości. Uwzględnij każdą rzeczywistą metodę zapisu i ustaw deklaracje dotyczące linków i numerów telefonów zgodnie z rzeczywistą treścią. Nie wpisuj zapisu przez słowo kluczowe ani podwójnej zgody (double opt-in), jeśli taki przepływ nie istnieje i nie został przetestowany.
5. Przypisz numer nadawcy do usługi i zatwierdzonej kampanii. Przed wysyłką poczekaj zarówno na **weryfikację kampanii, jak i na zakończenie rejestracji numeru**.

Wykonuj te kroki w Konsoli Twilio należącej do kościoła. Proponowana integracja B1 nie składa rejestracji za kościoły. Dokumentacja [szybkiego startu rejestracji Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) oraz [zasób kampanii](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) wyjaśniają pola rejestracji i statusy. Oczekujący numer może nadal blokować wysyłkę po zatwierdzeniu kampanii. [Rejestracja numeru](https://www.twilio.com/docs/api/errors/30035)

### Przykładowy opis kampanii

> Grace Community Church używa programu Grace Church Updates, aby wysyłać osobom, które wybrały ten program na publicznej stronie internetowej kościoła, informacje o zmianach w harmonogramie nabożeństw, przypomnienia o wydarzeniach kościelnych oraz powiadomienia o grafikach wolontariuszy. W ramach tego programu wysyłamy nie więcej niż cztery wiadomości miesięcznie. Odbiorcy mogą w każdej chwili zrezygnować z otrzymywania wiadomości. Ten program nie obejmuje zakupionych kontaktów, promocji stron trzecich ani apeli o zbiórkę funduszy.

Ten przykład pasuje wyłącznie do kościoła, który rzeczywiście przestrzega tych limitów i wyłączeń. Jeśli same przypomnienia dla wolontariuszy przekraczają obiecaną częstotliwość, przed złożeniem zmień projekt programu i treść informacji.

### Przykładowy opis przepływu wiadomości

> Odwiedzający otwierają [rzeczywisty adres URL zapisu kościoła], wpisują numer komórkowy i niezależnie zaznaczają opcjonalne pole Grace Church Updates. Pole jest odznaczone, gdy formularz się otwiera. Informacja wymienia Grace Community Church, opisuje zmiany w nabożeństwach, przypomnienia o wydarzeniach i grafiki wolontariuszy, podaje miesięczny limit oraz możliwe opłaty, a także wyjaśnia STOP i HELP. Wyświetlane linki do Polityki prywatności i Warunków SMS prowadzą do [rzeczywisty adres URL polityki prywatności] oraz [rzeczywisty adres URL warunków SMS]. Odmowa zapisu na SMS nie uniemożliwia udziału w nabożeństwie, rejestracji na wydarzenie, przekazania darowizny ani korzystania z ogólnego formularza kontaktowego. B1 zapisuje wyraźny wybór, numer telefonu, czas wysłania i wersję informacji. Wysyłamy ten program wyłącznie do udokumentowanych subskrybentów i wstrzymujemy wysyłkę do osób, które się wycofały, przed dalszymi wiadomościami.

Dostosuj ten akapit do wdrożonego przepływu. Jeśli używane jest potwierdzenie telefoniczne lub weryfikacja przez personel, opisz stan oczekiwania i dokładny krok aktywacji. Jeśli stosowane są inne metody, uwzględnij każdą z nich i jej dowód. Jeśli zapis odbywa się za logowaniem lub na papierze, Twilio wymaga publicznego, zanonimizowanego dowodu rzeczywistego doświadczenia zgody; nigdy nie ujawniaj wypełnionych formularzy ani danych członków. [Wskazówki dotyczące weryfikowalnej zgody](https://www.twilio.com/docs/api/errors/30923)

### Przykładowe wiadomości wychodzące

To są fikcyjne przykłady do dostosowania; przed złożeniem użyj prawdziwych adresów URL kościoła i zastąp wartości w nawiasach. API kampanii Twilio przyjmuje od dwóch do pięciu przykładów. Przykłady powinny identyfikować kościół, odpowiadać zadeklarowanemu celowi i zawierać instrukcję rezygnacji. [Pola przykładów kampanii](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Nabożeństwo w niedzielę rozpocznie się o [godzina] z powodu [powód]. Szczegóły: [adres URL strony kościoła]. Odpowiedz STOP, aby zakończyć otrzymywanie wiadomości.
```

```text
Grace Community Church: Przypominamy, że [wydarzenie kościelne] odbędzie się [data] o [godzina]. Informacje: [adres URL wydarzenia kościelnego]. Odpowiedz STOP, aby zakończyć otrzymywanie wiadomości.
```

```text
Grace Community Church: Zostałeś/aś wyznaczony/a do służby w zespole [zespół] w [dzień]. Sprawdź swój plan: [adres URL portalu kościoła w B1]. Odpowiedz STOP, aby zakończyć otrzymywanie wiadomości.
```

Adresy URL w nawiasach opisują przykładowe zmienne; w zgłoszonych przykładach powinna pojawić się prawdziwa domena kościoła i rzeczywisty styl linków. Link do planu może wymagać logowania, ale strona zapisu i polityki używane do weryfikacji muszą być publicznie dostępne. Nie umieszczaj prywatnych notatek, informacji o dzieciach ani danych identyfikujących członków w przykładach do zatwierdzenia. Zachowaj spójność treści przykładów z tym, co faktycznie wysyłają szablony B1; nie obiecuj skrzynki odpowiedzi ani konkretnego zachowania przypomnień, jeśli nie jest ono dostępne.

### Odpowiedzi STOP, START i HELP

Do tych potwierdzeń użyj zaawansowanej rezygnacji Twilio (Advanced Opt-Out) w usłudze wiadomości i dostosuj tożsamość kościoła i programu oraz dane kontaktowe do pomocy. Przykładowe zamierzenia odpowiedzi:

- **STOP:** Potwierdź, że Grace Church Updates została wstrzymana, i wyjaśnij obsługiwany sposób wznowienia.
- **START:** Potwierdź wznowienie tego samego programu, w tym jego tożsamość, częstotliwość/opłaty oraz instrukcje pomocy i rezygnacji, zgodnie z wymaganiami skonfigurowanego przepływu.
- **HELP:** Wskaż Grace Community Church i podaj rzeczywisty kontakt do pomocy oraz instrukcje rezygnacji.

Nie wysyłaj drugiego potwierdzenia z B1, jeśli Twilio już odpowiedziało. Odpowiedź HELP nie oznacza zapisu. START nie może zapisywać kogoś do dodatkowych programów kościelnych ani ujawniać go w katalogu członków. [Zaawansowana rezygnacja Twilio](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Sprawdź pakiet do zatwierdzenia przed złożeniem

- [ ] Rzeczywiste dane prawne/marki kościoła, tożsamość na stronie internetowej i cel kampanii są ze sobą zgodne.
- [ ] Strona zapisu i aktywny formularz otwierają się bez logowania w prywatnym oknie przeglądarki, także na urządzeniu mobilnym.
- [ ] Pole SMS jest domyślnie odznaczone i można je pozostawić puste, wypełniając główną akcję odwiedzającego lub wydarzenia.
- [ ] Cel programu, nadawca, rzeczywista częstotliwość, możliwe opłaty, STOP, HELP, kontakt do pomocy i klikalne linki do polityk są widoczne obok wyboru SMS.
- [ ] Dokładne adresy URL polityki prywatności i warunków przekazane Twilio są publiczne, działają bez danych logowania i wskazują ten sam kościół i program. Treść polityk jest zgodna z rzeczywistym przetwarzaniem danych.
- [ ] Każda przykładowa wiadomość odpowiada programowi, rzeczywistej tożsamości nadawcy oraz oczekiwanemu zachowaniu linków i numerów telefonów. Kampania opisuje każdą rzeczywistą metodę zapisu.
- [ ] Zanonimizowane zrzuty ekranu pokazują pusty formularz, pole wyboru z informacjami oraz linki do polityk w takiej postaci, w jakiej zobaczą je recenzenci. Dowody nie zawierają danych członków ani kluczy.
- [ ] Kościół ma działający sposób przechowywania dowodów zgody i honorowania wycofań przed wysyłką, także wycofań zgłoszonych telefonicznie lub e-mailem.

Te kontrole ograniczają uniknięcie niezgodności; decyzję o zatwierdzeniu podejmują Twilio i jego partnerzy weryfikujący. Zachowaj dostępność rzeczywistej strony zapisu i adresów polityk także po zatwierdzeniu, a nie tylko w trakcie weryfikacji.

## 4. Połącz i zweryfikuj przyszłą integrację z B1

Po wydaniu integracji proponowana konfiguracja SMS w B1 powinna pobierać Account SID kościoła, dedykowany identyfikator i sekret klucza API (API Key SID/secret), oddzielny token uwierzytelniania webhooka (Auth Token), identyfikator usługi wiadomości (Messaging Service SID) oraz wybranego nadawcę. Klucze twórz wyłącznie w Konsoli kościoła, a sekrety wprowadzaj wyłącznie w prywatnych ustawieniach B1. [Wskazówki dotyczące kluczy API Twilio](https://www.twilio.com/docs/iam/api-keys)

Skopiuj adresy webhooków przychodzących i statusów dostarczenia dla danego kościoła, podane przez B1, do odpowiedniej konfiguracji usługi w Twilio. Włącz zaawansowaną rezygnację (Advanced Opt-Out) i sprawdź, czy wiadomości przychodzące docierają do skonfigurowanego webhooka. B1 powinna pokazywać oddzielne sprawdzenia dla danych uwierzytelniających, własności usługi i nadawcy, zweryfikowanej kampanii, zakończonej rejestracji numeru, weryfikacji wiadomości przychodzących oraz dostarczenia wiadomości testowej. Zapisane dane uwierzytelniające lub zaakceptowane żądanie API nie oznaczają ostatecznego dostarczenia.

Jeśli B1 nie może programowo sprawdzić sygnału rejestracji, potwierdź go bezpośrednio w Konsoli; interfejs musi oznaczyć wynik z datą jako potwierdzony przez administratora. Rozwiąż status oczekujący lub nieudany przed włączeniem wiadomości produkcyjnych. Wyślij osobny, wyraźnie zamówiony test do prawdziwego, wyrażającego zgodę dorosłego odbiorcy testowego, a następnie:

1. Potwierdź, że pasujący udokumentowany zapis tworzy właściwy rekord zgody dla telefonu i programu; odmowa lub zmiana numeru telefonu nie może po cichu zapisać odbiorcy.
2. Wyślij jedną wiadomość testową, potwierdź jej odbiór i porównaj status w B1 z identyfikatorem wiadomości Twilio (Message SID) oraz wynikiem dostarczenia.
3. Odpowiedz STOP i sprawdź, czy ręczne wiadomości, wiadomości grupowe, przepływy automatyzacji i przypomnienia pomijają ten numer. Widoczność w katalogu nie powinna się zmienić.
4. Przetestuj udokumentowany przepływ ponownej subskrypcji tego samego programu oraz odpowiedź HELP; sprawdź, czy nie ma zduplikowanych potwierdzeń i niezwiązanych zmian preferencji.

## 5. Utrzymuj program

Wyznacz osobę odpowiedzialną po stronie kościoła, która będzie monitorować status kampanii i konta, alerty dotyczące salda i rozliczeń, błędy wysyłki oraz przychodzące odpowiedzi w Twilio. Proponowane pierwsze wydanie B1 nie zawiera konwersacyjnej skrzynki SMS, dlatego opublikuj i monitoruj rzeczywisty kontakt do pomocy oraz sprawdzaj odpowiedzi, zamiast zakładać, że personel widzi je w B1.

Historię zgód i wycofań, aktualne wersje informacji i polityk, identyfikatory kampanii oraz zanonimizowane dowody do zatwierdzenia przechowuj w dokumentacji kontrolowanej przez kościół. Nigdy nie wklejaj kluczy ani list odbiorców do publicznych zgłoszeń do pomocy technicznej. Gdy zmieni się numer, usługa, dane uwierzytelniające, przepływ zapisu, częstotliwość lub cel, ponownie sprawdź integrację i w razie potrzeby zaktualizuj rejestrację oraz zgody przed wznowieniem wysyłki. Dokładnie przeglądaj numery współdzielone przez domowników oraz zmienione numery; uprawnienie wynika z wyrażającego zgodę telefonu i programu, a nie z rekordu każdego członka rodziny.

W przypadku odrzucenia przeczytaj rzeczywisty błąd Twilio, popraw konkretną niespójność zarówno na stronie internetowej, jak i w zgłoszeniu, a następnie ponownie złóż wniosek w Konsoli kościoła. W przypadku nadawców niezarejestrowanych lub oczekujących poczekaj na zakończenie rejestracji zamiast zmieniać numery, aby ominąć ten proces. Skorzystaj z [rozwiązywania problemów z rejestracją Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) oraz z dostarczonego zestawienia kodów błędów. Nie obiecuj stałego czasu oczekiwania.
