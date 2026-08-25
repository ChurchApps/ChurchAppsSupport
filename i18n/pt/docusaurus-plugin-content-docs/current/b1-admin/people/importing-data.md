---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer torna fácil trazer seus dados existentes para B1, seja começando do zero de uma planilha, migrando de outra plataforma de gerenciamento de igrejas ou importando registros de dádivas. Também pode ser usada para exportar ou fazer backup de seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com acesso a **Configurações**.
- Tenha seus dados exportados e prontos de seu sistema anterior antes de começar.
- Esta ferramenta destina-se à migração de dados inicial. Se você já vem usando B1 há um tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a Ferramenta de Transferência

1. Faça login em **B1 Admin**.
2. Abra o **menu de seção** no canto superior esquerdo (o nome da seção com a seta pequena) e escolha **Configurações**.
3. Clique no botão **Importar/Exportar** no canto superior direito do cabeçalho da página.
4. Isto abrirá a ferramenta **B1 Transfer** em uma nova guia em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência leva você através de quatro passos: Origem, Visualização, Destino e Executar.

---

## Passo 1 - Escolha Sua Origem

Selecione de onde seus dados estão vindo. Existem sete opções:

- **B1 Database** — Puxa dados diretamente de sua igreja B1 existente. Útil para fazer um backup ou converter seus dados para outro formato. Você deve estar conectado para usar esta opção.
- **B1 Import Zip** — Um arquivo zip em formato próprio do B1. Isto é principalmente usado para restaurar uma exportação anterior do B1.
- **Breeze Import Zip** — Um arquivo zip contendo arquivos exportados do Breeze ChMS.
- **Planning Center Zip** — Um arquivo zip ou CSV exportado do Planning Center.
- **Custom CSV / Excel** — Qualquer arquivo CSV ou Excel contendo dados de pessoas. Após fazer upload, você mapeará suas colunas para campos B1 antes que a importação prossiga.
- **Tithe.ly CSV** — Um arquivo de exportação de pessoas ou dádivas de Tithe.ly (formato CSV ou Excel aceito).
- **CCB / Pushpay CSV** — Um CSV de pessoas ou dádivas exportado de Church Community Builder ou Pushpay.

Você pode arrastar e soltar seu arquivo na área de upload ou clicar para procurar.

---

## Passo 1b - Mapeie Seus Campos (Somente Custom CSV / Excel)

Se você selecionou **Custom CSV / Excel**, após fazer upload seu arquivo a ferramenta mostrará uma tela de mapeamento de campo antes de passar para visualização.

Cada coluna de seu arquivo está listada ao lado de um valor de amostra. Para cada coluna, use o dropdown para escolher o campo B1 correspondente. A ferramenta detectará automaticamente nomes de colunas comuns como "First Name," "Email," ou "Zip Code," mas você deve revisar cada linha e corrigir o que perdeu.

Os campos B1 disponíveis incluem:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — atribui a pessoa a um grupo por nome
- **Form Answer (campo personalizado)** — salva o valor da coluna como um campo personalizado anexado ao registro da pessoa. Se usar esta opção, você será pedido para dar um nome ao formulário.

Colunas que você não quer importar podem ser definidas como **(Skip)**. Pelo menos um campo de nome (First Name ou Last Name) deve ser mapeado antes que você possa continuar.

Clique em **Confirm Mapping & Import** para passar para visualização.

---

## Passo 2 - Visualize Seus Dados

Após fazer upload, a ferramenta exibe uma visualização de tudo que será importado. Use as guias para revisar cada tipo de dados:

- **People** — Listado por casa, com fotos se incluídas.
- **Groups** — Organizadas por campus, serviço, hora e categoria.
- **Attendance** — Datas de sessão, grupos e contagens de visita.
- **Donations** — Lotes, fundos, doadores e valores.
- **Forms** — Nomes de formulários e tipos de conteúdo.

Revise isto cuidadosamente antes de prosseguir. Se algo parecer errado, clique em **Start Over** e corrija seu arquivo de origem.

---

## Passo 3 - Escolha Seu Destino

Selecione para onde você quer que os dados vão:

- **B1 Database** — Importa diretamente no banco de dados da sua igreja B1. Após selecionar isto, a ferramenta mostrará uma contagem final de registros a ser adicionada. Clique em **Start Transfer** para confirmar.
- **B1 Export Zip** — Baixa seus dados como arquivo zip em formato B1. Bom para backups.
- **Breeze Export Zip** — Converte seus dados para formato Breeze.
- **Planning Center Zip** — Converte seus dados para formato Planning Center.

:::warning
A origem e o destino não podem ser o mesmo formato. Se coincidirem, a ferramenta avisa você para prevenir duplicação acidental.
:::

---

## Passo 4 - Executar

A ferramenta processa a transferência e mostra progresso para cada passo:

- Campuses, Services, and Times
- People
- Photos
- Groups and Group Members
- Donations
- Attendance
- Forms, Questions, Answers, and Form Submissions
- Compressing (para destinos de arquivo zip apenas)

:::warning
Não feche seu navegador enquanto a transferência está executando. Aguarde até que todos os passos apareçam como completos.
:::

---

## Preparando um Breeze Import Zip

1. Em Breeze, vá para **Settings** e clique em **Export** na barra lateral esquerda.
2. Exporte três arquivos separados: **People**, **Tags** e **Contributions**.
3. Selecione todos os três arquivos, clique com botão direito e comprima-os em um único arquivo zip.
   - Em Mac: selecione os arquivos, clique com botão direito e escolha **Compress**.
   - Em PC: selecione os arquivos, clique com botão direito, escolha **Send to** e então **Compressed (zipped) folder**.
4. Faça upload do arquivo zip usando a opção **Breeze Import Zip** no Passo 1.

A importação do Breeze transfere pessoas, grupos (tags) e registros de doações automaticamente.

---

## Preparando uma Exportação do Planning Center

1. Faça login em Planning Center e abra o produto **People**.
2. Na barra lateral esquerda, clique em **Lists** e crie uma lista que inclua todos que você quer trazer. (Se você já tem uma lista de sua congregação inteira, use aquela.)
3. Abra a lista e use sua opção de **export** para baixar suas pessoas como arquivo **CSV**. Inclua os campos que você quer manter — nome, email, telefone, endereço, data de nascimento, gênero e status de associação se mapeiam bem para B1.
4. Se Planning Center lhe der mais de um arquivo, selecione-os todos, clique com botão direito e comprima em um único zip.
   - Em Mac: selecione os arquivos, clique com botão direito e escolha **Compress**.
   - Em PC: selecione os arquivos, clique com botão direito, escolha **Send to** e então **Compressed (zipped) folder**.
5. Faça upload do CSV ou zip usando a opção **Planning Center Zip** no Passo 1.

Após fazer upload, continue para visualização e confirme que suas pessoas e casas parecem corretas antes de executar a importação.

---

## Preparando uma Exportação de Tithe.ly

1. Em Tithe.ly, exporte seus dados de **People** como arquivo CSV ou Excel. Você também pode exportar um arquivo de **Giving** separado se quiser trazer registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou dádivas com base nos nomes das colunas.
3. Faça upload do arquivo usando a opção **Tithe.ly CSV** no Passo 1.

:::info
Exportações de Tithe.ly podem ser importadas uma arquivo de cada vez. Execute o processo duas vezes se você precisar importar registros tanto de pessoas quanto de dádivas separadamente.
:::

---

## Preparando uma Exportação de CCB ou Pushpay

1. Em Church Community Builder ou Pushpay, exporte seus dados de **People** como arquivo CSV. Você também pode exportar um arquivo de dádivas/contribuições separado.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou dádivas com base nos nomes das colunas.
3. Faça upload do arquivo usando a opção **CCB / Pushpay CSV** no Passo 1.

---

## Após Importar

Uma vez que a transferência está completa, dedique alguns minutos para verificar seus dados:

1. Procure na página [Pessoas](../people/adding-people.md) e verifique alguns perfis.
2. Confirme que nomes, emails, números de telefone e endereços vieram corretamente.
3. Verifique que conexões de casa estão intactas.
4. Revise quaisquer grupos e registros de dádivas importados.

Se você notar problemas, pode editar perfis individuais da página Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como um backup.
