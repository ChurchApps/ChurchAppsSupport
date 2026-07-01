---
title: "Designer de Rótulos de Check-In"
---

# Designer de Rótulos de Check-In

<div class="article-intro">

O Designer de Rótulos permite que você crie e personalize os modelos de etiquetas de nomes e listas de retirada que são impressos quando as famílias fazem check-in de seus filhos. Você pode controlar exatamente quais informações aparecem em cada rótulo, onde ele está posicionado e como ele se parece.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure [Attendance](setup) e configure pelo menos um horário de serviço com check-in habilitado
- Configure [Check-In](check-in) para que os rótulos sejam impressos
- Você precisa ter acesso administrativo à seção Attendance

</div>

## Abrindo o Designer de Rótulos

Em B1 Admin, acesse **Attendance** na barra lateral esquerda e selecione **Labels**. Você verá uma lista de seus modelos de rótulo salvos, separados por tipo: **Nametag** e **Pickup Slip**.

## Tipos de Rótulo

- **Nametag** — impresso e fixado na criança. Normalmente inclui o nome da criança, sua sala de aula/sessão e um código de segurança.
- **Pickup Slip** — dado ao pai ou responsável. Normalmente inclui o código de segurança e uma lista das crianças que fizeram check-in.

B1 começa com um modelo de nametag padrão e um modelo de pickup slip padrão dimensionados para rótulos térmicos padrão de 3,5 × 1,1 polegadas.

## Criando um Modelo de Rótulo

1. Clique em **Add Nametag** ou **Add Pickup Slip** (ou use o menu suspenso para escolher).
2. Um novo modelo abre no editor de rótulos.

### Editor de Rótulo

O editor mostra uma visualização em escala do rótulo no tamanho configurado. No painel esquerdo, você pode configurar:

- **Name** — o nome do modelo (apenas para sua referência)
- **Label Type** — Nametag ou Pickup Slip
- **Width / Height** — tamanho do rótulo em polegadas

### Adicionando Blocos

Um rótulo é construído a partir de blocos — partes individuais de conteúdo posicionadas na tela do rótulo. Clique em **Add Block** para inserir um novo bloco e escolha seu tipo:

- **Field** — obtém um valor de dados no momento da impressão:
  - `person.displayName` — o nome completo da pessoa
  - `sessions` — o serviço/sala de aula que fizeram check-in
  - `securityCode` — o código de segurança de retirada gerado aleatoriamente
  - `children` — lista de crianças (para listas de retirada)
  - `person.nametagNotes` — quaisquer notas especiais no registro da pessoa
  - `campus` — o nome do campus
- **Text** — texto estático que você digita (para títulos, rótulos ou instruções)
- **Barcode** — um código de barras codificando o código de segurança

### Posicionando Blocos

Cada bloco tem campos **X**, **Y**, **Width** e **Height** expressos como porcentagens da tela do rótulo (0–100). Ajuste-os para posicionar o conteúdo com precisão. Você também pode configurar:

- **Font Size** — tamanho do texto em pontos
- **Bold** — ativar/desativar texto em negrito
- **Align** — alinhamento de texto à esquerda, centro ou direita
- **Condition** — opcionalmente ocultar o bloco se um campo estiver vazio (por exemplo, mostrar nametagNotes apenas se tiver um valor)

### Salvando

Clique em **Save** para salvar o modelo. O modelo atualizado será usado na próxima vez que os rótulos forem impressos em B1 Checkin.

## Reorganizando Modelos

Se você tiver vários modelos de nametag ou pickup slip, B1 Checkin usará o primeiro modelo da lista por padrão. Arraste os modelos para reorganizá-los.

## Deletando um Modelo

Clique no ícone de exclusão em qualquer linha de modelo e confirme. Deletar o último modelo de um tipo restaura o modelo integrado padrão.

:::tip
Faça uma impressão de teste após editar um modelo para confirmar que o layout se parece correto antes de seu próximo serviço.
:::

## Artigos Relacionados

- [Check-In Setup](setup) — configure serviços e grupos para check-in
- [Completando Check-In](check-in) — o fluxo de check-in para famílias
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — o aplicativo Checkin kiosk
