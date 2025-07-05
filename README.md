# 🏢 SecureApt - React + Django + JWT Auth Apartment Manager

> A modern full-stack Apartment Listing & Management web app powered by **React**, **Django REST Framework**, **PostgreSQL**, and **JWT Authentication** — with full CRUD, email verification, and password reset functionality.

---

## 🚀 Features

✅ User Registration with Email Verification  
✅ JWT-based Login & Logout Authentication  
✅ Forgot Password & Reset Password via Email  
✅ List Apartments with full CRUD support  
✅ Add, Edit & Delete Comments (only by logged-in users)  
✅ Owner-based permissions for apartments  
✅ Fully responsive, styled React frontend  
✅ Secure and scalable with PostgreSQL backend  
✅ Email system using Gmail SMTP (App Password)

---

## 🛠️ Tech Stack

| 🔧 Frontend | ⚙️ Backend | 🗄️ Database | 🔐 Auth |
|------------|-------------|-------------|----------|
| React.js   | Django REST Framework | PostgreSQL | JWT + Email Tokens |

---

## 📸 Screenshots

> *(Add screenshots here for Register, Login, Apartment Page, Comments, Forgot Password, etc.)*

---

## ⚙️ Setup Instructions

### 1️⃣ Backend (Django)

```bash
cd apartment-backend
python -m venv env
env\Scripts\activate  # for Windows
# or
source env/bin/activate  # for Linux/macOS

pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # optional, for admin panel
python manage.py runserver
````

✅ Configure `settings.py`:

* Replace `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` with your Gmail and App Password.
* Confirm `DEFAULT_FROM_EMAIL` is set.

---

### 2️⃣ Frontend (React)

```bash
cd apartment-frontend
npm install
npm start
```

---

## 🔐 Auth & Flow

1. **Register** → Email sent with verification link
2. **Login** → Gets JWT token saved in state
3. **Forgot Password** → Sends reset link to registered email
4. **Reset Password** → Sets new password securely
5. **Apartments/Comments** → Accessible only if authenticated
6. **Only owners** can edit/delete their listings

---

## 🌍 Environment Variables (Frontend)

Make sure to store API endpoints like:

```env
REACT_APP_API_BASE=http://127.0.0.1:8000/api
```

Or hardcode them in `fetch()` calls for local dev.

---

## 🧠 Folder Structure

```
📦 apartment-project/
├── 🐍 apartment-backend/
│   ├── listings/
│   └── manage.py
├── ⚛️ apartment-frontend/
│   ├── src/
│   └── package.json
```

---

## 📬 Contact

Developed with ❤️ by **Vamsi Krishna**
📧 Email: [satyavoluvamsikrishna@gmail.com](mailto:satyavoluvamsikrishna@gmail.com)
🔗 GitHub: [@Vamsi5555233](https://github.com/Vamsi5555233)

---

## 🏗️ Future Plans

* 🖼️ Image Upload for Apartments
* 🔍 Search & Filter by price/location
* 🧾 Pagination and Sorting
* 🌐 Deployment on Render (Backend) & Vercel (Frontend)

---

## 🔐 Admin Panel Access

Django’s admin panel is available at:
[http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)
Login with superuser credentials.

---

## 📃 License

This project is open-source and available under the [MIT License](LICENSE).

---

> 🔒 Built to be secure.
> 💡 Designed to be modern.
> 💻 Developed by **Vamsi**.

```
