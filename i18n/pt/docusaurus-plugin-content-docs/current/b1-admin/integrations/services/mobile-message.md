---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) é uma API SMS australiana — popular com igrejas AU porque oferece números locais e preços competitivos AU onde Clearstream e Text In Church são EUA-cêntricos. Mobile Message não tem um aplicativo Zapier de primeira classe hoje, mas publica uma API REST pública, para você poder conectar eventos B1 em textos Mobile Message através de **Webhooks by Zapier** (ou módulo HTTP do Make) em alguns minutos.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Mobile Message](https://mobilemessage.com.au) com um ID de Remetente registrado e credenciais de API (nome de usuário + senha de API em *Conta → Configurações de API*)
- Uma conta [Zapier](https://zapier.com) (ou [Make](https://www.make.com))
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

A API do Mobile Message é "enviar SMS"-formatada — sem gatilhos, apenas texto de saída. Então as receitas são todas B1 → SMS:

| Direção | Gatilho B1 | Resultado |
|---|---|---|
| B1 → Mobile Message | `person.created` | Texto de boas-vindas para a nova pessoa |
| B1 → Mobile Message | `donation.created` | Texto de agradecimento para o doador |
| B1 → Mobile Message | `form.submission.created` | Paging da equipe de plantão |
| B1 → Mobile Message | `event.created` | Lembrança broadcast para uma lista |

## Configuração

### 1. Cunhar uma chave de API B1

**Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**:

- `settings:write` — para o webhook de gatilho registrar
- `people:read` — para procurar o número de telefone do destinatário de um `personId`

### 2. Construir o Zap com Webhooks by Zapier

1. **Gatilho** — B1.church: escolha o evento que você quer (por ex. Nova Doação).
2. **Ação** — B1.church: Procurar Pessoa (usando `data.personId`) para obter o número de telefone e nome.
3. **Ação** — Webhooks by Zapier: **POST**. Configure como abaixo.

As configurações do passo POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Tipo de Payload** — JSON
- **Dados** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Obrigado por seu presente, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Cabeçalhos** — `Content-Type: application/json` (Webhooks by Zapier adiciona isso automaticamente)
- **Auth Básica** — defina o campo *Auth Básica* para `<api_username>|<api_password>` (Zapier converte isso para o cabeçalho `Authorization: Basic …` correto)

Ative o Zap. Envie um presente de teste em B1Admin para verificar que um texto chega.

## Receitas Comuns

### Lembretes de evento na manhã do evento

- **Gatilho** — Cronograma by Zapier (diário, 7am)
- **Ação** — B1.church: Procurar Eventos de hoje (ou use um passo Find com um filtro de data fixo, ou armazene a lista de eventos de hoje em um Google Sheet)
- **Ação** — Webhooks by Zapier: POST para Mobile Message com a lista de eventos para um grupo de assinante registrado

### Use o endpoint de batch para um broadcast de lista

O endpoint `/v1/messages` do Mobile Message aceita até 10.000 mensagens por chamada. Para broadcast para um grupo B1:

- **Gatilho** — B1.church: Nova Envio de Formulário (filtro para um formulário específico)
- **Ação** — B1.church: Listar Membros do Grupo para um grupo alvo (via um passo *Webhooks by Zapier — GET* em `/membership/groupmembers?groupId=…`)
- **Ação** — Formatter by Zapier → Utilitários → Itemize-em-linha a resposta em um array `messages`
- **Ação** — Webhooks by Zapier: POST o array completo para `/v1/messages`

### Alternativa Make

Se você prefere Make, solte o módulo **HTTP — Fazer uma solicitação** após o gatilho B1 Watch Events, configure da mesma forma (POST, Auth Básica, corpo JSON). Veja a [visão geral Make](../make) para o lado B1.

## Limites e Notas

- **Auth Básica é o único método de autenticação** — Mobile Message emite um nome de usuário e senha do painel. Trate ambos como segredos.
- **`sender` deve ser um ID de Remetente registrado** em sua conta Mobile Message, ou o envio retornará `400 Invalid sender`. Regulações AU requerem registro de remetente.
- **Números de telefone AU** podem ser `0412345678` (local) ou `+61412345678` (internacional). A API aceita ambos, mas normalizar em `+61…` se você também está enviando para overseas.
- **Até 10.000 mensagens por solicitação** — útil para broadcasts, mas uma entrega de webhook B1 única raramente emitirá uma lista tão grande; reserve o endpoint de batch para Zaps de volume em massa agendados.

## Solução de Problemas

- **POST retorna `401 Unauthorized`** — credenciais Auth Básica estão erradas. Re-copie do painel Mobile Message *Conta → Configurações de API*. Note que o nome de usuário é seu email de conta por padrão, não uma chave de API separada.
- **POST retorna `400 Invalid sender`** — o valor `sender` não é um ID de Remetente registrado em sua conta. Registre-o no painel Mobile Message primeiro.
- **Texto chega mas está truncado** — Mobile Message divide mensagens sobre ~160 caracteres em múltiplas partes; você é cobrado por parte. Verifique o corpo da resposta — ele diz a contagem de parte.

## Veja Também

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — provedores SMS alternativos com aplicativos Zapier nativos (nenhum passo Webhooks-by-Zapier necessário)
- [Zapier (visão geral)](../zapier) — lado B1 de cada receita Zapier
- [Documentos da API Mobile Message](https://mobilemessage.com.au/api-documentation)
