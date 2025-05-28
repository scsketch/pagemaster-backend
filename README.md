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

```bash
npm run dev
```

The server will be available at http://localhost:3000

### 7. Stop the docker container when you're done

```bash
docker compose down
```

## Running Tests

```bash
cp .env.example .env.test
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

In development mode, the API documentation is available via Swagger at `http://localhost:3000/api-docs`.

<img width="694" alt="image" src="https://github.com/user-attachments/assets/8bd300a0-bba1-4ee8-9aa6-8387a3f7f63c" />

To interact with the API via Swagger:

1. Login or sign up
2. Copy the token in the response and paste it into the Authorize section at the top of the page (click the Authorize button).
3. Use the protected book routes.

### Query Parameters for GET /books

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search term for title or author
- `genre`: Filter by genre

## Notes

- You need to be authorized to call `/logout`, but it doesn't do anything to the token (no blacklist, etc). There's a comment in the service code explaining we're just letting the token expire naturally (24h).

### Security

- JWT-based authentication
- Password hashing, and excluding them from responses
- CORS configuration
- Input validation and sanitization
- Filtering sensitive user info in logs
- Helmet
- Error responses that do not reveal implementation details
- Force HTTPS in production
- Rate limiting
- SQL injection (Prisma query builder, no raw SQL, input sanitization)
