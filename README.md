# First Foods Tanzania – Backend API

## Overview

The First Foods Tanzania (FFT) Food Producer Mapping System is a digital platform developed to support the identification, mapping, documentation and management of local producers of nutritious foods across selected regions of Tanzania.

This repository contains the backend API that powers the First Foods Tanzania web platform, providing the data management, database connectivity and API services required to manage food producer information and support geographic visualization of producers.

The system is being developed to support the First Foods Tanzania initiative in mapping local food producers, including small-scale processors, food enterprises, farmer groups and cooperatives involved in producing, processing or supplying nutritious foods.

Website: https://firstfoodtanzania.co.tz/

## Technology Stack

- **Node.js** – Backend runtime environment.
- **Express.js** – REST API framework.
- **Sequelize** – ORM for database management and data modeling.
- **PostgreSQL** – Relational database management system.
- **REST API** – Communication between the backend and frontend applications.

## Key Features

- Food producer information management.
- Producer registration and profile management.
- Structured relational database for producer information.
- Management of producer locations and geographical coordinates.
- API endpoints for retrieving producer data.
- Support for geographic mapping and location-based visualization.
- Data management for nutritious food producers and their products.
- Integration with the Flutter frontend application.

## Project Scope

The platform supports the mapping of nutritious food producers across the initial target areas of Tanzania, including:

- Dar es Salaam
- Arusha
- Mwanza
- Mbeya
- Kusini Unguja
- Kaskazini Unguja
- Mjini Magharibi

The mapping initiative aims to improve the visibility of local nutritious food producers and contribute to the development of a more accessible and interconnected nutritious food ecosystem.

## System Architecture

The backend API serves as the central data management layer between the PostgreSQL database and the frontend application.

```text
Flutter Frontend
       |
       | HTTP / REST API
       |
       v
   Express.js API
       |
       v
    Sequelize ORM
       |
       v
   PostgreSQL Database
```

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- PostgreSQL

### 1. Clone the Repository

```bash
git clone <BACKEND_REPOSITORY_URL>
cd <BACKEND_REPOSITORY_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the required environment variables.

Example:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutri_map
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

Adjust the environment variables according to the project's configuration.

### 4. Database Setup

Ensure PostgreSQL is running and the configured database exists.

Run the project's Sequelize migrations where applicable.

```bash
npx sequelize-cli db:migrate
```

### 5. Start the Application

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

## API

The backend exposes REST API endpoints for the frontend application to access and manage food producer information.

API endpoints, request parameters, authentication requirements and response formats should be documented as the API evolves.

## Security

The backend is designed to support secure data access and application integration through appropriate server-side validation, controlled database access and secure handling of application configuration.

Sensitive credentials should be managed through environment variables and must not be committed to the repository.

## Contribution

Contributions, suggestions and technical improvements that support the development of the First Foods Tanzania Food Producer Mapping System are welcome.

For major changes, please open an issue to discuss the proposed changes before submitting a pull request.

## License

The licensing terms for this repository will be defined by the project maintainers.
