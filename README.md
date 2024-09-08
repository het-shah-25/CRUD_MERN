# Product CRUD Application

## Overview

This is a CRUD (Create, Read, Update, Delete) application for managing products. Built using the MERN stack, the application provides a comprehensive solution for product management, including features for adding, viewing, editing, and deleting products.

## Technologies Used

- **MongoDB**: NoSQL database for storing product data.
- **Express.js**: Backend framework for building the API.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for server-side operations.

## Features

- **Create**: Add new products to the database.
- **Read**: View a list of all products and their details.
- **Update**: Edit existing product information.
- **Delete**: Remove products from the database.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/het-shah-25/CRUD_MERN.git
   cd product-crud-application
   ```

2. **Install Backend Dependencies**

   Navigate to the `backend` directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   Navigate to the `frontend` directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory with the following variables:

   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   ```

   Adjust the `MONGO_URI` to match your MongoDB connection string.

5. **Start the Application**

   Open two terminal windows:

   - In the first terminal, start the backend server:

     ```bash
     cd backend
     npm start
     ```

   - In the second terminal, start the React frontend:

     ```bash
     cd frontend
     npm start
     ```

   The application should now be running on `http://localhost:5000`.

## API Endpoints

- **POST /api/products**: Create a new product.
- **GET /api/products**: Get a list of all products.
- **GET /api/products/:id**: Get a product by ID.
- **PUT /api/products/:id**: Update a product by ID.
- **DELETE /api/products/:id**: Delete a product by ID.

```

```
