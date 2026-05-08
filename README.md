# CRM Pro - Lead Management System

## Project Overview
CRM Pro is a robust, full-stack Customer Relationship Management (CRM) system designed specifically for sales teams. It provides an intuitive, high-performance interface for managing leads, tracking deal values, and maintaining detailed notes. The application features a stunning custom glassmorphic login screen, a dynamic dashboard with real-time metrics, and comprehensive lead tracking to streamline sales pipelines.

## Tech Stack Used
**Frontend:**
- **React 18** (with Hooks and functional components)
- **TypeScript** for static type checking
- **Vite** as the build tool and development server
- **Tailwind CSS** for responsive, utility-first styling and custom dark-theme glassmorphism UI
- **Lucide React** for beautiful, consistent iconography
- **Recharts** for interactive dashboard data visualization
- **Axios** for API requests and interceptor-based authentication
- **React Router** for client-side navigation

**Backend:**
- **Node.js** with **Express.js** framework
- **TypeScript** for robust backend architecture
- **Prisma ORM** for type-safe database interactions
- **PostgreSQL** as the primary relational database
- **JSON Web Tokens (JWT)** for secure, stateless user authentication
- **Bcrypt.js** for password hashing and security

## Features Implemented
- **Secure Authentication:** JWT-based login with a fully custom, animated, glassmorphic sign-in page.
- **Interactive Dashboard:** Visualizes key performance indicators (KPIs) like total leads, active deals, win rates, and a deal value distribution chart.
- **Lead Pipeline Management:** Comprehensive CRUD capabilities for leads, allowing sales reps to track lead source, status, and assigned personnel.
- **Advanced Filtering & Search:** Real-time filtering of leads by text search, status dropdowns, and source tracking.
- **Lead Notes System:** Integrated note-taking capability tied to specific leads to track communication history and updates.
- **Responsive Design:** A polished UI that adapts to different screen sizes.

## How to Run Locally

1. **Prerequisites:** Ensure you have Node.js (v18+) and npm installed.
2. **Clone the Repository:** Navigate to your desired directory and clone/unzip the project.

**Backend Setup:**
1. Open a terminal and navigate to the backend directory: `cd d:\CRM\backend`
2. Install dependencies: `npm install`
3. Generate the Prisma Client: `npx prisma generate`
4. Apply database migrations (if setting up a fresh local DB): `npx prisma db push`
5. Start the backend development server: `npm run dev`
*(The backend will run on `http://localhost:5000`)*

**Frontend Setup:**
1. Open a new terminal and navigate to the frontend directory: `cd d:\CRM\frontend`
2. Install dependencies: `npm install`
3. Start the frontend development server: `npm run dev`
*(The frontend will run on `http://localhost:5173`)*

## Environment Variables
To run the application, you will need to configure environment variables.

**Backend (`d:\CRM\backend\.env`):**
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
DATABASE_URL="postgresql://username:password@host:6543/database?pgbouncer=true"
DIRECT_URL="postgresql://username:password@host:5432/database"
```

**Frontend (`d:\CRM\frontend\.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

## Test Login Credentials
To test the application without creating a new user, you can use the pre-seeded admin account:
- **Email:** `admin@example.com`
- **Password:** `password123`

## Database Setup
The project uses PostgreSQL as its database, managed entirely through Prisma ORM. 
The schema consists of three primary models:
1. `User` - Handles authentication and access.
2. `Lead` - Stores all lead information, statuses, and deal values.
3. `Note` - Relational table linking timestamped notes to specific leads.

If you are using a cloud provider like Supabase or Neon, simply grab the connection strings and place them in the backend `.env` file under `DATABASE_URL` and `DIRECT_URL`.

## Known Limitations
- **Role-Based Access Control (RBAC):** Currently, all authenticated users have the same level of access. There is no distinction between standard sales reps and administrators.
- **Lead Deletion:** While the backend supports cascading deletes, the frontend UI currently lacks a soft/hard delete button for leads to prevent accidental data loss.
- **Pagination:** The leads table loads all leads at once. For massive datasets, server-side pagination should be implemented.

## Reflection Note
Building CRM Pro was a fantastic exercise in integrating a modern React frontend with a robust Prisma/PostgreSQL backend. Transitioning the backend from raw SQL to Prisma ORM significantly improved developer velocity and type safety across the stack. Additionally, translating raw CSS animations and custom styling into a React-friendly, Tailwind-compatible format for the login screen reinforced the flexibility and power of combining inline styles with utility classes to achieve pixel-perfect designs. Overall, this project serves as a solid foundation that can be easily scaled with microservices or additional CRM modules in the future.
