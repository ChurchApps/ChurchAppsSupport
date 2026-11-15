---
title: "Horários de transmissão ao vivo e configuração no B1 Admin"
sidebar_label: "Transmissão ao vivo"
description: "Agende transmissões ao vivo semanais ou únicas, configure o tempo do chat e do vídeo inicial, conecte um canal do YouTube e resolva problemas de incorporação no B1 Admin."
---

# Transmissão ao vivo

<div class="article-intro">

A página Horários de transmissão ao vivo permite configurar a agenda de transmissões da sua igreja, gerenciar os horários dos cultos e personalizar a experiência do espectador. Configure cultos semanais recorrentes ou eventos únicos, defina as configurações de chat e vídeo e controle quando a sua transmissão entra no ar.

</div>

## Vídeo de treinamento {#training-video}

<YouTube id="tpEY-sEYW6A" title="Configurando a transmissão ao vivo no B1" next="Personalizando o aplicativo de membros da sua igreja no B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar cultos** na seção **Conteúdo** da sua função. Veja [Funções e permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o ID do seu canal do YouTube caso pretenda usar a transmissão ao vivo automatizada
- Adicione pelo menos um [sermão](./managing-sermons.md) ou uma URL de transmissão permanente para usar como fonte da sua transmissão

</div>

A transmissão ao vivo é gerenciada em duas páginas da seção **Sermões** do Menu de atalhos: **Horários de transmissão ao vivo**, para gerenciar a agenda de transmissões, e **Configurações**, para configurar as abas da sua página de transmissão.

## Gerenciando os cultos {#managing-services}

### Adicionando um culto {#adding-a-service}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Sermões** e clique em **Horários de transmissão ao vivo**.
2. Clique no botão **Adicionar culto** no topo da página para criar um novo culto agendado. Os cultos existentes são listados em uma tabela que mostra o nome de cada culto (com um selo **Semanal** para os cultos recorrentes), o horário, o provedor e a duração; passe o mouse sobre uma linha e clique no ícone de edição para alterá-la.
3. Digite um **Nome do culto** (por exemplo, "Culto da manhã de domingo"). Novos cultos começam como "Sunday Morning".
4. Defina o **Horário do culto** -- escolha a data e a hora em que o culto começa. Novos cultos começam às 9:00 AM do próximo domingo.
5. Defina **Repete semanalmente** como **Sim** (**Semanal**) para cultos semanais regulares, ou **Não** (**Único**) para um evento único.

### Configurando o chat e o vídeo {#configuring-chat-and-video-settings}

6. Em **Configurações do chat**, defina **Habilitar chat - minutos antes** e **Habilitar chat - minutos depois** -- quantos minutos antes e depois do culto o chat deve ser habilitado (10 para cada, em um novo culto). Isso permite que os visitantes comecem a conversar antes do culto e continuem depois. O horário ao lado de cada campo mostra quando o chat abre e fecha.
7. Em **Configurações de vídeo**, defina **Iniciar vídeo antecipadamente** -- quantos minutos antes o vídeo deve começar a transmitir, para contagem regressiva ou conteúdo pré-culto. O chat abre esse número de minutos *antes* do início antecipado do vídeo, de modo que o horário mostrado ao lado do campo de minutos antes do chat considera os dois números. Por exemplo, um culto às 10:00 com 15 minutos de chat antes e início antecipado de 5 minutos abre o chat às 9:40.
8. Selecione o que será exibido na lista suspensa **Sermão**:
   - **Sermão mais recente** (**Automático**) -- Exibe automaticamente o vídeo adicionado mais recentemente.
   - Suas [URLs de transmissão permanente](#setting-up-your-youtube-live-stream), listadas em seguida -- cada uma exibe a transmissão ao vivo atual do seu canal no YouTube, usando o ID do seu canal. Uma nova é chamada **Culto ao vivo atual**, a menos que você a renomeie.
   - Abaixo delas, qualquer sermão específico que você já tenha salvo.
9. Clique em **Salvar** para agendar o culto, ou em **Cancelar** para fechar o formulário.

Para remover um culto, edite-o, clique em **Excluir** e confirme.

:::info
Se estiver configurado como recorrente, seu culto será atualizado automaticamente toda semana. Ele permanece no mesmo horário local quando o horário de verão começa ou termina. Você pode adicionar quantos cultos precisar. Os visitantes verão o próximo horário de culto agendado quando acessarem sua página de transmissão.
:::

## Configurações da página de transmissão {#streaming-page-settings}

Para personalizar as abas e os links que aparecem ao lado da sua transmissão ao vivo, abra o Menu de atalhos, expanda **Sermões** e clique em **Configurações**. A página **Configurações de transmissão** mostra sua lista de **Abas de conteúdo**, na ordem em que os espectadores as veem. As abas de links externos abrem o link em uma nova aba do navegador quando clicadas.

### Adicionando abas {#adding-tabs}

1. Clique no botão **Adicionar** para incluir uma nova aba na sua página de transmissão ao vivo. A caixa de diálogo **Criar nova aba** é aberta.
2. Digite o nome da aba na caixa **Texto da aba** e escolha um **Ícone** clicando no botão de ícone.
3. Escolha um **Tipo de link**: **URL externa** para um link personalizado (o padrão), ou uma das abas integradas **Chat** ou **Oração**.
4. Para uma aba de URL externa, digite o endereço na caixa **URL externa**. As abas de Chat e Oração não precisam de mais nada.
5. Clique em **Salvar aba**. Novas abas são adicionadas ao final da lista.

As abas configuradas aparecerão na página de transmissão ao vivo para que os espectadores acessem recursos adicionais e funcionalidades interativas.

### Editando, reordenando e excluindo abas {#editing-reordering-and-deleting-tabs}

Passe o mouse sobre uma aba e use os botões dela:

- Setas **Mover para cima** e **Mover para baixo** -- Alteram a ordem das abas.
- **Editar** (lápis) -- Altera o texto, o ícone, o tipo ou a URL da aba, e depois clique em **Salvar aba**. Para remover a aba, clique em **Excluir** e confirme na caixa de diálogo **Excluir aba**.

### Visualizando sua transmissão {#previewing-your-stream}

Na página **Horários de transmissão ao vivo**, clique em **Ver sua transmissão** no topo da página para ver exatamente como a sua página de transmissão ao vivo aparecerá para os visitantes, incluindo seu logo, os horários dos cultos e as abas configuradas.

## Configurando sua transmissão ao vivo no YouTube {#setting-up-your-youtube-live-stream}

Para conectar seu canal do YouTube para transmissão ao vivo automática:

1. Vá até **Sermões**, clique em **Adicionar sermão** e selecione **Adicionar URL de transmissão permanente**. O formulário **Editar URL de transmissão permanente** é aberto.
2. O **Provedor de vídeo** vem como **Transmissão ao vivo atual do YouTube**. Digite o seu **ID do canal do YouTube** (não a URL do seu canal; clique em **Obter o ID do seu canal** para obter ajuda).
3. O título começa como **Culto ao vivo atual**. Altere-o se quiser, adicione uma descrição e clique em **Salvar**. As URLs de transmissão permanente não têm playlist nem data de publicação.
4. Em **Horários de transmissão ao vivo**, crie um culto e selecione sua URL de transmissão permanente na lista suspensa **Sermão**.

:::tip
Para encontrar o ID do seu canal do YouTube, acesse as configurações avançadas do seu canal no YouTube e copie o valor do ID do canal.
:::

## Personalizando cores e logo {#customizing-colors-and-logo}

Sua página de transmissão ao vivo usa as configurações de [Aparência](../website/appearance.md) do seu site:

- A **cor de destaque clara** com texto escuro é usada no cabeçalho.
- A **cor de destaque escura** com texto claro é usada na barra lateral.
- Seu **logo para fundo claro** aparece na página de transmissão. Use uma imagem com fundo transparente e proporção de 4:1.

Para alterar esses itens, vá até **Site** e depois **Aparência**, e atualize as configurações de [Paleta de cores](../website/appearance.md#color-palette) e [Logo](../website/appearance.md#logo-and-branding).

## Adicionando anfitriões da transmissão {#adding-streaming-hosts}

Para dar aos membros da equipe acesso ao chat exclusivo para anfitriões, junto com o chat público:

1. No Menu de atalhos, escolha **Configurações > Funções**.
2. Clique em **Adicionar função** e selecione **Adicionar função personalizada**.
3. Nomeie a função como "Anfitrião da transmissão" e clique em **Salvar**.
4. Clique na nova função, depois pesquise pessoas na lista de membros dela e adicione-as (veja [Adicionando usuários a uma função](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Role até **Editar permissões**, expanda a seção **Conteúdo** e marque **Chat do anfitrião**.

Quando os anfitriões entram na página de transmissão ao vivo, uma aba privada **Chat do anfitrião** aparece ao lado do chat público, para conversas exclusivas da equipe durante a transmissão.

:::info
Para mais detalhes sobre como criar funções e gerenciar permissões, veja [Funções e permissões](../settings/roles-permissions.md).
:::

## Solução de problemas {#troubleshooting}

Se a sua transmissão automática do YouTube não estiver sendo exibida corretamente ao usar a opção "Transmissão ao vivo atual do YouTube" com o seu ID de canal, tente o seguinte:

**Sintomas:**
- A incorporação da transmissão mostra "Vídeo indisponível"
- A página carrega, mas nenhum vídeo aparece
- Incorporações diretas do YouTube funcionam, mas a transmissão automática do canal não

**Solução:**
Verifique no seu canal do YouTube se há transmissões ao vivo antigas ou agendadas e exclua-as:

1. Acesse o seu YouTube Studio.
2. Vá até **Conteúdo** e depois **Ao vivo**.
3. Procure transmissões ao vivo antigas agendadas ou transmissões agendadas futuras.
4. Exclua essas entradas de transmissões antigas ou agendadas.
5. Teste novamente a sua página de transmissão ao vivo.

:::warning
A incorporação automática da transmissão do canal no YouTube pode ser bloqueada quando há várias entradas de transmissões agendadas ou passadas no seu canal. Removê-las permite que o YouTube identifique e exiba corretamente a sua transmissão atual.
:::

**Requisitos adicionais:**
- Sua transmissão ao vivo deve estar definida como **Pública** (não Não listada nem Privada).
- A incorporação precisa estar permitida nas configurações de transmissão do seu YouTube.
- Certifique-se de estar usando o provedor **Transmissão ao vivo atual do YouTube** (com ID do canal), e não o provedor **YouTube** (com ID do vídeo).

## Próximos passos {#next-steps}

- [Gerenciando sermões](./managing-sermons.md) -- Adicione sermões à sua biblioteca
- [Playlists](./playlists.md) -- Organize os sermões em séries
