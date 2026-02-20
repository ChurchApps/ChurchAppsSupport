---
title: "Configuração de Doações Online"
---

# Configuração de Doações Online

<div class="article-intro">

O B1 Admin se integra com o **Stripe** e o **PayPal** para que seus membros possam contribuir online pelo seu site B1.church. Uma vez configurado, as doações online aparecem automaticamente nos seus registros de doações junto com os presentes inseridos manualmente, mantendo tudo em um único sistema.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure seus [fundos de doação](funds.md) para que os doadores possam designar suas contribuições
- Crie uma conta Stripe em [stripe.com](https://stripe.com) e ative-a (retire-a do modo de teste)
- Tenha suas credenciais de login do B1 Admin em mãos

</div>

## Configurando o Stripe

1. Crie uma conta em [stripe.com](https://stripe.com) se você ainda não tiver uma. Certifique-se de **ativar sua conta** e retirá-la do modo de teste.
2. No Stripe, vá para **Developers > API Keys**.
3. Copie sua **Chave Publicável**.
4. Faça login no [B1 Admin](https://admin.b1.church/).
5. Clique em **Church** na navegação superior, depois clique em **Edit Church Settings**.
6. Clique no ícone de edição ao lado de **Church Settings**.
7. Role até a seção **Giving**.
8. Defina o **Provider** como **Stripe**.
9. Cole sua Chave Publicável no campo **Public Key**.
10. Volte ao Stripe e revele sua **Chave Secreta** (você só pode visualizá-la uma vez, então salve um backup).
11. Cole a Chave Secreta no campo **Secret Key** e clique em **Save**.

:::warning
Sua Chave Secreta do Stripe só é exibida uma vez. Copie-a para um local seguro antes de sair do painel do Stripe. Se você perdê-la, precisará gerar uma nova chave.
:::

## Adicionando uma Página de Doação ao Seu Site B1.church

1. Acesse [b1.church](https://b1.church/) e faça login.
2. Clique no ícone de **Configurações**.
3. Clique em **Add Tab**.
4. Escolha **Donation** como o tipo.
5. Insira um nome para a aba (por exemplo, "Contribuir") e clique em **Save**.
6. Opcionalmente, altere o ícone da aba -- digite "Giv" na busca de ícones para encontrar um ícone relacionado a contribuições.

Sua página de doação agora está ativa. Os membros podem acessá-la em `seusubdominio.b1.church/donate`.

## Compartilhando Seu Link de Doação

Para encontrar sua URL de doação, vá ao **B1 Admin** e clique no ícone de **Configurações** para ver seu subdomínio. Seu link de doação segue o formato:

`https://seusubdominio.b1.church/donate`

Compartilhe este link no seu site, em e-mails ou no boletim da igreja para que os membros saibam onde contribuir online.

## Notificações de Doações

O Stripe envia uma notificação por e-mail cada vez que uma doação é recebida. Para alterar o endereço de e-mail de notificação, vá ao painel do Stripe, clique no seu perfil no canto superior direito, escolha **Profile** e atualize seu endereço de e-mail.

## Opções de Taxa de Processamento

Você pode configurar sua página de doação para permitir que os doadores opcionalmente cubram as taxas de processamento para que sua igreja receba o valor total da doação. Esta configuração é gerenciada nas configurações da sua igreja dentro do B1 Admin.

:::tip
Após a configuração, faça uma pequena doação de teste para confirmar que tudo está funcionando antes de anunciar as doações online para sua congregação.
:::

## Próximos Passos

- Use a [Importação do Stripe](stripe-import.md) para importar transações online para o B1 Admin se elas não estiverem sincronizando automaticamente
- Verifique seus [Relatórios de Doações](donation-reports.md) para confirmar que as doações online estão aparecendo corretamente
- Gere [Declarações de Contribuições](giving-statements.md) que incluam doações online e presenciais
