# Product Api Spec

## Create Product API

Endpoint : POST /api/products

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Jersey 1",
  "price": 1000000,
  "image": "jersey.jpg",
  "description": "Jersey ini berukuran S slim fit",
  "qty": 10
}
```

Response Body Success :

```json
{
  "data": {
    "id" : "uuid",
    "name": "Jersey 1",
    "price": 1000000,
    "image": "jersey.jpg",
    "description": "Jersey ini berukuran S slim fit",
    "qty": 10
  }
}
```

Response Body Error

```json
{
  "errors": "name, price, image, description, dan qty wajid diisi"
}
```

## Update Product API

Endpoint : PUT /api/products/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Jersey 1",
  "price": 1000000,
  "image": "jersey.jpg",
  "description": "Jersey ini berukuran S slim fit",
  "qty": 10
}
```

Response Body Success :

```json
{
  "data": {
    "id": "uuid",
    "name": "Jersey 1",
    "price": 1000000,
    "image": "jersey.jpg",
    "description": "Jersey ini berukuran S slim fit",
    "qty": 10
  }
}
```

Response Body Error

```json
{
  "errors": "name, price, dan qty wajid diisi"
}
```

## Get Product API

Endpoint : GET /api/products/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": 
    {
      "id": "uuid",
      "name": "Jersey 1",
      "price": 1000000,
      "image": "jersey.jpg",
      "description": "Jersey ini berukuran S slim fit",
      "qty": 10
    }
}
```

Response Body Error

```json
{
  "errors": "Product tidak ditemukan"
}
```

## Get Products API

Endpoint : GET /api/products

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Jersey 1",
      "price": 1000000,
      "image": "jersey.jpg",
      "description": "Jersey ini berukuran S slim fit",
      "qty": 10
    },
    {
      "id": "uuid",
      "name": "Jersey 2",
      "price": 2000000,
      "image": "jersey.jpg",
      "description": "Jersey ini berukuran S slim fit",
      "qty": 10
    }
  ]
}
```

Response Body Error

```json
{
  "errors": "Tidak ada products"
}
```

## Search Products API

Endpoint : GET /api/products

Headers :

- Authorization : token

Query Params :

- name : Search by name using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Jersey 1",
      "price": 1000000,
      "image": "jersey.jpg",
      "description": "Jersey ini berukuran S slim fit",
      "qty": 10
    },
    {
      "id": "uuid",
      "name": "Jersey 2",
      "price": 2000000,
      "image": "jersey.jpg",
      "description": "Jersey ini berukuran S slim fit",
      "qty": 10
    }
  ],
  "Paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

## Remove Product API

Endpoint : DELETE /api/products/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "errors": "Product tidak ditemukan"
}
```
