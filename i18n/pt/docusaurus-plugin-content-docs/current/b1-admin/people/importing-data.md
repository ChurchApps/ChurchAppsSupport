---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer seus dados existentes para B1, se você está começando do zero com uma planilha, migrando de outra plataforma de gerenciamento de igreja ou importando registros de ofertas. Também pode ser usada para exportar ou fazer backup de seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com acesso a **Settings**.
- Tenha seus dados exportados e prontos do seu sistema anterior antes de começar.
- Esta ferramenta se destina à migração inicial de dados. Se você já está usando B1 há um tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a Ferramenta de Transferência

1. Faça login em **B1 Admin**.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Settings** e clique em **Settings**.
3. Clique no botão **Import/Export** no canto superior direito do cabeçalho da página.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência o guia através de quatro etapas: Source, Preview, Destination e Run.

---

## Passo 1 - Escolha Sua Fonte

Selecione de onde seus dados estão vindo. Há sete opções:

- **B1 Database** — Puxa dados diretamente do seu B1 de igreja existente. Útil para fazer um backup ou converter seus dados para outro formato. Você deve estar conectado para usar esta opção.
- **B1 Import Zip** — Um arquivo zip no próprio formato do B1. Isso é principalmente usado para restaurar uma exportação anterior do B1.
- **Breeze Import Zip** — Um arquivo zip contendo arquivos exportados do Breeze ChMS.
- **Planning Center Zip** — Um arquivo zip ou CSV exportado do Planning Center.
- **Custom CSV / Excel** — Qualquer arquivo CSV ou Excel contendo dados de pessoas. Após o upload, você mapeará suas colunas para campos B1 antes que a importação prossiga.
- **Tithe.ly CSV** — Um arquivo de pessoas ou ofertas exportado do Tithe.ly (formato CSV ou Excel aceito).
- **CCB / Pushpay CSV** — Um arquivo CSV de pessoas ou ofertas do Church Community Builder ou Pushpay.

Você pode arrastar e soltar seu arquivo na área de upload, ou clicar para procurar por ele.

---

## Passo 1b - Mapeie Seus Campos (Apenas CSV / Excel Personalizado)

Se você selecionou **Custom CSV / Excel**, após fazer upload do seu arquivo a ferramenta mostrará uma tela de mapeamento de campo antes de se mover para a visualização.

Cada coluna do seu arquivo é listada ao lado de um valor de amostra. Para cada coluna, use o dropdown para escolher o campo B1 correspondente. A ferramenta detectará automaticamente nomes de coluna comuns como "First Name", "Email" ou "Zip Code", mas você deve revisar cada linha e corrigir qualquer coisa que ela perdeu.

Os campos B1 disponíveis incluem:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — atribui a pessoa a um grupo pelo nome
- **Custom Field (match by name)** — salva a coluna em um dos [campos de pessoa personalizados](../settings/custom-fields.md) da sua igreja. Uma caixa **B1 field name** aparece, preenchida com o cabeçalho da coluna. Altere-a para o nome do campo exatamente como aparece em B1 (capitalização não importa).
- **Form Answer (custom field)** — salva o valor dessa coluna como um campo personalizado anexado ao registro da pessoa. Se você usar esta opção, você será solicitado a dar um nome ao formulário.

As datas podem estar em formatos comuns como `9/17/1994` e são convertidas automaticamente. Para campos personalizados, campos Sim/Não aceitam valores como Yes, No, Y, N, True, False, 1 e 0, e campos de múltipla escolha aceitam o texto da escolha ou seu valor.

:::info
Crie seus campos de pessoa personalizados em B1 Admin antes de importar. Quando a importação terminar, a etapa **Custom Fields** lista qualquer nome de coluna que não corresponda a um campo B1 e conta qualquer valor que não se ajuste ao tipo do campo. Esses valores são ignorados e o resto da importação ainda é concluído.
:::

Colunas que você não deseja importar podem ser definidas como **(Skip)**. Pelo menos um campo de nome (First Name ou Last Name) deve ser mapeado antes que você possa continuar.

Clique em **Confirm Mapping & Import** para prosseguir para a visualização.

---

## Passo 2 - Visualizar Seus Dados

Após fazer upload, a ferramenta exibe uma visualização de tudo que será importado. Use as abas para revisar cada tipo de dado:

- **People** — Listado por família, com fotos se incluídas.
- **Groups** — Organizados por campi, serviço, hora e categoria.
- **Attendance** — Datas de sessão, grupos e contagens de visitas.
- **Donations** — Lotes, fundos, doadores e quantias.
- **Forms** — Nomes de formulários e tipos de conteúdo.

Revise isto cuidadosamente antes de prosseguir. Se algo parecer errado, clique em **Start Over** e corrija seu arquivo de origem.

---

## Passo 3 - Escolha Seu Destino

Selecione para onde você deseja que os dados vão:

- **B1 Database** — Importa diretamente para seu banco de dados B1 de igreja. Após selecionar isto, a ferramenta mostrará uma contagem final de registros a serem adicionados. Clique em **Start Transfer** para confirmar.
- **B1 Export Zip** — Baixa seus dados como um arquivo zip em formato B1. Bom para backups.
- **Breeze Export Zip** — Converte seus dados para o formato Breeze.
- **Planning Center Zip** — Converte seus dados para o formato Planning Center.

:::warning
A origem e o destino não podem ser do mesmo formato. Se eles corresponderem, a ferramenta o avisará para evitar duplicação acidental.
:::

---

## Passo 4 - Executar

A ferramenta processa a transferência e mostra progresso para cada etapa:

- Campi, Serviços e Horas
- Pessoas
- Fotos
- Grupos e Membros de Grupo
- Doações
- Frequência
- Formulários, Perguntas, Respostas e Envios de Formulário
- Campos Personalizados (quando você mapeou qualquer coluna de Campo Personalizado)
- Compactando (apenas para destinos de arquivo zip)

Quando o destino é **B1 Database**, o cartão de progresso é intitulado **Import Progress** e termina com **Import Complete!** (ou **Import Completed with Errors**). Para destinos de arquivo zip, as mesmas mensagens dizem **Export**.

:::warning
Não feche seu navegador enquanto a transferência está em execução. Aguarde até que todos os passos apareçam como concluídos.
:::

---

## Preparando um Breeze Import Zip

1. Em Breeze, vá para **Settings** e clique em **Export** na barra lateral esquerda.
2. Exporte três arquivos separados: **People**, **Tags** e **Contributions**.
3. Selecione todos os três arquivos, clique com o botão direito e comprima-os em um único arquivo zip.
   - Em um Mac: selecione os arquivos, clique com o botão direito e escolha **Compress**.
   - Em um PC: selecione os arquivos, clique com o botão direito, escolha **Send to** e depois **Compressed (zipped) folder**.
4. Carregue o arquivo zip usando a opção **Breeze Import Zip** no Passo 1.

A importação do Breeze transfere pessoas, grupos (tags) e registros de doações automaticamente.

---

## Preparando uma Exportação do Planning Center

1. Faça login no Planning Center e abra o produto **People**.
2. Na barra lateral esquerda, clique em **Lists** e crie uma lista que inclua todos que você deseja trazer. (Se você já tiver uma lista de toda sua congregação, use essa.)
3. Abra a lista e use sua opção de **export** para baixar suas pessoas como um arquivo **CSV**. Inclua os campos que você deseja manter — nome, email, telefone, endereço, data de nascimento, gênero e status de filiação mapeiam para B1.
4. Se o Planning Center lhe der mais de um arquivo, selecione-os todos, clique com o botão direito e comprima-os em um único zip.
   - Em um Mac: selecione os arquivos, clique com o botão direito e escolha **Compress**.
   - Em um PC: selecione os arquivos, clique com o botão direito, escolha **Send to** e depois **Compressed (zipped) folder**.
5. Carregue o CSV ou zip usando a opção **Planning Center Zip** no Passo 1.

Após fazer upload, continue para a visualização e confirme que suas pessoas e famílias parecem certas antes de executar a importação.

---

## Preparando uma Exportação Tithe.ly

1. Em Tithe.ly, exporte seus dados de **People** como um arquivo CSV ou Excel. Você também pode exportar um arquivo **Giving** separado se deseja trazer registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou ofertas com base nos nomes das colunas.
3. Carregue o arquivo usando a opção **Tithe.ly CSV** no Passo 1.

:::info
Exportações do Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se você precisar importar pessoas e registros de ofertas separadamente.
:::

---

## Preparando uma Exportação CCB ou Pushpay

1. Em Church Community Builder ou Pushpay, exporte seus dados de **People** como um arquivo CSV. Você também pode exportar um arquivo de ofertas/contribuições separado.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou ofertas com base nos nomes das colunas.
3. Carregue o arquivo usando a opção **CCB / Pushpay CSV** no Passo 1.

---

## Após Importar

Uma vez que a transferência é concluída, tire alguns minutos para verificar seus dados:

1. Navegue pela página [Pessoas](../people/adding-people.md) e verifique alguns perfis.
2. Confirme que nomes, emails, números de telefone e endereços vieram corretamente.
3. Verifique que as conexões de família estão intactas.
4. Revise qualquer grupos importados e registros de ofertas.

Se você notar problemas, você pode editar perfis individuais da página de Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como um backup.
