# NexusEvnt (Server)

## Description

This is a web-based platform that allows users, both Organizers and Attendees to:

- Organizers: Create, manage and promote events.
- Attendees: Browse, book and receive updates about events.

## Key Features:

- Event creation with customizable details.
- Secure booking system integrated with payments.
- Real-time updates and notifications for attendees.

## Goal:

Streamline event management while improving attendee experiences.

## API Features

- RESTful API
- Authentication & Authorization (JWT, OAuth, etc.)
- Database Integration (MongoDB/MySQL/Redis)
- Error Handling & Logging
- Environment Configuration Support

## HOW SETUP THE SERVER

### Clone the project github repository

```
git clone https://github.com/NexusEvnt/nexusevnt
cd nexusevnt
npm install
```

### Install redis-cli

```
sudo apt update && sudo apt install redis-tools
sudo apt install redis-server
```

### Configuration

Create a .env file in the root directory and add your environment variables:
You can create a random **ACCESS_TOKEN_SECRET** and **REFRESH_TOKEN_SECRET**.

```
PORT=3300
NODE_ENV_MODE="dev"
MONGO_URI="mongodb+srv://nachodev:nacho369@project-database.jmny1.mongodb.net/nexusevnt_db?retryWrites=true&w=majority&appName=Project-Database"
ACCESS_TOKEN_SECRET=""
REFRESH_TOKEN_SECRET=""

STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### Running The Server

**Developement Server**

```
npm run dev
```

**Production Server**

```
npm start
```

## API ENDPOINTS

## API Endpoints

### User Authentication

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/api/register` | Register a new user  |
| POST   | `/api/login`    | Authenticate user    |
| POST   | `/api/logout`   | Logout user          |
| GET    | `/refresh`      | Refresh Access Token |

### Organizer Management

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| GET    | `/api/organizers`    | Fetch all Organizers      |
| GET    | `/api/organizer/:id` | Get Organizers details    |
| PUT    | `/api/organizer/:id` | Update Organizers details |
| DELETE | `/api/organizer/:id` | Delete an Organizers      |

### Attendee Management

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/attendees`    | Fetch all Attendees     |
| GET    | `/api/attendee/:id` | Get Attendee details    |
| PUT    | `/api/attendee/:id` | Update Attendee details |
| DELETE | `/api/attendee/:id` | Delete an Attendee      |

### Event Management

| Method | Endpoint                 | Description          |
| ------ | ------------------------ | -------------------- |
| POST   | `/api/create-event`      | Create an Event      |
| GET    | `/api/events`            | Get all Events       |
| GET    | `/api/events/:event_id'` | Get an Event details |
| PUT    | `/api/events/:event_id`  | Update an Event      |
| DELETE | `/api/events/:event_id`  | Delete an Organizers |

### Ticket Management

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `/api/create-ticket`  | Create a Ticket      |
| GET    | `/api/tickets`        | Get all Tickets      |
| GET    | `/ticket/:ticket_id'` | Get a Ticket details |
| PUT    | `/ticket/:ticket_id`  | Update a Ticket      |
| DELETE | `/ticket/:ticket_id`  | Delete a Ticket      |

### Other Features

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | `/webhook` | Testing for payment |

### AUTHORS

Fortune Iheanacho - [Github Link](https://github.com/orgs/NexusEvnt/people/na-cho-dev)  
Keith Juma - [Github Link](https://github.com/orgs/NexusEvnt/people/TaiKeith)
Angie Monnye - [Github Link](https://github.com/orgs/NexusEvnt/people/Grey550)  
Grace Bamidele - [Github Link](https://github.com/orgs/NexusEvnt/people/Gracy222)
