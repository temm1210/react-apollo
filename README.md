This project uses Yarn Workspace.

### Front

-   react, styled-components, graphql, apollo, quilljs

### Back

-   express, apollo, graphql, jwt, mysql


### API
-   데이터 정보를 주고받을땐 graphql, 파일같은 자원을 주고받을땐 rest api 사용.
`
### 실행테스트

- `yarn install`
- back폴더 아래 .env.example 복사후 .env파일 생성 -> 붙여넣기

1. 개발모드
     - `yarn workspace front start`
     - db테이블 초기화가 필요할시 `yarn workspace back init-table` 다음 `yarn workspace back start`

2. 실행모드
     - `yarn workspace front build`
     - `yarn workspace front build-ssr`
     - `yarn workspace back start`

### 도커(준비중....)
