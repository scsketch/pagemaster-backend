# Pagemaster Backend

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

## Run the application

Follow these steps to get the application running:

### 1. Install Dependencies

```bash
npm install
```

### 2. Copy .env.example

```bash
cp .env.example .env
```

### 3. Start the PostgreSQL Docker container

```bash
docker compose up -d
```

### 4. Run the database migrations

```bash
npx prisma migrate dev
```

### 5. Seed the database with initial mock data

```bash
npm run prisma:seed
```

### 6. Start the development server

Launch the application in development mode

The server will be available at http://localhost:3000

### 7. Stop the docker container when you're done

```bash
docker compose down
```

## Running Tests

```bash
npm test
```

Note there are only a few tests for demonstration purposes.

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

## API Endpoints

### Authentication

| Method | Endpoint              | Description       | Auth Required |
| ------ | --------------------- | ----------------- | ------------- |
| POST   | `/api/v1/auth/login`  | Login user        | No            |
| POST   | `/api/v1/auth/signup` | Register new user | No            |
| POST   | `/api/v1/auth/logout` | Logout user       | Yes           |

### Books

| Method | Endpoint            | Description                                 | Auth Required |
| ------ | ------------------- | ------------------------------------------- | ------------- |
| GET    | `/api/v1/books`     | Get all books with pagination and filtering | Yes           |
| GET    | `/api/v1/books/:id` | Get a book by ID                            | Yes           |
| POST   | `/api/v1/books`     | Create a new book                           | Yes           |
| PATCH  | `/api/v1/books/:id` | Update a book                               | Yes           |
| DELETE | `/api/v1/books/:id` | Delete a book                               | Yes           |

### Query Parameters for GET /books

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search term for title or author
- `genre`: Filter by genre

## API Documentation

In development mode, the API documentation is available at `/api-docs`. You can interact with the API there as well.

## Notes

### Security

- JWT-based authentication
- Password hashing, not returning them in response
- CORS configuration
- Input validation and sanitization
- Filtering sensitive user info in logs
- Helmet
- Error responses that do not reveal implementation details
- Force HTTPS in production
- Rate limiting
- SQL injection (Prisma query builder, no raw SQL, input sanitization)
