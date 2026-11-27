
# First Foods Tanzania – Backend API

## Overview

The First Foods Tanzania (FFT) Food Producer Mapping System is a digital platform developed to support the identification, mapping, documentation and management of local producers of nutritious foods across selected regions of Tanzania.

This repository contains the backend API that powers the First Foods Tanzania platform. It provides database management, data processing, API services and integration with KoboToolbox for digital data collection.

Food producer data collected through KoboToolbox is transmitted to the backend system through REST API integration, enabling collected field data to be processed, stored and made available to the frontend application for visualization and management.

Website: https://firstfoodtanzania.co.tz/

## Technology Stack

- **Node.js** – Backend runtime environment.
- **Express.js** – REST API framework.
- **Sequelize** – ORM for database management and data modeling.
- **PostgreSQL** – Relational database management system.
- **KoboToolbox** – Digital field data collection and survey platform.
- **REST API** – Integration and communication between systems.

## Key Features

- Food producer information management.
- Producer registration and profile management.
- KoboToolbox REST API integration for field data collection.
- Automated transfer of collected survey data from KoboToolbox to the backend.
- Processing and storage of food producer data collected from field surveys.
- Structured relational database for producer information.
- Management of producer locations and geographical coordinates.
- API endpoints for retrieving producer data.
- Support for geographic mapping and location-based visualization.
- Data management for nutritious food producers and their products.
- Integration with the Flutter frontend application.

## KoboToolbox Integration and Data Collection

The First Foods Tanzania mapping initiative uses KoboToolbox for digital field data collection. Field teams use KoboToolbox forms to capture information about nutritious food producers, their business operations, products, production capacity, locations and other relevant information.

Collected data is transferred from KoboToolbox to the First Foods Tanzania backend through REST API integration.

### Data Collection Workflow

1. Field teams collect producer information using digital forms deployed through KoboToolbox.
2. Survey submissions are recorded and stored within KoboToolbox.
3. The backend system retrieves or receives submitted data through REST API integration.
4. The backend processes and structures the collected information.
5. Validated data is stored in the PostgreSQL database through Sequelize.
6. Producer data is exposed through backend API endpoints.
7. The frontend application retrieves the data and displays producers through the interactive mapping platform.

### Data Pipeline

```text
Field Data Collection
        |
        v
   KoboToolbox
        |
        | REST API Integration
        v
 Node.js / Express Backend
        |
        v
 Data Processing & Validation
        |
        v
 Sequelize ORM
        |
        v
 PostgreSQL Database
        |
        v
 Flutter Frontend Application
        |
        v
 Interactive Producer Mapping
```

### Data Collected

The digital field mapping forms are designed to support the collection of relevant information about local nutritious food producers, including:

- Producer and business information.
- Contact and identification details.
- Geographic coordinates and location information.
- Food products and product categories.
- Production and processing information.
- Production capacity and related operational information.
- Other information required for the First Foods Tanzania mapping initiative.

The data structure and collection fields depend on the deployed KoboToolbox survey forms.

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

The backend API serves as the central data management layer between KoboToolbox, the PostgreSQL database and the frontend application.

```text
KoboToolbox
     |
     | REST API
     v
Express.js Backend API
     |
     v
Data Processing
     |
     v
Sequelize ORM
     |
     v
PostgreSQL Database
     |
     | REST API
     v
Flutter Frontend
     |
     v
Google Maps Visualization
```

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- PostgreSQL

### 1. Clone the Repository

```bash
git clone git@github.com:giulionyakunga/Nutri-Map.git
cd Nutri-Map
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

The backend exposes REST API endpoints for the frontend application and integration with external data collection services.

The API supports the exchange and management of producer information collected through KoboToolbox and data retrieval by the frontend application.

API endpoints, request parameters, authentication requirements and response formats should be documented as the API evolves.

## Security

The backend is designed to support secure data access and application integration through appropriate server-side validation, controlled database access and secure handling of application configuration.

Sensitive credentials, API tokens and database passwords should be managed through environment variables and must not be committed to the repository.

## Contribution

Contributions, suggestions and technical improvements that support the development of the First Foods Tanzania Food Producer Mapping System are welcome.

For major changes, please open an issue to discuss the proposed changes before submitting a pull request.

## License

The licensing terms for this repository will be defined by the project maintainers.
