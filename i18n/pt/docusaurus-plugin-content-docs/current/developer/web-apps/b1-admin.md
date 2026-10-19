---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

O B1Admin é o painel de administração da igreja -- uma aplicação React de página única criada com Vite e Material-UI. A equipe da igreja o usa para gerenciar pessoas, grupos, presença, doações, conteúdo e muito mais.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Instale o **Node.js 22+** e o **Git** -- consulte [Pré-requisitos](../setup/prerequisites)
- Configure o destino da sua API (demo ou local) -- consulte [Variáveis de ambiente](../setup/environment-variables)

</div>

## Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Instale as dependências

```bash
cd B1Admin
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp dotenv.sample.txt .env
```

Abra o `.env` e configure os endpoints da API. Você pode apontá-los para a API de demonstração compartilhada (`https://api.demo.churchapps.org`) ou para a sua instância local da API. O arquivo de exemplo pode ainda listar URLs de homologação desativadas; substitua-as.

### 4. Inicie o servidor de desenvolvimento

```bash
npm start
```

Isso inicia o servidor de desenvolvimento do Vite. A aplicação ficará disponível no navegador, com substituição de módulos em tempo real (hot module replacement) habilitada.

## Principais variáveis de ambiente

| Variável | Descrição |
|----------|-------------|
| `REACT_APP_STAGE` | Nome do ambiente (por exemplo, `demo` como no arquivo de exemplo, `prod` ou `selfhost`) |
| `PORT` | Porta do servidor de desenvolvimento (padrão: `3101`) |
| `REACT_APP_*_API` | URLs dos endpoints da API para cada módulo |

:::info
O script `postinstall` copia os arquivos de idioma e de CSS de `@churchapps/apphelper`. Se os componentes aparecerem sem estilo, execute `npm run postinstall` manualmente.
:::

## Principais comandos

| Comando | Descrição |
|---------|-------------|
| `npm start` | Inicia o servidor de desenvolvimento do Vite |
| `npm run build` | Build de produção via Vite |
| `npm run test` | Executa os testes end-to-end com Playwright |
| `npm run lint` | Executa o ESLint com correção automática |

## Stack tecnológica

- **React 19** com TypeScript
- **Vite** para ferramentas de build e servidor de desenvolvimento
- **Material-UI 7** para componentes de interface
- **React Query 5** para o estado do servidor
- Pacotes **`@churchapps/apphelper*`** para componentes compartilhados

## Implantação

As builds de produção são implantadas no **S3 + CloudFront**:

1. `npm run build` gera os recursos estáticos
2. Os recursos são sincronizados com um bucket do S3
3. A invalidação do CloudFront é disparada para servir a nova versão

:::tip
Para instruções detalhadas de implantação, consulte o guia [Implantação de aplicações web](../deployment/web-apps).
:::
