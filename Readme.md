# Finviz Assessment Project

This project consists of a multi-service application using Docker Compose. It includes a database (PostgreSQL), a backend API (Node.js with Bun and Express), and a frontend UI (Vite-based application).

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js (for local development if needed).

## Project Structure

- **db**: PostgreSQL database.
- **app**: Application scripts (e.g., parsing data).
- **api**: API service built with Node.js, Bun, and Express.
- **ui**: Frontend UI service built with Vite.

## Setup and Running

### Environment Configuration

Create an `.env` file in the `api` directory with the following content:

```plaintext
PGHOST=db
PGPORT=5432
PGDATABASE=my_db
PGUSER=my_user
PGPASSWORD=my_password
```

Create an .env file in the ui directory for local development:

```plaintext
VITE_API_URL=http://localhost:8080
```

Starting the Application
Build and Start Services
Use Docker Compose to build and start all services:

```bash
docker-compose up --build
```

### Accessing the Services

```
Database: Available on port 5432.
API: Accessible at http://localhost:8080.
UI: Accessible at http://localhost:5173.
```

## Development Notes

### Backend (api):

Ensure CORS is properly set in api/app.ts to allow access from the UI.
Frontend (ui): Ensure API requests use the appropriate URL based on the environment.

### Troubleshooting

Network Errors: If you encounter ERR_NAME_NOT_RESOLVED, verify that you've configured the app to use the correct API URL for your environment.
Service Logs: Check the logs of each service to debug any issues:

```bash
docker-compose logs <service-name>
```

### UI to API Issues:

When running in Docker, ensure API calls from the UI are made using the service names defined in docker-compose.yml.

## Useful Commands

### Rebuild and Restart:

```bash
docker-compose down --volumes
docker-compose up --build
```

### Container Shell Access:

```bash
docker exec -it <container_name> /bin/sh
```

## Further Development

- Add endpoint and route documentation.
- Implement automated testing for services.
- Configure production-ready Docker setups and security reviews.
- Add global state management library like Zustand.
- Add schema declaration and validation library Zod.

  This documentation provides a step-by-step guide to setting up and running the project, along with helpful troubleshooting tips. Be sure to verify that all paths and specific commands are correct for your environment.
