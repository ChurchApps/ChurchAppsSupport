---
title: "Configurações de Aplicativo Móvel"
---

# Configurações de Aplicativo Móvel

<div class="article-intro">

A página Mobile App Settings (Configurações de Aplicativo Móvel) permite que você configure as abas de navegação que aparecem na **B1.church mobile experience (PWA)** (experiência móvel B1.church) para os membros de sua igreja. Você controla quais abas são visíveis, para onde se vinculam e como são exibidas.

</div>

:::info O aplicativo móvel B1 nativo está descontinuado
As abas configuradas aqui são entregues através do [B1.church Progressive Web App (PWA)](/docs/b1-church/getting-started/installing-pwa), que substituiu o aplicativo móvel nativo B1. Compartilhe sua página de instalação da igreja — `https://yourchurchname.b1.church/mobile/install` — com os membros; ela os orienta na instalação do aplicativo em seu dispositivo, sem download da App Store ou Google Play.
:::

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão "Edit Church Settings" (Editar Configurações da Igreja). Consulte [Funções e Permissões](./roles-permissions.md) se você não tiver acesso.
- Configure suas [Configurações da Igreja](./church-settings.md) primeiro, incluindo o nome e marca de sua igreja

</div>

## Acessando Configurações de Navegação

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile** (Móvel).
2. Clique em **Navigation** (Navegação) (`/mobile/navigation`).
3. A página Navigation exibe suas abas de aplicativo atuais.

## Adicionando uma Nova Aba

1. Clique no botão **Add Tab** (Adicionar Aba) no topo da página.
2. Preencha os detalhes da aba:
   - **Name** (Nome) -- O rótulo que aparece na aba (por exemplo, "Sermons" (Sermões) ou "Give" (Doar)).
   - **Icon** (Ícone) -- Clique no seletor de ícone para escolher um ícone para sua aba. Você também pode carregar uma imagem personalizada.
   - **Tab Type** (Tipo de Aba) -- Selecione entre opções como Bíblia, Live Stream, Doação, Site e muito mais.
   - **URL** -- Digite o endereço web em que a aba deve se vincular.
   - **Visibility** (Visibilidade) -- Controle quem pode ver esta aba (todos, apenas membros, etc.).
3. Clique em **Save Tab** (Salvar Aba) para adicioná-lo ao seu aplicativo.

## Editando uma Aba Existente

1. Clique em qualquer aba existente na lista **App Tabs** (Abas do Aplicativo).
2. Atualize o nome, ícone, URL, tipo ou configurações de visibilidade da aba.
3. Clique em **Save Tab** (Salvar Aba) para aplicar suas alterações.

## Reordenando Abas

Você pode alterar a ordem em que as abas aparecem no aplicativo móvel. Arraste e solte as abas na lista para reorganizá-las. A ordem mostrada nesta página corresponde à ordem que seus membros verão no aplicativo.

:::info
Algumas abas podem aparecer automaticamente quando certas condições são atendidas -- por exemplo, uma aba Live Stream pode aparecer quando uma transmissão está ativa. As abas adicionadas manualmente oferecem controle total sobre o que seus membros veem o tempo todo.
:::

:::tip
Mantenha sua contagem de abas gerenciável. Três a cinco abas funcionam bem para a maioria das igrejas. Muitas abas podem confundir a navegação para seus membros.
:::

## Configurações de Diretório de Membros e Mensagens

O item **Member portal** (Portal de Membros) na mesma seção Mobile contém as configurações que governam o diretório de membros e mensagens privadas na experiência B1.church:

- **Directory Approval Group** (Grupo de Aprovação de Diretório) -- O grupo que revisa atualizações do diretório de membros, e [solicitações de exclusão de conta](../profile/account-deletion.md), antes de entrem em vigor.
- **Show in Directory** (Mostrar no Diretório) -- Quem pode aparecer no diretório de membros (Apenas Staff (Pessoal) até Todos).
- **Visibility Preference** (Preferência de Visibilidade) -- Define o padrão de toda a igreja para membros que ainda não escolheram sua própria configuração. **Address** (Endereço), **Phone Number** (Número de Telefone) e **Email** (Email) cada um tem seu próprio menu suspenso, com os mesmos cinco níveis disponíveis em todos os locais onde a visibilidade é configurada:
  - **Everyone** (Todos) -- visível para qualquer pessoa, incluindo visitantes anônimos
  - **Members** (Membros) -- visível apenas para pessoas com um registro de Membro ou Staff
  - **Groups Only** (Apenas Grupos) -- visível apenas para pessoas que compartilham um grupo com esta pessoa
  - **My Group Leaders and Staff** (Meus Líderes de Grupo e Staff) -- visível apenas para líderes de um grupo a que esta pessoa pertence, além de staff
  - **Staff Only** (Apenas Staff) -- visível apenas para staff com a permissão Pessoas > Visualizar, e para a própria pessoa

  Os membros podem substituir esses padrões para seu próprio registro da aba **Privacy** (Privacidade) de seu perfil no PWA B1.church -- consulte [Editando Seu Perfil](/docs/b1-church/getting-started/me-page) (Editando seu perfil).
- **Minimum Age for Private Messages** (Idade Mínima para Mensagens Privadas) -- Um controle de segurança infantil. O B1 não abrirá uma conversa de mensagem privada **nova** quando qualquer uma das pessoas tiver menos dessa idade, com base em sua data de nascimento (a função de membro da família é usada como fallback quando nenhuma data de nascimento está em arquivo). Pessoas menores de idade permanecem totalmente visíveis no diretório -- apenas mensagens diretas são bloqueadas, em **ambas as direções**, para todos, incluindo staff. Conversas em grupo e mensagens para os pais de uma criança ainda funcionam. As opções são Off (Desativado), 13, 16 ou 18; o padrão é **18**. As conversas existentes não são afetadas.

:::tip
Como a verificação de idade mínima depende de datas de nascimento, certifique-se de que as datas de nascimento foram preenchidas para crianças em sua congregação. Essa configuração pertence à mesma família de segurança infantil que os [controles de segurança de check-in](../attendance/checkin-safety.md).
:::

### Prompt de Sign-In da Tela Inicial

Visitantes que abrem a [tela inicial](/docs/b1-church/getting-started/navigating#home) (Home screen) do aplicativo sem fazer sign-in veem um breve prompt -- por padrão, *"Sign in to see your groups, giving, and more."* (Entre para ver seus grupos, doações e muito mais.) -- ao lado de um botão **Sign In** (Entrar). As configurações **Home screen sign-in prompt** (Prompt de sign-in da tela inicial) na mesma página Member portal (`/mobile/b1-mobile`) permitem que você o altere:

- **Show sign-in prompt on the app home screen** (Mostrar prompt de sign-in na tela inicial do aplicativo) -- Desligue isso para ocultar o prompt e o botão **Sign In** (Entrar) da tela inicial. Os visitantes ainda podem fazer sign-in no menu do aplicativo.
- **Sign-in prompt text** (Texto do prompt de sign-in) -- Substitua a redação padrão pela sua própria mensagem (até 150 caracteres). Deixe em branco para usar o padrão. Esta caixa está desabilitada enquanto o prompt está desativado.

Clique em **Save** (Salvar) para aplicar. Salvar atualiza as configurações de cache do aplicativo, para que a alteração apareça na próxima vez que a tela inicial for carregada.

## Onde Essas Abas Aparecem

As abas que você configura aqui são exibidas no **B1.church PWA** que seus membros instalam de qualquer página em `https://yourchurchname.b1.church`. As alterações que você faz nesta página são refletidas na próxima vez que um membro abre o aplicativo. (As abas também são renderizadas pelo [aplicativo móvel nativo B1](/docs/b1-mobile/) legado para qualquer membro que ainda o executar, mas esse aplicativo está descontinuado e não está mais sendo atualizado.)

## Próximos Passos

- [Church Settings](./church-settings.md) -- Configure as informações e marca de sua igreja
- [Roles & Permissions](./roles-permissions.md) -- Gerencie o acesso para sua equipe
