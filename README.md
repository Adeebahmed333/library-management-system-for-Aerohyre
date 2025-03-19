# Library Management System

This is a backend system for managing a library. It allows users to perform operations such as adding books, searching for books, borrowing and returning books, and managing user accounts.

## Technologies Used

- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing book and user data
- **Bcrypt.js** - Library for password hashing
- **JSON Web Token (JWT)** - Authentication mechanism for secure access

## Setup

### 1. Clone the Repository

Run the following command to clone the repository and navigate to the project directory:

```bash
git clone https://github.com/yourusername/library-management-system.git
cd library-management-system
```

### 2. Install Dependencies

Use npm to install the required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following configuration:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_jwt_secret
```

### 4. Run the Application

Start the server using:

```bash
npm start
```

The server will start on the specified port (default is **3000**). You can now test the API endpoints using tools like Postman or cURL.

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Log in a user.

### Books Management

- **POST** `/api/books` - Add a new book (requires authentication).
- **GET** `/api/books` - Retrieve all books.
- **GET** `/api/books/:id` - Retrieve a specific book by ID.

### Borrowing and Returning Books

- **POST** `/api/borrow/:bookId/:userId` - Borrow a book (requires authentication).
- **POST** `/api/return/:bookId/:userId` - Return a book (requires authentication).

### User Management

- **GET** `/api/users/:userId/books` - Get books borrowed by a specific user (requires authentication).

## Testing

You can use tools like **Postman** or **cURL** to test the API endpoints.

Example cURL command to test retrieving all books:

```bash
curl -X GET http://localhost:3000/api/books
```

Or You can Download **Postman** and test the above api's.
