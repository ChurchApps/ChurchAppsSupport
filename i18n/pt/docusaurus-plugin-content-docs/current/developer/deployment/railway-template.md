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
5. Abra a URL do serviço **B1Admin**, clique em **Register** e crie sua conta. A primeira conta é automaticamente um administrador de servidor.
6. Siga as instruções no aplicativo para criar sua primeira igreja.

Isso é tudo. Você agora tem uma instância ChurchApps totalmente funcional. Tudo abaixo é polimento opcional.

:::tip
A implantação está atualmente em **beta**. Se você encontrar algo que os documentos não cobrem, abra uma issue em [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) com os logs de implantação anexados.
:::

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- Uma conta [Railway](https://railway.com) gratuita
- Um cartão de crédito registrado no Railway (~$15–25/mês para uma pequena congregação; veja [Custos](#costs))
- Cerca de 15 minutos para a implantação inicial
- *Opcional, mas fortemente recomendado depois:* credenciais SMTP e um domínio customizado

</div>

## O Que É Implantado

O modelo provisiona quatro serviços em um único projeto Railway:

| Serviço | Finalidade | URL após a implantação |
|---------|---------|------------------|
| **MySQL** | Armazena todos os dados (uma instância, múltiplos esquemas) | apenas interno |
| **Api** | Backend para membership, content, giving, attendance, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplicação web de equipe/administração | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplicação web voltada para membros e site da igreja | `https://b1app-<id>.up.railway.app` |

Os esquemas do banco de dados são criados automaticamente no primeiro lançamento pela migração de inicialização da API.

## Configuração Inicial

Agora que você está funcionando, aqui estão as coisas que a maioria das igrejas configura em seguida, em ordem aproximada de prioridade.

### 1. E-mail (Altamente Recomendado)

Sem e-mail, os membros ainda podem se registrar e usar o sistema, mas **eles não conseguem redefinir senhas esquecidas** -- um administrador precisa fazer isso por eles. Configurar SMTP leva cerca de 5 minutos.

No painel do Railway, abra o serviço **Api** → **Variables**, e adicione:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<host do seu provedor>
SMTP_USER=<seu nome de usuário>
SMTP_PASS=<sua senha ou chave de API>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@suaigreja.org
```

Três provedores que vale a pena conhecer:

#### Resend -- opção gratuita mais simples (100 e-mails/dia)

1. Cadastre-se em [resend.com](https://resend.com).
2. Verifique um domínio de envio (ou use o remetente de teste `onboarding@resend.dev` para começar).
3. Crie uma chave de API.
4. Defina `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail -- gratuito para uso pessoal (~500/dia)

1. Ative a autenticação de dois fatores na conta Google.
2. Crie uma [Senha de App](https://myaccount.google.com/apppasswords).
3. Defina `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=seu-endereco@gmail.com`, `SMTP_PASS=<a senha de app de 16 caracteres>`.

#### AWS SES -- mais barato em escala

1. Verifique um domínio de envio na AWS.
2. Saia do sandbox do SES se você for enviar para endereços não verificados.
3. Crie credenciais SMTP em **SES → SMTP Settings → Create credentials**.
4. Defina `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<senha SMTP do SES>`.

Depois de salvar as variáveis, o serviço Api é reimplantado automaticamente. Teste-o acionando uma redefinição de senha em uma conta de teste.

:::warning
Se você definir `MAIL_SYSTEM=SMTP` com credenciais incorretas, o registro parecerá ter sucesso, mas o e-mail de verificação nunca chega. Corrija as credenciais ou desfaça a definição de `MAIL_SYSTEM` para voltar ao modo sem e-mail.
:::

### 2. Domínios Customizados

As URLs padrão `*.up.railway.app` funcionam, mas a maioria das igrejas quer as suas próprias.

Para cada serviço web (B1Admin e B1App):

1. Abra o serviço no Railway → **Settings** → **Networking**.
2. Clique em **+ Custom Domain** e digite o hostname:
   - `admin.suaigreja.org` para B1Admin
   - `app.suaigreja.org` (ou `www`) para B1App
3. Adicione o registro CNAME que o Railway mostra ao seu provedor de DNS.
4. Aguarde alguns minutos para o DNS propagar. O Railway provisiona o certificado TLS automaticamente.

Depois atualize as variáveis do serviço **Api** para que os links nos e-mails usem os novos domínios:

```
B1ADMIN_ROOT=https://admin.suaigreja.org
```

E no serviço **B1Admin**:

```
REACT_APP_API_BASE=https://api.suaigreja.org   (se você também definiu um domínio de API customizado)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suaigreja.org
```

O token `{subdomain}` é literal -- ele é substituído em tempo de execução pelo subdomínio de cada igreja (veja Multi-Site abaixo).

### 3. Multi-Site (Múltiplas Igrejas em Uma Instância)

O ChurchApps é multilocatário por design -- uma implantação pode hospedar qualquer número de igrejas, cada uma com suas próprias pessoas, grupos e website. Novas igrejas são adicionadas inteiramente através da UI de administração; nenhuma alteração de infraestrutura é necessária.

#### Adicionando igrejas adicionais

1. No **B1 Admin**, navegue até **Settings → Manage Church → Switch Church → Create New**.
2. Cada igreja tem um **slug de subdomínio** único (por ex. `firstchurch`, `gracecommunity`).
3. A nova igreja recebe seus próprios dados, membros, website e configuração de doações, totalmente isolados das outras igrejas na mesma instância.

#### Roteando cada igreja para sua própria URL

Duas maneiras de expor igrejas publicamente:

| Padrão | Exemplo | Configuração |
|---------|---------|-------|
| **Baseado em caminho** (funciona pronto para uso) | `app.suaigreja.org/firstchurch` | Nenhuma configuração extra |
| **Baseado em subdomínio** (URLs mais limpas) | `firstchurch.suaigreja.org` | DNS curinga + domínio customizado curinga |

Para roteamento **baseado em subdomínio** no Railway:

1. No seu provedor de DNS, crie um CNAME curinga: `*.suaigreja.org → <alvo railway do b1app>`.
2. No Railway, no serviço B1App → **Settings → Networking**, adicione `*.suaigreja.org` como domínio customizado.
3. No serviço **B1Admin**, defina `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suaigreja.org`.

Após a reimplantação, o site de cada igreja é servido automaticamente em `<seu-subdominio>.suaigreja.org`.

:::info
Domínios customizados curinga requerem um plano pago do Railway. O roteamento baseado em caminho funciona em todos os planos e é funcionalmente idêntico -- apenas menos bonito na barra de URL.
:::

### 4. Doações Online (Stripe / PayPal)

As doações são configuradas **por igreja dentro da UI de administração**, não via variáveis de ambiente -- dessa forma, cada igreja pode usar sua própria conta de comerciante.

1. Obtenha credenciais de desenvolvedor do [Stripe](https://dashboard.stripe.com/) (Developers → API keys) ou [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. No B1 Admin, vá para **Settings → Giving Settings**.
3. Escolha seu provedor, cole as chaves Pública e Secreta, e configure o tratamento de taxas.
4. Opcionalmente, adicione `GOOGLE_RECAPTCHA_SECRET_KEY` ao serviço **Api** no Railway para proteger formulários de doação públicos contra bots.

### 5. Armazenamento de Arquivos

O modelo provisiona um **volume persistente de 1 GB** montado no serviço Api para fotos de membros, arquivos de sermões e documentos enviados.

Para aumentá-lo: abra o serviço Api → **Volumes** → ajuste o controle de tamanho.

Para implantações maiores (100+ GB ou muitos uploads simultâneos), mude para S3 definindo o seguinte no serviço **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<seu-bucket>
AWS_ACCESS_KEY_ID=<chave>
AWS_SECRET_ACCESS_KEY=<segredo>
AWS_REGION=us-east-2
```

Arquivos existentes no volume não migram automaticamente -- copie-os para o bucket antes de alternar a variável.

### 6. Integrações de Funcionalidades Opcionais

Elas desbloqueiam funcionalidades específicas e podem ser adicionadas depois via o painel do Railway. Defina-as no serviço **Api**.

| Variável | Funcionalidade que habilita |
|----------|--------------------|
| `OPENAI_API_KEY` *ou* `OPENROUTER_API_KEY` | Busca assistida por IA e sugestões de conteúdo |
| `YOUTUBE_API_KEY` | Busca e incorporação de sermões do YouTube |
| `PEXELS_KEY` | Seletor de imagens de banco para o construtor de website |
| `VIMEO_TOKEN` | Suporte a sermões do Vimeo |
| `API_BIBLE_KEY` | Consultas de versículos bíblicos em lições e conteúdo |
| `YOUVERSION_API_KEY` | Integração bíblica YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notificações push no navegador (gere um par de chaves VAPID) |
| `HUBSPOT_KEY` | Sincronização opcional de CRM para novos registros |

## Atualizando

Cada serviço está vinculado ao seu respectivo repositório GitHub. Pushes para `main` em `ChurchApps/Api`, `ChurchApps/B1Admin`, ou `ChurchApps/B1App` acionam reimplantações automáticas.

Para fixar uma versão específica, mude a configuração de **Branch** em cada serviço para uma tag ou branch de release. Esta é a configuração recomendada para produção -- implantar automaticamente a partir de `main` significa que você herda qualquer trabalho em andamento.

## Custos

Faixas do mundo real para uma pequena igreja (menos de 200 membros, tráfego leve):

| Componente | Custo mensal aproximado |
|-----------|---------------------|
| Base do Railway | $5 |
| Plugin MySQL | $5 + ~$1 armazenamento |
| Computação de 3 serviços web | $3–10 combinados |
| Volume de 1 GB | $0,25 |
| **Total** | **~$15–25/mês** |

Os custos escalam linearmente com tráfego, uploads de fotos e tamanho do banco de dados. O Railway mostra o uso ao vivo na aba **Usage** do projeto -- defina limites de gastos ali para limitar sua exposição.

## Solução de Problemas

| Sintoma | Causa provável | Correção |
|---------|--------------|-----|
| Build falha com `EBUSY: rmdir '/app/node_modules/.cache'` | Conflito de cache mount do Nixpacks | Defina `NIXPACKS_NO_CACHE=true` no serviço afetado |
| Build falha no B1Admin com `Missing: @types/...` | `package-lock.json` fora de sincronia | Puxe o `main` mais recente |
| Implantação da Api trava em "Deploying" | Healthcheck falhando -- `/health` não retorna 200 | Veja os logs de implantação; geralmente é uma variável de ambiente obrigatória ausente |
| B1Admin mostra "check your email" mas nenhum e-mail chega | `MAIL_SYSTEM=SMTP` definido mas credenciais ausentes/incorretas | Corrija as credenciais, ou desfaça a definição de `MAIL_SYSTEM` para desabilitar e-mail |
| Login redireciona para `api.churchapps.org` | `REACT_APP_STAGE` é `prod` | Defina `REACT_APP_STAGE=custom` no serviço B1Admin |
| Igrejas por subdomínio mostram todas o mesmo conteúdo | `REACT_APP_B1_WEBSITE_URL` não inclui o token `{subdomain}` | Defina-o como, por ex., `https://{subdomain}.suaigreja.org` |
| Domínio customizado mostra "Application not found" | DNS ainda não propagou, ou certificado do Railway pendente | Aguarde 5 minutos; verifique o DNS com `dig admin.suaigreja.org` |

Se você encontrar algo que não está nesta lista, abra uma issue em [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) com os logs de implantação anexados.

## Artigos Relacionados

- **[Auto-Hospedagem com Docker](./docker)** -- A mesma stack em seu próprio hardware ou VPS
- **[Configuração Inicial](../../getting-started/initial-setup)** -- Primeiros passos após sua igreja ser criada
- **[Configuração Inicial do Website](../../b1-admin/website/initial-setup)** -- Configure o site público da sua igreja
- **[Configurações de Doações](../../b1-admin/donations/online-giving-setup)** -- Conecte Stripe ou PayPal
- **[Configuração Local da API](../api/local-setup)** -- Executando a stack localmente para desenvolvimento
- **[Implantação da API (AWS)](./apis)** -- Como o SaaS oficial do ChurchApps é implantado
