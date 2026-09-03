---
title: "Designer de Etiquetas de Check-In"
---

# Designer de Etiquetas de Check-In

<div class="article-intro">

O Designer de Etiquetas permite que você crie e personalize os modelos de crachá de nomeação e de etiqueta de retirada que são impressos quando as famílias fazem check-in de seus filhos. Você pode controlar exatamente quais informações aparecem em cada etiqueta, onde fica posicionada e como se parece.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Configure [Presença](setup) e configure pelo menos um horário de serviço com check-in ativado
- Configure [Check-In](check-in) para que as etiquetas sejam impressas
- Você precisa de acesso administrativo à seção Presença

</div>

## Abrindo o Designer de Etiquetas

No B1 Admin, clique no **menu de seção** no canto superior esquerdo (o nome da seção atual com a pequena seta ao lado) e escolha **Móvel**. Na barra de navegação, selecione **B1 CheckIn** e clique no botão **Design de Etiquetas** no cartão Etiquetas de Check-in. Você verá uma lista de seus modelos de etiqueta salvos, separados por tipo: **Crachá de Nomeação** e **Etiqueta de Retirada**.

## Tipos de etiqueta

- **Crachá de nomeação** — impresso e fixado na criança. Normalmente inclui o nome da criança, sua sala de aula/sessão e um código de segurança.
- **Etiqueta de retirada** — entregue ao pai ou responsável. Normalmente inclui o código de segurança e uma lista dos filhos que eles retiraram.

B1 começa com um modelo padrão de crachá de nomeação e um modelo padrão de etiqueta de retirada dimensionado para etiquetas térmicas padrão de 3,5 × 1,1 polegadas.

## Criando um modelo de etiqueta

1. Clique em **Adicionar crachá de nomeação** ou **Adicionar etiqueta de retirada** (ou use o menu suspenso para escolher).
2. Um novo modelo abre no editor de etiqueta.

### Editor de Etiqueta

O editor mostra uma visualização em escala da etiqueta no tamanho configurado. No painel esquerdo, você pode configurar:

- **Nome** — o nome do modelo (apenas para sua referência)
- **Tipo de Etiqueta** — Crachá de nomeação ou Etiqueta de retirada
- **Largura / Altura** — tamanho da etiqueta em polegadas

### Adicionando blocos

Uma etiqueta é construída a partir de blocos — peças individuais de conteúdo posicionadas na tela da etiqueta. Clique em **Adicionar bloco** para inserir um novo bloco e escolha seu tipo:

- **Campo** — extrai um valor de dados no momento da impressão:
  - `person.displayName` — o nome completo da pessoa
  - `sessions` — o serviço/sala de aula em que ele se registrou
  - `securityCode` — o código de segurança de retirada gerado aleatoriamente
  - `children` — lista de crianças (para etiquetas de retirada)
  - `person.nametagNotes` — quaisquer notas especiais no registro da pessoa
  - `campus` — o nome do campus
- **Texto** — texto estático que você digita (para títulos, rótulos ou instruções)
- **Código de barras** — um código de barras codificando o código de segurança

### Posicionando blocos

Cada bloco tem campos **X**, **Y**, **Largura** e **Altura** expressos como percentuais da tela da etiqueta (0–100). Ajuste estes para posicionar o conteúdo com precisão. Você também pode definir:

- **Tamanho da fonte** — tamanho do texto em pontos
- **Negrito** — alternar texto em negrito
- **Alinhamento** — alinhamento de texto esquerdo, centro ou direito
- **Condição** — opcionalmente ocultar o bloco se um campo estiver vazio (por exemplo, mostrar apenas nametagNotes se tiver um valor)

### Salvando

Clique em **Salvar** para salvar o modelo. O modelo atualizado será usado da próxima vez que as etiquetas forem impressas no B1 Checkin.

## Reordenando modelos

Se você tiver vários modelos de crachá de nomeação ou etiqueta de retirada, B1 Checkin usará o primeiro modelo da lista por padrão. Arraste modelos para reordená-los.

## Deletando um modelo

Clique no ícone de exclusão em qualquer linha de modelo e confirme. Excluir o último modelo de um tipo restaura o modelo integrado padrão.

:::tip
Faça um teste de impressão após editar um modelo para confirmar que o layout fica correto antes de seu próximo serviço.
:::

## Artigos relacionados

- [Configuração de Check-In](setup) — configurar serviços e grupos para check-in
- [Completando Check-In](check-in) — o fluxo de check-in para famílias
- [B1 Checkin Guia de Introdução](../../b1-checkin/getting-started/) — o app quiosque Checkin
