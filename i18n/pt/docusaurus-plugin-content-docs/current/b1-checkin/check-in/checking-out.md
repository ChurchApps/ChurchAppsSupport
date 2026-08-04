---
title: "Fazendo Check-Out e Segurança Infantil"
---

# Fazendo Check-Out e Segurança Infantil

<div class="article-intro">

O check-out fecha o ciclo do check-in infantil: um responsável apresenta o código de segurança da etiqueta de retirada, o quiosque verifica quem está fazendo a retirada e as crianças são liberadas. As estações com equipe também recebem ferramentas de segurança — verificação de retirada confiável, mensagens de chamada ao responsável, reimpressão de etiquetas de segurança e transmissão de emergência.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- O check-out está disponível em estações definidas para o modo **manned** (com equipe) nas configurações administrativas do quiosque
- As crianças precisam ter feito [check-in](./completing-checkin) com uma etiqueta de retirada impressa contendo o código de segurança
- A chamada de responsáveis e as transmissões de emergência exigem que sua igreja tenha um provedor de mensagens de texto conectado no B1 Admin

</div>

## Iniciando um Check-Out

1. Em uma estação com equipe, toque em **Check Out** na tela de busca.
2. Digite o **código de segurança** de 4 caracteres da etiqueta de retirada da família. Você pode digitá-lo, usar o teclado numérico na tela ou escanear o código de barras da etiqueta com um leitor USB ou Bluetooth — o código é enviado automaticamente assim que todos os 4 caracteres forem inseridos.
3. O quiosque mostra as crianças registradas sob aquele código.

## Verificando Quem Está Fazendo a Retirada

A tela de check-out pergunta quem está retirando as crianças:

- **Pessoas de retirada confiável** da família aparecem como cartões clicáveis com sua foto e relação — toque na pessoa que está à sua frente.
- **Adultos da família** também aparecem em uma grade de fotos.
- **Other** permite que você digite um nome para alguém que não está na lista.

Se um nome digitado corresponder a alguém marcado como **Not Authorized** para aquela família, o quiosque bloqueia o check-out com um aviso. Um membro da equipe pode escolher **Override** para prosseguir mesmo assim — a substituição é registrada no registro de frequência com o nome da pessoa.

Depois que a pessoa que faz a retirada é confirmada, toque em check-out. O nome da pessoa que fez a retirada é armazenado no registro de frequência.

:::info
As pessoas de retirada confiável e não autorizada são gerenciadas pela equipe da igreja na página de cada pessoa no B1 Admin — veja [Segurança no Check-In](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Chamando um Responsável

Precisa de um responsável durante o culto — uma troca de fralda, uma criança chorando? Na tela de check-out de uma estação com equipe, a equipe pode enviar uma **chamada**: uma mensagem de texto para os pais ou responsáveis da criança por meio do provedor de mensagens de texto da igreja. Os pais que optaram por não receber mensagens de texto ou que não têm número de celular registrado são ignorados, e o quiosque mostra quantas mensagens foram enviadas.

## Reimprimindo Etiquetas

Se uma etiqueta de identificação ou de retirada for perdida ou danificada, a equipe em uma estação com equipe pode **reimprimir** as etiquetas da família na tela de check-out, após digitar o código de segurança. A reimpressão usa a mesma impressora e os mesmos modelos de etiqueta do check-in original.

## Transmissão de Emergência

Em uma emergência, a equipe pode enviar mensagem de texto de uma vez para os responsáveis de **todas as crianças registradas** no culto atual:

1. Abra as **configurações administrativas** do quiosque (7 toques rápidos no logotipo do cabeçalho, mais o PIN, se houver um definido).
2. Toque em **Emergency broadcast**.
3. Digite a mensagem e, em seguida, digite **EMERGENCY** no campo de confirmação — o botão **Send broadcast** permanece desativado até que você faça isso.
4. O quiosque informa quantos celulares receberam a mensagem e quantas pessoas foram ignoradas (que optaram por não receber ou não têm número de celular).

:::warning
A transmissão vai para todas as famílias registradas no culto selecionado. Use-a apenas para emergências genuínas — evacuações, bloqueios (lockdowns), clima severo.
:::

## Artigos Relacionados

- [Concluindo o Check-In](./completing-checkin) — de onde vêm os códigos de segurança e as etiquetas de retirada
- [Segurança no Check-In](../../b1-admin/attendance/checkin-safety) — configuração de capacidades, proporções, pessoas de retirada e o requisito de provedor de mensagens de texto
- [Configuração da Impressora](../getting-started/printer-setup) — configuração da impressora de etiquetas
