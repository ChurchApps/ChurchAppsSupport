---
title: "Entrando na Conta"
---

# Entrando na Conta

<div class="article-intro">

Antes que o quiosque possa ser usado para o check-in, você precisa entrar com uma conta do ChurchApps que tenha acesso à sua igreja. Esta página cobre o primeiro login, a seleção da igreja, o comportamento do login automático e como sair da conta.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o B1 Church Checkin no seu tablet Android (consulte [Primeiros Passos](./index.md))
- Tenha em mãos o e-mail e a senha da sua conta do ChurchApps

</div>

## Primeiro Login

1. Abra o aplicativo B1 Church Checkin. Após a tela de abertura, você verá a tela de login com o logotipo do B1 Church Checkin.
2. Digite seu **endereço de e-mail** no primeiro campo.
3. Digite sua **senha** no segundo campo.
4. Toque no botão **Entrar**.

O aplicativo valida suas credenciais e faz o login. Se o e-mail ou a senha estiverem incorretos, uma mensagem de erro aparecerá na parte inferior da tela.

Se a conta tiver a [verificação em duas etapas](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) ativada, o aplicativo então pede um código. Digite o código de 6 dígitos do aplicativo autenticador do titular da conta, ou um dos códigos de backup dele, e toque em **Entrar** novamente. Você só precisa do código neste primeiro login; depois disso, o quiosque permanece conectado.

:::info
Este é o mesmo e-mail e a mesma senha que você usa no B1 Admin ou em qualquer outro produto do ChurchApps. Você não precisa de uma conta separada para o quiosque de check-in.
:::

## Selecionando Sua Igreja

Após um login bem-sucedido, o aplicativo carrega uma lista de igrejas vinculadas à sua conta. Cada igreja aparece como um cartão com o nome e o logotipo da igreja (se tiver sido configurado no B1 Admin).

- Se a sua conta estiver vinculada a **apenas uma igreja**, a tela de seleção ainda será exibida. Toque na sua igreja para continuar.
- Se a sua conta estiver vinculada a **várias igrejas**, toque na igreja que você quer que este quiosque atenda.

Depois de selecionar a igreja, o aplicativo carrega as configurações de identidade visual e aparência dela. O logotipo da sua igreja aparecerá no cabeçalho de todas as telas seguintes.

## Login Automático em Visitas Seguintes

Após o primeiro login bem-sucedido, o aplicativo guarda no tablet um token de acesso seguro e a igreja selecionada. Ele não armazena sua senha. Nas próximas aberturas:

- O aplicativo conecta você novamente com o token salvo.
- Se você já tiver selecionado uma igreja, ele restaura essa seleção e leva você diretamente à **tela de cultos**.
- Se o acesso salvo não for mais válido, o aplicativo volta à tela de login para que você entre novamente.

:::tip
Como o quiosque faz login automaticamente, você só precisa digitar as credenciais uma vez, durante a configuração inicial. Depois disso, basta ligar o tablet e ele estará pronto para uso.
:::

## Configurações de Administrador

As configurações de administrador ficam propositalmente ocultas para que os membros da igreja que usam o quiosque não alterem a configuração por engano. Para acessá-las:

1. Toque no **logotipo da igreja** no cabeçalho **sete vezes** seguidas, em rápida sucessão (dentro de dois segundos).
2. Se um PIN do quiosque estiver definido, digite o PIN quando solicitado.
3. A tela **Configurações de Administrador** será aberta com as seguintes opções:
   - **Alterar Culto** -- troca o horário de culto selecionado
   - **Alterar Impressora** -- abre as [configurações de impressora](./printer-setup) para buscar e selecionar uma impressora
   - **Definir/Alterar PIN** -- define ou atualiza o PIN do quiosque que protege o acesso de administrador
   - **Sair** -- encerra a sessão e volta à tela de login

:::warning
Sair da conta apaga todas as credenciais salvas e a seleção de igreja. Você precisará digitar novamente seu e-mail e sua senha para usar o quiosque outra vez. Saia apenas quando precisar trocar de conta ou reconfigurar o quiosque.
:::

## Próximos Passos

Depois de entrar, você pode [configurar uma impressora](./printer-setup) ou ir direto para o [fluxo de check-in](../check-in/).
