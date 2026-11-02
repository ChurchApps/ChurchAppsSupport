---
title: "Inscrições em eventos"
---

# Inscrições em eventos

<div class="article-intro">

A inscrição nativa em eventos vive no módulo de conteúdo e, desde a onda de inscrições pagas, traz um modelo comercial completo: tipos de participante com preço, opções complementares com preço, códigos de desconto, pagamentos pelo gateway de doações existente da igreja e uma lista de espera controlada por status. O caminho do dinheiro reutiliza deliberadamente a pilha de doações — o controller de inscrições cobra pela mesma abstração `GatewayService` / `IGatewayProvider` documentada em [Doações](./giving), de modo que nenhum dado de cartão ou conhecimento de SDK de gateway vive no módulo de conteúdo. Esta página mapeia o modelo de dados, as regras de preço e capacidade e os fluxos de inscrição, pagamento e lista de espera.

</div>

## Visão geral

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

Três regras valem para toda a pilha:

1. **O servidor define o preço.** Os clientes enviam ids de tipos, ids de opções e quantidades; `RegistrationPricingHelper.computeTotal()` calcula o total no servidor, e os cupons são revalidados no momento da cobrança. Um valor enviado pelo cliente nunca é confiável.
2. **A capacidade é aplicada de forma atômica no momento da inserção.** Toda inserção limitada por capacidade usa uma instrução `INSERT … SELECT … FROM dual WHERE (contagem de linhas ativas) < capacidade`, de modo que duas inscrições simultâneas não conseguem pegar a última vaga. As contagens são derivadas do status (`pending`/`confirmed`), nunca armazenadas.
3. **Os pagamentos usam os trilhos de doação.** `RegistrationController` chama o `GatewayService.processCharge` compartilhado com o gateway configurado da igreja — o mesmo provedor abstrato, modelo de tokenização e tratamento de SCA das doações.

## Modelo de dados (`Api/src/modules/content`)

Os modelos ficam em `models/Registration.ts`; os mapeamentos de tabelas em `db/DatabaseTypes.ts`; um repositório por tabela em `repositories/`.

| Tabela | Significado | Campos principais |
|--------|-------------|-------------------|
| `registrations` | Uma inscrição (uma família/grupo para um evento) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Um participante em uma inscrição | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Tipos de participante por evento (por exemplo, Adulto / Criança) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Opções complementares nomeadas com preço (por exemplo, camiseta) | eventId, name, description, **price**, **capacity**, **maxQuantity** (limite por inscrição), sort, active |
| `registrationSelectionChoices` | Quantidade de uma opção escolhida por uma inscrição/membro | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Uma cobrança bem-sucedida contra uma inscrição | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Códigos de desconto por evento | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Observações:

- **Não existe tabela de lista de espera.** As inscrições em lista de espera são linhas de `registrations` com `status = 'waitlisted'`; todo o ciclo de vida da lista de espera são transições de status nessa única tabela.
- **Sem contadores armazenados.** Os totais "vendidos" / "usados" (capacidade do evento, capacidade por tipo, capacidade por opção, usos de cupons) são calculados com subconsultas correlacionadas sobre linhas cujo status está em `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Cancelar uma inscrição, portanto, libera a capacidade sem nenhuma contabilidade.
- Os preços são colunas DECIMAL do MySQL (strings na transmissão), convertidas com `Number()` dentro do auxiliar de preços.

## Superfície REST

Tudo fica em `/content/registrations` (`controllers/RegistrationController.ts`), protegido por `Permissions.registrations` (`view` / `edit`):

| Rota | Acesso | Finalidade |
|------|--------|------------|
| `POST /register` | anônimo | Envio completo: convidado, membro ou Adicionar participante pela equipe; preço no servidor, verificações de capacidade, cobrança opcional |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | público | Tipos/opções com `used` / `remainingCapacity` derivados para o assistente |
| `POST /types`, `DELETE /types/:id` (o mesmo para `/selections`, `/coupons`) | `registrations.edit` | CRUD de configurações da equipe |
| `POST /coupons/validate` | público | Validação inline do código de desconto durante o assistente |
| `GET /coupons/event/:eventId` | equipe | Cupons com contagens de usos |
| `GET /event/:eventId` · `GET /event/:eventId/count` | equipe · público | Lista de inscritos; contagem de ativos para exibir a capacidade |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | autenticado | Minhas inscrições, detalhe, histórico de pagamentos |
| `PUT /:id` | dono/equipe | Edição pós-envio — substitui os membros e as escolhas de opções com novas verificações atômicas de capacidade, recalcula `totalAmount`; nunca cobra nem reembolsa automaticamente |
| `POST /:id/pay` | dono | "Concluir pagamento": cobra `totalAmount − amountPaid`, muda `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | equipe | Promoção manual da lista de espera |
| `POST /:id/cancel` · `DELETE /:id` | dono · equipe | Cancelar / excluir; ambos disparam a promoção automática da lista de espera |

Uma inscrição não cancelada já existente para o mesmo `personId` no mesmo evento é rejeitada com 409, e cada inscrição criada emite um webhook `registration.created` pelo `WebhookDispatcher`.

## Preço e cupons de desconto

`helpers/RegistrationPricingHelper.ts` é a única autoridade de cálculo monetário:

- `computeTotal()` soma o preço do tipo de cada membro mais o `preço × quantidade` de cada escolha de opção.
- `validateCoupon()` aplica a flag de ativo, a janela de datas (`startDate`/`endDate`), `minMembers` em relação ao tamanho do grupo enviado e `maxUses` em relação ao número de resgates derivado do status.
- `applyDiscount()` — `percent` subtrai `total × value/100`; `amount` subtrai `value`; ambos param em zero.

O assistente chama `POST /coupons/validate` para o retorno inline, mas `register` revalida e reaplica o cupom no servidor — o total exibido ao cliente é apenas indicativo.

## O idioma atômico de capacidade

Toda inserção limitada por capacidade é segura contra concorrência sem transações nem travas, pois a verificação de capacidade faz parte do próprio `INSERT`. No nível do evento (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Zero linhas afetadas significa "na capacidade máxima". O mesmo idioma protege as inserções por tipo (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, contando membros unidos a inscrições ativas) e as quantidades por opção (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, usando `COALESCE(SUM(quantity),0) + ? <= capacity`). Quando alguma inserção de membro ou de opção falha no meio da inscrição, o controller desfaz a inscrição parcial com `deleteCascade()` e informa qual tipo ou opção esgotou.

## Fluxo de pagamento {#payment-flow}

`processRegistrationCharge` no controller é o único lugar em que as inscrições tocam no dinheiro, e ele é um cliente enxuto da pilha de doações:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

A tokenização acontece no navegador exatamente como nas doações (veja [Doações](./giving)) — o assistente reutiliza o registro de provedores de pagamento do apphelper, de modo que membros conectados podem pagar com cartões salvos e convidados tokenizam um novo cartão. O controller espelha as particularidades dos provedores do `DonateController` (ids de método de pagamento `pm-{id}` do Kingdom Funding, respostas SCA `requires_action` do Stripe devolvidas ao cliente sem registrar um pagamento). Uma cobrança bem-sucedida grava uma linha em `registrationPayments`, incrementa `amountPaid` e confirma a inscrição. **Reembolsos não estão implementados** — uma inscrição paga cancelada mantém suas linhas de pagamento, e qualquer reembolso é tratado fora do sistema, no painel do gateway.

Os dois pontos de entrada passam pelo mesmo caminho de código: `register` (pagamento na inscrição) e `pay` (pagamento do saldo / conclusão da lista de espera).

`register` pula a cobrança em dois casos e salva a inscrição como `pending` com `amountPaid = 0`, deixando o total inteiro como saldo devedor:

- **Adicionar participante pela equipe.** O corpo traz um `personId` que não é o do chamador, sem `guestInfo`, e o chamador tem `registrations.edit` naquela igreja. A pessoa precisa existir (404 caso contrário), o filtro de membros do domicílio é ignorado e nenhum cartão é cobrado.
- **Sem gateway.** A igreja não tem gateway de doações (`hasGateway` verifica `gateway.loadAll`). A etapa de pagamento do B1App mostra **Inscrever e pagar depois** no lugar do formulário de cartão.

Inscrições pagas de convidados (sem `au.id`) precisam trazer um `captchaPass` de `POST /giving/donate/captcha-verify`. O `CaptchaPass.verify` (agora em `shared/helpers`) roda logo antes da cobrança, de modo que inscrições na lista de espera e gratuitas não são afetadas. Quando `CAPTCHA_ENFORCE=true` e o passe está ausente ou é inválido, a nova inscrição é desfeita com `deleteCascade()` e a chamada retorna 403. O `RegistrationPaymentForm` do B1App mostra a caixa do reCAPTCHA para convidados e envia o passe junto com o salvamento do cartão e com a inscrição.

## Ciclo de vida da lista de espera

Quando o evento está lotado e a flag `waitlistEnabled` do evento está ativa, `register` salva o grupo como `waitlisted` (pulando as verificações de capacidade) e envia o e-mail de confirmação normal, marcado como vaga na lista de espera. A promoção acontece de três formas — `cancel`, `delete` e o endpoint de equipe `promote` — todas convergindo para `RegistrationRepo.promoteFromWaitlist`, que escolhe a linha mais antiga da lista de espera e a muda de forma atômica:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…contagem ativa do evento…) < ?
```

A proteção `status='waitlisted'` impede que promoções concorrentes promovam a mesma linha duas vezes, e a subconsulta de capacidade impede que uma promoção venda mais do que a capacidade. As linhas promovidas ficam em `pending` — não em `confirmed` — porque um saldo ainda pode ser devido; `RegistrationHelper.sendWaitlistAvailabilityEmail` avisa o inscrito de que a vaga abriu e, quando `totalAmount − amountPaid > 0`, leva à página `/mobile/registrations` do B1 da igreja (Minhas inscrições), montada a partir do `B1AppRoot` e do subdomínio da igreja. Pagar (ou não ter saldo) confirma a inscrição.

:::info
Um aumento de capacidade não promove ninguém automaticamente — a equipe usa a ação Promover da lista de inscritos depois de aumentar a capacidade. Cancelamentos e exclusões promovem automaticamente.
:::

## Superfícies do cliente

- **Assistente do B1App** — um único hook compartilhado, `B1App/src/components/registration/useEventRegistration.ts`, comanda tanto o componente do site (`components/registration/EventRegister.tsx`) quanto a tela do portal móvel (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) pelas etapas `info → members → selections → questions → payment → confirm` (as etapas do meio aparecem somente quando o evento tem opções, um formulário anexado ou um total maior que zero). As etapas de informações/membros mostram seletores por tipo de participante com estados de capacidade restante e esgotado ao vivo; o pagamento (`RegistrationPaymentForm.tsx`) mostra o resumo do pedido, a entrada de código de desconto e — para membros conectados — os métodos de pagamento salvos pelo registro de provedores do apphelper, com convidados tokenizando um novo cartão. A tela **Inscrições** do mobile (`screens/RegistrationsPage.tsx`) é Minhas inscrições: situação, saldo devedor, Concluir pagamento (`POST /:id/pay`), Editar (`PUT /:id` — contato, tipos de membro, quantidades de opções) e Cancelar.
- **Configurações no B1Admin** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` adiciona o interruptor Ativar lista de espera e acordeões para Tipos de participante, Opções e Códigos de desconto (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`), todos com CRUD nas rotas `/types`, `/selections`, `/coupons`.
- **Lista de inscritos no B1Admin** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: coluna de Tipo por participante, coluna Pago/Total com selo de saldo, contadores por tipo, uma janela de detalhes de pagamentos (`RegistrationDetailDialog.tsx`, a partir de `GET /payments/:registrationId`), a ação de linha Promover da lista de espera e a exportação em CSV, incluindo tipos de participante, opções, pago/total/saldo e respostas às perguntas.

Consultas entre módulos (localizar ou criar a pessoa convidada, carregar a igreja para os e-mails) passam por `getMembershipModuleGateway()` — o módulo de conteúdo nunca lê as tabelas de membership diretamente.

## Páginas relacionadas

- [Doações](./giving) — a abstração de gateway, o registro de provedores e o modelo de tokenização que esta funcionalidade reutiliza
- [Endpoints de Content](../api/endpoints/content) — a superfície REST do módulo de conteúdo
- [Webhooks](../api/webhooks) — o evento `registration.created`
- [Estrutura do módulo](../api/module-structure) — como o módulo de conteúdo é organizado no servidor
