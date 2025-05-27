# Pagemaster Backend

A RESTful API backend for managing books and user authentication.

## Technology and Tools

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Testing:** Jest
- **Authentication:** JWT
- **Validation:** Express Validator
- **Containerization:** Docker

## Prerequisites

- Node.js
- npm
- Docker and docker-compose

## Run the Application

Follow these steps to get the application running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file. No need to change the values.

```bash
cp .env.example .env
```

### 3. Start the Database

Start the PostgreSQL database using Docker:

```bash
docker compose up -v
```

### 4. Set Up the Database

Run the database migrations:

```bash
npx prisma migrate dev
```

### 5. Seed the Database

Populate the database with initial mock data:

```bash
npm run prisma:seed
```

### 6. Start the Development Server

Launch the application in development mode:

```bash
npm run dev
```

The server will be available at http://localhost:3000

## Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── config/
├── features/
│   ├── auth/
│   └── books/
├── middleware/
├── test/
└── app.ts
```
