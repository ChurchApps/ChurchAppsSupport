---
title: "Subsplash"
description: "Conecte doações, novas pessoas e respostas de formulários do Subsplash ao B1 com o Zapier, para que as contribuições e os perfis cheguem ao B1 Admin automaticamente."
---

# Subsplash

<div class="article-intro">

Se você usa o Subsplash para o aplicativo, as doações ou os formulários da igreja, mas quer que o B1 seja o sistema de registro de pessoas e doações, o app do Subsplash no Zapier pode enviar doações, novos perfis e respostas de formulários para o B1 em tempo real. Observe que o app do Subsplash no Zapier é, atualmente, **somente de gatilhos** -- a integração é unidirecional (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no Subsplash em um plano que inclua acesso a **API + Zapier** (confirme com o seu Gerente de Sucesso do Cliente no Subsplash -- esse recurso depende do plano contratado)
- Uma conta no [Zapier](https://zapier.com)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

Todos os gatilhos abaixo são do Subsplash. As ações são do B1.

| Gatilho do Subsplash | Ação no B1 |
|---|---|
| Nova doação | Encontrar pessoa → Adicionar doação (Criar pessoa, se não existir) |
| Nova promessa de doação | Adicionar doação (com `notes` = "Pledge: …") |
| Nova pessoa criada | Criar pessoa |
| Perfil de pessoa atualizado | (sem ação direta no B1 -- registre em uma planilha do Google para revisão manual) |
| Nova resposta de formulário | Criar pessoa + (opcionalmente) Adicionar membro ao grupo, conforme o formulário |

Subsplash → B1 é a única direção que o app do Subsplash suporta atualmente.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

No B1Admin: **Configurações → Desenvolvedor → Chaves de API → Nova chave de API**. Escopos:

- `people:read` -- para localizar o doador pelo e-mail
- `people:write` -- para criá-lo, caso não exista
- `donations:write` -- para registrar a contribuição
- `settings:write` -- o Zapier verifica cada chave do B1 contra a lista de webhooks do B1 quando você a conecta, então a conexão falha sem ele (mesmo que o gatilho pertença ao Subsplash, e não ao B1, neste caso)

### 2. Conecte o Subsplash ao Zapier {#2-connect-subsplash-to-zapier}

Siga o [guia de integração do Subsplash com o Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Eles emitem um token de API dentro do Painel do Subsplash, que o Zapier usa para autenticar o lado do gatilho.

### 3. Monte o Zap "registrar uma doação" {#3-build-the-record-a-donation-zap}

1. **Gatilho** -- Subsplash: Nova doação
2. **Ação** -- B1.church: Encontrar pessoa (por e-mail)
3. **Ação** -- B1.church: Adicionar doação, usando o ID da pessoa obtido na etapa 2. Mapeie o valor, a data, o fundo, o método = "Online" e as observações = ID da transação do Subsplash.

O *Encontrar pessoa* do B1 interrompe o Zap com o erro "No person found" quando ninguém corresponde, então uma etapa de Filtro ou de Path não consegue ramificar por isso. Para tratar doadores de primeira vez, ative o tratamento de erros do Zapier na etapa Encontrar pessoa e, no caminho de erro, execute B1.church: Criar pessoa → B1.church: Adicionar doação (usando o ID da pessoa recém-criada).

Ative o Zap. As próximas doações do Subsplash aparecerão em **B1Admin → Doações** em poucos segundos.

## Receitas comuns {#common-recipes}

### Enviar um agradecimento quando chegar a primeira contribuição de alguém {#send-a-thank-you-when-a-first-time-gift-lands}

- **Gatilho** -- Subsplash: Nova doação
- **Ação** -- Filtro pelo Zapier: continue somente se for a primeira contribuição do doador (use uma *Tabela de consulta* com o E-mail do doador em uma planilha do Google com os doadores anteriores, ou uma etapa *Paths* do Zapier com base na data de criação do doador)
- **Ação** -- Mailchimp / SMTP / SendGrid: envie a mensagem de agradecimento pela primeira contribuição
- **Ação** -- B1.church: Adicionar doação (como de costume)

### Separar as promessas de doação do fluxo regular de ofertas {#filter-pledges-off-the-regular-giving-flow}

- **Gatilho** -- Subsplash: Nova promessa de doação
- **Ação** -- B1.church: Adicionar doação com `notes = "Pledge — Subsplash"` e um fundo chamado `Pledges` (separado do seu fundo operacional), para que você possa gerar relatórios das promessas de forma independente em **B1Admin → Doações → Resumo**.

### Sincronizar novos usuários do aplicativo como pessoas do B1 {#sync-new-app-users-as-b1-people}

- **Gatilho** -- Subsplash: Nova pessoa criada
- **Ação** -- B1.church: Criar pessoa, preenchendo nome, e-mail e telefone. Marque no B1 adicionando a nova pessoa a um grupo como "Usuários do aplicativo Subsplash".

## Limites e observações {#limits--notes}

- **O app do Subsplash no Zapier é somente de gatilhos.** Se você quiser alterações do lado do B1 (por exemplo, uma nova pessoa do B1 também aparecer no Subsplash), será preciso criar essa ponte a partir dos gatilhos do app do B1 no Zapier, chamando a API REST do Subsplash por uma ação personalizada *Webhooks by Zapier -- POST*. Isso é uma integração personalizada, e não uma receita.
- **O acesso à API depende do plano.** Se a conexão com o Zapier falhar com `403 Forbidden`, seu plano do Subsplash provavelmente não inclui acesso à API -- entre em contato com o seu Gerente de Sucesso do Cliente.
- **O mapeamento de fundos é manual.** O Subsplash envia o nome de uma campanha ou categoria, e o B1 precisa de um dos seus próprios fundos. Escolha o fundo no campo **Fundo** da etapa Adicionar doação ou mantenha uma *Tabela de consulta* no Zapier que associe as campanhas do Subsplash aos fundos do B1.

## Solução de problemas {#troubleshooting}

- **Nenhum gatilho dispara após uma doação** -- confirme, no painel do Zapier do Subsplash, que a conexão ainda aparece como *Conectado*. Se o token de API foi trocado do lado do Subsplash, o Zap para silenciosamente; reconecte.
- **A ação *Adicionar doação* do B1 registra a contribuição sem fundo** -- o campo **Fundo** estava vazio ou mapeado para um valor que não é um ID de fundo do B1. Escolha o fundo na lista suspensa **Fundo** da etapa (ela lista os fundos em **Doações > Fundos** no B1Admin) ou mapeie uma Tabela de consulta que retorne os IDs de fundos do B1.
- **A primeira contribuição dispara duas vezes** -- o Subsplash ocasionalmente reenvia um gatilho se o Zapier não confirmou o recebimento. Adicione um *Filtro pelo Zapier* sobre o ID da doação (o Subsplash envia um no payload) para descartar duplicatas.

## Veja também {#see-also}

- [Donorbox](./donorbox.md) -- mesma estrutura de receita, outra plataforma de doações
- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier
- [Guia de integração do Subsplash com o Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentação do Subsplash)
