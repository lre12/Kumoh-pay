# Kumoh-pay

### 팀원 참고사항
* javascript 코딩 스타일 준수하기
    - https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%94%A9-%EB%B0%8F-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-1%ED%8E%B8
 

    - https://velog.io/@cada/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%ED%83%80%EC%9D%BC-%EA%B0%80%EC%9D%B4%EB%93%9C-%EB%84%A4%EC%9D%B4%EB%B0%8D-%EC%BB%A8%EB%B2%A4%EC%85%98-%ED%8E%B8
 
    - 원본 : https://google.github.io/styleguide/jsguide.html

* version
    - npm : 6.14.5
    - node : v12.18.2

* 포트
    - 관리자(kumoh-pay) : 3000
    - node 서버 : 3001
    - 사용자(kumohpay-user) : 3002

* readme 작성시 마크다운 규격 준수하기
    - https://gist.github.com/ihoneymon/652be052a0727ad59601

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
