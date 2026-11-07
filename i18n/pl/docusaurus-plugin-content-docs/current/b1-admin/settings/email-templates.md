---
title: "Szablony wiadomości e-mail"
---

# Szablony wiadomości e-mail

<div class="article-intro">

Szablony wiadomości e-mail pozwalają zapisać treści, które można wielokrotnie wykorzystywać -- powitanie, przypomnienie o wydarzeniu, podziękowanie za dar -- dzięki czemu Ty (lub [przepływ pracy](../serving/workflows.md)) możesz wysłać je jednym kliknięciem, zamiast pisać od nowa za każdym razem. Ta sama lista zawiera również szablony wiadomości tekstowych SMS, używanych w oknach Wiadomość SMS dla grup i osób.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Potrzebujesz dostępu do sekcji Ustawienia w B1 Admin.

</div>

## Otwieranie szablonów wiadomości e-mail

1. W B1 Admin otwórz [menu Skok](../introduction.md#getting-around-with-the-jump-menu) (pasek wyszukiwania w lewym górnym rogu) i rozwiń pozycję **Ustawienia**.
2. Kliknij **Szablony wiadomości e-mail**.
3. Zobaczysz listę istniejących szablonów wraz z ich tematem, kategorią i datą ostatniej modyfikacji.

## Tworzenie szablonu

1. Kliknij **Nowy szablon**.
2. Wpisz **Nazwę szablonu**, aby łatwo go rozpoznać na liście, i wybierz **Kategorię** (Ogólne, Wydarzenia, Grupy, Dary, Powitanie lub SMS), co pomoże uporządkować szablony. Wybierz **SMS**, aby utworzyć szablon wiadomości tekstowej (patrz [Szablony SMS](#text-templates) poniżej).
3. Wpisz wiersz **Temat**.
4. Napisz **Treść**, korzystając z edytora tekstu sformatowanego.
5. Kliknij **Zapisz**.

## Pola scalania

Kliknij znacznik pola scalania nad polem Temat lub Treść, aby wstawić je w miejscu kursora -- najpierw kliknij w tekst, w którym chcesz umieścić pole, a następnie kliknij znacznik. Kursor pozostaje na swoim miejscu, więc możesz od razu dalej pisać za wstawionym polem. Jeśli klikniesz znacznik treści bez wcześniejszego kliknięcia w pole treści, pole zostanie dodane na końcu treści. Po wysłaniu wiadomości każde pole scalania zostaje zastąpione rzeczywistymi danymi odbiorcy:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Imię i nazwisko odbiorcy
- `{{email}}` -- Adres e-mail odbiorcy
- `{{churchName}}` -- Nazwa Twojego kościoła

## Szablony SMS

Szablon z kategorią **SMS** to zwykła wiadomość tekstowa, a nie e-mail:

- Nie ma tematu. Edytor tekstu sformatowanego zostaje zastąpiony prostym polem **Wiadomość SMS**, które mieści do 1600 znaków.
- Znaczniki pól scalania nad polem wstawiają w miejscu kursora `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` lub `{{churchName}}`.
- Szablony SMS pojawiają się w liście **Wczytaj szablon (opcjonalnie)** w oknie SMS dla [grupy](../groups/group-members.md#texting-group-members) lub pojedynczej osoby. Wybór szablonu wypełnia wiadomość, którą nadal możesz edytować przed wysłaniem.
- Nie są uwzględniane na listach szablonów e-mail, w tym w działaniu przepływu pracy **Wyślij e-mail**.

Wysyłanie SMS-ów wymaga połączenia z [dostawcą usług SMS](./church-settings.md#texting).

## Podgląd szablonu

Kliknij **Podgląd**, aby zobaczyć, jak będą wyglądać temat i treść z przykładowymi danymi w polach scalania, zanim zapiszesz lub wyślesz wiadomość.

## Używanie szablonu

Zapisane szablony można wybrać podczas tworzenia wiadomości e-mail do osób lub grupy, a także jako działanie w [przepływach pracy](../serving/workflows.md). Zanim Twój kościół będzie mógł je wysyłać, zespół ChurchApps musi jednorazowo zatwierdzić korzystanie z e-maili grupowych. Zobacz [Włączanie e-maili grupowych dla Twojego kościoła](../groups/group-members.md#turning-on-group-email-for-your-church).

## Edytowanie i usuwanie

Kliknij ikonę **Edytuj** obok szablonu, aby go zaktualizować, lub ikonę **Usuń**, aby trwale go usunąć.

## Dalsze kroki

- [Przepływy pracy](../serving/workflows.md) -- Automatyczne uruchamianie wiadomości e-mail na podstawie szablonu według reguł
