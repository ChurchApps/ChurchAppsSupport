---
title: "Concluindo o Check-in"
---

# Concluindo o Check-in

<div class="article-intro">

Depois de revisar sua família e fazer as atribuições de grupo necessárias, você está pronto para finalizar o check-in. Esta é a última etapa do fluxo do quiosque — o aplicativo envia a presença, imprime as etiquetas e se reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- [Revise sua família](./household-review) na tela de revisão da família
- [Atribua grupos](./group-assignment) aos membros da família que precisam entrar em uma turma ou programa específico
- Opcionalmente, [adicione visitantes](./adding-guests) que estão acompanhando sua família

</div>

## Como fazer o check-in

1. Na **tela de revisão da família**, toque no botão **Check-in** na parte inferior da tela.
2. O aplicativo envia os dados de presença ao servidor e exibe uma **tela de sucesso** com um visto verde e uma mensagem de boas-vindas.

É só isso. A presença da sua família já foi registrada.

## Salas lotadas e proporção de voluntários

Se a sua igreja tiver configurado [limites de segurança](../../b1-admin/attendance/checkin-safety) nas salas, o servidor os verifica antes de salvar:

- Se uma sala selecionada estiver **lotada ou fechada**, o check-in não é concluído e o aplicativo informa o nome da sala para que você escolha outra.
- Se o horário de culto tiver um [cronograma de check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) e a janela de check-in dele não estiver aberta neste momento, o check-in nas salas desse horário também é recusado. A tela **Não é possível fazer check-in ainda** lista a sala com o motivo "o check-in não está aberto no momento"; toque em **Trocar salas** para escolher outro horário de culto ou grupo. (Horários de culto que já estão encerrados quando você [seleciona um culto](./selecting-service#when-check-in-isnt-open) ficam ocultos, então você normalmente só verá isso se uma janela fechar durante um check-in.)
- Se uma sala infantil estiver **com falta de voluntários** para a proporção definida, o aplicativo mostra um aviso que um membro da equipe pode confirmar para prosseguir, ou bloqueia o check-in por completo — dependendo de como a sua igreja configurou a aplicação da proporção.

## Impressão de etiquetas

Se uma impressora de rede estiver configurada, o aplicativo imprime as etiquetas automaticamente após o check-in:

- **Etiquetas de nome** são impressas para cada pessoa atribuída a um grupo que tenha a configuração **Imprimir crachá** ativada. As etiquetas incluem o nome da pessoa, a atribuição de grupo e as informações de alergias ou observações, se houver algo cadastrado.
- **Comprovantes de retirada pelos pais** são impressos quando qualquer pessoa com check-in está em um grupo que tenha a configuração **Retirada pelos pais** ativada. Pessoas com check-in como **Voluntário** são ignoradas, então um trabalhador da creche que serve em uma sala de Retirada pelos pais não recebe comprovante. O comprovante lista as crianças, as atribuições de grupo delas e um **código de segurança de 4 caracteres** exclusivo.

:::info
O mesmo código de segurança aparece na etiqueta de nome da criança e no comprovante de retirada dos pais. Na hora da retirada, os voluntários comparam os códigos para confirmar que o adulto certo está buscando cada criança.
:::

O código de segurança é gerado novamente a cada check-in e usa apenas consoantes e dígitos (as vogais são excluídas para não formar palavras inadequadas).

:::warning
Se as etiquetas não forem impressas, abra as Configurações do Administrador tocando **no logotipo da igreja** sete vezes e depois toque em **Trocar impressora** para verificar a conexão com a impressora. Veja [Configuração da Impressora](../getting-started/printer-setup) para as etapas de solução de problemas.
:::

## O que acontece depois do check-in

- Se uma impressora estiver configurada, o aplicativo imprime todas as etiquetas e depois volta automaticamente para a **tela de busca**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, a tela de sucesso aparece por alguns segundos e depois volta automaticamente para a **tela de busca**.

Você não precisa tocar em nada para voltar à tela de busca — o aplicativo faz a transição automaticamente.

:::tip
O aplicativo é totalmente reiniciado após cada check-in, então não há risco de uma família ver as informações de outra.
:::

## O que é registrado

Quando você toca em **Check-in**, o aplicativo envia o seguinte ao servidor para cada membro da família que tenha uma atribuição de grupo:

- A **pessoa** que está fazendo o check-in
- O **culto** que ela está frequentando
- O **horário de culto** e o **grupo** aos quais ela está atribuída

Esses dados aparecem no B1 Admin, na seção de Presença, onde os administradores da sua igreja podem visualizar e gerenciar os registros de presença. Veja o [guia de administração do check-in](../../b1-admin/attendance/check-in.md) para mais detalhes.
