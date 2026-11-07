---
title: "Gerenciando seu perfil"
description: "Atualize sua conta ChurchApps no B1 Admin: edite nome, e-mail e senha, ative a verificação em duas etapas, escolha um tema ou exclua sua conta."
---

# Gerenciando seu perfil

<div class="article-intro">

A página de Perfil permite editar as configurações pessoais da sua conta. Seu perfil é compartilhado por todos os produtos do ChurchApps, então qualquer alteração feita aqui será refletida em todos os lugares onde você usar o ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa estar conectado à sua conta do ChurchApps
- Tenha em mãos seu novo endereço de e-mail ou senha, caso pretenda atualizá-los

</div>

## Informações do perfil

A página de Perfil mostra seu nome e endereço de e-mail à esquerda, com um botão **Editar** abaixo deles. Clique em **Editar** para abrir o formulário **Editar conta**, que contém os dados básicos da sua conta:

1. **E-mail** -- Seu endereço de e-mail, usado para entrar e receber notificações.
2. **Nome** e **Sobrenome** -- Seu nome de exibição em todo o ChurchApps.
3. **Senha** -- Atualize a senha da sua conta.

Para atualizar suas informações, edite os campos e clique no botão **Salvar alterações**. Clique em **Cancelar** (ou no link **Voltar para** com o seu nome) para voltar ao seu perfil sem salvar.

## Alterando sua senha

1. Na página de Perfil, clique em **Editar**.
2. Digite sua **Senha atual**.
3. Digite a nova senha no campo **Nova senha**.
4. Digite-a novamente no campo **Confirmar senha**.
5. Clique em **Salvar alterações**.

:::info
Sua senha deve ter pelo menos 8 caracteres. Certifique-se de que os campos de senha e de confirmação correspondem exatamente. Você precisa confirmar sua senha atual para alterá-la — se não a souber, use o link **Esqueci minha senha** na página de login.
:::

## Contas vinculadas

A seção **Contas vinculadas** mostra os serviços externos conectados à sua conta do ChurchApps. Você pode ver quais contas estão vinculadas e gerenciar essas conexões nesta seção.

## Verificação em duas etapas {#two-factor-sign-in}

A verificação em duas etapas adiciona uma segunda etapa ao login: depois da sua senha (ou do login com Google, Microsoft ou do link enviado por e-mail), você também digita um código de 6 dígitos de um aplicativo autenticador no seu celular, como Google Authenticator, Microsoft Authenticator, 1Password ou Authy. Ela é opcional e vem desativada por padrão. Depois de ativada, vale para todos os logins do ChurchApps que usam a sua conta — B1 Admin, o site e o aplicativo B1.church da sua igreja, B1 Church Checkin, Lessons.church, FreePlay e os demais.

### Ativando

1. Na página de Perfil, localize a seção **Verificação em duas etapas** e clique em **Ativar**.
2. Escaneie o QR code com o seu aplicativo autenticador. Se não conseguir escanear, digite no aplicativo a chave exibida abaixo de **Não consegue escanear? Digite esta chave:**.
3. Digite o **código de 6 dígitos** que o seu aplicativo mostra e clique em **Verificar**.
4. O B1 Admin exibe dez **códigos de backup**. Cada um permite que você entre uma vez caso perca o celular. Clique em **Copiar** ou anote-os, guarde-os em um lugar seguro e clique em **Já salvei**.

:::warning
Os códigos de backup são exibidos somente uma vez. Se você perder o celular e não tiver mais códigos de backup, um administrador do servidor do ChurchApps precisará desativar a verificação em duas etapas para você, depois de confirmar a sua identidade.
:::

Quando a verificação em duas etapas está ativada, a seção mostra **Ativada** e exibe quantos códigos de backup ainda restam.

### Entrando com um código

Depois de digitar sua senha, a tela de login pede um código. Digite o código de 6 dígitos do seu aplicativo autenticador, ou um dos seus códigos de backup, e envie. Cada código de backup funciona apenas uma vez. Se o código estiver errado, você verá "Esse código não funcionou. Tente novamente." Após muitos códigos errados, os logins da sua conta ficam pausados por um tempo.

Permanecer conectado em um dispositivo no qual você já fez login não pede o código novamente; ele só aparece quando você faz um novo login.

### Desativando

1. Na seção **Verificação em duas etapas**, clique em **Desativar**.
2. Digite um código atual do seu aplicativo autenticador, ou um código de backup.
3. Clique em **Verificar**.

:::info
A verificação em duas etapas não pode ser configurada em contas de demonstração, por isso a seção fica oculta nelas.
:::

## Preferências de tema

O B1 Admin permite escolher um tema de cores e um modo de exibição claro ou escuro:

1. Clique na sua foto de perfil no canto superior direito do B1 Admin para abrir o menu do usuário.
2. Em **Preferências de tema**, escolha um tema:
   - **Padrão** -- A aparência atual do B1 Admin: painéis com borda sobre um fundo limpo. Novos usuários veem este tema até escolherem outro.
   - **Clássico** -- A aparência anterior do B1 Admin, com um banner colorido na página, cartões com sombra e fundo cinza. Se você usava o B1 Admin neste dispositivo antes da nova aparência chegar e nunca escolheu um tema, continuará no Clássico.
   - **Personalizado** -- A aparência Padrão construída com a cor da sua própria igreja. Ela usa a cor primária do modo claro de **Mobile > Tema do aplicativo**, ou a cor primária do seu site se nenhuma cor do aplicativo estiver definida, para que o B1 Admin combine com o aplicativo dos seus membros.
3. Abaixo dos temas, escolha **Modo claro** ou **Modo escuro**.
4. A interface é atualizada imediatamente para refletir a sua escolha.

Suas escolhas são lembradas neste dispositivo e navegador.

## Exclusão de conta

Na seção **Exclusão de conta** da página de Perfil, você encontrará a opção de excluir sua conta.

- Se a sua igreja **não** tiver configurado um Grupo de aprovação do diretório, clicar em **Excluir minha conta** remove sua conta e os dados associados imediatamente, e isso não pode ser desfeito.
- Se a sua igreja **tiver** configurado um Grupo de aprovação do diretório, sua solicitação é enviada a esse grupo para análise. O botão fica desabilitado enquanto a solicitação estiver pendente, e você será notificado assim que a sua igreja aprovar ou recusar. Veja [Analisando solicitações de exclusão de conta](./account-deletion.md) para saber o que acontece em seguida.

:::warning
A exclusão de conta — seja imediata ou aprovada pela sua igreja — é permanente e não pode ser revertida.
:::

:::info
Se você é **Administrador de domínio**, certifique-se de transferir as responsabilidades administrativas para outro usuário antes de excluir sua conta. Veja [Funções e permissões](../settings/roles-permissions.md) para detalhes sobre como gerenciar as funções de administrador.
:::

:::info
A edição do perfil está desativada no modo de demonstração. Se você estiver usando uma conta de demonstração, não poderá fazer alterações nas configurações do seu perfil.
:::

## Próximos passos

- [Gerenciando dispositivos](./devices.md) -- Veja e gerencie seus dispositivos ChurchAppsPlayer conectados
