---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer seus dados existentes para B1, quer você esteja começando do zero a partir de uma planilha, migrando de outra plataforma de gerenciamento de Igreja ou importando registros de doações. Ele também pode ser usado para exportar ou fazer backup de seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta B1 Admin ativa com acesso a **Configurações**.
- Tenha seus dados exportados e prontos do seu sistema anterior antes de começar.
- Esta ferramenta é destinada a migração de dados inicial. Se você já está usando B1 há um tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a Ferramenta de Transferência

1. Faça login em **B1 Admin**.
2. Abra o **menu de seção** no canto superior esquerdo (o nome de seção com a pequena seta) e escolha **Configurações**.
3. Clique no botão **Importar/Exportar** no canto superior direito do cabeçalho da página.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência o conduz através de quatro etapas: Fonte, Visualizar, Destino e Executar.

---

## Etapa 1 - Escolha Sua Fonte

Selecione de onde seus dados estão vindo. Existem sete opções:

- **Banco de Dados B1** -- Puxa dados diretamente da sua Igreja B1 existente. Útil para fazer um backup ou converter seus dados para outro formato. Você deve estar conectado para usar esta opção.
- **B1 Import Zip** -- Um arquivo zip no próprio formato de B1. Isso é principalmente usado para restaurar uma exportação anterior de B1.
- **Breeze Import Zip** -- Um arquivo zip contendo arquivos exportados de Breeze ChMS.
- **Planning Center Zip** -- Um arquivo zip ou CSV exportado de Planning Center.
- **Custom CSV / Excel** -- Qualquer arquivo CSV ou Excel contendo dados de pessoas. Após fazer upload, você mapeará suas colunas para campos de B1 antes do import prosseguir.
- **Tithe.ly CSV** -- Um arquivo de exportação de pessoas ou doações de Tithe.ly (formato CSV ou Excel aceito).
- **CCB / Pushpay CSV** -- Um CSV de exportação de pessoas ou doações de Church Community Builder ou Pushpay.

Você pode arrastar e soltar seu arquivo na área de upload ou clicar para procurá-lo.

---

## Etapa 1b - Mapeie Seus Campos (Apenas Custom CSV / Excel)

Se você selecionou **Custom CSV / Excel**, após fazer upload do seu arquivo, a ferramenta mostrará uma tela de mapeamento de campo antes de passar para a visualização.

Cada coluna do seu arquivo está listada ao lado de um valor de amostra. Para cada coluna, use a lista suspensa para escolher o campo B1 correspondente. A ferramenta detectará automaticamente nomes de coluna comuns como "First Name", "Email" ou "Zip Code", mas você deve revisar cada linha e corrigir qualquer coisa que tenha perdido.

Os campos B1 disponíveis incluem:

- Primeiro Nome, Sobrenome, Nome do Meio, Apelido, Nome Exibido, Título/Prefixo, Sufixo
- E-mail, Telefone Residencial, Telefone Móvel, Telefone do Trabalho
- Linha de Endereço 1, Linha de Endereço 2, Cidade, Estado, CEP
- Data de Nascimento, Aniversário, Gênero, Estado Civil, Status de Adesão
- Nome de Família/Família
- Nome do Grupo -- atribui a pessoa a um grupo por nome
- **Campo Personalizado (correspondência por nome)** -- salva a coluna em um de seus [campos de pessoa personalizados](../settings/custom-fields.md) da Igreja. Uma caixa **Nome do campo de B1** aparece preenchida com o cabeçalho da coluna. Altere-o para o nome do campo exatamente como ele aparece em B1 (capitalização não importa).
- **Resposta de Formulário (campo personalizado)** -- salva o valor dessa coluna como um campo personalizado anexado ao registro da pessoa. Se você usar esta opção, será solicitado que você dê um nome ao formulário.

Datas podem estar em formatos comuns, como `9/17/1994` e são convertidas automaticamente. Para campos personalizados, campos Sim/Não aceitam valores como Sim, Não, S, N, Verdadeiro, Falso, 1 e 0, e campos de múltipla escolha aceitam o texto da escolha ou seu valor.

:::info
Crie seus campos de pessoa personalizados em B1 Admin antes de importar. Quando a importação terminar, a etapa **Campos Personalizados** lista todos os nomes de coluna que não correspondem a um campo de B1 e conta todos os valores que não se encaixam no tipo do campo. Esses valores são ignorados e o resto da importação ainda é concluído.
:::

As colunas que você não deseja importar podem ser definidas como **(Pular)**. Pelo menos um campo de nome (Primeiro Nome ou Sobrenome) deve ser mapeado antes que você possa continuar.

Clique em **Confirmar Mapeamento e Importar** para prosseguir para a visualização.

---

## Etapa 2 - Visualize Seus Dados

Após fazer upload, a ferramenta exibe uma visualização de tudo que será importado. Use as abas para revisar cada tipo de dados:

- **Pessoas** -- Listadas por família, com fotos se incluídas.
- **Grupos** -- Organizados por campus, serviço, hora e categoria.
- **Presença** -- Datas de sessão, grupos e contagens de visitas.
- **Doações** -- Lotes, fundos, doadores e valores.
- **Formulários** -- Nomes de formulários e tipos de conteúdo.

Revise isto cuidadosamente antes de prosseguir. Se algo parecer errado, clique em **Começar Novamente** e corrija seu arquivo de fonte.

---

## Etapa 3 - Escolha Seu Destino

Selecione para onde você deseja que os dados vão:

- **Banco de Dados B1** -- Importa diretamente para o banco de dados B1 da sua Igreja. Após selecionar isto, a ferramenta mostrará uma contagem final dos registros a serem adicionados. Clique em **Iniciar Transferência** para confirmar.
- **B1 Export Zip** -- Baixa seus dados como um arquivo zip no formato B1. Bom para backups.
- **Breeze Export Zip** -- Converte seus dados para o formato Breeze.
- **Planning Center Zip** -- Converte seus dados para o formato Planning Center.

:::warning
A fonte e o destino não podem estar no mesmo formato. Se corresponderem, a ferramenta o avisará para evitar duplicação acidental.
:::

---

## Etapa 4 - Executar

A ferramenta processa a transferência e mostra progresso para cada etapa:

- Campi, Serviços e Horários
- Pessoas
- Fotos
- Grupos e Membros do Grupo
- Doações
- Presença
- Formulários, Perguntas, Respostas e Envios de Formulários
- Campos Personalizados (quando você mapeou qualquer coluna de Campo Personalizado)
- Compressão (apenas para destinos de arquivo zip)

:::warning
Não feche seu navegador enquanto a transferência está em execução. Aguarde até que todas as etapas mostrem como concluídas.
:::

---

## Preparando um Breeze Import Zip

1. Em Breeze, vá para **Configurações** e clique em **Exportar** na barra lateral esquerda.
2. Exporte três arquivos separados: **Pessoas**, **Tags** e **Contribuições**.
3. Selecione todos os três arquivos, clique com o botão direito e comprima-os em um único arquivo zip.
   - Em um Mac: selecione os arquivos, clique com o botão direito e escolha **Comprimir**.
   - Em um PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (zipada)**.
4. Faça upload do arquivo zip usando a opção **Breeze Import Zip** na Etapa 1.

A importação do Breeze transfere pessoas, grupos (tags) e registros de doação automaticamente.

---

## Preparando uma Exportação do Planning Center

1. Faça login em Planning Center e abra o produto **Pessoas**.
2. Na barra lateral esquerda, clique em **Listas** e crie uma lista que inclua todos que você deseja trazer. (Se você já tem uma lista de sua congregação inteira, use essa.)
3. Abra a lista e use sua opção de **exportação** para baixar suas pessoas como um arquivo **CSV**. Inclua os campos que você deseja manter -- nome, e-mail, telefone, endereço, data de nascimento, gênero e status de adesão todos mapeiam para B1.
4. Se Planning Center lhe der mais de um arquivo, selecione-os todos, clique com o botão direito e comprima-os em um único zip.
   - Em um Mac: selecione os arquivos, clique com o botão direito e escolha **Comprimir**.
   - Em um PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (zipada)**.
5. Faça upload do CSV ou zip usando a opção **Planning Center Zip** na Etapa 1.

Após fazer upload, continue para a visualização e confirme que suas pessoas e famílias ficam bem antes de executar a importação.

---

## Preparando uma Exportação do Tithe.ly

1. Em Tithe.ly, exporte seus dados de **Pessoas** como um arquivo CSV ou Excel. Você também pode exportar um arquivo **Doações** separado se deseja trazer registros de doação.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou doações com base nos nomes das colunas.
3. Faça upload do arquivo usando a opção **Tithe.ly CSV** na Etapa 1.

:::info
As exportações do Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se precisar importar registros de pessoas e doações separadamente.
:::

---

## Preparando uma Exportação do CCB ou Pushpay

1. Em Church Community Builder ou Pushpay, exporte seus dados de **Pessoas** como um arquivo CSV. Você também pode exportar um arquivo de doações/contribuições separado.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou doações com base nos nomes das colunas.
3. Faça upload do arquivo usando a opção **CCB / Pushpay CSV** na Etapa 1.

---

## Após Importar

Após a transferência ser concluída, dedique alguns minutos para verificar seus dados:

1. Procure a página [Pessoas](../people/adding-people.md) e verifique rapidamente alguns perfis.
2. Confirme que nomes, e-mails, números de telefone e endereços foram trazidos corretamente.
3. Verifique se as conexões familiares estão intactas.
4. Revise qualquer grupo importado e registros de doação.

Se você notar problemas, pode editar perfis individuais na página Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como um backup.
