---
title: "데이터 가져오기"
---

# 데이터 가져오기

<div class="article-intro">

B1 Transfer 도구를 사용하면 기존 데이터를 B1으로 쉽게 가져올 수 있습니다. 스프레드시트에서 새로 시작하든, 다른 교회 관리 플랫폼에서 옮겨 오든, 헌금 기록을 가져오든 상관없습니다. 언제든지 데이터를 내보내거나 백업하는 데에도 사용할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Settings**에 접근할 수 있는 활성 B1 Admin 계정이 필요합니다.
- 시작하기 전에 이전 시스템에서 데이터를 내보내 준비해 두세요.
- 이 도구는 초기 데이터 이전을 위한 것입니다. 이미 B1을 한동안 사용해 왔다면 다시 가져오면 중복 기록이 생길 수 있습니다.

</div>

## Transfer 도구 열기

1. **B1 Admin**에 로그인합니다.
2. [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**를 펼친 다음 **Settings**를 클릭합니다.
3. 왼쪽 설정 메뉴 상단의 교회 이름 아래에 있는 **Import/Export** 링크를 클릭합니다.
4. [transfer.b1.church](https://transfer.b1.church)에서 새 탭으로 **B1 Transfer** 도구가 열립니다.

Transfer 도구는 Source, Preview, Destination, Run의 네 단계로 진행됩니다.

---

## 1단계 - 원본 선택하기

데이터가 어디에서 오는지 선택합니다. 일곱 가지 옵션이 있습니다.

- **B1 Database** -- 기존 B1 교회 데이터에서 직접 가져옵니다. 백업을 만들거나 데이터를 다른 형식으로 변환할 때 유용합니다. 이 옵션을 사용하려면 로그인되어 있어야 합니다.
- **B1 Import Zip** -- B1 고유 형식의 zip 파일입니다. 주로 이전 B1 내보내기를 복원하는 데 사용합니다. B1 Export Zip을 **B1 Database**로 다시 불러오면 내보내기에 담긴 모든 내용이 복원됩니다([데이터 내보내기](./exporting-data.md#full-data-export-from-settings) 참조). 파일을 읽을 수 없다면 도구는 처음부터 다시 시작하지 않고 오류를 표시합니다.
- **Breeze Import Zip** -- Breeze ChMS에서 내보낸 파일이 들어 있는 zip 파일입니다.
- **Planning Center Zip** -- Planning Center에서 내보낸 zip 또는 CSV 파일입니다.
- **Custom CSV / Excel** -- 사람 데이터가 들어 있는 모든 CSV 또는 Excel 파일입니다. 업로드한 후 가져오기를 진행하기 전에 열을 B1 필드에 매핑합니다.
- **Tithe.ly CSV** -- Tithe.ly의 사람 또는 헌금 내보내기 파일입니다(CSV 또는 Excel 형식 허용).
- **CCB / Pushpay CSV** -- Church Community Builder 또는 Pushpay의 사람 또는 헌금 내보내기 CSV입니다.

파일을 업로드 영역에 끌어다 놓거나 클릭하여 찾아볼 수 있습니다.

---

## 1b단계 - 필드 매핑하기 (Custom CSV / Excel만 해당)

**Custom CSV / Excel**을 선택했다면, 파일을 업로드한 후 미리보기로 넘어가기 전에 필드 매핑 화면이 표시됩니다.

파일의 각 열이 샘플 값과 함께 나열됩니다. 각 열마다 드롭다운을 사용하여 일치하는 B1 필드를 선택합니다. 도구가 "First Name", "Email", "Zip Code" 같은 일반적인 열 이름을 자동으로 감지하지만, 모든 행을 검토하여 놓친 부분이 있으면 수정해야 합니다.

사용할 수 있는 B1 필드는 다음과 같습니다.

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name -- 이름으로 사람을 그룹에 배정합니다.
- **Custom Field (match by name)** -- 열의 내용을 교회의 [맞춤 사람 필드](../settings/custom-fields.md) 중 하나에 저장합니다. 열 머리글이 채워진 **B1 field name** 상자가 나타납니다. B1에 표시된 필드 이름과 정확히 같게 바꾸세요(대소문자는 상관없습니다).
- **Form Answer (custom field)** -- 해당 열의 값을 사람의 기록에 연결된 맞춤 필드로 저장합니다. 이 옵션을 사용하면 양식의 이름을 지정하라는 안내가 나타납니다.

날짜는 `9/17/1994`와 같은 일반적인 형식을 사용할 수 있으며 자동으로 변환됩니다. 맞춤 필드의 경우 예/아니요 필드는 Yes, No, Y, N, True, False, 1, 0 같은 값을 받고, 객관식 필드는 선택지 텍스트 또는 그 값을 받습니다.

:::info
가져오기 전에 B1 Admin에서 맞춤 사람 필드를 만드세요. 가져오기가 끝나면 **Custom Fields** 단계에서 B1 필드와 일치하지 않는 열 이름을 나열하고, 필드 유형에 맞지 않는 값의 개수를 집계합니다. 그런 값은 건너뛰고 나머지 가져오기는 계속 완료됩니다.
:::

가져오지 않을 열은 **(Skip)**으로 설정할 수 있습니다. 계속하려면 이름 필드(First Name 또는 Last Name) 중 하나 이상이 매핑되어 있어야 합니다.

**Confirm Mapping & Import**를 클릭하여 미리보기로 진행합니다.

---

## 2단계 - 데이터 미리보기

업로드한 후 도구는 가져올 모든 내용의 미리보기를 표시합니다. 탭을 사용하여 데이터 종류별로 검토합니다.

- **People** -- 가구별로 나열되며, 포함된 경우 사진도 표시됩니다.
- **Groups** -- 캠퍼스, 서비스, 시간, 분류별로 정리됩니다.
- **Attendance** -- 세션 날짜, 그룹, 방문 횟수를 보여줍니다.
- **Donations** -- 배치, 기금, 기부자, 금액을 보여줍니다.
- **Forms** -- 양식 이름과 콘텐츠 유형을 보여줍니다.

계속하기 전에 주의 깊게 검토하세요. 잘못된 부분이 있다면 **Start Over**를 클릭하고 원본 파일을 수정하세요.

---

## 3단계 - 대상 선택하기

데이터를 보낼 곳을 선택합니다.

- **B1 Database** -- 교회의 B1 데이터베이스로 직접 가져옵니다. 이 옵션을 선택하면 추가될 레코드의 최종 개수가 표시됩니다. **Start Transfer**를 클릭하여 확인합니다.
- **B1 Export Zip** -- 데이터를 B1 형식의 zip 파일로 다운로드합니다. 나중에 **B1 Import Zip**으로 복원할 수 있습니다. 백업에 좋습니다.
- **Breeze Export Zip** -- 데이터를 Breeze 형식으로 변환합니다.
- **Planning Center Zip** -- 데이터를 Planning Center 형식으로 변환합니다.

:::warning
원본과 대상의 형식은 같을 수 없습니다. 형식이 같으면 실수로 중복되는 것을 막기 위해 도구가 경고합니다.
:::

---

## 4단계 - 실행

도구가 전송을 처리하며 각 단계의 진행 상황을 표시합니다.

- Campuses, Services, Times
- People
- Photos
- Groups 및 Group Members
- Donations
- Attendance
- Forms, Questions, Answers, Form Submissions
- Custom Fields (Custom Field 열을 매핑한 경우)
- Compressing (zip 파일 대상에만 해당)

대상이 **B1 Database**일 때 진행 카드의 제목은 **Import Progress**이며, 완료되면 **Import Complete!** (또는 **Import Completed with Errors**)가 표시됩니다. zip 파일 대상의 경우 같은 메시지에 **Export**라고 표시됩니다.

:::warning
전송이 진행되는 동안에는 브라우저를 닫지 마세요. 모든 단계가 완료로 표시될 때까지 기다리세요.
:::

---

## Breeze Import Zip 준비하기

1. Breeze에서 **Settings**로 이동하고 왼쪽 사이드바의 **Export**를 클릭합니다.
2. **People**, **Tags**, **Contributions** 세 파일을 각각 내보냅니다.
3. 세 파일을 모두 선택하고 마우스 오른쪽 버튼을 클릭하여 하나의 zip 파일로 압축합니다.
   - Mac의 경우: 파일을 선택하고 마우스 오른쪽 버튼을 클릭한 다음 **Compress**를 선택합니다.
   - PC의 경우: 파일을 선택하고 마우스 오른쪽 버튼을 클릭한 다음 **Send to**를 고르고 **Compressed (zipped) folder**를 선택합니다.
4. 1단계에서 **Breeze Import Zip** 옵션을 사용하여 zip 파일을 업로드합니다.

Breeze 가져오기는 사람, 그룹(태그), 헌금 기록을 자동으로 전송합니다.

---

## Planning Center 내보내기 준비하기

1. Planning Center에 로그인하고 **People** 제품을 엽니다.
2. 왼쪽 사이드바에서 **Lists**를 클릭하고 가져오려는 모든 사람을 포함하는 목록을 만듭니다. (교회 전체 명단 목록이 이미 있다면 그것을 사용하세요.)
3. 목록을 열고 **export** 옵션을 사용하여 사람 데이터를 **CSV** 파일로 다운로드합니다. 유지하려는 필드를 포함하세요. 이름, 이메일, 전화번호, 주소, 생년월일, 성별, 회원 상태는 모두 B1로 매핑됩니다.
4. Planning Center가 파일을 여러 개 제공했다면 모두 선택하고 마우스 오른쪽 버튼을 클릭하여 하나의 zip 파일로 압축합니다.
   - Mac의 경우: 파일을 선택하고 마우스 오른쪽 버튼을 클릭한 다음 **Compress**를 선택합니다.
   - PC의 경우: 파일을 선택하고 마우스 오른쪽 버튼을 클릭한 다음 **Send to**를 고르고 **Compressed (zipped) folder**를 선택합니다.
5. 1단계에서 **Planning Center Zip** 옵션을 사용하여 CSV 또는 zip 파일을 업로드합니다.

업로드한 후 미리보기로 넘어가 사람과 가구가 올바르게 보이는지 확인한 다음 가져오기를 실행하세요.

---

## Tithe.ly 내보내기 준비하기

1. Tithe.ly에서 **People** 데이터를 CSV 또는 Excel 파일로 내보냅니다. 헌금 기록을 가져오고 싶다면 별도의 **Giving** 파일도 내보낼 수 있습니다.
2. 도구는 열 이름을 기준으로 파일에 사람 데이터가 있는지 헌금 데이터가 있는지 자동으로 감지합니다.
3. 1단계에서 **Tithe.ly CSV** 옵션을 사용하여 파일을 업로드합니다.

:::info
Tithe.ly 내보내기는 한 번에 파일 하나씩 가져올 수 있습니다. 사람과 헌금 기록을 각각 가져와야 한다면 과정을 두 번 실행하세요.
:::

---

## CCB 또는 Pushpay 내보내기 준비하기

1. Church Community Builder 또는 Pushpay에서 **People** 데이터를 CSV 파일로 내보냅니다. 별도의 헌금/기여 파일도 내보낼 수 있습니다.
2. 도구는 열 이름을 기준으로 파일에 사람 데이터가 있는지 헌금 데이터가 있는지 자동으로 감지합니다.
3. 1단계에서 **CCB / Pushpay CSV** 옵션을 사용하여 파일을 업로드합니다.

---

## 가져온 후에

전송이 끝나면 몇 분 동안 데이터를 확인하세요.

1. [사람](../people/adding-people.md) 페이지를 열고 프로필 몇 개를 확인합니다.
2. 이름, 이메일, 전화번호, 주소가 올바르게 들어왔는지 확인합니다.
3. 가구 연결이 유지되었는지 확인합니다. 원본에 가구 역할이 있으면 각 사람의 가구 역할(Head, Spouse, Child, Other)이 함께 옮겨집니다. B1 Import Zip의 **householdRole** 열, Breeze 또는 Tithe.ly의 **Family Role**, CCB / Pushpay의 **Family Position**이 해당합니다. "Head of Household", "Primary", "Wife", "Son" 같은 역할은 일치하는 B1 역할로 변환됩니다. Planning Center와 Custom CSV / Excel 가져오기에는 역할 열이 없으므로 해당 사람들은 **Other**로 설정됩니다. 역할은 [사람](../people/adding-people.md#managing-households) 페이지에서 사람의 가구 정보를 통해 변경할 수 있습니다.
4. 가져온 그룹과 헌금 기록을 검토합니다.

문제가 보이면 People 페이지에서 개별 프로필을 편집할 수 있습니다. Transfer 도구를 다시 실행하여 백업용으로 [데이터를 내보낼](exporting-data.md) 수도 있습니다.
