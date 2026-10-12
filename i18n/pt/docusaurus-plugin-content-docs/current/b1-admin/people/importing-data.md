---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer seus dados existentes para o B1, seja você começando do zero a partir de uma planilha, migrando de outra plataforma de gestão de igrejas ou importando registros de doações. Ela também pode ser usada para exportar ou fazer backup dos seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com acesso a **Settings**.
- Tenha seus dados exportados e prontos do sistema anterior antes de começar.
- Esta ferramenta é destinada à migração inicial de dados. Se você já usa o B1 há algum tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a Ferramenta de Transferência

1. Faça login no **B1 Admin**.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Settings** e clique em **Settings**.
3. Clique no link **Import/Export** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba, em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência guia você por quatro etapas: Source (origem), Preview (prévia), Destination (destino) e Run (execução).

---

## Etapa 1 - Escolha sua Origem

Selecione de onde vêm os seus dados. Há sete opções:

- **B1 Database** — Puxa os dados diretamente da sua igreja no B1 atual. Útil para fazer um backup ou converter seus dados para outro formato. Você precisa estar conectado para usar esta opção.
- **B1 Import Zip** — Um arquivo zip no formato do próprio B1. É usado principalmente para restaurar uma exportação anterior do B1.
- **Breeze Import Zip** — Um arquivo zip contendo arquivos exportados do Breeze ChMS.
- **Planning Center Zip** — Um arquivo zip ou CSV exportado do Planning Center.
- **Custom CSV / Excel** — Qualquer arquivo CSV ou Excel contendo dados de pessoas. Depois do envio, você mapeará suas colunas para os campos do B1 antes de a importação prosseguir.
- **Tithe.ly CSV** — Um arquivo de exportação de pessoas ou de doações do Tithe.ly (formato CSV ou Excel).
- **CCB / Pushpay CSV** — Um CSV de exportação de pessoas ou doações do Church Community Builder ou do Pushpay.

Você pode arrastar e soltar seu arquivo na área de envio ou clicar para procurá-lo.

---

## Etapa 1b - Mapeie seus Campos (somente Custom CSV / Excel)

Se você selecionou **Custom CSV / Excel**, depois de enviar seu arquivo a ferramenta mostrará uma tela de mapeamento de campos antes de passar para a prévia.

Cada coluna do seu arquivo aparece ao lado de um valor de exemplo. Para cada coluna, use a lista suspensa para escolher o campo correspondente do B1. A ferramenta detecta automaticamente nomes de colunas comuns, como "First Name", "Email" ou "Zip Code", mas você deve revisar cada linha e corrigir o que ela não tiver identificado.

Os campos disponíveis do B1 incluem:

- Primeiro Nome, Sobrenome, Segundo Nome, Apelido, Nome de Exibição, Título/Prefixo, Sufixo
- E-mail, Telefone Residencial, Celular, Telefone Comercial
- Endereço Linha 1, Endereço Linha 2, Cidade, Estado, CEP
- Data de Nascimento, Aniversário de Casamento, Gênero, Estado Civil, Status de Membresia
- Nome da Família/Domicílio
- Nome do Grupo — atribui a pessoa a um grupo pelo nome
- **Custom Field (match by name)** — salva a coluna em um dos seus [campos personalizados de pessoas](../settings/custom-fields.md). Uma caixa **B1 field name** aparece, preenchida com o cabeçalho da coluna. Altere-a para o nome do campo exatamente como aparece no B1 (maiúsculas e minúsculas não fazem diferença).
- **Form Answer (custom field)** — salva o valor dessa coluna como um campo personalizado vinculado ao registro da pessoa. Se você usar esta opção, será solicitado que dê um nome ao formulário.

As datas podem estar em formatos comuns, como `9/17/1994`, e são convertidas automaticamente. Para campos personalizados, os campos Sim/Não aceitam valores como Yes, No, Y, N, True, False, 1 e 0, e os campos de múltipla escolha aceitam tanto o texto da opção quanto o seu valor.

:::info
Crie seus campos personalizados de pessoas no B1 Admin antes de importar. Quando a importação terminar, a etapa **Custom Fields** lista os nomes de colunas que não correspondem a um campo do B1 e conta os valores que não se encaixam no tipo do campo. Esses valores são ignorados, e o restante da importação é concluído normalmente.
:::

Colunas que você não quer importar podem ser definidas como **(Skip)**. Pelo menos um campo de nome (Primeiro Nome ou Sobrenome) precisa estar mapeado antes de continuar.

Clique em **Confirm Mapping & Import** para ir para a prévia.

---

## Etapa 2 - Confira seus Dados

Depois do envio, a ferramenta exibe uma prévia de tudo o que será importado. Use as abas para revisar cada tipo de dado:

- **People** — Listadas por domicílio, com fotos, se incluídas.
- **Groups** — Organizados por campus, culto, horário e categoria.
- **Attendance** — Datas das sessões, grupos e quantidade de visitas.
- **Donations** — Lotes, fundos, doadores e valores.
- **Forms** — Nomes dos formulários e tipos de conteúdo.

Revise isso com atenção antes de prosseguir. Se algo parecer errado, clique em **Start Over** e corrija seu arquivo de origem.

---

## Etapa 3 - Escolha seu Destino

Selecione para onde você quer que os dados vão:

- **B1 Database** — Importa diretamente para o banco de dados da sua igreja no B1. Depois de selecionar esta opção, a ferramenta mostrará a contagem final de registros a serem adicionados. Clique em **Start Transfer** para confirmar.
- **B1 Export Zip** — Baixa seus dados como um arquivo zip no formato do B1. Bom para backups.
- **Breeze Export Zip** — Converte seus dados para o formato do Breeze.
- **Planning Center Zip** — Converte seus dados para o formato do Planning Center.

:::warning
A origem e o destino não podem ser do mesmo formato. Se forem iguais, a ferramenta avisará para evitar duplicação acidental.
:::

---

## Etapa 4 - Execução

A ferramenta processa a transferência e mostra o progresso de cada etapa:

- Campus, Cultos e Horários
- Pessoas
- Fotos
- Grupos e Membros de Grupos
- Doações
- Presença
- Formulários, Perguntas, Respostas e Submissões de Formulário
- Campos Personalizados (quando você mapeou colunas de Custom Field)
- Compactação (somente para destinos em arquivo zip)

Quando o destino é **B1 Database**, o cartão de progresso se intitula **Import Progress** e termina com **Import Complete!** (ou **Import Completed with Errors**). Para destinos em arquivo zip, as mesmas mensagens dizem **Export**.

:::warning
Não feche o navegador enquanto a transferência estiver em andamento. Aguarde até que todas as etapas apareçam como concluídas.
:::

---

## Preparando um Arquivo Zip do Breeze

1. No Breeze, acesse **Settings** e clique em **Export** na barra lateral esquerda.
2. Exporte três arquivos separados: **People**, **Tags** e **Contributions**.
3. Selecione os três arquivos, clique com o botão direito e compacte-os em um único arquivo zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Compress**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Send to** e depois **Compressed (zipped) folder**.
4. Envie o arquivo zip usando a opção **Breeze Import Zip** na Etapa 1.

A importação do Breeze transfere automaticamente pessoas, grupos (tags) e registros de doações.

---

## Preparando uma Exportação do Planning Center

1. Faça login no Planning Center e abra o produto **People**.
2. Na barra lateral esquerda, clique em **Lists** e crie uma lista que inclua todas as pessoas que você quer trazer. (Se você já tem uma lista de toda a congregação, use essa.)
3. Abra a lista e use a opção **export** para baixar suas pessoas como um arquivo **CSV**. Inclua os campos que deseja manter -- nome, e-mail, telefone, endereço, data de nascimento, gênero e status de membresia são todos mapeados para o B1.
4. Se o Planning Center gerar mais de um arquivo, selecione todos, clique com o botão direito e compacte-os em um único zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Compress**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Send to** e depois **Compressed (zipped) folder**.
5. Envie o CSV ou o zip usando a opção **Planning Center Zip** na Etapa 1.

Depois do envio, continue para a prévia e confirme se suas pessoas e domicílios estão corretos antes de executar a importação.

---

## Preparando uma Exportação do Tithe.ly

1. No Tithe.ly, exporte seus dados de **People** como um arquivo CSV ou Excel. Você também pode exportar um arquivo separado de **Giving** se quiser trazer registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de doações com base nos nomes das colunas.
3. Envie o arquivo usando a opção **Tithe.ly CSV** na Etapa 1.

:::info
As exportações do Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se precisar importar pessoas e doações separadamente.
:::

---

## Preparando uma Exportação do CCB ou Pushpay

1. No Church Community Builder ou no Pushpay, exporte seus dados de **People** como um arquivo CSV. Você também pode exportar um arquivo separado de doações/contribuições.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de doações com base nos nomes das colunas.
3. Envie o arquivo usando a opção **CCB / Pushpay CSV** na Etapa 1.

---

## Depois da Importação

Quando a transferência terminar, reserve alguns minutos para verificar seus dados:

1. Navegue pela página de [Pessoas](../people/adding-people.md) e confira alguns perfis.
2. Confirme que nomes, e-mails, telefones e endereços foram importados corretamente.
3. Verifique se as conexões de domicílio estão intactas. O papel de cada pessoa no domicílio (Chefe, Cônjuge, Filho ou Outro) é mantido quando a origem o possui: a coluna **householdRole** em um B1 Import Zip, **Family Role** no Breeze ou no Tithe.ly, e **Family Position** no CCB / Pushpay. Papéis como "Head of Household", "Primary", "Wife" ou "Son" são convertidos para o papel correspondente do B1. As importações do Planning Center e do Custom CSV / Excel não têm coluna de papel, então essas pessoas são definidas como **Outro**; você pode alterar um papel a partir do domicílio da pessoa na página de [Pessoas](../people/adding-people.md#managing-households).
4. Revise os grupos e registros de doações importados.

Se você notar problemas, pode editar perfis individuais na página de Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como backup.
