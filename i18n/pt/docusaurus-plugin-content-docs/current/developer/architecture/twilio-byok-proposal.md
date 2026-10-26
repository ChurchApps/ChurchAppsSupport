---
title: "Twilio BYOK (Proposta)"
description: "Proposta de integração do Twilio de propriedade da igreja, modelo de consentimento, escopo de implementação e critérios de lançamento."
---

# Proposta de integração do Twilio BYOK

:::caution Proposta — não é uma integração disponível
Este é um desenho para revisão dos mantenedores, com base em código público e na documentação do Twilio analisados em 22 de outubro de 2026. Desde então, um provedor básico do Twilio foi lançado (`@churchapps/texting` 0.6.0 e **Settings > Texting** no B1 Admin): a igreja informa seu Account SID, Auth Token e um número de origem (o provedor também aceita um Messaging Service SID começando com `MG`, mas a coluna `fromNumber` ainda é `varchar(20)`, curta demais para um SID de 34 caracteres), os textos são enviados com uma requisição por destinatário pela API de Mensagens do Twilio, e as respostas STOP chegam ao B1 pelo webhook de entrada existente. Consulte [Configurações da igreja: Texting](../../b1-admin/settings/church-settings.md#texting). O modelo de consentimento, o tratamento avançado de opt-out, o status de entrega e as verificações de prontidão de configuração abaixo ainda são propostas, e não comportamento lançado. O [rascunho de integração da igreja](./twilio-byok-onboarding-draft) contém as orientações de configuração propostas e exemplos específicos para igrejas.
:::

## Caminho recomendado

Adicionar o Twilio ao sistema existente de provedores de texto do B1 usando **uma conta do Twilio de propriedade da igreja, credenciais de API, um Messaging Service e um número de telefone capaz de enviar SMS**. A igreja registra a própria entidade jurídica e a campanha de mensagens, paga o Twilio diretamente, mantém o consentimento dos destinatários e gerencia a aprovação no Twilio Console. A ChurchApps fornece a integração e a documentação.

Comece com um programa de mensagens, um Messaging Service e um remetente local 10DLC dos EUA por igreja do B1. Ofereça suporte a textos individuais, textos para grupos, textos de fluxos de trabalho e lembretes de adesão pelas telas existentes do B1. Um primeiro programa razoável cobre mudanças de culto, lembretes de eventos e escalas de voluntários, desde que os três estejam descritos no consentimento da igreja e na campanha aprovada. Mensagens de arrecadação ou promocionais exigem um escopo e um consentimento avaliados separadamente; não as adicione silenciosamente a este programa.

| Responsabilidade | Igreja | B1 / ChurchApps |
|---|---|---|
| Conta do Twilio, cobrança e propriedade dos números | Possui e administra | Não provisiona uma conta da plataforma nem revende créditos |
| Marca, campanha e registro de números | Envia informações corretas da igreja; trata análises e correções | Explica os pré-requisitos e lê as informações de prontidão disponíveis |
| Página de cadastro, políticas, finalidade das mensagens | Publica e mantém | Fornece controles de formulário compatíveis, exemplos e registros de consentimento |
| Elegibilidade dos destinatários e tratamento de STOP | Revisa as evidências de consentimento e solicita o que for recebido fora do SMS | Aplica consentimento, supressão, permissões e webhooks assinados |
| Entrega e suporte | Acompanha erros do Twilio, a saúde da conta e as respostas recebidas | Mostra o status de envio e de entrega sem prometer garantias de aprovação |

Ficam adiados: uma conta-mãe do Twilio gerenciada pela ChurchApps, subcontas de clientes, compra de números, envios ao Trust Hub, cobrança, uma caixa de entrada de conversas, MMS/WhatsApp, envios internacionais e onboarding de número gratuito (toll-free). O número gratuito é um caminho separado de remetente verificado, e não uma forma de contornar o registro. Esses limites mantêm o primeiro lançamento alinhado ao modelo existente do B1 de trazer o próprio provedor.

## Base existente e lacunas

As observações a seguir estão vinculadas a versões específicas do código-fonte, e não a uma suposição sobre o que está implantado atualmente:

| Componente | Comportamento existente | Implicação |
|---|---|---|
| [Registro e contrato de provedores](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` tem envios individuais e em massa, validação, capacidades opcionais de assinante/lista e um ID de mensagem do provedor nos resultados. Nenhum adaptador do Twilio está registrado. | Adicione o Twilio em `@churchapps/texting`; ele não precisa de criação de assinantes nem de listas gerenciadas pelo provedor. |
| [Configurações de texting](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church e Nalo podem ser selecionados; MinistryStuff é controlado por recurso. A edição e o salvamento de remetentes são atualmente específicos do Nalo. | Adicione campos explícitos do Twilio, validação, salvamento de remetente e orientações de onboarding. Apenas uma entrada no dropdown não é suficiente. |
| [Controlador](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) e [gateway do módulo](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | As credenciais são criptografadas e mascaradas; envios manuais e automáticos resolvem o provedor de uma igreja. Envios para grupos deduplicam números de telefone compartilhados. | Reutilize esses caminhos e preserve a autorização. Coloque novos controles de consentimento/prontidão em um caminho comum no servidor, para que os fluxos de trabalho não possam contorná-los. |
| [Auxiliar de STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Interpreta `From`/`Body` no estilo do Twilio; valida um token de URL da igreja; define `person.optedOut` e desativa os lembretes por SMS. Outras respostas são ignoradas. | É um bom ponto de partida, mas não um webhook completo do Twilio. Adicione assinaturas do Twilio e um estado de assinatura por SMS independente. |
| [Schema de mensagens](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Armazena `apiKey`, `apiSecret` e um `fromNumber` de 20 caracteres; os logs de entrega guardam apenas sucesso/erro imediato, e não IDs de provedor ou estados finais de entrega. | Um remetente em E.164 se encaixa; um Messaging Service SID de 34 caracteres precisa de campo próprio. Adicione armazenamento durável de ID/status de mensagens do provedor. |
| [Página pública de formulário](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [renderizador de formulário compartilhado](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) e [controlador de envios](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Existem formulários não restritos e caixas de seleção opcionais. As descrições são texto simples. Os envios guardam as respostas, mas o fluxo de texting não tem um registro de consentimento específico da campanha. | Adicione um controle configurado de consentimento para SMS, com links reais para as políticas e captura de evidências no servidor; uma caixa genérica ou a participação em um grupo não deve autorizar SMS automaticamente. |

A [documentação de configurações da igreja](../../b1-admin/settings/church-settings#texting), voltada ao usuário, também explica que o atual flag de opt-out é compartilhado com a privacidade do diretório. Esse acoplamento é uma preocupação de lançamento: responder START nunca pode alterar a visibilidade no diretório.

## Configuração e desenho das credenciais

Use campos de configuração explícitos e aditivos, em vez de sobrecarregar `fromNumber` ou armazenar dados estruturados em uma string de chave de API:

| Campo | Finalidade proposta |
|---|---|
| `accountSid` | Identificador da conta/projeto do Twilio, de propriedade da igreja (`AC…`) |
| `apiKey`, `apiSecret` | SID da chave de API do Twilio (`SK…`) e o segredo, dedicados ao acesso de API de envio; criptografados e mascarados |
| `webhookAuthToken` | Auth Token da conta, usado pelo SDK do Twilio para validar assinaturas recebidas; criptografado e mascarado separadamente |
| `messagingServiceSid` | Messaging Service da igreja (`MG…`, 34 caracteres) |
| `fromNumber` | Número selecionado, capaz de enviar SMS, no formato E.164, verificado como remetente nessa conta/serviço |
| Configuração do programa | ID estável do programa, nome, finalidades permitidas, URLs de cadastro/políticas e versão do aviso |

O Twilio [prefere chaves de API para autenticação REST](https://www.twilio.com/docs/iam/api-keys). Use as permissões de chave mais restritas e testadas que cubram o envio e as verificações somente leitura de configuração. O Auth Token da conta ainda é necessário para a [verificação padrão de assinatura de webhook do Twilio](https://www.twilio.com/docs/usage/security). Explique essa distinção na interface; o segredo da API não é o Auth Token do webhook. Mantenha as credenciais exclusivamente no armazenamento de configurações do lado do servidor, nunca em páginas públicas, respostas de formulários, requisições de envio do navegador ou chamados de suporte.

A igreja cria e gerencia esses recursos no Console. A ação de validação do B1 deve apenas ler o serviço configurado, os remetentes e as informações de registro. Ela não pode comprar números, criar campanhas, alterar configurações do Twilio nem enviar uma mensagem de teste como efeito colateral. Forneça uma ação separada e explícita de envio de teste, limitada a um destinatário elegível e que tenha consentido.

Preserve credenciais mascaradas somente ao editar o mesmo provedor já salvo. Trocar para o Twilio exige suas próprias credenciais e limpa valores específicos de provedores anteriores; não leve uma chave mascarada do Clearstream ou do Nalo para a configuração do Twilio.

Limite todo carregamento e atualização à igreja do B1 autenticada. Vincule os callbacks a uma integração salva e à conta/serviço/remetente esperados do Twilio, e rejeite atribuições conflitantes entre igrejas. A rotação de credenciais e a desconexão do provedor devem invalidar a prontidão e pausar envios na fila, sem apagar consentimentos nem registros históricos de entrega.

## Consentimento e supressão são trabalho obrigatório para o lançamento

Introduza registros de assinatura vinculados ao telefone, para o programa do Twilio, além de eventos de consentimento/supressão somente de acréscimo. A evidência mínima sugerida é: ID da igreja, ID do programa, telefone normalizado, associação opcional e verificada com uma pessoa, ação afirmativa, ID do formulário/envio de origem ou prova externa revisada, data/hora do servidor, texto/versão do aviso, URL de origem, URLs das políticas e eventos de retirada/reinício. Limite o acesso e a retenção de acordo com a política de segurança de dados existente da igreja.

Use estados como `unknown`, `pending`, `active` e `suppressed`. Números de celular existentes, contatos importados, presença, doações, participação em grupos, `person.optedOut = false` e `allowSms` **não** são consentimento afirmativo para o programa. Importar consentimento documentado deve ser uma ação com permissão, auditada e com origem registrada; uma migração não pode inscrever todo mundo.

Para o fluxo web inicial, use o modo de formulário público padrão do B1. Adicione uma pergunta de consentimento por SMS explicitamente configurada, que começa desmarcada, é opcional, exibe links clicáveis para as políticas e está associada a um programa e a um campo de celular. Valide essa associação no servidor e registre um snapshot do aviso exibido ao salvar uma resposta afirmativa. Nunca derive consentimento de rótulos arbitrários de perguntas, de IA conversacional ou da participação em fluxos de trabalho. Habilite um equivalente conversacional somente depois que sua interação afirmativa explícita e o registro de evidências forem testados.

Um envio com a caixa desmarcada não cria assinatura e não pode retirar o consentimento existente de outra pessoa. Vincule o consentimento ao telefone enviado; a equipe pode resolver associações de pessoas ambíguas sem mesclar registros de domicílio. Um número de celular alterado precisa de consentimento próprio. Em formulários anônimos, aplique controles contra abuso e torne explícita qualquer verificação de posse do número ou etapa de confirmação dupla; uma caixa marcada, por si só, não comprova quem é o dono do telefone. Se uma confirmação for usada, deixe a assinatura pendente até que ela seja concluída e descreva esse fluxo exato nos materiais de cadastro.

Para o Twilio, separe a supressão de SMS da visibilidade no diretório. De forma conservadora, migre qualquer opt-out legado para um registro de supressão; deixe os demais destinatários legados como `unknown`. Uma nova inscrição explícita e documentada pode estabelecer consentimento de SMS enquanto a privacidade do diretório permanece inalterada. Preserve o comportamento dos outros provedores até que suas migrações sejam revisadas separadamente.

Em cada envio real, exija que a integração da igreja esteja habilitada/pronta, que haja consentimento atual do programa para o telefone exato, nenhuma supressão no nível do telefone e a permissão existente de quem chama. Lembretes respeitam adicionalmente `allowSms`, as preferências por categoria e o horário de silêncio. Verifique novamente após o enfileiramento, resolva os campos de mesclagem, normalize/valide os números e deduplique por telefone. STOP suprime todos os envios do serviço/programa, incluindo envios manuais e fluxos de trabalho; também deve abranger todas as pessoas que compartilham esse telefone.

Renderize a identidade da igreja e a instrução de STOP de forma consistente no caminho comum de envio do Twilio, e exiba a prévia da contagem final de SMS/segmentos. A expansão dos campos de mesclagem e o tratamento de tamanho devem preservar esses elementos; não trunque silenciosamente a instrução de opt-out. Mantenha os exemplos alinhados aos modelos reais de lembretes e de fluxos de trabalho.

## Envios, respostas e estado de entrega do Twilio

Implemente `TwilioProvider.sendMessage` pela API de Mensagens, com o Messaging Service e o remetente selecionados. Retorne um SID de mensagem do provedor e um resultado de aceito/enviado; a aceitação HTTP não é entrega ao aparelho do destinatário. Um envio para grupo usa resultados por destinatário, na ordem de entrada.

Limite a concorrência de saída para **tanto** `sendBulk` quanto os envios individuais: o branch atual de campos de mesclagem dispara chamadas de `sendMessage` em paralelo. Persista a intenção de envio e o trabalho reivindicável para grupos que não cabem no orçamento de uma requisição; reutilize o modelo de implantação existente, em vez de exigir que as igrejas executem outro serviço. Tente novamente falhas transitórias conhecidas ou de limite de taxa com backoff. Trate timeouts ambíguos como resultados desconhecidos a serem conciliados, e não como uma instrução para reenviar cegamente e arriscar textos e cobranças duplicadas.

Configure URLs de callback de entrada e de status específicas da igreja. Valide o `X-Twilio-Signature` com o SDK, a URL externa exata configurada, os parâmetros originais do formulário e o Auth Token correspondente da conta. Uma URL secreta, sozinha, não basta. Associe os callbacks aos registros salvos de igreja/conta/mensagem, trate duplicatas e callbacks que chegam antes de o resultado do envio ser confirmado, e impeça que eventos antigos sobrescrevam um status final. Retorne TwiML vazio como confirmação de mensagem de entrada e uma resposta de sucesso apropriada para eventos de status. [Segurança do Twilio](https://www.twilio.com/docs/usage/security), [callbacks de status](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Recomende o **Advanced Opt-Out** do Messaging Service. O Twilio cuida das confirmações de STOP/START/HELP; o B1 consome eventos autenticados de `OptOutType` sem enviar confirmações duplicadas. STOP registra a supressão imediatamente. START restaura somente uma assinatura conhecida para este mesmo programa divulgado, com um novo evento de reinício; ele não pode inscrever um novo telefone em mensagens não relacionadas nem ativar preferências de lembrete. HELP não inscreve ninguém. Outras respostas recebidas permanecem fora do escopo da caixa de entrada do B1; as igrejas precisam de uma forma documentada de acompanhá-las no Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Armazene o SID da mensagem do Twilio, a associação conta/serviço, a data de envio, o status final/código de erro e a data do callback junto ao registro de entrega. Exiba com precisão os estados enfileirado/aceito, entregue, falhou, não entregue ou desconhecido. Mantenha o contrato de resposta existente para os outros provedores e defina se as contagens agregadas de sucesso representam envio ou entrega.

## Prontidão da configuração e validação de aprovação

Mostre checkpoints distintos para credenciais, propriedade do serviço/remetente, verificação da campanha, registro do número, verificações de webhook e um teste de fumaça entregue. Nunca mostre um único selo verde de "aprovado" apenas porque as credenciais funcionam.

Para números locais dos EUA, leia o [recurso de campanha Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) do serviço e exija que a campanha relevante esteja `VERIFIED`. Verifique separadamente se o telefone selecionado está associado a esse serviço e se concluiu o registro do número: uma campanha aprovada ainda pode ter um número pendente. Quando uma API de leitura compatível não expuser um sinal necessário, mostre **verificação manual no Console necessária** e registre a confirmação datada do administrador da igreja como tal; não a rotule como verificada por API. Eventos automatizados de registro de número podem ficar para um acompanhamento posterior. [Erros de registro de número](https://www.twilio.com/docs/api/errors/30035), [eventos de registro A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Exija verificações atuais antes de habilitar envios; registre quando e como a prontidão foi verificada, expire verificações antigas e pause em caso de credenciais revogadas, remetentes alterados, falhas de registro ou erros persistentes da conta. A entrega de um teste de fumaça confirma o caminho testado, e não a aprovação universal pela operadora nem o consentimento do destinatário. O rascunho complementar especifica as verificações operacionais da igreja antes do envio, antes do lançamento e de forma contínua.

## Repositórios e plano de lançamento

O [guia de contribuição da organização](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) direciona as solicitações de recursos do B1 para o ChurchAppsSupport e as implementações em PRs para os repositórios responsáveis. Use uma única solicitação de recurso central e vincule os PRs de implementação focados a ela:

1. **ChurchAppsSupport:** revisar este desenho e seu rascunho de onboarding antes de apresentar o Twilio como um recurso disponível ao usuário.
2. **Packages:** adicionar o adaptador do Twilio, a configuração/interfaces compartilhadas explícitas e a renderização do formulário de consentimento por SMS, quando compartilhado entre B1Admin/B1App. Incluir changesets e publicar pelo fluxo de release existente antes de atualizar os consumidores.
3. **Api:** adicionar migrações aditivas para metadados de integração, consentimento/supressão e estados de entrega; implementar validação de configuração, portões de envio compartilhados, captura de evidências de formulário, tratamento de webhooks e persistência do despacho.
4. **B1Admin:** adicionar a interface de configuração/prontidão do Twilio, gerenciamento de programa/consentimento, salvamento de remetentes que reconheça o provedor e relatórios de entrega precisos. Não expor nenhum override de consentimento de SMS em edições comuns de pessoas.
5. **B1App:** verificar a experiência de formulário/página pública e de links de políticas em relação aos controles compartilhados, incluindo visitantes anônimos e em dispositivos móveis. Nenhum cliente de navegador separado do Twilio é necessário.
6. **ChurchAppsSupport:** após o lançamento, transformar o rascunho de onboarding em páginas de configurações/ajuda compatíveis, adicionar capturas de tela reais, vinculá-las a partir das configurações de Texting e organizar as traduções.

Implante o schema e os pacotes compartilhados antes dos consumidores. Mantenha o Twilio protegido por recurso para um piloto pequeno com adesão voluntária; os provedores existentes devem continuar funcionando. O rollback desativa o despacho pelo Twilio e cancela os trabalhos não enviados, preservando opt-outs e evidências; não pode trocar automaticamente os destinatários para outro provedor ou remetente.

## Estimativa de esforço

Estimativa de planejamento para um colaborador familiarizado com o ecossistema; nenhuma credencial de produção nem SMS real foi usado nesta avaliação:

| Trabalho | Dias de desenvolvedor |
|---|---|
| Adaptador, extensões de configuração/schema, interface de configurações | 2–3 |
| Consentimento por telefone/programa, supressão independente, portões de envio compartilhados, integração com formulário público | 3–5 |
| Callbacks assinados, persistência de entrega, despacho limitado e durável | 2–3 |
| Interface de prontidão, guia para a igreja, testes de integração e regressão, correções do piloto | 3–4 |
| **Escopo recomendado de lançamento** | **10–15 no total** |

Uma prova de conceito básica de adaptador/configuração leva cerca de 1–2 dias. Uma estimativa só de remetente exclui o trabalho de consentimento e de onboarding necessário para esta recomendação. O tempo de revisão externa do Twilio e das operadoras é separado e variável; o projeto não deve prometer uma data de aprovação nem um resultado de aprovação.

## Critérios de aceitação

- [ ] A igreja possui e paga pela conta, pelo serviço, pelo remetente registrado e pela campanha; nenhuma conta do Twilio gerenciada pela ChurchApps é necessária.
- [ ] As credenciais são criptografadas/mascaradas, isoladas por tenant, rotacionáveis e ausentes dos logs/conteúdo público; a validação é somente leitura.
- [ ] A caixa de consentimento opcional e desmarcada exibe links reais para as políticas e salva no servidor a evidência do programa/telefone/aviso; recusar ainda permite a ação principal do formulário.
- [ ] Todos os caminhos manuais, de grupo, de campos de mesclagem, de fluxos de trabalho e de lembretes aplicam o mesmo portão de elegibilidade do Twilio. Destinatários desconhecidos, sem consentimento, com telefone alterado ou suprimidos são ignorados com um motivo útil; a renderização preserva a identidade da igreja e as instruções de STOP após a expansão e o tratamento de tamanho.
- [ ] A privacidade legada do diretório não inscreve destinatários; STOP/START nunca altera a visibilidade no diretório nem preferências não relacionadas. Casos de telefone compartilhado e de entre igrejas são testados.
- [ ] STOP/START/HELP assinados, assinaturas inválidas, contas/serviços errados, eventos duplicados, envios de formulário repetidos e mapeamentos de consentimento forjados são cobertos.
- [ ] Tamanho de grupo/timeouts, limites de taxa, falha parcial, resultados ambíguos, corridas de callbacks e eventos de entrega fora de ordem são testados sem envios duplicados.
- [ ] Aprovação da campanha e registro concluído do número são distintos da validação de credenciais. A evidência manual é claramente identificada; prontidão desatualizada ou revogada bloqueia envios.
- [ ] Uma igreja-piloto verifica sua página de cadastro, os caminhos de formulário recusado e aceito, as URLs exatas das políticas e um destinatário de teste consentido, do envio à entrega, à supressão por STOP e à reinscrição permitida.
- [ ] As configurações e o comportamento de envio existentes do Clearstream, do Text In Church e do Nalo passam nas verificações de regressão; o texto de ajuda distingue propostas de recursos lançados.
