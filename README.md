# 🚀 QuickHire - Modern Job Board Application

QuickHire is a premium, full-stack job board platform designed to connect top talent with industry-leading companies. Built with a focus on speed, user experience, and a clean, professional aesthetic, it offers a seamless interface for both job seekers and administrators.

---

## ✨ Key Features

### 👤 For Candidates (Job Seekers)

- **Smart Discovery**: Browse an extensive library of job listings with real-time updates.
- **Advanced Filtering**: Find your dream role using multi-criteria search (Title, Company, Location, and Category).
- **Premium UI Cards**: High-definition job cards with custom brand icons and category-specific color coding.
- **Instant Application**: Streamlined application process including resume link integration and cover note submission.
- **Seamless Auth**: Secure user registration and login system with JWT-protected profiles.

### 🛡️ For Administrators

- **Power Dashboard**: A centralized hub to manage the entire health of the platform.
- **Job Lifecycle Management**: Full CRUD capabilities to post, edit, and remove job listings.
- **Applicant Tracking**: Detailed view of all incoming applications, including candidate contact info and resumes.
- **Role-Based Access**: Specialized administrative routes and UI components that only appear for authorized accounts.

---

## 🛠️ Technical Ecosystem

| Layer        | Technologies                                                    |
| :----------- | :-------------------------------------------------------------- |
| **Frontend** | Next.js 15 (App Router), Tailwind CSS, Redux Toolkit, RTK Query |
| **Backend**  | Node.js, Express.js                                             |
| **Database** | PostgreSQL (Relational)                                         |
| **Security** | JSON Web Tokens (JWT), Bcrypt.js (Password Hashing)             |
| **Icons**    | Lucide React                                                    |
| **Alerts**   | SweetAlert2 (Premium Popups)                                    |

---

## 🔐 Authentication & Admin Access

QuickHire uses a secure, role-based authentication system. To test the administrative features (Post Jobs, Delete, View Applications), please use the following credentials:

| Type              | Email Address        | Password    |
| :---------------- | :------------------- | :---------- |
| **Admin Account** | `abusayed@gmail.com` | `Pa$$w0rd!` |

> [!IMPORTANT]
> Administrative features are protected. Only accounts with the `admin` role in the database can access the dashboard routes (`/admin`, `/admin/add-job`, etc.).

---

## 🚀 Getting Started

### 📦 Prerequisites

- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: v14.0 or higher
- **NPM**: v9.0.0 or higher

### 🏗️ 1. Backend Setup

1. Enter the backend directory:
   ```bash
   cd backend
   ```
2. Install the lightweight server dependencies:
   ```bash
   npm install
   ```
3. Initialize the Database:
   - Create a database called `your_db_name`.
   - Run the automated initialization script (this creates all tables):
     ```bash
     node init-db.js
     ```
4. Configuration:
   - Create a `.env` file with your credentials:
     ```env
     PORT=your_port
     DB_USER=your_db_user
     DB_HOST=your_db_host
     DB_NAME=your_db_name
     DB_PASSWORD=your_db_password
     DB_PORT=your_db_port
     JWT_SECRET=any_random_secret_string
     ```
5. Launch the API:
   ```bash
   npm run dev
   ```

### 💻 2. Frontend Setup

1. Stay in the root directory:
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 Core API Endpoints

### Authentication

- `POST /api/auth/register` - Create a new user profile
- `POST /api/auth/login` - Authenticate and receive JWT
- `GET /api/auth/profile` - Retrieve current user details (Protected)

### Job Intelligence

- `GET /api/jobs` - Global job explorer (supports search/filter)
- `GET /api/jobs/:id` - Detailed job specifications
- `POST /api/jobs` - Create listing (Admin Authorized)
- `DELETE /api/jobs/:id` - Remove listing (Admin Authorized)

### Applications

- `POST /api/applications` - Submit candidate info
- `GET /api/applications` - Fetch all applications (Admin Authorized)

---

## 🎨 Design Vision

The UI is strictly implemented based on the **Figma Design Specification**, featuring premium aesthetics like:

- **Glassmorphism**: Backdrop blur effects on the persistent navbar.
- **Dynamic Icons**: Category-specific iconography and color palettes.
- **Micro-animations**: Hover states and loading indicators for a "live" feel.
- **Responsive-First**: Fully optimized for mobile, tablet, and desktop viewports.

---

Created with ❤️ by the **QuickHire** Engineering Team.
