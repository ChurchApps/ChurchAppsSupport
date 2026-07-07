---
title: "Registros de Eventos"
---

# Registros de Eventos

<div class="article-intro">

O registro de evento nativo vive no módulo de conteúdo e, desde a onda de registros pagos, carrega um modelo de comércio completo: tipos de participante com preço, seleções de complemento com preço, códigos de desconto, pagamentos através do gateway de doação existente da igreja e uma lista de espera acionada por status. O caminho do dinheiro deliberadamente reutiliza a pilha de doação — o controlador de registro carrega através da mesma abstração `GatewayService` / `IGatewayProvider` documentada em [Doações](./giving), portanto nenhum conhecimento de dados de cartão ou SDK de gateway vive no módulo de conteúdo. Esta página mapeia o modelo de dados, as regras de preços e capacidade e os fluxos de registro, pagamento e lista de espera.

</div>

## Visão Geral

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Três regras mantêm em toda a pilha:

1. **O servidor possui o preço.** Clientes enviam ids de tipo, ids de seleção e quantidades; `RegistrationPricingHelper.computeTotal()` computa o total no servidor e cupons são re-validados no tempo da cobrança. Um montante fornecido pelo cliente nunca é confiável.
2. **Capacidade é aplicada atomicamente no tempo de inserção.** Cada inserção limitada por capacidade usa uma instrução `INSERT … SELECT … FROM dual WHERE (contagem de linhas ativas) < capacidade`, então dois registros simultâneos não podem ambos tomar o último lugar. As contagens são derivadas do status (`pending`/`confirmed`), nunca armazenadas.
3. **Pagamentos funcionam nos trilhos de doação.** `RegistrationController` chama o compartilhado `GatewayService.processCharge` com o gateway configurado da igreja — a mesma abstração de provedor, modelo de tokenização e manipulação de SCA que doações.

## Modelo de dados (`Api/src/modules/content`)

Modelos estão em `models/Registration.ts`; mapeamentos de tabela em `db/DatabaseTypes.ts`; um repositório por tabela sob `repositories/`.

| Tabela | Significado | Campos Principais |
|-------|---------|-----------|
| `registrations` | Um registro (um agregado doméstico/festa para um evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Um participante em um registro | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipos de participante por evento (ex: Adulto / Criança) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opções de complemento nomeadas com um preço (ex: Camiseta) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limite por registro), sort, active |
| `registrationSelectionChoices` | Quantidade de uma seleção escolhida por um registro/membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Uma cobrança bem-sucedida contra um registro | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Códigos de desconto por evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notas:

- **Não há tabela de lista de espera.** Partes na lista de espera são linhas `registrations` com `status = 'waitlisted'`; todo o ciclo de vida da lista de espera é transições de status naquela tabela única.
- **Sem contadores armazenados.** Contagens "Vendidas" / "usadas" (capacidade do evento, capacidade por tipo, capacidade por seleção, usos de cupom) são computadas com subconsultas correlacionadas sobre linhas cujo status está em `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelar um registro portanto libera capacidade sem contabilidade.
- Os preços são colunas MySQL DECIMAL (strings sobre o fio) coagidas com `Number()` dentro do auxiliar de preço.

## Superfície REST

Tudo está sob `/content/registrations` (`controllers/RegistrationController.ts`), controlado por `Permissions.registrations` (`view` / `edit`):

| Rota | Acesso | Propósito |
|-------|--------|---------|
| `POST /register` | anônimo | Submissão completa: convidado ou membro, preço do servidor, verificações de capacidade, cobrança opcional |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | público | Tipos/seleções com `used` / `remainingCapacity` derivados para o assistente |
| `POST /types`, `DELETE /types/:id` (mesmo para `/selections`, `/coupons`) | `registrations.edit` | CRUD de configurações de equipe |
| `POST /coupons/validate` | público | Validação de código de desconto inline durante o assistente |
| `GET /coupons/event/:eventId` | equipe | Cupons com contagens de usos |
| `GET /event/:eventId` · `GET /event/:eventId/count` | equipe · público | Roster; contagem ativa para exibição de capacidade |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticado | Meus Registros, detalhe, histórico de pagamento |
| `PUT /:id` | proprietário/equipe | Edição pós-envio — substitui membros e opções de seleção com verificações de capacidade atômica fresca, recalcula `totalAmount`; nunca cobra ou reembolsa automaticamente |
| `POST /:id/pay` | proprietário | "Pagamento completo": cobra `totalAmount − amountPaid`, inverte `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | equipe | Promoção manual da lista de espera |
| `POST /:id/cancel` · `DELETE /:id` | proprietário · equipe | Cancelar / excluir; ambos disparam promoção automática da lista de espera |

Um registro não cancelado existente para o mesmo `personId` no mesmo evento é rejeitado com um 409, e cada registro criado emite um webhook `registration.created` via `WebhookDispatcher`.

## Preços e códigos de desconto

`helpers/RegistrationPricingHelper.ts` é a autoridade monetária única:

- `computeTotal()` soma o preço de tipo de cada membro mais `price × quantity` de cada opção de seleção.
- `validateCoupon()` aplica sinalizador ativo, janela de data (`startDate`/`endDate`), `minMembers` contra o tamanho da parte enviada e `maxUses` contra a contagem de resgate derivada do status.
- `applyDiscount()` — `percent` subtrai `total × value/100`; `amount` subtrai `value`; ambos piso em zero.

O assistente chama `POST /coupons/validate` para feedback inline, mas `register` re-valida e re-aplica o cupom no lado do servidor — o total exibido do cliente é meramente consultivo.

## O idioma de capacidade atômica

Cada inserção limitada por capacidade corre seguro sem transações ou bloqueios fazendo da verificação de capacidade parte do `INSERT` em si. Nível de evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero linhas afetadas significa "na capacidade". O mesmo idioma guarda inserts por tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, contando membros unidos a registros ativos) e quantidades por seleção (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, usando `COALESCE(SUM(quantity),0) + ? <= capacity`). Quando qualquer insert de membro ou seleção falha no meio do registro, o controlador reverte o registro parcial com `deleteCascade()` e relata qual tipo ou seleção foi vendido.

## Fluxo de Pagamento

`processRegistrationCharge` no controlador é o único lugar onde registros tocam dinheiro e é um cliente fino da pilha de doação:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

A tokenização acontece no navegador exatamente como para doações (veja [Doações](./giving)) — o assistente reutiliza o registro de provedor de pagamento apphelper, portanto membros conectados podem pagar com cartões salvos e convidados tokenizam um cartão novo. O controlador espelha as peculiaridades do provedor de `DonateController` (ids de método de pagamento `pm-{id}` do Kingdom Funding, respostas `requires_action` de SCA do Stripe retornadas ao cliente sem registrar um pagamento). Uma cobrança bem-sucedida escreve uma linha `registrationPayments`, aumenta `amountPaid` e confirma o registro. **Reembolsos não são implementados** — um registro pago cancelado mantém suas linhas de pagamento e qualquer reembolso é tratado fora de banda no painel de dashboard do gateway.

Ambos os pontos de entrada se encaminham através do mesmo caminho de código: `register` (pagar na inscrição) e `pay` (pagamento de saldo / conclusão da lista de espera).

## Ciclo de Vida da Lista de Espera

Quando o evento está cheio e o sinalizador `waitlistEnabled` do evento está ligado, `register` salva a parte como `waitlisted` (pulando verificações de capacidade) e envia o email de confirmação normal marcado como um lugar na lista de espera. A promoção acontece de três maneiras — `cancel`, `delete` e o ponto de extremidade `promote` de equipe — todos se canalizando em `RegistrationRepo.promoteFromWaitlist`, que escolhe a linha na lista de espera mais antiga e a inverte atomicamente:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

A guarda `status='waitlisted'` significa que promoções concorrentes não podem dupla-promover uma linha e a subconsulta de capacidade significa que uma promoção não pode oversell. As linhas promovidas pousam em `pending` — não `confirmed` — porque um saldo ainda pode ser owed; `RegistrationHelper.sendWaitlistAvailabilityEmail` diz ao registrante que seu lugar se abriu e quando `totalAmount − amountPaid > 0`, vincula à página de pagamento completo. Pagar (ou não ter saldo) confirma eles.

:::info
Uma elevação de capacidade não promove automaticamente — a equipe usa a ação de Promoção da lista de apresentação após aumentar a capacidade. Cancelamentos e exclusões promovem automaticamente.
:::

## Superfícies do Cliente

- **Assistente de B1App** — um hook compartilhado, `B1App/src/components/registration/useEventRegistration.ts`, conduz tanto o componente de site (`components/registration/EventRegister.tsx`) quanto a tela do portal móvel (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) através das etapas `info → members → selections → questions → payment → confirm` (as etapas do meio renderizam apenas quando o evento tem seleções, um formulário anexado ou um total diferente de zero). As etapas de info/membros mostram seletores por tipo de participante com capacidade restante ao vivo e estados vendidos; pagamento (`RegistrationPaymentForm.tsx`) mostra o resumo do pedido, entrada de código de desconto e — para membros conectados — métodos de pagamento salvos via registro de provedor apphelper, com convidados tokenizando um cartão novo. A tela móvel **Registrations** (`screens/RegistrationsPage.tsx`) é Meus Registros: status, saldo devido, Pagamento Completo (`POST /:id/pay`), Editar (`PUT /:id` — contato, tipos de membro, quantidades de seleção) e Cancelar.
- **Configurações B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` adiciona o switch Ativar Lista de Espera mais accordeons para Tipos de Participante, Seleções e Códigos de Desconto (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), todos CRUD contra as rotas `/types`, `/selections`, `/coupons`.
- **Roster B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: coluna por tipo de Participante, coluna Pago/Total com chip de saldo, chips de contagem por tipo, diálogo de detalhe de pagamentos (`RegistrationDetailDialog.tsx`, de `GET /payments/:registrationId`), ação de linha de Promoção da lista de espera e exportação CSV incluindo tipos de participante, seleções, pagamento/total/saldo e respostas de pergunta.

Lookups entre módulos (resolvendo ou criando a pessoa convidada, carregando a chiesa para emails) passam por `getMembershipModuleGateway()` — o módulo de conteúdo nunca lê tabelas de associação diretamente.

## Páginas Relacionadas

- [Doações](./giving) — a abstração de gateway, registro de provedor e modelo de tokenização que este recurso reutiliza
- [Pontos de Extremidade de Conteúdo](../api/endpoints/content) — a superfície REST do módulo de conteúdo
- [Webhooks](../api/webhooks) — o evento `registration.created`
- [Estrutura de Módulo](../api/module-structure) — como o módulo de conteúdo é organizado no lado do servidor
