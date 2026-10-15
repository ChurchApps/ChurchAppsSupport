---
title: "Importando Dados"
---

# Importando Dados

<div class="article-intro">

A ferramenta B1 Transfer facilita trazer seus dados existentes para o B1, seja você começando do zero a partir de uma planilha, migrando de outra plataforma de gestão de igrejas ou importando registros de doações. Ela também pode ser usada para exportar ou fazer backup dos seus dados a qualquer momento.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de uma conta ativa no B1 Admin com acesso às **Configurações**.
- Tenha seus dados exportados e prontos do sistema anterior antes de começar.
- Esta ferramenta foi feita para a migração inicial de dados. Se você já usa o B1 há algum tempo, importar novamente pode criar registros duplicados.

</div>

## Acessando a Ferramenta de Transferência

1. Faça login no **B1 Admin**.
2. Abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Configurações** e clique em **Configurações**.
3. Clique no link **Importar/Exportar** abaixo do nome da sua igreja, no topo do menu de configurações à esquerda.
4. Isso abrirá a ferramenta **B1 Transfer** em uma nova aba, em [transfer.b1.church](https://transfer.b1.church).

A ferramenta de transferência guia você em quatro etapas: Origem, Prévia, Destino e Execução.

---

## Etapa 1 - Escolha a Origem

Selecione de onde vêm os seus dados. Há sete opções:

- **Banco de Dados B1** — Puxa os dados diretamente da sua igreja no B1. Útil para fazer um backup ou converter seus dados para outro formato. Você precisa estar conectado para usar esta opção.
- **B1 Import Zip** — Um arquivo zip no formato próprio do B1. É usado principalmente para restaurar uma exportação anterior do B1. Carregar um B1 Export Zip de volta no **Banco de Dados B1** restaura tudo o que a exportação contém (consulte [Exportando Dados](./exporting-data.md#full-data-export-from-settings)). Se o arquivo não puder ser lido, a ferramenta mostra o erro em vez de recomeçar.
- **Breeze Import Zip** — Um arquivo zip contendo os arquivos exportados do Breeze ChMS.
- **Planning Center Zip** — Um arquivo zip ou CSV exportado do Planning Center.
- **CSV / Excel Personalizado** — Qualquer arquivo CSV ou Excel que contenha dados de pessoas. Após o envio, você associará suas colunas aos campos do B1 antes de a importação prosseguir.
- **Tithe.ly CSV** — Um arquivo de exportação de pessoas ou de ofertas do Tithe.ly (aceita formato CSV ou Excel).
- **CCB / Pushpay CSV** — Um CSV de exportação de pessoas ou de ofertas do Church Community Builder ou do Pushpay.

Você pode arrastar e soltar seu arquivo na área de envio ou clicar para procurá-lo.

---

## Etapa 1b - Associe Seus Campos (somente CSV / Excel Personalizado)

Se você selecionou **CSV / Excel Personalizado**, após enviar o arquivo a ferramenta mostrará uma tela de associação de campos antes de passar para a prévia.

Cada coluna do seu arquivo é listada ao lado de um valor de exemplo. Para cada coluna, use o menu suspenso para escolher o campo correspondente do B1. A ferramenta detecta automaticamente nomes de colunas comuns, como "Nome", "E-mail" ou "CEP", mas você deve revisar todas as linhas e corrigir o que ela não tiver identificado.

Os campos disponíveis no B1 incluem:

- Nome, Sobrenome, Nome do Meio, Apelido, Nome de Exibição, Título/Prefixo, Sufixo
- E-mail, Telefone Residencial, Celular, Telefone Comercial
- Endereço Linha 1, Endereço Linha 2, Cidade, Estado, CEP
- Data de Nascimento, Aniversário de Casamento, Gênero, Estado Civil, Situação de Membresia
- Nome do Domicílio/Família
- Nome do Grupo — atribui a pessoa a um grupo pelo nome
- **Campo Personalizado (correspondência pelo nome)** — salva a coluna em um dos [campos personalizados de pessoas](../settings/custom-fields.md) da sua igreja. Aparece uma caixa **Nome do campo no B1**, preenchida com o cabeçalho da coluna. Altere-a para o nome do campo exatamente como aparece no B1 (maiúsculas e minúsculas não importam).
- **Resposta de Formulário (campo personalizado)** — salva o valor dessa coluna como um campo personalizado vinculado ao registro da pessoa. Se você usar esta opção, será solicitado que dê um nome ao formulário.

As datas podem estar em formatos comuns, como `17/9/1994`, e são convertidas automaticamente. Para campos personalizados, os campos Sim/Não aceitam valores como Sim, Não, S, N, Verdadeiro, Falso, 1 e 0, e os campos de múltipla escolha aceitam tanto o texto da opção quanto o seu valor.

:::info
Crie seus campos personalizados de pessoas no B1 Admin antes de importar. Ao final da importação, a etapa **Campos Personalizados** lista os nomes de colunas que não correspondem a nenhum campo do B1 e conta os valores que não se encaixam no tipo do campo. Esses valores são ignorados, e o restante da importação é concluído normalmente.
:::

Colunas que você não deseja importar podem ser definidas como **(Ignorar)**. Pelo menos um campo de nome (Nome ou Sobrenome) deve ser associado antes de você continuar.

Clique em **Confirmar Associação e Importar** para avançar para a prévia.

---

## Etapa 2 - Visualize Seus Dados

Após o envio, a ferramenta exibe uma prévia de tudo o que será importado. Use as abas para revisar cada tipo de dado:

- **Pessoas** — Listadas por domicílio, com fotos, se incluídas.
- **Grupos** — Organizados por campus, culto, horário e categoria.
- **Presença** — Datas de sessões, grupos e contagens de visitas.
- **Doações** — Lotes, fundos, doadores e valores.
- **Formulários** — Nomes dos formulários e tipos de conteúdo.

Revise isto com atenção antes de continuar. Se algo parecer errado, clique em **Começar de Novo** e corrija o arquivo de origem.

---

## Etapa 3 - Escolha o Destino

Selecione para onde você quer que os dados vão:

- **Banco de Dados B1** — Importa diretamente para o banco de dados B1 da sua igreja. Após selecionar esta opção, a ferramenta mostrará a contagem final de registros a serem adicionados. Clique em **Iniciar Transferência** para confirmar.
- **B1 Export Zip** — Baixa seus dados como um arquivo zip no formato B1, que pode ser restaurado depois com **B1 Import Zip**. Bom para backups.
- **Breeze Export Zip** — Converte seus dados para o formato Breeze.
- **Planning Center Zip** — Converte seus dados para o formato Planning Center.

:::warning
A origem e o destino não podem ser o mesmo formato. Se forem iguais, a ferramenta avisará para evitar duplicação acidental.
:::

---

## Etapa 4 - Execução

A ferramenta processa a transferência e mostra o progresso de cada etapa:

- Campi, Cultos e Horários
- Pessoas
- Fotos
- Grupos e Membros de Grupos
- Doações
- Presença
- Formulários, Perguntas, Respostas e Envios de Formulários
- Campos Personalizados (quando você associou alguma coluna de Campo Personalizado)
- Compactação (somente para destinos em arquivo zip)

Quando o destino é o **Banco de Dados B1**, o cartão de progresso se intitula **Progresso da Importação** e termina com **Importação Concluída!** (ou **Importação Concluída com Erros**). Para destinos em arquivo zip, as mesmas mensagens dizem **Exportação**.

:::warning
Não feche o navegador enquanto a transferência estiver em andamento. Aguarde até que todas as etapas apareçam como concluídas.
:::

---

## Preparando um Breeze Import Zip

1. No Breeze, acesse **Configurações** e clique em **Exportar** na barra lateral esquerda.
2. Exporte três arquivos separados: **Pessoas**, **Tags** e **Contribuições**.
3. Selecione os três arquivos, clique com o botão direito e compacte-os em um único arquivo zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Comprimir**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (em zip)**.
4. Envie o arquivo zip usando a opção **Breeze Import Zip** na Etapa 1.

A importação do Breeze transfere automaticamente as pessoas, os grupos (tags) e os registros de doações.

---

## Preparando uma Exportação do Planning Center

1. Faça login no Planning Center e abra o produto **People**.
2. Na barra lateral esquerda, clique em **Lists** e crie uma lista que inclua todas as pessoas que você deseja trazer. (Se você já tiver uma lista com toda a sua congregação, use essa.)
3. Abra a lista e use a opção de **exportar** para baixar suas pessoas como um arquivo **CSV**. Inclua os campos que deseja manter — nome, e-mail, telefone, endereço, data de nascimento, gênero e situação de membresia são todos associados ao B1.
4. Se o Planning Center gerar mais de um arquivo, selecione todos, clique com o botão direito e compacte-os em um único zip.
   - No Mac: selecione os arquivos, clique com o botão direito e escolha **Comprimir**.
   - No PC: selecione os arquivos, clique com o botão direito, escolha **Enviar para** e depois **Pasta compactada (em zip)**.
5. Envie o CSV ou o zip usando a opção **Planning Center Zip** na Etapa 1.

Após o envio, continue para a prévia e confirme se suas pessoas e domicílios estão corretos antes de executar a importação.

---

## Preparando uma Exportação do Tithe.ly

1. No Tithe.ly, exporte seus dados de **People** como arquivo CSV ou Excel. Você também pode exportar um arquivo separado de **Giving** se quiser trazer os registros de doações.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de ofertas, com base nos nomes das colunas.
3. Envie o arquivo usando a opção **Tithe.ly CSV** na Etapa 1.

:::info
As exportações do Tithe.ly podem ser importadas um arquivo por vez. Execute o processo duas vezes se precisar importar pessoas e ofertas separadamente.
:::

---

## Preparando uma Exportação do CCB ou do Pushpay

1. No Church Community Builder ou no Pushpay, exporte seus dados de **Pessoas** como arquivo CSV. Você também pode exportar um arquivo separado de ofertas/contribuições.
2. A ferramenta detectará automaticamente se o arquivo contém dados de pessoas ou de ofertas, com base nos nomes das colunas.
3. Envie o arquivo usando a opção **CCB / Pushpay CSV** na Etapa 1.

---

## Após a Importação

Quando a transferência estiver concluída, reserve alguns minutos para verificar seus dados:

1. Navegue até a página de [Pessoas](../people/adding-people.md) e confira alguns perfis aleatoriamente.
2. Confirme que nomes, e-mails, telefones e endereços foram importados corretamente.
3. Verifique se as conexões de domicílio estão intactas. A função de cada pessoa no domicílio (Responsável, Cônjuge, Filho ou Outro) é mantida quando a origem a possui: a coluna **householdRole** em um B1 Import Zip, **Função na Família** no Breeze ou no Tithe.ly, e **Posição na Família** no CCB / Pushpay. Funções como "Chefe de Família", "Principal", "Esposa" ou "Filho" são convertidas para a função correspondente do B1. As importações do Planning Center e do CSV / Excel Personalizado não têm coluna de função, então essas pessoas são definidas como **Outro**; você pode alterar a função a partir do domicílio da pessoa na página de [Pessoas](../people/adding-people.md#managing-households).
4. Revise quaisquer grupos e registros de ofertas importados.

Se notar problemas, você pode editar perfis individuais na página de Pessoas. Você também pode executar a ferramenta de transferência novamente para [exportar seus dados](exporting-data.md) como backup.
