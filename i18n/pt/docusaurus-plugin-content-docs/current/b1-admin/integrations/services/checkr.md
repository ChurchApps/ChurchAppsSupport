---
title: "Checkr"
description: "Conecte os cadastros de voluntários do B1 Admin às verificações de antecedentes da Checkr usando o Make.com, com alertas opcionais de status do relatório para o coordenador de ministério seguro."
---

# Checkr

<div class="article-intro">

A [Checkr](https://checkr.com) realiza a triagem de antecedentes de funcionários e voluntários -- uma necessidade quase universal para qualquer igreja que tenha um programa infantil ou juvenil. O B1 **não tem um recurso de verificação de antecedentes integrado** -- solicitar as verificações, acompanhar os resultados e controlar a conformidade da triagem ficam todos na Checkr; a receita abaixo apenas conecta os eventos do B1 a ela. A Checkr não tem um app para o Zapier, mas a [integração da Checkr no Make.com](https://www.make.com/en/integrations/checkr) é verificada e expõe as ações necessárias para iniciar uma verificação a partir de um evento do B1.

</div>

:::caution
Esta receita usa o aplicativo do B1.church para o Make, que ainda não foi lançado (veja [Make](../make.md)). Até lá, o lado do B1 desses cenários precisa ser montado com o módulo **HTTP** do Make chamando a [API REST](/docs/developer/api) do B1.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta na [Checkr](https://checkr.com) com acesso à API e pelo menos um pacote de triagem configurado
- Uma conta no [Make](https://www.make.com)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

O app da Checkr no Make expõe 1 gatilho e 6 ações:

| Direção | Gatilho do B1 / Make | Ação |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado para um grupo de voluntários) | Checkr: Criar candidato → Criar convite de verificação de antecedentes |
| Checkr → B1 | Webhook da Checkr (evento de convite / relatório) | B1: Atualizar o registro da pessoa (por exemplo, marcar "Checkr aprovado") |

Ações da Checkr no Make: Criar candidato, Criar convite de verificação de antecedentes, Obter candidato, Obter relatório, Obter previsão do relatório, Obter um convite. Além disso, 4 módulos de pesquisa.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

**Configurações → Desenvolvedor → Chaves de API → Nova chave de API**:

- `settings:write` -- para o webhook do gatilho
- `people:read` -- para buscar o nome e o e-mail da pessoa ao iniciar uma verificação
- (Opcional) `people:write`, se você quiser gravar o status do relatório de volta como um campo personalizado ou uma marcação

### 2. Monte o cenário "iniciar uma verificação no cadastro do voluntário" no Make {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Gatilho** -- B1.church: Observar eventos (`group.member.added`).
2. **Filtro** -- continue somente se `data.groupId` corresponder ao seu grupo "Voluntários infantis" (ou equivalente).
3. **Ação** -- B1.church: Encontrar pessoa (por `data.personId`) para obter o e-mail e o nome e sobrenome.
4. **Ação** -- Checkr: Criar candidato. Mapeie o nome, o sobrenome e o e-mail da etapa 3.
5. **Ação** -- Checkr: Criar convite de verificação de antecedentes. Mapeie o ID do novo candidato da etapa 4 para o campo *candidate_id*. Escolha o pacote de triagem (por exemplo, `tasker_standard` ou o que a sua conta disponibilizar).
6. (Opcional) **Ação** -- Slack: notifique o seu coordenador de ministério seguro de que uma verificação foi iniciada.

Ative o cenário. Os novos voluntários do grupo indicado recebem automaticamente um convite da Checkr por e-mail; eles o preenchem no celular ou no notebook, e a Checkr executa a triagem.

### 3. (Opcional) Receba o relatório de volta {#3-optional-receive-the-report-back}

1. **Gatilho** -- Checkr: Observar eventos (webhook). O Make registra um webhook na Checkr quando o cenário é ativado.
2. **Filtro** -- continue somente se `event_type = report.completed`.
3. **Ação** -- Checkr: Obter relatório (use o ID do relatório que vem no webhook).
4. **Ação** -- B1.church: Encontrar pessoa (pelo e-mail do candidato).
5. **Ação** -- Slack / E-mail condicional: notifique o coordenador com o status `clear` / `consider` / `suspended`.

Observação: hoje o B1 não tem um campo integrado de "status da verificação de antecedentes". As opções práticas são (a) publicar o resultado em um canal privado do Slack para revisão, (b) gravá-lo em uma planilha do Google para auditoria ou (c) adicionar a pessoa a um grupo do B1 "Voluntários aprovados" quando o resultado for `clear`.

## Receitas comuns {#common-recipes}

### Refazer a triagem dos voluntários a cada 2 anos {#re-screen-volunteers-every-2-years}

Combine o fluxo acima com um gatilho de agendamento do Make:

- **Gatilho** -- Make: Agendamento (mensal)
- **Ação** -- HTTP -- Fazer uma requisição: GET em `/membership/groupmembers?groupId=…` do B1 para o seu grupo "Voluntários aprovados" (o app do B1.church não tem uma ação de listagem)
- **Ação** -- Filtro no Make: data de aprovação anterior a 22 meses
- **Ação** -- Checkr: Criar convite de verificação de antecedentes (igual ao fluxo inicial)

### Bloquear o acesso da etapa 1 até a conclusão da verificação {#block-stage-1-access-until-check-completes}

Se a sua igreja usa a participação em grupos do B1 para controlar o acesso (por exemplo, só os membros do grupo "Aprovados" aparecem nas escalas de serviço), mantenha os novos voluntários em um grupo de espera até que o evento `report.completed` da Checkr os libere.

## Limites e observações {#limits--notes}

- **A Checkr atende apenas os EUA** para a maioria dos pacotes de triagem. Igrejas na Austrália, no Reino Unido e no Canadá precisarão de uma alternativa.
- **O preço é cobrado por verificação** -- cada Criar convite no Make gera uma verificação real. Teste primeiro na conta de sandbox / homologação da Checkr (o app da Checkr no Make usa as credenciais informadas na conexão, então trocar as credenciais alterna entre sandbox e produção).
- **O acesso à API da Checkr depende do plano.** Contas menores da Checkr podem estar em um plano somente com interface; entre em contato com a Checkr para habilitar a API.

## Solução de problemas {#troubleshooting}

- **Criar candidato falha com `403`** -- o token da API da Checkr é somente leitura ou não tem as permissões corretas da conta. Gere-o novamente no painel da Checkr com escopo de escrita.
- **O convite nunca chega** -- confira o e-mail do candidato na etapa 3; o B1 pode ter o campo de e-mail vazio para aquela pessoa. Adicione um filtro que exija e-mail antes da etapa da Checkr.
- **O gatilho de webhook não dispara** -- o registro do webhook na Checkr às vezes falha em silêncio se a sua conta do Make não estiver em um plano pago que suporte webhooks de saída. Verifique na página *Webhooks* do painel da Checkr se a URL do Make aparece na lista.

## Veja também {#see-also}

- [Make (visão geral)](../make.md) -- o lado do B1 de todos os cenários do Make
- [Mobile Message](./mobile-message.md) -- para provedores de SMS sem apps no Zapier, com o mesmo padrão de Webhooks/HTTP da integração da Checkr com o Make
- [Documentação da API da Checkr](https://docs.checkr.com/)
