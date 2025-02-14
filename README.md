# ☕ Showcase Coffee API

A robust REST API built with Node.js, Express, and PostgreSQL, designed to power the backend of Encafeinados. This API features JWT authentication, cloud image management, comprehensive Swagger documentation, and more.

## 🚀 Key Features

* **RESTful API** built with Express.js
* **PostgreSQL database** managed with Sequelize ORM
* **JWT-based** authentication and authorization
* **Password encryption** for secure user data
* **Input validation** using Express Validator
* **Swagger documentation** for easy API exploration
* **Cloud image storage** with Cloudinary
* **Jest** for unit and integration testing
* **Environment variables** for seamless development and production setups

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

* Node.js (version 14 or higher)
* PostgreSQL (version 12 or higher)
* npm (included with Node.js)

## 🛠️ Technologies Used

* **Node.js**: Runtime environment for building the API
* **Express.js**: Framework for handling routes and middleware
* **PostgreSQL**: Relational database for data storage
* **Sequelize**: ORM for database management
* **JWT**: JSON Web Tokens for authentication
* **Cloudinary**: Cloud-based image storage and management
* **Swagger**: API documentation and testing
* **Jest**: Testing framework for unit and integration tests

## 🗂️ Project Structure

```
📂 src/
│   ├── tests/            # Jest tests
│   ├── config/           # Configuration files
│   │   ├── database.js       # Database configuration
│   │   ├── swaggerConfig.js  # Swagger documentation setup
│   │   └── cloudinary.js     # Cloudinary configuration
│   ├── db/               # Database-related files
│   │   ├── migrations/       # Sequelize migrations
│   │   └── seeders/         # Data seeders
│   ├── docs/             # Swagger documentation by module
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Custom middlewares
│   ├── models/           # Sequelize models
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utility functions
│   └── index.js          # Application entry point
│
├── .env.development      # Development environment variables
├── .env.production       # Production environment variables
├── .gitignore           # Git ignored files
├── .sequelizerc         # Sequelize CLI configuration
├── jest.config.js       # Jest configuration
├── main.js              # Main application file
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=coffee_db
DB_DIALECT=postgres
DB_SSL_MODE=false

# JWT Configuration
JWT_SECRET=your_secret_key

# Email Configuration (if applicable)
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## ⚙️ Installation

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/EncafeinadosCompany/showcase-coffee-api.git
   cd showcase-coffee-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   * Copy `.env.example` to `.env` and update the values

4. Set up the database:
   * Ensure PostgreSQL is installed and running
   * Create a database named `coffee_db`
   * Update the database credentials in your `.env` file

5. Run migrations and seeders:
   ```bash
   npm run migrate
   npm run seed:order
   ```

6. Start the server:
   ```bash
   npm start
   ```

The API will be available at http://localhost:3000.

## 📚 API Documentation

The API is fully documented using Swagger. You can access the documentation at:

* Development: http://localhost:3000/api-docs

Explore the endpoints, test requests, and view detailed descriptions of each API route.

## 🧪 Testing

Run tests to ensure the API works as expected:

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```


## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:

* Email: your-email@example.com
* GitHub: your-username

Enjoy building your coffee shop management system with Showcase Coffee API! ☕✨