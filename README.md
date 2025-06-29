# 🎓 NGO Scholarship Portal

A modern, secure web application built with **Next.js**, **React**, and **Tailwind CSS** to help students apply for scholarships, with robust admin features for managing applications.

## 🌟 Features

- 📝 Scholarship application form with file upload (images & PDFs)
- 🔒 Only authenticated users can apply for scholarships
- 📧 Automated email notifications for every application status (applied, verified, rejected)
- 🧑‍💼 Admin dashboard to review, verify, or reject applications
- 👥 Admins can promote users to admin roles for collaborative verification
- 📥 Admins can export verified student data as Excel backups
- 📢 Notification system for important updates
- 💬 Student testimonials and feedback section
- 📊 Animated stats and counters
- 📱 Fully responsive design

---

## 🚀 Technologies Used

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js (Google & GitHub providers)
- **File Storage**: Secure server-side handling of images and PDFs
- **Email**: Automated notifications for users and admins
- **Deployment**: Vercel 

---

## 📸 Pages Overview

| Page           | Description                                           |
|----------------|------------------------------------------------------|
| `/`            | Home page with hero, stats, CTA, testimonials        |
| `/scholarship` | Scholarship form (requires login, supports file upload) |
| `/about`       | Information about the organization and mission       |
| `/dashboard`   | Admin dashboard for managing applications            |
| `/api/auth/...`| Handles authentication with NextAuth                 |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ishwar-meena/talenthub
cd talenthub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file with your MongoDB URI, NextAuth credentials, and email provider settings.

### 4. Run the Development Server

```bash
npm run dev
```

---

## 🔐 Security Best Practices

- Only logged-in users can access and submit the scholarship form.
- All file uploads are validated and stored securely on the server.
- Admin routes are protected and accessible only to admin users.
- Admins can export verified student data as Excel files for backup.
- Email notifications keep users informed about their application status.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.
