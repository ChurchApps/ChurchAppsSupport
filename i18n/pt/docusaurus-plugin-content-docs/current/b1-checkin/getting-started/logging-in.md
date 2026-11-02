---
title: "Entrando"
---

# Entrando

<div class="article-intro">

Antes que o quiosque possa ser usado para o check-in, você precisa entrar com uma conta do ChurchApps que tenha acesso à sua igreja. Esta página aborda o primeiro login, a seleção da igreja, o comportamento do login automático e como sair.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Instale o B1 Church Checkin no seu tablet Android (veja [Primeiros passos](./index.md))
- Tenha em mãos o e-mail e a senha da sua conta do ChurchApps
- A conta precisa da permissão **Checkin** (ou **Editar presença**) na sua igreja. Um administrador a adiciona no B1 Admin, em **Configurações > Funções** — veja [Contas de quiosque de check-in](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Primeiro login

1. Abra o aplicativo B1 Church Checkin. Depois da tela de abertura, você verá a tela de login com o logotipo do B1 Church Checkin.
2. Digite o seu **endereço de e-mail** no primeiro campo.
3. Digite a sua **senha** no segundo campo.
4. Toque no botão **Entrar**.

O aplicativo valida as suas credenciais e faz o seu login. Se o e-mail ou a senha estiverem incorretos, você verá uma mensagem de erro na parte inferior da tela.

Se a conta tiver a [verificação em duas etapas](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) ativada, o aplicativo então pede um código. Digite o código de 6 dígitos do aplicativo autenticador do dono da conta, ou um dos códigos de backup dele, e toque em **Entrar** novamente. Você só precisa do código neste primeiro login; depois disso, o quiosque permanece conectado.

:::info
É o mesmo e-mail e a mesma senha que você usa no B1 Admin ou em qualquer outro produto do ChurchApps. Você não precisa de uma conta separada para o quiosque de check-in.
:::

## Selecionando a sua igreja

Depois de um login bem-sucedido, o aplicativo carrega as igrejas em que a sua conta tem a permissão **Checkin** ou **Editar presença**. As igrejas em que você tem apenas outras permissões ficam de fora. Se nenhuma restar, o aplicativo mostra **Sem acesso ao check-in** e pede que o administrador da igreja adicione a permissão Checkin a uma das suas funções. Cada igreja é exibida como um cartão com o nome e o logotipo da igreja (se um tiver sido configurado no B1 Admin).

- Se a sua conta estiver vinculada a **apenas uma igreja**, você ainda verá a tela de seleção. Toque na sua igreja para continuar.
- Se a sua conta estiver vinculada a **várias igrejas**, toque na igreja que este quiosque deve atender.

Depois que você seleciona uma igreja, o aplicativo carrega a identidade visual e as configurações de aparência dela. O logotipo da sua igreja aparecerá no cabeçalho em todas as telas seguintes.

## Login automático nas próximas vezes

Depois do primeiro login bem-sucedido, o aplicativo guarda no tablet um token de acesso seguro e a igreja selecionada. Ele não guarda a sua senha. Nas próximas aberturas:

- O aplicativo entra novamente com o token salvo.
- Se você já tinha selecionado uma igreja, ele restaura essa seleção e leva você diretamente à **tela de cultos**.
- Se o acesso salvo não for mais válido, o aplicativo volta à tela de login para que você possa entrar novamente.

:::tip
Como o quiosque faz login automaticamente, você só precisa digitar as credenciais uma vez, durante a configuração inicial. Depois disso, basta ligar o tablet e ele estará pronto para uso.
:::

## Configurações de administrador

As configurações de administrador ficam intencionalmente ocultas para que os membros que usam o quiosque não alterem a configuração por acidente. Para acessá-las:

1. Toque no **logotipo da igreja** no cabeçalho **sete vezes** em sequência rápida (em até dois segundos).
2. Se um PIN do quiosque estiver definido, digite o PIN quando solicitado.
3. A tela **Configurações de administrador** será aberta com as seguintes opções:
   - **Alterar culto** — troca o horário de culto selecionado
   - **Alterar impressora** — abre as [configurações de impressora](./printer-setup) para buscar e selecionar uma impressora
   - **Definir/Alterar PIN** — define ou atualiza o PIN do quiosque que protege o acesso de administrador
   - **Sair** — encerra a sessão e volta à tela de login

:::warning
Sair apaga todas as credenciais salvas e a seleção de igreja. Você precisará digitar novamente o seu e-mail e a sua senha para usar o quiosque outra vez. Saia somente quando precisar trocar de conta ou reconfigurar o quiosque.
:::

## Próximos passos

Depois de entrar, você pode [configurar uma impressora](./printer-setup) ou ir direto para o [fluxo de check-in](../check-in/).
