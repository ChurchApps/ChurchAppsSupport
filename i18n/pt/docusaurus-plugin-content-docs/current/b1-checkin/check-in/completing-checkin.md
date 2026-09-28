---
title: "Completando Check-In"
---

# Completando Check-In

<div class="article-intro">

Depois de revisar sua família e fazer qualquer atribuição de grupo necessária, você está pronto para finalizar o check-in. Esta é a última etapa no fluxo de trabalho do quiosque -- o aplicativo envia presença, imprime rótulos e reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Revise sua família](./household-review) na tela de revisão da família
- [Atribua grupos](./group-assignment) a qualquer membro da família que precise fazer check-in em uma classe ou programa específico
- Opcionalmente [adicione quaisquer convidados](./adding-guests) que estejam visitando com sua família

</div>

## Como Fazer Check-In

1. Da **tela de revisão da família**, toque no botão **Check-In** na parte inferior da tela.
2. O aplicativo envia os dados de presença para o servidor e mostra uma **tela de sucesso** com uma marca de seleção verde e uma mensagem de boas-vindas.

É tudo o que é necessário. A presença de sua família foi registrada.

## Salas Cheias e Proporções de Voluntários

Se sua igreja configurou [limites de segurança](../../b1-admin/attendance/checkin-safety) em suas salas, o servidor as verifica antes de salvar:

- Se uma sala selecionada estiver **cheia ou fechada**, o check-in não passa e o aplicativo nomeia a sala para que você possa escolher uma diferente.
- Se uma sala de crianças estiver **com falta de voluntários** para sua proporção, o aplicativo mostra um aviso que um membro da equipe pode confirmar para continuar, ou bloqueia o check-in completamente -- dependendo de como sua igreja configurou a aplicação de proporção.

## Impressão de Rótulos

Se uma impressora de rede estiver configurada, o aplicativo imprime automaticamente rótulos após o check-in:

- **Rótulos de nome** são impressos para cada pessoa que é atribuída a um grupo que tem a configuração **Imprimir Etiqueta de Nome** ativada. Os rótulos de nome incluem o nome da pessoa, sua atribuição de grupo e informações de alergia/notas, se houver.
- **Comprovantes de retirada dos pais** são impressos quando qualquer pessoa verificada está em um grupo que tem a configuração **Retirada dos Pais** ativada. Pessoas verificadas como **Voluntário** são ignoradas, para que um trabalhador de cuidados infantis servindo em uma sala de Retirada dos Pais não receba um comprovante de retirada. O comprovante de retirada lista as crianças, suas atribuições de grupo e um **código de segurança único de 4 caracteres**.

:::info
O mesmo código de segurança aparece tanto no rótulo de nome da criança quanto no comprovante de retirada dos pais. No momento da retirada, os voluntários combinam os códigos para verificar que o adulto certo está pegando cada criança.
:::

O código de segurança é gerado fresco para cada check-in e usa apenas consoantes e dígitos (vogais são excluídas para evitar formar palavras impróprias).

:::warning
Se os rótulos não forem impressos, abra as Configurações de Admin tocando no **logotipo da igreja** sete vezes, depois toque em **Mudar Impressora** para verificar a conexão da impressora. Veja [Configuração de Impressora](../getting-started/printer-setup) para etapas de solução de problemas.
:::

## O Que Acontece Após Check-In

- Se uma impressora estiver configurada, o aplicativo imprime todos os rótulos e depois retorna automaticamente para a **tela de pesquisa**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, a tela de sucesso é exibida por alguns segundos e depois retorna automaticamente para a **tela de pesquisa**.

Você não precisa tocar em nada para voltar à tela de pesquisa -- o aplicativo lida com a transição automaticamente.

:::tip
O aplicativo reinicia completamente após cada check-in, então não há risco de uma família ver as informações de outra família.
:::

## O Que Fica Registrado

Quando você toca **Check-In**, o aplicativo envia o seguinte para o servidor para cada membro da família que tem uma atribuição de grupo:

- A **pessoa** fazendo check-in
- O **serviço** que estão assistindo
- A **hora do serviço** e **grupo** aos quais estão atribuídos

Esses dados aparecem no B1 Admin na seção Presença, onde os administradores de sua igreja podem visualizar e gerenciar registros de presença. Veja o [guia de administração de check-in](../../b1-admin/attendance/check-in.md) para detalhes.
