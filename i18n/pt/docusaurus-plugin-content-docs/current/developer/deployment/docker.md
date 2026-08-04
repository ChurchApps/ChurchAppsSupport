---
title: "Auto-Hospedagem com Docker"
---

# Auto-Hospedagem com Docker

<div class="article-intro">

Execute sua própria instância privada do B1 Admin, do portal de membros B1, da API, e de um banco de dados MySQL em qualquer máquina com Docker — um servidor doméstico, um VPS de $5, ou uma caixa on-premise. Um único `docker compose up` constrói e inicia tudo. Se você preferir não gerenciar um servidor de forma alguma, veja [Auto-Hospedagem no Railway](./railway-template) para a alternativa gerenciada.

</div>

## Início Rápido

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) com Compose v2 (incluído no Docker Desktop)
- ~4 GB de RAM disponíveis durante a construção inicial (os aplicativos web são construídos a partir do código-fonte)
- Git, ou apenas o arquivo `docker-compose.yml` bruto

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

A primeira execução leva de 10 a 20 minutos: ela constrói o B1Admin a partir do seu clone e constrói a API e o B1App diretamente a partir de seus repositórios no GitHub. As inicializações seguintes levam segundos.

Quando os quatro serviços estiverem no ar:

1. Abra **http://localhost:3101** (B1 Admin).
2. Clique em **Register** e crie sua conta. A primeira conta é automaticamente um administrador de servidor.
3. Siga as instruções no aplicativo para criar sua primeira igreja.

Os esquemas do banco de dados são criados automaticamente pela migração de inicialização do contêiner da API — nenhum SQL manual é necessário.

| Serviço | URL |
|---------|-----|
| B1Admin (equipe/admin) | http://localhost:3101 |
| B1App (portal de membros / website) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | somente interno (`mysql:3306` na rede do compose) |

## Configuração

Todas as configurações vivem em um arquivo `.env` ao lado de `docker-compose.yml`. Toda variável tem um padrão funcional para localhost, então o arquivo é opcional até que você queira personalizar algo.

```bash
# .env — everything is optional; shown with defaults
MYSQL_ROOT_PASSWORD=churchapps
JWT_SECRET=please-change-this-jwt-secret
ENCRYPTION_KEY=PleaseChangeThisDockerDefaultKey   # exactly 32 characters

# Public URLs (change these when exposing beyond localhost)
API_URL=http://localhost:8084
B1ADMIN_URL=http://localhost:3101
B1APP_URL=http://localhost:3000
SOCKET_URL=ws://localhost:8084

# Email — see the Railway guide's Email section for provider walkthroughs
MAIL_SYSTEM=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Antes de usar de verdade, altere `MYSQL_ROOT_PASSWORD`, `JWT_SECRET`, e `ENCRYPTION_KEY` (qualquer string de 32 caracteres).

:::warning
Os valores `*_URL` são **embutidos nos aplicativos web em tempo de construção** (comportamento padrão do Vite/Next.js). Alterá-los no `.env` exige uma reconstrução, não apenas um reinício:

```bash
docker compose up -d --build
```
:::

Alterar a senha do MySQL depois da primeira inicialização também exige atualizar a senha dentro do próprio MySQL — o volume mantém as credenciais antigas.

## Expondo para a Internet

Coloque qualquer proxy reverso na frente e dê um hostname a cada serviço. Com o [Caddy](https://caddyserver.com/) é assim:

```
admin.yourchurch.org { reverse_proxy localhost:3101 }
app.yourchurch.org   { reverse_proxy localhost:3000 }
api.yourchurch.org   { reverse_proxy localhost:8084 }
```

Depois defina as URLs no `.env` e reconstrua:

```bash
API_URL=https://api.yourchurch.org
B1ADMIN_URL=https://admin.yourchurch.org
B1APP_URL=https://app.yourchurch.org
SOCKET_URL=wss://api.yourchurch.org
```

```bash
docker compose up -d --build
```

O WebSocket usado para chat e notificações ao vivo compartilha a porta da API, então `SOCKET_URL` é apenas a URL da API com `wss://`.

## E-mail, Doações, Multi-Site, e Integrações

Estes funcionam de forma idêntica à implantação no Railway — as mesmas variáveis de ambiente, definidas no seu arquivo `.env` em vez do painel do Railway (o arquivo compose as repassa para a API):

- **[E-mail / SMTP](./railway-template#1-email-highly-recommended)** — fortemente recomendado; sem isso, os membros não conseguem redefinir senhas
- **[Multi-site](./railway-template#3-multi-site-multiple-churches-on-one-instance)** — igrejas ilimitadas por instância, gerenciadas na interface de admin
- **[Doações online](./railway-template#4-online-giving-stripe--paypal)** — configuradas por igreja na interface de admin, não via variáveis de ambiente
- **[Integrações opcionais](./railway-template#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `WEB_PUSH_PUBLIC_KEY`/`WEB_PUSH_PRIVATE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`

## Dados, Backups, e Armazenamento de Arquivos

Dois volumes Docker nomeados guardam todo o estado:

| Volume | Conteúdo |
|--------|----------|
| `mysql-data` | Todos os esquemas do banco de dados |
| `api-content` | Arquivos enviados — fotos, documentos, imagens do website (montado em `/app/content`) |

Faça backup do banco de dados com um único comando (agende-o com cron):

```bash
docker compose exec mysql mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --all-databases > backup-$(date +%F).sql
```

Faça backup dos arquivos enviados copiando o volume:

```bash
docker run --rm -v b1admin_api-content:/data -v "$PWD":/backup alpine tar czf /backup/content-$(date +%F).tgz -C /data .
```

Para bibliotecas de mídia grandes, você pode trocar o armazenamento de arquivos para S3 em vez do volume local — defina `FILE_STORE=S3` mais as variáveis `AWS_*` descritas na [seção de Armazenamento de Arquivos do guia do Railway](./railway-template#5-file-storage).

## Atualizando

A API e o B1App são construídos a partir do branch `main` de seus repositórios no GitHub; o B1Admin é construído a partir do seu clone local.

```bash
git pull                              # update B1Admin
docker compose build --pull           # rebuild all images against latest main
docker compose up -d
```

As migrações do banco de dados rodam automaticamente quando o contêiner da API inicia.

Para fixar versões em vez de acompanhar `main`, aponte os contextos de construção para uma tag no `.env`:

```bash
API_CONTEXT=https://github.com/ChurchApps/Api.git#v1.2.3
B1APP_CONTEXT=https://github.com/ChurchApps/B1App.git#v1.2.3
```

Desenvolvedores podem apontar as mesmas variáveis para checkouts locais (por exemplo, `API_CONTEXT=../Api`).

## Solução de Problemas

| Sintoma | Causa provável | Correção |
|---------|--------------|-----|
| O contêiner `api` reinicia em loop | MySQL não está pronto ou falha de migração | `docker compose logs api` — a migração imprime qual módulo falhou |
| O login redireciona para `api.churchapps.org` | O aplicativo web foi construído sem os argumentos do estágio `custom` | Reconstrua: `docker compose build --no-cache b1admin b1app` |
| Alterou uma URL no `.env` mas nada aconteceu | As URLs são embutidas em tempo de construção | `docker compose up -d --build` |
| "Verifique seu e-mail" mas nenhum e-mail chega | `MAIL_SYSTEM=SMTP` com credenciais erradas | Corrija as credenciais, ou remova `MAIL_SYSTEM` para desativar o e-mail |
| Chat / recursos ao vivo silenciosos | `SOCKET_URL` inacessível a partir do navegador | Precisa ser `wss://` atrás de HTTPS e com proxy para a porta 8084 |
| A construção trava em um VPS pequeno | Falta de memória durante `next build` | Adicione swap, ou construa em outra máquina e faça `docker save`/`load` |

Ainda travado? Abra uma issue em [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) com a saída de `docker compose logs`.

## Artigos Relacionados

- **[Auto-Hospedagem no Railway](./railway-template)** — alternativa de hospedagem gerenciada, além dos guias de configuração pós-implantação compartilhados
- **[Configuração Inicial](../../getting-started/initial-setup)** — primeiros passos depois que sua igreja é criada
- **[Configuração Local da API](../api/local-setup)** — rodando a pilha diretamente para desenvolvimento
