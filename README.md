# This project used yarn workspace for mono repo



### Front

- react, styled-components, graphql, apollo, quilljs

### Back

- express, apollo, graphql, jwt, mysql

### API

- 데이터 정보를 주고받을땐 graphql, 파일같은 자원을 주고받을땐 rest api 사용.

### 실행테스트

     window에서 실행시에는 back/package.json에 scripts중에 export를 set으로 바꿔줘야함

1. `yarn install`
2. 루트에 .env파일 생성후 .env.example 내용 복사 -> 붙여넣은후 채우기

- 개발

  1.  `yarn workspace front start`
  2.  `yarn workspace back dev`

- 프로덕션
  1.  `yarn build`
  2.  `yarn start`

### 도커

1. 루트에 .env파일 생성후 .env.example 내용 복사 -> 붙여넣은후 채우기(db_host값은 docker-compose의 services중 하나인 db이름으 로 해야함)
2. `docker-compose build`
3. `docker-compose up`

### server side rendering


### 기타

heroku특성상 10분간 request가 없으면 수면 상태로 빠지고, 수면상태에 있을때 request가 들어오면 다시 작동하기까지 상당한 시간이 걸린다.
