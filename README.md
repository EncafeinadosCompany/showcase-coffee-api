# Showcase Coffee API

A REST API built with Node.js, Express, and PostgreSQL, featuring JWT authentication, cloud image management, and comprehensive documentation.

## 🚀 Key Features

- REST API with Express
- PostgreSQL database with Sequelize ORM
- JWT authentication and authorization
- Password encryption
- Input validation with Express Validator
- Swagger documentation
- Cloud image storage with Cloudinary
- Jest testing
- Environment variables for development and production

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (included with Node.js)

## Technologies Used

- Node.js: Runtime environment used for development
- JavaScript: Pure JavaScript implementation
- PostgreSQL: Relational database used in the project
- Express.js: Node.js framework for handling routes and middleware
- Sequelize: ORM for database management

## Project Structure

```
📂src/
|   ├── tests/            # Jest tests
|   |
│   ├── config/           # Configurations
│   │   ├── database.js       # Database configuration
│   │   ├── swaggerConfig.js  # Swagger configuration
│   │   └── cloudinary.js     # Cloudinary configuration
|   |
│   ├── db/              
│   |   ├── migrations/       # Sequelize migrations
│   |   └── seeders/         # Data seeders
|   |
│   ├── docs/             # Swagger documentation by module
│   ├── controllers/      # Controllers
│   ├── middlewares/      # Middlewares
│   ├── models/           # Sequelize models
│   ├── repositories/     # Data access layer
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utilities
│   └── index.js          
│   
├── .env.development      # Development environment variables
├── .env.production       # Production environment variables
├── .gitignore            # Git ignored files
├── .sequelizerc          # Sequelize CLI configuration
├── jest.config.js        # Jest configuration
├── main.js               # Main application file
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🔧 Environment Variables

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=coffee_db
DB_DIALECT=postgres
DB_SSL_MODE=false

JWT_SECRET=your_secret_key

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## ⚙️ Installation

Follow these steps to set up and run the project on your local machine:

1. **Clone the repository**:
```bash
git clone https://github.com/EncafeinadosCompany/showcase-coffee-api.git
cd showcase-coffee-api
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**
   - Create a copy of `.env.example` and configure your variables

4. **Set up the database**:
   - Ensure PostgreSQL is installed and running
   - Create a database named `coffee_db`
   - Configure credentials in your `.env` file

5. **Run migrations and seeders**:
```bash
npm run migrate
npm run seed:order
```

6. **Start the server**:
```bash
npm start
```
This will start the API on the default port (usually 3000).

## 📚 API Documentation

The complete API documentation is available at:

Development: `http://localhost:3000/api-docs`

## Usage

Once the server is running, you can access the API through
`http://localhost:3000/api/v1/` (or your configured port).

### Endpoints

#### Users
- `GET /users`: Retrieve list of users
- `POST /users`: Create a new user
- `GET /users/:id`: Retrieve specific user by ID
- `PUT /users/:id`: Update existing user
- `DELETE /users/:id`: Delete user

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 License
