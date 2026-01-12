# 🛒 Modern Full-Stack E-Commerce System

A powerful, scalable, and modular e-commerce platform built with **React 19** and **Express 5**. This system is designed with a focus on clean UI/UX, featuring a dual-theme architecture for consumers and administrators.



## 🚀 Key Features

* **Dual-Theme Logic**: Seamlessly switch between a vibrant **User Mode** (Orange Palette) and a professional **Admin Mode** (Blue Dashboard).
* **Complete Product Management**: Full CRUD cycle for products, including a dynamic variant system (sizes, colors, etc.).
* **Professional UI States**: Centralized handling for **Loading**, **Error** (with smart JSON parsing), and **Empty** states using Lucide icons.
* **Modern Auth Flow**: Secure authentication using **JWT** with frontend decoding and protected routes.
* **Next-Gen Styling**: Built with **Tailwind CSS 4** for high-performance, utility-first styling.
* **Safe Destruction**: Integrated modal confirmation system for critical actions like product deletion.

---

## 🛠️ Technical Stack

### Frontend
* **Core**: React 19 (Vite), React Router Dom 7
* **UI/UX**: Headless UI (@headlessui/react)
* **Icons**: React Icons (Lucide/Lu set)
* **Styling**: Tailwind CSS 4, PostCSS, Autoprefixer
* **Data Handling**: Custom Hooks, JWT-Decode, React-Paginate

### Backend
* **Runtime**: Node.js & Express 5
* **Database ORM**: Sequelize 6
* **Security**: Bcrypt (Password Hashing), JsonWebToken (Access Control)
* **Validation**: Express Validator
* **File Storage**: Multer (Product image processing)

### Database
* **Engine**: MySQL 8.x

---

## 📂 Project Structure

The project is strictly organized into two main directories: `client` and `server`, ensuring a clean separation of concerns.

### 💻 Client (Frontend)
Located in the `/client` directory, built with Vite and React.
- **src/assets**: Static assets like images and global icons.
- **src/components**: Reusable UI components (Admins, Users, Shared).
- **src/contex**: Global State Management providers (Context API).
- **src/hooks**: Custom React hooks for API calls and logic.
- **src/pages**: Full-page components and routing views.
- **src/utils**: Helper functions.

### ⚙️ Server (Backend)
Located in the `/server` directory, built with Express and Sequelize.
- **config**: Database connection and environment configurations.
- **controllers**: Request handlers and business logic.
- **middleware**: Authentication guards and request validation.
- **migrations**: Database schema version control (Sequelize Migrations).
- **models**: Sequelize models defining the MySQL database structure.
- **routes**: API endpoint definitions.
- **seeders**: Scripts for populating the database with initial data.
- **services**: Specialized logic (e.g., external API integrations, mailers).
- **validators**: Request validation schemas (e.g., login, products, orders) using `express-validator`.
- **uploads**: Storage for product images.

---

## ⚙️ Setup & Installation

Follow these steps to get your development environment running.

```bash
### 1. Clone the Project
git clone https://github.com/CraXWaR/TradeHub.git
cd TradeHub

### 2. Database Setup (MySQL)
Create a new MySQL database (e.g., fashion_cube_db).

Tables will be generated automatically via migrations.

### 3. Server Configuration (Backend)

cd server
npm install

Environment Setup: Rename the .env.example file to .env located in the /server folder and fill in your correct credentials:

DB_HOST=localhost
DB_USER="your_user"
DB_PASSWORD="your_password"
DB_NAME="your_db_name"
DB_PORT=3306
DB_DIALECT=mysql
PORT=5000

JWT_SECRET="your_secret_key"

CLIENT_URL="http://localhost:5173"

npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

Start the backend:
npm run dev

4. Client Configuration (Frontend)
Open a new terminal:

cd client
npm install
npm run dev
The app will be live at: http://localhost:5173

🛡️ Security & Validation
Password Hashing: Powered by bcrypt for secure credential storage.
API Protection: JWT middleware ensures all sensitive routes are guarded.
Data Integrity: Strict schema validation implemented in the /server/validators directory using express-validator.
