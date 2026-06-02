---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** é o complemento oficial do Google Sheets para B1.church. Ele adiciona uma barra lateral a qualquer planilha que exporta Pessoas, Doações, Grupos ou Frequência do sua igreja B1 para abas nomeadas — sob demanda, com um clique. O complemento funciona inteiramente dentro da conta Google do usuário; nada sobre isso toca os servidores da ChurchApps além das chamadas de API apenas leitura que cada exportação faz.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta Google com acesso de edição à planilha em que você deseja exportar
- Um administrador da igreja (ou alguém com acesso de leitura aos dados que você deseja exportar) capaz de criar uma chave de API B1
- O complemento B1 Export instalado do Google Workspace Marketplace

</div>

## O Que Exporta

| Item do menu | Aba da planilha | Dados |
|---|---|---|
| Exportar Pessoas | `B1 People` | ID, Nome de exibição, Primeiro, Último, Email, Status de filiação |
| Exportar Doações | `B1 Donations` | ID, ID da Pessoa, Data, Valor, Método, ID do Lote |
| Exportar Grupos | `B1 Groups` | ID, Nome, Categoria, Contagem de Membros |
| Exportar Frequência | `B1 Attendance` | ID, ID da Pessoa, Data da Visita, ID do Serviço, ID do Grupo |

Cada exportação **substitui** o conteúdo de sua aba nomeada — executar uma exportação novamente fornece um novo snapshot, não linhas anexadas. Outras abas da planilha não são tocadas.

## Configuração

### 1. Criar uma chave de API B1 com os escopos corretos

1. Em B1Admin vá para **Configurações → Desenvolvedor → Chaves de API**.
2. Clique em **Nova Chave de API**, nomeie como "Sheets Export", e conceda os escopos de **leitura** para o que você planeja exportar:
   - `people:read` para a exportação de Pessoas
   - `donations:read` para Doações
   - `groups:read` para Grupos
   - `attendance:read` para Frequência
3. Uma chave que apenas faz exportações **não precisa** de `settings:write` — esse escopo é apenas para conectores que registram webhooks (Zapier / Make). Mantenha essa chave estreita.
4. Salve e copie a chave `cak_…`.

### 2. Instalar o complemento

1. Abra a planilha em que você deseja exportar.
2. **Extensões → Complementos → Obter complementos**.
3. Procure por **B1 Export** e instale-o. Google pede que você conceda acesso às suas planilhas e ao HTTP externo (para que o complemento possa chamar a API B1).

Após a instalação, uma entrada **B1 Export** aparece no menu **Extensões** de cada planilha que você abre com esta conta Google.

### 3. Conectar a chave

1. **Extensões → B1 Export → Conectar…** (ou **B1 Export → Conectar…** na barra de menu após a primeira abertura).
2. Cole a chave de API na barra lateral, deixe a URL base como `https://api.churchapps.org` (a menos que você esteja testando contra staging), e clique em **Salvar**.
3. Clique em **Testar Conexão** — um "Conexão OK" verde confirma que a chave funciona.

A chave é armazenada em **propriedades por usuário** (`PropertiesService.getUserProperties()`) — está vinculada à sua conta Google, nunca escrita na planilha, e nunca visível para outros editores da planilha.

## Executar uma Exportação

Qualquer um:

- **No menu** — **Extensões → B1 Export → Exportar Pessoas** (ou Doações / Grupos / Frequência)
- **Na barra lateral** — abra a barra lateral (Conectar…) e clique no botão do conjunto de dados apropriado

Um toast confirma quando termina — "_N_ linha(s) escrita(s) em 'B1 People'."

## Construir Relatórios em Cima

As abas exportadas são dados simples do Google Sheets. Construa sua própria análise em abas de referência:

- Uma **aba de resumo** com `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` para totalizar presentes de cartão
- Uma **visualização filtrada** apenas de membros com `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Um **gráfico** de tendências de frequência puxando de `B1 Attendance`

Executar a exportação novamente atualiza a aba subjacente; suas fórmulas se atualizam automaticamente.

## Agendar Exportações Recorrentes

O complemento é sob demanda por padrão. Para exportações semanais ou mensais, use os gatilhos acionados por tempo incorporados do Apps Script:

1. **Extensões → Apps Script** na planilha (isso abre o script vinculado do complemento).
2. Clique no ícone **⏰ Triggers** na barra lateral esquerda.
3. **Adicione Trigger** para `exportPeople` (ou qualquer função de exportação) — escolha *Time-driven*, *Week timer*, por ex. *Every Monday 6am*.

A exportação é executada em background sob sua conta Google. Se a chave de API for rotacionada ou revogada, o trigger lhe envia um email na próxima vez que falhar.

## Permissões e Privacidade

- O complemento solicita apenas `spreadsheets.currentonly` (ele pode apenas tocar a planilha em que está aberto) e `script.external_request` (para que `UrlFetchApp` possa chamar a API B1). Ele **não** vê seu Drive, Gmail ou outros dados Google.
- A chave de API B1 é armazenada por usuário — outros editores da mesma planilha não podem vê-la.
- Todas as chamadas de API B1 são feitas via HTTPS com `Authorization: Bearer cak_…`.

## Solução de Problemas

- **"Nenhuma chave de API definida"** — abra **Extensões → B1 Export → Conectar…** e cole a chave.
- **"B1 rejeitou a chave de API (401)"** — a chave foi revogada ou está errada. Re-crie e re-cole.
- **"Esta chave de API carece de permissão para /giving/donations (403)"** — a chave não tem `donations:read`. Atualize os escopos da chave em B1Admin.
- **Planilha não se atualiza** após executar — certifique-se de que você está olhando para a aba correta (`B1 People` etc.). A exportação cria a aba se ela não existisse.
- **"Cota excedida"** — Apps Script impõe cotas diárias por usuário em `UrlFetchApp` (geralmente milhares de chamadas por dia). Uma grande igreja com muitos registros pode precisar dividir exportações em vários dias ou usar [Make](./make) / uma integração personalizada para sincronização em grande volume.

## Personalizar o Complemento

O complemento é de código aberto — o projeto Apps Script vive no repositório `B1Integrations/GoogleSheetsAddon/`. Se você quiser uma coluna que não exportamos, um conjunto de dados adicional ou um formato de saída diferente, abra uma issue ou PR lá.

## Veja Também

- [Zapier](./zapier) — para sincronização em tempo real em vez de exportação sob demanda
- [Make](./make) — para sincronização com transformações mais complexas
- [Chaves de API (referência de desenvolvedor)](/docs/developer/api/api-keys)
