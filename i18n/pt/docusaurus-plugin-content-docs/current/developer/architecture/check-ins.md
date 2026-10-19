---
title: "Check-ins"
---

# Check-ins

<div class="article-intro">

O check-in é um único sistema com três portas de entrada: o aplicativo B1Checkin para totens, com ou sem atendente, o self check-in dentro do portal de membros do B1App e a presença na visão administrativa do B1Admin. Todas as três gravam no mesmo módulo de presença da Api principal, e o roteamento das salas é feito exclusivamente pelos Grupos -- não existe uma entidade separada de "locais" ou "salas". Uma camada de segurança infantil fica por cima: tipos de check-in por visita, bloqueios de capacidade e de proporção de voluntários no servidor, verificação de elegibilidade por idade/série no totem, verificação de pessoas autorizadas na retirada no check-out e chamada de pais pelo serviço de mensagens de texto da igreja. Esta página mapeia o modelo de dados, os fluxos de check-in, a camada de segurança e o pipeline de impressão de etiquetas.

</div>

## Visão geral

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

| Superfície | Repositório | Stack | Função |
|---------|------|-------|------|
| Totem | `B1Checkin` | Expo / React Native, roteamento de arquivos com expo-router; builds EAS para Android, Amazon Fire e iOS; atualizações OTA via `expo-updates` | Estação com ou sem atendente, com impressão de etiquetas e check-out verificado |
| Self check-in | `B1App` | Next.js (portal de membros b1.church) | Membros logados fazem o check-in da família pelo celular; sem impressão |
| Administração | `B1Admin` | React SPA | Configura a estrutura dos cultos, associa grupos aos horários de culto, cria modelos de etiqueta, registra presenças manuais e gera relatórios |

As três superfícies chamam os mesmos dois módulos da API pelo `ApiHelper`: **MembershipApi** (`/membership`) para pessoas, famílias e grupos; **AttendanceApi** (`/attendance`) para tudo o que está abaixo.

## Modelo de dados (`Api/src/modules/attendance`)

| Entidade / tabela | Campos principais | Significado |
|----------------|-----------|---------|
| `campuses` | name, address | Obsoleta aqui -- os campi são mantidos no módulo de membros (`/membership/campuses`); a cópia de presença fica congelada, somente leitura, para leitores legados (`models/Campus.ts`) |
| `services` | campusId, name | Um encontro recorrente, por exemplo "Culto de Domingo de Manhã" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Um horário dentro de um culto, por exemplo "9:00" (`models/ServiceTime.ts`). As colunas de agenda são opcionais (migração `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) e definem a [janela de check-in](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabela de junção: quais grupos (salas de aula) se reúnem em quais horários de culto (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Um encontro de um grupo em uma data -- criado de forma preguiçosa no momento do check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Uma pessoa presente em uma data (`models/Visit.ts`). `checkinType` é `member` / `guest` / `volunteer` (NULL = membro legado), definido pelo totem e usado pelos bloqueios de capacidade e proporção |
| `visitSessions` | visitId, sessionId | Quais sessões uma visita cobre -- uma criança feita check-in em dois horários de culto recebe duas linhas (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blocos JSON) | Layouts de etiqueta personalizáveis (`models/LabelTemplate.ts`) |

### Como um check-in concluído é persistido

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) trata `POST /attendance/visits/checkin?serviceId=&peopleIds=`. O corpo é um array de objetos `Visit`, cada um carregando `visitSessions` cuja `session` embutida informa apenas um par `(serviceTimeId, groupId)`. Em seguida, o servidor:

1. **Verifica capacidade e proporções antes de qualquer gravação.** `evaluateGates()` → `CheckinGateHelper.evaluate()` verifica a capacidade de cada sala de destino, a capacidade de convidados, o indicador de fechada e a proporção de voluntários em relação à ocupação atual. O postCheckin **não é transacional**, então a verificação precisa ocorrer antes do primeiro save -- uma violação grave retorna um 409 indicando a(s) sala(s) envolvida(s) e nada é gravado. Veja [Bloqueios de capacidade e proporção de voluntários](#capacity-and-volunteer-ratio-gates).
2. **Resolve as sessões de forma preguiçosa.** `getSessionId()` encontra ou cria a linha de `sessions` para `(groupId, serviceTimeId, hoje)` -- os ids de sessão ficam em cache no processo, por data. Novas sessões emitem um webhook `session.created`. O laço é um `for..of` com await -- um `forEach(async …)` com disparar-e-esquecer anterior competia com o save e gravava sessionIds NULL na criação da primeira sessão (corrigido; anotado em um comentário de código no laço).
3. **Substitui os registros do dia.** Quaisquer visitas existentes dessas pessoas naquele culto, hoje, são excluídas junto com seus visitSessions, e então o conjunto enviado é salvo. Refazer o check-in de uma família é, portanto, uma operação idempotente de "este é o estado atual", não um acréscimo. Passar `?checkDuplicates=true` no lugar retorna `{ duplicates: [personId…] }` sem gravar, e é assim que o totem avisa antes de sobrescrever.
4. **Gera um código de segurança por lote.** `SecurityCodeHelper.generate()` produz um código de 4 caracteres a partir do alfabeto `23456789BCDFGHJKLMNPQRSTVWXYZ` (sem vogais nem caracteres ambíguos, para que os códigos não formem palavras nem sejam lidos de forma errada). O servidor tenta novamente em caso de colisão com as visitas abertas do mesmo dia da mesma igreja e grava o código em cada visita do lote.
5. **Retorna `{ streaks, securityCode }`.** `streaks` mapeia personId para a contagem de semanas consecutivas de presença; o totem comemora marcos (a cada 5ª semana) com confete.

Cada visita salva também emite um webhook `attendance.recorded`. O lado de leitura, `GET /attendance/visits/checkin`, retorna as visitas das pessoas a partir da **última data registrada** -- se essa foi uma semana anterior, os ids são removidos, e o cliente recebe uma cópia preenchida com as seleções de salas da semana passada, que serão salvas como novos registros.

### Check-out

Dois endpoints completam o ciclo (`VisitController`):

- `GET /attendance/visits/code/:code` -- as visitas de hoje ainda não retiradas que possuem esse código de segurança, com as sessões preenchidas.
- `POST /attendance/visits/checkout` -- corpo `{ visitIds, checkedOutBy?, checkedOutById? }`; registra `checkoutTime` e quem retirou a criança, e emite um webhook `attendance.checkout` por visita.

Permissões: os totens se autenticam com `attendance.checkin`, que concede exatamente a superfície de check-in/check-out/modelos de etiqueta; `attendance.view`/`attendance.edit` cobrem relatórios e lançamentos manuais; a estrutura (cultos, horários de culto, associações de grupos) exige `services.edit`. O self check-in de membros (B1App) não exige nenhuma permissão: qualquer usuário autenticado com uma pessoa vinculada na igreja pode chamar `GET`/`POST /attendance/visits/checkin`, e o servidor restringe os `personId`s enviados à família do próprio usuário (403 caso contrário) -- essa barreira é o que mantém os `securityCode`s de outras famílias ilegíveis. Ser membro é a permissão; se os membros *veem* o recurso é controlado pelas abas de navegação do B1App da igreja. Os demais endpoints de check-in (`code/:code`, `checkout`, `guardians`, `CheckinController`) continuam restritos a totens e à equipe.

## Os grupos direcionam o roteamento das salas

Não existe uma entidade de sala ou de classe em nenhum lugar do sistema. Uma "sala" é um **grupo** de membros com `trackAttendance` ativado, vinculado a um ou mais horários de culto por meio de `groupServiceTimes`. Os campos do grupo (em `Api/src/modules/membership/models/Group.ts`) que moldam o comportamento do totem:

| Campo | Efeito |
|------|--------|
| `trackAttendance` | O grupo participa da presença; a árvore de configuração do B1Admin marca como não atribuídos os grupos com `trackAttendance` que não têm nenhuma linha em `groupServiceTimes` |
| `parentPickup` | Marca uma sala infantil: fazer check-in nela torna a visita uma visita "infantil", que imprime uma etiqueta de retirada para a família e coloca o código de segurança na etiqueta de identificação |
| `printNametag` | Se os check-ins neste grupo imprimem uma etiqueta de identificação |
| `capacity` / `guestCapacity` / `checkinClosed` | Limites de capacidade das salas e uma chave de "fechada" definitiva, aplicados no servidor pelo bloqueio de check-in (editados em "Capacidade de check-in" nas configurações do grupo no B1Admin) |
| `volunteerRatio` / `minVolunteers` | Proporção de crianças por voluntário e número mínimo de voluntários, aplicados conforme a configuração `ratioEnforcement` da igreja |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Limites de elegibilidade por idade/série avaliados no totem para destacar ou esmaecer as salas |

Todos os clientes desnormalizam da mesma forma (por exemplo, `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): carregam em paralelo `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` e `GET /membership/groups`; em seguida, para cada horário de culto, reúnem em `serviceTime.groups` os grupos cuja linha de `groupServiceTimes` aponta para ele. Esse array é o que o seletor de salas exibe, organizado pela `categoryName` do grupo.

As associações são editadas na página do grupo no B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), e a árvore completa Campus → Culto → Horário de culto → Grupo é visualizada em `B1Admin/src/attendance/components/AttendanceSetup.tsx` por meio de `GET /attendance/attendancerecords/tree`.

:::info
Como os grupos são a única fonte da verdade, a mesma associação de grupos alimenta o roteamento do totem, as listas de presença no estilo chamada nas páginas de grupos do B1Admin e os relatórios de presença -- associar um grupo a um horário de culto é o único passo necessário para torná-lo um destino de check-in.
:::

## Segurança infantil

### Tipos de check-in

Toda visita carrega um `checkinType` -- `member`, `guest` ou `volunteer` (NULL significa legado/membro; migração `tools/migrations/attendance/2026-07-03_checkin_type.ts`). O tipo é escolhido **no totem**: os chips Membro / Convidado / Voluntário na linha expandida do membro (`B1Checkin/src/components/MemberServiceTimes.tsx`), gravados em cada visita pendente ao concluir (`app/checkinComplete.tsx`, com padrão `member`). O servidor usa esse tipo no bloqueio -- voluntários contam para a cobertura da proporção em vez de contar contra a capacidade, e convidados contam contra `guestCapacity`.

### Bloqueios de capacidade e de proporção de voluntários {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) é executado dentro do `postCheckin`, antes de qualquer gravação (o endpoint não é transacional, então bloquear antes de salvar é o mecanismo de correção). Ele carrega a ocupação atual de cada grupo de destino (`VisitRepo.countActiveByGroupToday`) e a configuração do grupo pelo gateway do módulo de membros, e então classifica as violações:

- **Graves (sempre bloqueiam):** `checkinClosed`, `atual + entrando > capacity`, quantidade de convidados acima de `guestCapacity`. O lote é rejeitado com `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` -- o totem mostra a sala envolvida.
- **Proporção (avisar ou bloquear):** não voluntários entrando em uma sala onde `volunteers < minVolunteers`, sem nenhum voluntário, ou `children > volunteers × volunteerRatio`. A severidade segue a configuração `ratioEnforcement` da igreja (`"warn"` por padrão / `"block"`, editada em B1Admin Gerenciar Igreja → Check-In, `CheckinSettingsEdit.tsx`). No modo de aviso, retorna `409 { warning: true, error: "ratio", … }`, a menos que o cliente reenvie com `acknowledgeWarnings=true` -- esse reenvio é a confirmação da equipe no totem.

### Janelas de check-in agendadas {#scheduled-check-in-windows}

Um horário de culto pode ter uma agenda semanal opcional (`dayOfWeek` de 0 a 6, sendo 0 = domingo; `startTime`/`endTime` em `HH:mm`; `checkinOpenMinutes`; `checkinCloseMinutes`), editada no formulário de horário de culto em **Presença → Configuração** no B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Agenda de check-in"). `CheckinGateHelper.hasSchedule()` considera um horário de culto agendado somente quando `dayOfWeek` e `startTime` estão definidos; horários sem agenda nunca são limitados por tempo. `isServiceTimeOpen()` calcula a janela no horário local da igreja (`DateHelper.toChurchTime`). O fuso horário é o `timeZone` da igreja; igrejas sem fuso definido usam o primeiro campus não removido que tenha um `timezone` (`MembershipModuleGateway.loadCampusTimeZone`) e, só então, `America/New_York`. Tanto a listagem quanto o caminho de envio abaixo resolvem o fuso da mesma forma, a partir de `checkinOpenMinutes` antes do início até `checkinCloseMinutes` depois do término (ou depois do início, quando não há término), tratando janelas que atravessam a meia-noite ou a virada da semana.

A janela é aplicada em dois lugares:

- **Listagem:** `GET /attendance/servicetimes` marca cada linha com um booleano calculado `checkinOpen`. O self check-in do B1App (`CheckinPage.tsx`) e o seletor de cultos do B1Checkin (`app/services.tsx`) removem os horários em que `checkinOpen === false` e exibem "O check-in não está aberto para este culto no momento." quando um culto tem horários, mas nenhum está aberto (o totem oferece um botão Voltar para escolher outro culto).
- **Envio:** dentro de `evaluateGates()`, antes da avaliação de capacidade/proporção, `findClosedServiceTimeGroups()` rejeita o lote com `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` se o horário de culto de alguma sessão de destino estiver fora da janela. O B1Checkin exibe isso pela tela de bloqueio grave com o motivo "o check-in não está aberto agora" (violações de capacidade continuam exibindo "a sala está cheia ou fechada").

### Elegibilidade por idade/série (no totem) {#agegrade-eligibility-kiosk-side}

A elegibilidade das salas é apenas uma orientação na interface, avaliada no totem, e não aplicada pelo servidor. `B1Checkin/src/helpers/EligibilityHelper.ts` compara a data de nascimento/série da pessoa com `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` do grupo (ordem das séries: PreK, K, 1–12, Graduated) e retorna `eligible` / `ineligible` / `unknown` -- dados ausentes resultam em `unknown` e nunca ocultam uma sala. Idades e séries são calculadas na **data de promoção de série** da igreja (configuração `gradePromotionDate`, no formato `"MM-DD"`, editada em `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); o totem a obtém em `GET /attendance/checkin/settings`, e `resolveAsOfDate` escolhe a ocorrência mais recente em ou antes de hoje. O seletor de salas destaca as salas elegíveis e esmaece as inelegíveis; escolher uma sala esmaecida exige uma confirmação da equipe.

### Retirada confiável e não autorizada {#trusted-and-not-authorized-pickup}

As pessoas autorizadas a retirar são uma entidade do módulo de membros, por família: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, personId opcional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). O CRUD é feito por `GET /membership/householdpickup/:householdId` (qualquer usuário autenticado da igreja, para que os totens possam ler) mais `POST` / `DELETE`, protegidos por `people.edit`. A equipe gerencia a lista no cartão **Retirada** da página da pessoa (`B1Admin/src/people/components/PickupPeople.tsx`) -- foto, parentesco e um chip de status Confiável / Não autorizado.

No check-out (`B1Checkin/app/checkout.tsx`), o totem carrega a lista de retirada da família: as entradas `trusted` aparecem como cartões tocáveis de retirada junto com a grade de fotos dos adultos da família, e um nome digitado livremente na opção "Outro" é comparado de forma aproximada (Levenshtein, `src/helpers/PickupMatchHelper.ts`) com as entradas `notAuthorized` -- uma correspondência bloqueia o check-out com uma folha de aviso e um botão **Substituir** da equipe. A substituição é registrada na própria visita: envia `checkedOutBy` como `"OVERRIDE: {name}"` pelo `POST /attendance/visits/checkout` comum, então aparece no registro de presença e no webhook `attendance.checkout`, em vez de em uma tabela de auditoria separada.

### Chamada de pais e transmissão de emergência

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) expõe dois endpoints de SMS:

- `POST /page` -- `{ visitId, message }`: envia mensagem aos responsáveis de uma criança com check-in (tela de check-out do totem, no modo com atendente).
- `POST /broadcast` -- `{ serviceId, message }`: envia mensagem de texto aos adultos de todas as famílias com check-in em um culto (configurações de administrador do totem, atrás de uma folha de confirmação que exige digitar `EMERGENCY` em `B1Checkin/app/adminSettings.tsx`).

Ambos resolvem os adultos da família pelo gateway de membros e, em seguida, repassam o envio para o **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) -- a porta entre módulos para o serviço de mensagens de texto configurado pela igreja (`@churchapps/texting`: TextInChurch, Clearstream ou MutualMinistry; não há um remetente de SMS embutido). O gateway registra uma linha `sentText` e entradas `deliveryLog` por destinatário, e limita cada lote a 500 destinatários; sem provedor configurado, retorna `no_provider`, que o totem apresenta como "Nenhum provedor de SMS configurado". O `dispatch()` do controlador remove números de telefone duplicados e ignora pessoas sem celular ou com `optedOut` marcado, retornando `{ sent, failed, skippedOptedOut, skippedNoPhone }` para que o totem mostre o que foi ignorado.

## O totem (B1Checkin)

As telas são arquivos do expo-router em `B1Checkin/app/`; o estado compartilhado entre telas fica em uma classe estática `CachedData` (`src/helpers/CachedData.ts`), e não em estado do React.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Busca** (`app/lookup.tsx`) -- pesquisa por telefone (`GET /membership/people/search/phone?number=`, últimos 4 dígitos ou completo) ou por nome (`GET /membership/people/search?term=`). Ao selecionar uma correspondência, carrega a família (`GET /membership/people/household/{householdId}`) e as visitas existentes (`GET /attendance/visits/checkin`), preenchendo `pendingVisits` com as seleções da semana passada.
2. **Revisão da família** (`app/household.tsx`, `src/components/MemberList.tsx`) -- cada linha de membro mostra um selo de já feito check-in, um selo de alergia/`nametagNotes` e os chips das salas atuais. Ao expandir um membro, lista-se cada horário de culto com um botão de sala e os chips de tipo de check-in Membro / Convidado / Voluntário (`MemberServiceTimes.tsx`). Abaixo do nome de cada horário de culto, `ServiceTimeHelper.getGroupSummary()` mostra os grupos oferecidos ali (os nomes em `serviceTime.groups`, sem espaços extras, sem duplicatas sem diferenciar maiúsculas de minúsculas, separados por vírgula); nada é exibido quando o horário não tem grupos.
3. **Associação ao grupo** (`app/selectGroup.tsx`) -- uma árvore de categorias construída a partir de `serviceTime.groups`, com as salas elegíveis por idade/série destacadas e as inelegíveis esmaecidas atrás de uma confirmação da equipe (veja [Elegibilidade por idade/série](#agegrade-eligibility-kiosk-side)); escolher uma sala grava um visitSession `{ session: { serviceTimeId, groupId } }` na visita pendente daquela pessoa (`src/helpers/VisitSessionHelper.ts`). "Nenhum" limpa a seleção.
4. **Concluir** (`app/checkinComplete.tsx`) -- `POST /attendance/visits/checkin` com `pendingVisits` (cada uma com seu `checkinType`), depois imprime as etiquetas se houver uma impressora configurada e volta automaticamente para a busca. Uma resposta `409` de capacidade ou `notOpen` mostra a sala envolvida com o motivo (cheia/fechada, ou check-in não aberto); um aviso de proporção oferece uma confirmação da equipe que reenvia com `acknowledgeWarnings=true`.

A tela de **check-out** (`app/checkout.tsx`) aceita o código de segurança de 4 caracteres por um campo de entrada com foco automático -- assim, leitores de código de barras USB/Bluetooth funcionam sem câmera -- ou por um teclado numérico na tela que usa o mesmo alfabeto, enviando automaticamente ao atingir 4 caracteres. Um botão **Escanear** abre uma folha com a câmera compartilhada `src/components/CodeScanner.tsx` (câmera traseira por padrão, aceitando QR, Code 128 e Code 39), para que estações sem leitor de código de barras consigam ler a etiqueta de retirada; um código escaneado segue o mesmo caminho `handleCode()` da entrada digitada. A tela busca o código, mostra as crianças que estão sendo retiradas e apresenta as **pessoas autorizadas a retirar da família** como cartões tocáveis, junto com uma grade de fotos dos adultos da família (mais a opção "Outro", com texto livre, comparada de forma aproximada com os nomes não autorizados -- veja [Retirada confiável e não autorizada](#trusted-and-not-authorized-pickup)), e então envia `POST /attendance/visits/checkout` com o nome/id escolhido. No modo com atendente, a tela também oferece **Chamar um responsável** (`POST /attendance/checkin/page`) e uma **reimpressão da etiqueta de segurança** -- `reprint()` reconstrói as etiquetas da família com `LabelHelper.getAllLabelsFor(...)` e as envia pelo mesmo pipeline `PrintUI` do check-in.

O comportamento da estação é definido por um flag do AsyncStorage `@StationMode` (`"self"` | `"manned"`, alternado em `app/adminSettings.tsx`). O modo com atendente adiciona o ponto de entrada de check-out na tela de busca e a edição de perfil por membro (`POST /membership/people`) a partir da tela da família. O totem tem proteções integradas: um PIN opcional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) protege as telas de administração e de impressoras, a tela de administração só abre com 7 toques rápidos no logo do cabeçalho, e uma tela de atração ociosa (`src/hooks/useInactivityTimer.ts`) assume entre uma família e outra.

## Self check-in (B1App)

Os membros fazem o check-in pelo portal b1.church, na tela `/mobile/checkin` (roteada por `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` para `screens/CheckinPage.tsx`). Ela exige um usuário logado e percorre as mesmas quatro etapas do totem -- cultos → família → grupos → concluir -- com os mesmos endpoints, com o estado mantido em `B1App/src/helpers/CheckinHelper.ts`. As diferenças em relação ao totem: a família vem do `householdId` do próprio usuário logado (sem etapa de busca), e não há impressão de etiquetas -- em vez disso, a tela de conclusão mostra o código de segurança do lote como um QR (`qrcode.react`) com a dica "apresente isto em uma estação de check-in". Se a família já tiver feito check-in quando a página carrega, um botão "Mostrar código de check-in" exibe novamente o QR a partir da primeira visita existente (de `GET /attendance/visits/checkin`) que tenha um `securityCode`. O check-in é registrado imediatamente no envio (não há estado pendente); o QR serve apenas para a impressão de etiquetas no totem.

**Impressão de etiquetas a partir do celular** (`B1Checkin/app/scan.tsx`, acessada pelo botão "Escanear código" do QR na tela de busca): o totem exibe o `CodeScanner` (um `CameraView` do `expo-camera`, com câmera frontal por padrão e possibilidade de alternar) procurando QR codes. `ScanCodeHelper.parse()` aceita um conteúdo somente quando ele é um código bruto de 4 caracteres do alfabeto de códigos de segurança, e `ScanCodeHelper.isRepeat()` ignora o mesmo código por 4 segundos, de modo que tanto o QR do B1App quanto o bloco de QR de uma etiqueta impressa funcionam. A tela então segue o mesmo caminho de reimpressão do check-out -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- e volta para a busca. Nenhuma gravação de presença ocorre na leitura; apenas etiquetas. Códigos sem visitas ativas, estações sem impressora e grupos sem etiqueta exibem, cada um, um aviso rápido e retornam para a busca.

Tipos e `ApiHelper`/`ArrayHelper` vêm de `@churchapps/helpers` e `@churchapps/apphelper`; nenhum componente React é compartilhado com o B1Admin.

## Presença na administração (B1Admin)

- **Configuração** -- `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) exibe a árvore da estrutura e cria cultos (`ServiceEdit.tsx`) e horários de culto (`ServiceTimeEdit.tsx`). Os dados de campus vêm do módulo de membros pelo hook `useCampuses()`.
- **Presença manual** fica na área de Grupos, não na seção de presença: `B1Admin/src/groups/components/GroupSessionsTab.tsx` cria sessões (`POST /attendance/sessions`; ao adicionar, `SessionEdit.tsx` pode incluir uma sessão para cada outro grupo que compartilhe o horário de culto escolhido, pulando os grupos que já têm uma sessão naquela data) e marca as pessoas como presentes por `POST /attendance/visitsessions/log`, que encontra ou cria a visita daquela pessoa e sessão. Líderes de grupo podem registrar presença nos próprios grupos sem a permissão `attendance.edit` -- os controladores verificam `au.leaderGroupIds`.
- **Relatórios** -- a tendência de presença e a presença por grupo são relatórios definidos no servidor (`B1Admin/src/components/reporting/ReportWithFilter.tsx` com o ReportingApi; definições em `Api/reports/*.json`). Ambos recebem `startDate`/`endDate` (data final inclusiva); o relatório de tendência usa por padrão de um ano atrás até hoje e acrescenta uma coluna `sessionDates` por semana, e a árvore na tela de presença por grupo inclui o `checkinTime` de cada visita e o `membershipStatus` da pessoa. O CSV de presença por grupo vem do relatório complementar `groupAttendanceDownload`, transformado pelo `GroupAttendanceDownloadHelper` em uma linha por membro do grupo, com uma coluna de presente/ausente para cada sessão datada; o histórico por pessoa é `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Impressão de etiquetas

### Modelos e o editor

As igrejas criam suas próprias etiquetas no B1Admin, em `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, acessada pela página de configurações de Check-In). Um modelo é uma linha de `labelTemplates` cujo `content` é um array JSON de blocos -- `text`, `field`, `barcode`, `qrcode` ou `box` -- cada um posicionado em coordenadas percentuais, com fonte, alinhamento, simbologia (`code39`/`code128`/`qr`) e condições de visibilidade opcionais (por exemplo, exibir a caixa de alergia somente quando `person.nametagNotes` não estiver vazio). Existem dois `labelType`s: `nametag` (um por pessoa com check-in; campos como `person.displayName`, `sessions`, `securityCode` e `person.isBirthdayWeek` -- `"true"` quando o mês/dia do aniversário está a até 3 dias de hoje, inclusive atravessando o fim do ano, calculado por `LabelHelper.isBirthdayWithin()`) e `pickup` (um por família; campos como `children`, `childrenAllergies`). O servidor impõe um único padrão por tipo e por igreja (`LabelTemplateController.save`). O editor traz modelos iniciais que espelham as etiquetas embutidas do totem e exibe prévias com dados de exemplo.

### Renderização e impressão no totem

Ao concluir o check-in, `B1Checkin/src/helpers/LabelHelper.ts` decide o que imprimir a partir dos flags de grupo de cada visita pendente: etiquetas de identificação para grupos com `printNametag`, mais uma etiqueta de retirada da família se alguma visita passou por um grupo `parentPickup`. Visitas com `checkinType` `volunteer` são ignoradas por `LabelHelper.selectChildVisits()`, então um voluntário da creche em uma sala de Retirada dos Pais nunca dispara uma etiqueta de retirada. O código de segurança da resposta do check-in vai para as etiquetas de identificação das crianças e para a etiqueta de retirada; as etiquetas de identificação dos adultos são impressas sem código. Se a igreja tiver modelos, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) transforma os blocos e um contexto de campos em um documento HTML independente; caso contrário, são usadas as etiquetas HTML embutidas em `B1Checkin/assets/labels/`, com substituição de marcadores.

Os códigos de barras são gerados como SVG embutido por codificadores em TypeScript puro em `B1Checkin/src/helpers/barcode.ts` -- tabelas de padrões do Code 39 e tabelas de larguras do Code 128 (conjunto B com checksum mod-103), além de QR pelo pacote `qrcode`. **Esses codificadores estão intencionalmente duplicados no B1Admin** (`LabelEditor.tsx` incorpora as mesmas tabelas, conforme anotado em um comentário de código), para que as prévias do editor sejam fiéis, pixel a pixel, à saída do totem; qualquer alteração em um deve ser replicada no outro.

O pipeline de impressão (`src/components/PrintUI.tsx`) renderiza cada etiqueta HTML em um `WebView`, captura-a como JPG com `react-native-view-shot` e entrega as URIs das imagens ao módulo Expo nativo **printer-helper** (`B1Checkin/modules/printer-helper/`). O módulo expõe `scan()`, `checkInit()`, `printUris()` e eventos de status, com um provedor por marca em ambas as plataformas:

| Marca | Android | iOS | Observações |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (SDK de impressão Brother) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Impressoras de rede da série QL (QL-800/810W/820NWB/1100/1110NWB…), etiquetas recortadas de 29×90, o padrão recomendado |
| Zebra | `ZebraProvider.kt` (SDK Link-OS) | `ZebraProvider.swift` + `ZebraBridge` | Descoberta na rede + impressão de imagem TCP/ZPL |

A seleção de impressora fica em `app/printers.tsx` (a busca na rede retorna entradas `brand~model~ip`; a escolha é gravada no AsyncStorage), e `src/helpers/PrinterLog.ts` mantém um registro de diagnóstico no próprio dispositivo, exibido por um indicador de status ao vivo no cabeçalho do totem.

## Cadastro de visitantes

Dois caminhos criam uma pessoa durante o check-in:

- **No totem** -- o botão "Adicionar visitante" da tela da família abre `B1Checkin/app/addGuest.tsx`, que primeiro busca `GET /membership/people/search?term=` por uma correspondência existente de não membro e, caso contrário, cria uma com `POST /membership/people`, vinculada à família atual. O visitante então passa pela associação a grupos como qualquer membro.
- **Autoatendimento por QR** -- quando a configuração da igreja `enableQRGuestRegistration` está ativa (configurada nas configurações de Check-In do B1Admin e lida de `GET /membership/settings/public/{churchId}`), a tela de busca do totem exibe um QR code que aponta para `https://{subdomain}.b1.church/guest-register?serviceId=`. Essa página do B1App (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) permite que uma família visitante se cadastre pelo próprio celular, pelo endpoint anônimo `POST /membership/people/guest-register`, mantendo a fila do totem andando. A folha do QR também tem um botão **Cadastrar aqui**, que abre a mesma página no próprio totem (`app/guestRegister.tsx`) em um `WebView` anônimo, sem cache; `src/helpers/GuestRegisterHelper.ts` monta a URL tanto para o QR quanto para o WebView e bloqueia a navegação para fora de `https://{subdomain}.b1.church/guest-register`. A tela volta para a busca ao tocar em **Concluído**, ao voltar ou após 120 segundos de inatividade (a digitação no formulário é repassada do WebView como atividade), desmontando o WebView para que os dados de uma família nunca cheguem à seguinte.

## Páginas relacionadas

- [Endpoints de presença](../api/endpoints/attendance) -- A API REST completa para campi, cultos, sessões, visitas e visitas por sessão
- [Endpoints de membros](../api/endpoints/membership) -- Pessoas, famílias e grupos
- [Webhooks](../api/webhooks) -- Os eventos `session.created`, `attendance.recorded` e `attendance.checkout`
- [Estrutura do módulo](../api/module-structure) -- Como o módulo de presença é organizado no servidor
