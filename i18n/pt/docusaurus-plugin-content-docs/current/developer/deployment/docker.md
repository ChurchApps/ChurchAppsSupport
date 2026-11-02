---
title: "Auto-hospedagem com Docker"
---

# Auto-hospedagem com Docker

<div class="article-intro">

Execute sua própria instância privada do B1 Admin, do portal de membros e site B1, da API e de um banco de dados MySQL em qualquer máquina com Docker — um servidor doméstico, um VPS pequeno ou uma caixa local. Um único comando instala, um único comando atualiza, e toda atualização faz um backup antes. Se você preferir não gerenciar um servidor, veja [Auto-hospedagem no Railway](./railway-template) para a alternativa gerenciada.

</div>

## Início rápido

<div class="prereqs">
<h4>O que você precisa</h4>

- Uma máquina Linux (ou macOS / Windows com WSL ou Git Bash — o auxiliar `b1` é um script bash) com o [Docker Engine](https://docs.docker.com/engine/install/) e o Compose v2 (incluído no Docker Desktop)
- Cerca de 2 GB de RAM e 5 GB de disco
- Para um site público: um nome de domínio apontando para a máquina, com as portas 80 e 443 acessíveis

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Omita `--domain` para executar em `http://localhost`. O instalador cria uma pasta `b1church`, grava um `.env` com segredos gerados na hora, baixa as imagens prontas do GitHub Container Registry e espera até que a API informe que está saudável. Nada é compilado na sua máquina, então a primeira inicialização leva um ou dois minutos.

Quando terminar:

1. Abra **https://church.example.org/admin** (ou http://localhost/admin) e clique em **Registrar**. A primeira conta é automaticamente administradora do servidor.
2. Siga as instruções no aplicativo para criar sua primeira igreja. O site e o portal de membros dela ficam no ar em **https://church.example.org/** assim que ela existir.

Tudo roda atrás de um único domínio:

| Caminho | Serviço |
|---------|---------|
| `/` | B1App — site da igreja e portal de membros |
| `/admin` | B1Admin — painel da equipe |
| `/api` | API, arquivos enviados e o websocket de atualizações ao vivo |

O HTTPS é automático: o proxy [Caddy](https://caddyserver.com/) incluído obtém e renova um certificado Let's Encrypt para o domínio do `.env`. Somente as portas 80 e 443 ficam expostas; o banco de dados é acessível apenas de dentro da rede Docker.

## O comando `b1`

O instalador deixa um script `deploy/b1` ao lado do `docker-compose.yml`. É a única coisa de que você precisa no dia a dia:

| Comando | O que faz |
|---------|-----------|
| `./deploy/b1 upgrade` | Baixa a versão atual, faz um backup, reinicia e verifica se a API está saudável |
| `./deploy/b1 upgrade 2026.10.1` | Igual, fixado em uma versão específica |
| `./deploy/b1 backup` | Gera um instantâneo do banco de dados, dos arquivos enviados e do `.env` em `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Restaura um instantâneo (a API para enquanto roda) |
| `./deploy/b1 rollback` | Restaura o backup mais recente, incluindo a versão em que ele foi feito |
| `./deploy/b1 status` | Versão instalada e saúde dos contêineres |
| `./deploy/b1 logs api` | Acompanha os logs de um serviço |

As versões são publicadas como um único pacote versionado, de modo que as três imagens sempre coincidem. `B1_VERSION=stable` no `.env` acompanha a versão mais recente; defina uma versão específica para fixar. As notas de cada versão ficam em [versões do B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Configuração

Todas as configurações ficam no `.env`, ao lado do `docker-compose.yml`. O instalador preenche as obrigatórias:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # what Caddy serves; http://localhost for a local install
PUBLIC_URL=https://church.example.org    # how browsers and emails reach the site
MYSQL_ROOT_PASSWORD=…                    # generated
JWT_SECRET=…                             # generated
ENCRYPTION_KEY=…                         # generated, exactly 32 characters — never change it after storing credentials

# Email — strongly recommended; without it members can't reset their own passwords
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Depois de editar o `.env`, aplique com `docker compose up -d`. Os aplicativos web descobrem qual API usar pelo endereço no navegador, então mudar o domínio exige apenas atualizar `SITE_ADDRESS` e `PUBLIC_URL` e reiniciar — sem recompilar.

:::warning
Guarde o `.env` com segurança. A `ENCRYPTION_KEY` protege as credenciais armazenadas dos gateways de pagamento e do armazenamento; um backup sem ela não consegue descriptografá-las. O `./deploy/b1 backup` inclui uma cópia dele por esse motivo.
:::

### Passando a usar um domínio depois

Se você instalou em `localhost` e depois quer torná-lo público: aponte o DNS para a máquina, defina `DOMAIN`, `SITE_ADDRESS` (o domínio puro) e `PUBLIC_URL` (`https://` + domínio) no `.env`, depois execute `docker compose up -d`. O Caddy busca um certificado na primeira requisição.

## E-mail, doações, multi-site e integrações

Estes funcionam exatamente como no Railway — as mesmas variáveis de ambiente, definidas no `.env` em vez do painel do Railway:

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** — guias de provedores para Resend, Brevo e Gmail
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — igrejas ilimitadas por instância. `/` serve a igreja cujo slug é `DEFAULT_CHURCH_SLUG` (a primeira igreja é `church`); aponte domínios extras para a máquina e mapeie-os em **Configurações → Domínios** no B1Admin
- **[Doações online](./railway-template#4-online-giving-stripe--paypal)** — configuradas por igreja na interface administrativa
- **[Integrações opcionais](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Notificações push](#push-notifications)** — `WEB_PUSH_*`; o instalador deixa estes em branco, então o push fica desligado até você adicioná-los

Convites e outros e-mails enviados pela igreja são ativados automaticamente em uma instância auto-hospedada (o serviço hospedado os submete a uma análise manual para proteger a reputação do remetente).

## Notificações push {#push-notifications}

O push para navegador e web móvel fica desligado até que o servidor tenha um par de chaves VAPID. O instalador não cria esse par. Até você adicioná-lo, a página de Notificações do aplicativo web móvel informa que o push não está ativado para o site.

1. Gere um par de chaves. Isso só precisa do Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Adicione os dois valores ao `.env`. `WEB_PUSH_SUBJECT` é opcional e é o endereço de contato que os serviços de push veem:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Aplique:

   ```bash
   docker compose up -d
   ```

4. Para confirmar, abra **Administração do servidor → Saúde do servidor** no B1Admin. As duas chaves do Web Push devem aparecer como configuradas. Os membros podem então ativar as notificações pelo aplicativo web móvel.

:::warning
Mantenha as mesmas chaves depois que os membros se cadastrarem. Trocá-las invalida todas as assinaturas existentes, e cada dispositivo precisa se registrar de novo.
:::

## Dados, backups e armazenamento de arquivos

Três volumes nomeados do Docker guardam todo o estado:

| Volume | Conteúdo |
|--------|----------|
| `b1church_mysql-data` | Todos os esquemas do banco de dados |
| `b1church_api-content` | Arquivos enviados — fotos, documentos, imagens do site |
| `b1church_caddy-data` | Certificados TLS |

O `./deploy/b1 backup` grava um instantâneo consistente dos dois primeiros, mais o `.env`, em `backups/<timestamp>/`. Agende-o com o cron e copie a pasta para fora da máquina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Para bibliotecas de mídia grandes, você pode trocar o armazenamento de arquivos para o S3 — defina `FILE_STORE=S3` mais as variáveis `AWS_*` descritas na [seção de Armazenamento de arquivos do guia do Railway](./railway-template#5-file-storage). Os backups do banco de dados não incluem objetos do S3; ative o versionamento do bucket lá.

## Atualizando

```bash
./deploy/b1 upgrade
```

Na ordem: baixa a versão, faz um backup, recria os contêineres, executa as migrações pendentes do banco de dados conforme a API inicia e espera a verificação de saúde da API. Se algo falhar, ele para e orienta a executar `./deploy/b1 rollback`, que restaura esse backup e a versão anterior. As migrações são apenas para frente; reverter sempre significa restaurar o instantâneo.

Atualizar a partir do arquivo compose beta (aquele que compilava as imagens a partir do código-fonte) funciona da mesma forma, depois que você tiver um `.env`: ele usava `MYSQL_ROOT_PASSWORD=churchapps` por padrão, então coloque isso no `.env` junto com `PUBLIC_URL` e `SITE_ADDRESS`, substitua o `docker-compose.yml` e a pasta `deploy/` pelos arquivos atuais e execute `./deploy/b1 upgrade`.

## Compilando a partir do código-fonte

Desenvolvedores podem compilar as imagens localmente em vez de baixá-las:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` e `B1APP_CONTEXT` no `.env` apontam as compilações para cópias locais (por exemplo, `../Api`) ou para uma referência do git.

## Solução de problemas

| Sintoma | Causa provável | Correção |
|---------|----------------|----------|
| O contêiner `api` reinicia em loop | falha de migração ou senha errada do banco de dados | `./deploy/b1 logs api` — a migração mostra qual módulo falhou |
| `api` registra "ENCRYPTION_KEY must be exactly 32 characters" | chave editada à mão ou truncada no `.env` | restaure a chave original de 32 caracteres (gere uma nova só se nenhuma credencial estiver armazenada ainda) |
| O navegador mostra aviso de certificado | DNS ainda não aponta para cá, ou portas 80/443 bloqueadas | corrija o DNS / o firewall; o Caddy tenta de novo sozinho |
| `/` mostra um painel em vez do site | nenhuma igreja ainda, ou `DEFAULT_CHURCH_SLUG` não corresponde | crie a igreja, ou defina o slug em **Configurações → Igreja** |
| "Verifique seu e-mail", mas nenhum e-mail chega | `MAIL_SYSTEM=SMTP` com credenciais erradas | corrija as credenciais, ou remova `MAIL_SYSTEM` para desativar o e-mail |
| O aplicativo web móvel diz que as notificações push não estão ativadas | sem chaves VAPID no servidor | adicione-as como descrito em [Notificações push](#push-notifications) |
| Chat / recursos ao vivo silenciosos | websocket bloqueado por outro proxy na frente | o socket fica em `/api/` na mesma porta; permita os cabeçalhos `Upgrade` |
| `install` recusa: "database volume already exists" | restos de uma instalação anterior | `docker compose down -v` para apagar, ou escreva um `.env` e use `upgrade` |

Ainda com problemas? Abra uma issue em [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) com a saída de `./deploy/b1 logs`.

## Artigos relacionados

- **[Auto-hospedagem no Railway](./railway-template)** — alternativa de hospedagem gerenciada, além dos guias de configuração pós-implantação compartilhados
- **[Configuração inicial](../../getting-started/initial-setup)** — primeiros passos depois que sua igreja é criada
- **[Configuração local da API](../api/local-setup)** — executando a stack diretamente para desenvolvimento
