# User Api Spec

## Register User API

Endpoint : POST /api/users/register

Request Body :

```json
{
  "name": "Angga Saputra",
  "email": "angsa0077@gmail.com",
  "password": "admin123"
}
```

Response Body Success

```json
{
  "data": {
    "name": "Angga Saputra",
    "email": "angsa0077@gmail.com"
  }
}
```

Response Body Error

```json
{
  "errors": "email sudah terdaftar"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "email": "angsa0077@gmail.com",
  "password": "admin123"
}
```

Response Body Success

```json
{
  "data": {
    "token": "jwt"
  }
}
```

Response Body Error

```json
{
  "errors": "email atau password salah"
}
```

## Update User API

Endpoint : PATCH /api/users/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Angga Saputra ok",
  "email": "angsa0088@gmail.com",
  "password": "admin123ok"
}
```

Response Body Success

```json
{
  "data": {
    "name": "Angga Saputra ok",
    "email": "angsa0088@gmail.com",
    "password": "admin123ok"
  }
}
```

Response Body Error

```json
{
  "errors": "password minimal 6 digit"
}
```

## GET User API

Endpoint : GET /api/users/:id

Headers :

- Authorization : token

Response Body Success

```json
{
  "data": {
    "name": "Angga Saputra",
    "email": "angsa0077@gmail.com"
  }
}
```

Response Body Error

```json
{
  "errors": "Tidak di temukan"
}
```

## Logout User API

Endpoint : POST /api/users/logout

Headers :

- Authorization : token

Response Body Success

```json
{
  "data": "ok"
}
```

Response Body Error

```json
{
  "errors": "Tidak di temukan"
}
```
