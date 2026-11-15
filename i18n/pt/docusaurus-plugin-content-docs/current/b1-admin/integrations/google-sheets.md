---
title: "Google Sheets"
description: "Conecte o B1 Admin ao Google Sheets com o complemento B1 Export para trazer Pessoas, Doações, Grupos e Presença para abas da planilha, sob demanda."
---

# Google Sheets

<div class="article-intro">

O **B1 Export** é o complemento oficial do Google Sheets para o B1.church. Ele adiciona uma barra lateral a qualquer planilha e exporta Pessoas, Doações, Grupos ou Presença da sua igreja no B1 para abas com nome -- sob demanda, com um clique. O complemento funciona inteiramente dentro da conta Google do usuário; além das chamadas de API somente leitura que cada exportação faz, ele não interage com os servidores da ChurchApps.

</div>

:::caution Ainda não disponível
O complemento B1 Export ainda não foi publicado no Google Workspace Marketplace, então você não pode instalá-lo hoje. Até lá, exporte as pessoas do B1Admin (veja [Exportação de dados](../people/exporting-data.md)) e importe o CSV no Google Sheets. Tudo o que está abaixo descreve como o complemento funcionará depois do lançamento.
:::

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta Google com acesso de edição à planilha em que você deseja exportar
- Um administrador da igreja (ou alguém com acesso de leitura aos dados que você deseja exportar) capaz de criar uma chave de API do B1
- O complemento B1 Export instalado pelo Google Workspace Marketplace

</div>

## O que é exportado {#what-it-exports}

| Item do menu | Aba da planilha | Dados |
|---|---|---|
| Exportar pessoas | `B1 People` | ID, Nome de exibição, Nome, Sobrenome, E-mail, Situação de membro |
| Exportar doações | `B1 Donations` | ID, ID da pessoa, Data, Valor, Método, ID do lote |
| Exportar grupos | `B1 Groups` | ID, Nome, Categoria, Quantidade de membros |
| Exportar presença | `B1 Attendance` | ID, ID da pessoa, Data da visita, ID do culto, ID do grupo |

Cada exportação **substitui** o conteúdo da aba com nome correspondente -- executar a exportação novamente gera um novo retrato dos dados, e não linhas acrescentadas. As demais abas da planilha não são alteradas.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 com os escopos corretos {#1-create-a-b1-api-key-with-the-right-scopes}

1. No B1Admin, acesse **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova chave de API**, dê o nome "Sheets Export" e conceda os escopos de **leitura** para o que você pretende exportar:
   - `people:read` para a exportação de pessoas
   - `donations:read` para doações
   - `groups:read` para grupos
   - `attendance:read` para presença
3. Uma chave usada apenas para exportações **não precisa** de `settings:write` -- esse escopo serve somente para conectores que registram webhooks (Zapier / Make). Mantenha essa chave com escopos restritos.
4. Salve e copie a chave `cak_…`.

### 2. Instale o complemento {#2-install-the-add-on}

1. Abra a planilha em que você deseja exportar.
2. **Extensões → Complementos → Obter complementos**.
3. Pesquise por **B1 Export** e instale-o. O Google pedirá que você conceda acesso às suas planilhas e a requisições HTTP externas (para que o complemento possa chamar a API do B1).

Depois da instalação, uma entrada **B1 Export** aparece no menu **Extensões** de todas as planilhas que você abrir com esta conta Google.

### 3. Conecte a chave {#3-connect-the-key}

1. **Extensões → B1 Export → Conectar…** (ou **B1 Export → Conectar…** na barra de menus depois da primeira abertura).
2. Cole a chave de API na barra lateral, deixe a URL base como `https://api.churchapps.org` (a menos que você esteja testando no ambiente de homologação) e clique em **Salvar**.
3. Clique em **Testar conexão** -- a mensagem verde "Conexão OK" confirma que a chave funciona.

A chave é armazenada nas **propriedades do usuário** (`PropertiesService.getUserProperties()`): ela fica vinculada à sua conta Google, nunca é gravada na planilha e não fica visível para outros editores da planilha.

## Executar uma exportação {#running-an-export}

Qualquer uma destas opções:

- **Pelo menu** -- **Extensões → B1 Export → Exportar pessoas** (ou Doações / Grupos / Presença)
- **Pela barra lateral** -- abra a barra lateral (Conectar…) e clique no botão do conjunto de dados desejado

Uma notificação confirma quando a exportação termina -- "_N_ linha(s) gravada(s) em 'B1 People'."

## Criar relatórios com base nos dados {#building-reports-on-top}

As abas exportadas são dados comuns do Google Sheets. Crie suas próprias análises fazendo referência às abas:

- Uma **aba de resumo** com `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` para totalizar as doações feitas com cartão
- Uma **visualização filtrada** apenas com os membros, usando `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Um **gráfico** das tendências de presença, usando os dados de `B1 Attendance`

Executar a exportação novamente atualiza a aba de origem, e suas fórmulas são recalculadas automaticamente.

## Agendar exportações recorrentes {#scheduling-recurring-exports}

Por padrão, o complemento funciona sob demanda. Para exportações semanais ou mensais, use os gatilhos baseados em tempo que já vêm no Apps Script:

1. **Extensões → Apps Script** na planilha (isso abre o script vinculado ao complemento).
2. Clique no ícone **⏰ Triggers** na barra lateral esquerda.
3. Clique em **Adicionar gatilho** para `exportPeople` (ou qualquer outra função de exportação) -- escolha *Time-driven*, *Week timer*, por exemplo *Every Monday 6am*.

A exportação roda em segundo plano, na sua conta Google. Se a chave de API for trocada ou revogada, o gatilho enviará um e-mail para você na próxima vez que falhar.

## Permissões e privacidade {#permissions--privacy}

- O complemento solicita somente `spreadsheets.currentonly` (ele só pode acessar a planilha em que está aberto) e `script.external_request` (para que o `UrlFetchApp` possa chamar a API do B1). Ele **não** acessa seu Drive, seu Gmail nem outros dados do Google.
- A chave de API do B1 é armazenada por usuário -- outros editores da mesma planilha não podem vê-la.
- Todas as chamadas à API do B1 são feitas por HTTPS com `Authorization: Bearer cak_…`.

## Solução de problemas {#troubleshooting}

- **"Nenhuma chave de API definida"** -- abra **Extensões → B1 Export → Conectar…** e cole a chave.
- **"O B1 rejeitou a chave de API (401)"** -- a chave foi excluída ou está incorreta. Crie uma nova chave e cole-a.
- **"Esta chave de API não tem permissão para /giving/donations (403)"** -- a chave não tem `donations:read`. Os escopos não podem ser alterados em uma chave existente, então crie uma nova chave com os escopos corretos no B1Admin.
- **A planilha não atualiza** depois de executar -- confirme se você está olhando para o nome correto da aba (`B1 People` etc.). A exportação cria a aba caso ela ainda não exista.
- **"Cota excedida"** -- o Apps Script impõe cotas diárias por usuário para o `UrlFetchApp` (normalmente milhares de chamadas por dia). Uma igreja grande, com muitos registros, pode precisar dividir as exportações em vários dias ou usar o [Make](./make.md) ou uma integração personalizada para sincronização de grande volume.

## Está faltando uma coluna? {#missing-a-column}

Se você quiser uma coluna que não exportamos, um conjunto de dados adicional ou um formato de saída diferente, envie um e-mail para [support@churchapps.org](mailto:support@churchapps.org).

## Veja também {#see-also}

- [Zapier](./zapier.md) -- para sincronização em tempo real, em vez de exportação sob demanda
- [Make](./make.md) -- para sincronização com transformações mais complexas
- [Chaves de API (referência para desenvolvedores)](/docs/developer/api/api-keys)
