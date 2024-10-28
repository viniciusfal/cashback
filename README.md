# Cashback App
![Cashback App Screenshot](https://viniciusfal.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F3.be993a07.jpg&w=1920&q=75)

**Cashback App** is a complete application consisting of a backend and a frontend, designed to manage cashback for transportation card users. The system provides an intuitive and efficient experience in rewards administration.

## 🛠️ Technologies Used

### Frontend
- **React + Vite**: Library for building user interfaces and bundling tool.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Shadcn/UI**: UI component library.
- **TypeScript**: A superset of JavaScript that adds static types.
- **React Query**: Tool for managing asynchronous states.

### Backend
- **PostgreSQL**: Relational database.
- **Docker**: Platform for containerization of applications.
- **Prisma ORM**: ORM for database manipulation.
- **Node.js + Fastify**: Web framework for API development.

## 📂 Project Structure
- `/api`: Contains the backend code.
- `/cashback`: Contains the frontend code.

## 📦 How to Run the Project Locally

### Setting Up the API
1. Create a `.env` file at the root of the project with the necessary configurations.
2. Start the Docker containers:
   ```bash
   docker-compose up
   ```
### Running the Frontend
Navigate to the frontend folder:
```bash
cd cashback
```
Install the dependencies:
```bash
pnpm install
or
npm install
```
Start the development server:
````bash
pnpm run dev
or
npm run dev
````

Open http://localhost:3000 to view the application.

"For more information, please refer to the Dockerfile."
