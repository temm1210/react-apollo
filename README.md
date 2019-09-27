This project use Yarn Workspace.

### Front

react,styled-components,graphql,apollo,quilljs

### Back

express, apollo, graphql,jwt,mysql

### 실행테스트

front 시작
`yarn workspace front start`

back 시작

- 1. back폴더 아래 .env.dev파일 완성
- 2. db테이블 초기화가 필요할시 `yarn workspace back init-table` 다음 `yarn workspace back dev`
