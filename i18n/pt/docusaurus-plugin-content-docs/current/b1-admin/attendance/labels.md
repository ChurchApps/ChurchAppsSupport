---
title: "Designer de Rótulos de Check-In"
---

# Designer de Rótulos de Check-In

<div class="article-intro">

O Designer de Rótulos permite criar e personalizar os modelos de crachás e comprovantes de retirada que são impressos quando as famílias checam seus filhos. Você pode controlar exatamente quais informações aparecem em cada rótulo, onde é posicionado e como se parece.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure [Attendance](setup) e configure pelo menos um horário de serviço com check-in ativado
- Configure [Check-In](check-in) para que os rótulos sejam impressos
- Você precisa ter acesso administrativo à seção Attendance

</div>

## Abrindo o Designer de Rótulos

Em B1 Admin, acesse **Attendance** na barra lateral esquerda e selecione **Rótulos**. Você verá uma lista de seus modelos de rótulos salvos, separados por tipo: **Crachá** e **Comprovante de Retirada**.

## Tipos de Rótulos

- **Crachá** — Impresso e anexado à criança. Normalmente inclui o nome da criança, sua sala de aula/sessão e um código de segurança.
- **Comprovante de Retirada** — Dado aos pais ou responsáveis. Normalmente inclui o código de segurança e uma lista das crianças que eles checaram.

B1 começa com um modelo de crachá padrão e um modelo de comprovante de retirada padrão dimensionado para rótulos térmicos padrão de 3,5 × 1,1 polegadas.

## Criando um Modelo de Rótulo

1. Clique em **Adicionar Crachá** ou **Adicionar Comprovante de Retirada** (ou use o menu suspenso para escolher).
2. Um novo modelo abre no editor de rótulos.

### Editor de Rótulos

O editor mostra uma visualização em escala do rótulo no tamanho configurado. Ao longo do painel esquerdo você pode configurar:

- **Nome** — o nome do modelo (apenas para sua referência)
- **Tipo de Rótulo** — Crachá ou Comprovante de Retirada
- **Largura / Altura** — tamanho do rótulo em polegadas

### Adicionando Blocos

Um rótulo é construído a partir de blocos — peças individuais de conteúdo posicionadas na tela do rótulo. Clique em **Adicionar Bloco** para inserir um novo bloco e escolha seu tipo:

- **Campo** — puxa um valor de dados no momento da impressão:
  - `person.displayName` — o nome completo da pessoa
  - `sessions` — o serviço/sala de aula para o qual foram checados
  - `securityCode` — o código de segurança de retirada gerado aleatoriamente
  - `children` — lista de crianças (para comprovantes de retirada)
  - `person.nametagNotes` — quaisquer notas especiais no registro da pessoa
  - `campus` — o nome do campus
- **Texto** — texto estático que você digita (para títulos, rótulos ou instruções)
- **Código de Barras** — um código de barras codificando o código de segurança

### Posicionando Blocos

Cada bloco tem campos **X**, **Y**, **Largura** e **Altura** expressos como porcentagens da tela do rótulo (0–100). Ajuste esses para posicionar o conteúdo com precisão. Você também pode definir:

- **Tamanho da Fonte** — tamanho do texto em pontos
- **Negrito** — alternar texto em negrito
- **Alinhar** — alinhamento de texto esquerdo, central ou direito
- **Condição** — opcionalmente ocultar o bloco se um campo estiver vazio (por exemplo, mostrar apenas nametagNotes se tiver um valor)

### Salvando

Clique em **Salvar** para salvar o modelo. O modelo atualizado será usado na próxima vez que os rótulos forem impressos em B1 Checkin.

## Reordenando Modelos

Se você tiver vários modelos de crachá ou comprovante de retirada, B1 Checkin usará o primeiro modelo da lista por padrão. Arraste os modelos para reordená-los.

## Excluindo um Modelo

Clique no ícone de exclusão em qualquer linha de modelo e confirme. Excluir o último modelo de um tipo restaura o modelo integrado padrão.

:::tip
Faça uma impressão de teste após editar um modelo para confirmar que o layout parece certo antes de seu próximo serviço.
:::

## Artigos Relacionados

- [Configuração de Check-In](setup) — Configure serviços e grupos para check-in
- [Completando Check-In](check-in) — O fluxo de check-in para famílias
- [B1 Checkin Introdução](../../b1-checkin/getting-started/index) — O aplicativo de quiosque Checkin
