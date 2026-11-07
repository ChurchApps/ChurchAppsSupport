---
title: "Rozpatrywanie próśb o usunięcie konta"
description: "Zatwierdzaj lub odrzucaj wnioski członków o usunięcie konta w B1 Admin, kieruj je do Directory Approval Group i dotrzymuj 30-dniowego terminu RODO."
---

# Rozpatrywanie próśb o usunięcie konta

<div class="article-intro">

Gdy kościół ma skonfigurowaną grupę zatwierdzającą katalog (Directory Approval Group), usunięcie konta nie następuje już natychmiast. Prośba członka staje się zadaniem, które grupa zatwierdzająca sprawdza, zanim cokolwiek zostanie usunięte. Ta strona wyjaśnia, jak składana jest prośba, jak ją zatwierdzić lub odrzucić oraz co dzieje się w każdym przypadku.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Grupa **Directory Approval Group** musi być skonfigurowana w **Mobile &rarr; Member portal**. Bez niej kliknięcie **Delete my account** na stronie Profilu nadal usuwa konto natychmiast, bez etapu weryfikacji. Zobacz [Ustawienia aplikacji mobilnej](../settings/mobile-app.md).
- Zatwierdzanie lub odrzucanie prośby wymaga uprawnienia **People &gt; Edit**.

</div>

## Jak członek składa prośbę o usunięcie

Prośbę o usunięcie konta składa się na stronie **My Profile**, czyli na tej samej wspólnej stronie konta, która jest opisana w [Zarządzanie profilem](./managing-profile.md), w sekcji **Account Deletion**. Gdy grupa zatwierdzająca jest skonfigurowana, potwierdzenie prośby niczego od razu nie usuwa. Zamiast tego system:

1. Tworzy otwarte zadanie o tytule **„Account deletion request”**, przypisane do grupy Directory Approval Group, w sekcji **Serving &rarr; My Work**.
2. Wyłącza przycisk **Delete my account** dla tej osoby i wyświetla informację, że prośba czeka na rozpatrzenie.

Wysłanie kolejnej prośby, gdy jedna jest już otwarta, tylko ponownie otwiera to samo zadanie. Jedna osoba może mieć jednocześnie tylko jedną oczekującą prośbę o usunięcie konta.

## Rozpatrywanie prośby

1. Przejdź do **Serving &rarr; My Work** (lub do **Assigned to My Groups** na pulpicie). To samo miejsce, w którym pojawiają się [prośby o zmianę profilu](./approving-profile-changes.md).
2. Otwórz zadanie o tytule **„Account deletion request from *Name*”**.
3. Zobaczysz dwie czynności: **Approve deletion** i **Decline**.

### Zatwierdzanie

Potwierdź komunikat **„Permanently anonymize this person's record and remove their login? This cannot be undone.”**. Spowoduje to zastąpienie danych osobowych tej osoby ogólnymi wartościami (ta sama anonimizacja, której używa czynność **Data Management &gt; Anonymize** na rekordzie osoby; zobacz [Bezpieczeństwo danych](../settings/data-security.md)) oraz usunięcie jej loginu. Zadanie zamyka się automatycznie, a członek otrzymuje powiadomienie, że jego prośba została zatwierdzona.

### Odrzucanie

Odrzucenie wymaga podania powodu, ponieważ RODO dopuszcza odmowę realizacji żądania usunięcia danych wyłącznie w przypadku wyjątku prawnego:

- **Przechowywanie ze względów prawnych** (dokumentacja dotycząca darowizn, podatków lub zatrudnienia)
- **Potrzebne do dochodzenia roszczeń prawnych**
- **Inne**: wyjaśnij w polu tekstowym (co najmniej 10 znaków)

Członek otrzymuje powiadomienie o decyzji wraz z podanym przez Ciebie powodem. Może ponownie złożyć prośbę lub, jeśli się nie zgadza, zgłosić sprawę organowi nadzorczemu.

:::info
Kościoły mają 30 dni na odpowiedź na żądanie usunięcia danych. Zadanie ma termin za 28 dni, a grupa zatwierdzająca otrzymuje automatyczne przypomnienia, jeśli zadanie nadal jest otwarte po 21 i 27 dniach.
:::

:::tip
Prośby o usunięcie konta i prośby o zmianę profilu korzystają z tej samej grupy Directory Approval Group i tego samego przepływu przeglądu opartego na zadaniach. Jeśli musisz także rozpatrywać prośby o aktualizację katalogu, zobacz [Zatwierdzanie zmian profilu](./approving-profile-changes.md).
:::

## Powiązane artykuły

- [Zarządzanie profilem](./managing-profile.md): miejsce, w którym członkowie składają prośbę o usunięcie własnego konta
- [Zatwierdzanie zmian profilu](./approving-profile-changes.md): podobny przepływ przeglądu dla próśb o aktualizację katalogu
- [Bezpieczeństwo danych](../settings/data-security.md): zgodność z RODO i anonimizacja inicjowana przez administratora
- [Ustawienia aplikacji mobilnej](../settings/mobile-app.md): konfiguracja grupy Directory Approval Group
