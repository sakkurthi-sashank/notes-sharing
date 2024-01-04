# Note Sharing Backend API

## Tech Stack

- TypeScript
- Node.js
- Express
- Prisma ORM
- Kysely ORM
- Jest
- PostgreSQL


## API Endpoints

### Authentication Endpoints
- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account and receive an access token.

### Note Endpoints
- `GET /api/notes`: Get a list of all notes for the authenticated user.
- `GET /api/notes/:id`: Get a note by ID for the authenticated user.
- `POST /api/notes`: Create a new note for the authenticated user.
- `PUT /api/notes/:id`: Update an existing note by ID for the authenticated user.
- `DELETE /api/notes/:id`: Delete a note by ID for the authenticated user.
- `POST /api/notes/:id/share`: Share a note with another user for the authenticated user.
- `GET /api/notes/search?q=:query`: Search for notes based on keywords for the authenticated user.

## Testing 

<img width="1047" alt="Screenshot 2024-01-04 at 2 13 11 PM" src="https://github.com/sakkurthi-sashank/notes-sharing/assets/126908332/81978f91-df39-4eba-b3af-7b7783bf9e84">
<img width="1074" alt="Screenshot 2024-01-04 at 3 43 09 PM" src="https://github.com/sakkurthi-sashank/notes-sharing/assets/126908332/ae2451fd-5864-4aa6-942c-6746b9018542">

## Local Installation and Development

### Setup Environment Variables

1. clone the repository

```bash
https://github.com/sakkurthi-sashank/notes-sharing.git
```

2. Create a `.env` file in the root directory.
3. Add the following variables to the `.env` file:

```bash
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=


DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public

PORT=8080

JWT_SECRET=
```

4. After creating the `.env` file, execute the following command to run database migrations:

```bash
npx prisma migrate dev

```

#### Start Development Server
5. For development:

```bash
npm run dev

```

#### Build and Start Production Server
6. For production:

```bash
npm run build && npm run start

```






