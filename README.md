### 브라질 로컬앱

### 인수인계

WBS 파일에 진행 상황에 현재 API 작업률 및 디자인 작업률 표시 되어 있습니다. (06-08 기준)

WBS 파일에 앱 - 라우팅 탭에 라우팅 관련 설명이 되어 있습니다. Screen에 들어갈 파라미터 필수 값은 타입으로 지정 해놓았습니다.(Screen.ts파일)

### 파일 구조

📦src
┣ 📂API
┃ ┗ 📜API.ts : 공통된 api 지정 파일
┣ 📂assets
┃ ┣ 📂fonts : 폰트
┃ ┣ 📂global
┃ ┃ ┣ 📜dummy.ts : 프론트 더미 파일 모음
┃ ┃ ┗ 📜Theme.ts : 테마 지정 파일
┃ ┣ 📂image : 이미지 파일
┃ ┗ 📂lang : 언어 설정 파일 i18n 라이브러리
┃ ┃ ┗ 📜lang.js
┣ 📂Components : 컴포넌트 파일
┣ 📂Hooks : 커스텀 훅
┣ 📂Page : 앱 라우팅
┃ ┣ 📂Business
┃ ┃ ┣ 📜BusinessAddress.tsx
┃ ┃ ┣ 📜BusinessForm.tsx
┃ ┃ ┣ 📜BusinessLocation.tsx
┃ ┃ ┣ 📜BusinessOpeningHours.tsx
┃ ┃ ┣ 📜BusinessProfile.tsx
┃ ┃ ┣ 📜BusinessProfileBanner.tsx
┃ ┃ ┣ 📜BusinessProfileMenu.tsx
┃ ┃ ┣ 📜BusinessProfileSetting.tsx
┃ ┃ ┣ 📜BusinessSignUp.tsx
┃ ┃ ┗ 📜BusinessSignUpForm.tsx
┃ ┣ 📂Car
┃ ┃ ┣ 📜CarBrand.tsx
┃ ┃ ┣ 📜CarDisplacement.tsx
┃ ┃ ┣ 📜CarEndNumber.tsx
┃ ┃ ┣ 📜CarFuel.tsx
┃ ┃ ┣ 📜CarGear.tsx
┃ ┃ ┣ 📜CarLocation.tsx
┃ ┃ ┣ 📜CarModel.tsx
┃ ┃ ┣ 📜CarRegister.tsx
┃ ┃ ┗ 📜CarYear.tsx
┃ ┣ 📂Chatting
┃ ┃ ┣ 📜BlockList.tsx
┃ ┃ ┣ 📜ChattingDetail.tsx
┃ ┃ ┣ 📜ChattingHome.tsx
┃ ┃ ┣ 📜ChattingLocation.tsx
┃ ┃ ┣ 📜ReportCategory.tsx
┃ ┃ ┗ 📜ReportDetail.tsx
┃ ┣ 📂Home
┃ ┃ ┣ 📜AllCategory.tsx
┃ ┃ ┣ 📜Home.tsx
┃ ┃ ┣ 📜KeywordAlarm.tsx
┃ ┃ ┣ 📜LikeList.tsx
┃ ┃ ┣ 📜LocationChange.tsx
┃ ┃ ┣ 📜MyCategory.tsx
┃ ┃ ┣ 📜ProductDetail.tsx
┃ ┃ ┣ 📜ProductDetailOther.tsx
┃ ┃ ┣ 📜ProductDetailSearch.tsx
┃ ┃ ┣ 📜Search.tsx
┃ ┃ ┗ 📜SearchDetail.tsx
┃ ┣ 📂LoginSignUp
┃ ┃ ┣ 📜Login.tsx
┃ ┃ ┣ 📜LoginComplete.tsx
┃ ┃ ┣ 📜SignUp.tsx
┃ ┃ ┣ 📜SignUpAuth.tsx
┃ ┃ ┣ 📜SignUpComplete.tsx
┃ ┃ ┣ 📜SignUpForm.tsx
┃ ┃ ┣ 📜SignUpPhoto.tsx
┃ ┃ ┣ 📜SignUpTel.tsx
┃ ┃ ┗ 📜SignUpToS.tsx
┃ ┣ 📂Notice
┃ ┃ ┣ 📜AlarmDetail.tsx
┃ ┃ ┣ 📜AlarmList.tsx
┃ ┃ ┣ 📜AlarmProduct.tsx
┃ ┃ ┣ 📜Notice.tsx
┃ ┃ ┗ 📜NoticeDetail.tsx
┃ ┣ 📂OnBoard
┃ ┃ ┣ 📜AppPermission.tsx
┃ ┃ ┣ 📜LocationSetting.tsx
┃ ┃ ┗ 📜OnBoarding.tsx
┃ ┣ 📂Product
┃ ┃ ┣ 📜MyProduct.tsx
┃ ┃ ┣ 📜ProductCategory.tsx
┃ ┃ ┣ 📜ProductComplete.tsx
┃ ┃ ┣ 📜ProductCompleteConfirm.tsx
┃ ┃ ┣ 📜ProductLocation.tsx
┃ ┃ ┣ 📜ProductPhoto.tsx
┃ ┃ ┣ 📜ProductTag.tsx
┃ ┃ ┣ 📜ProductTier.tsx
┃ ┃ ┣ 📜ProductTierGuide.tsx
┃ ┃ ┗ 📜ProductUpdate.tsx
┃ ┣ 📂Profile
┃ ┃ ┣ 📜ProductDetailProfile.tsx
┃ ┃ ┣ 📜ProfileAuth.tsx
┃ ┃ ┣ 📜ProfileAuthComplete.tsx
┃ ┃ ┣ 📜ProfileDetail.tsx
┃ ┃ ┣ 📜ProfileHome.tsx
┃ ┃ ┣ 📜ProfileSellerReview.tsx
┃ ┃ ┣ 📜ProfileSellProduct.tsx
┃ ┃ ┣ 📜ProfileTel.tsx
┃ ┃ ┣ 📜ProfileUpdate.tsx
┃ ┃ ┣ 📜PurchaseList.tsx
┃ ┃ ┗ 📜ReviewWrite.tsx
┃ ┣ 📂Setting
┃ ┃ ┣ 📜ContactUs.tsx
┃ ┃ ┣ 📜FAQ.tsx
┃ ┃ ┣ 📜PrivacyPolicy.tsx
┃ ┃ ┣ 📜ServiceCenter.tsx
┃ ┃ ┣ 📜Setting.tsx
┃ ┃ ┣ 📜SettingAlarm.tsx
┃ ┃ ┣ 📜SettingChatting.tsx
┃ ┃ ┣ 📜SettingDeleteAccount.tsx
┃ ┃ ┣ 📜SettingLanguage.tsx
┃ ┃ ┣ 📜SettingPrivacy.tsx
┃ ┃ ┣ 📜SettingPrivacyTel.tsx
┃ ┃ ┣ 📜SettingPrivacyTelAuth.tsx
┃ ┃ ┗ 📜ToU.tsx
┃ ┣ 📜Menu.tsx : 임시 파일 제거 필요
┃ ┗ 📜Router.tsx : 라우팅 관리 파일
┣ 📂Store : 전역 상태 redux Toolkit
┃ ┣ 📜fontSizeState.ts
┃ ┣ 📜globalState.ts
┃ ┣ 📜langState.ts
┃ ┣ 📜store.ts
┃ ┗ 📜userState.ts
┣ 📂Types : 타입 폴더
┃ ┣ 📂API
┃ ┣ 📂Components
┃ ┣ 📂Screen : 화면 공통 타입 지정
┗ 📂Util
┃ ┣ 📜pixelChange.ts
┃ ┗ 📜Util.ts
