# 1. 운영체제 및  프로그램 설치(하나 하나 입력하는 방식)
# FROM ubuntu:22.04

# RUN sudo apt install nodejs
# RUN sudo npm install -g yarn

# 1. 운영체제 및 프로그램 설치(이미 리눅스, node, npm, yarn까지 모두 깔려있는 컴퓨터 다운로드하는 방식)
FROM node:14

# 2. 내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
# RUN mkdir myfolder => 아래에서 COPY할 때 자동으로 만들어줘서 궅이 필요 없음
COPY . /myfolder/
# RUN cd ./myfolder/
WORKDIR /myfolder/
RUN yarn install

# 3. 도커 안에서 index.js 실행시키기
# RUN mkdir qqq -> 최종 결과물까지 저장(실행시킨 상태에서 저장)
# CMD mkdir qqq -> 최종 결과물까지 저장 X(CMD는 실행시키고 저장 X(셋팅까지만 해놓고), 실제 실행 시 작동)
CMD yarn start:dev