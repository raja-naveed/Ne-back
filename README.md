
# API Endpoints Summary

## Authentication APIs

### Register a New User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "JWT token"
  }
  ```

### Login a User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Login a user and return a JWT token.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "token": "JWT token"
  }
  ```

### Get Current Logged-In User's Details
- **Endpoint:** `GET /api/auth/me`
- **Description:** Get the current logged-in user's details (protected).
- **Headers:**
  - `Authorization: Bearer <JWT token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

## User Profile APIs

### Get Current Logged-In User's Profile
- **Endpoint:** `GET /api/users/profile`
- **Description:** Get the current logged-in user's profile (protected).
- **Headers:**
  - `Authorization: Bearer <JWT token>`
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```

### Update Current Logged-In User's Profile
- **Endpoint:** `PUT /api/users/profile`
- **Description:** Update the current logged-in user's profile (protected).
- **Headers:**
  - `Authorization: Bearer <JWT token>`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string" // Optional
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "username": "string",
      "email": "string"
    }
  }
  ```
