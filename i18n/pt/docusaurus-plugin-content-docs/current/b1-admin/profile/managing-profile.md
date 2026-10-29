---
title: "Gerenciando Seu Perfil"
---

# Gerenciando Seu Perfil

<div class="article-intro">

A página Perfil permite editar as configurações pessoais da sua conta. Seu perfil é compartilhado por todos os produtos do ChurchApps, então qualquer alteração feita aqui será refletida em todos os lugares onde você usa o ChurchApps.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa estar conectado à sua conta do ChurchApps
- Tenha em mãos o seu novo e-mail ou senha, caso pretenda atualizá-los

</div>

## Informações do Perfil

A página Perfil mostra o seu nome e o seu e-mail à esquerda, com um botão **Editar** abaixo deles. Clique em **Editar** para abrir o formulário **Editar Conta**, que contém os dados básicos da sua conta:

1. **E-mail** -- o seu endereço de e-mail, usado para entrar no sistema e receber notificações.
2. **Nome** e **Sobrenome** -- o seu nome de exibição em todo o ChurchApps.
3. **Senha** -- atualize a senha da sua conta.

Para atualizar as suas informações, edite os campos e clique no botão **Salvar alterações**. Clique em **Cancelar** (ou no link **Voltar para** com o seu nome) para voltar ao seu perfil sem salvar.

## Alterando Sua Senha

1. Na página Perfil, clique em **Editar**.
2. Digite a sua **Senha atual**.
3. Digite a nova senha no campo **Nova senha**.
4. Digite-a novamente no campo **Confirmar senha**.
5. Clique em **Salvar alterações**.

:::info
Sua senha deve ter pelo menos 8 caracteres. Certifique-se de que os campos de senha e de confirmação sejam idênticos. Você precisa confirmar a sua senha atual para alterá-la -- se não souber qual é, use o link **Esqueci minha senha** na página de login.
:::

## Contas Vinculadas

A seção **Contas vinculadas** mostra os serviços externos conectados à sua conta do ChurchApps. Você pode ver quais contas estão vinculadas e gerenciar essas conexões a partir desta seção.

## Entrada em Duas Etapas

A entrada em duas etapas adiciona um segundo passo ao login: depois da sua senha (ou do login com Google, Microsoft ou link enviado por e-mail), você também informa um código de 6 dígitos de um aplicativo autenticador no seu celular, como Google Authenticator, Microsoft Authenticator, 1Password ou Authy. Ela é opcional e vem desativada por padrão. Depois de ativada, passa a valer para todos os logins do ChurchApps que usam a sua conta -- B1 Admin, o site e o aplicativo do B1.church da sua igreja, B1 Church Checkin, Lessons.church, FreePlay e os demais.

### Ativando

1. Na página Perfil, localize a seção **Entrada em Duas Etapas** e clique em **Ativar**.
2. Escaneie o QR code com o seu aplicativo autenticador. Se não conseguir escanear, digite a chave exibida em **Não consegue escanear? Digite esta chave:** no aplicativo.
3. Digite o **código de 6 dígitos** exibido pelo seu aplicativo e clique em **Verificar**.
4. O B1 Admin mostra dez **códigos de backup**. Cada um permite entrar uma vez caso você perca o celular. Clique em **Copiar** ou anote-os, guarde-os em um lugar seguro e clique em **Já salvei**.

:::warning
Os códigos de backup são exibidos apenas uma vez. Se você perder o celular e não tiver mais códigos de backup, um administrador do servidor do ChurchApps precisará desativar a entrada em duas etapas para você, depois de confirmar a sua identidade.
:::

Quando a entrada em duas etapas está ativada, a seção mostra **Ativada** e indica quantos códigos de backup ainda restam.

### Entrando com um Código

Depois de digitar a sua senha, a tela de login pede um código. Digite o código de 6 dígitos do seu aplicativo autenticador, ou um dos seus códigos de backup, e envie. Cada código de backup funciona apenas uma vez. Se o código estiver errado, você verá a mensagem "Esse código não funcionou. Tente novamente." Após muitos códigos errados, os logins da sua conta ficam pausados por um tempo.

Permanecer conectado em um dispositivo no qual você já entrou não pede o código novamente; ele só aparece quando você faz um novo login.

### Desativando

1. Na seção **Entrada em Duas Etapas**, clique em **Desativar**.
2. Digite um código atual do seu aplicativo autenticador, ou um código de backup.
3. Clique em **Verificar**.

:::info
A entrada em duas etapas não pode ser configurada em contas de demonstração, por isso a seção fica oculta nelas.
:::

## Preferências de Tema

O B1 Admin permite escolher um tema de cores e um modo de exibição claro ou escuro:

1. Clique na sua foto de perfil no canto superior direito do B1 Admin para abrir o menu do usuário.
2. Em **Preferências de tema**, escolha um tema:
   - **Padrão** -- a aparência atual do B1 Admin: painéis com bordas sobre um fundo limpo. Novos usuários veem este tema até escolherem outro.
   - **Clássico** -- a aparência anterior do B1 Admin, com um cabeçalho colorido na página, cartões com sombra e fundo cinza. Se você usou o B1 Admin neste dispositivo antes da chegada da nova aparência e nunca escolheu um tema, continuará no Clássico.
   - **Personalizado** -- a aparência Padrão criada com a cor da sua igreja. Usa a cor primária do modo claro em **Celular > Tema do aplicativo**, ou a cor primária do seu site se nenhuma cor do aplicativo estiver definida, para que o B1 Admin combine com o aplicativo dos seus membros.
3. Abaixo dos temas, escolha **Modo claro** ou **Modo escuro**.
4. A interface é atualizada imediatamente para refletir a sua escolha.

Suas escolhas são lembradas neste dispositivo e navegador.

## Exclusão da Conta

Na seção **Exclusão da conta** da página Perfil, você encontrará a opção para excluir a sua conta.

- Se a sua igreja **não** tiver configurado um Grupo de Aprovação do Diretório, clicar em **Excluir minha conta** remove a sua conta e os dados associados imediatamente, e isso não pode ser desfeito.
- Se a sua igreja **tiver** configurado um Grupo de Aprovação do Diretório, o seu pedido é enviado a esse grupo para análise. O botão fica desativado enquanto o pedido estiver pendente, e você será notificado assim que a sua igreja aprovar ou recusar. Consulte [Analisando Pedidos de Exclusão de Conta](./account-deletion.md) para saber o que acontece em seguida.

:::warning
A exclusão de conta -- seja imediata ou aprovada pela sua igreja -- é permanente e não pode ser desfeita.
:::

:::info
Se você é **Administrador de domínio**, certifique-se de transferir as responsabilidades administrativas para outro usuário antes de excluir a sua conta. Consulte [Funções e Permissões](../settings/roles-permissions.md) para detalhes sobre o gerenciamento de funções de administrador.
:::

:::info
A edição do perfil fica desativada no modo de demonstração. Se você estiver usando uma conta de demonstração, não poderá fazer alterações nas configurações do seu perfil.
:::

## Próximos Passos

- [Gerenciando Dispositivos](./devices.md) -- veja e gerencie os dispositivos ChurchAppsPlayer conectados
