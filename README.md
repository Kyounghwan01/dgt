# 로그인 구조

## 보안 하나도 고려 안하게 설정

1. 로그인 체크는 firebase에서
2. 로그인 완료시 로컬스토리지에 로그인 완료일 + 30일까지 로긴 가능하게 설정, 넘어가면 로그아웃시키고 화면전환
3. auth - [{id: xxx, pw: xxx}]
4. id를 키로 {name: 노경환, memberType: common | admin | stop}
