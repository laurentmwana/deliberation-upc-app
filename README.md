# 📚 UPC Academic Deliberation System (LMD)

> A web application developed for managing academic deliberations under the LMD (Licence - Master - Doctorat) system at Université Protestante au Congo.

![Laravel](https://img.shields.io/badge/Backend-Laravel-red?logo=laravel&style=flat)
![Inertia](https://img.shields.io/badge/Frontend-Inertia.js-blueviolet?logo=inertia&style=flat)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-38BDF8?logo=tailwindcss&style=flat)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📌 Features

- 🔐 Authentication & role-based access (Admin, Student)
- 🎓 Student & teacher management
- 🎯 Level, department, orientation, semester, and year tracking
- 📑 Grade management with automated deliberation results
- 🧾 Coupon generation for validated results
- 📊 Admin dashboard & student results page
- 📱 Responsive user interface (mobile-friendly)
- 🌙 Light/dark mode toggle
- 📥 Exportable and printable results

---

## ⚙️ Stack

| Layer     | Tech                                      |
| --------- | ----------------------------------------- |
| Backend   | Laravel 11, Eloquent ORM                  |
| Frontend  | Inertia.js (React), TypeScript            |
| Styling   | Tailwind CSS, Lucide Icons                |
| Auth      | Laravel Breeze + Sanctum                  |
| Database  | MySQL / MariaDB                           |
| Dev Tools | Vite, Laravel Debugbar, Laravel Telescope |

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/laurentmwana/deliberation-upc-app.git
cd deliberation-upc-app
```

### 2. Install dependencies

```bash
composer install
npm install && npm run dev
```

### 3. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` with your DB credentials.

### 4. Migrate & seed the database

```bash
php artisan migrate --seed
```

### 5. Serve the application

```bash
php artisan serve
```

---

## 🧪 Testing

Run feature and unit tests:

```bash
php artisan test
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🏫 Université Protestante au Congo

Developed with ❤️ for the students and academic staff of UPC — enabling efficient, transparent, and modern academic deliberation.

```

```
