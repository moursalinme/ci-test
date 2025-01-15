<div align="center">
    <h1>PET STORE</h1>
</div>

# Table of Contents

- [About Pet Store](#about-pet-store)
  - [Built With](#built-with)
- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## About Pet Store

A full-stack web application for managing pets in a pet store.

## Built With

- Java (v - 21)
- Spring Boot (v - 3.4.1)
- Postgres DB (v-17)
- React + Vite (v - ^18.3.1)
- Tailwind CSS

## Getting Started

### Prerequisites

- Must have **Docker** installed and `docker engine running` on your computer. You can install it from [here](https://docs.docker.com/engine/install/).

#### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/moursalinme/ci-test.git
   ```

2. Navigate to the project folder

   ```sh
   cd ci-test
   ```

3. Create a `.env` file and add the following properties.

   ```sh
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   SERVER_PORT=
   FRONTEND_APP_PORT=
   ```

   After setting the properties, it should look like this. Ensure that the **ports** you provide are **not currently in use**.

   ```sh
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=123456
   SERVER_PORT=8080
   FRONTEND_APP_PORT=3000
   ```

4. Run the follwing command within the directory. It will start at **port 8080**. You can change the port in the configuration if needed.

   ```sh
   docker-compose up
   ```

To visit the app, type: `http://localhost:3000`

Instead of 3000, use the port number you set as `FRONTEND_APP_PORT`.
