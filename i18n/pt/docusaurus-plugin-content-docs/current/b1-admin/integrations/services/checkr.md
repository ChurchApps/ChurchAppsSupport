---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) executa triagem de antecedentes para pessoal e voluntários — uma necessidade quase universal para qualquer igreja com um programa de crianças ou juventude. Checkr não tem um aplicativo Zapier, mas [integração Checkr do Make.com](https://www.make.com/en/integrations/checkr) é verificada e expõe as ações que você precisa para iniciar uma verificação de um evento B1.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Checkr](https://checkr.com) com acesso a API e pelo menos um pacote de triagem configurado
- Uma conta [Make](https://www.make.com)
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

O aplicativo Checkr do Make expõe 1 gatilho e 6 ações:

| Direção | Gatilho B1 / Make | Ação |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtrado para um grupo de voluntários) | Checkr: Criar Candidato → Criar Convite de Verificação de Antecedentes |
| Checkr → B1 | Webhook Checkr (evento de convite / relatório) | B1: Atualizar registro da pessoa (por ex. tag "Checkr liberado") |

Ações Checkr do Make: Criar Candidato, Criar Convite de Verificação de Antecedentes, Obter Candidato, Obter Relatório, Obter ETA do Relatório, Obter um Convite. Mais 4 módulos de busca.

## Configuração

### 1. Cunhar uma chave de API B1

**Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**:

- `settings:write` — para o webhook de gatilho
- `people:read` — para procurar o nome/email da pessoa ao iniciar uma verificação
- (Opcional) `people:write` se você quiser escrever o status do relatório como um campo personalizado ou tag

### 2. Construir o cenário "iniciar uma verificação ao inscrever voluntário" em Make

1. **Gatilho** — B1.church: Assistir Eventos (`group.member.added`).
2. **Filtro** — apenas continuar se `data.groupId` corresponder ao seu grupo "Voluntários Infantis" (ou equivalente).
3. **Ação** — B1.church: Procurar Pessoa (por `data.personId`) para obter email + nome/sobrenome.
4. **Ação** — Checkr: Criar Candidato. Mapeie nome/sobrenome/email do passo 3.
5. **Ação** — Checkr: Criar Convite de Verificação de Antecedentes. Mapeie o novo id de candidato do passo 4 para o campo *candidate_id*. Escolha o pacote de triagem (por ex. `tasker_standard` ou qualquer que sua conta expõe).
6. (Opcional) **Ação** — Slack: notificar seu coordenador de ministério seguro que uma verificação foi iniciada.

Ative o cenário. Novos voluntários no grupo alvo recebem um convite Checkr automático por email; eles o completam no telefone ou laptop; Checkr executa a triagem.

### 3. (Opcional) Receber o relatório de volta

1. **Gatilho** — Checkr: Assistir Eventos (webhook). Make registra um webhook Checkr ao ativar.
2. **Filtro** — apenas continuar se `event_type = report.completed`.
3. **Ação** — Checkr: Obter Relatório (use o id do relatório do webhook).
4. **Ação** — B1.church: Procurar Pessoa (por email de candidato).
5. **Ação** — Slack / Email Condicional: notificar o coordenador com status `clear` / `consider` / `suspended`.

Nota: B1 não tem um campo "status de verificação de antecedentes" incorporado hoje. As opções pragmáticas são (a) postar o resultado em um canal Slack privado para análise, (b) escrever em um Google Sheet para auditoria, ou (c) adicionar a pessoa a um grupo "Voluntários Liberados" B1 em `clear`.

## Receitas Comuns

### Re-tela de voluntários a cada 2 anos

Emparelhe o acima com um gatilho de cronograma do Make:

- **Gatilho** — Make: Cronograma (mensal)
- **Ação** — B1.church: Listar Membros do Grupo para "Voluntários Liberados"
- **Ação** — Filtro por Make: data liberada mais de 22 meses atrás
- **Ação** — Checkr: Criar Convite de Verificação de Antecedentes (mesmo que o fluxo inicial)

### Bloquear acesso do estágio 1 até verificação ser concluída

Se sua igreja usa membros do grupo B1 para controlar acesso (por ex. apenas membros do grupo "Liberado" aparecem em cronogramas de serviço), mantenha novos voluntários em um grupo de espera até o evento `report.completed` do Checkr flip-los.

## Limites e Notas

- **Checkr é apenas US** para a maioria dos pacotes de triagem. Igrejas australianas, UK e canadenses precisarão de uma alternativa.
- **Preço** é por verificação — cada Criar Convite em Make consome uma verificação real. Teste primeiro em conta de sandbox / staging do Checkr (o aplicativo Checkr do Make respeita as credenciais que você passa na conexão, então trocar credenciais muda sandbox/live).
- **Acesso a API Checkr é gatilhado por plano.** Contas Checkr menores podem estar em um nível apenas UI; entre em contato com Checkr para habilitar API.

## Solução de Problemas

- **Criar Candidato falha com `403`** — o token de API Checkr é apenas leitura ou carece de permissões de conta corretas. Re-emita-o do painel Checkr com escopo de escrita.
- **Convite nunca chega** — verifique o email do candidato no passo 3; B1 pode ter um campo de email vazio para essa pessoa. Adicione um filtro required-email antes do passo Checkr.
- **Gatilho de webhook não dispara** — o registro de webhook Checkr às vezes falha silenciosamente se sua conta Make não estiver em um nível pago que suporte webhooks de saída. Verifique na página *Webhooks* do painel Checkr que a URL do Make está listada.

## Veja Também

- [Make (visão geral)](../make) — lado B1 de cada cenário Make
- [Mobile Message](./mobile-message) — para provedores SMS-sem-aplicativos-Zapier, mesmo padrão Webhooks/HTTP que a fiação Checkr Make
- [Documentos da API Checkr](https://docs.checkr.com/)
