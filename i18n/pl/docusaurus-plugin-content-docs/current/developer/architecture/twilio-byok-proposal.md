---
title: "Twilio BYOK (propozycja)"
description: "Proponowana integracja Twilio należąca do kościoła, model zgód, zakres wdrożenia i kryteria wydania."
---

# Propozycja integracji Twilio BYOK

:::caution Propozycja — integracja niedostępna
To projekt do przeglądu przez opiekunów, oparty na publicznym kodzie źródłowym i dokumentacji Twilio przejrzanych 22 października 2026 r. Od tego czasu wdrożono podstawowego dostawcę Twilio (`@churchapps/texting` 0.6.0 oraz B1 Admin **Ustawienia > Wysyłanie SMS**): kościół wpisuje swój Account SID, Auth Token oraz numer nadawcy (From). Dostawca akceptuje też Messaging Service SID zaczynający się od `MG`, jednak kolumna `fromNumber` nadal ma typ `varchar(20)`, który jest za krótki na 34-znakowy SID. Wiadomości są wysyłane jedno żądanie na odbiorcę przez Messages API Twilio, a odpowiedzi STOP trafiają do B1 przez istniejący webhook przychodzący. Zobacz [Ustawienia kościoła: wysyłanie SMS](../../b1-admin/settings/church-settings.md#texting). Model zgód, obsługa Advanced Opt-Out, status doręczenia i kontrole gotowości opisane poniżej nadal są propozycjami, a nie działającym zachowaniem. Towarzyszący [projekt wdrożenia kościoła](./twilio-byok-onboarding-draft.md) zawiera proponowane wskazówki konfiguracji i przykłady dla kościołów.
:::

## Zalecana ścieżka

Dodaj Twilio do istniejącego systemu dostawców wysyłki SMS w B1, używając **należącego do kościoła konta Twilio, poświadczeń API, Messaging Service i numeru telefonu obsługującego SMS**. Kościół rejestruje własny podmiot prawny i kampanię komunikacyjną, płaci bezpośrednio Twilio, utrzymuje zgody odbiorców i zarządza zatwierdzeniem w Twilio Console. ChurchApps dostarcza integrację i dokumentację.

Zacznij od jednego programu komunikacyjnego, jednego Messaging Service i jednego lokalnego nadawcy US 10DLC na kościół B1. Obsłuż pojedyncze wiadomości, wiadomości grupowe, wiadomości z przepływów pracy oraz przypomnienia o zapisach przez istniejące ekrany B1. Rozsądny pierwszy program obejmuje zmiany nabożeństw, przypomnienia o wydarzeniach i planowanie wolontariuszy, pod warunkiem że wszystkie trzy są opisane w zgodzie i zatwierdzonej kampanii danego kościoła. Komunikacja dotycząca zbiórek lub promocji wymaga osobno ocenionego zakresu i zgody; nie dodawaj jej po cichu do tego programu.

| Odpowiedzialność | Kościół | B1 / ChurchApps |
|---|---|---|
| Konto Twilio, rozliczenia, własność numeru | Jest właścicielem i administruje nimi | Nie zakłada konta platformy ani nie odsprzedaje kredytów |
| Marka, kampania, rejestracja numeru | Przekazuje dokładne dane kościoła; obsługuje weryfikację i poprawki | Wyjaśnia wymagania wstępne i odczytuje dostępne informacje o gotowości |
| Strona zapisów, zasady, cel wiadomości | Publikuje je i utrzymuje | Zapewnia zgodne elementy formularza, przykłady i zapisy zgód |
| Kwalifikacja odbiorców i obsługa STOP | Weryfikuje dowody zgody i żąda zgód zebranych poza SMS | Egzekwuje zgody, blokady, uprawnienia i podpisane webhooki |
| Doręczenie i wsparcie | Monitoruje błędy Twilio, stan konta i przychodzące odpowiedzi | Pokazuje status przesłania i doręczenia, bez obiecywania gwarancji zatwierdzenia |

Odłóż na później konto nadrzędne Twilio prowadzone przez ChurchApps, subkonta klientów, zakup numerów, zgłoszenia do Trust Hub, rozliczenia, skrzynkę konwersacji, MMS/WhatsApp, wysyłkę międzynarodową oraz wdrażanie numerów bezpłatnych. Numer bezpłatny to osobna ścieżka zweryfikowanego nadawcy, a nie obejście rejestracji. Te granice utrzymują pierwsze wydanie zgodnie z istniejącym modelem B1, w którym kościół przynosi własnego dostawcę.

## Istniejące fundamenty i luki

Poniższe obserwacje odnoszą się do migawek kodu źródłowego, a nie do założenia, co jest obecnie wdrożone:

| Komponent | Istniejące zachowanie | Konsekwencja |
|---|---|---|
| [Rejestr dostawców i kontrakt](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` obsługuje wysyłkę pojedynczą i zbiorczą, walidację, opcjonalne możliwości subskrybentów/list oraz identyfikator wiadomości u dostawcy w wynikach. Nie jest zarejestrowany żaden adapter Twilio. | Dodaj Twilio w `@churchapps/texting`; nie potrzebuje ani tworzenia subskrybentów, ani list zarządzanych przez dostawcę. |
| [Ustawienia wysyłki SMS](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Można wybrać Clearstream, Text In Church i Nalo; MinistryStuff jest ograniczony funkcjami. Edycja i zapis nadawcy są obecnie przeznaczone wyłącznie dla Nalo. | Dodaj jawne pola Twilio, walidację, zapis nadawcy i pomoc przy konfiguracji. Sama pozycja w liście rozwijanej nie wystarczy. |
| [Kontroler](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) i [brama modułu](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Poświadczenia są szyfrowane i maskowane; wysyłki ręczne i automatyczne ustalają dostawcę kościoła. Wysyłki grupowe usuwają duplikaty wspólnych numerów telefonów. | Wykorzystaj te ścieżki i zachowaj autoryzację. Umieść nowe bramki zgód i gotowości we wspólnej ścieżce serwerowej, aby przepływy pracy nie mogły ich ominąć. |
| [Pomocnik STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Odczytuje pola `From`/`Body` w stylu Twilio; sprawdza token URL kościoła; ustawia `person.optedOut` i wyłącza przypomnienia SMS. Inne odpowiedzi są ignorowane. | To przydatny punkt wyjścia, ale nie kompletny webhook Twilio. Dodaj podpisy Twilio i niezależny stan subskrypcji SMS. |
| [Schemat wiadomości](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Przechowuje `apiKey`, `apiSecret` oraz `fromNumber` o długości 20 znaków; dzienniki wysyłek zapisują natychmiastowy sukces/błąd, a nie identyfikatory dostawcy ani końcowe stany doręczenia. | Nadawca w formacie E.164 pasuje; 34-znakowy SID Messaging Service wymaga osobnego pola. Dodaj trwałe przechowywanie identyfikatorów i statusów wiadomości u dostawcy. |
| [Strona formularza publicznego](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [wspólny renderer formularzy](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) i [kontroler zgłoszeń](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Istnieją formularze bez ograniczeń i opcjonalne pola wyboru. Opisy są zwykłym tekstem. Zgłoszenia zachowują odpowiedzi, ale ścieżka wysyłki SMS nie ma rejestru zgód dla konkretnego programu. | Dodaj skonfigurowaną kontrolkę zgody na SMS z rzeczywistymi linkami do zasad oraz zapis dowodów po stronie serwera. Ogólne pole wyboru ani przynależność do grupy nie mogą automatycznie upoważniać do SMS. |

[Dokumentacja ustawień kościoła](../../b1-admin/settings/church-settings.md#texting) wyjaśnia też, że obecna flaga rezygnacji jest współdzielona z prywatnością katalogu. To powiązanie jest ważną kwestią wydania: odpowiedź START nigdy nie może zmieniać widoczności w katalogu.

## Konfiguracja i projekt poświadczeń

Używaj jawnych, addytywnych pól konfiguracji zamiast przeciążać `fromNumber` lub zapisywać dane strukturalne w ciągu klucza API:

| Pole | Proponowe przeznaczenie |
|---|---|
| `accountSid` | Identyfikator konta/projektu Twilio należącego do kościoła (`AC…`) |
| `apiKey`, `apiSecret` | Dedykowany SID klucza API Twilio (`SK…`) i jego sekret do wychodzących wywołań API; zaszyfrowane i maskowane |
| `webhookAuthToken` | Auth Token konta używany przez SDK Twilio do weryfikacji podpisów przychodzących; osobno szyfrowany i maskowany |
| `messagingServiceSid` | Messaging Service kościoła (`MG…`, 34 znaki) |
| `fromNumber` | Wybrany numer obsługujący SMS w formacie E.164, zweryfikowany jako nadawca na tym koncie/w tej usłudze |
| Konfiguracja programu | Stały identyfikator programu, nazwa, dozwolone cele, adresy URL zapisów i zasad oraz wersja informacji |

Twilio [preferuje klucze API do uwierzytelniania REST](https://www.twilio.com/docs/iam/api-keys). Używaj najwęższych przetestowanych uprawnień klucza, które obejmują wysyłkę i wymagane odczyty kontrolne. Auth Token konta nadal jest potrzebny do [standardowej weryfikacji podpisu webhooka Twilio](https://www.twilio.com/docs/usage/security). Wyjaśnij tę różnicę w interfejsie: sekret API nie jest tokenem Auth Token webhooka. Przechowuj poświadczenia wyłącznie w serwerowym magazynie ustawień, nigdy na publicznych stronach, w odpowiedziach formularzy, w żądaniach wysyłki z przeglądarki ani w zgłoszeniach do wsparcia.

Kościół tworzy i zarządza tymi zasobami w Console. Działanie walidacji w B1 może jedynie odczytywać skonfigurowaną usługę, nadawców i informacje o rejestracji. Nie może kupować numerów, tworzyć kampanii, zmieniać ustawień Twilio ani wysyłać wiadomości testowej jako efektu ubocznego. Udostępnij osobne, jawne działanie wysyłki testowej, ograniczone do jednego uprawnionego, wyrażającego zgodę odbiorcy.

Zachowuj maskowane poświadczenia tylko podczas edycji tego samego, zapisanego dostawcy. Przełączenie na Twilio musi wymagać własnych poświadczeń i usuwać nieaktualne wartości specyficzne dla poprzedniego dostawcy; nie przenoś maskowanego klucza Clearstream lub Nalo do konfiguracji Twilio.

Ogranicz każde pobranie i aktualizację do uwierzytelnionego kościoła B1. Wiąż wywołania zwrotne z zapisaną integracją i oczekiwanym kontem/usługą/nadawcą Twilio; odrzucaj sprzeczne przypisania między kościołami. Rotacja poświadczeń i odłączenie dostawcy muszą unieważniać gotowość i wstrzymywać wysyłki w kolejce, bez kasowania zgód i historycznych zapisów doręczeń.

## Zgody i blokady to wymagana praca przed wydaniem

Wprowadź rekordy subskrypcji powiązane z numerem telefonu dla programu Twilio oraz zdarzenia zgód i blokad dopisywane bez modyfikacji. Sugerowane minimum dowodów to: identyfikator kościoła, identyfikator programu, znormalizowany numer telefonu, opcjonalne zweryfikowane powiązanie z osobą, twierdzące działanie, identyfikator zgłoszenia/formularza lub sprawdzony zewnętrzny dowód, czas serwerowy, tekst i wersja informacji, adres URL źródła, adresy URL zasad oraz zdarzenia wycofania i ponownego rozpoczęcia. Ogranicz dostęp i czas przechowywania zgodnie z istniejącą polityką bezpieczeństwa danych kościoła.

Używaj stanów takich jak `unknown`, `pending`, `active` i `suppressed`. Istniejące numery komórkowe, importowane kontakty, obecność, dary, członkostwo w grupach, `person.optedOut = false` oraz `allowSms` nie są twierdzącą zgodą na program. Import udokumentowanej zgody powinien być działaniem wymagającym uprawnień, audytowanym i z zapisanym źródłem; migracja nie może zapisywać do programu wszystkich.

W pierwszym przepływie internetowym używaj standardowego trybu formularza publicznego B1. Dodaj jawnie skonfigurowane pytanie o zgodę na SMS, które startuje odznaczone, pozostaje opcjonalne, wyświetla klikalne linki do zasad i odwzorowuje się na jeden program oraz jedno pole telefonu komórkowego. Sprawdzaj to odwzorowanie po stronie serwera i zapisuj wyświetlaną informację w momencie zapisania twierdzącej odpowiedzi. Nigdy nie wyprowadzaj zgody z dowolnych etykiet pytań, konwersacyjnej sztucznej inteligencji ani członkostwa w przepływie pracy. Ekwiwalent konwersacyjny włącz dopiero po przetestowaniu jawnej, twierdzącej interakcji i zapisu dowodów.

Odznaczone zgłoszenie nie tworzy subskrypcji i nie może wycofywać cudzej, istniejącej zgody. Wiąż zgodę z podanym numerem telefonu; personel może rozstrzygać niejednoznaczne powiązania z osobami bez scalania rekordów gospodarstw domowych. Zmieniony numer komórkowy wymaga osobnej zgody. Dla formularzy anonimowych stosuj zabezpieczenia przed nadużyciami, a każdy krok weryfikacji właściciela numeru lub podwójnego potwierdzenia uczyń jawnym: samo zaznaczone pole nie dowodzi, kto jest właścicielem telefonu. Jeśli używasz potwierdzenia, pozostaw subskrypcję w stanie oczekującym do jego ukończenia i opisz ten dokładny przepływ w materiałach rejestracyjnych.

Dla Twilio oddziel blokadę SMS od widoczności w katalogu. Zachowawczo przenieś każdą starą rezygnację do rekordu blokady; pozostałych dawnych odbiorców zostaw w stanie `unknown`. Jawne, udokumentowane nowe zapisanie może ustanowić zgodę na SMS, podczas gdy prywatność katalogu pozostaje bez zmian. Zachowaj dotychczasowe działanie innych dostawców do czasu osobnego przeglądu ich migracji.

Przy każdej rzeczywistej wysyłce wymagaj: włączonej i gotowej integracji kościoła, aktualnej zgody na program dla dokładnego numeru telefonu, braku blokady na poziomie numeru oraz istniejącego uprawnienia osoby wywołującej. Przypomnienia dodatkowo uwzględniają `allowSms`, preferencje kategorii i ciche godziny. Sprawdź ponownie po umieszczeniu w kolejce, rozwiąż pola scalania, znormalizuj i zweryfikuj numery oraz usuń duplikaty według numeru telefonu. STOP blokuje wszystkie wysyłki dla usługi/programu, w tym ręczne i z przepływów pracy; musi też obejmować każdą osobę, która korzysta z tego samego numeru telefonu.

Renderuj identyfikację kościoła i instrukcję STOP w spójny sposób we wspólnej ścieżce wysyłki Twilio oraz pokazuj podgląd końcowej liczby SMS-ów i segmentów. Rozwijanie pól scalania i obsługa długości muszą zachowywać te elementy; nie obcinaj po cichu instrukcji rezygnacji. Przykłady i rzeczywiste szablony przypomnień oraz przepływów pracy muszą pozostać zgodne.

## Wysyłki Twilio, odpowiedzi i stan doręczenia

Zaimplementuj `TwilioProvider.sendMessage` przez Messages API z wybranym Messaging Service i nadawcą. Zwracaj identyfikator wiadomości (SID) u dostawcy oraz wynik „przyjęto/przesłano”; akceptacja HTTP nie oznacza doręczenia na urządzenie. Wysyłka grupowa zwraca wyniki dla każdego odbiorcy w kolejności danych wejściowych.

Ogranicz współbieżność wysyłek wychodzących zarówno dla `sendBulk`, jak i dla pojedynczych wysyłek: obecna gałąź scalania pól rozgałęzia wywołania `sendMessage`. Zapisuj zamiar wysyłki i zadania możliwe do przejęcia dla grup, które nie mieszczą się w budżecie jednego żądania; wykorzystaj istniejący model wdrożenia zamiast wymagać od kościołów uruchamiania kolejnej usługi. Ponawiaj znane przejściowe błędy i błędy limitów przez backoff. Traktuj niejednoznaczne przekroczenia czasu jako wyniki nieznane, które należy uzgodnić, a nie polecenie ślepego ponownego wysłania, które ryzykuje duplikaty wiadomości i opłat.

Skonfiguruj adresy URL webhooków przychodzących i statusów dla każdego kościoła osobno. Weryfikuj `X-Twilio-Signature` za pomocą SDK, dokładnego skonfigurowanego zewnętrznego adresu URL, oryginalnych parametrów formularza oraz odpowiadającego Auth Token konta. Sam sekretny adres URL nie wystarcza. Dopasowuj wywołania zwrotne do zapisanych rekordów kościoła, konta i wiadomości; obsługuj duplikaty oraz wywołania przychodzące przed zapisaniem wyniku wysyłki; zapobiegaj nadpisywaniu stanu końcowego przez starsze zdarzenia. Dla potwierdzenia odpowiedzi przychodzącej zwracaj pusty TwiML, a dla zdarzeń statusu odpowiednią odpowiedź sukcesu. [Bezpieczeństwo Twilio](https://www.twilio.com/docs/usage/security), [wywołania zwrotne statusu](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Zalecamy **Advanced Opt-Out** w Messaging Service. Twilio zarządza potwierdzeniami STOP/START/HELP, a B1 odczytuje uwierzytelnione zdarzenia `OptOutType` bez wysyłania zduplikowanych potwierdzeń. STOP natychmiast zapisuje blokadę. START przywraca wyłącznie znaną subskrypcję do tego samego ujawnionego programu, wraz z nowym zdarzeniem ponownego rozpoczęcia; nie może zapisać nowego numeru do niepowiązanych wiadomości ani włączać preferencji przypomnień. HELP nikogo nie zapisuje. Inne przychodzące odpowiedzi pozostają poza zakresem skrzynki odbiorczej B1; kościoły potrzebują udokumentowanego sposobu monitorowania ich w Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Przechowuj SID wiadomości Twilio, powiązanie konta i usługi, czas przesłania, końcowy status/kod błędu oraz czas wywołania zwrotnego obok dziennika wysyłek. Wyświetlaj dokładnie stany: w kolejce/przyjęto, doręczono, nie powiodło się, niedoręczono lub nieznany. Zachowaj istniejący kontrakt odpowiedzi dla innych dostawców i określ, czy zbiorcze liczniki sukcesu oznaczają przesłanie, czy doręczenie.

## Kontrola gotowości konfiguracji i weryfikacja zatwierdzenia

Pokazuj odrębne punkty kontrolne dla poświadczeń, własności usługi i nadawcy, weryfikacji kampanii, rejestracji numeru, kontroli webhooków oraz doręczonego testu end-to-end. Nigdy nie pokazuj pojedynczej zielonej odznaki „zatwierdzono” tylko dlatego, że poświadczenia działają.

Dla lokalnych numerów US odczytaj [zasób kampanii Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) usługi i wymagaj, aby odpowiednia kampania miała status `VERIFIED`. Osobno sprawdź, czy wybrany numer jest powiązany z tą usługą i ukończył rejestrację numeru: zatwierdzona kampania może mieć numer wciąż oczekujący. Jeśli obsługiwany odczyt API nie udostępnia wymaganego sygnału, pokaż **wymagana ręczna weryfikacja w Console** i zapisz datowane potwierdzenie administratora kościoła jako takie; nie oznaczaj go jako zweryfikowanego przez API. Automatyczne zdarzenia rejestracji numeru mogą być zadaniem na później. [Błędy rejestracji numeru](https://www.twilio.com/docs/api/errors/30035), [zdarzenia rejestracji A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Wymagaj aktualnych kontroli przed włączeniem wysyłek; zapisuj, kiedy i jak sprawdzono gotowość, wygaszaj nieaktualne kontrole i wstrzymuj wysyłki przy cofniętych poświadczeniach, zmienionych nadawcach, błędach rejestracji lub uporczywych błędach konta. Doręczenie testu potwierdza jedynie testowaną ścieżkę, a nie powszechne zatwierdzenie przez operatorów ani zgodę odbiorcy. Towarzyszący projekt określa kontrole kościoła przed złożeniem wniosku, przed uruchomieniem i w bieżącej eksploatacji.

## Plan repozytorium i wydania

[Przewodnik organizacji dotyczący wkładu](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) kieruje prośby o funkcje B1 do ChurchAppsSupport, a PR-y z implementacją do odpowiednich repozytoriów. Użyj jednego centralnego zgłoszenia funkcji i połącz z nim skoncentrowane PR-y z implementacją:

1. **ChurchAppsSupport:** przejrzyj ten projekt i jego projekt wdrożenia, zanim przedstawisz Twilio jako dostępną funkcję dla użytkowników.
2. **Packages:** dodaj adapter Twilio, jawną wspólną konfigurację/interfejsy oraz renderowanie formularza zgody na SMS tam, gdzie jest współdzielone przez B1Admin/B1App. Dołącz changesety i opublikuj je przez istniejący przepływ wydania, zanim zaktualizujesz konsumentów.
3. **Api:** dodaj addytywne migracje dla metadanych integracji, zgód/blokad i stanów doręczeń; zaimplementuj walidację konfiguracji, wspólne bramki wysyłki, zapis dowodów z formularza, obsługę webhooków oraz trwałe zapisywanie wysyłek.
4. **B1Admin:** dodaj interfejs konfiguracji i gotowości Twilio, zarządzanie programem i zgodami, zapis nadawcy zależny od dostawcy oraz dokładne raportowanie doręczeń. Nie udostępniaj żadnego nadpisania zgody na SMS w zwykłej edycji osoby.
5. **B1App:** zweryfikuj publiczny formularz/stronę i doświadczenie linków do zasad względem wspólnych kontrolek, w tym dla odwiedzających anonimowo i z urządzeń mobilnych. Oddzielny klient przeglądarkowy Twilio nie jest potrzebny.
6. **ChurchAppsSupport:** po wydaniu przekształć projekt wdrożenia w obsługiwane strony ustawień i pomocy, dodaj rzeczywiste zrzuty ekranu, połącz je z ustawieniami wysyłki SMS i zorganizuj tłumaczenia.

Wdrażaj schemat i pakiety wspólne przed konsumentami. Utrzymuj Twilio za flagą funkcji dla małego, opt-in pilota; istniejący dostawcy muszą nadal działać. Wycofanie wyłącza wysyłkę przez Twilio i anuluje niewysłane zadania, zachowując blokady i dowody; nie może automatycznie przełączać odbiorców na innego dostawcę ani innego nadawcę.

## Ocena nakładu pracy

Szacunek planistyczny dla współtwórcy znającego ekosystem; w tej ocenie nie użyto produkcyjnych poświadczeń ani rzeczywistych SMS-ów:

| Praca | Dni programistyczne |
|---|---|
| Adapter, rozszerzenia konfiguracji i schematu, interfejs ustawień | 2–3 |
| Zgoda na poziomie telefonu/programu, niezależna blokada, wspólne bramki wysyłki, integracja z formularzem publicznym | 3–5 |
| Podpisane wywołania zwrotne, trwałość doręczeń, ograniczona i trwała wysyłka | 2–3 |
| Interfejs gotowości, przewodnik dla kościołów, testy integracyjne i regresyjne, poprawki pilota | 3–4 |
| **Zalecany zakres startowy** | **10–15 łącznie** |

Podstawowy adapter/proof of concept ustawień to około 1–2 dni. Szacunek dla samego nadawcy nie obejmuje pracy nad zgodami i wdrożeniem, która jest niezbędna do tej rekomendacji. Czas zewnętrznego przeglądu Twilio i operatorów jest oddzielny i zmienny; projekt nie powinien obiecywać daty zatwierdzenia ani jego wyniku.

## Kryteria akceptacji

- [ ] Kościół jest właścicielem i opłaca konto, usługę, zarejestrowanego nadawcę i kampanię; nie jest wymagane konto Twilio zarządzane przez ChurchApps.
- [ ] Poświadczenia są szyfrowane i maskowane, ograniczone do dzierżawcy, podlegają rotacji i nie występują w logach ani w treściach publicznych; walidacja jest tylko do odczytu.
- [ ] Opcjonalna, odznaczona zgoda renderuje rzeczywiste linki do zasad i zapisuje po stronie serwera dowody programu, numeru telefonu i informacji; odmowa nadal pozwala na podstawową akcję formularza.
- [ ] Wszystkie ścieżki ręczne, grupowe, scalania pól, przepływów pracy i przypomnień egzekwują tę samą bramkę kwalifikacji Twilio. Odbiorcy nieznani, bez zgody, ze zmienionym numerem lub zablokowani są pomijani z użyteczną przyczyną; renderowanie zachowuje identyfikację kościoła i instrukcje STOP po rozwinięciu i obsłudze długości.
- [ ] Stara prywatność katalogu nie zapisuje odbiorców do programu; STOP/START nigdy nie zmienia widoczności w katalogu ani niepowiązanych preferencji. Przypadki wspólnego numeru telefonu i wielu kościołów są przetestowane.
- [ ] Podpisane STOP/START/HELP, nieprawidłowe podpisy, błędne konta/usługi, zduplikowane zdarzenia, powtórzone zgłoszenia formularzy i sfałszowane odwzorowania zgód są objęte testami.
- [ ] Rozmiar grupy/przekroczenia czasu, limity szybkości, częściowe niepowodzenia, niejednoznaczne wyniki, wyścigi wywołań zwrotnych i zdarzenia doręczenia w złej kolejności są testowane bez zduplikowanych wysyłek.
- [ ] Zatwierdzenie kampanii i ukończona rejestracja numeru są oddzielone od walidacji poświadczeń. Dowody ręczne są wyraźnie oznaczone; nieaktualna lub cofnięta gotowość blokuje wysyłki.
- [ ] Pilotażowy kościół sprawdza swoją stronę zapisów, ścieżki odrzucenia i akceptacji formularza, dokładne adresy URL zasad oraz wyrażającego zgodę odbiorcę testowego: od zgłoszenia, przez doręczenie i blokadę STOP, po dozwolone ponowne zapisanie.
- [ ] Istniejące ustawienia i działanie wysyłki Clearstream, Text In Church i Nalo przechodzą testy regresyjne; tekst pomocy odróżnia propozycje od funkcji wydanych.
