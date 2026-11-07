---
title: "Parowanie urządzenia"
description: "Paruj telewizor FreePlay z typem planu w B1 Admin czteroliterowym kodem z ekranu, potem pobierz media planu do trybu planu."
---

# Parowanie urządzenia

<div class="article-intro">

Aby korzystać z trybu planu, sparuj swój telewizor z typem planu w B1 Admin. FreePlay wyświetla na telewizorze krótki kod parowania. Wpisujesz ten kod w B1 Admin i wybierasz typ planu do wyświetlania. Telewizor automatycznie otrzymuje zawartość tego planu co tydzień.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj i uruchom FreePlay. Zobacz [Pierwsze kroki](../getting-started/index.md)
- Miej dostęp do **B1 Admin** na komputerze lub telefonie, aby ukończyć parowanie

</div>

## Generowanie kodu parowania

1. Na telewizorze otwórz **Ustawienia** na dole paska bocznego.
2. Wybierz **Sparuj z kalendarzem**.
3. FreePlay wyświetla czteroliterowy kod parowania dużymi literami, obok kodu QR.
4. Pod kodem migający wskaźnik **Oczekiwanie na potwierdzenie** pokazuje, że FreePlay czeka, aż zakończysz parowanie.

Ten sam kod działa w [trybie zaplanowanym](../scheduled-mode/index.md) w FreePlay Admin oraz w trybie planu w B1 Admin. Kod QR i adres **freeplay.church/pair** widoczne na ekranie otwierają FreePlay Admin. W przypadku trybu planu zignoruj je i wpisz kod w B1 Admin, zgodnie z opisem poniżej.

## Wpisywanie kodu w B1 Admin

1. W B1 Admin przejdź do **Profil** > **Urządzenia** i kliknij **Dodaj ekran**.
2. Wpisz cztery litery z telewizora w polu **Kod parowania**.
3. W sekcji **Pokaż plany dla** wybierz typ planu, który ma wyświetlać ten ekran, na przykład „Nabożeństwo niedzielne”.
4. Zapisz.

FreePlay co kilka sekund sprawdza, czy parowanie zostało zakończone. Gdy B1 Admin je potwierdzi, telewizor wyświetla **Połączono!** i przechodzi do ekranu pobierania planu.

## Pobieranie zawartości planu

Po sparowaniu FreePlay wczytuje bieżący plan dla tego typu planu. Wyświetla:

- Nazwę planu i datę nabożeństwa
- Nazwę lekcji, jeśli plan zawiera materiały lekcji
- Wskaźnik postępu pokazujący **Pobieranie elementu X z Y**

Gdy wszystkie pliki multimedialne zostaną pobrane, pojawi się przycisk **Rozpocznij plan**. Naciśnij **Wybierz** na pilocie, aby rozpocząć odtwarzanie.

:::tip
Plan odświeża się automatycznie co godzinę. Jeśli ktoś zaktualizuje plan w ciągu dnia, FreePlay sam pobierze zmiany.
:::

## Gdy parowanie się nie powiedzie

Jeśli FreePlay nie może wygenerować kodu parowania (na przykład z powodu problemu z siecią), zobaczysz komunikat o błędzie z przyciskiem **Spróbuj ponownie**. Upewnij się, że telewizor jest połączony z internetem, i spróbuj ponownie.

:::warning
Kody parowania wygasają po 15 minutach. Gdy stary kod straci ważność, FreePlay sam wyświetli nowy, a w dowolnym momencie możesz wybrać **Wygeneruj nowy kod**. Jeśli wpisany kod nie działa, użyj kodu, który telewizor wyświetla teraz.
:::

## Powiązane artykuły

- **[Przegląd trybu planu](./index.md)** - Czym tryb planu różni się od trybu zaplanowanego
- **[Parowanie ekranu](../scheduled-mode/pairing-a-screen.md)** - Zamiast tego sparuj ten sam telewizor z kalendarzem w FreePlay Admin
- **[Odtwarzanie zawartości](../content-providers/playing-content.md)** - Elementy sterowania odtwarzaczem podczas odtwarzania planu
