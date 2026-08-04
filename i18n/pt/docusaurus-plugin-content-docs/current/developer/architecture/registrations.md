---
title: "Registros de Eventos"
---

# Registros de Eventos

<div class="article-intro">

O registro de evento nativo vive no módulo de conteúdo e, desde a onda de registros pagos, carrega um modelo de comércio completo: tipos de participante com preço, seleções de complemento com preço, códigos de desconto, pagamentos através do gateway de doação já existente da igreja, e uma lista de espera acionada por status. O caminho do dinheiro reutiliza deliberadamente a pilha de doações — o controlador de registro cobra através da mesma abstração `GatewayService` / `IGatewayProvider` documentada em [Doações](./giving), então nenhum conhecimento sobre dados de cartão ou SDK de gateway vive no módulo de conteúdo. Esta página mapeia o modelo de dados, as regras de preço e capacidade, e os fluxos de registro, pagamento e lista de espera.

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

Três regras se mantêm em toda a pilha:

1. **O servidor detém o preço.** Os clientes enviam ids de tipo, ids de seleção e quantidades; `RegistrationPricingHelper.computeTotal()` calcula o total no servidor, e cupons são revalidados no momento da cobrança. Um valor fornecido pelo cliente nunca é confiável.
2. **A capacidade é aplicada de forma atômica no momento da inserção.** Toda inserção limitada por capacidade usa uma instrução `INSERT … SELECT … FROM dual WHERE (contagem de linhas ativas) < capacidade`, então dois registros simultâneos não conseguem ocupar a última vaga ao mesmo tempo. As contagens são derivadas do status (`pending`/`confirmed`), nunca armazenadas.
3. **Os pagamentos usam os trilhos de doação.** `RegistrationController` chama o `GatewayService.processCharge` compartilhado com o gateway configurado da igreja — a mesma abstração de provedor, o mesmo modelo de tokenização e o mesmo tratamento de SCA das doações.

## Modelo de dados (`Api/src/modules/content`)

Os modelos ficam em `models/Registration.ts`; os mapeamentos de tabela em `db/DatabaseTypes.ts`; um repositório por tabela sob `repositories/`.

| Tabela | Significado | Campos-chave |
|-------|---------|-----------|
| `registrations` | Um registro (uma família/grupo para um evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Um participante em um registro | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipos de participante por evento (ex.: Adulto / Criança) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opções de complemento nomeadas com preço (ex.: camiseta) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limite por registro), sort, active |
| `registrationSelectionChoices` | Quantidade de uma seleção escolhida por um registro/membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Uma cobrança bem-sucedida contra um registro | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Códigos de desconto por evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notas:

- **Não existe tabela de lista de espera.** Grupos na lista de espera são linhas `registrations` com `status = 'waitlisted'`; todo o ciclo de vida da lista de espera consiste em transições de status nessa única tabela.
- **Sem contadores armazenados.** As contagens de "vendidos" / "usados" (capacidade do evento, capacidade por tipo, capacidade por seleção, usos de cupom) são calculadas com subconsultas correlacionadas sobre linhas cujo status está em `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelar um registro, portanto, libera capacidade sem qualquer contabilidade adicional.
- Os preços são colunas MySQL DECIMAL (strings no transporte) convertidas com `Number()` dentro do auxiliar de precificação.

## Superfície REST

Tudo está sob `/content/registrations` (`controllers/RegistrationController.ts`), controlado por `Permissions.registrations` (`view` / `edit`):

| Rota | Acesso | Propósito |
|-------|--------|---------|
| `POST /register` | anônimo | Envio completo: convidado ou membro, precificação no servidor, verificações de capacidade, cobrança opcional |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | público | Tipos/seleções com `used` / `remainingCapacity` derivados para o assistente |
| `POST /types`, `DELETE /types/:id` (o mesmo para `/selections`, `/coupons`) | `registrations.edit` | CRUD de configurações da equipe |
| `POST /coupons/validate` | público | Validação de código de desconto em linha durante o assistente |
| `GET /coupons/event/:eventId` | equipe | Cupons com contagens de uso |
| `GET /event/:eventId` · `GET /event/:eventId/count` | equipe · público | Lista de inscritos; contagem ativa para exibição de capacidade |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticado | Meus Registros, detalhe, histórico de pagamento |
| `PUT /:id` | proprietário/equipe | Edição pós-envio — substitui membros e escolhas de seleção com verificações de capacidade atômicas atualizadas, recalcula `totalAmount`; nunca cobra ou reembolsa automaticamente |
| `POST /:id/pay` | proprietário | "Completar pagamento": cobra `totalAmount − amountPaid`, muda `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | equipe | Promoção manual da lista de espera |
| `POST /:id/cancel` · `DELETE /:id` | proprietário · equipe | Cancelar / excluir; ambos disparam a promoção automática da lista de espera |

Um registro existente não cancelado para o mesmo `personId` no mesmo evento é rejeitado com um 409, e cada registro criado emite um webhook `registration.created` via `WebhookDispatcher`.

## Preços e códigos de desconto

`helpers/RegistrationPricingHelper.ts` é a única autoridade sobre o cálculo monetário:

- `computeTotal()` soma o preço do tipo de cada membro mais `price × quantity` de cada escolha de seleção.
- `validateCoupon()` aplica o sinalizador de ativo, a janela de datas (`startDate`/`endDate`), `minMembers` contra o tamanho do grupo enviado, e `maxUses` contra a contagem de resgates derivada do status.
- `applyDiscount()` — `percent` subtrai `total × value/100`; `amount` subtrai `value`; ambos têm piso em zero.

O assistente chama `POST /coupons/validate` para feedback em linha, mas `register` revalida e reaplica o cupom no lado do servidor — o total exibido no cliente é meramente informativo.

## O idioma da capacidade atômica

Toda inserção limitada por capacidade concorre com segurança sem transações ou bloqueios, tornando a verificação de capacidade parte do próprio `INSERT`. No nível do evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero linhas afetadas significa "na capacidade máxima". O mesmo idioma protege inserções por tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, contando membros vinculados a registros ativos) e quantidades por seleção (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, usando `COALESCE(SUM(quantity),0) + ? <= capacity`). Quando qualquer inserção de membro ou seleção falha no meio de um registro, o controlador reverte o registro parcial com `deleteCascade()` e informa qual tipo ou seleção esgotou.

## Fluxo de pagamento

`processRegistrationCharge` no controlador é o único lugar em que registros lidam com dinheiro, e é um cliente fino da pilha de doações:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

A tokenização acontece no navegador exatamente como nas doações (veja [Doações](./giving)) — o assistente reutiliza o registro de provedores de pagamento do apphelper, então membros conectados podem pagar com cartões salvos e convidados tokenizam um cartão novo. O controlador espelha as particularidades de provedor do `DonateController` (ids de método de pagamento `pm-{id}` do Kingdom Funding, respostas `requires_action` de SCA do Stripe retornadas ao cliente sem registrar um pagamento). Uma cobrança bem-sucedida grava uma linha `registrationPayments`, aumenta `amountPaid` e confirma o registro. **Reembolsos não estão implementados** — um registro pago e cancelado mantém suas linhas de pagamento, e qualquer reembolso é tratado fora de banda no painel do gateway.

Ambos os pontos de entrada passam pelo mesmo caminho de código: `register` (pagar na inscrição) e `pay` (pagamento de saldo / conclusão de lista de espera).

## Ciclo de vida da lista de espera

Quando o evento está lotado e o sinalizador `waitlistEnabled` do evento está ativo, `register` salva o grupo como `waitlisted` (pulando as verificações de capacidade) e envia o e-mail de confirmação normal marcado como uma vaga na lista de espera. A promoção acontece de três formas — `cancel`, `delete`, e o ponto de extremidade `promote` da equipe — todas convergindo para `RegistrationRepo.promoteFromWaitlist`, que escolhe a linha mais antiga na lista de espera e a atualiza atomicamente:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

A proteção `status='waitlisted'` significa que promoções concorrentes não podem promover a mesma linha duas vezes, e a subconsulta de capacidade significa que uma promoção não pode vender além da capacidade. As linhas promovidas caem em `pending` — não `confirmed` — porque um saldo ainda pode ser devido; `RegistrationHelper.sendWaitlistAvailabilityEmail` avisa ao inscrito que sua vaga se abriu e, quando `totalAmount − amountPaid > 0`, aponta para a página de conclusão de pagamento. Pagar (ou não ter saldo) os confirma.

:::info
Um aumento de capacidade não promove automaticamente por si só — a equipe usa a ação de Promover na lista de inscritos após aumentar a capacidade. Cancelamentos e exclusões promovem automaticamente.
:::

## Superfícies do Cliente

- **Assistente do B1App** — um único hook compartilhado, `B1App/src/components/registration/useEventRegistration.ts`, conduz tanto o componente do site (`components/registration/EventRegister.tsx`) quanto a tela do portal móvel (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) através das etapas `info → members → selections → questions → payment → confirm` (as etapas intermediárias só renderizam quando o evento tem seleções, um formulário anexado, ou um total diferente de zero). As etapas de info/membros mostram seletores por tipo de participante com capacidade restante ao vivo e estados de esgotado; o pagamento (`RegistrationPaymentForm.tsx`) mostra o resumo do pedido, a entrada de código de desconto e — para membros conectados — métodos de pagamento salvos via o registro de provedores do apphelper, com convidados tokenizando um cartão novo. A tela móvel **Registrations** (`screens/RegistrationsPage.tsx`) é a de Meus Registros: status, saldo devido, Completar pagamento (`POST /:id/pay`), Editar (`PUT /:id` — contato, tipos de membro, quantidades de seleção), e Cancelar.
- **Configurações do B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` adiciona o interruptor Ativar Lista de Espera, além de acordeões para Tipos de Participante, Seleções e Códigos de Desconto (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), todos com CRUD contra as rotas `/types`, `/selections`, `/coupons`.
- **Lista de inscritos do B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: coluna de Tipo por participante, coluna Pago/Total com chip de saldo, chips de contagem por tipo, uma caixa de diálogo de detalhe de pagamentos (`RegistrationDetailDialog.tsx`, a partir de `GET /payments/:registrationId`), a ação de linha Promover da lista de espera, e exportação CSV incluindo tipos de participante, seleções, pago/total/saldo e respostas às perguntas.

As buscas entre módulos (resolver ou criar a pessoa convidada, carregar a igreja para e-mails) passam por `getMembershipModuleGateway()` — o módulo de conteúdo nunca lê tabelas de associação diretamente.

## Páginas Relacionadas

- [Doações](./giving) — a abstração de gateway, o registro de provedores e o modelo de tokenização que este recurso reutiliza
- [Pontos de Extremidade de Conteúdo](../api/endpoints/content) — a superfície REST do módulo de conteúdo
- [Webhooks](../api/webhooks) — o evento `registration.created`
- [Estrutura de Módulo](../api/module-structure) — como o módulo de conteúdo é organizado no lado do servidor
