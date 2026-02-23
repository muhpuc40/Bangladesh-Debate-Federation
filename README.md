# 🎙️ Bangladesh Debate Federation (BDF) — Official Website

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![PHP](https://img.shields.io/badge/PHP-8.3-blue.svg)]()
[![Laravel](https://img.shields.io/badge/Laravel-12-red.svg)]()
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

The official website of the **Bangladesh Debate Federation (BDF)** — a full-stack platform for managing debate events, news, member blogs, and more. Built with a React frontend and Laravel REST API backend.

🌐 **Live :** [https://bdfbd.org/](https://bdfbd.org/)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18.3, React Router 6, Tailwind CSS, Axios, Swiper |
| Backend | Laravel 12, PHP 8.3, JWT Auth, MySQL |
| Infrastructure | LiteSpeed, Hostseba.com |

---

## 🔑 API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | All events |
| GET | `/api/news` | All news |
| GET | `/api/blogs` | Accepted blogs |
| GET | `/api/blogs/{id}` | Single blog |
| GET | `/api/gallery` | Gallery albums |
| GET | `/api/gallery/{id}` | Album details |
| GET | `/api/committees` | Committee members |
| GET | `/api/advisors` | Advisor panel |
| GET | `/api/presidium` | Presidium members |
| GET | `/api/hall` | Hall of fame |
| GET | `/api/directory` | Debate club directory |

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register |
| POST | `/api/login` | Login |
| POST | `/api/logout` | Logout |
| GET | `/api/me` | Current user |

### Protected Endpoints (Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs/my` | User's own blogs |
| POST | `/api/blogs` | Create blog |
| PUT | `/api/blogs/{id}` | Update blog |
| DELETE | `/api/blogs/{id}` | Delete blog |

---

## 🔒 Security

- JWT token-based authentication
- Bcrypt password hashing
- CORS configuration
- Server-side input validation
- SQL injection prevention via Eloquent ORM

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Developer

**Minhaj Uddin Hassan**
- GitHub: [@muhpuc40](https://github.com/muhpuc40)
- Website: [minhaj.dev](https://minhaj.dev)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ for the debating community of Bangladesh  
> Support: [support@bdfbd.org](mailto:support@bdfbd.org)