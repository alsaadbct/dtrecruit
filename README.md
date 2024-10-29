DTRecruit
A backend application built with Node.js, Express, and Prisma for database management, along with TypeScript for type safety. This application provides a structure for managing recruitment processes, handling user sessions, and interacting with a database.

Table of Contents
Installation
Scripts
Project Structure
Dependencies
Contributing
License
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/dtrecruit.git
cd dtrecruit
Install dependencies:

bash
Copy code
npm install
Set up Prisma: Make sure your Prisma schema is configured for your database. Adjust the prisma/schema.prisma file as needed and generate the Prisma client:

bash
Copy code
npm run prisma-generate
Run database migrations:

bash
Copy code
npm run prisma-migrate
Seed the database (if applicable):

bash
Copy code
npm run seed
Scripts
Development
npm run dev - Runs the development server with TypeScript using ts-node-dev for automatic restarts on file changes.
Build
npm run build - Compiles TypeScript files in src/ to JavaScript in the dist/ directory.
npm run start - Runs the application from the compiled files in the dist/ directory.
Prisma and Database Management
npm run build-schema - Combines Prisma schema files (if split) before generating/migrating.
npm run prisma-generate - Combines schemas and generates Prisma client files.
npm run prisma-migrate - Combines schemas and runs database migrations.
npm run prisma-studio - Opens Prisma Studio, a visual interface for managing the database.
npm run seed - Seeds the database with initial data using the prisma/seed.ts script.
Project Structure
src/: Contains the main application code (controllers, services, routes, etc.).
prisma/: Holds Prisma-related files such as schema.prisma and any custom schema combination logic.
dist/: Stores the compiled JavaScript files after running the build process.
Dependencies
@prisma/client: Provides the Prisma client for database interaction.
express: A web application framework for Node.js.
typescript: TypeScript enables type safety and cleaner code.
Other Libraries: Axios (HTTP requests), Cors (cross-origin resource sharing), Nodemailer (email handling), and various utilities.
Dev Dependencies
Prisma CLI: For managing Prisma migrations and database setup.
Type Definitions: Includes @types/* packages to enable TypeScript support for dependencies.
Contributing
Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a pull request.
License
Distributed under the ISC License.

Notes
Ensure .env configurations are set up with database credentials and other necessary environment variables.
Customize any paths or commands as needed based on your specific setup.
