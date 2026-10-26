---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Se você usa o Subsplash para o aplicativo, as doações ou os formulários da sua igreja, mas quer que o B1 seja o sistema de registro de pessoas e doações, o aplicativo do Subsplash no Zapier pode enviar doações, novos perfis e respostas de formulários para o B1 em tempo real. Observe que o aplicativo do Subsplash no Zapier é atualmente **somente gatilhos** — a integração é unidirecional (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta do Subsplash em um plano que inclua acesso à **API + Zapier** (confirme com o seu Gerente de Sucesso do Cliente no Subsplash — esses recursos dependem do nível do plano)
- Uma conta no [Zapier](https://zapier.com)
- Um usuário do B1Admin com a permissão **Editar Configurações**

</div>

## O que você pode configurar

Todos os gatilhos abaixo são do Subsplash. As ações são do B1.

| Gatilho do Subsplash | Ação no B1 |
|---|---|
| Nova Doação | Localizar Pessoa → Adicionar Doação (Criar Pessoa, se não existir) |
| Nova Promessa de Doação | Adicionar Doação (com `notes` = "Promessa: …") |
| Nova Pessoa Criada | Criar Pessoa |
| Perfil de Pessoa Atualizado | (sem ação direta no B1 — registrar em uma planilha do Google Sheets para revisão manual) |
| Nova Resposta de Formulário | Criar Pessoa + (opcionalmente) Adicionar Membro ao Grupo com base no formulário |

A direção Subsplash → B1 é a única que o aplicativo do Subsplash suporta no momento.

## Configuração

### 1. Crie uma chave de API do B1

No B1Admin: **Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**. Escopos:

- `people:read` — para localizar o doador pelo e-mail
- `people:write` — para criá-lo caso não exista
- `donations:write` — para registrar a doação
- (Não é necessário `settings:write` — quem controla o gatilho aqui é o Subsplash, e não o B1.)

### 2. Conecte o Subsplash ao Zapier

Siga o [guia de integração do Subsplash com o Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Eles emitem um token de API dentro do Painel do Subsplash, que o Zapier usa para autenticar o lado do gatilho.

### 3. Crie o Zap "registrar uma doação"

1. **Gatilho** — Subsplash: Nova Doação
2. **Ação** — B1.church: Localizar Pessoa (pelo e-mail)
3. **Filtro / Caminho** — ramifique com base em "pessoa encontrada":
   - **Encontrada:** B1.church: Adicionar Doação. Mapeie o valor, a data, o fundo, o método = "Online" e as notas = id da transação do Subsplash.
   - **Não encontrada:** B1.church: Criar Pessoa → B1.church: Adicionar Doação (usando o id da pessoa recém-criada).

Ative o Zap. As próximas doações do Subsplash chegarão em **B1Admin → Doações** em poucos segundos.

## Receitas comuns

### Enviar um agradecimento quando chegar a primeira doação

- **Gatilho** — Subsplash: Nova Doação
- **Ação** — Filtrar pelo Zapier: continuar apenas se for a primeira doação do doador (use uma *Tabela de Consulta* com o e-mail do doador em uma planilha do Google Sheets com os doadores anteriores, ou uma etapa *Caminhos* do Zapier com base na data de criação do doador)
- **Ação** — Mailchimp / SMTP / SendGrid: enviar a mensagem de agradecimento pela primeira doação
- **Ação** — B1.church: Adicionar Doação (como de costume)

### Separar as promessas do fluxo regular de doações

- **Gatilho** — Subsplash: Nova Promessa de Doação
- **Ação** — B1.church: Adicionar Doação com `notes = "Promessa — Subsplash"` e um fundo chamado `Promessas` (separado do seu fundo operacional), para que você possa gerar relatórios de promessas de forma independente em **B1Admin → Doações → Resumo**.

### Sincronizar novos usuários do aplicativo como pessoas no B1

- **Gatilho** — Subsplash: Nova Pessoa Criada
- **Ação** — B1.church: Criar Pessoa, preenchendo nome, e-mail e telefone. Marque no B1 adicionando a nova pessoa a um grupo como "Usuários do App Subsplash".

## Limites e observações

- **O aplicativo do Subsplash no Zapier é somente gatilhos.** Se você quiser alterações do lado do B1 (por exemplo, uma nova pessoa do B1 também aparecer no Subsplash), será preciso criar essa ponte a partir dos gatilhos do aplicativo do B1 no Zapier, chamando a API REST do Subsplash por meio de uma ação personalizada *Webhooks by Zapier — POST*. Isso é uma integração personalizada, não uma receita pronta.
- **O acesso à API depende do plano.** Se a conexão com o Zapier falhar com `403 Forbidden`, o seu plano do Subsplash provavelmente não inclui acesso à API — entre em contato com o seu Gerente de Sucesso do Cliente.
- **O mapeamento de fundos é manual.** O Subsplash envia o nome de uma campanha ou categoria; o B1 precisa de um id numérico de fundo. Ou fixe o fundo no Zap, ou mantenha uma *Tabela de Consulta* do Zapier que associe as campanhas do Subsplash aos fundos do B1.

## Solução de problemas

- **Nenhum gatilho é disparado após uma doação** — verifique no painel do Zapier do Subsplash se a conexão ainda aparece como *Conectado*. Se o token de API foi rotacionado do lado do Subsplash, o Zap para silenciosamente; reconecte.
- **A ação *Adicionar Doação* do B1 falha com 422** — na maioria das vezes, um `fundId` ausente ou não reconhecido. Liste os seus fundos em **B1Admin → Doações → Fundos** e copie o id exato para a etapa do Zap.
- **A primeira doação dispara duas vezes** — o Subsplash ocasionalmente reenvia um gatilho se o Zapier não tiver confirmado o recebimento. Adicione um *Filtro pelo Zapier* sobre o id da doação (o Subsplash envia um no payload) para descartar duplicatas.

## Veja também

- [Donorbox](./donorbox) — mesmo formato de receita, plataforma de doações diferente
- [Zapier (visão geral)](../zapier) — lado do B1 de todas as receitas do Zapier
- [Guia de integração do Subsplash com o Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentação do Subsplash)
