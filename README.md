This project uses Yarn Workspace.

### Front

-   react, styled-components, graphql, apollo, quilljs

### Back

-   express, apollo, graphql, jwt, mysql


### API
-   데이터 정보를 주고받을땐 graphql, 파일같은 자원을 주고받을땐 rest api 사용.

### 실행테스트

1. `yarn install`
2. back폴더 아래 .env파일 생성후 .env.example 내용 복사  -> 붙여넣기

- 개발모드
     1. `yarn workspace front start`
     2. `yarn workspace back dev`

- 프로덕션모드
     1. `yarn workspace front build`
     2. `yarn workspace front build-ssr`
     3. `yarn workspace back start`

### 도커(준비중....)
