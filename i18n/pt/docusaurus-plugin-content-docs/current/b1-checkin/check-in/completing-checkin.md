---
title: "Concluindo o Check-In"
---

# Concluindo o Check-In

<div class="article-intro">

Depois de revisar seu domicílio e fazer as atribuições de grupo necessárias, você está pronto para finalizar o check-in. Esta é a última etapa no fluxo do quiosque -- o aplicativo envia a presença, imprime etiquetas e reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Revise seu domicílio](./household-review) na tela de revisão do domicílio
- [Atribua grupos](./group-assignment) a quaisquer membros da família que precisem fazer check-in em uma classe ou programa específico
- Opcionalmente [adicione visitantes](./adding-guests) que estejam visitando com sua família

</div>

## Como Fazer o Check-In

1. Na **tela de revisão do domicílio**, toque no botão **Check-in** na parte inferior da tela.
2. O aplicativo envia os dados de presença ao servidor e exibe uma **tela de sucesso** com uma marca de verificação verde e uma mensagem de boas-vindas.

É só isso. A presença da sua família foi registrada.

## Impressão de Etiquetas

Se uma impressora de rede estiver configurada, o aplicativo imprime etiquetas automaticamente após o check-in:

- **Etiquetas de nome** são impressas para cada pessoa atribuída a um grupo que tenha a configuração **Imprimir Crachá** habilitada. As etiquetas de nome incluem o nome da pessoa, sua atribuição de grupo e informações sobre alergias/observações, se houver no cadastro.
- **Comprovantes de retirada para os pais** são impressos quando qualquer pessoa com check-in está em um grupo que tenha a configuração **Retirada pelos Pais** habilitada. O comprovante de retirada lista as crianças, suas atribuições de grupo e um **código de segurança de 4 caracteres** exclusivo.

:::info
O mesmo código de segurança aparece tanto na etiqueta de nome da criança quanto no comprovante de retirada dos pais. No momento da retirada, os voluntários conferem os códigos para verificar se o adulto correto está retirando cada criança.
:::

O código de segurança é gerado novamente a cada check-in e usa apenas consoantes e dígitos (vogais são excluídas para evitar a formação de palavras inapropriadas).

:::warning
Se as etiquetas não forem impressas, verifique a barra de status da impressora no topo da tela. Você pode tocá-la para acessar as configurações da impressora e verificar a conexão. Consulte [Configuração da Impressora](../getting-started/printer-setup) para instruções de solução de problemas.
:::

## O Que Acontece Após o Check-In

- Se uma impressora estiver configurada, o aplicativo imprime todas as etiquetas e então retorna automaticamente à **tela de busca**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, a tela de sucesso é exibida por alguns segundos e então retorna automaticamente à **tela de busca**.

Você não precisa tocar em nada para voltar à tela de busca -- o aplicativo gerencia a transição automaticamente.

:::tip
O aplicativo reinicia completamente após cada check-in, portanto não há risco de uma família ver as informações de outra família.
:::

## O Que É Registrado

Quando você toca em **Check-in**, o aplicativo envia o seguinte ao servidor para cada membro do domicílio que tenha uma atribuição de grupo:

- A **pessoa** que está fazendo check-in
- O **culto** que ela está frequentando
- O **horário do culto** e o **grupo** ao qual está atribuída

Esses dados aparecem no B1 Admin na seção de Presença, onde os administradores da sua igreja podem visualizar e gerenciar os registros de presença. Consulte o [guia de administração de check-in](../../b1-admin/attendance/check-in.md) para detalhes.
