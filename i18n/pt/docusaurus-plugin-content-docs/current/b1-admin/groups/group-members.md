---
title: "Membros do Grupo"
---

# Membros do Grupo

<div class="article-intro">

Depois de criar um grupo, o próximo passo é adicionar membros. Na página de detalhes de um grupo, você pode pesquisar pessoas, adicioná-las ao grupo, designar líderes, enviar mensagens e exportar a lista de membros. O gerenciamento de associação do grupo é essencial para coordenar grupos pequenos, comissões e classes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa ter pelo menos um grupo configurado em B1 Admin. Veja [Criando Grupos](creating-groups.md) se ainda não criou um.
- As pessoas que você deseja adicionar já devem existir no seu diretório de [Pessoas](../people/adding-people.md).

</div>

## Adicionando Membros a um Grupo

1. Navegue até a página de **Grupos** e clique no grupo que você deseja gerenciar.
2. Clique na guia **Membros**.
3. Na caixa de pesquisa, digite o nome da pessoa que você deseja adicionar.
4. Clique em **Adicionar** ao lado do nome da pessoa nos resultados da pesquisa.
5. A pessoa agora aparece na lista de membros do grupo.

:::tip
Deixe a caixa de pesquisa em branco e clique em **Pesquisar** para navegar pelo seu diretório inteiro. Isso é útil se você não tiver certeza da grafia exata do nome de alguém.
:::

## Designando Líderes do Grupo

Líderes do grupo têm privilégios especiais — eles podem editar o [calendário do grupo](group-calendar.md), gerenciar eventos e ajudar a coordenar o grupo.

1. Na lista de membros do grupo, encontre a pessoa que você deseja tornar líder.
2. Clique no **ícone de chave verde** ao lado do seu nome.
3. A pessoa agora é designada como líder do grupo.

Para remover o status de líder, clique no ícone de chave verde novamente.

:::info
Qualquer membro do grupo pode visualizar o calendário do grupo e eventos, mas apenas líderes podem adicionar ou editar eventos do calendário.
:::

## Enviando Mensagens para Membros do Grupo

Você pode se comunicar com todos os membros de um grupo diretamente do B1 Admin:

1. Na página de detalhes do grupo, procure pela área de mensagens.
2. Digite sua mensagem na caixa de texto.
3. Clique em **Enviar**.

Sua mensagem será entregue a todos os membros do grupo.

## Enviando E-mails para Membros do Grupo

Você pode enviar e-mails formatados para todos os membros de um grupo:

1. Na página de detalhes do grupo, clique no **ícone de e-mail**.
2. A caixa de diálogo Enviar E-mail é aberta, mostrando quantos membros receberão o e-mail e quantos não têm um endereço de e-mail registrado.
3. Opcionalmente, selecione um **modelo de e-mail** no menu suspenso ou componha uma mensagem do zero. Clique em **Gerenciar Modelos** para criar ou editar modelos.
4. Digite uma **linha de assunto**. Você pode inserir campos de mesclagem clicando nos chips do campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Componha o **corpo do e-mail** usando o editor HTML. Os mesmos campos de mesclagem estão disponíveis aqui.
6. Clique em **Enviar**.
7. Um resumo mostra quantos e-mails foram enviados com sucesso e quantos membros foram ignorados (nenhum e-mail registrado).

:::tip
Crie modelos de e-mail reutilizáveis para comunicações recorrentes, como atualizações semanais, anúncios de eventos ou pedidos de oração. Os modelos economizam tempo e garantem mensagens consistentes.
:::

## Exportando Dados do Grupo

Para baixar a lista de membros do grupo como um arquivo:

1. Na página de detalhes do grupo, clique no **ícone de download**.
2. Um arquivo CSV contendo as informações dos membros do grupo será baixado para seu computador.

Isso é útil para criar rosters impressos, importar dados em outras ferramentas ou manter registros offline. Para mais opções de exportação, veja [Exportando Dados](../people/exporting-data.md).

## Enviando Notificações Push para Membros do Grupo

Você pode enviar uma notificação push diretamente para todos os membros do grupo que têm o aplicativo B1.church instalado em seu dispositivo com notificações push ativadas.

1. Na página de detalhes do grupo, clique no **ícone de sino** na barra de ferramentas do cabeçalho (ao lado dos ícones de e-mail e SMS).
2. Uma caixa de diálogo é aberta mostrando quantos membros do seu grupo têm push ativado.
3. Preencha os detalhes da notificação:
   - **Título** *(obrigatório)* — Um resumo breve, até 80 caracteres.
   - **Mensagem** *(obrigatório)* — O corpo da notificação, até 240 caracteres.
   - **Abrir link ou URL do flyer** *(opcional)* — Um caminho relativo do aplicativo (por exemplo, `/mobile/groups`) ou uma URL completa `https://` que a notificação abre quando tocada.
   - **URL da imagem** *(opcional)* — Uma URL `https://` para uma imagem que aparece ao lado da notificação em dispositivos suportados.
4. Uma visualização ao vivo mostra como a notificação aparecerá no dispositivo.
5. Clique em **Enviar Notificação**.

:::info
Notificações push são entregues apenas para membros do grupo que têm o PWA B1.church instalado e não desabilitaram notificações push. Membros sem um dispositivo push registrado ou com push desativado são contados como ignorados, e o resumo de envio mostra quantos foram alcançados versus ignorados.
:::

:::tip
Após enviar, a caixa de diálogo mostra quantas notificações foram enfileiradas com sucesso. Se a maioria dos membros estiver sendo exibida como ignorada, lembre-os de visitar seu site B1.church, instalá-lo como um aplicativo de tela inicial e permitir notificações quando solicitado.
:::

## Removendo Membros

Para remover alguém de um grupo, localize o seu nome na lista de membros e clique no botão **remover** ao lado da sua entrada.

:::info
Remover uma pessoa de um grupo não a exclui do seu diretório da igreja. Ela ainda aparecerá na seção [Pessoas](../people/adding-people.md) e pode ser readicionada ao grupo a qualquer momento.
:::
