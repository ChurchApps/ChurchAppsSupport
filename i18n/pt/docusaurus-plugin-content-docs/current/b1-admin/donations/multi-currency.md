---
title: "Suporte Multi-Moeda"
---

# Suporte Multi-Moeda

<div class="article-intro">

O recurso multi-moeda do B1 permite que sua igreja aceite e rastreie doações em diferentes moedas. Isso é particularmente útil para igrejas com membros internacionais, missionários ou múltiplas sedes em diferentes países.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar doações. Consulte [Funções e Permissões](../people/roles-permissions.md) para detalhes.
- Configure sua [doação online](./online-giving-setup.md) com Stripe, que suporta transações multi-moeda.
- Entenda as necessidades contábeis de sua igreja para lidar com múltiplas moedas.

</div>

## Habilitando Multi-Moeda

O suporte multi-moeda agora está ativado por padrão no B1. Depois de ativado:

- Os membros podem doar em sua moeda local ao fazer doações online
- Você pode registrar manualmente doações em qualquer moeda
- Os relatórios de doações mostram valores em sua moeda original
- Stripe lida com conversão de moeda automaticamente para doações online

## Moedas Suportadas

O sistema suporta todas as principais moedas mundiais, incluindo:

- **USD** -- Dólar Americano
- **EUR** -- Euro
- **GBP** -- Libra Esterlina
- **CAD** -- Dólar Canadense
- **AUD** -- Dólar Australiano
- **MXN** -- Peso Mexicano
- **BRL** -- Real Brasileiro
- **INR** -- Rupia Indiana
- **CNY** -- Yuan Chinês
- **JPY** -- Iene Japonês
- E muitos mais...

As moedas disponíveis para doação online dependem das moedas suportadas pela conta Stripe.

## Registrando Doações em Diferentes Moedas

### Doações Online

Quando um membro faz uma doação online através do Stripe:

1. Ele seleciona sua moeda preferida no checkout
2. Stripe processa o pagamento nessa moeda
3. A doação é registrada no B1 com o valor original da moeda
4. Stripe lida automaticamente com qualquer conversão de moeda necessária para a moeda padrão de sua conta

### Entrada Manual

Para registrar uma doação em dinheiro ou cheque em uma moeda diferente:

1. Navegue até **Doações** no B1 Admin
2. Clique em **Adicionar Doação**
3. Selecione a moeda no menu suspenso de moeda
4. Insira o valor nessa moeda
5. Conclua os detalhes restantes da doação
6. Clique em **Salvar**

## Visualizando Doações Multi-Moeda

### Relatórios de Doações

Os relatórios de doações exibem valores em sua moeda original:

- Os registros de doações individuais mostram o código de moeda (por exemplo, "$100,00 USD")
- Os totais são calculados por moeda
- Você pode filtrar por moedas específicas

### Totais Convertidos

Sempre que o B1 mostra um total combinado único -- os cartões de KPI de resumo de doações, um total de lote de doação e o total de um fundo -- doações registradas em uma moeda diferente da sua padrão são convertidas para sua moeda da igreja usando taxas de câmbio atuais, para que o total seja um número significativo único em vez de somar moedas diferentes juntas. Uma nota de **Convertido para as taxas de câmbio atuais** aparece sob o total sempre que uma conversão foi aplicada. Os itens de linha de doações individuais ainda são exibidos em sua moeda original.

### Declarações de Doações

Ao gerar declarações de doações:

- Cada doação aparece com sua moeda original
- Os totais são divididos por moeda
- Os membros veem exatamente o que doaram em cada moeda

## Integração Stripe

Para doação online, Stripe lida com transações multi-moeda:

- **Conversão automática** -- Stripe converte moedas para a moeda padrão de sua conta
- **Taxas de câmbio** -- Stripe usa taxas de câmbio de mercado atuais
- **Taxas** -- A conversão de moeda pode incorrer em taxas adicionais de Stripe
- **Moeda de pagamento** -- Os fundos são depositados na moeda padrão de sua conta

:::info
Verifique seu painel Stripe para ver as taxas de conversão atuais e quaisquer taxas associadas às transações multi-moeda.
:::

## Considerações Contábeis

Ao trabalhar com várias moedas:

- **Manutenção de registros** -- Mantenha o controle dos valores de doação originais e moedas para relatórios precisos
- **Taxas de câmbio** -- Observe que as taxas de conversão do Stripe podem diferir das taxas de seu banco
- **Recibos fiscais** -- Consulte seu contador sobre como relatar doações em diferentes moedas para fins fiscais
- **Alocação de fundos** -- Você pode alocar doações a fundos específicos independentemente da moeda

## Melhores Práticas

- **Moeda padrão** -- Defina sua moeda principal da igreja como a padrão para a maioria das transações
- **Comunicação clara** -- Diga aos doadores em que moeda estão doando durante o processo de checkout
- **Relatórios consistentes** -- Os totais combinados são sempre convertidos para sua moeda de igreja automaticamente; use o filtro de moeda por doação quando você precisar ver valores originais
- **Reconciliação regular** -- Reconcilie os pagamentos do Stripe com seus registros de doações, considerando as conversões de moeda

## Limitações

- A conversão de moeda para processamento de pagamento é tratada pelo Stripe apenas para doações online; doações manuais são registradas conforme inseridas sem conversão automática
- Relatórios históricos e itens de linha de doações individuais sempre mostram a moeda original em que a doação foi registrada
- Os totais combinados (cartões de KPI, totais de lote, totais de fundo) são convertidos para sua moeda de igreja usando taxas de câmbio atuais -- essas taxas podem diferir ligeiramente das taxas de seu banco ou Stripe no momento em que os fundos são liquidados

## Artigos Relacionados

- [Configuração de Doação Online](./online-giving-setup.md) -- Configure Stripe para aceitar doações
- [Registrando Doações](./recording-donations.md) -- Registre manualmente registros de doações
- [Relatórios de Doações](./donation-reports.md) -- Gere e visualize resumos de doações
- [Declarações de Doações](./giving-statements.md) -- Crie declarações de doações de final de ano
