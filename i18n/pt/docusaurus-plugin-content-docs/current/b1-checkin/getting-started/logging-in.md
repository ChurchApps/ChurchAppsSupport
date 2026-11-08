---
title: "Como Fazer Login no B1 Church Checkin"
sidebar_label: "Login"
description: "Entre no aplicativo de quiosque B1 Church Checkin, escolha sua igreja e entenda o login automático, as configurações de administrador e o logout no tablet de check-in."
---

# Login

<div class="article-intro">

Antes que o quiosque possa ser usado para check-in, você precisa entrar com uma conta ChurchApps que tenha acesso à sua igreja. Esta página aborda o processo de login na primeira vez, a seleção da igreja, o comportamento do login automático e como sair da conta.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o B1 Church Checkin no seu tablet Android (veja [Primeiros Passos](./index.md))
- Tenha em mãos o e-mail e a senha da sua conta ChurchApps
- A conta precisa da permissão **Checkin** (ou **Editar Presença**) na sua igreja. Um administrador a adiciona no B1 Admin em **Configurações > Funções** — veja [Contas do Quiosque de Check-In](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Primeiro Login

1. Abra o aplicativo B1 Church Checkin. Após a tela de abertura, você verá a tela de login com o logotipo do B1 Church Checkin.
2. Digite seu **endereço de e-mail** no primeiro campo.
3. Digite sua **senha** no segundo campo.
4. Toque no botão **Entrar**.

O aplicativo valida suas credenciais e faz seu login. Se o e-mail ou a senha estiverem incorretos, você verá uma mensagem de erro na parte inferior da tela.

Se a conta tiver a [verificação em duas etapas](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) ativada, o aplicativo pedirá um código. Digite o código de 6 dígitos do aplicativo autenticador do proprietário da conta, ou um de seus códigos de backup, e toque em **Entrar** novamente. Você só precisa do código neste primeiro login; depois disso, o quiosque permanece conectado.

:::info
Este é o mesmo e-mail e senha que você usa no B1 Admin ou em qualquer outro produto ChurchApps. Você não precisa de uma conta separada para o quiosque de check-in.
:::

## Selecionando Sua Igreja

Após um login bem-sucedido, o aplicativo carrega as igrejas nas quais sua conta tem a permissão **Checkin** ou **Editar Presença**. Igrejas em que você tem apenas outras permissões são deixadas de fora. Se nenhuma restar, o aplicativo mostra **Sem acesso ao check-in** e pede que o administrador da igreja adicione a permissão Checkin a uma de suas funções. Cada igreja é exibida como um cartão com o nome e o logotipo da igreja (se um tiver sido configurado no B1 Admin).

- Se sua conta estiver vinculada a **apenas uma igreja**, você ainda verá a tela de seleção. Toque na sua igreja para continuar.
- Se sua conta estiver vinculada a **várias igrejas**, toque na igreja que você deseja que este quiosque atenda.

Depois que você selecionar uma igreja, o aplicativo carrega as configurações de identidade visual e aparência dessa igreja. O logotipo da sua igreja aparecerá no cabeçalho em todas as telas seguintes.

## Login Automático em Acessos Posteriores

Após o primeiro login bem-sucedido, o aplicativo mantém no tablet um token de acesso seguro e a igreja selecionada. Ele não armazena sua senha. Nas próximas aberturas:

- O aplicativo conecta você novamente usando o token salvo.
- Se você tiver selecionado uma igreja anteriormente, ele restaura essa seleção e leva você diretamente à **tela de cultos**.
- Se o acesso salvo não for mais válido, o aplicativo volta à tela de login para que você possa entrar novamente.

:::tip
Como o quiosque faz login automaticamente, você só precisa inserir as credenciais uma vez durante a configuração inicial. Depois disso, basta ligar o tablet e ele estará pronto para uso.
:::

## Configurações de Administrador

As configurações de administrador ficam propositalmente ocultas para que os membros da igreja que usam o quiosque não alterem a configuração por acidente. Para acessá-las:

1. Toque no **logotipo da igreja** no cabeçalho **sete vezes** em sequência rápida (em até dois segundos).
2. Se um PIN do quiosque estiver definido, digite o PIN quando solicitado.
3. A tela **Configurações de Administrador** será aberta com as seguintes opções:
   - **Alterar Culto** — trocar o horário do culto selecionado
   - **Alterar Impressora** — abrir as [configurações de impressora](./printer-setup.md) para buscar e selecionar uma impressora
   - **Definir PIN de Administrador** (ou **Alterar PIN de Administrador**, quando já houver um) — definir ou atualizar o PIN do quiosque que protege o acesso de administrador
   - **Transmissão de emergência** — enviar mensagem de texto aos responsáveis de todas as famílias com check-in feito (veja [Transmissão de Emergência](../check-in/checking-out.md#emergency-broadcast))
   - **Modo de estação com equipe** — uma chave que adiciona check-out, chamada, reimpressão e edição de perfil a esta estação (veja [Check-Out](../check-in/checking-out.md))
   - **Sair** — encerrar a sessão e voltar à tela de login

   Toque em **Voltar ao Quiosque** para retornar ao check-in.

:::warning
Sair da conta apaga todas as credenciais salvas e a seleção de igreja. Você precisará digitar novamente seu e-mail e senha para usar o quiosque outra vez. Saia apenas quando precisar trocar de conta ou reconfigurar o quiosque.
:::

## Próximos Passos

Depois de fazer login, você pode [configurar uma impressora](./printer-setup.md) ou ir diretamente ao [fluxo de check-in](../check-in/index.md).
