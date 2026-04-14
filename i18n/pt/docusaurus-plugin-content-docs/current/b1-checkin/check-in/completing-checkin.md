---
title: "Completando Check-In"
---

# Completando Check-In

<div class="article-intro">

Depois que você revisou sua família e fez qualquer atribuição de grupo necessária, você está pronto para finalizar o check-in. Este é o último passo no fluxo de trabalho de quiosque -- o app envia presença, imprime etiquetas e reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Revise sua família](./household-review) na tela de revisão de família
- [Designe grupos](./group-assignment) para quaisquer membros da família que precisem se registrar em uma classe ou programa específico
- Opcionalmente [adicione quaisquer hóspedes](./adding-guests) que estejam visitando com sua família

</div>

## Como Fazer Check-In

1. Da **tela de revisão de família**, toque no botão **Check-in** na parte inferior da tela.
2. O app envia os dados de presença ao servidor e mostra uma **tela de sucesso** com uma marca de seleção verde e uma mensagem de boas-vindas.

É tudo que é preciso. A presença de sua família foi registrada.

## Impressão de Etiquetas

Se uma impressora de rede está configurada, o app automaticamente imprime etiquetas após check-in:

- **Etiquetas de nome** são impressas para cada pessoa que é designada a um grupo que tem a configuração **Print Nametag** ativada. Etiquetas de nome incluem o nome da pessoa, sua atribuição de grupo e informações de alergia/notas se qualquer uma estiver registrada.
- **Slips de retirada de pais** são impressos quando qualquer pessoa registrada está em um grupo que tem a configuração **Parent Pickup** ativada. O slip de retirada lista as crianças, suas atribuições de grupo e um código de segurança único de **4 caracteres**.

:::info
O mesmo código de segurança aparece tanto na etiqueta de nome da criança quanto no slip de retirada do pai. Na hora da retirada, voluntários comparam os códigos para verificar que o adulto correto está pegando cada criança.
:::

O código de segurança é gerado fresco para cada check-in e usa apenas consoantes e dígitos (vogais são excluídas para evitar formar palavras inadequadas).

:::warning
Se etiquetas não imprimem, abra Admin Settings tocando o **logo da iglesia** sete vezes, depois toque em **Change Printer** para verificar a conexão da impressora. Veja [Printer Setup](../getting-started/printer-setup) para passos de resolução de problemas.
:::

## O Que Acontece Após Check-In

- Se uma impressora está configurada, o app imprime todas as etiquetas e depois automaticamente retorna à **tela de pesquisa**, pronta para a próxima família.
- Se nenhuma impressora está configurada, a tela de sucesso exibe por alguns segundos e depois automaticamente retorna à **tela de pesquisa**.

Você não precisa tocar nada para voltar à tela de pesquisa -- o app manipula a transição automaticamente.

:::tip
O app reinicia completamente após cada check-in, então não há risco de uma família ver informações de outra família.
:::

## O Que É Registrado

Quando você toca em **Check-in**, o app envia o seguinte ao servidor para cada membro da família que tem uma atribuição de grupo:

- A **pessoa** sendo registrada
- O **serviço** que eles estão frequentando
- O **horário de serviço** e **grupo** ao qual eles são atribuídos

Este dado aparece no B1 Admin sob a seção de Attendance, onde os administradores de sua iglesia podem visualizar e gerenciar registros de presença. Veja o [guia de administração de check-in](../../b1-admin/attendance/check-in.md) para detalhes.
