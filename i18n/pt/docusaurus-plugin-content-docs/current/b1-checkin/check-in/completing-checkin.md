---
title: "Concluindo o check-in"
---

# Concluindo o check-in

<div class="article-intro">

Depois de revisar sua família e fazer as atribuições de grupo necessárias, você está pronto para finalizar o check-in. Esta é a última etapa do fluxo do quiosque: o aplicativo envia a presença, imprime as etiquetas e se reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- [Revise sua família](./household-review) na tela de revisão da família
- [Atribua grupos](./group-assignment) aos membros da família que precisam fazer check-in em uma classe ou programa específico
- Opcionalmente, [adicione os visitantes](./adding-guests) que estão com a sua família

</div>

## Como fazer o check-in

1. Na **tela de revisão da família**, toque no botão **Check-in** na parte inferior da tela.
2. O aplicativo envia os dados de presença ao servidor e mostra uma **tela de sucesso** com um checkmark verde e uma mensagem de boas-vindas.

É só isso. A presença da sua família foi registrada.

## Salas lotadas e proporção de voluntários

Se a sua igreja configurou [limites de segurança](../../b1-admin/attendance/checkin-safety) nas salas, o servidor os verifica antes de salvar:

- Se uma sala selecionada estiver **lotada ou fechada**, o check-in não é concluído, e o aplicativo informa o nome da sala para que você escolha outra.
- Se o horário de culto tiver uma [programação de check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) e a janela de check-in não estiver aberta neste momento, o check-in nas salas desse horário também é recusado. A tela **Não é possível fazer check-in ainda** lista a sala com o motivo "o check-in não está aberto neste momento"; toque em **Trocar salas** para escolher outro horário de culto ou outro grupo. (Horários de culto que já estão encerrados aparecem como **Encerrado** na [tela da família](./household-review) e não podem ser escolhidos, por isso você normalmente só verá isso se uma janela for fechada durante um check-in.)
- Uma família que fez check-in em um horário de culto anterior pode voltar mais tarde e adicionar um horário de culto aberto, mesmo depois que a janela anterior tiver fechado. Os check-ins existentes são mantidos e não fazem o novo check-in ser recusado.
- Se uma sala infantil estiver **com falta de voluntários** para a proporção definida, o aplicativo mostra um aviso que um membro da equipe pode confirmar para prosseguir, ou bloqueia o check-in por completo, dependendo de como a sua igreja configurou a aplicação da proporção.

## Impressão de etiquetas

Se uma impressora de rede estiver configurada, o aplicativo imprime as etiquetas automaticamente após o check-in:

- **Etiquetas de nome** são impressas para cada pessoa atribuída a um grupo com a configuração **Imprimir crachá** ativada. As etiquetas de nome incluem o nome da pessoa, a atribuição de grupo e as informações de alergia ou observações, se houver algum registro.
- **Comprovantes de retirada dos pais** são impressos quando qualquer pessoa com check-in está em um grupo com a configuração **Retirada pelos pais** ativada. Pessoas com check-in como **Voluntário** são ignoradas, então um profissional de creche que atua em uma sala de Retirada pelos pais não recebe comprovante. O comprovante lista as crianças, as atribuições de grupo delas e um **código de segurança de 4 caracteres** exclusivo.

:::info
O mesmo código de segurança aparece na etiqueta de nome da criança e no comprovante de retirada dos pais. No momento da retirada, os voluntários comparam os códigos para verificar se o adulto correto está buscando cada criança.
:::

O código de segurança é gerado novamente a cada check-in e usa apenas consoantes e dígitos (as vogais são excluídas para evitar a formação de palavras inadequadas).

:::warning
Se as etiquetas não forem impressas, abra as Configurações do administrador tocando sete vezes no **logotipo da igreja** e depois toque em **Trocar impressora** para verificar a conexão com a impressora. Consulte [Configuração da impressora](../getting-started/printer-setup) para ver os passos de solução de problemas.
:::

## O que acontece após o check-in

- Se uma impressora estiver configurada, o aplicativo imprime todas as etiquetas e depois retorna automaticamente à **tela de busca**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, o aplicativo também retorna automaticamente à **tela de busca**.

Em ambos os casos, a tela de sucesso permanece por pelo menos 6 segundos a partir do momento em que aparece (8 segundos quando está comemorando o marco de presença de alguém), para que as famílias vejam que o check-in funcionou. Se a impressão demorar mais que isso, o aplicativo retorna cerca de um segundo e meio após o término da impressão.

Você não precisa tocar em nada para voltar à tela de busca: o aplicativo faz a transição automaticamente. Depois que a tela estiver aberta por um momento, você pode tocar nela para voltar imediatamente. Um toque nos primeiros um segundo e meio é ignorado, então um toque duplo rápido em **Check-in** não pula a tela.

:::tip
O aplicativo é totalmente reiniciado após cada check-in, por isso não há risco de uma família ver as informações de outra.
:::

## O que é registrado

Quando você toca em **Check-in**, o aplicativo envia o seguinte ao servidor para cada membro da família que tenha uma atribuição de grupo:

- A **pessoa** que está fazendo check-in
- O **serviço** do qual ela participa
- O **horário de culto** e o **grupo** aos quais ela está atribuída

Esses dados aparecem no B1 Admin, na seção Presença, onde os administradores da igreja podem visualizar e gerenciar os registros de presença. Consulte o [guia de administração do check-in](../../b1-admin/attendance/check-in.md) para mais detalhes.
