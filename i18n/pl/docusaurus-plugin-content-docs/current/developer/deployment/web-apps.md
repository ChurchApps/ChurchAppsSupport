---
title: "Implementacja aplikacji internetowej"
---

# Implementacja aplikacji internetowej

<div class="article-intro">

Aplikacje internetowe ChurchApps są wdrażane jako statyczne witryny w **Amazon S3**, a **CloudFront** pełni rolę sieci CDN. Wdrożenia są automatyzowane za pomocą GitHub Actions, ale w razie potrzeby można je też uruchomić ręcznie.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Skonfiguruj aplikację internetową lokalnie i sprawdź, czy się buduje -- zobacz [Aplikacje internetowe](../web-apps/)
- Skonfiguruj poświadczenia AWS z dostępem do S3 i CloudFront
- Poznaj nazwę docelowego zasobnika S3 oraz identyfikator dystrybucji CloudFront

</div>

## Kroki wdrożenia

1. **Zbuduj aplikację** -- wygeneruj statyczne pliki wyjściowe:

   ```bash
   npm run build
   ```

2. **Synchronizuj z S3** -- prześlij pliki wyjściowe do zasobnika S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Unieważnij pamięć podręczną CloudFront** -- wyczyść pamięć podręczną CDN, aby użytkownicy otrzymali najnowszą wersję:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Automatyczne wdrożenia

Przepływy pracy GitHub Actions obsługują wdrożenie automatycznie przy każdym wysłaniu zmian do gałęzi `main`. Przepływ wykonuje wszystkie trzy kroki opisane powyżej -- budowanie, synchronizację z S3 i unieważnienie pamięci podręcznej CloudFront -- bez ręcznej interwencji.

:::info
Zazwyczaj nie musisz uruchamiać tych poleceń ręcznie. Scalenie żądania ściągnięcia do gałęzi `main` uruchamia zautomatyzowany proces wdrożenia.
:::

:::tip
Jeśli chcesz sprawdzić build lokalnie przed wdrożeniem, uruchom `npm run build` i przejrzyj wynik w katalogu `build/`. Możesz go uruchomić lokalnie za pomocą dowolnego serwera plików statycznych, aby upewnić się, że wszystko działa.
:::

## Powiązane artykuły

- **[Aplikacje internetowe](../web-apps/)** -- Przewodniki konfiguracji dla B1Admin, B1App i LessonsApp
- **[Wdrożenie API](./apis)** -- Wdrażanie usług zaplecza API
- **[Wdrożenie aplikacji mobilnych](./mobile)** -- Publikowanie aplikacji mobilnych w sklepach z aplikacjami
