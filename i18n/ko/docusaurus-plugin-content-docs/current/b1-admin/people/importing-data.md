---
title: "데이터 가져오기"
---

# 데이터 가져오기

<div class="article-intro">

B1 Transfer 도구는 기존 데이터를 B1로 가져오기를 쉽게 만듭니다. 스프레드시트에서 처음부터 시작하든, 다른 교회 관리 플랫폼에서 마이그레이션하든, 기부 기록을 가져오든 간에 상관없습니다. 언제든지 데이터를 내보내거나 백업하는 데도 사용할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **설정**에 접근할 수 있는 활성 B1 Admin 계정이 필요합니다.
- 시작하기 전에 이전 시스템에서 데이터를 내보내고 준비해두세요.
- 이 도구는 초기 데이터 마이그레이션을 위한 것입니다. B1을 이미 한동안 사용하고 있었다면, 다시 가져오기를 하면 중복 기록이 생길 수 있습니다.

</div>

## Transfer 도구 접근하기

1. **B1 Admin**에 로그인합니다.
2. [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색 창)를 열고, **설정**을 확장한 후 **설정**을 클릭합니다.
3. 페이지 헤더의 오른쪽 위에서 **가져오기/내보내기** 버튼을 클릭합니다.
4. 이것은 **B1 Transfer** 도구를 새 탭에서 [transfer.b1.church](https://transfer.b1.church)에 엽니다.

Transfer 도구는 네 단계를 거칩니다: 소스, 미리보기, 대상, 그리고 실행.

---

## 단계 1 - 소스 선택

데이터가 어디에서 오는지 선택합니다. 일곱 가지 옵션이 있습니다:

- **B1 Database** — 기존 B1 교회에서 직접 데이터를 가져옵니다. 백업을 만들거나 데이터를 다른 형식으로 변환할 때 유용합니다. 이 옵션을 사용하려면 로그인해야 합니다.
- **B1 Import Zip** — B1의 자체 형식의 zip 파일입니다. 이는 주로 이전 B1 내보내기를 복원하는 데 사용됩니다.
- **Breeze Import Zip** — Breeze ChMS에서 내보낸 파일이 포함된 zip 파일입니다.
- **Planning Center Zip** — Planning Center에서 내보낸 zip 또는 CSV 파일입니다.
- **Custom CSV / Excel** — 사람 데이터를 포함하는 모든 CSV 또는 Excel 파일입니다. 업로드 후, 가져오기를 진행하기 전에 열을 B1 필드로 매핑합니다.
- **Tithe.ly CSV** — Tithe.ly의 사람 또는 기부 내보내기 파일(CSV 또는 Excel 형식 허용)입니다.
- **CCB / Pushpay CSV** — Church Community Builder 또는 Pushpay의 사람 또는 기부 내보내기 CSV입니다.

파일을 업로드 영역으로 끌어다놓거나, 클릭하여 찾아볼 수 있습니다.

---

## 단계 1b - 필드 매핑(Custom CSV / Excel만)

**Custom CSV / Excel**을 선택한 경우, 파일을 업로드한 후 미리보기로 이동하기 전에 필드 매핑 화면이 표시됩니다.

파일의 각 열은 샘플 값과 함께 나열됩니다. 각 열에 대해, 드롭다운을 사용하여 일치하는 B1 필드를 선택합니다. 도구는 "First Name(이름)", "Email(이메일)" 또는 "Zip Code(우편번호)" 같은 일반적인 열 이름을 자동 감지하지만, 모든 행을 검토하고 놓친 것을 수정해야 합니다.

사용 가능한 B1 필드는 다음을 포함합니다:

- First Name(이름), Last Name(성), Middle Name(중간 이름), Nickname(별명), Display Name(표시 이름), Title/Prefix(직책/접두사), Suffix(접미사)
- Email(이메일), Home Phone(집 전화), Mobile Phone(휴대 전화), Work Phone(직장 전화)
- Address Line 1(주소 1번 줄), Address Line 2(주소 2번 줄), City(도시), State(주), Zip Code(우편번호)
- Birth Date(생일), Anniversary(기념일), Gender(성별), Marital Status(결혼 상태), Membership Status(멤버십 상태)
- Household/Family Name(가족/가족 이름)
- Group Name(그룹 이름) — 사람을 그룹 이름으로 지정
- **사용자 정의 필드(이름으로 일치)** — 열을 교회의 [사용자 정의 인물 필드](../settings/custom-fields.md) 중 하나에 저장합니다. **B1 필드 이름** 상자가 나타나고 열 헤더로 채워집니다. B1에 표시되는 필드 이름과 정확히 같도록 변경하세요(대소문자는 구분하지 않음).
- **양식 답변(사용자 정의 필드)** — 해당 열의 값을 인물 기록에 첨부된 사용자 정의 필드로 저장합니다. 이 옵션을 선택하면 양식 이름을 지정하라는 요청이 표시됩니다.

날짜는 `9/17/1994` 같은 일반적인 형식으로 되어 있으며 자동으로 변환됩니다. 사용자 정의 필드의 경우, Yes/No 필드는 Yes, No, Y, N, True, False, 1 및 0 같은 값을 허용하고, 다중선택 필드는 선택 텍스트 또는 그 값을 허용합니다.

:::info
가져오기 전에 B1 Admin에서 custom person fields(사용자 정의 사람 필드)를 만듭니다. 가져오기가 끝나면, **Custom Fields(사용자 정의 필드)** 단계는 B1 필드와 일치하지 않는 열 이름을 나열하고 필드의 유형에 맞지 않는 값을 계산합니다. 이 값들은 건너뛰어지고, 나머지 가져오기는 여전히 완료됩니다.
:::

가져오지 않으려는 열은 **(Skip)((건너뛰기))**로 설정할 수 있습니다. 계속하기 전에 최소 하나의 이름 필드(First Name 또는 Last Name)가 매핑되어야 합니다.

**Confirm Mapping & Import(매핑 확인 & 가져오기)**를 클릭하여 미리보기로 진행합니다.

---

## 단계 2 - 데이터 미리보기

업로드 후, 도구는 가져올 모든 것의 미리보기를 표시합니다. 탭을 사용하여 각 데이터 유형을 검토합니다:

- **People(사람)** — 가족별로 나열되고, 포함된 경우 사진입니다.
- **Groups(그룹)** — Campus(캠퍼스), Service(서비스), Time(시간) 및 Category(카테고리)별로 구성합니다.
- **Attendance(출석)** — Session dates(세션 날짜), Groups(그룹) 및 Visit counts(방문 수)입니다.
- **Donations(기부)** — Batches(배치), Funds(기금), Donors(기부자) 및 Amounts(금액)입니다.
- **Forms(양식)** — Form names(양식 이름) 및 Content types(콘텐츠 유형)입니다.

진행하기 전에 이것을 주의 깊게 검토합니다. 뭔가 잘못되었으면, **Start Over(처음부터 시작)**을 클릭하고 소스 파일을 수정합니다.

---

## 단계 3 - 대상 선택

데이터가 어디로 가는지 선택합니다:

- **B1 Database** — 교회의 B1 데이터베이스로 직접 가져옵니다. 이를 선택한 후, 도구는 추가될 기록의 최종 수를 표시합니다. **Start Transfer(전송 시작)**을 클릭하여 확인합니다.
- **B1 Export Zip** — 데이터를 B1 형식의 zip 파일로 다운로드합니다. 백업에 좋습니다.
- **Breeze Export Zip** — 데이터를 Breeze 형식으로 변환합니다.
- **Planning Center Zip** — 데이터를 Planning Center 형식으로 변환합니다.

:::warning
소스와 대상은 같은 형식이 될 수 없습니다. 일치하면, 도구는 실수로 중복을 방지하기 위해 경고합니다.
:::

---

## 단계 4 - 실행

도구는 전송을 처리하고 각 단계에 대한 진행률을 표시합니다:

- Campuses, Services, and Times(캠퍼스, 서비스 및 시간)
- People(사람)
- Photos(사진)
- Groups and Group Members(그룹 및 그룹 멤버)
- Donations(기부)
- Attendance(출석)
- Forms, Questions, Answers, and Form Submissions(양식, 질문, 답변 및 양식 제출)
- Custom Fields(사용자 정의 필드)(사용자 정의 필드 열을 매핑한 경우)
- Compressing(압축 중)(zip 파일 대상의 경우만)

대상이 **B1 Database**일 때, 진행률 카드는 **Import Progress(가져오기 진행 상태)**로 제목이 지어지고 **Import Complete!(가져오기 완료!)** 로 마칩니다(또는 **Import Completed with Errors(오류와 함께 가져오기 완료)**). zip 파일 대상의 경우, 같은 메시지는 **Export(내보내기)**라고 합니다.

:::warning
전송이 실행되는 동안 브라우저를 닫지 마십시오. 모든 단계가 완료로 표시될 때까지 대기합니다.
:::

---

## Breeze Import Zip 준비

1. Breeze에서, **Settings(설정)**으로 이동하고 왼쪽 사이드바에서 **Export(내보내기)**를 클릭합니다.
2. 세 개의 개별 파일을 내보냅니다: **People(사람)**, **Tags(태그)** 및 **Contributions(기부)**.
3. 세 개의 파일 모두를 선택하고, 마우스 오른쪽 버튼을 클릭하고, 단일 zip 파일로 압축합니다.
   - Mac: 파일을 선택하고, 마우스 오른쪽 버튼을 클릭하고, **Compress(압축)**를 선택합니다.
   - PC: 파일을 선택하고, 마우스 오른쪽 버튼을 클릭하고, **Send to(보내기)**를 선택한 후 **Compressed (zipped) folder(압축(지퍼) 폴더)**를 선택합니다.
4. 단계 1의 **Breeze Import Zip** 옵션을 사용하여 zip 파일을 업로드합니다.

Breeze import는 자동으로 사람, 그룹(태그) 및 기부 기록을 전송합니다.

---

## Planning Center Export 준비

1. Planning Center에 로그인하고 **People(사람)** 제품을 엽니다.
2. 왼쪽 사이드바에서, **Lists(목록)**를 클릭하고 가져오려는 모든 사람을 포함하는 목록을 만듭니다. (이미 전체 회중 목록이 있으면, 그것을 사용합니다.)
3. 목록을 열고 **export(내보내기)** 옵션을 사용하여 **CSV** 파일로 사람을 다운로드합니다. 유지하려는 필드를 포함합니다 — 이름, 이메일, 전화, 주소, 생일, 성별 및 멤버십 상태는 모두 B1으로 매핑됩니다.
4. Planning Center가 하나 이상의 파일을 제공하면, 모두 선택하고, 마우스 오른쪽 버튼을 클릭하고, 단일 zip으로 압축합니다.
   - Mac: 파일을 선택하고, 마우스 오른쪽 버튼을 클릭하고, **Compress(압축)**를 선택합니다.
   - PC: 파일을 선택하고, 마우스 오른쪽 버튼을 클릭하고, **Send to(보내기)**를 선택한 후 **Compressed (zipped) folder(압축(지퍼) 폴더)**를 선택합니다.
5. 단계 1의 **Planning Center Zip** 옵션을 사용하여 CSV 또는 zip을 업로드합니다.

업로드 후, 미리보기로 계속하고 가져오기를 실행하기 전에 사람 및 가족이 올바른지 확인합니다.

---

## Tithe.ly Export 준비

1. Tithe.ly에서, **People(사람)** 데이터를 CSV 또는 Excel 파일로 내보냅니다. 기부 기록을 가져오려면 별도의 **Giving(기부)** 파일을 내보낼 수도 있습니다.
2. 도구는 열 이름에 따라 파일이 사람 데이터를 포함하는지 기부 데이터를 포함하는지 자동으로 감지합니다.
3. 단계 1의 **Tithe.ly CSV** 옵션을 사용하여 파일을 업로드합니다.

:::info
Tithe.ly exports는 한 번에 하나의 파일씩 가져올 수 있습니다. 사람 및 기부 기록을 모두 가져오려면 프로세스를 두 번 실행합니다.
:::

---

## CCB 또는 Pushpay Export 준비

1. Church Community Builder 또는 Pushpay에서, **People(사람)** 데이터를 CSV 파일로 내보냅니다. 별도의 giving/contributions(기부/기여) 파일을 내보낼 수도 있습니다.
2. 도구는 열 이름에 따라 파일이 사람 데이터를 포함하는지 기부 데이터를 포함하는지 자동으로 감지합니다.
3. 단계 1의 **CCB / Pushpay CSV** 옵션을 사용하여 파일을 업로드합니다.

---

## 가져온 후

전송이 완료되면, 몇 분을 들여 데이터를 검증합니다:

1. [People(사람)](../people/adding-people.md) 페이지를 탐색하고 몇 개의 프로필을 현장 점검합니다.
2. 이름, 이메일, 전화번호 및 주소가 올바르게 전달되었는지 확인합니다.
3. 가족 연결이 그대로 유지되었는지 확인합니다.
4. 가져온 그룹 및 기부 기록을 검토합니다.

문제를 발견하면, 사람 페이지에서 개별 프로필을 편집할 수 있습니다. 또한 전송 도구를 다시 실행하여 [데이터를 내보낼](exporting-data) 수 있습니다.
