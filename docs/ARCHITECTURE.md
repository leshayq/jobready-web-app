# Architecture — [JobReady]

Монолитное приложение с разделением на backend (NestJS) и frontend (React). Репозитории/папки:

- `/backend` — NestJS приложение (API, auth, бизнес-логика).
- `/frontend` — React SPA (router на клиенте).
  Backend собирает и отдает статический билд фронтенда (`/client/dist`) и ставит глобальный префикс API: `/api`.

## Структура проекта

```
/project-root
├── backend/          # NestJS app
│   ├── src/          # логика проекта
│   │   ├── main.ts
│   │   ├── app.controller.ts     # корневой контроллер приложения
│   │   ├── app.module.ts         # корневой модуль приложения
│   │   ├── app.service.ts        # корневой сервис приложения
│   │   ├── auth/                 # ресурс авторизации
│   │   ├── common/               # общие утилиты (dto, filters interceptors, interfaces)
│   │   ├── email-verification/   # ресурс подтверждения электронной почты
│   │   ├── interview-requests/   # ресурс запросов собеседований
│   │   ├── mail/                 # ресурс отправки сообщений электронной почтой
│   │   ├── questions/            # ресурс вопросов
│   │   ├── tags/                 # ресурс тегов к вопросам
│   │   └── users/                # ресурс пользователей
│   ├── Dockerfile.dev
│   ├── Dockerfile.prod
│   └── .env.example              # пример переменных окружения
├── frontend/          # React app
│   ├── public/        # Статические файлы
│   ├── src/           # Исходный код приложения
│   │   ├── api/       # Запросы к backend API
│   │   ├── assets/    # Изображения, шрифты, стили
│   │   ├── components/# UI-компоненты
│   │   ├── context/   # React Context для глобального состояния
│   │   ├── forms/     # Формы и их логика
│   │   ├── hooks/     # Кастомные React хуки
│   │   ├── pages/     # Страницы приложения
│   │   ├── utils/     # Утилитарные функции и хелперы
│   │   ├── App.css    # Стили приложения
│   │   ├── App.jsx    # Корневой компонент приложения
│   │   ├── index.css  # Глобальные стили
│   │   ├── main.jsx   # Точка входа React
│   ├── normalize.css  # Сброс стилей браузера
│   ├── Dockerfile.dev
│   └── Dockerfile.prod
├── docs/
│   ├── ARCHITECTURE.md # описание архитектуры приложения
├── docker.compose.dev.yml
├── docker.compose.prod.yml
└── README.md
```
