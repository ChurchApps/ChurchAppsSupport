---
title: "Hospedagem Própria com Docker"
---

# Hospedagem Própria com Docker

<div class="article-intro">

Execute sua própria instância privada do B1 Admin, do portal de membros e site B1, da API e de um banco de dados MySQL em qualquer máquina com Docker — um servidor doméstico, um pequeno VPS ou um equipamento local. Um único comando instala, outro atualiza, e cada atualização faz um backup antes. Se preferir não gerenciar um servidor, consulte [Hospedagem no Railway](./railway-template) para a alternativa gerenciada.

</div>

## Início Rápido

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- Uma máquina Linux (ou macOS / Windows com WSL ou Git Bash — o auxiliar `b1` é um script bash) com [Docker Engine](https://docs.docker.com/engine/install/) e Compose v2 (incluído no Docker Desktop)
- Cerca de 2 GB de RAM e 5 GB de disco
- Para um site público: um nome de domínio apontando para a máquina, com as portas 80 e 443 acessíveis

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Omita `--domain` para executar em `http://localhost`. O instalador cria uma pasta `b1church`, grava um `.env` com segredos recém-gerados, baixa as imagens pré-compiladas do GitHub Container Registry e aguarda até que a API informe que está saudável. Nada é compilado na sua máquina, então a primeira inicialização leva um ou dois minutos.

Quando terminar:

1. Abra **https://church.example.org/admin** (ou http://localhost/admin) e clique em **Register**. A primeira conta se torna automaticamente um administrador do servidor.
2. Siga as instruções do aplicativo para criar sua primeira igreja. O site e o portal de membros dela ficam disponíveis em **https://church.example.org/** assim que ela existir.

Tudo funciona atrás de um único domínio:

| Caminho | Serviço |
|------|---------|
| `/` | B1App — site da igreja e portal de membros |
| `/admin` | B1Admin — painel da equipe |
| `/api` | API, arquivos enviados e o websocket de atualizações ao vivo |

O HTTPS é automático: o proxy [Caddy](https://caddyserver.com/) incluído obtém e renova um certificado do Let's Encrypt para o domínio definido no `.env`. Apenas as portas 80 e 443 são expostas; o banco de dados só é acessível dentro da rede Docker.

## O comando `b1`

O instalador deixa um script `deploy/b1` ao lado do `docker-compose.yml`. Ele é a única coisa de que você precisa no dia a dia:

| Comando | O que faz |
|---------|--------------|
| `./deploy/b1 upgrade` | Baixa a versão atual, faz um backup, reinicia e verifica se a API está saudável |
| `./deploy/b1 upgrade 2026.10.1` | Igual ao anterior, fixado em uma versão específica |
| `./deploy/b1 backup` | Cria um snapshot do banco de dados, dos arquivos enviados e do `.env` em `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Restaura um snapshot (a API para enquanto isso ocorre) |
| `./deploy/b1 rollback` | Restaura o backup mais recente, incluindo a versão em que foi feito |
| `./deploy/b1 status` | Versão instalada e saúde dos contêineres |
| `./deploy/b1 logs api` | Acompanha os logs de um serviço |

As versões são publicadas como um único pacote versionado, para que as três imagens sempre correspondam. `B1_VERSION=stable` no `.env` acompanha a versão mais recente; defina uma versão específica para fixá-la. As notas de lançamento estão em [Versões do B1Admin](https://github.com/ChurchApps/B1Admin/releases).

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

Após editar o `.env`, aplique as alterações com `docker compose up -d`. Os aplicativos web descobrem qual API usar pelo endereço no navegador, então mudar o domínio exige apenas atualizar `SITE_ADDRESS` e `PUBLIC_URL` e reiniciar — sem recompilar.

:::warning
Mantenha o `.env` em segurança. `ENCRYPTION_KEY` protege as credenciais armazenadas do gateway de pagamento e do armazenamento; um backup sem ela não consegue descriptografá-las. `./deploy/b1 backup` inclui uma cópia dela por esse motivo.
:::

### Mudando para um domínio depois

Se você instalou em `localhost` e depois quer torná-lo público: aponte o DNS para a máquina, defina `DOMAIN`, `SITE_ADDRESS` (apenas o domínio) e `PUBLIC_URL` (`https://` + domínio) no `.env`, e então execute `docker compose up -d`. O Caddy obtém um certificado na primeira requisição.

## E-mail, Giving, Multissite e Integrações

Estes funcionam exatamente como no Railway — as mesmas variáveis de ambiente, definidas no `.env` em vez do painel do Railway:

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** — guias de provedores para Resend, Brevo e Gmail
- **[Multissite](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — igrejas ilimitadas por instância. `/` serve a igreja cujo slug é `DEFAULT_CHURCH_SLUG` (a primeira igreja é `church`); aponte domínios extras para a máquina e mapeie-os em **Settings → Domains** no B1Admin
- **[Doações online](./railway-template#4-online-giving-stripe--paypal)** — configuradas por igreja na interface administrativa
- **[Integrações opcionais](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_*`, `GOOGLE_RECAPTCHA_SECRET_KEY`

Convites e outros e-mails enviados pela igreja são habilitados automaticamente em uma instância própria (o serviço hospedado os condiciona a uma revisão manual para proteger a reputação do remetente).

## Dados, Backups e Armazenamento de Arquivos

Três volumes nomeados do Docker guardam todo o estado:

| Volume | Conteúdo |
|--------|----------|
| `b1church_mysql-data` | Todos os schemas do banco de dados |
| `b1church_api-content` | Arquivos enviados — fotos, documentos, imagens do site |
| `b1church_caddy-data` | Certificados TLS |

`./deploy/b1 backup` grava um snapshot consistente dos dois primeiros, além do `.env`, em `backups/<timestamp>/`. Agende-o com o cron e copie a pasta para fora da máquina:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Para bibliotecas de mídia grandes, você pode mudar o armazenamento de arquivos para o S3 — defina `FILE_STORE=S3` e as variáveis `AWS_*` descritas na [seção de Armazenamento de Arquivos do guia do Railway](./railway-template#5-file-storage). Os backups do banco de dados não incluem objetos do S3; habilite o versionamento do bucket nele.

## Atualizando

```bash
./deploy/b1 upgrade
```

Em ordem: baixa a versão, faz um backup, recria os contêineres, executa as migrações pendentes do banco de dados ao iniciar a API e aguarda a verificação de saúde da API. Se algo falhar, ele para e informa para executar `./deploy/b1 rollback`, que restaura esse backup e a versão anterior. As migrações são somente para frente; reverter sempre significa restaurar o snapshot.

Para atualizar a partir do arquivo compose beta (aquele que compilava as imagens a partir do código-fonte), o processo é igual depois que você tiver um `.env`: ele usava `MYSQL_ROOT_PASSWORD=churchapps` por padrão, então coloque isso no `.env` junto com `PUBLIC_URL` e `SITE_ADDRESS`, substitua o `docker-compose.yml` e a pasta `deploy/` pelos arquivos atuais e execute `./deploy/b1 upgrade`.

## Compilando a partir do código-fonte

Desenvolvedores podem compilar as imagens localmente em vez de baixá-las:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` e `B1APP_CONTEXT` no `.env` apontam as compilações para cópias locais (por exemplo, `../Api`) ou para uma referência git.

## Solução de Problemas

| Sintoma | Causa provável | Solução |
|---------|--------------|-----|
| O contêiner `api` reinicia em loop | falha na migração ou senha do banco de dados incorreta | `./deploy/b1 logs api` — a migração mostra qual módulo falhou |
| `api` registra "ENCRYPTION_KEY must be exactly 32 characters" | chave editada manualmente ou truncada no `.env` | restaure a chave original de 32 caracteres (gere uma nova somente se nenhuma credencial estiver armazenada ainda) |
| O navegador mostra um aviso de certificado | DNS ainda não aponta para cá, ou portas 80/443 bloqueadas | corrija o DNS / firewall; o Caddy tenta novamente sozinho |
| `/` mostra um painel em vez do site | nenhuma igreja ainda, ou `DEFAULT_CHURCH_SLUG` não corresponde | crie a igreja, ou defina o slug em **Settings → Church** |
| "Check your email", mas nenhum e-mail chega | `MAIL_SYSTEM=SMTP` com credenciais inválidas | corrija as credenciais, ou remova `MAIL_SYSTEM` para desativar o e-mail |
| Chat / recursos ao vivo silenciosos | websocket bloqueado por outro proxy na frente | o socket fica em `/api/` na mesma porta; permita os cabeçalhos `Upgrade` |
| `install` recusa: "database volume already exists" | restos de uma instalação anterior | `docker compose down -v` para apagar, ou escreva um `.env` e use `upgrade` |

Ainda com problemas? Abra uma issue em [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) com a saída de `./deploy/b1 logs`.

## Artigos Relacionados

- **[Hospedagem no Railway](./railway-template)** — alternativa de hospedagem gerenciada, além dos guias de configuração pós-implantação compartilhados
- **[Configuração Inicial](../../getting-started/initial-setup)** — primeiros passos depois que sua igreja for criada
- **[Configuração Local da API](../api/local-setup)** — executar a stack diretamente para desenvolvimento
