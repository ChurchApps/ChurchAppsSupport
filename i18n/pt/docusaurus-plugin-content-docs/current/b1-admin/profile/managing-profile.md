---
title: "Gerenciando seu perfil"
description: "Atualize sua conta ChurchApps no B1 Admin: edite seu nome, e-mail e senha, ative a verificação em duas etapas, escolha um tema ou exclua sua conta."
---

# Gerenciando seu perfil

<div class="article-intro">

A página Perfil permite editar as configurações pessoais da sua conta. Seu perfil é compartilhado por todos os produtos da ChurchApps, então quaisquer alterações feitas aqui se refletem em todos os lugares em que você usa a ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa estar conectado à sua conta ChurchApps
- Tenha o novo e-mail ou a nova senha em mãos, caso pretenda atualizá-los

</div>

## Abrindo seu perfil {#opening-your-profile}

Clique na sua foto de perfil, no canto superior direito do B1 Admin, e escolha **Editar perfil**. A página Perfil mostra seu nome e e-mail à esquerda, e as seções **Contas vinculadas**, **Verificação em duas etapas** e **Exclusão de conta** à direita.

## Informações do perfil {#profile-information}

A página Perfil mostra seu nome e endereço de e-mail à esquerda, com um botão **Editar** abaixo deles. Clique em **Editar** para abrir o formulário **Editar conta**, que contém os dados básicos da sua conta:

1. **E-mail** -- O endereço de e-mail usado para entrar e receber notificações.
2. **Nome** e **Sobrenome** -- Seu nome de exibição em todas as ferramentas ChurchApps.
3. **Senha atual**, **Nova senha** e **Confirmar senha** -- Preencha esses campos somente se quiser alterar a senha; deixe-os em branco para manter a atual.

Para atualizar suas informações, edite os campos e clique no botão **Salvar alterações**. A mensagem **Alterações salvas.** confirma a atualização. Clique em **Cancelar** (ou no link **Voltar para** com o seu nome) para voltar ao perfil sem salvar. Clique no ícone de olho em um campo de senha para mostrar ou ocultar o que você digitou.

## Alterando sua senha {#changing-your-password}

1. Na página Perfil, clique em **Editar**.
2. Digite sua **Senha atual**.
3. Digite a nova senha no campo **Nova senha**.
4. Digite-a novamente no campo **Confirmar senha**.
5. Clique em **Salvar alterações**.

:::info
Sua senha deve ter pelo menos 8 caracteres. Certifique-se de que os campos de senha e de confirmação correspondam exatamente. Para alterar a senha, é preciso confirmar a senha atual -- se você não a souber, use o link **Esqueci a senha** na página de login.
:::

## Contas vinculadas {#linked-accounts}

A seção **Contas vinculadas** mostra os serviços externos que você pode conectar à sua conta ChurchApps. Atualmente, trata-se do **PraiseCharts**, usado para encontrar músicas e baixar cifras e partituras para as [músicas](../serving/songs.md) do Serviço. A seção mostra **Vinculada** ou **Não vinculada**:

- Clique em **Vincular** e entre no PraiseCharts na janela que se abre para conectar sua conta.
- Clique em **Cadastrar-se** para criar primeiro uma conta no PraiseCharts.
- Clique em **Desvincular** para desconectá-la.

## Verificação em duas etapas {#two-factor-sign-in}

A verificação em duas etapas acrescenta um segundo passo ao login: depois da sua senha (ou do login com Google, Microsoft ou link enviado por e-mail), você também informa um código de 6 dígitos de um aplicativo autenticador no celular, como Google Authenticator, Microsoft Authenticator, 1Password ou Authy. Ela é opcional e vem desativada por padrão. Depois de ativada, passa a valer para todos os logins da ChurchApps que usam a sua conta -- B1 Admin, o site e o aplicativo B1.church da sua igreja, B1 Church Checkin, Lessons.church, FreePlay e os demais.

### Ativando {#turning-it-on}

1. Na página Perfil, localize a seção **Verificação em duas etapas** e clique em **Ativar**.
2. Leia o QR code com o seu aplicativo autenticador. Se não conseguir lê-lo, digite no aplicativo a chave exibida abaixo de **Não consegue ler o código? Digite esta chave:**.
3. Digite o **código de 6 dígitos** exibido pelo aplicativo e clique em **Verificar**.
4. O B1 Admin mostra dez **códigos de backup**. Cada um permite entrar uma vez, caso você perca o celular. Clique em **Copiar** ou anote-os, guarde-os em um lugar seguro e clique em **Já salvei**.

:::warning
Os códigos de backup são exibidos apenas uma vez. Se você perder o celular e não tiver mais códigos de backup, um administrador de servidor da ChurchApps precisará desativar a verificação em duas etapas para você, depois de confirmar sua identidade.
:::

Quando a verificação em duas etapas estiver ativa, a seção mostra **Ativada** e informa quantos códigos de backup ainda restam.

### Entrando com um código {#signing-in-with-a-code}

Depois de digitar a senha, a tela de login pede um código. Digite o código de 6 dígitos do seu aplicativo autenticador, ou um dos seus códigos de backup, e envie. Cada código de backup funciona apenas uma vez. Se o código estiver errado, você verá "Esse código não funcionou. Tente novamente." Após muitos códigos incorretos, os logins da sua conta ficam pausados por algum tempo.

Permanecer conectado em um dispositivo em que você já entrou não pede o código novamente; ele só é solicitado quando você faz um novo login.

### Desativando {#turning-it-off}

1. Na seção **Verificação em duas etapas**, clique em **Desativar**.
2. Digite um código atual do seu aplicativo autenticador, ou um código de backup.
3. Clique em **Verificar**.

:::info
A verificação em duas etapas não pode ser configurada em contas de demonstração, por isso a seção fica oculta nelas.
:::

## Preferências de tema {#theme-preferences}

O B1 Admin permite escolher um tema de cores e um modo de exibição claro ou escuro:

1. Clique na sua foto de perfil, no canto superior direito do B1 Admin, para abrir o menu do usuário.
2. Em **Preferências de tema**, escolha um tema:
   - **Padrão** -- O visual atual do B1 Admin: painéis com borda sobre uma tela limpa. Novos usuários veem este tema até escolherem outro.
   - **Clássico** -- O visual anterior do B1 Admin, com faixa colorida na página, cartões com sombra e fundo cinza. Se você usava o B1 Admin neste dispositivo antes da chegada do novo visual e nunca escolheu um tema, continuará no Clássico.
   - **Personalizado** -- O visual Padrão, construído com a cor da sua própria igreja. Ele usa a cor primária do modo claro definida em **Mobile > Tema do aplicativo** ou, se nenhuma cor do aplicativo estiver definida, a cor primária do seu site, para que o B1 Admin combine com o aplicativo dos seus membros.
3. Abaixo dos temas, escolha **Modo claro** ou **Modo escuro**.
4. A interface é atualizada imediatamente para refletir a sua escolha.

Suas escolhas são lembradas neste dispositivo e neste navegador.

## Exclusão de conta {#account-deletion}

Na seção **Exclusão de conta** da página Perfil, você encontrará a opção de excluir a sua conta.

- Se a sua igreja **não** tiver configurado um Grupo de aprovação do diretório, a seção exibe o aviso *"Cuidado, estas ações são permanentes"*. Clique em **Excluir minha conta** e confirme; sua conta e os dados associados são removidos imediatamente e você é desconectado. Isso não pode ser desfeito.
- Se a sua igreja **tiver** configurado um Grupo de aprovação do diretório, a seção informa que a igreja analisa as solicitações de exclusão. Clique em **Excluir minha conta** e depois em **Enviar solicitação**, e o pedido é enviado a esse grupo para análise. O botão fica desativado enquanto a solicitação estiver pendente, e você será notificado quando a igreja aprovar ou recusar. Veja [Revisando solicitações de exclusão de conta](./account-deletion.md) para saber o que acontece em seguida.

:::warning
A exclusão de conta -- seja imediata ou aprovada pela sua igreja -- é permanente e não pode ser revertida.
:::

:::info
Se você for um **Administrador de domínio**, transfira as responsabilidades administrativas para outro usuário antes de excluir a sua conta. Veja [Funções e permissões](../settings/roles-permissions.md) para detalhes sobre o gerenciamento de funções administrativas.
:::

:::info
A edição de perfil é desativada no modo de demonstração. Se você estiver usando uma conta de demonstração, não poderá fazer alterações nas configurações do seu perfil.
:::

## Próximos passos {#next-steps}

- [Gerenciando dispositivos](./devices.md) -- veja e gerencie as telas ChurchAppsPlayer e FreePlay conectadas
