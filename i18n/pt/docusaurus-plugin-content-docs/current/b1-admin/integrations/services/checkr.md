---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) realiza triagem de antecedentes para funcionários e voluntários — uma necessidade quase universal para qualquer igreja que executa um programa de crianças ou jovens. B1 **não possui um recurso integrado de verificação de antecedentes** — pedir verificações, rastrear resultados e conformidade de triagem vivem no Checkr; a receita abaixo apenas conecta eventos B1 a ele. Checkr não tem um aplicativo Zapier, mas a [integração Checkr do Make.com](https://www.make.com/en/integrations/checkr) é verificada e expõe as ações que você precisa para iniciar uma verificação a partir de um evento B1.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Checkr](https://checkr.com) com acesso à API e pelo menos um pacote de triagem configurado
- Uma conta [Make](https://www.make.com)
- Um usuário B1Admin com permissão **Editar Configurações**

</div>

## O que Você Pode Conectar

O aplicativo Checkr do Make expõe 1 gatilho e 6 ações:

| Direção | Gatilho B1 / Make | Ação |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado para um grupo de voluntários) | Checkr: Criar Candidato → Criar Convite de Verificação de Antecedentes |
| Checkr → B1 | Webhook Checkr (evento de convite / relatório) | B1: Atualizar o registro da pessoa (por exemplo, etiquetar "Checkr autorizado") |

Ações Checkr do Make: Criar Candidato, Criar Convite de Verificação de Antecedentes, Obter Candidato, Obter Relatório, Obter ETA do Relatório, Obter um Convite. Mais 4 módulos de busca.

## Configuração

### 1. Gere uma chave API B1

**Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**:

- `settings:write` — para o webhook de gatilho
- `people:read` — para procurar o nome/email da pessoa ao iniciar uma verificação
- (Opcional) `people:write` se você quiser escrever o status do relatório de volta como um campo personalizado ou tag

### 2. Construa o cenário "iniciar uma verificação ao se inscrever como voluntário" no Make

1. **Gatilho** — B1.church: Assistir Eventos (`group.member.added`).
2. **Filtro** — continuar apenas se `data.groupId` corresponder ao seu grupo "Voluntários de Crianças" (ou equivalente).
3. **Ação** — B1.church: Encontrar Pessoa (por `data.personId`) para obter email + nome/sobrenome.
4. **Ação** — Checkr: Criar Candidato. Mapeie nome/sobrenome/email da etapa 3.
5. **Ação** — Checkr: Criar Convite de Verificação de Antecedentes. Mapeie o novo id de candidato da etapa 4 para o campo *candidate_id*. Escolha o pacote de triagem (por exemplo, `tasker_standard` ou o que sua conta exponha).
6. (Opcional) **Ação** — Slack: notifique seu coordenador de ministério seguro que uma verificação foi iniciada.

Ligue o cenário. Novos voluntários no grupo direcionado recebem um convite automático do Checkr por e-mail; eles o completam em seu celular ou laptop; Checkr executa a triagem.

### 3. (Opcional) Receba o relatório de volta

1. **Gatilho** — Checkr: Assistir Eventos (webhook). O Make registra um webhook Checkr na ativação.
2. **Filtro** — continuar apenas se `event_type = report.completed`.
3. **Ação** — Checkr: Obter Relatório (use o id do relatório do webhook).
4. **Ação** — B1.church: Encontrar Pessoa (por email do candidato).
5. **Ação** — Slack/Email Condicional: notifique o coordenador com status `claro` / `considerar` / `suspenso`.

Nota: B1 não possui um campo "status de verificação de antecedentes" integrado hoje. As opções pragmáticas são (a) postar o resultado em um canal Slack privado para revisão, (b) escrevê-lo em um Google Sheet para auditoria, ou (c) adicionar a pessoa a um grupo B1 "Voluntários Autorizados" em `claro`.

## Receitas Comuns

### Verificar voluntários novamente a cada 2 anos

Combine o acima com um gatilho de cronograma do Make:

- **Gatilho** — Make: Agendar (mensal)
- **Ação** — B1.church: Listar Membros do Grupo para "Voluntários Autorizados"
- **Ação** — Filtrar pelo Make: data de autorização anterior a 22 meses
- **Ação** — Checkr: Criar Convite de Verificação de Antecedentes (igual ao fluxo inicial)

### Bloquear acesso de estágio 1 até que a verificação seja concluída

Se sua igreja usa a associação de grupo B1 para bloquear acesso (por exemplo, apenas membros do grupo "Autorizado" aparecem em cronogramas de serviço), mantenha novos voluntários em um grupo de espera até que o evento `report.completed` do Checkr os mude.

## Limites e Notas

- **Checkr é apenas EUA** para a maioria dos pacotes de triagem. Igrejas australianas, do Reino Unido e canadenses precisarão de uma alternativa.
- **Preço** é por verificação — cada Criar Convite no Make queima uma verificação real. Primeiro teste em uma conta de sandbox/preparo do Checkr (o aplicativo Checkr do Make respeita as credenciais que você passa na conexão, então trocar credenciais muda sandbox/ao vivo).
- **O acesso à API Checkr é baseado em plano.** Contas Checkr menores podem estar em um nível apenas de UI; entre em contato com Checkr para ativar a API.

## Solução de Problemas

- **Criar Candidato falha com `403`** — o token da API Checkr é somente leitura ou não possui as permissões de conta corretas. Reemita-o a partir do painel Checkr com escopo de escrita.
- **Convite nunca chega** — verifique o email do candidato na etapa 3; B1 pode ter um campo de email vazio para essa pessoa. Adicione um filtro obrigatório de email antes da etapa Checkr.
- **O gatilho de webhook não dispara** — o registro de webhook do Checkr às vezes falha silenciosamente se sua conta Make não estiver em um nível pago que suporte webhooks de saída. Verifique na página **Webhooks** do painel Checkr que a URL do Make está listada.

## Veja Também

- [Make (visão geral)](../make) — lado B1 de cada cenário Make
- [Mensagem Móvel](./mobile-message) — para provedores de SMS sem aplicativos Zapier, mesmo padrão Webhooks/HTTP que a conexão Make Checkr
- [Documentação da API Checkr](https://docs.checkr.com/)
