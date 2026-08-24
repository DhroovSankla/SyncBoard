# SyncBoard

SyncBoard is a real-time collaborative task board application. It allows multiple users to create, move, prioritize, and update tasks simultaneously. Changes are synchronized instantly across all connected clients using WebSockets.

## Tech Stack

- **Backend**: Java 21, Spring Boot 3.4.1, Spring Data JPA, Spring Security, Spring WebSocket (STOMP Protocol), JWT Authentication.
- **Frontend**: React (TypeScript), SockJS, StompJS, Lucide React (Icons).
- **Database**: MySQL 8.0.

---

## Prerequisites

To run this application, you will need:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Recommended)
- OR local installations of **Java 21** and **Node.js (v18+)** if you prefer to run services individually without Docker containers.

---

## Project Structure

```text
SyncBoard/
├── docker-compose.yml       # Configuration for MySQL, backend, and frontend containers
├── .env                     # Database and JWT configuration (created from .env.example)
├── syncboard/               # Backend codebase (Spring Boot)
│   ├── Dockerfile           # Multi-stage Docker build config for backend
│   └── src/                 # Spring Boot application code
└── syncboard/syncboard-frontend/  # Frontend codebase (React + TypeScript)
    ├── Dockerfile           # Multi-stage Docker build config for frontend (using Nginx)
    └── src/                 # React components and services
```

---

## How to Run

### Option 1: Full-Stack Containerization (Recommended)

This method boots the database, backend, and frontend together inside Docker containers with a single command:

1. **Clone the repository and prepare configuration**:
   Copy `.env.example` to `.env` if not already present:
   ```bash
   cp .env.example .env
   ```
2. **Build and start the application**:
   ```bash
   docker-compose up --build -d
   ```
3. **Access the application**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8080](http://localhost:8080)
   - **MySQL Database**: Connect locally via host port `3307`

4. **Stop the containers**:
   ```bash
   docker-compose down
   ```

---

### Option 2: Running Locally (Developer Mode)

If you are developing and want to make changes interactively:

#### 1. Start the Database
Launch only the MySQL container:
```bash
docker-compose up -d mysql
```

#### 2. Start the Backend
1. Navigate to the backend directory:
   ```bash
   cd syncboard
   ```
2. Compile and run the Spring Boot application:
   ```bash
   # On Windows (PowerShell/CMD):
   .\gradlew bootRun

   # On Linux/macOS:
   ./gradlew bootRun
   ```
The backend API will start on port `8080`.

#### 3. Start the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd syncboard/syncboard-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
Your browser will automatically open [http://localhost:3000](http://localhost:3000) with hot-reloading enabled.

---

## Database Configuration

Configuration parameters are loaded from the root `.env` file:
- `MYSQL_DATABASE`: The name of the MySQL database (`syncboard` by default).
- `MYSQL_USER`: The username used by the backend to connect (`syncuser`).
- `MYSQL_PASSWORD`: The password for the database connection.
- `MYSQL_PORT`: Port exposed to your host machine (`3307` by default).
- `JWT_SECRET`: Hex secret key used to sign and verify JWT authorization tokens.
