---
title: "Registros Pagos"
---

# Registros Pagos

<div class="article-intro">

O registro de eventos pode ir além de uma simples contagem de cabeças. Você pode definir tipos de participantes com preço (como Adulto e Criança), oferecer complementos opcionais com seus próprios preços e quantidades, criar códigos de desconto, e coletar pagamento no registro através do provedor de doações existente de sua igreja. Quando um evento se enche, uma lista de espera opcional mantém membros interessados na fila e os promove automaticamente conforme os lugares se abrem.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Habilite primeiro o registro no evento -- veja [Criando Calendários](creating-calendars#enabling-event-registration)
- Para coletar pagamentos, sua igreja precisa de [doações online configuradas](../donations/online-giving-setup.md) (Stripe, PayPal ou Kingdom Funding). Eventos gratuitos não precisam de configuração de doações.

</div>

## Abrindo Configurações de Registro

1. Em B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), escolha **Calendários > Registros** e abra seu evento (ou abra o evento do seu calendário).
2. O card **Configurações de Registro** mostra o básico -- **Habilitar Registro**, **Capacidade**, **Registro Abre/Fecha**, **Tags** e **Perguntas de Registro**.
3. Abaixo do básico estão três accordions: **Tipos de Participantes**, **Seleções** e **Códigos de Desconto**.

## Tipos de Participantes

Tipos de participantes permitem que você cobre preços diferentes para diferentes tipos de participantes -- e limita cada um separadamente.

1. Expanda o accordion **Tipos de Participantes** e clique em **Adicionar Tipo**.
2. Digite um **Nome** (ex: "Adulto", "Criança", "Estudante").
3. Defina um **Preço**. Use 0 para um tipo gratuito.
4. Opcionalmente defina uma **Capacidade** apenas para este tipo (ex: apenas 20 lugares de Criança). Deixe em branco para nenhum limite por tipo.
5. Clique em **Salvar**.

Durante o registro, cada participante escolhe um tipo; tipos esgotados são mostrados como **Esgotado** e não podem ser selecionados. O registro mostra o tipo de cada participante e contagens em execução por tipo.

## Seleções

Seleções são complementos opcionais com preço -- camisetas, planos de refeições, atualizações de atividades.

1. Expanda o accordion **Seleções** e clique em **Adicionar Seleção**.
2. Digite um **Nome**, **Descrição** opcional e um **Preço** (0 aparece como "Gratuito").
3. Opcionalmente defina uma **Capacidade** (total disponível em todos os registros) e uma **Qtd. Máx.** (o máximo que um registro pode pedir).
4. Clique em **Salvar**.

Os inscritos escolhem quantidades durante a inscrição, e os totais contam contra a capacidade para que você nunca venda acima.

## Códigos de Desconto

1. Expanda o accordion **Códigos de Desconto** e clique em **Adicionar Código de Desconto**.
2. Digite o **Código** que os inscritos digitarão.
3. Escolha o **Tipo** -- **Percentual** ou **Valor** -- e seu **Valor**.
4. Opcionalmente limite o código com uma **Data de Início** / **Data de Término**, um **Mín. de Membros** (número mínimo de participantes no registro), e **Máx. de Usos**.
5. Clique em **Salvar**.

Cada código mostra uma contagem de **Usos** para que você possa ver com que frequência ele foi resgatado. Os inscritos recebem feedback instantâneo quando aplicam um código -- incluindo mensagens claras quando um código expirou, não começou ou precisa de mais participantes.

## Lista de Espera

Ative **Habilitar Lista de Espera** no card de Configurações de Registro. Quando o evento atinge a capacidade:

- Novos inscritos recebem uma oferta de lugar na lista de espera em vez de serem rejeitados. Eles completam a mesma inscrição (pagamento é ignorado enquanto na lista de espera).
- Quando alguém cancela, o registro em lista de espera mais antigo é **promovido automaticamente** e recebe um email de que um lugar se abriu. Se eles devem um saldo, o email os vincula para completar o pagamento.
- Você pode promover alguém manualmente a qualquer momento com a ação **Promover** em uma linha em lista de espera -- útil após aumentar a capacidade do evento.

:::info
Registros promovidos ficam *pendentes* até que qualquer saldo seja pago; pagar (ou não ter nada a pagar) confirma-os.
:::

## O Registro de Registros

Abra um evento da página de Registros para ver cada registro. A tabela mostra **Nome**, **Membros**, **Tipo** (tipo de cada participante), **Pago / Total** (com um aviso de saldo quando dinheiro ainda é devido), **Status** e **Data**, mais chips de contagem por tipo acima da tabela.

- Clique no ícone de detalhes de uma linha para abrir o diálogo **Detalhes do Registro** -- membros, seleções, pago/saldo, e uma tabela **Pagamentos** listando cada cobrança (valor, método, data).
- **Exportar CSV** baixa o registro completo com colunas para membros, tipos de participantes, seleções, pago/total/saldo, status, e uma coluna por pergunta de registro.
- **Adicionar Participante** ainda permite que você registre inscrições offline manualmente.

:::info
Reembolsos não são processados dentro de B1. Se você precisar reembolsar um registro pago cancelado, emita o reembolso do painel de seu provedor de doações (ex: Stripe).
:::

## Como o Pagamento Funciona

Os pagamentos são executados através do mesmo gateway de doações que sua igreja já usa para doações -- os detalhes do cartão vão diretamente para o provedor e nunca tocam os servidores de B1. Os preços são sempre calculados no servidor a partir de seus tipos configurados, seleções e códigos de desconto, para que um inscrito não possa adulterar o total. Membros logados podem pagar com um cartão salvo; hóspedes inserem um cartão no checkout.

## Artigos Relacionados

- [Criando Calendários](creating-calendars#enabling-event-registration) -- habilite registro e as configurações básicas
- [Configuração de Doações Online](../donations/online-giving-setup.md) -- configure o gateway de pagamento usado no checkout
- [Registrando-se para Eventos](../../b1-church/events/registering) -- o que os membros veem quando se inscrevem
- [Meus Registros](../../b1-church/events/my-registrations) -- como os membros pagam saldos e editam registros
