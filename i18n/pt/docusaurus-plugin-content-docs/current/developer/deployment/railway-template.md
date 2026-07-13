---
title: "Auto-Hospedagem no Railway"
---

# Auto-Hospedagem no Railway

<div class="article-intro">

ChurchApps publica um modelo de um clique do [Railway](https://railway.com) que oferece à sua igreja sua própria instância privada do B1 Admin, do portal de membros B1, da API e de um banco de dados MySQL -- tudo funcionando em infraestrutura que você possui e paga diretamente. Este guia o coloca ao vivo em cerca de 15 minutos e depois o orienta pela configuração pós-implantação que a maioria das igrejas eventualmente deseja.

</div>

## Início Rápido

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Clique no botão **Deploy on Railway** acima.
2. Entre no Railway (ou crie uma conta gratuita) e adicione um método de pagamento.
3. Clique em **Deploy** sem mudar nada -- cada variável tem um padrão sensato.
4. Aguarde 5-10 minutos para que os quatro serviços fiquem verdes.
5. Abra a URL do serviço **B1Admin**, clique em **Registrar** e crie sua conta. A primeira conta é automaticamente um administrador de servidor.
6. Siga as solicitações no aplicativo para criar sua primeira igreja.

Isso é tudo. Você agora tem uma instância ChurchApps totalmente funcional. Tudo abaixo é polimento opcional.

:::tip
A implantação está atualmente em **beta**. Se você encontrar algo que os documentos não cobrem, abra um problema em [github.com/`ChurchApps/Api`/issues](https://github.com/`ChurchApps/Api`/issues) com logs de implantação anexados.
:::

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- Uma conta [Railway](https://railway.com) gratuita
- Um cartão de crédito registrado no Railway (~$15-25/mês para uma pequena congregação; veja [Custos](#costs))
- Cerca de 15 minutos para a implantação inicial
- *Opcional mas fortemente recomendado depois:* credenciais SMTP e um domínio customizado

</div>

## O Que É Implantado

O modelo provisiona quatro serviços em um único projeto Railway:

| Serviço | Propósito | URL após deploy |
|---------|---------|------------------|
| **MySQL** | Armazena todos os dados (uma instância, múltiplos schemas) | apenas interno |
| **Api** | Backend para membership, conteúdo, giving, attendance, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | App web de equipe/admin | `https://b1admin-<id>.up.railway.app` |
| **B1App** | App web voltada para membro e website da igreja | `https://b1app-<id>.up.railway.app` |

Os schemas do banco de dados são criados automaticamente no primeiro lançamento pela migração de inicialização da API.

## Primeira Configuração

Agora que você está funcionando, aqui estão as coisas que a maioria das igrejas configura em seguida, em ordem aproximada de prioridade.

### 1. Email (Altamente Recomendado)

Sem email, os membros ainda podem se registrar e usar o sistema, mas **eles não podem redefinir senhas esquecidas** -- um administrador deve fazer isso para eles. Configurar SMTP leva cerca de 5 minutos.

No painel Railway, abra o serviço **Api** → **Variables** e adicione:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<seu host do provedor>
SMTP_USER=<seu nome de usuário>
SMTP_PASS=<sua senha ou chave de API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@suaigreja.org
```

Três provedores que vale a pena conhecer:

#### Resend -- opção gratuita mais simples (100 emails/dia)

1. Inscreva-se em [resend.com](https://resend.com).
2. Verifique um domínio de envio (ou use o remetente de teste `onboarding@resend.dev` para começar).
3. Crie uma chave de API.
4. Defina `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail -- gratuito para uso pessoal (~500/dia)

1. Ative autenticação de dois fatores na conta Google.
2. Crie uma [Senha de Aplicativo](https://myaccount.google.com/apppasswords).
3. Defina `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=seu-endereco@gmail.com`, `SMTP_PASS=<a senha de aplicativo de 16 caracteres>`.

#### AWS SES -- mais barato em escala

1. Verifique um domínio de envio no AWS.
2. Saia da sandbox SES se você enviar para endereços não verificados.
3. Crie credenciais SMTP sob **SES → SMTP Settings → Create credentials**.
4. Defina `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<senha SMTP SES>`.

Após salvar as variáveis, o serviço Api implanta automaticamente. Teste-o acionando uma redefinição de senha em uma conta de teste.

:::warning
Se você definir `MAIL_SYSTEM=SMTP` com credenciais ruins, o registro parecerá ter sucesso, mas o email de verificação nunca chega. Ou corrija as credenciais ou desdefina `MAIL_SYSTEM` para voltar ao modo sem email.
:::

### 2. Domínios Customizados

As URLs padrão `*.up.railway.app` funcionam, mas a maioria das igrejas quer as suas.

Para cada serviço web (B1Admin e B1App):

1. Abra o serviço em Railway → **Settings** → **Networking**.
2. Clique em **+ Custom Domain** e digite o hostname:
   - `admin.suaigreja.org` para B1Admin
   - `app.suaigreja.org` (ou `www`) para B1App
3. Adicione o registro CNAME que Railway mostra ao seu provedor DNS.
4. Aguarde alguns minutos para propagação de DNS. Railway provisiona o certificado TLS automaticamente.

Então atualize as variáveis do serviço **Api** para que os links em emails usem os novos domínios:

```
B1ADMIN_ROOT=https://admin.suaigreja.org
```

E no serviço **B1Admin**:

```
REACT_APP_API_BASE=https://api.suaigreja.org
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suaigreja.org
```

O token `{subdomain}` é literal -- é substituído em tempo de execução pelo subdomínio de cada igreja.

## Artigos Relacionados

- **[Configuração Inicial](../../getting-started/initial-setup)** -- Primeiros passos após sua igreja ser criada
- **[Configuração Inicial do Website](../../b1-admin/website/initial-setup)** -- Configure o site público da sua igreja
- **[Configurações de Doações](../../b1-admin/donations/online-giving-setup)** -- Conecte Stripe ou PayPal
