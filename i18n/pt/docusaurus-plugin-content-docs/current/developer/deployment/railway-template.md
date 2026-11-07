---
title: "Auto-hospedagem no Railway"
description: "Implante uma instância privada da ChurchApps no Railway em cerca de 15 minutos e configure e-mail, domínios, roteamento multi-igreja, doações e arquivos."
---

# Auto-hospedagem no Railway

<div class="article-intro">

O ChurchApps publica um modelo de um clique para o [Railway](https://railway.com) que dá à sua igreja uma instância privada do B1 Admin, do portal de membros B1, da API e de um banco de dados MySQL — tudo rodando em uma infraestrutura que você possui e paga diretamente. Este guia coloca tudo no ar em cerca de 15 minutos e depois percorre a configuração pós-implantação que a maioria das igrejas acaba querendo.

</div>

## Início rápido

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Clique no botão **Deploy on Railway** acima.
2. Entre no Railway (ou crie uma conta gratuita) e adicione uma forma de pagamento.
3. Clique em **Deploy** sem alterar nada — cada variável tem um padrão sensato.
4. Espere de 5 a 10 minutos até os quatro serviços ficarem verdes.
5. Abra a URL do serviço **B1Admin**, clique em **Registrar** e crie sua conta. A primeira conta é automaticamente administradora do servidor.
6. Siga as instruções no aplicativo para criar sua primeira igreja.

Pronto. Você já tem uma instância do ChurchApps totalmente funcional. Tudo abaixo é um acabamento opcional.

:::tip
A implantação está atualmente em **beta**. Se você encontrar algo que a documentação não cobre, abra uma issue em [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) com os logs de implantação anexados.
:::

<div class="prereqs">
<h4>O que você precisa</h4>

- Uma conta gratuita no [Railway](https://railway.com)
- Um cartão de crédito cadastrado no Railway (cerca de US$ 15–25/mês para uma congregação pequena; veja [Custos](#costs))
- Cerca de 15 minutos para a implantação inicial
- *Opcional, mas fortemente recomendado depois:* credenciais SMTP e um domínio personalizado

</div>

## O que é implantado

O modelo provisiona quatro serviços em um único projeto do Railway:

| Serviço | Finalidade | URL após a implantação |
|---------|------------|------------------------|
| **MySQL** | Armazena todos os dados (uma instância, vários esquemas) | somente interna |
| **Api** | Backend de membership, conteúdo, doações, presença etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplicativo web da equipe/administração | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplicativo web para membros e site da igreja | `https://b1app-<id>.up.railway.app` |

Os esquemas do banco de dados são criados automaticamente no primeiro start pela migração de inicialização da API.

## Configuração inicial

Agora que está no ar, estas são as coisas que a maioria das igrejas configura em seguida, mais ou menos por ordem de prioridade.

### 1. E-mail (altamente recomendado) {#1-email-highly-recommended}

Sem e-mail, os membros ainda conseguem se cadastrar e usar o sistema, mas **não conseguem redefinir uma senha esquecida** — um administrador precisa fazer isso por eles. Configurar o SMTP leva cerca de 5 minutos.

No painel do Railway, abra o serviço **Api** → **Variables** e adicione:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<your provider host>
SMTP_USER=<your username>
SMTP_PASS=<your password or API key>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Três provedores que vale conhecer:

#### Resend — opção gratuita mais simples (100 e-mails/dia)

1. Cadastre-se em [resend.com](https://resend.com).
2. Verifique um domínio de envio (ou use o remetente de teste `onboarding@resend.dev` para começar).
3. Crie uma chave de API.
4. Defina `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — gratuito para uso pessoal (~500/dia)

1. Ative a verificação em duas etapas na conta do Google.
2. Crie uma [Senha de app](https://myaccount.google.com/apppasswords).
3. Defina `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=seu-endereco@gmail.com`, `SMTP_PASS=<a senha de app de 16 caracteres>`.

#### AWS SES — o mais barato em escala

1. Verifique um domínio de envio na AWS.
2. Saia do sandbox do SES se for enviar para endereços não verificados.
3. Crie credenciais SMTP em **SES → SMTP Settings → Create credentials**.
4. Defina `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<senha SMTP do SES>`.

Depois de salvar as variáveis, o serviço Api é reimplantado automaticamente. Teste disparando uma redefinição de senha em uma conta de teste.

:::warning
Se você definir `MAIL_SYSTEM=SMTP` com credenciais erradas, o cadastro vai parecer bem-sucedido, mas o e-mail de verificação nunca chega. Corrija as credenciais ou remova `MAIL_SYSTEM` para voltar ao modo sem e-mail.
:::

### 2. Domínios personalizados

As URLs padrão `*.up.railway.app` funcionam, mas a maioria das igrejas quer as suas próprias.

Para cada serviço web (B1Admin e B1App):

1. Abra o serviço no Railway → **Settings** → **Networking**.
2. Clique em **+ Custom Domain** e informe o nome do host:
   - `admin.suaigreja.org` para o B1Admin
   - `app.suaigreja.org` (ou `www`) para o B1App
3. Adicione o registro CNAME que o Railway mostrar ao seu provedor de DNS.
4. Aguarde alguns minutos para a propagação do DNS. O Railway provisiona o certificado TLS automaticamente.

Depois, atualize as variáveis do serviço **Api** para que os links nos e-mails usem os novos domínios:

```
B1ADMIN_ROOT=https://admin.suaigreja.org
```

E no serviço **B1Admin**:

```
REACT_APP_API_BASE=https://api.suaigreja.org   (se você também definir um domínio de API personalizado)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suaigreja.org
```

O token `{subdomain}` é literal — ele é substituído em tempo de execução pelo subdomínio de cada igreja (veja Multi-Site abaixo).

### 3. Multi-site (várias igrejas em uma instância) {#3-multi-site-multiple-churches-on-one-instance}

O ChurchApps é multi-inquilino por design — uma única implantação pode hospedar qualquer número de igrejas, cada uma com suas próprias pessoas, grupos e site. Novas igrejas são adicionadas inteiramente pela interface administrativa; não são necessárias mudanças de infraestrutura.

#### Adicionando igrejas extras

1. No **B1 Admin**, acesse **Configurações → Gerenciar igreja → Trocar de igreja → Criar nova**.
2. Cada igreja tem um **slug de subdomínio** exclusivo (por exemplo, `primeiraigreja`, `graca-comunidade`).
3. A nova igreja recebe seus próprios dados, membros, site e configuração de doações, totalmente isolados das outras igrejas da mesma instância.

#### Roteando cada igreja para a sua própria URL

Duas formas de expor as igrejas publicamente:

| Padrão | Exemplo | Configuração |
|--------|---------|--------------|
| **Por caminho** (funciona de imediato) | `app.suaigreja.org/primeiraigreja` | Nenhuma configuração extra |
| **Por subdomínio** (URLs mais limpas) | `primeiraigreja.suaigreja.org` | DNS curinga + domínio personalizado curinga |

Para o roteamento **por subdomínio** no Railway:

1. No seu provedor de DNS, crie um CNAME curinga: `*.suaigreja.org → <destino do railway do b1app>`.
2. No Railway, no serviço B1App → **Settings → Networking**, adicione `*.suaigreja.org` como domínio personalizado.
3. No serviço **B1Admin**, defina `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.suaigreja.org`.

Depois de reimplantar, o site de cada igreja fica disponível em `<subdominio-da-igreja>.suaigreja.org` automaticamente.

:::info
Domínios personalizados curinga exigem um plano pago do Railway. O roteamento por caminho funciona em todos os planos e é funcionalmente idêntico — só menos bonito na barra de endereços.
:::

### 4. Doações online (Stripe / PayPal) {#4-online-giving-stripe--paypal}

As doações são configuradas **por igreja, dentro da interface administrativa**, e não por variáveis de ambiente — assim cada igreja pode usar a sua própria conta de comerciante.

1. Obtenha as credenciais de desenvolvedor no [Stripe](https://dashboard.stripe.com/) (Developers → API keys) ou no [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. No B1 Admin, acesse **Configurações → Configurações de doações**.
3. Escolha o seu provedor, cole as chaves Pública e Secreta e configure o tratamento das taxas.
4. Opcionalmente, adicione `GOOGLE_RECAPTCHA_SECRET_KEY` ao serviço **Api** no Railway para proteger os formulários públicos de doação contra robôs.

### 5. Armazenamento de arquivos {#5-file-storage}

O modelo provisiona um **volume persistente de 1 GB** montado no serviço Api para fotos de membros, arquivos de sermões e documentos enviados.

Para aumentá-lo: abra o serviço Api → **Volumes** → ajuste o controle deslizante de tamanho.

Para implantações maiores (100+ GB ou muitos envios simultâneos), troque para o S3 definindo estas variáveis no serviço **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<seu-bucket>
AWS_ACCESS_KEY_ID=<chave>
AWS_SECRET_ACCESS_KEY=<segredo>
AWS_REGION=us-east-2
```

Os arquivos já existentes no volume não migram automaticamente — copie-os para o bucket antes de trocar a variável.

### 6. Integrações opcionais de recursos {#6-optional-feature-integrations}

Estas liberam recursos específicos e podem ser adicionadas depois pelo painel do Railway. Defina-as no serviço **Api**.

| Variável | Recurso que habilita |
|----------|----------------------|
| `OPENAI_API_KEY` *ou* `OPENROUTER_API_KEY` | Busca assistida por IA e sugestões de conteúdo |
| `YOUTUBE_API_KEY` | Busca e incorporação de sermões do YouTube |
| `PEXELS_KEY` | Seletor de imagens de banco de imagens para o criador de sites |
| `VIMEO_TOKEN` | Suporte a sermões do Vimeo |
| `API_BIBLE_KEY` | Consultas de versículos bíblicos em lições e conteúdo |
| `YOUVERSION_API_KEY` | Integração com a Bíblia YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Notificações push no navegador ([gere um par de chaves VAPID](./docker.md#push-notifications)) |
| `HUBSPOT_KEY` | Sincronização opcional com CRM para novos cadastros |

## Atualizando

Cada serviço está vinculado ao seu repositório do GitHub. Pushes para `main` em `ChurchApps/Api`, `ChurchApps/B1Admin` ou `ChurchApps/B1App` disparam reimplantações automáticas.

Para fixar uma versão específica, altere a configuração **Branch** de cada serviço para uma tag ou branch de release. Esta é a configuração recomendada para produção — a implantação automática a partir de `main` faz você herdar qualquer trabalho em andamento.

## Custos {#costs}

Faixas reais para uma igreja pequena (menos de 200 membros, tráfego leve):

| Componente | Custo mensal aproximado |
|------------|-------------------------|
| Base do Railway | US$ 5 |
| Plugin MySQL | US$ 5 + ~US$ 1 de armazenamento |
| Computação dos 3 serviços web | US$ 3–10 no total |
| Volume de 1 GB | US$ 0,25 |
| **Total** | **~US$ 15–25/mês** |

Os custos crescem linearmente com o tráfego, os envios de fotos e o tamanho do banco de dados. O Railway mostra o uso em tempo real na aba **Usage** do projeto — defina limites de gasto ali para limitar sua exposição.

## Solução de problemas

| Sintoma | Causa provável | Correção |
|---------|----------------|----------|
| O build falha com `EBUSY: rmdir '/app/node_modules/.cache'` | conflito do cache de montagem do Nixpacks | Defina `NIXPACKS_NO_CACHE=true` no serviço afetado |
| O build falha no B1Admin com `Missing: @types/...` | `package-lock.json` fora de sincronia | Atualize para o `main` mais recente |
| O deploy da Api fica preso em "Deploying" | verificação de saúde falhando — `/health` não retorna 200 | Veja os logs de deploy; normalmente falta uma variável obrigatória |
| O B1Admin mostra "verifique seu e-mail", mas nenhum e-mail chega | `MAIL_SYSTEM=SMTP` definido, mas credenciais ausentes ou erradas | Corrija as credenciais, ou remova `MAIL_SYSTEM` para desativar o e-mail |
| O login redireciona para `api.churchapps.org` | `REACT_APP_STAGE` está como `prod` | Defina `REACT_APP_STAGE=custom` no serviço B1Admin |
| Todas as igrejas por subdomínio mostram o mesmo conteúdo | `REACT_APP_B1_WEBSITE_URL` não inclui o token `{subdomain}` | Defina como, por exemplo, `https://{subdomain}.suaigreja.org` |
| Domínio personalizado mostra "Application not found" | DNS ainda não propagado, ou certificado do Railway pendente | Aguarde 5 minutos; verifique o DNS com `dig admin.suaigreja.org` |

Se você encontrar algo que não está nesta lista, abra uma issue em [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) com os logs de implantação anexados.

## Artigos relacionados

- **[Auto-hospedagem com Docker](./docker.md)** — a mesma stack no seu próprio hardware ou VPS
- **[Configuração inicial](../../getting-started/initial-setup.md)** — primeiros passos depois que sua igreja é criada
- **[Configuração inicial do site](../../b1-admin/website/initial-setup.md)** — configure o site público da sua igreja
- **[Configurações de doações](../../b1-admin/donations/online-giving-setup.md)** — conecte o Stripe ou o PayPal
- **[Configuração local da API](../api/local-setup.md)** — executando a stack localmente para desenvolvimento
- **[Implantação da API (AWS)](./apis.md)** — como o SaaS oficial do ChurchApps é implantado
