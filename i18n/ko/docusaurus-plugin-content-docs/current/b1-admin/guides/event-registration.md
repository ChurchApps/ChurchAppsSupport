---
title: "가이드: 이벤트 등록 설정하기"
description: "B1 Admin에서 이벤트 등록 양식을 설정하여 참석자 정보와 선택 결제를 받고, 교회 웹사이트에 넣고, 신청 현황을 추적하세요."
---

# 이벤트 등록 설정하기

<div class="article-intro">

이벤트 등록 양식을 만들고, 참석자 정보와 선택 결제를 받고, 교회 웹사이트에 넣고, 들어오는 제출 내용을 관리하세요. 가이드를 마치면 어떤 교회 행사에든 공유할 수 있는 등록 페이지를 갖게 됩니다.

</div>

:::info
**이벤트 등록을 처리하는 두 가지 방법:** 이 가이드는 **양식 기반 등록**을 다룹니다. 자체 공개 링크, 사용자 지정 질문, 선택 결제 항목이 있는 Stand Alone 양식입니다. 캘린더에 있는 행사라면, 캘린더에 내장된 **행사 등록**을 대신 사용할 수 있습니다. [캘린더 만들기](../calendars/creating-calendars.md#enabling-event-registration)를 참조하세요. 이 방식은 구성원이 [B1.church나 B1 앱](../../b1-church/events/registering.md)에서 직접 신청할 수 있게 하며, 정원, 등록 시작일과 마감일, 대기자 명단, 양식의 선택 등록 질문, 가격이 있는 참석자 유형을 지원합니다([유료 등록](../calendars/paid-registrations.md) 참조).
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- 관리자 권한이 있는 B1 Admin 계정
- 결제를 받으려면: 먼저 [Stripe를 설정](../donations/online-giving-setup.md)해야 합니다.

</div>

## 1단계: Stand Alone 양식 만들기 {#step-1-create-a-stand-alone-form}

Stand Alone 양식은 누구나 접근할 수 있는 자체 공개 URL을 가지며, 이벤트 등록에 아주 적합합니다.

[양식 만들기](../forms/creating-forms.md) 가이드를 따라 다음을 하세요.

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **People > Forms**를 선택하고 **Add Form**을 클릭합니다.
2. 행사 이름을 따서 짓습니다(예: "Men's Retreat Registration", "VBS Sign-Up").
3. **Associate With**에서 **Stand Alone**을 고릅니다. 그래야 양식에 자체 공개 URL이 생깁니다.
4. **Save**를 클릭합니다.

## 2단계: 질문 추가하기 {#step-2-add-questions}

등록자에게서 받아야 하는 항목을 필드로 만드세요.

[양식 만들기](../forms/creating-forms.md#adding-questions) 가이드를 따라 질문을 추가하세요.

1. 양식을 열고 **Questions** 탭으로 가서, 필요한 정보마다 **Add Question**을 클릭합니다. 이름, 이메일, 전화번호, 식이 제한, 티셔츠 사이즈, 비상 연락처 등입니다.
2. 식사 선호나 세션 선택처럼 선택지가 있는 항목에는 **Multiple Choice**를 사용합니다.
3. 참가비를 받으려면 **Payment** 질문을 추가하고 **Fund**와 **Amount**를 고릅니다.

:::warning
Payment 필드 유형은 Stripe 설정이 필요합니다. 아직 온라인 헌금을 설정하지 않았다면, 결제 필드를 추가하기 전에 [온라인 헌금 설정](../donations/online-giving-setup.md)을 참조하세요.
:::

## 3단계: 양식 설정 구성하기 {#step-3-configure-form-settings}

등록 양식을 언제, 어떻게 이용할 수 있는지 조절하세요. [양식 속성 설정하기](../forms/creating-forms.md#configuring-form-properties) 절을 따라 다음을 하세요.

1. **Edit Form**을 클릭하고, 등록을 제한된 기간에만 받으려면 **Set Form Availability Timeframe**을 **Yes**로 설정한 뒤 시작일과 종료일을 고릅니다.
2. 양식 페이지 왼쪽에 표시된 **공개 URL**을 복사합니다. 이것을 직접 공유할 수 있습니다. 전단이나 슬라이드에 쓸 QR 코드를 내려받으려면 Forms 목록에서 양식 옆의 **QR Code**를 클릭하세요.
3. **Form Members** 탭에서 제출 내용 관리를 도울 사람을 **Admin** 또는 **View Only**로 추가하고, 새 등록마다 이메일을 받아야 할 사람에게는 **Email Notification**을 켭니다.

## 4단계: 웹사이트에 넣기 {#step-4-embed-on-your-website}

등록 양식을 교회 웹사이트에 추가하여 쉽게 찾을 수 있게 하세요.

[페이지 편집기](../website/page-editor.md) 가이드를 따라 다음을 하세요.

1. B1 웹사이트 편집기에서 페이지를 열고 **Add Content**를 클릭합니다.
2. **Form** 요소를 섹션으로 끌어다 놓고, 등록 양식을 고릅니다.

:::tip
단독 URL은 이메일, 소셜 미디어, 교회 주보에도 공유하세요. 더 많은 곳에 보일수록 신청이 늘어납니다.
:::

## 5단계: 제출 내용 관리하기 {#step-5-manage-submissions}

등록이 들어오는 대로 추적하고, 필요할 때 데이터를 내보내세요.

[제출 관리하기](../forms/managing-submissions.md) 가이드를 따라 다음을 하세요.

1. **Form Submissions** 탭에서 들어오는 응답을 검토합니다.
2. **Export**를 클릭하여 스프레드시트, 인원 집계, 행사 담당자와 공유할 CSV를 내려받습니다.

## 완료! {#youre-done}

이벤트 등록이 공개되었습니다. 링크를 공유하고, 웹사이트에 넣고, B1 Admin에서 신청 현황을 추적하세요. 행사가 끝나면 최종 명단을 내려받아 기록으로 보관하세요.

## 관련 문서 {#related-articles}

- [양식 만들기](../forms/creating-forms.md) — 여러 필드 유형으로 양식 만들기
- [제출 관리하기](../forms/managing-submissions.md) — 양식 응답 검토 및 내보내기
- [페이지 편집기](../website/page-editor.md) — 웹사이트에 양식 넣기
- [온라인 헌금 설정](../donations/online-giving-setup.md) — 결제 필드에 필요
