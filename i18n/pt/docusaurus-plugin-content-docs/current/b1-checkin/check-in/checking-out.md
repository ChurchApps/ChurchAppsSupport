---
title: "Retirada de Crianças e Segurança Infantil"
---

# Retirada de Crianças e Segurança Infantil

<div class="article-intro">

A retirada completa o processo de entrada da criança: um responsável apresenta o código de segurança do seu rótulo de retirada, o quiosque verifica quem está pegando a criança, e as crianças são retiradas. Estações com atendentes também recebem ferramentas de segurança — verificação de retirada confiável, mensagens de página de responsável, reimpressão de rótulos de segurança e transmissão de emergência.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- A retirada está disponível em estações definidas no modo **manned** (atendidas) nas configurações de administração do quiosque
- As crianças devem ter sido [registradas](./completing-checkin) com um rótulo de retirada impresso contendo o código de segurança
- Páginas e transmissões de emergência exigem que sua igreja tenha um provedor de mensagens de texto conectado no B1 Admin

</div>

## Iniciando uma Retirada

1. Em uma estação atendida, toque em **Check Out** na tela de busca.
2. Digite o **código de segurança** de 4 caracteres do rótulo de retirada da família. Você pode digitá-lo, usar o teclado na tela ou escanear o código de barras do rótulo com um scanner USB ou Bluetooth — o código é enviado automaticamente assim que todos os 4 caracteres são inseridos.
3. O quiosque mostra as crianças registradas sob esse código.

## Verificando Quem Está Pegando a Criança

A tela de retirada pergunta quem está pegando as crianças:

- **Pessoas autorizadas para retirada** da família aparecem como cards tocáveis com sua foto e relacionamento — toque na pessoa na sua frente.
- **Adultos da família** também aparecem em uma grade de fotos.
- **Outro** permite digitar um nome para alguém que não está na lista.

Se um nome digitado corresponder a alguém marcado como **Não Autorizado** para essa família, o quiosque bloqueia a retirada com um aviso. Um membro da equipe pode escolher **Substituir** para prosseguir mesmo assim — a substituição é registrada no registro de presença com o nome da pessoa.

Após o responsável pela retirada ser confirmado, toque em retirada. O nome da pessoa que faz a retirada é armazenado com o registro de presença.

:::info
Pessoas autorizadas e não autorizadas para retirada são gerenciadas pela equipe da igreja na página de cada pessoa no B1 Admin — veja [Segurança de Entrada](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Chamando um Responsável

Precisa de um responsável durante o serviço — uma troca de fralda, uma criança chorando? Na tela de retirada em uma estação atendida, a equipe pode enviar uma **página**: uma mensagem de texto para os pais ou responsáveis da criança através do provedor de mensagens de texto da igreja. Pais que optaram por não receber textos ou não têm número de celular são pulados, e o quiosque mostra quantas mensagens foram enviadas.

## Reimprimir Rótulos

Se um crachá ou rótulo de retirada for perdido ou danificado, a equipe em uma estação atendida pode **reimprimir** os rótulos da família na tela de retirada depois de inserir o código de segurança. A reimpressão usa a mesma impressora e modelos de rótulos do registro original.

## Transmissão de Emergência

Em uma emergência, a equipe pode enviar uma mensagem de texto para os responsáveis de **todas as crianças registradas** para o serviço atual de uma vez:

1. Abra as **configurações de administração** do quiosque (7 toques rápidos no logotipo do cabeçalho, mais o PIN se um estiver definido).
2. Toque em **Emergency broadcast**.
3. Digite a mensagem e digite **EMERGENCY** no campo de confirmação — o botão **Send broadcast** permanece desativado até você fazer isso.
4. O quiosque relata quantos telefones receberam a mensagem e quantas pessoas foram puladas (optaram por não receber ou não têm número de celular).

:::warning
A transmissão vai para todas as famílias registradas para o serviço selecionado. Use-a para emergências genuínas — evacuações, bloqueios, condições climáticas severas.
:::

## Artigos Relacionados

- [Completando o Registro](./completing-checkin) — de onde vêm os códigos de segurança e rótulos de retirada
- [Segurança de Entrada](../../b1-admin/attendance/checkin-safety) — configurando capacidades, proporções, pessoas autorizadas para retirada e o requisito do provedor de mensagens de texto
- [Configuração da Impressora](../getting-started/printer-setup) — configuração da impressora de rótulos
