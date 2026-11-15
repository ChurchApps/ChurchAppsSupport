---
title: "Mobile Message"
description: "Conecte os eventos do B1 Admin ao Mobile Message, uma API de SMS australiana, usando webhooks do Zapier ou do Make para enviar mensagens de boas-vindas, de doação e de lembrete."
---

# Mobile Message

<div class="article-intro">

O [Mobile Message](https://mobilemessage.com.au) é uma API de SMS australiana -- popular entre as igrejas australianas porque oferece números locais e preços competitivos na Austrália, enquanto a Clearstream e a Text In Church são voltadas aos EUA. O Mobile Message não tem, hoje, um app oficial no Zapier, mas publica uma API REST pública, então você pode conectar os eventos do B1 aos textos do Mobile Message pelo **Webhooks by Zapier** (ou pelo módulo HTTP do Make) em alguns minutos.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Mobile Message](https://mobilemessage.com.au) com um ID de remetente registrado e credenciais de API (nome de usuário e senha da API em *Conta → Configurações de API*)
- Uma conta no [Zapier](https://zapier.com) (ou no [Make](https://www.make.com))
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

A API do Mobile Message tem o formato de "enviar SMS" -- não há gatilhos, apenas texto de saída. Por isso, todas as receitas vão do B1 para o SMS:

| Direção | Gatilho do B1 | Resultado |
|---|---|---|
| B1 → Mobile Message | `person.created` | Mensagem de boas-vindas para a nova pessoa |
| B1 → Mobile Message | `donation.created` | Mensagem de agradecimento para o doador |
| B1 → Mobile Message | `form.submission.created` | Aciona a equipe de plantão |
| B1 → Mobile Message | `event.created` | Lembrete em massa para uma lista |

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

**Configurações → Desenvolvedor → Chaves de API → Nova chave de API**:

- `settings:write` -- para que o webhook do gatilho seja registrado
- `people:read` -- para buscar o número de telefone do destinatário a partir de um `personId`

### 2. Monte o Zap com o Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Gatilho** -- B1.church: escolha o evento desejado (por exemplo, Nova doação).
2. **Ação** -- B1.church: Encontrar pessoa (usando `data.personId`) para obter o telefone e o nome.
3. **Ação** -- Webhooks by Zapier: **POST**. Configure conforme indicado abaixo.

As configurações da etapa POST:

- **URL** -- `https://api.mobilemessage.com.au/v1/messages`
- **Tipo de payload** -- JSON
- **Data** --
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** -- `Content-Type: application/json` (o Webhooks by Zapier adiciona isso automaticamente)
- **Basic Auth** -- preencha o campo *Basic Auth* com `<api_username>|<api_password>` (o Zapier converte isso para o cabeçalho `Authorization: Basic …` correto)

Ative o Zap. Envie uma doação de teste no B1Admin para verificar se a mensagem chega.

## Receitas comuns {#common-recipes}

### Lembretes de eventos na manhã do evento {#event-reminders-the-morning-of}

- **Gatilho** -- Agendamento pelo Zapier (diário, às 7h)
- **Ação** -- mantenha a lista de eventos do dia em uma planilha do Google (ou em outro app que o Zapier consiga ler) e busque as linhas do dia -- o app do B1 no Zapier não tem uma ação para buscar eventos
- **Ação** -- Webhooks by Zapier: POST no Mobile Message com a lista de eventos para um grupo de assinantes cadastrado

### Use o endpoint em lote para um envio em massa para uma lista {#use-the-batch-endpoint-for-a-list-broadcast}

O endpoint `/v1/messages` do Mobile Message aceita até 10.000 mensagens por chamada. Para enviar a um grupo do B1:

- **Gatilho** -- B1.church: Novo envio de formulário (filtrado para um formulário específico)
- **Ação** -- Webhooks by Zapier: GET em `/membership/groupmembers?groupId=…` para listar os membros do grupo de destino (o app do B1 no Zapier não tem uma ação de listagem para isso; envie a chave de API como cabeçalho `Authorization: Bearer cak_…`)
- **Ação** -- Formatter by Zapier → Utilities → Line-itemize para transformar a resposta em um array `messages`
- **Ação** -- Webhooks by Zapier: POST do array completo em `/v1/messages`

### Alternativa com o Make {#make-alternative}

Se preferir o Make, adicione o módulo **HTTP -- Fazer uma requisição** depois do gatilho Observar eventos do B1 e configure-o da mesma forma (POST, Basic Auth, corpo JSON). Veja a [visão geral do Make](../make.md) para o lado do B1 -- observe que o aplicativo do B1.church para o Make ainda não foi lançado.

## Limites e observações {#limits--notes}

- **Basic Auth é o único método de autenticação** -- o Mobile Message emite um nome de usuário e uma senha pelo painel. Trate os dois como segredos.
- **`sender` precisa ser um ID de remetente registrado** na sua conta do Mobile Message; caso contrário, o envio retorna `400 Invalid sender`. As regras australianas exigem o registro do remetente.
- **Números de telefone australianos** podem ser `0412345678` (local) ou `+61412345678` (internacional). A API aceita os dois, mas padronize em `+61…` se também enviar mensagens para o exterior.
- **Até 10.000 mensagens por requisição** -- útil para envios em massa, mas uma única entrega de webhook do B1 raramente gerará uma lista tão grande; reserve o endpoint em lote para Zaps de envio em massa agendados.

## Solução de problemas {#troubleshooting}

- **O POST retorna `401 Unauthorized`** -- as credenciais de Basic Auth estão erradas. Copie-as novamente do painel do Mobile Message em *Conta → Configurações de API*. Observe que, por padrão, o nome de usuário é o e-mail da sua conta, e não uma chave de API separada.
- **O POST retorna `400 Invalid sender`** -- o valor de `sender` não é um ID de remetente registrado na sua conta. Registre-o primeiro no painel do Mobile Message.
- **A mensagem chega cortada** -- o Mobile Message divide mensagens com mais de aproximadamente 160 caracteres em várias partes, e a cobrança é feita por parte. Confira o corpo da resposta, que informa o número de partes.

## Veja também {#see-also}

- [Clearstream](./clearstream.md) e [Text In Church](./text-in-church.md) -- provedores alternativos de SMS com apps nativos no Zapier (sem a etapa Webhooks by Zapier)
- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier
- [Documentação da API do Mobile Message](https://mobilemessage.com.au/api-documentation)
