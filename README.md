# Kumoh-pay


## 금오페이란?

HyperLedger 블록체인을 이용한 교내 상품권 전산화 프로젝트
![](https://images.velog.io/images/lre12/post/d042c7c7-1b43-42fa-a3b5-4ffa93063c5f/%EA%B0%9C%EC%9A%94.png)


 1. 문제 정의

    - 교내 생활협동조합 상품권은 교내 행사의 경품 및 포상으로써 수요가 존재하지만, 지폐 형태로 지급되어 항상 훼손과 분실의 위협에 노출되어 있고, 외부 업체에 생산을 위탁해야 하는 등 재래식 화폐와 동일한 문제가 존재한다.
    - 우리는 상품권을 디지털 화폐로 전환하여 상품권의 발행 및 유통 과정을 간편화하고, 보다 쉽게 관리할 수 있도록 하려 한다.

 2. 사용자 요구

    - 학교 ID 기반 계정 생성
    - 관리자 및 사용자 계정 분리
    - 디지털 화폐 형식의 상품권 보관
    - 관리자용 웹 콘솔을 통해 상품권 발행 및 유통

 3. 응용 분야 및 기여도

    - 본 시스템은 상품권을 전산화하여 훼손 및 분실로부터 자유롭지 못한 기존 상품권의 약점을 보완한다. 또한 여러 장으로 분할된 상품권의 통합 관리 또한 지원하여 보관 및 사용이 편리하게 하며, 발행과 유통 과정에서 발생하는 금전적, 시간적 비용을 최소화하여 생활협동조합을 이용하는 모든 금오인들의 편익 증진에 기여한다.
    
## 시스템 구조도
![](https://images.velog.io/images/lre12/post/009025c4-a8ad-4f01-a6fe-6d9d28febf40/%EA%B5%AC%EC%A1%B0%EB%8F%84.png)

 - 분업을 위해 회원정보나 기타 정보를 관리하는 서버와 블록체인 통신을 위한 서버를 분리
 - MSA와 같은 철학을 비슷하게나마 따라하려 함
 - Client 단에서 MOBX(Presenter)를 이용해서 mvp 패턴을 사용![](https://images.velog.io/images/lre12/post/0b2b9a15-0ab2-44fb-b139-9a7c5ff2f1f1/%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202020-11-02%20194949.png)
  
## 기술 스택
* SERVER
    - express
    - jwt
    - AWS DB(MYSQL)
    - sha512 암호화 (crypto)
* CLIENT
    - React
    - Mobx
    - React Hook
* BlockChain
    - HyperLedger(private blockchain)

## 사용자 기능
- 로그인
![](https://images.velog.io/images/lre12/post/76e7c7fc-fa2c-4760-84a9-476869439b5a/user_login.png)
학번과 비밀번호를 입력한다.
비밀번호 찾기 미구현
- 회원 가입
![](https://images.velog.io/images/lre12/post/d79deea3-ab08-4c1b-ad68-df992b2904f2/user_signup.png)
금오 웹메일에 메일을 보내 인증번호를 받아 가입한다.
실제 서비스를 하게 된다면, 아마 학교 계정 정보를 받아 연동해야 할 듯
- 회원 정보 수정
![](https://images.velog.io/images/lre12/post/b73b3e60-d84c-4d08-b508-469c1b459420/user_info.png)
회원 정보, 현재는 비밀번호만 수정할 수 있다.
- 메인 화면
![](https://images.velog.io/images/lre12/post/93cfa20f-fa29-49ee-819e-61685962ff32/user_main.png)
현재 계좌와 거래 내역을 보여준다.
직접 개인 리눅스 서버(AWS 프리티어 수준)으로 서버를 돌려 블록체인 api 서버에서 오류가 많이 발생했다.
당시 대처 방법이 없어서 새로고침 버튼을 넣어 해당 컴포넌트에 들어갈 state만 재요청했다.
- 상품권 수령
![](https://images.velog.io/images/lre12/post/b1e61f34-55ee-46c9-912d-84a12fcf7075/user_my_QR.png)
QR코드로 상품권을 받을 회원의 정보를 전달한다.
- 상품권 전송
![](https://images.velog.io/images/lre12/post/e56f7679-1417-497f-a602-5afbb31f29d6/user_QR.png)
HTML5 카메라를 이용하는 QR scanner를 이용해서 QR코드를 인식한다.
![](https://images.velog.io/images/lre12/post/2cad5e88-b785-415d-af89-108527383e1c/user_send_voucher.png)
정보를 가져와서 보낼 금액을 입력한다.
## Kit-Pay 관리자 기능 소개
- 로그인
![](https://images.velog.io/images/lre12/post/f88f959f-8893-4804-b1cf-983b50d59412/admin_login.png)
- 회원 관리
![](https://images.velog.io/images/lre12/post/7338ba2a-da90-48ff-9ef2-3f2388f563a4/admin_user_view.png)
관리자는 전자 상품권을 발급, 삭제할 수 있다.
해당 사이트에서는 사용자를 삭제하고, 특정 사용자에게 상품권을 전달할 수 있다.
![](https://images.velog.io/images/lre12/post/9cb406ad-5279-47ee-8044-f65c59e5221e/admin_user_detail_admin.png)
상세 정보를 클릭하면 다음과 같이 사용자의 상세 정보를 보여준다.
- 거래 내역 조회
![](https://images.velog.io/images/lre12/post/4c5b4111-b1de-4b8e-bcd1-d08babea4fa1/admin_deal_check_all.png)

사용자의 거래 내역을 조회한다.
날짜나 보낸 ID를 검색할 수 있다.

- 정산 조회
![](https://images.velog.io/images/lre12/post/5879e754-f37b-4bed-83b8-c454075f76bb/admin_calculate_view.png)
교내 판매자가 마감 후 상품권으로 거래한 금액을 정산받기 위한 페이지이다.
판매자의 지갑에서 금액을 빼낸 후 현금으로 교환한다.
은행 모듈을 구현하지는 못하였다.
