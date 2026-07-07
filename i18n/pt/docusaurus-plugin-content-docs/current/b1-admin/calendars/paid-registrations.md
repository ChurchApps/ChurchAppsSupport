---
title: "Registros Pagos"
---

# Registros Pagos

<div class="article-intro">

O registro de evento pode ir além de uma simples contagem de cabeças. Você pode definir tipos de participantes com preço (como Adulto e Criança), oferecer complementos opcionais com seus próprios preços e quantidades, criar códigos de desconto e coletar pagamento no registro através do provedor de ofertas existente da sua igreja. Quando um evento se enche, uma lista de espera opcional mantém membros interessados na fila e os promove automaticamente à medida que os spots abrem.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Habilite o registro no evento primeiro -- veja [Criando Calendários](creating-calendars#enabling-event-registration)
- Para coletar pagamentos, sua igreja precisa [online giving configurado](../donations/online-giving-setup.md) (Stripe, PayPal, ou Kingdom Funding). Eventos livres não precisam de configuração de ofertas.

</div>

## Abrindo Configurações de Registro

1. No B1 Admin, vá para a página **Registros** e abra seu evento (ou abra o evento a partir de seu calendário).
2. O card **Configurações de Registro** mostra o básico -- **Habilitar Registro**, **Capacidade**, **Registro Abre/Fecha**, **Tags** e **Perguntas de Registro**.
3. Abaixo do básico há três acordeões: **Tipos de Participantes**, **Seleções** e **Códigos de Desconto**.

## Tipos de Participantes

Tipos de participantes deixam você cobrar preços diferentes para diferentes tipos de participantes -- e limitar cada um separadamente.

1. Expanda o acordeão **Tipos de Participantes** e clique **Adicionar Tipo**.
2. Digite um **Nome** (por exemplo, "Adulto", "Criança", "Estudante").
3. Defina um **Preço**. Use 0 para um tipo gratuito.
4. Opcionalmente defina uma **Capacidade** apenas para este tipo (por exemplo, apenas 20 spots de Criança). Deixe em branco para nenhum limite por tipo.
5. Clique **Salvar**.

Durante o registro, cada participante escolhe um tipo; tipos esgotados são mostrados como **Esgotado** e não podem ser selecionados. A lista de presença mostra o tipo de cada participante e contagens em execução por tipo.

## Seleções

Seleções são complementos com preço opcionais -- camisetas, planos de refeição, upgrades de atividade.

1. Expanda o acordeão **Seleções** e clique **Adicionar Seleção**.
2. Digite um **Nome**, **Descrição** opcional e um **Preço** (0 mostra como "Livre").
3. Opcionalmente defina uma **Capacidade** (total disponível em todos os registros) e **Qty Máx** (o máximo que um registro pode pedir).
4. Clique **Salvar**.

Os inscritos escolhem quantidades durante a inscrição e os totais contam contra capacidade para que você nunca oversell.

## Códigos de Desconto

1. Expanda o acordeão **Códigos de Desconto** e clique **Adicionar Código de Desconto**.
2. Digite o **Código** que os inscritos digitarão.
3. Escolha o **Tipo** -- **Percentual** ou **Valor** -- e seu **Valor**.
4. Opcionalmente limite o código com uma **Data de Início** / **Data de Término**, um **Mín Membros** (número mínimo de participantes no registro) e **Máx Usos**.
5. Clique **Salvar**.

Cada código mostra uma contagem de **Usos** para que você possa ver com que frequência foi resgatado. Os inscritos recebem feedback instantâneo quando aplicam um código -- incluindo mensagens claras quando um código expirou, não começou ou precisa de mais participantes.

## Lista de Espera

Ative **Habilitar Lista de Espera** no card Configurações de Registro. Quando o evento atinge capacidade:

- Novos inscritos são oferecidos um spot na lista de espera em vez de serem rejeitados. Eles completam a mesma inscrição (pagamento é pulado enquanto na lista de espera).
- Quando alguém cancela, o registro na lista de espera mais antigo é **promovido automaticamente** e recebe um email que um spot abriu. Se eles devem um saldo, o email os vincula para completar o pagamento.
- Você pode promover alguém manualmente a qualquer momento com a ação **Promover** em uma linha na lista de espera -- útil após aumentar a capacidade do evento.

:::info
Registros promovidos permanecem *pendentes* até que qualquer saldo seja pago; pagar (ou não ter nada a pagar) confirma-os.
:::

## A Lista de Presença de Registro

Abra um evento na página de Registros para ver cada registro. A tabela mostra **Nome**, **Membros**, **Tipo** (tipo de cada participante), **Pago / Total** (com aviso de saldo quando dinheiro ainda é devido), **Status** e **Data**, mais chips de contagem por tipo acima da tabela.

- Clique no ícone de detalhes de uma linha para abrir o diálogo **Detalhes de Registro** -- membros, seleções, pago/saldo e uma tabela **Pagamentos** listando cada cobrança (valor, método, data).
- **Exportar CSV** baixa a lista de presença completa com colunas para membros, tipos de participantes, seleções, pago/total/saldo, status e uma coluna por pergunta de registro.
- **Adicionar Participante** ainda deixa você registrar inscrições offline manualmente.

:::info
Reembolsos não são processados dentro de B1. Se você precisar reembolsar um registro pago cancelado, emita o reembolso do dashboard do seu provedor de ofertas (por exemplo, Stripe).
:::

## Como Funciona o Pagamento

Os pagamentos passam pelo mesmo gateway de ofertas que sua igreja já usa para doações -- os detalhes do cartão vão direto para o provedor e nunca tocam os servidores de B1. Os preços são sempre computados no servidor a partir de seus tipos configurados, seleções e códigos de desconto, para que um inscrito não possa interferir no total. Membros conectados podem pagar com um cartão salvo; convidados inserem um cartão no checkout.

## Artigos Relacionados

- [Criando Calendários](creating-calendars#enabling-event-registration) -- habilite registro e as configurações básicas
- [Configuração de Ofertas Online](../donations/online-giving-setup.md) -- configure o gateway de pagamento usado no checkout
- [Registrando para Eventos](../../b1-church/events/registering) -- o que os membros veem quando se inscrevem
- [Meus Registros](../../b1-church/events/my-registrations) -- como os membros pagam saldos e editam registros
