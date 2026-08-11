---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in é um sistema com três entradas principais: o aplicativo de quiosque B1Checkin para estações com equipe e autoatendimento, autoatendimento dentro do portal de membros B1App e participação do lado administrativo em B1Admin. Todos os três escrevem para o mesmo módulo de participação na Api central, e o roteamento de salas é impulsionado inteiramente por Grupos — não há entidade separada de "locais" ou "salas". Uma camada de segurança infantil fica no topo: tipos de check-in por visita, gates de capacidade e proporção voluntária do lado servidor, elegibilidade idade/série do lado do quiosque, verificação de retirada confiável no checkout e paginação dos pais sobre o provedor de envio de mensagens da igreja. Esta página mapeia o modelo de dados, os fluxos de check-in, a camada de segurança e o pipeline de impressão de etiqueta.

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

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Superfície | Repo | Stack | Função |
|---------|------|-------|--------|
| Quiosque | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds para Android, Amazon Fire e iOS; OTA updates via `expo-updates` | Estação com equipe ou autoatendimento com impressão de etiqueta e checkout verificado |
| Autoatendimento | `B1App` | Next.js (portal de membros b1.church) | Membros conectados fazem check-in de sua família a partir de um telefone; sem impressão |
| Admin | `B1Admin` | React SPA | Configura a estrutura de serviço, atribui grupos aos horários de serviço, projeta etiquetas, registra participação manual, executa relatórios |

Todos os três chamam os mesmos dois módulos de API através de `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, famílias e grupos; **AttendanceApi** (`/attendance`) para tudo abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos-chave | Significado |
|---|---|---|
| `campuses` | name, address | Descontinuado aqui — campi são dominados no módulo de associação (`/membership/campuses`); a cópia de participação é congelada como somente leitura para leitores legados (`models/Campus.ts`) |
| `services` | campusId, name | Um encontro recorrente, por exemplo "Manhã de Domingo" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | Um intervalo de tempo dentro de um serviço, por exemplo "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de serviço (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Uma reunião de um grupo em uma data — criada preguiçosamente no momento do check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa comparecendo em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo quiosque e consumido pelos gates de capacidade/proporção |
| `visitSessions` | visitId, sessionId | Qual(is) sessão(ões) uma visita cobre — uma criança verificada em dois horários de serviço obtém duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Layouts de etiqueta projetáveis (`models/LabelTemplate.ts`) |

### Como um check-in concluído é persistido

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é uma matriz de objetos `Visit`, cada um carregando `visitSessions` cujos `session` incorporados nomeiam apenas um par `(serviceTimeId, groupId)`. O servidor então:

1. **Gates de capacidade e proporções antes de qualquer escrita.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica a capacidade de cada sala alvo, capacidade de convidado, bandeira fechada e proporção voluntária contra ocupação atual. postCheckin **não é transacional**, então o gate deve ser executado antes do primeiro save — uma violação dura retorna um 409 nomeando o(s) sala(s) ofensiva(s) e nada é persistido. Consulte [Gates de capacidade e proporção voluntária](#capacity-and-volunteer-ratio-gates).
2. **Resolve sessões preguiçosamente.** `getSessionId()` encontra ou cria a linha `sessions` para `(groupId, serviceTimeId, today)` — ids de sessão são armazenados em cache no processo por data. Novas sessões emitem um webhook `session.created`. O loop é um `for..of` aguardado — um `forEach(async …)` anterior disparado sem aguardar disputava o save e escrevia NULL sessionIds na primeira criação de sessão (corrigido; anotado em um comentário de código no loop).
3. **Substitui os registros do dia.** Quaisquer visitas existentes para essas pessoas nesse serviço hoje são deletadas junto com seus visitSessions, então o conjunto submetido é salvo. Re-fazer o check-in de uma família é uma operação "este é o estado atual" idempotente, não um anexo. Passing `?checkDuplicates=true` em vez disso retorna `{ duplicates: [personId…] }` sem escrever, que é como o quiosque avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais ou caracteres ambíguos, então códigos não conseguem soletrar palavras ou mal-ler). O servidor tenta novamente em colisão contra visitas abertas no mesmo dia de mesma-dia da mesma igreja e marca o código em cada visita no lote.
5. **Retorna `{ streaks, securityCode }`.**`streaks` mapeia personId para contagem de participação de semana consecutiva; o quiosque celebra marcos (cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado da leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas de sua **última data registrada** — se essa foi uma semana anterior, os ids são retirados, então o cliente recebe uma cópia pré-preenchida das seleções de sala da semana passada que salvará como novos registros.

### Checkout

Dois endpoints completam o loop (`VisitController`):

- `GET /attendance/visits/code/:code` — visitas de hoje ainda não verificadas levando esse código de segurança, com sessões populadas.
- `POST /attendance/visits/checkout` — corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; marca `checkoutTime` e quem pegou e emite um webhook `attendance.checkout` por visita.

Permissões: quiosques autenticam com `attendance.checkin`, que concede exatamente a superfície de check-in/checkout/template de etiqueta; `attendance.view`/`attendance.edit` cobrem relatórios e entrada manual; a estrutura (serviços, horários de serviço, atribuições de grupo) requer `services.edit`. Autoatendimento de membro (B1App) não precisa de permissão alguma: qualquer usuário autenticado com uma pessoa vinculada na igreja pode chamar `GET`/`POST /attendance/visits/checkin`, e o servidor restringe os `personId`s submetidos à própria família do chamador (403 caso contrário — essa cerca é o que mantém os `securityCode`s de outras famílias ilegíveis). A associação é a concessão; se os membros *veem* o recurso é controlado pelas abas de navegação B1App da igreja. Os outros endpoints de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) permanecem somente para quiosque/equipe.

## Grupos impulsionam roteamento de sala

Não há entidade de sala ou sala de aula em qualquer lugar do sistema. Uma "sala" é um **grupo** de associação com `trackAttendance` ativado, vinculado a um ou mais horários de serviço através de `groupServiceTimes`. Os campos de grupo (em `Api/src/modules/membership/models/Group.ts`) que moldam o comportamento do quiosque:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | Grupo participa de participação alguma; a árvore de configuração B1Admin sinaliza grupos `trackAttendance` com nenhuma linha `groupServiceTimes` como não atribuídos |
| `parentPickup` | Marca uma sala de criança: fazer check-in nela torna a visita uma visita "infantil", que imprime uma etiqueta de retirada da família e coloca o código de segurança na etiqueta de nome |
| `printNametag` | Se check-ins para este grupo imprimem uma etiqueta de nome em tudo |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade de sala e um interruptor "fechado" duro, aplicado do lado servidor pelo gate de check-in (editado em configurações de grupo B1Admin em "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Proporção crianças-por-voluntário e contagem mínima de voluntários de cabeça, aplicadas de acordo com a configuração `ratioEnforcement` da igreja |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade idade/série avaliados do lado do quiosque para realçar ou diminuir salas |

Cada cliente denormaliza da mesma forma (por exemplo `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carregue `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups` em paralelo, então para cada tempo de serviço colete os grupos cuja linha `groupServiceTimes` aponta para ele em `serviceTime.groups`. Essa matriz é o que o seletor de sala mostra, organizado por `categoryName` do grupo.

Atribuições são editadas na página do grupo em B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), e toda a árvore Campus → Service → Service Time → Group é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Porque grupos são a única fonte da verdade, a mesma associação de grupo alimenta roteamento de quiosque, participação em estilo de lista em páginas de grupo B1Admin e relatórios de participação — atribuir um grupo a um horário de serviço é o único passo necessário para torná-lo um destino de check-in.
:::

## Segurança infantil

### Tipos de check-in

Cada visita carrega um `checkinType` — `member`, `guest` ou `volunteer` (NULL significa legado/member; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **lado do quiosque**: Chips Membro / Convidado / Voluntário na linha de membro expandida (`B1Checkin/src/components/MemberServiceTimes.tsx`), marcado em cada visita pendente na conclusão (`app/checkinComplete.tsx`, padrão para `member`). O servidor o consome no gate — voluntários contam para cobertura de proporção em vez de contra capacidade e convidados contam contra `guestCapacity`.

### Gates de capacidade e proporção voluntária

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) executa dentro de `postCheckin` antes de qualquer save (o endpoint é não-transacional, então gating-before-save é o mecanismo de correção). Carrega ocupação atual por grupo alvo (`VisitRepo.countActiveByGroupToday`) e a configuração de grupo através do gateway do módulo de associação, depois classifica violações:

- **Duro (sempre bloquear):** `checkinClosed`, `current + incoming > capacity`, contagem de convidados sobre `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — o quiosque mostra a sala nomeada.
- **Proporção (avisar ou bloquear):** voluntários não-recebidos em uma sala onde `volunteers < minVolunteers`, nenhum voluntário em tudo ou `children > volunteers × volunteerRatio`. A severidade segue a configuração `ratioEnforcement` por-igreja (`"warn"` padrão / `"block"`, editado em Manage Church B1Admin → Check-In, `CheckinSettingsEdit.tsx`). O modo de aviso retorna `409 { warning: true, error: "ratio", … }` a menos que o cliente resubmeta com `acknowledgeWarnings=true` — esse resubmit é a confirmação de equipe do quiosque.

### Elegibilidade idade/série (lado do quiosque)

A elegibilidade de sala é UI consultiva, avaliada no quiosque, não aplicada pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara a data de nascimento/série de uma pessoa contra o `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem de série: PreK, K, 1–12, Formado) e retorna `eligible` / `ineligible` / `unknown` — dados ausentes produzem `unknown` e nunca escondem uma sala. As idades e séries são computadas a partir da **data de promoção de série da igreja** (`gradePromotionDate` configuração, `"MM-DD"`, editado em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o quiosque a busca de `GET /attendance/checkin/settings`, e `resolveAsOfDate` escolhe a ocorrência mais recente em ou antes de hoje. O seletor de sala realça salas elegíveis e atenua inelegíveis; escolher uma sala atenuada requer uma confirmação de equipe.

### Retirada confiável e não autorizada

Pessoas de retirada são uma entidade de associação, por família: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD é `GET /membership/householdpickup/:householdId` (qualquer usuário de igreja autenticado, então quiosques podem ler) mais `POST` / `DELETE` barrados por `people.edit`. A equipe gerencia a lista na carta **Retirada** da página de pessoa (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, relacionamento e um chip de status Confiável/Não Autorizado.

No checkout (`B1Checkin/app/checkout.tsx`) o quiosque carrega a lista de retirada da família: entradas `trusted` renderizam como cartões de retirada tocáveis ao lado da grade de fotos de adultos da família, e um nome "Outro" digitado livremente é correspondido de forma fuzzy (Levenshtein, `src/helpers/PickupMatchHelper.ts`) contra entradas `notAuthorized` — uma correspondência bloqueia checkout com uma folha de aviso e um botão **Sobrescrever** da equipe. O sobrescrita é registrada na visita em si: ela posta `checkedOutBy` como `"OVERRIDE: {name}"` através do `POST /attendance/visits/checkout` normal, então pousa no registro de participação e no webhook `attendance.checkout` em vez de uma tabela de auditoria separada.

### Page-a-parent e transmissão de emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois endpoints de SMS:

- `POST /page` — `{ visitId, message }`: pagina os guardiões de uma criança verificada (tela de checkout do quiosque, modo tripulado).
- `POST /broadcast` — `{ serviceId, message }`: textos de cada adulto da família verificada para um serviço (configurações de admin do quiosque, atrás de uma folha type-`EMERGENCY`-to-confirm em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem adultos da família através do gateway de associação, depois entregam para **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — a porta entre módulos para o provedor de envio de mensagens configurado da igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há remetente SMS integrado). O gateway registra uma linha `sentText` mais entradas `deliveryLog` por destinatário e encadeia um lote em 500 destinatários; sem provedor configurado retorna `no_provider`, que o quiosque superficia como "Nenhum provedor de SMS configurado". O `dispatch()` do controlador deduplica números de telefone e pula pessoas sem celular ou `optedOut` definido, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que o quiosque possa mostrar o que foi pulado.

## O quiosque (B1Checkin)

As telas são arquivos expo-router sob `B1Checkin/app/`; estado entre telas vive em uma classe `CachedData` estática (`src/helpers/CachedData.ts`), não estado React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — pesquise por telefone (`GET /membership/people/search/phone?number=`, últimos 4 ou completo) ou por nome (`GET /membership/people/search?term=`). Selecionar uma correspondência carrega a família (`GET /membership/people/household/{householdId}`) e visitas existentes (`GET /attendance/visits/checkin`), semeando `pendingVisits` com seleções da semana passada.
2. **Revisão da família** (`app/household.tsx`, `src/components/MemberList.tsx`) — cada linha de membro mostra um crachá já verificado, crachá de alergia/`nametagNotes` e chips de sala atuais. Expandir um membro lista cada horário de serviço com um botão de sala mais os chips de tipo de check-in Membro / Convidado / Voluntário (`MemberServiceTimes.tsx`).
3. **Atribuição de grupo** (`app/selectGroup.tsx`) — uma árvore de categoria construída de `serviceTime.groups`, com salas elegíveis idade/série realçadas e inelegíveis escurecidas atrás de uma confirmação de equipe (consulte [Elegibilidade idade/série](#agegrade-eligibility-kiosk-side)); escolher uma sala escreve um `{ session: { serviceTimeId, groupId } }` visitSession nessa visita pendente da pessoa (`src/helpers/VisitSessionHelper.ts`). "Nenhum" limpa.
4. **Completo** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` com `pendingVisits` (cada marcado com seu `checkinType`), depois imprime etiquetas se uma impressora estiver configurada e retorna automaticamente para lookup. Uma resposta de capacidade `409` mostra a sala cheia/fechada nomeada; um aviso de proporção oferece uma confirmação de equipe que resubmete com `acknowledgeWarnings=true`.

A tela de **checkout** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres através de uma entrada focada automaticamente — então scanners de código de barras USB/Bluetooth funcionam sem câmera — ou um teclado na tela usando o mesmo alfabeto, submetendo automaticamente em 4 caracteres. Procura o código, mostra as crianças sendo retiradas e apresenta as **pessoas de retirada confiáveis** da família como cartões tocáveis ao lado de uma grade de fotos de adultos da família (mais uma opção "Outro" de texto livre que é verificada de forma fuzzy contra nomes não autorizados — consulte [Retirada confiável e não autorizada](#trusted-and-not-authorized-pickup)), depois posta `POST /attendance/visits/checkout` com o nome/id do seletor. Em modo tripulado, a tela também oferece **Paginar um pai** (`POST /attendance/checkin/page`) e uma **reimpressão de etiqueta de segurança** — `reprint()` reconstrói as etiquetas da família com `LabelHelper.getAllLabelsFor(...)` e as alimenta através do mesmo pipeline `PrintUI` como check-in.

A personalidade da estação é um sinalizador AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado em `app/adminSettings.tsx`). O modo tripulado adiciona o ponto de entrada de checkout na tela de lookup e edição de perfil por membro (`POST /membership/people`) na tela da família. O endurecimento do quiosque é integrado: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) porta as telas de admin e impressora, a tela de admin abre apenas via 7 toques rápidos no logotipo do cabeçalho e uma tela de atração inativa (`src/hooks/useInactivityTimer.ts`) assume entre famílias.

## Autoatendimento (B1App)

Os membros fazem check-in do portal b1.church em `https://suanomeireja.b1.church/mobile/checkin` (roteado por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Requer um usuário conectado e segue os mesmos quatro passos que o quiosque — serviços → família → grupos → completo — contra pontos finais idênticos, com estado mantido em `B1App/src/helpers/CheckinHelper.ts`. As diferenças em relação ao quiosque: a família vem do `householdId` do usuário conectado (nenhuma etapa de pesquisa) e não há impressão de etiqueta — em vez disso a tela de conclusão mostra o código de segurança do lote como um QR (`qrcode.react`) com uma dica "mostrar isto em uma estação de check-in". Se a família já foi verificada quando a página carrega, um botão "Mostrar código de check-in" re-exibe o QR do `securityCode` da visita existente. O check-in é registrado imediatamente no momento do envio (não há estado pendente); o QR apenas impulsiona a impressão de etiqueta no quiosque.

**Impressão de etiqueta de telefone para quiosque** (`B1Checkin/app/scan.tsx`, alcançado do botão "Escanear código" na tela de lookup): o quiosque abre um `expo-camera` `CameraView` (virado para frente por padrão, flip-able) escaneando códigos QR. Uma carga escaneada é aceita quando é um código de 4 caracteres nu no alfabeto de código de segurança, então tanto o QR B1App quanto um bloco QR de etiqueta impressa funcionam. A tela então segue o caminho de reimpressão de checkout — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — e retorna para lookup. Nenhuma escrita de participação acontece no momento do scan; etiquetas somente. Códigos sem visitas ativas, estações sem impressora e grupos sem etiqueta cada um superficia um toast e retorna para lookup.

Tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com B1Admin.

## Participação do lado administrativo (B1Admin)

- **Configuração** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renderiza a árvore de estrutura e cria serviços (`ServiceEdit.tsx`) e horários de serviço (`ServiceTimeEdit.tsx`). Os dados do campus vêm de associação via gancho `useCampuses()`.
- **Participação manual** vive no lado de Grupos, não na seção de participação: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`) e marca pessoas presentes via `POST /attendance/visitsessions/log`, que encontra ou cria a visita para essa pessoa e sessão. Os líderes de grupo podem registrar participação para seus próprios grupos sem a permissão `attendance.edit` — os controladores verificam `au.leaderGroupIds`.
- **Relatórios** — participação de tendência e participação em grupo são relatórios definidos por servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` contra ReportingApi); histórico por pessoa é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de etiqueta

### Modelos e o designer

As igrejas projetam suas próprias etiquetas em B1Admin em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, alcançado da página de configurações de Check-In). Um modelo é uma linha `labelTemplates` cuja `content` é uma matriz JSON de blocos — `text`, `field`, `barcode`, `qrcode` ou `box` — cada um posicionado em coordenadas de porcentagem com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`) e condições de visibilidade opcionais (por exemplo, renderize apenas a caixa de alergia quando `person.nametagNotes` não estiver vazio). Dois `labelType`s existem: `nametag` (um por pessoa verificada; campos como `person.displayName`, `sessions`, `securityCode`) e `pickup` (um por família; campos como `children`, `childrenAllergies`). O servidor impõe um único padrão por tipo por Igreja (`LabelTemplateController.save`). O designer navega modelos iniciais espelhando as etiquetas incluídas no quiosque e visualiza contra dados de amostra.

### Renderização e impressão no quiosque

Na conclusão do check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir das bandeiras de grupo em cada visita pendente: etiquetas de nome para grupos `printNametag` mais uma etiqueta de retirada de família se qualquer visita atingir um grupo `parentPickup`. O código de segurança da resposta de check-in vai em etiquetas de nome infantil e a etiqueta de retirada; etiquetas de nome adulto imprimem sem código. Se a chiesa tem modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma blocos + contexto de campo em um documento HTML independente; caso contrário etiquetas HTML incluídas em `B1Checkin/assets/labels/` são usadas com substituição de espaço reservado.

Os códigos de barras são gerados como SVG inline por codificadores TypeScript puro em `B1Checkin/src/helpers/barcode.ts` — tabelas de padrão Code 39 e Code 128 (conjunto de código B com checksum mod-103), mais QR via pacote `qrcode`. **Esses codificadores são intencionalmente duplicados em B1Admin** (`LabelEditor.tsx` embutido as mesmas tabelas, anotado em um comentário de código) para que visualizações de designer sejam fielmente pixel para saída do quiosque; uma mudança em uma deve ser espelhada na outra.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML em um `WebView`, captura-a como JPG via `react-native-view-shot` e passa as URIs de imagem para o módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Notas |
|-------|---------|-----|--------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede série QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas de corte de forma 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta de rede + impressão de imagem TCP/ZPL |

A seleção de impressora vive em `app/printers.tsx` (varredura de rede retorna entradas `brand~model~ip`; a escolha persiste em AsyncStorage) e `src/helpers/PrinterLog.ts` mantém um log de diagnóstico no dispositivo superficiado através de um ponto de status ao vivo no cabeçalho do quiosque.

## Registro de convidado

Dois caminhos criam uma pessoa no meio do check-in:

- **No quiosque** — o "Adicionar convidado" da tela da família abre `B1Checkin/app/addGuest.tsx`, que primeiro pesquisa `GET /membership/people/search?term=` por uma correspondência não-membro existente e caso contrário cria uma com `POST /membership/people`, anexada à família atual. O convidado flui através da atribuição de grupo como qualquer membro.
- **Autoserviço via QR** — quando a configuração de igreja `enableQRGuestRegistration` está ativa (configurada em configurações de Check-In B1Admin, lida de `GET /membership/settings/public/{churchId}`), a tela de lookup do quiosque mostra um código QR vinculando a `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) deixa uma família visitante se registrar em seu próprio telefone através do ponto final anônimo `POST /membership/people/guest-register`, mantendo a fila do quiosque movida.

## Páginas Relacionadas

- [Endpoints de Participação](../api/endpoints/attendance) -- Superfície REST completa para campi, serviços, sessões, visitas e sessões de visita
- [Endpoints de Associação](../api/endpoints/membership) -- Pessoas, famílias e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded` e `attendance.checkout`
- [Estrutura de Módulo](../api/module-structure) -- Como o módulo de participação é organizado do lado servidor
