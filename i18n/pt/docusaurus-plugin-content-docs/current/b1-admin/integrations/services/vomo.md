---
title: "VOMO"
description: "Conecte as inscrições de voluntários e os check-ins em quiosque do VOMO às pessoas e aos grupos do B1 Admin com o Zapier, incluindo os escopos da chave de API e as etapas de configuração."
---

# VOMO

<div class="article-intro">

O VOMO é uma plataforma de engajamento de voluntários -- as pessoas se inscrevem em projetos, fazem check-in no quiosque e acumulam horas. Se você usa o VOMO para escalar voluntários, mas usa o B1 para os registros de pessoas, o Zapier pode sincronizar a participação e os check-ins entre os dois, para que nenhum dos lados fique desatualizado.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [VOMO](https://vomo.org) em um plano que ofereça o Zapier (confirme com o suporte do VOMO se tiver dúvidas)
- Uma conta no [Zapier](https://zapier.com)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

O app do VOMO no Zapier oferece quatro gatilhos instantâneos e quatro ações. As receitas que a maioria das igrejas quer são:

| Direção | Gatilho | Ação |
|---|---|---|
| VOMO → B1 | Cadastro de membro no VOMO (criado) | B1: Encontrar pessoa → Criar pessoa (se for nova) |
| VOMO → B1 | Check-in no quiosque do VOMO | B1: Adicionar membro ao grupo "Servindo atualmente", ou registrar como presença |
| B1 → VOMO | B1 `person.created` | VOMO: Encontrar organizador (por e-mail); caso contrário, uma etapa personalizada |
| Qualquer um | Participação no VOMO (inscrições) | B1: Adicionar membro ao grupo específico do projeto |

As ações do VOMO se limitam a **criar rascunhos de projetos** e a **encontrar** organizadores/projetos existentes -- hoje não existe uma ação de "adicionar esta pessoa a um projeto do VOMO". A integração mais útil é, principalmente, do VOMO → B1.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

**Configurações → Desenvolvedor → Chaves de API → Nova chave de API**. Escopos:

- `settings:write` -- o Zapier verifica cada chave do B1 contra a lista de webhooks do B1 quando você a conecta, então a conexão falha sem ele
- `people:read`, `people:write` -- para localizar e criar voluntários como pessoas do B1
- `groups:write` -- para adicioná-los aos grupos das equipes de serviço
- (Opcional) `attendance:write`, se você tratar os check-ins no quiosque como presença

### 2. Monte o Zap de sincronização de cadastros {#2-build-the-membership-sync-zap}

1. **Gatilho** -- VOMO: Cadastro de membro (evento = `created`).
2. **Ação** -- B1.church: Encontrar pessoa, com correspondência por e-mail.
3. **Ação** -- B1.church: Adicionar membro ao grupo, incluindo a pessoa da etapa 2 no grupo de voluntários adequado.

   O *Encontrar pessoa* do B1 interrompe o Zap com o erro "No person found" quando ninguém corresponde. Para voluntários que ainda não estão no B1, ative o tratamento de erros do Zapier na etapa Encontrar pessoa e, no caminho de erro, execute B1.church: Criar pessoa e, em seguida, Adicionar membro ao grupo.
4. Ative. Os novos voluntários do VOMO passam a aparecer no B1 com a participação correta nos grupos.

### 3. (Opcional) Monte o Zap de check-in no quiosque {#3-optional-build-the-kiosk-check-in-zap}

1. **Gatilho** -- VOMO: Quiosque
2. **Ação** -- B1.church: Encontrar pessoa (por e-mail)
3. **Ação** -- a sua escolha:
   - *Se tratar como presença* -- Webhooks by Zapier, POST no endpoint `/attendance/visits` do B1 (o app do B1 no Zapier ainda não tem uma ação de *Registrar presença* oficial). A [chave de API](/docs/developer/api/api-keys) do B1 vai no cabeçalho `Authorization: Bearer cak_…`.
   - *Se tratar como participação em grupo* -- B1.church: Adicionar membro ao grupo "Servindo hoje", e um segundo Zap mais tarde no dia os remove por meio de uma limpeza agendada.

## Receitas comuns {#common-recipes}

### Sincronização de grupo por projeto {#per-project-group-sync}

- **Gatilho** -- VOMO: Participação (criada)
- **Ação** -- Filtro pelo Zapier por ID do projeto e, depois,
- **Ação** -- B1.church: Adicionar membro ao grupo, em um grupo do B1 cujo nome espelhe o projeto do VOMO.

Quando o projeto do VOMO terminar, limpe manualmente o grupo do B1 (ou combine isto com um gatilho de *Participação excluída* que remova essas pessoas).

### Enviar uma mensagem de "obrigado por se inscrever" por SMS {#send-a-thanks-for-signing-up-text-via-sms}

Encadeie a Participação no VOMO → Enviar texto da Clearstream ou Enviar mensagem do Text In Church no mesmo Zap. Ambos têm ações oficiais no Zapier -- veja [Clearstream](./clearstream.md) e [Text In Church](./text-in-church.md).

### Identificar desistências {#detect-drop-off}

Execute um gatilho *Agendamento* diário do Zapier que chame Encontrar organizador no VOMO para uma lista de pessoas do B1 que entraram na equipe de serviço neste mês -- se o VOMO retornar "não encontrado", elas não ativaram a conta no VOMO e precisam de um lembrete.

## Limites e observações {#limits--notes}

- **O e-mail é a chave de ligação.** Os payloads do VOMO expõem o e-mail do usuário, mas não o ID de pessoa do B1. Pessoas que usam e-mails diferentes em cada sistema criarão duplicidades.
- **Não há ação "Adicionar ao projeto" no app do VOMO no Zapier, hoje.** Se você precisar matricular pessoas do B1 em um projeto do VOMO, será preciso fazer um POST na API REST do VOMO a partir de uma etapa *Webhooks by Zapier*, o que é uma integração personalizada.
- **Os planos gratuitos ou de nível inferior do VOMO podem não incluir o Zapier.** Confirme com o suporte do VOMO antes de prometer uma data de integração.

## Solução de problemas {#troubleshooting}

- **O gatilho nunca dispara** -- os gatilhos instantâneos do VOMO exigem que o token de API continue válido. Teste o Zap novamente; reconecte o VOMO se o token tiver sido trocado.
- **A ação *Adicionar membro ao grupo* do B1 falha** -- o grupo da ação não existe mais. Escolha o grupo novamente na lista suspensa **Grupo** da etapa, ou abra o grupo no B1Admin (**Pessoas > Grupos**) e copie o ID do final do endereço da página.
- **Pessoas duplicadas no B1 a partir de um mesmo voluntário do VOMO** -- provavelmente ele se inscreveu com um e-mail diferente daquele que já tinha no B1. Padronize os e-mails ou adicione um *Path* do Zapier que também busque por telefone antes de criar.

## Veja também {#see-also}

- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier
- [Clearstream](./clearstream.md) e [Text In Church](./text-in-church.md) -- combinam inscrições de voluntários com confirmações por SMS
- [Webhooks (referência para desenvolvedores)](/docs/developer/api/webhooks) -- os eventos que o VOMO pode disparar
