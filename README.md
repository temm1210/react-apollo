# This project used yarn workspace for mono repo



### Front

- react, styled-components, graphql, apollo, quilljs

### Back

- express, apollo, graphql, jwt, mysql

### API

- 데이터 정보를 주고받을땐 graphql, 파일같은 자원을 주고받을땐 rest api 사용.
- 인증로직 access token, refresh token사용

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

1. 루트에 .env파일 생성후 .env.example 내용 복사 -> 붙여넣은후 채우기(db_host값은 docker-compose의 services중 하나인 db이름으로 해야함)
2. `docker-compose build`
3. `docker-compose up`

### server side rendering 지원 및 프로젝트 mono repo로 구성


### 기타

<s>heroku특성상 10분간 request가 없으면 수면 상태로 빠지고, 수면상태에 있을때 request가 들어오면 다시 작동하기까지 상당한 시간이 걸린다.</s>

### 느낀점

- 인증관련로직(access token, refresh token) 특히 `access token`만료시 UX에 방해되지않게 `refresh token`을 사용하여 token재발급 하는 과정이 상당히 까다로웠다. 여기서는 `apollo`내장 기술을 사용하였지만, `apollo`를 사용하지 않을시에는 `socket`나 `rxjs`를 사용하면 좀 더 수월하게 할 수 있을것같다.
- `apollo cache`를 사용하다보니 `redux`의 역할이 애매모호 해져서 사용하지 않았다. 현재 더 많은 자료를 찾아본 결과 독단적으로 하나의 기술을 사용하거나 client state는 `redux`나 `recoil`, server state는 `react-query` 이렇게 나눠서 사용하는 경우도 있었다. client에서 server state의 규칙이 따로 없을경우에는 rest api만 사용할때는 `react-query`, graphql을 사용할때는 `apollo cache`를 사용하는것도 나쁘지 않아보인다.
- `mono repo`를 단순히 백과 프론트의 api규칙 공유를 위해서 사용하였는데 프론트내에서 단순 개별 컴포넌트들을 버전관리하면서 사용하는것도 매우 좋아보였다. 다음에는 컴포넌트별로 버전 관리를 해봐야할것같다.
- 해당프로젝트를 하면서 가장크게 필요성을 느꼈던 부분은 `아키텍쳐`와 `함수형 프로그래밍`이였다. 이 두 부분에 대해 공부좀 많이해야할것 같다.
