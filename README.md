# Showcase Coffee API

The Showcase Coffee API is a robust and scalable solution designed for the comprehensive management of a café. Built with modern technologies such as Node.js, Express, and PostgreSQL, this API provides a complete suite of tools to manage purchases, sales, inventory, and more, streamlining operational processes and enhancing business efficiency.

**Version:** 1.0.0

## ✨ Key Features

- REST API with Express
- PostgreSQL database with Sequelize ORM
- JWT authentication and authorization
- Password encryption
- Input validation with Express Validator
- Swagger documentation
- Cloud image storage with Cloudinary
- Jest testing
- Environment variables for development and production

## 🛠️ Technologies Used

- Node.js: Runtime environment used for development
- JavaScript: Pure JavaScript implementation
- PostgreSQL: Relational database used in the project
- Express.js: Node.js framework for handling routes and middleware
- Sequelize: ORM for database management

## 📋 Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (included with Node.js)

## 🗂️ Project Structure

```
📂src/
|   ├── __tests__/        # Jest tests
|   |
│   ├── config/           # Configurations
│   │   ├── database.js       # Database configuration
│   │   ├── swaggerConfig.js  # Swagger configuration
│   │   └── cloudinary.js     # Cloudinary configuration
|   |
│   ├── db/              
│   |   ├── migrations/       # Sequelize migrations
│   |   └── seeders/          # Data seeders
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

## 🏗️ Architecture

This project follows a layered architecture:

1. **Controllers**: Handle HTTP requests and responses
2. **Services**: Implement business logic
3. **Repositories**: Manage data access
4. **Models**:  Define the data structure

We use the Repository pattern to decouple business logic from data access, making testing and maintenance easier.

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
   - Create a copy of `.env.development` and configure your variables

4. **Set up the database**:
   - Ensure PostgreSQL is installed and running
   - Create a database named `coffee_db`
   - Configure credentials in your `.env.development` file

5. **Run database migrations** (only required on the first setup or after schema changes)
```bash
npm run migrate
```

6. **Optional: Run seeders**:
   If you want to populate the database with initial data (such as default roles, users, stores, suppliers, employees, alliances and products ), run:

```bash
npm run seed:order
```

## 🚀 Usage

**Start the server**:
```bash
npm start
```
Once the server is running, you can access the API through
`http://localhost:3000` (or your configured port).

## 🔌 Main Endpoints  

The API follows a RESTful structure with the following main resources:  

|      **Resource**      |             **Description**                   |
|------------------------|-----------------------------------------------|
| `/api/v1/auth`         | Authentication and session management         |
| `/api/v1/users`        | User, role, and employee management           |
| `/api/v1/companies`    | Store, supplier, and alliance management      |
| `/api/v1/products`     | Product, variant, brand, and image management |
| `/api/v1/transactions` | Purchase and sales tracking                   |
| `/api/v1/payments`     | Supplier settlements and deposit management   |
| `/api/v1/dashboard`    | Report generation and analytics               |

For complete documentation, refer to the Swagger documentation.

## 📚 API Documentation

The complete API documentation is available at:

Development: `http://localhost:3000/api-docs`

## 🧪 Testing

**Start the testing**:
```bash
npm run test
```

## 📝 License
