## Table of Contents
1. [Functionalities](#functionalities)
2. [Models](#models)
3. [Routes](#routes)
4. [Flow Diagram](#flow-diagram)
 
## Functionalities

### User Authentication:

- **Sign Up**
  - Endpoint: `POST /user/signup`
  - Description: Creates a new user account with unique username and password.

- **Login**
  - Endpoint: `POST /user/login`
  - Description: Authenticates existing user with username and password, returns a JWT token.

- **User Profile**
  - Endpoint: `GET /user/profile`
  - Description: Retrieves the profile information of the authenticated user.

### Contact Management:

- **Create Contact**
  - Endpoint: `POST /user/createContact`
  - Description: Adds a new contact for the authenticated user.

- **Update Contact**
  - Endpoint: `PUT /user/editContact`
  - Description: Modifies an existing contact for the authenticated user.

- **Search Contact**
  - Endpoint: `POST /user/searchContact`
  - Description: Retrieves contacts based on the provided search text.

### Error Handling:

- Returns appropriate HTTP status codes and error messages for various scenarios, such as missing or invalid inputs, unauthorized access, and server errors.

### Middleware:

- **JWT Middleware**
  - Description: Middleware to verify and decode JWT tokens from Authorization header for protected routes.

### Default Route:

- **Default Route**
  - Endpoint: `GET /`
  - Description: Returns a simple greeting message as a default route.

### Additional Considerations:

- Secure password storage using bcrypt hashing.
- Environmental configuration using dotenv for managing environment variables.
- MongoDB integration using Mongoose for database operations.
- Error handling and validation for user input.
- Deployment considerations, such as setting up environment variables for different deployment environments.


## Models

### User Model

The `User` model represents the user data stored in MongoDB.

- **Fields:**
  - `userName` (String, required): Unique username for authentication.
  - `passWord` (String, required): Password for user authentication, stored securely hashed.
  - **Timestamps:** Automatically generated createdAt and updatedAt fields.

### Contact Model

The `Contact` model represents the contacts associated with users.

- **Fields:**
  - `name` (String, required): Name of the contact.
  - `phone` (Number, required, unique): Phone number of the contact (must be unique).
  - `email` (String, optional): Email address of the contact.
  - `linkedin` (String, optional): LinkedIn profile URL of the contact.
  - `twitter` (String, optional): Twitter handle of the contact.
  - `user` (ObjectID, ref: 'User', required): Reference to the User who owns the contact.
  - **Timestamps:** Automatically generated createdAt and updatedAt fields.

### Explanation:

- **User Model:** Stores user credentials and manages authentication.
- **Contact Model:** Manages contact details associated with each user, ensuring data integrity and uniqueness for phone numbers.

### Additional Considerations:

- Implementing unique constraints for fields like `phone` to avoid duplicates.
- Ensuring secure storage of sensitive information such as passwords using bcrypt hashing.
- Utilizing Mongoose validation to enforce schema rules and ensure data consistency.


## Routes

### User Routes

#### Sign Up

- **Endpoint:** `POST /user/signup`
- **Description:** Creates a new user account with a unique username and password.

#### Login

- **Endpoint:** `POST /user/login`
- **Description:** Authenticates an existing user with username and password, returns a JWT token.

#### User Profile

- **Endpoint:** `GET /user/profile`
- **Description:** Retrieves the profile information of the authenticated user.

### Contact Routes

#### Create Contact

- **Endpoint:** `POST /user/createContact`
- **Description:** Adds a new contact for the authenticated user.

#### Update Contact

- **Endpoint:** `PUT /user/editContact`
- **Description:** Modifies an existing contact for the authenticated user.

#### Search Contact

- **Endpoint:** `POST /user/searchContact`
- **Description:** Retrieves contacts based on the provided search text.

### Middleware

#### JWT Middleware

- **Description:** Middleware to verify and decode JWT tokens from Authorization header for protected routes.

### Default Route

#### Default Route

- **Endpoint:** `GET /`
- **Description:** Returns a simple greeting message as a default route.

### Explanation

- **User Routes:** Handle user authentication and profile retrieval.
- **Contact Routes:** Manage CRUD operations for user contacts.
- **Middleware:** Ensure authentication and authorization using JWT.
- **Default Route:** Provides a basic endpoint to verify server status.

### Additional Considerations

- Ensure proper error handling and validation for user inputs.
- Securely hash and store passwords using bcrypt.
- Utilize environment variables for configuration management, such as MongoDB connection details and JWT secret.
- Implement logging and monitoring for better application management.

## Flow Diagram
  - [Flow Diagram](neoschool_test_flow_diagram.drawio.svg)


