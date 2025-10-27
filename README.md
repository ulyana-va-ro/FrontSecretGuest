# Web Frontend - Секретный гость

React + TypeScript + Vite приложение для программы "Секретный гость" Островка.

## 🏗️ Технологии

- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик и dev сервер
- **Material-UI (MUI)** - UI компоненты
- **React Router** - Маршрутизация
- **Axios** - HTTP клиент

## 🚀 Быстрый старт

### Через Docker (рекомендуется)

```bash
# Из корня проекта
cd docker/compose
docker-compose up -d web-frontend

# Приложение доступно на http://localhost:3000
```

### Локальная разработка

```bash
cd web

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 📁 Структура проекта

```
web/
├── public/                 # Статические файлы
│   ├── assets/            # Изображения, иконки
│   └── index.html         # HTML шаблон
├── src/
│   ├── api/               # API клиенты
│   │   ├── index.ts       # Основной API клиент
│   │   ├── goApi.ts       # Hotel Service API
│   │   ├── guestApi.ts    # Guest Service API
│   │   ├── typesGo.ts     # TypeScript типы для Go API
│   │   └── typesPython.ts # TypeScript типы для Python API
│   ├── components/        # React компоненты
│   │   ├── Menu.tsx       # Главное меню
│   │   └── PrivateRoute.tsx # Защищенные маршруты
│   ├── pages/             # Страницы приложения
│   │   ├── AuthPage.tsx   # Авторизация
│   │   ├── RegisterPage.tsx # Регистрация
│   │   ├── ProfilePage.tsx # Профиль пользователя
│   │   ├── HotelPage.tsx  # Список отелей
│   │   ├── SecretGuestPage.tsx # Секретный гость
│   │   └── ReportPage.tsx # Отчеты
│   ├── styles/            # CSS стили
│   ├── types/             # TypeScript типы
│   ├── mocks/             # Моковые данные
│   ├── data/              # Статические данные
│   ├── App.tsx            # Главный компонент
│   └── main.tsx           # Точка входа
├── Dockerfile             # Docker образ
├── nginx.conf             # Nginx конфигурация
├── package.json           # Зависимости
└── vite.config.ts         # Конфигурация Vite
```

## 🔌 API Интеграция

### Конфигурация API

Приложение интегрируется с двумя бэкенд сервисами:

#### Guest Service (Python)
```typescript
// src/api/guestApi.ts
const API_BASE = '/guest'; // Проксируется через nginx

// Примеры эндпоинтов:
- POST /auth/register - Регистрация
- POST /auth/login - Авторизация  
- GET /profile/{id} - Профиль пользователя
- GET /bookings/{id}/current - Текущие бронирования
```

#### Hotel Service (Go)
```typescript
// src/api/goApi.ts  
const GO_API_BASE = "/hotel"; // Проксируется через nginx

// Примеры эндпоинтов:
- GET /hotels/{id} - Информация об отеле
- POST /secret-guest/apply - Подача заявки
- GET /secret-guest/profile - Профиль секретного гостя
```

### Аутентификация

Приложение использует JWT токены, сохраняемые в localStorage:

```typescript
// Автоматическое добавление токена к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎨 UI/UX

### Дизайн система

- **Material-UI** для консистентного дизайна
- **Responsive design** для мобильных устройств
- **Темная/светлая тема** (опционально)

### Основные страницы

1. **Авторизация** (`/auth`) - Вход в систему
2. **Регистрация** (`/register`) - Создание аккаунта
3. **Профиль** (`/profile`) - Личная информация
4. **Отели** (`/hotel`) - Каталог отелей
5. **Секретный гость** (`/secret-guest`) - Программа секретного гостя
6. **Отчеты** (`/report`) - Отчеты и аналитика
7. **Админ панель** (`/admin`) - Административные функции

### Навигация

```typescript
// Защищенные маршруты требуют авторизации
<Route path="/profile" element={
  <PrivateRoute>
    <ProfilePage />
  </PrivateRoute>
} />
```

## 🛠️ Разработка

### Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск dev сервера (http://localhost:5173)
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Линтинг кода
npm run lint
```

### Переменные окружения

Создайте файл `.env.local` для локальной разработки:

```env
# API endpoints (для локальной разработки)
VITE_GUEST_API_URL=http://localhost:8000
VITE_HOTEL_API_URL=http://localhost:8080

# Другие настройки
VITE_APP_TITLE=Секретный гость
```

### Добавление новых страниц

1. Создайте компонент в `src/pages/`
2. Добавьте маршрут в `App.tsx`
3. Обновите навигацию в `Menu.tsx`

```typescript
// Пример новой страницы
import React from 'react';

const NewPage: React.FC = () => {
  return (
    <div>
      <h1>Новая страница</h1>
    </div>
  );
};

export default NewPage;
```

## 🐳 Docker

### Dockerfile

Многоэтапная сборка для оптимизации размера образа:

```dockerfile
# Build stage - сборка приложения
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx vite build --mode production

# Production stage - nginx для раздачи
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
```

### Nginx конфигурация

```nginx
server {
    listen 3000;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статических файлов
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🧪 Тестирование

### Ручное тестирование

```bash
# Проверка сборки
npm run build
npm run preview

# Проверка API интеграции
curl http://localhost:3000
```

### Автоматическое тестирование

```bash
# Добавить тесты (пример с Vitest)
npm install -D vitest @testing-library/react

# Запуск тестов
npm run test
```

## 🚨 Известные проблемы

### TypeScript ошибки

При сборке могут возникать TypeScript ошибки в некоторых файлах. Для продакшена используется сборка без TypeScript проверок:

```bash
# В Dockerfile используется
RUN npx vite build --mode production
```

### CORS проблемы

При локальной разработке могут возникать CORS ошибки. Используйте прокси в `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/guest': 'http://localhost:8000',
      '/hotel': 'http://localhost:8080'
    }
  }
})
```

