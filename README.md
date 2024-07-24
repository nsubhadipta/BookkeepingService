# Bookkeeping Service API
The Bookkeeping Service API is a Node.js application built with Express and MongoDB. It efficiently manages books, users, and libraries. In this system, users can have roles as either authors or borrowers. Each book is written by an author and is owned by a specific library. Books can also be borrowed by users who act as borrowers. The API provides robust authentication and authorization features, along with multilingual support for error and success messages.

The application models three main entities: **Books**, **Users**, and **Libraries**. Users can be categorized into two roles: **Authors**, who write books, and **Borrowers**, who borrow books. Each book is linked to an author, associated with a library that owns it, and can be currently borrowed by a borrower.


## Features

- Manage books, users, and libraries
- Authenticate users and generate JWT tokens
- Role-based authorization for authors and borrowers
- Multilingual support for English and Hindi
- Secure API with JWT authentication and user roles

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)
<!-- - [API Endpoints](#api-endpoints) -->

## Installation

### Prerequisites

- **Node.js** (v20.x or higher)
- **MongoDB** (local or remote instance)
- **Firebase account** for file storage (optional)

### Clone the Repository

```bash
git clone https://github.com/nsubhadipta/BookkeepingService.git
```
```bash
cd BookkeepingService
```

### Install Dependencies

```bash
npm install
```

## Configuration
### Environment Variables
Create a `.env` file in the root directory and add the following configuration:

```plaintext
PORT=9000
MONGODB_URI=mongodb://localhost:27017/bookkeeping
JWT_SECRET=your_jwt_secret
FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json
```

Replace the placeholder values with your actual MongoDB URI and Firebase credentials.

## Running the Application

### Start the Server
```bash
npm run start
```

The server will start on http://localhost:9000.

## Usage
### Authentication
- Use the `/api/users/login` endpoint to authenticate a user and obtain a JWT token.
- Include the JWT token in the `Authorization` header for all subsequent requests requiring authentication.
### Multilingual Support
- The API supports English and Hindi languages.
- Set the `Accept-Language` header in the request to either `en` or `hi` to receive responses in the desired language.
### Role-Based Authorization
- Only authenticated users with the `author` role can add or remove books from the library inventory.
- Ensure that the user role is included in the JWT token payload.