# Poke Battle App

Poke Battle App is a web application that allows users to explore and battle with pokemons. The frontend is built using React.js, while the backend is developed using Spring Boot. The backend acts as a middleware between the PokéAPI and the frontend, handling data retrieval and caching.

## Features

- User authentication with static user credentials
- Paginated list of Pokémon
- Detailed information about each Pokémon
- Pokémon battle functionality

## Frontend

The frontend of the Poke Battle App is located in the `frontend` directory. It is built using React.js and utilizes various libraries and tools for state management, API requests, and styling.

### Technologies Used

- React.js
- Redux (for state management)
- Axios (for API requests)
- HTML/CSS
- Bootstrap (for styling)

### Getting Started

1. Navigate to the `frontend` directory:
    ```
    cd frontend
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Start the development server:
    ```
    npm start
    ```
4. Open your browser and visit `http://localhost:3000` to access the Poke Battle App.

### Static User Credentials

To log in to the Poke Battle App, use the following static user credentials:

- Email: user@example.com
- Password: 123456

## Backend

The backend of the Poke Battle App is located in the `backend` directory. It is developed using Spring Boot and acts as a middleware between the PokéAPI and the frontend. The backend handles data retrieval from the PokéAPI, caches the data using Caffeine, and provides REST API endpoints for the frontend to consume.

### Technologies Used

- Spring Boot
- Java
- Caffeine (for caching)
- REST API

### Getting Started

1. Navigate to the `backend/poke-api-mid` directory:
    ```
    cd backend/poke-api-mid
    ```
2. Build the backend application:
    ```
    ./mvnw clean package
    ```
3. Run the backend application:
    ```
    ./mvnw spring-boot:run
    ```
4. The backend server will start running on `http://localhost:8080`.