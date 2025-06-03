# User Registration API Documentation

## Endpoint

`POST /users/register`

---

## Description

This endpoint allows a new user to register by providing their first name, last name, email, and password. Upon successful registration, the user receives a JWT authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "user": {
        "id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "jwt_token_here"
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message here",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```

### Missing Fields

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "All fields are required"
        }
      ]
    }
    ```

---

## Example Request

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "password": "securepassword"
  }'
```

---

## Notes

- The password is securely hashed before being stored.
- The returned JWT token can be used for authenticated requests.

---

## Login Endpoint

`POST /users/login`

---

### Description

This endpoint allows an existing user to log in using their email and password. On successful authentication, a JWT token is returned.

---

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Cannot be empty.

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id_here",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      },
      "token": "jwt_token_here"
    }
    ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Error message here",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```

#### User Not Found

- **Status Code:** `404 Not Found`
- **Body:**
    ```json
    {
      "message": "User not found"
    }
    ```

#### Invalid Password

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Invalid password"
    }
    ```

---

### Example Request

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice.smith@example.com",
    "password": "securepassword"
  }'
```

---

### Notes

- The returned JWT token can be used for authenticated requests.
- Make sure to provide valid credentials to receive a token.

---

## Profile Endpoint

`GET /users/profile`

---

### Description

This endpoint returns the authenticated user's profile information. The request must include a valid JWT token (usually sent as a cookie or in the `Authorization` header).

---

### Authentication

- Requires a valid JWT token (sent as a cookie named `token` or as a Bearer token in the `Authorization` header).

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "user_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

### Example Request

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Logout Endpoint

`GET /users/logout`

---

### Description

This endpoint logs out the authenticated user by clearing the authentication cookie and blacklisting the JWT token.

---

### Authentication

- Requires a valid JWT token (sent as a cookie named `token` or as a Bearer token in the `Authorization` header).

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

---

### Example Request

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Captain Profile Endpoint

`GET /captains/profile`

---

### Description

This endpoint returns the authenticated captain's profile information. The request must include a valid JWT token (usually sent as a cookie or in the `Authorization` header).

---

### Authentication

- Requires a valid JWT token (sent as a cookie named `token` or as a Bearer token in the `Authorization` header).

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "_id": "captain_id_here",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "status": "active",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "location": {
        "lat": 12.9716,
        "lng": 77.5946
      }
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```

#### Invalid/Blacklisted Token

- **Status Code:** `403 Forbidden`
- **Body:**
    ```json
    {
      "message": "Token is blacklisted. Please log in again."
    }
    ```

---

### Example Request

```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Captain Logout Endpoint

`GET /captains/logout`

---

### Description

This endpoint logs out the authenticated captain by clearing the authentication cookie and blacklisting the JWT token.

---

### Authentication

- Requires a valid JWT token (sent as a cookie named `token` or as a Bearer token in the `Authorization` header).

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Access denied. No token provided."
    }
    ```

---

### Example Request

```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```