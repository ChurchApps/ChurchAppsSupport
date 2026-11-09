---
title: "Suporte a múltiplas moedas"
description: "Registre e relate doações em diferentes moedas no B1 Admin, incluindo lançamento manual, doações online pelo Stripe e a conversão dos totais combinados."
---

# Suporte a múltiplas moedas

<div class="article-intro">

O recurso de múltiplas moedas do B1 permite que a sua igreja aceite e acompanhe doações em diferentes moedas. Isso é especialmente útil para igrejas com membros internacionais, missionários ou várias sedes em países diferentes.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de permissão para gerenciar doações. Veja [Funções e permissões](../people/roles-permissions.md) para detalhes.
- Configure suas [doações online](./online-giving-setup.md) com o Stripe, que oferece suporte a transações em várias moedas. Uma igreja sem doações online ainda pode escolher a moeda em que as doações lançadas manualmente são registradas.
- Entenda as necessidades contábeis da sua igreja para lidar com várias moedas.

</div>

A moeda da igreja começa como a moeda do país informado no cadastro da igreja (por exemplo, xelins quenianos para uma igreja no Quênia) e é usada enquanto nenhuma moeda tiver sido salva. Você pode alterá-la a qualquer momento em **Gerenciar igreja → Doações**. Se o seu país não for reconhecido, a moeda começa como dólar americano.

## Habilitando múltiplas moedas

O suporte a múltiplas moedas agora vem ativado por padrão no B1. Depois de ativado:

- Os membros podem doar na moeda local ao fazer doações online
- Você pode registrar manualmente doações em qualquer moeda
- Os relatórios de doações mostram os valores na moeda original
- O Stripe cuida automaticamente da conversão de moeda nas doações online

## Moedas suportadas

O sistema suporta as principais moedas do mundo, incluindo:

- **USD** -- Dólar americano
- **EUR** -- Euro
- **GBP** -- Libra esterlina
- **CAD** -- Dólar canadense
- **AUD** -- Dólar australiano
- **MXN** -- Peso mexicano
- **BRL** -- Real brasileiro
- **INR** -- Rupia indiana
- **CNY** -- Yuan chinês
- **JPY** -- Iene japonês
- E muitas outras...

As moedas disponíveis para doações online dependem das moedas suportadas pela sua conta do Stripe.

## Registrando doações em diferentes moedas

### Doações online

Quando um membro doa online pelo Stripe:

1. Ele seleciona a moeda de sua preferência no checkout
2. O Stripe processa o pagamento nessa moeda
3. A doação é registrada no B1 com o valor na moeda original
4. O Stripe faz automaticamente qualquer conversão necessária para a moeda padrão da sua conta

### Lançamento manual

Doações em dinheiro e cheques que você lança manualmente são registradas na moeda da sua igreja -- a **Moeda** definida em **Configurações > Doações** (veja [Definindo a moeda da igreja](./online-giving-setup.md#choosing-your-currency)). Não há escolha de moeda por doação. O campo **Valor** mostra o código da moeda no fim (por exemplo, *PHP*), para que você saiba em qual moeda está digitando.

1. Acesse **Doações > Lotes** no B1 Admin e abra o lote
2. Clique em **Adicionar doação** no topo da página do lote
3. Digite o valor na moeda da sua igreja
4. Preencha o restante dos dados da doação
5. Clique em **Salvar**

Editar uma doação existente mantém a moeda em que ela foi registrada originalmente.

## Visualizando doações em múltiplas moedas

### Relatórios de doações

Os relatórios de doações mostram os valores na moeda original:

- Os registros individuais de doação mostram o código da moeda (por exemplo, "$100,00 USD")
- Os totais são calculados por moeda
- Você pode filtrar por moedas específicas

### Totais convertidos {#converted-totals}

Sempre que o B1 mostrar um único total combinado -- os cartões de indicadores do resumo de doações, o total de um lote de doações e o total de um fundo --, as doações registradas em uma moeda diferente da padrão da igreja são convertidas para a moeda da igreja pelas taxas de câmbio atuais. Assim, o total é um número único e significativo, e não uma soma de moedas diferentes. Uma observação **Convertido às taxas de câmbio atuais** aparece abaixo do total sempre que uma conversão foi aplicada. Os itens individuais de doação continuam exibidos na moeda original.

### Extratos de doações

Ao gerar os extratos de doações:

- Cada doação aparece na sua moeda original
- Os totais são separados por moeda
- Os membros veem exatamente o que doaram em cada moeda

## Integração com o Stripe

Nas doações online, o Stripe cuida das transações em várias moedas:

- **Conversão automática** -- O Stripe converte as moedas para a moeda padrão da sua conta
- **Taxas de câmbio** -- O Stripe usa as taxas de câmbio de mercado atuais
- **Taxas** -- A conversão de moeda pode gerar taxas adicionais do Stripe
- **Moeda de repasse** -- Os valores são depositados na moeda padrão da sua conta

:::info
Confira o painel do Stripe para ver as taxas de conversão atuais e quaisquer taxas associadas às transações em várias moedas.
:::

## Considerações contábeis

Ao trabalhar com várias moedas:

- **Registros** -- Mantenha o controle dos valores e das moedas originais das doações para relatórios precisos
- **Taxas de câmbio** -- Lembre-se de que as taxas de conversão do Stripe podem diferir das taxas do seu banco
- **Recibos fiscais** -- Consulte seu contador sobre como informar doações em diferentes moedas para fins fiscais
- **Alocação em fundos** -- Você pode alocar doações a fundos específicos independentemente da moeda

## Boas práticas

- **Moeda padrão** -- Defina a moeda principal da igreja em **Configurações > Doações**, para que as doações lançadas manualmente e os totais usem essa moeda
- **Comunicação clara** -- Informe aos doadores em qual moeda estão doando durante o checkout
- **Relatórios consistentes** -- Os totais combinados são sempre convertidos automaticamente para a moeda da igreja; use o filtro de moeda por doação quando precisar ver os valores originais
- **Conciliação regular** -- Concilie os repasses do Stripe com os seus registros de doações, considerando as conversões de moeda

## Limitações

- A conversão de moeda no processamento de pagamentos é feita pelo Stripe, e apenas para doações online; as doações manuais são registradas como digitadas, sem conversão automática
- Relatórios históricos e itens individuais de doação sempre mostram a moeda original em que a doação foi registrada
- Os totais combinados (cartões de indicadores, totais de lotes e de fundos) são convertidos para a moeda da igreja pelas taxas de câmbio atuais -- essas taxas podem diferir um pouco das taxas do seu banco ou do Stripe no momento em que os valores são liquidados

## Artigos relacionados

- [Configuração de doações online](./online-giving-setup.md) -- Configure o Stripe para aceitar doações
- [Registrando doações](./recording-donations.md) -- Lance registros de doações manualmente
- [Relatórios de doações](./donation-reports.md) -- Gere e visualize resumos de doações
- [Extratos de doações](./giving-statements.md) -- Crie extratos anuais de doações
