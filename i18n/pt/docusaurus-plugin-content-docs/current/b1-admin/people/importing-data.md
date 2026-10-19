---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer seus dados existentes para o B1, seja você começando do zero a partir de uma planilha, migrando de outra plataforma de gestão de igrejas ou importando registros de doações. Ela também pode ser usada para exportar ou fazer backup dos seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de uma conta ativa no B1 Admin com acesso a **Configurações**.
- Tenha seus dados exportados e prontos do sistema anterior antes de começar.
- Esta ferramenta é destinada à migração inicial de dados. Se você já usa o B1 há algum tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a ferramenta de transferência

1. Faça login no **B1 Admin**.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
3. Clique no link **Importar/Exportar** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba, em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência guia você por quatro etapas: Origem, Pré-visualização, Destino e Execução.

---

## Etapa 1 - Escolha sua origem

Selecione de onde vêm seus dados. Há sete opções:

- **Banco de dados B1** — Puxa os dados diretamente da sua igreja no B1. Útil para fazer um backup ou converter seus dados para outro formato. Você precisa estar logado para usar esta opção.
- **Zip de importação do B1** — Um arquivo zip no formato próprio do B1. É usado principalmente para restaurar uma exportação anterior do B1. Carregar um Zip de exportação do B1 de volta no **Banco de dados B1** restaura tudo o que a exportação contém (veja [Exportando dados](./exporting-data.md#full-data-export-from-settings)). Se o arquivo não puder ser lido, a ferramenta mostra o erro em vez de começar do zero.
- **Zip de importação do Breeze** — Um arquivo zip contendo arquivos exportados do Breeze ChMS.
- **Zip do Planning Center** — Um arquivo zip ou CSV exportado do Planning Center.
- **CSV / Excel personalizado** — Qualquer arquivo CSV ou Excel contendo dados de pessoas. Após o envio, você mapeará suas colunas para os campos do B1 antes que a importação prossiga.
- **CSV do Tithe.ly** — Um arquivo de exportação de pessoas ou de doações do Tithe.ly (são aceitos os formatos CSV ou Excel).
- **CSV do CCB / Pushpay** — Um CSV de exportação de pessoas ou de doações do Church Community Builder ou do Pushpay.

Você pode arrastar e soltar seu arquivo na área de envio ou clicar para procurá-lo.

---

## Etapa 1b - Mapeie seus campos (somente CSV / Excel personalizado)

Se você selecionou **CSV / Excel personalizado**, depois de enviar seu arquivo a ferramenta mostrará uma tela de mapeamento de campos antes de avançar para a pré-visualização.

Cada coluna do seu arquivo aparece ao lado de um valor de exemplo. Para cada coluna, use o menu suspenso para escolher o campo correspondente do B1. A ferramenta detecta automaticamente nomes de colunas comuns, como "First Name", "Email" ou "Zip Code", mas você deve revisar cada linha e corrigir qualquer coisa que ela não tenha identificado.

Os campos disponíveis do B1 incluem:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — atribui a pessoa a um grupo pelo nome
- **Custom Field (match by name)** — salva a coluna em um dos [campos personalizados de pessoa](../settings/custom-fields.md) da sua igreja. Aparece uma caixa **B1 field name**, preenchida com o cabeçalho da coluna. Altere-a para o nome do campo exatamente como aparece no B1 (maiúsculas e minúsculas não fazem diferença).
- **Form Answer (custom field)** — salva o valor daquela coluna como um campo personalizado vinculado ao registro da pessoa. Se você usar esta opção, será solicitado que dê um nome ao formulário.

As datas podem estar em formatos comuns, como `9/17/1994`, e são convertidas automaticamente. Para campos personalizados, os campos Sim/Não aceitam valores como Yes, No, Y, N, True, False, 1 e 0, e os campos de múltipla escolha aceitam tanto o texto da opção quanto o seu valor.

:::info
Crie seus campos personalizados de pessoa no B1 Admin antes de importar. Quando a importação terminar, a etapa **Campos personalizados** lista quaisquer nomes de colunas que não correspondam a um campo do B1 e conta os valores que não se encaixam no tipo do campo. Esses valores são ignorados, e o restante da importação é concluído normalmente.
:::

Colunas que você não quer importar podem ser definidas como **(Ignorar)**. Pelo menos um campo de nome (First Name ou Last Name) precisa ser mapeado antes que você possa continuar.

Clique em **Confirmar mapeamento e importar** para avançar para a pré-visualização.

---

## Etapa 2 - Pré-visualize seus dados

Depois do envio, a ferramenta exibe uma prévia de tudo o que será importado. Use as abas para revisar cada tipo de dado:

- **Pessoas** — Listadas por domicílio, com fotos, se incluídas.
- **Grupos** — Organizados por campus, culto, horário e categoria.
- **Presença** — Datas das sessões, grupos e número de visitas.
- **Doações** — Lotes, fundos, doadores e valores.
- **Formulários** — Nomes dos formulários e tipos de conteúdo.

Revise isso com atenção antes de prosseguir. Se algo estiver errado, clique em **Começar de novo** e corrija seu arquivo de origem.

---

## Etapa 3 - Escolha seu destino

Selecione para onde você quer que os dados vão:

- **Banco de dados B1** — Importa diretamente para o banco de dados da sua igreja no B1. Depois de selecionar esta opção, a ferramenta mostrará a contagem final de registros a serem adicionados. Clique em **Iniciar transferência** para confirmar.
- **Zip de exportação do B1** — Baixa seus dados como um arquivo zip no formato do B1, que pode ser restaurado depois com **Zip de importação do B1**. Bom para backups.
- **Zip de exportação do Breeze** — Converte seus dados para o formato do Breeze.
- **Zip de exportação do Planning Center** — Converte seus dados para o formato do Planning Center.

:::warning
A origem e o destino não podem ser o mesmo formato. Se forem iguais, a ferramenta exibirá um aviso para evitar duplicação acidental.
:::

---

## Etapa 4 - Execução

A ferramenta processa a transferência e mostra o progresso de cada etapa:

- Campus, Cultos e Horários
- Pessoas
- Fotos
- Grupos e membros de grupos
- Doações
- Presença
- Formulários, perguntas, respostas e envios de formulários
- Campos personalizados (quando você mapeou colunas de Campo personalizado)
- Compactando (somente para destinos em arquivo zip)

Quando o destino é o **Banco de dados B1**, o cartão de progresso se chama **Progresso da importação** e termina com **Importação concluída!** (ou **Importação concluída com erros**). Para destinos em arquivo zip, as mesmas mensagens dizem **Exportação**.

:::info
Ao restaurar um **Zip de importação do B1**, registros que apontam para algo que não está mais no arquivo são ignorados em vez de interromper a importação: vínculos de grupo de pessoas ou grupos que não estão no zip, presença de grupos ou pessoas excluídos, e vínculos entre grupos e horários de culto excluídos. Sessões de presença que nunca foram vinculadas a um horário de culto ainda são restauradas. Da mesma forma, ao exportar, uma foto que não puder ser baixada ou lida é deixada de fora para que a etapa **Fotos** continue.
:::

:::warning
Não feche o navegador enquanto a transferência estiver em andamento. Aguarde até que todas as etapas apareçam como concluídas.
:::

---

## Preparando um Zip de importação do Breeze

1. No Breeze, vá em **Configurações** e clique em **Exportar** na barra lateral esquerda.
2. Exporte três arquivos separados: **People**, **Tags** e **Contributions**.
3. Selecione os três arquivos, clique com o botão direito e compacte-os em um único arquivo zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Compactar**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (zipada)**.
4. Envie o arquivo zip usando a opção **Zip de importação do Breeze** na Etapa 1.

A importação do Breeze transfere automaticamente pessoas, grupos (tags) e registros de doações.

---

## Preparando uma exportação do Planning Center

1. Faça login no Planning Center e abra o produto **People**.
2. Na barra lateral esquerda, clique em **Listas** e crie uma lista que inclua todas as pessoas que você quer trazer. (Se você já tem uma lista de toda a congregação, use essa.)
3. Abra a lista e use a opção **exportar** para baixar suas pessoas como um arquivo **CSV**. Inclua os campos que você quer manter — nome, e-mail, telefone, endereço, data de nascimento, gênero e status de membro são todos mapeados para o B1.
4. Se o Planning Center gerar mais de um arquivo, selecione todos, clique com o botão direito e compacte-os em um único zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Compactar**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (zipada)**.
5. Envie o CSV ou o zip usando a opção **Zip do Planning Center** na Etapa 1.

Depois do envio, continue para a pré-visualização e confirme se suas pessoas e famílias estão corretas antes de executar a importação.

---

## Preparando uma exportação do Tithe.ly

1. No Tithe.ly, exporte seus dados de **People** como um arquivo CSV ou Excel. Você também pode exportar um arquivo separado de **Giving** se quiser trazer registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de doações, com base nos nomes das colunas.
3. Envie o arquivo usando a opção **CSV do Tithe.ly** na Etapa 1.

:::info
As exportações do Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se precisar importar pessoas e doações separadamente.
:::

---

## Preparando uma exportação do CCB ou Pushpay

1. No Church Community Builder ou no Pushpay, exporte seus dados de **People** como um arquivo CSV. Você também pode exportar um arquivo separado de doações/contribuições.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de doações, com base nos nomes das colunas.
3. Envie o arquivo usando a opção **CSV do CCB / Pushpay** na Etapa 1.

---

## Depois da importação

Quando a transferência for concluída, reserve alguns minutos para verificar seus dados:

1. Navegue até a página de [Pessoas](../people/adding-people.md) e confira alguns perfis aleatoriamente.
2. Confirme que nomes, e-mails, telefones e endereços foram importados corretamente.
3. Verifique se as conexões entre os membros da família estão intactas. O papel de cada pessoa na família (Chefe, Cônjuge, Filho(a) ou Outro) é preservado quando a origem o tem: a coluna **householdRole** em um Zip de importação do B1, **Family Role** no Breeze ou no Tithe.ly, e **Family Position** no CCB / Pushpay. Papéis como "Head of Household", "Primary", "Wife" ou "Son" são convertidos para o papel correspondente no B1. As importações do Planning Center e do CSV / Excel personalizado não têm coluna de papel, então essas pessoas são definidas como **Outro**; você pode alterar o papel a partir da família da pessoa na página de [Pessoas](../people/adding-people.md#managing-households).
4. Revise quaisquer grupos e registros de doações importados.

Se você notar problemas, pode editar perfis individuais na página de Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como backup.
