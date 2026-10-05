---
title: "Verificações de Entrada"
---

# Verificações de Entrada

<div class="article-intro">

Verificação de entrada é um sistema com três entradas: o aplicativo kiosk B1Checkin para estações com pessoal e autosserviço, verificação de entrada automática dentro do portal de membros B1App e presença no lado do administrador em B1Admin. Todos os três escrevem no mesmo módulo de presença no Api principal, e o roteamento de sala de aula é inteiramente orientado por Grupos — não existe entidade "locais" ou "salas" separada. Uma camada de segurança infantil fica no topo: tipos de verificação de entrada por visita, portões de capacidade e proporção de voluntários no lado do servidor, elegibilidade de idade/série no lado do kiosk, verificação de retirada confiável no checkout e paging de pais através do provedor de SMS da igreja. Esta página mapeia o modelo de dados, os fluxos de verificação de entrada, a camada de segurança e o pipeline de impressão de etiqueta.

</div>

## Visão Geral

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Caminho de impressão de etiqueta (somente kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (modelos de etiqueta ou fallback HTML incluído)
       └▶ LabelRenderer → documento HTML + códigos de barras SVG inline
            └▶ PrintUI: renderização WebView → captura JPG ViewShot
                 └▶ módulo nativo printer-helper → Brother QL / Zebra
```

| Superfície | Repositório | Stack | Papel |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, roteamento de arquivo expo-router; compilações EAS para Android, Amazon Fire e iOS; atualizações OTA via `expo-updates` | Estação com pessoal ou autosserviço com impressão de etiqueta e checkout verificado |
| Verificação de entrada automática | `B1App` | Next.js (portal de membros b1.church) | Membros conectados registram sua casa em um telefone; sem impressão |
| Admin | `B1Admin` | SPA React | Configura a estrutura de serviço, atribui grupos aos horários de serviço, projeta etiquetas, registra presença manual, executa relatórios |

Todos os três chamam os mesmos dois módulos API através de `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, casas e grupos; **AttendanceApi** (`/attendance`) para tudo abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos principais | Significado |
|----------------|-----------|---------|
| `campuses` | nome, endereço | Descontinuado aqui — campus são mestres no módulo de associação (`/membership/campuses`); a cópia de presença é congelada somente leitura para leitores legados (`models/Campus.ts`) |
| `services` | campusId, nome | Um encontro recorrente, por exemplo "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, nome | Um intervalo de tempo dentro de um serviço, por exemplo "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de serviço (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Um encontro de um grupo em uma data -- criado preguiçosamente no momento da verificação de entrada (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa frequentando em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo kiosk e consumido pelos portões de capacidade/proporção |
| `visitSessions` | visitId, sessionId | Qual sessão(s) uma visita cobre -- uma criança registrada em dois horários de serviço obtém duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | nome, labelType (`nametag`/`pickup`), largura, altura, isDefault, conteúdo (blocos JSON) | Layouts de etiqueta designáveis (`models/LabelTemplate.ts`) |

### Como uma verificação de entrada completa é persistida

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é uma matriz de objetos `Visit`, cada um transportando `visitSessions` cujos `session` incorporados denominam apenas um par `(serviceTimeId, groupId)`. O servidor então:

1. **Portões de capacidade e proporções antes de qualquer escrita.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica capacidade de cada sala alvo, capacidade de convidado, sinalizador fechado e proporção de voluntários contra ocupação atual. postCheckin **não é transacional**, portanto o portão deve ser executado antes da primeira salvação — uma violação difícil retorna um 409 nomeando as sala(s) ofensora(s) e nada é persistido. Veja [Portões de capacidade e proporção de voluntários](#portões-de-capacidade-e-proporção-de-voluntários).
2. **Resolve sessões preguiçosamente.** `getSessionId()` encontra ou cria a linha `sessions` para `(groupId, serviceTimeId, hoje)` -- ids de sessão são armazenados em cache no processo por data. Novas sessões emitem um webhook `session.created`. O loop é um `for..of` aguardado -- um anterior `forEach(async …)` sem esperar corria a salvação e escrevia IDs de sessão NULL na criação de primeira sessão (corrigido; anotado em um comentário de código no loop).
3. **Substitui os registros do dia.** Qualquer visita existente para essas pessoas nesse serviço hoje é deletada junto com seus visitSessions, depois o conjunto submetido é salvo. Verificar novamente uma família é, portanto, uma operação idempotente "esse é o estado atual", não uma apêndice. Passar `?checkDuplicates=true` retorna `{ duplicates: [personId…] }` sem escrever, que é como o kiosk avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais ou caracteres ambíguos, portanto códigos não podem soletrar palavras ou serem mal lidos). O servidor retenta colisão contra as mesmas visitas abertas do mesmo dia da mesma igreja e carimba o código em cada visita no lote.
5. **Retorna `{ streaks, securityCode }`.** `streaks` mapeia personId para contagem de presença consecutiva semanal; o kiosk celebra marcos (a cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado de leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas da sua **última data registrada** — se isso foi uma semana anterior os ids são removidos, portanto o cliente recebe uma cópia pré-preenchida da seleção de sala da semana passada que será salva como novos registros.

### Checkout

Dois endpoints completam o loop (`VisitController`):

- `GET /attendance/visits/code/:code` -- visitas de hoje ainda não checkout que carregam esse código de segurança, com sessões preenchidas.
- `POST /attendance/visits/checkout` -- corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; carimba `checkoutTime` e quem retirou, e emite um webhook `attendance.checkout` por visita.

Permissões: kiosks autenticam com `attendance.checkin`, que concede exatamente a superfície de checkin/checkout/modelo-etiqueta; `attendance.view`/`attendance.edit` cobrem relatórios e entrada manual; a estrutura (serviços, horários de serviço, atribuições de grupo) requer `services.edit`. Verificação de entrada automática de membro (B1App) não precisa de permissão alguma: qualquer usuário autenticado com uma pessoa vinculada à igreja pode chamar `GET`/`POST /attendance/visits/checkin`, e o servidor restringe os `personId`s submetidos à casa do chamador (403 caso contrário — essa cerca é o que mantém os códigos de segurança de outras famílias ilegíveis). Associação é a concessão; se os membros *veem* o recurso é controlado pelas abas de navegação B1App da igreja. Os outros endpoints de checkin (`code/:code`, `checkout`, `guardians`, `CheckinController`) permanecem apenas kiosk/pessoal.

## Grupos orientam roteamento de sala

Não há entidade de sala ou sala de aula em qualquer lugar do sistema. Uma "sala" é um **grupo** de associação com `trackAttendance` ativado, vinculado a um ou mais horários de serviço através de `groupServiceTimes`. Os campos do grupo (em `Api/src/modules/membership/models/Group.ts`) que formam comportamento do kiosk:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | O grupo participa de presença alguma; a árvore de configuração do B1Admin sinaliza grupos `trackAttendance` sem linha `groupServiceTimes` como não atribuídos |
| `parentPickup` | Marca uma sala infantil: verificar entrada a isso torna a visita uma visita "infantil", que imprime uma etiqueta de retirada de família e coloca o código de segurança no crachá de nome |
| `printNametag` | Se verificações de entrada para este grupo imprimem um crachá de nome algum |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade da sala e um comutador "fechado" difícil, aplicado no lado do servidor pelo portão de checkin (editado nas configurações do grupo do B1Admin em "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Proporção de crianças-por-voluntário e contagem mínima de cabeças de voluntário, aplicadas conforme a configuração `ratioEnforcement` da церерая, |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade de idade/série avaliados no lado do kiosk para destacar ou escurecer salas |

Cada cliente desnormaliza da mesma forma (por exemplo `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carregar `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups` em paralelo, depois para cada horário de serviço coletar os grupos cujas linhas `groupServiceTimes` apontam para ele em `serviceTime.groups`. Essa matriz é o que o seletor de sala mostra, organizado por `categoryName` do grupo.

Atribuições são editadas na página do grupo em B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e a árvore Campus → Serviço → Horário de Serviço → Grupo completa é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Como grupos são a única fonte de verdade, a mesma associação de grupo alimenta roteamento de kiosk, presença estilo lista em páginas de grupo do B1Admin, e relatório de presença — atribuir um grupo a um horário de serviço é a única etapa necessária para torná-lo um destino de checkin.
:::

## Segurança infantil

### Tipos de verificação de entrada

Cada visita carrega um `checkinType` — `member`, `guest` ou `volunteer` (NULL significa legado/membro; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **no lado do kiosk**: chips Membro / Convidado / Voluntário na linha de membro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), carimbados em cada visita pendente na conclusão (`app/checkinComplete.tsx`, padronizando para `member`). O servidor o consome no portão — voluntários contam para cobertura de proporção em vez de contra capacidade, e convidados contam contra `guestCapacity`.

### Portões de capacidade e proporção de voluntários

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) executa dentro de `postCheckin` antes de qualquer salvação (o endpoint não é transacional, portanto gateamento-antes-salvar é o mecanismo de correção). Carrega ocupação atual por grupo alvo (`VisitRepo.countActiveByGroupToday`) e configuração de grupo através do gateway do módulo de associação, depois classifica violações:

- **Difícil (sempre bloquear):** `checkinClosed`, `current + incoming > capacity`, contagem de convidado sobre `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — o kiosk mostra a sala nomeada.
- **Proporção (aviso ou bloquio):** não-voluntários recebidos em uma sala onde `volunteers < minVolunteers`, nenhum voluntário algum, ou `children > volunteers × volunteerRatio`. A severidade segue a configuração por-igreja `ratioEnforcement` (`"warn"` padrão / `"block"`, editado em B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Modo de aviso retorna `409 { warning: true, error: "ratio", … }` a menos que o cliente reenvie com `acknowledgeWarnings=true` — esse reenvio é a confirmação de pessoal do kiosk override.

### Elegibilidade de idade/série (no lado do kiosk)

Elegibilidade de sala é UI consultivo, avaliado no kiosk, não aplicado pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara data de nascimento/série de uma pessoa contra o `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem de série: PreK, K, 1–12, Graduado) e retorna `eligible` / `ineligible` / `unknown` — dados faltando produzem `unknown` e nunca escondem uma sala. Idades e séries são computadas como da **data de promoção de série** da igreja (`gradePromotionDate` configuração, `"MM-DD"`, editado em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o kiosk a carrega de `GET /attendance/checkin/settings`, e `resolveAsOfDate` pega a ocorrência mais recente em ou antes de hoje. O seletor de sala destaca salas elegíveis e escurece as inelegíveis; selecionar uma sala escurecida requer uma confirmação de pessoal.

### Retirada confiável e não autorizada

Pessoas de retirada são uma entidade de associação, por casa: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, nome, photoUrl, relacionamento, `status` `trusted` / `notAuthorized`, notas). CRUD é `GET /membership/householdpickup/:householdId` (qualquer usuário da igreja autenticado, portanto os kiosks podem lê-lo) plus `POST` / `DELETE` fechados por `people.edit`. Pessoal gerencia a lista na página de pessoa do **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relacionamento e um chip de status Confiável/Não Autorizado.

No checkout (`B1Checkin/app/checkout.tsx`) o kiosk carrega a lista de retirada da casa: entradas `trusted` renderizam como cartões de retirada tocáveis ao lado da grade de foto de adulto da casa, e um nome "Outro" digitado livremente é fuzzy-combinado (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — uma combinação bloqueia checkout com uma folha de aviso e um botão de pessoal **Override**. A sobrescrita é registrada na visita em si: ela posta `checkedOutBy` como `"OVERRIDE: {name}"` através do `POST /attendance/visits/checkout` normal, portanto cai no registro de presença e no webhook `attendance.checkout` em vez de uma tabela de auditoria separada.

### Page-a-parent e transmissão de emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois endpoints SMS:

- `POST /page` — `{ visitId, message }`: página os guardiões de uma criança registrada (tela de checkout de kiosk, modo tripulado).
- `POST /broadcast` — `{ serviceId, message }`: textos cada adultos da casa registrada para um serviço (configurações admin de kiosk, atrás de uma folha tipo-`EMERGENCY`-para-confirmar em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem adultos da casa através do gateway de associação, depois entregar **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — a porta entre módulos para o provedor SMS configurado da igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há remetente SMS integrado). O gateway registra uma linha `sentText` mais entradas de `deliveryLog` por destinatário e limita um lote em 500 destinatários; com nenhum provedor configurado retorna `no_provider`, que o kiosk superfícies como "No SMS provider configured". O dispatch() do controlador deduplicates números de telefone e pula pessoas com nenhum móvel ou `optedOut` definido, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` portanto o kiosk pode mostrar o que foi pulado.

## O kiosk (B1Checkin)

As telas são arquivos expo-router sob `B1Checkin/app/`; estado entre telas vive em uma classe estática `CachedData` (`src/helpers/CachedData.ts`), não estado React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             carrega serviceTimes, grupos,│             │  └─────────┘ └▶ addGuest  └▶ imprime etiquetas,
             groupServiceTimes,           │             └▶ checkout (manned)        retorna auto ao
             labelTemplates               │                                        lookup
```

1. **Lookup** (`app/lookup.tsx`) — pesquisa por telefone (`GET /membership/people/search/phone?number=`, últimos 4 ou completo) ou por nome (`GET /membership/people/search?term=`). Selecionar uma combinação carrega a casa (`GET /membership/people/household/{householdId}`) e visitas existentes (`GET /attendance/visits/checkin`), semeando `pendingVisits` com seleções da semana passada.
2. **Revisão da casa** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada linha de membro mostra um crachá já registrado, crachá de alergia/`nametagNotes` e seus chips de sala atuais. Expandir um membro lista cada horário de serviço com um botão de sala plus chips de tipo de checkin de Membro / Convidado / Voluntário (`MemberServiceTimes.tsx`). Sob cada nome de horário de serviço, `ServiceTimeHelper.getGroupSummary()` mostra os grupos oferecidos lá (nomes de `serviceTime.groups`, aparados, deduplicated sem sensibilidade a case, juntos por vírgula); nada renderiza quando o tempo não tem grupos.
3. **Atribuição de grupo** (`app/selectGroup.tsx`) — uma árvore de categoria construída de `serviceTime.groups`, com salas elegíveis de idade/série destacadas e inelegíveis escurecidas atrás de uma confirmação de pessoal (ver [Elegibilidade de idade/série](#elegibilidade-de-idades-série-no-lado-do-kiosk)); selecionar uma sala escreve um `{ session: { serviceTimeId, groupId } }` visitSession na visita pendente dessa pessoa (`src/helpers/VisitSessionHelper.ts`). "None" a limpa.
4. **Completo** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` com `pendingVisits` (cada carimbado com seu `checkinType`), depois imprime etiquetas se uma impressora é configurada e retorna auto ao lookup. Uma resposta `409` de capacidade mostra a sala cheia/fechada nomeada; um aviso de proporção oferece uma confirmação de pessoal que reenviar com `acknowledgeWarnings=true`.

A tela **checkout** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres através de uma entrada de foco automático — portanto varredores de código de barras de cunha USB/Bluetooth trabalham com nenhuma câmera — ou um teclado na tela usando o mesmo alfabeto, auto-enviando em 4 caracteres. Um botão **Scan** abre uma folha com o `src/components/CodeScanner.tsx` compartilhado da câmera (voltado para trás por padrão, aceitando QR, Code 128 e Code 39) portanto estações sem um scanner de cunha podem ler o rótulo de retirada; um código verificado alimenta o mesmo caminho `handleCode()` que entrada digitada. Procura o código, mostra as crianças sendo retiradas, e apresenta as **pessoas de retirada confiável** da casa como cartões tocáveis ao lado de uma grade de foto de adultos da casa (plus uma opção "Outro" de texto livre que é fuzzy-verificada contra nomes não autorizados — ver [Retirada confiável e não autorizada](#retirada-confiável-e-não-autorizada)), depois posta `POST /attendance/visits/checkout` com o nome/id do retirador. Em modo tripulado a tela também oferece **Page a parent** (`POST /attendance/checkin/page`) e uma **reimpressão de etiqueta de segurança** — `reprint()` reconstrói as etiquetas da família com `LabelHelper.getAllLabelsFor(...)` e as alimenta através do mesmo pipeline de `PrintUI` de checkin.

Personalidade de estação é um sinalizador AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado em `app/adminSettings.tsx`). Modo tripulado adiciona o ponto de entrada de checkout na tela de lookup e edição de perfil por membro (`POST /membership/people`) na tela de casa. Endurecimento de kiosk é integrado: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) portões as telas de admin e impressora, a tela de admin abre apenas via 7 toques rápidos no logotipo do cabeçalho, e uma tela de atração inativa (`src/hooks/useInactivityTimer.ts`) assume entre famílias.

## Verificação de entrada automática (B1App)

Membros verificam na página de portal b1.church em `/mobile/checkin` (roteado por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Requer um usuário conectado e caminha pelos mesmos quatro passos do kiosk — serviços → casa → grupos → completo — contra os endpoints idênticos, com estado realizado em `B1App/src/helpers/CheckinHelper.ts`. As diferenças do kiosk: a casa vem do `householdId` do usuário conectado (nenhuma etapa de pesquisa), e não há impressão de etiqueta — em vez disso a tela de conclusão mostra o código de segurança do lote como um QR (`qrcode.react`) com uma sugestão "mostrar isso em uma estação de checkin". Se a casa já está registrada quando a página carrega, um botão "Show check-in code" reexibe o QR da primeira visita existente (de `GET /attendance/visits/checkin`) que carrega um `securityCode`. O checkin é registrado imediatamente no tempo de envio (não há estado pendente); o QR apenas orienta a impressão de etiqueta no kiosk.

**Impressão de etiqueta telefone-para-kiosk** (`B1Checkin/app/scan.tsx`, acessível do botão "Scan code" do QR na tela de lookup): o kiosk mostra `CodeScanner` (uma `CameraView` `expo-camera`, voltada para frente por padrão, flippable) verificando códigos QR. `ScanCodeHelper.parse()` aceita uma carga apenas quando é um código de 4 caracteres nu no alfabeto código de segurança, e `ScanCodeHelper.isRepeat()` ignora o mesmo código por 4 segundos, portanto tanto o QR B1App quanto um rótulo impresso QR bloqueiam trabalho. A tela então segue o caminho de reimpressão de checkout — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e retorna ao lookup. Nenhuma escrita de presença acontece no tempo de varredura; apenas etiquetas. Códigos com nenhuma visita ativa, estações com nenhuma impressora, e grupos sem etiqueta cada uma superfície um toast e retorna ao lookup.

Tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com B1Admin.

## Presença no lado do admin (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza a árvore de estrutura e cria serviços (`ServiceEdit.tsx`) e horários de serviço (`ServiceTimeEdit.tsx`). Dados de campus vêm da associação via o hook `useCampuses()`.
- **Presença manual** vive no lado de Grupos, não na seção de presença: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`; ao adicionar, `SessionEdit.tsx` pode incluir uma sessão por outro grupo compartilhando o horário de serviço escolhido, pulando grupos que já têm uma sessão nessa data) e marca pessoas presentes via `POST /attendance/visitsessions/log`, que encontra-ou-cria a visita para essa pessoa e sessão. Líderes de grupo podem registrar presença para seus próprios grupos sem a permissão `attendance.edit` — os controladores verificam `au.leaderGroupIds`.
- **Relatório** — tendência de presença e presença de grupo são relatórios definidos por servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi; definições em `Api/reports/*.json`). Ambos levam `startDate`/`endDate` (data final inclusiva); o relatório de tendência padrão a um ano atrás através de hoje e adiciona uma coluna `sessionDates` por semana, e presença de grupo da árvore na tela inclui cada `checkinTime` de visita e o `membershipStatus` da pessoa. O CSV de presença de grupo vem do relatório `groupAttendanceDownload` companheiro, girado por `GroupAttendanceDownloadHelper` em uma linha por membro do grupo com uma coluna presente/ausente por sessão datada; histórico por pessoa é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de etiqueta

### Modelos e o designer

Igrejas projetam suas próprias etiquetas em B1Admin em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, acessado da página de configurações de Check-In). Um modelo é uma linha `labelTemplates` cujo `content` é uma matriz JSON de blocos — `text`, `field`, `barcode`, `qrcode` ou `box` — cada posicionado em coordenadas percentuais com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`), e condições de visibilidade opcionais (por exemplo render apenas a caixa de alergia quando `person.nametagNotes` é não-vazio). Dois `labelType`s existem: `nametag` (um por pessoa registrada; campos como `person.displayName`, `sessions`, `securityCode`, e `person.isBirthdayWeek` -- `"true"` quando a data de nascimento da pessoa mês/dia está dentro de 3 dias de hoje, enrolando todo o final do ano, computado por `LabelHelper.isBirthdayWithin()`) e `pickup` (um por família; campos como `children`, `childrenAllergies`). O servidor reforça um único padrão por tipo por igreja (`LabelTemplateController.save`). O designer navios modelos de inicialização espelhando as etiquetas incluídas do kiosk e previsualizações contra dados de amostra.

### Renderização e impressão no kiosk

Na conclusão de checkin, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir a partir dos sinalizadores de grupo em cada visita pendente: nametags para grupos `printNametag`, mais uma etiqueta de retirada de família se qualquer visita atingir um grupo `parentPickup`. Visitas com `checkinType` `volunteer` são puladas por `LabelHelper.selectChildVisits()`, portanto um trabalhador de cuidado infantil em uma sala de Retirada de Pais nunca dispara uma etiqueta de retirada. O código de segurança da resposta de checkin vai em nametags infantis e no rótulo de retirada; nametags adultos imprimem sem um código. Se a igreja tem modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma blocos + contexto de campo em um documento HTML autossuficiente; caso contrário etiquetas HTML incluídas em `B1Checkin/assets/labels/` são usadas com substituição de espaço reservado.

Códigos de barras são gerados como SVG inline por codificadores TypeScript puros em `B1Checkin/src/helpers/barcode.ts` — tabelas de padrão Code 39 e Code 128 (code set B com checksum mod-103) tabelas de largura, plus QR via o pacote `qrcode`. **Esses codificadores são intencionalmente duplicados em B1Admin** (`LabelEditor.tsx` inline as mesmas tabelas, anotado em um comentário de código) portanto previsualizações do designer são pixel-fiéis a saída do kiosk; uma mudança em um deve ser espelhada no outro.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML em uma `WebView`, a captura para JPG via `react-native-view-shot`, e entrega os URIs de imagem ao módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede QL-series (QL-800/810W/820NWB/1100/1110NWB…), etiquetas de corte morrer 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta de rede + impressão de imagem TCP/ZPL |

Seleção de impressora vive em `app/printers.tsx` (varredura de rede retorna entradas `brand~model~ip`; a escolha persiste para AsyncStorage), e `src/helpers/PrinterLog.ts` mantém um registro diagnóstico de dispositivo superfícies através de um ponto de status ao vivo no cabeçalho do kiosk.

## Registro de visitante

Dois caminhos criam uma pessoa mid-checkin:

- **No kiosk** — a tela de casa "Add guest" abre `B1Checkin/app/addGuest.tsx`, que primeiro procura `GET /membership/people/search?term=` para uma combinação não-membro existente e caso contrário cria uma com `POST /membership/people`, anexado à casa atual. O convidado então flui através da atribuição de grupo como qualquer membro.
- **Self-serve via QR** — quando a configuração da igreja `enableQRGuestRegistration` está ligada (configurado nas configurações de Check-In do B1Admin, lido de `GET /membership/settings/public/{churchId}`), a tela de lookup do kiosk mostra um código QR vinculando-se a `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) deixa uma família visitante se registrar a si mesma no próprio telefone através do endpoint anônimo `POST /membership/people/guest-register`, mantendo a linha do kiosk se movendo. A folha QR também tem um botão **Register here** que abre a mesma página no kiosk (`app/guestRegister.tsx`) em uma `WebView` incógnita, com cache desabilitado; `src/helpers/GuestRegisterHelper.ts` cria a URL para tanto o QR quanto a WebView e bloqueia navegação para fora de `https://{subdomain}.b1.church/guest-register`. A tela retorna ao lookup em **Done**, voltar, ou 120 segundos de inatividade (digitação de formulário é retransmitida da WebView como atividade), desmontando a WebView portanto as entradas de uma família nunca alcançam a próxima.

## Páginas Relacionadas

- [Attendance Endpoints](../api/endpoints/attendance) -- Superfície REST completa para campus, serviços, sessões, visitas e sessões de visita
- [Membership Endpoints](../api/endpoints/membership) -- Pessoas, casas e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded`, e `attendance.checkout`
- [Module Structure](../api/module-structure) -- Como o módulo de presença é organizado no lado do servidor
