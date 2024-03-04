# Recipe Sharing Application

## Application Structure

The application follows a standard Angular structure with the following key directories:

- **src/app/components**: Contains individual Angular components used throughout the application.
- **src/app/services**: Houses Angular services responsible for handling data logic, API calls, etc.
- **src/app/models**: Defines TypeScript models/interfaces used for data representation.

## Key Angular Features Used

- **Components**: The application extensively utilizes Angular components to create modular and reusable UI elements.
- **Services**: Angular services are employed to handle data management, API calls, and other business logic.
- **Routing**: Angular routing is utilized for navigating between different views/pages within the application.
- **Reactive Forms**: Angular forms module is used for form handling and validation.
- **HTTP Client Module**: Angular's built-in HTTP client module is utilized for making API calls to fetch and manipulate data.

## Additional Features Implemented

- **Eslint**: ESLint is a powerful tool that can significantly improve the quality, consistency, and maintainability of our codebase, making it an essential part of many modern development workflows.
- **Pipes**: I used Angular Pipes to filter data by searchbar, that way we can easily manipulate our data without having to

# Getting started

1. **Clone the repository**
   ```bash
   git clone https://github.com/MatthewKK01/recipe-sharing-app
   ```
2. **Navigate to the project directory**

   ```bash
   cd your-repo
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start JSON Server**

   Before running the Angular application, start the JSON Server to provide mock backend functionality.

   ```bash
   npm run serve-json
   ```

5. **Run the Angular application**

   Open a new terminal window and navigate to the project directory if you haven't already. Then, run:

   ```bash
   ng serve --open
   ```

   This command will build the Angular application and open it in your default web browser.
   <br/> If this doesn't happen automatically, you can navigete manually : http://localhost:4200/

6. **Explore the application**

   You should now be able to explore the Angular application in your browser. It will interact with the JSON Server running in the background.

7. **Optional**
   To make our code clean and easy to understand I have added some linting rules using ESLint.

   ```bash
   npm run lint
   ```
