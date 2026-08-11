---
title: "Configurações de Aplicativo Móvel"
---

# Configurações de Aplicativo Móvel

<div class="article-intro">

A página de Configurações do Aplicativo Móvel permite que você configure as abas de navegação que aparecem na **experiência móvel de B1.church (PWA)** para os membros de sua igreja. Você controla quais abas são visíveis, para onde elas vinculam e como são exibidas.

</div>

:::info O aplicativo nativo B1 Mobile foi descontinuado
As abas configuradas aqui são entregues através do [Aplicativo Web Progressivo (PWA) de B1.church](/docs/b1-church/getting-started/installing-pwa), que substituiu o aplicativo móvel nativo B1 Mobile. Compartilhe sua página de instalação da igreja — `https://suanomeireja.b1.church/mobile/install` — com os membros; ela os guia através da instalação do aplicativo em seus dispositivos, sem necessidade de download da App Store ou Google Play.
:::

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Editar Configurações da Igreja". Consulte [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Configure suas [Configurações da Igreja](./church-settings.md) primeiro, incluindo o nome e marca de sua igreja

</div>

## Acessando Configurações de Aplicativo Móvel

1. Em B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Configurações**.
2. Clique no botão **Aplicativos Móveis** no cabeçalho.
3. A página de Configurações de Aplicativo Móvel exibe suas abas de aplicativo atuais.

## Adicionando uma Nova Aba

1. Clique no botão **Adicionar Aba** no topo da página.
2. Preencha os detalhes da aba:
   - **Nome** -- O rótulo que aparece na aba (por exemplo, "Sermões" ou "Doação").
   - **Ícone** -- Clique no seletor de ícone para escolher um ícone para sua aba. Você também pode carregar uma imagem personalizada.
   - **Tipo de Aba** -- Selecione entre opções como Bíblia, Transmissão Ao Vivo, Doação, Website e mais.
   - **URL** -- Digite o endereço web para o qual a aba deve vincular.
   - **Visibilidade** -- Controle quem pode ver esta aba (todos, apenas membros, etc.).
3. Clique em **Salvar Aba** para adicioná-la ao seu aplicativo.

## Editando uma Aba Existente

1. Clique em qualquer aba existente na lista **Abas do Aplicativo**.
2. Atualize o nome, ícone, URL, tipo ou configurações de visibilidade da aba.
3. Clique em **Salvar Aba** para aplicar suas alterações.

## Reordenando Abas

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Arraste e solte abas na lista para reorganizá-las. A ordem mostrada nesta página corresponde à ordem que seus membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando certas condições são atendidas -- por exemplo, uma aba de Transmissão Ao Vivo pode aparecer quando uma transmissão está ativa. As abas adicionadas manualmente lhe dão controle total sobre o que seus membros veem o tempo todo.
:::

:::tip
Mantenha a contagem de abas gerenciável. Três a cinco abas funcionam bem para a maioria das igrejas. Muitas abas podem tornar a navegação confusa para seus membros.
:::

## Configurações de Diretório de Membros e Mensagens

A aba **B1 Mobile** na mesma seção de Aplicativos Móveis contém as configurações que governam o diretório de membros e mensagens privadas na experiência de B1.church:

- **Grupo de Aprovação de Diretório** -- O grupo que revisa as atualizações do diretório de membros antes de serem aplicadas.
- **Mostrar no Diretório** -- Quem pode aparecer no diretório de membros (Apenas Equipe através de Todos).
- **Preferências de Visibilidade** -- Visibilidade padrão para endereços de membros, números de telefone e endereços de email.
- **Idade Mínima para Mensagens Privadas** -- Um controle de segurança infantil. B1 não abrirá uma **nova** conversa de mensagem privada quando qualquer pessoa tiver menos da idade indicada, com base em sua data de nascimento (a função de membro da família é usada como alternativa quando nenhuma data de nascimento está registrada). Pessoas com menos da idade permanecem totalmente visíveis no diretório -- apenas mensagens diretas são bloqueadas, em **ambas as direções**, para todos, incluindo equipe. Conversas em grupo e mensagens para os pais de uma criança ainda funcionam. As opções são Desligado, 13, 16 ou 18; o padrão é **18**. As conversas existentes não são afetadas.

:::tip
Porque a verificação de idade mínima depende de datas de nascimento, certifique-se de que as datas de nascimento estejam preenchidas para crianças em sua congregação. Esta configuração pertence à mesma família de segurança infantil que os [controles de segurança de check-in](../attendance/checkin-safety.md).
:::

## Onde Essas Abas Aparecem

As abas que você configura aqui são exibidas no **PWA de B1.church** que seus membros instalam em qualquer página em `https://suanomeireja.b1.church`. As alterações que você faz nesta página são refletidas na próxima vez que um membro abre o aplicativo. (As abas também são renderizadas pelo [aplicativo móvel nativo B1 Mobile](/docs/b1-mobile/) legado para qualquer membro ainda executando-o, mas esse aplicativo foi descontinuado e não está mais sendo atualizado.)

## Próximas Etapas

- [Configurações da Igreja](./church-settings.md) -- Configure as informações e marca de sua igreja
- [Funções e Permissões](./roles-permissions.md) -- Gerencie o acesso para sua equipe
