# [열차영차](https://livesubway.site)

<img src="./public/logo192.png" alt="Project Icon" width="100" height="100">

## 프로젝트 소개

### 목적

실시간으로 지하철 위치를 확인할 수 있는 웹 서비스를 제공하여 사용자의 불편함을 해소하는 것을 목표로 합니다. 지하철 위치와 상태를 실시간으로 파악함으로써 보다 편리한 지하철 이용을 지원합니다.

### 개발 기간

2024년 7월 ~ 2024년 8월

## 관련 링크

### 배포 주소

- 웹사이트: [www.livesubway.site](http://livesubway.site)

### 레포지토리

- Frontend: [Frontend GitHub Repository](https://github.com/KNU-s/subway_Web)

- Backend: [Backend GitHub Repository](https://github.com/KNU-s/subway_BackEnd)

## 주요 기능 및 시연

| **화면**        | **설명**                                                                                   | **시연**                                                                                             |
| --------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **메인 화면**   | 전체 지하철 노선을 한눈에 확인할 수 있습니다.                                              | ![메인 화면 시연](https://github.com/user-attachments/assets/2766c2fe-2527-4e65-b103-0b4dd46326e9)   |
| **노선별 화면** | 각 노선의 지하철 위치를 실시간으로 확인하고, 선택한 열차의 상세 정보를 확인할 수 있습니다. | ![노선별 화면 시연](https://github.com/user-attachments/assets/1a73116b-ae21-48eb-b3d1-3303ce089f87) |

- **실시간 지하철 위치 확인**: 공공 API를 사용하여 실시간으로 지하철 열차의 위치를 보여줍니다.
- **노선별 위치 추적**: 사용자는 특정 노선을 선택하여 해당하는 모든 열차의 현재 위치를 확인할 수 있습니다.
- **열차 정보 제공**: 특정 열차를 클릭하면 해당 열차의 행선지, 번호, 위치를 포함한 상태를 상세히 확인할 수 있습니다.
- **자동 상태 갱신**: 소켓을 통해 실시간 데이터를 받아 5초마다 열차 상태를 자동으로 갱신합니다.

## 개발 환경

| **카테고리** | **기술 스택**                                                                      |
| ------------ | ---------------------------------------------------------------------------------- |
| Frontend     | Javascript, React, Typescript(현재 마이그레이션 중), Zustand, Sass, Tanstack Query |
| Backend      | Java 17, SpringBoot 3.x, WebSocket, Async, MongoDB                                 |
| Infra        | AWS EC2, GitWebHook, Jenkins, Docker, Nginx                                        |

## 기여한 부분

- **프론트엔드 개발 및 실시간 통신 기능 구현**: 사용자 인터페이스를 구현하고, React 및 Typescript를 활용하여 동적인 웹 애플리케이션을 개발했습니다. 실시간 열차 정보 제공 및 자동 상태 갱신 기능을 구현하고, Zustand를 사용하여 전역 상태를 관리했습니다.
- **디자인 및 기능 구현**: 메인 화면과 노선별 화면을 디자인하고, Sass를 사용한 스타일링을 담당했습니다

## 디렉토리 구조

```
├── apis
│   ├── api
│   ├── services
│   └── utils
├── assets
│   ├── images
│   └── styles
│       └── scss
│           ├── components
│           ├── pages
│           └── setting
├── components
│   ├── Layout
│   ├── Line
│   ├── Section
│   ├── SectionList
│   ├── Station
│   ├── TrainInfo
│   └── TrainInfoModal
├── context
├── data
├── hooks
├── pages
├── routes
└── types
```

## 팀원 구성

| Frontend                               | Backend, Infra                             |
| -------------------------------------- | ------------------------------------------ |
| [@gaeguul](https://github.com/gaeguul) | [@JShistory](https://github.com/JShistory) |
