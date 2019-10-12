This project uses Yarn Workspace.

### Front

react,styled-components,graphql,apollo,quilljs

### Back

express, apollo, graphql,jwt,mysql

### 실행테스트(개발모드)

1. `yarn install`
2. back폴더 아래 .env.example 복사후 .env파일 생성 -> 붙여넣기
3. `yarn workspace front start`
4. db테이블 초기화가 필요할시 `yarn workspace back init-table` 다음 `yarn workspace back start`

### 빌드및 실행(실행모드)

1. `yarn workspace front build`
2. `yarn workspace front build-ssr`
3. `yarn workspace back start`

### 도커(준비중....)
