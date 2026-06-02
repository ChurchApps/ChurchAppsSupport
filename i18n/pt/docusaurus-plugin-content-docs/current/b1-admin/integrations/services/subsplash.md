---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Se você usa Subsplash para seu aplicativo de igreja, doação ou formulários mas deseja B1 como o sistema de registro para pessoas e doações, o aplicativo Zapier Subsplash pode canalizar doações, novos perfis e respostas de formulário em B1 em tempo real. Note que o aplicativo Zapier Subsplash é atualmente **apenas gatilhos** — a fiação é unidirecional (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta Subsplash em um plano que inclua acesso **API + Zapier** (verifique com seu Gerenciador de Sucesso do Cliente Subsplash — esses portão atrás de nível de plano)
- Uma conta [Zapier](https://zapier.com)
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

Todos os gatilhos abaixo são do Subsplash. As ações são B1.

| Gatilho Subsplash | Ação B1 |
|---|---|
| Nova Doação | Procurar Pessoa → Adicionar Doação (Criar Pessoa se faltando) |
| Nova Promessa | Adicionar Doação (com `notes` = "Promessa: …") |
| Nova Pessoa Criada | Criar Pessoa |
| Perfil de Pessoa Atualizado | (sem ação B1 direta — registre em um Google Sheet para análise manual) |
| Nova Resposta de Formulário | Criar Pessoa + (opcionalmente) Adicionar Membro do Grupo com base no formulário |

Subsplash → B1 é a única direção que o aplicativo Subsplash suporta agora.

## Configuração

### 1. Cunhar uma chave de API B1

Em B1Admin: **Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**. Escopos:

- `people:read` — para procurar o doador por email
- `people:write` — para criá-lo se não existir
- `donations:write` — para registrar o presente
- (Sem `settings:write` necessário — Subsplash, não B1, possui o gatilho aqui.)

### 2. Conectar Subsplash ao Zapier

Siga [guia de integração Zapier Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Eles emitem um token de API dentro do Painel Subsplash que Zapier usa para autenticar o lado do gatilho.

### 3. Construir o Zap "registrar uma doação"

1. **Gatilho** — Subsplash: Nova Doação
2. **Ação** — B1.church: Procurar Pessoa (por email)
3. **Filtro / Caminho** — ramificação em "pessoa encontrada":
   - **Encontrada:** B1.church: Adicionar Doação. Mapeie valor, data, fundo, método = "Online", notas = id de transação Subsplash.
   - **Não encontrada:** B1.church: Criar Pessoa → B1.church: Adicionar Doação (usando o id da pessoa recém-criada).

Ative o Zap. Futuras doações Subsplash fluem em **B1Admin → Doações** dentro de segundos.

## Receitas Comuns

### Enviar agradecimento quando um primeiro presente chega

- **Gatilho** — Subsplash: Nova Doação
- **Ação** — Filtro by Zapier: apenas continuar se for o primeiro presente do doador (use uma *Tabela de Busca* em Email de Doador contra um Google Sheet de doadores passados, ou um passo Zapier *Caminhos* na data de criação do doador)
- **Ação** — Mailchimp / SMTP / SendGrid: enviar mensagem de agradecimento do primeiro presente
- **Ação** — B1.church: Adicionar Doação (como usual)

### Filtrar promessas do fluxo de doação regular

- **Gatilho** — Subsplash: Nova Promessa
- **Ação** — B1.church: Adicionar Doação com `notes = "Promessa — Subsplash"` e um fundo chamado `Promessas` (separado de seu fundo operacional) para que você possa reportar sobre promessas independentemente em **B1Admin → Doações → Relatórios**.

### Sincronizar novos usuários de aplicativo como pessoas B1

- **Gatilho** — Subsplash: Nova Pessoa Criada
- **Ação** — B1.church: Criar Pessoa, preenchendo nome, email, telefone. Tag em B1 ao adicionar a nova pessoa a um grupo como "Usuários de Aplicativo Subsplash".

## Limites e Notas

- **O aplicativo Zapier Subsplash é apenas gatilhos.** Se você quiser mudanças do lado B1 (por ex. uma nova pessoa B1 para chegar ao Subsplash também), você precisaria construir esse bridge da API REST Subsplash de chamadas de aplicativo Zapier B1 via uma ação *Webhooks by Zapier — POST* personalizada. Isso é uma integração personalizada, não uma receita.
- **Acesso a API é gatilhado por plano.** Se a conexão Zapier falhar com `403 Forbidden`, seu plano Subsplash provavelmente não inclui acesso a API — entre em contato com seu Gerenciador de Sucesso do Cliente.
- **Mapeamento de fundo é manual.** Subsplash passa um nome de campanha ou categoria; B1 precisa de um id de fundo numérico. Ou codifique o fundo no Zap ou mantenha uma *Tabela de Busca* Zapier mapeando campanhas Subsplash para fundos B1.

## Solução de Problemas

- **Nenhum gatilho dispara após uma doação** — verifique no painel Zapier Subsplash que a conexão ainda mostra *Conectada*. Se o token de API foi rotacionado no lado Subsplash, o Zap silenciosamente para; reconecte.
- **B1 *Adicionar Doação* falha com 422** — na maioria das vezes um `fundId` faltando ou não reconhecido. Liste seus fundos via **B1Admin → Doações → Fundos** e copie o id exato no passo Zap.
- **Primeiro presente dispara duas vezes** — Subsplash ocasionalmente re-entrega um gatilho se Zapier perdeu seu ack. Adicione um *Filtro by Zapier* no id da doação (Subsplash envia um no payload) para soltar duplicatas.

## Veja Também

- [Donorbox](./donorbox) — mesma forma de receita, plataforma de doação diferente
- [Zapier (visão geral)](../zapier) — lado B1 de cada receita Zapier
- [Guia de integração Zapier Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (docs Subsplash)
