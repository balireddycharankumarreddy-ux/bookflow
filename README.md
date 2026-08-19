# 📚 BookFlow — Library Management System (Frontend)

A React-based library management dashboard built with **Vite**, **React 19**, **Bootstrap 5**, and **Chart.js**. Designed to work with a Spring Boot backend API.

Deployed on [Vercel](https://vercel.com).

---

## 🛠️ Tech Stack

- **React 19** with React Router v7
- **Vite 8** for fast builds
- **Bootstrap 5** for styling
- **Chart.js** for data visualization
- **React Icons** for iconography

---

## ✨ Features

- **Authentication** — Login, register, forgot password with email verification
- **Dashboard** — Overview with charts and statistics
- **Book Management** — Add, edit, delete, and search books
- **Student Management** — Add, edit, delete, and search students
- **Issue & Return** — Issue books to students and track returns
- **Reports** — Visual reports powered by Chart.js
- **Profile** — User profile management
- **Protected Routes** — JWT-based route guards
- **Notifications** — Toast and notification panel system

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**

### Install & Run

```bash
npm install
npm run dev
```

The app will start at **http://localhost:5173**.

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
├── public/              # Static assets (favicon, icons)
├── src/
│   ├── assets/          # Images and static components
│   ├── components/      # Reusable UI components
│   ├── layouts/         # Dashboard layout
│   ├── pages/           # Page components (Login, Dashboard, Books, etc.)
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌐 Backend API

This frontend expects a backend API running at **http://localhost:8081**. Set the API base URL in the frontend source or via environment variables as needed.

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint with oxlint |
