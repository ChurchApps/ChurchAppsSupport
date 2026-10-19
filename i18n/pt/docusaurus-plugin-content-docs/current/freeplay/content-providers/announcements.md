---
title: "Anúncios"
---

# Anúncios

<div class="article-intro">

O FreePlay pode reproduzir em loop uma pasta de slides de anúncios na sua TV — por exemplo, no saguão ou antes do início das aulas. Você escolhe uma pasta de um dos seus provedores de conteúdo conectados, o FreePlay baixa os slides para o dispositivo e um item **Announcements** aparece na barra lateral para que você possa iniciar o loop a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Conecte-se a um provedor de conteúdo](./connecting-providers) que tenha os seus slides de anúncios, como Dropbox ou OneDrive
- Coloque as imagens ou vídeos que você quer reproduzir em loop em uma única pasta nesse provedor

</div>

## Escolhendo a Pasta de Anúncios

1. Abra **Settings** na parte inferior da barra lateral e selecione **Providers**
2. Selecione o provedor conectado que contém os seus slides (ele mostra um selo **Connected**) para abrir as suas **Provider Settings**
3. Selecione **Use for Announcements**
4. O navegador **Choose the Announcements Folder** abre. Navegue pelas pastas até encontrar aquela com os seus slides e selecione essa pasta (ou qualquer arquivo dentro dela)
5. O FreePlay baixa os slides e volta para as **Provider Settings**, onde a linha agora mostra **Looping "*nome da pasta*" -- *número* slides downloaded**

Apenas uma pasta é usada para anúncios por vez. Escolher uma pasta de outro provedor substitui a anterior.

## Reproduzindo os Anúncios

Depois que os slides forem baixados, um item **Announcements** aparece perto do topo da barra lateral (abaixo de **Today's Plan**, se a sua TV o mostrar). Selecione-o para iniciar o loop.

- As imagens permanecem na tela por 15 segundos, a menos que o provedor defina uma duração própria para o arquivo
- Os vídeos são reproduzidos até o fim antes de passar para o próximo slide
- Após o último slide, o loop recomeça pelo primeiro
- Se a pasta tiver um único vídeo, ele se repete continuamente

O loop é reproduzido a partir dos arquivos salvos no dispositivo, então continua funcionando sem conexão com a internet. Você pode usar os mesmos controles remotos de qualquer outro conteúdo — consulte [Reproduzindo Conteúdo](./playing-content).

## Atualizando os Slides

O FreePlay verifica a pasta de anúncios sempre que o app é iniciado, baixa os novos slides e remove os slides que foram excluídos da pasta.

Para verificar imediatamente, abra as **Provider Settings** do provedor e selecione **Check for Announcement Updates**. A linha mostra **Up to date** com a quantidade de slides quando terminar.

:::info
Se o FreePlay não conseguir acessar o provedor, ou se a pasta voltar vazia, ele continua reproduzindo os slides que já tem. Para parar de usar anúncios por completo, desative-os conforme descrito abaixo.
:::

:::warning
Um slide substituído por uma nova versão com o mesmo nome de arquivo não é baixado novamente. Para alterar um slide, adicione-o como um novo arquivo e exclua o antigo.
:::

## Desativando os Anúncios

Abra as **Provider Settings** do provedor e selecione **Use for Announcements** novamente. O FreePlay deixa de usar a pasta, apaga os slides baixados do dispositivo e remove **Announcements** da barra lateral.

Desconectar o provedor também desativa os anúncios que vieram dele.

## Artigos Relacionados

- **[Conectando a Provedores](./connecting-providers)** — Conecte o provedor que contém os seus slides
- **[Navegando e Baixando Conteúdo](./browsing-content)** — Navegue pelas pastas de um provedor e reproduza conteúdo sob demanda
- **[Reproduzindo Conteúdo](./playing-content)** — Controles do player com o controle remoto da TV
