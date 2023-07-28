# Backend Coding Challenge

## Description

This project aims to create a backend solution for a web application. It consists of several parts, each focusing on different functionalities.

### Part 1

- Implement a global prefix `/api` to be used throughout the API.

### Part 2

- Implement a login endpoint, `/api/auth/login`, which allows users to authenticate and returns a valid JWT token upon successful login.
- The JWT access token should have a validity of 120 seconds only and should contain the following payload: `userId` and `username`.

### Part 3

- Implement two resources, namely `customers` and `products`, along with their respective endpoints.
- These endpoints should be protected, and users need to pass an authorization token in the headers to consume them.
- Use mock data provided in the `/Mocks/` directory as the data source.

### Part 4

- Write test cases for your controllers and services to ensure the reliability of your code.

## Endpoints

- **Login**: `/api/auth/login`
- **Customers**: `/api/auth/customers`
- **Products**: `/api/auth/products`

## Impress us

If you wish to make a lasting impression, consider completing the following tasks. While these tasks are optional, they will be taken into consideration and may reduce technical questions during the evaluation process:

- Organize your project structure in a well-structured and clear manner.
- Add comments to your code for better understanding and maintainability.
- Implement rate limiting to control the rate of API requests.
- Write unit tests to ensure the robustness of your code.
- Provide Docker and Docker Compose support for easier deployment.

Feel free to use your creativity and showcase your skills throughout the project! Good luck!
