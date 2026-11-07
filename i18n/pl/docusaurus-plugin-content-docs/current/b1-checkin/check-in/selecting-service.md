---
title: "Wybór usługi"
description: "Wybierz nabożeństwo, w którym uczestniczysz, na ekranie usług w B1 Checkin. Wybór ustala godziny nabożeństw i grupy pokazywane w dalszej części zameldowania."
---

# Wybór usługi

<div class="article-intro">

Pierwszym krokiem każdego zameldowania jest wybór usługi, w której uczestniczysz. Ekran usług pojawia się zaraz po zakończeniu ładowania aplikacji i określa, które godziny usług oraz grupy są dostępne w dalszej części procesu zameldowania.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- [Zaloguj się](../getting-started/logging-in.md) do aplikacji B1 Church Checkin i wybierz swój kościół
- Upewnij się, że administrator kościoła [skonfigurował usługi i godziny usług](../../b1-admin/attendance/setup.md) w B1 Admin

</div>

## Jak to działa

1. Po zalogowaniu (lub po automatycznym logowaniu przy kolejnych wizytach) aplikacja wyświetla **ekran usług**.
2. Zobaczysz listę wszystkich usług skonfigurowanych dla Twojego kościoła. Każda usługa jest wyświetlana jako karta z nazwą usługi (na przykład „Niedzielne nabożeństwo poranne” lub „Środowe nabożeństwo wieczorne”).
3. Dotknij usługi, w której uczestniczysz.

Aplikacja wczytuje godziny usług i grupy przypisane do tej usługi, a następnie przechodzi do [ekranu wyszukiwania członków](./looking-up-members.md).

## Gdy zameldowanie nie jest otwarte

Jeśli administrator przypisał godzinie usługi [harmonogram zameldowania](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), aplikacja pozwala rodzinom wybrać tę godzinę usługi tylko wtedy, gdy jej okno zameldowania jest otwarte. Godziny usług, których okno jest obecnie zamknięte, nadal pojawiają się na [ekranie gospodarstwa domowego](./household-review.md), ale są oznaczone jako **Zamknięte** (na przykład **Zamknięte · otwiera się niedz. 9:30**) zamiast przycisku grupy.

Jeśli wszystkie godziny usługi, którą wybrałeś, są zamknięte, aplikacja informuje, kiedy zameldowanie zostanie otwarte – na przykład **„Zameldowanie na tę usługę otworzy się w niedzielę o 9:30.”** (Jeśli nie można pokazać godziny otwarcia, wyświetli się komunikat **„Zameldowanie na tę usługę nie jest obecnie otwarte.”**) Dotknij **Wstecz**, aby wrócić do listy usług i wybrać inną usługę, albo poczekaj, aż okno się otworzy, i spróbuj ponownie.

:::info
Okna zameldowania działają zgodnie ze strefą czasową kampusu, do którego należy usługa. Jeśli kampus nie ma ustawionej strefy czasowej, używana jest strefa czasowa Twojego kościoła. Jeśli godzina usługi wydaje się otwierać o niewłaściwej porze, poproś administratora o sprawdzenie strefy czasowej w ustawieniach kampusu lub kościoła. Na ekranie gospodarstwa domowego kiosk korzysta także z zegara tabletu do otwierania i zamykania godzin usług, dlatego upewnij się, że tablet ma prawidłowy czas i strefę czasową.
:::

:::info
Usługi są konfigurowane przez administratora kościoła w B1 Admin, w sekcji Frekwencja. Jeśli nie widzisz usługi, której się spodziewasz, poproś administratora o sprawdzenie, czy została utworzona w [ustawieniach frekwencji](../../b1-admin/attendance/setup.md).
:::

## Co dzieje się w tle

Po wybraniu usługi aplikacja pobiera z serwera trzy elementy:

- **Godziny usługi** dla tej usługi (na przykład jedna usługa może mieć godzinę 9:00 i 11:00).
- **Grupy** dostępne w każdej godzinie usługi (na przykład Żłobek, Przedszkole, Szkoła podstawowa).
- **Powiązania grup z godzinami usług**, które określają, jakie grupy są dostępne o jakich porach.

Dane te są zapisywane lokalnie w pamięci podręcznej, dzięki czemu dalsze etapy zameldowania są szybkie i responsywne.

:::tip
Jeśli Twój kościół ma skonfigurowaną tylko jedną usługę, nadal musisz ją dotknąć, aby przejść dalej. Aplikacja nie wybiera automatycznie jedynej usługi.
:::

## Następny krok

Po wybraniu usługi [wyszukasz swoją rodzinę](./looking-up-members.md) według numeru telefonu lub nazwiska.
