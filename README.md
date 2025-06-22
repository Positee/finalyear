# LearnHub - Learning Management System

LearnHub is a comprehensive learning management system with features for students, lecturers, and administrators.

## Database Setup

This project uses PostgreSQL with Prisma ORM. Follow these steps to set up your database:

### Prerequisites

- Node.js 16+ installed
- PostgreSQL installed and running
- npm or yarn package manager

### Setup Steps

1. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

2. **Configure your database**

Create a `.env` file in the root directory with your PostgreSQL connection string:

\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/learnhub?schema=public"
\`\`\`

Replace `username` and `password` with your PostgreSQL credentials.

3. **Generate Prisma client**

\`\`\`bash
npx prisma generate
\`\`\`

4. **Run migrations**

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

5. **Seed the database**

\`\`\`bash
npx prisma db seed
\`\`\`

6. **Start the development server**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Demo Credentials

### Student
- Email: john@example.com
- Password: password123

### Lecturer
- Email: emily.smith@example.com
- Password: password123

### Admin
- Email: admin@example.com
- Password: password123

## Database Schema

The database includes the following models:

- **User**: Students, lecturers, and administrators
- **Course**: Academic courses
- **Enrollment**: Student enrollments in courses
- **Session**: Class sessions for attendance tracking
- **AttendanceRecord**: Individual attendance records

## Development Tools

You can use Prisma Studio to view and edit your database:

\`\`\`bash
npx prisma studio
\`\`\`

This will open a web interface at http://localhost:5555 where you can manage your data.
