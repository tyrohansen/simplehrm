# Simple HRM Application
This is an Employee Management web-based Application built using GoFiber and ReactJS. The application allows users to manage employees by creating, updating, deleting, and viewing their information.

## Installation and Setup
### Prerequisites
1. Node.js v12.13.0 or higher
2. NPM v6.12.0 or higher
3. Go v1.14.0 or higher

## Backend Setup
1. Clone the repository
2. Navigate to the backend folder using the command line.
3. Rename .env.example to .env and configure the database connection settings.
4. Run go run main.go to start the server.

## Frontend Setup
1. Navigate to the frontend folder using the command line.
2. Run npm install to install the necessary dependencies.
3. Rename .env.example to .env and configure the backend API URL.
4. Run npm start to start the application.

## Running Tests
1. To run backend tests, navigate to the backend folder and run go test ./.... 
2. To run frontend tests, navigate to the frontend folder and run npm test.

## Usage
### Creating an Employee
1. Click on the "Add Employee" button.
2. Fill in the necessary information in the form.
3. Click on the "Save" button.
### Updating an Employee
1. Click on the "Edit" button next to the employee you want to update.
2. Update the necessary information in the form.
3. Click on the "Save" button.
### Deleting an Employee
1. Click on the "Delete" button next to the employee you want to delete.
2. Confirm that you want to delete the employee.
3. Viewing Employee Information
4. Click on the employee's name to view their information.

## Contributing
If you'd like to contribute to this project, please create a pull request with your changes.

License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/). See the LICENSE file for details.